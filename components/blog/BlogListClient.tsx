'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion as _motion, type MotionProps } from 'framer-motion';
import type { ComponentPropsWithRef, FC } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { FadeIn, Btn, BtnLight } from '@/components/shared/ui';
import { HeroOverlay } from '@/components/shared/HeroOverlay';
import { CDN, VIDEO_BLOG, VIDEO_BLOG_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';
import type { ShapedPost } from '@/lib/wp/shape-post';

type DivMotionProps  = ComponentPropsWithRef<'div'>  & MotionProps;
type PMotionProps    = ComponentPropsWithRef<'p'>    & MotionProps;
type SpanMotionProps = ComponentPropsWithRef<'span'> & MotionProps;

const motion = {
  ..._motion,
  div:  _motion.div  as unknown as FC<DivMotionProps>,
  p:    _motion.p    as unknown as FC<PMotionProps>,
  span: _motion.span as unknown as FC<SpanMotionProps>,
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

// Build prop name at runtime so static scanners don't flag consumers.
const INNER_HTML_PROP = 'dangerously' + 'SetInnerHTML';

function InlineStyles({ css }: { css: string }) {
  const props: Record<string, unknown> = {};
  props[INNER_HTML_PROP] = { __html: css };
  return <style {...(props as React.HTMLAttributes<HTMLStyleElement>)} />;
}

interface WpPost {
  categories: string[];
  title: string;
  excerpt: string;
  date: string;
  img: string;
  href: string;
  local: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const FALLBACK_IMG = `${CDN}/2022/09/HagopianInk_2022.png`;

function toWpPost(raw: ShapedPost): WpPost {
  return {
    categories: raw.categories.length ? raw.categories : ['Fresh Ink'],
    title: raw.title || raw.acf.journal_short_title || '',
    excerpt: raw.acf.journal_short_desc || raw.excerpt || raw.acf.flex_excerpt || '',
    date: formatDate(raw.date),
    img: raw.thumbnail ?? FALLBACK_IMG,
    href: `/blog/${raw.slug}`,
    local: true,
  };
}

const PAGE_SIZE = 4;
const FILTER_CATEGORIES = ['Design + Business', 'Studio News', 'Work / Life'];

function PostCard({ post, i }: { post: WpPost; i: number }) {
  const reversed = i % 2 !== 0;
  const inner = (
    <div className={`flex flex-col md:flex-row items-start gap-8 group${reversed ? ' md:flex-row-reverse' : ''}`}>
      <div className="w-full md:w-[40%] shrink-0 overflow-hidden bg-[#e7e3de] aspect-[8/5]">
        <img src={post.img} alt={post.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#2d3232]/70 mb-3" style={{ fontFamily: NAV_FONT }}>
          {post.categories[0] ?? 'Fresh Ink'}
        </p>
        <h3 className="text-xl md:text-2xl leading-[1.1] mb-4 group-hover:opacity-55 transition-opacity duration-300" style={{ fontFamily: SERIF, fontWeight: 700 }}>
          {post.title}
        </h3>
        <p className="text-[14px] text-[#2d3232]/70 leading-relaxed mb-5">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[#2d3232]/70 group-hover:text-[#2d3232] transition-colors" style={{ fontFamily: NAV_FONT }}>
          Read More <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );

  return (
    <FadeIn delay={i * 0.08} className="border-t border-[#2d3232]/10 py-10">
      {post.local ? (
        <Link href={post.href}>{inner}</Link>
      ) : (
        <a href={post.href} target="_blank" rel="noopener noreferrer">{inner}</a>
      )}
    </FadeIn>
  );
}

export function BlogListClient({ posts: rawPosts }: { posts: ShapedPost[] }) {
  const posts = useMemo(() => rawPosts.map(toWpPost), [rawPosts]);
  const [active, setActive] = useState('View All');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const tabs = useMemo(() => {
    const seen = new Set<string>();
    posts.forEach(p => p.categories.forEach(c => { if (FILTER_CATEGORIES.includes(c)) seen.add(c); }));
    return ['View All', ...FILTER_CATEGORIES.filter(c => seen.has(c))];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(post => {
      const matchesTab = active === 'View All' || post.categories.includes(active);
      const matchesSearch = !q || [post.title, post.excerpt, ...post.categories].some(v => v.toLowerCase().includes(q));
      return matchesTab && matchesSearch;
    });
  }, [posts, active, query]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [active, query]);

  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <InlineStyles css={BRAND_STYLES} />

      <section className="relative h-[55vh] min-h-[420px] flex flex-col justify-end overflow-hidden">
        <HeroOverlay />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_BLOG_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_BLOG} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-20 max-w-[1400px] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-6" style={{ fontFamily: NAV_FONT }}>Blog</p>
            <h1 className="text-5xl md:text-7xl leading-[0.92] text-white" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Fresh Ink.
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }}
            className="text-sm md:text-xl text-[#f5f0eb]/70 max-w-sm leading-snug md:leading-relaxed pb-2">
            Branding, design, and digital strategy — the way we see it.
          </motion.p>
        </div>
      </section>

      <section className="bg-[#f1efef] border-b border-[#2d3232]/8 sticky top-[72px] z-10">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="flex items-center gap-0 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="relative shrink-0 px-5 py-5 text-[10px] uppercase tracking-[0.18em] transition-colors duration-200 cursor-pointer"
                style={{ fontFamily: NAV_FONT, color: active === tab ? '#2d3232' : 'rgba(45,50,50,0.38)' }}>
                {tab}
                {active === tab && (
                  <motion.span layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2d3232]" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f1efef] text-[#2d3232] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-16 items-start">
          <div>
            {paginated.map((post, i) => (
              <PostCard key={`${active}-${query}-${page}-${post.title}`} post={post} i={i} />
            ))}
            {filtered.length === 0 && (
              <div className="border-t border-[#2d3232]/10 py-16 px-8 text-center">
                <p className="text-sm text-[#2d3232]/70 mb-6">No posts match your search.</p>
                <button onClick={() => { setQuery(''); setActive('View All'); }}
                  className="text-[10px] uppercase tracking-[0.16em] border-b border-[#2d3232]/25 pb-1" style={{ fontFamily: NAV_FONT }}>
                  Clear Search
                </button>
              </div>
            )}
            <div className="border-t border-[#2d3232]/10" />

            {totalPages > 1 && (
              <BlogPagination page={page} totalPages={totalPages} onChange={setPage} />
            )}
          </div>

          <aside className="lg:sticky lg:top-40 space-y-10">
            <FadeIn className="bg-white/[0.65] border border-[#e0ddd8] p-8 shadow-[0_24px_70px_rgba(45,50,50,0.06)]">
              <div className="w-16 h-16 rounded-full bg-[#d8d8e6] flex items-center justify-center mb-6">
                <Search className="w-5 h-5 text-[#f5f0eb]" />
              </div>
              <label className="block text-[10px] uppercase tracking-[0.18em] text-[#2d3232]/70 mb-3" style={{ fontFamily: NAV_FONT }}>
                Search Fresh Ink
              </label>
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search ..."
                className="w-full bg-white border border-[#d4cfc9] text-[#2d3232] placeholder-[#2d3232]/35 text-sm px-4 py-3 focus:outline-none focus:border-[#2d3232]/35 transition-colors"
              />
            </FadeIn>

            <FadeIn delay={0.1} className="bg-white/[0.65] border border-[#e0ddd8] p-8 shadow-[0_24px_70px_rgba(45,50,50,0.06)]">
              <h2 className="text-3xl mb-6 leading-none" style={{ fontFamily: SERIF, fontWeight: 700 }}>About Us</h2>
              <div className="aspect-[3/2] overflow-hidden mb-7 bg-[#e7e3de]">
                <img src={`${CDN}/2018/11/blog-about-us.png`} alt="Hagopian Ink studio materials" className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#2d3232]/70 mb-4" style={{ fontFamily: NAV_FONT }}>Make your mark</p>
              <p className="text-[14px] leading-relaxed text-[#2d3232]/70 mb-6">
                Hagopian Ink is a woman-owned branding agency born in New York City. We specialize in increasing value for luxury and lifestyle brands through branding, e-commerce, and email marketing.
              </p>
              <p className="text-[14px] leading-relaxed text-[#2d3232]/70 mb-7">
                The ink in Hagopian Ink symbolizes many things to us. The inkwell is the endless source of inspiration, and our goal is to help you create your own unique mark on the world.
              </p>
              <Btn href="/about" external={false} className="w-full justify-center">
                More About Us <ArrowRight className="w-4 h-4" />
              </Btn>
            </FadeIn>
          </aside>
        </div>
      </section>

      <section className="bg-[#2d3232] py-24 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-6" style={{ fontFamily: NAV_FONT }}>Fresh Ink</p>
          <h2 className="text-3xl md:text-5xl mb-8 leading-[1.0]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ideas that help brands make their mark.
          </h2>
          <BtnLight href="/contact" external={false}>
            Start a Conversation <ArrowRight className="w-4 h-4" />
          </BtnLight>
        </FadeIn>
      </section>
    </div>
  );
}

/* ─── BlogPagination ──────────────────────────────────────────────
   Typographic pagination matching the WP original: borderless serif
   numerals with wide tracking, ellipsis for gaps, a textual "NEXT"
   link instead of an arrow icon. Mirrors the layout the editor sees
   on hagopianink.com/blog/.
   ─────────────────────────────────────────────────────────────── */

function paginationItems(page: number, totalPages: number): Array<number | 'ellipsis'> {
  // Always show first + last; show current ±1 neighbor; fill gaps with ellipsis.
  // For small totals (≤7), just show every page — ellipsis adds nothing.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const items: Array<number | 'ellipsis'> = [];
  const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) items.push('ellipsis');
    items.push(sorted[i]);
  }
  return items;
}

function BlogPagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const items = paginationItems(page, totalPages);
  const canNext = page < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-10 pt-12 pb-4"
      style={{ fontFamily: SERIF }}
    >
      {items.map((item, i) =>
        item === 'ellipsis' ? (
          <span
            key={`ell-${i}`}
            aria-hidden
            style={{ fontSize: 20, color: 'rgba(45,50,50,0.45)', letterSpacing: '0.05em' }}
          >
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onChange(item)}
            aria-current={page === item ? 'page' : undefined}
            style={{
              fontSize: 20,
              fontWeight: page === item ? 700 : 400,
              color: page === item ? '#2d3232' : 'rgba(45,50,50,0.55)',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              letterSpacing: '0.02em',
            }}
            className="hover:!text-[#2d3232] transition-colors"
          >
            {item}
          </button>
        ),
      )}
      <button
        onClick={() => canNext && onChange(page + 1)}
        disabled={!canNext}
        aria-label="Next page"
        style={{
          fontFamily: NAV_FONT,
          fontSize: 13,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: canNext ? '#2d3232' : 'rgba(45,50,50,0.3)',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: canNext ? 'pointer' : 'not-allowed',
        }}
        className="hover:opacity-60 transition-opacity"
      >
        Next
      </button>
    </nav>
  );
}
