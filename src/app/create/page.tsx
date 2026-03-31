"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const examplePrompts = [
  "A 3-bedroom apartment with kitchen and living room",
  "A simple flowchart: Start → Process → Decision → End",
  "Office layout with 4 desks, meeting room, and kitchen",
  "System architecture: Frontend → API → Database with a cache layer",
  "Site plan with parking, building footprint, and landscaping",
];

/** Maps prompts to the best preset + paper type */
const PRESET_RULES: { keywords: string[]; preset: string }[] = [
  {
    keywords: ["blueprint", "technical", "permit", "permit", "cad", "dwg", "engineering"],
    preset: "blueprint",
  },
  {
    keywords: ["apartment", "floor plan", "flat", "bedroom", "bathroom", "kitchen", "room", "house", "hallway", "sovrum", "vardagsrum", "badrum", "kök"],
    preset: "plan drawing",
  },
  {
    keywords: ["villa", "larger", "big house", "detached", "two floor", "two-storey"],
    preset: "villa",
  },
  {
    keywords: ["office", "desk", "meeting room", "reception", "workspace", "coworking", "open plan"],
    preset: "office layout",
  },
  {
    keywords: ["flowchart", "flow chart", "decision", "process", "diagram", "workflow", "bpmn", "start", "end", "if else", "branch"],
    preset: "flowchart",
  },
  {
    keywords: ["architecture", "facade", "elevation", "exterior", "building front", "storeys", "floors"],
    preset: "architecture",
  },
  {
    keywords: ["garden", "landscape", "outdoor", "trees", "plants", "patio", "path", "beds", "lawn", "site plan", "parking"],
    preset: "garden plan",
  },
  {
    keywords: ["network", "topology", "infrastructure", "cloud", "server", "load balancer", "database cluster", "redis", "postgres", "vpc", "subnet", "firewall", "devops", "kubernetes", "microservice", "api gateway", "cdn"],
    preset: "network topology",
  },
  {
    keywords: ["studio", "studio apartment", "open plan", "open-plan", "loft", "single room", "one room", "compact", "bookshelf", "armchair", "work from home"],
    preset: "studio apartment",
  },
  {
    keywords: ["napkin", "sketch", "rough", "quick", "idea", "concept", "system", "api", "backend", "frontend", "architecture diagram", "tech", "component"],
    preset: "napkin sketch",
  },
];

