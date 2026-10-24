import { useEffect } from "react";
import type { ReactNode } from "react";

const WHATSAPP =
  "https://wa.me/5511945556605?text=" +
  encodeURIComponent("Olá, gostaria de agendar uma consulta com o Dr. Bruno Mioto.");
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("R. Oscar Freire, 2250 - Pinheiros, São Paulo - SP");
const EMAIL = "brunomioto@gmail.com";

type Item = {
  titulo: string;
  desc: string;
  href: string;
  icone: ReactNode;
  destaque?: boolean;
  externo?: boolean;
};

const I = {
  whats: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="21" height="21">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 2A9.94 9.94 0 0 0 2.1 11.94c0 1.75.46 3.46 1.34 4.97L2 22l5.22-1.37a9.9 9.9 0 0 0 4.82 1.23h.01a9.94 9.94 0 0 0 9.94-9.94A9.94 9.94 0 0 0 12.04 2" />
    </svg>
  ),
  globo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="21" height="21">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </svg>
  ),
  texto: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="21" height="21">
      <path d="M4 5h16M4 10h16M4 15h11M4 20h7" strokeLinecap="round" />
    </svg>
  ),
  estrela: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="21" height="21">
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" strokeLinejoin="round" />
    </svg>
  ),
  kairos: (
    <svg viewBox="0 0 140 84" width="23" height="15">
      <path d="M 10 62 L 60 62" stroke="currentColor" strokeWidth="9" strokeLinecap="round" fill="none" opacity=".45" />
      <path d="M 60 62 L 130 14" stroke="currentColor" strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="62" r="9" fill="currentColor" />
    </svg>
  ),
  insta: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="21" height="21">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.89 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16m0-2.16C8.74 0 8.33.01 7.05.07c-4.36.2-6.78 2.62-6.98 6.98C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="21" height="21">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="m3 7 9 6 9-6" strokeLinecap="round" />
    </svg>
  ),
  pino: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="21" height="21">
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
};

const ITENS: Item[] = [
  { titulo: "Agendar consulta", desc: "Fale com o consultório no WhatsApp", href: WHATSAPP, icone: I.whats, destaque: true, externo: true },
  { titulo: "Site", desc: "Sobre mim, serviços e contato", href: "/", icone: I.globo },
  { titulo: "Blog", desc: "Prevenção e saúde do coração", href: "/blog", icone: I.texto },
  { titulo: "Avaliar o atendimento", desc: "Já foi meu paciente? Conte como foi", href: "/avaliacao", icone: I.estrela },
  { titulo: "Kairós Mentoria", desc: "Mentoria para médicos", href: "/kairosmentoria", icone: I.kairos },
  { titulo: "Instagram · cardiologia", desc: "@brunomioto.cardiologista", href: "https://instagram.com/brunomioto.cardiologista", icone: I.insta, externo: true },
  { titulo: "Instagram · mentoria", desc: "@brunomioto.mentoria", href: "https://instagram.com/brunomioto.mentoria", icone: I.insta, externo: true },
  { titulo: "E-mail", desc: EMAIL, href: "mailto:" + EMAIL, icone: I.email, externo: true },
  { titulo: "Como chegar", desc: "R. Oscar Freire, 2250 · Pinheiros, São Paulo", href: MAPS, icone: I.pino, externo: true },
];

export default function Links() {
  useEffect(() => {
    document.title = "Dr. Bruno Mioto · Links";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="lk-page">
      <style>{css}</style>
      <main className="lk-wrap">
        <header className="lk-head">
          <div className="lk-avatar" aria-hidden="true">BM</div>
          <h1>Dr. Bruno Mahler Mioto</h1>
          <p className="lk-sub">Cardiologista e clínico geral · São Paulo</p>
          <p className="lk-crm">CRM 112007-SP · RQE 89316 e 89317</p>
        </header>

        <nav className="lk-lista" aria-label="Links">
          {ITENS.map((it) => (
            <a
              key={it.titulo}
              className={"lk-item" + (it.destaque ? " is-destaque" : "")}
              href={it.href}
              {...(it.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="lk-ico">{it.icone}</span>
              <span className="lk-txt">
                <span className="lk-titulo">{it.titulo}</span>
                <span className="lk-desc">{it.desc}</span>
              </span>
              <span className="lk-seta" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </nav>

        <footer className="lk-foot">
          © {new Date().getFullYear()} Dr. Bruno Mahler Mioto
        </footer>
      </main>
    </div>
  );
}

const css = `
.lk-page{min-height:100vh;background:linear-gradient(170deg,#152a45 0%,#1e3a5f 45%,#24456d 100%);padding:52px 16px 40px;font-family:'Inter',system-ui,sans-serif}
.lk-wrap{max-width:520px;margin:0 auto}
.lk-head{text-align:center;margin-bottom:30px}
.lk-avatar{width:78px;height:78px;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.22);color:#f2e3c8;font-family:'Playfair Display',Georgia,serif;font-size:27px;letter-spacing:.04em}
.lk-head h1{font-family:'Playfair Display',Georgia,serif;font-size:26px;color:#fff;margin:0 0 7px;line-height:1.25}
.lk-sub{color:rgba(255,255,255,.76);font-size:14.5px;margin:0 0 5px}
.lk-crm{color:rgba(255,255,255,.5);font-size:12px;margin:0;letter-spacing:.02em}
.lk-lista{display:flex;flex-direction:column;gap:11px}
.lk-item{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.965);border-radius:13px;padding:15px 16px;text-decoration:none;color:#152a45;transition:transform .14s,box-shadow .14s;box-shadow:0 2px 10px rgba(0,0,0,.12)}
.lk-item:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,0,0,.2)}
.lk-item.is-destaque{background:#b8955f;color:#14243c}
.lk-item.is-destaque .lk-desc{color:rgba(20,36,60,.78)}
.lk-ico{flex-shrink:0;width:38px;height:38px;border-radius:9px;background:rgba(21,42,69,.07);display:flex;align-items:center;justify-content:center;color:#1e3a5f}
.lk-item.is-destaque .lk-ico{background:rgba(20,36,60,.14);color:#14243c}
.lk-txt{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}
.lk-titulo{font-size:15px;font-weight:600;line-height:1.3}
.lk-desc{font-size:12.5px;color:#667085;line-height:1.4;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.lk-seta{flex-shrink:0;color:#9aa5b5}
.lk-item.is-destaque .lk-seta{color:rgba(20,36,60,.55)}
.lk-foot{text-align:center;color:rgba(255,255,255,.42);font-size:11.5px;margin-top:30px}
@media(max-width:420px){
  .lk-page{padding:40px 13px 32px}
  .lk-item{padding:13px 14px;gap:12px}
  .lk-titulo{font-size:14.5px}
  .lk-desc{font-size:12px}
}
`;
