# Skissify for Non-Developers: You Don't Need to Write JSON

*Published: March 2026 — Best platforms: Medium, Substack, LinkedIn Article*  
*~1,200 words | 5 min read*

> **TL;DR:** Skissify was built for AI agents. But on launch day, the biggest surprise was homeowners using it to sketch kitchens for their contractors. You don't need to know what JSON is. You just need to know what you want.

---

I need to tell you something embarrassing about Skissify.

I built it for developers. For AI agents and MCP servers and LLMs generating JSON manifests. I wrote documentation using words like "schema" and "programmatic input." I assumed the users would be engineers.

Then a homeowner DMed me on launch day:

*"I used Skissify to sketch a kitchen layout for a call with my contractor. Took 5 minutes. He understood it immediately. Usually I spend hours trying to explain what I want."*

She didn't know what JSON was. She didn't install anything. She opened a browser, described what she wanted to Claude, and got a hand-drawn sketch back in the chat.

That's when I realized: the product works for people I didn't build it for.

---

## The Two Ways to Use Skissify

There are two completely valid ways to get a sketch out of Skissify.

**The AI way:** Tell Claude (or any AI assistant with Skissify MCP installed) what you want. "Design a 3-bedroom apartment with an open kitchen." Claude designs the layout, generates the instructions behind the scenes, and returns a sketch. You never see the JSON.

**The direct way:** Go to skissify.com, click the editor, and paste a description of what you want into the JSON editor. If that sounds scary — don't worry. The editor has presets. Click "napkin room" and you get a starter layout to modify.

Either way: the hand-drawn sketch appears. No Figma. No drag-and-drop. No design degree required.

---

## What Can You Actually Sketch?

Here's what Skissify handles well right now:

**Floor plans and room layouts**  
This is the sweet spot. Describe a room, a floor, an office space, a kitchen. Get a sketch. Great for:
- Showing a contractor what you're imagining before they quote
- Planning furniture placement before you move anything
- Designing your home office setup
- Apartment hunting — sketching how your furniture would fit

**Simple diagrams**  
Boxes and arrows. How a process flows. What connects to what. Not full flowchart software, but great for quickly sketching a concept.

**Wireframes**  
UI layout ideas. "Header, nav sidebar, content area, footer." If you're pitching a website concept to a developer, a rough wireframe sketch communicates the idea clearly.

---

## A Real Workflow: The Kitchen Reno

Let me walk through exactly what the homeowner might have done.

1. **Open Claude** (at claude.ai — free account)

2. **Type a prompt:**
   > "I'm renovating my kitchen. It's about 4 meters wide by 3 meters deep. I want: countertop along the north wall, island in the center, fridge in the northeast corner, door on the west wall. Can you draw this as a floor plan?"

3. **If you have the MCP server installed:** Claude calls Skissify automatically and returns a floor plan sketch in the chat.

4. **If you don't have the MCP server:** Copy the URL skissify.com into a new Claude conversation and ask: "Go to this site and help me make a floor plan" — or simply go to skissify.com/editor and use the preset templates.

5. **Share the sketch** with your contractor using the share button. One link. No file attachment needed.

Total time: under 5 minutes. No design software. No appointments with a drafter.

---

## Installing the MCP Server (It's One Line)

If you use Claude Desktop on your computer (not the browser), you can install the Skissify MCP server and have Claude draw directly in your conversations.

One command in your terminal:

```
npm install -g @skissify/mcp-server
```

Then add Skissify to your Claude Desktop configuration file. Full instructions at skissify.com/docs/mcp.

After that, any conversation in Claude Desktop can produce sketches. You don't need to go to the website at all.

---

## The Aesthetic Is the Point

One thing people always mention: the sketches look *hand-drawn*. Not pixel-perfect CAD drawings. Not Figma mockups. Actual slightly-wobbly lines, pencil texture, the kind of thing you'd sketch on a napkin in a meeting.

That's intentional.

A polished floor plan says "this is final." A hand-drawn sketch says "this is an idea — let's discuss." That's the right signal for early-stage conversations with contractors, collaborators, or clients.

The wobble in the lines communicates: *this is negotiable*.

---

## What's Free, What's Paid

**Free tier:**
- Unlimited sketches (public — anyone with the link can view)
- Editor access with presets
- 50 API calls per month (for AI agent use)

**Pro (€5/month):**
- Private sketches (only people with the link can view)
- 2,000 API calls per month
- Full API access

For most non-developer use cases, the free tier is plenty. Sketch your kitchen, share the link with your contractor, done.

---

## What's Coming for Non-Developers

The developer features are built. What's on the roadmap for everyone else:

- **Natural language mode** — type a description directly on the website, get a sketch, no AI assistant needed
- **Furniture blocks** — recognizable sofa/bed/table shapes in addition to the current room outlines
- **Measurements** — dimension lines that scale automatically
- **Template library** — "common bedroom" / "kitchen layout" / "open office" starters

If you have a use case that's not covered today, email me. The homeowner who messaged me on launch day is why natural language mode moved to the top of the roadmap.

---

## The Shortest Summary

You don't need to understand AI to use Skissify.

You just need to know what space you're trying to communicate — and be able to describe it in plain words to someone who will draw it for you.

That someone is Claude. The drawing tool is Skissify.

Try it free at **skissify.com**. No signup required to open the editor.

---

*Skissify launched on March 27, 2026. Follow the build-in-public story at [@skissify on Twitter] or subscribe to the newsletter at skissify.com.*

**Distribution plan:**
- Medium personal (consumer audience) — Day 3-4
- LinkedIn article — Day 5 (reach home renovation, real estate audience)
- Substack (if you have subscribers)
- r/HomeImprovement, r/DIY — Day 5 (frame as renovation tool, not AI tool)
