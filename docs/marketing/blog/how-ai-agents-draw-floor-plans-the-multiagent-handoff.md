# How AI Agents Draw Floor Plans — The Multi-Agent Handoff

*Published: March 31, 2026 (Launch Day)*

---

The most interesting use case for Skissify isn't one agent using it. It's multiple agents passing sketches between each other.

Let me explain what that looks like in practice.

---

## The Problem With Multi-Agent Spatial Work

When multiple agents collaborate on a spatial task — a floor plan, a system architecture, a site layout — they need a shared representation.

Text doesn't work. Agent A writes: "The kitchen should be north of the living room." Agent B interprets that differently than Agent A meant it. Agent C doesn't know which orientation "north" refers to.

Images don't work. Agent A generates an image. Agent B can't modify it — it can only describe what it sees and regenerate from scratch. You lose information at every handoff.

What works: **a structured spatial format that every agent can read, modify, and re-render**.

That's what Skissify provides.

---

## The Sketch URL as Agent Memory

A Skissify sketch URL encodes the full state of the drawing as a base64-compressed JSON payload. This means:

- Any agent with the URL can decode and read the current state
- Any agent can modify the JSON and generate a new URL (a new "version")
- The original URL is permanent — you can diff two sketch states
- No database required — the URL *is* the document

For multi-agent workflows, this is more useful than it sounds.

---

## A Concrete Example: Apartment Renovation Agent Chain

**Agent 1: Constraints Extractor**
- Input: PDF of apartment lease + renovation permit requirements
- Output: Structured constraints JSON (max wall removal depth, utility locations, load-bearing walls)

**Agent 2: Layout Generator (uses Skissify)**
- Input: Constraints JSON from Agent 1
- Calls `generate_sketch` with initial floor plan
- Output: Sketch URL v1

**Agent 3: Interior Specialist**
- Input: Sketch URL v1
- Decodes the sketch JSON from the URL
- Identifies door swing conflicts and furniture clearances
- Modifies the element list: adjusts door-symbol positions, adds opening elements
- Generates new Skissify URL
- Output: Sketch URL v2 (annotated with modifications)

**Agent 4: Client Communication Agent**
- Input: Sketch URL v2
- Embeds URL in a client-ready PDF proposal
- Writes summary of changes made
- Sends via email

Each agent passes a URL. No files. No database rows. No blob storage.

---

## Why This Works Better Than Image Passing

The typical multi-agent image workflow:

1. Agent generates image
2. Next agent receives image
3. Next agent describes what it sees
4. Next agent tries to reconstruct intent from description
5. Generates new image from scratch

Information loss at every step. The floor plan that arrives at Agent 4 shares only a conceptual relationship with what Agent 1 intended.

The Skissify workflow:

1. Agent generates structured JSON → Sketch URL
2. Next agent decodes URL → reads exact elements, positions, types
3. Next agent modifies the element list directly
4. Generates new URL — a diff-able version
5. Agent 4 receives a URL that is precisely traceable to Agent 1's output

No information loss. Full auditability. Reversible.

---

## The Technical Pattern

```typescript
// Agent 2: Generate initial sketch
const sketchUrl = await callSkissifyMCP({
  elements: layoutFromConstraints,
  paper: "cream",
  tool: "ballpoint"
});

// Pass to Agent 3 via context
const agentThreeContext = {
  initialLayout: sketchUrl,
  constraints: constraintsJson,
  task: "Review for door swing conflicts. Modify elements. Return new sketch URL."
};

// Agent 3 decodes, modifies, regenerates
const sketchV2 = await agent3.run(agentThreeContext);

// Agent 4 receives a URL — the full modification history is in the version chain
```

The key: Skissify URLs are deterministic for the same JSON input. You can check if anything changed by comparing URLs directly.

---

## Where This Is Already Happening

This pattern is live in:

- **Mastra agents** using `@skissify/mcp-server` — pass sketch URLs between agents in a Mastra workflow
- **LangGraph** — sketch URL as a node in the state graph
- **n8n** — HTTP tool node calls Skissify REST API; subsequent nodes receive the URL

The pattern is tool-agnostic. If your agent can make an HTTP call and pass a string to the next node, it can use Skissify.

---

## The Broader Principle

Multi-agent systems need **structured intermediate representations** at every hand-off. For text: JSON. For code: files with git state. For spatial information: Skissify sketch URLs.

The rough aesthetic isn't incidental. It communicates to any human who reads the output: "This is agent reasoning, not finished design." The sketch is in the right phase.

---

## Try the Multi-Agent Pattern

**REST API:**
```bash
curl -X POST https://api.skissify.com/v1/sketch \
  -H "Content-Type: application/json" \
  -d @floor-plan.json
```
Returns: `{ "url": "https://skissify.com/s/abc123", "json": {...} }`

**MCP server (for Claude Desktop, Cursor, etc.):**
```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["@skissify/mcp-server"]
    }
  }
}
```

Free tier. No rate limits for public sketches.

→ skissify.com | @skissify_dev
