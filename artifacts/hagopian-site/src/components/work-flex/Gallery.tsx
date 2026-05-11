import React from 'react';
import type { GalleryBlock } from '@/lib/work-detail-types';

export function Gallery({ block }: { block: GalleryBlock }) {
  const images = block.images;
  if (images.length === 0) return null;

  return (
    <section style={{ background: '#ffffff', padding: '60px 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 4,
        maxWidth: '100%',
      }}>
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              aspectRatio: '1 / 1',
            }}
            aria-label={`Gallery image ${i + 1}`}
            role="img"
          />
        ))}
      </div>
    </section>
  );
}
