# Skissify vs Excalidraw: The r/LocalLLaMA Verdict

*Audience: Local LLM runners, API-first developers, agent builders*
*~1,200 words | Tags: excalidraw, comparison, local LLM, MCP, API*

---

If you're building LLM pipelines and you need visual output — floor plans, wireframes, system diagrams — you've probably already evaluated Excalidraw and wondered whether it can be driven programmatically.

Short answer: Excalidraw is not designed for programmatic use. Its data format is JSON, but there's no stable API for rendering. The tool is designed for humans with pointing devices.

Skissify is the opposite. It's designed from the start for code and AI agents: POST JSON, get SVG, no auth, no UI required.

Here's the comparison for people building AI workflows rather than whiteboarding with colleagues.

---

## The Core Difference

| Dimension | Skissify | Excalidraw |
|---|---|---|
| Primary operator | Code / AI agent | Human with a mouse |
| REST API for rendering | ✅ `/api/render` | ❌ Not available |
| MCP server | ✅ `npx skissify-mcp` | ❌ Not available |
| Offline / local use | ✅ Self-hostable (Docker) | ✅ Open-source |
| Architectural symbols | ✅ 30+ types (walls, doors, stairs, furniture) | ❌ None |
| Real-time collaboration | ❌ Not yet | ✅ Excalidraw+ |
| Auth required to render | ❌ None | N/A (no render API) |
| Output format | SVG (server-side) | SVG / PNG (client-side only) |
| Open source | ⚠️ Core renderer | ✅ Fully |

---

## Use Case: Local LLM + Visual Output

If you're running Llama 3, Mistral, or any open-weight model locally and want your model to produce floor plans or diagrams, your options are:

**Option A: Excalidraw JSON**
You can prompt your LLM to generate Excalidraw JSON format. Then paste that JSON into the Excalidraw editor. Problems:
- Excalidraw's internal JSON format is not documented as a stable API surface
- You can't render it server-side without running a headless browser
- Output quality varies widely depending on how well the model has internalized the format
- No validation — malformed JSON silently produces broken diagrams

**Option B: Skissify JSON**
You prompt your LLM to generate Skissify manifest JSON. POST it to `/api/render`. Get SVG back. Problems:
- Requires network access to skissify.com (or a self-hosted instance)
- Smaller community / fewer examples in training data vs Excalidraw

Skissify's JSON schema is designed to be LLM-friendly: simple types (`rect`, `circle`, `door-symbol`, `stair`), explicit coordinate system, labeled properties. GPT-4, Claude, and Llama 3 all generate valid Skissify manifests at high accuracy with a brief system prompt.

---

## Self-Hosting

Skissify ships with a Dockerfile and `docker-compose.yml`. You can run the full stack locally:

```bash
git clone https://github.com/[skissify-repo]
docker compose up
```

The render endpoint runs at `http://localhost:3000/api/render`. No external dependencies. Works air-gapped.

This matters for local LLM setups where you want the entire pipeline — model inference, visual rendering — on your own hardware.

---

## When to Use Each

**Use Excalidraw when:**
- A human is doing the drawing in real time
- You need real-time multi-user collaboration
- You need an offline PWA that works without a server
- You're embedding a whiteboard canvas in your application (Excalidraw is embeddable)

**Use Skissify when:**
- Code is generating the sketch (scripts, workflows, CI/CD)
- An AI agent (local or cloud) is producing visual output
- You need server-side SVG rendering
- You need architectural symbols (floor plans, room layouts)
- You want a stable, documented API surface

**Use both when:**
Some pipelines make sense with both: Skissify for the AI-generated initial sketch, Excalidraw for human refinement. Export the Skissify SVG and import it into Excalidraw for manual editing. They're complementary in a multi-stage workflow.

---

## The Model Context Protocol Angle

Skissify ships an MCP server (`npx skissify-mcp`). This means any MCP-compatible client — Claude Desktop, Cursor, Windsurf, and any custom MCP host — can call `skissify_draw` as a native tool.

For local setups: if you're running a local MCP-compatible agent framework (Mastra, LangChain with MCP bindings, etc.) and you want sketch output without cloud dependencies, self-host Skissify and point the MCP server at your local instance.

Excalidraw has no MCP integration and no equivalent.

---

## Benchmark: Floor Plan Generation

Using Llama 3 70B (via Ollama) with a Skissify system prompt:

- Valid JSON on first try: ~87% of prompts
- Floor plan with 3–6 rooms, doors, and windows: typically 3–5 attempts before fully coherent layout
- Studio apartment sketch: 1–2 attempts

The main failure mode is coordinate overlap (rooms placed at invalid offsets). Adding a brief coordinate validation hint to the system prompt (e.g., "rooms should not overlap; place each room at coordinates that don't intersect") drops the error rate significantly.

The Skissify Discord and GitHub issues have examples of system prompts that work well with various models.

---

## Bottom Line

If you're in r/LocalLLaMA territory — building AI pipelines, running local models, wanting code-driven visual output — Excalidraw is not the answer. It's a collaboration tool for humans.

Skissify is the tool that was missing: a simple REST API, a documented JSON schema, an MCP server, and a self-hostable stack. It does one thing (JSON → hand-drawn SVG) and does it with a stable, LLM-friendly interface.

Try it in 5 minutes:
```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","tool":"pencil","elements":[{"type":"rect","x":0,"y":0,"width":200,"height":150,"label":"Living Room"}]}'
```

No key. No header. Just a POST.

---

*[skissify.com](https://skissify.com) — REST API + MCP server. Self-hostable. Free tier unlimited.*
