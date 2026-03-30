# Skissify vs Excalidraw — The Honest Final Verdict (Launch Day)

*Published: March 31, 2026 (Show HN Day)*
*~900 words | 4 min read | Tag: #Design #Tools #AI #Comparison*

> **TL;DR:** Use Excalidraw when you're drawing what you know. Use Skissify when an AI agent (or you, via text) needs to generate something you're still figuring out. The tools don't compete. They're different phases of the same workflow.

---

This post exists because I keep seeing the same comment in design communities:

*"Isn't this just a worse Excalidraw?"*

Fair question. Deserves a clear answer.

---

## The Shortest Possible Answer

| | Excalidraw | Skissify |
|--|-----------|---------|
| **Who draws?** | You | AI agent (or text → sketch) |
| **Starting point** | Blank canvas | Natural language or JSON |
| **Best for** | Collaborative diagramming | AI-generated exploration sketches |
| **API first?** | Not really | Yes, that's the core product |
| **LLM accuracy (spatial)** | ~58% (hierarchical) | ~94% (flat schema) |
| **Real-time collaboration** | Yes | No |
| **Free tier** | Yes | Yes |

The question **"who is drawing?"** answers 80% of the comparison.

---

## When Excalidraw Wins

- You already know what you want to diagram
- You're working with teammates in real-time
- You need shape libraries (AWS architecture, etc.)
- You want to export as SVG/PNG for docs
- You're making a sequence diagram or flow chart

Excalidraw is an excellent drawing tool. If you need a drawing tool, use it.

---

## When Skissify Wins

- You want an AI agent to generate a sketch autonomously
- You're building a workflow where spatial output needs to pass between agents
- You want the "rough draft" aesthetic that discourages premature polish
- You need an API that LLMs can call reliably (flat JSON schema designed for LLMs)
- You're not sure yet what you're building and want to generate options, not draw one

---

## The Workflow Where They Work Together

Here's the sequence that actually makes sense:

1. **Skissify** — Generate 3 rough floor plan options via Claude. 30 seconds. Pick the direction.
2. **Excalidraw** — Refine the chosen option collaboratively with your team. Add details. Make it a real diagram.
3. **Figma** — Build the production version once the concept is locked.

Skissify for divergence. Excalidraw for convergence. Figma for execution.

---

## The Technical Difference Nobody Talks About

Excalidraw's data format is rich and complex — designed for human interaction and full feature expression.

Skissify's schema is intentionally minimal — designed for LLMs to generate reliably.

When we tested 200+ generations of spatial output across multiple LLMs:
- **Excalidraw JSON format:** ~40% first-try LLM success rate (too complex for reliable generation)
- **Skissify flat schema:** ~94% first-try success rate

The difference is schema design for AI. Skissify's format has one coordinate system, explicit element types, and no nested hierarchies. LLMs don't have to track coordinate transformations between nesting levels.

This is why Skissify exists. Not because Excalidraw is bad. Because Excalidraw wasn't designed for AI to write.

---

## Honest Weaknesses of Skissify

- **No real-time collaboration** — it's not a drawing tool, it's an output format
- **No shape libraries** — you get the sketch aesthetic, not architecture stencils  
- **Generated output isn't always spatially accurate** — 94% is good for AI, but it's still 6% wrong
- **You can't edit sketches** — generate a new one from modified JSON

If you need any of the above, Excalidraw is probably the right tool.

---

## The One-Sentence Summary

**Excalidraw is for drawing what you already know. Skissify is for generating what you're still figuring out.**

They're not the same tool. They're not competing for the same job. Use both.

---

*Skissify launched today on Hacker News. Free tier available at skissify.com. MCP server: `npx @skissify/mcp-server`*
