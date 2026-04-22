import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Gem, Heart, TrendingUp, Star, Users, Trophy, BookOpen, ExternalLink, Newspaper } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn, BtnLight } from '@/components/shared/ui';
import { CDN, VIDEO_ABOUT, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES, CLIENT_LOGOS, PHOTO_CHRISTINA } from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const VALUES = [
  { icon: Target,    title: 'Strategy First',                  desc: 'Every project begins with deep listening. We learn your business, your audience, and your competition before a single pixel is placed.' },
  { icon: Gem,       title: 'Craft Without Compromise',         desc: 'We hold our work to exacting standards — because the difference between good and great is what clients remember.' },
  { icon: Heart,     title: 'Relationships Over Transactions',  desc: 'Our longest client relationships span a decade or more. We build trust through transparency, reliability, and genuine investment in your success.' },
  { icon: TrendingUp,title: 'Results Are the Measure',          desc: 'Beautiful work is a given. Work that drives enrollment, donations, conversions, and loyalty is the goal.' },
  { icon: Star,      title: 'Woman-Owned, Creatively Driven',   desc: 'As a woman-owned business, we bring a unique perspective to every engagement — and we believe diverse leadership builds stronger brands.' },
  { icon: Users,     title: 'Curated Teams, by Design',         desc: 'Other agencies have internal teams — we specialize in building them. Our network of creative and strategic partners lets us assemble the most effective team for your specific project.' },
];

const AWARDS = [
  { name: 'FSEA Gold Leaf Award',                           org: 'Foil & Specialty Effects Association — Best use of Foil/Embossing, Greeting Card',    href: 'https://fsea.com/gold-leaf-awards-2022/' },
  { name: 'Healthcare Marketing IMPACT Award Winner',       org: 'Modern Healthcare — Direct Mail Campaign of the Year',                                   href: 'https://www.modernhealthcare.com/awards/2016-healthcare-marketing-impact-awards-hagopian-ink' },
  { name: 'Healthcare Marketing IMPACT Award Winner',       org: 'Modern Healthcare — Direct Mail Campaign of the Year',                                   href: 'https://www.modernhealthcare.com/awards/2016-healthcare-marketing-impact-awards-hagopian-ink' },
  { name: 'GDUSA American Packaging Design Award',          org: 'Graphic Design USA',                                                                     href: null },
  { name: 'GDUSA American Web Design Awards',               org: 'Honorable Mention — Responsive design for Todd & Duncan e-commerce',                     href: 'https://www.awwwards.com/sites/todd-duncan-1' },
  { name: 'Vmarketics Top 100 Greeting Card Makers',        org: 'Vmarketics',                                                                             href: null },
  { name: 'STEP Inside Design: 10 Women to Watch',          org: 'STEP Inside Design',                                                                     href: null },
  { name: 'Stevie Award for Women Entrepreneurs',           org: 'Finalist',                                                                               href: null },
  { name: 'Print Regional Design Annual',                   org: 'Print Magazine',                                                                         href: null },
  { name: 'AIGA Best of New England Award',                 org: 'BoNE — Creative Excellence',                                                             href: null },
  { name: 'HOW International Annual Award for Business',    org: 'HOW Magazine',                                                                           href: null },
];

const BOOKS = [
  {
    title: 'LogoLounge Master Library, Volume 3',
    subtitle: '3,000 Shapes and Symbol Logos',
    authors: 'Catharine Fishel, Bill Gardner',
    publisher: 'Rockport Publishers',
    href: 'https://www.amazon.com/LogoLounge-Master-Library-Volume-Symbols/dp/1592536905',
  },
  {
    title: '1,000 Greetings',
    subtitle: 'Creative Correspondence Designed for All Occasions',
    authors: 'Peter King & Company',
    publisher: 'Rockport Publishers',
    href: 'https://www.amazon.com/000-Greetings-Creative-Correspondence-Occasions/dp/B005GNLYLU',
  },
  {
    title: 'Progressive Direct Mail',
    subtitle: null,
    authors: null,
    publisher: 'PIE Books',
    href: 'https://www.amazon.com/Progressive-Direct-Mail-Pie-Books/dp/4894444569',
  },
];

