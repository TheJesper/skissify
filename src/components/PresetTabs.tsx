"use client";

import { presets } from "@/lib/presets";

interface PresetTabsProps {
  active: string;
  onSelect: (name: string) => void;
}

export default function PresetTabs({ active, onSelect }: PresetTabsProps) {
  return (
    <div className="bg-neutral-900 border-b border-neutral-800 px-4 flex items-center h-[36px] shrink-0 overflow-x-auto">
      <span className="text-[10px] text-neutral-500 uppercase tracking-wider mr-3 shrink-0">
        Demos
      </span>
      <div className="flex gap-1">
        {Object.keys(presets).map((name) => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`px-3 py-1 rounded text-xs font-medium transition-all whitespace-nowrap ${
              active === name
                ? "bg-blue-600 text-white"
                : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
