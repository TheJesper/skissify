"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ElementType, PaperType, ToolType } from "@/lib/types";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface CommandAction {
  id: string;
  label: string;
  description?: string;
  category: string;
  keywords?: string[];
  icon?: string;
  onSelect: () => void;
}

interface CommandPaletteProps {
  /** Whether the palette is open */
  open: boolean;
  /** Called when the palette should close */
  onClose: () => void;
  /** Called when a preset name is chosen */
  onLoadPreset: (name: string) => void;
  /** Called when an element type should be added */
  onAddElement: (type: ElementType) => void;
  /** Called to set paper type */
  onSetPaper: (paper: PaperType) => void;
  /** Called to set tool type */
  onSetTool: (tool: ToolType) => void;
  /** Called to set render style */
  onSetRenderStyle: (style: "sketch" | "technical" | "blueprint") => void;
  /** Called to set amplitude */
  onSetAmplitude: (v: number) => void;
  /** Called to set snap grid */
  onSetSnapGrid: (v: number) => void;
  /** Called for general actions */
  onAction: (action: string) => void;
  /** List of preset names */
  presetNames: string[];
}

// ── Category order ─────────────────────────────────────────────────────────────
const CATEGORY_ORDER = ["Presets", "Add Element", "Paper & Style", "Tool", "Render", "Grid", "Edit", "View", "Export"];

// ── Element descriptions ───────────────────────────────────────────────────────
const ELEMENT_LABELS: Partial<Record<ElementType, string>> = {
  line: "Line — straight line segment",
  rect: "Rectangle — box shape or room",
  circle: "Circle — round element",
  arc: "Arc — curved segment",
  arrow: "Arrow — directional pointer",
  text: "Text — label or note",
  dashed: "Dashed Line — property boundary, guides",
  dim: "Dimension — measurement line with label",
  window: "Window — architectural window symbol",
  "door-symbol": "Door — swinging door with arc",
  "door-slide": "Sliding Door — pocket/sliding door",
  stair: "Stair — staircase steps",
  opening: "Opening — wall gap / archway",
  column: "Column — structural column",
  path: "Freehand Path — custom drawn curve",
  bed: "Bed — furniture: single or double",
  sofa: "Sofa — furniture: couch",
  "dining-table": "Dining Table — with chairs",
  toilet: "Toilet — bathroom fixture",
  bathtub: "Bathtub — bathroom fixture",
  sink: "Sink — bathroom/kitchen fixture",
  armchair: "Armchair — single seat furniture",
  desk: "Desk — writing desk",
  bookshelf: "Bookshelf — storage unit",
  stove: "Stove — kitchen appliance",
  shower: "Shower — bathroom fixture",
};

const ELEMENT_ICONS: Partial<Record<ElementType, string>> = {
  line: "—", rect: "▭", circle: "○", arc: "⌒", arrow: "→", text: "T", dashed: "- -",
  dim: "↔", window: "⊞", "door-symbol": "🚪", "door-slide": "⊟", stair: "⊐", opening: "⌐",
  column: "⊕", path: "~", bed: "🛏", sofa: "🛋", "dining-table": "🪑", toilet: "🚽",
  bathtub: "🛁", sink: "🪣", armchair: "💺", desk: "🖥", bookshelf: "📚", stove: "🍳", shower: "🚿",
};

// ── Main Component ─────────────────────────────────────────────────────────────

