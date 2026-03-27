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
