import React from 'react';
import Image from 'next/image';
import type { TwoImagesSideBySideBlock } from '@/lib/work-detail-types';

// Ports the CMS `.template-part.two-images-side-by-side` rules:
//   - container: full-width flex, padding 3rem 0, align-items: stretch
//   - RIGHT cell (image_right = photo): width 55%; photo renders at its INTRINSIC
//     size (width:100%, height:auto) so it OWNS the row height — it's uncapped,
//     unlike the logo, so it's the tallest sibling and drives the flex row height.
//   - LEFT cell (image_left = logo): width 45%, stretches to the row height and
//     flex-centers a contained, capped logo (object-fit: contain; max 250x350).
//
// This is the key fix: the original CMS uses `object-fit: cover; height: 100%` on the
// right image, but `height:100%` only works because the cell is already tall — the photo
// at natural size sets that height, NOT the logo. Rendering the right photo with next/image
// `fill` gave it zero intrinsic height, so the logo wrongly drove the (short) row height.

export function TwoImagesSideBySide({ block }: { block: TwoImagesSideBySideBlock }) {
  const { imageLeft, imageRight } = block;
  if (!imageLeft && !imageRight) return null;

  return (
    <section
      className="two-images-side-by-side"
      style={{
        display: 'flex',
        width: '100%',
        padding: '3rem 0',
        alignItems: 'stretch',
        background: '#ffffff',
      }}
    >
      {/* LEFT — logo: stretches to the row height, centers a contained, capped logo */}
      <div
        style={{
          width: '45%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        {imageLeft && (
          <Image
            src={imageLeft}
            alt=""
            width={250}
            height={350}
            sizes="250px"
            style={{
              objectFit: 'contain',
              maxWidth: 250,
              maxHeight: 350,
              width: 'auto',
              height: 'auto',
            }}
          />
        )}
      </div>

      {/* RIGHT — photo: intrinsic size at 55% width; its natural height sets the row */}
      <div style={{ width: '55%' }}>
        {imageRight && (
          <Image
            src={imageRight}
            alt=""
            width={1100}
            height={760}
            sizes="55vw"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        )}
      </div>
    </section>
  );
}
