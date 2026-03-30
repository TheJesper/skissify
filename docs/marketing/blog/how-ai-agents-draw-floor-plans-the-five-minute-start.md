# How AI Agents Draw Floor Plans — From Zero to Sketch in 5 Minutes

*Published: March 31, 2026 (Show HN Day) — Cross-post: Dev.to, HN comments, r/SideProject*
*~1,000 words | 4 min read | Tag: #AI #MCP #Agents #FloorPlan*

> **TL;DR:** Claude can draw a floor plan in your chat window. No image generation. No Stable Diffusion. Pure structured JSON → hand-drawn sketch rendering. Here's exactly how to set it up.

---

The question I get most after demos:

**"How does it actually work? Is it image generation?"**

No. It's nothing like image generation. Let me show you.

---

## What's Actually Happening

When you ask Claude to draw a floor plan via Skissify, here's the sequence:

1. Claude calls the `generate_sketch` tool (registered via MCP server)
2. The tool call includes a JSON payload: element list with positions, labels, types
3. Skissify's API receives that JSON
4. The wobble engine renders each element with controlled imprecision
5. Returns a permanent URL — no login, no session, just a URL

**The LLM never touches pixels.** It generates a data structure. Skissify renders it.

This is a critical architectural distinction. The LLM's job is to reason about spatial relationships and express them as JSON. Skissify's job is to make that JSON look like a sketch.

---

## The 5-Minute Setup (Claude Desktop)

**Prerequisites:** Claude Desktop installed, `npx` available.

**Step 1:** Add to `claude_desktop_config.json`:

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

**Step 2:** Restart Claude Desktop.

**Step 3:** Open a new conversation. Type:

```
Draw a floor plan for a one-bedroom apartment, approximately 50m². 
Include: bedroom, living room, kitchen, bathroom, hallway.
Use realistic proportions. Label each room.
```

**Step 4:** Watch Claude call `generate_sketch`. A URL appears. Click it.

**Result:** Hand-drawn floor plan, pencil-on-paper aesthetic, permanent URL you can share.

---

## Why the Schema Matters More Than the Model

We tested 200+ floor plan generations across Claude, GPT-4o, Gemini, and Mistral.

The single biggest accuracy predictor wasn't the model. It was the schema.

**Hierarchical JSON (rooms containing elements):** ~58% first-try accuracy  
**Flat element list (absolute coordinates, type discriminator):** ~94% first-try accuracy

The difference: nested schemas require the LLM to track coordinate transformations between levels. If it miscalculates at one level, errors compound down. Flat schemas give the LLM one coordinate system to reason about.

We designed Skissify's schema flat. This is why it works with models that can't reliably generate spatial output in other tools.

---

## What AI Agents Do With This

Beyond the "cool demo" use case, here's where this becomes genuinely useful:

**Multi-step design workflows:**
Agent 1 generates initial floor plan from requirements → saves URL  
Agent 2 reads URL, decodes JSON, modifies room sizes → new URL  
Agent 3 receives final URL for documentation

The URL is the intermediate representation. No image regeneration. No information loss between agents.

**Real estate automation:**
AI parses listing description → generates rough floor plan for listings without diagrams  
No accuracy guarantee, but "rough impression" is explicitly what hand-drawn signals

**Architecture pre-briefing:**
Client describes renovation via chat → AI generates sketch → contractor quotes from sketch  
The aesthetic prevents over-literal interpretation

**Education:**
Geometry teacher describes shape → AI generates spatial exercise → students see labeled diagram

---

## The Non-Technical Version

You don't need to understand JSON schemas to use this. The Human Mode at `skissify.com/human` takes natural language:

> "Draw a cozy studio apartment for one person, include a sleeping nook, open kitchen, and a desk area by the window."

Describe it. Get a sketch URL. Share it. That's it.

---

## The API (If You're Building)

```
POST https://skissify.com/api/sketch
Content-Type: application/json

{
  "elements": [
    { "type": "room", "x": 50, "y": 50, "width": 200, "height": 150, "label": "Living Room" },
    { "type": "room", "x": 50, "y": 200, "width": 100, "height": 100, "label": "Kitchen" },
    { "type": "door", "x": 150, "y": 50, "width": 20, "height": 20 }
  ],
  "style": "pencil",
  "paper": "cream"
}
```

Returns: `{ "url": "https://skissify.com/s/abc123", "expires": null }`

Permanent URL. Free tier is unlimited public sketches.

---

*Skissify is live today. Free. No signup for public sketches. MCP server: `@skissify/mcp-server`*

*Questions? Show HN thread or jesper@skissify.com*
