# Skissify Market Insights

_Append-only log. Each run adds a dated entry. Do not overwrite._

---

## Entry: March 27, 2026 — 06:09 CET | Automated Strategy Run #6

### Theme: Figma Goes Full MCP — And That's Good News for Skissify

---

#### Finding 1: Figma's Full MCP Read/Write Launch Creates a Massive Narrative Vacuum

Figma just launched `use_figma` open beta (March 25, 2026) — full AI agent read/write access to Figma canvases. Fast Company named Figma one of the Most Innovative Enterprise Companies of 2026 (March 25, 2026) citing the MCP server. Every developer is reading about "Claude Code + Figma" this week.

**What this means for EUR 2/mo Skissify WTP**:

Paradoxically, Figma's launch HELPS Skissify. Here's why:
- Figma at $15-75/editor/month targets designers. Skissify at EUR 2-5/month targets developers and agents.
- Figma MCP = "I want polished, on-brand, design-system-consistent UI output." Skissify MCP = "I want a hand-drawn sketch that looks like someone thought of an idea." These are completely different use cases.
- The influx of "Claude Code + MCP + visual output" conversations this week creates SEO demand that Skissify can capture with the right positioning

**What makes someone pay EUR 2/mo specifically in THIS moment**: A developer reads the Figma + Claude Code tutorials, tries Figma MCP, realizes their use case (quick floor plan for a client, architecture sketch for a README, informal diagram for a pitch) doesn't need Figma's complexity. They search for "simpler sketch MCP" — Skissify should be that answer. EUR 2/mo is an impulse buy compared to Figma's per-editor pricing.

**Action**: Publish content this week positioned as "The lightweight alternative to Figma MCP for developers who just need a sketch." This is the highest-traffic design-tool conversation of March 2026.

---

#### Finding 2: Developer-Built LLM-to-Floor-Plan Pipelines Are Proliferating — Without a Good Renderer

Evidence from this cycle (dev.to, 3 weeks ago): A developer tutorial showing Gemini → JSON floor plan layout → Matplotlib rendering. The comment: "Gemini parses the prompt and converts it into a structured JSON layout containing room names, dimensions, and positions."

**The Matplotlib problem**: Matplotlib renders floor plans as ugly geometric outlines. They are technically correct but visually unpresentable. This is exactly the "embarrassing output" problem that drives EUR 2/mo conversions.

**Market signal**: Developer tutorials building LLM→JSON→render pipelines are appearing organically. These developers are Skissify's most natural early adopters. They've already validated the pipeline. They just need a beautiful renderer.

**Quantified opportunity**: DEV Community has 1M+ developer readers. A single tutorial on this topic (LLM → JSON → Skissify hand-drawn floor plan) ranking on this platform drives recurring organic signups. The tutorial writes itself: "You have the JSON. Here's how to make it beautiful."

---

#### Finding 3: The Tutorial Ecosystem Is the Actual Distribution Channel for MCP Tools

New evidence from this cycle:
- 2+ community tutorials for draw.io MCP in VS Code (Medium, March 2026)
- 2+ community tutorials for Excalidraw MCP + Claude Code (WordPress, March 2026)
- Figma MCP tutorials appearing within 20 hours of the announcement (YouTube, Muzli, Reddit)

**Pattern**: MCP tool adoption correlates directly with tutorial availability. Tools that have tutorials get installed. Tools without tutorials get forgotten.

**Skissify implication**: Shipping the MCP server without tutorial content is equivalent to shipping a product and not listing it anywhere. The distribution plan must include:
1. README with GIF/video demo
2. DEV Community tutorial post
3. Medium tutorial post
4. HN Show HN post (the gold standard for developer tools)
5. YouTube short (30-60 second demo: JSON → hand-drawn floor plan in real time)

**EUR 2/mo pathway through tutorials**: Tutorial viewer → installs MCP → sees watermark in pipeline output → removes watermark → EUR 2. This is the funnel. No tutorials = no funnel.

---

#### Finding 4: Figma + Claude Code = Polished. Skissify + Claude Code = Rough. Both Are Valid.

The developer community is currently absorbing "Figma MCP = design system integration, pixel-perfect output." This creates a clean counter-positioning for Skissify.

Psychological framework:
- **Figma audience**: "I need this to look production-ready"
- **Skissify audience**: "I need this to look like an idea, not a deliverable"

