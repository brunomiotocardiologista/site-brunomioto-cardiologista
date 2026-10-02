import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const subjects = [
  "Dúvida sobre consulta",
  "Informações sobre exames",
  "Agendamento",
  "Resultado de exame",
  "Outros",
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const sendContact = trpc.contacts.create.useMutation({
    onSuccess: () => { setSubmitted(true); toast.success("Mensagem enviada com sucesso!"); },
    onError: () => toast.error("Erro ao enviar. Tente novamente."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    sendContact.mutate(form);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid var(--border-fine)",
    background: "var(--cream-dark)",
    color: "var(--ink)",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contato" className="py-24 lg:py-32" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="editorial-line" />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}>
              Fale Conosco
            </span>
          </div>
          <h2
            className="font-serif mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--ink)" }}
          >
            Entre em Contato
          </h2>
          <p className="mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.125rem", color: "var(--ink-light)", lineHeight: 1.8 }}>
            Tem alguma dúvida ou precisa de mais informações? Envie uma mensagem e responderemos em breve.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center" style={{ border: "1px solid var(--border-fine)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "var(--medical-blue-pale)" }}>
                <CheckCircle className="w-8 h-8" style={{ color: "var(--medical-blue)" }} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "var(--ink)", fontFamily: "'Playfair Display', serif" }}>
                Mensagem Enviada!
              </h3>
              <p style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}>
                Responderemos em até 24 horas úteis.
              </p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-sm underline" style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}>
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wide uppercase mb-1.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>Nome *</label>
                  <input type="text" placeholder="Seu nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--medical-blue)")} onBlur={(e) => (e.target.style.borderColor = "var(--border-fine)")} required />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase mb-1.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>Email *</label>
                  <input type="email" placeholder="seu@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--medical-blue)")} onBlur={(e) => (e.target.style.borderColor = "var(--border-fine)")} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wide uppercase mb-1.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>Telefone</label>
                  <input type="tel" placeholder="(11) 99999-9999" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--medical-blue)")} onBlur={(e) => (e.target.style.borderColor = "var(--border-fine)")} />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase mb-1.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>Assunto *</label>
                  <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--medical-blue)")} onBlur={(e) => (e.target.style.borderColor = "var(--border-fine)")} required>
                    <option value="">Selecione o assunto</option>
                    {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase mb-1.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>Mensagem *</label>
                <textarea placeholder="Escreva sua mensagem..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5}
                  style={{ ...inputStyle, resize: "vertical" }} onFocus={(e) => (e.target.style.borderColor = "var(--medical-blue)")} onBlur={(e) => (e.target.style.borderColor = "var(--border-fine)")} required />
              </div>
              <button type="submit" disabled={sendContact.isPending}
                className="py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: "var(--medical-blue)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}>
                {sendContact.isPending ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
