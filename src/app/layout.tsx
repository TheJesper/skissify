import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skissify - Hand-drawn sketches from JSON",
  description:
    "Create beautiful hand-drawn style sketches and floor plans using JSON. AI-agent friendly.",
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
