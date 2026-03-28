# The Four Unplanned Audiences of Skissify

*Published: March 28, 2026*  
*~1,100 words | 5 min read*  
*Best platform: Medium (primary), Substack, Dev.to*  
*Tags: #BuildInPublic #Primitives #IndieHackers #ProductLaunch*

---

I built Skissify for one audience.

Four found it.

That gap between "who I built it for" and "who actually showed up" is the most interesting thing that happened on launch day — more interesting than the product itself.

---

## Who I Built It For

AI developers. The LangGraph user, the Claude Desktop power user, the person building multi-agent workflows and hitting the same wall I kept hitting: AI can _reason_ spatially, but it can't _draw_.

The pitch was simple: **JSON in, hand-drawn sketch out, native MCP server included.** Claude tells Skissify what to draw. Skissify draws it. No human intermediary.

That audience showed up. They were engaged, they tested the MCP integration, they asked good questions about the JSON schema on Hacker News. As expected.

Then the others arrived.

---

## Audience 2: Homeowners Briefing Contractors

The first message I didn't expect came from someone who had been asking Claude to help plan a kitchen renovation. They'd describe the room, Claude would suggest a layout, and then... nothing. The idea existed as text. No way to show the contractor.

They found Skissify, had Claude generate the JSON, pasted it into the editor, and printed the sketch.

"Finally showed my builder exactly what I meant," they wrote.

This person never heard of MCP. They didn't care about the JSON schema. They wanted something they could print and bring to a meeting.

The product solved their problem better than it solved mine.

---

## Audience 3: Dungeon Masters

I never targeted r/DnD. I didn't think of TTRPG communities. I was focused on agent developers.

On Day 1, someone emailed: "Blueprint paper + wobble = perfect dungeon map. Adding secret door notation to my wishlist."

They'd discovered that Claude's dungeon-master capabilities combined with Skissify's blueprint style created something neither tool was designed to do. A circle with columns becomes a boss chamber. A rect with stairs becomes a treasure vault. The hand-drawn aesthetic isn't a bug — it's the aesthetic dungeons are drawn in.

This audience is enormous. r/DnD has 7M members. r/TTRPG has 320K. None of them were in the launch plan.

---

## Audience 4: Geometry Teachers

This one I genuinely didn't see coming.

A teacher in the Discord mentioned using Skissify to generate floor plan diagrams for spatial math exercises. "Students understand area and perimeter better when the shape is a room they can imagine, not an abstract rectangle."

AI generates differentiated practice problems as spatial exercises. Scale the dimensions, swap room types, add complexity — all via prompt. 30 diagrams in 10 minutes for a classroom exercise that would have taken an hour to draw by hand.

r/Teachers has 380K members. The intersection of "AI-generated educational content" and "hand-drawn spatial diagrams" has exactly zero other tools targeting it.

---

## What This Means

There's a product strategy concept called "primitives vs apps." An app does one specific thing for one specific audience. A primitive is infrastructure that enables multiple different use cases.

Skissify was designed to be a primitive — JSON in, sketch out, connect it to whatever. But I didn't fully internalize what that meant until four different audiences started using it for four things I didn't design for.

The homeowner doesn't care about MCP. The dungeon master doesn't care about the JSON schema. The geometry teacher doesn't care about AI agents.

They all care that it draws what they describe.

That's the primitive underneath the developer tool.

---

## The Uncomfortable Part

When four audiences show up unexpectedly, the natural instinct is to try to serve all of them better. Build a homeowner onboarding flow. Add dungeon-specific elements. Create a teacher template library.

All of that is probably correct long-term. But short-term, it creates a positioning problem: who is this for?

My answer right now: **it's for whoever can describe what they want to draw.** That includes AI agents. It includes homeowners. It includes dungeon masters. It includes geometry teachers.

The primitive doesn't discriminate. That's its whole point.

---

## The Question Worth Asking

If you're building something with AI infrastructure underneath, the right question isn't "who is my target audience?"

The right question is: **"what problem does the underlying capability solve, regardless of context?"**

For Skissify, the capability is: describing a space → getting a visual representation of it.

That capability matters to:
- AI developers who want agents to produce visual artifacts
- Homeowners who can describe what they want but can't draw it
- Dungeon masters who can imagine dungeons but spend hours mapping them
- Teachers who need spatial diagrams at scale

None of those audiences overlap. All of them have the same underlying need.

Build the primitive. The audiences will find you.

---

*Jesper Landmér is building Skissify — JSON to hand-drawn sketches for AI agents and anyone who can describe what they want to see. Try it at [skissify.com](https://skissify.com).*
