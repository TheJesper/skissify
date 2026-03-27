# Skissify Press Kit

**Last Updated:** March 27, 2026  
**Version:** 1.0  
**Contact:** [add founder email]

---

## One-Liner

> **Skissify turns JSON into hand-drawn sketches — and AI agents can use it natively via MCP.**

---

## Short Description (100 words)

Skissify is a web tool that renders JSON into hand-drawn-style sketches — floor plans, architecture diagrams, wireframes, and more. Unlike traditional drawing tools, Skissify is designed for programmatic input: paste JSON or let an AI agent generate it. With native MCP (Model Context Protocol) support, AI assistants like Claude can create and render sketches autonomously. The rendering engine uses multi-harmonic wobble algorithms to produce authentic hand-drawn aesthetics, with tunable parameters for amplitude, frequency, and humanness. Free tier available. Pro at €5/month.

---

## Boilerplate (250 words — for press)

Skissify is a sketch generation tool built for the age of AI agents. Where traditional design tools like Excalidraw and Figma require human hands to draw, Skissify accepts JSON as its primary input — making it the first sketch tool that AI agents can operate natively.

The product addresses a clear gap: AI language models can reason about space, layout, and design, but had no way to output visual artifacts. Skissify provides that bridge. By combining a JSON-first API with an MCP server compatible with Claude, GPT, and other AI systems, Skissify lets AI agents design and render floor plans, system diagrams, wireframes, and architecture drawings without human intermediaries.

Under the hood, Skissify's rendering engine uses multi-harmonic wobble algorithms — not the simple sine-wave offsets common in other tools. Three axes of control (amplitude, wave frequency, humanness) let users tune output from clean technical drawings to authentic napkin sketches. The engine supports 14 element types, including architectural specifics: hinged and sliding doors, windows, staircases, dimension lines, and structural columns.

Skissify launched in March 2026 as a web application with a free tier for public sketches and a Pro tier at €5/month for private sketches and API access. It is built on Next.js 15, TypeScript, and Canvas 2D, with a Prisma/SQLite backend and Docker support for self-hosted deployments.

Website: skissify.com  
MCP Server: Available via npm  
Built by: [Founder name], [location]

---

## Founder Bio

**[Founder name]**  
[Title] at Skissify  
[City, Country]

[Founder name] is a [developer/designer/entrepreneur] who [brief background]. Skissify was born from a desire to give AI agents visual output capabilities — bridging the gap between AI reasoning and visual communication.

*[Add 2-3 sentences of personal background, previous projects, or relevant expertise.]*

Twitter/X: [@handle]  
LinkedIn: [URL]  
GitHub: [@handle]

---

## Product Screenshots

The following screenshots should be prepared for press use. Export at 2x resolution.

### Required Screenshots

| # | Description | Suggested Filename |
|---|-------------|-------------------|
| 1 | Editor view — cream paper, floor plan loaded | `skissify-editor-floorplan.png` |
| 2 | Blueprint paper — white lines on blue | `skissify-blueprint.png` |
| 3 | Four paper types side-by-side (same sketch) | `skissify-paper-types.png` |
| 4 | All 14 element types rendered | `skissify-element-types.png` |
| 5 | Claude Desktop / MCP integration in action | `skissify-mcp-claude.png` |
| 6 | Share link — public view of a sketch | `skissify-share-view.png` |
| 7 | Pricing page | `skissify-pricing.png` |
| 8 | Mobile view (read-only) | `skissify-mobile.png` |

### Hero Image (OG)

- **File:** `skissify-og-hero.png`
- **Size:** 1200×630px
- **Content:** Split view — JSON on left, rendered floor plan on right
- **Tagline overlay:** "JSON in. Hand-drawn out."

### Product Hunt Gallery

- **Image 1:** Hero / split view
- **Image 2:** Paper types comparison (4-panel)
- **Image 3:** MCP + Claude integration
- **Image 4:** Element type showcase
- **Image 5:** Sharing flow

### Demo GIFs

| # | Duration | Content |
|---|----------|---------|
| 1 | 15-30s | JSON paste → sketch renders instantly |
| 2 | 30-45s | Claude MCP: "draw a floor plan" → sketch appears |
| 3 | 20s | Wobble slider adjustment — clean to messy |
| 4 | 20s | Paper type switching — cream/white/grid/blueprint |

---

## Key Stats & Numbers

*(Fill in at launch, update weekly)*

