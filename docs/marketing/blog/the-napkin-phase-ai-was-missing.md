# The Napkin Phase AI Design Was Missing

*Published: Day 2-3 | Platform: Substack first (narrative voice), then Medium*  
*TL;DR: Every great design started on a napkin. AI design tools skipped that phase. Skissify brings it back — for agents.*

---

There's a coffee shop in Stockholm where I used to watch architects work.

Not the software. The process.

They'd come in, order an espresso, and before the coffee was ready, they'd already have a pen out. Sketching on whatever was available — a napkin, a receipt, the margin of a newspaper. Rough lines. Quick proportions. The building wasn't designed yet, but the idea was starting to take shape.

Then they'd finish the coffee, open their MacBook, and start refining.

The napkin wasn't the design. The napkin was the thinking.

---

## What Happened When AI Skipped the Napkin

AI design tools are very good at producing polished outputs. Lovable can build you a working SaaS landing page in 20 minutes. Figma's AI can propose UI components. Google Stitch can vibe-design an entire interface from a prompt.

All of these go straight from "describe what you want" to "here's a polished output."

Nobody built the napkin.

And this turns out to matter a lot.

When you skip the rough phase:

- **The first output becomes the reference point.** Everything is evaluated relative to it, not to the actual goal.
- **Alternatives don't get explored.** The AI picks one interpretation and polishes it. Other valid interpretations die before they're born.
- **Clients commit too early.** A polished design creates psychological investment. A rough sketch invites pushback. Most design feedback conversations should happen at the rough stage.

The napkin isn't inefficiency. The napkin is the exploration phase. And exploration is where the best designs come from.

---

## The Floor Plan That Taught Me This

I was working on Skissify — a tool that lets AI agents output hand-drawn sketches via JSON — and I gave Claude a test prompt:

> "Design a one-bedroom apartment for a remote worker. 45m². Prioritize workspace and natural light."

Without Skissify, Claude would produce a well-written description. Something like: "I'd suggest placing the bedroom in the north corner to minimize afternoon heat gain, with the workspace positioned near the east-facing windows for morning light..."

Useful. But you still have to construct the image in your head. You can't *see* the spatial tradeoffs. You can't point to the corner and say "move that desk a bit left."

With Skissify, Claude draws it. A rough floor plan, hand-drawn style, showing the spatial relationships:

- Workspace along the east wall (morning light)
- Bedroom in the quieter north corner
- Kitchen near entrance (reduces foot traffic through living space)
- The awkward column the architect would have spotted immediately — and can now easily fix

The sketch isn't the answer. It's the thing you look at together and say "almost, but..."

That's the napkin phase. That's what was missing.

---

## Why Hand-Drawn Matters

I made a deliberate choice with Skissify: the output looks hand-drawn, not polished.

This wasn't just aesthetics. It's strategic.

Hand-drawn output signals: **this is a draft**. It invites pushback. It says "I was thinking, not executing." The wobble on the lines, the imprecision in the corners — these communicate "rough idea, open to revision."

Skissify's rendering engine uses what I call multi-harmonic wobble: three axes of control (amplitude, frequency, humanness) that produce line variations that look like a careful human with a ruler, not a sine wave generator. It's designed to feel like real pen on paper.

Because the napkin phase only works if it feels rough. A polished floor plan makes clients afraid to ask for changes. A rough sketch makes clients *want* to ask for changes.

That's the goal. That's the design.

---

## What the Napkin Phase Unlocks

When you have a rough visual, everything speeds up:

**Iteration:** "Move the kitchen to the right" is a JSON edit. The sketch re-renders. You're looking at the new version in 200 milliseconds, not 20 minutes.

**Communication:** Non-technical stakeholders can look at a sketch and respond. They can't respond to a JSON manifest. The sketch is the shared language.

**Memory:** This is the one that surprised me. Agents that can *draw* their reasoning can *save* it. Skissify returns a permanent URL for every sketch. Next session, the agent fetches the JSON, modifies it, re-renders. The spatial idea persists across conversations.

**Exploration:** When iteration is free, you explore. "Show me three versions of the living room layout" is a meaningful request when each version takes 500 milliseconds.

---

## The Architects Had This Right

Back to that Stockholm coffee shop.

The napkin wasn't waste. It was the highest-value part of the design process. All the exploration happened there, fast and cheap, before expensive commitments were made.

AI design tools have a Figma problem: they start at the Figma stage. Everything is polished. Everything takes commitment. The exploration happens in the conversation, invisibly, in text.

Skissify moves the exploration back to visible, spatial, cheap sketches.

The architects knew something. The napkin phase isn't a step to skip. It's the step that makes everything else better.

---

## Try the Napkin Phase

Skissify is at **skissify.com** — free for public sketches.

MCP server for AI agents: `npm install -g @skissify/mcp-server`

Ask your AI assistant to draw a floor plan. See what the napkin phase looks like when AI can actually sketch.

---

*Filed under: AI Design, Spatial Thinking, Design Process, MCP, Skissify*
