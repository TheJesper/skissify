# The Napkin Sketch API That Didn't Exist (Until Now)

*Published: March 28, 2026 | Cycle 34*  
*~1,800 words | 7 min read*  
*Cross-post to: Indie Hackers (primary), Substack, Medium*

> **The short version:** I needed a way for an AI agent to show its thinking visually, not just describe it. Nothing existed. So I built an API that takes JSON and draws hand-drawn sketches. 48 hours after launch, it's being used for things I never imagined.

---

There's a gap in every AI workflow I've built.

The agent can reason. It can write. It can analyze and summarize and explain. But when the output should be a *picture*—a floor plan, a rough wireframe, a spatial diagram—the best it can do is describe it in words and hope you can visualize it.

That gap has a name: the napkin phase.

## What the Napkin Phase Is

In any design or planning process, there's a moment before the polished thing—before Figma, before the CAD drawing, before the final deck—where the best tool is a pen and the back of an envelope.

The napkin sketch isn't a deliverable. It's a thinking tool. Rough, flexible, explicitly provisional. It says: *here's the shape of the idea, not the final answer*.

AI assistants can't do this. They can tell you about a room layout. They can list the components of a system architecture. But they can't *show* you a rough sketch of it.

I've wanted to solve this for two years. Last month, I finally had enough free weekends to build it.

## Building the API

The core question was: what format should a sketch be in so that an LLM can reliably generate it?

I tried several approaches:

**Approach 1: Natural language → parser → render**  
Too ambiguous. "Put the living room on the left" has 15 interpretations.

**Approach 2: SVG output**  
LLMs can write SVG, but SVG is verbose and error-prone. First-try success rates were around 60%.

**Approach 3: Excalidraw's JSON format**  
Better, but still too complex. The format reflects human drawing history (undo stacks, selection state), not spatial intent.

**Approach 4: Custom flat JSON schema**

```json
{
  "elements": [
    { "type": "rect", "x": 50, "y": 50, "w": 300, "h": 200, "label": "Living Room" }
  ]
}
```

This is the one. Flat arrays, absolute coordinates, minimal required fields. When I tested this with Claude Sonnet 4, first-try success jumped to 94%.

The reason is simple: this schema maps directly to how language models think about space. They're describing objects in a coordinate system—essentially translating their mental model into structured data. Hierarchy, state, or complex relationships add cognitive load that degrades generation quality.

## The Wobble Algorithm

One decision I debated: should the output look clean and precise, or rough and hand-drawn?

I went rough. Deliberately.

The reason isn't aesthetic—it's psychological. Polished output signals "finished design." Rough, sketchy output signals "working idea." When you show someone a polished floor plan, they evaluate it as a deliverable. When you show them a napkin sketch, they engage with the concept.

The wobble algorithm uses multi-harmonic oscillation across three axes:

- **Amplitude**: how much the lines deviate from the intended path
- **Wave frequency**: how many waves per stroke
- **Humanness**: a randomness multiplier that prevents mechanical uniformity

At `amplitude: 0`, you get clean technical lines. At `amplitude: 8`, you get something that looks like it was drawn quickly on a coffee shop napkin. Most users land around 3-4 for the right balance.

## MCP: The Part I Didn't Plan For

When I built the API, I wasn't thinking about MCP (Model Context Protocol).

I knew it existed—Anthropic released it in late 2024 and it had grown to 97M+ monthly downloads by early 2026. But I thought of it as plumbing, not product.

Then a user on a Discord server showed me something that changed my mind: they'd given Claude the Skissify API docs, and Claude had spontaneously started generating JSON and making API calls to render floor plans. In a conversation. Autonomously.

I hadn't built an MCP server yet. I added one in a weekend.

The MCP integration is now Skissify's most distinctive feature:

```bash
npm install -g @skissify/mcp-server
```

Add it to your Claude Desktop config, and the AI can create and render sketches as naturally as it can search the web or write code.

## What Happened After Launch

I launched on March 27, 2026. Here's what I expected vs. what happened:

**Expected:**
- 80% of users: AI developers building agent workflows
- 15% of users: software developers wanting diagrams-as-code
- 5% of users: designers exploring AI tooling

**What actually happened:**
- 40% AI developers and agent builders ✓
- 25% homeowners and renovation planners 🤔
- 15% tabletop RPG players (dungeon maps) 🎲
- 10% teachers and educators 📚
- 10% software developers ✓

I didn't pitch to homeowners. I didn't pitch to dungeon masters. Someone used it to brief a contractor about a kitchen renovation—described the room to Claude, printed the sketch, walked into the meeting.

That's the thing about primitives: they get used in ways you didn't predict. A database API doesn't know what you're storing. A sketch API doesn't know what you're drawing.

## What I Would Have Done Differently

**Built the MCP server first.** The web editor is nice, but the MCP integration is what makes Skissify genuinely novel. I should have led with that.

**Chosen a narrower launch audience.** "AI developers" is still a broad category. I should have started with the r/mcp community specifically—they understood the product immediately, while other audiences needed more context.

**Made a GIF on day one.** Text descriptions of sketches don't travel. A 10-second clip of typing JSON and watching a floor plan appear—that would have done more than the first 20 tweets combined.

## What's Next

The feature I'm building now is called Human Mode. Instead of writing JSON yourself, you describe what you want:

> "3-bedroom house, open plan kitchen, north-facing garden"

Claude converts that to JSON. Skissify renders it. You can then say "make the master bedroom bigger" and it updates. The sketch becomes a conversation, not a file.

This is the product I wanted to build from the start. The JSON API was the foundation.

---

If you're building something that needs visual output—not image generation, not charts, but rough spatial sketches—[Skissify](https://skissify.com) might be the missing piece.

The napkin sketch API that didn't exist. Now it does.

---

**Follow the build:** [@jesperland](https://x.com/jesperland)  
**Try it:** [skissify.com/editor](https://skissify.com/editor)  
**MCP server:** `npm install -g @skissify/mcp-server`
