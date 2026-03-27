"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import type { SketchData } from "@/lib/types";

const AUTOSAVE_KEY = "skissify:autosave";
const AUTOSAVE_DEBOUNCE_MS = 1500;

/** Returns the last autosaved sketch from localStorage, or null. */
export function loadAutosave(): SketchData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SketchData;
    if (parsed && Array.isArray(parsed.elements)) return parsed;
  } catch {
    // corrupted — ignore
  }
  return null;
}

/** Clears the autosave from localStorage. */
export function clearAutosave(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTOSAVE_KEY);
  }
}

interface AutosaveState {
  /** ISO timestamp of last save, or null */
  savedAt: string | null;
}

/**
 * Persists `sketch` to localStorage with a debounce.
 * Returns `{ savedAt }` for display in the toolbar.
 */
export function useAutosave(sketch: SketchData): AutosaveState {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const save = useCallback((data: SketchData) => {
    try {
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data));
      setSavedAt(new Date().toISOString());
    } catch {
      // quota exceeded or private-mode — silently ignore
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      save(sketch);
    }, AUTOSAVE_DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sketch, save]);

  // Flush immediately on page unload
  useEffect(() => {
    const flush = () => save(sketch);
    window.addEventListener("beforeunload", flush);
    return () => window.removeEventListener("beforeunload", flush);
  }, [sketch, save]);

  return { savedAt };
}
