/**
 * Server-only WP MCP client + tagged-fetch helper.
 *
 * The jab SDK's internal fetch doesn't accept next.tags directly, so we use
 * AsyncLocalStorage to inject tags into any fetch made within withTags(...).
 * Request-scoped and safe under concurrent requests.
 */

import 'server-only';
import { AsyncLocalStorage } from 'node:async_hooks';
import { createClient } from '@/lib/sdk';

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required env var ${name}. Copy .env.example to .env.local and fill in your WordPress credentials.`,
    );
  }
  return value;
}

const tagStore = new AsyncLocalStorage<string[]>();

const originalFetch = globalThis.fetch;
globalThis.fetch = (async (input: any, init?: any) => {
  const tags = tagStore.getStore();
  if (tags && tags.length > 0) {
    init = init ?? {};
    init.next = {
      ...(init.next ?? {}),
      tags: [...(init.next?.tags ?? []), ...tags],
    };
  }
  return originalFetch(input, init);
}) as typeof fetch;

// Lazy-init: env vars are read on first property access, not at module load.
// This keeps `next build` from crashing when WP_URL isn't in the build
// environment (we collect page data with `force-dynamic` anyway, but the
// jab client module is still imported during compilation).
type JabClient = ReturnType<typeof createClient>;
let _jabClient: JabClient | null = null;
function getJabClient(): JabClient {
  if (!_jabClient) {
    _jabClient = createClient({
      wpUrl: required('WP_URL'),
      user: required('WP_USER'),
      password: required('WP_APP_PASSWORD'),
    });
  }
  return _jabClient;
}

export const jabClient = new Proxy({} as JabClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getJabClient() as object, prop, receiver);
  },
});

export async function withTags<T>(tags: string[], fn: () => Promise<T>): Promise<T> {
  return tagStore.run(tags, fn);
}
