import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, BtnLight } from '@/components/shared/ui';
import { VIDEO_WORK, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';
import { CASE_STUDIES } from '@/lib/case-studies';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/*
  Case studies excluded until their pages are fully authored and reviewed.
*/
const HIDDEN_SLUGS = new Set([
  'viant-medical-brand-campaign',
  'pvolve-email-marketing',
  'epilepsy-foundation-brand-campaign',
  'malala-fund-email-design',
]);

/*
  Group assignments — ordered within each group.
  Using explicit slug lists rather than raw category strings
  (which are inconsistent across case studies).
*/
type Group = {
  label: string;
  desc: string;
  slugs: string[];
};

const GROUPS: Group[] = [
  {
    label: 'Email Marketing',
    desc: 'From single sends to complex automation sequences — every email is designed to feel like a personal conversation at scale.',
    slugs: [
      'pepsi-email-marketing',
      'sesame-street-mobile-email',
      'gwynnie-bee-subscription-acquisition-email',
      'audible-email-design',
      'sobe-fluid-responsive-email',
      'melissa-kaye-luxury-jewelry-email-design',
      'black-lives-matter-canada',
    ],
  },
  {
    label: 'Brand Identity',
    desc: 'Logos, marks, visual systems, and brand standards built to endure — across every medium and every moment.',
    slugs: [
      'joseph-robert',
      'award-winning-logos',
      'christopher-street-financial',
      'hubspot-conference-brand-identity',
      'bewell',
      'todd-duncan-cashmere-branding-design',
      'lalalife-subscription-box-branding-and-website-design',
    ],
  },
  {
    label: 'Website + UX Design',
    desc: 'Digital experiences designed around how people actually move through your content — built to convert and built to last.',
    slugs: [
      'loumbeauty',
      'diamonds-in-glass-luxury-jewelry-website',
      'recoveryplus-health-brand',
    ],
  },
  {
    label: 'Campaigns + Fundraising',
    desc: 'Multichannel campaigns that connect brands and missions to the people who matter most.',
    slugs: [
      'la-perla-multichannel-campaign-design',
      'montefiore-healthcare-design',
    ],
  },
];

/* Build a slug → CaseStudy lookup */
const BY_SLUG = Object.fromEntries(
  CASE_STUDIES.filter(cs => !HIDDEN_SLUGS.has(cs.slug)).map(cs => [cs.slug, cs])
);

export function WorkPage() {
  return (
    <div style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ── VIDEO HERO ─────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[#2d3232]/12 z-10" />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_WORK} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-20 max-w-[1400px] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-6" style={{ fontFamily: NAV_FONT }}>
              Selected Work
            </p>
            <h1 className="text-5xl md:text-7xl leading-[0.92] text-white" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Design that creates{' '}
              <span style={{ fontStyle: 'italic', opacity: 0.55 }}>impact.</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }}
            className="text-xl text-[#f5f0eb]/70 max-w-md leading-relaxed pb-2">
            20+ years of brands built to last.
          </motion.p>
        </div>
      </section>

      {/* ── GROUPED PORTFOLIO ──────────────── */}
      {GROUPS.map((group, gi) => {
        const cases = group.slugs.map(s => BY_SLUG[s]).filter(Boolean);
        if (!cases.length) return null;
        const dark = gi % 2 === 1;
        const bg        = dark ? '#2d3232' : '#f1efef';
        const textColor = dark ? '#f5f0eb'  : '#2d3232';
        const mutedColor = dark ? 'rgba(245,240,235,0.45)' : 'rgba(45,50,50,0.45)';
        const borderColor = dark ? 'rgba(245,240,235,0.1)' : 'rgba(45,50,50,0.1)';
        const cardBg = dark ? '#343a3a' : '#ffffff';
        const cardBorder = dark ? '#424848' : '#e8e4e0';
        const categoryColor = dark ? 'rgba(245,240,235,0.35)' : 'rgba(45,50,50,0.35)';

        return (
          <section key={group.label} style={{ background: bg }}>
            <div className="px-8 md:px-16 pt-20 md:pt-28 pb-4 max-w-[1400px] mx-auto">
              <FadeIn>
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-8 h-px" style={{ background: borderColor }} />
                  <span className="text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: mutedColor, fontFamily: NAV_FONT }}>
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
                  style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '2rem' }}>
                  <h2 className="text-3xl md:text-4xl leading-[1.0]"
                    style={{ fontFamily: SERIF, fontWeight: 700, color: textColor }}>
                    {group.label}
                  </h2>
                  <p className="text-[15px] leading-relaxed max-w-md" style={{ color: mutedColor }}>
                    {group.desc}
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="px-8 md:px-16 pb-20 md:pb-28">
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {cases.map((cs, ci) => (
                  <FadeIn key={cs.slug} delay={Math.min(ci * 0.05, 0.3)} className="group">
                    <Link href={`/work/${cs.slug}`} className="block"
                      style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                      <div className="overflow-hidden aspect-[293/414]">
                        <img src={cs.thumb} alt={cs.client}
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                      </div>
                      <div className="p-5">
                        <p className="text-[9px] uppercase tracking-[0.2em] mb-1.5"
                          style={{ color: categoryColor, fontFamily: NAV_FONT }}>
                          {cs.category}
                        </p>
                        <h3 className="text-[16px] leading-snug"
                          style={{ fontFamily: SERIF, fontWeight: 700, color: textColor }}>
                          {cs.client}
                        </h3>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA ──────────────────────────── */}
      <section className="bg-[#2d3232] py-28 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <SectionLabel light>Start a Conversation</SectionLabel>
          <h2 className="text-3xl md:text-5xl mb-4 leading-[0.95] text-[#f5f0eb]"
            style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ready to create something new?
          </h2>
          <p className="text-lg text-[#f5f0eb]/50 mb-12 max-w-xl mx-auto leading-relaxed">
            Tell us about your brand, your goals, and what you need. We will take it from there.
          </p>
          <BtnLight href="/contact" external={false}>
            Get In Touch <ArrowRight className="w-4 h-4" />
          </BtnLight>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
