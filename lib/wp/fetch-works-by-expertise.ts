import 'server-only';
import { jabClient, withTags } from '@/lib/jab/client';
import { getOurWork } from '@/lib/sdk';

export interface ExpertiseWork {
  slug: string;
  title: string;
  thumbnail: string | null;
  primaryTermName: string;
}

/**
 * Fetch all works and filter to those tagged with the given expertise-tag slug.
 *
 * The expertise-tag taxonomy was added to WP after the SDK was generated, so
 * the typed `GetOurWorkOutput` doesn't declare those terms — but the MCP
 * response *does* still carry them, just untyped. We read the raw shape via
 * an `unknown` cast and look for the expected naming variants.
 *
 * Falls back to an empty array if the taxonomy data isn't present, so each
 * expertise subpage shows an empty Featured Work grid rather than crashing.
 */
export async function fetchWorksByExpertiseTag(
  expertiseSlug: string,
  limit = 4,
): Promise<ExpertiseWork[]> {
  let workData;
  try {
    workData = await withTags(['works', `expertise-${expertiseSlug}`], () =>
      getOurWork(jabClient),
    );
  } catch (err) {
    console.error(`[fetchWorksByExpertiseTag(${expertiseSlug})] WP fetch failed:`, err);
    return [];
  }

  const all = workData.our_work as unknown as Array<Record<string, unknown>>;
  const matched: ExpertiseWork[] = [];

  for (const w of all) {
    // Try the naming variants WordPress + MCP might use for the new taxonomy.
    // Likely real name on the wire: 'expertise-tag' (matches the WP taxonomy
    // slug) but JSON-friendly keys also worth checking.
    const candidates = [
      w['expertise-tag'],
      w['expertise_tag'],
      w['expertiseTag'],
    ];
    const terms = candidates.find((c) => Array.isArray(c)) as
      | Array<Record<string, unknown>>
      | undefined;
    if (!terms) continue;

    const hasMatch = terms.some((t) => t && typeof t === 'object' && t.slug === expertiseSlug);
    if (!hasMatch) continue;

    const featured = w.featured_image as { url?: unknown } | null | undefined;
    const workTerms = (w.work as Array<Record<string, unknown>> | undefined) ?? [];
    matched.push({
      slug: String(w.slug ?? ''),
      title: String(w.title ?? ''),
      thumbnail: typeof featured?.url === 'string' ? featured.url : null,
      primaryTermName: typeof workTerms[0]?.name === 'string' ? (workTerms[0].name as string) : '',
    });

    if (matched.length >= limit) break;
  }

  if (matched.length === 0) {
    // Log a sample of the first work's keys so we can spot the right field
    // name in production logs if the heuristic doesn't match.
    const sample = all[0];
    if (sample) {
      console.warn(
        `[fetchWorksByExpertiseTag(${expertiseSlug})] no matches; sample work keys:`,
        Object.keys(sample),
      );
    }
  }

  return matched;
}
