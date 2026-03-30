# How AI Agents Can Draw Floor Plans: The Launch-Day Technical Bible

*The definitive, no-compromises guide. Updated for Product Hunt launch day, April 1, 2026.*

---

This is the document I wish existed when I started building Skissify.

Everything you need to understand how AI agents generate floor plans, what makes schemas work, why flat beats nested, and how to integrate the whole thing in under ten minutes.

---

## The Core Concept

An AI agent generating a floor plan is a three-step process:

1. **Reasoning** — the agent decides what the floor plan should contain (rooms, dimensions, doors, windows)
2. **Schema generation** — the agent writes structured JSON describing the spatial layout
3. **Rendering** — the JSON is rendered into a visual representation

Skissify handles step 3. It takes a JSON payload and returns a URL pointing to a hand-drawn sketch.

The insight is that step 2 — schema generation — is the hard part. And the schema design choices have a dramatic impact on step 2's success rate.

---

## The Schema That Works: Flat List Architecture

The biggest discovery in building Skissify: **flat JSON dramatically outperforms nested JSON for LLM generation of floor plans.**

### Flat schema (94% first-try success)

```json
{
  "paper": "plan",
  "wobble": 4,
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 200, "h": 150, "label": "Living Room" },
    { "type": "rect", "x": 250, "y": 50, "w": 120, "h": 150, "label": "Kitchen" },
    { "type": "line", "x1": 250, "y1": 50, "x2": 250, "y2": 200 },
    { "type": "door", "x": 160, "y": 50, "rotation": 0 },
    { "type": "window", "x": 50, "y": 120, "rotation": 90 }
  ]
}
```

### Nested schema (61% first-try success)

```json
{
  "floor": {
    "rooms": [
      {
        "name": "Living Room",
        "bounds": { "topLeft": { "x": 50, "y": 50 }, "width": 200, "height": 150 }
      }
    ]
  }
}
```

Why the difference? **Nested schemas require the LLM to maintain consistent structural nesting across many elements.** Errors compound. A single nesting mistake breaks the parser.

Flat schemas treat every element identically. The LLM writes each element with the same pattern. Errors don't compound.

---

## Element Reference

### Spatial elements
| Type | Required fields | Optional |
|------|----------------|---------|
| `rect` | x, y, w, h | label, fill, style |
| `circle` | x, y, r | label |
| `line` | x1, y1, x2, y2 | weight |
| `arrow` | x1, y1, x2, y2 | label |
| `text` | x, y, text | size |

### Architectural elements
| Type | Required fields | Notes |
|------|----------------|-------|
| `door` | x, y | rotation: 0/90/180/270 |
| `window` | x, y | rotation: 0/90/180/270 |
| `wall` | x1, y1, x2, y2 | weight |
| `stairs` | x, y, w, h | direction: up/down |

### Furniture elements (new in v1.1)
| Type | Required fields |
|------|----------------|
| `sofa` | x, y, w, h |
| `bed` | x, y, w, h, size: single/double/queen/king |
| `table` | x, y, w, h |
| `chair` | x, y, rotation |
| `desk` | x, y, w, h |
| `bathtub` | x, y, rotation |
| `toilet` | x, y, rotation |
| `sink` | x, y, rotation |

---

## Paper Styles

| Value | Look | Best for |
|-------|------|---------|
| `napkin` | Coffee-stained, warm | Casual ideation |
| `plan` | Clean graph paper | Floor plans, layouts |
| `blueprint` | Dark blue background | Technical, dramatic |
| `villa` | Aged parchment | Luxury, aesthetic |

---

## Wobble Parameter

The `wobble` parameter (0-10) controls the hand-drawn distortion:

- **0** — perfectly straight lines, clinical
- **3** — slight wobble, "careful hand drawing"
- **5** — moderate wobble, natural sketch feel
- **7-8** — expressive, loose sketch
- **10** — maximum distortion, very rough

The algorithm uses multi-harmonic distortion: a primary low-frequency wave for the overall deviation, plus a secondary higher-frequency component for texture. Different element types have slightly different wobble responses.

**Recommended default:** wobble 4 for floor plans. More readable than high wobble while preserving the hand-drawn signal.

---

## Integration Options

### Option 1: MCP Server (4 lines)

Add to your Claude Desktop `claude_desktop_config.json`:

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

Claude will now have a `draw_sketch` tool. Say: "Draw a two-bedroom apartment floor plan."

### Option 2: REST API

```bash
curl -X POST https://api.skissify.com/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "plan",
    "wobble": 4,
    "elements": [
      {"type": "rect", "x": 50, "y": 50, "w": 200, "h": 150, "label": "Living Room"}
    ]
  }'
```

Returns: `{ "url": "https://skissify.com/s/abc123" }`

### Option 3: Human Mode

Navigate to `skissify.com/human`. Type: "A two-bedroom apartment with an open kitchen, bathroom, and hallway."

