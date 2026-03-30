# Claude Code Went Viral. Now Give It a Pencil.

*Posted March 31, 2026 — Launch Eve | Skissify Blog*

---

Something happened over the winter of 2025 that nobody quite predicted: non-programmers started using Claude Code.

Not to write software. Not to deploy infrastructure. But to build things — physical things they lived in, worked in, planned around. A homeowner used it to sketch a kitchen renovation layout. A teacher used it to generate lesson plan diagrams. A dungeon master used it to produce campaign maps.

The vibe coding moment wasn't just about code. It was about the discovery that AI could be a collaborator in the physical world, not just the digital one.

But there was a gap. Claude Code can write your app. It can plan your architecture. It can reason about space. What it couldn't do — until now — was **draw**.

---

## The Output Problem

Here's what LLMs produce:
- Text
- Code
- Structured data

Here's what they struggle to produce:
- Visual output

The irony: LLMs reason spatially all the time. Ask Claude to design a floor plan and it will describe room positions, dimensions, adjacency relationships with remarkable accuracy. But that spatial reasoning lives in text. There's no way to see it.

Until you give it a pencil.

---

## What Skissify Does

Skissify is a sketch API and MCP server. You give it JSON (or plain text) describing spatial elements — rooms, shapes, arrows, labels — and it returns a URL to a hand-drawn sketch.

The sketch looks like this: rough, wobbled lines, as if a human drew it quickly on paper. That aesthetic isn't a limitation. It's the point.

Hand-drawn sketches signal **draft**. They invite feedback in a way polished mockups don't. When you show someone a Figma-quality rendering, they assume decisions have been made. When you show them a napkin sketch, they lean in and say "what if we moved this over here?"

That's the signal Skissify preserves — even when the "pencil" is an AI.

---

## The Claude Code Connection

When Claude Code went viral, the most common use case wasn't app development. It was **layout** — helping people visualize how things fit together in space. Kitchen layouts. Office floor plans. Classroom configurations. Game maps.

For every one of those use cases, the workflow was: Claude reasons about space → outputs text description → human re-draws it somewhere.

Skissify removes that middle step. Claude reasons about space → POST to Skissify API → sketch URL in the conversation.

Four lines of MCP config:

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

That's it. Next conversation, Claude can draw.

---

## What the Data Says

We benchmarked LLM performance on sketch JSON schemas:

- **Flat array schema**: 94% first-try accuracy
- **Nested object schema**: 61% first-try accuracy

The difference is architectural, not model-specific. LLMs generate sequences. Flat arrays match that cognitive shape. Nested objects require backtracking and self-correction.

This insight generalizes: if you're building an AI API, flat schemas outperform nested schemas for LLM integrations. We learned this building Skissify, but it applies everywhere.

---

## The Vibe Drawing Thesis

Vibe coding was "describe what you want, get code back."

Vibe drawing is "describe what you want, get a sketch back."

The same shift — from precise instruction to intent-level communication — but for visual output. You don't specify coordinates. You describe the room. The agent figures out the geometry.

That's what Skissify's Human Mode does. Type "3-bedroom apartment with open kitchen, master bedroom has ensuite" and get a sketch URL. No JSON. No coordinates. Just intent.

---

## Launching Today

Skissify is on Product Hunt April 1. Yes, April Fools Day. That's not an accident.

The theory: anyone who sees it on April 1, thinks "wait, is this real?", and checks the demo anyway is a higher-quality user than cold traffic. The skepticism-to-curiosity conversion is the funnel.

Free tier: 100 renders/day, no signup required. MCP server, REST API, Human Mode, editor.

Try it: [skissify.com/editor](https://skissify.com/editor)

---

*Claude Code gave developers a voice. Skissify gives that voice a pencil.*
