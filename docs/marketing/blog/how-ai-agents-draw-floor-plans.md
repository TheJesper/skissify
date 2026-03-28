# How AI Agents Can Draw Floor Plans — A Technical Walkthrough

*Updated: March 28, 2026 — Cross-post to Dev.to, Hashnode*

> **What you'll get from this post:** A step-by-step breakdown of exactly how an AI agent (Claude via MCP) goes from natural language to a rendered floor plan sketch — including the JSON schema, the wobble algorithm, the LLM success rate data, and a real conversation example you can reproduce today. Day 2 update: we've benchmarked 8 LLMs on this task.

---

Last week I asked Claude to design a 2-bedroom apartment and sketch it for me.

Five seconds later, I had a floor plan.

No drag-and-drop. No Figma. No manual drawing. Just a conversation and a sketch.

Here's exactly how it works — and how you can do it too.

## The Problem: AI Can Think in Space, But Couldn't Draw

AI language models have always been surprisingly good at spatial reasoning. Ask Claude to "design a functional 2-bedroom apartment with a north-facing living room" and you'll get a thoughtful, well-reasoned layout described in text. Column widths, room adjacencies, traffic flow — it thinks about all of it.

But until recently, the output was always text. You'd have to read the description and *imagine* the floor plan, or manually sketch it yourself.

That's the gap Skissify fills.

## How MCP Makes This Possible

