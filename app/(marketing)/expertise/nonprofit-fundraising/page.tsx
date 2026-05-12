import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { NonprofitContent } from '@/components/expertise/NonprofitContent';

export const metadata: Metadata = buildMetadata({
  title: 'Nonprofit Fundraising',
  description: 'Branding and email campaigns for nonprofit fundraising — galas, year-end campaigns, donor cultivation.',
  canonicalPath: '/expertise/nonprofit-fundraising',
});

export default function NonprofitFundraisingPage() {
  return <NonprofitContent />;
}
