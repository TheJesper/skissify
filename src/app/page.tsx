"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import CommandPalette from "@/components/CommandPalette";
import { loadAutosave, useAutosave } from "@/hooks/useAutosave";
import { renderSketch } from "@/lib/renderer";
import { renderSketchToSVG } from "@/lib/svg-renderer";
import { stampCanvasWatermark } from "@/lib/watermark";
import { usePlanStatus } from "@/hooks/usePlanStatus";

/** Swipe-down-to-close bottom sheet for mobile controls */
function MobileBottomSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [closing, setClosing] = useState(false);

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setDragOffset(0);
      setClosing(false);
    }
  }, [open]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Only start drag from the handle area (first 40px)
    const rect = sheetRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touchY = e.touches[0].clientY;
    if (touchY - rect.top < 40) {
      dragStartY.current = touchY;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const dy = e.touches[0].clientY - dragStartY.current;
    // Only allow downward drag
    setDragOffset(Math.max(0, dy));
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (dragStartY.current === null) return;
    dragStartY.current = null;
    if (dragOffset > 100) {
      // Threshold reached -- close
      setClosing(true);
      setTimeout(onClose, 250);
    } else {
      // Snap back
      setDragOffset(0);
    }
  }, [dragOffset, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="md:hidden fixed inset-0 z-30 bg-black/30 transition-opacity"
        style={{ opacity: closing ? 0 : 1 }}
        onClick={onClose}
      />
      {/* Sheet */}
      <div
        ref={sheetRef}
        className="md:hidden fixed inset-x-0 bottom-0 z-40 rounded-t-2xl max-h-[70vh] overflow-y-auto mobile-bottom-sheet"
        style={{
          backgroundColor: "#eee8d5",
          borderTop: "1px solid #93a1a1",
          transform: `translateY(${closing ? 100 : dragOffset}${closing ? "%" : "px"})`,
          transition: dragStartY.current !== null ? "none" : "transform 0.25s ease-out",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Draggable handle */}
        <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing touch-none">
          <div className="rounded-full" style={{ width: 40, height: 4, backgroundColor: "#93a1a1" }} />
        </div>
        {children}
      </div>
    </>
  );
}

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
    const hash = window.location.hash;
    if (hash) {
      const hashData = decodeSketchFromURL(hash);
      if (hashData && hashData.elements) {
        setInitialData(hashData);
        setLoading(false);
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        return;
      }
    }

    const slug = forkSlug || editSlug;
    if (!slug && !presetParam) {
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
      <div className="h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#fdf6e3", color: "#657b83" }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#eee8d5", borderTopColor: "#268bd2" }} />
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
    setRoomFont,
    setTitleFont,
    setTitle,
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
    strokeWidthSelected,
    fillColorSelected,
    fontFamilySelected,
    opacitySelected,
    rotateSelected,
    nudgeSelected,
    selectAll,
    setRenderStyle,
    setSnapGrid,
    setMetadata,
    reorderSelected,
    toggleLockSelected,
    alignSelected,
    groupSelected,
    ungroupSelected,
    redraw,
    importSketch,
    newSketch,
    updateSketch,
    updateElement,
    toggleVisibility,
    setLayerVisibility,
    setElementLayer,
    addLayer,
    removeLayer,
    renameLayer,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useSketch(initialData ?? undefined, initialPreset ?? undefined);

  const [sketchSlug, setSketchSlug] = useState<string | null>(loadedSlug);
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);
  const [showAutosaveToast, setShowAutosaveToast] = useState(!!restoredFromAutosave);
  const [showWelcome, setShowWelcome] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("skissify-welcome-dismissed");
  });
  const { savedAt: autosaveSavedAt } = useAutosave(sketch);

  // Plan status — used for watermark gating on exports
  const { pro: isPro } = usePlanStatus();

  // Freehand draw mode state
  const [drawMode, setDrawMode] = useState(false);

  // Command palette
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Canvas control ref - lets us trigger resetView/fitSelection from outside the Canvas
  const canvasControlRef = useRef<{ resetView: () => void; fitSelection: (indices: number[]) => void } | null>(null);

  // Inline text edit state (double-click on text/rect/dim elements)
  // clientX/clientY = screen position of the double-click for positioned overlay
  const [editingElement, setEditingElement] = useState<{ idx: number; field: string; value: string; clientX: number; clientY: number } | null>(null);

  useEffect(() => {
    if (restoredFromAutosave) {
      const timer = setTimeout(() => setShowAutosaveToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [restoredFromAutosave]);

  // Auto-dismiss welcome toast after 8 seconds
  useEffect(() => {
    if (!showWelcome) return;
    const timer = setTimeout(() => {
      setShowWelcome(false);
      localStorage.setItem("skissify-welcome-dismissed", "1");
    }, 8000);
    return () => clearTimeout(timer);
  }, [showWelcome]);

  // Wrap loadPreset to also reset the view so the new sketch fits properly
  const handleLoadPreset = useCallback((name: string) => {
    loadPreset(name);
    // Give React one frame to update canvasW/H before fitting
    requestAnimationFrame(() => {
      canvasControlRef.current?.resetView();
    });
  }, [loadPreset]);

  // Inline text editing handlers
  const handleDoubleClickElement = useCallback(
    (idx: number, clientX: number, clientY: number) => {
      const el = sketch.elements[idx];
      if (!el) return;
      if (el.type === "text") {
        const t = el as unknown as Record<string, unknown>;
        const val = (t.text ?? t.content ?? "") as string;
        setEditingElement({ idx, field: "text", value: val, clientX, clientY });
      } else if (el.type === "rect") {
        const r = el as unknown as Record<string, unknown>;
        setEditingElement({ idx, field: "label", value: (r.label ?? "") as string, clientX, clientY });
      } else if (el.type === "dim") {
        const d = el as unknown as Record<string, unknown>;
        setEditingElement({ idx, field: "label", value: (d.label ?? "") as string, clientX, clientY });
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
          if (idx !== undefined) {
            // When triggered from command palette, center the popup on screen
            const cx = typeof window !== "undefined" ? window.innerWidth / 2 : 640;
            const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
            handleDoubleClickElement(idx, cx, cy);
          }
          break;
        }
        default:
          break;
      }
    },
    [copySelected, pasteElements, pasteInPlace, selectSameType, reorderSelected, alignSelected, toggleLockSelected, groupSelected, ungroupSelected, deleteSelected, selectedElements, handleDoubleClickElement]
  );

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
    // Render to an off-screen canvas so we can optionally stamp a watermark
    // without mutating the live editor canvas.
    const w = sketch.width || 900;
    const h = sketch.height || 650;
    const offscreen = document.createElement("canvas");
    offscreen.width = w;
    offscreen.height = h;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;
    renderSketch(ctx, sketch, w, h);
    if (!isPro) {
      // Free tier: apply subtle "skissify.com" watermark
      const dark = sketch.paper !== "blueprint";
      stampCanvasWatermark(ctx, w, h, dark);
    }
    offscreen.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const titleSlug = sketch.title
        ? sketch.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
        : null;
      const filename = titleSlug
        ? `skissify-${titleSlug}.png`
        : sketchSlug
        ? `skissify-${sketchSlug}.png`
        : `skissify-${new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-")}.png`;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [sketch, sketchSlug, isPro]);

  const handleDownloadSVG = useCallback(() => {
    // Pass watermark flag: free users get "skissify.com" in the SVG
    const svgString = renderSketchToSVG(sketch, !isPro);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const titleSlug = sketch.title
      ? sketch.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
      : null;
    const filename = titleSlug
      ? `skissify-${titleSlug}.svg`
      : sketchSlug
      ? `skissify-${sketchSlug}.svg`
      : `skissify-${new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-")}.svg`;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [sketch, sketchSlug, isPro]);

  const handleResize = useCallback(
    (w: number, h: number) => {
      updateSketch({ width: w, height: h });
    },
    [updateSketch]
  );

  const handleSave = useCallback(async (): Promise<string | null> => {
    try {
      if (sketchSlug) {
        const res = await fetch(`/api/sketches/${sketchSlug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: sketch }),
        });
        if (res.ok) return sketchSlug;
      }

      const res = await fetch("/api/sketches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: sketch, title: sketch.title || "Untitled Sketch" }),
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
        if (e.key === "c" && !isInput && selectedElements.size > 0) {
          e.preventDefault();
          copySelected();
        }
        if (e.key === "v" && !isInput && !e.shiftKey) {
          e.preventDefault();
          pasteElements();
        }
        if (e.key === "V" && e.shiftKey && !isInput) {
          // Ctrl+Shift+V = paste in place (no offset)
          e.preventDefault();
          pasteInPlace();
        }
        if (e.key === "d" && !isInput && selectedElements.size > 0) {
          e.preventDefault();
          copySelected();
          pasteElements();
        }
      }

      if (e.ctrlKey || e.metaKey) {
        if (e.key === "a" && !isInput) {
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
        // Ctrl+Alt+C = copy style (format painter source)
        if (e.altKey && e.key === "c" && !isInput && selectedElements.size > 0) {
          e.preventDefault();
          copyStyle();
        }
        // Ctrl+Alt+V = paste style onto selected elements
        if (e.altKey && e.key === "v" && !isInput && selectedElements.size > 0) {
          e.preventDefault();
          pasteStyle();
        }
      }

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

      // G key (no modifier) toggles grid snap on/off
      if (e.key === "g" && !isInput && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        setSnapGrid((sketch.snapGrid ?? 0) > 0 ? 0 : 20);
      }

      // Ctrl+K / Cmd+K → open Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette((v) => !v);
      }

      // F key → zoom to fit selected elements (or fit all if nothing selected)
      if (e.key === "f" && !isInput && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        if (selectedElements.size > 0) {
          canvasControlRef.current?.fitSelection(Array.from(selectedElements));
        } else {
          canvasControlRef.current?.resetView();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedElements, deleteSelected, undo, redo, handleSave, handleDownload, handleDownloadSVG, copySelected, pasteElements, pasteInPlace, copyStyle, pasteStyle, rotateSelected, nudgeSelected, selectAll, groupSelected, ungroupSelected, setDrawMode, setSnapGrid, sketch.snapGrid]);

  /** Handle actions dispatched from the Command Palette */
  const handleCommandPaletteAction = useCallback(
    (actionId: string) => {
      switch (actionId) {
        case "undo": undo(); break;
        case "redo": redo(); break;
        case "select-all": selectAll(); break;
        case "delete": deleteSelected(); break;
        case "duplicate": copySelected(); pasteElements(); break;
        case "copy": copySelected(); break;
        case "paste": pasteElements(); break;
        case "group": groupSelected(); break;
        case "ungroup": ungroupSelected(); break;
        case "new-sketch": newSketch(); break;
        case "select-same-type": selectSameType(); break;
        case "fit-view": canvasControlRef.current?.resetView(); break;
        case "fit-selection":
          if (selectedElements.size > 0) {
            canvasControlRef.current?.fitSelection(Array.from(selectedElements));
          } else {
            canvasControlRef.current?.resetView();
          }
          break;
        case "redraw": redraw(); break;
        case "download-png": handleDownload(); break;
        case "download-svg": handleDownloadSVG(); break;
        case "download-json": {
          const json = JSON.stringify(sketch, null, 2);
          const blob = new Blob([json], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = sketchSlug ? `skissify-${sketchSlug}.json` : `skissify-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
          break;
        }
        case "copy-json":
          navigator.clipboard.writeText(JSON.stringify(sketch, null, 2)).catch(() => {});
          break;
        case "print": handlePrint(); break;
        case "save": handleSave(); break;
        case "zoom-in": break; // handled by Canvas internally
        case "zoom-out": break;
        case "toggle-shortcuts": break; // Toolbar handles this
        default: break;
      }
    },
    [undo, redo, selectAll, deleteSelected, copySelected, pasteElements, groupSelected, ungroupSelected,
     newSketch, selectSameType, redraw, handleDownload, handleDownloadSVG, handlePrint, handleSave,
     sketch, sketchSlug]
  );

  // Compute the color of the first selected element (for per-element color picker)
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

  // True if any selected element is a text or dim type (controls per-element font UI)
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
    // Find the first text or dim element among selected
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

  // Opacity of the first selected element (undefined = use tool default = 1)
  const selectedOpacity: number | undefined = (() => {
    if (selectedElements.size === 0) return undefined;
    const idx = [...selectedElements][0];
    const el = sketch.elements[idx];
    if (!el) return undefined;
    const raw = (el as unknown as Record<string, unknown>).opacity;
    return typeof raw === "number" ? raw : undefined;
  })();

  // Single-element coordinate editor: the actual element when exactly 1 is selected
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
        onRenameSketch={setTitle}
      />

      {/* Welcome toast */}
      {showWelcome && (
        <div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md toast-fade-in"
          style={{ backgroundColor: "#073642", color: "#93a1a1", border: "1px solid #268bd2" }}
        >
          <span className="text-sm leading-snug">
            <strong style={{ color: "#268bd2" }}>Skissify</strong> - hand-drawn sketches from JSON. Try editing the JSON on the left or pick a preset above.
          </span>
          <button
            onClick={() => {
              setShowWelcome(false);
              localStorage.setItem("skissify-welcome-dismissed", "1");
            }}
            className="shrink-0 text-lg leading-none hover:opacity-70 transition-opacity"
            style={{ color: "#93a1a1" }}
          >
            ×
          </button>
        </div>
      )}

      {showAutosaveToast && (
        <div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 text-sm font-medium rounded-lg shadow-lg flex items-center gap-2"
          style={{ backgroundColor: "#073642", color: "#93a1a1", border: "1px solid #268bd2" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#268bd2" }} className="shrink-0">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
            <path d="M12 8v4l3 3"/>
          </svg>
          Restored from autosave
        </div>
      )}
      <div className="hidden md:block">
        <PresetTabs active={activePreset} onSelect={handleLoadPreset} />
      </div>

      <div className="flex flex-1 min-h-0 relative">
        {/* Left Panel */}
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
            roomFont={sketch.roomFont}
            titleFont={sketch.titleFont}
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
            onRoomFont={setRoomFont}
            onTitleFont={setTitleFont}
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
            onCopyStyle={copyStyle}
            onPasteStyle={pasteStyle}
            hasStyleClipboard={hasStyleClipboard}
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
              // Apply wallWidth to all selected line elements
              for (const i of selectedElements) {
                const el = sketch.elements[i];
                if (el?.type === "line") {
                  updateElement(i, w != null && w > 0 ? { wallWidth: w } : { wallWidth: undefined });
                }
              }
            }}
            selectedOpacity={selectedOpacity}
            onOpacitySelected={opacitySelected}
            layers={sketch.layers}
            onSetLayerVisibility={setLayerVisibility}
            onAddLayer={addLayer}
            onRemoveLayer={removeLayer}
            onRenameLayer={renameLayer}
            onSetElementLayer={setElementLayer}
            onDuplicateSelected={() => { copySelected(); pasteElements(); }}
            onSelectSameType={selectSameType}
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
          onDragEnd={commitDrag}
          onResizeElement={resizeElement}
          onResizeEnd={commitResize}
          onRotateElement={rotateElementSilent}
          onRotateEnd={commitRotate}
          onDoubleClickElement={handleDoubleClickElement}
          canvasControlRef={canvasControlRef}
          onDropElement={addElementAt}
          onContextMenuAction={handleContextMenuAction}
          selectedLocked={selectedLocked}
          selectedHasGroup={selectedHasGroup}
          drawMode={drawMode}
          onDrawPath={(points) => {
            addPathElement(points);
          }}
        />

        {/* Inline text editing overlay — positioned near the clicked element */}
        {editingElement && (() => {
          // Clamp so the popup (w=288, max-h≈160) stays within viewport
          const POPUP_W = 288;
          const POPUP_H = editingElement.field === "text" ? 140 : 90;
          const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
          const vh = typeof window !== "undefined" ? window.innerHeight : 800;
          const left = Math.max(8, Math.min(editingElement.clientX - POPUP_W / 2, vw - POPUP_W - 8));
          const top  = Math.max(8, Math.min(editingElement.clientY + 18, vh - POPUP_H - 8));
          return (
            <div
              className="fixed z-50 rounded-xl shadow-2xl p-3 flex flex-col gap-2"
              style={{ left, top, width: POPUP_W, backgroundColor: "#073642", border: "1px solid #268bd2", boxShadow: "0 8px 32px rgba(0,0,0,0.45)" }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#93a1a1" }}>
                  {editingElement.field === "label" ? "Edit label" : "Edit text"}
                </span>
                <span className="text-[9px]" style={{ color: "#586e75" }}>
                  {editingElement.field === "text" ? "Shift+↵ = newline · ↵ = save · Esc" : "↵ = save · Esc"}
                </span>
              </div>
              {editingElement.field === "text" ? (
                <textarea
                  autoFocus
                  rows={Math.max(2, editingElement.value.split("\n").length + 1)}
                  className="w-full rounded px-2.5 py-1.5 text-sm outline-none resize-none"
                  style={{ backgroundColor: "#002b36", color: "#93a1a1", border: "1px solid #268bd2", fontFamily: "inherit" }}
                  value={editingElement.value}
                  onChange={(e) => setEditingElement((prev) => prev ? { ...prev, value: e.target.value } : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); commitInlineEdit(); }
                    if (e.key === "Escape") { e.preventDefault(); cancelInlineEdit(); }
                  }}
                />
              ) : (
                <input
                  autoFocus
                  className="w-full rounded px-2.5 py-1.5 text-sm outline-none"
                  style={{ backgroundColor: "#002b36", color: "#93a1a1", border: "1px solid #268bd2", fontFamily: "inherit" }}
                  value={editingElement.value}
                  onChange={(e) => setEditingElement((prev) => prev ? { ...prev, value: e.target.value } : null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); commitInlineEdit(); }
                    if (e.key === "Escape") { e.preventDefault(); cancelInlineEdit(); }
                  }}
                />
              )}
              <div className="flex gap-1.5 justify-end">
                <button
                  onClick={cancelInlineEdit}
                  className="px-2.5 py-1 rounded text-[11px]"
                  style={{ backgroundColor: "#073642", color: "#657b83", border: "1px solid #586e75" }}
                >
                  Cancel
                </button>
                <button
                  onClick={commitInlineEdit}
                  className="px-2.5 py-1 rounded text-[11px] font-semibold"
                  style={{ backgroundColor: "#268bd2", color: "#fdf6e3" }}
                >
                  Save
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => setMobileControlsOpen(!mobileControlsOpen)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl z-50 transition-all"
        style={{ backgroundColor: "#268bd2", color: "#fdf6e3" }}
        aria-label="Toggle controls"
      >
        {mobileControlsOpen ? "\u00D7" : "\u2699"}
      </button>

      {/* Mobile bottom sheet with swipe-to-close */}
      {/* Command Palette — Ctrl+K */}
      <CommandPalette
        open={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onLoadPreset={(name) => { handleLoadPreset(name); setShowCommandPalette(false); }}
        onAddElement={(type) => { addElement(type); setShowCommandPalette(false); }}
        onSetPaper={(p) => { setPaper(p); setShowCommandPalette(false); }}
        onSetTool={(t) => { setTool(t); setShowCommandPalette(false); }}
        onSetRenderStyle={(s) => { setRenderStyle(s); setShowCommandPalette(false); }}
        onSetAmplitude={(v) => { setAmplitude(v); setShowCommandPalette(false); }}
        onSetSnapGrid={(v) => { setSnapGrid(v); setShowCommandPalette(false); }}
        onAction={(action) => { handleCommandPaletteAction(action); setShowCommandPalette(false); }}
        presetNames={Object.keys(presets)}
      />

      <MobileBottomSheet
        open={mobileControlsOpen}
        onClose={() => setMobileControlsOpen(false)}
      >
        <PresetTabs active={activePreset} onSelect={handleLoadPreset} />
        <ControlPanel
          paper={sketch.paper}
          tool={sketch.tool}
          amplitude={sketch.amplitude}
          waves={sketch.waves}
          humanness={sketch.humanness}
          inkColor={sketch.inkColor}
          textFont={sketch.textFont}
          dimFont={sketch.dimFont}
          roomFont={sketch.roomFont}
          titleFont={sketch.titleFont}
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
          onRoomFont={setRoomFont}
          onTitleFont={setTitleFont}
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
          onCopyStyle={copyStyle}
          onPasteStyle={pasteStyle}
          hasStyleClipboard={hasStyleClipboard}
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
          selectedOpacity={selectedOpacity}
          onOpacitySelected={opacitySelected}
          layers={sketch.layers}
          onSetLayerVisibility={setLayerVisibility}
          onAddLayer={addLayer}
          onRemoveLayer={removeLayer}
          onRenameLayer={renameLayer}
          onSetElementLayer={setElementLayer}
          onDuplicateSelected={() => { copySelected(); pasteElements(); }}
          onSelectSameType={selectSameType}
        />
      </MobileBottomSheet>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#fdf6e3", color: "#657b83" }}>
          <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#eee8d5", borderTopColor: "#268bd2" }} />
          <span className="text-sm">Loading editor...</span>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
