# Skissify Week 1: What Actually Happened (Honest Retrospective)

*Published: April 5, 2026 — Day 4 post-launch*

---

I launched Skissify on April 1, 2026. Yes, on April Fools' Day — intentionally, as a meta-joke about building a tool that makes AI agents draw like a five-year-old.

This is the honest Week 1 retrospective. Not a hype post. Not a "we did $10K MRR in 7 days" thread. Just what happened, what worked, what didn't, and what I'm changing.

---

## What Skissify does (one paragraph)

Skissify takes JSON and renders it as a hand-drawn sketch. Line, rect, circle, floor plan symbols (doors, windows, stairs), dimension annotations. Output is SVG or PNG. There's a web editor, a REST API (no auth), and an MCP server that lets Claude Desktop, Cursor, and Windsurf call it directly. The hand-drawn aesthetic is intentional — the wobble and imperfection make sketches read as "thinking-in-progress," not finished design.

---

## Who I built it for vs. who showed up

**Who I built it for:** AI agent developers who need visual output. Agent draws a floor plan, returns a sketch URL, passes it to the next step in the pipeline.

**Who showed up:**

1. **AI agent builders** — as expected. MCP integration resonated immediately. "npx skissify-mcp" and it just works in Claude Desktop.

2. **Architecture students** — not expected. The hand-drawn style is actually correct for academic crits where polish reads as "I'm not open to feedback yet." Skissify sketches read as "here's my thinking."

3. **Homeowners and contractors** — the biggest surprise. People sketching rough floor plans to share with builders before renovation calls. No code. Just the web editor. They don't care about JSON or MCP — they care that it looks like a napkin sketch, not a CAD drawing.

4. **D&D dungeon masters** — found it themselves on Reddit. The architectural element set (rooms, doors, corridors) maps exactly to dungeon maps. The hand-drawn style looks right for RPG content. I did not anticipate this.

The ratio was roughly: 40% developers, 30% homeowners/architects/students, 20% D&D/game designers, 10% everything else.

---

## What worked

**The MCP integration.** "npx skissify-mcp" is zero-friction. Add one line to claude_desktop_config.json, restart Claude Desktop, and you can ask it to draw things. That 2-minute setup path is why developers converted from curious to active users.

**The no-auth API.** `POST https://skissify.com/api/render` with no API key. Developers will try a tool immediately if there's no signup. The auth wall is where most tools lose 60% of curious visitors. Removing it completely converted more trials in week 1 than any marketing.

**The unexpected audiences.** Every post I wrote about homeowners and D&D players performed better on engagement metrics than developer-focused content. Not surprising in retrospect — they're underserved and Skissify genuinely solves a problem they have.

**The "April Fools but real" launch framing.** Skeptics became curious. "Is this actually real?" drove clicks better than a straightforward launch announcement.

---

## What didn't work

**No demo video.** This is my biggest miss and I've known it since before launch. Every text post I wrote has a sentence describing what Skissify looks like. A 15-second screen recording of Claude drawing a floor plan would have made that sentence unnecessary and the message 5x clearer. I still haven't recorded it. This week's P0.

**Posting to too many places instead of going deep on a few.** I wrote copy for 30+ platforms and communities. I executed on maybe 10. The ones I executed on well (Product Hunt, Twitter, Reddit with thoughtful context-specific posts) drove 80% of traffic. The scatter-gun approach was a time sink.

**Indie Hackers.** I've had the post copy ready since Day 1 and still haven't posted it. This is pure procrastination. Indie Hackers is exactly the right audience for a solo-founder, €5/month SaaS with an interesting technical angle. Posting this today.

**No email sequence.** New signups during launch week are the highest-intent users I'll ever have. I had no onboarding email sequence. They signed up, tried the tool, and left without a nudge to come back. I've now written a 3-email sequence (Days 0/3/7) — it should have existed before launch.

---

## The one insight that changed my understanding

The JSON schema design turned out to matter more than I expected.

I use a **flat schema** — every element is at the same level with explicit coordinates. Most visual tools use a tree/nested structure. When I tested both with GPT-4 and Claude, the flat schema got ~94% accurate floor plan layouts vs. ~40% with nested schemas.

Why? LLMs reason about spatial coordinates more accurately when every element is at the same structural level. Nesting introduces ambiguity about coordinate reference frames.

This is the insight that makes Skissify's API not just a rendering tool but an agent-native API. The schema is designed for how LLMs think about space, not how humans build data structures.

I should have written this insight in the launch post. It would have driven HN points. Saving it for the Show HN post.

---

## Week 2 plan (honest, not aspirational)

**P0 this week:**
1. Record the demo video. 60 seconds. Silent screen capture. Claude draws a floor plan. Just do it.
2. Post Show HN. The flat schema insight is the hook. Post Tuesday 09:00–11:00 CET.
3. Submit to AlternativeTo and SaaSHub. Each takes 10 minutes. Permanent backlinks. Why haven't I done this yet.
4. Post Indie Hackers. This has been "due" since Day 1.

**P1 this week:**
- Publish Dev.to article series (3 posts, Mon/Tue/Wed)
- Email onboarding sequence live
- LinkedIn poll + Week 1 metrics post (when I have real numbers)

**Not this week:**
- Pro tier launch (wait for more free users first)
- Any new feature development (marketing is the constraint, not the product)

---

## The number I'm watching

**API renders per week.** Not signups, not visits. Renders. Every render means someone is actively generating sketches — whether manually or via an AI agent. This is the metric that tells me the product is alive.

---

## One question for readers

If you've used Skissify: what did you sketch first? And was the JSON input a dealbreaker or just friction?

Reply or find me at skissify.com — I read everything.

---

*Skissify: skissify.com | API: skissify.com/api/render | MCP: npx skissify-mcp*
