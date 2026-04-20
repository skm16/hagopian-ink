import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn, BtnLight } from '@/components/shared/ui';
import { CDN, VIDEO_MP4, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES, CLIENT_LOGOS } from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const VALUES = [
  {
    title: 'Strategy First',
    desc: 'Every project begins with deep listening. We learn your business, your audience, and your competition before a single pixel is placed.',
  },
  {
    title: 'Craft Without Compromise',
    desc: 'We hold our work to exacting standards — because the difference between good and great is what clients remember.',
  },
  {
    title: 'Relationships Over Transactions',
    desc: 'Our longest client relationships span a decade or more. We build trust through transparency, reliability, and genuine investment in your success.',
  },
  {
    title: 'Results Are the Measure',
    desc: 'Beautiful work is a given. Work that drives enrollment, donations, conversions, and loyalty is the goal.',
  },
  {
    title: 'Woman-Owned, Always',
    desc: 'As a certified WBE, we bring a unique perspective to every engagement — and we believe diverse leadership builds stronger brands.',
  },
  {
    title: 'Small by Design',
    desc: 'We are boutique on purpose. Every client works directly with senior strategists and designers — no hand-offs to junior teams.',
  },
];

export function AboutPage() {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ── VIDEO HERO ────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[540px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[#060810]/38 z-10" />
        <video autoPlay loop muted playsInline poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_MP4} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-24 max-w-[1400px] mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-5"
            style={{ fontFamily: NAV_FONT }}>
            About Hagopian Ink
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }}
            className="leading-[0.9] mb-0"
            style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(3.75rem, 9.25vw, 8.5rem)' }}>
            We build brands<br />
            <span style={{ fontStyle: 'italic', opacity: 0.55 }}>that endure.</span>
          </motion.h1>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-28 md:py-44 px-8 md:px-16 border-b border-[#191919]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <FadeIn>
            <SectionLabel light>Our Story</SectionLabel>
            <h2 className="text-4xl md:text-6xl leading-[1.02] mb-8" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Twenty-plus years of doing this right.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-6">
              Hagopian Ink was founded in 2002 with a simple but demanding belief: that thoughtful brand strategy and exceptional design could move people — and move business. Over two decades later, that conviction is unchanged.
            </p>
            <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-6">
              We are a boutique creative studio headquartered in New York City, working with some of the world's most recognizable brands and the most ambitious organizations you have never heard of yet. Our clients include Fortune 50 companies, luxury fashion houses, medical device manufacturers, nonprofit fundraising organizations, and emerging DTC brands — and we treat every brief with the same level of care and strategic rigor.
            </p>
            <p className="text-lg text-[#f5f0eb]/60 leading-relaxed">
              As a certified Woman-Owned Business Enterprise, we bring a distinctive perspective to every engagement. We have built our reputation not on size, but on the depth of our relationships and the quality of our results.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────── */}
      <section className="bg-[#f1efef] text-[#0a0a0a] py-20 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: '2002',  label: 'Year founded' },
            { n: '100+',  label: 'Brands developed' },
            { n: '20+',   label: 'Years of partnerships' },
            { n: 'WBE',   label: 'Woman-owned certified' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.08} className="border-t-2 border-[#0a0a0a]/10 pt-6">
              <div className="text-4xl md:text-5xl mb-2 font-light" style={{ fontFamily: SERIF }}>{s.n}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/50" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-28 md:py-44 px-8 md:px-16 border-t border-[#191919]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel light>How We Work</SectionLabel>
            <h2 className="text-4xl md:text-6xl leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Our principles.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {VALUES.map((v, i) => (
              <FadeIn key={i} delay={i * 0.07} className="border-t border-[#252525] pt-8">
                <h3 className="text-xl mb-3" style={{ fontFamily: SERIF, fontWeight: 700 }}>{v.title}</h3>
                <p className="text-[14px] text-[#f5f0eb]/50 leading-relaxed">{v.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS ──────────────────────────── */}
      <section className="bg-[#111111] py-24 px-8 md:px-16 border-t border-[#191919]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/35" style={{ fontFamily: NAV_FONT }}>
              Brands We Have Served
            </p>
          </FadeIn>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {CLIENT_LOGOS.slice(0, 16).map((l, i) => (
              <img key={i} src={l.src} alt={l.alt}
                className="h-6 w-auto object-contain brightness-0 invert opacity-30 hover:opacity-60 transition-opacity duration-300" />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-28 px-6 text-center border-t border-[#191919]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-6" style={{ fontFamily: NAV_FONT }}>Work With Us</p>
          <h2 className="text-4xl md:text-6xl mb-8 leading-[0.95]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ready to make your mark?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BtnLight href="/contact" external={false}>
              Start a Conversation <ArrowRight className="w-4 h-4" />
            </BtnLight>
            <BtnLight href="/work" external={false} variant="outline">
              See Our Work
            </BtnLight>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
