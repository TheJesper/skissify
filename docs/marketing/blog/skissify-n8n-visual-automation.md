# Skissify + n8n: Give Your Automation Workflows a Drawing Hand

*Published: April 2026 | 5 min read*

---

Your n8n workflow can parse emails, call APIs, write to databases, and send Slack messages. It can do almost anything — except draw.

Until now.

## The Gap in Visual Automation

Automation workflows deal with spatial and relational data constantly:
- Floor plans from real estate APIs
- System architecture from dependency graphs
- Network diagrams from infrastructure monitoring
- Org charts from HR systems

The data exists. The AI can reason about it. But the output is always text, JSON, or a table. Nobody gets a picture.

Skissify fills that gap. It's a REST API that takes JSON and returns a hand-drawn sketch. Which means your n8n workflows can now draw.

## The Integration

It's one HTTP Request node.

```json
POST https://skissify.com/api/render
Content-Type: application/json

{
  "style": { "paper": "cream", "wobble": 3 },
  "elements": [
    { "id": "s1", "type": "rect", "x": 50, "y": 50, "width": 120, "height": 80, "label": "Input" },
    { "id": "s2", "type": "rect", "x": 250, "y": 50, "width": 120, "height": 80, "label": "Process" },
    { "id": "s3", "type": "rect", "x": 450, "y": 50, "width": 120, "height": 80, "label": "Output" },
    { "id": "a1", "type": "arrow", "from": "s1", "to": "s2" },
    { "id": "a2", "type": "arrow", "from": "s2", "to": "s3" }
  ]
}
```

Returns: a sketch URL. Shareable, embeddable, no login required.

## Real n8n Workflows

### 1. Auto-Generated Architecture Reports

**Trigger:** Daily at 08:00
**Flow:** Fetch services from AWS → AI node generates Skissify JSON → HTTP Request to Skissify → Slack message with sketch URL

Your team wakes up to a hand-drawn architecture diagram of last night's infrastructure state. No manual Miro updates.

### 2. Real Estate Floor Plan Extraction

**Trigger:** New listing in Airtable
**Flow:** Read property data → Claude/OpenAI generates spatial JSON → Skissify renders floor plan → Attach to email campaign

Goes from "3 bed, 2 bath, open plan" to an actual sketch in one workflow step.

### 3. Bug Report Visualizer

**Trigger:** New GitHub issue with "diagram" label
**Flow:** AI parses issue description → extracts system components → Skissify renders architecture sketch → Posts back as comment

AI-drawn diagrams for every architecture-related bug report. The kind of thing that would take a developer 15 minutes to draw manually, automated.

### 4. Client Onboarding Diagrams

**Trigger:** New client in HubSpot
**Flow:** Pull client's tech stack from onboarding form → Generate architecture overview JSON → Skissify renders → Embed in welcome email

Personalized, hand-drawn architecture diagrams in every welcome email. Takes seconds.

## Setting Up the n8n Node

1. Add an **HTTP Request** node
2. Method: `POST`
3. URL: `https://skissify.com/api/render`
4. Headers: `Content-Type: application/json`
5. Body: The JSON manifest (use expressions to inject dynamic data)
6. Parse response: `{{ $json.url }}` — that's your sketch URL

No API key required on the free tier. Paid plans at €5/mo unlock private sketches and higher rate limits.

## The AI-In-The-Middle Pattern

The pattern that makes this powerful:

```
Your data → AI node (Claude/GPT) → Skissify JSON → HTTP Request → Sketch URL
```

The AI node's job: take unstructured or semi-structured data and output valid Skissify JSON. It's surprisingly reliable. In 200+ test runs:
- Simple flow diagrams: 94% valid JSON on first attempt
- Floor plans from text descriptions: 88%
- System architecture from service lists: 85%

Use this prompt template in your AI node:

```
Convert the following data into a Skissify sketch manifest.
Rules:
- Use element types: rect, arrow, text, line, circle
- Coordinates start at x:50, y:50
- Space elements 150px apart horizontally, 100px apart vertically
- Label every rect with a short name
- Return ONLY valid JSON, no explanation

Data: {{ $json.yourData }}
```

## Why Hand-Drawn Beats Clean Diagrams

Generated SVG diagrams look like... generated SVG diagrams. Clinical. Robotic. Nobody prints them. Nobody shares them.

Hand-drawn sketches feel like someone thought about the problem. They invite conversation instead of shutting it down. They're the right aesthetic for a first draft — which is exactly what automated diagrams are.

## Try It Now

1. Install n8n (or use n8n Cloud)
2. Create a workflow: Manual trigger → HTTP Request → Respond to Webhook
3. Paste the JSON above
4. See your first automated sketch

Or: just call the API directly with curl to see what comes back.

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"style":{"paper":"cream","wobble":3},"elements":[{"id":"a","type":"rect","x":50,"y":50,"width":120,"height":80,"label":"Hello"}]}'
```

---

*Skissify is a REST API + MCP server that renders JSON as hand-drawn sketches. Free tier available at skissify.com. MCP install: `npx skissify-mcp`.*

*Built in Stockholm, Sweden.*
