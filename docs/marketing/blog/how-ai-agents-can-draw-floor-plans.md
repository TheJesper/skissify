# How AI Agents Can Draw Floor Plans

*Published: April 2, 2026 | Category: AI Engineering | ~1,800 words*
*Tags: AI agents, MCP, floor plans, Claude, spatial reasoning, API, skissify*

---

LLMs have been able to reason about space since at least GPT-4. Ask any capable model to design a room layout and you'll get something coherent — traffic flow, clearances, proportions, placement relative to windows and doors. The spatial reasoning is there.

The problem was always output.

You'd ask Claude to design a studio apartment and get a paragraph. A good paragraph — accurate, specific, thoughtful — but still a paragraph. There was no way to hand that to a contractor, share it in a meeting, or pass it to the next agent in a pipeline as a visual artifact.

AI agents could *think* spatially. They couldn't *draw* spatially. They had the ability. They had no hands.

That gap is now closed.

---

## The Missing Primitive

For three years, the MCP ecosystem accumulated thousands of servers. Read tools. Write tools. Calendar integrations. Database connectors. Email senders. Web scrapers. Code runners.

None of them drew.

This is surprising in retrospect. Drawing — specifically, generating a rough visual sketch of a spatial idea — is one of the most natural things humans do when thinking through a design problem. Napkin sketches, whiteboard sessions, marker-on-paper floor plans. These artifacts are how spatial ideas get communicated, revised, and approved.

AI agents in 2026 are excellent at all the text-based steps around this process. They're missing the step in the middle: the sketch itself.

Skissify is that step. It's a REST API that accepts JSON describing a sketch — paper type, drawing instrument, wobble parameters, and an array of elements — and returns SVG. An MCP server wraps it so Claude and any MCP-compatible agent can call it directly as a tool.

---

## What Actually Happens When an Agent Draws

Here's a real example. No simplification.

I opened Claude Desktop with Skissify MCP installed. I said:

> "Sketch a two-bedroom apartment. Open plan living/kitchen, roughly 8 by 5 meters. Bedroom one has an en suite. Front door opens into a short hallway. Include furniture."

Claude spent about 8 seconds constructing the JSON manifest — rooms mapped to rectangles, doors at appropriate positions with swing arcs, furniture symbols placed with clearances accounted for. Then it called `skissify_render`. The result: a hand-drawn floor plan that looked like something an architect would dash off on trace paper.

Wobbly walls. Furniture symbols. Room labels. A staircase block. Dimension annotations.

The AI hadn't described a room. It had drawn one.

The more interesting thing: Claude's spatial reasoning improved when it had a drawing output target. Knowing the output would be a visual diagram — where incorrect placements would be immediately obvious — seemed to sharpen the accuracy. The model was more careful about room proportions, furniture clearances, and door swing radii than it was when producing text descriptions.

---

## The Technical Setup (Under 3 Minutes)

**Option 1: MCP server (Claude Desktop / Cursor / Windsurf)**

Add to your Claude Desktop config:

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

That's it. Claude now has a `skissify_render` tool available in every conversation.

**Option 2: Direct REST API (any agent framework)**

```python
import requests

manifest = {
  "paper": "cream",
  "tool": "pencil",
  "wobble": {"enabled": True, "amount": 0.4},
  "elements": [
    {"type": "rect", "x": 50, "y": 50, "width": 300, "height": 200, "label": "Living Room"},
    {"type": "rect", "x": 50, "y": 250, "width": 140, "height": 120, "label": "Bedroom 1"},
    {"type": "door-symbol", "x": 150, "y": 250, "width": 80},
    {"type": "window", "x": 200, "y": 50, "width": 60}
  ]
}

response = requests.post("https://skissify.com/api/render", json=manifest)
svg = response.text  # ready to save, embed, or forward
```

No API key. No rate limit on the free tier. A POST returns SVG.

**Option 3: LangChain / CrewAI / Mastra**

```javascript
// Mastra example
const skissifyTool = createTool({
  id: 'draw_sketch',
  description: 'Render a hand-drawn sketch from a JSON manifest. Returns SVG.',
  inputSchema: z.object({ manifest: z.object({}).passthrough() }),
  execute: async ({ manifest }) => {
    const res = await fetch('https://skissify.com/api/render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(manifest)
    });
    return { svg: await res.text() };
  }
});
```

