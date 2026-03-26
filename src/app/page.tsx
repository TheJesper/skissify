"use client";

import { useCallback, useEffect } from "react";
import { useSketch } from "@/hooks/useSketch";
import Toolbar from "@/components/Toolbar";
import PresetTabs from "@/components/PresetTabs";
import ControlPanel from "@/components/ControlPanel";
import Canvas from "@/components/Canvas";
import JsonEditor from "@/components/JsonEditor";

export default function Home() {
  const {
    sketch,
    activePreset,
    selectedElements,
    setSelectedElements,
    redrawKey,
    jsonText,
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
  } = useSketch();

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

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedElements.size > 0 &&
        !(e.target instanceof HTMLTextAreaElement) &&
        !(e.target instanceof HTMLInputElement)
      ) {
        e.preventDefault();
        deleteSelected();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedElements, deleteSelected]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toolbar onRedraw={redraw} onPrint={handlePrint} />
      <PresetTabs active={activePreset} onSelect={loadPreset} />

      <div className="flex flex-1 min-h-0">
        {/* Left Panel */}
        <div className="flex flex-col min-h-0">
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
        />
      </div>
    </div>
  );
}