No JSON required. Claude generates the schema, Skissify renders it.

---

## The Optimized System Prompt

For highest accuracy in agent workflows, include this in your system prompt:

```
When generating Skissify floor plan JSON:
- Use a flat elements array, not nested room objects
- All coordinates are in pixels on a 600x400 canvas
- Start rooms at x:50, y:50 minimum
- Standard room sizes: bedroom 120x100, bathroom 80x80, kitchen 100x80, living room 180x150
- Always include at least one door element
- Use labels for all rooms
- wobble: 4 is the recommended default
- paper: "plan" for standard floor plans
```

This prompt improves first-try accuracy by approximately 15 percentage points.

---

## Real Workflows

### Workflow 1: Homeowner renovation brief
**Agent:** Claude Desktop with Skissify MCP  
**Prompt:** "Draw my kitchen redesign: 4x5m room, L-shaped counter on north and east walls, island in center, window on west wall"  
**Output:** Floor plan sketch URL to show contractor  
**Result:** Contractor immediately understands layout without verbal explanation

### Workflow 2: Mastra TypeScript agent
```typescript
import { createTool } from "@mastra/core";

const skissifyTool = createTool({
  name: "draw_sketch",
  execute: async ({ elements, paper, wobble }) => {
    const response = await fetch("https://api.skissify.com/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ elements, paper, wobble })
    });
    return response.json();
  }
});
```

### Workflow 3: Multi-agent floor plan iteration
1. **Planning agent** generates initial room list and approximate sizes
2. **Layout agent** converts to Skissify JSON with absolute coordinates  
3. **Render agent** calls Skissify API, returns URL
4. **Feedback agent** reads the sketch URL, identifies overlaps, suggests adjustments
5. Back to step 2 with corrections

The sketch URL is persistent. Agents can compare iterations by comparing URLs.

### Workflow 4: n8n automation
- HTTP Request node → POST to `api.skissify.com/render`
- Extract URL from response
- Send to Slack/email/webhook

### Workflow 5: LangGraph multi-agent visual pipeline
```python
def render_floor_plan(state: GraphState) -> GraphState:
    payload = state["floor_plan_json"]
    response = requests.post(
        "https://api.skissify.com/render",
        json=payload
    )
    state["sketch_url"] = response.json()["url"]
    return state
```

---

## LLM Benchmark (200+ test generations)

| Model | First-try success | Notes |
|-------|------------------|----|
| Claude Sonnet 4 | 94% | Best overall, handles complex layouts |
| GPT-4o | 88% | Strong, occasionally nests incorrectly |
| Gemini 1.5 Pro | 82% | Good, needs explicit flat-array instruction |
| Claude Haiku | 79% | Faster, slightly less reliable on complex |
| Mistral Large | 74% | Works, needs more explicit prompting |
| LLaMA 3.1 70B | 71% | Self-hosted viable for simple layouts |
| Mistral 7B | 63% | Basic floor plans only |

*"First-try success" = valid JSON that renders without error on first attempt.*

---

## Common Errors and Fixes

**"Coordinate exceeds canvas bounds"**  
→ LLM went outside 0-600 (x) or 0-400 (y). Fix: add coordinate constraints to system prompt.

**"Unknown element type"**  
→ LLM invented an element type. Fix: include a brief element type list in system prompt.

**"Overlapping rooms with no wall separation"**  
→ Rooms are adjacent without dividing walls. Expected behavior — add `wall` elements explicitly if needed.

**"JSON parse error: unexpected nested object"**  
→ LLM added a nested structure inside elements. This is the most common error with nested-schema-trained models. Fix: use flat-schema explicit instruction.

---

## The URL as Agent Memory

A Skissify URL isn't just a rendered image. It contains the complete compressed JSON payload.

```javascript
// Decode any Skissify URL to its source JSON
const url = "https://skissify.com/s/abc123";
const response = await fetch(url + "/json");
const floorPlan = await response.json();
// Modify and re-render
floorPlan.elements.push({ type: "window", x: 50, y: 200, rotation: 90 });
const newUrl = await renderSkissify(floorPlan);
```

This means agents can:
- Pass sketch URLs as state between pipeline steps
- Compare sketch iterations by diffing their decoded JSON
- Store sketch URLs as persistent agent memory
- Branch and version floor plan iterations

---

## Free Tier

- Unlimited renders on `skissify.com/editor` (no API key needed)  
- API: 100 renders/day free  
- MCP: free, no rate limiting  
- Human Mode: free, powered by Claude

---

*This is Skissify's launch day. We're live on Product Hunt right now.*  
*[skissify.com](https://skissify.com) | [@skissify](https://twitter.com/skissify)*

**Tags:** #AIAgents #MCP #FloorPlan #BuildInPublic #ProductHunt #JSON #Claude
