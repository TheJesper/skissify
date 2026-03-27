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

## 2026-03-27 (Friday) — Cycle Run 05:04 CET

### Context This Cycle
- tldraw shipped desktop app with imperative local HTTP Canvas API (this week)
- GitHub trending: 5 of 15 top new repos are MCP/Skills — virality window is OPEN
- 2026 free-to-paid conversion data: median 8%, freemium 3–7%, credit-card trial: 30%
- EUR 2/mo math doesn't work until 5,000+ free users — EUR 5/mo Pro is the correct early anchor

---

### ✅ Action 1: Write the "Declarative vs. Imperative" Developer Post

**Why now**: tldraw's new desktop Canvas API (shipped this week) is imperative — send commands one at a time. Skissify's JSON manifest is declarative — describe the whole scene at once. This is a genuine, timely technical differentiation that developers will understand immediately.

**What to write**:
- Short dev blog post (400–600 words): *"Why AI agents prefer declarative sketch formats"*
- Core argument: Imperative APIs (tldraw actions, Excalidraw programmatic writes) require state-tracking across multiple tool calls. Declarative JSON manifest (Skissify) = one prompt, one render, done.
- Include a code snippet: Claude generating a floor plan JSON → `render_sketch` → SVG in one shot
- Target audience: developers who've hit the tldraw API or Excalidraw MCP and found it fiddly

**Post it**: Dev.to + HN comments (in any tldraw or Excalidraw MCP discussions) + Twitter/X thread
**Estimated time**: 2 hours including a real code example

---

### ✅ Action 2: Remove the Signup Gate from the JSON Editor

**Why now**: 2026 free-to-paid data confirms 38% of best freemium tools let users try before signup. Skissify's split-pane JSON editor is a perfect "try before you sign up" demo. Every user hitting a signup gate before they've seen the product is a lost conversion.

**What to change**:
- JSON editor → sketch rendering: NO auth required
- Export SVG/PNG (with watermark): require signup (captures email, creates free account)
- Export without watermark: EUR 5/mo Pro gate

**Expected impact**: Higher top-of-funnel. At 3–7% conversion from free → paid, more free users = more paid users. Every signup barrier cut increases the free user pool by an estimated 30–50% (benchmark from try-before-signup tools).

**Concrete steps**:
1. Remove auth middleware from `/api/render` endpoint (or the equivalent rendering route)
2. Add watermark to SVG/PNG output for unauthenticated renders
3. Gate the "download without watermark" button behind login/Pro check
4. Test the full flow: anonymous user → renders sketch → sees watermark → clicks "remove watermark" → signup/upgrade prompt

**Estimated time**: 3–4 hours of implementation

---

### ✅ Action 3: Create a Minimal `@skissify/mcp` npm Package Skeleton

**Why now**: MCP/Skills virality is at peak right now — 5 of 15 top trending GitHub repos this week are skills/MCP packages. `louislva/claude-peers-mcp` hit 1,109 GitHub stars in a single week. The virality window is open. A well-packaged, minimal Skissify MCP with a compelling README demo can trend.

**Minimum viable MCP server**:
```json
{
  "name": "@skissify/mcp",
  "tools": [
    {
      "name": "render_sketch",
      "description": "Render a Skissify JSON manifest as a hand-drawn SVG",
      "input": { "manifest": "JSON object describing sketch elements" },
      "output": "SVG string or URL"
    }
  ]
}
```

**Steps**:
1. Create `W:/code/skissify/packages/mcp/` directory
2. `npm init` + `@modelcontextprotocol/sdk` dependency
3. Implement `render_sketch` tool — call the local Skissify render engine
4. Write a 10-line README with a GIF demo: `claude → JSON manifest → hand-drawn floor plan`
5. Publish to npm with `public` access
6. Submit to modelcontextprotocol.io/registry

**Estimated time**: 4–6 hours for a working v0.1 (transport only, no cloud auth needed yet)

**Why this is the highest ROI action this week**: MCP install → pipeline dependency → watermark annoyance → EUR 5/mo upgrade. This is the entire revenue funnel, and it starts here.

---

### Notes for Next Cycle
- Did we write the declarative vs. imperative post? Link if yes.
- Is the signup gate removed from the JSON editor?
- Does `W:/code/skissify/packages/mcp/` exist with working code?
- tldraw desktop: monitor GitHub star velocity — if it's gaining traction fast, accelerate the "vs tldraw" messaging
- Check if any Skissify MCP competitors emerge in the registry (search "hand-drawn" or "sketch" in MCP registry)

---

## 2026-03-27 (Friday) — Cycle Run 06:09 CET

### Context This Cycle
- **BREAKING**: Figma opened canvas to AI agents via `use_figma` MCP open beta (March 25-27, 2026) — massive media wave. Fast Company named Figma most innovative enterprise company 2026. Claude Code, Codex, Cursor all now write to Figma.
- **New signal**: Google Gemini + Matplotlib floor plan pipeline tutorial on DEV Community (3 weeks ago) — developers building LLM→JSON→render pipelines without a good renderer. Skissify IS that renderer.
- **Confirmed**: Tutorial ecosystem is THE distribution channel for MCP tools. Excalidraw and draw.io gaining adoption purely through community tutorials, not product launches.
- **URL**: https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/ (20 hours ago)
- **URL**: https://dev.to/bindupautra_jyotibrat/building-an-ai-floor-planner-with-google-gemini-and-matplotlib-5c5d

