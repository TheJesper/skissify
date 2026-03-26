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
  drawSmoothCurve,
  WobbleOptions,
  Point,
} from "./wobble";

function getWobbleOpts(sketch: SketchData, el: SketchElement): WobbleOptions {
  return {
    amplitude: sketch.amplitude,
    waves: sketch.waves,
    humanness: sketch.humanness,
    seed: hashElement(el) + (sketch.sessionSeed || 0),
  };
}

function hashElement(el: SketchElement): number {
  const str = JSON.stringify(el);
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function setupStroke(
  ctx: CanvasRenderingContext2D,
  sketch: SketchData,
  el: SketchElement
): void {
  const tool = TOOL_STYLES[sketch.tool];
  ctx.strokeStyle = el.color || sketch.inkColor || "#111";
  ctx.lineWidth = el.strokeWidth || tool.lineWidth;
  ctx.globalAlpha = tool.opacity;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

function drawWobbleLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts: WobbleOptions
): void {
  const points = wobbleLine(x1, y1, x2, y2, opts);
  drawSmoothCurve(ctx, points);
}

function drawArrowHead(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  size: number
): void {
  ctx.beginPath();
  ctx.moveTo(
    x - size * Math.cos(angle - Math.PI / 6),
    y - size * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(x, y);
  ctx.lineTo(
    x - size * Math.cos(angle + Math.PI / 6),
    y - size * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  paper: PaperType
): void {
  if (paper === "yellow") {
    ctx.strokeStyle = "#e8e4c8";
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.4;
    const step = 25;
    for (let x = step; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = step; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  } else if (paper === "blueprint") {
    ctx.strokeStyle = "#2a5a8c";
    ctx.lineWidth = 0.3;
    ctx.globalAlpha = 0.5;
    const step = 20;
    for (let x = step; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = step; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
}

export function renderSketch(
  ctx: CanvasRenderingContext2D,
  sketch: SketchData,
  canvasWidth: number,
  canvasHeight: number
): void {
  const w = sketch.width || canvasWidth;
  const h = sketch.height || canvasHeight;

  // Background
  ctx.fillStyle = PAPER_COLORS[sketch.paper] || PAPER_COLORS.cream;
  ctx.fillRect(0, 0, w, h);

  // Grid for certain paper types
  drawGrid(ctx, w, h, sketch.paper);

  // Default ink color for blueprint
  const defaultColor =
    sketch.paper === "blueprint" ? "#a8c8e8" : sketch.inkColor || "#111";

  // Center elements on paper — compute bounding box and offset
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

  if (offsetX !== 0 || offsetY !== 0) {
    ctx.save();
    ctx.translate(offsetX, offsetY);
  }

  // Render each element
  for (const el of sketch.elements) {
    ctx.save();
    setupStroke(ctx, sketch, { ...el, color: el.color || defaultColor });
    const opts = getWobbleOpts(sketch, el);

    switch (el.type) {
      case "line":
        drawWobbleLine(ctx, el.x1, el.y1, el.x2, el.y2, opts);
        break;

      case "rect": {
        // Four wobble lines forming a rectangle
        drawWobbleLine(ctx, el.x, el.y, el.x + el.w, el.y, { ...opts, seed: opts.seed! + 1 });
        drawWobbleLine(ctx, el.x + el.w, el.y, el.x + el.w, el.y + el.h, { ...opts, seed: opts.seed! + 2 });
        drawWobbleLine(ctx, el.x + el.w, el.y + el.h, el.x, el.y + el.h, { ...opts, seed: opts.seed! + 3 });
        drawWobbleLine(ctx, el.x, el.y + el.h, el.x, el.y, { ...opts, seed: opts.seed! + 4 });
        break;
      }

      case "circle": {
        const points = wobbleCircle(el.cx, el.cy, el.r, opts);
        drawSmoothCurve(ctx, points, true);
        break;
      }

      case "arc": {
        const arcPoints = wobbleArc(
          el.cx,
          el.cy,
          el.r,
          el.startAngle,
          el.endAngle,
          opts
        );
        drawSmoothCurve(ctx, arcPoints);
        break;
      }

      case "arrow": {
        drawWobbleLine(ctx, el.x1, el.y1, el.x2, el.y2, opts);
        const angle = Math.atan2(el.y2 - el.y1, el.x2 - el.x1);
        drawArrowHead(ctx, el.x2, el.y2, angle, 10);
        break;
      }

      case "text": {
        const fontSize = el.fontSize || 14;
        ctx.font = `${fontSize}px 'Caveat', cursive`;
        ctx.fillStyle = el.color || defaultColor;
        ctx.globalAlpha = TOOL_STYLES[sketch.tool].opacity;
        // Slight rotation for hand-drawn feel
        const rotation = (Math.sin(hashElement(el)) * sketch.humanness * 2 * Math.PI) / 180;
        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.rotate(rotation);
        ctx.fillText(el.text, 0, 0);
        ctx.restore();
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
          drawWobbleLine(
            ctx,
            el.x1 + dx * pos,
            el.y1 + dy * pos,
            el.x1 + dx * segEnd,
            el.y1 + dy * segEnd,
            { ...opts, seed: opts.seed! + segIdx++ }
          );
          pos = segEnd + gapLen;
        }
        break;
      }

      case "dim": {
        // Dimension line with arrows and label
        const dimAngle = Math.atan2(el.y2 - el.y1, el.x2 - el.x1);
        drawWobbleLine(ctx, el.x1, el.y1, el.x2, el.y2, opts);
        drawArrowHead(ctx, el.x1, el.y1, dimAngle + Math.PI, 8);
        drawArrowHead(ctx, el.x2, el.y2, dimAngle, 8);
        // Extension lines
        const nx = -Math.sin(dimAngle) * 8;
        const ny = Math.cos(dimAngle) * 8;
        ctx.beginPath();
        ctx.moveTo(el.x1 + nx, el.y1 + ny);
        ctx.lineTo(el.x1 - nx, el.y1 - ny);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(el.x2 + nx, el.y2 + ny);
        ctx.lineTo(el.x2 - nx, el.y2 - ny);
        ctx.stroke();
        // Label — rotate text to follow the dim line, offset outward
        const midX = (el.x1 + el.x2) / 2;
        const midY = (el.y1 + el.y2) / 2;
        ctx.font = "12px 'Caveat', cursive";
        ctx.fillStyle = el.color || defaultColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        const isVertical = Math.abs(el.x2 - el.x1) < Math.abs(el.y2 - el.y1);
        if (isVertical) {
          ctx.save();
          ctx.translate(midX, midY);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText(el.label, 0, -6);
          ctx.restore();
        } else {
          ctx.fillText(el.label, midX, midY - 6);
        }
        break;
      }

      case "window": {
        // Wall line with perpendicular ticks showing window
        drawWobbleLine(ctx, el.x1, el.y1, el.x2, el.y2, opts);
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
          ctx.beginPath();
          ctx.moveTo(px - wnx, py - wny);
          ctx.lineTo(px + wnx, py + wny);
          ctx.stroke();
        }
        break;
      }

      case "door-symbol": {
        // Door swing arc
        const doorW = el.w || 80;
        const swing = el.swing || "left";
        const hingeX = swing === "left" ? el.x : el.x + doorW;
        const startA = swing === "left" ? -90 : 180;
        const endA = swing === "left" ? 0 : 270;
        // Draw the door line
        const doorEndX = swing === "left" ? el.x + doorW : el.x;
        drawWobbleLine(ctx, hingeX, el.y, doorEndX, el.y, opts);
        // Draw the swing arc
        const arcPts = wobbleArc(hingeX, el.y, doorW, startA, endA, opts);
        drawSmoothCurve(ctx, arcPts);
        break;
      }

      case "door-slide": {
        const dsW = el.w || 80;
        const dsDir = el.direction || "right";
        // Two parallel lines
        drawWobbleLine(ctx, el.x, el.y, el.x + dsW, el.y, { ...opts, seed: opts.seed! + 1 });
        drawWobbleLine(ctx, el.x, el.y + 4, el.x + dsW, el.y + 4, { ...opts, seed: opts.seed! + 2 });
        // Arrow indicating slide direction
        const arrowX1 = dsDir === "right" ? el.x + dsW * 0.3 : el.x + dsW * 0.7;
        const arrowX2 = dsDir === "right" ? el.x + dsW * 0.7 : el.x + dsW * 0.3;
        const arrowAngle = Math.atan2(0, arrowX2 - arrowX1);
        drawArrowHead(ctx, arrowX2, el.y + 2, arrowAngle, 6);
        break;
      }

      case "stair": {
        const stairSteps = el.steps || 8;
        const stepH = el.h / stairSteps;
        // Outline
        drawWobbleLine(ctx, el.x, el.y, el.x + el.w, el.y, { ...opts, seed: opts.seed! + 100 });
        drawWobbleLine(ctx, el.x, el.y + el.h, el.x + el.w, el.y + el.h, { ...opts, seed: opts.seed! + 101 });
        drawWobbleLine(ctx, el.x, el.y, el.x, el.y + el.h, { ...opts, seed: opts.seed! + 102 });
        drawWobbleLine(ctx, el.x + el.w, el.y, el.x + el.w, el.y + el.h, { ...opts, seed: opts.seed! + 103 });
        // Treads
        for (let i = 1; i < stairSteps; i++) {
          const sy = el.y + stepH * i;
          drawWobbleLine(ctx, el.x, sy, el.x + el.w, sy, { ...opts, seed: opts.seed! + i });
        }
        break;
      }

      case "opening": {
        // Gap in wall with small perpendicular returns
        const oLen = Math.sqrt((el.x2 - el.x1) ** 2 + (el.y2 - el.y1) ** 2);
        const odx = (el.x2 - el.x1) / oLen;
        const ody = (el.y2 - el.y1) / oLen;
        const returnLen = 6;
        const rnx = -ody * returnLen;
        const rny = odx * returnLen;
        // Left return
        ctx.beginPath();
        ctx.moveTo(el.x1 - rnx, el.y1 - rny);
        ctx.lineTo(el.x1 + rnx, el.y1 + rny);
        ctx.stroke();
        // Right return
        ctx.beginPath();
        ctx.moveTo(el.x2 - rnx, el.y2 - rny);
        ctx.lineTo(el.x2 + rnx, el.y2 + rny);
        ctx.stroke();
        break;
      }

      case "column": {
        const colSize = el.size || 10;
        ctx.fillStyle = el.color || defaultColor;
        const colPoints = wobbleCircle(el.cx, el.cy, colSize / 2, opts);
        ctx.beginPath();
        ctx.moveTo(colPoints[0].x, colPoints[0].y);
        for (let i = 1; i < colPoints.length; i++) {
          ctx.lineTo(colPoints[i].x, colPoints[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
    }

    ctx.restore();
  }

  if (offsetX !== 0 || offsetY !== 0) {
    ctx.restore();
  }
}

function computeBoundingBox(
  elements: SketchElement[]
): { minX: number; minY: number; maxX: number; maxY: number } | null {
  if (!elements || elements.length === 0) return null;

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

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
