import type { Metadata } from 'next';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { WebSiteSchema } from '@/components/seo/WebSiteSchema';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hagopianink.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Women-Owned Boutique Branding Agency | Brand Identity, UX Design, Email Marketing',
    template: '%s | Hagopian Ink',
  },
  ...buildMetadata({
    title: 'Women-Owned Boutique Branding Agency | Brand Identity, UX Design, Email Marketing',
    description:
      'Hagopian Ink is a women-owned boutique branding agency with 20+ years designing and building brand identity, UX, and email marketing for nonprofits, luxury brands, and health innovators.',
    ogTitle: 'HagopianInk.com',
    ogDescription:
      'Hagopian Ink is a women-owned boutique branding agency with 20+ years designing and building brand identity, UX, and email marketing for nonprofits, luxury brands, and health innovators.',
    canonicalPath: '/',
  }),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Overlap DNS/TLS handshake to the WP origin with HTML parsing. */}
        <link rel="preconnect" href="https://hagopianink.wpenginepowered.com" />
        <link rel="dns-prefetch" href="https://hagopianink.wpenginepowered.com" />
        {/*
          Preload the two Didonesque weights that drive every page's H1/H2.
          Without preload, the browser only discovers these after parsing the
          CSS (which is after parsing the HTML), causing a flash of system
          serif. crossOrigin="anonymous" is required for font preloads even
          when same-origin — without it the browser fetches twice.
        */}
        <link
          rel="preload"
          href="/fonts/didonesque-roman.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/didonesque-bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <OrganizationSchema />
        <WebSiteSchema />
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
