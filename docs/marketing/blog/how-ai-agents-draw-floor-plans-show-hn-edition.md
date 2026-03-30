# How AI Agents Can Draw Floor Plans (Show HN Edition)

*Published: Tuesday March 31, 2026 · Show HN day · 5 min read*

---

Six months ago, if you asked an AI agent to "draw a floor plan," it would write a description of one.

Today, you can get an actual hand-drawn sketch URL back in under a second.

This post explains exactly how that works — and why it matters for anyone building AI agents.

## The Problem This Solves

AI agents are great at generating text. They can describe a room layout in detail:

> "The apartment has a bedroom in the top-left corner, approximately 3x4 meters, adjacent to a bathroom 2x2 meters. The main hallway runs centrally..."

But nobody can use that. Your contractor can't work from it. Your client can't approve it. Another agent in your pipeline can't parse it.

The output needs to be *visual*.

## How Skissify Works

Skissify is an API that converts structured JSON (or plain English via Human Mode) into a hand-drawn sketch URL.

### REST API (JSON input)

```json
{
  "style": "napkin",
  "elements": [
    {"type": "rect", "x": 50, "y": 50, "width": 200, "height": 150, "label": "Bedroom"},
    {"type": "rect", "x": 250, "y": 50, "width": 100, "height": 150, "label": "Bathroom"},
    {"type": "rect", "x": 50, "y": 200, "width": 300, "height": 100, "label": "Living Room"}
  ]
}
```

Returns: `{"url": "https://skissify.com/s/abc123", "embed": "..."}`

That URL is permanent, shareable, embeddable.

### Human Mode (plain English)

```
POST /human
{"text": "small apartment: bedroom top-left, bathroom top-right, open kitchen-living bottom"}
```

Same output. No JSON schema knowledge required.

### MCP (Claude Desktop / agent frameworks)

```bash
npm install -g @skissify/mcp-server
```

Once installed, Claude can call `skissify_draw` as a native tool. When you ask Claude to draw a floor plan, it does.

## Four Real Agent Workflows

### 1. Homeowner → Contractor Brief

A homeowner tells Claude what they want in their renovation. Claude generates a Skissify sketch. The homeowner shares the URL with their contractor. No ambiguity.

```
User: "I want to knock down the wall between kitchen and dining room and add an island"
Claude: [calls skissify_draw → returns URL]
Claude: "Here's the layout I'm imagining: [URL]"
```

### 2. Real Estate Agent → Listing Visual

An n8n automation pulls property descriptions from a CRM. For each property, it POSTs to Skissify and gets a floor plan sketch. Attaches it to the listing. No photographer needed for a quick orientation sketch.

### 3. Geometry Teacher → Worksheet

A Mastra TypeScript agent generates math problems. When the problem involves shapes, it calls Skissify to draw them. The worksheet has real diagrams.

### 4. Dungeon Master → Campaign Map

A CrewAI agent builds a D&D dungeon room-by-room. It calls Skissify for each room. The DM reviews a visual map of the dungeon layout.

## The Technical Insight: Why Flat JSON?

Early versions of Skissify used nested JSON schemas. LLM accuracy was ~60% on first try.

Switching to a flat list of primitives (all shapes at the same level, absolute coordinates, no hierarchy) pushed accuracy to **94% for Claude** and **88% for GPT-4o**.

The reason: LLMs think in lists. When you ask a model to "fill in a nested tree," it has to maintain context about where in the tree it is. Flat lists eliminate that cognitive overhead entirely.

```json
// Bad (nested - 60% accuracy)
{
  "rooms": [
    {"type": "bedroom", "walls": {"top": {...}, "bottom": {...}}}
  ]
}

// Good (flat - 94% accuracy)
[
  {"type": "rect", "x": 50, "y": 50, "w": 200, "h": 150, "label": "Bedroom"}
]
```

This is a schema design lesson that applies beyond Skissify: **flat is better for LLM output**.

## Why Sketches and Not Screenshots

A Skissify URL is not an image stored in an S3 bucket. It's a **declarative sketch** — the geometry is encoded in the URL itself.

This means:
- The URL is deterministic and reproducible
- You can modify the sketch by changing the URL parameters
- An agent can read back what's in the sketch
- It survives link rot differently than hosted images

The sketch URL is spatial memory that's both human-readable and machine-parseable.

## Try It Now

**Human Mode (no account required):**
→ [skissify.com/human](https://skissify.com/human) — type any room description

**MCP install (for Claude Desktop):**
```bash
npm install -g @skissify/mcp-server
```

**API docs:**
→ [skissify.com/docs](https://skissify.com/docs)

---

This is what we submitted to Show HN today. If you found this useful, the HN thread is the best place to share feedback.

*Skissify — "Every AI agent can talk. Now they can draw."*
