import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn } from '@/components/shared/ui';
import { CDN, CLIENT_LOGOS, VIDEO_MP4, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const CAPABILITIES = [
  { title: 'Luxury Brand Identity + Naming',    desc: 'Logo, mark development, and complete brand systems that communicate heritage, craftsmanship, and distinction for luxury and lifestyle brands.' },
  { title: 'E-Commerce Design + UX',            desc: 'Conversion-focused digital experiences for fashion, beauty, jewelry, and lifestyle brands — built to elevate the brand while driving sales.' },
  { title: 'Fashion + Beauty Campaigns',        desc: 'Seasonal campaigns, lookbooks, launch activations, and editorial-quality email programs that move product and deepen brand love.' },
  { title: 'Omnichannel Marketing',             desc: 'Coordinated print, digital, email, and in-store marketing programs — timed to purchasing cycles and crafted to a luxury standard.' },
  { title: 'Luxury Invitations + Print',        desc: 'High-end invitations, brochures, catalogues, and direct mail that make a tactile impression in a digital world.' },
  { title: 'Brand Launch + Expansion',          desc: 'Market entry strategy, visual rollout, and ongoing brand stewardship for new luxury labels and legacy brands entering new markets.' },
];

const STATS = [
  { n: '30%',   label: 'Increase in Valentine\'s Day sales — La Perla' },
  { n: '3x',    label: 'Increase in online sales, 5 months — MSG Suites' },
  { n: '2.93M', label: 'Facebook followers — Lancôme House of Color' },
];

const PROJECTS = [
  {
    client: 'La Perla',
    category: 'Omnichannel Marketing',
    headline: 'Campaigns that move product — and build love',
    result: 'Precisely timed email, direct mail, and digital ad campaigns drove a 30% increase in Valentine\'s Day sales across all channels.',
    img: `${CDN}/2018/08/Work-Thumb_laperla-293x414.jpg`,
    href: 'https://hagopianink.com/expertise/',
  },
  {
    client: 'Todd + Duncan',
    category: 'Luxury Brand Identity',
    headline: 'An award-winning cashmere brand from the ground up',
    result: 'Complete visual identity — logo, stationery, store signage, shopping bags, and custom boxes — for a 140-year-old Scottish cashmere label entering the US market.',
    img: `${CDN}/2018/08/Work-Thumb_TD-293x414.jpg`,
    href: 'https://hagopianink.com/expertise/',
  },
  {
    client: 'Gwynnie Bee',
    category: 'UX + Email Marketing',
    headline: 'A 300% lift in subscription sign-ups',
    result: 'Redesigned acquisition funnel and subscription landing experience delivered a 300% increase in new member sign-ups for the fashion rental platform.',
    img: `${CDN}/2018/08/Work-Thumb_gwynnie-293x414.jpg`,
    href: 'https://hagopianink.com/works/gwynnie-bee-subscription-acquisition-email/',
  },
  {
    client: 'Loum Beauty',
    category: 'Brand + UX Redesign',
    headline: 'Clarifying a complex clean-beauty story',
    result: 'Redesigned the digital experience to simplify Loum\'s clean-beauty narrative, improve navigation, and drive conversions across mobile and desktop.',
    img: `${CDN}/2022/08/Work-Thumb_loum2-724x1024-1-293x414.jpg`,
    href: 'https://hagopianink.com/expertise/',
  },
];

const LUXURY_LOGOS = CLIENT_LOGOS.filter(l =>
  ['La Perla', 'Lancôme', 'Burberry', 'Armani', 'Frette', 'MSG', 'Gwynnie Bee',
   'Aston Martin', 'Condé Nast', 'Estée Lauder'].includes(l.alt)
);

export function LuxuryLifestylePage() {
  const cardBg     = '#343a3a';
  const cardBorder = '#424848';
  const textColor  = '#f5f0eb';
  const mutedColor = 'rgba(245,240,235,0.5)';
  const borderColor = 'rgba(245,240,235,0.1)';

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
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-5" style={{ fontFamily: NAV_FONT }}>Luxury + Lifestyle</p>
            <h1 className="leading-[0.95] mb-8 text-white" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
              Where we started.<br />
              The DNA of <span style={{ fontStyle: 'italic', opacity: 0.55 }}>everything we do.</span>
            </h1>
            <p className="text-lg text-[#f5f0eb]/80 max-w-2xl leading-relaxed">
              Luxury and lifestyle is where Hagopian Ink was born. Since 2002, we have built brands, campaigns, and digital experiences for the world's most discerning consumers — from global fashion houses to independent luxury labels.
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
              Luxury brands demand<br />
              a <span style={{ fontStyle: 'italic', opacity: 0.6 }}>luxury standard.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-6">
              We understand luxury because we have lived inside it since our first day in business. Our clients have included global fashion houses, heritage cashmere labels, fine jewelry brands, beauty innovators, and lifestyle startups — each requiring the same rare combination of editorial sensibility, strategic precision, and craft.
            </p>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed">
              From Burberry's first e-commerce website to Todd & Duncan's US market launch, from La Perla's Valentine's Day campaigns to Lancôme's viral House of Color activation — we bring a big-agency creative standard with the personal attention of a boutique studio that treats your brand as its own.
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

      {/* FEATURED WORK — card style matching Work page */}
      <section className="bg-[#2d3232] py-24 md:py-36 px-8 md:px-16 border-t border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel light>Featured Work</SectionLabel>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>Luxury + lifestyle in practice</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1} className="group flex flex-col"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                {/* Image — tall portrait 293×414 */}
                <div className="overflow-hidden aspect-[293/414]">
                  <img src={p.img} alt={p.client}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[9px] uppercase tracking-[0.2em] mb-3"
                    style={{ color: mutedColor, fontFamily: NAV_FONT }}>{p.category}</p>
                  <h3 className="text-lg mb-3 leading-snug flex-1"
                    style={{ fontFamily: SERIF, fontWeight: 700, color: textColor }}>{p.headline}</h3>
                  <p className="text-[12px] leading-relaxed mb-5"
                    style={{ color: mutedColor }}>{p.result}</p>
                  <a href={p.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] border-b pb-0.5 transition-all duration-300 hover:gap-3 self-start"
                    style={{ color: textColor, borderColor, fontFamily: NAV_FONT }}>
                    View Work <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS WHO TRUST US — logo grid */}
      <section className="bg-[#2d3232] py-16 border-t border-[#3a4040] px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-10">
            <SectionLabel light>Brands Who Trust Us</SectionLabel>
          </FadeIn>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-10 gap-y-6 items-center">
            {LUXURY_LOGOS.map((logo, i) => (
              <FadeIn key={i} delay={i * 0.05} className="flex items-center justify-center" style={{ width: 80, height: 36 }}>
                <img src={logo.src} alt={logo.alt}
                  className="max-w-full max-h-full object-contain brightness-0 invert opacity-75 hover:opacity-100 transition-opacity duration-300" />
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
            Ready to build a luxury brand<br />
            <span style={{ fontStyle: 'italic', opacity: 0.6 }}>that endures?</span>
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
