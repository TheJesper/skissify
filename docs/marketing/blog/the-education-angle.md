# Skissify in the Classroom: Teaching Spatial Reasoning with AI-Generated Floor Plans

*Audience: Teachers, educators, curriculum designers, homeschooling parents*
*Best platforms: Medium, LinkedIn, r/Teachers, r/education, Substack*
*Reading time: ~6 minutes*
*Publish: Week 2, Day 10-12*

---

I built Skissify as a developer tool. Then a high school geometry teacher found it.

She's been using it to generate example floor plans for spatial reasoning exercises — and told me it's the first AI tool she's found that produces output her students can actually engage with, rather than be distracted by.

That feedback sent me down a rabbit hole. Here's what I think the education use case for AI-generated sketches actually looks like.

---

## Why Hand-Drawn Beats Polished for Learning

When students encounter a polished CAD drawing, two things happen:
1. They often assume it's authoritative and don't question it
2. The visual complexity pulls attention away from the math

A rough sketch has the opposite effect. It signals: "this is a tool for thinking, not a finished product." Students engage with it more actively — they question proportions, notice what doesn't look right, suggest corrections.

The hand-drawn aesthetic in Skissify is deliberate. Lines wobble. Corners aren't perfectly sharp. Labels look handwritten. It feels like something a teacher sketched on the board — approachable, provisional, ready to be changed.

---

## Use Case 1: Spatial Math and Geometry

**Grade level:** 6th–10th grade geometry
**Concept:** Area, perimeter, scale, coordinate geometry

**Workflow:**
1. Generate a floor plan with specific room dimensions (e.g., "kitchen 4m × 3.5m, living room 6m × 4m, bedroom 3.5m × 3.5m")
2. Print the sketch or display it
3. Ask students: "Calculate the total floor area. Which room is largest by area? What's the perimeter of the entire apartment?"

**Why Skissify works here:**
- You can specify exact dimensions in the JSON — the sketch is accurate to the numbers you provide
- Students can verify their math against the labeled dimensions
- Generate 30 different floor plans in 10 minutes for differentiated practice

**Prompt to try:**
> "Design a 3-bedroom apartment with these exact dimensions: bedroom 1 is 4m × 3.5m, bedroom 2 is 3.5m × 3m, bedroom 3 is 3m × 3m, living room is 6m × 5m, kitchen is 4m × 3m. Include dimension lines. Use Skissify JSON."

---

## Use Case 2: Architecture and Design Thinking

**Grade level:** High school elective, vocational courses
**Concept:** Space planning, adjacency, traffic flow, human factors

**Workflow:**
1. Give students design constraints: "Design a community library that must include: reading area, children's section, 3 study rooms, staff area, restrooms. Budget: 200 square meters total."
2. Have students describe their layout to Claude (or write the JSON directly if the class is technical)
3. Compare and discuss different layout choices

**Discussion questions:**
- Why does this design put the children's section near the entrance?
- What happens to the traffic flow if the restrooms are at the back?
- Which layout minimizes walking distance for staff?

**Why this works:** AI-generated layouts are fast enough to iterate. Students can redesign and see the result in under a minute. Design thinking becomes active, not just theoretical.

---

## Use Case 3: History and Social Studies

**Grade level:** Middle and high school
**Concept:** Historical architecture, urban planning, cultural geography

**Prompt examples:**
- "Sketch a typical Roman domus (house) layout with atrium, tablinum, triclinium, and peristyle"
- "Design a simplified medieval castle layout with great hall, tower, bailey, and gate"
- "Create a floor plan of a typical Japanese machiya (townhouse) with shop in front and living area behind"

The hand-drawn aesthetic is particularly well-suited to historical contexts — it looks like an archaeological sketch, not a modern technical drawing.

**Follow-up activity:** Have students compare AI-generated historical layouts with actual archaeological floor plans. What did the AI get right? What's missing? What does the comparison teach you about the culture?

---

## Use Case 4: STEM Integration — Coordinates and Code

**Grade level:** Middle school STEM, introductory programming
**Concept:** Coordinate systems, JSON data structures, algorithmic thinking

This is the use case where Skissify is uniquely valuable as a teaching tool.

Show students the JSON that generates a floor plan:

```json
{
  "elements": [
    { "type": "room", "x": 50, "y": 50, "width": 200, "height": 150, "label": "Living Room" },
    { "type": "room", "x": 50, "y": 230, "width": 90, "height": 100, "label": "Bedroom" },
    { "type": "door", "x": 120, "y": 50, "width": 60, "height": 10 }
  ]
}
```

**Exercises:**
1. Change `"x": 50` on the bedroom to `"x": 170` — what happens to the sketch? Why?
2. Add a room at coordinates `x: 260, y: 50` — where does it appear?
3. What happens if width + x extends beyond the canvas boundary?
4. Can you add a second door? What properties does it need?

Students learn coordinate systems, data structure concepts, and cause-effect reasoning in code — while producing something visual and immediately verifiable.

---

## Use Case 5: Creative Writing and World-Building

**Grade level:** Middle and high school English/Creative Writing
**Concept:** Setting, spatial narrative, story structure

Floor plans for fictional locations help students develop setting with precision:
- The mystery's mansion where the crime occurred
- The space station from their science fiction story  
- The shop in the fantasy village where the protagonist buys supplies

A sketch of the setting encourages:
- Spatial consistency (the window can't be on the east wall and the south wall simultaneously)
- Character movement logic (how does she get from the kitchen to the study without passing the parlor?)
- Scene-setting detail (what does a character see when they enter the room from the west door?)

---

## Practical Setup for Classrooms

### Option 1: Teacher generates all examples
- Teacher uses Claude Desktop with Skissify MCP server installed
- Generates floor plans from curriculum-specific prompts
- Prints or projects them for class use
- No student accounts needed

### Option 2: Students use the free editor
- Students go to skissify.com/editor
- No signup required
- Paste JSON (generated by Claude or provided by teacher) to see the sketch
- Good for the coordinate/code exercises

### Option 3: Students use Claude directly (if school has AI access)
- Students describe layouts in natural language
- Claude generates JSON, Skissify renders
- Focus on prompt engineering, design thinking, evaluation

---

## What You Don't Need

- A Skissify account (free editor, no signup)
- Technical knowledge (Claude handles the JSON)
- A budget (free tier covers everything described here)
- Special software (browser-based)

---

## A Note on AI in Education

Skissify doesn't replace student thinking — it accelerates the design/feedback loop so students can think more.

When a student can redesign a floor plan in 60 seconds instead of 20 minutes, they do 10 iterations instead of 1. The constraint of time was limiting the depth of thinking. Removing it doesn't make thinking less valuable; it makes it more accessible.

The AI isn't doing the spatial reasoning. It's translating a student's description into a visual artifact. The student still has to describe what they want, evaluate whether it worked, and decide what to change.

That's design thinking. That's spatial reasoning. That's the learning.

---

## Get Started

**Free editor (no account needed):** skissify.com/editor

**Claude Desktop MCP setup (for teachers):** skissify.com/mcp

**Sample lesson plan JSON examples:** skissify.com/examples (coming Week 2)

---

*Have you used Skissify with students? I'd love to hear what worked and what didn't. The education use case was completely unplanned — the community is teaching me.*
