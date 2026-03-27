# Why Skissify Belongs in Your MCP Server Stack

**Published:** March 28, 2026  
**Author:** Jesper Landmér  
**Platform:** r/mcp, Dev.to, MCP Discord  
**Status:** Ready to publish

---

Most MCP servers give your AI agent one more way to query data.

Skissify gives it the ability to draw.

---

## The Gap in the MCP Ecosystem

There are now over 12,000 MCP servers. They cover:
- File system access
- Web search
- Database queries
- Email and calendar
- Code execution
- Browser control

What's missing from every single one: **visual output**.

When an AI agent reasons about a space, a system diagram, a layout, or a process — it can describe it perfectly in words, but it can't show you a picture. Not because AI can't think visually (it can), but because there was no tool for it.

Until now.

---

## How Skissify Works as an MCP Tool

Skissify exposes a single MCP tool: `render_sketch`.

Your Claude (or other MCP-compatible agent) receives a JSON payload describing elements — rooms, walls, furniture, labels, dimensions — and returns a hosted URL for the hand-drawn sketch.

The JSON schema is designed to be LLM-friendly. Claude generates valid schemas on the first try ~94% of the time. Mistral and GPT-4o sit at 78-85%.

```json
{
  "tool": "render_sketch",
  "input": {
    "elements": [
      {
        "type": "rect",
        "x": 50, "y": 50,
        "width": 200, "height": 150,
        "label": "Living Room",
        "style": "room"
      },
      {
        "type": "door",
        "x": 100, "y": 50,
        "width": 30, "height": 10,
        "rotation": 0,
        "subtype": "hinged"
      }
    ],
    "style": {
      "paper": "graph",
      "amplitude": 2.5,
      "humanness": 3
    }
  }
}
```

The agent gets back a URL: `https://skissify.com/s/[id]`

That URL is shareable, embeddable, and renderable anywhere.

---

## Three Ways MCP Developers Are Using It

### 1. Agent Workflow Visualization

When an agent plans a multi-step workflow, it usually outputs numbered text steps. With Skissify in the stack, it can render a spatial diagram of the workflow — boxes, arrows, decision points.

```
Agent prompt: "Design a data pipeline for processing restaurant menu PDFs. Show me the architecture."

Without Skissify: Numbered text list
With Skissify: Hand-drawn architecture diagram with boxes for each stage
```

### 2. Space Planning on Command

The most popular use case since launch: natural language → floor plan.

```
User: "I have a 4m × 5m kitchen. I want an island, window north, door east."
Agent: [reasons about layout constraints] → generates JSON → calls Skissify → returns sketch URL
```

No user ever sees the JSON. They get a floor plan.

### 3. Iterative Visual Design

This is the use case that gets interesting. An agent can generate a sketch, show it to the user, receive feedback ("make the bedroom bigger"), regenerate the JSON with updated dimensions, and render a new sketch. The user is doing design through conversation.

The visual feedback loop changes what's possible in an agent conversation.

---

## Installation (5 minutes)

```bash
npm install -g @skissify/mcp-server
```

Add to Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "skissify": {
      "command": "skissify-mcp",
      "env": {
        "SKISSIFY_API_KEY": "your-api-key"
      }
    }
  }
}
```

Restart Claude Desktop. Ask Claude: "Draw a simple floor plan for a studio apartment."

It'll work on the first try.

---

## Why the JSON-First Design Matters

Most visual tools are designed for humans. They have drag-and-drop interfaces, toolbars, selection modes. They're not designed for programs.

Skissify is designed for programs first.

The JSON schema has:
- Strict element type definitions (14 types, all documented)
- Predictable coordinate system (top-left origin, pixels)
- No ambiguity in required vs. optional fields
- LLM-optimized descriptions in the schema itself (reduces hallucination)

When an LLM generates Skissify JSON, it's doing structured output generation — a task LLMs are very good at. The hard part (rendering, wobble physics, element-specific aesthetics) is Skissify's problem.

---

## The Ecosystem Opportunity

Right now, every agent framework — LangChain, LangGraph, CrewAI, AutoGen, n8n — is missing a native visual output layer.

Adding Skissify as an MCP tool is one import statement and a config file. Your agent gains the ability to draw.

For agent platforms and frameworks, Skissify is the visual output primitive that was missing from the stack.

---

## Try It

- **Web interface**: [skissify.com](https://skissify.com) — paste JSON, get a sketch (free, no signup)
- **MCP server**: `npm install -g @skissify/mcp-server`
- **API docs**: [skissify.com/docs](https://skissify.com/docs)
- **r/mcp thread**: [link]

If you build something interesting with it, I'd love to see it. Drop a comment or find me at [@skissify on Twitter](https://twitter.com/skissify).

---

*Skissify — The visual output layer for AI agents. JSON in. Hand-drawn sketches out.*
