# Vibe Drawing: What Vibe Coding Is Doing to Design

*Published: March 2026 — Cross-post to Dev.to, Hashnode, Medium*  
*~1,400 words | 6 min read*

---

If you've heard of vibe coding, you already understand vibe drawing.

Vibe coding is the practice of describing what you want in natural language and letting an AI write the code. No syntax. No debugging. Just: "make a button that does X" and watch it appear.

Vibe drawing is the same idea — but for visual output.

Describe what you want. Get a drawing.

---

## The Shift Nobody Is Talking About

When Andrej Karpathy coined "vibe coding" in 2025, most people thought about it in terms of software. Write a web app. Generate a script. Build a UI component.

But vibe coding has a design problem nobody solved.

When an AI agent builds your app, it can ship code. When it designs your floor plan, it can... describe it in words? That's not a deliverable.

The gap has always been the same: AI can reason about visual things, but it couldn't output them.

**Vibe drawing closes that gap.**

---

## What Happens When You Tell Claude to Draw

Here's what used to happen when you asked an AI to design a floor plan:

> "Here's a text description of the layout: The living room (30m²) faces south, connected to an open-plan kitchen (18m²) to the north. The master bedroom (20m²) is adjacent to the bathroom (8m²)..."

And you'd have to squint at the words and mentally construct the space.

Here's what happens now with Skissify:

> You: "Design a compact 2-bedroom apartment for a remote worker. Home office space is priority."
>
> Claude: [designs layout, writes JSON, calls Skissify MCP, returns rendered floor plan]

The same reasoning. The same spatial intelligence. But now it outputs a *drawing*.

That's vibe drawing. You described what you wanted. You got a visual artifact.

---

## Why JSON is the Right Interface

This is where some people push back: "Why JSON? Isn't that annoying to write?"

For humans, yes. For AI agents, it's perfect.

LLMs are extraordinary at generating structured data. They can produce valid JSON with complex nested schemas, maintain spatial consistency, and reason about coordinate systems — all without complaint.

The old way of building sketch tools assumed the input would come from a human hand (mouse, touchscreen). Skissify flipped that assumption: the primary user is code or an AI agent, and humans interact via the UI or by pasting structured data.

This is the architectural insight that makes vibe drawing possible. If your sketch tool requires drag-and-drop, no AI can use it. If it requires JSON, every AI can.

---

## The Vibe Workflow in Practice

Let's walk through a real vibe drawing session:

**Step 1: The prompt**
```
You: I'm renovating my kitchen. It's roughly 4m x 5m. Show me a layout with 
an island, proper work triangle, and space for a dining area.
```

**Step 2: Claude's reasoning**
```
Claude: Good kitchen design follows the work triangle principle (sink, stove, 
refrigerator). With 4x5m, here's my recommended layout:
- Work area along the north wall (fridge → counter → stove → sink)
- Island centered at y:200 for prep space + breakfast seating
- Dining zone southeast corner (natural light, away from cooking heat)

Let me draw it...
```

**Step 3: The JSON generation**
```json
{
  "paper": "cream",
  "tool": "pencil",
  "amplitude": 2.5,
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 400, "h": 500, "label": "Kitchen" },
    { "type": "rect", "x": 60, "y": 60, "w": 380, "h": 60, "label": "Countertop N" },
    { "type": "rect", "x": 150, "y": 200, "w": 180, "h": 100, "label": "Island" },
    { "type": "rect", "x": 250, "y": 350, "w": 160, "h": 150, "label": "Dining" },
    { "type": "door-symbol", "x": 50, "y": 450, "w": 80, "h": 20 }
  ]
}
```

**Step 4: The output**
A hand-drawn kitchen layout, rendered in under a second.

**Step 5: Iteration**
```
You: Can you move the island closer to the dining area and add a window on the west wall?

Claude: [generates updated JSON, calls Skissify again, new sketch appears]
```

That's vibe drawing. Iterative, conversational, visual.

---

## Three Patterns Where Vibe Drawing Shines

### 1. Architecture and Real Estate

The floor plan use case is obvious, but it's also just the beginning. Estate agents are using AI to generate layout options for client briefs. Renovation contractors are sketching before committing to CAD drawings. Homeowners are exploring configurations before calling an architect.

The cost curve for "getting a sketch" has collapsed from "hire a draftsperson" to "describe it and see."

### 2. System Architecture and Software Design

When a tech lead needs to communicate a microservices architecture, they could write a Mermaid diagram, open Lucidchart, or... just describe it.

"Show me the dependency graph between our auth service, user service, and payment service" → JSON → sketch.

The resulting diagram is less precise than a formal architecture tool, but that's fine for synchronous communication. It's a sketch. It's for alignment, not implementation.

### 3. UX Wireframing

Before opening Figma, some designers are using Skissify to sketch information architecture. The hand-drawn aesthetic deliberately signals "this is exploratory" — preventing premature polish feedback from stakeholders.

For AI-assisted UX work, this is particularly valuable: "Give me three wireframe options for this checkout flow" can now return three actual drawings, not three paragraphs.

---

## What Makes the Output Look Human

The skeptic's objection: "It's just a computer-generated image. It won't look real."

They're right about the first part. Wrong about the second.

Skissify's rendering engine uses multi-harmonic wobble — not the simple sine-wave offsets that make other "hand-drawn" tools look mechanical.

Three things make the difference:

1. **Multiple overlapping wave frequencies** per line segment, not just one
2. **Seeded randomness per element** — every line has its own tremor character, so a wall at x:100 looks different from a wall at x:200 even with identical settings
3. **Element-specific behavior** — a door arc wobbles differently than a dimension line; a stair tread has tighter tolerances than a freeform rectangle

The result isn't perfect. It's not supposed to be. It's supposed to look like a sketchy, working drawing — which is exactly what early-stage design communication requires.

---

## The Bigger Picture

Vibe coding democratized software creation. Vibe drawing is starting to democratize visual design.

Not the finished product design — that still needs skilled designers with precision tools. But the *early-stage thinking*: what if it looked like this? What if we arranged things differently? Can I see three options before I commit?

That phase used to be bottlenecked on whoever had the sketching skill or the time.

AI removed the bottleneck on reasoning. Skissify removes the bottleneck on rendering.

When every developer can generate a floor plan, every product manager can sketch a wireframe, and every homeowner can visualize their renovation — the surface area of visual thinking expands dramatically.

That's worth building for.

---

## Try It

Skissify is live at [skissify.com](https://skissify.com). The editor is free — paste JSON and see it render instantly, no signup required.

For vibe drawing with Claude, install the MCP server:
```bash
npm install -g @skissify/mcp-server
```

Add it to Claude Desktop, then ask it to draw something.

The gap between "describing a space" and "seeing a space" just got a lot smaller.

---

**Related reading:**
- [How AI Agents Can Draw Floor Plans](/blog/how-ai-agents-draw-floor-plans)
- [Why Hand-Drawn Sketches Beat Figma for Quick Ideas](/blog/why-hand-drawn-sketches-beat-figma)
- [Skissify vs Excalidraw: Different Tools for Different Jobs](/blog/skissify-vs-excalidraw)

**Tags:** ai-agents, vibe-coding, design, mcp, floor-plans, developer-tools, claude, sketching, ux
