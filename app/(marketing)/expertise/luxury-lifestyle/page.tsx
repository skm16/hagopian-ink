import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { LuxuryLifestyleContent } from '@/components/expertise/LuxuryLifestyleContent';

export const metadata: Metadata = buildMetadata({
  title: 'Luxury & Lifestyle',
  description: 'Premium branding and email design for luxury and lifestyle brands — Burberry, Frette, La Perla, and more.',
  canonicalPath: '/expertise/luxury-lifestyle',
});

export default function LuxuryLifestylePage() {
  return <LuxuryLifestyleContent />;
}
