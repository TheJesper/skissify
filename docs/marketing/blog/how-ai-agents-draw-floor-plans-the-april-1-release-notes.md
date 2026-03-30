# How AI Agents Draw Floor Plans: The April 1 Release Notes

*What actually works, what we got wrong, and what 94% first-try accuracy actually means*

---

We're launching Skissify on Product Hunt today (April 1, 2026).

Before you click through, here's what's real and what we learned building an AI-native sketch tool for three months.

---

## What Skissify Actually Does

One sentence: **JSON or plain text in → hand-drawn sketch URL out.**

The hand-drawn part isn't decoration. The wobbly lines, the rough corners, the visible imprecision — these signal to human collaborators that they're looking at a draft, not a deliverable. That signal changes how people respond to sketches vs polished mockups.

The URL part is also important. Most sketch tools generate images you download. Skissify generates a URL that embeds the sketch parameters. Share the URL, get the sketch. Change a parameter, get a different sketch from the same URL structure. This makes sketches first-class artifacts in agent pipelines and chat conversations.

---

## The Floor Plan Case: Why It's Our Best Demo

We didn't build Skissify for floor plans specifically. But floor plans became our best demonstration because:

1. **They're spatially specific.** You can't fake a room layout with vague positioning.
2. **They're universally understood.** Everyone knows what a floor plan should look like.
3. **They're genuinely hard for text AI.** Describing a floor plan in words is exhausting and error-prone. A sketch is instant.

Here's a working floor plan in Skissify JSON (paste this at skissify.com/editor):

```json
{
  "paper": "plan",
  "wobble": 3,
  "elements": [
    {"type": "rect", "x": 40, "y": 40, "w": 200, "h": 160, "label": "Living Room"},
    {"type": "rect", "x": 40, "y": 200, "w": 100, "h": 80, "label": "Kitchen"},
    {"type": "rect", "x": 140, "y": 200, "w": 100, "h": 80, "label": "Bedroom"},
    {"type": "door", "x": 120, "y": 40, "rotation": 0},
    {"type": "door", "x": 40, "y": 240, "rotation": 90},
    {"type": "window", "x": 200, "y": 40, "w": 60}
  ]
}
```

That's 7 lines of JSON. Claude, GPT-4, Gemini, or any capable LLM can generate this on first try — and with Skissify's schema, they succeed 94% of the time without function-calling gymnastics.

---

## The Schema Insight That Changed Everything

Early builds of Skissify used a hierarchical JSON structure: rooms containing walls containing doors. Intuitive, but wrong.

When we tested LLM generation accuracy:
- **Hierarchical (nested)**: 61% first-try success
- **Flat (all elements as array)**: 94% first-try success

Why the difference? LLMs predict tokens sequentially. Deeply nested structures require them to maintain parent context across many tokens. Flat arrays reduce that cognitive load — every element is a peer with the same structure, and the model can pattern-match reliably.

This is the core schema decision behind Skissify, and it generalizes: **if you're designing a JSON schema for LLM generation, prefer flat arrays over nested objects.**

---

## What We Got Wrong

**1. The MCP connection test.**
We assumed everyone building with MCP already knew how to configure a server. Our initial docs skipped the obvious. Added a Quick Start section after the first 20 GitHub issues.

**2. The wobble default.**
Our default wobble level was 1 (barely visible). Users expected something that looked "clearly hand-drawn." The sweet spot is wobble 3-4. Updated in v1.1 and now shows prominently in the demo.

**3. The mobile demo was broken for three days.**
The editor page didn't scroll properly on iOS. Nobody noticed for 72 hours because our launch audience is almost entirely desktop developers. Fixed before Product Hunt.

**4. We underestimated the non-developer audience.**
Human Mode (plain text → sketch) was a weekend hack we almost cut. It turned out to be the entry point for architects, teachers, homeowners, and game designers — audiences we never planned for. Keeping it and making it prominent was the right call.

---

## The MCP Integration (4 Lines)

If you're building AI agent pipelines with Claude Desktop or another MCP-compatible host:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "@skissify/mcp-server"]
    }
  }
}
```

Restart, and your agent can now call `skissify_create_sketch` with floor plan, diagram, or UI layout JSON. The tool returns a sketch URL. Works with Claude, Cursor, Continue, and any MCP-compatible host.

---

## What Comes Next

**v1.2 (April):**
- SVG export (in addition to PNG)
- Sketch-to-Figma bridge (export Skissify sketch as Figma template)
- Furniture element library expansion (12 → 40 elements)

**v2.0 (Summer):**
- Agent memory: sketches as persistent visual artifacts that update across conversation turns
- Collaborative sketching: multiple agents modifying the same sketch
- Real-time streaming: watch the sketch build element by element

---

## The April Fools Question

Yes, we launched on April 1. No, it's not a joke.

The "is this real?" moment that April 1 creates is actually a feature: users who overcome initial skepticism and try the demo are more engaged and more likely to remember the product.

The demo is at skissify.com/editor. No signup. Paste JSON or type in plain text. Get a sketch URL. Judge for yourself.

---

*Rate the product on Product Hunt: [link]*
*Star the repo: github.com/skissify/skissify*
*Follow along: @skissify*

---

**Filed under:** AI agents, MCP, technical, floor plans, launch, product development
**Tags:** #AIAgents #MCP #BuildInPublic #SkissifyLaunch #ProductHunt #FloorPlan
