"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useSketch } from "@/hooks/useSketch";
import { SketchData } from "@/lib/types";
import { presets } from "@/lib/presets";
import { decodeSketchFromURL } from "@/lib/url-encoding";
import Toolbar from "@/components/Toolbar";
import PresetTabs from "@/components/PresetTabs";
import ControlPanel from "@/components/ControlPanel";
import Canvas from "@/components/Canvas";
import JsonEditor from "@/components/JsonEditor";
import { loadAutosave, useAutosave } from "@/hooks/useAutosave";
import { renderSketchToSVG } from "@/lib/svg-renderer";

function EditorContent() {
  const searchParams = useSearchParams();
  const forkSlug = searchParams.get("fork");
  const editSlug = searchParams.get("edit");
  const presetParam = searchParams.get("preset");
  const [loadedSlug, setLoadedSlug] = useState<string | null>(editSlug);
  const [initialData, setInitialData] = useState<SketchData | null>(
    presetParam && presets[presetParam] ? presets[presetParam] : null
  );
  const [initialPreset] = useState<string | null>(
    presetParam && presets[presetParam] ? presetParam : null
  );
  const [loading, setLoading] = useState(true);
  const [restoredFromAutosave, setRestoredFromAutosave] = useState(false);

  useEffect(() => {
    // First check URL hash for encoded sketch data
    const hash = window.location.hash;
    if (hash) {
      const hashData = decodeSketchFromURL(hash);
      if (hashData && hashData.elements) {
        setInitialData(hashData);
        setLoading(false);
        // Clear hash after loading so URL stays clean
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        return;
      }
    }

    // Then check query params for fork/edit
    const slug = forkSlug || editSlug;
    if (!slug && !presetParam) {
      // No URL context — try to restore from autosave
      const autosaved = loadAutosave();
      if (autosaved) {
        setInitialData(autosaved);
        setRestoredFromAutosave(true);
      }
      setLoading(false);
      return;
    }
    if (!slug) {
      setLoading(false);
      return;
    }

    fetch(`/api/sketches/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.data) {
          setInitialData(data.data);
          if (editSlug) setLoadedSlug(editSlug);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [forkSlug, editSlug]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#fdf6e3] text-[#657b83] gap-4">
        <div className="w-8 h-8 border-2 border-[#eee8d5] border-t-[#268bd2] rounded-full animate-spin" />
        <span className="text-sm">Loading sketch...</span>
      </div>
    );
  }

  return (
    <EditorInner
      initialData={initialData}
      loadedSlug={loadedSlug}
      initialPreset={initialPreset}
      restoredFromAutosave={restoredFromAutosave}
    />
  );
}

function EditorInner({
  initialData,
  loadedSlug,
  initialPreset,
  restoredFromAutosave,
}: {
  initialData: SketchData | null;
  loadedSlug: string | null;
  initialPreset?: string | null;
  restoredFromAutosave?: boolean;
}) {
  const {
    sketch,
    activePreset,
    selectedElements,
    setSelectedElements,
    redrawKey,
    setPaper,
    setTool,
    setAmplitude,
    setWaves,
    setHumanness,
    setInkColor,
    setTextFont,
    setDimFont,
    loadPreset,
    updateFromJson,
    addElement,
    addElementAt,
    deleteSelected,
    moveSelected,
    commitDrag,
    resizeElement,
    commitResize,
    copySelected,
    pasteElements,
    pasteInPlace,
    selectSameType,
    addPathElement,
    colorSelected,
    strokeWidthSelected,
    fillColorSelected,
    fontFamilySelected,
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
    setRenderStyle,
    setSnapGrid,
    setMetadata,
    rotateElementSilent,
    commitRotate,
    reorderSelected,
    toggleLockSelected,
    alignSelected,
    groupSelected,
    ungroupSelected,
    toggleVisibility,
  } = useSketch(initialData ?? undefined, initialPreset ?? undefined);

  const [sketchSlug, setSketchSlug] = useState<string | null>(loadedSlug);

  // Freehand draw mode state
  const [drawMode, setDrawMode] = useState(false);

  // Inline text edit state
  const [editingElement, setEditingElement] = useState<{ idx: number; field: string; value: string } | null>(null);
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);
  const [showAutosaveToast, setShowAutosaveToast] = useState(!!restoredFromAutosave);
  const { savedAt: autosaveSavedAt } = useAutosave(sketch);

  // Show a one-time toast when restored from autosave
  useEffect(() => {
    if (restoredFromAutosave) {
      const timer = setTimeout(() => setShowAutosaveToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [restoredFromAutosave]);

  /** Handle element selection from the Elements List panel */
  const handleSelectFromList = useCallback(
    (idx: number, shiftKey: boolean) => {
      setSelectedElements((prev) => {
        if (shiftKey) {
          const next = new Set(prev);
          if (next.has(idx)) next.delete(idx);
          else next.add(idx);
          return next;
        }
        return new Set([idx]);
      });
    },
    [setSelectedElements]
  );

  const handlePrint = useCallback(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const win = window.open();
    if (win) {
      win.document.write(
        `<img src="${dataUrl}" style="max-width:100%" onload="window.print();window.close()" />`
      );
    }
  }, []);

  const handleDownload = useCallback(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    // Use slug if saved, otherwise timestamp
    const filename = sketchSlug
      ? `skissify-${sketchSlug}.png`
      : `skissify-${new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-")}.png`;
    a.download = filename;
    a.click();
  }, [sketchSlug]);

  const handleDownloadSVG = useCallback(() => {
    const svgString = renderSketchToSVG(sketch);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const filename = sketchSlug
      ? `skissify-${sketchSlug}.svg`
      : `skissify-${new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-")}.svg`;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [sketch, sketchSlug]);

  const handleDownloadJSON = useCallback(() => {
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

  const handleResize = useCallback(
    (w: number, h: number) => {
      updateSketch({ width: w, height: h });
    },
    [updateSketch]
  );

  const handleDoubleClickElement = useCallback(
    (idx: number) => {
      const el = sketch.elements[idx];
      if (!el) return;
      // Determine which text field to edit
      if (el.type === "text") {
        const t = el as unknown as Record<string, unknown>;
        const val = (t.text ?? t.content ?? "") as string;
        setEditingElement({ idx, field: "text", value: val });
      } else if (el.type === "rect") {
        const r = el as unknown as Record<string, unknown>;
        setEditingElement({ idx, field: "label", value: (r.label ?? "") as string });
      } else if (el.type === "dim") {
        const d = el as unknown as Record<string, unknown>;
        setEditingElement({ idx, field: "label", value: (d.label ?? "") as string });
      }
    },
    [sketch.elements]
  );

  const commitInlineEdit = useCallback(() => {
    if (!editingElement) return;
    updateElement(editingElement.idx, { [editingElement.field]: editingElement.value });
    setEditingElement(null);
  }, [editingElement, updateElement]);

  const cancelInlineEdit = useCallback(() => {
    setEditingElement(null);
  }, []);

  // Handle right-click context menu actions
  const handleContextMenuAction = useCallback(
    (actionId: string) => {
      switch (actionId) {
        case "duplicate":
          copySelected();
          pasteElements();
          break;
        case "paste-in-place":
          pasteInPlace();
          break;
        case "select-same-type":
          selectSameType();
          break;
        case "copy":
          copySelected();
          break;
        case "bring-front":
          reorderSelected("front");
          break;
        case "send-back":
          reorderSelected("back");
          break;
        case "align-left":
          alignSelected("left");
          break;
        case "align-center-h":
          alignSelected("centerH");
          break;
        case "align-right":
          alignSelected("right");
          break;
        case "lock":
        case "unlock":
          toggleLockSelected();
          break;
        case "group":
          groupSelected();
          break;
        case "ungroup":
          ungroupSelected();
          break;
        case "delete":
          deleteSelected();
          break;
        case "edit-text": {
          const idx = [...selectedElements][0];
          if (idx !== undefined) handleDoubleClickElement(idx);
          break;
        }
        default:
          break;
      }
    },
    [copySelected, pasteElements, pasteInPlace, selectSameType, reorderSelected, alignSelected, toggleLockSelected, groupSelected, ungroupSelected, deleteSelected, selectedElements, handleDoubleClickElement]
  );

  const handleSave = useCallback(async (): Promise<string | null> => {
    try {
      if (sketchSlug) {
        // Update existing
        const res = await fetch(`/api/sketches/${sketchSlug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: sketch }),
        });
        if (res.ok) return sketchSlug;
      }

      // Create new
      const res = await fetch("/api/sketches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: sketch, title: "Untitled Sketch" }),
      });
      if (res.ok) {
        const { slug } = await res.json();
        setSketchSlug(slug);
        return slug;
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
    return null;
  }, [sketch, sketchSlug]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLInputElement;

      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedElements.size > 0 &&
        !isInput
      ) {
        e.preventDefault();
        deleteSelected();
      }

      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z" && !e.shiftKey) {
          e.preventDefault();
          undo();
        }
        if (e.key === "y" || (e.key === "z" && e.shiftKey)) {
          e.preventDefault();
          redo();
        }
        if (e.key === "s" && !e.shiftKey) {
          e.preventDefault();
          handleSave();
        }
        if (e.key === "S" && e.shiftKey) {
          e.preventDefault();
          handleDownload();
        }
        if (e.key === "E" && e.shiftKey) {
          e.preventDefault();
          handleDownloadSVG();
        }
        if (e.key === "J" && e.shiftKey) {
          e.preventDefault();
          handleDownloadJSON();
        }
        if (e.key === "c" && !isInput && selectedElements.size > 0) {
          e.preventDefault();
          copySelected();
        }
        if (e.key === "v" && !isInput && !e.shiftKey) {
          e.preventDefault();
          pasteElements();
        }
        if (e.key === "V" && e.shiftKey && !isInput) {
          // Ctrl+Shift+V = paste in place (no position offset)
          e.preventDefault();
          pasteInPlace();
        }
        if (e.key === "d" && !isInput && selectedElements.size > 0) {
          // Ctrl+D = duplicate (copy + paste in one step)
          e.preventDefault();
          copySelected();
          pasteElements();
        }
        if (e.key === "a" && !isInput) {
          // Ctrl+A = select all elements
          e.preventDefault();
          selectAll();
        }
        if (e.key === "g" && !e.shiftKey && !isInput && selectedElements.size >= 2) {
          e.preventDefault();
          groupSelected();
        }
        if (e.key === "G" && e.shiftKey && !isInput && selectedElements.size > 0) {
          e.preventDefault();
          ungroupSelected();
        }
      }

      // R = rotate selected 15° clockwise, Shift+R = 15° counter-clockwise
      if (e.key === "r" && !isInput && selectedElements.size > 0 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        rotateSelected(e.shiftKey ? -15 : 15);
      }

      // Arrow keys = nudge selected elements (1px; Shift = 10px)
      if (!isInput && selectedElements.size > 0 && !e.ctrlKey && !e.metaKey) {
        const STEP = e.shiftKey ? 10 : 1;
        if (e.key === "ArrowLeft")  { e.preventDefault(); nudgeSelected(-STEP, 0); }
        if (e.key === "ArrowRight") { e.preventDefault(); nudgeSelected( STEP, 0); }
        if (e.key === "ArrowUp")    { e.preventDefault(); nudgeSelected(0, -STEP); }
        if (e.key === "ArrowDown")  { e.preventDefault(); nudgeSelected(0,  STEP); }
      }

      // Escape exits freehand draw mode
      if (e.key === "Escape" && !isInput) {
        setDrawMode(false);
      }

      // D key toggles freehand draw mode
      if (e.key === "d" && !isInput && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setDrawMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedElements, deleteSelected, undo, redo, handleSave, handleDownload, handleDownloadSVG, handleDownloadJSON, copySelected, pasteElements, rotateSelected, nudgeSelected, selectAll, groupSelected, ungroupSelected, setDrawMode]);

  // Compute the color of the first selected element (or undefined)
  const selectedColor: string | undefined = (() => {
    if (selectedElements.size === 0) return undefined;
    const idx = [...selectedElements][0];
    const el = sketch.elements[idx];
    if (!el) return undefined;
    const raw = (el as unknown as Record<string, unknown>).color;
    return typeof raw === "string" ? raw : sketch.inkColor;
  })();

  // Compute the strokeWidth of the first selected element
  const selectedStrokeWidth: number | undefined = (() => {
    if (selectedElements.size === 0) return undefined;
    const idx = [...selectedElements][0];
    const el = sketch.elements[idx];
    if (!el) return undefined;
    return el.strokeWidth;
  })();

  // Compute the fillColor of the first selected element
  const selectedFillColor: string | undefined = (() => {
    if (selectedElements.size === 0) return undefined;
    const idx = [...selectedElements][0];
    const el = sketch.elements[idx];
    if (!el) return undefined;
    return (el as unknown as Record<string, unknown>).fillColor as string | undefined;
  })();

  // True if any selected element is a text or dim type
  const hasTextOrDimSelected: boolean = (() => {
    if (selectedElements.size === 0) return false;
    return [...selectedElements].some((i) => {
      const el = sketch.elements[i];
      return el?.type === "text" || el?.type === "dim";
    });
  })();

  // True if any selected element is a line type (controls wall thickness UI)
  const hasLineSelected: boolean = (() => {
    if (selectedElements.size === 0) return false;
    return [...selectedElements].some((i) => sketch.elements[i]?.type === "line");
  })();

  // wallWidth of the first selected line element (null = no line selected, undefined = no wall)
  const selectedWallWidth: number | null | undefined = (() => {
    if (!hasLineSelected) return null;
    for (const i of selectedElements) {
      const el = sketch.elements[i];
      if (el?.type === "line") {
        const raw = (el as unknown as Record<string, unknown>).wallWidth;
        return typeof raw === "number" ? raw : undefined;
      }
    }
    return null;
  })();

  // Per-element fontFamily of the first selected text/dim element (null = no override)
  const selectedFontFamily: string | null | undefined = (() => {
    if (!hasTextOrDimSelected) return undefined;
    for (const i of selectedElements) {
      const el = sketch.elements[i];
      if (el?.type === "text" || el?.type === "dim") {
        const raw = (el as unknown as Record<string, unknown>).fontFamily;
        return typeof raw === "string" ? raw : null;
      }
    }
    return undefined;
  })();

  // True if ANY selected element is locked
  const selectedLocked: boolean = (() => {
    if (selectedElements.size === 0) return false;
    return [...selectedElements].some((i) => !!(sketch.elements[i] as unknown as Record<string, unknown>)?.locked);
  })();

  // True if ANY selected element belongs to a group
  const selectedHasGroup: boolean = (() => {
    if (selectedElements.size === 0) return false;
    return [...selectedElements].some((i) => !!(sketch.elements[i] as unknown as Record<string, unknown>)?.groupId);
  })();

  // Single-element coordinate editor
  const singleSelectedIdx: number | undefined = selectedElements.size === 1 ? [...selectedElements][0] : undefined;
  const singleSelectedElement = singleSelectedIdx != null ? sketch.elements[singleSelectedIdx] : undefined;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toolbar
        onRedraw={redraw}
        onPrint={handlePrint}
        onDownload={handleDownload}
        onDownloadSVG={handleDownloadSVG}
        onImportJSON={importSketch}
        onNewSketch={newSketch}
        onSave={handleSave}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        sketchSlug={sketchSlug}
        sketch={sketch}
        autosaveSavedAt={autosaveSavedAt}
        drawMode={drawMode}
        onDrawModeChange={setDrawMode}
      />
      {showAutosaveToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-[#eee8d5] border border-[#93a1a1] text-[#586e75] text-sm font-medium rounded-lg shadow-lg flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#268bd2] shrink-0">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
            <path d="M12 8v4l3 3"/>
          </svg>
          Restored from autosave
        </div>
      )}
      <div className="hidden md:block">
        <PresetTabs active={activePreset} onSelect={loadPreset} />
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left Panel — hidden on mobile */}
        <div className="hidden md:flex flex-col min-h-0">
          <ControlPanel
            paper={sketch.paper}
            tool={sketch.tool}
            amplitude={sketch.amplitude}
            waves={sketch.waves}
            humanness={sketch.humanness}
            inkColor={sketch.inkColor}
            textFont={sketch.textFont}
            dimFont={sketch.dimFont}
            width={sketch.width}
            height={sketch.height}
            selectedCount={selectedElements.size}
            selectedColor={selectedColor}
            selectedStrokeWidth={selectedStrokeWidth}
            selectedFillColor={selectedFillColor}
            selectedFontFamily={selectedFontFamily}
            hasTextOrDimSelected={hasTextOrDimSelected}
            selectedLocked={selectedLocked}
            onPaper={setPaper}
            onTool={setTool}
            onAmplitude={setAmplitude}
            onWaves={setWaves}
            onHumanness={setHumanness}
            onInkColor={setInkColor}
            onTextFont={setTextFont}
            onDimFont={setDimFont}
            onResize={handleResize}
            onAddElement={addElement}
            onDeleteSelected={deleteSelected}
            onColorSelected={colorSelected}
            onStrokeWidthSelected={strokeWidthSelected}
            onFillColorSelected={fillColorSelected}
            onFontFamilySelected={fontFamilySelected}
            onToggleLock={toggleLockSelected}
            onReorder={reorderSelected}
            onAlign={alignSelected}
            selectedHasGroup={selectedHasGroup}
            onGroupSelected={groupSelected}
            onUngroupSelected={ungroupSelected}
            renderStyle={sketch.renderStyle}
            onRenderStyle={setRenderStyle}
            snapGrid={sketch.snapGrid ?? 0}
            onSnapGrid={setSnapGrid}
            metadata={sketch.metadata}
            onMetadata={setMetadata}
            selectedElement={singleSelectedElement}
            selectedElementIdx={singleSelectedIdx}
            onUpdateElement={updateElement}
            drawMode={drawMode}
            onDrawModeChange={setDrawMode}
            elements={sketch.elements}
            selectedElements={selectedElements}
            onSelectElement={handleSelectFromList}
            onToggleVisibility={toggleVisibility}
            hasLineSelected={hasLineSelected}
            selectedWallWidth={selectedWallWidth}
            onWallWidthSelected={(w) => {
              for (const i of selectedElements) {
                const el = sketch.elements[i];
                if (el?.type === "line") {
                  updateElement(i, w != null && w > 0 ? { wallWidth: w } : { wallWidth: undefined });
                }
              }
            }}
          />
          <JsonEditor
            value={JSON.stringify(sketch, null, 2)}
            onChange={updateFromJson}
          />
        </div>

        {/* Canvas + inline text editor overlay */}
        <div className="relative flex-1 min-h-0 min-w-0 flex flex-col">
          <Canvas
            sketch={sketch}
            redrawKey={redrawKey}
            selectedElements={selectedElements}
            onSelectElements={setSelectedElements}
            onMoveSelected={moveSelected}
            onDragEnd={commitDrag}
            onResizeElement={resizeElement}
            onResizeEnd={commitResize}
            onRotateElement={rotateElementSilent}
            onRotateEnd={commitRotate}
            onDoubleClickElement={handleDoubleClickElement}
            onDropElement={addElementAt}
            onContextMenuAction={handleContextMenuAction}
            selectedLocked={selectedLocked}
            selectedHasGroup={selectedHasGroup}
            drawMode={drawMode}
            onDrawPath={(points) => {
              addPathElement(points);
            }}
          />
          {/* Inline text edit overlay */}
          {editingElement && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
              <div
                className="pointer-events-auto flex flex-col gap-2 bg-[#fdf6e3] border border-[#268bd2] rounded-lg shadow-xl p-3 min-w-[240px] max-w-[400px]"
                style={{ boxShadow: "0 4px 32px rgba(38,139,210,0.18)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-[#268bd2] uppercase tracking-wider">
                    Edit {editingElement.field === "label" ? "label" : "text"}
                  </span>
                  <span className="text-[10px] text-[#93a1a1] ml-auto">
                    {editingElement.field === "text" ? "Shift+Enter = new line · Enter = save · Esc = cancel" : "Enter = save · Esc = cancel"}
                  </span>
                </div>
                {editingElement.field === "text" ? (
                  <textarea
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    rows={Math.max(2, editingElement.value.split("\n").length + 1)}
                    className="w-full bg-[#eee8d5] border border-[#93a1a1] rounded px-2 py-1.5 text-sm text-[#073642] focus:outline-none focus:ring-2 focus:ring-[#268bd2] font-mono resize-none"
                    value={editingElement.value}
                    onChange={(e) =>
                      setEditingElement((prev) =>
                        prev ? { ...prev, value: e.target.value } : prev
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); commitInlineEdit(); }
                      if (e.key === "Escape") { e.preventDefault(); cancelInlineEdit(); }
                    }}
                  />
                ) : (
                  <input
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    className="w-full bg-[#eee8d5] border border-[#93a1a1] rounded px-2 py-1.5 text-sm text-[#073642] focus:outline-none focus:ring-2 focus:ring-[#268bd2] font-mono"
                    value={editingElement.value}
                    onChange={(e) =>
                      setEditingElement((prev) =>
                        prev ? { ...prev, value: e.target.value } : prev
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") { e.preventDefault(); commitInlineEdit(); }
                      if (e.key === "Escape") { e.preventDefault(); cancelInlineEdit(); }
                    }}
                  />
                )}
                <div className="flex gap-2 justify-end">
                  <button
                    className="px-3 py-1 text-xs rounded bg-[#eee8d5] hover:bg-[#93a1a1]/30 text-[#586e75] transition-colors"
                    onClick={cancelInlineEdit}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 text-xs rounded bg-[#268bd2] hover:bg-[#268bd2]/80 text-white transition-colors font-medium"
                    onClick={commitInlineEdit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile FAB to toggle controls */}
      <button
        onClick={() => setMobileControlsOpen(!mobileControlsOpen)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#268bd2] hover:bg-[#268bd2]/80 text-white rounded-full shadow-lg shadow-[#268bd2]/30 flex items-center justify-center text-2xl z-50 transition-all"
        aria-label="Toggle controls"
      >
        {mobileControlsOpen ? "\u00D7" : "\u2699"}
      </button>

      {/* Mobile bottom sheet */}
      {mobileControlsOpen && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-[#eee8d5] border-t border-[#93a1a1] rounded-t-2xl max-h-[70vh] overflow-y-auto mobile-bottom-sheet">
          <div className="w-12 h-1 bg-[#93a1a1] rounded-full mx-auto mt-3 mb-2" />
          <PresetTabs active={activePreset} onSelect={loadPreset} />
          <ControlPanel
            paper={sketch.paper}
            tool={sketch.tool}
            amplitude={sketch.amplitude}
            waves={sketch.waves}
            humanness={sketch.humanness}
            inkColor={sketch.inkColor}
            textFont={sketch.textFont}
            dimFont={sketch.dimFont}
            width={sketch.width}
            height={sketch.height}
            selectedCount={selectedElements.size}
            selectedColor={selectedColor}
            selectedStrokeWidth={selectedStrokeWidth}
            selectedFillColor={selectedFillColor}
            selectedFontFamily={selectedFontFamily}
            hasTextOrDimSelected={hasTextOrDimSelected}
            selectedLocked={selectedLocked}
            onPaper={setPaper}
            onTool={setTool}
            onAmplitude={setAmplitude}
            onWaves={setWaves}
            onHumanness={setHumanness}
            onInkColor={setInkColor}
            onTextFont={setTextFont}
            onDimFont={setDimFont}
            onResize={handleResize}
            onAddElement={addElement}
            onDeleteSelected={deleteSelected}
            onColorSelected={colorSelected}
            onStrokeWidthSelected={strokeWidthSelected}
            onFillColorSelected={fillColorSelected}
            onFontFamilySelected={fontFamilySelected}
            onToggleLock={toggleLockSelected}
            onReorder={reorderSelected}
            onAlign={alignSelected}
            selectedHasGroup={selectedHasGroup}
            onGroupSelected={groupSelected}
            onUngroupSelected={ungroupSelected}
            renderStyle={sketch.renderStyle}
            onRenderStyle={setRenderStyle}
            snapGrid={sketch.snapGrid ?? 0}
            onSnapGrid={setSnapGrid}
            metadata={sketch.metadata}
            onMetadata={setMetadata}
            selectedElement={singleSelectedElement}
            selectedElementIdx={singleSelectedIdx}
            onUpdateElement={updateElement}
            drawMode={drawMode}
            onDrawModeChange={setDrawMode}
            elements={sketch.elements}
            selectedElements={selectedElements}
            onSelectElement={handleSelectFromList}
            onToggleVisibility={toggleVisibility}
            hasLineSelected={hasLineSelected}
            selectedWallWidth={selectedWallWidth}
            onWallWidthSelected={(w) => {
              for (const i of selectedElements) {
                const el = sketch.elements[i];
                if (el?.type === "line") {
                  updateElement(i, w != null && w > 0 ? { wallWidth: w } : { wallWidth: undefined });
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex flex-col items-center justify-center bg-[#fdf6e3] text-[#657b83] gap-4">
          <div className="w-8 h-8 border-2 border-[#eee8d5] border-t-[#268bd2] rounded-full animate-spin" />
          <span className="text-sm">Loading editor...</span>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
