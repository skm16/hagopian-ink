# Bypasses Nixpacks (its UTF-8 scanner chokes on minified vendor JS in
# wordpress/ and artifacts/, and .railwayignore wasn't honored).
# Railway auto-detects this Dockerfile at the repo root and uses it
# instead of Nixpacks.

# ---- Build stage ----
FROM node:22-alpine AS builder
WORKDIR /app

# Install deps first for layer caching.
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy only runtime sources. Anything not listed here stays out of the
# image — no wordpress/, artifacts/, attached_assets/, docs/, etc.
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY public ./public
COPY scripts ./scripts
COPY next.config.ts tsconfig.json tailwind.config.ts postcss.config.mjs next-env.d.ts ./

ENV NEXT_BUILD_STANDALONE=1
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Runtime stage ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Standalone server bundle + assets (postbuild-standalone.mjs already
# copied public/ and .next/static/ into .next/standalone/ during build).
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/standalone/public ./public
COPY --from=builder /app/.next/standalone/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
