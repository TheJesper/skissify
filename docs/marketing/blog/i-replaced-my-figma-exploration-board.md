# I Replaced My Figma Exploration Board With an AI That Sketches

*Published: March 28, 2026 | Target: Medium, Substack, r/ProductDesign, r/UXDesign*

---

This post isn't anti-Figma. I still use Figma. This is about a workflow problem I didn't know I had until I accidentally solved it.

---

## The Problem With Thinking in Figma

My old process for exploring a new UI idea:

1. Open a blank Figma file
2. Start placing rectangles
3. Spend 20 minutes resizing rectangles
4. Realize I haven't actually thought about the idea yet
5. The rectangles look so clean I'm now committed to them
6. Ship a mediocre feature because I anchored on my first Figma sketch

Sound familiar?

The problem is that Figma's output looks finished. Clean edges. Pixel grid. Auto-layout snapping. Even a rough Figma wireframe communicates "this is the design" to everyone who sees it — including yourself.

That changes how you think. You stop asking "should we build this?" and start asking "how should we build this?" You've skipped the most important question.

---

## What Sketches Actually Do

Paper sketches — the real, coffee-stained, pen-on-napkin kind — work differently.

When something looks impermanent, your brain treats it as impermanent. You iterate faster. You kill ideas faster. You're not "changing the design"; you're "scratching out a line." The psychology is different.

There's research on this. When Microsoft Research showed users identical wireframes with different levels of visual polish, users gave more critical, actionable feedback to rough sketches than to clean mockups. The clean ones triggered politeness. The rough ones triggered honesty.

But nobody wants to carry a notebook everywhere. And AI can't read your handwriting.

---

## Where AI Sketching Comes In

I've been using Claude to explore layout ideas for the last few weeks. Here's my actual workflow now:

**1. Describe what I'm thinking in plain language**

> "A dashboard with a sidebar on the left, main stats area top right, a table below, and a settings gear icon top right corner."

**2. Claude generates Skissify JSON**

```json
{
  "elements": [
    { "type": "room", "x": 0, "y": 0, "width": 60, "height": 400, "label": "Sidebar" },
    { "type": "room", "x": 70, "y": 0, "width": 330, "height": 150, "label": "Stats" },
    { "type": "room", "x": 70, "y": 160, "width": 330, "height": 230, "label": "Table" },
    { "type": "text", "x": 370, "y": 10, "label": "⚙" }
  ],
  "paper": "cream",
  "wobble": { "amplitude": 2, "humanness": 0.8 }
}
```

**3. Paste into skissify.com/editor**

The sketch renders in under a second. It looks like I drew it on a legal pad. Slightly wobbly lines, cream paper, labels in handwritten-style font.

**4. Iterate in seconds**

"Move the stats to full width, make the table smaller." New JSON. New sketch. 10 seconds.

**5. Share for feedback**

Share link. The recipient sees a rough sketch. They give me rough-sketch-level feedback — "this section feels too small" — not Figma-level feedback — "the padding here should be 16px not 12."

That's the feedback I need at this stage.

---

## The Cognitive Difference Is Real

I've done this comparison intentionally over the past month:

**Session A:** Open Figma, explore ideas visually
**Session B:** Describe ideas to Claude, get sketches

Session B consistently produces better questions. When I'm staring at a rough sketch, I ask things like:
- "Does this layout actually solve the user's problem?"
- "What if the sidebar didn't exist at all?"
- "Is the table the right format for this data?"

When I'm in Figma, I ask:
- "Should this be 12px or 14px?"
- "What color is the sidebar?"
- "Should I use this component or build a new one?"

The Figma questions are real questions. They're just the wrong questions for this stage.

---

## The Wobble Is Doing Work

Skissify's hand-drawn rendering isn't cosmetic. The slight imprecision in every line communicates: *this is an idea, not a decision.*

That's not marketing language. It's functional. When I share a sketch and get back "the kitchen feels too isolated" instead of "the border radius should be 8px" — that's the wobble doing work.

The tool has parameters for how wobbly: amplitude, frequency, humanness. I keep mine at about 60-70% — not so rough it looks broken, not so clean it reads as final.

---

## What I Actually Changed in My Workflow

**Before:**
- Figma for exploration → Figma for wireframes → Figma for spec → Figma for dev handoff

**After:**
- Skissify for exploration (day 1-2) → Figma for wireframes → Figma for spec → Figma for dev handoff

One step earlier in the process. One step where I'm thinking more clearly. The rest of the workflow didn't change.

Figma didn't go anywhere. I just stopped asking it to do something it wasn't designed for.

---

## Try It

If you're a designer or PM who has ever spent 30 minutes adjusting a Figma wireframe only to kill the idea the next morning — try the sketch approach for your next project.

1. Open skissify.com/editor (no signup needed)
2. Describe your layout idea in Claude or ChatGPT and ask it to generate Skissify JSON
3. Paste and see the sketch
4. Share the link for feedback

The first time someone gives you honest "this doesn't work" feedback on a rough sketch instead of polite "looks good" feedback on a clean wireframe — you'll understand why this step matters.

---

*Skissify — JSON in. Hand-drawn out.*  
*skissify.com | Free for public sketches*
