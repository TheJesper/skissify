# Week 2: What We're Building Next

*Build-in-public post for Monday. Cross-post: Twitter thread, Indie Hackers, Substack.*

---

Four days ago, Skissify launched on Hacker News. Here's what happened, what we learned, and what Week 2 looks like.

---

## Week 1 in Numbers

*(Fill in real metrics before posting)*

- Unique visitors: ___
- Sketches generated: ___
- Return visitor rate: ___%
- MCP installations: ___
- GitHub stars: ___
- Countries: ___

The number I care most about is return visit rate. If someone came back to Skissify after the initial visit, the product does something useful. First-visit numbers are marketing. Return visits are product-market fit signals.

---

## What Week 1 Taught Us

**Four audiences found us. We designed for one.**

We built Skissify for AI developers — people connecting Claude to tools via MCP. That audience showed up. But so did:

- **Homeowners** planning renovations ("I described my kitchen to Claude and got a sketch to show the contractor")
- **Dungeon masters** generating encounter maps ("One prompt, full dungeon map, my players loved it")  
- **Geometry teachers** making worksheets ("I can generate 20 variations of the same diagram type in minutes")

None of these audiences were in the original brief. They found us anyway, because the primitive (JSON → hand-drawn sketch) is useful in ways we hadn't imagined.

This is why you build primitives, not features.

**Human Mode was the right call.**

Halfway through launch weekend, we added Human Mode: describe what you want in plain text, no JSON, no schema knowledge required. The feedback was immediate. The technical barrier was real — people wanted to try Skissify but didn't want to write JSON.

Human Mode removes that barrier. The MCP API is unchanged for developers.

---

## Week 2 Roadmap

Here's what's shipping, in priority order:

### 1. TypeScript SDK (`@skissify/client`)
The fetch API works, but Mastra and LangGraph developers want a typed client. This week: publish `@skissify/client` on npm with full TypeScript types, Zod schemas, and examples for Mastra, LangGraph, and CrewAI.

### 2. Benchmark Page (skissify.com/benchmark)
We have 94% first-try success data for Claude Sonnet 4. Publishing it officially as a benchmark page — with methodology, per-model results, and a live test runner. This kind of page is what gets linked.

### 3. Framework Integrations Page (skissify.com/integrations)
Five-line code snippets for every major agent framework: Mastra, LangGraph, CrewAI, n8n, AutoGen. One page that shows "this is how you add Skissify to your stack in X framework."

### 4. Interactive Playground (Homepage)
No signup, no MCP setup. Type a description, see the sketch. The goal: someone finds Skissify, understands what it does in 10 seconds, and shares it.

### 5. Worksheet Mode (Educator Angle)
Grid overlay, dimension labels, printable formatting. A2B educators asked for this specifically. Low effort, high impact for that audience segment.

---

## The Longer Term

Three things we're thinking about but not building yet:

**Sketch sharing + community.** "What did you sketch today?" as a daily tweet prompt. User-generated sketches as marketing. The best sketches become the gallery.

**Embed widget.** `<skissify-sketch id="..." />` web component. Drop a sketch anywhere. Documentation, blog posts, GitHub READMEs.

**Collaboration mode.** Multiple agents modifying the same sketch. Architectural design workflows where one agent creates the floor plan and another adds furniture. This is Week 4+.

---

## What Would Help

The most useful thing you can do right now: tell me what's missing.

- If you tried Skissify and got confused, I want to know where
- If there's a use case you wish it supported, tell me
- If the schema documentation is unclear, show me which part

Reply here, or reach me at [contact]. I respond to everything.

---

## Try It

[skissify.com](https://skissify.com) — Human Mode, no signup required.

MCP: `npx @skissify/mcp-server`

---

*Filed under: BuildInPublic, Skissify, Week 2, Roadmap*  
*Cross-post: Twitter thread (truncated), Indie Hackers, Substack*
