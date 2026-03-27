# Five Unexpectedly Delightful Uses for Skissify (That I Didn't Plan For)

*Published: March 27, 2026 — Day 1 of Skissify*
*Best platforms: Medium, Dev.to, Substack, Indie Hackers*
*Reading time: ~5 minutes*

---

I built Skissify to give AI agents a way to draw.

The pitch was simple: AI can reason about space and layout. Skissify gives that reasoning a visual output — JSON goes in, a hand-drawn sketch comes out. The intended user was an AI developer building with MCP, Claude Desktop, or a custom agent pipeline.

That was the plan.

Here's what actually happened on launch day.

---

## 1. Dungeon Masters Are Using It for Map Sketches

I did not see this coming.

Within a few hours of launch, someone in the Mastodon AI community posted that they'd been using Claude + Skissify to generate dungeon maps for their tabletop RPG campaign.

The workflow: describe the dungeon layout ("entrance chamber, 3 corridors, a trapped room, a boss chamber with pillars"), Claude generates the Skissify JSON, and a hand-drawn floor plan appears.

The hand-drawn aesthetic turns out to be *perfect* for dungeon maps. It looks exactly like the maps you'd sketch in a notebook during a campaign planning session. The wobble in the walls, the slightly imprecise corners — it reads as "dungeon blueprint" immediately.

I hadn't added a `dungeon-wall` element type. Turns out the existing `room`, `wall`, `door`, and `column` elements are enough to make a very convincing dungeon.

**The element combination that works:**
- `room` with no label for unmarked chambers
- `wall` segments for corridors
- `door` elements for passage openings
- `column` for pillars inside rooms
- `text` annotations for traps and treasure locations
- Blueprint paper style (dark background + white lines = cave aesthetic)

If you run a TTRPG campaign, try this prompt with Claude:

> "Design a dungeon map for a 3-chamber encounter: an entrance hall with pillars, a narrow corridor with a trapped tile, and a circular boss chamber. Make the rooms feel tense and confined. Use Skissify JSON format."

You'll get a hand-drawn dungeon map in about 30 seconds.

---

## 2. Homeowners Are Briefing Contractors With It

This one I nearly cried over. In a good way.

The most common message I got on Day 1 wasn't from AI developers. It was from people planning renovations.

The pattern: describe your kitchen (or bathroom, or home office) to Claude in plain language. Claude translates it into Skissify JSON. You get a hand-drawn floor plan. You print it out or share the link and show it to your contractor.

"I've been trying to describe where the island should go for three separate contractor calls. I did this in five minutes and they got it immediately." — DM from a user on launch day

The reason it works: Skissify's output is deliberately rough. It doesn't look like a CAD drawing. It looks like what a thoughtful homeowner would sketch on a piece of paper to communicate an idea.

That roughness is load-bearing. Contractors understand "this is a plan, not a blueprint." They engage with it, suggest changes, tell you what's practical. A polished floor plan creates commitment. A rough sketch invites conversation.

I built this for AI developers. Homeowners built a workflow I never imagined.

---

## 3. Product Managers Are Using It for Feature Flow Diagrams

Unexpected use case #3 came from a product manager who found it through Hacker News.

She'd been using Claude to reason through a user onboarding flow and wanted to sketch the sequence — not as a polished Figma wireframe, not as a Mermaid diagram, but as a rough spatial layout: "screen A leads to screen B, which has a modal for C."

The `arrow` and `text` elements in Skissify, combined with simple `rect` boxes for screens, produce a serviceable flow diagram with a hand-drawn look that screams "this is still being figured out."

The insight she shared: in design reviews, a polished diagram implies the decision is made. A sketch diagram invites feedback. Skissify produces sketches, not deliverables. That's the point.

**Simple flow diagram prompt:**
> "Map out a 4-screen onboarding flow: welcome screen, account setup, preferences selection, and main dashboard. Add an arrow for the happy path and mark the account setup screen as a modal. Use Skissify JSON."

---

## 4. Educators Are Using It to Explain Spatial Concepts

A high school geometry teacher found Skissify and has been using it to generate example floor plans for spatial reasoning exercises.

The workflow: generate a floor plan from a prompt, print the sketch, give students questions about area, adjacency, and scale.

What makes it useful for education:
- The hand-drawn aesthetic makes it feel approachable, not intimidating
- You can generate infinite variations with different parameters
- The JSON is a teaching tool too: students can see the coordinates and work backwards

This wasn't planned. But it's a real use case, and it suggests a "Skissify for Education" guide might be worth writing.

The AI generation angle also teaches something valuable: understanding why `x: 50, y: 50, width: 200, height: 150` produces a room in the top-left corner of the canvas is solid spatial math in disguise.

---

## 5. Real Estate Agents Are Using It for Pre-Listing Sketches

This came from a real estate professional who saw the homeowner posts and adapted it.

The use case: before a professional floor plan is ordered (which costs money and takes days), agents now have a quick way to create a rough layout sketch for early-stage client conversations.

"I described the property from memory in a listing walkthrough. Had a rough floor plan to show at the debrief. Client felt prepared. That sketch saved 30 minutes of confusion."

The Skissify output isn't accurate to the millimeter. It's not meant to be. It's a communication tool for the "does this make sense as a space?" conversation that happens before any precision matters.

A hand-drawn sketch at 80% accuracy that takes 5 minutes beats a precise drawing that takes 3 days and costs €300 — when all you need is "can I picture this space?"

---

## What This Means

I built a primitive. Primitives don't have one use case — they get applied wherever the underlying capability is valuable.

The underlying capability here is: **converting spatial descriptions into hand-drawn visual artifacts, rapidly, at no meaningful cost.**

Dungeon maps, contractor briefs, PM flow diagrams, geometry exercises, real estate pre-listings — these are all the same primitive, applied differently.

There are probably 50 more use cases I haven't heard about yet. If you find one, I want to know.

---

## Try It

**Free, no signup for the editor:** [skissify.com/editor](https://skissify.com/editor)

**Install the MCP server (lets Claude draw for you):**
```
npm install -g @skissify/mcp-server
```
Add to your Claude Desktop config → restart → ask Claude to draw anything spatial.

**Schema docs:** skissify.com/docs

---

*What's the most creative use case you can imagine? DM me or leave a comment. The weirder, the better.*
