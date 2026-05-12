import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { BrandIdentityContent } from '@/components/expertise/BrandIdentityContent';

export const metadata: Metadata = buildMetadata({
  title: 'Brand Identity',
  description: 'Brand identity design for ambitious brands — logos, visual systems, brand strategy.',
  canonicalPath: '/expertise/brand-identity',
});

export default function BrandIdentityPage() {
  return <BrandIdentityContent />;
}
