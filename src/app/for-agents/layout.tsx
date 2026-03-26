import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For AI Agents | Skissify",
  description:
    "Integrate Skissify into your AI agent workflow. Draw sketches via MCP, API, or JSON — no UI needed.",
};

export default function ForAgentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
