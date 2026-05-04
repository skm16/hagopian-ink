import React from 'react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn } from '@/components/shared/ui';
import { SERIF, SANS, NAV_FONT, BRAND_STYLES, CDN } from '@/lib/brand';
import { getCaseStudy, CASE_STUDIES, type CaseStudy } from '@/lib/case-studies';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/* ── Labelled text section ─────────────────────────────── */
function TextSection({
  label,
  children,
  bg = '#f1efef',
}: {
  label: string;
  children: React.ReactNode;
  bg?: string;
}) {
  const dark = bg === '#2d3232';
  const textColor = dark ? '#f1efef' : '#2d3232';
  const mutedColor = dark ? 'rgba(241,239,239,0.45)' : 'rgba(45,50,50,0.4)';

  return (
    <section style={{ background: bg }}>
      <div className="px-8 md:px-16 py-16 md:py-24 max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-2">
              <p
                className="text-[10px] uppercase tracking-[0.22em] mt-1"
                style={{ color: mutedColor, fontFamily: NAV_FONT }}
              >
                {label}
              </p>
            </div>
            <div className="lg:col-span-9">
              <div className="text-[17px] leading-relaxed" style={{ color: textColor }}>
                {children}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Full-width image — no cropping, natural proportions ── */
function FullImg({ src, alt, bg = '#e8e4e0' }: { src: string; alt: string; bg?: string }) {
  return (
    <FadeIn>
      <div style={{ background: bg }}>
        <img
          src={src}
          alt={alt}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>
    </FadeIn>
  );
}

/* ── Related work card — portrait 293/414, matches WorkPage ── */
function RelatedCard({ cs, dark = false }: { cs: CaseStudy; dark: boolean }) {
  const textColor  = dark ? '#f5f0eb' : '#2d3232';
  const mutedColor = dark ? 'rgba(245,240,235,0.5)' : 'rgba(45,50,50,0.5)';
  const borderColor = dark ? 'rgba(245,240,235,0.1)' : 'rgba(45,50,50,0.1)';
  const cardBg     = dark ? '#343a3a' : '#ffffff';
  const cardBorder = dark ? '#424848' : '#e8e4e0';

  return (
    <FadeIn
      className="group flex flex-col"
      style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
    >
      <div className="overflow-hidden aspect-[293/414]">
        <img
          src={cs.thumb}
          alt={cs.client}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
        />
      </div>
      <div className="p-7 flex flex-col flex-1">
        <p
          className="text-[9px] uppercase tracking-[0.2em] mb-3"
          style={{ color: mutedColor, fontFamily: NAV_FONT }}
        >
          {cs.category}
        </p>
        <h3
          className="text-xl mb-4 leading-snug"
          style={{ fontFamily: SERIF, fontWeight: 700, color: textColor }}
        >
          {cs.client}
        </h3>
        <div className="flex-1" />
        <Link
          href={`/work/${cs.slug}`}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] border-b pb-0.5 transition-all duration-300 hover:gap-3 self-start"
          style={{ color: textColor, borderColor, fontFamily: NAV_FONT }}
        >
          View Case Study <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </FadeIn>
  );
}

/* ── Page ──────────────────────────────────────────────── */
export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const cs = getCaseStudy(slug);

  if (!cs) {
    return (
      <div style={{ fontFamily: SANS, background: '#f1efef', minHeight: '100vh', color: '#2d3232' }}>
        <Nav />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <p
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ fontFamily: NAV_FONT, color: 'rgba(45,50,50,0.4)' }}
          >
            Case Study
          </p>
          <h1 className="text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Not found
          </h1>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]"
            style={{ fontFamily: NAV_FONT }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Work
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = CASE_STUDIES.filter(c => c.slug !== cs.slug).slice(0, 4);

  return (
    <div style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ── HEADER (cream, text only — no image overlay) ── */}
      <section style={{ background: '#f1efef' }}>
        <div className="px-8 md:px-16 pt-28 pb-12 max-w-[1400px] mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-10"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] opacity-45 hover:opacity-100 transition-opacity"
              style={{ color: '#2d3232', fontFamily: NAV_FONT }}
            >
              <ArrowLeft className="w-3 h-3" /> Work
            </Link>
          </motion.div>

          {/* Client name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="text-5xl md:text-7xl lg:text-8xl leading-[0.92] mb-5"
            style={{ fontFamily: SERIF, fontWeight: 700, color: '#2d3232' }}
          >
            {cs.client}
          </motion.h1>

          {/* Category + tags */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ color: 'rgba(45,50,50,0.45)', fontFamily: NAV_FONT }}
          >
            {cs.category}
            {cs.tags.length > 0 && (
              <> &bull; {cs.tags.join(' \u2022 ')}</>
            )}
          </motion.p>
        </div>

        {/* ── INTRO: tagline left | paragraph right ── */}
        <div className="px-8 md:px-16 pb-16 md:pb-20 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            <p
              className="text-3xl md:text-4xl leading-snug"
              style={{ fontFamily: SERIF, fontStyle: 'italic', color: '#2d3232' }}
            >
              {cs.tagline}
            </p>
            <p
              className="text-[17px] leading-relaxed"
              style={{ color: 'rgba(45,50,50,0.65)' }}
            >
              {cs.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── HERO IMAGE — full width, natural proportions ── */}
      <FullImg src={cs.hero} alt={cs.client} bg="#e8e4e0" />

      {/* ── CHALLENGE ── */}
      <TextSection label="Challenge" bg="#f1efef">
        {cs.challenge}
      </TextSection>

      {/* ── IMAGE 1 ── */}
      {cs.images[0] && (
        <FullImg src={cs.images[0]} alt="" bg="#e8e4e0" />
      )}

      {/* ── SOLUTION ── */}
      <TextSection label="Solution" bg="#2d3232">
        {cs.solution}
      </TextSection>

      {/* ── IMAGE 2 ── */}
      {cs.images[1] && (
        <FullImg src={cs.images[1]} alt="" bg="#e8e4e0" />
      )}

      {/* ── RESULT ── */}
      <TextSection label="Result" bg="#f1efef">
        {cs.result}
      </TextSection>

      {/* ── REMAINING IMAGES — full width, stacked, no cropping ── */}
      {cs.images.slice(2).map((src, i) => (
        <FullImg key={i} src={src} alt="" bg={i % 2 === 0 ? '#e8e4e0' : '#f1efef'} />
      ))}

      {/* ── RELATED WORK — portrait 293/414 cards, matches WorkPage ── */}
      {related.length > 0 && (
        <section style={{ background: '#f1efef' }}>
          <div className="px-8 md:px-16 py-20 md:py-28 max-w-[1400px] mx-auto">
            <FadeIn className="flex items-center gap-3 mb-10">
              <span className="w-8 h-px bg-[#2d3232]/25" />
              <p
                className="text-[10px] uppercase tracking-[0.22em]"
                style={{ color: 'rgba(45,50,50,0.4)', fontFamily: NAV_FONT }}
              >
                More Work
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((other) => (
                <RelatedCard key={other.slug} cs={other} dark={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-[#2d3232] py-28 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <p
            className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-6"
            style={{ fontFamily: NAV_FONT }}
          >
            Start a Conversation
          </p>
          <h2
            className="text-3xl md:text-5xl mb-4 leading-[0.95] text-[#f1efef]"
            style={{ fontFamily: SERIF, fontWeight: 700 }}
          >
            Good design is good business.
          </h2>
          <p className="text-lg text-[#f5f0eb]/50 mb-12 max-w-xl mx-auto leading-relaxed">
            Tell us about your brand, your goals, and what you need. We will take it from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-[11px] uppercase tracking-[0.18em] bg-[#f1efef] text-[#2d3232] hover:bg-white transition-colors duration-300"
              style={{ fontFamily: NAV_FONT }}
            >
              Get In Touch <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] border-b pb-1 opacity-40 hover:opacity-100 transition-opacity"
              style={{ color: '#f1efef', borderColor: 'rgba(241,239,239,0.3)', fontFamily: NAV_FONT }}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Work
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
