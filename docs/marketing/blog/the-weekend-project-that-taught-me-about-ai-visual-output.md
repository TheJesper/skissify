# The Weekend Project That Taught Me Everything About AI Visual Output

*Published: March 2026 — Best platforms: Indie Hackers, Medium, Substack*  
*~1,100 words | 5 min read*

> **TL;DR:** I tried to make Claude help me plan a kitchen renovation. It gave brilliant advice, but I still had to sketch it by hand afterward. That friction became Skissify. This is that story.

---

It started with a kitchen.

Not a startup idea. Not a product vision. A literal kitchen I was trying to renovate, an AI assistant that kept giving me genuinely useful advice, and a growing frustration that I still had to manually draw everything it was telling me.

Claude was brilliant. I'd describe the constraints — north-facing window, awkward chimney stack in the corner, need space for a table but not too much — and it would work through the layout with real spatial reasoning. It suggested things I hadn't thought of. It caught conflicts in my ideas before I did.

But every conversation ended the same way.

I'd close the chat. Open a sketch app. Try to draw what we'd just worked out. And spend twenty minutes fumbling with lines and symbols, losing the spatial logic that was perfectly clear in my head five minutes ago.

---

## The Gap I Couldn't Stop Thinking About

I'm a developer. So my reaction to that friction wasn't "find a better sketch app."

It was: why can't the AI just... show me?

I looked at what existed. Excalidraw has an API, but it's a general drawing tool — not designed for AI generation. The JSON schema is complex enough that GPT-4 gets it wrong on first pass about half the time. DALL-E can generate a *picture* of a floor plan but it's non-deterministic and structurally wrong. You can't say "move the door three meters east" and get a consistent update.

There was nothing that met the actual requirement: a structured visual output layer for AI agents. Something where the LLM could describe a spatial layout and render it accurately, deterministically, and iteratively.

So I built it.

---

## The Schema Question

The first design decision turned out to be the most important: what does an AI agent actually need to provide?

My first attempt was hierarchical. Rooms contained walls, walls contained openings. Clean architecture. Completely unusable in practice. LLM success rate: around 45%.

The problem: hierarchical schemas require the LLM to maintain consistent relationships across many nested levels. Small errors cascade. A misplaced curly brace collapses a whole room.

I threw it out and went flat. Every element is just an element — a type, an x/y position, a width, a height, an optional label. No parent-child relationships. No nesting. One array.

Success rate jumped to 92% for floor plans.

It felt like cheating, but it wasn't. It was following the grain of how language models work. They're good at lists. They're mediocre at deeply nested structures. The schema should be a list.

---

## The Wobble Problem

Getting the geometry right was the easy part. Getting the output to look *right* was harder.

The first renders looked like CAD drawings. Clean lines, machine precision. Technically accurate. Completely wrong for the use case.

The problem: when something looks like a CAD drawing, people treat it like a finished design. They stop thinking about whether the layout is right and start thinking about whether the tiles will match the cabinets.

I needed the output to signal "this is an idea."

Every "hand-drawn" tool I looked at was using a simple sine wave offset. It's the obvious approach — add some wobble to the line. But when you look at it closely, the wobble is perfectly regular. Human hands don't oscillate at a constant frequency. The mechanical regularity breaks the illusion.

Multi-harmonic wobble fixed it. Multiple overlapping sine waves at different frequencies, seeded differently per element. The result: each line looks like it was drawn by the same hand, but independently. The irregularity feels real because it doesn't repeat.

Three months of evenings went into the wobble engine. In hindsight, it was the right investment.

---

## Launch Day

I launched Skissify this morning (March 27, 2026).

I expected developers. AI agent builders who'd been struggling with the same gap I started with. MCP enthusiasts who wanted a visual output tool.

Those people came. And then something unexpected happened.

A homeowner DMed me to say she'd used Skissify to sketch a kitchen renovation for a call with her contractor. She didn't know what JSON was, she didn't install the MCP server, she just described the room to Claude and got a floor plan back. Five minutes. No design software.

A real estate agent saw the Product Hunt listing and said he'd been looking for something exactly like this for client walkthroughs.

Someone in r/homedesign asked if they could use it to plan furniture placement before a move.

The AI agent use case is real and I still believe in it. But the product works for anyone who needs to communicate a spatial idea and doesn't want to learn design software to do it.

---

## What I Actually Built

Skissify is a web tool that:

- Takes JSON as input describing spatial elements (rooms, doors, windows, stairs, labels, dimensions)
- Renders them as hand-drawn-style sketches using multi-harmonic wobble
- Exposes an MCP server so AI agents can call it directly
- Stores sketches and generates shareable links

Free tier: public sketches, 50 API calls/month. Pro: private sketches, 2,000 API calls/month, €5/mo.

Stack: Next.js 15, TypeScript, Canvas 2D, Prisma/SQLite, Stripe.

---

## What I Learned

**The persona gap is a real problem.** I built for developers, but the product's clearest value proposition is "communicate a spatial idea without design software." That's a much wider audience.

**Schema simplicity is a product feature.** The JSON schema fits on one page. That's not laziness — it's what makes LLM generation reliable. Every time I've been tempted to add nesting or relative positioning, I've resisted. The flat schema is the product.

**Determinism is underrated.** The same JSON always renders the same sketch. That seems obvious, but it's the property that makes iteration possible and debugging tractable. Image generators can't do this.

**The wobble is worth it.** Three months on the rendering engine felt like over-engineering at the time. It wasn't. The difference between "this looks hand-drawn" and "this looks like a machine faking hand-drawn" is the difference between a product that communicates and one that doesn't.

---

If you're a developer building AI agents, try the MCP server: `npm install -g @skissify/mcp-server`

If you're a homeowner, designer, or anyone who's ever struggled to show someone a spatial idea: try the free editor at **skissify.com**.

And if you've struggled with the same AI visual output gap I described — I'd genuinely like to hear your story. Reply here or email me directly.

---

*Skissify is live at skissify.com. Launched March 27, 2026.*
