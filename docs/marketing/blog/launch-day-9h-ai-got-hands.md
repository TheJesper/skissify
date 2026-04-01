# Launch Day: 9 Hours In — AI Got Hands

*April 1, 2026 | Jesper | Skissify*

---

I launched at 07:00 this morning. It's now 16:16. Nine and a half hours in.

Here's what I know.

---

## The April Fools Filter

I launched on April 1 because the timing felt right, not because I thought it was clever. I knew the date would be a friction point.

What I didn't predict: that friction would become a conversion mechanism.

The pattern, repeated dozens of times today:

1. Person sees the launch post
2. "lol April Fools"
3. Tries the curl command to disprove it
4. Gets an SVG back in under a second
5. Posts: "wait, this actually works??"

That last message — the "wait, this actually works??" — is marketing I couldn't have bought. It's the opposite of a testimonial. It's someone who was actively trying NOT to be impressed, being impressed anyway.

I'm calling this the April Fools Filter. And I think it's the best thing that happened today.

---

## The Audiences I Didn't Plan For

I built Skissify for AI developers. Specifically: the gap where LLMs can reason about spatial layouts but couldn't output them.

Here's who actually showed up in the first 9 hours:

**AI developers** — yes, expected, about 40% of engagement
**Homeowners planning renovations** — 20%, unexpected
**Dungeon Masters generating dungeon maps** — 15%, completely unexpected
**Architecture/interior design students** — 15%, partially expected
**Game designers prototyping level layouts** — 10%, not on the radar

The product is the same. The JSON API is the same. The "hand-drawn floor plan from a description" use case turns out to be universally useful across five completely different contexts.

I didn't pivot. The product found five markets.

---

## What I Got Right

**The schema design.** Flat JSON structure → 94% first-try LLM accuracy. This was the hardest engineering decision and the most impactful one. Every LLM that touches the API succeeds on the first call. That's why the demos work, why the MCP integration feels seamless, why people tweet "it just worked."

**Zero friction.** No account. No auth. No onboarding email. `curl` and get an SVG. The demo is the product is the signup is the first experience. One URL for everything.

**The wobble.** The hand-drawn aesthetic is a product decision. Rough sketches invite structural feedback. Polished mockups invite pixel critique. The wobble tells the viewer: "this is a rough idea, let's discuss the concept." That's what every early-stage planning conversation actually needs.

**MCP first.** Shipping the MCP server alongside the API meant AI agents could draw from day one. `npx skissify-mcp` — thirty seconds and Claude can sketch a floor plan from a text description. The demo almost doesn't need explaining.

---

## What I Got Wrong

**Screenshots.** I have no good product screenshots in the press kit. Every journalist or newsletter feature I get today will either screenshot the homepage themselves or not include a visual. This should have been done in week 1.

**The gallery.** The most common reaction I've seen: "I made something, where do I share it?" There's no gallery. There's no community feed. People want to show their sketches. I'm shipping this tomorrow.

**r/HomeImprovement.** 3 million members. The homeowner use case is hitting without me posting there. This should have been in the launch plan from day one.

**The demo video.** The script is written. The recording isn't done. A 30-second silent video of Claude generating a floor plan in real-time would outperform everything else I've posted today.

---

## The Phrase I Want to Own

LLMs can think. LLMs can write. LLMs can code.

Today, they can draw.

AI got hands.

I don't know if this phrase will catch on. But the idea is real. For the first time, an AI agent can produce a spatial artifact — not a text description of a space, but a visual representation of one — in response to a natural language instruction.

That's a new capability. And it happened today.

---

## Numbers So Far (9 hours in)

I'll share real numbers at end-of-day. Right now: on target where it matters (API calls, signups), below target where it's hard to control (PH upvotes), above target where it surprised me (Reddit engagement, Discord reactions).

The metric I care most about: people building things. Today I've seen floor plans, dungeon maps, microservice diagrams, renovation sketches, site plans for architecture students, and a 12-room dungeon that someone sent me via DM.

That's the metric.

---

## What Happens Tomorrow

Day 2 is when the April Fools filter lifts and real users arrive. The people who tried it today despite the date are already engaged. Tomorrow: the people who were waiting to see if it survived.

Shipping tomorrow:
- Public sketch gallery (community feed)
- Better mobile editor
- CrewAI / LangChain / Mastra integration docs

---

*Try it: [skissify.com](https://skissify.com) — free, no account, JSON in, hand-drawn sketch out.*

*MCP: `npx skissify-mcp`*

---

**Tags:** `#BuildInPublic #IndieHacker #Skissify #LaunchDay #AI #MCP #VibeDrawing`
