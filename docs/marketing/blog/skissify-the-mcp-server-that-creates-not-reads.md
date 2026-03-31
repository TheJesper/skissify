# The MCP Server That Actually Creates Things

**By Jesper | April 1, 2026**

---

There are over 12,000 MCP servers in the wild now.

Almost all of them do the same thing: they **read**. They fetch your calendar. They search your emails. They query your database. They retrieve a file.

That's useful! But it's half a story.

An AI agent that can only consume information is like a contractor who can read blueprints but can't pick up a hammer. At some point, you need to make something.

Skissify is an MCP server that **creates** — specifically, it creates hand-drawn sketches.

---

## What "creative output" means in practice

When you add Skissify to Claude Desktop or Cursor, you give your AI agent a new verb:

**Draw.**

You ask Claude: *"Sketch a floor plan for a 2-bedroom apartment with an open kitchen."*

Claude doesn't describe the floor plan in text. Claude doesn't link you to a design tool. Claude **constructs the JSON** and calls Skissify's MCP tool directly.

Thirty seconds later: a wobbly, hand-drawn floor plan appears. It looks like something you'd sketch on a napkin, not a blueprint from a CAD program. That's intentional.

---

## Why hand-drawn is the right default for AI output

Here's the thing most people miss about sketch aesthetics:

**Rough sketches invite iteration. Polished designs invite criticism.**

When a human sees a wobbly floor plan, they think: *"This is a draft. I can push on it."*

When they see a clean Figma mockup, they think: *"Someone worked hard on this. I shouldn't break it."*

Skissify renders output that communicates its own draft status. That's not a limitation — it's a design choice that makes AI-generated visuals more useful in collaborative workflows.

---

## The technical difference: write tools vs read tools

Most MCP servers implement `get_*` or `search_*` or `read_*` tools.

Skissify implements `render_sketch` — a **write** tool that produces a new artifact.

The response is a URL to a publicly accessible SVG or PNG. This URL is:
- Embeddable in docs and presentations
- Shareable with stakeholders
- Usable as agent memory (the URL persists — store it, reference it later)
- Downloadable as PNG or SVG

```json
// Claude calls this MCP tool internally:
{
  "tool": "render_sketch",
  "input": {
    "paper": "cream",
    "drawingTool": "pencil",
    "wobble": 2,
    "elements": [
      { "type": "wall", "x1": 50, "y1": 50, "x2": 250, "y2": 50 },
      { "type": "wall", "x1": 250, "y1": 50, "x2": 250, "y2": 200 },
      { "type": "door", "x": 150, "y": 50, "rotation": 0 },
      { "type": "text", "x": 130, "y": 130, "text": "Living Room" }
    ]
  }
}
```

The output: `https://skissify.com/s/abc123` — a shareable sketch URL.

---

## Why this pattern matters for agent architecture

Think about multi-agent pipelines. An orchestrator agent tasks a specialist agent with producing a diagram. Until now, the options were:

1. Describe it in text (inadequate)
2. Generate Mermaid/PlantUML (technical, not visual)
3. Output a Figma share link (requires human interaction)
4. Hallucinate an SVG path (messy, often broken)

With Skissify, the specialist agent calls `render_sketch`, gets a URL, and hands it back to the orchestrator. The URL becomes a persistent artifact in the agent's working memory.

This is the **missing output format** in the AI agent stack.

---

## Use cases that actually exist today

**Architecture / floor plans** — describe a layout, get a floor plan. Real estate agents are using this to quickly sketch listings. Homeowners use it to visualize renovation ideas with Claude.

**Wireframing** — product managers describing UI flows to Claude can now get actual sketches, not just verbal descriptions.

**System architecture diagrams** — software teams use Skissify to generate quick infra diagrams for Slack and Confluence.

**D&D / game maps** — unexpectedly popular. Dungeon masters describe dungeon layouts and get hand-drawn dungeon maps.

**GitHub Actions** — on PR merge, generate a diagram of what changed. Still experimental, but genuinely cool.

---

## Getting started in 60 seconds

Add to your Claude Desktop config:

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

Or call the REST API directly (no auth, no rate limits):

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","drawingTool":"pencil","wobble":2,"elements":[{"type":"rectangle","x":50,"y":50,"width":200,"height":150},{"type":"text","x":130,"y":120,"text":"Hello World"}]}' \
  --output sketch.svg
```

---

## The ecosystem gap this fills

The MCP ecosystem has excellent tools for:
- Memory and retrieval (mem0, Chroma)
- Code execution (E2B, Modal)
- Web browsing (Playwright MCP, Puppeteer)
- File operations (filesystem)
- API integrations (hundreds of them)

What it doesn't have: **a first-class visual creation tool**.

Skissify fills that gap. Not with a chart library. Not with a data visualization framework. With something that looks like a human drew it on paper — because that's often exactly what you need.

---

**Try it:** [skissify.com](https://skissify.com)  
**MCP:** `npx skissify-mcp`  
**API:** `POST https://skissify.com/api/render` (free, no auth)  
**Product Hunt:** [Vote today →](https://www.producthunt.com/posts/skissify)

---

*Skissify launched April 1, 2026. The launch date was intentional. Yes, it's real.*
