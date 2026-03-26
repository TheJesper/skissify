# Skissify Business Plan

**Version:** 1.0
**Date:** 2026-03-26
**Author:** Solo founder
**Status:** Draft

---

## 1. Executive Summary

Skissify is a web-based sketch tool that renders JSON input as hand-drawn-style visuals. Its core differentiator: **AI agents can create sketches programmatically** via JSON and MCP, making it the first sketch tool built for the agentic AI era.

The recommended strategy is **Open Core (Option B)** with a hybrid pricing model combining subscriptions and usage-based API billing. Target: break-even within 6 months, EUR 5K MRR within 18 months.

---

## 2. Product

### Core
- **Input:** JSON schema describing elements (line, rect, circle, arc, arrow, text, dimension, window, door, stair, etc.)
- **Output:** Hand-drawn-style SVG/canvas rendering with configurable wobble/humanness
- **Interface:** Split-pane — JSON editor left, live sketch right

### Use Cases
- Floor plans and architecture sketches
- Napkin diagrams for meetings and pitches
- Technical blueprints with dimension annotations
- AI-generated diagrams (agent creates JSON, Skissify renders)
- Documentation illustrations
- Wireframes and UI sketches

### Key Differentiators
| Feature | Excalidraw | tldraw | Miro | Mermaid | **Skissify** |
|---------|-----------|--------|------|---------|-------------|
| Hand-drawn style | Yes | Yes | No | No | **Yes (tunable)** |
| JSON-first API | No | Partial | No | Text-first | **Yes (native)** |
| MCP integration | No | No | No | No | **Yes** |
| Architectural elements | No | No | No | No | **Yes (doors, windows, stairs)** |
| Self-hostable | Yes (OSS) | Yes (SDK) | No | Yes | **Yes** |
| Programmatic generation | Limited | SDK only | API | Yes | **Yes (core design)** |

---

## 3. Market Analysis

### AI Agent Tool Market
- **2025:** USD 7.6B globally
- **2026:** USD 10.9B (projected)
- **2030:** USD 52.6B (CAGR 46.3%)
- MCP ecosystem: 34,700+ dependent npm projects, natively supported by Anthropic, OpenAI, Google, Microsoft
- MCP Registry ("app store for tools") launching — Skissify can be listed day one

### Competitive Landscape

**Excalidraw**
- Open source (MIT), 100K+ monthly active users
- Revenue: Excalidraw+ at $6-7/user/month (cloud, collab, AI features)
- Strengths: Massive community, embeddable, trusted brand
- Weakness: Not designed for programmatic/agent use, no architectural domain elements

**tldraw**
- SDK-first model, $12M funding, $40-60M valuation
- SDK 4.0: $6,000/year commercial license (controversy in community)
- Strengths: Best-in-class SDK, React-native
- Weakness: Expensive for small teams, not JSON-first

**Miro / Figma**
- Enterprise collaboration tools, $10-20/user/month
- Strengths: Full ecosystem, enterprise sales
- Weakness: Overkill for sketches, no hand-drawn aesthetic, expensive

**Mermaid**
- Text-to-diagram, OSS
- Strengths: Huge dev adoption, text-first
- Weakness: Limited visual styles, no hand-drawn, no spatial layout control

### Skissify's Niche
The intersection of: **hand-drawn aesthetics** + **programmatic JSON input** + **AI agent compatibility** + **architectural domain elements**. No competitor occupies this exact space.

---

## 4. Business Model Evaluation

### Option A: Fully Open Source (Excalidraw model)

| Dimension | Assessment |
|-----------|-----------|
| Revenue Y1 | EUR 0-2K (sponsorships only) |
| Revenue Y3 | EUR 5-20K (hosted tier adoption slow) |
| Growth | Fastest adoption, slowest monetization |
| Dev adoption | Excellent — no friction |
| Risk | High — competitors fork, hard to monetize as solo dev |
| Verdict | **Reject.** Requires VC or team to sustain. Excalidraw took years and funding to monetize. |

### Option B: Open Core (RECOMMENDED)

