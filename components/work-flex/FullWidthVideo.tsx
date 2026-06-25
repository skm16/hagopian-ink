'use client';

import React from 'react';
import type { FullWidthVideoBlock } from '@/lib/work-detail-types';

// Full-bleed video, the motion sibling of `full-image-single-work`
// (theme `_full-image-single-work.scss`: edge-to-edge, img { width: 100% },
// no container, no padding). Matches the FullImage component's white section +
// 100%-width block treatment.
//
// Muted + loop + playsInline so it can autoplay on mobile (browsers block
// autoplay of unmuted video); the poster shows before play and while loading.
export function FullWidthVideo({ block }: { block: FullWidthVideoBlock }) {
  if (!block.videoMp4) return null;
  return (
    <section style={{ background: '#ffffff' }}>
      <video
        src={block.videoMp4}
        poster={block.posterImage ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        controls
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
    </section>
  );
}
