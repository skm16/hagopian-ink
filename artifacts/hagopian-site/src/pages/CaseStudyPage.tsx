import React, { useState, useCallback } from 'react';
import { Link, useParams } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn } from '@/components/shared/ui';
import { SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';
import { getCaseStudy, CASE_STUDIES, type CaseStudy } from '@/lib/case-studies';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/* ─────────────────────────────────────────────────────────
   CAROUSEL  — 2-up on desktop, 1-up on mobile
   Images at their natural proportions — no cropping
───────────────────────────────────────────────────────── */
function Carousel({ images, bg = '#e8e4e0', dark = false }: {
  images: string[];
  bg?: string;
  dark?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  // Group images into pairs for 2-up display
  const pairs: string[][] = [];
  for (let i = 0; i < images.length; i += 2) {
    pairs.push(images.slice(i, i + 2));
  }

  const prev = useCallback(() => {
    setDir(-1);
    setIdx(i => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setDir(1);
    setIdx(i => Math.min(pairs.length - 1, i + 1));
  }, [pairs.length]);

  const btnBase = `absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 transition-all duration-200`;
  const btnColor = dark
    ? 'bg-[#2d3232]/80 hover:bg-[#2d3232] text-[#f1efef]'
    : 'bg-white/90 hover:bg-white text-[#2d3232]';
  const dotActive = dark ? '#f1efef' : '#2d3232';
  const dotInactive = dark ? 'rgba(241,239,239,0.25)' : 'rgba(45,50,50,0.2)';

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '30%' : '-30%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? '-30%' : '30%', opacity: 0 }),
  };

  return (
    <div style={{ background: bg }}>
      {/* Slide area */}
      <div className="relative overflow-hidden">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={idx}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 0] }}
            className="flex"
            style={{ gap: '2px' }}
          >
            {pairs[idx].map((src, i) => (
              <div
                key={i}
                style={{ width: pairs[idx].length === 2 ? '50%' : '100%', flexShrink: 0 }}
              >
                <img
                  src={src}
                  alt=""
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Prev arrow */}
        {idx > 0 && (
          <button
            onClick={prev}
            aria-label="Previous"
            className={`${btnBase} left-3 shadow-md ${btnColor}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Next arrow */}
        {idx < pairs.length - 1 && (
          <button
            onClick={next}
            aria-label="Next"
            className={`${btnBase} right-3 shadow-md ${btnColor}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dots */}
      {pairs.length > 1 && (
        <div className="flex justify-center gap-2 py-5">
          {pairs.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === idx ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === idx ? dotActive : dotInactive,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   LABELLED TEXT SECTION
───────────────────────────────────────────────────────── */
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
  const textColor  = dark ? '#f1efef' : '#2d3232';
  const mutedColor = dark ? 'rgba(241,239,239,0.45)' : 'rgba(45,50,50,0.4)';

  return (
    <section style={{ background: bg }}>
      <div className="px-8 md:px-16 py-16 md:py-24 max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.22em] mt-1"
                style={{ color: mutedColor, fontFamily: NAV_FONT }}>
                {label}
              </p>
            </div>
            <div className="lg:col-span-9">
              <p className="text-[17px] leading-relaxed" style={{ color: textColor }}>
                {children}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FULL-WIDTH SINGLE IMAGE — natural proportions, no crop
───────────────────────────────────────────────────────── */
function FullImg({ src, alt, bg = '#e8e4e0' }: { src: string; alt: string; bg?: string }) {
  return (
    <FadeIn>
      <div style={{ background: bg }}>
        <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────────────────
   RELATED WORK CARD — portrait 293/414, matches WorkPage
───────────────────────────────────────────────────────── */
function RelatedCard({ cs }: { cs: CaseStudy }) {
  return (
    <FadeIn>
      <div className="group flex flex-col" style={{ background: '#ffffff', border: '1px solid #e8e4e0' }}>
        <div className="overflow-hidden aspect-[293/414]">
          <img src={cs.thumb} alt={cs.client}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
        </div>
        <div className="p-7 flex flex-col flex-1">
          <p className="text-[9px] uppercase tracking-[0.2em] mb-3"
            style={{ color: 'rgba(45,50,50,0.5)', fontFamily: NAV_FONT }}>
            {cs.category}
          </p>
          <h3 className="text-xl mb-4 leading-snug"
            style={{ fontFamily: SERIF, fontWeight: 700, color: '#2d3232' }}>
            {cs.client}
          </h3>
          <div className="flex-1" />
          <Link href={`/work/${cs.slug}`}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] border-b pb-0.5 transition-all duration-300 hover:gap-3 self-start"
            style={{ color: '#2d3232', borderColor: 'rgba(45,50,50,0.15)', fontFamily: NAV_FONT }}>
            View Case Study <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const cs = getCaseStudy(slug);

  if (!cs) {
    return (
      <div style={{ fontFamily: SANS, background: '#f1efef', minHeight: '100vh', color: '#2d3232' }}>
        <Nav />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <p className="text-[11px] uppercase tracking-[0.22em]"
            style={{ fontFamily: NAV_FONT, color: 'rgba(45,50,50,0.4)' }}>Case Study</p>
          <h1 className="text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>Not found</h1>
          <Link href="/work"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]"
            style={{ fontFamily: NAV_FONT }}>
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

      {/* ── HEADER — cream, text only ── */}
      <section style={{ background: '#f1efef' }}>
        <div className="px-8 md:px-16 pt-28 pb-10 max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }} className="mb-10">
            <Link href="/work"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] opacity-45 hover:opacity-100 transition-opacity"
              style={{ color: '#2d3232', fontFamily: NAV_FONT }}>
              <ArrowLeft className="w-3 h-3" /> Work
            </Link>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="text-5xl md:text-7xl lg:text-8xl leading-[0.92] mb-5"
            style={{ fontFamily: SERIF, fontWeight: 700, color: '#2d3232' }}>
            {cs.client}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ color: 'rgba(45,50,50,0.45)', fontFamily: NAV_FONT }}>
            {cs.category}{cs.tags.length > 0 && <> &bull; {cs.tags.join(' \u2022 ')}</>}
          </motion.p>
        </div>

        {/* Intro: tagline left | paragraph right */}
        <div className="px-8 md:px-16 pb-16 md:pb-20 max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <p className="text-3xl md:text-4xl leading-snug"
              style={{ fontFamily: SERIF, fontStyle: 'italic', color: '#2d3232' }}>
              {cs.tagline}
            </p>
            <p className="text-[17px] leading-relaxed" style={{ color: 'rgba(45,50,50,0.65)' }}>
              {cs.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── HERO IMAGE — full width, natural height ── */}
      <FullImg src={cs.hero} alt={cs.client} bg="#e8e4e0" />

      {/* ── CHALLENGE ── */}
      <TextSection label="Challenge" bg="#f1efef">
        {cs.challenge}
      </TextSection>

      {/* ── CAROUSEL 1 — after challenge ── */}
      {cs.carousel1.length > 0 && (
        <FadeIn>
          <Carousel images={cs.carousel1} bg="#f1efef" dark={false} />
        </FadeIn>
      )}

      {/* ── SOLUTION ── */}
      <TextSection label="Solution" bg="#2d3232">
        {cs.solution}
      </TextSection>

      {/* ── CAROUSEL 2 — after solution ── */}
      {cs.carousel2.length > 0 && (
        <FadeIn>
          <Carousel images={cs.carousel2} bg="#2d3232" dark={true} />
        </FadeIn>
      )}

      {/* ── RESULT ── */}
      <TextSection label="Result" bg="#f1efef">
        {cs.result}
      </TextSection>

      {/* ── RELATED WORK ── */}
      {related.length > 0 && (
        <section style={{ background: '#f1efef', borderTop: '1px solid rgba(45,50,50,0.08)' }}>
          <div className="px-8 md:px-16 py-20 md:py-28 max-w-[1400px] mx-auto">
            <FadeIn className="flex items-center gap-3 mb-10">
              <span className="w-8 h-px bg-[#2d3232]/25" />
              <p className="text-[10px] uppercase tracking-[0.22em]"
                style={{ color: 'rgba(45,50,50,0.4)', fontFamily: NAV_FONT }}>More Work</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(other => <RelatedCard key={other.slug} cs={other} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-[#2d3232] py-28 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-6"
            style={{ fontFamily: NAV_FONT }}>Start a Conversation</p>
          <h2 className="text-3xl md:text-5xl mb-4 leading-[0.95] text-[#f1efef]"
            style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Good design is good business.
          </h2>
          <p className="text-lg text-[#f5f0eb]/50 mb-12 max-w-xl mx-auto leading-relaxed">
            Tell us about your brand, your goals, and what you need. We will take it from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-[11px] uppercase tracking-[0.18em] bg-[#f1efef] text-[#2d3232] hover:bg-white transition-colors duration-300"
              style={{ fontFamily: NAV_FONT }}>
              Get In Touch <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/work"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] border-b pb-1 opacity-40 hover:opacity-100 transition-opacity"
              style={{ color: '#f1efef', borderColor: 'rgba(241,239,239,0.3)', fontFamily: NAV_FONT }}>
              <ArrowLeft className="w-3.5 h-3.5" /> All Work
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
