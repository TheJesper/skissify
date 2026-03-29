# How AI Agents Can Draw Floor Plans (Plain English Guide — No Code Required)

*Best platforms: Medium, r/HomeImprovement (4.2M), r/ChatGPT (6M+), r/interiordesign — launch Monday-Tuesday*
*Status: v4 — Consumer/homeowner angle. Complements the technical v3 guide. No JSON, no setup.*

---

Six months ago, if you wanted to show a contractor what you were picturing for a kitchen renovation, you had three options:

1. Spend hours in complicated floor plan software you don't know how to use
2. Describe it verbally and hope they understood
3. Draw a rough sketch by hand and feel embarrassed about your stick-figure walls

There's a fourth option now. And it takes about ninety seconds.

---

## What Actually Happens

You open Skissify. You type something like:

*"I have a rectangular kitchen, roughly 4 meters by 5 meters. There's a door on the left wall near the corner. Two windows on the back wall. I want an island in the middle and a breakfast bar along the right side. Sink under the left window."*

About thirty seconds later, you have a hand-drawn floor plan sketch you can share with anyone — no signup, no credit card, no design software.

You can then say: "Make the island bigger" or "Move the sink to the right wall" and get an updated sketch in seconds.

---

## Why Hand-Drawn?

Fair question. Wouldn't a polished CAD rendering look more professional?

Here's the thing: a polished rendering looks *finished*. When contractors see something that looks finished, they quote it as-is. When clients see something polished, they either approve it without really thinking, or they nitpick the colors.

A hand-drawn sketch says: *this is a rough idea, weigh in*. It invites the conversation you actually need before a contractor touches a single cabinet.

The aesthetic isn't an aesthetic choice. It's a communication strategy.

---

## Who Uses This (Real Stories From Launch Week)

**The contractor briefing:**
A home renovation customer used Skissify to describe a kitchen layout to Claude. Sent the sketch to their contractor. "The contractor actually listened to me for once." Zero wasted hours, four words of feedback: "The island needs moving."

**The DnD dungeon master:**
Nobody planned for this. Dungeon masters discovered that Skissify's "blueprint paper" style produces exactly the aesthetic they want for campaign maps — stone chambers, exits, columns. A whole Reddit thread appeared: *"I've been spending hours in specialized software for this."*

**The geometry teacher:**
Also unplanned. Teachers realized they could generate 30 differentiated spatial exercises in 10 minutes. Diagrams for classrooms, layouts for problem sets, visual aids.

**The AI developer (the intended user):**
Engineers building Claude Claude/GPT agents now add Skissify so their agents can produce visual output — floor plans, architecture diagrams, wireframes — alongside text responses.

The product was built for AI developers. Three other audiences found it anyway.

---

## How To Try It Right Now (3 Steps)

**Option 1: Human Mode (no setup)**
1. Go to [skissify.com](https://skissify.com)
2. Click "Human Mode" 
3. Type what you want to sketch
4. Done

**Option 2: Via Claude (if you have Claude Desktop)**
1. Install the Skissify MCP tool: paste this into Claude Desktop config:
   ```json
   {"mcpServers": {"skissify": {"command": "npx", "args": ["-y", "@skissify/mcp-server"]}}}
   ```
2. Ask Claude: *"Draw me a 2-bedroom apartment layout"*
3. Claude generates and renders the sketch automatically

**Option 3: Just ask Claude.ai (easiest)**
In Claude.ai, paste this:
> *"Generate a Skissify JSON for a [describe your layout here] and render it at skissify.com/api/render. Return the sketch URL."*

---

## What It Can Draw

Skissify understands 14 spatial element types:

- Rooms (any rectangular space)
- Walls (standalone segments)
- Doors (hinged or sliding, placed on any wall)
- Windows (any wall, any width)
- Staircases
- Columns
- Dimension lines
- Labels and annotations
- Circles (tables, equipment)
- Arrows, lines, polylines
- Architectural symbols (sink, toilet, etc.)

Floor plans are the obvious use case. But it also works for:
- Garden layouts
- Office seating plans
- Dungeon maps (genuinely popular)
- Classroom arrangements
- Retail store layouts
- Site plans

---

## The Four Paper Styles

Every sketch renders in one of four styles:

| Style | What It Looks Like | Best For |
|-------|-------------------|---------|
| `napkin` | Pencil sketch, very rough | Early ideas, informal sharing |
| `blueprint` | White on blue, technical | Contractor briefings, architectural feel |
| `technical` | Clean lines, minimal wobble | Professional presentations |
| `rough` | Most hand-drawn, high amplitude | Creative, TTRPG maps, concept sketches |

You can switch styles in seconds. The same JSON renders differently in each.

---

## What It Doesn't Do (Honest Limitations)

- **It's not CAD software.** You can't measure to the millimeter or produce contractor-grade drawings.
- **It's not Figma.** Real-time collaboration and pixel-perfect UI design aren't what this is for.
- **AI isn't perfect.** Claude gets the layout right about 94% of the time on the first try. Sometimes you'll say "the door is on the wrong wall" and regenerate. That's fine.
- **It's not a 3D visualizer.** You won't see what your kitchen will look like rendered in photorealistic materials. That's intentional.

What it is: a fast, honest, shareable rough sketch for the phase when you're still deciding what you're building.

---

## The Pricing

- **Free tier**: All sketches are public (visible via link)
- **Pro (€5/month)**: Private sketches, API access, higher rate limits

Start with free. If you're embedding it in a product or need private sketches, upgrade.

---

## The Bigger Picture

There's a weird thing happening with AI tools right now.

Every AI assistant can answer questions, write code, generate images, and search the web. But if you ask Claude or ChatGPT to communicate the *spatial relationships* between things — how a room is laid out, where a desk sits relative to a window — they can describe it in text or try to make a rough ASCII diagram.

Skissify fills that gap: structured spatial output that's designed for AI generation, human readability, and easy sharing.

It's not a finished product category yet. But the homeowners, dungeon masters, and geometry teachers who found it in the first four days suggest that a lot of people were waiting for this thing to exist.

---

*Try it at [skissify.com](https://skissify.com). Human Mode is free, no signup required. Describe a space, get a sketch in 30 seconds.*
