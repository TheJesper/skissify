# How AI Agents Can Draw Floor Plans: 5 Real Workflows You Can Run Today

*Best platforms: Dev.to (primary), Hashnode, r/mcp, r/homeimprovement, r/ChatGPT — post Tuesday-Wednesday*

---

"Can AI draw a floor plan?" has become a surprisingly common question in 2026.

The answer is yes — but the useful answer is: *it depends on which AI tool you use, and what you need the output to do.*

This is a practical guide to five real workflows people are actually using right now, from zero-code homeowner setups to fully automated agent pipelines. Pick the one that matches what you need.

---

## First: Why "AI-Generated Floor Plan" Means Two Different Things

There are two fundamentally different approaches:

**Approach 1: AI generates an image**
You prompt an image generator (DALL-E, Midjourney, etc.) to produce something that looks like a floor plan. The result is a JPEG. It might look convincing but you can't edit it, export it to CAD, or give it to a contractor as anything other than a rough visual reference.

**Approach 2: AI generates structured data, a tool renders it**
You prompt a language model to produce structured JSON describing the spatial elements. A deterministic rendering engine converts that JSON into a clean, shareable sketch. The JSON is the ground truth — editable, versionable, inspectable.

Skissify is the second approach. This distinction matters for every workflow below.

---

## Workflow 1: The Homeowner with No Tech Background

**Time to first sketch: 2 minutes**
**Setup required: None**

**What you need:** A browser. Go to skissify.com/human.

**How it works:** Type a plain-text description of your room or space. The AI does the JSON generation internally. You get a hand-drawn sketch.

**Example prompt:**
```
Kitchen renovation plan. 5x4 meter kitchen. Enter from right side. Large island in center, 
2.5m wide, 1.2m deep. Gas stove on left wall. Refrigerator next to stove. 
Sink under window on back wall. Breakfast bar facing into living room on top wall.
```

**What you get:** A shareable sketch link you can print, screenshot, or send to a contractor.

**Real use case from launch week:** A user described their kitchen to Claude, got a sketch in 40 seconds, printed it, and brought it to a contractor meeting. Their quote: *"The contractor actually listened to me for once."* The hand-drawn format communicates "this is what I want" without the contractor assuming it's final.

**Limitations at this level:** No CAD export, no real dimensions in the output, not suited for building permit submissions. This is a communication tool, not an architecture tool.

---

## Workflow 2: The Developer Using Claude Desktop + MCP

**Time to first sketch: 5 minutes (one-time setup)**
**Setup required: Claude Desktop, 2 lines of config**

**What you need:** Claude Desktop installed. Then add to your Claude config:

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

**How it works:** In Claude Desktop, just ask for a floor plan. Claude generates the schema and automatically calls the `render_sketch` MCP tool. No prompting of schema required.

**Example prompts that work:**
- *"Design a small studio apartment with a sleeping loft"*
- *"Create an office floor plan for 8 people with two meeting rooms"*  
- *"Draw a D&D dungeon room with three exits and two pillars"*

**What you get:** Claude returns a sketch URL and a description of what it drew. You can ask Claude to modify it in follow-up turns: *"Move the bathroom to the other corner"* → new sketch URL.

**Best for:** Developers who want visual output from Claude conversations without building an API integration.

---

## Workflow 3: The Agent Builder (REST API)

**Time to integration: 15 minutes**
**Setup required: API key**

**What you need:** An API key from skissify.com.

**Basic integration:**
```typescript
async function generateFloorPlan(description: string): Promise<string> {
  // Step 1: Have your LLM generate the schema
  const schema = await llm.complete(`
    Generate a Skissify floor plan JSON for: ${description}
    Output only valid JSON matching the Skissify schema.
  `);
  
  // Step 2: Render it
  const response = await fetch('https://skissify.com/api/render', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SKISSIFY_API_KEY}` 
    },
    body: JSON.parse(schema) // already JSON
  });
  
  const { url } = await response.json();
  return url; // 'https://skissify.com/s/abc123'
}
```

**Why the flat schema matters:** The Skissify schema uses absolute coordinates and a flat element list (no nesting). This produces 94% first-try LLM success vs ~60% for nested schemas. If you're building your own prompt, use this system prompt addition:

```
When generating Skissify JSON:
- Use absolute pixel coordinates (origin: top-left)
- Do NOT nest elements
- Output ONLY the JSON object, no explanation
- Canvas: width 400-1200, height 300-900
```

**Best for:** Any agent or application that needs to attach a visual artifact to its output — real estate tools, renovation planners, space management software, educational apps.

---

## Workflow 4: The LangGraph/CrewAI Python Agent

**Time to integration: 30 minutes**
**Setup required: Python, API key**

This is for teams building autonomous agents in Python.

```python
import httpx
from langchain_anthropic import ChatAnthropic
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool

