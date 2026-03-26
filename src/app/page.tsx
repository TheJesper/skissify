import Link from "next/link";
import { PLANS } from "@/lib/stripe";

const features = [
  {
    title: "Hand-drawn Style",
    description:
      "Organic wobble algorithms make every line look naturally sketched. Adjust amplitude, waves, and humanness.",
    icon: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",
  },
  {
    title: "JSON-powered",
    description:
      "Define sketches as JSON. Perfect for AI agents, programmatic generation, and version control.",
    icon: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  },
  {
    title: "Floor Plans",
    description:
      "Doors, windows, stairs, dimensions, columns -- all the architectural elements you need.",
    icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  },
  {
    title: "Multiple Paper Types",
    description:
      "Cream, white, yellow pad, and blueprint. Each with its own grid and color scheme.",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
  },
  {
    title: "Save & Share",
    description:
      "Save sketches to the cloud, get shareable links, and collaborate with others.",
    icon: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  },
  {
    title: "Export & Print",
    description:
      "Export as PNG, print directly, or use the public share page for embedding.",
    icon: "M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Nav */}
      <nav className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/editor"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Editor
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/auth/signin"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Hand-drawn sketches
            <br />
            <span className="text-blue-400">from JSON</span>
          </h1>
          <p className="text-xl text-neutral-400 mb-10 max-w-xl mx-auto">
            Create beautiful hand-drawn style floor plans, diagrams, and
            sketches. AI-agent friendly, fully programmable.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/editor"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-lg transition-colors"
            >
              Try it free
            </Link>
            <Link
              href="#features"
              className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold rounded-lg text-lg transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* Demo preview */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-2 shadow-2xl">
            <div className="bg-neutral-800 rounded-lg p-8 text-center text-neutral-500 text-sm">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <p className="font-mono text-xs text-neutral-600 mb-6">
                {`{ "paper": "cream", "tool": "ballpoint", "elements": [...] }`}
              </p>
              <svg
                viewBox="0 0 600 300"
                className="w-full max-w-lg mx-auto text-neutral-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="50" y="30" width="150" height="100" rx="2" opacity="0.5" />
                <rect x="250" y="30" width="150" height="100" rx="2" opacity="0.5" />
                <line x1="200" y1="80" x2="250" y2="80" opacity="0.5" />
                <polygon points="245,75 255,80 245,85" fill="currentColor" opacity="0.3" />
                <text x="90" y="85" fontSize="14" fill="currentColor" opacity="0.6">
                  Frontend
                </text>
                <text x="290" y="85" fontSize="14" fill="currentColor" opacity="0.6">
                  Backend
                </text>
                <circle cx="325" cy="220" r="45" opacity="0.4" />
                <text x="308" y="225" fontSize="14" fill="currentColor" opacity="0.6">
                  DB
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Everything you need
          </h2>
          <p className="text-neutral-400 text-center mb-16 max-w-xl mx-auto">
            Professional sketching tools with a hand-drawn aesthetic
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6"
              >
                <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
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

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Simple pricing
          </h2>
          <p className="text-neutral-400 text-center mb-16">
            Start free, upgrade when you need more
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Free */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-2">
                {PLANS.free.name}
              </h3>
              <div className="text-3xl font-bold text-white mb-6">
                $0<span className="text-sm font-normal text-neutral-500">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {PLANS.free.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-neutral-300"
                  >
                    <span className="text-green-400">+</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/editor"
                className="block text-center px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors"
              >
                Get started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-neutral-900 border-2 border-blue-600 rounded-xl p-8 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                POPULAR
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                {PLANS.pro.name}
              </h3>
              <div className="text-3xl font-bold text-white mb-6">
                EUR5<span className="text-sm font-normal text-neutral-500">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {PLANS.pro.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-neutral-300"
                  >
                    <span className="text-blue-400">+</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signin"
                className="block text-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-neutral-500">
          <span>Skissify -- Hand-drawn sketches from JSON</span>
          <div className="flex items-center gap-4">
            <Link href="/editor" className="hover:text-white transition-colors">
              Editor
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
