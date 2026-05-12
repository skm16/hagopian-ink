import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hagopianink.com';

export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || !process.env.NEXT_PUBLIC_VERCEL_ENV;
  return {
    rules: isProduction
      ? [{ userAgent: '*', allow: '/', disallow: '/api/' }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
