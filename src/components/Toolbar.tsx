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

  return (
    <header className="h-[52px] bg-neutral-950 border-b border-neutral-800 flex items-center px-4 shrink-0">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mr-6">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-400"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
        <span className="text-lg font-bold text-white tracking-tight">
          Skiss<span className="text-blue-400">ify</span>
        </span>
        <span className="text-[10px] text-neutral-500 font-mono ml-1">
          v2.0
        </span>
      </Link>

      {/* Undo/Redo */}
      {(onUndo || onRedo) && (
        <div className="flex items-center gap-1 mr-4">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="px-2 py-1.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 rounded text-xs font-medium transition-colors"
            title="Undo (Ctrl+Z)"
          >
            Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="px-2 py-1.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 rounded text-xs font-medium transition-colors"
            title="Redo (Ctrl+Y)"
          >
            Redo
          </button>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Share link */}
      {savedSlug && (
        <button
          onClick={() => {
            const url = `${window.location.origin}/s/${savedSlug}`;
            navigator.clipboard.writeText(url);
          }}
          className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs font-medium transition-colors mr-2"
          title="Copy share link"
        >
          Share Link
        </button>
      )}

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrint}
          className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs font-medium transition-colors"
        >
          Print
        </button>
        {onSave && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-1.5 bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white rounded text-xs font-medium transition-colors"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        )}
        <button
          onClick={onRedraw}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium transition-colors"
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
