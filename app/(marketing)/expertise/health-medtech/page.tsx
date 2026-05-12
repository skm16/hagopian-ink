import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { HealthMedTechContent } from '@/components/expertise/HealthMedTechContent';
import { fetchWorksByExpertiseTag } from '@/lib/wp/fetch-works-by-expertise';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Health & MedTech',
  description: 'Design for health and MedTech brands — clear communication of complex science, patient-first UX.',
  canonicalPath: '/expertise/health-medtech',
});

export default async function HealthMedTechPage() {
  const featuredWorks = await fetchWorksByExpertiseTag('health-medtech');
  return <HealthMedTechContent featuredWorks={featuredWorks} />;
}
