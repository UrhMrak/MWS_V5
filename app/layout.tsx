import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MRAK Web Studios - Portfolio",
  description:
    "Modern web development portfolio showcasing skills and previous work",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="font-inter antialiased min-h-screen">{children}</body>
    </html>
  );
}
