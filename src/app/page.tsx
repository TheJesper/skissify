import Link from "next/link";
import { PLANS } from "@/lib/stripe";
import HeroSketchAnimation from "@/components/HeroSketchAnimation";
import MiniCanvasDemo from "@/components/MiniCanvasDemo";

const features = [
  {
    title: "Hand-Drawn Style",
    description:
      "Organic wobble algorithms make every line look naturally sketched. Adjust amplitude, waves, and humanness.",
    icon: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",
    accent: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "AI Agent Compatible",
    description:
      "MCP server + JSON REST API. Any AI agent can create sketches programmatically in seconds.",
    icon: "M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v2h-4V6a2 2 0 0 1 2-2z",
    accent: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "14 Element Types",
    description:
      "Lines, rects, circles, arrows, doors, windows, stairs, dimensions, columns, and more.",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    accent: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Multiple Paper Styles",
    description:
      "Cream, white, yellow pad, and blueprint. Each with its own grid and color scheme.",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
    accent: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "Share & Collaborate",
    description:
      "Save sketches to the cloud, get shareable public links, and let others fork your work.",
    icon: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
    accent: "from-pink-500/20 to-rose-500/20",
  },
  {
    title: "Export Anywhere",
    description:
      "Export as PNG, print directly, or grab the JSON for version control and automation.",
    icon: "M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z",
    accent: "from-sky-500/20 to-blue-500/20",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Nav */}
      <nav className="border-b border-neutral-800/60 px-6 py-4 backdrop-blur-sm bg-neutral-950/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="28"
              height="28"
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
            <span className="text-2xl font-bold text-white">
              Skiss<span className="text-blue-400">ify</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/editor"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Editor
            </Link>
            <Link
              href="/create"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Create with AI
            </Link>
            <Link
              href="/gallery"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/for-agents"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              For Agents
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/auth/signin"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-blue-600/25"
            >
              Sign In
            </Link>
          </div>
          {/* Mobile menu button */}
          <Link
            href="/editor"
            className="md:hidden px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg"
          >
            Open Editor
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-8 md:pt-28 md:pb-12 text-center relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-950/40 border border-blue-800/30 rounded-full text-sm text-blue-300 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Open source sketch engine
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Hand-drawn sketches
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              from JSON
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create beautiful hand-drawn floor plans, diagrams, and architectural
            sketches. AI-agent friendly. Fully programmable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/editor"
              className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-lg transition-all hover:shadow-xl hover:shadow-blue-600/25 hover:-translate-y-0.5"
            >
              Try it now -- it&apos;s free
            </Link>
            <Link
              href="/for-agents"
              className="w-full sm:w-auto px-10 py-4 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 font-semibold rounded-xl text-lg transition-all border border-neutral-700/50"
            >
              For AI agents
            </Link>
          </div>
        </div>
      </section>

      {/* Animated hero sketch */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <HeroSketchAnimation />
        </div>
      </section>

      {/* Live demo canvas */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm text-neutral-500 uppercase tracking-wider font-medium">
              Interactive preview
            </p>
          </div>
          <MiniCanvasDemo />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 bg-neutral-900/30 border-t border-neutral-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Everything you need
            </h2>
            <p className="text-lg text-neutral-400 max-w-xl mx-auto">
              Professional sketching tools with a hand-drawn aesthetic
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-neutral-900/80 border border-neutral-800/60 rounded-2xl p-7 transition-all hover:border-neutral-700/80 hover:bg-neutral-900"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${f.accent} rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}
                >
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
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24 border-t border-neutral-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16 tracking-tight">
            Three ways to create
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-400">
                1
              </div>
              <h3 className="text-white font-semibold mb-2">Visual Editor</h3>
              <p className="text-sm text-neutral-400">
                Point-and-click canvas with live preview and wobble controls.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-400">
                2
              </div>
              <h3 className="text-white font-semibold mb-2">JSON API</h3>
              <p className="text-sm text-neutral-400">
                POST JSON to our API and get a shareable sketch link back in milliseconds.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-400">
                3
              </div>
              <h3 className="text-white font-semibold mb-2">MCP Tool</h3>
              <p className="text-sm text-neutral-400">
                Add Skissify to Claude Desktop or any AI agent with one config line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24 bg-neutral-900/30 border-t border-neutral-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Simple pricing
            </h2>
            <p className="text-lg text-neutral-400">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Free */}
            <div className="bg-neutral-900/80 border border-neutral-800/60 rounded-2xl p-8 transition-all hover:border-neutral-700">
              <h3 className="text-xl font-bold text-white mb-2">
                {PLANS.free.name}
              </h3>
              <div className="text-4xl font-bold text-white mb-1">
                $0
              </div>
              <p className="text-sm text-neutral-500 mb-8">Free forever</p>
              <ul className="space-y-3 mb-8">
                {PLANS.free.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-neutral-300"
                  >
                    <svg className="w-4 h-4 text-green-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/editor"
                className="block text-center px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-xl transition-all"
              >
                Get started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-neutral-900/80 border-2 border-blue-600 rounded-2xl p-8 relative transition-all hover:shadow-lg hover:shadow-blue-600/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                POPULAR
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                {PLANS.pro.name}
              </h3>
              <div className="text-4xl font-bold text-white mb-1">
                &euro;5<span className="text-lg font-normal text-neutral-500">/mo</span>
              </div>
              <p className="text-sm text-neutral-500 mb-8">Billed monthly</p>
              <ul className="space-y-3 mb-8">
                {PLANS.pro.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-neutral-300"
                  >
                    <svg className="w-4 h-4 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signin"
                className="block text-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 border-t border-neutral-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to sketch?
          </h2>
          <p className="text-lg text-neutral-400 mb-10">
            Join hundreds of developers and architects creating hand-drawn diagrams with code.
          </p>
          <Link
            href="/editor"
            className="inline-flex px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-lg transition-all hover:shadow-xl hover:shadow-blue-600/25 hover:-translate-y-0.5"
          >
            Open the editor
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800/60 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
              <span className="text-sm text-neutral-500">
                Skissify -- Hand-drawn sketches from JSON.
                Built by <span className="text-neutral-400">Conzeon</span>.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <Link href="/editor" className="hover:text-white transition-colors">
                Editor
              </Link>
              <Link href="/create" className="hover:text-white transition-colors">
                Create with AI
              </Link>
              <Link href="/gallery" className="hover:text-white transition-colors">
                Gallery
              </Link>
              <Link href="/for-agents" className="hover:text-white transition-colors">
                For Agents
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
