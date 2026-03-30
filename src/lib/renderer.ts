import {
  SketchData,
  SketchElement,
  BlueprintMetadata,
  PAPER_COLORS,
  GRID_COLORS,
  BLUEPRINT_COLOR_MAP,
  FONT_OPTIONS,
  SkissifyFont,
  PaperType,
  ToolType,
} from "./types";

/** Resolve a SkissifyFont key to a CSS font-family string */
function resolveFontCss(font: SkissifyFont | undefined, fallback: string): string {
  if (!font) return fallback;
  const found = FONT_OPTIONS.find((f) => f.key === font);
  return found ? found.css : fallback;
}
import {
  wobble,
  wobblePath,
  WobbleOptions,
  Pt,
  mkRng,
  doStroke,
} from "./wobble";
import type { Rng } from "./wobble";

// ── Helpers ──────────────────────────────────────────────────────

/** Resolve element color: textColor > color > inkColor, with blueprint mapping */
function resolveColor(
  el: SketchElement,
  sketch: SketchData,
  isText: boolean = false
): string {
  const raw = (isText && "textColor" in el && el.textColor)
    ? el.textColor
    : el.color || sketch.inkColor || "#111";
  if (sketch.paper === "blueprint") {
    return BLUEPRINT_COLOR_MAP[raw] || "#d8eaff";
  }
  return raw;
}

/** DJB2 hash for deterministic seeding per element */
function hashElement(el: SketchElement): number {
  const str = JSON.stringify(el);
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getWobbleOpts(sketch: SketchData, el: SketchElement, idx: number): WobbleOptions {
  // Apply render style overrides to wobble parameters
  let amplitude = sketch.amplitude;
  let humanness = sketch.humanness;
  if (sketch.renderStyle === "technical") {
    amplitude = Math.min(amplitude, 0.6);
    humanness = Math.min(humanness, 0.15);
  } else if (sketch.renderStyle === "blueprint") {
    amplitude = Math.min(amplitude, 0.5);
    humanness = Math.min(humanness, 0.1);
  }
  return {
    amplitude,
    waves: sketch.waves,
    humanness,
    seed: idx * 997 + 42 + (sketch.sessionSeed || 0),
  };
}

/** Helper line: generates wobble points and renders with per-tool stroke */
function HL(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  opts: WobbleOptions,
  color: string,
  tool: string,
  paper: PaperType,
  rng: Rng,
  humanness: number
): void {
  const lineRng = mkRng(opts.seed ?? Math.floor(x1 * 100 + y1 * 37 + x2 * 13 + y2 * 7));
  const pts = wobble(x1, y1, x2, y2, opts.amplitude, opts.waves, lineRng, opts.humanness);
  doStroke(ctx, pts, color, tool as any, paper, rng, humanness);
}

// ── Paper & Grid ─────────────────────────────────────────────────

function drawPaperBackground(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  paper: PaperType
): void {
  if (paper === "blueprint") {
    // Dark board border first (like how cream paper sits on a dark board)
    ctx.fillStyle = "#0d1f3a";
    ctx.fillRect(0, 0, w, h);
    // Blueprint paper with 4px inset — gives "paper on board" look
    const bm = 4;
    const grad = ctx.createLinearGradient(bm, bm, bm, h - bm);
    grad.addColorStop(0, "#1a3a6b");
    grad.addColorStop(0.5, "#1e4278");
    grad.addColorStop(1, "#16305e");
    ctx.fillStyle = grad;
    ctx.fillRect(bm, bm, w - bm * 2, h - bm * 2);
  } else {
    ctx.fillStyle = PAPER_COLORS[paper] || PAPER_COLORS.cream;
    ctx.fillRect(0, 0, w, h);
  }
}

function drawPaperTexture(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  paper: PaperType,
  rng: () => number
): void {
  if (paper === "blueprint") {
    // White speckles for blueprint
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    for (let i = 0; i < 300; i++) {
      const sx = rng() * w;
      const sy = rng() * h;
      const sr = rng() * 1.5;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Paper noise particles
    for (let i = 0; i < 600; i++) {
      const sx = rng() * w;
      const sy = rng() * h;
      const sw = rng() * 2;
      const sh = rng() * 2;
      const isLight = rng() > 0.5;
      ctx.fillStyle = isLight
        ? `rgba(255,255,255,${rng() * 0.05})`
        : `rgba(0,0,0,${rng() * 0.05})`;
      ctx.fillRect(sx, sy, sw, sh);
    }
  }
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  paper: PaperType
): void {
  const gridColor = GRID_COLORS[paper];

  // Minor grid: 20px, thin
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 0.35;
  ctx.globalAlpha = paper === "blueprint" ? 1 : 0.35;
  for (let x = 20; x < w; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 20; y < h; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Major grid: 100px, slightly thicker
  ctx.lineWidth = 0.6;
  if (paper === "blueprint") {
    ctx.strokeStyle = "rgba(180,210,255,.18)";
    ctx.globalAlpha = 1;
  } else {
    ctx.globalAlpha = 0.15;
  }
  for (let x = 100; x < w; x += 100) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 100; y < h; y += 100) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

// ── Blueprint Overlay ────────────────────────────────────────────

function drawBlueprintOverlay(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  meta?: BlueprintMetadata
): void {
  const m = meta ?? {};
  const title = m.title || "PLANRITNING";
  const owner = m.owner || "";
  const date = m.date || "";
  const scale = m.scale || "1:100";
  const sheetNum = m.sheetNumber || "";
  const drawnBy = m.drawnBy || "";

  const wc = "rgba(200,225,255,.75)";
  const wl = "rgba(200,225,255,.5)";

  ctx.save();

  // Double border
  ctx.strokeStyle = wc;
  ctx.lineWidth = 0.9;
  ctx.strokeRect(10, 10, W - 20, H - 20);
  ctx.lineWidth = 0.4;
  ctx.strokeRect(14, 14, W - 28, H - 28);

  // Center title
  ctx.fillStyle = wc;
  ctx.font = "bold 11px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(title, W / 2, 16);

  // Decorative underline
  ctx.strokeStyle = wl;
  ctx.lineWidth = 0.4;
  const titleW = ctx.measureText(title).width;
  ctx.beginPath();
  ctx.moveTo(W / 2 - titleW / 2 - 70, 30);
  ctx.lineTo(W / 2 + titleW / 2 + 70, 30);
  ctx.stroke();

  // Title block (bottom-right) — 3 rows × 2 columns
  const tw = 200, th = drawnBy ? 94 : 72;
  const tx = W - 10 - tw, ty = H - 10 - th;
  const rowH = 22;

  ctx.strokeStyle = wc;
  ctx.lineWidth = 0.6;
  ctx.strokeRect(tx, ty, tw, th);

  // Horizontal dividers
  ctx.beginPath();
  for (let r = 1; r < (drawnBy ? 4 : 3); r++) {
    ctx.moveTo(tx, ty + r * rowH);
    ctx.lineTo(tx + tw, ty + r * rowH);
  }
  ctx.stroke();

  // Vertical divider in data rows (below title row)
  ctx.beginPath();
  ctx.moveTo(tx + 100, ty + rowH);
  ctx.lineTo(tx + 100, ty + th);
  ctx.stroke();

  // Title block text
  ctx.fillStyle = wc;
  ctx.textAlign = "left";

  // Row 0: title (full width)
  ctx.font = "bold 8px Georgia, serif";
  ctx.fillText(title, tx + 6, ty + 6);

  ctx.font = "7px Georgia, serif";

  // Row 1: owner | scale
  if (owner) ctx.fillText(owner, tx + 6, ty + rowH + 6);
  ctx.fillText("SCALE: " + scale, tx + 106, ty + rowH + 6);

  // Row 2: date | sheet number
  if (date) ctx.fillText("DATE: " + date, tx + 6, ty + 2 * rowH + 6);
  if (sheetNum) ctx.fillText("SHEET: " + sheetNum, tx + 106, ty + 2 * rowH + 6);

  // Row 3 (optional): drawn by
  if (drawnBy) {
    ctx.fillText("BY: " + drawnBy, tx + 6, ty + 3 * rowH + 6);
  }

  // North arrow
  const nax = tx - 22, nay = H - 44;
  ctx.strokeStyle = wc;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(nax, nay - 12);
  ctx.lineTo(nax, nay + 12);
  ctx.moveTo(nax - 4, nay);
  ctx.lineTo(nax + 4, nay);
  ctx.stroke();
  ctx.fillStyle = wc;
  ctx.font = "bold 7px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("N", nax, nay - 15);

  // Scale bar
  ctx.strokeStyle = wl;
  ctx.lineWidth = 0.5;
  const sbx = 24, sby = H - 18, sbw = 80, sbh = 4;
  ctx.strokeRect(sbx, sby, sbw, sbh);
  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) {
      ctx.fillStyle = wl;
      ctx.fillRect(sbx + i * (sbw / 4), sby, sbw / 4, sbh);
    }
  }
  ctx.fillStyle = wl;
  ctx.font = "6px Georgia, serif";
  ctx.textAlign = "left";
  ctx.fillText("0  5  10  15m", sbx, sby - 3);

  ctx.restore();
}

// ── Element Centering ────────────────────────────────────────────

function computeBoundingBox(
  elements: SketchElement[]
): { minX: number; minY: number; maxX: number; maxY: number } | null {
  if (!elements || elements.length === 0) return null;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  for (const el of elements) {
    if ("x1" in el && "x2" in el && "y1" in el && "y2" in el) {
      const x1 = el.x1 as number, y1 = el.y1 as number;
      const x2 = el.x2 as number, y2 = el.y2 as number;
      minX = Math.min(minX, x1, x2);
      minY = Math.min(minY, y1, y2);
      maxX = Math.max(maxX, x1, x2);
      maxY = Math.max(maxY, y1, y2);
    } else if ("x" in el && "w" in el && "h" in el) {
      const x = el.x as number, y = (el as { y: number }).y;
      const w = el.w as number, h = el.h as number;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + w);
      maxY = Math.max(maxY, y + h);
    } else if ("cx" in el && "r" in el) {
      const cx = el.cx as number, cy = (el as { cy: number }).cy;
      const r = el.r as number;
      minX = Math.min(minX, cx - r);
      minY = Math.min(minY, cy - r);
      maxX = Math.max(maxX, cx + r);
      maxY = Math.max(maxY, cy + r);
    } else if ("points" in el && Array.isArray((el as unknown as { points: unknown }).points)) {
      const pts = (el as unknown as { points: { x: number; y: number }[] }).points;
      for (const p of pts) {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
      }
    } else if ("x" in el && "y" in el) {
      const x = el.x as number, y = (el as { y: number }).y;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y - 20);
      maxX = Math.max(maxX, x + 80);
      maxY = Math.max(maxY, y);
    }
  }

  if (!isFinite(minX)) return null;
  return { minX, minY, maxX, maxY };
}

