# Handover: sandviken session — skissify:1

**Date:** 2026-03-27
**Session:** sandviken (TeamRoom coding session)
**Agent:** skissify__1 (clone 1/2)

## What Changed

### 1. `next.config.ts` — Webpack Fix
- Added `serverExternalPackages` for `@libsql/client`, `@prisma/adapter-libsql`, `@prisma/client`, `@auth/prisma-adapter`
- This fixes the `TypeError: e[o] is not a function` webpack bundling error during static page generation
- Native bindings in these packages break when bundled by webpack; must be kept external

### 2. `src/lib/wobble.ts` — Full Rewrite (POC Port)
- **RNG**: Replaced LCG (`seededRandom`) with xorshift (`mkRng`) matching POC
- **Wobble**: Multi-harmonic with asymmetric envelope, tremor, hesitation, overshoot (was single sine wave)
- **Stroke renderers**: Added `pencilStroke` (3-pass graphite), `ballpointStroke` (pressure variation), `inkStroke` (pen lift), `blueprintStroke` (clean technical), `inkGlob` (ink blobs)
- **Exports**: `mkRng`, `wobble`, `cpath`, `doStroke`, `drawHandLine` (new POC API) + backward-compatible `wobbleLine`, `wobbleCircle`, `wobbleArc`, `drawSmoothCurve` (old API for svg-renderer.ts)

### 3. TypeScript Fixes (Canvas.tsx, useSketch.ts, svg-renderer.ts)
- Fixed all union-narrowing `"x1" in el` type errors with `as unknown as Record<string, number>` casts
- Added `getElementBounds()` helper to Canvas.tsx
- All 3 files: type-safe property access for SketchElement union type

### 4. `package.json` — Added `lz-string` dependency
- Required by draw page's url-encoding module

## What Doesn't Work Yet
- Docker build was in progress at session end (not verified)
- Deployment to Hetzner not done
- SVG renderer (svg-renderer.ts) still uses backward-compat wobble exports — not POC-quality rendering
- Visual verification against POC not done (build passes, dev server starts, but no visual comparison)

## Next Steps
- Verify Docker build succeeds
- Deploy to Hetzner: `docker build -t skissify . && docker save skissify | plink -ssh jesper@65.109.62.25 "docker load && cd /home/jesper/skissify && docker compose up -d"`
- Visual test: compare rendered output against POC screenshots
- Upgrade svg-renderer.ts to use new doStroke/wobble directly (currently uses backward-compat wrappers)
