import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create with AI | Skissify",
  description:
    "Describe what you want to sketch and let AI generate hand-drawn floor plans, diagrams, and napkin sketches.",
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
