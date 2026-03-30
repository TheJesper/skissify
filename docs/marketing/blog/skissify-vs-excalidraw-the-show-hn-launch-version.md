# Skissify vs Excalidraw: The Show HN Launch Version

*Launching on Hacker News tomorrow. This is the cleanest version of this comparison I've written.*

---

I've written this comparison eight times. This is the version I'm sharing on launch day, because it's finally honest.

## The One-Sentence Answer

**Are you drawing it yourself?** Use Excalidraw.  
**Is an AI drawing it?** Use Skissify.

That's it. You can stop reading here.

But if you want to understand *why*, keep going.

---

## What Excalidraw Actually Is

Excalidraw is a collaborative whiteboard tool. You drag, you drop, you draw. The hand-drawn visual style communicates "this is a sketch, not a final design" — which is exactly right for collaborative exploration.

It's genuinely excellent. The team has built something that millions of people use every day for legitimate reasons.

## What Skissify Actually Is

Skissify is a JSON-to-sketch API. There's no UI for human drawing. You send structured data, you get back a sketch that looks hand-drawn.

The use case is AI agents. When Claude, GPT-4, or any other LLM wants to produce a visual output — a floor plan, a wireframe, a diagram — Skissify is how it does that.

## The Comparison Table (Honest Version)

| Dimension | Excalidraw | Skissify |
|-----------|------------|----------|
| Who draws | Human | AI agent |
| Input | Mouse/touch | JSON |
| Output | SVG/PNG | Sketch URL |
| Collaboration | Real-time multi-user | Share via URL |
| API | Limited | First-class |
| MCP server | No | Yes |
| Wobble control | Fixed | 0-10 scale |
| Agent pipelines | Not designed for it | Core use case |
| Human UI | Full-featured | Basic (human mode) |

## When to Use Excalidraw

- You're in a meeting and need to whiteboard something live
- You want to draw by hand (literally)
- You're collaborating with non-technical stakeholders who need to draw too
- You need real-time cursor presence

## When to Use Skissify

- An AI agent is generating spatial layouts
- You're building an MCP server that needs visual output
- You want persistent sketch URLs as agent memory
- You're a PM who wants to describe a UI to Claude and get a sketch back
- You're a homeowner briefing a contractor through Claude

## The Overlap

Both tools produce hand-drawn-style visuals. Both communicate "this is exploratory." Both are faster than Figma for rough ideas.

The overlap is human mode in Skissify — you can type to describe what you want and get a sketch without writing JSON. That's more similar to Excalidraw territory. But it's still AI-mediated, not direct drawing.

## The Non-Overlap

Excalidraw has no API designed for LLM generation. You can export JSON, but the schema is complex enough that LLM generation accuracy is low. It wasn't built for agents.

Skissify has no real-time collaboration. You can share URLs, but there's no multi-cursor drawing session.

These aren't weaknesses. They're focus.

## The Honest Recommendation

Use both. They don't compete.

Excalidraw for your whiteboard sessions. Skissify for your agent pipelines. Figma for your production designs.

Three tools, three phases:  
**Skissify → Excalidraw/whiteboard → Figma**

That's the design process in 2026.

---

*Skissify launches on Show HN Tuesday March 31, 2026.*  
*[skissify.com](https://skissify.com) | MCP: `npm install -g @skissify/mcp-server`*
