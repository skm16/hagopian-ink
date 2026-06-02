'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/shared/ui';
import { SANS, NAV_FONT } from '@/lib/brand';

export interface FeaturedWork {
  slug: string;
  title: string;
  thumbnail: string | null;
  primaryTermName: string;
}

/**
 * Shared "Featured Work" 4-up grid for the expertise subpages. Used to be
 * hardcoded per-subpage; now driven by the new WP expertise-tag taxonomy
 * via fetch-works-by-expertise.ts.
 *
 * When no works match (taxonomy missing, WP outage, no posts tagged yet),
 * render nothing rather than an empty grid — the parent section's heading
 * + label still appear, but there's no awkward blank row of placeholders.
 */
export function FeaturedWorkGrid({ works }: { works: FeaturedWork[] }) {
  if (works.length === 0) {
    return (
      <p className="text-sm text-[#2d3232]/45" style={{ fontFamily: SANS }}>
        Featured work is being curated. Check back soon.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {works.map((w, i) => (
          <FadeIn key={w.slug} delay={i * 0.1}>
            <Link href={`/work/${w.slug}`} className="group block">
              <div className="relative overflow-hidden aspect-[293/414] bg-[#e0ddd9]">
                {w.thumbnail && (
                  <Image
                    src={w.thumbnail}
                    alt={w.title}
                    fill
                    sizes="(min-width: 768px) 320px, 50vw"
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-[1.04] transition-transform duration-700"
                  />
                )}
              </div>
              <p
                className="mt-3 text-[13px] leading-snug"
                style={{ fontFamily: SANS, fontWeight: 400, color: '#2d3232' }}
              >
                {w.title}
              </p>
              {w.primaryTermName && (
                <p
                  className="text-[11px] text-[#2d3232]/55 mt-0.5"
                  style={{ fontFamily: SANS }}
                >
                  {w.primaryTermName}
                </p>
              )}
            </Link>
          </FadeIn>
        ))}
      </div>
      <div className="flex justify-end mt-8 border-t border-[#2d3232]/10 pt-6">
        <Link
          href="/work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: NAV_FONT,
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(45,50,50,0.7)',
            textDecoration: 'none',
          }}
          className="hover:text-[#2d3232] transition-colors"
        >
          View All Work
          <ArrowRight style={{ width: 12, height: 12 }} />
        </Link>
      </div>
    </>
  );
}
