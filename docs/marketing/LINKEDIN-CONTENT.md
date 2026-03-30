# Skissify LinkedIn Content

**Created:** March 30, 2026 — Cycle 60 (11:53 CET)
**For:** LinkedIn (professional audience: PMs, designers, developers, CTOs)
**Note:** LinkedIn rewards longer-form, story-driven posts. No hashtag spam. 3-5 strategic hashtags max.

---

## POST 1 — LAUNCH DAY (Tuesday March 31, 09:00 CET)

**Best for:** Founder/personal LinkedIn profile

---

I built something in a weekend that I still can't fully explain.

I wanted to give Claude a way to draw. Not generate images — draw. The kind of rough spatial sketch you'd make on a napkin to show a contractor what you want, or on a whiteboard to explain a system.

The result is Skissify. JSON goes in. A hand-drawn sketch comes out at a permanent URL.

I built it for AI developers. A clean MCP server, flat JSON schema (94% first-try LLM accuracy in benchmarks), wobble algorithm that makes it look sketched rather than generated.

Then something weird happened.

Homeowners started using it to make renovation briefs for contractors.
Dungeon masters started generating fantasy building maps.
Geometry teachers started using it to create spatial exercise materials.

I never targeted any of them.

That's what primitives do — they find their own use cases. I built the underlying capability. The use cases walked in.

Today we're live on Hacker News. If you're curious what it looks like when an AI agent draws something:

→ skissify.com/human (describe a room, get a sketch)
→ Show HN: news.ycombinator.com (search "Skissify")

Happy to answer any questions about the technical architecture, the schema design lessons, or why the wobble algorithm exists.

#AIAgents #ProductLaunch #BuildInPublic #MCP #DevTools

---

## POST 2 — THE SCHEMA INSIGHT (Wednesday April 1)

**Best for:** Tech/developer LinkedIn, reshare by engineering managers

---

The most important thing we learned building Skissify isn't about sketching.

It's about schema design.

When we tested floor plan generation across 200+ attempts with four different LLMs, the schema design had more impact on accuracy than the model choice.

Hierarchical JSON (nested rooms → walls → furniture): ~58% first-try accuracy
Flat element list with absolute coordinates and type discriminator: ~94%

The difference: 36 percentage points.

The model upgrade we were considering (from GPT-4o to Claude 3.7) would have given us maybe 3-5pp improvement.

The schema upgrade gave us 36pp. For free.

The lesson isn't specific to spatial generation. It applies everywhere LLMs need to produce structured output:

• Minimize the coordinate transformation the model needs to do mentally
• Prefer absolute positions over parent-relative offsets
• Use flat structures unless nesting genuinely simplifies
• Type discriminators in flat arrays outperform layer separation

We're publishing the full benchmark data. Link in comments.

If you're building agentic systems that produce structured output, test your schema first before blaming the model.

#AIEngineering #LLM #SchemaDesign #AIAgents #TechLeadership

---

## POST 3 — THE PREMATURE CONVERGENCE PROBLEM (Thursday April 2)

**Best for:** Product managers, designers, startup founders

---

There's a concept from design research called "premature convergence."

It describes what happens when a team commits to a solution before adequately exploring the problem space.

High-fidelity mockups cause it. Not because Figma is bad — because it's too good. When something looks polished, brains treat it as decided.

I've watched this happen dozens of times. Designer brings a pixel-perfect wireframe to a stakeholder review. Forty minutes later, the meeting ends having resolved whether the button should be 36px or 40px. The fundamental question of whether that screen should exist at all was never asked.

The same concept shown as a rough hand-drawn sketch produces a different meeting. People ask about the flow. They question assumptions. Someone goes to the whiteboard.

Fidelity signals confidence. A rough sketch says: "this is an idea." A polished mockup says: "this is a plan."

During exploration phase, you want to be signaling the former.

This is partly why I built Skissify. Yes, it's useful for AI agents that need to draw. But the underlying insight — that rough sketches keep conversations at the right abstraction level — applies to every product team having those "wrong conversation" meetings.

Generate a sketch in 30 seconds. Keep the meeting about ideas.

skissify.com/human

#ProductManagement #DesignThinking #UX #StartupStrategy #Figma

---

## POST 4 — THE FOUR AUDIENCES STORY (Friday April 3 — first week retrospective)

**Best for:** Founders, product builders, "build in public" audience

---

Four days of data. Four audiences I never built for.

