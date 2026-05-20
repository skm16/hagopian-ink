/**
 * Server-only WP MCP client + tagged-fetch helper.
 *
 * The jab SDK's internal fetch doesn't accept next.tags directly, so we use
 * AsyncLocalStorage to inject tags into any fetch made within withTags(...).
 * Request-scoped and safe under concurrent requests.
 */

import 'server-only';
import { AsyncLocalStorage } from 'node:async_hooks';
import { createClient, JabClientError, type JabRequestOptions } from '@/lib/sdk';

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
let _refreshPromise: Promise<JabClient> | null = null;

function buildClient(): JabClient {
  return createClient({
    wpUrl: required('WP_URL'),
    user: required('WP_USER'),
    password: required('WP_APP_PASSWORD'),
  });
}

function getJabClient(): JabClient {
  if (!_jabClient) _jabClient = buildClient();
  return _jabClient;
}

// The SDK's MCP session is a one-way latch (initialized once, never refreshed).
// WP Engine expires sessions after ~hours-to-days; in `next dev` Turbopack
// recycles modules so we never notice, but a long-running Railway container
// holds a dead session indefinitely — every ability call then fails with
// HTTP 404 + JSON-RPC -32005 "Session not found". Detect that here and rebuild.
function isSessionExpiredError(err: unknown): boolean {
  if (!(err instanceof JabClientError)) return false;
  if (err.code !== 404) return false;
  return /session not found|invalid or expired session/i.test(err.message);
}

async function refreshClient(staleClient: JabClient): Promise<JabClient> {
  // Another caller already swapped in a fresh client — use that.
  if (_jabClient !== staleClient) return getJabClient();
  // Concurrent failures share one refresh, so we don't mint duplicate
  // MCP sessions on the WP server.
  if (_refreshPromise) return _refreshPromise;
  _refreshPromise = (async () => {
    console.warn('[jab] MCP session expired — rebuilding client');
    _jabClient = null;
    const fresh = buildClient();
    _jabClient = fresh;
    return fresh;
  })();
  try {
    return await _refreshPromise;
  } finally {
    _refreshPromise = null;
  }
}

async function callAbilityWithRefresh<TInput extends object, TOutput>(
  abilityName: string,
  input?: TInput,
  requestOptions?: JabRequestOptions,
): Promise<TOutput> {
  const client = getJabClient();
  try {
    return await client.callAbility<TInput, TOutput>(abilityName, input, requestOptions);
  } catch (err) {
    if (!isSessionExpiredError(err)) throw err;
    const fresh = await refreshClient(client);
    return await fresh.callAbility<TInput, TOutput>(abilityName, input, requestOptions);
  }
}

export const jabClient = new Proxy({} as JabClient, {
  get(_target, prop, receiver) {
    if (prop === 'callAbility') return callAbilityWithRefresh;
    return Reflect.get(getJabClient() as object, prop, receiver);
  },
});

export async function withTags<T>(tags: string[], fn: () => Promise<T>): Promise<T> {
  return tagStore.run(tags, fn);
}
