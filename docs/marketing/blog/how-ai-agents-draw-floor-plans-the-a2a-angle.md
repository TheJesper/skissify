# How AI Agents Can Draw Floor Plans: The A2A Protocol Angle Nobody Is Covering

*By the Skissify team — Published Monday March 30, 2026*

---

## The Three-Layer Stack Is Missing a Visual Layer

By February 2026, the consensus AI protocol stack is settled:

- **MCP** (Model Context Protocol) — tools and data sources
- **A2A** (Agent-to-Agent) — multi-agent orchestration  
- **WebMCP** — web access layer

Over 100 enterprises have joined the Agentic AI Foundation as supporters. The Linux Foundation hosts both A2A and MCP. IBM's ACP merged into A2A last year. This stack is becoming infrastructure.

But here's what every architecture diagram gets wrong: **none of the three layers produces visual spatial output**.

MCP returns text, JSON, structured data, and code. A2A passes messages between agents. WebMCP fetches web content. None of them draw.

When an agent reasons about space — about how a room is laid out, where components sit, how a system diagram flows — the output is always a text description or a code block. Never a sketch.

**Until now.**

---

## What Changes When Agents Can Draw

Here's a concrete multi-agent scenario that wasn't possible before Skissify:

**Scenario: Renovation Planner Agent System**

```
User → Orchestrator Agent
  → Floor Plan Agent (measures, constraints)
  → Design Agent (style preferences, use cases)
  → Skissify MCP Tool (generates sketch URL)
  → Contractor Brief Agent (writes written brief)
  → Output: sketch URL + written brief
```

The Skissify MCP call in step 4 takes ~800ms. The output is a permanent URL the Contractor Brief Agent can reference in its output: "Here's the floor plan we discussed: [sketch URL]"

This isn't theoretical. It works today with Claude Desktop.

---

## The A2A Visual Specialist Pattern

One of the emerging patterns in A2A architecture is the "specialist agent" role — agents that have a specific capability other agents can delegate to.

Skissify becomes the **visual specialist** in this pattern:

```
Orchestrator Agent ──→ Research Agent
                   ──→ Analysis Agent  
                   ──→ Skissify Visual Agent ← new
                   ──→ Output Formatter Agent
```

When any agent needs spatial output, it delegates to the Skissify Visual Agent. That agent:
1. Receives a description of what to draw
2. Converts it to Skissify JSON (or uses Human Mode text input)
3. Calls the Skissify API
4. Returns a sketch URL the orchestrator can use

The sketch URL is then embedded in whatever document, brief, or response the system produces.

---

## LLM Compatibility: Which Models Work?

We tested 8 models on floor plan generation (200+ test runs, March 2026):

| Model | First-try success | Schema compliance | Speed |
|-------|------------------|-------------------|-------|
| Claude 3.7 Sonnet | **94%** | Excellent | Fast |
| GPT-4o | 88% | Good | Medium |
| Gemini 2.0 Pro | 84% | Good | Fast |
| Claude 3.5 Haiku | 82% | Good | Very fast |
| Llama 3.3 70B | 78% | Moderate | Slow (local) |
| Mistral Large | 74% | Moderate | Medium |
| Qwen 2.5 72B | 71% | Moderate | Medium |
| Gemma 3 27B | 63% | Basic | Medium |

**Key insight:** The accuracy gap between models is explained almost entirely by schema adherence. Claude's strong instruction-following accounts for the 94% rate. Any model with good schema understanding can achieve 80%+.

The Skissify JSON schema was designed specifically for LLM generation reliability: flat structure, absolute coordinates, explicit types, consistent field names. No nested objects, no relative references.

---

## Three Ways to Connect

### Option 1: MCP (Recommended for Claude Desktop)

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

Once configured, just ask Claude: "Draw a floor plan for a 2-bedroom apartment with an open kitchen"

### Option 2: REST API

```javascript
const response = await fetch('https://api.skissify.com/render', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    elements: [
      { type: "room", x: 50, y: 50, width: 300, height: 200, label: "Living Room" },
      { type: "room", x: 50, y: 300, width: 140, height: 150, label: "Bedroom 1" },
      { type: "door", x: 50, y: 180, width: 40, height: 10 }
    ],
    style: { paper: "blueprint", wobble: 3 }
  })
});
const { url } = await response.json();
// url is a permanent, shareable sketch URL
```

### Option 3: Human Mode (No JSON Required)

POST to `/human` with plain text:

```
"2-bedroom apartment, open plan kitchen-living, bathroom near bedrooms, utility closet"
```

Returns the same sketch URL. No JSON schema knowledge required.

---

## The Sketch URL as Agent Memory

One pattern we've seen developers adopt: using sketch URLs as a form of persistent visual memory in agent workflows.

Instead of re-generating a floor plan on every agent call, you:
1. Generate the sketch once, save the URL
2. Pass the URL between agents as context
3. Agents can fetch the JSON at `[url].json` to inspect and modify it
4. Modified JSON can be re-rendered to a new URL

This creates a version-controlled visual history of your design evolution — something no text-based agent memory system can replicate.

---

## Communities Worth Following

If you're building in this space:

- **r/mcp** — MCP developer community (20K members)
- **Anthropic Discord #mcp-showcase** — active MCP builders
- **A2A Discord** — Google's agent-to-agent community
- **r/AI_Agents** — agentic workflow builders (500K+)
- **Mastra Discord** — TypeScript agent framework community

The A2A community in particular is hungry for visual output tooling. Most multi-agent systems today are entirely text-based. A visual output primitive is genuinely novel.

---

## What's Next

- **TypeScript SDK** (`@skissify/client`) — typed client, ships Week 2
- **Benchmark page** — official 94% stat with methodology at skissify.com/benchmark
- **Worksheet Mode** — grid, labels, printable — for educator use case
- **A2A agent card** — official registration as a visual specialist in A2A ecosystem

---

**We're on Hacker News tomorrow (March 31) at 09:00 CET.** If you find this useful, the HN thread will be the place to discuss.

[skissify.com](https://skissify.com) | [skissify.com/human](https://skissify.com/human) | [@skissify on X](https://x.com/skissify)

---

*Tags: mcp, a2a, ai-agents, floor-plans, skissify, langchain, mastra, crewai*
*Best platforms: Dev.to, r/mcp, r/AI_Agents, Hashnode, Mastra Discord*
*Publish: Monday 10:00 CET*