export default function CommandPalette({
  open,
  onClose,
  onLoadPreset,
  onAddElement,
  onSetPaper,
  onSetTool,
  onSetRenderStyle,
  onSetAmplitude,
  onSetSnapGrid,
  onAction,
  presetNames,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Build command list
  const allCommands = useMemo<CommandAction[]>(() => {
    const cmds: CommandAction[] = [];

    // Presets
    presetNames.forEach((name) => {
      cmds.push({
        id: `preset:${name}`,
        label: `Load preset: ${name}`,
        description: "Switch to this preset sketch",
        category: "Presets",
        keywords: ["preset", "load", "switch", name],
        icon: "📐",
        onSelect: () => onLoadPreset(name),
      });
    });

    // Add elements
    (Object.keys(ELEMENT_LABELS) as ElementType[]).forEach((type) => {
      cmds.push({
        id: `add:${type}`,
        label: `Add ${type}`,
        description: ELEMENT_LABELS[type],
        category: "Add Element",
        keywords: ["add", "insert", "new", type, ...(ELEMENT_LABELS[type]?.toLowerCase().split(/\W+/) ?? [])],
        icon: ELEMENT_ICONS[type] ?? "＋",
        onSelect: () => onAddElement(type),
      });
    });

    // Paper types
    const papers: { id: PaperType; label: string; icon: string }[] = [
      { id: "cream", label: "Cream paper (warm parchment)", icon: "📜" },
      { id: "white", label: "White paper (clean minimal)", icon: "⬜" },
      { id: "yellow", label: "Yellow grid paper (graph pad)", icon: "📒" },
      { id: "blueprint", label: "Blueprint paper (technical)", icon: "🔵" },
    ];
    papers.forEach(({ id, label, icon }) => {
      cmds.push({
        id: `paper:${id}`,
        label: `Paper: ${label}`,
        category: "Paper & Style",
        keywords: ["paper", "background", id],
        icon,
        onSelect: () => onSetPaper(id),
      });
    });

    // Tools
    const tools: { id: ToolType; label: string; icon: string }[] = [
      { id: "pencil", label: "Pencil tool (thin, faded)", icon: "✏️" },
      { id: "ballpoint", label: "Ballpoint pen (medium)", icon: "🖊" },
      { id: "ink", label: "Ink pen (thick, opaque)", icon: "🖋" },
    ];
    tools.forEach(({ id, label, icon }) => {
      cmds.push({
        id: `tool:${id}`,
        label: `Tool: ${label}`,
        category: "Tool",
        keywords: ["tool", "pen", id],
        icon,
        onSelect: () => onSetTool(id),
      });
    });

    // Render styles
    const styles: { id: "sketch" | "technical" | "blueprint"; label: string; icon: string }[] = [
      { id: "sketch", label: "Sketch mode (hand-drawn)", icon: "✏️" },
      { id: "technical", label: "Technical mode (precise lines)", icon: "📐" },
      { id: "blueprint", label: "Blueprint mode (blue paper)", icon: "🔵" },
    ];
    styles.forEach(({ id, label, icon }) => {
      cmds.push({
        id: `style:${id}`,
        label: `Render style: ${label}`,
        category: "Render",
        keywords: ["render", "style", "mode", id],
        icon,
        onSelect: () => onSetRenderStyle(id),
      });
    });

    // Amplitude presets
    [
      { v: 0.0, label: "Amplitude: Off (straight lines)" },
      { v: 0.3, label: "Amplitude: Low (slight wobble)" },
      { v: 0.7, label: "Amplitude: Medium (default)" },
      { v: 1.5, label: "Amplitude: High (very wobbly)" },
      { v: 2.5, label: "Amplitude: Max (chaotic)" },
    ].forEach(({ v, label }) => {
      cmds.push({
        id: `amplitude:${v}`,
        label,
        category: "Paper & Style",
        keywords: ["amplitude", "wobble", "deviation", String(v)],
        icon: "〰",
        onSelect: () => onSetAmplitude(v),
      });
    });

    // Snap grid
    [
      { v: 0, label: "Grid snap: Off" },
      { v: 10, label: "Grid snap: 10px" },
      { v: 20, label: "Grid snap: 20px (default G)" },
      { v: 50, label: "Grid snap: 50px" },
    ].forEach(({ v, label }) => {
      cmds.push({
        id: `snap:${v}`,
        label,
        category: "Grid",
        keywords: ["snap", "grid", "align", String(v)],
        icon: "⊹",
        onSelect: () => onSetSnapGrid(v),
      });
    });

    // Edit actions
    const editActions = [
      { id: "undo", label: "Undo", description: "Ctrl+Z", icon: "↩", keywords: ["undo", "back", "revert"] },
      { id: "redo", label: "Redo", description: "Ctrl+Shift+Z", icon: "↪", keywords: ["redo", "forward"] },
      { id: "select-all", label: "Select All", description: "Ctrl+A", icon: "⬚", keywords: ["select", "all"] },
      { id: "delete", label: "Delete selected", description: "Delete / Backspace", icon: "🗑", keywords: ["delete", "remove", "erase"] },
      { id: "duplicate", label: "Duplicate selected", description: "Ctrl+D", icon: "⧉", keywords: ["duplicate", "copy", "clone"] },
      { id: "copy", label: "Copy selected", description: "Ctrl+C", icon: "⎘", keywords: ["copy"] },
      { id: "paste", label: "Paste", description: "Ctrl+V", icon: "⎗", keywords: ["paste"] },
      { id: "group", label: "Group selected", description: "Ctrl+G", icon: "⊞", keywords: ["group"] },
      { id: "ungroup", label: "Ungroup", description: "Ctrl+Shift+G", icon: "⊟", keywords: ["ungroup", "separate"] },
      { id: "new-sketch", label: "New Sketch", description: "Clear canvas", icon: "✦", keywords: ["new", "clear", "reset", "fresh"] },
      { id: "select-same-type", label: "Select same type", description: "Selects all elements matching the current type", icon: "≡", keywords: ["select", "type", "same", "all"] },
    ];
    editActions.forEach(({ id, label, description, icon, keywords }) => {
      cmds.push({ id: `action:${id}`, label, description, category: "Edit", keywords, icon, onSelect: () => onAction(id) });
    });

    // View actions
    const viewActions = [
      { id: "fit-view", label: "Fit view (zoom to sketch)", description: "0 key", icon: "⊞", keywords: ["fit", "zoom", "view", "reset"] },
      { id: "fit-selection", label: "Fit selection (zoom to selected)", description: "F key", icon: "⊡", keywords: ["fit", "zoom", "selection", "selected", "focus"] },
      { id: "zoom-in", label: "Zoom in", description: "+", icon: "＋", keywords: ["zoom", "in"] },
      { id: "zoom-out", label: "Zoom out", description: "−", icon: "－", keywords: ["zoom", "out"] },
      { id: "redraw", label: "Redraw (new wobble seed)", description: "Randomizes hand-drawn lines", icon: "🔀", keywords: ["redraw", "seed", "wobble", "random"] },
      { id: "toggle-shortcuts", label: "Show keyboard shortcuts", description: "? key", icon: "⌨", keywords: ["shortcuts", "keyboard", "help"] },
    ];
    viewActions.forEach(({ id, label, description, icon, keywords }) => {
      cmds.push({ id: `action:${id}`, label, description, category: "View", keywords, icon, onSelect: () => onAction(id) });
    });

    // Export actions
    const exportActions = [
      { id: "download-png", label: "Download PNG", description: "Ctrl+Shift+S", icon: "🖼", keywords: ["download", "export", "png", "image"] },
      { id: "download-svg", label: "Download SVG", description: "Ctrl+Shift+E", icon: "📦", keywords: ["download", "export", "svg", "vector"] },
      { id: "download-json", label: "Export JSON", description: "Ctrl+Shift+J", icon: "{ }", keywords: ["download", "export", "json", "manifest"] },
      { id: "copy-json", label: "Copy JSON to clipboard", icon: "⎘", keywords: ["copy", "json", "clipboard", "manifest"] },
      { id: "print", label: "Print / Export PDF", description: "Opens browser print dialog", icon: "🖨", keywords: ["print", "pdf", "export"] },
      { id: "save", label: "Save sketch", description: "Ctrl+S (when signed in)", icon: "💾", keywords: ["save", "persist", "cloud"] },
    ];
    exportActions.forEach(({ id, label, description, icon, keywords }) => {
      cmds.push({ id: `action:${id}`, label, description, category: "Export", keywords, icon, onSelect: () => onAction(id) });
    });

    return cmds;
  }, [presetNames, onLoadPreset, onAddElement, onSetPaper, onSetTool, onSetRenderStyle, onSetAmplitude, onSetSnapGrid, onAction]);

  // Filter & score
  const filtered = useMemo<CommandAction[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;
    return allCommands
      .map((cmd) => {
        const labelScore = cmd.label.toLowerCase().includes(q) ? 2 : 0;
        const kwScore = (cmd.keywords ?? []).some((k) => k.includes(q)) ? 1 : 0;
        const descScore = cmd.description?.toLowerCase().includes(q) ? 0.5 : 0;
        const score = labelScore + kwScore + descScore;
        return { cmd, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.cmd);
  }, [allCommands, query]);

  // Group results
  const grouped = useMemo<{ category: string; items: CommandAction[] }[]>(() => {
    if (query.trim()) {
      // Flat list when filtering
      return [{ category: "Results", items: filtered }];
    }
    const map = new Map<string, CommandAction[]>();
    for (const cmd of filtered) {
      if (!map.has(cmd.category)) map.set(cmd.category, []);
      map.get(cmd.category)!.push(cmd);
    }
    return CATEGORY_ORDER
      .filter((c) => map.has(c))
      .map((c) => ({ category: c, items: map.get(c)! }));
  }, [filtered, query]);

  // Flat indexed list for keyboard navigation
  const flatItems = useMemo<CommandAction[]>(() => grouped.flatMap((g) => g.items), [grouped]);

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, flatItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = flatItems[activeIdx];
        if (cmd) {
          cmd.onSelect();
          onClose();
        }
      }
    },
    [flatItems, activeIdx, onClose]
  );

  const handleSelect = useCallback(
    (cmd: CommandAction) => {
      cmd.onSelect();
      onClose();
    },
    [onClose]
  );

  if (!open) return null;

  // Build flat index map for rendering
  let flatCounter = 0;

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-start justify-center pt-[12vh]"
      style={{ backgroundColor: "rgba(7,54,66,0.55)", backdropFilter: "blur(3px)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-[600px] mx-4 rounded-xl overflow-hidden shadow-2xl"
        style={{
          backgroundColor: "#fdf6e3",
          border: "1.5px solid #93a1a1",
          maxHeight: "70vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Search bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b shrink-0"
          style={{ borderColor: "#93a1a1" }}
        >
          {/* Search icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#93a1a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search commands, presets, elements…"
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "#073642", caretColor: "#268bd2" }}
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setActiveIdx(0); inputRef.current?.focus(); }}
              className="text-[#93a1a1] hover:text-[#657b83] transition-colors"
            >
              ×
            </button>
          )}
          <kbd
            className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded font-mono"
            style={{ backgroundColor: "#eee8d5", color: "#93a1a1", border: "1px solid #93a1a1" }}
          >
            Esc
          </kbd>
        </div>

        {/* Results */}
        <ul
          ref={listRef}
          className="overflow-y-auto flex-1"
          style={{ overscrollBehavior: "contain" }}
        >
          {flatItems.length === 0 && (
            <li className="px-4 py-8 text-center text-sm" style={{ color: "#93a1a1" }}>
              No commands match &ldquo;{query}&rdquo;
            </li>
          )}
          {grouped.map(({ category, items }) => (
            <div key={category}>
              {/* Category header */}
              <div
                className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest sticky top-0"
                style={{ color: "#93a1a1", backgroundColor: "#fdf6e3", borderBottom: "1px solid #eee8d5" }}
              >
                {category}
              </div>
              {items.map((cmd) => {
                const idx = flatCounter++;
                const isActive = idx === activeIdx;
                return (
                  <li
                    key={cmd.id}
                    data-idx={idx}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onMouseDown={() => handleSelect(cmd)}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
                    style={{
                      backgroundColor: isActive ? "#eee8d5" : "transparent",
                      borderLeft: isActive ? "2px solid #268bd2" : "2px solid transparent",
                    }}
                  >
                    {/* Icon */}
                    <span
                      className="text-sm w-6 text-center shrink-0 font-mono"
                      style={{ color: isActive ? "#268bd2" : "#93a1a1" }}
                    >
                      {cmd.icon ?? "•"}
                    </span>
                    {/* Label + description */}
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-sm font-medium block truncate"
                        style={{ color: isActive ? "#073642" : "#586e75" }}
                      >
                        {cmd.label}
                      </span>
                      {cmd.description && (
                        <span className="text-[11px] block truncate" style={{ color: "#93a1a1" }}>
                          {cmd.description}
                        </span>
                      )}
                    </div>
                    {/* Category chip (only when filtering) */}
                    {query.trim() && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded shrink-0"
                        style={{ backgroundColor: "#eee8d5", color: "#93a1a1" }}
                      >
                        {cmd.category}
                      </span>
                    )}
                  </li>
                );
              })}
            </div>
          ))}
        </ul>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-2 text-[10px] shrink-0 border-t"
          style={{ borderColor: "#93a1a1", color: "#93a1a1", backgroundColor: "#eee8d5" }}
        >
          <span>
            <kbd className="font-mono">↑↓</kbd> navigate &nbsp;
            <kbd className="font-mono">↵</kbd> select &nbsp;
            <kbd className="font-mono">Esc</kbd> close
          </span>
          <span>{flatItems.length} command{flatItems.length !== 1 ? "s" : ""}</span>
        </div>
      </div>
    </div>
  );
}
