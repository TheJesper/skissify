# How AI Agents Draw Floor Plans: A Step-by-Step Technical Walkthrough

*From natural language to hand-drawn sketch — here's exactly what happens.*

---

AI agents can reason about space. They can describe room layouts, suggest furniture placement, calculate square footage. But until recently, they couldn't *draw*.

This is the story of how that changed, and how you can use it in your own projects today.

---

## The Core Problem: Agents Describe, They Don't Draw

If you ask Claude "design a studio apartment with a home office nook," you'll get something like:

> "Consider placing the desk along the north wall, leaving the south wall for the bed. A murphy bed would allow the office area to expand during the day..."

This is useful. But it's not a floor plan. It's a description of a floor plan.

The missing piece was a *rendering layer* — something that accepts structured spatial data and outputs an actual visual.

---

## The Solution: JSON → MCP → Hand-Drawn Sketch

Skissify solves this with a three-layer approach:

```
Natural language
      ↓
  Claude (LLM)
      ↓
  JSON manifest  ←── flat, explicit coordinates
      ↓
  Skissify MCP
      ↓
  Hand-drawn SVG
      ↓
  Shareable URL
```

The key insight: **AI agents generate JSON better than they generate spatial descriptions.** Structured output with explicit coordinates is exactly what LLMs are good at producing when given the right schema.

---

## The JSON Schema (Simplified)

A Skissify floor plan is a flat list of elements with x/y coordinates:

```json
{
  "title": "Studio Apartment",
  "style": {
    "paper": "cream",
    "tool": "pencil",
    "wobble": 3,
    "humanness": 4
  },
  "elements": [
    {
      "id": "main-room",
      "type": "rect",
      "x": 50, "y": 50,
      "width": 400, "height": 300,
      "label": "Living / Sleep Area"
    },
    {
      "id": "kitchen",
      "type": "rect",
      "x": 50, "y": 350,
      "width": 160, "height": 100,
      "label": "Kitchen"
    },
    {
      "id": "bathroom",
      "type": "rect",
      "x": 210, "y": 350,
      "width": 120, "height": 100,
      "label": "Bath"
    },
    {
      "id": "entry-door",
      "type": "door-symbol",
      "x": 330, "y": 350,
      "width": 40, "height": 10,
      "doorType": "hinged"
    },
    {
      "id": "window-south",
      "type": "window",
      "x": 150, "y": 50,
      "width": 80, "height": 10
    }
  ]
}
```

**Why flat?** Hierarchical JSON structures have ~3x lower success rates for LLMs than flat, explicit coordinate lists. When you require nested parent-child relationships to describe spatial layouts, the model must reason about two things at once: the hierarchy and the coordinates. Flat is better.

---

## LLM Success Rates from 200+ Test Generations

From internal testing across generation types:

| Sketch Type | Valid JSON (1st attempt) |
|-------------|-------------------------|
| Floor plans | 88–92% |
| System diagrams | 85% |
| UI wireframes | 71% |
| Custom layouts | 63% |

Floor plans perform best because they have strong real-world priors — Claude has seen thousands of floor plans in its training data and can reason about reasonable coordinate ranges.

---

## Setting It Up in 5 Minutes

### Option 1: Claude Desktop (No Code)

```bash
npx skissify-mcp
```

Add to your `claude_desktop_config.json`:

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

Restart Claude Desktop. Now type: *"Design a 2-bedroom apartment with a home office, open plan living"*

### Option 2: API (Direct Integration)

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d @your-floor-plan.json
```

Returns a sketch URL. No auth required on the free tier.

### Option 3: Programmatic (Node.js Agent)

```javascript
const response = await fetch('https://skissify.com/api/render', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(sketchManifest)
});
const { url } = await response.json();
// url = "https://skissify.com/s/abc123"
```

---

## Supported Element Types

14 element types designed for architectural and technical drawings:

| Category | Types |
|----------|-------|
| Geometry | `rect`, `line`, `circle`, `arc` |
| Annotation | `text`, `arrow`, `dashed`, `dim` |
| Architecture | `door-symbol`, `door-slide`, `window`, `stair`, `opening`, `column` |

---

## The Wobble Algorithm (Why It Looks Real)

The hand-drawn look comes from a seeded multi-harmonic wobble algorithm. Each line gets three overlapping harmonic perturbations with seeded randomness — meaning the same JSON always produces the same sketch (deterministic), but each line looks uniquely hand-drawn.

This is different from a simple sine wave offset, which creates a mechanical regular pattern that immediately looks artificial.

**Why does determinism matter?** Sketch URLs are permanent. Share a link and it renders the same sketch every time. This makes Skissify sketches viable as *agent memory* — an agent can store the URL and retrieve the same visual context on the next run.

---

## The Practical Workflow (Full Example)

```
User: "I'm renovating my kitchen. Can you sketch a layout with
       an island, peninsula seating for 4, and a pantry corner?"

Claude → analyzes constraints
Claude → generates JSON with 8 elements (walls, island,
         peninsula, stools, pantry, window, door, dim lines)
Claude → calls render_sketch()
Claude: "Here's a sketch of the layout: https://skissify.com/s/xyz
         The island is centered at roughly 3m x 1.2m.
         Want me to move the peninsula or add appliance positions?"
```

Total time: 6–8 seconds. No Figma. No back-and-forth description. An actual visual on the first response.

---

## What This Enables That Wasn't Possible Before

1. **AI design assistants** that show, not just tell
2. **Architecture pre-visualization** without a CAD operator
3. **Technical documentation** with generated diagrams
4. **Multi-agent design loops** where Agent A proposes a layout and Agent B critiques it via the sketch URL
5. **Non-developer floor plan tools** (just chat with Claude)

---

**→ Get started: [skissify.com](https://skissify.com)**
**→ MCP: `npx skissify-mcp`**
**→ npm: `npm install @skissify/sdk`**
