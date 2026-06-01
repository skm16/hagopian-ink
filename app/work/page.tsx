import type { Metadata } from 'next';
import { jabClient, withTags } from '@/lib/jab/client';

// Defer WP fetch until request time so build doesn't depend on CMS being up.
// ISR still works via withTags() — webhook can invalidate.
export const dynamic = 'force-dynamic';

import { getOurWork, getWorkType } from '@/lib/sdk';
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

export interface WpTerm {
  slug: string;
  name: string;
  count: number;
}

export default async function WorkPage() {
  // Soft-fail on WP outage — render hero + empty list rather than 500.
  // ISR will reload real data on the next successful request.
  let works: WpWork[] = [];
  let terms: WpTerm[] = [];

  try {
    // Sequential — MCP init handshake is not concurrency-safe.
    const workData = await withTags(['works'], () => getOurWork(jabClient));
    const termData = await withTags(['works', 'work-types'], () =>
      getWorkType(jabClient, { hide_empty: true }),
    );

    works = workData.our_work.map((w) => ({
      slug: w.slug,
      title: w.title,
      thumbnail: rewriteWpMediaUrl(w.featured_image?.url ?? null),
      termSlugs: w.work.map((t) => t.slug),
      primaryTermName: w.work[0]?.name ?? '',
    }));

    terms = termData.work_type.map((t) => ({
      slug: t.slug,
      name: t.name,
      count: t.count,
    }));
  } catch (err) {
    console.error('[/work] WP fetch failed, rendering empty state:', err);
  }

  return (
    <>
      <Nav />
      <WorkListClient works={works} terms={terms} />
      <Footer />
    </>
  );
}
