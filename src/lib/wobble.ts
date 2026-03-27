/**
 * Wobble / hand-drawn line algorithms.
 * Ported from the original POC (sketchpaper.jsx) — multi-harmonic wobble,
 * per-tool stroke renderers (pencil, ballpoint, ink, blueprint).
 */

import type { ToolType, PaperType } from "./types";

// ── Types ────────────────────────────────────────────────────────────────────

export type Rng = () => number;
export type Pt = [number, number];

export interface WobbleOptions {
  amplitude: number;
  waves: number;
  humanness: number;
  seed?: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface StrokeConfig {
  amplitude: number;
  waves: number;
  humanness: number;
  color: string;
  tool: ToolType;
  paper: PaperType;
  rng: Rng;
  inkColor: string;
}

// ── RNG (xorshift — same as POC) ────────────────────────────────────────────

export function mkRng(seed: number): Rng {
  let s = ((seed * 1013904223) >>> 0) ^ 0xdeadbeef || 1;
  return () => {
    s ^= s << 13;
    s ^= s >> 17;
    s ^= s << 5;
    return (s >>> 0) / 0xffffffff;
  };
}

// ── Wobble: multi-harmonic, asymmetric envelope ─────────────────────────────

export function wobble(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  amp: number,
  waves: number,
  rng: Rng,
  hum: number = 0
): Pt[] {
  const dist = Math.hypot(x2 - x1, y2 - y1);
  if (dist < 1) return [[x1, y1], [x2, y2]];

  const dx = x2 - x1;
  const dy = y2 - y1;
  const nx = -dy / dist;
  const ny = dx / dist;

  // Multiple harmonics for organic feel
  const nh = 2 + Math.floor(rng() * 2);
  const H: { a: number; f: number; p: number }[] = [];
  for (let h = 0; h < nh; h++) {
    H.push({
      a: (amp * (0.25 + rng() * 0.75)) / (h + 1),
      f: waves * (0.4 + rng() * 1.6) + h * rng() * 0.7,
      p: rng() * Math.PI * 2,
    });
  }

  // Asymmetric envelope breakpoint
  const bp = 0.15 + rng() * 0.7;
  const env = (t: number) =>
    Math.min(1, Math.pow(Math.max(t, 0.001) / bp, 0.55)) *
    Math.min(1, Math.pow(Math.max(1 - t, 0.001) / (1 - bp), 0.55));

  // Endpoint randomness
  const ed = amp * 0.12 + hum * 0.9;
  const ex = (rng() - 0.5) * ed;
  const ey = (rng() - 0.5) * ed;

  // Humanness effects: tremor, hesitation, overshoot
  const hasTr = hum > 0 && rng() < hum * 0.5;
  const trAt = rng();
  const trLen = 0.03 + rng() * 0.09;
  const trAmp = (1 + rng() * 2) * hum;

  const hasHe = hum > 0 && rng() < hum * 0.35;
  const heAt = 0.2 + rng() * 0.6;
  const heAmp = (0.5 + rng() * 1.5) * hum;

  const over = hum > 0 && rng() < hum * 0.28 ? rng() * 1.8 * hum : 0;

  const segs = Math.max(6, Math.floor(dist / 5));
  const pts: Pt[] = [
    [x1 + (rng() - 0.5) * amp * 0.1, y1 + (rng() - 0.5) * amp * 0.1],
  ];

  for (let i = 1; i < segs; i++) {
    const t = i / segs;
    const e = env(t);
    let w = 0;
    for (const h of H) w += Math.sin(t * Math.PI * 2 * h.f + h.p) * h.a * e;
    w += (rng() - 0.5) * amp * 0.05;

    let jx = 0;
    let jy = 0;
    if (hasTr) {
      const td = Math.abs(t - trAt);
      if (td < trLen) jx = (rng() - 0.5) * trAmp * (1 - td / trLen);
    }
    if (hasHe) {
      const hd = Math.abs(t - heAt);
      if (hd < 0.05) jy = (rng() - 0.5) * heAmp * (1 - hd / 0.05);
    }
    pts.push([
      x1 + t * dx + nx * (w + jy) + jx,
      y1 + t * dy + ny * (w + jy) + jx,
    ]);
  }

  if (over > 0) {
    pts.push([
      x2 + ex + (dx / dist) * over,
      y2 + ey + (dy / dist) * over,
    ]);
    pts.push([x2 + ex * 0.3, y2 + ey * 0.3]);
  } else {
    pts.push([x2 + ex, y2 + ey]);
  }

  return pts;
}

// ── Smooth curve through points ─────────────────────────────────────────────

export function cpath(ctx: CanvasRenderingContext2D, pts: Pt[]): void {
  if (pts.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  if (pts.length === 2) {
    ctx.lineTo(pts[1][0], pts[1][1]);
  } else {
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2;
      const my = (pts[i][1] + pts[i + 1][1]) / 2;
      ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
    }
    ctx.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]);
  }
  ctx.stroke();
}

