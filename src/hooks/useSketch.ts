"use client";

import { useState, useCallback, useRef } from "react";
import { SketchData, PaperType, ToolType } from "@/lib/types";
import { presets, defaultPreset } from "@/lib/presets";

const MAX_HISTORY = 50;

export function useSketch(initialData?: SketchData) {
  const initial = initialData ?? presets[defaultPreset];
  const [sketch, setSketch] = useState<SketchData>(initial);
  const [activePreset, setActivePreset] = useState<string>(initialData ? "" : defaultPreset);
  const [selectedElements, setSelectedElements] = useState<Set<number>>(new Set());
  const [redrawKey, setRedrawKey] = useState(0);
  const jsonRef = useRef<string>(JSON.stringify(initial, null, 2));

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

  const loadPreset = useCallback((name: string) => {
    const preset = presets[name];
    if (preset) {
      setSketch(preset);
      setActivePreset(name);
      jsonRef.current = JSON.stringify(preset, null, 2);
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

  const redraw = useCallback(() => {
    setRedrawKey((k) => k + 1);
  }, []);

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
    loadPreset,
    updateFromJson,
    addElement,
    deleteSelected,
    redraw,
    updateSketch,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
