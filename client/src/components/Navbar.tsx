import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#blog", label: "Blog" },
  { href: "#contato", label: "Contato" },
  { href: "#localizacao", label: "Localização" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, navigate] = useLocation();

  const isOnBlogPost = location.startsWith("/blog/");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      if (isOnBlogPost) {
        // Navigate to home first, then scroll to section
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOnBlogPost
          ? "bg-[oklch(97%_0.015_85)]/95 backdrop-blur-md shadow-sm border-b border-[oklch(85%_0.015_240)]"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Dr. Bruno Mioto – Cardiologista, voltar para a página inicial"
          >
            <img
              src="/logo.png"
              alt="Logo Dr. Bruno Mioto – Medicina e Cardiologia"
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm tracking-wide transition-colors hover:text-[oklch(38%_0.12_240)] cursor-pointer"
                style={{
                  color: "var(--ink-light)",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button + Instagram */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://instagram.com/brunomioto.cardiologista"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Dr. Bruno Mioto – @brunomioto.cardiologista"
              title="Instagram @brunomioto.cardiologista"
              className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
              style={{ color: "var(--ink-light)" }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <button
              onClick={() => handleNavClick("#agendamento")}
              className="px-5 py-2 text-sm font-medium tracking-wide text-white rounded-sm transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "var(--medical-blue)",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              Agendar Consulta
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-sm"
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: "var(--ink)" }}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: "var(--cream)",
            borderColor: "var(--border-fine)",
          }}
        >
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-sm py-2 tracking-wide transition-colors hover:text-[oklch(38%_0.12_240)]"
                style={{
                  color: "var(--ink-light)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#agendamento")}
              className="mt-2 px-5 py-2.5 text-sm font-medium text-white rounded-sm"
              style={{ background: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
            >
              Agendar Consulta
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
