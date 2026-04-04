# How AI Agents Can Draw Floor Plans (Without Writing Code)

*Cycle 134 — April 4, 2026 — New angle: n8n no-code workflow + floor plan as persistent agent memory*

---

Most people think building an AI floor plan generator requires a developer. It doesn't anymore.

This is a walkthrough of two approaches: one for developers (Claude + MCP + Skissify), and one for everyone else (n8n + Skissify, zero code required).

## Why Floor Plans Are a Perfect AI Output

Language models are remarkably good at spatial reasoning. Ask Claude to design a 45 sqm apartment with a north-facing living room, a compact kitchen, and a dedicated workspace — and it'll give you something coherent and structurally sound.

The problem: that output is text. And text describing spatial layouts is almost impossible to evaluate.

"The living room is in the northwest quadrant with the kitchen along the eastern wall" is accurate and useless. Nobody can react to it productively. Contractors misread it. Partners imagine different things. Architects need to redraw it from scratch.

A floor plan sketch resolves all of this. Same information. Visual form. Immediately useful.

## Approach 1: Developer Setup (Claude + MCP)

If you're building an agent pipeline, the fastest path is the Skissify MCP server:

```bash
# In your claude_desktop_config.json or mcp settings:
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["skissify-mcp"]
    }
  }
}
```

That's it. Claude can now call `skissify_render` directly. Describe a space in your conversation and Claude will output a sketch URL you can share, embed, or version-control.

The JSON schema Claude sends looks like this:

```json
{
  "paper": "cream",
  "tool": "pencil",
  "wobble": 0.4,
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 300, "h": 200, "label": "Living Room" },
    { "type": "door-symbol", "x": 50, "y": 180, "angle": 90 },
    { "type": "window", "x": 150, "y": 50, "length": 80 }
  ]
}
```

Flat structure, no nesting. ~90% first-attempt success rate from Claude without fine-tuning.

## Approach 2: No-Code Setup (n8n + Skissify)

If you're not a developer, n8n makes this accessible with a visual workflow builder.

**The workflow:**

```
Trigger: New message in chat / form submission
↓
OpenAI/Claude node: "Generate a Skissify JSON manifest for: [user description]"
↓
HTTP Request node: POST to https://api.skissify.com/render
  Body: {{ $json.manifest }}
↓
Response: Return sketch URL to user
```

Total setup time: ~20 minutes. No code. The n8n HTTP Request node handles the API call. The AI node generates the manifest from plain-text description.

Use cases that work well:
- Renovation planning assistant embedded in a website
- Real estate inquiry bot that sketches described properties
- Interior design questionnaire that outputs visual summaries
- Architecture firm client intake form

## The Floor Plan as Persistent Memory

Here's something most people miss: the sketch URL isn't just a display format. It's a **persistent, shareable, version-controllable artifact**.

```
Sketch v1: https://skissify.com/s/abc123
Sketch v2: https://skissify.com/s/def456 (after user feedback)
```

You can store these in a database, attach them to tickets, include them in emails, reference them in subsequent agent conversations. The agent can say: "Based on the sketch from last Tuesday [link], here's what I'd change..."

This is floor plan as agent memory — not just output, but context that carries forward.

## Practical Use Cases

| Audience | Use Case | Setup |
|----------|----------|-------|
| Real estate agents | Sketch described properties in client conversations | n8n workflow |
| Renovation homeowners | Communicate layouts to contractors | skissify.com/human |
| Product teams | Sketch UI layout options before Figma | Claude + MCP |
| Architecture firms | AI first-draft → human refinement | REST API |
| Game designers | Dungeon maps, level layouts | Developer setup |
| Educators | Spatial reasoning teaching tool | Human mode |

## Where to Start

**If you're technical:** Install the MCP server. Three lines. You're done.

**If you're not technical:** Go to [skissify.com/human](https://skissify.com/human). Describe your space. No account required.

**If you want to automate:** Set up the n8n workflow above. The HTTP Request node + any AI node is enough.

The floor plan API that didn't exist six months ago now takes four seconds and requires no design skills.

---

*Tags: ai, agents, mcp, floor-plan, n8n, automation, no-code*
