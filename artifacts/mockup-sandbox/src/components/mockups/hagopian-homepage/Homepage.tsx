import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Mail, Phone, ExternalLink, Plus } from 'lucide-react';

/* ─── Constants ───────────────────────────────────────────── */

const CDN = 'https://hagopianink.wpenginepowered.com/wp-content/uploads';
const LOGO = `${CDN}/2018/08/cropped-logo-1.png`;
const VIDEO_MP4 = `${CDN}/2022/08/HI_InkBackground-contact.mp4`;
const VIDEO_POSTER = 'https://hagopianink.com/wp-content/uploads/2022/09/contact_still.png';
const FONT_BASE = `${CDN}/2018/08/../../../themes/skmframework/assets/public/fonts`;
// Using the actual font paths from the site
const DD_BOLD = `${CDN.replace('wp-content/uploads', 'wp-content/themes/skmframework/assets/public/fonts')}/paulo_goode_-_didonesque_bold-webfont`;
const DD_DISP = `${CDN.replace('wp-content/uploads', 'wp-content/themes/skmframework/assets/public/fonts')}/paulo_goode_-_didonesque_display-webfont`;
const DD_BLACK = `${CDN.replace('wp-content/uploads', 'wp-content/themes/skmframework/assets/public/fonts')}/paulo_goode_-_didonesque_black-webfont`;
const DD_BOLD_ITALIC = `${CDN.replace('wp-content/uploads', 'wp-content/themes/skmframework/assets/public/fonts')}/paulo_goode_-_didonesque_bold_italic-webfont`;

const FONT_BASE_URL = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/fonts';

const STYLES = `
@font-face {
  font-family: 'Didonesque';
  src: url('${FONT_BASE_URL}/paulo_goode_-_didonesque_bold-webfont.woff2') format('woff2'),
       url('${FONT_BASE_URL}/paulo_goode_-_didonesque_bold-webfont.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Didonesque';
  src: url('${FONT_BASE_URL}/paulo_goode_-_didonesque_display-webfont.woff2') format('woff2'),
       url('${FONT_BASE_URL}/paulo_goode_-_didonesque_display-webfont.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Didonesque';
  src: url('${FONT_BASE_URL}/paulo_goode_-_didonesque_bold_italic-webfont.woff2') format('woff2'),
       url('${FONT_BASE_URL}/paulo_goode_-_didonesque_bold_italic-webfont.woff') format('woff');
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Didonesque';
  src: url('${FONT_BASE_URL}/paulo_goode_-_didonesque_black-webfont.woff2') format('woff2'),
       url('${FONT_BASE_URL}/paulo_goode_-_didonesque_black-webfont.woff') format('woff');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}
@keyframes marquee  { 0% { transform:translateX(0) }   100% { transform:translateX(-50%) } }
@keyframes ticker   { 0% { transform:translateX(0) }   100% { transform:translateX(-50%) } }
* { box-sizing: border-box; }
`;

const SERIF = "'Didonesque', 'Times New Roman', serif";
const SANS  = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/* ─── Data ────────────────────────────────────────────────── */

