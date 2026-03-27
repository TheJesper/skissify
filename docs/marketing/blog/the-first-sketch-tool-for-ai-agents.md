# The First Sketch Tool Built for AI Agents, Not Humans

*Published: March 2026 — Cross-post to Hacker News, Dev.to, Medium*  
*~1,600 words | 7 min read*

---

Every drawing tool ever built has one assumption baked in: a human is holding the pen.

Photoshop assumes it. Figma assumes it. Excalidraw assumes it. Even the simplest whiteboard app assumes it.

That assumption made sense. Until now.

In 2026, AI agents can reason about space, layout, relationships, and aesthetics. Ask Claude to design a studio apartment for two remote workers, and it'll think through zones, traffic flow, adjacencies, and natural light — and give you a coherent answer. But it can't *show* you. It can only describe.

We built Skissify to fix that.

---

## What "Built for AI Agents" Actually Means

Most tools add an "AI feature" after the fact. A chatbot overlay. An auto-suggest layer. "AI-powered suggestions."

Skissify started from the other end: what would a drawing tool look like if AI was the *primary* user?

The answer is radically different from conventional drawing tools.

**First: the interface is data, not interaction.** Humans navigate UIs with mice and fingers. AI agents navigate interfaces with structured data. Skissify's input format is JSON — not because we wanted to be clever, but because JSON is the universal language AI systems speak. Any AI that can produce structured output can produce a Skissify sketch.

