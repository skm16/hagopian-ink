# Contact Form Anti-Spam Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add in-process rate limiting and Cloudflare Turnstile (managed mode) to the `/api/contact` route, on top of the existing honeypot + server-side validation, so the contact form resists both volume floods and smart bots.

**Architecture:** All enforcement is server-side in [app/api/contact/route.ts](../../../app/api/contact/route.ts). A new pure module `lib/rate-limit.ts` (in-memory sliding window, valid because the app runs as one persistent Railway container) gates by client IP before any network call. Cloudflare Turnstile adds an invisible challenge: the client widget produces a token, the route verifies it via `siteverify` before calling Resend. Checks run cheapest-first so floods never reach the network-bound layers.

**Tech Stack:** Next.js 15 App Router, React 19 RC, TypeScript (strict), Resend (existing), Cloudflare Turnstile, Vitest (new, for the rate-limiter unit tests).

## Global Constraints

- **Spec:** [docs/superpowers/specs/2026-06-24-contact-form-anti-spam-design.md](../specs/2026-06-24-contact-form-anti-spam-design.md). Every task implicitly includes these.
- **Deploy target:** single long-lived Node container on Railway (Dockerfile + `output: 'standalone'`). In-process state is valid; **do NOT add Redis or any external store.**
- **Path alias:** `@/*` maps to repo root (see [tsconfig.json](../../../tsconfig.json)). Import as `@/lib/rate-limit`.
- **TS strict mode** is on. No `any`. Explicit return types on exported functions.
- **Rate-limit defaults:** `5` submissions per `600000` ms (10 min) per IP. Env-overridable via `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MS`.
- **Turnstile mode:** managed / invisible.
- **Graceful degradation (exact rule):** if Turnstile env keys are **unset** → **skip** verification (local dev still works). If keys **are set** but `siteverify` errors/network-fails → **fail closed** (reject with 400).
- **Check order in route:** (1) honeypot → fake-200, (2) rate limit → 429, (3) validation → 400, (4) Turnstile → 400, (5) Resend → 200.
- **Out of scope:** WordPress, `artifacts/` (dead Replit port), Resend domain verification.
- **Commit style:** end commit messages with `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

## File Structure

- **Create** `lib/rate-limit.ts` — pure sliding-window limiter + `getClientIp` helper. No I/O, no framework imports.
- **Create** `lib/rate-limit.test.ts` — Vitest unit tests for the limiter.
- **Create** `vitest.config.ts` — minimal Vitest config (node environment).
- **Create** `components/contact/Turnstile.tsx` — client wrapper around the Turnstile widget (script load, token callback, reset handle).
- **Modify** `app/api/contact/route.ts` — wire in rate limit + Turnstile verification.
- **Modify** `components/contact/ContactContent.tsx` — render the widget, send `turnstileToken`, handle 429 copy.
- **Modify** `package.json` — add `vitest` dev dep + `test` script.
- **Modify** `.env.example` — document new env vars.
- **Modify** `Dockerfile` — add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` build ARG.

---

### Task 1: Vitest harness + rate limiter (TDD)

**Files:**
- Create: `vitest.config.ts`
- Create: `lib/rate-limit.ts`
- Create: `lib/rate-limit.test.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `checkRateLimit(key: string, opts: { limit: number; windowMs: number }, now?: number): { ok: boolean; retryAfter?: number }` — pure; `now` defaults to `Date.now()` and is injectable for tests. `retryAfter` is seconds (rounded up) until the oldest in-window hit expires, present only when `ok === false`.
  - `getClientIp(req: Request): string` — reads `x-forwarded-for` (first hop), falls back to `'unknown'`.
  - `resetRateLimit(): void` — clears the internal store (test isolation only).

- [ ] **Step 1: Add Vitest dependency and test script**

In `package.json`, add to `devDependencies` (keep alphabetical-ish ordering near existing entries):

```json
"vitest": "2.1.8"
```

And add to `scripts`:

```json
"test": "vitest run"
```

Then install:

Run: `npm install --legacy-peer-deps`
Expected: completes; `node_modules/.bin/vitest` exists. (`--legacy-peer-deps` matches the Dockerfile's install flag for the React 19 RC.)

- [ ] **Step 2: Create the Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['lib/**/*.test.ts'],
  },
  resolve: {
    alias: { '@': new URL('.', import.meta.url).pathname },
  },
});
```

