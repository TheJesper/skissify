"use client";

interface ToolbarProps {
  onRedraw: () => void;
  onPrint: () => void;
}

export default function Toolbar({ onRedraw, onPrint }: ToolbarProps) {
  return (
    <header className="h-[52px] bg-neutral-950 border-b border-neutral-800 flex items-center px-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-6">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-400"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
        <span className="text-lg font-bold text-white tracking-tight">
          Skiss<span className="text-blue-400">ify</span>
        </span>
        <span className="text-[10px] text-neutral-500 font-mono ml-1">
          v1.0
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrint}
          className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs font-medium transition-colors"
        >
          Print
        </button>
        <button
          onClick={onRedraw}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium transition-colors"
        >
          Redraw
        </button>
      </div>
    </header>
  );
}
