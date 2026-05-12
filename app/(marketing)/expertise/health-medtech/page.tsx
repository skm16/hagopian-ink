import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { HealthMedTechContent } from '@/components/expertise/HealthMedTechContent';

export const metadata: Metadata = buildMetadata({
  title: 'Health & MedTech',
  description: 'Design for health and MedTech brands — clear communication of complex science, patient-first UX.',
  canonicalPath: '/expertise/health-medtech',
});

export default function HealthMedTechPage() {
  return <HealthMedTechContent />;
}