- [ ] **Step 3: Write the failing tests**

Create `lib/rate-limit.test.ts`:

```ts
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
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "@/lib/rate-limit"` (module not yet created).

- [ ] **Step 5: Implement the rate limiter**

Create `lib/rate-limit.ts`:

```ts
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
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all 7 tests green.

- [ ] **Step 7: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/rate-limit.ts lib/rate-limit.test.ts
git commit -m "feat: add in-process sliding-window rate limiter with tests

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Turnstile client widget component

**Files:**
- Create: `components/contact/Turnstile.tsx`

**Interfaces:**
- Consumes: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (build-time env).
- Produces:
  - `<Turnstile onVerify={(token: string) => void} onExpire={() => void} resetSignal={number} />` — renders the managed-mode widget. Calls `onVerify` with a token when solved, `onExpire` when the token expires. Incrementing `resetSignal` forces the widget to reset (used after a submit so the next attempt gets a fresh token). Renders nothing if the site key is unset.

- [ ] **Step 1: Create the widget wrapper**

Create `components/contact/Turnstile.tsx`:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
  resetSignal: number;
}

export function Turnstile({ onVerify, onExpire, resetSignal }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Render once the script + container are ready.
  function renderWidget() {
    if (!SITE_KEY || !containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return; // already rendered
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      callback: (token: string) => onVerify(token),
      'expired-callback': () => onExpire(),
      'error-callback': () => onExpire(),
    });
  }

  // Reset when the parent bumps resetSignal (e.g. after a submit attempt).
  useEffect(() => {
    if (resetSignal > 0 && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  if (!SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={renderWidget}
      />
      <div ref={containerRef} onLoad={renderWidget} />
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors for `components/contact/Turnstile.tsx`.

- [ ] **Step 4: Commit**

```bash
git add components/contact/Turnstile.tsx
git commit -m "feat: add Cloudflare Turnstile client widget wrapper

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Wire rate limit + Turnstile verification into the route

**Files:**
- Modify: `app/api/contact/route.ts`

**Interfaces:**
- Consumes: `checkRateLimit`, `getClientIp` from `@/lib/rate-limit`; env `TURNSTILE_SECRET_KEY`, `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`.
- Produces: updated `POST` handler. Request body gains optional `turnstileToken?: string`.

- [ ] **Step 1: Add imports and config constants**

In `app/api/contact/route.ts`, add the import after the existing `Resend` import (line 2):

```ts
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
```

Add these constants near the existing `RECIPIENT`/`SENDER` constants (after line 16):

```ts
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX ?? 5);
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 600_000);
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;
```

- [ ] **Step 2: Add `turnstileToken` to the submission type**

Extend the `ContactSubmission` interface (the honeypot `website?` field block, lines 11-12) by adding:

```ts
  /** Cloudflare Turnstile token; verified server-side before sending. */
  turnstileToken?: string;
```

- [ ] **Step 3: Add the Turnstile verification helper**

Add this function above `export async function POST` (before line 31):

```ts
async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  // Keys unset (local dev) -> skip the check so the form still works.
  if (!TURNSTILE_SECRET) return true;
  // Keys set but no token -> reject.
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    // Keys set but verification errored -> fail closed.
    console.error('[/api/contact] Turnstile verify failed:', err);
    return false;
  }
}
```

- [ ] **Step 4: Insert the rate-limit check (after honeypot, before validation)**

In `POST`, immediately AFTER the honeypot block (after line 43, the `if (body.website ...)` block) and BEFORE the `const name = ...` line, insert:

