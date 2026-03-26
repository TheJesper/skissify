"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";

interface SketchSummary {
  id: string;
  slug: string;
  title: string;
  public: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sketches, setSketches] = useState<SketchSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [titleDraft, setTitleDraft] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/sketches")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSketches(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [status]);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this sketch?")) return;
    const res = await fetch(`/api/sketches/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setSketches((prev) => prev.filter((s) => s.slug !== slug));
    }
  };

  const handleTogglePublic = async (slug: string, isPublic: boolean) => {
    const res = await fetch(`/api/sketches/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public: !isPublic }),
    });
    if (res.ok) {
      setSketches((prev) =>
        prev.map((s) => (s.slug === slug ? { ...s, public: !isPublic } : s))
      );
    }
  };

  const handleRename = async (slug: string) => {
    if (!titleDraft.trim()) return;
    const res = await fetch(`/api/sketches/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titleDraft.trim() }),
    });
    if (res.ok) {
      setSketches((prev) =>
        prev.map((s) =>
          s.slug === slug ? { ...s, title: titleDraft.trim() } : s
        )
      );
      setEditingTitle(null);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
              <span className="text-lg font-bold text-white">
                Skiss<span className="text-blue-400">ify</span>
              </span>
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300 font-medium">My Sketches</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/editor"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              New Sketch
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {sketches.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-xl font-semibold text-white mb-2">
              No sketches yet
            </h2>
            <p className="text-neutral-400 mb-6">
              Create your first sketch to get started
            </p>
            <Link
              href="/editor"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
            >
              Create Sketch
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sketches.map((s) => (
              <div
                key={s.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden group"
              >
                {/* Thumbnail placeholder */}
                <Link href={`/editor?edit=${s.slug}`}>
                  <div className="aspect-video bg-neutral-800 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-750 transition-colors cursor-pointer">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="opacity-30"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                  </div>
                </Link>

                <div className="p-4">
                  {editingTitle === s.slug ? (
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        value={titleDraft}
                        onChange={(e) => setTitleDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRename(s.slug);
                          if (e.key === "Escape") setEditingTitle(null);
                        }}
                        className="flex-1 bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-sm text-white"
                        autoFocus
                      />
                      <button
                        onClick={() => handleRename(s.slug)}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <h3
                      className="text-white font-medium mb-1 cursor-pointer hover:text-blue-400 transition-colors"
                      onClick={() => {
                        setEditingTitle(s.slug);
                        setTitleDraft(s.title);
                      }}
                    >
                      {s.title}
                    </h3>
                  )}

                  <p className="text-xs text-neutral-500 mb-3">
                    Updated{" "}
                    {new Date(s.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePublic(s.slug, s.public)}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        s.public
                          ? "bg-green-900/30 text-green-400 hover:bg-green-900/50"
                          : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                      }`}
                    >
                      {s.public ? "Public" : "Private"}
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/s/${s.slug}`
                        );
                      }}
                      className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 rounded text-xs transition-colors"
                    >
                      Copy Link
                    </button>
                    <div className="flex-1" />
                    <button
                      onClick={() => handleDelete(s.slug)}
                      className="px-2 py-1 text-red-400 hover:bg-red-900/30 rounded text-xs transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
