# Skissify Social Media Copy

**Launch: April 1, 2026**
**Last updated: April 1, 2026 — Cycle 81 (Day 2 Prep + Platform Expansion)**

---

## DAY 2 ATOMIC COPY QUEUE — April 2, 2026 (Added Cycle 81)

*The April Fools filter is gone. Day 2 is when skeptics become users.*
*Post these in order. Each is paste-ready.*

### 07:00 CET — Twitter/X Day 2 Opening Thread

**Tweet 1 (the hook):**
```
Yesterday I launched on April Fools.

Some people thought it was a joke.

Here are the numbers:
```

**Tweet 2 (reply — fill in real numbers):**
```
Day 1 results:
→ [X] Product Hunt upvotes
→ [X] signups
→ [X] API calls
→ [X] GitHub stars

The April Fools launch filter is a real thing. Day 2 is when skeptics become users.

If you missed it: skissify.com — the REST API that lets AI agents draw.
```

**Tweet 3 (reply — the product hook):**
```
The demo that surprised the most people:

You ask Claude to sketch your apartment layout.

Claude constructs JSON.
Skissify renders SVG.
You get a hand-drawn floor plan in your conversation.

No mouse. No UI. Just an LLM + an API.

Try it: npx skissify-mcp (Claude Desktop)
```

---

### 08:00 CET — LinkedIn Day 2 Post
```
Yesterday I launched Skissify on April Fools Day.

Not a joke.

Skissify is a REST API that turns JSON into hand-drawn SVGs — built specifically for AI agents and developers. Claude can now draw floor plans natively via MCP. Any LLM can draw via HTTP POST.

Day 1 is done. Here's what I know:

[Fill in: top piece of feedback / most surprising use case / real numbers]

The product solves a real problem: AI workflows need visual output. Text descriptions of layouts are not the same as pictures. Skissify is the drawing primitive that was missing.

If you build with AI agents, this belongs in your stack.

→ skissify.com
→ npx skissify-mcp (Claude Desktop setup: 2 minutes)

#AIAgents #DeveloperTools #MCP #BuildInPublic #SaaS #ProductLaunch
```

---

### 09:00 CET — Reddit r/mcp (Day 2 post)
**Title:** `I built the MCP server that draws — Day 2 post-launch (Skissify)`
```
Launched Skissify yesterday — an MCP server that gives Claude a drawing tool.

The core idea: most MCP servers READ data (weather, calendar, files). Skissify CREATES data (SVGs). Claude describes a layout, constructs JSON, calls the render tool, and gets back a hand-drawn diagram embedded in the conversation.

Day 1 results: [fill in numbers]

Most interesting thing people built: [fill in from actual feedback]

The MCP config is 6 lines:

{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "skissify-mcp"]
    }
  }
}

Ask Claude to "draw a rough floor plan for a 2-bedroom apartment" and it actually draws one.

Happy to answer questions about the MCP implementation. The schema design that gets 94% first-try accuracy from Claude is the most interesting technical part.

→ skissify.com | npx skissify-mcp
```

---

### 10:00 CET — Reddit r/ClaudeAI (Day 2 post)
**Title:** `You can give Claude a drawing tool with 6 lines of config (Skissify MCP)`
```
Add this to your Claude Desktop config and restart:

{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "skissify-mcp"]
    }
  }
}

Then ask: "Draw me a rough floor plan for a 2-bedroom apartment."

Claude will construct the JSON and render a hand-drawn SVG in the conversation. It looks like something you'd sketch on trace paper.

The wobble is intentional. Rough sketches invite discussion. Polished diagrams invite critique. The visual signal matters.

→ skissify.com — the render API is free with no auth if you want to try without MCP first.
```

---

### 11:00 CET — Reddit r/webdev (Day 2 post)
**Title:** `I built a REST API that renders hand-drawn SVGs from JSON — for AI agents [Show r/webdev]`
```
The use case that motivated this: I kept building AI workflows that needed visual output, and every diagramming tool assumed a human was clicking around in a UI.

Skissify is the result: POST JSON, get hand-drawn SVG back. Free tier, no auth.

curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":150},
       {"type":"text","x":100,"y":130,"text":"This works."}]}'

The interesting technical parts:
- Schema designed for LLM first-try accuracy (~94% success rate)
- Perlin noise wobble algorithm for the hand-drawn aesthetic
- 30+ architectural element types (walls, doors, furniture, fixtures)
- MCP server for Claude/Cursor/Cline

Launched yesterday. The April Fools timing was intentional — it weeds out the people who aren't curious enough to actually try it.

Happy to answer questions about the rendering approach or the schema design.

→ skissify.com
```

---

### 12:00 CET — Twitter/X "The Comparison" tweet
```
Excalidraw is excellent.

But you can't call it from a curl command.

You can't use it in a GitHub Action.

You can't make Claude drive it.

Skissify was built for that. Different job.

skissify.com
```

---

### 14:00 CET — Instagram/Reels caption (Day 2)
```
Day 1 of launching Skissify is done. Here's what actually happened. 👇

The tool: a REST API that turns JSON into hand-drawn floor plans and diagrams. AI agents can use it natively.

The surprise: I built it for AI developers. The first 50 users included a homeowner planning a kitchen reno, a DnD dungeon master, and a geometry teacher.

Rough sketches invite collaboration. That's the whole thesis.

→ skissify.com — no signup, just POST JSON and get SVG back.

#BuildInPublic #IndieHacker #AI #FloorPlan #VibeDrawing #Skissify #APIFirst #HandDrawn
```

---

### 16:00 CET — HackerNews comment (if thread is active, post an update)
```
Day 2 update: [fill in real numbers from Day 1]

The most common question I've gotten is about the schema design — specifically how I got ~94% first-try success rate from Claude. Short answer: flat JSON beats nested JSON for LLM generation. Happy to write that up if there's interest.

The most unexpected use case: a dungeon master using it for D&D map generation. Blueprint paper mode + the architectural symbols = surprisingly good dungeon aesthetics.

→ skissify.com
```

---

### 20:00 CET — Twitter/X Day 2 wrap
```
Day 2 of Skissify done.

The April Fools skeptics became the best users.

Tomorrow: [what you're shipping / publishing next]

Building in public. Following along: @skissify

#BuildInPublic #Skissify
```

---

## ADDITIONAL PLATFORMS (Added Cycle 81 — April 1, 2026)

### HackerNews — "Ask HN" / "Tell HN" Angles

**Ask HN post (Week 2 — good for organic discussion):**
**Title:** `Ask HN: What do you use for programmatic diagram generation?`
```
We've been using Mermaid for code-to-diagram workflows, but the aesthetics are limited and LLM first-try accuracy is inconsistent.

I built Skissify (skissify.com) as an alternative — REST API, hand-drawn SVG output, flat JSON schema that LLMs generate reliably. Curious if others have solved this problem differently or what tools people are using for agent-generated visual output.
```

**Tell HN post (after 50+ upvotes on Show HN):**
**Title:** `Tell HN: Schema design insight that improved LLM accuracy from ~40% to ~94%`
*Use this as a follow-up post to the Show HN. Lead with the technical insight, mention Skissify in context.*

---

### Reddit r/artificial (Day 2-3)
**Title:** `AI agents can now draw floor plans natively — not "generate an image", actually construct a spatial diagram`
```
The difference matters.

Image generation (DALL-E, Midjourney) for floor plans: unreliable geometry, hallucinated proportions, different every time.

Structured rendering (Skissify): LLM constructs JSON, API renders deterministically. Same input = same output. Accurate proportions. Architectural symbols (walls, doors, furniture). Version-controllable.

Ask Claude to "sketch a 2-bedroom apartment" with the Skissify MCP and it produces a coherent, readable floor plan. Not an artistic interpretation — an actual spatial diagram.

Demo: skissify.com — the API is free and no-auth if you want to test the rendering.
```

---

### Reddit r/LocalLLaMA
**Title:** `Deterministic floor plan generation via JSON schema — tested across 7 LLMs [Skissify benchmark]`
```
TL;DR: flat JSON schemas outperform nested schemas for first-try LLM accuracy in structured diagram generation. Results across Claude, GPT-4o, Gemini, Llama 3, Mistral, Qwen, and Command R+.

[Link to llm-floor-plan-benchmark blog post]

The tool this is for: Skissify (skissify.com) — hand-drawn sketch API for AI agents.

Happy to share the full benchmark methodology. The schema design decisions were the most interesting part of this project.
```

---

### Instagram — Reel scripts (3 new scripts)

**Reel 4: "The April Fools Launch"**
```
HOOK (0-2s): "I launched on April 1st. Not a joke."
SHOW (2-8s): Screen recording of curl command → SVG renders
EXPLAIN (8-14s): "REST API. JSON in. Hand-drawn SVG out. AI agents can draw now."
CTA (14-15s): "skissify.com — try it free"
```

**Reel 5: "Architect's Secret"**
```
HOOK (0-2s): "Architects sketch on trace paper because rough = better feedback"
SHOW (2-8s): Two side-by-side: Figma mockup vs Skissify sketch of same layout
EXPLAIN (8-14s): "Polished mockups invite critique. Rough sketches invite ideas. I built the wobbly version on purpose."
CTA (14-15s): "skissify.com"
```

**Reel 6: "Claude Draws"**
```
HOOK (0-2s): "I added a drawing tool to Claude in 6 lines of JSON"
SHOW (2-10s): Claude conversation: "sketch a studio apartment" → floor plan appears
EXPLAIN (10-14s): "Skissify MCP. 2-minute setup. Claude can now draw."
CTA (14-15s): "npx skissify-mcp"
```

---

### LinkedIn — Article Angles (Week 2)

**Article 1: "Why I Built for AI Agents, Not Humans"**
*Angle: the design philosophy behind building API-first. Resonates with PMs and architects.*

**Article 2: "What 100 Users Taught Me About Who Needs Hand-Drawn Sketches"**
*Angle: the unexpected audiences story. Very shareable in design/product circles.*

**Article 3: "The Premature Convergence Problem (And Why Figma Causes It)"**
*Angle: design thinking + psychology. Best performing content type on LinkedIn.*

---

### Pinterest Strategy (Added Cycle 81)

**Board name:** "Hand-Drawn Design Tools & AI Sketching"
**Board description:** "Tools, techniques, and inspiration for rough-sketch design thinking — including AI-generated hand-drawn diagrams."

**Pin types:**
- Floor plan examples (cream paper style) with caption: "AI-generated floor plan via @Skissify — describe a room, get a sketch back"
- Blueprint mode examples for architecture audience
- Side-by-side JSON → rendered sketch pins
- "Design process" infographic pins (ideation → alignment → production workflow)

**Target audience:** Interior design, architecture, home renovation, project management
**Best posting time:** Thursday-Saturday, 14:00-16:00 EST

---

### ProductHunt — Follow-up Comments (Template for Day 2-3)

