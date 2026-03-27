# The Skissify API Reference for Agent Builders

**Published:** March 28, 2026  
**Author:** Jesper Landmér  
**Platform:** Dev.to, Hashnode, official docs  
**Status:** Ready to publish  
**SEO targets:** "skissify MCP API", "JSON sketch API", "AI agent drawing tool"

---

> **What this covers:** Everything an agent developer needs to integrate Skissify into an AI pipeline — from zero to a working floor plan sketch in under 5 minutes.

---

## The One-Minute Version

Skissify accepts JSON. Returns a sketch URL. Works with any LLM that can output structured data.

```json
{
  "style": {
    "paper": "plain",
    "amplitude": 3,
    "waves": 2,
    "humanness": 4
  },
  "elements": [
    {
      "type": "rect",
      "x": 50,
      "y": 50,
      "width": 300,
      "height": 200,
      "label": "Living Room"
    },
    {
      "type": "wall",
      "x1": 50,
      "y1": 50,
      "x2": 350,
      "y2": 50
    },
    {
      "type": "door",
      "x": 150,
      "y": 50,
      "width": 40,
      "direction": "inward"
    }
  ]
}
```

Paste that into skissify.com. You get a hand-drawn floor plan.

---

## MCP Setup (Claude / Claude Desktop)

Add to your Claude Desktop config at `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

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

Restart Claude Desktop. Claude now has the ability to call `skissify_create_sketch`, `skissify_get_sketch`, and `skissify_list_presets`.

**Test it:** Ask Claude: *"Draw a simple 2-bedroom apartment floor plan and give me the sketch URL."*

It will design the layout, generate the JSON, call Skissify, and return a live URL within seconds.

---

## Element Type Reference

### Structural Elements

| Type | Required Fields | Optional Fields | Notes |
|------|----------------|-----------------|-------|
| `rect` | `x, y, width, height` | `label, style` | Room boundary |
| `wall` | `x1, y1, x2, y2` | `thickness, style` | Line segment wall |
| `column` | `x, y, width, height` | `label` | Structural column |
| `beam` | `x1, y1, x2, y2` | `thickness` | Structural beam |

### Openings

| Type | Required Fields | Optional Fields | Notes |
|------|----------------|-----------------|-------|
| `door` | `x, y, width` | `direction, swing` | Hinged door; `direction`: inward/outward |
| `window` | `x, y, width` | `height, style` | Wall opening |

### Circulation

| Type | Required Fields | Optional Fields | Notes |
|------|----------------|-----------------|-------|
| `stairs` | `x, y, width, height` | `direction, steps` | Staircase element |

### Annotation

| Type | Required Fields | Optional Fields | Notes |
|------|----------------|-----------------|-------|
| `dimension` | `x1, y1, x2, y2` | `label, unit` | Dimension line with tick marks |
| `label` | `x, y, text` | `fontSize, align` | Free text label |
| `annotation` | `x, y, text` | `style` | Callout annotation |

### Geometry

| Type | Required Fields | Optional Fields | Notes |
|------|----------------|-----------------|-------|
| `circle` | `x, y, radius` | `label, style` | Circle (tables, columns) |
| `arrow` | `x1, y1, x2, y2` | `head, style` | Directional arrow |

### Furniture & Fixtures

| Type | Required Fields | Optional Fields | Notes |
|------|----------------|-----------------|-------|
| `furniture` | `x, y, width, height, label` | `shape, style` | Generic furniture (sofa, bed, desk) |
| `fixture` | `x, y, width, height, label` | `type, style` | Fixed fixtures (sink, toilet, appliances) |

---

## Style Parameters

```json
{
  "style": {
    "paper": "plain",        // "plain" | "graph" | "blueprint" | "white"
    "amplitude": 3,          // 0-10: line wobble amount (0 = straight, 10 = very rough)
    "waves": 2,              // 0-10: wobble frequency (0 = smooth, 10 = high frequency)
    "humanness": 4,          // 0-10: random tremor overlay (simulates hand shake)
    "strokeWidth": 1.5,      // line thickness in pixels
    "inkColor": "#2b2b2b"    // stroke color (overridden by paper style on blueprint)
  }
}
```

### Style Presets (Recommended Starting Points)

| Preset | Paper | Amplitude | Waves | Humanness | Best For |
|--------|-------|-----------|-------|-----------|----------|
| Clean technical | plain | 1 | 1 | 1 | Precise layouts |
| Napkin sketch | plain | 6 | 3 | 7 | Quick ideation |
| Blueprint | blueprint | 2 | 1 | 2 | Professional presentation |
| Hand-drawn | plain | 5 | 4 | 8 | Approachable, informal |

---

## The Prompt Template That Works

After testing 50+ prompts across 8 models, this structure achieves the highest first-try success rate:

```
You are generating a Skissify sketch JSON. Skissify renders JSON into hand-drawn sketches.

