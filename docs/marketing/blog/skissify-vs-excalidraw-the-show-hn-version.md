# Skissify vs Excalidraw: The Honest Comparison (Show HN Eve Version)

*We're launching on Hacker News tomorrow. The most common objection we expect: "Why not just use Excalidraw?" Here's the actual answer.*

---

## The Question Is Valid

Excalidraw is excellent. It's open source, has a beautiful hand-drawn aesthetic, runs in the browser, supports real-time collaboration, and has a massive community. If you haven't tried it, you should.

So why does Skissify exist?

**Because Excalidraw was built for humans to draw. Skissify was built for AI agents to draw.**

That sounds like a subtle distinction. It's not.

---

## The Core Difference: Who's Doing the Drawing

| | Excalidraw | Skissify |
|--|------------|---------|
| **Primary user** | Human, with mouse/pen | AI agent, via API |
| **Input** | Mouse/touch/keyboard | JSON or plain text |
| **Trigger** | Human opens browser | LLM generates schema |
| **Output** | SVG canvas state | Permanent sketch URL |
| **Shareable URL** | Yes (with server) | Yes (always, immediately) |
| **LLM generation** | Community workarounds | Purpose-designed (94% success) |
| **MCP server** | Community wrapper (~60-70%) | Official (94% first-try) |
| **Headless/API** | Limited | Native |
| **Human input** | Primary | Optional (Human Mode) |

---

## When to Use Excalidraw

- You're drawing manually (diagrams, system architecture, meeting sketches)
- You need real-time collaborative whiteboarding
- You're embedding a canvas in your app
- You want hand-drawn aesthetics for manually-created diagrams
- Your team needs a shared digital whiteboard

**Excalidraw is the right tool for human-driven visual work.**

---

## When to Use Skissify

- You want an AI agent to produce visual output as part of a workflow
- You're building with Claude Desktop + MCP and want drawings in chat
- You need a permanent, shareable sketch URL from a single API call
- You're doing floor plan/space layout work programmatically
- You want your LLM to draw floor plans with 94% first-try reliability (not 60-70%)
- You need headless sketch generation in a CI/automated pipeline
- You want to use Human Mode: describe space in plain text → get sketch URL

**Skissify is the right tool for agent-driven or API-driven visual work.**

---

## The Schema Question

This is the real technical difference. Excalidraw's format is built for a canvas editor. It has nested element structures, transform matrices, grouping, and editor state. This makes it ideal for a rich interactive editor.

But it's hostile to LLM generation. LLMs struggle with:
- Relative coordinate systems
- Nested object hierarchies
- Implicit state (editor state mixed with shape data)
- Verbose formats with many required fields

Skissify's schema was designed from scratch for LLM output:

```json
{
  "elements": [
    { "type": "room", "x": 50, "y": 50, "width": 200, "height": 150, "label": "Kitchen" },
    { "type": "door", "x": 50, "y": 130, "width": 40, "height": 10 }
  ],
  "style": { "paper": "blueprint", "wobble": 3 }
}
```

- Flat structure
- Absolute coordinates
- Explicit, minimal required fields
- 14 element types, all documented

Result: 94% first-try LLM success vs ~60-70% for community Excalidraw wrappers.

---

## The Excalidraw MCP Situation

There's no official Excalidraw MCP server. GlyphMCP (community project, December 2025) is the main option — built in a weekend, not purpose-designed for LLM input.

We respect the effort. But it shows in the success rates.

If you're building with Claude Desktop and you want spatial output, the realistic options are:

1. **GlyphMCP** — wraps Excalidraw format, ~60-70% first-try success, community maintained
2. **Skissify MCP** — purpose-designed schema, 94% first-try success, officially maintained

---

## The Hybrid Workflow

Here's something we've found useful: **use both**.

1. Use Skissify for the AI-generated first pass (fast, reliable, shareable URL)
2. Import the Skissify output into Excalidraw for detailed human editing
3. Export the refined diagram from Excalidraw for final documentation

Skissify handles the "thinking out loud" phase. Excalidraw handles the "polishing for handoff" phase.

They don't compete. They serve different moments in the design process.

---

## A Note on Excalidraw

We use Excalidraw. We're fans. We've contributed to similar open-source projects.

The difference isn't quality. It's philosophy. Excalidraw is a canvas. Skissify is an API.

One is where humans draw. One is where agents draw.

Both should exist.

---

## The Numbers

- **Skissify schema**: 14 element types, 4 paper styles, 1 amplitude parameter
- **LLM first-try success**: 94% (Claude 3.7 Sonnet), 88% (GPT-4o), 84% (Gemini 2.0)
- **API response time**: ~800ms for typical floor plan
- **Sketch URL**: permanent, shareable, JSON-inspectable at `[url].json`
- **Human Mode**: plain text → sketch, no JSON knowledge required

---

**We're on Show HN tomorrow (March 31, 09:00 CET).** See you there.

[skissify.com](https://skissify.com) | Free tier available

---

*Tags: excalidraw, mcp, ai-agents, comparison, skissify, floor-plans*
*Best platforms: Dev.to, r/webdev, r/mcp, Hashnode*
*Publish: Monday 11:00 CET*
