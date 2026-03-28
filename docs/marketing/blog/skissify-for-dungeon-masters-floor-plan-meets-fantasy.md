# Skissify for Dungeon Masters: When a Floor Plan Tool Becomes a Campaign Map Tool

**The use case nobody planned for — and why it works perfectly.**

---

I built Skissify for AI developers.

The fourth person to email me on launch day was a Dungeon Master.

"I use Claude to design dungeon layouts, paste the JSON into Skissify, set paper style to Blueprint, print it out, and bring it to the session. My players think I hand-drew it. The map just appeared in a treasure chest they found last week."

I had not thought of this once.

---

## Why Blueprint Style Works for Dungeons

Skissify has four paper styles: cream napkin, white, graph grid, and blueprint.

Blueprint style is dark navy paper with off-white line work — exactly the aesthetic of:
- Dungeon maps from old TSR modules
- Treasure chest maps in fantasy settings
- The "found document" feel of a handwritten dungeon plan

The multi-harmonic wobble algorithm (three superimposed sine waves with seeded randomness) produces line variation that reads as "carefully hand-drawn" rather than "computer-generated." At wobble setting 3-4, it looks like someone drew this with a fine-tipped pen while concentrating.

The combination — blueprint paper + hand-drawn wobble — is the exact dungeon map aesthetic without any manual effort.

---

## The Workflow

**Step 1: Prompt Claude**

```
Design a dungeon level for a D&D encounter. Include:
- An entrance chamber with two stone columns
- A trapped corridor with iron doors at each end (door-symbol elements)
- A treasury alcove with locked chest (annotated)
- A boss chamber: circular room (use circle element) with elevated platform

Output as Skissify JSON. Use blueprint paper style.
Include dimension annotations for key distances.
```

**Step 2: Get the JSON**

Claude designs the spatial layout, assigns coordinates, adds annotations. Most of the time the first attempt renders correctly (94% first-try success with Claude Sonnet 4).

**Step 3: Paste into Skissify**

skissify.com/editor — paste the JSON, press render. Blueprint sketch appears.

**Step 4: Adjust if Needed**

Edit the JSON directly to nudge element positions, add text labels (TRAP, TREASURE, BOSS), change door directions. Re-render in under a second.

**Step 5: Share or Print**

Every sketch gets a permanent shareable URL. Print to A4 or A3 for physical use at the table. Share the URL with remote players. Display on a tablet.

---

## Element Types That Map to Dungeons

| Skissify Element | Dungeon Use |
|-----------------|-------------|
| `rect` | Chambers, alcoves, rooms |
| `circle` | Circular boss rooms, wells, ritual circles |
| `wall` / `line` | Corridor walls, barriers |
| `door-symbol` | Dungeon doors (hinged or sliding) |
| `column` | Stone pillars, structural columns |
| `stairs` | Level transitions, elevation changes |
| `text` / `annotation` | Labels: TRAP, TREASURE, SECRET DOOR, etc. |
| `dimension` | Distance markers for spatial reference |
| `arrow` | Directional indicators, flow arrows |

---

## What's Missing (and What I'm Planning)

Based on Day 1 feedback from TTRPG users, the most-requested elements:

1. **Secret door indicator** — the classic hatched doorway with "?" mark
2. **Trap marker** — X or triangle symbol with annotation
3. **Water/pit fill** — area fills for water features, chasms
4. **Outdoor terrain** — trees, rock formations, pathways (for overworld maps)
5. **Grid overlay** — optional square or hex grid for movement calculations

I'm adding at least the first two in Week 1 based on the volume of requests.

If you have dungeon map element requests: email me at [founder@skissify.com] or open a GitHub issue. First TTRPG-specific release will be documented at skissify.com/changelog.

---

## Example Dungeon Prompt Library

**Classic 5-room dungeon:**
```
Design a 5-room dungeon: entrance hall, monster lair, puzzle room, obstacle corridor, boss chamber. 
Connected by narrow corridors. Include at least one secret door. 
Blueprint style. Output as Skissify JSON.
```

**Tavern basement:**
```
Design the basement/cellar of a medieval tavern. Include a main storage area with barrels, 
a locked wine cellar, stairs from the main floor, and a hidden room behind a false wall.
Cream paper style. Output as Skissify JSON.
```

**Temple floor plan:**
```
Design a temple floor plan: grand entrance hall with columns, antechamber, main sanctum (circular), 
side chapels, and a crypt access below (use stairs). Architectural, formal proportions.
Blueprint style. Output as Skissify JSON.
```

**Ship deck:**
```
Design a sailing ship's main deck plan: bow, mast positions, cargo hold access hatches, 
cabin at stern, cannons along the sides. Top-down view.
Graph grid paper style. Output as Skissify JSON.
```

---

## Free to Try

The editor is free with no signup: **skissify.com/editor**

Every sketch gets a permanent shareable URL — no account needed to share with your players.

Pro tier (€5/month) for private sketches, higher API limits, and batch rendering.

---

*Launched March 27, 2026 — Day 2 update, Saturday March 28*
