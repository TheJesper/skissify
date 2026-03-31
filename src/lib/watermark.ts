/**
 * Watermark utilities for Skissify free-tier exports.
 *
 * Free users get a subtle "skissify.com" watermark stamped in the
 * bottom-right corner of PNG exports and as an SVG text node in
 * SVG exports. Pro users ("No watermark" feature) skip it entirely.
 */

/**
 * Stamp a watermark on an existing CanvasRenderingContext2D.
 * Call this AFTER `renderSketch()` to draw on top.
 *
 * @param ctx  - The 2D rendering context (canvas must be sized correctly)
 * @param w    - Canvas width in px
 * @param h    - Canvas height in px
 * @param dark - true for dark watermark (light paper), false for light (blueprint)
 */
export function stampCanvasWatermark(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  dark = true
): void {
  const label = "skissify.com";
  const fontSize = Math.max(11, Math.round(Math.min(w, h) * 0.018));
  ctx.save();

  ctx.font = `${fontSize}px "JetBrains Mono", "Courier New", monospace`;
  ctx.textBaseline = "bottom";
  ctx.textAlign = "right";

  // Pill background
  const metrics = ctx.measureText(label);
  const textW = metrics.width;
  const padX = fontSize * 0.7;
  const padY = fontSize * 0.4;
  const pillW = textW + padX * 2;
  const pillH = fontSize + padY * 2;
  const margin = Math.round(Math.min(w, h) * 0.015);
  const rx = margin;
  const ry = h - margin;
  const pillX = w - margin - pillW;
  const pillY = h - margin - pillH;
  const radius = Math.round(pillH * 0.35);

  // Background pill
  ctx.globalAlpha = dark ? 0.08 : 0.18;
  ctx.fillStyle = dark ? "#000000" : "#ffffff";
  ctx.beginPath();
  ctx.roundRect
    ? ctx.roundRect(pillX, pillY, pillW, pillH, radius)
    : roundRectFallback(ctx, pillX, pillY, pillW, pillH, radius);
  ctx.fill();

  // Text
  ctx.globalAlpha = dark ? 0.28 : 0.45;
  ctx.fillStyle = dark ? "#000000" : "#ffffff";
  ctx.fillText(label, w - margin - padX, h - margin - padY);

  ctx.restore();
}

/** Fallback for browsers that don't support `ctx.roundRect` (pre-2022). */
function roundRectFallback(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/**
 * Return an SVG `<text>` snippet to append inside the root `<svg>` element.
 * Positioned at the bottom-right corner.
 *
 * @param w    - SVG viewport width
 * @param h    - SVG viewport height
 * @param dark - true for dark watermark text, false for light (blueprint)
 */
export function svgWatermarkSnippet(w: number, h: number, dark = true): string {
  const fontSize = Math.max(11, Math.round(Math.min(w, h) * 0.018));
  const margin = Math.round(Math.min(w, h) * 0.015);
  const fillColor = dark ? "rgba(0,0,0,0.28)" : "rgba(255,255,255,0.45)";
  const bgColor = dark ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.18)";
  const label = "skissify.com";
  const approxTextW = label.length * fontSize * 0.61;
  const padX = fontSize * 0.7;
  const padY = fontSize * 0.4;
  const pillW = approxTextW + padX * 2;
  const pillH = fontSize + padY * 2;
  const pillX = w - margin - pillW;
  const pillY = h - margin - pillH;
  const rx = Math.round(pillH * 0.35);

  return `
  <g class="skissify-watermark">
    <rect x="${pillX.toFixed(1)}" y="${pillY.toFixed(1)}" width="${pillW.toFixed(1)}" height="${pillH.toFixed(1)}" rx="${rx}" ry="${rx}" fill="${bgColor}"/>
    <text x="${(w - margin - padX).toFixed(1)}" y="${(h - margin - padY).toFixed(1)}" text-anchor="end" dominant-baseline="auto" font-family="'JetBrains Mono','Courier New',monospace" font-size="${fontSize}" fill="${fillColor}">${label}</text>
  </g>`;
}
