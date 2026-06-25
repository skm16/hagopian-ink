/**
 * Shared types for the WP-fed work detail page.
 *
 * The shape mirrors `GET /api/works/:slug` response. Server-side filtering
 * narrows the SDK's full flex-block union down to the 9 layouts the React
 * side actually renders; this file's `FlexBlock` union must stay in sync
 * with the server's allowlist in `artifacts/api-server/src/routes/works.ts`.
 */

export interface DetailPost {
  slug: string;
  title: string;
  featuredImage: string | null;
  termNames: string[];
  tagNames: string[];     // Always [] today (WP `tag` taxonomy is private). Reserved.
  subtitle: string;       // "" when ACF journal_post_subtitle is unset.
  intro: string;          // "" when ACF journal_short_desc AND wp excerpt both empty.
  blocks: FlexBlock[];
}

export interface RelatedItem {
  slug: string;
  title: string;
  thumbnail: string | null;
}

export interface WorkDetailResponse {
  post: DetailPost;
  related: RelatedItem[];
}

/* -------------------------------------------------------------------------
   FlexBlock — narrowed discriminated union over the 9 supported layouts.
   ------------------------------------------------------------------------- */

export interface TwoColumnsBlock {
  acf_fc_layout: 'two-columns-single-work';
  title: string;
  description: string;
}

export interface ColumnsBlock {
  acf_fc_layout: 'columns-single-work';
  columns: Array<{ name: string; title: string; description: string }>;
}

export interface FullImageBlock {
  acf_fc_layout: 'full-image-single-work';
  image: string;
}

export interface TextBlockBlock {
  acf_fc_layout: 'text-bock-single-work';
  name: string;
  title: string;
  description: string;
  width: number | null;             // Percentage, e.g. 80. null when unset.
  background: 'gradient' | 'plain'; // Normalized: linear-gradient-dribbble → 'gradient'; everything else → 'plain'.
}

export interface MobilePagesBlock {
  acf_fc_layout: 'mobile-pages-single-work';
  images: string[];                 // Array of URLs (server already resolves the ACF image object → .url).
}

export interface DesktopPagesBlock {
  acf_fc_layout: 'desktop-pages';
  navBar: 'black' | 'silver';
  fullWidth: string | null;
  firstPage: string | null;
  secondPage: string | null;
  automaticAlignment: boolean;
}

export interface SliderBlock {
  acf_fc_layout: 'slider';
  images: string[];                 // Each layout 'image' is a string URL after server flattening.
}

export interface SliderTwoSlidesBlock {
  acf_fc_layout: 'slider_two_slides';
  images: string[];                 // Each layout 'url' is a string URL after server flattening.
}

export interface GalleryBlock {
  acf_fc_layout: 'gallery';
  images: string[];
}

export interface OurWorkBlock {
  acf_fc_layout: 'our-work';
  name: string;                      // Small uppercase label, e.g. "BRAND IDENTITY & STRATEGY"
  nameColor: string;                 // Hex/CSS color for the label, e.g. "#a57b83"
  title: string;
  description: string;
  link: { url: string; title: string; target: string } | null;
  image: string | null;              // Resolved URL
  columnReverse: boolean;            // false = text left + image right (default); true = swap
  background: 'gradient' | 'white' | 'plain';
}

export interface FullWidthVideoBlock {
  acf_fc_layout: 'full-width-video';
  videoMp4: string;                  // Resolved URL of the mp4 (ACF sub-field `video_mp4`). '' when unset.
  posterImage: string | null;        // Resolved URL of the poster (ACF sub-field `poster_image`).
}

export interface TwoImagesSideBySideBlock {
  acf_fc_layout: 'two-images-side-by-side';
  imageLeft: string | null;          // Resolved URL (ACF sub-field `image_left`).
  imageRight: string | null;         // Resolved URL (ACF sub-field `image_right`).
}

export type FlexBlock =
  | TwoColumnsBlock
  | ColumnsBlock
  | FullImageBlock
  | TextBlockBlock
  | MobilePagesBlock
  | DesktopPagesBlock
  | SliderBlock
  | SliderTwoSlidesBlock
  | GalleryBlock
  | OurWorkBlock
  | FullWidthVideoBlock
  | TwoImagesSideBySideBlock;

export type FlexLayout = FlexBlock['acf_fc_layout'];

export const KNOWN_LAYOUTS: ReadonlyArray<FlexLayout> = [
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
  'full-width-video',
  'two-images-side-by-side',
];
