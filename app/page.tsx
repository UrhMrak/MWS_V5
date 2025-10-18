"use client";

import { useState, useEffect, useRef } from "react";
import Image from "../components/CustomImage";
import Navigation from "../components/Navigation";

// Translation object
const translations = {
  en: {
    nav: {
      home: "HOME",
      about: "ABOUT ME",
      work: "PROJECTS",
      contact: "CONTACT",
    },
    home: {
      greeting: "Hi, I am Urh Mrak!",
      description:
        "I craft pixel-perfect websites that bring creatives' visions to life — beautiful, bold, and bursting with personality. Every site I design is a seamless blend of speedy performance and elegant user experience, making your online presence as stunning as your ideas. Dive in to see my work or drop me a line, and let's make something amazing together.",
      cta: "View My Work",
    },
    about: {
      title: "About Me",
      paragraph1:
        "I'm Urh, and I'm here to help you create an online presence that's both beautiful and bold — one that captures your unique personality and forges a genuine connection with your audiences and communities.",
      paragraph2:
        "You can find me in Iceland or somewhere across Europe, always on the lookout for the next inspiring project — whether it's in music or technology. When I find myself in my current home base, Iceland, surrounded by breathtaking natural beauty, I also treasure the lively, fun moments shared on stage with my colleagues in the Iceland Symphony Orchestra.",
      paragraph3:
        "Classical music and the serenity of nature fuel my creativity, while technology and AI keep me excited about the future. It's a unique harmony I love exploring, both on stage and on screen.",
      techTitle: "Technologies I Work With",
    },
    work: {
      title: "My Work",
      subtitle: "Have a look at my recent creations:",
      project1Title: "Suzuki Early Music Education Classes for the youngest",
      project1Description:
        "The Suzuki Early Childhood Education Reykjavik website showcases a joyful and nurturing music program for babies and parents, inspired by the Suzuki Method. It highlights the unique teaching approach, class details, and the passionate instructor, creating a warm invitation for families to discover the benefits of early musical development. The site reflects the program's focus on creativity, growth, and community in a visually inviting way.",
      project2Title: "Urh Mrak - Cellist",
      project2Description:
        "An artistic portrayal of my journey as a cellist. This clean and elegant website highlights select media, shares my biography, and offers an inviting space for people to get in touch with me.",
    },
    contact: {
      title: "Get in Touch",
      subtitle:
        "Have a project in mind? Let's discuss how we can work together to bring your ideas to life.",
      emailLabel: "Email Address",
      emailPlaceholder: "your.email@example.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project...",
      submitButton: "Send Message",
    },
    footer: {
      copyright: "© 2025 Urh Mrak. All rights reserved.",
      privacyPolicy: "Privacy Policy",
    },
    privacy: {
      title: "Privacy Policy",
      close: "Close",
    },
  },
  de: {
    nav: {
      home: "HOME",
      about: "ÜBER MICH",
      work: "PROJEKTE",
      contact: "KONTAKT",
    },
    home: {
      greeting: "Hallo, ich bin Urh Mrak!",
      description:
        "Ich erstelle pixelgenaue Websites, die die Visionen von Kreativen zum Leben erwecken — schön, mutig und voller Persönlichkeit. Jede Website, die ich gestalte, ist eine nahtlose Verbindung von schneller Performance und elegantem Benutzererlebnis, die Ihre Online-Präsenz genauso beeindruckend macht wie Ihre Ideen. Tauchen Sie ein, um meine Arbeit zu sehen, oder schreiben Sie mir eine Nachricht — lassen Sie uns gemeinsam etwas Großartiges erschaffen.",
      cta: "Meine Arbeiten ansehen",
    },
    about: {
      title: "Über mich",
      paragraph1:
        "Ich bin Urh und helfe Ihnen dabei, eine Online-Präsenz zu schaffen, die sowohl schön als auch mutig ist — eine, die Ihre einzigartige Persönlichkeit einfängt und eine echte Verbindung zu Ihrem Publikum und Ihren Communities schafft.",
      paragraph2:
        "Sie finden mich in Island oder irgendwo in Europa, immer auf der Suche nach dem nächsten inspirierenden Projekt — sei es in der Musik oder in der Technologie. Wenn ich mich in meiner derzeitigen Heimatbasis Island befinde, umgeben von atemberaubender Naturschönheit, schätze ich auch die lebhaften, unterhaltsamen Momente auf der Bühne mit meinen Kollegen im Isländischen Sinfonieorchester.",
      paragraph3:
        "Klassische Musik und die Ruhe der Natur beflügeln meine Kreativität, während Technologie und KI mich für die Zukunft begeistern. Es ist eine einzigartige Harmonie, die ich gerne erforsche, sowohl auf der Bühne als auch am Bildschirm.",
      techTitle: "Technologien, mit denen ich arbeite",
    },
    work: {
      title: "Meine Arbeiten",
      subtitle: "Werfen Sie einen Blick auf meine neuesten Kreationen:",
      project1Title: "Suzuki Frühe Musikerziehung für die Kleinsten",
      project1Description:
        "Die Website der Suzuki Early Childhood Education Reykjavik präsentiert ein freudiges und förderndes Musikprogramm für Babys und Eltern, inspiriert von der Suzuki-Methode. Sie hebt den einzigartigen Unterrichtsansatz, Kursdetails und die leidenschaftliche Lehrerin hervor und schafft eine herzliche Einladung für Familien, die Vorteile der frühen musikalischen Entwicklung zu entdecken. Die Website spiegelt den Fokus des Programms auf Kreativität, Wachstum und Gemeinschaft auf visuell ansprechende Weise wider.",
      project2Title: "Urh Mrak - Cellist",
      project2Description:
        "Eine künstlerische Darstellung meiner Reise als Cellist. Diese klare und elegante Website präsentiert ausgewählte Medien, teilt meine Biografie und bietet einen einladenden Raum für Menschen, mit mir in Kontakt zu treten.",
    },
    contact: {
      title: "Kontakt aufnehmen",
      subtitle:
        "Haben Sie ein Projekt im Kopf? Lassen Sie uns besprechen, wie wir zusammenarbeiten können, um Ihre Ideen zum Leben zu erwecken.",
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "ihre.email@beispiel.de",
      messageLabel: "Nachricht",
      messagePlaceholder: "Erzählen Sie mir von Ihrem Projekt...",
      submitButton: "Nachricht senden",
    },
    footer: {
      copyright: "© 2025 Urh Mrak. Alle Rechte vorbehalten.",
      privacyPolicy: "Datenschutzerklärung",
    },
    privacy: {
      title: "Datenschutzerklärung",
      close: "Schließen",
    },
  },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [visibleElements, setVisibleElements] = useState<Set<string>>(
    new Set()
  );
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [language, setLanguage] = useState<"en" | "de">("en");
  const elementRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const t = translations[language];

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Scroll detection with throttling to prevent flickering
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ["home", "about", "work", "contact"];
          const scrollPosition = window.scrollY + window.innerHeight / 3; // Use 1/3 instead of 1/2

          let currentSection = "home";
          let minDistance = Infinity;

          sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const elementTop = rect.top + window.scrollY;
              const elementCenter = elementTop + rect.height / 2;
              const distance = Math.abs(scrollPosition - elementCenter);

              if (distance < minDistance) {
                minDistance = distance;
                currentSection = sectionId;
              }
            }
          });

          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial active section
    setActiveSection("home");

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation observer for elements coming into viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute("data-animate-id");
            if (elementId) {
              setVisibleElements((prev) => new Set([...prev, elementId]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all elements with data-animate-id
    const elements = Object.values(elementRefs.current);
    for (const element of elements) {
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
        }}
      />
      <div
        className="custom-cursor-trail"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
        }}
      />

      <Navigation
        activeSection={activeSection}
        onNavClick={scrollToSection}
        language={language}
        onLanguageChange={setLanguage}
        translations={t.nav}
      />

      <main className="lg:pl-32">
        {/* Home Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-4 lg:px-16"
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="space-y-6">
              {/* Logo */}
              <div
                ref={(el) => {
                  elementRefs.current["logo"] = el;
                }}
                data-animate-id="logo"
                className={`flex justify-center mb-8 transition-all duration-700 ease-out ${
                  visibleElements.has("logo")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Image
                  src="/images/logo_black.png"
                  alt="MRAK Logo"
                  width={300}
                  height={300}
                  className="object-contain brightness-0 invert lg:w-[350px] lg:h-[350px]"
                  priority
                />
              </div>
              <h2
                ref={(el) => {
                  elementRefs.current["title"] = el;
                }}
                data-animate-id="title"
                className={`text-2xl lg:text-3xl font-medium text-accent mb-6 transition-all duration-700 ease-out delay-100 ${
                  visibleElements.has("title")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {t.home.greeting}
              </h2>
              <p
                ref={(el) => {
                  elementRefs.current["description"] = el;
                }}
                data-animate-id="description"
                className={`text-lg lg:text-xl text-dark-gray max-w-2xl mx-auto leading-relaxed transition-all duration-700 ease-out delay-200 ${
                  visibleElements.has("description")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {t.home.description}
              </p>

              {/* Call to action */}
              <div
                ref={(el) => {
                  elementRefs.current["button"] = el;
                }}
                data-animate-id="button"
                className={`pt-8 transition-all duration-700 ease-out delay-300 ${
                  visibleElements.has("button")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <button
                  onClick={() => scrollToSection("work")}
                  className="inline-flex items-center px-8 py-4 bg-charcoal text-cream font-medium rounded-lg hover:bg-navy transition-colors duration-300"
                >
                  {t.home.cta}
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section
          id="about"
          className="min-h-screen flex items-center px-4 lg:px-16 py-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-6">
                <h2
                  ref={(el) => {
                    elementRefs.current["about-title"] = el;
                  }}
                  data-animate-id="about-title"
                  className={`text-4xl lg:text-5xl font-bold text-charcoal mb-8 transition-all duration-700 ease-out ${
                    visibleElements.has("about-title")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {t.about.title}
                </h2>

                <div
                  ref={(el) => {
                    elementRefs.current["about-text"] = el;
                  }}
                  data-animate-id="about-text"
                  className={`space-y-4 text-dark-gray leading-relaxed transition-all duration-700 ease-out delay-100 ${
                    visibleElements.has("about-text")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <p>{t.about.paragraph1}</p>
                  <p>{t.about.paragraph2}</p>
                  <p>{t.about.paragraph3}</p>
                </div>
              </div>

              {/* Tech Icons */}
              <div
                ref={(el) => {
                  elementRefs.current["tech-section"] = el;
                }}
                data-animate-id="tech-section"
                className={`flex flex-col items-center justify-center space-y-8 transition-all duration-700 ease-out delay-200 ${
                  visibleElements.has("tech-section")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h3 className="text-2xl font-semibold text-charcoal mb-8">
                  {t.about.techTitle}
                </h3>

                <div className="grid grid-cols-2 gap-8">
                  {/* HTML Icon */}
                  <div className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                    <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        &lt;/&gt;
                      </span>
                    </div>
                    <span className="text-charcoal font-medium">HTML</span>
                  </div>

                  {/* CSS Icon */}
                  <div className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">#</span>
                    </div>
                    <span className="text-charcoal font-medium">CSS</span>
                  </div>

                  {/* JavaScript Icon */}
                  <div className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                    <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">JS</span>
                    </div>
                    <span className="text-charcoal font-medium">
                      JavaScript
                    </span>
                  </div>

                  {/* React Icon */}
                  <div className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                    <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">⚛</span>
                    </div>
                    <span className="text-charcoal font-medium">React</span>
                  </div>

                  {/* Tailwind Icon */}
                  <div className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                    <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">T</span>
                    </div>
                    <span className="text-charcoal font-medium">Tailwind</span>
                  </div>

                  {/* Node.js Icon */}
                  <div className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                    <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">N</span>
                    </div>
                    <span className="text-charcoal font-medium">Node.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* My Work Section */}
        <section
          id="work"
          className="min-h-screen flex items-center px-4 lg:px-16 py-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                ref={(el) => {
                  elementRefs.current["work-title"] = el;
                }}
                data-animate-id="work-title"
                className={`text-4xl lg:text-5xl font-bold text-charcoal mb-6 transition-all duration-700 ease-out ${
                  visibleElements.has("work-title")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {t.work.title}
              </h2>
              <p
                ref={(el) => {
                  elementRefs.current["work-subtitle"] = el;
                }}
                data-animate-id="work-subtitle"
                className={`text-xl text-dark-gray max-w-3xl mx-auto transition-all duration-700 ease-out delay-100 ${
                  visibleElements.has("work-subtitle")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {t.work.subtitle}
              </p>
            </div>

            <div className="space-y-16">
              {/* Project 1 */}
              <div
                ref={(el) => {
                  elementRefs.current["project1"] = el;
                }}
                data-animate-id="project1"
                className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out delay-200 ${
                  visibleElements.has("project1")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-charcoal">
                    {t.work.project1Title}
                  </h3>
                  <p className="text-dark-gray leading-relaxed">
                    {t.work.project1Description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4"></div>
                </div>
                <div className="flex justify-center lg:justify-end relative">
                  <a
                    href="https://suzukiece-reykjavik.is/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-video w-full max-w-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
                  >
                    <Image
                      src="/images/suzukiece.png"
                      alt="Suzuki Early Childhood Education Reykjavik Website"
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </a>

                  {/* Phone Screenshot Overlay */}
                  <a
                    href="https://suzukiece-reykjavik.is/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute -bottom-4 -right-4 w-24 h-48 lg:w-28 lg:h-56 overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <Image
                      src="/images/suzukiecePhone.png"
                      alt="Suzuki Early Childhood Education Mobile Website"
                      width={112}
                      height={224}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
              </div>

              {/* Project 2 */}
              <div
                ref={(el) => {
                  elementRefs.current["project2"] = el;
                }}
                data-animate-id="project2"
                className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out delay-300 ${
                  visibleElements.has("project2")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-charcoal">
                    {t.work.project2Title}
                  </h3>
                  <p className="text-dark-gray leading-relaxed">
                    {t.work.project2Description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4"></div>
                </div>
                <div className="flex justify-center lg:justify-end relative">
                  <a
                    href="https://urh-mrak.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-video w-full max-w-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
                  >
                    <Image
                      src="/images/urhmrak.png"
                      alt="Urh Mrak Cellist Website"
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </a>

                  {/* Phone Screenshot Overlay */}
                  <a
                    href="https://urh-mrak.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute -bottom-4 -right-4 w-24 h-48 lg:w-28 lg:h-56 overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <Image
                      src="/images/urhmrakPhone.png"
                      alt="Urh Mrak Cellist Mobile Website"
                      width={112}
                      height={224}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center px-4 lg:px-16 py-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                ref={(el) => {
                  elementRefs.current["contact-title"] = el;
                }}
                data-animate-id="contact-title"
                className={`text-4xl lg:text-5xl font-bold text-charcoal mb-6 transition-all duration-700 ease-out ${
                  visibleElements.has("contact-title")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {t.contact.title}
              </h2>
              <p
                ref={(el) => {
                  elementRefs.current["contact-subtitle"] = el;
                }}
                data-animate-id="contact-subtitle"
                className={`text-xl text-dark-gray max-w-3xl mx-auto transition-all duration-700 ease-out delay-100 ${
                  visibleElements.has("contact-subtitle")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {t.contact.subtitle}
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <form
                ref={(el) => {
                  elementRefs.current["contact-form"] = el;
                }}
                data-animate-id="contact-form"
                className={`space-y-6 transition-all duration-700 ease-out delay-200 ${
                  visibleElements.has("contact-form")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    {t.contact.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-[#000000] lg:bg-transparent text-charcoal placeholder-medium-gray transition-all duration-300"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-[#000000] lg:bg-transparent text-charcoal placeholder-medium-gray resize-none transition-all duration-300"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-accent text-black font-medium py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
                  >
                    {t.contact.submitButton}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center space-x-4">
            {/* Copyright */}
            <span className="text-white text-[10px]">{t.footer.copyright}</span>
            <span className="text-white/50 text-[10px]">•</span>
            {/* Privacy Policy Button */}
            <button
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-white hover:text-white/80 text-[10px] underline transition-colors duration-300"
            >
              {t.footer.privacyPolicy}
            </button>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="bg-black border border-gray-700 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {t.privacy.title}
                </h2>
                <button
                  onClick={() => setShowPrivacyPolicy(false)}
                  className="text-white hover:text-white/80 transition-colors duration-300 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4 text-white leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt.
                </p>
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowPrivacyPolicy(false)}
                  className="bg-accent text-black px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors duration-300"
                >
                  {t.privacy.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
