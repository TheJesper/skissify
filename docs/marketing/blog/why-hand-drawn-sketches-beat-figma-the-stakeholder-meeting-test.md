# Why Hand-Drawn Sketches Beat Figma for Quick Ideas: The Stakeholder Meeting Test

*Cycle 57 — March 30, 2026. Show HN fires in 25 hours. This is the sharpest version of this argument.*

---

I've run this experiment more times than I can count.

**Version A:** I walk into a stakeholder meeting with a polished Figma prototype. Typography nailed. Colors from the brand guide. Spacing meticulously aligned. It took me four hours.

The feedback I get: "I love the blue." "Can we make the logo bigger?" "What font is that?"

**Version B:** I walk in with a rough hand-drawn sketch. Wobbly lines. Boxes with labels. Arrows pointing at things. It took me ten minutes.

The feedback I get: "Wait — why is checkout here and the cart over there? That doesn't make sense." "Shouldn't this flow the other way?" "What happens if the user does X?"

Version B is the conversation I needed.

---

## Why Fidelity Kills Honest Feedback

There's a well-documented phenomenon in UX research: **fidelity signals completion**.

When something looks polished, people assume decisions have been made. They don't want to seem obstructionist. They don't question structure — they react to aesthetics.

When something looks rough, people know it's still being figured out. They feel comfortable saying the structure is wrong. That's the honest feedback that changes products.

The irony: the thing that took four hours produces less useful feedback than the thing that took ten minutes.

This is the Figma Tax in its worst form. You pay it in time, and you pay it again in misdirected feedback.

---

## The Napkin Phase Has a Specific Job

Exploration sketching and production design are different jobs:

**Production design (Figma's job):**
- Communicate a decided design to developers
- Specify spacing, colors, typography
- Create handoff-ready artifacts
- Maintain a component library

**Exploration sketching (the napkin phase job):**
- Think through a problem
- Get structural feedback fast
- Test multiple layouts in minutes
- Invite honest reactions, not aesthetic ones

Figma is exceptional at the first job. It's the wrong tool for the second.

---

## What Changes When AI Agents Can Sketch

In 2026, there's a third actor in the product design process: the AI agent.

An agent can generate ideas faster than any human designer. But until now, those ideas came out as text. Paragraphs describing a layout. Bullet points listing features. Code that developers had to mentally translate into spatial understanding.

Skissify gives AI agents a pencil.

Ask Claude: "Sketch three different navigation approaches for a mobile app."

You get back three hand-drawn sketches. Not wireframe mockups that took someone an hour. Not walls of text describing where elements should go. Three spatial ideas you can look at, react to, and choose between — in seconds.

This isn't a nice-to-have. For any workflow where AI generates product concepts, it changes the entire feedback loop.

---

## The Meeting Room Test: A Protocol

If you want to test this yourself, here's the protocol:

1. Next time you need stakeholder feedback on a product idea, create two artifacts:
   - A rough sketch (Skissify from a 30-second description, or literal paper)
   - A polished mockup in Figma

2. Show the sketch first. Record the feedback.

3. Show the mockup second. Record the feedback.

4. Compare: which feedback session changed how you think about the product?

I'll predict the result: the sketch session will contain at least one structural insight that the mockup session missed entirely.

---

## The Practical Difference

Here's what it looks like in practice with Skissify:

You're building a new checkout flow. You have three ideas. In Figma: three hours of work before you can show anyone anything. With Skissify via Claude:

```
"Sketch three checkout flow approaches:
1. Single page with accordion sections
2. Multi-step with progress bar  
3. Minimal one-column form"
```

Three sketch URLs. Ten seconds. Ready for the meeting.

The sketches look like whiteboards. They signal: *these are ideas, not decisions*. The meeting goes differently.

---

## The Conclusion Figma Doesn't Want You to Reach

Figma is a production tool. It's optimized for the end of the design process, not the beginning.

The beginning of the design process — the part where you're figuring out if an idea is good — has always been underserved. Designers compensate with paper sketches and whiteboard sessions. Those work, but they don't scale: they can't be shared as URLs, versioned, iterated by AI, or turned into a record of decisions made.

Skissify is the napkin phase, productized.

For quick ideas: skip Figma. Sketch first. Get honest feedback. Then — and only then — open Figma.

---

*Skissify launches on Show HN Tuesday March 31, 2026 at 09:00 CET.*  
*[skissify.com](https://skissify.com) | MCP server: `npm install -g @skissify/mcp-server`*  
*Works with Claude, GPT-4, Gemini, and any LLM that can output JSON.*
