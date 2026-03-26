/**
 * Shared types for the Skissify MCP server.
 * Mirrors the types from the main Skissify app.
 */

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
  | "column";

export interface BaseElement {
  type: ElementType;
  color?: string;
  strokeWidth?: number;
}

export interface LineElement extends BaseElement {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface RectElement extends BaseElement {
  type: "rect";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface CircleElement extends BaseElement {
  type: "circle";
  cx: number;
  cy: number;
  r: number;
}

export interface ArcElement extends BaseElement {
  type: "arc";
  cx: number;
  cy: number;
  r: number;
  startAngle: number;
  endAngle: number;
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
  text: string;
  fontSize?: number;
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
}

export interface WindowElement extends BaseElement {
  type: "window";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface DoorSymbolElement extends BaseElement {
  type: "door-symbol";
  x: number;
  y: number;
  w: number;
  swing?: "left" | "right";
}

export interface DoorSlideElement extends BaseElement {
  type: "door-slide";
  x: number;
  y: number;
  w: number;
  direction?: "left" | "right";
}

export interface StairElement extends BaseElement {
  type: "stair";
  x: number;
  y: number;
  w: number;
  h: number;
  steps?: number;
}

export interface OpeningElement extends BaseElement {
  type: "opening";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface ColumnElement extends BaseElement {
  type: "column";
  cx: number;
  cy: number;
  size?: number;
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
  | ColumnElement;

export interface WobbleSettings {
  amplitude: number;
  waves: number;
  humanness: number;
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
  elements: SketchElement[];
}

export interface FloorPlanRoom {
  name: string;
  width: number;
  height: number;
  position?: { x: number; y: number };
  doors?: Array<{
    wall: "top" | "bottom" | "left" | "right";
    offset?: number;
    type?: "swing" | "slide";
    swing?: "left" | "right";
  }>;
  windows?: Array<{
    wall: "top" | "bottom" | "left" | "right";
    offset?: number;
    width?: number;
  }>;
}

export type FloorPlanStyle = "napkin" | "blueprint" | "clean";

/** In-memory sketch store entry */
export interface StoredSketch {
  id: string;
  name?: string;
  data: SketchData;
  createdAt: string;
  updatedAt: string;
}

/** Element type documentation */
export interface ElementTypeInfo {
  type: ElementType;
  description: string;
  properties: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  example: SketchElement;
}

export const PAPER_COLORS: Record<PaperType, string> = {
  cream: "#f5f0e0",
  white: "#ffffff",
  yellow: "#fffff0",
  blueprint: "#1a3a5c",
};

export const STYLE_PRESETS: Record<FloorPlanStyle, {
  paper: PaperType;
  tool: ToolType;
  inkColor: string;
  amplitude: number;
  waves: number;
  humanness: number;
  wallColor: string;
  labelColor: string;
  dimColor: string;
  windowColor: string;
  doorColor: string;
}> = {
  napkin: {
    paper: "cream",
    tool: "ballpoint",
    inkColor: "#111",
    amplitude: 0.8,
    waves: 0.7,
    humanness: 0.2,
    wallColor: "#222",
    labelColor: "#555",
    dimColor: "#8B4513",
    windowColor: "#336",
    doorColor: "#8B4513",
  },
  blueprint: {
    paper: "blueprint",
    tool: "ink",
    inkColor: "#a8c8e8",
    amplitude: 0.3,
    waves: 0.5,
    humanness: 0.08,
    wallColor: "#c8ddf0",
    labelColor: "#c8ddf0",
    dimColor: "#6a9ac4",
    windowColor: "#6a9ac4",
    doorColor: "#6a9ac4",
  },
  clean: {
    paper: "white",
    tool: "ballpoint",
    inkColor: "#333",
    amplitude: 0.4,
    waves: 0.5,
    humanness: 0.1,
    wallColor: "#222",
    labelColor: "#666",
    dimColor: "#8B4513",
    windowColor: "#336",
    doorColor: "#8B4513",
  },
};