The second persona is more numerous in early-stage projects, startups, developer tools, architecture firms doing client discovery, and anyone using AI to brainstorm at speed.

**EUR 2/mo trigger**: A developer is generating architecture sketches for a startup pitch. They see the Figma MCP announcement. They try it. It's too polished — looks like a mockup, not a thinking tool. They want something that signals "this is still in flux" (i.e., hand-drawn). They find Skissify. EUR 2 is the decision time: 0 seconds.

---

### Summary Signals This Cycle

| Signal | Urgency | Insight |
|--------|---------|---------|
| Figma MCP full launch — massive media coverage | HIGH | Create "lightweight Figma MCP alternative" content this week while the conversation is active |
| Gemini+Matplotlib floor plan tutorial on DEV Community | HIGH | Comment and target this developer segment directly — they need Skissify's renderer |
| Tutorial ecosystem = MCP distribution channel | CRITICAL | MCP server ship is necessary but not sufficient — 3 tutorials must ship alongside |
| Draw.io MCP gaining active community evangelism | MEDIUM | Not a threat; confirms that diagram-as-code + MCP is a real developer workflow |
| Figma $15-75/editor vs Skissify EUR 2/mo | HIGH | Use price comparison as positioning anchor in all copy |

---

## Entry: March 27, 2026 — 01:11 CET | Automated Strategy Run

### Theme: What Makes Someone Pay EUR 2/mo for Skissify?

**The EUR 2/mo question is actually the wrong question.** Here's why, and what the data says:

---

#### Finding 1: EUR 2 Is Below the "Decision Fatigue" Threshold — But That's a Double-Edged Sword

- Research consistently shows <$5/mo purchases bypass the "get approval" step for individuals
- However, EUR 2/mo also signals "not serious" to professional buyers — they may actually trust EUR 5 more
- **Insight**: EUR 2 is not a viable standalone price point. It's a "rounding error tier" that works ONLY if it unlocks something specific (e.g., private sketches, no watermark, 1 API call pack)
- **Recommendation**: Don't sell at EUR 2/mo. Instead, position EUR 5/mo Pro as the value anchor and offer a EUR 2/mo "Lite" or "Student" tier ONLY if conversion data shows abandonment at EUR 5

---

#### Finding 2: The 3 Real Reasons People Would Pay for Skissify

Based on competitor weakness analysis + MCP ecosystem growth (97M installs, March 2026):

**#1 — They need a sketch MCP and none exists with hand-drawn output**
- MCP has 97M+ installs. Agents WANT to output visuals, but have nowhere good to go
- Excalidraw's MCP exists but outputs Excalidraw format (complex JSON, not agent-friendly)
- A clean, simple MCP where any agent can say `render_sketch(json)` and get an SVG back is worth paying for
- **Willingness to pay**: API tier — EUR 0.005/render, or EUR 10-25/mo for agent-volume users
- **This is the actual money**: Not EUR 2/mo humans, but EUR 20-200/mo AI agent pipelines

**#2 — They want hand-drawn aesthetic for docs/presentations without design skill**
- Freelancers, consultants, developers writing proposals — they want "looks like a human drew this" not "looks like Figma"
- Excalidraw is free but no floor plans, no architectural elements, limited export
- Skissify with "export to SVG/PNG, no watermark" is the unlock — EUR 5/mo is impulse territory
- **Target**: Indie developers, solopreneurs, architects making napkin pitches

**#3 — Architecture firms and property startups want a floor plan API**
- Maket.ai, DesignDrafter entering the space validates this market
- No tool offers hand-drawn floor plan generation via API at reasonable cost
- Small architecture firms (5-20 people) would pay EUR 50-200/mo for an API that generates presentation-quality hand-drawn floor plans for client pitches
- **This is the B2B unlock**: not consumer subscriptions

---

#### Finding 3: Google Stitch Is a Threat to the Wrong Part of Skissify

- Google Stitch (Gemini 2.5 Pro) can now take a sketch → polished UI design → Figma/React export
- This threatens the "wireframe" use case of Skissify
- BUT: Stitch does NOT output hand-drawn style. It outputs polished mockups.
- **Skissify's protected lane**: Anyone who WANTS to look like they scribbled it on a napkin. That's a design choice, not a failure.
- **Action**: Lean harder into "sketch aesthetic as intentional style" in all messaging. "Not a Figma competitor. A presentation style."

