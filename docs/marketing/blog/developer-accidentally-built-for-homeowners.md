# I Built a Tool for AI Developers. Homeowners Are Using It to Renovate Their Kitchens.

*Published: March 27, 2026 — Cross-post to Medium, Substack, Indie Hackers*  
*~1,600 words | 7 min read*

> **TL;DR:** I launched Skissify as a developer tool — JSON in, hand-drawn sketch out, AI agent-compatible via MCP. On launch day, homeowners discovered it's the missing link between "asking Claude to plan a renovation" and "showing the contractor what you mean." I didn't plan this. I'm taking notes.

---

There's a particular humility in building a product and watching people use it wrong.

Or — more precisely — watching people use it *right* in a way you never imagined.

## What I Built

Skissify is a sketch generation tool. The input is JSON. The output is a hand-drawn floor plan, architecture diagram, or wireframe. The intended user was an AI developer: someone building an agent workflow who needed their Claude-powered app to produce visual output, not just text.

The pitch was clean: AI agents can now draw. MCP server, JSON schema, 14 architectural element types. Programmatic, deterministic, repeatable.

I launched it this morning at 00:30 CET.

By 13:00, something unexpected was happening.

## The Renovation Thread

It started with a tweet I didn't write. Someone — I'll call them the Bathroom Planner — posted a thread describing how they'd asked Claude to help plan a bathroom renovation. They wanted to move the shower, add double sinks, keep the toilet in place. Claude reasoned through the spatial constraints, generated Skissify JSON, rendered a floor plan, and gave them a shareable link.

They printed it. They brought it to the contractor call. The contractor understood exactly what they meant — not from a text description, not from a vague hand wave, but from a sketch.

"This tool was made for developers," they wrote. "But honestly? It's the thing I've been missing for renovation planning."

By 17:00 CET, I'd seen variations of this story seven times.

## The Gap I Didn't See

Here's the thing I missed: describing a renovation to a contractor is a solved problem only if you can draw.

Most people can't draw. They can describe. They can measure. They can gesture toward where the island should go and vaguely indicate that the fridge should be "over there." But a sketch — even a rough one — communicates something that words can't.

Traditional options:
- **Hire an architect**: expensive, overkill for a kitchen rework
- **Figma/Miro**: technical barrier, overkill for a napkin sketch
- **Excalidraw**: great, but still requires you to draw it yourself
- **Graph paper**: your grandmother's option, still works

The missing tool: *Describe what you want, get a sketch.*

Claude + Skissify does exactly this. Not by design. By accident.

## What I'm Seeing in the Data

The homeowner use case follows a consistent pattern:

1. User asks Claude in natural language: "Design a kitchen renovation — 4m × 5m, island in the center, refrigerator near the entrance, double sink under the window"
2. Claude reasons about the layout, generates valid Skissify JSON
3. User pastes JSON into Skissify (or Claude calls the MCP server directly)
4. Sketch renders in under a second
5. User shares the link with family, sends it to contractor, or prints it

What's notable: these users aren't writing JSON. They're not developers. They're using Claude as a translation layer between their words and Skissify's input format.

That's a workflow I designed accidentally.

## The "Dual Market" Problem (Opportunity?)

I now have two distinct user types with different needs:

**The Developer User:**
- Wants MCP integration, API access, JSON schema documentation
- Cares about programmatic generation, element customization, batch rendering
- Is comfortable with technical setup, CLI tools, config files
- Pain point: AI agents had no visual output primitive

**The Homeowner User:**
- Wants to describe a room and get a sketch
- Doesn't know what JSON is (and shouldn't need to)
- Cares about sharing links with contractors and family
- Pain point: can't draw, but has clear spatial ideas

Right now, the second user gets to Skissify through Claude — which requires either MCP setup (technical) or manual JSON input (also technical). It works, but it's friction-heavy.

If I built a "Human Mode" — a form that asks "describe your room" and auto-generates the sketch — I'd remove that friction entirely.

That's a Week 2 question. For now, I'm watching.

## What I'm Not Going to Do

I'm not pivoting.

The developer market is real, the MCP architecture is right, and the AI agent angle is what makes Skissify technically interesting. The homeowner use case is a bonus — a signal that the product has breadth I didn't expect.

What I will do:

1. **Add a "human input" entry point** — a simple form alongside the JSON editor that accepts natural language room descriptions and converts them to JSON automatically. Developers get their JSON editor. Homeowners get a text box. Same render engine underneath.

2. **Write proper contractor-sharing documentation** — how to use Claude to design a room, get a sketch, and share it before a contractor call. This is a use case tutorial I didn't plan to write. I'm writing it.

3. **Resist the temptation to rebrand** — "Skissify for homeowners" is a different product in a different market. I'll serve both with the same tool, not two products.

## The Meta-Lesson

Every product has a market it was built for. Some products have a second market they discover on day one.

I built Skissify for AI developers and the JSON-first workflow. Homeowners found it because Claude is a capable translator between natural language and structured data — and Skissify is what happens at the end of that translation.

This is, I think, what it looks like when AI changes the user of a tool without changing the tool.

The AI developer didn't change Skissify's architecture. They just made it possible for someone who can't write JSON to use a tool that requires JSON.

Claude is the input sanitizer that nobody had to build.

---

## What This Means for Day 2

Tomorrow, I'll post:

1. **r/HomeImprovement** — honest developer post: "I built a developer tool, homeowners are using it for renovation planning, here's how it works and what the limitations are"
2. **A tutorial blog post**: "How to design a room renovation with Claude + Skissify, step by step"
3. **A tweet thread**: The dual-market story. Technical tool, human use case, AI as the translator.

And I'll update the landing page to include one sentence acknowledging the homeowner workflow — not as the primary pitch, but as a real use case.

Because honestly? The bathroom planner who printed a floor plan for their contractor call is using Skissify exactly right.

They just didn't follow the instructions.

---

*Skissify is live at [skissify.com](https://skissify.com). Free tier, no signup to view shared links. Pro at €5/month. The MCP server is on npm if you want to let Claude draw for you.*

---

**Tags:** build-in-public, saas, ai, product-launch, side-project, homeowners, floor-plans, mcp, claude

**Distribution notes (internal):**
- **Primary:** Medium — human story, accessible, consumer-friendly
- **Secondary:** Substack — personal/narrative style fits
- **Day:** Publish Day 2 (Saturday March 28) — after the dev community storm, when the homeowner story has more signal
- **Tweet hook:** "I built a tool for AI developers. Homeowners are using it to brief contractors on kitchen renovations. I didn't plan this. It's launch day and I'm taking notes. 🧵"
- **Indie Hackers hook:** "Launch day discovery: the user I built for (AI devs) and the user who showed up (homeowners) are different people. Here's what I learned."
- **LinkedIn hook:** "The best product validation is discovering a market you didn't target. Launch day taught me that Claude is the input sanitizer for every technical tool."
