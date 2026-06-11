import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { AboutContent } from '@/components/about/AboutContent';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'Women-owned since 2002. Hagopian Ink is a boutique branding agency specializing in brand identity design, web design, and email marketing for nonprofits, luxury brands, and health companies.',
  canonicalPath: '/about',
});

export default function AboutPage() {
  return <AboutContent />;
}
