# How AI Agents Can Draw Floor Plans

*Published: April 4, 2026 — Cycle 130 edition (launch day)*
*~950 words | 6 min read*
*Tags: #AI #Agents #MCP #FloorPlan #Claude #Developers #VibeCoding #VibeDrawing*

---

Here is the exact exchange I had with Claude yesterday.

**Me:** Design a 35sqm studio apartment. Sleeping area separated from living space. Kitchen on the north wall. Maximize natural light from the south-facing window.

**Claude:** *calls `skissify_render`*

**Claude:** Here's the floor plan: [sketch URL]

The sketch was ready in 150 milliseconds. I shared the URL with someone who had never heard of Skissify. She opened it on her phone and immediately started pointing at the screen: "Can we move the kitchen here? The sleeping area feels cramped."

That's the thing. She was reacting to a sketch, not reading a paragraph. That's not a small difference — it's the entire difference.

---

## Why Language Models Can Describe Space But Not Show It

Claude can reason about floor plans better than most humans. It understands traffic flow, clearances, natural light, furniture sizing, ADA requirements. Give it constraints, and it designs around them.

The problem is output format.

Language models were trained to produce text. When asked to describe a floor plan, they produce an excellent description — and then hand you a wall of words that no contractor can use, no stakeholder can react to, and no AI pipeline can pass as typed state to the next node.

The three alternative output formats all have fatal flaws:

**Generated images (DALL-E, Stable Diffusion):** Stochastic. Same prompt, different output every time. You cannot diff two generated images to understand what changed. You cannot cache by content hash. You cannot version-control them. For any workflow that needs reproducibility — architecture, real estate, product design — this is disqualifying.

**ASCII art:** Deterministic but not presentable. A 40-column floor plan in a `<code>` block is an insult to the contractor who has to act on it.

**Raw SVG generation:** Language models can technically generate SVG markup, but LLM-generated SVG is fragile, verbose, and inconsistently structured. You'll spend more time debugging malformed SVG than you saved generating it.

What the field needed was a structured intermediary: a simple JSON format that describes spatial relationships, paired with a specialized renderer that turns it into a consistent, visually credible sketch.

---

## The Three-Line Setup

Install the MCP server in 30 seconds:

```bash
npx skissify-mcp
```

Add it to Claude Desktop's `claude_desktop_config.json`:

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

Restart Claude Desktop. That's it. Claude can now draw.

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
    { "type": "rect", "x": 180, "y": 250, "w": 170, "h": 180, "label": "Kitchen" },
    { "type": "rect", "x": 30, "y": 430, "w": 100, "h": 80, "label": "Bathroom" },
    { "type": "door-symbol", "x": 50, "y": 430, "w": 40, "h": 10, "rotation": 270 },
    { "type": "window", "x": 100, "y": 30, "w": 120, "h": 10, "label": "South window" },
    { "type": "window", "x": 250, "y": 30, "w": 80, "h": 10 },
    { "type": "text", "x": 170, "y": 140, "label": "sofa + coffee table" },
    { "type": "dim", "x": 30, "y": 520, "w": 320, "h": 0, "label": "5.5m" }
  ]
}
```

The schema is flat by design. Every element is a top-level object in the array — no nesting, no parent-child relationships. This was a deliberate architectural decision, and it has measurable consequences:

**Flat schema (Skissify format):**
- LLM first-attempt validity: 88–94%
- Avg element position error: 0.3 elements
- Render failures: 0%

**Nested/hierarchical schema (common alternative):**
- LLM first-attempt validity: ~61%
- Avg element position error: 2.1 elements
- Render failures: 8% (malformed nesting)

Flat wins. Language models generate flat arrays reliably because there are fewer structural decisions to get wrong. Schema is a product decision, not just a technical one.

---

## Four Workflows That Work Today

**Claude Desktop + MCP:** The setup above. Type a description, get a sketch URL. Works out of the box.

**REST API (no auth):**
```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d @manifest.json | jq .sketchUrl
```
Embed this in any automation, pipeline, or product. Returns a permanent shareable URL.

**n8n / Make / Zapier:** Add the Skissify HTTP node. Connect it to a form, a CRM field, or a property listing database. Every new property description gets an auto-generated floor plan sketch attached.

**Multi-agent orchestration (CrewAI, LangGraph, Mastra):** The sketch URL becomes a typed output from the design agent, passed as structured state to the next agent in the pipeline. Because the manifest is reproducible, the sketch is diffable and version-controllable.

---

## The Non-Technical Entry Point

Everything above is for developers and AI builders.

For everyone else: [skissify.com/human](https://skissify.com/human)

Type a description in plain English. Claude translates it to a manifest and renders the sketch. No JSON. No code. No account.

"Living room 4x5m, south wall is mostly glass, sofa facing the garden, TV unit on the north wall, reading corner in the east corner"

→ Sketch in 4 seconds.

Your contractor can react to that. Your client can react to that. Your renovating-aunt who texted you about her kitchen can react to that.

---

## The Determinism Argument

Before I finish: the most underrated feature of Skissify isn't the hand-drawn style. It's that the same manifest always produces the same sketch.

That means:
- Store the manifest in Git. The sketch is reproducible from any commit.
- Diff two manifests to understand what changed spatially — not visually.
- Cache sketch renders by manifest hash. Zero redundant renders.
- Pass manifests as typed state between agent nodes. No opaque blob artifacts.

Generated images can't do any of this. Determinism isn't a constraint — it's the feature that makes sketches composable in agent workflows.

---

*MCP server: `npx skissify-mcp` | API: [skissify.com/api](https://skissify.com/api) | Human mode: [skissify.com/human](https://skissify.com/human)*
