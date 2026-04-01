"use client";

import { useRef, useEffect, useCallback, useState, useMemo } from "react";
import { SketchData, SketchElement, BOARD_COLORS } from "@/lib/types";
import { renderSketch, computeCenterTransform } from "@/lib/renderer";
import Rulers, { RULER_SIZE } from "./Rulers";
import ContextMenu, { ContextMenuAction } from "./ContextMenu";
import Minimap from "./Minimap";

// Type-safe accessors for union element types
type AnyEl = Record<string, unknown>;
const asLine = (el: SketchElement) => el as unknown as { x1: number; y1: number; x2: number; y2: number };
const asRect = (el: SketchElement) => el as unknown as { x: number; y: number; w: number; h: number };
const asCirc = (el: SketchElement) => el as unknown as { cx: number; cy: number; r: number };
const asPos = (el: SketchElement) => el as unknown as { x: number; y: number };

function getElementBounds(el: SketchElement): { x: number; y: number; w: number; h: number } | null {
  if ("x1" in el && "x2" in el) {
    const { x1, y1, x2, y2 } = asLine(el);
    // For wall lines, expand bounds to include the full wall thickness
    const wallPad = (el as unknown as { wallWidth?: number }).wallWidth
      ? Math.ceil(((el as unknown as { wallWidth: number }).wallWidth) / 2) + 3
      : 5;
    return { x: Math.min(x1, x2) - wallPad, y: Math.min(y1, y2) - wallPad, w: Math.abs(x2 - x1) + wallPad * 2, h: Math.abs(y2 - y1) + wallPad * 2 };
  }
  if ("x" in el && "w" in el && "h" in el) {
    const { x, y, w, h } = asRect(el);
    return { x: x - 5, y: y - 5, w: w + 10, h: h + 10 };
  }
  if ("cx" in el && "r" in el) {
    const { cx, cy, r } = asCirc(el);
    return { x: cx - r - 5, y: cy - r - 5, w: r * 2 + 10, h: r * 2 + 10 };
  }
  if ("points" in el && Array.isArray((el as unknown as { points: unknown }).points)) {
    const pts = (el as unknown as { points: { x: number; y: number }[] }).points;
    if (pts.length > 0) {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const p of pts) { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); }
      return { x: minX - 5, y: minY - 5, w: maxX - minX + 10, h: maxY - minY + 10 };
    }
  }
  if ("x" in el && "y" in el) {
    const { x, y } = asPos(el);
    return { x: x - 5, y: y - 20, w: 80, h: 30 };
  }
  return null;
}

/**
 * Smart guides: get the key X and Y snap positions for an element
 * (left edge, center, right edge for X; top, center, bottom for Y).
 */
function getElementSnapEdges(el: SketchElement): { xs: number[]; ys: number[] } {
  if ("x1" in el && "x2" in el) {
    const l = el as unknown as { x1: number; y1: number; x2: number; y2: number };
    return {
      xs: [l.x1, l.x2, (l.x1 + l.x2) / 2],
      ys: [l.y1, l.y2, (l.y1 + l.y2) / 2],
    };
  }
  if ("x" in el && "w" in el && "h" in el) {
    const r = el as unknown as { x: number; y: number; w: number; h: number };
    return {
      xs: [r.x, r.x + r.w / 2, r.x + r.w],
      ys: [r.y, r.y + r.h / 2, r.y + r.h],
    };
  }
  if ("cx" in el && "r" in el) {
    const c = el as unknown as { cx: number; cy: number; r: number };
    return {
      xs: [c.cx - c.r, c.cx, c.cx + c.r],
      ys: [c.cy - c.r, c.cy, c.cy + c.r],
    };
  }
  if ("x" in el && "y" in el) {
    const p = el as unknown as { x: number; y: number };
    return { xs: [p.x], ys: [p.y] };
  }
  return { xs: [], ys: [] };
}

/**
 * Compute active alignment guides given the current sketch state and which indices are being dragged.
 * Returns element-space guide positions.
 * @param elements  All elements in the sketch
 * @param draggedIndices  Set of indices being dragged
 * @param snapTolerance  Distance in element-space to trigger a guide (default 6px)
 */
function computeAlignmentGuides(
  elements: SketchElement[],
  draggedIndices: Set<number>,
  snapTolerance = 6
): Array<{ axis: "h" | "v"; pos: number }> {
  const guides: Array<{ axis: "h" | "v"; pos: number }> = [];
  if (draggedIndices.size === 0) return guides;

  // Collect snap edges from non-selected elements
  const staticXs: number[] = [];
  const staticYs: number[] = [];
  for (let i = 0; i < elements.length; i++) {
    if (draggedIndices.has(i)) continue;
    const { xs, ys } = getElementSnapEdges(elements[i]);
    staticXs.push(...xs);
    staticYs.push(...ys);
  }

  // Collect snap edges from dragged elements
  const draggedXs: number[] = [];
  const draggedYs: number[] = [];
  for (const i of draggedIndices) {
    const { xs, ys } = getElementSnapEdges(elements[i]);
    draggedXs.push(...xs);
    draggedYs.push(...ys);
  }

  const seen = new Set<string>();
  // Check dragged edges against static edges
  for (const dx of draggedXs) {
    for (const sx of staticXs) {
      if (Math.abs(dx - sx) <= snapTolerance) {
        const key = `v:${Math.round(sx)}`;
        if (!seen.has(key)) { seen.add(key); guides.push({ axis: "v", pos: sx }); }
      }
    }
  }
  for (const dy of draggedYs) {
    for (const sy of staticYs) {
      if (Math.abs(dy - sy) <= snapTolerance) {
        const key = `h:${Math.round(sy)}`;
        if (!seen.has(key)) { seen.add(key); guides.push({ axis: "h", pos: sy }); }
      }
    }
  }

  return guides;
}

/** Clamp zoom to [min, max] */
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

/** Clamp zoom value, guarding against NaN/Infinity */
function safeZoom(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 1;
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value));
}

// --- Resize handle types ---
type HandleId = "nw" | "n" | "ne" | "w" | "e" | "sw" | "s" | "se" | "p1" | "p2" | "radius";

interface ResizeHandle {
  id: HandleId;
  x: number;
  y: number;
}

/** Cursor per handle type */
const HANDLE_CURSOR: Record<HandleId, string> = {
  nw: "nwse-resize",
  se: "nwse-resize",
  ne: "nesw-resize",
  sw: "nesw-resize",
  n: "ns-resize",
  s: "ns-resize",
  e: "ew-resize",
  w: "ew-resize",
  p1: "crosshair",
  p2: "crosshair",
  radius: "ew-resize",
};

/** Compute resize handles for a single element (canvas coords). Returns null if unsupported. */
function getResizeHandles(el: SketchElement): ResizeHandle[] | null {
  // Rect-like elements with x/y/w/h
  if ("x" in el && "w" in el && "h" in el) {
    const { x, y, w, h } = asRect(el);
    const cx = x + w / 2;
    const cy = y + h / 2;
    return [
      { id: "nw", x, y },
      { id: "n",  x: cx, y },
      { id: "ne", x: x + w, y },
      { id: "w",  x, y: cy },
      { id: "e",  x: x + w, y: cy },
      { id: "sw", x, y: y + h },
      { id: "s",  x: cx, y: y + h },
      { id: "se", x: x + w, y: y + h },
    ];
  }
  // Line-like elements with x1/y1/x2/y2
  if ("x1" in el && "x2" in el) {
    const { x1, y1, x2, y2 } = asLine(el);
    return [
      { id: "p1", x: x1, y: y1 },
      { id: "p2", x: x2, y: y2 },
    ];
  }
  // Circle
  if ("cx" in el && "r" in el) {
    const { cx, cy, r } = asCirc(el);
    return [{ id: "radius", x: cx + r, y: cy }];
  }
  return null;
}

/** Hit-test a single handle (in canvas coords). HSIZE is half the handle size. */
function hitHandle(h: ResizeHandle, mx: number, my: number, HSIZE = 10): boolean {
  return Math.abs(mx - h.x) <= HSIZE && Math.abs(my - h.y) <= HSIZE;
}

/**
 * Get the rotation handle position for an element (canvas coords, element-space).
 * Returns the handle center position and the element's pivot (center) position.
 * The handle is rendered 20px above the top-center of the bounding box.
 */
