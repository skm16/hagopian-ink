import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { BrandIdentityContent } from '@/components/expertise/BrandIdentityContent';
import { fetchWorksByExpertiseTag } from '@/lib/wp/fetch-works-by-expertise';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Brand Identity',
  description: 'Brand identity design for ambitious brands — logos, visual systems, brand strategy.',
  canonicalPath: '/expertise/brand-identity',
});

export default async function BrandIdentityPage() {
  const featuredWorks = await fetchWorksByExpertiseTag('brand-identity');
  return <BrandIdentityContent featuredWorks={featuredWorks} />;
}
