import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Metadata } from "next";
import PublicSketchView from "./PublicSketchView";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sketch = await db.sketch.findUnique({
    where: { slug },
    select: { title: true, public: true },
  });

  if (!sketch || !sketch.public) {
    return { title: "Sketch not found" };
  }

  return {
    title: `${sketch.title} - Skissify`,
    description: `A hand-drawn sketch created with Skissify`,
    openGraph: {
      title: `${sketch.title} - Skissify`,
      description: "Hand-drawn sketch created with Skissify",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${sketch.title} - Skissify`,
    },
  };
}

export default async function PublicSketchPage({ params }: Props) {
  const { slug } = await params;
  const sketch = await db.sketch.findUnique({
    where: { slug },
    include: { user: { select: { name: true, image: true } } },
  });

  if (!sketch || !sketch.public) {
    notFound();
  }

  const sketchData = JSON.parse(sketch.data);

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2">
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
                <path d="m15 5 4 4" />
              </svg>
              <span className="text-lg font-bold text-white">
                Skiss<span className="text-blue-400">ify</span>
              </span>
            </a>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300 font-medium">{sketch.title}</span>
          </div>
          <div className="flex items-center gap-3">
            {sketch.user && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                {sketch.user.image && (
                  <img
                    src={sketch.user.image}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>{sketch.user.name}</span>
              </div>
            )}
            <a
              href={`/editor?fork=${slug}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Fork this sketch
            </a>
          </div>
        </div>
      </header>

      {/* Canvas */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <PublicSketchView data={sketchData} />
        <p className="text-center text-neutral-500 text-sm mt-6">
          Created with{" "}
          <a href="/" className="text-blue-400 hover:text-blue-300">
            Skissify
          </a>
        </p>
      </main>
    </div>
  );
}
