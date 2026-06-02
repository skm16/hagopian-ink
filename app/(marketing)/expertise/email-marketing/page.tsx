import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { EmailMarketingContent } from '@/components/expertise/EmailMarketingContent';
import { fetchWorksByExpertiseTag } from '@/lib/wp/fetch-works-by-expertise';

// ISR — webhook flushes the works tag on save; fetchWorksByExpertiseTag
// soft-fails to [] on WP outage.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Email Marketing',
  description: 'Email design and marketing that drives revenue — strategy, templates, automation, and analytics.',
  canonicalPath: '/expertise/email-marketing',
});

export default async function EmailMarketingPage() {
  const featuredWorks = await fetchWorksByExpertiseTag('email-marketing');
  return <EmailMarketingContent featuredWorks={featuredWorks} />;
}
