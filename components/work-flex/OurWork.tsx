import React from 'react';
import type { OurWorkBlock } from '@/lib/work-detail-types';
import { SERIF, SANS, NAV_FONT } from '@/lib/brand';

// Mirrors _our_work.scss + part-our-work.php. The original uses Paroller.js
// to scroll text and image at different rates; we render the static layout
// here and treat the parallax as polish to add later if needed.
//
// Layout: col-sm-5 (text) + col-sm-7 (image) at 1170px container, with 150px
// padding on each side at ≥1380px. Below 800px, columns stack with image first
// (column-reverse) so the text reads last on mobile.
//
// Background variants:
//   - plain → solid #f3eff1 (the soft pink default)
//   - gradient → linear-gradient(white, #ebf0f8)
//   - white → solid white
//
// columnReverse=true swaps left/right (image left, text right).

function backgroundStyle(bg: OurWorkBlock['background']): React.CSSProperties {
  if (bg === 'gradient') return { background: 'linear-gradient(white, #ebf0f8)' };
  if (bg === 'white') return { background: '#ffffff' };
  return { background: '#f3eff1' };
}

export function OurWork({ block }: { block: OurWorkBlock }) {
  const reversed = block.columnReverse;

  return (
    <section
      style={{
        ...backgroundStyle(block.background),
        padding: '120px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1170,
          margin: '0 auto',
          padding: '0 15px',
        }}
        className="md:px-[150px]"
      >
        <div
          className={`flex flex-col md:flex-row ${reversed ? 'md:flex-row-reverse' : ''}`}
          style={{ gap: 40, alignItems: 'center' }}
        >
          {/* Text column — 5/12 width on desktop */}
          <div style={{ flex: '0 0 41.6667%', maxWidth: '41.6667%' }} className="!max-w-full md:!max-w-[41.6667%] !flex-[1_1_auto] md:!flex-[0_0_41.6667%]">
            {block.name && (
              <p
                style={{
                  color: block.nameColor || '#a57b83',
                  fontFamily: NAV_FONT,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: 18,
                }}
              >
                {block.name}
              </p>
            )}
            {block.title && (
              <h2
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 40,
                  lineHeight: 1.15,
                  color: '#2d3232',
                  margin: '0 0 26px',
                  textAlign: 'left',
                }}
              >
                {block.title}
              </h2>
            )}
            {block.description && (
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: 'rgba(45,50,50,0.85)',
                  margin: '0 0 32px',
                }}
              >
                {block.description}
              </p>
            )}
            {block.link && (
              <a
                href={block.link.url}
                target={block.link.target || undefined}
                rel={block.link.target === '_blank' ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'inline-block',
                  background: '#0c0c0c',
                  color: '#ffffff',
                  fontFamily: NAV_FONT,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '18px 30px',
                  textDecoration: 'none',
                }}
              >
                {block.link.title || 'View Website'}
              </a>
            )}
          </div>

          {/* Image column — 7/12 width on desktop */}
          {block.image && (
            <div
              style={{ flex: '1 1 auto', minWidth: 0 }}
              className="!w-full md:!flex-[0_0_58.3333%] md:!max-w-[58.3333%]"
            >
              <div style={{ textAlign: reversed ? 'left' : 'right' }}>
                {block.link ? (
                  <a
                    href={block.link.url}
                    target={block.link.target || undefined}
                    rel={block.link.target === '_blank' ? 'noopener noreferrer' : undefined}
                  >
                    <img
                      src={block.image}
                      alt={block.title || ''}
                      style={{ maxWidth: '100%', height: 'auto', display: 'inline-block' }}
                    />
                  </a>
                ) : (
                  <img
                    src={block.image}
                    alt={block.title || ''}
                    style={{ maxWidth: '100%', height: 'auto', display: 'inline-block' }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
