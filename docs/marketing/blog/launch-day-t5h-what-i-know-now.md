# Launch Day T+5h: What I Know Now That I Didn't This Morning

*Posted April 1, 2026 — 12:00 CET — skissify.com*

---

It's noon on launch day. I've been awake since 5am. Product Hunt went live at 7. Show HN posted at 10. Reddit at 11.

Here's what 5 hours of real users taught me.

---

## The thing I got wrong: the skeptic is a gift

I expected April Fools Day to kill the launch.

I had a list of reply templates for when people said "lol April Fools." I had contingency plans for zero upvotes. I had drafted a backup "ok it was a joke" tweet in case things went sideways.

I didn't need any of it.

The skeptics showed up. They said "nice prank." And then — the weird part — a meaningful percentage of them ran the curl command anyway.

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","drawingTool":"ballpoint","elements":[{"type":"rect","x":50,"y":50,"w":200,"h":150,"label":"Is this real?"}]}'
```

And got back an SVG.

That's the conversion moment. The moment the skeptic says "wait, this actually works." That's not a user who happened to sign up. That's a user who overcame disbelief and chose to stay. That's the best user you can possibly get.

April 1 didn't hurt the launch. April 1 gave me a filter I couldn't have designed.

---

## The thing I got right: the schema

The most technical decision in Skissify was the JSON schema design. Nobody talks about this publicly, but it mattered more than the rendering algorithm.

**First schema attempt (deeply nested):**
```json
{
  "type": "rect",
  "position": { "x": 50, "y": 50 },
  "size": { "w": 200, "h": 150 },
  "style": { "stroke": "#333", "fill": "none" }
}
```

LLM first-try accuracy: ~40% across 7 models.

**After flattening:**
```json
{ "type": "rect", "x": 50, "y": 50, "w": 200, "h": 150 }
```

LLM first-try accuracy: ~94%.

Same semantic content. Completely different model behavior.

Why? I think it's three things:

1. **Fewer failure points.** Nested structures create more places for a model to be "almost right" but wrong. `position.x` typed as `x` means the whole position block breaks. With flat keys, each field is independent.

2. **Pattern density.** Models have seen millions of flat JSON objects. Deep nesting is rarer. Rarity = lower confidence = more hallucination.

3. **The tool description is part of the schema.** When I added a single working example to the MCP tool description, accuracy jumped from 94% to ~98%. Thirty tokens of example beats three hundred tokens of documentation.

This is generalizable. If you're building any tool that LLMs use, your schema ergonomics matter as much as your API behavior.

---

## The audience I didn't plan for

I built Skissify for AI agent developers.

By hour 4, I had comments from:
- A homeowner using it to sketch renovation ideas for their contractor
- A D&D dungeon master generating dungeon floor plans
- A middle school teacher who said "my students can finally visualize the math problems"

I did not write a single line of Skissify for dungeon masters or middle school teachers.

The product found them. Or they found it.

This is the thing nobody tells you about launching a primitive: primitives find their own use cases. Skissify renders hand-drawn shapes from JSON. That's almost infinitely general. The use cases I imagined (AI agents, architecture diagrams, wireframes) are correct. But they're not complete.

The homeowner who wants to show their contractor a rough floor plan without learning AutoCAD has the same problem as the AI agent that needs visual output. The problem is "I need to communicate spatial information without a design tool." The solution is the same.

I don't know yet which of these audiences will drive growth. But I'm not going to ignore any of them.

---

## The number that matters most (and it's not upvotes)

I was obsessively watching Product Hunt upvotes this morning.

Then I checked the API render count.

Every render is a person who:
1. Found Skissify
2. Understood what it does
3. Had a specific thing they wanted to sketch
4. Constructed a valid JSON payload
5. Posted it to the API

That's five high-friction steps. Anyone who completed all five is genuinely interested.

The PH upvote count is a popularity signal. The render count is a product-market fit signal. I care about the second number more.

---

## What I'm doing differently in the next 8 hours

**Discord drops at 14:00.** The communities I'm targeting (Anthropic Discord #mcp-showcase, AI Engineer Discord, LangChain/CrewAI) are builders who make decisions about tools. One enthusiastic response in a Discord channel full of the right people is worth ten Product Hunt upvotes.

**The schema post.** I'm going to write the "flat JSON vs nested JSON" post as a standalone Dev.to article, mentioning Skissify at the end. The insight is true and useful independent of my product. Dev.to will surface it. The people it reaches are exactly the audience I'm building for.

**I'm going to stop watching the numbers for a while.** The dashboard doesn't change what I should do next. The next thing is always: write the next post, drop in the next community, respond to the next comment. Watching numbers is the most productive-feeling unproductive activity in a product launch.

---

## The thing I can't know yet

Whether any of this matters in 6 months.

There's no version of this where I know today if Skissify will turn into a real business or a cool weekend project with a shelf life.

What I know is: it works. Real people ran the curl command and got back sketches. Some of them are building things with it. A dungeon master somewhere is generating floor maps for their campaign. An AI developer is adding visual output to their agent pipeline.

That's enough for today.

Tomorrow I'll check the numbers and write the retrospective.

Today I'm just going to keep responding to comments.

---

*Skissify is at [skissify.com](https://skissify.com). Free REST API. MCP server via `npx skissify-mcp`. No auth required. Try it right now.*
