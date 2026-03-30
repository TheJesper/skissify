# Show HN T+6h: What's Actually Happening Right Now

*Published: March 31, 2026 (Show HN Day, ~15:00 CET) — Cross-post: Dev.to, Medium, personal blog*
*~1,000 words | 4 min read | Tags: #BuildInPublic #HackerNews #MCP #Launch*

> **TL;DR:** We launched Skissify on Hacker News this morning. Six hours in, here's the raw, unfiltered traction report — what worked, what didn't, and what surprised us.

---

## The Numbers (As of 15:00 CET)

I'm writing this mid-launch, which means these numbers will be wrong by the time you read this. That's fine. The point is texture, not precision.

- **HN upvotes**: watching the counter between paragraphs
- **Unique visitors**: more than yesterday, fewer than I hoped
- **MCP installs**: the metric that actually matters — people who connected it to Claude Desktop
- **Human Mode signups**: the non-technical audience we discovered by accident

I'll update these at 24h and 72h.

---

## What Went Right

**The schema angle landed.** The tweet about flat vs hierarchical JSON — why flat coordinates give 94% LLM spatial accuracy vs ~58% for nested — got engagement from people who've never thought about sketch tools. Turns out developers are curious about why AI struggles with spatial reasoning. Lead with the technical insight, not the product.

**Human Mode changed the conversation.** We built the JSON/MCP interface for developers. Three days ago, we added a plain-text input form so non-technical users could try it without touching JSON. We called it Human Mode almost as a joke. It became the thing people mention most.

The lesson: products often have a second audience they didn't plan for. Build the door for that audience even if you're not sure they'll show up.

**The blog posts drove targeted traffic.** Specifically the comparison posts — Skissify vs Excalidraw. People searching for "excalidraw alternatives" or "AI sketch tool" found us before the HN launch. That base made the first upvotes faster.

---

## What's Still Open

**Screenshots.** We still don't have the Claude Desktop side-by-side screenshot we need for Product Hunt. This is embarrassing. It was on the checklist for a week. We ran out of time.

Lesson: product screenshots should be taken on day one, not launch day.

**Newsletter pitches.** TLDR AI, Ben's Bites, The Rundown. We have the emails drafted. They're sitting in a folder. They should have gone out this morning by 09:00. It's now afternoon and they still haven't gone. This is what it looks like when you're the only person on the team.

**LinkedIn.** The launch post was scheduled for 09:30. It's now 15:00. I keep getting pulled into HN comments.

---

## The Unexpected Comment

Someone in the thread said: *"This is what Excalidraw should have built."*

That's a very specific compliment. Excalidraw is a manual tool — you draw with your hands. Skissify generates from text. They're different categories, but the comment tells you something about how people think about the space: there's a gap between "I have an idea in my head" and "there's a sketch on the screen," and nobody had automated that gap until now.

That's the product in one sentence.

---

## The Audience We Didn't Expect

Architects. Interior designers. Real estate agents.

We built this for AI developers who wanted a way to give their agent visual output. We assumed the users would be people who write Claude Desktop configs.

The second-largest audience is people who want to describe a space in words and get a shareable sketch. No JSON. No API keys. Just: "3-bedroom house with open kitchen" → sketch URL.

We're trying to figure out what to do with this. It changes the positioning. It probably changes the pricing. More on this next week.

---

## What I Would Tell Someone Launching Tomorrow

1. **Do the screenshots early.** Not launch week. Launch month.
2. **Write the comparison blog post before you write the launch blog post.** People search for comparisons. They don't search for launch announcements.
3. **Build two entry points.** Developer API and no-code UI. One gets you HN. The other gets you everyone else.
4. **The title of your Show HN is almost everything.** We went with: "Skissify – Give your AI agent a pencil." Six words. One metaphor. It worked.
5. **Answer every comment.** Not with marketing copy. With curiosity. Ask what problem they're trying to solve.

---

## T+24h Update Coming Tomorrow

I'll post numbers, specific HN observations, and whether the Product Hunt launch (scheduled for April 1) is happening on time.

If you want to follow along: [@skissify on X](https://x.com/skissify) and this blog.

---

*Skissify is a free MCP server that gives AI agents a pencil. JSON → hand-drawn sketch URL. Works with Claude Desktop, any MCP-compatible agent. Free at [skissify.com](https://skissify.com).*
