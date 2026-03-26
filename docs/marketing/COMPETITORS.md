# Skissify — Competitive Analysis

## Competitive Matrix

| Feature | Excalidraw | tldraw | Miro | Figma | Mermaid | draw.io | **Skissify** |
|---------|-----------|--------|------|-------|---------|---------|-------------|
| Hand-drawn style | Yes | Yes | No | No | No | No | **Yes (tunable)** |
| JSON-first input | No | Partial (SDK) | No | No | Text-based | XML | **Yes (native)** |
| MCP support | No | No | No | No | No | No | **Yes** |
| AI agent compatible | Limited | SDK only | API | Plugin | Partial | No | **Yes (core design)** |
| Architectural elements | No | No | No | No | No | Basic | **Yes (14 types)** |
| Wobble control | Fixed | Fixed | N/A | N/A | N/A | N/A | **3-axis tunable** |
| Self-hostable | Yes (OSS) | Yes (SDK) | No | No | Yes | Yes | **Yes** |
| Free tier | Yes | Yes | Yes (limited) | Yes (limited) | Yes | Yes | **Yes** |
| Price (paid) | $7/mo | $6K/yr SDK | $10/user/mo | $15/user/mo | Free | Free | **EUR 5/mo** |

---

## Detailed Competitor Analysis

### Excalidraw
**What it is:** Open-source virtual whiteboard with hand-drawn aesthetic
**Target:** Developers, designers who want quick whiteboard sketches
**Strengths:**
- 100K+ monthly active users, massive community
- MIT license, fully open source
- Embeddable in other apps (Notion, Obsidian, etc.)
- Excalidraw+ cloud at $6-7/user/month
- Excellent UX — feels natural to draw in
- Strong brand recognition among developers

**Weaknesses:**
- Manual drawing only — no programmatic input
- No JSON-first workflow (internal format exists but not designed as API)
- No MCP or AI agent integration (manual collaboration only)
- No architectural domain elements (no doors, windows, stairs, dimension lines)
- Hand-drawn style is not tunable (fixed wobble amount)
- No paper type options

**What Skissify does better:**
- Programmatic sketch creation via JSON
- AI agents can generate sketches without human interaction
- Architectural element library
- Tunable wobble (amplitude, frequency, humanness)
- Multiple paper types (cream, white, grid, blueprint)

---

### tldraw
**What it is:** SDK-first infinite canvas library for building custom drawing apps
**Target:** Developers building products that need drawing capabilities
**Strengths:**
- Best-in-class SDK for embedding canvas in React apps
- $12M funding, well-resourced team
- Excellent developer experience
- "Make Real" AI feature (sketch → code)
- Strong TypeScript support

**Weaknesses:**
- SDK 4.0 commercial license: $6,000/year (controversial pricing change)
- Not a standalone product — it's a toolkit for building products
- No JSON-first input (you build UIs with the SDK)
- No MCP integration
- No architectural elements
- Expensive for indie devs and small teams
- Community backlash over licensing changes

**What Skissify does better:**
- 1200x cheaper (EUR 5/mo vs $6K/yr)
- Standalone product — works immediately, no development needed
- JSON-first: programmatic generation is the core use case
- MCP integration for AI agents
- Architectural element library
- Not an SDK that requires React integration

---

### Miro
**What it is:** Enterprise visual collaboration platform
**Target:** Teams, enterprises, product managers
**Strengths:**
- Dominant in enterprise whiteboarding
- Rich integration ecosystem (Jira, Slack, Teams)
- Real-time collaboration
- Templates for every use case
- AI features (Miro Assist)

**Weaknesses:**
- Overkill for individual sketches ($10+/user/mo)
- No hand-drawn aesthetic (clean vector look)
- No programmatic/JSON input
- No MCP support
- Heavy, slow to load for simple sketches
- Enterprise sales model doesn't serve indie developers
- No architectural domain elements

