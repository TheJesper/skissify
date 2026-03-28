# The MCP Visual Layer: What 12,000 Servers Are Missing

*March 28, 2026 — Cross-post to Dev.to, Hashnode, r/mcp*
*~2,200 words | 9 min read*

> **The short version:** MCP turned AI assistants into tool-calling machines. Thousands of servers give Claude the ability to search, read files, query databases, call APIs. Almost none of them give Claude the ability to produce visual output. This is the gap Skissify fills — and why it matters for the next generation of agent workflows.

---

The MCP registry hit 12,000 servers in early 2026.

That's 12,000 tools an AI agent can now use: web search, file access, calendar, Slack, database queries, code execution, APIs of every description.

One category is almost entirely empty: **visual output**.

Not "display existing images." Not "retrieve screenshots." The ability for an AI agent to *create* a visual artifact — a diagram, a sketch, a floor plan — and return it as a usable, shareable, inspectable thing.

That's the gap. Here's why it exists, why it matters, and how it changes what agents can do.

## Why Visual Output Was Hard

Text output is trivial for an LLM. You ask, it responds. The output format is the same as the input format.

Structured data output (JSON, CSV, tables) is nearly as easy. The model knows the schema, outputs to spec, done.

Visual output has a hard problem: you need a rendering layer. The model can reason about layout, composition, and spatial relationships — but it can't "draw" in the traditional sense. It needs an execution environment that translates its intent into visual output.

The classic solutions were all wrong for agents:
- **Code generation + browser screenshot**: Works, but brittle and slow. Not a first-class output.
- **Mermaid/Graphviz**: Structured text → diagram. Good for flow charts, terrible for anything spatial.
- **Excalidraw export**: Possible via community wrappers, but Excalidraw wasn't designed for programmatic input.
- **D3/Canvas code**: The model writes drawing code that a tool executes. Works for power users, terrible DX.

None of these give an AI agent a native, purpose-built visual output primitive.

## The Skissify Approach

Skissify exposes MCP tools for creating sketches programmatically:

```
create_sketch(elements: SketchElement[], settings?: SketchSettings) → { url: string, id: string }
```

The AI generates a JSON document describing what to draw. The server renders it as a hand-drawn sketch. The output is a URL that can be shared, embedded, or inspected.

The schema is designed to be LLM-friendly:
- Descriptive element types (`wall`, `door`, `window`, `room`, `arrow`, `label`)
- Spatial coordinates with room for approximate values (agents aren't pixel-perfect)
- Tunable aesthetics via `wobble` settings (amplitude, frequency, humanness)
- 14 architectural element types for floor plan workflows

The benchmark: **94% first-try success rate with Claude Sonnet 4** — meaning the model generates valid, renderable JSON on the first attempt in 94 of 100 test cases.

Compare that to asking Claude to write Mermaid syntax (70-75% first-try valid) or raw Canvas drawing code (much lower).

## Why LLMs Are Surprisingly Good at This

Language models trained on the internet have seen millions of floor plans, wireframes, architecture diagrams, and spatial descriptions. They've internalized the grammar of space.

Ask Claude to "design a 2-bedroom apartment with a north-facing living room, separated kitchen, and main bedroom en-suite" and it will produce a spatially coherent design — correct room adjacencies, sensible traffic flow, logical proportions.

The problem was never reasoning ability. It was the output layer.

Give Claude an MCP tool that accepts spatial JSON and returns a sketch URL, and suddenly all that latent spatial reasoning becomes visible. The agent has a drawing hand.

## What This Unlocks for Agent Workflows

**Architecture and design agents.** A planning agent that designs room layouts and immediately renders them for review. Not "here's a text description of a floor plan" — here's the floor plan.

**Technical documentation agents.** An agent that reads your codebase and generates architecture diagrams. System topology, service dependencies, data flow — visual, shareable, accurate.

**Educational agents.** A math tutor that explains geometry with hand-drawn figures. A history agent that sketches battle formations. A physics agent that draws free-body diagrams.

**Client-facing agents.** A renovation planning assistant that shows homeowners their options instead of describing them. A real estate agent that sketches property layouts during a conversation.

**Game and creative agents.** A dungeon master assistant that generates campaign maps. A game designer that sketches level layouts. A novelist that rough-plans scene blocking.

Each of these is a real use case. Each of them needs a visual output primitive. None of them were possible with the MCP ecosystem as it existed before.

## The Comparison to Text Tools

When MCP added web search tools, agents suddenly could access current information. When file tools shipped, agents could read and write your documents. When code execution tools arrived, agents could run and test code.

Each capability unlock didn't just improve existing workflows — it created entirely new categories of what agents could do.

Visual output is the same pattern. The agents that can sketch are qualitatively different from the agents that can only describe. The use cases aren't just "better" — they're different categories of possible.

## The Technical Stack

For builders who want to understand what's under the hood:

**Rendering engine:** Custom Canvas 2D implementation in TypeScript. Multi-harmonic wobble via superposition of sine waves — three axes of control (amplitude, wave frequency, humanness). This is why Skissify sketches look genuinely hand-drawn rather than slightly-wobbly vector graphics.

**MCP transport:** Standard stdio transport, compatible with Claude Desktop and any MCP-compliant agent framework.

**Schema:** Fully typed TypeScript interfaces, JSON Schema validation, developer-friendly error messages when elements are invalid.

**Paper styles:** Cream napkin, white paper, grid paper, blueprint — selected via `settings.paper`.

**Output:** Public URLs by default (free tier), private URLs on Pro. URLs are permanent and embeddable.

## Installing the MCP Server

```bash
npm install -g @skissify/mcp-server
```

Add to Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "skissify": {
      "command": "skissify-mcp"
    }
  }
}
```

Restart Claude Desktop. Ask Claude to draw something.

## What's Next for the Visual Layer

The 12,000-server landscape is early. Visual output tools are just beginning to emerge. What I expect to see in 2026-2027:

- **More rendering targets**: Skissify does hand-drawn sketches. Equivalents will emerge for technical diagrams (clean vector), 3D layouts, data visualizations, timeline diagrams.
- **A2A protocol convergence**: Google's Agent-to-Agent protocol is converging with MCP. Visual output becomes a first-class capability in multi-agent systems.
- **Rendering quality race**: First-try LLM success rate is the key metric. Tools that build LLM-friendly schemas will win.
- **Domain-specific renderers**: Architecture, PCB layout, organizational charts, network topology — specialized renderers for specific professional contexts.

The visual layer is being built. Skissify is one piece of it.

---

*Try it: [skissify.com](https://skissify.com) — free tier available.*
*MCP server: `npm install -g @skissify/mcp-server`*
*X: [@jesperland](https://x.com/jesperland)*
