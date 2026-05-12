export function WebSiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://hagopianink.com/#website',
    url: 'https://hagopianink.com/',
    name: 'HAGOPIAN INK',
    description: '',
    publisher: { '@id': 'https://hagopianink.com/#organization' },
    potentialAction: [{
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://hagopianink.com/?s={search_term_string}',
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueRequired: true,
        valueName: 'search_term_string',
      },
    }],
    inLanguage: 'en-US',
    datePublished: '2018-08-16T12:58:57+00:00',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
