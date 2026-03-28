# The Sketch URL as Agent Memory: A Design Pattern Nobody Talks About

*March 28, 2026 — Cross-post to Dev.to, r/LangChain, r/AI_Agents*
*~1,900 words | 8 min read*

> **The insight:** When an AI agent produces a sketch via Skissify, it gets back a URL. That URL isn't just a share link — it's a persistent, inspectable, shareable artifact that can be passed between agents, stored in memory, referenced in future conversations, and used as context for downstream tasks. This is a design pattern that deserves its own name.

---

Most discussions of AI agent memory focus on text: conversation history, vector embeddings, structured state in databases.

There's a category missing: **visual artifacts as memory**.

When an agent creates a sketch — floor plan, wireframe, system diagram — and gets back a URL, something interesting happens. That URL becomes a stable reference to a visual fact. And stable references to facts are the building blocks of memory.

## The Problem With Describing Visual Things

Imagine an agent helping a homeowner plan a kitchen renovation. Through several turns of conversation, the agent reasons about cabinet placement, appliance positions, traffic flow, window light.

All of this reasoning happens in text. The homeowner reads it and builds a mental model. Then they close the browser. On the next session, the agent starts fresh.

The description is gone. The mental model is gone. The reasoning is gone.

Now imagine the same workflow with a sketch artifact:

1. Agent and homeowner discuss kitchen layout
2. Agent calls `skissify.create_sketch()` with the resulting floor plan
3. Agent gets back: `{ url: "https://skissify.com/s/abc123", id: "abc123" }`
4. Agent stores this URL in the conversation, in a note, in the homeowner's profile

Next session: "Let's continue working on your kitchen. Here's where we got to: [url]"

The URL loads a sketch. The homeowner immediately has context. The agent has an anchor for the new conversation. The reasoning from session 1 is encoded in a visual artifact that persists across sessions.

## The Three Properties That Make This Work

**Permanence.** Sketch URLs in Skissify are permanent. The artifact at the URL is stable — it doesn't change unless explicitly updated. This means you can store a URL in agent memory and trust that it refers to the same visual artifact days or months later.

**Inspectability.** Behind every sketch URL is a JSON document (the sketch data). Agents can retrieve and read this JSON to extract the original spatial reasoning. If an agent needs to "understand" what was sketched, it can inspect the data, not just display the image.

**Shareability.** A URL works everywhere: in a chat message, in a document, in an email, in another agent's context. It's the same artifact across contexts. No conversion, no re-export, no re-explanation.

These three properties — permanence, inspectability, shareability — are what make visual artifacts viable as agent memory, not just pretty output.

## A Practical Design Pattern

Here's the pattern in concrete terms:

```typescript
// Agent creates a sketch artifact
const sketch = await mcp.callTool("skissify", "create_sketch", {
  elements: derivedFloorPlan,
  settings: { paper: "cream", title: "Kitchen Renovation v1" }
});

// Store the URL in agent memory / user profile
await memory.set(`user.${userId}.kitchen_sketch_v1`, sketch.url);

// In future session: retrieve and surface as context
const previousSketch = await memory.get(`user.${userId}.kitchen_sketch_v1`);
// "Let's continue your kitchen renovation. Your last version: {previousSketch}"
```

The sketch URL is stored like any other fact. Retrieved like any other fact. Used as context like any other fact.

## Multi-Agent Visual Handoff

The same pattern works across agent boundaries in multi-agent systems.

**Scenario:** A design agent creates a floor plan. An estimation agent needs to calculate material costs.

Without visual artifacts:
- Design agent produces a text description
- Estimation agent must parse the text description to extract measurements
- Text parsing is lossy and error-prone

With visual artifacts:
- Design agent creates a sketch, gets a URL
- Estimation agent receives the URL and the underlying JSON schema
- Estimation agent reads the JSON directly: element types, dimensions, counts
- Costs calculated from structured data, not parsed text

The sketch URL is a clean handoff artifact. Both agents speak the same schema.

## The "Sketch as Snapshot" Use Case

In long-running workflows, sketches serve as version snapshots.

A contractor assistant might produce a sketch at each stage of a renovation plan:
- `kitchen_sketch_requirements.url` — initial brief
- `kitchen_sketch_draft.url` — first layout proposal  
- `kitchen_sketch_revised.url` — after client feedback
- `kitchen_sketch_final.url` — approved version

Each URL is a stable artifact. The agent can show the diff ("here's how it changed from your initial brief"), compare versions, or revert to a previous state.

This is Git for spatial thinking.

## What This Requires From the Tool

Not every sketch tool supports this pattern. Requirements:

1. **Stable URLs** — the artifact at the URL must not change or expire
2. **Machine-readable data** — the underlying data (JSON schema in Skissify's case) must be accessible to agents
3. **MCP or API access** — agents must be able to create artifacts programmatically
4. **Named/versioned artifacts** — ideally, artifacts can be updated while preserving history

Skissify supports all four. The sketch JSON is the source of truth; the rendered image is a view of that JSON. An agent with the URL has access to both.

## A New Design Vocabulary for Agent Builders

We need language for this pattern. Proposed terms:

**Artifact-as-memory**: Storing the URL (or ID) of a produced artifact as a memory item, rather than storing the content itself.

**Visual anchor**: A sketch URL used as context in a new conversation ("here's the visual state we're building on").

**Cross-agent artifact**: A visual artifact specifically designed to be passed between agents in a multi-agent workflow.

**Snapshot versioning**: A series of artifact URLs representing the evolution of a spatial design over time.

None of these terms are standard. That means the design patterns are ahead of the vocabulary — which is usually a sign that the patterns are real and worth naming.

## The Bigger Pattern

Text → URL: web links have been persistent references to text artifacts for 30 years.
Image → URL: we've stored image URLs in databases and passed them between systems for 20 years.
Code → URL: GitHub URLs point to stable code artifacts at specific commits.
Sketch → URL: this is new.

The sketch URL extends the web's original pattern — a URL is a stable reference to a thing — to AI-generated visual artifacts. The thing you produce in a conversation with an AI can now be a first-class citizen in your information architecture.

That's what's interesting about Skissify as infrastructure, beyond the hand-drawn aesthetic and the MCP integration.

---

*Skissify: [skissify.com](https://skissify.com)*
*MCP server: `npm install -g @skissify/mcp-server`*
*JSON schema documentation: [skissify.com/docs/schema](https://skissify.com/docs/schema)*
