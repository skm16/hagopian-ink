import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { UxUiDesignContent } from '@/components/expertise/UxUiDesignContent';
import { fetchWorksByExpertiseTag } from '@/lib/wp/fetch-works-by-expertise';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'UX & UI Design',
  description: 'Website and product design that converts — UX strategy, UI design, and responsive implementation.',
  canonicalPath: '/expertise/ux-ui-design',
});

export default async function UxUiDesignPage() {
  const featuredWorks = await fetchWorksByExpertiseTag('website-design');
  return <UxUiDesignContent featuredWorks={featuredWorks} />;
}
