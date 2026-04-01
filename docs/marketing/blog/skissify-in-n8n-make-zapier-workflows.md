# How to Add Hand-Drawn Sketches to Any n8n, Make, or Zapier Workflow

*Published: April 2026 | Platform: Dev.to, r/n8n, automation communities*

---

Skissify has a REST API. Which means it works anywhere HTTP works.

That includes n8n, Make (formerly Integromat), and Zapier — the three automation platforms where most non-developer AI workflows actually live.

Here's the one-liner: **POST JSON → get SVG back → attach to anything.**

---

## The HTTP Request (Takes 2 Minutes to Set Up)

```
POST https://skissify.com/api/render
Content-Type: application/json

{
  "paper": "cream",
  "tool": "ballpoint",
  "amplitude": 1,
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 300, "h": 200, "label": "Living Room" },
    { "type": "door-symbol", "x": 50, "y": 50, "size": 40 },
    { "type": "rect", "x": 50, "y": 280, "w": 140, "h": 120, "label": "Bedroom" }
  ]
}
```

Returns: SVG content (or a shareable URL if you use the `/api/render?format=url` endpoint).

No auth. No API key. Free tier with generous limits.

---

## Four Real Workflow Ideas

### 1. AI Architecture Diagram on Every PR

**Trigger:** GitHub — new pull request opened
**Action:** OpenAI / Claude — summarize changed files into component names and relationships
**Action:** Skissify — POST the component layout as JSON
**Action:** GitHub — attach rendered sketch as PR comment

Every PR now includes an auto-generated sketch of what changed. Your team gets a visual without anyone opening Figma.

### 2. Notion Brief → Automatic Floor Plan Sketch

**Trigger:** Notion — new page created with tag "floor plan"
**Action:** Extract room names and dimensions from page body
**Action:** Skissify — POST room layout as JSON
**Action:** Notion — attach SVG to page as embedded image

Product managers writing room briefs get a rough sketch attached automatically. No CAD software. No designer bottleneck.

### 3. Slack Command → Instant Whiteboard Sketch

**Trigger:** Slack slash command `/sketch [description]`
**Action:** Claude / GPT-4o — convert natural language description to Skissify JSON
**Action:** Skissify — render the sketch
**Action:** Slack — post SVG back to the channel

Your team can ask for rough sketches in Slack without leaving the conversation.

### 4. Weekly Architecture Review Auto-Sketch

**Trigger:** Schedule (every Monday 09:00)
**Action:** Pull current system component list from your config repo
**Action:** Skissify — generate a fresh architecture diagram sketch
**Action:** Email / Slack — send the sketch to the team as the week opener

Architecture diagrams that actually stay up to date because they regenerate themselves.

---

## n8n Setup (Step by Step)

1. Add an **HTTP Request** node
2. Method: `POST`
3. URL: `https://skissify.com/api/render`
4. Body Content Type: `JSON`
5. Paste your elements JSON into the body
6. The response body is your SVG

To get a shareable URL instead of raw SVG, add `?format=url` to the endpoint — you get back a JSON object with a `url` field pointing to the hosted sketch.

---

## Make (Integromat) Setup

1. Add **HTTP → Make a request** module
2. URL: `https://skissify.com/api/render`
3. Method: POST
4. Body type: Raw
5. Content type: `application/json`
6. Body: your JSON manifest
7. Parse response → SVG string ready for downstream modules

---

## Zapier Setup

1. Add a **Webhooks by Zapier** action step
2. Action: POST
3. URL: `https://skissify.com/api/render`
4. Data: your JSON manifest
5. Output: SVG content available in later steps (attach to email, Notion, Slack, etc.)

---

## The Interesting Part: AI Agents Can Write the JSON

You don't have to write the Skissify JSON manually. You can use Claude, GPT-4o, or any LLM as the step *before* Skissify to generate the JSON from natural language.

**Example n8n chain:**

1. Trigger: New Notion page with room description text
2. Claude: "Convert this room description to Skissify JSON" + paste the schema
3. Skissify: POST the JSON, get SVG
4. Notion: Attach sketch to original page

The LLM handles the spatial reasoning. Skissify handles the rendering. You get a hand-drawn floor plan from plain English.

---

## Why Hand-Drawn (Not Mermaid, Not draw.io)

- **Mermaid** generates flowcharts, not spatial diagrams. No walls, doors, furniture.
- **draw.io** requires manual layout. Not automatable.
- **DALL-E / image generation** — non-deterministic. "Same input" doesn't guarantee "same output." Hard to reference in documentation.
- **Skissify** — deterministic SVG from JSON. Same elements in → same sketch out. Every time. Versionable. Diffable. Embeddable.

---

## What Can Skissify Sketch?

30+ element types including:

- `rect`, `line`, `circle`, `arrow` — universal diagram primitives
- `wall`, `door-symbol`, `door-slide`, `window`, `stair`, `opening` — architectural
- `text`, `dim` (dimension lines), `dashed` — annotation and measurement
- `column`, `furniture` variants — spatial layouts

Full element reference: **skissify.com/docs**

---

## Try It Now

No account needed. Run this in your terminal:

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "cream",
    "tool": "ballpoint",
    "amplitude": 1,
    "elements": [
      { "type": "rect", "x": 20, "y": 20, "w": 200, "h": 120, "label": "Main Room" },
      { "type": "door-symbol", "x": 20, "y": 80, "size": 35 }
    ]
  }'
```

If that returns SVG, you can automate it.

---

*Skissify launched April 2026. It's free, open-core, and self-hostable (Docker). REST API docs at skissify.com/docs. MCP server: `npx skissify-mcp`.*

*Tags: #n8n #WorkflowAutomation #AIAgents #APIFirst #BuildInPublic #MCP #VibeDesign*
