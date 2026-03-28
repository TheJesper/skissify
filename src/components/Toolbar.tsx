"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import type { SketchData } from "@/lib/types";
import { getShareableURL, getDrawURL } from "@/lib/url-encoding";

interface ToolbarProps {
  onRedraw: () => void;
  onPrint: () => void;
  onDownload?: () => void;
  onDownloadSVG?: () => void;
  onImportJSON?: (data: SketchData) => void;
  onNewSketch?: () => void;
  onSave?: () => Promise<string | null>;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  sketchSlug?: string | null;
  sketch?: SketchData;
  /** ISO timestamp of last autosave, or null */
  autosaveSavedAt?: string | null;
}

export default function Toolbar({
  onRedraw,
  onPrint,
  onDownload,
  onDownloadSVG,
  onImportJSON,
  onNewSketch,
  onSave,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  sketchSlug,
  sketch,
  autosaveSavedAt,
}: ToolbarProps) {
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);
  const [savedSlug, setSavedSlug] = useState<string | null>(sketchSlug ?? null);
  const [shareCopied, setShareCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showNewConfirm, setShowNewConfirm] = useState(false);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const overflowRef = useRef<HTMLDivElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

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

  const handleShareLink = useCallback(() => {
    if (!sketch) return;
    setShowShareDialog(true);
  }, [sketch]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Link copied to clipboard!");
  }, [showToast]);

  const handleMakePrivate = useCallback(() => {
    setShowProModal(true);
  }, []);

  const handleImportClick = useCallback(() => {
    importInputRef.current?.click();
  }, []);

  const handleImportFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !onImportJSON) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const text = ev.target?.result as string;
          const data = JSON.parse(text) as SketchData;
          if (!data || !Array.isArray(data.elements)) {
            showToast("Invalid JSON — missing elements array");
            return;
          }
          onImportJSON(data);
          showToast("Sketch imported ✓");
        } catch {
          showToast("Failed to parse JSON file");
        }
        // Reset input so same file can be re-imported
        if (importInputRef.current) importInputRef.current.value = "";
      };
      reader.readAsText(file);
    },
    [onImportJSON, showToast]
  );

  const handleExportJSON = useCallback(() => {
    if (!sketch) return;
    const json = JSON.stringify(sketch, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const filename = sketchSlug
      ? `skissify-${sketchSlug}.json`
      : `skissify-${new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-")}.json`;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [sketch, sketchSlug]);

  const handleCopyJSON = useCallback(() => {
    if (!sketch) return;
    const json = JSON.stringify(sketch, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      showToast("JSON copied to clipboard!");
    }).catch(() => {
      showToast("Failed to copy to clipboard");
    });
  }, [sketch, showToast]);

  // Close overflow menu on outside click
  useEffect(() => {
    if (!showOverflowMenu) return;
    const handler = (e: MouseEvent) => {
      if (overflowRef.current && !overflowRef.current.contains(e.target as Node)) {
        setShowOverflowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showOverflowMenu]);

  // Global keyboard shortcuts: ? opens shortcuts panel; Ctrl+Shift+J exports JSON
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLInputElement;
      if (e.key === "?" && !isInput) {
        setShowShortcuts((v) => !v);
      }
      if (e.key === "Escape") {
        setShowShortcuts(false);
        setShowShareDialog(false);
        setShowNewConfirm(false);
      }
      // Ctrl+Shift+J → Export as JSON
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "J") {
        e.preventDefault();
        handleExportJSON();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleExportJSON]);

  return (
    <>
    <header className="h-[52px] border-b flex items-center px-4 shrink-0" style={{ backgroundColor: "#eee8d5", borderColor: "#93a1a1" }}>
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
          className="transition-transform group-hover:rotate-12"
          style={{ color: "#268bd2" }}
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
        <span className="text-lg font-bold tracking-tight" style={{ color: "#073642" }}>
          Skiss<span style={{ color: "#268bd2" }}>ify</span>
        </span>
      </Link>

      {/* Undo/Redo with shortcut hints */}
      {(onUndo || onRedo) && (
        <div className="flex items-center gap-1 mr-4">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="group/btn flex items-center gap-1 px-2 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] disabled:opacity-30 disabled:cursor-not-allowed text-[#586e75] rounded text-xs font-medium transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span className="hidden sm:inline">Undo</span>
            <kbd className="hidden lg:inline text-[9px] text-[#93a1a1] bg-[#eee8d5]/50 px-1 rounded">^Z</kbd>
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="group/btn flex items-center gap-1 px-2 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] disabled:opacity-30 disabled:cursor-not-allowed text-[#586e75] rounded text-xs font-medium transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
            </svg>
            <span className="hidden sm:inline">Redo</span>
            <kbd className="hidden lg:inline text-[9px] text-[#93a1a1] bg-[#eee8d5]/50 px-1 rounded">^Y</kbd>
          </button>
        </div>
      )}

      {/* Gallery link */}
      <Link
        href="/gallery"
        className="text-xs text-[#93a1a1] hover:text-[#073642] transition-colors mr-4"
      >
        Gallery
      </Link>

      {/* Autosave indicator */}
      {autosaveSavedAt && (
        <span
          className="hidden lg:flex items-center gap-1 text-[10px] text-[#93a1a1] mr-2"
          title={`Autosaved at ${new Date(autosaveSavedAt).toLocaleTimeString()}`}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Saved
        </span>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Share button */}
      {savedSlug && (
        <button
          onClick={handleShare}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all mr-2 ${
            shareCopied
              ? "bg-[#859900] text-[#fdf6e3]"
              : "bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75]"
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
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* New Sketch -- desktop only */}
        {onNewSketch && (
          <button
            onClick={() => setShowNewConfirm(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded text-xs font-medium transition-colors"
            title="Start a new blank sketch"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            New
          </button>
        )}

        {/* Share Link -- always visible */}
        {sketch && (
          <button
            onClick={handleShareLink}
            className="px-2.5 md:px-3 py-1.5 bg-[#6c71c4] hover:bg-[#6c71c4]/80 text-[#073642] rounded text-xs font-medium transition-colors"
            title="Share as URL (no login needed)"
          >
            <span className="hidden sm:inline">Share Link</span>
            <span className="sm:hidden">Link</span>
          </button>
        )}

        {/* Desktop-only buttons: Make Private, PNG, SVG, JSON, Import, Print */}
        <button
          onClick={handleMakePrivate}
          className="hidden sm:block px-3 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded text-xs font-medium transition-colors"
          title="Make this sketch private"
        >
          Make Private
        </button>

        {onDownload && (
          <button
            onClick={onDownload}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded text-xs font-medium transition-colors"
            title="Download as PNG (Ctrl+Shift+S)"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            PNG
          </button>
        )}
        {onDownloadSVG && (
          <button
            onClick={onDownloadSVG}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded text-xs font-medium transition-colors"
            title="Download as SVG (Ctrl+Shift+E)"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            SVG
          </button>
        )}
        {sketch && (
          <button
            onClick={handleExportJSON}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded text-xs font-medium transition-colors"
            title="Download as JSON (Ctrl+Shift+J)"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            JSON
          </button>
        )}
        {sketch && (
          <button
            onClick={handleCopyJSON}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded text-xs font-medium transition-colors"
            title="Copy JSON to clipboard"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy
          </button>
        )}
        {onImportJSON && (
          <>
            <input
              ref={importInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleImportFile}
            />
            <button
              onClick={handleImportClick}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded text-xs font-medium transition-colors"
              title="Import sketch from JSON file"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Import
            </button>
          </>
        )}
        <button
          onClick={onPrint}
          className="hidden sm:block px-3 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded text-xs font-medium transition-colors"
          title="Print sketch"
        >
          Print
        </button>

        {/* Mobile overflow menu -- visible only on small screens */}
        <div ref={overflowRef} className="relative sm:hidden">
          <button
            onClick={() => setShowOverflowMenu((v) => !v)}
            className="px-2.5 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded text-xs font-bold transition-colors"
            title="More actions"
            aria-label="More actions"
          >
            ...
          </button>
          {showOverflowMenu && (
            <div
              className="absolute right-0 top-full mt-1 w-44 rounded-lg shadow-lg border py-1 z-50"
              style={{ backgroundColor: "#fdf6e3", borderColor: "#93a1a1" }}
            >
              {onDownload && (
                <button onClick={() => { onDownload(); setShowOverflowMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-[#586e75] hover:bg-[#eee8d5] transition-colors">
                  Download PNG
                </button>
              )}
              {onDownloadSVG && (
                <button onClick={() => { onDownloadSVG(); setShowOverflowMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-[#586e75] hover:bg-[#eee8d5] transition-colors">
                  Download SVG
                </button>
              )}
              {sketch && (
                <button onClick={() => { handleExportJSON(); setShowOverflowMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-[#586e75] hover:bg-[#eee8d5] transition-colors">
                  Export JSON
                </button>
              )}
              {sketch && (
                <button onClick={() => { handleCopyJSON(); setShowOverflowMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-[#586e75] hover:bg-[#eee8d5] transition-colors">
                  Copy JSON
                </button>
              )}
              <button onClick={() => { onPrint(); setShowOverflowMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-[#586e75] hover:bg-[#eee8d5] transition-colors">
                Print
              </button>
              <button onClick={() => { handleMakePrivate(); setShowOverflowMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-[#586e75] hover:bg-[#eee8d5] transition-colors">
                Make Private
              </button>
              {onImportJSON && (
                <button onClick={() => { handleImportClick(); setShowOverflowMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-[#586e75] hover:bg-[#eee8d5] transition-colors">
                  Import JSON
                </button>
              )}
              {onNewSketch && (
                <button onClick={() => { setShowNewConfirm(true); setShowOverflowMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-[#586e75] hover:bg-[#eee8d5] transition-colors">
                  New Sketch
                </button>
              )}
            </div>
          )}
        </div>

        {/* Essential buttons -- always visible */}
        {onSave && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#859900] hover:bg-[#859900]/80 disabled:opacity-50 text-[#073642] rounded text-xs font-medium transition-colors"
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
                <kbd className="hidden lg:inline text-[9px] text-[#fdf6e3]/60 bg-[#859900]/30 px-1 rounded">^S</kbd>
              </>
            )}
          </button>
        )}
        <button
          onClick={onRedraw}
          className="px-3 py-1.5 bg-[#268bd2] hover:bg-[#268bd2]/80 text-[#073642] rounded text-xs font-medium transition-colors"
          title="Redraw with new wobble"
        >
          Redraw
        </button>
        <button
          onClick={() => setShowShortcuts(true)}
          className="hidden sm:block px-2.5 py-1.5 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#657b83] hover:text-[#073642] rounded text-xs font-medium transition-colors"
          title="Keyboard shortcuts (?)"
        >
          ?
        </button>
        <div className="ml-2 border-l border-[#93a1a1] pl-3">
          <UserMenu />
        </div>
      </div>
    </header>

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 text-sm font-medium rounded-lg shadow-lg" style={{ backgroundColor: "#859900", color: "#073642" }}>
          {toast}
        </div>
      )}

      {/* Share Dialog */}
      {showShareDialog && sketch && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowShareDialog(false)}>
          <div className="bg-[#fdf6e3] border border-[#93a1a1] rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-[#073642] mb-4">Share Sketch</h3>

            <div className="mb-4">
              <label className="text-xs text-[#657b83] uppercase tracking-wider mb-1 block">Editor Link (editable)</label>
              <div className="flex gap-2">
                <input type="text" readOnly value={getShareableURL(sketch)} className="flex-1 bg-[#073642] border border-[#93a1a1] rounded px-3 py-2 text-xs text-[#586e75] font-mono truncate" />
                <button onClick={() => copyToClipboard(getShareableURL(sketch))} className="px-3 py-2 bg-[#268bd2] hover:bg-[#268bd2]/80 text-[#073642] rounded text-xs font-medium transition-colors shrink-0">Copy</button>
              </div>
              <p className="text-[10px] text-[#93a1a1] mt-1">Link: {getShareableURL(sketch).length} chars</p>
            </div>

            <div className="mb-4">
              <label className="text-xs text-[#657b83] uppercase tracking-wider mb-1 block">View-Only Link (minimal)</label>
              <div className="flex gap-2">
                <input type="text" readOnly value={getDrawURL(sketch)} className="flex-1 bg-[#073642] border border-[#93a1a1] rounded px-3 py-2 text-xs text-[#586e75] font-mono truncate" />
                <button onClick={() => copyToClipboard(getDrawURL(sketch))} className="px-3 py-2 bg-[#268bd2] hover:bg-[#268bd2]/80 text-[#073642] rounded text-xs font-medium transition-colors shrink-0">Copy</button>
              </div>
              <p className="text-[10px] text-[#93a1a1] mt-1">Link: {getDrawURL(sketch).length} chars</p>
            </div>

            {savedSlug && (
              <div className="mb-4">
                <label className="text-xs text-[#657b83] uppercase tracking-wider mb-1 block">Saved Sketch Link</label>
                <div className="flex gap-2">
                  <input type="text" readOnly value={`${typeof window !== "undefined" ? window.location.origin : ""}/s/${savedSlug}`} className="flex-1 bg-[#073642] border border-[#93a1a1] rounded px-3 py-2 text-xs text-[#586e75] font-mono truncate" />
                  <button onClick={() => copyToClipboard(`${window.location.origin}/s/${savedSlug}`)} className="px-3 py-2 bg-[#268bd2] hover:bg-[#268bd2]/80 text-[#073642] rounded text-xs font-medium transition-colors shrink-0">Copy</button>
                </div>
              </div>
            )}

            <div className="mt-4 p-3 bg-[#268bd2]/10 border border-[#268bd2]/30 rounded-lg">
              <p className="text-sm text-[#268bd2]">Want to control who sees this? <Link href="/auth/signin" className="underline font-medium text-[#268bd2] hover:text-[#268bd2]">Go Pro for &euro;2/mo</Link></p>
              <p className="text-[11px] text-[#93a1a1] mt-1">Pro users can toggle &quot;Anyone with link&quot; vs &quot;Only selected users&quot;</p>
            </div>

            <button onClick={() => setShowShareDialog(false)} className="mt-4 w-full px-4 py-2 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded-lg text-sm font-medium transition-colors">Close</button>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Panel */}
      {showShortcuts && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowShortcuts(false)}>
          <div className="bg-[#fdf6e3] border border-[#93a1a1] rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#073642]">Keyboard Shortcuts</h3>
              <button onClick={() => setShowShortcuts(false)} className="text-[#93a1a1] hover:text-[#586e75] text-xl leading-none">×</button>
            </div>
            <div className="space-y-1">
              {[
                { keys: ["Ctrl", "Z"], desc: "Undo" },
                { keys: ["Ctrl", "Y"], desc: "Redo" },
                { keys: ["Ctrl", "S"], desc: "Save sketch" },
                { keys: ["Ctrl", "Shift", "S"], desc: "Download as PNG" },
                { keys: ["Ctrl", "Shift", "E"], desc: "Download as SVG" },
                { keys: ["Ctrl", "Shift", "J"], desc: "Export as JSON" },
                { keys: ["Ctrl", "C"], desc: "Copy selected elements" },
                { keys: ["Ctrl", "V"], desc: "Paste elements" },
                { keys: ["Ctrl", "D"], desc: "Duplicate selected" },
                { keys: ["Ctrl", "A"], desc: "Select all elements" },
                { keys: ["R"], desc: "Rotate selected 15° clockwise" },
                { keys: ["Shift", "R"], desc: "Rotate selected 15° counter-clockwise" },
                { keys: ["↑ ↓ ← →"], desc: "Nudge selected 1px" },
                { keys: ["Shift", "↑ ↓ ← →"], desc: "Nudge selected 10px" },
                { keys: ["Del / ⌫"], desc: "Delete selected elements" },
                { keys: ["Esc"], desc: "Deselect all" },
                { keys: ["Double-click"], desc: "Edit text / label inline" },
                { keys: ["Shift+click"], desc: "Add to selection" },
                { keys: ["Drag (empty)"], desc: "Box-select elements" },
                { keys: ["Alt+drag"], desc: "Pan canvas" },
                { keys: ["Scroll"], desc: "Zoom toward cursor" },
                { keys: ["0"], desc: "Fit / reset view" },
                { keys: ["?"], desc: "Toggle this panel" },
              ].map(({ keys, desc }) => (
                <div key={desc} className="flex items-center justify-between py-1.5 border-b border-[#eee8d5] last:border-0">
                  <span className="text-sm text-[#586e75]">{desc}</span>
                  <div className="flex items-center gap-1">
                    {keys.map((k) => (
                      <kbd key={k} className="text-[11px] font-mono text-[#586e75] bg-[#eee8d5] border border-[#93a1a1] rounded px-1.5 py-0.5">{k}</kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowShortcuts(false)} className="mt-5 w-full px-4 py-2 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded-lg text-sm font-medium transition-colors">Close</button>
          </div>
        </div>
      )}

      {/* New Sketch Confirm Modal */}
      {showNewConfirm && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowNewConfirm(false)}>
          <div className="bg-[#fdf6e3] border border-[#93a1a1] rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 bg-[#cb4b16]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#cb4b16]">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#073642] mb-2">Start a new sketch?</h3>
            <p className="text-sm text-[#657b83] mb-6">Your current work will be discarded. Make sure to save or export first if you want to keep it.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewConfirm(false)}
                className="flex-1 px-4 py-2 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#586e75] rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowNewConfirm(false);
                  onNewSketch?.();
                }}
                className="flex-1 px-4 py-2 bg-[#cb4b16] hover:bg-[#cb4b16]/80 text-[#fdf6e3] rounded-lg text-sm font-medium transition-colors"
              >
                New Sketch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pro Upsell Modal */}
      {showProModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowProModal(false)}>
          <div className="bg-[#fdf6e3] border border-[#93a1a1] rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-[#268bd2]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#268bd2]"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>

            {!session ? (
              <>
                <h3 className="text-xl font-bold text-[#073642] mb-2">Sign up for Skissify Pro</h3>
                <p className="text-[#657b83] mb-2">Save private sketches that only you can see.</p>
                <p className="text-2xl font-bold text-[#073642] mb-1">&euro;2<span className="text-sm font-normal text-[#93a1a1]">/month</span></p>
                <p className="text-xs text-[#93a1a1] mb-6">Less than a coffee. Cancel anytime. Early adopter price -- locked in forever.</p>
                <Link href="/auth/signin" className="block w-full px-6 py-3 bg-[#268bd2] hover:bg-[#268bd2]/80 text-[#073642] font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25 mb-3">Sign Up</Link>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#073642] mb-2">Upgrade to Pro</h3>
                <p className="text-[#657b83] mb-2">Make sketches private so only you control access.</p>
                <p className="text-2xl font-bold text-[#073642] mb-1">&euro;2<span className="text-sm font-normal text-[#93a1a1]">/month</span></p>
                <p className="text-xs text-[#93a1a1] mb-6">Less than a coffee. Cancel anytime. Early adopter price -- locked in forever.</p>
                <Link href="/pricing" className="block w-full px-6 py-3 bg-[#268bd2] hover:bg-[#268bd2]/80 text-[#073642] font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25 mb-3">Upgrade to Pro</Link>
              </>
            )}

            <button onClick={() => setShowProModal(false)} className="w-full px-4 py-2 bg-[#eee8d5] hover:bg-[#fdf6e3] text-[#657b83] rounded-lg text-sm font-medium transition-colors">Maybe later</button>
          </div>
        </div>
      )}
    </>
  );
}
