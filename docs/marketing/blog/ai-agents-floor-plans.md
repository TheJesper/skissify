# How AI Agents Can Draw Floor Plans

*Published: April 4, 2026 | blog.skissify.com | Cycle 126*
*Tags: AI agents, MCP, floor plans, Claude, spatial reasoning, API, LangChain, n8n, automation*

---

Language models have had spatial reasoning for years. Ask any capable model to design a two-bedroom apartment and you'll get back something coherent — proper traffic flow, clearances between rooms, windows on exterior walls, a bathroom adjacent to the master bedroom. The reasoning is real. It has been for a while.

The problem was always the output format.

You could get a paragraph. Thoughtful, accurate, spatially correct. But a paragraph is not a floor plan. You can't hand a paragraph to your contractor. You can't embed it in a listing as a visual artifact. You can't pass it to the next node in your agent pipeline and have a downstream system or human understand the layout without re-reading the entire description.

AI agents could *think* spatially. They couldn't *draw* spatially.

That changed when the output format changed.

---

## Three Lines to Get Started

```bash
# Install the MCP server (Claude Desktop, Cursor, any MCP-compatible runtime)
npx skissify-mcp

# Or call the REST API directly — no auth required
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d @floor-plan.json
```

That's the integration. An MCP-compatible agent can now call `skissify_render` with a JSON manifest and get back a sketch URL. The agent doesn't manage pixels or canvas state. It describes spatial relationships in structured data and gets a visual artifact back.

---

## Why Flat JSON Gets 92% First-Try Accuracy

The manifest structure matters more than the model.

Internal benchmarks show flat JSON achieves **88–92% valid output on first attempt** from Claude, GPT-4o, and Gemini Pro. Hierarchical nested schemas drop to **40–61%**. Same models, same task, different schema design.

The reason: LLMs handle flat lists better than deep nesting for spatial tasks. Each element is self-describing — position, size, type, label — without requiring the model to track parent-child relationships while also reasoning about spatial positions.

Here's a complete three-bedroom floor plan manifest:

```json
{
  "paper": "cream",
  "tool": "pencil",
  "wobble": 3,
  "humanness": 2,
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "width": 300, "height": 200, "label": "Living Room" },
    { "type": "rect", "x": 350, "y": 50, "width": 200, "height": 200, "label": "Kitchen" },
    { "type": "rect", "x": 50, "y": 250, "width": 180, "height": 160, "label": "Bedroom 1" },
    { "type": "rect", "x": 230, "y": 250, "width": 160, "height": 160, "label": "Bedroom 2" },
    { "type": "rect", "x": 390, "y": 250, "width": 160, "height": 160, "label": "Bedroom 3" },
    { "type": "rect", "x": 50, "y": 410, "width": 160, "height": 120, "label": "Bathroom" },
    { "type": "door-symbol", "x": 50, "y": 180, "width": 40, "height": 10 },
    { "type": "door-symbol", "x": 140, "y": 250, "width": 40, "height": 10 },
    { "type": "window", "x": 150, "y": 50, "width": 80, "height": 10 },
    { "type": "window", "x": 400, "y": 50, "width": 80, "height": 10 },
    { "type": "bed", "x": 60, "y": 265, "width": 80, "height": 100, "pillows": "double" },
    { "type": "text", "x": 200, "y": 20, "text": "3-Bed Apartment — 92m²" }
  ]
}
```

The 26 element types cover everything needed for architectural floor plans: primitives (`rect`, `line`, `circle`, `arc`), annotations (`text`, `dim`, `arrow`), architectural symbols (`door-symbol`, `door-slide`, `window`, `stair`, `column`, `opening`), furniture (`bed`, `sofa`, `armchair`, `desk`, `dining-table`, `bookshelf`), and bathroom/kitchen fixtures (`toilet`, `bathtub`, `sink`, `shower`, `stove`).

---

## Four Real Agent Workflows

**1. Claude Desktop with MCP — conversational floor plans**

User: "Draw a studio apartment with an open kitchen, one bathroom, and a large south-facing window."

Claude reasons about the layout, generates the manifest, calls `skissify_render`, and returns a sketch URL. Total time: under 10 seconds. No canvas interaction. No drawing software. The agent described the space and got a picture back.

**2. LangChain / LlamaIndex — automated property listings**

An agent tasked with "generate a rental property listing with a floor plan sketch" calls the Skissify REST API as a tool, receives the sketch URL, and embeds it in the listing template alongside the description text. The reviewer sees a rough plan — not a blank space.

**3. n8n or Make.com — no-code spatial automation**

A workflow receives a room description via webhook, passes it to Claude for layout reasoning, POSTs the manifest to `/api/render`, and delivers the sketch URL via email or Slack. No deployment. No canvas. Works with any model that can output JSON.

**4. Vibe coding in Cursor — instant floor plan preview**

Developer prompt: "Add a floor plan preview to the property detail page using the Skissify API." Cursor generates the manifest from existing property data fields, embeds the sketch as an `<img>` tag. Works with existing data models. No design tools opened.

---

## Why Determinism Changes Everything for Agents

Generated images from Midjourney, DALL-E, or Stable Diffusion are stochastic. Run the same prompt twice, get two different images. You cannot programmatically verify the output, version it, or reproduce it.

Skissify sketches are deterministic. The same JSON manifest produces the same sketch every time — including the wobble, which is seeded from the manifest content. This means you can:

- **Diff two floor plan versions** programmatically by comparing manifests
- **Cache by manifest hash** — no redundant renders
- **Store the manifest, not the image** — regenerate on demand, any time
- **Write tests that assert specific output** — "this input always produces this sketch"

For agents running in pipelines at scale, this is the difference between a tool and a toy. A stochastic image generator cannot be a reliable pipeline component. A deterministic renderer can.

---

## The Sketch URL as Agent Memory

There's a property of the Skissify URL that most users don't notice at first: the sketch data lives in the URL itself.

This means a sketch URL is not just a link to an image. It's a serialized manifest — agent-readable state. An orchestrator can inspect the URL to determine what the current floor plan contains, modify the manifest, re-render, and pass the new URL downstream. The sketch becomes a persistent, readable, rewritable spatial memory cell.

No database. No state management. The URL is the state.

---

## Get Started

```bash
# MCP (Claude Desktop, Cursor, Windsurf)
npx skissify-mcp

# REST API — no auth, no account
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","elements":[
    {"type":"rect","x":0,"y":0,"width":200,"height":150,"label":"Kitchen"},
    {"type":"window","x":80,"y":0,"width":60,"height":10}
  ]}'
```

Your agent can now draw. [Start at skissify.com](https://skissify.com).

---

*Skissify is an open sketch API for AI agents. Free tier, no auth required. MCP server: `npx skissify-mcp`. 26 element types. Deterministic, seeded output. REST + MCP.*
