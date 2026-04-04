# How AI Agents Can Draw Floor Plans (Without You Describing Every Wall)

*Cycle 135 — April 5, 2026 — Angle: The surprising people using AI floor plans — renovators, game masters, real estate agents*

---

When I built the AI floor plan feature into Skissify, I expected the users to be developers. Agent pipeline builders. People who care about JSON schemas and MCP servers and deterministic rendering.

I wasn't wrong. But I was incomplete.

The first week of user data showed three audiences I hadn't designed for at all:

1. **Homeowners renovating spaces** — describing their kitchen to an AI and getting a shareable layout sketch to show their contractor
2. **Tabletop RPG game masters** — generating dungeon maps by describing room connections to Claude
3. **Real estate agents** — sketching described properties for clients who can't see the floor plans yet

None of these people know what JSON is. None of them care. They found /human mode (skissify.com/human), typed a description, and got a sketch. That's the whole interaction.

This post is about how the floor plan feature works for all three audiences — technical and not.

## Why AI + Floor Plans Is a Natural Pair

Language models are quietly exceptional at spatial reasoning. Claude understands "the kitchen is along the north wall with a peninsula island" and can translate that into structured spatial coordinates with consistent proportions.

The problem has always been the output format. Text descriptions of spaces are nearly impossible to evaluate. "The bedroom is 4m × 3.5m with a window on the east wall" is precise and useless — nobody can react to it productively in the moment you need feedback.

A sketch resolves this. The same information, visual form, immediately shareable.

## For Non-Developers: The /human Mode

Go to skissify.com/human.

Type: "35 sqm apartment with open-plan kitchen and living room, one bedroom with en-suite bathroom, small entrance hallway."

Click render.

You get a hand-drawn sketch URL in about 150ms. Share it via link, download it, or embed it. No account required.

The sketch looks intentionally rough — hand-drawn style with slight wobble on the lines — because that's the right signal for a first draft. It says "this is a starting point, help me refine it."

That's the homeowner, game master, and real estate use case. No code. No configuration. Just describe and sketch.

## For Developers: The API Path

The REST API accepts a flat JSON manifest and returns a sketch URL:

```bash
curl -X POST https://api.skissify.com/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "cream",
    "tool": "pencil",
    "wobble": 0.4,
    "elements": [
      { "type": "rect", "x": 50, "y": 50, "w": 320, "h": 220, "label": "Living Room" },
      { "type": "rect", "x": 370, "y": 50, "w": 160, "h": 220, "label": "Kitchen" },
      { "type": "rect", "x": 50, "y": 270, "w": 200, "h": 160, "label": "Bedroom" },
      { "type": "door-symbol", "x": 50, "y": 240, "angle": 90 },
      { "type": "window", "x": 180, "y": 50, "length": 80 }
    ]
  }'
```

Response: `{ "url": "https://skissify.com/s/abc123", "renderTime": 147 }`

That URL is permanent, shareable, and version-controllable. Same manifest always returns the same sketch.

## For Claude Users: The MCP Server

The fastest integration for Claude is the MCP server:

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

Add this to your Claude Desktop config. Now say to Claude: "Design a floor plan for a home office with a standing desk zone, a video call corner, and storage along one wall."

Claude will call `skissify_render` and return a sketch URL directly in the chat. No context-switching, no browser tab, no copy-paste.

## For No-Code Builders: n8n in 20 Minutes

If you want to automate this — let users submit a text description via form and automatically receive a floor plan sketch — n8n does it with four nodes:

1. **Webhook** — receives the user's room description
2. **HTTP Request → Claude API** — sends the description with a system prompt: "Generate a Skissify JSON manifest for this space"
3. **HTTP Request → Skissify API** — POST the manifest, get the URL
4. **Respond to Webhook** — returns the sketch URL to the user

Setup time: 20 minutes. The system prompt reliably gets Claude to generate valid Skissify JSON because the schema is flat and well-documented.

The n8n workflow JSON is available on request — post a comment or DM if you want it.

## The Dungeon Map Use Case (My Favorite)

This one surprised me. A tabletop RPG community on Reddit found Skissify through a post about AI game mastering tools.

They're using Claude to generate dungeon layouts: "A dungeon with an entrance room, a guard room connected by a narrow corridor, a treasury room with a locked door, and a boss chamber."

Claude generates a Skissify manifest. The result is a rough, hand-drawn dungeon map that looks like something a medieval cartographer scratched on parchment. Players love it. The "hand-drawn" aesthetic is exactly right for the medium.

This is what happens when you build a primitive (JSON → hand-drawn sketch) and let people find their own applications.

---

*The common thread across all these use cases: language models understand space, but need a rendering layer to make that understanding visible. Skissify is that layer — deterministic, fast, and designed to look like a first draft.*

→ [Try Skissify](https://skissify.com) — human mode requires no account, API and MCP server are free tier up to 100 renders/month.

---

*Tagged: ai, agents, mcp, automation, flooorplan, no-code, n8n, langchain*