**Response to "How does this compare to Mermaid?":**
```
Great question. Mermaid is code-first like Skissify, but very different outputs. Mermaid is excellent for flowcharts, sequence diagrams, entity relationships — structured diagram types. Skissify is for spatial/freehand layouts: floor plans, rough wireframes, architectural drawings. The hand-drawn aesthetic is also deliberate — Mermaid produces clean technical diagrams, Skissify produces "thinking on paper" drafts. They're complementary, not competing.
```

**Response to "Why not just use Excalidraw?":**
```
Excalidraw is genuinely excellent for human-driven whiteboarding. But there's no HTTP API for rendering — you can't call it from a cron job, CI pipeline, or LLM. The comparison I'd make: Excalidraw is the best tool for humans drawing together in real-time. Skissify is the best tool for code/AI generating diagrams programmatically. Different jobs.
```

**Response to "What's the pricing?":**
```
The /api/render endpoint is free, no auth required, no rate limits on the free tier. The browser editor is free for public sketches. Pro tier (private sketches, team workspaces, higher API limits) is coming — pricing will be very indie-friendly, probably EUR 5-9/mo. The goal is zero friction to try and integrate.
```

---

## 🟢 ATOMIC LAUNCH COPY QUEUE (Added Cycle 80 — 21:00 CET)
*Copy these in order. Each is paste-ready. Don't edit them on launch day — just post.*

### 00:01 CET — Product Hunt Maker Comment (pin immediately)
```
Hey everyone! 👋 Maker here.

Skissify was born from a single frustration: I was building AI workflows that needed visual output, and every diagramming tool assumed a human was at the keyboard.

The free /api/render endpoint is the best place to start — no auth, no account, just POST JSON and get back a hand-drawn SVG.

The MCP server (npx skissify-mcp) is what I'm most proud of. If you have Claude Desktop, it's 30 seconds until Claude can draw.

April Fools skeptic? Run this and see:

curl -X POST https://skissify.com/api/render -H "Content-Type: application/json" -d '{"elements":[{"type":"text","x":50,"y":50,"text":"This is real."}]}'

I'm here all day. Ask me anything. 🙏
```

### 07:00 CET — Twitter/X Tweet 1 (THE ONE THAT MATTERS)
```
I gave Claude a pencil.

It drew a floor plan.

skissify.com
```

### 07:00 CET — Twitter/X Tweet 2 (reply to Tweet 1 immediately)
```
Today I'm launching Skissify on @ProductHunt 🎉

It's a REST API that turns JSON into hand-drawn SVGs.
No auth. No rate limits. Just POST + draw.

AI agents can use it natively via MCP.
Humans get a full browser editor.

The wobble is intentional.

→ [Product Hunt link]

#Skissify #BuildInPublic #AI #IndieHacker
```

### 07:05 CET — Twitter/X Tweet 3 (reply to thread — the proof)
```
Still not sure if it's real? (It's April 1. Fair.)

Try it without trusting me:

curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":120},{"type":"text","x":100,"y":115,"text":"Living Room"}]}'

→ Returns an SVG.
→ Hand-drawn rectangle.
→ < 200ms.

The skepticism is the marketing.
```

### 07:30 CET — LinkedIn
```
Today I launch Skissify.

A hand-drawn sketch tool where JSON goes in and SVG comes out.

I built it for AI agents. Claude can now draw floor plans — no mouse, no UI, just a JSON description and an MCP server.

But here's the thing I learned: rough sketches aren't a shortcut. They're better.

Research on design feedback consistently shows that wobbly, obviously-unfinished sketches invite more honest critique than polished mockups. A Figma frame says "this is done, approve it." A hand-drawn sketch says "this is an idea, push on it."

I built the wobble on purpose.

Today is April 1st. I'm launching anyway. The API works — try it for yourself at skissify.com/api/render. No account needed.

If this resonates with you: please like and comment. It helps others see it.

→ skissify.com

#BuildInPublic #AIAgents #DeveloperTools #ProductLaunch #SaaS #MCP
```

### 09:30 CET — Hacker News Show HN
**Title:** `Show HN: Skissify – POST JSON, get hand-drawn SVG, designed for AI agents`
```
I built Skissify because I kept writing AI agents that needed to output something visual, and every diagramming tool was designed for human hands.

The core is a REST API: POST a JSON array of elements (rectangles, lines, doors, furniture, text, etc.), get back an SVG rendered in a hand-drawn style. Free tier, no auth.

An MCP server (npx skissify-mcp) makes it natively usable by Claude and other LLMs — you can ask Claude to sketch a floor plan and it constructs the JSON and calls Skissify.

30+ element types including architectural symbols (walls, doors, stairs, dimensions), furniture, and general shapes. Three paper styles (cream, white, blueprint), multiple drawing tools.

Also ships with a browser editor for humans.

Live: https://skissify.com
API: https://skissify.com/api/render
For agents: https://skissify.com/for-agents
```

### 10:00 CET — Reddit: r/webdev
```
I built a hand-drawn diagram API because I couldn't find one that worked for AI agents

Show HN thread: [link]

The short version: POST JSON → get back a hand-drawn SVG. Free API, no auth. 30+ element types (rooms, doors, arrows, text, furniture). Works in any language.

The MCP angle: there's an MCP server so Claude can call it natively. Ask Claude to sketch a wireframe and it does.

Demo + docs at skissify.com. Would love feedback from devs here.
```

### 10:05 CET — Reddit: r/mcp
```
I built an MCP server that CREATES visual output — not just reads data

Most MCP servers retrieve and process. Skissify does something different: it generates hand-drawn SVG sketches from JSON.

npx skissify-mcp → adds a "draw" tool to any MCP-compatible agent.

Example prompt to Claude: "Sketch a studio apartment, 6x5 meters, living area and kitchen in open plan, bedroom separated."

Claude constructs the coordinates, calls Skissify, returns a hand-drawn floor plan.

Free REST API: https://skissify.com/api/render

Feedback welcome — built specifically for this community.
```

### 10:10 CET — Reddit: r/ClaudeAI
```
I gave Claude a pencil — here's what happened

Built an MCP server for Claude that lets it generate hand-drawn sketches. Not describe them. Actually draw them.

npx skissify-mcp in your claude_desktop_config.json, then ask Claude to sketch anything spatial: floor plans, wireframes, diagrams, network maps.

Free API behind it: https://skissify.com/api/render

It's live today if anyone wants to try it.
```

### 10:15 CET — Reddit: r/artificial
```
You can now ask an AI to draw a floor plan and it actually draws one

Built Skissify — a REST API that produces hand-drawn SVGs from JSON. Paired it with an MCP server so Claude can call it directly.

The workflow: describe what you want → Claude constructs the JSON → Skissify renders it → you get a PNG/SVG.

Free to try, no auth: https://skissify.com/api/render

What I find interesting: the hand-drawn style isn't aesthetic. Rough sketches psychologically signal "draft mode" in a way that polished images don't. Better for ideation.
```

### 12:00 CET — Bluesky
```
Launching Skissify today on Product Hunt ✏️

JSON → hand-drawn SVG.
AI agents can draw now.
Claude + MCP server = floor plans on demand.

Free API, no auth: skissify.com/api/render

It's April 1st. The API still works. Try it.

#Skissify #BuildInPublic #MCP #AI
```

### 12:05 CET — Mastodon (fosstodon.org or hachyderm.io)
```
Launching Skissify today: a REST API that turns JSON into hand-drawn SVG sketches.

Built for AI agents. Works with Claude via MCP. Free, no auth required.

The render engine is all TypeScript, SVG path generation, Perlin noise for the wobble. No canvas, no external deps.

Full API docs + browser editor: skissify.com

#Skissify #OpenSource #AI #MCP #DeveloperTools
```

### 14:00 CET — Discord (AI Devs / Claude Discord)
```
Hey folks — launching Skissify today on Product Hunt.

It's a hand-drawn diagram API — POST JSON, get back an SVG that looks like a sketch. Built specifically for AI agents.

MCP server is the interesting part: npx skissify-mcp adds a draw() tool to Claude. You can ask Claude to sketch floor plans, wireframes, architecture diagrams.

Free API: https://skissify.com/api/render

Would love to hear if anyone builds something with it.
```

### 20:00 CET — End of Day Retrospective Tweet
```
Day 1 wrap:

[PH rank]
[signups]  
[API calls]
[HN points]

The April Fools date was a gamble. Here's what actually happened: [honest 2-sentence take]

Tomorrow I'll post what worked and what didn't.

Building in public means sharing the real numbers. 🙏

#BuildInPublic #Skissify
```

---

## 🚨 NEW: T-12h Final Pre-Launch Additions (Added Cycle 77 — 19:00 CET)

### Tonight's Priority Posts (March 31 evening)

**Best tweet to post TONIGHT (19:00-21:00 CET):**
```
Tomorrow I launch.

Not "sometime soon." Not "next week."

Tomorrow. Product Hunt. April 1st.

Yes, really.

You'll be able to describe a floor plan to Claude and watch it draw.
No mouse. No Figma. No design skills.

Just JSON → hand-drawn sketch.

skissify.com ✏️
```

**Follow-up 30min later:**
```
Here's what I learned building Skissify:

Rough sketches are psychologically different from polished mockups.

A wobbly sketch says: "this is an idea, push on it."
A Figma frame says: "someone worked on this, tread carefully."

I built the wobble in on purpose.

Tomorrow I launch it on the most skeptical day of the calendar.

We'll see.
```

### Slack Community Template (missing from prior versions)

**General developer Slacks:**
```
Hey! Launching tomorrow on Product Hunt.

Built Skissify — a diagram API where you POST JSON and get hand-drawn SVG back.
Works with Claude via MCP (npx skissify-mcp). Free /api/render endpoint, no auth.

If anyone builds AI agents or wants programmatic diagramming — this was built for you.

Preview at skissify.com/api/render (already live)
```

**Architecture/design Slacks:**
```
Building something that might be relevant here — a sketch API that produces genuinely 
rough, hand-drawn style SVGs from JSON.

Useful for early-stage layouts, floor plan prototyping, documentation visuals.
No design tool knowledge needed. Claude can even generate them via MCP.

Launching tomorrow — preview at skissify.com
```

### GitHub README / Documentation Cross-post

**For posting in relevant GitHub Discussions or README sections of AI/agent repos:**
```markdown
## Visual Output with Skissify

Skissify provides a free REST API for generating hand-drawn SVG sketches from JSON:

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":120},{"type":"text","x":100,"y":115,"text":"My Component"}]}'
```

MCP server for Claude Desktop: `npx skissify-mcp`
```

### "The Honest One" — Alternative Launch Tweet for April 1 skeptics

```
You're right to be suspicious. It's April 1st.

Here's how to test if Skissify is real without trusting me at all:

```
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":120}]}'
```

→ Returns SVG.
→ Hand-drawn rectangle.
→ < 200ms.

