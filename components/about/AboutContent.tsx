'use client';

import React from 'react';
import { motion as _motion, type MotionProps } from 'framer-motion';
import type { ComponentPropsWithRef, FC } from 'react';
import { ArrowRight, ArrowUpRight, Target, Gem, Heart, TrendingUp, Star, Users, Trophy, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, BtnLight } from '@/components/shared/ui';
import { HeroOverlay } from '@/components/shared/HeroOverlay';
import { VIDEO_ABOUT, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES, CLIENT_LOGOS, PHOTO_CHRISTINA } from '@/lib/brand';

// Typed wrappers to fix React 19 / framer-motion className inference gap
type PMotion  = ComponentPropsWithRef<'p'>  & MotionProps;
type H1Motion = ComponentPropsWithRef<'h1'> & MotionProps;
const motion = {
  ..._motion,
  p:  _motion.p  as unknown as FC<PMotion>,
  h1: _motion.h1 as unknown as FC<H1Motion>,
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const VALUES = [
  { icon: Target,     title: 'Strategy Before Style',          desc: 'Every project begins with deep listening. We learn your business, your audience, and your competition before a single pixel is placed.' },
  { icon: Gem,        title: 'Craft Without Compromise',        desc: 'We hold our work to exacting standards because attention to detail is what makes good work turn into great work.' },
  { icon: Heart,      title: 'Relationships Over Transactions', desc: 'Our longest client relationships span a decade or more. We build trust through transparency, reliability, and genuine investment in your success.' },
  { icon: TrendingUp, title: 'Results Are the Measure',         desc: 'Beautiful work is a given. Work that drives enrollment, donations, conversions, and loyalty is the goal.' },
  { icon: Star,       title: 'Women Owned. Creatively Driven.',  desc: 'We are woman-owned and creatively driven, with an unapologetic commitment to doing exceptional work. We lead with intention, high expectations, and a healthy dose of boss-lady energy.' },
  { icon: Users,      title: 'Curated Teams, by Design',        desc: 'Other agencies have internal teams — we specialize in building them. Our network of creative and strategic partners lets us assemble the most effective team for your specific project.' },
];

const AWARDS = [
  { name: 'FSEA Gold Leaf Award',                        org: 'Foil & Specialty Effects Association — Best use of Foil/Embossing, Greeting Card',    href: 'https://fsea.com/gold-leaf-awards-2022/' },
  { name: 'Healthcare Marketing IMPACT Award Winner',    org: 'Modern Healthcare — Direct Mail Campaign of the Year',                                  href: 'https://www.modernhealthcare.com/awards/2016-healthcare-marketing-impact-awards-hagopian-ink' },
  { name: 'GDUSA American Packaging Design Award',       org: 'Graphic Design USA',                                                                    href: null },
  { name: 'GDUSA American Web Design Awards',            org: 'Honorable Mention — Responsive design for Todd & Duncan e-commerce',                    href: 'https://www.awwwards.com/sites/todd-duncan-1' },
  { name: 'Vmarketics Top 100 Greeting Card Makers',     org: 'Vmarketics',                                                                            href: null },
  { name: 'STEP Inside Design: 10 Women to Watch',       org: 'STEP Inside Design',                                                                    href: null },
  { name: 'Stevie Award for Women Entrepreneurs',        org: 'Finalist',                                                                              href: null },
  { name: 'Print Regional Design Annual',                org: 'Print Magazine',                                                                        href: null },
  { name: 'AIGA Best of New England Award',              org: 'BoNE — Creative Excellence',                                                            href: null },
  { name: 'HOW International Annual Award for Business', org: 'HOW Magazine',                                                                          href: null },
];

const BOOKS = [
  { title: 'LogoLounge Master Library, Volume 3', subtitle: '3,000 Shapes and Symbol Logos', authors: 'Catharine Fishel, Bill Gardner', publisher: 'Rockport Publishers', href: 'https://www.amazon.com/LogoLounge-Master-Library-Volume-Symbols/dp/1592536905' },
  { title: '1,000 Greetings', subtitle: 'Creative Correspondence Designed for All Occasions', authors: 'Peter King & Company', publisher: 'Rockport Publishers', href: 'https://www.amazon.com/000-Greetings-Creative-Correspondence-Occasions/dp/B005GNLYLU' },
  { title: 'Progressive Direct Mail', subtitle: null, authors: null, publisher: 'PIE Books', href: 'https://www.amazon.com/Progressive-Direct-Mail-Pie-Books/dp/4894444569' },
];

const ARTICLES = [
  { pub: 'Forbes',                    title: 'How We Learned The Real Secrets To Effective Email Marketing',  href: 'https://www.forbes.com/sites/entrepreneursorganization/2017/12/04/how-we-learned-the-real-secrets-to-effective-email-marketing/#51d5496f2ee9' },
  { pub: 'Carnegie Mellon University',title: 'Christina Hagopian — Inked for Success',                        href: 'https://www.cmu.edu/homepage/society/2013/winter/inked-for-success.shtml' },
  { pub: 'Target Marketing / AdWeek', title: 'Focus on Responsive Email to Grow Your E-Commerce Business',    href: 'https://www.adweek.com/performance-marketing/focus-responsive-email-grow-your-e-commerce-business/' },
  { pub: 'Luxury Daily',              title: '6 tips to maximize the potential of luxury email campaigns',     href: 'https://www.luxurydaily.com/6-tips-to-maximize-the-potential-of-luxury-email-campaigns/' },
];

const MEDIUM = [
  { title: 'Why Personalization Matters — And How to Get it Right', href: 'https://medium.com/@christina.hagopian/why-personalization-matters-and-how-to-get-it-right-762bedb00c6d' },
  { title: 'The New Burberry Logo: I Hate It! But Wait...', href: 'https://medium.com/@christina.hagopian/the-new-burberry-logo-i-hate-it-but-wait-4475e02af0c0' },
];

const PROMOTIONS = [
  { title: 'Marble and Foil Stamped Business Cards', pub: 'UnderConsideration / For Print Only', href: 'https://www.underconsideration.com/fpo/archives/2017/03/hagopian-ink-business-cards.php' },
  { title: 'Mayan New Year, It is Not the End of the World', pub: 'UnderConsideration / For Print Only', href: 'https://www.underconsideration.com/fpo/archives/2013/06/its-not-the-end-of-the-world-122112-mayan-promo.php' },
  { title: 'Summer and Winter Solstice', pub: 'UnderConsideration / For Print Only', href: 'https://www.underconsideration.com/fpo/archives/2012/02/hagopian-ink-summer-and-winter-solstice-card.php' },
];

export function AboutContent() {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* VIDEO HERO */}
      <section className="relative h-[70vh] min-h-[540px] flex flex-col justify-end overflow-hidden">
        <HeroOverlay />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_POSTER} disablePictureInPicture x-webkit-airplay="deny" controlsList="nodownload nofullscreen noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_ABOUT} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-24 max-w-[1400px] mx-auto w-full">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-5" style={{ fontFamily: NAV_FONT }}>
            About Hagopian Ink
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }}
            className="text-5xl md:text-7xl leading-[0.92] mb-0 text-white" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Where strategy<br />
            <span style={{ fontStyle: 'italic', opacity: 0.55 }}>meets creativity.</span>
          </motion.h1>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#f1efef] text-[#2d3232] py-20 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { n: '2002', label: 'Year founded' },
            { n: 'W/O',  label: 'Woman Owned, Creatively Driven.' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.08} className="border-t-2 border-[#2d3232]/10 pt-6">
              <div className="text-4xl md:text-5xl mb-2 font-light" style={{ fontFamily: SERIF }}>{s.n}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#2d3232]/70" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="bg-[#2d3232] py-28 md:py-44 px-8 md:px-16 border-b border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <FadeIn>
            <SectionLabel light>Our Story</SectionLabel>
            <h2 className="text-3xl md:text-5xl leading-[1.1] mb-8" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Twenty-plus years of<br />doing this right.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-6">
              Hagopian Ink was founded in 2002 with a simple but demanding belief: that thoughtful brand strategy and exceptional design could move people and move business. Over two decades later, that conviction is unchanged.
            </p>
            <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-6">
              We are a creative studio born in New York City and now operating virtually around the globe. Our clients include Fortune 50 companies, luxury fashion houses, medical device manufacturers, nonprofit fundraising organizations, and emerging DTC brands.
            </p>
            <p className="text-lg text-[#f5f0eb]/60 leading-relaxed">
              We are woman-owned and creatively driven, with an unapologetic commitment to doing exceptional work.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-[#343a3a] py-28 md:py-36 px-8 md:px-16 border-t border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16"><SectionLabel light>Leadership</SectionLabel></FadeIn>
          <FadeIn className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
            <div className="shrink-0">
              <Image
                src={PHOTO_CHRISTINA}
                alt="Christina Hagopian, President and Creative Director"
                width={224}
                height={224}
                sizes="(min-width: 768px) 224px, 192px"
                className="w-48 md:w-56 aspect-square object-cover object-top"
              />
            </div>
            <div className="flex-1 max-w-2xl">
              <h3 className="text-3xl md:text-4xl mb-1 leading-tight" style={{ fontFamily: SERIF, fontWeight: 700 }}>Christina Hagopian</h3>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#f5f0eb]/60 mb-8" style={{ fontFamily: NAV_FONT }}>President &amp; Creative Director</p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-5">
                Christina Hagopian has spent more than two decades partnering with visionary leaders and organizations through periods of growth, change, and reinvention, helping them clarify who they are and how they present themselves to the world. A proud graduate of Carnegie Mellon University&apos;s School of Design, she brings deep creative training and seasoned instinct to every engagement.
              </p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-5">
                Known for her hands-on leadership style and strong creative direction, Christina guides brand evolution from strategy through execution across identity systems, rebrands, websites, and communications. She helps brands find clarity through thoughtful design and creative direction.
              </p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-5">
                Christina has led creative initiatives for organizations ranging from mission-driven nonprofits to medtech innovators and global brands including PepsiCo, Lancôme, Audible, Burberry, and Madison Square Garden. She believes great branding isn&apos;t built on trends, but on clarity, alignment, and a strong understanding of audience perception.
              </p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed">
                Outside the studio, Christina&apos;s creative instincts extend into everyday life. She spends time beachcombing along the shores of Cape Cod, experimenting with ceramics at the pottery wheel, and testing recipes for a family cookbook — pursuits that reflect the same curiosity, craftsmanship, and attention to detail that shape her work.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#2d3232] py-28 md:py-44 px-8 md:px-16 border-t border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel light>How We Work</SectionLabel>
            <h2 className="text-3xl md:text-5xl leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>Our principles.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeIn key={i} delay={i * 0.07} className="border-t border-[#474d4d] pt-8">
                  <div className="mb-4 w-9 h-9 rounded-sm flex items-center justify-center" style={{ background: 'rgba(245,240,235,0.07)' }}>
                    <Icon className="w-4 h-4" style={{ color: '#f5f0eb', opacity: 0.7 }} />
                  </div>
                  <h3 className="text-xl mb-3" style={{ fontFamily: SERIF, fontWeight: 700 }}>{v.title}</h3>
                  <p className="text-[14px] text-[#f5f0eb]/70 leading-relaxed">{v.desc}</p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="bg-[#f1efef] py-24 md:py-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>Recognition</SectionLabel>
            <h2 className="text-3xl md:text-4xl text-[#2d3232]" style={{ fontFamily: SERIF, fontWeight: 700 }}>Awards &amp; honors.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {AWARDS.map((a, i) => (
              <FadeIn key={i} delay={i * 0.04} className="py-5 border-t border-[#2d3232]/25 pr-8">
                {a.href ? (
                  <a href={a.href} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-3 group/link">
                    <div className="flex gap-3 items-start">
                      <Trophy className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#2d3232]/25" />
                      <div>
                        <p className="text-[15px] font-semibold leading-snug text-[#2d3232] group-hover/link:underline group-hover/link:text-[#2d3232]/70 transition-colors">{a.name}</p>
                        <p className="text-[13px] text-[#2d3232]/70 mt-1 leading-snug">{a.org}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3 h-3 shrink-0 mt-1 text-[#2d3232]/40 group-hover/link:text-[#2d3232] transition-colors" />
                  </a>
                ) : (
                  <div className="flex gap-3 items-start">
                    <Trophy className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#2d3232]/25" />
                    <div>
                      <p className="text-[15px] font-semibold leading-snug text-[#2d3232]">{a.name}</p>
                      <p className="text-[13px] text-[#2d3232]/70 mt-1 leading-snug">{a.org}</p>
                    </div>
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKS */}
      <section className="bg-[#f1efef] py-24 md:py-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>In Print</SectionLabel>
            <h2 className="text-3xl md:text-4xl text-[#2d3232]" style={{ fontFamily: SERIF, fontWeight: 700 }}>Books &amp; publications.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {BOOKS.map((b, i) => (
              <FadeIn key={i} delay={i * 0.1} className="py-8 border-t border-[#2d3232]/12 flex flex-col pr-8">
                <p className="text-[15px] font-semibold text-[#2d3232] leading-snug mb-1">{b.title}</p>
                {b.subtitle && <p className="text-[13px] text-[#2d3232]/70 mb-3 leading-snug">{b.subtitle}</p>}
                {b.authors  && <p className="text-[13px] text-[#2d3232]/70 mb-0.5">{b.authors}</p>}
                <p className="text-[13px] text-[#2d3232]/70 mb-5">{b.publisher}</p>
                <a href={b.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[#2d3232]/70 hover:text-[#2d3232]/80 transition-colors mt-auto">
                  View on Amazon <ExternalLink className="w-3 h-3" />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="bg-[#f1efef] py-24 md:py-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>Covered By</SectionLabel>
            <h2 className="text-3xl md:text-4xl text-[#2d3232]" style={{ fontFamily: SERIF, fontWeight: 700 }}>Articles &amp; features.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-16">
            {ARTICLES.map((a, i) => (
              <FadeIn key={i} delay={i * 0.07} className="py-5 border-t border-[#2d3232]/12 pr-8">
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-3 group/link">
                  <div>
                    <p className="text-[12px] text-[#2d3232]/70 mb-1.5">{a.pub}</p>
                    <p className="text-[15px] font-semibold text-[#2d3232] leading-snug group-hover/link:underline group-hover/link:text-[#2d3232]/70 transition-colors">{a.title}</p>
                  </div>
                  <ArrowUpRight className="w-3 h-3 shrink-0 mt-1 text-[#2d3232]/40 group-hover/link:text-[#2d3232] transition-colors" />
                </a>
              </FadeIn>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <FadeIn>
              <p className="text-[12px] text-[#2d3232]/70 mb-0 border-t border-[#2d3232]/12 pt-5">Medium — Written by Christina Hagopian</p>
              <div className="flex flex-col">
                {MEDIUM.map((m, i) => (
                  <a key={i} href={m.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-start justify-between gap-3 group py-5 border-t border-[#2d3232]/12 mt-5">
                    <p className="text-[15px] font-semibold text-[#2d3232] leading-snug group-hover:underline group-hover:text-[#2d3232]/70 transition-colors">{m.title}</p>
                    <ArrowUpRight className="w-3 h-3 shrink-0 mt-1 text-[#2d3232]/40 group-hover:text-[#2d3232] transition-colors" />
                  </a>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-[12px] text-[#2d3232]/70 mb-0 border-t border-[#2d3232]/12 pt-5">Hagopian Ink Promotions — Featured Work</p>
              <div className="flex flex-col">
                {PROMOTIONS.map((p, i) => (
                  <a key={i} href={p.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-start justify-between gap-3 group py-5 border-t border-[#2d3232]/12 mt-5">
                    <div>
                      <p className="text-[15px] font-semibold text-[#2d3232] leading-snug group-hover:underline group-hover:text-[#2d3232]/70 transition-colors">{p.title}</p>
                      <p className="text-[12px] text-[#2d3232]/70 mt-1">{p.pub}</p>
                    </div>
                    <ArrowUpRight className="w-3 h-3 shrink-0 mt-1 text-[#2d3232]/40 group-hover:text-[#2d3232] transition-colors" />
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS MARQUEE */}
      <section className="bg-[#2d3232] py-16 border-t border-[#3a4040] overflow-hidden relative">
        <FadeIn className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/[0.65]" style={{ fontFamily: NAV_FONT }}>Brands Who Trust Us</p>
        </FadeIn>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#2d3232] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#2d3232] to-transparent z-10 pointer-events-none" />
          <div className="flex items-center w-max gap-14" style={{ animation: 'marquee 60s linear infinite' }}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center" style={{ width: 138, height: 78 }}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={138}
                  height={78}
                  sizes="138px"
                  style={logo.small ? { maxWidth: '80%', maxHeight: '80%' } : undefined}
                  className="max-w-full max-h-full object-contain brightness-0 invert opacity-75 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2d3232] py-28 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-6" style={{ fontFamily: NAV_FONT }}>Work With Us</p>
          <h2 className="text-3xl md:text-5xl mb-8 leading-[0.95]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Ready to make your mark?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BtnLight href="/contact" external={false}>
              Start a Conversation <ArrowRight className="w-4 h-4" />
            </BtnLight>
            <BtnLight href="/work" external={false} variant="outline">
              See Our Work
            </BtnLight>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
