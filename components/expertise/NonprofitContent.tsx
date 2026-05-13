'use client';

import React from 'react';
import { motion as _motion, type MotionProps } from 'framer-motion';
import type { ComponentPropsWithRef, FC } from 'react';
import { ArrowRight } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn } from '@/components/shared/ui';
import { HeroOverlay } from '@/components/shared/HeroOverlay';
import { FeaturedWorkGrid, type FeaturedWork } from '@/components/expertise/FeaturedWorkGrid';
import { BrandsWhoTrustUs } from '@/components/expertise/BrandsWhoTrustUs';
import { VIDEO_MP4, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES, NONPROFIT_LOGOS } from '@/lib/brand';

// Typed wrappers to fix React 19 / framer-motion className inference gap
type DivMotion = ComponentPropsWithRef<'div'> & MotionProps;
const motion = {
  ..._motion,
  div: _motion.div as unknown as FC<DivMotion>,
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const CAPABILITIES = [
  { title: 'Nonprofit Brand Identity',    desc: 'Clear, credible brand systems that inspire donor confidence and differentiate your mission in a crowded space.' },
  { title: 'Donor Email Programs',        desc: 'Acquisition, stewardship, and appeal campaigns designed to educate, activate, and sustain giving over time.' },
  { title: 'Gala + Event Design',         desc: 'Invitation suites, event branding, signage, and program design for galas and fundraising events.' },
  { title: 'Online Fundraising Campaigns',desc: 'Year-end appeals, matching gift campaigns, and peer-to-peer email strategies built for results.' },
  { title: 'Impact Reports + Magazines',  desc: 'Annual reports, donor magazines, and quarterly publications that deepen relationships and showcase impact.' },
  { title: 'Direct Mail + Print',         desc: 'High-impact direct mail that reaches major donors, board members, and community stakeholders.' },
];

const STATS = [
  { n: '329%',   label: 'More dollars raised — Montefiore' },
  { n: '180%',   label: 'Increase in online donations — Epilepsy Foundation' },
  { n: '$22.2M', label: 'Raised at annual gala — Montefiore' },
];


const PHILOSOPHY = [
  { word: 'Connect.', desc: 'Tell stories that create an emotional bond. Use powerful imagery, human voices, and compelling calls to action — meeting donors where they are.' },
  { word: 'Inspire.',  desc: 'Show how a small gift combines with others to create large-scale impact. Tie every donation tier to the lives it changes.' },
  { word: 'Thank.',    desc: 'Show gratitude at every step — on behalf of the organization and the people it serves. Cultivate advocates, not transactions.' },
];

export function NonprofitContent({ featuredWorks = [] }: { featuredWorks?: FeaturedWork[] }) {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* VIDEO HERO */}
      <section className="relative h-[70vh] min-h-[540px] flex flex-col justify-end overflow-hidden">
        <HeroOverlay />
        <video autoPlay loop muted playsInline poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_MP4} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-24 max-w-[1400px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-5" style={{ fontFamily: NAV_FONT }}>Nonprofit + Fundraising</p>
            <h1 className="text-4xl md:text-7xl leading-[0.95] mb-8 text-white" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Building bold brands<br />
              for a new era of <span style={{ fontStyle: 'italic', opacity: 0.55 }}>impact.</span>
            </h1>
            <p className="text-lg text-[#f5f0eb]/80 max-w-2xl leading-relaxed">
              We help nonprofits build the brands and fundraising programs that connect missions to donors — and donors to results. From quarterly appeals to galas that raised $22M.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#2d3232] border-b border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-x divide-[#3a4040]">
          {STATS.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} className="py-10 px-6 text-center">
              <div className="text-3xl md:text-4xl mb-2 font-light" style={{ fontFamily: SERIF }}>{s.n}</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-[#f5f0eb]/60" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 md:py-36 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="text-3xl md:text-4xl leading-[1.05] mb-8" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Mission-driven work<br />
              demands <span style={{ fontStyle: 'italic', opacity: 0.6 }}>mission-driven design.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-6">
              We understand that nonprofits operate under unique pressures: limited budgets, high accountability, and an audience whose trust must be earned with every communication.
            </p>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed">
              Our job is to inspire the first gift, motivate continued giving, and create life-long advocates through cohesive messaging across every channel.
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
              <FadeIn key={i} delay={i * 0.07} className="border-t-[1.5px] border-[#2d3232]/15 hover:border-t-[3px] hover:border-[#2d3232] transition-[border-color,border-width] duration-200 pt-7">
                <h3 className="text-lg mb-3 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>{c.title}</h3>
                <p className="text-[14px] text-[#2d3232]/70 leading-relaxed">{c.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECT. INSPIRE. THANK. */}
      <section className="bg-[#2d3232] py-24 md:py-36 px-8 md:px-16 border-t border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel light>How We Inspire Giving</SectionLabel>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
            {PHILOSOPHY.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1} className="border-t-[1.5px] border-[#f5f0eb]/20 hover:border-t-[3px] hover:border-[#f5f0eb] transition-[border-color,border-width] duration-200 pt-8">
                <div className="text-4xl mb-5 font-light italic text-[#f5f0eb]" style={{ fontFamily: SERIF }}>{p.word}</div>
                <p className="text-[15px] text-[#f5f0eb]/60 leading-relaxed">{p.desc}</p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.5} className="mt-20 text-right overflow-hidden">
            <span className="text-5xl md:text-7xl font-light italic text-[#f5f0eb]/10 tracking-tight" style={{ fontFamily: SERIF }}>
              inspire. elevate. change.
            </span>
          </FadeIn>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 md:py-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>Campaigns that moved people — and dollars</h2>
          </FadeIn>
          <FeaturedWorkGrid works={featuredWorks} />
        </div>
      </section>

      <BrandsWhoTrustUs logos={NONPROFIT_LOGOS} />

      {/* CTA */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 px-8 text-center border-t border-[#e0ddd9]">
        <FadeIn>
          <SectionLabel>Start a Project</SectionLabel>
          <h2 className="text-3xl md:text-4xl mb-8 leading-[1.0]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ready to put your mission<br />
            <span style={{ fontStyle: 'italic', opacity: 0.6 }}>into motion?</span>
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
