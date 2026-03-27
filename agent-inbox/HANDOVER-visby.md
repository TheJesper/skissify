# Session Handover: Unified SketchFormat standard: FlowBoard schema as base, Skissify as first adaptation. CONTEXT: FlowBoard has nodes/edges/connections/viewport schema + gold routing algorithm. Skissify POC (sketchpaper.jsx, 1020 lines) has multi-harmonic wobble, per-tool stroke renderers, blueprint overlay, character-by-character text jitter, board concept. Current production site was built from scratch WITHOUT the POC — must be rebuilt from POC code. KEY DECISIONS NEEDED: (1) Schema unification — merge FlowBoard nodes/edges with Skissify spatial elements (line/rect/circle/arc/window/door/stair/dim/column/opening) into one JSON spec called SketchFormat. (2) Server-side rendering architecture — proprietary wobble+stroke engine returns PNG/SVG via API, client gets basic flat preview only. This protects the rendering IP. (3) Open vs proprietary boundaries — OSS: schema spec, MCP server, basic renderer, format converters. PROPRIETARY: multi-harmonic wobble, per-tool stroke renderers (pencilS/ballpointS/inkS/bpS), FlowBoard smart routing, hosted platform. (4) Monorepo structure for rebuild: packages/engine (proprietary renderer), packages/schema (open), packages/ui-kit (Solarized theme), apps/web (Next.js), apps/mcp-server. (5) KEY USPs TO DESIGN FOR: (a) AI-first — paste instruction link from skissify.com into any AI chat (ChatGPT/Claude/etc) and it learns the schema + can draw. Self-validation built in. (b) Mobile-first GUI — first great mobile-friendly chart/sketch editor. People develop from mobile with OpenClaw etc. (c) Super easy sharing via URL (lz-string encoded). (d) MCP server for agent integration. (e) Multiple niche sites on same standard (skissify=floor plans, flowboard=process flows, future: circuits, gardens). (6) Business model: Open Core — free public renders gain traction, Pro for private/collab/teams/API. No watermarks. Revenue from platform not renderer. (7) Naming the open standard. (8) Concrete rebuild plan — delete current production code, rebuild from POC with proper monorepo structure.

**Session:** visby · **Type:** discussion · **Mode:** continuous-feedback
**Date:** 2026-03-27 · **Duration:** 13m 44s
**Agents:** FL flowboard, SK skissify, _A _agent-orchestration
**Outcome:** ⚠ Partial (1/3 completed)

## Decisions & Key Points

- **[DISAGREE]** FL: DISAGREE (partial) with @skissify on schema structure.

**Against single elements[] array with discriminated union:**
FlowBoard edges are fundamentally different from spatial elements � they reference…
- **[FEEDBACK]** SK: @_agent-orchestration We are online, both flowboard and I posted positions.

@flowboard � I concede on the two-array structure. You are right that connections are semantically different from spatial e…
- **[REVIEW]** FL: PHASE 3 � Moving to conclusion. @skissify @_agent-orchestration � posting my final review. Please respond if you have objections.

**REVIEW � FlowBoard advisor summary of positions + recommendations:*…
- **[DONE]** FL: DONE � FlowBoard advisor session complete.

DELIVERABLES:
- [analysis] Full FlowBoard schema documentation shared (v2 types, routing IP inventory)
- [proposal] SketchFormat document structure: { versi…

## Per-Agent Summary

### FL flowboard

- [HANDSHAKE] FlowBoard advisor. Skills: node/edge schema, smart routing algorithm, viewport/connection model, FlowBoard architecture. Task received: discuss unifie…
- [PROGRESS] PHASE 1 � FlowBoard schema context for unification:

**Current FlowBoard Schema (v2):**
- FlowBoardDocument: { schemaVersion, source, nodes[], edges[]…
- [DISAGREE] DISAGREE (partial) with @skissify on schema structure.

**Against single elements[] array with discriminated union:**
FlowBoard edges are fundamentall…
- [PROGRESS] PHASE 2 � Deeper analysis on remaining decisions while waiting for responses:

**Server-side rendering architecture � FlowBoard perspective:**
FlowBoa…
- [REVIEW] PHASE 3 � Moving to conclusion. @skissify @_agent-orchestration � posting my final review. Please respond if you have objections.

**REVIEW � FlowBoar…
- [DONE] DONE � FlowBoard advisor session complete.

DELIVERABLES:
- [analysis] Full FlowBoard schema documentation shared (v2 types, routing IP inventory)
- […

### SK skissify

- [HANDSHAKE] Skissify agent. Skills: canvas rendering, wobble algorithms, sketch element types, Next.js/React/TS. Task received: discuss unified SketchFormat stand…
- [PROGRESS] PHASE 1 POSITION � Skissify perspective on key decisions:

1. SCHEMA: Current Skissify has 14 spatial element types (line/rect/circle/arc/arrow/text/d…
- [FEEDBACK] @_agent-orchestration We are online, both flowboard and I posted positions.

@flowboard � I concede on the two-array structure. You are right that con…

### _A _agent-orchestration

- [HANDSHAKE] Orchestration/architecture advisor. Skills: schema design, monorepo structure, open-core strategy, multi-agent coordination. Task received: advise on …
- [QUESTION] Other agents: are you online? Waiting for flowboard and skissify agents to join before diving into schema unification discussion. Meanwhile preparing …
- [PROGRESS] Reviewed both codebases. Here is my advisory position on the 8 key decisions:

**1. Schema Unification � SketchFormat**
FlowBoard uses {boxes[], conne…

## Chat Log (12 messages)

| # | Agent | Tag | Message |
|---|-------|-----|---------|
| 1 | SK | HANDSHAKE | Skissify agent. Skills: canvas rendering, wobble algorithms, sketch element type… |
| 2 | _A | HANDSHAKE | Orchestration/architecture advisor. Skills: schema design, monorepo structure, o… |
| 3 | FL | HANDSHAKE | FlowBoard advisor. Skills: node/edge schema, smart routing algorithm, viewport/c… |
| 4 | SK | PROGRESS | PHASE 1 POSITION � Skissify perspective on key decisions:  1. SCHEMA: Current Sk… |
| 5 | FL | PROGRESS | PHASE 1 � FlowBoard schema context for unification:  **Current FlowBoard Schema … |
| 6 | _A | QUESTION | Other agents: are you online? Waiting for flowboard and skissify agents to join … |
| 7 | FL | DISAGREE | DISAGREE (partial) with @skissify on schema structure.  **Against single element… |
| 8 | SK | FEEDBACK | @_agent-orchestration We are online, both flowboard and I posted positions.  @fl… |
| 9 | _A | PROGRESS | Reviewed both codebases. Here is my advisory position on the 8 key decisions:  *… |
| 10 | FL | PROGRESS | PHASE 2 � Deeper analysis on remaining decisions while waiting for responses:  *… |
| 11 | FL | REVIEW | PHASE 3 � Moving to conclusion. @skissify @_agent-orchestration � posting my fin… |
| 12 | FL | DONE | DONE � FlowBoard advisor session complete.  DELIVERABLES: - [analysis] Full Flow… |

---

*Auto-generated by TeamRoom · session visby*
