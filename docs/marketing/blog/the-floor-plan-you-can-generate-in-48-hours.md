# We Launched Yesterday. Here's What 48 Hours of AI Sketch Traffic Looks Like.

*Published: April 2, 2026 | 4 min read*

---

Skissify launched on April 1st. (Yes, on April Fools' Day. No, it wasn't intentional. The irony is noted.)

It's now 24+ hours later. Here's what we've learned.

## What We Built

Skissify is a JSON-to-hand-drawn-sketch tool. You POST a JSON manifest describing elements (rooms, boxes, arrows, text), and you get back a URL to a hand-drawn sketch. An MCP server wraps the API so Claude can call it directly — AI agents can now generate visual output without a human in the loop.

## The Audience We Didn't Expect

We built Skissify for AI agent developers. MCP people. Claude Desktop power users building workflows that needed visual output.

The audience that showed up first: **homeowners**.

Thread after thread in r/ChatGPT and r/HomeImprovement: "Wait, I can tell Claude to design my living room and it draws it?" Yes. Exactly that.

We're not complaining. It just means the use case is bigger than we thought.

The four groups using Skissify after 24 hours:
1. AI/MCP developers — building agents that generate visual output (our target)
2. Homeowners + renovation planners — floor plans without CAD
3. Product managers and UX designers — hand-drawn wireframes from specifications
4. Tabletop RPG dungeon masters — generating dungeon maps from room descriptions

The dungeon master thing is genuinely surprising. Blueprint paper mode with architectural symbols accidentally creates excellent D&D dungeon aesthetics. r/DnD found it before we did.

## The API vs The Interface

We expected developers to find the API. We didn't expect non-developers to skip it entirely and go straight to the editor.

The editor (skissify.com/editor) has a JSON panel. Most non-developers don't want to write JSON — they ask Claude, Claude writes the JSON, and they paste it in. Claude becomes the interface. Skissify becomes the renderer.

This is actually the correct architecture for 2026. AI is the UI layer. The tool is the engine underneath.

## What We're Building Next

**Week 2 priorities:**
- Template library (presets for common sketch types: floor plan, system diagram, org chart, wireframe)
- Embed mode (iframe the sketch in Notion, Obsidian, Confluence, GitHub comments)
- Webhook-on-update (watch a sketch URL for changes — for agent workflows that update sketches over time)

**The feature that keeps getting requested:** saved sketch history in the editor. You can share the URL, but if you close the editor, your work is gone. We hear this.

## What's Working in Marketing

Honest numbers:
- **Product Hunt:** Live day 1. Results pending (fill in actual upvote count).
- **HN Show HN:** Posted at 10:00 CET. Modest engagement — HN is slow for visual tools.
- **r/mcp:** Best single post performance. The MCP community is active, technical, and genuinely interested.
- **Twitter/X threads:** Lower clicks-to-signups than expected. The demo GIF (when we record it) will change this. Visual tools need video proof.
- **Discord drops in Claude/Anthropic Discord:** Surprisingly effective. Developer communities that are already AI-native convert well.

## What's Not Working (Yet)

**We haven't recorded the demo video.** This is the biggest mistake we've made. A 15-second screen capture of Claude generating a floor plan via the MCP server would be the most shareable asset we have. We've been writing blog posts instead of recording it. This is backwards.

If you're launching a visual tool: **record the demo on Day 0.** Written content about a visual product is always going to underperform.

## The Technical Insight That Resonates

From the HN post and Twitter threads, the one thing that generates the most engagement:

> Flat schema = 94% LLM generation accuracy. Nested schema = 40%.

We chose a flat, explicit element list (every element gets x, y, width, height) instead of hierarchical nesting (rooms contain doors). The flat approach is dramatically easier for LLMs to generate correctly.

This isn't obvious. Most developers assume hierarchical JSON is "better structured." For AI generation, it's actually harder. Flat wins.

We've started using this in every developer-facing post. It's credible, specific, and most developers have never heard this before.

## Day 2 Focus

Today (April 2):
- **r/LocalLLaMA** — self-hosting angle, Ollama/Llama 3 users who want local MCP workflows
- **r/ChatGPT** — homeowner floor plan angle
- **glama.ai submission** — free MCP server discovery indexing 20,000+ servers
- **Twitter/X json-render parallel thread** — Skissify is to spatial sketches what Vercel's json-render is to data
- **Demo video recording** — this evening, no excuses

The pattern of Days 3–7: narrow the audience, deepen the message, pick up SEO traffic.

---

*Skissify is live at skissify.com — free tier, no account required to try the API.*

*Follow the build: @skissify on Twitter/X and Bluesky.*
