# The Schema Design Insight That Changed Everything

*Author: Jesper | Category: Technical | Published: April 1, 2026*

---

I almost shipped the wrong API.

For the first three weeks of building Skissify, the JSON schema for defining a sketch looked like this:

```json
{
  "canvas": {
    "dimensions": {
      "width": 800,
      "height": 600
    },
    "elements": {
      "rooms": [
        {
          "properties": {
            "label": "bedroom",
            "geometry": {
              "position": { "x": 100, "y": 100 },
              "size": { "width": 200, "height": 150 }
            }
          }
        }
      ]
    }
  }
}
```

It seemed logical. Hierarchical. Self-documenting.

The problem: LLMs got it right **61% of the time on first try**.

That means if you're an AI agent and you call my API, there's a 4-in-10 chance you get a bad sketch on your first attempt. You either retry (more tokens, more latency) or you fail silently and show the user something wrong.

61% is not a shipping threshold.

---

## The Flat Schema Experiment

I flattened everything.

Instead of nested properties with nested geometry with nested position — one flat object per element:

```json
{
  "elements": [
    {
      "type": "room",
      "label": "bedroom",
      "x": 100,
      "y": 100,
      "width": 200,
      "height": 150,
      "style": "sketch"
    }
  ]
}
```

Same information. No nesting beyond one level.

First-try accuracy jumped to **94%**.

The same LLMs that were getting it wrong 4 times in 10 were now getting it right 9 times in 10.

---

## Why This Happens

LLMs are trained on massive amounts of structured data — JSON, XML, YAML, markdown tables. The training distribution includes a lot of flat structures.

More importantly: attention mechanisms don't love deep nesting. When you ask a model to generate deeply nested JSON, the "what goes here" problem compounds at every layer. A flat structure has one layer of semantic decision-making. A nested structure has many.

This isn't just an observation from Skissify. It generalizes.

**If you're designing an API for LLM consumption, flatten the schema.**

The cognitive load on the model correlates with the depth of the nesting. Reduce depth, reduce errors.

---

## Schema Design Is Product Design

This is the insight I keep coming back to.

For human developers, you can get away with complex schemas because humans can hold context across deeply nested structures. They read documentation. They have persistent memory across a session.

LLMs are stateless within a single call. The entire schema has to be inferable from local context. Flat schemas provide that context cleanly.

The implication for AI-native API design:
1. **Prefer arrays of flat objects** over trees of nested properties
2. **Use consistent field names** — if it's always `label`, never sometimes `name` and sometimes `title`
3. **Put type information first** — the model decides what to fill in based on `type` before it fills anything else
4. **Avoid optional nesting** — either a field is always present or it doesn't exist

---

## What Changed in the Product

After the schema change, three things improved:

**1. Agent integration time dropped.** Developers using the API told me they got it working faster. The schema was just... obvious.

**2. Retry rates dropped.** In server logs, the number of requests that look like retries (same session, slight variations) decreased significantly.

**3. Novel use cases appeared.** When your API is easy to call correctly, people start using it for things you didn't anticipate. Floor plans became wireframes became org charts became D&D dungeon maps. The shape of the schema accommodated all of it.

---

## The Broader Principle

Every API gets called by a human developer once. If your product works, it gets called by AI agents thousands of times after that.

The developer writes the integration. The agent executes it.

Design for the agent.

Flat schemas. Consistent field names. Obvious types. Minimal optionality.

That's the lesson from Skissify. Probably the most generalizable thing I've built into the product, because it's really just a principle about how to design for LLMs.

---

Skissify is live today on Product Hunt. If you want to test the schema: **skissify.com/editor** or `npx skissify-mcp` for Claude Desktop.

---

*Tags: #APIDesign #LLMEngineering #MCP #AIAgents #BuildInPublic #DevTools #SchemaDesign*
