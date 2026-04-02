# How AI Agents Can Draw Floor Plans: A Complete Workflow Guide

*Published: April 3, 2026 | 7-minute read*
*Tags: AI agents, MCP, floor plans, Claude, spatial reasoning, API, LangChain, n8n*

---

LLMs have had spatial reasoning since at least GPT-4. Ask any capable model to design a studio apartment and you'll get something coherent — traffic flow, clearances, room placement relative to windows, furniture that fits. The reasoning is real.

The problem was always the **output format**.

You'd describe a house to Claude and get a paragraph. Accurate, thoughtful — but a paragraph. You can't hand a paragraph to a contractor. You can't share it in a design review. You can't pass it to the next agent in a pipeline as a visual artifact.

AI agents could *think* spatially. They couldn't *draw* spatially. Until now.

---

## The Core Setup (3 lines)

```bash
# Option A: MCP server for Claude Desktop / Cursor / Windsurf
npx skissify-mcp

# Option B: Direct REST API — no auth, no account
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","tool":"pencil","elements":[
    {"type":"rect","x":0,"y":0,"width":200,"height":150,"label":"Living"},
    {"type":"rect","x":0,"y":150,"width":100,"height":100,"label":"Bedroom"},
    {"type":"door-symbol","x":80,"y":0,"width":60}
  ]}'
```

Result: a hand-drawn SVG floor plan with wobbly walls, door swing symbols, and room labels. Renderable in a browser, embeddable in a doc, shareable via URL.

---

## What the Manifest Looks Like

The JSON schema is designed to be LLM-readable — flat, explicit, minimal ambiguity:

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

The coordinate system is intentionally simple: x/y in abstract units, width/height for rooms, everything on the same flat plane. Claude generates accurate manifests from natural language descriptions with very high reliability.

---

## Five Real Workflows

### 1. Claude Desktop + MCP (Zero-Code Setup)

After running `npx skissify-mcp` and adding the config snippet to `claude_desktop_config.json`, you can say:

> "Draw a two-bedroom apartment. Open-plan kitchen and living room on the south side. Two bedrooms on the north. One bathroom between them. Include the front door."

Claude calls the `skissify_render` tool, constructs a complete manifest, and returns a hand-drawn SVG with a shareable URL. The entire process takes under 10 seconds.

This is the fastest path to spatial output for anyone already using Claude Desktop.

### 2. LangChain / Python Agent

```python
from langchain.tools import StructuredTool
import requests, json

def render_floor_plan(manifest: dict) -> str:
    resp = requests.post(
        "https://skissify.com/api/render",
        json=manifest,
        headers={"Content-Type": "application/json"}
    )
    return resp.json().get("url", "")

skissify_tool = StructuredTool.from_function(
    func=render_floor_plan,
    name="render_floor_plan",
    description="Render a JSON floor plan manifest to a hand-drawn SVG. Returns a shareable URL."
)

agent = initialize_agent(
    tools=[skissify_tool],
    llm=ChatOpenAI(model="gpt-4o"),
    agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION
)

result = agent.run("Design a coworking space with 6 desks, a meeting room, and a kitchen area")
# → Returns a URL to a hand-drawn coworking layout
```

### 3. CrewAI Multi-Agent Pipeline

In a property listing pipeline: one agent extracts spatial data from listing descriptions, a second agent builds the floor plan manifest, a third agent calls Skissify and returns the sketch URL to the listing page. The sketch becomes an artifact that flows downstream — embeddable in HTML, passable to the next agent as context.

```python
from crewai import Agent, Task, Crew

architect_agent = Agent(
    role="Floor Plan Architect",
    goal="Convert room descriptions into Skissify JSON manifests",
    tools=[skissify_render_tool]
)

task = Task(
    description="Generate a floor plan for: {property_description}",
    agent=architect_agent
)
```

### 4. n8n / Make Automation

A homeowner describes their renovation via a chatbot form. The n8n workflow:
1. Webhook receives form submission
2. OpenAI node parses room descriptions → JSON manifest
3. HTTP Request node POSTs to `skissify.com/api/render`
4. Email/Slack node sends the sketch URL to the homeowner and contractor

No code. No SDK. The free API tier handles the volume of a typical renovation consultancy.

### 5. Mastra / TypeScript Agent Pipelines

```typescript
import { createSkissifyTool } from 'skissify-mastra';

const floorPlanTool = createSkissifyTool({
  // No API key needed for free tier
});

agent.addTool(floorPlanTool);
// → Agent can now respond to "draw me a layout" with an actual sketch URL
```

---

## The Local / Air-Gapped Stack

For teams that can't send data to external APIs:

```bash
git clone https://github.com/skissify/skissify
docker compose up
# → Available at http://localhost:3000/api/render
```

Pair with Ollama + Llama 3 for a fully local, air-gapped floor plan pipeline. Zero external API calls. Natural language description → hand-drawn sketch, entirely on-premises.

---

## What You Get Back

The response is a clean SVG — scalable, embeddable, shareable:

- **Architectural symbols**: door swings, window glyphs, stairs — rendered correctly
- **Hand-drawn text**: uses Caveat (Google Fonts) for authentic sketched labels
- **Seeded wobble**: same JSON always produces the same sketch (deterministic output)
- **Embeddable anywhere**: `<img>` tags, Notion, Confluence, Slack unfurl, any HTML

The sketch URL is permanent. You can paste it into a PR description, a Notion doc, a project management ticket, or pass it to the next agent in the pipeline as a visual memory artifact.

---

## Prompt Engineering Tips for LLMs

Getting high-quality manifests from LLMs is straightforward, but a few patterns help:

1. **Give explicit room dimensions in relative units**: "Living room 300x200, bedroom 150x150" is easier for the model than "a large living room"
2. **Specify connectivity**: "Bedroom shares the east wall with the bathroom" gives the model geometric constraints to work with
3. **Name the paper and tool**: `"paper":"cream","tool":"ballpoint"` for daytime work sketches; `"paper":"blueprint"` for technical drawings
4. **Ask for door symbols explicitly**: Models sometimes omit them unless reminded — add "include front door and bedroom door" to your prompt

---

## Why This Matters Beyond Floor Plans

The same pattern works for any spatial output:

- **System architecture diagrams**: services as rooms, APIs as connections
- **Org charts**: teams as boxes, reporting lines as arrows
- **Network topology**: nodes and edges with hand-drawn aesthetic
- **UI wireframes**: containers and content zones without triggering the polish-response
- **D&D dungeon maps**: rooms, corridors, secret passages in blueprint style

The floor plan use case is obvious because spatial reasoning about rooms is something every LLM does well and every human understands immediately. But the primitive is general: JSON in, hand-drawn SVG out, shareable URL.

---

## Get Started

```bash
# MCP (Claude Desktop, Cursor, Windsurf)
npx skissify-mcp

# REST API — no auth, free tier
POST https://skissify.com/api/render
Content-Type: application/json
```

Documentation: [skissify.com/for-agents](https://skissify.com/for-agents)

*Skissify launched April 1, 2026. Built in Stockholm. Free tier is unlimited — no auth required. The gap between "AI that thinks spatially" and "AI that draws spatially" is now closed.*