```ts
  // Rate limit by client IP (after honeypot, before validation — no network).
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip, { limit: RATE_LIMIT_MAX, windowMs: RATE_LIMIT_WINDOW_MS });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
    );
  }
```

- [ ] **Step 5: Insert the Turnstile check (after validation, before building the email)**

AFTER the validation block (after the `if (message.length > 5000)` check, line 57) and BEFORE `const company = ...` (line 59), insert:

```ts
  // Turnstile challenge (after cheap validation, before the Resend network call).
  const humanVerified = await verifyTurnstile(body.turnstileToken, ip);
  if (!humanVerified) {
    return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 400 });
  }
```

- [ ] **Step 6: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 7: Manual smoke test (no Turnstile keys set = dev mode)**

Run the dev server: `npm run dev`

In a second terminal, send a valid submission (Turnstile skipped because no secret in local env):

```bash
curl -s -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@example.com","message":"hello"}'
```

Expected: `{"ok":true}` if `RESEND_API_KEY` is set locally, or `{"error":"Server not configured"}` (500) if not — **either** confirms the route ran past rate-limit and Turnstile-skip without crashing.

Then verify rate limiting by sending the request **6 times rapidly**:

Run: `for i in $(seq 1 6); do curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/contact -H 'Content-Type: application/json' -d '{"name":"T","email":"t@example.com","message":"x"}'; done`
Expected: first 5 return `200` or `500`; the **6th returns `429`**.

- [ ] **Step 8: Commit**

```bash
git add app/api/contact/route.ts
git commit -m "feat: enforce rate limit and Turnstile verification in contact route

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Render the widget + send token + 429 copy in the form

**Files:**
- Modify: `components/contact/ContactContent.tsx`

**Interfaces:**
- Consumes: `<Turnstile>` from `@/components/contact/Turnstile`.
- Produces: form now sends `turnstileToken` in the POST body and resets the widget after each attempt.

- [ ] **Step 1: Import the widget and add token state**

Add the import after the existing `HeroOverlay` import (line 10):

```tsx
import { Turnstile } from '@/components/contact/Turnstile';
```

Inside `ContactContent`, after the `errorMessage` state (line 48), add:

```tsx
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileReset, setTurnstileReset] = useState(0);
```

- [ ] **Step 2: Include the token in the POST body**

In `handleSubmit`, change the `body` of the fetch (line 63) from:

```tsx
        body: JSON.stringify(form),
```

to:

```tsx
        body: JSON.stringify({ ...form, turnstileToken }),
```

- [ ] **Step 3: Reset the widget after every attempt**

A Turnstile token is single-use; siteverify rejects a reused one. After the fetch completes (success OR failure), force a fresh token. At the very end of `handleSubmit`'s `try` block, AFTER `setStatus('success');` (line 71), and also in the error paths — simplest correct placement is a `finally`. Replace the `try { ... } catch { ... }` structure so the catch stays and a `finally` is added:

Change the end of `handleSubmit` from:

```tsx
      setStatus('success');
    } catch {
      setErrorMessage('Network error. Please try again or email us directly.');
      setStatus('error');
    }
  }
```

to:

```tsx
      setStatus('success');
    } catch {
      setErrorMessage('Network error. Please try again or email us directly.');
      setStatus('error');
    } finally {
      setTurnstileToken('');
      setTurnstileReset((n) => n + 1);
    }
  }
