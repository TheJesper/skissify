import { getSketch } from "./create-sketch.js";
export function addElement(input) {
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
//# sourceMappingURL=add-element.js.map