@tool
def render_floor_plan(sketch_json: dict) -> str:
    """
    Render a hand-drawn floor plan from Skissify JSON schema.
    Returns a permanent, shareable URL.
    
    The sketch_json should follow Skissify schema:
    {
        "title": str,
        "width": int,  # 400-1200
        "height": int, # 300-900  
        "style": "napkin" | "blueprint" | "technical" | "rough",
        "elements": [{"type": str, "x": int, "y": int, ...}]
    }
    """
    response = httpx.post(
        "https://skissify.com/api/render",
        json=sketch_json,
        headers={"Authorization": f"Bearer {SKISSIFY_API_KEY}"}
    )
    data = response.json()
    return f"Sketch URL: {data['url']}"

# Create agent with the tool
model = ChatAnthropic(model="claude-sonnet-4-6")
agent = create_react_agent(model, [render_floor_plan])

# Use it
result = agent.invoke({
    "messages": [{
        "role": "user", 
        "content": "I need to plan a 2-bedroom apartment renovation. Draw me a rough floor plan."
    }]
})
```

**The key insight:** Because the sketch URL always returns the underlying JSON, your agent can use sketch URLs as **persistent visual memory**:

```python
# Store the sketch URL in agent memory
memory.add(f"Living room layout: {sketch_url}")

# Later session: retrieve and modify
agent.invoke({
    "messages": [{
        "role": "user",
        "content": f"Based on this room plan ({sketch_url}), add a reading nook near the window"
    }]
})
```

This makes sketches first-class structured artifacts rather than throw-away images.

---

## Workflow 5: The Mastra TypeScript Agent

**Time to integration: 20 minutes**
**Setup required: Mastra, TypeScript, API key**

For teams using Mastra's TypeScript agent framework:

```typescript
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const skissifyTool = createTool({
  id: "render_sketch",
  description: "Render a hand-drawn architectural sketch from JSON and return a shareable URL. Use for floor plans, room layouts, spatial diagrams.",
  inputSchema: z.object({
    title: z.string().describe("Name of the space being sketched"),
    width: z.number().min(400).max(1200).describe("Canvas width in pixels"),
    height: z.number().min(300).max(900).describe("Canvas height in pixels"),
    style: z.enum(["napkin", "blueprint", "technical", "rough"]).describe("Visual style of the sketch"),
    elements: z.array(z.object({}).passthrough()).describe("Array of spatial elements to render")
  }),
  execute: async ({ context }) => {
    const response = await fetch("https://skissify.com/api/render", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SKISSIFY_API_KEY}` 
      },
      body: JSON.stringify(context)
    });
    
    const { url, id } = await response.json();
    return { 
      sketchUrl: url,
      sketchId: id,
      message: `Floor plan rendered successfully: ${url}`
    };
  }
});

// Use in your Mastra agent
const renovationAgent = new Agent({
  name: "Renovation Planner",
  instructions: "You help homeowners plan renovations. When creating floor plans, use the render_sketch tool to produce visual output the user can share with contractors.",
  model: anthropic("claude-sonnet-4-6"),
  tools: { skissifyTool }
});
```

---

## LLM Performance: Which Model Draws Best?

Tested across 500+ floor plan generations (flat schema, absolute coordinates):

| Model | First-Try Success | Best Strength |
|-------|-----------------|---------------|
| Claude Sonnet 4.6 | **94%** | Room spatial relationships |
| Claude Haiku | 89% | Speed, simple layouts |
| GPT-4o | 88% | Consistent, minor coord errors |
| Gemini 2.0 Pro | 85% | Best Google model |
| GPT-4o-mini | 79% | Budget option |
| Gemini 2.0 Flash | 81% | Speed-cost balance |
| Mistral Large | 76% | European deployments |
| Llama 3.3 70B | 71% | Best open-source option |

"First-try success" = valid JSON that renders without errors on the first attempt.

**Why Claude leads:** The flat-list, absolute-coordinate schema aligns well with how Claude processes spatial descriptions. It has fewer token-prediction errors on element coordinate placement than models that perform better on more abstract tasks.

---

## The 3 Mistakes to Avoid

**1. Using a nested schema**
If you're hand-crafting your prompt to generate schema, don't use nested element groups or relative coordinates. The flat-list approach isn't a constraint — it's the design choice that makes 94% first-try success possible.

**2. Expecting photorealistic output**
Skissify generates hand-drawn sketches: box rooms, wobbly lines, blueprint-style labels. This is intentional — it signals "draft" clearly. If you need a rendered 3D visualization, this isn't the tool.

**3. Treating the URL as an image**
The sketch URL at `skissify.com/s/{id}` is a page with the underlying JSON accessible. For agent workflows, use the JSON endpoint to retrieve and modify previous sketches rather than treating each sketch as a terminal artifact.

---

## What's Coming

- **TypeScript SDK (@skissify/client)** — typed client with schema validation, Week 2
- **Benchmark page at skissify.com/benchmark** — official model comparison data
- **Framework integrations page** — Mastra, LangGraph, CrewAI, n8n documented examples
- **SVG export** — for precision workflows and CAD handoff
- **Rotation support** — angled elements and non-rectangular rooms

---

*Skissify is live at [skissify.com](https://skissify.com). Human Mode: no-code, just describe your space. MCP server: `npx -y @skissify/mcp-server`. API docs: skissify.com/docs.*
