import { createConnection } from 'mysql2/promise';

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

const url = new URL(DB_URL);
const conn = await createConnection({
  host: url.hostname,
  port: Number(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.replace('/', ''),
  ssl: { rejectUnauthorized: false }
});

const title = 'Aterosclerose: a doença silenciosa que você pode — e deve — prevenir';
const slug = 'aterosclerose-a-doenca-silenciosa-que-voce-pode-e-deve-prevenir';
const excerpt = 'A aterosclerose está por trás da maioria dos infartos e AVCs. Entenda o que é, como progride, a importância da prevenção e por que atingir metas terapêuticas pode salvar sua vida.';
const categoryId = 1;
const readTime = 9;
const coverImage = 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=1200&q=80';

const content = `## O que é aterosclerose?

Aterosclerose é o acúmulo progressivo de gordura, células inflamatórias e tecido fibroso nas paredes das artérias, formando as chamadas **placas ateroscleróticas**. Com o tempo, essas placas estreitam o interior das artérias, reduzem o fluxo de sangue e podem se romper — desencadeando um infarto ou AVC.

O processo começa com uma lesão no endotélio, a camada interna das artérias. Essa lesão pode ser causada por pressão arterial elevada, colesterol alto, tabagismo, diabetes ou inflamação crônica. A partir daí, o LDL (colesterol "ruim") penetra na parede arterial, oxida-se e desencadeia uma resposta inflamatória que, ao longo de anos, consolida a placa.

O que torna a aterosclerose especialmente traiçoeira é que ela é **assintomática por décadas**. A artéria pode estar com 50%, 60%, até 70% de obstrução sem que o paciente sinta absolutamente nada. Os sintomas — dor no peito, falta de ar, dor nas pernas ao caminhar — surgem quando a doença já está avançada.

## Fatores de risco: o que acelera a aterosclerose?

Alguns fatores de risco são modificáveis — ou seja, podem ser tratados e controlados. Outros são fixos. Conhecê-los é fundamental para qualquer estratégia de prevenção.

| Fator de risco | Modificável? |
|---|---|
| Colesterol LDL elevado | Sim |
| Hipertensão arterial | Sim |
| Diabetes e resistência à insulina | Sim |
| Tabagismo | Sim |
| Sedentarismo | Sim |
| Obesidade abdominal | Sim |
| Inflamação crônica | Parcialmente |
| Idade avançada | Não |
| Sexo masculino | Não |
| Histórico familiar de doença cardiovascular precoce | Não |

Quanto mais fatores de risco presentes — e quanto mais tempo sem controle —, mais rápida é a progressão da aterosclerose. Por isso, a abordagem preventiva precisa ser global: não adianta controlar só o colesterol se a pressão arterial permanece descontrolada.

## Por que a prevenção é o melhor tratamento?

Existe uma frase que resume bem a cardiologia preventiva: **é muito mais fácil evitar um infarto do que sobreviver a ele**. Não porque o tratamento do infarto seja ineficaz — ele evoluiu enormemente nas últimas décadas —, mas porque o dano causado ao músculo cardíaco durante um evento agudo é, em grande parte, irreversível.

A prevenção da aterosclerose funciona em dois níveis:

**Prevenção primária** — para pacientes que ainda não tiveram nenhum evento cardiovascular, mas que têm fatores de risco. O objetivo é impedir que a doença progrida a ponto de causar um infarto ou AVC. Isso envolve controle de pressão arterial, tratamento do colesterol, cessação do tabagismo, controle do diabetes e mudanças no estilo de vida.

**Prevenção secundária** — para pacientes que já tiveram um infarto, AVC ou outra manifestação de doença cardiovascular. Aqui, o risco de um novo evento é muito maior, e as metas terapêuticas são mais rigorosas. O objetivo é estabilizar as placas existentes, reduzir a inflamação e evitar a progressão da doença.

Como **cardiologista preventivo em São Paulo**, o Dr. Bruno Mioto trabalha com ambos os perfis — identificando riscos antes que se tornem eventos e intensificando o tratamento em quem já passou por uma complicação cardiovascular.

## A importância de atingir metas — e por que "mais ou menos" não é suficiente

Um dos conceitos mais importantes — e frequentemente subestimados — na cardiologia moderna é o de **metas terapêuticas**. Não basta tratar o colesterol: é preciso saber qual é o alvo de LDL para aquele paciente específico, e garantir que ele seja atingido.

As diretrizes cardiovasculares estabelecem metas individualizadas de acordo com o risco cardiovascular global do paciente:

| Categoria de risco | Meta de LDL-colesterol |
|---|---|
| Baixo risco | < 115 mg/dL |
| Risco intermediário | < 100 mg/dL |
| Alto risco | < 70 mg/dL |
| Risco muito alto (ex: pós-infarto) | < 50 mg/dL |
| Risco extremo (ex: novo evento em uso de estatina) | < 40 mg/dL |

Por que isso importa? Porque existe uma relação direta entre o nível de LDL e o risco cardiovascular: **cada redução de 1 mmol/L no LDL (aproximadamente 39 mg/dL) reduz o risco de eventos cardiovasculares maiores em cerca de 22%**. Quanto mais baixo o LDL — especialmente em pacientes de alto risco —, maior a proteção.

O mesmo raciocínio se aplica à pressão arterial. A meta para a maioria dos pacientes hipertensos é abaixo de 130/80 mmHg. Para pacientes com doença renal crônica ou alto risco cardiovascular, pode ser ainda mais rigorosa. Chegar "perto" da meta não é o mesmo que atingi-la — e essa diferença, ao longo de anos, se traduz em eventos cardiovasculares prevenidos ou não.

A adesão ao tratamento é outro fator crítico. Estudos mostram que uma parcela significativa dos pacientes abandona a medicação nos primeiros meses, frequentemente por efeitos colaterais percebidos ou pela falsa sensação de que "já estão bem". O acompanhamento estruturado — com consultas regulares, revisão de exames e ajuste de tratamento — é o que garante que as metas sejam não apenas definidas, mas mantidas ao longo do tempo.

## Como é feito o diagnóstico?

A aterosclerose pode ser detectada antes de causar sintomas por meio de exames específicos. Os mais utilizados na prática clínica são:

**Escore de cálcio coronário (CAC):** exame de tomografia que quantifica a calcificação nas artérias coronárias. É um dos melhores preditores de risco cardiovascular disponíveis — um escore elevado indica doença aterosclerótica estabelecida, mesmo sem sintomas.

**Espessura íntima-média carotídea (EIMC):** ultrassom das carótidas que mede o espessamento da parede arterial — um marcador precoce de aterosclerose subclínica.

**Índice tornozelo-braquial (ITB):** relação entre a pressão arterial no tornozelo e no braço. Valores baixos indicam doença arterial periférica, que é uma manifestação da aterosclerose nos membros inferiores.

**Perfil lipídico completo:** além do LDL e HDL convencionais, a dosagem de apolipoproteína B (ApoB) e lipoproteína(a) [Lp(a)] oferece uma avaliação mais precisa do risco em pacientes selecionados.

A escolha dos exames depende do perfil clínico de cada paciente. Como **cardiologista especialista em Aterosclerose**, o Dr. Bruno Mioto avalia quais investigações são necessárias em cada caso — evitando tanto o subdiagnóstico quanto exames desnecessários.

## Tratamento: medicamentos e estilo de vida

O tratamento da aterosclerose é sempre combinado: mudanças no estilo de vida e, na maioria dos casos, medicamentos.

**Estilo de vida:**
- Alimentação com redução de gorduras saturadas e trans, aumento de fibras, vegetais e gorduras insaturadas (azeite, oleaginosas, peixes)
- Atividade física regular — pelo menos 150 minutos por semana de atividade moderada
- Cessação do tabagismo — o tabaco acelera a progressão da aterosclerose e aumenta o risco de ruptura de placa
- Controle do peso e da circunferência abdominal
- Manejo do estresse e sono adequado

**Medicamentos:**
- **Estatinas:** são a base do tratamento do colesterol e têm evidência robusta de redução de eventos cardiovasculares. Agem reduzindo a produção hepática de LDL e têm efeito anti-inflamatório nas placas.
- **Ezetimiba:** reduz a absorção intestinal de colesterol e é frequentemente combinada com estatinas para atingir metas mais rigorosas.
- **Inibidores de PCSK9 (evolocumabe, alirocumabe):** medicamentos injetáveis de alta eficácia para pacientes de risco muito alto que não atingem a meta com estatina + ezetimiba.
- **Anti-hipertensivos, antidiabéticos e antiagregantes plaquetários:** conforme o perfil de risco individual.

A escolha e o ajuste dos medicamentos devem ser feitos de forma individualizada, considerando o perfil de risco, as comorbidades, a tolerância e as metas a serem atingidas.

## Aterosclerose tem cura?

A aterosclerose não tem cura no sentido de reversão completa — as placas formadas ao longo de décadas não desaparecem. Mas ela pode ser **estabilizada e controlada**. Com tratamento adequado, as placas tornam-se mais estáveis (menos propensas a se romper), a progressão da doença é interrompida e o risco de infarto e AVC cai significativamente.

Alguns estudos mostram inclusive **regressão parcial** das placas com tratamento intensivo de LDL — especialmente com inibidores de PCSK9. Isso reforça a importância de atingir metas rigorosas e mantê-las ao longo do tempo.

## Conclusão: prevenção é uma decisão que se toma hoje

A aterosclerose é uma doença que se constrói ao longo de décadas — e que pode ser prevenida, controlada e estabilizada com as ferramentas que a medicina atual oferece. O problema é que, sem sintomas, é fácil adiar a avaliação e o tratamento.

A decisão de cuidar do coração não precisa esperar um infarto. Ela pode — e deve — ser tomada hoje, com uma avaliação cardiológica completa, estratificação de risco e definição de metas individualizadas.

Se você está em São Paulo e quer uma avaliação com um **cardiologista no Jardins** especializado em prevenção cardiovascular, o consultório do Dr. Bruno Mioto está localizado na Rua Mato Grosso, 306 — conjunto 71, Higienópolis. O agendamento pode ser feito pelo WhatsApp ou telefone.

Cuide do seu coração antes que ele precise pedir socorro.`;

const now = new Date();
const id = 70001;

await conn.execute(
  `INSERT INTO blog_posts (id, title, slug, excerpt, content, categoryId, coverImage, published, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
   ON DUPLICATE KEY UPDATE title=VALUES(title), slug=VALUES(slug), excerpt=VALUES(excerpt), content=VALUES(content), updatedAt=VALUES(updatedAt)`,
  [id, title, slug, excerpt, content, categoryId, coverImage, now, now]
);

console.log('Artigo inserido com sucesso! ID:', id, '| Slug:', slug);
await conn.end();
