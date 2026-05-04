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
  { title: 'Email Strategy + Planning',       desc: 'Audience segmentation, send cadence, lifecycle mapping, and content calendars that maximize every send.' },
  { title: 'Welcome + Onboarding Series',     desc: 'First impressions matter. We build welcome flows that convert new subscribers into loyal customers.' },
  { title: 'Automated Flows + Triggers',      desc: 'Abandoned cart, browse abandonment, win-back, and post-purchase sequences that work while you sleep.' },
  { title: 'Campaign Design + Copywriting',   desc: 'Promotions, product launches, seasonal campaigns — designed to stop the scroll and drive the click.' },
  { title: 'List Growth + Acquisition',       desc: 'Pop-up strategy, opt-in design, and lead magnet programs that grow a clean, engaged list.' },
  { title: 'Reporting + Optimization',        desc: 'A/B testing, performance reporting, and ongoing refinement to keep open rates climbing.' },
];

const PROJECTS = [
  {
    client: 'Pepsi',
    category: 'Fortune 50 Email Marketing',
    headline: 'Enterprise email for one of the world\'s biggest brands',
    result: 'Designed and produced high-volume email campaigns for PepsiCo — balancing strict brand governance with creative engagement across millions of subscribers.',
    img: `${CDN}/2018/08/Work-Thumb_pepsi-293x414.jpg`,
    href: '/work/pepsi-email-marketing',
  },
  {
    client: 'Sesame Street',
    category: 'Mobile Email Design',
    headline: 'Mobile-first email for an iconic brand',
    result: 'Crafted mobile-optimized email campaigns for Sesame Street — translating a beloved children\'s brand into engaging digital communications that delighted subscribers of all ages.',
    img: `${CDN}/2018/08/Work-Thumb_sesame-293x414.jpg`,
    href: '/work/sesame-street-mobile-email',
  },
  {
    client: 'Audible',
    category: 'Email Marketing + Reactivation',
    headline: 'Reactivating a waning subscriber base',
    result: 'Re-engaged an audience with declining engagement through a strategic win-back campaign — restoring subscriber activity and reinforcing ongoing subscription value.',
    img: `${CDN}/2022/07/Work-Thumb_audible-293x414.jpg`,
    href: '/work/audible-email-design',
  },
  {
    client: 'Melissa Kaye Jewelry',
    category: 'Luxury Email Marketing',
    headline: 'Jewelry as beautiful as the emails that sell it.',
    result: 'Designed an elevated email program for Melissa Kaye — a New York fine jewelry brand — pairing editorial-quality imagery with campaign strategy to engage discerning luxury buyers.',
    img: `${CDN}/2018/08/Work-Thumb_melissa-293x414.jpg`,
    href: '/work/melissa-kaye-luxury-jewelry-email-design',
  },
];

export function EmailMarketingPage() {
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
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-5" style={{ fontFamily: NAV_FONT }}>Email Marketing</p>
            <h1 className="leading-[0.95] mb-8 text-white" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
              Harness the power<br />
              of your <span style={{ fontStyle: 'italic', opacity: 0.55 }}>email sends.</span>
            </h1>
            <p className="text-lg text-[#f5f0eb]/80 max-w-2xl leading-relaxed">
              Flawless aesthetics and messaging increase conversions and create brand loyalty. See why Fortune 50 companies trust us with their email programs year after year.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#2d3232] border-b border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-x divide-[#3a4040]">
          {[
            { n: '1,030%', label: 'Email list growth in 6 months — P.Volve' },
            { n: '49.5%',  label: 'Average open rate achieved — P.Volve' },
            { n: '20+ yrs', label: 'Designing email for Fortune 50 brands' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} className="py-10 px-6 text-center">
              <div className="text-3xl md:text-4xl mb-2 font-light" style={{ fontFamily: SERIF }}>{s.n}</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-[#f5f0eb]/45" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
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
              Email done right<br />
              is a <span style={{ fontStyle: 'italic', opacity: 0.6 }}>growth engine.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-6">
              We have been designing and strategizing email programs for Fortune 50 brands and fast-growing startups since 2002. Email is the highest-ROI channel in digital marketing — and the most unforgiving when it's done poorly.
            </p>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed">
              Our approach combines beautiful design with rigorous strategy: the right message, to the right audience, at exactly the right moment. Every flow we build is designed to grow with your business.
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
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>Email programs that deliver</h2>
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
            Ready to turn your email list<br />
            into a <span style={{ fontStyle: 'italic', opacity: 0.6 }}>revenue engine?</span>
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
