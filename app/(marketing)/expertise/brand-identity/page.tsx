import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { BrandIdentityContent } from '@/components/expertise/BrandIdentityContent';
import { fetchWorksByExpertiseTag } from '@/lib/wp/fetch-works-by-expertise';
import type { FeaturedWork } from '@/components/expertise/FeaturedWorkGrid';

// ISR — webhook flushes the works tag on save; fetchWorksByExpertiseTag
// soft-fails to [] on WP outage, so build-time outages produce a hardcoded-
// pinned-only grid rather than failing the deploy.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Brand Identity',
  description: 'Brand identity design for ambitious brands — logos, visual systems, brand strategy.',
  canonicalPath: '/expertise/brand-identity',
});

const CDN = 'https://hagopianink.wpenginepowered.com/wp-content/uploads';

const PINNED: FeaturedWork[] = [
  {
    slug: 'custom-logo-design-brand-identity',
    title: 'Custom Logo Design & Brand Identity',
    thumbnail: `${CDN}/2018/08/Work-Thumb_logos-293x414.jpg`,
    primaryTermName: 'Brand Identity',
  },
];

export default async function BrandIdentityPage() {
  const works = await fetchWorksByExpertiseTag('brand-identity');
  const rest = works
    .filter(w => w.slug !== 'custom-logo-design-brand-identity')
    .filter(w => w.slug !== 'lalalife-subscription-box-branding-and-website-design')
    .slice(0, 3);
  const featuredWorks = [...PINNED, ...rest];
  return <BrandIdentityContent featuredWorks={featuredWorks} />;
}
