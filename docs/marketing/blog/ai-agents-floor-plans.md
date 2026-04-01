# How AI Agents Can Draw Floor Plans

*Published: April 2, 2026 | 6-minute read*
*Tags: AI agents, MCP, floor plans, Claude, spatial reasoning, API*

---

LLMs have had spatial reasoning since at least GPT-4. Ask any capable model to design a studio apartment and you'll get something coherent — traffic flow, clearances, placement relative to windows, furniture that fits. The reasoning is real.

The problem was always the **output format**.

You'd describe a house to Claude and get a paragraph. Accurate, thoughtful — but a paragraph. You can't hand a paragraph to a contractor. You can't share it in a design review. You can't pass it to the next agent in a pipeline as a visual artifact.

AI agents could *think* spatially. They couldn't *draw* spatially.

That gap is now closed.

---

## The Three-Line Integration

```bash
# Install MCP server
npx skissify-mcp

# Or call the API directly
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","tool":"pencil","elements":[
    {"type":"rect","x":0,"y":0,"width":200,"height":150,"label":"Living"},
    {"type":"rect","x":0,"y":150,"width":100,"height":100,"label":"Bedroom"},
    {"type":"door-symbol","x":80,"y":0,"width":60}
  ]}'
```

Result: a hand-drawn SVG floor plan. Wobbly walls, architectural symbols, room labels. Renderable in a browser, embeddable in a doc, shareable via URL.

---

## What the Manifest Looks Like

The JSON schema is designed to be LLM-readable — flat, explicit, no ambiguity:

```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "wobble": 3,
  "humanness": 2,
  "elements": [
    {"type": "rect", "x": 0, "y": 0, "width": 300, "height": 200, "label": "Living Room"},
    {"type": "rect", "x": 0, "y": 200, "width": 140, "height": 130, "label": "Kitchen"},
    {"type": "rect", "x": 160, "y": 200, "width": 140, "height": 130, "label": "Bedroom"},
    {"type": "door-symbol", "x": 120, "y": 0, "width": 60, "direction": "in"},
    {"type": "window", "x": 0, "y": 80, "width": 60},
    {"type": "dim", "x1": 0, "y1": -20, "x2": 300, "y2": -20, "label": "9.0m"}
  ]
}
```

Llama 3 70B generates valid manifests at ~87% accuracy on first attempt. Claude 3.5+ achieves ~94%. The flat schema is intentional — nested structures drop LLM accuracy to ~40%.

---

## Five Real Workflows

### 1. Claude Desktop + MCP
```
User: "Sketch a 2-bed apartment, roughly 60m2. Living room center, kitchen north wall, two bedrooms south."
Claude: [constructs JSON, calls skissify MCP tool]
Result: hand-drawn floor plan in Claude's response window
```

### 2. LangChain / CrewAI Agent Tool
Register Skissify as a tool. The agent calls it when spatial output is needed. No special integration beyond a POST request.

### 3. CI/CD Architecture Diagrams
Every PR that changes system architecture triggers a Skissify render of the updated topology. The sketch appears as a PR comment. Engineers see the structure change visually.

### 4. n8n / Make Automation
A homeowner describes their renovation via a chatbot. The workflow: natural language → LLM parses to manifest → Skissify renders → sketch URL sent to contractor via email.

### 5. Mastra / TypeScript Agent Pipelines
```typescript
import { createSkissifyTool } from 'skissify-mastra';

const floorPlanTool = createSkissifyTool({
  apiKey: process.env.SKISSIFY_KEY, // optional — free tier needs no key
});
agent.addTool(floorPlanTool);
```

---

## The Air-Gapped / Local Stack

For teams that can't send data to external APIs:

```bash
git clone https://github.com/skissify/skissify
docker compose up
# → Available at http://localhost:3000/api/render
```

Pair with Ollama + Llama 3 for a fully local, air-gapped floor plan generation stack. Zero external API calls. Blueprint-to-sketch in one pipeline.

---

## What You Get Back

The response is a clean SVG — scalable, embeddable, editable:
- Architectural symbols render correctly (door swings, window glyphs, stairs)
- Text labels use Caveat (Google Fonts) for a genuine hand-drawn look
- Wobble is seeded so the same JSON always produces the same sketch
- The SVG can be embedded in `<img>` tags, Notion, Confluence, or any HTML

---

## Why Not Excalidraw?

Excalidraw requires a human at the keyboard. Its internal format is not a stable render API — you can't POST to it and get SVG back. For human-to-human collaborative whiteboarding: Excalidraw. For AI agents generating visual output: Skissify is currently the only option with a proper REST API.

---

## Get Started

```bash
# MCP (Claude, Cursor, Windsurf)
npx skissify-mcp

# REST API — no auth, free tier
POST https://skissify.com/api/render
Content-Type: application/json
```

Documentation: [skissify.com/for-agents](https://skissify.com/for-agents)

*Skissify launched April 1, 2026. Built in Stockholm. Free tier is unlimited — no auth required.*
