# A2A + MCP Converge. Skissify Works With Both.

*Technical post for AI agent developers — March 28, 2026*

---

The AI agent protocol landscape just clarified itself.

MCP (Model Context Protocol) and A2A (Agent2Agent, now under the Linux Foundation) are converging. Both specs are now vendor-neutral. The ecosystem is coalescing around two roles: **tools** (what agents use) and **agents** (what agents talk to).

Skissify works as both.

## The Two Roles

**MCP: Tool role.**
When Claude (or any MCP-compatible LLM host) calls the Skissify MCP server, Skissify acts as a tool. The agent says "draw this," provides JSON, and receives a sketch URL. One call, one response. Deterministic, synchronous, stateless.

```json
// MCP tool call
{
  "tool": "create_sketch",
  "input": {
    "elements": [...],
    "style": "blueprint",
    "wobble": 3
  }
}
// Returns: { "url": "https://skissify.com/s/abc123" }
```

**A2A: Specialist agent role.**
In an A2A multi-agent system, Skissify can be registered as a visualization specialist. Other agents discover it via the agent registry, send it structured spatial data via A2A task protocol, and receive sketch artifacts in return.

The sketch URL is a persistent artifact — it can be passed between agents, stored in agent memory, retrieved and modified, and shared with humans. This is exactly the kind of structured output A2A was designed to exchange.

## Why This Timing Matters

The protocol consolidation is happening *now*. March 2026 is the moment where:

1. MCP has hit mainstream (97M+ monthly SDK downloads)
2. A2A is stabilized under Linux Foundation governance
3. Both protocols are now effectively open infrastructure

Tools built in this window become part of the stack before the standards calcify. Skissify's MCP server is already published. A2A support is on the roadmap for Week 2.

## The Missing Output Primitive

Here's the landscape as it stands:

| Output Type | MCP Tools Available |
|-------------|--------------------| 
| Text | Thousands |
| Code | Hundreds |
| Data (JSON, CSV) | Hundreds |
| Images (generative) | Dozens |
| **Structured visual output** | **1 (Skissify)** |

There's a gap between generative images (DALL-E, Stable Diffusion — probabilistic, not deterministic, no schema) and precision CAD/CAM (too complex, requires specialized knowledge). Skissify fills that gap: structured spatial output with schema validation, 94% first-try LLM success, and hand-drawn aesthetic that's intentionally approximate.

Approximate is the right word. The design philosophy is deliberate: a hand-drawn sketch signals "this is directional, not final." For early-stage agent workflows — planning, ideation, communication — you want approximate. A perfectly precise CAD drawing implies decisions that haven't been made yet.

## The Integration in Four Lines

For LangGraph:

```python
from skissify import SkissifyClient

# In your agent's tool definitions:
@tool
def create_sketch(json_data: dict) -> str:
    """Creates a hand-drawn sketch from spatial JSON. Returns URL."""
    client = SkissifyClient(api_key=os.environ["SKISSIFY_API_KEY"])
    result = client.create(json_data)
    return result.url
```

For n8n:
HTTP Request node → POST to `https://api.skissify.com/v1/sketches` with JSON body → extract `url` from response. Three nodes. No code.

For CrewAI:
Register as a Tool with the `create_sketch` function above. Agent then calls it naturally: "Create a floor plan for a 3-bedroom apartment and save the sketch URL to memory."

## Sketch URLs as Agent Memory

This deserves a callout because it's a pattern that doesn't appear anywhere in the agent tooling literature yet.

A sketch URL is:
- **Persistent**: The URL lives indefinitely (or as long as you want it to)
- **Inspectable**: The URL contains the full JSON schema — you can fetch it, read it, modify it
- **Shareable**: Pass it to a human, another agent, a document, a Slack message
- **Versionable**: Modify the JSON, create a new sketch, store the new URL — you have a diff history

```python
# Agent creates sketch, stores URL in memory
sketch_url = create_sketch(floor_plan_json)
agent.memory.store("kitchen_floor_plan_v1", sketch_url)

# Agent revises based on user feedback
revised_json = revise_floor_plan(original_json, "add a bathroom")
new_url = create_sketch(revised_json)
agent.memory.store("kitchen_floor_plan_v2", new_url)

# Human sees both versions via URL
```

This is visual versioning. It's not a new concept in software engineering, but it's completely absent from current agent tooling. The sketch URL makes spatial design artifacts first-class objects in agent memory.

## What "Deterministic" Means Here

The phrase that matters for agent reliability: **schema-validated, deterministic output**.

Every sketch generated from the same JSON produces the same visual layout. The wobble (hand-drawn texture) varies slightly by seed, but the structure — room dimensions, door positions, element relationships — is identical. This is fundamentally different from image generation models, which are probabilistic.

For agents that need to:
- Iterate on a design ("make the kitchen larger")
- Verify a change was applied ("did the door move?")
- Compare two versions ("what changed between v1 and v2?")

...deterministic output is essential. You can't do visual iteration with probabilistic generation. The schema is the contract.

## What's Next

MCP: live at `npm install -g @skissify/mcp-server`

REST API: documented at `skissify.com/docs/api`

A2A support: Week 2 — registering as a specialist agent in A2A networks, supporting A2A task protocol for async sketch requests.

TypeScript SDK (`@skissify/client`): Week 2 — typed client for Mastra/LangChain/TypeScript-native stacks.

OpenAPI spec: Week 1 — for OpenAPI-compatible agent frameworks.

---

*Skissify is JSON → hand-drawn sketches. Built for AI agents. Used by AI developers, homeowners, dungeon masters, and geometry teachers. MCP server live. REST API live. Free tier available at [skissify.com](https://skissify.com).*
