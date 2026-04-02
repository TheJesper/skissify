# How AI Agents Can Draw Floor Plans (Show HN Edition)

*April 3, 2026 — Cycle 116. Written for Show HN day. Cross-post to Dev.to, r/AIAgents, LangChain Discord.*

---

This is the complete technical walkthrough for connecting an AI agent to a visual rendering layer. After 200+ test runs generating floor plans with Claude, here's what actually works.

---

## The Problem in One Sentence

AI agents can reason about spatial layouts in natural language, but they have no native way to render those layouts visually — until now.

---

## The Architecture

```
User prompt
    ↓
LLM (Claude, GPT-4, Gemini, etc.)
    ↓ (generates JSON manifest)
Skissify MCP tool: render_sketch()
    ↓ (calls POST /api/render)
Skissify rendering engine
    ↓
Shareable sketch URL
    ↑
Agent returns URL to user
```

Three layers. The middle one is the key insight: the agent doesn't need to understand *how* to draw. It only needs to understand the JSON schema for spatial elements (rectangles, doors, windows, arrows, text). The rendering is fully delegated.

---

## Setting Up in Claude Desktop (5 Minutes)

**Step 1: Install the MCP server**

```bash
npx skissify-mcp
```

Or add to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "skissify-mcp"]
    }
  }
}
```

**Step 2: Restart Claude Desktop**

**Step 3: Ask it to draw something**

```
Design a 2-bedroom apartment, ~70sqm, open plan kitchen/living,
master bedroom with ensuite, one smaller bedroom, entry hall.
Draw it as a floor plan.
```

Claude will:
1. Plan the spatial layout
2. Generate the JSON manifest
3. Call `render_sketch()` via MCP
4. Return a shareable URL like `https://skissify.com/s/abc123`

---

## The JSON Schema (What the Agent Generates)

This is the schema Claude learns to produce. It's intentionally flat — no nested hierarchies:

```json
{
  "title": "2-Bedroom Apartment",
  "paper": "cream",
  "width": 800,
  "height": 600,
  "wobble": 7,
  "humanness": 5,
  "elements": [
    {
      "type": "rect",
      "x": 50, "y": 50,
      "w": 300, "h": 200,
      "label": "Living / Kitchen"
    },
    {
      "type": "rect",
      "x": 370, "y": 50,
      "w": 180, "h": 180,
      "label": "Master Bedroom"
    },
    {
      "type": "rect",
      "x": 370, "y": 250,
      "w": 180, "h": 120,
      "label": "Ensuite"
    },
    {
      "type": "rect",
      "x": 50, "y": 270,
      "w": 140, "h": 150,
      "label": "Bedroom 2"
    },
    {
      "type": "rect",
      "x": 200, "y": 270,
      "w": 150, "h": 100,
      "label": "Entry Hall"
    },
    {
      "type": "door-symbol",
      "x": 215, "y": 270,
      "width": 70,
      "direction": "down"
    },
    {
      "type": "window",
      "x": 100, "y": 50,
      "width": 80,
      "wall": "top"
    },
    {
      "type": "window",
      "x": 420, "y": 50,
      "width": 80,
      "wall": "top"
    }
  ]
}
```

---

## Why Flat JSON Outperforms Hierarchical JSON

This was the key design insight. Early versions of the schema used nested room-to-element hierarchy:

```json
{
  "rooms": [
    {
      "name": "Living Room",
      "elements": [{"type": "rect", ...}, {"type": "window", ...}]
    }
  ]
}
```

**First-attempt success rate with hierarchical schema: 58%**

The problem: the LLM has to reason about spatial coordinates AND hierarchy simultaneously. It fails on coordinate calculations because cognitive load is split.

Flat schema puts all elements in a single array. The LLM reasons about positions directly.

**First-attempt success rate with flat schema: 88–92%**

That's the insight worth the whole article.

---

## 14 Element Types

Skissify supports 14 element types, including architectural primitives:

| Type | Use case |
|------|----------|
| `rect` | Rooms, areas, components |
| `line` | Walls, dividers |
| `circle` | Columns, points of interest |
| `arc` | Door swing indicators |
| `arrow` | Flow, connections, direction |
| `text` | Labels, annotations |
| `dashed` | Boundaries, service areas |
| `dim` | Dimension lines with measurements |
| `window` | Window openings in walls |
| `door-symbol` | Hinged door with swing arc |
| `door-slide` | Sliding door |
| `stair` | Stair/step indicator |
| `opening` | Openings without door |
| `column` | Structural columns |

---

## REST API (No MCP Required)

If you're not using MCP, the REST API is equally simple:

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d @floor-plan.json
```

Returns:
```json
{
  "url": "https://skissify.com/s/abc123",
  "svgDataUrl": "data:image/svg+xml;base64,...",
  "success": true
}
```

No authentication. No API key. Free tier includes public sketches.

---

## Use in LangChain, CrewAI, AutoGen

Any agent framework can call the REST API directly:

**LangChain tool:**
```python
from langchain.tools import Tool
import requests

def render_sketch(json_manifest: str) -> str:
    """Render a hand-drawn sketch from a JSON manifest."""
    response = requests.post(
        "https://skissify.com/api/render",
        json=json.loads(json_manifest),
        headers={"Content-Type": "application/json"}
    )
    return response.json().get("url", "Render failed")

skissify_tool = Tool(
    name="render_sketch",
    description="Render a spatial layout as a hand-drawn sketch. Input: JSON manifest string.",
    func=render_sketch
)
```

**n8n:** HTTP Request node → POST to `https://skissify.com/api/render` → extract `.url` → pass to email/Notion/Slack node.

---

## What the Output Looks Like

The hand-drawn aesthetic isn't cosmetic. It signals: *this is a draft*.

Clean vector output from agents looks finished. Stakeholders treat finished-looking output as decided — they optimize details instead of questioning structure.

Wobbly lines say: *"this is a conversation starter, not a spec."* That distinction changes the entire feedback dynamic.

---

## Getting Started

- **Demo:** [skissify.com](https://skissify.com)
- **MCP install:** `npx skissify-mcp`
- **API:** `POST https://skissify.com/api/render` — no auth, free
- **Docs:** [skissify.com/docs](https://skissify.com/docs)

---

*Questions, integrations, feedback: comment below or find me on HN today.*
