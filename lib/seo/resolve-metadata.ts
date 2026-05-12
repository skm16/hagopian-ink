import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hagopianink.com';
const DEFAULT_OG = 'https://hagopianink.com/wp-content/uploads/2022/09/home_screenshot.jpg';

export interface MetaInput {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalPath?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildMetadata(input: MetaInput): Metadata {
  const description = input.description ?? '';
  const canonical = input.canonicalPath
    ? `${SITE_URL}${input.canonicalPath}`
    : undefined;
  return {
    title: input.title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: input.ogType ?? 'website',
      title: input.ogTitle ?? input.title,
      description: input.ogDescription ?? description,
      url: canonical,
      images: [input.ogImage ?? DEFAULT_OG],
      siteName: 'HAGOPIAN INK',
      locale: 'en_US',
      ...(input.ogType === 'article' && input.modifiedTime
        ? { modifiedTime: input.modifiedTime, publishedTime: input.publishedTime }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@hagopianink',
      title: input.ogTitle ?? input.title,
      description: input.ogDescription ?? description,
      images: [input.ogImage ?? DEFAULT_OG],
    },
    other: {
      'msvalidate.01': 'BF388B7EC147AC793598756EF3A5A751',
    },
  };
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function pickDescription(...candidates: Array<string | null | undefined>): string {
  for (const c of candidates) {
    if (c) {
      const cleaned = stripHtml(c);
      if (cleaned.length > 0) return cleaned;
    }
  }
  return '';
}
