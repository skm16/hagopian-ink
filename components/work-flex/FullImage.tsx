import React from 'react';
import type { FullImageBlock } from '@/lib/work-detail-types';

export function FullImage({ block }: { block: FullImageBlock }) {
  if (!block.image) return null;
  return (
    <section style={{ background: '#ffffff' }}>
      <img
        src={block.image}
        alt=""
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
    </section>
  );
}
