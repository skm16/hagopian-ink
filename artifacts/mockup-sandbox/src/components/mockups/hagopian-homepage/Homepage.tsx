import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight, Mail, Phone, Droplet } from 'lucide-react';

const COLORS = {
  black: '#0a0a0a',
  white: '#ffffff',
  cream: '#f5f0eb',
  charcoal: '#2a2a2a',
};

const FONTS = {
  serif: "'Cormorant Garamond', serif",
  sans: "'Fira Sans', sans-serif",
};

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }: any) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction as keyof typeof directions] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export function Homepage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-[#f5f0eb] selection:bg-[#f5f0eb] selection:text-[#0a0a0a] overflow-x-hidden" style={{ fontFamily: FONTS.sans }}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center mix-blend-difference text-white">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <Droplet className="w-5 h-5 group-hover:scale-110 transition-transform duration-500 ease-out" fill="currentColor" />
          <span className="tracking-[0.2em] text-sm uppercase font-medium mt-1">Hagopian Ink</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:flex gap-8 tracking-[0.15em] text-xs uppercase font-medium mt-1"
        >
          <a href="#" className="hover:opacity-70 transition-opacity">Work</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Expertise</a>
          <a href="#" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Contact</a>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full flex flex-col justify-center items-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-[#0a0a0a]/60 z-10" />
          <img 
            src="/__mockup/images/hagopian-hero-bg.png" 
            alt="Dark ink texture" 
            className="w-full h-full object-cover scale-105"
          />
        </motion.div>

        <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto text-center mt-20">
          <FadeIn delay={0.2}>
            <h1 
              className="text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] font-light tracking-tight mb-8"
              style={{ fontFamily: FONTS.serif }}
            >
              Make your mark.
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl font-light text-[#f5f0eb]/90 max-w-2xl mx-auto mb-6 leading-relaxed">
              Brand design and digital experiences that help innovative organizations grow.
            </p>
            <p className="text-sm tracking-[0.1em] uppercase text-[#f5f0eb]/60 mb-12">
              Since 2002 &middot; Clients include Pepsi, Burberry, La Perla, Sesame Workshop & more
            </p>
          </FadeIn>

          <FadeIn delay={0.6} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative px-8 py-4 bg-[#f5f0eb] text-[#0a0a0a] overflow-hidden rounded-sm transition-transform hover:scale-105 duration-500">
              <span className="relative z-10 uppercase tracking-[0.15em] text-xs font-medium flex items-center gap-2">
                See Our Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="group relative px-8 py-4 border border-[#f5f0eb]/30 hover:border-[#f5f0eb] text-[#f5f0eb] overflow-hidden rounded-sm transition-all duration-500">
              <span className="relative z-10 uppercase tracking-[0.15em] text-xs font-medium">
                Start a Conversation
              </span>
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Results Strip */}
      <section className="w-full bg-[#111111] border-y border-[#2a2a2a] py-16 md:py-24 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-[scroll_40s_linear_infinite] w-max hover:[animation-play-state:paused]">
          {/* Double the items for seamless loop */}
          {[1, 2].map((loop) => (
            <div key={loop} className="flex shrink-0">
              {[
                { metric: "329%", desc: "more dollars raised", client: "Montefiore Hospital" },
                { metric: "1,030%", desc: "email list growth in 6 months", client: "P.Volve" },
                { metric: "300%", desc: "increase in signup conversion", client: "Gwynnie Bee" },
                { metric: "180%", desc: "increase in online donations", client: "Epilepsy Foundation" },
                { metric: "30%", desc: "increase in Valentine's Day sales", client: "La Perla" },
                { metric: "15–20%", desc: "open rate increase YoY", client: "Pepsi" },
              ].map((stat, i) => (
                <div key={i} className="px-12 md:px-20 border-r border-[#2a2a2a]/50 flex flex-col justify-center shrink-0">
                  <div className="text-5xl md:text-7xl font-light mb-2" style={{ fontFamily: FONTS.serif }}>{stat.metric}</div>
                  <div className="text-lg md:text-xl text-[#f5f0eb]/80 mb-2">{stat.desc}</div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[#f5f0eb]/40">{stat.client}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Expertise Pillars */}
      <section className="py-32 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="text-xs uppercase tracking-[0.2em] text-[#f5f0eb]/50 mb-16 flex items-center gap-4">
            <span className="w-12 h-px bg-[#f5f0eb]/30" />
            Core Expertise
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {[
            {
              title: "Brand Strategy + Identity",
              desc: "We build memorable brand systems for luxury, lifestyle, health, and nonprofit organizations — from naming and positioning to logo, standards, and launch.",
              result: "20+ years. 140 brand identities delivered."
            },
            {
              title: "Email Marketing + Campaigns",
              desc: "We design, build, and optimize email programs that acquire, retain, and re-engage customers — from welcome series to omnichannel campaign strategy.",
              result: "Avg. 40%+ open rates. $56K in new sales from new email automations in 4 months."
            },
            {
              title: "Health + MedTech Branding",
              desc: "We translate complex science and medical innovation into compelling, trustworthy brands — from medical device manufacturers to digital health startups.",
              result: "6-year Viant Medical campaign partnership. Building bold brands for the future of health."
            }
          ].map((pillar, i) => (
            <FadeIn key={i} delay={i * 0.2} className="flex flex-col group cursor-pointer">
              <h3 className="text-3xl md:text-4xl mb-6 pb-6 border-b border-[#2a2a2a] group-hover:border-[#f5f0eb]/50 transition-colors duration-500" style={{ fontFamily: FONTS.serif }}>
                {pillar.title}
              </h3>
              <p className="text-[#f5f0eb]/70 leading-relaxed mb-8 flex-grow">
                {pillar.desc}
              </p>
              <div className="bg-[#1a1a1a] p-6 rounded-sm mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#f5f0eb]/20 group-hover:bg-[#f5f0eb]/60 transition-colors duration-500" />
                <p className="text-sm font-medium italic text-[#f5f0eb]/90" style={{ fontFamily: FONTS.serif }}>{pillar.result}</p>
              </div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[#f5f0eb]/50 group-hover:text-[#f5f0eb] transition-colors mt-auto">
                Explore discipline <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* The Boutique Difference */}
      <section className="w-full bg-[#f5f0eb] text-[#0a0a0a] py-32 md:py-48 px-6 md:px-12 selection:bg-[#0a0a0a] selection:text-[#f5f0eb]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div className="lg:col-span-5 lg:pr-12">
            <FadeIn>
              <h2 className="text-5xl md:text-7xl leading-[1.1] mb-8" style={{ fontFamily: FONTS.serif }}>
                The personal touch. <br/>
                <span className="italic text-black/60">Big agency results.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-black/80 leading-relaxed mb-12">
                When you work with Hagopian Ink, you work directly with senior creative talent — not account managers or junior teams. Since 2002, we've brought boutique-level attention and care to every project, while delivering the strategic rigor and creative execution you'd expect from a major agency. Our clients stay with us for years — because results matter, and so does the relationship.
              </p>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7 relative">
            <FadeIn delay={0.4}>
              <div className="relative">
                <span className="absolute -top-16 -left-8 text-[12rem] leading-none text-black/5" style={{ fontFamily: FONTS.serif }}>"</span>
                <blockquote className="text-3xl md:text-4xl leading-snug relative z-10 mb-8" style={{ fontFamily: FONTS.serif }}>
                  Hagopian Ink is a boutique shop that provides the personal touch while executing big agency ideas.
                </blockquote>
                <cite className="block text-sm uppercase tracking-[0.1em] text-black/60 not-italic">
                  <span className="font-bold text-black block mb-1">Cecilia Pagkalinawan</span>
                  VP E-commerce & Direct Marketing<br/>
                  Frette Inc & La Perla Fashions Inc.
                </cite>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Selected Clients */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0a0a0a] border-b border-[#2a2a2a]">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.2em] text-[#f5f0eb]/50 mb-16">Trusted By</p>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 md:gap-x-20 md:gap-y-12">
            {[
              "Pepsi", "Burberry", "La Perla", "Frette", "Sesame Workshop", 
              "Audible", "Epilepsy Foundation", "Viant Medical", "Montefiore Hospital", 
              "P.Volve", "Gwynnie Bee", "Cannadips"
            ].map((client, i) => (
              <FadeIn key={i} delay={i * 0.05} direction="none" className="text-lg md:text-xl uppercase tracking-[0.15em] text-[#f5f0eb]/60 hover:text-[#f5f0eb] transition-colors cursor-default">
                {client}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-32 md:py-48 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl mb-4" style={{ fontFamily: FONTS.serif }}>Featured Work</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a href="#" className="flex items-center gap-2 uppercase tracking-[0.15em] text-sm hover:opacity-70 transition-opacity border-b border-[#f5f0eb]/30 pb-1">
              View All Case Studies <ArrowRight className="w-4 h-4" />
            </a>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              cat: "BRAND STRATEGY + IDENTITY",
              client: "Todd & Duncan",
              desc: "Complete brand identity for a 140-year Scottish cashmere heritage brand entering the US luxury market.",
              result: "Award-winning identity system",
              img: "/__mockup/images/hagopian-work-1.png"
            },
            {
              cat: "EMAIL MARKETING",
              client: "Frette — Escape to Italy",
              desc: "Multichannel contest campaign combining email, direct mail, and digital ads to drive list growth and sales.",
              result: "$54K in new sales · 58% traffic increase · 12K new email opt-ins",
              img: "/__mockup/images/hagopian-work-2.png"
            },
            {
              cat: "HEALTH + MEDTECH",
              client: "Viant Medical",
              desc: "6-year 'In It for Life' brand campaign across trade media, email, and digital — unifying a global medical device manufacturer's voice.",
              result: "Elevated brand visibility across 24 global locations",
              img: "/__mockup/images/hagopian-work-3.png"
            }
          ].map((work, i) => (
            <FadeIn key={i} delay={i * 0.2} className="group cursor-pointer">
              <div className="w-full aspect-[4/5] bg-[#1a1a1a] mb-8 overflow-hidden relative rounded-sm">
                <img 
                  src={work.img} 
                  alt={work.client}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-[#f5f0eb] text-[#0a0a0a] text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] inline-block mb-4">
                    {work.cat}
                  </div>
                  <h3 className="text-3xl mb-2" style={{ fontFamily: FONTS.serif }}>{work.client}</h3>
                </div>
              </div>
              <div className="pr-8">
                <p className="text-[#f5f0eb]/70 mb-6 text-sm leading-relaxed">{work.desc}</p>
                <p className="text-lg text-[#f5f0eb] italic" style={{ fontFamily: FONTS.serif }}>{work.result}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact / Footer */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-[#111111] border-t border-[#2a2a2a] text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f5f0eb]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn>
            <h2 className="text-6xl md:text-8xl mb-8" style={{ fontFamily: FONTS.serif }}>Let's create together.</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl font-light text-[#f5f0eb]/70 mb-16 leading-relaxed">
              Whether you're building a new brand from the ground up or evolving an established one, we'd love to hear about your project.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4} className="flex flex-col md:flex-row justify-center items-center gap-8 mb-20">
            <button className="px-10 py-5 bg-[#f5f0eb] text-[#0a0a0a] uppercase tracking-[0.15em] text-sm font-medium hover:scale-105 transition-transform duration-500 rounded-sm">
              Get in Touch
            </button>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-sm uppercase tracking-[0.1em] text-[#f5f0eb]/80">
              <a href="mailto:info@HagopianInk.com" className="flex items-center gap-2 hover:text-[#f5f0eb] transition-colors">
                <Mail className="w-4 h-4" /> info@HagopianInk.com
              </a>
              <a href="tel:212-327-1445" className="flex items-center gap-2 hover:text-[#f5f0eb] transition-colors">
                <Phone className="w-4 h-4" /> 212-327-1445
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.6} className="border-t border-[#2a2a2a] pt-12 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-[0.15em] text-[#f5f0eb]/40 gap-4">
            <div className="flex items-center gap-2">
              <Droplet className="w-3 h-3" fill="currentColor" /> HAGOPIAN INK
            </div>
            <p>&copy; 2025 Hagopian Ink. All rights reserved. New York, NY.</p>
          </FadeIn>
        </div>
      </section>

      {/* Global CSS for infinite scroll animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
