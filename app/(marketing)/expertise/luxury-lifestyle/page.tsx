import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { LuxuryLifestyleContent } from '@/components/expertise/LuxuryLifestyleContent';
import { fetchWorksByExpertiseTag } from '@/lib/wp/fetch-works-by-expertise';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Luxury & Lifestyle',
  description: 'Premium branding and email design for luxury and lifestyle brands — Burberry, Frette, La Perla, and more.',
  canonicalPath: '/expertise/luxury-lifestyle',
});

export default async function LuxuryLifestylePage() {
  const featuredWorks = await fetchWorksByExpertiseTag('lifestyle-luxury');
  return <LuxuryLifestyleContent featuredWorks={featuredWorks} />;
}
