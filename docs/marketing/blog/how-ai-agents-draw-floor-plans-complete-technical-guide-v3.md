# How AI Agents Can Draw Floor Plans: The Complete Technical Guide (v3)

*Best platforms: Dev.to (primary), Hashnode, r/mcp, r/AI_Agents — launch Monday*

---

The question sounds simple: can AI draw floor plans?

The answer is yes — but the *how* matters enormously for whether the output is useful.

This is the complete technical walkthrough of how Skissify enables AI agents to produce structured, editable, shareable floor plan sketches — with benchmarks, code, and the schema philosophy that makes it work.

---

## The Problem With "AI-Generated" Floor Plans

Before Skissify, the dominant approach was: ask a model to describe a floor plan, then send that description to an image generator.

The result is a rendering that looks like a floor plan but behaves like a JPEG.

You can't:
- Inspect individual elements
- Modify one room without regenerating the entire image
- Share an editable version with a contractor
- Store it as structured data
- Have your agent reason about the spatial relationships

Skissify takes a different approach: the AI generates **structured JSON**, and a deterministic rendering engine converts that JSON into a hand-drawn sketch. The JSON is the ground truth. The sketch is a view of it.

---

## The Schema Philosophy: Why Flat Wins

The original Skissify schema attempts used relative coordinates and nested element groups. LLM success rate: ~60%.

After testing, the winning schema is aggressively flat:

```json
{
  "title": "Studio Apartment",
  "width": 800,
  "height": 600,
  "style": "blueprint",
  "wobble": { "amplitude": 3, "frequency": 2, "humanness": 7 },
  "elements": [
    {
      "type": "room",
      "id": "living",
      "x": 50, "y": 50,
      "width": 400, "height": 300,
      "label": "Living Room"
    },
    {
      "type": "door",
      "x": 200, "y": 50,
      "wall": "top",
      "side": "left",
      "variant": "hinged"
    },
    {
      "type": "window",
      "x": 350, "y": 50,
      "wall": "top",
      "width": 80
    }
  ]
}
```

Why flat wins:
- **No nesting** means the LLM doesn't have to track parent-child relationships across tokens
- **Absolute coordinates** mean spatial errors don't cascade
- **Explicit element types** give the LLM clear, constrained output targets
- **Top-level aesthetics** (style, wobble) are set once, not per-element

LLM first-try success rate with this schema: **94% for Claude Sonnet**, **88% for GPT-4o**, **81% for Gemini 2.0 Flash**, **76% for Mistral Large**.

---

## The 14 Element Types

Skissify supports 14 spatial primitives:

| Type | Description |
|------|-------------|
| `room` | Rectangular room with optional label |
| `wall` | Standalone wall segment |
| `door` | Hinged or sliding door with wall + side |
| `window` | Window opening on a wall |
| `staircase` | Stair block with direction |
| `column` | Structural column |
| `dimension` | Dimension line between two points |
| `label` | Freestanding text annotation |
| `arrow` | Directional arrow |
| `circle` | Circle (equipment, table round, etc.) |
| `rectangle` | Generic rectangle |
| `line` | Single line segment |
| `polyline` | Multi-point connected lines |
| `symbol` | Named architectural symbols (sink, toilet, etc.) |

---

## LLM Benchmark: Full 8-Model Table

We tested 200+ floor plan generations across major models:

| Model | First-try Success | Notes |
|-------|------------------|-------|
| Claude Sonnet 4.6 | 94% | Best at room relationships |
| Claude Haiku | 89% | Excellent for simple layouts |
| GPT-4o | 88% | Consistent, minor coordinate errors |
| GPT-4o-mini | 79% | Good for speed-critical use |
| Gemini 2.0 Flash | 81% | Improving rapidly |
| Gemini 2.0 Pro | 85% | Best Google model |
| Mistral Large | 76% | Solid for European deployments |
| Llama 3.3 70B | 71% | Best open-source option |

"First-try success" = valid JSON that renders without errors on the first attempt.

---

## Integration: MCP (2 minutes)

Add Skissify to Claude Desktop in 2 minutes:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "@skissify/mcp-server"]
    }
  }
}
```

Then ask Claude: *"Design a 3-bedroom house with an open kitchen and draw it"*

Claude will:
1. Generate the floor plan schema
2. Call the `render_sketch` MCP tool automatically
3. Return a sketch URL you can share or embed

---

## Integration: REST API (5 lines)

```typescript
const response = await fetch('https://skissify.com/api/render', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
  body: JSON.stringify(sketchJSON)
});
const { url } = await response.json();
// url = 'https://skissify.com/s/abc123'
```

The returned URL is permanent, shareable, and inspectable — the underlying JSON is always accessible.

---

## Integration: LangGraph Agent

```python
from langchain_anthropic import ChatAnthropic
from langgraph.prebuilt import create_react_agent
import httpx

