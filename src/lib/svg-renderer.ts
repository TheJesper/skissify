/**
 * SVG renderer — mirrors renderer.ts but outputs an SVG string.
 * Uses the same wobble algorithms to produce identical hand-drawn output.
 */

import {
  SketchData,
  SketchElement,
  BlueprintMetadata,
  PAPER_COLORS,
  TOOL_STYLES,
  BLUEPRINT_COLOR_MAP,
  PaperType,
  FONT_OPTIONS,
  SkissifyFont,
} from "./types";
import {
  wobbleLine,
  wobbleCircle,
  wobbleArc,
  wobblePath,
  WobbleOptions,
  Point,
  mkRng,
} from "./wobble";
import { svgWatermarkSnippet } from "./watermark";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const E = (el: SketchElement): any => el as any;

/** Resolve a SkissifyFont key to a CSS font-family string for SVG */
function resolveFontCssSvg(font: SkissifyFont | string | undefined, fallback: string): string {
  if (!font) return fallback;
  const found = FONT_OPTIONS.find((f) => f.key === font);
  return found ? found.css : fallback;
}

function hashElement(el: SketchElement): number {
  const str = JSON.stringify(el);
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getWobbleOpts(sketch: SketchData, el: SketchElement): WobbleOptions {
  // Apply render style overrides
  let amplitude = sketch.amplitude;
  let humanness = sketch.humanness;
  if (sketch.renderStyle === "napkin") {
    amplitude = Math.max(amplitude, 2.5);
    humanness = Math.max(humanness, 0.6);
  } else if (sketch.renderStyle === "technical") {
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
    seed: hashElement(el) + (sketch.sessionSeed || 0),
  };
}

/** Convert wobble points to an SVG path using quadratic bezier curves (matches drawSmoothCurve). */
function pointsToPath(points: Point[], closed: boolean = false): string {
  if (points.length < 2) return "";

  const parts: string[] = [`M ${points[0].x} ${points[0].y}`];

  if (points.length === 2) {
    parts.push(`L ${points[1].x} ${points[1].y}`);
    return parts.join(" ");
  }

  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    parts.push(`Q ${points[i].x} ${points[i].y} ${midX} ${midY}`);
  }

  if (closed) {
    const last = points[points.length - 1];
    const midX = (last.x + points[0].x) / 2;
    const midY = (last.y + points[0].y) / 2;
    parts.push(`Q ${last.x} ${last.y} ${midX} ${midY}`);
    parts.push("Z");
  } else {
    const last = points[points.length - 1];
    parts.push(`L ${last.x} ${last.y}`);
  }

  return parts.join(" ");
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

interface StrokeStyle {
  stroke: string;
  strokeWidth: number;
  opacity: number;
}

function getStrokeStyle(sketch: SketchData, el: SketchElement, defaultColor: string): StrokeStyle {
  const tool = TOOL_STYLES[sketch.tool];
  const elOpacity = (el as { opacity?: number }).opacity;
  return {
    stroke: el.color || defaultColor,
    strokeWidth: el.strokeWidth || tool.lineWidth,
    opacity: elOpacity != null ? tool.opacity * elOpacity : tool.opacity,
  };
}

function strokeAttrs(style: StrokeStyle): string {
  return `stroke="${style.stroke}" stroke-width="${style.strokeWidth}" opacity="${style.opacity}" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
}

function computeBoundingBox(
  elements: SketchElement[]
): { minX: number; minY: number; maxX: number; maxY: number } | null {
  if (!elements || elements.length === 0) return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  for (const el of elements) {
    const a = el as unknown as Record<string, number>;
    if ("x1" in el && "x2" in el) {
      minX = Math.min(minX, a.x1, a.x2);
      minY = Math.min(minY, a.y1, a.y2);
      maxX = Math.max(maxX, a.x1, a.x2);
      maxY = Math.max(maxY, a.y1, a.y2);
    } else if ("x" in el && "w" in el && "h" in el) {
      minX = Math.min(minX, a.x);
      minY = Math.min(minY, a.y);
      maxX = Math.max(maxX, a.x + a.w);
      maxY = Math.max(maxY, a.y + a.h);
    } else if ("cx" in el && "r" in el) {
      minX = Math.min(minX, a.cx - a.r);
      minY = Math.min(minY, a.cy - a.r);
      maxX = Math.max(maxX, a.cx + a.r);
      maxY = Math.max(maxY, a.cy + a.r);
    } else if ("points" in el && Array.isArray((el as unknown as { points: unknown }).points)) {
      const pts = (el as unknown as { points: { x: number; y: number }[] }).points;
      for (const p of pts) {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
      }
    } else if ("x" in el && "y" in el) {
      minX = Math.min(minX, a.x);
      minY = Math.min(minY, a.y - 20);
      maxX = Math.max(maxX, a.x + 80);
      maxY = Math.max(maxY, a.y);
    }
  }

  if (!isFinite(minX)) return null;
  return { minX, minY, maxX, maxY };
}

function getElementCenter(el: SketchElement): { x: number; y: number } {
  const a = el as unknown as Record<string, number>;
  if ("x1" in el && "x2" in el && "y1" in el && "y2" in el) {
    return { x: (a.x1 + a.x2) / 2, y: (a.y1 + a.y2) / 2 };
  }
  if ("cx" in el && "cy" in el) {
    return { x: a.cx, y: a.cy };
  }
  if ("x" in el && "y" in el && "w" in el && "h" in el) {
    return { x: a.x + a.w / 2, y: a.y + a.h / 2 };
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
    return { x: a.x, y: a.y };
  }
  return { x: 0, y: 0 };
}

function renderGrid(w: number, h: number, paper: PaperType): string {
  const lines: string[] = [];
  if (paper === "yellow") {
    const step = 25;
    for (let x = step; x < w; x += step) {
      lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#e8e4c8" stroke-width="0.5" opacity="0.4"/>`);
    }
    for (let y = step; y < h; y += step) {
      lines.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#e8e4c8" stroke-width="0.5" opacity="0.4"/>`);
    }
  } else if (paper === "blueprint") {
    const step = 20;
    for (let x = step; x < w; x += step) {
      lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#2a5a8c" stroke-width="0.3" opacity="0.5"/>`);
    }
    for (let y = step; y < h; y += step) {
      lines.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#2a5a8c" stroke-width="0.3" opacity="0.5"/>`);
    }
  }
  return lines.join("\n");
}

