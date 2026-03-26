"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { SketchData } from "@/lib/types";
import { renderSketch } from "@/lib/renderer";

interface CanvasProps {
  sketch: SketchData;
  redrawKey: number;
  selectedElements: Set<number>;
  onSelectElements: (elements: Set<number>) => void;
}

export default function Canvas({
  sketch,
  redrawKey,
  selectedElements,
  onSelectElements,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastTouchDist = useRef<number | null>(null);
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);

  const canvasW = sketch.width || 900;
  const canvasH = sketch.height || 650;

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

        if ("x1" in el && "x2" in el && "y1" in el && "y2" in el) {
          const minX = Math.min(el.x1, el.x2);
          const minY = Math.min(el.y1, el.y2);
          bounds = {
            x: minX - 5,
            y: minY - 5,
            w: Math.abs(el.x2 - el.x1) + 10,
            h: Math.abs(el.y2 - el.y1) + 10,
          };
        } else if ("x" in el && "w" in el && "h" in el) {
          bounds = { x: el.x - 5, y: el.y - 5, w: el.w + 10, h: el.h + 10 };
        } else if ("cx" in el && "r" in el) {
          bounds = {
            x: el.cx - el.r - 5,
            y: el.cy - el.r - 5,
            w: el.r * 2 + 10,
            h: el.r * 2 + 10,
          };
        } else if ("x" in el && "y" in el) {
          bounds = { x: el.x - 5, y: el.y - 20, w: 80, h: 30 };
        }

        if (bounds) {
          ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
        }
      }

      ctx.restore();
    }
  }, [sketch, canvasW, canvasH, selectedElements]);

  useEffect(() => {
    draw();
  }, [draw, redrawKey]);

  // Mouse handlers for selection
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvasW / rect.width;
      const scaleY = canvasH / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;

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
    [sketch.elements, canvasW, canvasH, selectedElements, onSelectElements]
  );

  // Zoom with scroll
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom((z) => Math.max(0.2, Math.min(5, z * delta)));
    },
    []
  );

  // Pan with alt/ctrl + drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.altKey || e.ctrlKey) {
      isPanning.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning.current) {
      setPan((p) => ({
        x: p.x + (e.clientX - lastMouse.current.x),
        y: p.y + (e.clientY - lastMouse.current.y),
      }));
      lastMouse.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

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
        setZoom((z) => Math.max(0.2, Math.min(5, z * scale)));
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

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        // Handled by parent
      }
      if (e.key === "Escape") {
        onSelectElements(new Set());
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSelectElements]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-hidden bg-neutral-800 flex items-center justify-center touch-none"
      style={{ minHeight: 0 }}
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
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="shadow-2xl cursor-crosshair rounded"
          style={{
            maxWidth: "100%",
            maxHeight: "calc(100vh - 60px)",
            width: "auto",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}

function hitTest(
  el: SketchData["elements"][number],
  mx: number,
  my: number
): boolean {
  const margin = 12;

  if ("x1" in el && "x2" in el && "y1" in el && "y2" in el) {
    // Line-based: distance to line segment
    const dist = distToSegment(mx, my, el.x1, el.y1, el.x2, el.y2);
    return dist < margin;
  }
  if ("x" in el && "w" in el && "h" in el) {
    return (
      mx >= el.x - margin &&
      mx <= el.x + el.w + margin &&
      my >= el.y - margin &&
      my <= el.y + el.h + margin
    );
  }
  if ("cx" in el && "r" in el) {
    const dist = Math.sqrt((mx - el.cx) ** 2 + (my - el.cy) ** 2);
    return dist < el.r + margin;
  }
  if ("x" in el && "y" in el) {
    return mx >= el.x - margin && mx <= el.x + 80 && my >= el.y - 20 && my <= el.y + margin;
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