| Dimension | Assessment |
|-----------|-----------|
| Revenue Y1 | EUR 3-10K |
| Revenue Y3 | EUR 30-80K |
| Growth | Good adoption of free core, conversion to paid |
| Dev adoption | Good — core engine usable, SaaS adds value |
| Risk | Medium — must keep OSS core valuable enough to attract, paid features compelling enough to convert |
| Verdict | **Best fit for solo dev.** Gets community + revenue. |

**What's open:** Rendering engine, JSON schema, basic element types, CLI tool
**What's paid:** Cloud save/share, collaboration, API access (high volume), private sketches, premium element packs, MCP server hosting, enterprise SSO

### Option C: Proprietary SaaS

| Dimension | Assessment |
|-----------|-----------|
| Revenue Y1 | EUR 1-5K |
| Revenue Y3 | EUR 15-40K |
| Growth | Slow — no community amplification |
| Dev adoption | Poor — developers distrust closed sketch tools |
| Risk | Medium — full control but invisible to the OSS ecosystem |
| Verdict | **Reject.** Developer tools need open credibility. |

### Option D: Source Available (BSL/SSPL)

| Dimension | Assessment |
|-----------|-----------|
| Revenue Y1 | EUR 2-8K |
| Revenue Y3 | EUR 20-60K |
| Growth | Moderate — code visible builds trust, license prevents forks |
| Dev adoption | Moderate — some developers avoid non-OSS licenses |
| Risk | Low-medium — proven by Sentry, Grafana |
| Verdict | **Viable alternative.** Consider if open core gets forked aggressively. Fallback plan. |

---

## 5. Pricing Strategy

### Tier Structure

| Tier | Price | Target | Includes |
|------|-------|--------|----------|
| **Free** | EUR 0 | Hobbyists, students, evaluators | Public sketches, 50 saves, basic elements, watermark on exports |
| **Pro** | EUR 5/mo | Freelancers, indie devs | Private sketches, unlimited saves, 2 users, API (1,000 renders/mo), no watermark |
| **Team** | EUR 12/user/mo | Small teams | Collaboration, shared libraries, API (5,000 renders/mo), priority support |
| **Enterprise** | Custom (from EUR 200/mo) | Companies, agencies | SSO, self-hosted option, SLA, unlimited API, custom elements, dedicated support |

### API / MCP Usage Pricing

| Volume | Price |
|--------|-------|
| Included in Pro | 1,000 renders/month |
| Included in Team | 5,000 renders/month |
| Overage | EUR 0.005 per render |
| Bulk (100K+/mo) | EUR 0.002 per render |
| Enterprise | Flat rate, negotiated |

**Rationale:** Credit/usage-based pricing is the 2026 standard for AI tools. 85% of SaaS companies now use some form of usage-based pricing. Per-render pricing aligns cost with value — agents generating 10,000 sketches should pay more than a human making 10.

### Why EUR 5/mo Pro (not higher)

- Below the "expense report threshold" — individuals can pay without approval
- Matches Excalidraw+ ($6-7/user/mo) positioning
- Low enough to convert free users, high enough to sustain
- The real revenue growth comes from API usage and Team/Enterprise tiers

### One-Time Purchase Option

**Not recommended for SaaS.** However, offer a **Lifetime Deal** during launch:
- EUR 99 one-time = Pro forever (first 500 users)
- Generates upfront cash, creates evangelists
- Cap it strictly to avoid long-term revenue loss

---

## 6. Revenue Streams

### Primary (70% of revenue)
1. **SaaS subscriptions** — Pro and Team tiers
2. **API/MCP usage** — Per-render billing for agent-generated sketches

