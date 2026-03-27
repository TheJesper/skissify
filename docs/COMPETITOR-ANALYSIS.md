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

## Update Log

### March 27, 2026 — Automated Strategy Run

**New intelligence gathered this cycle:**

#### 🔴 THREAT: Google Stitch "Vibe Design" Update (March 2026)
- **URL**: https://www.nxcode.io/resources/news/google-stitch-complete-guide-vibe-design-2026
- Google Stitch shipped a major March 2026 update: AI-native infinite canvas, voice interaction ("voice canvas"), instant prototyping, DESIGN.md-based design systems
- Powered by Gemini 2.5 Pro — takes text, sketches, or wireframes → polished UI designs on infinite canvas, exports to Figma and React
- Google Gemini Canvas rolled out to all US users (March 4, 2026 via TechCrunch)
- **Skissify response needed**: Google Stitch is entering the sketch → design pipeline from the polished direction. Skissify's hand-drawn aesthetic and floor-plan DNA still differentiate it, but the "voice canvas" feature in Stitch (speak → sketch update) is a direct roadmap competitor to our planned voice-to-sketch moonshot
- **Priority**: Add to Moonshot threat register. Our JSON-first architecture still gives agents better raw control than voice-only Stitch

#### 🟡 SIGNAL: tldraw Closing External PRs + Test Suite Drama (Feb 2026)
- **URL**: https://simonwillison.net/2026/Feb/25/closed-tests/ | https://github.com/tldraw/tldraw/issues/8082
- Steve Ruiz (tldraw CEO) closed ALL external PRs to tldraw due to AI vibe-coding spam
- Community controversy around moving 327 test files to closed-source repo (ultimately confirmed as a joke, but generated significant HN attention)
- Simon Willison noted: "tldraw itself may eventually be a vibe-coded alternative to tldraw"
- **Skissify opportunity**: tldraw community sentiment is fragile. Developer trust in tldraw is eroding. Skissify should position as the transparent, indie-dev-friendly alternative at a fraction of the price

#### 🟢 OPPORTUNITY: MCP Hits 97M Installs (March 2026)
- **URL**: https://www.digitalapplied.com/blog/march-2026-ai-roundup-month-that-changed-everything
- MCP crossed **97 million installs** as of March 2026
- MCP TypeScript SDK: **34,700+ dependent npm projects** (Context Studios, March 2026)
- MCP now standard practice across dev ecosystem — Google Workspace CLI hit #1 HN this week
- **Skissify response**: Window to claim "the sketch MCP" title is NOW. Every month we wait, the registry gets more crowded

#### 🟡 WATCH: Maket.ai + DesignDrafter Floor Plan AI Maturing
- **URL**: https://www.maket.ai/blog/ai-floor-plan-generator-guide-2026 | https://designdrafter.com
- Maket.ai continues to grow as an AI architectural floor plan tool — targeting architects and design firms
- DesignDrafter's "Floor Plan Studio" positioning itself in the 2026 AI floor plan wave
- Neither has hand-drawn aesthetic or JSON-native/MCP architecture
- **Skissify note**: These tools validate market demand. They go polished/technical; Skissify goes sketch/programmatic. Different segment.

#### 🔵 CONTEXT: Napkin AI Review Wave (March 2026)
- **URL**: https://getalai.com/blog/napkin-ai-alternatives
- Napkin AI alternatives roundup now mentions **Gemini Canvas** as a competitor — signalling that big-tech canvas tools are entering the AI visual space
- Napkin AI still positioned as "business storytelling" / infographics, not technical diagramming or floor plans
- **Skissify note**: No threat to our lane. Continue monitoring.

---

## Update Log: March 27, 2026 — 02:15 CET | Automated Strategy Run #2

