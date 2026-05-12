const CDN = 'https://hagopianink.wpenginepowered.com/wp-content/uploads';
const BASE = '/';

export type Section =
  | { type: 'text';             label: string; body: string; dark?: boolean }
  | { type: 'text-image';       label: string; title: string; body: string; image: string; imageLeft?: boolean; bg?: string }
  | { type: 'full-image';       src: string }
  | { type: 'contained-image';  src: string; maxWidth?: number; bg?: string }
  | { type: 'carousel';         images: string[]; dark?: boolean }
  | { type: 'desktop-frames';   images: string[]; navBar?: 'silver' | 'black' }
  | { type: 'mobile-frames';    images: string[] }
  | { type: 'logo-grid';        images: string[]; bg?: string }
  | {
      type: 'columns-three';
      challenge: string;
      solution: string;
      resultTitle: string;
      result: string;
    }
  | { type: 'quote'; quote: string; name: string; title: string; photo?: string };

export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  tags: string[];
  tagline: string;
  intro: string;
  hero?: string;
  heroContained?: boolean;
  noHero?: boolean;
  sections: Section[];
  thumb: string;
};

export const CASE_STUDIES: CaseStudy[] = [

  /* ─── JOSEPH ROBERT ─────────────────────────────────── */
  {
    slug: 'joseph-robert',
    client: 'Joseph Robert',
    category: 'Branding',
    tags: ['Branding', 'Fashion', 'Luxury', 'Lifestyle'],
    tagline: 'A modern monogram for menswear.',
    intro: 'Joseph Robert Sommer had a vision for creating a modern, timeless and approachable line of products for men. His plan to develop a full collection of distinguished products including bags, accessories and shoes, required a unique signature mark.',
    hero: `${CDN}/2022/08/HI_Web_josephrobert_lifestyle-scaled.jpg`,
    sections: [
      {
        type: 'carousel',
        images: [
          `${CDN}/2022/08/JR_briefcase.jpg`,
          `${CDN}/2022/08/JR_briefcase2.jpg`,
          `${CDN}/2022/08/JR_leather_2.jpg`,
          `${CDN}/2022/08/JR_briefcase3.jpg`,
          `${CDN}/2022/08/HI_Web_josephrobert_lifestyle5.jpg`,
        ],
      },
      {
        type: 'columns-three',
        challenge: 'Joseph Robert is a new consumer brand intended to reach men who are fashionable, stylish and sleek. The brand needed to attract men who are also drawn to well-designed products and care about value. Joseph Roberts will launch as a modern, high quality, yet affordable brand with products sold wholesale, on amazon and direct to consumer on Shopify.',
        solution: "We created a brand strategy, new logo mark, pattern and style guide to launch the Joseph Roberts collection. Rich blues, a distinctive symbol, and repeatable pattern allowed for flexibility throughout the brand system. The monogram created a sophisticated, approachable design to apply across the line of men's apparel and accessories.",
        resultTitle: 'A masculine seal',
        result: 'The new logo established a unique brand presence using a modern JR monogram. The wordmark and icon created versatility to use both with text or independently as a symbol, allowing for endless possibilities for a branded line of accessories. Logo applications included — stamped in leather, embroidered on apparel, and printed in patterns.',
      },
      {
        type: 'full-image',
        src: `${BASE}jr-brand-identity.png`,
      },
      {
        type: 'text-image',
        label: 'Brand Identity & Structure',
        title: 'Balance and harmony',
        body: 'Maintaining a balance in the spacing of the logo allows each element of the mark to create a sense of symmetry and harmony. The circle frame creates unity while the strong horizontal lines of the J and R letterforms interrupt the shape in an interlocking modern twist.',
        image: `${BASE}jr-logo-anatomy.png`,
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2022/08/JR_blue.png`,
          `${BASE}jr-hat-portrait.png`,
          `${CDN}/2022/08/JosephRobert1.png`,
          `${CDN}/2022/08/JosephRobert2.png`,
          `${CDN}/2022/08/JosephRobert10.png`,
          `${CDN}/2022/08/JosephRobert8.png`,
          `${CDN}/2022/08/JosephRobert9.png`,
          `${CDN}/2022/08/JosephRobert12.png`,
          `${CDN}/2022/08/Artboard-10@4x.png`,
          `${CDN}/2022/08/Artboard-5@4x.png`,
          `${CDN}/2022/08/Artboard-6@4x.png`,
          `${CDN}/2022/08/Artboard-4@2x_2.jpg`,
        ],
      },
      {
        type: 'text',
        label: 'Letterforms',
        body: 'While monograms are a timeless application of two letterforms, reinventing a modern application takes care and craft. The logo for Joseph Robert has both strength and energy with the J and R reaching and expanding beyond the limits of its boundaries — just like every successful man must do in life.',
      },
      {
        type: 'full-image',
        src: `${CDN}/2022/08/HI_josephrobert.jpg`,
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2022/08/JR_tie_ltblue.jpg`,
          `${CDN}/2022/08/JR_tie_blue.jpg`,
          `${CDN}/2022/08/JR_tie_brown.jpg`,
        ],
      },
      {
        type: 'full-image',
        src: `${CDN}/2022/08/JR_menswear_newtie.jpg`,
      },
    ],
    thumb: `${CDN}/2022/08/HI_Web_josephrobert_lifestyle-scaled.jpg`,
  },

  /* ─── LOUM BEAUTY ────────────────────────────────────── */
  {
    slug: 'loumbeauty',
    client: 'Loum Beauty',
    category: 'UX Design',
    tags: ['Website/UX', 'Fashion', 'Beauty', 'Luxury', 'Lifestyle'],
    tagline: 'Clean beauty is calm beauty.',
    intro: "Loum Beauty launched with a goal to be the first complete skincare line to reverse the effects of stress on skin. The website needed to act as the leading tool to sell their line of unique products and it was falling short in conversions. Our job was to clarify the complex brand story, connect with their audience and solve Loum's UX challenges.",
    hero: `${CDN}/2022/08/Loum_stress_header2.gif`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'Several findings were determined to be causing user confusion, a high bounce rate and lack of clarity through recent research. Our goal was to improve both the brand story and the usability of the site by implementing several key strategic design and messaging changes.',
        solution: "We reviewed the research findings and drafted new copy to better explain the company, products and vision. We evolved the brand messaging and brand voice to better communicate with Loum's audience and create an emotional connection.",
        resultTitle: 'Clarifying a complex brand story',
        result: "We created a comprehensive digital experience focusing on usability best practices, intuitive navigation, and a seamless customer experience for both mobile and desktop devices. We illustrated the effects of stress on skin visually and highlighted how Loum's key ingredients and formulas provide undeniable benefits.",
      },
      {
        type: 'desktop-frames',
        navBar: 'black',
        images: [
          `${CDN}/2022/08/Loum_Home_final_cropped-scaled.jpg`,
          `${CDN}/2022/08/Loum_Home_final_cropped3-scaled.jpg`,
          `${CDN}/2022/08/Loum_science-scaled.jpg`,
        ],
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2022/08/HI_Web_Loum_grid_purple.jpg`,
          `${CDN}/2022/08/HI_Web_Loum_grid_flower.jpg`,
          `${CDN}/2022/08/HI_Web_Loum_grid_peach.jpg`,
          `${CDN}/2022/08/HI_Web_Loum_grid_petri.jpg`,
          `${CDN}/2022/08/HI_Web_Loum_grid_green.jpg`,
          `${CDN}/2022/08/HI_Web_Loum_grid_weed.jpg`,
          `${CDN}/2022/08/HI_Web_loum_chart_smaller-scaled.jpg`,
        ],
      },
      {
        type: 'full-image',
        src: `${CDN}/2022/08/HI_Web_loum_rollover-1-scaled.jpg`,
      },
      {
        type: 'text-image',
        label: 'Messaging Transformed',
        title: 'The New Loum Beauty Brand Story',
        body: 'We simplified the language used to describe the brand with new illustrations, charts and a brand voice manifesto. These elements communicated the complex science behind the products in an easy to understand way.\n\nThe new Loum manifesto included these concepts, simplified:\n\nThink of us as an "OM" in a jar\n\nWe believe in moments of calm, for well-being for health and happiness for ourselves and our communities\n\nWe understand how mind affects skin And skin affects mind And share that science To uplift, inspire, and empower',
        image: `${CDN}/2022/08/loum_petri.png`,
        imageLeft: true,
      },
    ],
    thumb: `${CDN}/2022/08/Work-Thumb_loum2-724x1024-1-293x414.jpg`,
  },

  /* ─── AUDIBLE ────────────────────────────────────────── */
  {
    slug: 'audible-email-design',
    client: 'Audible',
    category: 'Email Marketing',
    tags: ['Email Marketing', 'Subscription', 'Technology'],
    tagline: 'Re-engaging an inactive email audience.',
    intro: 'Audible, the largest seller and producer of spoken audio media, needed a partner to perform all elements of front-end campaign development for their pre-lapse email series and trusted Hagopian Ink to get the job done.',
    hero: `${CDN}/2022/07/HI_Web_audible_lifestyle-scaled.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: "Audible knew that if a new member doesn't listen to their first audio book within a certain period of time, they are much more likely to cancel their subscription. Our goal was to help re-engage new subscribers who were not listening to their new audio books, help them find another book or guide them to find new ways to listen.",
        solution: "We created messaging by appealing to the unique benefits of Audible and created emotional connections. Hagopian Ink collaborated with Audible's digital marketing team to complete email templates for this vital series.",
        resultTitle: 'Increase active subscribers, decrease cancellation.',
        result: 'The re-engagement series was essential to decreasing cancellation and increasing subscribers who thoroughly enjoy listening to their audio books on an ongoing basis. Prompts to stimulate usage through the email flow encouraged subscriptions to stay in force.',
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2022/07/Audible_Emails_waning_image1.gif`,
          `${CDN}/2022/07/Audible_Emails_waning_image2-scaled.jpg`,
        ],
      },
      {
        type: 'text-image',
        label: 'Understanding the life-cycle of an email subscriber',
        title: 'Increase active subscribers, decrease cancellation.',
        body: 'Defining your customer journey and creating targeted messages to address each life-stage is essential for your subscription emails. The emails created for Audible addressed the 4th stage - Reactivating a waning audience.\n\n1. Acquisition\n• Acquire more subscribers\n\n2. Conversion\n• Convert subscribers into buyers\n\n3. Retention\n• Increase lifetime value of each subscriber\n\n4. Reactivation\n• Reactivate lapsed subscribers or buyers',
        image: `${CDN}/2022/07/audible_animation1.gif`,
        bg: '#ffffff',
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2022/07/image_waning1.jpg`,
          `${CDN}/2022/07/image_waning2.jpg`,
        ],
      },
      {
        type: 'full-image',
        src: `${CDN}/2022/07/HI_Web_audible_lifestyle2-scaled.jpg`,
      },
      {
        type: 'mobile-frames',
        images: [
          `${CDN}/2022/07/HI_Web_audible_mobile_1.jpg`,
          `${CDN}/2022/07/HI_Web_audible_mobile_8.jpg`,
          `${CDN}/2022/07/HI_Web_audible_mobile_6.jpg`,
          `${CDN}/2022/07/HI_Web_audible_mobile_3.jpg`,
          `${CDN}/2022/07/HI_Web_audible_mobile_4.jpg`,
          `${CDN}/2022/07/HI_Web_audible_mobile_5.jpg`,
          `${CDN}/2022/07/HI_Web_audible_mobile_2.jpg`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2022/07/Audible_Emails_waning_photo3.jpg`,
          `${CDN}/2022/07/Audible_Emails_waning_photo4-1-scaled.jpg`,
        ],
      },
    ],
    thumb: `${CDN}/2022/07/Work-Thumb_audible-293x414.jpg`,
  },

  /* ─── BLACK LIVES MATTER CANADA ─────────────────────── */
  {
    slug: 'black-lives-matter-canada',
    client: 'Black Lives Matter Canada',
    category: 'Email Marketing',
    tags: ['Email Marketing', 'Community', 'Nonprofit'],
    tagline: 'Drive to donate. Call for change.',
    intro: 'Black Lives Matter Canada is growing their donor base to further fund their important mission. The organization needed a timely way to thank current donors, activate new donors and encourage ongoing support through a comprehensive email program. As strong allies, we wanted to be a part of the cause for change.',
    hero: `${CDN}/2022/09/HI_Web_BLM_header-scaled2.jpg`,
    sections: [
      {
        type: 'full-image',
        src: `${CDN}/2022/08/HI_Web_BLM_header3-scaled.jpg`,
      },
      {
        type: 'full-image',
        src: `${CDN}/2022/08/HI_Web_BLM_lifestyle-scaled.jpg`,
      },
      {
        type: 'columns-three',
        challenge: 'Black Lives Matter Canada needed a comprehensive strategic plan and a system of messages to help raise additional funds. Email was an essential tool to illustrate where the money was going and properly thank each donor for their contribution to the cause.',
        solution: 'We composed messages together that promoted action to achieve the goal of additional fundraising. Automated emails were created for a welcome series, donor thank you series, and a weekly Black Friday series. We shared how the money will be used, informed on the work still needed, created announcements for new initiatives and showcased community events.',
        resultTitle: 'Empower, unify and inspire change',
        result: 'As a young organization, we set up the email program for long term success through a system of templates and email automations. All of our messages were crafted in the right tone to increase action for Black Lives Matter Canada — empowering, honest, current, aspirational and unified. A donor sent a six figure gift within the first month of the program.',
      },
      {
        type: 'full-image',
        src: `${CDN}/2022/08/BLM_anatomy_successful_donation_email.png`,
      },
      {
        type: 'mobile-frames',
        images: [
          `${CDN}/2022/08/BLMC_DonorEmail_mobile3.jpg`,
          `${CDN}/2022/08/BLMC_DonorEmail_mobile4.jpg`,
          `${CDN}/2022/08/BLMC_DonorEmail_mobile7.jpg`,
          `${CDN}/2022/08/BLMC_DonorEmail_mobile5.jpg`,
          `${CDN}/2022/08/BLMC_DonorEmail_mobile1.jpg`,
          `${CDN}/2022/08/BLMC_DonorEmail_mobile2.jpg`,
          `${CDN}/2022/08/BLMC_DonorEmail_mobile10.jpg`,
          `${CDN}/2022/08/BLMC_DonorEmail_mobile9.jpg`,
          `${CDN}/2022/08/BLMC_DonorEmail_mobile14.png`,
          `${CDN}/2022/08/BLMC_DonorEmail_mobile13.png`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2022/08/BLMC_Welcome-2_V2-2.png`,
          `${CDN}/2022/08/BLMC_DonorEmail_1_CH_cropped-scaled.jpg`,
          `${CDN}/2022/08/BLMC_DonorEmail_2_BlackFriday_week1-scaled.jpg`,
        ],
      },
    ],
    thumb: `${CDN}/2022/08/Work-Thumb_BLMC-724x1024-1-293x414.jpg`,
  },

  /* ─── DIAMONDS IN GLASS ──────────────────────────────── */
  {
    slug: 'diamonds-in-glass-luxury-jewelry-website',
    client: 'Diamonds In Glass',
    category: 'Website Design',
    tags: ['Website/UX', 'Luxury', 'Jewelry', 'Lifestyle'],
    tagline: 'A luxury experience for luxury diamonds.',
    intro: 'Diamonds In Glass is a premier luxury jewelry concept that required a digital experience as precious as its products. We designed and built a website that brought the elegance of the brand to life online — immersive, refined, and built to convert discerning buyers.',
    hero: `${CDN}/2018/09/DIG_home_devices_main.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'Diamonds In Glass needed a luxury online presence that reflected the quality and craftsmanship of their unique jewelry. The existing brand lacked the digital sophistication to attract and convert high-end buyers in an increasingly competitive online jewelry market.',
        solution: 'We designed a full website experience with immersive visuals, intuitive navigation, and storytelling that showcased the artistry behind each piece. The brand voice was refined to speak to discerning consumers who value both beauty and craftsmanship.',
        resultTitle: 'A digital showcase for extraordinary jewels',
        result: 'The new website elevated the brand to luxury status, creating an online presence worthy of the products it represents. Clear product storytelling, high-impact imagery, and seamless navigation drove engagement and positioned Diamonds In Glass as a premium destination for fine jewelry.',
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/08/DIG-Banner_2.png`,
      },
      {
        type: 'desktop-frames',
        navBar: 'black',
        images: [
          `${CDN}/2018/09/HI_Web_Diamonds_banner2.jpg`,
          `${CDN}/2018/09/DIG_Animation2.gif`,
        ],
      },
      {
        type: 'mobile-frames',
        images: [
          `${CDN}/2018/09/HI_Web_Diamonds_mobile_home2.jpg`,
          `${CDN}/2018/09/HI_Web_Diamonds_mobile_home3.jpg`,
        ],
      },
      {
        type: 'mobile-frames',
        images: [
          `${CDN}/2018/09/HI_Web_Diamonds_mobile_about1.jpg`,
          `${CDN}/2018/09/HI_Web_Diamonds_mobile_about2.jpg`,
          `${CDN}/2018/09/HI_Web_Diamonds_mobile_about3.jpg`,
          `${CDN}/2018/09/HI_Web_Diamonds_mobile_about4.jpg`,
          `${CDN}/2018/09/HI_Web_Diamonds_mobile_blog1.jpg`,
          `${CDN}/2018/09/HI_Web_Diamonds_mobile_blog2.jpg`,
        ],
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_DIG-293x414.jpg`,
  },

  /* ─── PEPSI ──────────────────────────────────────────── */
  {
    slug: 'pepsi-email-marketing',
    client: 'Pepsi',
    category: 'Email Marketing',
    tags: ['Email Marketing', 'Consumer Goods', 'Beverage'],
    tagline: 'Campaigns refreshed for a new generation.',
    intro: 'PepsiCo engaged Hagopian Ink to develop dynamic email marketing campaigns that celebrated loyalty, seasonal moments, and the iconic Pepsi brand experience. The challenge was creating campaigns that stood out in a crowded inbox and spoke to a passionate consumer base.',
    hero: `${CDN}/2018/08/HI_Web_Pepsi_lifestyle.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'Pepsi needed email campaigns that brought the energy of the brand into the inbox — campaigns that felt as bold and refreshing as the product itself. Generic templated emails were not cutting through to their audience.',
        solution: 'We designed a suite of email campaigns — from welcome and birthday messages to seasonal promotions — each rooted in the iconic Pepsi visual language. Animated GIFs, bold typography, and strong CTAs created emails that demanded attention.',
        resultTitle: 'Bold. Refreshing. On brand.',
        result: 'Each campaign delivered a consistent, high-impact brand experience across the full email program. The birthday email series became a fan favorite, while seasonal promotions drove measurable spikes in engagement and redemption rates.',
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/08/HI_Web_Pepsi_header.jpg`,
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/08/HI_Web_Pepsi_email_welcome-1.gif`,
          `${CDN}/2018/08/HI_Web_Pepsi_email_pepsi2-1.jpg`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/08/HI_Web_Pepsi_email_pepsi3.jpg`,
          `${CDN}/2018/08/HI_Web_Pepsi_email_bday-1.gif`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/08/HI_Web_Pepsi_email_pepsi5.jpg`,
          `${CDN}/2018/08/HI_Web_Pepsi_email_pepsi4.jpg`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/08/HI_Web_Pepsi_email_amp1.jpg`,
          `${CDN}/2018/08/HI_Web_Pepsi_email_amp2.jpg`,
          `${CDN}/2018/08/HI_Web_Pepsi_email_dew1.jpg`,
        ],
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/08/HI_Web_Pepsi_lifestyle2.jpg`,
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_pepsi-293x414.jpg`,
  },

  /* ─── TODD & DUNCAN ──────────────────────────────────── */
  {
    slug: 'todd-duncan-cashmere-branding-design',
    client: 'Todd & Duncan',
    category: 'Branding',
    tags: ['Branding', 'Website/UX', 'Luxury', 'Lifestyle', 'Fashion'],
    tagline: 'The finest cashmere. A brand to match.',
    intro: 'Todd & Duncan is one of the world\'s most celebrated cashmere producers, with a heritage dating back over 150 years. They needed a brand and digital presence that matched the extraordinary quality and history of their product — refined, authoritative, and unmistakably premium.',
    hero: `${CDN}/2018/10/HI_Web_ToddDuncan_photo10.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'Todd & Duncan needed to modernize their brand and create a digital flagship that honored their rich heritage while appealing to contemporary luxury buyers and fashion partners. Their story of quality and craftsmanship needed to be told with conviction.',
        solution: 'We developed a refined brand identity and website experience rooted in the artisanal quality of their cashmere. Warm tones, editorial photography, and precise typography created a brand language that felt both timeless and modern.',
        resultTitle: 'A heritage brand, re-imagined',
        result: 'The new identity gave Todd & Duncan the premium presence their product has always deserved. The website became a destination for the brand story — drawing in buyers, designers, and partners who share a passion for quality and craftsmanship.',
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2018/10/HI_Web_ToddDuncan_store1.jpg`,
          `${CDN}/2018/10/HI_Web_ToddDuncan_store3.jpg`,
          `${CDN}/2018/10/HI_Web_ToddDuncan_store5.jpg`,
          `${CDN}/2018/10/HI_Web_ToddDuncan_store4.jpg`,
          `${CDN}/2018/10/TD_store_4.png`,
        ],
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/10/HI_Web_ToddDuncan_webpage-devices.jpg`,
      },
      {
        type: 'mobile-frames',
        images: [
          `${CDN}/2018/10/HI_Web_ToddDuncan_mobile1.jpg`,
          `${CDN}/2018/10/HI_Web_ToddDuncan_mobile2.jpg`,
          `${CDN}/2018/10/HI_Web_ToddDuncan_mobile3.jpg`,
          `${CDN}/2018/10/HI_Web_ToddDuncan_mobile4.jpg`,
          `${CDN}/2018/10/HI_Web_ToddDuncan_mobile6.jpg`,
        ],
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_TD-293x414.jpg`,
  },

  /* ─── LA LA LIFE BOX ─────────────────────────────────── */
  {
    slug: 'lalalife-subscription-box-branding-and-website-design',
    client: 'La La Life Box',
    category: 'Branding + Website',
    tags: ['Branding', 'Website/UX', 'Subscription', 'Lifestyle'],
    tagline: 'A subscription box worth celebrating.',
    intro: 'La La Life Box is a lifestyle subscription service that needed a brand and website as joyful and curated as the boxes they deliver. We built a full brand identity and digital experience designed to attract, delight, and convert subscription buyers.',
    hero: `${CDN}/2018/09/lalalife_main_image.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'La La Life Box needed to stand out in a crowded subscription box market. Their brand lacked the visual punch and clear value proposition to convert visitors into loyal subscribers. The website needed to tell a story that felt personal, joyful, and premium.',
        solution: 'We designed a complete brand identity — including logo, color system, packaging design, and brand voice — and translated it into a conversion-focused website. The design leaned into celebration, color, and the joy of unboxing.',
        resultTitle: 'A brand as delightful as the box',
        result: 'The new brand and website created a cohesive, high-energy experience that clearly communicated the La La Life value. The subscription funnel was optimized for conversion and the brand earned recognition in the lifestyle and gifting space.',
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/08/4-layers-2.png`,
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/08/lala_HOME_desktop.png`,
          `${CDN}/2018/08/shutterstock_tea-THE_BOX__LAYERS.png`,
        ],
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2018/09/lala_slider_6.jpg`,
          `${CDN}/2018/09/lala_slider_4.jpg`,
          `${CDN}/2018/09/lala_slider_7.jpg`,
          `${CDN}/2018/09/lala_slider8.jpg`,
        ],
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/09/lala_mobile_views.jpg`,
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2018/08/Artwork.png`,
          `${CDN}/2018/08/artwork2.png`,
          `${CDN}/2018/08/artwork23.png`,
        ],
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_lala-293x414.jpg`,
  },

  /* ─── SESAME STREET ──────────────────────────────────── */
  {
    slug: 'sesame-street-mobile-email',
    client: 'Sesame Street',
    category: 'Email Marketing',
    tags: ['Email Marketing', 'Community', 'Nonprofit', 'Subscription'],
    tagline: 'Subscription Emails on the Go',
    intro: 'When Sesame Workshop launched a new mobile application version of their current video on-demand program, Sesame Street Go, Hagopian Ink was their strategic marketing partner. We created an email communications program to interact with new and existing subscribers of Sesame Go.',
    hero: `${CDN}/2018/09/HI_Web_Sesame_lifestyle1.jpg`,
    sections: [
      {
        type: 'full-image',
        src: `${CDN}/2018/09/HI_Web_Sesame_header2.jpg`,
      },
      {
        type: 'columns-three',
        challenge: 'Sesame Workshop established its brand identity in 1969, with distinct standards regarding look and feel that its loyal audience recognizes instantly. We needed to create a seamless experience for users exploring the online Sesame Street Go content, the mobile application, and the email creative.',
        solution: 'Starting with a comprehensive strategy phase, we created distinctive user flows for both trial and subscriber messages. Using bold typography, playful colors, and furry characters, we created two sets of responsive email templates designed to entice recipients to sign up for new subscriptions, and to encourage subscribers to use the app more frequently. The first was more transactional and included the welcome message, password reset, subscriber status, and auto-responders. The second was a bi-weekly newsletter format to activate their current subscriber base and to engage and encourage continual app usage and learning for the child.',
        resultTitle: 'Increasing engagement',
        result: 'To improve unique opens and click-throughs, we refined audience segmentation and timing, and aligned copy and subject lines to more effectively stimulate recipients to take immediate action. After launching using our mobile email templates, Sesame Street Go saw a steady increase each month in the number of unique click-throughs and unique opens, with their newsletters beating statistical averages when compared with competitors in similar categories.',
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/09/HI_Web_Sesame_email1.jpg`,
          `${CDN}/2018/09/HI_Web_Sesame_email2.jpg`,
          `${CDN}/2018/09/HI_Web_Sesame_email4.jpg`,
        ],
      },
      {
        type: 'text-image',
        label: 'Transactional Emails',
        title: 'Creative transactional messages',
        body: 'Transactional emails showcase the Sesame Street muppets with creative copy to capture attention, elicit an emotional response and prompt clicks. From password reminders from Ernie to email cancellations from Big Bird – messages always stayed true to the brand with playful and positive feelings.',
        image: `${CDN}/2018/09/HI_Web_Sesame_floater.png`,
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/09/sesame_email_contact_cropped.jpg`,
          `${CDN}/2018/09/HI_Web_Sesame_email3.jpg`,
          `${CDN}/2018/09/HI_Web_Sesame_email6.jpg`,
        ],
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/09/HI_Web_Sesame_lifestyle5.jpg`,
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_sesame-293x414.jpg`,
  },

  /* ─── LA PERLA ───────────────────────────────────────── */
  {
    slug: 'la-perla-multichannel-campaign-design',
    client: 'La Perla',
    category: 'Omnichannel Marketing',
    tags: ['Email Marketing', 'Luxury', 'Fashion', 'Lifestyle'],
    tagline: 'A 30% Valentine\'s Day sales lift.',
    intro: 'La Perla is the pinnacle of Italian luxury lingerie and ready-to-wear. They partnered with Hagopian Ink for a multichannel Valentine\'s Day campaign — spanning email, direct mail, digital advertising, and in-store materials — to drive peak-season sales across all touchpoints.',
    hero: `${CDN}/2018/08/HI_Web_LaPerla_directmail1.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'La Perla needed to maximize sales during the most important gifting season of the year. The campaign had to feel consistent across email, direct mail, digital ads, and in-store materials while maintaining the ultra-luxury positioning of the brand.',
        solution: 'We created a cohesive multichannel campaign centered on sensuality, sophistication, and the gift of La Perla. Each touchpoint — from an embossed direct mail piece to digital display banners — told a unified story designed to inspire desire and drive purchase.',
        resultTitle: '30% increase in Valentine\'s Day sales',
        result: 'The campaign delivered a 30% lift in Valentine\'s Day sales and drove measurable in-store traffic. The unified multichannel approach ensured that La Perla was present and on-brand everywhere a customer might be — from their inbox to the street.',
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2018/08/HI_Web_LaPerla_group1.jpg`,
          `${CDN}/2018/08/HI_Web_LaPerla_website2.jpg`,
          `${CDN}/2018/08/HI_Web_LaPerla_website1.jpg`,
          `${CDN}/2018/08/HI_Web_LaPerla_ad2.jpg`,
          `${CDN}/2018/08/HI_Web_LaPerla_ad1.jpg`,
        ],
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/08/HI_Web_LaPerla_photo_v1.jpg`,
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2018/08/HI_Web_LaPerla_directmail2.jpg`,
          `${CDN}/2018/08/HI_Web_LaPerla_group2.jpg`,
          `${CDN}/2018/08/HI_Web_LaPerla_brochure1-1.jpg`,
          `${CDN}/2018/08/HI_Web_LaPerla_brochure2-1.jpg`,
          `${CDN}/2018/08/HI_Web_LaPerla_brochure3-1.jpg`,
        ],
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_laperla-293x414.jpg`,
  },

  /* ─── MONTEFIORE ─────────────────────────────────────── */
  {
    slug: 'montefiore-healthcare-design',
    client: 'Montefiore Einstein',
    category: 'Fundraising Design',
    tags: ['Email Marketing', 'Nonprofit', 'Healthcare', 'Fundraising'],
    tagline: '329% more dollars raised.',
    intro: 'Montefiore Einstein, one of New York\'s most respected health systems, enlisted Hagopian Ink to support their annual fundraising program. We designed and produced a multi-year program spanning donor emails, gala invitations, newsletters, and event branding that raised $22.2M and added over 100 new attendees.',
    hero: `${CDN}/2018/10/HI_Web_Montefiore_lifestyle4.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'Montefiore needed a fundraising program that could deepen relationships with existing donors while inspiring new giving. The challenge was communicating complex medical impact in a way that was emotionally compelling, personal, and worthy of a world-class institution.',
        solution: 'We developed a multi-year creative program that connected donors\' generosity directly to patient outcomes. Donor emails, motivational brochures, school health newsletters, and gala invitations were designed to inspire pride, gratitude, and continued giving.',
        resultTitle: '329% more dollars raised — $22.2M at the annual gala',
        result: 'The program transformed Montefiore\'s fundraising results — delivering a 329% increase in dollars raised, $22.2M raised at the annual gala, and over 100 new attendees. Donors reported feeling more connected to the mission than ever before.',
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2018/10/HI_Web_Montefiore_emails.jpg`,
          `${CDN}/2018/10/HI_Web_Montefiore_motivations.jpg`,
          `${CDN}/2018/10/HI_Web_Montefiore_motivationsspreads.jpg`,
          `${CDN}/2018/10/montefiore-newsletters-7.gif`,
          `${CDN}/2018/10/HI_Web_Montefiore_patientcard.jpg`,
        ],
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2018/10/HI_Web_Montefiore_newlbrochure.jpg`,
          `${CDN}/2018/10/HI_Web_Montefiore_schoolbrochure.jpg`,
          `${CDN}/2018/10/HI_Web_Montefiore_schoolhealth.jpg`,
        ],
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2018/10/HI_Web_Montefiore_gala1.jpg`,
          `${CDN}/2018/10/HI_Web_Montefiore_gala4.jpg`,
          `${CDN}/2018/10/HI_Web_Montefiore_gala2.jpg`,
        ],
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_montefiore-293x414.jpg`,
  },

  /* ─── AWARD WINNING LOGOS ────────────────────────────── */
  {
    slug: 'award-winning-logos',
    client: 'Award Winning Logos & Brand Development',
    category: 'Brand Identity',
    tags: ['Branding', 'Luxury', 'Consumer Goods', 'Nonprofit', 'Technology'],
    tagline: 'Make your mark.',
    intro: 'What makes a great brand? A distinctive and memorable logo is the cornerstone of your company image. It communicates your core values and attributes and is a visual representation of all the qualities you wish to express. Using type, shape and color, a great logo is your mark on the world — it is bold, simple, expressive, flexible, scalable and clear. This collection is a sample of some of our favorite logo creations.',
    noHero: true,
    hero: `${CDN}/2018/08/HI-Web_Logos_pepsi.jpg`,
    sections: [
      {
        type: 'logo-grid',
        images: [
          `${CDN}/2018/08/HI-Web_Logos_pepsi.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_ToddAndDuncan.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_lala.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_joseph_robert.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_engage_women.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_weleague.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_BeWell.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_personalbest2.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_Worldtowning.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_Pictales.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_potoo.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_NYCSEM.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_epilepsy_carecure.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_Owl.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_ChristopherStreet.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_Inbound.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_aleka.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_michael_sowers-e1658281340493.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_Greenspun.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_starbridge2.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_Martafy.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_TMN.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_iKidNY.jpg`,
          `${CDN}/2018/08/HI-Web_Logos_MHA.jpg`,
        ],
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_logos-293x414.jpg`,
  },

  /* ─── GWYNNIE BEE ────────────────────────────────────── */
  {
    slug: 'gwynnie-bee-subscription-acquisition-email',
    client: 'Gwynnie Bee',
    category: 'Email Marketing',
    tags: ['Email Marketing', 'Subscription', 'Fashion', 'Lifestyle'],
    tagline: '300% increase in signup conversion.',
    intro: 'Gwynnie Bee is a fashion subscription service for plus-size women. They engaged Hagopian Ink to redesign their acquisition email funnel and subscription landing experience — delivering a 300% lift in new member sign-ups and making their email program one of the most effective in the category.',
    hero: `${CDN}/2018/10/HI_Web_GwynnieBee_topPreview.gif`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'Gwynnie Bee\'s acquisition emails were underperforming — failing to communicate the unique value proposition of a subscription fashion service for plus-size women. The emails needed to feel personal, empowering, and compelling enough to drive sign-ups.',
        solution: 'We redesigned the acquisition email funnel from the ground up — rewriting copy, reimagining the visual system, and creating animated campaigns that brought the product experience to life. Landing pages were redesigned to reduce friction and increase conversion.',
        resultTitle: '300% increase in signup conversion',
        result: 'The redesigned acquisition funnel delivered a 300% lift in new member sign-ups. The email program became a major growth driver for Gwynnie Bee, creating a scalable template system that the internal team could build on for years.',
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/10/HI_Web_GwynnieBee_email-short3-1.jpg`,
          `${CDN}/2018/10/HI_Web_GwynnieBee_email-anim2.gif`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/10/Promotional_61_Ticket124_final.gif`,
          `${CDN}/2018/10/HI_Web_GwynnieBee_email-mid7v2.jpg`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/10/HI_Web_GwynnieBee_email-mid3-1.jpg`,
          `${CDN}/2018/10/HI_Web_GwynnieBee_email-mid1.jpg`,
        ],
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/10/GB_leo_landings.jpg`,
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2018/10/HI_Web_GwynnieBee_directmail.jpg`,
          `${CDN}/2018/10/HI_Web_GwynnieBee_photo3v2.jpg`,
          `${CDN}/2018/10/HI_Web_GwynnieBee_box2v2.jpg`,
          `${CDN}/2018/10/GB_ads2.jpg`,
        ],
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_gwynnie-293x414.jpg`,
  },

  /* ─── SOBE ───────────────────────────────────────────── */
  {
    slug: 'sobe-fluid-responsive-email',
    client: 'SoBe',
    category: 'Email Marketing',
    tags: ['Email Marketing', 'Consumer Goods', 'Beverage'],
    tagline: 'Fluid design for a fluid brand.',
    intro: 'SoBe Beverages is known for its bold, irreverent personality and vibrant product line. Hagopian Ink designed a responsive email program that brought the brand\'s fluid, colorful energy to life across every device — building loyalty among a passionate fanbase.',
    hero: `${CDN}/2018/10/HI_Web_Sobe_header.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'SoBe needed an email program that matched the playful, bold spirit of the brand and performed flawlessly across mobile and desktop. Static, image-heavy emails were failing to render well on mobile devices where the majority of their audience was engaging.',
        solution: 'We built a fully fluid, responsive email system that adapted perfectly to any screen size. Animated GIF headers, bold color blocking, and personality-driven copy created campaigns that felt uniquely SoBe — and worked beautifully everywhere.',
        resultTitle: 'Bold campaigns. Perfect on every screen.',
        result: 'The responsive email program eliminated the mobile rendering issues and saw measurable improvements in mobile open and click rates. The bold creative approach earned strong brand recall among SoBe\'s loyal fanbase.',
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/10/sobe_welcome.gif`,
          `${CDN}/2018/10/HI_Web_Sobe_email5.jpg`,
          `${CDN}/2018/10/HI_Web_Sobe_email6.jpg`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/10/HI_Web_Sobe_email4.jpg`,
          `${CDN}/2018/10/HI_Web_Sobe_email3.jpg`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/10/HI_Web_Sobe_email1.gif`,
          `${CDN}/2018/10/HI_Web_Sobe_email2.gif`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/10/HI_Web_Sobe_email7.jpg`,
          `${CDN}/2018/10/HI_Web_Sobe_email8.jpg`,
          `${CDN}/2018/10/7-17-sobe_july_revised.jpg`,
        ],
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/10/HI_Web_Sobe_lifestyle2.jpg`,
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_sobe-293x414.jpg`,
  },

  /* ─── CHRISTOPHER STREET FINANCIAL ──────────────────── */
  {
    slug: 'christopher-street-financial',
    client: 'Christopher Street Financial',
    category: 'Branding',
    tags: ['Branding', 'Website/UX', 'Financial Services'],
    tagline: 'Financial planning with a personal philosophy.',
    intro: 'Christopher Street Financial is a financial advisory firm with a distinct philosophy and a deeply personal approach to wealth management. They needed a brand identity and digital presence that reflected their values, differentiated them from traditional firms, and spoke authentically to their community.',
    hero: `${CDN}/2022/07/CSF_Branding-Identity_ConceptsFull-scaled.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'Christopher Street Financial needed to stand apart from conventional financial advisors. Their brand had to communicate trust, warmth, and expertise — while reflecting the personal values and unique community focus that define the firm.',
        solution: 'We developed a brand identity grounded in the firm\'s philosophy and community. The visual system — including logo, stationery, and website — used refined typography, a distinctive color palette, and approachable imagery to create a brand that felt both professional and personal.',
        resultTitle: 'A brand as distinctive as the people it serves',
        result: 'The new brand gave Christopher Street Financial a clear, distinctive identity that resonated deeply with their clients and community. The website established their story and values, while the stationery system elevated every client touchpoint.',
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2022/07/Christopher-St-Brand.jpg`,
          `${CDN}/2022/07/Christopher-St-Stationary.jpg`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2022/07/Christopher-St-Web-Home.jpg`,
          `${CDN}/2022/07/Christopher-St-Web-Products.jpg`,
        ],
      },
    ],
    thumb: `${CDN}/2022/08/Work-Thumb_CSF_2-724x1024-1-293x414.jpg`,
  },

  /* ─── MELISSA KAYE JEWELRY ───────────────────────────── */
  {
    slug: 'melissa-kaye-luxury-jewelry-email-design',
    client: 'Melissa Kaye Jewelry',
    category: 'Email Marketing',
    tags: ['Email Marketing', 'Luxury', 'Jewelry', 'Lifestyle'],
    tagline: 'Fine jewelry. Finer storytelling.',
    intro: 'Melissa Kaye is an award-winning fine jewelry designer known for her precise geometric forms and bold use of color. Her email program needed to reflect the artistry and exclusivity of her collections — building relationships with collectors and driving sales for key launches.',
    hero: `${CDN}/2018/09/HI_Web_MelissaKaye_header.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'Melissa Kaye\'s email program needed to feel as refined and intentional as the jewelry itself. Generic email templates were undermining the brand\'s premium positioning and failing to communicate the artistry and exclusivity that collectors expect.',
        solution: 'We created a bespoke email design system that led with dramatic product photography, clean typography, and editorial layouts. Each campaign was crafted to tell the story behind a collection — creating emotional connections that drove engagement and purchases.',
        resultTitle: 'Emails as crafted as the jewelry',
        result: 'The email program became a powerful sales driver for new collection launches. Collectors responded to the editorial approach, and the refined visual system reinforced Melissa Kaye\'s position as one of the most distinctive voices in contemporary fine jewelry.',
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/09/HI_Web_MelissaKaye_lifestyle2.jpg`,
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/10/HI_Web_MelissaKaye_email1-1.jpg`,
          `${CDN}/2018/09/HI_Web_MelissaKaye_email2.jpg`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/09/HI_Web_MelissaKaye_headerANIMATED.gif`,
          `${CDN}/2018/09/HI_Web_MelissaKaye_2-up-left.jpg`,
        ],
      },
      {
        type: 'desktop-frames',
        images: [
          `${CDN}/2018/09/HI_Web_MelissaKaye_2-up-right.jpg`,
          `${CDN}/2018/10/HI_Web_MelissaKaye_3-up.jpg`,
          `${CDN}/2018/10/HI_Web_MelissaKaye_4-up-left.jpg`,
        ],
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/09/HI_Web_MelissaKaye_lifestyle5.jpg`,
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_melissa-293x414.jpg`,
  },

  /* ─── HUBSPOT INBOUND ────────────────────────────────── */
  {
    slug: 'hubspot-conference-brand-identity',
    client: 'Hubspot Inbound',
    category: 'Brand Identity',
    tags: ['Branding', 'Technology', 'Events'],
    tagline: 'A conference brand built for a movement.',
    intro: 'HubSpot\'s INBOUND conference is one of the world\'s largest marketing and sales events, attracting tens of thousands of attendees. Hagopian Ink developed the conference brand identity and all associated materials — creating a cohesive, high-energy experience from the first invitation to the final session.',
    hero: `${CDN}/2018/09/HI_Web_Hubspot_event4.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'INBOUND needed a brand identity that could unify a massive, multi-day conference across every touchpoint — from digital promotions and email campaigns to on-site signage, badges, programs, and event collateral. The brand had to feel energetic, inclusive, and unmistakably HubSpot.',
        solution: 'We developed a bold conference brand system built on a vibrant color palette, dynamic typography, and a flexible graphic language that scaled from a business card to a stage backdrop. All conference materials were designed and produced with the same level of craft.',
        resultTitle: 'Thousands of attendees. One unforgettable brand.',
        result: 'The conference brand created a unified, memorable experience for tens of thousands of attendees. The visual system extended seamlessly from digital to physical — creating brand consistency at every touchpoint and reinforcing HubSpot\'s position as the leader in inbound marketing.',
      },
      {
        type: 'full-image',
        src: `${CDN}/2018/09/hubspot_colors.png`,
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2018/09/HI_Web_Hubspot_event1.jpg`,
          `${CDN}/2018/09/HI_Web_Hubspot_event3.jpg`,
          `${CDN}/2018/09/HI_Web_Hubspot_event2.jpg`,
        ],
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2018/09/HI_Web_Hubspot_program1.jpg`,
          `${CDN}/2018/09/HI_Web_Hubspot_program2.jpg`,
          `${CDN}/2018/09/HI_Web_Hubspot_program3.jpg`,
          `${CDN}/2018/09/HI_Web_Hubspot_program4.jpg`,
          `${CDN}/2018/09/HI_Web_Hubspot_program5.jpg`,
          `${CDN}/2018/09/hubspot_conference_lanyard.jpg`,
        ],
      },
    ],
    thumb: `${CDN}/2018/09/Work-Thumb_hubspot2-293x414.jpg`,
  },

  /* ─── BEWELL ─────────────────────────────────────────── */
  {
    slug: 'bewell',
    client: 'BeWELL',
    category: 'Brand Identity',
    tags: ['Branding', 'Healthcare', 'Wellness'],
    tagline: 'A wellness brand rooted in possibility.',
    intro: 'BeWELL is a health and wellness platform built around the belief that well-being is accessible to everyone. They needed a brand identity that communicated optimism, science, and community — a mark and visual system that could grow with a bold vision for the future of wellness.',
    hero: `${CDN}/2022/07/HI-Web_BeWELL_Header.jpg`,
    sections: [
      {
        type: 'columns-three',
        challenge: 'BeWELL needed a brand identity that felt simultaneously clinical and warm — credible enough to earn trust in the health space, but approachable enough to feel like a wellness partner rather than a medical institution. The visual system needed to work across digital, print, and physical touchpoints.',
        solution: 'We developed a brand identity system centered on a distinctive wordmark and a flexible visual language built from organic forms and a purposeful color palette. The stationery, business cards, and brand patterns were designed to project both credibility and optimism.',
        resultTitle: 'A brand that inspires action',
        result: 'The BeWELL brand identity created an immediately recognizable presence in the wellness space. The visual system scaled beautifully across all applications, and the brand\'s optimistic, science-backed positioning resonated with both partners and consumers.',
      },
      {
        type: 'carousel',
        images: [
          `${CDN}/2022/07/HI-Web_BeWELL_Bcards.jpg`,
          `${CDN}/2022/07/HI-Web_BeWELL_Brand.jpg`,
          `${CDN}/2022/07/HI-Web_BeWELL_Stationary.jpg`,
          `${CDN}/2022/07/HI-Web_BeWELL_Patterns2.jpg`,
        ],
      },
    ],
    thumb: `${CDN}/2022/07/Work-Thumb_beWELL-724x1024-1-293x414.jpg`,
  },


  /* ─── VIANT MEDICAL ──────────────────────────────────── */
  {
    slug: 'viant-medical-brand-campaign',
    client: 'Viant Medical',
    category: 'Brand Campaign',
    tags: ['Branding', 'Email Marketing', 'Healthcare', 'Campaign'],
    tagline: '"In it for Life" — a campaign built to last.',
    intro: 'Viant, a global leader in medical device design and manufacturing, partnered with Hagopian Ink and Reinvent the World over six years to strengthen and unify their brand voice. Together, we developed the "I\'m in it for life" campaign — an impactful narrative that built credibility, increased industry awareness, and clearly defined Viant\'s unique value.',
    hero: `${BASE}case-studies/viant/hero.png`,
    heroContained: true,
    sections: [
      {
        type: 'columns-three',
        challenge: 'Viant needed a campaign that could cut through the noise in a crowded medical device manufacturing space and speak directly to their executive audience — OEM partners and procurement leaders who needed to trust Viant with the lives of patients.',
        solution: 'We brought the "I\'m in it for life" campaign to life across print trade media, targeted email marketing, and digital display ads. A storytelling-focused email series welcomed new contacts with a white paper download and introduced them to Viant\'s mission, while ongoing emails used custom visuals and concise messaging to deepen engagement.',
        resultTitle: 'A cohesive campaign that elevated Viant\'s visibility',
        result: 'The result was a cohesive, resonant campaign that elevated Viant\'s visibility and forged a lasting connection with its executive audience. The partnership spanned 6 years across 24 global locations, reaching 6,000 worldwide employees and reinforcing Viant\'s position as the most trusted name in medical device manufacturing.',
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/viant/emails.png`,
        maxWidth: 960,
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/viant/ads.png`,
        maxWidth: 960,
      },
    ],
    thumb: `${BASE}case-studies/viant/hero.png`,
  },

  /* ─── P.VOLVE ────────────────────────────────────────── */
  {
    slug: 'pvolve-email-marketing',
    client: 'P.Volve',
    category: 'Email Marketing',
    tags: ['Email Marketing', 'Fitness', 'Subscription', 'Health'],
    tagline: '1,030% list growth in six months.',
    intro: 'Fitness trainer and p.volve founder Stephen Pasterino created a line of fitness products and streaming workouts to reach a wider audience. P.volve was looking to grow their business and we partnered to perform all elements of email campaign development and execution for subscriber acquisition.',
    hero: `${BASE}case-studies/pvolve/hero.png`,
    heroContained: true,
    sections: [
      {
        type: 'columns-three',
        challenge: 'P.volve needed to rapidly build their subscriber list and establish an email marketing engine that could scale with their growing product line — spanning streaming workouts, signature fitness equipment, and a loyal community of dedicated members.',
        solution: 'We created a wide range of designs to accommodate announcements, events, news, testimonials, products and streaming services. We crafted a welcome series, app onboarding, winback series and upsell strategies. Mailchimp implementation enabled the P.volve team to take over design and development over time.',
        resultTitle: '1,030% increase in list growth within 6 months',
        result: 'The email program delivered a 1,030% increase in list growth within 6 months and achieved a 49.5% open rate high — a remarkable result in the competitive fitness subscription market. The scalable template system Hagopian Ink built allowed the internal team to maintain the program with confidence.',
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/pvolve/emails.png`,
        maxWidth: 900,
      },
    ],
    thumb: `${BASE}case-studies/pvolve/hero.png`,
  },

  /* ─── EPILEPSY FOUNDATION ────────────────────────────── */
  {
    slug: 'epilepsy-foundation-brand-campaign',
    client: 'Epilepsy Foundation',
    category: 'Brand Campaign',
    tags: ['Branding', 'Nonprofit', 'Campaign', 'Fundraising'],
    tagline: 'Let\'s use our brains to END EPILEPSY.',
    intro: 'The Epilepsy Foundation exists to increase awareness and change the conversation around epilepsy, improving and saving lives through care, advocacy, research and new therapies, and education. Hagopian Ink worked with the Foundation for 2.5 years to help them reinvent and unify their organization with a new national brand, visual identity, and awareness campaign.',
    hero: `${BASE}case-studies/epilepsy/hero.png`,
    heroContained: true,
    sections: [
      {
        type: 'columns-three',
        challenge: 'The Epilepsy Foundation needed to modernize a fragmented brand system across a massive national chapter and affiliate network, and launch a powerful awareness campaign during National Epilepsy Awareness Month to change public perception and drive donations.',
        solution: 'We launched "Let\'s Use Our Brains to END EPILEPSY" during National Epilepsy Awareness Month in 2018 and worked in depth with national chapter and affiliate networks to deliver creative assets and fundraising materials. Over the following 18 months, we rolled out an updated logo and new brand system to help bring their 5-year strategic plan to life.',
        resultTitle: '180% increase in online donations',
        result: 'The 2019 Holiday Appeal campaign delivered a 180% increase in online donations. The campaign ran on Times Square digital billboards, across national print and digital media, and through a powerful storytelling approach that gave faces and names to the epilepsy community — positioning the Epilepsy Foundation for a bold next chapter.',
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/epilepsy/case.png`,
        maxWidth: 820,
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/epilepsy/posters.png`,
        maxWidth: 960,
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/epilepsy/collateral.png`,
        maxWidth: 900,
      },
    ],
    thumb: `${BASE}case-studies/epilepsy/hero.png`,
  },

  /* ─── MALALA FUND ────────────────────────────────────── */
  {
    slug: 'malala-fund-email-design',
    client: 'Malala Fund',
    category: 'Email Design',
    tags: ['Email Marketing', 'Nonprofit', 'Education', 'Community'],
    tagline: 'Storytelling that stands up for girls\' education.',
    intro: 'After attending a screening of the movie He Named Me Malala featuring Nobel Peace Prize Laureate Malala Yousafzai, we were so moved that we vowed to help. With our experience in nonprofit email design, Hagopian Ink volunteered to create fluid responsive email templates for The Malala Fund to help spread their mission and raise funds.',
    hero: `${BASE}case-studies/malala/hero.png`,
    heroContained: true,
    sections: [
      {
        type: 'columns-three',
        challenge: 'The Malala Fund needed a flexible, scalable email template system that their internal team could easily update and send for frequent mailings — engaging supporters, increasing open and click rates, and driving donations for the global movement to stand #withMalala.',
        solution: 'We created a flexible template for Malala\'s internal team to easily update and send frequent mailings to engage and communicate with supporters. Our new Welcome email was designed to increase open and click rates and increase donations. Each subsequent email followed the template including a warm color palette, strong messaging and clear calls to action.',
        resultTitle: 'Pro bono work with global impact',
        result: 'As a woman-owned business, Hagopian Ink was honored to give their services to help the organization spread awareness for the education and freedom of all women. The email template system continues to be used to communicate with millions of Malala Fund supporters around the world.',
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/malala/case.png`,
        maxWidth: 760,
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/malala/desktop.png`,
        maxWidth: 880,
      },
    ],
    thumb: `${BASE}case-studies/malala/hero.png`,
  },

  /* ─── RECOVERYPLUS ───────────────────────────────────── */
  {
    slug: 'recoveryplus-health-brand',
    client: 'RecoveryPlus',
    category: 'Brand & UX Design',
    tags: ['Branding', 'Healthcare', 'Mobile App', 'Website/UX'],
    tagline: 'Recover your health. Reclaim your life.',
    intro: 'RecoveryPlus.health is a clinically proven remote cardiac rehab platform that provides easy and accessible home-based recovery for patients with chronic heart conditions. Hagopian Ink partnered with RecoveryPlus to shape their brand identity, design their mobile app experience, and build their marketing website — bringing a life-changing service to market.',
    hero: `${BASE}case-studies/recoveryplus/hero.png`,
    heroContained: true,
    sections: [
      {
        type: 'columns-three',
        challenge: 'RecoveryPlus needed to launch an entirely new brand in the medtech space — creating trust with both patients and healthcare providers while communicating the clinical rigor and accessibility of home-based cardiac rehabilitation. The brand had to feel warm, empowering, and medically credible at the same time.',
        solution: 'We developed a complete brand system for RecoveryPlus including logo, color system, and brand identity. We then translated the brand into a full mobile app UI/UX design and built out a patient-facing marketing website — all designed to guide patients from diagnosis through enrollment to active recovery.',
        resultTitle: 'A brand that makes cardiac rehab accessible',
        result: 'The RecoveryPlus brand launched with a compelling identity that positioned it as the human, accessible face of cardiac care. The mobile app design made the recovery journey intuitive and motivating, while the website clearly communicated the clinical benefits and drove patient and provider enrollment.',
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/recoveryplus/brand.png`,
        maxWidth: 860,
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/recoveryplus/app.png`,
        maxWidth: 960,
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/recoveryplus/app2.png`,
        maxWidth: 960,
      },
      {
        type: 'contained-image',
        src: `${BASE}case-studies/recoveryplus/web.png`,
        maxWidth: 960,
      },
    ],
    thumb: `${BASE}case-studies/recoveryplus/hero.png`,
  },

  /* ─── CANNADIPS ──────────────────────────────────────── */
  {
    slug: 'cannadips-email-marketing',
    client: 'Cannadips',
    category: 'Email Marketing',
    tags: ['Email Marketing', 'E-commerce', 'DTC', 'Health'],
    tagline: 'Automations that pay for themselves, year after year.',
    intro: 'Cannadips engaged Hagopian Ink to build an email marketing program from the ground up — one designed to generate consistent revenue between demand peaks without constant manual effort. The result was a smart automation strategy paired with on-brand creative that converted browsers into buyers and kept them coming back.',
    noHero: true,
    sections: [
      {
        type: 'columns-three',
        challenge: 'Cannadips needed an email marketing engine that could drive consistent online sales on its own — capturing new customers, nurturing existing ones, and generating recurring revenue without relying on one-time campaigns or heavy manual effort.',
        solution: 'We designed a comprehensive email automation program: welcome flows, post-purchase sequences, winback campaigns, and seasonal sends — all rooted in on-brand creative that felt authentic to the Cannadips voice. Every touchpoint was built to convert and retain.',
        resultTitle: '$56K in new sales from automations in 4 months',
        result: 'Within the first four months, the email automation program generated $56K in incremental new sales. The system continued to regenerate revenue year after year, delivering a 5–10% lift in online sales through high-frequency, on-brand consumer communications.',
      },
      {
        type: 'quote',
        quote: 'The email strategy and automations you created delivered a 5% to 10% lift in our online sales through on-brand communications that increase the frequency of our consumer touches. It has created an annuity, regenerating revenue year after year.',
        name: 'Jen Pike',
        title: 'Chief Revenue Officer, Cannadips / BoltRunners',
        photo: '/images/jen-headshot.png',
      },
    ],
    thumb: `${CDN}/2018/08/Work-Thumb_cannadips-293x414.jpg`,
  },

];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(cs => cs.slug === slug);
}
