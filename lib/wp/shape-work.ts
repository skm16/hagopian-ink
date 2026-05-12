import type { FlexBlock } from '@/lib/work-detail-types';

const KNOWN_LAYOUTS = new Set<string>([
  'two-columns-single-work',
  'columns-single-work',
  'full-image-single-work',
  'text-bock-single-work',
  'mobile-pages-single-work',
  'desktop-pages',
  'slider',
  'slider_two_slides',
  'gallery',
  'our-work',
]);

function asString(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

function asImageUrl(v: unknown): string {
  if (typeof v === 'string') return v;
  if (v && typeof v === 'object' && 'url' in v && typeof (v as { url: unknown }).url === 'string') {
    return (v as { url: string }).url;
  }
  return '';
}

export function shapeBlock(raw: unknown): FlexBlock | null {
  if (!raw || typeof raw !== 'object') return null;
  const layout = (raw as { acf_fc_layout?: unknown }).acf_fc_layout;
  if (typeof layout !== 'string' || !KNOWN_LAYOUTS.has(layout)) return null;
  const r = raw as Record<string, unknown>;

  switch (layout) {
    case 'two-columns-single-work':
      return {
        acf_fc_layout: 'two-columns-single-work',
        title: asString(r.title),
        description: asString(r.description),
      };
    case 'columns-single-work': {
      const cols = Array.isArray(r.column) ? r.column : [];
      return {
        acf_fc_layout: 'columns-single-work',
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
    case 'full-image-single-work':
      return { acf_fc_layout: 'full-image-single-work', image: asImageUrl(r.image) };
    case 'text-bock-single-work': {
      const rawBg = asString(r.background_color);
      return {
        acf_fc_layout: 'text-bock-single-work',
        name: asString(r.name),
        title: asString(r.title),
        description: asString(r.description),
        width: typeof r.width === 'number' ? r.width : null,
        background: rawBg === 'linear-gradient-dribbble' ? 'gradient' : 'plain',
      };
    }
    case 'mobile-pages-single-work': {
      const images = Array.isArray(r.images) ? r.images : [];
      return {
        acf_fc_layout: 'mobile-pages-single-work',
        images: images
          .map((it) => asImageUrl((it as Record<string, unknown> | null)?.image))
          .filter((url) => url.length > 0),
      };
    }
    case 'desktop-pages': {
      const rawNav = asString(r.nav_bar);
      return {
        acf_fc_layout: 'desktop-pages',
        navBar: rawNav === 'black-nav-bar' ? 'black' : 'silver',
        fullWidth: asImageUrl(r.full_width) || null,
        firstPage: asImageUrl(r.first_page) || null,
        secondPage: asImageUrl(r.second_page) || null,
        automaticAlignment: asString(r.automatic_alignment) !== 'no',
      };
    }
    case 'slider': {
      const images = Array.isArray(r.images) ? r.images : [];
      return {
        acf_fc_layout: 'slider',
        images: images
          .map((it) => asImageUrl((it as Record<string, unknown> | null)?.image))
          .filter((url) => url.length > 0),
      };
    }
    case 'slider_two_slides': {
      const images = Array.isArray(r.images) ? r.images : [];
      return {
        acf_fc_layout: 'slider_two_slides',
        images: images
          .map((it) => {
            const ii = (it ?? {}) as Record<string, unknown>;
            return asImageUrl(ii.url ?? ii.image);
          })
          .filter((url) => url.length > 0),
      };
    }
    case 'gallery': {
      const images = Array.isArray(r.images) ? r.images : [];
      return {
        acf_fc_layout: 'gallery',
        images: images
          .map((it) => {
            const ii = (it ?? {}) as Record<string, unknown>;
            return asImageUrl(ii.url ?? ii.image);
          })
          .filter((url) => url.length > 0),
      };
    }
    case 'our-work': {
      const nameGroup = (r.name_group ?? {}) as Record<string, unknown>;
      const linkRaw = r.link;
      let link: { url: string; title: string; target: string } | null = null;
      if (linkRaw && typeof linkRaw === 'object') {
        const l = linkRaw as { url?: unknown; title?: unknown; target?: unknown };
        if (typeof l.url === 'string' && l.url) {
          link = {
            url: l.url,
            title: typeof l.title === 'string' ? l.title : '',
            target: typeof l.target === 'string' ? l.target : '',
          };
        }
      }
      const bgRaw = asString(r.background_color);
      const background: 'gradient' | 'white' | 'plain' =
        bgRaw === 'linear-gradient-dribbble' ? 'gradient' : bgRaw === 'white' ? 'white' : 'plain';
      return {
        acf_fc_layout: 'our-work',
        name: asString(nameGroup.name),
        nameColor: asString(nameGroup.color),
        title: asString(r.title),
        description: asString(r.description),
        link,
        image: asImageUrl(r.image) || null,
        columnReverse: asString(r.column_reverse) === 'yes',
        background,
      };
    }
    default:
      return null;
  }
}
