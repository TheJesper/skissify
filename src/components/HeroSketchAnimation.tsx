"use client";

import { useEffect, useState } from "react";

const paths = [
  // Outer rect
  { d: "M 80 60 L 520 60", delay: 0 },
  { d: "M 520 60 L 520 280", delay: 200 },
  { d: "M 520 280 L 80 280", delay: 400 },
  { d: "M 80 280 L 80 60", delay: 600 },
  // Inner divider
  { d: "M 300 60 L 300 280", delay: 900 },
  // Room labels area
  { d: "M 80 170 L 300 170", delay: 1100 },
  // Door arc
  { d: "M 300 200 Q 340 200 340 240", delay: 1400 },
  // Window marks
  { d: "M 140 60 L 240 60", delay: 1600 },
  { d: "M 360 60 L 480 60", delay: 1700 },
  // Arrow
  { d: "M 540 170 L 580 170", delay: 1900 },
  // Text underline
  { d: "M 540 190 L 610 190", delay: 2100 },
];

export default function HeroSketchAnimation() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let idx = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    paths.forEach((p, i) => {
      const timer = setTimeout(() => {
        setVisibleCount(i + 1);
        idx = i + 1;
      }, p.delay + 300);
      timers.push(timer);
    });

    // Reset and loop
    const loopTimer = setTimeout(() => {
      setVisibleCount(0);
      const restart = setTimeout(() => {
        // Re-trigger by resetting count
        paths.forEach((p, i) => {
          const t = setTimeout(() => setVisibleCount(i + 1), p.delay + 300);
          timers.push(t);
        });
      }, 500);
      timers.push(restart);
    }, 4000);
    timers.push(loopTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800/60 p-1.5 shadow-2xl">
      <div className="bg-neutral-900 rounded-xl overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800/50 border-b border-neutral-700/40">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[11px] text-neutral-500 font-mono">
              skissify -- floor-plan.json
            </span>
          </div>
        </div>

        {/* Split view: JSON + Canvas */}
        <div className="flex flex-col md:flex-row">
          {/* JSON side */}
          <div className="md:w-2/5 p-5 border-b md:border-b-0 md:border-r border-neutral-800/50">
            <pre className="text-[11px] md:text-xs font-mono leading-relaxed text-neutral-500">
              <span className="text-neutral-600">{"{"}</span>
              {"\n"}
              {"  "}<span className="text-blue-400">&quot;paper&quot;</span>
              <span className="text-neutral-600">:</span>{" "}
              <span className="text-amber-400">&quot;cream&quot;</span>
              <span className="text-neutral-600">,</span>
              {"\n"}
              {"  "}<span className="text-blue-400">&quot;tool&quot;</span>
              <span className="text-neutral-600">:</span>{" "}
              <span className="text-amber-400">&quot;ballpoint&quot;</span>
              <span className="text-neutral-600">,</span>
              {"\n"}
              {"  "}<span className="text-blue-400">&quot;amplitude&quot;</span>
              <span className="text-neutral-600">:</span>{" "}
              <span className="text-green-400">0.7</span>
              <span className="text-neutral-600">,</span>
              {"\n"}
              {"  "}<span className="text-blue-400">&quot;elements&quot;</span>
              <span className="text-neutral-600">: [</span>
              {"\n"}
              {"    "}<span className="text-neutral-600">{"{"}</span>{" "}
              <span className="text-blue-400">&quot;type&quot;</span>
              <span className="text-neutral-600">:</span>{" "}
              <span className="text-amber-400">&quot;rect&quot;</span>
              <span className="text-neutral-600">,</span>{" "}
              <span className="text-neutral-600">...</span>{" "}
              <span className="text-neutral-600">{"}"}</span>
              <span className="text-neutral-600">,</span>
              {"\n"}
              {"    "}<span className="text-neutral-600">{"{"}</span>{" "}
              <span className="text-blue-400">&quot;type&quot;</span>
              <span className="text-neutral-600">:</span>{" "}
              <span className="text-amber-400">&quot;door&quot;</span>
              <span className="text-neutral-600">,</span>{" "}
              <span className="text-neutral-600">...</span>{" "}
              <span className="text-neutral-600">{"}"}</span>
              <span className="text-neutral-600">,</span>
              {"\n"}
              {"    "}<span className="text-neutral-600">{"{"}</span>{" "}
              <span className="text-blue-400">&quot;type&quot;</span>
              <span className="text-neutral-600">:</span>{" "}
              <span className="text-amber-400">&quot;window&quot;</span>
              <span className="text-neutral-600">,</span>{" "}
              <span className="text-neutral-600">...</span>{" "}
              <span className="text-neutral-600">{"}"}</span>
              {"\n"}
              {"  "}<span className="text-neutral-600">]</span>
              {"\n"}
              <span className="text-neutral-600">{"}"}</span>
            </pre>
          </div>

          {/* Canvas side */}
          <div className="md:w-3/5 p-5 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f5f0e0 0%, #ede5cc 100%)" }}>
            <svg
              viewBox="0 0 640 340"
              className="w-full max-w-md"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Grid lines (very subtle) */}
              {Array.from({ length: 14 }).map((_, i) => (
                <line
                  key={`vg${i}`}
                  x1={i * 48}
                  y1={0}
                  x2={i * 48}
                  y2={340}
                  stroke="#c5b99a"
                  strokeWidth="0.3"
                  opacity="0.3"
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={`hg${i}`}
                  x1={0}
                  y1={i * 48}
                  x2={640}
                  y2={i * 48}
                  stroke="#c5b99a"
                  strokeWidth="0.3"
                  opacity="0.3"
                />
              ))}

              {/* Animated sketch lines */}
              {paths.map((p, i) => (
                <path
                  key={i}
                  d={p.d}
                  stroke="#333"
                  strokeWidth="1.8"
                  className="transition-all duration-500"
                  style={{
                    opacity: i < visibleCount ? 1 : 0,
                    strokeDasharray: i < visibleCount ? "none" : "1000",
                    strokeDashoffset: i < visibleCount ? 0 : 1000,
                    filter: "url(#wobble)",
                  }}
                />
              ))}

              {/* Room labels that appear */}
              <text
                x="140"
                y="140"
                fontSize="16"
                fill="#777"
                fontFamily="Caveat, cursive"
                className="transition-opacity duration-700"
                style={{ opacity: visibleCount > 5 ? 1 : 0 }}
              >
                SOVRUM
              </text>
              <text
                x="370"
                y="180"
                fontSize="16"
                fill="#777"
                fontFamily="Caveat, cursive"
                className="transition-opacity duration-700"
                style={{ opacity: visibleCount > 7 ? 1 : 0 }}
              >
                KOK
              </text>
              <text
                x="555"
                y="180"
                fontSize="13"
                fill="#888"
                fontFamily="Caveat, cursive"
                className="transition-opacity duration-700"
                style={{ opacity: visibleCount > 9 ? 1 : 0 }}
              >
                5.0m
              </text>

              {/* SVG filter for subtle wobble */}
              <defs>
                <filter id="wobble">
                  <feTurbulence
                    type="turbulence"
                    baseFrequency="0.02"
                    numOctaves="2"
                    result="turbulence"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="turbulence"
                    scale="1.5"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
