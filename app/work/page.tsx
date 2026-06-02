import type { Metadata } from 'next';
import { jabClient, withTags } from '@/lib/jab/client';

// ISR — webhook revalidates 'works' tag on every WP save; 1-hour TTL is a
// safety net. The try/catch below means a build-time WP outage produces an
// empty list page rather than failing the deploy.
export const revalidate = 3600;

import { getOurWork } from '@/lib/sdk';
import { rewriteWpMediaUrl } from '@/lib/wp/media-url';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { WorkListClient } from '@/components/work/WorkListClient';
import { buildMetadata } from '@/lib/seo/resolve-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Work',
  description: 'Selected case studies and creative work from Hagopian Ink.',
  canonicalPath: '/work',
});

export interface WpWork {
  slug: string;
  title: string;
  thumbnail: string | null;
  termSlugs: string[];
  primaryTermName: string;
}

export default async function WorkPage() {
  // Soft-fail on WP outage — render hero + empty list rather than 500.
  // ISR will reload real data on the next successful request.
  let works: WpWork[] = [];

  try {
    const workData = await withTags(['works'], () => getOurWork(jabClient));
    works = workData.our_work.map((w) => ({
      slug: w.slug,
      title: w.title,
      thumbnail: rewriteWpMediaUrl(w.featured_image?.url ?? null),
      termSlugs: w.work.map((t) => t.slug),
      primaryTermName: w.work[0]?.name ?? '',
    }));
  } catch (err) {
    console.error('[/work] WP fetch failed, rendering empty state:', err);
  }

  return (
    <>
      <Nav />
      <WorkListClient works={works} />
      <Footer />
    </>
  );
}
