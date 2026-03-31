# Skissify Launch Day Newsletter Email

*Send to your list on April 1, 2026 at 07:00 CET*

---

## Subject Line Options (A/B test these)

### High-open-rate options:
- **"I taught Claude to draw. Here's what happened."** ← best performer
- **"Skissify is live — the AI sketch tool launches today"**
- **"You asked what I've been working on. Today it launches."**
- **"[Launch] JSON → hand-drawn sketches — and Claude can do the drawing"**
- **"Today: my weirdest/best project goes live on Product Hunt"**

### April Fools angle (risky but memorable):
- **"Yes this is real. No it's not an April Fools joke."**
- **"April 1st seemed like the perfect day to launch. Here's why."**

**Recommendation:** Use "I taught Claude to draw. Here's what happened." — the curiosity gap is strong and doesn't require the reader to already know the product.

---

## Launch Day Email (Send April 1 at 07:00 CET)

**Subject:** I taught Claude to draw. Here's what happened.

---

Hey,

Quick one — I'm launching today.

For the past few months I've been building **Skissify**: a tool that turns JSON into hand-drawn sketches. Floor plans, wireframes, diagrams, napkin ideas — described as data, rendered as something that looks like a thoughtful human grabbed a pen.

The weird part: **AI agents can use it directly.**

Here's how it works:

1. You describe a layout to Claude
2. Claude writes the JSON (it's good at this)
3. Skissify renders a hand-drawn sketch in under 200ms

No Figma. No mouse. No design skills required.

**Why this matters:**

Every design tool assumes a human is operating it. But AI agents can't click around in Figma. They can't drag shapes in Miro. Skissify is the first sketch tool where the AI is a first-class citizen — not an afterthought.

**Try it right now (takes 30 seconds):**

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","wobble":2,"elements":[
    {"type":"wall","x1":50,"y1":50,"x2":350,"y2":50},
    {"type":"door","x":150,"y":50,"width":80,"rotation":0}
  ]}'
```

You'll get an SVG back immediately. Free. No auth. No signup.

**Three ways to use it:**

→ **Human Mode** (no JSON needed): [skissify.com/human](https://skissify.com/human)
→ **REST API** (developers): POST to `https://skissify.com/api/render`  
→ **Claude/MCP**: `npx skissify-mcp` in your config — Claude can draw for you

---

If you like what you see, an upvote on Product Hunt would mean the world. Solo launch, no team, no funding — just me and a lot of coffee.

**→ [Product Hunt listing]**

I launched on April Fools' Day on purpose. If you're skeptical: just try the API. It works. ✏️

Talk soon,
Jesper

*P.S. The hand-drawn wobble is intentional. Rough sketches get better feedback than polished mockups. I built the imperfection in.*

---

*Skissify · Stockholm, Sweden · [Unsubscribe]*

---

## Pre-Launch Email (Send TONIGHT — March 31 at 20:00 CET)

**Subject:** Tomorrow I launch. (Here's what it is.)

---

Hey,

Quick heads up — I'm launching Skissify tomorrow on Product Hunt.

Here's the one-sentence pitch: **You describe a sketch as JSON, POST it to an API, and get back a hand-drawn SVG that looks like a human drew it.**

Claude can do the JSON part. So: tell Claude what to draw → Skissify draws it.

No UI. No mouse. No design experience.

**The free API is live right now** if you want to try before the launch:
→ https://skissify.com/api/render (no auth, no limits)

Tomorrow morning (07:00 CET) I'll send you the full launch email with examples, the Product Hunt link, and some notes on what I learned building it.

Sleep well.

Jesper

---

*Skissify · Stockholm, Sweden · [Unsubscribe]*

---

## Post-Launch Follow-Up (Send April 2 at 12:00 CET)

**Subject:** Day 1 numbers (the April Fools launch worked)

---

Hey,

Yesterday I launched on the most skeptical day of the year.

Here's what happened: [fill in actual numbers]

The April Fools angle was a filter, not a barrier. The people who tried the API despite the date — those are exactly the users I wanted.

**What's next:**

This week I'm shipping:
- [ ] More MCP tool improvements based on Claude feedback
- [ ] Enhanced blueprint mode
- [ ] Better shareable URLs with metadata

If you tried Skissify and have feedback — hit reply. I read every email.

And if you haven't tried it yet: the free API is still live.

→ skissify.com ✏️

Jesper
