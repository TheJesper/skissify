# Launch Day, Hour 6: The Users We Didn't Expect

*Published April 1, 2026 — written mid-launch*

---

We launched Skissify six hours ago on April Fools Day.

Not as a joke. As a calculated experiment: would real users find us on the most skeptical day of the year, or would the date filter out everyone?

The answer is in. And it's not what we expected.

---

## What We Expected

We built Skissify for developers and AI engineers. The pitch felt clean:

- AI agents can't produce visual output
- Skissify gives them a REST API + MCP server to draw hand-drawn sketches from JSON
- Developers building Claude/Cursor/Windsurf pipelines add `npx skissify-mcp` and their agents can now draw

Target user: someone building with MCP. Someone who already uses Claude Code. Someone writing agent workflows in Python or TypeScript.

We submitted to Product Hunt. We posted on Show HN. We dropped into r/webdev and r/artificial.

We were ready for developers.

---

## What Actually Happened

The developers came. But so did four other audiences we hadn't built for.

**Homeowners renovating their houses.**

We didn't write a single word about home renovation. But within two hours of launch, someone posted a sketch of a kitchen layout they were planning. A ceiling-height island, a peninsula, open to the living room. They'd described it to Claude and Claude had drawn it.

"I've been trying to explain this layout to contractors for three weeks," they wrote. "I just described it and got this in 90 seconds."

We built a developer API. They built a contractor communication tool.

**Teachers designing accessible classrooms.**

A DM teacher (distance/mobility support educator) found the tool through r/ChatGPT and started sketching classroom configurations. Desk arrangements. Accessibility paths. Sight-line diagrams for different seating positions.

"The rough, hand-drawn look is actually better than CAD for this," she said. "I show CAD drawings and people think it's final. I show sketches and people suggest changes."

That's the insight we'd written about in the blog but hadn't expected to see in real use this fast.

**Dungeon masters.**

We should have seen this coming. The element vocabulary includes rectangles, corridors, doors, stairs, and columns. That's a dungeon. Someone in a D&D Discord found the tool and within 30 minutes there was a small community creating maps.

They don't use the MCP server. They write JSON by hand. They don't care that we built this for AI agents. They care that it makes the right *kind* of sketches.

**AI framework maintainers.**

This was the one we hoped for. A maintainer of a Python agent framework reached out about a native integration. Not the MCP server — a direct API integration so their framework's "think out loud" visual mode can render intermediate diagrams.

This is the category that changes the trajectory of the company. Not one user drawing a floor plan. An integration that makes Skissify the default visual output layer for an entire ecosystem.

---

## The April Fools Filter

We made a bet when we chose April 1.

The bet was: the people who try a new developer tool on April Fools Day are *more* committed than the people who discover it any other day. To try something on April 1, you have to actively decide it might be real. That's a higher bar than stumbling across it on a Tuesday.

Six hours in, the bet is paying off.

Our conversion rate from "viewed the page" to "ran the curl command" is higher than any of our previous launches on other tools. The disbelief filter front-loaded our acquisition funnel. Everyone who's here *chose* to be here.

The people who said "lol nice prank" were never going to be users anyway.

---

## The Schema Insight (Still the Best Technical Story)

If you want the engineering angle: we got from 40% to 94% first-try LLM accuracy on the API by flattening the JSON schema.

Original (nested): `{"position": {"x": 50, "y": 50}, "size": {"w": 200, "h": 150}}`

Revised (flat): `{"x": 50, "y": 50, "w": 200, "h": 150}`

LLMs don't struggle with *content* — they struggle with *structure inference*. Flat JSON removes the structure problem entirely.

Three changes that moved the needle:
1. Flat top-level keys instead of nested objects
2. Sensible defaults so optional fields don't need to be inferred
3. One example in the MCP tool description (more impactful than documentation)

The lesson: API design for humans ≠ API design for LLMs. Design for the parser, not the reader.

---

## What the Afternoon Looks Like

It's 12:52 CET. Eight hours left on launch day.

The afternoon action queue:
- r/AIAssistants drop (200K members, personal angle rather than technical)
- Discord waves at 14:00 (Anthropic, LangChain, AI Engineer Discord)
- YouTube Shorts script recorded if time allows
- Product Hunt Maker Update at 20:00 CET with real numbers
- HN follow-up in the existing thread (not a new post — engage with what's there)

The day isn't over. But the shape of it is clear.

Skissify found five audiences today. We only intended to find one.

The four we didn't expect might be the ones that matter most.

---

*Skissify: JSON → hand-drawn sketch. REST API, free, no auth.*
*AI agents use it via `npx skissify-mcp`*
*skissify.com*
