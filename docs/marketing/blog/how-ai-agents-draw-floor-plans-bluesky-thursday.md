# How AI Agents Draw Floor Plans: The Thursday Morning Primer

*Cycle 103 — Thursday April 2, 2026 — Bluesky / Mastodon developer audience*

---

Quick technical note on a problem I solved while building Skissify:

**How do you make an LLM draw a floor plan?**

Not describe one. Not Markdown it. Actually render a spatial sketch.

---

## The Problem

LLMs are great at text. They can describe a floor plan in natural language. They can even write structured JSON that *represents* one.

But there was no API that took that JSON and turned it into an actual hand-drawn image.

`POST /api/render` didn't exist for sketches the way it exists for emails, PDFs, notifications.

---

## What I Built

Skissify is a REST API that accepts a JSON manifest and returns a hand-drawn SVG.

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "cream",
    "tool": "pencil",
    "elements": [
      {"type": "rect", "x": 50, "y": 50, "w": 300, "h": 200, "label": "Living Room"},
      {"type": "rect", "x": 50, "y": 250, "w": 140, "h": 150, "label": "Kitchen"},
      {"type": "door-symbol", "x": 130, "y": 250, "w": 60, "h": 60},
      {"type": "dim", "x1": 50, "y1": 30, "x2": 350, "y2": 30, "label": "9.0m", "offset": -20}
    ]
  }'
```

Returns: `{ "url": "https://skissify.com/s/abc123" }`

Shareable. Hand-drawn style. Wobble algorithm — lines aren't perfectly straight, which is the point.

---

## The Schema Insight

Key decision: flat coordinates vs. hierarchical (rooms contain elements).

Hierarchical felt right architecturally. But LLMs kept violating parent-child consistency constraints. An element would reference a room that didn't exist, or coordinates would overflow room bounds.

Switched to flat: every element gets `x, y, w, h` in paper-space. No nesting.

Result: LLM accuracy went from ~40% valid renders to ~94%.

Lesson: when designing JSON schemas for LLM output, flat beats nested even when nested "makes more sense" semantically.

---

## The MCP Version

If you're building a Claude agent and want drawing capability:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["skissify-mcp"]
    }
  }
}
```

Now ask Claude to "draw a floor plan" or "sketch this architecture." It will call Skissify's render tool and return a URL.

---

## Why Hand-Drawn?

Three reasons:

1. **It signals draft.** A polished CAD drawing signals "done." A hand-drawn sketch signals "open for feedback." This matters in agent workflows where the sketch is a communication artifact, not a final deliverable.

2. **It's LLM-appropriate.** Agents aren't pixel-perfect spatial reasoners. A slightly imperfect hand-drawn render looks intentional. A slightly imperfect clean diagram looks broken.

3. **It's differentiable from Figma/Mermaid.** Skissify has no overlap with "let me clean up this wireframe in Figma." The use case is always: fast, rough, exploratory, immediately shareable.

---

## The API Reference

Full element types: https://skissify.com/for-agents

Current element types (26 total):
- **Primitives:** line, rect, circle, arc, arrow, path
- **Annotations:** text, dashed, dim
- **Architecture:** window, door-symbol, door-slide, stair, opening, column
- **Furniture:** bed, sofa, dining-table, armchair, desk, bookshelf
- **Kitchen & Bath:** toilet, bathtub, sink, stove, shower

No API key. No account. Free tier.

---

[skissify.com](https://skissify.com) — [GitHub](https://github.com/skissify/skissify-mcp)

*Filed under: AI agents, floor plans, MCP, API design, LLM output, spatial reasoning, developer tools*
