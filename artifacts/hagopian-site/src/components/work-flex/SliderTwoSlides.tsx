import React, { useState, useEffect, useRef } from 'react';
import type { SliderTwoSlidesBlock } from '@/lib/work-detail-types';

// Mirrors part-slider_two_slides.php (owl-carousel: 2 items visible, loop, 3s autoplay).
// Smooth transform-based slide. Each slide is 50% of the section's width so two are
// visible at once; the strip translates left by 50% per advance. Dots styled to
// mirror _slider_two_slides.scss.
const AUTOPLAY_MS = 3000;
const TRANSITION_MS = 700;

export function SliderTwoSlides({ block }: { block: SliderTwoSlidesBlock }) {
  const images = block.images;
  const n = images.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(true);
  const stripRef = useRef<HTMLDivElement | null>(null);

  // Append the first 2 slides at the end so the strip can advance past `idx == n - 1`
  // without snapping — we hop the index back to 0 (with animation disabled) once the
  // duplicate frame is shown.
  const looped = n >= 2 ? [...images, images[0], images[1]] : images;

  useEffect(() => {
    if (n <= 2 || paused) return;
    const t = setInterval(() => setIdx((i) => i + 1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [n, paused]);

  // When we reach the duplicate frame, after the slide animation finishes we
  // silently reset idx back to 0 with the transition disabled so the user never
  // sees the snap.
  useEffect(() => {
    if (n <= 2) return;
    if (idx < n) return;
    const t = setTimeout(() => {
      setAnimating(false);
      setIdx(0);
      // Re-enable transition after the next paint so subsequent advances animate.
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)));
    }, TRANSITION_MS);
    return () => clearTimeout(t);
  }, [idx, n]);

  if (n === 0) return null;

  return (
    <section
      style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={stripRef}
        style={{
          display: 'flex',
          // Each slide is 50% of section width => strip = (looped.length / 2) * 100%.
          width: `${looped.length * 50}%`,
          transform: `translate3d(-${idx * (100 / looped.length)}%, 0, 0)`,
          transition: animating ? `transform ${TRANSITION_MS}ms ease-in-out` : 'none',
        }}
      >
        {looped.map((src, i) => (
          <div
            key={i}
            style={{
              width: `${100 / looped.length}%`,
              flexShrink: 0,
            }}
          >
            <img
              src={src}
              alt=""
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </div>

      {n > 2 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
          }}
        >
          {Array.from({ length: n }, (_, i) => i).map((i) => (
            <button
              key={i}
              onClick={() => {
                setAnimating(true);
                setIdx(i);
              }}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: '1px solid #979797',
                background: i === idx % n ? '#828282' : '#ffffff',
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
