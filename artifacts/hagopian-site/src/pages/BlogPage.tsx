import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, BtnLight } from '@/components/shared/ui';
import { CDN, VIDEO_BLOG, VIDEO_BLOG_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const POSTS = [
  {
    category: 'Studio News',
    title: 'Evolving and Embracing Change: Celebrating 20 years at Hagopian Ink',
    excerpt: 'What a wild ride the last 20 years has been. Christina reflects on starting with a phone and laptop, growing through change, and building a studio around trust, creativity, and partnership.',
    date: 'September 21, 2022',
    img: `${CDN}/2022/09/HagopianInk_2022.png`,
    href: '/celebrating-20-years-at-hagopian-ink',
    local: true,
  },
  {
    category: 'Design + Business',
    title: 'Christina Hagopian: 41 email experts on email marketing trends',
    excerpt: 'A look at where email marketing is headed and how brands can create more thoughtful, useful, and connected customer communications.',
    date: 'February 2022',
    img: `${CDN}/2022/04/uplers_christina_hagopian.jpg`,
    href: 'https://hagopianink.com/christina-hagopian-41-email-experts-on-email-marketing-trends-to-look-out-for-in-2022/',
    local: false,
  },
  {
    category: 'Studio News',
    title: 'Judging the 45th Connecticut Art Director’s Club Awards',
    excerpt: 'An inside look at creative judging, design standards, and the work that rose to the top for the Connecticut Art Director’s Club.',
    date: 'August 2021',
    img: `${CDN}/2018/12/maxresdefault.jpg`,
    href: 'https://hagopianink.com/judging-the-45th-connecticut-art-directors-club-awards/',
    local: false,
  },
  {
    category: 'Design + Business',
    title: 'A best of holiday marketing recap',
    excerpt: 'What brands got right during the busiest promotional season of the year — and what smart marketers can learn from the inbox.',
    date: 'December 2020',
    img: `${CDN}/2022/07/ep37-episode-cover-final-v2.jpg`,
    href: 'https://hagopianink.com/a-best-of-2020-holiday-marketing-recap-needle-movement-podcast/',
    local: false,
  },
  {
    category: 'Work / Life',
    title: 'Needle Movement podcast with Christina Hagopian',
    excerpt: 'A conversation about creative partnership, email strategy, and the business of building brands that connect.',
    date: 'February 2020',
    img: `${CDN}/2022/07/ep13-episode-cover-christina-hagopian-final-v4.png`,
    href: 'https://hagopianink.com/blog/',
    local: false,
  },
  {
    category: 'Design + Business',
    title: 'E-commerce design mistakes that quietly kill conversions',
    excerpt: 'Small friction points compound quickly. Here are the patterns that get in the way of connection, confidence, and conversion.',
    date: 'January 2025',
    img: `${CDN}/2022/08/HI_home2_loum.jpg`,
    href: 'https://hagopianink.com/blog/',
    local: false,
  },
];

const TABS = ['View All', 'Design + Business', 'Studio News', 'Work / Life'];

function PostCard({ post, i }: { post: typeof POSTS[number]; i: number }) {
  const reversed = i % 2 !== 0;
  const inner = (
    <div className={`flex flex-col md:flex-row items-stretch gap-0 group${reversed ? ' md:flex-row-reverse' : ''}`}>
      <div className="w-full md:w-[42%] shrink-0 overflow-hidden bg-[#e7e3de] aspect-[3/2] md:aspect-auto">
        <img src={post.img} alt={post.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
      </div>
      <div className={`flex-1 flex flex-col justify-center py-10 ${reversed ? 'md:pr-14' : 'md:pl-14'}`}>
        <p className="text-[9px] uppercase tracking-[0.22em] text-[#2d3232]/38 mb-4" style={{ fontFamily: NAV_FONT }}>
          {post.category}
        </p>
        <h3 className="text-2xl md:text-3xl leading-[1.1] mb-5 group-hover:opacity-55 transition-opacity duration-300" style={{ fontFamily: SERIF, fontWeight: 700 }}>
          {post.title}
        </h3>
        <p className="text-[15px] text-[#2d3232]/55 leading-relaxed mb-7">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#2d3232]/40 group-hover:text-[#2d3232] transition-colors" style={{ fontFamily: NAV_FONT }}>
          Read More <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );

  return (
    <FadeIn delay={i * 0.08} className="border-t border-[#2d3232]/10">
      {post.local ? (
        <Link href={post.href}>{inner}</Link>
      ) : (
        <a href={post.href} target="_blank" rel="noopener noreferrer">{inner}</a>
      )}
    </FadeIn>
  );
}

export function BlogPage() {
  const [active, setActive] = useState('View All');

  const filtered = useMemo(() =>
    POSTS.filter(post => active === 'View All' || post.category === active),
  [active]);

  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      <section className="relative h-[55vh] min-h-[420px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[#2d3232]/10 z-10" />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_BLOG_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_BLOG} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-20 max-w-[1400px] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-6" style={{ fontFamily: NAV_FONT }}>Blog</p>
            <h1 className="text-6xl md:text-8xl leading-[0.92] text-white" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Fresh Ink.
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }}
            className="text-xl text-[#f5f0eb]/70 max-w-sm leading-relaxed pb-2">
            Branding, design, and digital strategy — the way we see it.
          </motion.p>
        </div>
      </section>

      <section className="bg-[#f1efef] border-b border-[#2d3232]/8 sticky top-[72px] z-10">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="flex items-center gap-0 overflow-x-auto no-scrollbar">
            {TABS.map(tab => (
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
        <div className="max-w-[1400px] mx-auto">
          {filtered.map((post, i) => <PostCard key={`${active}-${post.title}`} post={post} i={i} />)}
          {filtered.length === 0 && (
            <div className="border-t border-[#2d3232]/10 py-16 px-8 text-center">
              <p className="text-sm text-[#2d3232]/45 mb-6">No posts match your filter.</p>
              <button onClick={() => setActive('View All')}
                className="text-[10px] uppercase tracking-[0.16em] border-b border-[#2d3232]/25 pb-1" style={{ fontFamily: NAV_FONT }}>
                View All
              </button>
            </div>
          )}
          <div className="border-t border-[#2d3232]/10" />
        </div>
      </section>

      <section className="bg-[#2d3232] py-24 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-6" style={{ fontFamily: NAV_FONT }}>Fresh Ink</p>
          <h2 className="text-3xl md:text-5xl mb-8 leading-[1.0]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ideas that help brands make their mark.
          </h2>
          <BtnLight href="/contact" external={false}>
            Start a Conversation <ArrowRight className="w-4 h-4" />
          </BtnLight>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
