"use client";

import { useState } from "react";
import Link from "next/link";

const liveExampleJson = {
  paper: "cream",
  tool: "ballpoint",
  inkColor: "#333",
  amplitude: 0.6,
  waves: 0.7,
  humanness: 0.12,
  width: 400,
  height: 300,
  elements: [
    { type: "rect", x: 40, y: 40, w: 320, h: 220 },
    { type: "line", x1: 200, y1: 40, x2: 200, y2: 260 },
    { type: "line", x1: 40, y1: 160, x2: 200, y2: 160 },
    { type: "window", x1: 80, y1: 40, x2: 160, y2: 40 },
    { type: "door-symbol", x: 200, y: 80, w: 45, swing: "right" },
    { type: "text", x: 80, y: 110, text: "Room A", fontSize: 16 },
    { type: "text", x: 80, y: 210, text: "Room B", fontSize: 16 },
    { type: "text", x: 260, y: 150, text: "Hall", fontSize: 16 },
    { type: "dim", x1: 40, y1: 280, x2: 200, y2: 280, label: "4.0m" },
    { type: "dim", x1: 200, y1: 280, x2: 360, y2: 280, label: "4.0m" },
  ],
};

const steps = [
  {
    num: "01",
    title: "Fetch the manifest",
    description: "GET the schema to understand all available element types, paper styles, and wobble settings.",
    code: `fetch("https://skissify.com/api/manifest")
  .then(r => r.json())
  .then(manifest => {
    // manifest.schema.elementTypes
    // manifest.schema.paper
    // manifest.schema.wobble
    // manifest.examples
  });`,
  },
  {
    num: "02",
    title: "Construct the sketch JSON",
    description: "Build a SketchData object with paper, tool, wobble settings, canvas size, and an elements array.",
    code: `const sketch = {
  paper: "cream",
  tool: "ballpoint",
  inkColor: "#222",
  amplitude: 0.7,
  waves: 0.8,
  humanness: 0.15,
  width: 640,
  height: 420,
  elements: [
    { type: "rect", x: 50, y: 50, w: 200, h: 120 },
    { type: "text", x: 100, y: 115, text: "Hello", fontSize: 22 },
    { type: "arrow", x1: 250, y1: 110, x2: 380, y2: 110 },
    { type: "circle", cx: 440, cy: 110, r: 50 }
  ]
};`,
  },
  {
    num: "03",
    title: "POST to save",
    description: "Send the sketch to the API. You'll get back a slug for the shareable URL.",
    code: `const res = await fetch("https://skissify.com/api/sketches", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "My AI Sketch",
    data: sketch
  })
});
const { slug } = await res.json();
// View at: https://skissify.com/s/{slug}`,
  },
  {
    num: "04",
    title: "View or embed",
    description: "Open the shareable URL, fork in the editor, or fetch the sketch data back via GET.",
    code: `// View:  https://skissify.com/s/{slug}
// Edit:  https://skissify.com/editor?edit={slug}
// Fork:  https://skissify.com/editor?fork={slug}
// API:   GET https://skissify.com/api/sketches/{slug}`,
  },
];

