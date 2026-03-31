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

## Demo Video Script (60-second screen record)

```
0:00 - 0:05  Title card: "What if your AI agent could draw?"

0:05 - 0:15  Split screen: left = Claude conversation
             User types: "Sketch a studio apartment floor plan, roughly 6x5 meters"
             
0:15 - 0:30  Claude constructs JSON (visible in panel)
             Calls Skissify MCP tool
             
0:30 - 0:45  Floor plan renders: hand-drawn walls, furniture symbols,
             room labels. Wobbly, beautiful, immediately readable.
             
0:45 - 0:55  Cut to: the same API call from a terminal
             curl -X POST ... | opens in browser
             
0:55 - 1:00  End card: skissify.com  |  No signup. No auth. Just draw.
```

---

## GIF Script (10 seconds — for Product Hunt gallery)

```
Frame 1: Empty JSON editor  →  {"elements": [...floor plan JSON...]}
Frame 2: POST loading spinner
Frame 3: Hand-drawn floor plan appears (cream paper, ballpoint style)
Frame 4: "skissify.com" text fade in

Loop. No audio needed.
```

---

## Three Hooks for Different Audiences

**For developer audiences:**
> "It's a REST API that turns JSON into hand-drawn SVGs. No auth, no rate limits. POST a JSON object, get a sketch back. Your CI/CD pipeline can draw now."

**For AI/agent audiences:**
> "Skissify is the first diagram tool where AI agents are first-class citizens. Claude can draw floor plans natively via MCP. Any LLM can draw via the REST API."

**For design/architecture audiences:**
> "Rough sketches invite discussion. Polished mockups invite critique. Skissify generates rough — intentionally — because that's the right signal for early-stage design."

---

## Newsletter/Media Pitch Email

```
Subject: Product launch: the API that lets AI agents draw (April 1, not a joke)

Hi [name],

Quick pitch: Skissify launched today on Product Hunt.

It's a REST API that turns JSON into hand-drawn SVG sketches. The hook: 
AI agents can use it natively. Claude draws floor plans. Any LLM can 
generate visual output via POST request.

Why your readers might care:
- The free /api/render endpoint is instantly testable (no signup)
- The MCP server works with Claude Desktop in 2 minutes
- Hand-drawn output is an intentional choice, not a limitation
- 30+ architectural element types (walls, doors, windows, furniture)

URL: https://skissify.com
PH launch: [link]
For agents: https://skissify.com/for-agents
One-line demo: curl -X POST https://skissify.com/api/render -H "Content-Type: application/json" -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":150}]}'

Happy to send a screen recording of Claude drawing a floor plan if that 
makes the story easier to tell.

Jesper / Skissify
```

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

---

## Quick Stats (for journalist fact-boxes)

| | |
|---|---|
| **Element types** | 30+ (walls, doors, windows, stairs, furniture, dimensions, arrows, text) |
| **API endpoint** | `POST https://skissify.com/api/render` |
| **Auth required** | None (free tier) |
| **Output format** | SVG (scalable, embeddable, editable) |
| **Render time** | < 200ms average |
| **MCP install** | `npx skissify-mcp` |
| **Paper styles** | Cream, white, grid, blueprint |
| **Drawing styles** | Pencil, ballpoint, ink |
| **Wobble control** | 0 (clean) → 10 (very human) |
| **Launch date** | April 1, 2026 |
| **Price** | Free / Pro (from EUR 2/mo) |

---

## Awards / Recognition Targets

*Submit to these after launch day:*

1. **Product Hunt** — target: Top 5 Developer Tools of the Day
2. **Golden Kitty Awards** — category: AI Tools  
3. **Indie Hackers** — Featured milestone post
4. **TLDR Newsletter** — Submit via tldr.tech/tech
5. **The Batch (deeplearning.ai)** — Submit via their website
6. **Bytes.dev newsletter** — Relevant for developer tools

---

## Appendix: Frequently Misunderstood Points

**"Is the hand-drawn style a limitation?"**
No. It's an intentional design choice. Rough-looking output signals "this is a draft, let's discuss the idea." Psychology research shows rough sketches get better, more structural feedback than polished mockups. We chose wobble on purpose.

**"Can I use it without Claude?"**
Yes. The REST API works with any HTTP client — curl, Python, JavaScript, any language. Claude is one way to generate the JSON input, not the only way.

**"Is this just Excalidraw but with an API?"**
No. Excalidraw is for humans drawing together in real-time. Skissify is for AI agents and automated pipelines. The JSON schema, architectural elements (walls, doors, windows), and MCP integration are designed from scratch for programmatic generation — not a port or wrapper.

**"Does it work for non-floor-plan sketches?"**
Yes. Skissify renders any layout — wireframes, system architecture diagrams, org charts, infographics. Floor plans are the flagship use case because architectural elements are the hardest to find elsewhere.

---

## Live Coverage & Tagging Guide (Added Cycle 77)

*Who to tag and mention on launch day for amplification:*

### Twitter/X Accounts to Tag (contextually, not spammy)

- **@AnthropicAI** — if showing Claude + MCP integration
- **@ClaudeAI** — direct Claude use cases
- **@ProductHunt** — use in PH launch thread
- **@levelsio** — indie maker, BuildInPublic community leader, will reshare interesting tools
- **@marc_louvion** — indie hacker with large following, shares MCP/AI tools
- **@\_buildspace** — developer community, AI tools
- **@swyx** — AI engineer community, MCP-adjacent audience
- **@benparr** — follows AI tools launch news (Mashable/AI researcher)

### Hashtag Timing Strategy (April 1 specific)

**07:00-10:00 CET (launch window):**
`#ProductHunt #Skissify #BuildInPublic #AI #IndieHacker`

**10:00-14:00 CET (HN/Reddit window):**  
`#ShowHN #WebDev #DeveloperTools #APIFirst #MCP`

**14:00-20:00 CET (engagement window):**
`#AIAgents #LLM #HandDrawn #Architecture #VibeDrawing`

**April 1 specific:**
`#AprilFools` (only in the meta-joke post — "it's real, try it")

### PR Distribution (post-launch, Day 2-3)

Submit to these after PH results are in:
1. **TLDR Tech** — tldr.tech/submit (developer newsletter, ~750K readers)
2. **The Batch (DeepLearning.AI)** — deeplearning.ai/the-batch
3. **Bytes.dev** — bytes.dev/submit (JavaScript/web newsletter)
4. **Console.dev** — console.dev/submit (dev tools newsletter)
5. **Changelog** — changelog.com/news (open source + dev tools)
6. **AlternativeTo** — add Skissify as alternative to Excalidraw, Figma, Miro
7. **There's An AI For That** — theresanaiforthat.com/submit
8. **Toolify.ai** — toolify.ai (AI tool directory)
9. **MCP.so** — get listed in MCP server directory (critical for discovery)
