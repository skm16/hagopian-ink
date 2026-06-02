import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { NonprofitContent } from '@/components/expertise/NonprofitContent';
import { fetchWorksByExpertiseTag } from '@/lib/wp/fetch-works-by-expertise';

// ISR — webhook flushes the works tag on save; fetchWorksByExpertiseTag
// soft-fails to [] on WP outage.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Nonprofit Fundraising',
  description: 'Branding and email campaigns for nonprofit fundraising — galas, year-end campaigns, donor cultivation.',
  canonicalPath: '/expertise/nonprofit-fundraising',
});

export default async function NonprofitFundraisingPage() {
  const featuredWorks = await fetchWorksByExpertiseTag('nonprofit-fundraising');
  return <NonprofitContent featuredWorks={featuredWorks} />;
}
