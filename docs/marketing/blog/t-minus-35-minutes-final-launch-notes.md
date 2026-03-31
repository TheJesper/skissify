# T-Minus 35 Minutes: Notes from the Launch Bunker

*Written: March 31, 2026 — 08:26 CET | Published: April 1, 2026*

---

In 35 minutes, Product Hunt resets.

Skissify goes live at 09:01 CET. I'm writing this in the final quiet window before the noise starts.

Not to be dramatic. Just to be honest about what "launching on April 1" actually means from the inside.

---

## The Setup

Skissify is a tool that lets AI agents — and humans — draw hand-sketched layouts from plain text or JSON.

You type "bedroom 4x5m, window north, door south." You get a sketch URL in under 2 seconds.

For AI systems, it's an MCP server. For humans, it's at skissify.com/human. No account needed to try it.

The hard part was the schema. Early versions used nested JSON. LLMs got it right 61% of the time on first try.

That's not good enough. Four in ten agents would get a bad sketch.

Flattening everything to a simple array schema pushed accuracy to 94%. One change. The whole product got better.

---

## Why April 1

The honest answer: the timing wasn't strategic. I launched on a Friday, built through the weekend, and Product Hunt opens slots on a rolling 24-hour basis. April 1 was the next available Wednesday window that fit the preparation timeline.

But I leaned into it.

Here's why: April Fools Day filters users before they sign up. If someone clicks through to a product called "hand-drawn AI sketches" on April 1 and thinks *wait, maybe this is real*, and then checks — that person is high-intent. The extra friction of "is this a joke?" is actually a pre-qualification step.

The ones who stayed got something that works.

---

## What I'm Most Nervous About

Not the product. The product works. I've tested it hundreds of times with different agents and different prompts.

I'm nervous about timing. Product Hunt is a momentum game. The first two hours determine whether you're in the top 5 or not. The first comment matters. The first five upvotes matter disproportionately.

If you're reading this before 11:00 CET on April 1, 2026 — here's the link:

**[Product Hunt launch page]**

Every upvote in the first two hours is worth ten in the afternoon.

---

## The Unexpected Audiences

I built this for AI developers integrating spatial output into agent workflows.

The first people to enthusiastically use it were:
- Kitchen renovation homeowners who wanted a sketch before meeting their contractor
- Dungeon masters generating encounter maps in D&D sessions
- Architecture students capturing client briefs on a tablet
- UX designers who wanted "rough first, precise later"

None of them were in my target persona document.

This is the most interesting thing about building a tool with simple, clear inputs and outputs: you can't fully predict who will use it. You can only make the path of use obvious and watch who shows up.

---

## After Today

Whatever the Product Hunt numbers are, this is real infrastructure.

The visual output layer for AI systems doesn't exist yet at scale. Skissify is a small, working piece of it. The MCP server works today with Claude Desktop. The REST API works today with any LLM stack.

If you're building AI workflows and you need a way to generate spatial diagrams, layouts, or wireframes — the tool is done. Use it.

**skissify.com/editor**

---

*Tags: #BuildInPublic #ProductHunt #LaunchDay #AIAgents #MCP #SketchLayer #SoloFounder*
