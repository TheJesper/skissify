"use client";

import { PaperType, ToolType, PAPER_SIZES } from "@/lib/types";

interface ControlPanelProps {
  paper: PaperType;
  tool: ToolType;
  amplitude: number;
  waves: number;
  humanness: number;
  inkColor: string;
  width?: number;
  height?: number;
  selectedCount: number;
  onPaper: (p: PaperType) => void;
  onTool: (t: ToolType) => void;
  onAmplitude: (v: number) => void;
  onWaves: (v: number) => void;
  onHumanness: (v: number) => void;
  onInkColor: (c: string) => void;
  onResize: (w: number, h: number) => void;
  onAddElement: (type: string) => void;
  onDeleteSelected: () => void;
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

const elementTypes = [
  "line", "rect", "circle", "arc", "arrow", "text",
  "dashed", "dim", "window", "door-symbol", "door-slide",
  "stair", "opening", "column",
];

export default function ControlPanel({
  paper,
  tool,
  amplitude,
  waves,
  humanness,
  inkColor,
  width,
  height,
  selectedCount,
  onPaper,
  onTool,
  onAmplitude,
  onWaves,
  onHumanness,
  onInkColor,
  onResize,
  onAddElement,
  onDeleteSelected,
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
  return (
    <div className="w-[300px] min-w-[300px] bg-neutral-900 border-r border-neutral-700 flex flex-col overflow-y-auto text-neutral-200">
      {/* Paper */}
      <Section title="Paper">
        <div className="flex gap-1.5">
          {paperTypes.map((p) => (
            <button
              key={p.key}
              onClick={() => onPaper(p.key)}
              className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                paper === p.key
                  ? "ring-2 ring-blue-500 bg-neutral-700"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              <span
                className="inline-block w-3 h-3 rounded-sm mr-1 align-middle border border-neutral-600"
                style={{ backgroundColor: p.color }}
              />
              {p.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Tool */}
      <Section title="Tool">
        <div className="flex gap-1.5">
          {toolTypes.map((t) => (
            <button
              key={t.key}
              onClick={() => onTool(t.key)}
              className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                tool === t.key
                  ? "ring-2 ring-blue-500 bg-neutral-700"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Ink Color */}
      <Section title="Ink Color">
        <div className="grid grid-cols-4 gap-1.5 mb-1.5">
          {presetInkColors.map((c) => (
            <button
              key={c.key}
              title={c.label}
              onClick={() => onInkColor(c.key)}
              className={`w-full aspect-square rounded transition-all border ${
                activeInkColor === normalizeColor(c.key)
                  ? "ring-2 ring-blue-500 border-transparent"
                  : "border-neutral-600 hover:border-neutral-400"
              }`}
              style={{ backgroundColor: c.key }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <label className="text-xs text-neutral-400 shrink-0">Custom</label>
          <input
            type="color"
            value={activeInkColor}
            onChange={(e) => onInkColor(e.target.value)}
            className="w-8 h-7 rounded cursor-pointer border border-neutral-600 bg-neutral-800 p-0.5"
            title="Pick custom ink color"
          />
          <span className="text-[10px] text-neutral-500 font-mono">{activeInkColor}</span>
        </div>
      </Section>

      {/* Wobble & Human Touch */}
      <Section title="Wobble & Human Touch">
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
      <Section title="Paper Size">
        <div className="flex gap-1.5 mb-2">
          {Object.entries(PAPER_SIZES).map(([key, size]) => (
            <button
              key={key}
              onClick={() => onResize(size.width, size.height)}
              className={`flex-1 px-1.5 py-1 rounded text-xs font-medium transition-all ${
                width === size.width && height === size.height
                  ? "ring-2 ring-blue-500 bg-neutral-700"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-[10px] text-neutral-400 uppercase">W</label>
            <input
              type="number"
              value={width || 900}
              onChange={(e) =>
                onResize(parseInt(e.target.value) || 900, height || 650)
              }
              className="w-full bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-xs text-neutral-200"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-neutral-400 uppercase">H</label>
            <input
              type="number"
              value={height || 650}
              onChange={(e) =>
                onResize(width || 900, parseInt(e.target.value) || 650)
              }
              className="w-full bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-xs text-neutral-200"
            />
          </div>
        </div>
      </Section>

      {/* Selection Info */}
      <Section title="Selection">
        <div className="text-[11px] text-neutral-400 space-y-0.5 font-mono">
          <div>
            <kbd className="bg-neutral-700 px-1 rounded text-[10px]">click</kbd> select,{" "}
            <kbd className="bg-neutral-700 px-1 rounded text-[10px]">shift+click</kbd> add
          </div>
          <div>
            <kbd className="bg-neutral-700 px-1 rounded text-[10px]">del</kbd> remove,{" "}
            <kbd className="bg-neutral-700 px-1 rounded text-[10px]">esc</kbd> deselect
          </div>
          <div>
            <kbd className="bg-neutral-700 px-1 rounded text-[10px]">scroll</kbd> zoom,{" "}
            <kbd className="bg-neutral-700 px-1 rounded text-[10px]">alt/ctrl</kbd> pan
          </div>
        </div>
        {selectedCount > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-blue-400">
              {selectedCount} selected
            </span>
            <button
              onClick={onDeleteSelected}
              className="px-2 py-0.5 bg-red-900/50 hover:bg-red-800/60 text-red-300 rounded text-xs"
            >
              Delete
            </button>
          </div>
        )}
      </Section>

      {/* Add Elements */}
      <Section title="Add Element">
        <div className="grid grid-cols-3 gap-1">
          {elementTypes.map((t) => (
            <button
              key={t}
              onClick={() => onAddElement(t)}
              className="px-1.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-[11px] font-medium transition-all text-center"
            >
              {t}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-3 py-2.5 border-b border-neutral-800">
      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-2">
        {title}
      </h3>
      {children}
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
      <label className="text-xs text-neutral-400 w-20 shrink-0">{label}</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 h-1 accent-blue-500"
      />
      <span className="text-[10px] text-neutral-500 w-8 text-right font-mono">
        {value.toFixed(2)}
      </span>
    </div>
  );
}