SCHEMA RULES:
- All coordinates are in pixels (top-left origin, positive X = right, positive Y = down)
- Valid element types: rect, wall, door, window, stairs, dimension, label, circle, arrow, column, beam, furniture, fixture, annotation
- Required style fields: paper ("plain"|"graph"|"blueprint"|"white"), amplitude (0-10), waves (0-10), humanness (0-10)
- Coordinates must be spatially coherent: doors must intersect walls, rooms must not overlap

TASK: Generate a Skissify JSON sketch for: [YOUR DESCRIPTION HERE]

OUTPUT: Return ONLY valid JSON. No markdown code blocks. No explanation. No wrapping text.
```

**Key rules:**
1. Always list valid element types (prevents hallucination)
2. Explain the coordinate system (reduces spatial errors)
3. "Return ONLY valid JSON" — models love to wrap output in markdown fences otherwise
4. Note spatial coherence requirement — improves layout quality significantly

---

## Error Handling for Agent Pipelines

Skissify validates the JSON before rendering. If the schema is invalid, you'll get an error response with a specific field path.

**Recommended retry pattern:**

```python
def generate_sketch_with_retry(description, max_retries=2):
    prompt = build_prompt(description)
    
    for attempt in range(max_retries + 1):
        json_output = llm.generate(prompt)
        
        result = skissify.render(json_output)
        
        if result.success:
            return result.url
            
        # Pass the error back to the model
        prompt = build_correction_prompt(
            original_description=description,
            invalid_json=json_output,
            error=result.error
        )
    
    raise Exception(f"Failed after {max_retries} retries")
```

**First-try success rates by model (our benchmark):**
- Claude Sonnet 4: 94%
- GPT-4o: 88%
- Gemini 1.5 Pro: 85%
- Llama 3.3 70B (Ollama): 71%
- Qwen 2.5 72B (Ollama): 69%

With one correction retry, most models reach 86%+.

---

## Self-Hosting

Skissify is self-hostable via Docker:

```bash
docker pull skissify/app:latest
docker run -p 3000:3000 \
  -e DATABASE_URL="file:./data/dev.db" \
  -e NEXTAUTH_SECRET="your-secret" \
  skissify/app:latest
```

Or with docker-compose (recommended):

```bash
git clone https://github.com/skissify/skissify
cd skissify
cp .env.example .env  # fill in your values
docker-compose up -d
```

Point your MCP config at `http://localhost:3000` instead of `https://skissify.com`.

---

## What's Next

- **Open source rendering engine**: The wobble renderer will be open-sourced as a standalone npm package. You'll be able to run server-side rendering without the full app.
- **LangChain integration**: A LangChain tool wrapper is in progress.
- **Schema v2**: Currently in design — will add `group` elements for nested rooms, `floor` for multi-story, and `viewport` for explicit canvas sizing.

Questions? I'm [@jesperland on X](https://x.com/jesperland) and check the [GitHub repo](https://github.com/skissify/skissify) for issue tracking.

---

*Skissify is free to use at [skissify.com](https://skissify.com). Pro (€5/month) adds private sketches and higher API rate limits.*
