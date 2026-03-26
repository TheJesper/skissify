"use client";

import { useState } from "react";
import Link from "next/link";

const examplePrompts = [
  "A 3-bedroom apartment with kitchen and living room",
  "A simple flowchart: Start -> Process -> Decision -> End",
  "Office layout with 4 desks, meeting room, and kitchen",
  "System architecture: Frontend -> API -> Database with a cache layer",
  "Site plan with parking, building footprint, and landscaping",
];

const exampleJson = `{
  "title": "My Sketch",
  "data": {
    "paper": "cream",
    "tool": "ballpoint",
    "inkColor": "#222",
    "amplitude": 0.7,
    "waves": 0.8,
    "humanness": 0.15,
    "width": 640,
    "height": 420,
    "elements": [
      { "type": "rect", "x": 50, "y": 80, "w": 200, "h": 120 },
      { "type": "text", "x": 100, "y": 145, "text": "Frontend", "fontSize": 20 },
      { "type": "arrow", "x1": 250, "y1": 140, "x2": 370, "y2": 140 },
      { "type": "rect", "x": 370, "y": 80, "w": 200, "h": 120 },
      { "type": "text", "x": 425, "y": 145, "text": "Backend", "fontSize": 20 },
      { "type": "arrow", "x1": 470, "y1": 200, "x2": 470, "y2": 280 },
      { "type": "circle", "cx": 470, "cy": 340, "r": 50 },
      { "type": "text", "x": 450, "y": 345, "text": "DB", "fontSize": 18 }
    ]
  }
}`;

const agentPrompt = `I want you to create a hand-drawn sketch using Skissify.

First, fetch the schema from https://skissify.com/api/manifest to understand the available element types and properties.

Then construct a JSON sketch with:
- paper: "cream" (or "white", "yellow", "blueprint")
- tool: "ballpoint" (or "pencil", "ink")
- wobble settings: amplitude 0.7, waves 0.8, humanness 0.15
- width/height for the canvas size
- An elements array with typed drawing elements

Finally, POST it to https://skissify.com/api/sketches as:
{ "title": "My Sketch", "data": { ...sketchData } }

You'll get back a { "slug": "..." } -- viewable at https://skissify.com/s/{slug}`;

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 5000);
  };

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
              href="/editor"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Editor
            </Link>
            <Link
              href="/for-agents"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              For Agents
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero section with sketch paper background */}
      <section className="px-6 pt-16 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Create with <span className="text-blue-400">AI</span>
          </h1>
          <p className="text-lg text-neutral-400 mb-10">
            Describe what you want to sketch and let AI draw it for you
          </p>
        </div>
      </section>

      {/* Prompt input area */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Paper-style card */}
          <div
            className="rounded-xl p-8 border-2 border-amber-900/30 shadow-xl relative overflow-hidden"
            style={{ background: "#f5f0e0" }}
          >
            {/* Subtle grid lines */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#9a8b6e 1px, transparent 1px), linear-gradient(90deg, #9a8b6e 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative">
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Describe what you want to sketch...
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A 3-bedroom apartment with open kitchen, living room, and balcony..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-amber-800/20 bg-white/70 text-amber-950 placeholder-amber-700/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                style={{ fontFamily: "'Caveat', cursive", fontSize: "18px" }}
              />
              <button
                onClick={handleGenerate}
                className="mt-4 w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors text-lg"
              >
                Generate Sketch
              </button>

              {showComingSoon && (
                <div className="mt-4 p-4 bg-amber-100 border border-amber-300 rounded-lg text-amber-800 text-sm">
                  AI generation coming soon -- for now, use the{" "}
                  <Link href="/editor" className="text-blue-600 underline font-medium">
                    JSON editor
                  </Link>{" "}
                  or the{" "}
                  <Link href="/for-agents" className="text-blue-600 underline font-medium">
                    MCP tool
                  </Link>{" "}
                  to create sketches programmatically.
                </div>
              )}
            </div>
          </div>

          {/* Example prompts */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wider">
              Try an example
            </h3>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((ep) => (
                <button
                  key={ep}
                  onClick={() => setPrompt(ep)}
                  className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  {ep}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For AI Agents section */}
      <section className="px-6 py-16 bg-neutral-900/50 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">For AI Agents</h2>
          <p className="text-neutral-400 mb-8">
            AI agents can create sketches directly via the API or MCP tool. No UI needed.
          </p>

          <div className="grid gap-6">
            {/* Manifest URL */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">
                Manifest URL
              </h3>
              <div className="flex items-center gap-3">
                <code className="flex-1 px-4 py-2.5 bg-neutral-950 rounded-lg text-blue-400 font-mono text-sm border border-neutral-800">
                  https://skissify.com/api/manifest
                </code>
                <button
                  onClick={() =>
                    copyToClipboard("https://skissify.com/api/manifest", "manifest")
                  }
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                >
                  {copied === "manifest" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* MCP setup */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">
                MCP Server Setup
              </h3>
              <p className="text-neutral-400 text-sm mb-4">
                Add Skissify as an MCP tool in your Claude Desktop or agent config:
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
                      "mcp"
                    )
                  }
                  className="absolute top-2 right-2 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 text-xs rounded transition-colors"
                >
                  {copied === "mcp" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Example JSON */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">
                Example API Call
              </h3>
              <p className="text-neutral-400 text-sm mb-4">
                POST this JSON to <code className="text-blue-400">/api/sketches</code> to create a sketch:
              </p>
              <div className="relative">
                <pre className="px-4 py-3 bg-neutral-950 rounded-lg text-neutral-300 font-mono text-xs border border-neutral-800 overflow-x-auto max-h-64 overflow-y-auto">
                  {exampleJson}
                </pre>
                <button
                  onClick={() => copyToClipboard(exampleJson, "json")}
                  className="absolute top-2 right-2 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 text-xs rounded transition-colors"
                >
                  {copied === "json" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Copy prompt button */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">
                Ready-made Agent Prompt
              </h3>
              <p className="text-neutral-400 text-sm mb-4">
                Copy this prompt and give it to Claude, GPT, or any AI agent to create a Skissify sketch:
              </p>
              <div className="relative">
                <pre className="px-4 py-3 bg-neutral-950 rounded-lg text-neutral-300 font-mono text-xs border border-neutral-800 overflow-x-auto max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {agentPrompt}
                </pre>
                <button
                  onClick={() => copyToClipboard(agentPrompt, "prompt")}
                  className="absolute top-2 right-2 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 text-xs rounded transition-colors"
                >
                  {copied === "prompt" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/for-agents"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Full agent documentation &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-neutral-500">
          <span>Skissify -- Hand-drawn sketches from JSON</span>
          <div className="flex items-center gap-4">
            <Link href="/editor" className="hover:text-white transition-colors">
              Editor
            </Link>
            <Link href="/for-agents" className="hover:text-white transition-colors">
              For Agents
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
