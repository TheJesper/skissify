# I Built a Sketch Tool for AI Agents. Four Audiences Showed Up.

*Cross-post: Dev.to, Medium, Hashnode*  
*~2,200 words | 9 min read*  
*Written: March 29, 2026 — Day 3 post-launch*

---

On Friday I launched [Skissify](https://skissify.com) — a tool that renders JSON as hand-drawn sketches, with a native MCP server so AI agents can generate sketches directly.

I built it for one audience: developers building AI agents.

66 hours later, I have four.

Here's what happened, what I learned, and what it means for anyone building a "primitive" product.

## What I Built and Why

Skissify started from a simple frustration. I was using Claude to help design a floor plan — describing rooms, doors, windows, proportions. Claude's spatial reasoning is surprisingly good. But the output was always text.

"A rectangular room, approximately 4 meters by 5 meters, with a door on the south wall..."

I could read it. I couldn't *see* it. And seeing it — even in a rough hand-drawn form — changes how you think about it.

So I built the missing piece: a rendering engine that takes a JSON spec and outputs a hand-drawn sketch. Not a polished CAD drawing. Not a pixel-perfect Figma mockup. A sketch — the kind you'd make on a napkin to explain an idea.

The technical implementation uses multi-harmonic wobble algorithms (three axes: amplitude, wave frequency, humanness) to produce lines that look naturally hand-drawn. 14 element types including architectural specifics: hinged doors, sliding doors, windows, staircases, dimension lines, structural columns. Four paper styles: cream, white, grid, blueprint.

And the thing that makes it interesting for developers: an MCP server. Install it in Claude Desktop, and Claude can design and render sketches autonomously. No manual drawing. No drag-and-drop. Just a conversation that ends with a sketch URL.

## Who I Thought Would Use It

My marketing plan (and I wrote *a lot* of it) was focused entirely on:

- AI developers building MCP-based agents
- TypeScript developers using Mastra, LangGraph, CrewAI
- Anyone building AI workflows who needed visual output

The pitch was simple: every AI stack has text generation, code generation, data retrieval. None has structured spatial output. Skissify is the missing layer.

I expected the first users to be technical. JSON-comfortable. MCP-curious. Willing to read a schema document before trying the product.

## What Actually Happened

The first day's users broke into four groups, none of which I had fully anticipated.

### Audience 1: AI Developers (Expected, But Last)

Yes, they came. MCP install counts went up. GitHub issues were filed with thoughtful schema questions. r/mcp saw a post about Skissify that spawned a 40-comment thread about programmatic visual output.

But they weren't first. They weren't the loudest. And they weren't the ones who spread it.

The AI developers are evaluators. They're methodical. They test the edge cases. They ask "can it handle overlapping elements?" before they ask "can I use this?" That's exactly what you want from the audience you built for — but it means they convert slowly.

### Audience 2: Homeowners Planning Renovations (Completely Unplanned)

The second group appeared without warning: homeowners.

"Describe your room to Claude. Claude generates the JSON. Skissify draws the floor plan. Show it to your contractor."

That workflow — which nobody in my beta ever mentioned — spread on its own. I think someone posted it on Twitter, someone else quoted it, and suddenly I had a non-trivial number of people arriving from "home renovation ideas AI" search queries.

The homeowner user behavior is fascinating. They don't care about MCP. They don't care about JSON. They want to see their room sketched. They want to share it with a contractor or a spouse. The sketch URL — a permanent, shareable link with no login required — is exactly what they need.

This audience taught me something important: **the simpler the workflow looks, the wider the audience gets**. The moment I described Skissify as "describe a room → see a floor plan" instead of "JSON to hand-drawn sketch via MCP," the non-developer audience appeared.

### Audience 3: Dungeon Masters (Wildly Unplanned)

On launch day, the fourth email I received was from a Dungeon Master.

"The blueprint paper style looks exactly like an aged dungeon map. My players think I hand-drew it. Please never change this aesthetic."

I had not thought about Dungeon Masters. Not once. Not in any of my planning documents, blog posts, or target audience slides.

But of course — a dungeon map is a floor plan. Rooms, corridors, stairs, columns. The same element types that describe an apartment describe a dungeon. And the blueprint paper + wobble aesthetic produces something that looks authentically hand-drawn, like a map from a treasure chest.

r/DnD (6.4 million members) and r/TTRPG (320K members) weren't in my launch plan. They are now. The Dungeon Master use case generates social proof that spreads within communities I never targeted.

### Audience 4: Geometry Teachers (The One That Surprised Me Most)

A geometry teacher emailed with three specific feature requests: dimension labels (already there), grid overlay (adding it Week 1), angle markers (Week 2 roadmap).

Her use case: generating hand-drawn floor plan diagrams for geometry worksheets. Area and perimeter problems. Scale exercises. Spatial reasoning questions. "Redesign this apartment to add a guest bedroom."

"My students respond better to hand-drawn diagrams. They feel approachable instead of textbook."

This audience has clear product needs (the worksheet use case requires precision), high retention potential (teachers who adopt a tool tend to keep using it), and community distribution (teacher networks share resources constantly).

I did not plan this. I am now planning for it.

## The Pattern: Primitives Find Their Own Use Cases

Here's the insight that emerged from 66 hours of watching four audiences arrive uninvited:

**When you build infrastructure instead of an application, you don't control who uses it.**

Skissify is a primitive. The JSON-to-sketch renderer doesn't know if the JSON describes a floor plan, a dungeon, a geometry worksheet, or a system architecture diagram. It just draws it.

That's the pattern. If you build an application — "AI floor plan generator for homeowners" — you get homeowners. If you build a primitive — "JSON to hand-drawn sketch" — you get everyone who has a use case for that capability, including the ones you never imagined.

This maps to how the most successful developer tools grew:

- **Stripe** was payment infrastructure. They didn't build "a checkout page for SaaS." They built payment primitives that SaaS, marketplaces, nonprofits, and government contractors all use.
- **Twilio** was communication infrastructure. Not "SMS marketing tool." The primitive attracted every use case.
- **Figma** was collaborative design infrastructure. Not "a mockup tool." The primitive attracted product managers, developers, marketers, educators.

None of these products controlled where they were used. They built the capability, made it accessible, and let use cases emerge.

## What I'm Building Next

**Human Mode** (launching this week): text → sketch, no JSON required. Describe a room to Skissify directly. The server generates JSON and renders it. This closes the gap for Audiences 2, 3, and 4 — the ones who don't want to touch JSON schema.

**TypeScript SDK** (`@skissify/client`): a typed wrapper for the Skissify API. Mastra and TypeScript developers who want programmatic access without running an MCP server.

**Worksheet Mode** (from the teacher's feature requests): dimension labels, grid overlay, angle markers. This makes Skissify genuinely useful for education, not just accidentally compatible.

## The Benchmark No One Asked For

As part of building Skissify's MCP server, I tested how reliably LLMs can generate valid Skissify JSON.

Results (first-try success rate on a standard floor plan task):
- Claude Sonnet 4: **94%**
- GPT-4o: **91%**
- Gemini 2.5 Pro: **89%**
- Llama 3.1 70B: **78%**
- Mistral 7B: **52%**

The gap between frontier and smaller models is significant. The schema is not complex — 14 element types, straightforward coordinates — but spatial reasoning at the JSON level separates models meaningfully.

For anyone building AI agents that need reliable spatial output: Claude Sonnet 4 or GPT-4o. Mistral 7B is not ready for this task.

## Try It

Skissify is at [skissify.com](https://skissify.com). Free tier for public sketches. Pro at €5/month for private sketches and API access.

MCP server: `npm install -g @skissify/mcp-server`

If you find a use case I didn't plan for, I genuinely want to hear about it. The pattern so far suggests there are more.

---

*Jesper Landmér — founder of Skissify. Building visual primitives for the agent stack.*  
*Twitter/X: [@jesperland](https://x.com/jesperland)*

**Tags:** #BuildInPublic #AIAgents #MCP #DevTools #IndieHackers #SideProject #Skissify #VibeDraw
