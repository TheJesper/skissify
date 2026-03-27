"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { SketchData, SketchElement } from "@/lib/types";
import { renderSketch } from "@/lib/renderer";

// Type-safe accessors for union element types
type AnyEl = Record<string, unknown>;
const asLine = (el: SketchElement) => el as unknown as { x1: number; y1: number; x2: number; y2: number };
const asRect = (el: SketchElement) => el as unknown as { x: number; y: number; w: number; h: number };
const asCirc = (el: SketchElement) => el as unknown as { cx: number; cy: number; r: number };
const asPos = (el: SketchElement) => el as unknown as { x: number; y: number };

function getElementBounds(el: SketchElement): { x: number; y: number; w: number; h: number } | null {
  if ("x1" in el && "x2" in el) {
    const { x1, y1, x2, y2 } = asLine(el);
    return { x: Math.min(x1, x2) - 5, y: Math.min(y1, y2) - 5, w: Math.abs(x2 - x1) + 10, h: Math.abs(y2 - y1) + 10 };
  }
  if ("x" in el && "w" in el && "h" in el) {
    const { x, y, w, h } = asRect(el);
    return { x: x - 5, y: y - 5, w: w + 10, h: h + 10 };
  }
  if ("cx" in el && "r" in el) {
    const { cx, cy, r } = asCirc(el);
    return { x: cx - r - 5, y: cy - r - 5, w: r * 2 + 10, h: r * 2 + 10 };
  }
  if ("x" in el && "y" in el) {
    const { x, y } = asPos(el);
    return { x: x - 5, y: y - 20, w: 80, h: 30 };
  }
  return null;
}

/** Clamp zoom to [min, max] */
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 8;

interface CanvasProps {
  sketch: SketchData;
  redrawKey: number;
  selectedElements: Set<number>;
  onSelectElements: (elements: Set<number>) => void;
  onMoveSelected?: (dx: number, dy: number) => void;
  /** Called when a drag-move gesture ends — use to commit to undo history */
  onDragEnd?: () => void;
  /** Called with current zoom level whenever it changes */
  onZoomChange?: (zoom: number) => void;
  /** Exposed ref so parent can call resetView() */
  canvasControlRef?: React.MutableRefObject<{ resetView: () => void } | null>;
}

