import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn, BtnLight } from '@/components/shared/ui';
import { CDN, VIDEO_EXPERTISE, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const DISCIPLINES = [
  { title: 'Brand Identity + Positioning',      desc: 'Logo, mark development, brand standards, naming strategy, and visual identity systems that endure.', link: 'https://hagopianink.com/work/design-branding/' },
  { title: 'Omnichannel Campaign Marketing',    desc: 'Integrated campaigns across email, print, digital, and social — strategically connected to your goals.', link: 'https://hagopianink.com/expertise/' },
  { title: 'Web Design + Development',          desc: 'UX/UI design for e-commerce and marketing sites — built to convert, easy to manage, and built to last.', link: 'https://hagopianink.com/work/ux-design/' },
  { title: 'Email Marketing + Strategy',        desc: 'Welcome series, drip campaigns, win-back flows, segmentation, and acquisition programs that deliver.', link: 'https://hagopianink.com/work/email/' },
  { title: 'Donation + Fundraising Strategy',   desc: 'Email, direct mail, and event campaign design for nonprofits — connecting giving to impact.', link: 'https://hagopianink.com/expertise/' },
  { title: 'Direct Mail + Print Media',         desc: 'From luxury look-books and annual reports to mailers that stop people in their tracks.', link: 'https://hagopianink.com/expertise/' },
];

const INDUSTRIES = [
  { industry: 'Luxury + Lifestyle',           services: 'Brand identity, omnichannel campaigns, UX design' },
  { industry: 'Fashion + Beauty',             services: 'E-commerce design, email marketing, brand strategy' },
  { industry: 'Medical + Wellness',           services: 'Brand positioning, campaign design, print + digital' },
  { industry: 'Community + Nonprofit',        services: 'Donor engagement, fundraising strategy, brand identity' },
  { industry: 'Technology + Energy',          services: 'Brand evolution, digital marketing, web design' },
  { industry: 'Entertainment + Hospitality',  services: 'Campaign marketing, email strategy, brand identity' },
];

const PROCESS = [
  { num: '01', title: 'Brand Strategy + Naming',      desc: 'Defining your positioning, voice, and what makes you distinct in your market.' },
  { num: '02', title: 'Logo + Mark Development',      desc: 'Crafting a visual identity that is distinctive, memorable, and enduring.' },
  { num: '03', title: 'Brand Standards + Guidelines', desc: 'The rulebook that keeps your brand consistent across every touchpoint.' },
  { num: '04', title: 'Documents + Imagery',          desc: 'Collateral, photography direction, and materials that bring the brand to life.' },
  { num: '05', title: 'Launch + Ongoing Expansions',  desc: 'Campaigns, digital rollout, and growth strategies to sustain momentum.' },
];

export function ExpertisePage() {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ── VIDEO HERO ────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[540px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[#2d3232]/10 z-10" />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_EXPERTISE} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-24 max-w-[1400px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-5" style={{ fontFamily: NAV_FONT }}>What We Do</p>
            <h1 className="leading-[0.95] mb-0" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
              Built on brand.<br />
              Driven by <span style={{ fontStyle: 'italic', opacity: 0.55 }}>results.</span>
            </h1>
            <p className="text-xl text-[#f5f0eb]/60 max-w-2xl leading-relaxed">
              Since 2002, we have combined consumer insight with creative execution to produce work that moves people — and moves the needle for our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SUB-PAGE NAV GRID ─────────────────────── */}
      <section className="bg-[#2d3232] py-16 md:py-20 px-6 md:px-12 border-b border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-10">
            <SectionLabel light>Explore Our Specialties</SectionLabel>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#424848]">
            {[
              { label: 'Brand Identity',        sub: 'Services',   path: '/expertise/brand-identity',        desc: 'Logo, mark development, naming strategy & visual identity systems.' },
              { label: 'Website Design',         sub: 'Services',   path: '/expertise/ux-ui-design',          desc: 'UX/UI, e-commerce & responsive web design built to convert.' },
              { label: 'Email Marketing',        sub: 'Services',   path: '/expertise/email-marketing',       desc: 'Welcome flows, campaigns, automation & list-growth programs.' },
              { label: 'Nonprofit Fundraising',  sub: 'Industries', path: '/expertise/nonprofit-fundraising', desc: 'Donor campaigns, gala design & fundraising strategy.' },
              { label: 'Health + MedTech',       sub: 'Industries', path: '/expertise/health-medtech',        desc: 'Medical device branding, digital health UX & B2B campaigns.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <Link href={item.path}
                  className="group flex flex-col justify-between bg-[#343a3a] hover:bg-[#3a4040] transition-colors duration-300 p-8 h-full cursor-pointer">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.22em] text-[#f5f0eb]/30 mb-3" style={{ fontFamily: NAV_FONT }}>{item.sub}</p>
                    <h3 className="text-xl mb-3 leading-snug group-hover:text-white transition-colors" style={{ fontFamily: SERIF, fontWeight: 700 }}>{item.label}</h3>
                    <p className="text-[13px] text-[#f5f0eb]/50 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#f5f0eb]/30 group-hover:text-[#f5f0eb]/70 transition-colors" style={{ fontFamily: NAV_FONT }}>
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              </FadeIn>
            ))}
            {/* spacer for grid alignment on last row */}
            <div className="hidden lg:block bg-[#343a3a]" />
          </div>
        </div>
      </section>

      {/* ── DISCIPLINES GRID ──────────────────────── */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel>Our Disciplines</SectionLabel>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2 className="text-5xl md:text-6xl leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                We help them with...
              </h2>
              <p className="text-lg text-[#2d3232]/60 max-w-sm leading-relaxed">
                From naming and visual identity to email acquisition and omnichannel campaigns — across every medium.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#d8d5d1]">
            {DISCIPLINES.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}
                className="group border-r border-b border-[#d8d5d1] p-9 hover:bg-white transition-colors duration-300 cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-[#444456] mb-6 group-hover:scale-150 transition-transform duration-300" />
                <h3 className="text-xl mb-4 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>{item.title}</h3>
                <p className="text-[#2d3232]/60 text-[14px] leading-relaxed mb-6">{item.desc}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.14em] flex items-center gap-2 text-[#2d3232]/40 group-hover:text-[#444456] transition-colors"
                  style={{ fontFamily: NAV_FONT }}>
                  Learn more <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDING CHAPTER ──────────────────────── */}
      <section style={{ background: '#2b1f20' }} className="py-28 md:py-44 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <SectionLabel light>Brand Identity</SectionLabel>
            <h2 className="text-4xl md:text-6xl mb-8 leading-[1.05]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Your first impression<br />is everything.
            </h2>
            <p className="text-lg text-[#f5f0eb]/65 leading-relaxed mb-8">
              A great brand is more than a logo — it is a complete visual language that communicates your values, attracts your audience, and endures across every medium. We develop brand identity systems from the ground up: naming, mark development, typography, color, brand standards, and the collateral that brings it all to life.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-12 border-t border-[#f5f0eb]/10 pt-8">
              {[
                { n: '100+', label: 'brands built' },
                { n: '20+',  label: 'years of brand expertise' },
                { n: 'W/O',  label: 'Woman owned, creatively driven' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#f5f0eb]/40" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
                </div>
              ))}
            </div>
            <BtnLight href="/expertise/brand-identity" external={false}>
              Explore Brand Identity <ArrowRight className="w-4 h-4" />
            </BtnLight>
          </FadeIn>
          <FadeIn delay={0.2} dir="left">
            <div className="aspect-[4/5] overflow-hidden" style={{ background: '#3a2728' }}>
              <img src={`${CDN}/2022/08/HI_case1_JosephRobert.jpg`} alt="Brand identity work"
                className="w-full h-full object-cover opacity-75 hover:opacity-90 transition-opacity duration-700" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── UX/UI CHAPTER ─────────────────────────── */}
      <section style={{ background: '#1e1e2a' }} className="py-28 md:py-44 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn dir="right" className="order-2 lg:order-1">
            <div className="aspect-[4/5] overflow-hidden" style={{ background: '#27273a' }}>
              <img src={`${CDN}/2022/08/HI_home2_loum.jpg`} alt="UX/UI design work"
                className="w-full h-full object-cover opacity-80 hover:opacity-95 transition-opacity duration-700" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <SectionLabel light>Website Design</SectionLabel>
            <h2 className="text-4xl md:text-6xl mb-8 leading-[1.05]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Drive action with<br />clear intention.
            </h2>
            <p className="text-lg text-[#f5f0eb]/65 leading-relaxed mb-8">
              We design digital experiences that put the consumer first — from the architecture of your information to the micro-interactions that guide a purchase. Every decision is grounded in user behavior research and brand strategy, so your site does not just look beautiful — it converts.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12 border-t border-[#f5f0eb]/10 pt-8">
              {[
                { n: '58%',  label: 'increase in unique visitors, Frette' },
                { n: '300%', label: 'increase in signup conversion' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#f5f0eb]/40 leading-snug" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
                </div>
              ))}
            </div>
            <BtnLight href="/expertise/ux-ui-design" external={false}>
              Explore UX/UI Design <ArrowRight className="w-4 h-4" />
            </BtnLight>
          </FadeIn>
        </div>
      </section>

      {/* ── EMAIL MARKETING CHAPTER ───────────────── */}
      <section className="bg-[#f1efef] text-[#2d3232] py-28 md:py-44 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <SectionLabel>Email Marketing</SectionLabel>
            <h2 className="text-4xl md:text-6xl mb-8 leading-[1.05]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Harness the power of<br />your email sends.
            </h2>
            <p className="text-lg text-[#2d3232]/65 leading-relaxed mb-8">
              Flawless aesthetics and strategic messaging increase conversions and create brand loyalty. We handle every facet of email marketing — from template design and copywriting to automation flows, segmentation strategy, and program management. Our clients include Fortune 50 brands and emerging DTC companies alike.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 border-t border-[#2d3232]/10 pt-8">
              {[
                { n: '1,030%', label: 'email list growth in 6 months', client: 'P.Volve' },
                { n: '40%+',   label: 'average open rate',              client: 'Multiple clients' },
                { n: '$56K',   label: 'new sales from automations',     client: 'Cannadips' },
                { n: '$54K',   label: 'in new sales, one campaign',     client: 'Frette' },
              ].map((s, i) => (
                <div key={i} className="border-t border-[#2d3232]/10 pt-5">
                  <div className="text-2xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.1em] text-[#2d3232]/50 leading-snug mb-1">{s.label}</div>
                  <div className="text-[10px] text-[#a57b83]" style={{ fontFamily: NAV_FONT }}>{s.client}</div>
                </div>
              ))}
            </div>
            <Btn href="/expertise/email-marketing" external={false}>
              Explore Email Marketing <ArrowRight className="w-4 h-4" />
            </Btn>
          </FadeIn>
          <FadeIn delay={0.2} dir="left">
            <div className="aspect-[4/5] overflow-hidden bg-[#e0ddd9]">
              <img src={`${CDN}/2018/09/pepsi-1537458269464-3078.png`} alt="Email marketing work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── HEALTH + MEDTECH SPECIALTY ────────────── */}
      <section style={{ background: '#0d1f1f' }} className="py-28 md:py-44 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="inline-block bg-[#f5f0eb] text-[#0d1f1f] text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] mb-8" style={{ fontFamily: NAV_FONT }}>
              Specialty Practice
            </div>
            <h2 className="text-4xl md:text-6xl mb-8 leading-[1.05]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Building bold brands<br />for the future of health.
            </h2>
            <p className="text-lg text-[#f5f0eb]/65 leading-relaxed mb-6">
              We translate complex science and medical innovation into compelling, trustworthy brands — from medical device manufacturers to digital health startups, cardiac rehab platforms to nonprofit health initiatives.
            </p>
            <p className="text-lg text-[#f5f0eb]/65 leading-relaxed mb-12">
              Our 6-year "In It for Life" campaign partnership with Viant Medical brought their brand to life across print trade media, targeted email, and digital display, building lasting credibility with an executive audience across 24 global locations.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-12">
              {[
                { n: '6 yrs', label: 'Viant Medical partnership' },
                { n: '24',    label: 'global locations reached' },
                { n: 'B2B',   label: '+ B2C health brands' },
              ].map((s, i) => (
                <div key={i} className="border-t border-[#f5f0eb]/15 pt-5">
                  <div className="text-3xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#f5f0eb]/40" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
                </div>
              ))}
            </div>
            <BtnLight href="/expertise/health-medtech" external={false}>
              Explore Health + MedTech <ArrowRight className="w-4 h-4" />
            </BtnLight>
          </FadeIn>
          <FadeIn delay={0.2} dir="left">
            <div className="aspect-[3/4] overflow-hidden" style={{ background: '#142222' }}>
              <img src={`${CDN}/2022/08/HI_case1_JosephRobert.jpg`} alt="Health + MedTech brand work"
                className="w-full h-full object-cover opacity-65" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1f]/70 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xl italic text-[#f5f0eb]" style={{ fontFamily: SERIF }}>
                  "My speed to market can help speed her recovery. I'm in it for life."
                </p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#f5f0eb]/50 mt-3" style={{ fontFamily: NAV_FONT }}>— Viant Medical campaign</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── NONPROFIT SPECIALTY ───────────────────── */}
      <section style={{ background: '#1a1208' }} className="py-28 md:py-44 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn dir="right" className="order-2 lg:order-1">
            <div className="aspect-[3/4] overflow-hidden" style={{ background: '#251a0a' }}>
              <img src={`${CDN}/2022/09/HI_Web_BLM_header-scaled2.jpg`} alt="Nonprofit fundraising work"
                className="w-full h-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/60 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="text-4xl font-light text-[#f5f0eb] mb-1" style={{ fontFamily: SERIF }}>329%</div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-[#f5f0eb]/60" style={{ fontFamily: NAV_FONT }}>more dollars raised — Montefiore</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <div className="inline-block bg-[#f5f0eb] text-[#1a1208] text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] mb-8" style={{ fontFamily: NAV_FONT }}>
              Specialty Practice
            </div>
            <h2 className="text-4xl md:text-6xl mb-8 leading-[1.05]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Building bold brands<br />for a new era of impact.
            </h2>
            <p className="text-lg text-[#f5f0eb]/65 leading-relaxed mb-12">
              We help nonprofits build clear, consistent brands that inspire confidence — and then we build the digital fundraising engines to put them to work. From quarterly magazines and multi-template email programs to gala invitation systems and major donor engagement campaigns.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {[
                { n: '329%',   label: 'more dollars raised', client: 'Montefiore' },
                { n: '180%',   label: 'increase in online donations', client: 'Epilepsy Foundation' },
                { n: '100+',   label: 'additional gala attendees', client: 'Montefiore' },
                { n: '$22.2M', label: 'raised at Annual Gala', client: 'Montefiore' },
              ].map((s, i) => (
                <div key={i} className="border-t border-[#f5f0eb]/15 pt-5">
                  <div className="text-3xl mb-1" style={{ fontFamily: SERIF }}>{s.n}</div>
                  <div className="text-[11px] uppercase tracking-[0.1em] text-[#f5f0eb]/45 leading-snug" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
                </div>
              ))}
            </div>
            <BtnLight href="/expertise/nonprofit-fundraising" external={false}>
              Explore Nonprofit Fundraising <ArrowRight className="w-4 h-4" />
            </BtnLight>
          </FadeIn>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────── */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 md:py-36 px-6 md:px-12 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel>Who We Work With</SectionLabel>
            <h2 className="text-5xl md:text-6xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>We work with clients in...</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#d8d5d1]">
            {INDUSTRIES.map((area, i) => (
              <FadeIn key={i} delay={i * 0.08}
                className="group border-r border-b border-[#d8d5d1] p-9 hover:bg-white transition-colors duration-300">
                <h3 className="text-xl mb-3 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>{area.industry}</h3>
                <p className="text-[#2d3232]/55 text-[13px] leading-relaxed">{area.services}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ─────────────────────────── */}
      <section className="bg-[#2d3232] py-24 md:py-36 px-6 md:px-12 border-t border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel light>How We Begin</SectionLabel>
            <h2 className="text-5xl md:text-6xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              How can we begin your<br />new brand development?
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {PROCESS.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}
                className="border-t-2 border-[#f5f0eb]/10 pt-8 hover:border-[#a57b83] transition-colors duration-300 group">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#f5f0eb]/30 mb-4" style={{ fontFamily: NAV_FONT }}>{step.num}</div>
                <h3 className="text-lg mb-3 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>{step.title}</h3>
                <p className="text-[#f5f0eb]/50 text-[13px] leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="bg-[#2d3232] py-28 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-6" style={{ fontFamily: NAV_FONT }}>Start a Conversation</p>
          <h2 className="text-5xl md:text-7xl mb-10 leading-[0.95]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Good design is<br />good business.
          </h2>
          <BtnLight href="https://hagopianink.com/contact/">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </BtnLight>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
