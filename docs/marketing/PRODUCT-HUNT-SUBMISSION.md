# Skissify — Product Hunt Submission Draft

**Created:** March 30, 2026 — Cycle 60
**Target:** Product Hunt (schedule for Wednesday April 1 or Thursday April 2, after Show HN)
**Note:** Don't launch PH same day as HN — split audience, split momentum. Launch PH 24-48h after.

---

## PRODUCT NAME
Skissify

## TAGLINE (60 chars max)
Give your AI agent a pencil ← USE THIS

**Alternatives:**
- The first sketch API for AI agents
- JSON in. Hand-drawn sketch out. Agent-readable.
- Your LLM can draw now

## DESCRIPTION (260 chars max — elevator pitch)
Skissify turns JSON element lists into hand-drawn sketches at permanent URLs. MCP server for Claude Desktop. REST API for any agent. 94% first-try LLM accuracy with flat schema. Human Mode: describe a room, get a floor plan.

## TOPICS (select 3-5)
- Developer Tools
- Artificial Intelligence
- Design Tools
- Productivity
- Open Source

## GALLERY ASSETS NEEDED (in priority order)
1. **Hero GIF** (600×400): Claude Desktop typing "draw me a floor plan" → sketch appears. The money shot.
2. **Human Mode screenshot**: Text input → sketch output side-by-side (desktop)
3. **Blueprint style floor plan**: The most beautiful output style
4. **MCP config**: Clean code snippet, terminal, "it worked" moment
5. **Four paper styles**: Napkin / Grid / Blueprint / Technical grid

## FIRST COMMENT (post immediately on launch)
Hi PH! 👋 I'm Jesper, founder of Skissify.

**The problem:** AI agents can generate text, code, data, and images. None of them could produce a rough sketch — the kind you'd draw on a napkin to show someone an idea.

**What we built:** A JSON-to-hand-drawn-sketch API + MCP server. Describe a room in Human Mode, or send structured JSON. Get back a permanent URL with a sketch that looks genuinely hand-drawn (deliberate wobble algorithm).

**What surprised us:** We built it for AI developers. Homeowners, dungeon masters, and geometry teachers found it without us targeting them. That's what primitives do.

**Key technical insight:** Schema design matters more than model choice for spatial tasks. Flat element list with absolute coordinates = 94% first-try LLM accuracy. Hierarchical JSON = ~58%. Same model.

**Try it now:**
→ Human Mode (no account needed): skissify.com/human
→ MCP setup: `npx @skissify/mcp-server` (in claude_desktop_config.json)
→ REST API docs: skissify.com/docs

Free tier: unlimited public sketches. Pro ($5/mo): private sketches, higher rate limits.

Ask me anything — schema design, the wobble algorithm, how the MCP integration works, why floor plans specifically.

## MAKER NOTES / STORY (for PH about section)

I started this because I wanted Claude to be able to draw a floor plan.

Not a pretty image — a rough sketch. The kind you'd do on a napkin to communicate the *idea* of a layout, not the final design.

Turns out "give an LLM a pencil" is harder than it sounds. The main challenge isn't the rendering — it's the schema design. Most JSON schemas for spatial layout cause LLMs to produce nonsense coordinates. It took 200+ test generations to find the flat element list approach that reliably gets 94% first-try accuracy.

The MCP server was a weekend project. Human Mode (plain text description → sketch) took another weekend. Now it's a real product.

The weird part: I built it for AI developers. The first three non-developer users were a homeowner making a renovation brief, a D&D dungeon master, and a geometry teacher. None of them read the developer docs.

I don't fully understand my product's audience yet. That feels like the right state to be in.

## HUNTER NOTES (to share with hunter if submitting via someone else)
- Launch Tuesday March 31 on HN (Show HN)
- PH should follow Wednesday April 1 or Thursday April 2 to catch HN overflow
- Best time to launch PH: 12:01 AM Pacific (San Francisco midnight)
- Ask hunter to have 5-10 upvotes ready from their network for the first hour
- Share preview link 24h before to warm team and early supporters

## OUTREACH FOR UPVOTES (30-person target list)

Reach out 24h before PH launch (Monday evening if launching Wednesday):

**Developer communities:**
- MCP Discord members who've tried the product
- r/ClaudeAI commenters who engaged with posts
- Mastra Discord early adopters
- Dev.to followers

**Personal network:**
- Stockholm startup community
- Previous users from the first week
- Newsletter subscribers (TLDR AI, Ben's Bites readers who replied)

**Message template:**
> Hey [name] — I'm launching Skissify on Product Hunt tomorrow. It's the sketch API I mentioned / you tried last week. Would mean a lot if you checked it out and shared your honest take: [preview link]. No pressure if it's not relevant to you.

**Do NOT:**
- Ask for upvotes explicitly (PH bans vote manipulation)
- Use a group blast — personalize each message
- Ask people who haven't tried the product

---

## CROSS-PROMOTION TIMING

| Platform | Action | Timing |
|----------|--------|--------|
| Hacker News | Show HN | Tuesday March 31, 09:00 CET |
| Product Hunt | Launch | Wednesday April 1 or Thursday April 2 |
| LinkedIn | Launch day post | Tuesday March 31 |
| Twitter/X | Show HN amplification | Tuesday March 31 all day |
| Indie Hackers | Retrospective post | Wednesday April 1 |
| Dev.to | Technical blog posts | Tuesday + Wednesday |
| r/SideProject | Launch share | Tuesday after HN |
