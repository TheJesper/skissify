"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { renderSketch } from "@/lib/renderer";
import { SketchData } from "@/lib/types";

interface GalleryCardProps {
  name: string;
  description: string;
  paper: string;
  tool: string;
  sketch: SketchData;
}

/** Renders a live canvas thumbnail of the actual preset sketch. */
function PresetThumbnail({ sketch }: { sketch: SketchData }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasRendered = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Thumbnail dimensions (2× for HiDPI)
    const THUMB_W = 400;
    const THUMB_H = 200;
    const DPR = 2;
    canvas.width = THUMB_W * DPR;
    canvas.height = THUMB_H * DPR;
    canvas.style.width = `${THUMB_W}px`;
    canvas.style.height = `${THUMB_H}px`;
    ctx.scale(DPR, DPR);

    // Fit the sketch inside the thumbnail with padding
    const srcW = sketch.width ?? 900;
    const srcH = sketch.height ?? 650;
    const PAD = 8;
    const scale = Math.min((THUMB_W - PAD * 2) / srcW, (THUMB_H - PAD * 2) / srcH);
    const offX = PAD + ((THUMB_W - PAD * 2) - srcW * scale) / 2;
    const offY = PAD + ((THUMB_H - PAD * 2) - srcH * scale) / 2;

    ctx.save();
    ctx.translate(offX, offY);
    ctx.scale(scale, scale);
    renderSketch(ctx, sketch, srcW, srcH);
    ctx.restore();
  }, [sketch]);

  useEffect(() => {
    if (hasRendered.current) return;
    hasRendered.current = true;
    // Defer slightly so the DOM is ready
    const raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain"
      aria-hidden="true"
    />
  );
}

export default function GalleryCard({
  name,
  description,
  paper,
  tool,
  sketch,
}: GalleryCardProps) {
  return (
    <Link
      href={`/editor?preset=${encodeURIComponent(name)}`}
      className="group block bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-blue-600/50 transition-all hover:shadow-lg hover:shadow-blue-600/5"
    >
      {/* Live canvas preview */}
      <div className="h-44 overflow-hidden relative">
        <PresetThumbnail sketch={sketch} />
        <div className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded bg-black/30 text-white/60 font-mono backdrop-blur-sm">
          {tool} / {paper}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors capitalize">
          {name}
        </h3>
        <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
