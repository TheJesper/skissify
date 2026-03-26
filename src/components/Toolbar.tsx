"use client";

import { useState } from "react";
import Link from "next/link";
import UserMenu from "./UserMenu";

interface ToolbarProps {
  onRedraw: () => void;
  onPrint: () => void;
  onSave?: () => Promise<string | null>;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  sketchSlug?: string | null;
}

export default function Toolbar({
  onRedraw,
  onPrint,
  onSave,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  sketchSlug,
}: ToolbarProps) {
  const [saving, setSaving] = useState(false);
  const [savedSlug, setSavedSlug] = useState<string | null>(sketchSlug ?? null);
  const [shareCopied, setShareCopied] = useState(false);

  const handleSave = async () => {
    if (!onSave || saving) return;
    setSaving(true);
    try {
      const slug = await onSave();
      if (slug) setSavedSlug(slug);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = () => {
    if (!savedSlug) return;
    const url = `${window.location.origin}/s/${savedSlug}`;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <header className="h-[52px] bg-neutral-950 border-b border-neutral-800 flex items-center px-4 shrink-0">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mr-6 group">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-400 transition-transform group-hover:rotate-12"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
        <span className="text-lg font-bold text-white tracking-tight">
          Skiss<span className="text-blue-400">ify</span>
        </span>
      </Link>

      {/* Undo/Redo with shortcut hints */}
      {(onUndo || onRedo) && (
        <div className="flex items-center gap-1 mr-4">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="group/btn flex items-center gap-1 px-2 py-1.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 rounded text-xs font-medium transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span className="hidden sm:inline">Undo</span>
            <kbd className="hidden lg:inline text-[9px] text-neutral-500 bg-neutral-700/50 px-1 rounded">^Z</kbd>
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="group/btn flex items-center gap-1 px-2 py-1.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 rounded text-xs font-medium transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
            </svg>
            <span className="hidden sm:inline">Redo</span>
            <kbd className="hidden lg:inline text-[9px] text-neutral-500 bg-neutral-700/50 px-1 rounded">^Y</kbd>
          </button>
        </div>
      )}

      {/* Gallery link */}
      <Link
        href="/gallery"
        className="text-xs text-neutral-500 hover:text-neutral-200 transition-colors mr-4"
      >
        Gallery
      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Share button */}
      {savedSlug && (
        <button
          onClick={handleShare}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all mr-2 ${
            shareCopied
              ? "bg-green-700 text-green-100"
              : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
          }`}
          title="Copy share link"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          {shareCopied ? "Copied!" : "Share"}
        </button>
      )}

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrint}
          className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs font-medium transition-colors"
          title="Print sketch"
        >
          Print
        </button>
        {onSave && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white rounded text-xs font-medium transition-colors"
            title="Save sketch (Ctrl+S)"
          >
            {saving ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Save
                <kbd className="hidden lg:inline text-[9px] text-green-300/60 bg-green-800/50 px-1 rounded">^S</kbd>
              </>
            )}
          </button>
        )}
        <button
          onClick={onRedraw}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium transition-colors"
          title="Redraw with new wobble"
        >
          Redraw
        </button>
        <div className="ml-2 border-l border-neutral-700 pl-3">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
