export const CDN = 'https://hagopianink.wpenginepowered.com/wp-content/uploads';
export const LOGO = `${CDN}/2018/08/cropped-logo-1.png`;
const _BASE = import.meta.env.BASE_URL; // e.g. "/hagopian-site/"
export const VIDEO_MP4        = `${CDN}/2022/08/HI_InkBackground-contact.mp4`;
export const VIDEO_ABOUT      = `${_BASE}videos/about.mp4`;
export const VIDEO_CONTACT    = `${_BASE}videos/contact.mp4`;
export const VIDEO_EXPERTISE  = `${_BASE}videos/expertise.mp4`;
export const VIDEO_WORK       = `${_BASE}videos/work.mp4`;
export const VIDEO_BLOG       = `${_BASE}videos/blog.mp4`;
export const VIDEO_POSTER      = 'https://hagopianink.com/wp-content/uploads/2022/09/contact_still.png';
export const VIDEO_BLOG_POSTER = 'https://hagopianink.com/wp-content/uploads/2022/08/HI_InkBackground-1_LoopB-mp4.jpeg';
export const FONT_BASE_URL = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/fonts';

export const BRAND_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
@font-face {
  font-family: 'Sackers Gothic Std';
  src: url('${FONT_BASE_URL}/SackersGothicStd-Medium.otf') format('opentype');
  font-weight: 500; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Didonesque';
  src: url('${FONT_BASE_URL}/paulo_goode_-_didonesque_bold-webfont.woff2') format('woff2'),
       url('${FONT_BASE_URL}/paulo_goode_-_didonesque_bold-webfont.woff') format('woff');
  font-weight: 700; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Didonesque';
  src: url('${FONT_BASE_URL}/paulo_goode_-_didonesque_display-webfont.woff2') format('woff2'),
       url('${FONT_BASE_URL}/paulo_goode_-_didonesque_display-webfont.woff') format('woff');
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Didonesque';
  src: url('${FONT_BASE_URL}/paulo_goode_-_didonesque_bold_italic-webfont.woff2') format('woff2'),
       url('${FONT_BASE_URL}/paulo_goode_-_didonesque_bold_italic-webfont.woff') format('woff');
  font-weight: 700; font-style: italic; font-display: swap;
}
@font-face {
  font-family: 'Didonesque';
  src: url('${FONT_BASE_URL}/paulo_goode_-_didonesque_black-webfont.woff2') format('woff2'),
       url('${FONT_BASE_URL}/paulo_goode_-_didonesque_black-webfont.woff') format('woff');
  font-weight: 900; font-style: normal; font-display: swap;
}
@keyframes marquee { 0% { transform:translateX(0) } 100% { transform:translateX(-50%) } }
* { box-sizing: border-box; }
`;

export const SERIF   = "'Didonesque', 'Times New Roman', serif";
export const SANS    = "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif";
export const NAV_FONT = "'Sackers Gothic Std', 'Helvetica Neue', Helvetica, Arial, sans-serif";

export const CLIENT_LOGOS = [
  { src:`${CDN}/2018/09/01_HI_logo_pepsi.png`,        alt:'Pepsi' },
  { src:`${CDN}/2018/09/02_HI_logo_lancome.png`,      alt:'Lancôme' },
  { src:`${CDN}/2018/09/03_HI_logo_mercedes.png`,     alt:'Mercedes' },
  { src:`${CDN}/2018/09/04_HI_logo_esteelauder.png`,  alt:'Estée Lauder' },
  { src:`${CDN}/2018/09/05_HI_logo_audible.png`,      alt:'Audible' },
  { src:`${CDN}/2018/09/06_HI_logo_burberry.png`,     alt:'Burberry' },
  { src:`${CDN}/2018/09/07_HI_logo_armani.png`,       alt:'Armani' },
  { src:`${CDN}/2018/09/08_HI_logo_disney.png`,       alt:'Disney' },
  { src:`${CDN}/2018/09/09_HI_logo_laperla.png`,      alt:'La Perla' },
  { src:`${CDN}/2018/09/10_HI_logo_hubspot.png`,      alt:'HubSpot' },
  { src:`${CDN}/2018/09/11_HI_logo_msg.png`,          alt:'MSG' },
  { src:`${CDN}/2018/09/12_HI_logo_fritolay.png`,     alt:'Frito-Lay' },
  { src:`${CDN}/2018/09/13_HI_logo_gwynniebee.png`,   alt:'Gwynnie Bee' },
  { src:`${CDN}/2018/09/14_HI_logo_frette.png`,       alt:'Frette' },
  { src:`${CDN}/2018/09/15_HI_logo_cuddlduds.png`,    alt:'Cuddl Duds' },
  { src:`${CDN}/2018/09/16_HI_logo_astonmartin.png`,  alt:'Aston Martin' },
  { src:`${CDN}/2018/09/17_HI_logo_brides.png`,       alt:'Brides' },
  { src:`${CDN}/2018/09/18_HI_logo_mtndew.png`,       alt:'Mountain Dew' },
  { src:`${CDN}/2018/09/19_HI_logo_sesamest.png`,     alt:'Sesame Street' },
  { src:`${CDN}/2018/09/20_HI_logo_bbb.png`,          alt:'Better Business Bureau' },
  { src:`${CDN}/2018/09/21_HI_logo_malala.png`,       alt:'Malala Fund' },
  { src:`${CDN}/2018/09/22_HI_logo_condenast.png`,    alt:'Condé Nast' },
  { src:`${CDN}/2018/09/23_HI_logo_tedx.png`,         alt:'TEDx' },
  { src:`${CDN}/2018/09/24_HI_logo_montefiore.png`,   alt:'Montefiore' },
];

export const CASE_STUDIES = [
  {
    id: 'cs-1',
    client: 'Joseph Robert',
    category: 'Brand Identity',
    title: 'Branding the modern man',
    desc: 'Developing a menswear line with timeless, distinctive style from the ground up',
    img: `${CDN}/2022/08/HI_case1_JosephRobert.jpg`,
    href: 'https://hagopianink.com/works/joseph-robert/',
  },
  {
    id: 'cs-2',
    client: 'Loum Beauty',
    category: 'Website Design',
    title: 'Luxury e-Commerce design',
    desc: 'Clarifying a brand story to decrease bounce rates and increase consumer connection',
    img: `${CDN}/2022/08/HI_home2_loum.jpg`,
    href: 'https://hagopianink.com/works/loumbeauty/',
  },
  {
    id: 'cs-3',
    client: 'Audible',
    category: 'Email Marketing',
    title: 'Reactivating email subscribers',
    desc: 'Re-engaging an audience with waning interest to ensure an ongoing subscription',
    img: `${CDN}/2022/09/HI_case3_audible.jpg`,
    href: 'https://hagopianink.com/works/audible-email-design/',
  },
  {
    id: 'cs-4',
    client: 'BLMC',
    category: 'Nonprofit + Fundraising',
    title: 'Fundraising with purpose',
    desc: 'Email messages that inspire donations through education and activism',
    img: `${CDN}/2022/09/HI_Web_BLM_header-scaled2.jpg`,
    href: 'https://hagopianink.com/works/black-lives-matter-canada/',
  },
];

export const SERVICES = [
  {
    name: 'Branding',
    color: '#6b5c4e',
    title: 'Your 1st impression\nis everything.',
    desc: 'Leave a lasting impact that communicates the essence of your brand. Rise above the competition with award-winning logo and brand development.',
    link: 'https://hagopianink.com/work/design-branding/',
    linkText: 'View brand development',
    img: `${CDN}/2018/08/Bitmap-1.png`,
    icon: `${CDN}/2018/08/10-layers.png`,
    iconFilter: 'brightness(0) saturate(100%) invert(24%) sepia(12%) saturate(500%) hue-rotate(212deg) brightness(85%)',
  },
  {
    name: 'Website Design',
    color: '#444456',
    title: 'Drive action with\nclear intention.',
    desc: "We place the consumer's needs first for beautiful, effortless online experiences. Your applications are covered from first click to checkout.",
    link: 'https://hagopianink.com/work/ux-design/',
    linkText: 'View website design',
    img: `${CDN}/2018/08/1111.png`,
    icon: `${CDN}/2022/08/ux_icon_drop2.png`,
    iconFilter: '',
  },
  {
    name: 'Email Marketing',
    color: '#4e5c5e',
    title: 'Harness the power of\nyour email sends.',
    desc: "Flawless aesthetics and messaging increase conversions and create brand loyalty. See why Fortune 50 companies trust us with their email programs year after year.",
    link: 'https://hagopianink.com/work/email/',
    linkText: 'View email marketing',
    img: `${CDN}/2018/09/pepsi-1537458269464-3078.png`,
    icon: `${CDN}/2018/08/3-layers.png`,
    iconFilter: 'brightness(0) saturate(100%) invert(24%) sepia(12%) saturate(500%) hue-rotate(212deg) brightness(85%)',
  },
];