---

## Five Real Agent Workflows

**1. Architecture intake → sketch → client review**
Real estate AI collects room requirements from client via chat, constructs floor plan JSON, renders sketch, sends to client as a shareable link. Client can modify by describing changes in plain English. Zero design tools involved.

**2. GitHub PR description diagrams**
A CI agent analyzes PRs involving data model changes, renders an entity-relationship diagram as a Skissify sketch, and attaches it to the PR description. Reviewers see the structure before reading the diff.

**3. AI wireframe generator**
PM describes a product feature flow in a Notion doc. An agent parses the requirements, generates a multi-screen wireframe series, and posts the sketches back to the doc as embedded SVGs. The PM has a shareable wireframe within 45 seconds of finishing the requirements.

**4. Multi-agent handoff via sketch URL**
Agent A plans a floor layout and renders it to a shareable URL. Agent B, operating in a different context window, retrieves the SVG, parses it, and modifies the layout for the next phase. The sketch is persistent shared state — human-inspectable, agent-readable.

**5. Game master dungeon map generation**
A DM agent in a tabletop workflow receives a text dungeon description, renders a blueprint-style map using Skissify's architectural symbols, and delivers it to the player as a session-start image. The dungeon takes 20 seconds to generate instead of 45 minutes to draw.

---

## What the JSON Schema Looks Like

The manifest format is designed to be LLM-friendly — predictable enough that a model can generate it accurately without few-shot examples.

```json
{
  "paper": "cream",
  "tool": "pencil",
  "wobble": { "enabled": true, "amount": 0.3, "humanness": 0.2 },
  "elements": [
    { "type": "rect", "x": 0, "y": 0, "width": 200, "height": 150, "label": "Kitchen" },
    { "type": "door-symbol", "x": 80, "y": 0, "width": 70, "rotation": 0 },
    { "type": "window", "x": 100, "y": 150, "width": 60 },
    { "type": "text", "x": 80, "y": 70, "text": "4.0 × 3.0 m", "size": 12 },
    { "type": "dim", "x1": 0, "y1": -20, "x2": 200, "y2": -20, "label": "4.0 m" }
  ]
}
```

Supported element types: `line`, `rect`, `circle`, `arc`, `arrow`, `text`, `dashed`, `dim`, `window`, `door-symbol`, `door-slide`, `stair`, `opening`, `column`, `wall`, `furniture-bed`, `furniture-sofa`, `furniture-desk`, and more.

Paper options: `cream`, `white`, `yellow`, `blueprint`
Tool options: `pencil`, `ballpoint`, `ink`

Wobble and humanness parameters control how hand-drawn the output looks. Blueprint mode renders technical drawings with title blocks.

---

## The Broader Point: Visual Output as a First-Class Agent Capability

In 2026, we've gotten comfortable with agents that read, write, search, and execute. The assumption — rarely examined — is that agents communicate primarily through text.

This is an artifact of what was available. Generating text has been cheap and reliable since 2022. Generating spatial visuals programmatically — without requiring a human at a mouse — has had no good API-first option until now.

The unlock is significant. When agents can draw:

- Complex spatial ideas transfer between humans and agents without lossy text descriptions
- Agents can produce deliverables, not just information — sketches you can show someone
- Multi-agent pipelines get a visual coordination layer alongside their text state
- The "show your work" problem in AI gets better — a sketch is the work made visible

An agent that can draw is a different kind of collaborator. Not just an answer machine, but something that can make things.

---

## Get Started

- **Docs:** skissify.com/for-agents
- **MCP install:** `npx skissify-mcp` (add to Claude Desktop config)
- **API:** `POST https://skissify.com/api/render` — no auth, returns SVG
- **JSON schema:** Available at skissify.com/schema

The first time your agent draws a floor plan, it'll take under a minute to set up and about 15 seconds to render. The sketch will look like something a thoughtful human dashed off on trace paper.

That's exactly what it should look like.

---

*Skissify: the REST API that gives AI agents hands. JSON in, hand-drawn SVG out.*
