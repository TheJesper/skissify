/**
 * Shared types for the Skissify MCP server.
 * Mirrors the types from the main Skissify app.
 */
export type PaperType = "cream" | "white" | "yellow" | "blueprint";
export type ToolType = "pencil" | "ballpoint" | "ink";
export type ElementType = "line" | "rect" | "circle" | "arc" | "arrow" | "text" | "dashed" | "dim" | "window" | "door-symbol" | "door-slide" | "stair" | "opening" | "column" | "path" | "bed" | "sofa" | "dining-table" | "armchair" | "desk" | "bookshelf" | "toilet" | "bathtub" | "sink" | "stove" | "shower";
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
export interface PathElement extends BaseElement {
    type: "path";
    points: {
        x: number;
        y: number;
    }[];
}
export interface BedElement extends BaseElement {
    type: "bed";
    x: number;
    y: number;
    w: number;
    h: number;
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
    seats?: number;
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
    shelves?: number;
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
export interface StoveElement extends BaseElement {
    type: "stove";
    x: number;
    y: number;
    w: number;
    h: number;
    burners?: 2 | 4;
}
export interface ShowerElement extends BaseElement {
    type: "shower";
    x: number;
    y: number;
    w: number;
    h: number;
}
export type SketchElement = LineElement | RectElement | CircleElement | ArcElement | ArrowElement | TextElement | DashedElement | DimElement | WindowElement | DoorSymbolElement | DoorSlideElement | StairElement | OpeningElement | ColumnElement | PathElement | BedElement | SofaElement | DiningTableElement | ArmchairElement | DeskElement | BookshelfElement | ToiletElement | BathtubElement | SinkElement | StoveElement | ShowerElement;
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
    position?: {
        x: number;
        y: number;
    };
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
export declare const PAPER_COLORS: Record<PaperType, string>;
export declare const STYLE_PRESETS: Record<FloorPlanStyle, {
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
}>;
//# sourceMappingURL=types.d.ts.map