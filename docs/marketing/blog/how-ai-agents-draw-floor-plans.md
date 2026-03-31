# How AI Agents Can Draw Floor Plans

*Published: April 2, 2026 | Category: AI + Design | ~1,400 words*

---

Last month, I described my apartment to Claude.

Not with measurements. Not with AutoCAD files. Just: "Two bedrooms, open plan kitchen and living room, bathroom near the entrance, balcony off the living room."

Thirty seconds later, it produced a JSON structure. Thirty seconds after that, I had a hand-drawn floor plan. With rooms, walls, doors that swing the right way, windows, a bathroom with a toilet and bathtub, and dimension lines showing approximate sizes.

This is what I want to talk about: **AI agents that can actually draw**.

---

## The Gap in Current AI Tools

Today's LLMs are remarkably good at describing visual things. Ask Claude to design a floor plan and you'll get a detailed textual description: "The entrance opens into a hallway. To the left is the kitchen, approximately 4×3 meters. The living room is open-plan with the kitchen..."

But they can't draw. They can't produce a JPG or SVG of that description. At best, they generate ASCII art or rough code that approximates an image.

The result is a frustrating gap. The intelligence is there. The ability to translate that intelligence into visual output isn't.

Tools like Dall-E and Midjourney close part of this gap — but for precise technical drawings (floor plans, wireframes, system diagrams), image generation models fall short. They produce impressions, not specifications. The wall might be in roughly the right place, but not exactly. The door might be on the correct side, or it might not. It's beautiful, but not reliable enough for actual use.

What's needed is a different approach: **structured visual output**.

---

## The JSON-to-Sketch Model

The insight behind Skissify is simple: if you can describe a drawing as a data structure, you can render it precisely and deterministically.

A floor plan, at its core, is just:
- Walls (lines with positions and lengths)
- Rooms (rectangles with labels)
- Doors (symbols with positions and orientations)
- Windows (symbols on walls)
- Furniture (icons at positions)
- Dimensions (lines with measurements)

Every one of these is perfectly expressible as JSON. And JSON is something LLMs are exceptionally good at generating.

Here's what a simple two-room apartment looks like as Skissify JSON:

```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "inkColor": "#222",
  "amplitude": 0.6,
  "waves": 0.8,
  "humanness": 0.15,
  "width": 640,
  "height": 480,
  "elements": [
    { "type": "line", "x1": 50, "y1": 50, "x2": 450, "y2": 50, "wallWidth": 8 },
    { "type": "line", "x1": 50, "y1": 50, "x2": 50, "y2": 400, "wallWidth": 8 },
    { "type": "line", "x1": 450, "y1": 50, "x2": 450, "y2": 400, "wallWidth": 8 },
    { "type": "line", "x1": 50, "y1": 400, "x2": 450, "y2": 400, "wallWidth": 8 },
    { "type": "line", "x1": 250, "y1": 50, "x2": 250, "y2": 400, "wallWidth": 6 },
    { "type": "door-symbol", "x": 50, "y": 200, "w": 60, "wall": "v", "swing": "right" },
    { "type": "door-symbol", "x": 250, "y": 180, "w": 50, "wall": "v", "swing": "left" },
    { "type": "window", "x": 100, "y": 50, "w": 80, "wall": "h" },
    { "type": "window", "x": 300, "y": 50, "w": 80, "wall": "h" },
    { "type": "text", "x": 130, "y": 230, "text": "Living Room", "fontSize": 18 },
    { "type": "text", "x": 320, "y": 230, "text": "Bedroom", "fontSize": 18 },
    { "type": "bed", "x": 290, "y": 290, "w": 120, "h": 90 },
    { "type": "sofa", "x": 80, "y": 310, "w": 120, "h": 50 },
    { "type": "dim", "x1": 50, "y1": 430, "x2": 450, "y2": 430, "label": "8.0m" },
    { "type": "dim", "x1": 480, "y1": 50, "x2": 480, "y2": 400, "label": "7.0m" }
  ]
}
```

POST this to `https://skissify.com/api/render` and you get back a hand-drawn SVG. Wobbly lines, cream paper, pencil texture. Looks like something you'd sketch in a notebook.