const CLIENT_LOGOS = [
  { src:`${CDN}/2018/09/01_HI_logo_pepsi.png`,       alt:'Pepsi',        href:'https://hagopianink.com/works/pepsi-email-marketing/' },
  { src:`${CDN}/2018/09/02_HI_logo_lancome.png`,     alt:'Lancôme',      href:'https://hagopianink.com/works/lancome_house_of_color/' },
  { src:`${CDN}/2018/09/03_HI_logo_mercedes.png`,    alt:'Mercedes' },
  { src:`${CDN}/2018/09/04_HI_logo_esteelauder.png`, alt:'Estée Lauder' },
  { src:`${CDN}/2018/09/05_HI_logo_audible.png`,     alt:'Audible',      href:'https://hagopianink.com/works/audible-email-design/' },
  { src:`${CDN}/2018/09/06_HI_logo_burberry.png`,    alt:'Burberry' },
  { src:`${CDN}/2018/09/07_HI_logo_armani.png`,      alt:'Armani' },
  { src:`${CDN}/2018/09/08_HI_logo_disney.png`,      alt:'Disney' },
  { src:`${CDN}/2018/09/09_HI_logo_laperla.png`,     alt:'La Perla',     href:'https://hagopianink.com/works/la-perla-multichannel-campaign-design/' },
  { src:`${CDN}/2018/09/10_HI_logo_hubspot.png`,     alt:'HubSpot',      href:'https://hagopianink.com/works/hubspot-conference-brand-identity/' },
  { src:`${CDN}/2018/09/11_HI_logo_msg.png`,         alt:'MSG' },
  { src:`${CDN}/2018/09/12_HI_logo_fritolay.png`,    alt:'Frito-Lay',    href:'https://hagopianink.com/works/pepsi-email-marketing/' },
  { src:`${CDN}/2018/09/13_HI_logo_gwynniebee.png`,  alt:'Gwynnie Bee',  href:'https://hagopianink.com/works/gwynnie-bee-subscription-acquisition-email/' },
  { src:`${CDN}/2018/09/14_HI_logo_frette.png`,      alt:'Frette' },
  { src:`${CDN}/2018/09/15_HI_logo_cuddlduds.png`,   alt:'Cuddl Duds' },
  { src:`${CDN}/2018/09/16_HI_logo_astonmartin.png`, alt:'Aston Martin' },
  { src:`${CDN}/2018/09/17_HI_logo_brides.png`,      alt:'Brides' },
  { src:`${CDN}/2018/09/18_HI_logo_mtndew.png`,      alt:'Mountain Dew', href:'https://hagopianink.com/works/pepsi-email-marketing/' },
  { src:`${CDN}/2018/09/19_HI_logo_sesamest.png`,    alt:'Sesame Street', href:'https://hagopianink.com/works/sesame-street-mobile-email/' },
  { src:`${CDN}/2018/09/20_HI_logo_bbb.png`,         alt:'BBB' },
  { src:`${CDN}/2018/09/21_HI_logo_malala.png`,      alt:'Malala Fund' },
  { src:`${CDN}/2018/09/22_HI_logo_condenast.png`,   alt:'Condé Nast' },
  { src:`${CDN}/2018/09/23_HI_logo_tedx.png`,        alt:'TEDx' },
  { src:`${CDN}/2018/09/24_HI_logo_montefiore.png`,  alt:'Montefiore',   href:'https://hagopianink.com/works/montefiore-healthcare-design/' },
];

const STATS = [
  { n:'329%',   label:'more dollars raised',                    client:'Montefiore' },
  { n:'1,030%', label:'email list growth in 6 months',          client:'P.Volve' },
  { n:'300%',   label:'increase in signup conversion',          client:'Gwynnie Bee' },
  { n:'180%',   label:'increase in online donations',           client:'Epilepsy Foundation' },
  { n:'30%',    label:"increase in Valentine's Day sales",      client:'La Perla' },
  { n:'40%+',   label:'average email open rate',               client:'Multiple clients' },
  { n:'$54K',   label:'in new sales from one campaign',         client:'Frette' },
  { n:'20+',    label:'years evolving world-class brands',      client:'Since 2002' },
  { n:'$56K',   label:'new sales from email automations in 4 months', client:'Cannadips' },
  { n:'58%',    label:'increase in website unique visitors',    client:'Frette campaign' },
];

const CASE_STUDIES = [
  {
    id: 'cs-1',
    client: 'Joseph Robert',
    category: 'Brand Identity',
    title: 'Branding the modern man',
    desc: 'Developing a menswear line with timeless, distinctive style from the ground up',
    img: `${CDN}/2022/08/HI_case1_JosephRobert.jpg`,
    href: 'https://hagopianink.com/works/joseph-robert/',
    style: 'full',
  },
  {
    id: 'cs-2',
    client: 'Loum Beauty',
    category: 'UX/UI + E-Commerce',
    title: 'Luxury e-Commerce design',
    desc: 'Clarifying a brand story to decrease bounce rates and increase consumer connection',
    img: `${CDN}/2022/08/HI_home2_loum.jpg`,
    href: 'https://hagopianink.com/works/loumbeauty/',
    style: 'full',
  },
  {
    id: 'cs-3',
    client: 'Audible',
    category: 'Email Marketing',
    title: 'Reactivating email subscribers',
    desc: "Re-engaging an audience with waning interest to ensure an ongoing subscription",
    img: `${CDN}/2022/09/HI_case3_audible.jpg`,
    href: 'https://hagopianink.com/works/audible-email-design/',
    style: 'container',
  },
  {
    id: 'cs-4',
    client: 'BLMC',
    category: 'Nonprofit + Fundraising',
    title: 'Fundraising with purpose',
    desc: 'Email messages that inspire donations through education and activism',
    img: `${CDN}/2022/09/HI_Web_BLM_header-scaled2.jpg`,
    href: 'https://hagopianink.com/works/black-lives-matter-canada/',
    style: 'full',
  },
];

