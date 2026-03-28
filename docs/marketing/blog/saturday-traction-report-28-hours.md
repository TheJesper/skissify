# The Saturday Traction Report: 28 Hours In, Three Surprises

*Published: March 28, 2026 — 04:00 CET*

---

It's 04:00 on a Saturday morning. The launch happened 28 hours ago. I'm still awake.

Here's what I know, what surprised me, and where this goes from here — written in real-time while the numbers are still fresh.

---

## What We Launched

Skissify is a tool that turns JSON into hand-drawn sketches. AI agents can use it via MCP. That's the pitch. One line. Simple.

The URL is `skissify.com`. The MCP server is `npm install -g @skissify/mcp-server`. Free to start. €5/month for private sketches and API access.

I built it because Claude can reason spatially — it can describe a room, plan a floor layout, think about where the doors go — but it had no way to *draw* it. Text-only AI output is a design flaw, not a feature.

---

## The Three Surprises

### Surprise 1: The AI Developers Weren't First

I expected the Hacker News crowd to show up and start poking at the JSON schema. They did. But they weren't first.

The first wave came from somewhere I wasn't watching: Mastodon. Specifically, the #BuildInPublic and #IndieDev threads. These aren't AI developers — they're makers. People who build side projects and share them. They liked the idea of "JSON in, sketch out" immediately, without caring about the MCP angle at all.

This matters. There's a market here that doesn't need to understand agent infrastructure. They just want a tool that draws things from structured data. That's a wider audience than I planned for.

### Surprise 2: The Floor Plan Used for D&D Dungeon Maps

Someone on Mastodon mentioned — casually, in a reply, not even as a compliment — that they'd used Skissify to generate a dungeon map for their D&D campaign.

"I asked Claude to design a 5-room dungeon. Pasted the JSON into Skissify. Blueprint paper style. My party loved it."

I hadn't thought about this use case. Not once. But the architectural primitives — rooms, corridors, stairs, doors — are exactly what a dungeon map needs. The hand-drawn aesthetic is *better* for D&D than a clean digital map. r/DnD has 6.4 million members.

This is now on the marketing plan.

### Surprise 3: The JSON Barrier Is Bigger Than Expected

Non-developer users hit the wall immediately. They see the JSON input, understand what the output looks like, want the output — and don't know how to write the input.

The feature gap is "Human Mode": a natural language field where you describe what you want, and an AI generates the JSON automatically. This was planned for Month 2. After Day 1, it's now Day 2-3.

The product is fundamentally better with this feature. The architecture is almost free — Claude API, one endpoint, a textarea. The only reason it wasn't Day 1 is that I was building for AI developers who know JSON. The broader market doesn't.

---

## The Numbers (As Of 04:00 CET)

I won't publish exact numbers here — they're preliminary and I want to do the honest accounting once we're at 48 hours.

What I can say:
- **Signups**: More than I expected for midnight CET
- **Sketches created**: Running at roughly 3-4x signups, meaning people are actually using the editor, not just creating accounts
- **Pro conversions**: Non-zero, which is the most important thing on Day 1
- **MCP installs**: Hard to track (it's an npm package), but npm download stats will tell the story on Monday

---

## The Marketing That Worked

In order of ROI:

**1. The Hacker News Show HN post.** Even moderate HN engagement sends high-quality traffic. The comment section is where the product gets pressure-tested, and pressure testing on Day 1 is more valuable than upvotes.

**2. The "unexpected use case" tweets.** The dungeon map tweet. The homeowner renovation tweet. These outperformed the technical launch announcement by a factor of several. Authentic surprise beats polished copy every time.

**3. Product Hunt.** PH is not about the upvotes — it's about the backlink and the legitimacy signal. Every directory that checks "has this been on Product Hunt?" now gets a yes.

**What didn't work (yet):** The newsletter outreach. Templates were written. Emails drafted. But I didn't send them during launch day because I was responding to HN comments. This is Week 1 work.

---

## What I'm Fixing Today

**Priority 1:** Human Mode. Adding a textarea to the editor where you describe what you want, Claude generates the JSON, it renders immediately. ETA: tonight or tomorrow morning.

**Priority 2:** Email capture. No newsletter signup exists anywhere on the site. Every visitor who leaves is a subscriber I didn't get. Adding a post-sketch "get updates" CTA today.

**Priority 3:** r/mcp. I launched a product specifically for MCP developers and forgot to post to r/mcp on launch day. That's embarrassing. Posting at 07:30 CET.

---

## What Skissify Actually Is (Day 2 Version)

I've been saying "JSON to hand-drawn sketch." That's accurate but incomplete.

The better frame: **Skissify is the visual output layer for AI agents.**

AI agents can write code, search the web, send emails, browse pages, query databases. But they can't *draw*. They have no visual output primitive. When a user asks "design a floor plan for my kitchen renovation," the AI generates a text description with dimensions and door positions. That's not what the user wants. They want to *see it*.

Skissify is the drawing part. The part that was missing.

That's the pitch. That's why it matters. Not because hand-drawn sketches are prettier than Excalidraw diagrams — they might not be — but because AI agents now have a new output type that they didn't have before.

---

## The Week Ahead

- **Today (Saturday):** r/mcp post, r/DnD post, Human Mode scoping, email capture
- **Sunday:** Human Mode MVP, Day 2 retrospective blog, newsletter outreach
- **Monday:** npm stats, real traction numbers, AlternativeTo submission, BetaList
- **This week:** Video demo (the wobble slider is 15 minutes to record), Dev.to series start, SEO content (the floor plan use cases are the long-tail keywords)

---

## One More Thing

If you're reading this and you found Skissify in some community somewhere — a Reddit post, a Mastodon thread, a Discord server — I'd genuinely love to know how you found it and what you were trying to do when you arrived.

Not for analytics. For product decisions.

The use cases I didn't plan for are more interesting than the ones I did.

→ jesper@skissify.com
→ skissify.com

---

*Jesper Landmér is the founder of Skissify. He writes about building tools for AI agents, the economics of side projects, and whatever surprised him this week.*
