import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sketch Editor | Skissify",
  description:
    "Edit hand-drawn sketches in real-time. Drag, resize, and style elements with a live canvas editor.",
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
