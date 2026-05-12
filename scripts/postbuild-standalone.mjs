/**
 * Copy `public/` and `.next/static/` into `.next/standalone/` after build.
 *
 * Next.js's `output: 'standalone'` produces a self-contained server entry at
 * `.next/standalone/server.js` but does NOT move static assets next to it.
 * The runtime expects them at `.next/standalone/public/` and
 * `.next/standalone/.next/static/`. This script handles that copy step
 * cross-platform (Vercel postbuild, Railway nixpacks, local).
 */

import { cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const standaloneDir = join(root, '.next', 'standalone');

if (!existsSync(standaloneDir)) {
  // Standalone wasn't built — gate is off (local dev / non-Railway). No-op.
  console.log('postbuild-standalone: .next/standalone/ not present, skipping (standalone build not requested)');
  process.exit(0);
}

const copies = [
  { from: join(root, 'public'),         to: join(standaloneDir, 'public') },
  { from: join(root, '.next', 'static'), to: join(standaloneDir, '.next', 'static') },
];

for (const { from, to } of copies) {
  if (!existsSync(from)) {
    console.warn(`postbuild-standalone: skipping ${from} — does not exist`);
    continue;
  }
  cpSync(from, to, { recursive: true });
  console.log(`postbuild-standalone: copied ${from} → ${to}`);
}
