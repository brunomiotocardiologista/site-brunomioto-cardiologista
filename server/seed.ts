import mysql from "mysql2/promise";

const CATEGORIES = [
  { id: 1, name: "Cardiologia", slug: "cardiologia" },
  { id: 2, name: "Prevenção", slug: "prevencao" },
  { id: 3, name: "Estilo de Vida", slug: "estilo-de-vida" },
  { id: 4, name: "Hipertensão", slug: "hipertensao" },
  { id: 5, name: "Colesterol", slug: "colesterol" },
  { id: 6, name: "Serviços", slug: "servicos" },
];

const POSTS = [
  {
    id: 1,
    title: "Eletrocardiograma: o que é, para que serve e quando fazer",
    slug: "eletrocardiograma-o-que-e-para-que-serve-e-quando-fazer",
    excerpt: "O eletrocardiograma (ECG) é um dos exames mais solicitados na cardiologia. Entenda como funciona, o que ele detecta e em quais situações ele é indicado.",
    categoryId: 1,
    coverImage: "/eletrocardiograma-cover.webp",
    content: `## O que é o eletrocardiograma?

O eletrocardiograma (ECG) é um exame que registra a atividade elétrica do coração ao longo do tempo. Por meio de eletrodos posicionados no tórax, nos pulsos e nos tornozelos, o aparelho capta os impulsos elétricos que coordenam cada batimento cardíaco e os transforma em um traçado gráfico — a "linha do coração" que aparece nos filmes e séries médicas.

O exame é rápido, indolor, não invasivo e fornece informações valiosas sobre o funcionamento do coração em repouso. Leva cerca de 5 a 10 minutos para ser realizado e não exige preparo especial.

## O que o ECG detecta?

O eletrocardiograma é útil para identificar uma série de condições cardíacas:

- **Arritmias cardíacas** — alterações no ritmo ou na frequência dos batimentos (bradicardia, taquicardia, fibrilação atrial, bloqueios)
- **Infarto agudo do miocárdio** — o ECG pode mostrar sinais de infarto em curso ou de infarto antigo (sequela)
- **Sobrecarga cardíaca** — aumento das câmaras do coração (ventrículos e átrios)
- **Distúrbios de condução** — bloqueios no sistema elétrico do coração
- **Alterações por medicamentos ou eletrólitos** — potássio e magnésio, por exemplo, afetam o traçado elétrico
- **Pericardite** — inflamação do saco que envolve o coração

É importante saber que o ECG em repouso tem limitações: ele registra o coração apenas naquele momento. Um ECG normal não exclui doença coronariana — um paciente pode ter obstrução significativa nas artérias e ter um ECG absolutamente normal em repouso.

## Quando o ECG é indicado?

O eletrocardiograma é solicitado em diversas situações clínicas, como **cardiologista em São Paulo**, o Dr. Bruno Mioto avalia individualmente:

- Avaliação pré-operatória (especialmente em pacientes com fatores de risco cardiovascular ou acima de 40 anos)
- Check-up cardiológico de rotina
- Investigação de palpitações, tontura ou síncope (desmaio)
- Dor no peito ou falta de ar
- Hipertensão arterial (para avaliar sobrecarga ventricular)
- Monitoramento de pacientes com doença cardíaca conhecida
- Avaliação antes de iniciar atividade física intensa

## ECG x Holter x Teste ergométrico: qual a diferença?

O ECG convencional captura apenas alguns segundos de atividade elétrica. Em casos onde a arritmia é esporádica, pode ser necessário um **Holter de 24 horas** — um monitor portátil que registra o coração continuamente por 24 a 48 horas.

Já o **teste ergométrico** (ou "esteira") combina o ECG com exercício físico progressivo, permitindo identificar isquemia (falta de sangue no coração) que só aparece sob esforço. É um exame diferente e com indicações específicas.

## O ECG substitui outros exames cardíacos?

Não. O ECG é um exame de triagem — muito útil, barato e amplamente disponível, mas com limitações. Ele integra uma avaliação cardiológica completa que pode incluir ecocardiograma, exames laboratoriais, teste ergométrico ou outros exames de imagem, conforme a necessidade clínica de cada paciente.

Se você está em Pinheiros, São Paulo, e quer realizar um check-up cardiológico completo com um **cardiologista em Pinheiros**, o consultório do Dr. Bruno Mioto está disponível para avaliação personalizada.`,
  },
  {
    id: 2,
    title: "Hipertensão arterial: o que é, sintomas, causas e tratamento",
    slug: "pressao-alta-o-que-e-hipertensao-arterial-e-como-controlar",
    excerpt: "A hipertensão arterial afeta cerca de 35% dos adultos brasileiros e é a principal causa de infarto, AVC e insuficiência renal. Entenda como reconhecer, diagnosticar e tratar a pressão alta.",
    categoryId: 4,
    coverImage: "/hipertensao-cover.webp",
    content: `## O que é hipertensão arterial?

Hipertensão arterial — popularmente chamada de pressão alta — é uma condição em que a força do sangue contra as paredes das artérias está cronicamente elevada. O diagnóstico é feito quando a pressão arterial se mantém igual ou acima de **140/90 mmHg** em medições repetidas.

É a doença cardiovascular mais comum no Brasil: afeta cerca de 35% dos adultos e é a principal causa de infarto, AVC e insuficiência renal.

## Como a pressão arterial é classificada?

A Diretriz Brasileira de Hipertensão Arterial 2025 da Sociedade Brasileira de Cardiologia (SBC) classifica a pressão da seguinte forma:

| Classificação | Sistólica (mmHg) | Diastólica (mmHg) |
|---|---|---|
| Normal | < 120 | < 80 |
| Pré-hipertensão | 120–139 | 80–89 |
| Hipertensão estágio 1 | 140–159 | 90–99 |
| Hipertensão estágio 2 | 160–179 | 100–109 |
| Hipertensão estágio 3 | ≥ 180 | ≥ 110 |

Valores entre 120–139/80–89 mmHg são classificados como **pré-hipertensão** e já indicam necessidade de mudanças no estilo de vida e acompanhamento médico, mesmo sem diagnóstico formal de hipertensão.

## A hipertensão tem sintomas?

Na maioria dos casos, não. Por isso é chamada de "assassina silenciosa" — a pessoa convive com a pressão alta por anos sem perceber.

Quando sintomas aparecem, geralmente indicam níveis muito elevados ou complicações já instaladas:

- Dor de cabeça intensa, especialmente na nuca
- Tontura ou sensação de cabeça pesada
- Visão turva ou flashes de luz
- Sangramento nasal
- Falta de ar aos esforços

Esses sinais não são específicos e podem estar ausentes mesmo com pressão muito alta. A única forma confiável de saber é medir a pressão regularmente.

## Quais são as causas da pressão alta?

Em 90% dos casos, a hipertensão é chamada de **primária ou essencial** — sem uma causa única identificável. Ela resulta da combinação de fatores:

- Histórico familiar (genética)
- Alimentação com excesso de sal e gordura
- Sedentarismo
- Obesidade e sobrepeso
- Tabagismo e consumo excessivo de álcool
- Estresse crônico e fatores psicossociais
- Distúrbios do sono, incluindo apneia obstrutiva do sono
- Envelhecimento

Os 10% restantes têm causa identificável (**hipertensão secundária**), como doenças renais, alterações hormonais (hipotireoidismo, hiperaldosteronismo) ou uso de medicamentos como anti-inflamatórios e anticoncepcionais orais.

## Como é feito o diagnóstico?

O diagnóstico exige pelo menos duas medições elevadas em ocasiões diferentes, em repouso e com técnica adequada. O cardiologista pode solicitar:

- **MAPA** (Monitorização Ambulatorial da Pressão Arterial): registra a pressão durante 24 horas, incluindo durante o sono
- **MRPA** (Monitorização Residencial da Pressão Arterial): medições realizadas em casa ao longo de dias
- Exames laboratoriais e de imagem para avaliar impacto nos órgãos-alvo (coração, rins, olhos)

A Diretriz SBC 2025 reforça o uso de MAPA ou MRPA para confirmação diagnóstica e para identificar fenótipos como hipertensão do avental branco e hipertensão mascarada.

## Hipertensão tem cura?

A hipertensão primária não tem cura, mas tem controle eficaz. Com tratamento adequado, é possível manter a pressão em níveis seguros e prevenir complicações.

A hipertensão secundária pode ser curada ao tratar a causa de base.

## Como tratar a pressão alta?

O tratamento combina mudanças no estilo de vida com, quando necessário, medicamentos.

### Mudanças de estilo de vida

A Diretriz SBC 2025 recomenda medidas não medicamentosas para todos os pacientes com pressão acima de 120/80 mmHg:

- Reduzir o sal para menos de 5 g por dia
- Adotar dieta rica em frutas, vegetais e grãos integrais (padrão DASH)
- Praticar atividade física regular (pelo menos 150 minutos por semana)
- Manter peso adequado
- Parar de fumar
- Limitar o consumo de álcool
- Cuidar da qualidade do sono
- Gerenciar o estresse

### Medicamentos

Existem diversas classes de anti-hipertensivos: diuréticos, betabloqueadores, inibidores da ECA (IECA), bloqueadores do receptor de angiotensina (BRA) e bloqueadores de canal de cálcio. A escolha depende do perfil de cada paciente, das comorbidades e dos riscos individuais.

A meta pressórica estabelecida pela Diretriz SBC 2025 é **abaixo de 130/80 mmHg para todos os pacientes**, independentemente da idade ou risco cardiovascular. O tratamento deve ser sempre individualizado e acompanhado por um cardiologista.

## Quando procurar um cardiologista?

- Se sua pressão estiver igual ou acima de 130/80 mmHg em medições repetidas (faixa de pré-hipertensão)
- Se você tem histórico familiar de hipertensão, infarto ou AVC
- Se já tem diagnóstico, mas a pressão não está controlada
- Se apresentou qualquer sintoma mencionado acima
- Antes de iniciar atividade física intensa

Como cardiologista em São Paulo, realizo avaliação completa do risco cardiovascular, com exames e acompanhamento personalizado para cada paciente.

## FAQ — Perguntas frequentes sobre hipertensão

**Pressão 13 por 8 é alta?** Pela Diretriz SBC 2025, valores entre 120–139/80–89 mmHg são classificados como pré-hipertensão. Uma pressão de 130/80 está nessa faixa: não configura diagnóstico de hipertensão, mas indica risco aumentado e justifica mudanças no estilo de vida e acompanhamento médico.

**Posso parar o remédio quando a pressão normalizar?** Não sem orientação médica. A pressão normaliza porque o medicamento está funcionando. Suspender sem acompanhamento pode causar rebote perigoso.

**Jovem pode ter pressão alta?** Sim. A hipertensão pode surgir em qualquer idade. Em jovens, investigar causas secundárias é especialmente importante.

**Sal light é seguro para hipertenso?** Com moderação e orientação médica. O sal light substitui parte do sódio por potássio, mas não elimina a necessidade de redução global do consumo de sal.

**Estresse causa hipertensão?** O estresse agudo eleva a pressão temporariamente. O estresse crônico, assim como fatores psicossociais em geral, contribui para o desenvolvimento da hipertensão ao longo do tempo.`,
  },
  {
    id: 3,
    title: "Alimentação saudável para o coração: o que a ciência recomenda",
    slug: "alimentacao-saudavel-para-o-coracao-o-que-a-ciencia-recomenda",
    excerpt: "A dieta é um dos pilares da saúde cardiovascular. Saiba quais alimentos protegem o coração, quais devem ser evitados e como montar um padrão alimentar cardioprotetor.",
    categoryId: 3,
    coverImage: "/alimentacao-saudavel-cover.webp",
    content: `## A dieta e o coração: por que a alimentação importa tanto?

O padrão alimentar influencia diretamente os principais fatores de risco cardiovascular: colesterol, pressão arterial, glicemia, peso corporal e inflamação sistêmica. Não existe nenhum medicamento que faça o que uma dieta saudável faz — de forma sustentável, sem efeitos colaterais e com benefícios que vão muito além do coração.

A boa notícia é que não existe uma única "dieta do coração". O que a ciência cardiovascular mostrou nos últimos 30 anos é que alguns **padrões alimentares** são consistentemente associados a menor risco cardiovascular.

## O que comer para proteger o coração?

### Gorduras boas: um aliado mal compreendido

Por décadas, toda gordura foi tratada como inimiga do coração. Hoje sabemos que o tipo de gordura importa muito mais do que a quantidade.

**Gorduras insaturadas** — presentes no azeite de oliva, abacate, oleaginosas (castanhas, nozes, amêndoas) e peixes gordurosos (salmão, sardinha, atum) — têm efeito cardioprotetor. Reduzem o LDL, elevam o HDL e têm propriedades anti-inflamatórias.

**Ômega-3** — encontrado em peixes de água fria e sementes de linhaça — reduz triglicerídeos, melhora a função vascular e tem efeito antiarrítmico.

### Fibras: o nutriente esquecido

As fibras solúveis (aveia, leguminosas, frutas) reduzem a absorção de colesterol no intestino. Uma dieta rica em fibras está associada a menor risco de doenças cardíacas, diabetes e hipertensão.

### Frutas, verduras e legumes

O consumo de pelo menos 5 porções ao dia de frutas e vegetais fornece antioxidantes, potássio, folato e fibras — todos com efeitos cardiovasculares positivos.

## O que evitar ou reduzir?

- **Gorduras saturadas** (carnes gordurosas, laticínios integrais, alimentos ultraprocessados): elevam o LDL-colesterol
- **Gorduras trans** (margarinas hidrogenadas, biscoitos industrializados): elevam o LDL e reduzem o HDL
- **Sal em excesso**: principal fator dietético de hipertensão arterial
- **Açúcar e carboidratos refinados**: elevam triglicerídeos e contribuem para resistência à insulina
- **Álcool em excesso**: eleva a pressão arterial e os triglicerídeos

## Qual dieta seguir? Dieta Mediterrânea ou DASH?

Ambas têm evidência científica robusta de benefício cardiovascular.

A **Dieta Mediterrânea** enfatiza azeite de oliva, peixes, leguminosas, cereais integrais, frutas e vegetais, com consumo moderado de vinho tinto. Mostrou redução significativa de eventos cardiovasculares no estudo PREDIMED.

A **Dieta DASH** (Dietary Approaches to Stop Hypertension) foi desenvolvida especificamente para reduzir a pressão arterial: rica em frutas, vegetais, laticínios com baixo teor de gordura e cereais integrais, com redução de sódio, gordura saturada e açúcar.

Na prática, ambas compartilham os mesmos pilares: alimentos naturais, gorduras de qualidade, fibras e redução de ultraprocessados.

## Alimentação e colesterol: o que realmente funciona?

Contrariando o senso comum, o consumo de ovos moderado (até 1 por dia) não eleva significativamente o LDL na maioria das pessoas. O maior impacto no colesterol vem da gordura saturada e trans, não do colesterol dietético.

Para quem tem colesterol alto, a combinação de dieta adequada com medicação (quando indicada) pelo **cardiologista em São Paulo** é a estratégia mais eficaz. A dieta isolada reduz o LDL em cerca de 10-20%; medicamentos como as estatinas podem reduzir 40-60%.`,
  },
  {
    id: 4,
    title: "Colesterol alto: entenda os números e as metas que realmente importam",
    slug: "colesterol-alto-entenda-os-numeros-e-as-metas-que-realmente-importam",
    excerpt: "Colesterol alto não é tudo igual. Entenda a diferença entre LDL, HDL e triglicerídeos, por que as metas variam de paciente para paciente e o que fazer quando os números estão fora do ideal.",
    categoryId: 5,
    coverImage: "/colesterol-alto-cover.webp",
    content: `## O que é colesterol e por que ele importa?

O colesterol é uma gordura produzida pelo fígado e obtida através da alimentação. É essencial para o organismo — faz parte da membrana de todas as células, é precursor de hormônios e da vitamina D. O problema não é o colesterol em si, mas seu excesso e, especialmente, o tipo de partícula que o transporta.

## LDL, HDL e triglicerídeos: o que cada um significa?

**LDL (colesterol "ruim"):** é o principal alvo do tratamento cardiovascular. Quando em excesso, o LDL penetra na parede das artérias, oxida-se e desencadeia a formação de placas ateroscleróticas. Quanto mais alto o LDL — e por mais tempo — maior o risco de infarto e AVC.

**HDL (colesterol "bom"):** remove o colesterol das artérias e o leva de volta ao fígado para ser eliminado. Níveis baixos de HDL (abaixo de 40 mg/dL em homens e 50 mg/dL em mulheres) são fator de risco independente para doenças cardiovasculares.

**Triglicerídeos:** gorduras circulantes no sangue, fortemente influenciadas por carboidratos refinados, açúcar e álcool. Níveis elevados (acima de 150 mg/dL) aumentam o risco cardiovascular, especialmente quando associados a LDL alto e HDL baixo.

**Colesterol não-HDL:** soma de todas as partículas aterogênicas (LDL + VLDL). É um marcador mais completo que o LDL isolado.

## Quais são as metas de LDL?

As metas de LDL são **individualizadas** de acordo com o risco cardiovascular global. Não existe uma meta única para todos:

| Categoria de risco | Meta de LDL-colesterol |
|---|---|
| Baixo risco | < 115 mg/dL |
| Risco intermediário | < 100 mg/dL |
| Alto risco | < 70 mg/dL |
| Risco muito alto (ex: pós-infarto) | < 50 mg/dL |
| Risco extremo (novo evento em uso de estatina) | < 40 mg/dL |

Por isso, saber apenas que o colesterol está "alterado" não é suficiente. O que importa é saber **qual é a sua meta**, dado o seu perfil de risco. Um LDL de 90 mg/dL pode ser ótimo para uma pessoa de baixo risco e insuficiente para um paciente pós-infarto.

## Como calcular o risco cardiovascular?

O risco cardiovascular é calculado com base em vários fatores: idade, sexo, pressão arterial, colesterol, tabagismo, diabetes, histórico familiar. Existem escores validados (como o Escore de Risco Global ou o Pooled Cohort Equations) que estimam a probabilidade de um evento cardiovascular nos próximos 10 anos.

Essa estratificação é feita pelo **cardiologista** e determina quão agressivo deve ser o tratamento.

## Quando tratar com medicamento?

A decisão de iniciar um medicamento para colesterol não depende apenas dos números — depende do risco cardiovascular global do paciente. Para alguns, mudanças no estilo de vida são suficientes. Para outros, especialmente pacientes de alto risco, a medicação é indispensável mesmo com colesterol "apenas levemente elevado".

As **estatinas** são os medicamentos mais usados e com melhor evidência de redução de eventos cardiovasculares. Quando a meta não é atingida com estatina, pode-se adicionar ezetimiba ou inibidores de PCSK9.

Se você quer entender seu perfil lipídico e saber se seu tratamento está adequado, agende uma consulta com o Dr. Bruno Mioto, **cardiologista em São Paulo** especializado em prevenção cardiovascular e dislipidemia.`,
  },
  {
    id: 5,
    title: "Infarto do miocárdio: sintomas, prevenção e o que fazer em uma emergência",
    slug: "infarto-do-miocardio-sintomas-prevencao-e-o-que-fazer-em-emergencia",
    excerpt: "O infarto é uma emergência médica em que cada minuto conta. Conheça os sintomas, os fatores de risco e o que fazer diante de uma suspeita de infarto.",
    categoryId: 1,
    coverImage: "/infarto-cover.webp",
    content: `## O que é um infarto?

O infarto agudo do miocárdio ocorre quando o fluxo de sangue para uma parte do músculo cardíaco é interrompido — geralmente pela ruptura de uma placa aterosclerótica seguida de formação de um coágulo. Sem sangue, as células do coração começam a morrer em minutos. Quanto mais tempo leva para restaurar o fluxo, maior o dano permanente ao músculo cardíaco.

"Tempo é músculo" — essa frase resume a urgência do tratamento do infarto.

## Quais são os sintomas?

O sintoma clássico é a **dor ou pressão no peito**, frequentemente descrita como uma sensação de aperto, queimação ou peso. Mas o infarto pode se apresentar de formas variadas:

**Sintomas típicos:**
- Dor ou pressão no centro do peito, que pode irradiar para o braço esquerdo, pescoço, mandíbula ou costas
- Dor que dura mais de 15–20 minutos
- Suor frio e náusea associados à dor

**Sintomas atípicos (mais comuns em mulheres, diabéticos e idosos):**
- Falta de ar sem dor no peito
- Dor abdominal ou na mandíbula isolada
- Cansaço intenso e incomum
- Tontura ou mal-estar

Nunca ignore uma dor no peito persistente. Na dúvida, acione o SAMU (192) ou vá ao pronto-socorro imediatamente.

## O que fazer diante de suspeita de infarto?

1. **Ligue imediatamente para o SAMU (192)** ou peça para ser levado ao pronto-socorro mais próximo
2. **Não dirija você mesmo** — o risco de perder a consciência é real
3. **Não espere os sintomas passarem** — cada minuto sem tratamento significa mais músculo cardíaco perdido
4. **Mastigue um comprimido de AAS 100mg** se disponível e não houver contraindicação (alergia ou sangramento ativo) — isso pode reduzir o tamanho do coágulo

## Fatores de risco para infarto

Os principais fatores de risco modificáveis são:
- Hipertensão arterial não controlada
- Colesterol LDL elevado (especialmente sem atingir metas)
- Diabetes mellitus
- Tabagismo
- Obesidade e sedentarismo
- Estresse crônico

A prevenção é sempre melhor do que o tratamento. Como **cardiologista preventivo em São Paulo**, o Dr. Bruno Mioto trabalha com estratificação de risco cardiovascular e tratamento intensivo dos fatores de risco — para que o infarto nunca aconteça.

## Vida após o infarto

Sobreviver ao infarto é apenas o primeiro passo. A prevenção secundária — evitar um novo evento — é tão ou mais importante que o tratamento agudo. Isso inclui medicação rigorosa (estatinas, antiagregantes plaquetários, beta-bloqueadores, entre outros), reabilitação cardíaca e controle intensivo dos fatores de risco.

Um acompanhamento especializado com **cardiologista em Pinheiros** é fundamental para garantir que as metas terapêuticas sejam atingidas e mantidas após o infarto.`,
  },
  {
    id: 6,
    title: "Check-up cardiológico: quando fazer e o que esperar",
    slug: "check-up-cardiologico-quando-fazer-e-o-que-esperar",
    excerpt: "O check-up cardiológico é uma avaliação preventiva que identifica riscos antes que eles causem problemas. Saiba quando fazer, quais exames esperar e por que ele é essencial.",
    categoryId: 2,
    coverImage: "/check-up-cover.webp",
    content: `## O que é um check-up cardiológico?

O check-up cardiológico é uma avaliação preventiva do coração e do sistema cardiovascular. Seu objetivo é identificar fatores de risco, detectar doenças em fase inicial — quando o tratamento é mais eficaz — e orientar medidas preventivas personalizadas.

Não é um exame único. É um conjunto de avaliações clínicas e exames complementares escolhidos de acordo com o perfil de cada paciente: idade, sexo, histórico familiar, fatores de risco conhecidos e queixas específicas.

## Quem deve fazer?

Qualquer adulto se beneficia de uma avaliação cardiológica periódica. Mas algumas situações tornam o check-up especialmente importante:

- Homens a partir de 40 anos
- Mulheres a partir de 45–50 anos (ou após a menopausa)
- Pessoas com histórico familiar de infarto ou morte súbita antes dos 55 anos (homens) ou 65 anos (mulheres)
- Pacientes com diabetes, hipertensão ou colesterol elevado
- Fumantes ou ex-fumantes
- Pessoas com obesidade ou sobrepeso
- Qualquer pessoa que deseja iniciar atividade física intensa
- Pacientes com palpitações, falta de ar ou dor no peito, mesmo que esporádicos

## O que é avaliado em um check-up cardiológico?

**Consulta clínica:** história completa, incluindo sintomas, histórico familiar, medicamentos em uso, estilo de vida, fatores de risco. Exame físico com aferição da pressão arterial, ausculta cardíaca e pulmonar, avaliação dos pulsos periféricos.

**Exames laboratoriais:** perfil lipídico completo (LDL, HDL, triglicerídeos, colesterol total), glicemia de jejum, hemograma, função renal e hepática, TSH (tireoide), entre outros conforme indicação.

**Eletrocardiograma (ECG):** avalia o ritmo cardíaco, possíveis alterações elétricas, sequelas de infarto e sobrecarga das câmaras.

**Ecocardiograma:** ultrassom do coração que avalia a estrutura e função cardíaca — tamanho das câmaras, espessura das paredes, função dos ventrículos e das valvas.

**Teste ergométrico:** avalia o comportamento da pressão e do ritmo durante o esforço físico, e pode detectar isquemia (falta de fluxo coronariano) que só aparece sob esforço.

**Outros exames:** escore de cálcio coronário, Holter 24h, mapa de pressão arterial — conforme a indicação clínica.

## Com que frequência fazer?

Para pacientes de baixo risco sem queixas, uma avaliação a cada 2–3 anos costuma ser suficiente. Para quem tem fatores de risco ou está em tratamento de condição cardiovascular, o acompanhamento pode ser anual ou mais frequente.

O Dr. Bruno Mioto, **cardiologista em São Paulo**, oferece check-up cardiológico personalizado, com avaliação clínica detalhada e solicitação criteriosamente individualizada de exames — sem excessos, sem subdiagnóstico.`,
  },
  {
    id: 7,
    title: "Atividade física e saúde do coração: benefícios, cuidados e como começar",
    slug: "atividade-fisica-e-saude-do-coracao-beneficios-cuidados-e-como-comecar",
    excerpt: "O exercício físico é um dos mais poderosos protetores cardiovasculares disponíveis. Mas há cuidados importantes antes de começar. Entenda os benefícios e como fazer de forma segura.",
    categoryId: 3,
    coverImage: "/atividade-fisica-cover.webp",
    content: `## Por que o exercício protege o coração?

A atividade física regular é um dos pilares mais sólidos da saúde cardiovascular. Os benefícios são múltiplos e cientificamente comprovados:

- **Reduz a pressão arterial** — o exercício aeróbico regular reduz a pressão sistólica em média 5–7 mmHg em hipertensos
- **Melhora o perfil lipídico** — eleva o HDL (colesterol "bom") e reduz triglicerídeos
- **Controla o peso** — reduz gordura abdominal, um importante fator de risco cardiovascular
- **Melhora a sensibilidade à insulina** — protege contra diabetes tipo 2
- **Reduz a inflamação** — marcadores inflamatórios como a PCR tendem a cair com exercício regular
- **Fortalece o músculo cardíaco** — o coração de quem se exercita bate com mais eficiência
- **Reduz o estresse** — com impacto direto na pressão arterial e no risco cardiovascular

Estudos mostram que pessoas sedentárias têm risco cardiovascular de 1,5 a 2 vezes maior do que pessoas ativas. E o benefício começa cedo: mesmo caminhadas leves de 30 minutos por dia já reduzem o risco de eventos cardiovasculares.

## Quanto exercício é necessário?

As diretrizes cardiovasculares recomendam:

- **Pelo menos 150 minutos por semana** de exercício aeróbico de intensidade moderada (caminhada rápida, natação, ciclismo) **OU**
- **75 minutos por semana** de exercício de alta intensidade (corrida, HIIT)
- **Mais 2 sessões por semana** de exercícios de resistência (musculação, pilates)

Para quem está sedentário, qualquer quantidade de exercício é melhor do que nenhuma. O objetivo é progredir gradualmente.

## Preciso de avaliação médica antes de começar?

**Sim — especialmente se:**
- Você tem mais de 40 anos e está sedentário
- Tem fatores de risco conhecidos (hipertensão, diabetes, colesterol alto)
- Tem histórico familiar de infarto ou morte súbita precoce
- Planeja iniciar atividade física intensa
- Sente qualquer sintoma durante esforço (dor no peito, falta de ar desproporcional, palpitações, tontura)

A avaliação pré-participação com **cardiologista em São Paulo** inclui anamnese detalhada, ECG e, em alguns casos, teste ergométrico — para garantir que o exercício seja seguro e eficaz.

## Musculação faz mal para o coração?

Não, desde que feita corretamente e com avaliação prévia adequada. O exercício de resistência tem benefícios complementares ao aeróbico: melhora a composição corporal, reduz a resistência à insulina e contribui para o controle da pressão arterial a longo prazo. Hipertensos não controlados devem evitar cargas muito elevadas, mas o exercício de resistência moderado é seguro e benéfico para a grande maioria dos pacientes.

## Morte súbita no esporte: risco real ou mito?

A morte súbita durante o exercício é rara, mas real — e tem causas diferentes dependendo da faixa etária. Em jovens (abaixo de 35 anos), geralmente está relacionada a doenças cardíacas estruturais congênitas não diagnosticadas. Em adultos mais velhos, a principal causa é a doença coronariana (aterosclerose).

A avaliação médica pré-participação existe exatamente para identificar condições que contraindiquem o exercício intenso — e são relativamente raras. Para a grande maioria das pessoas, o benefício do exercício supera em muito qualquer risco.`,
  },
  {
    id: 8,
    title: "Avaliação pré-operatória cardiológica: o que é e quando é necessária",
    slug: "avaliacao-pre-operatoria-cardiologica-o-que-e-e-quando-e-necessaria",
    excerpt: "Antes de uma cirurgia, o cardiologista avalia o risco cardíaco e define se o paciente está em condições seguras para o procedimento. Entenda como funciona essa avaliação.",
    categoryId: 6,
    coverImage: "/preop-cover.webp",
    content: `## O que é a avaliação pré-operatória cardiológica?

A avaliação pré-operatória cardiológica é uma consulta especializada realizada antes de procedimentos cirúrgicos para identificar riscos cardíacos e definir as condições de segurança para a anestesia e a cirurgia.

Seu objetivo não é autorizar ou vetar uma cirurgia — essa decisão é do cirurgião e do anestesista. O papel do cardiologista é fornecer uma avaliação detalhada do risco cardiovascular e, quando necessário, otimizar o tratamento antes do procedimento.

## Quando é necessária?

A indicação de avaliação cardiológica pré-operatória depende de três fatores: o tipo de cirurgia, o estado clínico do paciente e os fatores de risco presentes.

**Cirurgias de alto risco cardiovascular** (cirurgias vasculares, torácicas, abdominais complexas) podem indicar avaliação cardiológica independentemente da idade ou condição do paciente.

**Pacientes com condições cardíacas ativas** (angina instável, insuficiência cardíaca descompensada, arritmias graves, valvopatias severas) precisam de avaliação e estabilização antes de qualquer cirurgia eletiva.

**Fatores de risco cardiovascular** (diabetes, doença renal crônica, histórico de infarto ou AVC, insuficiência cardíaca, doença coronariana conhecida) aumentam o risco perioperatório e podem indicar avaliação especializada.

Em geral, pacientes acima de 45 anos submetidos a cirurgias de médio ou alto risco se beneficiam de avaliação cardiológica.

## O que é avaliado?

A consulta inclui:

- Anamnese detalhada: histórico cardíaco, medicamentos em uso, capacidade funcional (o quanto o paciente consegue se esforçar sem sintomas)
- Exame físico com aferição da pressão e ausculta cardíaca
- Análise dos exames já disponíveis
- Solicitação de exames complementares quando indicado: ECG, ecocardiograma, Holter, teste ergométrico ou de imagem

## Capacidade funcional: um conceito importante

Um dos critérios mais importantes na avaliação pré-operatória é a **capacidade funcional** do paciente, medida em equivalentes metabólicos (METs). Pacientes que conseguem realizar atividades equivalentes a subir dois lances de escada sem sintomas têm risco peri-operatório significativamente menor.

## O que acontece após a avaliação?

O cardiologista emite um laudo com o risco cardiovascular estimado, as condições clínicas do paciente e as recomendações para o período perioperatório — como ajustes de medicamentos (anticoagulantes, anti-hipertensivos, antidiabéticos) e monitoramento pós-operatório.

Em alguns casos, pode ser necessário otimizar o tratamento antes da cirurgia ou postergar o procedimento eletivo para estabilização clínica.

O Dr. Bruno Mioto realiza avaliação pré-operatória cardiológica em São Paulo, com resposta ágil e laudo detalhado para garantir segurança no procedimento cirúrgico.`,
  },
  {
    id: 9,
    title: "Diabetes e coração: por que o controle glicêmico é fundamental na cardiologia",
    slug: "diabetes-e-coracao-por-que-o-controle-glicemico-e-fundamental-na-cardiologia",
    excerpt: "O diabetes aumenta em 2 a 4 vezes o risco de eventos cardiovasculares. Entenda a conexão entre açúcar no sangue e saúde do coração, e por que o controle rigoroso faz diferença.",
    categoryId: 2,
    coverImage: "/diabetes-cover.webp",
    content: `## Diabetes e doenças cardiovasculares: uma conexão forte

O diabetes mellitus é um dos principais fatores de risco para doenças cardiovasculares. Pacientes diabéticos têm risco de 2 a 4 vezes maior de desenvolver doença coronariana e AVC em comparação com não diabéticos. Mulheres diabéticas têm risco cardiovascular proporcionalmente ainda mais elevado.

Por isso, o diabetes não é apenas uma doença metabólica — é uma condição cardiovascular. O cardiologista e o endocrinologista frequentemente trabalham juntos no manejo desses pacientes.

## Por que o diabetes faz mal ao coração?

O excesso de glicose no sangue causa danos às paredes dos vasos sanguíneos. Com o tempo, esse processo resulta em:

- **Aterosclerose acelerada** — as placas coronarianas progridem mais rapidamente em diabéticos
- **Disfunção endotelial** — prejuízo na função do revestimento interno das artérias
- **Estado pró-inflamatório e pró-trombótico** — maior tendência à formação de coágulos
- **Neuropatia autonômica** — pode "mascarar" sintomas de isquemia, tornando infartos silenciosos mais comuns em diabéticos
- **Cardiomiopatia diabética** — disfunção do músculo cardíaco mesmo sem doença coronariana significativa

## A importância do controle glicêmico

O controle da glicemia é fundamental para proteger o coração e os vasos. A hemoglobina glicada (HbA1c) é o principal marcador de controle: representa a média da glicemia dos últimos 3 meses. A meta habitual é HbA1c abaixo de 7%, mas pode ser individualizada.

Estudos mostraram que para cada 1% de redução na HbA1c, há redução de cerca de 21% no risco de complicações microvasculares e 14% no risco cardiovascular.

## Antidiabéticos com benefício cardiovascular

Nos últimos anos, novos medicamentos antidiabéticos mostraram benefício cardiovascular independente do controle glicêmico:

**Inibidores de SGLT-2 (empagliflozina, dapagliflozina):** reduzem hospitalização por insuficiência cardíaca e mortalidade cardiovascular. Hoje são usados também em pacientes com insuficiência cardíaca sem diabetes.

**Análogos de GLP-1 (semaglutida, liraglutida):** além do controle glicêmico e perda de peso, reduzem eventos cardiovasculares maiores em pacientes de alto risco.

A escolha do antidiabético não deve considerar apenas o controle glicêmico — deve levar em conta o perfil cardiovascular do paciente.

## O que monitorar além da glicemia?

Pacientes diabéticos têm maior risco cardiovascular global e precisam de atenção especial para outros fatores de risco:

- Pressão arterial (meta frequentemente < 130/80 mmHg)
- Colesterol LDL (metas mais rigorosas — geralmente < 70 mg/dL para diabéticos de alto risco)
- Peso e circunferência abdominal
- Função renal (microalbuminúria e TFG)
- Exame dos pés (neuropatia periférica)

Se você tem diabetes e quer avaliar seu risco cardiovascular com um **cardiologista em São Paulo**, o Dr. Bruno Mioto oferece estratificação e tratamento integrado dos fatores de risco.`,
  },
  {
    id: 10,
    title: "Obesidade e coração: como o excesso de peso afeta a saúde cardiovascular",
    slug: "obesidade-e-coracao-como-o-excesso-de-peso-afeta-a-saude-cardiovascular",
    excerpt: "A obesidade não é apenas uma questão estética. Ela impacta diretamente o coração, os vasos e o metabolismo, aumentando o risco de infarto, AVC e insuficiência cardíaca.",
    categoryId: 3,
    coverImage: "/obesidade-cover.webp",
    content: `## Obesidade como doença cardiovascular

A obesidade — definida como índice de massa corporal (IMC) acima de 30 kg/m² — é reconhecida como uma doença crônica com impacto direto e indireto no sistema cardiovascular. Não é apenas um fator de risco entre outros: ela potencializa praticamente todos os outros fatores de risco.

Pessoas com obesidade têm risco significativamente maior de desenvolver hipertensão, diabetes tipo 2, colesterol alto, apneia do sono, doença coronariana, insuficiência cardíaca e fibrilação atrial.

## Como a gordura afeta o coração?

O tecido adiposo — especialmente a gordura visceral (abdominal) — não é inerte. Ele produz substâncias inflamatórias, interfere na sensibilidade à insulina e eleva a pressão arterial. A gordura ao redor do coração (gordura epicárdica) tem efeitos locais diretos sobre a função cardíaca.

**Mecanismos cardiovasculares da obesidade:**
- Aumento do volume de sangue circulante → maior sobrecarga para o coração
- Hipertensão arterial → espessamento das paredes ventriculares
- Resistência à insulina → diabetes e aterosclerose
- Inflamação sistêmica crônica → dano endotelial e aterosclerose
- Apneia do sono → episódios noturnos de queda de oxigenação e aumento do risco de arritmias
- Fibrilação atrial → risco aumentado com aumento do IMC

## Gordura visceral x IMC: o que importa mais?

O IMC é um indicador prático, mas imperfeito. A gordura visceral (abdominal) tem impacto cardiovascular maior do que a gordura subcutânea (aquela "que aparece"). Por isso, a circunferência abdominal é um marcador importante: acima de 94 cm em homens e 80 cm em mulheres indica risco aumentado.

Existe ainda o fenômeno do "obeso metabolicamente saudável" — pessoas com IMC elevado mas sem alterações metabólicas —, mas estudos mostram que mesmo esse grupo tem risco cardiovascular maior que pessoas com peso normal a longo prazo.

## Quanto a perda de peso beneficia o coração?

A boa notícia: mesmo perdas modestas de peso (5–10% do peso corporal) produzem benefícios cardiovasculares mensuráveis:

- Redução da pressão arterial
- Melhora do perfil lipídico
- Redução da glicemia e da resistência à insulina
- Diminuição da inflamação sistêmica
- Melhora da apneia do sono
- Redução da massa ventricular esquerda

## Tratamento da obesidade: além da dieta

O tratamento da obesidade é multidisciplinar. A dieta e o exercício são a base, mas em muitos casos precisam ser complementados por:

**Medicamentos antiobesidade:** como semaglutida (GLP-1), que além de promover perda de peso tem benefícios cardiovasculares comprovados.

**Cirurgia bariátrica:** para pacientes com IMC ≥ 40, ou ≥ 35 com comorbidades, quando o tratamento clínico falhou. A cirurgia bariátrica reduz significativamente eventos cardiovasculares em longo prazo.

O Dr. Bruno Mioto inclui o tratamento da obesidade como parte integral do cuidado cardiovascular em São Paulo, reconhecendo que controlar o peso é tão importante quanto controlar a pressão ou o colesterol.`,
  },
  {
    id: 11,
    title: "Insuficiência cardíaca: o que é, sintomas e tratamento",
    slug: "insuficiencia-cardiaca-o-que-e-sintomas-e-tratamento",
    excerpt: "A insuficiência cardíaca afeta mais de 3 milhões de brasileiros. Entenda o que acontece quando o coração não consegue bombear sangue de forma eficiente e como o tratamento moderno mudou o prognóstico.",
    categoryId: 1,
    coverImage: "/insuficiencia-cardiaca-cover.webp",
    content: `## O que é insuficiência cardíaca?

A insuficiência cardíaca (IC) é uma síndrome clínica em que o coração não consegue bombear sangue suficiente para atender às demandas do organismo — ou só consegue fazê-lo com pressões elevadas dentro do coração. É importante entender que "insuficiência" não significa que o coração parou: significa que ele funciona de forma insuficiente para as necessidades do corpo.

É uma das condições cardíacas mais prevalentes e com maior impacto na qualidade de vida. No Brasil, estima-se que mais de 3 milhões de pessoas tenham IC diagnosticada.

## Causas mais comuns

- Doença coronariana (infarto prévio que danificou o músculo cardíaco)
- Hipertensão arterial crônica não controlada
- Cardiomiopatia dilatada (dilatação do coração de diversas causas)
- Valvopatias (doenças das válvulas cardíacas)
- Arritmias crônicas, especialmente fibrilação atrial
- Diabetes mellitus
- Uso excessivo de álcool ou determinadas drogas

## Sintomas: como reconhecer?

**Sintomas típicos:**
- Falta de ar ao esforço (que piora progressivamente — o que antes era possível, agora cansa)
- Falta de ar deitado (ortopneia) — o paciente precisa de mais travesseiros para dormir
- Edema (inchaço) nos pés e pernas
- Cansaço desproporcional ao esforço

**Sintomas menos típicos:**
- Tosse seca à noite
- Ganho de peso rápido (por retenção de líquido)
- Sensação de peso ou desconforto abdominal
- Redução do apetite

## Tipos de insuficiência cardíaca

**IC com fração de ejeção reduzida (ICFEr):** o coração dilata e perde força para contrair. Fração de ejeção abaixo de 40%. É o tipo com mais opções terapêuticas com evidência sólida.

**IC com fração de ejeção preservada (ICFEp):** o coração contrai normalmente, mas fica "rígido" e não relaxa bem. Fração de ejeção acima de 50%. Mais comum em mulheres, hipertensos e idosos.

## Tratamento moderno

O tratamento da IC evoluiu enormemente. Para a ICFEr, existe o chamado "quarteto da IC" — quatro classes de medicamentos com evidência de redução de mortalidade:

1. **Betabloqueadores** (carvedilol, bisoprolol)
2. **IECA ou BRA** (enalapril, losartana) ou ARNI (sacubitril/valsartana)
3. **Antagonistas da aldosterona** (espironolactona)
4. **Inibidores de SGLT-2** (dapagliflozina, empagliflozina)

Quando bem tratada, a IC tem seu prognóstico significativamente melhorado. O acompanhamento com **cardiologista em São Paulo** é essencial para garantir que o tratamento esteja otimizado e que as descompensações sejam identificadas precocemente.`,
  },
  {
    id: 12,
    title: "Fibrilação atrial: o que é, riscos e tratamento",
    slug: "fibrilacao-atrial-o-que-e-riscos-e-tratamento",
    excerpt: "A fibrilação atrial é a arritmia cardíaca mais comum e um dos principais fatores de risco para AVC. Entenda como ela ocorre, como é diagnosticada e quais são as opções de tratamento.",
    categoryId: 1,
    coverImage: "/fibrilacao-atrial-cover.webp",
    content: `## O que é fibrilação atrial?

A fibrilação atrial (FA) é uma arritmia cardíaca caracterizada pelo disparo caótico e desorganizado dos átrios — as câmaras superiores do coração. Em vez de se contrair de forma coordenada, os átrios "tremem" de forma irregular, transmitindo impulsos elétricos desorganizados aos ventrículos.

O resultado é um ritmo cardíaco irregular e frequentemente acelerado — a sensação de "coração disparado" ou "batimento irregular" que muitos pacientes descrevem.

A FA é a arritmia sustentada mais comum na prática clínica, afetando cerca de 1-2% da população geral e até 10% dos indivíduos acima de 80 anos.

## Por que a FA é perigosa?

O principal risco da fibrilação atrial é o **AVC isquêmico**. Quando os átrios não se contraem de forma eficiente, o sangue pode ficar estagnado nessas câmaras — especialmente no apêndice atrial esquerdo — e formar coágulos. Se um coágulo se desprende e vai para o cérebro, causa um AVC.

Pacientes com FA têm risco de AVC 5 vezes maior do que a população geral. E os AVCs por FA tendem a ser mais extensos e mais incapacitantes.

Além do AVC, a FA pode causar ou agravar insuficiência cardíaca, especialmente quando a frequência cardíaca fica cronicamente elevada.

## Sintomas

Muitos pacientes com FA são **assintomáticos** — a arritmia é detectada por acaso em um ECG de rotina. Outros descrevem:

- Palpitações (sensação de coração acelerado ou irregular)
- Falta de ar, especialmente ao esforço
- Cansaço desproporcional
- Tontura ou mal-estar
- Dor no peito (menos comum)

## Tratamento

O tratamento da FA tem dois pilares principais:

**1. Prevenção do AVC:** pacientes com FA e fatores de risco cardiovascular precisam de anticoagulação. Os anticoagulantes orais diretos (apixabana, rivaroxabana, dabigatrana) são hoje preferidos por eficácia e segurança superiores à varfarina na maioria dos pacientes.

**2. Controle do ritmo ou da frequência:**
- **Controle da frequência:** manter o ritmo irregular, mas com frequência cardíaca adequada — usando betabloqueadores ou outros medicamentos
- **Controle do ritmo:** tentar restaurar e manter o ritmo sinusal (normal) — com medicamentos antiarrítmicos ou ablação por cateter

A ablação de FA é um procedimento que "queima" as células responsáveis pelos disparos anormais. Em centros experientes, tem alta taxa de sucesso e pode ser a melhor opção para pacientes sintomáticos que não respondem bem aos medicamentos.

Se você suspeita de palpitações irregulares ou foi diagnosticado com FA, consulte um **cardiologista em São Paulo** para avaliação e definição da melhor estratégia terapêutica.`,
  },
  {
    id: 13,
    title: "Aterosclerose: a doença silenciosa que você pode — e deve — prevenir",
    slug: "aterosclerose-a-doenca-silenciosa-que-voce-pode-e-deve-prevenir",
    excerpt: "A aterosclerose está por trás da maioria dos infartos e AVCs. Entenda o que é, como progride, a importância da prevenção e por que atingir metas terapêuticas pode salvar sua vida.",
    categoryId: 1,
    coverImage: "/blog-aterosclerose-cover.webp",
    content: `## O que é aterosclerose?

Aterosclerose é o acúmulo progressivo de gordura, células inflamatórias e tecido fibroso nas paredes das artérias, formando as chamadas **placas ateroscleróticas**. Com o tempo, essas placas estreitam o interior das artérias, reduzem o fluxo de sangue e podem se romper — desencadeando um infarto ou AVC.

O processo começa com uma lesão no endotélio, a camada interna das artérias. Essa lesão pode ser causada por pressão arterial elevada, colesterol alto, tabagismo, diabetes ou inflamação crônica. A partir daí, o LDL (colesterol "ruim") penetra na parede arterial, oxida-se e desencadeia uma resposta inflamatória que, ao longo de anos, consolida a placa.

O que torna a aterosclerose especialmente traiçoeira é que ela é **assintomática por décadas**. A artéria pode estar com 50%, 60%, até 70% de obstrução sem que o paciente sinta absolutamente nada. Os sintomas — dor no peito, falta de ar, dor nas pernas ao caminhar — surgem quando a doença já está avançada.

## Fatores de risco: o que acelera a aterosclerose?

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

## Por que a prevenção é o melhor tratamento?

Existe uma frase que resume bem a cardiologia preventiva: **é muito mais fácil evitar um infarto do que sobreviver a ele**. Não porque o tratamento do infarto seja ineficaz — ele evoluiu enormemente nas últimas décadas —, mas porque o dano causado ao músculo cardíaco durante um evento agudo é, em grande parte, irreversível.

A prevenção da aterosclerose funciona em dois níveis:

**Prevenção primária** — para pacientes que ainda não tiveram nenhum evento cardiovascular, mas que têm fatores de risco. O objetivo é impedir que a doença progrida a ponto de causar um infarto ou AVC.

**Prevenção secundária** — para pacientes que já tiveram um infarto, AVC ou outra manifestação de doença cardiovascular. Aqui, o risco de um novo evento é muito maior, e as metas terapêuticas são mais rigorosas.

Como **cardiologista preventivo em São Paulo**, o Dr. Bruno Mioto trabalha com ambos os perfis — identificando riscos antes que se tornem eventos e intensificando o tratamento em quem já passou por uma complicação cardiovascular.

## A importância de atingir metas terapêuticas

As diretrizes cardiovasculares estabelecem metas individualizadas de acordo com o risco cardiovascular global do paciente:

| Categoria de risco | Meta de LDL-colesterol |
|---|---|
| Baixo risco | < 115 mg/dL |
| Risco intermediário | < 100 mg/dL |
| Alto risco | < 70 mg/dL |
| Risco muito alto (ex: pós-infarto) | < 50 mg/dL |
| Risco extremo (novo evento em uso de estatina) | < 40 mg/dL |

Cada redução de 1 mmol/L no LDL reduz o risco de eventos cardiovasculares maiores em cerca de 22%. Quanto mais baixo o LDL — especialmente em pacientes de alto risco —, maior a proteção.

## Como é feito o diagnóstico?

A aterosclerose pode ser detectada antes de causar sintomas por meio de exames específicos:

- **Escore de cálcio coronário (CAC):** um dos melhores preditores de risco cardiovascular disponíveis
- **Espessura íntima-média carotídea (EIMC):** marcador precoce de aterosclerose subclínica
- **Perfil lipídico completo:** incluindo ApoB e Lp(a) em casos selecionados

Como **cardiologista especialista em Aterosclerose**, o Dr. Bruno Mioto avalia quais investigações são necessárias em cada caso — evitando tanto o subdiagnóstico quanto exames desnecessários.

## Tratamento

O tratamento combina mudanças no estilo de vida e medicamentos (estatinas, ezetimiba, inibidores de PCSK9 conforme necessidade), sempre com foco em atingir as metas terapêuticas individualizadas.

Se você está em São Paulo e quer uma avaliação com um **cardiologista no Jardins** especializado em prevenção cardiovascular, o consultório do Dr. Bruno Mioto está disponível para agendamento.`,
  },
  {
    id: 14,
    title: "Plano de acompanhamento médico: o que é e por que pode mudar seus resultados de saúde",
    slug: "plano-de-acompanhamento-medico-o-que-e-e-por-que-pode-mudar-seus-resultados-de-saude",
    excerpt: "Se você já saiu de uma consulta com um plano bem definido, mas teve dificuldade em manter tudo ao longo do tempo, você não está sozinho. O problema, muitas vezes, não está no tratamento — está no modelo.",
    categoryId: 6,
    coverImage: "/plano-acompanhamento-cover.webp",
    content: `## O problema da consulta isolada

Condições como hipertensão, colesterol elevado, diabetes, obesidade e doença cardiovascular não são eventos isolados. São processos contínuos.

E processos contínuos não se resolvem com intervenções pontuais.

Na prática, isso se traduz em algo muito comum: o paciente até começa bem… mas não consegue sustentar.

## O que é um plano de acompanhamento médico

Um plano de acompanhamento é um modelo estruturado de cuidado contínuo.

Em vez de depender apenas de consultas espaçadas, o paciente passa a ser acompanhado ao longo de um período definido, com:

- Metas claras
- Monitoramento frequente
- Ajustes ao longo do tempo
- Contato estruturado entre consultas

A consulta deixa de ser o centro — e passa a ser o início da jornada.

## Por que o acompanhamento contínuo funciona melhor

Mudar comportamento não depende apenas de informação. Depende de consistência, reforço, acompanhamento e ajuste de rota.

É por isso que muitos pacientes sabem o que precisam fazer — mas não conseguem manter.

Quando existe um processo estruturado, a adesão aumenta, as decisões ficam mais precisas e os resultados tendem a ser mais consistentes.

## Não é só sobre exames

Um erro comum é focar apenas no resultado de um exame. Mas saúde cardiovascular envolve muito mais:

- Controle de pressão arterial
- Perfil lipídico
- Composição corporal
- Hábitos de vida
- Uso correto de medicações

Sem acompanhamento, esses fatores oscilam. Com acompanhamento, eles passam a ser gerenciados de forma integrada.

## Para quem faz sentido um plano de acompanhamento

Esse modelo costuma ser especialmente útil para pessoas que:

- Têm colesterol ou pressão fora da meta
- Já tentaram tratamento, mas não conseguiram manter
- Possuem risco cardiovascular elevado
- Querem um cuidado mais próximo e estruturado
- Buscam não apenas tratar, mas prevenir

## A diferença na prática

Na prática, a maior mudança é simples: você deixa de "consultar quando precisa" e passa a ser acompanhado ao longo do tempo.

Isso muda a relação com o tratamento, a consistência e a previsibilidade dos resultados.

## Vale a pena?

Depende do seu objetivo.

Se a ideia for apenas tirar dúvidas pontuais, uma consulta pode ser suficiente. Mas se o objetivo for realmente controlar fatores de risco e reduzir a chance de eventos no futuro, o acompanhamento contínuo costuma ser uma estratégia muito mais eficaz.

## Conclusão

A consulta médica continua sendo essencial. Mas, para muitas condições, ela não é suficiente sozinha.

O que muda o desfecho não é apenas o que é decidido no consultório — é o que é sustentado ao longo dos meses.

> **Quer entender se esse modelo faz sentido para você?** Cada caso é diferente. Se você tem fatores de risco cardiovascular ou quer estruturar melhor seu cuidado ao longo do tempo, vale a pena discutir isso em consulta com o Dr. Bruno Mioto, **cardiologista em São Paulo**.`,
  },
  {
    id: 15,
    title: "Lp(a): o que é, valor normal e risco para o coração",
    slug: "lpa-lipoproteina-a-o-que-e-valor-normal-e-risco-cardiovascular",
    excerpt: "A Lp(a) — lipoproteína(a) — é um marcador genético de risco cardiovascular que afeta 1 em cada 5 adultos. Entenda o que é, qual o valor normal e o que fazer se estiver elevada.",
    categoryId: 2,
    coverImage: "/lpa-cover.webp",
    content: `## O que é Lp(a)?

A **Lp(a)** — pronunciada "L P A" ou "lipoproteína a" — é uma partícula presente no sangue que transporta colesterol, semelhante ao LDL. A diferença está em uma proteína adicional chamada **apolipoproteína(a)**, que se liga à superfície da partícula e a torna significativamente mais perigosa para as artérias.

A Lp(a) elevada é um fator de risco cardiovascular **independente**: ela aumenta a chance de infarto, AVC e estenose aórtica mesmo quando o colesterol LDL está controlado e todos os outros parâmetros estão normais.

## Qual o valor normal de Lp(a)?

A **Diretriz Brasileira de Dislipidemias 2025** da Sociedade Brasileira de Cardiologia (SBC) classifica a Lp(a) da seguinte forma:

| Valor | Classificação |
|---|---|
| < 30 mg/dL | Ótimo |
| 30–50 mg/dL | Limítrofe |
| > 50 mg/dL | Elevado — risco aumentado |
| > 100 mg/dL | Muito elevado — risco muito aumentado |

A unidade pode variar: alguns laboratórios reportam em **nmol/L** (o equivalente aproximado de 50 mg/dL é 125 nmol/L). Sempre confirme com seu médico qual unidade está sendo usada no resultado.

## Por que a Lp(a) é diferente do colesterol LDL?

O LDL pode ser reduzido com dieta, exercício e medicamentos. A Lp(a) é **determinada em cerca de 90% pela genética** — e praticamente não responde a mudanças de estilo de vida. Isso significa que:

- Uma pessoa magra, com dieta saudável e sem outros fatores de risco pode ter Lp(a) muito alta
- O resultado não muda com emagrecer, parar de fumar ou fazer exercício
- A medição precisa ser feita pelo menos uma vez na vida — e o resultado tende a ser estável ao longo dos anos

## Lp(a) alta causa infarto?

Sim. A Lp(a) elevada é um fator de risco independente e causal para:

- **Infarto agudo do miocárdio** (ataque cardíaco)
- **AVC isquêmico** (derrame)
- **Estenose aórtica calcificada** (estreitamento da válvula aórtica)
- **Doença arterial periférica**

O mecanismo envolve deposição acelerada de colesterol nas paredes das artérias, inflamação vascular e tendência aumentada à formação de coágulos. Isso explica por que pessoas com Lp(a) muito elevada podem ter infartos em idade jovem, mesmo sem outros fatores de risco evidentes.

## Quem deve medir a Lp(a)?

A **Diretriz SBC 2025** recomenda medir a Lp(a) **pelo menos uma vez na vida** em todos os adultos. A medição é especialmente indicada para:

- Pessoas com história familiar de infarto ou AVC precoce (antes dos 55 anos nos homens, 65 nas mulheres)
- Quem já teve infarto, AVC ou angina sem explicação evidente
- Pacientes com colesterol LDL difícil de controlar
- Pessoas com estenose aórtica
- Avaliação de risco cardiovascular em geral — especialmente quando o médico está em dúvida sobre iniciar medicamento

Se um familiar direto tem Lp(a) elevada, há grande chance de outros membros da família também terem — a triagem familiar é recomendada.

## Lp(a) alta tem tratamento?

**Hoje, não existe medicamento aprovado especificamente para baixar a Lp(a).** As opções disponíveis:

- **Inibidores de PCSK9** (evolocumabe, alirocumabe): reduzem a Lp(a) em cerca de 20–30%, mas são indicados principalmente pelo efeito no LDL
- **Niacina**: reduz Lp(a) mas não mostrou benefício cardiovascular nos ensaios clínicos e tem efeitos adversos relevantes — não é recomendada

O que muda com o diagnóstico é a **estratégia preventiva global**: com Lp(a) elevada, o cardiologista tende a adotar metas mais agressivas para LDL, pressão arterial e outros fatores modificáveis.

### Novos tratamentos em desenvolvimento

Esta é uma das áreas mais movimentadas da cardiologia preventiva. Quatro medicamentos com mecanismos distintos avançaram para ensaios de fase 3, com reduções de Lp(a) entre 80% e 98%:

- **Pelacarsen** (RNA antisense): reduz ~80% da Lp(a) — o ensaio Lp(a)HORIZON (8.323 pacientes), divulgado em setembro de 2026, **não atingiu o desfecho primário**: apesar da redução expressiva da Lp(a), não houve redução significativa de eventos cardiovasculares maiores em comparação ao placebo, numa população já em tratamento otimizado. Os dados completos serão apresentados em congresso.
- **Olpasiran** (siRNA): reduz ~94% — ensaio OCEAN(a) com mais de 7.200 pacientes, resultados esperados
- **Lepodisiran** (siRNA): reduz >90% com dose única — fase 3 em andamento
- **Muvalaplin** (comprimido oral): reduz ~86% da Lp(a) — primeira opção oral em desenvolvimento

O resultado negativo do Lp(a)HORIZON com pelacarsen foi inesperado e levanta questões científicas importantes: a redução laboratorial da Lp(a) não se traduziu em benefício clínico nesse contexto, possivelmente porque o mecanismo da Lp(a) no risco cardiovascular seja mais complexo do que a concentração plasmática isolada — ou porque a população estudada já tinha os demais fatores de risco muito bem controlados. Os ensaios com olpasiran e lepodisiran, que usam mecanismos diferentes e atingem reduções maiores, poderão esclarecer essa questão. A Lp(a) permanece um fator de risco independente e seu rastreamento continua recomendado pelas principais diretrizes.

## O que fazer se a Lp(a) estiver alta?

O diagnóstico de Lp(a) elevada não é uma sentença — é informação. Com ele, é possível:

1. **Controlar com mais agressividade os fatores de risco modificáveis**: LDL, pressão arterial, glicemia, tabagismo, sedentarismo e obesidade
2. **Revisar a indicação de medicamentos preventivos**: em alguns casos, o risco aumentado pela Lp(a) justifica iniciar estatinas ou inibidores de PCSK9 que não seriam indicados pelo risco habitual
3. **Rastrear familiares de primeiro grau**
4. **Manter acompanhamento cardiológico regular** — e estar atento às aprovações dos novos medicamentos específicos

## FAQ — Perguntas frequentes sobre Lp(a)

**Lp(a) alta tem sintomas?** Não. A Lp(a) elevada é silenciosa — não causa dor, cansaço nem qualquer sintoma. O único jeito de saber é pelo exame de sangue.

**Posso baixar a Lp(a) com dieta?** Não. Diferente do LDL, a Lp(a) é determinada principalmente pela genética e praticamente não responde à alimentação, exercício ou emagrecimento. Por isso, quem tem Lp(a) alta precisa controlar com ainda mais rigor todos os outros fatores de risco que SÃO modificáveis.

**Com que frequência preciso repetir o exame?** Em geral, uma medição é suficiente para toda a vida — os valores são estáveis. Repetir pode ser útil em caso de resultado duvidoso ou mudança significativa do contexto clínico.

**A Lp(a) já aparece no exame de rotina?** Não. O perfil lipídico padrão (colesterol total, LDL, HDL, triglicérides) não inclui a Lp(a). É preciso pedir explicitamente no pedido médico.

**Tenho Lp(a) alta. Vou ter infarto?** Não necessariamente. Lp(a) elevada aumenta o risco, mas não determina o destino. O risco cardiovascular depende de múltiplos fatores — e controlar os modificáveis reduz significativamente o risco global, mesmo em quem tem Lp(a) alta.

**Filho de quem tem Lp(a) alta também vai ter?** Há grande probabilidade. Como é uma condição genética, filhos e irmãos de pessoas com Lp(a) elevada devem fazer o exame.

Como **cardiologista especializado em prevenção cardiovascular em São Paulo**, realizo a avaliação completa do perfil de risco — incluindo Lp(a) — e defino estratégias individualizadas para cada paciente. Se você tem histórico familiar de infarto ou dúvidas sobre seu risco cardiovascular, vale marcar uma consulta.`,
  },
  {
    id: 16,
    title: "Placa de aterosclerose: o que é, como se forma e se pode regredir",
    slug: "placa-de-aterosclerose-o-que-e-como-se-forma-e-se-pode-regredir",
    excerpt: "Entenda o que é uma placa de aterosclerose, como ela se forma nas artérias, a diferença entre placa estável e placa instável, e o que a ciência diz sobre regressão com o tratamento adequado.",
    categoryId: 1,
    coverImage: "/blog-placa-aterosclerose-cover.webp",
    content: `## O que é uma placa de aterosclerose?

A placa de aterosclerose é um depósito que se forma dentro da parede de artérias de médio e grande calibre ao longo de anos ou décadas. Ela é composta principalmente por lipídios (gorduras), células inflamatórias, células musculares lisas e tecido fibroso. Quando as placas crescem o suficiente, podem estreitar a artéria e reduzir o fluxo de sangue. Quando se rompem, podem causar um infarto ou um acidente vascular cerebral (AVC).

A aterosclerose começa na infância, avança silenciosamente e costuma se manifestar clinicamente apenas na meia-idade ou na velhice. O termo "placa de colesterol" é popular, mas impreciso: o colesterol é um componente importante, mas a placa é resultado de um processo inflamatório complexo que envolve muito mais do que gordura acumulada.

## Como uma placa de aterosclerose se forma?

O processo começa com uma lesão no endotélio, a camada interna das artérias. Essa lesão pode ser causada por pressão alta, tabagismo, hiperglicemia, estresse oxidativo ou mesmo pela própria força do fluxo sanguíneo em bifurcações arteriais. Quando o endotélio fica disfuncional, ele se torna permeável a partículas de LDL (o "colesterol ruim").

O LDL que penetra na parede arterial sofre oxidação e atrai células do sistema imunológico, os monócitos, que se diferenciam em macrófagos. Esses macrófagos tentam "engolir" o LDL oxidado, mas acabam sobrecarregados e se tornam células espumosas (foam cells). O acúmulo dessas células forma o núcleo lipídico da placa.

Com o tempo, células musculares lisas migram para a área e depositam colágeno, formando uma cápsula fibrosa ao redor do núcleo. A placa cresce progressivamente, tanto para dentro da artéria (causando estreitamento) quanto para fora, expandindo a parede. As diretrizes da Sociedade Europeia de Cardiologia (ESC 2021) descrevem esse processo como central para a fisiopatologia da doença cardiovascular aterosclerótica.

## Qual é a diferença entre placa estável e placa instável?

Essa distinção é clinicamente fundamental.

A **placa estável** tem uma cápsula fibrosa espessa e um núcleo lipídico pequeno. Ela pode causar sintomas de esforço (como angina) se estreitar bastante a artéria, mas raramente se rompe. O tratamento reduz os sintomas e estabiliza a placa.

A **placa instável** (ou vulnerável) tem uma cápsula fibrosa fina, um núcleo lipídico grande e muito inflamação ativa. Ela pode causar obstrução pequena na artéria, mas representar alto risco, porque tem grande probabilidade de ruptura. Quando a cápsula rompe, o conteúdo da placa entra em contato com o sangue e desencadeia a formação de um trombo (coágulo) em segundos. Esse trombo pode obstruir completamente a artéria e causar um infarto agudo.

Importante: não é o grau de obstrução que define o risco de infarto. Placas que obstruem apenas 40 a 50% do diâmetro arterial causam a maioria dos infartos, porque são mais numerosas e frequentemente instáveis. Esse conceito está bem documentado em estudos de autópsia e em séries de cineangiocoronariografia de pacientes que sofreram infarto (Falk E et al., JACC 2013).

## Como saber se tenho placas nas artérias?

Existem diferentes formas de detectar aterosclerose subclínica (antes de causar sintomas):

**Escore de cálcio coronário (CAC):** é um exame de tomografia sem contraste que quantifica o cálcio depositado nas artérias coronárias. Um escore elevado indica presença de placa aterosclerótica calcificada e prediz risco cardiovascular independentemente dos fatores de risco tradicionais. O CAC é recomendado pelas diretrizes da ACC/AHA (2019) para refinar a decisão de iniciar tratamento com estatina em pacientes de risco intermediário.

**Angiotomografia coronária (ACTC):** visualiza as artérias coronárias com contraste e permite identificar tanto placas calcificadas quanto placas não calcificadas, que não aparecem no escore de cálcio. Fornece informação anatômica mais detalhada.

**Ultrassonografia de carótidas:** avalia a espessura da camada íntima-média das carótidas e pode identificar placas carotídeas. Técnica acessível, sem radiação.

**Cineangiocoronariografia:** padrão ouro para avaliar o grau de obstrução, mas é invasivo e reservado para situações com alta probabilidade de doença obstrutiva.

## A placa de aterosclerose pode regredir?

Parcialmente, sim. Estudos de imagem intravascular (IVUS) demonstraram que tratamento intensivo com estatinas de alta potência, sobretudo quando associado a ezetimiba ou inibidores de PCSK9, pode promover regressão do volume de placa aterosclerótica.

O estudo ASTEROID (JAMA 2006) mostrou que a rosuvastatina em alta dose levou a redução significativa do volume de placa nas coronárias avaliadas por IVUS. O estudo GLAGOV (JAMA 2016) demonstrou que a adição de evolocumabe (inibidor de PCSK9) a estatina produziu regressão adicional de placa em relação à estatina isolada, com maior benefício quanto mais baixo o LDL atingido.

O mecanismo principal não é apenas "derreter" o depósito lipídico. O que ocorre é a redução da inflamação, estabilização da cápsula fibrosa e diminuição do núcleo necrótico, tornando a placa menos vulnerável a ruptura. É por isso que o benefício clínico — redução de infartos — antecede em meses qualquer alteração visível no tamanho da placa.

Na prática clínica, a meta de LDL para pacientes com doença aterosclerótica estabelecida é abaixo de 70 mg/dL, e em pacientes de muito alto risco ou com eventos recorrentes, abaixo de 55 mg/dL, conforme as diretrizes da SBC e da ESC.

## Por que o tratamento precoce faz diferença?

Quanto mais tempo a placa existe e mais inflamada ela permanece, maior a probabilidade de instabilização e ruptura. O tratamento reduz progressivamente a carga inflamatória, estabiliza a placa existente e retarda ou interrompe a formação de novas lesões.

Reduzir o LDL cedo na vida evita décadas de exposição da parede arterial a partículas aterogênicas. Estudos de mendelização randômica e ensaios com intervenções precoces no LDL mostram que o benefício cardiovascular é proporcional ao tempo e à magnitude da redução do LDL. Cada queda de 1 mmol/L (cerca de 39 mg/dL) no LDL reduz eventos cardiovasculares maiores em cerca de 22%, conforme meta-análise do Cholesterol Treatment Trialists Collaboration (Lancet 2010).

## Perguntas frequentes sobre placa de aterosclerose

**O que é uma placa de aterosclerose?**
É um depósito formado dentro da parede das artérias, composto por lipídios, células inflamatórias e tecido fibroso. Cresce ao longo de anos e pode estreitar ou obstruir a artéria, além de se romper e causar infarto ou AVC.

**Placa de aterosclerose e placa de colesterol são a mesma coisa?**
O termo "placa de colesterol" é popular, mas incompleto. O colesterol LDL é um componente importante da placa, mas o processo envolve inflamação, células imunológicas e remodelamento da parede arterial. A denominação correta é placa aterosclerótica.

**Como saber se tenho placa nas artérias?**
O escore de cálcio coronário (CAC) é o exame mais indicado para detectar aterosclerose subclínica em pessoas sem sintomas. A angiotomografia coronária fornece informação mais detalhada, incluindo placas não calcificadas. A indicação do exame depende do perfil de risco de cada paciente.

**Placa de aterosclerose tem cura?**
Não existe cura no sentido de eliminação completa da placa. O tratamento adequado estabiliza a placa, reduz seu componente inflamatório e pode diminuir parcialmente seu volume. O objetivo clínico é prevenir ruptura e progressão, reduzindo o risco de infarto e AVC.

**A placa de aterosclerose pode diminuir com o tratamento?**
Sim. Estudos de imagem intracoronária demonstraram regressão parcial do volume de placa com estatinas de alta intensidade e com inibidores de PCSK9, especialmente quando o LDL é reduzido a níveis muito baixos. O benefício clínico ocorre mesmo antes de qualquer mudança visível na placa.

**Qual é o colesterol ideal para quem tem placa nas artérias?**
Para pacientes com doença aterosclerótica estabelecida, a meta de LDL é abaixo de 70 mg/dL. Em casos de muito alto risco, como doença multiarterial ou evento recente, a meta é abaixo de 55 mg/dL, conforme as diretrizes da Sociedade Brasileira de Cardiologia e da Sociedade Europeia de Cardiologia.

Se você tem diagnóstico de aterosclerose, histórico familiar de infarto precoce ou fatores de risco cardiovascular importantes, a avaliação com um cardiologista é o primeiro passo para definir seu risco e individualizar o tratamento. O consultório do Dr. Bruno Mioto, **cardiologista em São Paulo**, oferece avaliação especializada em doença coronariana e prevenção cardiovascular.`,
  },
];

