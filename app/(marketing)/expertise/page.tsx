import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { ExpertiseContent } from '@/components/expertise/ExpertiseContent';

export const metadata: Metadata = buildMetadata({
  title: 'Expertise',
  description: 'Hagopian Ink expertise: brand identity, UX/UI design, email marketing, and industry focus areas.',
  canonicalPath: '/expertise',
});

export default function ExpertisePage() {
  return <ExpertiseContent />;
}
