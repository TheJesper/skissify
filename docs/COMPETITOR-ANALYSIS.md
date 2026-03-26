# Skissify Competitive Analysis (March 2026)

## Executive Summary

The sketch/diagram market in 2026 is fragmenting into three lanes: (1) open-source sketch tools (Excalidraw, tldraw, draw.io), (2) enterprise collaboration platforms (Miro, Figma, Whimsical), and (3) AI-first diagram generators (Eraser/DiagramGPT, Napkin AI, dAIgram). Every major player is racing to add MCP servers and AI generation. **Skissify's unique position -- JSON-native, hand-drawn aesthetic, floor-plan DNA, and MCP-first architecture -- is currently unoccupied by any competitor.**

---

## Competitor Matrix

| Tool | GitHub Stars | Pricing | AI Features | MCP Server | Open Source | Hand-drawn Style |
|------|-------------|---------|-------------|------------|-------------|------------------|
| **Excalidraw** | ~120k | Free (Plus: paid) | Limited (via MCP) | Yes (official) | Yes | Yes |
| **tldraw** | ~46k | SDK: $6k/yr | AI agents via SDK | No official | Source-available | Yes |
| **draw.io** | ~55k (est) | Free | AI diagram gen (2026) | Yes (official, by JGraph) | Yes | No (technical) |
| **Miro** | N/A (SaaS) | $0-$20/user/mo | AI Workflows, Sidekicks | No | No | No |
| **Figma** | N/A (SaaS) | $0-$75/editor/mo | Make, Code-to-Canvas, MCP | Yes (official) | No | No |
| **Whimsical** | N/A (SaaS) | $0-$20/user/mo | Claude-powered mind maps | Yes (official + community) | No | Semi |
| **Mermaid.js** | ~76k | Free | N/A (text-to-diagram) | Via wrappers | Yes | No |
| **Eraser** | N/A (SaaS) | Free-Enterprise | DiagramGPT (5 types) | No | No | No |
| **Napkin AI** | N/A (SaaS) | Freemium | Text-to-visual | No | No | Semi |
| **dAIgram** | N/A (SaaS) | Free | Photo-to-diagram (OCR) | No | No | No |

---

## Detailed Competitor Profiles

