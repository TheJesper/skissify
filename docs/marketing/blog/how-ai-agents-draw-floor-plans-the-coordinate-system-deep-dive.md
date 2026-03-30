# How AI Agents Draw Floor Plans: The Coordinate System Deep Dive

*The reason most LLMs fail at spatial tasks isn't the model — it's the schema. Here's what we learned from 200+ generations.*

**Published:** March 31, 2026  
**Author:** Jesper Lindström  
**Tags:** ai-agents, mcp, floor-plans, schema-design, technical

---

## The Spatial Output Problem

Ask Claude to describe an apartment layout in words. It does well.  
Ask Claude to generate SVG for an apartment layout. It struggles.  
Ask Claude to generate a CAD-style JSON for an apartment layout. It fails more.

This isn't a limitation of the model's intelligence. It's a limitation of schema design.

The spatial reasoning required to produce *coordinates* for a floor plan is fundamentally different from the reasoning required to produce *descriptions* of one. And yet most attempts to add drawing capability to AI agents treat them the same way.

**Skissify's core insight:** The schema design is more important than the model choice.

---

## What We Tested

Over 200+ floor plan generation attempts across GPT-4o, Claude 3.7 Sonnet, Gemini Pro 3, and Claude 3.5 Sonnet, we tested four schema approaches:

### Schema A: Hierarchical (Nested Rooms)
```json
{
  "floor": {
    "rooms": [
      {
        "id": "living",
        "walls": [
          {"from": [0, 0], "to": [400, 0]},
          {"from": [400, 0], "to": [400, 300]}
        ],
        "furniture": [...]
      }
    ]
  }
}
```

**First-try accuracy: ~58%**  
Why it fails: Models lose track of coordinate context when nesting. They drift between room-relative and absolute coordinates without realizing it.

### Schema B: Separate Layers
```json
{
  "walls": [...],
  "doors": [...],
  "furniture": [...],
  "labels": [...]
}
```

**First-try accuracy: ~71%**  
Better, but models still conflate which layer should contain which elements.

### Schema C: Flat Element List with Type Discriminator (Skissify)
```json
{
  "elements": [
    {"type": "wall", "x": 50, "y": 50, "width": 300, "height": 8, "label": "north wall"},
    {"type": "door", "x": 150, "y": 50, "width": 80, "height": 8, "label": "entry"},
    {"type": "rect", "x": 80, "y": 80, "width": 120, "height": 80, "label": "sofa"}
  ]
}
```

**First-try accuracy: ~94%**

### Why Schema C Wins

The flat element list with absolute coordinates eliminates the two main failure modes:
1. **Coordinate drift** — no parent-relative offsets to track
2. **Layer confusion** — no ambiguity about where elements belong

Every element is an object. Every object has absolute position. The LLM can generate them in any order and they'll compose correctly.

---

## The LLM Benchmark

| Model | Schema A (Hierarchical) | Schema C (Flat) | Delta |
|-------|------------------------|-----------------|-------|
| Claude 3.7 Sonnet | 64% | 96% | +32pp |
| GPT-4o | 61% | 93% | +32pp |
| Gemini Pro 3 | 55% | 91% | +36pp |
| Claude 3.5 Sonnet | 58% | 94% | +36pp |

**The schema improvement is larger than the model difference.** Upgrading your schema is higher leverage than upgrading your model.

---

## The Wobble Algorithm: Why Accuracy Doesn't Mean Sterile

Here's the part that surprises people: the sketch looks hand-drawn even though the coordinates are precise.

Skissify applies a wobble algorithm on the rendering side:
- Amplitude: 0–8px (tunable per paper style)
- Frequency: randomized per segment
- Seed: stored in the URL for reproducibility

The AI agent produces precise JSON. The renderer applies deliberate imprecision. The result looks like a sketch rather than a technical diagram.

This isn't cosmetic. The hand-drawn aesthetic changes how humans interpret and engage with the output — it signals exploration-phase work, not final design. Same principle as whiteboard photos in product discussions.

---

## Adding to Your Agent Stack

Three ways to integrate:

**1. MCP Server (Claude Desktop)**
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

**2. REST API (any agent framework)**
```python
import requests

def generate_sketch(elements):
    response = requests.post(
        "https://api.skissify.com/v1/sketch",
        json={"elements": elements, "style": "blueprint"}
    )
    return response.json()["url"]
```

**3. Human Mode (no JSON)**
```
POST /v1/human
{"description": "2-bedroom apartment, open kitchen, living room south side"}
```

Returns a URL. That URL is permanent, shareable, and contains the full JSON in the hash — making it inspectable and mutable by downstream agents.

---

## When to Use Floor Plan Generation

| Use Case | Schema Approach | Model Rec |
|----------|----------------|-----------|
| Renovation brief for contractor | Human Mode → flat JSON | Claude 3.7 Sonnet |
| Agent-generated spatial memory | Flat JSON, programmatic | Any (flat schema wins) |
| Interactive exploration | Human Mode + iterative refinement | Claude 3.7 Sonnet |
| Batch generation (dungeon maps, etc.) | REST API, flat JSON | GPT-4o (cost) |
| Education (geometry, spatial reasoning) | Human Mode | Any |

---

## The Takeaway

Most AI spatial output fails because of schema design, not model capability. Flat element lists with absolute coordinates, a type discriminator, and a permanent URL output is the right architecture.

The 200+ production tests that validated this are now embedded in the Skissify schema. You inherit the learning by using the API.

---

*Skissify: JSON schema → hand-drawn sketch → permanent URL. MCP server for Claude Desktop. Free tier at [skissify.com](https://skissify.com). npm: `@skissify/mcp-server`.*
