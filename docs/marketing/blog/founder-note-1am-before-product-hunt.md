# The Founder Note Written at 01:30 AM, Seven Hours Before Product Hunt

*Published: April 1, 2026 — Medium (primary), IndieHackers, Dev.to*  
*~900 words | 4 min read | Tag: #BuildInPublic #SoloFounder #ProductHunt #Skissify*

---

It's 01:30 in the morning in Stockholm.

In seven hours, Skissify goes live on Product Hunt.

I'm not sleeping — not because I'm anxious, but because I've been here before, the night before something ships, and I've learned that this window has a particular quality to it. The work is done. The code is deployed. The copy is written. There's nothing left to optimize.

So instead I write.

---

## What I built

Skissify is a sketch tool for AI agents. You give it JSON — or just plain English — and it draws a hand-drawn sketch. A floor plan, a wireframe, a system diagram, a classroom layout, a dungeon map.

The hand-drawn aesthetic is not a filter. It's computed: multi-harmonic sine wave distortion with seeded randomness. Same seed, same sketch. Different seed, same structure, different character. The wobble is reproducible. That matters for agents that need consistent visual outputs across workflow runs.

It has an MCP server. Four lines of config in Claude Desktop and Claude can draw. It has a REST API. It has Human Mode — plain text input, no JSON required, for the unexpected audiences who showed up: architects, teachers, dungeon masters, product managers.

We built it for AI developers. A different crowd arrived.

---

## What I'm thinking about at 01:30

Not the upvote count. I stopped letting that number mean too much after the first few days of launch week — the real signal is always the comments, the DMs, the renders that happen at 3am from someone you'll never talk to.

I'm thinking about the April Fools timing.

Everyone said it was a mistake. "Nobody launches on April Fools Day." "Your credibility is on the line." "You'll spend all day explaining that it's not a joke."

I think they're wrong — and tomorrow we'll find out.

My theory: when someone sees something on April Fools Day and thinks *"wait, is this real?"* — and then clicks through anyway — they've already done something most passive observers don't. They've become curious enough to overcome their skepticism. They've already made a micro-commitment to the idea that this might be worth their time.

Users who overcame skepticism are more committed than users who passively clicked an impressive headline. The April Fools filter is actually a *quality* filter.

I'll have real numbers by tomorrow evening. Happy to be wrong. But I think the conversion rate will be higher than any previous day of launch week. We'll see.

---

## What I'm not anxious about

The product works. I tested it 200+ times, built a benchmark (94% first-try accuracy for AI-generated floor plans with flat schema, versus 61% with nested schema — the schema design was the real product insight), watched four different user segments independently discover use cases I hadn't designed for.

The product works. That's what I kept coming back to this week when the metrics felt wrong or the tweets didn't land. Underneath all the launch machinery, there's a thing that does a useful job. That's the part that persists after the launch day noise fades.

---

## What I'm genuinely curious about

Whether the floor plan audience or the wireframe audience will dominate in the PH comments. These two groups want completely different things from the product roadmap — floor plan users want measurement support, material labels, export to DXF; wireframe users want annotation layers, interactive output, Figma plugin. I can't build both simultaneously alone.

Product Hunt comments are a free focus group. At 09:01 CET I'll know more than I know now.

---

## What comes next regardless

I shipped this thing. Whatever happens today — five upvotes or five hundred — Skissify exists in the world. It has users across 12 countries who rendered floor plans last week. It has an MCP server that 40-something Claude Desktop users are running. It has a dungeon master in the Pacific Northwest who generates encounter maps for his D&D group every Thursday.

That's already real. That already happened. Product Hunt today is a megaphone, not a verdict.

---

## The one thing I'd tell my past self

Build the email capture earlier. We have a newsletter signup but I treated it as an afterthought for the first five days. The people who signed up are worth ten times their weight in anonymous render traffic — they're the ones who'll share the April 2 retrospective, who'll leave the PH comment, who'll reply when I email them about the roadmap.

Start the list on day zero. Not when you remember.

---

**In seven hours:**
→ Product Hunt goes live
→ I post the link
→ I find out if the filter theory holds

**Demo if you want to try it before the vote:** skissify.com/editor (no account needed)

**Product Hunt:** producthunt.com/posts/skissify

---

*This post will either age well or badly. Either way I'm publishing it.*

*— Jesper, Stockholm, 01:30 CET*