---

## The MCP Integration

The real magic happens when you connect this to an LLM via MCP (Model Context Protocol).

With the Skissify MCP server installed (`npx skissify-mcp`), Claude has direct access to the Skissify API as a tool. When you ask it to draw something, it:

1. Understands what you want
2. Constructs the appropriate JSON
3. Calls the Skissify tool
4. Gets back a sketch URL or SVG

No human in the loop. No copy-pasting JSON. The AI draws.

Here's a real example of how this looks in practice:

**User:** "Draw me a simple floor plan for a small studio apartment with a kitchen, bathroom, and sleeping area."

**Claude:** *(generates JSON, calls Skissify tool, returns)*  
"Here's your floor plan: [rendered sketch]

I've laid out a 40m² studio with:
- Kitchen area in the corner with a stove and sink
- Bathroom along the right wall with toilet and shower
- Sleeping area with a single bed and desk
- Living area with a sofa facing the window

The entrance is on the bottom wall. Would you like me to adjust any room sizes or add furniture?"

This is genuinely useful. Not a description of a floor plan. An actual visual output.

---

## Why Architects (and Non-Architects) Care

The obvious audience for AI-generated floor plans is architects and interior designers. Being able to quickly sketch out a layout via conversation — iterate in seconds — is a meaningful workflow improvement.

But the broader audience is anyone who needs to communicate spatial ideas.

Real estate agents explaining layouts to clients. Renovation contractors planning work. Homeowners planning furniture rearrangements. Product designers sketching app flows. Engineers diagramming system architectures.

In every case, the value is the same: going from idea to visual faster, with less friction, in a format that's immediately understandable.

---

## The Hand-Drawn Aesthetic (And Why It Matters)

There's a specific reason Skissify renders in a hand-drawn style rather than precise technical lines.

A hand-drawn aesthetic signals: **this is a concept, not a specification**. It invites discussion. It reduces the psychological barriers to changing things. Nobody feels bad about marking up a sketch.

Compare this to a precise CAD drawing or Figma frame. Those formats carry implicit weight. They look done. Suggesting changes feels like wasted work.

The wobble is intentional. The slight imprecision is a design choice. When an AI generates a floor plan, you want it to look like the starting point of a conversation — not the end.

---

## Element Types Available

Skissify currently supports 30+ element types relevant to architectural and technical drawing:

**Structural:** line (with wallWidth for double-line walls), rect, circle, arc, opening, column

**Architectural symbols:** door-symbol (swing door with arc), door-slide (sliding door), window, stair

**Furniture & fixtures:** bed, sofa, armchair, dining-table, desk, bookshelf, toilet, bathtub, sink, shower, stove

**Annotation:** text, dim (dimension lines), arrow, dashed line

**Freeform:** path (for freehand curves)

That's enough to draw a complete apartment floor plan, including all rooms, all fixtures, and all annotations.

---

## Building Your Own Agent

If you want to build an agent that can draw, the path is straightforward:

1. **System prompt:** Include the Skissify element types and schema. The API manifest at `https://skissify.com/api/manifest` returns this in machine-readable form.

2. **Tool definition:** Define a `generate_sketch` tool that takes a JSON body and POSTs to `/api/render`.

3. **Output handling:** The API returns SVG. You can embed it in responses, save it as a file, or display it inline.

4. **Iteration:** Let the user describe changes. The LLM updates the JSON and re-renders. Each iteration is instant.

The full example code is at [skissify.com/for-agents](https://skissify.com/for-agents).

---

## What's Coming

We're working on:
- **Image-to-sketch** — upload a photo of a room, get back a simplified sketch
- **Natural language dimension parsing** — "the room is 4 by 3 meters" automatically scales
- **Team collaboration** — multiple agents contributing to the same sketch
- **Git integration** — sketch files in your repo, renderable in CI/CD

The goal is simple: make visual thinking as accessible to AI as text thinking already is.

---

*Skissify is live at [skissify.com](https://skissify.com). The /api/render endpoint is free and requires no auth. MCP server: `npx skissify-mcp`.*
