# Skissify + 5 AI Agent Frameworks: Visual Output in 15 Minutes or Less

*If your agent can call a tool, it can now draw. Here's how to wire it up in every major framework.*

---

AI agents are getting good at reasoning, retrieval, and code generation. But ask one to communicate spatially — "show me a floor plan," "diagram this room," "sketch this layout" — and you get a paragraph of description instead of a picture.

Skissify fixes that. It's a JSON-to-sketch renderer with an MCP server and a plain-text Human Mode. Here's how to add visual output to five of the most popular agent frameworks in 2026.

---

## Framework 1: Claude Desktop (MCP)

**Installation time: 2 minutes**

Claude Desktop supports MCP natively. Skissify publishes an official MCP server.

**Step 1:** Install the server:
```bash
npm install -g @skissify/mcp-server
```

**Step 2:** Add to your Claude Desktop config (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "skissify": {
      "command": "skissify-mcp",
      "args": []
    }
  }
}
```

**Step 3:** Restart Claude Desktop. You'll see the Skissify tool available.

**Try it:**
> "Claude, draw me a one-bedroom apartment: bedroom on the left, kitchen and living area open plan on the right, bathroom between them."

Claude will call the Skissify MCP tool and return a permanent sketch URL. No JSON required.

**Why it works:** Claude's tool-use is natively integrated with MCP. Skissify's schema is flat-list format, which Claude Sonnet 4 completes with 94% first-try accuracy.

---

## Framework 2: Mastra (TypeScript)

**Installation time: 5 minutes**

Mastra is a TypeScript-native agent framework with excellent tool integration.

```typescript
import { createTool } from '@mastra/core';
import { z } from 'zod';

const skissifyTool = createTool({
  id: 'skissify',
  description: 'Generate a hand-drawn sketch from plain text or JSON description',
  inputSchema: z.object({
    description: z.string().describe('Plain English description of the space to sketch'),
  }),
  execute: async ({ context }) => {
    const response = await fetch('https://skissify.com/api/human', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: context.description }),
    });
    const { url } = await response.json();
    return { sketchUrl: url };
  },
});
```

Add to your agent:
```typescript
const floorPlanAgent = new Agent({
  name: 'floor-plan-agent',
  instructions: 'You help users visualize spaces. When asked to show a layout, use the skissify tool to generate a sketch URL.',
  model: anthropic('claude-sonnet-4'),
  tools: { skissifyTool },
});
```

**Result:** Your agent returns a sketch URL the user can click, share, or feed to the next step.

---

## Framework 3: LangGraph (Python)

**Installation time: 5 minutes**

LangGraph handles stateful multi-step agents well. Here's a node that adds Skissify as a tool call:

```python
import requests
from langchain_core.tools import tool

@tool
def skissify_sketch(description: str) -> str:
    """Generate a hand-drawn sketch from a plain text description of a space or layout."""
    response = requests.post(
        "https://skissify.com/api/human",
        json={"description": description}
    )
    data = response.json()
    return f"Sketch URL: {data['url']}"

# Add to your LangGraph node tools list
tools = [skissify_sketch, ...your_other_tools]
```

For JSON-level control (if you want to specify exact coordinates):

```python
@tool  
def skissify_json(elements: list) -> str:
    """Generate a sketch from a Skissify JSON element list."""
    response = requests.post(
        "https://skissify.com/api/sketch",
        json={"elements": elements}
    )
    return response.json()["url"]
```

**Tip:** Use the `human` endpoint for natural language tasks (architecture agents, renovation helpers, room planning). Use the JSON endpoint when you need precise control (geometry calculations, measured layouts, procedural generation).

---

## Framework 4: CrewAI (Python)

**Installation time: 5 minutes**

CrewAI's multi-agent architecture is great for pipelines where one agent researches, another drafts, and a third visualizes.

```python
from crewai import Agent, Task, Crew
from crewai.tools import BaseTool
import requests

class SkissifyTool(BaseTool):
    name: str = "skissify_sketch_generator"
    description: str = "Generates hand-drawn sketch URLs from plain text space descriptions"

    def _run(self, description: str) -> str:
        resp = requests.post(
            "https://skissify.com/api/human",
            json={"description": description}
        )
        url = resp.json()["url"]
        return f"Sketch generated: {url}"

# Visualization specialist agent
visualizer = Agent(
    role="Spatial Visualizer",
    goal="Convert space descriptions into hand-drawn sketch URLs",
    backstory="Expert at translating spatial descriptions into clear visual representations",
    tools=[SkissifyTool()],
    verbose=True
)

visualize_task = Task(
    description="Given the room description, generate a hand-drawn sketch URL using Skissify",
    expected_output="A permanent Skissify sketch URL for the described space",
    agent=visualizer
)
```

**Use case:** Research agent gathers client requirements → planning agent drafts layout → Skissify agent visualizes → delivery agent sends the sketch URL to the client.

---

## Framework 5: n8n (No-code / Low-code)

**Installation time: 3 minutes (no code)**

n8n's HTTP Request node connects to any API. No SDK needed.

**Workflow:**
1. Add an **HTTP Request** node
2. **Method:** POST
3. **URL:** `https://skissify.com/api/human`
4. **Body (JSON):**
```json
{
  "description": "{{ $json.roomDescription }}"
}
```
5. The output includes `url` — pass this to your Slack/email/Notion node

**Common n8n workflow:** Webhook receives room description → Skissify generates sketch → Slack posts the URL to client channel.

---

## The Underlying Principle

All five integrations work because Skissify follows one design rule: **flat JSON, absolute coordinates**.

Every element is a top-level sibling. No nesting. No parent-child relationships. This is why any LLM can generate valid Skissify JSON with 94% first-try accuracy — the model doesn't need to track hierarchy, just emit elements.

The 14 supported primitives:
`wall`, `door`, `window`, `room`, `furniture`, `label`, `arrow`, `circle`, `rect`, `line`, `polygon`, `stair`, `note`, `dimension`

Everything you need to sketch a spatial layout. Nothing you don't.

---

## What to Build Next

- **Renovation assistant:** User describes changes, agent generates before/after sketch URLs
- **Real estate bot:** Text "3-bed house, describe your ideal layout" → sketch URL in seconds
- **Architecture review:** Agent generates sketch → sends to Human for feedback → revises → commits to design system
- **DnD map generator:** "Medieval tavern, common room upstairs, cellar below" → dungeon master gets an instant map

---

## Start in 30 Seconds

No framework? Try Human Mode directly:

**[skissify.com/human](https://skissify.com/human)** — no account, no install, no JSON.

Type any room description. Get a sketch URL.

Then decide if you want to integrate it into your agent stack.

---

*Skissify is open for API access. Free tier available. MCP server: `npm install -g @skissify/mcp-server`*
