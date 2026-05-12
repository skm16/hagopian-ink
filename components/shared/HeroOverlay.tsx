/**
 * Top-darker gradient overlay for video/image hero sections. Heaviest at
 * the top to protect nav legibility, fades to transparent by mid-hero so
 * the underlying imagery stays bright.
 *
 * Sits at z-[5] — between the media (default z-auto / z-0) and the hero
 * copy (z-10 or z-20). pointer-events: none so it doesn't intercept clicks.
 *
 * The gradient starts at ~22% opacity rather than 55% so it blends smoothly
 * with the fixed Nav's own bg-gradient (which is at-top: from-black/45 fading
 * to transparent over the nav's height). Previously the overlay started at
 * 55% directly under the nav's "transparent" bottom edge, creating a visible
 * hairline at the nav boundary.
 */
export function HeroOverlay() {
  return (
    <div
      className="absolute inset-0 z-[5] pointer-events-none"
      style={{
        background:
          'linear-gradient(to bottom, rgba(45,50,50,0.22) 0%, rgba(45,50,50,0.35) 18%, rgba(45,50,50,0.15) 45%, rgba(45,50,50,0) 68%)',
      }}
    />
  );
}