export default function Canvas({
  sketch,
  redrawKey,
  selectedElements,
  onSelectElements,
  onMoveSelected,
  onDragEnd,
  onZoomChange,
  canvasControlRef,
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
  const lastTouchDist = useRef<number | null>(null);
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);

  // Box-select state
  const boxStartScreen = useRef<{ x: number; y: number } | null>(null);
  const isBoxSelecting = useRef(false);
  const [boxSelectionRect, setBoxSelectionRect] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const canvasW = sketch.width || 900;
  const canvasH = sketch.height || 650;

  // Reset view: fit canvas to container with small padding
  const resetView = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const padding = 48;
    const fitZoom = Math.min(
      (cw - padding * 2) / canvasW,
      (ch - padding * 2) / canvasH,
      1 // Never zoom in beyond 100% on reset
    );
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

  // Auto-fit on first mount and when canvas dimensions change
  useEffect(() => {
    resetView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasW, canvasH]);

  // Render
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasW;
    canvas.height = canvasH;

    ctx.clearRect(0, 0, canvasW, canvasH);
    renderSketch(ctx, sketch, canvasW, canvasH);

    // Draw selection highlights
    if (selectedElements.size > 0) {
      ctx.save();
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.globalAlpha = 0.6;

      for (const idx of selectedElements) {
        const el = sketch.elements[idx];
        if (!el) continue;

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
            // Small rotation indicator dot above the box
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.arc(0, -bounds.h / 2 - 8, 4, 0, Math.PI * 2);
            ctx.strokeStyle = "#f59e0b";
            ctx.stroke();
            ctx.restore();
          } else {
            ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
          }
        }
      }

      ctx.restore();
    }
  }, [sketch, canvasW, canvasH, selectedElements]);

  useEffect(() => {
    draw();
  }, [draw, redrawKey]);

  // Convert client coords to canvas coords using the canvas bounding rect
  const clientToCanvas = useCallback(
    (clientX: number, clientY: number): { mx: number; my: number } => {
      const canvas = canvasRef.current;
      if (!canvas) return { mx: 0, my: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvasW / rect.width;
      const scaleY = canvasH / rect.height;
      return {
        mx: (clientX - rect.left) * scaleX,
        my: (clientY - rect.top) * scaleY,
      };
    },
    [canvasW, canvasH]
  );

  // Mouse handlers for selection and drag-to-move
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      // Suppress click after drag or box-select
      if (isDraggingElements.current) return;
      if (wasBoxSelecting.current) {
        wasBoxSelecting.current = false;
        return;
      }
      const { mx, my } = clientToCanvas(e.clientX, e.clientY);

      // Find clicked element (reverse order = top first)
      let hitIdx = -1;
      for (let i = sketch.elements.length - 1; i >= 0; i--) {
        const el = sketch.elements[i];
        if (hitTest(el, mx, my)) {
          hitIdx = i;
          break;
        }
      }

      if (hitIdx >= 0) {
        if (e.shiftKey) {
          const next = new Set(selectedElements);
          if (next.has(hitIdx)) next.delete(hitIdx);
          else next.add(hitIdx);
          onSelectElements(next);
        } else {
          onSelectElements(new Set([hitIdx]));
        }
      } else if (!e.shiftKey) {
        onSelectElements(new Set());
      }
    },
    [sketch.elements, clientToCanvas, selectedElements, onSelectElements]
  );

  // Zoom with scroll — zoom toward mouse cursor for pixel-perfect feel
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
        const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prevZoom * factor));
        const scale = newZoom / prevZoom;
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

      // Check if pressing down on a selected element → start drag-move
      if (selectedElements.size > 0 && onMoveSelected) {
        const hitOnSelected = [...selectedElements].some((i) => {
          const el = sketch.elements[i];
          return el && hitTest(el, mx, my);
        });

        if (hitOnSelected) {
          isDraggingElements.current = false;
          dragStartMouse.current = { x: e.clientX, y: e.clientY };
          lastMouse.current = { x: e.clientX, y: e.clientY };
          e.preventDefault();
          return;
        }
      }

      // Check if clicking on any element at all (unselected)
      const hitOnAny = sketch.elements.some((el) => hitTest(el, mx, my));

      // Empty canvas space → prepare for box-select
      if (!hitOnAny) {
        boxStartScreen.current = { x: e.clientX, y: e.clientY };
        isBoxSelecting.current = false;
        wasBoxSelecting.current = false;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }
    },
    [selectedElements, sketch.elements, clientToCanvas, onMoveSelected]
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
          // rect.width already accounts for the CSS transform scale (zoom),
          // so we just need canvas-coordinate scale: canvasW / (canvasW * zoom) = 1/zoom.
          // Equivalent but simpler than reading getBoundingClientRect each frame.
          onMoveSelected(dx / zoom, dy / zoom);
          lastMouse.current = { x: e.clientX, y: e.clientY };
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
    [selectedElements, onMoveSelected, canvasW, canvasH, zoom]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      isPanning.current = false;

      // Finalize box selection
      if (isBoxSelecting.current && boxStartScreen.current) {
        wasBoxSelecting.current = true;

        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const scaleX = canvasW / rect.width;
          const scaleY = canvasH / rect.height;

          const x1 = (Math.min(e.clientX, boxStartScreen.current.x) - rect.left) * scaleX;
          const y1 = (Math.min(e.clientY, boxStartScreen.current.y) - rect.top) * scaleY;
          const x2 = (Math.max(e.clientX, boxStartScreen.current.x) - rect.left) * scaleX;
          const y2 = (Math.max(e.clientY, boxStartScreen.current.y) - rect.top) * scaleY;

          const boxSelected = new Set<number>();
          sketch.elements.forEach((el, i) => {
            if (boxHitTest(el, x1, y1, x2, y2)) boxSelected.add(i);
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
    },
    [sketch.elements, selectedElements, canvasW, canvasH, onSelectElements, onDragEnd]
  );

  const handleMouseLeave = useCallback(() => {
    isPanning.current = false;
    // Cancel box-select when leaving canvas
    if (isBoxSelecting.current) {
      wasBoxSelecting.current = true;
    }
    setBoxSelectionRect(null);
    isBoxSelecting.current = false;
    boxStartScreen.current = null;
    // Commit drag to undo history if a drag was in progress
    const wasDragging = isDraggingElements.current;
    setTimeout(() => {
      isDraggingElements.current = false;
    }, 0);
    if (wasDragging && onDragEnd) {
      onDragEnd();
    }
  }, [onDragEnd]);

  // Touch: pinch-to-zoom and two-finger pan
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDist.current = Math.sqrt(dx * dx + dy * dy);
      lastTouchCenter.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
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
        const scale = dist / lastTouchDist.current;
        setZoom((z) => {
          const nz = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z * scale));
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
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    lastTouchDist.current = null;
    lastTouchCenter.current = null;
  }, []);

  // Update cursor when hovering over selected elements
  const handleCursorHover = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
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
      if (selectedElements.size > 0 && onMoveSelected) {
        const { mx, my } = clientToCanvas(e.clientX, e.clientY);
        const hitOnSelected = [...selectedElements].some((i) => {
          const el = sketch.elements[i];
          return el && hitTest(el, mx, my);
        });
        setCursor(hitOnSelected ? "grab" : "crosshair");
      } else {
        setCursor("crosshair");
      }
    },
    [selectedElements, sketch.elements, clientToCanvas, onMoveSelected]
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
      ref={containerRef}
      className="flex-1 overflow-hidden flex items-center justify-center touch-none relative"
      style={{
        minHeight: 0,
        backgroundColor: "#eee8d5",
        backgroundImage:
          "radial-gradient(circle, #93a1a1 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: "transform 0.05s ease-out",
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasW}
          height={canvasH}
          onClick={handleClick}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={(e) => {
            handleMouseMove(e);
            handleCursorHover(e);
          }}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="rounded"
          style={{
            cursor,
            maxWidth: "100%",
            maxHeight: "calc(100vh - 60px)",
            width: "auto",
            height: "auto",
            boxShadow:
              sketch.paper === "blueprint"
                ? "0 0 40px 8px rgba(26, 58, 92, 0.5), 0 25px 50px -12px rgba(0, 0, 0, 0.6)"
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

      {/* Zoom controls overlay — bottom-right */}
      <div
        className="absolute bottom-3 right-3 flex items-center gap-1 z-20"
        style={{ pointerEvents: "auto" }}
      >
        <button
          onClick={() => {
            setZoom((z) => {
              const nz = Math.max(MIN_ZOOM, z / 1.25);
              onZoomChange?.(nz);
              return nz;
            });
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#fdf6e3]/90 hover:bg-[#fdf6e3] text-[#586e75] rounded text-sm font-bold transition-colors border border-[#93a1a1]/50"
          title="Zoom out"
          aria-label="Zoom out"
        >
          −
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
              const nz = Math.min(MAX_ZOOM, z * 1.25);
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
    </div>
  );
}

// --- Helpers ---

function hitTest(
  el: SketchData["elements"][number],
  mx: number,
  my: number
): boolean {
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
  if ("x" in el && "y" in el) {
    const { x, y } = asPos(el);
    return mx >= x - margin && mx <= x + 80 && my >= y - 20 && my <= y + margin;
  }

  return false;
}

/** Test if an element's bounding area intersects the selection rectangle [x1,y1]→[x2,y2] */
function boxHitTest(
  el: SketchData["elements"][number],
  x1: number,
  y1: number,
  x2: number,
  y2: number
): boolean {
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
  if ("x" in el && "y" in el) {
    const p = asPos(el);
    return p.x <= x2 && p.x + 80 >= x1 && p.y - 20 <= y2 && p.y + 5 >= y1;
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
