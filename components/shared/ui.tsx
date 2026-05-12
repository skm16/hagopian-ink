'use client';

import React from 'react';
import { motion } from '@/components/motion';
import Link from 'next/link';
import { SANS, SERIF, NAV_FONT } from '@/lib/brand';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function FadeIn({ children, delay = 0, dir = 'up', className = '' }: {
  children: React.ReactNode; delay?: number; dir?: string; className?: string;
}) {
  const map: Record<string, object> = {
    up: { y: 40 }, down: { y: -40 }, left: { x: 40 }, right: { x: -40 }, none: {},
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...map[dir] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.85, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`w-8 h-px ${light ? 'bg-white/55' : 'bg-current opacity-45'}`} />
      <span className={`text-[10px] uppercase tracking-[0.22em] font-medium ${light ? 'text-white/70' : 'opacity-65'}`}
        style={{ fontFamily: NAV_FONT }}>{children}</span>
    </div>
  );
}

interface BtnProps {
  href: string;
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
  external?: boolean;
  className?: string;
}

export function Btn({ href, children, variant = 'solid', external = true, className = '' }: BtnProps) {
  const base = `inline-flex items-center gap-2 px-9 py-4 text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${className}`;
  const v = variant === 'solid'
    ? 'bg-[#2d3232] text-[#f5f0eb] hover:bg-[#3a4040]'
    : 'border border-[#2d3232]/30 text-[#2d3232] hover:border-[#2d3232]';
  const style = { fontFamily: NAV_FONT };

  if (!external) {
    return <Link href={href} className={`${base} ${v}`} style={style}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${v}`} style={style}>
      {children}
    </a>
  );
}

export function BtnLight({ href, children, variant = 'solid', external = true, className = '' }: BtnProps) {
  const base = `inline-flex items-center gap-2 px-9 py-4 text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${className}`;
  const v = variant === 'solid'
    ? 'bg-[#f1efef] text-[#2d3232] hover:bg-white'
    : 'border border-[#f5f0eb]/35 text-[#f5f0eb] hover:border-[#f5f0eb]';
  const style = { fontFamily: NAV_FONT };

  if (!external) {
    return <Link href={href} className={`${base} ${v}`} style={style}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${v}`} style={style}>
      {children}
    </a>
  );
}
