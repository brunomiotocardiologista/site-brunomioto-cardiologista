import { useEffect, useState } from "react";

/* =====================================================================
   PARA O FORMULÁRIO: troque FORMSPREE_ENDPOINT pelo endpoint do form
   "Avaliação de Atendimento" criado em formspree.io. Não reusar o
   endpoint da landing da Kairós: misturar lead de mentoria com feedback
   de paciente suja as duas caixas.
   ===================================================================== */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvkgrwyj";

const NOTAS = [
  { v: 1, rotulo: "Ruim" },
  { v: 2, rotulo: "Regular" },
  { v: 3, rotulo: "Bom" },
  { v: 4, rotulo: "Muito bom" },
  { v: 5, rotulo: "Excelente" },
];

export default function Avaliacao() {
  const [nota, setNota] = useState<number | null>(null);
  const [autoriza, setAutoriza] = useState(false);
  const [estado, setEstado] = useState<"form" | "enviando" | "ok" | "erro">("form");

  useEffect(() => {
    document.title = "Avalie o atendimento | Dr. Bruno Mioto – Cardiologista";
    window.scrollTo(0, 0);
  }, []);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nota === null) return;
    const form = e.currentTarget;
    const dados = new FormData(form);
    dados.append("nota", String(nota));
    dados.append("nota_rotulo", NOTAS.find((n) => n.v === nota)?.rotulo || "");
    setEstado("enviando");
    try {
      const r = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: dados,
        headers: { Accept: "application/json" },
      });
      setEstado(r.ok ? "ok" : "erro");
    } catch {
      setEstado("erro");
    }
  }

  return (
    <div className="av-page">
      <style>{css}</style>

      <div className="av-wrap">
        {estado === "ok" ? (
          <section className="av-card av-obrigado">
            <div className="av-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h1>Obrigado pela sua avaliação</h1>
            <p>
              Sua resposta chegou e eu leio todas, uma a uma. O que você escreveu aqui
              ajuda a melhorar o atendimento de quem vem depois de você.
            </p>
            <p className="av-sec">
              Se precisar de alguma coisa, é só chamar pelo WhatsApp do consultório.
            </p>
            <div className="av-acoes">
              <a className="av-btn" href="https://wa.me/5511945556605">Falar com o consultório</a>
              <a className="av-btn av-btn-ghost" href="/">Voltar ao site</a>
            </div>
          </section>
        ) : (
          <section className="av-card">
            <header className="av-head">
              <span className="av-eyebrow">Avaliação de atendimento</span>
              <h1>Como foi a sua consulta?</h1>
              <p>
                Leva menos de um minuto. Sua opinião é usada para melhorar o atendimento
                do consultório, e responder é totalmente opcional.
              </p>
            </header>

            <form onSubmit={enviar} noValidate>
              <fieldset className="av-field">
                <legend>De modo geral, como você avalia o atendimento?</legend>
                <div className="av-notas" role="radiogroup" aria-label="Nota do atendimento">
                  {NOTAS.map((n) => (
                    <button
                      key={n.v}
                      type="button"
                      role="radio"
                      aria-checked={nota === n.v}
                      className={"av-nota" + (nota === n.v ? " is-on" : "")}
                      onClick={() => setNota(n.v)}
                    >
                      <span className="av-nota-num">{n.v}</span>
                      <span className="av-nota-rot">{n.rotulo}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="av-field">
                <label htmlFor="bem">O que funcionou bem?</label>
                <textarea id="bem" name="funcionou_bem" rows={3} placeholder="Opcional" />
              </div>

              <div className="av-field">
                <label htmlFor="melhorar">O que eu poderia melhorar?</label>
                <textarea id="melhorar" name="poderia_melhorar" rows={3} placeholder="Opcional. Pode ser direto, é assim que ajuda." />
              </div>

              <div className="av-consent">
                <label className="av-check-label">
                  <input
                    type="checkbox"
                    name="autoriza_publicacao"
                    checked={autoriza}
                    onChange={(e) => setAutoriza(e.target.checked)}
                  />
                  <span>
                    Autorizo que meu comentário seja publicado no site, sem nenhum dado
                    clínico e apenas com a identificação que eu escolher abaixo.
                  </span>
                </label>

                {autoriza && (
                  <div className="av-consent-campos">
                    <div className="av-field">
                      <label htmlFor="nome">Como quer ser identificado?</label>
                      <input id="nome" name="nome" type="text" placeholder="Ex.: Maria S. ou M. S." />
                    </div>
                    <p className="av-nota-lgpd">
                      Você pode usar o nome completo, só o primeiro nome ou apenas as
                      iniciais. Nada é publicado sem passar por você antes.
                    </p>
                  </div>
                )}
              </div>

              <p className="av-aviso">
                Não escreva aqui sintomas, diagnósticos, resultados de exame ou qualquer
                informação de saúde. Este canal é sobre o atendimento, não sobre o seu caso.
                Para assunto clínico, fale pelo WhatsApp do consultório.
              </p>

              {estado === "erro" && (
                <p className="av-erro">
                  Não consegui enviar agora. Tente de novo em instantes, ou mande sua
                  avaliação pelo WhatsApp do consultório.
                </p>
              )}

              <button className="av-btn av-submit" type="submit" disabled={nota === null || estado === "enviando"}>
                {estado === "enviando" ? "Enviando..." : "Enviar avaliação"}
              </button>
              {nota === null && <p className="av-hint">Escolha uma nota para habilitar o envio.</p>}
            </form>
          </section>
        )}

        <footer className="av-foot">
          Dr. Bruno Mahler Mioto · CRM 112007-SP · RQE 89316 e 89317
        </footer>
      </div>
    </div>
  );
}

const css = `
.av-page{min-height:100vh;background:var(--medical-blue-pale,#eef2f7);padding:48px 16px;font-family:'Inter',system-ui,sans-serif;color:var(--ink,#0d1117)}
.av-wrap{max-width:620px;margin:0 auto}
.av-card{background:#fff;border-radius:18px;padding:40px 34px;box-shadow:0 10px 40px rgba(16,32,64,.10)}
.av-head{margin-bottom:30px}
.av-eyebrow{display:block;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-accent,#b8955f);font-weight:600;margin-bottom:12px}
.av-card h1{font-family:'Playfair Display',Georgia,serif;font-size:31px;line-height:1.2;margin:0 0 12px;color:var(--ink,#0d1117)}
.av-head p{margin:0;color:var(--ink-muted,#667085);font-size:15px;line-height:1.6}
.av-field{margin-bottom:22px;border:0;padding:0}
.av-field label,.av-field legend{display:block;padding:0;font-size:14px;font-weight:600;margin-bottom:9px;color:var(--ink-light,#38404d)}
.av-field textarea,.av-field input[type=text]{width:100%;border:1px solid #d9dfe7;border-radius:10px;padding:12px 14px;font:inherit;font-size:15px;color:inherit;background:#fcfdfe;resize:vertical}
.av-field textarea:focus,.av-field input[type=text]:focus{outline:none;border-color:var(--medical-blue-light,#5b7fb0);box-shadow:0 0 0 3px rgba(91,127,176,.16)}
.av-notas{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.av-nota{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 4px;border:1px solid #d9dfe7;border-radius:10px;background:#fcfdfe;cursor:pointer;transition:.15s}
.av-nota:hover{border-color:var(--medical-blue-light,#5b7fb0)}
.av-nota.is-on{background:var(--medical-blue,#1e3a5f);border-color:var(--medical-blue,#1e3a5f);color:#fff}
.av-nota-num{font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:600;line-height:1}
.av-nota-rot{font-size:10.5px;line-height:1.2;text-align:center;opacity:.85}
.av-consent{background:#f6f8fb;border-radius:12px;padding:18px;margin-bottom:20px}
.av-check-label{display:flex;gap:11px;align-items:flex-start;font-size:14px;line-height:1.55;color:var(--ink-light,#38404d);cursor:pointer}
.av-check-label input{margin-top:3px;width:17px;height:17px;flex-shrink:0;accent-color:var(--medical-blue,#1e3a5f)}
.av-consent-campos{margin-top:16px}
.av-consent-campos .av-field{margin-bottom:8px}
.av-nota-lgpd{margin:0;font-size:12.5px;color:var(--ink-muted,#667085);line-height:1.5}
.av-aviso{font-size:12.5px;line-height:1.55;color:var(--ink-muted,#667085);background:#fffaf2;border-left:3px solid var(--gold-accent,#b8955f);padding:11px 14px;border-radius:0 8px 8px 0;margin:0 0 22px}
.av-erro{font-size:13.5px;color:#a6372c;background:#fdf1ef;border-radius:8px;padding:11px 14px;margin:0 0 16px}
.av-btn{display:inline-block;background:var(--medical-blue,#1e3a5f);color:#fff;border:none;border-radius:10px;padding:14px 26px;font:inherit;font-size:15px;font-weight:600;cursor:pointer;text-decoration:none;text-align:center;transition:.15s}
.av-btn:hover{background:var(--navy,#152a45)}
.av-btn:disabled{opacity:.42;cursor:not-allowed}
.av-submit{width:100%}
.av-btn-ghost{background:transparent;color:var(--medical-blue,#1e3a5f);border:1px solid #d9dfe7}
.av-btn-ghost:hover{background:#f2f5f9}
.av-hint{text-align:center;font-size:12.5px;color:var(--ink-muted,#667085);margin:10px 0 0}
.av-obrigado{text-align:center}
.av-check{width:62px;height:62px;border-radius:50%;background:#e8f3ec;color:#2e6b52;display:flex;align-items:center;justify-content:center;margin:0 auto 22px}
.av-obrigado p{color:var(--ink-muted,#667085);font-size:15.5px;line-height:1.65;margin:0 0 14px}
.av-obrigado .av-sec{font-size:14px}
.av-acoes{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:24px}
.av-foot{text-align:center;font-size:12px;color:var(--ink-muted,#667085);margin-top:26px;line-height:1.6}
@media(max-width:560px){
  .av-card{padding:30px 20px;border-radius:14px}
  .av-card h1{font-size:26px}
  .av-notas{gap:5px}
  .av-nota{padding:10px 2px}
  .av-nota-rot{font-size:9px}
  .av-acoes .av-btn{width:100%}
}
`;
