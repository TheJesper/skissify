# Skissify Live: Product Hunt April 1 — The Launch Log

*Posted: April 1, 2026 | Author: Jesper | Category: BuildInPublic*

---

**[LIVE] This post updates throughout the day. Last update: [TIME]**

---

We launched on April 1. On purpose.

Here's why: everyone who clicks through to check "wait, is this actually a real product?" is a high-intent user. The skeptic funnel is the best funnel. You're pre-qualifying at the top.

This is the real-time log.

---

## 09:01 CET — We're Live

[Product Hunt link goes live]

First comment is up. The tagline reads: "Text in. Hand-drawn sketch out. MCP native. Not a joke."

The last three words are doing a lot of work today.

---

## What Skissify Actually Does (For Latecomers)

You describe a space — a floor plan, a UI wireframe, an org chart, a site map — and Skissify returns a URL containing a hand-drawn sketch of it.

That's it.

**For AI agents:** `POST /sketch` → get a shareable URL your agent can reference, pass to another agent, or show to a human.

**For humans:** Go to skissify.com/human, type "kitchen with island and breakfast bar, open to living room," and get a sketch in 2 seconds. No account needed.

The hand-drawn aesthetic isn't random. Rough sketches signal "this is a draft." That signal matters when you're trying to get honest feedback instead of pixel-level critique.

---

## 09:30 CET — Show HN Goes Up

"Show HN: Skissify – Give AI agents a way to draw, not just describe"

Framing: The MCP ecosystem has 12,000+ servers. None of them draw. Here's one that does.

---

## 10:00 CET — First Numbers

*[Fill in real numbers here]*

Upvotes: [X]
Rank: [X]
Comments: [X]
Sign-ups: [X]

---

## What I Learned Building This

The hardest problem wasn't the renderer. It wasn't the MCP integration. It was the schema.

Early versions used nested JSON. LLMs got it right ~61% of the time on first try. That means 4 in 10 agents would get a bad sketch and either retry or give up.

Flattening to a simpler schema pushed first-try accuracy to 94%. One data model change improved the product more than months of rendering work.

**Schema design is product design.**

---

## 12:00 CET — Midday Update

*[Fill in real midday data]*

The audience split is interesting. It's not just AI developers. It's:
- **Architects and interior designers** — who wanted a faster napkin sketch tool
- **UX designers** — who wanted something rough-first before Figma
- **D&D dungeon masters** — I didn't build this for them. They showed up anyway.
- **AI developers** — the intended audience, validating the MCP-native angle

---

## The April Fools Bet

By launching on April 1, I accepted a handicap. Some people assumed it was a gag. They left.

The ones who stayed, tried it, and came back? Those are the users worth having.

If the conversion rate from "skeptic who checked" to "user who stayed" is high, the April 1 launch was the right call. We'll know by April 2.

---

## 18:00 CET — End-of-Day Numbers

*[Fill in real EOD data]*

Upvotes: [X]
Final rank: [X]
Total signups: [X]
Most active community: [X]

---

## What's Next

Skissify is available now at **skissify.com**

- Human mode: skissify.com/human (free, no account)
- API: docs.skissify.com
- MCP server: `npx skissify-mcp`

The sketch layer is real. Every AI stack has text, code, data, image. Now it has spatial.

---

*Follow the launch: [Twitter/X @skissify] | [Product Hunt]*

*Tags: #BuildInPublic #ProductHunt #AITools #MCP #VibeDrawing #SketchLayer*
