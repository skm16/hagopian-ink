import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { ChevronDown } from 'lucide-react';
import logoSrc from '@assets/Ink_logo_1776700076843.png';
import { NAV_FONT } from '@/lib/brand';

const EXPERTISE_DROPDOWN = {
  services: [
    { label: 'Brand Identity',        path: '/expertise/brand-identity' },
    { label: 'Website Design',         path: '/expertise/ux-ui-design' },
    { label: 'Email Marketing',       path: '/expertise/email-marketing' },
  ],
  industries: [
    { label: 'Nonprofit Fundraising', path: '/expertise/nonprofit-fundraising' },
    { label: 'Health + MedTech',      path: '/expertise/health-medtech' },
  ],
};

const OTHER_LINKS = [
  { label: 'Work',  path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Blog',  path: '/blog' },
];

export function Nav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const expertiseActive = location.startsWith('/expertise');

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }
  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-5 flex justify-between items-center bg-[#0a0a0a]/85 backdrop-blur-md border-b border-white/[0.06]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <Link href="/">
          <img src={logoSrc} alt="Hagopian Ink" className="h-11 w-auto cursor-pointer" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
        className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.1em] uppercase text-[#f5f0eb]/70"
        style={{ fontFamily: NAV_FONT }}>

        {/* Expertise with dropdown */}
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
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-[#111111] border border-[#252525] shadow-2xl overflow-hidden"
              >
                {/* Overview link */}
                <Link href="/expertise"
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3.5 text-[#f5f0eb]/50 hover:text-[#f5f0eb] hover:bg-[#1a1a1a] transition-colors border-b border-[#1e1e1e] text-[11px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: NAV_FONT }}>
                  All Expertise
                </Link>

                {/* Services */}
                <div className="px-5 pt-4 pb-1">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#f5f0eb]/28 mb-2.5" style={{ fontFamily: NAV_FONT }}>Services</p>
                  {EXPERTISE_DROPDOWN.services.map(({ label, path }) => (
                    <Link key={path} href={path}
                      onClick={() => setOpen(false)}
                      className={`block py-2 text-[12px] tracking-[0.08em] hover:text-[#f5f0eb] transition-colors duration-200 ${location === path ? 'text-[#f5f0eb]' : 'text-[#f5f0eb]/60'}`}
                      style={{ fontFamily: NAV_FONT }}>
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Industries */}
                <div className="px-5 pt-3 pb-4 border-t border-[#1e1e1e] mt-1">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#f5f0eb]/28 mb-2.5" style={{ fontFamily: NAV_FONT }}>Industries</p>
                  {EXPERTISE_DROPDOWN.industries.map(({ label, path }) => (
                    <Link key={path} href={path}
                      onClick={() => setOpen(false)}
                      className={`block py-2 text-[12px] tracking-[0.08em] hover:text-[#f5f0eb] transition-colors duration-200 ${location === path ? 'text-[#f5f0eb]' : 'text-[#f5f0eb]/60'}`}
                      style={{ fontFamily: NAV_FONT }}>
                      {label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Other links */}
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
    </nav>
  );
}
