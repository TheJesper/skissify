# Day 2 Debrief: What the Numbers Actually Tell Us About Who Wants Skissify

*March 28, 2026 — Day 2 Morning*  
*~1,800 words | 7 min read*  
*Best platform: Indie Hackers (primary), Dev.to, Substack*

> **The meta-story nobody tells you about launch day:** The people who find your tool in the first 24 hours are almost never who you built it for. And that might be the most valuable data you'll ever get. Here's what ours said.

---

We launched Skissify on Friday, March 27th at midnight CET. 24 hours later, here's what I know.

## The Numbers (Fill In Before Publishing)

| Metric | Day 1 Total |
|--------|------------|
| Signups | [X] |
| Sketches created | [Y] |
| Pro subscribers | [Z] |
| Product Hunt upvotes | [N] |
| HN Show HN points | [M] |
| MCP server installs | [K] |
| Share links opened | [L] |
| Countries | [C] |

I'll fill these in with real numbers when I publish this post at 10:00 CET. Writing the structure now while the patterns are fresh.

---

## Who Actually Showed Up

We built Skissify for AI developers. People who write MCP servers, run local LLMs, build agent pipelines with LangGraph and CrewAI. That's the mental model I had: a developer audience, probably male, 25-40, US or EU, who already knows what MCP is.

The first 24 hours told a different story.

### Profile 1: The MCP Developer (Expected)

They found us through the HN Show post and the r/mcp community posts. Technical, asks great questions about schema validation and error handling. They want:
- The JSON schema reference (high demand for this)
- Self-hosting instructions
- Rate limits for the API
- LangChain/LangGraph integration examples

**Conversion rate:** High — they immediately understand the value

### Profile 2: The Home Renovator (Completely Unexpected)

They found us through... we're not entirely sure. Social sharing? The floor plan demos we used? Some got here by describing their room to Claude and having it suggest Skissify. They want:
- To sketch their kitchen layout before calling a contractor
- To show their partner what the new bedroom would look like
- To plan where furniture goes after moving

**Conversion rate:** Medium — friction at the JSON input (this is the "Human Mode" signal)

### Profile 3: The Dungeon Master (Delightful)

D&D and tabletop RPG community. An AI agent + Skissify can generate dungeon maps, encounter rooms, and campaign overviews. They found us through... someone shared a floor plan that was actually a dungeon layout. The Reddit post got traction in r/DnD (which we never targeted).

**Conversion rate:** Surprisingly high — they create dozens of sketches per session

### Profile 4: The Product Manager

Using Claude + Skissify to wireframe user flows. Not as detailed as Figma, not as technical as Mermaid — the "napkin phase" before official design work. They want multi-board sessions and the ability to annotate sketches.

---

## The Three Things That Went Better Than Expected

### 1. MCP Discovery Was Organic

We expected to have to explain what MCP is to most users. Instead, many new signups already had Claude Desktop with MCP configured — the MCP ecosystem has matured. The `npm install -g @skissify/mcp-server` → instant Claude Desktop integration path worked on the first try for most users who tried it.

### 2. The Wobble Algorithm Got Attention

The most-commented technical detail was the wobble algorithm — specifically that we use multi-harmonic wave functions rather than simple sine offsets. Developers in the HN thread started asking about the math. This is a potential YouTube/blog post series that we hadn't planned.

### 3. Share Links Are Viral Vectors

Every time someone creates and shares a sketch, the viewer sees "Made with Skissify" and a CTA. Several Day 1 signups came directly from shared floor plan links. This is passive growth we didn't actively pursue — just built the sharing feature and it worked.

---

## The Three Things That Were Harder Than Expected

### 1. The JSON Barrier for Non-Developers

Home renovators and D&D players both hit the same wall: they need to describe what they want in natural language, not write JSON. They love the output. The input format stops them. The "Human Mode" feature — a text-to-JSON bridge — is now **Week 1 priority**, not Week 2.

### 2. Product Hunt Traction Was Slower Than Expected

PH works best when your existing audience amplifies the launch. Without an established newsletter or Twitter following, the initial upvote momentum was slow. This is less a Product Hunt problem and more a "build an audience before launching" lesson. Noted for any future products.

### 3. r/mcp Was the Right Community but We Posted to It Late

We targeted HN, Twitter, and general dev communities first. r/mcp — which is exactly the technical audience we built for — was posted to on Day 2 (this morning). The lesson: sometimes your most targeted community should go first, not last, because they'll give the best technical feedback that improves your messaging everywhere else.

---

## The Insight That Changes Everything

There's a pattern across all four user profiles:

**Everyone benefits from AI being able to draw.** 

The developer building an agent pipeline. The homeowner planning a renovation. The dungeon master designing an encounter map. The PM wireframing user flows.

They all arrived at the same problem from different directions: they needed AI to produce *something you can look at*, not just read. Skissify is the output layer. The use cases are broader than we imagined.

The product doesn't need to change. The framing does.

"AI sketch tool" is too narrow. "The drawing surface for AI agents" is closer. "What happens when your AI can finally draw" is the story.

---

## Day 2 Priorities (Today)

1. **Post to r/mcp** with real Day 1 numbers — the most important post of Day 2
2. **Post LLM benchmark results** on r/LocalLLaMA (94% first-try success with Claude Sonnet 4)
3. **Publish this post** with real numbers filled in — Indie Hackers + Dev.to
4. **Prototype Human Mode** — even a textarea that pipes to Claude and returns JSON is enough to test

The story is just getting started.

---

*Follow along at skissify.com — launch thread on X @jesperland*
