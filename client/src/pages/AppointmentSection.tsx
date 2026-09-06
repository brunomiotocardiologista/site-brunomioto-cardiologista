import { useState } from "react";
import { Calendar, Clock, CheckCircle, MessageCircle, ChevronDown } from "lucide-react";

const WHATSAPP_NUMBER = "5511945556605";

const consultationTypes = [
  "Consulta Cardiológica",
  "Check-up Cardiovascular",
  "Consulta de Clínica Geral",
  "Retorno / Acompanhamento",
];

function buildWhatsAppUrl(name: string, consultationType: string, preferredDate: string, notes: string) {
  const lines: string[] = [];
  lines.push("Olá, Dr. Bruno! Gostaria de agendar uma consulta.");
  if (name) lines.push(`*Nome:* ${name}`);
  if (consultationType) lines.push(`*Tipo:* ${consultationType}`);
  if (preferredDate) lines.push(`*Data preferida:* ${preferredDate}`);
  if (notes) lines.push(`*Observações:* ${notes}`);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function AppointmentSection() {
  const [form, setForm] = useState({
    name: "",
    consultationType: "",
    preferredDate: "",
    notes: "",
  });

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid var(--border-fine)",
    background: "var(--cream)",
    color: "var(--ink)",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(form.name, form.consultationType, form.preferredDate, form.notes);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="agendamento" className="py-24 lg:py-32" style={{ background: "var(--navy)" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 60, height: 1, background: "oklch(55% 0.1 240)" }} />
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "oklch(65% 0.08 240)", fontFamily: "'Inter', sans-serif" }}
              >
                Agendamento
              </span>
            </div>
            <h2
              className="font-serif mb-6 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "white",
              }}
            >
              Agende sua Consulta
            </h2>
            <p
              className="mb-10 leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.125rem",
                color: "oklch(75% 0.04 240)",
                lineHeight: 1.8,
              }}
            >
              Cuide da saúde do seu coração com o acompanhamento especializado do Dr. Bruno Mahler Mioto.
              Preencha os dados abaixo e você será redirecionado para o WhatsApp para confirmar seu horário diretamente.
            </p>

            <div className="flex flex-col gap-5">
              {[
                { icon: <Calendar className="w-5 h-5" />, text: "Escolha o tipo de consulta e data preferida" },
                { icon: <MessageCircle className="w-5 h-5" />, text: "Confirme pelo WhatsApp com o consultório" },
                { icon: <Clock className="w-5 h-5" />, text: "Consultas: seg, ter, qui e sex: 13h30 às 19h30" },
                { icon: <Clock className="w-5 h-5" />, text: "Secretaria presencial: seg a sex: 8h30 às 19h30" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 shrink-0 flex items-center justify-center"
                    style={{ background: "oklch(30% 0.08 240)", color: "oklch(65% 0.1 240)" }}
                  >
                    {item.icon}
                  </div>
                  <span style={{ color: "oklch(75% 0.04 240)", fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Form */}
          <div style={{ background: "var(--cream)", padding: "2rem" }}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: "#25D366" }}
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3
                  className="font-serif text-lg font-bold"
                  style={{ color: "var(--ink)", fontFamily: "'Playfair Display', serif" }}
                >
                  Agendar pelo WhatsApp
                </h3>
                <p className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                  Resposta rápida e confirmação imediata
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs tracking-wide uppercase mb-1.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                  Seu Nome
                </label>
                <input
                  type="text"
                  placeholder="Como prefere ser chamado(a)?"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--medical-blue)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-fine)")}
                />
              </div>

              <div>
                <label className="block text-xs tracking-wide uppercase mb-1.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                  Tipo de Consulta
                </label>
                <div className="relative">
                  <select
                    value={form.consultationType}
                    onChange={(e) => setForm({ ...form, consultationType: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--medical-blue)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border-fine)")}
                  >
                    <option value="">Selecione o tipo de consulta</option>
                    {consultationTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--ink-muted)" }} />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wide uppercase mb-1.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                  Data Preferida
                </label>
                <input
                  type="date"
                  value={form.preferredDate}
                  onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--medical-blue)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-fine)")}
                />
              </div>

              <div>
                <label className="block text-xs tracking-wide uppercase mb-1.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                  Observações
                </label>
                <textarea
                  placeholder="Descreva brevemente o motivo da consulta ou informações relevantes..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--medical-blue)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-fine)")}
                />
              </div>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="mt-2 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                style={{ background: "#25D366", fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}
              >
                <MessageCircle className="w-4 h-4" />
                Continuar pelo WhatsApp
              </button>

              <p className="text-center text-xs mt-1" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                Você será redirecionado para o WhatsApp com os dados preenchidos
              </p>

              <div className="flex items-center gap-3 mt-2" style={{ borderTop: "1px solid var(--border-fine)", paddingTop: "1rem" }}>
                <div className="flex-1" style={{ height: 1, background: "var(--border-fine)" }} />
                <span className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>ou</span>
                <div className="flex-1" style={{ height: 1, background: "var(--border-fine)" }} />
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="tel:+551130634890"
                  className="flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ border: "1px solid var(--medical-blue)", color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em", background: "transparent" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Ligar: (11) 3063-4890
                </a>
                <a
                  href="tel:+5511982850031"
                  className="flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ border: "1px solid var(--medical-blue)", color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em", background: "transparent" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Ligar: (11) 98285-0031
                </a>
              </div>
              <p className="text-center text-xs" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                Secretaria presencial: seg a sex, 8h30 às 19h30
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
