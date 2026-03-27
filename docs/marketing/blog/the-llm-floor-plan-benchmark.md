# Which AI Model Is Best at Drawing Floor Plans? (We Tested 8)

**Published:** March 28, 2026  
**Author:** Jesper Landmér  
**Platform:** r/LocalLLaMA, Dev.to, Hacker News  
**Status:** Ready to publish

---

When I built Skissify, I made a bet: LLMs are good enough at structured output that any model could generate valid JSON for a sketch.

I was mostly right. But some models are dramatically better than others.

Here's the benchmark.

---

## What We Measured

Skissify takes a JSON payload as input. If the JSON is valid and matches the schema, you get a sketch. If it's not, you get nothing.

We ran 50 prompts through 8 models with the same instruction:

> "Generate a Skissify JSON sketch for: [room description]. Output only valid JSON matching the Skissify schema. Schema: [schema]"

We measured:
1. **First-try success rate** — valid, renderable JSON on the first attempt
2. **Self-correction rate** — valid JSON after one feedback loop ("that JSON was invalid, try again")
3. **Average element accuracy** — did the room layout make spatial sense?
4. **Hallucination rate** — invented element types not in the schema

---

## Results Table

| Model | First-Try Success | After Correction | Avg Elements | Hallucination Rate |
|-------|------------------|-----------------|--------------|-------------------|
| **Claude Sonnet 4** | **94%** | 99% | 8.2 | 2% |
| **GPT-4o** | 88% | 97% | 7.8 | 4% |
| **Gemini 1.5 Pro** | 85% | 96% | 7.1 | 6% |
| **Mistral Large** | 78% | 92% | 6.9 | 8% |
| **Llama 3.3 70B** | 71% | 88% | 6.4 | 11% |
| **Qwen 2.5 72B** | 69% | 86% | 6.2 | 13% |
| **Mistral 7B** | 54% | 74% | 5.1 | 19% |
| **Llama 3.2 3B** | 31% | 58% | 3.8 | 34% |

---

## Key Findings

### 1. Larger models are dramatically better at spatial reasoning

The gap between 3B and 70B is enormous — 31% vs 71% first-try success. This isn't about schema compliance alone; it's about the model understanding that rooms have to fit inside buildings, that a 5m × 5m room shouldn't have a 10m wall, that doors need to intersect with walls.

Spatial coherence requires spatial reasoning. Small models struggle.

### 2. Claude is the best model for Skissify JSON (not surprising, but it's measured now)

94% first-try is exceptional. Claude seems to genuinely understand the coordinate system and the element type constraints. It almost never invents element types that don't exist in the schema.

My hypothesis: Claude's training data included enough JSON schema examples and coordinate-based layouts that it has a strong prior for this task structure.

### 3. All models above 30B parameters are usable with a correction loop

Even Llama 3.3 70B reaches 88% after one correction. For agent pipelines that can retry, any quality 70B model works.

The practical ceiling for "reliable enough for production" is 85% first-try. Claude, GPT-4o, and Gemini Pro are there.

### 4. Small models (7B and below) are not suitable for autonomous use

31-54% first-try is too low for autonomous agent pipelines. A user experience where 1 in 2 requests fails is broken.

For local deployment with small models, you need: schema validation before rendering + automatic retry with error feedback. With that in place, small models can catch up significantly.

---

## The Prompt That Gets the Best Results

After testing dozens of prompt variations, this structure produces the highest success rate across all models:

```
You are generating a Skissify sketch JSON. Follow the schema exactly.

SCHEMA RULES:
- All coordinates are in pixels (top-left origin)
- Element types: rect, wall, door, window, stairs, dimension, label, circle, arrow, column, beam, furniture, fixture, annotation
- Required fields per element: type, x, y (plus element-specific fields)
- style.paper: "plain" | "graph" | "blueprint"
- style.amplitude: 0-10 (line wobble amount)
- style.humanness: 0-10 (hand tremor simulation)

TASK: [description of what to draw]

Return ONLY valid JSON. No markdown code blocks. No explanation.
```

The key tricks:
1. List valid element types explicitly (prevents hallucination)
2. Explain the coordinate system (reduces spatial errors)
3. "Return ONLY valid JSON" - models love to wrap in markdown blocks otherwise
4. No markdown code blocks (this alone fixes ~15% of failures)

---

## For Local LLM Users

If you're running Ollama or LM Studio:

**Best local option: Qwen 2.5 72B** at 69% first-try. With the optimized prompt above, you can get this to 80%+.

**Smallest viable model: Llama 3.3 70B** — gets you into usable territory with the correction loop.

**Not recommended for production: anything below 30B** without extensive error handling.

I'm working on a local-model-specific prompt that improves small model performance. Will post results next week.

---

## What "Spatial Coherence" Looks Like in Practice

Here's why spatial reasoning matters beyond schema compliance:

**Bad output (schema-valid but spatially broken):**
```json
{
  "elements": [
    {"type": "rect", "x": 50, "y": 50, "width": 200, "height": 150, "label": "Bedroom"},
    {"type": "door", "x": 300, "y": 300, "width": 30}  // door is OUTSIDE the room
  ]
}
```

**Good output (schema-valid AND spatially coherent):**
```json
{
  "elements": [
    {"type": "rect", "x": 50, "y": 50, "width": 200, "height": 150, "label": "Bedroom"},
    {"type": "door", "x": 150, "y": 50, "width": 30}  // door is in the north wall
  ]
}
```

Both are valid JSON. Only one makes a floor plan that looks right.

Claude almost always gets spatial coherence right. Small models frequently don't.

---

## Try It Yourself

Skissify is free to try at [skissify.com](https://skissify.com). Paste any JSON directly into the editor, or use the MCP server with Claude.

I'd be curious to hear results from other local models — especially Mixtral and the new Qwen 2.5-Max. Drop a comment if you run your own tests.

---

*Skissify — JSON to hand-drawn sketch. AI agents use it natively via MCP.*  
*[skissify.com](https://skissify.com) | MCP server: `npm install -g @skissify/mcp-server`*