/**
 * Compute the centering transform that maps element-space coords to canvas-space coords.
 * Returns { tx, ty, scale } where the transform is: canvasX = elementX * scale + tx
 * Exported so Canvas.tsx can use the same transform for hit-testing and selection rendering.
 */
export function computeCenterTransform(
  elements: SketchElement[],
  w: number, h: number,
  pad: number = 32
): { tx: number; ty: number; scale: number } {
  const bbox = computeBoundingBox(elements);
  if (!bbox) return { tx: 0, ty: 0, scale: 1 };

  const contentW = bbox.maxX - bbox.minX;
  const contentH = bbox.maxY - bbox.minY;
  if (contentW <= 0 || contentH <= 0) return { tx: 0, ty: 0, scale: 1 };

  const availW = w - pad * 2;
  const availH = h - pad * 2;
  const scale = Math.min(1, availW / contentW, availH / contentH);

  const cx = (bbox.minX + bbox.maxX) / 2;
  const cy = (bbox.minY + bbox.maxY) / 2;
  const tx = w / 2 - cx * scale;
  const ty = h / 2 - cy * scale;

  return { tx, ty, scale };
}

/** Centers and scales elements to fit within paper, capped at scale=1 */
function centerElements(
  ctx: CanvasRenderingContext2D,
  elements: SketchElement[],
  w: number, h: number,
  pad: number = 32
): void {
  const { tx, ty, scale } = computeCenterTransform(elements, w, h, pad);
  ctx.translate(tx, ty);
  if (scale < 1) ctx.scale(scale, scale);
}

// ── Element Center for Rotation ──────────────────────────────────

function getElementCenter(el: SketchElement): { x: number; y: number } {
  if ("x1" in el && "x2" in el && "y1" in el && "y2" in el) {
    return { x: ((el.x1 as number) + (el.x2 as number)) / 2, y: ((el.y1 as number) + (el.y2 as number)) / 2 };
  }
  if ("cx" in el && "cy" in el) {
    return { x: el.cx as number, y: el.cy as number };
  }
  if ("x" in el && "y" in el && "w" in el && "h" in el) {
    return { x: (el.x as number) + (el.w as number) / 2, y: (el as { y: number }).y + (el.h as number) / 2 };
  }
  if ("points" in el && Array.isArray((el as unknown as { points: unknown }).points)) {
    const pts = (el as unknown as { points: { x: number; y: number }[] }).points;
    if (pts.length > 0) {
      let sx = 0, sy = 0;
      for (const p of pts) { sx += p.x; sy += p.y; }
      return { x: sx / pts.length, y: sy / pts.length };
    }
  }
  if ("x" in el && "y" in el) {
    return { x: el.x as number, y: (el as { y: number }).y };
  }
  return { x: 0, y: 0 };
}

