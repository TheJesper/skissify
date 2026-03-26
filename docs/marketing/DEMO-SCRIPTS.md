# Skissify — Demo Scripts

Three ready-to-record demo scenarios. Each should be a GIF or short video (30-60 seconds).

---

## Demo 1: "Floor Plan in 30 Seconds"

**Story:** A developer pastes JSON and gets a beautiful hand-drawn floor plan instantly.
**Duration:** 30 seconds
**Tool:** Screen recorder (ShareX, OBS, LICEcap for GIF)

### Script

1. **Open skissify.com/editor** (0-3s)
   - Show the empty editor: JSON panel on left, blank canvas on right

2. **Click "Plan" preset** (3-5s)
   - Or paste this JSON into the editor:
   ```json
   {
     "paper": "cream",
     "tool": "ballpoint",
     "width": 800,
     "height": 600,
     "elements": [
       {"type": "rect", "x": 100, "y": 100, "w": 600, "h": 400},
       {"type": "line", "x1": 400, "y1": 100, "x2": 400, "y2": 500},
       {"type": "door-symbol", "x": 380, "y": 480, "w": 40, "h": 40, "direction": "left"},
       {"type": "window", "x": 200, "y": 100, "w": 80},
       {"type": "window", "x": 500, "y": 100, "w": 80},
       {"type": "text", "x": 220, "y": 300, "text": "Living Room", "fontSize": 16},
       {"type": "text", "x": 520, "y": 300, "text": "Bedroom", "fontSize": 16},
       {"type": "dim", "x1": 100, "y1": 530, "x2": 700, "y2": 530, "text": "7.5m"}
     ]
   }
   ```

3. **Watch it render** (5-10s)
   - The sketch appears on the right — hand-drawn walls, doors, windows, labels

4. **Adjust the Humanness slider** (10-18s)
   - Drag from low to high: watch the lines go from clean to messy
   - Click "Redraw" to re-render with new wobble

5. **Switch paper type** (18-23s)
   - Click "Blueprint" — same plan on dark blue paper with white lines
   - Click "Grid" — yellow grid paper

6. **Click Print/Export** (23-28s)
   - Opens PNG in new tab — ready to share or embed

7. **End card** (28-30s)
   - "skissify.com — JSON to sketch"

### Key points to highlight:
- Zero drawing skill needed
- Instant rendering from structured data
- Style is fully tunable
- Multiple paper types from same data

---

## Demo 2: "AI Agent Creates a Sketch"

**Story:** Claude uses MCP to generate a floor plan from a natural language description.
**Duration:** 45-60 seconds
**Tool:** Screen recorder showing Claude Desktop or Claude Code

### Script

1. **Show Claude Desktop with MCP configured** (0-5s)
   - MCP server "skissify" visible in the sidebar/tool list
   - Brief flash of the MCP config to show it's real

2. **Type prompt to Claude** (5-15s)
   ```
   Create a sketch of a small studio apartment:
   - One main room (5m x 4m)
   - Kitchen area in the top-left corner
   - Bathroom (2m x 2m) in the top-right
   - Entry door on the bottom wall
   - Two windows on the left wall
   - Use cream paper and ballpoint tool
   ```

3. **Claude thinks and generates** (15-25s)
   - Show Claude's response: it creates JSON using the Skissify MCP tool
   - The JSON appears in Claude's output

4. **Sketch appears** (25-35s)
   - Cut to skissify.com showing the rendered sketch
   - Or show Claude's tool result with the rendered image

5. **Iterate with Claude** (35-50s)
   - "Add furniture: a bed, a desk, and a couch"
   - Claude updates the JSON, new sketch renders
   - Show the before/after

6. **End card** (50-60s)
   - "AI agents + Skissify = visual output from text"
   - "skissify.com/mcp"

### Key points to highlight:
- No human drawing involved — AI did everything
- Natural language → structured JSON → visual sketch
- Iterative: ask for changes, get updated sketch
- MCP means any compatible AI can do this

---

## Demo 3: "Share with a Client"

**Story:** Create a sketch, save it, share the link, recipient views it.
**Duration:** 30 seconds
**Tool:** Screen recorder, use two browser windows or incognito

### Script

1. **Show a completed sketch in the editor** (0-5s)
   - A nice floor plan or architecture diagram already rendered
   - Could be the output from Demo 1 or 2

2. **Click Save** (5-8s)
   - Sketch saves to your account
   - Show the save confirmation

3. **Click Share / Copy Link** (8-12s)
   - A share URL appears (e.g., skissify.com/s/abc123)
   - Click "Copy Link" button

4. **Open link in incognito window** (12-20s)
   - Paste the URL in a new incognito browser
   - The sketch loads — full quality, no login required
   - Viewer sees the hand-drawn sketch on the selected paper type

5. **Show the sketch renders identically** (20-25s)
   - Same wobble, same style, same paper
   - Deterministic rendering from the same seed

6. **End card** (25-30s)
   - "Save. Share. Done."
   - "Free for public sketches. Private sharing with Pro (EUR 5/mo)"

### Key points to highlight:
- One-click sharing
- No recipient signup needed
- Sketch looks identical for everyone (seeded rendering)
- Free for public, Pro for private

---

## Recording Tips

### Technical Setup
- **Resolution:** 1920x1080 or 1280x720
- **Browser:** Clean Chrome/Firefox profile (no extensions visible)
- **Font size:** Increase editor font for readability
- **Mouse:** Slow, deliberate movements
- **GIF:** Use LICEcap or ShareX for GIF. Keep under 5MB for PH/Twitter.
- **Video:** OBS or ShareX. MP4 for PH, GIF for Twitter.

### Style Guidelines
- No background music
- No voiceover needed for GIFs (add text annotations instead)
- For video: clear, calm narration OR silent with text overlays
- Show the full URL bar so people know it's a real web app
- Use a clean desktop background

### Output Formats
| Platform | Format | Max Size | Duration |
|----------|--------|----------|----------|
| Product Hunt | GIF or MP4 | 50MB | 30-60s |
| Twitter/X | GIF or MP4 | 15MB / 2min 20s | 15-60s |
| Hacker News | Link only (no embed) | — | — |
| Reddit | GIF or direct link | varies | 15-60s |
| Dev.to | GIF embed | 10MB | 15-30s |
