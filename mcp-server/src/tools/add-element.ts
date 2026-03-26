import { SketchElement, StoredSketch } from "../types.js";
import { getSketchStore, getSketch } from "./create-sketch.js";

export interface AddElementInput {
  sketchId: string;
  element: SketchElement;
}

export interface AddElementResult {
  success: boolean;
  sketchId: string;
  elementIndex: number;
  totalElements: number;
  sketch: StoredSketch;
}

export function addElement(input: AddElementInput): AddElementResult {
  const sketch = getSketch(input.sketchId);
  if (!sketch) {
    throw new Error(`Sketch not found: ${input.sketchId}`);
  }

  sketch.data.elements.push(input.element);
  sketch.updatedAt = new Date().toISOString();

  return {
    success: true,
    sketchId: input.sketchId,
    elementIndex: sketch.data.elements.length - 1,
    totalElements: sketch.data.elements.length,
    sketch,
  };
}
