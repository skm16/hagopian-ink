import React, { useState, useEffect, useRef } from 'react';
import type { MobilePagesBlock } from '@/lib/work-detail-types';

const PHONE_PNG = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/img/3252351.png';

// Adjacent slides peek out left and right of the phone bezel; the section's
// overflow:hidden clips them at the page edges so they fade off to the sides.
// The active slide sits behind the bezel and fills the screen window exactly.
//
// Screen-window geometry derived by pixel-sampling the phone PNG (320x579):
//   bezel x in [27,290], screen window x in [40,279] y in [50,500].
//   With backgroundSize:auto 100% (scale 520/579 = 0.898) and
//   backgroundPositionX:-26, the visible screen window is 215x404 at (10,45)
//   inside the 265x520 phone container.
const PHONE_W = 265;
const PHONE_H = 520;
const SCREEN_LEFT = 10;
const SCREEN_TOP = 45;
const SCREEN_W = 215;
const SCREEN_H = 404;
const SLIDE_GAP = 60; // visible gap between adjacent peeking slides
const SLIDE_STEP = SCREEN_W + SLIDE_GAP;
const AUTOPLAY_MS = 3500;
const TRANSITION_MS = 900;

export function MobilePages({ block }: { block: MobilePagesBlock }) {
  const images = block.images;
  const n = images.length;
  const [idx, setIdx] = useState(Math.floor(n / 2));
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [n]);

  if (n === 0) return null;

  // Strip is positioned absolutely inside a wrapper whose width = section width.
  // The strip is laid out so that the active slide (index `idx`) lands centered
  // horizontally in the wrapper. Adjacent slides flow naturally to the sides
  // and get clipped by section overflow:hidden.
  //
  // Each slide occupies SLIDE_STEP px of horizontal space. The active slide's
  // left edge should sit at wrapperWidth/2 - SCREEN_W/2. The slide at index i
  // starts at i*SLIDE_STEP from the strip's own left edge. Setting the strip's
  // left to wrapperWidth/2 - SCREEN_W/2 - idx*SLIDE_STEP achieves the centering.
  // Rather than measure wrapper width at runtime, we use a percentage-based
  // offset on the strip: 50% (wrapper center), then translate left by the
  // active slide's start plus half its width.
  const translateX = -idx * SLIDE_STEP - SCREEN_W / 2;
  const stripWidth = n * SLIDE_STEP - SLIDE_GAP; // last slide has no trailing gap

  return (
    <section
      style={{
        background: '#f4f2f2',
        padding: '90px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          position: 'relative',
          width: '100%',
          height: PHONE_H,
        }}
      >
        {/* Slides strip — flows full-bleed past the bezel; clipped by section overflow */}
        <div
          style={{
            position: 'absolute',
            top: SCREEN_TOP,
            left: '50%',
            width: stripWidth,
            height: SCREEN_H,
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: `transform ${TRANSITION_MS}ms ease-in-out`,
            display: 'flex',
            gap: SLIDE_GAP,
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              style={{
                width: SCREEN_W,
                height: SCREEN_H,
                flexShrink: 0,
                background: '#fff',
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  width: SCREEN_W,
                  height: SCREEN_H,
                  display: 'block',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
              />
            </div>
          ))}
        </div>

        {/* Phone bezel overlay — positioned so its screen window is centered
            on wrapper center (matching the active slide's position). The
            screen window starts at SCREEN_LEFT inside the bezel container and
            is SCREEN_W wide, so the bezel itself sits at:
              wrapperCenter - SCREEN_LEFT - SCREEN_W/2  */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: `translateX(${-(SCREEN_LEFT + SCREEN_W / 2)}px)`,
            width: PHONE_W,
            height: PHONE_H,
            backgroundImage: `url(${PHONE_PNG})`,
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: -26,
            backgroundSize: 'auto 100%',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      </div>

      {/* Dot indicators */}
      {n > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: '1px solid #828282',
                background: i === idx ? '#828282' : '#ffffff',
                cursor: 'pointer',
                padding: 0,
                transition: 'background 0.2s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
