# Your AI Agent Should Draw Before It Types

*Posted: April 2026 — Cycle 117*

---

We've been thinking about AI output wrong.

The standard AI agent loop: think → write → deliver. Text in, text out. Markdown tables, bullet points, JSON responses. Even when the topic is *spatial* — floor plans, system architecture, UI layouts — we expect the agent to express it in text and hope the human can visualize it.

That's backwards.

---

## The Spatial Reasoning Gap

Language models are remarkably good at describing space. Ask Claude to design a two-bedroom apartment layout and you'll get a coherent verbal description: *"The living room opens to the kitchen on the north side, with a 3m×4m bedroom on the east..."*

But there's a gap between describing space and showing it.

Text-based spatial descriptions require the reader to:
1. Parse the coordinates mentally
2. Build a 3D (or 2D) mental model
3. Verify consistency ("does that bedroom actually fit?")
4. Give feedback ("move the kitchen south")

Every step in this loop is slow and error-prone. The agent can generate perfect coordinates and the human will still say "I can't visualize this."

---

## Draw First, Refine Second

The insight behind Skissify is simple: **visual output should happen at the reasoning step, not after it.**

When a Claude agent generates a floor plan and immediately renders it as a hand-drawn sketch, the feedback loop collapses:

- Human sees the sketch → instantly understands the layout
- Spots the problem in 3 seconds ("the corridor is too narrow")
- Gives precise feedback ("widen the corridor to 1.5m")
- Agent updates the manifest → re-renders → new sketch in under 1 second

No text parsing. No mental model construction. No "does this match what the agent described?"

---

## The MCP Pattern

Here's what the tool call looks like in practice when Claude draws before it types:

```
User: "Design a small studio apartment, around 40sqm"

Claude: [Calls skissify_draw with rough layout JSON]
        [Returns sketch URL]
        "Here's a starting layout. Open kitchen on the left, sleeping area
        in back right, bathroom at rear. The sketch is rough by design —
        easy to iterate. What would you change?"
```

The sketch does the heavy lifting. The text becomes a commentary on the visual, not a substitute for it.

---

## When Agents Should Draw

Not every agent task needs visual output. But these categories benefit dramatically:

**Floor plan generation** — obvious. But also:
- **System architecture diagrams** — "here's the proposed microservice layout" as a sketch, not a paragraph
- **UI wireframes** — rough layout before a designer opens Figma
- **Renovation proposals** — "here's what removing that wall would look like"
- **Database schema visualization** — entity relationships as a spatial diagram
- **Network topology** — servers, connections, clusters as a hand-drawn map

The common thread: any task where spatial relationships matter more than precision.

---

## Why Hand-Drawn Specifically

This is the part people initially find strange: why not clean SVG? Why simulate imperfection?

Two reasons:

**1. Psychological signaling.** A polished diagram implies finality. A hand-drawn sketch implies iteration. Users give better feedback to rough outputs — they feel less bad about changing something that "isn't finished yet." Skissify's wobble is intentional UX.

**2. Cognitive fit.** At the ideation stage, pixel-perfect precision is noise. A rough sketch communicates the *structure* without distracting the viewer with measurements they can't evaluate yet. The wobble says "this is a concept, not a blueprint."

---

## The Compound Effect

Add drawing capability to an AI agent and something shifts in how users interact with it.

They stop asking *"can you describe X"* and start asking *"can you draw X."*

That's a higher-fidelity feedback loop. Fewer iterations. Less ambiguity. Better outcomes.

The agents you're building today can already reason about space. Give them a way to show their work.

---

## Try It

MCP server (for Claude Desktop, Cursor, any MCP client):
```bash
npx skissify-mcp
```

REST API (no auth, free):
```bash
POST https://skissify.com/api/render
```

[Docs](https://skissify.com/docs) · [GitHub](https://github.com/jesperhedin/skissify) · [Live demo](https://skissify.com)
