# Five Things I Learned Building a Tool That Gives AI Agents a Pencil

*Published: April 2026 | Skissify.com*

---

Three days after launching Skissify — a JSON-to-hand-drawn-sketch API for AI agents — I have a pile of small surprises and one persistent embarrassment (the demo video, which still doesn't exist). Here are the five things that surprised me most.

---

## 1. Flat JSON beats hierarchical JSON by a factor of two

This was the technical insight that shaped the entire project.

When I first designed the Skissify schema, I made it "proper": nested groups, inherited properties, room-scoped elements. It was elegant. LLMs hated it.

First-attempt generation accuracy on hierarchical schemas: around 40–61%. LLMs consistently forgot to close groups, placed elements at wrong offsets, confused local vs global coordinates.

Flat JSON — every element is a top-level object with absolute coordinates — produced 88–92% valid output on first attempt.

The counterintuitive lesson: **design APIs for cognitive load, not logical elegance**. If you're building a tool for LLM consumption, the "correct" data structure and the "useful" data structure are different things. Make it flat. Make every field self-contained. Repeat yourself. LLMs don't care about DRY.

---

## 2. Your first users will be people you didn't build for

I built Skissify for developers building AI agent pipelines who needed a visual output format. The first three real users who messaged me:

- A D&D dungeon master using blueprint paper to generate battle maps
- A homeowner who wanted to explain their renovation to a contractor without using a full CAD tool
- A geometry teacher generating 30 practice worksheets in 10 minutes

Not a single AI pipeline developer in that first wave.

This is actually fine — great, even. It means the use case is broader than planned. But it changes your messaging. My landing page copy was aimed at developers. The people getting value were non-developers. The product works for both. The copy should acknowledge both.

**Ship before you know who your users are. The market will tell you.**

---

## 3. "Hand-drawn" is a quality signal, not just an aesthetic choice

I added the wobble algorithm because it looked better than clean lines. That was the whole reason.

Then I started noticing something in how users talked about it: the imperfection made the sketch feel *provisional*. Less polished = more open for feedback. One user explicitly told me they use Skissify for early-stage layouts specifically because it "looks like something you'd sketch on a napkin at a meeting, so people actually change things."

This is the "sketch effect" in UX research — a well-documented phenomenon where low-fidelity prototypes generate better feedback than polished designs, because the polish signals completion. I built in the wobble for aesthetics and accidentally built in psychological permission to critique.

The lesson: sometimes an aesthetic decision has an unintentional functional benefit. Pay attention to *why* users like things, not just *that* they like things.

---

## 4. A sketch URL is more useful than a sketch image

I built the share URL as a convenience feature. It's become the core value prop.

Images are static. They can't be updated, diffed, embedded programmatically, or passed between agents as state. A Skissify URL is deterministic: the same JSON input produces the same URL, which always renders the same sketch. You can version it, compare revisions by comparing URLs, and pass it as a structured artifact between pipeline steps.

This is what "visual output" for AI agents actually means. Not a pretty image. A **reproducible, versionable, linkable artifact** that represents a state of something.

I didn't plan this. I built a share URL because users want to share things. But the implication is significant: for agent pipelines, the URL is better than the image because it carries the source, not just the rendering.

---

## 5. The demo video is the highest-leverage piece of content you can make, and I still haven't made it

Three days in. The demo video still doesn't exist.

Every channel I've posted to, people ask: "Is there a video?" Every time I share the curl command, someone says: "Can I see it working?" The blog posts get engagement. The code examples get copied. But nothing closes like watching it happen in real time.

A 60-second screen capture — Claude Desktop, MCP connected, type "draw a floor plan for a small studio apartment", watch the sketch appear — would do more for distribution than everything else I've written combined.

I know this. I haven't done it. This is the embarrassment I mentioned.

If you're building a developer tool: **record the demo video on day one, not day four**. You'll spend every marketing hour after that wishing you had it. It's 20 minutes with a screen recorder. Do it before you write a single blog post.

---

## The one-paragraph version

Flat JSON beats nested JSON for LLM consumption (88% vs 40% accuracy). Your first users won't be who you expected — ship anyway. Imperfect aesthetics can have functional benefits. URLs beat images for agent pipelines because they're versioned artifacts, not static renders. And if you're launching a developer tool, the first thing you should build is the demo video. I built mine last.

---

*Skissify is a JSON-to-hand-drawn-sketch API and MCP server. Free tier at skissify.com. MCP server: `npx skissify-mcp`.*
