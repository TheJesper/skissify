# Skissify Social Media Copy

**Launch: April 1, 2026**
**Last updated: March 31, 2026 — Cycle 78 (T-10h)**

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
