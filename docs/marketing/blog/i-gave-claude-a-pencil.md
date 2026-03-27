# I Gave Claude a Pencil

*Published: March 27, 2026 — Launch Day*  
*Best for: Medium, Substack, personal blog, cross-post to Dev.to*  
*Tags: AI, BuildInPublic, AIAgents, MCP, SideProject*

---

AI agents can write code. They can search the web. They can book flights and read your email.

But they can't draw.

Not really. You can ask Claude to describe a floor plan and get a thousand words. You can ask DALL-E to sketch a layout and get something that looks roughly right but is fundamentally unpredictable — different every time, unreliable dimensions, text that melts into abstract noise.

For months, this bothered me. Because the gap wasn't just an inconvenience. It was a fundamental asymmetry in what AI could do.

So I built a pencil for Claude.

---

## The Problem I Couldn't Stop Thinking About

I was building a home renovation assistant. One of the features I wanted: the AI could suggest layout changes, and you could see them visualized.

Simple idea. Surprisingly hard to execute.

DALL-E: The bedroom moved around between generations. Dimensions were wrong. Labels were illegible. Every time I regenerated, I got a different sketch — which meant I couldn't iterate.

Excalidraw: Not built for programmatic input. Excalidraw is for humans with mice, not for JSON piped in from an LLM.

Mermaid / D2: Great for flowcharts and system diagrams. Floor plans? The DSL wasn't designed for spatial layouts with architectural elements.

SVG: I could generate SVG directly, but the LLM success rate for writing valid, readable SVG for floor plans was... not great. Around 40% on first attempt.

I tried all of them. None worked.

So I built the thing I needed.

---

## The Insight That Made It Work

The real problem wasn't the rendering. It was the authoring format.

LLMs are better at generating some formats than others. JSON with explicit coordinates outperforms SVG paths outperforms "describe the layout verbally."

I spent two weeks running experiments. 200+ LLM generations of floor plans across different schema designs, tracking first-attempt success rate (could I get valid, renderable output without a correction loop?).

The flat, verbose schema won:

```json
{
  "style": { "paper": "cream", "wobble": 3 },
  "elements": [
    { 
      "id": "living", 
      "type": "room", 
      "x": 50, "y": 50, 
      "width": 200, "height": 150, 
      "label": "Living Room" 
    }
  ]
}
```

Versus the compact schema:

```json
{
  "rooms": [{ "name": "Living Room", "dims": [200, 150], "pos": [50, 50] }]
}
```

The verbose version: 90% first-attempt success. The compact version: 60%.

Why? LLMs perform better with explicit keys, consistent naming, and no inference required. When every property is spelled out, there's less room for the model to "guess" a default or misinterpret a shorthand.

The product insight was this: **build the schema that LLMs can write, not the schema that humans would design.**

---

## Making the Lines Look Human

The rendering was the other problem.

Every "hand-drawn" effect I'd seen used a sine wave offset on line paths. It looks like this: smooth, predictable, regular. It looks like a computer impersonating a human. Which is exactly what it is.

Real hand-drawn lines are irregular. Frequency varies. Amplitude shifts. There's a subtle harmonic complexity that sine waves can't replicate.

So I built a multi-harmonic wobble engine. Three overlapping sine waves with different frequencies, seeded from the element ID so the same JSON always produces the same output (determinism matters for a programmatic tool), plus a "humanness" parameter that lets you tune from clean-technical to loose-napkin-sketch.

The difference is visible. Especially in motion — when you drag the humanness slider, you can feel it shift from "algorithmic" to "hand-drawn."

---

## The MCP Moment

Model Context Protocol (MCP) is how Claude connects to external tools. By March 2026, there are over 12,000 MCP servers — tools for searching the web, reading files, running code, querying databases.

None of them could draw.

So I built one.

Here's what happens when you install `@skissify/mcp-server` and add it to Claude Desktop:

You type: *"Design a 2-bedroom apartment for a remote worker. Show the office near natural light."*

Claude thinks about the layout. It writes the JSON schema, placing rooms, doors, windows at specific coordinates. It calls the Skissify MCP tool with that JSON. It gets back a URL to a hand-drawn sketch.

Then it says: *"Here's a layout. The home office is in the northeast corner for morning light. The bedroom is separated by the hallway for noise isolation. Here's the sketch: [URL]"*

Not a description. An actual sketch.

The first time I saw this work end-to-end, I got weirdly emotional. Something that should be impossible — an AI drawing a floor plan — just... worked.

---

## What I Got Wrong (Because There's Always Something)

**I overbuilt the rendering, underbuilt the editor.** The wobble algorithm is genuinely excellent. The editor UI for creating sketches manually is... functional. I spent 80% of my engineering time on the part that 20% of users will notice, and 20% on the part that 80% of users will interact with first.

**I assumed developers would be the primary users.** Early users include real estate agents, renovation planners, and at least one architecture student. The MCP angle matters to developers; the hand-drawn aesthetic matters to everyone else. I may have led with the wrong hook for half my audience.

**I underestimated how much the share link matters.** The sketch URL — a clean public link, no account required to view — is the feature that drives word of mouth. Every time someone sends a Skissify link to a client or collaborator, that's distribution. I almost didn't build it in v1.

---

## Why Today Is the Right Day

I almost waited. Another month for the mobile view. Another sprint for team features. Another pass on the pricing page copy.

But the window matters.

MCP is having a moment. The ecosystem is growing fast, and the space for "first" tools in each category is narrowing. "First sketch tool with MCP support" is a story you can tell in March 2026. In six months, it won't be as interesting.

The product is good enough. The gap it fills is real. Users who genuinely need it will be more useful to me than another month of solo development.

---

## The Thing I Want You to Try

If you have Claude Desktop and 5 minutes:

1. `npm install -g @skissify/mcp-server`
2. Add it to your Claude Desktop MCP config
3. Ask Claude: "Sketch a simple home office layout — desk near the window, small bookshelf, door on the south wall. Use Skissify."

Then watch it draw.

That moment — seeing an AI produce an actual visual artifact in response to a natural language request — is the thing I've been trying to build for months. I hope it lands for you the way it landed for me.

---

*Skissify is live at [skissify.com](https://skissify.com).*  
*Free tier available. Pro at €5/month.*  
*We're live on Product Hunt today — feedback welcome.*

*I'm posting real metrics tonight on Indie Hackers. Good or bad.*

---

**Publishing notes:**
- This is a personal/founder voice piece — best for Medium, Substack, personal blog
- Cross-post to Dev.to with technical tags: #webdev #ai #mcp #buildinpublic
- Add 1-2 screenshots: the wobble slider demo, the Claude MCP session
- Good for Day 2-3 (after launch metrics give you real numbers to reference)
- Final paragraph before "The Thing I Want You to Try" can reference real launch day numbers
