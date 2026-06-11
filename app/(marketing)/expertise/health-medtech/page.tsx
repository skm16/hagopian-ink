import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { HealthMedTechContent } from '@/components/expertise/HealthMedTechContent';
import { fetchWorksByExpertiseTag } from '@/lib/wp/fetch-works-by-expertise';

// ISR — webhook flushes the works tag on save; fetchWorksByExpertiseTag
// soft-fails to [] on WP outage.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Health & MedTech',
  description: 'Brand identity design and UX for health and MedTech companies — medical device manufacturers, digital health platforms, and life science innovators. Women-owned boutique branding agency.',
  canonicalPath: '/expertise/health-medtech',
});

export default async function HealthMedTechPage() {
  const featuredWorks = await fetchWorksByExpertiseTag('health-medtech');
  return <HealthMedTechContent featuredWorks={featuredWorks} />;
}