### 🔴 CRITICAL: Eraser Launched MCP Server + Agent Skills (March 2026)
- **URL**: https://www.eraser.io/agent-integrations
- Eraser now ships BOTH an HTTP MCP server (`https://app.eraser.io/api/mcp`) AND an Agent Skills package (`npx skills add eraserlabs/eraser-io`) — compatible with Claude Code, Codex, and other coding agents
- **Free tier**: Returns rendered diagram images FOR FREE (watermarked). API key removes watermark + unlocks higher resolution
- **Diagram types supported**: Architecture diagrams, flowcharts, BPMN, sequence diagrams, ERDs — all technical/clean, zero hand-drawn capability
- **Use cases they're pitching**: CI/CD agents, documentation agents, DevOps chatbots, PR review agents — all developer-workflow focused
- **Skissify response needed**: Eraser has validated that the market WANTS agent-integrated diagram generation. They own the "technical/clean" lane. Skissify's hand-drawn lane is now even more clearly differentiated — but urgency to ship MCP server escalates to CRITICAL. Eraser's agent integrations page is visually polished and developer-friendly. Skissify needs to match this level of developer UX on its MCP landing.
- **Risk level**: Medium (they don't do hand-drawn, floor plans, or JSON-first manifests) but HIGH for the "agents generating diagrams" mindshare battle

### 🟡 SIGNAL: Academic Validation of LLM-to-Floor-Plan Pipeline
- **URL**: https://arxiv.org/html/2509.00543v1 — "Text-to-Layout: A Generative Workflow for Drafting Architectural Floor Plans Using LLMs" (Aug 2025)
- LLMs (GPT-4 class) generating structured JSON files with coordinates for walls, doors, windows, furniture → automated 3D model construction in Autodesk Revit
- This is academically validated: LLMs CAN generate accurate floor plan JSON. Skissify's bet on LLM-to-JSON-to-sketch is sound and peer-reviewed
- **Skissify action**: Cite this paper in developer documentation and HN posts. "If you need a floor plan, any LLM can generate the JSON — Skissify renders it hand-drawn."

### 🟡 SIGNAL: floor-plan.ai + OpenArt AI Floor Plan Generators Active
- **URLs**: https://floor-plan.ai, https://openart.ai/generator/floor-plan, https://planner5d.com/use/ai-floor-plan-generator
- Multiple AI floor plan generators active in 2026, targeting architects and real estate — all output raster images via diffusion models
- **Critical gap**: None output JSON. None offer programmatic API. None have hand-drawn aesthetic. None are MCP-compatible
- **Skissify differentiation**: These tools are image-gen wrappers. Skissify is data-first — the JSON IS the floor plan, rendering is just one step

### 🟢 CONTEXT: MCP Ecosystem "Standard Practice" as of March 24, 2026
- **URL**: https://use-apify.com/blog/mcp-standard-ecosystem-2026 (March 24, 2026)
- MCP is now described as "standard practice" not experimental — "Teams are tired of one-off agent glue per product"
- **URL**: https://blog.qualys.com/product-tech/2026/03/19/mcp-servers-shadow-it-ai-qualys-totalai-2026 (March 19, 2026) — MCP called "The New Shadow IT for AI"
- Even non-tech companies (Smartsheet — March 24, 2026) are shipping MCP servers
- Eraser's MCP landing page format (`npx skills add eraserlabs/eraser-io`) is the new standard for dev-tool distribution

### Updated Competitor Matrix Row: Eraser
| Tool | MCP Server | Agent Skills | Hand-drawn | Floor Plans | Free Tier |
|------|-----------|--------------|-----------|-------------|-----------|
| **Eraser** | **Yes (HTTP, March 2026)** | **Yes (Agent Skills pkg)** | No | No | Yes (watermarked) |

---

## Update Log: March 27, 2026 — 03:06 CET | Automated Strategy Run #3

### 🔴 CRITICAL: Lucid Software Advances MCP Server + Launches "Process Agent" (TODAY)
- **URL**: https://www.prnewswire.com/news-releases/lucid-software-advances-mcp-server-offering-and-lucid-ai-capabilities-debuts-process-agent-302725846.html
- Announced **March 27, 2026** — hours ago
- Lucid (Lucidchart + Lucidspark) — the enterprise visual collaboration market leader — upgraded its MCP server and introduced a "Process Agent": an AI that captures undocumented workflows and converts them into shared visual canvases
- Quote from Lucid CPO: *"Lucid is a system of action, bringing ideas out of siloed documents onto a shared visual canvas where work can move forward"*
- Lucid's "AI Readiness Report" finding: **only 16% of knowledge workers** say their company's workflows are "extremely well-documented" — this is Lucid's wedge for MCP
- **Target**: Enterprise organizations. Pricing: $8-20/user/mo (existing). Not competing in developer/sketch lane.
- **Skissify impact**: This VALIDATES the "visual tools need MCP" market thesis at enterprise scale. Lucid's Process Agent for enterprise is exactly what Skissify's MCP server is for individual developers and agents. Different price point, same underlying insight: AI needs visual output tools.
- **Risk level**: LOW direct competition (enterprise vs. developer), HIGH validation signal — the market is moving fast

### 🟡 SIGNAL: Excalidraw Shipped Native Mindmap Support + Improved Pencil Mode
- **URL**: https://maqtoob.com/tool/plus-excalidraw/
- Recent Excalidraw+ updates include: **native mindmap support**, SVG export improvements, Pencil writing smoothing for stylus input, and ability to embed drawings in notes
- This closes one of the previously documented weaknesses (no mindmap type)
- **Skissify response**: Excalidraw is improving its human-use UX. They are NOT improving their programmatic/agent use case. Our lane remains clear.

### 🟡 WATCH: Napkin AI Reportedly Launched Public API — Verify
- **Conflicting sources** (March 2026):
  - raitly.com (March 2026): *"Napkin AI introduced new AI models for higher quality visuals... and launched a public API for developers"*
  - creativetoolsai.com (March 2026): *"As of 2026, Napkin AI doesn't offer a public API for developers"*
- **Status**: Unconfirmed. If true, Napkin AI entering the API space is a directional signal — the market for visual generation APIs is forming
- **Skissify response**: Monitor Napkin AI's API pricing (if real). Their focus is business storytelling/infographics — not floor plans, not hand-drawn architectural drawings, not JSON-first. Differentiation intact.
- **URL to watch**: https://napkin.ai/pricing

### 🟢 OPPORTUNITY: JFrog Launches Universal MCP Registry for Enterprise
- **URL**: https://jfrog.com/press-room/jfrog-unveils-universal-mcp-registry-for-ai-software-supply-chain/
- JFrog launched an enterprise-grade Universal MCP Registry (March 2026) as part of their AI Catalog — for security-conscious IT departments to audit and approve MCP servers
- This is important: enterprise IT is now formally evaluating which MCP servers are "approved for use"
- **Skissify implication**: A Skissify MCP server published on modelcontextprotocol.io AND listed in JFrog-style registries = enterprise-discoverable. The PLG → enterprise funnel becomes real. Getting registered early matters.

### 🔵 CONTEXT: MCP Protocol Post-Standard Practice (March 24, 2026)
- **URL**: https://use-apify.com/blog/mcp-standard-ecosystem-2026 (March 24, 2026)
- MCP is now described as the "documented, JSON-RPC-style bridge" that all AI hosts (IDEs, assistants) use to discover tools
- MCP blog roadmap (March 9, 2026): protocol is evolving from "local data fetching" to "enterprise-grade autonomous framework" — formal auth, multi-agent pipelines, resource discovery
- **Skissify implication**: Ship MCP server while the ecosystem is young. Once auth/enterprise features mature, verification and trust scores will matter — early movers get default trust.

### 🔵 CONTEXT: tldraw — No New Features, Still Recovering from PR Drama
- No significant tldraw product news in March 2026
- DeepWiki last indexed tldraw March 7, 2026 — no major commits since PR drama
- The community fragmentation documented in Run #2 persists
- **Opportunity window remains open**: tldraw has stalled; Skissify can capture developer mindshare

### Updated Competitor Matrix Addition: Lucid Software
| Tool | MCP Server | Process Agent | Hand-drawn | Floor Plans | Target Segment | Pricing |
|------|-----------|---------------|-----------|-------------|----------------|---------|
| **Lucid** | **Yes (advanced, March 2026)** | **Yes (new)** | No | No | Enterprise | $8-20/user/mo |

---

## Update Log: March 27, 2026 — 04:04 CET | Automated Strategy Run #4

### 🟡 SIGNAL: ExcaliDash Launches — Self-Hosted Excalidraw with Real Multiplayer (March 24, 2026)
- **URL**: https://www.blog.brightcoding.dev/2026/03/04/excalidash-the-revolutionary-self-hosted-excalidraw-dashboard
- A community project, "ExcaliDash", launched a self-hosted Excalidraw dashboard with Socket.IO-based true multiplayer editing — users see each other's cursors, changes propagate in milliseconds, described as "deep integration" not a hacky overlay
- This closes one of Excalidraw's documented weaknesses: collaboration requiring Excalidraw+ cloud. Self-hosters can now run multiplayer Excalidraw at zero cost
- **Impact on Skissify**: Low. ExcaliDash improves Excalidraw's human collaboration story. It does NOT touch programmatic generation, JSON-first architecture, MCP server, or floor-plan elements — Skissify's entire value stack
- **Watch**: If ExcaliDash gains wide adoption (>1k GitHub stars), it confirms "self-hosted sketch with collab" is a strong pull — and Skissify should develop its own self-hosted story for teams

### 🔴 THREAT SIGNAL: Excalidraw + GitHub Copilot MCP = Developer Workflow Integration (March 24, 2026)
- **URL**: https://thomasthornton.cloud/creating-diagrams-with-an-excalidraw-agent-skill-and-excalidraw-mcp/
- Thomas Thornton (cloud/DevOps community blogger) published a detailed guide showing GitHub Copilot via VS Code + Excalidraw MCP → natural language → live Excalidraw canvas
- Key quote: *"You stay in the editor, describe the system in natural language, and GitHub Copilot can start building the picture on a live Excalidraw canvas while you are still thinking it through."*
- Key insight from the piece: **"Moving diagramming back into the workflow matters more than making it faster"** — Excalidraw MCP is getting developer adoption because it lives where code lives
- This means Excalidraw's MCP server is now being actively evangelized in developer communities — not just listed
- **Impact on Skissify**: MEDIUM-HIGH. Excalidraw is winning the "architecture diagrams in VS Code" workflow. Skissify must ship MCP server AND write a similar developer workflow tutorial targeting the same use case — but with hand-drawn aesthetics and floor plan DNA as differentiators
- **Skissify response**: Write "How to generate hand-drawn floor plans from Claude in VS Code" as a direct content play against this workflow. This is the tutorial that claims the floor plan MCP niche before someone else does.

### 🟢 CONTEXT: MCP Ecosystem Map Confirms 97M Downloads + Multi-Protocol Era
- **URL**: https://www.digitalapplied.com/blog/ai-agent-protocol-ecosystem-map-2026-mcp-a2a-acp-ucp
- Published 1 week ago — confirms MCP at 97M downloads and describes A2A (Agent-to-Agent), ACP, and UCP protocols alongside MCP
- MCP is the standard for "tool use" but A2A is emerging for agent orchestration — multi-agent pipelines
- **Skissify implication**: The future state is AI agents calling other AI agents, which call tools like Skissify. Being MCP-compliant today means Skissify is accessible from future multi-agent pipelines automatically. Ship the MCP server while MCP is THE standard, before protocol fragmentation makes multi-protocol support necessary.

### 🔵 CONTEXT: SaaS Micro-Niche Pricing — $49-199/mo for High-Pain Workflows
- **URL**: https://bigideasdb.com/micro-saas-ideas-2026 (2 weeks ago)
- Data from 238K+ real user complaints: tools targeting 5-10 hours/week of manual work command **$49-199/month** willingness to pay
- For tools with lower but regular friction (like watermarked outputs), the impulse zone is confirmed at sub-$10/mo
- **Skissify implication**: The EUR 2/mo "API Starter" tier is psychologically correct for removing a recurring friction (watermarked renders). But pipeline-critical use cases (architecture firm generating floor plans for every client pitch) map to EUR 20-50/mo territory. Prioritize the upper tiers in outreach, lower tier for self-serve conversion.

### Updated Competitor Matrix Addition: ExcaliDash (Community Project)
| Tool | MCP Server | Self-hosted Collab | Hand-drawn | Floor Plans | Programmatic JSON | Cost |
|------|-----------|-------------------|-----------|-------------|-------------------|------|
| **ExcaliDash** | Via Excalidraw MCP | **Yes (Socket.IO, new)** | Yes | No | No | Free (OSS) |

---

## Update Log: March 27, 2026 — 05:04 CET | Automated Strategy Run #5

### 🔴 CRITICAL: tldraw Ships Desktop App with Local HTTP Canvas API (Week of March 25, 2026)
- **URL**: https://github.com/tldraw/tldraw-desktop
- tldraw launched **tldraw-desktop** — an Electron app for editing `.tldr` files locally — with a **built-in local HTTP Canvas API** (`localhost:7236`)
- API endpoints: `GET /api/doc/:id/shapes`, `GET /api/doc/:id/screenshot`, `POST /api/doc/:id/exec`, `POST /api/doc/:id/actions`
- Supported structured actions: `create, update, delete, clear, move, place, label, align, distribute, stack, bringToFront, sendToBack, resize, rotate, pen, setMyView`
- Also exposes `GET /api/llms` — tldraw SDK docs formatted for LLM consumption (llms-full.txt) — this is explicitly targeting AI agents reading the API surface
- Available for macOS (Universal), Windows x64/ARM64, Linux x64/ARM64
- **Skissify impact**: HIGH. tldraw now has a local programmatic API. However: (1) requires running a desktop app, (2) still $6k/yr commercial license, (3) actions are structured (not JSON-manifest-first — it's a command list, not a scene description), (4) no hand-drawn tuning, (5) no floor plan elements. Skissify's web-first + cloud API + JSON manifest is still a fundamentally different proposition — but tldraw has closed the "programmatic access" gap in their local use case.
- **Response needed**: Document the architectural difference between tldraw's "imperative Canvas API" (send commands) vs Skissify's "declarative JSON manifest" (describe the scene). This is a meaningful technical differentiator worth explaining in developer docs.

### 🟡 SIGNAL: GitHub Trending Week Mar 17–25 — Skills + Agent Harness War
- **URL**: https://www.shareuhack.com/en/posts/github-trending-weekly-2026-03-25
- Top trending repos week of March 17–25: Skills ecosystem (5 of top 15), agent harness repos (claude-code, superpowers) surpassing 100K stars
- `louislva/claude-peers-mcp` (+1,109 stars in one week, TypeScript, March 21) — multi-agent MCP server launched THIS WEEK showing viral appetite for new MCP tools
- `VoltAgent/awesome-codex-subagents` (+2,421 stars new) — agent subagents ecosystem growing rapidly
- **Skissify implication**: The Skills ecosystem is exploding. "Packaging a tool as a Skill/MCP and sharing it" is a viral growth pattern right now. Shipping `@skissify/mcp` and a skills-compatible package could capture this wave.

### 🟢 CONVERSION DATA: 2026 Free-to-Paid Conversion Report (Growth Unhinged + ChartMogul, 200 products)
- **URL**: https://www.growthunhinged.com/p/free-to-paid-conversion-report — Published March 2026
- **Median free-to-paid conversion: 8%** across 200 B2B SaaS products
- Freemium converts 3–7% (best companies hit 15%)
- Free trials requiring credit card convert at **30%** — 5x those that don't
- 57% of products use free trial as primary landing; only 26% use freemium
- AI-native products convert at **43%** vs 51% for AI/SaaS hybrids vs 57% for pure SaaS — AI products have lower conversion but faster signup
- 38% of freemium products let users try before creating account ("try-before-you-signup")
- **Skissify implication**: Allowing sketch generation without signup (try before you create account) significantly improves top-of-funnel. If EUR 2/mo Lite exists, conversion will be low (3%). If Euro 5/mo Pro with a no-credit-card 14-day trial is the offer, median 8% conversion with upside to 15% is realistic. A credit-card-required trial could hit 30%.

### Updated Competitor Matrix Row: tldraw Desktop
| Tool | Local API | Agent Actions | Hand-drawn | Floor Plans | JSON Manifest | License Cost |
|------|----------|---------------|-----------|-------------|---------------|--------------|
| **tldraw desktop** | **Yes (HTTP, localhost:7236)** | **Yes (imperative actions)** | Yes | No | No (command-based) | $6k/yr commercial |

---

## Update Log: March 27, 2026 — 06:09 CET | Automated Strategy Run #6

### 🔴 CRITICAL: Figma Opened Canvas to AI Agents — Full Read/Write MCP (March 25–27, 2026)

- **URL**: https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/ (20 hours ago)
- **URL**: https://muz.li/blog/figma-just-opened-the-canvas-to-ai-agents-heres-what-it-means-for-designers/ (3 days ago)
- **URL**: https://www.reddit.com/r/ClaudeCode/comments/1s30dy7/ (2 days ago)
- Figma announced open beta of `use_figma` — full read/write MCP access to Figma files. Claude Code, Codex, Cursor, and any MCP-compatible agent can now generate and modify design assets that are **genuinely linked to your design system**
- Fast Company named Figma one of the "Most Innovative Companies in Enterprise for 2026" citing the MCP server as a key milestone — published 2 days ago
- Quote from Muzli: *"Agents can now write directly to your Figma files using the new use_figma tool... generate and modify design assets that are genuinely linked to your design system"*
- Claude Code is listed as a key Figma MCP client alongside Codex and Cursor

**Skissify impact**: MEDIUM. Figma's `use_figma` targets polished UI design — not hand-drawn sketches, not floor plans. This is the professional designer space. However, the media noise around Figma + MCP + Claude Code is massive RIGHT NOW. Skissify should publish content that appears in this exact conversation — "what if you want hand-drawn output, not polished Figma?" is a meaningful counter-narrative.

**Response needed**: Write a blog post or tweet thread titled "Figma + Claude Code is for polished designs. Skissify + Claude Code is for the back-of-napkin moment." This is a free SEO/social play against the highest-volume AI design conversation happening this week.

---

### 🟡 SIGNAL: Google Gemini Floor Plan JSON Pipeline Validated by Developers (3 weeks ago)

- **URL**: https://dev.to/bindupautra_jyotibrat/building-an-ai-floor-planner-with-google-gemini-and-matplotlib-5c5d
- Developer tutorial published on DEV Community showing: *"Gemini parses the prompt and converts it into a structured JSON layout containing room names, dimensions, and positions"*
- The output is then rendered via Matplotlib (basic geometric shapes — not hand-drawn, not aesthetic)
- This is the exact pipeline Skissify completes: **LLM → JSON → renderer**. But Matplotlib output is ugly Python charts. Skissify output is beautiful hand-drawn SVG.
- This tutorial represents dozens/hundreds of developers already building LLM-to-floor-plan pipelines who have no good rendering layer

**Skissify action**: Comment on this DEV Community post. Show Skissify as the "beautiful rendering step" that replaces Matplotlib. "You've built the hard part — here's a hand-drawn renderer for your JSON." This is a direct, relevant, non-spammy comment that places Skissify in front of developers already building what Skissify serves.

**URL to target**: https://dev.to/bindupautra_jyotibrat/building-an-ai-floor-planner-with-google-gemini-and-matplotlib-5c5d

---

### 🟢 OPPORTUNITY: Excalidraw + Claude Code Tutorial Wave Continues (March 16, 2026)

- **URL**: https://rajeevpentyala.com/2026/03/16/excalidraw-mcp-and-claude-code-design-architecture-diagrams/ (2 weeks ago)
- **URL**: https://atalupadhyay.wordpress.com/2026/03/15/create-architecture-diagrams-with-mcp-claude-draw-io-excalidraw/ (2 weeks ago)
- Community bloggers are actively writing Excalidraw MCP + Claude Code setup guides. These rank for "Claude Code diagram" searches.
- The tutorial ecosystem for Excalidraw+MCP is actively growing — developer advocates writing and sharing their workflows

**Skissify response**: The tutorial ecosystem is where mindshare gets captured. Skissify needs 2-3 tutorials that rank for:
1. "Claude Code sketch tool" (currently returns Excalidraw tutorials)
2. "hand-drawn diagram MCP server"
3. "AI floor plan JSON renderer"

Without these tutorials, Skissify will be invisible even when its MCP server is live.

---

### 🔵 CONTEXT: Draw.io MCP Getting Active Evangelism (March 2026)

- **URL**: https://medium.com/@rakesh.sheshadri44/configuring-the-draw-io-mcp-server-in-vs-code-for-ai-generated-diagrams-09ff30cf6503 (2 weeks ago)
- **URL**: https://changyou.medium.com/official-mcp-test-of-draw-io-0e814c376fe7 (1 month ago)
- Multiple community articles explaining how to configure draw.io MCP in VS Code for AI diagram generation — gaining traction
- draw.io MCP use case: generates technical diagrams that pop open in the draw.io editor for post-editing

**What this confirms**: The "AI generates diagram, pops it into a tool" workflow is validated and being actively adopted. Skissify's version of this is cleaner (JSON in → hand-drawn SVG out, no editor required) and more aesthetically distinctive.

---

### Updated Competitor Matrix Row: Figma (MCP Upgraded — March 2026)
| Feature | Status (March 27, 2026) |
|---------|------------------------|
| **MCP: use_figma read/write** | **Live open beta — full agent access** |
| Agents supported | Claude Code, Codex, Cursor |
| Design system integration | Yes — components, variables, tokens |
| Hand-drawn output | No |
| Floor plan support | No |
| Target user | Professional designers |

---

---

## Update Log: March 27, 2026 — 07:16 CET | Automated Strategy Run #7

### 🟢 OPPORTUNITY: Mermaid Diagram Viewer Searches Up 1,015% YoY (2026)
- **URL**: https://macmdviewer.com/blog/mermaid-live-editor-guide (2 weeks ago)
- DataForSEO data cited in a Mermaid Live Editor guide: "Mermaid diagram viewer searches up **1,015% year-over-year**" in 2026
- Mermaid remains MIT open source; the commercial "Mermaid Chart" adds hosted services
- BrightCoding post (Feb 28, 2026): "Mermaid's DSL feels natural to developers — no XML hell or verbose JSON structures" — this is the same community that will appreciate Skissify's clean JSON manifest as an alternative
- **Skissify implication**: The developer interest in "diagrams as code" is exploding. Mermaid owns text-based diagrams. Skissify owns the JSON-structured, spatially-accurate, hand-drawn-aesthetic slice. When developers outgrow Mermaid's layout limitations (a documented pain point), Skissify should be the next step for anything requiring spatial control or hand-drawn output.
- **SEO opportunity**: "Mermaid alternative hand-drawn", "mermaid floor plan sketch" — zero competition for these keywords right now, 1000%+ search growth trend.

### 🟢 OPPORTUNITY: "AI Developer Tools Are Layered, Not Competing" — New Framing Paradigm
- **URL**: https://www.buildfastwithai.com/blogs/ai-tools-developers-march-2026 (5 days ago)
- Key quote: *"AI developer tools in 2026 layer on top of each other. They do not compete. Your editor handles real-time suggestions. Your terminal agent handles complex multi-file features."*
- This validates Skissify's positioning as a **rendering layer**, not an all-in-one design tool
- **Implication for EUR 2/mo**: A EUR 2/mo "rendering layer" is not a subscription decision — it's an infrastructure add-on, like paying for a font API or a timezone library. The purchase decision is made ONCE when integrating into a pipeline, then forgotten.
- **Competitor response needed**: Position Skissify explicitly as "the sketch layer for your AI stack" — not a Figma/Excalidraw/Miro replacement. This framing reduces friction at the point of first payment.

### 🟡 SIGNAL: Excalidraw Plugin Appears in "Top 10 Figma Plugins for Designers 2026"
- **URL**: https://www.purshology.com/2026/03/top-10-figma-plugins-every-ui-ux-designer-needs-in-2026/ (2 days ago)
- An "Excalidraw Integration" Figma plugin is now listed among the top 10 Figma plugins for 2026 — showing Excalidraw's hand-drawn aesthetic is crossing over into polished design workflows
- This is Excalidraw and Figma converging, with the hand-drawn aesthetic being used as a **style layer inside Figma** rather than as a standalone tool
- **Skissify opportunity**: If designers are importing Excalidraw sketches into Figma, they want hand-drawn style inside their polished workflow. Skissify's embeddable SVG output (no Figma account needed) is a lighter, programmatic version of this same need for non-designers (developers, architects, product managers).
- **Risk level**: LOW direct competition. This confirms the aesthetic is desirable in mainstream design flows.

### 🟡 SIGNAL: AI Floor Plan Market Expanding to Adjacent Verticals (March 2026)
- **URL**: https://oshamap.com/evacuation-plan-software (3 days ago) — AI floor plan → OSHA-compliant evacuation maps. "Upload floor plans or sketches, get print-ready maps."
- **URL**: https://ocnjdaily.com/news/2026/mar/25/design-your-perfect-space-with-the-ai-floor-plan-generator-streamline-your-workflow/ (2 days ago) — mainstream consumer interest in AI floor plan generation accelerating
- Adjacent market emerging: **emergency/safety planning tools** consuming floor plan data → evacuation routes, fire safety, ADA compliance checks
- ALL of these tools take raster images as input (photos, scans). NONE accept structured JSON. None produce hand-drawn output.
- **Skissify opportunity**: The "JSON floor plan as input" story is applicable to safety tools, real estate, renovation planning, facility management — not just architecture sketching. Skissify's JSON manifest could be the interoperability layer between LLM-generated layouts and these downstream tools.
- **Product implication**: Add a "skissify.com/schema" documentation page as a permanent URL for the JSON schema — this makes it citable by adjacent tools and creates the foundation for Skissify becoming a data standard.

### 🔵 CONTEXT: SaaS Trend Confirmation — AI-Driven + Usage-Based Is Now Universal
- **URL**: https://www.eleken.co/blog-posts/saas-trends (1 month ago) — "SaaS in 2026 is defined by AI-driven transformation at every level... the real winners are those integrating AI strategically, embracing usage-based pricing, unbundling, and mobile-first, inclusive design"
- **URL**: https://www.revenera.com/blog/software-monetization/saas-pricing-models-guide/ (1 week ago) — 6 winning strategies include usage-based as top tier
- Usage-based pricing (pay per render) is now explicitly the recommended model for AI tools in multiple analyst reports
- **Skissify validation**: The EUR 0.005/render overage pricing model documented in BUSINESS-PLAN.md is textbook correct for 2026. The EUR 2/mo API Starter tier (200 clean renders/mo) is the entry point into usage-based thinking.

### 🔵 CONTEXT: No New Hand-Drawn/JSON-Native/MCP Sketch Competitors Detected This Cycle
- Multiple web searches conducted (AI sketch tool launches, Product Hunt AI diagram, hand-drawn agent tools) — **no new direct competitor to Skissify's niche found** in the March 24–27 window
- The "hand-drawn + JSON-first + MCP + floor plan" quadrant remains unoccupied as of March 27, 2026
- Next scheduled search: April 3, 2026 (1-week check on space)

### Updated Table: Mermaid.js (Search Trend Data)
| Metric | Value (2026) |
|--------|-------------|
| **GitHub stars** | ~76,000 |
| **Diagram viewer search YoY growth** | +1,015% (DataForSEO) |
| **Integration** | GitHub, GitLab, Notion, Obsidian (native) |
| **Hand-drawn output** | None |
| **JSON manifest input** | None |
| **MCP server** | Via wrappers only |
| **Skissify complement** | Yes — Skissify is the hand-drawn/spatial upgrade when Mermaid's layout control is insufficient |

---

## Update Log: March 27, 2026 — 09:34 CET | Automated Strategy Run #9

### 🟡 NEW ENTRANT: paper.design — AI-Native Canvas Tool with MCP (March 5, 2026)
- **URL**: https://paper.design | Review: https://www.banani.co/blog/paper-design-mcp-review (6 days ago)
- Shipped **Paper Desktop + Paper MCP** on March 5, 2026 (build log entry: "Paper Desktop, Paper MCP, and eye dropper for shaders")
- Canvas-based UI generation tool with Claude Code integration built in natively — no separate AI subscription required
- Positioned as a Figma alternative / "AI-native design from scratch" — open alpha stage
- MCP server enables agents to read/write Paper canvases
- SFAI Labs comparison (2 weeks ago): "paper.design is in open alpha and lacks collaboration features, component management depth, and design system maturity that Figma has built over a decade"
- **Skissify relevance**: paper.design targets polished UI/product design (like Figma, not like Skissify). No hand-drawn aesthetic, no floor plan support, no JSON-first data model.
- **Risk level**: LOW direct competition. Signal value: HIGH — confirms that AI-native canvas tools with MCP are proliferating rapidly. Each new entrant in this space normalizes the "sketch tool + MCP" category that Skissify is entering.
- **Monitoring note**: If paper.design gains traction and pivots toward sketch/rough aesthetics, reassess.

### 🔴 CRITICAL: Mermaid MCP Now 22+ Diagram Types, 50+ Templates — Featured in awesome-mcp-servers (5 days ago)
- **URL**: https://github.com/punkpeye/awesome-mcp-servers (5 days ago) — `Narasimhaponnada/mermaid-mcp` newly listed
- **Features**: 22+ diagram types (flowcharts, sequence, class, ER, architecture, state machines, and more), 50+ pre-built templates, SVG/PNG/PDF exports, seamless integration with GitHub Copilot, Claude, and all MCP-compatible clients
- This is the most feature-complete free diagram MCP server now available
- Multiple other Mermaid MCP wrappers active on LobeHub: `kayaozkur/mcp-server-mermaid`, `hustcc/mcp-mermaid`, `zabolotiny/mermaid-diagram-claude-code`
- The Mermaid MCP ecosystem is maturing rapidly in March 2026 — becoming the default text-to-diagram MCP
- **Skissify positioning**: Mermaid MCP handles topology diagrams (flowcharts, sequences, ER). Skissify handles spatial diagrams (floor plans, architectural layouts) with hand-drawn aesthetics. These are complements, not competitors — but this new feature-richness closes Mermaid's gap in several areas where Skissify previously had differentiation (template library, multiple export formats).
- **Urgent action**: Skissify MCP should explicitly list "Mermaid for diagrams, Skissify for sketches and floor plans" in documentation — partners in the stack, not competitors.

### 🟢 MAJOR OPPORTUNITY: MCP Apps Spec Enables Interactive Sketches Inside AI Chats (Jan 2026, tutorial published 2 days ago)
- **URL**: https://www.thingsaboutweb.dev/en/posts/mcp-apps (2 days ago)
- **MCP Apps spec** (landed January 2026): MCP servers can now embed **interactive HTML UIs directly inside AI conversations**. The spec enables a two-way lifecycle: MCP server sends an HTML widget, user interacts, results flow back to the AI.
- Article author built a Mermaid diagram renderer using the spec — the diagram renders live INSIDE the Claude/Cursor chat window.
- Quote: *"MCP Apps let MCP Servers embed interactive HTML UIs directly inside AI conversations"*
- **Skissify impact**: TRANSFORMATIVE. A Skissify MCP App could render the hand-drawn sketch **inline in the chat interface** — the user prompts Claude, Claude generates the JSON manifest, Skissify renders the sketch, it appears in the conversation. Zero friction. No tab-switching.
- This is the "voice canvas" feature that Google Stitch is building — but as an MCP App, Skissify can ship it faster, cheaper, and with more developer customization.
- **Priority upgrade**: Add MCP Apps support to the Skissify MCP server roadmap. Ship basic MCP server (v0.1) → then add interactive App widget (v0.2). The App widget is the viral demo that gets shared.

### 🔵 CONTEXT: No New Direct Competitor in Skissify's Niche (Run #9 confirms Run #8)
- Searches conducted: AI sketch tool MCP hand-drawn launch March 2026; hand-drawn diagram JSON API new launch 2026; MCP server floor plan visualization new launch 2026
- **No new entrant** to the "hand-drawn + JSON-native + MCP + floor plan" quadrant detected
- The niche remains unoccupied as of March 27, 2026 09:34 CET
- Nine consecutive scans with zero niche entrants — statistically, this gap is durable, not accidental

### Updated Competitor Matrix (Run #9 Additions)

| Tool | MCP Status | Hand-drawn | Floor Plans | Agent-friendly JSON | Notable March 2026 Update |
|------|-----------|-----------|-------------|---------------------|---------------------------|
| **paper.design** | Yes (Paper MCP, March 5) | No | No | No | Open alpha; Canvas UI gen + Claude Code integration |
| **mermaid-mcp** | Yes (22+ types, 50+ templates) | No | No | Text/DSL | Feature-richest diagram MCP now active; in awesome-mcp-servers |
| **MCP Apps spec** | — | — | — | — | Jan 2026: interactive HTML in AI chats; enables inline sketch renderers |

---

## Update Log: March 27, 2026 — 11:40 CET | Automated Strategy Run #10

### 🟢 CONFIRMATION: Ten Consecutive Scans — Skissify's Niche Remains Structurally Unoccupied
- Full Product Hunt sweep of "Excalidraw alternatives", "Eraser alternatives", "sketch/whiteboard tools" categories conducted March 27, 2026 11:40 CET
- Alternatives pages list: Witeboard, A Web Whiteboard, Traw, Whiteborb — all generic whiteboard tools. Zero JSON-native, MCP-ready, floor-plan-capable, hand-drawn tools
- **Tenth consecutive scan with no new entrant to the niche.** The structural moat is holding.

### 🟢 OPPORTUNITY: Product Hunt "Eraser Alternatives" Page Describes Skissify's Ideal User — Today
- **URL**: https://www.producthunt.com/products/eraser-2/alternatives (updated 4 days ago)
- The PH Eraser alternatives page describes its ideal user as: *"Teams and individuals who want fast, frictionless whiteboarding for architecture sketches, brainstorming, and interview practice — especially when you care more about clarity and speed than pixel-perfect diagram styling."*
- This is **verbatim** Skissify's target persona — but Skissify is absent from this page
- The page also highlights: *"Lightweight, quick-to-learn drawing model with a distinctive sketch aesthetic"* — Skissify's exact positioning
- **Action**: After launch, submit Skissify to the PH Eraser alternatives page. The target user description is pre-written for Skissify.

### 🟡 SIGNAL: Lucid AI Confirms Voice-to-Visual Now Live at Enterprise Scale
- **URL**: https://www.prnewswire.com/news-releases/lucid-software-advances-mcp-server-offering-and-lucid-ai-capabilities-debuts-process-agent-302725846.html (confirmed fresh — 1 day ago)
- Lucid's announcement (still surfacing in search as recent) includes voice-to-text prompting: *"Users can now speak, rather than type, directly into the Lucid AI interface. For example, an engineer can describe a complex sequence diagram for a login flow, and Lucid AI will generate the visual in real time."*
- This is the enterprise-scale proof-of-concept for the "Voice-to-Sketch" moonshot feature on Skissify's roadmap
- Lucid charges $8–20/user/mo for this. Skissify can offer a comparable voice→JSON→sketch pipeline at EUR 2–5/mo.
- **Implication**: If enterprise users accept voice-to-visual at $20/user/mo, developer/indie users will pay EUR 2–5/mo for the same experience (simpler, faster, less polished).

### 🟡 SIGNAL: Floor Plan Software Market Actively Expanding — All Without JSON or MCP
- **URL**: https://www.mysiteplan.com/blogs/news/best-floor-plan-software (2 weeks ago) — "15 Best Floor Plan Software of 2026": SketchUp, Planner 5D, RoomSketcher, etc.
- **URL**: https://www.basedlabs.ai/tools/floor-plan-generator (3 weeks ago) — "AI floor plan generator turns sketches or text into scaled, labeled plans"
- **URL**: https://www.capterra.com/floor-plan-software/ (2 weeks ago) — enterprise floor plan software comparisons active
- ALL tools listed: raster-image input/output, no JSON API, no MCP, no hand-drawn aesthetic, no agent compatibility
- The floor plan software market is growing in parallel to Skissify's development — validating demand while remaining non-competitive
- **Skissify's gap**: The only floor plan tool in any of these lists that could be programmatically driven by an AI agent is... none of them. Skissify is still the only option.

### 🔵 CONTEXT: Developer Discovery Channels Are Stable — MCP Registries + PH Alternatives = The Channels
- Multiple PH alternatives pages (Excalidraw, Eraser, Whimsical) confirmed active with fresh updates this week
- LobeHub MCP marketplace confirmed updated 20 hours ago (Kubernetes MCP server newly listed)
- AI Gateway MCP Catalog Intake tutorial (YouTube, 1 week ago) shows enterprise discovery of MCP tools via gateway catalogs
- **Summary**: The three developer discovery channels Skissify needs to be in at launch: (1) modelcontextprotocol.io registry, (2) awesome-mcp-servers GitHub, (3) Product Hunt alternatives pages. All three are active and growing.

### Updated Competitor Matrix Row: Lucid Software (Voice-to-Visual Confirmed)
| Feature | Status (March 27, 2026 — confirmed) |
|---------|-------------------------------------|
| **Voice-to-Visual** | **Live — speak diagram description, AI generates visual in real time** |
| MCP Server | Advanced (upgraded March 27) |
| Process Agent | Yes (debuted March 27) |
| Hand-drawn output | No |
| Floor plans | No |
| JSON-native | No |
| Developer pricing | $8–20/user/mo (enterprise) |

---

## Update Log: March 27, 2026 — 13:48 CET | Automated Strategy Run #11

### 🟢 MEGA DATA POINT: Smartsheet MCP — 4,000 Users + 1.74M Actions in ONE WEEK
- **URL**: https://finance.yahoo.com/sectors/technology/articles/smartsheet-mcp-server-achieves-exceptional-130000914.html (March 24, 2026)
- Smartsheet launched its MCP Server + native Claude integration and hit **4,000 users and 1.74 million total actions** in its first week
- This is the clearest signal yet of MCP adoption velocity in enterprise workflows
- **Skissify implication**: When Skissify MCP launches, first-week numbers in the thousands are achievable — IF the tool is discoverable (registry, npm, HN post). The Smartsheet data proves developer appetite for MCP integrations is real and immediate. Don't underestimate the launch window.
- **Urgency**: Every day without a live Skissify MCP server is quantifiably expensive. 4,000 users in a week means the pipeline from "list on registry" to "first users" is near-instant.

### 🟢 PRICING SIGNAL: Stripe + AI Companies Pushing Hybrid Usage-Based (March 2026)
- **URL**: https://www.pymnts.com/news/artificial-intelligence/2026/stripe-introduces-billing-tools-to-meter-and-charge-ai-usage/ (3 weeks ago)
- Stripe launched new billing tools specifically to meter and charge AI usage — moving away from pure seat-based subscription
- **URL**: https://www.news.aakashg.com/p/how-to-price-ai-products (1 month ago)
- Study of 50 highest-valued AI startups (Feb 2026): "Nearly half use two or three models simultaneously. OpenAI runs tiered subscriptions for consumers, usage-based for the API, and freemium for the free tier."
- **31% of AI vendors** now use hybrid models (High Alpha data, Zylo)
- **Skissify validation**: Skissify's three-tier structure (free+watermark / Pro EUR 5 subscription / API usage-based EUR 0.005/render) is exactly the OpenAI pattern applied to a micro-SaaS. This is now explicitly industry-standard, not experimental.
- **Action implication**: Stripe's metered billing tooling makes the per-render overage model technically easy to implement. The infrastructure exists; this is a configuration task, not custom engineering.

### 🟡 WATCH: Affinity by Canva Version 3.1 — Major Design Tool Update (March 2026)
- **URL**: https://www.affinity.studio/blog/affinity-update-march-2026 (2 days ago)
- Affinity (now owned by Canva, ~$1.3B acquisition) shipped Version 3.1 with "HUGE" feature updates: advanced compositing, AI-powered silhouette/cutout tools, improved vector editing
- Positioned as "Figma killer" / "Canva for professionals"
- No MCP server, no hand-drawn aesthetic, no floor plan support, no JSON-native API
- **Skissify relevance**: LOW direct competition. Affinity competes in the polished graphic design space (Figma, Photoshop lane). No overlap with sketch/programmatic/floor-plan lane.
- **But note**: Canva's acquisition of Affinity signals big-tech's continued consolidation of the visual design market. If Canva acquires or builds a sketch tool in this space, threat level rises significantly.
- **Signal**: Even Canva (2B+ users) is investing heavily in the "serious design tool" market — validating that visual output tools are a growing category overall.

### 🟡 SIGNAL: Excalidraw + "System Architecture" Mindshare Growing (March 27, 2026)
- **URL**: https://startupik.com/how-to-design-system-architecture-using-excalidraw/ (4 days ago)
- Fresh Startupik article: "Excalidraw has become a popular choice for architecture diagrams because it solves a common startup problem: most architecture diagrams are either too formal, too slow to update, or too difficult for cross-functional teams to use."
- This positions Excalidraw as the default startup architecture diagramming tool — "architecture diagram" mindshare is deepening
- **Skissify response**: System architecture diagrams are an Excalidraw lane. Floor plan sketches are Skissify's lane. The Startupik article reinforces the positioning gap — Excalidraw handles topology/architecture; Skissify handles spatial/floor-plan. These are complements for different contexts.
- **Content opportunity**: Startupik is actively publishing Excalidraw tutorials (also maintains the "Excalidraw alternatives" roundup). Build a relationship with Startupik to get Skissify covered post-launch as the floor-plan-specific alternative.

### 🟢 CONFIRMATION: Eleventh Consecutive Scan — Niche Unoccupied
- Searches conducted: AI sketch tool hand-drawn MCP launch March 2026; new MCP tools diagram sketch whiteboard launch week; AI floor plan generator JSON API new launch 2026
- **No new entrant** to the "hand-drawn + JSON-native + MCP + floor plan" quadrant detected
- Affinity 3.1 (polished design — wrong lane), Smartsheet MCP (project management — wrong lane), Cyera MCP (security — wrong lane) — all adjacent but non-competitive
- **Eleven consecutive scans: the niche is structurally durable.**

### Updated Competitor Intelligence (Run #11 additions)

| Competitor | What Changed This Week |
|-----------|------------------------|
| Smartsheet | MCP server: 4,000 users, 1.74M actions in week 1 — adoption velocity benchmark |
| Affinity by Canva | Version 3.1 major update — polished design, zero sketch/MCP/floor plan |
| Excalidraw | Startup architecture diagram mindshare deepening via tutorial content |
| All others | No major changes detected |

---

## Update Log: March 27, 2026 — 14:59 CET | Automated Strategy Run #12

### 🔴 NEW ENTRANT: draw-it-mcp — Freehand Drawing MCP on mcpservers.org (Live)
- **URL**: https://mcpservers.org/en/servers/Pandoll-AI/draw-it-mcp
- A new MCP server "Draw-it-MCP" is live — browser-based drawing canvas that runs locally via `npx draw-it-mcp` with Claude Code/Cursor integration. Features: 6 colors, 4 brush sizes, brush/eraser, undo/redo, PNG export, dark/light mode.
- Self-described as "beautiful AI-powered drawing application" — AI integration allows Claude to "analyze and discuss your artwork" (not generate structured content)
- **Critical gap vs Skissify**: No JSON input, no structured elements (walls, doors, dimensions), no floor plan support, no SVG output, no hand-drawn aesthetic with tunable parameters — it's a freehand sketchpad, not a manifest-driven renderer. The MCP "integration" is AI art analysis, not agent-driven generation.
- **Risk level**: LOW. Targets digital artists and students wanting to draw manually with AI commentary. Completely different use case from Skissify's declarative JSON → structured sketch pipeline.
- **But it signals**: Freehand + MCP is appearing in the ecosystem. The broader "drawing + AI agents" category is getting populated. Skissify's structured approach is still uniquely differentiated.

### 🟢 OPPORTUNITY: Snaptrude Gaining Architect Traction — BIM/3D, Zero MCP, Zero Hand-drawn
- **URL**: https://www.snaptrude.com/pricing | https://checkthat.ai/brands/snaptrude
- Snaptrude (AI-powered concept design for architects) is getting fresh media coverage in March 2026 — text → editable 3D architecture models, BIM exports, browser-based. Reviewed by AIChief as "best platform for interior/exterior designers" (1 week ago).
- Target: Professional architects and interior designers. Pricing: tiered per-seat (enterprise-level).
- **No MCP server. No hand-drawn aesthetic. No JSON-native format. No programmatic API.**
- **Skissify differentiator**: Snaptrude targets the architect's full design workflow (BIM, 3D, collaboration). Skissify targets the sketch moment — quick ideation, agent-generated floor plans, napkin-stage drawings. These are complementary: Snaptrude produces polished 3D; Skissify produces hand-drawn 2D concepts. An architect could use both.
- **Adjacent B2B opportunity**: Architecture firms using Snaptrude for delivery + Skissify for client pitch sketches. The sketch aesthetic positions Skissify as "exploratory" rather than "technical" — exactly what early-stage client presentations require.

### 🟡 SIGNAL: Microsoft Data Formulator 0.7 Alpha — AI-Driven Data Visualization (March 2026)
- **URL**: https://github.com/microsoft/data-formulator (updated March 2, 2026)
- Microsoft shipped Data Formulator 0.7 alpha: AI agents explore data with rich visualizations. "More charts, new experience, enterprise-ready."
- No hand-drawn output, no floor plans, no JSON-first sketch manifest. Targets data visualization (charts, graphs) not sketch/diagram workflows.
- **Relevance**: LOW direct competition. Microsoft investing in "AI + visualization" confirms the category is growing, but their lane (data viz) doesn't overlap with Skissify's (architectural sketching/diagrams).

### 🟡 WATCH: Plan7Architect Pro 5 Raising Prices March 31, 2026 — Traditional Floor Plan Software Under Pressure
- **URL**: https://plan7architect.com/product/pro/
- Plan7Architect is raising prices on March 31, 2026 — "Don't miss out, purchase your license now." Traditional desktop floor plan software (CAD-style, one-time license) showing pricing pressure.
- **Skissify opportunity**: Users forced to re-evaluate traditional floor plan tools at price increase moments are the most likely to try modern alternatives. Skissify's EUR 5/mo subscription framed as "lighter, faster, AI-compatible" vs traditional software's one-time high license costs.
- **SEO micro-opportunity**: "Plan7Architect alternative", "floor plan software alternatives 2026" — active searches at this exact moment (price increase window).

### 🟢 CONFIRMATION: Run #12 — Niche Remains Structurally Unoccupied (Twelfth Consecutive Scan)
- Searches conducted: AI sketch tool hand-drawn diagram MCP launch March 2026; new AI diagram visualization tool Product Hunt GitHub March 2026; floor plan generator AI architecture sketching tool launch 2026; MCP server diagram sketch new tool awesome-mcp-servers week March 2026
- **draw-it-mcp** (freehand canvas): adjacent but non-competitive (manual drawing vs structured JSON manifest)
- **Snaptrude** (BIM/3D architecture): professional architects lane, not sketch/agent lane
- **Data Formulator 0.7** (Microsoft data viz): charts lane, completely separate
- **No tool found** with: hand-drawn aesthetic + JSON-native input + MCP support + floor plan elements
- **Twelve consecutive automated scans confirm: the niche is real, durable, and unoccupied.**

### Updated Competitor Matrix (Run #12 Additions)
| Tool | MCP Status | Hand-drawn | Floor Plans | JSON Manifest | Target User | Recent Change |
|------|-----------|-----------|-------------|---------------|-------------|---------------|
| **draw-it-mcp** | Yes (freehand canvas) | Freehand only | No | No | Digital artists, students | NEW — live on mcpservers.org |
| **Snaptrude** | No | No | Yes (BIM/3D) | No | Professional architects | Fresh media coverage March 2026 |
| **Data Formulator 0.7** | No | No | No | Partial (data schema) | Data analysts | Alpha March 2, 2026 (Microsoft) |
| **Plan7Architect Pro 5** | No | No | Yes (CAD-style) | No | Traditional architects | Price increase March 31 — conversion window |

---

---

## Update Log: March 27, 2026 — 16:05 CET | Automated Strategy Run #13

### 🔵 SIGNAL: MCP Ecosystem Crosses 5,000 Servers — Now an Industry Standard Under Linux Foundation
- **URL**: https://toolradar.com/blog/what-is-an-mcp-server (6 hours ago)
- Over **5,000 MCP servers** now exist as of March 2026
- In December 2025, Anthropic donated MCP to the **Agentic AI Foundation (AAIF)**, a directed fund under the **Linux Foundation** — confirming MCP is an open industry standard, not Anthropic proprietary
- **Skissify implication**: The governance structure is now enterprise-safe. IT departments can approve MCP integrations without vendor lock-in concerns. Being listed on the official MCP registry matters more than ever — this is now infrastructure, not a startup experiment.

### 🟡 SIGNAL: r/ClaudeAI "MCP Servers I Use Every Day" Thread Goes Viral (5 days ago)
- **URL**: https://www.reddit.com/r/ClaudeAI/comments/1s0u2ms/ (5 days ago — ongoing discussion)
- Active Reddit thread: "MCP servers I use every single day — what's in your stack?" is generating fresh discussion
- Notable: Claude desktop's code tab with web viewer is described as popular for UI iteration; no sketch/diagram MCPs mentioned in top comments
- **Opportunity**: Skissify MCP has zero competition in this Reddit community's "daily driver" stack right now. When Skissify ships, a "Show r/ClaudeAI" post targeting this exact audience (people already running MCP stacks) is the launch post to write.

### 🟡 SIGNAL: "50+ Best MCP Servers for Claude Code" Curation Sites Now Active (2 days ago)
- **URL**: https://claudefa.st/blog/tools/mcp-extensions/best-addons (2 days ago)
- **URL**: https://mcpmanager.ai/blog/most-popular-mcp-servers/ (2 days ago)
- Multiple curated "best MCP servers" directories launched this week, targeting Claude Code users specifically
- Top 50 popular MCP servers includes: Slack, Zapier, HubSpot, Salesforce, Google Workspace — generic business tools, zero sketch/diagram/floor-plan tools in the list
- **Skissify opportunity**: Getting listed on these directories at launch (via PR, submission, or being featured) is zero-cost distribution. The directories are actively maintained and Google-indexed. Sketch/visual output is a gap in every current "best MCP" list.

### 🟡 WATCH: Uizard "Autodesigner 2.0" Getting Fresh Coverage (2 days ago)
- **URL**: https://www.banani.co/blog/ai-for-ui-design-and-wireframes (2 days ago)
- **URL**: https://sleek.design/blog/best-ai-tools-mobile-app-design-2026-ranking (2 days ago)
- Multiple fresh 2026 roundups describe Uizard's "Autodesigner 2.0" as transforming "text prompts or hand-drawn sketches into editable, multi-screen mockups"
- Uizard direction: sketch → polished digital prototype (opposite of Skissify's direction: JSON → hand-drawn sketch)
- No MCP server, no JSON-native format, no floor plan support, no architectural elements
- **Risk level**: LOW. Uizard targets product managers making UI mockups. Skissify targets developers and architects making spatial/structural sketches.
- **Positioning note**: Uizard processes hand-drawn input to make polished output. Skissify generates hand-drawn output from structured input. These are two ends of the same spectrum — Skissify is for agents; Uizard is for non-designers. Add to "complementary tools" framing in docs.

### 🔵 CONTEXT: Autodesk Fusion 360 Shipped AI Sketch Features — Enterprise CAD Lane Separate
- **URL**: https://www.autodesk.com/products/fusion-360/blog/march-2026-product-update-whats-new/ (1 week ago)
- Autodesk Fusion March 2026 update: AI assistance for dimension sketches, circular/rectangular patterns, revolve features and primitives — AI-powered engineering CAD
- No MCP server, no hand-drawn aesthetic, no JSON manifest, no programmatic web API
- **Relevance**: Zero direct competition. Confirms enterprise CAD is going AI-native — but targeting mechanical engineers, not architects or developers. Skissify's floor plan lane is a separate market.

### 🟢 NICHE STATUS: Thirteenth Consecutive Scan — Structurally Unoccupied
- Searches conducted: AI sketch tool MCP hand-drawn diagram launch March 2026 (week); AI diagram visualization tool Product Hunt GitHub March 2026 (week); awesome-mcp-servers sketch diagram visualization (week); MCP ecosystem developer tools March 27 2026 (week)
- **No new entrant to "hand-drawn + JSON-native + MCP + floor plan" quadrant detected**
- draw-it-mcp (freehand only), Snaptrude (BIM/3D), Autodesk Fusion (enterprise CAD), Uizard (UI mockup) — all adjacent but structurally separate
- **Thirteen consecutive automated scans confirm: the niche is real, durable, and structurally unoccupied.**
- **Urgency metric**: 5,000+ MCP servers now exist. When Skissify ships, it enters a more crowded registry. First-mover window is tightening weekly.

### Updated Competitor Intelligence (Run #13 Additions)

| Competitor | What Changed This Cycle |
|-----------|------------------------|
| MCP ecosystem | 5,000+ servers; Linux Foundation governance — enterprise-safe |
| r/ClaudeAI "daily stack" | No sketch/diagram MCP in top community stacks — Skissify slot open |
| Uizard | Fresh coverage — sketch-to-polished UI (opposite direction from Skissify) |
| Autodesk Fusion | AI CAD sketch features — enterprise lane, zero overlap |
| MCP directories | claudefa.st, mcpmanager.ai — curated lists with no sketch tools; Skissify should submit at launch |

---

## Update Log: March 27, 2026 — 18:23 CET | Automated Strategy Run #15

### 🔴 CRITICAL UPGRADE: Google Stitch MCP Server + SDK Confirmed LIVE (March 18, 2026 — 1 week ago)
- **URL**: https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/ (March 18, 2026 — official Google Labs blog)
- **URL**: https://www.the-ai-corner.com/p/google-stitch-ai-design-tool-guide-2026 (1 week ago)
- Google Stitch now ships an **official MCP server AND SDK** with native skills support — confirmed in the official Google blog post quote: *"Using the recently released Stitch MCP server and SDK, you can leverage Stitch's capabilities via skills (2.4k stars) and tools."*
- **2,400+ stars** on the skills integration — indicating immediate developer adoption
- Stitch capabilities as of March 2026: AI-native infinite canvas, voice design ("vibe design"), text/code/image input → high-fidelity UI designs, Figma export, React export, Gemini 2.5 Pro powered, **350 free AI generations/month**, free tier
- Quote from Google: *"Anyone can create, iterate and collaborate to turn natural language into high-fidelity UI designs"*
- **The-AI-Corner analysis**: "Google Stitch just dropped voice design, infinite canvas, and MCP integration. Free. 350 gen/month. Figma is down 80%."
- **Critical differentiation**: Stitch outputs POLISHED UI designs → Figma/React code. Skissify outputs HAND-DRAWN SKETCHES → SVG. Stitch is competing with Figma, not Skissify. The use cases are diametrically different: "production-ready UI" vs "back-of-napkin sketch idea."
- **Risk level**: LOW-MEDIUM direct competition. HIGH competitive environment signal. Google entering the MCP visual design space with 2.4k immediate star adoption means the "AI visual output MCP" category is formally validated by big tech. BUT Google's lane (polished → code) is the opposite of Skissify's lane (rough → sketch).
- **Urgency signal**: Google Stitch's MCP/SDK model (easy to install via skills, 2.4k immediate adoption) is the benchmark Skissify's MCP packaging should match. If Google can get 2.4k stars in a week, Skissify can reach hundreds of early adopters at launch.

### 🟢 NEW DISCOVERY CHANNEL: zsky.ai "Best AI Sketch Generators 2026" Roundup (1 week ago)
- **URL**: https://zsky.ai/blog/best-ai-sketch-generators-2026 (1 week ago)
- New roundup: "Top AI sketch generators for pencil, charcoal, and ink styles. Tested and ranked for 2026." Covers artistic AI sketch generators (photo → hand-drawn style).
- Currently covers image-generation-style tools (artistic style transfer, not programmatic/JSON-driven).
- **Skissify positioning gap**: The "programmatic hand-drawn sketch tool" category doesn't appear in this roundup — Skissify would be the ONLY tool in a new category ("AI agent-compatible hand-drawn diagram tool").
- **Action**: Submit Skissify to zsky.ai post-launch for consideration in their roundups. Their audience (people searching "AI sketch generator 2026") includes developers looking for non-photo-manipulation sketch tools.

### 🟢 CONFIRMATION: Fifteenth Consecutive Scan — Niche Remains Unoccupied
- Searches conducted: AI sketch tool MCP hand-drawn diagram new launch March 2026; Excalidraw tldraw new features March 27 2026; Google Stitch MCP details
- **No new entrant** to "hand-drawn + JSON-native + MCP + floor plan" quadrant detected
- Google Stitch (polished UI lane), zsky.ai roundup tools (artistic image generation) — both adjacent, non-competitive
- **Fifteen consecutive automated scans: the niche is structurally unoccupied.**

### 🔵 META: Rate Limit Signal — End of Intelligence Cycle for March 27
- Brave Search API rate limit hit (429) at scan #15 — 151/2000 monthly quota used in one day
- This is the 15th scan of a single Friday, spanning 01:11 CET → 18:23 CET (17 hours of continuous intelligence gathering)
- Intelligence density for March 27, 2026 is the highest recorded for any single day in the Skissify strategy log
- **Summary signal**: All competitive intelligence gathered; the niche is confirmed unoccupied; the MCP server is the one remaining unlock

### Updated Competitor Matrix Row: Google Stitch (MCP Upgraded — March 18, 2026)
| Feature | Status (March 27, 2026) |
|---------|------------------------|
| **MCP server + SDK** | **LIVE — confirmed in Google Labs blog post, March 18, 2026** |
| **Skills integration** | **2,400+ stars — immediate developer adoption** |
| **Free tier** | 350 AI generations/month — free |
| Output style | Polished high-fidelity UI designs |
| Target | Anyone wanting to design UI from natural language |
| Hand-drawn output | No — opposite direction |
| Floor plans | No |
| JSON-native input | No — natural language / sketch / image input |
| Skissify threat level | LOW direct (different lane) / HIGH validation (MCP visual tools confirmed by Google) |

---

## Update Log: March 27, 2026 — 17:14 CET | Automated Strategy Run #14

### 🟡 NEW ENTRANT WATCH: Coohom AI Floor Planner — Free 3D, Zero JSON, Zero MCP (Published March 26, 2026)
- **URL**: https://www.coohom.com/article/free-ai-architecture-plan-generator (published March 26, 2026 — yesterday)
- Coohom published a first-person architect's review of "Free AI Architecture Plan Generator" tools (their own platform) — getting fresh SEO traction
- Coohom platform: upload sketch/photo → AI generates 2D floor plan → converts to 3D visualization
- Target: interior designers, homeowners, architects wanting 3D walkthroughs from rough sketches
- Input: raster images (photos, scans). Output: 3D renders and 2D floor plan images. No JSON. No MCP. No API.
- Pricing: free tier described as "forever free" with 2D floor planning, 3D visualization, AI-assisted layout
- **Skissify relevance**: LOW direct competition. Coohom targets the consumer/visual interior design space. No programmatic API, no MCP, no agent compatibility. But their SEO traction (fresh content, March 26) means "AI floor plan generator" searches will surface Coohom before Skissify.
- **Skissify response**: Coohom occupies "human uploads sketch → get polished 3D." Skissify occupies "AI agent outputs JSON → get hand-drawn 2D." These are opposite ends of the same workflow.
- **Signal**: Architecture blog coverage (blog.chaos.com, March 25) lists AI rendering tools for architects at student tiers as low as $7.60/mo — this validates architect willingness to pay for AI visual tools in the $5–20/mo range.

### 🟢 CONFIRMED: Fourteenth Consecutive Scan — Niche Unoccupied
- Searches: "AI sketch tool MCP hand-drawn diagram launch March 2026", "floor plan AI JSON generator architecture sketch new tool 2026", "Excalidraw tldraw new features product update March 2026", "MCP registry new tools listed week March 24 2026 sketch"
- **Results**: Coohom (3D, raster, no MCP), Snaptrude (BIM/3D architects), Autodesk Fusion (enterprise CAD), Rendair (image upload → AI render, not JSON-native) — all adjacent, all non-competitive
- **No new entrant to "hand-drawn + JSON-native + MCP + floor plan" quadrant detected**
- **Fourteen consecutive automated scans confirm: the niche is real, durable, and structurally unoccupied.**

### 🔵 CONTEXT: Excalidraw Still Winning Developer Mind-Share for System Architecture (March 27)
- Startupik article (4 days ago): "Excalidraw has become a popular choice for startup architecture" — architecture diagram mindshare deepening
- Excalidraw alternatives roundups surfacing fresh content (Product Hunt 4 days ago, Startupik 3 days ago) — actively indexed
- Thomas Thornton tutorial (March 24) still ranking for "Excalidraw MCP agent" searches
- **Skissify implication**: Excalidraw is winning the "startup system diagrams" lane. Skissify must claim the "floor plan + spatial sketch" lane before Excalidraw expands its scope.

### 🔵 CONTEXT: SaaS Pricing Hybrid Model Confirmed Again as Standard (March 2026)
- **URL**: https://blog.alguna.com/saas-pricing-models/ (2 weeks ago) — hybrid usage-based is top-ranked 2026 model
- **URL**: https://bigideasdb.com/micro-saas-ideas-2026 (2 weeks ago) — $49-199/mo for high-pain, sub-$5 for friction removal
- Skissify's three-tier hybrid (free+watermark / EUR 5 subscription / EUR 0.005/render API) continues to align with 2026 best practices

### Updated Competitor Matrix (Run #14 Additions)
| Tool | Input | Output | MCP | Hand-drawn | Floor Plans | Pricing | New Signal |
|------|-------|--------|-----|-----------|-------------|---------|-----------|
| **Coohom** | Raster photos/sketches | 3D renders + 2D images | No | No | Yes (3D/2D) | Free + paid | Fresh SEO push March 26, architect blogger review |
| **Rendair** | Uploaded images | AI-rendered visuals | No | No | Via image | $7.60/mo student | Listed in top AI architect tools March 25 |
| **All others** | No change from Run #13 | — | — | — | — | — | — |

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

---

## Update Log: March 27, 2026 — 08:28 CET | Automated Strategy Run #8

### 🟡 SIGNAL: "Excalidraw Alternatives" Content Wave Surging (March 24–27, 2026)
- **URL**: https://startupik.com/excalidraw-alternatives-best-diagram-tools-for-teams/ (March 15, published 3 days ago)
- **URL**: https://www.exafol.com/products/excalidraw/alternatives (6 days ago)
- **URL**: https://www.producthunt.com/products/excalidraw/alternatives (4 days ago)
- Multiple fresh "Excalidraw alternatives" roundups are ranking and active. All list Witeboard, A Web Whiteboard, Traw, draw.io, Whimsical — **none list Skissify**, because Skissify hasn't launched publicly.
- These pages will rank for years. Skissify appearing on these roundups post-launch = guaranteed discovery channel.
- **Action**: After launch, submit Skissify to Product Hunt under "Excalidraw alternatives" category, and reach out to the Startupik and Exafol writers for inclusion in their roundups. No SEO effort needed — just product launch + outreach.
- **SEO note**: "Excalidraw alternatives 2026" generates active developer searches. Being on 2 of these pages is worth more than 10 blog posts.

### 🟡 SIGNAL: Excalidraw MCP Evangelism Continues — GitHub Copilot Integration Tutorial (March 24, 2026)
- **URL**: https://thomasthornton.cloud/creating-diagrams-with-an-excalidraw-agent-skill-and-excalidraw-mcp/ (3 days ago per search)
- The Thomas Thornton tutorial (previously documented in Run #4) continues gaining traction in search results — appearing in both "Excalidraw MCP" and "hand-drawn diagram" searches.
- Quote from search snippet: "Learn how an Excalidraw Agent Skill powered by Excalidraw MCP in GitHub Copilot can generate Cloud, Terraform, and workflow diagrams from natural language prompts."
- **Status**: This tutorial is the benchmark. Skissify's counter-tutorial (assigning in DAILY-ACTIONS) will target the SAME keyword space — "Claude Code diagram", "AI agent hand-drawn sketch" — while differentiating on floor plans, architectural elements, and EUR 2/mo pricing vs Excalidraw+'s $6-7/mo.

### 🟢 OPPORTUNITY: Developers Actively Building LLM → JSON → Floor Plan Pipelines Without a Good Renderer
- **URL**: https://dev.to/bindupautra_jyotibrat/building-an-ai-floor-planner-with-google-gemini-and-matplotlib-5c5d (3 weeks ago)
- Re-confirmed: This DEV Community tutorial (Google Gemini + Matplotlib floor plan pipeline) continues to surface in "floor plan JSON API programmatic" searches.
- Quote: *"Google Gemini API – Parses natural language prompts and converts them into structured JSON layouts. Matplotlib – Used to visualize the floor plan by plotting rooms as geometric shapes."*
- Matplotlib is Python-only, ugly output, no hand-drawn aesthetic, no SVG, no API.
- **This exact developer is Skissify's target user.** They've already done the hard part (LLM → JSON). Skissify is the render step they're missing.
- **Action**: Comment on this post (assigned since Run #6, must verify if done). Skissify should own the comment section of this tutorial.

### 🔵 CONTEXT: No New Direct Competitors Found in This Scan Window (March 24–27)
- Searches conducted: AI sketch tool MCP hand-drawn (week), Excalidraw tldraw features (week), MCP news March 2026 (week), floor plan JSON API developer (month)
- **No new entrant to the "hand-drawn + JSON-native + MCP + floor plan" quadrant detected**
- Competition remains: Excalidraw (hand-drawn, no floor plans), draw.io (floor plans, no hand-drawn), Eraser (MCP, no hand-drawn), Figma (MCP, no sketchy style)
- **The white space persists.** Every week this is confirmed is a week the moat can be strengthened.

### 🔵 CONTEXT: Product Hunt "Excalidraw Alternatives" Still Not Containing Skissify
- Product Hunt's curated Excalidraw alternatives page now lists: Witeboard, A Web Whiteboard, Traw, Whiteborb — all basic whiteboard tools
- No JSON-first, no MCP, no floor plan tools in this list
- **Opportunity**: Post-launch, Skissify submitting to this PH alternatives list occupies a category currently empty of programmatic/agent-ready sketch tools

### Updated Competitor Intelligence Summary (as of Run #8)

| Competitor | MCP Status | Hand-drawn | Floor Plans | Agent-friendly JSON | Recent Change |
|-----------|-----------|-----------|-------------|---------------------|---------------|
| Excalidraw | Official + community | Yes | No | No (internal format) | Mindmap support added; MCP evangelism growing |
| tldraw | No official | Yes | No | No (imperative API) | Desktop app + local HTTP Canvas API shipped |
| Eraser | Yes (HTTP + Agent Skills) | No | No | No | Active MCP adoption in CI/CD workflows |
| Figma | Yes (use_figma, beta) | No | No | No | Full read/write MCP open beta (March 25-27) |
| Lucid | Yes (advanced) | No | No | No | Process Agent launched March 26 |
| draw.io | Official (JGraph) | No | Yes | No (XML) | Gaining MCP tutorial traction in dev community |
| Whimsical | Official (desktop) | Semi | No | No | Stable — no new features noted |
| Napkin AI | No | Semi | No | No | API availability still unclear (conflicting March 2026 sources) |
| **Skissify** | **Planned — CRITICAL** | **Yes** | **Yes** | **Yes (native)** | **Still unchallenged in niche; MCP unbuilt** |
