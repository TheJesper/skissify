# How AI Agents Can Draw Floor Plans: A Complete Tutorial

*April 2026 · Jesper, Skissify*

---

Until recently, if you asked an AI agent to "sketch a floor plan," you'd get a text description. Good text. Accurate room relationships. But nothing you could paste into a message or hand to a contractor.

That's changed.

This tutorial shows exactly how to wire up an AI agent to produce actual hand-drawn floor plan images — shareable URLs, not text.

---

## The Fundamental Problem

LLMs are surprisingly good at spatial reasoning. Ask Claude to design a 2-bedroom apartment and it'll describe correct room relationships, realistic proportions, sensible traffic flow. The reasoning is solid.

The output format is the problem. Text doesn't communicate spatial information — it approximates it.

What we needed was a rendering primitive: something that accepts structured spatial data and returns a visual artifact. That's what Skissify provides.

---

## Option 1: Claude Desktop + MCP (5 minutes, no code)

The fastest path. Claude Desktop supports MCP servers — tools Claude can call natively during conversation.

**Setup:**

Edit your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["skissify-mcp"]
    }
  }
}
```

Restart Claude Desktop.

**That's it.** Now you can ask:

> "Sketch a 3-bedroom house: entrance hall, open-plan kitchen/living room, master bedroom with en-suite, two smaller bedrooms, family bathroom."

Claude will construct the JSON manifest and call the Skissify MCP tool automatically. You'll get back a shareable URL: `https://skissify.com/sketch/[id]`

The sketch is hand-drawn style, on cream paper, with proper architectural symbols for doors and windows.

---

## Option 2: Direct API (for pipelines and automation)

If you're building an agent workflow — LangChain, CrewAI, Mastra, n8n, or custom code — use the REST API directly.

**Endpoint:** `POST https://skissify.com/api/render`
**Auth:** None required
**Rate limits:** Generous free tier

**Minimal example:**

```python
import requests

manifest = {
    "paper": "cream",
    "tool": "pencil",
    "wobble": 2,
    "humanness": 1,
    "elements": [
        # Outer walls
        {"type": "rect", "x": 20, "y": 20, "w": 360, "h": 260, "label": ""},

        # Rooms
        {"type": "rect", "x": 20, "y": 20, "w": 180, "h": 130, "label": "Living Room"},
        {"type": "rect", "x": 200, "y": 20, "w": 180, "h": 130, "label": "Kitchen"},
        {"type": "rect", "x": 20, "y": 150, "w": 120, "h": 130, "label": "Master Bedroom"},
        {"type": "rect", "x": 140, "y": 150, "w": 120, "h": 130, "label": "Bedroom 2"},
        {"type": "rect", "x": 260, "y": 150, "w": 120, "h": 130, "label": "Bathroom"},

        # Doors
        {"type": "door-symbol", "x": 90, "y": 148, "w": 40, "h": 20, "rotation": 0},
        {"type": "door-symbol", "x": 200, "y": 148, "w": 40, "h": 20, "rotation": 0},

        # Windows
        {"type": "window", "x": 80, "y": 20, "w": 60, "h": 10},
        {"type": "window", "x": 270, "y": 20, "w": 60, "h": 10},
    ]
}

response = requests.post("https://skissify.com/api/render", json=manifest)
result = response.json()

sketch_url = result["url"]  # https://skissify.com/sketch/abc123
print(f"Floor plan: {sketch_url}")
```

---

## Option 3: LLM-Generated Manifest (the AI-native approach)

The real power comes from letting the LLM generate the manifest itself.

**System prompt pattern:**

```
You are an architectural sketch assistant. When asked to draw a floor plan or layout,
generate a Skissify JSON manifest and call the render API.

Skissify schema basics:
- paper: "cream" | "white" | "yellow" | "blueprint"
- tool: "pencil" | "ballpoint" | "ink"
- wobble: 0-5 (hand-drawn intensity)
- elements: array of spatial elements

Element types for floor plans:
- rect: {type, x, y, w, h, label}
- door-symbol: {type, x, y, w, h, rotation}
- window: {type, x, y, w, h}
- stair: {type, x, y, w, h, steps}
- text: {type, x, y, text, size}

CRITICAL: Use flat absolute coordinates. Every element gets x, y, w, h in paper-space.
Do NOT nest elements inside rooms. Flat schema produces 94% accurate renders.
Blueprint paper with ink tool = technical/architectural look.
Cream paper with pencil = warm/casual sketch look.
```

**Why flat coordinates matter:**

When we tested hierarchical schemas (rooms containing elements), LLMs generated ~40% valid manifests. Elements referenced wrong parent IDs. Coordinates fell outside parent bounds.

Switching to flat absolute coordinates — every element positioned directly in paper-space, no nesting — jumped accuracy to ~94%.

The lesson: LLMs generate well-constrained flat schemas far better than they maintain cross-reference consistency. Design your schemas accordingly.

---

## Option 4: n8n / Automation Workflow

For no-code/low-code pipelines:

1. Add an **HTTP Request** node
2. Method: POST
3. URL: `https://skissify.com/api/render`
4. Body: JSON with your manifest (can be templated from previous nodes)
5. The response contains `url` — pass it downstream

Use case: a Typeform submission triggers a workflow that generates a rough floor plan based on user's room preferences and emails it back to them.

---

## What You Can Sketch

Skissify's element library covers:

**Architectural:**
- `rect` — rooms, spaces
- `wall` — directional walls with thickness
- `door-symbol` — swing door with arc
- `door-slide` — sliding door
- `window` — wall cutout
- `opening` — passage without door
- `stair` — staircase with steps
- `column` — structural column

**Furniture & Fixtures:**
- `bed`, `sofa`, `armchair`, `desk`, `bookshelf`
- `bathtub`, `toilet`, `sink`, `shower`
- `table`, `chair`

**Technical:**
- `line`, `arrow`, `dashed`
- `dim` — dimension annotation
- `text`, `circle`, `arc`

---

## Real Examples

**Ask:** "Sketch a coffee shop layout — counter at the back, 5 small tables in the front, two armchairs by the window"

**Claude produces:** A floor plan with labeled areas, door symbols at the entrance, window placement, counter rect at the back, table/chair groupings.

**Ask:** "Draw the architecture of a REST API service — client, load balancer, 3 app servers, database cluster"

**Claude produces:** A technical diagram with labeled boxes and arrows showing request flow. Blueprint paper. Clean and diagrammatic.

**Ask:** "Sketch a D&D dungeon — main chamber, two side rooms, collapsed entrance, secret passage"

**Claude produces:** A blueprint-style dungeon map with architectural symbols, labeled rooms, dotted passage lines.

---

## The Broader Pattern

Skissify represents a category: *spatial output primitives for AI agents*.

LLMs can reason spatially. They couldn't produce spatial artifacts. Skissify closes that gap with the simplest possible interface: POST JSON, get sketch URL.

The same pattern will apply to other output types that don't fit text. Skissify is the spatial case. Similar primitives will emerge for sound, simulation, structured visual reports.

For now: if your agent needs to communicate space, use Skissify.

---

**Get started:**
- Web demo: https://skissify.com
- For-agents guide: https://skissify.com/for-agents
- API docs: https://skissify.com/docs
- MCP server: `npx skissify-mcp`