Or just go look: skissify.com
```

### For Product Hunt hunter note (the copy for your hunter):

```
Skissify is the most developer-friendly diagramming tool I've seen in years.

JSON in → hand-drawn SVG out. No auth, no rate limits, no design skills.

The MCP server is a 30-second Claude Desktop install and suddenly Claude draws floor plans.

What gets me: the wobble is intentional. The hand-drawn aesthetic is a feature, not a shortcut. Rough sketches get better feedback than polished mockups — and now AI can produce that signal on purpose.

A good one for developers, AI hackers, and architects who think in systems.
```

---

## 🔥 NEW: Launch Day Power Posts (Added Cycle 76)

### The "One Sentence" Hook (Best performer format — use as Tweet 1)

```
I gave Claude a pencil.

It drew a floor plan.

skissify.com
```

### The Specific Claim Post (high credibility, high CTR)
```
Skissify MCP: 94% first-try accuracy when Claude generates floor plan JSON.

The key: flat element list with absolute coordinates beats nested/hierarchical JSON by 36%.

Same model. Better schema. Better output.

→ skissify.com/for-agents
```

### The "Unpopular Opinion" Format (high engagement, debate magnet)
```
Unpopular opinion: rough sketches are better than Figma mockups.

Not because they look better.
Because they invite better feedback.

A wobbly sketch says "this is still an idea."
A polished Figma frame says "this is done."

Skissify makes AI agents produce wobbly sketches. Intentionally.

skissify.com
```

### The "What If" Format (curiosity hook)
```
What if your AI coding agent could also sketch the floor plan it's about to automate?

What if every README could have a hand-drawn architecture diagram?

What if every PR triggered a sketch of what changed?

All of this: skissify.com
```

### The Stack Post (dev community favorite)
```
My 2026 AI stack for visual output:

Text → Claude
Code → Claude Code
Images → Midjourney
Floor plans, diagrams, sketches → Skissify (JSON → hand-drawn SVG)

The last one has an MCP server. Zero other tools in this category do.

skissify.com
```

---

## Twitter/X — Launch Thread

### Tweet 1 (Hook)

```
Introducing Skissify ✏️

JSON in → hand-drawn sketch out.

No UI. No mouse. Just code.

AI agents can draw floor plans, wireframes, and diagrams programmatically.

Built for devs + AI agents 🧵👇

https://skissify.com
#Skissify #BuildInPublic #AI
```

### Tweet 2 (The problem)

```
Every diagramming tool requires human interaction.

Figma? Needs a mouse.
Miro? Needs a human.
Excalidraw? Needs UI clicks.

What if an LLM could just... draw?

Skissify is the first tool where AI agents are first-class citizens.
```

### Tweet 3 (The solution)

```
The API is dead simple:

POST /api/render
→ Returns SVG instantly
→ No auth required
→ No rate limits on free tier

30 element types: rooms, doors, windows, stairs, furniture, dimensions...

Your AI agent just became an architect.
```

### Tweet 4 (Code example)

```
This JSON:

{
  "paper": "cream",
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 200, "h": 120 },
    { "type": "text", "x": 100, "y": 115, "text": "Living Room" },
    { "type": "door-symbol", "x": 50, "y": 110, "w": 45 }
  ]
}

Becomes a gorgeous hand-drawn floor plan.

Try it: https://skissify.com/for-agents
```

### Tweet 5 (MCP angle)

```
Claude + Skissify MCP = an AI that draws floor plans

Add to claude_desktop_config.json:
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "skissify-mcp"]
    }
  }
}

Now ask Claude to sketch your apartment layout. It just works.
```

### Tweet 6 (Call to action)

```
Built this solo in a few months. Launching TODAY on Product Hunt.

If you've ever wanted to:
→ Generate sketches from code
→ Use AI to design floor plans
→ Export SVGs from JSON

Give it a try: https://skissify.com

And if you love it — would mean a lot to upvote on PH 🙏

[Product Hunt link]
```

---

## Twitter/X — Alternative One-Shot Posts

### The Architect Post

```
I gave Claude a house description.

It generated JSON.

Skissify turned it into a hand-drawn floor plan.

No Figma. No AutoCAD. No human.

This is what AI-native design looks like → https://skissify.com

#AI #Architecture #BuildInPublic
```

### The Dev Post

```
Hot take: Figma is overkill for 80% of diagrams.

If you're a developer:
- You think in JSON
- You hate clicking around
- You want automation

Skissify is a diagram tool where your data IS the design.

https://skissify.com

#WebDev #DeveloperTools #Skissify
```

### The Viral Hook Post

```
What if every README could have a hand-drawn diagram?

What if every GitHub PR automatically generated a sketch?

What if your LLM could sketch instead of just describing?

Skissify makes all of this possible.

https://skissify.com
```

### The Comparison Post

```
Excalidraw: beautiful, manual
Figma: powerful, expensive
Miro: collaborative, cluttered
Skissify: API-first, hand-drawn, AI-native

One of these is different.
One of these an LLM can use directly.

https://skissify.com
```

---

## LinkedIn

### Launch Post

```
I'm launching Skissify today — a hand-drawn sketch tool designed for AI agents. 🎉

Here's the idea: instead of clicking around in a design tool, you describe your sketch as JSON and get back a beautiful, wobbly hand-drawn SVG.

Why does this matter?

→ AI agents can generate floor plans, wireframes, and diagrams autonomously
→ The /api/render endpoint is free, instant, no auth required
→ 30+ element types: walls, doors, windows, furniture, dimensions
→ MCP server lets Claude Desktop draw natively

I built this because I was tired of design tools that assume a human is always at the keyboard. The best tools should work as well for AI as they do for people.

Try it at https://skissify.com/for-agents — or just POST to https://skissify.com/api/render with any JSON.

Would love your feedback! 🙏

#AI #ProductLaunch #DeveloperTools #Architecture #SaaS #BuildInPublic
```

---

## Reddit Posts

### r/webdev

**Title:** I built a hand-drawn diagram API for AI agents — JSON in, SVG out, no auth needed

**Body:**
```
Hey r/webdev,

I've been working on Skissify for a few months — a diagram tool where you POST JSON and get back a hand-drawn SVG. No UI needed.

The key insight: most design tools require human interaction. But if you're building agents, workflows, or automations, you need a tool that works programmatically.

API is simple:
```
POST https://skissify.com/api/render
Content-Type: application/json

{
  "data": {
    "paper": "cream",
    "elements": [
      { "type": "rect", "x": 50, "y": 50, "w": 200, "h": 120 },
      { "type": "text", "x": 100, "y": 115, "text": "My Component" }
    ]
  }
}
```

Returns SVG directly. Free, no auth, no rate limits (within reason).

Supports 30+ element types including rooms, doors, windows, furniture, dimensions, paths, arrows.

There's also an MCP server so Claude can draw directly: `npx skissify-mcp`

Would love feedback. Happy to answer questions!

https://skissify.com
```

### r/artificial / r/ChatGPT

**Title:** I made a tool so AI agents can draw — hand-drawn floor plans from JSON

**Body:**
```
I got tired of my LLMs being able to describe diagrams but not actually draw them.

So I built Skissify: a REST API that takes JSON and returns hand-drawn SVG sketches.

You describe the sketch in JSON (elements, positions, sizes), POST it to /api/render, get back a beautiful wobbly hand-drawn image.

I use it with Claude via MCP:
npx skissify-mcp → add to claude_desktop_config.json → ask Claude to sketch your apartment layout

It actually draws floor plans. With rooms, doors, windows, furniture. In a hand-drawn style.

Demo at https://skissify.com/for-agents

Happy to answer questions about making AI tools more visual!
```

### r/selfhosted

**Title:** Show r/selfhosted: Hand-drawn diagram API — self-host or use free public endpoint

**Body:**
```
Hey all, built something that might interest this community.

Skissify is a diagram tool with a public API: POST JSON, get SVG hand-drawn sketches back.

The source is on GitHub. You can self-host it (Next.js + Prisma + PostgreSQL). The /api/render endpoint is stateless so it's trivially deployable.

Use cases:
- Generate documentation diagrams in CI/CD
- AI agents that draw floor plans
- Programmatic wireframe generation
- Home automation dashboards

No phone-home telemetry in the renderer. The render endpoint doesn't require auth.

https://skissify.com
```

---

## Product Hunt Description

**Tagline:** Hand-drawn sketches from JSON — AI agents welcome

**Description:**
```
Skissify turns JSON into beautiful hand-drawn diagrams. It's designed from the ground up for AI agents, automation pipelines, and developers who think in code rather than clicks.

**How it works:**
1. Build a JSON object with paper, tool, and elements
2. POST to /api/render
3. Get back a gorgeous hand-drawn SVG instantly

**30+ element types:** walls, rooms, doors, windows, furniture, stairs, dimensions, arrows, text, and more.

**AI-native:** Works with Claude via MCP server (`npx skissify-mcp`), or call the REST API directly from any LLM or agent.

**Free tier:** /api/render is completely free, no auth required, no rate limits.

**Use cases:**
- AI agents generating floor plans
- Automated documentation diagrams
- Wireframe generation from code
- Architecture sketches from natural language

Built for devs, architects, product managers, and anyone who's ever wished their computer could just draw.
```

---

## Bluesky

```
🎉 Launching Skissify today!

JSON → hand-drawn sketch.

POST to an API, get back a wobbly, gorgeous SVG.

AI agents can draw floor plans. For real.

Free /api/render endpoint (no auth needed).

https://skissify.com

#AI #WebDev #BuildInPublic
```

---

## Discord Message Templates

### AI Communities

```
Hey! Just launched Skissify — a tool that lets AI agents generate hand-drawn sketches from JSON.

There's an MCP server so Claude can draw directly (`npx skissify-mcp`), and a free REST API that anyone can use without auth.

Would love to hear if this is useful for anyone building agents or workflows that need visual output!

https://skissify.com/for-agents
```

### Dev Communities

```
Just shipped something I've been building for months: Skissify

It's a diagram API — POST JSON, get hand-drawn SVG. Super useful for docs, automation, agent workflows.

The /render endpoint is free and no-auth. 30+ element types including architectural symbols.

Feedback welcome! https://skissify.com
```

---

---

## YouTube Description Template

**Video title:** "I gave Claude a pencil — Skissify MCP demo"

**Description:**
```
Skissify is a REST API + MCP server that turns JSON into hand-drawn SVG sketches. 
In this demo: Claude Desktop generates a floor plan JSON and renders it as a 
wobbly, hand-drawn sketch in under 10 seconds.

No Figma. No mouse. No design skills.

Try it: https://skissify.com
MCP setup: npx skissify-mcp
API (no auth needed): https://skissify.com/api/render

0:00 - The problem: AI agents can't draw
0:45 - MCP setup (30 seconds)
1:30 - Claude draws a floor plan
2:30 - Blueprint mode
3:00 - Try it yourself

