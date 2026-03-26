# Skissify — Social Media Launch Content

**Launch Date: March 27, 2026 (TODAY)**  
All content ready to copy-paste. Adjust links and handles before posting.

---

## VIRAL HOOK PRINCIPLES

These are the proven angles that cut through on launch day:

1. **The "wait, what?"** hook — say something that makes people stop scrolling
2. **Show, don't tell** — demo GIFs outperform screenshots 3x
3. **Technical specificity** — "multi-harmonic wobble" lands better than "hand-drawn effect"
4. **Contrast framing** — "no drag-and-drop" is more interesting than "JSON input"
5. **The AI angle** — MCP + Claude is 2026's hottest dev topic, lead with it
6. **Numbers + data** — even small numbers make claims credible

---

## Twitter/X

### Tweet 1: Launch Announcement (VIRAL HOOK)
```
I built a sketch tool where the input is JSON.

Not drag-and-drop. Not a canvas.
JSON → hand-drawn sketch.

Why? So AI agents can draw.

Claude can literally say "design a floor plan" and Skissify renders it.

Free: skissify.com

[attach: demo GIF — JSON paste → floor plan appears in <1 second]
```

### Tweet 2: The AI Agent Angle (Post at 09:00 CET)
```
AI agents can now draw floor plans.

Not describe them. DRAW them.

I gave Claude a prompt:
"Design a 2-bedroom apartment, remote-work optimized"

It designed the layout, wrote the JSON, called Skissify's MCP server, and returned a hand-drawn floor plan.

The future of AI output isn't just text.

[attach: screen recording of Claude + MCP + sketch output]
```

### Tweet 3: Technical Deep-Dive Thread (Post at 14:00 CET)
```
I spent months perfecting hand-drawn line rendering.

Most tools fake it with a sine wave. It looks mechanical.

Here's how Skissify actually does it: 🧵

[attach: before/after comparison — sine wave vs multi-harmonic]
```

**Thread replies:**
```
1/ The problem: every "hand-drawn" sketch tool I tried had the same issue.

Sine wave offset = identical wobble pattern on every line.
It's not hand-drawn. It's algorithmically regular.

Real hands don't oscillate at a constant frequency.
```

```
2/ Skissify uses multi-harmonic wobble with seeded randomness.

Three axes of control:
→ Amplitude: how far lines deviate from straight
→ Waves: frequency of the wobble harmonics
→ Humanness: random tremor overlay (simulates hand shake)

Low humanness = clean technical drawing
High humanness = you drew this in a hurry
```

```
3/ Each element type has different wobble behavior.

A door arc wobbles differently than a wall line.
A dimension line has tighter tolerances than a freeform rect.
A stair tread wobbles at a different phase than the riser.

14 element types. Each tuned.
```

```
4/ Here's the key insight:

Seeded randomness means the same JSON always renders the same way.
But different elements get different seeds based on their position.

So "wall at x:100" looks different from "wall at x:200" — even with identical parameters.

It actually looks like a human drew each line independently.
```

```
5/ The real unlock: MCP support.

AI agents (Claude, GPT, others) can create sketches programmatically via the Model Context Protocol.

Agent sends JSON → Skissify renders → user gets a sketch.

No drag-and-drop. No UI. Code → art.

Try it free: skissify.com
```

### Tweet 4: Comparison (Post at 17:00 CET)
```
Sketch tool breakdown in 2026:

Excalidraw — draw by hand, open source, great collab
tldraw — SDK-first, $6K/yr commercial license
Miro — enterprise whiteboard, $10+/user/mo
Mermaid — text diagrams, no freeform
draw.io — XML hell, powerful, ugly

Skissify — JSON in, hand-drawn out, AI agents native, €5/mo

Different niche. AI-first.

skissify.com
```

### Tweet 5: Transparency / Day 1 Results (Post at 23:00 CET)
```
Day 1 of Skissify is almost done.

📊 [X] signups
🖊️ [X] sketches created
🤖 [X] AI-generated floor plans
⭐ [X] Product Hunt upvotes

Biggest request so far: [feature from feedback]

The thing about building in public: you can't fake it.

Here are the real numbers: [link to PH or transparency page]

If you tried it: thank you. What would make it 10x better?
```

---

## VIRAL HOOK ALTERNATIVES (A/B test)

