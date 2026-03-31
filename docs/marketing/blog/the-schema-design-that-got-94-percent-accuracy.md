# The Schema Design That Got 94% First-Try Accuracy from LLMs

*Technical deep-dive — for HN, r/LocalLLaMA, r/mcp, and agent builders*
*~1,800 words | Category: AI Engineering | Tags: LLM, schema design, JSON, accuracy, MCP*

---

When I started building Skissify, I ran into a frustrating problem that I've never seen written up properly.

LLMs are quite good at spatial reasoning. Ask Claude to describe a floor plan and it'll tell you a coherent room layout with sensible proportions. The problem was getting it to **output structured JSON** that a renderer could actually consume — consistently, on the first try, without manual correction.

My first schema had ~40% first-try success. My final schema has ~94%.

The difference was entirely in schema design, not in prompting.

---

## Why This Matters

If you're building any AI agent that needs to output structured data — and especially if you're building one that creates spatial or visual artifacts — the schema you define is more important than the model you use or the prompt you write.

Most people spend time tuning prompts. Almost nobody spends time tuning schemas. This is backwards.

---

## The First Attempt (40% Success)

My initial schema was hierarchically organized and felt "logically clean" to a developer:

```json
{
  "canvas": {
    "settings": {
      "paper": "cream",
      "tool": "ballpoint",
      "wobble": {
        "amplitude": 0.8,
        "frequency": 1.2,
        "humanness": 5
      }
    },
    "layers": [
      {
        "name": "walls",
        "elements": [
          { "type": "wall", "from": {"x": 0, "y": 0}, "to": {"x": 200, "y": 0} },
          { "type": "wall", "from": {"x": 200, "y": 0}, "to": {"x": 200, "y": 150} }
        ]
      },
      {
        "name": "doors",
        "elements": [
          { "type": "door", "position": {"x": 50, "y": 0}, "width": 30, "orientation": "north" }
        ]
      }
    ]
  }
}
```

This looks sensible. A developer would read it and think: "Yes, layers make sense for organizing element types. The nested coordinate objects are explicit. The settings are grouped logically."

LLMs disagreed. Common failure modes:
- Forgetting to close nested objects, leaving invalid JSON
- Conflating "from/to" coordinates with "x/y" coordinates elsewhere in the schema
- Inventing new layer names not in the spec
- Getting the `wobble` nesting wrong (mixing up which level it belonged to)
- Generating valid JSON that was structurally correct but referenced non-existent types

---

## The Insight: Flat Beats Nested for LLM Generation

The fundamental problem with hierarchical schemas is **depth**. Every level of nesting is a cognitive load unit for the model. A model generating deeply nested JSON has to track:

1. How deep am I currently?
2. Which parent context am I in?
3. Have I closed all the parent brackets?
4. Does the property name I'm about to write belong to this scope?

Human developers handle this with syntax highlighting, autocomplete, and years of visual pattern recognition. LLMs handle it with context window attention — and deeply nested structures are harder to attend to correctly than flat ones.

The solution was radical flattening:

```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "amplitude": 0.8,
  "elements": [
    { "type": "wall", "x1": 0, "y1": 0, "x2": 200, "y2": 0 },
    { "type": "wall", "x1": 200, "y1": 0, "x2": 200, "y2": 150 },
    { "type": "door-symbol", "x": 50, "y": 0, "w": 30, "side": "top" }
  ]
}
```

Every element is a flat object. Every coordinate is a direct property. The top-level is flat except for the `elements` array.

First-try accuracy after this change: **from ~40% to ~72%**.

---

## The Second Insight: Reduce Optional Fields

The next problem was optional fields. My schema had many properties that were optional, with sensible defaults:

```json
{
  "type": "rect",
  "x": 50, "y": 50, "w": 200, "h": 150,
  "fill": "transparent",  // optional, defaults to transparent
  "stroke": "#000",       // optional, defaults to black
  "strokeWidth": 1,       // optional, defaults to 1
  "opacity": 1,           // optional, defaults to 1
  "rotation": 0,          // optional, defaults to 0
  "rx": 0,                // optional, corner radius
  "ry": 0                 // optional, corner radius y
}
```

LLMs consistently tried to fill in every optional field. When filling in defaults, they frequently made mistakes — wrong property names, wrong value types, undefined values copied from adjacent elements.

The fix: **if you have good defaults, don't include optional fields in the schema spec at all.** Remove them from examples entirely.

