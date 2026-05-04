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
  { title: 'UX Research + Strategy',         desc: 'User journeys, competitive benchmarking, and conversion analysis before a single wireframe is drawn.' },
  { title: 'E-Commerce Design',              desc: 'Luxury-caliber shopping experiences that reduce bounce, increase basket size, and build brand loyalty.' },
  { title: 'Responsive Web Design',          desc: 'Pixel-perfect, mobile-first design that performs beautifully on every device and screen.' },
  { title: 'Landing Pages + Microsites',     desc: 'Focused experiences built for a single goal: sign-up, purchase, download, or contact.' },
  { title: 'UX Audit + CX Optimization',     desc: 'We assess existing digital properties and identify friction points costing you conversions.' },
  { title: 'Brand-to-Web Translation',       desc: 'Every visual identity we build is designed to extend seamlessly into the digital environment.' },
];

const BASE = import.meta.env.BASE_URL;

const PROJECTS = [
  {
    client: 'Loum Beauty',
    category: 'Website Design',
    headline: 'Luxury e-commerce that converts',
    result: "Clarified brand story, reduced bounce rate, and increased consumer connection for a premium beauty brand — creating an e-commerce experience that matched the product's quality.",
    img: `${CDN}/2022/08/Work-Thumb_loum2-724x1024-1-293x414.jpg`,
    href: '/work/loumbeauty',
  },
  {
    client: 'Gwynnie Bee',
    category: 'Subscription Acquisition + UX',
    headline: '300% increase in signup conversion',
    result: 'Redesigned the acquisition funnel and landing experience for a subscription fashion service, delivering a 300% lift in new member sign-ups.',
    img: `${CDN}/2018/08/Work-Thumb_gwynnie-293x414.jpg`,
    href: '/work/gwynnie-bee-subscription-acquisition-email',
  },
  {
    client: 'Diamonds In Glass',
    category: 'Luxury Jewelry Website',
    headline: 'A luxury experience for luxury diamonds.',
    result: 'Designed and built an immersive digital experience for a premier luxury jewelry concept — refined, conversion-focused, and built to match the caliber of the product.',
    img: `${CDN}/2018/08/Work-Thumb_DIG-293x414.jpg`,
    href: '/work/diamonds-in-glass-luxury-jewelry-website',
  },
  {
    client: 'RecoveryPlus',
    category: 'Brand Identity + Mobile App UX',
    headline: 'Recover your health. Reclaim your life.',
    result: 'Designed the complete mobile app UX/UI and marketing website for a clinically proven remote cardiac rehab platform — guiding patients from diagnosis through active recovery.',
    img: `${BASE}case-studies/recoveryplus/hero.png`,
    href: '/work/recoveryplus-health-brand',
  },
];

export function UxUiDesignPage() {
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
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-5" style={{ fontFamily: NAV_FONT }}>Website Design</p>
            <h1 className="leading-[0.95] mb-8 text-white" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
              Drive action with<br />
              <span style={{ fontStyle: 'italic', opacity: 0.55 }}>clear intention.</span>
            </h1>
            <p className="text-lg text-[#f5f0eb]/80 max-w-2xl leading-relaxed">
              We place the consumer's needs first for beautiful, effortless online experiences. From first click to checkout — designed to convert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#2d3232] border-b border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 divide-x divide-[#3a4040]">
          {[
            { n: '58%',   label: 'Increase in website unique visitors — Frette' },
            { n: '12K',   label: 'New email opt-ins from UX campaign — Frette' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} className="py-10 px-8 text-center">
              <div className="text-4xl md:text-5xl mb-2 font-light" style={{ fontFamily: SERIF }}>{s.n}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#f5f0eb]/45" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
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
              From luxury fashion e-commerce to B2B lead-generation sites, we have designed digital properties that reduced friction, deepened engagement, and moved the needle on the metrics that matter.
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
                <p className="text-[14px] text-[#2d3232]/60 leading-relaxed">{c.desc}</p>
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
