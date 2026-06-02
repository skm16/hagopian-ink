import React from 'react';
import Image from 'next/image';
import type { GalleryBlock } from '@/lib/work-detail-types';

// Mirrors part-gallery.php + _gallery.scss: each tile is 25% wide (4 columns) at
// 40vh tall, background-cover. With 8 images this is exactly 2 rows of 4 — the
// canonical gallery layout. Switched from CSS background-image to <img> so
// images contribute to the accessibility tree.
export function Gallery({ block }: { block: GalleryBlock }) {
  const images = block.images;
  if (images.length === 0) return null;

  return (
    <section style={{ background: '#ffffff' }}>
      <style dangerouslySetInnerHTML={{ __html: `.gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; } @media (min-width: 640px) { .gallery-grid { grid-template-columns: repeat(4, 1fr); } } .gallery-cell { position: relative; width: 100%; height: 30vw; overflow: hidden; } @media (min-width: 640px) { .gallery-cell { height: 40vh; } }` }} />
      <div className="gallery-grid">
        {images.map((src, i) => (
          <div
            key={i}
            className="gallery-cell"
          >
            <Image
              src={src}
              alt={`Gallery image ${i + 1}`}
              fill
              sizes="25vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
