# /work/ listing fed from WordPress

**Date:** 2026-05-11
**Status:** Design — approved, ready for implementation plan
**Scope:** Listing page only. Detail pages (`/work/<slug>`) continue to render from `CASE_STUDIES` for this ticket; their migration is the next ticket.

---

## Goal

Replace the hard-coded `slugs` arrays inside `WorkPage.tsx` `GROUPS` with data from the WordPress `works` CPT and `work` taxonomy, without changing the page's design or copy. Categories (group labels + descriptive copy) stay React-side. The set of works under each group, their titles, thumbnails, and per-card category label come from WP.

## Non-goals

- No design or copy changes.
- No migration of `/work/<slug>` detail pages — those still read from `case-studies.ts`.
- No changes to the four group narrative descriptions; they remain in React.
- No new tooling, build steps, or auth changes.

---

## Data flow

```
 WP (works CPT, work taxonomy)
   │
   │  MCP adapter abilities (already registered):
   │    jab/get-our-work
   │    jab/get-work-type
   ▼
 jab SDK (lib/sdk) — JSON-RPC over /wp-json/mcp
   │
   ▼
 api-server  GET /api/works
   │  shapes payload: { works, terms }
   ▼
 WorkPage.tsx  useWorks() hook
   │
   ▼
 GROUPS[termSlug] → filter works by termSlugs.includes(group.termSlug)
   │
   ▼
 ProjectCarousel (unchanged)
```

The MCP adapter abilities bypass the `show_in_rest` issue on the `works` CPT entirely — they have their own registration model.

---

## API contract

### `GET /api/works`

**Response 200:**

```ts
{
  works: Array<{
    slug: string;            // e.g. "joseph-robert"
    title: string;           // card heading (replaces CaseStudy.client)
    thumbnail: string | null; // featured image url
    termSlugs: string[];     // all work-type term slugs this work belongs to
    primaryTermName: string; // first term's display name → card category label
  }>;
  terms: Array<{
    slug: string;
    name: string;
    count: number;
  }>;
}
```

**Response 5xx:** Error bubbles via Express error handler (matches `/api/posts`).

### Derivation rules in the route handler

