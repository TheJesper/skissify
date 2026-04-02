# Skissify vs Excalidraw: The API-First Answer

*Posted: April 2026 — Cycle 117*

---

I've written versions of this comparison before. Every time, I find a new angle that's more honest.

This time: **the API-first framing**. It's the angle that actually settles the question for developers.

---

## The Short Answer

**Use Excalidraw when** a human is drawing.
**Use Skissify when** a machine is drawing.

That's it. The rest is detail.

---

## Excalidraw Is a Drawing Tool

Excalidraw is, at its core, an interactive whiteboard for humans. You open it in a browser. You drag shapes. You type labels. You collaborate with teammates in real-time.

It has an embed API and a JavaScript library, and you can technically drive it programmatically. But it wasn't designed for that. The mental model is: human hands on a virtual whiteboard.

**The API story:**
- No REST API
- JavaScript library requires a browser runtime
- No MCP server
- To generate a sketch from data, you'd write a custom plugin or use the library in a headless browser — significant engineering effort

---

## Skissify Is a Rendering API

Skissify's mental model is the opposite: **JSON in, sketch out**. No browser required on the generator side.

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","wobble":5,"elements":[...]}'
```

You get back an image. That's the whole API surface.

**The API story:**
- REST API, no auth required on free tier
- MCP server ships out of the box: `npx skissify-mcp`
- Any AI agent with MCP support can call it directly
- No browser. No JavaScript runtime. No plugin.

---

## Feature Comparison (Honest)

| Feature | Excalidraw | Skissify |
|---------|-----------|----------|
| Human drawing experience | ✅ Excellent | ❌ Not designed for this |
| Real-time collaboration | ✅ Yes | ❌ No |
| Shape library | ✅ Large | ✅ 14 element types (domain-specific) |
| API / programmatic use | ⚠️ Possible with JS lib | ✅ Native REST + MCP |
| AI agent integration | ❌ Significant effort | ✅ First-class (MCP server) |
| Floor plan elements (doors, stairs, windows) | ❌ Generic shapes | ✅ Purpose-built |
| Deterministic output | ❌ (session-based) | ✅ Seeded, reproducible |
| Self-hostable | ✅ Yes | ✅ Yes |
| Open source | ✅ Yes | ✅ Yes |
| Price | Free | Free tier + €5/mo Pro |

---

## The Wobble Difference

Both tools produce sketchy-looking output by default. The similarity is surface-level.

Excalidraw's hand-drawn style is decorative — it makes human drawings look more casual and approachable. The "wobble" is fixed visual style.

Skissify's wobble is a parameter:
- `wobble: 0` → perfectly straight lines
- `wobble: 5` → natural hand-drawn feel
- `wobble: 10` → loose, expressive

This matters when the sketch is AI-generated. A floor plan for a homeowner should feel different from a floor plan for an architect. The agent can tune the wobble based on context.

---

## The Reproducibility Difference

Here's the technical difference that matters most for AI workflows:

**Excalidraw:** Each session produces unique output. Two renders of the same "specification" will look different.

**Skissify:** The manifest content determines the seed. Same JSON → same sketch, always. You can version sketches alongside code, compare them across time, and cache results.

For AI agents generating design artifacts, reproducibility isn't a nice-to-have — it's a requirement.

---

## Use Both

This isn't actually an either/or question in most real workflows:

1. AI agent generates initial sketch via Skissify MCP
2. Agent shares sketch URL with human
3. Human opens sketch in Skissify for adjustments
4. OR: Human exports to format compatible with Excalidraw for team collaboration

Skissify handles the **generation** step. Human tools like Excalidraw handle the **collaboration** step.

The workflow is: Skissify → (human review) → Excalidraw/Figma → design artifacts.

---

## The One-Sentence Verdict

**Excalidraw** is where teams collaborate. **Skissify** is where AI agents start.

---

*Skissify — JSON to hand-drawn sketch. MCP server: `npx skissify-mcp`. Live at [skissify.com](https://skissify.com)*
