# The Three-Layer AI Stack — And the Missing Visual Output Problem

*Published: March 2026 — Cross-post to Dev.to, Hashnode, Medium*

---

Something crystallized in the AI agent ecosystem this year.

By early 2026, the industry quietly agreed on a three-layer protocol stack for AI-native applications:

- **MCP (Model Context Protocol)** — how agents connect to tools and data
- **A2A (Agent-to-Agent)** — how agents talk to each other
- **WebMCP** — how agents access the web

Over 100 enterprises have signed on. It's becoming infrastructure.

But there's a gap nobody's talking about: **none of these protocols have a standard way to produce visual output**.

---

## What the Stack Handles Well

Let me give credit where it's due. This three-layer stack is elegant.

MCP solves the tool connection problem — instead of every AI model needing custom integrations for every data source, you write one MCP server and any MCP-compatible model can use it.

A2A handles orchestration — a planning agent can spin up specialized agents and receive structured results. You can build complex multi-agent pipelines without each agent knowing the implementation details of the others.

WebMCP gives agents browsable access to the web — read, navigate, act.

Together, these three protocols let you build AI agents that can reason, coordinate, retrieve, and act. The agent ecosystem has real infrastructure now.

---

## The Gap: Agents Can Think Visually, But Can't Draw

Here's the problem.

AI agents are increasingly capable of spatial reasoning. Ask Claude to design a floor plan and it can think through traffic flow, room proportions, adjacencies, sightlines. Ask it to sketch a system architecture and it can reason about dependencies, data flows, failure modes.

But then what?

The agent's visual output options are:
1. **Describe it in text** — "The kitchen is 4m × 3m, north wall, adjacent to the dining room..." — Technically accurate, spatially opaque.
2. **Generate Mermaid/PlantUML** — Works for flow diagrams, completely wrong format for spatial layout.
3. **Generate HTML/CSS** — Possible but heavy, requires a browser to render, produces UI not sketches.
4. **Call an image generation model** — DALL-E or Stable Diffusion. But these are probabilistic. The agent asks for "a floor plan with a kitchen on the north wall" and gets something plausible-looking but structurally hallucinated. Try to iterate on it: "move the bedroom three meters east" — you can't. You're starting over.

None of these work for **precise, iterative, programmatically-controlled visual output**.

---

## Why Image Generators Don't Solve This

This is worth dwelling on, because it's a common objection.

Image generation models are impressive. They're getting better at spatial tasks. Couldn't you just prompt one really well?

Three reasons this doesn't work for agent workflows:

**1. No determinism.** The same prompt produces different images every run. In a workflow where an agent is iterating on a design ("add a window here, widen this corridor"), you can't build on top of a probabilistic result.

**2. No structure.** The image generator returns pixels. The agent workflow needs to be able to reference the output — "tell me the dimensions of room B", "can this layout fit a desk for three people?" Pixels don't answer those questions. Structured data does.

**3. No schema.** There's no way to say "generate a floor plan where room A is exactly 4m × 5m, doors are 0.9m wide, and the total footprint is under 80 square meters." Image generators approximate. Skissify renders exactly.

---

## Skissify as the Visual Output Layer

Skissify sits below the three-layer protocol stack, solving the visual output problem at the rendering layer.

The approach is deliberately simple:

1. Define a JSON schema for spatial elements (rooms, doors, windows, stairs, annotations, dimensions).
2. Accept that JSON via API or MCP tool call.
3. Render it as a hand-drawn sketch — precise structure, informal aesthetic.

The agent decides what to draw. The schema enforces it's drawable. Skissify renders it.

This creates a fourth layer: **structured visual output** that is:
- Deterministic (same JSON → same sketch)
- Structured (the source of truth is still JSON, not pixels)
- Schema-constrained (invalid JSON = early error, not a hallucinated image)
- Iteratable (change one coordinate, re-render, get the updated sketch)

---

## What This Looks Like in Practice

Here's an agent conversation that works today with Skissify:

```
User: Design a home office for a 9m² corner room. One window on the north wall. 
      Include a desk, some shelving, and room to pace.

Claude: [reasons through layout constraints]
        [generates Skissify JSON for the floor plan]
        [calls create_sketch MCP tool]
        [returns: "Here's a layout. The L-desk fits in the northeast corner, 
         shelving along the west wall, about 1.2m of open floor on the south side."]

User: Can we move the desk to the south wall instead?

Claude: [modifies JSON, coordinates, dimensions]
        [calls create_sketch again]
        [returns updated sketch instantly]
```

The agent doesn't "redraw from scratch." It modifies structured data and re-renders. The visual updates in under a second. This is iterative design at AI speed.

Try doing that with a DALL-E call.

---

## The A2A Angle

The A2A protocol enables agent orchestration — a planning agent coordinating specialist agents.

In a complex design workflow, you might have:
- A **constraint analysis agent** that reviews building codes
- A **space planning agent** that generates layout options
- A **visualization agent** that renders the outputs

Skissify is a natural fit for the visualization agent role. It accepts structured JSON (perfect for agent-to-agent handoff), renders deterministically, and returns a shareable URL. The planning agent can call Skissify through MCP and hand the result URL back to the orchestrator without any human in the loop.

This is the three-layer stack extended with visual output. The pieces already exist. You just need a rendering layer that speaks JSON.

---

## Open Standard, Not Lock-In

One design principle of Skissify's JSON schema: it should be publishable as an open spec.

The goal is that any tool, any framework, any agent implementation can generate Skissify-compatible JSON without going through the Skissify API. The spec is simple enough to be comprehensible. A competent LLM can generate valid JSON after reading the schema once.

This mirrors how MCP itself works: open spec, multiple implementations. The value isn't in controlling the schema — it's in building the best rendering layer.

---

## What Comes Next

The three-layer AI protocol stack is infrastructure now. Agents can reason, coordinate, and retrieve. The visual output layer is the next obvious gap.

The answer isn't image generation. Image generation is fantastic for artistic output, for aesthetic generation, for creative exploration. It's wrong for structured, iterative, agent-controlled spatial design.

The answer is a rendering layer that speaks the same language as agents: structured data, deterministic output, schema-constrained generation.

That's Skissify.

---

*The MCP server is open source: `npm install -g @skissify/mcp-server`. Three-step setup, works with Claude Desktop immediately. Try it at [skissify.com](https://skissify.com).*

**Tags:** mcp, a2a, ai-agents, architecture, developer-tools, visual-output, agent-native, json, floor-plan, skissify
