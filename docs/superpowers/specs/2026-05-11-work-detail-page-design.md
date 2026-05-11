# Single-work detail page fed from WordPress

**Date:** 2026-05-11
**Status:** Implemented (2026-05-11)
**Scope:** `/work/<slug>` detail page. Replaces the `CASE_STUDIES`-driven `CaseStudyPage.tsx` with a WP-fed renderer for the same posts that now feed the `/work/` listing (Tasks 1-9, ticket #1).

---

## Goals

1. Keep the React-styled page header (the cream block with serif title, eyebrow `BRANDING • WEBSITE/UX • LUXURY • LIFESTYLE • FASHION`, subtitle, and intro paragraph) — sourced from WP fields, but with the current visual design.
2. Keep the "Related Work" grid and "Start a Conversation" CTA at the bottom — content from WP, design from the current React site.
3. Render the middle of the page from the `works` post's ACF flex content (`template_part`), implementing each WP layout as a small React component. Layouts mirror WP structurally; typography and colors use the new brand tokens.
4. Drop `case-studies.ts` as the source of truth for detail pages. Keep the file for now (it stops being imported); delete in a follow-up once we're confident.
5. SSR is explicitly out of scope for this ticket but acknowledged for future.

## Non-goals

- No SSR / static gen. Client-side fetch per detail page. (Future ticket.)
- No new design or layout. Visual fidelity is "matches the screenshot pair shared in chat: kept React header + kept React Related Work + flex-content middle styled with new brand tokens."
- No CMS-driven hero, no CMS-driven CTA, no CMS-driven related-work component. Those stay React-only.
- No backwards-compatibility shim. Once `CaseStudyPage.tsx` reads from WP, the old `case-studies.ts` data is unused. (Backup is git history.)

---

## Architecture

```
WP works post (ACF: post_builder / template_part flex)
   ↓
jab/get-works-by-slug ability (via lib/sdk getWorksBySlug)
   ↓
api-server  GET /api/works/:slug
   ↓  payload { post, related[] }
React: useWork(slug) hook
   ↓
 React header (kept)
 → FlexBlocks loop (new)
 → Related Work (kept)
 → CTA (kept)
 → Footer
```

The api-server endpoint bundles the post AND a small `related[]` array so the detail page renders both with one request. Related works are derived server-side (random N posts sharing a `work` term, excluding current). Drops noise from the client.

---

## API contract — `GET /api/works/:slug`

**200 OK:**

```ts
{
  post: {
    slug: string;
    title: string;
    featuredImage: string | null;
    termNames: string[];     // ordered, deduplicated WP `work` taxonomy term display names
    tagNames: string[];      // ordered WP `tag` taxonomy term names (may be empty)
    subtitle: string;        // ACF `journal_post_subtitle`, "" when unset — left blank in UI when empty
    intro: string;           // ACF `journal_short_desc` ?? WP excerpt, "" when both empty — left blank when empty
    blocks: FlexBlock[];     // server-filtered to known layouts only
  };
  related: Array<{
    slug: string;
    title: string;
    thumbnail: string | null;
  }>;
}
```

**404 Not Found:**

```ts
{ error: "Not found" }
```

**5xx:** Express error handler renders the underlying error. Matches `/api/works` style.

### Server-side derivation rules

- `post.slug`: passthrough.
- `post.title`: `getWorksBySlug` output `title` (already HTML-decoded by the WP plugin).
- `post.featuredImage`: `our_work.featured_image?.url ?? null`.
- `post.termNames`: `our_work.work.map(t => t.name)`. Names not slugs because the header eyebrow uses display names. If WP returns no `work` terms (data anomaly), this is `[]`.
- `post.tagNames`: `our_work.tag.map(t => t.name)` if the `tag` taxonomy is present in the SDK output. If absent or empty, `[]`.
- `post.subtitle`: `our_work.acf.journal_post_subtitle ?? ""`. Empty string is the explicit "not set" signal; UI hides the element when empty.
- `post.intro`: `our_work.acf.journal_short_desc || our_work.excerpt || ""`. `||` not `??` so empty strings from ACF still fall through to the excerpt.
- `post.blocks`: see "Flex block filtering" below.
- `related[]`: a second `getOurWork({ work_term_slug: <primary term> })`-style call, or — if the ability doesn't support filtering — fetch all works once, filter to those sharing at least one `work` term with the current post (excluding the current), and shuffle-pick 4. Implementation picks whichever the SDK supports today; if neither, falls back to all-recent-excluding-current (4).

### Flex block filtering (server-side)

The server only forwards layouts the client knows how to render. Unknown layouts are dropped silently.

**Forwarded layouts (Phase 1):**

| Layout | Brief shape |
|---|---|
| `two-columns-single-work` | `{ title, description }` |
| `columns-single-work` | `{ column: Array<{ name, title, description }> }` |
| `full-image-single-work` | `{ image }` |
| `text-bock-single-work` | `{ name, title, description, width, background_color }` |
| `mobile-pages-single-work` | `{ images: Array<{ image: { url } }> }` |
| `desktop-pages` | `{ nav_bar, full_width, first_page, second_page, automatic_alignment }` |
| `slider` | `{ images: Array<{ image }> }` |
| `slider_two_slides` | `{ images: Array<{ url }> }` (note `url` not `image`) |
| `gallery` | `{ images: Array<{ url }> }` |

**Explicitly dropped (Phase 1):**

| Layout | Why dropped |
|---|---|
| `header-single-work` | Superseded by the React header |
| `similar-work` | Superseded by the React Related Work component |
| `contact-form`, `contact-form-global` | Superseded by the React CTA |
| `subscription-form`, `subscription-form-global` | Same |
| `our-work` | Page-level component, not relevant on detail pages |
| `views-device-single-work` | Not in use on real posts per audit; can add later |
| Any other layout the SDK might emit | Dropped — implementor unknown |

The server's allowlist is a hard-coded `Set<string>` in the route. If a new layout shows up in WP that we want to handle, this set + a new React component + an update to the FlexBlock TS union are the three places to touch.

### Client-side `FlexBlock` type

A narrowed discriminated union over the 9 covered layouts. The SDK's `GetWorksBySlugOutput['our_work']['acf']['template_part']` is the full union including dropped layouts; the client-side `FlexBlock` is intentionally smaller. The server's allowlist and the client's union must stay in sync. A test or type assertion ensures this.

---

## React structure

### File layout

```
artifacts/hagopian-site/src/
├── pages/
│   └── CaseStudyPage.tsx           (rewritten — reads from /api/works/:slug)
├── components/
│   └── work-flex/                  (new directory)
│       ├── index.tsx               (renderBlock switch)
│       ├── types.ts                (FlexBlock union)
│       ├── TwoColumns.tsx
│       ├── Columns.tsx
│       ├── FullImage.tsx
│       ├── TextBlock.tsx
│       ├── MobilePages.tsx
│       ├── DesktopPages.tsx
│       ├── Slider.tsx
│       ├── SliderTwoSlides.tsx
│       └── Gallery.tsx
```

### File size discipline

- Each flex component: 30–120 lines. One layout per file. State is local to the component when needed (carousel index, etc.). No cross-component coordination.
- `index.tsx`: a switch statement over `block.acf_fc_layout`, plus the public `renderBlock(block, key)` function. Under 60 lines.
- `CaseStudyPage.tsx`: target 200–300 lines. Header rendering, useWork hook, flex loop, related-work component, CTA, footer. Loading & error states.

### Existing components to lift / adapt

The current `CaseStudyPage.tsx` (~1100 lines) contains rich components from the local-data era. These are parts donors:

- **`Carousel`** (current file, lines ~80–180): adapt into `Slider.tsx`. Auto-advance, prev/next, dots. Drop the props that don't apply to WP flex content (e.g. `dark` becomes default-false; the WP slider doesn't have a dark variant).
- **`MobileFrames`** (current file): adapt into `MobilePages.tsx`. The phone-frame clip work we did is preserved.
- **`ColumnsThree`** (current file, lines 16–69): adapt into `Columns.tsx` but generalize to 1/2/3 column counts and drop the hard-coded labels (Challenge/Solution/Result).
- Other rendering (text, text-image, full-image, contained-image, logo-grid, quote): some have direct flex analogues, some don't. Lift what helps, leave the rest.

