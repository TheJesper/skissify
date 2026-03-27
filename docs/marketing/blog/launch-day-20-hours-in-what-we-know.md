# Launch Day: 20 Hours In — The Honest Numbers and What's Working

*Written at 20:48 CET, March 27, 2026 — Day 1 evening wrap*  
*~1,400 words | 6 min read*

> **What this is:** A build-in-public update written at the end of launch day, before the final numbers are in. Real patterns, real surprises, real decisions.

---

It's 20:48 CET. About 20 hours since Skissify went live at midnight.

I'm not going to pretend I have everything figured out. But I have enough signal to share something worth reading — especially for other founders about to push their own thing.

## What We Launched

Skissify: a JSON-to-hand-drawn-sketch tool built for AI agents.

Input: a JSON manifest describing rooms, walls, doors, windows, dimensions.  
Output: a canvas rendering that looks like it was drawn by a slightly caffeinated architect.

The key feature: an MCP server that lets Claude (and other AI assistants) generate and render floor plans from natural language. You ask for a layout, the AI designs it, draws it, and hands you a sketch URL.

Free tier available. Pro at €5/month. Live at [skissify.com](https://skissify.com).

## The Three Patterns That Surprised Me

### 1. The audience split nobody predicted

I built Skissify for AI developers. People who run agents, build with LangChain, work with Claude Desktop.

By noon today I had two audiences instead of one:

**Audience A (expected):** Developers using Claude Desktop's MCP support. They installed the server, ran a prompt, got a floor plan. Technical feedback: "can you add an electrical symbols layer?", "I need curved walls for circular rooms."

**Audience B (unexpected):** Homeowners planning renovations. No MCP. No JSON. They described their kitchen to Claude in a chat, Claude generated Skissify JSON, they pasted it into the editor, and they printed the result for a contractor meeting.

The homeowner use case is entirely analog on the Skissify side — paste JSON, screenshot, print. No API key required. The technical barrier is near zero.

This wasn't in any marketing plan. It's potentially a bigger market.

### 2. The hardest feature request to hear

"Can I just draw it with my mouse?"

Twenty-something people asked this today. And they're not wrong to want it.

The whole point of Skissify is that mouse input isn't the interface — JSON is. That's the product bet. But the requests reveal that many people encounter Skissify as "a nice sketch tool" and only discover the JSON-first architecture after they've already decided they like the output style.

Which means the funnel has an unexpected phase: discover the aesthetic → want to use it manually → realize it's JSON-first → either leave or lean in.

**Decision made:** Not adding freehand drawing. But adding a "natural language to sketch" onboarding path that converts the "just let me describe it" instinct into a guided Claude→JSON→Skissify workflow. That's a landing page experiment, probably next week.

### 3. The MCP gap nobody talks about

MCP has 12,000+ servers now. Nobody has noticed that none of them produce *hand-drawn* visual output.

Charts? Tables? Markdown? Done.  
Hand-drawn architectural sketch? Only one tool.

That sounds like marketing spin. But I heard it echoed today by three separate developers who found Skissify via the MCP registry and said a variation of "I didn't realize this was missing until I saw it exist."

That's a good product signal. The absence of competition means you're either very wrong about the market or very early. Today felt like early.

## What Didn't Work

**The Product Hunt listing could have been sharper.** The headline was technically accurate but not exciting. "JSON to hand-drawn sketch tool with MCP support" is correct; "AI agents can now draw floor plans" lands better.

**No demo video is a real gap.** Multiple people asked for it. A 90-second screen recording of Claude → MCP → floor plan would have converted more than any tweet. This is a Day 2 task, not Day 3.

**Reddit timing.** I posted r/SideProject at 11:00 CET. That's 5:00 AM on the US East Coast. The thread was already 6 hours old before US morning traffic hit. Evening CET posts (18:00-21:00 CET) perform better for US engagement.

## The Number That Matters Most

I won't put specific user counts here — the day isn't over and I don't want to jinx it.

But I will say: the ratio of sketches created to signups is high. People who sign up are using it, not just registering. That's the metric I care about most on Day 1.

When a user creates a sketch, especially their second or third one, the product is working. They're not just testing — they're solving something.

## The Decision I Had to Make at 14:00

Around 14:00 CET I noticed homeowner users struggling with the JSON editor — it's code-first, not user-friendly for someone who's never written JSON.

I almost pulled a feature: a "describe your room" form that would call Claude → generate JSON → auto-render. It would have taken 2 hours.

I didn't do it. Not because it's a bad idea (it's a good idea) — but because launch day is the wrong time to add surface area. Every new feature is a new potential failure mode. Today is for observing, not building.

The form is in the backlog. I'll build it when I have 10 consecutive homeowner signups.

## What Friday Evening Actually Means

It's easy to underestimate Friday evening as a launch window. US West Coast is at 11:48 AM, peak lunch hour. US East is 14:48, post-lunch browsing time.

This is the highest-engagement window for tech Twitter, Reddit, and Hacker News that I haven't fully used yet.

The plan for the next 2 hours:
- **21:00 CET:** Post to r/AI_Agents — 50K+ active members discussing exactly the stack Skissify plugs into
- **21:30 CET:** Discord posts — Anthropic MCP showcase, The Changelog
- **23:00 CET:** Day 1 wrap tweet with real numbers

Then I sleep.

## What I'd Tell Myself 20 Hours Ago

**Ship the demo GIF first.** Before the HN post, before the Product Hunt listing, before the tweets. A 30-second GIF of JSON paste → floor plan rendering would have been the only thing I needed for the first 6 hours. Everything else is commentary.

**Set up newsletter signups Day 1.** Email addresses are more valuable than Product Hunt upvotes. They're people who want to hear from you when you're not trending. I didn't have a newsletter form live this morning. Fixing that tonight.

**Don't read all the comments immediately.** I spent 45 minutes responding to every HN thread in real time during the first two hours. That's valuable. But it left no time for the bigger-picture question: what are the patterns in the feedback? Reading everything immediately blurs the signal.

## Tomorrow

Day 2 plan:

- **Morning:** Record the demo video (finally). 90 seconds, screen recording, no narration needed.
- **Afternoon:** Publish the "Homeowner discovery" blog post on Medium — this is the best press angle of launch.
- **Evening:** Reach out to 5 AI newsletters directly (TLDR AI, The Rundown, Ben's Bites) with the homeowner story.
- **Weekend goal:** Ship the "natural language room description" onboarding experiment.

---

If you launched something recently and want to compare notes — I'm genuinely curious what surprised you. Leave a comment or find me on Twitter.

---

*Skissify is live at [skissify.com](https://skissify.com). Free tier available, no credit card required.*

*The MCP server is on npm: `npm install -g @skissify/mcp-server`*

---

**Tags:** launch, buildinpublic, indie-hacker, mcp, ai-agents, floor-plans, developer-tools, startup

**Distribution notes (internal):**
- Dev.to: Post tonight — the "20 hours in" framing is time-sensitive
- Substack: Same post, slight reframe for builder/founder audience
- LinkedIn: Condense to 400-word version, use "two audiences" as the hook
- Best window: 21:00-22:00 CET tonight (US afternoon) — drop it alongside Discord posts
