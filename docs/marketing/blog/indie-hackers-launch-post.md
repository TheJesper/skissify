# Indie Hackers Launch Post: Skissify

*Post this on Indie Hackers at 10:00-11:00 CET April 1, 2026*

---

## Title Options (pick one)

- **"I built a sketch API for AI agents — launching today on Product Hunt"**
- **"Show IH: Skissify — JSON in, hand-drawn sketch out. Built for Claude + other LLMs"**
- **"After 4 months building nights and weekends: my AI sketch tool launches today"**

---

## Post Body

### The problem that started it

Every time I used Claude to help me plan something — a room layout, a product flow, a system diagram — it would describe the thing beautifully in text.

"The bedroom is 4m × 3m. The door is on the north wall. The window faces east."

Great description. Useless for actually understanding the space.

I wanted Claude to *draw* it. Not describe it. Draw.

### What I built

**Skissify** is a REST API that renders hand-drawn SVG sketches from JSON. Describe your scene as structured data. Get back something that looks like a thoughtful human grabbed a pen.

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "cream",
    "drawingTool": "ballpoint",
    "wobble": 2,
    "elements": [
      {"type": "wall", "x1": 50, "y1": 50, "x2": 350, "y2": 50},
      {"type": "door", "x": 150, "y": 50, "width": 80, "rotation": 0}
    ]
  }'
```

No auth required. No rate limits on the free tier. Try it right now.

### Why the hand-drawn aesthetic matters

This was the insight I kept coming back to: **rough sketches communicate intent differently than polished designs.**

A wobbly, imperfect sketch signals "this is an idea — push on it."
A crisp Figma frame signals "someone worked on this — tread carefully."

When you're exploring, you want people to challenge the idea. Polished visuals shut down that conversation too early.

So I built the wobble in on purpose. It's not a limitation — it's the feature.

### The AI angle

The main differentiator is the MCP server: `npx skissify-mcp`

Add it to Claude Desktop or Cursor, and Claude can generate Skissify sketches directly as a tool call. Ask it to sketch your apartment. Watch it construct the JSON and render a wobbly floor plan.

No AI whiteboard tool does this. They all assume a human is operating the UI. Skissify assumes the opposite.

### Numbers today

- Product Hunt: launching today at 07:00 CET
- 30+ element types (walls, doors, windows, furniture, architectural symbols)
- Free tier: no auth, no limits
- MCP server available: `npx skissify-mcp`

### What I'm looking for

- Feedback on the use cases you'd actually pay for
- People who build with LLMs and could use visual output
- Brutal honesty on pricing (free + pro at €12/mo is the plan)
- If you try the API and find weird edge cases, I want to know

**→ Product Hunt:** [link]
**→ Live API:** https://skissify.com/api/render  
**→ Try it:** https://skissify.com

*I launched on April 1st on purpose. Did you try it? It works.* ✏️

---

## Comments to prewrite (post after initial comments come in)

### If someone asks about the technology:
> The rendering is done server-side with Canvas API + custom wobble algorithms for each element type. Floor plan elements (walls, doors, windows) have specialized renderers — walls get a proper double-line treatment, doors get swing arcs, etc. The MCP server wraps the API with natural language descriptions of each element type so the LLM knows what parameters to use.

### If someone asks about competitors:
> Excalidraw is the closest aesthetic comparison but it's a collaborative whiteboard, not an API. It's designed for humans to interact with — you can't POST JSON and get an SVG back programmatically. Mermaid/Graphviz cover flowcharts/graphs but not spatial/architectural layouts. The floor plan niche specifically has basically nothing with a good API.

### If someone asks about revenue:
> Free tier stays free — the /api/render endpoint is genuinely no-auth, no limits. Pro plan (€12/mo) adds: account + saved sketches, custom paper/tool presets, private shareable URLs, higher resolution exports, team workspaces. Targeting developers who build AI agents as the primary paying customer.
