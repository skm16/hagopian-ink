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
  { title: 'Nonprofit Brand Identity',         desc: 'Clear, credible brand systems that inspire donor confidence and differentiate your mission in a crowded space.' },
  { title: 'Donor Email Programs',             desc: 'Acquisition, stewardship, and appeal campaigns designed to educate, activate, and sustain giving over time.' },
  { title: 'Gala + Event Design',              desc: 'Invitation suites, event branding, signage, and program design for galas and fundraising events.' },
  { title: 'Online Fundraising Campaigns',     desc: 'Year-end appeals, matching gift campaigns, and peer-to-peer email strategies built for results.' },
  { title: 'Impact Reports + Magazines',       desc: 'Annual reports, donor magazines, and quarterly publications that deepen relationships and showcase impact.' },
  { title: 'Direct Mail + Print',              desc: 'High-impact direct mail that reaches major donors, board members, and community stakeholders.' },
];

const STATS = [
  { n: '329%',   label: 'More dollars raised — Montefiore' },
  { n: '180%',   label: 'Increase in online donations — Epilepsy Foundation' },
  { n: '$22.2M', label: 'Raised at annual gala — Montefiore' },
];

const PROJECTS = [
  {
    client: 'Montefiore Einstein',
    category: 'Healthcare Fundraising Design',
    headline: '329% more dollars raised — and $22.2M at a single gala.',
    result: 'Designed a multi-year fundraising program for one of New York\'s most respected health systems — spanning donor emails, gala invitations, newsletters, and event branding that raised $22.2M.',
    img: `${CDN}/2018/08/Work-Thumb_montefiore-293x414.jpg`,
    href: '/work/montefiore-healthcare-design',
  },
  {
    client: 'Black Lives Matter Canada',
    category: 'Email Marketing + Community',
    headline: 'Urgent storytelling. Immediate action.',
    result: 'Designed a high-impact email campaign for Black Lives Matter Canada that drove immediate community engagement and donations — balancing urgency with humanity in every send.',
    img: `${CDN}/2022/08/Work-Thumb_BLMC-724x1024-1-293x414.jpg`,
    href: '/work/black-lives-matter-canada',
  },
  {
    client: 'Award-Winning Logos',
    category: 'Nonprofit + Brand Identity',
    headline: 'Make your mark.',
    result: '24 award-winning logo designs for organizations across sectors — including nonprofits, health systems, and mission-driven brands built to endure.',
    img: `${CDN}/2018/08/Work-Thumb_logos-293x414.jpg`,
    href: '/work/award-winning-logos',
  },
  {
    client: 'Christopher Street Financial',
    category: 'Brand Identity + Website',
    headline: 'Financial planning with a personal philosophy.',
    result: 'Built a distinctive brand identity and marketing website for an LGBTQ-focused financial planning firm — a community-driven practice with a mission to serve with dignity and care.',
    img: `${CDN}/2022/08/Work-Thumb_CSF_2-724x1024-1-293x414.jpg`,
    href: '/work/christopher-street-financial',
  },
];

export function NonprofitPage() {
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
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-5" style={{ fontFamily: NAV_FONT }}>Nonprofit + Fundraising</p>
            <h1 className="leading-[0.95] mb-8 text-white" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
              Building bold brands<br />
              for a new era of <span style={{ fontStyle: 'italic', opacity: 0.55 }}>impact.</span>
            </h1>
            <p className="text-lg text-[#f5f0eb]/80 max-w-2xl leading-relaxed">
              We help nonprofits build the brands and fundraising programs that connect missions to donors — and donors to results. From quarterly appeals to $22M galas.
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
              <div className="text-[10px] uppercase tracking-[0.12em] text-[#f5f0eb]/45" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
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
              We understand that nonprofits operate under unique pressures: limited budgets, high accountability, and an audience whose trust must be earned with every communication. That's why every piece of work we produce for the nonprofit sector is built on strategic clarity and emotional resonance.
            </p>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed">
              From multi-year fundraising programs for health systems to urgent activist campaigns for social justice organizations, we bring the same level of strategic rigor and creative craft that we apply to our Fortune 50 clients — because your mission deserves nothing less.
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
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>Campaigns that moved people — and dollars</h2>
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

      {/* CLIENTS */}
      <section className="bg-[#2d3232] py-16 border-t border-[#3a4040] px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-10">
            <SectionLabel light>Clients We've Served</SectionLabel>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Montefiore Health System', 'Epilepsy Foundation', 'Black Lives Matter Canada', 'Malala Fund'].map((c, i) => (
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
