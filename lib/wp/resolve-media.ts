import 'server-only';

interface ResolvedMedia { url: string; alt: string }

/**
 * Resolve a WP media attachment ID to a { url, alt } object.
 *
 * ACF image fields can be configured to return: Array (object with url+alt+sizes),
 * URL (just the string), or Image ID (integer). When the field group is set to
 * Image ID — as some blog flex-content fields on hagopianink.com are — REST
 * returns the bare integer and our renderer code can't display the image.
 *
 * This helper resolves IDs via /wp-json/wp/v2/media/{id}. Tagged so ISR can
 * invalidate when media changes, and falls back to null on any failure so
 * one broken image doesn't take out the whole post.
 */
async function fetchMediaById(id: number): Promise<ResolvedMedia | null> {
  const wpUrl = process.env.WP_URL;
  if (!wpUrl) return null;
  try {
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/media/${id}`, {
      next: { tags: ['media', `media-${id}`] },
    });
    if (!res.ok) return null;
    const m = (await res.json()) as {
      source_url?: string;
      alt_text?: string;
      title?: { rendered?: string };
    };
    if (!m.source_url) return null;
    return {
      url: m.source_url,
      alt: m.alt_text || m.title?.rendered || '',
    };
  } catch {
    return null;
  }
}

/**
 * Normalize an ACF image field value into { url, alt } or null.
 * Accepts: integer (attachment ID), string (URL), or object ({ url, alt }).
 */
async function normalizeAcfImage(value: unknown): Promise<ResolvedMedia | null> {
  if (typeof value === 'number') return fetchMediaById(value);
  if (typeof value === 'string') return value ? { url: value, alt: '' } : null;
  if (value && typeof value === 'object') {
    const v = value as { url?: unknown; alt?: unknown };
    if (typeof v.url === 'string' && v.url) {
      return { url: v.url, alt: typeof v.alt === 'string' ? v.alt : '' };
    }
  }
  return null;
}

/**
 * Walk a post_builder flex-content array and resolve any image fields that
 * came back as integer IDs into { url, alt } objects in-place. Returns a
 * new array; does not mutate input.
 *
 * Resolves in parallel for speed — most posts have ≤5 image blocks, so this
 * is at most a small handful of concurrent media lookups.
 */
export async function resolvePostBuilderMedia(blocks: unknown[]): Promise<unknown[]> {
  return Promise.all(
    blocks.map(async (raw) => {
      if (!raw || typeof raw !== 'object') return raw;
      const block = { ...(raw as Record<string, unknown>) };
      const layout = block.acf_fc_layout;

      if (layout === 'image_with_caption' && 'image' in block) {
        block.image = await normalizeAcfImage(block.image);
      } else if (layout === 'images_side_by_side') {
        if ('image_left' in block)  block.image_left  = await normalizeAcfImage(block.image_left);
        if ('image_right' in block) block.image_right = await normalizeAcfImage(block.image_right);
      }
      return block;
    }),
  );
}
