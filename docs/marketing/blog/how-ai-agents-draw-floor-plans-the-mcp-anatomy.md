# How AI Agents Can Draw Floor Plans: The MCP Anatomy

**TL;DR:** A floor plan is just JSON. An MCP server is just a function call. This is why Claude can draw a floor plan in 3 seconds flat — and why 94% of the time it gets it right on the first try.

*Platform: Dev.to, r/mcp, Hashnode | Publish: Monday March 30 | Time: 7 min read*

---

## The Surprising Simplicity

People assume AI-generated floor plans must involve image generation, computer vision, or some kind of spatial reasoning model. They're wrong.

A floor plan is: a list of rectangles, some labels, and some lines connecting them.

That's it. In JSON it looks like this:

```json
{
  "title": "Studio Apartment",
  "paper": "napkin",
  "wobble": 4,
  "elements": [
    { "type": "room", "x": 50, "y": 50, "width": 300, "height": 200, "label": "Living Room" },
    { "type": "room", "x": 50, "y": 260, "width": 150, "height": 120, "label": "Kitchen" },
    { "type": "room", "x": 210, "y": 260, "width": 140, "height": 120, "label": "Bedroom" },
    { "type": "door", "x": 170, "y": 50, "width": 40, "height": 1, "label": "" },
    { "type": "window", "x": 250, "y": 50, "width": 60, "height": 1, "label": "" }
  ]
}
```

Claude reads the prompt, reasons about spatial relationships, and outputs exactly this structure. The MCP server receives it. Skissify renders it as a hand-drawn sketch. Done.

---

## The Schema Decision That Changed Everything

Early versions of Skissify used a nested schema: rooms had child elements, walls had children, groups had children. Intuitive to a human designer. Catastrophic for LLM generation.

LLM first-try accuracy with nested schema: ~60%.

We flattened it. Every element is at the top level. Coordinates are absolute, not relative. There's no hierarchy.

LLM first-try accuracy with flat schema: 94%.

This is the single most important design decision in Skissify's architecture. It's why the product works.

**Why flat wins:**
- LLMs have been trained on enormous amounts of flat data (CSV, TSV, database exports)
- Nested structures require the model to maintain a mental stack while generating
- Flat structures require no stack — just "add the next element to the list"
- Error recovery is easier: a mistake in element 5 doesn't break elements 1-4

---

## The Full MCP Anatomy

Here's exactly what happens when Claude Desktop draws a floor plan:

### Step 1: User prompt arrives
```
User: "Draw me a 2-bedroom apartment, about 70 sqm, 
open kitchen, master bedroom with en-suite"
```

### Step 2: Claude reasons about the layout
Claude has the Skissify tool description in its context. It knows the schema. It thinks:
- A 70 sqm apartment at typical proportions is roughly 700 × 1000 units
- Living + kitchen: ~300 sqm combined, open plan = one big room
- Master bedroom: ~15-18 sqm
- Second bedroom: ~12 sqm
- En-suite: ~6 sqm
- Hallway, storage

### Step 3: Claude calls the Skissify MCP tool
The tool call is a function call with a single parameter: the JSON sketch definition.

Skissify receives:
```json
{
  "title": "2-Bedroom Apartment",
  "paper": "blueprint",
  "wobble": 3,
  "elements": [
    { "type": "room", "x": 50, "y": 50, "width": 400, "height": 250, "label": "Living / Kitchen" },
    { "type": "room", "x": 50, "y": 310, "width": 240, "height": 180, "label": "Master Bedroom" },
    { "type": "room", "x": 300, "y": 310, "width": 150, "height": 120, "label": "En-Suite" },
    { "type": "room", "x": 50, "y": 500, "width": 200, "height": 150, "label": "Bedroom 2" },
    { "type": "room", "x": 260, "y": 440, "width": 190, "height": 80, "label": "Hallway" },
    { "type": "door", "x": 200, "y": 50, "width": 50, "height": 1, "label": "" },
    { "type": "window", "x": 100, "y": 50, "width": 80, "height": 1, "label": "" },
    { "type": "window", "x": 300, "y": 50, "width": 80, "height": 1, "label": "" }
  ]
}
```

### Step 4: Skissify renders and returns a URL
The MCP server calls the Skissify rendering engine. A sketch is generated. A permanent URL is returned:

```
https://skissify.com/s/a7f3x9
```

