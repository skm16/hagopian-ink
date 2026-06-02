import React from 'react';
import Image from 'next/image';
import type { FullImageBlock } from '@/lib/work-detail-types';

export function FullImage({ block }: { block: FullImageBlock }) {
  if (!block.image) return null;
  return (
    <section style={{ background: '#ffffff' }}>
      <Image
        src={block.image}
        alt=""
        width={1920}
        height={1080}
        sizes="100vw"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
    </section>
  );
}
