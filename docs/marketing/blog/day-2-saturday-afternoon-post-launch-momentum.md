# Day 2 Saturday Afternoon: Post-Launch Momentum and the Primitives That Find Themselves

*Published: March 28, 2026 — Best platform: Indie Hackers, Substack*
*~1,100 words | 5 min read*

> **TL;DR:** Skissify launched Friday March 27. Today is Day 2 — Saturday afternoon. The audience finding us wasn't the one we built for. That's the most important launch signal.

---

It's 13:00 CET on Saturday. 37 hours since Skissify launched.

Here's what I know now that I didn't know Friday night.

## The Audience Doesn't Read Your Product Brief

I built Skissify for AI developers. Specifically, I built it for engineers who work with MCP (Model Context Protocol) and want visual output from their agent workflows.

I did not build it for:

- Homeowners planning kitchen renovations
- Dungeon masters generating campaign maps
- Geometry teachers making classroom exercises
- Interior designers communicating concepts to clients
- Garden planners sketching raised bed layouts

All of these people showed up on Day 1.

This is not a criticism of marketing — it's the natural behavior of a well-built primitive. When you create a general-purpose capability ("describe a space, get a hand-drawn sketch"), the use cases self-organize. Your job is to watch where they go.

## What the Data Looks Like at 37 Hours

Saturday afternoon metrics (will be updated at the end of day):

| Metric | Target | 37h Actual |
|--------|--------|------------|
| Total signups | 200 | [FILL] |
| Sketches created | 500 | [FILL] |
| MCP renders (via Claude) | 100 | [FILL] |
| Pro conversions | 20 | [FILL] |
| Return visitors (Day 2) | — | [FILL] |
| Countries | 50 | [FILL] |

The return visitor metric is the one I'm watching most closely today. Anyone who came to Skissify on Friday, went away, thought about it, and came back Saturday — that's a real user. Signups fluctuate. Returns don't.

## Three Things That Work Better Than Expected

**1. Technical specificity wins over vague AI claims.**
Every post that said "94% first-try LLM success" outperformed posts that said "AI can draw." The number is the hook. The audience that cares about it is exactly the audience you want.

**2. Honest unexpected use cases go further than planned ones.**
The r/DnD discovery (dungeon masters using Skissify for campaign maps) was unplanned. Tweeting about it honestly, with "I did not plan for this," generated more replies than any launch announcement. People share authentic surprises.

**3. The wobble slider is better marketing than any tagline.**
10 seconds of watching lines go from ruler-straight to hand-drawn teaches the product better than 500 words of copy. Record the demo. Post the demo. Everything else is secondary.

## Three Things That Were Harder Than Expected

**1. Email capture.** 
I wrote 60+ blog posts and forgot to add a single email field to the website. Every visitor who got value and left is gone. This is fixed today — but the hours between launch and the fix are permanently lost.

**2. The r/mcp gap.**
The most targeted community for Skissify — 20,000 MCP developers — didn't hear about us until Saturday morning. Launch day went to r/SideProject, HN, LinkedIn, Twitter, Discord, and dozens of subreddits. Not r/mcp. That's fixed now too, but Day 1 momentum in the most relevant community is something you don't get back.

**3. Human Mode not shipping with launch.**
The homeowner use case is real and large. But every homeowner who found us on Friday hit the JSON wall. The path between "Claude describes your kitchen" and "sketch appears on screen" requires a Human Mode input field that converts natural language → Claude API → JSON → render. That's shipping this weekend. It should have shipped before launch.

## What Day 2 Actually Looks Like for a Developer Tool

Day 1 is novelty. The product is new. Every post, every subreddit, every Twitter thread has a "just launched" freshness to it that generates engagement on momentum alone.

Day 2 is different. You have data now. Real people have tried the product. The feedback is in. The bugs have surfaced.

Day 2 content that works:
- **Honest metrics with context** (not just numbers, but what they mean)
- **The unexpected use cases** (authentically framed, never forced)
- **Technical depth posts** (the audience who cares is arriving today, not yesterday)
- **Community-specific posts** (r/mcp, r/LocalLLaMA, r/AI_Agents — the exact-fit communities)

Day 2 content that doesn't work:
- Re-posting the launch announcement in different wording
- "Reminder: we're live!" posts
- Fake urgency (there is no urgency)

## The Primitives That Find Themselves

The kitchen renovation story is the best thing that happened on Day 1.

Not because homeowners are the core market. Not because we're pivoting. But because it proves the product is general enough to be discovered by people with a real problem who weren't looking for us specifically.

They were looking for: "how do I show my contractor what I mean?"

They found: a sketch tool that an AI could drive.

That's the primitive working. The use case found the capability, not the other way around.

In a world where everyone is building apps for specific audiences, building a primitive and watching the use cases emerge is unusual. It's also how the biggest software categories start.

Mermaid didn't launch as a "developer workflow documentation tool." It launched as "text to diagram." Use cases accumulated.

npm didn't launch as "the JavaScript package ecosystem." It launched as a package manager. The ecosystem emerged.

Skissify launched as "give AI agents a pen." The kitchen renovation, dungeon map, and geometry worksheet users found it themselves.

## What's Shipping This Weekend

**Human Mode** — describe your space in natural language, Skissify calls Claude, Claude generates the JSON, sketch renders. No JSON required. Ships Saturday or Sunday.

**Email newsletter** — already added. If you want honest build-in-public updates including the real metrics at the end of Day 2, subscribe at skissify.com.

**LLM benchmark post** — published on Dev.to Saturday morning. Claude Sonnet: 94%, GPT-4o: 88%, Mistral 7B: 52%. The schema is doing as much work as the model.

---

Day 3 is Sunday. The weekend developers are active. The dungeon masters are playing their games. The homeowners are planning their renovations.

Skissify is somewhere in all of that, being used in ways I didn't fully anticipate.

That's the best possible version of a product launch.

→ Try the editor: **skissify.com/editor** (no signup, no account)  
→ MCP server: `npm install -g @skissify/mcp-server`  
→ Follow the build: [newsletter link]

---

*Jesper, founder of Skissify*  
*Building in Stockholm, launching globally*  
*March 28, 2026*
