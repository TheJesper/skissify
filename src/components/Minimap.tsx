"use client";

import { useRef, useEffect, useCallback } from "react";
import { SketchData } from "@/lib/types";
import { renderSketch } from "@/lib/renderer";

const MINIMAP_W = 160;
const MINIMAP_H = 120;
const BORDER_RADIUS = 6;

interface MinimapProps {
  sketch: SketchData;
  redrawKey: number;
  /** Current zoom level (1 = 100%) */
  zoom: number;
  /** Current pan offset in screen pixels (before zoom) */
  pan: { x: number; y: number };
  /** Canvas container dimensions in screen pixels */
  containerW: number;
  containerH: number;
  /** Called when user clicks the minimap to pan (receives element-space x, y) */
  onPanTo?: (ex: number, ey: number) => void;
}

/**
 * Minimap — a small thumbnail of the full sketch with a viewport indicator.
 * Renders in the bottom-left corner of the canvas area.
 */
export default function Minimap({
  sketch,
  redrawKey,
  zoom,
  pan,
  containerW,
  containerH,
  onPanTo,
}: MinimapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);

  const sketchW = sketch.width || 900;
  const sketchH = sketch.height || 650;

  // Scale factor: how much we shrink the sketch to fit in the minimap
  const scaleX = MINIMAP_W / sketchW;
  const scaleY = MINIMAP_H / sketchH;
  const mmScale = Math.min(scaleX, scaleY);

  // Actual minimap render size (maintains aspect ratio)
  const mmW = Math.round(sketchW * mmScale);
  const mmH = Math.round(sketchH * mmScale);

  // Render the sketch thumbnail
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = mmW;
    canvas.height = mmH;
    ctx.clearRect(0, 0, mmW, mmH);

    // Scale context down to minimap size
    ctx.save();
    ctx.scale(mmScale, mmScale);
    try {
      renderSketch(ctx, sketch, sketchW, sketchH);
    } catch {
      // Render error — just show blank
    }
    ctx.restore();
  }, [sketch, redrawKey, mmW, mmH, mmScale, sketchW, sketchH]);

  // Render the viewport indicator overlay
  useEffect(() => {
    const canvas = overlayRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = mmW;
    canvas.height = mmH;
    ctx.clearRect(0, 0, mmW, mmH);

    // Compute visible area in element-space
    // The canvas is centered in the container with zoom applied.
    // Visible sketch area: the portion of the sketch visible through the container window.
    const containerCX = containerW / 2;
    const containerCY = containerH / 2;

    // The canvas center in screen coords is (containerCX + pan.x, containerCY + pan.y)
    // A screen point (sx, sy) maps to element-space:
    //   ex = (sx - containerCX - pan.x) / zoom
    //   ey = (sy - containerCY - pan.y) / zoom
    // So the visible area in element-space:
    const visLeft = (-containerW / 2 - pan.x) / zoom;
    const visTop = (-containerH / 2 - pan.y) / zoom;
    const visRight = (containerW / 2 - pan.x) / zoom;
    const visBottom = (containerH / 2 - pan.y) / zoom;

    // Convert to minimap coords (account for centering transform: sketch is centered at (sketchW/2, sketchH/2) in element space)
    const toMM = (ex: number, ey: number) => ({
      mx: ex * mmScale,
      my: ey * mmScale,
    });

    const tl = toMM(visLeft, visTop);
    const br = toMM(visRight, visBottom);

    // Clamp to minimap bounds for display
    const rx = Math.max(0, tl.mx);
    const ry = Math.max(0, tl.my);
    const rw = Math.min(mmW, br.mx) - rx;
    const rh = Math.min(mmH, br.my) - ry;

    if (rw > 0 && rh > 0) {
      // Dim area outside the viewport
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      // Top strip
      ctx.fillRect(0, 0, mmW, ry);
      // Bottom strip
      ctx.fillRect(0, ry + rh, mmW, mmH - ry - rh);
      // Left strip
      ctx.fillRect(0, ry, rx, rh);
      // Right strip
      ctx.fillRect(rx + rw, ry, mmW - rx - rw, rh);

      // Viewport border
      ctx.strokeStyle = "rgba(38, 139, 210, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.strokeRect(rx + 0.75, ry + 0.75, Math.max(0, rw - 1.5), Math.max(0, rh - 1.5));
    } else {
      // Fully zoomed in — dim everything and draw a crosshair
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, mmW, mmH);
    }
  }, [zoom, pan, containerW, containerH, mmW, mmH, mmScale, sketchW, sketchH]);

  // Convert minimap click to element-space pan
  const handleInteract = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!onPanTo) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      // Convert minimap coords to sketch element-space coords
      const ex = mx / mmScale;
      const ey = my / mmScale;
      onPanTo(ex, ey);
    },
    [onPanTo, mmScale]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      isDragging.current = true;
      handleInteract(e);
    },
    [handleInteract]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      handleInteract(e);
    },
    [handleInteract]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      className="absolute bottom-12 left-3 z-20 rounded-md overflow-hidden shadow-lg border border-[#93a1a1]/40"
      style={{
        width: mmW,
        height: mmH,
        cursor: onPanTo ? "crosshair" : "default",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      title="Minimap — click to pan"
    >
      {/* Sketch thumbnail */}
      <canvas
        ref={canvasRef}
        width={mmW}
        height={mmH}
        style={{ position: "absolute", top: 0, left: 0, display: "block" }}
      />
      {/* Viewport overlay */}
      <canvas
        ref={overlayRef}
        width={mmW}
        height={mmH}
        style={{ position: "absolute", top: 0, left: 0, display: "block" }}
      />
      {/* Label */}
      <div
        className="absolute bottom-0 right-0 px-1 text-[9px] font-mono text-[#93a1a1] bg-[#073642]/70 rounded-tl"
        style={{ pointerEvents: "none" }}
      >
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}
