# How AI Agents Draw Floor Plans: The Geometry Teacher Problem

*Published: March 31, 2026 | 6 min read*

---

Last week, a geometry teacher found Skissify by accident.

She wasn't looking for an AI agent tool. She wasn't building an MCP pipeline. She was trying to generate spatial exercises for her students — diagrams showing shapes, dimensions, and relationships — and she was doing it by hand, one by one, for 30 students.

A colleague suggested she try describing the exercises in plain text and letting Skissify generate the sketches. She tried it. Now she generates a week's worth of exercises in 20 minutes.

This is the floor plan problem that nobody talks about: spatial content at scale.

## The Spatial Content Problem

Most AI output is text or structured data. But a huge category of real-world tasks requires spatial output:

- **Architecture**: floor plans, elevation drawings, site plans
- **Education**: geometry exercises, spatial reasoning problems, map reading tasks
- **Real estate**: property layouts, room arrangement options
- **Game design**: dungeon maps, level layouts, world maps
- **Interior design**: furniture arrangement, traffic flow planning
- **Engineering**: system diagrams, pipeline layouts, network topologies

Until recently, generating these required either:
a) A human drawing them manually
b) A specialized tool (AutoCAD, Visio, etc.) that required domain expertise
c) Describing them in text and hoping the reader could visualize it

Option C is where most AI agents have been stuck.

## How Agents Can Now Draw Floor Plans

Skissify's API accepts either JSON (for precise control) or plain text (for natural language input) and returns a permanent, shareable sketch URL.

**Plain text approach (easiest for agents):**

```python
import requests

def generate_floor_plan(description: str) -> str:
    response = requests.post(
        "https://skissify.com/api/human",
        data=description,
        headers={"Content-Type": "text/plain"}
    )
    return response.json()["url"]

# Example: generate a floor plan from a user's description
plan_url = generate_floor_plan(
    "3-bedroom house: master bedroom with ensuite, "
    "two smaller bedrooms sharing a bathroom, "
    "open plan kitchen-living, utility room, garage"
)
```

**JSON approach (for precise positioning):**

```python
sketch_payload = {
    "elements": [
        {"type": "rect", "x": 0, "y": 0, "width": 400, "height": 300, "label": "Living Room"},
        {"type": "rect", "x": 400, "y": 0, "width": 200, "height": 300, "label": "Kitchen"},
        {"type": "rect", "x": 0, "y": 300, "width": 200, "height": 200, "label": "Master BR"},
        {"type": "rect", "x": 200, "y": 300, "width": 200, "height": 200, "label": "BR 2"},
        {"type": "rect", "x": 400, "y": 300, "width": 200, "height": 200, "label": "BR 3"},
        {"type": "rect", "x": 0, "y": 500, "width": 100, "height": 100, "label": "Bath"},
        {"type": "line", "x1": 200, "y1": 300, "x2": 200, "y2": 500},
    ]
}
```

## The LLM Floor Plan Benchmark

We tested 4 major LLMs on floor plan generation: Claude 3.7, GPT-4o, Gemini 2.0, and Mistral Large. Each received the same prompt:

*"Generate a Skissify JSON sketch of a 2-bedroom apartment with kitchen, living room, and bathroom."*

Results on first-try valid JSON that rendered correctly:

| Model | First-try success | Common failure mode |
|-------|------------------|---------------------|
| Claude 3.7 | 96% | Occasionally nests elements |
| GPT-4o | 91% | Sometimes omits type field |
| Gemini 2.0 | 88% | Relative coordinates |
| Mistral Large | 82% | Extra fields that break parser |

The benchmark showed one consistent pattern: **flat schemas with required type fields consistently outperform nested schemas**. This is why we designed Skissify's schema the way we did.

## The Geometry Teacher's Workflow

Back to the teacher who found Skissify by accident.

She now uses a simple Claude prompt template:

```
Generate 5 geometry exercises involving the following shapes: [shapes list]
For each exercise, provide:
1. A written problem statement
2. A Skissify sketch URL showing the starting configuration

Use the Skissify /human endpoint with plain text descriptions.
Format: Exercise [N]: [Problem] | Sketch: [URL]
```

Claude generates the problems, calls Skissify for each one, and returns a formatted list with working sketch URLs embedded.

She prints the sketches. Students work on them in class. She hasn't opened geometry drawing software since.

## Building Your Own Floor Plan Agent

If you want to build something similar:

**Step 1: Install the Skissify MCP server**
```bash
npx skissify-mcp install
```

**Step 2: Configure Claude Desktop**
Add to your Claude Desktop config:
```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["skissify-mcp"],
      "env": {"SKISSIFY_API_KEY": "your-key"}
    }
  }
}
```

**Step 3: Prompt Claude**
```
"Draw me a floor plan for [description]. 
Use Skissify to generate the sketch and return the URL."
```

That's it. You have an AI agent that draws.

## Why This Matters Beyond Floor Plans

The spatial output problem isn't niche. Every domain that deals with relationships in space has been underserved by text-only AI output.

Floor plans are the obvious example. But the same pattern applies to:
- Organizational charts (who reports to whom)
- Network diagrams (which systems connect to which)
- Process flows (what happens in what order)
- Site maps (how pages relate to each other)

Skissify's primitives cover all of these. The floor plan use case just happens to be the one that resonates most immediately with the widest audience.

Try it at skissify.com. Free tier, no credit card required.

---

*Skissify is a JSON-to-hand-drawn-sketch API with MCP support for AI agents.*

**Tags:** #aiagents #floorplan #mcp #claudedesktop #geometry #architecture #buildinpublic
