import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/resolve-metadata';
import { ContactContent } from '@/components/contact/ContactContent';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: 'Get in touch with Hagopian Ink to discuss your branding, UX design, or email marketing project.',
  canonicalPath: '/contact',
});

export default function ContactPage() {
  return <ContactContent />;
}
