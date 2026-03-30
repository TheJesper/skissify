# The Morning Before Show HN: Here's What I Actually Built

*This is the most honest version of the Skissify story. Written at 04:00 CET, Monday March 30. 29 hours before Show HN.*

---

Tomorrow I submit to Hacker News. I'm going to tell you exactly what Skissify is, what's good, what's not, and why I think it matters.

## The Problem I Kept Running Into

I build AI agents. A lot of them.

And constantly I'd hit the same wall: I needed an agent to communicate a *spatial* idea. A floor plan. A room layout. A diagram of how parts relate in space.

What I got was text. "The bedroom is on the left side, adjacent to the bathroom, which is connected to the hallway that leads to the kitchen..."

That's not how humans think about space. We think in pictures.

I wanted to say to Claude: "Show me." And have it actually show me.

## What I Built

Skissify is a JSON-to-sketch renderer. You describe a space, you get a hand-drawn sketch URL back. The URL is permanent, shareable, and can be embedded or passed to another agent.

There are two entry points:

**For developers:** POST to the API with a flat JSON element list. Get a sketch URL.

```json
{
  "elements": [
    {"type": "wall", "x1": 0, "y1": 0, "x2": 400, "y2": 0},
    {"type": "wall", "x1": 0, "y1": 0, "x2": 0, "y2": 300},
    {"type": "room", "x": 10, "y": 10, "width": 180, "height": 130, "label": "bedroom"},
    {"type": "door", "x": 80, "y": 0, "width": 70}
  ]
}
```

**For everyone else:** Human Mode at skissify.com/human. Type a description. Get a sketch. No account, no JSON, no install.

```
"small apartment, bedroom left, open plan kitchen right, bathroom between"
```

Same thing. Sketch URL in under a second.

## The Schema Insight (The Most Technical Thing I'll Say)

I tried a nested JSON schema first. Rooms containing walls containing doors. Logical hierarchy.

First-try LLM accuracy: ~60%.

I flattened everything. Every element is a sibling. Absolute coordinates only. No hierarchy.

First-try LLM accuracy: 94%.

This sounds counterintuitive. Surely hierarchy is *more* logical?

LLMs generate tokens sequentially. A flat list plays to that strength. A nested tree asks the model to maintain positional context across depth levels — and it sometimes fails. Flat is more predictable. Predictable means accurate.

If you design schemas for LLM generation, this is the most important thing I've learned in five days.

## What Happened After Launch

I launched quietly on a Friday. I expected:
- AI developers building agents
- Maybe a few MCP enthusiasts

Who actually showed up:
- Homeowners sketching renovation layouts to text their contractor
- A geometry teacher generating worksheet diagrams
- Multiple (independent) dungeon masters wanting D&D room maps
- Real estate agents doing rough floor plans before the professional renders were ready

None of this was planned. All of it was real.

What this told me: "describe a space, get a sketch" is a more fundamental human need than I anticipated. I thought I was solving a developer problem. I built something closer to a sketch primitive — useful to anyone who needs to think spatially and share the thought.

## What's Not Finished

I'll be direct:

- **Screenshots:** I have mental ones, not actual ones. Working on this today.
- **Wobble GIF:** The `wobble` parameter (0-10, controls how hand-drawn the lines look) is the most impressive visual feature. I haven't made a GIF yet.
- **Email capture:** No newsletter signup on the homepage. Day 1 mistake I can't fix retroactively.
- **SDK:** The TypeScript SDK is on the Week 2 list.
- **Pricing page clarity:** Free tier is clear. The paid tier details need work.

I'm telling you this because Show HN rewards honesty. The community can tell when founders are overselling.

## Why the Wobble Parameter Matters

It's not aesthetic. It's functional.

A sketch with `wobble: 0` looks like a CAD drawing. Clean lines. Precise angles.

A sketch with `wobble: 7` looks like someone drew it on a napkin.

Here's what changes: people's *relationship* to the sketch.

When you show someone a clean CAD drawing, they treat it as a decision. They critique the precise angle of a wall. They ask about exact dimensions.

When you show someone a rough sketch, they treat it as a starting point. They say "what if the bedroom was bigger?" They engage with the *idea*, not the artifact.

The wobble parameter controls cognitive engagement. That's why it's a feature, not a gimmick.

## The HN Submission

Tomorrow at 09:00 CET I post:

> **Show HN: Skissify – JSON or plain text → hand-drawn sketch URL (MCP native)**

I'll lead with the schema insight (flat vs nested, 94% vs 60%) because that's genuinely interesting to the HN audience independent of whether they ever use Skissify.

Then the Human Mode demo, because it's the most accessible hook.

Then the unexpected audiences, because people like stories.

## If You Want to Try It Before Tomorrow

**[skissify.com/human](https://skissify.com/human)**

No account. No JSON. Type a room. Get a sketch.

Or if you want to go deeper: `npm install -g @skissify/mcp-server`

---

*Whatever happens tomorrow, this week has been worth it. The four audiences who found us without any effort from me are the signal I needed to keep building.*

*— Jesper*
