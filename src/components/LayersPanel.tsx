"use client";

import { useState } from "react";
import { SketchLayer, SketchElement, DEFAULT_LAYERS } from "@/lib/types";

interface LayersPanelProps {
  /** Layers defined in the sketch (may be empty / undefined = use defaults UI) */
  layers: SketchLayer[];
  /** All elements, used to count elements per layer */
  elements: SketchElement[];
  /** Called when a layer's visibility is toggled */
  onSetLayerVisibility: (layerId: string, visible: boolean) => void;
  /** Called when a new layer is created */
  onAddLayer: (layer: SketchLayer) => void;
  /** Called when a layer is deleted */
  onRemoveLayer: (layerId: string) => void;
  /** Called when a layer is renamed */
  onRenameLayer: (layerId: string, name: string) => void;
  /** Currently selected element indices */
  selectedElements?: Set<number>;
  /** Called when user assigns selected elements to a layer */
  onSetElementLayer?: (layerId: string | undefined) => void;
}

const LAYER_COLORS = [
  "#586e75", "#268bd2", "#cb4b16", "#2aa198",
  "#859900", "#d33682", "#6c71c4", "#839496",
];

/** Count elements assigned to a given layer id */
function countOnLayer(elements: SketchElement[], layerId: string): number {
  return elements.filter((el) => (el as typeof el & { layer?: string }).layer === layerId).length;
}

export default function LayersPanel({
  layers,
  elements,
  onSetLayerVisibility,
  onAddLayer,
  onRemoveLayer,
  onRenameLayer,
  selectedElements,
  onSetElementLayer,
}: LayersPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [addingNew, setAddingNew] = useState(false);
  const [newName, setNewName] = useState("");

  const hasSelection = selectedElements && selectedElements.size > 0;

  // Determine which layer the selected elements are on (if all same layer)
  let selectionLayer: string | null | undefined = undefined; // undefined = nothing selected
  if (hasSelection) {
    const selIdxs = Array.from(selectedElements!);
    const selLayers = selIdxs.map((i) => (elements[i] as typeof elements[0] & { layer?: string }).layer ?? "");
    const unique = new Set(selLayers);
    selectionLayer = unique.size === 1 ? (selLayers[0] || null) : null; // null = mixed
  }

  function startEdit(layer: SketchLayer) {
    setEditingId(layer.id);
    setEditingName(layer.name);
  }

  function commitEdit(id: string) {
    if (editingName.trim()) {
      onRenameLayer(id, editingName.trim());
    }
    setEditingId(null);
  }

  function commitAdd() {
    const name = newName.trim();
    if (!name) { setAddingNew(false); return; }
    const id = `layer_${Date.now()}`;
    const color = LAYER_COLORS[layers.length % LAYER_COLORS.length];
    onAddLayer({ id, name, visible: true, color });
    setNewName("");
    setAddingNew(false);
  }

  // If no layers defined yet, show a "Set up layers" prompt + default layer options
  const showEmpty = layers.length === 0;

  return (
    <div className="space-y-1">
      {showEmpty ? (
        <div className="px-1 py-2 space-y-2">
          <p className="text-[10px] text-neutral-500 leading-snug">
            No layers yet. Add the default floor plan layers or create your own.
          </p>
          <button
            onClick={() => {
              DEFAULT_LAYERS.forEach((l) => onAddLayer(l));
            }}
            className="w-full px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 text-xs rounded transition-colors"
          >
            + Add default layers
          </button>
        </div>
      ) : (
        <ul className="space-y-0.5">
          {layers.map((layer) => {
            const count = countOnLayer(elements, layer.id);
            const isAssigned = selectionLayer === layer.id;
            return (
              <li
                key={layer.id}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded group ${
                  isAssigned ? "bg-neutral-700/60" : "hover:bg-neutral-800"
                }`}
              >
                {/* Visibility toggle */}
                <button
                  title={layer.visible ? "Hide layer" : "Show layer"}
                  onClick={() => onSetLayerVisibility(layer.id, !layer.visible)}
                  className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-neutral-100 transition-colors"
                >
                  {layer.visible ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>

                {/* Color dot */}
                <span
                  className="flex-shrink-0 w-2.5 h-2.5 rounded-full border border-neutral-600"
                  style={{ backgroundColor: layer.color ?? "#839496" }}
                />

                {/* Name (editable on double-click) */}
                {editingId === layer.id ? (
                  <input
                    autoFocus
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={() => commitEdit(layer.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitEdit(layer.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="flex-1 min-w-0 bg-neutral-700 text-neutral-100 text-xs px-1 py-0 rounded outline-none"
                  />
                ) : (
                  <span
                    className={`flex-1 min-w-0 text-xs truncate cursor-default select-none ${
                      layer.visible ? "text-neutral-200" : "text-neutral-500"
                    }`}
                    onDoubleClick={() => startEdit(layer)}
                  >
                    {layer.name}
                  </span>
                )}

                {/* Element count badge */}
                {count > 0 && (
                  <span className="flex-shrink-0 text-[9px] text-neutral-500 tabular-nums">
                    {count}
                  </span>
                )}

                {/* Assign selection to this layer */}
                {hasSelection && onSetElementLayer && (
                  <button
                    title={isAssigned ? "Remove from layer" : "Assign selection to layer"}
                    onClick={() => {
                      if (isAssigned) {
                        onSetElementLayer(undefined);
                      } else {
                        onSetElementLayer(layer.id);
                      }
                    }}
                    className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded text-[9px] font-medium ${
                      isAssigned
                        ? "bg-blue-600/40 text-blue-300 hover:bg-red-700/40 hover:text-red-300"
                        : "bg-neutral-700 text-neutral-300 hover:bg-blue-700/50 hover:text-blue-200"
                    }`}
                  >
                    {isAssigned ? "✓" : "→"}
                  </button>
                )}

                {/* Delete layer */}
                <button
                  title="Remove layer"
                  onClick={() => onRemoveLayer(layer.id)}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4 flex items-center justify-center text-neutral-500 hover:text-red-400"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Add new layer */}
      {addingNew ? (
        <div className="flex gap-1 px-2 pt-1">
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitAdd();
              if (e.key === "Escape") { setAddingNew(false); setNewName(""); }
            }}
            placeholder="Layer name…"
            className="flex-1 min-w-0 bg-neutral-700 text-neutral-100 text-xs px-2 py-1 rounded outline-none placeholder-neutral-500"
          />
          <button
            onClick={commitAdd}
            className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded transition-colors"
          >
            Add
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAddingNew(true)}
          className="w-full mt-1 px-2 py-1 text-xs text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 rounded transition-colors flex items-center gap-1"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add layer
        </button>
      )}

      {/* Quick help */}
      {layers.length > 0 && (
        <p className="text-[9px] text-neutral-600 px-2 pt-1 leading-snug">
          Double-click a name to rename. Select elements then click → to assign.
        </p>
      )}
    </div>
  );
}