---

#### Finding 4: tldraw Community Fragmentation Is a Recruitment Opportunity

- tldraw closed external PRs, moved toward more closed development (Feb 2026)
- Community sentiment: "Steve Ruiz closed all external PRs" — HN thread discussed OSS sustainability
- Developers who were building ON tldraw or rooting for it are now looking for alternatives
- **Skissify action**: Post in HN/Reddit threads where tldraw is discussed. Don't attack tldraw. Just be visible as "JSON-first, MCP-native, solo dev, EUR 5/mo, come help build this"
- The tldraw drama is a free PR opportunity for transparent alternatives

---

#### Finding 5: MCP Timing Is Now Critical

- 97M MCP installs as of March 2026 (digitalapplied.com)
- MCP is now "standard practice" not experimental (dev.to, March 27, 2026)
- The MCP registry ("app store for agent tools") is live and growing
- **Window of opportunity**: Q2 2026. After that, the registry will have 100s of options and discoverability drops
- **Priority action**: Ship MCP server before any other feature this month

---

#### Finding 6: Pricing Psychology for Developer Tools

- bigideasdb.com (March 2026): Best micro-SaaS ideas target users who "waste 5-10 hours/week on manual workarounds" with $49-199/mo WTP
- For Skissify, the EUR 2/mo tier doesn't map to a pain-point worth $49
- **But**: The MCP API tier (per-render or monthly) maps directly to automation pain — AI agent pipelines wasting time/money on bad visual output
- **Revised pricing thesis**: 
  - Free: hobby, watermark, 10 renders/mo
  - Pro EUR 5/mo: unlimited private saves, 500 renders, no watermark
  - API EUR 20/mo: 5,000 renders, JSON/REST access, MCP server key
  - B2B / Enterprise: EUR 99+/mo, SLA, white-label

---

### Summary Signals This Cycle

| Signal | Urgency | Action |
|--------|---------|--------|
| Google Stitch voice canvas shipped | Medium | Reframe messaging: sketch = intentional style |
| MCP hits 97M installs | CRITICAL | Ship MCP server NOW |
| tldraw community fragmentation | Medium | Appear in tldraw discussion threads |
| Maket.ai/DesignDrafter growing | Low | Monitor; validates floor plan market |
| EUR 2/mo pricing concern | High | Don't launch at EUR 2; anchor at EUR 5 |

---

## Entry: March 27, 2026 — 02:15 CET | Automated Strategy Run #2

### Theme: What Would Make Someone Pay EUR 2/mo — The Real Answer After New Data

---

#### Finding 1: EUR 2/mo Only Works as an "Agent Automation Starter" Tier

New data from this cycle: Eraser gives agent integrations **free** (watermarked) with API key required for clean output. This is a critical pricing reference point.

**What this means for EUR 2/mo:**
- EUR 2/mo is defensible ONLY as a "remove the watermark + 200 renders/mo" tier for hobby agents
- The real WTP signal from Eraser's model: developers will pay for **API key + clean output** not for a "subscription"
- **Recommendation**: Frame EUR 2/mo as "Skissify API Starter — 200 clean renders/month, no watermark, MCP-ready". This is a purchasing job-to-be-done: "I want my agent's output to look professional, not have a watermark."
- At EUR 2, the friction is near-zero for any developer running even one small agent pipeline

**The EUR 2 psychological hook:** "Less than a coffee. Cleaner output forever." — Not about features, about professional signal.

---

#### Finding 2: Eraser's Free Agent Tier Is a Distribution Strategy, Not a Business Model

Eraser returning watermarked images for free (via MCP + Agent Skills) is a land-grab, not sustainable pricing. They're betting on:
1. Developers embed it in pipelines
2. Pipelines go to production
3. Watermark becomes unacceptable → upgrade to API key

**Skissify opportunity**: Match Eraser's free-tier generosity on the MCP server. Allow free renders (watermarked). Make the API key EUR 2/mo for 200 renders or EUR 10/mo for 2,000. This is exactly the right pricing shape for agent-era tools.

---

#### Finding 3: Academic Validation Changes the Pitch

