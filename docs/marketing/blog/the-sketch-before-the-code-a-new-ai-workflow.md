# The Sketch Before the Code: A New AI Workflow Nobody Talks About

There's a step in every good project that most devs skip.

It lives between "I have an idea" and "I'm writing code." It's about 15 minutes of thinking with your hands — drawing rough boxes, arrows, spatial relationships — that changes everything that comes after.

In 2026, AI agents have colonized "writing the code" so completely that we've forgotten what lives upstream.

That step is the **sketch phase**. And it's the one thing AI coding pipelines are missing.

---

## What happens when you skip the sketch

You know the feeling.

You open a new project. You have a sense of what it should do. You start describing it to Claude or Cursor or Bolt. The agent generates something. It's... fine. But it's not quite right. You iterate.

Three hours later you've got 400 lines of working code in the wrong shape.

The architecture doesn't match the mental model you had at the start, because the mental model you had at the start was never made concrete. It was a fuzzy cloud of intent that you fed into the agent one sentence at a time, and the agent filled in the gaps with its own assumptions.

The fix is simple: **make the model explicit before the code exists**.

---

## The workflow that changes this

Step 1: **Sketch the structure** (3 minutes)

Open **skissify.com/human**. Type what you're building in plain spatial terms:

> "Three-panel layout: sidebar with file tree on left, main editor in center, preview panel on right. Top bar with tabs."

You get a hand-drawn sketch URL back in 2 seconds.

Step 2: **Use the sketch as agent context**

Paste the URL into your coding agent conversation as the first message:

> "I want to build something that looks roughly like this: [url]. Before we write any code, walk me through the data model and component tree you'd design."

The agent now has visual grounding. It understands the spatial intent — not just the words you used to describe it.

Step 3: **Iterate on the sketch before iterating on the code**

If the agent's interpretation is wrong, update the sketch first. Add a label, move an element, annotate a relationship. The sketch is cheap to change. Code is expensive.

---

## Why rough matters

When you sketch in Figma or draw a polished wireframe, you're signaling "this is close to final." The agent (and your human collaborators) treat it as a specification.

A Skissify sketch looks hand-drawn on purpose. The wobble, the rough lines, the pencil-on-napkin aesthetic communicate: *this is a direction, not a contract*. That changes how everyone — human or AI — engages with it.

Rough signals: open to revision.
Polished signals: implement this.

For early-stage thinking, you want rough.

---

## For MCP users

If you're running Claude Desktop with MCP enabled:

```
npm install -g @skissify/mcp-server
```

Then this conversation becomes possible:

> **You:** I want to build a dashboard that shows sales metrics. Can you sketch a rough layout?
> 
> **Claude:** [calls generate_sketch, returns hand-drawn sketch URL]
> 
> **You:** Good. The KPI cards should be bigger. And add a filter row above the table.
> 
> **Claude:** [updates sketch, returns new URL]
> 
> **You:** Perfect. Now let's talk about the data model.

The sketch is not a static image. It's a living artifact in the conversation — inspectable, modifiable, chain-passable between agents.

---

## The takeaway

AI changed how we write code. It hasn't yet changed how we think before writing code.

That gap — the sketch phase — is still manual, still skipped, still undervalued.

Skissify is the tool for that phase. 2 seconds from text to sketch. Free to try. No signup.

**skissify.com/human**

*Launching on Product Hunt April 1, 2026.*
