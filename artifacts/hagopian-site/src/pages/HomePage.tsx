import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Link } from 'wouter';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel, Btn, BtnLight } from '@/components/shared/ui';
import ceciliaHeadshot from '@assets/image_1776807172711.png';
import {
  CDN, LOGO, VIDEO_MP4, VIDEO_POSTER,
  SERIF, SANS, NAV_FONT, BRAND_STYLES,
  CLIENT_LOGOS, CASE_STUDIES, SERVICES,
} from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function CaseStudyItem({ cs, i }: { cs: typeof CASE_STUDIES[number]; i: number }) {
  const flip = i % 2 !== 0;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Text card slides further than the image for a subtle parallax separation
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <FadeIn className="mt-12 md:mt-16 px-6 md:px-10">
      <div ref={ref} className="relative group max-w-[1400px] mx-auto">
        <div className="overflow-hidden w-full">
          <img src={cs.img} alt={cs.client}
            className="w-full h-auto block transition-transform duration-1000 group-hover:scale-[1.03]" />
        </div>
        <div className={`absolute top-6 ${flip ? 'left-8' : 'right-8'} text-[11px] uppercase tracking-[0.22em] text-white/60`}
          style={{ fontFamily: NAV_FONT }}>
          {String(i + 1).padStart(2, '0')}
        </div>
        <div className={`absolute bottom-0 ${flip ? 'right-0' : 'left-0'} translate-y-1/2 w-full md:w-[38%]`}>
          <motion.div
            style={{ y: textY }}
            className="bg-white px-10 py-9 shadow-[0_4px_40px_rgba(0,0,0,0.10)]">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#2d3232]/70 mb-4" style={{ fontFamily: NAV_FONT }}>{cs.category}</p>
            <h3 className="text-2xl md:text-3xl leading-snug mb-4 text-[#2d3232]" style={{ fontFamily: SERIF, fontWeight: 700 }}>{cs.title}</h3>
            <p className="text-[14px] text-[#2d3232]/70 leading-relaxed mb-6">{cs.desc}</p>
            <Link href={cs.href}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#2d3232]/70 hover:text-[#2d3232] border-b border-[#2d3232]/20 hover:border-[#2d3232] pb-1 transition-all duration-300"
              style={{ fontFamily: NAV_FONT }}>
              View Case Study <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="h-28 md:h-32" />
    </FadeIn>
  );
}

