import React, { useState, useCallback, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn } from '@/components/shared/ui';
import { SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';
import { getCaseStudy, CASE_STUDIES, type CaseStudy, type Section } from '@/lib/case-studies';

/* ─────────────────────────────────────────────────────────
   COLUMNS THREE  (columns-single-work with width-80 row)
   Live site: 3 × col-sm-4, part-name in rose, part-title italic serif,
   description in Fira Sans. padding: 90px 0, bg: white.
───────────────────────────────────────────────────────── */
function ColumnsThree({ challenge, solution, resultTitle, result }: {
  challenge: string; solution: string; resultTitle: string; result: string;
}) {
  const partNameStyle: React.CSSProperties = {
    color: '#a57b83',
    fontFamily: NAV_FONT,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.47px',
    textTransform: 'uppercase',
    marginBottom: 16,
  };
  const descStyle: React.CSSProperties = {
    color: '#2e2e2e',
    fontSize: 16,
    lineHeight: 1.7,
  };
  const resultTitleStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontStyle: 'italic',
    fontSize: 22,
    lineHeight: 1.3,
    color: '#2d3232',
    marginBottom: 14,
  };

  return (
    <section style={{ background: '#ffffff', padding: '90px 0' }}>
      {/* Bootstrap .container → .row.width-80 */}
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: '0 15px' }}>
        <div style={{
          width: '80%', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', gap: 40,
        }}>
          {/* Challenge */}
          <div style={{ maxWidth: 279, flex: '1 1 0' }}>
            <p style={partNameStyle}>Challenge</p>
            <p style={descStyle}>{challenge}</p>
          </div>
          {/* Solution */}
          <div style={{ maxWidth: 279, flex: '1 1 0' }}>
            <p style={partNameStyle}>Solution</p>
            <p style={descStyle}>{solution}</p>
          </div>
          {/* Result */}
          <div style={{ flex: '1.4 1 0' }}>
            <p style={partNameStyle}>Result</p>
            <p style={resultTitleStyle}>{resultTitle}</p>
            <p style={descStyle}>{result}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

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

  /* No FadeIn — desktop frames are always visible, matching live site behavior */
  return (
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
  Live-site mobile slider mechanics:
    .slider (265×520): position:relative — NO overflow:hidden — slides extend beyond
    .slides strip: position:absolute, top:33, left:10, explicit width = n * 320
    .slide img: 245×434, margin-right:75 → SLIDE_STEP = 320
    .phone: position:absolute, z-index:10 — phone PNG has transparent screen area;
            slides show through the transparent part; bezel covers the border areas
    Adjacent slides peek outside the 265px slider into the outer section
    Outer .mobile-pages: overflow:hidden keeps everything within page bounds
*/
const SLIDE_STEP = 320; // 245px image + 75px margin-right

function MobileFrames({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = images.length;

  const next = useCallback(() => setIdx(i => (i + 1) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [next, paused]);

  return (
    /* .template-part.mobile-pages — outer clip, NO overflow clip needed on .slider */
    <div
      style={{ background: '#f4f2f2', padding: '140px 0', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/*
        .slider — 265×520, position:relative, NO overflow:hidden
        Slides extend beyond this box; adjacent slides peek out to left/right
        .phone overlay covers only this 265px area with the phone bezel PNG
        (PNG has transparent screen so slides behind it show through)
      */}
      <div style={{
        width: 265,
        height: 520,
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* .phone — absolute overlay, on top; PNG transparent in screen area */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 10,
          backgroundImage: `url(${PHONE_PNG})`,
          backgroundPositionX: -26,
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
        }} />

        {/* .slides — absolute strip; extends beyond slider so adjacent slides peek in */}
        <div style={{
          position: 'absolute',
          top: 33,
          left: 10,
          width: n * SLIDE_STEP,
          transform: `translate3d(-${idx * SLIDE_STEP}px, 0, 0)`,
          transition: 'transform 1s',
          display: 'flex',
        }}>
          {images.map((src, i) => (
            <div key={i} style={{ flexShrink: 0, marginRight: 75 }}>
              <img
                src={src} alt=""
                style={{ width: 245, height: 434, display: 'block', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* .slides-button — dot navigation below the phone */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 28, position: 'relative', zIndex: 10 }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`}
            style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i === idx ? '#828282' : '#ffffff',
              border: '1px solid #828282',
              padding: 0, cursor: 'pointer',
              transition: 'background 0.3s ease',
            }} />
        ))}
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
   LOGO SLIDER
   • ONE image at a time, full container width, height: auto
   • Slides left → right with prev / next arrows
   • Counter + dot nav, auto-advances every 5s
───────────────────────────────────────────────────────── */
function LogoGrid({ images }: { images: string[] }) {
  const n = images.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIdx(i => (i + 1) % n), [n]);
  const prev = useCallback(() => setIdx(i => (i - 1 + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ background: '#fff' }}
    >
      {/* Sliding track */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{
          display: 'flex',
          transition: 'transform 0.55s cubic-bezier(0.21,0.47,0.32,0.98)',
          transform: `translateX(-${idx * 100}%)`,
        }}>
          {images.map((src, i) => (
            <div key={i} style={{ flexShrink: 0, width: '100%' }}>
              <img src={src} alt=""
                style={{ display: 'block', width: '100%', height: 'auto' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#2d3232',
        padding: '0 8px',
      }}>
        {/* Prev */}
        <button onClick={prev} aria-label="Previous"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#f5f0eb', padding: '14px 12px',
            display: 'flex', alignItems: 'center',
          }}>
          <ChevronLeft style={{ width: 22, height: 22 }} />
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Image ${i + 1}`}
              style={{
                width: i === idx ? 18 : 6, height: 6, borderRadius: 3,
                background: i === idx ? '#f5f0eb' : 'rgba(245,240,235,0.3)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'all 0.3s ease',
              }} />
          ))}
        </div>

        {/* Next */}
        <button onClick={next} aria-label="Next"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#f5f0eb', padding: '14px 12px',
            display: 'flex', alignItems: 'center',
          }}>
          <ChevronRight style={{ width: 22, height: 22 }} />
        </button>
      </div>
    </div>
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
   CONTAINED IMAGE  — centered, max-width constrained,
   with padding + gray bg so it reads as "presented" work
   (used for PDF page screenshots, email screenshots, etc.)
───────────────────────────────────────────────────────── */
function ContainedImg({ src, maxWidth = 860, bg = '#f4f2f2' }: { src: string; maxWidth?: number; bg?: string }) {
  return (
    <FadeIn>
      <div style={{ background: bg, padding: 'clamp(32px,5vw,72px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth, margin: '0 auto' }}>
          <img src={src} alt=""
            style={{ display: 'block', width: '100%', height: 'auto', boxShadow: '0 8px 40px rgba(0,0,0,0.13)' }} />
        </div>
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
    case 'contained-image':
      return <ContainedImg src={section.src} maxWidth={section.maxWidth} bg={section.bg} />;
    case 'carousel':
      return <FadeIn><Carousel images={section.images} dark={section.dark} /></FadeIn>;
    case 'desktop-frames':
      return <DesktopFrames images={section.images} navBar={section.navBar} />;
    case 'mobile-frames':
      return <MobileFrames images={section.images} />;
    case 'logo-grid':
      return <LogoGrid images={section.images} bg={section.bg} />;
    case 'columns-three':
      return (
        <ColumnsThree
          challenge={section.challenge}
          solution={section.solution}
          resultTitle={section.resultTitle}
          result={section.result}
        />
      );
    default:
      return null;
  }
}

/* ─────────────────────────────────────────────────────────
   RELATED WORK CARD  — thumbnail + client name only
───────────────────────────────────────────────────────── */
function RelatedCard({ cs }: { cs: CaseStudy }) {
  return (
    <FadeIn>
      <Link href={`/work/${cs.slug}`} className="group block">
        <div className="overflow-hidden aspect-[293/414]">
          <img src={cs.thumb} alt={cs.client}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
        </div>
        <p className="mt-3 text-[13px] leading-snug"
          style={{ fontFamily: SERIF, fontWeight: 700, color: '#2d3232' }}>
          {cs.client}
        </p>
      </Link>
    </FadeIn>
  );
}

/* Score two case studies by tag + category overlap */
function relatedScore(a: CaseStudy, b: CaseStudy): number {
  const sharedTags = a.tags.filter(t => b.tags.includes(t)).length;
  const sameCategory = a.category === b.category ? 2 : 0;
  return sharedTags + sameCategory;
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

  const related = CASE_STUDIES
    .filter(c => c.slug !== cs.slug)
    .sort((a, b) => relatedScore(cs, b) - relatedScore(cs, a))
    .slice(0, 4);

  return (
    <div style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav alwaysVisible />

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
            {cs.category}{cs.tags.filter(t => t !== cs.category).length > 0 && <> &bull; {cs.tags.filter(t => t !== cs.category).join(' \u2022 ')}</>}
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
      {!cs.noHero && (cs.heroContained
        ? <ContainedImg src={cs.hero} maxWidth={900} />
        : <FullImg src={cs.hero} />
      )}

      {/* ── SECTIONS ── */}
      {cs.sections.map((section, i) => (
        <RenderSection key={i} section={section} />
      ))}

      {/* ── RELATED WORK ── */}
      {related.length > 0 && (
        <section style={{ background: '#f1efef', borderTop: '1px solid rgba(45,50,50,0.08)' }}>
          <div className="px-8 md:px-16 py-20 md:py-28 max-w-[1400px] mx-auto">
            <FadeIn className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[#2d3232]/25" />
                <p className="text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: 'rgba(45,50,50,0.4)', fontFamily: NAV_FONT }}>Related Work</p>
              </div>
              <Link href="/work"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] border-b pb-0.5 opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: '#2d3232', borderColor: 'rgba(45,50,50,0.2)', fontFamily: NAV_FONT }}>
                View All Work <ArrowRight className="w-3 h-3" />
              </Link>
            </FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
            Tell us about your brand, your goals, and what you need.<br />
            We will take it from there.
          </p>
          <div className="flex justify-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-[11px] uppercase tracking-[0.18em] bg-[#f1efef] text-[#2d3232] hover:bg-white transition-colors duration-300"
              style={{ fontFamily: NAV_FONT }}>
              Get In Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
