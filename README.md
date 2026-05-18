# Hagopian Ink — Site

Next.js 15 (App Router, Turbopack) + React 19 RC + Tailwind. Content is sourced from a headless WordPress install at `hagopianink.wpengine.com` via the auto-generated [`jab`](https://github.com/skm/wp-headless-kit) SDK in `lib/sdk/`.

## Dev

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run build
```

Environment is read from `.env.local` (see `.env.example` for keys).

## Working with the jab SDK

`lib/sdk/` is **generated** from the WordPress MCP adapter. Don't hand-edit. To resync after WP schema changes (new ACF fields, new taxonomies, new abilities):

```bash
npx jab sync
```

Config lives in `.jab/config.json` and should point at `https://hagopianink.wpengine.com` (the production WP Engine site), not a local Flywheel instance.

### ⚠️ After every `jab sync` — delete the catch-all proxy

`jab sync` re-bootstraps a strangler-fig WP proxy route at `app/[[...slug]]/route.ts`. This site has fully migrated all routes to Next, so the proxy is unused — and worse, it **collides with `app/page.tsx`** and prevents `npm run dev` from starting:

```
Error: You cannot define a route with the same specificity as a optional catch-all route ("/" and "/[[...slug]]")
```

After running `jab sync`, delete the file:

```bash
rm -rf "app/[[...slug]]"
```

(Or convert the optional catch-all `[[...slug]]` → required catch-all `[...slug]` if a fallback proxy is ever needed again. Today it isn't.)

## Architecture notes

- **`app/`** — Next.js App Router. `(marketing)` is a route group for the main marketing pages (about, contact, expertise, legal).
- **`components/`** — React components used by the live site. Edit these.
- **`components/expertise/*Content.tsx`** — One file per expertise subpage. Mirror copy/style changes here.
- **`artifacts/hagopian-site/`** — The original Replit Vite/React export the client built. **Not deployed.** Kept as a visual reference during the port; safe to ignore for ongoing work unless you're checking parity.
- **`lib/sdk/`** — Generated SDK (do not edit).
- **`lib/jab/client.ts`** — Project-policy SDK client wrapper (safe to edit).
- **`lib/wp/`** — Hand-written WP data adapters that shape SDK output into view models.
- **`wordpress/themes/skmframework/`** — The WP-side companion theme that exposes the CPTs, ACF flex blocks, and MCP abilities the SDK consumes.

## Content model quick reference

- `our_work` CPT → case studies at `/work/[slug]`
- `journal` (posts) → blog at `/blog/[slug]`
- `work` taxonomy → primary categorization (Email, Brand, etc.)
- `expertise-tag` taxonomy → secondary tagging (drives "Featured Work" on expertise subpages and the eyebrow on case study detail pages)
