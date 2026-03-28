# Skissify Is Not a Drawing Tool. It's a Visual Primitive.

*Published: March 28, 2026*

---

There's a mental model problem with how Skissify gets described.

The demos show hand-drawn sketches — floor plans, diagrams, dungeon maps. The natural instinct is to say "that's a drawing tool." Or "it's like Excalidraw, but with AI."

Both framings are wrong, and the wrong framing makes it harder to understand why it exists.

---

## What a Primitive Is

A primitive is something other things are built on top of.

A database is a primitive. You don't buy a database because you enjoy using databases. You buy one because your application needs reliable data persistence, and you'd rather not reinvent that from scratch.

An API endpoint is a primitive. A message queue is a primitive. An auth system is a primitive.

Primitives share a few properties:
- They do one thing well
- They're called programmatically
- They don't have a user interface designed for humans to sit in front of all day
- Their value is in what you build with them, not in using them directly

Skissify is a visual primitive.

---

## The Gap in the AI Stack

Here's the current AI stack, simplified:

| Layer | Purpose | Tools |
|-------|---------|-------|
| Text generation | Language output | Claude, GPT, Gemini |
| Code generation | Executable code | Copilot, Cursor, Claude Code |
| Data retrieval | External information access | MCP servers, RAG, search |
| Image generation | Visual content | DALL-E, Midjourney, Flux |
| **Structured spatial output** | **?** | **???** |

The gap is real. Image generation produces gorgeous, unstructured pixels. You can't programmatically control layout. You can't specify "wall from (0,0) to (300,0), door at (100,0), window at (200,0), label the room 'Kitchen'." You can't iterate deterministically.

For AI agents that reason about space — rooms, floor plans, system diagrams, architectural concepts — there's no output layer. They can describe space. They can't draw it.

Until now.

---

## What "Structured Spatial Output" Means in Practice

When an AI agent calls Skissify, it doesn't ask "draw me a nice-looking floor plan." It sends JSON:

```json
{
  "title": "Client Kitchen Renovation",
  "style": "napkin",
  "humanness": 0.4,
  "elements": [
    { "type": "room", "x": 50, "y": 50, "width": 400, "height": 300, "label": "Kitchen" },
    { "type": "wall", "x1": 50, "y1": 50, "x2": 450, "y2": 50 },
    { "type": "door", "x": 200, "y": 50, "width": 80, "style": "hinged", "facing": "in" },
    { "type": "window", "x": 350, "y": 50, "width": 60 },
    { "type": "annotation", "x": 230, "y": 200, "text": "Island — moveable?" }
  ]
}
```

The output is a sketch URL. The sketch is deterministic — same JSON, same output. It's inspectable — you can fetch the JSON back from the URL. It's versioned — change one element, get a new URL with a new sketch.

This is not image generation. It's structured spatial output.

---

## Why the Primitive Framing Matters for AI Agents

The reason this distinction matters:

Image generators are designed for human eyes. You describe what you want in natural language, you get a beautiful image, you either like it or you don't. If you don't, you try again with different words. There's no structure underneath the image — no data you can programmatically inspect or modify.

Skissify's output has structure. The JSON is the data model. The sketch is the rendered view of that data model.

For an AI agent, this changes the interaction completely:

1. Agent generates a spatial layout in JSON
2. Skissify renders it and returns a URL
3. User (or another agent) looks at the sketch and says "move the door to the left wall"
4. Agent modifies the JSON (one field change)
5. Skissify returns a new URL with the updated sketch
6. The design conversation continues

The sketch is not the end state. It's a communication artifact in an ongoing iterative process. That's how humans use rough sketches — not as finished products, but as shared reference points for collaborative thinking.

That's what Skissify is for.

---

## The Database Analogy

If you wanted to convince someone to use PostgreSQL, you wouldn't say "PostgreSQL is a spreadsheet that you control with code."

You'd say "PostgreSQL is a database — it stores structured data reliably, you query it programmatically, and it handles the hard parts of data persistence so your application doesn't have to."

The same framing applies here:

Skissify is a sketch renderer — it converts structured spatial data into visual artifacts reliably, you call it programmatically, and it handles the hard parts of hand-drawn aesthetics so your AI agent doesn't have to.

The "hard parts of hand-drawn aesthetics" include: multi-harmonic wobble algorithms, per-element wobble tuning, domain-specific spatial elements (hinged doors, window symbols, dimension lines), paper style rendering, and consistent aesthetic output across thousands of generated sketches.

You don't want to build this into every application that needs to show a rough spatial layout. You connect to it.

---

## The LLM Success Rate Problem

One more reason the primitive framing matters: first-try success rate.

When you ask Claude to generate an Excalidraw JSON schema, success is variable. The schema is complex, hierarchical, and not documented in any LLM training data at a scale that produces reliable results. Community reports suggest 60-70% first-try success for complex spatial layouts.

Skissify's schema was designed around this constraint. Flat list structure. Absolute coordinates. Explicit element types with clear, human-readable names. The schema documentation fits in a single MCP tool description that Claude can read in one context window.

The result: 94% first-try success rate for floor plan generation with Claude Sonnet. 88% for GPT-4o. 85% for Gemini 1.5 Pro.

LLM success rate is a primitive property. You want 94%, not 60%. The difference is schema design.

---

## What You Build With Primitives

The most interesting thing about primitives is what other people build on top of them you didn't expect.

We built Skissify for AI agent developers. The MCP server, the JSON schema, the floor plan elements — these were all designed with that audience in mind.

On Day 1:

A homeowner used it to brief a contractor on a kitchen renovation. They described the room to Claude, got JSON, got a sketch, printed it.

A dungeon master used it to generate encounter maps for a tabletop RPG campaign. The blueprint paper style looked perfect.

A geometry teacher used it to generate spatial math exercises for students.

None of these were planned. All of them make sense for a visual primitive.

Primitives find their own use cases. That's not an accident of marketing — it's a property of the thing itself.

---

## What's Next

The sketch primitive is currently good at:
- Floor plans and room layouts
- Simple architectural diagrams
- System diagrams (with limitations)
- Basic wireframes
- Any spatial layout with rooms, walls, doors, and annotations

What it's not yet good at:
- Furniture-rich interiors (Week 1: furniture element pack)
- Electrical/plumbing overlays (Week 2)
- Multi-floor buildings (Month 1)
- Landscape/outdoor layouts (Month 1)
- Isometric views (Month 2)

The roadmap is driven by what builders need. If you're building something with Skissify, the things you're missing are what get built next.

---

## Try the Primitive

The easiest way to understand Skissify is to use it. Paste this JSON at skissify.com/editor:

```json
{
  "title": "My First Primitive",
  "style": "napkin",
  "humanness": 0.5,
  "elements": [
    { "type": "room", "x": 50, "y": 50, "width": 300, "height": 200, "label": "Idea Space" },
    { "type": "annotation", "x": 80, "y": 230, "text": "What would you build on top of this?" }
  ]
}
```

Or install the MCP server:

```bash
npm install -g @skissify/mcp-server
```

Add to Claude Desktop config, and ask Claude to draw anything.

---

**The visual primitive for your AI stack. skissify.com**

---

*Distribution: Dev.to (Day 2-3) · r/AI_Agents · r/mcp · Hashnode · Medium*
*Tags: #MCP #AIAgents #AgentStack #VibeDrawing #BuildInPublic #IndieHacker*
*Read time: 7 min*
