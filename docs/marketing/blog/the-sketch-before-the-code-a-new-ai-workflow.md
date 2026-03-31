# The Sketch Before the Code: A New AI Workflow

*Why every AI coding session should start with a hand-drawn sketch*

---

There's a phase in software development that nobody talks about, because it's embarrassing.

It's the phase where you open a new file, stare at it, type something, delete it, open Figma, close Figma, draw a rectangle, realize you don't know what goes inside it, and then spend 20 minutes writing code you're about to throw away.

I call it **the sketch phase**. AI tools have mostly skipped it.

---

## What Cursor, Claude Code, and v0 are missing

The AI coding tools of 2026 are extraordinary at turning ideas into working code. Cursor writes functions. Claude Code refactors entire files. v0 generates UI from prompts. Lovable builds full-stack apps from descriptions.

But all of them have the same gap: **they execute before you know what you want to execute**.

You type "build me a dashboard" and they start building. The first iteration is wrong. The second is closer. By the fifth, you've accumulated technical debt from ideas that changed mid-flight, because you were working out the architecture while the agent was writing code.

The problem isn't the AI. The problem is you never sketched it first.

---

## The sketch phase: what it looks like

In the pre-AI era, a good developer would spend 10-15 minutes before writing code:

- Drawing boxes on a whiteboard
- Sketching a component hierarchy on paper
- Annotating a rough floor plan for a UI (literally — dashboard = rooms)

This isn't wasted time. It's the time that makes the execution fast. When you have a clear spatial picture of what you're building, the code writes itself.

AI coding tools made execution so fast that we skipped this phase. And now we're paying for it in iterations.

---

## What the new workflow looks like

Here's the workflow that's working for me, and for the people using Skissify as a pre-code sketch tool:

1. **Before opening Cursor or Claude Code, open Skissify**
2. Type a description of your UI or system in plain English: "Dashboard with sidebar navigation, main content area, and a top stats bar with three cards"
3. Get a hand-drawn sketch URL in 2 seconds — free, no account
4. **Paste that sketch URL into your first Cursor/Claude Code message as context**
5. Now execute

The difference is dramatic. When the agent has a sketch to work from, it makes assumptions that match what you actually pictured. Without the sketch, it fills gaps with its own defaults — which may not match yours.

---

## Why hand-drawn matters

You might wonder: why not a Figma mockup? Why not a screenshot?

Because hand-drawn signals "this is a draft." When you give a polished Figma file to an AI agent as context, it optimizes for matching the spec. When you give a rough sketch, it optimizes for **understanding your intent** and filling in sensible details.

The roughness is load-bearing. It says "I want something like this, use your judgment."

Figma is for precision. Sketches are for intent.

---

## The 2026 AI coding workflow

| Old workflow | New workflow |
|-------------|-------------|
| Open Cursor, describe what you want | Sketch it first (2 minutes) |
| Agent builds, you iterate | Give sketch as context, agent executes |
| 5-10 iterations to get architecture right | 2-3 iterations, architecture correct from the start |

The total time is similar. The frustration is much lower. The final code is cleaner, because it was designed (in sketch) before it was built.

---

## Try it

Go to [skissify.com/human](https://skissify.com/human). Type a description of your next UI or system. Get a sketch URL. Paste it into Cursor or Claude Code.

Tell me if it changes how you work.

---

*Skissify is a free tool for generating hand-drawn sketches from text descriptions. It has an MCP server for AI agent workflows and a human-friendly form at skissify.com/human. No account needed for public sketches.*
