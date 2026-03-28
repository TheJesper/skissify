# Saturday Evening: The Slow Burn That Wins Product Launches

*Day 2 dispatch — 19:38 CET, March 28, 2026*

---

There's a particular kind of Saturday evening energy in a product launch.

The announcement wave is behind you. The HN thread has cooled. The Product Hunt votes are counted. The US West Coast woke up this morning, poked around, and went on with their weekend. And you're sitting here, 44 hours in, checking a dashboard that refreshes every 5 minutes.

Here's what I've learned: this is not failure. This is the slow burn that actually wins.

## What "Good" Looks Like at Hour 44

At 44 hours in, the metrics that matter have shifted.

**Day 1 metric:** Signups (noise + signal)
**Day 2 metric:** Return visits (pure signal)

If someone opened Skissify yesterday and opened it again today, something clicked. They're not coming back because of momentum or curiosity. They're coming back because they found something they want to do with it. That's a user.

I've been watching the return visit rate today. I'm not going to post the exact number until I have more data, but the pattern is clear: there's a subset of Day 1 visitors who are genuinely exploring. They're creating multiple sketches, adjusting parameters, trying different room configurations.

These are the people who matter. Not the 500 who clicked from HN and immediately bounced. These 30-40 people who are still building things.

## The Four-Audience Moment

When I built Skissify, I had one audience in mind: AI developers building agents. MCP. JSON. Deterministic visual output. Technical people who understand why image generation fails for programmatic workflows.

48 hours later, I have four:

**Audience 1: AI developers** (the intended audience)
These are the people I built for. They get the MCP angle, they understand why a structured JSON schema matters for LLM reliability, they're building agents that need visual output. The HN thread had several of them. The r/mcp post this morning got real technical feedback.

**Audience 2: Homeowners planning renovations**
I did not see this coming. Describe a room to Claude, get JSON, paste to Skissify, get a floor plan sketch to show a contractor. Works. People are actually doing this. The hand-drawn style — which I designed to signal "approximate, not precise" — turns out to be exactly right for early-stage renovation conversations. A polished CAD drawing sets the wrong expectations. A rough sketch says "this is the idea, adjust as needed."

**Audience 3: Dungeon masters**
r/DnD. 7 million members. Someone emailed me (seriously, a cold email) to say they'd generated a 5-room dungeon map using blueprint style and it was exactly the aesthetic they'd been looking for for session prep. I hadn't targeted this community. Blueprint style + wobble algorithm + room elements = dungeon map. The product found the use case.

**Audience 4: Geometry teachers**
The most surprising one. Generate spatial math exercises with custom floor plans. "Draw a 12m × 8m rectangle with a 3m × 4m room removed from the corner. What's the remaining area?" The hand-drawn diagram makes it feel like a real problem, not a textbook abstraction.

## The Primitive Thesis

Here's what I think is happening.

Most products solve a specific problem for a specific user. They're shaped: designed for one workflow, optimized for one persona. When someone outside that persona finds them, it usually doesn't work.

Skissify is a primitive. Like a database or an API endpoint, it does one thing: takes structured spatial data and renders it as a hand-drawn sketch. It doesn't prescribe *what* the spatial data means. A bedroom is a bedroom whether you're a homeowner, a dungeon master, or a geometry teacher. The floor plan is the floor plan.

Primitives find their own use cases. Databases were built for accounting; they ended up powering social networks. APIs were built for system integration; they ended up enabling the entire SaaS ecosystem. Skissify was built for AI agents; homeowners are using it to brief contractors.

This is either very good news or a cautionary tale about product-market fit. I'm choosing to treat it as very good news.

## What Changes Because of This

A few concrete implications for the next 48 hours:

**1. Human Mode is now Day 2-3, not Week 2.**
The JSON barrier is real. Homeowners and teachers hit it hard. I'm building a natural language → sketch path this weekend. Describe your room, Claude converts it, Skissify draws it. This was in the roadmap; the discovery data moved it up.

**2. The homepage needs two doors.**
One for developers (JSON editor, MCP docs, API reference). One for everyone else ("Describe your space, get a sketch"). Same product. Different entry points.

**3. The primitives narrative is the press story.**
"I built a tool for AI developers. Dungeon masters, homeowners, and geometry teachers found it first." That's a story. It's specific, surprising, and true. It's not "AI tool launches." It's a human-interest story about what happens when you build a general-purpose primitive and let people figure out what it's for.

## What Still Needs to Happen Tonight

I'm still missing:
- Email newsletter capture (this is embarrassing — two days in and no email list)
- The wobble slider GIF (15 minutes to record, highest visual ROI per minute in the entire backlog)
- Directory submissions (PulseMCP, AlternativeTo, DevHunt — each takes 10 minutes)

Tonight's goal: at least one of these three. Probably the newsletter, because every hour without email capture is permanent loss.

## To the People Still Building on Saturday Evening

If you're a developer reading this on a Saturday evening: yes, some of us launch on Fridays and spend the weekend watching dashboards. It's a specific kind of absurd.

But it's also the moment where you find out what your product is actually for. The audience you didn't plan for is often the most valuable one.

Skissify: [skissify.com](https://skissify.com)

—

*This post is part of the Skissify build-in-public series. Building in public means posting honest dispatches, not marketing. If something's working, I'll say so. If something's not, I'll say that too.*
