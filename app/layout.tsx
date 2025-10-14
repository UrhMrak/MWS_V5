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
  const isProd = process.env.NODE_ENV === "production";
  const basePath = isProd ? "/MWS_V5" : "";
  const backgroundImageUrl = `${basePath}/images/background1.jpg`;

  return (
    <html
      lang="en"
      className="min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <body className="font-inter antialiased min-h-screen">{children}</body>
    </html>
  );
}
