import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { jabClient, withTags } from '@/lib/jab/client';

export const dynamic = 'force-dynamic';

import { getWorksBySlug, getOurWork } from '@/lib/sdk';
import { shapeBlock } from '@/lib/wp/shape-work';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { CaseStudyView } from '@/components/work/CaseStudyView';
import { buildMetadata, pickDescription } from '@/lib/seo/resolve-metadata';
import type { DetailPost, RelatedItem, FlexBlock } from '@/lib/work-detail-types';

type Params = Promise<{ slug: string }>;

async function loadCaseStudy(slug: string): Promise<{ post: DetailPost; related: RelatedItem[] } | null> {
  // Wrap in try/catch so WP outages produce 404 instead of 500.
  let detail: Awaited<ReturnType<typeof getWorksBySlug>>;
  try {
    detail = await withTags([`work-${slug}`, 'works'], () =>
      getWorksBySlug(jabClient, { slug }),
    );
  } catch (err) {
    console.error(`[/work/${slug}] WP fetch failed:`, err);
    return null;
  }
  if (!detail.our_work) return null;

  const w = detail.our_work;
  const acf = (w.acf ?? {}) as Record<string, unknown>;
  const subtitle = typeof acf['journal_post_subtitle'] === 'string' ? acf['journal_post_subtitle'] : '';
  const shortDesc = typeof acf['journal_short_desc'] === 'string' ? acf['journal_short_desc'] : '';
  const intro = shortDesc || w.excerpt || '';

  const rawBlocks = Array.isArray(acf['template_part']) ? (acf['template_part'] as unknown[]) : [];
  const blocks = rawBlocks.map((b) => shapeBlock(b)).filter((b): b is FlexBlock => b !== null);

  const post: DetailPost = {
    slug: w.slug,
    title: w.title,
    featuredImage: w.featured_image?.url ?? null,
    termNames: w.work.map((t) => t.name),
    tagNames: [],
    subtitle,
    intro,
    blocks,
  };

  // Sequential — second SDK call (MCP concurrency constraint).
  // Related-items is non-critical: if it fails we still render the main post.
  let related: RelatedItem[] = [];
  try {
    const listing = await withTags(['works'], () => getOurWork(jabClient));
    const currentTermSlugs = new Set(w.work.map((t) => t.slug));
    related = listing.our_work
      .filter((o) => o.slug !== w.slug && o.work.some((t) => currentTermSlugs.has(t.slug)))
      .slice(0, 4)
      .map((o) => ({
        slug: o.slug,
        title: o.title,
        thumbnail: o.featured_image?.url ?? null,
      }));
  } catch (err) {
    console.error(`[/work/${slug}] related fetch failed:`, err);
  }

  return { post, related };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadCaseStudy(slug);
  if (!data) return buildMetadata({ title: 'Work', description: 'Case study not found.' });
  const { post } = data;
  const description = pickDescription(post.subtitle, post.intro);
  return buildMetadata({
    title: post.title,
    description: description || `${post.title} — Hagopian Ink case study.`,
    ogTitle: `${post.title} | Hagopian Ink`,
    ogDescription: description,
    ogImage: post.featuredImage ?? undefined,
    ogType: 'article',
    canonicalPath: `/work/${post.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = await loadCaseStudy(slug);
  if (!data) notFound();
  return (
    <>
      <Nav alwaysVisible />
      <CaseStudyView post={data.post} related={data.related} />
      <Footer />
    </>
  );
}