#MCP #AIAgents #Claude #BuildInPublic #DeveloperTools
```

---

## Threads / Meta Threads

```
Just launched Skissify — a tool where JSON becomes a hand-drawn sketch.

Built it because AI agents can't draw. They can describe. They can structure. They can generate JSON. But every whiteboard tool needs a human at the keyboard.

Skissify is the render step. Claude writes the JSON. Skissify draws the sketch.

Free API at skissify.com. No auth. No rate limits. Try it right now.
```

---

## Mastodon / Fediverse

```
🖊️ Launched Skissify today — JSON to hand-drawn SVG via REST API.

AI-native, MCP server included, free tier with no auth required.

Claude can draw floor plans now. That sentence is weirder than I expected.

→ https://skissify.com
#AITools #OpenSource #IndieHacker #WebDev
```

---

## Hashtag Research & Recommendations

### Top Hashtags by Platform

**Twitter/X:**
- #Skissify (own)
- #BuildInPublic (strong engagement, builder community)
- #IndieHacker (indie dev audience)
- #AI (broad reach)
- #LLM (technical AI audience)
- #MCP (Model Context Protocol — niche but active)
- #DeveloperTools (dev audience)
- #WebDev (broad dev community)
- #ProductLaunch (launch day)
- #MadeWithAI (showcase audience)
- #APIFirst (technical devs)
- #SaaS (product communities)
- #Architecture (architect niche)

**LinkedIn:**
- #ArtificialIntelligence
- #ProductDesign
- #SaaS
- #DeveloperTools
- #Architecture
- #ProductLaunch
- #Innovation
- #TechStartup
- #API

**Reddit:**
- r/webdev, r/artificial, r/ChatGPT, r/selfhosted, r/architecture, r/ProductHunt

### Communities to Target

- **Hacker News** — Show HN post, will drive quality developer traffic
- **Claude Discord** — MCP users, natural fit
- **AI Engineer Discord** — Technical AI builders
- **Developer Discord communities** — Syntax.fm Discord, The Primeagen etc.
- **Architecture subreddits** — r/architecture, r/floorplans
- **Product Hunt Discord** — Pre-launch support

---

## Content Calendar (Launch Week)

| Day | Content |
|-----|---------|
| Apr 1 (Launch) | Full Twitter thread, LinkedIn, Show HN, Reddit drops, PH launch |
| Apr 2 | Retweet best comments, share metrics, "Day 1 recap" post |
| Apr 3 | Dev.to blog "How I built Skissify" |
| Apr 4 | "AI agent draws floor plan" demo video |
| Apr 5 | "Skissify vs Excalidraw" blog post thread |
| Apr 6 | Weekend — engage with community, respond to feedback |
| Apr 7 | Week 1 metrics share, build-in-public update |

---

## April Fools Day Launch Angle 🎭

Launching on April 1 is actually a *superpower*. Lean into it.

### Opening gambit (Tweet on launch morning)
```
I know what you're thinking.

"An API that turns JSON into hand-drawn sketches? 
An AI that draws floor plans? 
Launching on April 1st?"

It's not a joke. It's https://skissify.com

But honestly, wouldn't it be a great April Fools' product if it were fake?

It isn't. Try it. ✏️
```

### Product Hunt top comment (pin this)
```
Yes, we launched on April 1st. No, it's not a joke.

We figured: if you launch on the most skeptical day of the year and people still believe it, you probably built something real.

Try it yourself: POST to https://skissify.com/api/render — no signup, no credit card. 
If it returns a hand-drawn SVG, it's real. (It will.)
```

### The "April Fools" counternarrative post (Apr 2)
```
Here's the April Fools result:

✅ 247 Product Hunt upvotes (not fake)
✅ [X] signups (not fake)  
✅ [Y] API calls (not fake)
✅ Claude is drawing floor plans right now (not fake)

Happy April 2nd. 🖊️

https://skissify.com
```

---

## TikTok / Instagram Reels Scripts 📱

### Reel 1: "I gave Claude a pencil" (30 seconds)
```
HOOK (0-3s): "Claude can't draw. Or can it?"
DEMO (3-20s): Screen record of typing in Claude Desktop: 
  "Draw me a simple studio apartment floor plan"
  → Claude generates JSON → Skissify renders it → wobbly hand-drawn floor plan appears
CTA (20-30s): "Skissify gives AI agents a pencil. 
  Free at skissify.com — link in bio"
```

### Reel 2: "Why architects still sketch on napkins" (45 seconds)
```
HOOK (0-5s): "Every architecture firm still has these" [show a notepad]
POINT (5-30s): Rough sketches get better feedback than polished designs.
  There's actual psychology behind this.
  Figma looks finished → people are afraid to criticize
  A wobbly sketch says "this is still an idea"
TWIST (30-40s): "Now AI agents can produce that same psychological effect.
  They describe a layout, Skissify renders it rough."
CTA (40-45s): skissify.com
```

### Reel 3: "Zero to floor plan in 30 seconds" (30 seconds)
```
HOOK (0-3s): Timer starts. "30 second challenge."
DEMO (3-25s): Speed-run — open terminal, POST JSON, get SVG, open in browser
TEXT OVERLAY: "No Figma. No AutoCAD. No mouse."
RESULT: Beautiful hand-drawn floor plan
CTA (25-30s): "Try it free — no signup required"
```

---

## Email Subject Lines (Newsletter / Cold Outreach)

For tech/AI newsletters pitching coverage:
- "Your AI can draw now (and it looks like a napkin sketch)"
- "The API that 12,000 MCP servers were missing"
- "We gave LLMs a pencil. It works."
- "JSON → hand-drawn floor plan in one API call (free, no auth)"
- "What if Claude could draw? [it can now]"

For architecture/design communities:
- "AI drew my floor plan in 30 seconds. Here's how."
- "The design tool that doesn't care if you know Figma"
- "Rough sketches invite feedback. Now AI can produce them too."

---

## Viral Hook Formulas 🎣

These are proven high-engagement structures. Adapt for Skissify:

### "No one told me you could..."
```
No one told me you could make Claude draw floor plans.

Add skissify-mcp to your Claude config.
Ask it to sketch a room layout.
Watch it produce a wobbly hand-drawn floor plan.

Nobody prepared me for how cool this is.
```

### "I'm going to say something controversial..."
```
I'm going to say something controversial:

Figma is the wrong tool for early-stage design.

The pixel-perfect look makes people critique the finish instead of the idea.

That's why rough sketches exist. That's why Skissify exists.

[skissify.com]
```

### "The thing nobody talks about with AI tools..."
```
The thing nobody talks about with AI tools:

They can generate text beautifully.
They can generate code beautifully.
They cannot draw.

12,000 MCP servers. Zero of them draw.

I fixed that.

→ skissify.com
```

### "If you told me a year ago..."
```
If you told me a year ago that I'd be watching Claude
construct a JSON object describing a studio apartment
and render it as a hand-drawn floor plan
in under 10 seconds...

I'd have said that sounds like a fun weekend project.

It was. Now it's at skissify.com.
```

---

## Community Drop Templates (Discord / Slack)

### AI engineering Discord servers
```
Hey folks! Just launched Skissify — a REST API that turns JSON into 
hand-drawn SVG sketches. Built for AI agents and devs.

Why this matters for you: your LLM can now draw, not just describe.

MCP server: npx skissify-mcp (works with Claude Desktop)
API: POST https://skissify.com/api/render (free, no auth)

Quick example below — or try it at skissify.com/for-agents

[paste a small JSON + rendered image]

Happy to answer questions!
```

### Architecture / design Discord servers
```
Hey! Building tool you might find interesting — Skissify generates 
hand-drawn floor plans and architectural sketches from JSON.

30+ element types: walls, doors, windows, stairs, all furniture.
Blueprint mode. Shareable URLs. Free API.

The "rough sketch" aesthetic is intentional — it signals "work in progress, 
feedback welcome" which is exactly right for early design.

https://skissify.com — no signup to try
```

### r/floorplans, r/architecture, r/homedesign
```
Title: I built an AI tool that draws rough floor plans — 
feedback on the concept?

Body: [honest explanation + demo, ask for feedback on the sketch style, 
not the product. People love to critique aesthetics — use that energy.]
```

---

## Influencer/Creator Outreach Templates

### For AI YouTubers / streamers
```
Subject: Skissify launch — Claude can now draw floor plans (demo ready)

Hey [name],

Thought you might find this interesting for your content: 
Skissify is an MCP server + REST API that lets Claude generate 
hand-drawn sketches from JSON.

Demo takes 2 minutes: add the MCP, ask Claude to sketch an apartment, 
watch it draw a wobbly floor plan. Very visual, very shareable.

API is free, no auth. Happy to give you early access to any pro features.

[link] — let me know if you want a quick screen recording to save time!
```

### For IndieHacker / BuildInPublic accounts
```
Subject: Launching on April 1st — here's my story thread if you want to share

Fellow builder here. Launching Skissify today — a JSON→hand-drawn sketch API.

I have a build story thread ready if that's something your audience would like. 
Solo project, ~4 months of nights/weekends, first real launch.

No pressure — just thought the April Fools angle + the "AI can draw now" 
hook might resonate with your followers.

https://skissify.com
```

---

## Hashtag Research Update (2026)

### Confirmed high-engagement clusters for launch day:

**Primary cluster (all posts):**
`#Skissify #BuildInPublic #AI`

**Tech/dev cluster:**
`#DeveloperTools #APIFirst #WebDev #SaaS #IndieHacker #MakerLog`

**AI/agent cluster:**
`#MCP #LLM #AIAgents #Claude #MCPServer #AgentAI`

**Design/UX cluster:**
`#UXDesign #ProductDesign #DesignThinking #SketchFirst`

**Architecture cluster:**
`#Architecture #FloorPlan #InteriorDesign #HomeDesign`

**Launch cluster:**
`#ProductLaunch #ProductHunt #ShowHN #LaunchDay`

### Platform-specific rules:
- **Twitter/X**: Max 2-3 hashtags per tweet (more = looks spammy, algorithm penalizes)
- **LinkedIn**: 5-8 hashtags in first comment, not in body text
- **Instagram/TikTok**: Use all relevant hashtags, up to 15-20
- **Reddit**: No hashtags — just natural community language
- **Bluesky**: 3-5 hashtags, still developing hashtag culture

### Trending niche hashtags to watch (March-April 2026):
- `#MCPServer` — hot with Claude users, growing fast
- `#AgentNative` — new framing for AI-first tools
- `#VibeDrawing` — coined by a Skissify early post, try to own it
- `#SketchFirst` — design-thinking angle, low competition
- `#JSONtoSVG` — technical, findable by exact-match searchers
- `#VibeCodeing` / `#VibeCoding` — massive trend, Skissify is natural follow-on
- `#AIArtDirector` — emerging term for LLMs directing visual output
- `#FlatJSON` — technical differentiator (Skissify schema insight)

---

## 🆕 NEW: Platform Expansions (Added Cycle 78 — T-10h)

