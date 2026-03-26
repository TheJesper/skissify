import { SketchData, SketchElement, PaperType, ToolType, StoredSketch } from "../types.js";

/** In-memory sketch store */
const sketches = new Map<string, StoredSketch>();

let nextId = 1;

function generateId(): string {
  return `sketch_${Date.now()}_${nextId++}`;
}

export function getSketchStore(): Map<string, StoredSketch> {
  return sketches;
}

export function getSketch(id: string): StoredSketch | undefined {
  return sketches.get(id);
}

export interface CreateSketchInput {
  name?: string;
  paper?: PaperType;
  tool?: ToolType;
  inkColor?: string;
  width?: number;
  height?: number;
  elements: SketchElement[];
  wobble?: {
    amplitude?: number;
    waves?: number;
    humanness?: number;
  };
}

export function createSketch(input: CreateSketchInput): StoredSketch {
  const id = generateId();
  const now = new Date().toISOString();

  const data: SketchData = {
    paper: input.paper ?? "cream",
    tool: input.tool ?? "ballpoint",
    inkColor: input.inkColor ?? "#111",
    amplitude: input.wobble?.amplitude ?? 0.6,
    waves: input.wobble?.waves ?? 0.6,
    humanness: input.wobble?.humanness ?? 0.15,
    width: input.width ?? 1000,
    height: input.height ?? 750,
    elements: input.elements,
  };

  const stored: StoredSketch = {
    id,
    name: input.name,
    data,
    createdAt: now,
    updatedAt: now,
  };

  sketches.set(id, stored);
  return stored;
}
