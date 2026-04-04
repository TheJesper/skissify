# How AI Agents Can Draw Floor Plans

**The Reproducibility Problem: Why Text Descriptions of Space Don't Scale — And What Does**

*Angle: Cycle 142 — "Reproducibility" — sketch URL as the git hash for visual ideas in AI workflows*

---

Ask Claude to describe a floor plan twice.

You will get two different descriptions. Possibly with different room names. Different dimensions. Different adjacency relationships. Both will sound plausible. Both will be inconsistent with each other.

This is not a hallucination problem. It is a reproducibility problem.

Text descriptions of spatial layouts are non-deterministic. Every generation is unique. You cannot reference them. You cannot version them. You cannot say "go back to the version where the kitchen was next to the living room" — because that version was a string of tokens that no longer exists.

This is one of the most underappreciated limitations of text-based AI output.

---

## The Reproducibility Stack

Consider how other AI output types handle reproducibility:

| Output type | Reference mechanism | Version control? |
|-------------|--------------------|--------------------|
| Generated text | None — must re-generate | No |
| Code | File path + git hash | Yes |
| Image (diffusion) | Seed + prompt (approximate) | Approximate |
| Structured data (JSON) | File path + schema version | Yes |
| **Sketch manifest (Skissify)** | **URL + deterministic render** | **Yes** |

Code is reproducible because it is a deterministic artifact. The same source code always produces the same behavior. This is why developers trust it, version it, and build on it.

Skissify brings the same property to visual layouts.

A Skissify sketch is a JSON manifest. Every element — every wall, door, window, label, dimension — is defined precisely. When you render that manifest, you always get exactly the same sketch. Every time. Forever.

The sketch URL is the address of that manifest. It is, functionally, a git hash for a visual concept.

---

## What AI Agents Actually Need

When an AI agent needs to communicate a spatial layout, it has three options:

1. **Describe it in text**: "A rectangular room approximately 4 meters by 6 meters with a door on the east wall and two windows on the south wall"
2. **Generate an image**: Requires a diffusion model, produces a non-deterministic result that can't be inspected or modified
3. **Produce a structured manifest**: JSON that defines every element precisely, renders deterministically, can be versioned and referenced

Option 1 is lossy. Option 2 is expensive and black-box. Option 3 is the engineering approach.

Here's what option 3 looks like in practice with the Skissify MCP server:

```json
{
  "tool": "render_sketch",
  "arguments": {
    "manifest": {
      "paper": "cream",
      "tool": "pencil",
      "wobble": 0.3,
      "elements": [
        {"type": "rect", "x": 50, "y": 50, "width": 300, "height": 200, "label": "Living Room"},
        {"type": "door-symbol", "x": 50, "y": 150, "width": 40, "angle": 0},
        {"type": "window", "x": 150, "y": 50, "width": 80},
        {"type": "dim", "x": 50, "y": 270, "width": 300, "label": "4.5m"}
      ]
    }
  }
}
```

The output is a URL. That URL resolves to a rendered sketch. Reload the URL one year from now — same sketch.

---

## Version Control for Visual Ideas

Here's the workflow that becomes possible:

```
Agent generates manifest v1 → URL: skissify.com/s/abc123
Agent modifies kitchen position → Manifest v2 → URL: skissify.com/s/def456
User selects v1 → Agent knows exactly which layout
```

Compare this to diffusion image generation:
```
Agent generates image → Binary blob with no structure
User asks to change kitchen → Agent must regenerate entire image
No reference to the previous version
```

The manifest approach enables:
- **Diff-able changes**: what changed between version 1 and version 2 is machine-readable
- **Selective modification**: change one element without regenerating everything
- **Audit trail**: every version is addressable and renderable
- **Multi-agent reference**: Agent A produces a layout, Agent B refers to it by URL

---

## The Agent Workflow That's Now Possible

With Skissify in your MCP stack, this workflow becomes real:

1. **User prompt**: "Draw me a 3-bedroom apartment with an open kitchen"
2. **Agent generates** a JSON manifest with room elements
3. **Skissify MCP renders** the manifest to a sketch URL
4. **Agent responds** with the URL: "Here's your floor plan: skissify.com/s/xyz"
5. **User says**: "Move the bathroom to the corner"
6. **Agent modifies** the JSON manifest (changes 2 coordinates)
7. **New URL**: skissify.com/s/xyz2 — only the bathroom moved
8. **Both versions remain addressable** forever

This is reproducible, versionable, spatial communication.

---

## Why This Matters for the MCP Ecosystem

The MCP ecosystem has 12,000+ servers. Almost all of them add data retrieval or action capabilities to AI agents. Very few add output format capabilities.

Skissify adds a new output format: **the addressable sketch**.

An agent that can only produce text and code cannot communicate spatial ideas with precision. An agent that can produce sketch URLs can:
- Show a floor plan instead of describing it
- Reference a specific layout version later in a conversation
- Hand a visual artifact off to another agent

This is the missing piece in the visual layer of the agent stack.

---

## Get Started

Add Skissify to your Claude Code config:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "@skissify/mcp"]
    }
  }
}
```

Ask Claude: "Draw a floor plan of a small studio apartment with a loft bed area."

Watch the difference between text description and a sketch URL.

That difference is reproducibility.

---

*Skissify gives AI agents a visual output format that is deterministic, addressable, and version-controlled. skissify.com/mcp*
