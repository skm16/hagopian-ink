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
    default: 'Branding Agency NYC | Branding, UX Design, Email Marketing',
    template: '%s | Hagopian Ink',
  },
  ...buildMetadata({
    title: 'Branding Agency NYC | Branding, UX Design, Email Marketing',
    description:
      'Hagopian Ink provides unparalleled branding, UX design & email marketing services for your brand. Contact us to discuss your branding today.',
    ogTitle: 'HagopianInk.com',
    ogDescription:
      'Creative campaigns that drive results. Increasing value through branding, UX design & email marketing.',
    canonicalPath: '/',
  }),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