const SERVICES = [
  {
    name: 'Branding',
    color: '#a57b83',
    title: 'Your 1st impression\nis everything.',
    desc: 'Leave a lasting impact that communicates the essence of your brand. Rise above the competition with award-winning logo and brand development.',
    link: 'https://hagopianink.com/work/design-branding/',
    linkText: 'View brand development',
    img: `${CDN}/2018/08/Bitmap-1.png`,
  },
  {
    name: 'UX/UI Design',
    color: '#444456',
    title: 'Drive action with\nclear intention.',
    desc: "We place the consumer's needs first for beautiful, effortless online experiences. Your applications are covered from first click to checkout.",
    link: 'https://hagopianink.com/work/ux-design/',
    linkText: 'View UX/UI design',
    img: `${CDN}/2018/08/1111.png`,
  },
  {
    name: 'Email Marketing',
    color: '#a57b83',
    title: 'Harness the power of\nyour email sends.',
    desc: "Flawless aesthetics and messaging increase conversions and create brand loyalty. See why Fortune 50 companies trust us with their email programs year after year.",
    link: 'https://hagopianink.com/work/email/',
    linkText: 'View email marketing',
    img: `${CDN}/2018/09/pepsi-1537458269464-3078.png`,
  },
];

const EXPERTISE_AREAS = [
  { industry: 'Luxury + Lifestyle',           services: 'Brand identity, omnichannel campaigns, UX design' },
  { industry: 'Fashion + Beauty',             services: 'E-commerce design, email marketing, brand strategy' },
  { industry: 'Medical + Wellness',           services: 'Brand positioning, campaign design, print + digital' },
  { industry: 'Community + Nonprofit',        services: 'Donor engagement, fundraising strategy, brand identity' },
  { industry: 'Technology + Energy',          services: 'Brand evolution, digital marketing, web design' },
  { industry: 'Entertainment + Hospitality',  services: 'Campaign marketing, email strategy, brand identity' },
];

/* ─── Animation primitives ────────────────────────────────── */

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function FadeIn({ children, delay = 0, dir = 'up', className = '' }: {
  children: React.ReactNode; delay?: number; dir?: string; className?: string;
}) {
  const map: Record<string, object> = {
    up: { y: 48 }, down: { y: -48 }, left: { x: 48 }, right: { x: -48 }, none: {},
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...map[dir] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Sub-components ──────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-px bg-current opacity-40" />
      <span className="text-[10px] uppercase tracking-[0.22em] opacity-50 font-medium">{children}</span>
    </div>
  );
}

function Btn({ href, children, variant = 'solid' }: { href: string; children: React.ReactNode; variant?: 'solid'|'outline'; }) {
  const base = 'inline-flex items-center gap-2 px-9 py-4 text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-300';
  const v = variant === 'solid'
    ? 'bg-[#0a0a0a] text-[#f5f0eb] hover:bg-[#1a1a1a]'
    : 'border border-[#0a0a0a]/30 text-[#0a0a0a] hover:border-[#0a0a0a]';
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${v}`} style={{ fontFamily: SANS }}>
      {children}
    </a>
  );
}

function BtnLight({ href, children, variant = 'solid' }: { href: string; children: React.ReactNode; variant?: 'solid'|'outline'; }) {
  const base = 'inline-flex items-center gap-2 px-9 py-4 text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-300';
  const v = variant === 'solid'
    ? 'bg-[#f5f0eb] text-[#0a0a0a] hover:bg-white'
    : 'border border-[#f5f0eb]/35 text-[#f5f0eb] hover:border-[#f5f0eb]';
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${v}`} style={{ fontFamily: SANS }}>
      {children}
    </a>
  );
}

/* ─── Main Component ──────────────────────────────────────── */