// ── Render Element ───────────────────────────────────────────────

function renderElement(
  ctx: CanvasRenderingContext2D,
  el: SketchElement,
  idx: number,
  sketch: SketchData
): void {
  const opts = getWobbleOpts(sketch, el, idx);
  const rng = mkRng(idx * 997 + 42);
  const color = resolveColor(el, sketch);
  const tool = sketch.tool;
  const paper = sketch.paper;
  const h = sketch.humanness;

  ctx.save();

  // Apply element rotation if specified
  if (el.rotation) {
    const center = getElementCenter(el);
    ctx.translate(center.x, center.y);
    ctx.rotate((el.rotation * Math.PI) / 180);
    ctx.translate(-center.x, -center.y);
  }

  switch (el.type) {
    case "line": {
      if (el.wallWidth && el.wallWidth > 0) {
        // ── Wall rendering: two parallel wobble lines with filled interior ──
        const { x1, y1, x2, y2, wallWidth } = el;
        const hw = wallWidth / 2;
        // Perpendicular unit vector
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > 0.001) {
          const nx = -dy / len; // perpendicular x
          const ny = dx / len;  // perpendicular y

          // Offset endpoints for both parallel lines
          const ax1 = x1 + nx * hw, ay1 = y1 + ny * hw;
          const ax2 = x2 + nx * hw, ay2 = y2 + ny * hw;
          const bx1 = x1 - nx * hw, by1 = y1 - ny * hw;
          const bx2 = x2 - nx * hw, by2 = y2 - ny * hw;

          // Fill the wall interior
          const fillC = el.fillColor && el.fillColor !== "none"
            ? (sketch.paper === "blueprint" ? (BLUEPRINT_COLOR_MAP[el.fillColor] ?? el.fillColor) : el.fillColor)
            : (sketch.paper === "blueprint" ? "rgba(26,58,107,0.95)" : PAPER_COLORS[sketch.paper] ?? "#f5f0e8");
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(ax1, ay1);
          ctx.lineTo(ax2, ay2);
          ctx.lineTo(bx2, by2);
          ctx.lineTo(bx1, by1);
          ctx.closePath();
          ctx.fillStyle = fillC;
          ctx.fill();
          ctx.restore();

          // Draw the two parallel wobble lines
          HL(ctx, ax1, ay1, ax2, ay2, { ...opts, seed: opts.seed! + 0 }, color, tool, paper, rng, h);
          HL(ctx, bx1, by1, bx2, by2, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
        } else {
          // Degenerate line — fallback
          HL(ctx, el.x1, el.y1, el.x2, el.y2, opts, color, tool, paper, rng, h);
        }
      } else {
        HL(ctx, el.x1, el.y1, el.x2, el.y2, opts, color, tool, paper, rng, h);
      }
      break;
    }

    case "rect": {
      const { x, y, w, h: rh } = el;
      const a = opts.amplitude;
      // Fill rect before stroking
      if (el.fillColor && el.fillColor !== "none") {
        const fillC = sketch.paper === "blueprint"
          ? (BLUEPRINT_COLOR_MAP[el.fillColor] ?? el.fillColor)
          : el.fillColor;
        ctx.fillStyle = fillC;
        ctx.fillRect(x, y, w, rh);
      }
      // Corner offsets for hand-drawn feel
      const co = () => (rng() - 0.5) * a * 0.3;
      HL(ctx, x + co(), y + co(), x + w + co(), y + co(), { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
      HL(ctx, x + w + co(), y + co(), x + w + co(), y + rh + co(), { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
      HL(ctx, x + w + co(), y + rh + co(), x + co(), y + rh + co(), { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
      HL(ctx, x + co(), y + rh + co(), x + co(), y + co(), { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);
      // Technical/blueprint mode: draw an inset rect to simulate thick double-line walls
      if (sketch.renderStyle === "technical" || sketch.renderStyle === "blueprint") {
        const wallThickness = Math.max(3, (el.strokeWidth ?? 1) * 1.5);
        const ix = x + wallThickness;
        const iy = y + wallThickness;
        const iw = w - wallThickness * 2;
        const irh = rh - wallThickness * 2;
        if (iw > 2 && irh > 2) {
          const ico = () => (rng() - 0.5) * a * 0.1;
          HL(ctx, ix + ico(), iy + ico(), ix + iw + ico(), iy + ico(), { ...opts, seed: opts.seed! + 11 }, color, tool, paper, rng, h);
          HL(ctx, ix + iw + ico(), iy + ico(), ix + iw + ico(), iy + irh + ico(), { ...opts, seed: opts.seed! + 12 }, color, tool, paper, rng, h);
          HL(ctx, ix + iw + ico(), iy + irh + ico(), ix + ico(), iy + irh + ico(), { ...opts, seed: opts.seed! + 13 }, color, tool, paper, rng, h);
          HL(ctx, ix + ico(), iy + irh + ico(), ix + ico(), iy + ico(), { ...opts, seed: opts.seed! + 14 }, color, tool, paper, rng, h);
        }
      }
      // Render label if present
      if (el.label) {
        renderElement(ctx, {
          type: "text",
          x: x + 5,
          y: y + rh / 2 + 4,
          content: el.label,
          size: 9,
          color: resolveColor(el, sketch, true),
        }, idx + 500, sketch);
      }
      break;
    }

    case "circle": {
      const { cx, cy, r } = el;
      // Fill circle before stroking
      if (el.fillColor && el.fillColor !== "none") {
        const fillC = sketch.paper === "blueprint"
          ? (BLUEPRINT_COLOR_MAP[el.fillColor] ?? el.fillColor)
          : el.fillColor;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = fillC;
        ctx.fill();
      }
      const n = Math.max(20, Math.floor(r * 1.8));
      const pts: Pt[] = [];
      for (let i = 0; i <= n; i++) {
        const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
        const rr = r + (rng() - 0.5) * opts.amplitude * 0.7;
        pts.push([cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr]);
      }
      doStroke(ctx, pts, color, tool as any, paper, rng, h);
      break;
    }

    case "arc": {
      const acx = el.cx ?? el.x ?? 0;
      const acy = el.cy ?? el.y ?? 0;
      const startAngle = (el.startAngle ?? 0) * Math.PI / 180;
      const endAngle = el.sweep != null
        ? startAngle + el.sweep * Math.PI / 180
        : (el.endAngle ?? 90) * Math.PI / 180;
      const pts: Pt[] = [];
      for (let i = 0; i <= 15; i++) {
        const t = i / 15;
        const angle = startAngle + t * (endAngle - startAngle);
        pts.push([acx + Math.cos(angle) * el.r, acy + Math.sin(angle) * el.r]);
      }
      doStroke(ctx, pts, color, tool as any, paper, rng, h);
      break;
    }

    case "arrow": {
      HL(ctx, el.x1, el.y1, el.x2, el.y2, opts, color, tool, paper, rng, h);
      // Arrowhead
      const angle = Math.atan2(el.y2 - el.y1, el.x2 - el.x1);
      const s = 9, sp = 0.42;
      HL(ctx, el.x2, el.y2,
        el.x2 - s * Math.cos(angle - sp), el.y2 - s * Math.sin(angle - sp),
        { ...opts, seed: opts.seed! + 10 }, color, tool, paper, rng, h);
      HL(ctx, el.x2, el.y2,
        el.x2 - s * Math.cos(angle + sp), el.y2 - s * Math.sin(angle + sp),
        { ...opts, seed: opts.seed! + 11 }, color, tool, paper, rng, h);
      break;
    }

    case "text": {
      const { x, y } = el;
      const content = el.content || el.text || "";
      const size = el.size || el.fontSize || 11;
      const lineHeightMultiplier = el.lineHeight ?? 1.4;
      const lineSpacing = size * lineHeightMultiplier;
      const maxWidth = el.maxWidth && el.maxWidth > 0 ? el.maxWidth : 0;
      const tc = resolveColor(el, sketch, true);
      if (sketch.paper === "blueprint") {
        // Override text color on blueprint
        ctx.fillStyle = "#e0f0ff";
      } else {
        ctx.fillStyle = tc;
      }
      // Per-element fontFamily overrides sketch-level textFont, which overrides default
      const textFontCss = resolveFontCss(
        (el.fontFamily as SkissifyFont | undefined) ?? sketch.textFont,
        "'Courier New', monospace"
      );
      ctx.font = `${size}px ${textFontCss}`;

      // Build lines: split on \n first, then word-wrap each segment if maxWidth is set
      const rawLines = content.split("\n");
      const lines: string[] = [];
      for (const rawLine of rawLines) {
        if (!maxWidth) {
          lines.push(rawLine);
        } else {
          // Word-wrap within maxWidth
          const words = rawLine.split(" ");
          let currentLine = "";
          for (const word of words) {
            const testLine = currentLine ? currentLine + " " + word : word;
            const testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth && currentLine) {
              lines.push(currentLine);
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          }
          if (currentLine) lines.push(currentLine);
        }
      }

      // Render each line with character-by-character jitter
      for (let li = 0; li < lines.length; li++) {
        const lineText = lines[li];
        const lineY = y + li * lineSpacing;
        let cx2 = x;
        for (let i = 0; i < lineText.length; i++) {
          const cw = ctx.measureText(lineText[i]).width;
          const jy = (rng() - 0.5) * opts.amplitude * 0.4;
          const rot = (rng() - 0.5) * opts.amplitude * 0.01;
          ctx.save();
          ctx.globalAlpha = 0.88 + rng() * 0.12;
          ctx.translate(cx2, lineY + jy);
          ctx.rotate(rot);
          ctx.fillText(lineText[i], 0, 0);
          ctx.restore();
          cx2 += cw;
        }
      }
      break;
    }

    case "dashed": {
      ctx.setLineDash([6, 4]);
      HL(ctx, el.x1, el.y1, el.x2, el.y2, opts, color, tool, paper, rng, h);
      ctx.setLineDash([]);
      break;
    }

    case "dim": {
      const { x1, y1, x2, y2, label, offset: dimOffset = 0 } = el;
      // Perpendicular direction
      const dist = Math.hypot(x2 - x1, y2 - y1);
      const px = -(y2 - y1) / dist;
      const py = (x2 - x1) / dist;

      // If offset, draw extension lines (dashed)
      let dx1 = x1, dy1 = y1, dx2 = x2, dy2 = y2;
      if (dimOffset !== 0) {
        dx1 = x1 + px * dimOffset;
        dy1 = y1 + py * dimOffset;
        dx2 = x2 + px * dimOffset;
        dy2 = y2 + py * dimOffset;
        ctx.setLineDash([3, 3]);
        HL(ctx, x1, y1, dx1, dy1, { ...opts, seed: opts.seed! + 20 }, color, tool, paper, rng, h);
        HL(ctx, x2, y2, dx2, dy2, { ...opts, seed: opts.seed! + 21 }, color, tool, paper, rng, h);
        ctx.setLineDash([]);
      }

      // Main dimension line (thinner wobble)
      HL(ctx, dx1, dy1, dx2, dy2, { ...opts, amplitude: opts.amplitude * 0.3, waves: opts.waves * 0.5 }, color, tool, paper, rng, h);

      // Tick marks at both ends
      const tn = 5;
      HL(ctx, dx1 + px * tn, dy1 + py * tn, dx1 - px * tn, dy1 - py * tn,
        { ...opts, seed: opts.seed! + 30 }, color, tool, paper, rng, h);
      HL(ctx, dx2 + px * tn, dy2 + py * tn, dx2 - px * tn, dy2 - py * tn,
        { ...opts, seed: opts.seed! + 31 }, color, tool, paper, rng, h);

      // Label
      const midX = (dx1 + dx2) / 2;
      const midY = (dy1 + dy2) / 2;
      const isVertical = Math.abs(x2 - x1) < Math.abs(y2 - y1);
      // Use el.fontFamily (per-element override) or sketch.dimFont; pass as fontFamily on text el
      const dimFontKey = (el.fontFamily as SkissifyFont | undefined) ?? sketch.dimFont;
      const labelFontCss = resolveFontCss(dimFontKey, "'Courier New', monospace");
      const labelSize = 9;

      if (isVertical) {
        // For vertical dim lines, rotate the label 90° CCW so it runs along the line.
        // Place it offset perpendicular to the line (i.e., to the left/right depending on px).
        // px points perpendicular to the line; for a purely vertical line x1=x2, px = -(y2-y1)/dist.
        // We draw centered on the midpoint, offset px * 16 outward.
        const labelColor = sketch.paper === "blueprint" ? "#e0f0ff" : color;
        ctx.save();
        ctx.translate(midX + px * 16, midY);
        ctx.rotate(-Math.PI / 2);
        // Light jitter for hand-drawn feel
        const jy = (rng() - 0.5) * opts.amplitude * 0.4;
        const rot2 = (rng() - 0.5) * opts.amplitude * 0.008;
        ctx.rotate(rot2);
        ctx.font = `${labelSize}px ${labelFontCss}`;
        ctx.fillStyle = labelColor;
        ctx.globalAlpha = 0.88 + rng() * 0.12;
        ctx.textAlign = "center";
        ctx.fillText(label, 0, jy + labelSize * 0.35);
        ctx.textAlign = "left"; // reset
        ctx.restore();
      } else {
        // Horizontal dim: draw label centered above the line
        // Pre-measure total width so we can center it at midX
        const labelColor = sketch.paper === "blueprint" ? "#e0f0ff" : color;
        ctx.save();
        ctx.font = `${labelSize}px ${labelFontCss}`;
        const totalW = ctx.measureText(label).width;
        const startX = midX - totalW / 2;
        const baseY = midY - 8;
        ctx.fillStyle = labelColor;
        // Character-by-character jitter for hand-drawn feel
        let cx3 = startX;
        for (let i = 0; i < label.length; i++) {
          const cw = ctx.measureText(label[i]).width;
          const jy = (rng() - 0.5) * opts.amplitude * 0.4;
          const rot2 = (rng() - 0.5) * opts.amplitude * 0.01;
          ctx.save();
          ctx.globalAlpha = 0.88 + rng() * 0.12;
          ctx.translate(cx3, baseY + jy);
          ctx.rotate(rot2);
          ctx.fillText(label[i], 0, 0);
          ctx.restore();
          cx3 += cw;
        }
        ctx.restore();
      }
      break;
    }

    case "window": {
      // Support both legacy (x1/y1/x2/y2) and POC (x/y/w/d/wall) format
      let wx: number, wy: number, ww: number, wd: number, wall: "h" | "v";
      if (el.x1 != null && el.y1 != null && el.x2 != null && el.y2 != null) {
        // Legacy format — infer wall direction and dimensions
        wx = Math.min(el.x1, el.x2);
        wy = Math.min(el.y1, el.y2);
        if (Math.abs(el.x2 - el.x1) >= Math.abs(el.y2 - el.y1)) {
          wall = "h";
          ww = Math.abs(el.x2 - el.x1);
          wd = 8;
        } else {
          wall = "v";
          ww = Math.abs(el.y2 - el.y1);
          wd = 8;
          wx = el.x1;
          wy = Math.min(el.y1, el.y2);
        }
      } else {
        wx = el.x ?? 0;
        wy = el.y ?? 0;
        ww = el.w ?? 60;
        wd = el.d ?? 8;
        wall = el.wall ?? "h";
      }

      if (wall === "h") {
        // Two parallel horizontal lines (top/bottom)
        HL(ctx, wx, wy, wx + ww, wy, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
        HL(ctx, wx, wy + wd, wx + ww, wy + wd, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
        // End caps
        HL(ctx, wx, wy, wx, wy + wd, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
        HL(ctx, wx + ww, wy, wx + ww, wy + wd, { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);
        // Inner glass lines
        HL(ctx, wx, wy + wd * 0.35, wx + ww, wy + wd * 0.35, { ...opts, seed: opts.seed! + 5 }, color, tool, paper, rng, h);
        HL(ctx, wx, wy + wd * 0.65, wx + ww, wy + wd * 0.65, { ...opts, seed: opts.seed! + 6 }, color, tool, paper, rng, h);
      } else {
        // Vertical window
        HL(ctx, wx, wy, wx, wy + ww, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
        HL(ctx, wx + wd, wy, wx + wd, wy + ww, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
        HL(ctx, wx, wy, wx + wd, wy, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
        HL(ctx, wx, wy + ww, wx + wd, wy + ww, { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);
        HL(ctx, wx + wd * 0.35, wy, wx + wd * 0.35, wy + ww, { ...opts, seed: opts.seed! + 5 }, color, tool, paper, rng, h);
        HL(ctx, wx + wd * 0.65, wy, wx + wd * 0.65, wy + ww, { ...opts, seed: opts.seed! + 6 }, color, tool, paper, rng, h);
      }
      break;
    }

    case "door-symbol": {
      const dw = el.w || 36;
      const swing = el.swing || "right";
      const dwall = el.wall || "h";

      if (dwall === "h") {
        // Horizontal wall line
        HL(ctx, el.x, el.y, el.x + dw, el.y, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
        const arcPts: Pt[] = [];
        if (swing === "right") {
          // POC: angle = -(i/10)*PI/2, point at [x+w+cos(a)*w, y+sin(a)*w]
          for (let i = 0; i <= 10; i++) {
            const a = -(i / 10) * Math.PI / 2;
            arcPts.push([el.x + dw + Math.cos(a) * dw, el.y + Math.sin(a) * dw]);
          }
        } else {
          // POC: angle = PI+(i/10)*PI/2, point at [x+cos(a)*w, y+sin(a)*w]
          for (let i = 0; i <= 10; i++) {
            const a = Math.PI + (i / 10) * Math.PI / 2;
            arcPts.push([el.x + Math.cos(a) * dw, el.y + Math.sin(a) * dw]);
          }
        }
        doStroke(ctx, arcPts, color, tool as any, paper, rng, h);
      } else {
        // Vertical wall line
        HL(ctx, el.x, el.y, el.x, el.y + dw, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
        // POC: angle = -(i/10)*PI/2+PI/2, point at [x+sin(a)*w, y+w+cos(a)*w]
        const arcPts: Pt[] = [];
        for (let i = 0; i <= 10; i++) {
          const a = -(i / 10) * Math.PI / 2 + Math.PI / 2;
          arcPts.push([el.x + Math.sin(a) * dw, el.y + dw + Math.cos(a) * dw]);
        }
        doStroke(ctx, arcPts, color, tool as any, paper, rng, h);
      }
      break;
    }

    case "door-slide": {
      const dsw = el.w || 60;
      const dsd = el.d || 8;
      const dsWall = el.wall || "h";
      const p1 = dsw * 0.55;

      if (dsWall === "h") {
        // Track lines (top/bottom full width)
        HL(ctx, el.x, el.y, el.x + dsw, el.y, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
        HL(ctx, el.x, el.y + dsd, el.x + dsw, el.y + dsd, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
        // Left panel (full rect outline)
        HL(ctx, el.x, el.y, el.x + p1, el.y, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
        HL(ctx, el.x, el.y + dsd, el.x + p1, el.y + dsd, { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);
        HL(ctx, el.x, el.y, el.x, el.y + dsd, { ...opts, seed: opts.seed! + 5 }, color, tool, paper, rng, h);
        HL(ctx, el.x + p1, el.y, el.x + p1, el.y + dsd, { ...opts, seed: opts.seed! + 6 }, color, tool, paper, rng, h);
        // Right panel (inset rect)
        HL(ctx, el.x + dsw - p1, el.y + 1, el.x + dsw, el.y + 1, { ...opts, seed: opts.seed! + 7 }, color, tool, paper, rng, h);
        HL(ctx, el.x + dsw - p1, el.y + dsd - 1, el.x + dsw, el.y + dsd - 1, { ...opts, seed: opts.seed! + 8 }, color, tool, paper, rng, h);
        HL(ctx, el.x + dsw - p1, el.y + 1, el.x + dsw - p1, el.y + dsd - 1, { ...opts, seed: opts.seed! + 9 }, color, tool, paper, rng, h);
        HL(ctx, el.x + dsw, el.y + 1, el.x + dsw, el.y + dsd - 1, { ...opts, seed: opts.seed! + 10 }, color, tool, paper, rng, h);
      } else {
        // Track lines (left/right full height)
        HL(ctx, el.x, el.y, el.x, el.y + dsw, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
        HL(ctx, el.x + dsd, el.y, el.x + dsd, el.y + dsw, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
        // Top panel
        HL(ctx, el.x, el.y, el.x + dsd, el.y, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
        HL(ctx, el.x, el.y + p1, el.x + dsd, el.y + p1, { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);
        // Bottom panel (inset)
        HL(ctx, el.x + 1, el.y + dsw - p1, el.x + dsd - 1, el.y + dsw - p1, { ...opts, seed: opts.seed! + 5 }, color, tool, paper, rng, h);
        HL(ctx, el.x + 1, el.y + dsw, el.x + dsd - 1, el.y + dsw, { ...opts, seed: opts.seed! + 6 }, color, tool, paper, rng, h);
      }
      break;
    }

    case "stair": {
      const stairSteps = el.steps || 8;
      const sh = el.h / stairSteps;
      const dir = el.dir || "up";

      // Side walls
      HL(ctx, el.x, el.y, el.x, el.y + el.h, { ...opts, seed: opts.seed! + 100 }, color, tool, paper, rng, h);
      HL(ctx, el.x + el.w, el.y, el.x + el.w, el.y + el.h, { ...opts, seed: opts.seed! + 101 }, color, tool, paper, rng, h);

      // Treads
      for (let i = 0; i <= stairSteps; i++) {
        const sy = el.y + sh * i;
        HL(ctx, el.x, sy, el.x + el.w, sy, { ...opts, seed: opts.seed! + i }, color, tool, paper, rng, h);
      }

      // Direction arrow
      const acx = el.x + el.w / 2;
      const acy1 = dir === "up" ? el.y + el.h * 0.7 : el.y + el.h * 0.3;
      const acy2 = dir === "up" ? el.y + el.h * 0.3 : el.y + el.h * 0.7;
      HL(ctx, acx, acy1, acx, acy2, { ...opts, seed: opts.seed! + 200 }, color, tool, paper, rng, h);
      // Small arrowhead
      const aAngle = Math.atan2(acy2 - acy1, 0);
      const as = 4;
      HL(ctx, acx, acy2, acx - as, acy2 - (dir === "up" ? -as : as),
        { ...opts, seed: opts.seed! + 201 }, color, tool, paper, rng, h);
      HL(ctx, acx, acy2, acx + as, acy2 - (dir === "up" ? -as : as),
        { ...opts, seed: opts.seed! + 202 }, color, tool, paper, rng, h);
      break;
    }

    case "opening": {
      // Support both formats
      let ox: number, oy: number, ow: number, owall: "h" | "v";
      if (el.x1 != null && el.y1 != null && el.x2 != null && el.y2 != null) {
        // Legacy: x1/y1/x2/y2
        if (Math.abs(el.x2 - el.x1) >= Math.abs(el.y2 - el.y1)) {
          owall = "h";
          ox = Math.min(el.x1, el.x2);
          oy = el.y1;
          ow = Math.abs(el.x2 - el.x1);
        } else {
          owall = "v";
          ox = el.x1;
          oy = Math.min(el.y1, el.y2);
          ow = Math.abs(el.y2 - el.y1);
        }
      } else {
        ox = el.x ?? 0;
        oy = el.y ?? 0;
        ow = el.w ?? 60;
        owall = el.wall ?? "h";
      }

      // Dashed opening line
      ctx.setLineDash([3, 3]);
      if (owall === "h") {
        HL(ctx, ox, oy, ox + ow, oy, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
      } else {
        HL(ctx, ox, oy, ox, oy + ow, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
      }
      ctx.setLineDash([]);

      // Tick marks at ends
      const tk = 4;
      if (owall === "h") {
        HL(ctx, ox, oy - tk, ox, oy + tk, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
        HL(ctx, ox + ow, oy - tk, ox + ow, oy + tk, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
      } else {
        HL(ctx, ox - tk, oy, ox + tk, oy, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
        HL(ctx, ox - tk, oy + ow, ox + tk, oy + ow, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
      }
      break;
    }

    case "column": {
      const ccx = el.cx ?? el.x ?? 0;
      const ccy = el.cy ?? el.y ?? 0;
      const cs = el.s ?? el.size ?? 12;
      const half = cs / 2;
      // Square outline
      HL(ctx, ccx - half, ccy - half, ccx + half, ccy - half, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
      HL(ctx, ccx + half, ccy - half, ccx + half, ccy + half, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
      HL(ctx, ccx + half, ccy + half, ccx - half, ccy + half, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
      HL(ctx, ccx - half, ccy + half, ccx - half, ccy - half, { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);
      // X diagonal cross
      HL(ctx, ccx - half, ccy - half, ccx + half, ccy + half, { ...opts, seed: opts.seed! + 5 }, color, tool, paper, rng, h);
      HL(ctx, ccx + half, ccy - half, ccx - half, ccy + half, { ...opts, seed: opts.seed! + 6 }, color, tool, paper, rng, h);
      break;
    }

    case "path": {
      if (el.points && el.points.length >= 2) {
        // Render as a single seamless stroke using wobblePath for smooth joints
        const pathRng = mkRng(opts.seed ?? 42);
        const pts = wobblePath(el.points, opts.amplitude, opts.waves, pathRng, opts.humanness ?? 0);
        doStroke(ctx, pts, color, tool as ToolType, paper, rng, h);
      }
      break;
    }

    // ── Furniture & Fixtures ───────────────────────────────────

    case "bed": {
      const { x, y, w, h: bh } = el;
      const pillows = el.pillows ?? 2;
      const headH = bh * 0.22; // headboard area height

      // Outer frame
      HL(ctx, x, y, x + w, y, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
      HL(ctx, x + w, y, x + w, y + bh, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
      HL(ctx, x + w, y + bh, x, y + bh, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
      HL(ctx, x, y + bh, x, y, { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);

      // Headboard divider line
      HL(ctx, x, y + headH, x + w, y + headH, { ...opts, seed: opts.seed! + 5, amplitude: opts.amplitude * 0.4 }, color, tool, paper, rng, h);

      // Pillows (circles near headboard)
      const pilR = Math.min(w * 0.16, headH * 0.32);
      const pilY = y + headH * 0.5;
      if (pillows === 1) {
        const ppts: Pt[] = [];
        const pn = 16;
        const pcx = x + w / 2;
        for (let i = 0; i <= pn; i++) {
          const a = (i / pn) * Math.PI * 2;
          ppts.push([pcx + Math.cos(a) * pilR * 1.3 + (rng() - 0.5) * opts.amplitude * 0.3,
                     pilY + Math.sin(a) * pilR + (rng() - 0.5) * opts.amplitude * 0.3]);
        }
        doStroke(ctx, ppts, color, tool as any, paper, rng, h);
      } else {
        for (let pi = 0; pi < 2; pi++) {
          const pcx = x + w * (pi === 0 ? 0.27 : 0.73);
          const ppts: Pt[] = [];
          const pn = 14;
          for (let i = 0; i <= pn; i++) {
            const a = (i / pn) * Math.PI * 2;
            ppts.push([pcx + Math.cos(a) * pilR * 1.1 + (rng() - 0.5) * opts.amplitude * 0.3,
                       pilY + Math.sin(a) * pilR + (rng() - 0.5) * opts.amplitude * 0.3]);
          }
          doStroke(ctx, ppts, color, tool as any, paper, rng, h);
        }
      }

      // Cover fold line (light)
      const foldY = y + headH + bh * 0.15;
      HL(ctx, x + w * 0.05, foldY, x + w * 0.95, foldY, { ...opts, seed: opts.seed! + 10, amplitude: opts.amplitude * 0.3 }, color, tool, paper, rng, h);
      break;
    }

    case "sofa": {
      const { x, y, w, h: sh } = el;
      const armW = Math.min(w * 0.12, 12);
      const backH = sh * 0.3;

      // Outer frame (back + sides + front)
      HL(ctx, x, y, x + w, y, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
      HL(ctx, x + w, y, x + w, y + sh, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
      HL(ctx, x + w, y + sh, x, y + sh, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
      HL(ctx, x, y + sh, x, y, { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);

      // Back cushion line
      HL(ctx, x, y + backH, x + w, y + backH, { ...opts, seed: opts.seed! + 5, amplitude: opts.amplitude * 0.4 }, color, tool, paper, rng, h);

      // Armrest dividers
      HL(ctx, x + armW, y, x + armW, y + sh, { ...opts, seed: opts.seed! + 6, amplitude: opts.amplitude * 0.35 }, color, tool, paper, rng, h);
      HL(ctx, x + w - armW, y, x + w - armW, y + sh, { ...opts, seed: opts.seed! + 7, amplitude: opts.amplitude * 0.35 }, color, tool, paper, rng, h);

      // Seat cushion divider (middle)
      const midX = x + w / 2;
      HL(ctx, midX, y + backH, midX, y + sh, { ...opts, seed: opts.seed! + 8, amplitude: opts.amplitude * 0.3 }, color, tool, paper, rng, h);
      break;
    }

    case "dining-table": {
      const { x, y, w, h: dh } = el;
      const seats = el.seats ?? 2;
      const chairW = Math.min(w / (seats + 0.5), 28);
      const chairH = Math.min(dh * 0.4, 20);
      const chairGap = 4;

      // Table rectangle
      HL(ctx, x, y, x + w, y, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
      HL(ctx, x + w, y, x + w, y + dh, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
      HL(ctx, x + w, y + dh, x, y + dh, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
      HL(ctx, x, y + dh, x, y, { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);

      // Chairs on top and bottom (oval approximation via points)
      const totalW = seats * (chairW + 4) - 4;
      const startX = x + (w - totalW) / 2;
      for (let s = 0; s < seats; s++) {
        const cx2 = startX + s * (chairW + 4) + chairW / 2;
        // Top chairs
        const ty = y - chairGap - chairH / 2;
        const bpts: Pt[] = [];
        const bpn = 12;
        for (let i = 0; i <= bpn; i++) {
          const a = (i / bpn) * Math.PI * 2;
          bpts.push([cx2 + Math.cos(a) * chairW / 2 + (rng() - 0.5) * opts.amplitude * 0.4,
                     ty + Math.sin(a) * chairH / 2 + (rng() - 0.5) * opts.amplitude * 0.4]);
        }
        doStroke(ctx, bpts, color, tool as any, paper, rng, h);

        // Bottom chairs
        const ty2 = y + dh + chairGap + chairH / 2;
        const bpts2: Pt[] = [];
        for (let i = 0; i <= bpn; i++) {
          const a = (i / bpn) * Math.PI * 2;
          bpts2.push([cx2 + Math.cos(a) * chairW / 2 + (rng() - 0.5) * opts.amplitude * 0.4,
                      ty2 + Math.sin(a) * chairH / 2 + (rng() - 0.5) * opts.amplitude * 0.4]);
        }
        doStroke(ctx, bpts2, color, tool as any, paper, rng, h);
      }

      // End chairs (1 each side)
      const cy2 = y + dh / 2;
      const ecW = chairH;
      const ecH = Math.min(chairW * 0.7, dh * 0.45);
      for (let side = 0; side < 2; side++) {
        const ecX = side === 0 ? x - chairGap - ecW / 2 : x + w + chairGap + ecW / 2;
        const ecpts: Pt[] = [];
        for (let i = 0; i <= 12; i++) {
          const a = (i / 12) * Math.PI * 2;
          ecpts.push([ecX + Math.cos(a) * ecW / 2 + (rng() - 0.5) * opts.amplitude * 0.4,
                      cy2 + Math.sin(a) * ecH / 2 + (rng() - 0.5) * opts.amplitude * 0.4]);
        }
        doStroke(ctx, ecpts, color, tool as any, paper, rng, h);
      }
      break;
    }

    case "toilet": {
      const { x, y, w, h: th } = el;
      const tankH = th * 0.3;
      const tankW = w * 0.85;
      const tankX = x + (w - tankW) / 2;

      // Tank (rectangle)
      HL(ctx, tankX, y, tankX + tankW, y, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
      HL(ctx, tankX + tankW, y, tankX + tankW, y + tankH, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
      HL(ctx, tankX + tankW, y + tankH, tankX, y + tankH, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
      HL(ctx, tankX, y + tankH, tankX, y, { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);

      // Bowl (ellipse)
      const bowlCX = x + w / 2;
      const bowlCY = y + tankH + (th - tankH) * 0.5;
      const bowlRX = w * 0.46;
      const bowlRY = (th - tankH) * 0.44;
      const bpts: Pt[] = [];
      const bn = 24;
      for (let i = 0; i <= bn; i++) {
        const a = (i / bn) * Math.PI * 2;
        bpts.push([bowlCX + Math.cos(a) * bowlRX + (rng() - 0.5) * opts.amplitude * 0.4,
                   bowlCY + Math.sin(a) * bowlRY + (rng() - 0.5) * opts.amplitude * 0.4]);
      }
      doStroke(ctx, bpts, color, tool as any, paper, rng, h);

      // Inner bowl ring (seat)
      const sRX = bowlRX * 0.72;
      const sRY = bowlRY * 0.72;
      const spts: Pt[] = [];
      for (let i = 0; i <= bn; i++) {
        const a = (i / bn) * Math.PI * 2;
        spts.push([bowlCX + Math.cos(a) * sRX + (rng() - 0.5) * opts.amplitude * 0.3,
                   bowlCY + Math.sin(a) * sRY + (rng() - 0.5) * opts.amplitude * 0.3]);
      }
      doStroke(ctx, spts, color, tool as any, paper, rng, h);
      break;
    }

    case "bathtub": {
      const { x, y, w, h: bth } = el;
      const wallT = Math.min(w * 0.06, 6);
      // Outer frame
      HL(ctx, x, y, x + w, y, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
      HL(ctx, x + w, y, x + w, y + bth, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
      HL(ctx, x + w, y + bth, x, y + bth, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
      HL(ctx, x, y + bth, x, y, { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);

      // Inner oval (bathing basin)
      const icx = x + w / 2;
      const icy = y + bth * 0.52;
      const irx = w / 2 - wallT - 2;
      const iry = bth * 0.5 - wallT - 2;
      const ipts: Pt[] = [];
      const inn = 28;
      for (let i = 0; i <= inn; i++) {
        const a = (i / inn) * Math.PI * 2;
        ipts.push([icx + Math.cos(a) * irx + (rng() - 0.5) * opts.amplitude * 0.4,
                   icy + Math.sin(a) * iry + (rng() - 0.5) * opts.amplitude * 0.4]);
      }
      doStroke(ctx, ipts, color, tool as any, paper, rng, h);

      // Faucet end indicator (small lines at top center)
      const ftapY = y + wallT + 4;
      const ftapX = x + w / 2;
      HL(ctx, ftapX - 6, ftapY, ftapX + 6, ftapY, { ...opts, seed: opts.seed! + 10, amplitude: opts.amplitude * 0.3 }, color, tool, paper, rng, h);
      HL(ctx, ftapX, ftapY - 3, ftapX, ftapY + 3, { ...opts, seed: opts.seed! + 11, amplitude: opts.amplitude * 0.3 }, color, tool, paper, rng, h);
      break;
    }

    case "sink": {
      const { x, y, w, h: skh } = el;
      // Outer frame
      HL(ctx, x, y, x + w, y, { ...opts, seed: opts.seed! + 1 }, color, tool, paper, rng, h);
      HL(ctx, x + w, y, x + w, y + skh, { ...opts, seed: opts.seed! + 2 }, color, tool, paper, rng, h);
      HL(ctx, x + w, y + skh, x, y + skh, { ...opts, seed: opts.seed! + 3 }, color, tool, paper, rng, h);
      HL(ctx, x, y + skh, x, y, { ...opts, seed: opts.seed! + 4 }, color, tool, paper, rng, h);

      // Basin oval (inner)
      const scx = x + w / 2;
      const scy = y + skh * 0.56;
      const srx = w * 0.36;
      const sry = skh * 0.33;
      const skpts: Pt[] = [];
      const sn = 20;
      for (let i = 0; i <= sn; i++) {
        const a = (i / sn) * Math.PI * 2;
        skpts.push([scx + Math.cos(a) * srx + (rng() - 0.5) * opts.amplitude * 0.35,
                    scy + Math.sin(a) * sry + (rng() - 0.5) * opts.amplitude * 0.35]);
      }
      doStroke(ctx, skpts, color, tool as any, paper, rng, h);

      // Drain dot
      ctx.beginPath();
      ctx.arc(scx, scy, 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Faucet (T-shape at top edge of basin)
      const ftY = y + skh * 0.15;
      HL(ctx, scx - 7, ftY, scx + 7, ftY, { ...opts, seed: opts.seed! + 10, amplitude: opts.amplitude * 0.3 }, color, tool, paper, rng, h);
      HL(ctx, scx, ftY, scx, ftY + 8, { ...opts, seed: opts.seed! + 11, amplitude: opts.amplitude * 0.3 }, color, tool, paper, rng, h);
      break;
    }
  }

  ctx.restore();
}

// ── Main Render Pipeline ─────────────────────────────────────────

export function renderSketch(
  ctx: CanvasRenderingContext2D,
  sketch: SketchData,
  canvasWidth: number,
  canvasHeight: number
): void {
  const w = sketch.width || canvasWidth;
  const h = sketch.height || canvasHeight;
  const textureRng = mkRng(sketch.sessionSeed || 12345);

  // 1. Paper background
  drawPaperBackground(ctx, w, h, sketch.paper);

  // 2. Paper texture (noise/speckles)
  drawPaperTexture(ctx, w, h, sketch.paper, textureRng);

  // 3. Grid
  drawGrid(ctx, w, h, sketch.paper);

  // 4. Center and scale elements
  ctx.save();
  centerElements(ctx, sketch.elements, w, h);

  // 5. Render all elements (skip hidden)
  sketch.elements.forEach((el, idx) => {
    if (el.visible === false) return;
    renderElement(ctx, el, idx, sketch);
  });

  ctx.restore();

  // 6. Blueprint overlay (drawn on top, not affected by centering)
  if (sketch.paper === "blueprint") {
    ctx.save();
    drawBlueprintOverlay(ctx, w, h, sketch.metadata);
    ctx.restore();
  }
}
