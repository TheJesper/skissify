# How AI Agents Draw Floor Plans (The Complete 2026 Workflow)

*Posted: April 5, 2026 — Cycle 137*

---

In early 2026, AI agents can write code, browse the web, send emails, and manage databases.

One thing they couldn't do until recently: draw.

Not image generation — that's non-deterministic, slow, and expensive. Actual structured spatial drawing: a floor plan with rooms in precise positions, doors and windows in the right walls, dimensions labeled correctly. The kind of drawing that an architect would sketch on a napkin before opening CAD software.

Skissify solves this. Here's how it works in practice.

---

## Why "Draw" Is Different From "Describe"

When you ask Claude to describe a floor plan, you get words:

> "The apartment has a main living area approximately 6 meters by 4 meters, with an open kitchen along the north wall, a bedroom to the east with an en-suite bathroom..."

This is useful. But it's still a description. The person reading it has to reconstruct the spatial layout in their head.

When your AI agent draws the same floor plan via Skissify, you get a URL that renders a hand-drawn sketch — room outlines, door symbols, labeled dimensions. The spatial layout is immediately visible without any reconstruction.

The difference between telling and showing is the same whether the teller is human or AI.

---

## The Technical Setup (5 Minutes)

### Option 1: Claude via MCP (recommended for developers)

Add the Skissify MCP server to your Claude configuration:

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

Claude now has access to a `skissify_render` tool. Ask it: "Draw me a 35sqm studio apartment with a kitchen area, sleeping zone, and bathroom." Claude will generate the JSON manifest and call `skissify_render`. You get a sketch URL in response.

### Option 2: REST API (for any agent framework)

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "cream",
    "tool": "pencil",
    "wobble": 0.4,
    "elements": [
      {"type": "rect", "x": 50, "y": 50, "w": 300, "h": 200, "label": "Living Room"},
      {"type": "rect", "x": 50, "y": 250, "w": 150, "h": 120, "label": "Kitchen"},
      {"type": "door-symbol", "x": 200, "y": 50, "rotation": 0}
    ]
  }'
```

Response: `{"url": "https://skissify.com/s/abc123", "renderMs": 142}`

### Option 3: Human Mode (no code, no account)

Visit [skissify.com/human](https://skissify.com/human). Describe the floor plan in plain English. Get a sketch URL in 8 seconds.

---

## A Real Agent Workflow: Property Brief Generator

Here's a concrete example of this pattern in production:

**Context:** A real estate agent wants to generate a rough floor plan sketch for each listing before professional photography is done. They have basic dimensions but no CAD software.

**Agent workflow:**

1. Agent receives listing data: "3BR apartment, 85sqm. Living/dining 28sqm, kitchen 12sqm, master bedroom 16sqm, two bedrooms 10sqm each, two bathrooms."

2. Agent converts dimensions to a coordinate layout and constructs a Skissify JSON manifest with room rectangles, door symbols, and dimension labels.

3. Agent calls `POST /api/render`, gets a sketch URL.

4. Agent embeds the URL in the listing email and CRM entry.

**Result:** Every listing has a spatial sketch ready within seconds of entering the data. No manual drawing. No tools required. The sketch looks like a quick architect's napkin drawing — professional enough to communicate layout, rough enough to not be mistaken for measurements.

---

## Five Use Cases That Actually Happen

**1. GitHub PR visual changelogs** — An engineering agent adds a Skissify sketch to every PR that changes system architecture. Reviewers see a before/after spatial view of service topology without reading through the code.

**2. DnD dungeon maps** — Tabletop players describe dungeon layouts to Claude via MCP. Claude generates a hand-drawn map with chambers, corridors, and labeled rooms. This is perhaps the most delightful unexpected use case.

**3. Sprint board visualization** — A planning agent reads the sprint backlog and generates a spatial swim-lane view as a persistent URL embedded in Notion. Updates automatically when the backlog changes.

**4. Kitchen renovation briefs** — Homeowners describe their kitchen layout to the /human endpoint before consulting an architect. The sketch costs nothing and saves 20 minutes of verbal explanation.

**5. Interior design concept sketches** — An AI agent generates multiple layout variants for a room renovation brief, each as a separate Skissify URL. Client picks a direction before any design work begins.

---

## Why Determinism Matters for Agents

Image generation models are powerful but non-deterministic. Run the same prompt twice and you get two different images. An AI agent can't rely on that for documentation, versioning, or reproducibility.

Skissify is deterministic: the same JSON manifest always produces the same sketch. This means:

- You can store the manifest in a database and regenerate the sketch at any time
- You can diff two manifests to see what changed spatially
- You can version-control the sketch in Git alongside the code
- The sketch URL is stable — it doesn't expire

For agent workflows, determinism isn't optional. It's what makes the sketch artifact trustworthy rather than decorative.

---

## What's Coming Next

The next pattern we're seeing: agents that generate Skissify sketches at multiple stages of a project lifecycle and maintain a version history. The floor plan you drew in the initial client brief, the revision after the first feedback, the final layout before construction — all as a sequence of Skissify URLs with diff visibility.

Spatial version control. That's where this is going.

---

*[Skissify](https://skissify.com) — REST API + MCP server for hand-drawn spatial sketches. Free tier, 100 renders/month. No account required for /human mode.*

**Tags:** ai-agents, floor-plans, mcp, architecture, developer-tools, no-code, productivity