### Hook A: The Counterintuitive Opener
```
Most sketch tools are wrong.

They're built for humans to draw. But humans aren't the bottleneck anymore — AI agents are.

Skissify is the first sketch tool where JSON is the interface.

AI generates JSON. Skissify renders it. You get a hand-drawn floor plan.

skissify.com
```

### Hook B: The Specific Moment
```
You know the moment an AI describes a system architecture and you're nodding along, but you can't picture it?

I built Skissify to fix that.

Tell Claude to sketch it. It calls Skissify via MCP. You get a hand-drawn diagram in the chat.

Demo: skissify.com
```

### Hook C: The Contrast Hook
```
Figma is for designing the final thing.
Excalidraw is for drawing by hand.

Neither one lets an AI agent draw for you.

I built one that does.

JSON → hand-drawn sketch. AI-native. Free.

skissify.com
```

---

## Reddit Posts

### r/SideProject (11:00 CET)
**Title:** I built a sketch tool where the input is JSON — so AI agents can draw floor plans

```
Hey r/SideProject — I'm launching Skissify today!

The one-liner: Skissify turns JSON into hand-drawn-style sketches.

The interesting bit: because the input is JSON (not drag-and-drop), AI agents can create sketches programmatically. I built an MCP server, so Claude can literally design and render a floor plan from a natural language prompt.

---

**Why I built it:**
I wanted AI agents to have visual output. They can reason about space perfectly — describe room layouts, adjacencies, proportions — but they couldn't draw. Skissify gives them a pen.

**What's built:**
- 14 element types (including architectural: doors, windows, stairs, dimension lines)
- 4 paper styles: cream, white, grid, blueprint
- 3 tool types: pencil, ballpoint, ink
- MCP server (install in Claude Desktop)
- Tunable wobble engine (amplitude, waves, humanness)
- Free public sketches, Pro at €5/mo

**Stack:** Next.js 15, TypeScript, Canvas 2D, Prisma + SQLite, Stripe

**Live at:** skissify.com

Would love honest feedback on:
1. Is the JSON-first approach confusing, or does it make sense immediately?
2. What use cases would you reach for this for?
3. Free/Pro split — reasonable?
4. What element types are missing for your workflow?

[screenshots: floor plan, blueprint, element grid]
```

### r/webdev (15:00 CET)
**Title:** Show r/webdev: I implemented multi-harmonic wobble algorithms for hand-drawn line rendering

```
Built a sketch renderer that takes JSON and produces hand-drawn-style output. The interesting technical piece is the wobble engine.

**The problem with existing approaches:**
Most "hand-drawn" tools use a simple sine wave offset per point. It produces regular, mechanical-looking wobble. Not actually what human hands do.

**What Skissify does:**
Multi-harmonic wobble with seeded randomness. For each line segment:
- Multiple overlapping sine waves at different frequencies
- Seeded per-element (so each element gets unique tremor)
- Three control parameters: amplitude, frequency, humanness (random tremor)

Each element type (rect, circle, arc, door, window, stair) has tuned wobble behavior. A door arc wobbles differently than a wall line.

**The JSON-first approach:**
The whole tool takes a JSON manifest as input — not mouse input. This makes it ideal for AI agent use (MCP server included).

**14 element types**, 4 paper styles, Canvas 2D rendering, no external drawing libraries.

Live: skissify.com — editor is free, no signup to test.

Happy to discuss the rendering math or the MCP architecture if anyone's curious.
```

### r/mcp (18:00 CET)
**Title:** I built an MCP server that lets AI agents create hand-drawn sketches — floor plans, diagrams, wireframes

```
Just launched Skissify today — a sketch tool designed for programmatic input, with an MCP server.

**What it does:**
- Takes JSON describing elements (rects, lines, doors, windows, stairs, etc.)
- Renders them as hand-drawn-style sketches
- Exposes a `create_sketch` tool via MCP

**In practice with Claude:**
"Design a 2-bedroom apartment, show me the floor plan" → Claude generates JSON → calls create_sketch → returns rendered sketch URL.

The rendering engine uses multi-harmonic wobble to produce authentic hand-drawn aesthetics. The JSON schema covers 14 architectural element types.

**Installation:**
```
npm install -g @skissify/mcp-server
```

Then add to your Claude Desktop config. Full instructions on skissify.com.

Currently the most useful use cases I've found:
1. Floor plans from natural language
2. System architecture diagrams
3. Quick UI wireframes

What other agent workflows would you use this for? Curious what the r/mcp community would reach for.
```

### r/LocalLLaMA (18:30 CET)
**Title:** First sketch tool with MCP support — local agents can now create hand-drawn visuals

