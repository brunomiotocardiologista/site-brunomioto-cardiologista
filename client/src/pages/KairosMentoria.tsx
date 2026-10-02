import { useEffect } from "react";

/* =====================================================================
   KAIRÓS — Landing da mentoria (/kairosmentoria)
   Página autocontida. Todo o CSS vive sob o wrapper .kairos-lp para
   não conflitar com o restante do site.
   Sistema de marca: navy #0D1B35 · dourado #B8955F · osso #F7F5F1
   Tipografia: Fraunces (títulos) · Manrope (texto)

   PARA EDITAR OS TEXTOS: basta trocar o conteúdo entre as tags abaixo.
   PARA O FORMULÁRIO: troque FORMSPREE_ENDPOINT pelo seu endpoint.
   ===================================================================== */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbdnzjlk";

export default function KairosMentoria() {
  useEffect(() => {
    document.title = "Kairós — Mentoria para Médicos | Dr. Bruno Mioto";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,400&family=Manrope:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
    window.scrollTo(0, 0);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="kairos-lp">
      <style>{cssString}</style>

      {/* NAV */}
      <nav className="klp-nav">
        <div className="klp-wrap">
          <a className="klp-brand" href="/kairosmentoria">
            <svg width="46" height="30" viewBox="0 0 140 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M 10 62 L 60 62" stroke="#6B768D" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M 60 62 L 130 14" stroke="#F7F5F1" strokeWidth="7" strokeLinecap="round" fill="none" />
              <circle cx="60" cy="62" r="8.5" fill="#B8955F" />
            </svg>
            <span className="wm">KAIRÓS</span>
          </a>
          <a href="#interesse" className="klp-navcta">Quero participar</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="klp-hero">
        <div className="klp-wrap klp-hero-grid">
          <div className="klp-hero-copy">
            <div className="klp-eyebrow">Mentoria para médicos · por Dr. Bruno Mioto</div>
            <h1>
              O momento certo<br />de construir a<br />carreira que <span className="serif-it">é sua.</span>
            </h1>
            <p className="klp-lead">
              Mentoria para o médico que já entendeu que ser bom clinicamente não é suficiente. Consultório com
              estrutura, carreira com direção e inteligência artificial que funciona na prática.
            </p>
            <a href="#interesse" className="klp-btn klp-btn-gold">Quero saber mais</a>
          </div>
          <div className="klp-hero-photo">
            <img src="/kairos-bruno-portrait.jpg" alt="Dr. Bruno Mioto" />
          </div>
        </div>
      </header>

      {/* CONCEITO */}
      <section className="klp-concept">
        <div className="klp-wrap">
          <div className="klp-eyebrow">O que significa Kairós</div>
          <h2>Os gregos tinham duas palavras para tempo.</h2>
          <p className="klp-sub">A distinção entre elas é a ideia que move esta mentoria.</p>
          <div className="klp-grid2">
            <div className="klp-cell">
              <div className="klp-gk">Chronos</div>
              <p>
                O tempo que passa. Plantão, escala, o ano de residência que termina. Corre com ou sem você. É onde a
                maioria dos médicos vive por padrão.
              </p>
            </div>
            <div className="klp-cell">
              <div className="klp-gk">Kairós</div>
              <p>
                O momento oportuno. O instante em que agir muda a trajetória. É a decisão de carreira certa na hora
                certa. É o que esta mentoria ajuda você a reconhecer e aproveitar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="klp-forwho">
        <div className="klp-wrap">
          <div className="klp-eyebrow">Para quem é</div>
          <h2>Este não é um programa<br />para todo mundo.</h2>
          <p className="klp-intro">
            É para o médico que já entendeu que ser bom clinicamente não é suficiente. Se você se reconhece em alguma
            dessas situações, a Kairós é para você.
          </p>
          <div className="klp-qlist">
            <div className="klp-qitem"><div className="n">01</div><div className="t">Terminou a residência e sente que ninguém te ensinou o que vem depois.</div></div>
            <div className="klp-qitem"><div className="n">02</div><div className="t">Abriu ou pensa em abrir consultório, mas não sabe por onde começar ou não vê o resultado esperado.</div></div>
            <div className="klp-qitem"><div className="n">03</div><div className="t">Ouve falar de inteligência artificial todo dia e ainda não sabe o que é útil para você.</div></div>
            <div className="klp-qitem"><div className="n">04</div><div className="t">Quer uma carreira com direção, mas não tem com quem conversar sobre isso.</div></div>
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section className="klp-pillars">
        <div className="klp-wrap">
          <div className="klp-eyebrow">Os três pilares</div>
          <h2>Onde a gente trabalha.</h2>
          <p className="klp-intro dark">A mentoria se organiza em três frentes que, juntas, sustentam uma prática médica sólida.</p>
          <div className="klp-pcards">
            <div className="klp-pcard">
              <div className="pn">01</div>
              <h3>Consultório</h3>
              <p>Estruturar o consultório como um negócio: posicionamento, paciente ideal, fluxo de caixa, precificação e o que faz uma prática crescer de forma consistente.</p>
            </div>
            <div className="klp-pcard">
              <div className="pn">02</div>
              <h3>Carreira</h3>
              <p>Construir direção: como se posicionar na especialidade, tomar decisões com critério e criar uma trajetória que não dependa de sorte.</p>
            </div>
            <div className="klp-pcard">
              <div className="pn">03</div>
              <h3>IA na gestão</h3>
              <p>Usar inteligência artificial de forma prática para economizar tempo e organizar a rotina, sem modismo e sem desperdício de horas com o que não funciona.</p>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE INCLUI */}
      <section className="klp-includes">
        <div className="klp-wrap">
          <div className="klp-eyebrow">O programa</div>
          <h2>O que está incluso.</h2>
          <div className="klp-ilist">
            <div className="klp-iitem"><span className="dot">—</span><span className="it"><strong>Três meses</strong> de mentoria estruturada.</span></div>
            <div className="klp-iitem"><span className="dot">—</span><span className="it"><strong>Encontros em grupo</strong> com discussão prática dos temas.</span></div>
            <div className="klp-iitem"><span className="dot">—</span><span className="it"><strong>Acompanhamento individualizado</strong> ao longo do programa.</span></div>
            <div className="klp-iitem"><span className="dot">—</span><span className="it"><strong>Canal direto</strong> de contato com o mentor.</span></div>
            <div className="klp-iitem"><span className="dot">—</span><span className="it"><strong>Materiais práticos</strong> de gestão, carreira e IA.</span></div>
            <div className="klp-iitem"><span className="dot">—</span><span className="it"><strong>Turma reduzida</strong>, com atenção real a cada participante.</span></div>
          </div>
          <div className="klp-founder">
            <p><strong>Turma fundadora.</strong> Esta é a primeira turma da Kairós, com número de vagas limitado e condições especiais de fundador. O investimento é conversado individualmente após o seu contato.</p>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="klp-about">
        <div className="klp-wrap klp-about-grid">
          <div className="klp-about-photo">
            <img src="/kairos-bruno-palco.jpg" alt="Dr. Bruno Mioto em palestra" />
          </div>
          <div className="klp-about-copy">
            <div className="klp-eyebrow">Quem conduz</div>
            <h2>Dr. Bruno Mahler Mioto</h2>
            <p>Médico cardiologista pelo Instituto do Coração (InCor) do HCFMUSP, com atuação em prevenção cardiovascular e doença arterial coronária crônica, vida acadêmica ativa e consultório próprio.</p>
            <p>A Kairós nasce do que ele gostaria que existisse quando começou: alguém que já construiu uma prática médica de verdade e pode encurtar o caminho de quem está começando agora.</p>
            <ul className="klp-creds">
              <li>Cardiologista pelo InCor — HCFMUSP</li>
              <li>Atuação em prevenção cardiovascular e cardiometabolismo</li>
              <li>Experiência em consultório, carreira acadêmica e ensino</li>
              <li>Produção de conteúdo científico para médicos e pacientes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className="klp-signup" id="interesse">
        <div className="klp-wrap">
          <div className="klp-signhead">
            <div className="klp-eyebrow" style={{ textAlign: "center" }}>Vagas limitadas</div>
            <h2>Garanta seu lugar na <span className="serif-it">turma fundadora.</span></h2>
            <p>Preencha abaixo. O contato é pessoal: você recebe um retorno do próprio Bruno para conversar sobre o programa.</p>
          </div>
          <form action={FORMSPREE_ENDPOINT} method="POST">
            <div className="klp-row2">
              <div className="klp-field">
                <label>Nome completo</label>
                <input type="text" name="nome" placeholder="Seu nome" required />
              </div>
              <div className="klp-field">
                <label>WhatsApp</label>
                <input type="tel" name="whatsapp" placeholder="(11) 90000-0000" required />
              </div>
            </div>
            <div className="klp-field">
              <label>E-mail</label>
              <input type="email" name="email" placeholder="seu@email.com" required />
            </div>
            <div className="klp-field">
              <label>Momento da carreira</label>
              <select name="momento" required defaultValue="">
                <option value="" disabled>Selecione</option>
                <option>Residência em andamento</option>
                <option>Recém-formado / início de carreira</option>
                <option>Pensando em abrir consultório</option>
                <option>Já tenho consultório, quero melhorar</option>
                <option>Outro</option>
              </select>
            </div>
            <div className="klp-field">
              <label>Qual seu maior desafio hoje? (opcional)</label>
              <textarea name="desafio" rows={3} placeholder="Conte em poucas linhas"></textarea>
            </div>
            <button type="submit" className="klp-btn klp-btn-gold klp-btn-full">Quero uma conversa</button>
            <p className="klp-formnote">Seus dados são usados apenas para este contato. Sem spam.</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="klp-footer">
        <div className="klp-wrap">
          <div>
            <div className="wm">KAIRÓS</div>
            <div className="sub">Mentoria para Médicos</div>
          </div>
          <a className="ig" href="https://instagram.com/brunomioto.mentoria" target="_blank" rel="noopener noreferrer">@brunomioto.mentoria</a>
        </div>
        <div className="klp-wrap klp-crm">
          Dr. Bruno Mahler Mioto · CRM: 112.007-SP · RQE: 89316
        </div>
      </footer>
    </div>
  );
}

