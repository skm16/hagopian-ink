import type { Metadata } from 'next';
import { Nav } from '@/components/shared/Nav';

// ISR — webhook revalidates the 'posts' tag on every WP save; the 1-hour TTL
// is a safety net in case the webhook ever fails to deliver.
export const revalidate = 3600;

import { Footer } from '@/components/shared/Footer';
import { fetchPosts } from '@/lib/wp/fetch-posts';
import type { ShapedPost } from '@/lib/wp/shape-post';
import { BlogListClient } from '@/components/blog/BlogListClient';
import { buildMetadata } from '@/lib/seo/resolve-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: 'Insights, work, and design thinking from the Hagopian Ink team.',
  canonicalPath: '/blog',
});

export default async function BlogPage() {
  // Soft-fail on WP outage — render hero + empty list rather than 500.
  let posts: ShapedPost[] = [];
  try {
    posts = await fetchPosts();
  } catch (err) {
    console.error('[/blog] WP fetch failed, rendering empty state:', err);
  }
  return (
    <>
      <Nav />
      <BlogListClient posts={posts} />
      <Footer />
    </>
  );
}
