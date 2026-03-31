import { NextResponse } from "next/server";

const manifest = {
  name: "Skissify",
  version: "1.0.0",
  description: "AI-agent-compatible hand-drawn sketch tool. Define sketches as JSON and get beautiful hand-drawn style SVG/PNG output with organic wobble effects.",
  url: "https://skissify.com",
  api: {
    render: {
      method: "POST",
      path: "/api/render",
      description: "Render a sketch manifest directly to SVG. Body: { data: SketchData, format?: 'svg'|'json' }. Returns SVG string (image/svg+xml) by default, or { svg, width, height } when format='json'. No auth required. Also accepts bare SketchData at top level for convenience.",
      returns: "SVG string (default) or { svg: string, width: number, height: number } (format=json)",
      rateLimit: "shared with other endpoints",
    },
    createSketch: {
      method: "POST",
      path: "/api/sketches",
      description: "Save a sketch and get a shareable URL. Body: { title?: string, data: SketchData, public?: boolean }",
      returns: "{ slug: string, id: string }",
    },
    getSketch: {
      method: "GET",
      path: "/api/sketches/:slug",
      description: "Retrieve a saved sketch by its slug",
      returns: "{ data: SketchData, title: string, slug: string }",
    },
    manifest: {
      method: "GET",
      path: "/api/manifest",
      description: "This endpoint. Returns the full schema and examples.",
    },
  },
  schema: {
    paper: {
      type: "string",
      enum: ["cream", "white", "yellow", "blueprint"],
      default: "cream",
      description: "Background paper style. 'cream' is warm beige, 'blueprint' is dark blue with light lines.",
    },
    tool: {
      type: "string",
      enum: ["pencil", "ballpoint", "ink"],
      default: "ballpoint",
      description: "Drawing tool. Pencil is thin/light, ballpoint is medium, ink is thick/bold.",
    },
    inkColor: {
      type: "string",
      default: "#222",
      description: "Default ink color as hex. Elements can override with their own 'color' prop.",
    },
    wobble: {
      amplitude: { type: "number", min: 0, max: 1, default: 0.7, description: "How much lines deviate from straight. 0 = perfectly straight, 1 = very wobbly." },
      waves: { type: "number", min: 0, max: 1, default: 0.8, description: "Frequency of wobble waves. Higher = more wiggles per line." },
      humanness: { type: "number", min: 0, max: 1, default: 0.15, description: "Random variation in stroke endpoints. Simulates imprecise hand placement." },
    },
    renderStyle: {
      type: "string",
      enum: ["napkin", "sketch", "technical", "blueprint"],
      default: "sketch",
      description: "Render style preset. 'napkin' = rough sketch with simple X windows and no door arcs, boosted wobble; 'sketch' = default hand-drawn; 'technical' = crisp low-wobble with double-line walls; 'blueprint' = sets blue paper + crisp lines.",
    },
    width: { type: "number", default: 1000, description: "Canvas width in pixels" },
    height: { type: "number", default: 750, description: "Canvas height in pixels" },
    elementTypes: {
      line: { props: ["x1", "y1", "x2", "y2", "color", "strokeWidth", "wallWidth"], description: "A wobbly hand-drawn line between two points. Add wallWidth (pixels) to render as a double-line architectural wall with fill." },
      rect: { props: ["x", "y", "w", "h", "color", "fill", "strokeWidth"], description: "A hand-drawn rectangle. 'fill' is optional fill color." },
      circle: { props: ["cx", "cy", "r", "color", "fill"], description: "A hand-drawn circle centered at (cx, cy) with radius r" },
      arc: { props: ["cx", "cy", "r", "startAngle", "endAngle", "color"], description: "A hand-drawn arc. Angles in degrees." },
      arrow: { props: ["x1", "y1", "x2", "y2", "color"], description: "Line with arrowhead pointing from (x1,y1) to (x2,y2)" },
      text: { props: ["x", "y", "text", "fontSize", "color", "fontFamily"], description: "Hand-written style text. Uses Caveat font by default." },
      dashed: { props: ["x1", "y1", "x2", "y2", "color", "dashLength"], description: "Dashed hand-drawn line" },
      dim: { props: ["x1", "y1", "x2", "y2", "label", "color"], description: "Dimension line with measurement label and tick marks at endpoints" },
      window: { props: ["x1", "y1", "x2", "y2", "color"], description: "Window symbol on wall -- perpendicular ticks at endpoints" },
      "door-symbol": { props: ["x", "y", "w", "swing", "color"], description: "Door with arc showing swing direction. swing: 'left' | 'right'" },
      "door-slide": { props: ["x", "y", "w", "color"], description: "Sliding door shown as parallel lines" },
      stair: { props: ["x", "y", "w", "h", "steps", "color"], description: "Staircase with horizontal treads" },
      opening: { props: ["x1", "y1", "x2", "y2", "color"], description: "Wall opening with small returns at each end" },
      column: { props: ["cx", "cy", "size", "color", "shape"], description: "Structural column. shape: 'circle' (default) or 'square'" },
      path: { props: ["points", "color", "strokeWidth"], description: "Freehand path through an array of {x,y} waypoints, smoothly interpolated with Catmull-Rom spline" },
      // Furniture (all use bounding box: x, y, w, h)
      bed: { props: ["x", "y", "w", "h", "pillows", "color"], description: "Bed with headboard, pillows, and cover fold. pillows: 1 (single) or 2 (double, default)" },
      sofa: { props: ["x", "y", "w", "h", "color"], description: "Sofa with backrest, armrests, and seat cushion divider" },
      "dining-table": { props: ["x", "y", "w", "h", "seats", "color"], description: "Dining table with oval chairs on all sides. seats: chairs per long side (default 2)" },
      armchair: { props: ["x", "y", "w", "h", "color"], description: "Armchair with curved backrest and armrests" },
      desk: { props: ["x", "y", "w", "h", "color"], description: "L-shaped desk with pedestal return and drawer lines" },
      bookshelf: { props: ["x", "y", "w", "h", "shelves", "color"], description: "Bookshelf with horizontal shelf dividers. shelves: number of dividers (default 3)" },
      // Kitchen & Bath fixtures
      toilet: { props: ["x", "y", "w", "h", "color"], description: "Toilet top-view: tank rectangle + bowl ellipse + inner seat ring" },
      bathtub: { props: ["x", "y", "w", "h", "color"], description: "Bathtub top-view: outer frame + inner basin oval + faucet cross" },
      sink: { props: ["x", "y", "w", "h", "color"], description: "Sink top-view: outer frame + basin oval + drain dot + T-faucet" },
      stove: { props: ["x", "y", "w", "h", "burners", "color"], description: "Stove/cooktop top-view with burner circles. burners: 2 or 4 (default 4)" },
      shower: { props: ["x", "y", "w", "h", "color"], description: "Shower enclosure top-view: square frame + diagonal spray lines + drain circle" },
    },
    paperSizes: {
      "A4+": { w: 1000, h: 750, description: "Default size, good for most sketches" },
      A4: { w: 842, h: 595, description: "Standard A4 proportions" },
      "A3+": { w: 1400, h: 1000, description: "Large format for detailed plans" },
      "16:9": { w: 1280, h: 720, description: "Widescreen, good for presentations" },
    },
  },
  examples: {
    simpleBox: {
      description: "A simple labeled box with an arrow -- minimal example",
      data: {
        paper: "cream",
        tool: "ballpoint",
        inkColor: "#222",
        amplitude: 0.7,
        waves: 0.8,
        humanness: 0.15,
        width: 540,
        height: 420,
        elements: [
          { type: "rect", x: 100, y: 100, w: 200, h: 120 },
          { type: "text", x: 150, y: 165, text: "Module A", fontSize: 18 },
          { type: "arrow", x1: 300, y1: 160, x2: 420, y2: 160 },
          { type: "rect", x: 420, y: 100, w: 200, h: 120 },
          { type: "text", x: 475, y: 165, text: "Module B", fontSize: 18 },
        ],
      },
    },
    flowchart: {
      description: "A simple decision flowchart with arrows",
      data: {
        paper: "white",
        tool: "ink",
        inkColor: "#1a1a1a",
        amplitude: 0.5,
        waves: 0.6,
        humanness: 0.1,
        width: 640,
        height: 500,
        elements: [
          { type: "rect", x: 240, y: 20, w: 160, h: 60 },
          { type: "text", x: 290, y: 55, text: "Start", fontSize: 20 },
          { type: "arrow", x1: 320, y1: 80, x2: 320, y2: 130 },
          { type: "rect", x: 220, y: 130, w: 200, h: 60 },
          { type: "text", x: 260, y: 165, text: "Process Data", fontSize: 18 },
          { type: "arrow", x1: 320, y1: 190, x2: 320, y2: 240 },
          { type: "rect", x: 230, y: 240, w: 180, h: 70 },
          { type: "text", x: 270, y: 280, text: "Decision?", fontSize: 18 },
          { type: "arrow", x1: 320, y1: 310, x2: 320, y2: 370 },
          { type: "text", x: 330, y: 345, text: "Yes", fontSize: 14, color: "#059669" },
          { type: "rect", x: 250, y: 370, w: 140, h: 50 },
          { type: "text", x: 290, y: 400, text: "Done", fontSize: 18 },
          { type: "arrow", x1: 410, y1: 275, x2: 500, y2: 275 },
          { type: "text", x: 440, y: 265, text: "No", fontSize: 14, color: "#dc2626" },
          { type: "rect", x: 500, y: 250, w: 120, h: 50 },
          { type: "text", x: 520, y: 280, text: "Retry", fontSize: 18 },
        ],
      },
    },
    floorPlan: {
      description: "A small apartment floor plan with rooms, doors, windows, and dimensions",
      data: {
        paper: "cream",
        tool: "ballpoint",
        inkColor: "#333",
        amplitude: 0.6,
        waves: 0.7,
        humanness: 0.12,
        width: 800,
        height: 600,
        elements: [
          // Outer walls
          { type: "rect", x: 50, y: 50, w: 700, h: 500 },
          // Room dividers
          { type: "line", x1: 350, y1: 50, x2: 350, y2: 350 },
          { type: "line", x1: 350, y1: 350, x2: 750, y2: 350 },
          { type: "line", x1: 350, y1: 350, x2: 50, y2: 350 },
          // Windows
          { type: "window", x1: 150, y1: 50, x2: 280, y2: 50 },
          { type: "window", x1: 450, y1: 50, x2: 600, y2: 50 },
          { type: "window", x1: 50, y1: 400, x2: 50, y2: 500 },
          // Doors
          { type: "door-symbol", x: 350, y: 150, w: 60, swing: "right" },
          { type: "door-symbol", x: 350, y: 420, w: 55, swing: "left" },
          { type: "door-symbol", x: 200, y: 350, w: 55, swing: "right" },
          // Entry door
          { type: "door-symbol", x: 680, y: 550, w: 60, swing: "left" },
          // Dimensions
          { type: "dim", x1: 50, y1: 580, x2: 350, y2: 580, label: "6.0m" },
          { type: "dim", x1: 350, y1: 580, x2: 750, y2: 580, label: "8.0m" },
          // Room labels
          { type: "text", x: 140, y: 200, text: "Bedroom", fontSize: 20 },
          { type: "text", x: 480, y: 200, text: "Living Room", fontSize: 20 },
          { type: "text", x: 140, y: 440, text: "Kitchen", fontSize: 20 },
          { type: "text", x: 480, y: 440, text: "Bathroom", fontSize: 18 },
          // Staircase
          { type: "stair", x: 620, y: 370, w: 100, h: 150, steps: 8 },
        ],
      },
    },
  },
  agentPrompt: `To create a Skissify sketch:

QUICK RENDER (no auth, immediate SVG):
1. Fetch https://skissify.com/api/manifest to learn the full schema
2. Construct a JSON object with: paper, tool, inkColor, amplitude, waves, humanness, width, height, and an elements array
3. Each element needs a "type" and type-specific properties (see elementTypes in schema)
4. POST { "data": <your sketch> } to https://skissify.com/api/render
5. You'll get back an SVG image directly (Content-Type: image/svg+xml)
   Or use format="json" to get { svg, width, height } as JSON

SAVE & SHARE (creates a public link):
1-3. Same as above
4. POST { "data": <your sketch>, "title": "My Sketch" } to https://skissify.com/api/sketches
5. You'll get back { "slug": "abc123" } -- the sketch is viewable at https://skissify.com/s/abc123

Tips:
- Use paper: "cream" + tool: "ballpoint" for the classic hand-drawn look
- Keep amplitude 0.5-0.8 for natural wobble without being messy
- For floor plans, use line/rect for walls, then add window/door-symbol/dim elements
- For diagrams, use rect + text for boxes and arrow for connections
- Text uses the Caveat handwriting font automatically
- Use /api/render for one-off renders; use /api/sketches when you want a persistent URL`,
};

export async function GET() {
  return NextResponse.json(manifest, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
