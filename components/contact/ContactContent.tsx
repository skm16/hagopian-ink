'use client';

import React, { useState } from 'react';
import { motion as _motion, type MotionProps } from 'framer-motion';
import type { ComponentPropsWithRef, FC } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, SectionLabel } from '@/components/shared/ui';
import { HeroOverlay } from '@/components/shared/HeroOverlay';
import { Turnstile } from '@/components/contact/Turnstile';
import { VIDEO_CONTACT, VIDEO_POSTER, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

// Typed wrappers to fix React 19 / framer-motion className inference gap
type PMotion  = ComponentPropsWithRef<'p'>  & MotionProps;
type H1Motion = ComponentPropsWithRef<'h1'> & MotionProps;
const motion = {
  ..._motion,
  p:  _motion.p  as unknown as FC<PMotion>,
  h1: _motion.h1 as unknown as FC<H1Motion>,
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  /** Honeypot — must remain empty for real submissions */
  website: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  company: '',
  phone: '',
  service: '',
  message: '',
  website: '',
};

export function ContactContent() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileReset, setTurnstileReset] = useState(0);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(body?.error ?? 'Something went wrong. Please email us directly.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setErrorMessage('Network error. Please try again or email us directly.');
      setStatus('error');
    } finally {
      setTurnstileToken('');
      setTurnstileReset((n) => n + 1);
    }
  }

  const submitted = status === 'success';

  return (
    <div style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      {/* VIDEO HERO */}
      <section className="relative h-[55vh] min-h-[420px] flex flex-col justify-end overflow-hidden text-[#f5f0eb]">
        <HeroOverlay />
        <video autoPlay loop muted playsInline preload="none" poster={VIDEO_POSTER} disablePictureInPicture x-webkit-airplay="deny" controlsList="nodownload nofullscreen noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={VIDEO_CONTACT} type="video/mp4" />
        </video>
        <div className="relative z-20 px-8 md:px-16 pb-16 md:pb-20 max-w-[1400px] mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-5"
            style={{ fontFamily: NAV_FONT }}>
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }}
            className="text-5xl md:text-7xl leading-[0.92] text-white"
            style={{ fontFamily: SERIF, fontWeight: 700 }}>
            Let's create <span style={{ fontStyle: 'italic', opacity: 0.55 }}>together.</span>
          </motion.h1>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="bg-[#f1efef] text-[#2d3232] py-28 md:py-44 px-6 md:px-12 border-t border-[#2d3232]/8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left info */}
          <FadeIn>
            <SectionLabel>Good design is good business.</SectionLabel>
            <h2 className="text-3xl md:text-5xl mb-8 leading-[1.02] text-[#2d3232]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              True partnership <span className="whitespace-nowrap">starts here.</span>
            </h2>
            <p className="text-lg text-[#2d3232]/70 leading-relaxed mb-14 max-w-lg">
              Whether you are building a new brand from the ground up, evolving an established one, or launching your next digital campaign — we would love to hear about your project.
            </p>
            <div className="flex flex-col gap-5 mb-14">
              <a href="mailto:info@HagopianInk.com"
                className="flex items-center gap-4 text-[14px] text-[#2d3232]/70 hover:text-[#2d3232] transition-colors duration-250">
                <div className="w-10 h-10 border border-[#2d3232]/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 opacity-60" />
                </div>
                info@HagopianInk.com
              </a>
              <a href="tel:2123271445"
                className="flex items-center gap-4 text-[14px] text-[#2d3232]/70 hover:text-[#2d3232] transition-colors duration-250">
                <div className="w-10 h-10 border border-[#2d3232]/15 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 opacity-60" />
                </div>
                212-327-1445
              </a>
              <div className="flex items-center gap-4 text-[14px] text-[#2d3232]/70">
                <div className="w-10 h-10 border border-[#2d3232]/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 opacity-60" />
                </div>
                Born in NYC · Virtual Worldwide
              </div>
            </div>
            <div className="border-t border-[#2d3232]/10 pt-10">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#2d3232]/70 mb-4" style={{ fontFamily: NAV_FONT }}>
                Where Strategy Meets Creativity · Since 2002
              </p>
            </div>
          </FadeIn>

          {/* Right form */}
          <FadeIn delay={0.2} className="bg-white border border-[#e0ddd8] p-10">
            {submitted ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-6 text-[#2d3232]" style={{ fontFamily: SERIF }}>Thank you.</div>
                <p className="text-[#2d3232]/70 text-lg leading-relaxed">
                  We have received your message and will be in touch within one business day.
                </p>
              </div>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#2d3232]/70 mb-8" style={{ fontFamily: NAV_FONT }}>
                  Send us a message
                </p>
                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  {(
                    [
                      { key: 'name',    label: 'Your Name',             placeholder: 'Jane Smith',       type: 'text',  required: true,  autoComplete: 'name' },
                      { key: 'email',   label: 'Email Address',         placeholder: 'jane@company.com', type: 'email', required: true,  autoComplete: 'email' },
                      { key: 'company', label: 'Company / Organization', placeholder: 'Company name',     type: 'text',  required: false, autoComplete: 'organization' },
                      { key: 'phone',   label: 'Phone',                  placeholder: '212-555-0000',     type: 'tel',   required: false, autoComplete: 'tel' },
                    ] as const
                  ).map(field => (
                    <div key={field.key}>
                      <label className="block text-[10px] uppercase tracking-[0.16em] text-[#2d3232]/70 mb-2" style={{ fontFamily: NAV_FONT }}>
                        {field.label}{field.required && <span className="text-[#2d3232]/70 ml-1">*</span>}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        autoComplete={field.autoComplete}
                        value={form[field.key]}
                        onChange={e => updateField(field.key, e.target.value)}
                        className="w-full bg-white border border-[#d4cfc9] text-[#2d3232] placeholder-[#2d3232]/30 text-sm px-4 py-3 focus:outline-none focus:border-[#2d3232]/40 transition-colors"
                        placeholder={field.placeholder}
                        style={{ fontFamily: SANS }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.16em] text-[#2d3232]/70 mb-2" style={{ fontFamily: NAV_FONT }}>
                      Service of Interest
                    </label>
                    <select
                      value={form.service}
                      onChange={e => updateField('service', e.target.value)}
                      className="w-full bg-white border border-[#d4cfc9] text-[#2d3232]/70 text-sm px-4 py-3 focus:outline-none focus:border-[#2d3232]/40 transition-colors appearance-none"
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
                    <label className="block text-[10px] uppercase tracking-[0.16em] text-[#2d3232]/70 mb-2" style={{ fontFamily: NAV_FONT }}>
                      How Can We Help? <span className="text-[#2d3232]/70">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={e => updateField('message', e.target.value)}
                      className="w-full bg-white border border-[#d4cfc9] text-[#2d3232] placeholder-[#2d3232]/30 text-sm px-4 py-3 focus:outline-none focus:border-[#2d3232]/40 resize-none transition-colors"
                      placeholder="Tell us about your project..."
                      style={{ fontFamily: SANS }}
                    />
                  </div>

                  {/* Honeypot — hidden from humans, bots fill it */}
                  <div style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }} aria-hidden="true">
                    <label>
                      Website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={e => updateField('website', e.target.value)}
                      />
                    </label>
                  </div>

                  <Turnstile
                    onVerify={setTurnstileToken}
                    onExpire={() => setTurnstileToken('')}
                    resetSignal={turnstileReset}
                  />

                  {status === 'error' && errorMessage && (
                    <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3" style={{ fontFamily: SANS }}>
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-4 bg-[#2d3232] text-[#f5f0eb] text-[11px] uppercase tracking-[0.16em] hover:bg-[#3a4040] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 mt-4"
                    style={{ fontFamily: NAV_FONT }}>
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
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
