# How AI Agents Can Draw Floor Plans

*The definitive technical guide — for Dev.to, Hacker News, and agent builders*
*~2,200 words | Category: AI Engineering | Tags: AI agents, MCP, floor plans, API, Claude*

---

Ask Claude to design a room layout. You'll get something like this:

> "Place a sofa against the north wall, facing south. A coffee table in front of it. A TV unit opposite, with built-in shelving on either side. The bed should be in the southeast corner, perpendicular to the window."

It's coherent. It's spatially accurate. It's completely useless for anything you'd actually want to do with it.

You wanted a picture. You got a paragraph.

The problem was never the AI's spatial reasoning — LLMs are genuinely good at understanding room dimensions, traffic flow, and furniture clearances. The problem was the missing output primitive. LLMs could *think* visually but couldn't *output* visually. They had the ability to draw in their heads. They had no hands.

Skissify gives them hands.

It's a REST API that accepts JSON describing a sketch and returns SVG. AI agents can call it. No auth. No UI. Just a POST request that returns a drawing.

Here's what actually happened when I gave Claude a pencil for the first time: I said *"Sketch a studio apartment."* Thirty seconds later, I was looking at a hand-drawn floor plan — wobbly walls, furniture symbols, room labels — that looked like something an architect would dash off on trace paper. The AI hadn't described a room. It had drawn one.

That gap, from text to picture, is now closed.

---

## What Skissify Actually Is

Skissify is a REST API. You POST JSON describing a sketch. You get back SVG.

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "cream",
    "tool": "ballpoint",
    "amplitude": 0.8,
    "elements": [
      { "type": "rect", "x": 50, "y": 50, "w": 300, "h": 200 },
      { "type": "text", "x": 150, "y": 155, "text": "Living Room", "fontSize": 18 },
      { "type": "door-symbol", "x": 50, "y": 120, "w": 50, "side": "left" }
    ]
  }'
```

The response is an SVG string. Render it in a browser, embed it in a doc, save it as a file, pass it back to another agent. It's just data.

No auth required. No rate limits on the free tier. It was designed this way intentionally — zero friction for agents and automation pipelines.

---

## The MCP Path: Claude Draws Natively

The simplest way to put a pencil in Claude's hand is the Skissify MCP server.

**Setup (2 minutes):**

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "skissify-mcp"]
    }
  }
}
```

Restart Claude Desktop. Now you can say:

*"Draw me a rough floor plan for a 2-bedroom apartment with an open-plan kitchen/living area and a bathroom between the bedrooms."*

Claude will:
1. Reason about the room layout
2. Construct a SketchData JSON object with walls, doors, room labels, and furniture
3. Call the `render_sketch` MCP tool
4. Return the SVG (embedded as an image in the conversation)

The output looks like something an architect would sketch on trace paper. Not a perfect CAD drawing — a hand-drawn diagram with slightly wobbly lines and architectural symbols.

---

## The REST API Path: Agent Workflows

If you're building an agent system (LangChain, CrewAI, Mastra, AutoGen, LlamaIndex, raw OpenAI functions — doesn't matter), Skissify is just an HTTP call.

Here's the pattern in TypeScript:

```typescript
interface SketchElement {
  type: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  text?: string;
  [key: string]: unknown;
}

async function renderSketch(elements: SketchElement[]): Promise<string> {
  const response = await fetch('https://skissify.com/api/render', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      paper: 'cream',
      tool: 'ballpoint',
      amplitude: 0.7,
      elements
    })
  });
  return response.text(); // SVG string
}
```

Wrap this as a tool in your agent framework of choice, describe it in the system prompt, and your agent can draw whenever it determines drawing is useful.

---

## Architectural Elements Available

The real unlock for floor plan generation is the vocabulary of architectural elements. Skissify ships 30+ element types specifically for spatial diagrams:

### Structure
- `wall` — double-line walls with configurable wall width
- `rect` — simple room boundary rectangles
- `column` — structural columns (square or circular)

### Openings
- `door-symbol` — door with configurable swing arc, swing direction
- `sliding-door` — sliding door symbol
- `window` — window with wall ticks
- `opening` — open doorway without door

### Vertical circulation
- `stairs` — stair flight with configurable tread count and direction

### Furniture: Living
- `sofa` — 2 or 3 seater with arm configuration
- `armchair` — single chair with cushion indication
- `coffee-table` — rectangular coffee table
- `tv-console` — media console with screen indication

### Furniture: Bedroom  
- `bed` — single or double, with pillow symbols

### Furniture: Kitchen
- `stove` — 4-burner stove top
- `kitchen-sink` — single or double basin

### Furniture: Bathroom
- `toilet` — WC with seat
- `bathtub` — rectangular tub
- `sink` — wall-hung or pedestal basin
- `shower` — shower tray with spray symbol

### Office
- `desk` — rectangular work surface
- `bookshelf` — bookcase with line indication

### Technical
- `line`, `dashed-line`, `arc`, `circle`, `path`
- `arrow` — with head styles
- `dimension` — dimension line with measurement text
- `text` — labeled text with font size control
- `metadata` — title block for blueprints

