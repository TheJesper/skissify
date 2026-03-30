# Why Hand-Drawn Sketches Beat Figma: The T-12h Thesis

*Written at 21:00 CET, March 30, 2026. Twelve hours before Product Hunt launches.*

---

There's a specific kind of clarity you get when you're about to ship.

Not the clarity of having figured everything out. The clarity of having committed to something. The clarity that comes from having made an irreversible choice and now having to live in it.

I launched Skissify on Friday March 27. We're launching on Product Hunt tomorrow at 09:01 CET. And tonight, twelve hours out, I keep coming back to the same question users ask me: **why hand-drawn?**

Not "why build a sketch tool." That one's easy — AI agents need visual output.

But why *hand-drawn*? Why the wobble? Why the pencil line that's 3% off-straight? Why not just clean SVG?

Here's the answer I've landed on, after four days of watching real people use the product.

---

## The Fidelity Signal

There's a concept in design research called **fidelity signaling**. When you share a polished mockup, people respond to the polish. They comment on font choices. They question the color. They debate the button radius.

When you share a rough sketch, people respond to the *idea*. They ask whether the concept works. They suggest alternatives to the approach. They engage with the substance.

This isn't about aesthetics. It's about information theory. A polished mockup sends the signal: "this is decided." A rough sketch sends the signal: "this is being figured out."

Figma is extraordinarily good at sending the "decided" signal. That's exactly what you need when you're communicating a finished decision to stakeholders, engineers, or clients.

It's exactly the wrong tool when you're still figuring things out.

---

## The Four Audiences That Found Skissify

We built Skissify for AI developers. In four days, four audiences found it:

**AI developers** — who use it the way we intended. They write MCP integrations, generate floor plan JSON, use it as the visual output layer in their agent pipelines.

**Homeowners planning renovations** — who don't know what JSON is, don't care about MCP, but describe their kitchen to Claude and need something to show their contractor. The hand-drawn aesthetic is a feature here: it signals "this is a starting point, not a final design."

**Dungeon masters** — who generate battle maps, room layouts, dungeon floors. The rough aesthetic is perfectly on-brand for hand-drawn map aesthetics. Blueprint paper mode + hand-drawn wobble = exactly what a DM wants to show their table.

**Geometry and design teachers** — who generate spatial diagrams, floor plan exercises, classroom layouts. The rough aesthetic signals "this is a teaching example, not a finished design."

What do all four audiences have in common?

They all need to communicate **"this is a working idea, not a finished decision."**

That's the thesis. Hand-drawn doesn't just look different from Figma. It *communicates* differently. It invites iteration. It lowers the stakes of critique.

---

## What Figma Gets Right

Figma is exceptional. I use it. You probably use it. The critique here isn't that Figma is bad.

The critique is that Figma does one thing extremely well — communicating finished decisions — and this same quality makes it poorly suited for the exploration phase.

When I ask a client for feedback on a Figma mockup, I get feedback on the Figma mockup.

When I hand them a sketch, I get feedback on the idea.

Both are valid. They're different jobs.

---

## The AI-Native Case

Here's where Skissify specifically earns its place.

AI agents can't use Figma. They can write JSON. They can follow a schema. They can output structured data.

The question "can an AI agent do exploratory design" was previously unanswered because there was no programmatic equivalent to "sketch."

Skissify is the answer. A flat JSON schema → a hand-drawn sketch URL. The LLM generates the structure. The wobble algorithm adds the appropriate rough-draft signal.

The output isn't trying to compete with Figma. It's completing the design process pipeline that Figma was never designed to start.

---

## Tomorrow

At 09:01 CET tomorrow, Skissify goes live on Product Hunt.

It's April Fools Day. That's not a coincidence — it's the thesis in action. We launched on April 1 because we're committed to the "rough, honest, working draft" aesthetic all the way down to the launch strategy.

Come by Product Hunt. Try it. Show an architect, a homeowner, a dungeon master, a teacher.

Then tell me whether they think the sketch should be cleaner.

---

*Skissify is live at [skissify.com](https://skissify.com). Free tier, no signup required for basic use. MCP server for AI agents. Human Mode for humans.*

**Tags:** #SketchFirst #ProductHunt #BuildInPublic #VibeDrawing #AIAgents #MCP
