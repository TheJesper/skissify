# What Actually Happened in the First 16 Hours of Launch

*Posted: March 27, 2026 — 16:30 CET*  
*~1,100 words | 5 min read*  
*Best platforms: Dev.to (post tonight), Indie Hackers (Day 2), Hacker News thread reference*

> **Honest build-in-public update.** No vanity metrics, no hype. Here's what's actually happened since Skissify went live at 00:30 CET today.

---

I launched Skissify at 00:30 CET this morning. It's now 16:30 — 16 hours in. Here's the honest update.

## The Numbers (so far)

*(Fill with real analytics before publishing — these are placeholder targets)*

| Metric | Hour 4 | Hour 8 | Hour 16 |
|--------|--------|--------|---------|
| Unique visitors | — | — | — |
| Signups | — | — | — |
| Sketches created | — | — | — |
| Shares | — | — | — |
| Pro conversions | — | — | — |
| HN upvotes | — | — | — |
| PH upvotes | — | — | — |

*Update this table every few hours. Transparency builds trust.*

---

## What Went Better Than Expected

### 1. The MCP angle landed harder than the tool itself

I expected most people to try the web editor. Instead, about half the traction came from the MCP angle — people excited that AI agents can *draw*, not just describe.

The thread "12,770 MCP servers and none of them draw" hit a nerve. That's the product in one sentence.

### 2. Homeowners showed up

I built Skissify for AI developers. I did not expect homeowners.

But on launch day, multiple people on Twitter, Reddit, and in DMs described the same use case: *describe a room to Claude, get a hand-drawn floor plan, print it out for a contractor call.*

That's not a dev workflow. That's a consumer moment. It's a complete surprise, and it might be bigger than the original thesis.

### 3. The "deliberately ugly" angle resonated in design communities

Posting in r/designtools and on LinkedIn with the frame "I made it ugly on purpose" generated more engagement than the technical posts. Designers have an emotional relationship with roughness vs polish. The napkin phase is something a lot of them miss in AI tools — and they wanted to talk about it.

---

## What Was Harder Than Expected

### 1. Product Hunt timing vs HN timing is a real tension

Product Hunt peaks at 00:01 PT (09:01 CET). Hacker News does best at 10:00-12:00 US Eastern (16:00-18:00 CET). You can't optimize both simultaneously.

I split the difference and accepted that one would be sub-optimal.

**Learning:** If I do this again, I'd launch PH on Monday (higher baseline traffic) and submit to HN separately on Tuesday.

### 2. Screenshot quality matters more than tweet copy

My highest-converting posts weren't the ones with the cleverest hook. They were the ones with a clear demo GIF attached.

Obvious in retrospect: people can't judge a visual tool from text alone.

**Learning:** Record 3-5 demo GIFs before launch night, not the morning of.

### 3. Being everywhere at once is a myth for solo founders

I prepared content for 12 platforms. I could realistically manage 4-5 on the day. The rest was wishful planning.

**Learning:** Pick your 3 primary channels and do them excellently. Let the rest wait until Week 2.

---

## The Unexpected Discovery: The Homeowner Market

Here's the thing I keep coming back to.

I built Skissify for AI agents and developers. The JSON-first architecture, the MCP server, the structured manifest — all of it optimized for programmatic generation.

But the most heartwarming messages have been from regular people:

> *"I described my kitchen layout to Claude and it generated the JSON and a floor plan. I printed it out and showed it to my contractor. He immediately understood the layout changes I wanted. This is the first time that conversation didn't end in confusion."*

That's not my target user. But it's a real human problem — the gap between "what I want my space to look like" and "how I communicate that to a professional."

Skissify is accidentally a bridge for that communication.

I don't know yet whether to pivot the marketing toward this use case or keep it developer-focused. Probably both: the developer story is the differentiated one (MCP, JSON, agents), but the homeowner story is the human one that press and mainstream audiences will actually share.

---

## What Happens Next

### Tonight (17:00-22:00 CET)
- Evening US wave: tweets, LinkedIn article, r/LocalLLaMA
- Publish the "Vibe Coding Is Dead" blog on Medium while the trend window is open
- Check HN and PH for new comments — respond to all

### This Weekend (Day 2-3)
- Publish "Skissify vs Excalidraw" comparison on Dev.to
- Publish "How AI Agents Draw Floor Plans" tutorial
- Post to Indie Hackers: honest metrics from Day 1
- Submit to BetaList and AlternativeTo
- Consider r/HomeImprovement and r/DIY for the homeowner angle

### Week 2
- Analyze which channel drove the most signups (not the most impressions — actual signups)
- Double down on the winner
- Cut the channels that produced noise with no conversion

---

## The Thing Nobody Tells You About Launch Day

You will feel like you're shouting into a void for the first 6 hours.

Then something catches. A comment. A retweet from someone with 20K followers. A Reddit thread that gets traction unexpectedly. The HN post that sits at 3 points for 2 hours and then hits the front page.

You can't predict which one. You can only make sure you're present when it happens.

The best thing I did today: checked every platform every hour and responded to every comment within 30 minutes. Not to look busy — because genuine engagement compounds. The algorithm rewards conversation, not broadcast.

---

## One More Thing

If you're reading this and you're building something: just ship.

The terror of "is this ready?" never goes away. It was there at 00:30 when I hit publish. It'll be there when I write the Month 1 retrospective.

Ship anyway. The market knows things about your product that your brain can't simulate.

Skissify is live at **skissify.com**. Free to use, no credit card. If you build something with it — floor plan, diagram, sketch, whatever — I'd love to see it.

---

*Skissify turns JSON into hand-drawn sketches. Native MCP support for Claude and other AI agents. Free + Pro at €5/month.*  
*→ skissify.com | MCP server: `npm install -g @skissify/mcp-server`*
