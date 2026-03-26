import { SketchElement, StoredSketch } from "../types.js";
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
export declare function addElement(input: AddElementInput): AddElementResult;
//# sourceMappingURL=add-element.d.ts.map