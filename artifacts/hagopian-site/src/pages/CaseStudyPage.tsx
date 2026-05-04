import React from 'react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, Btn } from '@/components/shared/ui';
import { SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';
import { getCaseStudy, CASE_STUDIES } from '@/lib/case-studies';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const cs = getCaseStudy(slug);

  if (!cs) {
    return (
      <div style={{ fontFamily: SANS, background: '#2d3232', minHeight: '100vh', color: '#f1efef' }}>
        <Nav />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <p className="text-[11px] uppercase tracking-[0.22em]" style={{ fontFamily: NAV_FONT, color: 'rgba(241,239,239,0.4)' }}>Case Study</p>
          <h1 className="text-4xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>Not found</h1>
          <Link href="/work" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: NAV_FONT }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Work
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const otherStudies = CASE_STUDIES.filter(c => c.slug !== cs.slug).slice(0, 2);

  return (
    <div style={{ fontFamily: SANS, background: '#f1efef' }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden bg-[#2d3232]">
        <div className="absolute inset-0">
          <img
            src={cs.hero}
            alt={cs.client}
            className="w-full h-full object-cover"
            style={{ opacity: 0.45 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #2d3232 18%, transparent 60%)' }} />
        </div>

        <div className="relative z-10 px-8 md:px-16 pb-20 md:pb-28 max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Link href="/work"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-100 opacity-50"
                style={{ color: '#f1efef', fontFamily: NAV_FONT }}>
                <ArrowLeft className="w-3 h-3" /> Work
              </Link>
              <span className="opacity-25 text-[#f1efef]">/</span>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-40"
                style={{ color: '#f1efef', fontFamily: NAV_FONT }}>{cs.category}</span>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {cs.tags.map(tag => (
                <span key={tag}
                  className="text-[9px] uppercase tracking-[0.18em] px-3 py-1.5 border"
                  style={{ color: 'rgba(241,239,239,0.6)', borderColor: 'rgba(241,239,239,0.2)', fontFamily: NAV_FONT }}>
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.92] text-white mb-6"
              style={{ fontFamily: SERIF, fontWeight: 700 }}>
              {cs.client}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl leading-relaxed"
              style={{ color: 'rgba(241,239,239,0.65)', fontFamily: SERIF }}>
              {cs.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────── */}
      <section className="bg-[#f1efef] px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-3">
                <p className="text-[10px] uppercase tracking-[0.22em] mb-2"
                  style={{ color: 'rgba(45,50,50,0.45)', fontFamily: NAV_FONT }}>{cs.category}</p>
                <div className="w-8 h-px bg-[#2d3232]/20 mt-4" />
              </div>
              <div className="lg:col-span-9">
                <p className="text-2xl md:text-3xl leading-relaxed"
                  style={{ color: '#2d3232', fontFamily: SERIF }}>
                  {cs.intro}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION ──────────────────────────── */}
      <section className="bg-[#2d3232] px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.22em] mb-8"
              style={{ color: 'rgba(241,239,239,0.35)', fontFamily: NAV_FONT }}>Challenge</p>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(241,239,239,0.75)' }}>
              {cs.challenge}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[10px] uppercase tracking-[0.22em] mb-8"
              style={{ color: 'rgba(241,239,239,0.35)', fontFamily: NAV_FONT }}>Solution</p>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(241,239,239,0.75)' }}>
              {cs.solution}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── RESULT ────────────────────────────────────────── */}
      <section className="bg-[#f1efef] px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.22em] mb-10"
              style={{ color: 'rgba(45,50,50,0.4)', fontFamily: NAV_FONT }}>Result</p>
            <p className="text-2xl md:text-3xl leading-relaxed max-w-4xl"
              style={{ color: '#2d3232', fontFamily: SERIF }}>
              {cs.result}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── IMAGE GALLERY ─────────────────────────────────── */}
      <section className="bg-[#2d3232] px-8 md:px-16 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cs.images.map((src, i) => (
              <FadeIn key={i} delay={i * 0.04} className={i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}>
                <div className="overflow-hidden" style={{ background: '#3a4040' }}>
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                    style={{ display: 'block', maxHeight: i === 0 ? '520px' : '340px', objectFit: 'cover' }}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MORE WORK ─────────────────────────────────────── */}
      {otherStudies.length > 0 && (
        <section className="bg-[#f1efef] px-8 md:px-16 py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto">
            <FadeIn>
              <p className="text-[10px] uppercase tracking-[0.22em] mb-12"
                style={{ color: 'rgba(45,50,50,0.4)', fontFamily: NAV_FONT }}>More Work</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherStudies.map((other, i) => (
                <FadeIn key={other.slug} delay={i * 0.1}>
                  <Link href={`/work/${other.slug}`}
                    className="group block overflow-hidden"
                    style={{ background: '#fff', border: '1px solid rgba(45,50,50,0.1)' }}>
                    <div className="overflow-hidden aspect-[16/9]">
                      <img src={other.hero} alt={other.client}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                    </div>
                    <div className="p-8">
                      <p className="text-[9px] uppercase tracking-[0.2em] mb-3"
                        style={{ color: 'rgba(45,50,50,0.4)', fontFamily: NAV_FONT }}>{other.category}</p>
                      <h3 className="text-2xl mb-4" style={{ fontFamily: SERIF, fontWeight: 700, color: '#2d3232' }}>
                        {other.client}
                      </h3>
                      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] border-b pb-0.5"
                        style={{ color: '#2d3232', borderColor: 'rgba(45,50,50,0.2)', fontFamily: NAV_FONT }}>
                        View Case Study <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-[#2d3232] py-28 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-6"
            style={{ fontFamily: NAV_FONT }}>Start a Conversation</p>
          <h2 className="text-3xl md:text-5xl mb-4 leading-[0.95] text-[#f1efef]"
            style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ready to create something new?
          </h2>
          <p className="text-lg text-[#f5f0eb]/50 mb-12 max-w-xl mx-auto leading-relaxed">
            Tell us about your brand, your goals, and what you need. We will take it from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Btn href="/contact" external={false}>
              Get In Touch <ArrowRight className="w-4 h-4" />
            </Btn>
            <Link href="/work"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] border-b pb-1 opacity-50 hover:opacity-100 transition-opacity"
              style={{ color: '#f1efef', borderColor: 'rgba(241,239,239,0.3)', fontFamily: NAV_FONT }}>
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Work
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
