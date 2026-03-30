# How AI Agents Draw Floor Plans: The Product Hunt Eve Deep Dive

*Published March 30, 2026 — T-14h to Product Hunt*

Tomorrow morning at 09:00 CET (00:01 PST), Skissify goes live on Product Hunt.

This is the technical deep-dive I've been wanting to write since we launched five days ago. The one that explains exactly how the floor plan generation works, what we learned from 200+ test sketches, and why the schema design is 90% of the product.

If you're an agent developer, this is for you.

---

## The core problem: LLMs can't see what they draw

Here's the challenge nobody talks about when you try to make an LLM draw something.

The LLM has no visual output channel. It generates text. Everything it produces has to be text — and then something has to turn that text into something visual.

Your three options are:
1. **Image generation** (DALL-E, Midjourney) — not deterministic, not inspectable, not structured
2. **SVG string** — technically a text output, but LLMs generate terrible SVGs. They hallucinate coordinates, forget closing tags, and produce degenerate paths
3. **Structured data → renderer** — the LLM generates JSON, a separate renderer draws it

We chose option 3. That choice is the entire product.

---

## The schema: everything lives here

The Skissify JSON schema is flat. Deliberately flat.

Early versions were hierarchical — rooms had walls, walls had corners, corners had coordinates. Seemed logical. Was a disaster.

LLMs with hierarchical schemas got confused about nesting depth. They'd place a room *inside* a wall. They'd forget to close arrays. Their first-try success rate was around 61%.

We flattened everything. Every element is a top-level item in a `shapes` array. Walls, doors, windows, furniture — all siblings.

Result: 94% first-try accuracy with Claude Sonnet. 88% with GPT-4o. 78% with Mistral Large.

That 33-point improvement (61% → 94%) came entirely from the schema decision, not the prompt.

---

## The schema in practice

Here's what a minimal floor plan looks like:

```json
{
  "paper": "napkin",
  "wobble": 4,
  "shapes": [
    {
      "type": "rect",
      "x": 100, "y": 100,
      "width": 400, "height": 300,
      "label": "living room"
    },
    {
      "type": "rect", 
      "x": 100, "y": 400,
      "width": 200, "height": 200,
      "label": "kitchen"
    },
    {
      "type": "door",
      "x": 200, "y": 100,
      "width": 40
    },
    {
      "type": "line",
      "x1": 100, "y1": 400,
      "x2": 500, "y2": 400,
      "label": "partition wall"
    }
  ]
}
```

That JSON becomes a hand-drawn floor plan sketch URL. The renderer applies wobble, paper texture, and style transforms to make it look like something drawn on a napkin.

The URL is shareable. It's base64-encoded JSON in the path. Any agent can decode it, modify it, and regenerate.

---

## The five real workflows

**Workflow 1: Homeowner briefing**

Homeowner describes room to Claude. Claude generates Skissify JSON. Claude calls the MCP tool with the JSON. Homeowner shares the sketch URL with their contractor. Contractor understands immediately.

This workflow emerged naturally — we didn't design for it. It works because rough sketches are exactly the fidelity contractors want. They don't need architectural drawings. They need to know which wall the homeowner wants moved.

**Workflow 2: Architecture first-pass**

Architect or PM describes spatial requirements ("I need a 3-bedroom apartment with open-plan living, around 80 sqm"). Claude generates a rough floor plan as a starting point for discussion. The plan is explicitly rough — it's a conversation starter, not a proposal.

**Workflow 3: Multi-agent pipeline**

Agent A (requirements) → Agent B (floor plan generator, produces Skissify URL) → Agent C (critique/refinement, decodes URL, modifies JSON, regenerates) → final URL stored as shared state.

The sketch URL works as agent memory because it's inspectable JSON, not a black-box image.

**Workflow 4: Dungeon map generation** *(unplanned)*

"Generate a dungeon map with 4 rooms, a boss chamber, and connecting corridors. Blueprint style." This works. The blueprint paper style + wobble algorithm produces something that looks exactly like a classic hand-drawn dungeon map. r/DnD found us.

**Workflow 5: Human Mode (no JSON required)**

Describe your room in plain text at skissify.com/human. Claude reads your description, generates the JSON internally, and produces the sketch. No developer skills required.

This is what unlocked the homeowner and dungeon master audiences.

---

## The wobble algorithm

The wobble is what makes it look hand-drawn instead of generated.

Each coordinate in every shape is offset by a sinusoidal distortion:

```
offset = amplitude × sin(frequency × position + phase)
```

Where amplitude and frequency vary per element type (walls have different wobble profiles than furniture), and phase is seeded from the element's position so identical elements look different.

The `wobble` parameter in the JSON (0-10) controls amplitude. 0 = perfectly crisp. 10 = aggressively shaky. 4-5 is the sweet spot for "this looks hand-drawn, not broken."

Paper styles (`napkin`, `blueprint`, `graph`, `textured`) change the background texture and line color. Blueprint style uses white lines on dark paper — this is what produces the dungeon map aesthetic.

---

## What we got wrong initially

1. **Hierarchical schema** — see above. Fatal for LLM accuracy.
2. **Trying to use SVG strings** — LLMs can't reliably produce valid SVGs. Abandoned after 2 days.
3. **Overloading shape types** — initial version had 12 shape types including "arch", "staircase", "balcony". The LLM struggled to choose. We collapsed to 6 types (rect, circle, line, door, window, text) and accuracy jumped.
4. **No schema validation** — early API returned 400 errors on invalid JSON, which gave agents no useful feedback. Now returns structured error messages with the specific failing field.

---

## MCP integration: 4 lines in Claude Desktop config

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

That's it. Restart Claude Desktop. Ask Claude to draw a floor plan. It calls the `create_sketch` tool and returns a URL you can click.

---

## Tomorrow's launch

We go live on Product Hunt at 09:00 CET (00:01 PST). It's April Fools Day. We picked that on purpose.

The April 1 framing is real: a lot of people will see Skissify and think it's a joke. "JSON to hand-drawn sketch? Is that real?" Then they'll try it. Then they'll be hooked.

We're betting that skepticism → curiosity → genuine use is a better funnel than the average PH launch.

Come find us tomorrow: **Product Hunt: Skissify**

---

**Best platforms:** Dev.to, r/mcp, r/AI_Agents, Hashnode  
**Publish:** Tonight or PH launch morning  
**Tags:** #MCP #AIAgents #BuildInPublic #ProductHunt #AprilFools #LLM #Claude
