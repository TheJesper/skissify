/**
 * SVG renderer — mirrors renderer.ts but outputs an SVG string.
 * Uses the same wobble algorithms to produce identical hand-drawn output.
 */

import {
  SketchData,
  SketchElement,
  PAPER_COLORS,
  TOOL_STYLES,
  PaperType,
} from "./types";
import {
  wobbleLine,
  wobbleCircle,
  wobbleArc,
  WobbleOptions,
  Point,
} from "./wobble";

function hashElement(el: SketchElement): number {
  const str = JSON.stringify(el);
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getWobbleOpts(sketch: SketchData, el: SketchElement): WobbleOptions {
  return {
    amplitude: sketch.amplitude,
    waves: sketch.waves,
    humanness: sketch.humanness,
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
  return {
    stroke: el.color || defaultColor,
    strokeWidth: el.strokeWidth || tool.lineWidth,
    opacity: tool.opacity,
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
    if ("x1" in el && "x2" in el && "y1" in el && "y2" in el) {
      minX = Math.min(minX, el.x1, el.x2);
      minY = Math.min(minY, el.y1, el.y2);
      maxX = Math.max(maxX, el.x1, el.x2);
      maxY = Math.max(maxY, el.y1, el.y2);
    } else if ("x" in el && "w" in el && "h" in el) {
      minX = Math.min(minX, el.x);
      minY = Math.min(minY, el.y);
      maxX = Math.max(maxX, el.x + el.w);
      maxY = Math.max(maxY, el.y + el.h);
    } else if ("cx" in el && "r" in el) {
      minX = Math.min(minX, el.cx - el.r);
      minY = Math.min(minY, el.cy - el.r);
      maxX = Math.max(maxX, el.cx + el.r);
      maxY = Math.max(maxY, el.cy + el.r);
    } else if ("x" in el && "y" in el) {
      minX = Math.min(minX, el.x);
      minY = Math.min(minY, el.y - 20);
      maxX = Math.max(maxX, el.x + 80);
      maxY = Math.max(maxY, el.y);
    }
  }

  if (!isFinite(minX)) return null;
  return { minX, minY, maxX, maxY };
}

function getElementCenter(el: SketchElement): { x: number; y: number } {
  if ("x1" in el && "x2" in el && "y1" in el && "y2" in el) {
    return { x: (el.x1 + el.x2) / 2, y: (el.y1 + el.y2) / 2 };
  }
  if ("cx" in el && "cy" in el) {
    return { x: el.cx, y: el.cy };
  }
  if ("x" in el && "y" in el && "w" in el && "h" in el) {
    return { x: (el as { x: number; w: number }).x + (el as { w: number }).w / 2, y: (el as { y: number; h: number }).y + (el as { h: number }).h / 2 };
  }
  if ("x" in el && "y" in el) {
    return { x: (el as { x: number }).x, y: (el as { y: number }).y };
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
      const pts = wobbleLine(el.x1, el.y1, el.x2, el.y2, opts);
      parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
      break;
    }

    case "rect": {
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
      const pts = wobbleCircle(el.cx, el.cy, el.r, opts);
      parts.push(`<path d="${pointsToPath(pts, true)}" ${sa}/>`);
      break;
    }

    case "arc": {
      const pts = wobbleArc(el.cx, el.cy, el.r, el.startAngle, el.endAngle, opts);
      parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
      break;
    }

    case "arrow": {
      const pts = wobbleLine(el.x1, el.y1, el.x2, el.y2, opts);
      parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
      const angle = Math.atan2(el.y2 - el.y1, el.x2 - el.x1);
      parts.push(renderArrowHead(el.x2, el.y2, angle, 10, style));
      break;
    }

    case "text": {
      const fontSize = el.fontSize || 14;
      const rotation = (Math.sin(hashElement(el)) * sketch.humanness * 2 * Math.PI) / 180;
      const fillColor = el.color || defaultColor;
      parts.push(
        `<text x="${el.x}" y="${el.y}" font-family="'Caveat', cursive" font-size="${fontSize}" fill="${fillColor}" opacity="${style.opacity}" transform="rotate(${(rotation * 180) / Math.PI} ${el.x} ${el.y})">${escapeXml(el.text)}</text>`
      );
      break;
    }

    case "dashed": {
      const dashLen = el.dashLength || 8;
      const gapLen = el.gapLength || 6;
      const len = Math.sqrt((el.x2 - el.x1) ** 2 + (el.y2 - el.y1) ** 2);
      const dx = (el.x2 - el.x1) / len;
      const dy = (el.y2 - el.y1) / len;
      let pos = 0;
      let segIdx = 0;
      while (pos < len) {
        const segEnd = Math.min(pos + dashLen, len);
        const pts = wobbleLine(
          el.x1 + dx * pos, el.y1 + dy * pos,
          el.x1 + dx * segEnd, el.y1 + dy * segEnd,
          { ...opts, seed: opts.seed! + segIdx++ }
        );
        parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
        pos = segEnd + gapLen;
      }
      break;
    }

    case "dim": {
      const dimAngle = Math.atan2(el.y2 - el.y1, el.x2 - el.x1);
      const pts = wobbleLine(el.x1, el.y1, el.x2, el.y2, opts);
      parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
      parts.push(renderArrowHead(el.x1, el.y1, dimAngle + Math.PI, 8, style));
      parts.push(renderArrowHead(el.x2, el.y2, dimAngle, 8, style));
      // Extension lines
      const nx = -Math.sin(dimAngle) * 8;
      const ny = Math.cos(dimAngle) * 8;
      parts.push(`<line x1="${el.x1 + nx}" y1="${el.y1 + ny}" x2="${el.x1 - nx}" y2="${el.y1 - ny}" ${sa}/>`);
      parts.push(`<line x1="${el.x2 + nx}" y1="${el.y2 + ny}" x2="${el.x2 - nx}" y2="${el.y2 - ny}" ${sa}/>`);
      // Label
      const midX = (el.x1 + el.x2) / 2;
      const midY = (el.y1 + el.y2) / 2;
      const fillColor = el.color || defaultColor;
      const isVertical = Math.abs(el.x2 - el.x1) < Math.abs(el.y2 - el.y1);
      if (isVertical) {
        parts.push(
          `<text x="${midX}" y="${midY}" font-family="'Caveat', cursive" font-size="12" fill="${fillColor}" text-anchor="middle" dominant-baseline="auto" transform="rotate(-90 ${midX} ${midY})" dy="-6">${escapeXml(el.label)}</text>`
        );
      } else {
        parts.push(
          `<text x="${midX}" y="${midY - 6}" font-family="'Caveat', cursive" font-size="12" fill="${fillColor}" text-anchor="middle" dominant-baseline="auto">${escapeXml(el.label)}</text>`
        );
      }
      break;
    }

    case "window": {
      const pts = wobbleLine(el.x1, el.y1, el.x2, el.y2, opts);
      parts.push(`<path d="${pointsToPath(pts)}" ${sa}/>`);
      const wLen = Math.sqrt((el.x2 - el.x1) ** 2 + (el.y2 - el.y1) ** 2);
      const wdx = (el.x2 - el.x1) / wLen;
      const wdy = (el.y2 - el.y1) / wLen;
      const wnx = -wdy * 6;
      const wny = wdx * 6;
      const tickCount = Math.max(2, Math.floor(wLen / 15));
      for (let i = 0; i <= tickCount; i++) {
        const t = i / tickCount;
        const px = el.x1 + wdx * wLen * t;
        const py = el.y1 + wdy * wLen * t;
        parts.push(`<line x1="${px - wnx}" y1="${py - wny}" x2="${px + wnx}" y2="${py + wny}" ${sa}/>`);
      }
      break;
    }

    case "door-symbol": {
      const doorW = el.w || 80;
      const swing = el.swing || "left";
      const hingeX = swing === "left" ? el.x : el.x + doorW;
      const startA = swing === "left" ? -90 : 180;
      const endA = swing === "left" ? 0 : 270;
      const doorEndX = swing === "left" ? el.x + doorW : el.x;
      const linePts = wobbleLine(hingeX, el.y, doorEndX, el.y, opts);
      parts.push(`<path d="${pointsToPath(linePts)}" ${sa}/>`);
      const arcPts = wobbleArc(hingeX, el.y, doorW, startA, endA, opts);
      parts.push(`<path d="${pointsToPath(arcPts)}" ${sa}/>`);
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
      const oLen = Math.sqrt((el.x2 - el.x1) ** 2 + (el.y2 - el.y1) ** 2);
      const odx = (el.x2 - el.x1) / oLen;
      const ody = (el.y2 - el.y1) / oLen;
      const returnLen = 6;
      const rnx = -ody * returnLen;
      const rny = odx * returnLen;
      parts.push(`<line x1="${el.x1 - rnx}" y1="${el.y1 - rny}" x2="${el.x1 + rnx}" y2="${el.y1 + rny}" ${sa}/>`);
      parts.push(`<line x1="${el.x2 - rnx}" y1="${el.y2 - rny}" x2="${el.x2 + rnx}" y2="${el.y2 + rny}" ${sa}/>`);
      break;
    }

    case "column": {
      const colSize = el.size || 10;
      const fillColor = el.color || defaultColor;
      const colPoints = wobbleCircle(el.cx, el.cy, colSize / 2, opts);
      const d = pointsToPath(colPoints, true);
      parts.push(`<path d="${d}" fill="${fillColor}" stroke="${style.stroke}" stroke-width="${style.strokeWidth}" opacity="${style.opacity}" stroke-linecap="round" stroke-linejoin="round"/>`);
      break;
    }
  }

  if (rotationPrefix) {
    return `${rotationPrefix}\n${parts.join("\n")}\n${rotationSuffix}`;
  }
  return parts.join("\n");
}

/** Render a SketchData to a complete SVG string. */
export function renderSketchToSVG(sketch: SketchData): string {
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
    .map((el) => renderElement(sketch, el, defaultColor))
    .join("\n");

  const hasOffset = offsetX !== 0 || offsetY !== 0;
  const elementsGroup = hasOffset
    ? `<g transform="translate(${offsetX} ${offsetY})">\n${elementsSvg}\n</g>`
    : elementsSvg;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bgColor}"/>
${renderGrid(w, h, sketch.paper)}
${elementsGroup}
</svg>`;
}
