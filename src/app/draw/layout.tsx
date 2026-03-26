import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Sketch | Skissify",
  description:
    "View a hand-drawn sketch. Minimal full-screen viewer for shared Skissify sketches.",
};

export default function DrawLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