### 1. Excalidraw
- **URL**: https://excalidraw.com | [GitHub](https://github.com/excalidraw/excalidraw)
- **Stars**: ~119,575
- **Core features**: Infinite canvas, hand-drawn aesthetic, real-time collaboration, libraries, VS Code extension, end-to-end encryption
- **AI/MCP**: Official MCP server (excalidraw-mcp) -- streams hand-drawn diagrams, viewport camera control, fullscreen editing. Community MCP with 26 tools including `describe_scene`, `get_canvas_screenshot`, design guidance
- **Pricing**: Free open-source. Excalidraw+ (paid) adds collaboration rooms, shared libraries, cloud storage
- **Weaknesses**:
  - No REST API for Excalidraw+ (issue #10946 open)
  - Limited templates and shared library ecosystem
  - "Infinite canvas chaos" -- no structure for large projects
  - No standardized UI components or reusable design systems
  - No floor plan or measurement capabilities
  - Handwriting line-smoothing can corrupt stylus input
  - Free version: 1 scene, no granular access control
  - Lost work in collaboration mode (no auto-save reliability)
- **User complaints (Reddit/G2)**: "Once you move from rough sketches to real product flows, it feels limiting"; lacking tables; no clickable prototypes

### 2. tldraw
- **URL**: https://tldraw.dev | [GitHub](https://github.com/tldraw/tldraw)
- **Stars**: ~46,000
- **Core features**: Infinite canvas SDK for React, pressure-sensitive drawing, rich text, arrows, snapping, multiplayer via Cloudflare Durable Objects, custom shapes/tools/bindings
- **AI/MCP**: AI agents can read/modify canvas. "tldraw computer" concept. No official MCP server
- **Pricing**: $500/mo ($6k/yr) commercial license. 100-day free trial. Hobby license available
- **Weaknesses**:
  - Expensive -- $6k/yr alienates startups and indie devs
  - SDK only, not a standalone product for end users
  - 100-day trial too short for product-market fit
  - Multi-page and link-sharing now require accounts
  - Community backlash over licensing changes (SDK 4.0)
  - No floor plan or measurement capabilities
- **User complaints (HN/Reddit)**: Pricing debate dominated -- "excessive for target market"; developers exploring Excalidraw alternatives

### 3. Miro
- **URL**: https://miro.com
- **Core features**: Infinite whiteboard, 300+ templates, sticky notes, voting, timer, video chat, integrations (Jira, Slack, etc.)
- **AI features (2026)**: AI Workflows with "Sidekicks" (specialized AI collaborators), "Flows" (visual AI workflows), 100 AI credits/mo on Business plan
- **MCP**: No official MCP server
- **Pricing**: Free / Starter $8/mo / Business $20/mo / Enterprise (custom)
- **Weaknesses**:
  - Heavy and slow with large boards (PDFs, images cause lag)
  - Expensive for small teams -- viewers auto-billed at $20/mo
  - Predatory subscription practices (auto-upgrade complaints on Trustpilot)
  - No hand-drawn aesthetic
  - Overkill for simple sketching
  - No floor plan or technical drawing support
  - AI credits are limited and paid add-on
- **User complaints**: "Awful subscription policies that feel like a scam"; viewers added to billing without consent; crashes and unreliable saving

### 4. Figma
- **URL**: https://figma.com
- **Core features**: Full UI design tool, prototyping, design systems, Dev Mode, variables, auto layout
- **AI features (2026)**: First Draft (prompt-to-design), Vectorize (raster-to-vector), Code to Canvas (Claude Code integration), Figma Make (prompt-to-code prototypes), MCP server for coding agents
- **MCP**: Yes -- official Figma MCP server. Agents read libraries, write to files, use existing components/variables/tokens
- **Pricing**: Free / Professional $15/editor/mo / Organization $45/editor/mo / Enterprise $75/editor/mo
- **Weaknesses**:
  - Not a sketching tool -- too polished/complex for quick diagrams
  - Expensive for non-designers
  - No hand-drawn aesthetic
  - No floor plan or measurement capabilities
  - AI credits are subscription-based
  - Massive learning curve
- **Relevance to Skissify**: Low direct competition but Figma MCP sets the standard for AI agent integration

### 5. Mermaid.js
- **URL**: https://mermaid.js.org | [GitHub](https://github.com/mermaid-js/mermaid)
- **Stars**: ~76,000 (est)
- **Core features**: Text-to-diagram, 15+ diagram types, native in GitHub/GitLab/Notion/Obsidian, AI-friendly (ChatGPT/Claude generate Mermaid from English)
- **AI/MCP**: No official MCP. Used as intermediate format by many MCP servers (Whimsical, ToDiagram)
- **Pricing**: Free, open source
- **Weaknesses**:
  - No visual editing -- code only
  - Layout control nearly impossible ("WYSIWYG where results are unpredictable")
  - Limited shape/relationship customization
  - No hand-drawn aesthetic
  - No interactivity beyond links
  - Platform inconsistencies (GitHub doesn't support all features)
  - Emoji/special character support is fragile
- **Relevance to Skissify**: Mermaid is the de facto "diagrams as code" standard. Skissify's JSON manifest is a superset concept -- could import/export Mermaid

### 6. draw.io (diagrams.net)
- **URL**: https://drawio.com | [GitHub](https://github.com/jgraph/drawio)
- **Core features**: 100+ diagram types including floor plans, massive shape libraries, offline desktop app, storage (Google Drive, OneDrive, GitHub, Dropbox), Confluence/Jira integration, data-driven diagrams
- **AI features (2026)**: New "Generate" tool with multiple AI generators for interface mockups, infra diagrams, Mermaid support
- **MCP**: Yes -- official JGraph MCP server (jgraph/drawio-mcp). Create, read, update, delete diagram elements
- **Pricing**: Free and open source. Atlassian Marketplace plans for Confluence/Jira
- **Weaknesses**:
  - UI is dated and complex
  - No hand-drawn aesthetic (purely technical)
  - Collaboration requires Google Drive/OneDrive
  - No native AI generation (added 2026, still basic)
  - XML-based format, not JSON-native
  - Desktop app feels heavy
- **Relevance to Skissify**: draw.io covers floor plans but with zero charm. Skissify's hand-drawn aesthetic is the antithesis

### 7. Whimsical
- **URL**: https://whimsical.com
- **Core features**: Flowcharts, wireframes, mind maps, sticky notes, docs with AI writing
- **AI features**: Claude-powered mind map generation, AI flowchart generation from prompts, AI writing assistant in docs
- **MCP**: Yes -- official desktop MCP server (March 2026). Reads/writes Whimsical workspace. Community MCP via Mermaid markup. Returns live URLs + base64 previews
- **Pricing**: Free (100 AI actions) / Pro $10/user/mo / Organization $20/user/mo
- **Weaknesses**:
  - Limited diagram types (no ER, no sequence, no architecture)
  - No floor plan or measurement support
  - Semi hand-drawn but not configurable
  - Limited export options
  - No embeddable SDK
  - Closed ecosystem
- **User feedback**: Clean and simple but too limited for complex technical work

### 8. Eraser (DiagramGPT)
- **URL**: https://eraser.io
- **Core features**: AI-first technical design, diagram-as-code, docs alongside diagrams, multiplayer
- **AI features**: DiagramGPT generates 5 diagram types from text. Eraserbot auto-updates codebase diagrams. Diagramming API
- **MCP**: No official MCP server
- **Pricing**: Free (5 files, 20 AI gens) / Starter (unlimited, 40 AI/mo) / Business (250 AI/mo, SSO) / Enterprise
- **Weaknesses**:
  - Only 5 diagram types
  - No hand-drawn aesthetic
  - No floor plan support
  - AI generations are credit-limited on free/starter
  - No embeddable component
- **Relevance to Skissify**: DiagramGPT proves demand for AI diagram generation. Skissify can do this with better aesthetics

### 9. Napkin AI
- **URL**: https://napkin.ai
- **Core features**: Text-to-visual conversion, auto-generated infographics, diagrams, charts, mind maps
- **Weaknesses**: Primarily for business storytelling, not technical. No MCP. No floor plans. Limited editing

### 10. dAIgram
- **URL**: https://daigram.app
- **Core features**: Photo/screenshot to editable diagram via OCR/AI. Export to JPG, PNG, PDF, JSON
- **Weaknesses**: Only simple flowcharts currently. No hand-drawn output. Limited diagram types. Early stage

---

## MCP Ecosystem Summary (March 2026)

| Tool | MCP Status | Key Capabilities |
|------|-----------|-----------------|
| **Excalidraw** | Official + community (26 tools) | Create/edit/export, screenshot feedback loop, design guidance, shareable URLs |
| **draw.io** | Official (JGraph) | CRUD diagram elements, AI generation |
| **Figma** | Official | Read libraries, write files, use components/variables |
| **Whimsical** | Official (desktop) + community | Read/write workspace, Mermaid markup, base64 previews |
| **Sketch (app)** | Official | Read/modify Sketch documents |
| **AWS Diagrams** | AWS Labs | Generate AWS/sequence/flow/class diagrams |
| **ToDiagram** | Official | JSON/YAML/XML/CSV to interactive diagrams |
| **Skissify** | **Planned** | **JSON manifest in, hand-drawn sketch out** |

**Gap Skissify can fill**: No MCP server produces hand-drawn/sketch-style output with measurement accuracy. Every existing MCP outputs clean/technical diagrams.

---

## Feature Requirements for Skissify

### Must-Have for Launch (Table Stakes in 2026)

| # | Feature | Who Has It | Priority |
|---|---------|-----------|----------|
| 1 | Undo/redo | Everyone | Critical |
| 2 | Drag-to-move elements | Everyone | Critical |
| 3 | Resize handles | Everyone | Critical |
| 4 | Copy/paste elements | Everyone | Critical |
| 5 | PNG/SVG export | Everyone | Critical |
| 6 | JSON import/export | Excalidraw, dAIgram | Critical |
| 7 | Keyboard shortcuts | Everyone | Critical |
| 8 | Save/load (local + cloud) | Everyone | Critical |
| 9 | Share link (read-only) | Excalidraw+, Miro, Whimsical | High |
| 10 | Basic templates | Everyone | High |
| 11 | Real-time collaboration | Excalidraw, Miro, Figma, tldraw | Medium |
| 12 | Responsive/mobile layout | Miro, Figma | Medium |
| 13 | Dark/light theme | Excalidraw, Figma | Done |
| 14 | Element grouping | Excalidraw, draw.io, Figma | High |
| 15 | Grid snapping | Everyone | High |
| 16 | Text labels on elements | Everyone | Done |
| 17 | Layers | draw.io, Figma | Medium |

### Differentiators (What Nobody Else Has)

#### Tier 1: Already Built or Planned (Unique to Skissify)

| # | Feature | Status | Why It's Unique |
|---|---------|--------|----------------|
| 1 | **JSON-first manifest** | Built | No other tool uses a clean JSON schema as SSOT. Excalidraw's JSON is internal format, not designed for external authoring |
| 2 | **MCP-native server** | Planned | First sketch tool where AI agents produce hand-drawn output. Excalidraw MCP exists but Skissify's JSON manifest is simpler for agents to generate |
| 3 | **Wobble/humanness controls** | Built | Amplitude, waves, humanness sliders. No competitor offers tunable sketch aesthetics |
| 4 | **Paper types** (cream, yellow grid, blueprint) | Built | Nobody else does paper simulation |
| 5 | **Tool types** (pencil, ballpoint, ink) | Built | Nobody else simulates drawing instruments |
| 6 | **Floor plan DNA** (walls, doors, windows, stairs, columns) | Built | Excalidraw/tldraw have zero architectural elements. draw.io has generic shapes but no hand-drawn floor plans |
| 7 | **Dimension lines with measurements** | Built | Only draw.io has this, and not in hand-drawn style |

#### Tier 2: High-Impact Differentiators to Build

| # | Feature | Effort | Impact | Description |
|---|---------|--------|--------|-------------|
| 1 | **AI text-to-manifest** | Medium | 10x | "Draw a 3-bedroom apartment, 85 sqm, L-shaped kitchen" -> JSON manifest -> hand-drawn sketch. No competitor does text-to-floor-plan in sketch style |
| 2 | **Photo-to-manifest** (Claude Vision) | Medium | 10x | Take photo of whiteboard/napkin sketch -> JSON manifest -> clean Skissify rendering. dAIgram does OCR-to-flowchart; nobody does photo-to-floor-plan |
| 3 | **Measurement/scale accuracy mode** | Medium | High | Toggle between "artistic sketch" and "to-scale technical" mode. Unique: hand-drawn aesthetic WITH dimensional accuracy |
| 4 | **Sketch-to-code export** | Medium | High | Floor plan -> React component with room divs. Architecture diagram -> Mermaid/PlantUML code. Nobody does sketch-to-code for floor plans |
| 5 | **Embed in docs/blogs** | Low | High | `<iframe>` or `<script>` embed with live JSON. Like CodePen but for sketches. Whimsical has basic embed; nobody has embeddable hand-drawn sketches |
| 6 | **Version history / diff view** | Medium | High | Visual diff between manifest versions. Show what changed in red/green overlay. No competitor does visual sketch diffing |
| 7 | **Template marketplace** | Medium | Medium | User-contributed JSON manifests: apartment layouts, office spaces, network diagrams. Excalidraw has libraries but they're shape packs, not full templates |
| 8 | **Multi-rendering mode** | Low | High | Same JSON manifest rendered as: napkin sketch, technical plan, blueprint, watercolor. Toggle rendering without changing data. Nobody else separates data from rendering style |
| 9 | **Voice-to-sketch** | High | Wow | "The living room is 5 by 4 meters, door on the north wall" -> live sketch update. Zero competitors have this |
| 10 | **AI agent as design collaborator** | High | Wow | AI reviews your floor plan: "The kitchen has no natural light -- consider moving it to the east wall." Active design critique, not just generation |

### Moonshot Features (Future Roadmap)

| # | Feature | Potential | Description |
|---|---------|-----------|-------------|
| 1 | **3D extrusion view** (Three.js) | Billion-dollar | Same JSON manifest -> 2D sketch AND 3D walkthrough. No tool goes from sketch to 3D. Competes with SketchUp at 1/100th the complexity |
| 2 | **IFC/BIM import** | Industry disruption | Import architectural IFC files -> hand-drawn sketch per floor. Architects get beautiful presentation sketches from technical models |
| 3 | **DXF/AutoCAD export** | Revenue unlock | Export to DXF for building permits. Only tool that goes from napkin sketch to permit-ready drawing |
| 4 | **Real-time collaboration with AI participant** | Category creation | AI agent joins your sketch session, suggests improvements in real-time, auto-labels rooms, calculates areas. Like pair-programming but for floor plans |
| 5 | **Electrical/plumbing/HVAC layers** | B2B | Specialized layers for MEP (Mechanical, Electrical, Plumbing). Toggle visibility. Small architecture firms would pay premium |
| 6 | **AR measurement input** | Mobile | Point phone at room -> LiDAR measures walls -> JSON manifest -> sketch. Apple LiDAR + Skissify = instant floor plan from physical space |
| 7 | **Multi-floor / site plans** | Enterprise | Link multiple floor plans into a building. Site plan view. Navigation between floors |
| 8 | **Cost estimation integration** | Revenue | Connect room dimensions to material cost databases. "This renovation will cost approximately $45,000" overlaid on sketch |
| 9 | **Regulatory compliance check** | B2B | AI checks floor plan against building codes (door widths, egress paths, accessibility). "This corridor is too narrow for ADA compliance" |
| 10 | **White-label SDK** | Platform | Embeddable Skissify component for real estate platforms, interior design apps, renovation marketplaces. Charge per-API-call like tldraw charges per-seat |

---

## Strategic Positioning

### Where Skissify Wins

```
                    Hand-drawn Aesthetic
                         ^
                         |
            Skissify ----+---- (nobody here)
                         |
     Excalidraw ---------+
                         |
     Whimsical ----------+
                         |
  ───────────────────────+──────────────────> Floor Plan / Architecture
                         |
     Miro ---------------+
                         |
     draw.io ------------+---- (technical but ugly)
                         |
     Figma --------------+
                         |
                    Technical/Polished
```

**Skissify occupies the upper-right quadrant**: hand-drawn aesthetic + floor plan capability. No competitor is here.

### Competitive Moats

1. **JSON manifest format** -- once adopted by MCP agents, switching costs are high
2. **Rendering engine** -- multi-harmonic wobble algorithms are non-trivial to replicate
3. **Floor plan vocabulary** -- 14 element types purpose-built for architecture (walls, doors, windows, stairs, columns, dimensions)
4. **Paper/tool simulation** -- aesthetic dimension no competitor invests in
5. **MCP-first** -- if Skissify becomes the default sketch MCP, agents will generate Skissify manifests by default

### Go-to-Market Priority

| Phase | Focus | Timeline |
|-------|-------|----------|
| **Phase 1: Developer tool** | MCP server, API, JSON manifest docs, embeddable | Now |
| **Phase 2: Consumer product** | Templates, save/load, sharing, auth | Q2 2026 |
| **Phase 3: AI-first** | Text-to-manifest, photo-to-manifest, voice input | Q3 2026 |
| **Phase 4: Pro/B2B** | Scale mode, DXF export, collaboration, layers | Q4 2026 |
| **Phase 5: Platform** | Template marketplace, white-label SDK, 3D view | 2027 |

---

## Key Takeaways

1. **The MCP race is on** -- Excalidraw, draw.io, Figma, and Whimsical all shipped MCP servers in early 2026. Skissify must ship its MCP server immediately to claim the "hand-drawn sketch MCP" niche
2. **Nobody does hand-drawn floor plans** -- this is a genuine white space. draw.io does floor plans (ugly). Excalidraw does hand-drawn (no floor plans). Skissify does both
3. **JSON-first is the right bet** -- every MCP integration struggles with proprietary formats. Skissify's clean JSON manifest is exactly what AI agents want to generate
4. **AI text-to-floor-plan is the killer feature** -- "Draw me a 3-bedroom apartment" is the demo that goes viral. No competitor can do this today
5. **Pricing opportunity** -- Excalidraw is free, tldraw is $6k/yr, Miro is $20/user/mo. Skissify can offer a generous free tier (like Excalidraw) with API/export as the paid unlock (like Eraser)
6. **Photo-to-sketch is underserved** -- dAIgram does basic OCR-to-flowchart. Nobody does photo-to-floor-plan. Skissify + Claude Vision can own this
7. **The "rendering mode" toggle is unique and defensible** -- same data, different visual styles. This is a design philosophy no competitor shares

---

## Sources

- [Excalidraw GitHub](https://github.com/excalidraw/excalidraw) -- 119k+ stars
- [Excalidraw MCP](https://github.com/excalidraw/excalidraw-mcp)
- [Excalidraw+ Changelog](https://plus.excalidraw.com/changelog)
- [tldraw GitHub](https://github.com/tldraw/tldraw) -- 46k stars
- [tldraw Pricing](https://tldraw.dev/pricing) -- $500/mo commercial
- [tldraw SDK 4.0 Licensing Debate](https://biggo.com/news/202509190115_tldraw_SDK_4.0_Licensing_Debate)
- [Miro Pricing](https://miro.com/pricing/) -- Free to $20/user/mo
- [Miro Trustpilot Reviews](https://www.trustpilot.com/review/www.miro.com)
- [Figma AI](https://www.figma.com/ai/)
- [Figma x Anthropic (Claude Code)](https://www.cnbc.com/2026/02/17/figma-anthropic-ai-code-designs.html)
- [Mermaid.js](https://mermaid.js.org/) -- diagrams as code standard
- [draw.io](https://www.drawio.com/) -- free, open source
- [draw.io MCP](https://github.com/jgraph/drawio-mcp) -- official JGraph MCP
- [Whimsical MCP Release (March 2026)](https://whimsical.com/releases/2026-3-mcp-for-coding-agents)
- [Whimsical Pricing](https://whimsical.com/pricing) -- Free to $20/user/mo
- [Eraser / DiagramGPT](https://www.eraser.io/diagramgpt)
- [Eraser Pricing](https://www.eraser.io/pricing)
- [Napkin AI](https://www.napkin.ai/)
- [dAIgram](https://www.daigram.app/) -- photo-to-diagram
- [AWS Diagram MCP](https://awslabs.github.io/mcp/servers/aws-diagram-mcp-server)
- [ToDiagram MCP](https://todiagram.com/mcp)
- [Sketch MCP Server](https://www.sketch.com/docs/mcp-server/)
- [Excalidraw Alternatives (Balsamiq)](https://balsamiq.com/blog/excalidraw-alternatives/)
- [Best AI Diagram Tools 2026 (InfraSketch)](https://infrasketch.net/blog/best-ai-diagram-tools-2026)
- [Best AI Diagram Tools 2026 (DEV.to)](https://dev.to/dashin_pro/best-ai-diagramming-tools-for-developers-in-2026-3ni3)