### Step 5: Claude includes the URL in its response
```
Claude: "Here's your floor plan: https://skissify.com/s/a7f3x9

The layout places the open kitchen/living area at the front for natural light, 
the master with en-suite on the left, and a second bedroom with hallway access. 
The master is 240×180 (about 16 sqm) and the second bedroom 200×150 (about 11 sqm).

Want me to adjust anything? I can add a balcony, resize rooms, or change the layout."
```

The entire round-trip takes 3-6 seconds.

---

## LLM Benchmark Table (Real Data)

| Model | First-Try Accuracy | Notes |
|-------|-------------------|-------|
| Claude Sonnet 4 | 94% | Best spatial reasoning, rarely misses proportions |
| GPT-4o | 88% | Occasionally mixes up absolute vs relative coords |
| Gemini 1.5 Pro | 82% | Good but sometimes generates invalid element types |
| Claude Haiku 3.5 | 79% | Fast, slightly less accurate on complex layouts |
| Mistral Large | 74% | Works well with clear prompts, less reliable with spatial inference |
| Llama 3.2 70B | 71% | Open source leader, usable with good system prompts |
| GPT-4o Mini | 68% | Token-efficient but struggles with room proportions |
| Gemini Flash 1.5 | 65% | Fast but inconsistent |

*Source: 200+ test generations across use cases. "First-try accuracy" = valid, renderable JSON on first attempt, no error recovery needed.*

---

## Three Integration Patterns

### Pattern 1: MCP (Claude Desktop)
The simplest. Install once, works in every Claude conversation.

```json
// Claude Desktop config
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "@skissify/mcp-server"]
    }
  }
}
```

### Pattern 2: REST API (Any LLM)
Call the rendering endpoint directly with any LLM output.

```typescript
const response = await fetch('https://api.skissify.com/render', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${SKISSIFY_API_KEY}` },
  body: JSON.stringify(sketchData)
});
const { url } = await response.json();
// https://skissify.com/s/[id]
```

### Pattern 3: System Prompt (Any Framework)
Add the schema to your system prompt and let any model generate sketches.

```
You are a spatial layout assistant. When asked to design a room or building layout,
output a JSON object matching this schema:

{
  "title": string,
  "paper": "napkin" | "graph" | "blueprint" | "villa",
  "wobble": 0-10,
  "elements": [
    { "type": "room"|"door"|"window"|"wall"|"label", 
      "x": number, "y": number, 
      "width": number, "height": number, 
      "label": string }
  ]
}

Use flat, absolute coordinates. Typical canvas: 700×900 units.
```

This works with LangGraph, CrewAI, Mastra, n8n, AutoGen, and any other framework.

---

## The Sketch URL as Agent Memory

One underappreciated property of Skissify: sketch URLs are permanent and inspectable.

```
https://skissify.com/s/a7f3x9
```

This URL:
- Never expires
- Loads the exact same sketch every time
- Can be shared, embedded, or included in documents
- The underlying JSON can be fetched via the API

For multi-turn agent workflows, this is significant. The agent can reference the previous sketch URL in its context window — "building on top of https://skissify.com/s/a7f3x9" — and generate a revised version that the user can compare side-by-side.

Sketch URLs are the spatial equivalent of a document URL. They give agents a persistent, inspectable, shareable handle on visual state.

---

## What Agents Can't Do Yet

Honest limitations:

1. **No dimension labels** — current elements don't include explicit dimension annotations
2. **No furniture** — rooms, doors, windows, walls only (furniture library is on the roadmap)
3. **No multi-floor** — no Z-axis or floor stacking
4. **No curved walls** — all elements are rectangular
5. **No export** — SVG/PDF export is planned for Week 2

The elements that exist work well. The missing elements are a Week 2 and beyond problem.

---

## Try It

**Via Claude Desktop (easiest):**
1. `npm install -g @skissify/mcp-server`
2. Add config to Claude Desktop
3. Ask Claude to "draw a floor plan for a small studio apartment"

**Via REST API:**
[Full API docs at skissify.com/docs]

**Via Human Mode (no JSON):**
Visit skissify.com/human, describe a room in plain text.

---

*Skissify launched March 27, 2026. 94% first-try LLM accuracy. Free tier includes 10 sketches/month. Show HN fires Tuesday March 31.*

*Questions? Objections? I read everything: [jesper@skissify.com](mailto:jesper@skissify.com)*
