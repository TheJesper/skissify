"use client";

import { presets } from "@/lib/presets";

interface PresetTabsProps {
  active: string;
  onSelect: (name: string) => void;
}

export default function PresetTabs({ active, onSelect }: PresetTabsProps) {
  return (
    <div className="px-4 flex items-center h-[36px] shrink-0 overflow-x-auto" style={{ backgroundColor: "#eee8d5", borderBottom: "1px solid #93a1a1" }}>
      <span className="text-[10px] uppercase tracking-wider mr-3 shrink-0" style={{ color: "#93a1a1" }}>
        Demos
      </span>
      <div className="flex gap-1">
        {Object.keys(presets).map((name) => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`px-3 py-1 rounded text-xs font-medium transition-all whitespace-nowrap ${
              active === name
                ? "text-[#fdf6e3]"
                : "hover:bg-[#fdf6e3]"
            }`}
            style={active === name
              ? { backgroundColor: "#268bd2" }
              : { backgroundColor: "#fdf6e3", color: "#657b83" }
            }
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
