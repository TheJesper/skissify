import { getSketch, getSketchStore } from "./create-sketch.js";
/**
 * Encode sketch data as a base64 URL parameter for Skissify's editor.
 */
function encodeForUrl(data) {
    const json = JSON.stringify(data);
    // Use base64 encoding for URL safety
    return Buffer.from(json).toString("base64url");
}
export function exportSketch(input) {
    const sketch = getSketch(input.sketchId);
    if (!sketch) {
        throw new Error(`Sketch not found: ${input.sketchId}`);
    }
    const format = input.format ?? "json";
    switch (format) {
        case "json": {
            const json = JSON.stringify(sketch.data, null, 2);
            return {
                format: "json",
                data: json,
                mimeType: "application/json",
                instructions: "Copy this JSON and paste it into Skissify's JSON editor panel. " +
                    "The sketch will render immediately with hand-drawn wobble effects.",
            };
        }
        case "skissify-url": {
            const encoded = encodeForUrl(sketch.data);
            return {
                format: "skissify-url",
                data: `https://skissify.app/?sketch=${encoded}`,
                mimeType: "text/plain",
                instructions: "Open this URL in a browser to view the sketch in Skissify. " +
                    "Note: URL encoding may not work for very large sketches.",
            };
        }
        default:
            throw new Error(`Unsupported export format: ${format}. Supported: json, skissify-url`);
    }
}
/**
 * List all sketches in the current session.
 */
export function listSketches() {
    const store = getSketchStore();
    const result = [];
    for (const [_id, sketch] of store) {
        result.push({
            id: sketch.id,
            name: sketch.name,
            elementCount: sketch.data.elements.length,
            createdAt: sketch.createdAt,
            updatedAt: sketch.updatedAt,
        });
    }
    return result;
}
//# sourceMappingURL=export.js.map