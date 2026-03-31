# How AI Agents Can Draw Floor Plans (A Practical 2026 Guide)

*Launch Day 2 Edition — April 2, 2026*
*~700 words | Optimized for: HackerNews Show HN, r/mcp, r/AI_Agents*
*SEO target: "AI agent floor plan generator", "MCP draw floor plan Claude 2026"*

---

Most AI agent tutorials end with text output.

The agent reasons, the agent retrieves, the agent responds — and the response is a paragraph, a list, maybe some JSON. Which is fine. Text is useful.

But spatial problems — room layouts, architecture diagrams, system maps, network topologies — are fundamentally visual. Describing a floor plan in words is like humming a color. You can do it. It's just not the same thing.

Until recently, AI agents had no drawing primitive. They could *reason* about space but couldn't *output* space. That gap is now closed.

---

## The Mechanism

Skissify is a REST API. You POST JSON describing a sketch, you get back SVG.

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "cream",
    "tool": "ballpoint",
    "amplitude": 0.8,
    "elements": [
      { "type": "rect", "x": 20, "y": 20, "w": 240, "h": 200 },
      { "type": "text", "x": 90, "y": 125, "text": "Living Room", "fontSize": 14 },
      { "type": "door-symbol", "x": 20, "y": 150, "w": 45, "side": "left" },
      { "type": "window", "x": 100, "y": 20, "w": 70 }
    ]
  }'
```

The response is an SVG string. Render it in a browser, embed it in a document, save it as a file, pass it to another agent. It's just data.

No authentication required. No rate limits on the free tier.

---

## Getting Claude to Draw

The fastest path is the MCP server. Two minutes of setup.

Add this to your Claude Desktop config:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "skissify-mcp"]
    }
  }
}
```

Restart Claude Desktop. Then:

*"Draw me a studio apartment floor plan, roughly 6×5 meters. Include a kitchen along the north wall, a sofa and coffee table in the living area, a bed in the sleeping corner, and a small bathroom."*

Claude will reason about the layout, construct the SketchData JSON, call the render tool, and return the SVG embedded in the conversation. It looks like something sketched carefully on trace paper.

The hand-drawn aesthetic is intentional. For early-stage spatial reasoning, rough outputs invite collaborative feedback. The wobbly lines signal "this is a draft — let's discuss" rather than "this is decided."

---

## In Your Own Agent Framework

If you're building with LangChain, CrewAI, Mastra, AutoGen, or raw OpenAI function calls, Skissify is just an HTTP tool:

```typescript
const renderSketch = async (elements: SketchElement[]) => {
  const res = await fetch('https://skissify.com/api/render', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paper: 'cream', tool: 'ballpoint', amplitude: 0.7, elements })
  });
  return res.text(); // SVG string
};
```

Register this as a tool with a clear description ("generates a hand-drawn floor plan sketch from a list of elements"), provide a coordinate scale hint in your system prompt (40 units ≈ 1 meter works well), and your agent can draw whenever it determines drawing is more useful than describing.

---

## The Vocabulary That Makes It Work

What makes floor plan generation actually useful is the architectural element library. Skissify ships 30+ specialized types:

- **Structure:** `wall`, `rect`, `column`
- **Openings:** `door-symbol`, `window`, `opening`, `sliding-door`
- **Circulation:** `stairs`
- **Furniture:** `sofa`, `bed`, `armchair`, `desk`, `bookshelf`
- **Kitchen:** `stove`, `kitchen-sink`
- **Bathroom:** `toilet`, `sink`, `bathtub`, `shower`
- **Technical:** `dimension`, `arrow`, `text`, `dashed`

When an LLM generates a floor plan, it needs the right vocabulary to think in. "Draw a bathroom" is ambiguous. "Place a `toilet` at (190,25), a `sink` at (225,25), and a `shower` at (190,55)" is precise and renderable.

---

## What People Are Building Right Now

- **Real estate agents** generating rough floor plan sketches from listing descriptions in 20 seconds
- **Interior designers** showing clients rough spatial options before committing to CAD
- **Architecture students** iterating on layout options before drafting
- **Game devs** generating dungeon/building layouts with hand-drawn aesthetics
- **CI/CD pipelines** auto-generating architecture diagrams on every PR merge

---

## Start in 5 Minutes

- **Claude Desktop:** Add the MCP config above, restart, ask Claude to draw something
- **curl:** `curl -X POST https://skissify.com/api/render -H "Content-Type: application/json" -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":150}]}'`
- **Any framework:** HTTP POST to the endpoint with a JSON body, get SVG back
- **Browser:** [skissify.com](https://skissify.com) — full editor with JSON panel

Full element reference and agent integration guide: [skissify.com/for-agents](https://skissify.com/for-agents)

---

*Skissify is the hand-drawn sketch API for AI agents and developers. Try it free — no account required.*
