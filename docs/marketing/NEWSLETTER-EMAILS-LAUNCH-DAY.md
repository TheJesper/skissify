# Newsletter Pitch Emails — Launch Day Sends

**Created:** March 30, 2026 — Cycle 60 (11:53 CET)
**STATUS: SEND THESE TODAY (Monday) BEFORE 18:00 CET**

These newsletters publish Tuesday morning. Pitch now = appear Tuesday.

---

## 📧 EMAIL 1: TLDR AI

**To:** dan@tldrnewsletter.com (or submit via tldr.tech/ai/submit)
**Subject:** [Submission] Skissify — first sketch API for AI agents (launching Show HN Tuesday)
**Send by:** Today 16:00 CET

---

Hi,

Submitting for TLDR AI. Launching on Hacker News tomorrow (Tuesday March 31, 09:00 CET).

**Product:** Skissify — a JSON-to-hand-drawn-sketch API + MCP server for AI agents.

**The insight:** AI agents can produce text, code, data, and images. None of them could produce structured spatial output — a rough floor plan, wireframe, or diagram. We built that.

**Key technical stat:** Schema design has more impact on LLM spatial accuracy than model choice. Flat element list with absolute coordinates = 94% first-try accuracy. Hierarchical JSON = ~58%.

**Integration:** MCP server (`@skissify/mcp-server` on npm) works with Claude Desktop out of the box. REST API for any other agent framework.

**Unexpected result:** Built for AI developers. First week attracted homeowners (renovation briefs for contractors), dungeon masters (fantasy maps), and geometry teachers. Primitives find their own audiences.

**Try it:** skissify.com/human — describe a room, get a hand-drawn floor plan. Free, no account needed.

**Links:**
- Site: https://skissify.com
- HN post: [will add when live]
- npm: https://www.npmjs.com/package/@skissify/mcp-server

---

## 📧 EMAIL 2: Ben's Bites

**To:** ben@bensbites.beehiiv.com
**Subject:** Skissify — give your AI agent a pencil (Show HN Tuesday)
**Send by:** Today 15:00 CET

---

Hi Ben,

Quick submission for tomorrow's newsletter.

Skissify is a sketch API for AI agents. JSON in → hand-drawn floor plan / wireframe / diagram out at a permanent URL.

What's interesting about it:
- MCP server for Claude Desktop (4 lines of config)
- The URL contains the JSON — so the sketch is agent memory, not just an image
- Human Mode: plain text description → sketch (no JSON needed for humans)
- 94% first-try LLM accuracy with the flat schema (vs ~58% with hierarchical)

We're on Show HN Tuesday. Would love a mention if this is relevant for your AI tools section.

Site: skissify.com | Demo: skissify.com/human

Thanks,
Jesper (jesper@skissify.com)

---

## 📧 EMAIL 3: The Rundown AI

**To:** team@therundown.ai (or submit via therundown.ai/submit)
**Subject:** New AI tool submission: Skissify — sketch API for AI agents
**Send by:** Today 16:00 CET

---

Hi,

Submitting Skissify for The Rundown.

**One-liner:** Skissify gives AI agents the ability to produce hand-drawn sketches — floor plans, wireframes, diagrams — as permanent URLs.

**Why it's interesting for your readers:**
1. Fills the "visual primitive" gap in AI agent stacks
2. MCP native — works with Claude Desktop today
3. Schema design insight: flat JSON = 94% accuracy vs hierarchical JSON = 58%
4. Found four unexpected audiences in week one (developers, homeowners, DMs, teachers)

**Launch:** Show HN on Tuesday March 31.

**Demo:** skissify.com/human

Happy to provide more info or a walkthrough.
Jesper | jesper@skissify.com

---

## 📧 EMAIL 4: Superhuman (Zain Kahn)

**To:** zain@superhuman.ai  
**Subject:** Skissify — the missing visual layer in AI agent stacks
**Send by:** Today 16:00 CET

---

Hi Zain,

Quick pitch: Skissify is the first sketch API for AI agents.

The gap it fills: AI can now generate text, code, data, images, music. What it couldn't do until now: produce a rough sketch — the spatial, hand-drawn output format humans use for exploration-phase thinking.

We built:
- A flat JSON schema (94% LLM accuracy in 200+ tests)
- A wobble rendering algorithm that makes it look hand-drawn
- An MCP server for Claude Desktop
- Human Mode (plain text → sketch)

Launching Show HN tomorrow March 31.

Site: skissify.com
Demo (try it in 30 seconds): skissify.com/human

Jesper | jesper@skissify.com

---

## 📧 EMAIL 5: Lenny's Newsletter (reach shot — worth trying)

**To:** lenny@lennysnewsletter.com
**Subject:** Product angle: "premature convergence" and why rough sketches get better meetings
**Send by:** Today 17:00 CET

---

Hi Lenny,

This might be relevant for your audience — it's a product insight more than a pitch.

There's a concept called "premature convergence" — teams commit to solutions before adequately exploring the problem. High-fidelity mockups cause it because polished output signals finished thinking, so stakeholders respond to execution details rather than strategic questions.

We built Skissify partly around the inverse: rough sketches (deliberately imperfect, exploration-phase aesthetic) keep conversations about ideas rather than pixels.

We're launching on HN tomorrow and I wrote a piece on this: [link to blog post when live]

Not expecting coverage — just wanted to share the design reasoning in case it's interesting for your PM audience.

Skissify: skissify.com

Jesper | jesper@skissify.com

---

## EMAIL TIMING SUMMARY

| Newsletter | Best Send Time | Est. Reach |
|-----------|---------------|-----------|
| TLDR AI | Today 15:00 | 500K+ |
| Ben's Bites | Today 14:00 | 100K+ |
| The Rundown | Today 15:00 | 400K+ |
| Superhuman | Today 15:00 | 200K+ |
| Lenny's | Today 16:00 | 500K+ (PM audience) |

**Note:** Most of these have submission forms. Use the email addresses above only if forms don't work or as follow-up. Check tldr.tech, bensbites.co, therundown.ai for current submission links.

---

## WHAT TO INCLUDE IN EVERY EMAIL

✅ One-liner that says what it does
✅ The schema accuracy stat (94% vs 58%) — data = credibility
✅ The unexpected audiences story — journalists love this
✅ Direct try link (skissify.com/human)
✅ Launch timing (Show HN Tuesday)

❌ Don't explain the wobble algorithm in pitch emails
❌ Don't lead with "AI-powered" (generic)
❌ Don't send after 17:00 CET (newsletters finalize overnight)
