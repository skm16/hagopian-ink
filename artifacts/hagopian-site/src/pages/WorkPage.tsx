import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn, BtnLight } from '@/components/shared/ui';
import { CDN, VIDEO_WORK, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;
const BASE = import.meta.env.BASE_URL;

/* ── Types ─────────────────────────────────────────────── */
type Case = {
  client: string;
  category: string;
  stat: string;
  statLabel: string;
  result: string;
  img: string;
  href: string;
};

type Industry = {
  num: string;
  label: string;
  headline: string;
  intro: string;
  stats: { n: string; label: string }[];
  href: string;
  bg: string;
  dark: boolean;
  cases: Case[];
};

/* ── Data ───────────────────────────────────────────────── */
const INDUSTRIES: Industry[] = [
  {
    num: '01',
    label: 'Luxury + Lifestyle',
    headline: 'Where we started.\nThe DNA of everything we do.',
    intro: 'For over 20 years we have built brands, campaigns, and digital experiences for the world\'s most discerning consumers — from global fashion houses to independent luxury labels.',
    stats: [
      { n: '30%',   label: 'Valentine\'s Day sales lift — La Perla' },
      { n: '3x',    label: 'Online sales increase — MSG Suites' },
      { n: '2.93M', label: 'Facebook followers — Lancôme' },
    ],
    href: '/expertise/luxury-lifestyle',
    bg: '#f1efef',
    dark: false,
    cases: [
      {
        client: 'La Perla',
        category: 'Omnichannel Marketing',
        stat: '30%',
        statLabel: 'Valentine\'s Day sales increase',
        result: 'Timed email, direct mail, and digital ads moved product and drove in-store traffic for the peak purchasing season.',
        img: `${CDN}/2018/08/Work-Thumb_laperla-293x414.jpg`,
        href: 'https://hagopianink.com/expertise/',
      },
      {
        client: 'Joseph Robert',
        category: 'Brand Identity',
        stat: 'A masculine seal',
        statLabel: 'Modern monogram for menswear',
        result: 'Brand strategy, logo mark, pattern and style guide for a new men\'s accessories and apparel line — rich blues, a distinctive JR monogram, and a repeatable pattern system.',
        img: `${CDN}/2022/08/HI_Web_josephrobert_lifestyle-scaled.jpg`,
        href: '/work/joseph-robert',
      },
      {
        client: 'Gwynnie Bee',
        category: 'UX + Email Marketing',
        stat: '300%',
        statLabel: 'Increase in signup conversion',
        result: 'Redesigned acquisition funnel and subscription landing experience delivered a 300% lift in new member sign-ups.',
        img: `${CDN}/2018/08/Work-Thumb_gwynnie-293x414.jpg`,
        href: 'https://hagopianink.com/works/gwynnie-bee-subscription-acquisition-email/',
      },
      {
        client: 'Loum Beauty',
        category: 'Brand + UX Redesign',
        stat: 'Clarity',
        statLabel: 'Complex brand story simplified',
        result: 'Redesigned the digital experience to clarify a complex clean-beauty story, improve navigation, and drive conversions on mobile and desktop.',
        img: `${CDN}/2022/08/Work-Thumb_loum2-724x1024-1-293x414.jpg`,
        href: '/work/loumbeauty',
      },
    ],
  },
  {
    num: '02',
    label: 'Health + MedTech',
    headline: 'Medical innovation deserves\na brand that commands trust.',
    intro: 'We translate complex science and medical innovation into compelling, trustworthy brands — from medical device manufacturers to digital health startups, cardiac rehab platforms, and wellness companies.',
    stats: [
      { n: '6 yrs',  label: 'Viant Medical brand partnership' },
      { n: '24',     label: 'Global locations reached' },
      { n: '1,030%', label: 'Email list growth in 6 months — P.Volve' },
    ],
    href: '/expertise/health-medtech',
    bg: '#2d3232',
    dark: true,
    cases: [
      {
        client: 'Viant Medical',
        category: 'Brand + Campaign',
        stat: '6 years',
        statLabel: '24 global locations',
        result: '"In It for Life" campaign built lasting credibility across print, email, and digital display for a global medical device leader.',
        img: `${BASE}deck-images/medtech-01.png`,
        href: 'https://hagopianink.com/expertise/',
      },
      {
        client: 'P.Volve',
        category: 'Digital Health + Email',
        stat: '1,030%',
        statLabel: 'Email list growth in 6 months',
        result: 'Full email program launch — welcome series, campaigns, and UX — achieved a 49.5% open rate high for a groundbreaking fitness platform.',
        img: `${BASE}deck-images/medtech-02.png`,
        href: 'https://hagopianink.com/expertise/',
      },
      {
        client: 'Aptyx',
        category: 'Brand Identity + Launch',
        stat: '12+',
        statLabel: 'Companies unified under one brand',
        result: 'Rebranded Molded Devices Inc. as Aptyx — unifying a dozen acquired companies under one identity for the medical device manufacturing market. Case study coming soon.',
        img: `${BASE}deck-images/medtech-03.png`,
        href: 'https://aptyx.com',
      },
      {
        client: 'Audible',
        category: 'Email Marketing',
        stat: 'Re-engagement',
        statLabel: 'Pre-lapse email series',
        result: 'Front-end campaign development for Audible\'s pre-lapse email series — messaging designed to re-engage new subscribers before cancellation.',
        img: `${BASE}audible-thumb.png`,
        href: '/work/audible-email-design',
      },
    ],
  },
  {
    num: '03',
    label: 'Nonprofit + Fundraising',
    headline: 'Design that drives\ngiving.',
    intro: 'From multi-year gala programs to urgent activist campaigns, we help nonprofits build brands and fundraising programs that connect missions to donors — and donors to results.',
    stats: [
      { n: '329%',   label: 'More dollars raised — Montefiore' },
      { n: '$22.2M', label: 'Raised at annual gala' },
      { n: '180%',   label: 'Increase in online donations — Epilepsy Foundation' },
    ],
    href: '/expertise/nonprofit-fundraising',
    bg: '#f1efef',
    dark: false,
    cases: [
      {
        client: 'Montefiore Health System',
        category: 'Fundraising + Gala Design',
        stat: '329%',
        statLabel: 'More dollars raised',
        result: 'Multi-year program spanning donor email, gala invitations, and event branding raised $22.2M and added 100+ new attendees.',
        img: `${CDN}/2018/08/Work-Thumb_montefiore-293x414.jpg`,
        href: 'https://hagopianink.com/works/montefiore-healthcare-design/',
      },
      {
        client: 'Epilepsy Foundation',
        category: 'Email + Brand',
        stat: '180%',
        statLabel: 'Increase in online donations',
        result: '2019 Holiday Appeal campaign and brand rollout supporting the Foundation\'s 5-year strategic plan.',
        img: `${BASE}deck-images/nonprofit-02.png`,
        href: 'https://hagopianink.com/expertise/',
      },
      {
        client: 'Black Lives Matter Canada',
        category: 'Activist Campaign',
        stat: 'Multi-channel',
        statLabel: 'Email + digital fundraising',
        result: 'Email messages that connected a global movement to individual action and measurable charitable giving.',
        img: `${CDN}/2022/08/Work-Thumb_BLMC-724x1024-1-293x414.jpg`,
        href: '/work/black-lives-matter-canada',
      },
      {
        client: 'Malala Fund',
        category: 'Nonprofit Brand',
        stat: 'Global',
        statLabel: 'Brand + campaign design',
        result: 'Creative support for the global education equity organization\'s communications and fundraising materials.',
        img: `${BASE}deck-images/nonprofit-03.png`,
        href: 'https://hagopianink.com/expertise/',
      },
    ],
  },
];

/* ── Case study card ────────────────────────────────────── */
function CaseCard({ c, dark }: { c: Case; dark: boolean }) {
  const textColor    = dark ? '#f5f0eb' : '#2d3232';
  const mutedColor   = dark ? 'rgba(245,240,235,0.5)'  : 'rgba(45,50,50,0.5)';
  const borderColor  = dark ? 'rgba(245,240,235,0.1)'  : 'rgba(45,50,50,0.1)';
  const cardBg       = dark ? '#343a3a' : '#ffffff';
  const cardBorder   = dark ? '#424848' : '#e8e4e0';

  return (
    <FadeIn className="group flex flex-col" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
      {/* Image — tall portrait 293×414 (matches live case study thumbnails) */}
      <div className="overflow-hidden aspect-[293/414]">
        <img src={c.img} alt={c.client}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
      </div>
      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        <p className="text-[9px] uppercase tracking-[0.2em] mb-3" style={{ color: mutedColor, fontFamily: NAV_FONT }}>
          {c.category}
        </p>
        <h3 className="text-xl mb-4 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700, color: textColor }}>
          {c.client}
        </h3>
        <p className="text-[13px] leading-relaxed flex-1 mb-6" style={{ color: mutedColor }}>
          {c.result}
        </p>
        {c.href.startsWith('/') ? (
          <Link href={c.href}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] border-b pb-0.5 transition-all duration-300 hover:gap-3 self-start"
            style={{ color: textColor, borderColor, fontFamily: NAV_FONT }}>
            View Case Study <ArrowRight className="w-3 h-3" />
          </Link>
        ) : (
          <a href={c.href} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] border-b pb-0.5 transition-all duration-300 hover:gap-3 self-start"
            style={{ color: textColor, borderColor, fontFamily: NAV_FONT }}>
            View Work <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </FadeIn>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export function WorkPage() {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ── VIDEO HERO ─────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[#2d3232]/12 z-10" />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_WORK} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-20 max-w-[1400px] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-6" style={{ fontFamily: NAV_FONT }}>Selected Work</p>
            <h1 className="text-5xl md:text-7xl leading-[0.92] text-white" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Design that<br />creates impact.
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }}
            className="text-xl text-[#f5f0eb]/70 max-w-md leading-relaxed pb-2">
            Three specialty areas. 20+ years. Brands built to last.
          </motion.p>
        </div>
      </section>

      {/* ── INDUSTRY SECTIONS ──────────────── */}
      {INDUSTRIES.map((ind, i) => {
        const textColor   = ind.dark ? '#f5f0eb' : '#2d3232';
        const mutedColor  = ind.dark ? 'rgba(245,240,235,0.55)' : 'rgba(45,50,50,0.55)';
        const borderColor = ind.dark ? 'rgba(245,240,235,0.1)'  : 'rgba(45,50,50,0.1)';
        const divColor    = ind.dark ? '#3a4040' : '#e0ddd9';

        return (
          <section key={ind.num} style={{ background: ind.bg }}>

            {/* ── Section header ── */}
            <div className="px-8 md:px-16 pt-24 md:pt-36 pb-16 max-w-[1400px] mx-auto">
              <FadeIn className="flex items-center gap-4 mb-12">
                <span className="text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: mutedColor, fontFamily: NAV_FONT }}>{ind.num}</span>
                <span className="w-10 h-px" style={{ background: borderColor }} />
                <span className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: mutedColor, fontFamily: NAV_FONT }}>Specialty: {ind.label}</span>
              </FadeIn>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
                <FadeIn>
                  <h2 className="text-3xl md:text-4xl leading-[1.02] whitespace-pre-line"
                    style={{ fontFamily: SERIF, fontWeight: 700, color: textColor }}>
                    {ind.headline}
                  </h2>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p className="text-lg leading-relaxed mb-8" style={{ color: mutedColor }}>
                    {ind.intro}
                  </p>
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-6 pt-8 mb-8" style={{ borderTop: `1px solid ${borderColor}` }}>
                    {ind.stats.map((s, si) => (
                      <div key={si}>
                        <div className="text-2xl md:text-3xl mb-1 font-light" style={{ fontFamily: SERIF, color: textColor }}>{s.n}</div>
                        <div className="text-[10px] uppercase tracking-[0.1em] leading-snug" style={{ color: mutedColor, fontFamily: NAV_FONT }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link href={ind.href}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] border-b pb-1 transition-all duration-300 hover:gap-3 cursor-pointer"
                    style={{ color: textColor, borderColor: `rgba(${ind.dark ? '245,240,235' : '45,50,50'},0.3)`, fontFamily: NAV_FONT }}>
                    Explore this specialty <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </FadeIn>
              </div>
            </div>

            {/* ── Case study cards ── */}
            <div className="px-8 md:px-16 pb-24 md:pb-36">
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {ind.cases.map((c, ci) => (
                  <CaseCard key={ci} c={c} dark={ind.dark} />
                ))}
              </div>
            </div>

            {/* Divider */}
            {i < INDUSTRIES.length - 1 && (
              <div style={{ borderBottom: `1px solid ${divColor}` }} />
            )}
          </section>
        );
      })}

      {/* ── CTA ──────────────────────────── */}
      <section className="bg-[#2d3232] py-28 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-6" style={{ fontFamily: NAV_FONT }}>Start a Conversation</p>
          <h2 className="text-3xl md:text-5xl mb-4 leading-[0.95]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ready to create something new?
          </h2>
          <p className="text-lg text-[#f5f0eb]/50 mb-12 max-w-xl mx-auto leading-relaxed">
            Tell us about your brand, your goals, and what you need. We will take it from there.
          </p>
          <BtnLight href="/contact" external={false}>
            Get In Touch <ArrowRight className="w-4 h-4" />
          </BtnLight>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
