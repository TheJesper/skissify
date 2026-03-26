# Skissify — SEO Strategy

---

## Target Keywords

### Primary Keywords (high intent, moderate competition)
| Keyword | Monthly Volume (est.) | Difficulty | Priority |
|---------|----------------------|------------|----------|
| json to sketch | Low (emerging) | Low | P0 — own this term |
| programmatic sketch generator | Low | Low | P0 |
| hand drawn diagram generator | Medium | Medium | P0 |
| ai sketch tool | Medium | High | P1 |
| json to diagram | Medium | Medium | P1 |
| mcp sketch tool | Low (emerging) | Low | P0 — own this term |

### Secondary Keywords (content marketing targets)
| Keyword | Monthly Volume (est.) | Content Type |
|---------|----------------------|-------------|
| floor plan generator online | High | Landing page + blog |
| hand drawn floor plan | Medium | Blog + gallery |
| sketch to code alternative | Medium | Blog (comparison) |
| excalidraw alternative | Medium | Blog (comparison) |
| tldraw alternative | Low-Medium | Blog (comparison) |
| draw.io alternative | Medium | Blog (comparison) |
| text to sketch | Medium | Blog |
| api for generating diagrams | Medium | Docs + blog |
| napkin sketch tool | Low | Blog |
| hand drawn wireframe tool | Medium | Blog |
| ai floor plan generator | High | Blog + landing page |
| mcp tools for ai agents | Medium (growing) | Blog |

### Long-Tail Keywords (blog post targets)
- "how to generate floor plans with ai"
- "programmatic hand drawn diagrams"
- "json schema for floor plans"
- "claude mcp sketch tool"
- "ai agent visual output"
- "hand drawn style svg generator"
- "wobble algorithm for sketches"
- "canvas 2d hand drawn rendering"
- "react sketch component json"

---

## Meta Descriptions for Key Pages

### Homepage (skissify.com)
```
Title: Skissify — JSON to Hand-Drawn Sketches | AI Agent Compatible
Description: Turn JSON into beautiful hand-drawn sketches. Floor plans, diagrams, wireframes — rendered with tunable wobble. First sketch tool with MCP support for AI agents. Free to use.
```

### Editor (skissify.com/editor)
```
Title: Sketch Editor — Skissify | JSON to Hand-Drawn Visuals
Description: Paste JSON on the left, get a hand-drawn sketch on the right. 14 element types, 4 paper styles, tunable wobble. No drawing skill needed.
```

### Pricing (skissify.com/pricing)
```
Title: Pricing — Skissify | Free Tier + Pro at EUR 5/mo
Description: Free for public sketches. Pro at EUR 5/month for private sketches, sharing with 2 users, and API access. No credit card required for free tier.
```

### MCP/API Documentation
```
Title: MCP Server — Skissify | AI Agent Sketch Integration
Description: Connect AI agents to Skissify via MCP (Model Context Protocol). Claude, GPT, and other AI assistants can create hand-drawn sketches programmatically.
```

### Gallery (future — each sketch is a page)
```
Title: [Sketch Name] — Hand-Drawn Sketch | Skissify Gallery
Description: View this hand-drawn [type] sketch created with Skissify. Rendered from JSON with tunable wobble and humanness. Create your own at skissify.com.
```

---

## Blog Post Ideas (First 10)

### Launch Week (Posts 1-3)
1. **"Introducing Skissify: JSON to Hand-Drawn Sketches"**
   - Launch announcement, what it does, who it's for
   - Target: "json to sketch", "hand drawn diagram generator"

2. **"How to Generate Floor Plans with Claude + Skissify"**
   - Step-by-step MCP setup, prompt examples, output screenshots
   - Target: "ai floor plan generator", "claude mcp tools"

3. **"The Wobble Algorithm: How Skissify Makes Lines Look Hand-Drawn"**
   - Technical deep-dive, math, code snippets, visual comparisons
   - Target: "hand drawn rendering algorithm", "canvas wobble effect"

### Month 1 (Posts 4-7)
4. **"Skissify vs Excalidraw: When to Use Which"**
   - Honest comparison, different use cases
   - Target: "excalidraw alternative"

5. **"5 Things You Can Build with a JSON Sketch API"**
   - Floor plans, wireframes, architecture docs, data viz, AI-generated art
   - Target: "api for generating diagrams"

6. **"How to Create Wireframes from JSON Without Any Design Skills"**
   - Tutorial with JSON examples and rendered outputs
   - Target: "hand drawn wireframe tool", "wireframe generator"

7. **"What Is MCP and Why Your AI Agent Needs a Sketch Tool"**
   - Explain MCP, show integration, future of AI+visual tools
   - Target: "mcp tools for ai agents"

### Month 2 (Posts 8-10)
8. **"From Text to Floor Plan: Using AI Agents to Design Spaces"**
   - Real workflow: describe apartment → AI generates JSON → Skissify renders
   - Target: "ai floor plan generator", "text to floor plan"

9. **"The JSON Schema for Architectural Sketches"**
   - Documentation-style post about the element schema
   - Target: "json schema for floor plans"

10. **"Why I Built Skissify: The Problem with Existing Sketch Tools"**
    - Founder story, build-in-public, problem-solution narrative
    - Target: brand awareness, backlinks

---

## Technical SEO Checklist

- [ ] All pages have unique title tags (under 60 chars)
- [ ] All pages have meta descriptions (under 160 chars)
- [ ] OG tags set for all pages (og:title, og:description, og:image)
- [ ] Twitter card meta tags (twitter:card, twitter:title, twitter:description, twitter:image)
- [ ] Canonical URLs set
- [ ] sitemap.xml generated and submitted to Google Search Console
- [ ] robots.txt allows crawling of all public pages
- [ ] Structured data (JSON-LD) for: WebApplication, SoftwareApplication
- [ ] Page speed: aim for 90+ Lighthouse score
- [ ] All images have alt text
- [ ] Internal linking: every blog post links to editor and pricing
- [ ] 404 page with link to homepage and editor

---

## Gallery SEO Strategy (High Impact)

Every public sketch becomes an indexed page at `skissify.com/s/[id]`.

Each page should have:
- Title: sketch name or auto-generated description
- Meta description from sketch content
- OG image: rendered sketch as PNG
- Structured data: CreativeWork schema
- "Create your own" CTA linking to /editor

**Why this matters:** 1,000 public sketches = 1,000 unique landing pages, each targeting long-tail keywords. This is how Canva, CodePen, and similar tools built massive organic traffic.

---

## Backlink Strategy

### Easy wins (submit/list):
- Product Hunt listing
- AlternativeTo (list as alternative to Excalidraw, tldraw, Mermaid, draw.io)
- BetaList
- SaaSHub
- DevHunt
- GitHub Awesome lists (awesome-mcp-tools, awesome-drawing-tools)
- MCP Registry

### Content-driven backlinks:
- Technical blog posts that HN/Reddit share organically
- Dev.to / Hashnode cross-posts
- Tutorial posts that other bloggers reference
- Open source rendering engine on GitHub (README links back to skissify.com)

### Outreach (month 2+):
- AI/dev tool newsletters (TLDR, ByteByteGo, JavaScript Weekly)
- "Best of" roundup posts for sketch/diagram tools
- Architecture/design tool comparison sites
