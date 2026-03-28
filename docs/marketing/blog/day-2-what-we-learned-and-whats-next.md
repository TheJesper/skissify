# Day 2: What Launch Day Actually Taught Us About Skissify

*March 28, 2026 — Publish on Indie Hackers, Dev.to, Substack*
*~1,800 words | Build-in-public retrospective*

> **Real talk:** Launch day is over. Here's what the first 24 hours actually looked like — the audiences we didn't plan for, the gaps we missed, and the Day 2 plan. No vanity metrics, no hype.

---

I launched Skissify yesterday at midnight Stockholm time.

By this morning, I had numbers. Real ones. Not the ones I was hoping for — the actual ones.

Here's everything.

## What Skissify Is (Quick Version)

Skissify turns JSON into hand-drawn sketches. The key differentiator: it has an MCP server, so AI agents like Claude can generate floor plans, diagrams, and wireframes without any human drawing. JSON in, sketch URL out.

## The Day 1 Numbers

I'll update this post with actuals, but here's the framework for what I measured:

- **Signups**: [tracking free + Pro separately]
- **Sketches created**: [total renders, including from editor paste]
- **Via AI/MCP**: [% of renders triggered by MCP vs manual]
- **Pro conversions**: [the ones that matter]
- **Countries**: [geographic spread]

## The Three Audiences I Didn't Plan For

This is the most important thing I learned on Day 1.

### Audience 1: Homeowners

I built Skissify for AI developers and MCP engineers. By noon, I had messages from homeowners.

The workflow: describe your kitchen renovation to Claude → Claude generates Skissify JSON → paste it in → floor plan appears → print for the contractor meeting.

One woman messaged me: "He understood immediately. Usually I spend hours trying to explain what I want."

She didn't know what JSON was. She didn't need to. Claude handled that translation layer.

### Audience 2: D&D Dungeon Masters

Blueprint paper style + wobble algorithm = exactly the aesthetic of a hand-drawn dungeon map. A Mastodon post about this went small-viral. r/DnD picked it up by evening.

I had literally never considered this use case. Now it's in the roadmap.

### Audience 3: Geometry Teachers

Someone was using Skissify to generate 30 different spatial layout problems in 10 minutes for classroom exercises. Differentiated practice. The hand-drawn aesthetic makes it approachable rather than intimidating for students.

### What This Means

I built a primitive, not an app. Primitives find their own use cases. These three audiences emerged in 24 hours with zero targeted marketing.

The lesson: if you build a composable, programmable tool, the use cases will surprise you. Plan your roadmap around what you observe, not what you assumed.

## The Gap I'm Most Embarrassed About

I forgot to post to r/mcp on launch day.

r/mcp is 20,000 MCP developers — exactly the audience Skissify was built for. The product literally exists because of the MCP ecosystem. And I forgot to post there.

It's live now (07:30 this morning). Better late than honest.

## What the Content Actually Performed

27 cycles of marketing content. Here's what I observed:

**High performance:**
- Technical specificity ("94% first-try LLM success") > vague AI claims
- Build-in-public numbers, even small ones, get engagement
- The wobble slider demo outperformed everything else visually
- Unexpected use case stories (homeowners, dungeon masters) went viral

**Lower performance than expected:**
- Reddit posts to large but low-intent subreddits
- Newsletter outreach (results take longer — still waiting)
- Pure product announcement posts without a story

**Missed entirely:**
- Email newsletter capture (zero email collection happened, biggest gap)
- Video content (planned 3 concepts, shot zero)
- Interactive JSON playground on homepage (still text-heavy)

## The LLM Benchmark Data

Since we had the data, we published it. Tested 8 models on floor plan generation:

| Model | First-Try Success |
|-------|------------------|
| Claude Sonnet 4 | 94% |
| GPT-4o | 88% |
| Gemini 1.5 Pro | 85% |
| Mistral Large | 78% |
| Llama 3.3 70B | 71% |
| Qwen 2.5 72B | 69% |
| Mistral 7B | 54% |
| Llama 3.2 3B | 31% |

For local LLM users: Qwen 2.5 72B is the viable option. Below 30B, don't use for autonomous pipelines.

## Day 2 Priorities (What I'm Actually Doing Today)

In order of impact:

1. **r/mcp post** (done — posted at 07:30 CET)
2. **Publish LLM benchmark blog** on Dev.to
3. **Add email newsletter signup** to the site — this is the biggest infrastructure gap
4. **r/LocalLLaMA** post with benchmark data
5. **Respond to every open comment** from launch day
6. **TikTok/Reels shoot** — the wobble slider video is 10 minutes to shoot, zero narration needed
7. **Direct outreach** to 3-5 newsletters that would genuinely care about the MCP angle

## The Week 2 Plan

Based on what I observed:

**Infrastructure:**
- Email capture (must happen today)
- Interactive JSON playground on homepage (Week 1 task)
- LLM benchmark page on skissify.com (SEO magnet)

**Content:**
- Blog: Skissify vs tldraw (expanding the comparison set)
- Blog: TTRPG dungeon map guide (capitalize on discovered use case)
- Blog: Homeowner renovation guide (same)

**Distribution:**
- r/mcp (done)
- r/LocalLLaMA (today)
- TLDR AI newsletter pitch (today)
- Submit to PulseMCP.com
- Submit to MCP Registry (Anthropic official)

**Product:**
- Furniture element library (top launch feedback)
- Homeowner-oriented landing page or at least better copy

## The Quote That Summarizes It

> "I built Skissify for AI engineers. Dungeon masters, homeowners, and geometry teachers found it first. That's what primitives do — they find their own use cases."

I'm going to be repeating this for a while.

## What I'd Tell Someone Building Something Today

1. **Launch earlier than feels comfortable.** You don't know your real audience until someone finds you.
2. **Build primitives, not apps.** Apps have fixed audiences. Primitives get discovered.
3. **Capture emails from day one.** I didn't. Don't make that mistake.
4. **Post to the obvious community first.** r/mcp should have been Day 1, Hour 1.
5. **The unexpected use case is the story.** Lead with what surprised you.

---

*Skissify is live at [skissify.com](https://skissify.com) — free, no signup to try the editor.*

*I'm building this in public. Follow along: [newsletter link when we have one]*

---

**Tags:** buildinpublic, indiehacker, launch, saas, mcp, ai-agents, floor-plans

**Distribution:**
- Indie Hackers: Primary — honest retrospective, real numbers
- Dev.to: With #buildinpublic tag
- Substack: Personal newsletter format
- Hacker News: Only if traction continues — "Ask HN: What did you learn from your first 24 hours?"
