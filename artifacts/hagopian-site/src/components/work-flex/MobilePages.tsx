import React, { useState, useEffect } from 'react';
import type { MobilePagesBlock } from '@/lib/work-detail-types';

const PHONE_PNG = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/img/3252351.png';

// One image visible at a time, fully contained inside the phone bezel's
// transparent screen window. Slides translate across the screen with a smooth
// transition; the overflow:hidden clip ensures no part of any image extends
// past the bezel boundary.
//
// Screen-window geometry was derived by sampling the phone PNG (3252351.png,
// natural size 320x579) for opaque vs transparent pixels. The bezel outer
// bounds in PNG coords are x∈[27,290], the screen window in PNG coords is
// x∈[40,279] y∈[50,500]. Scaled to display height 520 (scale 0.898) and with
// backgroundPositionX:-26 applied, the visible screen window is approximately
// 215x404 at (10, 45) inside the 265x520 phone container.
const PHONE_W = 265;
const PHONE_H = 520;
const SCREEN_LEFT = 10;
const SCREEN_TOP = 45;
const SCREEN_W = 215;
const SCREEN_H = 404;
const AUTOPLAY_MS = 3000;
const TRANSITION_MS = 800;

export function MobilePages({ block }: { block: MobilePagesBlock }) {
  const images = block.images;
  const n = images.length;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [n]);

  if (n === 0) return null;

  const translateX = -(idx * SCREEN_W);

  return (
    <section
      style={{
        background: '#f4f2f2',
        padding: '90px 0',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: PHONE_W,
          height: PHONE_H,
          margin: '0 auto',
        }}
      >
        {/* Screen clip — exactly matches the phone PNG's transparent window. */}
        <div
          style={{
            position: 'absolute',
            top: SCREEN_TOP,
            left: SCREEN_LEFT,
            width: SCREEN_W,
            height: SCREEN_H,
            overflow: 'hidden',
            background: '#fff',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: n * SCREEN_W,
              height: SCREEN_H,
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: `transform ${TRANSITION_MS}ms ease-in-out`,
            }}
          >
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                style={{
                  width: SCREEN_W,
                  height: SCREEN_H,
                  flexShrink: 0,
                  display: 'block',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
              />
            ))}
          </div>
        </div>

        {/* Phone bezel overlay on top of the clipped slides. */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
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
