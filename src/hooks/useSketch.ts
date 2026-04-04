"use client";

import { useState, useCallback, useRef } from "react";
import { SketchData, BlueprintMetadata, PaperType, ToolType, SkissifyFont, RenderStyle, SketchLayer } from "@/lib/types";
import { presets, defaultPreset } from "@/lib/presets";

const MAX_HISTORY = 50;

function newSessionSeed(): number {
  return Math.floor(Math.random() * 2147483647);
}

export function useSketch(initialData?: SketchData, initialPresetName?: string) {
  const initial = initialData ?? presets[defaultPreset];
  const [sketch, setSketch] = useState<SketchData>({
    ...initial,
    sessionSeed: initial.sessionSeed ?? newSessionSeed(),
  });
  const [activePreset, setActivePreset] = useState<string>(
    initialPresetName || (initialData ? "" : defaultPreset)
  );
  const [selectedElements, setSelectedElements] = useState<Set<number>>(new Set());
  const [redrawKey, setRedrawKey] = useState(0);
  const jsonRef = useRef<string>(JSON.stringify(initial, null, 2));
  const clipboardRef = useRef<SketchData["elements"]>([]);

  /**
   * Style clipboard — stores visual properties from the last "Copy Style" action.
   * Holds only style-related fields, not geometric coords.
   */
  const styleClipboardRef = useRef<{
    color?: string;
    strokeWidth?: number;
    fillColor?: string;
    fontFamily?: string;
    opacity?: number;
    wallWidth?: number;
    textColor?: string;
  } | null>(null);

  /** True when the style clipboard holds data (used to enable the Paste Style button). */
  const [hasStyleClipboard, setHasStyleClipboard] = useState(false);

  // Undo/redo history
  const historyRef = useRef<SketchData[]>([initial]);
  const historyIndexRef = useRef(0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const pushHistory = useCallback((state: SketchData) => {
    const idx = historyIndexRef.current;
    const newHistory = historyRef.current.slice(0, idx + 1);
    newHistory.push(state);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(false);
  }, []);

  const updateSketch = useCallback((updates: Partial<SketchData>) => {
    setSketch((prev) => {
      const next = { ...prev, ...updates };
      jsonRef.current = JSON.stringify(next, null, 2);
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const setPaper = useCallback(
    (paper: PaperType) => updateSketch({ paper }),
    [updateSketch]
  );

  const setTool = useCallback(
    (tool: ToolType) => updateSketch({ tool }),
    [updateSketch]
  );

  const setAmplitude = useCallback(
    (amplitude: number) => updateSketch({ amplitude }),
    [updateSketch]
  );

  const setWaves = useCallback(
    (waves: number) => updateSketch({ waves }),
    [updateSketch]
  );

  const setHumanness = useCallback(
    (humanness: number) => updateSketch({ humanness }),
    [updateSketch]
  );

  const setInkColor = useCallback(
    (inkColor: string) => updateSketch({ inkColor }),
    [updateSketch]
  );

  const setTextFont = useCallback(
    (textFont: SkissifyFont) => updateSketch({ textFont }),
    [updateSketch]
  );

  const setDimFont = useCallback(
    (dimFont: SkissifyFont) => updateSketch({ dimFont }),
    [updateSketch]
  );

  const setRoomFont = useCallback(
    (roomFont: SkissifyFont) => updateSketch({ roomFont }),
    [updateSketch]
  );

  const setTitleFont = useCallback(
    (titleFont: SkissifyFont) => updateSketch({ titleFont }),
    [updateSketch]
  );

  const setRenderStyle = useCallback(
    (renderStyle: RenderStyle) => {
      // Blueprint mode auto-switches paper to blueprint
      const extra: Partial<SketchData> = { renderStyle };
      if (renderStyle === "blueprint") {
        extra.paper = "blueprint";
      }
      updateSketch({ ...extra, sessionSeed: newSessionSeed() });
    },
    [updateSketch]
  );

  const setSnapGrid = useCallback(
    (snapGrid: number) => updateSketch({ snapGrid }),
    [updateSketch]
  );

  const setMetadata = useCallback(
    (metadata: BlueprintMetadata) => updateSketch({ metadata }),
    [updateSketch]
  );

  /** Set the human-readable title of the sketch (shown in toolbar, used for file names and API save). */
  const setTitle = useCallback(
    (title: string) => updateSketch({ title: title.trim() || undefined }),
    [updateSketch]
  );

  const loadPreset = useCallback((name: string) => {
    const preset = presets[name];
    if (preset) {
      const withSeed = { ...preset, sessionSeed: newSessionSeed() };
      setSketch(withSeed);
      setActivePreset(name);
      jsonRef.current = JSON.stringify(withSeed, null, 2);
      setSelectedElements(new Set());
      // Reset undo/redo history so Ctrl+Z after a preset switch doesn't go back
      // to the previous preset (confusing UX)
      historyRef.current = [withSeed];
      historyIndexRef.current = 0;
      setCanUndo(false);
      setCanRedo(false);
    }
  }, []);

  const updateFromJson = useCallback((json: string) => {
    jsonRef.current = json;
    try {
      const parsed = JSON.parse(json) as SketchData;
      if (parsed && parsed.elements) {
        setSketch(parsed);
        setActivePreset("");
      }
    } catch {
      // Invalid JSON - don't update sketch
    }
  }, []);

  const addElement = useCallback(
    (type: string) => {
      const baseProps = { color: sketch.inkColor };
      let newEl;
      const cx = (sketch.width || 800) / 2;
      const cy = (sketch.height || 600) / 2;

      switch (type) {
        case "line":
          newEl = { type: "line", x1: cx - 100, y1: cy, x2: cx + 100, y2: cy, ...baseProps };
          break;
        case "rect":
          newEl = { type: "rect", x: cx - 60, y: cy - 40, w: 120, h: 80, ...baseProps };
          break;
        case "circle":
          newEl = { type: "circle", cx, cy, r: 50, ...baseProps };
          break;
        case "arc":
          newEl = { type: "arc", cx, cy, r: 40, startAngle: 0, endAngle: 90, ...baseProps };
          break;
        case "arrow":
          newEl = { type: "arrow", x1: cx - 80, y1: cy, x2: cx + 80, y2: cy, ...baseProps };
          break;
        case "text":
          newEl = { type: "text", x: cx, y: cy, text: "Text", fontSize: 18, ...baseProps };
          break;
        case "dashed":
          newEl = { type: "dashed", x1: cx - 100, y1: cy, x2: cx + 100, y2: cy, ...baseProps };
          break;
        case "dim":
          newEl = { type: "dim", x1: cx - 100, y1: cy, x2: cx + 100, y2: cy, label: "5.0m", ...baseProps };
          break;
        case "window":
          newEl = { type: "window", x1: cx - 60, y1: cy, x2: cx + 60, y2: cy, color: "#336" };
          break;
        case "door-symbol":
          newEl = { type: "door-symbol", x: cx, y: cy, w: 70, swing: "left", ...baseProps };
          break;
        case "door-slide":
          newEl = { type: "door-slide", x: cx, y: cy, w: 70, direction: "right", ...baseProps };
          break;
        case "stair":
          newEl = { type: "stair", x: cx - 30, y: cy - 50, w: 60, h: 100, steps: 8, ...baseProps };
          break;
        case "opening":
          newEl = { type: "opening", x1: cx - 40, y1: cy, x2: cx + 40, y2: cy, ...baseProps };
          break;
        case "column":
          newEl = { type: "column", cx, cy, size: 12, ...baseProps };
          break;
        case "path":
          // Default path: a small squiggle
          newEl = { type: "path", points: [
            { x: cx - 40, y: cy },
            { x: cx - 20, y: cy - 15 },
            { x: cx, y: cy + 10 },
            { x: cx + 20, y: cy - 5 },
            { x: cx + 40, y: cy },
          ], ...baseProps };
          break;
        // ── Furniture & Fixtures ──────────────────────────────
        case "bed":
          newEl = { type: "bed", x: cx - 50, y: cy - 35, w: 100, h: 70, pillows: 2, ...baseProps };
          break;
        case "sofa":
          newEl = { type: "sofa", x: cx - 60, y: cy - 25, w: 120, h: 50, ...baseProps };
          break;
        case "dining-table":
          newEl = { type: "dining-table", x: cx - 60, y: cy - 40, w: 120, h: 80, seats: 2, ...baseProps };
          break;
        case "toilet":
          newEl = { type: "toilet", x: cx - 20, y: cy - 30, w: 40, h: 60, ...baseProps };
          break;
        case "bathtub":
          newEl = { type: "bathtub", x: cx - 35, y: cy - 60, w: 70, h: 120, ...baseProps };
          break;
        case "sink":
          newEl = { type: "sink", x: cx - 25, y: cy - 25, w: 50, h: 50, ...baseProps };
          break;
        case "armchair":
          newEl = { type: "armchair", x: cx - 35, y: cy - 35, w: 70, h: 70, ...baseProps };
          break;
        case "desk":
          newEl = { type: "desk", x: cx - 55, y: cy - 35, w: 110, h: 70, ...baseProps };
          break;
        case "bookshelf":
          newEl = { type: "bookshelf", x: cx - 50, y: cy - 20, w: 100, h: 40, shelves: 3, ...baseProps };
          break;
        case "stove":
          newEl = { type: "stove", x: cx - 35, y: cy - 35, w: 70, h: 70, burners: 4, ...baseProps };
          break;
        case "shower":
          newEl = { type: "shower", x: cx - 40, y: cy - 40, w: 80, h: 80, ...baseProps };
          break;
        default:
          return;
      }

      updateSketch({
        elements: [...sketch.elements, newEl as SketchData["elements"][number]],
      });
    },
    [sketch, updateSketch]
  );

  /**
   * Add a freehand path element from an array of points.
   * Returns the index of the newly added element.
   */
  const addPathElement = useCallback(
    (points: { x: number; y: number }[]) => {
      if (points.length < 2) return -1;
      const newEl = { type: "path" as const, points, color: sketch.inkColor };
      const newIdx = sketch.elements.length;
      updateSketch({
        elements: [...sketch.elements, newEl as SketchData["elements"][number]],
      });
      setSelectedElements(new Set([newIdx]));
      return newIdx;
    },
    [sketch, updateSketch, setSelectedElements]
  );

  /**
   * Add an element at an explicit canvas position (used by drag-from-panel).
   * The element is centered on (dropX, dropY).
   */
  const addElementAt = useCallback(
    (type: string, dropX: number, dropY: number) => {
      const baseProps = { color: sketch.inkColor };
      let newEl;
      const cx = dropX;
      const cy = dropY;

      switch (type) {
        case "line":
          newEl = { type: "line", x1: cx - 60, y1: cy, x2: cx + 60, y2: cy, ...baseProps };
          break;
        case "rect":
          newEl = { type: "rect", x: cx - 60, y: cy - 40, w: 120, h: 80, ...baseProps };
          break;
        case "circle":
          newEl = { type: "circle", cx, cy, r: 45, ...baseProps };
          break;
        case "arc":
          newEl = { type: "arc", cx, cy, r: 40, startAngle: 0, endAngle: 90, ...baseProps };
          break;
        case "arrow":
          newEl = { type: "arrow", x1: cx - 70, y1: cy, x2: cx + 70, y2: cy, ...baseProps };
          break;
        case "text":
          newEl = { type: "text", x: cx, y: cy, text: "Text", fontSize: 18, ...baseProps };
          break;
        case "dashed":
          newEl = { type: "dashed", x1: cx - 70, y1: cy, x2: cx + 70, y2: cy, ...baseProps };
          break;
        case "dim":
          newEl = { type: "dim", x1: cx - 80, y1: cy, x2: cx + 80, y2: cy, label: "5.0m", ...baseProps };
          break;
        case "window":
          newEl = { type: "window", x1: cx - 50, y1: cy, x2: cx + 50, y2: cy, color: "#336" };
          break;
        case "door-symbol":
          newEl = { type: "door-symbol", x: cx, y: cy, w: 70, swing: "left", ...baseProps };
          break;
        case "door-slide":
          newEl = { type: "door-slide", x: cx, y: cy, w: 70, direction: "right", ...baseProps };
          break;
        case "stair":
          newEl = { type: "stair", x: cx - 30, y: cy - 50, w: 60, h: 100, steps: 8, ...baseProps };
          break;
        case "opening":
          newEl = { type: "opening", x1: cx - 40, y1: cy, x2: cx + 40, y2: cy, ...baseProps };
          break;
        case "column":
          newEl = { type: "column", cx, cy, size: 12, ...baseProps };
          break;
        case "path":
          newEl = { type: "path", points: [
            { x: cx - 40, y: cy },
            { x: cx - 20, y: cy - 15 },
            { x: cx, y: cy + 10 },
            { x: cx + 20, y: cy - 5 },
            { x: cx + 40, y: cy },
          ], ...baseProps };
          break;
        // ── Furniture & Fixtures ──────────────────────────────
        case "bed":
          newEl = { type: "bed", x: cx - 50, y: cy - 35, w: 100, h: 70, pillows: 2, ...baseProps };
          break;
        case "sofa":
          newEl = { type: "sofa", x: cx - 60, y: cy - 25, w: 120, h: 50, ...baseProps };
          break;
        case "dining-table":
          newEl = { type: "dining-table", x: cx - 60, y: cy - 40, w: 120, h: 80, seats: 2, ...baseProps };
          break;
        case "toilet":
          newEl = { type: "toilet", x: cx - 20, y: cy - 30, w: 40, h: 60, ...baseProps };
          break;
        case "bathtub":
          newEl = { type: "bathtub", x: cx - 35, y: cy - 60, w: 70, h: 120, ...baseProps };
          break;
        case "sink":
          newEl = { type: "sink", x: cx - 25, y: cy - 25, w: 50, h: 50, ...baseProps };
          break;
        case "armchair":
          newEl = { type: "armchair", x: cx - 35, y: cy - 35, w: 70, h: 70, ...baseProps };
          break;
        case "desk":
          newEl = { type: "desk", x: cx - 55, y: cy - 35, w: 110, h: 70, ...baseProps };
          break;
        case "bookshelf":
          newEl = { type: "bookshelf", x: cx - 50, y: cy - 20, w: 100, h: 40, shelves: 3, ...baseProps };
          break;
        case "stove":
          newEl = { type: "stove", x: cx - 35, y: cy - 35, w: 70, h: 70, burners: 4, ...baseProps };
          break;
        case "shower":
          newEl = { type: "shower", x: cx - 40, y: cy - 40, w: 80, h: 80, ...baseProps };
          break;
        default:
          return;
      }

      const newIdx = sketch.elements.length;
      updateSketch({
        elements: [...sketch.elements, newEl as SketchData["elements"][number]],
      });
      // Auto-select the newly placed element
      setSelectedElements(new Set([newIdx]));
    },
    [sketch, updateSketch, setSelectedElements]
  );

  const deleteSelected = useCallback(() => {
    if (selectedElements.size === 0) return;
    // Skip deletion of locked elements
    const newElements = sketch.elements.filter((el, i) => {
      if (!selectedElements.has(i)) return true; // not selected, keep
      return !!(el as unknown as Record<string, unknown>).locked; // locked → keep
    });
    updateSketch({ elements: newElements });
    setSelectedElements(new Set());
  }, [sketch.elements, selectedElements, updateSketch]);

  // Resize a single element silently (no undo entry) — used during live resize drag
  const resizeElement = useCallback(
    (idx: number, updates: Record<string, number>) => {
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (i !== idx) return el;
          return { ...el, ...updates } as SketchData["elements"][number];
        });
        const next = { ...prev, elements: newElements };
        jsonRef.current = JSON.stringify(next, null, 2);
        return next;
      });
    },
    []
  );

  // Commit current state to undo history after resize ends
  const commitResize = useCallback(() => {
    setSketch((prev) => {
      pushHistory(prev);
      return prev;
    });
  }, [pushHistory]);

  // Rotate a single element silently (no undo entry) - used during live rotate drag
  const rotateElementSilent = useCallback(
    (idx: number, angleDeg: number) => {
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (i !== idx) return el;
          return { ...el, rotation: ((angleDeg % 360) + 360) % 360 } as SketchData["elements"][number];
        });
        const next = { ...prev, elements: newElements };
        jsonRef.current = JSON.stringify(next, null, 2);
        return next;
      });
    },
    []
  );

  // Commit current state to undo history after rotation drag ends
  const commitRotate = useCallback(() => {
    setSketch((prev) => {
      pushHistory(prev);
      return prev;
    });
  }, [pushHistory]);

  // Move selected elements silently (no undo entry) — used during live drag
  const moveSelected = useCallback(
    (dx: number, dy: number) => {
      if (selectedElements.size === 0) return;
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (!selectedElements.has(i)) return el;
          return translateElement(el, dx, dy);
        });
        const next = { ...prev, elements: newElements as SketchData["elements"] };
        jsonRef.current = JSON.stringify(next, null, 2);
        return next;
      });
    },
    [selectedElements]
  );

  // Commit current state to undo history (called once when drag ends)
  const commitDrag = useCallback(() => {
    setSketch((prev) => {
      pushHistory(prev);
      return prev;
    });
  }, [pushHistory]);

  const copySelected = useCallback(() => {
    if (selectedElements.size === 0) return;
    clipboardRef.current = sketch.elements.filter((_, i) =>
      selectedElements.has(i)
    );
  }, [sketch.elements, selectedElements]);

  const pasteElements = useCallback(() => {
    if (clipboardRef.current.length === 0) return;
    // Offset pasted elements by 20px so they don't land exactly on top
    const OFFSET = 20;
    const pasted = clipboardRef.current.map((el) =>
      translateElement(el, OFFSET, OFFSET)
    ) as SketchData["elements"];
    const newElements = [...sketch.elements, ...pasted];
    const pastedIndices = new Set(
      Array.from({ length: pasted.length }, (_, i) => sketch.elements.length + i)
    );
    updateSketch({ elements: newElements });
    setSelectedElements(pastedIndices);
  }, [sketch.elements, updateSketch]);

  /** Paste in place — paste copied elements at their original position (no offset). */
  const pasteInPlace = useCallback(() => {
    if (clipboardRef.current.length === 0) return;
    const pasted = [...clipboardRef.current] as SketchData["elements"];
    const newElements = [...sketch.elements, ...pasted];
    const pastedIndices = new Set(
      Array.from({ length: pasted.length }, (_, i) => sketch.elements.length + i)
    );
    updateSketch({ elements: newElements });
    setSelectedElements(pastedIndices);
  }, [sketch.elements, updateSketch]);

  /**
   * Copy the visual style properties (color, strokeWidth, fillColor, fontFamily,
   * opacity, wallWidth, textColor) from the first selected element to the style clipboard.
   * Does not copy geometric coordinates.
   */
  const copyStyle = useCallback(() => {
    if (selectedElements.size === 0) return;
    const idx = [...selectedElements][0];
    const el = sketch.elements[idx];
    if (!el) return;
    const a = el as unknown as Record<string, unknown>;
    styleClipboardRef.current = {
      ...(typeof a.color === "string"       ? { color: a.color }                     : {}),
      ...(typeof a.strokeWidth === "number" ? { strokeWidth: a.strokeWidth }         : {}),
      ...(typeof a.fillColor === "string"   ? { fillColor: a.fillColor }             : {}),
      ...(typeof a.fontFamily === "string"  ? { fontFamily: a.fontFamily }           : {}),
      ...(typeof a.opacity === "number"     ? { opacity: a.opacity }                 : {}),
      ...(typeof a.wallWidth === "number"   ? { wallWidth: a.wallWidth }             : {}),
      ...(typeof a.textColor === "string"   ? { textColor: a.textColor }             : {}),
    };
    setHasStyleClipboard(true);
  }, [sketch.elements, selectedElements]);

  /**
   * Paste the style clipboard's visual properties onto all currently selected elements.
   * If the style clipboard is empty, does nothing.
   * Geometric coordinates are never modified.
   */
  const pasteStyle = useCallback(() => {
    const style = styleClipboardRef.current;
    if (!style || selectedElements.size === 0) return;
    setSketch((prev) => {
      const newElements = prev.elements.map((el, i) => {
        if (!selectedElements.has(i)) return el;
        const a = el as unknown as Record<string, unknown>;
        // Build merged element: apply each style prop if it was in the clipboard.
        // For wallWidth, only apply to line elements.
        const merged: Record<string, unknown> = { ...a };
        if ("color" in style)       merged.color       = style.color;
        if ("strokeWidth" in style) merged.strokeWidth = style.strokeWidth;
        if ("fillColor" in style)   merged.fillColor   = style.fillColor;
        if ("fontFamily" in style && (el.type === "text" || el.type === "dim")) {
          merged.fontFamily = style.fontFamily;
        }
        if ("opacity" in style)     merged.opacity     = style.opacity;
        if ("wallWidth" in style && el.type === "line") merged.wallWidth = style.wallWidth;
        if ("textColor" in style)   merged.textColor   = style.textColor;
        return merged as unknown as SketchData["elements"][number];
      });
      const next = { ...prev, elements: newElements as SketchData["elements"] };
      jsonRef.current = JSON.stringify(next, null, 2);
      pushHistory(next);
      return next;
    });
  }, [selectedElements, pushHistory]);

  /**
   * Select all elements of the same type as the currently selected element(s).
   * If nothing is selected, does nothing.
   */
  const selectSameType = useCallback(() => {
    if (selectedElements.size === 0) return;
    // Collect types of currently selected elements
    const types = new Set(
      Array.from(selectedElements).map((i) => sketch.elements[i]?.type).filter(Boolean)
    );
    const matching = new Set(
      sketch.elements
        .map((el, i) => (types.has(el.type) ? i : -1))
        .filter((i) => i >= 0)
    );
    setSelectedElements(matching);
  }, [sketch.elements, selectedElements]);

  /** Set the color of all selected elements */
  const colorSelected = useCallback(
    (color: string) => {
      if (selectedElements.size === 0) return;
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (!selectedElements.has(i)) return el;
          return { ...el, color };
        });
        const next = { ...prev, elements: newElements as SketchData["elements"] };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [selectedElements, pushHistory]
  );

  /** Set the strokeWidth of all selected elements */
  const strokeWidthSelected = useCallback(
    (strokeWidth: number) => {
      if (selectedElements.size === 0) return;
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (!selectedElements.has(i)) return el;
          return { ...el, strokeWidth };
        });
        const next = { ...prev, elements: newElements as SketchData["elements"] };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [selectedElements, pushHistory]
  );

  /** Set the fillColor of all selected elements (or remove it with "none" / undefined) */
  const fillColorSelected = useCallback(
    (fillColor: string | undefined) => {
      if (selectedElements.size === 0) return;
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (!selectedElements.has(i)) return el;
          if (fillColor === undefined || fillColor === "none") {
            // Remove fillColor property entirely
            const { fillColor: _removed, ...rest } = el as typeof el & { fillColor?: string };
            void _removed;
            return rest as SketchData["elements"][number];
          }
          return { ...el, fillColor };
        });
        const next = { ...prev, elements: newElements as SketchData["elements"] };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [selectedElements, pushHistory]
  );

  /**
   * Set the fontFamily override on all selected text / dim elements.
   * Pass undefined to remove the per-element override (falls back to sketch.textFont / sketch.dimFont).
   */
  const fontFamilySelected = useCallback(
    (fontFamily: string | undefined) => {
      if (selectedElements.size === 0) return;
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (!selectedElements.has(i)) return el;
          if (el.type !== "text" && el.type !== "dim") return el;
          if (fontFamily === undefined) {
            const { fontFamily: _removed, ...rest } = el as typeof el & { fontFamily?: string };
            void _removed;
            return rest as SketchData["elements"][number];
          }
          return { ...el, fontFamily };
        });
        const next = { ...prev, elements: newElements as SketchData["elements"] };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [selectedElements, pushHistory]
  );

  /**
   * Set opacity on all selected elements (0 = transparent, 1 = opaque).
   * Pass undefined to remove the per-element opacity override (falls back to tool opacity).
   */
  const opacitySelected = useCallback(
    (opacity: number | undefined) => {
      if (selectedElements.size === 0) return;
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (!selectedElements.has(i)) return el;
          if (opacity === undefined || opacity >= 1) {
            // Remove opacity property (use tool default)
            const { opacity: _removed, ...rest } = el as typeof el & { opacity?: number };
            void _removed;
            return rest as SketchData["elements"][number];
          }
          return { ...el, opacity };
        });
        const next = { ...prev, elements: newElements as SketchData["elements"] };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [selectedElements, pushHistory]
  );

  const rotateSelected = useCallback(
    (degrees: number) => {
      if (selectedElements.size === 0) return;
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (!selectedElements.has(i)) return el;
          const current = el.rotation ?? 0;
          const next = ((current + degrees) % 360 + 360) % 360;
          return { ...el, rotation: next };
        });
        const next = { ...prev, elements: newElements as SketchData["elements"] };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [selectedElements, pushHistory]
  );

  /** Nudge selected elements by (dx, dy) and commit to undo history */
  const nudgeSelected = useCallback(
    (dx: number, dy: number) => {
      if (selectedElements.size === 0) return;
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (!selectedElements.has(i)) return el;
          return translateElement(el, dx, dy);
        });
        const next = { ...prev, elements: newElements as SketchData["elements"] };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [selectedElements, pushHistory]
  );

  /** Select all elements */
  const selectAll = useCallback(() => {
    setSelectedElements(new Set(sketch.elements.map((_, i) => i)));
  }, [sketch.elements]);

  const redraw = useCallback(() => {
    setSketch((prev) => {
      const next = { ...prev, sessionSeed: newSessionSeed() };
      jsonRef.current = JSON.stringify(next, null, 2);
      return next;
    });
    setRedrawKey((k) => k + 1);
  }, []);

  /** Replace the entire sketch with imported data (e.g., from a JSON file) */
  const importSketch = useCallback((data: SketchData) => {
    const withSeed = { ...data, sessionSeed: newSessionSeed() };
    setSketch(withSeed);
    setActivePreset("");
    jsonRef.current = JSON.stringify(withSeed, null, 2);
    setSelectedElements(new Set());
    pushHistory(withSeed);
    setRedrawKey((k) => k + 1);
  }, [pushHistory]);

  /** Clear canvas and start blank */
  const newSketch = useCallback(() => {
    const blank: SketchData = {
      paper: "cream",
      tool: "ballpoint",
      inkColor: "#111111",
      amplitude: 0.5,
      waves: 0.5,
      humanness: 0.5,
      width: 900,
      height: 650,
      sessionSeed: newSessionSeed(),
      elements: [],
    };
    setSketch(blank);
    setActivePreset("");
    jsonRef.current = JSON.stringify(blank, null, 2);
    setSelectedElements(new Set());
    pushHistory(blank);
    setRedrawKey((k) => k + 1);
  }, [pushHistory]);

  /** Move selected elements in the z-order (rendering order) */
  const reorderSelected = useCallback(
    (direction: "front" | "back" | "forward" | "backward") => {
      if (selectedElements.size === 0) return;
      setSketch((prev) => {
        const indices = [...selectedElements].sort((a, b) => a - b);
        const elements = [...prev.elements];
        const n = elements.length;

        if (direction === "front") {
          // Remove selected, append at end
          const selected = indices.map((i) => elements[i]);
          const rest = elements.filter((_, i) => !selectedElements.has(i));
          const next = { ...prev, elements: [...rest, ...selected] as SketchData["elements"] };
          jsonRef.current = JSON.stringify(next, null, 2);
          // Update selectedElements to new indices
          const newIndices = new Set(Array.from({ length: selected.length }, (_, i) => rest.length + i));
          pushHistory(next);
          setTimeout(() => setSelectedElements(newIndices), 0);
          return next;
        }

        if (direction === "back") {
          // Remove selected, prepend at start
          const selected = indices.map((i) => elements[i]);
          const rest = elements.filter((_, i) => !selectedElements.has(i));
          const next = { ...prev, elements: [...selected, ...rest] as SketchData["elements"] };
          jsonRef.current = JSON.stringify(next, null, 2);
          const newIndices = new Set(Array.from({ length: selected.length }, (_, i) => i));
          pushHistory(next);
          setTimeout(() => setSelectedElements(newIndices), 0);
          return next;
        }

        if (direction === "forward") {
          // Move each selected element one position toward the end (swap with next unselected)
          const newElements = [...elements];
          // Process from highest index to lowest to avoid cascading shifts
          for (let i = n - 1; i >= 0; i--) {
            if (selectedElements.has(i) && i < n - 1 && !selectedElements.has(i + 1)) {
              [newElements[i], newElements[i + 1]] = [newElements[i + 1], newElements[i]];
            }
          }
          const next = { ...prev, elements: newElements as SketchData["elements"] };
          jsonRef.current = JSON.stringify(next, null, 2);
          pushHistory(next);
          // Recompute selected indices after swap
          const newIndices = new Set<number>();
          newElements.forEach((el, idx) => {
            if (indices.some((oi) => elements[oi] === el)) newIndices.add(idx);
          });
          setTimeout(() => setSelectedElements(newIndices), 0);
          return next;
        }

        if (direction === "backward") {
          // Move each selected element one position toward the start (swap with prev unselected)
          const newElements = [...elements];
          for (let i = 0; i < n; i++) {
            if (selectedElements.has(i) && i > 0 && !selectedElements.has(i - 1)) {
              [newElements[i], newElements[i - 1]] = [newElements[i - 1], newElements[i]];
            }
          }
          const next = { ...prev, elements: newElements as SketchData["elements"] };
          jsonRef.current = JSON.stringify(next, null, 2);
          pushHistory(next);
          const newIndices = new Set<number>();
          newElements.forEach((el, idx) => {
            if (indices.some((oi) => elements[oi] === el)) newIndices.add(idx);
          });
          setTimeout(() => setSelectedElements(newIndices), 0);
          return next;
        }

        return prev;
      });
    },
    [selectedElements, pushHistory]
  );

  /**
   * Align selected elements along a shared edge or axis.
   * Requires 2+ selected elements.
   *
   * Align modes:
   *   left    — align left edges to the leftmost element's left edge
   *   right   — align right edges to the rightmost element's right edge
   *   top     — align top edges to the topmost element's top edge
   *   bottom  — align bottom edges to the bottommost element's bottom edge
   *   centerH — center horizontally (vertical axis)
   *   centerV — center vertically (horizontal axis)
   *   distributeH — distribute equal horizontal spacing between elements
   *   distributeV — distribute equal vertical spacing between elements
   */
  const alignSelected = useCallback(
    (
      mode:
        | "left"
        | "right"
        | "top"
        | "bottom"
        | "centerH"
        | "centerV"
        | "distributeH"
        | "distributeV"
    ) => {
      if (selectedElements.size < 2) return;

      setSketch((prev) => {
        const indices = [...selectedElements].sort((a, b) => a - b);

        /** Get [left, top, right, bottom] for any element */
        function bounds(el: SketchData["elements"][number]): {
          left: number;
          top: number;
          right: number;
          bottom: number;
          cx: number;
          cy: number;
        } {
          const a = el as unknown as Record<string, unknown>;
          if ("x1" in el && "x2" in el) {
            const x1 = a.x1 as number, y1 = a.y1 as number, x2 = a.x2 as number, y2 = a.y2 as number;
            return {
              left: Math.min(x1, x2), top: Math.min(y1, y2),
              right: Math.max(x1, x2), bottom: Math.max(y1, y2),
              cx: (x1 + x2) / 2, cy: (y1 + y2) / 2,
            };
          }
          if ("x" in el && "w" in el && "h" in el) {
            const x = a.x as number, y = a.y as number, w = a.w as number, h = a.h as number;
            return { left: x, top: y, right: x + w, bottom: y + h, cx: x + w / 2, cy: y + h / 2 };
          }
          if ("cx" in el && "r" in el) {
            const cx = (a.cx as number), cy = (a.cy as number), r = a.r as number;
            return { left: cx - r, top: cy - r, right: cx + r, bottom: cy + r, cx, cy };
          }
          if ("points" in el && Array.isArray(a.points)) {
            const pts = a.points as { x: number; y: number }[];
            if (pts.length > 0) {
              let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
              for (const p of pts) { l = Math.min(l, p.x); t = Math.min(t, p.y); r = Math.max(r, p.x); b = Math.max(b, p.y); }
              return { left: l, top: t, right: r, bottom: b, cx: (l + r) / 2, cy: (t + b) / 2 };
            }
          }
          if ("x" in el && "y" in el) {
            const x = a.x as number, y = a.y as number;
            return { left: x, top: y, right: x + 40, bottom: y + 20, cx: x + 20, cy: y + 10 };
          }
          return { left: 0, top: 0, right: 0, bottom: 0, cx: 0, cy: 0 };
        }

        /** Translate a single element by (dx, dy) */
        function shift(el: SketchData["elements"][number], dx: number, dy: number): SketchData["elements"][number] {
          return translateElement(el, dx, dy);
        }

        const selEls = indices.map((i) => prev.elements[i]);
        const selBounds = selEls.map(bounds);

        const minLeft = Math.min(...selBounds.map((b) => b.left));
        const maxRight = Math.max(...selBounds.map((b) => b.right));
        const minTop = Math.min(...selBounds.map((b) => b.top));
        const maxBottom = Math.max(...selBounds.map((b) => b.bottom));
        const groupCx = (minLeft + maxRight) / 2;
        const groupCy = (minTop + maxBottom) / 2;

        const newElements = [...prev.elements];

        if (mode === "distributeH") {
          // Sort selected by their center X
          const sorted = [...indices].sort(
            (a, b) => bounds(prev.elements[a]).cx - bounds(prev.elements[b]).cx
          );
          if (sorted.length < 3) return prev; // nothing to distribute with only 2
          const firstBounds = bounds(prev.elements[sorted[0]]);
          const lastBounds = bounds(prev.elements[sorted[sorted.length - 1]]);
          const totalW = selBounds.reduce((s, b) => s + (b.right - b.left), 0);
          const span = lastBounds.right - firstBounds.left;
          const gap = (span - totalW) / (sorted.length - 1);
          let cursor = firstBounds.left;
          sorted.forEach((origIdx) => {
            const b = bounds(prev.elements[origIdx]);
            const w = b.right - b.left;
            const dx = cursor - b.left;
            newElements[origIdx] = shift(newElements[origIdx], dx, 0);
            cursor += w + gap;
          });
        } else if (mode === "distributeV") {
          const sorted = [...indices].sort(
            (a, b) => bounds(prev.elements[a]).cy - bounds(prev.elements[b]).cy
          );
          if (sorted.length < 3) return prev;
          const firstBounds = bounds(prev.elements[sorted[0]]);
          const lastBounds = bounds(prev.elements[sorted[sorted.length - 1]]);
          const totalH = selBounds.reduce((s, b) => s + (b.bottom - b.top), 0);
          const span = lastBounds.bottom - firstBounds.top;
          const gap = (span - totalH) / (sorted.length - 1);
          let cursor = firstBounds.top;
          sorted.forEach((origIdx) => {
            const b = bounds(prev.elements[origIdx]);
            const h = b.bottom - b.top;
            const dy = cursor - b.top;
            newElements[origIdx] = shift(newElements[origIdx], 0, dy);
            cursor += h + gap;
          });
        } else {
          indices.forEach((origIdx, i) => {
            const b = selBounds[i];
            let dx = 0, dy = 0;
            switch (mode) {
              case "left":    dx = minLeft - b.left; break;
              case "right":   dx = maxRight - b.right; break;
              case "top":     dy = minTop - b.top; break;
              case "bottom":  dy = maxBottom - b.bottom; break;
              case "centerH": dx = groupCx - b.cx; break;
              case "centerV": dy = groupCy - b.cy; break;
            }
            if (dx !== 0 || dy !== 0) {
              newElements[origIdx] = shift(newElements[origIdx], dx, dy);
            }
          });
        }

        const next = { ...prev, elements: newElements as SketchData["elements"] };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [selectedElements, pushHistory]
  );

  /** Assign a shared groupId to all selected elements (Ctrl+G) */
  const groupSelected = useCallback(() => {
    if (selectedElements.size < 2) return;
    const gid = `g-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setSketch((prev) => {
      const newElements = prev.elements.map((el, i) => {
        if (!selectedElements.has(i)) return el;
        return { ...el, groupId: gid };
      });
      const next = { ...prev, elements: newElements as SketchData["elements"] };
      jsonRef.current = JSON.stringify(next, null, 2);
      pushHistory(next);
      return next;
    });
  }, [selectedElements, pushHistory]);

  /** Remove groupId from all selected elements (Ctrl+Shift+G) */
  const ungroupSelected = useCallback(() => {
    if (selectedElements.size === 0) return;
    setSketch((prev) => {
      const newElements = prev.elements.map((el, i) => {
        if (!selectedElements.has(i)) return el;
        const { groupId: _removed, ...rest } = el as typeof el & { groupId?: string };
        void _removed;
        return rest as SketchData["elements"][number];
      });
      const next = { ...prev, elements: newElements as SketchData["elements"] };
      jsonRef.current = JSON.stringify(next, null, 2);
      pushHistory(next);
      return next;
    });
  }, [selectedElements, pushHistory]);

  /** Toggle locked state on selected elements */
  const toggleLockSelected = useCallback(() => {
    if (selectedElements.size === 0) return;
    setSketch((prev) => {
      // If any selected element is unlocked, lock all; otherwise unlock all
      const anyUnlocked = [...selectedElements].some((i) => !prev.elements[i]?.locked);
      const newElements = prev.elements.map((el, i) => {
        if (!selectedElements.has(i)) return el;
        return { ...el, locked: anyUnlocked };
      });
      const next = { ...prev, elements: newElements as SketchData["elements"] };
      jsonRef.current = JSON.stringify(next, null, 2);
      pushHistory(next);
      return next;
    });
  }, [selectedElements, pushHistory]);

  /** Toggle visibility of an element by index */
  const toggleVisibility = useCallback(
    (idx: number) => {
      setSketch((prev) => {
        const el = prev.elements[idx];
        if (!el) return prev;
        const newElements = prev.elements.map((e, i) => {
          if (i !== idx) return e;
          return { ...e, visible: e.visible === false ? undefined : false };
        });
        const next = { ...prev, elements: newElements as SketchData["elements"] };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [pushHistory]
  );

  /** Update any field(s) of a single element by index and push to undo history */
  const updateElement = useCallback(
    (idx: number, updates: Record<string, unknown>) => {
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (i !== idx) return el;
          return { ...el, ...updates } as SketchData["elements"][number];
        });
        const next = { ...prev, elements: newElements };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [pushHistory]
  );

  // ── Layer operations ──────────────────────────────────────────────────────

  /** Toggle visibility of a named layer (by id) */
  const setLayerVisibility = useCallback(
    (layerId: string, visible: boolean) => {
      setSketch((prev) => {
        const layers = (prev.layers ?? []).map((l) =>
          l.id === layerId ? { ...l, visible } : l
        );
        const next = { ...prev, layers };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [pushHistory]
  );

  /** Assign all selected elements to a layer id (or undefined to remove layer assignment) */
  const setElementLayer = useCallback(
    (layerId: string | undefined) => {
      if (selectedElements.size === 0) return;
      setSketch((prev) => {
        const newElements = prev.elements.map((el, i) => {
          if (!selectedElements.has(i)) return el;
          const next = { ...el } as SketchData["elements"][number];
          if (layerId === undefined) {
            const { layer: _l, ...rest } = next as typeof next & { layer?: string };
            void _l;
            return rest as SketchData["elements"][number];
          }
          return { ...next, layer: layerId };
        });
        const updated = { ...prev, elements: newElements };
        jsonRef.current = JSON.stringify(updated, null, 2);
        pushHistory(updated);
        return updated;
      });
    },
    [selectedElements, pushHistory]
  );

  /** Add a new custom layer */
  const addLayer = useCallback(
    (layer: SketchLayer) => {
      setSketch((prev) => {
        const layers = [...(prev.layers ?? []), layer];
        const next = { ...prev, layers };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [pushHistory]
  );

  /** Remove a layer and unassign any elements on it */
  const removeLayer = useCallback(
    (layerId: string) => {
      setSketch((prev) => {
        const layers = (prev.layers ?? []).filter((l) => l.id !== layerId);
        const newElements = prev.elements.map((el) => {
          if ((el as typeof el & { layer?: string }).layer !== layerId) return el;
          const { layer: _l, ...rest } = el as typeof el & { layer?: string };
          void _l;
          return rest as SketchData["elements"][number];
        });
        const next = { ...prev, layers, elements: newElements };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [pushHistory]
  );

  /** Rename a layer */
  const renameLayer = useCallback(
    (layerId: string, name: string) => {
      setSketch((prev) => {
        const layers = (prev.layers ?? []).map((l) =>
          l.id === layerId ? { ...l, name } : l
        );
        const next = { ...prev, layers };
        jsonRef.current = JSON.stringify(next, null, 2);
        pushHistory(next);
        return next;
      });
    },
    [pushHistory]
  );

  const undo = useCallback(() => {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current--;
    const state = historyRef.current[historyIndexRef.current];
    setSketch(state);
    jsonRef.current = JSON.stringify(state, null, 2);
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(true);
    setSelectedElements(new Set());
  }, []);

  const redo = useCallback(() => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current++;
    const state = historyRef.current[historyIndexRef.current];
    setSketch(state);
    jsonRef.current = JSON.stringify(state, null, 2);
    setCanUndo(true);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
    setSelectedElements(new Set());
  }, []);

  return {
    sketch,
    activePreset,
    selectedElements,
    setSelectedElements,
    redrawKey,
    jsonText: jsonRef.current,
    setPaper,
    setTool,
    setAmplitude,
    setWaves,
    setHumanness,
    setInkColor,
    setTextFont,
    setDimFont,
    setRoomFont,
    setTitleFont,
    loadPreset,
    updateFromJson,
    addElement,
    addElementAt,
    addPathElement,
    deleteSelected,
    moveSelected,
    commitDrag,
    resizeElement,
    commitResize,
    rotateElementSilent,
    commitRotate,
    copySelected,
    pasteElements,
    pasteInPlace,
    copyStyle,
    pasteStyle,
    hasStyleClipboard,
    selectSameType,
    colorSelected,
    rotateSelected,
    redraw,
    importSketch,
    newSketch,
    updateSketch,
    undo,
    redo,
    canUndo,
    canRedo,
    updateElement,
    nudgeSelected,
    selectAll,
    strokeWidthSelected,
    fillColorSelected,
    fontFamilySelected,
    opacitySelected,
    setRenderStyle,
    setSnapGrid,
    setMetadata,
    setTitle,
    reorderSelected,
    toggleLockSelected,
    alignSelected,
    groupSelected,
    ungroupSelected,
    toggleVisibility,
    setLayerVisibility,
    setElementLayer,
    addLayer,
    removeLayer,
    renameLayer,
  };
}

// --- Helper: translate any element by (dx, dy) ---
function translateElement(
  el: SketchData["elements"][number],
  dx: number,
  dy: number
): SketchData["elements"][number] {
  const a = el as unknown as Record<string, unknown>;
  if ("points" in el && Array.isArray(a.points)) {
    const pts = a.points as { x: number; y: number }[];
    return { ...el, points: pts.map((p) => ({ x: p.x + dx, y: p.y + dy })) };
  }
  if ("x1" in el && "y1" in el && "x2" in el && "y2" in el) {
    return { ...el, x1: (a.x1 as number) + dx, y1: (a.y1 as number) + dy, x2: (a.x2 as number) + dx, y2: (a.y2 as number) + dy };
  }
  if ("x" in el && "y" in el && "w" in el) {
    return { ...el, x: (a.x as number) + dx, y: (a.y as number) + dy };
  }
  if ("cx" in el && "cy" in el) {
    return { ...el, cx: (a.cx as number) + dx, cy: (a.cy as number) + dy };
  }
  if ("x" in el && "y" in el) {
    return { ...el, x: (a.x as number) + dx, y: (a.y as number) + dy };
  }
  return el;
}
