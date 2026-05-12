import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { EmailMarketingContent } from '@/components/expertise/EmailMarketingContent';

export const metadata: Metadata = buildMetadata({
  title: 'Email Marketing',
  description: 'Email design and marketing that drives revenue — strategy, templates, automation, and analytics.',
  canonicalPath: '/expertise/email-marketing',
});

export default function EmailMarketingPage() {
  return <EmailMarketingContent />;
}
