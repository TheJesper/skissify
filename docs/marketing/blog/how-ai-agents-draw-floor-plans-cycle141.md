# How AI Agents Can Draw Floor Plans

*Cycle 141 — April 5, 2026 | Angle: "The Coordinate Problem" — why LLMs fail at spatial output without a rendering contract, and how Skissify's JSON manifest solves it*

---

Ask Claude to design a one-bedroom apartment. You will receive a very good description of a one-bedroom apartment.

Ask Skissify's MCP server to generate the same apartment. You will receive a URL.

That URL renders a hand-drawn floor plan with rooms, doors, windows, and dimensions positioned exactly where the agent intended them — not approximated, not hallucinated, not re-interpreted by a diffusion model.

The difference is not capability. Both systems can reason about space. The difference is output contract.

---

## Why Language Models Struggle With Spatial Output

Large language models have spatial reasoning — they've been trained on enough architecture descriptions, game maps, and floor plan specifications to understand the relationships between rooms. The problem is output format.

When an LLM returns text describing a layout, the spatial information exists in the text but cannot be acted on without interpretation. The reader must mentally render it. Every reader's mental rendering is different. The agent has no way to verify that its spatial intention was received accurately.

This is the coordinate problem: the agent has a mental model of the space, but its only output channel (text) loses the coordinate information in translation.

---

## The JSON Manifest as Spatial Contract

Skissify solves the coordinate problem with a JSON manifest format. The agent produces a structured object specifying each element (room, door, window, arrow) with exact bounding box coordinates. Skissify renders the manifest deterministically into a hand-drawn sketch.

```json
{
  "paper": "blueprint",
  "tool": "ink",
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 200, "h": 150, "label": "Living Room" },
    { "type": "rect", "x": 250, "y": 50, "w": 120, "h": 100, "label": "Kitchen" },
    { "type": "door-symbol", "x": 150, "y": 50, "w": 40, "h": 40 },
    { "type": "window", "x": 50, "y": 80, "w": 60, "h": 20 }
  ]
}
```

The manifest is the agent's coordinate system. The sketch is the rendered output. The URL is the shareable artifact.

Same manifest → same sketch, every time. This is determinism, not generation. It is the difference between a rendering engine and a diffusion model.

---

## Three Connection Options

### Option 1: MCP Server (Recommended for Claude)
Add Skissify MCP to your Claude configuration. Claude can call `generate_sketch` directly from a conversation without any user copy-paste.

```
POST /api/generate
{
  "manifest": { ... }
}
→ { "url": "https://skissify.com/s/abc123" }
```

### Option 2: REST API
Any agent framework (LangChain, CrewAI, LangGraph, Mastra, n8n) can call the REST endpoint directly. The agent constructs the manifest, POSTs it, gets back a URL, and returns that URL as part of its output.

### Option 3: /human Endpoint (No JSON Required)
For workflows where the agent isn't writing JSON, the /human endpoint accepts plain text descriptions and returns a sketch URL. Lower precision than the manifest path but zero integration work.

---

## Five Real Floor Plan Workflows

**1. Apartment layout iteration**
User briefs Claude on constraints (south-facing living room, storage near entrance, open kitchen). Claude generates a manifest. Skissify renders the sketch. User comments on the sketch. Claude updates the manifest. New URL in under 10 seconds.

**2. Office space planning**
Facilities manager describes headcount and collaboration zones. Agent returns three layout options as separate Skissify URLs. Manager pastes all three into a Notion page. Team votes on the layout in the comments.

**3. Architecture client presentations**
Architect uses Claude to explore 5 rough layouts before opening CAD software. Each rough sketch takes under 60 seconds. Client sees three options in the first meeting instead of one polished drawing. Revision cycles shrink.

**4. D&D dungeon mapping**
Dungeon Master describes a five-room dungeon with specific challenges per room. Agent returns a Skissify URL with rooms, corridors, and doors marked. Players see the map at session start. DM updates it between encounters.

**5. Sprint planning visual**
Scrum Master describes upcoming sprint features and dependencies. Agent generates a flow diagram (arrows, boxes, labels) showing the build order. Team has a spatial view of the sprint before planning poker starts.

---

## The Versioning Advantage

Because Skissify renders from a JSON manifest rather than storing images, every version of a floor plan is a versioned JSON file. Manifests can be committed to git. Differences between versions are readable diffs. The design history is auditable.

This is a property that diffusion-model image generation cannot provide. When the manifest changes, you know exactly what changed and why. When an image changes, you know only that it looks different.

For AI-native development workflows where traceability matters, the manifest-first approach is the architecture that scales.

---

## Get Started in 5 Minutes

1. Go to [skissify.com](https://skissify.com)
2. Open the manifest editor
3. Paste the JSON example from this post
4. Click Render

You will have a floor plan sketch in under 30 seconds, no account required.

For MCP integration, see the [Skissify MCP documentation](https://skissify.com/docs/mcp).

---

*Tags: #AIAgents #FloorPlan #MCP #ModelContextProtocol #SpatialAI #ClaudeAI #AgentDev #LangChain #CrewAI #ArchitectureAI*
