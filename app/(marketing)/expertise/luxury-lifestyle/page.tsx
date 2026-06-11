import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { LuxuryLifestyleContent } from '@/components/expertise/LuxuryLifestyleContent';
import { fetchWorksByExpertiseTag } from '@/lib/wp/fetch-works-by-expertise';

// ISR — webhook flushes the works tag on save; fetchWorksByExpertiseTag
// soft-fails to [] on WP outage.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Luxury Branding & Lifestyle Design',
  description: 'Luxury brand identity design, campaigns, and email marketing for fashion, beauty, and lifestyle brands — La Perla, Frette, Burberry, and more. Women-owned boutique branding agency.',
  canonicalPath: '/expertise/luxury-lifestyle',
});

export default async function LuxuryLifestylePage() {
  const featuredWorks = await fetchWorksByExpertiseTag('lifestyle-luxury');
  return <LuxuryLifestyleContent featuredWorks={featuredWorks} />;
}
