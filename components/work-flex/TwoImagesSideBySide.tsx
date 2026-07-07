import React from 'react';
import Image from 'next/image';
import type { TwoImagesSideBySideBlock } from '@/lib/work-detail-types';

// Ports the CMS `.template-part.two-images-side-by-side` rules, including the
// mobile @media block, verbatim from the deployed theme CSS:
//
//   DESKTOP (> 769px):
//     container: display:flex; width:100%; padding:3rem 0
//     LEFT (image_left = logo):  side-image:first-of-type — width:45%; padding:2rem;
//                                flex-centered; img object-fit:contain, max 250x350
//     RIGHT (image_right = photo): side-image — width:55%; img fills the cell.
//       Rendered at INTRINSIC size (width:100%, height:auto) so the photo's natural
//       height OWNS the flex row height (it's uncapped; the logo is capped). Using
//       next/image `fill` here would give zero intrinsic height and collapse the row.
//
//   MOBILE (<= 769px, the theme's custom breakpoint — NOT 768):
//     container: flex-direction:column (stack; logo on top, photo below — DOM order)
//     both cells: width:100%
//     logo cell: padding:4rem; logo img cap shrinks to max 150x300
//
// Styling lives in a scoped <style> block (the Gallery.tsx idiom) because the mobile
// behavior needs a real @media query — inline styles can't express one, and four
// coordinated changes (direction, widths, padding, img cap) are cleaner as CSS than
// a stack of !important Tailwind utilities. The CSS is a compile-time constant with
// no user input (same trusted pattern as Gallery.tsx / CaseStudyView.tsx).

const CSS = `
.two-images-side-by-side {
  display: flex;
  width: 100%;
  padding: 3rem 0;
  align-items: stretch;
  background: #ffffff;
}
.two-images-side-by-side .tisbs-logo {
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.two-images-side-by-side .tisbs-logo img {
  object-fit: contain;
  max-width: 250px;
  max-height: 350px;
  width: auto;
  height: auto;
}
.two-images-side-by-side .tisbs-photo {
  width: 55%;
}
.two-images-side-by-side .tisbs-photo img {
  display: block;
  width: 100%;
  height: auto;
}
@media screen and (max-width: 769px) {
  .two-images-side-by-side {
    flex-direction: column;
  }
  .two-images-side-by-side .tisbs-logo {
    width: 100%;
    padding: 4rem;
  }
  .two-images-side-by-side .tisbs-logo img {
    max-width: 150px;
    max-height: 300px;
  }
  .two-images-side-by-side .tisbs-photo {
    width: 100%;
  }
}
`;

export function TwoImagesSideBySide({ block }: { block: TwoImagesSideBySideBlock }) {
  const { imageLeft, imageRight } = block;
  if (!imageLeft && !imageRight) return null;

  return (
    <section className="two-images-side-by-side">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* LEFT — logo: contained, centered, capped (250x350 desktop / 150x300 mobile) */}
      <div className="tisbs-logo">
        {imageLeft && (
          <Image src={imageLeft} alt="" width={250} height={350} sizes="(max-width: 769px) 150px, 250px" />
        )}
      </div>

      {/* RIGHT — photo: intrinsic size; its natural height sets the desktop row */}
      <div className="tisbs-photo">
        {imageRight && (
          <Image src={imageRight} alt="" width={1100} height={760} sizes="(max-width: 769px) 100vw, 55vw" />
        )}
      </div>
    </section>
  );
}