```

- [ ] **Step 4: Render the widget above the submit button**

Immediately BEFORE the error-message block (the `{status === 'error' && errorMessage && (` block, line 236), insert:

```tsx
                  <Turnstile
                    onVerify={setTurnstileToken}
                    onExpire={() => setTurnstileToken('')}
                    resetSignal={turnstileReset}
                  />
```

- [ ] **Step 5: Typecheck and lint**

Run: `npm run typecheck`
Expected: no errors.

Run: `npm run lint`
Expected: no errors for `components/contact/ContactContent.tsx`.

- [ ] **Step 6: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000/contact`.
Expected (no site key set locally): form renders normally, the `<Turnstile>` renders nothing (returns `null`), submit still works exactly as before. With a real `NEXT_PUBLIC_TURNSTILE_SITE_KEY` set, the managed widget appears (usually invisible) above the button.

- [ ] **Step 7: Commit**

```bash
git add components/contact/ContactContent.tsx
git commit -m "feat: render Turnstile widget and send token from contact form

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Config — env docs + Dockerfile build ARG

**Files:**
- Modify: `.env.example`
- Modify: `Dockerfile`

**Interfaces:**
- Consumes: nothing.
- Produces: documented env vars; site key available at build time in the Docker image.

- [ ] **Step 1: Document the new env vars**

In `.env.example`, AFTER the `RESEND_API_KEY` block (after line 53) and the contact email overrides, add:

```bash
# Cloudflare Turnstile — contact-form bot challenge (managed mode).
# Create a widget at https://dash.cloudflare.com -> Turnstile.
# If both are unset, the contact route SKIPS verification (local dev).
NEXT_PUBLIC_TURNSTILE_SITE_KEY=   # public, baked into the client bundle
TURNSTILE_SECRET_KEY=             # server-only, used by siteverify

# Contact-form rate limit (per IP). Defaults: 5 per 10 minutes.
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MS=600000
```

- [ ] **Step 2: Add the build ARG to the Dockerfile**

In `Dockerfile`, add to the ARG list (after line 34, `ARG NEXT_PUBLIC_GA_MEASUREMENT_ID`):

```dockerfile
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

And add to the `ENV` block (extend the existing `ENV ... \` chain ending at line 41 — append a new line before the final var's newline so it reads):

```dockerfile
    NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

(Note: `TURNSTILE_SECRET_KEY` is runtime-only — it is NOT a build ARG. Set it as a Railway service variable only.)

- [ ] **Step 3: Verify the build still parses**

Run: `npm run build`
Expected: build completes successfully (the new env var being empty is fine — the widget just renders `null`).

- [ ] **Step 4: Commit**

```bash
git add .env.example Dockerfile
git commit -m "chore: document Turnstile + rate-limit env vars and Docker build arg

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Post-Implementation: Deployment checklist (manual, by the user)

Not code — record here so it isn't lost:

1. Create a Turnstile widget at Cloudflare dash → Turnstile → add site `hagopianink.com`, **Managed** mode. Copy the **Site Key** and **Secret Key**.
2. In Railway service variables, set: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`. (Optionally `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MS` to override defaults.)
3. Ensure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is also passed as a Railway **build arg** (Railway forwards service vars as build args to the Dockerfile automatically, but confirm).
4. Redeploy. Submit the live form once to confirm an email arrives and the widget challenge is enforced.

---

## Self-Review

**Spec coverage:**
- Honeypot + validation (keep as-is) → untouched, confirmed in Task 3 check order. ✓
- In-process rate limiter, sliding window, 5/10min, self-cleaning, `getClientIp` via x-forwarded-for → Task 1. ✓
- Turnstile managed mode, client widget + reset-after-submit, server siteverify, fail-open-when-unset / fail-closed-on-error → Tasks 2, 3, 4. ✓
- Check order honeypot→429→400→Turnstile→Resend → Task 3 Steps 4-5. ✓
- Env vars + Dockerfile ARG → Task 5. ✓
- TDD for rate limiter → Task 1 (tests written before impl). ✓
- 429 user copy → Task 3 Step 4 + delivered to existing error display in Task 4. ✓
- No Redis / single-container assumption → stated in Global Constraints + Task 1 module comment. ✓

**Placeholder scan:** No TBD/TODO; every code step shows complete code. ✓

**Type consistency:** `checkRateLimit`/`getClientIp`/`resetRateLimit` signatures identical across Task 1 definition and Task 3 consumption. `turnstileToken` named consistently in route type (Task 3), client state and POST body (Task 4). `<Turnstile>` prop names (`onVerify`/`onExpire`/`resetSignal`) identical in Task 2 definition and Task 4 usage. ✓
