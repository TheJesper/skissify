"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { SketchData } from "@/lib/types";
import { renderSketch } from "@/lib/renderer";
import { renderSketchToSVG } from "@/lib/svg-renderer";
import { stampCanvasWatermark } from "@/lib/watermark";

interface Props {
  data: SketchData;
  slug: string;
  title: string;
}

export default function PublicSketchView({ data, slug, title }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState(data.sessionSeed ?? 0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [downloadedPng, setDownloadedPng] = useState(false);
  const [downloadedSvg, setDownloadedSvg] = useState(false);

  const w = data.width || 900;
  const h = data.height || 650;

  // Compute safe filename from title
  const safeFilename = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `skissify-${slug}`;

  const sketchWithSeed: SketchData = { ...data, sessionSeed: seed };

  // Render canvas whenever sketch or seed changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    renderSketch(ctx, sketchWithSeed, w, h);
  }, [sketchWithSeed, w, h, seed]);

  /** Redraw with a fresh random wobble seed */
  const handleRedraw = useCallback(() => {
    setSeed(Math.floor(Math.random() * 1_000_000));
  }, []);

  /** Download current canvas as PNG — always watermarked on public share page */
  const handleDownloadPng = useCallback(() => {
    // Render to a fresh off-screen canvas so we can stamp the watermark
    // without mutating the live displayed canvas.
    const offscreen = document.createElement("canvas");
    offscreen.width = w;
    offscreen.height = h;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;
    renderSketch(ctx, sketchWithSeed, w, h);
    // Public share page always shows watermark (owner pro status unknown)
    const dark = sketchWithSeed.paper !== "blueprint";
    stampCanvasWatermark(ctx, w, h, dark);
    offscreen.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${safeFilename}.png`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloadedPng(true);
      setTimeout(() => setDownloadedPng(false), 2000);
    }, "image/png");
  }, [sketchWithSeed, w, h, safeFilename]);

  /** Download as SVG — always watermarked on public share page */
  const handleDownloadSvg = useCallback(() => {
    try {
      const svgString = renderSketchToSVG(sketchWithSeed, true);
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${safeFilename}.svg`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloadedSvg(true);
      setTimeout(() => setDownloadedSvg(false), 2000);
    } catch (err) {
      console.error("SVG export failed:", err);
    }
  }, [sketchWithSeed, safeFilename]);

  /** Copy the public share URL */
  const handleCopyLink = useCallback(async () => {
    const url = `${window.location.origin}/s/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }, [slug]);

  /** Copy the embed iframe code */
  const embedCode = `<iframe src="${typeof window !== "undefined" ? window.location.origin : ""}/s/${slug}" width="${w}" height="${h + 60}" style="border:none;border-radius:12px;" title="${title}" loading="lazy"></iframe>`;

  const handleCopyEmbed = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = embedCode;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  }, [embedCode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "r" || e.key === "R") handleRedraw();
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "S") {
        e.preventDefault();
        handleDownloadPng();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "E") {
        e.preventDefault();
        handleDownloadSvg();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleRedraw, handleDownloadPng, handleDownloadSvg]);

  return (
    <div className="space-y-4">
      {/* Canvas */}
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={w}
          height={h}
          className="rounded-lg shadow-2xl"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {/* Download PNG */}
        <button
          onClick={handleDownloadPng}
          title="Download as PNG (Ctrl+Shift+S)"
          className="flex items-center gap-1.5 px-3 py-2 bg-[#eee8d5] hover:bg-[#ddd8c5] text-[#073642] rounded-lg text-sm font-medium transition-colors border border-[#93a1a1]/20"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          {downloadedPng ? "Saved!" : "PNG"}
        </button>

        {/* Download SVG */}
        <button
          onClick={handleDownloadSvg}
          title="Download as SVG (Ctrl+Shift+E)"
          className="flex items-center gap-1.5 px-3 py-2 bg-[#eee8d5] hover:bg-[#ddd8c5] text-[#073642] rounded-lg text-sm font-medium transition-colors border border-[#93a1a1]/20"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          {downloadedSvg ? "Saved!" : "SVG"}
        </button>

        {/* Redraw */}
        <button
          onClick={handleRedraw}
          title="Redraw with new wobble seed (R)"
          className="flex items-center gap-1.5 px-3 py-2 bg-[#eee8d5] hover:bg-[#ddd8c5] text-[#073642] rounded-lg text-sm font-medium transition-colors border border-[#93a1a1]/20"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Redraw
        </button>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          title="Copy share link"
          className="flex items-center gap-1.5 px-3 py-2 bg-[#eee8d5] hover:bg-[#ddd8c5] text-[#073642] rounded-lg text-sm font-medium transition-colors border border-[#93a1a1]/20"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          {copiedLink ? "Copied!" : "Copy Link"}
        </button>

        {/* Embed */}
        <button
          onClick={() => setShowEmbed((v) => !v)}
          title="Get embed code"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
            showEmbed
              ? "bg-[#268bd2]/10 border-[#268bd2]/30 text-[#268bd2]"
              : "bg-[#eee8d5] hover:bg-[#ddd8c5] text-[#073642] border-[#93a1a1]/20"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
          Embed
        </button>
      </div>

      {/* Embed panel */}
      {showEmbed && (
        <div className="max-w-2xl mx-auto bg-[#eee8d5] border border-[#93a1a1]/20 rounded-xl p-4">
          <p className="text-xs text-[#657b83] mb-2 font-medium uppercase tracking-wider">Embed on your website</p>
          <div className="flex gap-2">
            <input
              readOnly
              value={embedCode}
              className="flex-1 bg-[#fdf6e3] border border-[#93a1a1]/30 rounded px-3 py-2 text-xs text-[#073642] font-mono truncate"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              onClick={handleCopyEmbed}
              className="px-3 py-2 bg-[#268bd2] hover:bg-[#268bd2]/80 text-white rounded text-xs font-medium transition-colors shrink-0"
            >
              {copiedEmbed ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-[10px] text-[#93a1a1] mt-1.5">
            Paste this iframe into any HTML page to embed this sketch.
          </p>
        </div>
      )}

      {/* Keyboard hint */}
      <p className="text-center text-[#93a1a1] text-xs">
        Press <kbd className="px-1 py-0.5 bg-[#eee8d5] border border-[#93a1a1]/30 rounded text-[10px]">R</kbd> to redraw with new wobble variation
      </p>
    </div>
  );
}
