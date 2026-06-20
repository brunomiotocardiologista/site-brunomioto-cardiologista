import { Instagram, Phone, MapPin, Clock } from "lucide-react";
import { useLocation } from "wouter";

export default function Footer() {
  const [location, navigate] = useLocation();
  const isOnBlogPost = location.startsWith("/blog/");

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      if (isOnBlogPost) {
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
    <footer style={{ background: "var(--navy)", color: "oklch(90% 0.01 240)" }}>
      {/* Top border line */}
      <div style={{ height: "1px", background: "oklch(38% 0.12 240)" }} />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Logo Dr. Bruno Mioto – Medicina e Cardiologia"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(70% 0.03 240)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
              "Só se vê bem com o coração, o essencial é invisível aos olhos."
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/brunomioto.cardiologista"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do Dr. Bruno Mioto – @brunomioto.cardiologista"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ background: "oklch(30% 0.08 240)" }}
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://wa.me/5511945556605"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ background: "oklch(30% 0.08 240)" }}
              >
                <svg className="w-4 h-4 text-white fill-white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase mb-5 font-medium" style={{ color: "oklch(65% 0.04 240)", fontFamily: "'Inter', sans-serif" }}>
              Navegação
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Sobre o Dr. Bruno", href: "#sobre" },
                { label: "Serviços", href: "#servicos" },
                { label: "Agendamento", href: "#agendamento" },
                { label: "Blog", href: "#blog" },
                { label: "Contato", href: "#contato" },
                { label: "Localização", href: "#localizacao" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm transition-colors hover:text-white"
                  style={{ color: "oklch(70% 0.03 240)", fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase mb-5 font-medium" style={{ color: "oklch(65% 0.04 240)", fontFamily: "'Inter', sans-serif" }}>
              Contato
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--medical-blue-light)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "oklch(70% 0.03 240)", fontFamily: "'Inter', sans-serif" }}>
                  R. Oscar Freire, 2250 Conj. 115<br />
                  Pinheiros — São Paulo/SP
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "var(--medical-blue-light)" }} />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+551130634890" className="text-sm hover:text-white transition-colors" style={{ color: "oklch(70% 0.03 240)", fontFamily: "'Inter', sans-serif" }}>
                    (11) 3063-4890
                  </a>
                  <a href="tel:+5511982850031" className="text-sm hover:text-white transition-colors" style={{ color: "oklch(70% 0.03 240)", fontFamily: "'Inter', sans-serif" }}>
                    (11) 98285-0031
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--medical-blue-light)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "oklch(70% 0.03 240)", fontFamily: "'Inter', sans-serif" }}>
                  <strong style={{ color: "oklch(80% 0.04 240)" }}>Consultas:</strong> Seg, Ter, Qui e Sex: 13h30–19h30<br />
                  <strong style={{ color: "oklch(80% 0.04 240)" }}>Secretaria:</strong> Seg a Sex: 8h30–19h30
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid oklch(30% 0.08 240)" }}>
          <p className="text-xs" style={{ color: "oklch(55% 0.025 240)", fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} Dr. Bruno Mahler Mioto — CRM 112007-SP · RQE 89316 e 89317
          </p>
          <p className="text-xs" style={{ color: "oklch(45% 0.02 240)", fontFamily: "'Inter', sans-serif" }}>
            Cardiologia & Clínica Geral — São Paulo
          </p>
        </div>
      </div>
    </footer>
  );
}
