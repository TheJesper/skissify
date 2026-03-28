"use client";

import { useRef, useEffect, useCallback } from "react";

const RULER_SIZE = 22; // px thickness
const FONT = "9px JetBrains Mono, monospace";
const BG = "#eee8d5";
const TICK_COLOR = "#93a1a1";
const TEXT_COLOR = "#586e75";
const CURSOR_COLOR = "#dc322f"; // solarized red
const CORNER_BG = "#e6dfcc";

interface RulersProps {
  containerWidth: number;
  containerHeight: number;
  canvasW: number;
  canvasH: number;
  cursorPos: { x: number; y: number } | null;
  /** Canvas element bounding rect (viewport coords) */
  canvasRect: DOMRect | null;
  /** Container element bounding rect (viewport coords) */
  containerRect: DOMRect | null;
  centerTransform: { tx: number; ty: number; scale: number };
}

/**
 * Choose a nice tick interval based on screen pixels per element-space unit.
 * Returns [minor, major] spacing in element-space units.
 */
function chooseTickInterval(pxPerUnit: number): [number, number] {
  const candidates = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000];
  for (const c of candidates) {
    if (c * pxPerUnit >= 60) return [c, c * 5];
  }
  return [5000, 25000];
}

export default function Rulers({
  containerWidth,
  containerHeight,
  canvasW,
  canvasH,
  cursorPos,
  canvasRect,
  containerRect,
  centerTransform: ct,
}: RulersProps) {
  const hCanvasRef = useRef<HTMLCanvasElement>(null);
  const vCanvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * Convert element-space coord → container-relative CSS px.
   * Chain: element → canvas pixel (center transform) → viewport px (canvasRect) → container-relative
   */
  const elementToContainer = useCallback(
    (ex: number, ey: number): { cx: number; cy: number } | null => {
      if (!canvasRect || !containerRect) return null;
      const s = ct.scale > 0 ? ct.scale : 1;
      const cpx = ex * s + ct.tx;
      const cpy = ey * s + ct.ty;
      const vpx = canvasRect.left + (cpx / canvasW) * canvasRect.width;
      const vpy = canvasRect.top + (cpy / canvasH) * canvasRect.height;
      return { cx: vpx - containerRect.left, cy: vpy - containerRect.top };
    },
    [canvasRect, containerRect, ct, canvasW, canvasH]
  );

  /** Screen pixel per element-space unit */
  const pxPerUnitX = canvasRect ? (canvasRect.width / canvasW) * (ct.scale > 0 ? ct.scale : 1) : 1;
  const pxPerUnitY = canvasRect ? (canvasRect.height / canvasH) * (ct.scale > 0 ? ct.scale : 1) : 1;

  // Draw horizontal ruler
  const drawH = useCallback(() => {
    const c = hCanvasRef.current;
    if (!c || !canvasRect || !containerRect) return;
    const dpr = window.devicePixelRatio || 1;
    const w = containerWidth;
    c.width = w * dpr;
    c.height = RULER_SIZE * dpr;
    c.style.width = `${w}px`;
    c.style.height = `${RULER_SIZE}px`;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, RULER_SIZE);

    // Bottom border line
    ctx.strokeStyle = TICK_COLOR;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(RULER_SIZE, RULER_SIZE - 0.5);
    ctx.lineTo(w, RULER_SIZE - 0.5);
    ctx.stroke();

    const [minor, major] = chooseTickInterval(pxPerUnitX);

    // Visible element-space range for X axis
    const containerToElementX = (cx: number) => {
      const vpx = cx + containerRect.left;
      const cpx = ((vpx - canvasRect.left) / canvasRect.width) * canvasW;
      const s = ct.scale > 0 ? ct.scale : 1;
      return (cpx - ct.tx) / s;
    };

    const startEl = containerToElementX(RULER_SIZE);
    const endEl = containerToElementX(w);
    const lo = Math.min(startEl, endEl);
    const hi = Math.max(startEl, endEl);
    const fromTick = Math.floor(lo / minor) * minor;
    const toTick = Math.ceil(hi / minor) * minor;

    ctx.font = FONT;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    for (let v = fromTick; v <= toTick; v += minor) {
      const pos = elementToContainer(v, 0);
      if (!pos) continue;
      const x = pos.cx;
      if (x < RULER_SIZE - 1 || x > w + 1) continue;

      const isMajor = Math.abs(v % major) < 0.01;
      ctx.strokeStyle = TICK_COLOR;
      ctx.lineWidth = isMajor ? 1 : 0.5;
      ctx.beginPath();
      ctx.moveTo(x, isMajor ? 2 : RULER_SIZE * 0.55);
      ctx.lineTo(x, RULER_SIZE - 1);
      ctx.stroke();

      if (isMajor) {
        ctx.fillStyle = TEXT_COLOR;
        ctx.fillText(String(Math.round(v)), x, 1);
      }
    }

    // Cursor marker (red triangle)
    if (cursorPos) {
      const pos = elementToContainer(cursorPos.x, 0);
      if (pos && pos.cx >= RULER_SIZE && pos.cx <= w) {
        ctx.fillStyle = CURSOR_COLOR;
        ctx.beginPath();
        ctx.moveTo(pos.cx - 4, RULER_SIZE);
        ctx.lineTo(pos.cx + 4, RULER_SIZE);
        ctx.lineTo(pos.cx, RULER_SIZE - 6);
        ctx.closePath();
        ctx.fill();
      }
    }
  }, [containerWidth, canvasRect, containerRect, ct, canvasW, pxPerUnitX, cursorPos, elementToContainer]);

  // Draw vertical ruler
  const drawV = useCallback(() => {
    const c = vCanvasRef.current;
    if (!c || !canvasRect || !containerRect) return;
    const dpr = window.devicePixelRatio || 1;
    const h = containerHeight;
    c.width = RULER_SIZE * dpr;
    c.height = h * dpr;
    c.style.width = `${RULER_SIZE}px`;
    c.style.height = `${h}px`;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, RULER_SIZE, h);

    // Right border line
    ctx.strokeStyle = TICK_COLOR;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(RULER_SIZE - 0.5, RULER_SIZE);
    ctx.lineTo(RULER_SIZE - 0.5, h);
    ctx.stroke();

    const [minor, major] = chooseTickInterval(pxPerUnitY);

    const containerToElementY = (cy: number) => {
      const vpy = cy + containerRect.top;
      const cpy = ((vpy - canvasRect.top) / canvasRect.height) * canvasH;
      const s = ct.scale > 0 ? ct.scale : 1;
      return (cpy - ct.ty) / s;
    };

    const startEl = containerToElementY(RULER_SIZE);
    const endEl = containerToElementY(h);
    const lo = Math.min(startEl, endEl);
    const hi = Math.max(startEl, endEl);
    const fromTick = Math.floor(lo / minor) * minor;
    const toTick = Math.ceil(hi / minor) * minor;

    ctx.font = FONT;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let v = fromTick; v <= toTick; v += minor) {
      const pos = elementToContainer(0, v);
      if (!pos) continue;
      const y = pos.cy;
      if (y < RULER_SIZE - 1 || y > h + 1) continue;

      const isMajor = Math.abs(v % major) < 0.01;
      ctx.strokeStyle = TICK_COLOR;
      ctx.lineWidth = isMajor ? 1 : 0.5;
      ctx.beginPath();
      ctx.moveTo(isMajor ? 2 : RULER_SIZE * 0.55, y);
      ctx.lineTo(RULER_SIZE - 1, y);
      ctx.stroke();

      if (isMajor) {
        ctx.save();
        ctx.translate(RULER_SIZE / 2 - 2, y);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = TEXT_COLOR;
        ctx.fillText(String(Math.round(v)), 0, 0);
        ctx.restore();
      }
    }

    // Cursor marker (red triangle)
    if (cursorPos) {
      const pos = elementToContainer(0, cursorPos.y);
      if (pos && pos.cy >= RULER_SIZE && pos.cy <= h) {
        ctx.fillStyle = CURSOR_COLOR;
        ctx.beginPath();
        ctx.moveTo(RULER_SIZE, pos.cy - 4);
        ctx.lineTo(RULER_SIZE, pos.cy + 4);
        ctx.lineTo(RULER_SIZE - 6, pos.cy);
        ctx.closePath();
        ctx.fill();
      }
    }
  }, [containerHeight, canvasRect, containerRect, ct, canvasH, pxPerUnitY, cursorPos, elementToContainer]);

  useEffect(() => {
    drawH();
    drawV();
  }, [drawH, drawV]);

  return (
    <>
      {/* Corner square */}
      <div
        className="absolute z-30 pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: RULER_SIZE,
          height: RULER_SIZE,
          backgroundColor: CORNER_BG,
          borderRight: `0.5px solid ${TICK_COLOR}`,
          borderBottom: `0.5px solid ${TICK_COLOR}`,
        }}
      />
      {/* Horizontal ruler (top) */}
      <canvas
        ref={hCanvasRef}
        className="absolute z-30 pointer-events-none"
        style={{ top: 0, left: 0 }}
      />
      {/* Vertical ruler (left) */}
      <canvas
        ref={vCanvasRef}
        className="absolute z-30 pointer-events-none"
        style={{ top: 0, left: 0 }}
      />
    </>
  );
}

export { RULER_SIZE };
