# Skissify Social Media Copy

**Launch: April 1, 2026**

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