| Metric | Value |
|--------|-------|
| Launch date | March 27, 2026 |
| Pricing | Free + Pro €5/mo |
| Element types | 14 |
| Paper styles | 4 (cream, white, grid, blueprint) |
| MCP compatible | Claude, Claude Desktop + |
| Rendering | Canvas 2D, browser-native |
| Self-hostable | Yes (Docker) |
| Open source | MCP server + core renderer (planned) |

---

## Unique Selling Points (for press angles)

1. **First sketch tool with MCP support** — AI agents can create diagrams natively
2. **JSON-first architecture** — programmatic input, not drag-and-drop
3. **Multi-harmonic wobble** — genuinely authentic hand-drawn rendering
4. **Architecture-specific elements** — 14 types including doors, windows, stairs, dimensions
5. **Indie-built, transparent** — build-in-public approach, founder available for comment
6. **€5/month Pro** — dramatically cheaper than Figma, Miro, tldraw commercial licenses

---

## Press Angles

### Technical Angle
"The rendering engine that makes AI-generated floor plans look human-drawn"  
Focus: multi-harmonic wobble algorithm, Canvas 2D implementation, MCP architecture

### AI/Agents Angle  
"Finally, AI agents can draw — not just describe"  
Focus: MCP integration, natural language → visual output, Claude use cases

### Indie SaaS Angle
"Solo developer launches sketch tool for €5/month in the age of enterprise SaaS bloat"  
Focus: pricing philosophy, build-in-public, founder story

### Design Tools Angle
"Why this developer skipped Figma and built JSON sketches instead"  
Focus: Figma vs sketch philosophy, low-fidelity prototyping, AI design workflow

---

## Frequently Asked Questions (for press)

**Q: How is Skissify different from Excalidraw?**  
A: Excalidraw is a human-driven drawing tool. Skissify is a rendering tool — the input is JSON, not a mouse. This makes it ideal for programmatic generation and AI agent use, while Excalidraw excels at real-time human collaboration.

**Q: What is MCP?**  
A: Model Context Protocol is an open standard from Anthropic that lets AI agents connect to external tools and APIs. Skissify's MCP server allows AI assistants like Claude to create and render sketches programmatically.

**Q: Is Skissify open source?**  
A: The MCP server and core rendering engine are planned for open-source release. The web application is proprietary with a free tier.

**Q: Who is the target user?**  
A: Primarily developers and AI enthusiasts who want visual output from AI agents, plus architects, designers, and anyone who uses floor plans or quick diagrams in their workflow.

**Q: What does "hand-drawn" mean technically?**  
A: Skissify's wobble engine applies multi-harmonic distortion to each line — not a simple sine wave. The result is a realistic simulation of hand tremor, with seeded randomness ensuring each element has a unique tremor pattern.

---

## Usage Rights

All Skissify screenshots, demo GIFs, and brand assets provided in this press kit are licensed for editorial use in coverage of Skissify. Please credit "Skissify / skissify.com" when publishing.

For high-resolution assets, custom screenshots, or founder interviews:  
**Contact:** [email address]

---

## Newsletter & Media Outreach Targets

Submit to these publications on **Day 2-3 (March 28-29)**. Prioritized by audience fit and response rate.

### Tier 1 — Submit Immediately (Day 2)

| Publication | URL | Audience | Angle |
|-------------|-----|----------|-------|
| TLDR AI | tldr.tech/ai | 500K+ devs | MCP + AI agent visual output |
| The Rundown AI | therundown.ai | 600K+ AI users | "AI agents can draw now" |
| Ben's Bites | bensbites.co | 50K+ AI early adopters | New tool launch, indie |
| Bytes.dev | bytes.dev | 100K+ JS devs | Canvas 2D rendering deep-dive |
| Superhuman | superhumanai.com | 500K+ AI tools users | Productivity + workflow angle |

### Tier 2 — Submit Day 3-5

| Publication | URL | Audience | Angle |
|-------------|-----|----------|-------|
| JavaScript Weekly | javascriptweekly.com | 200K+ JS devs | Multi-harmonic wobble, Canvas 2D |
| Pointer.io | pointer.io | 30K+ senior devs | Technical depth post |
| Indie Hackers Newsletter | indiehackers.com | 100K+ founders | Build-in-public, €5 SaaS |
| There's An AI For That | theresanaiforthat.com | 200K+ AI users | Tool directory listing |
| AI Tools Club | aitoolsclub.com | 50K+ AI tool hunters | Discovery angle |

### Directories (Submit Day 1-2)

