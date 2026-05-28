'use client';

import React from 'react';
import { motion as _motion, type MotionProps } from 'framer-motion';
import type { ComponentPropsWithRef, FC } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn, BtnLight } from '@/components/shared/ui';
import { HeroOverlay } from '@/components/shared/HeroOverlay';
import { CDN, VIDEO_EXPERTISE, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES, PHOTO_LUXURY, PHOTO_MEDTECH } from '@/lib/brand';

// Typed wrappers to fix React 19 / framer-motion className inference gap
type DivMotion = ComponentPropsWithRef<'div'> & MotionProps;
const motion = {
  ..._motion,
  div: _motion.div as unknown as FC<DivMotion>,
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const DISCIPLINES = [
  { title: 'Brand Identity + Positioning',    desc: 'Logo, mark development, brand standards, naming strategy, and visual identity systems that endure.',                       link: '/expertise/brand-identity' },
  { title: 'Omnichannel Campaign Marketing',  desc: 'Integrated campaigns across email, print, digital, and social — strategically connected to your goals.',                   link: '/work' },
  { title: 'Web Design + Development',        desc: 'UX/UI design for e-commerce and marketing sites — built to convert, easy to manage, and built to last.',                   link: '/expertise/ux-ui-design' },
  { title: 'Email Marketing + Strategy',      desc: 'Welcome series, drip campaigns, win-back flows, segmentation, and acquisition programs that deliver.',                     link: '/expertise/email-marketing' },
  { title: 'Donation + Fundraising Strategy', desc: 'Email, direct mail, and event campaign design for nonprofits — connecting giving to impact.',                              link: '/expertise/nonprofit-fundraising' },
  { title: 'Direct Mail + Print Media',       desc: 'From luxury look-books and annual reports to mailers that stop people in their tracks.',                                   link: '/work' },
];

const INDUSTRIES = [
  { industry: 'Luxury + Lifestyle',          services: 'Brand identity, omnichannel campaigns, UX design' },
  { industry: 'Fashion + Beauty',            services: 'E-commerce design, email marketing, brand strategy' },
  { industry: 'Medical + Wellness',          services: 'Brand positioning, campaign design, print + digital' },
  { industry: 'Community + Nonprofit',       services: 'Donor engagement, fundraising strategy, brand identity' },
  { industry: 'Technology + Energy',         services: 'Brand evolution, digital marketing, web design' },
  { industry: 'Entertainment + Hospitality', services: 'Campaign marketing, email strategy, brand identity' },
];

export function ExpertiseContent() {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* VIDEO HERO */}
      <section className="relative h-[70vh] min-h-[540px] flex flex-col justify-end overflow-hidden">
        <HeroOverlay />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_EXPERTISE} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-24 max-w-[1400px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-5" style={{ fontFamily: NAV_FONT }}>What We Do</p>
            <h1 className="text-5xl md:text-7xl leading-[0.92] mb-8 text-white" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Built by design.<br />
              Driven by <span style={{ fontStyle: 'italic', opacity: 0.55 }}>results.</span>
            </h1>
            <p className="text-xl text-[#f5f0eb]/60 max-w-2xl leading-relaxed">
              Since 2002, we have combined audience insight, thoughtful creative, and strong design principles to develop work that strengthens perception and supports real business goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHO + WHAT */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel>Who We Work With</SectionLabel>
            <h2 className="text-3xl md:text-4xl leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              We work with organizations in
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-24">
            {INDUSTRIES.map((area, i) => (
              <FadeIn key={i} delay={i * 0.06} className="group py-6 border-t-[1.5px] border-[#2d3232]/15 hover:border-t-[3px] hover:border-[#2d3232] pr-10 transition-[border-color,border-width] duration-200 cursor-default">
                <h3 className="text-[17px] font-semibold text-[#2d3232] leading-snug mb-1" style={{ fontFamily: SERIF }}>{area.industry}</h3>
                <p className="text-[13px] text-[#2d3232]/70 leading-relaxed">{area.services}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mb-16">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-3xl md:text-4xl leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              We help you design
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {DISCIPLINES.map((item, i) => (
              <FadeIn key={i} delay={i * 0.06} className="group py-6 border-t-[1.5px] border-[#2d3232]/15 hover:border-t-[3px] hover:border-[#2d3232] pr-10 transition-[border-color,border-width] duration-200">
                <h3 className="text-[17px] font-semibold text-[#2d3232] leading-snug mb-1" style={{ fontFamily: SERIF }}>{item.title}</h3>
                <p className="text-[13px] text-[#2d3232]/70 leading-relaxed mb-3">{item.desc}</p>
                <Link href={item.link}
                  className="text-[10px] uppercase tracking-[0.14em] flex items-center gap-1.5 text-[#2d3232]/70 group-hover:text-[#2d3232] transition-colors"
                  style={{ fontFamily: NAV_FONT }}>
                  Learn more <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDING CHAPTER */}
      <section className="bg-white text-[#2d3232] py-28 md:py-44 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <SectionLabel>Brand Identity</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-8 leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Your first impression<br />is everything.
            </h2>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-8">
              A great brand is more than a logo — it is a complete visual language that communicates your values, attracts your audience, and endures across every medium.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12 border-t border-[#2d3232]/10 pt-8">
              {[
                { n: '2002', label: 'Founded in New York City' },
                { n: 'W/O',  label: 'Woman Owned, Creatively Driven.' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#2d3232]/70" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
                </div>
              ))}
            </div>
            <Btn href="/expertise/brand-identity" external={false}>
              Explore Brand Identity <ArrowRight className="w-4 h-4" />
            </Btn>
          </FadeIn>
          <FadeIn delay={0.2} dir="left">
            <div className="aspect-[1/1] max-w-[80%] overflow-hidden bg-[#343a3a]">
              <img src={`${CDN}/2022/08/HI_case1_JosephRobert.jpg`} alt="Brand identity work"
                className="w-full h-full object-cover opacity-75 hover:opacity-90 transition-opacity duration-700" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* UX/UI CHAPTER */}
      <section className="bg-[#f1efef] text-[#2d3232] py-28 md:py-44 px-6 md:px-12 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn dir="right" className="order-2 lg:order-1">
            <div className="aspect-[1/1] max-w-[80%] overflow-hidden bg-[#e0ddd9]">
              <img src="https://hagopianink.com/wp-content/uploads/2026/05/Expertise_website.jpg" alt="UX/UI design work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <SectionLabel>Website Design</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-8 leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Drive action with<br />clear intention.
            </h2>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-8">
              We design digital experiences that put the consumer first — from the architecture of your information to the micro-interactions that guide a purchase.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12 border-t border-[#2d3232]/10 pt-8">
              {[
                { n: '58%', label: 'increase in unique visitors', client: 'Frette' },
                { n: '3x',  label: 'increase in online sales',    client: 'MSG Suites' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#2d3232]/70 leading-snug mb-1" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
                  <div className="text-[10px] text-[#2d3232]/45" style={{ fontFamily: SANS }}>{s.client}</div>
                </div>
              ))}
            </div>
            <Btn href="/expertise/ux-ui-design" external={false}>
              Explore UX/UI Design <ArrowRight className="w-4 h-4" />
            </Btn>
          </FadeIn>
        </div>
      </section>

      {/* EMAIL MARKETING CHAPTER */}
      <section className="bg-white text-[#2d3232] py-28 md:py-44 px-6 md:px-12 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <SectionLabel>Email Marketing</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-8 leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Harness the power of<br />your email sends.
            </h2>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-8">
              Flawless aesthetics and strategic messaging increase conversions and create brand loyalty. We handle every facet of email marketing.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 border-t border-[#2d3232]/10 pt-8">
              {[
                { n: '1,030%', label: 'email list growth in 6 months', client: 'P.Volve' },
                { n: '49.5%',  label: 'average open rate',              client: 'P.Volve' },
                { n: '$56K',   label: 'new sales from automations',     client: 'Cannadips' },
              ].map((s, i) => (
                <div key={i} className="border-t border-[#2d3232]/10 pt-5">
                  <div className="text-2xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.1em] text-[#2d3232]/70 leading-snug mb-1">{s.label}</div>
                  <div className="text-[10px] text-[#2d3232]/45" style={{ fontFamily: SANS }}>{s.client}</div>
                </div>
              ))}
            </div>
            <Btn href="/expertise/email-marketing" external={false}>
              Explore Email Marketing <ArrowRight className="w-4 h-4" />
            </Btn>
          </FadeIn>
          <FadeIn delay={0.2} dir="left">
            <div className="aspect-[1/1] max-w-[80%] overflow-hidden bg-[#e0ddd9]">
              <img src="https://hagopianink.com/wp-content/uploads/2026/05/expertise_email.jpg" alt="Email marketing work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LUXURY + LIFESTYLE */}
      <section className="bg-[#f1efef] text-[#2d3232] py-28 md:py-44 px-6 md:px-12 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn dir="right" className="order-2 lg:order-1">
            <div className="aspect-[1/1] max-w-[80%] overflow-hidden bg-[#e0ddd9]">
              <img src={PHOTO_LUXURY} alt="Luxury brand work"
                className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-700" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <div className="inline-block bg-[#2d3232] text-[#f5f0eb] text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] mb-8" style={{ fontFamily: NAV_FONT }}>
              Specialty: Luxury + Lifestyle
            </div>
            <h2 className="text-3xl md:text-4xl mb-8 leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Where we started.<br />The DNA of everything<br /><span style={{ fontStyle: 'italic', opacity: 0.6 }}>we do.</span>
            </h2>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-6">
              Luxury and lifestyle is where Hagopian Ink was born. From Burberry's first e-commerce site to Todd &amp; Duncan's US brand launch, from La Perla's Valentine's Day campaigns to Lancome's viral House of Color activation.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-12">
              {[
                { n: '30%',   label: "increase in Valentine's Day sales", client: 'La Perla' },
                { n: '12K',   label: 'new email opt-ins',                 client: 'Frette' },
                { n: '2.93M', label: 'Facebook followers',                client: 'Lancome' },
              ].map((s, i) => (
                <div key={i} className="border-t border-[#2d3232]/15 pt-5">
                  <div className="text-3xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#2d3232]/70 leading-snug mb-1" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
                  <div className="text-[10px] text-[#2d3232]/45" style={{ fontFamily: SANS }}>{s.client}</div>
                </div>
              ))}
            </div>
            <Btn href="/expertise/luxury-lifestyle" external={false}>
              Explore Luxury + Lifestyle <ArrowRight className="w-4 h-4" />
            </Btn>
          </FadeIn>
        </div>
      </section>

      {/* HEALTH + MEDTECH */}
      <section className="bg-white text-[#2d3232] py-28 md:py-44 px-6 md:px-12 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <div className="inline-block bg-[#2d3232] text-[#f5f0eb] text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] mb-8" style={{ fontFamily: NAV_FONT }}>
              Specialty: Health + MedTech
            </div>
            <h2 className="text-3xl md:text-4xl mb-8 leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Innovating the brands<br />behind the future of health.
            </h2>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-12">
              We translate complex science and medical innovation into compelling, trustworthy brands — from medical device manufacturers to digital health startups.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-12">
              {[
                { n: '6 yrs', label: 'Viant Medical brand partnership' },
                { n: '12+',   label: 'Companies unified under one Aptyx brand' },
                { n: '7',     label: 'Medtech websites developed in 5 years' },
              ].map((s, i) => (
                <div key={i} className="border-t border-[#2d3232]/15 pt-5">
                  <div className="text-3xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#2d3232]/70 leading-snug mb-1" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
                  {'client' in s && <div className="text-[10px] text-[#2d3232]/45" style={{ fontFamily: SANS }}>{(s as { client: string }).client}</div>}
                </div>
              ))}
            </div>
            <Btn href="/expertise/health-medtech" external={false}>
              Explore Health + MedTech <ArrowRight className="w-4 h-4" />
            </Btn>
          </FadeIn>
          <FadeIn delay={0.2} dir="left">
            <div className="relative aspect-[1/1] max-w-[80%] overflow-hidden bg-[#e0ddd9]">
              <img src={PHOTO_MEDTECH} alt="Health + MedTech brand work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* NONPROFIT */}
      <section className="bg-[#f1efef] text-[#2d3232] py-28 md:py-44 px-6 md:px-12 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn dir="right" className="order-2 lg:order-1">
            <div className="relative aspect-[1/1] max-w-[80%] overflow-hidden bg-[#e0ddd9]">
              <img src="https://hagopianink.com/wp-content/uploads/2026/05/expertise_nonprofit.jpg" alt="Nonprofit fundraising work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <div className="inline-block bg-[#2d3232] text-[#f5f0eb] text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] mb-8" style={{ fontFamily: NAV_FONT }}>
              Specialty: Nonprofit Fundraising
            </div>
            <h2 className="text-3xl md:text-4xl mb-8 leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Building bold brands<br />for a new era of impact.
            </h2>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-12">
              We help nonprofits build the brands that inspire confidence and the fundraising programs that inspire giving.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-12">
              {[
                { n: '329%',   label: 'more dollars raised',         client: 'Montefiore' },
                { n: '180%',   label: 'increase in online donations', client: 'Epilepsy Foundation' },
                { n: '$22.2M', label: 'raised at Annual Gala',        client: 'Montefiore' },
              ].map((s, i) => (
                <div key={i} className="border-t border-[#2d3232]/15 pt-5">
                  <div className="text-3xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.1em] text-[#2d3232]/70 leading-snug mb-1" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
                  <div className="text-[10px] text-[#2d3232]/45" style={{ fontFamily: SANS }}>{s.client}</div>
                </div>
              ))}
            </div>
            <Btn href="/expertise/nonprofit-fundraising" external={false}>
              Explore Nonprofit Fundraising <ArrowRight className="w-4 h-4" />
            </Btn>
          </FadeIn>
        </div>
      </section>

      {/* EXPLORE OUR SPECIALTIES */}
      <section className="bg-[#2d3232] py-16 md:py-20 px-6 md:px-12 border-t border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-10">
            <SectionLabel light>Explore Our Specialties</SectionLabel>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#424848]">
            {[
              { label: 'Brand Identity',       sub: 'Services',   path: '/expertise/brand-identity',       desc: 'Logo, mark development, naming strategy & visual identity systems.' },
              { label: 'Website Design',        sub: 'Services',   path: '/expertise/ux-ui-design',         desc: 'UX/UI, e-commerce & responsive web design built to convert.' },
              { label: 'Email Marketing',       sub: 'Services',   path: '/expertise/email-marketing',      desc: 'Welcome flows, campaigns, automation & list-growth programs.' },
              { label: 'Luxury + Lifestyle',    sub: 'Industries', path: '/expertise/luxury-lifestyle',     desc: 'Fashion, beauty & luxury brand identity, campaigns & e-commerce.' },
              { label: 'Health + MedTech',      sub: 'Industries', path: '/expertise/health-medtech',       desc: 'Medical device branding, digital health UX & B2B campaigns.' },
              { label: 'Nonprofit Fundraising', sub: 'Industries', path: '/expertise/nonprofit-fundraising',desc: 'Donor campaigns, gala design & fundraising strategy.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <Link href={item.path}
                  className="group flex flex-col justify-between bg-[#343a3a] hover:bg-[#3a4040] transition-colors duration-300 p-8 h-full cursor-pointer">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-3" style={{ fontFamily: NAV_FONT }}>{item.sub}</p>
                    <h3 className="text-xl mb-3 leading-snug group-hover:text-white transition-colors" style={{ fontFamily: SERIF, fontWeight: 700 }}>{item.label}</h3>
                    <p className="text-[13px] text-[#f5f0eb]/60 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#f5f0eb]/60 group-hover:text-[#f5f0eb]/70 transition-colors" style={{ fontFamily: NAV_FONT }}>
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2d3232] py-28 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-6" style={{ fontFamily: NAV_FONT }}>Start a Conversation</p>
          <h2 className="text-5xl md:text-7xl mb-10 leading-[0.95]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Good design is<br />good business.
          </h2>
          <BtnLight href="/contact" external={false}>
            Get in Touch <ArrowRight className="w-4 h-4" />
          </BtnLight>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
