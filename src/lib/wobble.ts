/**
 * Wobble / hand-drawn line algorithms.
 * These functions add organic imperfection to geometric shapes.
 */

/** Seeded random for reproducible wobble per element */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export interface WobbleOptions {
  amplitude: number; // 0-1, how far lines deviate
  waves: number; // 0-1, frequency of wobble
  humanness: number; // 0-1, randomness factor
  seed?: number;
}

export interface Point {
  x: number;
  y: number;
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Generate wobble points along a line from (x1,y1) to (x2,y2).
 */
export function wobbleLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts: WobbleOptions
): Point[] {
  const len = distance(x1, y1, x2, y2);
  if (len < 1) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];

  const rand = seededRandom(opts.seed ?? Math.floor(x1 * 100 + y1 * 37 + x2 * 13 + y2 * 7));
  const amp = opts.amplitude * 3; // scale to pixels
  const steps = Math.max(8, Math.floor(len * (0.1 + opts.waves * 0.15)));
  const points: Point[] = [];

  // Slight humanness offset to start/end
  const hOff = opts.humanness * 2;
  const sx = x1 + (rand() - 0.5) * hOff;
  const sy = y1 + (rand() - 0.5) * hOff;
  const ex = x2 + (rand() - 0.5) * hOff;
  const ey = y2 + (rand() - 0.5) * hOff;

  // Normal direction
  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const bx = lerp(sx, ex, t);
    const by = lerp(sy, ey, t);

    // Wobble offset (zero at endpoints for clean joins)
    const edgeFade = Math.sin(t * Math.PI); // fades to 0 at start/end
    const wave = Math.sin(t * Math.PI * (1 + opts.waves * 4));
    const offset =
      wave * amp * edgeFade * (0.5 + rand() * opts.humanness * 0.5);

    points.push({
      x: bx + nx * offset,
      y: by + ny * offset,
    });
  }

  return points;
}

/**
 * Generate wobble points for a circle.
 */
export function wobbleCircle(
  cx: number,
  cy: number,
  r: number,
  opts: WobbleOptions
): Point[] {
  const rand = seededRandom(opts.seed ?? Math.floor(cx * 100 + cy * 37 + r * 13));
  const circumference = 2 * Math.PI * r;
  const steps = Math.max(24, Math.floor(circumference * (0.1 + opts.waves * 0.1)));
  const amp = opts.amplitude * 2.5;
  const points: Point[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * Math.PI * 2;
    const wave = Math.sin(t * Math.PI * (3 + opts.waves * 6));
    const offset = wave * amp * (0.5 + rand() * opts.humanness * 0.5);
    const rr = r + offset;

    points.push({
      x: cx + Math.cos(angle) * rr,
      y: cy + Math.sin(angle) * rr,
    });
  }

  return points;
}

/**
 * Generate wobble points for an arc.
 */
export function wobbleArc(
  cx: number,
  cy: number,
  r: number,
  startAngleDeg: number,
  endAngleDeg: number,
  opts: WobbleOptions
): Point[] {
  const rand = seededRandom(opts.seed ?? Math.floor(cx * 100 + cy * 37 + r * 13 + startAngleDeg));
  const startAngle = (startAngleDeg * Math.PI) / 180;
  const endAngle = (endAngleDeg * Math.PI) / 180;
  const arcLength = Math.abs(endAngle - startAngle) * r;
  const steps = Math.max(12, Math.floor(arcLength * (0.1 + opts.waves * 0.1)));
  const amp = opts.amplitude * 2;
  const points: Point[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = lerp(startAngle, endAngle, t);
    const edgeFade = Math.sin(t * Math.PI);
    const wave = Math.sin(t * Math.PI * (2 + opts.waves * 4));
    const offset = wave * amp * edgeFade * (0.5 + rand() * opts.humanness * 0.5);
    const rr = r + offset;

    points.push({
      x: cx + Math.cos(angle) * rr,
      y: cy + Math.sin(angle) * rr,
    });
  }

  return points;
}

/**
 * Draw a smooth curve through points on a canvas context.
 */
export function drawSmoothCurve(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  closed: boolean = false
): void {
  if (points.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  if (points.length === 2) {
    ctx.lineTo(points[1].x, points[1].y);
    ctx.stroke();
    return;
  }

  // Use quadratic curves for smoothness
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
  }

  if (closed) {
    const midX = (points[points.length - 1].x + points[0].x) / 2;
    const midY = (points[points.length - 1].y + points[0].y) / 2;
    ctx.quadraticCurveTo(
      points[points.length - 1].x,
      points[points.length - 1].y,
      midX,
      midY
    );
    ctx.closePath();
  } else {
    const last = points[points.length - 1];
    ctx.lineTo(last.x, last.y);
  }

  ctx.stroke();
}
