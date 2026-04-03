# How AI Agents Can Draw Floor Plans

*Published: April 3, 2026 — Cycle 129 edition*
*~750 words | 5 min read*
*Tags: #AI #Agents #MCP #FloorPlan #TypeScript #Mastra #n8n #Developers*

---

Ask a well-configured Claude agent to design a studio apartment layout.

You'll get the right answer. Two sleeping zones separated by furniture. Kitchen on the exterior wall for ventilation. The bathroom tucked near the entry. Traffic flow described with spatial accuracy. The agent understands floor plan logic.

Then try to show it to anyone. You have a paragraph. Your contractor has a paragraph. Your client has a paragraph.

Nobody builds from paragraphs.

---

## The Output Format Gap

AI agents crossed a capability threshold in 2025. They can reason about space, suggest layouts, optimize for constraints. What they couldn't do until recently: render.

Generated images (Stable Diffusion, DALL-E) are stochastic. Same prompt, different output. You can't diff them. You can't cache by hash. You can't pass them as typed state between agent nodes. For architectural workflows, non-determinism is disqualifying.

ASCII art is deterministic but not presentable and not resizable.

SVG diagrams are deterministic, but generating SVG by hand is complex, fragile, and not what language models are trained on.

The gap needed a structured intermediary: a JSON manifest format that describes spatial relationships, which a specialized renderer converts to a consistent visual output. Skissify is that renderer.

---

## How It Works: The Three Components

### 1. The Manifest

A Skissify manifest is a JSON object describing paper properties and an elements array. Each element has a type, position, dimensions, and optional label.

```json
{
  "paper": "cream",
  "tool": "pencil",
  "wobble": 3,
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 300, "h": 200, "label": "Living Room" },
    { "type": "rect", "x": 350, "y": 50, "w": 150, "h": 200, "label": "Kitchen" },
    { "type": "door-symbol", "x": 80, "y": 250, "w": 40, "h": 10, "rotation": 0 },
    { "type": "window", "x": 200, "y": 50, "w": 80, "h": 10 },
    { "type": "text", "x": 175, "y": 150, "label": "sofa", "style": "annotation" }
  ]
}
```

14 element types: `line`, `rect`, `circle`, `arc`, `arrow`, `text`, `dashed`, `dim`, `window`, `door-symbol`, `door-slide`, `stair`, `opening`, `column`.

### 2. The Render API

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"manifest": {...}}' \
  | jq .sketchUrl
# → "https://skissify.com/s/abc123"
```

No authentication. Returns a permanent shareable URL.

### 3. The MCP Server

For Claude Desktop and Claude-based agent workflows:

```bash
npx skissify-mcp
```

Add to Claude Desktop config and Claude can call `skissify_render` directly. No API calls from the application layer — the agent handles the rendering tool call natively.

---

## Four Real Workflows

**Workflow 1: TypeScript agent (Mastra.ai)**
```typescript
import { Agent } from '@mastra/core';
import { skissifyTool } from 'skissify-mastra';

const floorPlanAgent = new Agent({
  name: 'floor-plan-designer',
  instructions: 'Design apartment floor plans as Skissify manifests.',
  tools: { skissify: skissifyTool },
});

const result = await floorPlanAgent.generate('Studio apartment, 35sqm, north-facing');
// Agent returns sketchUrl automatically
```

**Workflow 2: n8n automation**
Add the Skissify HTTP node to any n8n workflow. Input: property description field. Output: sketch URL injected into email, PDF, or CRM record. No coding required.

**Workflow 3: CrewAI multi-agent**
```python
from crewai import Agent, Task
from crewai_tools import SkissifyTool

architect = Agent(role='Architect', tools=[SkissifyTool()])
task = Task(description='Generate floor plan manifest for 2BR apartment')
# sketch URL returned as task output, passed to next agent
```

**Workflow 4: Claude Desktop + MCP**
User prompt: "Design a home office with standing desk, bookshelf, and couch for video calls."
Claude calls `skissify_render` with a manifest. Returns sketch URL in 150ms. User shares URL directly — no screenshot, no download.

---

## Why Determinism Is the Feature

The same manifest always produces the same sketch. That's not a limitation — it's an architectural primitive.

You can hash a manifest and cache the result. Store the manifest in version control and the sketch is reproducible from any checkpoint. Diff two manifests to understand what changed spatially. Pass a manifest as structured state between agent nodes — it's a typed intermediate representation of spatial output, not a blob.

None of this is possible with generated images.

---

## The Real Estate Use Case (Non-Technical)

You don't need to write the manifest yourself. That's the agent's job.

For non-technical users: describe your room in plain English at [skissify.com/human](https://skissify.com/human). Claude translates the description to a manifest and renders the floor plan. No JSON. No account. Free.

For contractors and real estate agents: use the API to attach auto-generated floor plan sketches to property listings. Description field in → sketch image out.

---

*Skissify API docs: [skissify.com/api](https://skissify.com/api) | MCP server: `npx skissify-mcp`*
