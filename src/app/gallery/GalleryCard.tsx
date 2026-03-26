"use client";

import Link from "next/link";

interface GalleryCardProps {
  name: string;
  description: string;
  paperColor: string;
  tool: string;
  paper: string;
}

export default function GalleryCard({
  name,
  description,
  paperColor,
  tool,
  paper,
}: GalleryCardProps) {
  return (
    <Link
      href={`/editor?preset=${encodeURIComponent(name)}`}
      className="group block bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-blue-600/50 transition-all hover:shadow-lg hover:shadow-blue-600/5"
    >
      {/* Preview swatch */}
      <div
        className="h-36 flex items-center justify-center relative"
        style={{ backgroundColor: paperColor }}
      >
        {/* Decorative lines to hint at the sketch */}
        <svg
          viewBox="0 0 200 100"
          className="w-3/4 h-auto opacity-30"
          fill="none"
          stroke={paper === "blueprint" ? "#8ab4d8" : "#555"}
          strokeWidth="1"
        >
          <rect x="20" y="10" width="60" height="40" rx="1" />
          <rect x="110" y="10" width="60" height="40" rx="1" />
          <line x1="80" y1="30" x2="110" y2="30" />
          <rect x="50" y="60" width="100" height="30" rx="1" />
          <line x1="100" y1="50" x2="100" y2="60" />
        </svg>
        <div className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded bg-black/20 text-black/50 font-mono">
          {tool} / {paper}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors capitalize">
          {name}
        </h3>
        <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
