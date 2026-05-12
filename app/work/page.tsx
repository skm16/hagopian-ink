import type { Metadata } from 'next';
import { jabClient, withTags } from '@/lib/jab/client';
import { getOurWork, getWorkType } from '@/lib/sdk';
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
  // Sequential — MCP init handshake is not concurrency-safe.
  const workData = await withTags(['works'], () => getOurWork(jabClient));
  const termData = await withTags(['works', 'work-types'], () =>
    getWorkType(jabClient, { hide_empty: true }),
  );

  const works: WpWork[] = workData.our_work.map((w) => ({
    slug: w.slug,
    title: w.title,
    thumbnail: w.featured_image?.url ?? null,
    termSlugs: w.work.map((t) => t.slug),
    primaryTermName: w.work[0]?.name ?? '',
  }));

  const terms: WpTerm[] = termData.work_type.map((t) => ({
    slug: t.slug,
    name: t.name,
    count: t.count,
  }));

  return (
    <>
      <Nav />
      <WorkListClient works={works} terms={terms} />
      <Footer />
    </>
  );
}
