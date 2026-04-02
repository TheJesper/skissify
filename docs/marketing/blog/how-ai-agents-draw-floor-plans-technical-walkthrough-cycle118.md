# How AI Agents Draw Floor Plans: A Complete Technical Walkthrough

*Published: April 2026 | 6 min read | Developer tutorial*

---

Before Skissify, AI agents could describe a floor plan with impressive accuracy.

*"A 4-room apartment with an open-plan kitchen, two bedrooms facing south, and a bathroom off the hallway."*

Accurate. Useful. Completely unusable for a contractor or a downstream agent that needs spatial data.

This tutorial walks through exactly how to get Claude, GPT-4o, or any LLM to *draw* that floor plan — step by step.

---

## The Architecture

```
User prompt
    ↓
LLM (Claude / GPT-4o / etc.)
    ↓ generates flat JSON manifest
Skissify API (https://skissify.com/api/render)
    ↓ renders hand-drawn SVG
Browser / Agent output / Shareable URL
```

Three layers. No custom ML. No image generation. Deterministic SVG output.

---

## Step 1: Install the MCP Server (Claude Desktop / Cursor)

```bash
npx skissify-mcp
```

Add to your Claude Desktop config:

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

Restart Claude Desktop. The `draw_sketch` tool is now available.

---

## Step 2: The Prompt That Works

The key insight: **you need to tell the LLM to think in coordinates, not prose**.

This prompt consistently produces accurate floor plan output:

```
Draw a simple 2-bedroom apartment floor plan using Skissify.

Use these coordinate rules:
- Canvas is 600×400 units
- Exterior walls: outer rectangle from (0,0) to (600,400)
- All rooms must share walls (no gaps)
- Label every room clearly
- Add door symbols (type: "door-symbol") on room boundaries
- Use paper: "cream", tool: "pencil"

Rooms: Living Room (large, ~220×180), Kitchen (open to living room, ~180×140),
Bedroom 1 (~200×160, southeast corner), Bedroom 2 (~180×160, northeast corner),
Bathroom (~100×80, adjacent to bedrooms)
```

---

## Step 3: The JSON Schema (Why Flat Matters)

Claude will generate something like this:

```json
{
  "paper": "cream",
  "tool": "pencil",
  "amplitude": 2,
  "elements": [
    {"type": "rect", "x": 0, "y": 0, "w": 600, "h": 400, "label": "Apartment"},
    {"type": "rect", "x": 0, "y": 0, "w": 220, "h": 220, "label": "Living Room"},
    {"type": "rect", "x": 220, "y": 0, "w": 180, "h": 160, "label": "Kitchen"},
    {"type": "rect", "x": 400, "y": 0, "w": 200, "h": 200, "label": "Bedroom 1"},
    {"type": "rect", "x": 400, "y": 200, "w": 200, "h": 200, "label": "Bedroom 2"},
    {"type": "rect", "x": 300, "y": 300, "w": 100, "h": 100, "label": "Bathroom"},
    {"type": "door-symbol", "x": 100, "y": 220, "w": 60},
    {"type": "door-symbol", "x": 400, "y": 80, "w": 60},
    {"type": "door-symbol", "x": 450, "y": 200, "w": 60}
  ]
}
```

**Why flat JSON?** We tested multiple schema designs:

| Schema type | LLM first-try accuracy |
|-------------|----------------------|
| Flat (no nesting) | ~94% |
| Nested rooms with children | ~61% |
| Hierarchical with relationships | ~40% |

Flat wins because it matches LLM training data patterns. LLMs generate arrays naturally — they struggle with deep nesting without explicit reasoning steps.

---

## Step 4: Call the API Directly

No MCP needed — you can call the Skissify API directly from any agent:

```python
import httpx
import json

def draw_floor_plan(manifest: dict) -> str:
    """Returns shareable sketch URL"""
    response = httpx.post(
        "https://skissify.com/api/render",
        json=manifest,
        headers={"Content-Type": "application/json"}
    )
    result = response.json()
    return result["url"]  # shareable, permanent URL

# Use in your agent workflow
sketch_url = draw_floor_plan(manifest)
print(f"Floor plan: {sketch_url}")
```

```typescript
// TypeScript / Node.js
async function drawFloorPlan(manifest: object): Promise<string> {
  const response = await fetch("https://skissify.com/api/render", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(manifest),
  });
  const { url } = await response.json();
  return url;
}
```

Average response time: **~150ms**. No auth. No account required.

---

## Step 5: Using it in a Multi-Agent Pipeline

The shareable URL is the key feature for multi-agent workflows. It's a permanent, public link to the sketch — pass it between agents as a string.

```python
# Agent A: generates the floor plan
sketch_url = draw_floor_plan(manifest)

# Agent B: uses the URL in a report
report = f"""
## Renovation Proposal

Client brief: 2BR apartment, modern kitchen, open plan living.

Proposed layout: {sketch_url}

Key decisions:
- Open kitchen/living shares the north wall
- Both bedrooms have southern exposure
- Bathroom positioned centrally for plumbing efficiency
"""
```

The downstream agent doesn't need to know anything about Skissify — it just receives a URL.

---

## Common Issues and Fixes

**LLM generates overlapping rooms**
→ Add explicit constraint: "No two rooms may share the same coordinate space. Check for overlap before finalizing."

**Door symbols not on walls**
→ Add constraint: "Door symbols must be positioned exactly on a room boundary (matching x or y coordinate of a wall)."

**Rooms don't fill the canvas**
→ Add constraint: "Total room area must equal canvas area. Rooms must tile without gaps."

**Output is too complex**
→ Reduce element count. Start with 4-5 rooms max, then iterate.

---

## What You Can Build

- **Real estate tools**: Generate floor plans from property descriptions
- **Renovation planners**: "What if we knocked down this wall?" → visualize immediately
- **Architecture student tools**: Quick sketches for critique sessions
- **D&D/TTRPG**: Claude draws dungeon maps from encounter descriptions
- **UI wireframes**: Rough screen layouts for stakeholder alignment

---

## Try It Now

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper":"cream","tool":"pencil","amplitude":2,
    "elements":[
      {"type":"rect","x":0,"y":0,"w":300,"h":200,"label":"Living Room"},
      {"type":"rect","x":300,"y":0,"w":200,"h":200,"label":"Kitchen"},
      {"type":"door-symbol","x":140,"y":200,"w":60}
    ]
  }'
```

→ Returns a hand-drawn SVG + shareable URL in ~150ms.

**Full docs:** skissify.com/for-agents
**MCP server:** `npx skissify-mcp`
**Free tier:** Unlimited renders, no login

---

*Tags: #AIAgents #MCP #FloorPlan #LLM #Tutorial #Claude #BuildInPublic*
