# Skissify Launch Plan

**Launch Date:** 2026-03-27 (Thursday)
**Product:** skissify.com — JSON to hand-drawn sketch, AI-agent compatible
**Status:** GO

---

## Pre-Launch Checklist (Tonight — March 26)

### Product Readiness
- [ ] Verify skissify.com is live and stable (test all routes: /, /editor, /pricing, /dashboard, /s/[id])
- [ ] Test free signup flow end-to-end (register → editor → save → share link)
- [ ] Test Stripe Pro checkout flow (EUR 5/mo)
- [ ] Verify MCP server works with Claude Desktop (install, create sketch, verify)
- [ ] Load all 4 demo presets and verify they render correctly
- [ ] Test public share link (save sketch → copy link → open in incognito)
- [ ] Check mobile responsiveness (at least read-only view works)
- [ ] Set up error monitoring (Sentry or similar)
- [ ] Verify OG meta tags render correctly (use https://opengraph.xyz)

### Content Preparation
- [ ] Record 3 demo GIFs (see DEMO-SCRIPTS.md):
  1. Floor plan in 30 seconds (JSON paste → sketch appears)
  2. AI agent creates sketch via MCP (screen recording of Claude doing it)
  3. Share with client (save → link → open)
- [ ] Take 5 screenshots: editor view, 4 presets (napkin, plan, blueprint, villa)
- [ ] Create OG image (1200x630): split view showing JSON→sketch
- [ ] Write and schedule all social media posts (see SOCIAL-MEDIA.md)
- [ ] Prepare Product Hunt listing (see PRODUCT-HUNT.md)
- [ ] Draft Hacker News post (see HACKER-NEWS.md)

### Accounts & Profiles
- [ ] Product Hunt maker profile updated (bio mentions Skissify)
- [ ] Twitter/X profile updated with skissify.com link
- [ ] GitHub repo for MCP server is public with good README
- [ ] Dev.to account ready

### Analytics
- [ ] Google Analytics 4 or Plausible/Umami installed
- [ ] Track key events: signup, sketch_created, sketch_shared, pro_checkout, mcp_render
- [ ] Set up Stripe dashboard alerts for new subscriptions

---

## Launch Day Schedule (March 27 — Thursday)

### 06:00 CET (00:00 PT) — Product Hunt Goes Live
- Product Hunt launches reset at midnight PT (09:00 CET)
- Have listing ready to publish at exactly 00:01 PT (09:01 CET)
- Post maker's comment immediately after launch

### 07:00 CET — Pre-HN Warm-Up
- Tweet #1: Launch announcement with demo GIF
- LinkedIn post
- Mastodon/Bluesky posts

### 09:00 CET — Product Hunt Live
- Publish Product Hunt listing
- Share PH link on Twitter: "We're live on @ProductHunt!"
- Send launch email to any existing beta users / newsletter list
- DM 10-20 people who might genuinely find it useful (not "please upvote")

### 10:00 CET — Hacker News
- Submit Show HN post (see HACKER-NEWS.md)
- Post first comment immediately with technical context
- Stay online to respond to every comment for 4+ hours

### 11:00 CET — Reddit
- Post to r/SideProject (most accepting of launches)
- Post to r/webdev (frame as "I built this" story)
- Do NOT post to multiple subreddits simultaneously (looks spammy)

### 14:00 CET — Second Wave
- Tweet #2: Technical deep-dive thread (how the wobble algorithm works)
- Post to r/artificial or r/LocalLLaMA (focus on MCP angle)
- Check HN for new comments, respond to all

### 17:00 CET — Afternoon Push
- Tweet #3: Comparison post (Skissify vs Excalidraw vs tldraw)
- Post to r/selfhosted (if MCP server is self-hostable)
- Reddit r/programming (only if HN went well — cross-audience)

### 20:00 CET — Evening Check
- Tweet #4: Share user feedback or interesting sketches
- Respond to all pending comments on PH, HN, Reddit
- Check analytics: signups, sketches created, Pro conversions

### 23:00 CET — Day 1 Wrap
- Tweet #5: Day 1 results (transparent, build-in-public style)
- Thank everyone who gave feedback
- Note top feature requests for tomorrow

---

## Week 1 (March 28 – April 2)

### Day 2 (Friday March 28)
- Publish Dev.to article: "How I Built an AI-Compatible Sketch Tool"
- Post to Indie Hackers with honest metrics
- Submit to BetaList ($129 for expedited 3-4 day featuring, or free with 2-month wait)
- Submit to AlternativeTo as alternative to: Excalidraw, tldraw, Mermaid, draw.io

### Day 3-4 (Weekend)
- Write "How to generate floor plans with Claude + Skissify" tutorial
- Post on Hashnode
- Engage with any ongoing HN/Reddit threads
- Fix bugs reported during launch

### Day 5-7
- Submit to directories: DevHunt, SaaSHub, ToolFinder, There's An AI For That
- Post MCP server to MCP Registry / npm
- Publish JSON schema documentation
- Create 10 public example sketches (SEO content)
- Write blog post: "Why AI Agents Need a Sketch Tool"

---

## Month 1 (April 2026)

### Week 2
- SEO blog posts (see SEO section): target "JSON to sketch", "programmatic floor plan"
- Create video demo for YouTube (5 min walkthrough)
- Reach out to AI/dev newsletters for inclusion
- Launch lifetime deal if traction warrants (EUR 99, cap 500)

### Week 3
- Publish npm package for rendering engine (open source core)
- Write integration guides: Claude, GPT, LangChain
- Analyze which channels drove most signups — double down

### Week 4
- Month 1 retrospective: publish transparent metrics (build-in-public)
- Evaluate: enough traction for Team tier? Enterprise interest?
- Plan Month 2 based on data

---

## Key Metrics to Track

| Metric | Day 1 Target | Week 1 Target | Month 1 Target |
|--------|-------------|---------------|----------------|
| Website visits | 500+ | 3,000+ | 10,000+ |
| Signups | 50+ | 200+ | 500+ |
| Sketches created | 100+ | 500+ | 2,000+ |
| Pro subscribers | 5+ | 20+ | 50+ |
| PH upvotes | 100+ | — | — |
| HN points | 50+ | — | — |
| MCP installs | 10+ | 50+ | 200+ |

---

## Emergency Playbook

| Issue | Action |
|-------|--------|
| Site goes down | Have a static landing page fallback ready |
| HN traffic spike crashes server | Scale up Vercel/server immediately; post "working on it" comment |
| Negative HN feedback | Stay calm, respond factually, acknowledge valid criticism |
| Zero traction | Don't panic. HN can take 2-3 attempts. Focus on content marketing |
| Stripe broken | Test checkout in production TONIGHT. Have manual invoice as backup |
| Someone finds a bug live | Fix immediately, thank them publicly |
