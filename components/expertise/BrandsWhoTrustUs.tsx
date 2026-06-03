'use client';

import Image from 'next/image';
import { FadeIn, SectionLabel } from '@/components/shared/ui';
import { CDN } from '@/lib/brand';

/**
 * "Brands Who Trust Us" — the fixed 10-logo, 2-row grid used on every
 * expertise child page. Order and selection match the live WP design:
 * Row 1: La Perla · Lancôme · Burberry · Armani Exchange · Frette
 * Row 2: Madison Square Garden · Mercedes-Benz · Aston Martin · Condé Nast · Estée Lauder
 */
const TRUST_LOGOS: ReadonlyArray<{ src: string; alt: string; scale?: number }> = [
  { src: `${CDN}/2018/09/09_HI_logo_laperla.png`,     alt: 'La Perla' },
  { src: `${CDN}/2018/09/02_HI_logo_lancome.png`,     alt: 'Lancôme' },
  { src: `${CDN}/2018/09/06_HI_logo_burberry.png`,    alt: 'Burberry' },
  { src: `${CDN}/2018/09/07_HI_logo_armani.png`,      alt: 'Armani Exchange' },
  { src: `${CDN}/2018/09/14_HI_logo_frette.png`,      alt: 'Frette' },
  { src: `${CDN}/2018/09/11_HI_logo_msg.png`,         alt: 'Madison Square Garden' },
  { src: `${CDN}/2018/09/03_HI_logo_mercedes.png`,    alt: 'Mercedes-Benz' },
  { src: `${CDN}/2018/09/16_HI_logo_astonmartin.png`, alt: 'Aston Martin' },
  { src: `${CDN}/2018/09/22_HI_logo_condenast.png`,   alt: 'Condé Nast' },
  { src: `${CDN}/2018/09/04_HI_logo_esteelauder.png`, alt: 'Estée Lauder' },
];

export function BrandsWhoTrustUs({
  logos = TRUST_LOGOS,
  baseWidth = 138,
  baseHeight = 78,
}: {
  logos?: ReadonlyArray<{ src: string; alt: string; scale?: number }>;
  /** Max pixel width for each logo (before per-logo scale). Default matches homepage marquee (138). */
  baseWidth?: number;
  /** Max pixel height for each logo (before per-logo scale). Default matches homepage marquee (78). */
  baseHeight?: number;
} = {}) {
  return (
    <section className="bg-[#2d3232] py-20 md:py-24 border-t border-[#3a4040] px-8 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn className="mb-14">
          <SectionLabel light>Brands Who Trust Us</SectionLabel>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-10 gap-y-14 items-center">
          {logos.map((logo, i) => (
            <FadeIn key={logo.alt} delay={i * 0.05} className="flex items-center justify-center min-h-24">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={baseWidth}
                height={baseHeight}
                sizes={`${baseWidth}px`}
                className="object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                style={{
                  maxWidth: baseWidth * (logo.scale ?? 1),
                  maxHeight: baseHeight * (logo.scale ?? 1),
                  width: 'auto',
                  height: 'auto',
                }}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