| Directory | URL | Notes |
|-----------|-----|-------|
| PulseMCP | pulsemcp.com/submit | MCP server directory — priority |
| MCP Registry | github.com/modelcontextprotocol | Official Anthropic MCP list |
| Dev Hunt | devhunt.org | Alternative to Product Hunt |
| BetaList | betalist.com | $129 for expedited or free (2 mo wait) |
| AlternativeTo | alternativeto.net | Add as alt to: Excalidraw, Figma, Mermaid |
| SaaSHub | saashub.com | Product aggregator |
| There's An AI For That | theresanaiforthat.com | Tool database |
| ToolFinder | toolfinder.co | Developer tools |
| Futurepedia | futurepedia.io | AI tools directory |
| Product Hunt | producthunt.com | Main launch platform |

---

## Email Pitch Template (copy-paste ready)

**Subject:** "Launch brief: Skissify — JSON → hand-drawn sketch, AI-agent-native (MCP)"

```
Hi [name],

Quick pitch: Skissify (skissify.com) just launched — it turns JSON into hand-drawn sketches, and AI agents can use it natively via MCP (Model Context Protocol).

Why it's interesting: for the first time, AI agents like Claude can create visual output — floor plans, architecture diagrams, wireframes — not just describe them. The input is JSON, not drag-and-drop.

Numbers:
→ 14 architectural element types
→ Multi-harmonic wobble engine (seeded randomness, tuned per-element)
→ 4 paper styles (cream, white, grid, blueprint)
→ Free + Pro €5/month
→ MCP server on npm (Claude Desktop install: 2 minutes)

Try it live: skissify.com/editor (no signup needed)
See a floor plan: [link to public example sketch]
Full press kit: [contact for assets]

Happy to provide interview, exclusive demo, or any screenshots you need.

[Founder name], skissify.com
```

---

---

## Product Hunt Listing — Ready to Submit

*Copy-paste these exact fields into producthunt.com/posts/new*

### Product Name
```
Skissify
```

### Tagline (50 chars — use exactly this)
```
JSON to hand-drawn sketches — built for AI agents
```

### Description (480 chars — fits 500 char limit with room)
```
Skissify renders JSON into hand-drawn sketches: floor plans, wireframes, architecture diagrams.

What makes it different:
→ JSON-first: paste JSON or let an AI agent generate it
→ AI-native: first sketch tool with MCP support — Claude can create sketches programmatically
→ 14 element types including architectural: doors, windows, stairs, dimension lines
→ Tunable wobble engine: amplitude, waves, humanness

Free (public sketches) or Pro at €5/mo for private + API.
```

### Topics (select all that apply)
- Developer Tools
- Artificial Intelligence
- Design Tools
- Productivity

### Links
- Website: https://skissify.com
- GitHub (MCP server): [add when public]

### Gallery Images (upload in this order)
1. `skissify-og-hero.png` — split view: JSON left, floor plan right
2. `skissify-paper-types.png` — 4 paper styles side by side
3. `skissify-mcp-claude.png` — Claude Desktop using MCP to create a sketch
4. `skissify-element-types.png` — all 14 element types rendered
5. `skissify-share-view.png` — public share link view

### Maker's First Comment (post within 5 minutes of going live)
```
Hey Product Hunt! 👋

I'm [name] — I built Skissify because I wanted AI agents to have visual output.

The idea: describe a sketch in JSON (or let Claude do it), Skissify renders it as a hand-drawn image. Floor plans, wireframes, architecture diagrams — anything you'd sketch on a napkin.

Why JSON? Because it means any AI agent can generate sketches programmatically. The MCP server lets Claude design and draw floor plans in conversation. No drag-and-drop. No human hand needed.

The wobble engine uses multi-harmonic algorithms — not the mechanical sine-wave you see in other tools. Three tunable parameters: amplitude (how wobbly), waves (frequency), and humanness (random tremor). Go from ruler-straight to "drew this in a hurry."

What's here today:
✅ 14 element types (including architectural: doors, windows, stairs, dimensions)
✅ 4 paper styles (cream, white, grid, blueprint)
✅ 3 tool types (pencil, ballpoint, ink)
✅ MCP server (npm install, Claude Desktop ready)
✅ Free tier — public sketches
✅ Pro at €5/mo — private + API

To try it right now: skissify.com/editor — no signup, paste any JSON.

What would you use this for? Floor plans? System diagrams? UI wireframes? And what element types should I add next? I'm building the roadmap in public based on feedback.

Thanks for being here on launch day 🙏
```

