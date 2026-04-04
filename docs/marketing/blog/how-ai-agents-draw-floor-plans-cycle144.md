# How AI Agents Can Draw Floor Plans

**The Token Economy: Why JSON Manifests Are More Efficient Than Language for Spatial AI**

*Angle: Cycle 144 — "The Token Economy" — LLMs describing spatial layouts waste tokens on imprecise natural language; JSON manifests are compressed, lossless spatial encodings*

---

When a language model describes a floor plan, it is doing something deeply inefficient.

"The master bedroom is in the northeast quadrant of the house, approximately 4.5 meters by 5.2 meters, with a window centered on the north wall and a door on the south wall that opens into a hallway."

That is 34 words to encode a rectangle, a window, and a door. Three elements. Thirty-four words.

And it still cannot be rendered without interpretation. "Northeast quadrant" is relative. "Approximately" is noise. "Centered" needs a coordinate system. "Opens into a hallway" implies a topology the description doesn't encode.

Compare to the JSON manifest:

```json
{
  "elements": [
    { "type": "rect", "x": 300, "y": 50, "w": 180, "h": 210, "label": "Master Bedroom" },
    { "type": "window", "x": 360, "y": 50, "w": 100 },
    { "type": "door-symbol", "x": 300, "y": 245, "w": 60 }
  ]
}
```

Three elements. Machine-readable. Directly renderable. No interpretation required. And significantly fewer tokens.

---

## The Token Economy of Spatial Information

In LLM workflows, tokens are a real cost. At scale — thousands of agent invocations per day — the difference between a 34-word text description and a 25-token JSON manifest is measurable.

But token count is the secondary argument. The primary argument is **losslessness**.

Natural language descriptions of spatial data are inherently lossy. Every time spatial intent passes through language:
1. The sender encodes spatial relationships as natural language
2. The receiver decodes natural language back into spatial relationships
3. The receiver's coordinate system, vocabulary, and default assumptions differ from the sender's

Each hop introduces drift. In a three-agent pipeline:
- Agent 1 produces the layout concept
- Agent 2 produces a language description
- Agent 3 renders something *close to* the original intent

"Close to" is not good enough for floor plans that engineers or homeowners will actually use.

---

## JSON Manifests as Compressed Spatial Encoding

A Skissify manifest is essentially a spatial encoding that:

1. **Has a fixed coordinate system** — no ambiguity about "northeast" vs absolute x/y
2. **Has typed elements** — `door-symbol` vs `door-slide` vs `window` are unambiguous
3. **Is directly renderable** — pass it to the Skissify API, get an image, no interpretation layer
4. **Is diffable** — you can compare two manifests and see exactly what changed

This is the same insight that made git useful: instead of storing "the document now says X instead of Y," store the exact diff. Instead of storing "the bedroom moved northeast," store the exact coordinate change.

For AI agents producing spatial workflows, the manifest is not a workaround. It is the correct representation.

---

## The Multi-Agent Floor Plan Workflow

Here is a concrete workflow using Skissify manifests as the shared visual state:

```
User prompt → Planning Agent → JSON manifest v1 → Skissify API → sketch_url_v1
                                      ↓
                              Critique Agent → edits manifest → sketch_url_v2
                                      ↓
                             Refinement Agent → final manifest → sketch_url_v3
                                      ↓
                              User reviews sketch_url_v3 → approves
```

At every step, the shared artifact is the JSON manifest. No agent needs to parse a language description of spatial layout. No translation step introduces drift. The sketch URLs are stable, shareable references — they can be dropped into a Slack thread, stored in a task tracker, or linked from a report.

Each manifest version is the full state of the floor plan at that point. `sketch_url_v2` is reproducible from the manifest that produced it. You can go back to any version by replaying any manifest.

---

## Why This Matters for the AI Agent Ecosystem in 2026

In 2026, the dominant AI pattern is multi-agent orchestration:
- MCP (Model Context Protocol) connects agents to tools
- A2A (Agent-to-Agent) connects agents to each other
- Specialized agents handle subtasks in parallel

Every agent that produces spatial output — floor plans, event layouts, network diagrams, classroom arrangements — currently either:
a) Returns a text description (lossy, not directly renderable)
b) Returns an image (not editable by downstream agents)
c) Returns SVG or custom XML (no standard rendering layer)

The Skissify manifest is option (d): a JSON format with a standard rendering layer, designed to be produced by LLMs and consumed by humans and downstream agents.

This is not just a nice-to-have. It is infrastructure. The same way APIs replaced file transfers as the standard for machine-to-machine data exchange, structured visual manifests will replace text descriptions as the standard for spatial state in multi-agent workflows.

---

## The Token Economy in Numbers

| Representation | Tokens (approx.) | Renderable? | Diffable? | Agent-producible? |
|----------------|-----------------|-------------|-----------|------------------|
| Natural language description | 30-80/element | No | Hard | Yes |
| Skissify JSON manifest | 10-20/element | Yes (API) | Yes | Yes |
| SVG | 40-200/element | Yes | Hard | Unreliable |
| Generated image | N/A | Yes | No | No |

For a 10-room floor plan: language description ≈ 400-800 tokens. Skissify manifest ≈ 100-200 tokens. Half the tokens, lossless precision, directly renderable.

---

## Get Started

The Skissify MCP server lets agents call `skissify_render` with a manifest and receive a sketch URL. Available at **skissify.com/docs/mcp**.

For the full API reference: **skissify.com/docs/api**.

The token economy argument is simple: pay fewer tokens, get better spatial fidelity, skip the interpretation step. That is a strictly better deal.

#AIAgents #MCPServer #FloorPlanAI #MultiAgent #TokenEconomy #AgentWorkflow #SkissifyAPI
