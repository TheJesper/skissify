# Skissify MCP Server

MCP (Model Context Protocol) server that lets AI agents create hand-drawn style sketches programmatically.

## Setup

```bash
cd W:/code/skissify/mcp-server
npm install
npm run build
```

## Claude Desktop Configuration

Add to `%APPDATA%/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "skissify": {
      "command": "node",
      "args": ["W:/code/skissify/mcp-server/dist/index.js"]
    }
  }
}
```

## Tools

### `skissify_create_sketch`
Create a sketch from element definitions. Returns sketch ID + full JSON.

```
paper: cream | white | yellow | blueprint
tool: pencil | ballpoint | ink
elements: array of sketch elements
wobble: { amplitude, waves, humanness } (0-1 each)
```

### `skissify_add_element`
Add a single element to an existing sketch by ID.

### `skissify_create_floor_plan`
High-level tool: describe rooms and it generates walls, doors, windows, dimensions.

```
rooms: [{ name, width, height, position?, doors?, windows? }]
style: napkin | blueprint | clean
scale: "1:100"
```

### `skissify_list_element_types`
Returns all 14 element types with properties and examples.

### `skissify_export`
Export sketch as JSON (paste into Skissify editor) or URL.

## Element Types

`line` `rect` `circle` `arc` `arrow` `text` `dashed` `dim` `window` `door-symbol` `door-slide` `stair` `opening` `column`

## Workflow

1. Call `skissify_list_element_types` to see what's available
2. Call `skissify_create_sketch` or `skissify_create_floor_plan`
3. Optionally add more elements with `skissify_add_element`
4. Call `skissify_export` with format `json`
5. Paste the JSON into Skissify's editor panel
