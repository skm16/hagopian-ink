import React, { useState, useEffect } from 'react';
import type { SliderTwoSlidesBlock } from '@/lib/work-detail-types';

export function SliderTwoSlides({ block }: { block: SliderTwoSlidesBlock }) {
  const images = block.images;
  const n = images.length;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (n <= 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 3000);
    return () => clearInterval(t);
  }, [n]);

  if (n === 0) return null;

  // Show 2 images at a time, advancing by 1.
  const first = images[idx];
  const second = images[(idx + 1) % n];

  return (
    <section style={{ background: '#ffffff' }}>
      <div style={{ display: 'flex', gap: 0, overflow: 'hidden' }}>
        <div style={{ flex: '1 1 50%' }}>
          <img src={first} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
        </div>
        <div style={{ flex: '1 1 50%' }}>
          <img src={second} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
        </div>
      </div>
    </section>
  );
}
