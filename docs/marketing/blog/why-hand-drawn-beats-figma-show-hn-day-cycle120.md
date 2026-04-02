# Why Hand-Drawn Sketches Beat Figma for Quick Ideas (Show HN Edition)

*Published: April 3, 2026 — Cycle 120*
*~1,800 words | 7 min read*
*Cross-post: Dev.to, Hashnode, HN Show thread*

> **TL;DR:** Polished design tools make you polish the wrong things. Hand-drawn sketches keep you in idea mode longer — and that's where the best decisions happen. Today, AI agents can generate those sketches from plain text. I built the tool. Show HN just happened. Here's why this matters.

---

Today I posted Skissify to Hacker News. The response was immediate feedback from hundreds of developers, which confirmed something I suspected when I built this: **people still reach for sketches first, and they don't have good tools for it**.

Here's the argument I should have written before launch.

## The Wrong Tool for the Right Moment

Open Figma to brainstorm a new screen layout.

What happens? Before you've drawn a single element, Figma is already asking questions: What frame size? What color style? Do you want to use your existing component library?

That's not brainstorming. That's delivering. And Figma doesn't know the difference.

This is the core problem: **Figma is a production tool that's been adopted for ideation because we don't have better ideation tools.** We've been using a scalpel to cut bread because the butter knife was in the dishwasher.

## Sketch Energy vs. Design Energy

There's a cognitive difference between the act of sketching and the act of designing.

Sketching is generative. Designing is evaluative.

When you sketch, you're externalizing thoughts fast enough to keep up with thinking. Lines are approximate. Boxes represent things, not dimensions. You're thinking *in* the sketch.

When you design in Figma, you're making decisions. Pixel precision. Color tokens. Component alignment. You've shifted from "what should this be?" to "how should this look?"

This shift happens the moment the canvas feels real.

**Studies on design cognition consistently show that lower-fidelity prototypes generate better conceptual feedback.** Stakeholders react to what's present, not what's implied. Show someone a polished Figma component and they'll tell you the typography is wrong. Show them a hand-drawn box and they'll tell you the whole screen is wrong — which is the feedback you actually needed.

## The Wobble Signal

Hand-drawn imperfection communicates intent.

When a sketch has wobble — lines that aren't quite straight, boxes with slightly uneven corners — it broadcasts a clear signal: *this is an idea, not a decision.* Reviewers give themselves permission to challenge it fundamentally.

The Polish Signal works in reverse. When something looks finished, reviewers assume decisions were made deliberately and hesitate to question them.

This is why I built tunable wobble into Skissify. Not as an aesthetic choice — as a communication tool. Low wobble = technical drawing mode (more serious, for documentation). High wobble = pure napkin mode (challenge everything, nothing is committed).

## The AI Agent Dimension

Here's where it gets interesting in 2026.

AI assistants are excellent at describing spatial and structural things. Ask Claude to design a 2-bedroom apartment layout and it will give you a remarkably detailed description: room proportions, adjacencies, traffic flow, natural light orientation. It reasons about space well.

But it couldn't render that reasoning visually — until now.

With Skissify and its MCP server, that conversation ends with a sketch URL, not a paragraph of text. Claude writes the JSON. Skissify renders it. You get a hand-drawn floor plan you can forward to an architect or drop in a Slack thread.

The AI agent doesn't need Figma. It needs a sketch tool it can call programmatically. Figma's API is powerful but designed for humans. Skissify's API is designed for agents: flat JSON in, sketch URL out, 150ms round trip.

## What Figma Is Actually For

To be clear: I'm not anti-Figma.

Figma is the right tool for the moment when you've decided what to build and you need to build it correctly. That moment matters. Production fidelity matters. Component consistency matters.

The argument is about **which tool at which stage**.

Early exploration → hand-drawn sketches (Skissify, literal napkin, whiteboard)
Mid-fidelity validation → Figma lo-fi mode or wireframe kits
Production design → Figma at full power

Most teams skip stage one entirely — because the tools were terrible. You'd have to either draw by hand (and lose the shareable link) or open Figma (and get sucked into production mode immediately).

Skissify is the stage-one tool. That's the gap.

## The 30-Second Proof

Here's the test I run for any tool claiming to help with early-stage design:

Can you go from "I have an idea" to "someone else can see my idea" in under 30 seconds?

With Figma: no. Figma setup takes minutes even if you're fast.

With Skissify: yes. Paste or type a JSON description, share the URL.

With Claude + Skissify MCP: yes, automatically. Describe it. Claude draws it. Copy the URL.

That 30-second bar is the right bar for ideation tools. When you're in the flow of a brainstorm, you can't afford a 5-minute setup. The idea is gone by then.

## What Show HN Taught Me This Morning

After posting to Hacker News this morning, the first wave of comments came back asking:

- "What's the JSON schema?"
- "Can I use this without the AI?"
- "How does the wobble algorithm work?"

Not a single comment asked about Figma compatibility or export formats. The developers who showed up to read Skissify understood immediately that this is a different kind of tool — not a Figma competitor, but a Figma precursor.

That framing matters. Skissify lives at the start of the design process, not the middle.

The napkin isn't going away. We just needed a better napkin.

---

*Skissify is live at [skissify.com](https://skissify.com). Free tier available. MCP server: `npx skissify-mcp`*

*Show HN thread: [link]*
