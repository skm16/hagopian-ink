import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchPostBySlug } from '@/lib/wp/fetch-posts';
import { resolvePostBuilderMedia } from '@/lib/wp/resolve-media';
import { rewriteWpMediaUrl, rewriteWpMediaUrlsInHtml } from '@/lib/wp/media-url';

export const dynamic = 'force-dynamic';

import { shapePost } from '@/lib/wp/shape-post';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { BlogPostView, type PostFlexBlock } from '@/components/blog/BlogPostView';
import { buildMetadata, pickDescription } from '@/lib/seo/resolve-metadata';

type Params = Promise<{ slug: string }>;

// Wrap fetch so WP outages produce a 404 (via null return) instead of 500.
async function safeFetchPost(slug: string) {
  try {
    return await fetchPostBySlug(slug);
  } catch (err) {
    console.error(`[/blog/${slug}] WP fetch failed:`, err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = await safeFetchPost(slug);
  if (!data) return buildMetadata({ title: 'Blog' });
  const shaped = shapePost(data.post);
  const description = pickDescription(
    shaped.acf.journal_short_desc,
    shaped.excerpt,
    shaped.acf.flex_excerpt,
  );
  return buildMetadata({
    title: shaped.title,
    description,
    ogType: 'article',
    ogImage: shaped.thumbnail ?? undefined,
    canonicalPath: `/blog/${shaped.slug}`,
    publishedTime: shaped.date,
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = await safeFetchPost(slug);
  if (!data) notFound();
  const shaped = shapePost(data.post);
  const acfRaw = (data.post.acf ?? {}) as Record<string, unknown>;
  const rawBuilder = acfRaw['post_builder'];
  // Resolve any image fields that came back as integer attachment IDs into
  // { url, alt } objects so the renderer sees a uniform shape regardless of
  // how each ACF field group is configured.
  const resolvedBuilder = Array.isArray(rawBuilder)
    ? ((await resolvePostBuilderMedia(rawBuilder)) as PostFlexBlock[])
    : null;
  const rawBanner = acfRaw['journal_post_banner'] as { url?: string; alt?: string } | null;
  const rawBannerTwo = acfRaw['featured_image_two'] as { url?: string; alt?: string } | null;
  const acfExtra = {
    journal_post_subtitle: (acfRaw['journal_post_subtitle'] as string | null) ?? null,
    journal_post_banner: rawBanner
      ? { ...rawBanner, url: rewriteWpMediaUrl(rawBanner.url) }
      : null,
    featured_image_two: rawBannerTwo
      ? { ...rawBannerTwo, url: rewriteWpMediaUrl(rawBannerTwo.url) }
      : null,
    post_builder: resolvedBuilder,
  };
  return (
    <>
      <Nav alwaysVisible />
      <BlogPostView
        post={shaped}
        content={rewriteWpMediaUrlsInHtml(data.post.content.rendered)}
        related={data.related}
        acfExtra={acfExtra}
      />
      <Footer />
    </>
  );
}
