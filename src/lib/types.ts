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
  elements: SketchElement[];
}

export interface PaperSize {
  label: string;
  width: number;
  height: number;
}

export const PAPER_SIZES: Record<string, PaperSize> = {
  "A4+": { label: "A4+", width: 1000, height: 750 },
  A4: { label: "A4", width: 842, height: 595 },
  "A3+": { label: "A3+", width: 1400, height: 1000 },
  "16:9": { label: "16:9", width: 1280, height: 720 },
};

export const PAPER_COLORS: Record<PaperType, string> = {
  cream: "#f5f0e0",
  white: "#ffffff",
  yellow: "#fffff0",
  blueprint: "#1a3a5c",
};

export const TOOL_STYLES: Record<
  ToolType,
  { lineWidth: number; opacity: number }
> = {
  pencil: { lineWidth: 1, opacity: 0.6 },
  ballpoint: { lineWidth: 1.5, opacity: 0.85 },
  ink: { lineWidth: 2.5, opacity: 1.0 },
};
