# How AI Agents Draw Floor Plans: What Nobody Tells You

*Technical guide — AI agent developers, MCP builders, Claude Desktop users*

---

Everyone tells you AI can generate floor plans. Nobody tells you *why it's hard*, or *what the right architecture actually looks like*.

After testing 200+ floor plan generations across 6 LLMs, here's the honest breakdown.

---

## The Setup: Three Ways to Get AI to Draw a Floor Plan

### Option 1: Ask it to describe one (broken)
"Generate a floor plan for a 2-bedroom apartment" → AI returns a text description. Useless.

### Option 2: Ask it to generate SVG or HTML (fragile)
AI can write SVG. LLMs have ~40-60% first-try accuracy on complex SVG layouts. Every generation is different. Nothing is composable or modifiable. The schema is different every time.

### Option 3: Use a structured schema + rendering engine (this is the answer)
Give the LLM a fixed JSON schema. It fills in the values. A separate renderer turns JSON → visual output. First-try accuracy jumps to 88-94%.

This is what Skissify does.

---

## Why Schema Design Is 90% of the Problem

Most people assume LLM accuracy is a model quality problem. It's not. It's a schema design problem.

### The Flat vs Nested Schema Benchmark

We ran 200+ floor plan generations with two schema designs:

**Nested schema (intuitive, wrong)**
```json
{
  "rooms": [
    {
      "name": "Living Room",
      "dimensions": { "width": 400, "height": 300 },
      "position": { "x": 50, "y": 50 },
      "elements": {
        "walls": [...],
        "furniture": [...]
      }
    }
  ]
}
```

**Flat schema (counterintuitive, right)**
```json
{
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 400, "h": 300, "label": "Living Room" },
    { "type": "rect", "x": 50, "y": 80, "w": 80, "h": 40, "label": "Sofa" },
    { "type": "line", "x1": 50, "y1": 50, "x2": 450, "y2": 50 }
  ]
}
```

**Results:**
| Schema | Claude 3.5 | GPT-4o | Gemini 1.5 | Mistral |
|--------|------------|--------|------------|---------|
| Nested | 61% | 58% | 52% | 41% |
| Flat | **94%** | **88%** | **79%** | **68%** |

The flat schema wins because:
1. No nesting means no context switching — the LLM stays at one abstraction level
2. Absolute coordinates are deterministic — no relative positioning math
3. Every element has the same shape — the LLM learns one pattern, not many

The nested schema fails because LLMs lose track of what level they're at. They close brackets early. They confuse room coordinates with element coordinates.

Flat schemas are boring to design. They're dramatically more reliable for LLM generation.

---

## The MCP Integration (4 Lines of Config)

If you use Claude Desktop, you can add Skissify as a drawing tool in 4 lines:

**claude_desktop_config.json**
```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["@skissify/mcp-server"]
    }
  }
}
```

After this, Claude can call `generate_sketch` the same way it calls web search. The MCP server handles the JSON → sketch URL conversion. Claude sees the URL and can link it in its response.

**Example conversation:**
> You: "Draw a floor plan for my small studio apartment. One room, kitchen area on the left, sleeping area on the right."
>
> Claude: "Here's a sketch of your studio layout: [skissify.com/s/abc123]"

That URL is permanent, shareable, and links directly to the rendered sketch.

---

## Five Real Agent Workflows Running Today

### 1. Renovation Brief Generator
User describes their room to Claude → Claude calls Skissify → User gets a sketch URL → Shows contractor
*No JSON required if using Human Mode*

### 2. Architecture Iteration Loop
Agent generates floor plan → Reviews it → Requests specific changes → Generates revised version
*The JSON is the state. Easy to modify and regenerate.*

### 3. Multi-Agent Handoff
Agent 1 designs layout and generates sketch URL → Agent 2 receives URL → Agent 2 decodes JSON from URL → Agent 2 adds furniture layer → New sketch URL
*The URL encodes the full state. No image regeneration.*

### 4. Classroom Exercise Generator
Teacher provides template → Agent generates 30 floor plan variants with different room configurations → Each is a unique exercise
*Scale: 30 exercises in ~40 seconds*

### 5. Dungeon Map Pipeline
DnD DM describes dungeon structure to Claude → Claude generates dungeon JSON → Skissify renders in blueprint style → Share with players
*Completely unplanned use case. 100% real.*

---

## Which LLM Should You Use?

| Model | Floor Plan Accuracy | Speed | Notes |
|-------|--------------------|----|-------|
| Claude 3.5 Sonnet | 94% | Fast | Best overall |
| GPT-4o | 88% | Fast | Good fallback |
| Claude 3 Haiku | 84% | Very fast | Good for bulk generation |
| Gemini 1.5 Pro | 79% | Medium | Good for complex layouts |
| Llama 3.1 70B (local) | 71% | Varies | Needs prompt tuning |
| Mistral 7B (local) | 68% | Fast | Acceptable with retries |

**Practical recommendation:** Use Claude 3.5 Sonnet for production. Use Haiku for high-volume generation where you can accept occasional retries. Local models work fine with proper prompting.

---

## The Prompt Template That Gets 94%

This is the system prompt we use for Claude to reliably generate floor plans:

```
You are a floor plan generator. When asked to create a floor plan, 
respond ONLY with valid JSON matching this schema:

{
  "elements": [
    {
      "type": "rect|line|circle",
      "x": number (0-800),
      "y": number (0-600),
      "w": number (optional, for rect),
      "h": number (optional, for rect),
      "x2": number (optional, for line),
      "y2": number (optional, for line),
      "r": number (optional, for circle),
      "label": string (optional),
      "style": "solid|dashed|dotted"
    }
  ],
  "paper": "napkin|blueprint|parchment|engineering",
  "title": string (optional)
}

Rules:
- Use only absolute coordinates
- Keep all elements within 800x600 bounds
- Rooms = rects with labels
- Walls = lines
- Doors = short dashed lines at room edges
- Return JSON only, no explanation
```

This prompt has been tested on 500+ generations. The "Return JSON only, no explanation" rule is critical — without it, models often wrap JSON in prose.

---

## Human Mode: When You Don't Want to Deal With JSON

If your use case is "describe space, get sketch" rather than "precise programmatic control," use Human Mode:

**API:**
```bash
POST https://api.skissify.com/v1/human
{
  "description": "A two bedroom apartment with open plan kitchen and living room",
  "paper": "napkin",
  "size": "medium"
}
```

Skissify calls Claude internally, generates the JSON, renders it, and returns the URL. You never see the JSON.

**Accuracy:** 89% (slightly lower than direct JSON because of the intermediate generation step)

---

## Common Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| Elements out of bounds | LLM ignores coordinate limits | Add "keep all elements within 800x600" to prompt |
| Overlapping rooms | LLM doesn't do spatial reasoning | Add "rooms must not overlap" and check in code |
| Missing JSON only | LLM adds prose | Add "Return JSON only, no explanation" |
| Wrong element types | LLM invents types | Enumerate valid types explicitly in prompt |
| Empty elements array | LLM generates null | Add "elements array must have at least 3 items" |

---

## The Architecture in One Sentence

> LLM fills in a flat JSON schema → Skissify renders it → you get a URL that encodes the full state.

Everything composable. Everything modifiable. Everything shareable.

That's how AI agents draw floor plans.

**Try it:** skissify.com/editor (paste JSON, no account needed)
**MCP install:** `npx @skissify/mcp-server`
**API docs:** skissify.com/docs

---

*Part of the Skissify technical blog. Published April 2026.*
