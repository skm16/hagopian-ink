import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, getClientIp, resetRateLimit } from '@/lib/rate-limit';

const OPTS = { limit: 3, windowMs: 10_000 };

describe('checkRateLimit', () => {
  beforeEach(() => resetRateLimit());

  it('allows submissions under the limit', () => {
    expect(checkRateLimit('1.1.1.1', OPTS, 0).ok).toBe(true);
    expect(checkRateLimit('1.1.1.1', OPTS, 1).ok).toBe(true);
    expect(checkRateLimit('1.1.1.1', OPTS, 2).ok).toBe(true);
  });

  it('blocks the submission that exceeds the limit', () => {
    checkRateLimit('1.1.1.1', OPTS, 0);
    checkRateLimit('1.1.1.1', OPTS, 1);
    checkRateLimit('1.1.1.1', OPTS, 2);
    const fourth = checkRateLimit('1.1.1.1', OPTS, 3);
    expect(fourth.ok).toBe(false);
    expect(fourth.retryAfter).toBeGreaterThan(0);
  });

  it('resets after the window expires', () => {
    checkRateLimit('1.1.1.1', OPTS, 0);
    checkRateLimit('1.1.1.1', OPTS, 1);
    checkRateLimit('1.1.1.1', OPTS, 2);
    expect(checkRateLimit('1.1.1.1', OPTS, 3).ok).toBe(false);
    // 10_001ms after the first hit -> all prior hits expired
    expect(checkRateLimit('1.1.1.1', OPTS, 10_001).ok).toBe(true);
  });

  it('isolates distinct IPs', () => {
    checkRateLimit('1.1.1.1', OPTS, 0);
    checkRateLimit('1.1.1.1', OPTS, 1);
    checkRateLimit('1.1.1.1', OPTS, 2);
    expect(checkRateLimit('1.1.1.1', OPTS, 3).ok).toBe(false);
    expect(checkRateLimit('2.2.2.2', OPTS, 3).ok).toBe(true);
  });

  it('reports retryAfter in whole seconds until the oldest hit expires', () => {
    checkRateLimit('1.1.1.1', OPTS, 0);
    checkRateLimit('1.1.1.1', OPTS, 1);
    checkRateLimit('1.1.1.1', OPTS, 2);
    // blocked at t=5000ms; oldest hit (t=0) expires at t=10000ms -> 5s left
    const blocked = checkRateLimit('1.1.1.1', OPTS, 5_000);
    expect(blocked.retryAfter).toBe(5);
  });
});

describe('getClientIp', () => {
  it('reads the first hop of x-forwarded-for', () => {
    const req = new Request('http://x', { headers: { 'x-forwarded-for': '203.0.113.7, 70.41.3.18' } });
    expect(getClientIp(req)).toBe('203.0.113.7');
  });

  it('falls back to "unknown" when the header is absent', () => {
    const req = new Request('http://x');
    expect(getClientIp(req)).toBe('unknown');
  });
});
