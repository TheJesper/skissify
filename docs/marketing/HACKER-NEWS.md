# Skissify — Hacker News Launch

## Title Options (Show HN format)

**Primary (recommended):**
```
Show HN: Skissify – JSON to hand-drawn sketches, with MCP for AI agents
```

**Alternatives:**
```
Show HN: Skissify – A sketch tool where the input is JSON (and AI agents can use it)
Show HN: I built a hand-drawn sketch renderer that takes JSON input
Show HN: Skissify – Programmatic hand-drawn sketches from JSON, with MCP support
```

**Rules for HN titles:**
- No superlatives (no "first", "best", "revolutionary")
- Factual and descriptive
- Under 80 characters
- "Show HN: " prefix required

---

## URL to Submit
```
https://skissify.com
```
(Link directly to the product, not a blog post)

---

## First Comment (post immediately after submission)

```
Hi HN, I built Skissify as a side project. The core idea: you describe a sketch as JSON, and it renders as a hand-drawn-style image using Canvas 2D.

The rendering engine uses multi-harmonic wobble algorithms (not simple sine-wave distortion) with three control axes:
- Amplitude: how far lines deviate from straight
- Waves: frequency of the wobble
- Humanness: random tremor overlay

There are 14 element types including some architecture-specific ones (doors, windows, stairs, dimension lines). Four paper types (cream, white, yellow grid, blueprint) and three "tool" types (pencil, ballpoint, ink) that control line weight and opacity.

The AI angle: I built an MCP server so AI agents (Claude, etc.) can create sketches programmatically. The agent sends JSON conforming to the schema, Skissify renders it. This is useful for generating floor plans, diagrams, or wireframes from natural language descriptions.

Tech stack: Next.js 15, TypeScript, Canvas 2D, Prisma + SQLite, Stripe, NextAuth.

I'm particularly interested in:
- What element types would you want? (furniture? electrical symbols? network diagrams?)
- Is JSON the right input format, or would you prefer something else?
- Anyone interested in the rendering engine as a standalone npm package?

Happy to answer any technical questions about the wobble algorithm or the MCP integration.
```

---

## Timing

### Best time to post
- **Launch date: Wednesday, April 1, 2026**
- **Post at: 10:00 CET (04:00 AM Eastern / 01:00 AM Pacific)**
- EU morning developers + US late-night builders = solid global wave
- Note: April 1 is April Fools' Day — lean into this in the first comment (see below)

### April 1 First Comment Addendum
Add this BEFORE the technical explanation:
```
Yes, it's April 1. No, it's not a joke.

We figured: if we can convince people on the most skeptical day of the year, 
the product must actually be interesting.

Try the API yourself — no signup: curl -X POST https://skissify.com/api/render 
-H "Content-Type: application/json" -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":150}]}'

If it returns SVG, it's real. (It will.)
```

### Why this matters
- HN front page is most competitive during US business hours
- But posting during peak hours means more initial votes = faster climb
- Show HN posts get a slight boost from HN's ranking algorithm
- April 1 actually helps: any post that survives the "it's a joke" skepticism earns credibility

---

## Engagement Strategy

### DO:
- Respond to every comment, especially critical ones
- Share technical details freely (architecture, algorithms, benchmarks)
- Link to GitHub repo if available
- Acknowledge limitations honestly
- Thank people for specific feedback
- If someone suggests a feature: "Great idea, I'll add that to the roadmap"

### DON'T:
- Ask anyone to upvote (vote rings are detected and penalized)
- Share the HN link on Slack/Discord asking for votes
- Use marketing language ("revolutionary", "game-changing")
- Get defensive about criticism
- Post on multiple platforms simultaneously asking for HN support

### Common HN criticisms to prepare for:

| Likely criticism | Prepared response |
|-----------------|-------------------|
| "Why not just use Excalidraw?" | "Excalidraw is great for manual sketching. Skissify is designed for programmatic generation — the input is JSON, so AI agents and scripts can create sketches without a UI. Different use case." |
| "JSON is verbose for this" | "Fair point. I'm considering a DSL or YAML option. For now, JSON was chosen because every language can generate it and AI models handle it natively." |
| "Why not SVG output?" | "Canvas 2D was chosen for the wobble algorithm performance. SVG export is on the roadmap — the element model maps cleanly to SVG paths." |
| "MCP is just a buzzword" | "MCP is the protocol that Claude, GPT, and other AI assistants use to call external tools. It's a practical integration — here's a demo of Claude creating a floor plan through MCP: [link]" |
| "Why would I pay for this?" | "The free tier is fully functional for public sketches. Pro is for people who want private sketches and API access. The rendering engine itself will be open source." |

---

## If It Hits the Front Page

- Stay online and respond to comments for at least 4-6 hours
- Monitor server load (HN hug of death is real)
- Have a static fallback page ready if the site goes down
- Post updates: "Thanks for the feedback, I just shipped [feature] based on your comments"
- Screenshot the front page placement for social proof later

## If It Doesn't Get Traction

- Don't resubmit immediately (wait at least a week)
- Analyze: was the title unclear? Wrong timing? Better posts competing?
- Try a different angle next time (e.g., "Show HN: A wobble rendering engine for hand-drawn style graphics")
- HN is unpredictable — many successful products took 2-3 attempts
