"use client";

import { useState, useCallback, useEffect } from "react";
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

  // Global keyboard shortcut: ? opens shortcuts panel
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
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
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

      {/* Autosave indicator */}
      {autosaveSavedAt && (
        <span
          className="hidden lg:flex items-center gap-1 text-[10px] text-neutral-600 mr-2"
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
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Share Link (URL-encoded) -- always available */}
        {sketch && (
          <button
            onClick={handleShareLink}
            className="px-2.5 md:px-3 py-1.5 bg-violet-700 hover:bg-violet-600 text-white rounded text-xs font-medium transition-colors"
            title="Share as URL (no login needed)"
          >
            <span className="hidden sm:inline">Share Link</span>
            <span className="sm:hidden">Link</span>
          </button>
        )}

        {/* Make Private */}
        <button
          onClick={handleMakePrivate}
          className="hidden sm:block px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs font-medium transition-colors"
          title="Make this sketch private"
        >
          Make Private
        </button>

        {onDownload && (
          <button
            onClick={onDownload}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs font-medium transition-colors"
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
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs font-medium transition-colors"
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
        <button
          onClick={onPrint}
          className="hidden sm:block px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs font-medium transition-colors"
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
        <button
          onClick={() => setShowShortcuts(true)}
          className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 rounded text-xs font-medium transition-colors"
          title="Keyboard shortcuts (?)"
        >
          ?
        </button>
        <div className="ml-2 border-l border-neutral-700 pl-3">
          <UserMenu />
        </div>
      </div>
    </header>

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      {/* Share Dialog */}
      {showShareDialog && sketch && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowShareDialog(false)}>
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white mb-4">Share Sketch</h3>

            <div className="mb-4">
              <label className="text-xs text-neutral-400 uppercase tracking-wider mb-1 block">Editor Link (editable)</label>
              <div className="flex gap-2">
                <input type="text" readOnly value={getShareableURL(sketch)} className="flex-1 bg-neutral-800 border border-neutral-600 rounded px-3 py-2 text-xs text-neutral-300 font-mono truncate" />
                <button onClick={() => copyToClipboard(getShareableURL(sketch))} className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium transition-colors shrink-0">Copy</button>
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">Link: {getShareableURL(sketch).length} chars</p>
            </div>

            <div className="mb-4">
              <label className="text-xs text-neutral-400 uppercase tracking-wider mb-1 block">View-Only Link (minimal)</label>
              <div className="flex gap-2">
                <input type="text" readOnly value={getDrawURL(sketch)} className="flex-1 bg-neutral-800 border border-neutral-600 rounded px-3 py-2 text-xs text-neutral-300 font-mono truncate" />
                <button onClick={() => copyToClipboard(getDrawURL(sketch))} className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium transition-colors shrink-0">Copy</button>
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">Link: {getDrawURL(sketch).length} chars</p>
            </div>

            {savedSlug && (
              <div className="mb-4">
                <label className="text-xs text-neutral-400 uppercase tracking-wider mb-1 block">Saved Sketch Link</label>
                <div className="flex gap-2">
                  <input type="text" readOnly value={`${typeof window !== "undefined" ? window.location.origin : ""}/s/${savedSlug}`} className="flex-1 bg-neutral-800 border border-neutral-600 rounded px-3 py-2 text-xs text-neutral-300 font-mono truncate" />
                  <button onClick={() => copyToClipboard(`${window.location.origin}/s/${savedSlug}`)} className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium transition-colors shrink-0">Copy</button>
                </div>
              </div>
            )}

            <div className="mt-4 p-3 bg-blue-950/30 border border-blue-800/30 rounded-lg">
              <p className="text-sm text-blue-300">Want to control who sees this? <Link href="/auth/signin" className="underline font-medium text-blue-400 hover:text-blue-300">Go Pro for &euro;2/mo</Link></p>
              <p className="text-[11px] text-neutral-500 mt-1">Pro users can toggle &quot;Anyone with link&quot; vs &quot;Only selected users&quot;</p>
            </div>

            <button onClick={() => setShowShareDialog(false)} className="mt-4 w-full px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm font-medium transition-colors">Close</button>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Panel */}
      {showShortcuts && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowShortcuts(false)}>
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">Keyboard Shortcuts</h3>
              <button onClick={() => setShowShortcuts(false)} className="text-neutral-500 hover:text-neutral-300 text-xl leading-none">×</button>
            </div>
            <div className="space-y-1">
              {[
                { keys: ["Ctrl", "Z"], desc: "Undo" },
                { keys: ["Ctrl", "Y"], desc: "Redo" },
                { keys: ["Ctrl", "S"], desc: "Save sketch" },
                { keys: ["Ctrl", "Shift", "S"], desc: "Download as PNG" },
                { keys: ["Ctrl", "Shift", "E"], desc: "Download as SVG" },
                { keys: ["Ctrl", "C"], desc: "Copy selected elements" },
                { keys: ["Ctrl", "V"], desc: "Paste elements" },
                { keys: ["Ctrl", "D"], desc: "Duplicate selected" },
                { keys: ["R"], desc: "Rotate selected 15° clockwise" },
                { keys: ["Shift", "R"], desc: "Rotate selected 15° counter-clockwise" },
                { keys: ["Del / ⌫"], desc: "Delete selected elements" },
                { keys: ["Esc"], desc: "Deselect all" },
                { keys: ["Shift+click"], desc: "Add to selection" },
                { keys: ["Drag (empty)"], desc: "Box-select elements" },
                { keys: ["Alt+drag"], desc: "Pan canvas" },
                { keys: ["Scroll"], desc: "Zoom toward cursor" },
                { keys: ["?"], desc: "Toggle this panel" },
              ].map(({ keys, desc }) => (
                <div key={desc} className="flex items-center justify-between py-1.5 border-b border-neutral-800 last:border-0">
                  <span className="text-sm text-neutral-300">{desc}</span>
                  <div className="flex items-center gap-1">
                    {keys.map((k) => (
                      <kbd key={k} className="text-[11px] font-mono text-neutral-300 bg-neutral-700 border border-neutral-600 rounded px-1.5 py-0.5">{k}</kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowShortcuts(false)} className="mt-5 w-full px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm font-medium transition-colors">Close</button>
          </div>
        </div>
      )}

      {/* Pro Upsell Modal */}
      {showProModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowProModal(false)}>
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>

            {!session ? (
              <>
                <h3 className="text-xl font-bold text-white mb-2">Sign up for Skissify Pro</h3>
                <p className="text-neutral-400 mb-2">Save private sketches that only you can see.</p>
                <p className="text-2xl font-bold text-white mb-1">&euro;2<span className="text-sm font-normal text-neutral-500">/month</span></p>
                <p className="text-xs text-neutral-500 mb-6">Less than a coffee. Cancel anytime. Early adopter price -- locked in forever.</p>
                <Link href="/auth/signin" className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25 mb-3">Sign Up</Link>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white mb-2">Upgrade to Pro</h3>
                <p className="text-neutral-400 mb-2">Make sketches private so only you control access.</p>
                <p className="text-2xl font-bold text-white mb-1">&euro;2<span className="text-sm font-normal text-neutral-500">/month</span></p>
                <p className="text-xs text-neutral-500 mb-6">Less than a coffee. Cancel anytime. Early adopter price -- locked in forever.</p>
                <Link href="/pricing" className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25 mb-3">Upgrade to Pro</Link>
              </>
            )}

            <button onClick={() => setShowProModal(false)} className="w-full px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 rounded-lg text-sm font-medium transition-colors">Maybe later</button>
          </div>
        </div>
      )}
    </>
  );
}
