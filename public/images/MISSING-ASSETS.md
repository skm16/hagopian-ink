# Missing assets

These placeholder paths are referenced in the Next.js code but the source files were not found in `attached_assets/` or anywhere else in the repo. Sean needs to upload these to `public/images/` (matching the path exactly) before cutover, or replace the references in code with valid URLs.

## Headshots
- `public/images/cecilia-pagkalinawan.png` — used in `components/home/HomeContent.tsx` (testimonial)
- `public/images/christina-hagopian.png` — used in `components/about/AboutContent.tsx`
- `public/images/jen-headshot.png` — used in `lib/case-studies.ts`

## Case study heroes
- `public/images/case-studies/recoveryplus/hero.png` — used in `components/expertise/UxUiDesignContent.tsx` and `components/expertise/HealthMedTechContent.tsx`

## Notes
- Logo and client logos (epilepsy-foundation, susan-g-komen, black-lives-matter) WERE copied successfully from `attached_assets/`.
- Until the missing assets are added, the corresponding image elements will show broken-image icons in production. They do NOT block the build or affect SEO/redirects.
- Lower-priority: Sean may want to replace the WP-hosted screenshots referenced from `lib/brand.ts` CDN URLs with locally-hosted versions for better Vercel image-optimization. Not required for cutover.

## Recommended action
Either upload the listed files to `public/images/` (preserving directory structure), or open the referencing files and swap the placeholders for valid CDN URLs (e.g., `https://cms.hagopianink.com/wp-content/uploads/...`).