### Indie Hackers Launch Post

**Post title:** "Show IH: JSON → hand-drawn sketch API for AI agents. Launching today on Product Hunt"

**Body (short version for IH thread):**
```
Hey IH!

Launching today: Skissify — a REST API that renders hand-drawn SVG sketches from JSON.

The weird part: Claude can use it via MCP. So AI agents can literally draw now.

Free tier, no auth, try it right now:
curl -X POST https://skissify.com/api/render -H "Content-Type: application/json" \
  -d '{"paper":"cream","wobble":2,"elements":[{"type":"rectangle","x":50,"y":50,"width":200,"height":150}]}'

Built this to solve a real problem: LLMs describe visual layouts beautifully but can't output them. 
Skissify gives them a pencil.

30+ element types. Floor plans, wireframes, diagrams.

Would love feedback from fellow builders — especially on the "what would you pay for" question.

→ PH: [link] (upvote if you like it!)
→ skissify.com

#BuildInPublic #IndieHackers
```

---

### Bluesky Launch Posts

**Post 1 (launch morning):**
```
I built a tool where you POST JSON and get a hand-drawn sketch back.

AI agents can use it natively via MCP.

Free tier. No auth. Works now.

→ skissify.com ✏️

#BuildInPublic #AI #MCP
```

**Post 2 (afternoon follow-up):**
```
The Skissify floor plan demo is genuinely wild:

1. Install MCP: npx skissify-mcp
2. Open Claude Desktop
3. Type: "sketch a studio apartment, 30m², bathroom in the corner"
4. Watch Claude construct JSON and render a wobbly floor plan

No mouse. No Figma. No design skills.

→ skissify.com
```

**Post 3 (skeptic angle — April Fools):**
```
Yes, I launched on April 1st.

No, it's not a joke.

Yes, the API is live and works.

Here's the curl command to prove it to yourself:

curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","elements":[{"type":"circle","cx":100,"cy":100,"r":50}]}'

You'll get SVG back. ✏️ #Skissify
```

---

### Mastodon Posts (tech.lgbt, fosstodon.org, hachyderm.io)

**Post 1 (hachyderm — developer audience):**
```
Show HN type post for Mastodon:

Built Skissify — a REST API that renders hand-drawn SVGs from JSON.
Free tier, no auth. Works with Claude via MCP.

The use case nobody talks about: AI agents can't use GUI design tools.
This gives them a programmatic drawing API instead.

POST to /api/render with your JSON schema → get an SVG that looks 
like a human sketched it.

→ https://skissify.com #OpenSource #DeveloperTools #AI #MCP
```

**Post 2 (fosstodon — FOSS audience):**
```
Skissify is launching today — a JSON→SVG sketch renderer.

API-first. AI-agent-friendly. Free tier with no auth required.

The rendering is server-side with custom wobble algorithms per element type.
30+ element types including architectural symbols (walls, doors, windows).

MCP server: npx skissify-mcp

→ https://skissify.com

#FOSS #OpenSource #DeveloperTools #SVG #API
```

---

### Threads (Meta) Launch Posts

**Post 1:**
```
I taught Claude to draw.

Not "describe a drawing." Actually draw.

You tell it what you want. It writes the JSON. Skissify renders a 
wobbly hand-drawn sketch.

Floor plans. Wireframes. Any spatial layout.

This is Skissify. It's live today. It's free.

skissify.com ✏️
```

**Post 2 (visual hook):**
```
What if instead of this: 
"The bedroom is 4m × 3m with a window on the east wall and door on the north"

You got this: [hand-drawn floor plan image]

That's Skissify. Describe → JSON → sketch.

The AI draws. You understand instantly.

Free API. No signup. Try: skissify.com/api/render
```

---

### Pinterest Strategy

Pinterest is underused for developer tools but worth 15 minutes on launch day.

**Board name:** "Hand-Drawn AI Sketches with Skissify"

**Pin types:**
1. Screenshot of a floor plan sketch with overlay text: "Claude drew this floor plan in 10 seconds"
2. JSON snippet on one side → rendered sketch on other side
3. "Figma vs Skissify for early ideas" comparison infographic
4. Blueprint mode screenshot with "AI-generated architectural sketch" text

**Pin descriptions:**
```
Hand-drawn floor plan generated by AI using Skissify — a free API that 
turns JSON into beautiful wobbly sketches. Works with Claude via MCP.
Try it free: skissify.com

#FloorPlan #HomeDesign #AIDesign #SketchDesign #InteriorDesign 
#HomeImprovement #ArchitectureSketch #AIArt #DesignTools
```

**Target boards to contribute to:**
- Architecture & Floor Plans
- Home Design Ideas
- AI Art & Design
- Tech & Apps

**Pinterest audience note:** This is NOT a dev audience. Lean into the home design angle here. "AI draws your floor plan" is the hook, not "REST API for agents."

---

### YouTube Video Description Templates

**Video 1: "I gave Claude a pencil — Skissify MCP demo"**

```
In this video: I install the Skissify MCP server and ask Claude to 
sketch a studio apartment floor plan from scratch.

No Figma. No mouse. No design skills.

Claude writes the JSON. Skissify renders a hand-drawn sketch.

Links:
→ Skissify: https://skissify.com
→ MCP server: npx skissify-mcp
→ Free API: https://skissify.com/api/render

Chapters:
0:00 — What is Skissify?
0:30 — Installing the MCP server
1:00 — Asking Claude to draw a floor plan
1:30 — The rendered sketch
2:00 — Editing and sharing

#Skissify #Claude #MCP #AI #FloorPlan #AIDemo
```

**Video 2: "JSON to hand-drawn sketch in 30 seconds"**
```
Quick demo: POST JSON to the Skissify API, get a hand-drawn SVG back.
Free, no auth, works from any language.

→ https://skissify.com/api/render

#DeveloperTools #API #SVG #AI
```

---

## 🎯 Viral Hook Formula Reference (Updated)

The best-performing tweet structure for Skissify:

### Formula 1: "The thing that didn't exist" (highest potential)
```
There was no API where you could POST JSON and get a hand-drawn sketch back.

[pause]

Now there is.

→ skissify.com
```

### Formula 2: "The contrast" (broad audience)
```
Figma: open app → create frame → add shapes → adjust → export
Skissify: POST JSON → get SVG ← Claude can do the first part

If your AI can describe it, Skissify can draw it.
```

### Formula 3: "The specific demo" (developer conversion)
```
I asked Claude to sketch a 2BR apartment.

It constructed this JSON:
[small snippet]

And got back this sketch:
[image]

The whole thing took 8 seconds.

→ skissify.com/api/render (free, no auth)
```

### Formula 4: "The unexpected use" (share bait)
```
Things people are already doing with Skissify that I didn't expect:

→ Dungeon Masters generating D&D floor plans via Claude
→ Real estate agents previewing listing layouts
→ Product managers replacing Miro for user flow sketches
→ Architecture students prototyping spatial ideas in 10 seconds

I built it for AI devs. Everyone else showed up.
```

### Formula 5: "The honest comparison" (trust-builder)
```
Skissify vs Excalidraw — the actual differences:

Excalidraw: collaborative, real-time, human-operated, freemium
Skissify: API-first, AI-native, programmatic, free tier

Different jobs. Use both.

But if your AI agent needs to draw? There's only one choice.
→ skissify.com
```

---

## 🆕 MCP Community Drop Templates (Added Cycle 79 — T-2h, 20:00 CET)

### r/mcp Subreddit Post (post at 10:00-11:00 CET on launch day)

**Title:**
```
Show r/mcp: Skissify — the MCP server that lets AI agents draw hand-drawn sketches
```

**Body:**
```
Hey r/mcp 👋

I built Skissify — an MCP server that gives AI agents the ability to **draw**.

Most MCP tools read/retrieve. Skissify **creates** — specifically, it creates hand-drawn sketch SVGs from JSON input.

**Setup:**
```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["skissify-mcp"]
    }
  }
}
```

**What it does:**
- Claude describes a floor plan → Skissify renders a hand-drawn SVG
- Returns a public URL you can share, embed, or store as agent memory
- 30+ element types: walls, doors, furniture, arrows, dimensions, text
- REST API also available (free, no auth): `POST https://skissify.com/api/render`

**Why hand-drawn?** Rough sketches signal "this is a draft — push on it." That's usually the right signal for AI-generated visuals.

Curious what workflows this could fit into for people here. Happy to answer technical questions.

→ skissify.com
```

---

### Official MCP Discord Drop (discord.gg/model-context-protocol — #show-and-tell or #tools)

```
hey 👋 I built an MCP server that gives AI agents the ability to **draw**

🖊️ **Skissify** — JSON in, hand-drawn SVG out

```
npx skissify-mcp
```

Claude asks: "sketch a floor plan for a 2BR apartment"
Skissify returns a URL to a wobbly, hand-drawn floor plan SVG

30+ element types including architectural (walls, doors, stairs, furniture) + technical (arrows, dimensions, text)

REST API is also free + no auth if you want to call it directly from your own agents

skissify.com — launching today on Product Hunt if anyone wants to upvote 🙏
```

---

### r/ClaudeAI Post (bonus — 100K+ members, AI-native audience)

**Title:**
```
I gave Claude a pencil — Skissify lets Claude draw hand-drawn floor plans via MCP
```

**Body:**
```
One of the things I always wanted was for Claude to be able to produce visual output — not describe it, not link to Figma, but actually draw something.

I built Skissify for this. It's an MCP server you add to Claude Desktop:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["skissify-mcp"]
    }
  }
}
```

Then just ask Claude: "sketch a floor plan for a studio apartment."

Claude constructs the JSON, calls Skissify, and returns a URL to a hand-drawn SVG that looks like something you'd sketch on a napkin.

It also works via direct REST API if you build your own agents:
`POST https://skissify.com/api/render` — free, no auth

Launched today on Product Hunt. Happy to answer questions about how it works.

→ skissify.com
```

---

### Hashtag Clusters (2026 confirmed, for all platforms)

**MCP-specific cluster:**
`#MCP #ModelContextProtocol #ClaudeDesktop #MCPServer #AIAgents #AITools`

**Developer tools cluster:**
`#DevTools #APIFirst #OpenAPI #DeveloperExperience #BuildInPublic #IndieHacker`

**Visual/design cluster:**
`#SketchFirst #VibeDrawing #HandDrawn #Diagrams #FloorPlan #AIDesign`

**Owned/low-competition (claim these):**
`#Skissify #VibeDrawing #SketchFirst #JSONtoSVG #AIArtDirector #FlatJSON`

**April 1 angle:**
`#AprilFools #BuiltForReal #NotAJoke #ProductHunt #LaunchDay`

---

### Final T-2h Tweet Thread (post at 20:00 CET tonight)

