# The r/mcp Post We Forgot on Launch Day (And Why It's Better Now)

*Published: Saturday March 28, 2026 | Best platform: Dev.to, Indie Hackers | Day 2*

---

Yesterday I launched Skissify — a JSON-to-hand-drawn-sketch tool built specifically for AI agents via MCP.

I posted to 14 different communities over 16 hours. Reddit waves. Discord blitzes. HN threads. Twitter. LinkedIn.

I forgot to post to r/mcp.

The one community that Skissify was literally built for. The developers who install MCP servers, test schema designs, and debate the right way to expose tool descriptions. The people who would actually use this thing.

I remembered at 23:00 CET. By then it was Day 2.

---

## Why I'm Writing About This

Because the "Day 1 gap" is now a Day 2 asset.

Posting to r/mcp yesterday would have been: "Hey, I just launched this thing, please look at it."

Posting today is: "Here's what happened when 24 hours of real users found a tool I built for you."

The homeowner renovation stories. The dungeon master use case. The LLM benchmark data. The schema design decisions that turned out to matter.

Better story. Better data. Better post.

---

## What Skissify Is (For r/mcp Specifically)

Skissify is a visual output MCP server. It takes structured JSON and renders hand-drawn floor plans, diagrams, wireframes, and spatial layouts.

**The MCP tool looks like this:**
```json
{
  "name": "create_sketch",
  "description": "Generate a hand-drawn sketch from JSON. Returns a shareable URL.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "elements": {
        "type": "array",
        "description": "Array of shapes to draw"
      },
      "style": {
        "type": "object", 
        "description": "Paper style and rendering aesthetics"
      }
    }
  }
}
```

**Install:**
```bash
npm install -g @skissify/mcp-server
```

**Claude Desktop config:**
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

---

## The Schema Decision That Changed Everything

Most sketch tools expose their API as: "give me the full document." Skissify went flat.

A single `elements` array. Absolute coordinates. No groups, no nested objects. Each element is: `{type, x, y, width, height, label, style}`.

The reason: LLM generation success rate.

Hierarchical schemas → 60% first-try success. Complex coordinate systems → 50-65%.
Flat, absolute, minimal → 92-94%.

The schema is designed for LLMs to generate reliably, not for humans to read.

---

## What Happened on Launch Day

Things that went better than expected:
- The MCP install workflow worked for 90%+ of testers
- Non-developer use (homeowners, renovation planning) emerged immediately — 30% of Day 1 signups
- The dungeon map use case appeared organically via r/DnD — we never targeted them
- Blueprint paper style got the most positive reactions

Things that were harder than expected:
- JSON as the input barrier for non-developers (building "Human Mode" — natural language → JSON → sketch)
- No email capture (fixing this today — every hour without a signup form is lost subscribers)
- Product Hunt timezone gap (EU morning launch means PH resets at 09:01 CET — logistics)

---

## The Question I'm Curious About

What use cases are r/mcp builders missing from their agent stacks?

Specifically: have you hit a moment where your agent needed to produce a visual output — a layout, a diagram, a plan — and ended up writing text descriptions instead because there was no clean tool for it?

That gap is what Skissify exists to fill.

**Try it:** [skissify.com/editor](https://skissify.com/editor) — paste JSON directly, no install needed.

---

*Tags: #MCP #ModelContextProtocol #AIAgents #VibeDrawing #JSONSketch*
