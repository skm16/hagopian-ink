import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { UxUiDesignContent } from '@/components/expertise/UxUiDesignContent';
import type { FeaturedWork } from '@/components/expertise/FeaturedWorkGrid';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'UX & UI Design',
  description: 'Website and product design that converts — UX strategy, UI design, and responsive implementation.',
  canonicalPath: '/expertise/ux-ui-design',
});

const CDN = 'https://hagopianink.wpenginepowered.com/wp-content/uploads';

const FEATURED: FeaturedWork[] = [
  { slug: 'diamonds-in-glass-luxury-jewelry-website', title: 'Diamonds In Glass',  thumbnail: `${CDN}/2018/08/Work-Thumb_DIG-293x414.jpg`,          primaryTermName: 'Website Design' },
  { slug: 'todd-duncan-cashmere-branding-design',     title: 'Todd & Duncan',       thumbnail: `${CDN}/2018/08/Work-Thumb_TD-293x414.jpg`,            primaryTermName: 'Website Design' },
  { slug: 'loumbeauty',                               title: 'Loum Beauty',          thumbnail: `${CDN}/2022/08/Work-Thumb_loum2-724x1024-1-293x414.jpg`, primaryTermName: 'Website Design' },
  { slug: 'lalalife-subscription-box-branding-and-website-design', title: 'La La Life Box', thumbnail: `${CDN}/2018/08/Work-Thumb_lala-293x414.jpg`, primaryTermName: 'Website Design' },
];

export default async function UxUiDesignPage() {
  return <UxUiDesignContent featuredWorks={FEATURED} />;
}
