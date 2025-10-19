"use client";

import { useState, useEffect } from "react";
import Image from "./CustomImage";

interface NavigationProps {
  activeSection: string;
  onNavClick: (section: string) => void;
  language: "en" | "de";
  onLanguageChange: (lang: "en" | "de") => void;
  translations: {
    home: string;
    about: string;
    work: string;
    contact: string;
  };
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavClick,
  language,
  onLanguageChange,
  translations,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for mobile sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: translations.home },
    { id: "about", label: translations.about },
    { id: "work", label: translations.work },
    { id: "contact", label: translations.contact },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/UrhMrak",
      icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/urh-mrak-bb6799ba/",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/urhmrak/",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
  ];

  return (
    <>
      {/* Desktop Navigation - Left Side */}
      <nav
        className="hidden lg:flex fixed left-0 top-0 h-full w-32 flex-col items-center justify-center z-40"
        style={{ backgroundColor: "#000000" }}
      >
        {/* Language Selector */}
        <div className="absolute top-8 flex flex-col space-y-2">
          <div className="flex items-center space-x-1 text-xs font-medium text-charcoal">
            <button
              onClick={() => onLanguageChange("en")}
              className={`transition-colors duration-300 cursor-pointer ${
                language === "en"
                  ? "text-accent"
                  : "text-charcoal hover:text-accent"
              }`}
            >
              EN
            </button>
            <span className="text-medium-gray">I</span>
            <button
              onClick={() => onLanguageChange("de")}
              className={`transition-colors duration-300 cursor-pointer ${
                language === "de"
                  ? "text-accent"
                  : "text-charcoal hover:text-accent"
              }`}
            >
              DE
            </button>
          </div>
        </div>

        {/* Main Navigation Items */}
        <div className="flex flex-col space-y-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="relative group flex flex-col items-center space-y-2 text-charcoal hover:text-accent transition-colors duration-300"
            >
              <span
                className={`text-xs font-medium tracking-wider transition-colors duration-300 ${
                  activeSection === item.id ? "text-accent" : ""
                }`}
              >
                <span
                  className={`inline-block transition-all duration-300 ease-in-out transform ${
                    activeSection === item.id
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2 opacity-0"
                  }`}
                >
                  —&nbsp;&nbsp;
                </span>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Social Links */}
        <div className="absolute bottom-8 flex flex-col space-y-4">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal hover:text-accent transition-colors duration-300 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ width: "20px", height: "20px" }}
              >
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation - Sticky Top */}
      <nav
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-sm" : ""
        }`}
        style={{
          backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.5)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo_black.png"
                alt="MRAK Logo"
                width={32}
                height={32}
                className="object-contain brightness-0 invert"
                priority
              />
            </div>

            {/* Navigation Items */}
            <div className="flex space-x-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  className={`relative text-[10px] font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-accent"
                      : "text-charcoal hover:text-accent"
                  }`}
                >
                  <span
                    className={`inline-block transition-all duration-300 ease-in-out transform ${
                      activeSection === item.id
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
                    }`}
                  >
                    —&nbsp;&nbsp;
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Language Selector - Bottom Right Corner */}
      <div
        className="lg:hidden fixed bottom-4 right-4 z-50 px-3 py-2 rounded-lg backdrop-blur-sm"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <div className="flex items-center space-x-1 text-xs font-medium">
          <button
            onClick={() => onLanguageChange("en")}
            className={`transition-colors duration-300 ${
              language === "en"
                ? "text-accent"
                : "text-charcoal hover:text-accent"
            }`}
          >
            EN
          </button>
          <span className="text-medium-gray">I</span>
          <button
            onClick={() => onLanguageChange("de")}
            className={`transition-colors duration-300 ${
              language === "de"
                ? "text-accent"
                : "text-charcoal hover:text-accent"
            }`}
          >
            DE
          </button>
        </div>
      </div>

      {/* Mobile Spacer */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default Navigation;
