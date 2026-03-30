"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { SketchData } from "@/lib/types";
import { renderSketch } from "@/lib/renderer";
import { decodeSketchFromURL, encodeSketchToURL } from "@/lib/url-encoding";

export default function DrawPage() {
  const [sketch, setSketch] = useState<SketchData | null>(null);
  const [error, setError] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);
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

  /** Randomize the session seed and re-render (new wobble variation) */
  const handleRedraw = useCallback(() => {
    if (!sketch) return;
    setSketch((prev) =>
      prev ? { ...prev, sessionSeed: Math.floor(Math.random() * 1_000_000) } : prev
    );
  }, [sketch]);

  /** Download the canvas as PNG */
  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const title = sketch?.metadata?.title
      ? sketch.metadata.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
      : `skissify-${Date.now()}`;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.png`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 2000);
    }, "image/png");
  }, [sketch]);

  /** Copy current page URL to clipboard */
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = window.location.href;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }, []);

  // Keyboard shortcuts: S = download, R = redraw, C = copy link
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "s" || e.key === "S") handleDownload();
      if (e.key === "r" || e.key === "R") handleRedraw();
      if (e.key === "c" || e.key === "C") handleCopyLink();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleDownload, handleRedraw, handleCopyLink]);

  // Scroll-wheel zoom (desktop)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      setZoom((z) => Math.max(0.1, Math.min(8, z * factor)));
    };
    container.addEventListener("wheel", handler, { passive: false });
    return () => container.removeEventListener("wheel", handler);
  }, []);

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
      <div className="h-screen flex flex-col items-center justify-center text-[#657b83] gap-4" style={{ backgroundColor: "#fdf6e3" }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#93a1a1]">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
        <p className="text-lg font-medium text-[#073642]">No sketch found</p>
        <p className="text-sm text-[#93a1a1]">The link may be broken or incomplete.</p>
        <Link
          href="/editor"
          className="mt-2 px-6 py-3 bg-[#268bd2] hover:bg-[#268bd2]/80 text-white rounded-lg font-medium transition-colors"
        >
          Create a sketch
        </Link>
      </div>
    );
  }

  if (!sketch) {
    return (
      <div className="h-screen flex items-center justify-center text-[#657b83]" style={{ backgroundColor: "#fdf6e3" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#268bd2] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading sketch…</span>
        </div>
      </div>
    );
  }

  const editUrl = encodeSketchToURL(sketch);
  const sketchTitle = sketch.metadata?.title || "Untitled Sketch";

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#fdf6e3" }}
    >
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-4 py-2 shrink-0 z-10"
        style={{
          backgroundColor: "rgba(253,246,227,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(147,161,161,0.25)",
        }}
      >
        {/* Brand + title */}
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "#268bd2" }}
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            <span className="font-bold text-base hidden sm:inline" style={{ color: "#073642" }}>
              Skiss<span style={{ color: "#268bd2" }}>ify</span>
            </span>
          </Link>
          <span className="text-[#93a1a1] hidden sm:inline">/</span>
          <span
            className="text-sm font-medium truncate max-w-[160px] sm:max-w-xs"
            style={{ color: "#586e75" }}
            title={sketchTitle}
          >
            {sketchTitle}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Redraw */}
          <button
            onClick={handleRedraw}
            title="Redraw with new wobble (R)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors"
            style={{ backgroundColor: "#eee8d5", color: "#586e75" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd8c5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#eee8d5")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            <span className="hidden sm:inline">Redraw</span>
          </button>

          {/* Copy link */}
          <button
            onClick={handleCopyLink}
            title="Copy link (C)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors"
            style={{ backgroundColor: "#eee8d5", color: linkCopied ? "#2aa198" : "#586e75" }}
            onMouseEnter={(e) => { if (!linkCopied) e.currentTarget.style.backgroundColor = "#ddd8c5"; }}
            onMouseLeave={(e) => { if (!linkCopied) e.currentTarget.style.backgroundColor = "#eee8d5"; }}
          >
            {linkCopied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span className="hidden sm:inline">Copy link</span>
              </>
            )}
          </button>

          {/* Download PNG */}
          <button
            onClick={handleDownload}
            title="Download PNG (S)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors"
            style={{ backgroundColor: "#eee8d5", color: downloadDone ? "#2aa198" : "#586e75" }}
            onMouseEnter={(e) => { if (!downloadDone) e.currentTarget.style.backgroundColor = "#ddd8c5"; }}
            onMouseLeave={(e) => { if (!downloadDone) e.currentTarget.style.backgroundColor = "#eee8d5"; }}
          >
            {downloadDone ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="hidden sm:inline">Saved!</span>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="hidden sm:inline">PNG</span>
              </>
            )}
          </button>

          {/* Edit in Skissify (CTA) */}
          <a
            href={editUrl}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors"
            style={{ backgroundColor: "#268bd2", color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a7ab8")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#268bd2")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            <span>Edit</span>
          </a>
        </div>
      </header>

      {/* Canvas area */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center overflow-hidden relative"
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
            className="rounded shadow-md"
            style={{
              maxWidth: "100vw",
              maxHeight: "calc(100vh - 48px)",
              width: "auto",
              height: "auto",
            }}
          />
        </div>

        {/* Keyboard hint (desktop only, fades after a bit) */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded text-xs hidden lg:flex items-center gap-3 pointer-events-none"
          style={{
            backgroundColor: "rgba(7,54,66,0.55)",
            color: "#93a1a1",
            backdropFilter: "blur(4px)",
          }}
        >
          <span><kbd className="font-mono">S</kbd> save PNG</span>
          <span className="opacity-40">·</span>
          <span><kbd className="font-mono">R</kbd> redraw</span>
          <span className="opacity-40">·</span>
          <span><kbd className="font-mono">C</kbd> copy link</span>
          <span className="opacity-40">·</span>
          <span>scroll to zoom</span>
        </div>
      </div>
    </div>
  );
}
