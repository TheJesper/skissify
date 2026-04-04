# How AI Agents Can Draw Floor Plans

*Published: April 5, 2026 — Cycle 133 edition*
*~600 words | 5 min read*
*Tags: #AI #Agents #MCP #FloorPlan #Claude #Mastra #LangGraph #VibeCoding #VibeDrawing #ModelContextProtocol*

---

There is a class of problem AI agents are surprisingly good at and completely unable to *show you*: anything that lives in space.

Floor plans. Network diagrams. Room layouts. Site maps. Furniture arrangements. Infrastructure blueprints.

Ask Claude to design a 35sqm studio apartment and it will reason carefully about traffic flow, natural light, furniture clearances, and bedroom separation. The reasoning is correct. The output is a wall of text that no contractor can read, no homeowner can react to, and no downstream agent can process as spatial state.

Until now, the gap between "AI reasons about space" and "human sees the space" required a human detour. That detour is gone.

---

## Three Minutes to a Drawing Agent

You need three things: Claude Desktop, a terminal, and 180 seconds.

```bash
npx skissify-mcp
```

Add to `claude_desktop_config.json`:

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

Restart Claude Desktop. Claude now has access to `skissify_render`. Ask it to draw anything spatial. It draws it.

That is the complete setup. No API keys. No configuration. No Figma plugin. Three minutes.

---

## What Actually Happens Under the Hood

When Claude calls `skissify_render`, it submits a flat JSON manifest. A manifest is a list of elements — lines, rectangles, arcs, doors, windows, stairs, text labels — each with position, size, and style parameters.

The schema is intentionally flat and human-readable. No nested objects. Every element is a sibling. Claude generates valid manifests 88–92% of the time on first attempt. When it fails, it self-corrects in one additional call.

The renderer applies seeded wobble algorithms to every geometry element — controlled imperfection that makes lines look hand-drawn. The seed is deterministic: same manifest always produces the same sketch. You can hash a manifest and cache the sketch URL. Version-control it. Diff it. Commit it.

This is what makes it useful for production workflows rather than just demos.

---

## Four Workflows That Work Today

**1. Conversational floor planning.** User describes a room in plain language. Claude generates a sketch via MCP. User reacts. Claude adjusts. URL-sharable result at each step.

**2. GitHub Actions as architectural spec.** A CI workflow renders a Skissify floor plan from a committed JSON manifest and attaches it to pull requests. Visual diff of spatial changes. Zero human input required.

**3. Multi-agent handoff.** A planning agent generates a layout manifest. A rendering agent (Skissify) converts it to a sketch URL. A communication agent sends the URL to Slack. No human touched the pen.

**4. LangGraph / Mastra pipelines.** Add Skissify as a tool node in any TypeScript or Python agent framework. The REST endpoint (`POST /render`) is a single HTTP call. Integrate it anywhere you can make an HTTP request.

---

## The Determinism Argument

Every other visual AI output is stochastic. Generate the same prompt twice in DALL-E or Midjourney and you get different pixels both times. You cannot diff two generated images. You cannot store a generated image as ground truth for a system.

Skissify sketches are deterministic. The same manifest produces the same SVG, pixel-for-pixel, every render. That property is unremarkable to a human. For an agent pipeline, it is foundational.

Caching, versioning, hashing, reproducibility — all of these require determinism. AI agents operating on spatial data need deterministic visual output. That did not exist before April 2026.

---

*Try it: [skissify.com](https://skissify.com) | Install MCP server: `npx skissify-mcp` | REST API docs: skissify.com/api*

*#AIAgents #MCP #FloorPlan #Claude #Mastra #LangGraph #VibeDrawing #VibeCoding #BuildInPublic*