const cssString = `
.kairos-lp{
  --navy:#0D1B35; --gold:#B8955F; --gold-soft:#D9C4A3; --osso:#F7F5F1; --gray:#6B768D;
  --sans:'Manrope',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  --serif:'Fraunces',Georgia,serif;
  font-family:var(--sans); background:var(--osso); color:#1A1A1A; line-height:1.65;
  -webkit-font-smoothing:antialiased;
}
.kairos-lp *{box-sizing:border-box; margin:0; padding:0;}
.kairos-lp h1,.kairos-lp h2,.kairos-lp h3{font-family:var(--serif); font-weight:300; letter-spacing:-.015em; line-height:1.1;}
.kairos-lp p{font-weight:300;}
.kairos-lp .serif-it{font-family:var(--serif); font-style:italic; color:var(--gold);}
.klp-wrap{max-width:1080px; margin:0 auto; padding:0 32px;}
.kairos-lp section{padding:96px 0;}
.klp-eyebrow{font-size:13px; letter-spacing:.26em; text-transform:uppercase; font-weight:600; color:var(--gold); margin-bottom:22px;}
.klp-btn{display:inline-block; font-weight:600; font-size:15px; text-decoration:none; padding:17px 36px; border-radius:2px; transition:all .2s; cursor:pointer; border:none;}
.klp-btn-gold{background:var(--gold); color:var(--navy);}
.klp-btn-gold:hover{background:var(--gold-soft); transform:translateY(-1px);}
.klp-btn-full{width:100%; margin-top:12px; font-size:16px; padding:18px;}

/* NAV */
.klp-nav{position:fixed; top:0; left:0; right:0; z-index:50; background:rgba(13,27,53,.9); backdrop-filter:blur(8px);}
.klp-nav .klp-wrap{display:flex; align-items:center; justify-content:space-between; padding-top:16px; padding-bottom:16px;}
.klp-brand{display:flex; align-items:center; gap:12px; text-decoration:none;}
.klp-brand .wm{font-family:var(--serif); font-size:20px; letter-spacing:.14em; color:var(--osso);}
.klp-navcta{font-size:13px; font-weight:600; color:var(--navy); background:var(--gold); padding:11px 20px; border-radius:2px; text-decoration:none; transition:background .2s;}
.klp-navcta:hover{background:var(--gold-soft);}

/* HERO */
.klp-hero{background:var(--navy); color:var(--osso); padding:170px 0 110px; overflow:hidden;}
.klp-hero-grid{display:grid; grid-template-columns:1.15fr .85fr; gap:40px; align-items:center;}
.klp-hero h1{font-size:72px; color:var(--osso); margin-bottom:28px;}
.klp-hero h1 .serif-it{color:var(--gold);}
.klp-lead{font-size:20px; color:rgba(247,245,241,.72); max-width:520px; margin-bottom:44px;}
.klp-hero-photo{position:relative;}
.klp-hero-photo img{width:100%; border-radius:3px; display:block; filter:saturate(.9);}
.klp-hero-photo:after{content:''; position:absolute; inset:0; border-radius:3px;
  background:linear-gradient(90deg, rgba(13,27,53,.85) 0%, rgba(13,27,53,.15) 35%, rgba(13,27,53,0) 60%, rgba(13,27,53,.25) 100%);}

/* CONCEITO */
.klp-concept{background:var(--osso);}
.klp-concept h2{font-size:44px; color:var(--navy); max-width:640px;}
.klp-sub{font-size:20px; color:var(--navy); font-weight:300; margin-top:20px; max-width:620px;}
.klp-grid2{display:grid; grid-template-columns:1fr 1fr; gap:0; margin-top:44px; border:1px solid rgba(13,27,53,.14);}
.klp-cell{padding:40px 36px;}
.klp-cell:first-child{border-right:1px solid rgba(13,27,53,.14); background:rgba(13,27,53,.02);}
.klp-gk{font-family:var(--serif); font-size:15px; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); font-weight:600; margin-bottom:14px;}
.klp-cell p{font-size:16px; color:#38404F;}

/* PARA QUEM */
.klp-forwho{background:var(--navy); color:var(--osso);}
.klp-forwho h2{font-size:44px; color:var(--osso); margin-bottom:16px;}
.klp-intro{font-size:19px; color:rgba(247,245,241,.7); max-width:600px; margin-bottom:48px;}
.klp-intro.dark{color:#38404F;}
.klp-qlist{display:grid;}
.klp-qitem{display:grid; grid-template-columns:56px 1fr; gap:20px; padding:26px 0; border-top:1px solid rgba(247,245,241,.12); align-items:baseline;}
.klp-qitem:last-child{border-bottom:1px solid rgba(247,245,241,.12);}
.klp-qitem .n{font-family:var(--serif); font-size:24px; color:var(--gold);}
.klp-qitem .t{font-size:21px; font-weight:300; color:var(--osso);}

/* PILARES */
.klp-pillars{background:var(--osso);}
.klp-pillars h2{font-size:44px; color:var(--navy); margin-bottom:12px;}
.klp-pcards{display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:52px;}
.klp-pcard{background:#fff; border:1px solid rgba(13,27,53,.1); padding:38px 30px; border-top:3px solid var(--gold);}
.klp-pcard .pn{font-family:var(--serif); font-size:15px; color:var(--gold); margin-bottom:16px;}
.klp-pcard h3{font-size:26px; color:var(--navy); margin-bottom:12px;}
.klp-pcard p{font-size:15.5px; color:#4A5364;}

/* INCLUI */
.klp-includes{background:var(--navy); color:var(--osso);}
.klp-includes h2{font-size:44px; color:var(--osso); margin-bottom:40px;}
.klp-ilist{display:grid; grid-template-columns:1fr 1fr; gap:2px 48px;}
.klp-iitem{display:flex; gap:16px; padding:20px 0; border-bottom:1px solid rgba(247,245,241,.12); align-items:flex-start;}
.klp-iitem .dot{color:var(--gold); font-size:20px; line-height:1.3;}
.klp-iitem .it{font-size:17px; font-weight:300; color:rgba(247,245,241,.9);}
.klp-iitem .it strong{font-weight:600; color:var(--osso);}
.klp-founder{margin-top:44px; background:rgba(184,149,95,.12); border-left:2px solid var(--gold); padding:24px 28px;}
.klp-founder p{font-size:16.5px; color:rgba(247,245,241,.85);}
.klp-founder strong{color:var(--osso);}

/* SOBRE */
.klp-about{background:var(--osso);}
.klp-about-grid{display:grid; grid-template-columns:1fr 1.15fr; gap:52px; align-items:center;}
.klp-about-photo img{width:100%; border-radius:3px; display:block;}
.klp-about h2{font-size:40px; color:var(--navy); margin-bottom:20px;}
.klp-about p{font-size:17px; color:#38404F; margin-bottom:16px;}
.klp-creds{margin-top:26px; border-top:1px solid rgba(13,27,53,.12); padding-top:26px;}
.klp-creds li{list-style:none; font-size:15.5px; color:#4A5364; padding:7px 0 7px 22px; position:relative;}
.klp-creds li:before{content:''; position:absolute; left:0; top:15px; width:8px; height:1.5px; background:var(--gold);}

/* FORM */
.klp-signup{background:var(--navy); color:var(--osso);}
.klp-signhead{text-align:center; max-width:620px; margin:0 auto 48px;}
.klp-signup h2{font-size:46px; color:var(--osso); margin-bottom:16px;}
.klp-signhead p{font-size:18px; color:rgba(247,245,241,.72);}
.klp-signup form{max-width:620px; margin:0 auto;}
.klp-field{margin-bottom:20px;}
.klp-field label{display:block; font-size:13px; font-weight:600; letter-spacing:.04em; color:var(--gold-soft); margin-bottom:8px;}
.klp-field input,.klp-field select,.klp-field textarea{width:100%; padding:15px 16px; font-family:var(--sans); font-size:16px; background:rgba(247,245,241,.06); border:1px solid rgba(247,245,241,.2); border-radius:2px; color:var(--osso);}
.klp-field input::placeholder,.klp-field textarea::placeholder{color:rgba(247,245,241,.4);}
.klp-field input:focus,.klp-field select:focus,.klp-field textarea:focus{outline:none; border-color:var(--gold); background:rgba(247,245,241,.1);}
.klp-field select option{background:var(--navy); color:var(--osso);}
.klp-row2{display:grid; grid-template-columns:1fr 1fr; gap:20px;}
.klp-formnote{text-align:center; font-size:13px; color:rgba(247,245,241,.5); margin-top:18px;}

/* FOOTER */
.klp-footer{background:#091223; color:rgba(247,245,241,.5); padding:56px 0 40px;}
.klp-footer .klp-wrap{display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:24px;}
.klp-footer .wm{font-family:var(--serif); font-size:22px; letter-spacing:.14em; color:var(--osso);}
.klp-footer .sub{font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:var(--gray); margin-top:4px;}
.klp-footer .ig{font-size:14px; color:rgba(247,245,241,.7); text-decoration:none;}
.klp-footer .ig:hover{color:var(--gold);}
.klp-crm{margin-top:30px; padding-top:22px; border-top:1px solid rgba(247,245,241,.10);
  font-size:12.5px; letter-spacing:.06em; color:rgba(247,245,241,.42); text-align:center; display:block;}

@media(max-width:820px){
  .kairos-lp section{padding:64px 0;}
  .klp-wrap{padding:0 22px;}
  .klp-hero{padding:120px 0 70px;}
  .klp-hero-grid{grid-template-columns:1fr;}
  .klp-hero-photo{display:none;}
  .klp-hero h1{font-size:44px;}
  .klp-lead{font-size:18px;}
  .klp-concept h2,.klp-forwho h2,.klp-pillars h2,.klp-includes h2,.klp-signup h2{font-size:32px;}
  .klp-grid2{grid-template-columns:1fr;}
  .klp-cell:first-child{border-right:none; border-bottom:1px solid rgba(13,27,53,.14);}
  .klp-pcards{grid-template-columns:1fr;}
  .klp-ilist{grid-template-columns:1fr;}
  .klp-about-grid{grid-template-columns:1fr; gap:32px;}
  .klp-about-photo{order:2;}
  .klp-row2{grid-template-columns:1fr;}
  .klp-brand .wm{font-size:17px;}
}
`;