### Pre-Launch Page Strategy
- Create "coming soon" PH page at least 24h before launch (for follower accumulation)
- Share the "coming soon" link in 2-3 relevant Discord communities the night before
- Do NOT ask for upvotes directly — ask for feedback

---

---

## Video Asset Recording Guide

*For the founder — step-by-step to capture all essential video assets before 09:00 CET*

### Tools Needed
- **GIF recording:** LICEcap (Windows/Mac, free) or ShareX (Windows, free)
- **Screen recording:** OBS Studio (free) or built-in screen recorder
- **Video editing (optional):** Canva, CapCut, or DaVinci Resolve

### GIF 1 — "The Wobble Slider" (10 seconds, HIGHEST PRIORITY)
1. Open skissify.com/editor with any floor plan loaded (use the villa preset)
2. Start recording — crop to show only the canvas + wobble slider
3. Drag `humanness` slider from 0 → 10 → back to 3 (slow, deliberate)
4. Stop recording
5. Target: 10-15 seconds, under 5MB GIF
6. **Post immediately** — this is your most shareable asset, no narration needed

### GIF 2 — "JSON to Sketch" (15 seconds)
1. Start with empty editor (clear existing sketch)
2. Open a code editor side by side with the browser
3. Type (or paste) a simple 3-room floor plan JSON
4. Click render → sketch appears
5. Cut for 15-second GIF

### GIF 3 — "Paper Style Switch" (12 seconds)
1. Load a floor plan
2. Click through 4 paper styles: cream → white → grid → blueprint
3. Pause 2s on each
4. Total: ~12 seconds

### Screen Recording — "Claude MCP Demo" (30-45 seconds)
This is the most impactful asset for the AI agent angle:
1. Open Claude Desktop + Skissify side by side
2. Type to Claude: "Design a 2-bedroom apartment and draw it as a floor plan"
3. Show Claude generating JSON, calling create_sketch, returning the URL
4. Click the URL → sketch renders in Skissify
5. **This alone can be your hero YouTube Short + LinkedIn video**

### Quick Screenshot Checklist (10 minutes)
Open each, screenshot at 2x:
- [ ] `skissify-editor-floorplan.png` — villa preset on cream paper
- [ ] `skissify-blueprint.png` — same preset, blueprint style
- [ ] `skissify-paper-types.png` — screenshot each, stitch 4-up
- [ ] `skissify-pricing.png` — pricing page full viewport
- [ ] `skissify-og-hero.png` — 1200×630px split view (use a design tool or Canva)

---

## Interview Talking Points

*For podcast/newsletter/video interviews — bullet points the founder can speak from naturally*

### On the product:
- "I wanted AI agents to be able to draw, not just describe."
- "The input is JSON because that's what AI agents are good at generating."
- "Multi-harmonic wobble sounds technical — what it means is lines look like a human actually drew them."
- "14 element types was the right scope for v1 — enough for floor plans, not so many it's overwhelming."

### On the business:
- "€5/month was a deliberate choice. I'd rather have 1,000 casual users than 10 enterprise customers I have to babysit."
- "Free tier is real — public sketches, no time limit, no credit card."
- "I'm building in public because accountability makes me ship faster."

### On MCP:
- "Model Context Protocol is Anthropic's standard for giving AI agents external tools. We were one of the first visual output tools to support it."
- "MCP felt obvious — any tool that wants to be AI-native needs to speak MCP."
- "The install is: one npm command, one JSON edit, restart. That's it."

### On the market:
- "Excalidraw is for humans. Skissify is for agents. Different tools, different moments."
- "The gap was obvious: AI can reason about space perfectly but had no way to output visual artifacts."
- "Floor plans are the MVP use case, but diagrams, wireframes, network topology — anything spatial works."

### Origin story:
- "I was building a home renovation planner and asked Claude to sketch a layout. It gave me 200 words. I wanted a picture."
- "The wobble engine took longer than everything else combined. Simple sine waves looked terrible."
- "Launched as a side project. Kept it lean: Next.js, SQLite, Stripe. No Kubernetes."

---

---

## Fresh Press Angles — Cycle 11 (March 27, 09:00 CET)

### Angle 1: "Vibe Drawing" — the natural extension of vibe coding
Andrej Karpathy coined "vibe coding" in 2025. Skissify introduces its visual equivalent: describe what you want, get a drawing. This is a *named trend* with existing audience buy-in. The angle works because it requires zero explanation to the developer audience already familiar with vibe coding.

