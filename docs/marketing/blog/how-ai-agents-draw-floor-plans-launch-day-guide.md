# How AI Agents Can Draw Floor Plans: The Launch-Day Guide

*Published: March 30, 2026 — Show HN tomorrow*

---

A year ago, AI agents could write code, search the web, send emails, and call APIs. There was one conspicuous gap: they couldn't draw.

Not "draw" as in generate an image. Plenty of tools do that. Draw as in: produce a structured, spatial, editable, shareable **sketch** that preserves the semantic meaning of the layout.

Floor plans, diagrams, wireframes, maps. The kind of thing humans draw on napkins and whiteboards to think through spatial problems.

That gap closes today.

## What "Drawing" Actually Means for an Agent

When an AI agent "draws" a floor plan, it needs to:

1. **Output a structured representation** — not a PNG, but something that encodes which shapes are where and what they mean
2. **Work on the first try** — agents can't iterate visually the way humans can; the first output needs to be right
3. **Be shareable** — the output needs a URL someone can click, not a blob of JSON nobody can read
4. **Look appropriate** — precise architectural blueprints signal false accuracy; hand-drawn sketches signal "approximate idea" correctly

Skissify was built to solve exactly this. Here's how it works.

## The Schema That Made 94% First-Try Accuracy Possible

Most "JSON → diagram" tools use nested schemas. Something like:

```json
{
  "rooms": [
    {
      "name": "bedroom",
      "position": {
        "x": 50,
        "y": 50
      },
      "size": {
        "width": 200,
        "height": 150
      },
      "children": [
        { "type": "door", "edge": "south" }
      ]
    }
  ]
}
```

When you test this with LLMs, you get around 60% first-try accuracy. The nesting forces the model to maintain a mental stack while generating. Models miss things. They close brackets in the wrong place. They confuse parent/child relationships.

Skissify uses a flat schema instead:

```json
{
  "elements": [
    { "type": "room", "id": "bedroom", "x": 50, "y": 50, "width": 200, "height": 150, "label": "Bedroom" },
    { "type": "door", "id": "door1", "x": 150, "y": 200, "edge": "south", "roomId": "bedroom" }
  ]
}
```

Every element is a peer. No nesting. Absolute coordinates. 14 primitives total.

First-try LLM accuracy with this schema: **94% for Claude, 88% for GPT-4o**.

The flat-list design is the core insight. It feels like a regression — surely more structure is better? But LLMs are trained on enormous flat datasets. Flat lists feel natural. Hierarchical trees require working memory to maintain.

## A Real MCP Workflow

Here's what it looks like when Claude Desktop calls Skissify as an MCP tool:

**User says to Claude:**
> "I'm planning a small home office in my spare bedroom. It's roughly 3m × 4m. Show me a layout."

**Claude, via MCP:**
1. Calls `skissify_create_sketch` with a flat JSON array of elements
2. Gets back a sketch URL: `https://skissify.com/s/abc123`
3. Embeds the URL in its response: "Here's a layout suggestion: [sketch]"

**What the user sees:** A hand-drawn floor plan in their chat window. Permanent URL. Shareable. No install required.

**Setup:**
```bash
npm install -g @skissify/mcp-server
```

Add to Claude Desktop's `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "skissify": {
      "command": "skissify-mcp"
    }
  }
}
```

Done.

## The REST API Version

For agents that don't use MCP — n8n, CrewAI, LangChain, custom pipelines:

```bash
curl -X POST https://api.skissify.com/v1/sketch \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "elements": [
      {"type": "room", "id": "living", "x": 20, "y": 20, "width": 300, "height": 200, "label": "Living Room"},
      {"type": "room", "id": "kitchen", "x": 20, "y": 240, "width": 150, "height": 120, "label": "Kitchen"},
      {"type": "door", "id": "d1", "x": 100, "y": 20, "edge": "north"},
      {"type": "window", "id": "w1", "x": 270, "y": 80, "edge": "east"}
    ],
    "style": "napkin"
  }'
```

Response:
```json
{
  "url": "https://skissify.com/s/xyz789",
  "thumbnailUrl": "https://skissify.com/s/xyz789/thumb.png"
}
```

## Human Mode: No JSON Required

For users who don't want to write JSON — or for AI assistants that prefer natural language:

**URL:** [skissify.com/human](https://skissify.com/human)

Type: *"two-bedroom apartment with open kitchen, large bathroom, and balcony on the south side"*

The system uses an LLM to interpret the description and generate the JSON internally. The user never sees the schema.

## Four Real Use Cases from the First 72 Hours

**1. Real estate agent pre-listing preparation**
Agent uses Skissify to generate quick floor plan approximations from property descriptions — 30 seconds per property, good enough to communicate spatial flow to buyers.

**2. Homeowner contractor brief**
Types a natural language description of the renovation they want. Gets a sketch. Attaches it to the contractor inquiry. Zero ambiguity about what they want.

**3. Geometry teacher**
Generates problem worksheets by describing polygons and measurements. Each problem gets a sketch. No more pulling shapes from PowerPoint.

**4. Dungeon master**
Uses Claude Desktop + MCP to generate campaign maps. Describes the dungeon. Gets the map. Players have a visual before the session starts.

---

## The Big Picture

We're in early days of agents producing structured visual output. Text → text is solved. Text → code is mostly solved. Text → image is handled (but unstructured). Text → structured spatial sketch is new.

The value isn't just the output itself — it's that the sketch becomes a **shareable artifact with a permanent URL**. It can be passed between agents, embedded in documents, linked in chats. It's spatial memory that persists.

That's what Skissify is: a persistent spatial memory primitive for AI agents.

---

**Try it:** [skissify.com](https://skissify.com) | [skissify.com/human](https://skissify.com/human)  
**MCP server:** `npm install -g @skissify/mcp-server`  
**API docs:** [docs.skissify.com](https://docs.skissify.com)

*Show HN tomorrow. Come say hi.*

---

**Tags:** #MCP #AIAgents #FloorPlan #LLM #API #Claude #OpenAI #Skissify #BuildInPublic
