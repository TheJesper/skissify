# The Sketch Is the Memory: Why Visual Output Solves Agent Continuity

*Published: Day 2 (March 28, 2026) | Platform: Dev.to first, then r/mcp, HN comments*
*TL;DR: Agent conversations vanish. Skissify sketch URLs don't. Your AI agent's floor plan now has a permanent address — and that changes how you build iterative agent workflows.*

---

The hottest problem in MCP communities right now is **agent memory**. How do you make an AI agent remember what it did in a previous session? Knowledge graphs, markdown files rewritten every cycle, vector databases — people are solving this in a dozen creative ways.

There's a specific version of this problem that nobody talks about: **visual memory**.

When an AI agent reasons about spatial things — floor plans, diagrams, wireframes, architecture sketches — where does that reasoning *live*? In the conversation history, which disappears. In a description, which loses precision. In an image generator's output, which can't be iterated deterministically.

Skissify solves a narrow but important slice of this problem: **the sketch URL is the persistent artifact**.

---

## The Agent Memory Problem in Visual Workflows

Here's a concrete scenario:

A user asks Claude to design a kitchen layout. Claude reasons through it, produces a floor plan, and shares a description. Next session: the user asks for a revision — "move the island 2 meters south." Claude has to reconstruct the entire layout from scratch. It hallucinated some dimensions last time. The new one doesn't quite match.

This is the visual memory gap:
1. No persistent representation of what was drawn
2. No structured format that can be retrieved and modified
3. No way to "load" the previous sketch and diff it

Text memory tools solve text continuity. They don't solve spatial continuity.

---

## How Skissify's Architecture Changes This

When an agent calls Skissify via MCP, two things happen:

1. The JSON manifest is stored
2. A permanent sketch URL is returned: `https://skissify.com/s/[id]`

That URL is the memory. It contains:
- The exact elements drawn (walls, rooms, doors, dimensions)
- The aesthetic parameters (wobble, amplitude, style)
- The full reconstructable JSON to modify and re-render

In the next agent session, the user can share the sketch URL. Claude reads it, gets the underlying JSON via the Skissify API, and modifies specific elements. The revision is deterministic — element X moves; everything else stays identical.

This isn't magic. It's schema-first design applied to visual output.

---

## The Persistent Sketch Pattern

Here's the workflow pattern that emerges:

```
Session 1:
User: "Design a 3-bedroom floor plan, master bedroom with ensuite"
Agent → Skissify MCP → JSON manifest → sketch_url: https://skissify.com/s/abc123
Agent: "Here's your floor plan: [link]. I'll remember this reference."

Session 2 (days later):
User: "Add a home office to the plan we made"
Agent → GET /api/sketch/abc123 → retrieves JSON
Agent → modifies JSON (adds office room)  
Agent → Skissify MCP → updated JSON → sketch_url: https://skissify.com/s/def456
Agent: "Here's the updated plan with the home office: [link]. Previous version: abc123"
```

No hallucination. No reconstruction from memory. The sketch history is a chain of URLs.

This is closer to how designers work in Figma (version history) than how AI agents currently work (stateless text).

---

## Why This Matters for Agent Workflows Right Now

Agent memory is being solved at the text layer. The MCP ecosystem has excellent tools for:
- Persistent knowledge graphs (memory servers)
- File-based context (markdown, JSON)
- Database retrieval (postgres, sqlite MCP servers)

But none of these solve the **visual artifact problem**. When an agent produces something spatial, you need:

1. A structured format you can retrieve later (JSON manifest ✓)
2. A URL that's addressable and shareable (sketch URL ✓)
3. A deterministic renderer that produces the same output from the same input (Skissify's seeded renderer ✓)
4. An API to fetch, modify, and re-render (Skissify REST API ✓)

The sketch becomes a first-class artifact in your agent's memory architecture — not a description, not an image blob, but a structured, versionable, addressable visual record.

---

## The Broader Pattern: Artifacts as Memory

There's a general principle here that goes beyond Skissify.

Text memory tools help agents remember what was said. Artifact-based memory helps agents remember what was *made*.

- Code artifacts: files on disk with git history
- Data artifacts: database records with timestamps
- Visual artifacts: sketch URLs with underlying JSON

For many agent workflows, the most important continuity isn't "what did we discuss" but "what did we build." The artifact is the memory.

Skissify is one implementation of this pattern for visual spatial output. The architecture — structured input, deterministic renderer, addressable output URL — is a template that applies to any AI-generated artifact type.

---

## Practical: Retrieving a Sketch's JSON for Modification

```typescript
// Fetch the underlying JSON for a sketch
const sketch = await fetch('https://skissify.com/api/sketch/abc123').then(r => r.json());

// The elements array contains every element from the original agent session
console.log(sketch.elements.length); // 24 elements (walls, rooms, doors, etc.)

// Modify: add a new room
sketch.elements.push({
  type: "room",
  label: "Home Office",
  x: 450, y: 120, width: 160, height: 140,
  fill: "light"
});

// Re-render via MCP or direct API
const updated = await skissifyMCP.render(sketch);
console.log(updated.sketch_url); // New permanent URL
```

The original `abc123` URL still exists — it's the version history. `def456` is the new version. Both are permanent.

---

## What This Doesn't Solve

Honest limitations:

- **Skissify isn't a general visual memory layer** — it works for hand-drawn sketches with a specific schema. Not for charts, photos, or arbitrary images.
- **No built-in diffing** — you can't ask "what changed between sketch A and sketch B" at the semantic level (yet). You'd compute that in your agent logic.
- **No annotation or comment layer** — the sketch URL can be shared with clients, but collaborative annotation (notes, markup) isn't built yet.

What it *does* do: solve the specific problem of "my agent produced a floor plan last session and I want to iterate it in this session" with zero reconstruction and full fidelity.

---

## The Larger Agent Memory Conversation

If you're building agent memory architectures: think about the artifact layer, not just the text layer.

The r/mcp community is building excellent text memory (knowledge graphs, file systems, databases). The visual layer — spatial, structured, iteratable output — is mostly unsolved.

Skissify is one answer for hand-drawn sketch output. We'd love to see what others build for charts, diagrams, and other structured visual types.

The JSON schema is open. The MCP server is open source. If you build something on top of it, we want to know.

---

*Skissify launched yesterday. The MCP server: `npm install -g @skissify/mcp-server`. The API: skissify.com/docs. The schema spec: skissify.com/schema.*

*If you're building agent memory architecture and want to talk through the visual artifact layer — reply here or find me on [social].*
