import React from 'react';
import type { DesktopPagesBlock } from '@/lib/work-detail-types';

const SILVER_NAV = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/img/silver-nav-bar.png';
const BLACK_NAV = 'https://hagopianink.wpenginepowered.com/wp-content/themes/skmframework/assets/public/img/black-nav-bar.png';

export function DesktopPages({ block }: { block: DesktopPagesBlock }) {
  const navBarSrc = block.navBar === 'black' ? BLACK_NAV : SILVER_NAV;

  return (
    <section style={{ background: '#ffffff', padding: '90px 0' }}>
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: '0 15px' }}>
        {block.fullWidth && (
          <div style={{ width: '90%', margin: '0 auto' }}>
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
        {(block.firstPage || block.secondPage) && !block.fullWidth && (
          <div style={{
            width: '90%',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0,
          }}>
            {block.firstPage && (
              <div style={{ flex: '1 1 50%' }}>
                <img src={navBarSrc} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
                <img src={block.firstPage} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
              </div>
            )}
            {block.secondPage && (
              <div style={{ flex: '1 1 50%' }}>
                <img src={navBarSrc} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
                <img src={block.secondPage} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
