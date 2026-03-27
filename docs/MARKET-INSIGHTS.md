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
