# Why Hand-Drawn Sketches Beat Figma for Quick Ideas: The Homebuilder Test

*Cycle 103 — Thursday April 2, 2026 — r/HomeImprovement + general audience angle*

---

Here's a test I ran last week: took the same renovation idea — a kitchen where I wanted to remove a wall and add an island — and tried to communicate it three different ways.

**Way 1: Describe it in words**
"Remove the west wall between kitchen and living room. Add a kitchen island in the center. Keep the sink on the north wall."

My contractor nodded. Then did something completely different.

**Way 2: Sketch it in Figma**
45 minutes later I had a precise wireframe. My contractor said it was "too architectural, like a blueprint." He needed to quote something concrete before he could engage with that level of detail.

**Way 3: A hand-drawn sketch (via Skissify + Claude)**
I described the same thing to Claude. In 20 seconds it drew a rough hand-drawn floor plan. Walls, island, sink, dimensions roughed in.

My contractor looked at it and said: "Yeah I can work with this."

---

## Why Does This Work?

There's a reason architects sketch on napkins at the beginning of a project. The sketch communicates **intent without commitment**.

A polished Figma mockup sends the signal: *this is finished, it's been decided, just build it.*

A rough hand-drawn sketch sends the signal: *this is a thought. Push back if you see a problem. Tell me what I'm missing.*

That difference — the **level of polish as a social signal** — changes the conversation. Contractors, interior designers, builders, engineers: they all respond differently to something rough vs. something precise.

---

## The Cognitive Science Angle

Researchers at MIT did studies on design collaboration where the same idea was presented as a polished CAD drawing vs. a rough sketch. Participants provided significantly more critical feedback on the rough sketch version. The polish of the Figma version triggered a social norm around not wanting to "waste" the visible effort.

When something looks like 5 minutes of work, it's safe to say "what if we moved the island?". When it looks like 5 hours, people hedge.

---

## What Skissify Does

Skissify is a JSON-to-hand-drawn-sketch API. You (or your AI agent) describe a space in JSON — walls, doors, furniture, dimensions — and it renders a hand-drawn SVG that looks like it was drawn on paper.

For homebuilders, this means:

```
"Claude, sketch a kitchen where the west wall is removed, island in the center, sink stays on north wall. Living room on the west side."
```

Returns: a shareable sketch URL. Hand-drawn style. Looks like a napkin sketch. Takes 20 seconds.

---

## The Figma Comparison

| | Figma | Skissify |
|--|--|--|
| **Time to rough idea** | 30–90 min | 20 seconds (with AI) |
| **Signal to collaborators** | "This is final" | "This is a thought" |
| **Feedback you get** | Polishing notes | Structural questions |
| **Good for** | Final handoff | Early conversation |
| **API access** | No | Yes (`POST /api/render`) |
| **AI-native** | No | Yes (MCP for Claude) |

Use Figma when you're handing something off. Use a sketch when you're still figuring it out.

---

## Try It

[skissify.com](https://skissify.com) — free tier, no account needed.

If you have Claude Desktop, add `npx skissify-mcp` to your config. Then describe your renovation idea and Claude will sketch it.

The floor plan won't be perfect. That's the point.

---

*Filed under: home renovation, AI tools, floor planning, design thinking, renovation planning*
