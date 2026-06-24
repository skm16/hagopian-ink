# Contact Form Anti-Spam — Design

**Date:** 2026-06-24
**Status:** Approved for planning
**Scope:** Add two anti-spam layers (in-process rate limiting + Cloudflare Turnstile) on top of the existing honeypot and server-side validation for the contact form.

---

## Context

The live site is a **Next.js 15 App Router** app (repo root), deployed as a **single long-lived Node container on Railway** (Dockerfile + `output: 'standalone'`). It is **not** Vercel serverless — this matters for state storage.

The contact form already submits to a real backend:

- **Form UI:** [components/contact/ContactContent.tsx](../../../components/contact/ContactContent.tsx) — client component, POSTs JSON to `/api/contact`.
- **Route handler:** [app/api/contact/route.ts](../../../app/api/contact/route.ts) — validates, then sends email via **Resend**.

The `artifacts/` directory (Express server, React-Router pages) is the dead Replit port and is **out of scope** — it is not built into the Docker image (see [Dockerfile](../../../Dockerfile)).

### Existing protection (keep as-is)

1. **Honeypot** — hidden `website` field ([ContactContent.tsx:223](../../../components/contact/ContactContent.tsx)); if filled, route returns a fake `200` and sends nothing ([route.ts:40-43](../../../app/api/contact/route.ts)).
2. **Server-side validation** — required fields, email regex, 5000-char message cap ([route.ts:45-57](../../../app/api/contact/route.ts)).

### Gaps this design closes

- **No rate limiting** — anyone who finds `/api/contact` can POST unlimited submissions (junk email floods, Resend quota burn).
- **No challenge** — sophisticated / headless-browser bots sail past the honeypot.

User goal: **belt-and-suspenders** — add *both* missing layers.

---

## Defense-in-depth model

A submission must pass **all** layers; each catches a different bot class and degrades independently.

| Layer | Catches | Status | UX cost |
|---|---|---|---|
| Honeypot (`website`) | Dumb auto-fill bots | Exists | None |
| Server-side validation | Malformed / oversized junk | Exists | None |
| **Rate limiting (in-process)** | Volume floods, same-IP spam | **New** | None |
| **Cloudflare Turnstile** | Smart / headless bots | **New** | ~Invisible (managed mode) |

All enforcement is **server-side** in `route.ts`. The client is untrusted; the Turnstile token and rate-limit check are both verified on the server.

---

## Component 1 — In-process rate limiter

**New module:** `lib/rate-limit.ts`

**Interface (pure, no I/O):**

```ts
checkRateLimit(
  key: string,
  opts: { limit: number; windowMs: number }
): { ok: boolean; retryAfter?: number }
```

**Behavior:**

- Module-level `Map<string, number[]>` (key → recent submission timestamps). Valid because Railway runs one persistent process with stable memory between requests.
- **Sliding window.** Default: **5 submissions per 10 minutes per IP** (env-tunable).
- On exceed → `{ ok: false, retryAfter }`; route returns `429` with a `Retry-After` header.
- **Self-cleaning:** expired timestamps pruned on each call, so the Map cannot grow unbounded. No background timer.
- **Client IP:** `getClientIp(req)` helper reads `x-forwarded-for`, takes the first hop, falls back to a constant `'unknown'` if absent. Railway-proxy assumption documented inline.

**Why in-process over Redis:** single-container deploy makes external state pure overhead (YAGNI). Interface kept clean so swapping to Redis/Upstash is trivial if the deploy ever goes multi-instance or serverless.

**Decision (approved):** in-process, no Redis.

---

## Component 2 — Cloudflare Turnstile

**Decision (approved):** Cloudflare Turnstile in **managed / invisible** mode — free unlimited, privacy-friendly (no Google tracking), good brand + UX fit. Already a Cloudflare user (`CLOUDFLARE_ZONE_ID` in `.env`).

### Client ([ContactContent.tsx](../../../components/contact/ContactContent.tsx))

- Load the Turnstile script via `next/script`.
- Render the widget above the submit button using `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (managed mode → invisible for most users).
- Widget produces a token; include it in the POST body as `turnstileToken`.
- Submit button disabled until a token exists.
- **Reset the widget after submit/error** — a stale token is rejected by siteverify as already-used. Wrap so it resets cleanly.

### Server ([route.ts](../../../app/api/contact/route.ts))

- Before sending email, POST `{ secret: TURNSTILE_SECRET_KEY, response: turnstileToken, remoteip: clientIp }` to `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
- If `success !== true` → return `400`, never call Resend.
- **Graceful degradation (approved):** if Turnstile keys are **unset** (local dev), **skip** the check rather than hard-fail — mirrors the existing `RESEND_API_KEY` guard at [route.ts:32](../../../app/api/contact/route.ts). When keys **are** set but siteverify errors/network-fails in prod → **fail closed** (reject).

---

## Component 3 — Order of checks in the route

Cheapest-first, so no network call is wasted on obvious junk:

```
1. Honeypot filled?      -> fake-200  (existing, no network)
2. Rate limit exceeded?  -> 429       (new, no network)
3. Validation fails?     -> 400       (existing, no network)
4. Turnstile invalid?    -> 400       (new, 1 fetch to siteverify)
5. Send via Resend       -> 200
```

---

## Config — new env vars

Added to [.env.example](../../../.env.example):

```
# Cloudflare Turnstile — contact-form bot challenge.
# Create at https://dash.cloudflare.com -> Turnstile. Use "Managed" mode.
NEXT_PUBLIC_TURNSTILE_SITE_KEY=   # public, client widget (baked into bundle)
TURNSTILE_SECRET_KEY=             # server-only, siteverify

# Optional rate-limit tunables (defaults: 5 per 10 min per IP).
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MS=600000
```

**Dockerfile:** add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` as an `ARG`/`ENV` (baked into client bundle at build time, like the other `NEXT_PUBLIC_*` vars at [Dockerfile:31-34](../../../Dockerfile)). `TURNSTILE_SECRET_KEY` is runtime-only — no ARG.

---

## Testing & error handling

- **TDD for `lib/rate-limit.ts`:** under-limit passes; over-limit blocks; window expiry resets; distinct IPs isolated; expired-entry pruning.
- **Turnstile failure modes:** unset keys → fail open (local dev); set keys + siteverify error → fail closed (prod reject).
- **User-facing copy:** one friendly `429` message — "Too many attempts, please try again shortly." All other rejections reuse existing error display in [ContactContent.tsx:236-240](../../../components/contact/ContactContent.tsx).

---

## Scope boundaries (explicitly NOT touched)

- WordPress backend, ACF, theme.
- `artifacts/` Express server and React-Router pages (dead Replit port).
- Resend domain verification / deliverability (separate task).
- No Redis or other new runtime dependency. Only addition: Turnstile's CDN script (client) + the `resend` SDK already present. Rate limiter is ~40 lines of vendor-free code.

---

## Open defaults confirmed with user

- Rate limit: **5 / 10 min / IP** ✓
- Turnstile: **managed / invisible** mode ✓
- Turnstile keys unset → **fail open** for local dev ✓