### Secondary (25% of revenue)
3. **Enterprise licenses** — Self-hosted, SSO, SLA
4. **White-label / embed licensing** — Other apps embed Skissify renderer (like tldraw's model but cheaper: EUR 500-2,000/year)

### Tertiary (5% of revenue)
5. **Marketplace** — Community-created element packs, templates (70/30 split)
6. **Consulting** — Custom element types for architecture firms, construction companies

---

## 7. Financial Projections

### Cost Structure (Monthly)

| Item | Cost |
|------|------|
| Server (existing infrastructure) | EUR 111 |
| Domain | ~EUR 1 (EUR 10/yr) |
| Email/transactional (Resend or similar) | EUR 0-20 |
| Stripe fees (2.9% + EUR 0.25) | Variable |
| Total fixed costs | **~EUR 135/mo** |

No employees, no office, no VC to repay. This is the advantage.

### Scenario Modeling

#### 100 Users (Month 3-6)
| Metric | Value |
|--------|-------|
| Free users | 80 |
| Pro users | 15 |
| Team users | 5 |
| MRR | EUR 75 + EUR 60 = **EUR 135** |
| API overage | ~EUR 10 |
| **Total MRR** | **~EUR 145** |
| Status | **Break-even** |

#### 1,000 Users (Month 9-14)
| Metric | Value |
|--------|-------|
| Free users | 750 |
| Pro users | 180 |
| Team users | 50 |
| Enterprise | 1 |
| MRR | EUR 900 + EUR 600 + EUR 200 = **EUR 1,700** |
| API overage | ~EUR 200 |
| **Total MRR** | **~EUR 1,900** |
| Status | **Sustainable side income** |

#### 10,000 Users (Month 18-30)
| Metric | Value |
|--------|-------|
| Free users | 7,500 |
| Pro users | 1,500 |
| Team users | 600 |
| Enterprise | 5 |
| Embed licenses | 3 |
| MRR | EUR 7,500 + EUR 7,200 + EUR 1,000 + EUR 1,500 = **EUR 17,200** |
| API overage | ~EUR 2,000 |
| **Total MRR** | **~EUR 19,200** |
| Annual | **~EUR 230K** |
| Status | **Full-time viable** |

### Break-Even Analysis
- Fixed costs: EUR 135/mo
- Break-even: **27 Pro subscribers** or **12 Team users**
- Timeline: **3-6 months** post-launch (realistic for a niche tool with good launch)

---

## 8. Go-to-Market Strategy

### Phase 1: Launch (Month 0-1)

**Week 1: Soft launch**
- Deploy MVP with free tier only
- Publish JSON schema documentation
- Create 10+ example sketches (floor plans, diagrams, wireframes)
- Set up public sketch gallery (SEO goldmine)

**Week 2-3: Community seeding**
- Post on Hacker News ("Show HN: Skissify — JSON to hand-drawn sketches, built for AI agents")
- Post on Reddit: r/webdev, r/selfhosted, r/programming, r/architecture
- Product Hunt launch (schedule for Tuesday)
- Tweet thread with animated GIF demos

**Week 4: Developer outreach**
- Publish MCP server to MCP Registry
- Write "How to generate floor plans with Claude + Skissify" tutorial
- Publish npm package for the rendering engine
- GitHub repo for the open-source core

### Phase 2: Growth (Month 2-6)

**Content marketing (SEO)**
- Blog posts targeting long-tail keywords:
  - "JSON to sketch converter"
  - "programmatic floor plan generator"
  - "hand-drawn diagram API"
  - "AI agent sketch tool"
  - "MCP sketch tool"
- Public gallery pages indexed by Google (each sketch = a landing page)

**Developer relations**
- Integrate with popular AI agent frameworks (LangChain, CrewAI, AutoGen)
- Provide code examples for every major LLM provider
- Sponsor/attend AI agent meetups (virtual)

**Conversion optimization**
- Enable Pro tier after 500+ free users
- A/B test pricing page
- Add "Powered by Skissify" watermark on free exports (drives organic traffic)

### Phase 3: Scale (Month 6-18)

- Launch Team tier
- Enterprise outreach (architecture firms, construction tech)
- Embed/white-label licensing
- Element marketplace
- Localization (Swedish, German, French at minimum)

---

## 9. Technical Moat

### Why This Is Hard to Clone

1. **Wobble algorithm** — The hand-drawn rendering quality is subjective and hard to replicate well. Tunable humanness parameters are a craft, not just code.

2. **Architectural element library** — Domain-specific elements (windows, doors, stairs, dimensions) require architectural knowledge to render correctly in sketch style.

3. **JSON schema design** — A well-designed, documented schema becomes a standard. Once agents are trained on it, switching costs are high.

4. **MCP-first architecture** — Being in the MCP Registry early means AI agents learn to use Skissify. Network effects compound.

5. **Gallery SEO** — Every public sketch is a unique landing page. Thousands of indexed pages create organic traffic that compounds over time.

---

## 10. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Excalidraw adds JSON API | Medium | High | Move faster on MCP + architectural elements. They optimize for humans, we optimize for agents. |
| tldraw adds MCP | Low-Medium | Medium | Our price point (EUR 5 vs $6K) targets a completely different segment. |
| Low adoption | Medium | High | Validate with HN/Reddit before building paid features. Pivot to embed-only if SaaS fails. |
| AI market hype cools | Low | Medium | The tool is useful without AI too — hand-drawn sketches have standalone value. |
| Solo dev burnout | Medium | Critical | Keep scope minimal. Automate everything. Only build what users ask for. |
| OSS core gets forked | Low | Low | Keep the valuable parts (cloud, API, collab) proprietary. BSL fallback ready. |

---

## 11. Recommended Action Plan

### Fastest Path to Revenue

```
Month 0:  Ship MVP (free tier, public gallery, JSON editor)
Month 1:  Launch (HN, PH, Reddit) + publish MCP server
Month 2:  Enable Pro tier (EUR 5/mo) + API billing
Month 3:  Lifetime deal campaign (EUR 99, cap 500)
Month 4:  Open-source rendering engine on GitHub
Month 5:  Team tier + embed licensing
Month 6:  First enterprise outreach
```

### Key Metrics to Track

| Metric | Target (Month 6) |
|--------|-----------------|
| Registered users | 1,000+ |
| MRR | EUR 500+ |
| API calls/month | 50,000+ |
| Public sketches | 5,000+ |
| GitHub stars (core engine) | 500+ |
| MCP installs | 200+ |

### Decision Gates

- **Month 3:** If <100 users → pivot to embed-only SDK model (like tldraw, but cheaper)
- **Month 6:** If <EUR 200 MRR → evaluate if product-market fit exists, consider pivoting to B2B-only
- **Month 12:** If >EUR 2K MRR → double down, consider part-time hire for support

---

## 12. Long-Term Vision (Year 3-5)

Skissify becomes the **default sketch renderer for AI agents** — the way Mermaid became the default for text-to-diagrams. Every AI coding assistant, every architecture tool, every project management AI uses Skissify's JSON schema to create visual output.

The rendering engine is open source and ubiquitous. The money comes from:
- Hosted API (pay per render)
- Enterprise self-hosted licenses
- Embed licensing for other products
- Premium element marketplace

**Ultimate moat:** The JSON schema becomes a de facto standard. Agents are trained on it. Switching costs are prohibitive.

---

## Sources

- [Excalidraw+ Pricing](https://plus.excalidraw.com/pricing) — $6-7/user/month
- [tldraw SDK 4.0 Licensing ($6K/year)](https://biggo.com/news/202509190115_tldraw_SDK_4.0_Licensing_Debate)
- [tldraw Pricing Page](https://tldraw.dev/pricing)
- [tldraw Funding: $12M total, $40-60M valuation](https://app.dealroom.co/companies/tldraw)
- [2026 Guide to SaaS, AI, and Agentic Pricing Models](https://www.getmonetizely.com/blogs/the-2026-guide-to-saas-ai-and-agentic-pricing-models)
- [SaaS Pricing Trends 2025-2026](https://www.growthunhinged.com/p/2025-state-of-saas-pricing-changes)
- [AI Agents Market: $7.6B (2025) to $52.6B (2030)](https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-15761548.html)
- [Agentic AI Market Size Forecast](https://www.precedenceresearch.com/agentic-ai-market)
- [MCP Ecosystem 2026 — 34,700+ npm dependents](https://www.contextstudios.ai/blog/mcp-ecosystem-in-2026-what-the-v127-release-actually-tells-us)
- [MCP Roadmap 2026](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/)
- [175+ SaaS Statistics 2026](https://zylo.com/blog/saas-statistics/)
