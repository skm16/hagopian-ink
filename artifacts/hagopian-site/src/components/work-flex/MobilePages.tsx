import React, { useState, useEffect } from 'react';
import type { MobilePagesBlock } from '@/lib/work-detail-types';

const PHONE_PNG = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/img/3252351.png';
const SCREEN_W = 245;
const SCREEN_H = 434;
const SCREEN_TOP = 33;
const SCREEN_LEFT = 10;
const PHONE_W = 265;
const PHONE_H = 500;

export function MobilePages({ block }: { block: MobilePagesBlock }) {
  const images = block.images;
  const n = images.length;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 3000);
    return () => clearInterval(t);
  }, [n]);

  if (n === 0) return null;

  return (
    <section style={{ background: '#ffffff', padding: '90px 0' }}>
      <div style={{
        position: 'relative',
        width: PHONE_W,
        height: PHONE_H,
        margin: '0 auto',
      }}>
        {/* Screen clip — exactly matches the phone PNG's transparent window */}
        <div style={{
          position: 'absolute',
          top: SCREEN_TOP,
          left: SCREEN_LEFT,
          width: SCREEN_W,
          height: SCREEN_H,
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex',
            width: n * SCREEN_W,
            height: SCREEN_H,
            transform: `translate3d(-${idx * SCREEN_W}px, 0, 0)`,
            transition: 'transform 0.8s ease-in-out',
          }}>
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

        {/* Phone bezel overlay */}
        <div style={{
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
        }} />
      </div>

      {/* Dot indicators */}
      {n > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                border: 'none',
                background: i === idx ? '#2d3232' : 'rgba(45,50,50,0.2)',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
