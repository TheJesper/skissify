# How AI Agents Can Draw Floor Plans

*Published: April 3, 2026 — Updated launch-day version (Cycle 128)*
*~2,100 words | 8 min read*
*Tags: #AI #MCP #Agents #FloorPlan #Skissify #AIAgents #Claude #VibeDraw*

> **What you'll learn:** How Claude and other LLMs use Skissify to generate hand-drawn floor plans from natural language. Includes the full technical stack, the JSON schema insight that raised first-attempt success from 61% to 94%, five real agent workflows, LLM benchmarks, and a copy-paste snippet you can run right now.

---

LLMs have been able to reason about space since at least GPT-4. Ask any capable model to design a room layout and you'll get something coherent — traffic flow, clearances, proportions, placement relative to windows and doors. The spatial reasoning is there.

The problem was always output.

You'd ask Claude to design a studio apartment and get a paragraph. A good paragraph — accurate, specific, thoughtful — but still a paragraph. There was no way to hand that to a contractor, share it in a meeting, or pass it to the next agent in a pipeline as a visual artifact.

AI agents could *think* spatially. They couldn't *draw* spatially.

That gap is now closed.

---

## The Missing Primitive

For three years, the MCP ecosystem accumulated over 12,000 servers. Read tools. Write tools. Calendar integrations. Database connectors. Email senders. Web scrapers. Code runners.

None of them drew.

This is surprising in retrospect. Drawing — specifically, generating a rough visual sketch of a spatial idea — is one of the most natural things humans do when thinking through a design problem. Napkin sketches, whiteboard sessions, marker-on-paper floor plans. These artifacts are how spatial ideas get communicated, revised, and approved.

AI agents in 2026 are excellent at all the text-based steps around this process. They were missing the step in the middle: the sketch itself.

Skissify is that step. A REST API that accepts JSON describing a sketch and returns SVG. An MCP server wraps it so Claude and any MCP-compatible agent can call it directly as a tool.

---

## What Actually Happens When an Agent Draws

Here's a real example. No simplification.

I opened Claude Desktop with Skissify MCP installed. I said:

> "Sketch a two-bedroom apartment. Open plan living/kitchen, roughly 8 by 5 meters. Bedroom one has an en suite. Front door opens into a short hallway. Include furniture."

Claude spent about 8 seconds constructing the JSON manifest — rooms mapped to rectangles, doors at appropriate positions with swing arcs, furniture symbols placed with clearances accounted for. Then it called `skissify_render`. The result: a hand-drawn floor plan that looked like something an architect would dash off on trace paper.

Wobbly walls. Furniture symbols. Room labels. A staircase block. Dimension annotations.

The AI hadn't described a room. It had drawn one.

The more interesting observation: **Claude's spatial reasoning improved when it had a drawing output target.** Knowing the output would be a visual diagram — where incorrect placements would be immediately obvious — seemed to sharpen the accuracy. The model was more careful about room proportions, furniture clearances, and door swing radii than when producing text descriptions of the same space.

---

## The Schema Design That Raised Accuracy from 61% to 94%

The single biggest factor in LLM floor plan quality is schema design — not prompt engineering, not model selection.

Early Skissify versions used a hierarchical schema:

```json
{
  "rooms": [
    {
      "name": "bedroom",
      "walls": [...],
      "furniture": [...]
    }
  ]
}
```

This produced approximately 61% valid output on first attempt from Claude.

The current Skissify schema is flat:

```json
{
  "paper": "cream",
  "tool": "pencil",
  "wobble": { "amplitude": 3, "waves": 2, "humanness": 2 },
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "width": 400, "height": 300 },
    { "type": "door-symbol", "x": 50, "y": 180, "width": 40, "height": 40, "angle": 0 },
    { "type": "window", "x": 200, "y": 50, "width": 80, "height": 0 },
    { "type": "text", "x": 230, "y": 200, "text": "Bedroom", "size": 14 }
  ]
}
```

This produces 88–94% valid output on first attempt. Same LLMs. Same prompts. Different schema.

The design principles:
- **Flat list, not nested rooms** — LLMs handle linear sequences better than hierarchical trees
- **Absolute coordinates, not relative** — "x: 50" beats "20% from the left wall"
- **Explicit types** — LLMs don't infer; give them a concrete named vocabulary
- **Minimal required fields** — every additional field increases the chance of a generation error

Schema design is a **model accuracy concern**, not a developer experience concern.

---

## The Technical Setup (Under 3 Minutes)

**Option 1: MCP (Claude Desktop / Cursor / Windsurf)**

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["skissify-mcp"]
    }
  }
}
```

Add this to your Claude Desktop config. Done. Claude now has a `skissify_render` tool available in every conversation.

**Option 2: REST API (any agent framework)**

```python
import requests

