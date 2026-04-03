# How AI Agents Can Draw Floor Plans

*Published: April 4, 2026 — Cycle 132 edition*
*~950 words | 6 min read*
*Tags: #AI #Agents #MCP #FloorPlan #Claude #Developers #VibeCoding #VibeDrawing #ModelContextProtocol*

---

This is the exact conversation I had with Claude last week.

**Me:** Design a 35sqm studio apartment. Sleeping area separated from living space. Kitchen on the north wall. South-facing window for natural light.

**Claude:** *[calls skissify_render with JSON manifest]*

**Claude:** Here's your floor plan: [sketch URL]

The sketch appeared in 150 milliseconds. I sent the URL to a friend who had never heard of Skissify. She opened it on her phone and immediately pointed at the screen: "Can we move the kitchen? The sleeping area feels cramped."

She wasn't reading text. She wasn't parsing JSON. She was *reacting* to a spatial layout — the way humans react to spaces. That's not a small difference from reading a paragraph. It's the entire difference.

---

## The Problem AI Agents Had Until Now

Language models are surprisingly good at spatial reasoning. Claude understands traffic flow, furniture clearances, natural light angles, ADA requirements, room proportions. Give it architectural constraints and it designs around them fluently.

The problem has never been the reasoning. The problem is the output format.

Language models produce text. When asked to describe a floor plan, they produce an excellent, accurate, detailed description — and then hand you a wall of prose that no contractor can use, no stakeholder can react to, and no downstream AI system can process as typed spatial state.

The three alternative output formats all have fatal flaws:

**Generated images (DALL-E, Midjourney, GPT-4o images):** Stochastic. Same prompt gives different output every time. You cannot diff two generated floor plans to understand what changed. You cannot version-control them. You cannot cache by hash. For any workflow requiring reproducibility — architecture, real estate, product design, agent pipelines — this is disqualifying.

**ASCII art:** Technically deterministic, but presenting a 40-column ASCII floor plan to a homeowner or contractor is not a viable workflow. The signal-to-noise ratio makes it unusable outside developer contexts.

**Raw SVG generation:** Possible in theory. In practice, LLM-generated SVG is verbose, fragile, and inconsistently structured. You'll spend more time debugging malformed SVG than you saved generating it.

What the field needed was a structured intermediary: a simple JSON schema that describes spatial relationships in a format language models can reliably generate, paired with a specialized renderer that converts it to visually credible, consistent sketches. That renderer is Skissify.

---

## Three-Line Setup

```bash
npx skissify-mcp
```

Add to Claude Desktop's `claude_desktop_config.json`:

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

Restart Claude Desktop. Claude can now draw.

---

## What the Manifest Looks Like

When Claude calls `skissify_render`, it generates a manifest like this:

```json
{
  "paper": "cream",
  "tool": "pencil",
  "wobble": 3,
  "humanness": 0.6,
  "elements": [
    { "type": "rect", "x": 30, "y": 30, "w": 320, "h": 220, "label": "Living / Dining" },
    { "type": "rect", "x": 30, "y": 250, "w": 150, "h": 180, "label": "Sleeping Alcove" },
    { "type": "rect", "x": 180, "y": 250, "w": 170, "h": 80, "label": "Kitchen" },
    { "type": "door-symbol", "x": 30, "y": 380, "w": 60, "h": 60 },
    { "type": "window", "x": 160, "y": 30, "w": 100, "h": 20 },
    { "type": "text", "x": 200, "y": 15, "text": "North" }
  ]
}
```

The schema is flat. No nested objects, no complex coordinate transforms. This is deliberate — flat schemas produce 88–92% valid output on first LLM attempt. Nested schemas drop to under 70%.

The result: a sketch URL in 150ms that you can share in a Slack message, embed in a PR, or pass to the next node in an agent workflow.

---

## The Determinism Argument

Here's the point that separates Skissify from every image generation approach.

Same manifest → same sketch. Every render. Every time.

This is not a limitation — it's the design. Deterministic output means:

- **Version control works.** Commit the manifest to git. The sketch is reproducible from any commit.
- **Diffing works.** Change one element in the manifest, render again, see exactly what changed spatially.
- **Caching works.** Hash the manifest, cache the URL. No redundant renders.
- **Agent pipelines work.** Pass the sketch URL as structured state to the next agent. It will be there when the next agent checks.

Image generation is a creative tool. Determinism is not a property it needs. For agent workflows, determinism is the only property that matters.

---

## Four Real Workflows

**1. Renovation planning with Claude.** Homeowner describes their layout in plain language. Claude asks clarifying questions. Claude renders the current state, then a proposed renovation. Both are shareable URLs. Homeowner sends both to their contractor.

**2. Architecture firm AI assistant.** Architect describes a client brief. AI generates 3 layout options as sketch URLs. Architect selects the closest match, adds architect-grade detail in their CAD tool. The sketch was the communication layer, not the final artifact.

**3. Real estate listing generation.** Property management system feeds address data and room measurements to a script. Script generates Skissify manifests programmatically. API renders a floor plan sketch for each listing automatically. No human drawing required.

**4. GitHub PR visual diff.** A GitHub Action generates a Skissify floor plan from a spatial JSON manifest and attaches it to pull requests as a visual diff. Every time the manifest changes, a new sketch is generated. Code reviewers see what changed spatially, not just in JSON.

---

## The Human Mode

Not every user is an AI developer. Skissify ships with a human mode at skissify.com/human — a text box where you describe your room in plain English and get a floor plan sketch back in seconds. No JSON, no MCP, no API keys.

The same renderer. The same 150ms latency. Just a different front door.

---

*Install the MCP server: `npx skissify-mcp` | Try the human mode: [skissify.com](https://skissify.com) | REST API docs: skissify.com/docs*

*#AI #AIAgents #MCP #ModelContextProtocol #FloorPlan #VibeCoding #VibeDrawing #BuildInPublic*
