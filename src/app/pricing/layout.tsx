import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Skissify",
  description:
    "Simple pricing for Skissify. Free tier available. Upgrade for more sketches, higher resolution, and API access.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
