# The One Thing Figma Cannot Do That a Napkin Can

*Published: April 1, 2026 | Author: Jesper | Platform: Dev.to, Medium*

---

Figma is a remarkable piece of software.

It handles components, prototypes, auto-layout, variables, branching, version history, live collaboration, and developer handoff. It runs in a browser tab. The free tier is genuinely useful. They've basically solved the problem of "how do you design software collaboratively?"

And yet.

Every designer I know keeps a notebook next to their laptop.

Not as nostalgia. Not as analog therapy. As a functional tool for a specific job that Figma — despite everything — cannot do.

---

## What the Notebook Does

When you sketch on paper, you signal something that a polished design cannot:

**"This is not finished. React to the structure, not the pixels."**

That signal is almost impossible to fake in Figma. If you make a Figma frame and wire up the components and set the spacing and choose the right font size — even if you call it a "lo-fi prototype" — it looks deliberate. It looks considered. It looks, to most people, like a decision that was already made.

And so they respond to it that way. They comment on the color choice instead of the layout logic. They wonder if the button should be on the left or the right instead of wondering if there should be a button at all.

The research term for this is **premature convergence**: the design looks finished enough that people stop diverging and start converging before the actual design decision has been made.

A napkin sketch doesn't have this problem. It looks rough because it is rough. The roughness is a signal, not a limitation.

---

## The Irony of "Lo-Fi"

The UX community has been aware of this for decades. That's why "lo-fi prototyping" became a practice. The explicit instruction: make your prototype look worse on purpose so that people will engage with the ideas instead of the execution.

But there's a limit. Even a "lo-fi" Figma prototype — grayscale, no typography polish, boxes and labels — is still rendered on a screen at full resolution with clean lines and perfect alignment. The medium doesn't support lo-fi the way paper does.

Paper is lo-fi at the hardware level. The medium doesn't allow you to make something that looks finished. The closest you can get is a sketch that looks more or less coherent.

That's not a weakness. It's the point.

---

## What AI Agents Have to Do With This

Here's where it gets interesting for 2026.

AI agents are very good at describing spatial things. Ask Claude to describe a floor plan for a two-bedroom apartment, and you'll get a paragraph with compass directions, square footages, and thoughtful adjacencies. Ask it to describe a system architecture for a microservices backend, and you'll get a list of services and their relationships.

What Claude cannot do — until now — is draw it.

The output is always text. Or a Mermaid diagram. Or a description of what a floor plan would look like.

Skissify closes that gap. The agent generates JSON (or plain text), posts it to the API, and gets back a sketch URL — a hand-drawn looking image with the right spatial relationships, wobbly lines, and labels.

But the point isn't just "now agents can draw."

The point is: **agents can now produce the right signal.**

When an AI agent outputs a beautifully rendered clean diagram, the human looks at it and thinks "is this the final answer?" When the same information is rendered as a wobbly hand-drawn sketch, the human thinks "okay, here's the structure — what should change?"

The sketch is not worse than the clean diagram. It's better for the specific job of early-stage spatial communication.

---

## The Practical Version

Let me make this concrete.

You're using Claude to plan an office renovation. You describe the space: 12 meters by 8 meters, open plan, needs a meeting room, kitchen in the corner, reception near the entrance.

Option A: Claude outputs a bulleted description of where things go.
Option B: Claude calls the Skissify MCP tool and returns a sketch URL.

With option A, you have to mentally visualize the layout and map the words to the space. That's cognitive work. And the words "reception near the entrance" don't tell you if that means the reception is two meters from the door or ten.

With option B, you have a sketch. The reception is a labeled rectangle near the entrance rectangle. You can immediately see if the proportions feel right, whether the flow makes sense, whether the meeting room is too close to the kitchen.

The sketch is not a replacement for the architect's drawing. It's a replacement for the description that preceded the architect's drawing.

---

## Why "Hand-Drawn" and Not "Clean"

We could have made Skissify output clean vector diagrams with perfect lines. We made it output wobbly hand-drawn sketches on purpose.

The wobble algorithm applies multi-harmonic distortion to each line. It's not random noise — it's mathematically structured imprecision that mimics the micro-variations of a real pen on paper.

The result looks like something a person drew. Not an engineer. Not a software tool. A person.

That's the signal.

---

## The Summary

Figma is the best polished design tool ever built. Use it for polished design.

Paper — or a paper-like tool — is better for the thing that happens before polished design. The phase where you're still figuring out whether the door should be on the left wall or the right wall. The phase where you need people to engage with structure, not execution.

AI agents are now good enough at spatial reasoning to participate in that early phase. They were missing the output format.

Skissify is the output format.

---

*Skissify: JSON → hand-drawn sketch URL. MCP native. Human Mode for plain text input.*
*Free tier, no signup: skissify.com/editor*
