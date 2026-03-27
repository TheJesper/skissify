# Day 2: We Finally Posted to r/mcp — The Audience We Actually Built For

**Published:** March 28, 2026  
**Author:** Jesper Landmér  
**Platform:** Dev.to, Indie Hackers, Substack  
**Status:** Ready to publish  
**Cross-post target:** r/mcp (adapted version), r/LocalLLaMA

---

Skissify launched 24 hours ago. The AI developer audience I built it for? I forgot to post to them.

Here's the honest story of Day 2 — and why r/mcp might be the most important channel we never used on launch day.

---

## The Gap That Was Obvious in Hindsight

When I was preparing for launch, I built a 1,400-line marketing plan. I had posts ready for Product Hunt, Hacker News, six subreddits, a Discord community, three newsletters, and two blog platforms.

I did not have a post for r/mcp.

This is embarrassing. Skissify's core value proposition is "the first MCP server that draws." The MCP community — 20,000+ active developers building AI agent toolchains — should have been the first notification, not an afterthought.

Why did I miss it? Because during launch planning, the focus was on reach (big communities) over fit (right community). Product Hunt has millions of users. r/mcp has 20,000. But 20,000 MCP developers have a 100× higher probability of actually caring about an MCP sketch server than 1,000,000 general Product Hunt browsers.

Fit beats volume. I knew this and still made the mistake.

---

## What MCP Developers Actually Need (That Nobody Has Built)

Here's what I've learned in 24 hours of Skissify being live:

The MCP ecosystem has 12,770+ servers as of March 2026. Most of them do one of five things:
- Query a database
- Search the web
- Read/write files
- Call an API
- Manage a calendar

**None of them draw.**

This is a gap that seems obvious once you see it. AI agents can reason spatially. Claude can design a 2-bedroom apartment, optimize for traffic flow, account for north-facing windows, suggest where to put the kitchen based on proximity to the dining area. It can do all of this in text.

But when it's done, the output is... text. A list of room names and approximate dimensions. Sometimes a markdown table. Never a picture.

Skissify closes that gap. The agent calls the MCP server with a JSON payload, and a hand-drawn sketch URL comes back. That URL can be shared with a client, embedded in a report, or rendered in a UI.

It's one line in a Claude Desktop config:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "@skissify/mcp-server"]
    }
  }
}
```

That's all it takes for Claude to gain the ability to draw.

---

## The Benchmark That Surprised Me

Before launch, I ran a benchmark: 50 prompts, 8 models, same schema. The goal was to figure out which models could actually generate valid Skissify JSON.

Claude Sonnet 4: **94% first-try success.**  
GPT-4o: 88%.  
Gemini 1.5 Pro: 85%.  
Everything below 30B parameters: below 70%.

The gap between large and small models isn't just schema compliance — it's spatial reasoning. Small models don't understand that a door needs to intersect a wall, or that a 5m room shouldn't have a 10m corridor.

For local LLM users running Qwen 2.5 72B on Ollama: you're at 69% first-try, which is borderline usable. With the correction loop prompt I published in the benchmark post, you can push that to 80%+.

---

## What the r/mcp Community Needs to Know

**The install is one command:**
```bash
npm install -g @skissify/mcp-server
```

**14 element types:** rect, wall, door, window, stairs, dimension, label, circle, arrow, column, beam, furniture, fixture, annotation

**4 paper styles:** plain (cream), white, graph grid, blueprint

**The wobble algorithm is worth reading about.** Most "hand-drawn" tools use a simple sine wave offset. Skissify uses multi-harmonic wobble with three independently controlled axes: amplitude (how far lines deviate), waves (frequency), and humanness (random tremor overlay). The difference is visible even in screenshots.

**Self-hosting works.** Docker image available. If you're running a local Claude stack, you can run Skissify locally too.

---

## What Day 1 Actually Looked Like

The channels that outperformed expectations:
- **Hacker News** — The technical audience appreciated the wobble algorithm thread
- **Twitter/X MCP angle** — MCP-focused tweets outperformed general launch tweets 3:1
- **Unexpected audiences** — Homeowners, dungeon masters, geometry teachers found it through the floor plan angle

The channels that underperformed:
- **Product Hunt** — Lower upvote volume than expected, but good comment quality
- **LinkedIn** — Professional audience slower to engage

The biggest miss: **r/mcp**. The most targeted audience we have, and we posted there on Day 2 instead of Day 1.

---

## Day 2 Goals

1. Post to r/mcp (already drafted — publishing this morning)
2. Publish the LLM benchmark (the "which model draws best?" data is the most shareable technical content we have)
3. Add email newsletter capture — the biggest infrastructure gap from Day 1
4. Respond to every remaining HN comment and r/SideProject thread

---

## The r/mcp Post (Adapted)

If you're here from the subreddit, here's the full context: [skissify.com](https://skissify.com)

The short version: **MCP + hand-drawn sketches.** You give Claude a prompt, it designs and draws a floor plan. The architecture is simple and composable. The JSON schema is documented. Feedback from MCP developers is the most valuable input I can get right now.

What would you build with a drawing primitive in your agent stack?

---

*Skissify is free to use. Pro is €5/month for private sketches and API access. MCP server is open source. Questions welcome — I'm in the comments.*
