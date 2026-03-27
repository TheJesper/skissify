# Build Your First AI-Generated Floor Plan in 15 Minutes

*Published: March 2026 — Cross-post to Dev.to, Hashnode, YouTube description*  
*~1,600 words | 7 min read | Tutorial*

---

In 15 minutes, you'll have Claude generating hand-drawn floor plans for you on demand.

This tutorial walks through:
1. Installing the Skissify MCP server in Claude Desktop (5 min)
2. Your first prompt → floor plan (2 min)
3. Iterating and refining (5 min)
4. Understanding the JSON schema (3 min)

No prior experience needed. If you can use Claude Desktop, you can do this.

---

## What You'll Need

- [Claude Desktop](https://claude.ai/download) installed and running
- A free [Skissify account](https://skissify.com) (takes 30 seconds)
- Node.js 18+ installed (`node --version` to check)

That's it.

---

## Step 1: Get Your Skissify API Key (2 minutes)

1. Go to [skissify.com](https://skissify.com) and click **Sign up**
2. Verify your email
3. Open **Settings → API** and copy your API key
4. Keep this tab open — you'll need the key in a moment

Free accounts include: public sketches, the editor, and MCP access. No credit card required.

---

## Step 2: Install the MCP Server (3 minutes)

Open Terminal (Mac/Linux) or PowerShell (Windows):

```bash
npm install -g @skissify/mcp-server
```

Verify it installed:

```bash
skissify-mcp --version
```

Now add it to Claude Desktop's config. Open the config file:

**Mac:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

Add the Skissify server to your `mcpServers` block:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["@skissify/mcp-server"],
      "env": {
        "SKISSIFY_API_KEY": "sk_your_api_key_here",
        "SKISSIFY_BASE_URL": "https://skissify.com"
      }
    }
  }
}
```

**Restart Claude Desktop.** The MCP server won't connect until you do.

After restarting, look for the 🔌 tools icon in Claude's interface — hover it to confirm Skissify appears in the connected tools list.

---

## Step 3: Your First Floor Plan (2 minutes)

Open a new Claude conversation and type:

> **"Design a small 1-bedroom apartment for a remote worker. Prioritize a home office with good natural light. Create a floor plan with Skissify."**

Claude will:
1. Think about the layout requirements
2. Generate a JSON sketch manifest
3. Call `create_sketch` via MCP
4. Return a link to your rendered floor plan

The whole thing takes about 5-10 seconds.

Your floor plan will open at `skissify.com/s/[id]` — a hand-drawn sketch on cream paper, wobble and all.

### What if it doesn't work?

Common issues:
- **"No MCP tools available"** — Claude Desktop didn't pick up the config. Check the JSON syntax, then restart.
- **"Authentication failed"** — Double-check your API key (no trailing spaces).
- **"create_sketch not found"** — The server isn't running. Try `npx @skissify/mcp-server` in your terminal to see if it launches.

---

## Step 4: Iterate and Refine (5 minutes)

The power isn't in the first sketch. It's in the conversation.

Try these follow-ups in the same Claude thread:

**Change the aesthetic:**
> "Make it look more like a blueprint — dark background, white lines, more technical."

**Adjust a room:**
> "The office feels too small. Give it at least 4m × 4m and move it to the north wall."

**Add detail:**
> "Add a bathroom, a coat closet near the front door, and dimension lines showing the total footprint."

**Different use case entirely:**
> "Now design the same space for a family of 3 with a toddler. Swap the office for a kids' room."

Each message creates a new sketch (or refines the previous JSON if you ask it to revise). You can generate 10 iterations of a layout in the time it would take to start a Figma file.

### Pro tip: ask Claude to explain its decisions

> "Before you draw it, explain your reasoning for the room placement."

Claude will articulate *why* it positioned rooms the way it did — north-facing light optimization, traffic flow logic, noise separation. This is genuinely useful design thinking, not just pixel-pushing.

---

## Step 5: Understanding the JSON Schema (3 minutes)

Once you've seen Claude generate a few sketches, it's useful to understand the format so you can customize it.

Here's a minimal floor plan JSON:

```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "amplitude": 3,
  "waves": 4,
  "humanness": 0.4,
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 300, "h": 200, "label": "Living Room" },
    { "type": "rect", "x": 50, "y": 250, "w": 140, "h": 150, "label": "Bedroom" },
    { "type": "rect", "x": 190, "y": 250, "w": 160, "h": 150, "label": "Kitchen" },
    { "type": "door-symbol", "x": 160, "y": 50, "w": 80, "h": 20 },
    { "type": "window", "x": 50, "y": 130, "w": 100, "h": 20 },
    { "type": "dim", "x": 50, "y": 430, "x2": 350, "y2": 430, "label": "10m" }
  ]
}
```

### Key parameters:

**Paper styles:** `cream` (default) | `white` | `grid` | `blueprint`

**Tools:** `ballpoint` (clean) | `pencil` (soft) | `ink` (bold)

**Wobble controls:**
- `amplitude` — 0-10, how much lines deviate (3 = gentle, 8 = sketchy)
- `waves` — 2-8, wobble frequency (4 = balanced)
- `humanness` — 0-1, random tremor overlay (0.4 = professional-ish)

### Element types:

| Type | Description |
|------|-------------|
| `rect` | Room or area box |
| `line` | Any straight line |
| `circle` | Circular element |
| `arc` | Curved line or wall |
| `arrow` | Direction/flow indicator |
| `text` | Standalone label |
| `dashed` | Dashed boundary or furniture |
| `dim` | Dimension line with label |
| `window` | Wall opening (window) |
| `door-symbol` | Hinged door with swing arc |
| `door-slide` | Sliding door |
| `stair` | Staircase |
| `opening` | Doorless passage |
| `column` | Structural column |

You can paste JSON directly into the [Skissify editor](https://skissify.com/editor) if you want to test without MCP.

---

## What Else Can You Build?

Floor plans are the obvious use case, but the same approach works for any spatial or structural concept:

### System Architecture Diagrams
> "Draw a microservices architecture diagram: API gateway → auth service → user service → postgres. Include arrows showing request flow."

### UI Wireframes
> "Sketch a mobile app screen: header with back button and title, a scrollable list of cards below, each card has a thumbnail left + title/subtitle right, FAB button bottom-right."

### Network Topology
> "Draw a home network diagram: router connected to NAS, two desktop PCs, a mesh extender, and a smart home hub."

### Furniture Layout
> "Design a home office in a 4m × 3.5m room: standing desk facing north wall, bookshelf on east wall, small couch south wall for reading breaks."

The key insight: if you can describe it spatially in text, Claude can describe it structurally in JSON, and Skissify can render it as a sketch.

---

## Next Steps

**Add it to your workflow:**
- Use Skissify sketches in early client presentations ("this is just an idea")
- Generate multiple layout options in parallel in one Claude conversation
- Use the blueprint style for technical documentation
- Embed the public sketch URL in Notion docs or project wikis

**Go deeper:**
- Try the [Skissify editor](https://skissify.com/editor) to handcraft JSON and see instant rendering
- Read the [JSON schema documentation](https://skissify.com/docs) for full element reference
- Check out the blog: [Why Hand-Drawn Sketches Beat Figma](/blog/why-hand-drawn-sketches-beat-figma)

**Share what you build:**
Post your best Claude-generated floor plans on Twitter with `#Skissify` — genuinely curious what people come up with.

---

*Skissify is free at [skissify.com](https://skissify.com). The MCP server is on npm. If you hit issues, open a GitHub issue and I'll fix it fast.*

**Tags:** tutorial, mcp, claude, ai-agents, floor-plans, developer-tools, getting-started, javascript
