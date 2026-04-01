# Skissify + Notion: The Missing Diagram Layer for 30 Million Workspaces

**Published:** April 2, 2026
**Author:** Jesper
**Tags:** notion, diagrams, ai-agents, workflow, productivity

---

If you use Notion for technical documentation, there's a gap that's been annoying you for years: diagrams.

You write a system design doc. You want to include an architecture sketch. Your options:
1. Draw it in Figma. Export. Upload. Done — but now it's a static image that's instantly out of date.
2. Use Mermaid. Copy the syntax. Pray it renders. Give up on anything complex.
3. Screenshot a whiteboard. Suffer the embedded photo aesthetic.

None of these feel like Notion. They feel like workarounds.

Skissify is a fourth option — and it's the first one that works with AI.

---

## The Workflow

Here's what you can do today with Skissify + Claude Desktop:

1. Open Claude Desktop (with `npx skissify-mcp` in your config)
2. Type: "Sketch the architecture of a 3-service backend: API gateway, auth service, database"
3. Claude builds the JSON manifest and calls Skissify
4. You get a public sketch URL
5. Paste the URL into Notion as an embed

The sketch lives at `skissify.com/s/[id]`. It's a real URL. It renders inline in Notion's `/embed` block. It looks like something a senior developer drew during a whiteboard session.

It takes about 90 seconds.

---

## Why Hand-Drawn Beats Screenshot in Notion

Notion is a thinking tool. The aesthetic matters.

A polished Figma diagram in a Notion page signals "this is done". A hand-drawn sketch signals "this is how we think it works — open to discussion". That difference matters enormously in collaborative docs.

Architecture decision records (ADRs), system design proposals, brainstorming pages — these are the documents where hand-drawn is *better* than polished. The wobble communicates the right amount of confidence.

---

## For Teams: The Automated Diagram Workflow

If you're running an AI-augmented team, here's the more powerful version:

1. Your AI agent generates an architecture proposal in JSON
2. It calls `POST https://skissify.com/api/render` (no auth required)
3. It creates/updates a Notion page via the Notion API, embedding the sketch URL
4. The diagram is always current — regenerated when the architecture changes

This is what "living documentation" actually looks like in 2026.

---

## Setting It Up

**One-time setup (2 minutes):**

Add to your Claude Desktop `claude_desktop_config.json`:
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

**In Notion:** Use the `/embed` block. Paste the Skissify URL. Done.

**Via API:** `POST https://skissify.com/api/render` with your JSON manifest. Returns `{ url: "https://skissify.com/s/..." }`.

---

## Notion Community Templates (Coming)

We're building shareable Notion templates for common use cases:
- Software architecture docs with embedded Skissify diagrams
- Home renovation planning pages with auto-generated floor plan sketches
- Meeting notes with freehand sketches attached

If you want early access, email [jesper@skissify.com](mailto:jesper@skissify.com).

---

## The Bigger Picture

Notion + Skissify represents a category of tool combinations that's becoming standard in 2026: AI writes, AI draws, humans review.

Your docs stop being something you maintain. They become something that stays current automatically, because the AI that understands your system can also sketch it.

That's the missing diagram layer. And it fits in a 1200×630 embed block.

---

*Skissify is free to use. MCP server: `npx skissify-mcp`. API: `POST skissify.com/api/render`. Human editor: [skissify.com](https://skissify.com).*