```
Launched Skissify today — a sketch renderer with an MCP server, so local AI agents can create visual output.

The short version: agents send JSON → Skissify renders hand-drawn sketches. Floor plans, diagrams, wireframes.

Relevant for local LLM users:
- MCP server runs locally (npm install @skissify/mcp-server)
- Works with any MCP-compatible agent setup
- Docker-deployable if you want to self-host the renderer
- No cloud dependency for the MCP layer

I've tested it primarily with Claude Desktop but the MCP server should work with any compatible client.

The rendering is Canvas 2D in the browser — purely client-side rendering, so the server just stores manifests and serves the app.

Would love to hear if anyone gets it working with local LLM setups (Ollama, LM Studio, etc. via MCP). I suspect there are some fun workflows I haven't tried yet.

skissify.com — free tier available
```

### r/artificial (17:00 CET)
**Title:** AI agents can now draw, not just describe — launched Skissify with MCP support today

```
There's a gap in AI agent output: they can reason, write, and code — but they can't draw.

Today I launched Skissify to fix that.

The concept: Skissify takes JSON as input and renders hand-drawn-style sketches. With MCP support, AI agents can call it directly. You can have a conversation like:

"Design a home office layout for a 4m × 3.5m room, north-facing window, standing desk preferred"

And Claude will design it, generate the JSON, call Skissify, and hand you back a sketch.

It's not just floor plans. System architecture diagrams, UI wireframes, network topology — any spatial or structural concept that an AI can reason about can now be visualized.

14 element types (including architectural). 4 paper styles. Tunable wobble engine.

Free at skissify.com. MCP server on npm.

What workflows would you want this for? What would you ask Claude to draw?
```

---

## LinkedIn (07:15 CET)

```
I spent months trying to answer one question: why can't AI agents draw?

They can reason about space perfectly. Ask an AI to design a room layout, a system architecture, a UI wireframe — you get a thoughtful, detailed response. But always in text.

Today I'm launching Skissify — a sketch tool built to close that gap.

The approach: JSON-first input + MCP (Model Context Protocol) server. AI agents describe elements in JSON, Skissify renders them as hand-drawn-style sketches. Floor plans, architecture diagrams, wireframes — anything spatial.

With Claude Desktop integration, you can literally say "design a 2-bedroom apartment" and get a sketch in the response.

Technical bits:
→ 14 element types, including architectural (doors, windows, stairs, dimension lines)
→ Multi-harmonic wobble engine for authentic hand-drawn rendering
→ 4 paper styles (cream, blueprint, grid, white)
→ Tunable aesthetics (amplitude, wave frequency, humanness)
→ Next.js 15 / TypeScript / Canvas 2D

Free tier available. Pro at €5/month.

The sketch tool for the AI agent era: skissify.com

#AIAgents #MCP #DeveloperTools #SaaS #BuildInPublic #DesignTools #Sketching
```

---

## Mastodon / Bluesky (07:30 CET)

```
🎉 Launched today: Skissify — a sketch tool where the input is JSON.

Why JSON? Because AI agents can generate it.

With MCP support, Claude can design and draw floor plans, diagrams, and wireframes directly in conversation. No human hand needed.

Technical: multi-harmonic wobble engine, 14 element types, 4 paper styles, Canvas 2D.

Free at skissify.com

#WebDev #AI #MCP #BuildInPublic #OpenSource #SideProject
```

---

## Hacker News Companion (comment ready for Show HN thread)

```
Thanks for all the questions! A few clarifications that keep coming up:

**On the JSON-first design:**
This wasn't an aesthetic choice — it was a strategic one. The original use case was "AI agents need to draw." If the input is JSON, any agent that can generate structured data can create sketches. Drag-and-drop would make that impossible.

**On the wobble algorithm:**
It's multi-harmonic, not a single sine wave. Each element gets a unique seed based on position, so "wall at x:100" looks different from "wall at x:200" even with identical parameters. The three sliders (amplitude, waves, humanness) map to different properties of the harmonic distortion.

**On MCP:**
The MCP server is the part I'm most excited about. Claude Desktop users can install it in ~2 minutes and then ask Claude to draw anything spatial. I've tested: floor plans, network diagrams, simple UI wireframes. Works surprisingly well.

**On self-hosting:**
Docker-compose is in the repo. SQLite, no external DB needed. Should be straightforward to self-host.

**What's next:**
- npm package for the core renderer (OSS)
- More element types (furniture, electrical, plumbing)
- SVG export
- Element rotation on canvas
- Potentially: collaborative editing (but not at the expense of the JSON-first approach)
```

