import { SketchData } from "./types";

export const presets: Record<string, SketchData> = {
  "napkin sketch": {
    paper: "cream",
    tool: "ballpoint",
    inkColor: "#111",
    amplitude: 0.8,
    waves: 0.7,
    humanness: 0.2,
    elements: [
      // Simple box diagram
      { type: "rect", x: 100, y: 80, w: 200, h: 120, color: "#111" },
      { type: "rect", x: 400, y: 80, w: 200, h: 120, color: "#111" },
      { type: "arrow", x1: 305, y1: 140, x2: 395, y2: 140, color: "#111" },
      { type: "text", x: 150, y: 148, text: "Frontend", fontSize: 20, color: "#111" },
      { type: "text", x: 460, y: 148, text: "Backend", fontSize: 20, color: "#111" },
      { type: "circle", cx: 550, cy: 300, r: 50, color: "#2a5c2a" },
      { type: "text", x: 525, y: 308, text: "DB", fontSize: 22, color: "#2a5c2a" },
      { type: "arrow", x1: 550, y1: 200, x2: 550, y2: 245, color: "#666" },
      { type: "text", x: 80, y: 50, text: "Architecture sketch", fontSize: 24, color: "#8B4513" },
      { type: "dashed", x1: 50, y1: 250, x2: 650, y2: 250, color: "#999" },
    ],
  },

  "plan drawing": {
    paper: "cream",
    tool: "ballpoint",
    inkColor: "#222",
    amplitude: 0.5,
    waves: 0.6,
    humanness: 0.12,
    width: 900,
    height: 650,
    elements: [
      // Outer walls
      { type: "line", x1: 50, y1: 50, x2: 850, y2: 50, color: "#222" },
      { type: "line", x1: 850, y1: 50, x2: 850, y2: 600, color: "#222" },
      { type: "line", x1: 850, y1: 600, x2: 50, y2: 600, color: "#222" },
      { type: "line", x1: 50, y1: 600, x2: 50, y2: 50, color: "#222" },
      // Double outer wall
      { type: "line", x1: 55, y1: 55, x2: 845, y2: 55, color: "#222" },
      { type: "line", x1: 845, y1: 55, x2: 845, y2: 595, color: "#222" },
      { type: "line", x1: 845, y1: 595, x2: 55, y2: 595, color: "#222" },
      { type: "line", x1: 55, y1: 595, x2: 55, y2: 55, color: "#222" },

      // Interior walls
      // Horizontal divider
      { type: "line", x1: 50, y1: 320, x2: 500, y2: 320, color: "#222" },
      { type: "line", x1: 50, y1: 325, x2: 500, y2: 325, color: "#222" },
      // Vertical divider left
      { type: "line", x1: 350, y1: 50, x2: 350, y2: 320, color: "#222" },
      { type: "line", x1: 355, y1: 50, x2: 355, y2: 320, color: "#222" },
      // Vertical divider right
      { type: "line", x1: 500, y1: 50, x2: 500, y2: 600, color: "#222" },
      { type: "line", x1: 505, y1: 50, x2: 505, y2: 600, color: "#222" },
      // Bathroom wall
      { type: "line", x1: 500, y1: 380, x2: 700, y2: 380, color: "#222" },
      { type: "line", x1: 500, y1: 385, x2: 700, y2: 385, color: "#222" },
      // Small room divider
      { type: "line", x1: 700, y1: 380, x2: 700, y2: 600, color: "#222" },
      { type: "line", x1: 705, y1: 380, x2: 705, y2: 600, color: "#222" },

      // Room labels — centered in each room to avoid wall overlap
      { type: "text", x: 155, y: 195, text: "SOVRUM", fontSize: 20, color: "#555" },
      { type: "text", x: 395, y: 195, text: "K\u00d6K", fontSize: 20, color: "#555" },
      { type: "text", x: 200, y: 475, text: "VARDAGSRUM", fontSize: 20, color: "#555" },
      { type: "text", x: 640, y: 225, text: "HALL", fontSize: 20, color: "#555" },
      { type: "text", x: 565, y: 500, text: "BADRUM", fontSize: 16, color: "#555" },
      { type: "text", x: 755, y: 500, text: "ENTR\u00c9", fontSize: 16, color: "#555" },

      // Windows
      { type: "window", x1: 120, y1: 50, x2: 280, y2: 50, color: "#336" },
      { type: "window", x1: 560, y1: 50, x2: 780, y2: 50, color: "#336" },
      { type: "window", x1: 50, y1: 400, x2: 50, y2: 550, color: "#336" },

      // Doors
      { type: "door-symbol", x: 290, y: 320, w: 60, swing: "left", color: "#8B4513" },
      { type: "door-symbol", x: 500, y: 250, w: 55, swing: "right", color: "#8B4513" },
      { type: "door-symbol", x: 770, y: 600, w: 70, swing: "left", color: "#8B4513" },

      // Dimensions
      { type: "dim", x1: 50, y1: 30, x2: 850, y2: 30, label: "16.0 m", color: "#8B4513" },
      { type: "dim", x1: 30, y1: 50, x2: 30, y2: 600, label: "11.0 m", color: "#8B4513" },

      // Stair in hall
      { type: "stair", x: 620, y: 80, w: 60, h: 140, steps: 10, color: "#888" },
    ],
  },

  blueprint: {
    paper: "blueprint",
    tool: "ink",
    inkColor: "#a8c8e8",
    amplitude: 0.3,
    waves: 0.5,
    humanness: 0.08,
    width: 900,
    height: 650,
    elements: [
      // Outer walls
      { type: "line", x1: 60, y1: 60, x2: 840, y2: 60, color: "#c8ddf0" },
      { type: "line", x1: 840, y1: 60, x2: 840, y2: 590, color: "#c8ddf0" },
      { type: "line", x1: 840, y1: 590, x2: 60, y2: 590, color: "#c8ddf0" },
      { type: "line", x1: 60, y1: 590, x2: 60, y2: 60, color: "#c8ddf0" },
      // Inner rooms
      { type: "rect", x: 80, y: 80, w: 250, h: 200, color: "#8ab4d8" },
      { type: "rect", x: 370, y: 80, w: 200, h: 200, color: "#8ab4d8" },
      { type: "rect", x: 610, y: 80, w: 200, h: 250, color: "#8ab4d8" },
      { type: "rect", x: 80, y: 320, w: 350, h: 240, color: "#8ab4d8" },
      { type: "rect", x: 470, y: 370, w: 340, h: 190, color: "#8ab4d8" },
      // Labels
      { type: "text", x: 150, y: 190, text: "BEDROOM 1", fontSize: 16, color: "#c8ddf0" },
      { type: "text", x: 420, y: 190, text: "KITCHEN", fontSize: 16, color: "#c8ddf0" },
      { type: "text", x: 660, y: 210, text: "LIVING", fontSize: 16, color: "#c8ddf0" },
      { type: "text", x: 190, y: 450, text: "MASTER BEDROOM", fontSize: 16, color: "#c8ddf0" },
      { type: "text", x: 580, y: 475, text: "BATHROOM", fontSize: 16, color: "#c8ddf0" },
      // Dimensions
      { type: "dim", x1: 60, y1: 40, x2: 840, y2: 40, label: "15.6 m", color: "#6a9ac4" },
      { type: "dim", x1: 40, y1: 60, x2: 40, y2: 590, label: "10.6 m", color: "#6a9ac4" },
      // Windows
      { type: "window", x1: 140, y1: 60, x2: 270, y2: 60, color: "#6a9ac4" },
      { type: "window", x1: 620, y1: 60, x2: 780, y2: 60, color: "#6a9ac4" },
    ],
  },

  villa: {
    paper: "white",
    tool: "ballpoint",
    inkColor: "#333",
    amplitude: 0.6,
    waves: 0.65,
    humanness: 0.15,
    width: 950,
    height: 700,
    elements: [
      // Outer walls - thick double lines
      { type: "line", x1: 50, y1: 50, x2: 900, y2: 50, color: "#222", strokeWidth: 2.5 },
      { type: "line", x1: 900, y1: 50, x2: 900, y2: 650, color: "#222", strokeWidth: 2.5 },
      { type: "line", x1: 900, y1: 650, x2: 50, y2: 650, color: "#222", strokeWidth: 2.5 },
      { type: "line", x1: 50, y1: 650, x2: 50, y2: 50, color: "#222", strokeWidth: 2.5 },
      { type: "line", x1: 58, y1: 58, x2: 892, y2: 58, color: "#222" },
      { type: "line", x1: 892, y1: 58, x2: 892, y2: 642, color: "#222" },
      { type: "line", x1: 892, y1: 642, x2: 58, y2: 642, color: "#222" },
      { type: "line", x1: 58, y1: 642, x2: 58, y2: 58, color: "#222" },

      // Room dividers
      // Main horizontal
      { type: "line", x1: 50, y1: 350, x2: 600, y2: 350, color: "#222", strokeWidth: 2 },
      { type: "line", x1: 50, y1: 357, x2: 600, y2: 357, color: "#222" },
      // Vertical splits top
      { type: "line", x1: 350, y1: 50, x2: 350, y2: 350, color: "#222", strokeWidth: 2 },
      { type: "line", x1: 357, y1: 50, x2: 357, y2: 350, color: "#222" },
      { type: "line", x1: 600, y1: 50, x2: 600, y2: 650, color: "#222", strokeWidth: 2 },
      { type: "line", x1: 607, y1: 50, x2: 607, y2: 650, color: "#222" },
      // Bathroom
      { type: "line", x1: 750, y1: 350, x2: 900, y2: 350, color: "#222", strokeWidth: 2 },
      { type: "line", x1: 750, y1: 357, x2: 900, y2: 357, color: "#222" },
      { type: "line", x1: 750, y1: 350, x2: 750, y2: 650, color: "#222", strokeWidth: 2 },
      { type: "line", x1: 757, y1: 350, x2: 757, y2: 650, color: "#222" },

      // Room labels — centered in each room
      { type: "text", x: 150, y: 210, text: "SOVRUM 1", fontSize: 18, color: "#666" },
      { type: "text", x: 445, y: 210, text: "K\u00d6K", fontSize: 22, color: "#666" },
      { type: "text", x: 240, y: 510, text: "VARDAGSRUM", fontSize: 22, color: "#666" },
      { type: "text", x: 700, y: 210, text: "SOVRUM 2", fontSize: 18, color: "#666" },
      { type: "text", x: 650, y: 510, text: "HALL", fontSize: 20, color: "#666" },
      { type: "text", x: 795, y: 510, text: "BAD", fontSize: 16, color: "#666" },

      // Windows
      { type: "window", x1: 100, y1: 50, x2: 280, y2: 50, color: "#336" },
      { type: "window", x1: 400, y1: 50, x2: 550, y2: 50, color: "#336" },
      { type: "window", x1: 650, y1: 50, x2: 850, y2: 50, color: "#336" },
      { type: "window", x1: 50, y1: 420, x2: 50, y2: 580, color: "#336" },
      { type: "window", x1: 900, y1: 100, x2: 900, y2: 280, color: "#336" },

      // Doors
      { type: "door-symbol", x: 260, y: 350, w: 65, swing: "right", color: "#8B4513" },
      { type: "door-symbol", x: 600, y: 150, w: 60, swing: "left", color: "#8B4513" },
      { type: "door-symbol", x: 750, y: 430, w: 55, swing: "right", color: "#8B4513" },

      // Dimensions
      { type: "dim", x1: 50, y1: 25, x2: 900, y2: 25, label: "17.0 m", color: "#8B4513" },
      { type: "dim", x1: 25, y1: 50, x2: 25, y2: 650, label: "12.0 m", color: "#8B4513" },

      // Columns in vardagsrum
      { type: "column", cx: 300, cy: 500, size: 12, color: "#444" },

      // Trees outside (circles)
      { type: "circle", cx: 40, cy: 40, r: 15, color: "#2a5c2a" },
      { type: "circle", cx: 910, cy: 40, r: 12, color: "#2a5c2a" },
    ],
  },
  "office layout": {
    paper: "white",
    tool: "ballpoint",
    inkColor: "#222",
    amplitude: 0.4,
    waves: 0.5,
    humanness: 0.1,
    width: 900,
    height: 650,
    elements: [
      // Outer walls
      { type: "line", x1: 50, y1: 50, x2: 850, y2: 50, color: "#222", strokeWidth: 2.5 },
      { type: "line", x1: 850, y1: 50, x2: 850, y2: 600, color: "#222", strokeWidth: 2.5 },
      { type: "line", x1: 850, y1: 600, x2: 50, y2: 600, color: "#222", strokeWidth: 2.5 },
      { type: "line", x1: 50, y1: 600, x2: 50, y2: 50, color: "#222", strokeWidth: 2.5 },

      // Meeting room walls
      { type: "line", x1: 50, y1: 350, x2: 350, y2: 350, color: "#222", strokeWidth: 2 },
      { type: "line", x1: 50, y1: 355, x2: 350, y2: 355, color: "#222" },
      { type: "line", x1: 350, y1: 350, x2: 350, y2: 600, color: "#222", strokeWidth: 2 },
      { type: "line", x1: 355, y1: 350, x2: 355, y2: 600, color: "#222" },

      // Kitchen wall
      { type: "line", x1: 600, y1: 350, x2: 850, y2: 350, color: "#222", strokeWidth: 2 },
      { type: "line", x1: 600, y1: 355, x2: 850, y2: 355, color: "#222" },
      { type: "line", x1: 600, y1: 350, x2: 600, y2: 600, color: "#222", strokeWidth: 2 },
      { type: "line", x1: 605, y1: 350, x2: 605, y2: 600, color: "#222" },

      // Desk 1
      { type: "rect", x: 80, y: 80, w: 120, h: 60, color: "#444" },
      { type: "text", x: 105, y: 118, text: "DESK 1", fontSize: 14, color: "#444" },

      // Desk 2
      { type: "rect", x: 250, y: 80, w: 120, h: 60, color: "#444" },
      { type: "text", x: 275, y: 118, text: "DESK 2", fontSize: 14, color: "#444" },

      // Desk 3
      { type: "rect", x: 80, y: 200, w: 120, h: 60, color: "#444" },
      { type: "text", x: 105, y: 238, text: "DESK 3", fontSize: 14, color: "#444" },

      // Desk 4
      { type: "rect", x: 250, y: 200, w: 120, h: 60, color: "#444" },
      { type: "text", x: 275, y: 238, text: "DESK 4", fontSize: 14, color: "#444" },

      // Meeting room table
      { type: "rect", x: 120, y: 420, w: 160, h: 80, color: "#666" },
      { type: "text", x: 140, y: 468, text: "MEETING", fontSize: 16, color: "#555" },
      // Chairs around table
      { type: "rect", x: 140, y: 400, w: 30, h: 15, color: "#888" },
      { type: "rect", x: 200, y: 400, w: 30, h: 15, color: "#888" },
      { type: "rect", x: 260, y: 400, w: 30, h: 15, color: "#888" },
      { type: "rect", x: 140, y: 505, w: 30, h: 15, color: "#888" },
      { type: "rect", x: 200, y: 505, w: 30, h: 15, color: "#888" },
      { type: "rect", x: 260, y: 505, w: 30, h: 15, color: "#888" },

      // Kitchen counter
      { type: "rect", x: 620, y: 370, w: 210, h: 40, color: "#666" },
      { type: "text", x: 680, y: 398, text: "COUNTER", fontSize: 14, color: "#555" },
      { type: "text", x: 680, y: 480, text: "KITCHEN", fontSize: 18, color: "#555" },

      // Open workspace label
      { type: "text", x: 440, y: 180, text: "OPEN WORKSPACE", fontSize: 18, color: "#555" },

      // More desks in open area
      { type: "rect", x: 500, y: 100, w: 120, h: 60, color: "#444" },
      { type: "rect", x: 680, y: 100, w: 120, h: 60, color: "#444" },
      { type: "rect", x: 500, y: 220, w: 120, h: 60, color: "#444" },
      { type: "rect", x: 680, y: 220, w: 120, h: 60, color: "#444" },

      // Entrance / reception
      { type: "text", x: 400, y: 480, text: "RECEPTION", fontSize: 18, color: "#555" },
      { type: "rect", x: 420, y: 500, w: 140, h: 40, color: "#666" },
      { type: "door-symbol", x: 430, y: 600, w: 70, swing: "left", color: "#8B4513" },
      { type: "text", x: 440, y: 580, text: "ENTRANCE", fontSize: 12, color: "#8B4513" },

      // Dimensions
      { type: "dim", x1: 50, y1: 30, x2: 850, y2: 30, label: "16.0 m", color: "#8B4513" },
      { type: "dim", x1: 30, y1: 50, x2: 30, y2: 600, label: "11.0 m", color: "#8B4513" },

      // Windows
      { type: "window", x1: 100, y1: 50, x2: 300, y2: 50, color: "#336" },
      { type: "window", x1: 500, y1: 50, x2: 750, y2: 50, color: "#336" },
    ],
  },

  flowchart: {
    paper: "cream",
    tool: "ballpoint",
    inkColor: "#222",
    amplitude: 0.6,
    waves: 0.6,
    humanness: 0.15,
    width: 900,
    height: 500,
    elements: [
      // Title
      { type: "text", x: 320, y: 30, text: "Data Processing Flow", fontSize: 22, color: "#8B4513" },

      // Start circle
      { type: "circle", cx: 100, cy: 120, r: 35, color: "#2a5c2a" },
      { type: "text", x: 78, y: 126, text: "Start", fontSize: 16, color: "#2a5c2a" },

      // Arrow: Start -> Process
      { type: "arrow", x1: 135, y1: 120, x2: 210, y2: 120, color: "#333" },

      // Process Data rect
      { type: "rect", x: 215, y: 85, w: 160, h: 70, color: "#333" },
      { type: "text", x: 240, y: 128, text: "Process Data", fontSize: 16, color: "#333" },

      // Arrow: Process -> Valid?
      { type: "arrow", x1: 375, y1: 120, x2: 450, y2: 120, color: "#333" },

      // Diamond (rotated rect for "Valid?") - using 4 lines
      { type: "line", x1: 520, y1: 65, x2: 590, y2: 120, color: "#0055aa", strokeWidth: 1.5 },
      { type: "line", x1: 590, y1: 120, x2: 520, y2: 175, color: "#0055aa", strokeWidth: 1.5 },
      { type: "line", x1: 520, y1: 175, x2: 450, y2: 120, color: "#0055aa", strokeWidth: 1.5 },
      { type: "line", x1: 450, y1: 120, x2: 520, y2: 65, color: "#0055aa", strokeWidth: 1.5 },
      { type: "text", x: 497, y: 126, text: "Valid?", fontSize: 14, color: "#0055aa" },

      // Yes arrow: Valid? -> Save
      { type: "arrow", x1: 590, y1: 120, x2: 670, y2: 120, color: "#2a5c2a" },
      { type: "text", x: 615, y: 110, text: "Yes", fontSize: 13, color: "#2a5c2a" },

      // Save rect
      { type: "rect", x: 675, y: 85, w: 120, h: 70, color: "#333" },
      { type: "text", x: 710, y: 128, text: "Save", fontSize: 18, color: "#333" },

      // Arrow: Save -> End
      { type: "arrow", x1: 795, y1: 120, x2: 840, y2: 120, color: "#333" },

      // End circle (double)
      { type: "circle", cx: 860, cy: 120, r: 25, color: "#8B0000" },
      { type: "circle", cx: 860, cy: 120, r: 20, color: "#8B0000" },
      { type: "text", x: 845, y: 126, text: "End", fontSize: 14, color: "#8B0000" },

      // No arrow: Valid? -> Error (down)
      { type: "arrow", x1: 520, y1: 175, x2: 520, y2: 260, color: "#cc0000" },
      { type: "text", x: 530, y: 220, text: "No", fontSize: 13, color: "#cc0000" },

      // Error rect
      { type: "rect", x: 450, y: 265, w: 140, h: 60, color: "#cc0000" },
      { type: "text", x: 487, y: 302, text: "Error", fontSize: 18, color: "#cc0000" },

      // Arrow: Error -> back to Process (left then up)
      { type: "arrow", x1: 450, y1: 295, x2: 295, y2: 295, color: "#666" },
      { type: "arrow", x1: 295, y1: 295, x2: 295, y2: 160, color: "#666" },
      { type: "text", x: 340, y: 288, text: "retry", fontSize: 12, color: "#666" },

      // Separator
      { type: "dashed", x1: 60, y1: 400, x2: 840, y2: 400, color: "#ccc" },
      { type: "text", x: 60, y: 440, text: "Note: Max 3 retries before escalation", fontSize: 14, color: "#999" },
    ],
  },

  architecture: {
    paper: "blueprint",
    tool: "ink",
    inkColor: "#a8c8e8",
    amplitude: 0.3,
    waves: 0.4,
    humanness: 0.06,
    width: 900,
    height: 650,
    elements: [
      // Title
      { type: "text", x: 300, y: 30, text: "BUILDING ELEVATION - NORTH", fontSize: 18, color: "#6a9ac4" },

      // Ground level line
      { type: "line", x1: 100, y1: 520, x2: 800, y2: 520, color: "#c8ddf0", strokeWidth: 2.5 },

      // Ground floor walls
      { type: "line", x1: 150, y1: 520, x2: 150, y2: 350, color: "#c8ddf0", strokeWidth: 2 },
      { type: "line", x1: 750, y1: 520, x2: 750, y2: 350, color: "#c8ddf0", strokeWidth: 2 },

      // First floor line
      { type: "line", x1: 150, y1: 350, x2: 750, y2: 350, color: "#c8ddf0", strokeWidth: 2 },

      // First floor walls up to roof
      { type: "line", x1: 150, y1: 350, x2: 150, y2: 200, color: "#c8ddf0", strokeWidth: 2 },
      { type: "line", x1: 750, y1: 350, x2: 750, y2: 200, color: "#c8ddf0", strokeWidth: 2 },

      // Roof line (eaves)
      { type: "line", x1: 130, y1: 200, x2: 770, y2: 200, color: "#c8ddf0", strokeWidth: 1.5 },

      // Roof triangle
      { type: "line", x1: 130, y1: 200, x2: 450, y2: 100, color: "#c8ddf0", strokeWidth: 2 },
      { type: "line", x1: 770, y1: 200, x2: 450, y2: 100, color: "#c8ddf0", strokeWidth: 2 },

      // Ground floor: front door
      { type: "rect", x: 410, y: 420, w: 80, h: 100, color: "#8ab4d8" },
      { type: "text", x: 425, y: 475, text: "DOOR", fontSize: 12, color: "#8ab4d8" },

      // Ground floor windows
      { type: "rect", x: 200, y: 400, w: 80, h: 70, color: "#8ab4d8" },
      { type: "line", x1: 240, y1: 400, x2: 240, y2: 470, color: "#8ab4d8" },
      { type: "line", x1: 200, y1: 435, x2: 280, y2: 435, color: "#8ab4d8" },

      { type: "rect", x: 320, y: 400, w: 60, h: 70, color: "#8ab4d8" },
      { type: "line", x1: 350, y1: 400, x2: 350, y2: 470, color: "#8ab4d8" },

      { type: "rect", x: 530, y: 400, w: 60, h: 70, color: "#8ab4d8" },
      { type: "line", x1: 560, y1: 400, x2: 560, y2: 470, color: "#8ab4d8" },

      { type: "rect", x: 630, y: 400, w: 80, h: 70, color: "#8ab4d8" },
      { type: "line", x1: 670, y1: 400, x2: 670, y2: 470, color: "#8ab4d8" },
      { type: "line", x1: 630, y1: 435, x2: 710, y2: 435, color: "#8ab4d8" },

      // First floor windows
      { type: "rect", x: 220, y: 240, w: 80, h: 70, color: "#8ab4d8" },
      { type: "line", x1: 260, y1: 240, x2: 260, y2: 310, color: "#8ab4d8" },
      { type: "line", x1: 220, y1: 275, x2: 300, y2: 275, color: "#8ab4d8" },

      { type: "rect", x: 410, y: 240, w: 80, h: 70, color: "#8ab4d8" },
      { type: "line", x1: 450, y1: 240, x2: 450, y2: 310, color: "#8ab4d8" },
      { type: "line", x1: 410, y1: 275, x2: 490, y2: 275, color: "#8ab4d8" },

      { type: "rect", x: 600, y: 240, w: 80, h: 70, color: "#8ab4d8" },
      { type: "line", x1: 640, y1: 240, x2: 640, y2: 310, color: "#8ab4d8" },
      { type: "line", x1: 600, y1: 275, x2: 680, y2: 275, color: "#8ab4d8" },

      // Floor labels
      { type: "text", x: 770, y: 440, text: "GF", fontSize: 16, color: "#6a9ac4" },
      { type: "text", x: 770, y: 290, text: "1F", fontSize: 16, color: "#6a9ac4" },

      // Width dimension
      { type: "dim", x1: 150, y1: 560, x2: 750, y2: 560, label: "12.0 m", color: "#6a9ac4" },

      // Height dimension
      { type: "dim", x1: 100, y1: 520, x2: 100, y2: 200, label: "6.4 m", color: "#6a9ac4" },

      // Ground level dashes
      { type: "dashed", x1: 100, y1: 525, x2: 800, y2: 525, color: "#4a7a9c" },
    ],
  },

  "garden plan": {
    paper: "yellow",
    tool: "pencil",
    inkColor: "#444",
    amplitude: 0.7,
    waves: 0.7,
    humanness: 0.2,
    width: 900,
    height: 650,
    elements: [
      // Title
      { type: "text", x: 320, y: 30, text: "Garden Plan", fontSize: 24, color: "#5a3a1a" },

      // Property boundary (dashed)
      { type: "dashed", x1: 60, y1: 60, x2: 840, y2: 60, color: "#888" },
      { type: "dashed", x1: 840, y1: 60, x2: 840, y2: 590, color: "#888" },
      { type: "dashed", x1: 840, y1: 590, x2: 60, y2: 590, color: "#888" },
      { type: "dashed", x1: 60, y1: 590, x2: 60, y2: 60, color: "#888" },
      { type: "text", x: 65, y: 55, text: "Property boundary", fontSize: 11, color: "#888" },

      // House footprint
      { type: "rect", x: 250, y: 100, w: 300, h: 200, color: "#333" },
      { type: "line", x1: 255, y1: 105, x2: 545, y2: 105, color: "#555" },
      { type: "line", x1: 545, y1: 105, x2: 545, y2: 295, color: "#555" },
      { type: "line", x1: 545, y1: 295, x2: 255, y2: 295, color: "#555" },
      { type: "line", x1: 255, y1: 295, x2: 255, y2: 105, color: "#555" },
      { type: "text", x: 350, y: 210, text: "HOUSE", fontSize: 22, color: "#333" },

      // Patio
      { type: "rect", x: 300, y: 300, w: 200, h: 100, color: "#8B7355" },
      { type: "text", x: 355, y: 358, text: "PATIO", fontSize: 16, color: "#8B7355" },

      // Garden bed 1 - left
      { type: "rect", x: 80, y: 120, w: 130, h: 200, color: "#2a6c2a" },
      { type: "text", x: 95, y: 200, text: "Vegetable", fontSize: 14, color: "#2a6c2a" },
      { type: "text", x: 110, y: 220, text: "Garden", fontSize: 14, color: "#2a6c2a" },

      // Garden bed 2 - right
      { type: "rect", x: 600, y: 120, w: 200, h: 120, color: "#2a6c2a" },
      { type: "text", x: 650, y: 190, text: "Flower Bed", fontSize: 14, color: "#2a6c2a" },

      // Garden bed 3 - bottom
      { type: "rect", x: 100, y: 450, w: 250, h: 100, color: "#2a6c2a" },
      { type: "text", x: 165, y: 508, text: "Herb Garden", fontSize: 14, color: "#2a6c2a" },

      // Garden bed 4 - bottom right
      { type: "rect", x: 550, y: 430, w: 250, h: 120, color: "#2a6c2a" },
      { type: "text", x: 615, y: 498, text: "Rose Garden", fontSize: 14, color: "#2a6c2a" },

      // Trees (circles)
      { type: "circle", cx: 120, cy: 420, r: 25, color: "#1a5c1a" },
      { type: "text", x: 108, y: 425, text: "Oak", fontSize: 11, color: "#1a5c1a" },
      { type: "circle", cx: 750, cy: 300, r: 20, color: "#1a5c1a" },
      { type: "text", x: 737, y: 305, text: "Birch", fontSize: 10, color: "#1a5c1a" },
      { type: "circle", cx: 700, cy: 100, r: 18, color: "#1a5c1a" },
      { type: "text", x: 688, y: 105, text: "Maple", fontSize: 9, color: "#1a5c1a" },
      { type: "circle", cx: 820, cy: 480, r: 22, color: "#1a5c1a" },
      { type: "text", x: 807, y: 485, text: "Pine", fontSize: 10, color: "#1a5c1a" },

      // Path from patio to bottom (dashed)
      { type: "dashed", x1: 400, y1: 400, x2: 400, y2: 450, color: "#8B7355" },
      { type: "dashed", x1: 400, y1: 450, x2: 400, y2: 590, color: "#8B7355" },
      // Side path
      { type: "dashed", x1: 400, y1: 460, x2: 550, y2: 460, color: "#8B7355" },
      // Front path
      { type: "dashed", x1: 400, y1: 100, x2: 400, y2: 60, color: "#8B7355" },
      { type: "text", x: 405, y: 80, text: "Path", fontSize: 11, color: "#8B7355" },

      // North arrow
      { type: "arrow", x1: 820, y1: 80, x2: 820, y2: 40, color: "#333" },
      { type: "text", x: 815, y: 95, text: "N", fontSize: 16, color: "#333" },

      // Dimensions
      { type: "dim", x1: 60, y1: 610, x2: 840, y2: 610, label: "20.0 m", color: "#5a3a1a" },
      { type: "dim", x1: 40, y1: 60, x2: 40, y2: 590, label: "14.0 m", color: "#5a3a1a" },
    ],
  },
};

export const presetDescriptions: Record<string, string> = {
  "napkin sketch": "A quick architecture diagram sketched on a napkin -- boxes, arrows, and labels.",
  "plan drawing": "A Swedish apartment floor plan with rooms, doors, windows, and dimensions.",
  blueprint: "Technical blueprint-style floor plan with white-on-blue rendering.",
  villa: "A larger villa layout with multiple bedrooms, hall, and outdoor trees.",
  "office layout": "Office floor plan with desk areas, meeting room, kitchen, and reception.",
  flowchart: "Business process flowchart with decision diamond, error handling, and retry loop.",
  architecture: "Building elevation/facade showing two floors, windows, door, and roof line.",
  "garden plan": "Landscape plan with house footprint, garden beds, trees, patio, and paths.",
};

export const defaultPreset = "plan drawing";
