export type PaperType = "cream" | "white" | "yellow" | "blueprint";
export type ToolType = "pencil" | "ballpoint" | "ink";

export type ElementType =
  | "line"
  | "rect"
  | "circle"
  | "arc"
  | "arrow"
  | "text"
  | "dashed"
  | "dim"
  | "window"
  | "door-symbol"
  | "door-slide"
  | "stair"
  | "opening"
  | "column"
  | "path"
  | "bed"
  | "sofa"
  | "dining-table"
  | "toilet"
  | "bathtub"
  | "sink"
  | "armchair"
  | "desk"
  | "bookshelf"
  | "stove"
  | "shower";

/**
 * A named layer in the sketch. Elements with matching `layer` id are rendered/hidden together.
 * Layers are stored in `SketchData.layers` and referenced by id on each element.
 */
export interface SketchLayer {
  id: string;
  name: string;
  /** When false, all elements on this layer are hidden from canvas and SVG output */
  visible: boolean;
  /** Optional display color (CSS color) for the layer dot in the UI */
  color?: string;
}

/** Predefined layer definitions for common floor plan / diagram use cases */
export const DEFAULT_LAYERS: SketchLayer[] = [
  { id: "walls",        name: "Walls",        visible: true, color: "#586e75" },
  { id: "architecture", name: "Doors & Windows", visible: true, color: "#268bd2" },
  { id: "furniture",    name: "Furniture",    visible: true, color: "#cb4b16" },
  { id: "annotations",  name: "Annotations",  visible: true, color: "#2aa198" },
  { id: "other",        name: "Other",        visible: true, color: "#839496" },
];

export interface BaseElement {
  type: ElementType;
  color?: string;
  textColor?: string;
  strokeWidth?: number;
  /** Rotation in degrees (clockwise), applied around the element's bounding-box center */
  rotation?: number;
  /** When true, the element cannot be moved, resized, or deleted via canvas interactions */
  locked?: boolean;
  /** Group identifier — elements sharing the same groupId are treated as a single unit for selection */
  groupId?: string;
  /**
   * Layer id this element belongs to. Must match an entry in `SketchData.layers[].id`.
   * If omitted or the referenced layer does not exist, the element is always visible.
   */
  layer?: string;
  /**
   * Fill color for closed shapes (rect, circle, arc, stair, column, door-symbol, door-slide).
   * Use "none" or omit for transparent fill (stroke-only).
   * Supports any CSS color string, e.g. "#f0e8d0" or "rgba(200,180,160,0.4)".
   */
  fillColor?: string;
  /** When false, the element is hidden from canvas/SVG rendering and non-selectable via click */
  visible?: boolean;
  /**
   * Per-element opacity multiplier (0.0 = fully transparent, 1.0 = fully opaque).
   * Multiplies the tool's base opacity. Omit or set to 1 for default rendering.
   */
  opacity?: number;
}

export interface LineElement extends BaseElement {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /**
   * Wall thickness in canvas units. When set, the line is rendered as two parallel
   * hand-drawn lines with a filled interior — the standard architectural wall representation.
   * The fill color follows `fillColor` (defaults to paper background).
   * Example: wallWidth: 8 renders a thick wall suitable for exterior walls.
   */
  wallWidth?: number;
}

export interface RectElement extends BaseElement {
  type: "rect";
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
}

export interface CircleElement extends BaseElement {
  type: "circle";
  cx: number;
  cy: number;
  r: number;
}

export interface ArcElement extends BaseElement {
  type: "arc";
  /** Center x (POC uses 'x', also supports 'cx') */
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  r: number;
  startAngle?: number;
  /** POC uses sweep (relative angle), production uses endAngle (absolute) */
  sweep?: number;
  endAngle?: number;
}