function getRotationHandle(el: SketchElement): { handle: { x: number; y: number }; pivot: { x: number; y: number } } | null {
  const bounds = getElementBounds(el);
  if (!bounds) return null;
  const pivot = { x: bounds.x + bounds.w / 2, y: bounds.y + bounds.h / 2 };
  const rotation = el.rotation ?? 0;
  // Offset: 20px above center (in element-local space, before rotation)
  const localOffsetY = -(bounds.h / 2 + 20);
  // Rotate the offset by the element's rotation to get the world-space handle pos
  const rad = (rotation * Math.PI) / 180;
  const handle = {
    x: pivot.x + localOffsetY * Math.sin(rad),
    y: pivot.y - localOffsetY * Math.cos(rad),
  };
  return { handle, pivot };
}

/** Hit-test the rotation handle. Returns true if (mx,my) is within HSIZE of the handle. */
function hitRotationHandle(el: SketchElement, mx: number, my: number, HSIZE = 10): boolean {
  const rh = getRotationHandle(el);
  if (!rh) return false;
  const dx = mx - rh.handle.x;
  const dy = my - rh.handle.y;
  return dx * dx + dy * dy <= HSIZE * HSIZE;
}

/** Apply a resize delta to an element, returning a partial update object */
function applyResizeDelta(
  handleId: HandleId,
  startEl: Record<string, number>,
  dx: number,
  dy: number
): Record<string, number> {
  const MIN_SIZE = 4;
  switch (handleId) {
    // Rect corners / edges
    case "nw": {
      const newW = Math.max(MIN_SIZE, startEl.w - dx);
      const newH = Math.max(MIN_SIZE, startEl.h - dy);
      return {
        x: startEl.x + (startEl.w - newW),
        y: startEl.y + (startEl.h - newH),
        w: newW,
        h: newH,
      };
    }
    case "n": {
      const newH = Math.max(MIN_SIZE, startEl.h - dy);
      return { y: startEl.y + (startEl.h - newH), h: newH };
    }
    case "ne": {
      const newW = Math.max(MIN_SIZE, startEl.w + dx);
      const newH = Math.max(MIN_SIZE, startEl.h - dy);
      return { y: startEl.y + (startEl.h - newH), w: newW, h: newH };
    }
    case "w": {
      const newW = Math.max(MIN_SIZE, startEl.w - dx);
      return { x: startEl.x + (startEl.w - newW), w: newW };
    }
    case "e":
      return { w: Math.max(MIN_SIZE, startEl.w + dx) };
    case "sw": {
      const newW = Math.max(MIN_SIZE, startEl.w - dx);
      return { x: startEl.x + (startEl.w - newW), w: newW, h: Math.max(MIN_SIZE, startEl.h + dy) };
    }
    case "s":
      return { h: Math.max(MIN_SIZE, startEl.h + dy) };
    case "se":
      return { w: Math.max(MIN_SIZE, startEl.w + dx), h: Math.max(MIN_SIZE, startEl.h + dy) };
    // Line endpoints
    case "p1":
      return { x1: startEl.x1 + dx, y1: startEl.y1 + dy };
    case "p2":
      return { x2: startEl.x2 + dx, y2: startEl.y2 + dy };
    // Circle radius
    case "radius":
      return { r: Math.max(2, startEl.r + dx) };
  }
}

interface CanvasProps {
  sketch: SketchData;
  redrawKey: number;
  selectedElements: Set<number>;
  onSelectElements: (elements: Set<number>) => void;
  onMoveSelected?: (dx: number, dy: number) => void;
  /** Called when a drag-move gesture ends - use to commit to undo history */
  onDragEnd?: () => void;
  /** Called with element index and partial updates during resize drag */
  onResizeElement?: (idx: number, updates: Record<string, number>) => void;
  /** Called when resize drag ends - use to commit to undo history */
  onResizeEnd?: () => void;
  /** Called with current zoom level whenever it changes */
  onZoomChange?: (zoom: number) => void;
  /** Exposed ref so parent can call resetView() */
  canvasControlRef?: React.MutableRefObject<{ resetView: () => void } | null>;
  /** Called with element index when user double-clicks an element to edit its text */
  onDoubleClickElement?: (idx: number) => void;
  /** Called when an element type is dropped onto the canvas - receives type + canvas coords */
  onDropElement?: (type: string, canvasX: number, canvasY: number) => void;
  /** Called when user picks an action from the right-click context menu */
  onContextMenuAction?: (actionId: string) => void;
  /** Whether any selected element is locked (used to build context menu) */
  selectedLocked?: boolean;
  /** Whether any selected element belongs to a group (used to build context menu) */
  selectedHasGroup?: boolean;
  /** Freehand draw mode - when true, mouse/touch draws a new path element */
  drawMode?: boolean;
  /** Called with simplified points when freehand draw stroke finishes */
  onDrawPath?: (points: { x: number; y: number }[]) => void;
  /** Called with element index and new rotation angle (degrees) during live rotate drag */
  onRotateElement?: (idx: number, angleDeg: number) => void;
  /** Called when rotate drag ends - use to commit to undo history */
  onRotateEnd?: () => void;
  /** Show minimap thumbnail overlay (default: true when sketch has > 0 elements) */
  showMinimap?: boolean;
}

/** Returns the editable text content of an element, or null if not text-editable */
function getElementText(el: SketchElement): { field: string; value: string } | null {
  if (el.type === "text") {
    const t = el as unknown as Record<string, unknown>;
    return { field: "text", value: (t.text ?? t.content ?? "") as string };
  }
  if (el.type === "rect") {
    const r = el as unknown as Record<string, unknown>;
    if (r.label !== undefined) return { field: "label", value: r.label as string };
    // Support adding label to any rect
    return { field: "label", value: "" };
  }
  if (el.type === "dim") {
    const d = el as unknown as Record<string, unknown>;
    return { field: "label", value: (d.label ?? "") as string };
  }
  return null;
}

