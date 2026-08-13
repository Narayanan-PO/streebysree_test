import type { Metadata } from "next";
import "./globals.css";

// This metadata helps with SEO and what shows up on Google!
export const metadata: Metadata = {
  title: "StreebySree | Premium Everyday Jewellery",
  description: "Beautiful, minimal, and premium everyday jewellery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        {/* The 'children' below represents whatever page we are currently looking at (like Homepage or Admin) */}
        {children}
      </body>
    </html>
  );
}