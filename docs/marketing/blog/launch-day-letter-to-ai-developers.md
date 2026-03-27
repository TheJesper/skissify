# A Letter to AI Developers — Skissify Is Live

*Published: March 27, 2026 — Launch Day*

---

Dear AI developer,

Today we launched Skissify. Not a soft launch. Not a "limited beta." Actually live, at skissify.com, free tier and everything.

I want to tell you what we built, why we built it, and what we hope you'll do with it.

---

## The problem we kept running into

I work with AI agents a lot. I build things that involve Claude, GPT, and local models doing tasks autonomously. And over and over, I hit the same wall:

**The agent could reason about space. It couldn't show me.**

I'd ask Claude to design a room layout. It would describe it beautifully. "Desk in the northwest corner, 90cm from the window. Bookshelf along the east wall, 180cm tall." Clear. Logical. Completely impossible to visualize without mentally simulating it.

Agents have no visual output channel. They have text. They have code. They have function calls. But they can't *draw*.

That gap — between spatial reasoning and visual output — is what Skissify fills.

---

## What we built

Skissify takes JSON and renders it as a hand-drawn sketch.

That's the whole thing.

```json
{
  "style": { "paper": "cream", "wobble": 3 },
  "elements": [
    { "id": "r1", "type": "room", "x": 50, "y": 50, "width": 200, "height": 150, "label": "Living Room" },
    { "id": "d1", "type": "door", "x": 140, "y": 50, "width": 30, "height": 10, "doorType": "hinged" },
    { "id": "w1", "type": "window", "x": 50, "y": 100, "width": 60, "height": 10 }
  ]
}
```

Paste that into the editor. Or have Claude write it. Or write a script that generates it. The output is always the same: a hand-drawn sketch that looks like someone drew it on paper.

---

## The MCP part

This is the part that matters for AI developers.

Skissify ships with an MCP (Model Context Protocol) server. Install it, add it to Claude Desktop, and Claude gains the ability to *draw*.

```bash
npm install -g @skissify/mcp-server
```

Then in Claude Desktop config:
```json
{
  "mcpServers": {
    "skissify": {
      "command": "skissify-mcp"
    }
  }
}
```

Restart Claude. Now try: *"Design a 2-bedroom apartment, remote-work optimized."*

Claude will reason about the layout, write the JSON, call the Skissify MCP tool, and return a sketch URL. No human hand involved in the drawing step. The agent drew it.

---

## Why hand-drawn? Why not just SVG?

Fair question. The answer is: communication.

When you're in the ideation phase — when you're figuring out whether a layout works, whether a system architecture makes sense, whether a wireframe is in the right ballpark — you don't want clean vector output. Clean output signals "this is decided." Hand-drawn output signals "this is a sketch, let's talk about it."

AI agents working on spatial problems benefit from this distinction too. A hand-drawn output says "here's my reasoning, here's my proposal" rather than "here's the final answer."

The wobble is intentional. The imprecision is a feature.

---

## The technical bits we're proud of

The rendering engine uses multi-harmonic wobble — not the simple sine wave offset that most "hand-drawn" tools fake. Three overlapping harmonics with seeded randomness per element, so every line has its own character.

We support 14 element types: rooms, doors (hinged and sliding), windows, walls, furniture, staircases, structural columns, dimension lines, annotations, and more. The schema is flat by design — absolute coordinates, explicit element types — because flat schema produces ~3x better LLM generation success rates than hierarchical nesting.

We tested this. 200+ LLM generations. Floor plans succeed at 88-92%, system diagrams at 85%, wireframes at 71%. Good enough to be genuinely useful in agent workflows.

---

## What we hope you'll build

We're not precious about use cases. Here are some we've thought about:

- **Renovation planning**: tell your AI assistant to sketch the wall you want to remove
- **Office layout**: "optimize our 12-person team room for async work"
- **System diagrams**: architecture reviews where an agent sketches the current vs proposed state
- **Home automation maps**: room-by-room device placement for smart home setups
- **Quick wireframes**: "show me three layout options for this mobile screen"
- **Teaching tools**: agents that explain spatial concepts by drawing them

But you'll build things we haven't thought of. That's the point.

---

## What comes next

We're launching with the web editor, the MCP server, and a free tier. Pro is €5/month for private sketches and API access.

On our roadmap: furniture library, rotation support, SVG export, Python SDK, TypeScript SDK, and an open-source core rendering engine for developers who want to embed Skissify in their own tools.

---

## A genuine ask

If you build something with Skissify today, tell us. Tweet at @skissify, reply to this post, email us. We want to see what AI agents do when you give them a pencil.

And if something is broken, confusing, or missing — that feedback matters too. We're a tiny team. Your early input shapes the product directly.

---

skissify.com — free to try, no credit card required  
MCP server: `npm install -g @skissify/mcp-server`

Today is launch day. Let's see what gets built.

— The Skissify team

---

*This post is best shared on: Medium (personal publication), Substack, Dev.to, Indie Hackers, and LinkedIn. Publish at 12:00 CET on launch day for maximum US morning overlap.*

*Target audience: Claude Desktop users, MCP developers, AI agent builders, developer tooling enthusiasts.*
