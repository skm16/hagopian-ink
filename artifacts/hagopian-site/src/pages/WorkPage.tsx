import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, BtnLight } from '@/components/shared/ui';
import { VIDEO_WORK, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';
import { CASE_STUDIES } from '@/lib/case-studies';
import type { CaseStudy } from '@/lib/case-studies';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const HIDDEN_SLUGS = new Set([
  'viant-medical-brand-campaign',
  'pvolve-email-marketing',
  'epilepsy-foundation-brand-campaign',
  'malala-fund-email-design',
]);

type Group = {
  label: string;
  desc: string;
  slugs: string[];
};

const GROUPS: Group[] = [
  {
    label: 'Brand Identity',
    desc: 'Logos, marks, visual systems, and brand standards built to endure — across every medium and every moment.',
    slugs: [
      'joseph-robert',
      'todd-duncan-cashmere-branding-design',
      'lalalife-subscription-box-branding-and-website-design',
      'award-winning-logos',
      'christopher-street-financial',
      'hubspot-conference-brand-identity',
      'bewell',
    ],
  },
  {
    label: 'Website Design',
    desc: 'Digital experiences designed around how people actually move through your content — built to convert and built to last.',
    slugs: [
      'loumbeauty',
      'diamonds-in-glass-luxury-jewelry-website',
      'recoveryplus-health-brand',
    ],
  },
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
    label: 'Multichannel Campaigns',
    desc: 'From luxury brand launches to nonprofit fundraising drives — integrated campaigns across email, print, digital, and events that move people from awareness to action.',
    slugs: [
      'la-perla-multichannel-campaign-design',
      'montefiore-healthcare-design',
    ],
  },
];

