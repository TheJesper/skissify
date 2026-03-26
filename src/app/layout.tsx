import type { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skissify — AI-Powered Hand-Drawn Sketches",
  description:
    "Create beautiful hand-drawn sketches from JSON. AI agents can draw floor plans, diagrams, and napkin sketches via MCP.",
  metadataBase: new URL("https://skissify.com"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Skissify — AI-Powered Hand-Drawn Sketches",
    description:
      "Create beautiful hand-drawn sketches from JSON. AI agents can draw floor plans, diagrams, and napkin sketches via MCP.",
    url: "https://skissify.com",
    siteName: "Skissify",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skissify — AI-Powered Hand-Drawn Sketches",
    description:
      "Create beautiful hand-drawn sketches from JSON. AI agents can draw floor plans, diagrams, and napkin sketches via MCP.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Skissify",
  url: "https://skissify.com",
  description: "AI-powered hand-drawn sketch tool",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
