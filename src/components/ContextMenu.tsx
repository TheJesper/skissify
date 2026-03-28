"use client";

import { useEffect, useRef } from "react";

export interface ContextMenuAction {
  id: string;
  label: string;
  icon?: string;
  /** If true, renders a thin separator line above this item */
  separator?: boolean;
  /** If true, the item is shown but not clickable */
  disabled?: boolean;
  danger?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  actions: ContextMenuAction[];
  onAction: (id: string) => void;
  onClose: () => void;
  /** Container bounds for clamping menu position so it stays on-screen */
  containerRect?: DOMRect | null;
}

/**
 * Floating context menu that appears on right-click.
 * Auto-positions itself to stay within the viewport.
 * Closes on click-outside, Escape, or scroll.
 */
export default function ContextMenu({
  x,
  y,
  actions,
  onAction,
  onClose,
  containerRect,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Clamp position so menu stays in viewport
  const MENU_W = 180;
  const ITEM_H = 32;
  const MENU_H = actions.length * ITEM_H + 8;

  let left = x;
  let top = y;

  if (containerRect) {
    if (left + MENU_W > containerRect.right) left = Math.max(containerRect.left, containerRect.right - MENU_W);
    if (top + MENU_H > containerRect.bottom) top = Math.max(containerRect.top, containerRect.bottom - MENU_H);
  } else {
    if (typeof window !== "undefined") {
      if (left + MENU_W > window.innerWidth) left = Math.max(0, window.innerWidth - MENU_W);
      if (top + MENU_H > window.innerHeight) top = Math.max(0, window.innerHeight - MENU_H);
    }
  }

  // Close on click outside or Escape
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleScroll = () => onClose();

    document.addEventListener("pointerdown", handlePointerDown, { capture: true });
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, { capture: true });
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Element actions"
      className="fixed z-50 select-none"
      style={{
        left,
        top,
        width: MENU_W,
        backgroundColor: "#fdf6e3",
        border: "1px solid #93a1a1",
        borderRadius: 6,
        boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.12)",
        padding: "4px 0",
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 13,
      }}
    >
      {actions.map((action) => (
        <div key={action.id}>
          {action.separator && (
            <div
              style={{
                height: 1,
                backgroundColor: "#e8e0cc",
                margin: "3px 8px",
              }}
            />
          )}
          <div
            role="menuitem"
            tabIndex={action.disabled ? -1 : 0}
            aria-disabled={action.disabled}
            onClick={() => {
              if (!action.disabled) {
                onAction(action.id);
                onClose();
              }
            }}
            onKeyDown={(e) => {
              if (!action.disabled && (e.key === "Enter" || e.key === " ")) {
                onAction(action.id);
                onClose();
              }
            }}
            className={
              action.disabled
                ? "px-3 py-1.5 flex items-center gap-2 cursor-default"
                : action.danger
                ? "px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-[#f9e8d0] rounded-sm"
                : "px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-[#eee8d5] rounded-sm"
            }
            style={{
              color: action.disabled
                ? "#93a1a1"
                : action.danger
                ? "#cb4b16"
                : "#073642",
              marginInline: 2,
            }}
          >
            {action.icon && (
              <span className="text-base leading-none w-5 text-center flex-shrink-0" aria-hidden>
                {action.icon}
              </span>
            )}
            <span>{action.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
