# How AI Agents Can Draw Floor Plans — A Technical Walkthrough

*Published: March 2026 — Cross-post to Dev.to, Hashnode*

> **What you'll get from this post:** A step-by-step breakdown of exactly how an AI agent (Claude via MCP) goes from natural language to a rendered floor plan sketch — including the JSON schema, the wobble algorithm, and a real conversation example you can reproduce.

---

Last week I asked Claude to design a 2-bedroom apartment and sketch it for me.

Five seconds later, I had a floor plan.

No drag-and-drop. No Figma. No manual drawing. Just a conversation and a sketch.

Here's exactly how it works — and how you can do it too.

## The Problem: AI Can Think in Space, But Couldn't Draw

AI language models have always been surprisingly good at spatial reasoning. Ask Claude to "design a functional 2-bedroom apartment with a north-facing living room" and you'll get a thoughtful, well-reasoned layout described in text. Column widths, room adjacencies, traffic flow — it thinks about all of it.

But until recently, the output was always text. You'd have to read the description and *imagine* the floor plan, or manually sketch it yourself.

That's the gap Skissify fills.

## How MCP Makes This Possible

[MCP (Model Context Protocol)](https://modelcontextprotocol.io) is an open standard from Anthropic that lets AI agents connect to external tools and APIs. Instead of just generating text, an MCP-enabled AI can call tools, retrieve data, and — critically — render visual output.

Skissify exposes an MCP server. When you install it with Claude Desktop, the AI can:

1. Design a layout (reasoning about room sizes, adjacencies, function)
2. Generate a JSON sketch manifest
3. Send it to Skissify via MCP
4. Get a rendered sketch back
5. Show it to you in the conversation

## The JSON Sketch Manifest

The key innovation is Skissify's JSON schema. Every sketch is described as a list of elements:

```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "amplitude": 3,
  "waves": 4,
  "humanness": 0.4,
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 400, "h": 250, "label": "Living Room" },
    { "type": "rect", "x": 50, "y": 300, "w": 180, "h": 150, "label": "Kitchen" },
    { "type": "rect", "x": 300, "y": 300, "w": 150, "h": 150, "label": "Bedroom 1" },
    { "type": "rect", "x": 300, "y": 450, "w": 150, "h": 120, "label": "Bedroom 2" },
    { "type": "rect", "x": 50, "y": 450, "w": 100, "h": 120, "label": "Bathroom" },
    { "type": "door-symbol", "x": 175, "y": 50, "w": 80, "h": 20, "angle": 0 },
    { "type": "window", "x": 50, "y": 170, "w": 100, "h": 20 },
    { "type": "window", "x": 300, "y": 50, "w": 120, "h": 20 },
    { "type": "dim", "x": 50, "y": 620, "x2": 450, "y2": 620, "label": "14.5m" }
  ]
}
```

The AI doesn't need to be a designer to generate this. It just needs to understand space and JSON — both things LLMs are quite good at.

## The Wobble Engine: Making It Look Real

The hardest part of Skissify wasn't the MCP integration. It was making the output look like it was actually drawn by a human hand.

Most "hand-drawn" sketch tools use a simple sine wave offset — you shift each point slightly left or right. It looks mechanical. Regular. Too perfect.

Skissify uses **multi-harmonic wobble**: multiple overlapping wave frequencies with seeded randomness, applied differently to each element based on its type and position.

Three control axes:
- **Amplitude**: how far lines deviate (0 = ruler-straight, 10 = drunk architect)
- **Waves**: wobble frequency (low = gentle, high = nervous)
- **Humanness**: random tremor overlay (simulates actual hand shake)

A door arc wobbles differently than a wall line. A dimension line has tighter tolerances than a freehand rectangle. It's all tunable.

## Installing the MCP Server

```bash
# Install globally
npm install -g @skissify/mcp-server

# Or add to Claude Desktop's config
# ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["@skissify/mcp-server"],
      "env": {
        "SKISSIFY_API_KEY": "your-api-key"
      }
    }
  }
}
```

Once installed, Claude gets a new tool: `create_sketch`. It takes the JSON manifest and returns a rendered sketch URL.

## A Real Conversation

Here's an actual example of what the Claude Desktop interaction looks like:

> **Me:** Design a small 1-bedroom apartment for a remote worker. Prioritize a good home office space. Show me the floor plan.

> **Claude:** I'll design a compact 1-bedroom with the home office as a priority. The key is separating work and sleep — I'll put the office near natural light and keep the bedroom acoustically separate...
>
> *[calling create_sketch with manifest...]*
>
> Here's the floor plan: [rendered sketch]
>
> The office (4.2m × 3.8m) is at the northwest corner for morning light. The bedroom is at the opposite end with a buffer zone (the bathroom + hallway). The kitchen/living area connects them without crossing through work space.
>
> Want me to try a different configuration?

That's the future. AI as a design collaborator — not just a text generator.

## Supported Element Types

The current Skissify schema supports 14 element types:

| Type | Use Case |
|------|----------|
| `line` | Any straight line, walls |
| `rect` | Rooms, tables, furniture |
| `circle` | Circular elements, stairs |
| `arc` | Curved walls, door swings |
| `arrow` | Flow direction, traffic |
| `text` | Labels, annotations |
| `dashed` | Property boundaries, furniture |
| `dim` | Dimension lines with measurements |
| `window` | Wall openings |
| `door-symbol` | Hinged doors |
| `door-slide` | Sliding doors |
| `stair` | Staircase representations |
| `opening` | Doorless openings |
| `column` | Structural columns |

This covers most architectural floor plan needs. The schema is designed to be extensible — future versions will add furniture blocks, electrical symbols, and plumbing fixtures.

## The Broader Vision

Floor plans are just the start.

The same approach works for:
- **System architecture diagrams** — let the AI design microservices layouts
- **UI wireframes** — rough layout before Figma
- **Network topology** — visual infrastructure maps
- **Meeting notes** → spatial summaries

Any time you want to turn structured data (or an AI's reasoning) into a visual artifact, Skissify gives you a path.

## Try It

The editor is live at [skissify.com](https://skissify.com). You can paste JSON directly and see it render — no signup required.

For MCP integration, you'll need a free account and API key. The MCP server is available on npm.

The future of AI agents isn't just text. It's agents that can think, design, and draw.

---

*Questions? I'm happy to discuss the rendering approach, the JSON schema design, or the MCP integration in the comments.*

---

## What's Next for Skissify

The current element set covers architectural floor plans well. The next evolution is:
- **Furniture library** — pre-defined furniture blocks (sofa, desk, queen bed) at standard sizes
- **Electrical symbols** — power outlets, switches, light fixtures
- **Plumbing fixtures** — sinks, toilets, showers for bathroom/kitchen layouts
- **Multi-floor exports** — generate all floors as a set from one prompt

If you're building something that would benefit from any of these, let me know — it shapes the roadmap.

---

**Tags:** ai, agents, mcp, architecture, floor-plans, javascript, developer-tools

**Distribution notes (internal):**
- Dev.to: Primary — technical audience, MCP integration is the main hook
- Hashnode: Cross-post with "mcp" and "ai-agents" tags for SEO
- Publish Day 3 (Sunday Mar 29) — gives developers the weekend to try it
- Use the "real conversation" section as a Twitter thread teaser with a link
