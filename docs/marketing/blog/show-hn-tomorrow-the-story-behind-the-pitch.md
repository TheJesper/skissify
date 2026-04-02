# Show HN Tomorrow: The Story I Almost Told Wrong

*Published: April 2, 2026 — Dev.to, Hashnode, personal Substack*
*~1,600 words | 6 min read | Tags: #BuildInPublic #ShowHN #MCPServer #AIAgents*

> **The short version:** I'm posting to Show HN tomorrow morning. This is the story behind the product — the part that doesn't fit in a title and 500 characters. The part where the users I got weren't the users I expected, and I had 48 hours to decide what that meant.

---

## The Original Pitch

When I started building Skissify, the pitch was clean and technical:

*JSON in. Hand-drawn sketch out. AI agents can draw.*

That's it. The problem I was solving: LLMs can reason about spatial layouts — floor plans, wireframes, system architectures — but their only output is text. Ask Claude to design a room and you get a paragraph. Ask it to diagram an API and you get a bulleted list. Skissify was the missing output primitive. POST a JSON manifest to `/api/render`, get back an SVG that looks like a thoughtful human sketched it on paper.

The target user: AI developers building agent pipelines. The go-to-market: MCP ecosystem, Claude Desktop, developer communities. Ship an `npx skissify-mcp`, post to Show HN, watch the builders find it.

Clean. Focused. Wrong about half of it.

---

## Launch Day

I launched on April 1.

The Product Hunt listing went live. I posted on Twitter. I sent the Hacker News "Ask HN: Feedback on my launch?" note to a few people I respect.

Then the first messages started coming in.

They weren't from AI developers.

They were from homeowners.

One person described their kitchen renovation to Claude, got a sketch in eight seconds, printed it, and showed it to their contractor. They said: *"We actually talked about the same thing for the first time."*

Another person was planning which walls to move in a 1970s bungalow. Another was trying to convince their partner that an open-plan layout would work. Another was briefing an architect on their own renovation ideas before spending €300/hour on consultation time.

None of them cared about MCP. None of them knew what a JSON manifest was. They just wanted to show someone what was in their head.

---

## The 48-Hour Decision

I had two choices.

**Option A:** Stay the course. Skissify is a developer tool. The homeowner use case is a side effect, not the product. Focus on the MCP community, Show HN, Dev.to, AI developers.

**Option B:** Pivot. Skissify is a sketch tool for anyone who needs to show someone else what they're imagining. Rebuild the positioning, target a bigger market, slow down.

I chose neither. I chose both — but differently.

The product is still a developer tool. The MCP server, the JSON API, the 14 element types with architectural symbols, the seeded wobble algorithm — that's the core. That's what makes Skissify powerful for AI agents.

But I added Human Mode in the first 48 hours. Plain text input. No JSON required. Describe your idea in normal language and Claude (or Skissify directly) translates it into a sketch. The developer got the API; the homeowner got the door.

The product didn't change. The door multiplied.

---

## What "Hand-Drawn" Actually Does

Here's the thing nobody talks about in the "AI visual output" conversation: *why does rough look better at this stage?*

It's not aesthetics. It's signaling.

When a sketch looks polished — clean lines, proper proportions, precise typography — people react to the design. They say "I don't like that font" or "the colors feel cold" or "can you make it more modern." Those are real feedback, but they're the wrong feedback at the idea stage.

When a sketch looks rough — wobbly lines, hand-scrawled labels, pencil texture — people react to the structure. They say "wait, if the kitchen is here, how does the dining room get light?" or "is this door going to block the fridge?" or "I didn't realize the hallway would feel that narrow."

That's the feedback you need before you build anything.

The "hand-drawn" output in Skissify isn't a stylistic choice. It's a communication tool. The imperfection is doing work.

This is why the renovation use case works. Homeowners aren't showing contractors a polished floor plan (that signals "this is final"). They're showing them a rough sketch (that signals "this is what I'm thinking — help me make it real"). That distinction matters enormously in a conversation where one party is about to spend €30,000 based on a shared understanding.

---

## The Technical Side (for the Show HN audience)

The wobble algorithm is seeded random — same JSON always produces the same sketch. This is a hard requirement for agent workflows where output reproducibility matters.

The Canvas 2D renderer applies perturbation at draw time (not post-processing). Every line segment is decomposed, a seeded random offset applied per control point, then reassembled as a smooth bezier. The result looks like a careful human hand rather than computer-generated noise.

There are 14 element types including architectural symbols: `door-symbol`, `door-slide`, `stair`, `opening`, `column`, `window`, `dim` (dimension lines). These aren't just rectangles with labels — they're the actual drafting symbols used in architectural drawings. An LLM can use these to produce output that a contractor or architect will immediately recognize.

The MCP server (`npx skissify-mcp`) exposes three tools: `render_sketch`, `get_manifest`, and `list_element_types`. The third tool is intentional — Claude needs to know what it can draw before it draws.

---

## Why Show HN Tomorrow

I'm posting to Show HN tomorrow (April 3, 09:00 CET) because it's the right audience for the honest conversation I want to have.

HN readers will look at the code. They'll ask hard questions about the architecture. They'll tell me if the JSON schema is wrong, if there's a better approach to the wobble, if the MCP implementation has gaps. That feedback is worth more to me right now than 1,000 upvotes on Product Hunt.

The other reason: I want to tell the homeowner story on HN and see what happens. HN is allergic to marketing, but it loves honest observation — "I built this for X and Y found it instead." That's a genuine discovery. I want to see if HN cares.

---

## The Pitch I'll Actually Post

Here's the Show HN title:

*Show HN: Skissify – JSON to hand-drawn sketch, designed for AI agents (MCP)*

And the honest lede:

*I built a sketch renderer where the primary input is JSON, not a mouse. The motivation: AI agents can reason spatially but can't output drawings. The unexpected discovery: homeowners found it before developers did.*

If that doesn't work on HN, I'll learn something. If it does, I'll learn something better.

---

## Try It

The product is live and free:

- **Web:** [skissify.com](https://skissify.com)
- **API:** `POST https://skissify.com/api/render` — no auth, no account
- **MCP:** `npx skissify-mcp` — works in Claude Desktop, Cursor, Windsurf

Human Mode is in the editor — just click "Describe it" and type your idea.

If you're a developer building agent pipelines, I'd love to know what other spatial/visual output primitives you're missing. If you're planning a renovation and want to test the floor plan use case, I'd love to know how the sketch compared to what you were imagining.

Either way — I'll be on HN tomorrow morning.

---

*Jesper / [@skissify](https://twitter.com/skissify) / Stockholm*
