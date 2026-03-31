# How AI Agents Draw Floor Plans: The Complete Technical Guide

*Published: April 2, 2026 | Dev.to / Hashnode / blog.skissify.com*
*Category: AI Engineering | ~2,400 words*
*Tags: AI agents, MCP, floor plans, API, Claude, JSON, LLM*

---

Six months ago, if you asked an AI agent to design a room layout, you'd get text.

> "The living room faces south, approximately 5x4 meters. Place the sofa against the east wall facing west. A coffee table in front, television console on the west wall, shelving units flanking it on both sides. North wall has a window at center."

Accurate. Thoughtful. Completely missing the point.

You wanted a picture. The AI gave you a description of a picture. These are not the same thing.

The problem wasn't the AI's spatial reasoning — LLMs are genuinely good at that. The problem was the absence of a **drawing primitive**. AI agents could think visually but couldn't output visually.

Skissify adds that primitive. This post explains exactly how to use it.

---

## Why Text-Based Spatial Description Fails

There's a cognitive difference between reading a description of a layout and seeing the layout.

When you read "living room 5x4 meters, sofa on east wall," you have to construct the picture in working memory. Your mental image might differ from mine. Ambiguities in the text create ambiguities in the picture.

When you see a floor plan — even a rough, wobbly, hand-drawn one — parsing is instant and shared. You and I look at the same image and see the same layout. There's no reconstruction cost. Misunderstandings are immediately visible.

This matters enormously for agentic workflows. If your agent produces a text description of an architectural layout that a human reviews, you get the description-parsing bottleneck. If your agent produces an actual sketch, you get immediate visual comprehension.

More importantly: if your agent produces a sketch, other agents can see it too. Visual output becomes a shared medium across the pipeline.

---

## The Core Mechanism: JSON as a Drawing Language

The insight behind Skissify is that a floor plan is just structured data.

A two-bedroom apartment, reduced to its essential parts:
- Exterior walls (positioned rectangles or lines)
- Interior walls (dividing lines)
- Rooms (labeled regions)
- Doors (symbols with position and swing direction)
- Windows (symbols on walls)
- Furniture (typed symbols with positions)
- Dimensions (measurement annotations)

Every one of these maps directly to JSON. And JSON generation is something LLMs are excellent at — far better than freeform image generation when you need precision.

Here's what a minimal two-room apartment looks like as a Skissify manifest:

```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "amplitude": 0.7,
  "humanness": 0.4,
  "elements": [
    {"type": "rect", "x": 40, "y": 40, "w": 360, "h": 260, "label": ""},
    {"type": "line", "x1": 220, "y1": 40, "x2": 220, "y2": 300},
    {"type": "text", "x": 100, "y": 175, "text": "Living Room", "fontSize": 16},
    {"type": "text", "x": 270, "y": 175, "text": "Bedroom", "fontSize": 16},
    {"type": "door-symbol", "x": 40, "y": 200, "w": 50, "side": "left"},
    {"type": "window", "x": 130, "y": 40, "w": 60},
    {"type": "window", "x": 270, "y": 40, "w": 60},
    {"type": "sofa", "x": 60, "y": 200, "w": 120, "h": 50},
    {"type": "bed", "x": 250, "y": 100, "w": 90, "h": 130, "pillows": "double"},
    {"type": "dim", "x1": 40, "y1": 330, "x2": 400, "y2": 330, "label": "9.0 m", "offset": 20}
  ]
}
```

POST that to `https://skissify.com/api/render` and you get back an SVG: a hand-drawn floor plan on cream paper, ballpoint style, with the sofa, bed, windows, door, and dimension line all placed correctly.

The AI doesn't click. It doesn't drag. It just produces JSON that describes what the layout should look like, and the API renders it.

---

## Path 1: MCP Integration (Recommended for Claude Users)

The Model Context Protocol (MCP) is how you give Claude native access to external tools. The Skissify MCP server adds a `draw` tool that Claude can call directly.

**Setup: two minutes**

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "skissify-mcp"]
    }
  }
}
```

Restart Claude Desktop. Now try:

> "Sketch a studio apartment, roughly 8x6 meters. Open-plan kitchen and living area on one side. Separate bedroom. Bathroom near the entrance. Add some furniture."

Claude will reason about the layout, construct a JSON manifest with approximate coordinates, call the Skissify MCP tool, and return the rendered sketch as an image in the conversation.

It looks like a sketch you'd hand someone at a meeting. Wobbly walls, a little rough, immediately readable. The hand-drawn aesthetic is intentional — it signals "this is a draft layout, let's discuss it" rather than "here's the final design."

---

## Path 2: Direct API Usage

If you're not using Claude Desktop, or you want to drive Skissify from your own code, the REST API is the cleanest approach.

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "cream",
    "tool": "ballpoint",
    "amplitude": 0.8,
    "elements": [
      {"type": "rect", "x": 50, "y": 50, "w": 300, "h": 200},
      {"type": "text", "x": 150, "y": 150, "text": "Living Room", "fontSize": 18},
      {"type": "door-symbol", "x": 50, "y": 130, "w": 50, "side": "left"},
      {"type": "window", "x": 160, "y": 50, "w": 70}
    ]
  }'
```