export function Homepage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="text-[#f5f0eb]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ═══════════════════════════════════════════════════════
          HERO — VIDEO BG
      ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex flex-col justify-center items-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ scale: heroScale }}>
          {/* Cooler, deeper overlay to match real site — no warm tint */}
          <div className="absolute inset-0 bg-[#2d3232]/12 z-10" />
          <video autoPlay loop muted playsInline poster={VIDEO_POSTER}
            className="w-full h-full object-cover">
            <source src={VIDEO_MP4} type="video/mp4" />
          </video>
        </motion.div>

        <motion.div className="relative z-10 px-6 md:px-16 max-w-6xl mx-auto text-center mt-16" style={{ opacity: heroOpacity }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-8"
            style={{ fontFamily: NAV_FONT }}>
            Evolving the world's leading brands since 2002
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.45, ease }}
            className="leading-[0.88] mb-10 tracking-[-0.01em] text-white"
            style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(3.75rem, 9.25vw, 8.5rem)' }}>
            Make your mark.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.65 }}
            className="text-[1.2rem] md:text-[1.35rem] font-light text-[#f5f0eb]/70 mb-12 leading-relaxed sm:whitespace-nowrap">
            Brand design and digital experiences that help innovative organizations grow.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85 }}
            className="flex flex-col sm:flex-row justify-center gap-4">
            <BtnLight href="/expertise" external={false}>
              Explore Expertise <ArrowRight className="w-4 h-4" />
            </BtnLight>
            <BtnLight href="/work" external={false} variant="outline">
              See Our Work
            </BtnLight>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 1L8 8L15 1" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CLIENT LOGO TRAIN
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#2d3232] py-16 border-b border-[#3a4040] overflow-hidden relative">
        <FadeIn className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/65" style={{ fontFamily: NAV_FONT }}>
            Trusted by world-class brands
          </p>
        </FadeIn>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#2d3232] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#2d3232] to-transparent z-10 pointer-events-none" />
          <div className="flex items-center w-max gap-14" style={{ animation: 'marquee 60s linear infinite' }}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center" style={{ width: 138, height: 78 }}>
                <img src={logo.src} alt={logo.alt}
                  style={logo.small ? { maxWidth: '80%', maxHeight: '80%' } : undefined}
                  className="max-w-full max-h-full object-contain brightness-0 invert opacity-75 hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICES BLOCKS (3 columns)
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#f1efef] text-[#2d3232] py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="max-w-3xl mb-20">
            <SectionLabel>Creative Communication</SectionLabel>
            <p className="text-lg md:text-xl text-[#2d3232]/70 leading-relaxed">
              As a trusted partner for brand identity, visual communication, web design, and digital experiences, we combine consumer insights with creativity for optimal results. Our emphasis is on producing thoughtful, conceptually driven work that comes from a clear understanding of our clients and their audience.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {SERVICES.map((svc, i) => (
              <FadeIn key={i} delay={i * 0.15} className="flex flex-col group relative">
                <div className="bg-white p-8 flex-grow flex flex-col shadow-[0_2px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.12)] transition-shadow duration-500">
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-4" style={{ color: svc.color, fontFamily: NAV_FONT }}>{svc.name}</p>
                  <h3 className="text-2xl md:text-3xl mb-5 leading-snug whitespace-pre-line" style={{ fontFamily: SERIF, fontWeight: 700 }}>{svc.title}</h3>
                  <p className="text-[#2d3232]/70 leading-relaxed mb-8 flex-grow text-[15px]">{svc.desc}</p>
                  <Link href={svc.link}
                    className="text-[11px] uppercase tracking-[0.14em] flex items-center gap-2 text-[#2d3232]/70 hover:text-[#2d3232] transition-colors border-b border-[#2d3232]/15 pb-1 self-start mb-8"
                    style={{ fontFamily: NAV_FONT }}>
                    {svc.linkText} <ArrowRight className="w-3 h-3" />
                  </Link>
                  <div className="overflow-hidden bg-[#f1efef]">
                    <img src={svc.img} alt={svc.name}
                      className="w-full h-auto block group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                {/* Ink drop icon - bottom-right, hangs below card edge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.4, y: 24 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.15, ease }}
                  className="absolute -bottom-9 right-6 md:right-8 w-[76px] h-[76px] z-10 pointer-events-none"
                >
                  <div
                    className="w-full h-full flex items-center justify-center bg-[#bfbab2] shadow-[0_4px_18px_rgba(0,0,0,0.08)]"
                    style={{ borderRadius: '0 50% 50% 50%', transform: 'rotate(45deg)' }}
                  >
                    <img
                      src={svc.icon}
                      alt=""
                      className="object-contain opacity-90"
                      style={{
                        width: svc.iconSize,
                        height: svc.iconSize,
                        transform: 'rotate(-45deg)',
                        ...(svc.iconFilter ? { filter: svc.iconFilter } : {}),
                      }}
                    />
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CASE STUDIES — alternating floating card
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#f1efef]">
        <FadeIn className="pt-20 pb-4 px-10 md:px-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#2d3232]/30" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#2d3232]/70 font-medium" style={{ fontFamily: NAV_FONT }}>Selected Work</span>
          </div>
          <h2 className="text-5xl md:text-7xl mt-3 leading-none text-[#2d3232]" style={{ fontFamily: SERIF, fontWeight: 700 }}>Case Studies</h2>
        </FadeIn>

        <div className="pb-8">
          {CASE_STUDIES.map((cs, i) => (
            <CaseStudyItem key={cs.id} cs={cs} i={i} />
          ))}
        </div>

        <FadeIn className="py-16 text-center border-t border-[#e0ddd9]">
          <Btn href="/work" external={false}>
            View All Work <ArrowRight className="w-4 h-4" />
          </Btn>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BOUTIQUE DIFFERENTIATOR + TESTIMONIALS
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#2d3232] py-32 md:py-52 px-6 md:px-12 border-t border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-8 items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel light>Our Approach</SectionLabel>
              <h2 className="text-3xl md:text-5xl leading-[1.05] mb-10" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                Two decades of expertise.<br />
                <span style={{ fontWeight: 700, fontStyle: 'italic', opacity: 0.5 }}>The personal attention only a studio can give.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-10">
                When you work with Hagopian Ink, you work directly with senior creative talent — not account managers or junior teams. Since 2002, we have brought focused, personal attention to every project while delivering the strategic thinking and creative execution you would expect from a major agency.
              </p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-12">
                Our clients stay with us for years — because results matter, and so does the relationship. We have maintained 5-year retainers with clients like Pepsi, built 6-year campaign partnerships with Viant Medical, and spent decades growing with the brands we believe in.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <BtnLight href="https://hagopianink.com/wbe-branding-agency/">
                About Us <ArrowRight className="w-4 h-4" />
              </BtnLight>
            </FadeIn>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <FadeIn delay={0.35}>
              <div className="border-l-2 border-[#f5f0eb]/12 pl-10 relative">
                <span className="absolute -top-12 -left-4 text-[9rem] leading-none text-[#f5f0eb]/05" style={{ fontFamily: SERIF }}>“</span>
                <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 italic text-[#f5f0eb]/75 relative" style={{ fontFamily: SERIF }}>
                  "Hagopian Ink is a boutique shop that provides the personal touch while executing big agency ideas."
                </blockquote>
                <cite className="not-italic flex items-center gap-4">
                  <img src={ceciliaHeadshot} alt="Cecilia Pagkalinawan" className="w-16 h-16 rounded-full object-cover border border-[#f5f0eb]/20" />
                  <span>
                    <span className="block text-[#f5f0eb] text-sm font-semibold tracking-wide mb-1">Cecilia Pagkalinawan</span>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-[#f5f0eb]/60" style={{ fontFamily: NAV_FONT }}>
                      VP E-commerce &amp; Direct Marketing<br />Frette Inc &amp; La Perla Fashions Inc.
                    </span>
                  </span>
                </cite>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          RESULTS PROOF GRID
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#2d3232] py-24 md:py-36 px-6 md:px-12 border-t border-[#3a4040]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="mb-16 text-center">
            <SectionLabel light>Results That Speak</SectionLabel>
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Creative campaigns that drive results.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-[#424848]">
            {[
              { n: '1,030%', label: 'email list growth in 6 months',      client: 'P.Volve' },
              { n: '49.5%',  label: 'average open rate achieved',          client: 'P.Volve' },
              { n: '$56K',   label: 'new sales from email automations',    client: 'Cannadips, 4 months' },
              { n: '12K',    label: 'new email opt-ins',                   client: 'Frette “Escape to Italy”' },
              { n: '58%',    label: 'increase in website unique visitors', client: 'Frette campaign' },
              { n: '300%',   label: 'increase in signup conversion',       client: 'Gwynnie Bee' },
              { n: '329%',   label: 'more dollars raised',                 client: 'Montefiore' },
              { n: '180%',   label: 'increase in online donations',        client: 'Epilepsy Foundation' },
              { n: '$22.2M', label: 'raised at annual gala',               client: 'Montefiore' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}
                className="border-r border-b border-[#424848] p-8 text-center hover:bg-[#343a3a] transition-colors duration-300">
                <div className="text-4xl md:text-5xl mb-2 font-light" style={{ fontFamily: SERIF }}>{s.n}</div>
                <div className="text-[13px] text-[#f5f0eb]/60 mb-2 leading-snug">{s.label}</div>
                <div className="text-[10px] text-[#f5f0eb]/45" style={{ fontFamily: SANS }}>{s.client}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACT / CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#2d3232] py-32 md:py-52 px-6 md:px-12 border-t border-[#3a4040] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(245,240,235,0.035) 0%, transparent 70%)' }} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel light>Start a Conversation</SectionLabel>
              <h2 className="text-5xl md:text-7xl mb-8 leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                Good design is good business.
              </h2>
              <p className="text-xl font-light text-[#f5f0eb]/60 mb-6" style={{ fontFamily: SANS }}>Let&#39;s create together.</p>
              <p className="text-lg text-[#f5f0eb]/60 leading-relaxed mb-12 max-w-lg">
                Whether you are building a new brand from the ground up or evolving an established one, we would love to hear about your project.
              </p>
              <div className="flex flex-col gap-4 mb-12">
                <a href="mailto:info@HagopianInk.com" className="flex items-center gap-3 text-[13px] text-[#f5f0eb]/60 hover:text-[#f5f0eb] transition-colors">
                  <Mail className="w-4 h-4 opacity-45" /> info@HagopianInk.com
                </a>
                <a href="tel:2123271445" className="flex items-center gap-3 text-[13px] text-[#f5f0eb]/60 hover:text-[#f5f0eb] transition-colors">
                  <Phone className="w-4 h-4 opacity-45" /> 212-327-1445
                </a>
              </div>
              <BtnLight href="https://hagopianink.com/contact/">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </BtnLight>
            </FadeIn>

            <FadeIn delay={0.25} className="bg-[#343a3a] border border-[#424848] p-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#f5f0eb]/65 mb-8" style={{ fontFamily: NAV_FONT }}>Send us a message</p>
              <div className="space-y-5">
                {[
                  { label: 'Your Name',             placeholder: 'Jane Smith',           type: 'text' },
                  { label: 'Email Address',          placeholder: 'jane@company.com',     type: 'email' },
                  { label: 'Company / Organization', placeholder: 'Company name',         type: 'text' },
                  { label: 'How can we help?',       placeholder: 'Tell us about your project...', type: 'textarea' },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-[10px] uppercase tracking-[0.16em] text-[#f5f0eb]/70 mb-2" style={{ fontFamily: NAV_FONT }}>
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea rows={4}
                        className="w-full bg-white border border-[#d4cfc9] text-[#2d3232] placeholder-[#2d3232]/35 text-sm px-4 py-3 focus:outline-none focus:border-[#f5f0eb]/80 resize-none transition-colors"
                        placeholder={field.placeholder} style={{ fontFamily: SANS }} />
                    ) : (
                      <input type={field.type}
                        className="w-full bg-white border border-[#d4cfc9] text-[#2d3232] placeholder-[#2d3232]/35 text-sm px-4 py-3 focus:outline-none focus:border-[#f5f0eb]/80 transition-colors"
                        placeholder={field.placeholder} style={{ fontFamily: SANS }} />
                    )}
                  </div>
                ))}
                <button className="w-full py-4 bg-[#f1efef] text-[#2d3232] text-[11px] uppercase tracking-[0.16em] hover:bg-white transition-colors duration-300 mt-4"
                  style={{ fontFamily: NAV_FONT }}>
                  Send Message
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