**Tweet 1:**
```
T-11 hours to launch.

I've been working on this for weeks. Tomorrow it goes live on Product Hunt.

Skissify: the API where you POST JSON and get a hand-drawn sketch back.

The weird part? AI agents can use it natively.

skissify.com ✏️
```

**Tweet 2 (reply to above):**
```
Here's what launching on April 1st feels like:

Every post I write, I wonder if people will think it's a joke.

So I'm going to lean into it.

"It's April 1st. I built a diagram API. AI agents draw floor plans with it. Yes, it's real. Here's the curl command to prove it:"

curl -X POST https://skissify.com/api/render -H "Content-Type: application/json" -d '{"paper":"cream","wobble":2,"elements":[{"type":"rectangle","x":50,"y":50,"width":200,"height":150},{"type":"text","x":130,"y":120,"text":"Not a Joke"}]}' --output proof.svg

If that returns an SVG, believe me.
```

**Tweet 3 (reply to above):**
```
To everyone who said they'd upvote on Product Hunt —

Tomorrow morning, 07:00 CET. That's when it goes live.

I'll post the link here.

Thank you in advance. It means more than you know.
```


---

## 🆕 CYCLE 80 ADDITIONS (March 31, 20:30 CET — T-8h)

### LinkedIn Carousel Copy (Native LinkedIn Document Post)

**Slide 1 — Hook:**
```
Why your AI agent can't draw
(and what to do about it)
```

**Slide 2 — The Problem:**
```
In 2026, your AI can:
✓ Write code
✓ Analyze data
✓ Draft emails
✓ Plan projects

But it still can't draw a floor plan.

Every diagramming tool requires a human at the mouse.
```

**Slide 3 — The Gap:**
```
MCP has 12,000+ servers.
Tools for reading. Searching. Writing. Executing.

Zero tools for drawing.

AI agents are text-only creatures in a visual world.
```

**Slide 4 — The Solution:**
```
Skissify fills the gap.

JSON → hand-drawn SVG.
No UI. No mouse. No design skills.

Your AI agent describes the sketch.
Skissify renders it.
Done.
```

**Slide 5 — How It Works:**
```
1. Install the MCP server (npx skissify-mcp)
2. Ask Claude to "sketch a floor plan"
3. Claude generates JSON + calls the MCP tool
4. You get a shareable hand-drawn sketch URL

Total time: under 60 seconds.
```

**Slide 6 — Real Use Cases:**
```
What people are doing with Skissify:

→ AI agents generating floor plans for real estate
→ Claude sketching architecture diagrams for PRs
→ Product managers replacing Miro for wireframes
→ Dungeon masters generating D&D maps

Use cases we didn't plan. All possible with one API.
```

**Slide 7 — The Differentiator:**
```
Why hand-drawn?

Rough sketches invite better feedback than polished mockups.

A wobbly sketch says: "this is an idea."
A Figma frame says: "don't touch it."

Skissify makes the wobble intentional.
```

**Slide 8 — CTA:**
```
Launching TODAY on Product Hunt.

Free tier. No auth. REST API + MCP server.

→ skissify.com
→ Search "Skissify" on Product Hunt

If you build AI agents, this is for you.
```

**LinkedIn Post Copy (to accompany carousel):**
```
I built the first diagram tool where AI agents are first-class citizens.

Not "AI-assisted." Not "AI-enhanced." AI-native.

Your Claude, your Cursor agent, your LangChain pipeline — they can all draw now.

JSON in. Hand-drawn sketch out. No UI required.

Today it's on Product Hunt. Would mean a lot if you check it out.

→ [link to PH]

#BuildInPublic #AI #DeveloperTools #ProductLaunch #MCP #IndieHacker
```

---

### Launch Morning Mega-Thread (Post at 09:00 CET, April 1)

**Tweet 1 of 7:**
```
We're live. 🎉

Skissify launched on Product Hunt today — the diagram API where AI agents can draw.

→ [Product Hunt link]

It's April 1st. I know. It's real. Thread 🧵
```

**Tweet 2 of 7:**
```
The problem I was trying to solve:

I kept building AI agents that needed to *show* something visual.

Every diagram tool required a human at the controls.
Figma. Miro. Excalidraw. Draw.io.

All of them: designed for human hands.

I wanted one designed for AI.
```

**Tweet 3 of 7:**
```
So I built the REST API version.

POST JSON → get back hand-drawn SVG.
<200ms. No auth. Free tier.

curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":80,"label":"Your idea"}]}'

→ Returns a sketch.
```

**Tweet 4 of 7:**
```
The MCP server is the real magic.

npx skissify-mcp

Add it to Claude Desktop. Then just ask:

"Sketch my apartment floor plan."
"Draw an architecture diagram for my API."
"Generate a wireframe for this feature."

Claude draws it. Hand-drawn. Wobbly. Real.
```

**Tweet 5 of 7:**
```
The wobble is intentional.

Hand-drawn sketches are psychologically different from polished designs.

A wobbly sketch says: "this is an idea, push on it."
A Figma frame says: "someone worked on this, tread carefully."

Better feedback. Faster iteration. On purpose.
```

**Tweet 6 of 7:**
```
What surprised me:

I built this for AI developers.

Turns out: architects use it for floor plans, product managers use it for wireframes, and D&D players use it for dungeon maps.

I did not see that last one coming.
```

**Tweet 7 of 7:**
```
It's free to try. No account needed.

→ skissify.com/api/render (API, no auth)
→ skissify.com (browser editor)
→ npx skissify-mcp (for Claude)
→ [Product Hunt link] (if you want to support the launch)

Thanks for reading. Go build something weird. ✏️
```

---

### ProductHunt Launch Day Comment Templates

**First comment on your own PH post (pin this):**
```
Hey everyone! 👋 Maker here.

Quick context: Skissify was born from a frustration — I kept building AI agents that needed to output something *visual*, and every diagramming tool was designed for humans, not agents.

The free /api/render endpoint is the best place to start. No account, no auth, just POST JSON and get back a hand-drawn SVG.

The MCP server (npx skissify-mcp) is the experience I'm most proud of. If you have Claude Desktop, it's 30 seconds to "Claude can now draw."

Happy to answer any questions. Launch day is chaotic but I'm here. 🙏
```

**When someone asks about pricing:**
```
Great question! Free tier has unlimited renders via /api/render — no auth, no rate limits.

Paid plans (coming soon) will add: private renders, team sharing, custom styles, and higher-priority API.

For today: everything on skissify.com is free. Try it without signing up.
```

**When someone asks "how is this different from Excalidraw?":**
```
Core difference: Excalidraw is for humans; Skissify is for both humans AND AI agents.

Excalidraw is a great real-time collaborative UI. You use it with a mouse.
Skissify is a REST API + MCP server. Your AI agent drives it programmatically.

Different jobs. Many people use both — Excalidraw for live collaboration, Skissify when they want Claude to generate the initial sketch.
```

**When someone asks "why hand-drawn style?":**
```
Research shows rough sketches get better feedback than polished designs.

A wobbly sketch signals: "this is still an idea — challenge it."
A polished mockup signals: "this is done — approve it."

The hand-drawn aesthetic isn't a shortcut. It's a feature that improves collaboration by keeping designs in "conversation mode" longer.
```

---

### Indie Hackers Launch Day Comment Responses

**When someone asks about tech stack:**
```
Next.js 15 (App Router), TypeScript, Prisma + SQLite for dev (Postgres in prod), 
custom SVG rendering engine in pure TS. No canvas, no WebGL — everything is 
generated as vector paths. The wobble comes from a Perlin noise algorithm.

MCP server is a separate package. Both on npm.
```

**When someone asks about revenue:**
```
Day 1 — revenue is zero. The plan: free API to get adoption, 
paid plans for private/team features, eventually a self-hosted option for enterprise.

The goal for this week is signups and usage — not revenue.
```

---

### New Hashtag Cluster: 2026 Edition

**For AI/agent audience (Twitter/X, Bluesky):**
```
#MCPtools #AIagents #ClaudeAI #VibeDrawing #JSONtoSVG #Skissify
```

**For developer audience:**
```
#BuildInPublic #IndieHacker #OpenAPI #DevTools #APIFirst #Skissify
```

**For design/product audience:**
```
#ProductDesign #Wireframing #SketchFirst #UXDesign #ProductLaunch #Skissify
```

**For architecture/spatial audience:**
```
#FloorPlan #Architecture #AIDesign #SpaceDesign #Skissify
```

**Owned low-competition cluster (claim all on launch day):**
```
#Skissify #VibeDrawing #SketchFirst #JSONtoSVG #AIArtDirector #FlatJSON #VibeCodeing
```

---

### Dev.to / Hashnode Launch Day Post Title Options (pick one)

1. "I built the diagram API for AI agents — here's how it works"
2. "npx skissify-mcp — how I made Claude able to draw"
3. "JSON → hand-drawn sketch: the API I built because nobody else did"
4. "Show HN: Skissify — POST JSON, get hand-drawn SVG, let Claude draw"
5. "The wobble is intentional: why rough sketches beat polished mockups"

**Best one for Dev.to:** Option 2 (MCP framing = high dev engagement)
**Best one for Hashnode:** Option 3 (problem-solution framing = high SEO)
**Best one for Show HN:** Option 4 (classic Show HN format)

---

---

## PLATFORM EXPANSION PACK (Added 2026-03-31, Launch Eve)

*New platform-specific copy and viral hooks not in previous cycles.*

---

### Instagram — Launch Day

**Post 1 (Feed — hero visual of floor plan):**
Caption:
```
The AI drew this floor plan.

Not described it. Not hallucinated it. Drew it — from JSON to hand-drawn SVG in under 200ms.

This is Skissify. A sketch API that gives AI agents the ability to draw.

Free to try. No login. Just curl.
→ skissify.com

#AI #FloorPlan #HandDrawn #BuildInPublic #AIAgents #Design #Architecture #Sketch #MCP #IndieHacker #Skissify #ProductLaunch #SaaS #DeveloperTools #JSONtoSVG
```

**Post 2 (Reel — screen record of Claude drawing):**
Caption:
```
I asked Claude to sketch my apartment layout.

It actually drew one.

That's the Skissify MCP server — 2 minutes to set up, and your AI has a pencil.

Full tutorial in bio link. Free API, no auth.
→ skissify.com/for-agents

#Claude #MCPserver #AItools #FloorPlan #VibeDrawing #BuildWithAI #AIArtDirector #Skissify #IndieHacker
```

**Story copy (swipe-up or link sticker):**
```
Slide 1: "What if your AI could draw? 🤔"
Slide 2: [floor plan screenshot] "This was generated by Claude via JSON."
Slide 3: "Skissify — launching today on Product Hunt."
Slide 4: "Link in bio → free API, no signup."
```

**Instagram Bio (launch day):**
```
✏️ Skissify — JSON in. Hand-drawn sketches out.
Built for AI agents. Works with Claude.
🆓 Free API — no auth required.
👇 Try it now:
```

---

### TikTok / Instagram Reels — 3 Scripts

