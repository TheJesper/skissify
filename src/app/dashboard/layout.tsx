import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Sketches | Skissify",
  description: "View and manage your saved sketches.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
