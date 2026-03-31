# PH Comment Response Playbook — Launch Day

*Internal: Not published. Use as reference for live comment responses.*
*Last updated: Cycle 73 — April 1, 2026 launch morning*

---

## Golden Rules for PH Comments

1. **Reply within 5 minutes** of every comment during the first 2 hours
2. **Never copy-paste.** Personalize each reply. PH algorithm rewards authentic engagement.
3. **Add value** — link to the relevant doc, demo, or use case
4. **Convert skeptics gently.** They're actually your best users.
5. **Ask one question back** to drive conversation threads

---

## Response Templates by Comment Type

### "Is this a joke? April Fools?"

> Ha — genuinely not. Though the date did filter out the tire-kickers, which has been... surprisingly useful.
>
> Try it: skissify.com/human — type any space description, get a sketch in 2 seconds. The hand-drawn aesthetic isn't random: rough = draft = people give honest feedback instead of pixel-level critique.
>
> What would you use a quick sketch layer for?

---

### "How is this different from Excalidraw?"

> Great question — I wrote about this. Short version:
>
> Excalidraw: you draw, manually, with your hands
> Skissify: you describe in text (or your AI agent does), it generates
>
> They're not competing. Excalidraw is a drawing tool. Skissify is a generation tool with a hand-drawn *output format*.
>
> The real comparison is Skissify vs "the text description your agent was going to return instead." Text is not a sketch. The sketch is more useful.

---

### "Why hand-drawn? Why not clean SVG?"

> Intentional. Hand-drawn signals "this is a draft." When something looks polished, people critique the polish instead of the idea.
>
> Show a perfect Figma mockup in a meeting: you get comments about font choices.
> Show a rough sketch: you get comments about whether the layout solves the problem.
>
> The roughness is the feature.

---

### "I'm an architect / interior designer — can I use this?"

> Yes — Human Mode was built for exactly this. skissify.com/human, no account needed.
>
> Describe the space: "open plan kitchen-dining, island with seating, south-facing windows" → sketch in 2 seconds.
>
> Would love to know what you're working on — we've had architects using it for client quick-sketch conversations.

---

### "How does the MCP integration work?"

> One tool call: `skissify_sketch` with a text description → returns a URL with the sketch.
>
> Your agent can embed that URL in markdown, pass it to another agent, include it in a report. It persists.
>
> Full MCP setup: `npx skissify-mcp` and add to your claude_desktop_config.json. Docs: [link]

---

### "This is cool but I don't use AI agents"

> Human Mode exists for you: skissify.com/human
>
> No agents, no API, no account. Just describe a space and get a sketch. Interior designers, architects, UX people, D&D dungeon masters — they all use the human mode.
>
> The AI native features are on top. The core is: text in, sketch URL out.

---

### "94% accuracy claim — how are you measuring that?"

> Good catch — here's the full context:
>
> We tested a set of standard prompts against the JSON schema. "First-try accuracy" = the rendered sketch matches the described layout without needing correction or retry.
>
> With nested JSON (early version): ~61%.
> With flat JSON (current): ~94%.
>
> The measurement is against our test suite. We're not claiming universal LLM benchmark accuracy — we're saying: if you send a standard room description, it'll render correctly 94% of the time without the agent needing to retry.

---

### Upvote request template (for DMs to supporters)

> Hey [name], launching Skissify on PH today — it's the sketch layer for AI agents. If you have a minute to check it out and upvote, I'd really appreciate it. It's the tool that lets AI agents *draw*, not just describe. [link]
>
> (And if you hate it, tell me why. That's useful too.)

---

## Conversation Starters to Post as Comments

**Post these yourself to drive early threads:**

1. *"Curious what use cases people see beyond floor plans. We've had UX wireframes, org charts, site maps, D&D dungeons. What would you sketch?"*

2. *"The roughness is intentional. Rough sketches get honest feedback. Polished mockups get pixel critique. The aesthetic is a product decision. Anyone else use this trick?"*

3. *"The 'sketch layer' concept: text / code / data / image — and now spatial. What's missing from the AI stack that you'd want next?"*

---

## When Things Go Wrong

**If traffic spikes and the site is slow:**
> "We're seeing more traffic than expected — working on it. For anyone waiting: the API is at [fallback URL] and human mode is cached at [CDN URL]."

**If the April 1 skepticism gets loud:**
> "Fair. April 1 was a deliberate bet. The people who check twice to confirm it's real? Those are the ones we built it for. The filter is the funnel."

**If a competitor shows up in comments:**
> Acknowledge them directly. "We're fans of [tool] too — different jobs to be done. [Tool] does X, we do Y. Happy to compare properly." Never trash-talk.

---

*Last updated: Cycle 73 — March 31, 2026 04:58 CET*
