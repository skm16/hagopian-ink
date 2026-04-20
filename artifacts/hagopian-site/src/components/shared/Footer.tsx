import React from 'react';
import { Link } from 'wouter';
import { LOGO, NAV_FONT, SANS } from '@/lib/brand';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#191919] px-6 md:px-12 py-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <img src={LOGO} alt="Hagopian Ink" className="h-7 w-auto brightness-0 invert opacity-80 mb-6" />
            <p className="text-[13px] text-[#f5f0eb]/45 leading-relaxed mb-6" style={{ fontFamily: SANS }}>
              Boutique brand design and digital experiences. New York, NY.
            </p>
            <div className="flex gap-4">
              {['IG', 'LI', 'FB'].map(s => (
                <a key={s} href="https://hagopianink.com"
                  className="text-[10px] uppercase tracking-[0.14em] text-[#f5f0eb]/35 hover:text-[#f5f0eb]/70 transition-colors border border-[#252525] w-8 h-8 flex items-center justify-center"
                  style={{ fontFamily: NAV_FONT }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5f0eb]/35 mb-5" style={{ fontFamily: NAV_FONT }}>Services</p>
            <div className="space-y-3">
              {[
                ['Brand Identity', '/expertise'],
                ['UX/UI Design', '/expertise'],
                ['Email Marketing', '/expertise'],
                ['Nonprofit Campaigns', '/expertise'],
                ['Health + MedTech', '/expertise'],
              ].map(([label, path]) => (
                <Link key={label} href={path}
                  className="block text-[13px] text-[#f5f0eb]/50 hover:text-[#f5f0eb] transition-colors cursor-pointer"
                  style={{ fontFamily: SANS }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5f0eb]/35 mb-5" style={{ fontFamily: NAV_FONT }}>Company</p>
            <div className="space-y-3">
              <a href="https://hagopianink.com/wbe-branding-agency/" target="_blank" rel="noopener noreferrer"
                className="block text-[13px] text-[#f5f0eb]/50 hover:text-[#f5f0eb] transition-colors" style={{ fontFamily: SANS }}>About</a>
              <Link href="/work"
                className="block text-[13px] text-[#f5f0eb]/50 hover:text-[#f5f0eb] transition-colors cursor-pointer" style={{ fontFamily: SANS }}>Work</Link>
              <a href="https://hagopianink.com/blog/" target="_blank" rel="noopener noreferrer"
                className="block text-[13px] text-[#f5f0eb]/50 hover:text-[#f5f0eb] transition-colors" style={{ fontFamily: SANS }}>Blog</a>
              <a href="https://hagopianink.com/contact/" target="_blank" rel="noopener noreferrer"
                className="block text-[13px] text-[#f5f0eb]/50 hover:text-[#f5f0eb] transition-colors" style={{ fontFamily: SANS }}>Contact</a>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5f0eb]/35 mb-5" style={{ fontFamily: NAV_FONT }}>Contact</p>
            <div className="space-y-3 text-[13px] text-[#f5f0eb]/50" style={{ fontFamily: SANS }}>
              <p>info@HagopianInk.com</p>
              <p>212-327-1445</p>
              <p>New York, NY</p>
            </div>
          </div>
        </div>
        <div className="border-t border-[#191919] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.14em] text-[#f5f0eb]/25"
          style={{ fontFamily: NAV_FONT }}>
          <p>© 2025 Hagopian Ink. All rights reserved.</p>
          <p>Woman-Owned Business · Since 2002</p>
        </div>
      </div>
    </footer>
  );
}