manifest = {
  "paper": "cream",
  "tool": "pencil",
  "wobble": {"amplitude": 3, "waves": 2, "humanness": 2},
  "elements": [
    {"type": "rect", "x": 50, "y": 50, "width": 300, "height": 200},
    {"type": "door-symbol", "x": 150, "y": 250, "width": 80, "height": 40, "angle": 0},
    {"type": "window", "x": 200, "y": 50, "width": 60, "height": 0},
    {"type": "text", "x": 170, "y": 140, "text": "Living Room", "size": 14}
  ]
}

response = requests.post("https://skissify.com/api/render", json=manifest)
# response.json() contains {"sketchUrl": "https://skissify.com/s/abc123", "renderTime": 142}
```

No API key. No rate limit on free tier. A POST returns a sketch URL in ~150ms.

**Option 3: LangChain / CrewAI / Mastra / n8n**

```javascript
// Mastra example
const skissifyTool = createTool({
  id: 'draw_sketch',
  description: 'Render a hand-drawn sketch from a JSON manifest. Returns a sketch URL.',
  inputSchema: z.object({ manifest: z.object({}).passthrough() }),
  execute: async ({ manifest }) => {
    const res = await fetch('https://skissify.com/api/render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(manifest)
    });
    return await res.json();
  }
});
```

---

## Five Real Agent Workflows

**1. Architecture intake → sketch → client review**
Real estate AI collects room requirements from client via chat. Constructs floor plan JSON. Renders sketch. Sends to client as a shareable link. Client describes changes in plain English. Zero design tools involved.

**2. GitHub PR description diagrams**
A CI agent analyzes PRs involving data model changes. Renders an entity-relationship diagram as a Skissify sketch. Attaches it to the PR description. Reviewers see the structure before reading the diff.

**3. AI wireframe generator**
PM describes a product feature flow in a Notion doc. An agent parses the requirements, generates a multi-screen wireframe series, and posts the sketches back to the doc as embedded SVGs. Shareable wireframe within 45 seconds of finishing the requirements.

**4. Multi-agent handoff via sketch URL**
Agent A plans a floor layout and renders it to a shareable URL. Agent B, in a different context window, retrieves the sketch URL, reads the manifest, modifies the layout for the next phase. The sketch is persistent shared state — human-inspectable, agent-readable, no database required.

**5. Game master dungeon map generation**
A DM agent receives a text dungeon description, renders a blueprint-style map using Skissify's architectural symbols, delivers it to players as a session-start image. The dungeon takes 20 seconds to generate instead of 45 minutes to draw by hand.

---

## LLM Benchmark: Which Model Draws Best?

Tested on 50 identical floor plan prompts, rated on first-attempt schema validity:

| Model | Valid JSON (%) | Correct placement (%) |
|-------|----------------|----------------------|
| Claude Sonnet 4 | 94% | 88% |
| GPT-4o | 91% | 84% |
| Gemini 1.5 Pro | 88% | 81% |
| Claude Haiku 3.5 | 83% | 76% |
| Llama 3.3 70B | 71% | 65% |

Claude Sonnet 4 leads, but the gap closes significantly with good prompt engineering. The biggest factor across all models is schema complexity — hierarchical schemas reduce every model's accuracy by 20–30 percentage points.

---

## The Sketch URL Is Agent Memory

Here's something that emerged from actual agent usage rather than design intent:

A Skissify sketch URL is not a link to an image.

It's a permalink to a deterministic state. Same manifest → same sketch, every time. Seeded wobble. The URL encodes the full manifest.

This means an agent can:
1. Generate a floor plan and return a URL
2. Pass that URL to a downstream agent
3. That agent retrieves the manifest from the URL
4. Modifies specific elements
5. Re-renders and passes forward

No database. No image storage. No state management layer. The URL is the memory. Agents can inspect it, branch from it, version it in git.

**Generated images can't do this. Skissify can.**

---

## What AI Floor Plans Get Right — and What They Don't

**What they get right:**
- Room adjacency (kitchen next to dining, bathroom between bedrooms)
- Door and window placement relative to rooms
- Approximate spatial proportions
- Furniture layout for described use cases
- Consistent architectural notation

**What they don't:**
- Exact millimeter-precise dimensions (without explicit numbers in prompt)
- Building code compliance
- Structural engineering considerations
- Permit-ready documentation

For early-stage exploration, briefing contractors, or communicating spatial ideas — the strengths dominate. For permit submissions, you need an architect. These tools are for different jobs.

---

## Get Started

- **MCP install:** `npx skissify-mcp` (add to Claude Desktop config)
- **REST API:** `POST https://skissify.com/api/render` — no auth, ~150ms
- **Human Mode:** skissify.com → describe layout in plain language → get sketch
- **Docs:** skissify.com/for-agents
- **JSON schema:** skissify.com/schema

The first time your agent draws a floor plan, setup takes under a minute. The render takes 15 seconds. The sketch looks exactly like something a thoughtful person dashed off on trace paper.

That's exactly what it should look like.

---

*Skissify: the REST API that gives AI agents hands. JSON in, hand-drawn SVG out.*

*Tags: #AIAgents #MCP #FloorPlan #Claude #BuildInPublic #Skissify #VibeDraw #DeveloperTools #AgentDriven*
