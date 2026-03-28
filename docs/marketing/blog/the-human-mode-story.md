# We Built a Tool for Developers. Now We're Building the Door for Everyone Else.

*March 28, 2026 — Day 2*  
*~1,600 words | 6 min read*  
*Best platform: Medium (primary), Substack, Hacker News (comments)*

> When your tool works exactly as designed, but 30% of your users can't get through the front door — that's not a user problem. That's a product problem. Here's how we're fixing it.

---

Skissify accepts JSON as its input. That's by design. We built it for AI agents: if you can feed a language model a JSON schema, the agent can generate valid input and render a hand-drawn sketch. The JSON-first approach is what makes programmatic generation possible.

But here's what Day 1 taught us: a lot of people who want the output don't speak JSON.

---

## The Pattern We Noticed

Throughout launch day, we saw three categories of users:

**Category A — JSON-native users.** Developers, AI agent builders, engineers. They paste JSON directly, or they configure Claude Desktop with our MCP server and let the agent generate it. Zero friction. This is who we built for.

**Category B — AI-assisted users.** They describe what they want to Claude or GPT, ask it to generate Skissify JSON, then paste the result. It works. But it's a multi-step workflow with invisible steps and a lot of "how do I get the right JSON?" support questions.

**Category C — Vision-blocked users.** They understand the output (they love the sketches), but they don't know what JSON is, have never used Claude, and just want to say "sketch my kitchen, 4m × 3m, fridge in the corner, island in the middle" and get a floor plan. They exist. There were more of them on Day 1 than we expected.

Category C users are not the product's target. But they are the product's *opportunity*.

---

## What "Human Mode" Actually Means

Human Mode isn't a pivot. It's a front door.

The architecture stays the same: JSON → rendering engine → hand-drawn sketch. We're not changing what Skissify is. We're adding a layer that translates natural language into valid JSON before the rendering step.

Here's the proposed flow:

```
[User types] "2-bedroom apartment, living room facing north, kitchen open plan, master bedroom with en-suite"
     ↓
[Claude API call] Generate Skissify JSON for this description
     ↓
[Skissify renderer] JSON → hand-drawn floor plan
     ↓
[Result] Sketch appears. User can tweak via JSON editor if they want.
```

The JSON editor doesn't go away. The existing workflow doesn't change. We just add a textarea at the top: *"Describe your space."*

---

## Why This Is the Right Move for Day 2

### 1. The biggest friction is at the door, not inside

Once users get a sketch rendered, they come back. Retention in the first 24 hours was good for users who successfully created a sketch. The drop-off was almost entirely at the input step. This is a classic "get through the front door" problem.

### 2. The homeowner market is real

We had no homeowner-focused marketing. No r/HomeImprovement posts on launch day. No "design your kitchen" copy anywhere on the homepage. And yet, homeowners found us, tried to use us, hit the JSON wall, and dropped off. There's real demand here we haven't even addressed with marketing — the product is the blocker.

### 3. Human Mode is a moat, not a commodity

"Add AI to your input" sounds table-stakes in 2026. But Skissify's Human Mode would be different: it uses a fine-tuned prompt that generates Skissify-specific JSON, understands architectural conventions, handles room proportions correctly, and produces output that renders well on all four paper styles. That's not generic AI — it's a trained workflow. Competitors can't trivially replicate the quality.

### 4. The MCP value prop gets stronger, not weaker

This might seem counterintuitive: if we add natural language input directly, do we compete with the MCP use case? No. Human Mode is for human input. MCP is for agent input. They serve different callers of the same API.

If anything, Human Mode *validates* MCP. It shows that the JSON-to-sketch pipeline is solid enough that you can wire any text source to it — whether that's a user typing, an agent thinking, or a script running.

---

## When We'll Ship It

The decision tree:

- If Day 2 signups include > 20% describing themselves as non-developers in any feedback form → Human Mode goes into the sprint immediately
- If the r/HomeImprovement post (queued for later today) gets significant engagement → confirmed signal
- If JSON-barrier questions represent > 30% of support/comments this week → confirmed signal

We're not adding complexity for complexity's sake. But we're also not ignoring data.

---

## The Bigger Lesson

Skissify was designed as a developer tool with a clean API. The insight from Day 1 isn't that we built the wrong thing — the MCP use case is exactly as valuable as we thought. The insight is that we underestimated how many people would arrive at "I need AI to draw something" from completely different directions.

The drawing is universal. The JSON API is just one of several doors to get there.

We're building another door.

---

*Skissify is available at skissify.com. Natural language input ("Human Mode") is coming soon.*