function renderArrowHead(x: number, y: number, angle: number, size: number, style: StrokeStyle): string {
  const x1 = x - size * Math.cos(angle - Math.PI / 6);
  const y1 = y - size * Math.sin(angle - Math.PI / 6);
  const x2 = x - size * Math.cos(angle + Math.PI / 6);
  const y2 = y - size * Math.sin(angle + Math.PI / 6);
  return `<path d="M ${x1} ${y1} L ${x} ${y} L ${x2} ${y2}" ${strokeAttrs(style)}/>`;
}

function renderElement(sketch: SketchData, el: SketchElement, defaultColor: string): string {
  const style = getStrokeStyle(sketch, { ...el, color: el.color || defaultColor }, defaultColor);
  const opts = getWobbleOpts(sketch, el);
  const sa = strokeAttrs(style);
  const parts: string[] = [];

  // Wrap in rotation transform if needed
  const rotationPrefix = el.rotation
    ? (() => {
        const c = getElementCenter(el);
        return `<g transform="rotate(${el.rotation} ${c.x} ${c.y})">`;
      })()
    : "";
  const rotationSuffix = el.rotation ? "</g>" : "";

  switch (el.type) {
    case "line": {
      if (el.wallWidth && el.wallWidth > 0) {
        // ── Wall rendering: two parallel wobble lines with filled interior ──
        const { x1, y1, x2, y2, wallWidth } = el;
        const hw = wallWidth / 2;
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > 0.001) {
          const nx = -dy / len, ny = dx / len;
          const ax1 = x1 + nx * hw, ay1 = y1 + ny * hw;
          const ax2 = x2 + nx * hw, ay2 = y2 + ny * hw;
          const bx1 = x1 - nx * hw, by1 = y1 - ny * hw;
          const bx2 = x2 - nx * hw, by2 = y2 - ny * hw;
          const fillC = el.fillColor && el.fillColor !== "none"
            ? (sketch.paper === "blueprint" ? (BLUEPRINT_COLOR_MAP[el.fillColor] ?? el.fillColor) : el.fillColor)
            : (sketch.paper === "blueprint" ? "rgba(26,58,107,0.95)" : PAPER_COLORS[sketch.paper] ?? "#f5f0e8");
          // Fill polygon
          parts.push(`<polygon points="${ax1},${ay1} ${ax2},${ay2} ${bx2},${by2} ${bx1},${by1}" fill="${fillC}" stroke="none"/>`);
          // Two parallel wobble lines
          const ptsA = wobbleLine(ax1, ay1, ax2, ay2, { ...opts, seed: opts.seed! + 0 });
          const ptsB = wobbleLine(bx1, by1, bx2, by2, { ...opts, seed: opts.seed! + 1 });
          parts.push(`<path d="${pointsToPath(ptsA)}" ${sa}/>`);
          parts.push(`<path d="${pointsToPath(ptsB)}" ${sa}/>`);
        } else {
          const pts = wobbleLine(el.x1, el.y1, el.x2, el.y2, opts);
          parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
        }
      } else {
        const pts = wobbleLine(el.x1, el.y1, el.x2, el.y2, opts);
        parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
      }
      break;
    }

    case "rect": {
      // Render fill first if specified
      if (el.fillColor && el.fillColor !== "none") {
        const fc = sketch.paper === "blueprint"
          ? (BLUEPRINT_COLOR_MAP[el.fillColor] ?? el.fillColor)
          : el.fillColor;
        parts.push(`<rect x="${el.x}" y="${el.y}" width="${el.w}" height="${el.h}" fill="${fc}" stroke="none"/>`);
      }
      const sides = [
        wobbleLine(el.x, el.y, el.x + el.w, el.y, { ...opts, seed: opts.seed! + 1 }),
        wobbleLine(el.x + el.w, el.y, el.x + el.w, el.y + el.h, { ...opts, seed: opts.seed! + 2 }),
        wobbleLine(el.x + el.w, el.y + el.h, el.x, el.y + el.h, { ...opts, seed: opts.seed! + 3 }),
        wobbleLine(el.x, el.y + el.h, el.x, el.y, { ...opts, seed: opts.seed! + 4 }),
      ];
      for (const s of sides) {
        parts.push(`<path d="${pointsToPath(s)}" ${sa}/>`);
      }
      break;
    }

    case "circle": {
      // Render fill first if specified
      if (el.fillColor && el.fillColor !== "none") {
        const fc = sketch.paper === "blueprint"
          ? (BLUEPRINT_COLOR_MAP[el.fillColor] ?? el.fillColor)
          : el.fillColor;
        parts.push(`<circle cx="${el.cx}" cy="${el.cy}" r="${el.r}" fill="${fc}" stroke="none"/>`);
      }
      const pts = wobbleCircle(el.cx, el.cy, el.r, opts);
      parts.push(`<path d="${pointsToPath(pts, true)}" ${sa}/>`);
      break;
    }

    case "arc": {
      const ea = E(el);
      const acx = ea.cx ?? ea.x ?? 0;
      const acy = ea.cy ?? ea.y ?? 0;
      const startA = ea.startAngle ?? 0;
      const endA = ea.sweep != null ? startA + ea.sweep : (ea.endAngle ?? 90);
      const pts = wobbleArc(acx, acy, ea.r, startA, endA, opts);
      parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
      break;
    }

    case "arrow": {
      const ea2 = E(el);
      const pts = wobbleLine(ea2.x1, ea2.y1, ea2.x2, ea2.y2, opts);
      parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
      const angle = Math.atan2(ea2.y2 - ea2.y1, ea2.x2 - ea2.x1);
      parts.push(renderArrowHead(ea2.x2, ea2.y2, angle, 10, style));
      break;
    }

    case "text": {
      const et = E(el);
      const fontSize = et.size || et.fontSize || 14;
      const content = et.content || et.text || "";
      const lineHeightMultiplier = et.lineHeight ?? 1.4;
      const lineSpacing = fontSize * lineHeightMultiplier;
      const rotation = (Math.sin(hashElement(el)) * sketch.humanness * 2 * Math.PI) / 180;
      const fillColor = el.color || defaultColor;
      // Respect per-element fontFamily override, then sketch-level textFont, then default
      const textFontCss = resolveFontCssSvg(
        (et.fontFamily as SkissifyFont | undefined) ?? sketch.textFont,
        "'Courier New', monospace"
      );

      // Build lines: split on \n (maxWidth word-wrap is approximate in SVG via tspan)
      const rawLines = content.split("\n");
      // For SVG we don't have canvas measureText, so word-wrap is skipped here —
      // explicit \n breaks are fully honoured. maxWidth is passed as a hint to
      // the SVG textLength attribute so browsers compress/expand glyphs to fit.
      const maxWidth: number | undefined = et.maxWidth && et.maxWidth > 0 ? et.maxWidth : undefined;

      if (rawLines.length === 1) {
        // Single-line fast path
        const widthAttr = maxWidth ? ` textLength="${maxWidth}" lengthAdjust="spacingAndGlyphs"` : "";
        parts.push(
          `<text x="${el.x}" y="${el.y}" font-family="${textFontCss}" font-size="${fontSize}" fill="${fillColor}" opacity="${style.opacity}" transform="rotate(${(rotation * 180) / Math.PI} ${el.x} ${el.y})"${widthAttr}>${escapeXml(content)}</text>`
        );
      } else {
        // Multiline: use <tspan> elements with dy offsets
        const tspans = rawLines.map((line: string, i: number) => {
          const dy = i === 0 ? "0" : lineSpacing.toFixed(1);
          const widthAttr =
            maxWidth && line.length > 0
              ? ` textLength="${maxWidth}" lengthAdjust="spacingAndGlyphs"`
              : "";
          return `<tspan x="${el.x}" dy="${dy}"${widthAttr}>${escapeXml(line)}</tspan>`;
        });
        parts.push(
          `<text font-family="${textFontCss}" font-size="${fontSize}" fill="${fillColor}" opacity="${style.opacity}" transform="rotate(${(rotation * 180) / Math.PI} ${el.x} ${el.y})">${tspans.join("")}</text>`
        );
      }
      break;
    }

    case "dashed": {
      const ed = E(el);
      const dashLen = ed.dashLength || 8;
      const gapLen = ed.gapLength || 6;
      const len = Math.sqrt((ed.x2 - ed.x1) ** 2 + (ed.y2 - ed.y1) ** 2);
      const dx = (ed.x2 - ed.x1) / len;
      const dy = (ed.y2 - ed.y1) / len;
      let pos = 0;
      let segIdx = 0;
      while (pos < len) {
        const segEnd = Math.min(pos + dashLen, len);
        const pts = wobbleLine(
          ed.x1 + dx * pos, ed.y1 + dy * pos,
          ed.x1 + dx * segEnd, ed.y1 + dy * segEnd,
          { ...opts, seed: opts.seed! + segIdx++ }
        );
        parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
        pos = segEnd + gapLen;
      }
      break;
    }

    case "dim": {
      const edm = E(el);
      const dimOffset: number = edm.offset ?? 0;
      const dist = Math.sqrt((edm.x2 - edm.x1) ** 2 + (edm.y2 - edm.y1) ** 2);
      // Perpendicular direction (same math as canvas renderer)
      const perpX = dist > 0 ? -(edm.y2 - edm.y1) / dist : 0;
      const perpY = dist > 0 ? (edm.x2 - edm.x1) / dist : 0;

      // Compute offset endpoints
      let dx1 = edm.x1, dy1 = edm.y1, dx2 = edm.x2, dy2 = edm.y2;
      if (dimOffset !== 0) {
        dx1 = edm.x1 + perpX * dimOffset;
        dy1 = edm.y1 + perpY * dimOffset;
        dx2 = edm.x2 + perpX * dimOffset;
        dy2 = edm.y2 + perpY * dimOffset;
        // Dashed extension lines from original points to offset position
        const dashSa = sa.replace(/stroke-dasharray="[^"]*"/, '') + ` stroke-dasharray="3,3"`;
        const ext1pts = wobbleLine(edm.x1, edm.y1, dx1, dy1, { ...opts, seed: opts.seed! + 20 });
        const ext2pts = wobbleLine(edm.x2, edm.y2, dx2, dy2, { ...opts, seed: opts.seed! + 21 });
        parts.push(`<path d="${pointsToPath(ext1pts)}" ${dashSa}/>`);
        parts.push(`<path d="${pointsToPath(ext2pts)}" ${dashSa}/>`);
      }

      const dimAngle = Math.atan2(dy2 - dy1, dx2 - dx1);
      const ptsMain = wobbleLine(dx1, dy1, dx2, dy2, { ...opts, amplitude: opts.amplitude * 0.3, waves: opts.waves * 0.5 });
      parts.push(`<path d="${pointsToPath(ptsMain)}" ${sa}/>`);

      // Tick marks at both ends
      const tn = 5;
      const tnx = -Math.sin(dimAngle) * tn;
      const tny = Math.cos(dimAngle) * tn;
      parts.push(`<line x1="${dx1 + tnx}" y1="${dy1 + tny}" x2="${dx1 - tnx}" y2="${dy1 - tny}" ${sa}/>`);
      parts.push(`<line x1="${dx2 + tnx}" y1="${dy2 + tny}" x2="${dx2 - tnx}" y2="${dy2 - tny}" ${sa}/>`);

      const midX = (dx1 + dx2) / 2;
      const midY = (dy1 + dy2) / 2;
      const fillColor = edm.color || defaultColor;
      const isVertical = Math.abs(edm.x2 - edm.x1) < Math.abs(edm.y2 - edm.y1);
      // Respect per-element fontFamily override, then sketch-level dimFont, then textFont, then default
      const dimFontCss = resolveFontCssSvg(
        (edm.fontFamily as SkissifyFont | undefined) ?? sketch.dimFont ?? sketch.textFont,
        "'Courier New', monospace"
      );
      if (isVertical) {
        // Vertical dim: label rotated 90° CCW, offset perpendicular (16px outward)
        const labelOffX = perpX * 16;
        parts.push(
          `<text x="${midX + labelOffX}" y="${midY}" font-family="${dimFontCss}" font-size="12" fill="${fillColor}" text-anchor="middle" dominant-baseline="auto" transform="rotate(-90 ${midX + labelOffX} ${midY})" dy="-6">${escapeXml(edm.label)}</text>`
        );
      } else {
        parts.push(
          `<text x="${midX}" y="${midY - 6}" font-family="${dimFontCss}" font-size="12" fill="${fillColor}" text-anchor="middle" dominant-baseline="auto">${escapeXml(edm.label)}</text>`
        );
      }
      break;
    }

    case "window": {
      const ew = E(el);
      const wx1 = ew.x1 ?? ew.x ?? 0;
      const wy1 = ew.y1 ?? ew.y ?? 0;
      const ww = ew.w ?? 60;
      const wd = ew.d ?? 8;
      const wwall = ew.wall ?? "h";
      if (sketch.renderStyle === "napkin") {
        // Napkin mode: simple X across the opening
        if (wwall === "h") {
          const wx2 = wx1 + ww;
          const wy2 = wy1 + wd;
          // center line
          parts.push(`<path d="${pointsToPath(wobbleLine(wx1, wy1 + wd / 2, wx2, wy1 + wd / 2, { ...opts, seed: opts.seed! + 1 }))}" ${sa}/>`);
          // X diagonals
          parts.push(`<path d="${pointsToPath(wobbleLine(wx1, wy1, wx2, wy2, { ...opts, seed: opts.seed! + 2 }))}" ${sa}/>`);
          parts.push(`<path d="${pointsToPath(wobbleLine(wx1, wy2, wx2, wy1, { ...opts, seed: opts.seed! + 3 }))}" ${sa}/>`);
        } else {
          const wx2 = wx1 + wd;
          const wy2 = wy1 + ww;
          // center line
          parts.push(`<path d="${pointsToPath(wobbleLine(wx1 + wd / 2, wy1, wx1 + wd / 2, wy2, { ...opts, seed: opts.seed! + 1 }))}" ${sa}/>`);
          // X diagonals
          parts.push(`<path d="${pointsToPath(wobbleLine(wx1, wy1, wx2, wy2, { ...opts, seed: opts.seed! + 2 }))}" ${sa}/>`);
          parts.push(`<path d="${pointsToPath(wobbleLine(wx2, wy1, wx1, wy2, { ...opts, seed: opts.seed! + 3 }))}" ${sa}/>`);
        }
      } else {
        const wx2 = ew.x2 ?? (wx1 + ww);
        const wy2 = ew.y2 ?? wy1;
        const pts = wobbleLine(wx1, wy1, wx2, wy2, opts);
        parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
        const wLen = Math.sqrt((wx2 - wx1) ** 2 + (wy2 - wy1) ** 2);
        const wdx = (wx2 - wx1) / wLen;
        const wdy = (wy2 - wy1) / wLen;
        const wnx = -wdy * 6;
        const wny = wdx * 6;
        const tickCount = Math.max(2, Math.floor(wLen / 15));
        for (let i = 0; i <= tickCount; i++) {
          const t = i / tickCount;
          const px = wx1 + wdx * wLen * t;
          const py = wy1 + wdy * wLen * t;
          parts.push(`<line x1="${px - wnx}" y1="${py - wny}" x2="${px + wnx}" y2="${py + wny}" ${sa}/>`);
        }
      }
      break;
    }

    case "door-symbol": {
      const doorW = el.w || 80;
      const swing = el.swing || "left";
      if (sketch.renderStyle === "napkin") {
        // Napkin mode: just the door line + a simple diagonal hint — no swing arc
        const linePts = wobbleLine(el.x, el.y, el.x + doorW, el.y, opts);
        parts.push(`<path d="${pointsToPath(linePts)}" ${sa}/>`);
        if (swing === "right") {
          const diagPts = wobbleLine(el.x + doorW, el.y, el.x + doorW * 0.3, el.y + doorW * 0.7, { ...opts, seed: opts.seed! + 2 });
          parts.push(`<path d="${pointsToPath(diagPts)}" ${sa}/>`);
        } else {
          const diagPts = wobbleLine(el.x, el.y, el.x + doorW * 0.7, el.y + doorW * 0.7, { ...opts, seed: opts.seed! + 2 });
          parts.push(`<path d="${pointsToPath(diagPts)}" ${sa}/>`);
        }
      } else {
        const hingeX = swing === "left" ? el.x : el.x + doorW;
        const startA = swing === "left" ? -90 : 180;
        const endA = swing === "left" ? 0 : 270;
        const doorEndX = swing === "left" ? el.x + doorW : el.x;
        const linePts = wobbleLine(hingeX, el.y, doorEndX, el.y, opts);
        parts.push(`<path d="${pointsToPath(linePts)}" ${sa}/>`);
        const arcPts = wobbleArc(hingeX, el.y, doorW, startA, endA, opts);
        parts.push(`<path d="${pointsToPath(arcPts)}" ${sa}/>`);
      }
      break;
    }

    case "door-slide": {
      const dsW = el.w || 80;
      const dsDir = el.direction || "right";
      const line1 = wobbleLine(el.x, el.y, el.x + dsW, el.y, { ...opts, seed: opts.seed! + 1 });
      const line2 = wobbleLine(el.x, el.y + 4, el.x + dsW, el.y + 4, { ...opts, seed: opts.seed! + 2 });
      parts.push(`<path d="${pointsToPath(line1)}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(line2)}" ${sa}/>`);
      const arrowX1 = dsDir === "right" ? el.x + dsW * 0.3 : el.x + dsW * 0.7;
      const arrowX2 = dsDir === "right" ? el.x + dsW * 0.7 : el.x + dsW * 0.3;
      const arrowAngle = Math.atan2(0, arrowX2 - arrowX1);
      parts.push(renderArrowHead(arrowX2, el.y + 2, arrowAngle, 6, style));
      break;
    }

    case "stair": {
      const stairSteps = el.steps || 8;
      const stepH = el.h / stairSteps;
      // Outline
      const outlines = [
        wobbleLine(el.x, el.y, el.x + el.w, el.y, { ...opts, seed: opts.seed! + 100 }),
        wobbleLine(el.x, el.y + el.h, el.x + el.w, el.y + el.h, { ...opts, seed: opts.seed! + 101 }),
        wobbleLine(el.x, el.y, el.x, el.y + el.h, { ...opts, seed: opts.seed! + 102 }),
        wobbleLine(el.x + el.w, el.y, el.x + el.w, el.y + el.h, { ...opts, seed: opts.seed! + 103 }),
      ];
      for (const o of outlines) {
        parts.push(`<path d="${pointsToPath(o)}" ${sa}/>`);
      }
      // Treads
      for (let i = 1; i < stairSteps; i++) {
        const sy = el.y + stepH * i;
        const tread = wobbleLine(el.x, sy, el.x + el.w, sy, { ...opts, seed: opts.seed! + i });
        parts.push(`<path d="${pointsToPath(tread)}" ${sa}/>`);
      }
      break;
    }

    case "opening": {
      const e = E(el);
      const ox1 = e.x1 ?? e.x ?? 0;
      const oy1 = e.y1 ?? e.y ?? 0;
      const ox2 = e.x2 ?? (ox1 + (e.w ?? 60));
      const oy2 = e.y2 ?? oy1;
      const oLen = Math.sqrt((ox2 - ox1) ** 2 + (oy2 - oy1) ** 2);
      const odx = (ox2 - ox1) / oLen;
      const ody = (oy2 - oy1) / oLen;
      const returnLen = 6;
      const rnx = -ody * returnLen;
      const rny = odx * returnLen;
      parts.push(`<line x1="${ox1 - rnx}" y1="${oy1 - rny}" x2="${ox1 + rnx}" y2="${oy1 + rny}" ${sa}/>`);
      parts.push(`<line x1="${ox2 - rnx}" y1="${oy2 - rny}" x2="${ox2 + rnx}" y2="${oy2 + rny}" ${sa}/>`);
      break;
    }

    case "column": {
      const ec = E(el);
      const colSize = ec.s ?? ec.size ?? 10;
      const ccx = ec.cx ?? ec.x ?? 0;
      const ccy = ec.cy ?? ec.y ?? 0;
      const fillColor = el.color || defaultColor;
      const colPoints = wobbleCircle(ccx, ccy, colSize / 2, opts);
      const d = pointsToPath(colPoints, true);
      parts.push(`<path d="${d}" fill="${fillColor}" stroke="${style.stroke}" stroke-width="${style.strokeWidth}" opacity="${style.opacity}" stroke-linecap="round" stroke-linejoin="round"/>`);
      break;
    }

    case "path": {
      const ep = E(el);
      if (ep.points && ep.points.length >= 2) {
        // Render as single seamless stroke using wobblePath for smooth joints
        const pathRng = mkRng(opts.seed ?? 42);
        const rawPts = wobblePath(ep.points, opts.amplitude, opts.waves, pathRng, opts.humanness ?? 0);
        // Convert Pt[] (tuples) to Point[] (objects) for pointsToPath
        const pts: Point[] = rawPts.map(([x, y]) => ({ x, y }));
        parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
      }
      break;
    }

    // ── Furniture & Fixtures (SVG) ──────────────────────────────────────

    case "bed": {
      const { x, y, w, h: bh } = E(el);
      const pillows = el.pillows ?? 2;
      const headH = bh * 0.22;
      // Outer frame
      const frame = [[x,y,x+w,y],[x+w,y,x+w,y+bh],[x+w,y+bh,x,y+bh],[x,y+bh,x,y]] as [number,number,number,number][];
      frame.forEach(([x1,y1,x2,y2], i) => parts.push(`<path d="${pointsToPath(wobbleLine(x1,y1,x2,y2,{...opts,seed:opts.seed!+i+1}))}" ${sa}/>`));
      parts.push(`<path d="${pointsToPath(wobbleLine(x,y+headH,x+w,y+headH,{...opts,seed:opts.seed!+5,amplitude:opts.amplitude*0.4}))}" ${sa}/>`);
      const pilR = Math.min(w * 0.16, headH * 0.32);
      const pilY = y + headH * 0.5;
      if (pillows === 1) {
        parts.push(`<path d="${pointsToPath(wobbleCircle(x+w/2, pilY, pilR*1.3, {...opts,seed:opts.seed!+6}), true)}" ${sa}/>`);
      } else {
        [0.27, 0.73].forEach((fx, pi) => {
          parts.push(`<path d="${pointsToPath(wobbleCircle(x+w*fx, pilY, pilR*1.1, {...opts,seed:opts.seed!+6+pi}), true)}" ${sa}/>`);
        });
      }
      const foldY = y + headH + bh * 0.15;
      parts.push(`<path d="${pointsToPath(wobbleLine(x+w*0.05,foldY,x+w*0.95,foldY,{...opts,seed:opts.seed!+10,amplitude:opts.amplitude*0.3}))}" ${sa}/>`);
      break;
    }

    case "sofa": {
      const { x, y, w, h: sh } = E(el);
      const armW = Math.min(w * 0.12, 12);
      const backH = sh * 0.3;
      const frame = [[x,y,x+w,y],[x+w,y,x+w,y+sh],[x+w,y+sh,x,y+sh],[x,y+sh,x,y]] as [number,number,number,number][];
      frame.forEach(([x1,y1,x2,y2], i) => parts.push(`<path d="${pointsToPath(wobbleLine(x1,y1,x2,y2,{...opts,seed:opts.seed!+i+1}))}" ${sa}/>`));
      parts.push(`<path d="${pointsToPath(wobbleLine(x,y+backH,x+w,y+backH,{...opts,seed:opts.seed!+5,amplitude:opts.amplitude*0.4}))}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleLine(x+armW,y,x+armW,y+sh,{...opts,seed:opts.seed!+6,amplitude:opts.amplitude*0.35}))}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleLine(x+w-armW,y,x+w-armW,y+sh,{...opts,seed:opts.seed!+7,amplitude:opts.amplitude*0.35}))}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleLine(x+w/2,y+backH,x+w/2,y+sh,{...opts,seed:opts.seed!+8,amplitude:opts.amplitude*0.3}))}" ${sa}/>`);
      break;
    }

    case "dining-table": {
      const { x, y, w, h: dh } = E(el);
      const seats = el.seats ?? 2;
      const chairW = Math.min(w / (seats + 0.5), 28);
      const chairH = Math.min(dh * 0.4, 20);
      const chairGap = 4;
      const frame = [[x,y,x+w,y],[x+w,y,x+w,y+dh],[x+w,y+dh,x,y+dh],[x,y+dh,x,y]] as [number,number,number,number][];
      frame.forEach(([x1,y1,x2,y2], i) => parts.push(`<path d="${pointsToPath(wobbleLine(x1,y1,x2,y2,{...opts,seed:opts.seed!+i+1}))}" ${sa}/>`));
      const totalW = seats * (chairW + 4) - 4;
      const startX = x + (w - totalW) / 2;
      for (let s = 0; s < seats; s++) {
        const cx2 = startX + s * (chairW + 4) + chairW / 2;
        parts.push(`<path d="${pointsToPath(wobbleCircle(cx2, y - chairGap - chairH/2, (chairW+chairH)/4, {...opts,seed:opts.seed!+20+s}), true)}" ${sa}/>`);
        parts.push(`<path d="${pointsToPath(wobbleCircle(cx2, y + dh + chairGap + chairH/2, (chairW+chairH)/4, {...opts,seed:opts.seed!+30+s}), true)}" ${sa}/>`);
      }
      const ecW = chairH, ecH = Math.min(chairW * 0.7, dh * 0.45);
      const avgR = (ecW + ecH) / 4;
      parts.push(`<path d="${pointsToPath(wobbleCircle(x - chairGap - ecW/2, y+dh/2, avgR, {...opts,seed:opts.seed!+40}), true)}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleCircle(x + w + chairGap + ecW/2, y+dh/2, avgR, {...opts,seed:opts.seed!+41}), true)}" ${sa}/>`);
      break;
    }

    case "toilet": {
      const { x, y, w, h: th } = E(el);
      const tankH = th * 0.3;
      const tankW = w * 0.85;
      const tankX = x + (w - tankW) / 2;
      const tank = [[tankX,y,tankX+tankW,y],[tankX+tankW,y,tankX+tankW,y+tankH],[tankX+tankW,y+tankH,tankX,y+tankH],[tankX,y+tankH,tankX,y]] as [number,number,number,number][];
      tank.forEach(([x1,y1,x2,y2], i) => parts.push(`<path d="${pointsToPath(wobbleLine(x1,y1,x2,y2,{...opts,seed:opts.seed!+i+1}))}" ${sa}/>`));
      const bowlCX = x + w/2, bowlCY = y + tankH + (th-tankH)*0.5;
      const bowlRX = w * 0.46, bowlRY = (th-tankH) * 0.44;
      const avgBowl = (bowlRX + bowlRY) / 2;
      parts.push(`<path d="${pointsToPath(wobbleCircle(bowlCX, bowlCY, avgBowl, {...opts,seed:opts.seed!+5}), true)}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleCircle(bowlCX, bowlCY, avgBowl*0.72, {...opts,seed:opts.seed!+6}), true)}" ${sa}/>`);
      break;
    }

    case "bathtub": {
      const { x, y, w, h: bth } = E(el);
      const wallT = Math.min(w * 0.06, 6);
      const frame = [[x,y,x+w,y],[x+w,y,x+w,y+bth],[x+w,y+bth,x,y+bth],[x,y+bth,x,y]] as [number,number,number,number][];
      frame.forEach(([x1,y1,x2,y2], i) => parts.push(`<path d="${pointsToPath(wobbleLine(x1,y1,x2,y2,{...opts,seed:opts.seed!+i+1}))}" ${sa}/>`));
      const icx = x + w/2, icy = y + bth*0.52;
      const irx = w/2 - wallT - 2, iry = bth*0.5 - wallT - 2;
      parts.push(`<path d="${pointsToPath(wobbleCircle(icx, icy, (irx+iry)/2, {...opts,seed:opts.seed!+5}), true)}" ${sa}/>`);
      const ftapY = y + wallT + 4, ftapX = x + w/2;
      parts.push(`<path d="${pointsToPath(wobbleLine(ftapX-6,ftapY,ftapX+6,ftapY,{...opts,seed:opts.seed!+10,amplitude:opts.amplitude*0.3}))}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleLine(ftapX,ftapY-3,ftapX,ftapY+3,{...opts,seed:opts.seed!+11,amplitude:opts.amplitude*0.3}))}" ${sa}/>`);
      break;
    }

    case "sink": {
      const { x, y, w, h: skh } = E(el);
      const frame = [[x,y,x+w,y],[x+w,y,x+w,y+skh],[x+w,y+skh,x,y+skh],[x,y+skh,x,y]] as [number,number,number,number][];
      frame.forEach(([x1,y1,x2,y2], i) => parts.push(`<path d="${pointsToPath(wobbleLine(x1,y1,x2,y2,{...opts,seed:opts.seed!+i+1}))}" ${sa}/>`));
      const scx = x+w/2, scy = y+skh*0.56;
      const srx = w*0.36, sry = skh*0.33;
      parts.push(`<path d="${pointsToPath(wobbleCircle(scx, scy, (srx+sry)/2, {...opts,seed:opts.seed!+5}), true)}" ${sa}/>`);
      parts.push(`<circle cx="${scx}" cy="${scy}" r="2" fill="${style.stroke}" opacity="0.7"/>`);
      const ftY = y+skh*0.15;
      parts.push(`<path d="${pointsToPath(wobbleLine(scx-7,ftY,scx+7,ftY,{...opts,seed:opts.seed!+10,amplitude:opts.amplitude*0.3}))}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleLine(scx,ftY,scx,ftY+8,{...opts,seed:opts.seed!+11,amplitude:opts.amplitude*0.3}))}" ${sa}/>`);
      break;
    }

    case "armchair": {
      const { x, y, w, h: ah } = E(el);
      const armW = Math.min(w * 0.14, 14);
      const backH = ah * 0.28;
      const frame = [[x,y,x+w,y],[x+w,y,x+w,y+ah],[x+w,y+ah,x,y+ah],[x,y+ah,x,y]] as [number,number,number,number][];
      frame.forEach(([x1,y1,x2,y2], i) => parts.push(`<path d="${pointsToPath(wobbleLine(x1,y1,x2,y2,{...opts,seed:opts.seed!+i+1}))}" ${sa}/>`));
      parts.push(`<path d="${pointsToPath(wobbleLine(x,y+backH,x+w,y+backH,{...opts,seed:opts.seed!+5,amplitude:opts.amplitude*0.4}))}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleLine(x+armW,y,x+armW,y+ah,{...opts,seed:opts.seed!+6,amplitude:opts.amplitude*0.35}))}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleLine(x+w-armW,y,x+w-armW,y+ah,{...opts,seed:opts.seed!+7,amplitude:opts.amplitude*0.35}))}" ${sa}/>`);
      const scx2 = x+w/2, scy2 = y+backH+(ah-backH)*0.45;
      const srx2 = (w-armW*2)*0.38, sry2 = (ah-backH)*0.28;
      parts.push(`<path d="${pointsToPath(wobbleCircle(scx2, scy2, (srx2+sry2)/2, {...opts,seed:opts.seed!+8}), true)}" ${sa}/>`);
      break;
    }

    case "desk": {
      const { x, y, w, h: deskH } = E(el);
      const frame = [[x,y,x+w,y],[x+w,y,x+w,y+deskH],[x+w,y+deskH,x,y+deskH],[x,y+deskH,x,y]] as [number,number,number,number][];
      frame.forEach(([x1,y1,x2,y2], i) => parts.push(`<path d="${pointsToPath(wobbleLine(x1,y1,x2,y2,{...opts,seed:opts.seed!+i+1}))}" ${sa}/>`));
      const pedW = w*0.3, pedX = x+w-pedW;
      parts.push(`<path d="${pointsToPath(wobbleLine(pedX,y,pedX,y+deskH,{...opts,seed:opts.seed!+5,amplitude:opts.amplitude*0.4}))}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleLine(pedX,y+deskH*0.35,x+w,y+deskH*0.35,{...opts,seed:opts.seed!+6,amplitude:opts.amplitude*0.3}))}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleLine(pedX,y+deskH*0.7,x+w,y+deskH*0.7,{...opts,seed:opts.seed!+7,amplitude:opts.amplitude*0.3}))}" ${sa}/>`);
      break;
    }

    case "bookshelf": {
      const { x, y, w, h: bsh } = E(el);
      const shelves = el.shelves ?? 3;
      const frame = [[x,y,x+w,y],[x+w,y,x+w,y+bsh],[x+w,y+bsh,x,y+bsh],[x,y+bsh,x,y]] as [number,number,number,number][];
      frame.forEach(([x1,y1,x2,y2], i) => parts.push(`<path d="${pointsToPath(wobbleLine(x1,y1,x2,y2,{...opts,seed:opts.seed!+i+1}))}" ${sa}/>`));
      for (let i = 1; i <= shelves; i++) {
        const shY = y + (bsh / (shelves + 1)) * i;
        parts.push(`<path d="${pointsToPath(wobbleLine(x,shY,x+w,shY,{...opts,seed:opts.seed!+10+i,amplitude:opts.amplitude*0.35}))}" ${sa}/>`);
      }
      break;
    }

    case "stove": {
      const { x, y, w, h: stoveH } = E(el);
      const burners = el.burners ?? 4;
      const frame = [[x,y,x+w,y],[x+w,y,x+w,y+stoveH],[x+w,y+stoveH,x,y+stoveH],[x,y+stoveH,x,y]] as [number,number,number,number][];
      frame.forEach(([x1,y1,x2,y2], i) => parts.push(`<path d="${pointsToPath(wobbleLine(x1,y1,x2,y2,{...opts,seed:opts.seed!+i+1}))}" ${sa}/>`));
      const positions = burners === 2
        ? [{ fx: 0.3, fy: 0.5 }, { fx: 0.7, fy: 0.5 }]
        : [{ fx: 0.28, fy: 0.28 }, { fx: 0.72, fy: 0.28 }, { fx: 0.28, fy: 0.72 }, { fx: 0.72, fy: 0.72 }];
      const br = Math.min(w, stoveH) * (burners === 2 ? 0.18 : 0.15);
      positions.forEach(({ fx, fy }, bi) => {
        const bcx = x + w * fx, bcy = y + stoveH * fy;
        parts.push(`<path d="${pointsToPath(wobbleCircle(bcx, bcy, br, {...opts,seed:opts.seed!+10+bi}), true)}" ${sa}/>`);
        parts.push(`<path d="${pointsToPath(wobbleCircle(bcx, bcy, br*0.52, {...opts,seed:opts.seed!+20+bi}), true)}" ${sa}/>`);
      });
      break;
    }

    case "shower": {
      const { x, y, w, h: shH } = E(el);
      const frame = [[x,y,x+w,y],[x+w,y,x+w,y+shH],[x+w,y+shH,x,y+shH],[x,y+shH,x,y]] as [number,number,number,number][];
      frame.forEach(([x1,y1,x2,y2], i) => parts.push(`<path d="${pointsToPath(wobbleLine(x1,y1,x2,y2,{...opts,seed:opts.seed!+i+1}))}" ${sa}/>`));
      const arcR = Math.min(w, shH) * 0.85;
      const arcPts = wobbleArc(x, y, arcR, 0, 90, {...opts, seed: opts.seed! + 5});
      parts.push(`<path d="${pointsToPath(arcPts)}" ${sa}/>`);
      const hX = x + w*0.75, hY = y + shH*0.2, hR = Math.min(w, shH)*0.08;
      parts.push(`<path d="${pointsToPath(wobbleLine(hX-hR,hY,hX+hR,hY,{...opts,seed:opts.seed!+10,amplitude:opts.amplitude*0.25}))}" ${sa}/>`);
      parts.push(`<path d="${pointsToPath(wobbleLine(hX,hY-hR,hX,hY+hR,{...opts,seed:opts.seed!+11,amplitude:opts.amplitude*0.25}))}" ${sa}/>`);
      break;
    }
  }

  const elOpacity = (el as { opacity?: number }).opacity;
  const opacityPrefix = elOpacity != null && elOpacity !== 1 ? `<g opacity="${elOpacity.toFixed(3)}">` : "";
  const opacitySuffix = opacityPrefix ? "</g>" : "";

  if (rotationPrefix || opacityPrefix) {
    const inner = parts.join("\n");
    const rotated = rotationPrefix ? `${rotationPrefix}\n${inner}\n${rotationSuffix}` : inner;
    return opacityPrefix ? `${opacityPrefix}\n${rotated}\n${opacitySuffix}` : rotated;
  }
  return parts.join("\n");
}

