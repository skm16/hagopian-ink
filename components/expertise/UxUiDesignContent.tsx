'use client';

import React from 'react';
import { motion as _motion, type MotionProps } from 'framer-motion';
import type { ComponentPropsWithRef, FC } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn } from '@/components/shared/ui';
import { HeroOverlay } from '@/components/shared/HeroOverlay';
import { FeaturedWorkGrid, type FeaturedWork } from '@/components/expertise/FeaturedWorkGrid';
import { BrandsWhoTrustUs } from '@/components/expertise/BrandsWhoTrustUs';
import { CDN, VIDEO_MP4, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

// Typed wrappers to fix React 19 / framer-motion className inference gap
type DivMotion = ComponentPropsWithRef<'div'> & MotionProps;
const motion = {
  ..._motion,
  div: _motion.div as unknown as FC<DivMotion>,
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const CAPABILITIES = [
  { title: 'UX Research + Strategy',    desc: 'User journeys, competitive benchmarking, conversion analysis, and UX audits that identify friction before it costs you customers.' },
  { title: 'E-Commerce Design',         desc: 'Luxury-caliber shopping experiences that reduce bounce, increase basket size, and build brand loyalty.' },
  { title: 'Responsive Web Design',     desc: 'Pixel-perfect, mobile-first design that performs beautifully on every device and screen.' },
  { title: 'Landing Pages + Microsites',desc: 'Focused experiences built for a single goal: sign-up, purchase, download, or contact.' },
  { title: 'App Design + Mobile UX',    desc: 'Native and cross-platform mobile app UX/UI — from concept and wireframing through polished, developer-ready designs.' },
  { title: 'Brand-to-Web Translation',  desc: 'Every visual identity we build is designed to extend seamlessly into the digital environment.' },
];

export function UxUiDesignContent({ featuredWorks = [] }: { featuredWorks?: FeaturedWork[] }) {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* VIDEO HERO */}
      <section className="relative h-[70vh] min-h-[540px] flex flex-col justify-end overflow-hidden">
        <HeroOverlay />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_POSTER} disablePictureInPicture x-webkit-airplay="deny" controlsList="nodownload nofullscreen noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_MP4} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-24 max-w-[1400px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-5" style={{ fontFamily: NAV_FONT }}>Website Design</p>
            <h1 className="text-4xl md:text-7xl leading-[0.95] mb-8 text-white" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Drive action with<br />
              <span style={{ fontStyle: 'italic', opacity: 0.55 }}>clear intention.</span>
            </h1>
            <p className="text-sm md:text-lg text-[#f5f0eb]/80 max-w-2xl leading-snug md:leading-relaxed">
              We place the consumer's needs first for beautiful, effortless online experiences. From first click to checkout — designed to convert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#2d3232] border-b border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 divide-x divide-[#3a4040]">
          {[
            { n: '58%', label: 'Increase in website unique visitors — Frette' },
            { n: '3x', label: 'Increase in sales, first 5 months of redesign — Madison Square Garden' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} className="py-10 px-8 text-center">
              <div className="text-4xl md:text-5xl mb-2 font-light" style={{ fontFamily: SERIF }}>{s.n}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#f5f0eb]/60" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 md:py-36 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-3xl md:text-4xl leading-[1.05] mb-8" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Design that earns its place<br />
              by doing its <span style={{ fontStyle: 'italic', opacity: 0.6 }}>job.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-6">
              We design digital experiences that feel effortless for users and perform powerfully for businesses. Every layout, every flow, every interaction is grounded in the goal: clarity, conversion, and brand alignment.
            </p>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed">
              From luxury fashion e-commerce to B2B lead-generation sites, we have designed digital properties that reduced friction, deepened engagement, and converted more browsers into buyers.
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

      {/* FEATURED WORK */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 md:py-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>UX design in practice</h2>
          </FadeIn>
          <FeaturedWorkGrid works={featuredWorks} />
        </div>
      </section>

      <BrandsWhoTrustUs />

      {/* CTA */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 px-8 text-center border-t border-[#e0ddd9]">
        <FadeIn>
          <SectionLabel>Start a Project</SectionLabel>
          <h2 className="text-3xl md:text-4xl mb-8 leading-[1.0]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ready for a digital experience<br />
            that actually <span style={{ fontStyle: 'italic', opacity: 0.6 }}>converts?</span>
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
