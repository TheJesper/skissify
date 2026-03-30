# How AI Agents Draw Floor Plans: The Show HN Launch Day Guide

*Launching on HN tomorrow. This is the sharpest version of this post I've written.*

---

I've written seventeen versions of this post. This is the last one before Show HN.

Let me be direct.

## The Problem

AI agents are great at text. They're good at code. They're increasingly capable of reasoning about spatial layouts.

But when you ask Claude "sketch a floor plan for a 2-bedroom apartment," you get back... text. A list of rooms. Maybe a Mermaid diagram if you're lucky. Nothing you can look at and immediately react to.

That's the gap Skissify fills.

## The Mechanism

Skissify exposes a JSON-to-sketch API. You give it a flat list of elements with coordinates. It gives back a sketch URL — a hand-drawn-style visual that renders in any browser.

The JSON is intentionally simple:

```json
{
  "elements": [
    { "id": "living", "type": "room", "x": 0, "y": 0, "width": 400, "height": 300, "label": "Living Room" },
    { "id": "kitchen", "type": "room", "x": 400, "y": 0, "width": 200, "height": 300, "label": "Kitchen" },
    { "id": "bed1", "type": "room", "x": 0, "y": 300, "width": 300, "height": 300, "label": "Bedroom 1" },
    { "id": "bed2", "type": "room", "x": 300, "y": 300, "width": 300, "height": 300, "label": "Bedroom 2" },
    { "id": "bath", "type": "room", "x": 0, "y": 600, "width": 200, "height": 200, "label": "Bathroom" }
  ],
  "style": "blueprint"
}
```

That gets back a sketch URL. The agent embeds it in its response, or stores it as persistent spatial memory.

## Why Flat JSON (The Schema Insight)

This matters for agent builders: flat JSON gets 94% first-try LLM generation accuracy. Hierarchical (nested rooms, parent-child) gets ~60%.

The reason is sequential token generation. LLMs generate tokens left to right. Nested schemas require the model to track depth and parent context while generating. Flat schemas don't. Every element is independent.

The "correct" data model for humans (hierarchical) is the wrong model for LLMs. The "incorrect" model (flat list with absolute coordinates) is the right one for sequential generation.

That was the most surprising thing I learned building Skissify.

## The MCP Path (Two Lines of Config)

Install:
```bash
npm install -g @skissify/mcp-server
```

Claude Desktop config:
```json
{
  "mcpServers": {
    "skissify": {
      "command": "skissify-mcp",
      "args": []
    }
  }
}
```

That's it. Claude can now draw anything you ask it to.

## Real Agent Workflows

**Workflow 1: The Homeowner Brief**
User → Claude → "Plan a kitchen renovation with island and breakfast nook" → Skissify sketch → User reviews → "Move the island left" → Updated sketch

**Workflow 2: The Architecture Review**
LangGraph agent → Floor plan requirements from spec doc → Skissify sketch URL → Human approval node → Continue pipeline

**Workflow 3: The D&D Campaign Map**
System prompt: "You are a dungeon master assistant. Generate room sketches for encounters." → Skissify endpoint → Persistent campaign map URLs

**Workflow 4: The PM Sketch**
Product manager describes feature to Claude → Agent generates UI wireframe JSON → Skissify renders it → PM shares sketch URL in Slack for team feedback

## What Makes a Good Floor Plan Prompt

Ask Claude to think room-by-room, in reading order (top-left → right → next row). Give it constraints: "no room smaller than 10x10 feet," "total under 1500 sq ft," "open kitchen-living area."

Constraints improve accuracy. The model knows when it's violating them.

## The Bigger Picture

The MCP ecosystem has 12,000+ servers as of March 2026. Every major AI platform has adopted it. OpenAI, Anthropic, Microsoft, Google.

None of them produced visual output before Skissify.

Text in, text out. That was the limit.

Skissify is text in, *sketch* out. It's a small change with a large surface area. Because humans think spatially. We always have.

---

*Skissify launches on Show HN Tuesday March 31, 2026 at 09:00 CET.*
*[skissify.com](https://skissify.com) | MCP: `npm install -g @skissify/mcp-server`*
