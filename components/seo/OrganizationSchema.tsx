export function OrganizationSchema() {
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
      url: 'https://hagopianink.com/wp-content/uploads/2018/08/cropped-logo-1.png',
      contentUrl: 'https://hagopianink.com/wp-content/uploads/2018/08/cropped-logo-1.png',
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
