"use client";

import { useRef, useEffect, useCallback } from "react";
import { renderSketch } from "@/lib/renderer";
import type { SketchData, PaperType } from "@/lib/types";

// ── Thumbnail sketches per element type ──────────────────────────

const THUMB_SIZE = 52;

/** A minimal sketch for a single element type, scaled to fit a small canvas */
const ELEMENT_PREVIEWS: Record<string, { label: string; sketch: SketchData }> = {
  line: {
    label: "Line",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#333",
      amplitude: 0.55, waves: 0.6, humanness: 0.1,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 42,
      elements: [{ type: "line", x1: 6, y1: THUMB_SIZE / 2, x2: THUMB_SIZE - 6, y2: THUMB_SIZE / 2, color: "#333" }],
    },
  },
  dashed: {
    label: "Dashed",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#333",
      amplitude: 0.45, waves: 0.5, humanness: 0.08,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 43,
      elements: [{ type: "dashed", x1: 6, y1: THUMB_SIZE / 2, x2: THUMB_SIZE - 6, y2: THUMB_SIZE / 2, dashLength: 5, gapLength: 4, color: "#555" }],
    },
  },
  rect: {
    label: "Rect",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#333",
      amplitude: 0.5, waves: 0.55, humanness: 0.08,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 44,
      elements: [{ type: "rect", x: 8, y: 10, w: THUMB_SIZE - 16, h: THUMB_SIZE - 20, color: "#333" }],
    },
  },
  circle: {
    label: "Circle",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#333",
      amplitude: 0.5, waves: 0.6, humanness: 0.08,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 45,
      elements: [{ type: "circle", cx: THUMB_SIZE / 2, cy: THUMB_SIZE / 2, r: THUMB_SIZE / 2 - 7, color: "#333" }],
    },
  },
  arc: {
    label: "Arc",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#333",
      amplitude: 0.5, waves: 0.6, humanness: 0.08,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 46,
      elements: [{ type: "arc", cx: THUMB_SIZE / 2, cy: THUMB_SIZE / 2, r: THUMB_SIZE / 2 - 7, startAngle: 30, endAngle: 300, color: "#333" }],
    },
  },
  arrow: {
    label: "Arrow",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#333",
      amplitude: 0.45, waves: 0.5, humanness: 0.08,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 47,
      elements: [{ type: "arrow", x1: 8, y1: THUMB_SIZE / 2, x2: THUMB_SIZE - 8, y2: THUMB_SIZE / 2, color: "#333" }],
    },
  },
  text: {
    label: "Text",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#333",
      amplitude: 0.3, waves: 0.4, humanness: 0.05,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 48,
      elements: [{ type: "text", x: 8, y: 30, text: "Abc", fontSize: 14, color: "#333" }],
    },
  },
  dim: {
    label: "Dim",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#8B4513",
      amplitude: 0.35, waves: 0.4, humanness: 0.05,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 49,
      elements: [{ type: "dim", x1: 6, y1: THUMB_SIZE / 2, x2: THUMB_SIZE - 6, y2: THUMB_SIZE / 2, label: "3m", color: "#8B4513" }],
    },
  },
  window: {
    label: "Window",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#336",
      amplitude: 0.35, waves: 0.4, humanness: 0.05,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 50,
      elements: [
        { type: "line", x1: 6, y1: THUMB_SIZE / 2, x2: THUMB_SIZE - 6, y2: THUMB_SIZE / 2, color: "#555", strokeWidth: 2 },
        { type: "window", x1: 12, y1: THUMB_SIZE / 2, x2: THUMB_SIZE - 12, y2: THUMB_SIZE / 2, color: "#336" },
      ],
    },
  },
  "door-symbol": {
    label: "Door",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#8B4513",
      amplitude: 0.35, waves: 0.4, humanness: 0.05,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 51,
      elements: [
        { type: "line", x1: 10, y1: 10, x2: 10, y2: THUMB_SIZE - 8, color: "#555", strokeWidth: 2 },
        { type: "door-symbol", x: 10, y: 10, w: 32, swing: "right" as const, wall: "v" as const, color: "#8B4513" },
      ],
    },
  },
  "door-slide": {
    label: "Slide",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#8B4513",
      amplitude: 0.35, waves: 0.4, humanness: 0.05,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 52,
      elements: [
        { type: "line", x1: 6, y1: THUMB_SIZE / 2, x2: THUMB_SIZE - 6, y2: THUMB_SIZE / 2, color: "#555", strokeWidth: 2 },
        { type: "door-slide", x: 10, y: THUMB_SIZE / 2, w: 32, direction: "right" as const, color: "#8B4513" },
      ],
    },
  },
  opening: {
    label: "Opening",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#555",
      amplitude: 0.35, waves: 0.4, humanness: 0.05,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 53,
      elements: [
        { type: "line", x1: 6, y1: THUMB_SIZE / 2 - 6, x2: THUMB_SIZE - 6, y2: THUMB_SIZE / 2 - 6, color: "#555", strokeWidth: 2 },
        { type: "opening", x1: 12, y1: THUMB_SIZE / 2 - 6, x2: THUMB_SIZE - 12, y2: THUMB_SIZE / 2 - 6, color: "#777" },
      ],
    },
  },
  stair: {
    label: "Stairs",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#444",
      amplitude: 0.4, waves: 0.45, humanness: 0.06,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 54,
      elements: [{ type: "stair", x: 8, y: 8, w: THUMB_SIZE - 16, h: THUMB_SIZE - 16, steps: 6, color: "#444" }],
    },
  },
  column: {
    label: "Column",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#444",
      amplitude: 0.35, waves: 0.4, humanness: 0.05,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 55,
      elements: [{ type: "column", cx: THUMB_SIZE / 2, cy: THUMB_SIZE / 2, size: 16, color: "#444" }],
    },
  },
  path: {
    label: "Freehand",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#333",
      amplitude: 0.6, waves: 0.7, humanness: 0.15,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 56,
      elements: [{
        type: "path",
        color: "#333",
        points: [
          { x: 6, y: THUMB_SIZE - 10 },
          { x: 14, y: THUMB_SIZE / 2 + 4 },
          { x: 22, y: THUMB_SIZE / 2 - 6 },
          { x: 30, y: THUMB_SIZE / 2 + 2 },
          { x: 38, y: THUMB_SIZE / 2 - 8 },
          { x: THUMB_SIZE - 6, y: 10 },
        ],
      }],
    },
  },

  // ── Furniture & Fixtures ──────────────────────────────────────

  bed: {
    label: "Bed",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#555",
      amplitude: 0.45, waves: 0.5, humanness: 0.07,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 60,
      elements: [{ type: "bed", x: 6, y: 6, w: THUMB_SIZE - 12, h: THUMB_SIZE - 12, pillows: 2, color: "#555" }],
    },
  },
  sofa: {
    label: "Sofa",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#555",
      amplitude: 0.45, waves: 0.5, humanness: 0.07,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 61,
      elements: [{ type: "sofa", x: 6, y: 10, w: THUMB_SIZE - 12, h: THUMB_SIZE - 20, color: "#555" }],
    },
  },
  "dining-table": {
    label: "Table",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#555",
      amplitude: 0.45, waves: 0.5, humanness: 0.07,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 62,
      elements: [{ type: "dining-table", x: 12, y: 14, w: THUMB_SIZE - 24, h: THUMB_SIZE - 28, seats: 2, color: "#555" }],
    },
  },
  toilet: {
    label: "Toilet",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#555",
      amplitude: 0.45, waves: 0.5, humanness: 0.07,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 63,
      elements: [{ type: "toilet", x: 10, y: 6, w: THUMB_SIZE - 20, h: THUMB_SIZE - 12, color: "#555" }],
    },
  },
  bathtub: {
    label: "Bathtub",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#555",
      amplitude: 0.45, waves: 0.5, humanness: 0.07,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 64,
      elements: [{ type: "bathtub", x: 6, y: 8, w: THUMB_SIZE - 12, h: THUMB_SIZE - 16, color: "#555" }],
    },
  },
  sink: {
    label: "Sink",
    sketch: {
      paper: "cream", tool: "ballpoint", inkColor: "#555",
      amplitude: 0.45, waves: 0.5, humanness: 0.07,
      width: THUMB_SIZE, height: THUMB_SIZE, sessionSeed: 65,
      elements: [{ type: "sink", x: 8, y: 8, w: THUMB_SIZE - 16, h: THUMB_SIZE - 16, color: "#555" }],
    },
  },
};

