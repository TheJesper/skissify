# We're Launching on Product Hunt Tomorrow (April 1) — Here's Everything

*Published: March 31, 2026 — Cross-post: Dev.to, Twitter/X thread, email list*
*~900 words | 4 min read | Tags: #ProductHunt #MCP #AI #Launch*

> **TL;DR:** Skissify launches on Product Hunt April 1, 2026. This is what it does, why we built it, and how to support the launch if you think it's worth it.

---

After four days on Hacker News, Discord servers, Reddit, and way too many late nights, Skissify launches on Product Hunt tomorrow.

Here's what you need to know.

---

## What Skissify Is (The 20-Second Version)

An MCP server that gives AI agents the ability to draw.

You ask Claude: "Draw a floor plan for a 2-bedroom apartment."
Claude calls the Skissify tool.
You get a hand-drawn sketch URL.

No image generation. No Stable Diffusion. Pure structured output — JSON schema converted to SVG with a hand-drawn aesthetic.

The result looks like someone drew it on a napkin. That's the point. Rough sketches get better feedback than polished mockups. They signal "idea, not spec."

---

## Why We Built It

We were building an AI agent for floor plan generation. The agent was great at reasoning about spatial layouts. It could tell you how many square meters to allocate for a kitchen, where to put the load-bearing walls, how much natural light each room would get.

But it couldn't *show* you anything.

Every AI output format in 2026 — text, tables, code, even voice — but not drawings. The visual gap.

Skissify fills the visual gap. For agents. For developers. And (we discovered three days ago) for anyone who wants to describe something and get a sketch.

---

## What We're Launching With

- **Free tier**: unlimited public sketches, no account required
- **Pro tier**: EUR 5/month — private sketches + higher rate limits
- **MCP server**: `npm install @skissify/mcp-server` — 4 lines of config for Claude Desktop
- **Human Mode**: plain-text input, no JSON, no API keys
- **Sketch permanence**: every sketch URL is stable, shareable, embeddable

---

## The Numbers So Far (Pre-PH)

Since launching on HN and through the weekend:
- Blog posts indexed and driving organic traffic
- Reddit engagement in r/mcp, r/localllama, r/homedesign
- Discord activity in Anthropic and LangChain servers
- Users in categories we didn't build for: architects, real estate agents, educators, game designers

---

## What We Want From Product Hunt Day

Honest feedback. Not just upvotes.

We know the things that aren't done. The screenshots we should have taken earlier. The mobile app we haven't built. The export formats (PDF, SVG download) that power users keep asking for.

If you use it and you have an opinion, we want to hear it.

---

## How to Support the Launch (If You Want To)

The rules are simple: hunt it if you've tried it, upvote if you like it, comment if you have something to say.

If you're an AI developer and you've been waiting for a visual output layer for your agent stack — this is it. Try the MCP server. Tell us if it works with your setup.

Product Hunt link goes live at 00:01 PST on April 1.

We'll share it everywhere when it's live. You can also bookmark [skissify.com/ph](https://skissify.com) and check tomorrow.

---

## The One Thing I Keep Saying

Twelve thousand MCP servers. None of them drew.

That's the gap. We filled it. Let's see if the internet agrees.

---

*[Product Hunt launch: April 1, 2026 | Skissify on PH when live]*
*[Previous coverage: HN Show HN thread | skissify.com]*
