import 'server-only';
import { jabClient, withTags } from '@/lib/jab/client';
import { getOurWork } from '@/lib/sdk';

export interface ExpertiseWork {
  slug: string;
  title: string;
  thumbnail: string | null;
  primaryTermName: string;
}

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

  const matched: ExpertiseWork[] = [];

  for (const w of workData.our_work) {
    const tags = w['expertise-tag'] ?? [];
    if (!tags.some((t) => t.slug === expertiseSlug)) continue;

    matched.push({
      slug: w.slug,
      title: w.title,
      thumbnail: w.featured_image?.url ?? null,
      primaryTermName: w.work[0]?.name ?? '',
    });

    if (matched.length >= limit) break;
  }

  return matched;
}
