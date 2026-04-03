# It's 2am. Show HN Goes Live in 7 Hours. Here's Everything We Built.

*April 3, 2026 — Skissify Day 3*

---

I can't sleep. Show HN goes live at 09:00 CET and it's currently 02:17.

This isn't insomnia from anxiety. It's the kind of restless alertness that comes when you've been building and shipping so fast that your brain hasn't caught up yet.

So let me use the next few hours productively. Here's everything we built for this launch, documented before the chaos of the day starts.

---

## What Skissify Actually Is

An API that takes a JSON manifest and returns a hand-drawn SVG sketch.

That's the whole thing. POST structured data describing elements — rooms, shapes, annotations, furniture — and receive a deterministic hand-drawn SVG in ~150 milliseconds.

The "hand-drawn" part isn't aesthetic decoration. It's functional.

Hand-drawn sketches communicate incompleteness deliberately. When you send a polished Figma diagram in a meeting, people focus on the polish — fonts, shadows, exact sizing. When you send a rough sketch, people focus on the idea. The medium signals "this is not final, your input matters."

Skissify does this programmatically. AI agents now have a way to signal "here's my spatial reasoning, not my final output."

---

## The Problem That Started It

Language models are excellent at spatial reasoning. Ask Claude to design a 2-bedroom apartment floor plan and you get a genuinely good layout — efficient room placement, sensible adjacencies, realistic proportions.

But there was no output format.

You'd get text: *"Living room (5x7m) on the north side. Kitchen adjacent to the east. Two bedrooms along the south wall."*

That's useful. It's not visual. There's a gap between "AI can reason about space" and "AI can show you space." Skissify fills that gap.

---

## The Schema Insight That Changed Everything

The first version of Skissify had a hierarchical JSON schema. Rooms contained sub-elements. Elements had nested properties. It was logically elegant.

Then I benchmarked it.

LLM first-attempt accuracy on the hierarchical schema: **40–61%**.

Rewrote to a flat schema — all elements in a top-level array, no nesting. Each element is self-contained with its own position, type, and properties.

LLM first-attempt accuracy on the flat schema: **88–94%**.

The theory is straightforward: LLMs handle flat lists as list-completion tasks. Nesting introduces depth management — the model has to track multiple levels of context simultaneously. More failure modes.

This insight is worth more than the product, honestly. If you're building any API meant to be consumed by LLMs, design the schema around cognitive load, not logical elegance.

---

## What I Didn't Build For

Three weeks ago I imagined two user types: AI developers building agent pipelines, and product managers who wanted a faster wireframing loop.

Then we launched. Day 1 surprise:

**Dungeon masters.** The blueprint paper style — white lines on dark blue — looks exactly like old D&D module maps. r/DnD found us before r/AIAgents did. They don't care about MCP or JSON. They care that "describe this dungeon floor, AI draws it" works in 30 seconds.

**Homeowners.** A woman posted in a Facebook group that she used Skissify to explain her kitchen renovation to a contractor. She'd tried to describe it in words. He kept getting confused. She fed the layout to Claude, Claude generated a JSON manifest, Skissify rendered a sketch, she sent the sketch. Problem solved.

She did not care that it was a JSON API. She cared that it worked.

**Geometry teachers.** One teacher posted that she generated 30 spatial reasoning exercises in 10 minutes for a middle school class. Rooms with dimensions, scale bars, "what's the area?" prompts. Things that previously required manual drawing or clip art hunting.

The product I built is a sketch API for AI agents. The product people are using is "describe a space, get a drawing."

---

## What We Have Ready for Today

The marketing machine has been running for three weeks. Here's what's staged and ready:

**Blogs written:** 280+ (the three canonical versions for Show HN day are in `docs/marketing/blog/`):
- "Why Hand-Drawn Sketches Beat Figma for Quick Ideas" — definitive version
- "How AI Agents Can Draw Floor Plans: A Complete Guide"
- "Skissify vs Excalidraw: An Honest 2026 Comparison"

**Social copy:** 121 cycles of Twitter threads, LinkedIn posts, Reddit posts, Discord messages, Bluesky, Mastodon, TikTok scripts.

**SHOW-HN-LIVE-KIT.md:** Single-doc execution guide. Everything to post, in order, with timing.

**OVERDUE channels:** Four channels have been staged for weeks — MCP Discord, r/LocalLLaMA, Indie Hackers, Smol Launch. Today they get posted. The SHOW-HN-LIVE-KIT has the copy.

---

## The One Thing That Doesn't Exist

The demo video.

Every cycle for three weeks, the priority list says:

**P0 FOREVER: Record demo video. 20 minutes. Still not done.**

A 60-second screen recording showing Claude generating a floor plan via the MCP server. Natural language → JSON manifest → rendered sketch → shareable URL.

This would likely be the best-converting piece of content we have. It would go viral. It would answer every "but what does it actually do?" question in 60 seconds.

It doesn't exist because there's always something else. This is the real lesson of building in public: the highest-leverage content is often the thing that requires you to stop writing and start recording.

After Show HN today. Non-negotiable.

---

## The Numbers (As of Day 2 End)

These aren't vanity metrics. They're context.

- Product Hunt launch: Day 1
- Show HN: Today (Day 3)
- Blog posts written: 280+
- Marketing cycles run: 121
- Demo video: 0

The ratio is embarrassing but honest. Marketing content is easy to produce. Demo content requires showing the product working in real time. Do the hard thing first next time.

---

## 09:00 CET

That's when the Show HN post goes up.

We'll see what happens.

---

*Jesper, Stockholm*
*Skissify — [skissify.com](https://skissify.com)*
*MCP server: `npx skissify-mcp`*