function toAnchor(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

const BY_SLUG = Object.fromEntries(
  CASE_STUDIES.filter(cs => !HIDDEN_SLUGS.has(cs.slug)).map(cs => [cs.slug, cs])
);

/* ─────────────────────────────────────────────────────────
   PROJECT CAROUSEL
───────────────────────────────────────────────────────── */
const PER_PAGE = 4;

interface CarouselProps {
  cases: CaseStudy[];
  dark: boolean;
  cardBg: string;
  cardBorder: string;
  textColor: string;
  mutedColor: string;
  categoryColor: string;
}

function ProjectCarousel({ cases, dark, cardBg, cardBorder, textColor, mutedColor, categoryColor }: CarouselProps) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const needsCarousel = cases.length > PER_PAGE;
  const totalPages = Math.ceil(cases.length / PER_PAGE);
  const visible = cases.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  function go(delta: number) {
    const next = Math.max(0, Math.min(totalPages - 1, page + delta));
    if (next === page) return;
    setDir(delta);
    setPage(next);
  }

  const arrowBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: `1px solid ${dark ? 'rgba(245,240,235,0.2)' : 'rgba(45,50,50,0.15)'}`,
    background: 'transparent',
    cursor: 'pointer',
    color: dark ? '#f5f0eb' : '#2d3232',
    transition: 'background 0.2s ease, border-color 0.2s ease',
  };

  return (
    <div>
      {/* Card track */}
      <div className="overflow-hidden">
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={page}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? '4%' : '-4%', opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? '-4%' : '4%', opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {visible.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="group block"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <div className="overflow-hidden aspect-[293/414]">
                  <img
                    src={cs.thumb}
                    alt={cs.client}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <p
                    className="text-[9px] uppercase tracking-[0.2em] mb-1.5"
                    style={{ color: categoryColor, fontFamily: NAV_FONT }}
                  >
                    {cs.category}
                  </p>
                  <h3
                    className="text-[16px] leading-snug"
                    style={{ fontFamily: SANS, fontWeight: 400, color: textColor }}
                  >
                    {cs.client}
                  </h3>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation — only when >4 items */}
      {needsCarousel && (
        <div className="flex items-center justify-between mt-8">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > page ? 1 : -1); setPage(i); }}
                style={{
                  width: i === page ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === page ? (dark ? '#f5f0eb' : '#2d3232') : (dark ? 'rgba(245,240,235,0.2)' : 'rgba(45,50,50,0.18)'),
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s ease, background 0.2s ease',
                }}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => go(-1)}
              disabled={page === 0}
              style={{
                ...arrowBase,
                opacity: page === 0 ? 0.3 : 1,
                cursor: page === 0 ? 'default' : 'pointer',
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => go(1)}
              disabled={page === totalPages - 1}
              style={{
                ...arrowBase,
                opacity: page === totalPages - 1 ? 0.3 : 1,
                cursor: page === totalPages - 1 ? 'default' : 'pointer',
              }}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CATEGORY NAV BAR  — sticky anchor tabs
───────────────────────────────────────────────────────── */
function CategoryNav({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setStuck(!e.isIntersecting),
      { threshold: 1, rootMargin: '-1px 0px 0px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      for (let i = groups.length - 1; i >= 0; i--) {
        const id = toAnchor(groups[i].label);
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          return;
        }
      }
      setActive(null);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [groups]);

  function scrollTo(anchor: string) {
    const el = document.getElementById(anchor);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActive(anchor);
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: stuck ? 'rgba(45,50,50,0.97)' : '#f1efef',
        borderBottom: stuck
          ? '1px solid rgba(245,240,235,0.1)'
          : '1px solid rgba(45,50,50,0.1)',
        backdropFilter: stuck ? 'blur(12px)' : 'none',
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}
    >
      <div className="px-8 md:px-16 max-w-[1400px] mx-auto" style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, whiteSpace: 'nowrap' }}>
          {groups.map((g, i) => {
            const anchor = toAnchor(g.label);
            const isActive = active === anchor;
            const textCol = stuck
              ? (isActive ? '#f5f0eb' : 'rgba(245,240,235,0.45)')
              : (isActive ? '#2d3232' : 'rgba(45,50,50,0.4)');
            const borderCol = stuck
              ? (isActive ? '#f5f0eb' : 'transparent')
              : (isActive ? '#2d3232' : 'transparent');
            return (
              <button
                key={anchor}
                onClick={() => scrollTo(anchor)}
                style={{
                  fontFamily: NAV_FONT,
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: textCol,
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${borderCol}`,
                  padding: '18px 20px 16px',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = stuck
                      ? 'rgba(245,240,235,0.8)'
                      : 'rgba(45,50,50,0.75)';
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = textCol;
                }}
              >
                <span style={{ marginRight: 8, opacity: 0.35 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {g.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   WORK PAGE
───────────────────────────────────────────────────────── */
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
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-6" style={{ fontFamily: NAV_FONT }}>
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

      {/* ── CATEGORY NAV ───────────────────── */}
      <CategoryNav groups={GROUPS} />

      {/* ── GROUPED PORTFOLIO ──────────────── */}
      {GROUPS.map((group, gi) => {
        const cases = group.slugs.map(s => BY_SLUG[s]).filter(Boolean);
        if (!cases.length) return null;
        const dark = gi % 2 === 1;
        const bg          = dark ? '#2d3232' : '#f1efef';
        const textColor   = dark ? '#f5f0eb'  : '#2d3232';
        const mutedColor  = dark ? 'rgba(245,240,235,0.45)' : 'rgba(45,50,50,0.45)';
        const borderColor = dark ? 'rgba(245,240,235,0.1)'  : 'rgba(45,50,50,0.1)';
        const cardBg      = dark ? '#343a3a' : '#ffffff';
        const cardBorder  = dark ? '#424848' : '#e8e4e0';
        const categoryColor = dark ? 'rgba(245,240,235,0.35)' : 'rgba(45,50,50,0.35)';

        return (
          <section
            key={group.label}
            id={toAnchor(group.label)}
            style={{ background: bg, scrollMarginTop: 50 }}
          >
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
              <div className="max-w-[1400px] mx-auto">
                <FadeIn>
                  <ProjectCarousel
                    cases={cases}
                    dark={dark}
                    cardBg={cardBg}
                    cardBorder={cardBorder}
                    textColor={textColor}
                    mutedColor={mutedColor}
                    categoryColor={categoryColor}
                  />
                </FadeIn>
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
          <p className="text-lg text-[#f5f0eb]/60 mb-12 max-w-xl mx-auto leading-relaxed">
            You don't need to have it all figured out — that's what we're here for. Share your story, and we'll help shape the strategy.
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
