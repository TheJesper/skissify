/**
 * Shared types for the Skissify MCP server.
 * Mirrors the types from the main Skissify app.
 */
export const PAPER_COLORS = {
    cream: "#f5f0e0",
    white: "#ffffff",
    yellow: "#fffff0",
    blueprint: "#1a3a5c",
};
export const STYLE_PRESETS = {
    napkin: {
        paper: "cream",
        tool: "ballpoint",
        inkColor: "#111",
        amplitude: 0.8,
        waves: 0.7,
        humanness: 0.2,
        wallColor: "#222",
        labelColor: "#555",
        dimColor: "#8B4513",
        windowColor: "#336",
        doorColor: "#8B4513",
    },
    blueprint: {
        paper: "blueprint",
        tool: "ink",
        inkColor: "#a8c8e8",
        amplitude: 0.3,
        waves: 0.5,
        humanness: 0.08,
        wallColor: "#c8ddf0",
        labelColor: "#c8ddf0",
        dimColor: "#6a9ac4",
        windowColor: "#6a9ac4",
        doorColor: "#6a9ac4",
    },
    clean: {
        paper: "white",
        tool: "ballpoint",
        inkColor: "#333",
        amplitude: 0.4,
        waves: 0.5,
        humanness: 0.1,
        wallColor: "#222",
        labelColor: "#666",
        dimColor: "#8B4513",
        windowColor: "#336",
        doorColor: "#8B4513",
    },
};
//# sourceMappingURL=types.js.map