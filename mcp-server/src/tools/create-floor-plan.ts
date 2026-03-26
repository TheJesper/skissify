import {
  SketchElement,
  FloorPlanRoom,
  FloorPlanStyle,
  STYLE_PRESETS,
  StoredSketch,
} from "../types.js";
import { createSketch } from "./create-sketch.js";

export interface CreateFloorPlanInput {
  rooms: FloorPlanRoom[];
  style?: FloorPlanStyle;
  scale?: string;
  title?: string;
}

const WALL_THICKNESS = 7;
const PADDING = 60;

interface RoomPlacement {
  room: FloorPlanRoom;
  x: number;
  y: number;
  w: number;
  h: number;
}

function autoLayoutRooms(rooms: FloorPlanRoom[]): RoomPlacement[] {
  const placements: RoomPlacement[] = [];
  let currentX = PADDING;
  let currentY = PADDING;
  let rowMaxHeight = 0;
  const maxRowWidth = 900;

  for (const room of rooms) {
    if (room.position) {
      placements.push({
        room,
        x: room.position.x,
        y: room.position.y,
        w: room.width,
        h: room.height,
      });
      continue;
    }

    // Simple row-based packing
    if (currentX + room.width > maxRowWidth && currentX > PADDING) {
      currentX = PADDING;
      currentY += rowMaxHeight + WALL_THICKNESS;
      rowMaxHeight = 0;
    }

    placements.push({
      room,
      x: currentX,
      y: currentY,
      w: room.width,
      h: room.height,
    });

    rowMaxHeight = Math.max(rowMaxHeight, room.height);
    currentX += room.width;
  }

  return placements;
}

function generateWallElements(
  placements: RoomPlacement[],
  style: ReturnType<typeof getStylePreset>
): SketchElement[] {
  const elements: SketchElement[] = [];

  // Calculate bounding box for outer walls
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of placements) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x + p.w);
    maxY = Math.max(maxY, p.y + p.h);
  }

  // Outer walls (double line)
  const outerWalls: SketchElement[] = [
    { type: "line", x1: minX, y1: minY, x2: maxX, y2: minY, color: style.wallColor, strokeWidth: 2.5 },
    { type: "line", x1: maxX, y1: minY, x2: maxX, y2: maxY, color: style.wallColor, strokeWidth: 2.5 },
    { type: "line", x1: maxX, y1: maxY, x2: minX, y2: maxY, color: style.wallColor, strokeWidth: 2.5 },
    { type: "line", x1: minX, y1: maxY, x2: minX, y2: minY, color: style.wallColor, strokeWidth: 2.5 },
    // Inner line of double wall
    { type: "line", x1: minX + WALL_THICKNESS, y1: minY + WALL_THICKNESS, x2: maxX - WALL_THICKNESS, y2: minY + WALL_THICKNESS, color: style.wallColor },
    { type: "line", x1: maxX - WALL_THICKNESS, y1: minY + WALL_THICKNESS, x2: maxX - WALL_THICKNESS, y2: maxY - WALL_THICKNESS, color: style.wallColor },
    { type: "line", x1: maxX - WALL_THICKNESS, y1: maxY - WALL_THICKNESS, x2: minX + WALL_THICKNESS, y2: maxY - WALL_THICKNESS, color: style.wallColor },
    { type: "line", x1: minX + WALL_THICKNESS, y1: maxY - WALL_THICKNESS, x2: minX + WALL_THICKNESS, y2: minY + WALL_THICKNESS, color: style.wallColor },
  ];
  elements.push(...outerWalls);

  // Interior walls and labels for each room
  for (const p of placements) {
    // Interior wall lines (right and bottom edges as dividers)
    const rightX = p.x + p.w;
    const bottomY = p.y + p.h;

    // Only draw interior walls (not if they overlap outer walls)
    if (rightX < maxX) {
      elements.push(
        { type: "line", x1: rightX, y1: p.y, x2: rightX, y2: bottomY, color: style.wallColor, strokeWidth: 2 },
        { type: "line", x1: rightX + WALL_THICKNESS, y1: p.y, x2: rightX + WALL_THICKNESS, y2: bottomY, color: style.wallColor },
      );
    }
    if (bottomY < maxY) {
      elements.push(
        { type: "line", x1: p.x, y1: bottomY, x2: rightX, y2: bottomY, color: style.wallColor, strokeWidth: 2 },
        { type: "line", x1: p.x, y1: bottomY + WALL_THICKNESS, x2: rightX, y2: bottomY + WALL_THICKNESS, color: style.wallColor },
      );
    }

    // Room label (centered)
    elements.push({
      type: "text",
      x: p.x + p.w / 2 - (p.room.name.length * 5),
      y: p.y + p.h / 2 + 6,
      text: p.room.name.toUpperCase(),
      fontSize: 18,
      color: style.labelColor,
    });
  }

  return elements;
}

