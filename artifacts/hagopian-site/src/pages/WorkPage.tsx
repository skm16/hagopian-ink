import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn, BtnLight } from '@/components/shared/ui';
import { CDN, VIDEO_WORK, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;
const BASE = import.meta.env.BASE_URL; // e.g. "/hagopian-site/"

const CATEGORIES = [
  {
    num: '01',
    label: 'Brand Identity',
    headline: 'We build brands\nthat last.',
    body: 'From startups launching their first identity to established companies ready to evolve, we develop comprehensive brand systems that define who you are, what you stand for, and how you show up in the world. Our process begins with strategy — naming, positioning, competitive landscape — and culminates in a complete visual identity system your team can confidently use across every touchpoint.',
    clients: ['Joseph Robert', 'Viant Medical', 'Frette', 'P.Volve', 'Cannadips', 'BLMC'],
    stats: [
      { n: '100+', label: 'brands developed' },
      { n: '20+',  label: 'years of expertise' },
    ],
    img: `${BASE}deck-images/brand-06.png`,
    href: '/expertise/brand-identity',
    bg: '#f1efef',
    dark: false,
  },
  {
    num: '02',
    label: 'Website Design',
    headline: 'Digital experiences\nbuilt to convert.',
    body: 'Beautiful websites that perform. We design e-commerce platforms and marketing sites that prioritize the customer journey — reducing friction, increasing confidence, and driving conversion at every step. From information architecture through final UI, every interaction is considered with purpose.',
    clients: ['Loum Beauty', 'Gwynnie Bee', 'La Perla', "Bloomingdale's", 'Shopbop', 'Frette'],
    stats: [
      { n: '300%', label: 'increase in signup conversion' },
      { n: '58%',  label: 'increase in unique visitors' },
    ],
    img: `${CDN}/2022/08/HI_home2_loum.jpg`,
    href: '/expertise/ux-ui-design',
    bg: '#0a0a0a',
    dark: true,
  },
  {
    num: '03',
    label: 'Email Marketing',
    headline: 'Email that performs.\nEvery send.',
    body: 'We design, write, build, and deploy email programs that drive measurable results for Fortune 50 brands and fast-growing DTC companies alike. From template design and automation flows to list growth strategy and full program management — we treat email as the high-ROI channel it is.',
    clients: ['Pepsi', 'Audible', 'P.Volve', 'La Perla', 'Estée Lauder', 'Cannadips'],
    stats: [
      { n: '1,030%', label: 'email list growth, 6 months' },
      { n: '40%+',   label: 'average open rate achieved' },
      { n: '$56K',   label: 'new sales from automations' },
    ],
    img: `${BASE}deck-images/email-06.png`,
    href: '/expertise/email-marketing',
    bg: '#f1efef',
    dark: false,
  },
  {
    num: '04',
    label: 'Health + MedTech',
    headline: 'Brands that earn\ntrust in health.',
    body: 'In regulated, high-stakes industries, credibility is everything. We help health and medtech companies distill complex offerings into compelling stories — creating brand identities, digital experiences, and campaigns that build trust with patients, providers, and investors. From medical device manufacturers to wellness startups, we bring clarity to complexity.',
    clients: ['Viant Medical', 'Aptyx', 'Cannadips', 'P.Volve'],
    stats: [
      { n: '6 yrs',  label: 'Viant Medical brand partnership' },
      { n: '24',     label: 'global locations reached' },
    ],
    img: `${BASE}deck-images/medtech-05.png`,
    href: '/expertise/health-medtech',
    bg: '#0a0a0a',
    dark: true,
  },
  {
    num: '05',
    label: 'Nonprofit + Fundraising',
    headline: 'Design that drives\ngiving.',
    body: 'Nonprofits need brands and campaigns that inspire trust, tell compelling stories, and turn mission into action. We have helped organizations like Montefiore, the Epilepsy Foundation, and Black Lives Matter Canada build stronger donor relationships through sophisticated email programs, event materials, print campaigns, and digital fundraising.',
    clients: ['Montefiore', 'Epilepsy Foundation', 'BLMC', 'Malala Fund', 'March of Dimes'],
    stats: [
      { n: '329%',   label: 'more dollars raised' },
      { n: '$22.2M', label: 'raised, Montefiore Gala' },
      { n: '180%',   label: 'increase in online donations' },
    ],
    img: `${BASE}deck-images/nonprofit-05.png`,
    href: '/expertise/nonprofit-fundraising',
    bg: '#f1efef',
    dark: false,
  },
];

export function WorkPage() {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ── VIDEO HERO ────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[420px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[#060810]/25 z-10" />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_WORK} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-20 max-w-[1400px] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-6" style={{ fontFamily: NAV_FONT }}>Selected Work</p>
            <h1 className="text-6xl md:text-8xl leading-[0.92] text-[#f5f0eb]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Our Work.
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }}
            className="text-xl text-[#f5f0eb]/70 max-w-md leading-relaxed pb-2">
            Creative solutions for brands that want to grow, connect, and last.
          </motion.p>
        </div>
      </section>

      {/* ── CATEGORY CHAPTERS ─────────────────────── */}
      {CATEGORIES.map((cat, i) => {
        const flip = i % 2 !== 0;
        const textColor = cat.dark ? '#f5f0eb' : '#0a0a0a';
        const mutedColor = cat.dark ? 'rgba(245,240,235,0.55)' : 'rgba(10,10,10,0.55)';
        const borderColor = cat.dark ? 'rgba(245,240,235,0.1)' : 'rgba(10,10,10,0.1)';
        const accentColor = cat.dark ? 'rgba(245,240,235,0.3)' : 'rgba(10,10,10,0.3)';

        return (
          <section key={cat.num} style={{ background: cat.bg }} className="py-24 md:py-36 px-6 md:px-12"
            id={`cat-${cat.num}`}>
            <div className="max-w-[1400px] mx-auto">
              {/* Chapter number + label */}
              <FadeIn className="flex items-center gap-4 mb-16">
                <span className="text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: mutedColor, fontFamily: NAV_FONT }}>{cat.num}</span>
                <span className="w-12 h-px" style={{ background: borderColor }} />
                <span className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: mutedColor, fontFamily: NAV_FONT }}>{cat.label}</span>
              </FadeIn>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                {/* Text block */}
                <div className={`${flip ? 'order-1 lg:order-2 lg:pl-16' : 'lg:pr-16'} flex flex-col justify-center pb-16 lg:pb-0`}>
                  <FadeIn>
                    <h2 className="text-5xl md:text-6xl mb-8 leading-[1.0] whitespace-pre-line"
                      style={{ fontFamily: SERIF, fontWeight: 700, color: textColor }}>
                      {cat.headline}
                    </h2>
                    <p className="text-lg leading-relaxed mb-10" style={{ color: mutedColor }}>
                      {cat.body}
                    </p>

                    {/* Stats */}
                    <div className={`grid grid-cols-${cat.stats.length} gap-6 mb-10 pt-8`}
                      style={{ borderTop: `1px solid ${borderColor}` }}>
                      {cat.stats.map((s, si) => (
                        <div key={si}>
                          <div className="text-3xl md:text-4xl mb-1" style={{ fontFamily: SERIF, color: textColor }}>{s.n}</div>
                          <div className="text-[11px] uppercase tracking-[0.1em] leading-snug"
                            style={{ color: mutedColor, fontFamily: NAV_FONT }}>{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Clients */}
                    <div className="mb-10">
                      <p className="text-[10px] uppercase tracking-[0.18em] mb-3"
                        style={{ color: mutedColor, fontFamily: NAV_FONT }}>Featured Clients</p>
                      <div className="flex flex-wrap gap-x-5 gap-y-1">
                        {cat.clients.map((c, ci) => (
                          <span key={ci} className="text-[13px]" style={{ color: mutedColor }}>{c}</span>
                        ))}
                      </div>
                    </div>

                    <Link href={cat.href}
                      className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] border-b pb-1.5 transition-all duration-300 hover:gap-4 cursor-pointer"
                      style={{ color: textColor, borderColor: accentColor, fontFamily: NAV_FONT }}>
                      Explore This Specialty <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </FadeIn>
                </div>

                {/* Image */}
                <div className={`${flip ? 'order-2 lg:order-1' : ''}`}>
                  <FadeIn delay={0.2} dir={flip ? 'right' : 'left'}
                    className="overflow-hidden h-[500px] md:h-[640px]">
                    <img src={cat.img} alt={cat.label}
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-1000"
                      style={{ opacity: cat.dark ? 0.9 : 1 }} />
                  </FadeIn>
                </div>
              </div>
            </div>

            {/* Divider */}
            {i < CATEGORIES.length - 1 && (
              <div className="max-w-[1400px] mx-auto mt-24"
                style={{ borderBottom: `1px solid ${borderColor}` }} />
            )}
          </section>
        );
      })}

      {/* ── CTA ──────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-28 px-6 text-center border-t border-[#191919]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-6" style={{ fontFamily: NAV_FONT }}>Start a Conversation</p>
          <h2 className="text-4xl md:text-6xl mb-4 leading-[0.95]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ready to create something new?
          </h2>
          <p className="text-lg text-[#f5f0eb]/50 mb-12 max-w-xl mx-auto leading-relaxed">
            Tell us about your brand, your goals, and what you need. We will take it from there.
          </p>
          <BtnLight href="/contact">
            Get In Touch <ArrowRight className="w-4 h-4" />
          </BtnLight>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
