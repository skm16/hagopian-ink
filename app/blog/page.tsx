import type { Metadata } from 'next';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { fetchPosts } from '@/lib/wp/fetch-posts';
import { BlogListClient } from '@/components/blog/BlogListClient';
import { buildMetadata } from '@/lib/seo/resolve-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: 'Insights, work, and design thinking from the Hagopian Ink team.',
  canonicalPath: '/blog',
});

export default async function BlogPage() {
  const posts = await fetchPosts();
  return (
    <>
      <Nav />
      <BlogListClient posts={posts} />
      <Footer />
    </>
  );
}
