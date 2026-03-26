# Skissify

## Project Briefing
Skissify is an AI-compatible sketch SaaS that renders hand-drawn style sketches from JSON manifests. It targets floor plans, architecture diagrams, and technical drawings with configurable wobble/humanness parameters.

## Stack
- **Framework:** Next.js 15 + React 19 + TypeScript
- **Styling:** Tailwind CSS 4
- **Rendering:** HTML Canvas 2D with custom wobble algorithms
- **Font:** Caveat (Google Fonts) for hand-drawn text

## Architecture
- `src/lib/types.ts` — Type definitions for all sketch elements (14 element types)
- `src/lib/wobble.ts` — Seeded random wobble algorithms (line, circle, arc)
- `src/lib/renderer.ts` — Canvas 2D renderer that applies wobble to elements
- `src/lib/presets.ts` — Demo presets (napkin sketch, plan drawing, blueprint, villa)
- `src/hooks/useSketch.ts` — Main state hook managing sketch data
- `src/components/` — UI components (Canvas, Toolbar, ControlPanel, PresetTabs, JsonEditor)

## Key Concepts
- **Manifest:** JSON object describing paper type, tool, wobble params, and elements array
- **Wobble:** Seeded random perturbation that makes lines look hand-drawn
- **Humanness:** Additional randomness simulating human imperfection
- **Paper types:** cream, white, yellow, blueprint
- **Tool types:** pencil, ballpoint, ink (affect line width and opacity)

## Element Types
line, rect, circle, arc, arrow, text, dashed, dim, window, door-symbol, door-slide, stair, opening, column

## Development
```bash
npm run dev    # Start dev server
npm run menu   # Interactive project menu
```
