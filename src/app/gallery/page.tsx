import { Metadata } from "next";
import Link from "next/link";
import { presets, presetDescriptions } from "@/lib/presets";
import { PAPER_COLORS, PaperType } from "@/lib/types";
import GalleryCard from "./GalleryCard";

export const metadata: Metadata = {
  title: "Gallery -- Skissify",
  description:
    "Browse hand-drawn sketch presets: floor plans, flowcharts, blueprints, garden plans, and more. Click to open in the editor.",
  openGraph: {
    title: "Skissify Gallery",
    description:
      "Hand-drawn sketch presets -- floor plans, flowcharts, blueprints, and more.",
  },
};

export default function GalleryPage() {
  const presetNames = Object.keys(presets);

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Nav */}
      <nav className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
              href="/gallery"
              className="text-sm text-white font-medium transition-colors"
            >
              Gallery
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Preset Gallery
        </h1>
        <p className="text-lg text-neutral-400 max-w-xl mx-auto">
          Browse hand-drawn sketch presets. Click any card to open it in the
          editor and start customizing.
        </p>
      </section>

      {/* Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {presetNames.map((name) => {
            const preset = presets[name];
            const bg = PAPER_COLORS[preset.paper as PaperType] || "#f5f0e0";
            const desc =
              presetDescriptions[name] || "A Skissify preset sketch.";

            return (
              <GalleryCard
                key={name}
                name={name}
                description={desc}
                paperColor={bg}
                tool={preset.tool}
                paper={preset.paper}
              />
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 text-center">
        <div className="max-w-md mx-auto bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            Create your own
          </h2>
          <p className="text-neutral-400 mb-6 text-sm">
            Start from scratch or fork any preset above. Define elements as
            JSON, adjust the hand-drawn style, and export or share.
          </p>
          <Link
            href="/editor"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Open Editor
          </Link>
        </div>
      </section>
    </div>
  );
}
