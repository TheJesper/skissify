# Launch Morning: It's 02:00 AM and I Can't Sleep

*April 1, 2026 — Stockholm, Sweden*

---

In four and a half hours, Skissify goes live on Product Hunt.

I've checked the server three times. I've re-read the copy. I've staged copy in browser tabs. I've done everything the playbook said. And now I'm sitting here at 02:00 AM in Stockholm, too wired to sleep, too tired to build anything new.

So I'm writing this.

---

## What I actually built

Skissify is a REST API that turns JSON into hand-drawn sketches.

That's the whole thing. You POST a description of a sketch — paper type, drawing style, an array of elements (walls, rooms, furniture, arrows, text) — and you get back an SVG that looks like something a thoughtful human sketched on a napkin.

The twist: it's designed for AI agents. Claude can use it via MCP. Any LLM can call it via HTTP. The idea is that when an AI reasons about a floor plan, or a system architecture, or a UI layout, it should be able to *draw* that — not just describe it.

That gap felt absurd to me once I noticed it. So I filled it.

---

## The April Fools thing

Yeah. I'm launching on April 1.

My original launch date was March 27. Then March 31. Then "definitely before April." And here we are.

Part of me wonders if my brain scheduled this subconsciously. There's something honest about launching on the most skeptical day of the year. If someone tries Skissify today — knowing it's April 1, knowing half the internet is lying — that person is genuinely curious. Those are exactly the users I want.

The April Fools filter is real. It works in my favor.

(Also: the product works. curl command in the README. Try it yourself.)

---

## What I'm scared of

1. The server going down at 09:00 when the PH wave hits
2. Someone finding a bug that makes the sketches look bad in a highly-upvoted comment
3. Nobody caring
4. Too many people caring before I've set up the billing properly

That last one is a good problem to have. I'll take it.

---

## What I'm excited about

Claude drawing floor plans.

I've watched it happen dozens of times in testing. You describe a home — "two bedrooms, open kitchen, south-facing balcony" — and Claude constructs JSON, calls the render tool, and a wobbly hand-drawn floor plan appears in the conversation.

It still surprises me every time. It shouldn't. I built the thing. But watching an LLM draw — actually draw, with walls and furniture and dimensions — feels like something that wasn't possible until now.

That feeling is worth shipping for.

---

## The playbook

I've prepared more marketing content for this launch than any project before. Blog posts, Reddit threads, Discord drops, newsletter pitches, Twitter threads, LinkedIn posts, TikTok scripts. A war room doc. Hourly schedules. Pre-written skeptic replies.

I don't know if any of it will matter. Most launches are won or lost on the product, not the copy.

But I've built the product. And I've written the copy. And now I'm going to sleep for four hours and wake up and press go.

If you're reading this after the launch: hi. The launch happened. Skissify is real.

If you're reading this on April 1: it's not a joke. Here's the curl command:

```bash
curl -s -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","tool":"ballpoint","wobble":{"amount":2},"elements":[{"type":"rect","x":100,"y":100,"width":200,"height":150,"label":"Living Room"},{"type":"rect","x":100,"y":280,"width":200,"height":120,"label":"Bedroom"}]}' \
  | head -3
```

You'll get SVG back. I promise.

---

*Jesper — skissify.com*
*Post-launch update will go here.*