[MCP (Model Context Protocol)](https://modelcontextprotocol.io) is an open standard from Anthropic that lets AI agents connect to external tools and APIs. Instead of just generating text, an MCP-enabled AI can call tools, retrieve data, and — critically — render visual output.

Skissify exposes an MCP server. When you install it with Claude Desktop, the AI can:

1. Design a layout (reasoning about room sizes, adjacencies, function)
2. Generate a JSON sketch manifest
3. Send it to Skissify via MCP
4. Get a rendered sketch back
5. Show it to you in the conversation

MCP hit 97M+ monthly downloads in March 2026. It's mainstream now — and Skissify is the first MCP server in the ecosystem that draws.

## The JSON Sketch Manifest

The key innovation is Skissify's JSON schema. Every sketch is described as a list of elements:

```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "amplitude": 3,
  "waves": 4,
  "humanness": 0.4,
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 400, "h": 250, "label": "Living Room" },
    { "type": "rect", "x": 50, "y": 300, "w": 180, "h": 150, "label": "Kitchen" },
    { "type": "rect", "x": 300, "y": 300, "w": 150, "h": 150, "label": "Bedroom 1" },
    { "type": "rect", "x": 300, "y": 450, "w": 150, "h": 120, "label": "Bedroom 2" },
    { "type": "rect", "x": 50, "y": 450, "w": 100, "h": 120, "label": "Bathroom" },
    { "type": "door-symbol", "x": 175, "y": 50, "w": 80, "h": 20, "angle": 0 },
    { "type": "window", "x": 50, "y": 170, "w": 100, "h": 20 },
    { "type": "window", "x": 300, "y": 50, "w": 120, "h": 20 },
    { "type": "dim", "x": 50, "y": 620, "x2": 450, "y2": 620, "label": "14.5m" }
  ]
}
```

The AI doesn't need to be a designer to generate this. It just needs to understand space and JSON — both things LLMs are quite good at.

### Schema Design Philosophy

Why flat elements with absolute coordinates? We tested hierarchical schemas (rooms contain walls contain openings) and flat schemas side by side. The flat approach wins on LLM success rate by a large margin.

Nested structures require the model to reason about both the parent-child relationship AND the coordinates simultaneously. Flat elements let the model just list what it knows — and LLMs know coordinates because they appear everywhere in training data.

The schema fits on one page. That's intentional. An LLM with 300 words of schema description can generate valid JSON on the first try.

## LLM Benchmark: Which Models Draw Best?

We tested 8 models on 50 floor plan prompts each. First-try success = valid JSON that renders correctly without modification.

| Model | First-Try Success | After 1 Correction |
|-------|------------------|-------------------|
| Claude Sonnet 4 | 94% | 99% |
| GPT-4o | 88% | 97% |
| Gemini 1.5 Pro | 85% | 94% |
| Mistral Large | 78% | 91% |
| Llama 3.3 70B | 71% | 88% |
| Qwen 2.5 72B | 69% | 86% |
| Mistral 7B | 54% | 74% |
| Llama 3.2 3B | 31% | 58% |

**The gap isn't schema compliance — it's spatial reasoning.** Small models generate valid JSON that's spatially wrong: a door placed outside a wall, a 10m corridor in a 5m building. Spatial coherence requires spatial reasoning that small models struggle with.

**For local LLM users:** Qwen 2.5 72B is the practical choice (Ollama-compatible). 69% first-try is workable with a correction loop. Anything below 30B parameters is not reliable for autonomous pipelines.

**The prompt that helps all models:**

```
Return ONLY valid JSON. No markdown fences. No explanation.
The JSON must describe a spatially coherent floor plan where:
- All rooms fit within the total building footprint
- Doors intersect with walls (not floating in space)
- Room dimensions sum to the building dimensions approximately
```

That constraint check in the prompt reduces failures by ~15% across all models.

## The Wobble Engine: Making It Look Real

The hardest part of Skissify wasn't the MCP integration. It was making the output look like it was actually drawn by a human hand.

Most "hand-drawn" sketch tools use a simple sine wave offset — you shift each point slightly left or right. It looks mechanical. Regular. Too perfect.

Skissify uses **multi-harmonic wobble**: multiple overlapping wave frequencies with seeded randomness, applied differently to each element based on its type and position.

Three control axes:
- **Amplitude** (0-10): how far lines deviate from straight — 0 is ruler-precise, 10 is "drew this in a hurry"
- **Waves** (1-8): wobble frequency — low = gentle undulation, high = fine tremor
- **Humanness** (0-1): random tremor overlay — simulates actual hand shake variance

The critical insight: **seeded randomness makes the same JSON produce the same sketch every time**, but different elements get different seeds based on their position. "Wall at x:100" looks different from "wall at x:200" — they each have unique tremor — even with identical parameters.

A door arc wobbles differently than a wall line. A dimension line has tighter tolerances than a freehand rectangle. It's all tuned per-element type.

The practical result: you can version your sketches. Update one room, only that room changes. The rest of the sketch is stable.

## Installing the MCP Server

```bash
# Install globally
npm install -g @skissify/mcp-server
```

Add to Claude Desktop's config (`~/Library/Application Support/Claude/claude_desktop_config.json` on Mac):

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "@skissify/mcp-server"],
      "env": {
        "SKISSIFY_API_KEY": "your-free-api-key"
      }
    }
  }
}
```

Restart Claude Desktop. That's it — Claude now has a `create_sketch` tool.

## A Real Conversation

Here's an actual example of what the Claude Desktop interaction looks like:

> **Me:** Design a small 1-bedroom apartment for a remote worker. Prioritize a good home office space. Show me the floor plan.

> **Claude:** I'll design a compact 1-bedroom with the home office as a priority. The key is separating work and sleep — I'll put the office near natural light and keep the bedroom acoustically separate...
>
> *[calling create_sketch with manifest...]*
>
> Here's the floor plan: [rendered sketch]
>
> The office (4.2m × 3.8m) is at the northwest corner for morning light. The bedroom is at the opposite end with a buffer zone (the bathroom + hallway). The kitchen/living area connects them without crossing through work space.
>
> Want me to try a different configuration?

That exchange took under 15 seconds. The visual output was the turn where everything clicked.

## Beyond Floor Plans: Other Use Cases

Floor plans are the obvious showcase, but the same approach works for:

**System architecture diagrams:**
> "Draw the microservices for an e-commerce backend — cart, inventory, payments, notifications, user service"

Claude designs the service topology, draws the boxes and arrows, labels the connections.

**UI wireframes (rough):**
> "Sketch a mobile app home screen for a food delivery app — search bar at top, category pills, featured restaurant cards, tab bar at bottom"

At 71% success rate for wireframes (vs 94% for floor plans), this works better with guidance. Specify element types explicitly.

**Network topology:**
> "Draw a small office network — firewall, core switch, two access switches, wifi AP, server rack"

More precise than a hand-drawn description would be, less intimidating than Visio.

**TTRPG dungeon maps (discovered at launch):**
Blueprint paper style + wobble = authentic dungeon map aesthetic. Ask Claude to "design a 3-chamber dungeon: entrance hall with pillars, narrow trapped corridor, circular boss room" and you get exactly what you'd find in a treasure chest.

## Supported Element Types

The current Skissify schema supports 14 element types:

| Type | Use Case |
|------|----------|
| `line` | Any straight line, walls |
| `rect` | Rooms, tables, furniture blocks |
| `circle` | Circular elements, columns |
| `arc` | Curved walls, door swings |
| `arrow` | Flow direction, traffic |
| `text` | Labels, annotations |
| `dashed` | Property boundaries |
| `dim` | Dimension lines with measurements |
| `window` | Wall openings |
| `door-symbol` | Hinged doors |
| `door-slide` | Sliding doors |
| `stair` | Staircase representations |
| `opening` | Doorless openings |
| `column` | Structural columns |

Coming next based on launch feedback: furniture presets (desk, bed, sofa at standard dimensions), electrical symbols, plumbing fixtures.

## Paper Styles: Set the Context

Four paper styles, each with a different aesthetic purpose:

- **Cream** ("napkin"): Warm, informal, early-thinking. Looks like a real sketch.
- **White** ("trace paper"): Clean, minimal, presentation-ready.
- **Grid** ("graph paper"): Technical, precise, good for scale indicators.
- **Blueprint**: Dark blue background, white lines. Perfect for architectural communication — and dungeon maps.

## Self-Hosting

If you want to run Skissify locally or in your own infrastructure:

```bash
git clone https://github.com/skissify/skissify
cp .env.example .env
# Fill in your environment variables
docker-compose up
```

The MCP server points to your local instance by setting `SKISSIFY_API_URL`.

## The Broader Vision

The stack for AI-driven visual output is becoming clear:

**Layer 1: Text generation** → covered by every LLM  
**Layer 2: Code generation** → covered by Copilot, Cursor, Claude Code  
**Layer 3: Image generation** → covered by DALL-E, Midjourney, Imagen  
**Layer 4: Structured visual output** ← Skissify lives here

Generative images are non-deterministic. You can't ask DALL-E to "move the bedroom east" and get a coherent update. Skissify's JSON-first approach is versioned, deterministic, and agent-controllable.

The agents that will be most useful in 2026 are the ones that can reason, plan, code, AND draw. Skissify gives them the last capability.

---

*The editor is live at [skissify.com](https://skissify.com). Paste JSON directly and see it render — no signup required. MCP server: `npm install -g @skissify/mcp-server`*

---

## Questions?

Happy to discuss:
- The rendering approach (Canvas 2D internals)
- The JSON schema design decisions (flat vs hierarchical)  
- The MCP integration (tool definition, error handling)
- Local LLM performance on spatial tasks

Leave a comment or find me building in public on Twitter.

---

**Tags:** ai, agents, mcp, architecture, floor-plans, javascript, developer-tools, llm, benchmark

**Distribution notes (internal):**
- Dev.to: Primary — technical audience, MCP + benchmark are the hooks
- Hashnode: Cross-post with "mcp" and "ai-agents" tags for SEO
- r/mcp: Share the benchmark table specifically — most-wanted data in that community
- r/LocalLLaMA: The benchmark table is the hook — local model performance on structured output
- Twitter thread: "I benchmarked 8 LLMs on floor plan generation. The results surprised me." → link to post
- Publish NOW (Day 2) — the benchmark data is fresh and relevant
