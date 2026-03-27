# Daily Actions Log

_Actionable items proposed by the automated strategy advisor. Append-only._

---

## 2026-03-27 (Friday) — Cycle Run 01:11 CET

### Context This Cycle
- MCP crosses 97M installs — window to claim "hand-drawn sketch MCP" is NOW
- Google Stitch shipped voice canvas (March 2026) — entering sketch-to-design pipeline
- tldraw community fragmentation — discoverability opportunity in those threads
- EUR 2/mo pricing is psychologically weak — anchoring at EUR 5 Pro is correct

---

### ✅ Action 1: Start the MCP Server — This Week, Not Later

**Why now**: MCP has 97M installs and is now "standard practice" per the dev ecosystem. The MCP registry is filling up. Every week without a Skissify MCP entry is market share gifted to competitors.

**Concrete steps**:
1. Build the simplest possible MCP server: one tool, `render_sketch`, accepts JSON manifest, returns SVG string
2. Publish to npm as `@skissify/mcp` (or similar)
3. Submit to MCP registry (modelcontextprotocol.io/registry)
4. Write a 200-word README showing Claude generating a floor plan JSON and calling `render_sketch`
5. **Validate**: Test with Claude Desktop — can an agent generate a floor plan in < 3 tool calls?

**Target**: Live by April 3, 2026 (one week). Even a rough v0.1 with just `render_sketch` gets you listed.

**Why this beats everything else**: First-mover in "hand-drawn sketch MCP" is worth more than any ad spend. Being in the registry means Claude, Cursor, Windsurf, and others will recommend Skissify to users.

---

### ✅ Action 2: Write One Reddit Comment in a tldraw Thread Today

**Why now**: tldraw community is actively discussing closed PRs, licensing, and alternatives. This is earned media, not paid.

**Concrete steps**:
1. Find recent Reddit threads: r/webdev, r/programming, r/selfhosted — search "tldraw alternative" or find the licensing discussion
2. Write ONE genuine, helpful comment (not spam) that:
   - Acknowledges tldraw's strengths
   - Mentions Skissify as "I'm building a JSON-first MCP sketch tool, completely different angle, but if anyone wants hand-drawn output from agents..."
   - Links to Skissify
3. Don't post in every thread. One good comment > five weak ones.

**Target**: Done today. 30 minutes max.

**Success metric**: Any upvotes or replies asking about Skissify = winning.

---

### ✅ Action 3: Rewrite the Skissify Homepage Hero Section

**Why now**: Google Stitch ships "voice canvas" and calls itself sketch-friendly. Skissify needs to be unmistakably positioned as the *intentional hand-drawn style* tool — not an inferior design tool, but a deliberate aesthetic choice.

