import React from 'react';
import type { TwoColumnsBlock } from '@/lib/work-detail-types';
import { SERIF, SANS } from '@/lib/brand';
import { WpHtml } from './WpHtml';

export function TwoColumns({ block, isFirst }: { block: TwoColumnsBlock; isFirst?: boolean }) {
  if (!block.title && !block.description) return null;

  // When this block is the first content on a case study page, it acts as the
  // intro deck (subtitle + intro paragraph) and visually extends the gray
  // header section. Mid-page instances stay on white with default padding.
  const bg = isFirst ? '#f1efef' : '#ffffff';
  const padY = isFirst ? 45 : 90;

  return (
    <section style={{ background: bg, padding: `${padY}px 0` }}>
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: '0 15px' }}>
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:flex-1">
            {block.title && (
              <WpHtml
                as="h2"
                html={block.title}
                style={{
                  fontFamily: SERIF,
                  fontStyle: 'italic',
                  fontSize: 36,
                  lineHeight: 1.2,
                  color: '#2d3232',
                  margin: 0,
                }}
              />
            )}
          </div>
          <div className="md:flex-1">
            {block.description && (
              <WpHtml
                html={block.description}
                style={{
                  fontFamily: SANS,
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: 'rgba(45,50,50,0.85)',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
