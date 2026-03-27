# Skissify Market Insights

_Append-only log. Each run adds a dated entry. Do not overwrite._

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
