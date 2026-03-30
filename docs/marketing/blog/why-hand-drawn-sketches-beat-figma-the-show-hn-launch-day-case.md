# Why Hand-Drawn Sketches Beat Figma for Quick Ideas (The Show HN Version)

*Written the night before launching on Hacker News. This is the honest version.*

---

There's a moment every designer and developer knows. You have an idea. A real one. Something that needs to get out of your head and into the world before it evaporates.

You open Figma.

Twenty-two minutes later you're adjusting auto-layout constraints and you've forgotten what the idea was.

## The Tool Shapes the Thought

This isn't a critique of Figma. Figma is exceptional at what it does: building production-ready, pixel-perfect designs that communicate exactly what developers should build.

But that's the problem. When you're in the *exploration* phase — the napkin phase — precision is the enemy of thinking.

A clean, polished mockup sends a signal: *this is decided*. It invites polish feedback, not honest feedback. People will say "looks good" when they mean "I don't understand this but it looks professional."

A rough sketch sends a different signal: *this is a thought, not a commitment*. It invites real reactions. "What's that box?" "Why is this here?" "I'd move that over there."

That's the cognitive science behind it. Fidelity determines feedback type. Low fidelity gets honest, structural feedback. High fidelity gets aesthetic feedback.

## What Actually Happens in the Napkin Phase

The napkin phase is the 15-minute window where you figure out if an idea is worth building. It's the whiteboard session before the spec. The sketch before the prototype.

Designers have always known this. They sketch on paper, on whiteboards, on napkins. Because the goal isn't to show what it looks like — the goal is to think.

The problem is that paper sketches don't scale. They can't be shared, versioned, linked, or built upon. They disappear.

## What Skissify Does Differently

Skissify produces hand-drawn-style sketches from JSON. That's the whole thing.

You send:
```json
{
  "elements": [
    { "id": "header", "type": "rectangle", "x": 0, "y": 0, "width": 800, "height": 60, "label": "nav" },
    { "id": "hero", "type": "rectangle", "x": 0, "y": 80, "width": 800, "height": 400, "label": "hero section" }
  ]
}
```

You get back a sketch that looks like a whiteboard drawing. Not a wireframe. Not a mockup. A sketch.

The visual style sends the right signal: *this is exploratory*. It's not done. React to the idea, not the presentation.

## Why AI Agents Need This

Here's the angle that matters for 2026: AI agents can now generate Skissify JSON directly.

You ask Claude "sketch a floor plan for a 2-bedroom apartment" and you get back a sketch URL. Not a text description. Not a diagram-as-code. An actual visual output — shareable, persistent, inspectable.

That's what was missing from the MCP ecosystem. 12,000+ MCP servers and none of them produced visual output. Skissify is the visual primitive for AI agents.

## The Figma Tax, Calculated

Let me be specific about the cost:

- Open Figma: ~45 seconds (app load)
- Create new file: ~15 seconds
- Name the file, set frame size: ~2 minutes
- Remember why you opened it: priceless

Total: ~5 minutes before you draw anything, on a good day. On a bad day, you've got Auto Layout complexity and component library decisions to make before your idea is even on screen.

Skissify: describe what you want, get a sketch in under 10 seconds.

For exploratory thinking, that's not a nice-to-have. It's the difference between having the idea and losing it.

## The One Difference That Matters

Figma is for communicating a decided design.

Skissify is for thinking through an undecided one.

Both have their place. But before Skissify, the napkin phase was either literal paper or a Figma file that took longer to create than the idea deserved.

---

*Skissify launches on Show HN tomorrow, Tuesday March 31, 2026.*
*Try it at [skissify.com](https://skissify.com)*
*MCP server: `npm install -g @skissify/mcp-server`*
