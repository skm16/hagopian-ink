import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight, Mail, Phone } from 'lucide-react';

const COLORS = {
  black: '#0a0a0a',
  white: '#ffffff',
  cream: '#f5f0eb',
  charcoal: '#2a2a2a',
  mid: '#1a1a1a',
};

const DIDONESQUE_BASE = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/fonts';

const FONT_FACES = `
@font-face {
  font-family: 'didonesquebold';
  src: url('${DIDONESQUE_BASE}/paulo_goode_-_didonesque_bold-webfont.woff2') format('woff2'),
       url('${DIDONESQUE_BASE}/paulo_goode_-_didonesque_bold-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'didonesquedisplay';
  src: url('${DIDONESQUE_BASE}/paulo_goode_-_didonesque_display-webfont.woff2') format('woff2'),
       url('${DIDONESQUE_BASE}/paulo_goode_-_didonesque_display-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'didonesqueblack';
  src: url('${DIDONESQUE_BASE}/paulo_goode_-_didonesque_black-webfont.woff2') format('woff2'),
       url('${DIDONESQUE_BASE}/paulo_goode_-_didonesque_black-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'didonesquebold_italic';
  src: url('${DIDONESQUE_BASE}/paulo_goode_-_didonesque_bold_italic-webfont.woff2') format('woff2'),
       url('${DIDONESQUE_BASE}/paulo_goode_-_didonesque_bold_italic-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes scroll-stats {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

const LOGO_URL = 'https://hagopianink.wpenginepowered.com/wp-content/uploads/2018/08/cropped-logo-1.png';
const VIDEO_URL = 'https://hagopianink.wpenginepowered.com/wp-content/uploads/2022/08/HI_InkBackground-contact.mp4';
const VIDEO_POSTER = 'https://hagopianink.com/wp-content/uploads/2022/09/contact_still.png';
const CDN = 'https://hagopianink.wpenginepowered.com/wp-content/uploads';

const CLIENT_LOGOS = [
  { src: `${CDN}/2018/09/01_HI_logo_pepsi.png`, alt: 'Pepsi' },
  { src: `${CDN}/2018/09/02_HI_logo_lancome.png`, alt: 'Lancôme' },
  { src: `${CDN}/2018/09/03_HI_logo_mercedes.png`, alt: 'Mercedes' },
  { src: `${CDN}/2018/09/04_HI_logo_esteelauder.png`, alt: 'Estée Lauder' },
  { src: `${CDN}/2018/09/05_HI_logo_audible.png`, alt: 'Audible' },
  { src: `${CDN}/2018/09/06_HI_logo_burberry.png`, alt: 'Burberry' },
  { src: `${CDN}/2018/09/07_HI_logo_armani.png`, alt: 'Armani' },
  { src: `${CDN}/2018/09/08_HI_logo_disney.png`, alt: 'Disney' },
  { src: `${CDN}/2018/09/09_HI_logo_laperla.png`, alt: 'La Perla' },
  { src: `${CDN}/2018/09/10_HI_logo_hubspot.png`, alt: 'HubSpot' },
  { src: `${CDN}/2018/09/11_HI_logo_msg.png`, alt: 'MSG' },
  { src: `${CDN}/2018/09/12_HI_logo_fritolay.png`, alt: 'Frito-Lay' },
  { src: `${CDN}/2018/09/13_HI_logo_gwynniebee.png`, alt: 'Gwynnie Bee' },
  { src: `${CDN}/2018/09/14_HI_logo_frette.png`, alt: 'Frette' },
  { src: `${CDN}/2018/09/15_HI_logo_cuddlduds.png`, alt: 'Cuddl Duds' },
  { src: `${CDN}/2018/09/16_HI_logo_astonmartin.png`, alt: 'Aston Martin' },
  { src: `${CDN}/2018/09/17_HI_logo_brides.png`, alt: 'Brides' },
  { src: `${CDN}/2018/09/18_HI_logo_mtndew.png`, alt: 'Mountain Dew' },
  { src: `${CDN}/2018/09/19_HI_logo_sesamest.png`, alt: 'Sesame Street' },
  { src: `${CDN}/2018/09/20_HI_logo_bbb.png`, alt: 'BBB' },
  { src: `${CDN}/2018/09/21_HI_logo_malala.png`, alt: 'Malala Fund' },
  { src: `${CDN}/2018/09/22_HI_logo_condenast.png`, alt: 'Condé Nast' },
  { src: `${CDN}/2018/09/23_HI_logo_tedx.png`, alt: 'TEDx' },
  { src: `${CDN}/2018/09/24_HI_logo_montefiore.png`, alt: 'Montefiore' },
];

const CASE_STUDIES = [
  {
    cat: 'BRAND STRATEGY + IDENTITY',
    client: 'Joseph Robert',
    desc: 'Built a bold new menswear brand identity from the ground up — sophisticated, contemporary, and market-ready.',
    result: 'Complete brand identity system',
    img: `${CDN}/2022/08/HI_case1_JosephRobert.jpg`,
    href: 'https://hagopianink.com/works/joseph-robert/',
  },
  {
    cat: 'BEAUTY + LIFESTYLE',
    client: 'Loum Beauty',
    desc: 'Developed a distinctive visual identity and digital presence for a modern beauty brand rooted in elegance.',
    result: 'Brand identity + digital launch',
    img: `${CDN}/2022/08/HI_home2_loum.jpg`,
    href: 'https://hagopianink.com/works/loumbeauty/',
  },
  {
    cat: 'EMAIL MARKETING',
    client: 'Audible',
    desc: 'Designed a re-engagement email series to reduce cancellations among new subscribers who weren\'t yet listening.',
    result: 'Decreased cancellation rate',
    img: `${CDN}/2022/09/HI_case3_audible.jpg`,
    href: 'https://hagopianink.com/works/audible-email-design/',
  },
];

const STATS = [
  { metric: '329%', desc: 'more dollars raised', client: 'Montefiore Hospital' },
  { metric: '1,030%', desc: 'email list growth in 6 months', client: 'P.Volve' },
  { metric: '300%', desc: 'increase in signup conversion', client: 'Gwynnie Bee' },
  { metric: '180%', desc: 'increase in online donations', client: 'Epilepsy Foundation' },
  { metric: '30%', desc: 'increase in Valentine\'s Day sales', client: 'La Perla' },
  { metric: '40%+', desc: 'average email open rate', client: 'Multiple clients' },
  { metric: '$54K', desc: 'in new sales from one campaign', client: 'Frette' },
  { metric: '20+', desc: 'years evolving world-class brands', client: 'Since 2002' },
];

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }: any) => {
  const dir: any = {
    up: { y: 40, x: 0 }, down: { y: -40, x: 0 },
    left: { x: 40, y: 0 }, right: { x: -40, y: 0 }, none: { x: 0, y: 0 }
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...dir[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.85, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export function Homepage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="w-full bg-[#0a0a0a] text-[#f5f0eb] overflow-x-hidden"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: FONT_FACES }} />

      {/* ── Navigation ─────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-white/5">
        <motion.a
          href="https://hagopianink.com"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={LOGO_URL}
            alt="Hagopian Ink"
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </motion.a>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex gap-8 text-[11px] tracking-[0.18em] uppercase font-medium text-[#f5f0eb]/80"
        >
          {['Expertise', 'Work', 'About', 'Blog', 'Contact'].map(item => (
            <a key={item} href="#" className="hover:text-[#f5f0eb] transition-colors duration-300">{item}</a>
          ))}
        </motion.div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-center items-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <div className="absolute inset-0 bg-[#0a0a0a]/55 z-10" />
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={VIDEO_POSTER}
            className="w-full h-full object-cover scale-[1.04]"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </motion.div>

        <motion.div
          className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto text-center mt-16"
          style={{ opacity: heroOpacity }}
        >
          <FadeIn delay={0.15}>
            <h1
              className="text-[clamp(4rem,10vw,9rem)] leading-[0.88] mb-8 tracking-[-0.01em]"
              style={{ fontFamily: 'didonesquebold, didonesquedisplay, serif' }}
            >
              Make your mark.
            </h1>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className="text-xl md:text-2xl font-light text-[#f5f0eb]/85 max-w-2xl mx-auto mb-5 leading-relaxed">
              Brand design and digital experiences that help innovative organizations grow.
            </p>
            <p className="text-[11px] tracking-[0.16em] uppercase text-[#f5f0eb]/50 mb-12">
              Since 2002 &nbsp;·&nbsp; Evolving the world's leading brands
            </p>
          </FadeIn>

          <FadeIn delay={0.5} className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="https://hagopianink.com/case-studies/"
              className="group px-9 py-4 bg-[#f5f0eb] text-[#0a0a0a] uppercase tracking-[0.15em] text-[11px] font-semibold flex items-center gap-2 hover:bg-white transition-colors duration-300"
            >
              See Our Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://hagopianink.com/contact/"
              className="px-9 py-4 border border-[#f5f0eb]/35 hover:border-[#f5f0eb] text-[#f5f0eb] uppercase tracking-[0.15em] text-[11px] font-semibold transition-all duration-300"
            >
              Start a Conversation
            </a>
          </FadeIn>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7.5 7.5L14 1" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </motion.div>
      </section>

      {/* ── Stats Ticker ─────────────────────────────────── */}
      <section className="w-full bg-[#111111] border-y border-[#252525] py-14 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />
        <div
          className="flex w-max"
          style={{ animation: 'scroll-stats 50s linear infinite' }}
        >
          {[...STATS, ...STATS].map((s, i) => (
            <div key={i} className="px-14 md:px-20 border-r border-[#252525] flex flex-col justify-center shrink-0">
              <div
                className="text-5xl md:text-6xl font-light mb-1.5"
                style={{ fontFamily: 'didonesquedisplay, didonesquebold, serif' }}
              >
                {s.metric}
              </div>
              <div className="text-sm md:text-base text-[#f5f0eb]/75 mb-1">{s.desc}</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#f5f0eb]/35">{s.client}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Client Logo Train ─────────────────────────────── */}
      <section className="py-16 bg-[#0a0a0a] border-b border-[#1c1c1c] overflow-hidden relative">
        <FadeIn className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40">Trusted by world-class brands</p>
        </FadeIn>
        <div className="relative">
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div
            className="flex items-center w-max gap-12"
            style={{ animation: 'marquee 55s linear infinite' }}
          >
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center px-4" style={{ width: 130, height: 56 }}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain brightness-0 invert opacity-40 hover:opacity-75 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expertise Pillars ─────────────────────────────── */}
      <section className="py-32 md:py-44 px-6 md:px-12 max-w-[1400px] mx-auto">
        <FadeIn className="mb-20">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/45 mb-5">
            <span className="w-10 h-px bg-[#f5f0eb]/25" />
            Core Expertise
          </div>
          <h2
            className="text-5xl md:text-6xl leading-[1.05]"
            style={{ fontFamily: 'didonesquebold, serif' }}
          >
            What we do best.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-14">
          {[
            {
              num: '01',
              title: 'Brand Strategy + Identity',
              desc: 'We build memorable brand systems for luxury, lifestyle, health, and nonprofit organizations — from naming and positioning to logo, standards, and launch.',
              result: '20+ years · 140+ brand identities delivered',
            },
            {
              num: '02',
              title: 'Email Marketing + Campaigns',
              desc: 'We design, build, and optimize email programs that acquire, retain, and re-engage customers — from welcome series to full omnichannel campaign strategy.',
              result: 'Avg. 40%+ open rates · $56K in new sales from automations in 4 months',
            },
            {
              num: '03',
              title: 'Health + MedTech Branding',
              desc: 'We translate complex science and medical innovation into compelling, trustworthy brands — from medical device manufacturers to digital health platforms.',
              result: '6-year Viant Medical partnership · Building brands for the future of health',
            },
          ].map((p, i) => (
            <FadeIn key={i} delay={i * 0.15} className="group cursor-pointer flex flex-col">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#f5f0eb]/30 mb-6 font-medium">{p.num}</div>
              <h3
                className="text-2xl md:text-3xl mb-6 pb-6 border-b border-[#252525] group-hover:border-[#f5f0eb]/40 transition-colors duration-500 leading-snug"
                style={{ fontFamily: 'didonesquebold, serif' }}
              >
                {p.title}
              </h3>
              <p className="text-[#f5f0eb]/65 leading-relaxed mb-8 flex-grow text-[15px]">{p.desc}</p>
              <div className="bg-[#141414] border-l-2 border-[#f5f0eb]/15 group-hover:border-[#f5f0eb]/50 transition-colors duration-500 px-5 py-4 mb-8">
                <p className="text-sm text-[#f5f0eb]/80 italic">{p.result}</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[#f5f0eb]/40 group-hover:text-[#f5f0eb]/80 transition-colors duration-300 mt-auto">
                Explore discipline <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Featured Work ─────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#0f0f0f] border-t border-[#1c1c1c]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <FadeIn>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/45 mb-5">
                <span className="w-10 h-px bg-[#f5f0eb]/25" />
                Selected Work
              </div>
              <h2
                className="text-5xl md:text-6xl"
                style={{ fontFamily: 'didonesquebold, serif' }}
              >
                Recent case studies.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <a
                href="https://hagopianink.com/case-studies/"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] hover:opacity-60 transition-opacity border-b border-[#f5f0eb]/25 pb-1 mt-6 md:mt-0"
              >
                View all case studies <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((cs, i) => (
              <FadeIn key={i} delay={i * 0.15} className="group cursor-pointer">
                <a href={cs.href} target="_blank" rel="noopener noreferrer">
                  <div className="w-full aspect-[4/5] bg-[#1a1a1a] mb-7 overflow-hidden relative">
                    <img
                      src={cs.img}
                      alt={cs.client}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
                    <div className="absolute top-5 left-5">
                      <span className="bg-[#f5f0eb] text-[#0a0a0a] text-[9px] font-bold px-2.5 py-1.5 uppercase tracking-[0.18em]">
                        {cs.cat}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-7 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3
                        className="text-2xl mb-1"
                        style={{ fontFamily: 'didonesquebold, serif' }}
                      >
                        {cs.client}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#f5f0eb]/60 mb-4 text-[14px] leading-relaxed">{cs.desc}</p>
                    <p
                      className="text-base text-[#f5f0eb]/85 italic"
                      style={{ fontFamily: 'didonesquebold_italic, didonesquebold, serif' }}
                    >
                      {cs.result}
                    </p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Boutique Difference ──────────────────────── */}
      <section className="w-full bg-[#f5f0eb] text-[#0a0a0a] py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <h2
                className="text-5xl md:text-7xl leading-[1.05] mb-8"
                style={{ fontFamily: 'didonesquebold, serif' }}
              >
                The personal touch.<br />
                <span className="italic opacity-60">Big agency results.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-black/75 leading-relaxed">
                When you work with Hagopian Ink, you work directly with senior creative talent — not account managers or junior teams. Since 2002, we've brought boutique-level attention to every project while delivering the strategic rigor and creative execution you'd expect from a major agency. Our clients stay with us for years — because results matter, and so does the relationship.
              </p>
            </FadeIn>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <FadeIn delay={0.35}>
              <div className="relative">
                <span
                  className="absolute -top-20 -left-6 text-[11rem] leading-none text-black/06"
                  style={{ fontFamily: 'didonesquedisplay, serif' }}
                >
                  "
                </span>
                <blockquote
                  className="text-3xl md:text-4xl leading-snug mb-8 relative z-10"
                  style={{ fontFamily: 'didonesquebold, serif' }}
                >
                  Hagopian Ink is a boutique shop that provides the personal touch while executing big agency ideas.
                </blockquote>
                <cite className="block text-sm uppercase tracking-[0.12em] text-black/55 not-italic">
                  <span className="font-bold text-black block mb-1">Cecilia Pagkalinawan</span>
                  VP E-commerce &amp; Direct Marketing<br />
                  Frette Inc &amp; La Perla Fashions Inc.
                </cite>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Expertise Areas Grid ──────────────────────────── */}
      <section className="py-32 md:py-44 px-6 md:px-12 bg-[#0a0a0a] border-t border-[#1c1c1c]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-20">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/45 mb-5">
              <span className="w-10 h-px bg-[#f5f0eb]/25" />
              Industries We Serve
            </div>
            <h2
              className="text-5xl md:text-6xl"
              style={{ fontFamily: 'didonesquebold, serif' }}
            >
              We work with clients in...
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-[#1c1c1c]">
            {[
              { industry: 'Luxury + Lifestyle', icon: '◈' },
              { industry: 'Fashion + Beauty', icon: '◈' },
              { industry: 'Medical + Wellness', icon: '◈' },
              { industry: 'Community + Nonprofit', icon: '◈' },
              { industry: 'Technology + Energy', icon: '◈' },
              { industry: 'Entertainment + Hospitality', icon: '◈' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.07} className="border-r border-b border-[#1c1c1c] p-8 group hover:bg-[#111111] transition-colors duration-300">
                <div className="text-[#f5f0eb]/20 text-sm mb-4 group-hover:text-[#f5f0eb]/50 transition-colors">◈</div>
                <p className="text-[#f5f0eb]/80 group-hover:text-[#f5f0eb] transition-colors duration-300 text-[15px] leading-snug">
                  {item.industry}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-[#111111] border-t border-[#1c1c1c] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#f5f0eb]/04 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-8">Let's work together</p>
            <h2
              className="text-6xl md:text-8xl mb-8"
              style={{ fontFamily: 'didonesquebold, serif' }}
            >
              Good design is good business.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl font-light text-[#f5f0eb]/65 mb-5 leading-relaxed">
              Let's create together.
            </p>
            <p className="text-base text-[#f5f0eb]/55 mb-14 max-w-xl mx-auto">
              Whether you're building a new brand from the ground up or evolving an established one, we'd love to hear about your project.
            </p>
          </FadeIn>

          <FadeIn delay={0.35} className="flex flex-col md:flex-row justify-center items-center gap-6 mb-20">
            <a
              href="https://hagopianink.com/contact/"
              className="px-10 py-5 bg-[#f5f0eb] text-[#0a0a0a] uppercase tracking-[0.15em] text-[11px] font-semibold hover:bg-white transition-colors duration-300"
            >
              Get in Touch
            </a>
            <div className="flex flex-col md:flex-row gap-5 text-[12px] uppercase tracking-[0.1em] text-[#f5f0eb]/65">
              <a href="mailto:info@HagopianInk.com" className="flex items-center gap-2 hover:text-[#f5f0eb] transition-colors">
                <Mail className="w-4 h-4" /> info@HagopianInk.com
              </a>
              <a href="tel:2123271445" className="flex items-center gap-2 hover:text-[#f5f0eb] transition-colors">
                <Phone className="w-4 h-4" /> 212-327-1445
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.5} className="border-t border-[#1c1c1c] pt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.15em] text-[#f5f0eb]/30">
            <img
              src={LOGO_URL}
              alt="Hagopian Ink"
              className="h-6 w-auto object-contain brightness-0 invert opacity-40"
            />
            <p>© 2025 Hagopian Ink. All rights reserved. New York, NY.</p>
            <div className="flex gap-5">
              {['Instagram', 'LinkedIn', 'Facebook'].map(s => (
                <a key={s} href="#" className="hover:text-[#f5f0eb]/60 transition-colors">{s}</a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
