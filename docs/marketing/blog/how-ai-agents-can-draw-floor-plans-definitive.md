# How AI Agents Can Draw Floor Plans (The Complete 2026 Guide)

*Updated: April 2, 2026 | Cycle 106 revision — complete workflow, viral hooks, curl examples*
*Tags: AI agents, MCP, floor plans, Claude, LangChain, n8n, Skissify, programmatic sketching*
*Target: r/LocalLLaMA, r/mcp, Anthropic Discord, LangChain Discord, Dev.to, HN Show*

---

**Until recently, "AI draws a floor plan" meant a paragraph of text describing a room.**

The AI could reason about space perfectly. "3-bedroom, open-plan kitchen, south-facing living room." Accurate. Structured. Completely useless for sending to a contractor or handing off to the next agent in your pipeline.

The output primitive was missing. Here's how it works now.

---

## The Core Problem: LLMs Reason Spatially But Output Text

Ask Claude to design a 2-bedroom apartment and it will describe it in thoughtful, accurate detail. Room dimensions. Traffic flow. Furniture placement recommendations.

What you actually want: a picture. Something you can share in Slack, embed in Notion, attach to a GitHub issue, or pass to another agent that needs visual context.

The gap between "AI understands space" and "AI can output space visually" was the missing link. Skissify closes it.

---

## How It Works (30 Seconds)

Skissify is a REST API that converts JSON sketch manifests into hand-drawn SVG images. You describe a sketch as a flat JSON object — paper type, tool, wobble settings, and an array of elements — and get back a shareable URL.

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "cream",
    "tool": "pencil",
    "wobble": {"amplitude": 1.5, "waves": 3, "humanness": 0.4},
    "elements": [
      {"type": "rect", "x": 50, "y": 50, "w": 300, "h": 200, "label": "Living Room"},
      {"type": "rect", "x": 50, "y": 260, "w": 140, "h": 120, "label": "Bedroom 1"},
      {"type": "rect", "x": 200, "y": 260, "w": 150, "h": 120, "label": "Bedroom 2"},
      {"type": "door-symbol", "x": 100, "y": 200, "w": 40, "h": 40},
      {"type": "window", "x": 280, "y": 50, "w": 60, "h": 10}
    ]
  }'
# Returns: {"url": "https://skissify.com/s/abc123", "svg": "..."}
```

No API key. No authentication. Free tier.

---

## The MCP Route: Claude Draws Natively

For Claude Desktop, Cursor, or Windsurf users, the MCP server makes drawing a native tool:

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["skissify-mcp"]
    }
  }
}
```

After adding this, you can prompt Claude directly:

- *"Sketch a 2-bedroom apartment with an open kitchen"*
- *"Draw the architecture of a REST API service with three layers"*
- *"Create a floor plan for a small coffee shop with seating for 20"*
- *"Sketch a D&D dungeon with three rooms and two corridors"*

Claude constructs the JSON manifest, calls Skissify, and returns a shareable sketch URL in the conversation.

---

## The Schema Design Insight (Why This Works for LLMs)

The key engineering decision that made LLM-generated floor plans reliable: **flat coordinates beat hierarchical nesting.**

First attempt: rooms contained elements. Elements referenced parent rooms.

```json
// HIERARCHICAL — LLMs generate this badly
{
  "rooms": [
    {
      "id": "living",
      "bounds": {"x": 0, "y": 0, "w": 300, "h": 200},
      "elements": [
        {"type": "sofa", "parent": "living", "relX": 50, "relY": 50}
      ]
    }
  ]
}
```

Problem: LLMs kept generating elements with mismatched parent IDs, coordinates outside room bounds, and undefined room references. Roughly 40% of outputs were valid.

Second attempt: everything flat, absolute paper-space coordinates.

```json
// FLAT — LLMs generate this at 94% accuracy
{
  "elements": [
    {"type": "rect", "x": 0, "y": 0, "w": 300, "h": 200, "label": "Living Room"},
    {"type": "sofa", "x": 50, "y": 50, "w": 80, "h": 40}
  ]
}
```

Result: 94% of LLM-generated manifests render correctly on the first try. LLMs generate well-constrained positional primitives much better than they maintain cross-reference consistency.

**Lesson:** When your JSON schema is consumed by LLMs, flat beats hierarchical even when hierarchical is more semantically correct.

---

## Real Workflows: 5 Ways Agents Are Using This

### 1. Homeowner Renovation Planning (Human Mode)
User describes their kitchen in plain text → Claude generates a floor plan sketch → user shares the URL with a contractor who actually understands what "remove this wall" means visually.

### 2. Architecture Diagramming in Agent Pipelines
LangChain or CrewAI agent generates system architecture → calls Skissify REST API → sketch URL stored in agent memory → passed to next agent for documentation generation.

### 3. n8n / Make Automation Workflows
HTTP Request node → Skissify API → sketch URL written to Notion database or Slack channel. No code. One workflow node.

### 4. GitHub PR Visual Context
CI action triggers on PR containing layout changes → generates before/after sketches → attaches them to the PR as comments. Reviewers see the spatial diff, not just the code diff.

### 5. D&D / Game Design
Game master describes dungeon → Claude draws it in blueprint mode → shareable URL sent to players. Blueprint aesthetic gives exactly the right dungeon-map look.

---

## Element Types You Can Use

| Category | Elements |
|----------|----------|
| **Structure** | rect (wall), line, opening |
| **Architectural** | door-symbol, door-slide, window, stair, column |
| **Technical** | arrow, dim (dimension line), dashed, arc, circle |
| **Annotation** | text, label |
| **Furniture** | sofa, chair, bed, desk, table, bookshelf |
| **Kitchen/Bath** | sink, toilet, bathtub, shower, oven, fridge |

30+ types. All with configurable wobble, opacity, and stroke width.

---

## Paper and Tool Options

| Paper | Look |
|-------|------|
| `cream` | Warm off-white — napkin sketch aesthetic |
| `white` | Clean — more architectural |
| `yellow` | Legal pad — casual, notes-style |
| `blueprint` | Dark blue — technical drawings, dungeon maps |

| Tool | Effect |
|------|--------|
| `pencil` | Light, slightly textured strokes |
| `ballpoint` | Medium, consistent pressure |
| `ink` | Dark, heavier strokes |

---

## Get Started

```bash
# Option 1: MCP — Claude draws natively
# Add to claude_desktop_config.json:
npx skissify-mcp

# Option 2: REST API — works in any language
POST https://skissify.com/api/render
Content-Type: application/json
# (no auth required)

# Option 3: Browser editor
# https://skissify.com — no signup
```

Full documentation: [skissify.com/docs](https://skissify.com/docs)

---

## The Bigger Picture

In 2026, AI agents can write code, search the web, send emails, and manage calendars. The missing tool was always drawing.

Not pixel-perfect design. Not CAD. Just: **an AI-readable, human-understandable spatial sketch.**

That's what Skissify is. The napkin sketch that AI can produce, and humans can read.

---

*Skissify is a hand-drawn sketch API for AI agents and developers. JSON in, wobbly SVG out. Free tier, no auth required.*
