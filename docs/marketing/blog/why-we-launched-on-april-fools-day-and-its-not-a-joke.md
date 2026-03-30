# Why We Launched Skissify on April Fools Day (And It's Not a Joke)

*Published: April 1, 2026*

---

Let me tell you why launching a product on April 1st is either the dumbest thing a solo founder can do, or a genuinely underrated move.

We launched **Skissify** on Product Hunt today. April 1st. April Fools Day.

Yes, we know.

---

## The Setup

Skissify is a tool that turns JSON into hand-drawn sketches. You give it a structured description of a floor plan, wireframe, or diagram, and it returns a URL to a hand-drawn version — pencil-on-paper aesthetic, deliberate wobble, the whole thing.

It has an MCP server so AI agents can call it directly. Claude can ask Skissify to draw a floor plan the same way it asks a web search tool to find a result. You can try the REST API with zero setup.

This is a real product. It works. It's been live since March 27.

So why launch on April Fools Day?

---

## We Didn't Plan It

Honest answer: we didn't engineer the April 1st timing. We launched on March 27, ran Show HN on March 31, and Product Hunt was always going to be a day or two after that.

April 1st just... happened to be the best day.

We thought about slipping to April 2nd to avoid the noise. We decided not to. Here's why.

---

## The April Fools Advantage Nobody Talks About

**Everyone dismisses things on April 1st. Then they have to un-dismiss them.**

The psychological arc for anyone who sees "Skissify — hand-drawn sketches for AI agents" on April 1st goes like this:

1. "Wait, is this... a prank?"
2. "Let me check"
3. "Huh. The demo actually works."
4. "Oh, it's real."

That's a better engagement sequence than any launch we could engineer. Curiosity gets people to the demo. The demo converts them.

The people who dismissed it as a joke and then tried it anyway are going to remember it.

---

## The "April Fools But It's Real" Narrative Arc

There's a genre of April 1st product launches that becomes its own story. Google Maps' first preview was April 1st, 2005. People assumed it was a joke. It was not.

We're not Google. But the pattern holds: if the product is real, the April 1st origin becomes a fun footnote instead of a handicap.

"We launched on April Fools Day and it wasn't a joke" is a story that writes itself. It's the opener for the Week 1 retrospective. It's the lede for every newsletter pitch in April.

We'll take it.

---

## What We're Launching With

**Skissify today:**

- JSON → hand-drawn sketch URL (REST API, no account needed for free tier)
- Human Mode: type plain English, get a sketch — no JSON required
- MCP server for Claude Desktop and any MCP-compatible agent framework
- 4 paper styles: napkin, blueprint, parchment, engineering
- LLM success rate: 94% first-try for Claude 3.5 Sonnet (tested on 200+ floor plans)
- Free tier: 50 sketches/month

**What makes it weird:**

We deliberately made it *rough*. The wobble algorithm is intentional. The imperfection is the product. Rough sketches invite revision. Polish closes conversations.

That's the actual insight behind Skissify: there's a stage in every creative process where the sketch needs to look like a sketch. AI tools have been generating increasingly polished outputs. We went the other way.

---

## The Four Audiences We Didn't Plan For

We built this for AI developers. Four different audiences showed up:

1. **AI agent builders** — using it to give agents visual output capability via MCP
2. **Homeowners** — describing renovation plans to Claude, rendering with Skissify, showing contractors
3. **Dungeon masters** — generating dungeon maps in blueprint style for tabletop RPGs
4. **Geometry teachers** — creating hand-drawn diagram exercises without manual drawing

That's what primitives do. They find their own use cases.

---

## What We Need From You Today

If Skissify is useful to you — or even just interesting — here's what matters on Product Hunt day:

1. **Upvote** the listing (it really does affect rankings)
2. **Leave a comment** with your actual reaction — positive, critical, or just "this is weird and I like it"
3. **Try the demo** at skissify.com/editor — paste the example JSON, see what renders
4. **Tell one person** who builds with AI agents

That's it. We built a real thing. We launched it on April Fools Day. We're not joking.

→ [Skissify on Product Hunt](https://producthunt.com) ← find us there today

---

*Jesper Landmér is the solo founder of Skissify. He lives in Stockholm and built this because he kept telling AI agents to "draw a floor plan" and they kept writing text descriptions of floor plans instead.*

---

**Tags:** #ProductLaunch #ProductHunt #AIAgents #MCP #Skissify #BuildInPublic #AprilFools