function generateDoorElements(
  placements: RoomPlacement[],
  style: ReturnType<typeof getStylePreset>
): SketchElement[] {
  const elements: SketchElement[] = [];

  for (const p of placements) {
    if (!p.room.doors) continue;

    for (const door of p.room.doors) {
      const offset = door.offset ?? 0.3;
      const doorType = door.type ?? "swing";
      const doorWidth = 60;

      let dx: number, dy: number;

      switch (door.wall) {
        case "top":
          dx = p.x + p.w * offset;
          dy = p.y;
          break;
        case "bottom":
          dx = p.x + p.w * offset;
          dy = p.y + p.h;
          break;
        case "left":
          dx = p.x;
          dy = p.y + p.h * offset;
          break;
        case "right":
          dx = p.x + p.w;
          dy = p.y + p.h * offset;
          break;
      }

      if (doorType === "swing") {
        elements.push({
          type: "door-symbol",
          x: dx,
          y: dy,
          w: doorWidth,
          swing: door.swing ?? "left",
          color: style.doorColor,
        });
      } else {
        elements.push({
          type: "door-slide",
          x: dx,
          y: dy,
          w: doorWidth,
          direction: door.swing ?? "right",
          color: style.doorColor,
        });
      }
    }
  }

  return elements;
}

function generateWindowElements(
  placements: RoomPlacement[],
  style: ReturnType<typeof getStylePreset>
): SketchElement[] {
  const elements: SketchElement[] = [];

  for (const p of placements) {
    if (!p.room.windows) continue;

    for (const win of p.room.windows) {
      const offset = win.offset ?? 0.3;
      const winWidth = win.width ?? 100;

      let x1: number, y1: number, x2: number, y2: number;

      switch (win.wall) {
        case "top":
          x1 = p.x + p.w * offset;
          y1 = p.y;
          x2 = x1 + winWidth;
          y2 = p.y;
          break;
        case "bottom":
          x1 = p.x + p.w * offset;
          y1 = p.y + p.h;
          x2 = x1 + winWidth;
          y2 = p.y + p.h;
          break;
        case "left":
          x1 = p.x;
          y1 = p.y + p.h * offset;
          x2 = p.x;
          y2 = y1 + winWidth;
          break;
        case "right":
          x1 = p.x + p.w;
          y1 = p.y + p.h * offset;
          x2 = p.x + p.w;
          y2 = y1 + winWidth;
          break;
      }

      elements.push({
        type: "window",
        x1: x1!,
        y1: y1!,
        x2: x2!,
        y2: y2!,
        color: style.windowColor,
      });
    }
  }

  return elements;
}

function generateDimensionElements(
  placements: RoomPlacement[],
  scale: string,
  style: ReturnType<typeof getStylePreset>
): SketchElement[] {
  const elements: SketchElement[] = [];

  // Parse scale (e.g., "1:100" means 1 pixel = 1 unit at that scale)
  const scaleMatch = scale.match(/1:(\d+)/);
  const scaleFactor = scaleMatch ? parseInt(scaleMatch[1]) / 100 : 1;

  // Bounding box
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of placements) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x + p.w);
    maxY = Math.max(maxY, p.y + p.h);
  }

  const totalW = ((maxX - minX) * scaleFactor / 10).toFixed(1);
  const totalH = ((maxY - minY) * scaleFactor / 10).toFixed(1);

  elements.push(
    { type: "dim", x1: minX, y1: minY - 25, x2: maxX, y2: minY - 25, label: `${totalW} m`, color: style.dimColor },
    { type: "dim", x1: minX - 25, y1: minY, x2: minX - 25, y2: maxY, label: `${totalH} m`, color: style.dimColor },
  );

  return elements;
}

function getStylePreset(style: FloorPlanStyle) {
  return STYLE_PRESETS[style];
}

export function createFloorPlan(input: CreateFloorPlanInput): StoredSketch {
  const style = getStylePreset(input.style ?? "napkin");
  const scale = input.scale ?? "1:100";

  const placements = autoLayoutRooms(input.rooms);

  // Calculate canvas size from placements
  let maxX = 0, maxY = 0;
  for (const p of placements) {
    maxX = Math.max(maxX, p.x + p.w);
    maxY = Math.max(maxY, p.y + p.h);
  }

  const elements: SketchElement[] = [];

  // Title
  if (input.title) {
    elements.push({
      type: "text",
      x: PADDING,
      y: PADDING - 25,
      text: input.title,
      fontSize: 24,
      color: style.labelColor,
    });
  }

  // Generate all elements
  elements.push(...generateWallElements(placements, style));
  elements.push(...generateDoorElements(placements, style));
  elements.push(...generateWindowElements(placements, style));
  elements.push(...generateDimensionElements(placements, scale, style));

  // Scale annotation
  elements.push({
    type: "text",
    x: maxX + PADDING - 80,
    y: maxY + PADDING + 15,
    text: `Scale ${scale}`,
    fontSize: 12,
    color: style.dimColor,
  });

  return createSketch({
    name: input.title ?? "Floor Plan",
    paper: style.paper,
    tool: style.tool,
    inkColor: style.inkColor,
    width: maxX + PADDING * 2,
    height: maxY + PADDING * 2 + 30,
    elements,
    wobble: {
      amplitude: style.amplitude,
      waves: style.waves,
      humanness: style.humanness,
    },
  });
}
