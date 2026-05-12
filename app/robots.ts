import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hagopianink.com';

export default function robots(): MetadataRoute.Robots {
  // Index when this is a real production environment on any host:
  //   - Vercel sets NEXT_PUBLIC_VERCEL_ENV (production | preview | development)
  //   - Railway sets RAILWAY_ENVIRONMENT_NAME (production | <branch>)
  //   - Local dev sets neither; default to noindex unless explicitly opted in
  const vercel = process.env.NEXT_PUBLIC_VERCEL_ENV;
  const railway = process.env.RAILWAY_ENVIRONMENT_NAME;
  const isProduction =
    vercel === 'production' ||
    railway === 'production' ||
    process.env.SITE_INDEXABLE === 'true';
  return {
    rules: isProduction
      ? [{ userAgent: '*', allow: '/', disallow: '/api/' }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
