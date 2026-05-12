import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cms.hagopianink.com' },
      { protocol: 'https', hostname: 'hagopianink.wpengine.com' },
      { protocol: 'https', hostname: 'hagopianink.wpenginepowered.com' },
      { protocol: 'https', hostname: 'hagopianink.com' },
    ],
  },
};

export default config;
