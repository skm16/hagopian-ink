import type { NextConfig } from 'next';
import { buildRedirects, buildRewrites } from './lib/seo/redirects';

const config: NextConfig = {
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
