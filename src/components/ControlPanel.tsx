"use client";

import { PaperType, ToolType, PAPER_SIZES, FONT_OPTIONS, SkissifyFont, RenderStyle, RENDER_STYLE_OPTIONS } from "@/lib/types";

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
  /** Current render style */
  renderStyle?: RenderStyle;
  /** Called when the user changes the render style */
  onRenderStyle?: (s: RenderStyle) => void;
  /** Whether any selected element is locked */
  selectedLocked?: boolean;
  /** Called when the user toggles lock on selected elements */
  onToggleLock?: () => void;
  /** Called to reorder selected elements in z-order */
  onReorder?: (direction: "front" | "back" | "forward" | "backward") => void;
  /** Called to align 2+ selected elements */
  onAlign?: (mode: "left" | "right" | "top" | "bottom" | "centerH" | "centerV" | "distributeH" | "distributeV") => void;
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
  textFont,
  dimFont,
  width,
  height,
  selectedCount,
  selectedColor,
  selectedStrokeWidth,
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
  renderStyle,
  onRenderStyle,
  selectedLocked,
  onToggleLock,
  onReorder,
  onAlign,
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
    <div className="w-[300px] min-w-[300px] flex flex-col overflow-y-auto" style={{ backgroundColor: "#eee8d5", borderRight: "1px solid #93a1a1", color: "#586e75" }}>
      {/* Paper */}
      <Section title="Paper">
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

      {/* Tool */}
      <Section title="Tool">
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
        <Section title="Render Style">
          <div className="grid grid-cols-3 gap-1">
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
      <Section title="Text Font">
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
      <Section title="Selection">
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
              className="px-1.5 py-1.5 bg-[#fdf6e3] hover:bg-[#fdf6e3]/80 rounded text-[11px] font-medium transition-all text-center"
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
    <div className="px-3 py-2.5 border-b border-[#eee8d5]">
      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[#93a1a1] mb-2">
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