**What Skissify does better:**
- Hand-drawn aesthetic (the entire point)
- JSON-first: programmatic generation
- MCP support for AI agents
- 50x cheaper for individuals
- Fast, lightweight — single-purpose tool
- Architectural elements (doors, windows, stairs)

---

### Figma
**What it is:** Collaborative design tool for UI/UX design
**Target:** Designers, design teams, product teams
**Strengths:**
- Industry standard for UI design
- Real-time collaboration
- Massive plugin ecosystem
- FigJam for whiteboarding
- Dev mode for handoff

**Weaknesses:**
- Design-focused, not sketch-focused (pixel-perfect, not hand-drawn)
- No hand-drawn aesthetic (clean vector rendering)
- No JSON-first input
- No MCP integration
- Expensive for sketching use case ($15/user/mo)
- Steep learning curve for non-designers
- No architectural elements

**What Skissify does better:**
- Hand-drawn aesthetic by design
- JSON-first input (agents and scripts can create content)
- MCP for AI agent integration
- Purpose-built for sketches, not pixel-perfect design
- Dramatically simpler — no learning curve
- Architectural elements

---

### Mermaid
**What it is:** Text-to-diagram rendering engine (Markdown-based)
**Target:** Developers who want diagrams in documentation
**Strengths:**
- Huge adoption (GitHub, GitLab, Notion natively support it)
- Text-first: works in Markdown files
- Many diagram types (flowchart, sequence, Gantt, ER, etc.)
- Open source, free
- AI agents already know the syntax

**Weaknesses:**
- No hand-drawn style (clean vector output only)
- No freeform spatial layout (position is auto-computed)
- Limited to structured diagram types
- No architectural elements
- Cannot create floor plans or spatial sketches
- No wobble/humanness controls
- Rigid layout engine — you can't place elements at specific coordinates

**What Skissify does better:**
- Hand-drawn aesthetic
- Freeform spatial layout (elements at exact x,y positions)
- Architectural elements (floor plans, building diagrams)
- Tunable visual style
- Better for spatial content (floor plans, wireframes, architecture)
- JSON gives full coordinate control

---

### draw.io (diagrams.net)
**What it is:** Free, full-featured diagramming tool
**Target:** Anyone who needs diagrams (technical, business, education)
**Strengths:**
- Completely free, no paid tier
- Feature-rich (thousands of shape libraries)
- Self-hostable, works offline
- Integrates with Confluence, Google Drive, GitHub
- XML-based format is well-documented

**Weaknesses:**
- Dated UI — looks like a 2010 Java application
- No hand-drawn aesthetic (clean vector output)
- No wobble or humanness controls
- XML input is verbose and hard to generate programmatically
- No MCP integration
- No modern web framework (not React/Next.js)
- Visual style doesn't inspire confidence in presentations

**What Skissify does better:**
- Beautiful hand-drawn aesthetic (looks like a real sketch)
- JSON input is cleaner and more AI-friendly than XML
- MCP integration for AI agents
- Modern web UI (dark theme, responsive)
- Tunable visual style
- Purpose-built for sketches, not complex diagrams

---

## Positioning Summary

### Skissify's unique intersection:

```
Hand-drawn style ──────── Excalidraw, tldraw
       +
JSON-first input ──────── (nobody does this well)
       +
AI agent compatible ───── (nobody does this)
       +
Architectural elements ── (nobody in sketch tools)
       =
SKISSIFY ─────────────── Unique position
```

### One-line positioning:
**"The sketch tool built for the age of AI agents — JSON in, hand-drawn art out."**

### When NOT to use Skissify:
- Complex UI design → use Figma
- Enterprise whiteboarding → use Miro
- Structured diagrams in Markdown → use Mermaid
- Manual freehand sketching → use Excalidraw
- Building a drawing app → use tldraw SDK

### When TO use Skissify:
- AI agent needs to create a visual
- Programmatic sketch generation from data
- Floor plans and architectural sketches
- Quick hand-drawn style from structured data
- Napkin-style visuals for presentations
- Documentation illustrations from JSON