No auth. No API key. Returns SVG.

**Python integration:**

```python
import httpx
import json

manifest = {
    "paper": "cream",
    "tool": "ballpoint",
    "amplitude": 0.7,
    "elements": [
        {"type": "rect", "x": 50, "y": 50, "w": 300, "h": 200},
        {"type": "text", "x": 155, "y": 155, "text": "Kitchen", "fontSize": 16},
        {"type": "stove", "x": 60, "y": 60, "w": 60, "h": 50, "burners": 4},
        {"type": "dim", "x1": 50, "y1": 270, "x2": 350, "y2": 270,
         "label": "7.5 m", "offset": 20}
    ]
}

response = httpx.post(
    "https://skissify.com/api/render",
    json=manifest,
    headers={"Content-Type": "application/json"}
)

with open("kitchen.svg", "w") as f:
    f.write(response.text)
```

**JavaScript / Node:**

```javascript
const manifest = {
  paper: "cream",
  tool: "ballpoint",
  amplitude: 0.7,
  elements: [
    { type: "rect", x: 50, y: 50, w: 300, h: 200 },
    { type: "text", x: 150, y: 155, text: "Living Room", fontSize: 18 },
    { type: "sofa", x: 80, y: 180, w: 120, h: 50 },
    { type: "door-symbol", x: 50, y: 130, w: 50, side: "left" }
  ]
};

const response = await fetch("https://skissify.com/api/render", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(manifest)
});

const svg = await response.text();
```

---

## Path 3: LangChain / LangGraph / CrewAI Integration

For multi-agent frameworks, Skissify works as a simple HTTP tool.

Here's a LangChain tool wrapper:

```python
from langchain.tools import Tool
import httpx

def render_floor_plan(manifest_json: str) -> str:
    """Render a floor plan from a Skissify JSON manifest. Returns SVG."""
    manifest = json.loads(manifest_json)
    response = httpx.post(
        "https://skissify.com/api/render",
        json=manifest,
        timeout=10.0
    )
    if response.status_code == 200:
        return f"[SVG rendered successfully, {len(response.text)} chars]"
    return f"[Render failed: {response.status_code}]"

skissify_tool = Tool(
    name="render_floor_plan",
    description="""Render a hand-drawn floor plan from a JSON manifest.
    Input: JSON string with 'paper', 'tool', 'amplitude', and 'elements' array.
    Each element has a 'type' (rect, line, door-symbol, window, sofa, bed, text, dim, etc.)
    plus position/size properties. Returns confirmation of successful render.""",
    func=render_floor_plan
)
```

The key is writing a clear tool description so the LLM understands the input format. The `/for-agents` page at `skissify.com/for-agents` has the complete element reference in a format optimized for LLM consumption.

---

## What AI Agents Get Right (and Where They Need Help)

After watching Claude generate dozens of floor plans, here's what I've observed:

**What works well:**
- Room placement and relative sizing
- Door placement (Claude knows to put doors in logical locations)
- Basic furniture arrangement (doesn't put a bed in the kitchen)
- Proportional dimensions (doesn't make a kitchen 30 meters wide)

**Where agents need guidance:**
- Exact coordinate arithmetic (walls need to meet at corners — the numbers matter)
- Nested rooms (coordinates need to be internally consistent)
- Dimension line offset (need to specify `offset: 20` to push dim lines outside walls)

**The most reliable prompt pattern:**

```
Sketch a [space description] floor plan in Skissify JSON format.

Rules:
- Use pixel units. Total canvas: 500x400 pixels roughly.
- Exterior walls: one rect covering the full footprint.
- Interior walls: lines dividing the spaces.
- Leave 50px margin from edges.
- All coordinates relative to top-left (0,0).
- Door-symbols go ON the wall (same x/y as the wall edge).
- Include at least one dim element with offset: 20.
- Use paper: "cream", tool: "ballpoint", amplitude: 0.7.
```

With this prompt, Claude produces usable floor plan JSON on the first try roughly 80% of the time. The other 20% needs a "fix the overlapping walls" follow-up.

---

## The Floor Plan Element Reference

The most useful element types for floor plan generation:

| Type | Required fields | Notes |
|------|----------------|-------|
| `rect` | x, y, w, h | Basic room outline |
| `line` | x1, y1, x2, y2 | Interior walls, partition lines |
| `door-symbol` | x, y, w, side | side: "left" or "right" — swing arc |
| `door-slide` | x, y, w, direction | Sliding door — direction: "left" or "right" |
| `window` | x, y, w | Placed on wall line |
| `stair` | x, y, w, h, steps | steps: 2-20 |
| `column` | x, y, r | Structural column, radius r |
| `text` | x, y, text, fontSize | Room label |
| `dim` | x1, y1, x2, y2, label, offset | Measurement annotation; offset pushes it outside walls |
| `bed` | x, y, w, h, pillows | pillows: "single" or "double" |
| `sofa` | x, y, w, h | With armrests and seat line |
| `dining-table` | x, y, w, h, seats | seats: chairs per long side |
| `toilet` | x, y, w, h | Tank + bowl |
| `bathtub` | x, y, w, h | Oval basin |
| `sink` | x, y, w, h | With tap indicator |
| `stove` | x, y, w, h, burners | burners: 2 or 4 |
| `shower` | x, y, w, h | Shower enclosure |

For the complete reference including all props, see [skissify.com/for-agents](https://skissify.com/for-agents).

---

## A Complete Working Example: Studio Apartment

Here's a complete, production-quality manifest that you can POST directly:

```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "amplitude": 0.7,
  "humanness": 0.4,
  "elements": [
    {"type": "rect", "x": 30, "y": 30, "w": 440, "h": 320},
    {"type": "line", "x1": 30, "y1": 200, "x2": 280, "y2": 200},
    {"type": "line", "x1": 280, "y1": 30, "x2": 280, "y2": 350},
    {"type": "text", "x": 120, "y": 120, "text": "Living / Kitchen", "fontSize": 15},
    {"type": "text", "x": 330, "y": 120, "text": "Bedroom", "fontSize": 15},
    {"type": "text", "x": 80, "y": 270, "text": "Bathroom", "fontSize": 13},
    {"type": "door-symbol", "x": 30, "y": 100, "w": 55, "side": "right"},
    {"type": "door-symbol", "x": 280, "y": 100, "w": 50, "side": "left"},
    {"type": "door-symbol", "x": 110, "y": 200, "w": 45, "side": "right"},
    {"type": "window", "x": 140, "y": 30, "w": 80},
    {"type": "window", "x": 360, "y": 30, "w": 70},
    {"type": "sofa", "x": 55, "y": 90, "w": 150, "h": 55},
    {"type": "dining-table", "x": 60, "y": 160, "w": 100, "h": 60, "seats": 1},
    {"type": "stove", "x": 360, "y": 55, "w": 60, "h": 50, "burners": 4},
    {"type": "sink", "x": 420, "y": 55, "w": 50, "h": 40},
    {"type": "bed", "x": 300, "y": 55, "w": 140, "h": 110, "pillows": "double"},
    {"type": "desk", "x": 300, "y": 270, "w": 80, "h": 45},
    {"type": "toilet", "x": 40, "y": 220, "w": 45, "h": 65},
    {"type": "bathtub", "x": 120, "y": 215, "w": 80, "h": 55},
    {"type": "dim", "x1": 30, "y1": 380, "x2": 470, "y2": 380, "label": "11.0 m", "offset": 20},
    {"type": "dim", "x1": 500, "y1": 30, "x2": 500, "y2": 350, "label": "8.0 m", "offset": -20}
  ]
}
```

POST this to `https://skissify.com/api/render` and get a complete studio apartment floor plan in under 200ms.

---

## What You Can Build With This

Some use cases I've seen or built:

**Property listing generator.** Describe a property in natural language, have an LLM generate the Skissify manifest, embed the floor plan SVG in the listing automatically.

**Architectural chatbot.** Let users describe their dream home in plain English. The agent iteratively refines the floor plan based on feedback, each iteration producing a new sketch.

**Space planning tool.** Furniture arrangement assistant that accepts a room description and suggests layouts, visualizing each option.

**Documentation auto-illustration.** GitHub Actions trigger generates an architecture diagram on every significant code change.

**Real estate agent assistant.** Before the client visit, generate a rough floor plan from the property sheet so the agent has something to gesture at.

---

## The Bigger Picture

The ability for AI agents to produce precise visual output — not approximate image-generation output, but structured, accurate diagrams — is genuinely new.

For years the assumption was that AI could generate text and images but not technical drawings. Text generation has obvious limitations for spatial content. Image generation (Dall-E, Midjourney) produces visually plausible but imprecise output — beautiful impressions, not specifications.

The JSON-to-sketch model is different: the AI produces a data structure that encodes precise spatial relationships, and the renderer converts it to a pixel-perfect (within the hand-drawn aesthetic) output. The AI's job is to generate good JSON, not to hallucinate pixels.

This is the same insight behind Mermaid (text-to-diagram) and PlantUML — but with a richer element library, a hand-drawn aesthetic designed for early-stage communication, and an architecture built from the ground up for agentic use.

Floor plans are the flagship use case because they combine the most complexity (coordinate-precise architecture elements) with the most obvious value (seeing a layout vs. reading about it). But the same approach works for wireframes, network diagrams, org charts, seating arrangements — anything that lives in two-dimensional space.

---

*Skissify is a hand-drawn sketch API for AI agents and developers. Free tier, no auth required. Try it at [skissify.com](https://skissify.com) or check the agent documentation at [skissify.com/for-agents](https://skissify.com/for-agents).*
