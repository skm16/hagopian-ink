import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn, BtnLight } from '@/components/shared/ui';
import { CDN, VIDEO_ABOUT, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES, CLIENT_LOGOS, PHOTO_CHRISTINA } from '@/lib/brand';

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
    title: 'Woman-Owned, Creatively Driven',
    desc: 'As a woman-owned business, we bring a unique perspective to every engagement — and we believe diverse leadership builds stronger brands.',
  },
  {
    title: 'Curated Teams, by Design',
    desc: 'Other agencies have internal teams — we specialize in building them. Our network of creative and strategic partners lets us assemble the most effective team for your specific project, producing extraordinary results together.',
  },
];

export function AboutPage() {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ── VIDEO HERO ────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[540px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[#060810]/20 z-10" />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_ABOUT} type="video/mp4" />
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
            style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
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
              We are a boutique creative studio born in New York City and now operating virtually around the globe, working with some of the world's most recognizable brands and the most ambitious organizations you have never heard of yet. Our clients include Fortune 50 companies, luxury fashion houses, medical device manufacturers, nonprofit fundraising organizations, and emerging DTC brands — and we treat every brief with the same level of care and strategic rigor.
            </p>
            <p className="text-lg text-[#f5f0eb]/60 leading-relaxed">
              As a woman-owned business, we bring a distinctive perspective to every engagement. We have built our reputation not on size, but on the depth of our relationships and the quality of our results.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── LEADERSHIP ────────────────────────────── */}
      <section className="bg-[#111111] py-28 md:py-36 px-8 md:px-16 border-t border-[#191919]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel light>Leadership</SectionLabel>
          </FadeIn>
          <FadeIn className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
            {/* Headshot */}
            <div className="shrink-0">
              <img
                src={PHOTO_CHRISTINA}
                alt="Christina Hagopian, President & Creative Director"
                className="w-48 md:w-56 aspect-square object-cover object-top grayscale"
              />
            </div>

            {/* Bio */}
            <div className="flex-1 max-w-2xl">
              <h3 className="text-3xl md:text-4xl mb-1 leading-tight" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                Christina Hagopian
              </h3>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#f5f0eb]/45 mb-8" style={{ fontFamily: NAV_FONT }}>
                President &amp; Creative Director
              </p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-5">
                Christina founded Hagopian Ink in 2002 with a conviction that thoughtful brand strategy and exceptional creative could genuinely move people — and move business. More than two decades on, that conviction shapes every brief the studio takes.
              </p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-5">
                As President and Creative Director, she leads every client engagement directly — bringing a rare combination of strategic clarity and hands-on creative direction to organizations ranging from Fortune 50 companies to mission-driven nonprofits and emerging luxury brands.
              </p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed">
                Her philosophy is simple: great work starts with genuine partnership. She built Hagopian Ink not on size, but on the depth of its client relationships — many spanning a decade or more.
              </p>
            </div>
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
            { n: 'W/O',   label: 'Woman owned, creatively driven' },
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
                <p className="text-[14px] text-[#f5f0eb]/70 leading-relaxed">{v.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS ──────────────────────────── */}
      <section className="bg-[#0a0a0a] py-16 border-t border-[#191919] overflow-hidden relative">
        <FadeIn className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/65" style={{ fontFamily: NAV_FONT }}>
            Brands We Have Served
          </p>
        </FadeIn>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="flex items-center w-max gap-10" style={{ animation: 'marquee 60s linear infinite' }}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center" style={{ width: 120, height: 52 }}>
                <img src={logo.src} alt={logo.alt}
                  className="max-w-full max-h-full object-contain brightness-0 invert opacity-75 hover:opacity-100 transition-opacity duration-300" />
              </div>
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
