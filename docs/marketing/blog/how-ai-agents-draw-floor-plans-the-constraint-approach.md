# How AI Agents Draw Floor Plans: The Constraint Approach (Why Less Schema = More Accuracy)

The most counterintuitive thing I learned building Skissify:

**The simpler you make the JSON schema, the better AI agents perform.**

Not marginally better. Significantly better. Switching from a hierarchical schema to a flat list took Claude's first-try success rate from ~60% to 94%.

Here's why — and what it means for anyone building AI-native tools.

---

## The Problem With "Smart" Schemas

When I designed the Skissify schema, my first instinct was to model the domain correctly:

```json
{
  "building": {
    "floors": [
      {
        "rooms": [
          {
            "id": "living-room",
            "children": ["sofa", "tv-wall"],
            "walls": {
              "north": { "length": 4.5, "openings": [...] }
            }
          }
        ]
      }
    ]
  }
}
```

This is how a software architect would model a building. It's hierarchically correct. Parent-child relationships are explicit. References are clean.

**LLM first-try success: ~58%.**

The failures weren't random. The model would:
- Forget to close nested objects
- Generate rooms that referenced non-existent parent IDs
- Lose track of nesting depth mid-generation

---

## Why Nesting Hurts LLM Performance

Large language models generate tokens sequentially, left to right. They have an implicit "cursor" tracking where they are in a structure.

With a flat list, each element is a self-contained unit:

```json
{ "type": "room", "x": 50, "y": 50, "width": 200, "height": 150, "label": "Living Room" }
```

Generate the object. Close it. Next element. No tracking required.

With a nested structure, the model must maintain a mental stack:
- "I'm inside `building`"
- "I'm inside `floors[0]`"
- "I'm inside `rooms[2]`"
- "I'm inside `walls.north`"
- "I'm inside `openings[0]`"

At any point, one mistake — a missed closing bracket, an incorrect nesting level — corrupts everything that follows.

This isn't about the model being "bad" at JSON. It's about sequential generation being fundamentally misaligned with hierarchical tree traversal.

---

## The Flat Schema That Works

The Skissify schema that gets 94% first-try accuracy:

```json
{
  "paper": "cream",
  "wobble": { "amplitude": 3, "frequency": 4, "humanness": 0.5 },
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "width": 200, "height": 150, "label": "Living Room" },
    { "type": "rect", "x": 50, "y": 230, "width": 100, "height": 100, "label": "Bedroom" },
    { "type": "door-symbol", "x": 100, "y": 50, "width": 60, "height": 20 },
    { "type": "window", "x": 200, "y": 50, "width": 80, "height": 15 },
    { "type": "dimension", "x": 50, "y": 10, "width": 200, "height": 10, "label": "4.0m" }
  ]
}
```

Key decisions:
- **Flat array, not tree.** Every element is a sibling.
- **Absolute coordinates only.** No relative positioning, no "percentage of parent."
- **Minimal required fields.** `type`, `x`, `y`, `width`, `height`. Everything else optional.
- **No foreign keys.** Elements don't reference other elements by ID.

---

## The Benchmark Data

I ran 200 floor plan generation prompts across 8 models:

| Model | First-Try Success |
|-------|-----------------|
| Claude Sonnet 4 | 94% |
| GPT-4o | 88% |
| Gemini 1.5 Pro | 85% |
| Claude Haiku | 78% |
| Mistral Large | 71% |
| Llama 3.3 70B | 68% |
| Qwen 2.5 72B | 65% |
| Mistral 7B | 52% |

The same test with the hierarchical schema dropped every model by 15-30 percentage points.

**Claude dropped from 94% to 62%.** GPT-4o dropped from 88% to 57%.

The schema design is doing as much work as the model choice.

---

## The Spatial Coherence Problem

There's a second axis where models differ: **spatial coherence**. A schema-valid response can still be geometrically wrong — a bedroom that overlaps a bathroom, a door placed outside any wall, rooms that don't fit within the building perimeter.

Claude Sonnet 4 almost never makes spatial coherence errors. Smaller models make them frequently.

This isn't about JSON formatting. It's about whether the model can hold a 2D spatial model in working memory while generating tokens.

Frontier models have meaningfully better spatial reasoning than models two or three tiers down. For production agent workflows that need reliable spatial output, this matters.

---

## The Prompt That Maximizes Success

Regardless of which model you use, this prompt structure dramatically improves results:

```
Using the Skissify JSON schema, design a [description].

Requirements:
- Use absolute pixel coordinates (canvas: 800×600)
- Every element needs: type, x, y, width, height
- Available types: rect, wall, door-symbol, window, stairs, dimension, text, column, circle, arrow
- Use simple rectangular rooms; avoid complex polygons
- Dimension lines are optional but add clarity

Return ONLY valid JSON. No markdown. No explanation.
```

The last line alone — "Return ONLY valid JSON. No markdown. No explanation." — fixes roughly 15% of failures across all models. Models love to wrap output in code fences or add explanatory text, and that breaks JSON parsers.

---

## What This Means for AI Tool Builders

If you're designing any JSON schema that an LLM will populate:

1. **Prefer flat over nested.** Unless hierarchy is genuinely required for your use case, a flat structure will outperform every time.

2. **Use absolute values, not relative ones.** "50% of parent width" requires tracking parent dimensions. Absolute pixel values don't.

3. **Minimize required fields.** The more an LLM needs to fill in, the more chances it has to fail. Make most fields optional with sensible defaults.

4. **Avoid foreign key references.** If elements reference each other by ID, the model must maintain a consistent ID namespace across a generation. This is error-prone.

5. **Test your schema with multiple models.** The schema that works great with Claude may fail at 60% with Mistral. Benchmark before committing.

---

The irony of AI-native tool design: the "right" schema for humans (expressive, hierarchical, semantically rich) is often the wrong schema for AI agents (flat, absolute, minimal). 

Building for agents means designing for sequential token generation, not for human readability.

---

**The MCP server:** `npm install -g @skissify/mcp-server`  
**Try Human Mode (no JSON):** [skissify.com/human](https://skissify.com/human)  
**Full schema docs:** [skissify.com/docs](https://skissify.com/docs)

*Show HN: Tuesday March 31, 09:00 CET — [skissify.com](https://skissify.com)*
