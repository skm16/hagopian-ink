import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, BtnLight } from '@/components/shared/ui';
import { CDN, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const POSTS = [
  {
    category: 'Branding',
    title: 'Why your brand guidelines are the most underused asset in your company',
    excerpt: 'A comprehensive brand standards document is only valuable if people actually use it. Here is how to build one your team will reach for every time.',
    date: 'March 2025',
    img: `${CDN}/2022/08/HI_case1_JosephRobert.jpg`,
    href: 'https://hagopianink.com/blog/',
  },
  {
    category: 'Email Marketing',
    title: 'The anatomy of an email that converts: what separates 40% open rates from 15%',
    excerpt: 'After managing email programs for Fortune 50 brands and emerging DTC companies alike, we have learned what the high-performers have in common.',
    date: 'February 2025',
    img: `${CDN}/2018/09/pepsi-1537458269464-3078.png`,
    href: 'https://hagopianink.com/blog/',
  },
  {
    category: 'UX/UI Design',
    title: 'E-commerce design mistakes that quietly kill conversions',
    excerpt: 'Small friction points compound fast. These are the patterns we see most often — and exactly how to fix them.',
    date: 'January 2025',
    img: `${CDN}/2022/08/HI_home2_loum.jpg`,
    href: 'https://hagopianink.com/blog/',
  },
  {
    category: 'Nonprofit',
    title: 'How consistent branding raised $22.2M at a single gala',
    excerpt: 'For Montefiore Medical Center, building a cohesive donor experience across print, email, and event materials made the case for giving impossible to ignore.',
    date: 'December 2024',
    img: `${CDN}/2022/09/HI_Web_BLM_header-scaled2.jpg`,
    href: 'https://hagopianink.com/blog/',
  },
  {
    category: 'Branding',
    title: 'What it really means to be a woman-owned business in 2025',
    excerpt: 'Beyond the certification — how being a WBE shapes the way we hire, pitch, partner, and design.',
    date: 'November 2024',
    img: `${CDN}/2022/08/HI_case1_JosephRobert.jpg`,
    href: 'https://hagopianink.com/blog/',
  },
  {
    category: 'Email Marketing',
    title: 'Building a welcome series that actually welcomes people',
    excerpt: 'Your first email sets the tone for the entire relationship. Most brands squander it. Here is a framework that does not.',
    date: 'October 2024',
    img: `${CDN}/2018/09/pepsi-1537458269464-3078.png`,
    href: 'https://hagopianink.com/blog/',
  },
];

export function BlogPage() {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ── PAGE HERO ─────────────────────────────── */}
      <section className="bg-[#0a0a0a] pt-36 pb-24 px-8 md:px-16 border-b border-[#191919]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-6" style={{ fontFamily: NAV_FONT }}>Ideas + Perspectives</p>
            <h1 className="text-6xl md:text-8xl leading-[0.92]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Our Thinking.
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }}
            className="text-xl text-[#f5f0eb]/50 max-w-sm leading-relaxed pb-2">
            Branding, design, and digital strategy — the way we see it.
          </motion.p>
        </div>
      </section>

      {/* ── POSTS GRID ────────────────────────────── */}
      <section className="bg-[#f1efef] text-[#0a0a0a] py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {POSTS.map((post, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <a href={post.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="overflow-hidden mb-6 aspect-[4/3]">
                    <img src={post.img} alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#a57b83] mb-3" style={{ fontFamily: NAV_FONT }}>
                    {post.category}
                  </p>
                  <h3 className="text-xl leading-[1.2] mb-3 group-hover:opacity-70 transition-opacity duration-300"
                    style={{ fontFamily: SERIF, fontWeight: 700 }}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#0a0a0a]/55 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]/35" style={{ fontFamily: NAV_FONT }}>
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-[#0a0a0a]/50 group-hover:text-[#0a0a0a] transition-colors"
                      style={{ fontFamily: NAV_FONT }}>
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL POSTS CTA ─────────────────────────── */}
      <section className="bg-[#0a0a0a] py-24 px-6 text-center border-t border-[#191919]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-6" style={{ fontFamily: NAV_FONT }}>See More</p>
          <h2 className="text-3xl md:text-5xl mb-8 leading-[1.0]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            More on the blog.
          </h2>
          <BtnLight href="https://hagopianink.com/blog/">
            Visit Full Blog <ArrowRight className="w-4 h-4" />
          </BtnLight>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
