// In-process sliding-window rate limiter. Valid because this app runs as a
// single long-lived Railway container (one process, stable memory between
// requests). If the deploy ever goes multi-instance or serverless, swap the
// `store` Map for a shared store (Redis/Upstash) — the function signatures
// below are the seam to do that behind.

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

interface RateLimitResult {
  ok: boolean;
  retryAfter?: number; // seconds until the oldest in-window hit expires
}

// key (IP) -> ascending list of hit timestamps (ms) within the current window.
const store = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  opts: RateLimitOptions,
  now: number = Date.now(),
): RateLimitResult {
  const windowStart = now - opts.windowMs;
  const recent = (store.get(key) ?? []).filter((t) => t > windowStart);

  if (recent.length >= opts.limit) {
    store.set(key, recent); // persist the pruned list
    const oldest = recent[0];
    const retryAfter = Math.ceil((oldest + opts.windowMs - now) / 1000);
    return { ok: false, retryAfter: Math.max(retryAfter, 1) };
  }

  recent.push(now);
  store.set(key, recent);
  return { ok: true };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return 'unknown';
}

/** Test-only: clears all rate-limit state. */
export function resetRateLimit(): void {
  store.clear();
}
