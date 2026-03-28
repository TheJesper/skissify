# 10 Things You Can Sketch with One Claude Prompt

*Published: March 28, 2026*

---

The most common question we get from developers who try the Skissify MCP server:

*"What should I actually use this for?"*

Fair question. JSON-to-sketch is a capability, not a use case. So here are ten real things you can sketch with a single Claude prompt — from the practical to the surprising.

---

## How This Works

1. Install the MCP server: `npm install -g @skissify/mcp-server`
2. Add to Claude Desktop config (one-time setup — 5 minutes, see docs)
3. Ask Claude anything that involves spatial or structural layout
4. Claude generates and renders the sketch automatically

Or, without the MCP setup: ask Claude to output Skissify JSON, paste it at skissify.com. Same result, two steps instead of one.

---

## 1. Kitchen Renovation Floor Plan

**Prompt:** *"Draw a floor plan of a galley kitchen — 3m x 6m, cabinets on both sides, island in the center, window at the far end, door on the left. Skissify style."*

**Why it works:** Homeowners showing contractors what they want. Contractors showing homeowners what's possible. Architects doing rapid ideation. The hand-drawn aesthetic actually helps here — it signals "this is a concept, not a final design."

**Community this reaches:** r/HomeImprovement (3.4M members), r/DIY, r/RenovationProjects

---

## 2. D&D Dungeon Level

**Prompt:** *"Design a dungeon level with 7 rooms: entrance hall, armory, guard quarters, throne room, treasury, escape tunnel, and boss chamber. Interconnected with corridors. Blueprint paper style."*

**Why it works:** Dungeon Masters discovered this themselves on Day 1 of Skissify's launch. The architectural element set (rooms, corridors, stairs, doors) maps directly to dungeon design. Blueprint paper style looks exactly like a dungeon map should.

**Community this reaches:** r/DnD (6.4M members), r/DMAcademy, r/worldbuilding

---

## 3. Office Layout

**Prompt:** *"Draw an open-plan office: 12m x 8m, 3 rows of 4 desks, meeting room in one corner, kitchen in the other, reception at the entrance. Napkin sketch style."*

**Why it works:** Office managers planning seating arrangements. Founders briefing commercial real estate agents. Remote teams visualizing what "the office" could look like. Fast, disposable, shareable.

---

## 4. UI Wireframe

**Prompt:** *"Sketch a mobile app wireframe: login screen with logo at top, email/password fields, submit button, 'forgot password' link, social login row. Hand-drawn style."*

**Why it works:** This is the classic use case — before Figma, before Sketch, before anything, UX designers drew wireframes on paper. Skissify brings that back for the AI age. "Hand-drawn = early stage, open to feedback" is a universally understood visual signal.

**Community this reaches:** r/UXDesign, r/webdev, r/userexperience

---

## 5. Classroom Geometry Exercise

**Prompt:** *"Draw a geometry exercise: a right triangle with legs labeled a=3, b=4. Include a square on each leg and one on the hypotenuse. Label the hypotenuse c. Blueprint style."*

**Why it works:** Teachers. The educational angle was unexpected for Skissify's launch. But "AI can generate geometry diagrams instantly from text" is a genuinely useful capability for educators creating worksheets or explaining spatial concepts.

**Community this reaches:** r/Teachers, r/math, r/learnmath

---

## 6. System Architecture Diagram

**Prompt:** *"Draw a simple microservices diagram: API gateway in the center, connected to 4 services — auth, users, payments, notifications. Each service connects to a database. Show data flow arrows."*

**Why it works:** Software architects doing rapid system design. Developers documenting what they built. Tech leads explaining architecture to non-technical stakeholders. The "sketch" aesthetic signals that this is architecture-level thinking, not implementation detail.

**Community this reaches:** r/softwarearchitecture, r/devops, r/ExperiencedDevs

---

## 7. Garden Layout

**Prompt:** *"Sketch a garden plan: rectangular plot 10m x 6m, raised vegetable beds along the back, fruit trees in the right corner, lawn in the center, shed on the left, path down the middle."*

**Why it works:** Homeowners planning seasonal planting. Landscape gardeners showing clients options. The visual is immediately understandable — no technical knowledge required.

**Community this reaches:** r/gardening (5M+ members), r/vegetablegardening, r/landscaping

---

## 8. Event Venue Floor Plan

**Prompt:** *"Draw a wedding venue layout: rectangular room 20m x 12m, round tables for 10 people each arranged in a grid (3 rows of 4), head table at the front, bar in the back-right corner, dance floor in the center-left, entrance at the back."*

**Why it works:** Event planners briefing caterers and venue staff. Couples planning seating arrangements. Venue managers showing prospective clients what's possible. Completely different audience from the developer-tool positioning, but real demand.

---

## 9. Story Scene Blocking

**Prompt:** *"Draw a scene blocking diagram for a screenplay: two characters face each other across a table, a window to stage-left, a door to stage-right, the camera positioned in the back-left corner. Label positions."*

**Why it works:** Screenwriters. Directors. Game designers scripting cutscenes. The concept of "blocking" (where characters and camera are positioned in a scene) is inherently spatial and traditionally sketched by hand. Skissify can generate these from scene descriptions.

---

## 10. Server Room / Data Center Layout

**Prompt:** *"Draw a server room layout: 3 racks in a row, each 2m tall, labeled PROD-01, PROD-02, and STG-01. Network switch rack on the right. UPS unit at the back. Cable management runs overhead. Blueprint style."*

**Why it works:** DevOps engineers documenting infrastructure. Data center planners. IT managers showing bosses what the server room actually contains. The blueprint aesthetic is appropriate for technical infrastructure documentation.

---

## The Pattern

Looking at these ten, the pattern is clear:

**Skissify works anywhere humans have traditionally sketched things on paper to communicate spatial ideas.**

That's: floor plans, wireframes, system diagrams, maps, event layouts, garden plans, educational diagrams, scene sketches, infrastructure docs.

What's changed is that AI agents can now generate these sketches from descriptions. The JSON is generated by Claude. The rendering is handled by Skissify. The human just describes what they want.

---

## Try It

skissify.com — free for public sketches

MCP server: `npm install -g @skissify/mcp-server`

If you find a use case not on this list, email jesper@skissify.com. Day 1 alone added dungeon maps and geometry exercises to the plan. What's next is probably something we haven't thought of yet.

---

*Skissify is a JSON-to-sketch tool built for AI agents and humans alike. Hand-drawn aesthetics, programmatic input, MCP native.*