def render_floor_plan(sketch_json: dict) -> str:
    """Render a floor plan sketch and return the shareable URL."""
    response = httpx.post(
        "https://skissify.com/api/render",
        json=sketch_json,
        headers={"Authorization": f"Bearer {SKISSIFY_API_KEY}"}
    )
    return response.json()["url"]

tools = [render_floor_plan]
agent = create_react_agent(ChatAnthropic(model="claude-sonnet-4-6"), tools)

result = agent.invoke({
    "messages": [{"role": "user", "content": "Design a small 1-bedroom apartment and draw it"}]
})
```

---

## Integration: Mastra TypeScript Agent

```typescript
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

const renderSketchTool = createTool({
  id: "render_sketch",
  description: "Render a hand-drawn sketch from JSON and return a shareable URL",
  inputSchema: z.object({
    sketch: z.object({}).passthrough().describe("Skissify JSON schema")
  }),
  execute: async ({ context }) => {
    const response = await fetch("https://skissify.com/api/render", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.SKISSIFY_API_KEY}` },
      body: JSON.stringify(context.sketch)
    });
    const { url } = await response.json();
    return { sketchUrl: url };
  }
});
```

---

## The Optimal Prompt Template

The system prompt that produces the highest success rate:

```
You are working with the Skissify API. When asked to create a floor plan or sketch, 
output valid JSON matching this schema:

{
  "title": string,
  "width": number (400-1200),
  "height": number (300-900),
  "style": "napkin" | "blueprint" | "technical" | "rough",
  "elements": [{ "type": string, "x": number, "y": number, ... }]
}

Rules:
- Use absolute pixel coordinates (origin: top-left)
- Room widths typically 150-400px, heights 100-300px  
- Doors go on walls: include "wall" (top/right/bottom/left) and "side" (left/right)
- Add dimension lines for rooms larger than 200px in either direction
- Do not nest elements
- Output ONLY the JSON, no explanation
```

---

## 5 Copy-Paste Prompts That Work Today

**1. Studio apartment:**
```
Draw a studio apartment: open living/kitchen area 400x300, bedroom separated by a wall at x=400, bathroom 150x150 in corner. Blueprint style.
```

**2. Office floor plan:**
```
Create an open-plan office: main space 600x400, meeting room 200x200 top-right, small kitchen 150x150 bottom-right, reception 200x100 at entrance. Add dimensions.
```

**3. D&D dungeon room:**
```
Draw a dungeon room: 500x400 stone chamber, three exits (top center, right center, bottom-right), two pillars at coordinates 150,150 and 350,150. Blueprint/rough style.
```

**4. Garden layout:**
```
Design a garden: 600x500 space, house footprint 250x150 at bottom, patio 200x120 adjacent, lawn area, two garden beds 100x80 each. Napkin style.
```

**5. Retail store:**
```
Create a small retail store: 500x400 floor area, checkout counter 200x80 near entrance, changing rooms 100x100 at back, clothing racks as rectangles 80x40. Technical style.
```

---

## Why Sketch URLs Beat Screenshots

One pattern that emerged post-launch: agents using sketch URLs as persistent memory.

```python
# Store the sketch URL in agent memory
memory.add(f"Kitchen renovation plan: {sketch_url}")

# Later, retrieve and modify
agent.invoke({
    "messages": [{
        "role": "user", 
        "content": f"Based on this plan ({sketch_url}), add a bathroom next to the bedroom"
    }]
})
```

Because the sketch URL always returns the underlying JSON, it becomes a structured, inspectable, versionable artifact — not just an image. Agents can reference, modify, and build on previous sketches across conversation sessions.

---

## What's Coming

- **TypeScript SDK (@skissify/client)** — typed client, npm published, Week 2
- **Benchmark page** — official data at skissify.com/benchmark, Week 2
- **Framework integrations page** — Mastra, LangGraph, CrewAI, n8n code examples
- **Interactive playground** — no-signup JSON → render on homepage
- **Rotation support** — angled elements, Week 3
- **SVG export** — for precision workflows

---

*Skissify is live at [skissify.com](https://skissify.com). MCP server: `npm install -g @skissify/mcp-server`. API docs: skissify.com/docs.*