**Concrete steps**:
1. New hero line: "The sketch tool for AI agents — and the humans who love hand-drawn diagrams"
2. Sub-line: "JSON in. Hand-drawn SVG out. MCP-ready."
3. Add one sentence: "Not a Figma competitor. A napkin sketch, done programmatically."
4. Add a 3-second GIF: Claude generating JSON → Skissify rendering it → hand-drawn floor plan appears
5. Above the fold, add the MCP badge/icon (even if MCP server isn't live yet — show intent)

**Target**: Draft copy written today. Implement next dev session.

**Why this matters**: When Google Stitch is in the conversation, Skissify needs to be unmistakably NOT a polished mockup tool. Lean into the sketch identity.

---

### Notes for Next Cycle
- Check if MCP server is live — if not, escalate to critical
- Search for "Skissify" mentions on Reddit/HN to see if the comment got traction
- Monitor Google Stitch adoption — if it starts doing hand-drawn output, reassess moat
- Explore Maket.ai API pricing for comparison

---

## 2026-03-27 (Friday) — Cycle Run 02:15 CET

### Context This Cycle
- Eraser launched MCP server + Agent Skills package (free watermarked renders, pay for clean) — direct competitor in agent diagram space
- Academic paper (arxiv Aug 2025) validates LLM → JSON → floor plan pipeline
- MCP now "standard practice" + called "shadow IT" by enterprise analysts
- EUR 2/mo viable ONLY as API Starter tier (watermark removal + clean renders)

---

### ✅ Action 1: Model Eraser's Agent Page — Create a Skissify MCP Landing Doc

**Why now**: Eraser's `eraser.io/agent-integrations` is the gold standard for developer-facing MCP launch pages. They show exact JSON config, npm install command, use cases, and FAQs. This is the format that converts developers.

**Concrete steps**:
1. Draft `docs/MCP-QUICKSTART.md` showing:
   - JSON config block: `{ "mcpServers": { "skissify": { "url": "https://skissify.com/api/mcp", "type": "http" } } }`
   - `npx skills add skissify/skissify` install line (even if not live yet — draft the intent)
   - 3 use cases: CI/CD sketch generation, floor plan from LLM, wireframe in docs
   - FAQ: "Is the MCP free?" → "Yes, watermarked. EUR 2/mo removes watermark."
2. Share this doc to validate the format before any code is written
3. This file becomes the spec for the MCP server implementation

**Target**: Written today. 45 minutes.

**Why this matters**: Writing the landing doc before building the server forces you to think like a developer user, not an implementer. Eraser clearly did this — their agent page is frictionless.

---

### ✅ Action 2: Cite the arxiv Floor Plan Paper in One Key Document

**Why now**: "Text-to-Layout: A Generative Workflow for Drafting Architectural Floor Plans Using LLMs" (arxiv.org/html/2509.00543v1) validates that LLMs generate JSON floor plan coordinates accurately. This is your technical credibility anchor.

**Concrete steps**:
1. Add citation to `docs/BUSINESS-PLAN.md` under the "Technical Moat" section: "Peer-reviewed research (2025) confirms LLMs can reliably generate JSON-structured floor plan coordinates — Skissify is the rendering layer this pipeline was missing."
2. Draft one tweet: "Academic research (2025) shows LLMs can generate JSON floor plan coordinates for walls, doors, windows, furniture. They just need a renderer. That's Skissify. [arxiv link]"
3. Save the tweet draft in `docs/marketing/SOCIAL-MEDIA.md` under "Launch Tweet Library"

**Target**: 20 minutes. Zero technical work required.

**Why this matters**: Developer audiences trust citations. One arxiv link in your HN post is worth 10 marketing sentences.

---

### ✅ Action 3: Finalize EUR 2/mo "API Starter" Tier Framing

**Why now**: Eraser's pricing model (free + watermarked, pay to clean) is the validated approach for agent-era tools. Skissify should adopt the same psychological structure. Today: write the pricing copy, not code.

**Concrete steps**:
1. Update `docs/BUSINESS-PLAN.md` pricing table to add:
   - **API Starter — EUR 2/mo**: 200 clean renders/month, no watermark, MCP server key, JSON API access
   - **Free tier**: Unlimited watermarked renders, no API key required
   - Reframe Pro at EUR 5/mo as "human tier" (UI, saves, sharing) vs EUR 2 "agent tier" (API, renders)
2. Write the one-liner for each tier:
   - Free: "Build with Skissify — watermark included"
   - API Starter EUR 2: "Your agent, your brand — clean renders, no watermark"
   - Pro EUR 5: "You + your agents — unlimited saves, private sketches, API included"
3. Add to `docs/marketing/DEMO-SCRIPTS.md`: "The EUR 2 pitch: One API key. 200 renders. Your agent stops producing watermarked floor plans. Less than a coffee."

**Target**: 30 minutes. Pricing copy only, no Stripe changes needed today.

**Why this matters**: Eraser validated this exact pricing model this week. Adapting it to Skissify's context NOW means you have a ready pitch when the MCP server ships.

---

### Notes for Next Cycle
- Check if MCP Quickstart doc was written — if not, escalate
- Monitor Eraser's agent integrations for new diagram types (if they add hand-drawn style, threat level jumps)
- Check if the arxiv tweet draft got into SOCIAL-MEDIA.md
- Search for new floor-plan.ai / Planner5D API announcements — if they add JSON output, threat level rises

---

## 2026-03-27 (Friday) — Cycle Run 03:06 CET

### Context This Cycle
- **Lucid Software** shipped an advanced MCP server + "Process Agent" — TODAY, March 27 2026
- Excalidraw closed the mindmap gap (minor) but still not in our lane
- Napkin AI API situation unclear — conflicting sources; SEO opportunity either way
- JFrog launched enterprise MCP Registry — future B2B discovery channel
- EUR 2/mo framing solidified: it's a "watermark removal + professional signal" purchase, not a feature tier
- tldraw still stagnant post-PR-drama

---

### ✅ Action 1: Use Lucid's Launch as Social Proof — Write the "Size of the Opportunity" Post

**Why today**: Lucid Software — a market leader with millions of enterprise users — just validated the exact thesis Skissify is built on: AI agents need visual output tools. This is a free credibility anchor that expires in 48 hours (news cycle).

**Concrete steps**:
1. Write a Twitter/X thread (draft in `docs/marketing/SOCIAL-MEDIA.md`):
   - Tweet 1: "Lucid Software (Lucidchart) just launched an AI 'Process Agent' with MCP. Enterprise-grade. $8-20/user/mo. Their own research: only 16% of companies have well-documented workflows."
   - Tweet 2: "The insight is universal: knowledge workers need visual AI output. Lucid built it for Fortune 500. Skissify builds it for developers and agents. JSON in → hand-drawn sketch out. EUR 2/mo."
   - Tweet 3: "If a $500M+ company is racing to make AI output visual, maybe the problem is real. [link to Lucid announcement] [link to Skissify]"
2. Post or schedule for Friday morning (peak dev Twitter time: 8-10 AM CET)
3. No need to attack Lucid — just ride the news

**Target**: Thread drafted in 20 minutes. Schedule for peak engagement.

**Why this matters**: Associating Skissify with an enterprise launch (even as the indie alternative) gives instant category credibility. "If Lucid is doing it at $20/user, why aren't you using Skissify at EUR 2?" is a clean narrative.

---

### ✅ Action 2: Start Building a JFrog/MCP Registry Listing Plan

**Why today**: JFrog's Universal MCP Registry launched this week — enterprise IT departments will use it to audit and approve MCP servers. This is the B2B discovery channel that didn't exist a week ago.

**Concrete steps**:
1. Create `docs/MCP-REGISTRY-PLAN.md` with:
   - Target registries: modelcontextprotocol.io, JFrog AI Catalog, npm registry (`@skissify/mcp`)
   - Listing requirements for each (name, description, homepage, categories, tool list)
   - Draft tool descriptions: `render_sketch` (main), `list_element_types`, `get_schema`, `render_floor_plan`
   - Security notes (no auth required for free tier, API key for Pro) — JFrog specifically evaluates this
2. This document becomes the spec for both the MCP server AND its marketplace listings
3. Takes 30-45 minutes; creates the roadmap for developer discovery

**Target**: Written today. No code required.

**Why this matters**: Being in enterprise MCP registries before competitors is worth months of marketing spend. The window is NOW while registries are forming. Lucid's announcement means enterprise IT is actively evaluating.

---

### ✅ Action 3: SEO Capture — Write "Napkin AI API Alternative" Content

**Why today**: Sources conflict on whether Napkin AI has a public API (one says yes, one says no). Either way, developers are searching for "napkin ai api" — and Skissify should intercept that traffic.

**Concrete steps**:
1. Write a 300-word blog post draft in `docs/marketing/blog/`:
   - Title: "Napkin AI API: What Developers Actually Need (And What Skissify Offers)"
   - Structure: What Napkin AI does → What it lacks (no JSON-first, no floor plans, no MCP) → What Skissify offers instead
   - End with: "If you're looking for a visual generation API your agents can call directly, try Skissify's JSON-to-sketch API. Free tier available."
2. Also add "napkin ai api" as a target keyword in `docs/marketing/SEO-STRATEGY.md`
3. This is a long-tail keyword with low competition and high intent (developers who want an API for visual generation)

**Target**: Blog draft in 30 minutes. Publish when blog system is live.

**Why this matters**: Napkin AI has strong brand recognition but weak developer API story. Developers searching for Napkin AI's API are pre-qualified Skissify buyers — they want programmatic visual generation and they're already aware the category exists.

---

### Notes for Next Cycle
- Check if the Lucid thread got drafted and posted
- Verify Napkin AI API status directly at napkin.ai/pricing — update competitor analysis accordingly
- Check if MCP Registry Plan doc was created
- Monitor if any competitor ships hand-drawn sketch output (game-changing threat)
- Confirm MCP server development progress — if still zero lines of code, escalate to critical blocker

---

## 2026-03-27 (Friday) — Cycle Run 04:04 CET

### Context This Cycle
- ExcaliDash (self-hosted Excalidraw multiplayer, Socket.IO) launched — confirms self-hosted team demand
- Thomas Thornton blog post (March 24) showing GitHub Copilot + Excalidraw MCP = live canvas from natural language — Excalidraw MCP is being actively evangelized
- MCP ecosystem described as multi-protocol (MCP + A2A + ACP) — early MCP tooling leads into future multi-agent pipelines
- SaaS micro-niche data: $49-199/mo WTP for high-pain workflows; sub-$5 impulse for friction removal
- Conversion insight: EUR 2/mo happens after pipeline integration, not before. Workflow = conversion trigger.

---

### ✅ Action 1: Write the Counter-Tutorial — "Hand-Drawn Floor Plans from Claude in VS Code"

**Why today**: Thomas Thornton's "Creating Diagrams with Excalidraw MCP" (thomasthornton.cloud) is 3 days old and gaining traction in developer communities. It's the #1 content piece for "Excalidraw MCP" right now. Skissify needs a direct content counterpart in the same format, targeting the same developer audience, showing hand-drawn floor plan output that Excalidraw MCP cannot produce.

**Concrete steps**:
1. Draft in `docs/marketing/blog/vs-code-floor-plans-tutorial.md`
2. Structure:
   - Problem: "Diagramming leaves the editor — so it never gets done"
   - Setup: Claude Desktop + Skissify MCP server config (2 lines of JSON)
   - Demo: Natural language → JSON manifest → rendered hand-drawn floor plan
   - Why Skissify vs Excalidraw: floor plan elements (walls, doors, windows), hand-drawn aesthetic, EUR 2/mo not $6-7/mo
   - Call to action: free tier link
3. Include a screenshot or GIF slot: `[SCREENSHOT: VS Code + Claude panel + Skissify sketch output]`
4. Target SEO keywords: "excalidraw mcp alternative", "claude floor plan diagram", "hand-drawn architecture diagram AI"

**Target**: Draft written today (45-60 min). Publish when MCP server ships.

**Why this matters**: The Excalidraw tutorial is the current benchmark. Skissify's tutorial needs to exist NOW — even as a draft — so it's ready to publish the same day the MCP server goes live. First-to-publish after MCP launch wins the SEO position.

---

### ✅ Action 2: Document the Self-Hosted Team Tier in Business Plan

**Why today**: ExcaliDash's traction (self-hosted Excalidraw multiplayer gaining attention) validates demand for self-hosted collaborative sketch tools. Skissify's rendering engine running locally is a natural fit for architecture firms and IP-sensitive clients. A flat-rate EUR 99/mo self-hosted tier is significantly more compelling than Excalidraw+ ($6-7/user/mo) and Miro ($20/user/mo) for small teams.

**Concrete steps**:
1. Open `docs/BUSINESS-PLAN.md`, add "Self-Hosted Team" row to the Tier Structure table:
   - **Self-Hosted Team — EUR 99/mo**: Docker image, unlimited users, local MCP server, private deployment, email support
2. Add to the Revenue Streams section under "Enterprise licenses": "Self-Hosted Team tier (EUR 99/mo flat) — Docker image for teams where data must stay on-premise. Target: architecture firms, legal, finance."
3. Update the 10,000 Users scenario to include 3 self-hosted team subscriptions (~EUR 300/mo additional MRR at that scale)

**Target**: 20 minutes. Text edits only — no product work required today.

**Why this matters**: ExcaliDash validated the demand. Skissify should have the tier documented before the first architecture firm or law firm asks about it. Better to have an answer ready than lose the deal to "we don't have a self-hosted option."

---

### ✅ Action 3: Audit: What Is the MCP Server's Current Status?

**Why today**: This is the fourth consecutive strategy cycle recommending the same action: ship the MCP server. The window is NOW. Excalidraw's MCP is being evangelized in VS Code. Lucid has an advanced MCP. Eraser has MCP + Agent Skills. The "hand-drawn sketch MCP" niche is unclaimed but only briefly.

**Concrete steps**:
1. Check if `packages/mcp/` or similar directory exists in `W:/code/skissify/`
2. If no MCP code exists at all:
   - Create `W:/code/skissify/mcp/index.ts` with the minimal skeleton: one MCP server, one tool (`render_sketch`), accepts JSON manifest, returns SVG string — nothing else
   - This can be done in under 2 hours with the existing rendering engine
3. If partial code exists:
   - Identify the single blocking issue preventing a v0.1 release
   - Write it down in `docs/MCP-REGISTRY-PLAN.md` as a tracked blocker
4. Set a deadline: **MCP server published to npm by April 3, 2026.** If that deadline is missed, the "hand-drawn sketch MCP" slot will have more competition.

**Target**: 30 minutes audit + decision. Real work can be this weekend.

**Why this matters**: Every action in these cycles flows from the MCP server not yet existing. Without it, there's no pipeline to embed Skissify in. Without the pipeline, there's no EUR 2/mo impulse buy. Without the EUR 2 buy, there's no conversion ladder to EUR 5 and EUR 20. The MCP server is the entire conversion machine.

---

### Notes for Next Cycle
- Report MCP server status: does `W:/code/skissify/mcp/` exist? Any working code?
- Check if VS Code tutorial draft was started
- Verify Self-Hosted Team tier was added to BUSINESS-PLAN.md
- Monitor for new Excalidraw MCP tutorials — track where the developer community is congregating around this topic
- Check Napkin AI pricing page directly for API availability update

---