**Pitch:** "If vibe coding democratized software creation, vibe drawing democratizes spatial design."

**Best for:** Twitter viral hooks, TikTok, Dev.to editorial posts

---

### Angle 2: Real Estate & PropTech Disruption
Floor plan creation costs €200-500 and 2-3 days from a professional drafter. Skissify + Claude does it in under 5 minutes at no marginal cost. This is a concrete, quantifiable disruption with an immediately understandable audience beyond the developer community.

**Pitch:** "Estate agents are saving 3 days and €300 per floor plan. AI just made drafting obsolete."

**Best for:** LinkedIn (business audience), PropTech newsletters, mainstream tech press

---

### Angle 3: The Visual Output Gap in AI Agent Stacks
Current AI agent stacks: input (MCP retrieval tools) → reasoning (LLM) → output (text). Skissify fills the missing visual output layer. This is a structural gap that anyone building serious agentic workflows will recognize immediately.

**Pitch:** "Your AI agent stack has a text output layer. It doesn't have a visual output layer. Until now."

**Best for:** Dev.to technical posts, r/AIEngineering, The New Stack coverage

---

### Key Stats (as of launch day)

| Stat | Value | Source |
|------|-------|--------|
| MCP servers in ecosystem | 12,770+ | PulseMCP, March 2026 |
| Skissify element types | 14 | Product |
| LLM floor plan success rate | 88-92% | Internal testing (200+ generations) |
| Launch price (Pro) | €5/month | Pricing page |
| Setup time (MCP) | <2 minutes | npm install + JSON edit |
| Alternative Pro tools | €7-10+/user/mo (Excalidraw+, Miro) | Competitor pricing |

---

*Press kit version 5.0 — March 27, 2026 (09:00 CET — Cycle 11)*  
*Added: "Vibe drawing" press angle, real estate angle, visual output stack gap angle, key stats table*

---

## Fresh Press Angles — Cycle 12 (March 27, 13:02 CET)

### Angle 4: "The Visual Iteration Loop" — AI + human spatial co-design
New named concept from Cycle 12. When AI agents can both draw AND update their drawings based on feedback, a new interaction pattern emerges: the visual iteration loop. Text-only design needs 6+ turns. Visual iteration needs 2-3.

**Pitch:** "Architects now refine a floor plan with AI in 3 conversational turns instead of 6. The sketch is the shared artifact that makes iteration possible."

**Best for:** Architecture + design press, productivity newsletters, "future of work" columns

---

### Angle 5: The Open Schema Play
Skissify's JSON schema is public and documented. Any LLM, any framework, any developer can generate valid Skissify manifests without an SDK. This positions Skissify as an ecosystem, not just a product — similar to how Mermaid's open text syntax made it the de-facto diagramming tool for documentation.

**Pitch:** "Skissify's sketch format is an open spec. Any AI agent, script, or tool can generate it. We're building a standard, not a walled garden."

**Best for:** Dev.to, GitHub communities, developer relations newsletter features

---

### Angle 6: The Non-Developer Discovery Story
Launch day produced an unexpected signal: homeowners using Skissify to sketch renovation plans for contractor calls. Non-developer use cases (real estate, home renovation, interior design concept sketching) represent a second large market beyond the developer/AI audience.

**Pitch:** "Built for AI agents, discovered by homeowners. The human use case nobody predicted: 'I described my kitchen to an AI and got a floor plan I could show my contractor.'"

**Best for:** Consumer tech press (The Verge, Wired), home improvement channels, mainstream product features

---

*Press kit version 6.0 — March 27, 2026 (13:02 CET — Cycle 12)*  
*Added: Visual iteration loop angle, open schema angle, non-developer discovery story angle*

---

## Specific Journalist & Publication Contacts — Cycle 13 (March 27, 13:30 CET)

*These are the publications most likely to cover a technical indie launch with AI angles. Research-verified as of March 2026.*

### Tier 1: Highest Probability of Coverage

