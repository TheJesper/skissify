# Deterministic Wobble: How Skissify Makes Hand-Drawn Art Reproducible

*Posted: April 2026 — Cycle 117*

---

The most counterintuitive thing about Skissify is this: **every sketch is reproducible.**

That sounds wrong. Hand-drawn means imperfect, random, human. How can it be reproducible?

The answer is a technique borrowed from procedural generation: **seeded randomness**.

---

## The Problem With True Randomness

The first version of Skissify used `Math.random()` for wobble. Every render was different — which felt right for "hand-drawn." But it created a serious problem:

- Share a sketch URL → viewer sees different wobble than creator
- API caller stores result A → re-renders result B
- Two Claude agents generate the "same" floor plan → completely different sketches

For an AI agent tool, reproducibility isn't optional. Agents need to generate the same sketch tomorrow that they generated today. Otherwise you can't diff, version, or compare sketches.

---

## Seeded Random: Determinism Without Uniformity

The fix is a seeded pseudo-random number generator (PRNG). Here's the core idea:

```typescript
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}
```

Given the same seed, this function produces the same sequence of "random" numbers every time.

In Skissify, the seed comes from the manifest itself — a hash of the JSON content. Change the manifest → different seed → different wobble. Same manifest → same seed → identical wobble every time.

---

## How Wobble Works

Each line segment gets broken into sub-segments, with each endpoint perturbed by a small amount controlled by the `wobble` parameter (0–10):

```typescript
function wobbleLine(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,
  x2: number, y2: number,
  wobble: number,
  rng: () => number
) {
  const segments = Math.max(3, Math.floor(distance(x1, y1, x2, y2) / 20))
  const dx = (x2 - x1) / segments
  const dy = (y2 - y1) / segments

  ctx.beginPath()
  ctx.moveTo(x1, y1)

  for (let i = 1; i <= segments; i++) {
    const px = x1 + dx * i + (rng() - 0.5) * wobble * 2
    const py = y1 + dy * i + (rng() - 0.5) * wobble * 2
    ctx.lineTo(px, py)
  }
  ctx.stroke()
}
```

The `humanness` parameter adds a second layer — slight variations in stroke pressure, minor endpoint drift — simulating the difference between a practiced hand and a nervous one.

---

## Why This Matters for AI Agents

When Claude (or any MCP client) calls Skissify to draw a floor plan:

1. Claude generates a JSON manifest from natural language
2. Skissify renders using the manifest's content hash as seed
3. The rendered sketch is **deterministically tied to the manifest**

This means:
- **Version control works**: if the sketch changed, the manifest changed
- **Caching works**: same input = same output = no re-render needed
- **Diffing works**: two manifests can be compared by their sketches
- **Reproducibility**: a floor plan generated in March renders identically in December

---

## The Wobble Parameters in Practice

| `wobble` | Effect | Best for |
|----------|--------|---------|
| 0 | Perfectly straight lines | Technical diagrams, blueprints |
| 2 | Barely perceptible tremor | Professional presentation sketches |
| 5 | Clear hand-drawn feel | Conceptual floor plans, wireframes |
| 8 | Expressive, loose | Brainstorm sketches, napkin ideas |
| 10 | Barely controlled | Creative/artistic output |

The default is `5` — enough wobble to feel human, controlled enough to remain legible.

---

## The HN Question I'm Anticipating

*"Why Canvas 2D instead of SVG?"*

Canvas 2D gives us direct path manipulation with sub-pixel control. The wobble algorithm needs to perturb individual vertices, not declare shapes declaratively. SVG's path API makes this workable but awkward. Canvas 2D + seeded PRNG is the natural pairing.

*"Can you export to SVG?"*

Yes — by tracing the canvas paths back to SVG. It's on the roadmap. The seeded PRNG means every export is identical across renders.

---

## Try It

The API is free and unauthenticated:

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "cream",
    "tool": "pencil",
    "wobble": 5,
    "humanness": 3,
    "elements": [
      {"type": "rect", "x": 100, "y": 100, "width": 200, "height": 150, "label": "Living Room"}
    ]
  }'
```

Or install the MCP server: `npx skissify-mcp`

---

*Built with Next.js, TypeScript, and HTML Canvas 2D. Skissify is open to feedback from MCP builders.*
