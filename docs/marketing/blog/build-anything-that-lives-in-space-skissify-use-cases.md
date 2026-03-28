# If It Lives in Space, You Can Sketch It: Skissify's Unexpected Use Cases

*Added: March 28, 2026 — Cycle 38 — Best platform: Medium, Substack, r/sideprojects, viral social*
*~1,200 words | 5 min read*

> **The one-liner:** I built Skissify for AI developers. In 48 hours, it found five audiences I never planned for. This is the story of what happens when you build a spatial primitive instead of a spatial app.

---

On Friday March 27, 2026, I launched Skissify. I had a clear idea of who would use it:

AI developers. Engineers building agent workflows with MCP. The people who spend their weekends configuring Claude Desktop and benchmarking local models.

Here's who actually showed up on Day 1.

---

## Audience 1: The Homeowners (Planned: 0%. Actual: ~30%)

Within eight hours of launch, I got an email with the subject line: *"Used this for my contractor meeting."*

A homeowner had been trying to explain her kitchen renovation to a contractor for three weeks. She kept describing it with words. The contractor kept misunderstanding.

On launch day, she found Skissify. She described the kitchen layout to Claude: peninsula on the north wall, window above the sink, island at the center, door on the south side. Claude wrote the JSON. She pasted it in.

A floor plan appeared.

She printed it. Brought it to the meeting.

*"He understood immediately. Usually I spend hours trying to explain what I want."*

I had never thought about this use case. I was building for developers.

But of course it works. A kitchen is spatial. Skissify draws spatial things.

---

## Audience 2: The Dungeon Masters (Planned: 0%. Actual: Surprising)

The fourth person to email me on launch day was a Dungeon Master.

He'd been using Claude to generate D&D campaign maps. The blueprint paper style — dark background, white lines, hand-drawn aesthetic — looks exactly like a map you'd find in a treasure chest.

"My players think I hand-drew it."

I hadn't considered TTRPG maps when I designed the blueprint style. I designed it for architectural drawings. But the aesthetic is the same: careful lines, spatial precision, worn-paper feel.

When you build a spatial rendering engine, cartographers find it.

r/DnD has 7 million members. I never posted there. They found us.

---

## Audience 3: The Teachers (Planned: 0%. Actual: Delightful)

A geometry teacher emailed on Day 2.

She uses Skissify to generate spatial math exercises for her class. Describe a room to Claude. Claude outputs a floor plan. She uses it as a worksheet.

*"My students respond better to hand-drawn diagrams. They feel approachable instead of textbook."*

30 unique exercises in 10 minutes. Each one slightly different. No two rooms the same. Infinite differentiation.

I didn't design for teachers. But floor plans are perfect for geometry problems: area, perimeter, scale, the Pythagorean theorem, "find the shortest path between kitchen and bedroom."

The hand-drawn aesthetic is doing real pedagogical work — it makes the spatial problem feel approachable rather than sterile.

---

## Audience 4: The Interior Designers (Planned: Maybe Someday. Actual: Day 2)

By Saturday afternoon, interior designers had found the tool.

The workflow: describe a room concept to Claude, get a rough floor plan, share the link with a client before committing to any real design software.

*"It's the five-minute sketch I used to do on paper, but I can share it as a link."*

The key insight: clients in early-stage conversations need to react to spatial ideas, not evaluate polish. A Figma mockup invites the wrong conversation ("I don't like that font"). A rough sketch invites the right one ("Can we try the sofa on the other wall?").

---

## Audience 5: The PMs and Their Flow Diagrams (Planned: Tangentially. Actual: Day 1)

Product managers started using it for user flow diagrams and feature map sketches.

The same underlying capability — structured spatial input, hand-drawn output — works for anything that has boxes and relationships. A user journey is spatial. A system architecture diagram is spatial. A feature backlog quadrant is spatial.

A PM described using it for sprint planning: describe the feature flow to Claude, get a rough diagram, paste it into the Slack thread. The discussion could reference something visible, not just imagined.

---

## The Pattern

Five audiences. One underlying insight:

**Spatial reasoning is general.**

I built Skissify for AI developers because developers are the ones who build with MCP. But the tool's capability — structured JSON in, hand-drawn spatial output out — is useful for anyone who needs to communicate something that lives in space.

Rooms. Dungeons. Lesson plans. Client concepts. Sprint flows.

If it has spatial relationships, you can sketch it with Skissify.

This is what happens when you build a primitive instead of an application. An application solves one problem for one audience. A primitive has a general capability that people apply to their specific problems.

The homeowner didn't think "I need an AI developer tool." She thought "I need to show my contractor what I'm imagining." She found the tool that makes spatial ideas visible and used it for her need.

That's the product.

---

## What This Changes for the Roadmap

When 30% of your users are homeowners and you built the product for developers, you pay attention.

The biggest friction point for non-developers: the JSON input. They don't know what JSON is. They don't want to.

**Human Mode** — plain English input that calls Claude internally — is shipping this weekend. Describe your space. Get a sketch. No JSON visible.

The developer experience stays unchanged. The developer API, MCP server, and JSON schema aren't going anywhere. Human Mode is a door for everyone else.

Because the capability doesn't belong only to the people who understand its implementation.

---

## A Note on Primitives

There's a lesson here I keep coming back to:

The napkin sketch was always a general-purpose tool. Anyone with an idea and a pen could use it. The rough aesthetic wasn't a limitation — it was the feature. The roughness signaled "this is an idea, not a decision."

Skissify is trying to be the digital napkin for AI-assisted spatial thinking. And like the original napkin, it turns out to be useful for problems its creator never anticipated.

The Dungeon Master. The geometry teacher. The homeowner and her contractor.

They found the primitive. The primitive found them.

---

*Try it free: [skissify.com](https://skissify.com) — no signup required for the editor. Human Mode coming this weekend.*  
*For developers: `npm install -g @skissify/mcp-server`*

---

**Tags:** building-in-public, indie-hacker, product-discovery, ai-agents, mcp, skissify, floor-plans, unexpected-uses, primitives
