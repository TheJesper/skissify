/** In-memory sketch store */
const sketches = new Map();
let nextId = 1;
function generateId() {
    return `sketch_${Date.now()}_${nextId++}`;
}
export function getSketchStore() {
    return sketches;
}
export function getSketch(id) {
    return sketches.get(id);
}
export function createSketch(input) {
    const id = generateId();
    const now = new Date().toISOString();
    const data = {
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
    const stored = {
        id,
        name: input.name,
        data,
        createdAt: now,
        updatedAt: now,
    };
    sketches.set(id, stored);
    return stored;
}
//# sourceMappingURL=create-sketch.js.map