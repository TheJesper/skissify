#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { createSketch } from "./tools/create-sketch.js";
import { addElement } from "./tools/add-element.js";
import { createFloorPlan } from "./tools/create-floor-plan.js";
import { listElementTypes } from "./tools/list-elements.js";
import { exportSketch, listSketches } from "./tools/export.js";
/** All 26 element types supported by Skissify */
const ALL_ELEMENT_TYPES = [
    "line", "rect", "circle", "arc", "arrow", "text",
    "dashed", "dim", "window", "door-symbol", "door-slide",
    "stair", "opening", "column", "path",
    "bed", "sofa", "dining-table", "armchair", "desk", "bookshelf",
    "toilet", "bathtub", "sink", "stove", "shower",
];
const server = new Server({
    name: "skissify",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// --- List Tools ---
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "skissify_create_sketch",
                description: "Create a hand-drawn style sketch from element definitions. " +
                    "Returns a sketch ID and the full SketchData JSON that can be pasted into Skissify's editor. " +
                    "Elements are rendered with organic wobble to look hand-drawn on paper.",
                inputSchema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Optional name for the sketch",
                        },
                        paper: {
                            type: "string",
                            enum: ["cream", "white", "yellow", "blueprint"],
                            description: "Paper background style. Default: cream",
                        },
                        tool: {
                            type: "string",
                            enum: ["pencil", "ballpoint", "ink"],
                            description: "Drawing tool style (affects line weight and opacity). Default: ballpoint",
                        },
                        inkColor: {
                            type: "string",
                            description: "Default ink color as hex string. Default: #111",
                        },
                        width: {
                            type: "number",
                            description: "Canvas width in pixels. Default: 1000",
                        },
                        height: {
                            type: "number",
                            description: "Canvas height in pixels. Default: 750",
                        },
                        elements: {
                            type: "array",
                            description: "Array of sketch elements. Use skissify_list_element_types to see all available types and their properties.",
                            items: {
                                type: "object",
                                properties: {
                                    type: {
                                        type: "string",
                                        enum: ALL_ELEMENT_TYPES,
                                    },
                                },
                                required: ["type"],
                            },
                        },
                        wobble: {
                            type: "object",
                            description: "Hand-drawn wobble settings",
                            properties: {
                                amplitude: {
                                    type: "number",
                                    description: "How far lines deviate (0-1). Higher = more wobbly. Default: 0.6",
                                },
                                waves: {
                                    type: "number",
                                    description: "Frequency of wobble (0-1). Higher = more waves. Default: 0.6",
                                },
                                humanness: {
                                    type: "number",
                                    description: "Random variation factor (0-1). Higher = more organic. Default: 0.15",
                                },
                            },
                        },
                    },
                    required: ["elements"],
                },
            },
            {
                name: "skissify_add_element",
                description: "Add a single element to an existing sketch. " +
                    "Use this to incrementally build up a sketch.",
                inputSchema: {
                    type: "object",
                    properties: {
                        sketchId: {
                            type: "string",
                            description: "ID of the sketch to add the element to",
                        },
                        element: {
                            type: "object",
                            description: "The element to add. Use skissify_list_element_types to see all available types.",
                            properties: {
                                type: {
                                    type: "string",
                                    enum: ALL_ELEMENT_TYPES,
                                },
                            },
                            required: ["type"],
                        },
                    },
                    required: ["sketchId", "element"],
                },
            },
            {
                name: "skissify_create_floor_plan",
                description: "Create a floor plan sketch from room descriptions. " +
                    "Automatically generates walls, labels, doors, windows, and dimensions. " +
                    "Rooms without explicit positions are auto-laid out in rows.",
                inputSchema: {
                    type: "object",
                    properties: {
                        rooms: {
                            type: "array",
                            description: "Array of room definitions",
                            items: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "Room name (displayed as label)",
                                    },
                                    width: {
                                        type: "number",
                                        description: "Room width in pixels",
                                    },
                                    height: {
                                        type: "number",
                                        description: "Room height in pixels",
                                    },
                                    position: {
                                        type: "object",
                                        description: "Optional explicit position. Omit for auto-layout.",
                                        properties: {
                                            x: { type: "number" },
                                            y: { type: "number" },
                                        },
                                        required: ["x", "y"],
                                    },
                                    doors: {
                                        type: "array",
                                        description: "Door definitions for this room",
                                        items: {
                                            type: "object",
                                            properties: {
                                                wall: {
                                                    type: "string",
                                                    enum: ["top", "bottom", "left", "right"],
                                                    description: "Which wall the door is on",
                                                },
                                                offset: {
                                                    type: "number",
                                                    description: "Position along the wall as a fraction (0-1). Default: 0.3",
                                                },
                                                type: {
                                                    type: "string",
                                                    enum: ["swing", "slide"],
                                                    description: "Door type. Default: swing",
                                                },
                                                swing: {
                                                    type: "string",
                                                    enum: ["left", "right"],
                                                    description: "Swing/slide direction. Default: left",
                                                },
                                            },
                                            required: ["wall"],
                                        },
                                    },
                                    windows: {
                                        type: "array",
                                        description: "Window definitions for this room",
                                        items: {
                                            type: "object",
                                            properties: {
                                                wall: {
                                                    type: "string",
                                                    enum: ["top", "bottom", "left", "right"],
                                                    description: "Which wall the window is on",
                                                },
                                                offset: {
                                                    type: "number",
                                                    description: "Position along the wall as a fraction (0-1). Default: 0.3",
                                                },
                                                width: {
                                                    type: "number",
                                                    description: "Window width in pixels. Default: 100",
                                                },
                                            },
                                            required: ["wall"],
                                        },
                                    },
                                },
                                required: ["name", "width", "height"],
                            },
                        },
                        style: {
                            type: "string",
                            enum: ["napkin", "blueprint", "clean"],
                            description: "Visual style preset. napkin = warm/sketchy, blueprint = blue technical, clean = minimal. Default: napkin",
                        },
                        scale: {
                            type: "string",
                            description: "Scale notation for dimensions, e.g. '1:100'. Default: '1:100'",
                        },
                        title: {
                            type: "string",
                            description: "Optional title text rendered above the floor plan",
                        },
                    },
                    required: ["rooms"],
                },
            },
            {
                name: "skissify_list_element_types",
                description: "Returns all available sketch element types with their properties and examples. " +
                    "Call this first to understand what elements you can use in create_sketch.",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
            {
                name: "skissify_export",
                description: "Export a sketch as JSON (for pasting into Skissify editor) or as a Skissify URL. " +
                    "JSON is the recommended format - paste directly into the JSON editor panel.",
                inputSchema: {
                    type: "object",
                    properties: {
                        sketchId: {
                            type: "string",
                            description: "ID of the sketch to export",
                        },
                        format: {
                            type: "string",
                            enum: ["json", "skissify-url"],
                            description: "Export format. Default: json",
                        },
                    },
                    required: ["sketchId"],
                },
            },
            {
                name: "skissify_render",
                description: "Render a sketch directly to SVG by calling the Skissify API at http://localhost:3000/api/render. " +
                    "Returns the SVG markup so you can inspect the rendered output. " +
                    "Requires a running Skissify dev server. Use skissify_export for offline JSON export.",
                inputSchema: {
                    type: "object",
                    properties: {
                        sketchId: {
                            type: "string",
                            description: "ID of a sketch created with skissify_create_sketch or skissify_create_floor_plan",
                        },
                        sketchData: {
                            type: "object",
                            description: "Raw SketchData JSON object. Use this as an alternative to sketchId to render without creating a sketch first.",
                        },
                        baseUrl: {
                            type: "string",
                            description: "Skissify server URL. Default: http://localhost:3000",
                        },
                    },
                },
            },
            {
                name: "skissify_list_sketches",
                description: "List all sketches created in the current MCP server session. " +
                    "Returns sketch IDs, names, element counts, and creation times.",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
        ],
    };
});
// --- Call Tool ---
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case "skissify_create_sketch": {
                const input = args;
                const result = createSketch(input);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                sketchId: result.id,
                                name: result.name,
                                elementCount: result.data.elements.length,
                                canvasSize: `${result.data.width}x${result.data.height}`,
                                paper: result.data.paper,
                                tool: result.data.tool,
                                message: "Sketch created. Use skissify_export to get the JSON for pasting into Skissify's editor, or skissify_add_element to add more elements.",
                                sketchData: result.data,
                            }, null, 2),
                        },
                    ],
                };
            }
            case "skissify_add_element": {
                const input = args;
                const result = addElement(input);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                success: result.success,
                                sketchId: result.sketchId,
                                elementIndex: result.elementIndex,
                                totalElements: result.totalElements,
                                message: `Element added at index ${result.elementIndex}. Total elements: ${result.totalElements}.`,
                            }, null, 2),
                        },
                    ],
                };
            }
            case "skissify_create_floor_plan": {
                const input = args;
                const result = createFloorPlan(input);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                sketchId: result.id,
                                name: result.name,
                                elementCount: result.data.elements.length,
                                canvasSize: `${result.data.width}x${result.data.height}`,
                                style: result.data.paper === "blueprint" ? "blueprint" : result.data.paper === "cream" ? "napkin" : "clean",
                                message: "Floor plan created. Use skissify_export to get the JSON, or skissify_add_element to add furniture, notes, etc.",
                                sketchData: result.data,
                            }, null, 2),
                        },
                    ],
                };
            }
            case "skissify_list_element_types": {
                const types = listElementTypes();
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                elementTypes: types,
                                totalTypes: types.length,
                                message: "These are all available element types. Each has a 'type' field and type-specific properties. " +
                                    "All elements also accept optional 'color' (hex) and 'strokeWidth' (number) properties.",
                            }, null, 2),
                        },
                    ],
                };
            }
            case "skissify_export": {
                const input = args;
                const result = exportSketch(input);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                format: result.format,
                                mimeType: result.mimeType,
                                instructions: result.instructions,
                                data: result.data,
                            }, null, 2),
                        },
                    ],
                };
            }
            case "skissify_render": {
                const { sketchId, sketchData, baseUrl = "http://localhost:3000" } = args;
                let dataToRender;
                if (sketchId) {
                    const stored = (await import("./tools/create-sketch.js")).getSketch(sketchId);
                    if (!stored)
                        throw new Error(`Sketch not found: ${sketchId}`);
                    dataToRender = stored.data;
                }
                else if (sketchData) {
                    dataToRender = sketchData;
                }
                else {
                    throw new Error("Provide either sketchId or sketchData");
                }
                const response = await fetch(`${baseUrl}/api/render`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ data: dataToRender }),
                });
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Render API returned ${response.status}: ${text}`);
                }
                const svg = await response.text();
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                success: true,
                                contentType: "image/svg+xml",
                                svgLength: svg.length,
                                svg,
                                instructions: "SVG rendered successfully. The 'svg' field contains the full SVG markup.",
                            }, null, 2),
                        },
                    ],
                };
            }
            case "skissify_list_sketches": {
                const sketches = listSketches();
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                sketches,
                                total: sketches.length,
                                message: sketches.length === 0
                                    ? "No sketches in this session yet. Create one with skissify_create_sketch or skissify_create_floor_plan."
                                    : `Found ${sketches.length} sketch(es) in this session.`,
                            }, null, 2),
                        },
                    ],
                };
            }
            default:
                return {
                    content: [
                        {
                            type: "text",
                            text: `Unknown tool: ${name}`,
                        },
                    ],
                    isError: true,
                };
        }
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
            content: [
                {
                    type: "text",
                    text: `Error: ${message}`,
                },
            ],
            isError: true,
        };
    }
});
// --- Start Server ---
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Skissify MCP server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map