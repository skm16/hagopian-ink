import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { AboutContent } from '@/components/about/AboutContent';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'Hagopian Ink is a women-owned creative agency in NYC specializing in branding, UX design, and email marketing.',
  canonicalPath: '/about',
});

export default function AboutPage() {
  return <AboutContent />;
}