export function Homepage() {
  const { scrollY } = useScroll();
  const heroScale   = useTransform(scrollY, [0, 700], [1.04, 1.12]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const [expandedFaq, setExpandedFaq] = useState<number|null>(null);

  return (
    <div className="w-full bg-[#0a0a0a] text-[#f5f0eb] overflow-x-hidden" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ═══════════════════════════════════════════════════════
          NAV
      ═══════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-5 flex justify-between items-center bg-[#0a0a0a]/85 backdrop-blur-md border-b border-white/[0.06]">
        <motion.a href="https://hagopianink.com" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <img src={LOGO} alt="Hagopian Ink" className="h-7 w-auto brightness-0 invert" />
        </motion.a>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="hidden md:flex gap-8 text-[10px] tracking-[0.18em] uppercase text-[#f5f0eb]/70">
          {[
            ['Expertise', 'https://hagopianink.com/expertise/'],
            ['Work',      'https://hagopianink.com/case-studies/'],
            ['About',     'https://hagopianink.com/wbe-branding-agency/'],
            ['Blog',      'https://hagopianink.com/blog/'],
            ['Contact',   'https://hagopianink.com/contact/'],
          ].map(([label, url]) => (
            <a key={label} href={url} className="hover:text-[#f5f0eb] transition-colors duration-250">{label}</a>
          ))}
        </motion.div>
        <motion.a href="https://hagopianink.com/contact/" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:block text-[10px] tracking-[0.18em] uppercase border border-[#f5f0eb]/30 px-5 py-2.5 hover:border-[#f5f0eb] hover:text-[#f5f0eb] transition-all duration-300 text-[#f5f0eb]/70">
          Get in Touch
        </motion.a>
      </nav>

      {/* ═══════════════════════════════════════════════════════
          HERO — VIDEO BG
      ═══════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-center items-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ scale: heroScale }}>
          <div className="absolute inset-0 bg-[#0a0a0a]/52 z-10" />
          <video autoPlay loop muted playsInline poster={VIDEO_POSTER}
            className="w-full h-full object-cover">
            <source src={VIDEO_MP4} type="video/mp4" />
          </video>
        </motion.div>

        <motion.div className="relative z-10 px-6 md:px-16 max-w-6xl mx-auto text-center mt-16" style={{ opacity: heroOpacity }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/55 mb-8">
            Evolving the world's leading brands since 2002
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.45, ease }}
            className="leading-[0.88] mb-10 tracking-[-0.01em]"
            style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(4.5rem, 11vw, 10rem)' }}
          >
            Make your mark.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.65 }}
            className="text-xl md:text-2xl font-light text-[#f5f0eb]/82 max-w-2xl mx-auto mb-12 leading-relaxed">
            Brand design and digital experiences that help innovative organizations grow.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85 }}
            className="flex flex-col sm:flex-row justify-center gap-4">
            <BtnLight href="https://hagopianink.com/case-studies/">
              See Our Work <ArrowRight className="w-4 h-4" />
            </BtnLight>
            <BtnLight href="https://hagopianink.com/expertise/" variant="outline">
              Explore Expertise
            </BtnLight>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 1L8 8L15 1" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS TICKER
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#111111] border-y border-[#222222] py-12 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />
        <div className="flex w-max" style={{ animation: 'ticker 60s linear infinite' }}>
          {[...STATS, ...STATS].map((s, i) => (
            <div key={i} className="flex shrink-0 items-center border-r border-[#2a2a2a] px-12 md:px-16">
              <span className="text-4xl md:text-5xl font-light mr-4" style={{ fontFamily: SERIF }}>{s.n}</span>
              <div>
                <div className="text-sm text-[#f5f0eb]/75">{s.label}</div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5f0eb]/35 mt-0.5">{s.client}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CLIENT LOGO TRAIN
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-16 border-b border-[#191919] overflow-hidden relative">
        <FadeIn className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/35">Trusted by world-class brands</p>
        </FadeIn>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="flex items-center w-max gap-10" style={{ animation: 'marquee 60s linear infinite' }}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center" style={{ width: 120, height: 52 }}>
                <img src={logo.src} alt={logo.alt}
                  className="max-w-full max-h-full object-contain brightness-0 invert opacity-35 hover:opacity-65 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICES BLOCKS (matches real site)
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#f1efef] text-[#0a0a0a] py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="text-center max-w-3xl mx-auto mb-20">
            <SectionLabel>Creative Communication</SectionLabel>
            <p className="text-lg md:text-xl text-[#0a0a0a]/75 leading-relaxed">
              As a trusted partner for brand identity, visual communication, web design, and digital experiences, we combine consumer insights with creativity for optimal results. Our emphasis is on producing thoughtful, conceptually driven work that comes from a clear understanding of our clients and their audience.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {SERVICES.map((svc, i) => (
              <FadeIn key={i} delay={i * 0.15} className="flex flex-col group">
                <div className="bg-white p-8 flex-grow flex flex-col shadow-[0_2px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.12)] transition-shadow duration-500">
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-4" style={{ color: svc.color }}>{svc.name}</p>
                  <h3 className="text-2xl md:text-3xl mb-5 leading-snug whitespace-pre-line" style={{ fontFamily: SERIF, fontWeight: 700 }}>{svc.title}</h3>
                  <p className="text-[#0a0a0a]/65 leading-relaxed mb-8 flex-grow text-[15px]">{svc.desc}</p>
                  <div className="aspect-[4/3] overflow-hidden mb-8 bg-[#f1efef]">
                    <img src={svc.img} alt={svc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <a href={svc.link} target="_blank" rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-[0.14em] flex items-center gap-2 text-[#0a0a0a]/55 hover:text-[#0a0a0a] transition-colors border-b border-[#0a0a0a]/20 pb-1 self-start">
                    {svc.linkText} <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CASE STUDIES
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a]">
        <FadeIn className="pt-24 pb-12 text-center px-6">
          <SectionLabel>Selected Work</SectionLabel>
          <h2 className="text-5xl md:text-7xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>Case Studies</h2>
        </FadeIn>

        <div>
          {CASE_STUDIES.map((cs, i) => (
            <FadeIn key={cs.id}>
              <div className={`relative group overflow-hidden ${i % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-[#0f0f0f]'} border-t border-[#1a1a1a]`}>
                {/* Full bleed image */}
                <div className="relative w-full overflow-hidden" style={{ height: cs.style === 'container' ? 480 : 640 }}>
                  <img src={cs.img} alt={cs.client}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.04] opacity-85 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                </div>
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#f5f0eb]/45">{String(i + 1).padStart(2, '0')}</span>
                      <span className="w-10 h-px bg-[#f5f0eb]/25" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#f5f0eb]/55">{cs.category}</span>
                    </div>
                    <h3 className="text-4xl md:text-6xl mb-3" style={{ fontFamily: SERIF, fontWeight: 700 }}>{cs.client}</h3>
                    <p className="text-xl md:text-2xl font-light text-[#f5f0eb]/75 mb-2" style={{ fontFamily: SERIF }}>{cs.title}</p>
                    <p className="text-[#f5f0eb]/55 max-w-lg text-[15px] leading-relaxed">{cs.desc}</p>
                  </div>
                  <a href={cs.href} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] border-b border-[#f5f0eb]/30 pb-1.5 text-[#f5f0eb]/70 hover:text-[#f5f0eb] hover:border-[#f5f0eb] transition-all duration-300 self-end md:self-auto">
                    View Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="py-16 text-center border-t border-[#1a1a1a]">
          <BtnLight href="https://hagopianink.com/case-studies/">
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </BtnLight>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════
          EXPERTISE PILLARS (new — drives conversion)
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#f1efef] text-[#0a0a0a] py-24 md:py-40 px-6 md:px-12 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-20">
            <SectionLabel>Our Disciplines</SectionLabel>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2 className="text-5xl md:text-7xl leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                We help them with...
              </h2>
              <p className="text-lg text-[#0a0a0a]/65 max-w-sm leading-relaxed">
                From naming and visual identity to email acquisition and omnichannel campaigns — across every medium.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#d8d5d1]">
            {[
              { icon:'◎', title:'Brand Identity + Positioning', desc:'Logo, mark development, brand standards and guidelines, naming strategy, and visual identity systems.', link:'https://hagopianink.com/work/design-branding/' },
              { icon:'◎', title:'Omnichannel Campaign Marketing', desc:'Integrated campaigns across email, print, digital, and social — strategically connected to your business goals.', link:'https://hagopianink.com/expertise/' },
              { icon:'◎', title:'Web Design + Development', desc:'UX/UI design for e-commerce and marketing sites — built to convert, easy to manage, and built to last.', link:'https://hagopianink.com/work/ux-design/' },
              { icon:'◎', title:'Email Marketing + Strategy', desc:'Welcome series, drip campaigns, win-back flows, segmentation, and acquisition programs that deliver results.', link:'https://hagopianink.com/work/email/' },
              { icon:'◎', title:'Donation + Fundraising Strategy', desc:'Email, direct mail, and event campaign design for nonprofits — connecting giving to impact.', link:'https://hagopianink.com/expertise/' },
              { icon:'◎', title:'Direct Mail + Print Media', desc:'From luxury look-books and annual reports to mailers that stop people in their tracks.', link:'https://hagopianink.com/expertise/' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}
                className="group border-r border-b border-[#d8d5d1] p-9 hover:bg-white transition-colors duration-300 cursor-pointer">
                <div className="text-[#0a0a0a]/20 text-lg mb-5 group-hover:text-[#a57b83] transition-colors duration-300">{item.icon}</div>
                <h3 className="text-xl mb-4 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>{item.title}</h3>
                <p className="text-[#0a0a0a]/60 text-[14px] leading-relaxed mb-6">{item.desc}</p>
                <a href={item.link} className="text-[10px] uppercase tracking-[0.14em] flex items-center gap-2 text-[#0a0a0a]/40 group-hover:text-[#0a0a0a] transition-colors">
                  Learn more <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BOUTIQUE DIFFERENTIATOR QUOTE
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-32 md:py-52 px-6 md:px-12 border-t border-[#191919]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-8 items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>Our Approach</SectionLabel>
              <h2 className="text-4xl md:text-6xl leading-[1.05] mb-10" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                The personal touch.<br />
                <span style={{ fontWeight: 700, fontStyle: 'italic', opacity: 0.55 }}>Big agency results.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-[#f5f0eb]/65 leading-relaxed mb-10">
                When you work with Hagopian Ink, you work directly with senior creative talent — not account managers or junior teams. Since 2002, we've brought boutique-level attention to every project while delivering the strategic rigor and creative execution you'd expect from a major agency.
              </p>
              <p className="text-lg text-[#f5f0eb]/65 leading-relaxed mb-12">
                Our clients stay with us for years — because results matter, and so does the relationship. We've maintained 5-year retainers with clients like Pepsi, built 6-year campaign partnerships with Viant Medical, and spent decades growing with the brands we believe in.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <BtnLight href="https://hagopianink.com/wbe-branding-agency/">
                About Us <ArrowRight className="w-4 h-4" />
              </BtnLight>
            </FadeIn>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <FadeIn delay={0.35}>
              <div className="border-l-2 border-[#f5f0eb]/15 pl-10 relative">
                <span className="absolute -top-12 -left-4 text-[9rem] leading-none text-[#f5f0eb]/06" style={{ fontFamily: SERIF }}>"</span>
                <blockquote className="text-3xl md:text-4xl leading-snug mb-8 relative" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                  Hagopian Ink is a boutique shop that provides the personal touch while executing big agency ideas.
                </blockquote>
                <cite className="not-italic">
                  <span className="block text-[#f5f0eb] text-sm font-semibold tracking-wide mb-1">Cecilia Pagkalinawan</span>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-[#f5f0eb]/45">VP E-commerce &amp; Direct Marketing<br />Frette Inc &amp; La Perla Fashions Inc.</span>
                </cite>
              </div>
            </FadeIn>

            {/* Second quote */}
            <FadeIn delay={0.5} className="mt-16 border-l-2 border-[#f5f0eb]/10 pl-10">
              <blockquote className="text-xl md:text-2xl leading-relaxed mb-6 italic text-[#f5f0eb]/80" style={{ fontFamily: SERIF }}>
                "The email strategy and automated flows you created delivered a lift in our online sales by 5–10%… email now makes up 5% of all sales. The investment was well worth it."
              </blockquote>
              <cite className="not-italic">
                <span className="block text-[10px] uppercase tracking-[0.14em] text-[#f5f0eb]/40">Client, Cannadips</span>
              </cite>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          INDUSTRIES WE SERVE
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#f1efef] text-[#0a0a0a] py-24 md:py-36 px-6 md:px-12 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel>Who We Work With</SectionLabel>
            <h2 className="text-5xl md:text-6xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>We work with clients in...</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#d8d5d1]">
            {EXPERTISE_AREAS.map((area, i) => (
              <FadeIn key={i} delay={i * 0.08}
                className="group border-r border-b border-[#d8d5d1] p-9 hover:bg-white transition-colors duration-300">
                <h3 className="text-xl mb-3 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>{area.industry}</h3>
                <p className="text-[#0a0a0a]/55 text-[13px] leading-relaxed">{area.services}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURED EXPERTISE: HEALTH + MEDTECH
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-28 md:py-44 px-6 md:px-12 border-t border-[#191919]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <SectionLabel>Specialty Practice</SectionLabel>
            <h2 className="text-4xl md:text-6xl mb-8 leading-[1.05]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Building bold brands<br />for the future of health.
            </h2>
            <p className="text-lg text-[#f5f0eb]/65 leading-relaxed mb-8">
              We translate complex science and medical innovation into compelling, trustworthy brands — from medical device manufacturers to digital health startups, cardiac rehab platforms to nonprofit health initiatives.
            </p>
            <p className="text-lg text-[#f5f0eb]/65 leading-relaxed mb-12">
              Our 6-year "In It for Life" campaign partnership with Viant Medical — a global leader in medical device design and manufacturing — brought their brand to life across print trade media, targeted email, and digital display, building lasting credibility with an executive audience across 24 global locations.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-12">
              {[
                { n:'6 yrs', label:'Viant Medical partnership' },
                { n:'24',    label:'global locations reached' },
                { n:'B2B',   label:'+ B2C health brands' },
              ].map((s, i) => (
                <div key={i} className="border-t border-[#f5f0eb]/15 pt-5">
                  <div className="text-3xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#f5f0eb]/40">{s.label}</div>
                </div>
              ))}
            </div>
            <BtnLight href="https://hagopianink.com/expertise/">
              Health + MedTech Work <ArrowRight className="w-4 h-4" />
            </BtnLight>
          </FadeIn>
          <FadeIn delay={0.2} dir="left" className="relative">
            <div className="aspect-[3/4] bg-[#141414] overflow-hidden">
              <img src={`${CDN}/2022/08/HI_case1_JosephRobert.jpg`} alt="Viant Medical campaign"
                className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-[#f5f0eb] text-[#0a0a0a] text-[9px] font-bold px-2.5 py-1.5 uppercase tracking-[0.2em] inline-block mb-4">Health + MedTech</div>
                <p className="text-xl italic text-[#f5f0eb]" style={{ fontFamily: SERIF }}>
                  "My speed to market can help speed her recovery. I'm in it for life."
                </p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#f5f0eb]/55 mt-3">— Viant Medical campaign</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURED EXPERTISE: NONPROFIT + FUNDRAISING
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#f1efef] text-[#0a0a0a] py-28 md:py-44 px-6 md:px-12 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn dir="right" className="order-2 lg:order-1 relative">
            <div className="aspect-[3/4] bg-[#e0ddd9] overflow-hidden">
              <img src={`${CDN}/2022/09/HI_Web_BLM_header-scaled2.jpg`} alt="Nonprofit fundraising work"
                className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="bg-[#0a0a0a] text-[#f5f0eb] text-[9px] font-bold px-2.5 py-1.5 uppercase tracking-[0.2em] inline-block mb-3">Nonprofit + Fundraising</div>
                <div className="text-4xl font-light text-[#f5f0eb]" style={{ fontFamily: SERIF }}>329%</div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-[#f5f0eb]/70">more dollars raised — Montefiore</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <SectionLabel>Specialty Practice</SectionLabel>
            <h2 className="text-4xl md:text-6xl mb-8 leading-[1.05]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Building bold brands<br />for a new era of impact.
            </h2>
            <p className="text-lg text-[#0a0a0a]/70 leading-relaxed mb-8">
              We help nonprofits build clear, consistent brands that inspire confidence — and then we build the digital fundraising engines to put them to work. From quarterly magazines and multi-template email programs to gala invitation systems and donor engagement campaigns.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {[
                { n:'329%', label:'more dollars raised, Montefiore' },
                { n:'180%', label:'increase in online donations, Epilepsy Foundation' },
                { n:'100+', label:'additional gala attendees' },
                { n:'$22.2M', label:'raised (Montefiore Annual Gala)' },
              ].map((s, i) => (
                <div key={i} className="border-t border-[#0a0a0a]/15 pt-5">
                  <div className="text-3xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/45 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
            <Btn href="https://hagopianink.com/expertise/">
              Nonprofit + Fundraising Work <ArrowRight className="w-4 h-4" />
            </Btn>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          RESULTS PROOF GRID
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-24 md:py-36 px-6 md:px-12 border-t border-[#191919]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16 text-center">
            <SectionLabel>Results That Speak</SectionLabel>
            <h2 className="text-5xl md:text-6xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>Creative campaigns that drive results.</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-[#1c1c1c]">
            {[
              { n:'1,030%', label:'email list growth in 6 months',         client:'P.Volve' },
              { n:'300%',   label:'increase in signup conversion',          client:'Gwynnie Bee' },
              { n:'40%+',   label:'average open rate high',                 client:'P.Volve — 49.5%' },
              { n:'$56K',   label:'new sales from email automations',       client:'Cannadips — 4 months' },
              { n:'12K',    label:'new email opt-ins',                      client:'Frette "Escape to Italy"' },
              { n:'58%',    label:'increase in website unique visitors',    client:'Frette campaign' },
              { n:'329%',   label:'more dollars raised',                    client:'Montefiore' },
              { n:'180%',   label:'increase in online donations',           client:'Epilepsy Foundation' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}
                className="border-r border-b border-[#1c1c1c] p-8 text-center hover:bg-[#111111] transition-colors duration-300">
                <div className="text-4xl md:text-5xl mb-2 font-light" style={{ fontFamily: SERIF }}>{s.n}</div>
                <div className="text-[13px] text-[#f5f0eb]/65 mb-2 leading-snug">{s.label}</div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-[#f5f0eb]/30">{s.client}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROCESS / HOW WE START
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#f1efef] text-[#0a0a0a] py-24 md:py-36 px-6 md:px-12 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel>How We Begin</SectionLabel>
            <h2 className="text-5xl md:text-6xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              How can we begin your<br />new brand development?
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { num:'01', title:'Brand Strategy + Naming',         desc:'Defining your positioning, voice, and what makes you distinct in your market.' },
              { num:'02', title:'Logo + Mark Development',         desc:'Crafting a visual identity that is distinctive, memorable, and enduring.' },
              { num:'03', title:'Brand Standards + Guidelines',    desc:'The rulebook that keeps your brand consistent across every touchpoint.' },
              { num:'04', title:'Documents + Imagery',             desc:'Collateral, photography direction, and materials that bring the brand to life.' },
              { num:'05', title:'Launch + Ongoing Expansions',     desc:'Campaigns, digital rollout, and growth strategies to sustain momentum.' },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}
                className="border-t-2 border-[#0a0a0a]/15 pt-8 hover:border-[#a57b83] transition-colors duration-300 group">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/35 mb-4 font-medium">{step.num}</div>
                <h3 className="text-lg mb-3 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>{step.title}</h3>
                <p className="text-[#0a0a0a]/55 text-[13px] leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACT / CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-32 md:py-52 px-6 md:px-12 border-t border-[#191919] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(245,240,235,0.04) 0%, transparent 70%)' }} />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel>Start a Conversation</SectionLabel>
              <h2 className="text-5xl md:text-7xl mb-8 leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                Good design is good business.
              </h2>
              <p className="text-2xl font-light text-[#f5f0eb]/55 mb-6" style={{ fontFamily: SERIF }}>Let's create together.</p>
              <p className="text-lg text-[#f5f0eb]/55 leading-relaxed mb-12 max-w-lg">
                Whether you're building a new brand from the ground up or evolving an established one, we'd love to hear about your project.
              </p>
              <div className="flex flex-col gap-4 mb-12">
                <a href="mailto:info@HagopianInk.com" className="flex items-center gap-3 text-[13px] text-[#f5f0eb]/65 hover:text-[#f5f0eb] transition-colors">
                  <Mail className="w-4 h-4 opacity-50" /> info@HagopianInk.com
                </a>
                <a href="tel:2123271445" className="flex items-center gap-3 text-[13px] text-[#f5f0eb]/65 hover:text-[#f5f0eb] transition-colors">
                  <Phone className="w-4 h-4 opacity-50" /> 212-327-1445
                </a>
              </div>
              <BtnLight href="https://hagopianink.com/contact/">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </BtnLight>
            </FadeIn>

            {/* Contact form mockup */}
            <FadeIn delay={0.25} className="bg-[#111111] border border-[#1e1e1e] p-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#f5f0eb]/40 mb-8">Send us a message</p>
              <div className="space-y-5">
                {[
                  { label:'Your Name', placeholder:'Jane Smith', type:'text' },
                  { label:'Email Address', placeholder:'jane@company.com', type:'email' },
                  { label:'Company / Organization', placeholder:'Company name', type:'text' },
                  { label:'How can we help?', placeholder:'Tell us about your project...', type:'textarea' },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-[10px] uppercase tracking-[0.16em] text-[#f5f0eb]/45 mb-2">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea rows={4}
                        className="w-full bg-[#0a0a0a] border border-[#252525] text-[#f5f0eb] placeholder-[#f5f0eb]/25 text-sm px-4 py-3 focus:outline-none focus:border-[#f5f0eb]/40 resize-none"
                        placeholder={field.placeholder} style={{ fontFamily: SANS }} />
                    ) : (
                      <input type={field.type}
                        className="w-full bg-[#0a0a0a] border border-[#252525] text-[#f5f0eb] placeholder-[#f5f0eb]/25 text-sm px-4 py-3 focus:outline-none focus:border-[#f5f0eb]/40"
                        placeholder={field.placeholder} style={{ fontFamily: SANS }} />
                    )}
                  </div>
                ))}
                <button className="w-full py-4 bg-[#f5f0eb] text-[#0a0a0a] text-[11px] uppercase tracking-[0.16em] font-semibold hover:bg-white transition-colors duration-300 mt-4"
                  style={{ fontFamily: SANS }}>
                  Send Message
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer className="bg-[#0a0a0a] border-t border-[#191919] px-6 md:px-12 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <img src={LOGO} alt="Hagopian Ink" className="h-7 w-auto brightness-0 invert opacity-80 mb-6" />
              <p className="text-[13px] text-[#f5f0eb]/45 leading-relaxed mb-6">
                Boutique brand design and digital experiences. New York, NY.
              </p>
              <div className="flex gap-4">
                {['IG', 'LI', 'FB'].map(s => (
                  <a key={s} href="#"
                    className="text-[10px] uppercase tracking-[0.14em] text-[#f5f0eb]/35 hover:text-[#f5f0eb]/70 transition-colors border border-[#252525] w-8 h-8 flex items-center justify-center">
                    {s}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5f0eb]/35 mb-5">Services</p>
              <div className="space-y-3">
                {['Brand Identity','UX/UI Design','Email Marketing','Nonprofit Campaigns','Health + MedTech'].map(s => (
                  <a key={s} href="https://hagopianink.com/expertise/"
                    className="block text-[13px] text-[#f5f0eb]/50 hover:text-[#f5f0eb] transition-colors">{s}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5f0eb]/35 mb-5">Company</p>
              <div className="space-y-3">
                {[['About','https://hagopianink.com/wbe-branding-agency/'],['Work','https://hagopianink.com/case-studies/'],['Blog','https://hagopianink.com/blog/'],['Contact','https://hagopianink.com/contact/']].map(([label, href]) => (
                  <a key={label} href={href}
                    className="block text-[13px] text-[#f5f0eb]/50 hover:text-[#f5f0eb] transition-colors">{label}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5f0eb]/35 mb-5">Contact</p>
              <div className="space-y-3 text-[13px] text-[#f5f0eb]/50">
                <p>info@HagopianInk.com</p>
                <p>212-327-1445</p>
                <p>New York, NY</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#191919] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.14em] text-[#f5f0eb]/25">
            <p>© 2025 Hagopian Ink. All rights reserved.</p>
            <p>Woman-Owned Business · Since 2002</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
