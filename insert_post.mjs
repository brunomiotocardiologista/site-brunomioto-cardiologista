import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const content = `<h2>O problema da consulta isolada</h2>

<p>Condições como hipertensão, colesterol elevado, diabetes, obesidade e doença cardiovascular não são eventos isolados. São processos contínuos.</p>

<p>E processos contínuos não se resolvem com intervenções pontuais.</p>

<p>Na prática, isso se traduz em algo muito comum: o paciente até começa bem… mas não consegue sustentar.</p>

<h2>O que é um plano de acompanhamento médico</h2>

<p>Um plano de acompanhamento é um modelo estruturado de cuidado contínuo.</p>

<p>Em vez de depender apenas de consultas espaçadas, o paciente passa a ser acompanhado ao longo de um período definido, com:</p>

<ul>
  <li>Metas claras</li>
  <li>Monitoramento frequente</li>
  <li>Ajustes ao longo do tempo</li>
  <li>Contato estruturado entre consultas</li>
</ul>

<p>A consulta deixa de ser o centro — e passa a ser o início da jornada.</p>

<h2>Por que o acompanhamento contínuo funciona melhor</h2>

<p>Mudar comportamento não depende apenas de informação. Depende de consistência, reforço, acompanhamento e ajuste de rota.</p>

<p>É por isso que muitos pacientes sabem o que precisam fazer — mas não conseguem manter.</p>

<p>Quando existe um processo estruturado, a adesão aumenta, as decisões ficam mais precisas e os resultados tendem a ser mais consistentes.</p>

<h2>Não é só sobre exames</h2>

<p>Um erro comum é focar apenas no resultado de um exame. Mas saúde cardiovascular envolve muito mais:</p>

<ul>
  <li>Controle de pressão arterial</li>
  <li>Perfil lipídico</li>
  <li>Composição corporal</li>
  <li>Hábitos de vida</li>
  <li>Uso correto de medicações</li>
</ul>

<p>Sem acompanhamento, esses fatores oscilam. Com acompanhamento, eles passam a ser gerenciados de forma integrada.</p>

<h2>Para quem faz sentido um plano de acompanhamento</h2>

<p>Esse modelo costuma ser especialmente útil para pessoas que:</p>

<ul>
  <li>Têm colesterol ou pressão fora da meta</li>
  <li>Já tentaram tratamento, mas não conseguiram manter</li>
  <li>Possuem risco cardiovascular elevado</li>
  <li>Querem um cuidado mais próximo e estruturado</li>
  <li>Buscam não apenas tratar, mas prevenir</li>
</ul>

<h2>A diferença na prática</h2>

<p>Na prática, a maior mudança é simples: você deixa de "consultar quando precisa" e passa a ser acompanhado ao longo do tempo.</p>

<p>Isso muda a relação com o tratamento, a consistência e a previsibilidade dos resultados.</p>

<h2>Vale a pena?</h2>

<p>Depende do seu objetivo.</p>

<p>Se a ideia for apenas tirar dúvidas pontuais, uma consulta pode ser suficiente. Mas se o objetivo for realmente controlar fatores de risco e reduzir a chance de eventos no futuro, o acompanhamento contínuo costuma ser uma estratégia muito mais eficaz.</p>

<h2>Conclusão</h2>

<p>A consulta médica continua sendo essencial. Mas, para muitas condições, ela não é suficiente sozinha.</p>

<p>O que muda o desfecho não é apenas o que é decidido no consultório — é o que é sustentado ao longo dos meses.</p>

<blockquote>
  <p><strong>Quer entender se esse modelo faz sentido para você?</strong> Cada caso é diferente. Se você tem fatores de risco cardiovascular ou quer estruturar melhor seu cuidado ao longo do tempo, vale a pena discutir isso em consulta.</p>
</blockquote>`;

const conn = await mysql.createConnection(DATABASE_URL);

const [result] = await conn.execute(
  `INSERT INTO blog_posts (title, slug, excerpt, content, categoryId, published, publishedAt, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW(), NOW())`,
  [
    "Plano de acompanhamento médico: o que é e por que pode mudar seus resultados de saúde",
    "plano-de-acompanhamento-medico-o-que-e-e-por-que-pode-mudar-seus-resultados-de-saude",
    "Se você já saiu de uma consulta com um plano bem definido, mas teve dificuldade em manter tudo ao longo do tempo, você não está sozinho. O problema, muitas vezes, não está no tratamento — está no modelo.",
    content,
    30005, // categoria: Serviços
  ]
);

console.log("Artigo inserido com sucesso! ID:", result.insertId);
await conn.end();
process.exit(0);
