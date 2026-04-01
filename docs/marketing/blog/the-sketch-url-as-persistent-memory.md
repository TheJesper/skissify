# The Sketch URL as Persistent Agent Memory

*~650 words | Category: AI Engineering | Tags: AI agents, memory, MCP, persistent state, architecture*

---

Here's a capability of Skissify that almost nobody talks about, but builders of multi-agent systems keep discovering on their own: **a sketch URL is a form of persistent memory**.

Every sketch rendered by Skissify gets a public URL. That URL returns the same SVG every time — deterministically — because the render is a pure function of the JSON input. The sketch doesn't change unless you change the JSON. This makes a Skissify URL semantically stable in a way that, for example, a screenshot URL or an image upload is not.

And that stability has a specific use in multi-agent workflows.

---

## The Problem: AI Agents Don't Have Eyes

When you're orchestrating a chain of AI agents — one that plans, one that executes, one that reviews — passing spatial information between them is awkward. Text descriptions of layouts ("the main room is 6 by 4 meters, with a door on the south wall and a window on the east") require the receiving agent to reconstruct the spatial model in its context window. That reconstruction is lossy. Details get dropped. Geometry gets misremembered.

Images fix this, but images are opaque to most agents. An agent receiving a PNG can't modify it programmatically. It can describe what it sees, but it can't adjust a wall position or add a furniture symbol.

Skissify URLs fix both problems at once.

---

## What a Sketch URL Actually Is

When an agent renders a sketch with Skissify, it gets back:
1. The SVG string (for immediate rendering)
2. A public sketch URL — `https://skissify.com/s/[id]`

That URL is:
- **Human-readable** — open it in a browser and you see the sketch
- **Agent-readable** — the underlying JSON schema is accessible via `/s/[id].json`
- **Deterministic** — same input always produces same output
- **Embeddable** — paste it in a doc, a PR, a Slack message, an email

For a multi-agent workflow, this means an orchestrator can store a sketch URL in a session context, pass it to downstream agents, and each agent can retrieve and update the underlying JSON to produce a new sketch. The sketch URL becomes the shared spatial state.

---

## A Concrete Example: Renovation Planning Agent

Imagine a home renovation assistant built with multiple agents:

1. **Intake agent** — talks to the homeowner, understands the goals ("open plan kitchen, better natural light, more storage")
2. **Layout agent** — calls Skissify to render a proposed floor plan based on the intake
3. **Constraint agent** — reviews the layout against structural constraints (load-bearing walls, window positions, building regs)
4. **Output agent** — produces a final report with the sketch embedded

Each agent in this chain can access, review, and modify the sketch JSON. The sketch URL threads through the whole workflow as the canonical representation of the proposal. At each step, the spatial state is explicit and inspectable — not buried in a text description inside a prompt.

The homeowner at the end gets a report with a link to the actual sketch. They can share it with a contractor. The contractor can open it on mobile. The sketch isn't a dead screenshot — it's a living artifact.

---

## Why This Matters for Agent Memory Architecture

Most discussions of agent memory focus on text embeddings, semantic search, and conversation history. Spatial memory is underspecified.

A Skissify URL is a form of structured spatial memory that:
- Fits in a URL (100 characters)
- Is human-inspectable (open in a browser)
- Is agent-readable (retrieve the JSON)
- Is agent-writable (modify the JSON, render a new sketch)
- Is semantically stable (doesn't drift or hallucinate)

If you're building agents that reason about space — room layouts, system architecture diagrams, level designs, network topologies — treating your sketch URLs as memory primitives is worth thinking about.

---

*Skissify is a hand-drawn sketch API for AI agents and developers. REST API: `POST https://skissify.com/api/render`. MCP server: `npx skissify-mcp`. Free at [skissify.com](https://skissify.com).*
