import type { Redirect, Rewrite } from 'next/dist/lib/load-custom-routes';

// Legacy blog slugs at root paths from the WP site (HagopianInk_WP_Urls.md).
// Map to /blog/<slug>.
const LEGACY_BLOG_SLUGS = [
  '7-luxury-jewelry-websites-we-love-2',
  'tedx-navesink',
  'million-dollar-women-summit',
  'eo-accelerator-interview',
  'designers-view-womens-march-washington',
  'behind-scenes-eo-video-shoot',
  'top-picks-holiday-emails',
  '2016-marketing-impact-awards-finalist',
  'does-your-brand-have-a-voice',
  'print',
  'blue-hill-stone-barns',
  'holiday-campaign-checklist',
  'year-end-fundraising-nonprofits',
  'email-marketing-workshop-recap',
  'email-marketing-seminar-at-noble-desktop',
  'litmus-email-design-conference-recap',
  'gere-kavanaugh-career-inspiration',
  'he-named-me-malala',
  '805-2',
  'healing-hands',
  'montefiore-medical-center-2',
  'grow-your-e-commerce-business-with-responsive-email',
  'greenspun-shapiro',
  'ignite-create-shine',
  'the-ink-is-growing',
  'christina-hagopian',
  'the-ink-turns-13',
  'cuddl-duds-photoshoot',
  'vintage-typography-neon-museum-las-vegas',
  'the-ink-is-now-officially-certified-as-woman-owned',
  'martafy-personality-driven-visual-branding',
  'best-practices-for-optimizing-responsive-email-designs',
  '6-tips-for-better-email-marketing-campaigns',
  'woman-entrepreneur-gina-capozza',
  'new-website-launch',
  'meet-a-mentor-julia-pimsleur',
  'hagopian-ink-12',
  'dan-friedman-radical-modernist',
  'oh-honey-packaging',
  'design-complicated',
  'hello-hello-hello-sesame-workshop',
  'windows-bergdorf-goodman',
  'snapshot-aston-martin-holiday-promo',
  'design-inspiration-matisses-cut-outs',
  'winter-solstice-luminous-light-catcher',
  'summer-solstice',
  'jennifer-tzeses',
  'inked-for-success-carnegie-mellon-university',
  'sambora',
  'beverly-stacy',
  'behind-scenes-todd-duncan-photoshoot',
  'matt-gillmore',
  'meet-newest-member-ink-jovi',
  'beautiful-paper-letterpress-adc-paper-expo',
  'happy-365',
  '122112-2',
  'how-is-responsive-email-like-nyc-dating',
  'the-new-burberry-logo-new-luxury',
  'our-top-6-tips-for-holiday-luxury-marketing',
  'frette-boosting-traffic-promotion',
  'mobile-email-marketing-tips-for-e-commerce-success',
  'why-email-personalization-matters-and-how-to-get-it-right',
  '5-luxury-brand-marketing-must-reads',
  'creativity-and-technology-on-wtbq-radio',
  'relaunching-your-agency-website-thrive-podcast',
  'ink-team-building-qigong',
  'luxury-business-cards',
  '10-email-marketing-resolutions-for-2019',
  'grow-your-email-list-fast-with-marketing-contests',
  'elements-for-luxury-brand-marketing',
  'email-roi',
  '5-ways-to-craft-a-killer-subject-line',
  'forbes-secrets-to-effective-email-marketing',
  '15-lessons-first-15-years-business',
  'bring-wow-client-gifts',
  'montefiore-gala-luxury-invitations',
  'women-graphic-design-legends',
  'thank-you-cards',
  'judging-the-45th-connecticut-art-directors-club-awards',
  'email-design-best-practices-needle-movement-podcast',
  '2020-holiday-marketing-recap-needle-movement-podcast-2',
  'christina-hagopian-41-email-experts-on-email-marketing-trends-to-look-out-for-in-2022',
  'armenian-italian-family-cookbook',
  'celebrating-20-years-at-hagopian-ink',
];

const CMS_HOST = 'https://cms.hagopianink.com';

export function buildRedirects(): Redirect[] {
  const blogRedirects: Redirect[] = LEGACY_BLOG_SLUGS.map((slug) => ({
    source: `/${slug}`,
    destination: `/blog/${slug}`,
    permanent: true,
  }));

  const workWildcard: Redirect = {
    source: '/works/:slug',
    destination: '/work/:slug',
    permanent: true,
  };

  const taxonomyRedirects: Redirect[] = [
    { source: '/work/design-branding', destination: '/work', permanent: true },
    { source: '/work/email', destination: '/work', permanent: true },
    { source: '/work/ux-design', destination: '/work', permanent: true },
  ];

  const staticRedirects: Redirect[] = [
    { source: '/work/award-winning-logos', destination: '/work/custom-logo-design-brand-identity', permanent: true },
    { source: '/case-studies', destination: '/work', permanent: true },
    { source: '/mobile-email-checklist', destination: '/contact', permanent: true },
    { source: '/thank-you-for-joining', destination: '/', permanent: true },
    { source: '/sign-up-for-our-newsletter', destination: '/contact', permanent: true },
    { source: '/wbe-branding-agency', destination: '/about', permanent: true },
  ];

  const wpAdminRedirects: Redirect[] = [
    { source: '/wp-admin', destination: `${CMS_HOST}/wp-admin`, permanent: false, basePath: false },
    { source: '/wp-admin/:path*', destination: `${CMS_HOST}/wp-admin/:path*`, permanent: false, basePath: false },
    { source: '/wp-login.php', destination: `${CMS_HOST}/wp-login.php`, permanent: false, basePath: false },
    { source: '/wp-content/uploads/:path*', destination: `${CMS_HOST}/wp-content/uploads/:path*`, permanent: true, basePath: false },
  ];

  const sitemapRedirect: Redirect = {
    source: '/sitemap_index.xml',
    destination: '/sitemap.xml',
    permanent: true,
  };

  return [
    ...blogRedirects,
    workWildcard,
    ...taxonomyRedirects,
    ...staticRedirects,
    ...wpAdminRedirects,
    sitemapRedirect,
  ];
}

export function buildRewrites(): Rewrite[] {
  return [
    { source: '/feed', destination: `${CMS_HOST}/feed` },
    { source: '/feed/atom', destination: `${CMS_HOST}/feed/atom` },
    { source: '/comments/feed', destination: `${CMS_HOST}/comments/feed` },
  ];
}
