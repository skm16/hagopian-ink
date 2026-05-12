import type { Metadata } from 'next';
import { HomeContent } from '@/components/home/HomeContent';

export const metadata: Metadata = {
  // Inherits from root layout's default metadata. The homepage IS the canonical
  // root URL, and root layout already sets title + description for "/".
};

export default function HomePage() {
  return <HomeContent />;
}
