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

      // Room labels
      { type: "text", x: 160, y: 200, text: "SOVRUM", fontSize: 22, color: "#555" },
      { type: "text", x: 400, y: 200, text: "K\u00d6K", fontSize: 22, color: "#555" },
      { type: "text", x: 160, y: 470, text: "VARDAGSRUM", fontSize: 22, color: "#555" },
      { type: "text", x: 600, y: 230, text: "HALL", fontSize: 22, color: "#555" },
      { type: "text", x: 560, y: 480, text: "BADRUM", fontSize: 18, color: "#555" },
      { type: "text", x: 750, y: 500, text: "ENTR\u00c9", fontSize: 18, color: "#555" },

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

      // Room labels
      { type: "text", x: 140, y: 210, text: "SOVRUM 1", fontSize: 20, color: "#666" },
      { type: "text", x: 420, y: 210, text: "K\u00d6K", fontSize: 24, color: "#666" },
      { type: "text", x: 180, y: 510, text: "VARDAGSRUM", fontSize: 24, color: "#666" },
      { type: "text", x: 680, y: 210, text: "SOVRUM 2", fontSize: 20, color: "#666" },
      { type: "text", x: 640, y: 510, text: "HALL", fontSize: 22, color: "#666" },
      { type: "text", x: 790, y: 510, text: "BAD", fontSize: 18, color: "#666" },

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
};

export const defaultPreset = "plan drawing";
