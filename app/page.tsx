"use client";

import { useState, useEffect, useRef } from "react";
import Image from "../components/CustomImage";
import Navigation from "../components/Navigation";
import emailjs from "@emailjs/browser";

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
      content: {
        intro:
          "Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information in accordance with the General Data Protection Regulation (GDPR).",
        informationWeCollect: {
          title: "Information We Collect",
          text: "We only collect personal data that you voluntarily provide through our website's contact form. This typically includes your name, email address, your phone number and the content of your message. We do not collect or process any other personal information through our website.",
        },
        howWeUse: {
          title: "How We Use Your Information",
          text: "We use the information you provide solely for the purpose of responding to your inquiry. Once your email has been answered or your request addressed, your personal data (i.e., your email and message) is securely deleted and is not stored on our systems. We do not use your data for marketing purposes, nor do we share it with third parties.",
        },
        dataSecurity: {
          title: "Data Security",
          text: "We take appropriate technical and organizational measures to ensure that your personal data is handled securely and in accordance with GDPR. Your information is transmitted securely and deleted promptly after use. We do not retain your personal data longer than necessary.",
        },
        credits: {
          title: "Credits and Copyrights",
          text1:
            "All content on this website, including text, design, and layout, is created and owned by Urh Mrak. Unauthorized use or reproduction of any materials is strictly prohibited without explicit permission. The website is hosted on Bluehost hosting platform.",
        },
        contact: {
          title: "Contact Us",
          text: "If you have any questions about this Privacy Policy, please contact us at urh.mrak@gmail.com",
        },
      },
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
        "Ich erstelle pixelgenaue Websites, die die Visionen von Kreativen zum Leben erwecken — schön, mutig und voller Persönlichkeit. Jede Website, die ich gestalte, ist eine nahtlose Verbindung von schneller Performance und elegantem Benutzererlebnis, die Deine Online-Präsenz genauso beeindruckend macht wie Deine Ideen. Tauche ein, um meine Arbeit zu sehen, oder schreib mir eine Nachricht — lass uns gemeinsam etwas Großartiges erschaffen.",
      cta: "Meine Arbeiten ansehen",
    },
    about: {
      title: "Über mich",
      paragraph1:
        "Ich bin Urh und helfe Dir dabei, eine Online-Präsenz zu schaffen, die sowohl schön als auch mutig ist — eine, die Deine einzigartige Persönlichkeit einfängt und eine echte Verbindung zu Deinem Publikum und Deinen Communities schafft.",
      paragraph2:
        "Du findest mich in Island oder irgendwo in Europa, immer auf der Suche nach dem nächsten inspirierenden Projekt — sei es in der Musik oder in der Technologie. Wenn ich mich in meiner derzeitigen Heimatbasis Island befinde, umgeben von atemberaubender Naturschönheit, schätze ich auch die lebhaften, unterhaltsamen Momente auf der Bühne mit meinen Kollegen im Isländischen Sinfonieorchester.",
      paragraph3:
        "Klassische Musik und die Ruhe der Natur beflügeln meine Kreativität, während Technologie und KI mich für die Zukunft begeistern. Es ist eine einzigartige Harmonie, die ich gerne erforsche, sowohl auf der Bühne als auch am Bildschirm.",
      techTitle: "Technologien, mit denen ich arbeite",
    },
    work: {
      title: "Meine Arbeiten",
      subtitle: "Wirf einen Blick auf meine neuesten Kreationen:",
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
        "Hast Du ein Projekt im Kopf? Lass uns besprechen, wie wir zusammenarbeiten können, um Deine Ideen zum Leben zu erwecken.",
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "Deine.email@beispiel.de",
      messageLabel: "Nachricht",
      messagePlaceholder: "Erzähl mir von Deinem Projekt...",
      submitButton: "Nachricht senden",
    },
    footer: {
      copyright: "© 2025 Urh Mrak. Alle Rechte vorbehalten.",
      privacyPolicy: "Datenschutzerklärung",
    },
    privacy: {
      title: "Datenschutzerklärung",
      close: "Schließen",
      content: {
        intro:
          "Dein Datenschutz ist uns wichtig. Diese Datenschutzerklärung erläutert, wie wir Deine persönlichen Daten in Übereinstimmung mit der Datenschutz-Grundverordnung (DSGVO) sammeln, verwenden und schützen.",
        informationWeCollect: {
          title: "Informationen, die wir sammeln",
          text: "Wir sammeln nur personenbezogene Daten, die Du freiwillig über unser Kontaktformular auf der Website bereitstellst. Dazu gehören typischerweise Dein Name, Deine E-Mail-Adresse, Deine Telefonnummer und der Inhalt Deiner Nachricht. Wir sammeln oder verarbeiten keine anderen personenbezogenen Daten über unsere Website.",
        },
        howWeUse: {
          title: "Wie wir Deine Informationen verwenden",
          text: "Wir verwenden die von Dir bereitgestellten Informationen ausschließlich zum Zweck der Beantwortung Deiner Anfrage. Sobald Deine E-Mail beantwortet oder Deine Anfrage bearbeitet wurde, werden Deine personenbezogenen Daten (d.h. Deine E-Mail und Nachricht) sicher gelöscht und nicht in unseren Systemen gespeichert. Wir verwenden Deine Daten nicht für Marketingzwecke und geben sie nicht an Dritte weiter.",
        },
        dataSecurity: {
          title: "Datensicherheit",
          text: "Wir ergreifen angemessene technische und organisatorische Maßnahmen, um sicherzustellen, dass Deine personenbezogenen Daten sicher und in Übereinstimmung mit der DSGVO behandelt werden. Deine Informationen werden sicher übertragen und nach der Verwendung umgehend gelöscht. Wir speichern Deine personenbezogenen Daten nicht länger als notwendig.",
        },
        credits: {
          title: "Credits und Urheberrechte",
          text1:
            "Alle Inhalte auf dieser Website, einschließlich Text, Design und Layout, werden von Urh Mrak erstellt und sind sein Eigentum. Die unbefugte Verwendung oder Vervielfältigung von Materialien ist ohne ausdrückliche Genehmigung strengstens untersagt. Die Website wird auf der Bluehost-Hosting-Plattform gehostet.",
        },
        contact: {
          title: "Kontakt",
          text: "Wenn Du Fragen zu dieser Datenschutzerklärung hast, kontaktiere uns bitte unter urh.mrak@gmail.com",
        },
      },
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
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formMessage, setFormMessage] = useState("");
  const elementRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const t = translations[language];

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = "service_nyjf5g3";
  const EMAILJS_TEMPLATE_ID = "template_ramlvtb";
  const EMAILJS_PUBLIC_KEY = "ZLsp98_fJEVSyFYI1";

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    setFormMessage("");

    const formData = new FormData(e.currentTarget);
    const templateParams = {
      from_email: formData.get("email") || "",
      message: formData.get("message") || "",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      setFormStatus("success");
      setFormMessage(
        language === "en"
          ? "Message sent successfully!"
          : "Nachricht erfolgreich gesendet!"
      );
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setFormStatus("error");
      setFormMessage(
        language === "en"
          ? "Failed to send message. Please try again."
          : "Nachricht konnte nicht gesendet werden. Bitte versuche es erneut."
      );
    }
  };

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

      <main className="lg:pl-32 lg:pr-32">
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
                      <svg
                        className="w-8 h-8 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                      </svg>
                    </div>
                    <span className="text-charcoal font-medium">HTML</span>
                  </div>

                  {/* CSS Icon */}
                  <div className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                      </svg>
                    </div>
                    <span className="text-charcoal font-medium">CSS</span>
                  </div>

                  {/* JavaScript Icon */}
                  <div className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                    <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                      </svg>
                    </div>
                    <span className="text-charcoal font-medium">
                      JavaScript
                    </span>
                  </div>

                  {/* React Icon */}
                  <div className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                    <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-2.08-.324 23.876 23.876 0 0 0-1.552-2.774c1.1-1.333 2.313-2.18 3.594-2.18zm-9.77.02c1.288 0 2.5.846 3.6 2.18a23.876 23.876 0 0 0-1.55 2.773 23.476 23.476 0 0 0-2.082.325c-.108-.495-.195-.98-.25-1.44-.224-1.869.064-3.322.73-3.704.152-.083.333-.127.552-.128zm4.882 3.05c.455.468.91.992 1.36 1.564-.44.26-.91.56-1.4.889a23.876 23.876 0 0 0-1.356-1.564c.452-.39.91-.73 1.396-1.01zm-5.1 2.82c.28.03.56.06.84.09.4.67.85 1.35 1.36 2.03-.5.62-1.04 1.22-1.62 1.77a23.876 23.876 0 0 1-1.36-2.02c.5-.65.97-1.28 1.4-1.87zm5.1 6.93c-.45-.47-.91-.99-1.36-1.56.44-.26.91-.56 1.4-.89.44.39.9.73 1.39 1.01-.5.62-1.04 1.22-1.62 1.77.5.65.97 1.28 1.4 1.87.5-.65.97-1.28 1.4-1.87.5.62 1.04 1.22 1.62 1.77-.5.65-.97 1.28-1.4 1.87-.5-.65-.97-1.28-1.4-1.87zm4.2-2.93c.5.65.97 1.28 1.4 1.87-.5.62-1.04 1.22-1.62 1.77a23.876 23.876 0 0 1-1.36-2.02c.5-.65.97-1.28 1.4-1.87zm-4.2-2.93c-.5-.65-.97-1.28-1.4-1.87.5-.62 1.04-1.22 1.62-1.77.5.65.97 1.28 1.4 1.87zm5.1-2.82c-.5-.65-.97-1.28-1.4-1.87.5-.62 1.04-1.22 1.62-1.77.5.65.97 1.28 1.4 1.87z" />
                      </svg>
                    </div>
                    <span className="text-charcoal font-medium">React</span>
                  </div>

                  {/* Tailwind Icon */}
                  <div className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                    <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                      </svg>
                    </div>
                    <span className="text-charcoal font-medium">Tailwind</span>
                  </div>

                  {/* Node.js Icon */}
                  <div className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 ease-out">
                    <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.080-0.383 c0.585-0.203,0.703-0.250,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.185-0.047-0.268,0 L3.073,6.68C2.990,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.729-2.604,2.729c-0.508,0-0.909,0-1.425-0.247l-2.42-1.399C1.807,18.193,1.5,17.716,1.5,17.179V6.921 c0-0.535,0.307-1.018,0.792-1.249l8.795-5.082c0.485-0.23,1.258-0.23,1.743,0l8.794,5.082c0.485,0.23,0.788,0.714,0.788,1.249 v10.246c0,0.535-0.303,1.018-0.788,1.249l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.354-2.655,1.354 c-2.371,0-2.912-0.534-3.139-1.792c-0.024-0.13-0.126-0.216-0.258-0.216h-1.142c-0.141,0-0.254,0.112-0.254,0.253 c0,0.065,0.017,0.124,0.049,0.177c0.568,1.001,1.818,2.456,4.818,2.456C17.501,16.007,19.099,15.91,19.099,13.993z" />
                      </svg>
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
                    className="aspect-video w-full max-w-sm sm:max-w-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
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
                    className="absolute -bottom-4 right-2 sm:right-4 lg:-right-4 w-20 h-40 sm:w-24 sm:h-48 lg:w-28 lg:h-56 overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
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
                    className="aspect-video w-full max-w-sm sm:max-w-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
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
                    className="absolute -bottom-4 right-2 sm:right-4 lg:-right-4 w-20 h-40 sm:w-24 sm:h-48 lg:w-28 lg:h-56 overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
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
                  formRef.current = el;
                  elementRefs.current["contact-form"] = el;
                }}
                onSubmit={handleSubmit}
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

                {/* Status Message */}
                {formMessage && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      formStatus === "success"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {formMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full bg-accent text-black font-medium py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "sending"
                      ? language === "en"
                        ? "Sending..."
                        : "Wird gesendet..."
                      : t.contact.submitButton}
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
                <p>{t.privacy.content.intro}</p>

                <h3 className="text-lg font-semibold text-white mt-6 mb-2">
                  {t.privacy.content.informationWeCollect.title}
                </h3>
                <p>{t.privacy.content.informationWeCollect.text}</p>

                <h3 className="text-lg font-semibold text-white mt-6 mb-2">
                  {t.privacy.content.howWeUse.title}
                </h3>
                <p>{t.privacy.content.howWeUse.text}</p>

                <h3 className="text-lg font-semibold text-white mt-6 mb-2">
                  {t.privacy.content.dataSecurity.title}
                </h3>
                <p>{t.privacy.content.dataSecurity.text}</p>

                <h3 className="text-lg font-semibold text-white mt-6 mb-2">
                  {t.privacy.content.credits.title}
                </h3>
                <p>{t.privacy.content.credits.text1}</p>

                <h3 className="text-lg font-semibold text-white mt-6 mb-2">
                  {t.privacy.content.contact.title}
                </h3>
                <p>{t.privacy.content.contact.text}</p>
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
