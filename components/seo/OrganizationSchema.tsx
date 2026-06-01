import { rewriteWpMediaUrl } from '@/lib/wp/media-url';

export function OrganizationSchema() {
  const logoUrl = rewriteWpMediaUrl(
    'https://hagopianink.com/wp-content/uploads/2018/08/cropped-logo-1.png',
  );
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://hagopianink.com/#organization',
    name: 'HAGOPIAN INK',
    url: 'https://hagopianink.com/',
    logo: {
      '@type': 'ImageObject',
      inLanguage: 'en-US',
      '@id': 'https://hagopianink.com/#/schema/logo/image/',
      url: logoUrl,
      contentUrl: logoUrl,
      width: 264,
      height: 60,
      caption: 'HAGOPIAN INK',
    },
    image: { '@id': 'https://hagopianink.com/#/schema/logo/image/' },
    sameAs: [
      'https://www.facebook.com/hagopianink',
      'https://x.com/hagopianink',
      'https://www.instagram.com/hagopianink',
      'https://www.linkedin.com/company/hagopian-ink-inc/',
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