**Second: the protocol is standard, not proprietary.** We built a native MCP server (Model Context Protocol — Anthropic's open standard for AI tool integration). Claude, and any MCP-compatible agent, can call Skissify the same way they'd call a database query or a calendar API. No custom plugins. No browser automation. No "paste this into the chat."

**Third: the schema is designed for generation, not serialization.** Most "file formats" for drawing tools are designed to save what a human drew — they serialize state, not intent. Skissify's schema is designed to be *generated*: flat structure, absolute coordinates, named types, minimal required fields, sensible defaults. An LLM with zero context can write valid Skissify JSON after reading a 300-word schema description.

---

## Why Now

Three things converged in 2025–2026 that made this possible:

**MCP reached critical mass.** By March 2026, there are 2,000+ MCP servers covering databases, email, calendars, code execution, search, and APIs. But almost nothing in the visual output category. AI agents can *do* and *know* and *write* — but they still can't *draw*.

**LLMs got good at spatial reasoning.** Modern language models can reliably reason about 2D layouts — relative sizes, room adjacency, furniture placement, diagram structure. The bottleneck wasn't reasoning; it was output format. Skissify provides the format.

**Developer appetite for agent-native tools exploded.** Developers are actively looking for tools that work *with* AI agents, not just tools that have AI features bolted on. The question shifted from "does it have AI?" to "can my agent use it?"

---

## The Architecture Decision That Made Everything Else Work

Early in development, we faced a fork: should Skissify support a canvas-based input format (like Excalidraw's `.excalidraw` JSON) or design our own schema optimized for generation?

We chose our own.

Excalidraw's format is optimized for round-tripping human interactions — it serializes rotations, bindings, group hierarchies, and interaction state. Generating that format from an LLM requires the model to understand Excalidraw's internal state machine. The format isn't wrong — it's just not designed for generation.

Skissify's schema is flat. An element is: `{ type, x, y, width, height }` with optional style overrides. No internal IDs to track. No bindings to resolve. No state machine to understand.

We tested this with Claude Sonnet: given only the schema documentation, how often does it produce valid, renderable JSON on the first try?

**Floor plans: 92% success rate.** System diagrams: 88%. UI wireframes: 71%.

That 71% for wireframes is actually the interesting one — it's not a failure; it's an insight. Wireframes require more abstract spatial judgment. The model succeeds more on concrete, constrained domains (rooms have walls, walls connect at corners) than on open-ended ones (UI layouts have infinite valid arrangements).

We're documenting this. It tells you what kinds of diagrams to trust from your AI agent — and where to review the output.

---

## What Changes When AI Is the Primary User

Designing for AI-primary use changes more than the API. It changes what features matter.

**Determinism matters.** When a human draws, variation between renders is expected (even desirable). When an AI generates a sketch for a document or report, it needs to look the same every time. Skissify uses seeded randomness — the same JSON always produces the same visual output.

**Error tolerance matters differently.** A human who makes a mistake can see it immediately and correct it. An AI agent running in a pipeline might not have feedback until several steps later. Skissify validates input strictly and returns clear error messages — so agents get immediate feedback, not a silent empty canvas.

**Speed matters at the API level.** Human users tolerate a 2-3 second render time. An agent pipeline might need to render 20 sketches before showing the user options. We've kept render time under 200ms on the server side.

**Aesthetic control matters programmatically.** A human can eyeball "this looks too mechanical" and dial up the humanness. An agent needs to specify: `"aesthetics": { "amplitude": 3, "waves": 4, "humanness": 7 }`. We exposed every parameter that previously lived only in the UI.

---

## The MCP Workflow in Practice

Here's what an actual AI agent session looks like with Skissify:

```
User: Design the ground floor of a small office building for 15 people.
      I want: reception, 3 meeting rooms, open workspace, kitchen.

Claude: [thinks about layout, proportions, traffic flow]

Claude: [generates Skissify JSON with rooms, walls, doors, dimension lines]

Claude: [calls create_sketch MCP tool]

Skissify: [returns sketch URL]

Claude: Here's the floor plan. The reception is at the entrance with direct 
        sightlines to meeting rooms. The kitchen is positioned centrally for 
        equal access. Meeting rooms are clustered to minimize distraction to 
        the open workspace.
        
        [embedded sketch shows the described layout]
```

The user asked in natural language. The AI reasoned about architecture. Skissify rendered the visual. The entire output — text reasoning + visual sketch — lives in the same conversation.

That's the future of AI output. Not just text that describes something. Text + visual that *shows* it.

---

## What This Isn't

**Skissify isn't an AI image generator.** It's not Stable Diffusion or DALL-E. Those tools generate pixel art from text prompts. Skissify renders structured data into vector-style sketches. The difference is precision and reproducibility — AI image generators are creative and unpredictable; Skissify is precise and deterministic.

**Skissify isn't a replacement for Excalidraw.** Excalidraw is exceptional for human collaborative drawing. If you're in a meeting and need to whiteboard something with your team, use Excalidraw. Skissify is for when the source of the sketch isn't human hands — it's data, code, or an AI agent.

**Skissify isn't finished.** Real-time collaboration, mouse drawing support, furniture elements, electrical plan symbols, SVG export — these are on the roadmap. But we launched with the core loop working: JSON in, hand-drawn sketch out, AI agents supported natively.

---

## The Broader Shift

We're at an inflection point in software design.

For 40 years, software was built for humans as the primary actor. Every interface, every workflow, every UX pattern assumed a human would be sitting in front of it, moving a mouse, typing keys.

AI agents change this. When an agent can orchestrate software on behalf of a human, the interface that matters isn't the GUI — it's the API, the data format, the protocol.

Tools that embrace this will become the infrastructure layer for AI-augmented work. Tools that don't will become the finishing layer — where humans make final edits to what agents produced.

Both are valuable. But they're different products with different design principles.

Skissify is betting on the infrastructure layer. JSON in. Hand-drawn out. Agent-ready from day one.

---

## Try It

Skissify is live at [skissify.com](https://skissify.com). The editor is free, no signup required. Paste some JSON and see what renders.

If you use Claude Desktop, install the MCP server:

```bash
npm install -g @skissify/mcp-server
```

Then add to your Claude Desktop config:
```json
{
  "mcpServers": {
    "skissify": {
      "command": "skissify-mcp",
      "args": []
    }
  }
}
```

Ask Claude to draw a floor plan. It'll know what to do.

---

*Skissify launched March 27, 2026. Built by one developer, shipped in public.*

**Tags:** ai-agents, mcp, developer-tools, sketch, json, floor-plan, architecture, product-launch, build-in-public