Skissify launched on Tuesday as a developer tool. MCP server for Claude Desktop. JSON sketch API. Built for AI engineers who need their agents to produce spatial output.

Here's who showed up:

**1. AI developers (the intended audience)**
Using the MCP server to add sketch output to their agents. Floor plans, wireframes, system diagrams. Some very technical use cases involving sketch URLs as agent memory (the URL contains the JSON — so it's inspectable and mutable by downstream agents).

**2. Homeowners**
Mostly from r/homeimprovement and some Reddit renovation communities. Using Human Mode to generate renovation briefs for contractors. "Describe your apartment" → share the sketch URL with your builder. They've been printing them.

**3. Dungeon masters**
From D&D and Pathfinder subreddits. Generating building maps, dungeon layouts, encounter spaces. Apparently a market of people who spend a lot of time drawing maps by hand. They're not hand-drawing them anymore.

**4. Geometry teachers**
Two teachers so far, but they found us without any targeting. Generating spatial exercise materials. Floor plan that's 8m × 6m, calculate the area, find the perimeter of room B. Scales better than drawing 30 individual worksheets.

The lesson:

Primitives attract unplanned audiences. If you build the underlying capability cleanly enough, people find applications you didn't imagine.

The homeowners didn't read the developer docs. They tried Human Mode because it said "describe a room."

Build the primitive. Let the audiences find it.

#BuildInPublic #ProductLaunch #StartupLessons #IndieHacker #AITools

---

## POST 5 — THE WOBBLE (Technical storytelling — evergreen)

**Best for:** Developers, designers who appreciate craft

---

There's a deliberate algorithm inside Skissify that introduces controlled imperfection.

We call it the wobble algorithm.

Every line segment rendered by Skissify has a small random offset applied — amplitude between 0 and 8 pixels depending on paper style, frequency randomized per segment, seed stored in the URL so the sketch is reproducible.

The result looks like a hand-drawn sketch instead of a technical diagram. That's not cosmetic.

The reason it matters: the visual roughness of a sketch signals the epistemic roughness of the idea. A precise technical diagram says: "this is decided." A rough sketch says: "this is a thought I'm having."

When AI agents produce output, they need to signal the phase of the work they're doing. Exploration-phase output should look like exploration-phase output. The wobble is how we encode that signal in the rendering layer.

We spent about a week tuning the parameters per paper style:
- Napkin: high wobble, loose, feels like a rushed idea
- Blueprint: low wobble, more precise but still clearly freehand
- Technical: minimal wobble, approaches precision while keeping the sketch character
- Grid: medium wobble, notebook aesthetic

The algorithm itself is simple. The reasoning behind why it exists is not.

#TechnicalDesign #AITools #DesignDecisions #Craft #SoftwareEngineering

---

## LINKEDIN COVER STORY (for About section update)

**Headline:** Built the first sketch API for AI agents. Give your LLM a pencil.

**Summary:**
I'm the founder of Skissify — a JSON-to-hand-drawn-sketch API and MCP server that gives AI agents structured spatial output.

Before Skissify, AI agents could generate text, code, data, and images. None of them could produce a rough floor plan, wireframe, or diagram — the kind of exploration-phase spatial output humans use to think through ideas.

We built the API. Flat JSON in. Hand-drawn sketch at a permanent URL out.

Key finding from 200+ production tests: schema design has more impact on LLM spatial accuracy than model choice. Flat element list with absolute coordinates: 94% first-try accuracy. Hierarchical JSON: ~58%.

Background: Developer, founder, Stockholm-based. Building at the intersection of AI agent tooling and human-centered design.

Ask me about: MCP server integration, LLM schema design for spatial tasks, building primitives vs. products.

---

## HASHTAG STRATEGY (LinkedIn-specific)

**Primary (use on every post):**
- #AIAgents
- #BuildInPublic

**Rotate by post topic:**
- Developer posts: #SchemaDesign #LLM #MCP #DevTools #AIEngineering
- Product/founder posts: #ProductLaunch #StartupLessons #IndieHacker
- Design posts: #UX #ProductManagement #DesignThinking
- Technical posts: #SoftwareEngineering #TechnicalDesign

**Avoid (LinkedIn-specific):**
- Don't use more than 5 hashtags (LinkedIn algorithm penalizes hashtag spam)
- Avoid generic: #AI #Tech #Innovation (too broad, no community signal)