---

## Discord/Slack Communities to Post In

### Relevant Servers/Workspaces:
- **Anthropic Discord** — #mcp-showcase or #projects
- **Indie Hackers Slack** — #show-ih
- **The Changelog Discord** — #projects
- **Developer Discord servers** — frame around MCP/AI agent angle
- **Architect communities** — frame around floor plan generation

### Message Template for Discord:
```
Hey! Just launched Skissify today — a sketch tool that takes JSON as input instead of drag-and-drop.

The key thing: it has MCP support, so AI agents can create hand-drawn sketches directly. Tell Claude to draw a floor plan, it calls Skissify, you get a sketch.

14 element types (including architectural), 4 paper styles, tunable wobble engine.

Free: skissify.com — would love feedback from this community.
```

---

## Hashtag Strategy

### Primary (use on every post):
`#MCP` `#AIAgents` `#BuildInPublic` `#SideProject` `#Launch`

### Technical audience:
`#WebDev` `#TypeScript` `#NextJS` `#DeveloperTools` `#OpenSource`

### AI/ML audience:
`#AI` `#LLM` `#Claude` `#ModelContextProtocol` `#GenerativeAI`

### Design audience:
`#DesignTools` `#UX` `#Sketching` `#FloorPlan` `#Architecture`

### Growth/SaaS:
`#IndieHacker` `#SaaS` `#ProductHunt` `#MakerCommunity`

### Hot in 2026 (use selectively):
`#AgentNative` `#AIFirst` `#VibeDesign` `#JSONFirst`

---

## Posting Schedule

| Time (CET) | Platform | Content | Priority |
|------------|----------|---------|----------|
| 07:00 | Twitter/X | Tweet 1 (launch announcement) | 🔴 Critical |
| 07:15 | LinkedIn | LinkedIn post | 🔴 Critical |
| 07:30 | Mastodon + Bluesky | Cross-platform post | 🟡 High |
| 09:00 | Product Hunt | Listing goes live | 🔴 Critical |
| 09:15 | Twitter/X | "We're live on @ProductHunt" + link | 🔴 Critical |
| 10:00 | Hacker News | Show HN submission | 🔴 Critical |
| 10:05 | Hacker News | First comment (technical context) | 🔴 Critical |
| 11:00 | Reddit | r/SideProject | 🔴 Critical |
| 14:00 | Twitter/X | Tweet 2 (AI agent angle) | 🟡 High |
| 14:30 | Twitter/X | Tweet 3 (technical thread) | 🟡 High |
| 15:00 | Reddit | r/webdev | 🟡 High |
| 17:00 | Twitter/X | Tweet 4 (comparison) | 🟡 High |
| 17:00 | Reddit | r/artificial | 🟡 High |
| 18:00 | Reddit | r/mcp | 🟡 High |
| 18:30 | Reddit | r/LocalLLaMA | 🟢 Medium |
| 20:00 | Discord servers | Community posts | 🟢 Medium |
| 23:00 | Twitter/X | Tweet 5 (day 1 results) | 🔴 Critical |
| Day 2 | Dev.to | Blog post: "I Built a Sketch Tool for AI Agents" | 🟡 High |
| Day 2 | Reddit | r/selfhosted | 🟢 Medium |
| Day 3 | Hashnode | Cross-post Dev.to article | 🟢 Medium |
| Day 4 | Indie Hackers | Post with honest metrics | 🟡 High |

---

## Response Templates

### When someone asks "Why not just use Excalidraw?":
```
Great question! Excalidraw is for humans to draw — it requires mouse input. Skissify is for code and AI agents to generate — JSON is the input. Neither replaces the other; they're for different moments in the workflow.
```

### When someone asks "Is the MCP server stable?":
```
It's in early release — works reliably with Claude Desktop in testing. I'd call it v0.9: functional but expect rough edges. Open an issue on GitHub and I'll fix bugs quickly.
```

### When someone asks "When is X feature coming?":
```
Good timing to ask — I'm prioritizing the roadmap based on launch feedback. [Feature] is on the list. What's your use case? That helps me prioritize.
```

### When someone criticizes (HN-style):
```
That's fair feedback. [Specific acknowledgment of their point]. What would you do differently? I'd genuinely like to understand the better approach.
```
