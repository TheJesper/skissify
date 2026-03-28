# Human Mode: Building the Door for Everyone Else

**The product decision that took one day to make.**

---

I built Skissify for AI developers.

The input is JSON. That's intentional. JSON is what agents speak. LLMs generate it reliably. You can version-control it, diff it, pipe it through a script.

For the developer audience I had in mind — people building MCP server integrations, LangGraph pipelines, AutoGen workflows — JSON-first is a feature, not a bug.

Then Day 1 happened.

---

## The Signal I Didn't Expect

Within 8 hours of launch, homeowners started signing up.

Not developers who happen to own homes. People doing kitchen renovations who had never heard of MCP. People planning bedroom furniture who described their space to Claude in plain English, got JSON back, pasted it into Skissify because a Reddit post said it would draw it, and got a hand-drawn floor plan.

The number was significant. By hour 12, roughly 25% of new signups were describing themselves (in feedback and onboarding surveys) as non-developers.

The JSON was invisible to them. Claude handled it. They just wanted the sketch.

---

## What "Human Mode" Means

Human Mode is a simple text input on the Skissify landing page:

```
Describe your space:
[ My kitchen is 4m × 5m. Peninsula island on the north side.
  Window above the sink. Fridge to the left of the door. ]

[ Generate Sketch ]
```

Under the hood:
1. Input → Claude API call (with Skissify system prompt)
2. Claude generates valid Skissify JSON from the description
3. JSON → render pipeline (same as always)
4. Sketch appears. No JSON visible.

For the developer audience: nothing changes. The JSON editor, MCP server, and API remain exactly as they are. Human Mode is a separate entry point.

For the homeowner, teacher, dungeon master, interior designer audience: the door just got a lot wider.

---

## The Decision Framework

I applied one filter: **does this make Skissify less of a primitive?**

An API endpoint that accepts natural language and returns a sketch URL is still a primitive. It's still stateless, deterministic (given the same Claude response), and programmatically accessible.

The difference is the input surface — not the architecture.

So: no. Human Mode doesn't compromise the developer use case. It expands the addressable market without technical debt.

---

## Timeline

Testing Human Mode this weekend. Ships before Monday.

The stack for v1:
- Simple textarea on the /create page
- Proxied call to Claude with Skissify schema as system context  
- Parsed JSON → existing render pipeline
- Error handling: if Claude output doesn't parse, show friendly error and the raw JSON so users can inspect

v2 (Week 2): refine the prompt template based on what descriptions produce the best spatial results. Add room type presets ("kitchen", "bedroom", "office", "dungeon").

---

## What Comes After

If Human Mode converts well among non-developers, I'll consider:

1. A dedicated landing page: `skissify.com/rooms` — headline is "Describe your space. Get a sketch."
2. Free starter templates (kitchen, bedroom, living room, home office)
3. A contractor-friendly share mode — larger text, print-ready format, optional PDF

This is not a pivot. It's a dual-landing-page strategy. Developer primitives serve developers. Human Mode serves everyone else. The render engine doesn't know the difference.

---

## The Meta-Lesson

Every time I've built something that works better for an unexpected audience than for the target audience, it's because the underlying capability was real — and the interface was just limiting who could access it.

Skissify's capability: turn structured spatial data into a hand-drawn sketch.

Human Mode's contribution: remove "structured" from the user's job.

---

*Try it: skissify.com — free, no signup for the editor*  
*Human Mode: coming this weekend*

*Saturday, March 28, 2026*