const ARTICLES = [
  { pub: 'Forbes',                    title: 'How We Learned The Real Secrets To Effective Email Marketing',                    href: 'https://www.forbes.com/sites/entrepreneursorganization/2017/12/04/how-we-learned-the-real-secrets-to-effective-email-marketing/#51d5496f2ee9' },
  { pub: 'Carnegie Mellon University',title: 'Christina Hagopian — Inked for Success',                                          href: 'https://www.cmu.edu/homepage/society/2013/winter/inked-for-success.shtml' },
  { pub: 'Target Marketing / AdWeek', title: 'Focus on Responsive Email to Grow Your E-Commerce Business',                      href: 'https://www.adweek.com/performance-marketing/focus-responsive-email-grow-your-e-commerce-business/' },
  { pub: 'Luxury Daily',              title: '6 tips to maximize the potential of luxury email campaigns',                       href: 'https://www.luxurydaily.com/6-tips-to-maximize-the-potential-of-luxury-email-campaigns/' },
];

const MEDIUM = [
  { title: 'Why Personalization Matters — And How to Get it Right',   href: 'https://medium.com/@christina.hagopian/why-personalization-matters-and-how-to-get-it-right-762bedb00c6d' },
  { title: 'The New Burberry Logo: I Hate It! But Wait\u2026',         href: 'https://medium.com/@christina.hagopian/the-new-burberry-logo-i-hate-it-but-wait-4475e02af0c0' },
];

const PROMOTIONS = [
  { title: 'Marble and Foil Stamped Business Cards',                                             pub: 'UnderConsideration / For Print Only',  href: 'https://www.underconsideration.com/fpo/archives/2017/03/hagopian-ink-business-cards.php' },
  { title: 'Mayan New Year, It\u2019s Not the End of the World',                                 pub: 'UnderConsideration / For Print Only',  href: 'https://www.underconsideration.com/fpo/archives/2013/06/its-not-the-end-of-the-world-122112-mayan-promo.php' },
  { title: 'Summer and Winter Solstice',                                                         pub: 'UnderConsideration / For Print Only',  href: 'https://www.underconsideration.com/fpo/archives/2012/02/hagopian-ink-summer-and-winter-solstice-card.php' },
  { title: 'Very Creative Examples of Holiday Cards That Will Make Anyone Feel More Special',    pub: 'TopDesignMag.com',                     href: 'http://www.topdesignmag.com/very-creative-examples-of-holiday-cards-that-will-make-anyone-feel-more-special/' },
];

const muted   = 'rgba(245,240,235,0.5)';
const border  = 'rgba(245,240,235,0.1)';
const dimmed  = 'rgba(245,240,235,0.35)';

