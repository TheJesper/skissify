# How AI Agents Can Draw Floor Plans

*Published: April 4, 2026 | Dev.to / blog.skissify.com | Cycle 123*
*Category: AI Agents & Tooling | ~750 words*
*Tags: AI agents, MCP, floor plans, Claude, spatial reasoning, API, automation, LangChain*

---

Language models have had spatial reasoning for years. Ask any capable model to design a two-bedroom apartment and you'll get something coherent — proper traffic flow, clearances between furniture, windows on exterior walls, a bathroom adjacent to the bedroom. The reasoning is real and has been for a while.

The problem was always the output format.

You'd describe a house layout to Claude and get back a paragraph. Thoughtful, accurate — but a paragraph. You can't show a paragraph to a contractor. You can't embed it in a project management ticket. You can't pass it to the next node in an agent pipeline as a visual artifact that downstream agents and humans can actually interpret.

AI agents could *think* spatially. They couldn't *draw* spatially.

Until the output format changed.

---

## The Setup (Three Lines)

```bash
# Install the MCP server
npx skissify-mcp

# Or use the REST API directly — no auth required
curl -X POST https://skissify.com/api/render -H "Content-Type: application/json" -d @floor-plan.json
```

That's the entire integration. Claude Desktop, Cursor, or any MCP-compatible agent runtime can now call `skissify_render` with a JSON manifest and get back a sketch URL. The agent doesn't render anything — it describes spatial relationships in structured data, and Skissify handles the visual output.

---

## The JSON Schema

The flat manifest structure is designed specifically for LLM generation. Internal benchmarks show flat JSON achieves 88–92% valid output on first attempt; hierarchical nested schemas drop to 40–61%.

A simple floor plan:

```json
{
  "paper": "cream",
  "tool": "pencil",
  "wobble": 3,
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "width": 300, "height": 200, "label": "Living Room" },
    { "type": "rect", "x": 350, "y": 50, "width": 200, "height": 200, "label": "Kitchen" },
    { "type": "rect", "x": 50, "y": 250, "width": 250, "height": 180, "label": "Bedroom" },
    { "type": "rect", "x": 300, "y": 250, "width": 150, "height": 180, "label": "Bathroom" },
    { "type": "door-symbol", "x": 50, "y": 200, "width": 40, "height": 10, "rotation": 0 },
    { "type": "window", "x": 200, "y": 50, "width": 80, "height": 10 },
    { "type": "text", "x": 200, "y": 10, "text": "Studio Apartment — 48m²" }
  ]
}
```

The 26 element types cover everything needed for architectural floor plans: basic primitives (`rect`, `line`, `circle`), annotations (`text`, `dim`, `arrow`), architectural symbols (`door-symbol`, `door-slide`, `window`, `stair`, `column`, `opening`), and furniture (`bed`, `sofa`, `armchair`, `desk`, `dining-table`, `bookshelf`), plus bathroom and kitchen fixtures.

---

## Four Real Workflows

**1. Claude Desktop with MCP**
User types: "Draw a 3-bedroom house with an open-plan kitchen and living area, two bathrooms, and a utility room." Claude reasons about the layout, generates the manifest, calls `skissify_render`, and pastes back a sketch URL. The whole exchange takes under ten seconds.

**2. LangChain / LlamaIndex Pipeline**
An agent tasked with "generate a rental property listing including a floor plan sketch" calls the Skissify REST API as a tool, embeds the returned URL in the listing template. The human reviewer sees a rough sketch alongside the text — not a blank space.

**3. n8n or Make.com Automation**
A workflow that receives a room description via webhook, passes it to GPT-4o or Claude for layout reasoning, POSTs the manifest to `/api/render`, and delivers the sketch URL via email or Slack. No code deployment required.

**4. Vibe coding in Cursor**
Developer prompts: "Add a floor plan preview to the property details page. Use the Skissify API." Cursor generates the manifest from property data fields and embeds the sketch as an `<img>` tag. Works with the existing data model — no design tool needed.

---

## Why Determinism Matters for Agents

Generated images (Midjourney, DALL-E, Stable Diffusion) are stochastic. Run the same prompt twice, get two different images. You cannot programmatically verify output, version control it, or reproduce it reliably.

Skissify sketches are deterministic. The same JSON manifest produces the same sketch every time — down to the wobble, which is seeded from the manifest content. This means you can:

- Diff two versions of a floor plan programmatically
- Cache results by manifest hash
- Store the manifest (not the image) and regenerate on demand
- Build tests that assert a specific sketch URL for a given input

For agents running in pipelines, this is the difference between a tool and a toy.

---

## Get Started

```bash
# MCP server (for Claude Desktop / Cursor)
npx skissify-mcp

# REST API (no auth required)
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","elements":[{"type":"rect","x":0,"y":0,"width":200,"height":150,"label":"Kitchen"}]}'
```

The response contains a sketch URL. Paste it anywhere. Embed it in anything. Share it with anyone.

Your agent can now draw. [Start at skissify.com](https://skissify.com).

---

*Skissify is an open sketch API for AI agents. Free tier. MCP server: `npx skissify-mcp`. 26 element types. Deterministic output.*
