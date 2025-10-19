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
  const backgroundImageUrl = "/images/background1.jpg";

  return (
    <html lang="en" className="min-h-screen">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function setViewportHeight() {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', vh + 'px');
              }
              setViewportHeight();
              window.addEventListener('resize', setViewportHeight);
              window.addEventListener('orientationchange', setViewportHeight);
            `,
          }}
        />
      </head>
      <body className="font-inter antialiased min-h-screen">
        {/* Fixed background div that works on mobile */}
        <div
          className="fixed-background"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
