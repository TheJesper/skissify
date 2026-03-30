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
    <div className="min-h-screen" style={{ backgroundColor: "#fdf6e3" }}>
      {/* Header */}
      <header className="border-b border-[#93a1a1]/20 px-6 py-4">
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
                className="text-[#268bd2]"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
              <span className="text-lg font-bold text-[#073642]">
                Skiss<span className="text-[#268bd2]">ify</span>
              </span>
            </a>
            <span className="text-[#93a1a1]">/</span>
            <span className="text-[#586e75] font-medium">{sketch.title}</span>
          </div>
          <div className="flex items-center gap-3">
            {sketch.user && (
              <div className="flex items-center gap-2 text-sm text-[#657b83]">
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
              className="px-4 py-2 bg-[#268bd2] hover:bg-[#268bd2]/80 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Fork this sketch
            </a>
          </div>
        </div>
      </header>

      {/* Canvas */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <PublicSketchView data={sketchData} slug={sketch.slug} title={sketch.title} />
        <p className="text-center text-[#839496] text-sm mt-6">
          Created with{" "}
          <a href="/" className="text-[#268bd2] hover:text-[#268bd2]/80">
            Skissify
          </a>
        </p>
      </main>
    </div>
  );
}
