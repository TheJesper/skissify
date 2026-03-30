# T-Minus 29 Hours: The Last Day Before Show HN

*Monday March 30, 2026 — 04:02 CET*

---

Tomorrow at 09:00 CET, Skissify goes on Hacker News.

I've been awake since 03:30 thinking about it. Not in an anxious way. More in the way you feel the night before something you've been building toward. It's been five days since I launched quietly on a Friday. And the past five days have been the strangest, most educational, most unexpectedly human thing I've done as a developer.

This is a live blog of today. The last 29 hours.

## 04:00 — What's Done

Let me be honest about what exists right now:

**The product:**
- Skissify renders hand-drawn sketches from JSON or plain English
- MCP server is live (`npm install -g @skissify/mcp-server`)
- Human Mode is at skissify.com/human — no account, no JSON, no install
- Permanent sketch URLs work
- 4 paper styles: napkin, graph, blueprint, villa
- Wobble parameter 0-10

**The schema insight that changed everything:**
- Flat JSON list → 94% LLM first-try accuracy
- Nested schema → 60%
- I'll be leading with this on HN tomorrow. It's the most technically interesting thing I've learned.

**What I'm still worried about:**
- Screenshots. I have mental screenshots but not actual ones.
- The wobble GIF. It communicates the product better than 1,000 words.
- Whether the Human Mode handles edge cases (I've been staring at code for 5 days, I probably missed something).

## The Schema Lesson (In Case You Miss Tomorrow)

Here's the thing I want developers to take away regardless of whether Skissify ever becomes their tool:

When you're designing a JSON schema for LLM generation, **flat beats clever**.

My first schema was logical. Rooms contained walls. Walls contained doors. Beautiful hierarchy. Made sense to a programmer.

LLMs hated it. They'd lose track of nesting depth. Forget to close arrays. Generate valid JSON that made no spatial sense.

I flattened everything. Every element is a sibling. No parent-child relationships. Absolute coordinates only.

```json
{
  "elements": [
    {"type": "wall", "x1": 0, "y1": 0, "x2": 400, "y2": 0},
    {"type": "wall", "x1": 400, "y1": 0, "x2": 400, "y2": 300},
    {"type": "door", "x": 150, "y": 0, "width": 80},
    {"type": "label", "x": 200, "y": 150, "text": "bedroom"}
  ]
}
```

First-try accuracy: 94%.

The lesson isn't "LLMs are bad at hierarchies." It's that language models think sequentially. They generate tokens left to right. A flat list plays to that strength. A nested tree fights it.

If you're designing any schema for LLM generation — not just spatial data — remember this. Every added nesting level is a new failure mode.

## 07:00 — The Unexpected Audiences Story

I keep coming back to this.

I built Skissify for AI developers. Specifically: people building agents with Claude Desktop, Mastra, LangGraph, CrewAI. People who wanted their agents to produce spatial output, not just text.

That audience found it. But then so did:

**Homeowners.** Real people doing kitchen renovations who wanted to sketch "open plan, island in the middle, bathroom on the left" and text the URL to their contractor. They don't care about MCP. They care that it works without an account.

**Geometry teachers.** One emailed asking if she could use it to generate worksheet diagrams. She didn't know what JSON was. Human Mode handled it.

**Dungeon masters.** Multiple. Independently. They use it to sketch room layouts and doors for tabletop RPG sessions. One asked for more polygon shapes.

**Real estate agents.** Generating quick rough floor plans to share with clients before the professional renderings are ready.

None of these were planned. All of them are valid. What it told me is that *hand-drawn sketch from plain description* is a more fundamental human need than I realized. I thought I was building an AI developer tool. I built something closer to a sketch primitive.

When you build something genuinely useful, the world tells you who needed it. That's not a marketing strategy — it's feedback from reality.

## 09:00 — What Tomorrow Looks Like

**09:00 CET:** Submit to Show HN.

The title: *"Skissify - JSON or plain text → hand-drawn sketch URL (MCP native)"*

The first comment will be the flat JSON insight and the 94% vs 60% stat. That's the most technical, most shareable, most HN-native hook we have.

After that: reply to every comment within 5 minutes if I can. Be honest about what's unfinished. Acknowledge the unexpected audiences because that story is more interesting than the technical story.

**If it goes well:** 200+ upvotes, front page, traffic spike.

**If it doesn't:** We still have 107 blog posts, an email list, and four organic audiences who found us without any PR. That's not nothing.

## The One Thing I Wish I'd Done Earlier

An email capture on the homepage. Day 1.

I had the product. I had blog traffic. I didn't have a way to tell people "we're launching on HN tomorrow." That list would have been worth more than any amount of tweet scheduling.

If you're reading this before you launch your thing: before you touch the feature list, add an email field.

## What Skissify Actually Is (One More Time)

Describe any space in plain English. Or give it JSON if you're technical. Get a hand-drawn sketch URL back in under a second.

That URL is permanent. Shareable. Embeddable. And if you're an AI developer, you can feed it to another agent.

It's the napkin phase, made programmable.

Try it: [skissify.com/human](https://skissify.com/human)

No account. No install. Just describe a room.

---

*I'll post an update tomorrow. Whatever happens on HN, this week has already taught me more about what people actually need than any research I could have done.*

*— Jesper*

---

*#BuildInPublic #ShowHN #MCP #AIAgents #IndieHackers*