---

### ✅ Action 1: Write a Counter-Narrative Post While "Figma + Claude Code" Is Trending

**Why now**: Figma's `use_figma` MCP launch is the highest-traffic developer design conversation of March 2026. Every developer is reading about Claude Code + Figma MCP. Skissify needs to appear in this conversation with a clear differentiation, or be invisible during the biggest design-tool moment of Q1 2026.

**The post to write** (choose one, do today):
- **Option A (Twitter/X thread)**: "Figma + Claude Code is great — if you need pixel-perfect, design-system-linked output. But sometimes you want something rougher. A sketch. An idea. Something that says 'this is still in flux.' That's Skissify. EUR 2/mo. Hand-drawn SVG from any AI agent. No design system required."
- **Option B (DEV Community post)**: "Figma MCP vs Skissify MCP: When you want polished vs. when you want a napkin sketch" — 500 words, include code examples for both, conclude with when to use each
- **Option C (LinkedIn)**: Professional angle — "Not every diagram needs to be Figma-polished. Architecture firms, startups in discovery, PMs in planning mode: hand-drawn aesthetic signals 'this is draft, let's talk.' Skissify is the MCP that outputs that."

**Target**: Option A written and posted TODAY. Option B scheduled for next dev session.

**Expected impact**: Appears in Google searches for "Claude Code Figma alternative" and "Figma MCP sketch." Medium to high potential for developer retweets given Figma MCP is trending.

**Success metric**: Any organic shares or replies asking "what's Skissify?"

---

### ✅ Action 2: Comment on the Gemini + Matplotlib Floor Plan Tutorial on DEV Community

**Why now**: A developer tutorial on DEV Community shows Google Gemini generating JSON floor plans rendered via ugly Matplotlib charts. This developer and their readers are the exact Skissify user — they have the LLM pipeline, they just don't have a beautiful renderer. This is a free, targeted, non-spammy distribution channel.

**URL**: https://dev.to/bindupautra_jyotibrat/building-an-ai-floor-planner-with-google-gemini-and-matplotlib-5c5d

**Comment to write** (verbatim or close):
> "Nice pipeline! The JSON layout step is the hard part — Gemini nails it. If you want to try a hand-drawn rendering layer instead of Matplotlib, I built Skissify (skissify.com) for exactly this. Takes the same JSON structure and outputs an SVG that looks like someone sketched it by hand. Free tier available, might be fun to compare the output styles."

**Why this works**:
- Not spam — it genuinely adds value to the reader
- Places Skissify in front of readers already building LLM-to-floor-plan pipelines
- DEV Community articles index well on Google — this comment will be visible for years
- The Matplotlib output is objectively ugly — Skissify's hand-drawn style is a compelling upgrade

**Time required**: 15 minutes to write and post the comment.

**Success metric**: Any clicks to skissify.com from the comment = winning. Even 10 visits from a genuinely interested developer segment is high-quality traffic.

---

### ✅ Action 3: Write a "Skissify MCP Tutorial" Doc in the Repo (Even if MCP Isn't Live Yet)

**Why now**: Every MCP tool that gains traction has a community tutorial. Excalidraw MCP has 4+ tutorials written by developers. Draw.io MCP has 3+. Figma MCP had tutorials within 20 hours of launch. The tutorial is the distribution. Skissify needs to own its own tutorial before the community writes a worse one.

**What to write** (`docs/MCP-TUTORIAL.md`):

```markdown
# How to Generate Hand-Drawn Floor Plans with Claude Code + Skissify MCP

## Setup
\`\`\`json
// Claude Desktop config
{
  "mcpServers": {
    "skissify": {
      "url": "https://skissify.com/api/mcp",
      "type": "http"
    }
  }
}
\`\`\`

## Step 1: Ask Claude to describe the floor plan
"Generate a 2-bedroom apartment floor plan in Skissify JSON format, 65 sqm, living room facing south"

## Step 2: Claude calls render_sketch
[Claude generates JSON → calls render_sketch → returns hand-drawn SVG URL]

## Step 3: Embed or download the sketch
The SVG is publicly shareable, embeddable in Notion/docs, and downloadable.
```

**Why write docs before the MCP is live**: This doc becomes the spec for the implementation AND the tutorial that's ready to publish on launch day. Writing tutorials first is how great dev tool teams ship with instant traction.

**Time required**: 45 minutes to write a thorough tutorial doc.

**Success metric**: Tutorial is ready to publish to DEV Community and HN on the day the MCP server ships.

---

### Notes for Next Cycle
- Was the Figma counter-narrative post published? Link if yes.
- Was the DEV Community comment posted? Screenshot/link it.
- Does `docs/MCP-TUTORIAL.md` exist?
- Monitor: does the "Figma MCP alternative" keyword start showing Skissify in search?
- Check if any developers in the Gemini + floor plan DEV Community thread respond to the Skissify comment

---
