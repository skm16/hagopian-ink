export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  tags: string[];
  tagline: string;
  intro: string;
  hero: string;
  challenge: string;
  solution: string;
  result: string;
  images: string[];
  thumb: string;
};

const CDN = 'https://hagopianink.wpenginepowered.com/wp-content/uploads';

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'joseph-robert',
    client: 'Joseph Robert',
    category: 'Branding',
    tags: ['Fashion', 'Luxury', 'Lifestyle'],
    tagline: 'A modern monogram for menswear.',
    intro: 'Joseph Robert Sommer had a vision for creating a modern, timeless and approachable line of products for men — bags, accessories, and shoes — requiring a unique signature mark.',
    hero: `${CDN}/2022/08/HI_Web_josephrobert_lifestyle-scaled.jpg`,
    challenge: 'Joseph Robert is a new consumer brand intended to reach men who are fashionable, stylish and sleek. The brand needed to attract men who are also drawn to well-designed products and care about value. Joseph Roberts launched as a modern, high quality, yet affordable brand with products sold wholesale, on Amazon, and direct to consumer on Shopify.',
    solution: 'We created a brand strategy, new logo mark, pattern and style guide to launch the Joseph Roberts collection. Rich blues, a distinctive symbol, and repeatable pattern allowed for flexibility throughout the brand system. The monogram created a sophisticated, approachable design to apply across the line of men\'s apparel and accessories.',
    result: 'The new logo established a unique brand presence using a modern JR monogram. The wordmark and icon created versatility — used with text or independently as a symbol — allowing for endless possibilities across a branded line of accessories. Logo applications included stamped in leather, embroidered on apparel, and printed in patterns.',
    images: [
      `${CDN}/2022/08/JR_briefcase.jpg`,
      `${CDN}/2022/08/JR_briefcase2.jpg`,
      `${CDN}/2022/08/JR_leather_2.jpg`,
      `${CDN}/2022/08/JR_briefcase3.jpg`,
      `${CDN}/2022/08/HI_Web_josephrobert_lifestyle5.jpg`,
      `${CDN}/2022/08/logo-anatomy.png`,
      `${CDN}/2022/08/JosephRobert3.png`,
      `${CDN}/2022/08/JR_tie_ltblue.jpg`,
      `${CDN}/2022/08/JR_tie_blue.jpg`,
      `${CDN}/2022/08/JR_menswear_newtie.jpg`,
    ],
    thumb: `${CDN}/2022/08/HI_Web_josephrobert_lifestyle-scaled.jpg`,
  },
  {
    slug: 'loumbeauty',
    client: 'Loum Beauty',
    category: 'UX Design',
    tags: ['Fashion', 'Beauty', 'Luxury', 'Lifestyle'],
    tagline: 'Clean beauty is calm beauty.',
    intro: 'Loum Beauty launched with a goal to be the first complete skincare line to reverse the effects of stress on skin. The website needed to act as the leading tool to sell their line of unique products — and it was falling short in conversions.',
    hero: `${CDN}/2022/08/Loum_stress_header2.gif`,
    challenge: 'Several findings were determined to be causing user confusion, a high bounce rate, and lack of clarity through recent research. The goal was to improve both the brand story and the usability of the site by implementing key strategic design and messaging changes.',
    solution: 'We reviewed the research findings and drafted new copy to better explain the company, products and vision. We evolved the brand messaging and brand voice to better communicate with Loum\'s audience and create an emotional connection. Usability improvements included intuitive navigation and a seamless customer experience for both mobile and desktop devices.',
    result: 'We created a comprehensive digital experience focusing on usability best practices and intuitive navigation. We illustrated the effects of stress on skin visually and highlighted how Loum\'s key ingredients and formulas provide undeniable benefits. The new simplified messaging and imagery communicated serenity with clarity.',
    images: [
      `${CDN}/2022/08/Loum_Home_final_cropped-scaled.jpg`,
      `${CDN}/2022/08/Loum_Home_final_cropped3-scaled.jpg`,
      `${CDN}/2022/08/Loum_science-scaled.jpg`,
      `${CDN}/2022/08/HI_Web_Loum_grid_purple.jpg`,
      `${CDN}/2022/08/HI_Web_Loum_grid_flower.jpg`,
      `${CDN}/2022/08/HI_Web_Loum_grid_peach.jpg`,
      `${CDN}/2022/08/HI_Web_Loum_grid_petri.jpg`,
      `${CDN}/2022/08/HI_Web_Loum_grid_green.jpg`,
      `${CDN}/2022/08/HI_Web_loum_chart_smaller-scaled.jpg`,
      `${CDN}/2022/08/HI_Web_loum_rollover-1-scaled.jpg`,
    ],
    thumb: `${CDN}/2022/08/Work-Thumb_loum2-724x1024-1-293x414.jpg`,
  },
  {
    slug: 'audible-email-design',
    client: 'Audible',
    category: 'Email Marketing',
    tags: ['Subscription', 'Technology'],
    tagline: 'Re-engaging an inactive email audience.',
    intro: 'Audible, the largest seller and producer of spoken audio media, needed a partner to perform all elements of front-end campaign development for their pre-lapse email series — and trusted Hagopian Ink to get the job done.',
    hero: `${CDN}/2022/07/HI_Web_audible_lifestyle-scaled.jpg`,
    challenge: 'Audible knew that if a new member doesn\'t listen to their first audio book within a certain period of time, they are much more likely to cancel their subscription. The goal was to help re-engage new subscribers who were not listening to their audio books, help them find another book, or guide them to find new ways to listen.',
    solution: 'We created messaging by appealing to the unique benefits of Audible and created emotional connections. Hagopian Ink collaborated with Audible\'s digital marketing team to complete email templates for this vital pre-lapse series — addressing the fourth stage of the subscriber lifecycle: reactivation.',
    result: 'The re-engagement series was essential to decreasing cancellation and increasing subscribers who thoroughly enjoy listening to their audio books on an ongoing basis. Prompts to stimulate usage through the email flow encouraged subscriptions to stay in force.',
    images: [
      `${CDN}/2022/07/Audible_Emails_waning_image1.gif`,
      `${CDN}/2022/07/Audible_Emails_waning_image2-scaled.jpg`,
      `${CDN}/2022/07/audible_animation1.gif`,
      `${CDN}/2022/07/image_waning1.jpg`,
      `${CDN}/2022/07/image_waning2.jpg`,
      `${CDN}/2022/07/HI_Web_audible_lifestyle2-scaled.jpg`,
      `${CDN}/2022/07/HI_Web_audible_mobile_1.jpg`,
      `${CDN}/2022/07/HI_Web_audible_mobile_8.jpg`,
      `${CDN}/2022/07/HI_Web_audible_mobile_6.jpg`,
      `${CDN}/2022/07/Audible_Emails_waning_photo3.jpg`,
    ],
    thumb: `${CDN}/2022/07/HI_Web_audible_lifestyle-scaled.jpg`,
  },
  {
    slug: 'black-lives-matter-canada',
    client: 'Black Lives Matter Canada',
    category: 'Email Marketing',
    tags: ['Community', 'Nonprofit'],
    tagline: 'Drive to donate. Call for change.',
    intro: 'Black Lives Matter Canada is growing their donor base to further fund their important mission. The organization needed a timely way to thank current donors, activate new donors, and encourage ongoing support through a comprehensive email program.',
    hero: `${CDN}/2022/09/HI_Web_BLM_header-scaled2.jpg`,
    challenge: 'Black Lives Matter Canada needed a comprehensive strategic plan and a system of messages to help raise additional funds. Email was an essential tool to illustrate where the money was going and properly thank each donor for their contribution to the cause.',
    solution: 'We composed messages together that promoted action to achieve the goal of additional fundraising. Automated emails were created for a welcome series, donor thank you series, and a weekly series. We shared how the money would be used, informed on the work still needed, created announcements for new initiatives and showcased community events.',
    result: 'As a young organization, we set up the email program for long-term success through a system of templates that could be easily maintained by the team. The email design empowered, unified, and inspired change — connecting a global movement to individual action and measurable charitable giving.',
    images: [
      `${CDN}/2022/08/HI_Web_BLM_header3-scaled.jpg`,
      `${CDN}/2022/08/HI_Web_BLM_lifestyle-scaled.jpg`,
      `${CDN}/2022/08/BLM_anatomy_successful_donation_email.png`,
      `${CDN}/2022/08/BLMC_DonorEmail_mobile3.jpg`,
      `${CDN}/2022/08/BLMC_DonorEmail_mobile4.jpg`,
      `${CDN}/2022/08/BLMC_DonorEmail_mobile7.jpg`,
    ],
    thumb: `${CDN}/2022/08/Work-Thumb_BLMC-724x1024-1-293x414.jpg`,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(cs => cs.slug === slug);
}
