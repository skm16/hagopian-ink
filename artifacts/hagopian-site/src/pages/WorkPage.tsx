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
  Only show case studies that have fully built pages on the live site.
  The slugs below are excluded until their case study pages are properly
  authored and reviewed.
*/
const HIDDEN_SLUGS = new Set([
  'viant-medical-brand-campaign',
  'pvolve-email-marketing',
  'epilepsy-foundation-brand-campaign',
  'malala-fund-email-design',
]);

const VISIBLE = CASE_STUDIES.filter(cs => !HIDDEN_SLUGS.has(cs.slug));

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
              Design that<br />creates impact.
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }}
            className="text-xl text-[#f5f0eb]/70 max-w-md leading-relaxed pb-2">
            20+ years of brands built to last.
          </motion.p>
        </div>
      </section>

      {/* ── PORTFOLIO GRID ──────────────────── */}
      <section className="bg-[#f1efef] py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>Portfolio</SectionLabel>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {VISIBLE.map((cs, i) => (
              <FadeIn key={cs.slug} delay={Math.min(i * 0.04, 0.4)} className="group">
                <Link href={`/work/${cs.slug}`} className="block">
                  <div className="overflow-hidden aspect-[293/414] mb-4 bg-[#e0ddd9]">
                    <img
                      src={cs.thumb} alt={cs.client}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    />
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#2d3232]/40 mb-1.5" style={{ fontFamily: NAV_FONT }}>
                    {cs.category}
                  </p>
                  <h3 className="text-[17px] text-[#2d3232] leading-snug" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                    {cs.client}
                  </h3>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────── */}
      <section className="bg-[#2d3232] py-28 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <SectionLabel light>Start a Conversation</SectionLabel>
          <h2 className="text-3xl md:text-5xl mb-4 leading-[0.95] text-[#f5f0eb]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
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