---

## Prompting Agents to Draw Well

Getting consistent, good results from agents drawing floor plans requires some prompt engineering. Here's what works:

### Tell the agent the coordinate space
Rooms in a floor plan at typical scale: a 4m × 3m bedroom maps to roughly 160×120 units in Skissify's coordinate space (assume ~40 units/meter as a baseline).

Include this in your system prompt:
```
When drawing floor plans with Skissify:
- Use a scale of approximately 40 units per meter
- A typical bedroom is 160w × 120h
- A typical bathroom is 80w × 100h
- A typical kitchen is 200w × 180h
- Leave 10-20 units of wall thickness between rooms
- Place the sketch origin at (20, 20) to avoid clipping
```

### Provide a reference template
Show the agent a basic working JSON object in the system prompt. Agents learn from examples faster than from documentation.

### Break complex plans into rooms first, details second
For multi-room plans, prompt in two passes: first lay out the room footprints, then add furniture and fixtures. This prevents coordinate confusion.

---

## A Complete Working Example

Here's a working Claude prompt + expected JSON + result:

**Prompt to Claude (with Skissify MCP active):**
> "Draw a simple studio apartment: about 6m × 5m. Include an open kitchen along one wall, a sofa and coffee table in the living area, a bed in the corner, and a small bathroom. Hand-drawn style."

**Expected JSON output (simplified):**
```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "amplitude": 0.8,
  "elements": [
    { "type": "rect", "x": 20, "y": 20, "w": 240, "h": 200 },
    
    { "type": "kitchen-sink", "x": 25, "y": 25, "w": 60 },
    { "type": "stove", "x": 90, "y": 25, "w": 60 },
    { "type": "text", "x": 100, "y": 75, "text": "Kitchen", "fontSize": 12 },
    
    { "type": "sofa", "x": 30, "y": 130, "w": 90, "h": 35 },
    { "type": "coffee-table", "x": 50, "y": 95, "w": 50, "h": 30 },
    { "type": "text", "x": 60, "y": 165, "text": "Living", "fontSize": 12 },
    
    { "type": "bed", "x": 155, "y": 100, "w": 90, "h": 60 },
    { "type": "text", "x": 170, "y": 165, "text": "Sleep", "fontSize": 12 },
    
    { "type": "rect", "x": 185, "y": 20, "w": 70, "h": 75 },
    { "type": "toilet", "x": 190, "y": 25, "w": 30, "h": 35 },
    { "type": "sink", "x": 225, "y": 25, "w": 25 },
    { "type": "text", "x": 200, "y": 80, "text": "Bath", "fontSize": 10 },
    
    { "type": "door-symbol", "x": 20, "y": 160, "w": 45, "side": "left" }
  ]
}
```

The output: a hand-drawn studio apartment layout that looks like an architect's quick sketch. Wobbly walls, recognizable furniture symbols, room labels. Immediately readable.

---

## Use Cases That Are Working Right Now

**Real estate agents:** "Generate a rough floor plan from this listing description for the property email." Claude reads the listing, produces the sketch in 20 seconds.

**Interior designers:** Early-stage client conversations. "Here's what I'm imagining for your space" — but rendered, not described.

**Architecture students:** Quick iteration on layouts before committing to CAD. Generate 5 layout options in 2 minutes, pick one to develop.

**Home renovators:** Planning a kitchen remodel. Describe the space to Claude, get back several layout options.

**Game developers:** Procedurally generate dungeon/building layouts with hand-drawn aesthetics for map screens.

**CI/CD documentation:** GitHub Action that generates an architecture diagram on every PR and attaches it to the PR description.

**Technical documentation:** Auto-generate system diagrams from a JSON config file that describes the architecture.

---

## The API Reference

**Endpoint:** `POST https://skissify.com/api/render`  
**Auth:** None  
**Content-Type:** `application/json`  
**Response:** `image/svg+xml`

**Top-level fields:**
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `paper` | string | `"cream"` | `"cream"`, `"white"`, `"blueprint"`, `"grid"` |
| `tool` | string | `"ballpoint"` | `"ballpoint"`, `"pencil"`, `"marker"`, `"pen"` |
| `amplitude` | float | `0.7` | Wobble intensity (0 = straight, 1 = very wobbly) |
| `elements` | array | required | Array of element objects |

Full JSON schema at: `https://skissify.com/api/manifest`

---

## Getting Started in 5 Minutes

1. **With Claude Desktop:** Add the MCP config above, restart, and ask Claude to draw something.

2. **With curl:** `curl -X POST https://skissify.com/api/render -H "Content-Type: application/json" -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":150}]}'`

3. **With any agent framework:** Add a `render_sketch(json) → svg` tool that POSTs to the endpoint.

4. **In the browser:** Visit [skissify.com](https://skissify.com) and use the JSON editor.

Full agent integration guide at [skissify.com/for-agents](https://skissify.com/for-agents).

---

*Skissify is the hand-drawn sketch API for AI agents and developers. JSON in, SVG out. Try it free at [skissify.com](https://skissify.com).*
