import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn, BtnLight } from '@/components/shared/ui';
import { CDN, VIDEO_MP4, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const CAPABILITIES = [
  { title: 'Brand Strategy + Naming',        desc: 'Competitive audits, positioning frameworks, and naming strategy that gives your brand a clear, distinctive voice.' },
  { title: 'Logo + Mark Development',         desc: 'Wordmarks, monograms, emblems, and symbols — crafted for longevity, not trend.' },
  { title: 'Visual Identity Systems',         desc: 'Typography, color, texture, and imagery that work together across every touchpoint.' },
  { title: 'Brand Standards + Guidelines',    desc: 'The rulebook that protects your investment and keeps every expression of the brand consistent.' },
  { title: 'Brand Campaigns',                 desc: 'Launching or relaunching a brand requires momentum. We design the creative platform and campaign to drive it.' },
  { title: 'Brand Refresh + Evolution',       desc: 'When your brand has outgrown itself, we preserve equity while modernizing for what comes next.' },
];

const PROCESS = [
  { num: '01', title: 'Brand Strategy + Naming',      desc: 'Defining your positioning, voice, and what makes you distinct in your market.' },
  { num: '02', title: 'Logo + Mark Development',      desc: 'Crafting a visual identity that is distinctive, memorable, and enduring.' },
  { num: '03', title: 'Brand Standards + Guidelines', desc: 'The rulebook that keeps your brand consistent across every touchpoint.' },
  { num: '04', title: 'Documents + Imagery',          desc: 'Collateral, photography direction, and materials that bring the brand to life.' },
  { num: '05', title: 'Launch + Ongoing Expansions',  desc: 'Campaigns, digital rollout, and growth strategies to sustain momentum.' },
];

const PROJECTS = [
  {
    client: 'Joseph Robert',
    category: 'Brand Identity',
    headline: 'A modern monogram for menswear.',
    result: 'Built a complete brand identity for a modern menswear line — from naming and strategy through logo, packaging, and retail presence.',
    img: `${CDN}/2022/08/HI_Web_josephrobert_lifestyle-scaled.jpg`,
    href: '/work/joseph-robert',
  },
  {
    client: 'Hubspot Inbound',
    category: 'Conference Brand Identity',
    headline: 'A conference brand built for a movement.',
    result: 'Developed a complete visual identity and brand system for HubSpot\'s flagship INBOUND conference — applied across digital, print, signage, and environmental design for tens of thousands of attendees.',
    img: `${CDN}/2018/09/Work-Thumb_hubspot2-293x414.jpg`,
    href: '/work/hubspot-conference-brand-identity',
  },
  {
    client: 'Award-Winning Logos',
    category: 'Brand Identity',
    headline: 'Make your mark.',
    result: '24 award-winning logo designs across sectors — each a mark built on strategic insight and crafted to endure.',
    img: `${CDN}/2018/08/Work-Thumb_logos-293x414.jpg`,
    href: '/work/award-winning-logos',
  },
  {
    client: 'BeWELL',
    category: 'Brand Identity',
    headline: 'A wellness brand rooted in possibility.',
    result: 'Developed a complete brand identity system for a health and wellness platform — distinctive wordmark, flexible visual language, and brand patterns balancing clinical credibility with warmth.',
    img: `${CDN}/2022/07/Work-Thumb_beWELL-724x1024-1-293x414.jpg`,
    href: '/work/bewell',
  },
];

export function BrandIdentityPage() {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* VIDEO HERO */}
      <section className="relative h-[70vh] min-h-[540px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[#2d3232]/10 z-10" />
        <video autoPlay loop muted playsInline poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_MP4} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-24 max-w-[1400px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-5" style={{ fontFamily: NAV_FONT }}>Brand Identity</p>
            <h1 className="leading-[0.95] mb-8 text-white" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
              Your first impression<br />
              is <span style={{ fontStyle: 'italic', opacity: 0.55 }}>everything.</span>
            </h1>
            <p className="text-lg text-[#f5f0eb]/80 max-w-2xl leading-relaxed">
              Leave a lasting impact that communicates the essence of your brand. Rise above the competition with award-winning logo and brand development built on strategic insight.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS — removed pending verified numbers from brand decks */}

      {/* OVERVIEW */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 md:py-36 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-3xl md:text-4xl leading-[1.05] mb-8" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              A brand is more than a logo.<br />
              It's a <span style={{ fontStyle: 'italic', opacity: 0.6 }}>promise.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-6">
              We believe great branding begins with thoughtful strategy and ends with flawless execution. Every mark we create is designed to work across every context — from a business card to a billboard — and to remain relevant not just today, but a decade from now.
            </p>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed">
              Our clients range from Fortune 50 companies launching new product lines to entrepreneurs building their first brand from scratch. What they share is a demand for quality, clarity, and creative work that truly reflects who they are.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-[#f1efef] text-[#2d3232] pb-24 md:pb-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>What we deliver</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {CAPABILITIES.map((c, i) => (
              <FadeIn key={i} delay={i * 0.07} className="border-t border-[#2d3232]/12 pt-7">
                <h3 className="text-lg mb-3 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>{c.title}</h3>
                <p className="text-[14px] text-[#2d3232]/70 leading-relaxed">{c.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 md:py-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>Brand identity in practice</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Link href={p.href} className="group block">
                  <div className="overflow-hidden aspect-[293/414]">
                    <img src={p.img} alt={p.client}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                  </div>
                  <p className="mt-3 text-[13px] leading-snug"
                    style={{ fontFamily: SERIF, fontWeight: 700, color: '#2d3232' }}>
                    {p.client}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE BEGIN */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 md:py-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel>How We Begin</SectionLabel>
            <h2 className="text-3xl md:text-4xl leading-[1.05]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              How can we begin your<br />new brand development?
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-8">
            {PROCESS.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1} className="border-t-2 border-[#2d3232]/10 pt-8 hover:border-[#2d3232]/40 transition-colors duration-300">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#2d3232]/70 mb-4" style={{ fontFamily: NAV_FONT }}>{step.num}</div>
                <h3 className="text-lg mb-3 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>{step.title}</h3>
                <p className="text-[#2d3232]/70 text-[13px] leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 px-8 text-center border-t border-[#e0ddd9]">
        <FadeIn>
          <SectionLabel>Start a Project</SectionLabel>
          <h2 className="text-3xl md:text-4xl mb-8 leading-[1.0]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ready to build a brand<br />
            that <span style={{ fontStyle: 'italic', opacity: 0.6 }}>endures?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Btn href="/contact" external={false}>
              Start a Conversation <ArrowRight className="w-4 h-4" />
            </Btn>
            <Btn href="/work" external={false} variant="outline">
              See All Work
            </Btn>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