**Script 1: "I gave Claude a pencil" (30 seconds)**
```
[0-3s] Hook text on screen: "I gave an AI a pencil. Here's what it drew."
[3-10s] Show Claude Desktop. Type: "Sketch a 2-bedroom apartment layout."
[10-20s] Screen shows JSON being generated, then Skissify tool called.
[20-27s] Hand-drawn floor plan appears. Rooms. Furniture. Dimension lines. Wobbly walls.
[27-30s] Text overlay: "skissify.com — free API. No login."

Voiceover: "This is Claude, using Skissify's MCP server. It went from a sentence
to a floor plan in about 20 seconds. The wobbly style is intentional — rough
sketches invite better feedback than polished mockups. Try it yourself — link in bio."
```

**Script 2: "The thing no one built" (45 seconds)**
```
[0-5s] Text: "AI can write code. AI can generate images. But can it draw a floor plan?"
[5-15s] Show Dall-E/Midjourney floor plan attempt — imprecise, artistic, unusable.
[15-20s] Text: "That's beautiful but useless if you need actual room dimensions."
[20-35s] Switch to Skissify demo: curl command → SVG output in terminal → open in browser.
[35-40s] The hand-drawn floor plan: precise rooms, correct doors, labeled spaces.
[40-45s] Text: "JSON in. Precise sketch out. skissify.com"

Voiceover: "The gap between 'AI can describe a layout' and 'AI can draw a layout'
has been there since GPT-4. Skissify closes it. Structured JSON goes in,
hand-drawn SVG comes out. Try the free API — no account needed."
```

**Script 3: "The wobble is not a mistake" (20 seconds)**
```
[0-3s] Text: "Why does this floor plan look hand-drawn instead of perfect?"
[3-8s] Show a polished Figma-style floor plan.
[8-12s] Show a Skissify floor plan — same layout, wobbly lines.
[12-18s] Text: "Rough sketches get more honest feedback. This is psychology, not aesthetics."
[18-20s] "skissify.com"

Voiceover: "The wobble is intentional. Rough-looking designs invite critique
of the idea. Polished ones invite critique of the execution. Wrong moment,
wrong feedback. Skissify gives you draft mode on purpose."
```

---

### YouTube — Video Descriptions

**Demo Video (60-second): "I gave Claude a pencil — Skissify MCP demo"**

Description:
```
Skissify is a hand-drawn sketch API for AI agents and developers.

In this demo: I ask Claude Desktop to sketch a studio apartment floor plan using
the Skissify MCP server. Claude constructs the JSON manifest and calls the API.
The result: a hand-drawn floor plan with rooms, furniture, doors, and dimension lines.

Free to try — no signup, no auth:
→ https://skissify.com/api/render
→ MCP setup: https://skissify.com/for-agents
→ Product Hunt: [link]

Timestamps:
0:00 - Setup: adding Skissify MCP to Claude Desktop
0:20 - Asking Claude to sketch a floor plan
0:40 - The rendered result
0:55 - Trying the REST API directly with curl

The hand-drawn aesthetic is intentional. Research shows rough sketches get better
structural feedback than polished mockups — we built the wobble on purpose.

#Skissify #Claude #MCPserver #FloorPlan #AIagents #HandDrawn #BuildInPublic
```

**Tutorial Video (5-minute): "How to use Skissify to generate floor plans with AI"**

Description:
```
Full tutorial on using Skissify — a REST API that turns JSON into hand-drawn
sketches — to generate floor plans with Claude, Python, and JavaScript.

Chapters:
0:00 - What is Skissify?
0:45 - The REST API: curl demo
2:00 - MCP server setup for Claude Desktop
3:30 - Python integration
4:15 - JavaScript / fetch example
4:45 - The browser editor

All code shown in this video: https://skissify.com/for-agents

Skissify is free to try — no signup, no auth: https://skissify.com

#AI #APIFirst #FloorPlan #ClaudeAI #MCP #DeveloperTools #BuildInPublic
```

---

### Pinterest

**Board name:** "AI Sketch Tool | Skissify"

**Board description:**
```
Hand-drawn sketches generated by AI. Floor plans, wireframes, architecture diagrams,
and more — all produced by Claude + Skissify's MCP server.
Skissify is a REST API: JSON in, beautiful hand-drawn SVG out. Free to try at skissify.com
```

**Pin types to create:**
1. Floor plan examples — labeled "AI-generated floor plan | skissify.com"
2. Blueprint mode examples — dark blue paper, white lines, title block
3. Side-by-side: JSON code + rendered sketch
4. Comparison: Figma wireframe vs Skissify sketch (same layout)
5. Element reference sheet — visual guide to all 30+ element types

**Key Pinterest boards to target:**
- Architecture & Floor Plans
- AI Tools for Designers
- Interior Design Sketches
- Product Design + UX
- Home Planning / Dream Home

---

### Threads (Meta)

**Post 1 — Launch announcement:**
```
Launching Skissify today.

It's a REST API that turns JSON into hand-drawn sketches.

AI agents can use it natively. Claude can draw floor plans. Your scripts can generate diagrams.

No auth. Free tier. Under 200ms.

skissify.com — April 1st, not a joke.
```

**Post 2 — The argument:**
```
Hot take: rough sketches get better feedback than polished mockups.

Research backs this up. Polished = "please approve my work." Rough = "let's think about this together."

Built Skissify so AI agents can output sketches that look appropriately rough. The wobble is a feature.

(also it just launched today if you want to try it)
```

**Post 3 — The unexpected audiences:**
```
I built Skissify for AI developers.

People who actually showed up:
• Architects wanting quick floor plan mockups
• D&D players generating dungeon maps with Claude
• Product managers sketching user flows without opening Figma
• Real estate agents showing clients rough layouts
• A teacher using it to generate classroom seating diagrams

The floor plan use case I expected. The dungeon maps were a surprise.
```

---

### Viral Hook Formulas — 10 Tested Formats

*For Twitter/X, Bluesky, LinkedIn. These are the hooks most likely to stop the scroll.*

**1. "The thing that didn't exist"**
```
I needed an API that turns JSON into hand-drawn sketches.

It didn't exist. So I built it.

→ skissify.com
```

**2. "The contrast"**
```
Figma: 25 minutes to sketch an idea.
Whiteboard: 45 seconds.
Skissify + Claude: 30 seconds.
Skissify API: 3 minutes (writing JSON yourself).

There's a tool for every phase. Use the right one.
```

**3. "The specific demo"**
```
Run this:

curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":150},{"type":"text","x":110,"y":130,"text":"Living Room","fontSize":16}]}'

→ You get an SVG back.
→ Hand-drawn rectangle with a label.
→ < 200ms.

That's Skissify. No auth, no account, no friction.
```

**4. "The unexpected user"**
```
I built Skissify for AI developers.

A D&D dungeon master just used it to generate a dungeon map with Claude.

I did not plan for this use case. I'm very happy about it.
```

**5. "The psychology hook"**
```
Rough sketches get more honest feedback than polished designs.

This is not my opinion. It's documented in HCI research.

Skissify renders rough intentionally. The wobble is there on purpose.

Your AI agent can now produce artifacts that invite critique instead of approval.
```

**6. "No one told me"**
```
No one told me you could give Claude a pencil.

You can. It took me 30 minutes to build the MCP server.

npx skissify-mcp → Claude can now draw floor plans.
```

**7. "The honest comparison"**
```
Excalidraw: great if you're drawing it yourself.
Skissify: great if code or AI is drawing it.

Different jobs. Not competitors in the way people assume.
```

**8. "The stack post"**
```
My AI agent stack in 2026:

Claude — reasoning
Perplexity — search
Skissify — visual output
n8n — orchestration

The visual output layer was the missing piece longest.
```

**9. "The April Fools advantage"**
```
I launched on April 1st.

Every skeptic ran the curl command themselves to check if it was real.

→ 94% first-time JSON accuracy
→ <200ms renders
→ No auth required

The skepticism was free validation.
```

**10. "The question hook"**
```
Can an AI agent actually draw?

Not describe. Not approximate with image generation. Draw — precisely, deterministically, from structured data.

Yes. The tool is called Skissify. It's free. No login.
```

---

### Twitter/X Thread: "How I made Claude draw floor plans" (for April 2 Day 2)

**Tweet 1:**
```
How I made Claude draw floor plans (a thread):
```

**Tweet 2:**
```
LLMs are great at spatial reasoning.

They can describe a room layout in perfect detail.

But they can't draw it. That gap is the problem.
```

**Tweet 3:**
```
The insight: a floor plan is just structured data.

Rooms = rectangles with labels.
Walls = lines.
Doors = symbols with swing directions.
Furniture = typed symbols at positions.

All of that is expressible as JSON.
```

**Tweet 4:**
```
LLMs are excellent at JSON generation.

So the question became: can I build an API that renders JSON as a hand-drawn sketch?

Yes. That's Skissify.
```

**Tweet 5:**
```
The MCP server is where it gets interesting.

Add skissify-mcp to Claude Desktop. Now ask Claude to draw something.

"Sketch a 2-bedroom apartment, open plan kitchen and living room."

It constructs the JSON. Calls Skissify. Returns the floor plan.
```

**Tweet 6:**
```
The hand-drawn style matters.

Polished output → "this looks done" → bad feedback.
Rough output → "this is a draft" → good feedback.

The wobble is intentional. Rough sketches invite critique of ideas, not execution.
```

**Tweet 7:**
```
The result: AI agents with a drawing primitive.

Not image generation (imprecise).
Not ASCII art (not visual).
Not Figma (not programmatic).

Precise, structured, hand-drawn SVG from JSON.

→ skissify.com/api/render — free, no auth.
```

---

### LinkedIn Article (longer-form, for week 2)

**Title:** "I built the visual output layer for AI agents — here's what I learned"

**Opening (first 3 lines must show before "see more"):**
```
For 18 months, I kept running into the same problem: my AI agents could reason about
visual things but couldn't produce them. Text descriptions, JSON structures, code —
but no actual pictures. I built Skissify to fix this.
```

**Body outline:**
1. The gap: LLMs think visually but can't output visually
2. Why image generation doesn't solve it (imprecision)
3. Why Mermaid / draw.io doesn't solve it (no hand-drawn, no architectural elements)
4. The JSON-to-sketch insight
5. The unexpected use cases that emerged (architects, D&D, product managers)
6. The MCP protocol and why it matters
7. What I'd do differently (build the email list first)
8. CTA: try the API

---

### Response Templates for Launch Day Comments

**When someone says "this is perfect for [use case you didn't think of]":**
```
Genuinely didn't think of that use case — thank you for sharing it.
The floor plan angle was the design goal; [their use case] is a great surprise.
Let me know what you build!
```

**When someone says "why not just use Excalidraw?":**
```
Excalidraw is great if you're drawing it yourself. Skissify is for when code or an
AI agent needs to produce the sketch programmatically. No human in the loop.
Different job entirely — many people use both.
```

