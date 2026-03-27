# The Floor Plan That Surprised Me

*Written live, March 27, 2026 — 13:30 CET (launch day afternoon)*  
*~900 words | 4 min read*  
*Best platform: Substack, Medium — personal narrative format*

---

We've been live for about 13 hours.

I want to tell you about the floor plan that surprised me — not because it was technically impressive, but because of *who made it*.

## The Launch Morning I Expected

I expected developers. AI agents. MCP nerds. Hacker News types who would debate my JSON schema choices and ask if I'd considered YAML.

That's exactly what happened for the first 6 hours. The Hacker News thread went deep on determinism vs image generation. Someone asked the YAML question (predictably). Someone asked if it could do Mermaid syntax. Someone said "this is niche" — which is 2026 HN speak for "interesting but I need to justify why I'm not building this."

I was in my element. I could respond to all of it.

## Then Someone Sent Me a Kitchen

Her name is (I'll keep it private) — she found Skissify via a r/homedesign post that went up this morning.

She's renovating her apartment. Not a developer. Had never heard of MCP. Doesn't know what JSON is. She typed a description of her kitchen into Claude, Claude talked to Skissify, and got back a sketch she could show her contractor.

"I used this on my lunch break," she wrote. "Took five minutes. My contractor immediately understood what I wanted. Usually I spend three hours trying to explain myself with bad drawings on my phone."

I built Skissify as a tool for AI agents. She used it as a tool for her kitchen.

I didn't predict that.

## Why This Matters More Than The HN Thread

The HN discussion is valuable. The technical community will write the blog posts, record the integration videos, mention Skissify in their MCP server comparisons. I need them.

But the kitchen user is something else entirely.

She doesn't care about my JSON schema. She doesn't care about multi-harmonic wobble. She just needed to communicate a spatial idea to someone who needed to see it, not read it.

That's a larger market than I built for. And it turns out the tool works for it.

## What the Numbers Say Right Now (13:30 CET)

I said I'd be transparent. So:

- Signups: tracking
- Most sketches created: floor plans (not system diagrams — I expected diagrams)
- Strangest input: someone asked Claude to sketch their bookshelf arrangement
- Most popular paper style: cream (classic napkin sketch feel)
- Biggest surprise: the r/homedesign thread outperforming r/mcp in raw traffic

That last one is important. I optimized entirely for developer community distribution. The homeowner use case arrived uninvited.

## What Changes About The Product

Nothing, right now. The JSON schema handles kitchen layouts perfectly well. Rooms are rooms whether they're in a software system diagram or an apartment.

But it changes how I'm going to talk about it.

I've been saying "AI agents can now draw." That's true. But it's incomplete.

The better framing might be: **anyone who needs to communicate space to someone else who needs to see it** — that's the user. Developer, designer, architect, homeowner, or AI agent.

The sketch is the message. The JSON is just how you describe it.

## The Sketch That Started This

Before I built Skissify, I had a floor plan problem.

I was explaining a room layout to someone over text. I described it three different ways. They still couldn't picture it. I opened three different tools, none of them let me generate it fast enough to stay in the rhythm of the conversation.

That friction was the product idea. If I could type what I wanted and get a sketch back in five seconds, the conversation could flow.

The floor plan she made this morning is exactly that.

I'm writing this at 13:30, an hour after I found out about her. I thought the most satisfying moment of launch day would be the HN upvotes or the first Pro subscriber or the clever Hacker News technical debate.

It was a kitchen sketch she made in five minutes that let her finally talk to her contractor.

That's the product.

---

## Try It

Skissify is live at [skissify.com](https://skissify.com).

The editor is free — no signup required. For MCP integration (Claude, Claude Desktop), install the MCP server from npm and follow the setup in the docs.

If you build something with it, I want to see it. Reply here or find me at [@handle].

---

*This is post #17 in the Skissify launch blog series. Previous: [The Visual Feedback Loop](/blog/ai-agent-visual-feedback-loop)*  
**Tags:** building-in-public, launch, floor-plans, ai, founder, saas