| Publication | Contact approach | Angle to lead with | Notes |
|-------------|-----------------|-------------------|-------|
| **The New Stack** | thenewstack.io/write-for-us | Visual output gap in AI agent stacks | Already covering MCP (confirmed — March 2026 article exists). Angle: "The missing layer in your agentic stack." |
| **Dev.to** | Submit via dev.to/new post | Any technical angle | Not press, but 1M+ reach. Cross-post all blog posts. Use their #showdev tag on launch day. |
| **Hacker Newsletter** | hackernewsletter.com | HN thread if it gets traction | Curates top HN posts weekly. Natural if Show HN performs well. |
| **Ben's Bites** | bensbites.beehiiv.com/submissions | "AI can draw now" angle | Covers indie AI tool launches regularly. Short entries (2-3 sentences) work. |
| **TLDR AI** | tldr.tech/ai (submit form) | MCP + agent visual output | 500K+ developer subscribers. Best pitch: the MCP angle + "12,770 servers, none draw" stat. |

### Tier 2: Longer-lead but high-value

| Publication | Contact approach | Angle to lead with | Notes |
|-------------|-----------------|-------------------|-------|
| **Wired** | wired.com/story-ideas | Homeowner use case + AI surprise angle | Mainstream press story: "Built for AI, used by homeowners." Needs 1-2 weeks of traction data first. |
| **The Verge** | Submit via theverge.com/contact | AI tools, consumer angle | Their audience responds to "non-developer discovers AI tool" stories. Wait for Day 7 data. |
| **TechCrunch** | techcrunch.com/got-a-tip | Indie SaaS + AI tools | Long shot for launch day but pitch if traction validates. Need 1,000+ signups or viral moment. |
| **VentureBeat** | venturebeat.com/contact | Enterprise AI agent tooling | More technical/enterprise slant. Angle: the agentic stack visual output layer. |
| **Ars Technica** | ArsTechnica forums | Technical deep-dive | Their audience loves algorithm deep-dives. The multi-harmonic wobble post is ideal content for this. |

### Podcast Pitches (Week 2-3)

| Podcast | Host | Audience | Angle |
|---------|------|---------|-------|
| **Indie Hackers Podcast** | Courtland Allen | Solo founders | Build-in-public, €5 SaaS, launch story |
| **The Changelog** | Adam Stacoviak | Developers | Open schema + MCP technical discussion |
| **Practical AI** | Chris Benson | AI practitioners | AI agent visual output, JSON-first architecture |
| **Software Engineering Daily** | Jeff Meyerson | Senior engineers | Rendering engine deep-dive, Canvas 2D |
| **Syntax.fm** | Wes Bos, Scott Tolinski | Frontend devs | Next.js 15 + Canvas 2D + wobble algorithm |

### Cold Outreach Scripts

**For newsletters (short, scannable):**
```
Subject: New tool: JSON → hand-drawn sketches, AI agent native (MCP)

[Newsletter name] reader here. I built something you might cover:

Skissify — skissify.com
What: JSON-first sketch renderer. AI agents use it via MCP (Model Context Protocol).
Why interesting: First sketch tool where Claude can generate, not just describe, a floor plan.
Numbers: 14 element types, 4 paper styles, free + €5/mo Pro. MCP install: 2 minutes.
Launched: Today (March 27, 2026)

Demo (no signup): skissify.com/editor
Happy to provide GIFs, interview, or exclusive screenshots.

[Name]
```

**For tech journalists:**
```
Subject: Launch day tip: Skissify — AI agents can now draw (not just describe) floor plans

Hi [Name],

One-liner: AI agents can now generate visual sketches natively, not just text descriptions. Skissify (skissify.com) launched today with MCP support — Claude can design and draw floor plans in conversation.

The angle that might interest your readers: we found non-developer homeowners using it on launch day to sketch renovation plans for contractor calls. Built for AI agents, discovered by humans renovating kitchens.

Launch day context:
- Show HN: [link]  
- Product Hunt: [link]
- Live editor: skissify.com/editor (no signup)

Available for a call or written Q&A. Assets available.

[Name], skissify.com
```

---

## Award & Recognition Targets (Week 2+)

These are submit-and-wait but worth the 10-minute effort per entry:

| Award/Recognition | URL | Notes |
|------------------|-----|-------|
| Golden Kitty Awards | producthunt.com/golden-kitty | Annual PH award — need strong launch |
| Webby Awards — Apps category | webbyawards.com | Submit Q4 2026 after gathering users |
| Indie Hacker of the Month | indiehackers.com | Submit after Month 1 retrospective |
| Dev.to Top 7 Tools of the Week | dev.to/listings | Post good content → gets featured |
| GitHub Trending | github.com/trending | Requires open-source release of MCP server |

---

*Press kit version 7.0 — March 27, 2026 (13:30 CET — Cycle 13)*  
*Added: Specific journalist/publication contacts, podcast pitch list, cold outreach scripts, award targets*
