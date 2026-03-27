# Skissify Launch Plan

**Launch Date:** 2026-03-27 (Friday — TODAY, 00:30 CET)
**Product:** skissify.com — JSON to hand-drawn sketch, AI-agent compatible
**Status:** 🚀 LAUNCH DAY IS NOW

---

## Pre-Launch Checklist (Tonight — March 26/27)

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
- [ ] Create OG image (1200x630): split view showing JSON→sketch ("JSON in. Hand-drawn out.")
- [ ] Write and schedule all social media posts (see SOCIAL-MEDIA.md)
- [ ] Prepare Product Hunt listing (see PRODUCT-HUNT.md)
- [ ] Draft Hacker News post (see HACKER-NEWS.md)
- [x] ✅ Blog post drafts written (3 posts in docs/marketing/blog/)
- [x] ✅ Press kit created (docs/marketing/PRESS-KIT.md)
- [x] ✅ SOCIAL-MEDIA.md upgraded with viral hooks + more platforms

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

## Launch Day Schedule (March 27 — Friday)

### 06:00 CET (00:00 PT) — Product Hunt Goes Live
- Product Hunt launches reset at midnight PT (09:00 CET)
- Have listing ready to publish at exactly 00:01 PT (09:01 CET)
- Post maker's comment immediately after launch

### 07:00 CET — Pre-HN Warm-Up
- Tweet #1: Launch announcement with demo GIF (VIRAL HOOK version in SOCIAL-MEDIA.md)
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
- Post to r/SideProject (see SOCIAL-MEDIA.md for post copy)
- Do NOT post to multiple subreddits simultaneously (looks spammy)

### 14:00 CET — Second Wave
- Tweet #2: AI agent angle (Claude + MCP demo)
- Tweet #3: Technical thread on wobble algorithm
- Post to r/webdev (frame as technical "I built this" story)
- Check HN for new comments, respond to all

### 17:00 CET — Third Wave
- Tweet #4: Comparison post (Skissify vs Excalidraw vs tldraw)
- Post to r/artificial (focus on AI agent visual output angle)
- Post to r/mcp (MCP community — 74K subscribers)

