import React from 'react';
import type { DesktopPagesBlock } from '@/lib/work-detail-types';

const SILVER_NAV = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/img/silver-nav-bar.png';
const BLACK_NAV = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/img/black-nav-bar.png';

// Mirrors part-desktop-pages.php + _desktop-pages.scss:
//   - fullWidth (col-sm-12): centered image, max-width 800px per design feedback.
//   - Two-half (col-sm-6 each): forced 50/50 side-by-side; second half drops
//     STAGGER_OFFSET pixels for the agency-portfolio scattered-device composition.
//
// Field independence: WP's PHP template renders all three fields together
// inside one .row when populated — the full-width sits on top, the two halves
// sit below it. We mirror that: a single block can produce a stacked layout
// (full-width + paired halves), not just one OR the other.
//
// We intentionally ignore `automaticAlignment` — even when WP marks it as
// `no` (the `.disable-auto-width` class), the raw images are 2000+ px wide
// and would never fit at natural size. The 50/50 layout is the design intent.
const FULL_WIDTH_MAX = 800;
const STAGGER_OFFSET = 80;
const SHADOW = '0 20px 50px rgba(0,0,0,0.3)';

export function DesktopPages({ block }: { block: DesktopPagesBlock }) {
  const navBarSrc = block.navBar === 'black' ? BLACK_NAV : SILVER_NAV;
  const hasPair = block.firstPage || block.secondPage;

  return (
    <section style={{ background: '#f4f2f2', padding: '90px 0' }}>
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: '0 15px' }}>
        {block.fullWidth && (
          <div style={{
            width: '100%',
            maxWidth: FULL_WIDTH_MAX,
            margin: '0 auto',
            boxShadow: SHADOW,
            marginBottom: hasPair ? 60 : 0,
          }}>
            <img
              src={navBarSrc}
              alt=""
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
            <img
              src={block.fullWidth}
              alt=""
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
          </div>
        )}
        {hasPair && (
          <div style={{
            width: '90%',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'flex-start',
            gap: 40,
          }}>
            {block.firstPage && (
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <div style={{ boxShadow: SHADOW }}>
                  <img
                    src={navBarSrc}
                    alt=""
                    style={{ display: 'block', width: '100%', height: 'auto' }}
                  />
                  <img
                    src={block.firstPage}
                    alt=""
                    style={{ display: 'block', width: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            )}
            {block.secondPage && (
              <div style={{
                flex: '1 1 0',
                minWidth: 0,
                marginTop: block.firstPage ? STAGGER_OFFSET : 0,
              }}>
                <div style={{ boxShadow: SHADOW }}>
                  <img
                    src={navBarSrc}
                    alt=""
                    style={{ display: 'block', width: '100%', height: 'auto' }}
                  />
                  <img
                    src={block.secondPage}
                    alt=""
                    style={{ display: 'block', width: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
