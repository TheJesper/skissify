"use client";

import { useState, useCallback, useRef } from "react";
import { SketchData, PaperType, ToolType } from "@/lib/types";
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

  const loadPreset = useCallback((name: string) => {
    const preset = presets[name];
    if (preset) {
      const withSeed = { ...preset, sessionSeed: newSessionSeed() };
      setSketch(withSeed);
      setActivePreset(name);
      jsonRef.current = JSON.stringify(withSeed, null, 2);
      setSelectedElements(new Set());
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
        default:
          return;
      }

      updateSketch({
        elements: [...sketch.elements, newEl as SketchData["elements"][number]],
      });
    },
    [sketch, updateSketch]
  );

  const deleteSelected = useCallback(() => {
    if (selectedElements.size === 0) return;
    const newElements = sketch.elements.filter((_, i) => !selectedElements.has(i));
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
    loadPreset,
    updateFromJson,
    addElement,
    deleteSelected,
    moveSelected,
    commitDrag,
    resizeElement,
    commitResize,
    copySelected,
    pasteElements,
    rotateSelected,
    redraw,
    importSketch,
    newSketch,
    updateSketch,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}

// --- Helper: translate any element by (dx, dy) ---
function translateElement(
  el: SketchData["elements"][number],
  dx: number,
  dy: number
): SketchData["elements"][number] {
  const a = el as unknown as Record<string, unknown>;
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
