# Skissify in Automation Workflows: n8n, Make.com, and Zapier Floor Plan Generation

*A practical guide to adding hand-drawn sketches to your automation pipelines*

---

If you're using n8n, Make.com, or Zapier to automate workflows, there's a step most pipelines skip: **visual output**.

Your workflow can scrape data, send emails, update databases, and post to Slack. But can it draw a floor plan? Can it render a system diagram? Can it produce a hand-drawn sketch based on structured data?

With Skissify, yes — and it's one HTTP Request node.

---

## How It Works

Skissify is a REST API. POST a JSON manifest, get back an SVG + shareable URL. No auth. No account required for the free tier. ~150ms response time.

The JSON schema is flat and predictable:

```json
{
  "paper": "cream",
  "tool": "pencil",
  "wobble": 4,
  "humanness": 0.2,
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 200, "h": 150, "label": "Room Name" }
  ]
}
```

The response contains:
```json
{
  "url": "https://skissify.com/s/abc123",
  "svg": "<svg>...</svg>"
}
```

Pass the URL anywhere. Embed in emails, Slack messages, PDFs, or reports.

---

## Use Case 1: n8n — Real Estate Floor Plan on Form Submit

**Workflow:** User fills in room dimensions → n8n builds manifest → Skissify renders floor plan → email with sketch link to user

### n8n Workflow JSON

```json
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "floor-plan-request"
      }
    },
    {
      "name": "Build Manifest",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "const body = $input.first().json.body;\nreturn [{\n  json: {\n    paper: 'cream',\n    tool: 'pencil',\n    wobble: 4,\n    humanness: 0.2,\n    elements: [\n      { type: 'rect', x: 50, y: 50, w: body.livingRoomW || 200, h: body.livingRoomH || 150, label: 'Living Room' },\n      { type: 'rect', x: 50, y: 230, w: body.bedroom1W || 200, h: body.bedroom1H || 130, label: 'Bedroom 1' },\n      { type: 'text', x: 200, y: 420, text: body.propertyName || 'Floor Plan Draft' }\n    ]\n  }\n}];"
      }
    },
    {
      "name": "Skissify API",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://skissify.com/api/sketch",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": "={{ JSON.stringify($json) }}"
      }
    },
    {
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "toEmail": "={{ $('Webhook').first().json.body.email }}",
        "subject": "Your floor plan sketch is ready",
        "text": "Here's your sketch: {{ $json.url }}"
      }
    }
  ]
}
```

**Result:** A form submission produces a real hand-drawn floor plan link, emailed to the user. No human intervention.

---

## Use Case 2: Make.com — Architecture Diagram on Jira Ticket

**Workflow:** Jira ticket created with "architecture diagram needed" label → Make.com parses ticket description → Skissify renders system diagram → diagram URL posted back to Jira comment

### Make.com HTTP Module Config

**Module:** HTTP > Make a request

| Field | Value |
|-------|-------|
| URL | `https://skissify.com/api/sketch` |
| Method | POST |
| Headers | `Content-Type: application/json` |
| Body type | Raw |
| Content type | JSON (application/json) |
| Request content | *(see below)* |

**Request content (with Make.com variables):**

```json
{
  "paper": "blueprint",
  "tool": "ballpoint",
  "wobble": 2,
  "elements": [
    { "type": "rect", "x": 100, "y": 50, "w": 150, "h": 80, "label": "{{1.summary}}" },
    { "type": "arrow", "x1": 100, "y1": 130, "x2": 100, "y2": 200 },
    { "type": "rect", "x": 50, "y": 200, "w": 100, "h": 60, "label": "Database" },
    { "type": "rect", "x": 170, "y": 200, "w": 100, "h": 60, "label": "Cache" }
  ]
}
```

**Map the output URL:** `{{http.url}}` → paste into Jira comment module.

---

## Use Case 3: Zapier — Weekly Space Report with Sketch

**Workflow:** Every Monday → pull office room bookings from Airtable → Skissify renders office floor plan with occupancy labels → Slack message to #office-ops

### Zapier Step Config

**Trigger:** Schedule > Every week (Monday 08:00)

**Step 1 — Airtable:** Find records (room bookings this week)

**Step 2 — Zapier Code (Python):**

```python
rooms = input_data.get('rooms', '').split(',')
elements = []
x, y = 50, 50

for i, room in enumerate(rooms):
    col = i % 3
    row = i // 3
    elements.append({
        "type": "rect",
        "x": 50 + col * 220,
        "y": 50 + row * 170,
        "w": 180,
        "h": 130,
        "label": room.strip()
    })

output = {
    "manifest": {
        "paper": "cream",
        "tool": "pencil",
        "wobble": 3,
        "elements": elements
    }
}
```

**Step 3 — Webhooks by Zapier:** POST to `https://skissify.com/api/sketch`

**Step 4 — Slack:** Post `Weekly office layout: {{url}}` to #office-ops

---

## Why This Pattern Works

The key insight is that **AI agents and automation tools need the same thing**: a way to produce visual output without a human in the loop.

n8n, Make, and Zapier are all essentially AI-adjacent orchestration layers. They move data, trigger actions, and pipe outputs. Adding Skissify gives them a visual output channel they didn't have.

**The pattern is always the same:**
1. Your workflow has structured data (room dimensions, component names, system topology)
2. Build a Skissify manifest from that data (flat JSON, well-documented schema)
3. POST to `https://skissify.com/api/sketch`
4. Get back a URL
5. Pass the URL wherever it needs to go

---

## Tips for Automation Workflows

**Use `paper: "blueprint"` for technical diagrams.** The blue-and-white high-contrast style reads better in screenshots attached to tickets or reports.

**Keep wobble low (1–3) for professional output.** High wobble looks great for conceptual sketches. Low wobble looks like an architect's working drawing.

**Use the `dim` element type for measurement annotations.** If you're generating floor plans from real data, dimension lines make the sketch immediately more useful.

**Cache results.** Skissify returns the same SVG for the same JSON input (deterministic wobble via seeded PRNG). If your data hasn't changed, you can reuse the URL.

---

## Full Element Type Reference

| Type | Use case | Key fields |
|------|----------|------------|
| `rect` | Rooms, components, boxes | `x, y, w, h, label` |
| `arrow` | Connections, data flow | `x1, y1, x2, y2` |
| `text` | Labels, titles | `x, y, text` |
| `circle` | Nodes, endpoints | `x, y, r` |
| `door-symbol` | Floor plans | `x, y, w, h` |
| `window` | Floor plans | `x, y, w, h` |
| `dim` | Dimensions | `x1, y1, x2, y2, label` |
| `dashed` | Optional connections | `x1, y1, x2, y2` |
| `stair` | Floor plans | `x, y, w, h` |

Full schema at `skissify.com/for-agents`.

---

## Get the Schema

```bash
curl https://skissify.com/for-agents
```

Returns the full JSON schema with all element types, required fields, and example manifests.

---

*Skissify is free for public sketches. Pro tier (€5/month) for private sketches, higher rate limits, and API key auth. Connect with [skissify.com](https://skissify.com) or install the MCP server with `npx skissify-mcp`.*
