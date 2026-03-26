# Skissify Press Kit

**Last Updated:** March 27, 2026  
**Version:** 1.0  
**Contact:** [add founder email]

---

## One-Liner

> **Skissify turns JSON into hand-drawn sketches — and AI agents can use it natively via MCP.**

---

## Short Description (100 words)

Skissify is a web tool that renders JSON into hand-drawn-style sketches — floor plans, architecture diagrams, wireframes, and more. Unlike traditional drawing tools, Skissify is designed for programmatic input: paste JSON or let an AI agent generate it. With native MCP (Model Context Protocol) support, AI assistants like Claude can create and render sketches autonomously. The rendering engine uses multi-harmonic wobble algorithms to produce authentic hand-drawn aesthetics, with tunable parameters for amplitude, frequency, and humanness. Free tier available. Pro at €5/month.

---

## Boilerplate (250 words — for press)

Skissify is a sketch generation tool built for the age of AI agents. Where traditional design tools like Excalidraw and Figma require human hands to draw, Skissify accepts JSON as its primary input — making it the first sketch tool that AI agents can operate natively.

The product addresses a clear gap: AI language models can reason about space, layout, and design, but had no way to output visual artifacts. Skissify provides that bridge. By combining a JSON-first API with an MCP server compatible with Claude, GPT, and other AI systems, Skissify lets AI agents design and render floor plans, system diagrams, wireframes, and architecture drawings without human intermediaries.

Under the hood, Skissify's rendering engine uses multi-harmonic wobble algorithms — not the simple sine-wave offsets common in other tools. Three axes of control (amplitude, wave frequency, humanness) let users tune output from clean technical drawings to authentic napkin sketches. The engine supports 14 element types, including architectural specifics: hinged and sliding doors, windows, staircases, dimension lines, and structural columns.

Skissify launched in March 2026 as a web application with a free tier for public sketches and a Pro tier at €5/month for private sketches and API access. It is built on Next.js 15, TypeScript, and Canvas 2D, with a Prisma/SQLite backend and Docker support for self-hosted deployments.

Website: skissify.com  
MCP Server: Available via npm  
Built by: [Founder name], [location]

---

## Founder Bio

**[Founder name]**  
[Title] at Skissify  
[City, Country]

[Founder name] is a [developer/designer/entrepreneur] who [brief background]. Skissify was born from a desire to give AI agents visual output capabilities — bridging the gap between AI reasoning and visual communication.

*[Add 2-3 sentences of personal background, previous projects, or relevant expertise.]*

Twitter/X: [@handle]  
LinkedIn: [URL]  
GitHub: [@handle]

---

## Product Screenshots

The following screenshots should be prepared for press use. Export at 2x resolution.

### Required Screenshots

| # | Description | Suggested Filename |
|---|-------------|-------------------|
| 1 | Editor view — cream paper, floor plan loaded | `skissify-editor-floorplan.png` |
| 2 | Blueprint paper — white lines on blue | `skissify-blueprint.png` |
| 3 | Four paper types side-by-side (same sketch) | `skissify-paper-types.png` |
| 4 | All 14 element types rendered | `skissify-element-types.png` |
| 5 | Claude Desktop / MCP integration in action | `skissify-mcp-claude.png` |
| 6 | Share link — public view of a sketch | `skissify-share-view.png` |
| 7 | Pricing page | `skissify-pricing.png` |
| 8 | Mobile view (read-only) | `skissify-mobile.png` |

### Hero Image (OG)

- **File:** `skissify-og-hero.png`
- **Size:** 1200×630px
- **Content:** Split view — JSON on left, rendered floor plan on right
- **Tagline overlay:** "JSON in. Hand-drawn out."

### Product Hunt Gallery

- **Image 1:** Hero / split view
- **Image 2:** Paper types comparison (4-panel)
- **Image 3:** MCP + Claude integration
- **Image 4:** Element type showcase
- **Image 5:** Sharing flow

### Demo GIFs

| # | Duration | Content |
|---|----------|---------|
| 1 | 15-30s | JSON paste → sketch renders instantly |
| 2 | 30-45s | Claude MCP: "draw a floor plan" → sketch appears |
| 3 | 20s | Wobble slider adjustment — clean to messy |
| 4 | 20s | Paper type switching — cream/white/grid/blueprint |

---

## Key Stats & Numbers

*(Fill in at launch, update weekly)*

| Metric | Value |
|--------|-------|
| Launch date | March 27, 2026 |
| Pricing | Free + Pro €5/mo |
| Element types | 14 |
| Paper styles | 4 (cream, white, grid, blueprint) |
| MCP compatible | Claude, Claude Desktop + |
| Rendering | Canvas 2D, browser-native |
| Self-hostable | Yes (Docker) |
| Open source | MCP server + core renderer (planned) |

---

## Unique Selling Points (for press angles)

1. **First sketch tool with MCP support** — AI agents can create diagrams natively
2. **JSON-first architecture** — programmatic input, not drag-and-drop
3. **Multi-harmonic wobble** — genuinely authentic hand-drawn rendering
4. **Architecture-specific elements** — 14 types including doors, windows, stairs, dimensions
5. **Indie-built, transparent** — build-in-public approach, founder available for comment
6. **€5/month Pro** — dramatically cheaper than Figma, Miro, tldraw commercial licenses

---

## Press Angles

### Technical Angle
"The rendering engine that makes AI-generated floor plans look human-drawn"  
Focus: multi-harmonic wobble algorithm, Canvas 2D implementation, MCP architecture

### AI/Agents Angle  
"Finally, AI agents can draw — not just describe"  
Focus: MCP integration, natural language → visual output, Claude use cases

### Indie SaaS Angle
"Solo developer launches sketch tool for €5/month in the age of enterprise SaaS bloat"  
Focus: pricing philosophy, build-in-public, founder story

### Design Tools Angle
"Why this developer skipped Figma and built JSON sketches instead"  
Focus: Figma vs sketch philosophy, low-fidelity prototyping, AI design workflow

---

## Frequently Asked Questions (for press)

**Q: How is Skissify different from Excalidraw?**  
A: Excalidraw is a human-driven drawing tool. Skissify is a rendering tool — the input is JSON, not a mouse. This makes it ideal for programmatic generation and AI agent use, while Excalidraw excels at real-time human collaboration.

**Q: What is MCP?**  
A: Model Context Protocol is an open standard from Anthropic that lets AI agents connect to external tools and APIs. Skissify's MCP server allows AI assistants like Claude to create and render sketches programmatically.

**Q: Is Skissify open source?**  
A: The MCP server and core rendering engine are planned for open-source release. The web application is proprietary with a free tier.

**Q: Who is the target user?**  
A: Primarily developers and AI enthusiasts who want visual output from AI agents, plus architects, designers, and anyone who uses floor plans or quick diagrams in their workflow.

**Q: What does "hand-drawn" mean technically?**  
A: Skissify's wobble engine applies multi-harmonic distortion to each line — not a simple sine wave. The result is a realistic simulation of hand tremor, with seeded randomness ensuring each element has a unique tremor pattern.

---

## Usage Rights

All Skissify screenshots, demo GIFs, and brand assets provided in this press kit are licensed for editorial use in coverage of Skissify. Please credit "Skissify / skissify.com" when publishing.

For high-resolution assets, custom screenshots, or founder interviews:  
**Contact:** [email address]

---

*Press kit version 1.0 — March 27, 2026*
