import React from 'react';
import type { ColumnsBlock } from '@/lib/work-detail-types';
import { SERIF, SANS, NAV_FONT } from '@/lib/brand';
import { WpHtml } from './WpHtml';

export function Columns({ block }: { block: ColumnsBlock }) {
  const cols = block.columns.filter((c) => c.name || c.title || c.description);
  if (cols.length === 0) return null;

  const count = cols.length;
  const widthPct = count === 1 ? 60 : 80;
  const justify = count === 1 ? 'center' : 'flex-start';

  return (
    <section style={{ background: '#ffffff' }} className="py-10 md:py-[90px]">
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: '0 15px' }}>
        <div style={{
          width: `${widthPct}%`,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: justify,
          gap: 40,
          textAlign: count === 1 ? 'center' : 'left',
        }}>
          {cols.map((col, i) => (
            <div key={i} style={{ flex: '1 1 0', minWidth: 240 }}>
              {col.name && (
                <p style={{
                  fontFamily: NAV_FONT,
                  fontSize: 13,
                  letterSpacing: '0.47px',
                  textTransform: 'uppercase',
                  color: 'rgba(45,50,50,0.45)',
                  fontWeight: 500,
                  marginBottom: 16,
                }}>
                  {col.name}
                </p>
              )}
              {col.title && (
                <WpHtml
                  as="p"
                  html={col.title}
                  style={{
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: 22,
                    lineHeight: 1.3,
                    color: '#2d3232',
                    marginBottom: 14,
                  }}
                />
              )}
              {col.description && (
                <WpHtml
                  html={col.description}
                  style={{
                    fontFamily: SANS,
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: '#2e2e2e',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
