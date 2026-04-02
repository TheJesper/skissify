"use client";

import { useState, useCallback } from "react";
import { PaperType, ToolType, PAPER_SIZES, FONT_OPTIONS, SkissifyFont, RenderStyle, RENDER_STYLE_OPTIONS, BlueprintMetadata, SketchElement } from "@/lib/types";
import ElementThumbnailPanel from "./ElementThumbnailPanel";
import ElementsListPanel from "./ElementsListPanel";
import LayersPanel from "./LayersPanel";

// ── Collapsible Section State (persisted to localStorage) ────────────────────

const LS_KEY = "skissify-panel-collapsed";

/** Load collapsed-section ids from localStorage (gracefully handles SSR/JSON errors). */
function loadCollapsedSections(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

/** Persist collapsed-section ids to localStorage. */
function saveCollapsedSections(ids: Set<string>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // ignore quota errors
  }
}

interface ControlPanelProps {
  paper: PaperType;
  tool: ToolType;
  amplitude: number;
  waves: number;
  humanness: number;
  inkColor: string;
  textFont?: SkissifyFont;
  dimFont?: SkissifyFont;
  width?: number;
  height?: number;
  selectedCount: number;
  /** Current color of the selected element (undefined when nothing selected) */
  selectedColor?: string;
  /** Current strokeWidth of the selected element */
  selectedStrokeWidth?: number;
  /** Current fillColor of the selected element (undefined = no fill) */
  selectedFillColor?: string;
  onPaper: (p: PaperType) => void;
  onTool: (t: ToolType) => void;
  onAmplitude: (v: number) => void;
  onWaves: (v: number) => void;
  onHumanness: (v: number) => void;
  onInkColor: (c: string) => void;
  onTextFont: (f: SkissifyFont) => void;
  onDimFont: (f: SkissifyFont) => void;
  onResize: (w: number, h: number) => void;
  onAddElement: (type: string) => void;
  onDeleteSelected: () => void;
  /** Called when the user changes the color of selected elements */
  onColorSelected?: (color: string) => void;
  /** Called when the user changes the strokeWidth of selected elements */
  onStrokeWidthSelected?: (w: number) => void;
  /** Called when the user changes the fillColor of selected elements (undefined = remove fill) */
  onFillColorSelected?: (color: string | undefined) => void;
  /** Current render style */
  renderStyle?: RenderStyle;
  /** Called when the user changes the render style */
  onRenderStyle?: (s: RenderStyle) => void;
  /**
   * Per-element font override for the first selected text/dim element.
   * undefined if nothing is selected or none of the selected elements are text/dim.
   * null means the selected element has no per-element override (uses sketch default).
   */
  selectedFontFamily?: string | null;
  /**
   * True when any selected element is a text or dim type
   * (controls whether the per-element font row is shown).
   */
  hasTextOrDimSelected?: boolean;
  /** Called when the user sets a per-element font override on selected text/dim elements */
  onFontFamilySelected?: (fontFamily: string | undefined) => void;
  /** Whether any selected element is locked */
  selectedLocked?: boolean;
  /** Called when the user toggles lock on selected elements */
  onToggleLock?: () => void;
  /** Called to reorder selected elements in z-order */
  onReorder?: (direction: "front" | "back" | "forward" | "backward") => void;
  /** Called to align 2+ selected elements */
  onAlign?: (mode: "left" | "right" | "top" | "bottom" | "centerH" | "centerV" | "distributeH" | "distributeV") => void;
  /** Whether any selected element belongs to a group */
  selectedHasGroup?: boolean;
  /** Group selected elements (Ctrl+G) */
  onGroupSelected?: () => void;
  /** Ungroup selected elements (Ctrl+Shift+G) */
  onUngroupSelected?: () => void;
  /** Called to copy the visual style from the current selection to the style clipboard */
  onCopyStyle?: () => void;
  /** Called to paste the style clipboard's properties onto the current selection */
  onPasteStyle?: () => void;
  /** True when the style clipboard has data (enables Paste Style button) */
  hasStyleClipboard?: boolean;
  /** Current grid snap size (0 = off) */
  snapGrid?: number;
  /** Called when the user changes grid snap size */
  onSnapGrid?: (size: number) => void;
  /** Blueprint metadata for title block */
  metadata?: BlueprintMetadata;
  /** Called when the user edits blueprint metadata */
  onMetadata?: (m: BlueprintMetadata) => void;
  /**
   * The actual element data when exactly one element is selected.
   * Used to show position/size coordinate inputs in the Selection panel.
   */
  selectedElement?: SketchElement;
  /** Index of the single selected element (for updateElement calls) */
  selectedElementIdx?: number;
  /** Called when the user edits coordinates/size of the selected element */
  onUpdateElement?: (idx: number, updates: Record<string, unknown>) => void;
  /** Whether freehand draw mode is currently active */
  drawMode?: boolean;
  /** Called when the user toggles freehand draw mode */
  onDrawModeChange?: (active: boolean) => void;
  /** All elements in the sketch (for the elements list panel) */
  elements?: SketchElement[];
  /** Currently selected element indices */
  selectedElements?: Set<number>;
  /** Called when the user clicks an element in the list panel */
  onSelectElement?: (idx: number, shiftKey: boolean) => void;
  /** Called when the user toggles visibility of an element */
  onToggleVisibility?: (idx: number) => void;
  /**
   * Current wallWidth of the selected line element (undefined if no line selected or no wall).
   * 0 means no wall (plain line). > 0 means wall with that thickness.
   */
  selectedWallWidth?: number | null;
  /** Called when the user sets/clears wall thickness on selected line elements */
  onWallWidthSelected?: (w: number | undefined) => void;
  /** True when any selected element is a line type */
  hasLineSelected?: boolean;
  /** Current opacity of the first selected element (0-1, undefined = default/1) */
  selectedOpacity?: number;
  /** Called when the user sets opacity on selected elements (undefined = remove override) */
  onOpacitySelected?: (opacity: number | undefined) => void;
  /** Layers defined in the sketch */
  layers?: import("@/lib/types").SketchLayer[];
  /** Called when a layer's visibility is toggled */
  onSetLayerVisibility?: (layerId: string, visible: boolean) => void;
  /** Called when a new layer is created */
  onAddLayer?: (layer: import("@/lib/types").SketchLayer) => void;
  /** Called when a layer is removed */
  onRemoveLayer?: (layerId: string) => void;
  /** Called when a layer is renamed */
  onRenameLayer?: (layerId: string, name: string) => void;
  /** Called when selected elements are assigned to a layer */
  onSetElementLayer?: (layerId: string | undefined) => void;
}

const paperTypes: { key: PaperType; label: string; color: string }[] = [
  { key: "cream", label: "Cream", color: "#f5f0e0" },
  { key: "white", label: "White", color: "#ffffff" },
  { key: "yellow", label: "Yellow", color: "#fffff0" },
  { key: "blueprint", label: "Blueprint", color: "#1a3a5c" },
];