function matchPreset(prompt: string): string {
  const lower = prompt.toLowerCase();
  let bestPreset = "napkin sketch";
  let bestScore = 0;

  for (const rule of PRESET_RULES) {
    const score = rule.keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestPreset = rule.preset;
    }
  }

  return bestPreset;
}

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
  const [copied, setCopied] = useState<string | null>(null);
  const [matchedPreset, setMatchedPreset] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;
    const preset = matchPreset(prompt.trim());
    setMatchedPreset(preset);
    setIsRedirecting(true);
    // Brief delay so user sees the match confirmation before redirect
    setTimeout(() => {
      router.push(`/?preset=${encodeURIComponent(preset)}`);
    }, 800);
  }, [prompt, router]);

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    setMatchedPreset(null);
    setIsRedirecting(false);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const presetEmoji: Record<string, string> = {
    "plan drawing": "🏠",
    "villa": "🏡",
    "blueprint": "📐",
    "office layout": "🏢",
    "flowchart": "📊",
    "architecture": "🏗️",
    "garden plan": "🌿",
    "napkin sketch": "✏️",
    "network topology": "🌐",
    "studio apartment": "🛋️",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fdf6e3" }}>
      {/* Nav */}
      <nav className="border-b border-[#93a1a1]/20 px-6 py-4">
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
              className="text-[#268bd2]"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            <span className="text-xl font-bold text-[#073642]">
              Skiss<span className="text-[#268bd2]">ify</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/editor"
              className="text-sm text-[#657b83] hover:text-[#073642] transition-colors"
            >
              Editor
            </Link>
            <Link
              href="/for-agents"
              className="text-sm text-[#657b83] hover:text-[#073642] transition-colors"
            >
              For Agents
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="px-6 pt-16 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#073642] mb-4">
            Create with <span className="text-[#268bd2]">AI</span>
          </h1>
          <p className="text-lg text-[#657b83] mb-10">
            Describe what you want to sketch and jump straight into the editor with the right template
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
                What do you want to sketch?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleGenerate();
                  }
                }}
                placeholder="A 3-bedroom apartment with open kitchen, living room, and balcony..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-amber-800/20 bg-white/70 text-amber-950 placeholder-amber-700/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                style={{ fontFamily: "'Caveat', cursive", fontSize: "18px" }}
              />

              {/* Preset match preview */}
              {matchedPreset && (
                <div
                  className="mt-3 px-4 py-3 rounded-lg flex items-center gap-3 text-sm"
                  style={{ backgroundColor: "#e8f4e8", border: "1px solid #93c49a" }}
                >
                  <span className="text-xl">{presetEmoji[matchedPreset] ?? "✏️"}</span>
                  <div>
                    <span className="font-medium text-[#2a6232]">
                      {isRedirecting ? "Opening" : "Best match"}:
                    </span>{" "}
                    <span className="text-[#1a4a22] font-semibold capitalize">{matchedPreset}</span>
                    {isRedirecting && (
                      <span className="ml-2 text-[#2a6232] animate-pulse">loading editor…</span>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isRedirecting}
                className="mt-4 w-full px-6 py-3 bg-[#268bd2] hover:bg-[#268bd2]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-lg flex items-center justify-center gap-2"
              >
                {isRedirecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Opening editor…
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                    Create Sketch
                  </>
                )}
              </button>
              <p className="mt-2 text-center text-xs text-amber-700/60">
                ⌘ Enter to create — opens the editor with the best-matching template
              </p>
            </div>
          </div>

          {/* Example prompts */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-[#839496] mb-3 uppercase tracking-wider">
              Try an example
            </h3>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((ep) => (
                <button
                  key={ep}
                  onClick={() => handlePromptChange(ep)}
                  className="px-3 py-1.5 bg-[#eee8d5] border border-[#93a1a1]/20 rounded-full text-sm text-[#657b83] hover:text-[#073642] hover:border-[#93a1a1]/40 transition-colors"
                >
                  {ep}
                </button>
              ))}
            </div>
          </div>

          {/* Or browse gallery */}
          <div className="mt-10 text-center">
            <span className="text-sm text-[#93a1a1]">or</span>
            <div className="mt-3 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#eee8d5] hover:bg-[#ddd8c5] border border-[#93a1a1]/30 rounded-lg text-sm font-medium text-[#586e75] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                Browse gallery
              </Link>
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#eee8d5] hover:bg-[#ddd8c5] border border-[#93a1a1]/30 rounded-lg text-sm font-medium text-[#586e75] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
                Open blank editor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For AI Agents section */}
      <section className="px-6 py-16 bg-[#eee8d5]/50 border-t border-[#93a1a1]/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#073642] mb-2">For AI Agents</h2>
          <p className="text-[#657b83] mb-8">
            AI agents can create sketches directly via the API or MCP tool. No UI needed.
          </p>

          <div className="grid gap-6">
            {/* Manifest URL */}
            <div className="bg-[#eee8d5] border border-[#93a1a1]/20 rounded-xl p-6">
              <h3 className="text-sm font-medium text-[#657b83] uppercase tracking-wider mb-3">
                Manifest URL
              </h3>
              <div className="flex items-center gap-3">
                <code className="flex-1 px-4 py-2.5 bg-[#fdf6e3] rounded-lg text-[#268bd2] font-mono text-sm border border-[#93a1a1]/20">
                  https://skissify.com/api/manifest
                </code>
                <button
                  onClick={() =>
                    copyToClipboard("https://skissify.com/api/manifest", "manifest")
                  }
                  className="px-4 py-2.5 bg-[#eee8d5] hover:bg-[#93a1a1]/20 text-[#073642] text-sm font-medium rounded-lg transition-colors whitespace-nowrap border border-[#93a1a1]/20"
                >
                  {copied === "manifest" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* MCP setup */}
            <div className="bg-[#eee8d5] border border-[#93a1a1]/20 rounded-xl p-6">
              <h3 className="text-sm font-medium text-[#657b83] uppercase tracking-wider mb-3">
                MCP Server Setup
              </h3>
              <p className="text-[#657b83] text-sm mb-4">
                Add Skissify as an MCP tool in your Claude Desktop or agent config:
              </p>
              <div className="relative">
                <pre className="px-4 py-3 bg-[#fdf6e3] rounded-lg text-[#586e75] font-mono text-xs border border-[#93a1a1]/20 overflow-x-auto">
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
                  className="absolute top-2 right-2 px-3 py-1 bg-[#eee8d5] hover:bg-[#93a1a1]/20 text-[#657b83] text-xs rounded transition-colors"
                >
                  {copied === "mcp" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Example JSON */}
            <div className="bg-[#eee8d5] border border-[#93a1a1]/20 rounded-xl p-6">
              <h3 className="text-sm font-medium text-[#657b83] uppercase tracking-wider mb-3">
                Example API Call
              </h3>
              <p className="text-[#657b83] text-sm mb-4">
                POST this JSON to <code className="text-[#268bd2]">/api/sketches</code> to create a sketch:
              </p>
              <div className="relative">
                <pre className="px-4 py-3 bg-[#fdf6e3] rounded-lg text-[#586e75] font-mono text-xs border border-[#93a1a1]/20 overflow-x-auto max-h-64 overflow-y-auto">
                  {exampleJson}
                </pre>
                <button
                  onClick={() => copyToClipboard(exampleJson, "json")}
                  className="absolute top-2 right-2 px-3 py-1 bg-[#eee8d5] hover:bg-[#93a1a1]/20 text-[#657b83] text-xs rounded transition-colors"
                >
                  {copied === "json" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Copy prompt button */}
            <div className="bg-[#eee8d5] border border-[#93a1a1]/20 rounded-xl p-6">
              <h3 className="text-sm font-medium text-[#657b83] uppercase tracking-wider mb-3">
                Ready-made Agent Prompt
              </h3>
              <p className="text-[#657b83] text-sm mb-4">
                Copy this prompt and give it to Claude, GPT, or any AI agent to create a Skissify sketch:
              </p>
              <div className="relative">
                <pre className="px-4 py-3 bg-[#fdf6e3] rounded-lg text-[#586e75] font-mono text-xs border border-[#93a1a1]/20 overflow-x-auto max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {agentPrompt}
                </pre>
                <button
                  onClick={() => copyToClipboard(agentPrompt, "prompt")}
                  className="absolute top-2 right-2 px-3 py-1 bg-[#eee8d5] hover:bg-[#93a1a1]/20 text-[#657b83] text-xs rounded transition-colors"
                >
                  {copied === "prompt" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/for-agents"
              className="text-[#268bd2] hover:text-[#268bd2]/80 font-medium transition-colors"
            >
              Full agent documentation &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#93a1a1]/20 px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-[#839496]">
          <span>Skissify — Hand-drawn sketches from JSON</span>
          <div className="flex items-center gap-4">
            <Link href="/editor" className="hover:text-[#073642] transition-colors">
              Editor
            </Link>
            <Link href="/for-agents" className="hover:text-[#073642] transition-colors">
              For Agents
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