- `works[]`: from `getOurWork(client)`, in returned order. Sort: rely on WP order (jab abilities return posts in `menu_order`/`date` per WP defaults — no explicit sort applied here).
- `slug`, `title` map 1:1 from the SDK output.
- `thumbnail`: `our_work.featured_image?.url ?? null`. The fallback image used by the listing card lives client-side (existing `FALLBACK` const) — the server returns `null` when WP has nothing.
- `termSlugs`: `our_work.work.map(t => t.slug)`. Order preserved as WP returns.
- `primaryTermName`: `our_work.work[0]?.name ?? ''`. Empty string when a work has no terms; client falls back to a literal `''` label (acceptable for current design — no untagged works in current set, but doesn't crash).
- `acf.template_part` flex blocks: **discarded server-side**. Not needed for the listing card; keeping them out keeps the payload small.
- `terms[]`: from `getWorkType(client, { hide_empty: true })`. Returned for client-side debug/visibility only; not strictly required by the current render. Useful for verifying term-slug match when wiring this up.

---

## Client changes

### `WorkPage.tsx`

**`GROUPS` shape change.** Today:

```ts
type Group = { label: string; desc: string; slugs: string[] };
```

Becomes:

```ts
type Group = { termSlug: string; label: string; desc: string };
```

The four group entries keep their existing `label` + `desc` copy verbatim. Each gains a `termSlug` field pointing at the matching WP `work` taxonomy term:

```ts
const GROUPS: Group[] = [
  { termSlug: '<verify in WP>', label: 'Brand Identity',         desc: '...' },
  { termSlug: '<verify in WP>', label: 'Website Design',         desc: '...' },
  { termSlug: '<verify in WP>', label: 'Email Marketing',        desc: '...' },
  { termSlug: '<verify in WP>', label: 'Multichannel Campaigns', desc: '...' },
];
```

The `<verify in WP>` placeholders are resolved during implementation by hitting `/api/works` once and reading the actual term slugs from the `terms[]` array. They are then hard-coded. (See "Open questions" below.)

**New hook.** `useWorks()` mirrors `usePosts()` in `BlogPage.tsx`:

```ts
function useWorks() {
  // fetch('/api/works'), store { works, terms }, loading, error
}
```

**Group rendering.** The existing `GROUPS.map((group, gi) => { ... })` block stays, but the cases lookup changes from:

```ts
const cases = group.slugs.map(s => BY_SLUG[s]).filter(Boolean);
```

to:

```ts
const cases = works
  .filter(w => !HIDDEN_SLUGS.has(w.slug))
  .filter(w => w.termSlugs.includes(group.termSlug))
  .map(toCard);
```

where `toCard(work)` returns an object with the four fields `ProjectCarousel` actually reads: `slug`, `client` (← `work.title`), `category` (← `work.primaryTermName`), `thumb` (← `work.thumbnail ?? FALLBACK`). The `CaseStudy` type stays in `case-studies.ts` for the detail page; the listing uses a smaller local type.

**Empty-section behavior unchanged.** The existing `if (!cases.length) return null` guard remains, so a group with no matching WP works renders nothing.

**`HIDDEN_SLUGS` stays client-side.** It lives next to `GROUPS` in `WorkPage.tsx` (same place editors look for content config). Applied to the WP results before grouping.

**`CategoryNav` unchanged.** It already consumes `GROUPS` and derives anchors from `label`. Works as-is once `Group` shape changes (it only reads `label`).

### Loading and error states

- **Loading:** While `useWorks()` is loading, render the page skeleton (hero, sticky nav from `GROUPS` labels still works since those are React-side) but skip the group sections. Same approach as `BlogPage` (`{!loading && ...}` guards).
- **Error:** A small message in place of the first group's content area. Matches `BlogPage` error treatment.
- **Empty:** Page renders hero + sticky nav + CTA only; all four groups will skip via the existing `if (!cases.length) return null` guard.

---

## File touch list

**New:**
- `artifacts/api-server/src/routes/works.ts` — Express route. Imports SDK client.

**Modified:**
- `artifacts/api-server/src/routes/index.ts` — register `worksRouter`.
- `artifacts/hagopian-site/src/pages/WorkPage.tsx` — `Group` shape, `useWorks()` hook, render path.

**Not touched:**
- `artifacts/hagopian-site/src/lib/case-studies.ts` (still feeds `/work/<slug>`).
- `artifacts/hagopian-site/src/pages/CaseStudyPage.tsx`.
- `wordpress/themes/skmframework/lib/register_post_types.php` — no `show_in_rest` change; abilities cover it.
- `wordpress/themes/skmframework/lib/register_taxonomies.php` — same.

---

## SDK integration in api-server

The api-server doesn't currently import `lib/sdk`. Two options the implementation plan must resolve:

1. **Path-based TS import** (`import { createClient, getOurWork, getWorkType } from "../../../../lib/sdk"`) — works because the api-server is bundled by esbuild.
2. **pnpm workspace dependency** — add `lib/sdk` as a workspace package and depend on it normally.

Implementation plan picks one based on inspecting the monorepo layout. The path-based import is the lower-friction choice if `lib/sdk` isn't already wired as a workspace.

The client is instantiated once at module load using existing env vars (`WP_URL`, `WP_USER`, `WP_APP_PASSWORD`) — same vars `posts.ts` reads today via `wpCredentials()`.

---

## Open questions for implementation

1. **Actual term slugs in WP.** Before hard-coding `termSlug` values in `GROUPS`, the implementation should hit `/api/works` once and log `terms[]` to confirm exact slugs. If WP uses, say, `brand-identity` vs `brand` vs `branding`, the literal must match.
2. **"Multichannel Campaigns" term existence.** Currently only 2 slugs (`la-perla-multichannel-campaign-design`, `montefiore-healthcare-design`). If no `multichannel-campaigns` term exists in WP, the section disappears. That's acceptable (matches "empty section skipped" rule) but worth flagging to the user before final wire-up.
3. **Untagged works.** If a WP work has zero `work` terms, it won't appear in any group (no `termSlugs` matches). Current behavior in React with hard-coded slugs is identical — untagged work simply isn't listed. No-op for this design.

---

## Acceptance

- `/work/` renders four sections with the same labels and narrative copy as before.
- Each section's project cards come from WP `works` posts tagged with the corresponding `work` taxonomy term.
- Card thumbnails are the WP featured images (or fallback when absent).
- Card category label is the first term name from WP.
- Clicking a card still goes to `/work/<slug>` (existing CaseStudyPage from `case-studies.ts`).
- `HIDDEN_SLUGS` exclusions still apply.
- Sticky CategoryNav still works and labels match.

## Out of scope (deferred to next ticket)

- Migrating `/work/<slug>` detail pages to read from WP ACF flex content (`template_part` on `our_work`).
- Mapping the 7+ single-work flex layouts to React components.
- Any change to design or copy on the listing page.
