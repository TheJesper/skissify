# Skissify vs Excalidraw: A Decision Tree

**TL;DR:** Excalidraw is great. Skissify is for a specific job Excalidraw doesn't do. Use both. Here's when to use which.

*Platform: Dev.to, r/webdev, r/programming | Publish: Tuesday March 31 (HN day) | Time: 4 min read*

---

## The Lazy Answer

Use Excalidraw if you're drawing manually.

Use Skissify if an AI agent is drawing for you.

That's it. That's the decision. If you want more detail, read on.

---

## What They Have In Common

Both tools produce hand-drawn style output. Both make you feel like you're sketching at a whiteboard. Both are free to start. Both produce shareable links.

This overlap is why people compare them. But the actual use cases barely intersect.

---

## The Decision Tree

```
Are you drawing the sketch yourself?
├── YES → Use Excalidraw
└── NO (AI/agent is drawing) → Use Skissify

    Does your AI need to output structured spatial data via API?
    ├── YES → Skissify (REST API, JSON schema, MCP server)
    └── NO (you just want a visual tool) → Use Excalidraw
    
    Do you need the sketch to be embedded in an agent workflow?
    ├── YES (LangGraph, CrewAI, Mastra, n8n, Claude Desktop) → Skissify
    └── NO → Use Excalidraw
    
    Do you need manual editing after generation?
    ├── YES (drag elements, edit labels, add arrows) → Use Excalidraw after
    └── NO (good enough to think with) → Skissify is sufficient
```

---

## The Real Difference: Input Mode

**Excalidraw's input:** Mouse, keyboard, touch. A human sits down and draws.

**Skissify's input:** JSON or plain text. A human describes, or an AI generates.

These aren't competing paradigms. They're sequential. The ideal workflow:

1. **Skissify** — AI generates a rough spatial concept from a text prompt
2. **Evaluate** — Is the structure right? Does the layout make sense?
3. **Excalidraw** — If you need to hand-edit, refine, or present it

Skissify is the "good enough to think with" stage. Excalidraw is the "good enough to share with stakeholders" stage.

---

## Feature Comparison Table

| Feature | Skissify | Excalidraw |
|---------|---------|------------|
| AI/LLM native input | ✅ First-class (JSON schema) | ❌ Not designed for this |
| MCP server (Claude Desktop) | ✅ Built-in | ❌ No official MCP |
| REST API for programmatic render | ✅ Yes | Limited (manual export only) |
| Human manual drawing | ❌ | ✅ Full drawing suite |
| Real-time collaboration | ❌ (not yet) | ✅ Multiplayer |
| Arrows & connectors | ❌ (rectangles, doors, windows) | ✅ Full connector library |
| Text & sticky notes | ❌ | ✅ Full text support |
| Export (SVG, PNG, PDF) | ❌ (coming Week 2) | ✅ Multiple formats |
| Floor plan elements | ✅ (room, door, window, wall) | Partial (requires workarounds) |
| Wobble/hand-drawn intensity control | ✅ (0-10 parameter) | ❌ Fixed aesthetic |
| Paper styles (napkin/graph/blueprint/villa) | ✅ 4 styles | ❌ Single style |
| Free tier | ✅ 10 sketches/month | ✅ Unlimited (open source) |
| Self-hostable | Partial | ✅ Fully open source |
| LLM success rate (1st try) | 94% (Claude Sonnet 4) | ~60% (community MCP wrapper) |

---

## When Skissify Beats Excalidraw

**You're building an AI agent that needs to output spatial data.**

Excalidraw has an unofficial MCP server (GlyphMCP) built by the community. It's useful but not designed for LLM input — the schema is complex and first-try success rates are around 60-70%.

Skissify's schema was designed from the ground up for LLM generation. Flat list. Absolute coordinates. Clear element types. 94% first-try accuracy.

**You're a homeowner who wants to sketch a room without learning a design tool.**

Human Mode: describe your room in plain text, get a hand-drawn sketch. No JSON, no drawing skills, no account required for the first sketch.

**You're prototyping at speed and the sketch is for thinking, not presenting.**

Skissify is faster to generate than it is to draw in Excalidraw. If you need a rough concept in under 10 seconds, JSON or text → Skissify wins.

**You want your AI coding agent to "see" the layout.**

Sketch URLs are permanent and inspectable. An agent can include a URL in its memory, retrieve it later, and generate a revised version. This is spatial memory for agents — Excalidraw doesn't have an equivalent.

---

## When Excalidraw Beats Skissify

**You need to draw by hand.**
Excalidraw is one of the best hand-drawing tools available. Skissify doesn't let you draw at all.

**You need arrows, connectors, or text boxes.**
Skissify only renders rooms, doors, windows, walls, and labels. It's a floor plan tool. Excalidraw handles general-purpose diagrams.

**You need real-time collaboration.**
Excalidraw has multiplayer. Skissify doesn't (yet).

**You need export formats.**
Excalidraw exports to SVG, PNG, clipboard. Skissify only generates a sketch URL today.

**You need full open-source control.**
Excalidraw is MIT licensed and fully self-hostable. Skissify has partial self-hosting support.

---

## The "Why Not Just Use Both?" Answer

The cleanest workflow for AI-assisted spatial design:

1. **Prompt Claude with MCP** → "Design a 2BR apartment, 70sqm, open kitchen"
2. **Claude generates JSON** → Calls Skissify MCP tool
3. **Skissify returns sketch URL** → Claude includes it in response
4. **Review the sketch** → Does the spatial structure make sense?
5. **Open in Excalidraw** (if needed) → Export the sketch, import, refine manually
6. **Share with stakeholders** → Polished Excalidraw version

Skissify handles steps 1-4. Excalidraw handles steps 5-6. There's no conflict.

---

## One More Thing: The Mermaid Position

There's a third tool that gets mentioned in these comparisons: Mermaid.

Mermaid is excellent for directed graphs, flowcharts, sequence diagrams, ER diagrams — essentially, logical relationships.

Skissify is for spatial layouts — rooms, buildings, floor plans, physical space.

These serve completely different mental models. Use Mermaid for "how does the system work?" Use Skissify for "what does the space look like?"

---

## Summary

| If you're... | Use |
|--------------|-----|
| Drawing manually | Excalidraw |
| Building AI agents that draw | Skissify |
| Diagramming logical relationships | Mermaid |
| Doing all three | All three (different jobs) |

---

*Skissify launched March 27, 2026. Free tier, MCP server, Human Mode. Show HN Tuesday March 31, 09:00 CET.*

*[skissify.com](https://skissify.com) — try it in 30 seconds without signing up via Human Mode.*