const toolTypes: { key: ToolType; label: string; icon: string }[] = [
  { key: "pencil", label: "Pencil", icon: "pencil" },
  { key: "ballpoint", label: "Ballpoint", icon: "pen" },
  { key: "ink", label: "Ink", icon: "ink" },
];

const presetInkColors: { key: string; label: string }[] = [
  { key: "#111111", label: "Black" },
  { key: "#1a3a8c", label: "Blue" },
  { key: "#8b1a1a", label: "Red" },
  { key: "#1a4a20", label: "Green" },
  { key: "#8b6900", label: "Brown" },
  { key: "#555555", label: "Gray" },
  { key: "#1a5a5a", label: "Teal" },
  { key: "#663399", label: "Purple" },
];


/** Coordinate/size editing fields for a single selected element. */
function ElementCoordEditor({
  element,
  elementIdx,
  onUpdate,
}: {
  element: SketchElement;
  elementIdx: number;
  onUpdate: (idx: number, updates: Record<string, unknown>) => void;
}) {
  // Local draft state so user can type freely without immediate re-render flicker
  const [draft, setDraft] = useState<Record<string, string>>({});

  const el = element as unknown as Record<string, unknown>;

  // Determine which coordinate fields to show based on element type
  type Field = { key: string; label: string };
  let fields: Field[] = [];

  if (["line", "arrow", "dashed"].includes(element.type)) {
    fields = [
      { key: "x1", label: "x1" },
      { key: "y1", label: "y1" },
      { key: "x2", label: "x2" },
      { key: "y2", label: "y2" },
    ];
  } else if (element.type === "dim") {
    fields = [
      { key: "x1", label: "x1" },
      { key: "y1", label: "y1" },
      { key: "x2", label: "x2" },
      { key: "y2", label: "y2" },
    ];
  } else if (element.type === "rect") {
    fields = [
      { key: "x", label: "x" },
      { key: "y", label: "y" },
      { key: "w", label: "w" },
      { key: "h", label: "h" },
    ];
  } else if (element.type === "circle") {
    fields = [
      { key: "cx", label: "cx" },
      { key: "cy", label: "cy" },
      { key: "r", label: "r" },
    ];
  } else if (element.type === "text") {
    fields = [
      { key: "x", label: "x" },
      { key: "y", label: "y" },
      { key: "fontSize", label: "size" },
    ];
  } else if (element.type === "arc") {
    fields = [
      { key: "cx", label: "cx" },
      { key: "cy", label: "cy" },
      { key: "r", label: "r" },
      { key: "startAngle", label: "start°" },
      { key: "endAngle", label: "end°" },
    ];
  } else if (element.type === "stair") {
    // Stair has x, y, w, h + steps
    fields = [
      { key: "x", label: "x" },
      { key: "y", label: "y" },
      { key: "w", label: "w" },
      { key: "h", label: "h" },
    ];
  } else if (["window", "opening", "door-symbol", "door-slide", "column"].includes(element.type)) {
    fields = [
      { key: "x", label: "x" },
      { key: "y", label: "y" },
      { key: "w", label: "w" },
    ];
  } else if (["bed", "sofa", "dining-table", "armchair", "desk", "bookshelf", "stove", "shower", "toilet", "bathtub", "sink"].includes(element.type)) {
    // Furniture & fixture elements — all use bounding box (x, y, w, h)
    fields = [
      { key: "x", label: "x" },
      { key: "y", label: "y" },
      { key: "w", label: "w" },
      { key: "h", label: "h" },
    ];
  }

  if (fields.length === 0) return null;

  const getValue = (key: string): string => {
    if (key in draft) return draft[key];
    const v = el[key];
    return v != null ? String(Math.round((v as number) * 10) / 10) : "0";
  };

  const handleChange = (key: string, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleCommit = (key: string, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      onUpdate(elementIdx, { [key]: num });
    }
    // Clear draft so it re-reads from the element
    setDraft((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // Text content: get the effective text value for text/rect/dim elements
  const getTextValue = (key: string): string => {
    if (key in draft) return draft[key];
    const v = el[key];
    return v != null ? String(v) : "";
  };

  const handleTextChange = (key: string, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleTextCommit = (key: string, value: string) => {
    onUpdate(elementIdx, { [key]: value });
    setDraft((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  return (
    <div className="mt-1 space-y-2">
      {/* Text content editor for text elements — textarea supports multiline (\n) */}
      {element.type === "text" && (
        <div className="space-y-1.5">
          <label className="text-[10px] text-[#657b83] uppercase tracking-wide block">
            Text content
            <span className="ml-1.5 text-[#93a1a1] normal-case font-normal">(Shift+Enter = new line)</span>
          </label>
          <textarea
            rows={Math.max(2, (getTextValue("text") || getTextValue("content")).split("\n").length + 1)}
            value={getTextValue("text") || getTextValue("content")}
            onChange={(e) => handleTextChange("text", e.target.value)}
            onBlur={(e) => handleTextCommit("text", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleTextCommit("text", (e.target as HTMLTextAreaElement).value);
              }
              e.stopPropagation();
            }}
            placeholder={"Enter text…\nShift+Enter for new line"}
            className="w-full bg-[#fdf6e3] border border-[#93a1a1] rounded px-2 py-1 text-[11px] text-[#586e75] font-mono focus:ring-1 focus:ring-[#268bd2] focus:outline-none resize-none"
          />
          {/* Line height + max width controls (shown when text has content) */}
          <div className="flex items-center gap-2">
            <label className="text-[9px] text-[#657b83] uppercase tracking-wide shrink-0">
              Line ht
            </label>
            <input
              type="number"
              min="1.0"
              max="3.0"
              step="0.1"
              value={getValue("lineHeight") || "1.4"}
              onChange={(e) => handleChange("lineHeight", e.target.value)}
              onBlur={(e) => handleCommit("lineHeight", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCommit("lineHeight", (e.target as HTMLInputElement).value);
                e.stopPropagation();
              }}
              className="w-16 bg-[#fdf6e3] border border-[#93a1a1] rounded px-1 py-0.5 text-[11px] text-[#586e75] text-center font-mono focus:ring-1 focus:ring-[#268bd2] focus:outline-none"
            />
            <label className="text-[9px] text-[#657b83] uppercase tracking-wide shrink-0 ml-1">
              Wrap at
            </label>
            <input
              type="number"
              min="0"
              step="10"
              value={getValue("maxWidth") || "0"}
              onChange={(e) => handleChange("maxWidth", e.target.value)}
              onBlur={(e) => handleCommit("maxWidth", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCommit("maxWidth", (e.target as HTMLInputElement).value);
                e.stopPropagation();
              }}
              placeholder="0"
              className="w-16 bg-[#fdf6e3] border border-[#93a1a1] rounded px-1 py-0.5 text-[11px] text-[#586e75] text-center font-mono focus:ring-1 focus:ring-[#268bd2] focus:outline-none"
            />
            <span className="text-[9px] text-[#93a1a1]">px (0=off)</span>
          </div>
        </div>
      )}
      {/* Rect label editor */}
      {element.type === "rect" && (
        <div>
          <label className="text-[10px] text-[#657b83] uppercase tracking-wide block mb-1">
            Label (optional)
          </label>
          <input
            type="text"
            value={getTextValue("label")}
            onChange={(e) => handleTextChange("label", e.target.value)}
            onBlur={(e) => handleTextCommit("label", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTextCommit("label", (e.target as HTMLInputElement).value);
              e.stopPropagation();
            }}
            placeholder="Room label…"
            className="w-full bg-[#fdf6e3] border border-[#93a1a1] rounded px-2 py-1 text-[11px] text-[#586e75] font-mono focus:ring-1 focus:ring-[#268bd2] focus:outline-none"
          />
        </div>
      )}
      {/* Dim label + offset editor */}
      {element.type === "dim" && (
        <div className="space-y-1.5">
          <label className="text-[10px] text-[#657b83] uppercase tracking-wide block">
            Dimension label
          </label>
          <input
            type="text"
            value={getTextValue("label")}
            onChange={(e) => handleTextChange("label", e.target.value)}
            onBlur={(e) => handleTextCommit("label", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTextCommit("label", (e.target as HTMLInputElement).value);
              e.stopPropagation();
            }}
            placeholder="e.g. 3.6 m"
            className="w-full bg-[#fdf6e3] border border-[#93a1a1] rounded px-2 py-1 text-[11px] text-[#586e75] font-mono focus:ring-1 focus:ring-[#268bd2] focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <label className="text-[10px] text-[#657b83] uppercase tracking-wide shrink-0">
              Offset
            </label>
            <input
              type="number"
              value={getValue("offset")}
              onChange={(e) => handleChange("offset", e.target.value)}
              onBlur={(e) => handleCommit("offset", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCommit("offset", (e.target as HTMLInputElement).value);
                e.stopPropagation();
              }}
              placeholder="0"
              className="w-20 bg-[#fdf6e3] border border-[#93a1a1] rounded px-1 py-1 text-[11px] text-[#586e75] text-center font-mono focus:ring-1 focus:ring-[#268bd2] focus:outline-none"
            />
            <span className="text-[9px] text-[#93a1a1]">px perp.</span>
            {/* Quick offset presets */}
            <div className="flex gap-0.5 ml-auto">
              {[-30, -20, 0, 20, 30].map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    onUpdate(elementIdx, { offset: v });
                    setDraft((prev) => {
                      const next = { ...prev };
                      delete next["offset"];
                      return next;
                    });
                  }}
                  className={`px-1 py-0.5 rounded text-[9px] font-mono border transition-all ${
                    (el["offset"] ?? 0) === v
                      ? "ring-1 ring-[#268bd2] border-transparent bg-[#eee8d5] text-[#073642]"
                      : "border-[#93a1a1] bg-[#fdf6e3] hover:bg-[#eee8d5] text-[#657b83]"
                  }`}
                  title={`Set offset to ${v}px`}
                >
                  {v > 0 ? `+${v}` : v}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Coordinate fields */}
      <div>
        <label className="text-[10px] text-[#657b83] uppercase tracking-wide block mb-1.5">
          Position &amp; Size
          <span className="ml-1.5 text-[#93a1a1] capitalize">({element.type})</span>
        </label>
        <div className="grid grid-cols-4 gap-1">
          {fields.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-0.5">
              <label className="text-[9px] text-[#93a1a1] uppercase text-center">{label}</label>
              <input
                type="number"
                value={getValue(key)}
                onChange={(e) => handleChange(key, e.target.value)}
                onBlur={(e) => handleCommit(key, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCommit(key, (e.target as HTMLInputElement).value);
                  e.stopPropagation(); // prevent canvas keyboard shortcuts
                }}
                className="w-full bg-[#fdf6e3] border border-[#93a1a1] rounded px-1 py-1 text-[11px] text-[#586e75] text-center font-mono focus:ring-1 focus:ring-[#268bd2] focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Furniture-specific property controls */}
      {element.type === "bed" && (
        <div>
          <label className="text-[10px] text-[#657b83] uppercase tracking-wide block mb-1.5">Bed type</label>
          <div className="flex gap-1">
            {([1, 2] as const).map((n) => (
              <button
                key={n}
                onClick={() => onUpdate(elementIdx, { pillows: n })}
                className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                  (el.pillows as number | undefined ?? 1) === n
                    ? "ring-2 ring-[#268bd2] bg-[#fdf6e3] text-[#073642]"
                    : "bg-[#fdf6e3] hover:bg-[#e8e0cc] text-[#586e75]"
                }`}
                title={n === 1 ? "Single bed (1 pillow)" : "Double bed (2 pillows)"}
              >
                {n === 1 ? "Single" : "Double"}
              </button>
            ))}
          </div>
        </div>
      )}

      {element.type === "dining-table" && (
        <div>
          <label className="text-[10px] text-[#657b83] uppercase tracking-wide block mb-1.5">Chairs per side</label>
          <div className="flex gap-1">
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                onClick={() => onUpdate(elementIdx, { seats: n })}
                className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                  (el.seats as number | undefined ?? 1) === n
                    ? "ring-2 ring-[#268bd2] bg-[#fdf6e3] text-[#073642]"
                    : "bg-[#fdf6e3] hover:bg-[#e8e0cc] text-[#586e75]"
                }`}
              >
                {n} {n === 1 ? "chair" : "chairs"}
              </button>
            ))}
          </div>
        </div>
      )}

      {element.type === "bookshelf" && (
        <div>
          <label className="text-[10px] text-[#657b83] uppercase tracking-wide block mb-1.5">Shelves</label>
          <div className="flex gap-1">
            {([2, 3, 4, 5] as const).map((n) => (
              <button
                key={n}
                onClick={() => onUpdate(elementIdx, { shelves: n })}
                className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                  (el.shelves as number | undefined ?? 3) === n
                    ? "ring-2 ring-[#268bd2] bg-[#fdf6e3] text-[#073642]"
                    : "bg-[#fdf6e3] hover:bg-[#e8e0cc] text-[#586e75]"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      {element.type === "stove" && (
        <div>
          <label className="text-[10px] text-[#657b83] uppercase tracking-wide block mb-1.5">Burners</label>
          <div className="flex gap-1">
            {([2, 4] as const).map((n) => (
              <button
                key={n}
                onClick={() => onUpdate(elementIdx, { burners: n })}
                className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                  (el.burners as number | undefined ?? 4) === n
                    ? "ring-2 ring-[#268bd2] bg-[#fdf6e3] text-[#073642]"
                    : "bg-[#fdf6e3] hover:bg-[#e8e0cc] text-[#586e75]"
                }`}
              >
                {n} burners
              </button>
            ))}
          </div>
        </div>
      )}

      {element.type === "stair" && (
        <div>
          <label className="text-[10px] text-[#657b83] uppercase tracking-wide block mb-1.5">Steps</label>
          <input
            type="number"
            min={2}
            max={20}
            value={String(el.steps as number | undefined ?? 8)}
            onChange={(e) => onUpdate(elementIdx, { steps: parseInt(e.target.value, 10) || 8 })}
            onKeyDown={(e) => e.stopPropagation()}
            className="w-20 bg-[#fdf6e3] border border-[#93a1a1] rounded px-2 py-1 text-[11px] text-[#586e75] font-mono focus:ring-1 focus:ring-[#268bd2] focus:outline-none"
          />
        </div>
      )}

      {element.type === "door-symbol" && (
        <div>
          <label className="text-[10px] text-[#657b83] uppercase tracking-wide block mb-1.5">Swing direction</label>
          <div className="flex gap-1">
            {(["left", "right"] as const).map((d) => (
              <button
                key={d}
                onClick={() => onUpdate(elementIdx, { swing: d })}
                className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                  (el.swing as string | undefined ?? "left") === d
                    ? "ring-2 ring-[#268bd2] bg-[#fdf6e3] text-[#073642]"
                    : "bg-[#fdf6e3] hover:bg-[#e8e0cc] text-[#586e75]"
                }`}
              >
                {d === "left" ? "↺ Left" : "↻ Right"}
              </button>
            ))}
          </div>
        </div>
      )}

      {element.type === "door-slide" && (
        <div>
          <label className="text-[10px] text-[#657b83] uppercase tracking-wide block mb-1.5">Slide direction</label>
          <div className="flex gap-1">
            {(["left", "right"] as const).map((d) => (
              <button
                key={d}
                onClick={() => onUpdate(elementIdx, { direction: d })}
                className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                  (el.direction as string | undefined ?? "right") === d
                    ? "ring-2 ring-[#268bd2] bg-[#fdf6e3] text-[#073642]"
                    : "bg-[#fdf6e3] hover:bg-[#e8e0cc] text-[#586e75]"
                }`}
              >
                {d === "left" ? "← Left" : "→ Right"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ControlPanel({
  paper,
  tool,
  amplitude,
  waves,
  humanness,
  inkColor,
  textFont,
  dimFont,
  width,
  height,
  selectedCount,
  selectedColor,
  selectedStrokeWidth,
  selectedFillColor,
  onPaper,
  onTool,
  onAmplitude,
  onWaves,
  onHumanness,
  onInkColor,
  onTextFont,
  onDimFont,
  onResize,
  onAddElement,
  onDeleteSelected,
  onColorSelected,
  onStrokeWidthSelected,
  onFillColorSelected,
  renderStyle,
  onRenderStyle,
  selectedFontFamily,
  hasTextOrDimSelected,
  onFontFamilySelected,
  selectedLocked,
  onToggleLock,
  onReorder,
  onAlign,
  snapGrid,
  onSnapGrid,
  metadata,
  onMetadata,
  selectedHasGroup,
  onGroupSelected,
  onUngroupSelected,
  onCopyStyle,
  onPasteStyle,
  hasStyleClipboard,
  selectedElement,
  selectedElementIdx,
  onUpdateElement,
  drawMode,
  onDrawModeChange,
  elements,
  selectedElements,
  onSelectElement,
  onToggleVisibility,
  selectedWallWidth,
  onWallWidthSelected,
  hasLineSelected,
  selectedOpacity,
  onOpacitySelected,
  layers,
  onSetLayerVisibility,
  onAddLayer,
  onRemoveLayer,
  onRenameLayer,
  onSetElementLayer,
}: ControlPanelProps) {
  // Normalize inkColor for comparison (handle #111 vs #111111)
  const normalizeColor = (c: string) => {
    if (!c) return "#111111";
    if (c.length === 4) {
      return "#" + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
    }
    return c.toLowerCase();
  };
  const activeInkColor = normalizeColor(inkColor);

  // ── Collapsible section state ────────────────────────────────────────────
  // Initialise from localStorage on first render; fall back to empty Set (all open)
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(() => loadCollapsedSections());

  const toggleSection = useCallback((id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveCollapsedSections(next);
      return next;
    });
  }, []);

  const isCollapsed = (id: string) => collapsedSections.has(id);

  return (
    <div className="w-[300px] min-w-[300px] flex flex-col overflow-y-auto" style={{ backgroundColor: "#eee8d5", borderRight: "1px solid #93a1a1", color: "#586e75" }}>
      {/* Paper */}
      <Section title="Paper" collapsed={isCollapsed("paper")} onToggleCollapse={() => toggleSection("paper")}>
        <div className="flex gap-1.5">
          {paperTypes.map((p) => (
            <button
              key={p.key}
              onClick={() => onPaper(p.key)}
              className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                paper === p.key
                  ? "ring-2 ring-[#268bd2] bg-[#eee8d5]"
                  : "bg-[#fdf6e3] hover:bg-[#fdf6e3]/80"
              }`}
            >
              <span
                className="inline-block w-3 h-3 rounded-sm mr-1 align-middle border border-[#93a1a1]"
                style={{ backgroundColor: p.color }}
              />
              {p.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Blueprint Title Block */}
      {paper === "blueprint" && onMetadata && (
        <Section title="Title Block" collapsed={isCollapsed("title-block")} onToggleCollapse={() => toggleSection("title-block")}>
          <div className="space-y-1.5">
            {([
              { key: "title", label: "Title", placeholder: "FLOOR PLAN" },
              { key: "owner", label: "Owner", placeholder: "Project name" },
              { key: "scale", label: "Scale", placeholder: "1:100" },
              { key: "date", label: "Date", placeholder: "2026-03-28" },
              { key: "sheetNumber", label: "Sheet #", placeholder: "A-001" },
              { key: "drawnBy", label: "Drawn by", placeholder: "Author" },
            ] as const).map(({ key, label, placeholder }) => (
              <div key={key} className="flex items-center gap-2">
                <label className="text-[10px] text-[#657b83] w-14 shrink-0">{label}</label>
                <input
                  type="text"
                  value={(metadata as Record<string, string | undefined>)?.[key] ?? ""}
                  placeholder={placeholder}
                  onChange={(e) =>
                    onMetadata({ ...metadata, [key]: e.target.value || undefined })
                  }
                  className="flex-1 bg-[#fdf6e3] border border-[#93a1a1] rounded px-2 py-1 text-xs text-[#586e75] placeholder:text-[#93a1a1]"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Tool */}
      <Section title="Tool" collapsed={isCollapsed("tool")} onToggleCollapse={() => toggleSection("tool")}>
        <div className="flex gap-1.5">
          {toolTypes.map((t) => (
            <button
              key={t.key}
              onClick={() => onTool(t.key)}
              className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                tool === t.key
                  ? "ring-2 ring-[#268bd2] bg-[#eee8d5]"
                  : "bg-[#fdf6e3] hover:bg-[#fdf6e3]/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Render Style */}
      {onRenderStyle && (
        <Section title="Render Style" collapsed={isCollapsed("render-style")} onToggleCollapse={() => toggleSection("render-style")}>
          <div className="grid grid-cols-2 gap-1">
            {RENDER_STYLE_OPTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => onRenderStyle(s.key)}
                title={s.description}
                className={`flex flex-col items-center gap-0.5 px-1 py-1.5 rounded text-[10px] font-medium transition-all border ${
                  (renderStyle ?? "sketch") === s.key
                    ? "ring-2 ring-[#268bd2] border-transparent bg-[#eee8d5] text-[#073642]"
                    : "border-[#93a1a1] bg-[#fdf6e3] hover:bg-[#fdf6e3]/80 text-[#657b83]"
                }`}
              >
                <span className="text-base leading-none">{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </Section>
      )}

      {/* Ink Color */}
      <Section title="Ink Color" collapsed={isCollapsed("ink-color")} onToggleCollapse={() => toggleSection("ink-color")}>
        <div className="grid grid-cols-4 gap-1.5 mb-1.5">
          {presetInkColors.map((c) => (
            <button
              key={c.key}
              title={c.label}
              onClick={() => onInkColor(c.key)}
              className={`w-full aspect-square rounded transition-all border ${
                activeInkColor === normalizeColor(c.key)
                  ? "ring-2 ring-blue-500 border-transparent"
                  : "border-[#93a1a1] hover:border-[#657b83]"
              }`}
              style={{ backgroundColor: c.key }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <label className="text-xs text-[#657b83] shrink-0">Custom</label>
          <input
            type="color"
            value={activeInkColor}
            onChange={(e) => onInkColor(e.target.value)}
            className="w-8 h-7 rounded cursor-pointer border border-[#93a1a1] bg-[#fdf6e3] p-0.5"
            title="Pick custom ink color"
          />
          <span className="text-[10px] text-[#93a1a1] font-mono">{activeInkColor}</span>
        </div>
      </Section>

      {/* Text Font */}
      <Section title="Text Font" collapsed={isCollapsed("text-font")} onToggleCollapse={() => toggleSection("text-font")}>
        <div className="space-y-2">
          <div>
            <label className="text-[10px] text-[#657b83] uppercase tracking-wide block mb-1">Labels &amp; Text</label>
            <div className="grid grid-cols-2 gap-1">
              {FONT_OPTIONS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => onTextFont(f.key)}
                  className={`px-2 py-1.5 rounded text-xs transition-all border ${
                    (textFont ?? "courier") === f.key
                      ? "ring-2 ring-[#268bd2] border-transparent bg-[#eee8d5]"
                      : "border-[#93a1a1] bg-[#fdf6e3] hover:bg-[#fdf6e3]/80"
                  }`}
                  style={{ fontFamily: f.css }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[#657b83] uppercase tracking-wide block mb-1">Dimensions</label>
            <div className="grid grid-cols-2 gap-1">
              {FONT_OPTIONS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => onDimFont(f.key)}
                  className={`px-2 py-1.5 rounded text-xs transition-all border ${
                    (dimFont ?? "courier") === f.key
                      ? "ring-2 ring-[#268bd2] border-transparent bg-[#eee8d5]"
                      : "border-[#93a1a1] bg-[#fdf6e3] hover:bg-[#fdf6e3]/80"
                  }`}
                  style={{ fontFamily: f.css }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Wobble & Human Touch */}
      <Section title="Wobble & Human Touch" collapsed={isCollapsed("wobble")} onToggleCollapse={() => toggleSection("wobble")}>
        <SliderControl
          label="Amplitude"
          value={amplitude}
          onChange={onAmplitude}
        />
        <SliderControl label="Waves" value={waves} onChange={onWaves} />
        <SliderControl
          label="Humanness"
          value={humanness}
          onChange={onHumanness}
        />
      </Section>

      {/* Paper Size */}
      <Section title="Paper Size" collapsed={isCollapsed("paper-size")} onToggleCollapse={() => toggleSection("paper-size")}>
        <div className="flex gap-1.5 mb-2">
          {Object.entries(PAPER_SIZES).map(([key, size]) => (
            <button
              key={key}
              onClick={() => onResize(size.width, size.height)}
              className={`flex-1 px-1.5 py-1 rounded text-xs font-medium transition-all ${
                width === size.width && height === size.height
                  ? "ring-2 ring-[#268bd2] bg-[#eee8d5]"
                  : "bg-[#fdf6e3] hover:bg-[#fdf6e3]/80"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-[10px] text-[#657b83] uppercase">W</label>
            <input
              type="number"
              value={width || 900}
              onChange={(e) =>
                onResize(parseInt(e.target.value) || 900, height || 650)
              }
              className="w-full bg-[#fdf6e3] border border-[#93a1a1] rounded px-2 py-1 text-xs text-[#586e75]"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-[#657b83] uppercase">H</label>
            <input
              type="number"
              value={height || 650}
              onChange={(e) =>
                onResize(width || 900, parseInt(e.target.value) || 650)
              }
              className="w-full bg-[#fdf6e3] border border-[#93a1a1] rounded px-2 py-1 text-xs text-[#586e75]"
            />
          </div>
        </div>
      </Section>

      {/* Selection Info */}
      <Section title="Selection" collapsed={isCollapsed("selection")} onToggleCollapse={() => toggleSection("selection")}>
        <div className="text-[11px] text-[#657b83] space-y-0.5 font-mono">
          <div>
            <kbd className="bg-[#eee8d5] px-1 rounded text-[10px]">click</kbd> select,{" "}
            <kbd className="bg-[#eee8d5] px-1 rounded text-[10px]">shift+click</kbd> add
          </div>
          <div>
            <kbd className="bg-[#eee8d5] px-1 rounded text-[10px]">del</kbd> remove,{" "}
            <kbd className="bg-[#eee8d5] px-1 rounded text-[10px]">esc</kbd> deselect
          </div>
          <div>
            <kbd className="bg-[#eee8d5] px-1 rounded text-[10px]">scroll</kbd> zoom,{" "}
            <kbd className="bg-[#eee8d5] px-1 rounded text-[10px]">alt/ctrl</kbd> pan
          </div>
        </div>
        {selectedCount > 0 && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#268bd2]">
                {selectedCount} selected
              </span>
              <button
                onClick={onDeleteSelected}
                className="ml-auto px-2 py-0.5 bg-red-900/50 hover:bg-red-800/60 text-red-300 rounded text-xs"
              >
                Delete
              </button>
            </div>
            {/* Coordinate editor — shown when exactly one element is selected */}
            {selectedCount === 1 && selectedElement && selectedElementIdx != null && onUpdateElement && (
              <ElementCoordEditor
                element={selectedElement}
                elementIdx={selectedElementIdx}
                onUpdate={onUpdateElement}
              />
            )}
            {onColorSelected && (
              <div className="flex items-center gap-2">
                <label className="text-[10px] text-[#657b83] uppercase tracking-wide shrink-0">
                  Element color
                </label>
                <div className="flex items-center gap-1.5 ml-auto">
                  {presetInkColors.map((c) => (
                    <button
                      key={c.key}
                      title={c.label}
                      onClick={() => onColorSelected(c.key)}
                      className={`w-5 h-5 rounded transition-all border ${
                        selectedColor && normalizeColor(selectedColor) === normalizeColor(c.key)
                          ? "ring-2 ring-[#268bd2] border-transparent"
                          : "border-[#93a1a1]"
                      }`}
                      style={{ backgroundColor: c.key }}
                    />
                  ))}
                  <input
                    type="color"
                    value={selectedColor ? normalizeColor(selectedColor) : "#111111"}
                    onChange={(e) => onColorSelected(e.target.value)}
                    className="w-6 h-5 rounded cursor-pointer border border-[#93a1a1] bg-[#fdf6e3] p-0"
                    title="Pick custom element color"
                  />
                </div>
              </div>
            )}
            {onStrokeWidthSelected && (
              <div className="flex items-center gap-2">
                <label className="text-[10px] text-[#657b83] uppercase tracking-wide shrink-0">
                  Stroke width
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={8}
                  step={0.5}
                  value={selectedStrokeWidth ?? 1}
                  onChange={(e) => onStrokeWidthSelected(parseFloat(e.target.value))}
                  className="flex-1 h-1 accent-[#268bd2]"
                  title="Element stroke width"
                />
                <span className="text-[10px] text-[#93a1a1] w-6 text-right font-mono">
                  {(selectedStrokeWidth ?? 1).toFixed(1)}
                </span>
              </div>
            )}
            {onOpacitySelected && (
              <div className="flex items-center gap-2">
                <label className="text-[10px] text-[#657b83] uppercase tracking-wide shrink-0">
                  Opacity
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={selectedOpacity ?? 1}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    onOpacitySelected(v >= 1 ? undefined : v);
                  }}
                  className="flex-1 h-1 accent-[#268bd2]"
                  title="Element opacity (0 = transparent, 1 = opaque)"
                />
                <span className="text-[10px] text-[#93a1a1] w-8 text-right font-mono">
                  {Math.round((selectedOpacity ?? 1) * 100)}%
                </span>
              </div>
            )}
            {/* Wall thickness control — shown when one or more line elements are selected */}
            {hasLineSelected && onWallWidthSelected && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-[#657b83] uppercase tracking-wide shrink-0">
                    Wall thickness
                  </label>
                  {selectedWallWidth != null && selectedWallWidth > 0 && (
                    <button
                      onClick={() => onWallWidthSelected(undefined)}
                      title="Remove wall (plain line)"
                      className="text-[9px] text-[#cb4b16] hover:text-[#dc322f] transition-colors"
                    >
                      ✕ plain line
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={2}
                    max={30}
                    step={1}
                    value={selectedWallWidth ?? 0}
                    onChange={(e) => onWallWidthSelected(parseFloat(e.target.value))}
                    className="flex-1 h-1 accent-[#268bd2]"
                    title="Wall thickness in canvas units"
                  />
                  <span className="text-[10px] text-[#93a1a1] w-8 text-right font-mono">
                    {selectedWallWidth ? `${selectedWallWidth}px` : "off"}
                  </span>
                </div>
                {/* Quick preset thickness buttons */}
                <div className="flex gap-1">
                  {[0, 4, 8, 12, 20].map((w) => (
                    <button
                      key={w}
                      title={w === 0 ? "No wall (plain line)" : `Wall thickness ${w}px`}
                      onClick={() => onWallWidthSelected(w === 0 ? undefined : w)}
                      className={`flex-1 py-1 rounded text-[9px] font-medium transition-all border ${
                        (w === 0 && !selectedWallWidth) || selectedWallWidth === w
                          ? "ring-2 ring-[#268bd2] border-transparent bg-[#eee8d5] text-[#073642]"
                          : "border-[#93a1a1] bg-[#fdf6e3] hover:bg-[#eee8d5] text-[#657b83]"
                      }`}
                    >
                      {w === 0 ? "—" : w === 4 ? "thin" : w === 8 ? "int" : w === 12 ? "ext" : "thick"}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {onFillColorSelected && (
              <div className="flex items-center gap-2">
                <label className="text-[10px] text-[#657b83] uppercase tracking-wide shrink-0">
                  Fill color
                </label>
                <div className="flex items-center gap-1.5 ml-auto">
                  {/* No-fill (transparent) button */}
                  <button
                    title="No fill (transparent)"
                    onClick={() => onFillColorSelected(undefined)}
                    className={`w-5 h-5 rounded transition-all border flex items-center justify-center text-[8px] font-bold ${
                      !selectedFillColor || selectedFillColor === "none"
                        ? "ring-2 ring-[#268bd2] border-transparent bg-[#eee8d5] text-[#268bd2]"
                        : "border-[#93a1a1] bg-white text-[#93a1a1]"
                    }`}
                    style={{
                      background: "linear-gradient(135deg, #fff 40%, #f00 40%, #f00 60%, #fff 60%)",
                    }}
                  />
                  {/* Preset fill swatches - lighter/translucent versions */}
                  {[
                    { key: "#f5e6d3", label: "Warm beige" },
                    { key: "#e8f0e8", label: "Light green" },
                    { key: "#e8e8f5", label: "Light blue" },
                    { key: "#f5e8e8", label: "Light red" },
                    { key: "#f5f5e0", label: "Light yellow" },
                    { key: "#e8e8e8", label: "Light gray" },
                    { key: "#d0e8f5", label: "Sky blue" },
                    { key: "#e8d0f5", label: "Lavender" },
                  ].map((c) => (
                    <button
                      key={c.key}
                      title={c.label}
                      onClick={() => onFillColorSelected(c.key)}
                      className={`w-5 h-5 rounded transition-all border ${
                        selectedFillColor && normalizeColor(selectedFillColor) === normalizeColor(c.key)
                          ? "ring-2 ring-[#268bd2] border-transparent"
                          : "border-[#93a1a1]"
                      }`}
                      style={{ backgroundColor: c.key }}
                    />
                  ))}
                  <input
                    type="color"
                    value={selectedFillColor && selectedFillColor !== "none" ? normalizeColor(selectedFillColor) : "#f5e6d3"}
                    onChange={(e) => onFillColorSelected(e.target.value)}
                    className="w-6 h-5 rounded cursor-pointer border border-[#93a1a1] bg-[#fdf6e3] p-0"
                    title="Pick custom fill color"
                  />
                </div>
              </div>
            )}
            {/* Per-element font override — shown when text or dim elements are selected */}
            {hasTextOrDimSelected && onFontFamilySelected && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-[#657b83] uppercase tracking-wide">
                    Element font
                  </label>
                  {selectedFontFamily != null && (
                    <button
                      onClick={() => onFontFamilySelected(undefined)}
                      title="Remove per-element font override (use sketch default)"
                      className="text-[9px] text-[#cb4b16] hover:text-[#dc322f] transition-colors"
                    >
                      ✕ clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {FONT_OPTIONS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => onFontFamilySelected(f.key)}
                      title={`Set font to ${f.label}`}
                      className={`px-1 py-1 rounded text-[10px] font-medium transition-all border truncate ${
                        selectedFontFamily === f.key
                          ? "ring-2 ring-[#268bd2] border-transparent bg-[#eee8d5] text-[#073642]"
                          : "border-[#93a1a1] bg-[#fdf6e3] hover:bg-[#fdf6e3]/80 text-[#657b83]"
                      }`}
                      style={{ fontFamily: f.css }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {onReorder && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#657b83] uppercase tracking-wide block">
                  Layer order
                </label>
                <div className="grid grid-cols-4 gap-1">
                  <button
                    onClick={() => onReorder("back")}
                    title="Send to Back"
                    className="flex flex-col items-center gap-0.5 px-1 py-1.5 bg-[#fdf6e3] hover:bg-[#fdf6e3]/80 rounded text-[9px] font-medium transition-all border border-[#93a1a1]"
                  >
                    <span className="text-sm leading-none">⬇⬇</span>
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => onReorder("backward")}
                    title="Send Backward"
                    className="flex flex-col items-center gap-0.5 px-1 py-1.5 bg-[#fdf6e3] hover:bg-[#fdf6e3]/80 rounded text-[9px] font-medium transition-all border border-[#93a1a1]"
                  >
                    <span className="text-sm leading-none">⬇</span>
                    <span>Down</span>
                  </button>
                  <button
                    onClick={() => onReorder("forward")}
                    title="Bring Forward"
                    className="flex flex-col items-center gap-0.5 px-1 py-1.5 bg-[#fdf6e3] hover:bg-[#fdf6e3]/80 rounded text-[9px] font-medium transition-all border border-[#93a1a1]"
                  >
                    <span className="text-sm leading-none">⬆</span>
                    <span>Up</span>
                  </button>
                  <button
                    onClick={() => onReorder("front")}
                    title="Bring to Front"
                    className="flex flex-col items-center gap-0.5 px-1 py-1.5 bg-[#fdf6e3] hover:bg-[#fdf6e3]/80 rounded text-[9px] font-medium transition-all border border-[#93a1a1]"
                  >
                    <span className="text-sm leading-none">⬆⬆</span>
                    <span>Front</span>
                  </button>
                </div>
              </div>
            )}
            {onToggleLock && (
              <button
                onClick={onToggleLock}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs font-medium transition-all border ${
                  selectedLocked
                    ? "border-[#cb4b16] bg-[#cb4b16]/10 text-[#cb4b16]"
                    : "border-[#93a1a1] bg-[#fdf6e3] hover:bg-[#fdf6e3]/80 text-[#657b83]"
                }`}
                title={selectedLocked ? "Unlock selected elements" : "Lock selected elements (prevents move/resize)"}
              >
                <span>{selectedLocked ? "🔒" : "🔓"}</span>
                <span>{selectedLocked ? "Locked — click to unlock" : "Lock element"}</span>
              </button>
            )}
            {onAlign && selectedCount >= 2 && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#657b83] uppercase tracking-wide block">
                  Align
                </label>
                {/* Row 1: align edges */}
                <div className="grid grid-cols-6 gap-0.5">
                  {(
                    [
                      { mode: "left",    title: "Align left edges",    icon: "⬅" },
                      { mode: "centerH", title: "Center horizontally", icon: "↔" },
                      { mode: "right",   title: "Align right edges",   icon: "➡" },
                      { mode: "top",     title: "Align top edges",     icon: "⬆" },
                      { mode: "centerV", title: "Center vertically",   icon: "↕" },
                      { mode: "bottom",  title: "Align bottom edges",  icon: "⬇" },
                    ] as const
                  ).map(({ mode, title, icon }) => (
                    <button
                      key={mode}
                      onClick={() => onAlign(mode)}
                      title={title}
                      className="flex items-center justify-center px-1 py-1.5 bg-[#fdf6e3] hover:bg-[#eee8d5] rounded text-sm transition-all border border-[#93a1a1]"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                {/* Row 2: distribute (only useful with 3+) */}
                {selectedCount >= 3 && (
                  <div className="grid grid-cols-2 gap-0.5">
                    <button
                      onClick={() => onAlign("distributeH")}
                      title="Distribute horizontal spacing equally"
                      className="flex items-center justify-center gap-1 px-2 py-1 bg-[#fdf6e3] hover:bg-[#eee8d5] rounded text-[10px] font-medium transition-all border border-[#93a1a1]"
                    >
                      ←→ Distribute H
                    </button>
                    <button
                      onClick={() => onAlign("distributeV")}
                      title="Distribute vertical spacing equally"
                      className="flex items-center justify-center gap-1 px-2 py-1 bg-[#fdf6e3] hover:bg-[#eee8d5] rounded text-[10px] font-medium transition-all border border-[#93a1a1]"
                    >
                      ↑↓ Distribute V
                    </button>
                  </div>
                )}
              </div>
            )}
            {(onGroupSelected || onUngroupSelected) && selectedCount >= 2 && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#657b83] uppercase tracking-wide block">
                  Group
                </label>
                <div className="grid grid-cols-2 gap-1">
                  {onGroupSelected && (
                    <button
                      onClick={onGroupSelected}
                      title="Group selected elements (Ctrl+G)"
                      className="flex items-center justify-center gap-1 px-2 py-1.5 bg-[#fdf6e3] hover:bg-[#eee8d5] rounded text-[10px] font-medium transition-all border border-[#93a1a1]"
                    >
                      <span className="text-sm leading-none">⊞</span> Group
                    </button>
                  )}
                  {onUngroupSelected && selectedHasGroup && (
                    <button
                      onClick={onUngroupSelected}
                      title="Ungroup selected elements (Ctrl+Shift+G)"
                      className="flex items-center justify-center gap-1 px-2 py-1.5 bg-[#fdf6e3] hover:bg-[#eee8d5] rounded text-[10px] font-medium transition-all border border-[#93a1a1]"
                    >
                      <span className="text-sm leading-none">⊟</span> Ungroup
                    </button>
                  )}
                </div>
              </div>
            )}
            {/* Copy Style / Paste Style (Format Painter) */}
            {(onCopyStyle || onPasteStyle) && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#657b83] uppercase tracking-wide block">
                  Format Painter
                </label>
                <div className="grid grid-cols-2 gap-1">
                  {onCopyStyle && (
                    <button
                      onClick={onCopyStyle}
                      title="Copy style (color, stroke, fill, font, opacity) from the selected element — Ctrl+Alt+C"
                      className="flex items-center justify-center gap-1 px-2 py-1.5 bg-[#fdf6e3] hover:bg-[#eee8d5] rounded text-[10px] font-medium transition-all border border-[#93a1a1] text-[#586e75]"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 11l3 3L22 4"/>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                      Copy Style
                    </button>
                  )}
                  {onPasteStyle && (
                    <button
                      onClick={onPasteStyle}
                      disabled={!hasStyleClipboard}
                      title={
                        hasStyleClipboard
                          ? "Paste copied style onto selected elements — Ctrl+Alt+V"
                          : "No style copied yet — use Copy Style first"
                      }
                      className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded text-[10px] font-medium transition-all border ${
                        hasStyleClipboard
                          ? "bg-[#268bd2]/10 hover:bg-[#268bd2]/20 border-[#268bd2] text-[#268bd2]"
                          : "bg-[#fdf6e3] border-[#93a1a1] text-[#93a1a1] cursor-not-allowed opacity-50"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                      Paste Style
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Section>

      {/* Add Elements */}
      {/* Grid Snap */}
      {onSnapGrid && (
        <Section title="Grid Snap" collapsed={isCollapsed("grid-snap")} onToggleCollapse={() => toggleSection("grid-snap")}>
          <div className="space-y-2">
            {/* On/Off toggle row */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#657b83]">
                {snapGrid && snapGrid > 0 ? `${snapGrid}px grid active` : "Off"}
              </span>
              <button
                onClick={() => onSnapGrid(snapGrid && snapGrid > 0 ? 0 : 20)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all border ${
                  snapGrid && snapGrid > 0
                    ? "ring-2 ring-[#268bd2] border-transparent bg-[#eee8d5] text-[#073642]"
                    : "border-[#93a1a1] bg-[#fdf6e3] hover:bg-[#fdf6e3]/80 text-[#657b83]"
                }`}
              >
                {snapGrid && snapGrid > 0 ? "✦ On" : "○ Off"}
              </button>
            </div>
            {/* Grid size presets */}
            {snapGrid !== undefined && snapGrid > 0 && (
              <div className="grid grid-cols-5 gap-1">
                {[5, 10, 20, 40, 80].map((size) => (
                  <button
                    key={size}
                    onClick={() => onSnapGrid(size)}
                    className={`px-1 py-1.5 rounded text-[10px] font-medium transition-all border ${
                      snapGrid === size
                        ? "ring-2 ring-[#268bd2] border-transparent bg-[#eee8d5] text-[#073642]"
                        : "border-[#93a1a1] bg-[#fdf6e3] hover:bg-[#fdf6e3]/80 text-[#657b83]"
                    }`}
                    title={`${size}px grid`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Freehand Draw */}
      {onDrawModeChange && (
        <Section title="Draw" collapsed={isCollapsed("draw")} onToggleCollapse={() => toggleSection("draw")}>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onDrawModeChange(!drawMode)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded text-xs font-medium transition-all border ${
                drawMode
                  ? "ring-2 ring-[#268bd2] border-transparent bg-[#268bd2]/10 text-[#268bd2]"
                  : "border-[#93a1a1] bg-[#fdf6e3] hover:bg-[#fdf6e3]/80 text-[#657b83]"
              }`}
              title={drawMode ? "Click to exit freehand draw mode" : "Click to enter freehand draw mode — draw freely on the canvas"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
              </svg>
              {drawMode ? "✏️ Drawing… (click to stop)" : "Freehand Draw"}
            </button>
            {drawMode && (
              <p className="text-[10px] text-[#93a1a1] leading-snug">
                Click and drag on the canvas to draw. Release to finish a stroke. Press <kbd className="bg-[#eee8d5] px-1 rounded">Esc</kbd> to exit.
              </p>
            )}
          </div>
        </Section>
      )}

      {/* Elements List */}
      {elements && onSelectElement && onToggleVisibility && selectedElements && (
        <Section title={`Elements (${elements.length})`} collapsed={isCollapsed("elements-list")} onToggleCollapse={() => toggleSection("elements-list")}>
          <ElementsListPanel
            elements={elements}
            selectedElements={selectedElements}
            onSelectElement={onSelectElement}
            onToggleVisibility={onToggleVisibility}
          />
        </Section>
      )}

      {/* Layers Panel */}
      {onAddLayer && onRemoveLayer && onRenameLayer && onSetLayerVisibility && (
        <Section title="Layers" collapsed={isCollapsed("layers")} onToggleCollapse={() => toggleSection("layers")}>
          <LayersPanel
            layers={layers ?? []}
            elements={elements ?? []}
            onSetLayerVisibility={onSetLayerVisibility}
            onAddLayer={onAddLayer}
            onRemoveLayer={onRemoveLayer}
            onRenameLayer={onRenameLayer}
            selectedElements={selectedElements}
            onSetElementLayer={onSetElementLayer}
          />
        </Section>
      )}

      <Section title="Add Element" collapsed={isCollapsed("add-element")} onToggleCollapse={() => toggleSection("add-element")}>
        <ElementThumbnailPanel paper={paper} onAddElement={onAddElement} />
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
  collapsed,
  onToggleCollapse,
}: {
  title: string;
  children: React.ReactNode;
  /** When provided, the section is collapsible and shows a toggle chevron. */
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const isCollapsible = onToggleCollapse !== undefined;
  return (
    <div className="border-b border-[#eee8d5]">
      <button
        type="button"
        onClick={isCollapsible ? onToggleCollapse : undefined}
        className={`w-full flex items-center justify-between px-3 py-2.5 text-left ${
          isCollapsible ? "cursor-pointer hover:bg-[#e8e0cc]/40 transition-colors" : "cursor-default"
        }`}
        aria-expanded={isCollapsible ? !collapsed : undefined}
      >
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[#93a1a1]">
          {title}
        </h3>
        {isCollapsible && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#93a1a1] shrink-0 transition-transform duration-150"
            style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>
      {!collapsed && (
        <div className="px-3 pb-2.5 pt-0.5">
          {children}
        </div>
      )}
    </div>
  );
}

function SliderControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <label className="text-xs text-[#657b83] w-20 shrink-0">{label}</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 h-1 accent-[#268bd2]"
      />
      <span className="text-[10px] text-[#93a1a1] w-8 text-right font-mono">
        {value.toFixed(2)}
      </span>
    </div>
  );
}
