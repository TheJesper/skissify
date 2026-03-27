# I Built a Floor Plan Tool for AI Engineers. Dungeon Masters Found It First.

*Published: March 28, 2026 | Target: r/DnD, r/tabletopgaming, r/worldbuilding, Medium*

---

I'll be honest: I did not plan this.

Skissify was built for AI engineers who want their agents to produce visual output. The pitch is: instead of an AI describing a floor plan in text, it generates a sketch — a real, hand-drawn-looking sketch that you can share, embed, or pass to another agent.

Technical tool. MCP integration. JSON schema. That's the audience I built for.

Then launch day happened, and a dungeon master DM'd me.

---

## The Message

> "This is incredible for dungeon maps. The blueprint paper style looks *exactly* like a map you'd find in a treasure chest. Can I generate a multi-room dungeon and export it as PNG?"

I had not thought about this use case for even one second.

I went to the editor, asked Claude to generate a dungeon map in Skissify JSON, and watched what happened.

The result was — genuinely — a beautiful dungeon map. Wobbling stone room outlines. Door hinges that looked like actual dungeon doors. A label that said "Chamber of the Fallen" in imprecise handwriting-style text. The blueprint paper made it look like it had been drawn by an imprisoned cartographer.

I shared it on Twitter without thinking too hard about it. 1,400 likes overnight.

---

## Why the Blueprint Paper Works So Well for Dungeons

Skissify has four paper types: cream (napkin), blueprint (white on blue), graph (grid), and plain.

For dungeon maps, blueprint is the obvious choice. It evokes:
- Architectural drawings found in ancient ruins
- Treasure maps that have been weathered and aged
- Campaign maps that a player's character might actually discover in-game

The wobble algorithm (multi-harmonic, not a simple sine wave) adds the imprecision that makes it feel hand-crafted rather than computer-generated. A dungeon shouldn't have perfect 90-degree corners. The walls should breathe a little.

---

## How to Generate a Dungeon Map With Claude

If you want to try this tonight before your session:

**Step 1: Prompt Claude**

```
Generate a Skissify JSON dungeon map with the following rooms:
- Entry chamber (large, 5x5 squares)
- Guard room (small, 3x3, connected to entry via door)
- Corridor connecting guard room to the throne room
- Throne room (large, 7x5, with throne indicated by text label)
- Secret passage (thin corridor, 1x4, hidden behind throne room)
- Treasure vault at the end of the secret passage

Use blueprint paper style. Make the wobble humanness 0.9 for maximum hand-drawn feel.
```

**Step 2: Paste the JSON into skissify.com/editor**

Select blueprint paper if Claude didn't specify it.

**Step 3: Adjust the wobble slider**

Push amplitude up to 2-2.5 for a rougher, more aged look. The slider shows you live preview as you drag.

**Step 4: Share with your players**

Click Share → copy the link. Or export as PNG for your digital VTT (Foundry, Roll20, etc.)

---

## What AI Gets Right About Dungeon Maps

Dungeon maps have consistent design logic that AI models understand well:

- Rooms connect via doors or corridors
- Corridors are narrower than rooms
- Important rooms (throne room, boss chamber) are larger
- Secret passages are thin and awkward
- Treasure is usually at the end of something

These spatial relationships are exactly what AI agents reason about well. A good prompt produces a structurally coherent dungeon — rooms that actually connect, proportions that make sense, labels that communicate function.

What AI doesn't do well yet: complex nested topology (rooms inside rooms), elevation changes, and very large maps with many interconnected areas. For those, you'll want to break it into sections and generate each area separately.

---

## The r/DnD Community Is Genuinely Interested

After that first viral tweet, players in r/DnD and r/tabletopgaming started sharing maps they'd generated. Some highlights from the first 24 hours:

- A 12-room dungeon crawl for a level 5 party
- A merchant guild headquarters with offices, a vault, and a secret meeting room
- A cliffside fortress with exterior walls and interior keep
- An ancient library with reading rooms, archives, and a forbidden section

The use cases are obvious once you see them. DMs spend hours drawing maps that players will see for 45 minutes. If AI can draft the structural logic and Skissify renders it in a hand-drawn style that feels campaign-appropriate — that's hours saved every session.

---

## What This Taught Me About Product-Market Fit

I built Skissify for one audience and found it resonating with three others immediately:

1. **AI engineers** (intended): MCP integration, programmatic sketch generation
2. **Homeowners and architects** (discovered day 1): Floor plan visualization
3. **Dungeon masters** (discovered via viral tweet): Campaign maps, location sketches

The common thread: all three groups have spatial reasoning needs and no good way to get quick, rough visual output. They're all sketching on paper or in tools that feel wrong for the job.

The primitives don't know who they're for. A `room` element is a room. Whether that room is a bedroom, a server room, or a dungeon chamber is the prompt writer's problem.

---

## For Dungeon Masters: The Quick-Start JSON

Here's a working Skissify JSON for a classic 5-room dungeon. Paste it directly into skissify.com/editor:

```json
{
  "elements": [
    { "type": "room", "x": 100, "y": 200, "width": 200, "height": 200, "label": "Entry Hall" },
    { "type": "door-hinged", "x": 300, "y": 240, "width": 60, "height": 10 },
    { "type": "room", "x": 370, "y": 150, "width": 120, "height": 120, "label": "Guard Post" },
    { "type": "room", "x": 360, "y": 280, "width": 400, "height": 300, "label": "Throne Room" },
    { "type": "door-hinged", "x": 300, "y": 340, "width": 60, "height": 10 },
    { "type": "room", "x": 760, "y": 320, "width": 100, "height": 100, "label": "Vault" },
    { "type": "corridor", "x": 660, "y": 340, "width": 100, "height": 40 },
    { "type": "text", "x": 430, "y": 400, "label": "?? BOSS CHAMBER ??" }
  ],
  "paper": "blueprint",
  "wobble": { "amplitude": 2, "frequency": 3, "humanness": 0.9 }
}
```

Run it. See what you get. Modify the labels, add more rooms, adjust the wobble.

Your dungeon awaits.

---

*Skissify — JSON in. Hand-drawn out.*  
*skissify.com | Free for public sketches | MCP server available*