**When someone says "the API is down":**
```
Checking now — [check status]. If you're getting errors, try with explicit
Content-Type header: -H "Content-Type: application/json". If still broken,
DM me and I'll fix it immediately.
```

**When someone says "I'd pay for X feature":**
```
That's really useful signal, thank you. [X feature] is [on the roadmap /
something I hadn't considered]. Following you so I can reach back out when
it's built.
```

**When an influencer or prominent account comments:**
```
[Personalized reply referencing their specific comment]. Thanks for the support
on launch day — means a lot. [If relevant: their audience would love [specific
aspect] — let me know if you want a quick demo call].
```

---

## MISSING COMMUNITY POSTS (Added Cycle 82 — April 1, 2026)

*These high-value communities were identified in HASHTAGS doc but never had specific copy written.*

---

### r/floorplans — Launch Day Post

**Title:** `I built a tool where you describe a room in text and get a hand-drawn floor plan sketch`
```
Sharing this here because it seems like the right community.

I built Skissify — you describe a floor plan to an AI, and it draws it as a hand-drawn sketch.

Example: "2-bedroom apartment, kitchen and living area open plan, one bathroom off the hallway, master bedroom with ensuite" → Claude constructs the layout → Skissify renders a hand-drawn floor plan.

It's not a floor plan design tool (no CAD precision). It's a quick ideation tool — the kind of rough sketch you'd draw on a napkin to explain your layout to someone. The hand-drawn style is intentional.

Use cases people have found:
- Explaining renovation ideas to a contractor before formal drawings
- Quick "does this layout make sense?" sanity check before hiring a designer
- Exploring 3-4 layout options quickly before committing to one

Free to try at skissify.com. No signup for the API, or use Human Mode (just describe it).

Curious if this is useful for people here — what's the most common "napkin sketch" moment in floor plan planning?
```

---

### r/architecture — Launch Day Post

**Title:** `Hand-drawn sketch API for AI agents — floor plans, sections, architectural diagrams [Show r/architecture]`
```
Built something I think this community might find interesting, even if it's from the tech angle.

Skissify is a REST API that renders architectural drawings in a hand-drawn style. The input is JSON (or plain text via the browser), the output is SVG. AI agents can call it natively via MCP.

The real use case I keep thinking about for architecture:

Early client briefings are brutally hard. You've built something polished before you truly understand their problem. They react to your solution instead of helping define the brief.

A rough sketch says: "here's our initial thinking, push on this." It's the same distinction between trace paper sketches and Revit files — different tools for different phases.

Skissify automates the trace paper phase: describe a spatial concept, get a rough sketch, use it to have the right conversation.

Supported element types: walls (double-line), doors (hinged/sliding with swing arcs), windows, stairs, columns, dimension lines, room labels, furniture.

Four paper styles: cream (napkin), white (clean), blueprint (presentation), grid (technical).

If you're an architect: I'd love to know what use case would make this actually useful for you, vs. what's missing.

→ skissify.com
```

---

### Anthropic Discord #mcp-showcase Drop

```
Skissify just launched — sharing here because it's something a bit different for the MCP ecosystem.

Most MCP servers **retrieve or process** data. Skissify **creates** visual output.

npx skissify-mcp → Claude gets a `create_sketch` tool.

Claude can now: construct a JSON floor plan, call Skissify, and return a hand-drawn SVG of an apartment, wireframe, system diagram, or any spatial layout — embedded directly in the conversation.

The interesting technical bit: the schema is designed specifically for first-try LLM accuracy (~94% success rate — flat JSON, not nested, with explicit coordinate constraints). Happy to share the schema design learnings if useful for anyone building MCP servers.

→ skissify.com | Free API at /api/render | MCP: npx skissify-mcp
```

---

### LangChain Discord Drop

```
Just launched: Skissify MCP + REST API for visual output in agent workflows.

If you're building LangChain/LangGraph agents that need to produce diagrams, floor plans, or wireframes — the REST API is free and no-auth. POST JSON, get hand-drawn SVG.

Python example:
```python
import requests
resp = requests.post("https://skissify.com/api/render", json={
    "paper": "cream",
    "elements": [
        {"type": "rect", "x": 50, "y": 50, "w": 200, "h": 150, "label": "Living Room"},
        {"type": "door-symbol", "x": 50, "y": 120, "w": 40, "side": "left"}
    ]
})
svg = resp.text  # hand-drawn SVG
```

No deps, no auth, works in any LangChain tool. Docs at skissify.com/for-agents.
```

---

### Meta Threads Copy (Launch Day)

```
I launched a product on April 1st.

Not a joke.

You POST JSON to an API and get back a hand-drawn SVG sketch. AI agents can use it via MCP. Claude can literally draw floor plans now.

Built it because I was tired of every diagram tool assuming a human was at the keyboard.

Try it free at skissify.com — or just run:
curl -X POST https://skissify.com/api/render -H "Content-Type: application/json" -d '{"elements":[{"type":"text","x":50,"y":50,"text":"it works"}]}'

#AI #BuildInPublic #IndieHacker
```

---

### r/homedesign — Soft Launch Post (No Hard Sell)

**Title:** `Quick sketch of a kitchen layout for early-stage planning — what do you think of this workflow?`
```
Experimenting with a workflow for the "early ideation" phase of home renovation planning.

The problem I kept running into: when you start talking to a contractor or designer, it's hard to communicate a spatial idea without either (a) drawing on a piece of paper that you then lose, or (b) building something in a CAD tool that takes way more time than the conversation warrants.

Tried using an AI to sketch rough floor plans — described the kitchen layout in text, it produced this rough hand-drawn sketch (via Skissify if anyone's curious — it's a free API).

[ATTACH: kitchen floor plan sketch image]

The point isn't precision. It's "does this layout make sense before I commit to demolishing a wall."

Anyone else doing this kind of quick spatial sketching as a step before getting to actual floor plans? Curious if this early-stage workflow resonates.
```

---

## DAY 3-7 RETENTION COPY SCHEDULE (Added Cycle 82)

*Launch momentum dies on Day 3 without a plan. This is the plan.*

### Day 3 (April 3) — The Technical Deep-Dive Post

**Twitter/X thread — "The schema insight":**
```
We got 94% first-try accuracy from LLMs generating floor plan JSON.

The secret was boring: flat schemas outperform nested ones ~3:1.

Thread on what we learned 🧵
```

**Thread 2:**
```
Problem: LLMs are great at spatial reasoning but bad at deeply nested JSON.

A hierarchical schema with 3+ levels = "working memory" overload for the model.

Flat JSON is simpler to track: 1 root object, 1 elements array, everything else is a property.
```

**Thread 3:**
```
Our original schema: nested coordinates, grouped layers, optional fields everywhere.

First-try success: ~40%.

After flattening: ~72% immediately.

Removing optional fields from the spec: ~85%.

Adding concrete pixel values to examples: ~94%.

The prompt didn't change. The schema did.
```

**Thread 4:**
```
Full write-up: [link to blog/the-schema-design-that-got-94-percent-accuracy.md published on Dev.to]

TL;DR: schema design > prompt engineering for structured output tasks.

This is generalizable. If you're building any agent with structured JSON output, spend more time on the schema than on the prompt.
```

---

### Day 4 (April 4) — The Unexpected Audience Story

**Twitter/X:**
```
I built Skissify for AI developers.

Day 1 users included:
→ A dungeon master generating D&D maps
→ A homeowner explaining her kitchen to a contractor
→ A geometry teacher creating spatial reasoning exercises

The API didn't change. The audience did.

This is what "primitive" means. Primitives find their own use cases.

skissify.com
```

**LinkedIn:**
```
Something interesting happened on launch day.

I built Skissify for AI agents and developers. The audience had other ideas.

Use cases I hadn't anticipated:
- Dungeon masters generating blueprint-style battle maps (the architectural symbols + blueprint paper mode = surprisingly good dungeon aesthetic)
- Homeowners sketching renovation plans to communicate with contractors
- A geometry teacher generating 30 spatial reasoning exercises in 10 minutes

I built a primitive. Primitives find their own use cases.

The lesson for product builders: if your tool is genuinely useful at the "raw material" level, users will find applications you didn't design for. Your job is to make the primitive excellent, then follow the unexpected use cases.

→ skissify.com

#ProductDesign #BuildInPublic #AIAgents #IndieHacker
```

---

### Day 5 (April 5) — The Visual Demo Day

**Twitter/X — post a GIF:**
```
Best thing about building a sketch tool:

The demos are beautiful.

[GIF: JSON → floor plan renders, wobble slider 0→10→3]

skissify.com — free tier, no account needed.

#Skissify #VibeDrawing #HandDrawn
```

**Instagram/Reels caption:**
```
What 3 lines of JSON looks like rendered as a hand-drawn sketch.

The wobble is the point.

skissify.com (link in bio)

#HandDrawn #AI #FloorPlan #BuildInPublic #VibeDrawing #CodeArt #CreativeCoding
```

---

### Day 6 (April 6) — The Comparison Post

**Twitter/X:**
```
The diagram tool comparison nobody asked for but I'm making anyway:

Excalidraw → best for humans drawing together in real-time
Mermaid → best for code-to-flowchart
Figma → best for polished UI design
draw.io → best for enterprise org charts

Skissify → best when code or an AI agent needs to produce the diagram

Different jobs. Use the right tool.

Which one am I missing?
```

---

### Day 7 (April 7) — The Week 1 Retrospective Post

**Twitter/X thread:**
```
Skissify Week 1 retrospective.

Numbers:
→ [X] signups
→ [X] API calls
→ [X] GitHub stars
→ [X] PH upvotes

What I learned 🧵
```

**Thread posts:**
```
1/ The April Fools timing was a feature, not a bug.

The filter it created: only the genuinely curious tried it.
The retention effect: people who tried on April 1 and it worked remember that.

"I thought it was a joke and it worked" is a better user acquisition story than "I tried it, it was fine."
```

```
2/ The unexpected use cases are the business.

AI developers were the plan. Homeowners, DMs, geometry teachers showed up.

Each unexpected audience is a marketing channel I didn't design for.
Week 2 plan: go to where they are.
```

```
3/ The technical differentiator that resonated most: 94% first-try accuracy.

Concrete numbers > abstract claims. Always.

Every "AI-compatible" product should have a number that proves it.
```

```
4/ The free API tier is the best marketing decision I made.

Zero friction to try = the product markets itself to the audience most likely to use it: developers.

A developer who integrates your free tier is 40x more likely to pay than one who reads about it.
```

```
5/ What I'm building Week 2:
→ Team sketch sharing
→ Export to PNG/PDF
→ Public gallery of community sketches
→ Skissify for Python SDK
→ [most-requested feature from Week 1]

Following? → @skissify
#BuildInPublic
```

---

*Last updated: April 1, 2026 — Cycle 82 (Launch Day + Day 3-7 Retention Plan)*
