import type { NextConfig } from 'next';
import { buildRedirects, buildRewrites } from './lib/seo/redirects';

// Standalone output is required for Railway and other Node-container hosts.
// We gate it on an env var so local Windows dev builds don't trip the Next.js
// jest-worker bug that surfaces with `output: 'standalone'` on Win32 paths.
// Railway sets RAILWAY_ENVIRONMENT_NAME automatically; explicit opt-in via
// NEXT_BUILD_STANDALONE=1 works for any other host.
const wantStandalone =
  process.env.NEXT_BUILD_STANDALONE === '1' ||
  Boolean(process.env.RAILWAY_ENVIRONMENT_NAME);

const config: NextConfig = {
  ...(wantStandalone ? ({ output: 'standalone' as const }) : {}),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cms.hagopianink.com' },
      { protocol: 'https', hostname: 'hagopianink.wpengine.com' },
      { protocol: 'https', hostname: 'hagopianink.wpenginepowered.com' },
      { protocol: 'https', hostname: 'hagopianink.com' },
    ],
  },
  async redirects() {
    return buildRedirects();
  },
  async rewrites() {
    return buildRewrites();
  },
};

export default config;
