# How AI Agents Can Draw Floor Plans

*Published: April 3, 2026 — Cycle 128 edition*
*~700 words | 5 min read*
*Tags: #AI #Agents #MCP #FloorPlan #LLM #Developers #VibeCoding #BuildInPublic*

---

Ask Claude to design a two-bedroom apartment. You'll get a paragraph — coherent, spatially correct, with traffic flow and clearances described accurately.

You cannot hand that paragraph to a contractor.

This is the problem Skissify solves: AI agents can think spatially, but until April 2026 they couldn't render spatial output. Paragraphs and ASCII diagrams are not floor plans. Generated images are stochastic — same prompt, different output, no version control, no programmatic inspection.

Skissify is the third option: a structured JSON manifest in, a deterministic hand-drawn SVG sketch out, every time.

---

## The Three-Line Setup

```bash
# Add to Claude Desktop, Cursor, or any MCP-compatible runtime
npx skissify-mcp

# Or call the REST API directly — no auth required
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d @manifest.json
```

Once the MCP server is running, Claude can draw. Not describe — draw. The output is a URL. Shareable. Reproducible. Inspectable.

---

## What a Floor Plan Manifest Looks Like

This is a studio apartment, rendered as a hand-drawn sketch:

```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "wobble": { "amplitude": 3, "waves": 4, "humanness": 0.5 },
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "width": 500, "height": 350, "label": "Living / Bedroom" },
    { "type": "rect", "x": 50, "y": 400, "width": 180, "height": 120, "label": "Kitchen" },
    { "type": "rect", "x": 230, "y": 400, "width": 160, "height": 120, "label": "Bathroom" },
    { "type": "door-symbol", "x": 120, "y": 50, "width": 60, "height": 20 },
    { "type": "window", "x": 50, "y": 200, "width": 10, "height": 80 },
    { "type": "bed", "x": 380, "y": 80, "width": 100, "height": 140, "pillows": "double" },
    { "type": "sofa", "x": 80, "y": 160, "width": 160, "height": 60 },
    { "type": "toilet", "x": 250, "y": 420, "width": 50, "height": 70 },
    { "type": "sink", "x": 320, "y": 420, "width": 40, "height": 40 }
  ]
}
```

The schema is intentionally flat. Every element is self-describing: type, position, size, optional label. No nesting. No parent-child relationships. This is not an accident.

---

## Why Flat Schema Matters for LLMs

Internal benchmarks across Claude, GPT-4o, and Gemini Pro:

**Flat schema** (element array, absolute coordinates):
- Claude: 94% first-attempt valid output
- GPT-4o: 91%
- Gemini Pro: 88%

**Hierarchical schema** (rooms → zones → elements → properties):
- Claude: 61%
- GPT-4o: 58%
- Gemini Pro: 41%

Same models. Same prompts. The structure is the variable.

The hypothesis: hierarchical schemas force the model to track parent-child relationships while simultaneously reasoning about spatial coordinates. Flat schemas let the model focus entirely on geometry. Cognitive load is a real constraint even for large models.

---

## Four Real Workflows

**1. Claude Desktop floor planner.** User describes a room in natural language. Claude calls `skissify_render` via MCP. Returns a sketch URL. User shares it in Slack.

**2. Real estate listing automation.** Agent generates floor plan manifest from property description in CRM. Skissify renders it. Sketch attached to listing automatically.

**3. Architecture review pipeline.** n8n workflow: architectural brief → GPT-4o generates manifest → Skissify renders → sketch embedded in Notion review doc.

**4. D&D dungeon map generation.** Game master describes encounter area. Claude generates room layout manifest. Skissify renders a hand-drawn battle map. Players see a sketch, not a sterile grid.

---

## What Makes This Different from Stable Diffusion

Generated images are non-deterministic. Every run produces a different output. They can't be inspected, versioned in git, or modified programmatically.

A Skissify sketch URL encodes the full manifest. Same input = same output, every time. You can diff manifests. You can version them. You can pass the URL between agent nodes as state.

This is what deterministic visual output looks like for an agent pipeline. Not an image — a URL that encodes a renderable, reproducible diagram.

---

## Getting Started

```bash
# MCP install (Claude Desktop, Cursor, any MCP runtime)
npx skissify-mcp

# REST API
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","tool":"ballpoint","wobble":{"amplitude":3,"waves":4,"humanness":0.5},"elements":[{"type":"rect","x":50,"y":50,"width":300,"height":200,"label":"Living Room"}]}'
```

Human Mode (no JSON): [skissify.com/human](https://skissify.com/human)
Agent guide: [skissify.com/for-agents](https://skissify.com/for-agents)
Schema reference: [skissify.com/docs/schema](https://skissify.com/docs/schema)
