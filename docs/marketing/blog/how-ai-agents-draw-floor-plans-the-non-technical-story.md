# How AI Agents Can Draw Floor Plans: The Non-Technical Story

*Posted to: Substack (Monday 08:00 CET), LinkedIn, IndieHackers*  
*Target: 5-6 min read. SEO: "AI floor plan generator", "AI agents visual output", "AI architecture sketch"*  
*Audience: product people, homeowners, curious non-devs — NOT the technical deep-dive (that exists already)*

---

A week ago, I showed a friend a demo of Skissify.

She's not a developer. She renovates houses.

I typed "small studio apartment with an open kitchen, a bathroom tucked in the corner, and a workspace near the window." Within three seconds, a hand-drawn floor plan appeared on screen.

She didn't ask how it worked.

She asked: "Can I use this to explain what I want to my architect?"

---

## The Gap AI Left Open

For two years, AI assistants have been able to describe spaces in extraordinary detail.

Ask ChatGPT to "design a small home office with natural light and a standing desk area" — you get three paragraphs of precise, thoughtful description.

But what you don't get is a picture.

And what we've learned, slowly, is that pictures matter enormously when people are discussing spaces. Words describe. Sketches *show*. And showing is almost always faster, clearer, and more useful when you're trying to figure out whether an idea works.

The visual layer was the gap.

---

## What Changed

In March 2026, the way AI tools connect to the outside world changed significantly. A standard called MCP (Model Context Protocol) became the plumbing that lets AI assistants use external tools natively — the same way your phone can open maps from within a text message.

Skissify is one of those tools.

When you connect Skissify to Claude (the AI assistant from Anthropic), Claude gains a new ability: it can *draw* what it's describing. Not with photorealistic renders. With rough hand-drawn sketches that look like something an architect would scribble on a napkin in a meeting.

That aesthetic is intentional. More on why in a moment.

---

## How It Actually Works (Plain English)

Here's what happens when an AI agent uses Skissify:

1. You describe something. "A three-bedroom apartment, two baths, open living room, balcony facing south."

2. The AI translates your description into a simple spatial structure — a list of rooms, walls, doors, and furniture, with approximate sizes and positions.

3. That structure gets sent to Skissify's rendering engine.

4. Within a few seconds, a hand-drawn sketch appears as a permanent URL — something you can share, paste into an email, or show on your phone.

That's it. No drawing software. No design knowledge required. No export menus.

---

## Why the Sketch Looks Like a Sketch (Not a Blueprint)

We could have made the output look more polished. We chose not to.

There's a body of design research on what happens when you show people different levels of visual polish:

- **Rough sketch:** "Does this structure make sense?"
- **Polished render:** "Can you change that font in the room labels?"

The roughness is a signal. It says: *this is a first draft, please critique the concept, not the execution.*

When you're in the early stages of figuring out a space — whether you're a homeowner explaining an idea to a contractor, or an AI agent reasoning through a floor plan — that's exactly the signal you want to send.

---

## The Real Story: Who's Actually Using This

We built Skissify for AI developers. We assumed they'd be the main audience.

Then we launched.

Here's who actually showed up:

**Homeowners** describing renovation ideas to contractors. They photograph the sketch on their phone and text it. It's faster than anything else they've tried.

**Educators** making geometry worksheets. "Draw a floor plan of a school classroom with the desks in rows" takes 10 seconds.

**Dungeon masters.** (We did not predict this.) Tabletop RPG players who want AI-generated maps for their campaigns. They've turned out to be enthusiastic early adopters.

**Product managers and UX designers** doing early-stage space sketching. Faster than opening Figma for concepts that aren't ready for pixels yet.

We built a tool for AI developers. We accidentally built a spatial communication primitive for everyone.

---

## What You Can Try Right Now

No install needed. No account needed.

Go to **[skissify.com/human](https://skissify.com/human)**

Type any room or space description. Hit submit. Get a sketch.

"A small kitchen with an island and a window above the sink"  
"A coworking space with hot desks along the windows and meeting rooms in the back"  
"A medieval dungeon with a cell block, torture chamber, and secret passage"

It works in plain English. No JSON, no code, no schema to learn.

If you want to use it inside Claude or another AI assistant, the MCP server takes two minutes to configure. Instructions at [skissify.com/docs](https://skissify.com/docs).

---

## Where This Goes

We're one week old. This is genuinely early.

The short list of what's coming:
- More visual styles (blueprint, technical drawing, hand-sketched color)
- Import/export to standard formats
- Better furniture and fixture library
- Multi-floor support

The longer arc is: every AI conversation about space should be able to produce a sketch. That's a long way from where we are, but this week showed us the demand is real.

---

*Skissify launched March 27, 2026. Show HN: Tuesday March 31.*  
*Built by one developer with too much coffee and too many AI agents.*  
*Follow the build: [@skissify](https://twitter.com/skissify) on Twitter/X*
