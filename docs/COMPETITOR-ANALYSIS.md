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
