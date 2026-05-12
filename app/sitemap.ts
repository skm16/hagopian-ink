import type { MetadataRoute } from 'next';
import { jabClient, withTags } from '@/lib/jab/client';
import { getOurWork } from '@/lib/sdk';
import { fetchPosts } from '@/lib/wp/fetch-posts';

// Render at request time, not build time. The jab client validates
// WP_URL/WP_USER/WP_APP_PASSWORD at module init, and we don't want a
// missing/unreachable WordPress to fail the deploy build.
export const dynamic = 'force-dynamic';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hagopianink.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, priority: 1.0, changeFrequency: 'daily' },
    { url: `${SITE}/work`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${SITE}/blog`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${SITE}/about`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${SITE}/contact`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${SITE}/expertise`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${SITE}/expertise/brand-identity`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE}/expertise/ux-ui-design`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE}/expertise/email-marketing`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE}/expertise/nonprofit-fundraising`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE}/expertise/health-medtech`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE}/expertise/luxury-lifestyle`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE}/privacy-policy`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${SITE}/terms-of-use`, priority: 0.3, changeFrequency: 'yearly' },
  ];

  // Sequential — two different transports (MCP for works, REST for posts).
  // If WordPress is unreachable, return just the static routes rather than
  // 500 the sitemap. Search engines will keep the previously-cached version
  // intact and re-fetch when WP heals.
  let workRoutes: MetadataRoute.Sitemap = [];
  let postRoutes: MetadataRoute.Sitemap = [];

  try {
    const works = await withTags(['works', 'sitemap'], () => getOurWork(jabClient));
    workRoutes = works.our_work.map((w) => ({
      url: `${SITE}/work/${w.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly',
    }));
  } catch (err) {
    console.error('[sitemap] works fetch failed, returning empty:', err);
  }

  try {
    const posts = await fetchPosts(['posts', 'sitemap']);
    postRoutes = posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: new Date(p.date),
    }));
  } catch (err) {
    console.error('[sitemap] posts fetch failed, returning empty:', err);
  }

  return [...staticRoutes, ...workRoutes, ...postRoutes];
}