### Hook

```ts
function useWork(slug: string) {
  const [post, setPost] = useState<DetailPost | null>(null);
  const [related, setRelated] = useState<RelatedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch(`/api/works/${encodeURIComponent(slug)}`);
        if (res.status === 404) {
          if (!cancelled) {
            setPost(null);
            setRelated([]);
          }
          return;
        }
        if (!res.ok) throw new Error(`/api/works/${slug} returned ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        setPost(data.post);
        setRelated(data.related);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  return { post, related, loading, error };
}
```

Slug change triggers refetch (the dependency on `slug`). The cancellation guard handles the case where the user navigates between detail pages faster than the network responds.

### Page render flow

```tsx
export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const { post, related, loading, error } = useWork(slug);

  if (loading) return <PageShell><LoadingSection /></PageShell>;
  if (error) return <PageShell><ErrorSection message={error} /></PageShell>;
  if (!post) return <PageShell><NotFoundSection slug={slug} /></PageShell>;

  return (
    <PageShell>
      <Header post={post} />
      {post.blocks.map((block, i) => renderBlock(block, i))}
      {related.length > 0 && <RelatedWork items={related} />}
      <ConversationCTA />
    </PageShell>
  );
}
```

`PageShell` is the existing `<Nav> ... <Footer />` wrapper. `Header` reads from `post`. `RelatedWork` and `ConversationCTA` mirror the components currently at the bottom of the existing `CaseStudyPage.tsx`.

### Header content rules

| Element | Source | Behavior when empty |
|---|---|---|
| H1 title | `post.title` | Required — never empty in practice |
| Eyebrow | `[...termNames, ...tagNames]` joined with ` • ` | Hidden when both arrays are empty |
| Subtitle (large italic) | `post.subtitle` | Hidden (no placeholder) |
| Intro paragraph | `post.intro` | Hidden (no placeholder) |

If subtitle and intro are both empty, the header still renders title + eyebrow; the two-column block just collapses to a single column.

---

## Styling — hybrid (WP layout structure + new brand typography/colors)

For each flex layout, the React component:

- **Borrows column ratios, image placement, alignment, and padding rhythm** from `wordpress/themes/skmframework/assets/scss/components/templates/*.scss`. The live site at `https://hagopian-ink.local/` is the visual reference of record.
- **Uses new brand tokens** (`SERIF`, `SANS`, `NAV_FONT` from `@/lib/brand`) for fonts and the existing brand color palette (`#2d3232`, `#f1efef`, `#f5f0eb`, neutral grays).
- **Avoids loading the WP theme CSS at runtime.** All styles are in-component (Tailwind utilities + inline styles for one-off values like the 1170px container width).

The two screenshots shared in chat (the kept React header and the kept Related Work + CTA grid) establish the typographic and color tone for everything in between.

### Mapping notes for trickier blocks

- **`text-bock-single-work` `background_color`**: the only special value in the SDK enum is `linear-gradient-dribbble`. Without seeing real posts using this, the safe mapping is: any non-empty value falls back to the same neutral background as the rest of the page. If a real post comes through with `linear-gradient-dribbble`, we add a one-line mapping then.
- **`text-bock-single-work` `width`**: percentage centered-block width on the description. Honor as-is on desktop; on narrow viewports clamp to ~85% min for readability.
- **`desktop-pages` `nav_bar`**: pick between the black or silver browser-bar PNG (same URLs already used in the current `CaseStudyPage.tsx` constants `SILVER_NAV` / `BLACK_NAV`).
- **`mobile-pages-single-work`**: phone-frame PNG already used in current `CaseStudyPage.tsx` constant `PHONE_PNG`. The pixel-accurate clip work done earlier is preserved.

---

## Loading, error, 404, empty states

- **Loading**: page chrome (Nav + Footer) renders immediately. Content area shows a centered "Loading…" line in `NAV_FONT`.
- **Error**: red mono error message in the content area.
- **404**: a small "We couldn't find that work" message with a `← All Work` link.
- **Empty blocks**: post with `blocks: []` (no recognized flex layouts) — render the header + related work + CTA. Middle of the page is a thin spacer. Document this is the expected "untouched post" state.
- **No related**: when the post has zero terms or no other works share its terms, the Related Work section is omitted (per `related.length > 0` guard).

---

## File touch list

**New:**
- `artifacts/api-server/src/routes/works.ts` — **modify** to add `GET /:slug` handler (existing file from previous ticket). Server-side filtering of blocks lives here.
- `artifacts/hagopian-site/src/components/work-flex/` — entire new directory (10 files).

**Modified:**
- `artifacts/hagopian-site/src/pages/CaseStudyPage.tsx` — gutted and rewritten. New file is the smallest version that wires header + flex loop + related + CTA.

**Untouched:**
- `artifacts/hagopian-site/src/lib/case-studies.ts` — stops being imported but stays in the repo for one ticket cycle. Deleted in a follow-up.
- `artifacts/hagopian-site/src/pages/WorkPage.tsx` — listing page from the previous ticket, unchanged.
- `lib/sdk/*` — autogenerated, untouched.
- WordPress theme files — untouched.

---

## SDK init race carryover

The `Promise.all` race we hit in the listing ticket applies here too. Both `getWorksBySlug` and the related-works fetch are SDK calls. They must be sequential on cold start. Use the same pattern as the listing route — explicit `await` per call, with a comment pointing to `jab SDK + wp-headless-kit gotchas` memory note.

---

## Acceptance

- `/work/todd-duncan-cashmere-branding-design` renders identically (structurally) to the live WP post, with the new React header at the top and the new React Related Work + CTA at the bottom.
- Navigating to a different `/work/<slug>` refetches and re-renders correctly.
- A slug that doesn't exist in WP returns a 404 UI, not a runtime error.
- A post with zero recognized flex blocks still renders header + related + CTA (no crash, no empty white middle except a thin spacer).
- All 18 known works render without errors. Console clean on every navigation.
- No imports remain from `case-studies.ts` in `CaseStudyPage.tsx`.

## Out of scope (deferred)

- SSR / static gen — future ticket.
- `views-device-single-work` and other rarely-used layouts — added when first needed.
- ACF flex content for `pages` post type — separate post type, separate ticket.
- Delete `case-studies.ts` — follow-up after a few weeks of confidence.
- Pixel-perfect WP fidelity for fonts — minor variance from Sackers Gothic / Bitter / etc. is accepted per the user's note.
