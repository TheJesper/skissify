# Skissify Human Mode: The Version Without JSON

*Cross-post: Medium, Substack, Dev.to*  
*~1,400 words | 5 min read*

---

When I launched Skissify on Friday, the number one piece of feedback from non-developers was the same thing, said different ways:

"This is amazing. Do I have to write JSON?"

"Love this. Where do I type in plain English?"

"My contractor would love a floor plan from this. He doesn't know what JSON is."

Skissify's entire design was built around JSON input. JSON is machine-readable. JSON is precise. JSON is what lets AI agents generate sketches programmatically without any human in the loop. For the developer audience, JSON is a feature.

For everyone else, JSON is a wall.

So I'm building Human Mode.

## What Human Mode Is

Human Mode is a simple text field on the Skissify editor. You describe what you want in plain English. Skissify generates the JSON server-side and renders the sketch.

That's it.

```
"A small 2-bedroom apartment. Living room on the left, kitchen at the back, two bedrooms on the right, one bathroom."
```

→ JSON generated server-side  
→ Sketch renders  
→ You see your floor plan in hand-drawn style

No JSON visible. No schema to learn. No Claude Desktop required.

You can still see the generated JSON (there's a "show source" toggle for the curious), but you don't have to touch it.

## Why This Matters for Each Audience

**For homeowners:** The renovation planning workflow becomes completely self-service. No AI subscription needed, no JSON, no MCP setup. Just describe your room and see it drawn.

**For teachers:** Generate geometry worksheets by describing the floor plans you want. "A rectangle with dimensions 6m × 4m, a smaller rectangle attached on the east side, 2m × 3m." Instant hand-drawn diagram.

**For dungeon masters:** "A circular boss chamber with four columns, a double door on the north, a secret door on the west, a dais platform in the center." Hand-drawn dungeon map, no schema required.

**For AI developers:** Human Mode doesn't change your workflow at all. You keep using the MCP server, the API, and JSON directly. Human Mode is additive.

## The Technical Trade-off

Human Mode uses an LLM to generate JSON from your description. This has implications:

**Latency:** Add ~1-2 seconds for the LLM call. For a tool designed around instant rendering, this matters. We're optimizing the prompt to minimize tokens while maximizing reliability.

**Reliability:** LLM-generated JSON has ~94% first-try success (Claude Sonnet 4) on standard floor plan tasks. For Human Mode, we'll add a validation + retry layer: if the generated JSON fails schema validation, we silently retry with a corrected prompt. Target: 99%+ success rate for users, with errors never shown.

**Cost:** The Human Mode LLM call costs fractions of a cent per sketch. This is bundled into Pro plan pricing. Free tier will have a daily limit (10 Human Mode sketches/day) that's enough for normal use.

**Precision loss:** Natural language is inherently imprecise. "A small room" is vague in a way that `{"width": 3, "height": 4}` isn't. Human Mode sketches will be directionally correct but may need JSON fine-tuning for precise dimensions. We'll make the JSON editable immediately after generation.

## The Design Decision: Both, Not Either/Or

Some products make this choice: "we'll be for consumers OR for developers." We're not making that choice.

Skissify will always be JSON-native. That's the design axis that makes it useful for AI agent workflows. The moment we abandon JSON-first, we become just another drawing tool that happens to have an AI feature.

Human Mode sits on top of JSON. It generates JSON, it displays JSON (optionally), it lets you edit JSON after generation. Every Human Mode sketch is secretly a JSON sketch. The two modes are interoperable.

A homeowner sketches their room in Human Mode. They share the sketch URL with their contractor. The contractor opens it, tweaks the dimensions in JSON (or via Human Mode with specific numbers), saves a new version. Both workflows lived in the same tool.

## When It Ships

Human Mode is in active development now. Target: this week.

The feature is relatively simple technically — it's an additional API endpoint that takes text, calls an LLM with a validated prompt, and pipes the JSON through the existing rendering pipeline. The complexity is in the validation layer and the UX for handling failures gracefully.

Beta access: if you want to try it before launch, reply to this post or email jesper@skissify.com.

## The Bigger Picture

Human Mode is the first step in a longer direction: making the spatial sketch primitive accessible to anyone with an idea, not just anyone who can write JSON.

The "visual primitive" framing I keep using isn't just about AI agents. A primitive is accessible. A primitive lets you build from it. A primitive doesn't require expertise to use — it rewards it, but doesn't require it.

Human Mode makes the floor for Skissify lower. The ceiling stays the same.

---

*Jesper Landmér — founder of Skissify. skissify.com*