### 18:00-20:00 CET — Community Posts
- Post to r/LocalLLaMA (local AI angle — MCP self-hosting)
- Discord communities: Anthropic Discord (#mcp-showcase), Indie Hackers Slack, The Changelog
- Check analytics: signups, sketches created, Pro conversions

### 23:00 CET — Day 1 Wrap
- Tweet #5: Day 1 results (transparent, build-in-public style)
- Thank everyone who gave feedback
- Note top feature requests for tomorrow

---

## Week 1 (March 28 – April 2)

### Day 2 (Saturday March 28)
- Publish Dev.to article: "I Built a Sketch Tool for AI Agents — Here's What I Learned"
- Post to Indie Hackers with honest metrics
- Submit to BetaList ($129 for expedited, or free with 2-month wait)
- Submit to AlternativeTo as alternative to: Excalidraw, tldraw, Mermaid, draw.io

### Day 3-4 (Weekend)
- Publish blog post: "How AI Agents Can Draw Floor Plans" (docs/marketing/blog/)
  → Post on Hashnode + Medium + Dev.to
- Post "Skissify vs Excalidraw" comparison blog (docs/marketing/blog/)
- Publish "Why Hand-Drawn Sketches Beat Figma" (docs/marketing/blog/)
- Engage with any ongoing HN/Reddit threads
- Fix bugs reported during launch

### Day 5-7
- Submit to directories: DevHunt, SaaSHub, ToolFinder, There's An AI For That
- Post MCP server to MCP Registry / npm
- Publish JSON schema documentation
- Create 10 public example sketches (SEO content)
- Write blog post: "Why AI Agents Need a Sketch Tool"
- Post to r/selfhosted (self-hostable angle)
- Post to r/programming (only if HN went well)

---

## Month 1 (April 2026)

### Week 2
- SEO blog posts (see SEO-STRATEGY.md): target "JSON to sketch", "programmatic floor plan", "AI floor plan generator"
- Create video demo for YouTube (5 min walkthrough of MCP + floor plan)
- Reach out to AI/dev newsletters: TLDR AI, The Rundown, Superhuman, Pointer.io
- Launch lifetime deal if traction warrants (EUR 99, cap 500)
- Publish npm package for rendering engine (open source core)

### Week 3
- Write integration guides: Claude, Claude Desktop, LangChain, Ollama
- Post comparison: "Skissify vs tldraw vs Mermaid" (expand from existing comparison blog)
- Analyze which channels drove most signups — double down

### Week 4
- Month 1 retrospective: publish transparent metrics (build-in-public)
- Evaluate: enough traction for Team tier? Enterprise interest?
- Plan Month 2 based on data

---

## Marketing Improvements (Cycle 2 — March 27, 01:00 CET)

### Completed This Cycle
- [x] ✅ Blog post #1 expanded: "Why Hand-Drawn Sketches Beat Figma" — ~1,800 words, added cognitive research, the blank canvas problem, signal problem, when-Figma-wins section
- [x] ✅ Blog post #4 NEW: "Build Your First AI Floor Plan in 15 Minutes" — step-by-step tutorial targeting Claude Desktop users, ideal for SEO + conversion
- [x] ✅ SOCIAL-MEDIA.md: Added TikTok/Reels scripts (4 videos), launch email template, newsletter outreach template with 10 prioritized targets
- [x] ✅ PRESS-KIT.md: Added newsletter/media outreach targets (Tier 1+2), directories checklist, copy-paste email pitch template

### Blog Post Distribution Plan (updated)
All 4 posts should be cross-posted:
- Day 2 (Mar 28): Tutorial post ("Build Your First...") → Dev.to first, then Hashnode
- Day 3 (Mar 29): AI floor plans post → Dev.to, Hashnode
- Day 4 (Mar 30): Skissify vs Excalidraw → Dev.to, Medium
- Day 5 (Mar 31): Hand-drawn vs Figma → Medium, Hashnode

### Short-Form Video Priority (add to Day 2-3 schedule)
- Record "The Wobble Slider" reel first — 10 seconds, no narration needed, high virality potential
- Record "AI Can Draw Now" second — use Claude Desktop screen recording
- Post both on: Instagram Reels, TikTok, YouTube Shorts, Twitter/X video
- These can drive significant organic reach with zero paid budget

---

## New Launch Ideas (added March 27)

### Virality Amplifiers
- **"Sketch of the Day"** — post one AI-generated sketch daily on Twitter (auto-generated with a creative prompt)
- **Generator challenge** — tweet "What should Claude draw next?" and sketch the top reply
- **Open schema** — publish the JSON schema as a spec so others can build integrations
- **"Wobble slider" video** — 10-second clip showing full wobble range, oddly satisfying, high share potential

### Distribution Channels Not in Original Plan
- **r/mcp** (74K subscribers — perfect audience, missed in v1 plan)
- **r/LocalLLaMA** — self-hosting + local AI angle
- **r/AI_Agents** — agent workflow angle
- **Anthropic Discord** — MCP showcase channel
- **PulseMCP.com** — MCP server directory, submit immediately
- **MCP Registry** — Anthropic's official MCP directory
- **Dev Hunt** — alternative to Product Hunt, less competitive

### Content Leverage
- All 3 blog posts written in docs/marketing/blog/ — ready to publish on Day 2-3
- Press kit in docs/marketing/PRESS-KIT.md — send to AI/dev newsletters on Day 2
- Founder can use press kit quotes verbatim in interviews

### Partnership Angles (Week 2+)
- **Claude / Anthropic** — reach out to Anthropic developer relations, Skissify is a great MCP showcase
- **Architecture software** — reach out to small architecture tools communities
- **Remote work tools** — "design your home office" use case for tools like Notion, Linear

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
| Blog views (combined) | — | 1,000+ | 5,000+ |
| MCP directory listings | 2+ | 5+ | 10+ |

---

## Emergency Playbook

| Issue | Action |
|-------|--------|
| Site goes down | Have a static landing page fallback ready |
| HN traffic spike crashes server | Scale up Vercel/server immediately; post "working on it" comment |
| Negative HN feedback | Stay calm, respond factually, acknowledge valid criticism |
| Zero traction | Don't panic. HN can take 2-3 attempts. Focus on content marketing |
| Stripe broken | Test checkout in production NOW. Have manual invoice as backup |
| Someone finds a bug live | Fix immediately, thank them publicly |
| Product Hunt gets 0 engagement | Check: did listing go live? Is maker comment posted? DM supporters |
| Reddit post removed | Check subreddit rules; reframe title if needed; try different sub |
