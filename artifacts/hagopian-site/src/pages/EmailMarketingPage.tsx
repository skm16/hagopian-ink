import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
    client: 'P.Volve',
    category: 'Email Marketing + List Growth',
    headline: '1,030% email list growth in 6 months',
    result: 'Built a full email program from the ground up — welcome series, automated flows, and campaign calendar. Achieved 49.5% average open rates and 1,030% list growth in 6 months.',
    img: `${CDN}/2018/09/pepsi-1537458269464-3078.png`,
    href: 'https://hagopianink.com/works/pepsi-email-marketing/',
  },
  {
    client: 'Audible',
    category: 'Email Marketing + Reactivation',
    headline: 'Reactivating a waning subscriber base',
    result: 'Re-engaged an audience with declining engagement through a strategic win-back campaign — restoring subscriber activity and reinforcing ongoing subscription value.',
    img: `${CDN}/2022/09/HI_case3_audible.jpg`,
    href: 'https://hagopianink.com/works/audible-email-design/',
  },
  {
    client: 'Cannadips',
    category: 'Email Automation',
    headline: '$56K in new sales from automated flows',
    result: 'Designed and deployed a suite of automated email flows for a DTC brand — generating $56K in attributable new sales within the first 4 months of deployment.',
    img: `${CDN}/2022/08/HI_case1_JosephRobert.jpg`,
    href: 'https://hagopianink.com/blog/',
  },
];

export function EmailMarketingPage() {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* VIDEO HERO */}
      <section className="relative h-[70vh] min-h-[540px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[#060810]/20 z-10" />
        <video autoPlay loop muted playsInline poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_MP4} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-24 max-w-[1400px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-5" style={{ fontFamily: NAV_FONT }}>Email Marketing</p>
            <h1 className="leading-[0.95] mb-6" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
              Harness the power<br />
              <span style={{ fontStyle: 'italic', opacity: 0.55 }}>of your email sends.</span>
            </h1>
            <p className="text-lg text-[#f5f0eb]/65 max-w-2xl leading-relaxed">
              Flawless aesthetics and messaging increase conversions and create brand loyalty. See why Fortune 50 companies trust us with their email programs year after year.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0a0a0a] border-b border-[#191919]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#191919]">
          {[
            { n: '1,030%', label: 'Email list growth in 6 months — P.Volve' },
            { n: '49.5%',  label: 'Average open rate achieved — P.Volve' },
            { n: '$56K',   label: 'New sales from automations in 4 months — Cannadips' },
            { n: '5–10%',  label: 'Lift in online sales from email — Cannadips' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} className="py-10 px-6 text-center">
              <div className="text-3xl md:text-4xl mb-2 font-light" style={{ fontFamily: SERIF }}>{s.n}</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-[#f5f0eb]/45" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="bg-[#f1efef] text-[#0a0a0a] py-24 md:py-36 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-4xl md:text-5xl leading-[1.05] mb-8" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Email done right<br />
              <span style={{ fontStyle: 'italic', opacity: 0.6 }}>is a growth engine.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#0a0a0a]/70 leading-relaxed mb-6">
              We have been designing and strategizing email programs for Fortune 50 brands and fast-growing startups since 2002. Email is the highest-ROI channel in digital marketing — and the most unforgiving when it's done poorly.
            </p>
            <p className="text-lg text-[#0a0a0a]/70 leading-relaxed">
              Our approach combines beautiful design with rigorous strategy: the right message, to the right audience, at exactly the right moment. Every flow we build is designed to grow with your business.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-[#f1efef] text-[#0a0a0a] pb-24 md:pb-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>What we deliver</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {CAPABILITIES.map((c, i) => (
              <FadeIn key={i} delay={i * 0.07} className="border-t border-[#0a0a0a]/12 pt-7">
                <h3 className="text-lg mb-3 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>{c.title}</h3>
                <p className="text-[14px] text-[#0a0a0a]/60 leading-relaxed">{c.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-[#0a0a0a] py-24 md:py-36 px-8 md:px-16 border-t border-[#191919]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel light>Featured Work</SectionLabel>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>Email programs that deliver</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.12} className="group">
                <div className="overflow-hidden mb-6">
                  <img src={p.img} alt={p.client}
                    className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5f0eb]/40 mb-2" style={{ fontFamily: NAV_FONT }}>{p.category}</p>
                <h3 className="text-xl mb-3 leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>{p.headline}</h3>
                <p className="text-[13px] text-[#f5f0eb]/60 leading-relaxed mb-5">{p.result}</p>
                <a href={p.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#f5f0eb]/50 hover:text-[#f5f0eb] border-b border-[#f5f0eb]/20 hover:border-[#f5f0eb] pb-1 transition-all duration-300"
                  style={{ fontFamily: NAV_FONT }}>
                  View Project <ArrowRight className="w-3 h-3" />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f1efef] text-[#0a0a0a] py-24 px-8 text-center border-t border-[#e0ddd9]">
        <FadeIn>
          <SectionLabel>Start a Project</SectionLabel>
          <h2 className="text-4xl md:text-5xl mb-8 leading-[1.0]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ready to turn your email list<br />
            <span style={{ fontStyle: 'italic', opacity: 0.6 }}>into a revenue engine?</span>
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
