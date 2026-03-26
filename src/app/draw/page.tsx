"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { SketchData } from "@/lib/types";
import { renderSketch } from "@/lib/renderer";
import { decodeSketchFromURL, encodeSketchToURL } from "@/lib/url-encoding";

export default function DrawPage() {
  const [sketch, setSketch] = useState<SketchData | null>(null);
  const [error, setError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Touch zoom/pan state
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const lastTouchDist = useRef<number | null>(null);
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      setError(true);
      return;
    }
    const data = decodeSketchFromURL(hash);
    if (data && data.elements) {
      setSketch(data);
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (!sketch) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = sketch.width || 900;
    const h = sketch.height || 650;
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    renderSketch(ctx, sketch, w, h);
  }, [sketch]);

  // Pinch-to-zoom and two-finger pan
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDist.current = Math.sqrt(dx * dx + dy * dy);
      lastTouchCenter.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const center = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };

      if (lastTouchDist.current !== null && lastTouchCenter.current !== null) {
        const scale = dist / lastTouchDist.current;
        setZoom((z) => Math.max(0.2, Math.min(5, z * scale)));
        setPan((p) => ({
          x: p.x + (center.x - lastTouchCenter.current!.x),
          y: p.y + (center.y - lastTouchCenter.current!.y),
        }));
      }

      lastTouchDist.current = dist;
      lastTouchCenter.current = center;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    lastTouchDist.current = null;
    lastTouchCenter.current = null;
  }, []);

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-400 gap-4">
        <p className="text-lg">No sketch data found in URL.</p>
        <Link
          href="/editor"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
        >
          Open Editor
        </Link>
      </div>
    );
  }

  if (!sketch) {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-950 text-neutral-400">
        Loading sketch...
      </div>
    );
  }

  const editUrl = encodeSketchToURL(sketch);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen bg-neutral-950 flex items-center justify-center overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        <canvas
          ref={canvasRef}
          width={sketch.width || 900}
          height={sketch.height || 650}
          className="rounded"
          style={{
            maxWidth: "100vw",
            maxHeight: "100vh",
            width: "auto",
            height: "auto",
          }}
        />
      </div>

      {/* Edit in Skissify link */}
      <a
        href={editUrl}
        className="absolute bottom-4 right-4 px-3 py-1.5 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded text-xs font-medium transition-colors backdrop-blur-sm border border-neutral-700/50"
      >
        Edit in Skissify
      </a>
    </div>
  );
}
