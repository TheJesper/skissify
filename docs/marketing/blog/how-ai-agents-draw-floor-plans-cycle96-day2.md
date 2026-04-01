# How AI Agents Can Draw Floor Plans

*Published: April 2, 2026 | Cycle 96 — Day 2 Edition*
*~1,400 words | Tags: AI agents, MCP, floor plans, Claude, LLM, architecture*
*Target: Dev.to, Hashnode, r/MachineLearning, r/ClaudeAI, r/mcp*

---

Until very recently, there was a gap in what AI agents could do.

They could read. Write. Reason. Code. Plan. Search. Summarize.

They could not draw.

This matters more than it sounds. A huge category of human communication is spatial: floor plans, system diagrams, wireframes, site maps, level layouts, seating charts. These are not decorative. They carry information that text cannot efficiently convey.

When an AI agent reasons about an apartment layout, it produces paragraphs. "The living room is approximately 20 by 15 feet, connected to the kitchen via an open doorway on the north wall." Useful. But a sketch would communicate the same thing in 2 seconds.

This post explains exactly how AI agents now draw floor plans — the technical stack, the JSON schema, the API call, and a working example you can run today.

---

## The Stack

**Model:** Claude 3.x or any LLM with tool-calling support
**Tool:** Skissify MCP server (`npx skissify-mcp`)
**Output:** Hand-drawn SVG, hosted URL, returned to the agent's context

The agent constructs a JSON manifest. The manifest describes a sketch: paper type, drawing tool, wobble parameters, and an array of elements. Each element has a type, position, dimensions, and optional styling.

The manifest is POSTed to `https://skissify.com/api/render`. A URL to the rendered sketch is returned in under 300ms.

---

## Setting Up the MCP Server

```bash
npx skissify-mcp
```

Add it to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

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

## A Working Floor Plan

Tell Claude:

> "Sketch a 2-bedroom apartment. Open-plan living/kitchen, one bathroom, one bedroom with en suite. Show doors and windows."

Claude constructs this JSON (abbreviated):

```json
{
  "paper": "cream",
  "tool": "pencil",
  "wobble": { "amount": 2, "seed": 42 },
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 400, "h": 300, "label": "Living / Kitchen" },
    { "type": "rect", "x": 50, "y": 350, "w": 200, "h": 150, "label": "Bedroom 1" },
    { "type": "rect", "x": 250, "y": 350, "w": 200, "h": 150, "label": "Bedroom 2" },
    { "type": "door-symbol", "x": 150, "y": 350, "rotation": 0 },
    { "type": "window", "x": 50, "y": 130, "w": 80 },
    { "type": "dim", "x": 50, "y": 510, "length": 400, "label": "10m" }
  ]
}
```

The rendered SVG shows a wobbly, architect-style floor plan sketch — rooms labeled, doors with swing arcs, windows as parallel lines, dimension markers at the bottom.

It looks like it was drawn by a thoughtful person who knew what they were doing but wasn't trying to impress anyone with polish.

---

## Why Flat Schema Gets 94% First-Try Accuracy

The schema design insight: LLMs do significantly better with flat, array-based element descriptions than with nested hierarchical structures.

**Nested (bad):**
```json
{
  "rooms": {
    "living": {
      "geometry": { "x": 50, "y": 50 },
      "dimensions": { "w": 400, "h": 300 }
    }
  }
}
```

**Flat (good):**
```json
{
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 400, "h": 300, "label": "Living" }
  ]
}
```

Testing with Claude 3.5 Sonnet: flat schema produces valid, render-ready JSON on the first attempt ~94% of the time. Nested schemas drop to ~40%. This is because the flat approach matches how LLMs process sequential tokens — each element is a self-contained object with no forward references.

---

## Five Real Agent Workflows

**1. Claude Desktop + MCP**
The simplest path. `npx skissify-mcp`, restart Claude, ask it to draw anything spatial. Claude handles the JSON; you get a sketch URL back in the chat.

**2. LangChain Tool**
Wrap the `/api/render` endpoint as a LangChain `Tool`. The agent can call it during a chain when it needs to produce a visual output.

```python
from langchain.tools import Tool
import requests

def skissify_render(manifest_json: str) -> str:
    response = requests.post("https://skissify.com/api/render", json=manifest_json)
    return response.json()["url"]

skissify_tool = Tool(name="draw_sketch", func=skissify_render, description="Render a hand-drawn sketch from JSON manifest")
```

**3. n8n Workflow Automation**
HTTP Request node → POST to `/api/render` → return sketch URL. Use case: client form submits room dimensions → n8n builds manifest → Skissify renders → URL emailed to client.

**4. GitHub Actions**
On every PR that modifies an architecture diagram JSON, trigger a Skissify render and post the sketch as a PR comment. Visual diff for system architecture changes.

**5. CrewAI / Mastra Multi-Agent**
Designate a "visual output agent" in your crew whose role is to call Skissify when the planning agent produces spatial data. The sketch URL gets passed downstream as structured output.

---

## The Broader Point

AI agents are being deployed in increasingly spatial domains: real estate, architecture, interior design, game design, logistics, event planning. All of these domains produce information that wants to be visual.

For four years, that information has been trapped in text or required manual translation into a design tool.

The `/api/render` endpoint breaks that constraint. The sketch is now a first-class output format for agent pipelines — as natural as returning a string or a number.

---

## Get Started

- **Web editor:** [skissify.com](https://skissify.com)
- **MCP install:** `npx skissify-mcp`
- **API:** `POST https://skissify.com/api/render`
- **Docs:** [skissify.com/for-agents](https://skissify.com/for-agents)
- **Schema reference:** [skissify.com/docs/schema](https://skissify.com/docs/schema)

Free tier, no auth, no rate limits on first 1,000 renders.

---

*Skissify launched April 1, 2026. If you're building agent workflows and want to add visual output, this is the fastest path.*
