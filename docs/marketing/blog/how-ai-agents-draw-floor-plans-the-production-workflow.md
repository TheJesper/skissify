# How AI Agents Draw Floor Plans: The Production Workflow (2026 Edition)

*Published April 1, 2026 | 8 min read | Technical*

---

There's a step missing from most AI agent workflows. Agents can plan, write, search, and execute — but when spatial reasoning is needed, they describe it in text and hope the human can visualize it.

That breaks the loop.

Here's how to add drawing capability to your AI agent in 2026 — and why the specific approach matters.

## The Problem With Text-Based Spatial Output

Consider a real estate AI helping a client understand a listing:

```
"The apartment has an open-plan living and dining area on the south side. 
The kitchen is adjacent to the dining area on the east wall. 
There are two bedrooms: the master bedroom faces north with an ensuite, 
the second bedroom faces east with a shared bathroom..."
```

This is accurate. It's also exhausting to read. The human has to construct the floor plan mentally, which requires sustained concentration and still results in an uncertain mental model.

What would actually help: a rough floor plan sketch. Not a CAD drawing. Not an architectural blueprint. Just a napkin-sketch-quality spatial layout.

That's what Skissify provides.

## The Architecture

Skissify has two interfaces:
1. **REST API** — accepts JSON schema, returns a sketch URL
2. **MCP server** — exposes `create_sketch` as a tool for Claude Desktop and any MCP-compatible agent

For production agents, you'll use either the REST API (LangGraph, CrewAI, AutoGen, n8n) or the MCP server (Claude Desktop, Claude API with tool use).

## Schema Design: Why This Matters

The most important technical decision in using Skissify is your JSON schema design.

We ran 1,000 agent completions comparing two approaches:

**Nested schema (intuitive but wrong):**
```json
{
  "rooms": {
    "living_room": {
      "dimensions": {"width": 5, "height": 4},
      "position": {"x": 0, "y": 0},
      "features": ["sofa", "tv"]
    }
  }
}
```
LLM first-try accuracy: **61%**

**Flat array schema (less intuitive but right):**
```json
{
  "elements": [
    {"type": "room", "label": "Living Room", "x": 0, "y": 0, "w": 5, "h": 4},
    {"type": "item", "label": "Sofa", "x": 1, "y": 2, "w": 2, "h": 1},
    {"type": "item", "label": "TV", "x": 4, "y": 1, "w": 0.5, "h": 0.5}
  ]
}
```
LLM first-try accuracy: **94%**

Why? LLMs are trained on sequential data. A flat array is a list of instructions: "draw this, then this, then this." A nested schema requires maintaining multiple levels of context simultaneously — which degrades generation quality.

**Rule: flatten your schemas when you're designing for LLM consumption.**

## Real Workflow: Real Estate AI

Here's a working LangGraph node that generates a floor plan from a property description:

```python
from langchain_core.messages import AIMessage
import httpx

async def generate_floor_plan(state: dict) -> dict:
    """Generate a Skissify floor plan from property description."""
    
    property_description = state["property_description"]
    
    # Ask the LLM to convert the description to a flat sketch schema
    schema_prompt = f"""
    Convert this property description to a Skissify sketch schema.
    Use ONLY flat arrays — no nested objects.
    
    Schema format:
    {{
      "elements": [
        {{"type": "room", "label": "Name", "x": 0, "y": 0, "w": 5, "h": 4}},
        {{"type": "door", "label": "door", "x": 5, "y": 2, "w": 0.2, "h": 1}},
        {{"type": "window", "label": "window", "x": 2, "y": 0, "w": 1.5, "h": 0.2}}
      ],
      "title": "Floor Plan Title",
      "style": "sketch"
    }}
    
    Property description: {property_description}
    
    Return ONLY the JSON, no explanation.
    """
    
    schema_response = await llm.ainvoke(schema_prompt)
    schema = json.loads(schema_response.content)
    
    # Call Skissify API
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.skissify.com/v1/render",
            json=schema,
            headers={"Authorization": f"Bearer {SKISSIFY_API_KEY}"}
        )
        sketch_data = response.json()
    
    return {
        **state,
        "floor_plan_url": sketch_data["url"],
        "floor_plan_schema": schema
    }
```

The output is a stable URL (`skissify.com/s/abc123`) that you can embed in emails, include in chat responses, or pass to the next agent in the chain.

## Real Workflow: Architecture Briefing Agent

A more complex example: an architecture brief generates multiple floor plan variations for client review.

```python
async def generate_variations(state: dict) -> dict:
    """Generate 3 floor plan variations from a brief."""
    
    brief = state["client_brief"]
    variations = []
    
    for variation_name, approach in [
        ("Open Plan", "maximize open space, minimize walls"),
        ("Traditional", "separate rooms, defined spaces"),
        ("Hybrid", "open kitchen/living, private bedrooms")
    ]:
        schema = await generate_schema_from_brief(brief, approach)
        sketch_url = await render_sketch(schema)
        
        variations.append({
            "name": variation_name,
            "url": sketch_url,
            "schema": schema
        })
    
    return {**state, "variations": variations}
```

Each variation gets a unique URL. The client receives three links, clicks through the rough sketches, and says "option 2, but with the kitchen facing the garden." The agent picks that up, modifies the schema, re-renders.

One brief. Three variations. Human feedback. Refined output. No Figma required.

## MCP Integration (Claude Desktop)

For conversational use, the MCP server is the fastest path:

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

With this config, Claude Desktop can call `create_sketch` directly when asked to draw anything spatial:

> "Can you sketch a floor plan for a 3-bedroom apartment, roughly 90m², with the master bedroom away from the street?"

Claude translates this to a Skissify schema, renders it, and returns a URL in the conversation. No extra code. No pipeline. Four lines of config.

## The Multi-Agent Pattern

In a multi-agent system, Skissify sketches become shareable artifacts between agents:

1. **Planning agent** generates layout schema
2. **Skissify render** produces a URL
3. **Review agent** receives the URL + original brief, compares them, outputs feedback
4. **Revision agent** modifies the schema based on feedback
5. **Render again** → final URL delivered to human

The sketch URL is persistent — it stays the same as long as the schema doesn't change. This makes it a stable reference point in async multi-agent workflows.

## Getting Started

1. `npx skissify-mcp` — test with Claude Desktop immediately
2. `POST https://api.skissify.com/v1/render` with your flat JSON schema
3. Human Mode at `skissify.com/human` — no code, no account, just describe it

The first 100 renders are free on all accounts. API key available at skissify.com/dashboard.

---

*Questions? The JSON schema reference is at [skissify.com/docs](https://skissify.com/docs). The MCP server source is on GitHub.*