export default function ForAgentsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Nav */}
      <nav className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
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
            <span className="text-xl font-bold text-white">
              Skiss<span className="text-blue-400">ify</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/create"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Create with AI
            </Link>
            <Link
              href="/editor"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Editor
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              >
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
              </svg>
            </div>
            <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
              Developer & Agent Guide
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How to Create Sketches with AI
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Skissify is designed for AI agents. Fetch the manifest, build JSON, POST it --
            get a beautiful hand-drawn sketch with a shareable URL. No UI interaction needed.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-sm">{step.num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-400 mb-4">{step.description}</p>
                    <div className="relative">
                      <pre className="px-4 py-3 bg-neutral-950 rounded-lg text-neutral-300 font-mono text-xs border border-neutral-800 overflow-x-auto">
                        {step.code}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(step.code, `step-${i}`)}
                        className="absolute top-2 right-2 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 text-xs rounded transition-colors"
                      >
                        {copied === `step-${i}` ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[2.9rem] -bottom-8 w-0.5 h-8 bg-neutral-800" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live example: JSON + preview */}
      <section className="px-6 py-16 bg-neutral-900/50 border-t border-b border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Live Example</h2>
          <p className="text-neutral-400 mb-8">
            This JSON produces the sketch shown on the right. Try it yourself by pasting into the{" "}
            <Link href="/editor" className="text-blue-400 hover:underline">
              editor
            </Link>
            .
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* JSON side */}
            <div className="relative">
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900">
                  <span className="text-xs text-neutral-500 font-mono">sketch.json</span>
                  <button
                    onClick={() =>
                      copyToClipboard(JSON.stringify(liveExampleJson, null, 2), "live-json")
                    }
                    className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 text-xs rounded transition-colors"
                  >
                    {copied === "live-json" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="px-4 py-3 text-neutral-300 font-mono text-xs overflow-auto max-h-96">
                  {JSON.stringify(liveExampleJson, null, 2)}
                </pre>
              </div>
            </div>

            {/* Preview side -- static SVG approximation */}
            <div>
              <div
                className="rounded-xl border-2 border-amber-900/30 overflow-hidden shadow-lg"
                style={{ background: "#f5f0e0" }}
              >
                <div className="flex items-center justify-between px-4 py-2 border-b border-amber-900/20 bg-amber-50/50">
                  <span
                    className="text-xs text-amber-800/60"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    Preview (cream / ballpoint)
                  </span>
                </div>
                <div className="p-4">
                  <svg viewBox="0 0 400 300" className="w-full" style={{ filter: "url(#wobble)" }}>
                    <defs>
                      <filter id="wobble">
                        <feTurbulence
                          baseFrequency="0.02"
                          numOctaves="3"
                          seed="2"
                          result="noise"
                        />
                        <feDisplacementMap
                          in="SourceGraphic"
                          in2="noise"
                          scale="1.5"
                          xChannelSelector="R"
                          yChannelSelector="G"
                        />
                      </filter>
                    </defs>
                    {/* Outer walls */}
                    <rect
                      x="40"
                      y="40"
                      width="320"
                      height="220"
                      fill="none"
                      stroke="#333"
                      strokeWidth="2"
                    />
                    {/* Vertical divider */}
                    <line x1="200" y1="40" x2="200" y2="260" stroke="#333" strokeWidth="1.5" />
                    {/* Horizontal divider */}
                    <line x1="40" y1="160" x2="200" y2="160" stroke="#333" strokeWidth="1.5" />
                    {/* Window ticks */}
                    <line x1="80" y1="35" x2="80" y2="45" stroke="#333" strokeWidth="1.5" />
                    <line x1="160" y1="35" x2="160" y2="45" stroke="#333" strokeWidth="1.5" />
                    <line x1="80" y1="40" x2="160" y2="40" stroke="#333" strokeWidth="2" />
                    {/* Door arc */}
                    <path
                      d="M 200 80 A 45 45 0 0 1 245 125"
                      fill="none"
                      stroke="#333"
                      strokeWidth="1.2"
                      strokeDasharray="3,2"
                    />
                    <line x1="200" y1="80" x2="200" y2="125" stroke="none" />
                    {/* Room labels */}
                    <text
                      x="80"
                      y="110"
                      fontSize="16"
                      fill="#555"
                      fontFamily="'Caveat', cursive"
                      textAnchor="start"
                    >
                      Room A
                    </text>
                    <text
                      x="80"
                      y="210"
                      fontSize="16"
                      fill="#555"
                      fontFamily="'Caveat', cursive"
                      textAnchor="start"
                    >
                      Room B
                    </text>
                    <text
                      x="260"
                      y="150"
                      fontSize="16"
                      fill="#555"
                      fontFamily="'Caveat', cursive"
                      textAnchor="start"
                    >
                      Hall
                    </text>
                    {/* Dimensions */}
                    <line x1="40" y1="280" x2="200" y2="280" stroke="#666" strokeWidth="0.8" />
                    <line x1="40" y1="275" x2="40" y2="285" stroke="#666" strokeWidth="0.8" />
                    <line x1="200" y1="275" x2="200" y2="285" stroke="#666" strokeWidth="0.8" />
                    <text
                      x="120"
                      y="276"
                      fontSize="11"
                      fill="#666"
                      fontFamily="'Caveat', cursive"
                      textAnchor="middle"
                    >
                      4.0m
                    </text>
                    <line x1="200" y1="280" x2="360" y2="280" stroke="#666" strokeWidth="0.8" />
                    <line x1="360" y1="275" x2="360" y2="285" stroke="#666" strokeWidth="0.8" />
                    <text
                      x="280"
                      y="276"
                      fontSize="11"
                      fill="#666"
                      fontFamily="'Caveat', cursive"
                      textAnchor="middle"
                    >
                      4.0m
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MCP Setup */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">MCP Tool Setup</h2>
          <p className="text-neutral-400 mb-8">
            Install the Skissify MCP server so Claude, Cursor, or any MCP-compatible agent can
            create sketches as a native tool call.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Claude Desktop */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-3">Claude Desktop</h3>
              <p className="text-sm text-neutral-400 mb-4">
                Add to your <code className="text-blue-400">claude_desktop_config.json</code>:
              </p>
              <div className="relative">
                <pre className="px-4 py-3 bg-neutral-950 rounded-lg text-neutral-300 font-mono text-xs border border-neutral-800 overflow-x-auto">
{`{
  "mcpServers": {
    "skissify": {
      "command": "npx",
      "args": ["-y", "skissify-mcp"]
    }
  }
}`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `{\n  "mcpServers": {\n    "skissify": {\n      "command": "npx",\n      "args": ["-y", "skissify-mcp"]\n    }\n  }\n}`,
                      "mcp-claude"
                    )
                  }
                  className="absolute top-2 right-2 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 text-xs rounded transition-colors"
                >
                  {copied === "mcp-claude" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Direct API */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-3">Direct API (curl)</h3>
              <p className="text-sm text-neutral-400 mb-4">
                No MCP? Use the REST API directly:
              </p>
              <div className="relative">
                <pre className="px-4 py-3 bg-neutral-950 rounded-lg text-neutral-300 font-mono text-xs border border-neutral-800 overflow-x-auto">
{`curl -X POST https://skissify.com/api/sketches \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My Sketch",
    "data": {
      "paper": "cream",
      "tool": "ballpoint",
      "inkColor": "#222",
      "amplitude": 0.7,
      "waves": 0.8,
      "humanness": 0.15,
      "width": 540,
      "height": 420,
      "elements": [
        {"type":"rect","x":50,"y":50,"w":200,"h":120},
        {"type":"text","x":100,"y":115,"text":"Hello"}
      ]
    }
  }'`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `curl -X POST https://skissify.com/api/sketches \\\n  -H "Content-Type: application/json" \\\n  -d '{"title":"My Sketch","data":{"paper":"cream","tool":"ballpoint","inkColor":"#222","amplitude":0.7,"waves":0.8,"humanness":0.15,"width":540,"height":420,"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":120},{"type":"text","x":100,"y":115,"text":"Hello"}]}}'`,
                      "curl"
                    )
                  }
                  className="absolute top-2 right-2 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 text-xs rounded transition-colors"
                >
                  {copied === "curl" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Element Reference */}
      <section className="px-6 py-16 bg-neutral-900/50 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Element Types Reference</h2>
          <p className="text-neutral-400 mb-8">
            All available element types and their properties. Every element must have a{" "}
            <code className="text-blue-400">type</code> field.
          </p>

          <div className="grid gap-3">
            {[
              { type: "line", props: "x1, y1, x2, y2, color, strokeWidth", desc: "Wobbly hand-drawn line" },
              { type: "rect", props: "x, y, w, h, color, fill, strokeWidth", desc: "Hand-drawn rectangle" },
              { type: "circle", props: "cx, cy, r, color, fill", desc: "Hand-drawn circle" },
              { type: "arc", props: "cx, cy, r, startAngle, endAngle, color", desc: "Hand-drawn arc (degrees)" },
              { type: "arrow", props: "x1, y1, x2, y2, color", desc: "Line with arrowhead" },
              { type: "text", props: "x, y, text, fontSize, color, fontFamily", desc: "Caveat handwriting text" },
              { type: "dashed", props: "x1, y1, x2, y2, color, dashLength", desc: "Dashed line" },
              { type: "dim", props: "x1, y1, x2, y2, label, color", desc: "Dimension line with label" },
              { type: "window", props: "x1, y1, x2, y2, color", desc: "Window symbol (wall ticks)" },
              { type: "door-symbol", props: "x, y, w, swing, color", desc: "Door with swing arc" },
              { type: "door-slide", props: "x, y, w, color", desc: "Sliding door (parallel lines)" },
              { type: "stair", props: "x, y, w, h, steps, color", desc: "Staircase with treads" },
              { type: "opening", props: "x1, y1, x2, y2, color", desc: "Wall opening with returns" },
              { type: "column", props: "cx, cy, size, color, shape", desc: "Structural column" },
            ].map((el) => (
              <div
                key={el.type}
                className="flex items-start gap-4 px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg"
              >
                <code className="flex-shrink-0 px-2 py-0.5 bg-blue-600/10 text-blue-400 rounded text-sm font-mono font-medium min-w-[110px]">
                  {el.type}
                </code>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-300">{el.desc}</p>
                  <p className="text-xs text-neutral-500 font-mono mt-1">{el.props}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifest link */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <span className="text-neutral-400 text-sm">Full machine-readable schema:</span>
            <code className="text-blue-400 font-mono text-sm">
              https://skissify.com/api/manifest
            </code>
            <button
              onClick={() =>
                copyToClipboard("https://skissify.com/api/manifest", "manifest-bottom")
              }
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded transition-colors"
            >
              {copied === "manifest-bottom" ? "Copied!" : "Copy URL"}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-neutral-500">
          <span>Skissify -- Hand-drawn sketches from JSON</span>
          <div className="flex items-center gap-4">
            <Link href="/create" className="hover:text-white transition-colors">
              Create with AI
            </Link>
            <Link href="/editor" className="hover:text-white transition-colors">
              Editor
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
