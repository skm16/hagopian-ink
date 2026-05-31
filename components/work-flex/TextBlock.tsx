import React from 'react';
import type { TextBlockBlock } from '@/lib/work-detail-types';
import { SERIF, SANS, NAV_FONT } from '@/lib/brand';
import { WpHtml } from './WpHtml';

export function TextBlock({ block }: { block: TextBlockBlock }) {
  if (!block.name && !block.title && !block.description) return null;

  const descWidth = clampWidth(block.width);
  const bg = block.background === 'gradient'
    ? 'linear-gradient(135deg, #ea4c89 0%, #c32361 100%)'
    : '#ffffff';
  const textColor = block.background === 'gradient' ? '#ffffff' : '#2d3232';
  const nameColor = block.background === 'gradient' ? 'rgba(255,255,255,0.7)' : 'rgba(45,50,50,0.45)';
  const descColor = block.background === 'gradient' ? 'rgba(255,255,255,0.9)' : '#2e2e2e';

  return (
    <section style={{ background: bg, padding: '90px 0' }}>
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: '0 15px', textAlign: 'center' }}>
        {block.name && (
          <p style={{
            fontFamily: NAV_FONT,
            fontSize: 13,
            letterSpacing: '0.47px',
            textTransform: 'uppercase',
            color: nameColor,
            fontWeight: 500,
            marginBottom: 16,
          }}>
            {block.name}
          </p>
        )}
        {block.title && (
          <WpHtml
            as="h2"
            html={block.title}
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: 26,
              lineHeight: 1.2,
              color: textColor,
              margin: 0,
              marginBottom: block.description ? 24 : 0,
            }}
          />
        )}
        {block.description && (
          <WpHtml
            html={block.description}
            style={{
              fontFamily: SANS,
              fontSize: 16,
              lineHeight: 1.7,
              color: descColor,
              margin: '0 auto',
              width: descWidth,
              maxWidth: '100%',
            }}
          />
        )}
      </div>
    </section>
  );
}

function clampWidth(width: number | null): string {
  if (width === null || Number.isNaN(width)) return '100%';
  const clamped = Math.max(50, Math.min(100, width));
  return `${clamped}%`;
}
