"use client";

import { SketchElement } from "@/lib/types";

/** Icon mapping for element types */
const TYPE_ICONS: Record<string, string> = {
  line: "━",
  rect: "▭",
  circle: "○",
  arc: "◠",
  arrow: "→",
  text: "T",
  dashed: "┈",
  dim: "↔",
  window: "▥",
  "door-symbol": "⌐",
  "door-slide": "⊏",
  stair: "≡",
  opening: "⊓",
  column: "▪",
  path: "〰",
};

/** Get a short display label for an element */
function getLabel(el: SketchElement, idx: number): string {
  const a = el as unknown as Record<string, unknown>;
  if (el.type === "text") {
    const t = (a.text as string) || (a.content as string) || "";
    return t.length > 16 ? t.slice(0, 15) + "\u2026" : t || `text #${idx}`;
  }
  if (el.type === "rect" && a.label) {
    const l = a.label as string;
    return l.length > 16 ? l.slice(0, 15) + "\u2026" : l;
  }
  if (el.type === "dim" && a.label) {
    return `dim ${a.label}`;
  }
  return `${el.type} #${idx}`;
}

interface ElementsListPanelProps {
  elements: SketchElement[];
  selectedElements: Set<number>;
  onSelectElement: (idx: number, shiftKey: boolean) => void;
  onToggleVisibility: (idx: number) => void;
}

export default function ElementsListPanel({
  elements,
  selectedElements,
  onSelectElement,
  onToggleVisibility,
}: ElementsListPanelProps) {
  if (elements.length === 0) {
    return (
      <p className="text-[10px] text-[#93a1a1] italic">No elements yet</p>
    );
  }

  return (
    <div className="max-h-52 overflow-y-auto -mx-1">
      {/* Render in reverse so top element (highest z-order) appears first — Figma convention */}
      {[...elements].map((_, visualIdx) => {
        // Reverse: visual position 0 → last element in array (top layer)
        const idx = elements.length - 1 - visualIdx;
        const el = elements[idx];
        const isSelected = selectedElements.has(idx);
        const isHidden = el.visible === false;
        const isLocked = !!(el as unknown as Record<string, unknown>).locked;
        const icon = TYPE_ICONS[el.type] || "?";
        const label = getLabel(el, idx);

        return (
          <button
            key={`el-${idx}`}
            onClick={(e) => onSelectElement(idx, e.shiftKey)}
            className={`flex items-center gap-1.5 w-full px-1.5 py-1 text-left text-[11px] rounded transition-colors ${
              isSelected
                ? "bg-[#268bd2]/15 text-[#268bd2]"
                : isHidden
                ? "text-[#93a1a1]/50 hover:bg-[#eee8d5]/50"
                : "text-[#586e75] hover:bg-[#eee8d5]"
            }`}
            title={`${el.type} #${idx}${isLocked ? " (locked)" : ""}${isHidden ? " (hidden)" : ""}`}
          >
            {/* Type icon */}
            <span className="w-4 text-center text-[10px] font-mono shrink-0 opacity-60">
              {icon}
            </span>

            {/* Label */}
            <span className={`flex-1 truncate ${isHidden ? "line-through opacity-50" : ""}`}>
              {label}
            </span>

            {/* Lock indicator */}
            {isLocked && (
              <span className="text-[9px] opacity-50 shrink-0" title="Locked">
                🔒
              </span>
            )}

            {/* Visibility toggle */}
            <span
              role="button"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisibility(idx);
              }}
              className={`w-5 text-center text-[11px] shrink-0 rounded hover:bg-[#eee8d5] cursor-pointer ${
                isHidden ? "opacity-40" : "opacity-70"
              }`}
              title={isHidden ? "Show element" : "Hide element"}
            >
              {isHidden ? "◻" : "◼"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
