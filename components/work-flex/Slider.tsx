'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { SliderBlock } from '@/lib/work-detail-types';

export function Slider({ block }: { block: SliderBlock }) {
  const images = block.images;
  const n = images.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (n <= 1 || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 3000);
    return () => clearInterval(t);
  }, [n, paused]);

  if (n === 0) return null;

  return (
    <section
      style={{ background: '#ffffff' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {images.map((src, i) => (
          // loading="eager" since non-active slides are display:none — Next/Image's
          // IntersectionObserver wouldn't trigger lazy load until the slider advances,
          // causing a visible blank on every slide change.
          <Image
            key={i}
            src={src}
            alt=""
            width={1170}
            height={780}
            sizes="100vw"
            loading="eager"
            style={{
              display: i === idx ? 'block' : 'none',
              width: '100%',
              height: 'auto',
            }}
          />
        ))}
      </div>
      {n > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginTop: 16,
          paddingBottom: 24,
        }}>
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