The revised element:

```json
{ "type": "rect", "x": 50, "y": 50, "w": 200, "h": 150 }
```

That's it. Four properties, all required. No optional noise.

Accuracy after removing optional fields from the spec: **from ~72% to ~85%**.

---

## The Third Insight: Use Concrete Dimensions, Not Relative Proportions

A subtle but important failure mode: LLMs asked to generate a floor plan would sometimes output *proportionally correct* layouts using values like:

```json
{ "type": "rect", "x": 0.1, "y": 0.1, "w": 0.5, "h": 0.3 }
```

...where they were apparently using proportions (0-1 scale) rather than the actual pixel coordinates the renderer expected (0-800 scale). The model was "reasoning proportionally" which feels correct, but the renderer had no way to distinguish this from integer coordinates.

The fix: **always specify coordinate units explicitly in your schema description, and include examples with realistic concrete numbers.**

Instead of:
> `x`: X position (number)

Write:
> `x`: X position in pixels. Canvas is 800×600. A room typically spans 100–300px. Use concrete pixel values, not proportions.

Include examples showing a floor plan with realistic 800×600 coordinates:
```json
{ "type": "rect", "x": 50, "y": 80, "w": 280, "h": 200, "label": "Living Room" }
```

After this change: **~94% first-try accuracy** across Claude Sonnet, Claude Haiku, GPT-4o, and Gemini 1.5 Pro.

---

## Results Across Models

After all three changes (flat schema, minimal optional fields, concrete coordinates), I ran 200+ test generations across 7 models:

| Model | Before (nested schema) | After (flat schema) |
|-------|------------------------|---------------------|
| Claude 3.7 Sonnet | 52% | 97% |
| Claude 3.5 Haiku | 41% | 92% |
| GPT-4o | 49% | 95% |
| GPT-4o-mini | 33% | 87% |
| Gemini 1.5 Pro | 45% | 94% |
| Llama 3.1 70B | 31% | 83% |
| Mistral Large | 28% | 76% |

"Success" = valid JSON that renders correctly on first attempt, no manual correction.

The performance gap between models narrows dramatically with flat schemas. Llama 3.1 70B at 83% is usable — it was nearly unusable at 31%.

---

## The MCP Tool Description Matters Too

When using Skissify via MCP, Claude generates the JSON in response to natural language prompts. The tool description in the MCP schema is essentially your system prompt for generation.

We found that the tool description format made a significant difference:

**Low accuracy description:**
```
Creates a hand-drawn sketch from a JSON manifest. The manifest contains paper settings and an array of elements to render.
```

**High accuracy description:**
```
Renders a hand-drawn sketch. Input: flat JSON with top-level fields (paper, tool, amplitude) and an "elements" array. Each element is a flat object: {type, x, y, w, h, label}. Canvas: 800x600px. Types: rect, wall, door-symbol, door-slide, window, stair, text, arrow, line, circle, dim, column. Start with rooms (large rects), then doors/windows on walls, then furniture (smaller rects), then labels. Do not nest objects. Do not use proportional values — use concrete pixel coordinates.
```

The second version reduced errors by ~60%. The key additions:
- Explicit canvas dimensions
- Generation order hint (rooms first, then doors, then furniture)
- Explicit prohibition on nesting and proportional coordinates

---

## Generalizable Principles

These insights apply far beyond Skissify. If you're designing any schema for LLM-generated output:

1. **Flat > nested.** Every level of nesting is an error surface.
2. **Required > optional.** Defaults are handled by your code, not the model.
3. **Concrete > abstract.** Examples with real values outperform descriptions with type names.
4. **Explicit constraints in the description.** Tell the model what NOT to do, not just what to do.
5. **Include generation order hints.** LLMs generate left-to-right. If there are natural ordering dependencies in your schema (scaffold before details), say so.

---

## Why I'm Publishing This

Skissify launched today (April 1, 2026 — yes, real). The 94% accuracy number is one of our clearest technical differentiators, and I'd rather have a transparent conversation about how we got there than just assert it.

If you're building agents that need structured output, I hope this saves you some time.

The tool itself: [skissify.com](https://skissify.com) — free API, no auth, try it with a curl command.

---

*Jesper / skissify.com*
*Tags: #LLM #AIAgents #SchemaDesign #JSONSchema #MCP #ShowHN #BuildInPublic*