The arxiv.org paper (Aug 2025) — "Text-to-Layout: Drafting Architectural Floor Plans Using LLMs" — is a gift:
- LLMs reliably generate JSON floor plan coordinates: walls, doors, windows, furniture
- The pipeline is: `user prompt → LLM → JSON → renderer`
- Skissify IS the renderer in this academic workflow, just with hand-drawn aesthetics added
- **Pitch reframe**: "Skissify completes the LLM floor plan pipeline that academia already validated."
- Use this in developer documentation, HN launch post, and any architecture/proptech outreach
- URL to cite: https://arxiv.org/html/2509.00543v1

---

#### Finding 4: The MCP "Shadow IT" Signal Is a B2B Hook

Qualys (March 19, 2026) calling MCP "The New Shadow IT for AI" means:
- Enterprise IT departments are actively watching which MCP servers employees adopt
- If Skissify's MCP gets used in Slack/Notion/GitHub workflows, IT buyers will discover it and ask for a formal license
- **B2B motion**: Build bottom-up MCP adoption first → IT discovers it → sell enterprise license
- This is the exact PLG (Product-Led Growth) motion that made Figma enterprise-scale

---

#### Finding 5: Raster Floor Plan Generators Are Non-Competitive

AI floor plan generators (floor-plan.ai, OpenArt, Planner5D) are image-generation wrappers. They cannot be programmatically controlled, output pixel images (not structured data), have no API, and cannot be versioned or embedded.

**Skissify's moat**: The JSON manifest IS the data — versionable, diffable, embeddable, agent-readable. These tools are as unrelated to Skissify as Midjourney is to a database.

---

### Summary Signals This Cycle

| Signal | Urgency | Action |
|--------|---------|--------|
| Eraser ships MCP + Agent Skills — free + watermarked | CRITICAL | Match with Skissify MCP, frame EUR 2/mo as "clean renders" |
| Academic paper validates LLM-to-JSON-to-layout pipeline | High | Use as proof in documentation and HN launch copy |
| MCP is "standard practice" + "shadow IT" per enterprise analysts | High | Build PLG MCP → enterprise discovery funnel |
| Raster floor plan generators active but non-competitive | Low | Market validation only — not a threat |
| EUR 2/mo works ONLY as "starter API key + watermark removal" | High | Anchor Pro at EUR 5; EUR 2 = API Starter if launched |

---

## Entry: March 27, 2026 — 03:06 CET | Automated Strategy Run #3

### Theme: Enterprise Validates the Thesis — Now Lucid Is Proof the Market Is Real

---

#### Finding 1: Lucid's "Process Agent" Launch Is a Market Validation Gift

Lucid Software (Lucidchart) just announced a Process Agent that turns undocumented workflows into visual diagrams via MCP — **today, March 27, 2026**.

