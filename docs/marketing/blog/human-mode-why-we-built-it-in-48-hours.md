# Human Mode: Why We're Building It in 48 Hours

*Published: March 28, 2026*

---

Most product decisions take weeks. User research, stakeholder alignment, sprint planning, ticket creation, estimation poker.

This one took 12 hours.

On the morning after Skissify launched, the evidence was clear: non-technical users love the sketch output and hate the JSON input. Not "mildly prefer something different" — actually blocked. They open the editor, look at the JSON textarea, and leave.

So we're building Human Mode. Here's why, and how.

---

## What Human Mode Is

Human Mode is simple: instead of a JSON textarea, you get a natural language input.

You type: *"3-bedroom house, open kitchen, single-storey, two bathrooms, back garden patio"*

Claude generates the Skissify JSON. The sketch renders immediately.

You see your floor plan in 10 seconds, no JSON knowledge required.

---

## What Triggered the Decision

Three signals from Day 1, all pointing the same direction:

**Signal 1: The "I don't understand JSON" feedback**
Multiple users, independently, said some version of: "I love what this does but I don't know how to make the JSON." They weren't asking us to explain JSON. They were asking us to not require it.

**Signal 2: The D&D user's workflow**
A Dungeons & Dragons dungeon master used Skissify to generate a campaign map via Claude Desktop. His workflow: "Ask Claude to design the dungeon in Skissify JSON format → paste to Skissify → done." 

That workflow is two steps. Human Mode makes it one. And if the DM doesn't have Claude Desktop configured, he can't do it at all. Human Mode on the website removes that dependency.

**Signal 3: The renovation homeowner**
Someone found Skissify while Googling "AI floor plan generator." She wanted to sketch her kitchen renovation to show her contractor. She tried the editor. Couldn't figure out JSON. Left. We don't know if she found an alternative or gave up.

That person is the whole market we're missing.

---

## The Technical Case Is Easy

Human Mode is one new API route:

```
POST /api/human-mode
Body: { description: string, style?: 'napkin' | 'blueprint' | 'plan' }
Response: { json: SkissifyJSON, sketchUrl: string }
```

The implementation:
1. Take the natural language input
2. Send it to Claude with the Skissify JSON schema as context
3. Claude generates valid JSON (94% first-try success rate in benchmarks)
4. Auto-render and return the sketch URL

Total engineering effort: 4-6 hours. One developer. One API call.

The harder question wasn't "can we build it" — it was "should it be this week."

---

## Why It's This Week

Here's the honest product argument: we built Skissify as an AI agent tool. JSON-in, sketch-out, MCP compatible. That's the product.

But the sketch output is universally useful. Floor plans, wireframes, architecture diagrams, dungeon maps, classroom geometry exercises — these have nothing to do with AI agent infrastructure. They're just useful.

The only reason non-developers can't use Skissify today is the input format. The output they want exists. The path to it is blocked by a technical gate that doesn't need to be there.

Human Mode removes the gate. The product grows instantly — not because we added features, but because we removed friction.

The developer audience loses nothing. They still have full JSON control, the MCP server, the API, everything. We're adding an on-ramp, not replacing the road.

---

## What We're Not Building (Yet)

Human Mode v1 is deliberately minimal:

- **No "iterate with me" loop** (that's v2 — describe, see sketch, refine, see updated sketch)
- **No style control in the input** (just a style picker, not "make it look more like a blueprint")
- **No history** of natural language prompts (prompts aren't saved, only the resulting sketch)
- **No offline/local processing** (we'll use Claude API, not a local model, for accuracy)

The v1 goal: someone types a description, sees a sketch, shares the link. That's it. Measure whether people use it. Build more if they do.

---

## The Product Positioning Shift

Human Mode changes how we talk about Skissify.

Before: "AI agent sketch tool — JSON to hand-drawn sketch via MCP"
After: "Describe your space. Get a hand-drawn sketch."

Both are true. Both target different markets. The tagline on the homepage probably needs to work for both.

This is the "both/and" problem every developer tool faces when normal people start using it. You don't want to confuse your technical audience by simplifying the pitch. You don't want to lose the broader market by making the pitch too technical.

Our solution: the homepage leads with the output (beautiful sketches) not the input mechanism. The MCP documentation is one click away. Human Mode is the default entry path. JSON input is always available.

Let the user self-select by what they do next.

---

## Ship Date

Target: live before Sunday midnight (March 29).

If you want to be a beta tester for Human Mode — especially if you're not a developer and want to try describing a space — email jesper@skissify.com with "Human Mode" in the subject line.

---

*Skissify is at skissify.com. Free for public sketches. MCP server at npm.*
