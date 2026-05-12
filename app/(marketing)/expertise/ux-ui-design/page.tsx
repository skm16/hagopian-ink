import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { UxUiDesignContent } from '@/components/expertise/UxUiDesignContent';

export const metadata: Metadata = buildMetadata({
  title: 'UX & UI Design',
  description: 'Website and product design that converts — UX strategy, UI design, and responsive implementation.',
  canonicalPath: '/expertise/ux-ui-design',
});

export default function UxUiDesignPage() {
  return <UxUiDesignContent />;
}