// ── Per-tool stroke renderers ───────────────────────────────────────────────

function pencilStroke(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  col: string,
  rng: Rng,
): void {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  // 3 light passes with slight offset for graphite texture
  for (let p = 0; p < 3; p++) {
    ctx.strokeStyle = col;
    ctx.lineWidth = 0.45 + rng() * 0.5;
    ctx.globalAlpha = 0.2 + rng() * 0.22;
    cpath(
      ctx,
      pts.map(([x, y]) => [x + (rng() - 0.5) * 0.6, y + (rng() - 0.5) * 0.6])
    );
  }
  ctx.restore();
}

function ballpointStroke(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  col: string,
  rng: Rng,
  h: number = 0
): void {
  ctx.save();
  // Ink blob at start
  ctx.fillStyle = col;
  ctx.globalAlpha = 0.12 + rng() * 0.14;
  ctx.beginPath();
  ctx.arc(pts[0][0], pts[0][1], 0.7 + rng() * 0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = col;

  const sp = h > 0 && rng() < h * 0.4;
  const sat = rng();
  const ss = h * 0.8 + rng() * 1.2;

  // Per-segment rendering for pressure variation
  for (let i = 0; i < pts.length - 1; i++) {
    const t = (i + 0.5) / Math.max(pts.length - 1, 1);
    const p = 0.3 + 0.7 * Math.sin(t * Math.PI);
    const ex = sp && Math.abs(t - sat) < 0.05 ? ss : 0;
    ctx.lineWidth = 0.45 + p * 1.0 + (rng() - 0.5) * 0.2 + ex * 0.25;
    ctx.globalAlpha = 0.5 + p * 0.45 + (rng() - 0.5) * 0.05;
    ctx.beginPath();
    ctx.moveTo(pts[i][0], pts[i][1]);
    ctx.lineTo(pts[i + 1][0], pts[i + 1][1]);
    ctx.stroke();
  }
  ctx.restore();
}

function inkStroke(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  col: string,
  rng: Rng,
  h: number = 0
): void {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = col;

  // Possible skip segment (pen lift)
  const sk = h > 0 && rng() < h * 0.1;
  const sk0 = rng();
  const skl = 0.04 + rng() * 0.04;

  for (let i = 0; i < pts.length - 1; i++) {
    const t = i / Math.max(pts.length - 1, 1);
    if (sk && t > sk0 && t < sk0 + skl) continue; // pen lift
    const f = Math.max(0.4, 1 - t * 0.25);
    ctx.lineWidth = 0.8 + f * 1.0 + (rng() - 0.5) * 0.3;
    ctx.globalAlpha = 0.8 + f * 0.18;
    ctx.beginPath();
    ctx.moveTo(pts[i][0], pts[i][1]);
    ctx.lineTo(pts[i + 1][0], pts[i + 1][1]);
    ctx.stroke();
  }
  ctx.restore();
}

function blueprintStroke(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  col: string,
  rng: Rng
): void {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = col;
  // Single clean pass — technical drafting
  ctx.lineWidth = 1.0 + (rng() - 0.5) * 0.08;
  ctx.globalAlpha = 0.88 + rng() * 0.1;
  cpath(ctx, pts);
  // Faint second pass for ink depth
  ctx.lineWidth = 0.3;
  ctx.globalAlpha = 0.15 + rng() * 0.1;
  cpath(ctx, pts);
  ctx.restore();
}

/** Ink glob (tiny blob at random point along stroke) */
function inkGlob(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  col: string,
  rng: Rng,
  h: number
): void {
  if (h < 0.1 || rng() > h * 0.25) return;
  const i = Math.floor(rng() * pts.length);
  ctx.save();
  ctx.fillStyle = col;
  ctx.globalAlpha = 0.08 + rng() * 0.14;
  ctx.beginPath();
  ctx.arc(pts[i][0], pts[i][1], 0.6 + rng() * 1.1 * h, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// ── Main stroke dispatcher ──────────────────────────────────────────────────

export function doStroke(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  col: string,
  tool: ToolType,
  paper: PaperType,
  rng: Rng,
  h: number = 0
): void {
  if (paper === "blueprint") {
    blueprintStroke(ctx, pts, col, rng);
  } else if (tool === "pencil") {
    pencilStroke(ctx, pts, col, rng);
    if (h > 0) inkGlob(ctx, pts, col, rng, h);
  } else if (tool === "ink") {
    inkStroke(ctx, pts, col, rng, h);
    if (h > 0) inkGlob(ctx, pts, col, rng, h);
  } else {
    ballpointStroke(ctx, pts, col, rng, h);
    if (h > 0) inkGlob(ctx, pts, col, rng, h);
  }
}

// ── High-level: draw a hand-drawn line ──────────────────────────────────────

export function drawHandLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  cfg: StrokeConfig
): void {
  const h = cfg.humanness || 0;
  const pts = wobble(x1, y1, x2, y2, cfg.amplitude, cfg.waves, cfg.rng, h);
  doStroke(ctx, pts, cfg.color, cfg.tool, cfg.paper, cfg.rng, h);
}

// ── Backward-compatible exports ─────────────────────────────────────────────
// These adapt the old API so renderer.ts can use them during transition.

export function wobbleLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts: WobbleOptions
): Point[] {
  const rng = mkRng(opts.seed ?? Math.floor(x1 * 100 + y1 * 37 + x2 * 13 + y2 * 7));
  const pts = wobble(x1, y1, x2, y2, opts.amplitude, opts.waves, rng, opts.humanness);
  return pts.map(([x, y]) => ({ x, y }));
}

export function wobbleCircle(
  cx: number,
  cy: number,
  r: number,
  opts: WobbleOptions
): Point[] {
  const rng = mkRng(opts.seed ?? Math.floor(cx * 100 + cy * 37 + r * 13));
  const n = Math.max(20, Math.floor(r * 1.8));
  const pts: Point[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const wr = r + (rng() - 0.5) * opts.amplitude * 0.7;
    pts.push({ x: cx + Math.cos(a) * wr, y: cy + Math.sin(a) * wr });
  }
  return pts;
}

export function wobbleArc(
  cx: number,
  cy: number,
  r: number,
  startAngleDeg: number,
  endAngleDeg: number,
  opts: WobbleOptions
): Point[] {
  const rng = mkRng(
    opts.seed ?? Math.floor(cx * 100 + cy * 37 + r * 13 + startAngleDeg)
  );
  const startAngle = (startAngleDeg * Math.PI) / 180;
  const endAngle = (endAngleDeg * Math.PI) / 180;
  const pts: Point[] = [];
  for (let i = 0; i <= 14; i++) {
    const a = startAngle + (i / 14) * (endAngle - startAngle);
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
  }
  return pts;
}

export function drawSmoothCurve(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  closed: boolean = false
): void {
  if (points.length < 2) return;
  const pts: Pt[] = points.map((p) => [p.x, p.y]);
  if (closed) {
    pts.push(pts[0]);
  }
  cpath(ctx, pts);
}