Key data point from Lucid's own research: **only 16% of knowledge workers** describe their company's workflows as "extremely well-documented." That's the market pain that makes visual-output AI tools valuable at every level — enterprise (Lucid's lane) AND developer/indie (Skissify's lane).

**What makes Skissify pay EUR 2/mo**: Same insight, different scale. A developer whose Claude agent produces JSON architecture diagrams or floor plans doesn't want raw JSON in a chat — they want something they can paste into a Notion doc, email to a client, or use in a pitch. A hand-drawn SVG is immediately more communicative than text. The EUR 2 unlock is "make my agent's output presentable."

**The Lucid parallel as pitch language**: "Lucid charges $8-20/user/month to make enterprise diagrams visual. Skissify is EUR 2/month for developers who want the same for their AI agent output." This is a strong anchor.

---

#### Finding 2: The "EUR 2/mo" Question Reframed Through New Evidence

Three runs of data now converge on a single answer:

> **Someone pays EUR 2/mo for Skissify when their AI agent or personal workflow produces visual output they're embarrassed to share.**

Specific triggers:
1. **The agent pipeline embarrassment trigger**: Claude generates a floor plan JSON. The developer shows it to a client. Client sees raw JSON. Developer immediately wants rendered output. EUR 2 removes the watermark and makes the SVG shareable. This is impulse territory.
2. **The "coffee money" anchor**: The micro-SaaS data (bigideasdb.com, March 2026) confirms that tools targeting workflows where people "waste 5-10 hours/week" can command $49-199/mo. Skissify at EUR 2 is so far below that threshold it requires zero deliberation. The decision isn't "is this worth EUR 2" — it's "this is $0.07/day, just buy it."
3. **The professional signal trigger**: Every developer who uses Eraser's free watermarked MCP eventually pays to remove the watermark. Skissify can clone this exact behavior. The watermark exists not to annoy but to create a decision moment: "I've embedded this in my pipeline. Do I want it looking amateur?"

**Revised EUR 2 pricing logic**:
- NOT a feature-based tier
- YES a "watermark removal + clean API renders" starter
- Frame it as: "EUR 2/mo = your agent's output looks like a professional made it"

---

#### Finding 3: Excalidraw Closed a Weakness — But Not Our Lane

Excalidraw shipped native mindmap support in recent updates, closing one of their documented gaps. This is meaningful — it shows Excalidraw is actively improving and not stagnant.

**What this does NOT change for Skissify**:
- Excalidraw still has zero architectural elements (walls, doors, windows, stairs, dimensions)
- Excalidraw's MCP/JSON is internal-format-first, not designed for clean LLM output
- Excalidraw has no API pricing model — it's free/open-source with Excalidraw+ subscription

**What to watch**: If Excalidraw adds a paid API tier or a "generate from JSON" endpoint, re-evaluate. Until then, they are improving the human-use product, not the agent-use product.

---

#### Finding 4: Napkin AI API Situation Creates a Narrative Opportunity

Sources conflict on whether Napkin AI has launched a public API. One says yes (raitly.com), one says no (creativetoolsai.com) — both March 2026.

**This is actually useful regardless**:
- If Napkin AI HAS an API: positions "text-to-visual APIs" as a category that developers are searching for. Skissify should be in that search.
- If Napkin AI does NOT have an API: Skissify can SEO-target "napkin ai api alternative" as a keyword. Developers searching for Napkin AI's API would find Skissify's JSON-to-sketch API.

**Action**: Target the keyword "napkin ai api" in Skissify's blog and documentation.

---

#### Finding 5: JFrog's Enterprise MCP Registry = Future B2B Sales Channel

JFrog launched a Universal MCP Registry (March 2026) — enterprise IT can audit and approve MCP servers. This creates a new sales motion for Skissify at the right stage:

1. Today: Get listed on modelcontextprotocol.io (free, first-mover)
2. Q3-Q4 2026: Get listed on JFrog AI Catalog MCP Registry (enterprise discovery)
3. When an IT department approves Skissify MCP for internal use → enterprise license conversation begins

This is the exact PLG → enterprise funnel. No direct sales required. The MCP server IS the top of funnel.

---

### Summary Signals This Cycle

| Signal | Urgency | Action |
|--------|---------|--------|
| Lucid launches Process Agent + MCP upgrade (TODAY) | High | Use as market proof; "Skissify is the developer-scale Lucid" |
| Excalidraw closes mindmap gap | Medium | Monitor; they're not entering our lane, just improving theirs |
| Napkin AI API conflicting reports | Medium | SEO-target "napkin ai api" as a keyword regardless |
| JFrog MCP Registry = enterprise B2B channel | Medium | Get listed on modelcontextprotocol.io now; JFrog later |
| EUR 2/mo = watermark removal + professional signal | High | Frame consistently: not a feature tier, a professional upgrade |

---

## Entry: March 27, 2026 — 04:04 CET | Automated Strategy Run #4

### Theme: Developer Workflow Integration Is the Conversion Trigger — Not Features

---

#### Finding 1: The "Workflow Integration" Insight Is the Real Conversion Model

New signal this cycle: a detailed tutorial showing GitHub Copilot + Excalidraw MCP went live (thomasthornton.cloud, March 24, 2026). The author's core insight: *"Moving diagramming back into the workflow matters more than making it faster."*

**What makes someone pay EUR 2/mo for Skissify — the workflow integration answer:**

The purchase happens when Skissify is INSIDE a working pipeline, not when someone evaluates it standalone. Sequence:
1. Developer has Claude/Copilot generating architecture/floor plan JSON (common workflow in 2026)
2. The output is useful but not shareable — it's raw JSON or a watermarked SVG
3. The developer pastes their agent's JSON into Skissify, sees a beautiful hand-drawn sketch in seconds
4. They embed Skissify into the pipeline. Now it's automatic.
5. Two weeks later: "I should just remove the watermark. EUR 2. Done."

**The EUR 2/mo payment is not a purchase decision. It's a workflow hygiene action.**

Actionable implication: build the MCP server so the pipeline is a single tool call, not a manual copy-paste step. The moment Skissify is automated in a pipeline, watermark removal becomes a no-brainer.

---

#### Finding 2: ExcaliDash's Self-Hosted Multiplayer Success = Team Opportunity

ExcaliDash (Socket.IO-based self-hosted Excalidraw multiplayer, March 2026) confirms: teams want collaborative sketch tools they can self-host.

**For Skissify**: A self-hosted team edition (Docker image, EUR 99/mo or EUR 999/year flat rate) is a validated B2B motion. No per-seat billing. For architecture firms, law firms, or IP-sensitive startups — this is an enterprise offering Excalidraw can't match (their collab is cloud-only via Excalidraw+ at $6-7/user/mo).

---

#### Finding 3: Tutorial-First Growth Is Proven and Required

Excalidraw's MCP is winning developer mindshare because advocates write workflow integration tutorials. The tutorial IS the distribution channel.

**Skissify's priority tutorial topics** (ordered by SEO/discovery value):
1. "Generate hand-drawn floor plans from Claude in VS Code" — direct counter to the Excalidraw Copilot tutorial
2. "How to add Skissify to your Claude Code workflow"
3. "Text-to-floor-plan with any LLM: the Skissify pipeline" — cites arxiv paper
4. "Napkin AI API alternative for developers"
5. "Hand-drawn architecture diagrams with GitHub Copilot"

Each tutorial ends with: "This workflow works with the free tier. Remove the watermark at EUR 2/mo."

---

#### Finding 4: SaaS Pricing Data Confirms Tier Architecture Is Psychologically Correct

bigideasdb.com (March 2026, 238K+ real complaints analyzed):
- Low-pain friction (watermarked output): sub-$5/mo impulse territory ✓
- Medium pain (5-10 hrs/week manual): $49-199/mo ✓
- Critical business process: $200+/mo negotiated

Skissify's tiers map correctly. What's missing is the PIPELINE that creates the pain. The MCP server creates the pipeline. No MCP server = no pain = no conversion.

---

#### Finding 5: A2A Protocol Emergence — Skissify as Visual Primitive in Multi-Agent Pipelines

The AI protocol ecosystem map (digitalapplied.com, March 2026, 1 week old) shows MCP + A2A + ACP + UCP as the emerging multi-agent stack. MCP handles tool calls; A2A handles agent orchestration.

**Positioning opportunity**: "Skissify is the visual rendering primitive for multi-agent pipelines." In future A2A orchestrations, any sub-agent can call Skissify via MCP to generate a visual. Being MCP-compliant today means automatic compatibility with A2A pipelines as they mature.

---

### Summary Signals This Cycle

| Signal | Urgency | Action |
|--------|---------|--------|
| Excalidraw MCP being actively evangelized in VS Code/Copilot workflows | HIGH | Write competing tutorial: hand-drawn floor plans from Claude in VS Code |
| ExcaliDash multiplayer confirms self-hosted team demand | MEDIUM | Plan EUR 99/mo self-hosted team tier for roadmap |
| Workflow integration = EUR 2/mo conversion trigger, not features | CRITICAL | MCP server → pipeline integration → watermark removal impulse buy |
| SaaS pricing data confirms tier structure | LOW | No change needed — validate with real users post-launch |
| A2A protocol emergence | LOW now → HIGH Q3 2026 | Ensure MCP architecture compatible with future A2A orchestrators |

---

## Entry: March 27, 2026 — 05:04 CET | Automated Strategy Run #5

### Theme: Declarative vs. Imperative — Skissify's JSON Manifest Is the Right Bet

---

#### Finding 1: tldraw's Desktop API Proves Imperative Is Hard — Declarative Wins for Agents

tldraw's new desktop Canvas API (shipped this week, localhost:7236) exposes structured actions: `create, update, delete, move, place, align, rotate, pen...` This is an imperative command queue — you tell the canvas what to do step by step. Compare to Skissify's JSON manifest, which describes the *finished scene* declaratively.

**Why this matters for EUR 2/mo conversion**: Agents strongly prefer declarative formats. Every LLM trained on JSON data can write a Skissify manifest in one pass. Generating tldraw action sequences requires stateful reasoning over multiple steps. This is a real technical moat. Marketing language: *"Describe the sketch once. Skissify renders it. No commands, no state, no loops."*

**Pricing implication**: API users who hit this difference (trying tldraw's API, finding it complex) are the natural conversion funnel. They'll pay for Skissify's API tier after a single frustrating experience with an imperative canvas API.

---

#### Finding 2: Free-to-Paid Conversion Reality Check (2026 Data, 200 Products)

Source: Growth Unhinged + ChartMogul report, January 2026, 200 B2B SaaS products

Key numbers that directly impact Skissify's model:
- **Median conversion: 8%** (freemium is 3–7%; best case 15%)
- **Free trial with credit card upfront: 30% conversion** — 5x without card
- **AI-native products: 43% conversion** (lower than pure SaaS at 57%)
- Most trials are **14 days** (62% of products)
- 38% of freemium products let users **try without signing up** — this significantly improves top-of-funnel

**What this means for Skissify's EUR 2/mo tier**:
At 3–7% freemium conversion, Skissify needs ~300–700 free users to find 21 paid users at EUR 2 = EUR 42/mo. That's below break-even. The math only works if the free base is large (10K+) or if the price is EUR 5+ (same conversion, more revenue per user). **EUR 2/mo Lite is not worth building unless you already have 5,000+ free users.** The correct early move is a 14-day Pro trial (no credit card) targeting EUR 5/mo conversion.

**Action trigger**: Allow sketch rendering without signup (try-before-you-create-account) to maximize freemium top-of-funnel per the 38% benchmark.

---

#### Finding 3: The Skills/MCP Virality Flywheel Is Now

GitHub trending week March 17–25 shows 5 of 15 top new repos are skills-related. `louislva/claude-peers-mcp` got 1,109 stars in its launch week (TypeScript, MCP). `VoltAgent/awesome-codex-subagents` hit 2,421 stars. Skills and MCP packages are virally shareable artifacts right now — the equivalent of `npm install some-cool-tool` from 2015.

**Implication for Skissify**: A well-packaged `@skissify/mcp` with a compelling 3-second README demo (JSON in → hand-drawn floor plan image out) can trend on GitHub right now. This is a time-limited opportunity. The MCP registry is young enough that first-movers get lasting organic placement.

**The EUR 2/mo pathway through MCP virality**:
1. Developer discovers Skissify MCP on GitHub/registry
2. Uses it free (watermarked SVG output)
3. Integrates into their AI pipeline — they now depend on Skissify
4. Watermark is visible in their output → impulse removal purchase at EUR 2–5/mo
5. API usage scales → they upgrade to EUR 10-25/mo API tier

This is the correct funnel. Not SEO → landing page → conversion. It's: MCP install → dependency → watermark friction → pay.

---

#### Finding 4: "Try Before Signup" Is the Right Default for Skissify

38% of best-performing freemium products in 2026 let users try before creating an account (vibe-coding tools like Lovable, Replit, ChatGPT set this expectation). Skissify's split-pane JSON editor → live sketch is a **perfect try-before-signup experience**. No auth, no gate. Just paste JSON, see sketch, download with watermark.

**Friction escalation ladder** (natural, not forced):
1. Paste JSON, see sketch → FREE, no signup
2. Export SVG/PNG → require signup (free tier, captures email)
3. Export without watermark → EUR 5/mo Pro
4. API access → EUR 5-25/mo Pro/API tier
5. Floor plan templates → Free (viral), MCP access → EUR 5+

---

### Summary Signals This Cycle

| Signal | Urgency | Action |
|--------|---------|--------|
| tldraw desktop API is imperative — agents will hate it | HIGH | Document Skissify's declarative JSON manifest as the smarter agent format |
| Median freemium conversion is 3-7%; EUR 2/mo is economically weak | HIGH | Price at EUR 5/mo Pro, allow try-before-signup for free |
| MCP/Skills virality peak right now (5/15 top repos this week are skills) | CRITICAL | Ship `@skissify/mcp` immediately — trend window is open |
| Try-before-signup: 38% of best freemium tools do this | MEDIUM | Remove signup gate from JSON editor; require signup only at export |
| tldraw community trust still fragile, desktop app is new | MEDIUM | Monitor tldraw desktop adoption; message Skissify as "no license fee, cloud-first, JSON-native" |

---
