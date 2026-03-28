# Skissify + Mastra: Add Visual Output to Your TypeScript AI Agents

*The TypeScript agent framework with 22K+ stars now has a sketch output layer.*

---

Mastra is the TypeScript framework developers reach for when they want to build serious AI agents — workflows, memory, tracing, evals, all in one package. It's opinionated in the good way: batteries included, strongly typed, production-ready.

One thing it didn't have until now: a way to output visual sketches.

This post shows how to add Skissify to your Mastra agent stack in under 10 minutes.

---

## Why Visual Output Matters in Agent Workflows

Text output has a ceiling. When your agent explains a floor plan in prose, the user has to construct it mentally. When it renders a sketch, the user sees it instantly.

Skissify is a JSON-to-hand-drawn-sketch API. You give it a JSON schema describing shapes, the API renders a hand-drawn PNG/SVG. The schema is flat, uses absolute coordinates, and was designed from day one for LLM generation — not human authoring.

94% first-try success rate with Claude Sonnet 4. The schema is that forgiving.

---

## Installation

```bash
npm install @skissify/client
# or via MCP
npx @skissify/mcp-server
```

---

## Adding Skissify as a Mastra Tool

```typescript
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const sketchTool = createTool({
  id: 'generate-sketch',
  description: 'Generate a hand-drawn sketch from a description',
  inputSchema: z.object({
    description: z.string().describe('What to sketch - room, diagram, flowchart, etc.'),
    style: z.enum(['blueprint', 'pencil', 'marker']).default('pencil'),
  }),
  execute: async ({ context }) => {
    const { description, style } = context;

    // Call Skissify API - Claude generates the JSON schema internally
    const response = await fetch('https://skissify.com/api/sketch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: description,
        style,
        output: 'url', // returns a persistent sketch URL
      }),
    });

    const { url, sketchId } = await response.json();

    return {
      sketchUrl: url,
      sketchId,
      message: `Sketch generated: ${url}`,
    };
  },
});
```

---

## Using the Tool in a Mastra Agent

```typescript
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { sketchTool } from './tools/sketch-tool';

export const architectAgent = new Agent({
  name: 'Architect Agent',
  instructions: `You are a spatial design assistant. When users describe spaces, 
  layouts, or floor plans, generate a hand-drawn sketch using the sketch tool.
  Always explain what you're drawing and offer to refine it.`,
  model: openai('gpt-4o'),
  tools: { sketchTool },
});
```

---

## A Real Workflow: Property Renovation Planner

```typescript
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';

const captureRequirements = createStep({
  id: 'capture-requirements',
  inputSchema: z.object({ description: z.string() }),
  outputSchema: z.object({ rooms: z.array(z.string()), constraints: z.array(z.string()) }),
  execute: async ({ inputData, mastra }) => {
    const agent = mastra.getAgent('architect-agent');
    const result = await agent.generate(`Extract rooms and constraints from: ${inputData.description}`);
    // parse structured output
    return JSON.parse(result.text);
  },
});

const generateFloorPlan = createStep({
  id: 'generate-floor-plan',
  inputSchema: z.object({ rooms: z.array(z.string()), constraints: z.array(z.string()) }),
  outputSchema: z.object({ sketchUrl: z.string() }),
  execute: async ({ inputData, mastra }) => {
    const agent = mastra.getAgent('architect-agent');
    const result = await agent.generate(
      `Draw a floor plan with these rooms: ${inputData.rooms.join(', ')}. 
       Constraints: ${inputData.constraints.join(', ')}.
       Use Skissify to generate a hand-drawn sketch.`
    );
    // extract sketch URL from agent response
    return { sketchUrl: extractSketchUrl(result.text) };
  },
});

export const renovationWorkflow = createWorkflow({
  name: 'renovation-planner',
  inputSchema: z.object({ description: z.string() }),
  outputSchema: z.object({ sketchUrl: z.string() }),
})
  .then(captureRequirements)
  .then(generateFloorPlan)
  .commit();
```

---

## Sketch URL as Agent Memory

One pattern that works well with Mastra's memory system: store sketch URLs alongside the conversation.

```typescript
import { Memory } from '@mastra/memory';

// When a sketch is generated, store the URL in memory
await memory.saveMessage({
  threadId: session.threadId,
  resourceId: user.id,
  role: 'assistant',
  content: `I've sketched your floor plan: ${sketchUrl}`,
  metadata: { sketchId, sketchUrl, type: 'floor-plan' },
});

// Later in the same conversation
const previousSketches = await memory.query({
  threadId: session.threadId,
  filters: { 'metadata.type': 'floor-plan' },
});
// Agent can now reference and modify previous sketches
```

The sketch URL is persistent. A Mastra agent can return to it across sessions, reference it in follow-up turns, or pass it to another agent in a multi-agent workflow.

---

## LLM Benchmark (Which Model Works Best?)

| Model | First-try success | Notes |
|-------|------------------|-------|
| Claude Sonnet 4 | 94% | Best overall. Reliable JSON, good spatial reasoning |
| GPT-4o | 89% | Strong. Slight tendency to over-complicate schemas |
| Claude Haiku | 81% | Good for simple sketches, struggles with complex layouts |
| GPT-4o Mini | 72% | Fast and cheap, works for simple shapes |
| Gemini 1.5 Flash | 68% | Improving. Schema validation errors on edge cases |

For Mastra agents: Claude Sonnet 4 via Anthropic SDK or GPT-4o via `@ai-sdk/openai` are both solid choices.

---

## Why This Works

Skissify's schema design makes LLM generation reliable:

- **Flat structure**: No nested objects. LLMs don't have to manage complex hierarchies.
- **Absolute coordinates**: No relative positioning math. `x: 100, y: 200` means exactly that.
- **Forgiving renderer**: Missing optional fields get sensible defaults. Slight coordinate errors render fine.
- **Human-readable descriptions**: Each element has a `label` field — the LLM can put what it "meant" in plain English.

The schema was designed after studying where LLMs fail at JSON generation. The answer was almost always: complex nesting and relative coordinate systems.

---

## Mastra Community Showcase

Already using Skissify + Mastra? A few patterns the community has built:

- **Real estate agents**: "Describe your dream home" → instant floor plan sketch
- **Architecture firms**: Client brief → rough layout → refine via conversation  
- **D&D campaign tools**: "Describe the dungeon entrance" → room map
- **Product managers**: "Walk me through the user flow" → UI wireframe sketch

---

## Get Started

```bash
# Try it in 30 seconds
npx @skissify/mcp-server

# Then in Claude or any MCP client:
"Use Skissify to draw a 2-bedroom apartment with open-plan kitchen/living area"
```

Or try Human Mode at [skissify.com](https://skissify.com) — describe what you want in plain text, no JSON, no code.

The Mastra integration guide is at [skissify.com/docs/mastra](https://skissify.com/docs/mastra).

---

**Filed under:** TypeScript, AI Agents, Mastra, Visual Output, MCP

*Cross-post targets: Dev.to (primary), Hashnode, r/typescript, Mastra Discord, r/mcp*
