# IBM Said A2A + MCP Are Converging. Here's What the Visual Layer Looks Like.

**Published:** April 1, 2026  
**Author:** Jesper (Skissify founder)  
**Tags:** a2a, mcp, ai-agents, skissify, multi-agent, visual-output  
**Best for:** Dev.to, r/AIAgents, LinkedIn (technical), Hacker News  
**Publish timing:** 15:00 CET April 1 (technical afternoon wave)

---

IBM published something interesting two weeks ago: A2A and MCP are converging toward a shared standard for describing entities — whether it's a tool, a resource, or an agent.

That means the multi-agent ecosystem is starting to look like an actual protocol stack:

```
Text + Code + Data + Image
        ↕
    MCP / A2A layer
        ↕
  ???
```

There's a gap in that stack. The gap is **sketches**.

---

## What's Missing From Every Agent Protocol Stack

Every major AI agent framework today handles:

- **Text**: Prompts, outputs, memory, conversation history  
- **Code**: Execution, tool calls, function schemas  
- **Data**: Structured JSON, database queries, API responses  
- **Images**: Vision models, DALL-E outputs, screenshots  

None of them have a native format for **spatial diagrams, floor plans, wireframes, or hand-drawn layouts**.

This isn't a minor gap. Consider what agents do with space:

- A real estate assistant describing property layouts
- A planning agent working through renovation options
- An event coordinator mapping venue setups
- An architecture assistant proposing room configurations
- A game master generating dungeon maps for D&D

All of these require **spatial representation**. All of them currently get described in text: "there's a room on the left with a door on the north wall." That's lossy. That's indirect. That's not how humans think about space.

---

## Skissify as the Fifth Primitive

Skissify introduces a new primitive for agent output: **sketches**.

A Skissify sketch is:
- A JSON schema (machine-readable, agent-writable)
- Rendered as hand-drawn SVG (human-readable, sharable)
- Addressable by URL (persistent, linkable, composable)

An agent produces a sketch the same way it produces JSON:

```json
{
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 200, "h": 150, "label": "Living Room" },
    { "type": "rect", "x": 270, "y": 50, "w": 120, "h": 80, "label": "Kitchen" },
    { "type": "line", "x1": 250, "y1": 80, "x2": 270, "y2": 80, "label": "doorway" }
  ]
}
```

That's it. No coordinate geometry expertise required. The agent writes structured JSON, Skissify renders it as a hand-drawn sketch, and the URL is persistent and shareable.

---

## The A2A Angle: Sketches as Agent Handoffs

Here's where it gets interesting with the A2A convergence.

When agents hand off work to each other, they pass state. Current handoffs are text + structured data. But spatial state — "what does the floor plan look like so far?" — doesn't pass well as text.

A Skissify URL is the natural format for spatial state in multi-agent handoffs:

1. **Agent A** (planner) generates a rough layout sketch → `skissify.app/s/abc123`
2. **Agent B** (designer) fetches the sketch, adds detail → `skissify.app/s/def456`  
3. **Agent C** (reviewer) loads both, compares, flags issues → returns markup sketch
4. **Human** gets the final sketch URL — one click, sees the full evolution

The sketch URL is persistent agent memory with visual encoding.

---

## Why Now

The IBM piece notes: *"We're already seeing collaboration between A2A and MCP to standardize on a single card to describe an entity."*

That single card will likely include an output type. Text, code, data, image — and eventually sketch.

Skissify isn't waiting for the standard. We're defining what sketch output looks like for AI agents today.

If you're building with MCP, A2A, LangGraph, CrewAI, Mastra, or AutoGen — the visual layer is available now.

---

## Try It

MCP server: [github.com/skissify/mcp-server](https://github.com/skissify/mcp-server)  
API: [skissify.app/docs/api](https://skissify.app/docs/api)  
Product Hunt: [producthunt.com/posts/skissify](https://www.producthunt.com/posts/skissify)

The sketch layer for your agent stack is live.

---

*Skissify launched on Product Hunt today, April 1, 2026. Not a joke.*