export async function seedDatabase() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.log("[Seed] DATABASE_URL not set, skipping seed.");
    return;
  }

  let conn: mysql.Connection | null = null;
  try {
    conn = await mysql.createConnection(dbUrl);

    console.log("[Seed] Seeding blog categories and posts...");

    // Insert categories
    for (const cat of CATEGORIES) {
      await conn.execute(
        "INSERT INTO blog_categories (id, name, slug, createdAt) VALUES (?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE name=VALUES(name)",
        [cat.id, cat.name, cat.slug]
      );
    }

    // Insert posts
    const now = new Date();
    for (const post of POSTS) {
      await conn.execute(
        `INSERT INTO blog_posts (id, title, slug, excerpt, content, coverImage, categoryId, published, publishedAt, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
         ON DUPLICATE KEY UPDATE title=VALUES(title), slug=VALUES(slug), excerpt=VALUES(excerpt), content=VALUES(content), coverImage=VALUES(coverImage), categoryId=VALUES(categoryId)`,
        [post.id, post.title, post.slug, post.excerpt, post.content, post.coverImage, post.categoryId, now, now, now]
      );
    }

    console.log(`[Seed] Done! Inserted ${CATEGORIES.length} categories and ${POSTS.length} posts.`);
  } catch (err) {
    console.error("[Seed] Error seeding database:", err);
  } finally {
    if (conn) await conn.end();
  }
}