// ── Category groupings ────────────────────────────────────────────

const ELEMENT_CATEGORIES = [
  {
    label: "Lines",
    items: ["line", "dashed", "arrow", "path"],
  },
  {
    label: "Shapes",
    items: ["rect", "circle", "arc"],
  },
  {
    label: "Text & Dims",
    items: ["text", "dim"],
  },
  {
    label: "Doors & Windows",
    items: ["window", "door-symbol", "door-slide", "opening"],
  },
  {
    label: "Structure",
    items: ["stair", "column"],
  },
  {
    label: "Furniture & Fixtures",
    items: ["bed", "sofa", "dining-table", "toilet", "bathtub", "sink"],
  },
];

// ── Thumbnail canvas component ────────────────────────────────────

function ElementThumb({
  elementType,
  paper,
  onAdd,
}: {
  elementType: string;
  paper: PaperType;
  onAdd: (type: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preview = ELEMENT_PREVIEWS[elementType];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !preview) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = THUMB_SIZE;
    canvas.height = THUMB_SIZE;
    ctx.clearRect(0, 0, THUMB_SIZE, THUMB_SIZE);

    // Adapt preview to current paper
    const adapted: SketchData = {
      ...preview.sketch,
      paper,
      inkColor: paper === "blueprint" ? "#d8eaff" : preview.sketch.inkColor,
      elements: preview.sketch.elements.map((el) => ({
        ...el,
        color: paper === "blueprint" ? "#d8eaff" : ((el as unknown as Record<string, unknown>).color as string) ?? preview.sketch.inkColor,
      })) as SketchData["elements"],
    };

    try {
      renderSketch(ctx, adapted, THUMB_SIZE, THUMB_SIZE);
    } catch {
      // silently ignore render errors in thumbnails
    }
  }, [preview, paper]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.dataTransfer.setData("text/x-skissify-element", elementType);
      e.dataTransfer.effectAllowed = "copy";
      // Use the canvas thumbnail as the drag ghost image
      if (canvasRef.current) {
        e.dataTransfer.setDragImage(canvasRef.current, THUMB_SIZE / 2, THUMB_SIZE / 2);
      }
    },
    [elementType]
  );

  if (!preview) return null;

  return (
    <button
      draggable
      onDragStart={handleDragStart}
      onClick={() => onAdd(elementType)}
      title={`Add ${preview.label} — click to add at center, drag to place anywhere`}
      className="flex flex-col items-center gap-0.5 p-1 rounded-lg transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-[#93a1a1] hover:bg-[#fdf6e3] cursor-grab active:cursor-grabbing"
      style={{ minWidth: 0 }}
    >
      <canvas
        ref={canvasRef}
        width={THUMB_SIZE}
        height={THUMB_SIZE}
        className="rounded shadow-sm border border-[#d0c9b8]"
        style={{ width: THUMB_SIZE, height: THUMB_SIZE, display: "block", pointerEvents: "none" }}
      />
      <span className="text-[9px] text-[#93a1a1] font-medium leading-none mt-0.5 truncate w-full text-center">
        {preview.label}
      </span>
    </button>
  );
}

// ── Main panel ────────────────────────────────────────────────────

interface ElementThumbnailPanelProps {
  paper: PaperType;
  onAddElement: (type: string) => void;
}

export default function ElementThumbnailPanel({
  paper,
  onAddElement,
}: ElementThumbnailPanelProps) {
  return (
    <div className="space-y-2">
      {ELEMENT_CATEGORIES.map((cat) => (
        <div key={cat.label}>
          <div className="text-[9px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#93a1a1" }}>
            {cat.label}
          </div>
          <div className="flex flex-wrap gap-1">
            {cat.items.map((type) => (
              <ElementThumb
                key={type}
                elementType={type}
                paper={paper}
                onAdd={onAddElement}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
