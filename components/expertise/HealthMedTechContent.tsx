'use client';

import React from 'react';
import { motion as _motion, type MotionProps } from 'framer-motion';
import type { ComponentPropsWithRef, FC } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn } from '@/components/shared/ui';
import { CDN, VIDEO_MP4, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

// Typed wrappers to fix React 19 / framer-motion className inference gap
type DivMotion = ComponentPropsWithRef<'div'> & MotionProps;
const motion = {
  ..._motion,
  div: _motion.div as unknown as FC<DivMotion>,
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const CAPABILITIES = [
  { title: 'Medical Device Brand Identity',    desc: 'Brand systems for device manufacturers, diagnostics companies, and life science innovators that command trust in every market.' },
  { title: 'Digital Health UX/UI',             desc: 'Platform and app design for wellness, rehab, and telehealth — balancing clinical clarity with consumer appeal.' },
  { title: 'B2B Campaign Design',              desc: 'Trade media, conference materials, and executive-facing campaigns that reach the right audience with authority.' },
  { title: 'Patient + Consumer Campaigns',     desc: 'B2C health communications that translate complex science into clear, motivating messages.' },
  { title: 'Health Email Programs',            desc: 'Targeted email programs for health brands — from patient education series to provider outreach campaigns.' },
  { title: 'Annual Reports + Print Collateral',desc: 'Impact-driven print and digital publications for boards, investors, and clinical partners.' },
];

const STATS = [
  { n: '6 yrs',  label: 'Viant Medical brand partnership' },
  { n: '24',     label: 'Global locations reached — Viant Medical' },
  { n: '49.5%',  label: 'Average open rate achieved — P.Volve' },
];

const PROJECTS = [
  {
    client: 'RecoveryPlus',
    category: 'Brand Identity + UX Design',
    img: '/images/case-studies/recoveryplus/hero.png',
    href: '/work/recoveryplus-health-brand',
  },
  {
    client: 'BeWELL',
    category: 'Brand Identity',
    img: `${CDN}/2022/07/Work-Thumb_beWELL-724x1024-1-293x414.jpg`,
    href: '/work/bewell',
  },
  {
    client: 'Montefiore Einstein',
    category: 'Healthcare Fundraising Design',
    img: `${CDN}/2018/08/Work-Thumb_montefiore-293x414.jpg`,
    href: '/work/montefiore-healthcare-design',
  },
  {
    client: 'Audible',
    category: 'Email Marketing + Reactivation',
    img: `${CDN}/2022/07/Work-Thumb_audible-293x414.jpg`,
    href: '/work/audible-email-design',
  },
];

export function HealthMedTechContent() {
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
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-5" style={{ fontFamily: NAV_FONT }}>Health + MedTech</p>
            <h1 className="leading-[0.95] mb-8 text-white" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
              Medical innovation<br />
              deserves a brand that <span style={{ fontStyle: 'italic', opacity: 0.55 }}>commands trust.</span>
            </h1>
            <p className="text-lg text-[#f5f0eb]/80 max-w-2xl leading-relaxed">
              We translate complex science and medical innovation into compelling, trustworthy brands — from medical device manufacturers to digital health startups.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#2d3232] border-b border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#3a4040]">
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
              The stakes are high.<br />
              The brand has to <span style={{ fontStyle: 'italic', opacity: 0.6 }}>match.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-6">
              Health and medical innovation brands face a unique challenge: they must communicate both scientific authority and human empathy, often to very different audiences simultaneously.
            </p>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed">
              We understand the regulatory sensitivities, the B2B sales cycles, and the consumer trust dynamics that define this space. Our 6-year partnership with Viant Medical — spanning 24 global locations — is a testament to what sustained, strategic brand investment can achieve.
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
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>Health + MedTech in practice</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Link href={p.href} className="group block">
                  <div className="overflow-hidden aspect-[293/414]">
                    <img src={p.img} alt={p.client}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                  </div>
                  <p className="mt-3 text-[13px] leading-snug" style={{ fontFamily: SANS, fontWeight: 400, color: '#2d3232' }}>
                    {p.client}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="bg-[#2d3232] py-16 border-t border-[#3a4040] px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-10">
            <SectionLabel light>Clients We've Served</SectionLabel>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Viant Medical', 'P.Volve', 'RecoveryPlus', 'Montefiore Health System'].map((c, i) => (
              <FadeIn key={i} delay={i * 0.08} className="border-t border-[#474d4d] pt-5">
                <p className="text-[15px] text-[#f5f0eb]/70" style={{ fontFamily: SERIF }}>{c}</p>
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
            Ready to build a health brand<br />
            <span style={{ fontStyle: 'italic', opacity: 0.6 }}>people trust?</span>
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
