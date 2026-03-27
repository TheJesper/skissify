# Vibe Coding Is Dead. Vibe Drawing Is Next.

*Published: Day 1 (March 27, 2026) | Platform: Medium first, Dev.to Day 2, LinkedIn article Day 2*  
*TL;DR: The design world is declaring vibe coding dead after a year of identical AI-generated layouts. But the reaction isn't a return to Figma — it's something new. Vibe drawing: rough, spatial, agent-native sketching that puts ideas on paper faster than any canvas.*

---

Michal Malewicz just wrote "Vibe Coding is OVER" on Medium. Three days ago. In the design world, it's already spreading.

His point: AI-generated interfaces are becoming indistinguishable. Every Lovable app looks like the same Shadcn template. Every vibe-coded landing page has the same card grid. The aesthetic monoculture is suffocating.

He's right. But I think the conclusion is wrong.

The problem isn't that we're letting AI drive the aesthetics. The problem is that **the AI never had a sketch phase**.

Human designers don't start in Figma. They start on a napkin.

The napkin is where the weird ideas live. The half-formed layouts. The "what if we flip this?" moves. The bad ideas that lead to good ones. Figma is for execution. The napkin is for thinking.

AI vibe coding went straight to execution. No napkin phase. No rough pass. No spatial exploration before committing to grid columns and border-radius.

Vibe drawing is the missing napkin.

---

## What Vibe Drawing Actually Means

It's not a brand. It's a behavior.

Vibe drawing means: **rough, fast, spatial output at the start of a design conversation** — before polish, before components, before color.

You tell your AI: "design a 2-bedroom apartment, the second bedroom doubles as a home office."

It thinks about adjacencies. Load-bearing walls. Natural light. Traffic flow. And then — instead of explaining all this in paragraphs — it **draws you a floor plan**. Hand-drawn style. 30 seconds.

That's vibe drawing. Spatial reasoning made visible, instantly, in a form that invites revision.

The sketch isn't the answer. It's the start of the conversation.

---

## Why Vibe Coding Produces Monocultures (And Vibe Drawing Won't)

Vibe coding monoculture happens because:

1. The AI defaults to the most-trained patterns (Shadcn, Tailwind, card grids)
2. There's no sketch phase where alternatives get explored
3. The first output becomes the final output because iteration is expensive

Vibe drawing breaks all three:

1. **Spatial layouts don't have a monoculture** — every floor plan is shaped by its site, program, and adjacency requirements
2. **Iteration is free** — a JSON change re-renders in milliseconds, not minutes
3. **The sketch phase normalizes exploration** — "wrong" sketches are expected and cheap

The hand-drawn aesthetic is load-bearing, too. A polished UI mockup creates psychological commitment. A rough sketch signals "this is a draft." Clients push back on rough sketches. They accept polished mockups. Keeping output rough keeps the conversation open.

---

## The Technical Reason AI Agents Needed This

Here's the thing about language models: they can reason about space perfectly well.

Claude can describe a functional apartment layout. It knows that a kitchen near the entrance reduces grocery haul distance. It knows that a master bedroom should be away from the street. It can design a floor plan mentally.

It just couldn't show you. Until now.

Skissify is an MCP server that gives AI agents a hand-drawn sketch output layer. The agent generates a JSON manifest:

```json
{
  "elements": [
    { "type": "room", "label": "Living Room", "x": 10, "y": 10, "width": 80, "height": 60 },
    { "type": "room", "label": "Kitchen", "x": 90, "y": 10, "width": 50, "height": 60 },
    { "type": "door", "style": "hinged", "x": 10, "y": 40 },
    { "type": "window", "x": 50, "y": 10, "width": 30 }
  ]
}
```

And gets back a hand-drawn sketch with a permanent URL.

It's not Figma. It's not Excalidraw. It's the napkin — made programmatic.

---

## The Design World's Actual Next Move

Malewicz is right that the reaction to vibe coding monoculture is **roughness**. Hand-drawn. Imperfect. Spatial. Something that feels like it came from a person who was thinking, not a generator that was averaging.

That's not a retreat from AI. That's AI maturing.

The first year of AI design tools was: "AI can produce polished UI." The second year is: "AI needs to think spatially before it polishes."

The tools that thrive in year two won't be the ones that produce the most refined output. They'll be the ones that make the rough phase productive.

Vibe drawing is productive roughness. It's not slowing down. It's thinking before committing.

---

## What This Looks Like In Practice

Real workflow, real agent:

> **User:** "I want to reorganize my office. Open plan but with a focus zone. I have 40m²."
>
> **Claude [via Skissify MCP]:** *(draws a floor plan: entrance, open collaborative zone, acoustic partition, focus pods in the north corner with reduced natural light glare, plants as flexible dividers)*
>
> "Here's a starting point. The focus pods are in the north corner — less afternoon sun glare. I've used a partial partition rather than a full wall so the space feels open but acoustically separate. Want me to try a version with the collaborative zone near the window instead?"

That's vibe drawing. The agent thought spatially. The sketch made the thinking visible. The conversation can now refine the layout rather than reconstruct it from description.

This is what vibe coding was missing. The sketch phase.

---

## Try It

Skissify is live at **skissify.com** — free for public sketches, €5/month for private sketches and API access.

MCP server: `npm install -g @skissify/mcp-server`

Add it to your Claude Desktop config. Ask it to draw something. See what vibe drawing looks like.

Vibe coding is over. The napkin phase is here.

---

*Skissify launched March 27, 2026. It's the first sketch tool built for AI agents. JSON in. Hand-drawn sketch out.*  
*Filed under: AI Design, MCP, Vibe Drawing, Spatial AI, AI Agents*