export default function Canvas({
  sketch,
  redrawKey,
  selectedElements,
  onSelectElements,
  onMoveSelected,
  onDragEnd,
  onResizeElement,
  onResizeEnd,
  onZoomChange,
  canvasControlRef,
  onDoubleClickElement,
  onDropElement,
  onContextMenuAction,
  selectedLocked,
  selectedHasGroup,
  drawMode,
  onDrawPath,
  onRotateElement,
  onRotateEnd,
  showMinimap,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState<string>("crosshair");
  const isPanning = useRef(false);
  const isDraggingElements = useRef(false);
  const wasBoxSelecting = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const dragStartMouse = useRef({ x: 0, y: 0 });
  // Grid snap: track last applied snapped delta so we can send incremental snapped moves
  const lastSnappedDelta = useRef({ x: 0, y: 0 });
  const lastTouchDist = useRef<number | null>(null);
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);
  // Single-touch state for tap-to-select and drag-to-move/pan
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const touchStartTime = useRef<number>(0);
  const isTouchDraggingElements = useRef(false);
  const lastSingleTouch = useRef<{ x: number; y: number } | null>(null);

  // Ruler state: cursor position in element-space, container dimensions, bounding rects
  const [rulerCursor, setRulerCursor] = useState<{ x: number; y: number } | null>(null);
  const [containerDims, setContainerDims] = useState({ w: 0, h: 0 });
  const [canvasRectState, setCanvasRectState] = useState<DOMRect | null>(null);
  const [containerRectState, setContainerRectState] = useState<DOMRect | null>(null);

  // Box-select state
  const boxStartScreen = useRef<{ x: number; y: number } | null>(null);
  const isBoxSelecting = useRef(false);
  const [boxSelectionRect, setBoxSelectionRect] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  // Resize handle state
  const activeResizeHandle = useRef<HandleId | null>(null);
  const resizeElementIdx = useRef<number>(-1);
  const resizeStartCanvas = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const resizeStartEl = useRef<Record<string, number>>({});
  const isResizing = useRef(false);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Smart alignment guides: list of {axis: 'h'|'v', pos: number} in element-space
  const [smartGuides, setSmartGuides] = useState<Array<{ axis: "h" | "v"; pos: number }>>([]);
  const smartGuidesRef = useRef<Array<{ axis: "h" | "v"; pos: number }>>([]);

  // Freehand draw state
  const isDrawing = useRef(false);
  const drawPoints = useRef<{ x: number; y: number }[]>([]);
  const [drawPreview, setDrawPreview] = useState<{ x: number; y: number }[] | null>(null);

  // Rotation handle drag state
  const isRotating = useRef(false);
  const rotateElementIdx = useRef<number>(-1);
  const rotatePivot = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotateStartAngle = useRef<number>(0); // angle from pivot to mouse at drag start
  const rotateStartElemAngle = useRef<number>(0); // element's rotation at drag start

  const canvasW = sketch.width || 900;
  const canvasH = sketch.height || 650;

  // Compute set of hidden layer ids so hit-testing skips elements on hidden layers.
  // Memoized to keep a stable reference for useCallback dependency arrays.
  const hiddenLayers = useMemo(
    () => new Set((sketch.layers ?? []).filter((l) => !l.visible).map((l) => l.id)),
    [sketch.layers]
  );

  // Reset view: fit canvas to container with small padding
  const resetView = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const padding = 48;
    const fitZoom = safeZoom(Math.min(
      (cw - padding * 2) / canvasW,
      (ch - padding * 2) / canvasH,
      1 // Never zoom in beyond 100% on reset
    ));
    setZoom(fitZoom);
    setPan({ x: 0, y: 0 });
    onZoomChange?.(fitZoom);
  }, [canvasW, canvasH, onZoomChange]);

  // Expose resetView via ref
  useEffect(() => {
    if (canvasControlRef) {
      canvasControlRef.current = { resetView };
    }
  }, [canvasControlRef, resetView]);

  /**
   * Pan so that element-space coordinate (ex, ey) is centered in the viewport.
   * Used by the minimap click handler.
   */
  const panToElement = useCallback(
    (ex: number, ey: number) => {
      // The pan offsets shift the canvas center. To center on (ex, ey):
      // screen_center + pan + (ex - sketchW/2) * zoom = screen_center
      // => pan.x = -(ex - sketchW/2) * zoom, pan.y = -(ey - sketchH/2) * zoom
      setPan({
        x: -(ex - canvasW / 2) * zoom,
        y: -(ey - canvasH / 2) * zoom,
      });
    },
    [canvasW, canvasH, zoom]
  );

  // Auto-fit on first mount and when canvas dimensions change
  useEffect(() => {
    resetView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasW, canvasH]);

  // Track container dimensions for rulers
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerDims({ w: entry.contentRect.width, h: entry.contentRect.height });
      }
    });
    ro.observe(el);
    setContainerDims({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // Update bounding rects whenever zoom/pan/size changes
  useEffect(() => {
    const c = canvasRef.current;
    const el = containerRef.current;
    if (c) setCanvasRectState(c.getBoundingClientRect());
    if (el) setContainerRectState(el.getBoundingClientRect());
  }, [zoom, pan, canvasW, canvasH, containerDims]);

  // Render
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasW;
    canvas.height = canvasH;

    ctx.clearRect(0, 0, canvasW, canvasH);
    try {
      renderSketch(ctx, sketch, canvasW, canvasH);
    } catch (err) {
      console.error("Render error:", err);
      return;
    }

    // Draw grid snap overlay when snapGrid is active
    if (sketch.snapGrid && sketch.snapGrid > 0) {
      const g = sketch.snapGrid;
      const ct2 = computeCenterTransform(sketch.elements, canvasW, canvasH);
      ctx.save();
      ctx.translate(ct2.tx, ct2.ty);
      if (ct2.scale < 1) ctx.scale(ct2.scale, ct2.scale);
      // Grid dimensions in element space
      const gridW = (canvasW - ct2.tx * 2) / (ct2.scale < 1 ? ct2.scale : 1);
      const gridH = (canvasH - ct2.ty * 2) / (ct2.scale < 1 ? ct2.scale : 1);
      ctx.strokeStyle = sketch.paper === "blueprint"
        ? "rgba(100,160,240,0.18)"
        : "rgba(100,120,200,0.12)";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([]);
      // Vertical lines
      for (let x = 0; x <= gridW + g; x += g) {
        const sx = Math.round(x / g) * g;
        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx, gridH);
        ctx.stroke();
      }
      // Horizontal lines
      for (let y = 0; y <= gridH + g; y += g) {
        const sy = Math.round(y / g) * g;
        ctx.beginPath();
        ctx.moveTo(0, sy);
        ctx.lineTo(gridW, sy);
        ctx.stroke();
      }
      // Dot at each intersection (small crosshair dot)
      ctx.fillStyle = sketch.paper === "blueprint"
        ? "rgba(100,180,255,0.25)"
        : "rgba(80,100,180,0.2)";
      for (let x = 0; x <= gridW + g; x += g) {
        for (let y = 0; y <= gridH + g; y += g) {
          const sx = Math.round(x / g) * g;
          const sy = Math.round(y / g) * g;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // Draw selection highlights and resize handles in element-space (apply centering transform)
    const ct = computeCenterTransform(sketch.elements, canvasW, canvasH);

    if (selectedElements.size > 0) {
      ctx.save();
      // Apply the same centering transform used by the renderer so selection boxes align with visual elements
      ctx.translate(ct.tx, ct.ty);
      if (ct.scale < 1) ctx.scale(ct.scale, ct.scale);
      ctx.strokeStyle = "#268bd2";
      ctx.lineWidth = 2 / ct.scale; // keep stroke visually consistent
      ctx.setLineDash([4, 4]);
      ctx.globalAlpha = 0.6;

      for (const idx of selectedElements) {
        const el = sketch.elements[idx];
        if (!el) continue;
        // Skip selection highlight for elements on hidden layers or hidden themselves
        if (el.visible === false) continue;
        if (el.layer && hiddenLayers.has(el.layer)) continue;

        const isLocked = !!(el as unknown as Record<string, unknown>).locked;
        // Locked elements: use orange dashed selection box
        if (isLocked) {
          ctx.strokeStyle = "#cb4b16";
          ctx.setLineDash([4, 3]);
        } else {
          ctx.strokeStyle = "#268bd2";
          ctx.setLineDash([4, 3]);
        }

        let bounds: { x: number; y: number; w: number; h: number } | null = null;

        bounds = getElementBounds(el);

        if (bounds) {
          if (el.rotation) {
            // Draw rotated selection box
            const cx = bounds.x + bounds.w / 2;
            const cy = bounds.y + bounds.h / 2;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate((el.rotation * Math.PI) / 180);
            ctx.strokeRect(-bounds.w / 2, -bounds.h / 2, bounds.w, bounds.h);
            ctx.restore();
          } else {
            ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
            // Draw lock icon indicator (small square) at top-left of bounds when locked
            if (isLocked) {
              ctx.save();
              ctx.globalAlpha = 1;
              ctx.setLineDash([]);
              const lx = bounds.x + 2;
              const ly = bounds.y + 2;
              const ls = 10;
              ctx.fillStyle = "#cb4b16";
              ctx.strokeStyle = "#fdf6e3";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.rect(lx, ly, ls, ls);
              ctx.fill();
              ctx.stroke();
              // Small lock body lines
              ctx.strokeStyle = "#fdf6e3";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(lx + ls / 2, ly + ls / 2, 2.5, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
            }
          }

          // Draw rotation handle for single-selected non-locked elements
          if (selectedElements.size === 1 && !isLocked) {
            const rh = getRotationHandle(el);
            if (rh) {
              ctx.save();
              ctx.setLineDash([]);
              ctx.globalAlpha = 1;
              // Stem line from top-center of bounding box to handle
              const pivot = rh.pivot;
              const rotation = el.rotation ?? 0;
              const rad = (rotation * Math.PI) / 180;
              const stemEndY = -(bounds.h / 2);
              const stemStartWorld = {
                x: pivot.x + stemEndY * Math.sin(rad),
                y: pivot.y - stemEndY * Math.cos(rad),
              };
              ctx.strokeStyle = "#b58900";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(stemStartWorld.x, stemStartWorld.y);
              ctx.lineTo(rh.handle.x, rh.handle.y);
              ctx.stroke();
              // Handle circle
              ctx.beginPath();
              ctx.arc(rh.handle.x, rh.handle.y, 5, 0, Math.PI * 2);
              ctx.fillStyle = "#fdf6e3";
              ctx.strokeStyle = "#b58900";
              ctx.lineWidth = 1.5;
              ctx.fill();
              ctx.stroke();
              // Rotation arc indicator inside handle
              ctx.beginPath();
              ctx.arc(rh.handle.x, rh.handle.y, 3, -Math.PI * 0.7, Math.PI * 0.7);
              ctx.strokeStyle = "#b58900";
              ctx.lineWidth = 1;
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      ctx.restore();
    }

    // Draw resize handles when exactly 1 non-rotated element is selected
    if (selectedElements.size === 1) {
      const idx = [...selectedElements][0];
      const el = sketch.elements[idx];
      if (el && !el.rotation) {
        const handles = getResizeHandles(el);
        if (handles) {
          ctx.save();
          // Apply centering transform so handles align with visual element positions
          ctx.translate(ct.tx, ct.ty);
          if (ct.scale < 1) ctx.scale(ct.scale, ct.scale);
          const HSIZE = 6 / ct.scale; // scale-compensated handle size
          for (const h of handles) {
            // Shadow for contrast
            ctx.shadowColor = "rgba(0,0,0,0.35)";
            ctx.shadowBlur = 4;
            ctx.fillStyle = "#fdf6e3";
            ctx.strokeStyle = "#268bd2";
            ctx.lineWidth = 1.5 / ct.scale;
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
            ctx.beginPath();
            if (h.id === "p1" || h.id === "p2" || h.id === "radius") {
              // Circle handles for endpoints/radius
              ctx.arc(h.x, h.y, HSIZE, 0, Math.PI * 2);
            } else {
              // Square handles for rect corners/edges
              ctx.rect(h.x - HSIZE, h.y - HSIZE, HSIZE * 2, HSIZE * 2);
            }
            ctx.fill();
            ctx.stroke();
          }
          ctx.shadowBlur = 0;
          ctx.restore();
        }
      }
    }

    // Draw smart alignment guides (if any active during drag)
    const activeGuides = smartGuidesRef.current;
    if (activeGuides.length > 0) {
      const ctg = computeCenterTransform(sketch.elements, canvasW, canvasH);
      ctx.save();
      ctx.translate(ctg.tx, ctg.ty);
      if (ctg.scale < 1) ctx.scale(ctg.scale, ctg.scale);
      ctx.strokeStyle = "#dc322f"; // Solarized red
      ctx.lineWidth = 1 / (ctg.scale > 0 ? ctg.scale : 1);
      ctx.setLineDash([4, 4]);
      ctx.globalAlpha = 0.7;
      // Compute element-space canvas bounds (before centering transform)
      const elW = ctg.scale < 1 ? canvasW / ctg.scale : canvasW;
      const elH = ctg.scale < 1 ? canvasH / ctg.scale : canvasH;
      for (const g of activeGuides) {
        ctx.beginPath();
        if (g.axis === "v") {
          // Vertical guide line: full height
          ctx.moveTo(g.pos, -ctg.ty / (ctg.scale > 0 ? ctg.scale : 1));
          ctx.lineTo(g.pos, elH);
        } else {
          // Horizontal guide line: full width
          ctx.moveTo(-ctg.tx / (ctg.scale > 0 ? ctg.scale : 1), g.pos);
          ctx.lineTo(elW, g.pos);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    // Draw freehand preview path while drawing
    if (drawPreview && drawPreview.length >= 2) {
      const ctd = computeCenterTransform(sketch.elements, canvasW, canvasH);
      ctx.save();
      ctx.translate(ctd.tx, ctd.ty);
      if (ctd.scale < 1) ctx.scale(ctd.scale, ctd.scale);
      ctx.strokeStyle = sketch.inkColor || "#333";
      ctx.lineWidth = 1.5 / (ctd.scale > 0 ? ctd.scale : 1);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(drawPreview[0].x, drawPreview[0].y);
      if (drawPreview.length === 2) {
        ctx.lineTo(drawPreview[1].x, drawPreview[1].y);
      } else {
        // Smooth Catmull-Rom preview using quadratic bezier through midpoints
        for (let i = 1; i < drawPreview.length - 1; i++) {
          const mx = (drawPreview[i].x + drawPreview[i + 1].x) / 2;
          const my = (drawPreview[i].y + drawPreview[i + 1].y) / 2;
          ctx.quadraticCurveTo(drawPreview[i].x, drawPreview[i].y, mx, my);
        }
        const last = drawPreview[drawPreview.length - 1];
        ctx.lineTo(last.x, last.y);
      }
      ctx.stroke();
      ctx.restore();
    }
  }, [sketch, canvasW, canvasH, selectedElements, drawPreview]);

  useEffect(() => {
    draw();
  }, [draw, redrawKey, smartGuides]);

  // Convert client coords to canvas coords using the canvas bounding rect
  /**
   * Convert screen client coordinates → element-space coordinates.
   * Accounts for CSS zoom/pan, canvas CSS scaling, AND the centering transform
   * applied by the renderer so that hit-testing aligns with visual element positions.
   */
  const clientToCanvas = useCallback(
    (clientX: number, clientY: number): { mx: number; my: number } => {
      const canvas = canvasRef.current;
      if (!canvas) return { mx: 0, my: 0 };
      const rect = canvas.getBoundingClientRect();
      // Canvas pixel = (client - rect.left) * (canvasW / rect.width)
      const scaleX = canvasW / rect.width;
      const scaleY = canvasH / rect.height;
      const canvasPx = (clientX - rect.left) * scaleX;
      const canvasPy = (clientY - rect.top) * scaleY;
      // Apply inverse of centering transform: element = (canvasPx - tx) / scale
      const ct = computeCenterTransform(sketch.elements, canvasW, canvasH);
      const s = ct.scale > 0 ? ct.scale : 1;
      return {
        mx: (canvasPx - ct.tx) / s,
        my: (canvasPy - ct.ty) / s,
      };
    },
    [canvasW, canvasH, sketch.elements]
  );

  /** Get handles for the currently selected element (if exactly 1 selected, non-rotated) */
  const getActiveHandles = useCallback((): ResizeHandle[] | null => {
    if (selectedElements.size !== 1) return null;
    const idx = [...selectedElements][0];
    const el = sketch.elements[idx];
    if (!el || el.rotation) return null;
    return getResizeHandles(el);
  }, [selectedElements, sketch.elements]);

  // Mouse handlers for selection and drag-to-move
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      // Suppress click after drag, resize, or box-select
      if (isDraggingElements.current) return;
      if (isResizing.current) return;
      if (wasBoxSelecting.current) {
        wasBoxSelecting.current = false;
        return;
      }
      const { mx, my } = clientToCanvas(e.clientX, e.clientY);

      // Find clicked element (reverse order = top first)
      let hitIdx = -1;
      for (let i = sketch.elements.length - 1; i >= 0; i--) {
        const el = sketch.elements[i];
        if (hitTest(el, mx, my, hiddenLayers)) {
          hitIdx = i;
          break;
        }
      }

      if (hitIdx >= 0) {
        // Auto-expand to group: if the clicked element has a groupId, select all members
        const hitEl = sketch.elements[hitIdx];
        const hitGroupId = (hitEl as unknown as Record<string, unknown>).groupId as string | undefined;
        const groupIndices: number[] = [];
        if (hitGroupId) {
          sketch.elements.forEach((el, i) => {
            if ((el as unknown as Record<string, unknown>).groupId === hitGroupId) groupIndices.push(i);
          });
        }
        if (e.shiftKey) {
          const next = new Set(selectedElements);
          if (hitGroupId && groupIndices.length > 1) {
            // Toggle entire group
            const allIn = groupIndices.every((i) => next.has(i));
            if (allIn) groupIndices.forEach((i) => next.delete(i));
            else groupIndices.forEach((i) => next.add(i));
          } else {
            if (next.has(hitIdx)) next.delete(hitIdx);
            else next.add(hitIdx);
          }
          onSelectElements(next);
        } else {
          if (hitGroupId && groupIndices.length > 1) {
            onSelectElements(new Set(groupIndices));
          } else {
            onSelectElements(new Set([hitIdx]));
          }
        }
      } else if (!e.shiftKey) {
        onSelectElements(new Set());
      }
    },
    [sketch.elements, clientToCanvas, selectedElements, onSelectElements, hiddenLayers]
  );

  // Double-click → inline text edit
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!onDoubleClickElement) return;
      const { mx, my } = clientToCanvas(e.clientX, e.clientY);
      for (let i = sketch.elements.length - 1; i >= 0; i--) {
        const el = sketch.elements[i];
        if (hitTest(el, mx, my, hiddenLayers)) {
          const editable = getElementText(el);
          if (editable !== null) {
            onSelectElements(new Set([i]));
            onDoubleClickElement(i);
          }
          return;
        }
      }
    },
    [sketch.elements, clientToCanvas, onSelectElements, onDoubleClickElement, hiddenLayers]
  );

  // Zoom with scroll - zoom toward mouse cursor for pixel-perfect feel
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;

      const factor = e.deltaY > 0 ? 0.9 : 1.1;

      setZoom((prevZoom) => {
        const newZoom = safeZoom(prevZoom * factor);
        const scale = prevZoom > 0 ? newZoom / prevZoom : 1;
        if (!Number.isFinite(scale)) return newZoom;
        setPan((p) => ({
          x: mx - scale * (mx - p.x),
          y: my - scale * (my - p.y),
        }));
        onZoomChange?.(newZoom);
        return newZoom;
      });
    },
    []
  );

  // Pan with alt/ctrl + drag; drag-move elements; box-select on empty space
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.altKey || e.ctrlKey) {
        isPanning.current = true;
        lastMouse.current = { x: e.clientX, y: e.clientY };
        return;
      }

      const { mx, my } = clientToCanvas(e.clientX, e.clientY);

      // Freehand draw mode - start recording path
      if (drawMode && onDrawPath) {
        isDrawing.current = true;
        drawPoints.current = [{ x: mx, y: my }];
        setDrawPreview([{ x: mx, y: my }]);
        e.preventDefault();
        return;
      }

      // Check rotation handle first (only when exactly 1 element selected, not locked)
      if (onRotateElement && selectedElements.size === 1) {
        const idx = [...selectedElements][0];
        const el = sketch.elements[idx];
        if (el && !(el as unknown as Record<string, unknown>).locked) {
          if (hitRotationHandle(el, mx, my)) {
            const rh = getRotationHandle(el);
            if (rh) {
              isRotating.current = true;
              rotateElementIdx.current = idx;
              rotatePivot.current = rh.pivot;
              rotateStartAngle.current = Math.atan2(my - rh.pivot.y, mx - rh.pivot.x);
              rotateStartElemAngle.current = el.rotation ?? 0;
              lastMouse.current = { x: e.clientX, y: e.clientY };
              e.preventDefault();
              return;
            }
          }
        }
      }

      // Check resize handles first (only when exactly 1 element selected and not locked)
      if (onResizeElement && selectedElements.size === 1) {
        const handles = getActiveHandles();
        if (handles) {
          for (const h of handles) {
            if (hitHandle(h, mx, my)) {
              const idx = [...selectedElements][0];
              const el = sketch.elements[idx];
              if (!el) break;
              // Skip resize if element is locked
              if ((el as unknown as Record<string, unknown>).locked) break;
              // Capture starting state
              activeResizeHandle.current = h.id;
              resizeElementIdx.current = idx;
              resizeStartCanvas.current = { x: mx, y: my };
              isResizing.current = false;
              // Capture all numeric fields of the element
              const snap: Record<string, number> = {};
              for (const [k, v] of Object.entries(el as unknown as Record<string, unknown>)) {
                if (typeof v === "number") snap[k] = v;
              }
              resizeStartEl.current = snap;
              lastMouse.current = { x: e.clientX, y: e.clientY };
              e.preventDefault();
              return;
            }
          }
        }
      }

      // Check if pressing down on a selected element → start drag-move
      // Only if all selected elements are unlocked
      if (selectedElements.size > 0 && onMoveSelected) {
        const hitOnSelected = [...selectedElements].some((i) => {
          const el = sketch.elements[i];
          return el && hitTest(el, mx, my, hiddenLayers);
        });
        const allLocked = [...selectedElements].every((i) => {
          const el = sketch.elements[i];
          return el && (el as unknown as Record<string, unknown>).locked;
        });

        if (hitOnSelected && !allLocked) {
          isDraggingElements.current = false;
          dragStartMouse.current = { x: e.clientX, y: e.clientY };
          lastMouse.current = { x: e.clientX, y: e.clientY };
          // Reset snap accumulator for fresh drag
          lastSnappedDelta.current = { x: 0, y: 0 };
          e.preventDefault();
          return;
        }
      }

      // Check if clicking on any element at all (unselected)
      const hitOnAny = sketch.elements.some((el) => hitTest(el, mx, my, hiddenLayers));

      // Empty canvas space → prepare for box-select
      if (!hitOnAny) {
        boxStartScreen.current = { x: e.clientX, y: e.clientY };
        isBoxSelecting.current = false;
        wasBoxSelecting.current = false;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }
    },
    [selectedElements, sketch.elements, clientToCanvas, onMoveSelected, onResizeElement, onRotateElement, getActiveHandles, drawMode, onDrawPath, hiddenLayers]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {

      if (isPanning.current) {
        setPan((p) => ({
          x: p.x + (e.clientX - lastMouse.current.x),
          y: p.y + (e.clientY - lastMouse.current.y),
        }));
        lastMouse.current = { x: e.clientX, y: e.clientY };
        return;
      }

      // Freehand draw - add points
      if (isDrawing.current && drawMode) {
        const { mx, my } = clientToCanvas(e.clientX, e.clientY);
        drawPoints.current.push({ x: mx, y: my });
        // Throttle preview updates - only update every 3 points for performance
        if (drawPoints.current.length % 3 === 0) {
          setDrawPreview([...drawPoints.current]);
        }
        return;
      }

      // Rotation drag
      if (isRotating.current && onRotateElement && e.buttons === 1) {
        setCursor("grabbing");
        const { mx, my } = clientToCanvas(e.clientX, e.clientY);
        const currentAngle = Math.atan2(my - rotatePivot.current.y, mx - rotatePivot.current.x);
        const deltaAngle = (currentAngle - rotateStartAngle.current) * (180 / Math.PI);
        let newRotation = rotateStartElemAngle.current + deltaAngle;
        // Snap to 15° increments when Shift is held
        if (e.shiftKey) newRotation = Math.round(newRotation / 15) * 15;
        onRotateElement(rotateElementIdx.current, ((newRotation % 360) + 360) % 360);
        return;
      }

      // Resize drag
      if (activeResizeHandle.current !== null && onResizeElement && e.buttons === 1) {
        const { mx, my } = clientToCanvas(e.clientX, e.clientY);
        const dx = mx - resizeStartCanvas.current.x;
        const dy = my - resizeStartCanvas.current.y;
        if (!isResizing.current && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
          isResizing.current = true;
        }
        if (isResizing.current) {
          const updates = applyResizeDelta(
            activeResizeHandle.current,
            resizeStartEl.current,
            dx,
            dy
          );
          onResizeElement(resizeElementIdx.current, updates);
        }
        return;
      }

      // Drag selected elements (only when no box-select in progress)
      if (
        !boxStartScreen.current &&
        selectedElements.size > 0 &&
        onMoveSelected &&
        e.buttons === 1
      ) {
        const dx = e.clientX - lastMouse.current.x;
        const dy = e.clientY - lastMouse.current.y;

        if (!isDraggingElements.current) {
          const totalDx = e.clientX - dragStartMouse.current.x;
          const totalDy = e.clientY - dragStartMouse.current.y;
          if (Math.sqrt(totalDx * totalDx + totalDy * totalDy) > 4) {
            isDraggingElements.current = true;
          }
        }

        if (isDraggingElements.current) {
          // Convert screen delta to element-space delta:
          // screen → canvas pixel: divide by zoom (CSS scale)
          // canvas pixel → element space: divide by centerScale
          const ct = computeCenterTransform(sketch.elements, canvasW, canvasH);
          const centerScale = ct.scale > 0 ? ct.scale : 1;

          const snapGrid = sketch.snapGrid && sketch.snapGrid > 0 ? sketch.snapGrid : 0;
          if (snapGrid > 0) {
            // Grid snap: use total displacement from drag start, snap to grid,
            // then send only the delta from last snapped position to avoid accumulation errors.
            const totalScreenDx = e.clientX - dragStartMouse.current.x;
            const totalScreenDy = e.clientY - dragStartMouse.current.y;
            const totalElDx = totalScreenDx / zoom / centerScale;
            const totalElDy = totalScreenDy / zoom / centerScale;
            const snappedTotalDx = Math.round(totalElDx / snapGrid) * snapGrid;
            const snappedTotalDy = Math.round(totalElDy / snapGrid) * snapGrid;
            const incDx = snappedTotalDx - lastSnappedDelta.current.x;
            const incDy = snappedTotalDy - lastSnappedDelta.current.y;
            if (incDx !== 0 || incDy !== 0) {
              onMoveSelected(incDx, incDy);
              lastSnappedDelta.current = { x: snappedTotalDx, y: snappedTotalDy };
            }
            // Don't update lastMouse - we still track dragStartMouse for total delta
          } else {
            onMoveSelected(dx / zoom / centerScale, dy / zoom / centerScale);
            lastMouse.current = { x: e.clientX, y: e.clientY };
          }

          // Compute and show smart alignment guides
          const guides = computeAlignmentGuides(sketch.elements, selectedElements);
          smartGuidesRef.current = guides;
          setSmartGuides(guides);
        }
        return;
      }

      // Box-select drag
      if (boxStartScreen.current && e.buttons === 1 && !isPanning.current) {
        const dx = e.clientX - boxStartScreen.current.x;
        const dy = e.clientY - boxStartScreen.current.y;

        if (!isBoxSelecting.current && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
          isBoxSelecting.current = true;
        }

        if (isBoxSelecting.current) {
          const container = containerRef.current;
          if (container) {
            const containerRect = container.getBoundingClientRect();
            setBoxSelectionRect({
              left: Math.min(e.clientX, boxStartScreen.current.x) - containerRect.left,
              top: Math.min(e.clientY, boxStartScreen.current.y) - containerRect.top,
              width: Math.abs(dx),
              height: Math.abs(dy),
            });
          }
        }
      }
    },
    [selectedElements, onMoveSelected, canvasW, canvasH, zoom, onResizeElement, onRotateElement, clientToCanvas, drawMode, onDrawPath]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      isPanning.current = false;

      // Finalize freehand draw
      if (isDrawing.current && drawMode && onDrawPath) {
        isDrawing.current = false;
        const { mx, my } = clientToCanvas(e.clientX, e.clientY);
        drawPoints.current.push({ x: mx, y: my });
        // Simplify the path using Ramer-Douglas-Peucker
        const simplified = simplifyPath(drawPoints.current, 2);
        setDrawPreview(null);
        if (simplified.length >= 2) {
          onDrawPath(simplified);
        }
        drawPoints.current = [];
        return;
      }

      // Finalize rotation drag
      if (isRotating.current) {
        isRotating.current = false;
        rotateElementIdx.current = -1;
        if (onRotateEnd) onRotateEnd();
        return;
      }

      // Finalize resize
      if (activeResizeHandle.current !== null) {
        const wasRes = isResizing.current;
        activeResizeHandle.current = null;
        isResizing.current = false;
        resizeElementIdx.current = -1;
        if (wasRes && onResizeEnd) {
          onResizeEnd();
        }
        return;
      }

      // Finalize box selection
      if (isBoxSelecting.current && boxStartScreen.current) {
        wasBoxSelecting.current = true;

        const canvas = canvasRef.current;
        if (canvas) {
          // Convert box corners to element-space coordinates (same transform as clientToCanvas)
          const { mx: x1, my: y1 } = clientToCanvas(
            Math.min(e.clientX, boxStartScreen.current.x),
            Math.min(e.clientY, boxStartScreen.current.y)
          );
          const { mx: x2, my: y2 } = clientToCanvas(
            Math.max(e.clientX, boxStartScreen.current.x),
            Math.max(e.clientY, boxStartScreen.current.y)
          );

          const boxSelected = new Set<number>();
          sketch.elements.forEach((el, i) => {
            if (boxHitTest(el, x1, y1, x2, y2, hiddenLayers)) boxSelected.add(i);
          });

          if (e.shiftKey) {
            onSelectElements(new Set([...selectedElements, ...boxSelected]));
          } else {
            onSelectElements(boxSelected);
          }
        }
      }

      // Reset box-select state
      setBoxSelectionRect(null);
      isBoxSelecting.current = false;
      boxStartScreen.current = null;

      // Commit element drag to undo history if a drag actually occurred
      const wasDragging = isDraggingElements.current;
      setTimeout(() => {
        isDraggingElements.current = false;
      }, 0);
      if (wasDragging && onDragEnd) {
        onDragEnd();
      }
      // Clear smart guides when drag ends
      if (wasDragging) {
        smartGuidesRef.current = [];
        setSmartGuides([]);
      }
    },
    [sketch.elements, selectedElements, canvasW, canvasH, onSelectElements, onDragEnd, onResizeEnd, onRotateEnd, clientToCanvas, drawMode, onDrawPath, hiddenLayers]
  );

  const handleMouseLeave = useCallback(() => {
    isPanning.current = false;

    // Finalize rotation drag if in progress
    if (isRotating.current) {
      isRotating.current = false;
      rotateElementIdx.current = -1;
      if (onRotateEnd) onRotateEnd();
      return;
    }

    // Finalize resize if in progress
    if (activeResizeHandle.current !== null) {
      const wasRes = isResizing.current;
      activeResizeHandle.current = null;
      isResizing.current = false;
      resizeElementIdx.current = -1;
      if (wasRes && onResizeEnd) {
        onResizeEnd();
      }
      return;
    }

    // Cancel box-select when leaving canvas
    if (isBoxSelecting.current) {
      wasBoxSelecting.current = true;
    }
    setBoxSelectionRect(null);
    isBoxSelecting.current = false;
    boxStartScreen.current = null;
    // Clear smart guides when leaving canvas
    smartGuidesRef.current = [];
    setSmartGuides([]);
    // Commit drag to undo history if a drag was in progress
    const wasDragging = isDraggingElements.current;
    setTimeout(() => {
      isDraggingElements.current = false;
    }, 0);
    if (wasDragging && onDragEnd) {
      onDragEnd();
    }
  }, [onDragEnd, onResizeEnd, onRotateEnd]);

  // Drag-and-drop: accept element type drops from the element panel
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.types.includes("text/x-skissify-element")) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      const elementType = e.dataTransfer.getData("text/x-skissify-element");
      if (!elementType || !onDropElement) return;
      e.preventDefault();
      let { mx, my } = clientToCanvas(e.clientX, e.clientY);
      // Snap drop position to grid if active
      const snapGrid = sketch.snapGrid && sketch.snapGrid > 0 ? sketch.snapGrid : 0;
      if (snapGrid > 0) {
        mx = Math.round(mx / snapGrid) * snapGrid;
        my = Math.round(my / snapGrid) * snapGrid;
      }
      onDropElement(elementType, mx, my);
    },
    [clientToCanvas, onDropElement, sketch.snapGrid]
  );

  // Right-click context menu
  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      // Only show if there are selected elements and a handler
      if (!onContextMenuAction || selectedElements.size === 0) return;
      setContextMenu({ x: e.clientX, y: e.clientY });
    },
    [onContextMenuAction, selectedElements]
  );

  // Build context menu actions from current selection state
  const buildContextMenuActions = (): ContextMenuAction[] => {
    const count = selectedElements.size;
    const isLocked = !!selectedLocked;
    const actions: ContextMenuAction[] = [];

    if (count === 1) {
      actions.push({ id: "edit-text", icon: "✏️", label: "Edit text" });
    }
    actions.push({ id: "duplicate", icon: "⧉", label: count > 1 ? `Duplicate (${count})` : "Duplicate" });
    actions.push({ id: "copy", icon: "⎘", label: count > 1 ? `Copy (${count})` : "Copy" });
    actions.push({ id: "paste-in-place", icon: "📌", label: "Paste in Place" });
    actions.push({ id: "select-same-type", icon: "⬡", label: "Select Same Type" });

    actions.push({ id: "bring-front", icon: "⬆⬆", label: "Bring to front", separator: true });
    actions.push({ id: "send-back",  icon: "⬇⬇", label: "Send to back" });

    if (count >= 2) {
      actions.push({ id: "align-left",    icon: "⬅", label: "Align left",    separator: true });
      actions.push({ id: "align-center-h", icon: "↔", label: "Align center H" });
      actions.push({ id: "align-right",   icon: "➡", label: "Align right" });
    }

    if (count >= 2) {
      actions.push({ id: "group", icon: "⊞", label: "Group", separator: true });
    }
    if (selectedHasGroup) {
      actions.push({ id: "ungroup", icon: "⊟", label: "Ungroup", separator: count < 2 });
    }

    actions.push({
      id: isLocked ? "unlock" : "lock",
      icon: isLocked ? "🔓" : "🔒",
      label: isLocked ? "Unlock" : "Lock",
      separator: true,
    });

    actions.push({ id: "delete", icon: "🗑", label: count > 1 ? `Delete (${count})` : "Delete", separator: true, danger: true });

    return actions;
  };

  // Touch: pinch-to-zoom, two-finger pan, single-touch tap-to-select and drag-to-move/pan
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Two-finger: pinch/pan - cancel any in-progress single-touch drag
      isTouchDraggingElements.current = false;
      touchStartPos.current = null;
      lastSingleTouch.current = null;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDist.current = Math.sqrt(dx * dx + dy * dy);
      lastTouchCenter.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
    } else if (e.touches.length === 1) {
      // Single-touch: record start for tap detection and potential drag
      const t = e.touches[0];
      touchStartPos.current = { x: t.clientX, y: t.clientY };
      touchStartTime.current = Date.now();
      lastSingleTouch.current = { x: t.clientX, y: t.clientY };
      isTouchDraggingElements.current = false;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const center = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };

      if (lastTouchDist.current !== null && lastTouchCenter.current !== null) {
        const scale = lastTouchDist.current > 0 ? dist / lastTouchDist.current : 1;
        setZoom((z) => {
          const nz = safeZoom(z * scale);
          onZoomChange?.(nz);
          return nz;
        });
        setPan((p) => ({
          x: p.x + (center.x - lastTouchCenter.current!.x),
          y: p.y + (center.y - lastTouchCenter.current!.y),
        }));
      }

      lastTouchDist.current = dist;
      lastTouchCenter.current = center;
    } else if (e.touches.length === 1 && lastSingleTouch.current !== null) {
      e.preventDefault();
      const t = e.touches[0];
      const dx = t.clientX - lastSingleTouch.current.x;
      const dy = t.clientY - lastSingleTouch.current.y;

      const startPos = touchStartPos.current;
      const totalDx = startPos ? t.clientX - startPos.x : 0;
      const totalDy = startPos ? t.clientY - startPos.y : 0;
      const totalDist = Math.sqrt(totalDx * totalDx + totalDy * totalDy);

      // Check if the touch started on a selected element (only after 6px movement to confirm drag intent)
      if (!isTouchDraggingElements.current && totalDist > 6 && startPos && onMoveSelected && selectedElements.size > 0) {
        const { mx: startMx, my: startMy } = clientToCanvas(startPos.x, startPos.y);
        const hitOnSelected = [...selectedElements].some((i) => {
          const el = sketch.elements[i];
          return el && !((el as unknown as Record<string, unknown>).locked) && hitTest(el, startMx, startMy, hiddenLayers);
        });
        if (hitOnSelected) {
          isTouchDraggingElements.current = true;
          lastSnappedDelta.current = { x: 0, y: 0 };
        }
      }

      if (isTouchDraggingElements.current && onMoveSelected) {
        // Convert screen-space delta to element-space delta
        const snapGrid = sketch.snapGrid && sketch.snapGrid > 0 ? sketch.snapGrid : 0;
        const ct = computeCenterTransform(sketch.elements, canvasW, canvasH);
        const dxEl = dx / (zoom * ct.scale);
        const dyEl = dy / (zoom * ct.scale);
        let finalDx = lastSnappedDelta.current.x + dxEl;
        let finalDy = lastSnappedDelta.current.y + dyEl;
        if (snapGrid > 0) {
          const snappedX = Math.round(finalDx / snapGrid) * snapGrid;
          const snappedY = Math.round(finalDy / snapGrid) * snapGrid;
          if (snappedX !== 0 || snappedY !== 0) {
            onMoveSelected(snappedX, snappedY);
            lastSnappedDelta.current = { x: finalDx - snappedX, y: finalDy - snappedY };
          } else {
            lastSnappedDelta.current = { x: finalDx, y: finalDy };
          }
        } else {
          onMoveSelected(dxEl, dyEl);
        }
      } else if (!isTouchDraggingElements.current && totalDist > 3) {
        // Pan the canvas
        setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
      }

      lastSingleTouch.current = { x: t.clientX, y: t.clientY };
    }
  }, [selectedElements, sketch.elements, sketch.snapGrid, zoom, canvasW, canvasH, clientToCanvas, onMoveSelected, hiddenLayers]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const wasDraggingElements = isTouchDraggingElements.current;
    isTouchDraggingElements.current = false;

    if (e.touches.length === 0) {
      lastTouchDist.current = null;
      lastTouchCenter.current = null;

      // Commit element drag to undo history
      if (wasDraggingElements && onDragEnd) {
        onDragEnd();
      }

      // Tap-to-select: if touch was short and didn't move much, treat as a click
      const startPos = touchStartPos.current;
      const elapsed = Date.now() - touchStartTime.current;
      if (startPos && !wasDraggingElements && elapsed < 400) {
        const changedTouch = e.changedTouches[0];
        if (changedTouch) {
          const dx = changedTouch.clientX - startPos.x;
          const dy = changedTouch.clientY - startPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 12) {
            // Treat as a tap - find element under tap point
            const { mx, my } = clientToCanvas(changedTouch.clientX, changedTouch.clientY);
            let tappedIdx = -1;
            for (let i = sketch.elements.length - 1; i >= 0; i--) {
              if (hitTest(sketch.elements[i], mx, my, hiddenLayers)) {
                tappedIdx = i;
                break;
              }
            }
            if (tappedIdx >= 0) {
              onSelectElements(new Set([tappedIdx]));
            } else {
              onSelectElements(new Set());
            }
          }
        }
      }

      touchStartPos.current = null;
      lastSingleTouch.current = null;
    }
  }, [sketch.elements, clientToCanvas, onSelectElements, onDragEnd, hiddenLayers]);

  // Update cursor when hovering over selected elements
  const handleCursorHover = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      // In freehand draw mode, always show a pencil/crosshair cursor
      if (drawMode) {
        setCursor(isDrawing.current ? "cell" : "crosshair");
        return;
      }
      if (isResizing.current) {
        if (activeResizeHandle.current) {
          setCursor(HANDLE_CURSOR[activeResizeHandle.current] || "crosshair");
        }
        return;
      }
      if (isRotating.current) {
        setCursor("grabbing");
        return;
      }
      if (isDraggingElements.current) {
        setCursor("grabbing");
        return;
      }
      if (isBoxSelecting.current) {
        setCursor("crosshair");
        return;
      }
      if (e.altKey || e.ctrlKey) {
        setCursor("grab");
        return;
      }

      const { mx, my } = clientToCanvas(e.clientX, e.clientY);

      // Check rotation handle
      if (selectedElements.size === 1 && onRotateElement) {
        const idx = [...selectedElements][0];
        const el = sketch.elements[idx];
        if (el && !(el as unknown as Record<string, unknown>).locked) {
          if (hitRotationHandle(el, mx, my)) {
            setCursor("grab");
            return;
          }
        }
      }

      // Check resize handles first
      if (selectedElements.size === 1) {
        const handles = getActiveHandles();
        if (handles) {
          for (const h of handles) {
            if (hitHandle(h, mx, my)) {
              setCursor(HANDLE_CURSOR[h.id] || "crosshair");
              return;
            }
          }
        }
      }

      if (selectedElements.size > 0 && onMoveSelected) {
        const hitOnSelected = [...selectedElements].some((i) => {
          const el = sketch.elements[i];
          return el && hitTest(el, mx, my, hiddenLayers);
        });
        setCursor(hitOnSelected ? "grab" : "crosshair");
      } else {
        setCursor("crosshair");
      }
    },
    [selectedElements, sketch.elements, clientToCanvas, onMoveSelected, getActiveHandles, drawMode, onRotateElement, hiddenLayers]
  );

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onSelectElements(new Set());
      }
      // Press "0" (without modifiers) to reset/fit the view
      if (e.key === "0" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        const isInput =
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLInputElement;
        if (!isInput) {
          e.preventDefault();
          resetView();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSelectElements, resetView]);

  return (
    <div
      id="rulers-container"
      ref={containerRef}
      className="flex-1 overflow-hidden flex items-center justify-center touch-none relative"
      style={{
        minHeight: 0,
        backgroundColor: sketch.paper === "blueprint" ? BOARD_COLORS.blueprint : "#eee8d5",
        backgroundImage: sketch.paper === "blueprint"
          ? "radial-gradient(circle, rgba(80,95,110,0.35) 1px, transparent 1px)"
          : "radial-gradient(circle, #93a1a1 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        style={{
          transform: `translate(${Number.isFinite(pan.x) ? pan.x : 0}px, ${Number.isFinite(pan.y) ? pan.y : 0}px) scale(${safeZoom(zoom)})`,
          transformOrigin: "center center",
          transition: "transform 0.05s ease-out",
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasW}
          height={canvasH}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={(e) => {
            handleMouseMove(e);
            handleCursorHover(e);
            const { mx, my } = clientToCanvas(e.clientX, e.clientY);
            setRulerCursor({ x: mx, y: my });
          }}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseLeave();
            setRulerCursor(null);
          }}
          onContextMenu={handleContextMenu}
          className="rounded"
          style={{
            cursor,
            maxWidth: "100%",
            maxHeight: "calc(100vh - 60px)",
            width: "auto",
            height: "auto",
            boxShadow:
              sketch.paper === "blueprint"
                ? "0 0 30px 6px rgba(20, 50, 90, 0.4), 0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border:
              sketch.paper === "blueprint"
                ? "1px solid rgba(100, 160, 220, 0.3)"
                : "none",
          }}
        />
      </div>

      {/* Box-select rubber-band overlay */}
      {boxSelectionRect && (
        <div
          className="pointer-events-none absolute"
          style={{
            left: boxSelectionRect.left,
            top: boxSelectionRect.top,
            width: boxSelectionRect.width,
            height: boxSelectionRect.height,
            border: "2px dashed rgba(59, 130, 246, 0.85)",
            backgroundColor: "rgba(59, 130, 246, 0.08)",
            borderRadius: "2px",
            zIndex: 10,
          }}
        />
      )}

      {/* Zoom controls overlay - bottom-right */}
      <div
        className="absolute bottom-3 right-3 flex items-center gap-1 z-20"
        style={{ pointerEvents: "auto" }}
      >
        <button
          onClick={() => {
            setZoom((z) => {
              const nz = safeZoom(z / 1.25);
              onZoomChange?.(nz);
              return nz;
            });
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#fdf6e3]/90 hover:bg-[#fdf6e3] text-[#586e75] rounded text-sm font-bold transition-colors border border-[#93a1a1]/50"
          title="Zoom out"
          aria-label="Zoom out"
        >
          -
        </button>
        <button
          onClick={resetView}
          className="px-2 h-7 flex items-center justify-center bg-[#fdf6e3]/90 hover:bg-[#fdf6e3] text-[#657b83] hover:text-[#073642] rounded text-[11px] font-mono transition-colors border border-[#93a1a1]/50 min-w-[46px]"
          title="Reset view to fit (double-click canvas to reset)"
          aria-label="Reset zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={() => {
            setZoom((z) => {
              const nz = safeZoom(z * 1.25);
              onZoomChange?.(nz);
              return nz;
            });
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#fdf6e3]/90 hover:bg-[#fdf6e3] text-[#586e75] rounded text-sm font-bold transition-colors border border-[#93a1a1]/50"
          title="Zoom in"
          aria-label="Zoom in"
        >
          +
        </button>
      </div>

      {/* Canvas rulers */}
      {containerDims.w > 0 && (
        <Rulers
          containerWidth={containerDims.w}
          containerHeight={containerDims.h}
          canvasW={canvasW}
          canvasH={canvasH}
          cursorPos={rulerCursor}
          canvasRect={canvasRectState}
          containerRect={containerRectState}
          centerTransform={computeCenterTransform(sketch.elements, canvasW, canvasH)}
          paper={sketch.paper}
        />
      )}

      {/* Minimap thumbnail — shown when sketch has elements and showMinimap != false */}
      {(showMinimap !== false) && sketch.elements.length > 0 && containerDims.w > 0 && (
        <Minimap
          sketch={sketch}
          redrawKey={redrawKey}
          zoom={zoom}
          pan={pan}
          containerW={containerDims.w}
          containerH={containerDims.h}
          onPanTo={panToElement}
        />
      )}

      {/* Right-click context menu */}
      {contextMenu && onContextMenuAction && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          actions={buildContextMenuActions()}
          onAction={onContextMenuAction}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}

// --- Helpers ---

function hitTest(
  el: SketchData["elements"][number],
  mx: number,
  my: number,
  hiddenLayers?: Set<string>
): boolean {
  if (el.visible === false) return false;
  if (hiddenLayers && el.layer && hiddenLayers.has(el.layer)) return false;
  const margin = 12;

  if ("x1" in el && "x2" in el) {
    const { x1, y1, x2, y2 } = asLine(el);
    return distToSegment(mx, my, x1, y1, x2, y2) < margin;
  }
  if ("x" in el && "w" in el && "h" in el) {
    const { x, y, w, h } = asRect(el);
    return mx >= x - margin && mx <= x + w + margin && my >= y - margin && my <= y + h + margin;
  }
  if ("cx" in el && "r" in el) {
    const { cx, cy, r } = asCirc(el);
    return Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2) < r + margin;
  }
  if ("points" in el && Array.isArray((el as unknown as { points: unknown }).points)) {
    const pts = (el as unknown as { points: { x: number; y: number }[] }).points;
    for (let i = 0; i < pts.length - 1; i++) {
      if (distToSegment(mx, my, pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y) < margin) return true;
    }
    return false;
  }
  if ("x" in el && "y" in el) {
    const { x, y } = asPos(el);
    // Estimate multiline text height for better hit-testing
    const elAny = el as unknown as Record<string, unknown>;
    const fontSize = (elAny.fontSize as number) || (elAny.size as number) || 11;
    const lineHeight = (elAny.lineHeight as number) ?? 1.4;
    const lineSpacing = fontSize * lineHeight;
    const rawContent = String(elAny.text || elAny.content || "");
    const lineCount = Math.max(1, rawContent.split("\n").length);
    const textHeight = lineCount > 1 ? lineSpacing * lineCount : fontSize;
    const textWidth = (elAny.maxWidth as number) || 120; // fallback estimate
    return mx >= x - margin && mx <= x + textWidth + margin && my >= y - fontSize - margin && my <= y + (lineCount - 1) * lineSpacing + margin;
  }

  return false;
}

/** Test if an element's bounding area intersects the selection rectangle [x1,y1]→[x2,y2] */
function boxHitTest(
  el: SketchData["elements"][number],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  hiddenLayers?: Set<string>
): boolean {
  if (el.visible === false) return false;
  if (hiddenLayers && el.layer && hiddenLayers.has(el.layer)) return false;
  if ("x1" in el && "x2" in el) {
    const l = asLine(el);
    const ex1 = Math.min(l.x1, l.x2), ey1 = Math.min(l.y1, l.y2);
    const ex2 = Math.max(l.x1, l.x2), ey2 = Math.max(l.y1, l.y2);
    return ex1 <= x2 && ex2 >= x1 && ey1 <= y2 && ey2 >= y1;
  }
  if ("x" in el && "w" in el && "h" in el) {
    const r = asRect(el);
    return r.x <= x2 && r.x + r.w >= x1 && r.y <= y2 && r.y + r.h >= y1;
  }
  if ("cx" in el && "r" in el) {
    const c = asCirc(el);
    return c.cx - c.r <= x2 && c.cx + c.r >= x1 && c.cy - c.r <= y2 && c.cy + c.r >= y1;
  }
  if ("points" in el && Array.isArray((el as unknown as { points: unknown }).points)) {
    const pts = (el as unknown as { points: { x: number; y: number }[] }).points;
    let pMinX = Infinity, pMinY = Infinity, pMaxX = -Infinity, pMaxY = -Infinity;
    for (const p of pts) { pMinX = Math.min(pMinX, p.x); pMinY = Math.min(pMinY, p.y); pMaxX = Math.max(pMaxX, p.x); pMaxY = Math.max(pMaxY, p.y); }
    return pMinX <= x2 && pMaxX >= x1 && pMinY <= y2 && pMaxY >= y1;
  }
  if ("x" in el && "y" in el) {
    const p = asPos(el);
    const elAny = el as unknown as Record<string, unknown>;
    const fontSize = (elAny.fontSize as number) || (elAny.size as number) || 11;
    const lineHeight = (elAny.lineHeight as number) ?? 1.4;
    const lineSpacing = fontSize * lineHeight;
    const rawContent = String(elAny.text || elAny.content || "");
    const lineCount = Math.max(1, rawContent.split("\n").length);
    const textWidth = (elAny.maxWidth as number) || 120;
    return p.x <= x2 && p.x + textWidth >= x1 && p.y - fontSize <= y2 && p.y + (lineCount - 1) * lineSpacing >= y1;
  }
  return false;
}

function distToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const nearX = x1 + t * dx;
  const nearY = y1 + t * dy;
  return Math.sqrt((px - nearX) ** 2 + (py - nearY) ** 2);
}

/** Ramer-Douglas-Peucker path simplification - reduces point count while preserving shape */
function simplifyPath(
  points: { x: number; y: number }[],
  epsilon: number
): { x: number; y: number }[] {
  if (points.length <= 2) return points;

  // Find the point with the maximum distance from the line between first and last
  let maxDist = 0;
  let maxIdx = 0;
  const first = points[0];
  const last = points[points.length - 1];

  for (let i = 1; i < points.length - 1; i++) {
    const d = distToSegment(points[i].x, points[i].y, first.x, first.y, last.x, last.y);
    if (d > maxDist) {
      maxDist = d;
      maxIdx = i;
    }
  }

  if (maxDist > epsilon) {
    const left = simplifyPath(points.slice(0, maxIdx + 1), epsilon);
    const right = simplifyPath(points.slice(maxIdx), epsilon);
    return [...left.slice(0, -1), ...right];
  }

  return [first, last];
}
