# Skissify Is json-render for Hand-Drawn Spatial Sketches

*Published: Dev.to, April 3, 2026*
*Tags: json-render, mcp, ai-agents, generative-ui, api*

---

Vercel's json-render hit 13,000+ GitHub stars in March 2026 by validating a pattern that developers immediately recognized:

**Schema-constrained LLM JSON → renderer = reliable AI-to-UI output.**

No hallucinations. No "it almost worked." Just structured JSON, a schema validator, and a renderer that maps elements to pixels.

Skissify is that same architecture — for floor plans, architectural sketches, and spatial diagrams.

---

## The Pattern

Here's what json-render does:

```
LLM generates JSON tree → JSON validates against schema → renderer maps to UI components
```

Here's what Skissify does:

```
LLM generates manifest JSON → JSON validates against schema → renderer maps to hand-drawn SVG
```

The architecture is identical. The domain is different.

json-render output: web UI components (buttons, forms, cards, layouts)
Skissify output: spatial diagrams (floor plans, room layouts, architectural sketches, dungeon maps)

---

## Side-by-Side Comparison

| Aspect | json-render | Skissify |
|--------|-------------|----------|
| Input | JSON tree (components + props) | JSON manifest (elements + positions) |
| Schema | React component schema | Spatial element schema |
| Output | Web UI HTML/CSS | Hand-drawn SVG |
| Target | Frontend AI agents | Spatial/architectural AI agents |
| Auth | API key | None (free) |
| Latency | Server-side render | < 200ms |
| LLM accuracy | High (schema-constrained) | 94% first-try (flat schema) |

---

## The Code

This is all you need:

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "elements": [
      {"type": "rect", "x": 50, "y": 50, "w": 200, "h": 120, "label": "Living Room"},
      {"type": "rect", "x": 50, "y": 200, "w": 90, "h": 90, "label": "Bedroom"},
      {"type": "rect", "x": 170, "y": 200, "w": 80, "h": 90, "label": "Kitchen"},
      {"type": "line", "x1": 50, "y1": 170, "x2": 250, "y2": 170}
    ]
  }'
```

You get back an SVG. Hand-drawn style. No Chromium. No auth. Under 200ms.

That's an apartment floor plan.

---

## Why Flat Schema Beats Nested

The most important thing we learned building Skissify: **schema design is LLM UX.**

We tested three schema versions in the first two weeks:

- **Nested JSON** (rooms contain elements contain sub-elements): 40% LLM first-try accuracy
- **Moderate nesting** (elements with children): 67% accuracy
- **Flat JSON** (every element at top level, relationships via ID refs): **94% accuracy**

The reason is distribution. LLMs are trained on flat data structures far more than deeply nested ones. Every JSON you've ever seen on an API doc, every example in training data — most of it is flat.

json-render made the same call. Their schema catalog keeps components shallow by default.

If you're building an AI-to-renderer pipeline, keep your schema flat. The LLM will get it right almost every time.

---

## MCP Integration

If you're building an agent that needs to draw:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "@skissify/mcp"]
    }
  }
}
```

Claude and any MCP-compatible agent can now call `render_sketch` as a native tool. The LLM generates the manifest JSON, Skissify returns SVG. No intermediate steps. No image model required.

---

## The Parallel That Matters

json-render gave "AI-generated UI" a name and a pattern. Before json-render, people were doing this — but nobody had articulated the schema-constrained approach as a first-class architecture.

Skissify does the same thing for spatial output. AI agents have been able to generate floor plans for months. What they couldn't do was generate *reliable, consistent, visually correct* floor plans without a constrained schema and a spatial renderer behind it.

That constraint is what makes it useful.

---

## Try It

100 renders/month free. No account.

```bash
curl -s -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"elements":[{"type":"rect","x":10,"y":10,"w":150,"h":100,"label":"Your Room"}]}'
```

Same pattern. Spatial domain.

[skissify.com](https://skissify.com) — MCP server, REST API, open JSON schema.
