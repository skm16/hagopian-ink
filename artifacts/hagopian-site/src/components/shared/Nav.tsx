import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { ChevronDown, Menu, X } from 'lucide-react';
import logoSrc from '@assets/Ink_logo_1776700076843.png';
import { NAV_FONT, SANS } from '@/lib/brand';

const EXPERTISE_DROPDOWN = {
  services: [
    { label: 'Brand Identity',        path: '/expertise/brand-identity' },
    { label: 'Website Design',         path: '/expertise/ux-ui-design' },
    { label: 'Email Marketing',       path: '/expertise/email-marketing' },
  ],
  industries: [
    { label: 'Luxury + Lifestyle',    path: '/expertise/luxury-lifestyle' },
    { label: 'Health + MedTech',      path: '/expertise/health-medtech' },
    { label: 'Nonprofit Fundraising', path: '/expertise/nonprofit-fundraising' },
  ],
};

const OTHER_LINKS = [
  { label: 'Work',  path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Blog',  path: '/blog' },
];

export function Nav({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expertiseExpanded, setExpertiseExpanded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(alwaysVisible);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const expertiseActive = location.startsWith('/expertise');

  useEffect(() => {
    if (alwaysVisible) return;
    const handleScroll = () => setHasScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysVisible]);

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }
  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  }

  function closeMobile() {
    setMobileOpen(false);
    setExpertiseExpanded(false);
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-5 flex justify-between items-center transition-all duration-500 ${
        hasScrolled || mobileOpen
          ? 'bg-[#2d3232]/88 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'
      }`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <Link href="/" onClick={closeMobile}>
            <img src={logoSrc} alt="Hagopian Ink" className="h-11 w-auto cursor-pointer" />
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.1em] uppercase text-[#f5f0eb]/70"
          style={{ fontFamily: NAV_FONT }}>

          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link href="/expertise"
              className={`flex items-center gap-1.5 hover:text-[#f5f0eb] transition-colors duration-250 cursor-pointer ${expertiseActive ? 'text-[#f5f0eb]' : ''}`}>
              Expertise
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </Link>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-[#343a3a] border border-[#474d4d] shadow-2xl overflow-hidden">
                  <Link href="/expertise"
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3.5 text-[#f5f0eb]/60 hover:text-[#f5f0eb] hover:bg-[#3a4040] transition-colors border-b border-[#424848] text-[11px] uppercase tracking-[0.14em]"
                    style={{ fontFamily: NAV_FONT }}>
                    All Expertise
                  </Link>
                  <div className="px-5 pt-4 pb-1">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#f5f0eb]/60 mb-2.5" style={{ fontFamily: NAV_FONT }}>Services</p>
                    {EXPERTISE_DROPDOWN.services.map(({ label, path }) => (
                      <Link key={path} href={path}
                        onClick={() => setOpen(false)}
                        className={`block py-2 text-[12px] tracking-[0.08em] hover:text-[#f5f0eb] transition-colors duration-200 ${location === path ? 'text-[#f5f0eb]' : 'text-[#f5f0eb]/60'}`}
                        style={{ fontFamily: SANS }}>
                        {label}
                      </Link>
                    ))}
                  </div>
                  <div className="px-5 pt-3 pb-4 border-t border-[#424848] mt-1">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#f5f0eb]/60 mb-2.5" style={{ fontFamily: NAV_FONT }}>Industries</p>
                    {EXPERTISE_DROPDOWN.industries.map(({ label, path }) => (
                      <Link key={path} href={path}
                        onClick={() => setOpen(false)}
                        className={`block py-2 text-[12px] tracking-[0.08em] hover:text-[#f5f0eb] transition-colors duration-200 ${location === path ? 'text-[#f5f0eb]' : 'text-[#f5f0eb]/60'}`}
                        style={{ fontFamily: SANS }}>
                        {label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {OTHER_LINKS.map(({ label, path }) => (
            <Link key={label} href={path}
              className={`hover:text-[#f5f0eb] transition-colors duration-250 cursor-pointer ${location === path ? 'text-[#f5f0eb]' : ''}`}>
              {label}
            </Link>
          ))}

          <Link href="/contact"
            className="text-[13px] tracking-[0.1em] uppercase border border-[#f5f0eb]/30 px-5 py-2.5 hover:border-[#f5f0eb] hover:text-[#f5f0eb] transition-all duration-300 text-[#f5f0eb]/70 ml-4 cursor-pointer">
            Get in Touch
          </Link>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#f5f0eb]/70 hover:text-[#f5f0eb] transition-colors p-1"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed inset-0 z-40 bg-[#2d3232] flex flex-col pt-24 pb-10 px-8 md:hidden overflow-y-auto"
            style={{ fontFamily: NAV_FONT }}>

            {/* Expertise accordion */}
            <div className="border-b border-[#424848]">
              <button
                onClick={() => setExpertiseExpanded(v => !v)}
                className="w-full flex items-center justify-between py-5 text-[13px] uppercase tracking-[0.14em] text-[#f5f0eb]/70">
                Expertise
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expertiseExpanded ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {expertiseExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden">
                    <div className="mb-4 bg-[#343a3a] border border-[#474d4d]">
                      <Link href="/expertise" onClick={closeMobile}
                        className="block px-5 py-3.5 text-[#f5f0eb]/60 hover:text-[#f5f0eb] hover:bg-[#3a4040] transition-colors border-b border-[#424848] text-[11px] uppercase tracking-[0.14em]"
                        style={{ fontFamily: NAV_FONT }}>
                        All Expertise
                      </Link>
                      <div className="px-5 pt-4 pb-1">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#f5f0eb]/60 mb-2.5" style={{ fontFamily: NAV_FONT }}>Services</p>
                        {EXPERTISE_DROPDOWN.services.map(({ label, path }) => (
                          <Link key={path} href={path} onClick={closeMobile}
                            className={`block py-2 text-[12px] tracking-[0.08em] hover:text-[#f5f0eb] transition-colors duration-200 ${location === path ? 'text-[#f5f0eb]' : 'text-[#f5f0eb]/60'}`}
                            style={{ fontFamily: SANS }}>
                            {label}
                          </Link>
                        ))}
                      </div>
                      <div className="px-5 pt-3 pb-4 border-t border-[#424848] mt-1">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#f5f0eb]/60 mb-2.5" style={{ fontFamily: NAV_FONT }}>Industries</p>
                        {EXPERTISE_DROPDOWN.industries.map(({ label, path }) => (
                          <Link key={path} href={path} onClick={closeMobile}
                            className={`block py-2 text-[12px] tracking-[0.08em] hover:text-[#f5f0eb] transition-colors duration-200 ${location === path ? 'text-[#f5f0eb]' : 'text-[#f5f0eb]/60'}`}
                            style={{ fontFamily: SANS }}>
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other links */}
            {OTHER_LINKS.map(({ label, path }) => (
              <Link key={label} href={path} onClick={closeMobile}
                className={`py-5 text-[13px] uppercase tracking-[0.14em] border-b border-[#424848] ${location === path ? 'text-[#f5f0eb]' : 'text-[#f5f0eb]/70'}`}>
                {label}
              </Link>
            ))}

            {/* CTA */}
            <div className="mt-auto pt-10">
              <Link href="/contact" onClick={closeMobile}
                className="block w-full text-center text-[13px] uppercase tracking-[0.14em] border border-[#f5f0eb]/30 py-4 text-[#f5f0eb]/70 hover:border-[#f5f0eb] hover:text-[#f5f0eb] transition-all duration-300">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
