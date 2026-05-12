/**
 * Top-darker gradient overlay for video/image hero sections. Heaviest at
 * the top to protect nav legibility, fades to transparent by mid-hero so
 * the underlying imagery stays bright.
 *
 * Sits at z-[5] — between the media (default z-auto / z-0) and the hero
 * copy (z-10 or z-20). pointer-events: none so it doesn't intercept clicks.
 */
export function HeroOverlay() {
  return (
    <div
      className="absolute inset-0 z-[5] pointer-events-none"
      style={{
        background:
          'linear-gradient(to bottom, rgba(45,50,50,0.55) 0%, rgba(45,50,50,0.15) 40%, rgba(45,50,50,0) 65%)',
      }}
    />
  );
}
