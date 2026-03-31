# Skissify Press Kit

*Last updated: March 31, 2026*

---

## One-Liner

**Skissify turns JSON into hand-drawn sketches — designed for AI agents and developers.**

---

## Taglines (Choose One)

- "JSON in. Hand-drawn sketch out."
- "The diagram API for AI agents."
- "Hand-drawn sketches, programmatically."
- "Where code becomes sketches."
- "The first diagram tool where AI is a first-class citizen."
- "Your AI agent can now draw."

---

## Product Description (Short, 100 words)

Skissify is a hand-drawn sketch renderer with a REST API. Developers and AI agents describe sketches as JSON, POST to `/api/render`, and get back beautiful wobbly SVGs instantly — no auth, no UI required.

Thirty-plus element types cover everything from architectural symbols (walls, doors, windows, stairs, furniture) to technical diagrams (arrows, dimensions, paths). An MCP server lets Claude and other LLMs draw natively. Use it to generate floor plans, wireframes, documentation diagrams, or any visual that should look like it was sketched by a thoughtful human.

---

## Product Description (Medium, 250 words)

Skissify is a hand-drawn sketch tool built from the ground up for AI agents and developers. Where traditional design tools require human interaction — mouse clicks, drag-and-drop, UI navigation — Skissify is driven entirely by JSON and a REST API.

The core workflow: describe your sketch as a JSON object (paper type, drawing tool, wobble settings, and an array of elements), POST it to `/api/render`, and receive a beautiful SVG rendered in a hand-drawn style. No authentication required. No rate limits on the free tier.

Skissify supports 30+ element types tailored for real-world use cases:
- **Architectural:** walls with proper double-line rendering, doors with swing arcs, windows, stairs, openings, columns
- **Furniture & fixtures:** beds, sofas, armchairs, desks, bookshelves, kitchen and bathroom fixtures
- **Technical:** lines, rectangles, circles, arcs, arrows, dimension lines, dashed lines, text, freehand paths

An MCP (Model Context Protocol) server — `npx skissify-mcp` — makes Skissify available as a native tool in Claude Desktop, Cursor, and any MCP-compatible AI agent. Ask Claude to sketch your apartment layout and it will construct the JSON and render it directly.

Skissify also includes a full in-browser editor for humans: preset templates, a JSON editor panel, freehand drawing mode, export to PNG/SVG, shareable public URLs, and a blueprint rendering mode with title blocks.

Launched April 2026. Built in Stockholm, Sweden.

---

## Founder Bio

**Jesper** is a developer and designer based in Stockholm, Sweden. He builds tools that make the gap between ideas and visuals smaller — for both humans and AI agents. Skissify was born from a simple frustration: why can't an LLM just draw?

He's also building Luncho (restaurant discovery), Svante (personal AI assistant), and various open-source tools in the JavaScript/TypeScript ecosystem.

---

## Key Facts

| | |
|---|---|
| **Founded** | 2026 |
| **Headquarters** | Stockholm, Sweden |
| **Tech stack** | Next.js, TypeScript, PostgreSQL, Prisma |
| **Rendering** | Canvas API (client), SVG (server-side) |
| **API endpoint** | https://skissify.com/api/render |
| **Free tier** | Unlimited renders, no auth |
| **MCP server** | `npx skissify-mcp` |

---

## Product Screenshots / Visual Assets Needed

*Note: These should be captured before launch and placed in `docs/marketing/assets/`*

1. **Hero shot** — Editor with a floor plan loaded, showing the wobbly hand-drawn style on cream paper
2. **Blueprint mode** — A technical drawing on blue paper with title block
3. **JSON → Sketch** — Side-by-side: JSON on left, rendered sketch on right
4. **AI Agent draw** — Claude conversation where it draws a floor plan
5. **Mobile view** — Editor on mobile (bottom sheet controls)
6. **Gallery** — Public gallery of community sketches
7. **Architectural preset** — Full floor plan with rooms, doors, furniture, dimensions
8. **For-agents page** — The developer documentation page

**Recommended dimensions:**
- Twitter/X: 1200×675px
- Product Hunt: 1270×760px (video) or 1270×952px (gallery images)
- OG image: 1200×630px (already implemented in `/app/opengraph-image.tsx`)

---

## Product Hunt Assets

**Hunter:** [to be filled]  
**Makers:** Jesper  
**Product Hunt page:** [TBD]

**Gallery images needed (in order):**
1. Hero — "The API that draws" (JSON + sketch side by side)
2. Floor plan example — architectural preset
3. Blueprint mode example
4. "AI draws" — Claude + Skissify
5. Mobile editor

---

## Media Coverage Boilerplate

```
Skissify is a hand-drawn sketch tool that accepts JSON input and outputs SVG via a 
REST API. Designed for AI agents and developers, it includes 30+ architectural and 
technical element types, a Claude MCP server, and a full browser-based editor. 
The render API is free and requires no authentication.

https://skissify.com
```

---

## Interview Talking Points

1. **The origin story** — "I was building AI workflows and wanted them to output something visual. Every drawing tool assumed a human was at the keyboard. That gap felt solvable."

2. **The API-first decision** — "Almost every design tool is UI-first with an API as an afterthought. Skissify is API-first with a UI as a bonus. That's a fundamentally different product."

3. **Why hand-drawn?** — "Rough sketches invite discussion. Polished designs invite critique. When an AI generates something that looks like a quick sketch, it signals 'this is a draft.' That's usually the right signal."

4. **The AI agent use case** — "The thing I'm most excited about is watching Claude draw floor plans. You describe a house, the AI constructs the JSON, Skissify renders it. It looks like something you'd sketch on a napkin. That's magic."

5. **Competition** — "Excalidraw is excellent for humans whiteboarding together. We're doing something different — AI agents as first-class citizens. Both have their place."

6. **The free tier** — "The render API is completely free, no login, no rate limits. I want zero friction to try. The product should sell itself."

---

## Contact

**Press inquiries:** press@skissify.com *(or via the website contact form)*  
**Twitter/X:** @skissify  
**Website:** https://skissify.com  
**For-agents docs:** https://skissify.com/for-agents

---

## Legal

Skissify is a product of Conzeon AB, Stockholm, Sweden.  
The hand-drawn rendering engine is proprietary.  
Sketch data stored on-platform is owned by the user.
