"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { renderSketch } from "@/lib/renderer";
import { SketchData, PaperType } from "@/lib/types";

const demoSketch: SketchData = {
  paper: "cream",
  tool: "ballpoint",
  inkColor: "#222",
  amplitude: 0.6,
  waves: 0.7,
  humanness: 0.15,
  width: 640,
  height: 420,
  elements: [
    // Simple house outline
    { type: "rect", x: 80, y: 100, w: 220, h: 180, color: "#222" },
    { type: "rect", x: 350, y: 100, w: 220, h: 180, color: "#222" },
    { type: "line", x1: 80, y1: 195, x2: 570, y2: 195, color: "#222" },
    { type: "text", x: 140, y: 165, text: "Living Room", fontSize: 18, color: "#555" },
    { type: "text", x: 410, y: 165, text: "Kitchen", fontSize: 18, color: "#555" },
    { type: "door-symbol", x: 250, y: 195, w: 55, swing: "right", color: "#8B4513" },
    { type: "window", x1: 130, y1: 100, x2: 250, y2: 100, color: "#336" },
    { type: "window", x1: 400, y1: 100, x2: 520, y2: 100, color: "#336" },
    { type: "dim", x1: 80, y1: 80, x2: 570, y2: 80, label: "9.8 m", color: "#8B4513" },
    { type: "circle", cx: 460, cy: 250, r: 25, color: "#888" },
    { type: "text", x: 448, y: 256, text: "tbl", fontSize: 12, color: "#888" },
    { type: "arrow", x1: 300, y1: 330, x2: 300, y2: 290, color: "#666" },
    { type: "text", x: 268, y: 355, text: "entrance", fontSize: 14, color: "#666" },
  ],
};

const paperOptions: { key: PaperType; label: string; bg: string }[] = [
  { key: "cream", label: "Cream", bg: "#f5f0e0" },
  { key: "white", label: "White", bg: "#ffffff" },
  { key: "blueprint", label: "Blueprint", bg: "#1a3a5c" },
];

export default function MiniCanvasDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paper, setPaper] = useState<PaperType>("cream");
  const [amplitude, setAmplitude] = useState(0.6);
  const [redrawKey, setRedrawKey] = useState(0);

  const sketch: SketchData = {
    ...demoSketch,
    paper,
    amplitude,
    inkColor: paper === "blueprint" ? "#a8c8e8" : "#222",
    elements: demoSketch.elements.map((el) => ({
      ...el,
      color:
        paper === "blueprint"
          ? el.type === "window"
            ? "#6a9ac4"
            : el.type === "dim"
            ? "#6a9ac4"
            : el.type === "door-symbol"
            ? "#8ab4d8"
            : "#c8ddf0"
          : (el as unknown as Record<string, unknown>).color as string,
    })) as SketchData["elements"],
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 640;
    canvas.height = 420;
    ctx.clearRect(0, 0, 640, 420);
    renderSketch(ctx, sketch, 640, 420);
  }, [sketch, redrawKey]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800/60 overflow-hidden shadow-2xl">
      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-4 px-5 py-3 bg-neutral-900 border-b border-neutral-800/50">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
            Paper
          </span>
          {paperOptions.map((p) => (
            <button
              key={p.key}
              onClick={() => { setPaper(p.key); setRedrawKey((k) => k + 1); }}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                paper === p.key
                  ? "ring-2 ring-blue-500 bg-neutral-700 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-sm mr-1 align-middle border border-neutral-600"
                style={{ backgroundColor: p.bg }}
              />
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
            Wobble
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={amplitude}
            onChange={(e) => {
              setAmplitude(parseFloat(e.target.value));
              setRedrawKey((k) => k + 1);
            }}
            className="w-24 h-1 accent-blue-500"
          />
          <span className="text-[10px] text-neutral-500 font-mono w-6">
            {amplitude.toFixed(1)}
          </span>
        </div>
        <button
          onClick={() => setRedrawKey((k) => k + 1)}
          className="ml-auto px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors"
        >
          Redraw
        </button>
      </div>

      {/* Canvas */}
      <div className="flex items-center justify-center p-4 bg-neutral-800">
        <canvas
          ref={canvasRef}
          width={640}
          height={420}
          className="rounded shadow-lg max-w-full h-auto"
        />
      </div>
    </div>
  );
}
