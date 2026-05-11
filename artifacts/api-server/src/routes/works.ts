import { Router } from "express";
import { getOurWork, getWorkType, getWorksBySlug } from "@workspace/sdk/abilities";
import { getJabClient } from "../lib/jab";

const router = Router();

interface WorkListItem {
  slug: string;
  title: string;
  thumbnail: string | null;
  termSlugs: string[];
  primaryTermName: string;
}

interface TermListItem {
  slug: string;
  name: string;
  count: number;
}

router.get("/works", async (_req, res, next) => {
  try {
    const client = getJabClient();
    // Sequential, not Promise.all: the MCP client's init handshake is not
    // concurrency-safe — parallel first calls race on the session ID.
    const workData = await getOurWork(client);
    const termData = await getWorkType(client, { hide_empty: true });

    const works: WorkListItem[] = workData.our_work.map((w) => ({
      slug: w.slug,
      title: w.title,
      thumbnail: w.featured_image?.url ?? null,
      termSlugs: w.work.map((t) => t.slug),
      primaryTermName: w.work[0]?.name ?? "",
    }));

    const terms: TermListItem[] = termData.work_type.map((t) => ({
      slug: t.slug,
      name: t.name,
      count: t.count,
    }));

    res.json({ works, terms });
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------------------------
   GET /api/works/:slug — single-work detail
   ------------------------------------------------------------------------- */

interface DetailPost {
  slug: string;
  title: string;
  featuredImage: string | null;
  termNames: string[];
  tagNames: string[];
  subtitle: string;
  intro: string;
  blocks: FlexBlock[];
}

interface RelatedItem {
  slug: string;
  title: string;
  thumbnail: string | null;
}

// Discriminated union for layouts the React side actually renders.
// Keep in sync with `artifacts/hagopian-site/src/lib/work-detail-types.ts`.
type FlexBlock =
  | { acf_fc_layout: "two-columns-single-work"; title: string; description: string }
  | { acf_fc_layout: "columns-single-work"; columns: Array<{ name: string; title: string; description: string }> }
  | { acf_fc_layout: "full-image-single-work"; image: string }
  | {
      acf_fc_layout: "text-bock-single-work";
      name: string;
      title: string;
      description: string;
      width: number | null;
      background: "gradient" | "plain";
    }
  | { acf_fc_layout: "mobile-pages-single-work"; images: string[] }
  | {
      acf_fc_layout: "desktop-pages";
      navBar: "black" | "silver";
      fullWidth: string | null;
      firstPage: string | null;
      secondPage: string | null;
      automaticAlignment: boolean;
    }
  | { acf_fc_layout: "slider"; images: string[] }
  | { acf_fc_layout: "slider_two_slides"; images: string[] }
  | { acf_fc_layout: "gallery"; images: string[] };

const KNOWN_LAYOUTS = new Set<string>([
  "two-columns-single-work",
  "columns-single-work",
  "full-image-single-work",
  "text-bock-single-work",
  "mobile-pages-single-work",
  "desktop-pages",
  "slider",
  "slider_two_slides",
  "gallery",
]);

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function asImageUrl(v: unknown): string {
  if (typeof v === "string") return v;
  if (v && typeof v === "object" && "url" in v && typeof (v as { url: unknown }).url === "string") {
    return (v as { url: string }).url;
  }
  return "";
}

function shapeBlock(raw: unknown): FlexBlock | null {
  if (!raw || typeof raw !== "object") return null;
  const layout = (raw as { acf_fc_layout?: unknown }).acf_fc_layout;
  if (typeof layout !== "string" || !KNOWN_LAYOUTS.has(layout)) return null;
  const r = raw as Record<string, unknown>;

  switch (layout) {
    case "two-columns-single-work":
      return {
        acf_fc_layout: "two-columns-single-work",
        title: asString(r.title),
        description: asString(r.description),
      };
    case "columns-single-work": {
      const cols = Array.isArray(r.column) ? r.column : [];
      return {
        acf_fc_layout: "columns-single-work",
        columns: cols.map((c) => {
          const cc = (c ?? {}) as Record<string, unknown>;
          return {
            name: asString(cc.name),
            title: asString(cc.title),
            description: asString(cc.description),
          };
        }),
      };
    }
    case "full-image-single-work":
      return {
        acf_fc_layout: "full-image-single-work",
        image: asImageUrl(r.image),
      };
    case "text-bock-single-work": {
      const rawBg = asString(r.background_color);
      return {
        acf_fc_layout: "text-bock-single-work",
        name: asString(r.name),
        title: asString(r.title),
        description: asString(r.description),
        width: typeof r.width === "number" ? r.width : null,
        background: rawBg === "linear-gradient-dribbble" ? "gradient" : "plain",
      };
    }
    case "mobile-pages-single-work": {
      const images = Array.isArray(r.images) ? r.images : [];
      return {
        acf_fc_layout: "mobile-pages-single-work",
        images: images
          .map((it) => {
            const ii = (it ?? {}) as Record<string, unknown>;
            return asImageUrl(ii.image);
          })
          .filter((url) => url.length > 0),
      };
    }
    case "desktop-pages": {
      const rawNav = asString(r.nav_bar);
      return {
        acf_fc_layout: "desktop-pages",
        navBar: rawNav === "black-nav-bar" ? "black" : "silver",
        fullWidth: asImageUrl(r.full_width) || null,
        firstPage: asImageUrl(r.first_page) || null,
        secondPage: asImageUrl(r.second_page) || null,
        automaticAlignment: asString(r.automatic_alignment) !== "no",
      };
    }
    case "slider": {
      const images = Array.isArray(r.images) ? r.images : [];
      return {
        acf_fc_layout: "slider",
        images: images
          .map((it) => {
            const ii = (it ?? {}) as Record<string, unknown>;
            return asImageUrl(ii.image);
          })
          .filter((url) => url.length > 0),
      };
    }
    case "slider_two_slides": {
      const images = Array.isArray(r.images) ? r.images : [];
      return {
        acf_fc_layout: "slider_two_slides",
        images: images
          .map((it) => {
            const ii = (it ?? {}) as Record<string, unknown>;
            // slider_two_slides uses 'url' not 'image' (per part-slider_two_slides.php)
            return asImageUrl(ii.url ?? ii.image);
          })
          .filter((url) => url.length > 0),
      };
    }
    case "gallery": {
      const images = Array.isArray(r.images) ? r.images : [];
      return {
        acf_fc_layout: "gallery",
        images: images
          .map((it) => {
            const ii = (it ?? {}) as Record<string, unknown>;
            // gallery uses 'url' per part-gallery.php
            return asImageUrl(ii.url ?? ii.image);
          })
          .filter((url) => url.length > 0),
      };
    }
    default:
      return null;
  }
}

router.get("/works/:slug", async (req, res, next) => {
  try {
    const slug = String(req.params.slug ?? "");
    if (!slug) {
      res.status(400).json({ error: "Missing slug" });
      return;
    }

    const client = getJabClient();
    // Sequential — see note above about MCP init handshake concurrency.
    const detail = await getWorksBySlug(client, { slug });

    // SDK returns our_work: null when nothing matches.
    if (!detail.our_work) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    const w = detail.our_work;
    const termNames = w.work.map((t) => t.name);
    const acf = (w.acf ?? {}) as Record<string, unknown>;
    const subtitle = asString(acf["journal_post_subtitle"]);
    const shortDesc = asString(acf["journal_short_desc"]);
    const intro = shortDesc || w.excerpt || "";

    const rawBlocks = Array.isArray(acf["template_part"]) ? (acf["template_part"] as unknown[]) : [];
    const blocks = rawBlocks
      .map((b) => shapeBlock(b))
      .filter((b): b is FlexBlock => b !== null);

    const post: DetailPost = {
      slug: w.slug,
      title: w.title,
      featuredImage: w.featured_image?.url ?? null,
      termNames,
      tagNames: [], // `tag` taxonomy is private; not exposed by the SDK.
      subtitle,
      intro,
      blocks,
    };

    // Related: query the listing ability, filter to works sharing any term, exclude current, pick 4.
    const listing = await getOurWork(client);
    const currentTermSlugs = new Set(w.work.map((t) => t.slug));
    const candidates = listing.our_work.filter(
      (o) => o.slug !== w.slug && o.work.some((t) => currentTermSlugs.has(t.slug)),
    );
    const picked = candidates.slice(0, 4);
    const related: RelatedItem[] = picked.map((o) => ({
      slug: o.slug,
      title: o.title,
      thumbnail: o.featured_image?.url ?? null,
    }));

    res.json({ post, related });
  } catch (err) {
    next(err);
  }
});

export default router;