export interface ArrowElement extends BaseElement {
  type: "arrow";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface TextElement extends BaseElement {
  type: "text";
  x: number;
  y: number;
  /** POC uses 'content', production uses 'text' */
  text?: string;
  content?: string;
  /** POC uses 'size', production uses 'fontSize' */
  fontSize?: number;
  size?: number;
  /** Override font family for this element */
  fontFamily?: string;
  /**
   * Line height multiplier (e.g. 1.4 = 140% of fontSize). Defaults to 1.4.
   * Used for multiline text (text with \n) and auto-wrapped text.
   */
  lineHeight?: number;
  /**
   * Maximum width in element-space pixels before text auto-wraps.
   * When set, text that exceeds this width is word-wrapped onto additional lines.
   * When 0 or undefined, no auto-wrapping occurs (only \n explicit breaks).
   */
  maxWidth?: number;
}

export interface DashedElement extends BaseElement {
  type: "dashed";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashLength?: number;
  gapLength?: number;
}

export interface DimElement extends BaseElement {
  type: "dim";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  offset?: number;
  /** Override font family for this dimension's label */
  fontFamily?: string;
}

export interface WindowElement extends BaseElement {
  type: "window";
  /** POC format: x/y/w/d/wall */
  x?: number;
  y?: number;
  w?: number;
  d?: number;
  wall?: "h" | "v";
  /** Legacy format: x1/y1/x2/y2 */
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

export interface DoorSymbolElement extends BaseElement {
  type: "door-symbol";
  x: number;
  y: number;
  w?: number;
  swing?: "left" | "right";
  wall?: "h" | "v";
}

export interface DoorSlideElement extends BaseElement {
  type: "door-slide";
  x: number;
  y: number;
  w?: number;
  d?: number;
  wall?: "h" | "v";
  direction?: "left" | "right";
}

export interface StairElement extends BaseElement {
  type: "stair";
  x: number;
  y: number;
  w: number;
  h: number;
  steps?: number;
  dir?: "up" | "down";
}

export interface OpeningElement extends BaseElement {
  type: "opening";
  /** POC format: x/y/w/wall */
  x?: number;
  y?: number;
  w?: number;
  wall?: "h" | "v";
  /** Legacy format: x1/y1/x2/y2 */
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

export interface PathElement extends BaseElement {
  type: "path";
  /** Array of {x, y} points forming the freehand path */
  points: { x: number; y: number }[];
}

export interface ColumnElement extends BaseElement {
  type: "column";
  /** POC format uses x/y/s */
  x?: number;
  y?: number;
  s?: number;
  /** Legacy format uses cx/cy/size */
  cx?: number;
  cy?: number;
  size?: number;
}

/** Furniture & fixture elements — all use bounding box (x, y, w, h) */

export interface BedElement extends BaseElement {
  type: "bed";
  x: number;
  y: number;
  w: number;
  h: number;
  /** Number of pillows: 1 (single) or 2 (double). Default 2. */
  pillows?: 1 | 2;
}

export interface SofaElement extends BaseElement {
  type: "sofa";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DiningTableElement extends BaseElement {
  type: "dining-table";
  x: number;
  y: number;
  w: number;
  h: number;
  /** Number of seats per long side. Default 2. */
  seats?: number;
}

export interface ToiletElement extends BaseElement {
  type: "toilet";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface BathtubElement extends BaseElement {
  type: "bathtub";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SinkElement extends BaseElement {
  type: "sink";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ArmchairElement extends BaseElement {
  type: "armchair";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DeskElement extends BaseElement {
  type: "desk";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface BookshelfElement extends BaseElement {
  type: "bookshelf";
  x: number;
  y: number;
  w: number;
  h: number;
  /** Number of shelf dividers. Default 3. */
  shelves?: number;
}

export interface StoveElement extends BaseElement {
  type: "stove";
  x: number;
  y: number;
  w: number;
  h: number;
  /** Number of burners (2 or 4). Default 4. */
  burners?: 2 | 4;
}

export interface ShowerElement extends BaseElement {
  type: "shower";
  x: number;
  y: number;
  w: number;
  h: number;
}

export type SketchElement =
  | LineElement
  | RectElement
  | CircleElement
  | ArcElement
  | ArrowElement
  | TextElement
  | DashedElement
  | DimElement
  | WindowElement
  | DoorSymbolElement
  | DoorSlideElement
  | StairElement
  | OpeningElement
  | ColumnElement
  | PathElement
  | BedElement
  | SofaElement
  | DiningTableElement
  | ToiletElement
  | BathtubElement
  | SinkElement
  | ArmchairElement
  | DeskElement
  | BookshelfElement
  | StoveElement
  | ShowerElement;

/**
 * Available font families for text rendering.
 * Keys must be stable (used in JSON) — map to CSS font-family strings.
 * Google Fonts loaded: Caveat, Kalam, JetBrains Mono (see layout.tsx).
 */
export type SkissifyFont =
  | "courier"       // Courier New — default monospace, technical feel
  | "georgia"       // Georgia — classic serif, architectural
  | "arial"         // Arial — clean sans-serif, modern
  | "handwritten"   // Caveat — Google Font, natural handwriting (replaces Segoe Print)
  | "kalam"         // Kalam — Google Font, casual handwritten, warmer than Caveat
  | "jetbrains";    // JetBrains Mono — Google Font, crisp technical monospace

export const FONT_OPTIONS: { key: SkissifyFont; label: string; css: string }[] = [
  { key: "courier",     label: "Courier",    css: "'Courier New', monospace" },
  { key: "georgia",     label: "Georgia",    css: "Georgia, serif" },
  { key: "arial",       label: "Arial",      css: "Arial, sans-serif" },
  { key: "handwritten", label: "Caveat",     css: "'Caveat', 'Segoe Print', cursive" },
  { key: "kalam",       label: "Kalam",      css: "'Kalam', cursive" },
  { key: "jetbrains",   label: "JetBrains",  css: "'JetBrains Mono', 'Courier New', monospace" },
];

/**
 * Render style presets that affect wobble parameters and drawing behavior.
 * - napkin: loose napkin-sketch look — simple X for windows, no door arcs, boosted wobble
 * - sketch: default hand-drawn look (high amplitude + humanness)
 * - technical: crisp technical drawing (low amplitude + humanness, double-line rects)
 * - blueprint: blueprint mode (sets blue paper, very low wobble)
 */
export type RenderStyle = "napkin" | "sketch" | "technical" | "blueprint";

export const RENDER_STYLE_OPTIONS: { key: RenderStyle; label: string; icon: string; description: string }[] = [
  { key: "napkin",    label: "Napkin",    icon: "🗒️", description: "Rough napkin sketch — simple X windows, no arcs" },
  { key: "sketch",    label: "Sketch",    icon: "✏️", description: "Hand-drawn, wobbly lines" },
  { key: "technical", label: "Technical", icon: "📐", description: "Crisp, precise lines" },
  { key: "blueprint", label: "Blueprint", icon: "🔵", description: "Blueprint style on blue paper" },
];

/** Metadata shown in the blueprint title block (bottom-right table) */
export interface BlueprintMetadata {
  /** Drawing title, e.g. "FLOOR PLAN" or "PLANRITNING" */
  title?: string;
  /** Owner / project name, e.g. "Villa Ekvägen 12" */
  owner?: string;
  /** Date string, e.g. "2026-03-28" */
  date?: string;
  /** Scale indication, e.g. "1:100" */
  scale?: string;
  /** Drawing/archive number, e.g. "A-001" */
  sheetNumber?: string;
  /** Author / drawn by */
  drawnBy?: string;
}

export interface SketchData {
  paper: PaperType;
  tool: ToolType;
  inkColor: string;
  amplitude: number;
  waves: number;
  humanness: number;
  width?: number;
  height?: number;
  sessionSeed?: number;
  /**
   * Human-readable name for this sketch, e.g. "Villa Ekvägen — Ground Floor".
   * Shown in the toolbar title, used as the filename when downloading, and passed
   * as the `title` field when saving to the API.
   */
  title?: string;
  /** Default font for text/label elements */
  textFont?: SkissifyFont;
  /** Default font for dimension labels */
  dimFont?: SkissifyFont;
  /**
   * Font for room/area labels — text drawn inside `rect` elements via the `label` property.
   * Falls back to `textFont` if not set.
   */
  roomFont?: SkissifyFont;
  /**
   * Font for title/caption text elements (e.g. drawing title, section headings).
   * Applied to text elements with `fontSize >= 14` when no per-element override is set.
   * Falls back to `textFont` if not set.
   */
  titleFont?: SkissifyFont;
  /** Render style: affects wobble parameters and drawing mode */
  renderStyle?: RenderStyle;
  /** Metadata for blueprint title block overlay */
  metadata?: BlueprintMetadata;
  /**
   * Grid snap size in element-space pixels.
   * 0 or undefined = grid snap off; positive = snap to this grid.
   * Elements snap to the nearest multiple when dragged or placed.
   */
  snapGrid?: number;
  /**
   * Layer definitions. If omitted, all elements are on a single implicit visible layer.
   * Add entries here to define named layers; reference them from elements via `element.layer`.
   */
  layers?: SketchLayer[];
  elements: SketchElement[];
}

export interface PaperSize {
  label: string;
  width: number;
  height: number;
}

export const PAPER_SIZES: Record<string, PaperSize> = {
  "A4 landscape": { label: "A4 landscape", width: 595, height: 420 },
  "A4 portrait": { label: "A4 portrait", width: 420, height: 595 },
  "A3 landscape": { label: "A3 landscape", width: 700, height: 495 },
  "16:9": { label: "16:9", width: 640, height: 360 },
  "A4+": { label: "A4+", width: 1000, height: 750 },
  A4: { label: "A4", width: 842, height: 595 },
  "A3+": { label: "A3+", width: 1400, height: 1000 },
};

/** POC paper background colors */
export const PAPER_COLORS: Record<PaperType, string> = {
  cream: "#f7f0e6",
  white: "#fafafa",
  yellow: "#fef9d3",
  blueprint: "#1a3a6b", // gradient start; actual blueprint uses gradient in renderer
};

/** Board background colors (infinite canvas behind paper) */
export const BOARD_COLORS: Record<PaperType, string> = {
  cream: "#f0ead8",
  white: "#f0f0f0",
  yellow: "#f5efbf",
  blueprint: "#1a1c23",
};

/** Grid line colors per paper type */
export const GRID_COLORS: Record<PaperType, string> = {
  cream: "#a8c4d8",
  white: "#b5cde2",
  yellow: "#c8b470",
  blueprint: "rgba(180,210,255,.1)",
};

/** Blueprint color mapping — converts dark colors to light blueprint tones */
export const BLUEPRINT_COLOR_MAP: Record<string, string> = {
  "#111": "#d8eaff",
  "#222": "#b0d0f0",
  "#8b1a1a": "#ff9999",
  "#1a3a8c": "#88d0ff",
  "#1a4a20": "#aaefcd",
  "#666": "#88aacc",
  "#333": "#c0d8f0",
  "#555": "#a0b8d0",
};

/** Simple tool line width/opacity for fallback; POC uses per-tool stroke renderers */
export const TOOL_STYLES: Record<
  ToolType,
  { lineWidth: number; opacity: number }
> = {
  pencil: { lineWidth: 0.45, opacity: 0.3 },
  ballpoint: { lineWidth: 0.8, opacity: 0.7 },
  ink: { lineWidth: 1.0, opacity: 0.9 },
};
