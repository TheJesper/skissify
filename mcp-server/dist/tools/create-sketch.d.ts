import { SketchElement, PaperType, ToolType, StoredSketch } from "../types.js";
export declare function getSketchStore(): Map<string, StoredSketch>;
export declare function getSketch(id: string): StoredSketch | undefined;
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
export declare function createSketch(input: CreateSketchInput): StoredSketch;
//# sourceMappingURL=create-sketch.d.ts.map