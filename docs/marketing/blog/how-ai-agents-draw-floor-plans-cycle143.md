# How AI Agents Can Draw Floor Plans

**The Handoff Problem: How Skissify Closes the Loop Between Language and Layout**

*Angle: Cycle 143 — "The Handoff Problem" — multi-agent orchestration and the challenge of visual state transfer between agents*

---

Most AI agent workflows share information as text. A planning agent decides what to build. A coding agent writes the implementation. A review agent checks the output.

This works well for text artifacts. It breaks down for spatial artifacts.

If agent A decides "the bedroom should be northeast with a window facing the garden," and agent B is supposed to draw that floor plan — what exactly gets passed between them?

In most multi-agent setups: a text description. "Bedroom in northeast corner, 4m x 5m, window on north wall, door on south wall facing hallway."

The coding agent downstream can parse that. The human reviewing the output cannot visualize it from text alone. And crucially, *neither can the next agent in the chain*.

---

## The Visual State Transfer Problem

This is the handoff problem: **when spatial information passes through text, it degrades.**

Each hop introduces ambiguity:
- "Northeast" — relative to what coordinate origin?
- "Facing the garden" — what does the agent know about garden orientation?
- "4m x 5m" — is the door included in that measurement? Is the wall thickness?

By the time the description reaches a rendering step, a human review step, or another planning agent, the original intent has been eroded by interpretation at each layer.

Compare that to a Skissify JSON manifest:

```json
{
  "elements": [
    { "type": "rect", "x": 340, "y": 80, "w": 160, "h": 200, "label": "Bedroom" },
    { "type": "window", "x": 360, "y": 80, "w": 120, "label": "Garden view" },
    { "type": "door-symbol", "x": 340, "y": 270, "w": 60, "label": "" }
  ]
}
```

This is not a description of spatial intent. It *is* the spatial intent, in machine-readable, human-renderable form.

Every agent downstream can read it. Every human can see it (rendered via the Skissify API). Nothing gets lost in translation because there is no translation step.

---

## Why This Matters for Multi-Agent Systems

In 2026, multi-agent orchestration is the dominant pattern for complex AI tasks. You have:

- **Planning agents** that break problems into subproblems
- **Execution agents** that do specific tasks
- **Memory agents** that store and retrieve context
- **Review agents** that check output quality

For workflows that produce spatial output — floor plans, network diagrams, event layouts, classroom seating arrangements — every agent in this chain benefits from a shared visual state format.

Without it, each agent invents its own text representation of space. They are incompatible. The review agent cannot check the execution agent's output against the planning agent's intent because they used different vocabulary.

With a Skissify manifest as the shared format:
- The planning agent outputs a draft manifest
- The execution agent refines it
- The memory agent stores the manifest URL (immutable, content-addressed)
- The review agent renders the URL and compares it to the requirements

One format. No translation layers. No degradation.

---

## The Sketch URL as Agent Memory

Skissify generates a deterministic URL from a sketch manifest. Given the same JSON input, you always get the same URL.

This is architecturally significant: it means the URL is a content hash for a visual artifact.

Agent systems that need to reference "the floor plan we agreed on in step 3 of this workflow" can store and retrieve a URL instead of re-generating or re-describing the visual. They can diff two manifests to understand what changed between versions. They can include sketch URLs in their context window without image tokens — just a reference that renders on demand.

This is what "sketch URL as agent memory" means in practice: a persistent, versioned, content-addressed spatial artifact that any agent can produce, read, and pass forward.

---

## A Floor Plan Workflow That Actually Works

Here is a concrete multi-agent floor plan workflow using Skissify:

**Step 1 — Requirements agent:**
Input: "3-bedroom house, 120 sqm, open plan kitchen-living, north-facing garden"
Output: Structured requirements JSON

**Step 2 — Layout planning agent:**
Input: Requirements JSON
Output: Room list with approximate sizes and relationships

**Step 3 — Skissify sketch agent:**
Input: Room list from Step 2
Output: Skissify manifest + sketch URL

```
https://skissify.com/s/a1b2c3d4e5f6
```

**Step 4 — Review agent:**
Input: Sketch URL + original requirements
Output: Compliance check ("bedroom 1 missing north-facing window — requirements violation")

**Step 5 — Refinement agent:**
Input: Sketch URL + review output
Output: Updated manifest + new sketch URL

**Step 6 — Human approval:**
Input: Sketch URL (shared in Slack/email)
Output: Approval or change request

At every step, the spatial state is explicit, readable, and durable. No text-to-space interpretation errors. No "I thought you meant the bedroom on the left" misunderstandings.

---

## The Implementation

Skissify provides an MCP server that exposes `create_sketch` and `get_sketch` tools. Any Claude-based agent workflow can call these directly:

```
Tool: create_sketch
Input: { manifest: { ... } }
Output: { url: "https://skissify.com/s/...", id: "..." }
```

For non-Claude agents, the REST API accepts the same manifest format:

```bash
curl -X POST https://skissify.com/api/sketch \
  -H "Content-Type: application/json" \
  -d '{ "elements": [...] }'
```

The response includes the sketch URL and the manifest ID. That ID is stable — the same manifest always produces the same ID.

---

## Who Needs This

If you are building with:
- **Claude Code** — use the Skissify MCP for visual output in any floor plan, diagram, or layout task
- **LangGraph / CrewAI** — use the REST API to add a visual output node to any spatial workflow
- **n8n / Make** — use the HTTP node with the Skissify API to generate sketch URLs as workflow artifacts
- **Custom orchestration** — the manifest is just JSON; any agent that can produce structured output can produce a Skissify manifest

---

## The Bottom Line

Multi-agent AI workflows produce better spatial outputs when they share a common visual format. Skissify provides that format.

Not as an image (opaque, non-diffable, token-expensive).
Not as a description (ambiguous, lossy, agent-incompatible).
As a JSON manifest that renders to a hand-drawn sketch — deterministic, versioned, human-readable, and machine-readable.

That is what closes the handoff loop.

→ docs.skissify.com/mcp

---

*Tags: #AIAgents #MCPServer #FloorPlan #MultiAgent #LangChain #CrewAI #BuildInPublic*