/** Render the blueprint overlay (title block, borders, north arrow, scale bar) as SVG elements */
function renderBlueprintOverlay(W: number, H: number, meta?: BlueprintMetadata): string {
  const m = meta ?? {};
  const title = m.title || "PLANRITNING";
  const owner = m.owner || "";
  const date = m.date || "";
  const scale = m.scale || "1:100";
  const sheetNum = m.sheetNumber || "";
  const drawnBy = m.drawnBy || "";

  const wc = "rgba(200,225,255,0.75)";
  const wl = "rgba(200,225,255,0.5)";
  const parts: string[] = [];

  // Double border
  parts.push(`<rect x="10" y="10" width="${W - 20}" height="${H - 20}" fill="none" stroke="${wc}" stroke-width="0.9"/>`);
  parts.push(`<rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="none" stroke="${wc}" stroke-width="0.4"/>`);

  // Center title
  parts.push(`<text x="${W / 2}" y="24" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="${wc}" text-anchor="middle">${escapeXml(title)}</text>`);

  // Decorative underline
  parts.push(`<line x1="${W / 2 - 70}" y1="30" x2="${W / 2 + 70}" y2="30" stroke="${wl}" stroke-width="0.4"/>`);

  // Title block (bottom-right) — 3-4 rows × 2 columns
  const tw = 200;
  const th = drawnBy ? 94 : 72;
  const tx = W - 10 - tw;
  const ty = H - 10 - th;
  const rowH = 22;
  const rowCount = drawnBy ? 4 : 3;

  parts.push(`<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" fill="none" stroke="${wc}" stroke-width="0.6"/>`);

  // Horizontal dividers
  for (let r = 1; r < rowCount; r++) {
    parts.push(`<line x1="${tx}" y1="${ty + r * rowH}" x2="${tx + tw}" y2="${ty + r * rowH}" stroke="${wc}" stroke-width="0.6"/>`);
  }

  // Vertical divider in data rows (below title row)
  parts.push(`<line x1="${tx + 100}" y1="${ty + rowH}" x2="${tx + 100}" y2="${ty + th}" stroke="${wc}" stroke-width="0.6"/>`);

  // Title block text
  // Row 0: title (full width)
  parts.push(`<text x="${tx + 6}" y="${ty + 14}" font-family="Georgia, serif" font-size="8" font-weight="bold" fill="${wc}">${escapeXml(title)}</text>`);

  // Row 1: owner | scale
  if (owner) parts.push(`<text x="${tx + 6}" y="${ty + rowH + 14}" font-family="Georgia, serif" font-size="7" fill="${wc}">${escapeXml(owner)}</text>`);
  parts.push(`<text x="${tx + 106}" y="${ty + rowH + 14}" font-family="Georgia, serif" font-size="7" fill="${wc}">SCALE: ${escapeXml(scale)}</text>`);

  // Row 2: date | sheet number
  if (date) parts.push(`<text x="${tx + 6}" y="${ty + 2 * rowH + 14}" font-family="Georgia, serif" font-size="7" fill="${wc}">DATE: ${escapeXml(date)}</text>`);
  if (sheetNum) parts.push(`<text x="${tx + 106}" y="${ty + 2 * rowH + 14}" font-family="Georgia, serif" font-size="7" fill="${wc}">SHEET: ${escapeXml(sheetNum)}</text>`);

  // Row 3 (optional): drawn by
  if (drawnBy) {
    parts.push(`<text x="${tx + 6}" y="${ty + 3 * rowH + 14}" font-family="Georgia, serif" font-size="7" fill="${wc}">BY: ${escapeXml(drawnBy)}</text>`);
  }

  // North arrow
  const nax = tx - 22;
  const nay = H - 44;
  parts.push(`<line x1="${nax}" y1="${nay - 12}" x2="${nax}" y2="${nay + 12}" stroke="${wc}" stroke-width="0.5"/>`);
  parts.push(`<line x1="${nax - 4}" y1="${nay}" x2="${nax + 4}" y2="${nay}" stroke="${wc}" stroke-width="0.5"/>`);
  parts.push(`<text x="${nax}" y="${nay - 17}" font-family="Georgia, serif" font-size="7" font-weight="bold" fill="${wc}" text-anchor="middle">N</text>`);

  // Scale bar
  const sbx = 24;
  const sby = H - 18;
  const sbw = 80;
  const sbh = 4;
  parts.push(`<rect x="${sbx}" y="${sby}" width="${sbw}" height="${sbh}" fill="none" stroke="${wl}" stroke-width="0.5"/>`);
  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) {
      parts.push(`<rect x="${sbx + i * (sbw / 4)}" y="${sby}" width="${sbw / 4}" height="${sbh}" fill="${wl}"/>`);
    }
  }
  parts.push(`<text x="${sbx}" y="${sby - 3}" font-family="Georgia, serif" font-size="6" fill="${wl}">0  5  10  15m</text>`);

  return parts.join("\n");
}

