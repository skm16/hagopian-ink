function decodeHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

type FlexBlock = { acf_fc_layout: string; wysiwyg?: string; [key: string]: unknown };
const WYSIWYG_LAYOUTS = ['full_width_column_wysiwyg', '2_column_wysiwyg', '3_column_wysiwyg'];

function flexContentExcerpt(blocks: unknown): string {
  if (!Array.isArray(blocks)) return '';
  for (const block of blocks as FlexBlock[]) {
    if (WYSIWYG_LAYOUTS.includes(block.acf_fc_layout) && block.wysiwyg) {
      const text = decodeHtml(block.wysiwyg).replace(/\s+/g, ' ').trim();
      if (!text) continue;
      return text.length > 160 ? text.slice(0, 157) + '…' : text;
    }
  }
  return '';
}

export interface ShapedPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  link: string;
  categories: string[];
  tags: string[];
  thumbnail: string | null;
  acf: {
    journal_short_title: string | null;
    journal_short_desc: string | null;
    flex_excerpt: string;
  };
}

export interface WpApiPostFull {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  acf?: Record<string, unknown>;
  _embedded?: {
    author?: Array<{ name: string }>;
    'wp:term'?: Array<Array<{ name: string; slug: string }>>;
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text?: string }>;
  };
}

export function shapePost(p: WpApiPostFull): ShapedPost {
  const categories = ((p._embedded?.['wp:term'] ?? [])[0] ?? []).map((t) => t.name);
  const tags = ((p._embedded?.['wp:term'] ?? [])[1] ?? []).map((t) => t.name);
  const featuredMedia = (p._embedded?.['wp:featuredmedia'] ?? [])[0];
  const thumbnail = featuredMedia?.source_url ?? null;
  const acfRaw = (p.acf ?? {}) as Record<string, unknown>;
  const bannerField = acfRaw['journal_post_banner'] as { url?: string } | null | undefined;
  return {
    id: p.id,
    title: decodeHtml(p.title.rendered),
    excerpt: decodeHtml(p.excerpt.rendered),
    date: p.date,
    slug: p.slug,
    link: p.link,
    categories,
    tags,
    thumbnail: bannerField?.url ?? thumbnail,
    acf: {
      journal_short_title: (acfRaw['journal_short_title'] as string) ?? null,
      journal_short_desc: (acfRaw['journal_short_desc'] as string) ?? null,
      flex_excerpt: flexContentExcerpt(acfRaw['post_builder']),
    },
  };
}

export { decodeHtml };
