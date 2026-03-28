# 72 Hours In: The Honest Skissify Launch Retrospective

*Published: Saturday March 28, 2026 — 21:48 CET (Day 3)*
*Platform: Indie Hackers (primary), Dev.to, Medium, Substack*

---

**TL;DR:** Skissify launched Friday March 27. Three days in, here are the real numbers, the four audiences we didn't expect, the one feature we're rushing to ship, and what the next 7 days look like.

---

## What We Launched

Skissify: a JSON-to-hand-drawn-sketch API for AI agents. You describe spatial data — floor plans, wireframes, diagrams — as structured JSON. Skissify renders it as a hand-drawn sketch in one of four paper styles: napkin, floor plan, blueprint, or villa.

The MCP server was the lead product. Install in Claude Desktop, and Claude can generate sketches natively. The JSON schema was designed specifically for LLM generation — flat, absolute coordinates, top-level aesthetics — and it shows: Claude Sonnet gets a 94% first-try success rate.

---

## The Real Numbers (72 Hours)

| Metric | 72-Hour Actual |
|--------|---------------|
| Website unique visitors | [FILL FROM ANALYTICS] |
| Signups | [FILL FROM DB] |
| Sketches created | [FILL FROM DB] |
| Pro subscriptions | [FILL FROM STRIPE] |
| MCP server installs | [FILL FROM NPM] |
| HN rank (peak) | [FILL FROM HN] |
| PH upvotes | [FILL FROM PH] |
| Newsletter subscribers | [FILL FROM EMAIL TOOL] |

*Fill these in before publishing. Don't publish with placeholders.*

---

## What Worked

### 1. Technical specificity beats vague AI claims

Every post that cited a real number performed better than every post that used general language. "94% first-try success rate on floor plan JSON" outperforms "works great with leading LLMs." 

The benchmark post — "Which AI Model Is Best at Drawing Floor Plans?" — became the second-most-shared piece of content. Developers want to know which model to use. We gave them the answer.

### 2. The surprise use case angle has legs

"I built it for AI engineers. Homeowners, dungeon masters, and geometry teachers found it first."

That line has now appeared in every piece of high-performing content. It's not a marketing decision — it's a true observation from Day 1 data. True observations that surprise people get shared. That's it.

### 3. r/mcp on Day 2 outperformed Day 1 Product Hunt

We didn't post to r/mcp on launch day. Critical mistake. When we posted Saturday morning — with real data, real user stories, and a genuine feedback request — the response was significantly more engaged than the cold PH launch. 

Lesson: the community you were actually built for is worth more than the loudest launch channel.

---

## What Didn't Work

### 1. Zero email capture for 48 hours

This is the most expensive mistake of the launch. We had hundreds of visitors on Day 1 with no email capture. Those people are gone. We don't know who they were. Some of them were exactly the audience we'd want in a newsletter.

Adding email capture was on every Day 1 checklist. It didn't happen until Saturday. Every hour without a signup form is a permanent loss.

**Fix:** Email capture is live as of Saturday. Newsletter enrollment starts now.

### 2. No video content

The wobble slider — 10 seconds showing the sketch humanness slider go from 0 to max — is the single highest-ROI piece of content we haven't created. It's visually satisfying. It requires no narration. It makes the core product mechanic instantly obvious.

We've been writing about the wobble algorithm for 72 hours. We haven't shown it.

**Fix:** Recording Saturday afternoon. Will ship TikTok/Reels Sunday.

### 3. Product Hunt timing

EU-based launch with a US-centric platform is genuinely hard. The PH algorithm rewards votes in the first 2 hours. If your audience is asleep for those 2 hours, you're competing with half your capacity.

**Fix for next time:** Coordinate DM outreach the night before to US-timezone contacts, not morning-of.

---

## The Four Audiences We Didn't Build For

Skissify was designed for one audience: AI engineers building agent workflows who need a visual output layer.

By Day 2, four distinct audiences had signed up:

**Audience 1: AI/MCP Developers** (built for them)
Using the MCP server to generate floor plans, system architecture sketches, and UI wireframes programmatically. The intended user.

**Audience 2: Homeowners and Renovators** (not built for them)
Describing kitchen layouts and bathroom redesigns to Claude, pasting the resulting JSON into Skissify, and printing the sketch to show contractors. This workflow emerged without any product guidance from us.

**Audience 3: Dungeon Masters / TTRPG Players** (not built for them)
Using the blueprint paper style to generate dungeon maps. An email from a DM who found the tool via Google led to the r/DnD post idea.

**Audience 4: Educators** (not built for them)
A geometry teacher reached out asking if she could use AI-generated spatial diagrams for classroom exercises. The use case made immediate sense.

**What this means:**

Audiences 2, 3, and 4 all share one problem: they want Skissify's output, but they don't want to write JSON.

That's the product insight that's driving Human Mode.

---

## The Week 2 Priority: Human Mode

Human Mode: type a description in plain English, get a sketch. No JSON.

> "A small apartment, two bedrooms, living room with south-facing windows, galley kitchen"

Submit. Claude converts to JSON. Skissify renders the sketch.

Same output. Different input. Every barrier removed for non-developers.

Ship target: end of weekend (Sunday March 29).

---

## Monday's Plan: Second HN Post

"Show HN: Skissify + Human Mode — describe a room, get a hand-drawn floor plan"

Human Mode is a genuinely new feature, not a re-post. The second Show HN is harder to land but justified when there's a concrete new capability to show.

Post time: Monday 09:00 CET.

---

## What I'd Do Differently

1. **Add email capture before launch.** Not on Day 1. Before launch.
2. **Record one GIF before launch.** Just one. The wobble slider.
3. **Post to r/mcp on launch day.** The core community should hear about the product from the maker, not from someone who found it.
4. **Charge more from day one.** EUR 5/mo is extremely low for a developer tool. The first 50 users won't price-shop. We'd have the same signups at EUR 15/mo.

---

## Week 2 Focus

| Priority | Action |
|----------|--------|
| 1 | Ship Human Mode |
| 2 | Second HN post (Monday) |
| 3 | Newsletter outreach: TLDR AI, The Rundown, Ben's Bites |
| 4 | TypeScript SDK (`@skissify/client`) |
| 5 | Directory submissions: PulseMCP, AlternativeTo, DevHunt |
| 6 | Publish 10 public example sketches (SEO) |
| 7 | Interactive JSON playground on homepage |

---

## The Number That Matters Most

Not signups. Not PH rank.

**Return visits.**

If people come back to Skissify 24-48 hours after their first session, the product has pull. That's the number to watch in Week 2.

---

*Skissify is a JSON-to-hand-drawn-sketch tool for AI agents and developers. MCP server, REST API, free tier. skissify.com*

*Built in Stockholm. Launched March 27, 2026.*

---

**Tags:** #BuildInPublic #LaunchRetrospective #IndieHackers #MCP #AIAgents #ProductLaunch