/** Render a SketchData to a complete SVG string. */
/**
 * Render a sketch to SVG string.
 *
 * @param sketch    - The sketch data to render
 * @param watermark - When true, stamp a subtle "skissify.com" watermark in the bottom-right corner (free tier)
 */
export function renderSketchToSVG(sketch: SketchData, watermark = false): string {
  const w = sketch.width || 1000;
  const h = sketch.height || 750;
  const bgColor = PAPER_COLORS[sketch.paper] || PAPER_COLORS.cream;
  const defaultColor = sketch.paper === "blueprint" ? "#a8c8e8" : sketch.inkColor || "#111";

  // Compute centering offset (same logic as canvas renderer)
  const bbox = computeBoundingBox(sketch.elements);
  let offsetX = 0;
  let offsetY = 0;
  if (bbox) {
    const contentW = bbox.maxX - bbox.minX;
    const contentH = bbox.maxY - bbox.minY;
    const contentCenterX = bbox.minX + contentW / 2;
    const contentCenterY = bbox.minY + contentH / 2;
    const paperCenterX = w / 2;
    const paperCenterY = h / 2;
    const dx = paperCenterX - contentCenterX;
    const dy = paperCenterY - contentCenterY;
    if (Math.abs(dx) > w * 0.05) offsetX = dx;
    if (Math.abs(dy) > h * 0.05) offsetY = dy;
  }

  const elementsSvg = sketch.elements
    .filter((el) => el.visible !== false)
    .map((el) => renderElement(sketch, el, defaultColor))
    .join("\n");

  const hasOffset = offsetX !== 0 || offsetY !== 0;
  const elementsGroup = hasOffset
    ? `<g transform="translate(${offsetX} ${offsetY})">\n${elementsSvg}\n</g>`
    : elementsSvg;

  // Build @font-face import for Google Fonts used in this sketch
  const usedFonts = new Set<string>();
  if (sketch.textFont) usedFonts.add(sketch.textFont);
  if (sketch.dimFont) usedFonts.add(sketch.dimFont);
  sketch.elements.forEach((el) => {
    const anyEl = el as unknown as Record<string, unknown>;
    if (typeof anyEl.fontFamily === "string") usedFonts.add(anyEl.fontFamily);
  });

  const googleFontKeys = ["handwritten", "kalam", "jetbrains"];
  const googleFontFamilies: string[] = [];
  for (const key of usedFonts) {
    if (googleFontKeys.includes(key)) {
      if (key === "handwritten") googleFontFamilies.push("Caveat");
      else if (key === "kalam") googleFontFamilies.push("Kalam");
      else if (key === "jetbrains") googleFontFamilies.push("JetBrains+Mono");
    }
  }

  const fontDefs = googleFontFamilies.length > 0
    ? `  <defs>\n    <style>@import url('https://fonts.googleapis.com/css2?family=${googleFontFamilies.join("&amp;family=")}&amp;display=swap');</style>\n  </defs>\n`
    : "";

  // Blueprint overlay (drawn on top of elements, same as canvas renderer)
  const blueprintOverlay = sketch.paper === "blueprint"
    ? renderBlueprintOverlay(w, h, sketch.metadata)
    : "";

  const watermarkSvg = watermark
    ? svgWatermarkSnippet(w, h, sketch.paper !== "blueprint")
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
${fontDefs}  <rect width="${w}" height="${h}" fill="${bgColor}"/>
${renderGrid(w, h, sketch.paper)}
${elementsGroup}
${blueprintOverlay}
${watermarkSvg}
</svg>`;
}
