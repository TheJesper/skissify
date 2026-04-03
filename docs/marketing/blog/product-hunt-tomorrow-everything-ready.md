# We're Going Live on Product Hunt Tomorrow. Here's Everything We've Built.

*Friday, April 3, 2026 — 13:00 CET*

---

Tomorrow, Skissify goes live on Product Hunt.

It's been three days since we launched to the world — a quiet April 1 drop that turned into something real. Here's the full picture before we hit the bigger stage.

---

## What Skissify Does

Skissify is a REST API that accepts JSON and returns a hand-drawn sketch. Floor plans, system diagrams, wireframes, architectural drawings — anything that can be described as a list of shapes and elements.

The core insight: AI agents can reason precisely about spatial layouts. They can design a 2-bedroom apartment, architect a microservice topology, sketch a UI wireframe. But until Skissify, they couldn't *render* that reasoning. They could describe it. Not draw it.

**The difference between describing and drawing matters.** A description of a floor plan is a paragraph. A drawing is something you can show a contractor, embed in a PR, pass to the next agent in a pipeline.

---

## What We Shipped

**REST API** — JSON in, SVG sketch out. No auth, no SDK, free tier.
```
POST https://skissify.com/api/render
→ returns sketch URL in ~150ms
```

**MCP Server** — Any Claude or Cursor session can call Skissify directly.
```
npx skissify-mcp
```

**Human Mode** — A visual editor for non-developers. Click to add elements, adjust wobble, share. No JSON required.

**26 element types** — walls, rooms, doors, windows, stairs, furniture (bed, sofa, desk, dining table), fixtures (toilet, bathtub, sink), annotations (dimensions, arrows, text), and structural (columns, openings).

**4 paper styles** — cream, white, grid, blueprint. Each has different wobble behavior.

**3 drawing tools** — pencil, ballpoint, ink. Affect line weight and visual character.

---

## What Surprised Us in Three Days

**The dungeon masters.** We built Skissify for AI pipeline developers. The first unexpected audience was D&D dungeon masters using blueprint paper to generate battle maps. Not a joke. They love it.

**Homeowners.** The second unexpected audience: people planning renovations who want to explain their layout to a contractor without learning a full CAD tool. They use the Human Mode editor, not the API.

**Teachers.** A geometry teacher reached out. "I generated 30 practice worksheets in 10 minutes." We didn't see that coming.

**The API accuracy data.** Flat JSON achieves 88–92% valid LLM output on first attempt. Hierarchical schemas: 40–61%. This is the reason our schema is flat. It's worth publishing as its own research.

---

## What We're Asking For Tomorrow

If you find Skissify useful, or see the potential in a sketch API for the agent era:

**Upvote us on Product Hunt.** It matters. Product Hunt upvotes drive discovery for months — their algorithm surfaces well-voted products in searches for months after launch day.

**Leave a comment** telling us what you'd use it for. Even "I'd use this for X" helps us understand where to focus.

**Share with one person** who builds with Claude, Cursor, or any LLM tool. The MCP server is genuinely useful for anyone using Claude Desktop.

---

## The Thing We Haven't Done Yet

The demo video. I know. Day 3, still no video. Today is the day.

60 seconds: Claude Desktop, MCP connected, "draw a small 2-bedroom apartment floor plan", watch the sketch appear and the URL generate. Record. Upload. Done.

If I don't do it today, add it to my tombstone.

---

## Find Us

- **Product Hunt:** [live link tomorrow morning]
- **Website:** skissify.com
- **MCP Server:** `npx skissify-mcp`
- **API Docs:** skissify.com/for-agents

See you tomorrow.

— Jesper, Stockholm