export function AboutPage() {
  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ── VIDEO HERO ────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[540px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[#2d3232]/10 z-10" />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_ABOUT} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-24 max-w-[1400px] mx-auto w-full">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-5" style={{ fontFamily: NAV_FONT }}>
            About Hagopian Ink
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }}
            className="leading-[0.9] mb-0" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
            We help you make<br />
            <span style={{ fontStyle: 'italic', opacity: 0.55 }}>your mark.</span>
          </motion.h1>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────── */}
      <section className="bg-[#2d3232] py-28 md:py-44 px-8 md:px-16 border-b border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <FadeIn>
            <SectionLabel light>Our Story</SectionLabel>
            <h2 className="text-4xl md:text-6xl leading-[1.02] mb-8" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Twenty-plus years of doing this right.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-6">
              Hagopian Ink was founded in 2002 with a simple but demanding belief: that thoughtful brand strategy and exceptional design could move people — and move business. Over two decades later, that conviction is unchanged.
            </p>
            <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-6">
              We are a boutique creative studio born in New York City and now operating virtually around the globe, working with some of the world's most recognizable brands and the most ambitious organizations you have never heard of yet. Our clients include Fortune 50 companies, luxury fashion houses, medical device manufacturers, nonprofit fundraising organizations, and emerging DTC brands — and we treat every brief with the same level of care and strategic rigor.
            </p>
            <p className="text-lg text-[#f5f0eb]/60 leading-relaxed">
              As a woman-owned business, we bring a distinctive perspective to every engagement. We have built our reputation not on size, but on the depth of our relationships and the quality of our results.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── LEADERSHIP ────────────────────────────── */}
      <section className="bg-[#343a3a] py-28 md:py-36 px-8 md:px-16 border-t border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16"><SectionLabel light>Leadership</SectionLabel></FadeIn>
          <FadeIn className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
            <div className="shrink-0">
              <img src={PHOTO_CHRISTINA} alt="Christina Hagopian, President & Creative Director"
                className="w-48 md:w-56 aspect-square object-cover object-top" />
            </div>
            <div className="flex-1 max-w-2xl">
              <h3 className="text-3xl md:text-4xl mb-1 leading-tight" style={{ fontFamily: SERIF, fontWeight: 700 }}>Christina Hagopian</h3>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#f5f0eb]/45 mb-8" style={{ fontFamily: NAV_FONT }}>President &amp; Creative Director</p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-5">
                Christina founded Hagopian Ink in 2002 with a clear belief that thoughtful brand strategy and exceptional creative could genuinely move people — and move business. More than two decades on, that belief shapes every brief the studio takes.
              </p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-5">
                As President and Creative Director, she leads every client engagement directly — bringing a rare combination of strategic clarity and hands-on creative direction to organizations ranging from Fortune 50 companies to mission-driven nonprofits and emerging luxury brands.
              </p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed">
                Her philosophy is simple: great work starts with genuine partnership. She built Hagopian Ink not on size, but on the depth of its client relationships — many spanning a decade or more.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────── */}
      <section className="bg-[#f1efef] text-[#2d3232] py-20 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: '2002', label: 'Year founded' },
            { n: '100+', label: 'Brands developed' },
            { n: '20+',  label: 'Years of partnerships' },
            { n: 'W/O',  label: 'Woman owned, creatively driven' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.08} className="border-t-2 border-[#2d3232]/10 pt-6">
              <div className="text-4xl md:text-5xl mb-2 font-light" style={{ fontFamily: SERIF }}>{s.n}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#2d3232]/50" style={{ fontFamily: NAV_FONT }}>{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────── */}
      <section className="bg-[#2d3232] py-28 md:py-44 px-8 md:px-16 border-t border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel light>How We Work</SectionLabel>
            <h2 className="text-4xl md:text-6xl leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>Our principles.</h2>
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

      {/* ── AWARDS ────────────────────────────────── */}
      <section className="bg-[#f1efef] py-24 md:py-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>Recognition</SectionLabel>
            <h2 className="text-3xl md:text-4xl text-[#2d3232]" style={{ fontFamily: SERIF, fontWeight: 700 }}>Awards &amp; honors.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(45,50,50,0.08)' }}>
            {AWARDS.map((a, i) => (
              <FadeIn key={i} delay={i * 0.04} className="p-6 group" style={{ background: '#f1efef' }}>
                {a.href ? (
                  <a href={a.href} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-3 group/link">
                    <div className="flex gap-3 items-start">
                      <Trophy className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#2d3232]/25" />
                      <div>
                        <p className="text-[15px] font-semibold leading-snug text-[#2d3232] group-hover/link:text-[#2d3232]/60 transition-colors">{a.name}</p>
                        <p className="text-[13px] text-[#2d3232]/45 mt-1 leading-snug">{a.org}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 shrink-0 mt-1 text-[#2d3232]/25 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <div className="flex gap-3 items-start">
                    <Trophy className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#2d3232]/25" />
                    <div>
                      <p className="text-[15px] font-semibold leading-snug text-[#2d3232]">{a.name}</p>
                      <p className="text-[13px] text-[#2d3232]/45 mt-1 leading-snug">{a.org}</p>
                    </div>
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ──────────────────────────── */}
      <section className="bg-[#f5f0eb] py-24 md:py-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>In Print</SectionLabel>
            <h2 className="text-3xl md:text-4xl text-[#2d3232]" style={{ fontFamily: SERIF, fontWeight: 700 }}>Books &amp; publications.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {BOOKS.map((b, i) => (
              <FadeIn key={i} delay={i * 0.1} className="border-t border-[#2d3232]/15 pt-7">
                <p className="text-[15px] font-semibold text-[#2d3232] leading-snug mb-1">{b.title}</p>
                {b.subtitle && <p className="text-[13px] text-[#2d3232]/55 mb-3 leading-snug">{b.subtitle}</p>}
                {b.authors  && <p className="text-[13px] text-[#2d3232]/40 mb-0.5">{b.authors}</p>}
                <p className="text-[13px] text-[#2d3232]/40 mb-5">{b.publisher}</p>
                <a href={b.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[#2d3232]/50 hover:text-[#2d3232]/80 transition-colors">
                  View on Amazon <ExternalLink className="w-3 h-3" />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLES & FEATURES ───────────────────── */}
      <section className="bg-[#f1efef] py-24 md:py-36 px-8 md:px-16 border-t border-[#e0ddd9]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-14">
            <SectionLabel>Covered By</SectionLabel>
            <h2 className="text-3xl md:text-4xl text-[#2d3232]" style={{ fontFamily: SERIF, fontWeight: 700 }}>Articles &amp; features.</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-16" style={{ background: 'rgba(45,50,50,0.08)' }}>
            {ARTICLES.map((a, i) => (
              <FadeIn key={i} delay={i * 0.07} className="p-6 group" style={{ background: '#f1efef' }}>
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-3 group/link">
                  <div>
                    <p className="text-[12px] text-[#2d3232]/40 mb-1.5">{a.pub}</p>
                    <p className="text-[15px] font-semibold text-[#2d3232] leading-snug group-hover/link:text-[#2d3232]/60 transition-colors">{a.title}</p>
                  </div>
                  <ExternalLink className="w-3 h-3 shrink-0 mt-1 text-[#2d3232]/25 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </FadeIn>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Medium pieces */}
            <FadeIn>
              <p className="text-[12px] text-[#2d3232]/40 mb-6 border-b border-[#2d3232]/12 pb-3">Medium — Written by Christina Hagopian</p>
              <div className="flex flex-col gap-5">
                {MEDIUM.map((m, i) => (
                  <a key={i} href={m.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-start justify-between gap-3 group">
                    <p className="text-[15px] font-semibold text-[#2d3232] leading-snug group-hover:text-[#2d3232]/60 transition-colors">{m.title}</p>
                    <ExternalLink className="w-3 h-3 shrink-0 mt-1 text-[#2d3232]/25 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </FadeIn>

            {/* Promotions */}
            <FadeIn delay={0.1}>
              <p className="text-[12px] text-[#2d3232]/40 mb-6 border-b border-[#2d3232]/12 pb-3">Hagopian Ink Promotions — Featured Work</p>
              <div className="flex flex-col gap-5">
                {PROMOTIONS.map((p, i) => (
                  <a key={i} href={p.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-start justify-between gap-3 group">
                    <div>
                      <p className="text-[15px] font-semibold text-[#2d3232] leading-snug group-hover:text-[#2d3232]/60 transition-colors">{p.title}</p>
                      <p className="text-[12px] text-[#2d3232]/40 mt-1">{p.pub}</p>
                    </div>
                    <ExternalLink className="w-3 h-3 shrink-0 mt-1 text-[#2d3232]/25 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS ──────────────────────────── */}
      <section className="bg-[#2d3232] py-16 border-t border-[#3a4040] overflow-hidden relative">
        <FadeIn className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/65" style={{ fontFamily: NAV_FONT }}>
            Brands Who Trust Us
          </p>
        </FadeIn>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#2d3232] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#2d3232] to-transparent z-10 pointer-events-none" />
          <div className="flex items-center w-max gap-10" style={{ animation: 'marquee 60s linear infinite' }}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center" style={{ width: 120, height: 52 }}>
                <img src={logo.src} alt={logo.alt}
                  className="max-w-full max-h-full object-contain brightness-0 invert opacity-75 hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="bg-[#2d3232] py-28 px-6 text-center border-t border-[#3a4040]">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/40 mb-6" style={{ fontFamily: NAV_FONT }}>Work With Us</p>
          <h2 className="text-4xl md:text-6xl mb-8 leading-[0.95]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
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
