import React, { useState, useCallback, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn } from '@/components/shared/ui';
import { SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';
import { getCaseStudy, CASE_STUDIES, type CaseStudy, type Section } from '@/lib/case-studies';

const ease = [0.21, 0.47, 0.32, 0.98] as const;
const SILVER_NAV = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/img/silver-nav-bar.png';
const BLACK_NAV  = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/img/black-nav-bar.png';
const PHONE_PNG  = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/img/3252351.png';

/* ─────────────────────────────────────────────────────────
   CAROUSEL  (1-at-a-time advance, loops, auto-play, 2-up desktop)
───────────────────────────────────────────────────────── */
function Carousel({ images, dark = false }: { images: string[]; dark?: boolean }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = images.length;

  const next = useCallback(() => setIdx(i => (i + 1) % n), [n]);
  const prev = useCallback(() => setIdx(i => (i - 1 + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [next, paused]);

  const bg       = dark ? '#2d3232' : '#f1efef';
  const arrowBg  = dark ? 'rgba(241,239,239,0.12)' : 'rgba(45,50,50,0.08)';
  const arrowHov = dark ? 'rgba(241,239,239,0.22)' : 'rgba(45,50,50,0.16)';
  const arrowCol = dark ? '#f1efef' : '#2d3232';
  const dotAct   = dark ? '#f1efef' : '#2d3232';
  const dotInact = dark ? 'rgba(241,239,239,0.2)' : 'rgba(45,50,50,0.15)';

  return (
    <div
      style={{ background: bg }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden">
        <div className="flex">
          {/* Primary — full on mobile, half on desktop */}
          <div className="w-full sm:w-1/2 flex-shrink-0" style={{ background: '#fff' }}>
            <img src={images[idx]} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
          </div>
          {/* Secondary — hidden on mobile */}
          <div className="hidden sm:block w-1/2 flex-shrink-0" style={{ background: '#fff' }}>
            <img src={images[(idx + 1) % n]} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
          </div>
        </div>

        <button onClick={prev} aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10"
          style={{ background: arrowBg, color: arrowCol }}
          onMouseEnter={e => (e.currentTarget.style.background = arrowHov)}
          onMouseLeave={e => (e.currentTarget.style.background = arrowBg)}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next} aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10"
          style={{ background: arrowBg, color: arrowCol }}
          onMouseEnter={e => (e.currentTarget.style.background = arrowHov)}
          onMouseLeave={e => (e.currentTarget.style.background = arrowBg)}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {n > 1 && (
        <div className="flex justify-center gap-2 py-4">
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`}
              style={{
                width: i === idx ? 20 : 6, height: 6, borderRadius: 3,
                background: i === idx ? dotAct : dotInact,
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'all 0.3s ease',
              }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   DESKTOP FRAMES
   Matches live-site .desctop-pages CSS exactly:
   background:#f4f2f2, padding:90px 0, width-90 container,
   box-shadow:0 20px 50px rgba(0,0,0,.3) on images.
   Layout: 2 imgs → side-by-side 50/50
           3 imgs → 1 full-width (mb 90px) + 2 half-width
───────────────────────────────────────────────────────── */
const IMG_SHADOW: React.CSSProperties = {
  boxShadow: '0 20px 50px rgba(0,0,0,.3)',
  display: 'block',
  width: '100%',
  height: 'auto',
  lineHeight: 0,
};

function DesktopFrames({ images, navBar = 'silver' }: { images: string[]; navBar?: 'silver' | 'black' }) {
  const nav = navBar === 'black' ? BLACK_NAV : SILVER_NAV;

  /* Each column: nav bar (full-width) stacked on screenshot (full-width) */
  const Col = ({ src, fullWidth = false }: { src: string; fullWidth?: boolean }) => (
    <div style={{ lineHeight: 0 }}>
      <img src={nav} alt=""
        style={{ display: 'block', width: '100%', height: 'auto' }} />
      <img src={src} alt=""
        style={{ display: 'block', width: '100%', height: 'auto', ...IMG_SHADOW }} />
    </div>
  );

  return (
    <FadeIn>
      {/* .template-part.desctop-pages — matches live site exactly */}
      <div style={{ background: '#f4f2f2', padding: 'clamp(40px,6vw,90px) 0', lineHeight: 0 }}>
        {/* Bootstrap .container (max-width: 1170px) → .row.width-90 (90% width) */}
        <div style={{ maxWidth: 1170, margin: '0 auto', padding: '0 15px' }}>
          <div style={{ width: '90%', margin: '0 auto' }}>
            {images.length === 3 ? (
              <>
                {/* col-sm-12: full-width first image, margin-bottom 90px */}
                <div style={{ marginBottom: 'clamp(40px,6vw,90px)', lineHeight: 0 }}>
                  <Col src={images[0]} fullWidth />
                </div>
                {/* Two col-sm-6 columns — 15px padding each = 30px gap */}
                <div style={{ display: 'flex', margin: '0 -15px' }}>
                  <div style={{ flex: '0 0 50%', padding: '0 15px', lineHeight: 0, minWidth: 0 }}>
                    <Col src={images[1]} />
                  </div>
                  <div style={{ flex: '0 0 50%', padding: '0 15px', lineHeight: 0, minWidth: 0 }}>
                    <Col src={images[2]} />
                  </div>
                </div>
              </>
            ) : (
              /* Two col-sm-6 columns — 15px padding each = 30px gap */
              <div style={{ display: 'flex', margin: '0 -15px' }}>
                {images.map((src, i) => (
                  <div key={i} style={{ flex: '0 0 50%', padding: '0 15px', lineHeight: 0, minWidth: 0 }}>
                    <Col src={src} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────────────────
   MOBILE FRAMES
   Matches live-site .mobile-pages CSS exactly:
   background:#f4f2f2, padding:140px 0
   .slider: width:265px, height:520px, padding:33px 10px 53px
   .phone: 3252351.png absolute overlay, z-index:1000, bg-pos-x:-26px
   .slide img: width:245px, height:434px
───────────────────────────────────────────────────────── */
/*
  Live-site mobile slider mechanics (from page JS):
    var width = 265 + 55;  // = 320px per slide step
    slides strip: all images float-left, each img is 245px + 75px margin-right = 320px
    transform: translate3d(-index * 320px, 0, 0)  with CSS transition: 1s
*/
const SLIDE_STEP = 265 + 55; // 320px — matches live site JS exactly

function MobileFrames({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = images.length;

  const next = useCallback(() => setIdx(i => (i + 1) % n), [n]);
  const prev = useCallback(() => setIdx(i => (i - 1 + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [next, paused]);

  return (
    /* .template-part.mobile-pages */
    <div
      style={{ background: '#f4f2f2', padding: '140px 0', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* .slider — exact 265×520 from live CSS */}
      <div style={{
        width: 265, height: 520,
        margin: '0 auto',
        padding: '33px 10px 53px',
        borderRadius: 10,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* .phone — phone frame PNG absolutely overlaid at z-index 1000 */}
        <div style={{
          backgroundImage: `url(${PHONE_PNG})`,
          backgroundPositionX: -26,
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
          borderRadius: 10,
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 1000,
          pointerEvents: 'none',
        }} />

        {/* .slides — horizontal strip, translate3d to slide, transition: 1s */}
        <div style={{
          display: 'flex',
          width: n * SLIDE_STEP,
          transform: `translate3d(-${idx * SLIDE_STEP}px, 0, 0)`,
          transition: 'transform 1s ease',
          position: 'relative',
        }}>
          {images.map((src, i) => (
            /* .slide: img 245×434 + margin-right 75px = 320px per slot */
            <div key={i} style={{ flexShrink: 0, marginRight: 75 }}>
              <img
                src={src} alt=""
                style={{ width: 245, height: 434, display: 'block', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots + prev/next — below the phone */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 32, position: 'relative', zIndex: 10 }}>
        <button onClick={prev} aria-label="Previous"
          style={{ background: 'rgba(45,50,50,0.1)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d3232' }}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div style={{ display: 'flex', gap: 7 }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`}
              style={{
                width: i === idx ? 20 : 10, height: 10, borderRadius: '50%',
                background: i === idx ? '#2d3232' : '#ffffff',
                border: '1px solid #828282',
                padding: 0, cursor: 'pointer',
                transition: 'all 0.3s ease',
              }} />
          ))}
        </div>
        <button onClick={next} aria-label="Next"
          style={{ background: 'rgba(45,50,50,0.1)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d3232' }}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TEXT SECTION
───────────────────────────────────────────────────────── */
function TextSection({ label, body, dark = false }: { label: string; body: string; dark?: boolean }) {
  const bg    = dark ? '#2d3232' : '#f1efef';
  const col   = dark ? '#f1efef' : '#2d3232';
  const muted = dark ? 'rgba(241,239,239,0.45)' : 'rgba(45,50,50,0.4)';

  return (
    <section style={{ background: bg }}>
      <div className="px-8 md:px-16 py-16 md:py-24 max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.22em] mt-1"
                style={{ color: muted, fontFamily: NAV_FONT }}>
                {label}
              </p>
            </div>
            <div className="lg:col-span-9">
              <p className="text-[17px] leading-relaxed whitespace-pre-line" style={{ color: col }}>
                {body}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   TEXT + IMAGE  (2-col)
───────────────────────────────────────────────────────── */
function TextImageSection({ label, title, body, image, imageLeft = false, bg: bgProp }: {
  label: string; title: string; body: string; image: string; imageLeft?: boolean; bg?: string;
}) {
  const bg    = bgProp ?? '#f1efef';
  const col   = '#2d3232';
  const muted = 'rgba(45,50,50,0.4)';

  const textBlock = (
    <div className="flex flex-col justify-center gap-4 py-8 lg:py-0">
      <p className="text-[10px] uppercase tracking-[0.22em]"
        style={{ color: muted, fontFamily: NAV_FONT }}>{label}</p>
      <h3 className="text-2xl md:text-3xl leading-snug"
        style={{ fontFamily: SERIF, fontWeight: 700, color: col }}>{title}</h3>
      <p className="text-[16px] leading-relaxed whitespace-pre-line"
        style={{ color: 'rgba(45,50,50,0.7)' }}>{body}</p>
    </div>
  );

  const imgBlock = (
    <div style={{ background: '#fff', overflow: 'hidden' }}>
      <img src={image} alt={title} style={{ display: 'block', width: '100%', height: 'auto' }} />
    </div>
  );

  return (
    <section style={{ background: bg }}>
      <div className="px-8 md:px-16 py-16 md:py-24 max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {imageLeft ? <>{imgBlock}{textBlock}</> : <>{textBlock}{imgBlock}</>}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FULL-WIDTH IMAGE
───────────────────────────────────────────────────────── */
function FullImg({ src }: { src: string }) {
  return (
    <FadeIn>
      <div style={{ background: '#fff' }}>
        <img src={src} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION DISPATCHER
───────────────────────────────────────────────────────── */
function RenderSection({ section }: { section: Section }) {
  switch (section.type) {
    case 'text':
      return <TextSection label={section.label} body={section.body} dark={section.dark} />;
    case 'text-image':
      return (
        <TextImageSection
          label={section.label} title={section.title}
          body={section.body} image={section.image}
          imageLeft={section.imageLeft} bg={section.bg}
        />
      );
    case 'full-image':
      return <FullImg src={section.src} />;
    case 'carousel':
      return <FadeIn><Carousel images={section.images} dark={section.dark} /></FadeIn>;
    case 'desktop-frames':
      return <DesktopFrames images={section.images} navBar={section.navBar} />;
    case 'mobile-frames':
      return <MobileFrames images={section.images} />;
    default:
      return null;
  }
}

/* ─────────────────────────────────────────────────────────
   RELATED WORK CARD
───────────────────────────────────────────────────────── */
function RelatedCard({ cs }: { cs: CaseStudy }) {
  return (
    <FadeIn>
      <div className="group flex flex-col"
        style={{ background: '#ffffff', border: '1px solid #e8e4e0' }}>
        <div className="overflow-hidden aspect-[293/414]">
          <img src={cs.thumb} alt={cs.client}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
        </div>
        <div className="p-7 flex flex-col flex-1">
          <p className="text-[9px] uppercase tracking-[0.2em] mb-3"
            style={{ color: 'rgba(45,50,50,0.5)', fontFamily: NAV_FONT }}>{cs.category}</p>
          <h3 className="text-xl mb-4 leading-snug"
            style={{ fontFamily: SERIF, fontWeight: 700, color: '#2d3232' }}>{cs.client}</h3>
          <div className="flex-1" />
          <Link href={`/work/${cs.slug}`}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] border-b pb-0.5 hover:gap-3 transition-all duration-300 self-start"
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

      {/* ── HEADER ── */}
      <section style={{ background: '#f1efef' }}>
        <div className="px-8 md:px-16 pt-28 pb-8 max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }} className="mb-8">
            <Link href="/work"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
              style={{ color: '#2d3232', fontFamily: NAV_FONT }}>
              <ArrowLeft className="w-3 h-3" /> Work
            </Link>
          </motion.div>

          {/* Client name — intentionally modest size */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-3"
            style={{ fontFamily: SERIF, fontWeight: 700, color: '#2d3232' }}>
            {cs.client}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="text-[10px] uppercase tracking-[0.22em] mb-10"
            style={{ color: 'rgba(45,50,50,0.45)', fontFamily: NAV_FONT }}>
            {cs.category}{cs.tags.length > 0 && <> &bull; {cs.tags.join(' \u2022 ')}</>}
          </motion.p>

          {/* Tagline left | intro right */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.24, ease }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-14 md:pb-20">
            <p className="text-3xl md:text-4xl leading-snug"
              style={{ fontFamily: SERIF, fontStyle: 'italic', color: '#2d3232' }}>
              {cs.tagline}
            </p>
            <p className="text-[17px] leading-relaxed"
              style={{ color: 'rgba(45,50,50,0.65)' }}>
              {cs.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <FullImg src={cs.hero} />

      {/* ── SECTIONS ── */}
      {cs.sections.map((section, i) => (
        <RenderSection key={i} section={section} />
      ))}

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
