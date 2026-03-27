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
      <div className="h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-400 gap-4">
        <div className="w-8 h-8 border-2 border-neutral-700 border-t-blue-500 rounded-full animate-spin" />
        <span className="text-sm">Loading sketch...</span>
      </div>
    );
  }

  return (
    <EditorInner
      initialData={initialData}
      loadedSlug={loadedSlug}
      initialPreset={initialPreset}
    />
  );
}

function EditorInner({
  initialData,
  loadedSlug,
  initialPreset,
}: {
  initialData: SketchData | null;
  loadedSlug: string | null;
  initialPreset?: string | null;
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
    loadPreset,
    updateFromJson,
    addElement,
    deleteSelected,
    moveSelected,
    copySelected,
    pasteElements,
    redraw,
    updateSketch,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useSketch(initialData ?? undefined, initialPreset ?? undefined);

  const [sketchSlug, setSketchSlug] = useState<string | null>(loadedSlug);
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);

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

  const handleResize = useCallback(
    (w: number, h: number) => {
      updateSketch({ width: w, height: h });
    },
    [updateSketch]
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
        if (e.key === "s") {
          e.preventDefault();
          handleSave();
        }
        if (e.key === "c" && !isInput && selectedElements.size > 0) {
          e.preventDefault();
          copySelected();
        }
        if (e.key === "v" && !isInput) {
          e.preventDefault();
          pasteElements();
        }
        if (e.key === "d" && !isInput && selectedElements.size > 0) {
          // Ctrl+D = duplicate (copy + paste in one step)
          e.preventDefault();
          copySelected();
          pasteElements();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedElements, deleteSelected, undo, redo, handleSave, copySelected, pasteElements]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toolbar
        onRedraw={redraw}
        onPrint={handlePrint}
        onSave={handleSave}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        sketchSlug={sketchSlug}
        sketch={sketch}
      />
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
            width={sketch.width}
            height={sketch.height}
            selectedCount={selectedElements.size}
            onPaper={setPaper}
            onTool={setTool}
            onAmplitude={setAmplitude}
            onWaves={setWaves}
            onHumanness={setHumanness}
            onResize={handleResize}
            onAddElement={addElement}
            onDeleteSelected={deleteSelected}
          />
          <JsonEditor
            value={JSON.stringify(sketch, null, 2)}
            onChange={updateFromJson}
          />
        </div>

        {/* Canvas */}
        <Canvas
          sketch={sketch}
          redrawKey={redrawKey}
          selectedElements={selectedElements}
          onSelectElements={setSelectedElements}
          onMoveSelected={moveSelected}
        />
      </div>

      {/* Mobile FAB to toggle controls */}
      <button
        onClick={() => setMobileControlsOpen(!mobileControlsOpen)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-2xl z-50 transition-all"
        aria-label="Toggle controls"
      >
        {mobileControlsOpen ? "\u00D7" : "\u2699"}
      </button>

      {/* Mobile bottom sheet */}
      {mobileControlsOpen && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-neutral-900 border-t border-neutral-700 rounded-t-2xl max-h-[70vh] overflow-y-auto mobile-bottom-sheet">
          <div className="w-12 h-1 bg-neutral-600 rounded-full mx-auto mt-3 mb-2" />
          <PresetTabs active={activePreset} onSelect={loadPreset} />
          <ControlPanel
            paper={sketch.paper}
            tool={sketch.tool}
            amplitude={sketch.amplitude}
            waves={sketch.waves}
            humanness={sketch.humanness}
            width={sketch.width}
            height={sketch.height}
            selectedCount={selectedElements.size}
            onPaper={setPaper}
            onTool={setTool}
            onAmplitude={setAmplitude}
            onWaves={setWaves}
            onHumanness={setHumanness}
            onResize={handleResize}
            onAddElement={addElement}
            onDeleteSelected={deleteSelected}
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
        <div className="h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-400 gap-4">
          <div className="w-8 h-8 border-2 border-neutral-700 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-sm">Loading editor...</span>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
