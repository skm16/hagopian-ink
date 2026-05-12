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

export const jabClient = createClient({
  wpUrl: required('WP_URL'),
  user: required('WP_USER'),
  password: required('WP_APP_PASSWORD'),
});

export async function withTags<T>(tags: string[], fn: () => Promise<T>): Promise<T> {
  return tagStore.run(tags, fn);
}
