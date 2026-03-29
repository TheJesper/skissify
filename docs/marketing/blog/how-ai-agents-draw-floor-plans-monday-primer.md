# How AI Agents Draw Floor Plans: A Monday Primer

*Publish: Monday March 30 — Dev.to, r/mcp, r/AI_Agents, r/vibecoding*  
*Read time: 5 minutes*  
*Audience: AI developers, MCP builders, Claude Desktop users*

---

Until six months ago, AI agents were text-out, text-in.

They could describe a floor plan beautifully. They could not *draw* one.

That changed with structured sketch APIs. Here's how it works, why it works, and how to add it to your agent stack in under 10 minutes.

## The problem with "describe a room"

Ask Claude to sketch a studio apartment. Without a visual output tool, you get:

> "The studio is approximately 35 square meters. The entrance is on the south wall. The kitchen runs along the east wall, approximately 3 meters. The sleeping area occupies the northwest corner..."

Accurate. Useless for anyone who needs to actually visualize the space.

The alternative — asking Claude to generate SVG directly — produces inconsistent, hard-to-parse output. LLMs are not trained for raw coordinate geometry.

## The schema solution

The key insight: LLMs are good at generating structured *descriptions* of space. They struggle with raw geometry.

Skissify's schema bridges the gap:

```json
{
  "elements": [
    {"type": "room", "x": 0, "y": 0, "w": 500, "h": 400, "label": "Living Room"},
    {"type": "room", "x": 500, "y": 0, "w": 200, "h": 200, "label": "Kitchen"},
    {"type": "door", "x": 150, "y": 400, "rotation": 0},
    {"type": "window", "x": 400, "y": 0, "w": 100}
  ]
}
```

Rules that make it LLM-friendly:
1. **Flat list** — no nested objects (nesting is where LLMs lose track)
2. **Absolute coordinates** — `x` and `y` from a fixed origin (no "relative to parent")
3. **Limited vocabulary** — 14 element types, not infinite
4. **Explicit dimensions** — no computed values

The result: Claude generates valid Skissify JSON on the first try **94% of the time**. Compare that to ~25% for raw SVG generation.

## MCP integration: 10-minute setup

The fastest path is the Skissify MCP server:

**Step 1: Install**
```bash
npm install -g @skissify/mcp-server
```

**Step 2: Add to Claude Desktop config** (`~/Library/Application Support/Claude/claude_desktop_config.json` on Mac):
```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "@skissify/mcp-server"]
    }
  }
}
```

**Step 3: Restart Claude Desktop**

**Step 4: Test it**
> "Claude, sketch a 2-bedroom apartment with an open-plan kitchen and living area."

You'll get a sketch URL back. Click it. Floor plan.

## REST API: for agent pipelines

If you're building a custom agent (Mastra, LangGraph, CrewAI, n8n), use the REST API:

```typescript
const response = await fetch('https://api.skissify.com/v1/render', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.SKISSIFY_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    elements: generatedElements,
    style: 'blueprint',  // or: napkin, technical, rough
  }),
});

const { url } = await response.json();
// url is a permanent, shareable sketch link
```

## Real workflow: homeowner briefing agent

Here's a practical example — an agent that helps homeowners communicate renovation requirements to contractors:

```
User: "I want to renovate my kitchen. It's about 4x3 meters, I want a central island, double sink on the north wall, fridge near the door."

Agent flow:
1. Extract spatial requirements (LLM)
2. Generate Skissify JSON (LLM with schema prompt)
3. Render sketch (Skissify API)
4. Return: "Here's a sketch of your kitchen: [url]"
   "Send this to your contractor to confirm the layout before they start."
```

The contractor gets a rough sketch — not a polished CAD drawing, which would take hours to produce. The roughness signals: "this is a starting point for discussion." That's exactly what you want.

## Real workflow: dungeon master assistant

This one surprised the Skissify team.

```
User: "I need a dungeon map — entrance room, two branching corridors, a treasure vault at the end."

Agent: Generates layout JSON → Skissify renders → returns sketch URL

DM: Prints it, brings it to the table.
```

Floor plan primitives map directly to dungeon geography. Rooms are rooms. Corridors are corridors. Doors are doors.

## Communities where this is happening

If you're building with Skissify or exploring AI visual output, these communities have active conversations:

- **r/mcp** — MCP tool builders (most relevant for server integration)
- **r/AI_Agents** — Agentic workflow discussions
- **r/vibecoding** — MCP essential tools thread (Feb 2026, very active)
- **r/ClaudeAI** — Claude Desktop MCP users
- **Mastra Discord** — TypeScript agent builders
- **r/ChatGPT** — Plugin/workflow sharing

## The bigger picture

Skissify is the first external tool that gives AI agents a dedicated visual output primitive for spatial data.

Before: text description or raw SVG (inconsistent)  
After: structured JSON → rendered sketch → shareable URL

This is the pattern: purpose-built schema + dedicated renderer = reliable visual output.

The same principle will apply to other output types. Graphs. Diagrams. Charts. The era of text-only AI output is ending.

---

**Start building:** [skissify.com](https://skissify.com) | [API docs](https://skissify.com/docs) | [MCP server](https://skissify.com/mcp)

*Free tier available. MCP server is open source.*
