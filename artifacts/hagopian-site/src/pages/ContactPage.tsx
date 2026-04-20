import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel } from '@/components/shared/ui';
import { VIDEO_MP4, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* ── VIDEO HERO ────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[420px] flex flex-col justify-end overflow-hidden text-[#f5f0eb]">
        <div className="absolute inset-0 bg-[#060810]/20 z-10" />
        <video autoPlay loop muted playsInline poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_MP4} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-20 max-w-[1400px] mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/50 mb-5"
            style={{ fontFamily: NAV_FONT }}>
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }}
            className="leading-[0.9]"
            style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(3.75rem, 9.25vw, 8.5rem)' }}>
            Let's talk.
          </motion.h1>
        </div>
      </section>

      {/* ── CONTACT GRID ──────────────────────────── */}
      <section className="bg-[#f5f0eb] text-[#0a0a0a] py-28 md:py-44 px-6 md:px-12 border-t border-[#0a0a0a]/8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — info */}
          <FadeIn>
            <SectionLabel>Start a Conversation</SectionLabel>
            <h2 className="text-4xl md:text-6xl mb-8 leading-[1.02] text-[#0a0a0a]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              Good design is good business.
            </h2>
            <p className="text-xl font-light text-[#0a0a0a]/55 mb-6" style={{ fontFamily: SERIF }}>
              Let us create together.
            </p>
            <p className="text-lg text-[#0a0a0a]/55 leading-relaxed mb-14 max-w-lg">
              Whether you are building a new brand from the ground up, evolving an established one, or launching your next digital campaign — we would love to hear about your project.
            </p>
            <div className="flex flex-col gap-5 mb-14">
              <a href="mailto:info@HagopianInk.com"
                className="flex items-center gap-4 text-[14px] text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors duration-250">
                <div className="w-10 h-10 border border-[#0a0a0a]/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 opacity-60" />
                </div>
                info@HagopianInk.com
              </a>
              <a href="tel:2123271445"
                className="flex items-center gap-4 text-[14px] text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors duration-250">
                <div className="w-10 h-10 border border-[#0a0a0a]/15 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 opacity-60" />
                </div>
                212-327-1445
              </a>
              <div className="flex items-center gap-4 text-[14px] text-[#0a0a0a]/40">
                <div className="w-10 h-10 border border-[#0a0a0a]/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 opacity-60" />
                </div>
                Born in NYC · Virtual Worldwide
              </div>
            </div>
            <div className="border-t border-[#0a0a0a]/10 pt-10">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#0a0a0a]/35 mb-4" style={{ fontFamily: NAV_FONT }}>
                Woman Owned · Creatively Driven · Since 2002
              </p>
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={0.2} className="bg-white border border-[#e0ddd8] p-10">
            {submitted ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-6 text-[#0a0a0a]" style={{ fontFamily: SERIF }}>Thank you.</div>
                <p className="text-[#0a0a0a]/55 text-lg leading-relaxed">
                  We have received your message and will be in touch within one business day.
                </p>
              </div>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/50 mb-8" style={{ fontFamily: NAV_FONT }}>
                  Send us a message
                </p>
                <form className="space-y-5" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                  {[
                    { label: 'Your Name',             placeholder: 'Jane Smith',           type: 'text',  required: true },
                    { label: 'Email Address',          placeholder: 'jane@company.com',     type: 'email', required: true },
                    { label: 'Company / Organization', placeholder: 'Company name',         type: 'text',  required: false },
                    { label: 'Phone',                  placeholder: '212-555-0000',         type: 'tel',   required: false },
                  ].map((field, i) => (
                    <div key={i}>
                      <label className="block text-[10px] uppercase tracking-[0.16em] text-[#0a0a0a]/55 mb-2" style={{ fontFamily: NAV_FONT }}>
                        {field.label}{field.required && <span className="text-[#0a0a0a]/40 ml-1">*</span>}
                      </label>
                      <input type={field.type} required={field.required}
                        className="w-full bg-[#f8f6f3] border border-[#d4cfc9] text-[#0a0a0a] placeholder-[#0a0a0a]/30 text-sm px-4 py-3 focus:outline-none focus:border-[#0a0a0a]/40 transition-colors"
                        placeholder={field.placeholder} style={{ fontFamily: SANS }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.16em] text-[#0a0a0a]/55 mb-2" style={{ fontFamily: NAV_FONT }}>
                      Service of Interest
                    </label>
                    <select className="w-full bg-[#f8f6f3] border border-[#d4cfc9] text-[#0a0a0a]/70 text-sm px-4 py-3 focus:outline-none focus:border-[#0a0a0a]/40 transition-colors appearance-none"
                      style={{ fontFamily: SANS }}>
                      <option value="">Select a service...</option>
                      <option>Brand Identity + Strategy</option>
                      <option>Website Design</option>
                      <option>Email Marketing</option>
                      <option>Health + MedTech Branding</option>
                      <option>Nonprofit + Fundraising</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.16em] text-[#0a0a0a]/55 mb-2" style={{ fontFamily: NAV_FONT }}>
                      How Can We Help? <span className="text-[#0a0a0a]/40">*</span>
                    </label>
                    <textarea rows={4} required
                      className="w-full bg-[#f8f6f3] border border-[#d4cfc9] text-[#0a0a0a] placeholder-[#0a0a0a]/30 text-sm px-4 py-3 focus:outline-none focus:border-[#0a0a0a]/40 resize-none transition-colors"
                      placeholder="Tell us about your project..."
                      style={{ fontFamily: SANS }} />
                  </div>
                  <button type="submit"
                    className="w-full py-4 bg-[#0a0a0a] text-[#f5f0eb] text-[11px] uppercase tracking-[0.16em] hover:bg-[#1a1a1a] transition-colors duration-300 mt-4"
                    style={{ fontFamily: NAV_FONT }}>
                    Send Message
                  </button>
                </form>
              </>
            )}
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
