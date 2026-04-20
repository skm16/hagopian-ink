import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { LOGO, NAV_FONT } from '@/lib/brand';

const NAV_LINKS = [
  { label: 'Expertise', path: '/expertise' },
  { label: 'Work',      path: '/work' },
  { label: 'About',     path: '/about' },
  { label: 'Blog',      path: '/blog' },
];

export function Nav() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-5 flex justify-between items-center bg-[#0a0a0a]/85 backdrop-blur-md border-b border-white/[0.06]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <Link href="/">
          <img src={LOGO} alt="Hagopian Ink" className="h-7 w-auto brightness-0 invert cursor-pointer" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
        className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.1em] uppercase text-[#f5f0eb]/70"
        style={{ fontFamily: NAV_FONT }}>
        {NAV_LINKS.map(({ label, path }) => (
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
