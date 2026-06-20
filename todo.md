# Todo - Site Dr. Bruno Mioto

## Schema & Backend
- [x] Schema: tabelas appointments, contacts, blog_posts, blog_categories
- [x] Migrations e aplicação no banco de dados
- [x] tRPC routers: appointments, contacts, blog, admin, ai-chat
- [x] Notificação ao Dr. Bruno por email ao novo agendamento

## Frontend - Design & Layout
- [x] Configurar paleta editorial: creme, azul médico, tipografia Didone
- [x] Configurar fontes Google: Playfair Display (serifada Didone) + Inter (sans-serif)
- [x] Navbar responsiva com links de navegação e CTA de agendamento
- [x] Footer com informações de contato e links

## Frontend - Páginas
- [x] Landing page (Hero editorial com citação, CTA agendamento)
- [x] Seção Sobre (biografia, formação, RQE 89316 e 89317, foto)
- [x] Seção Serviços (consultas, exames, check-ups cardiológicos)
- [x] Seção Agendamento (formulário com data/hora, tipo de consulta, dados do paciente)
- [x] Seção Contato (formulário nome, email, telefone, assunto, mensagem)
- [x] Seção Localização (endereço, tel (11) 3063-4890, WhatsApp, horários)
- [x] Blog (listagem de artigos, categorias, busca)
- [x] Página de artigo individual do blog
- [x] Botão flutuante WhatsApp

## Painel Administrativo
- [x] Dashboard admin com estatísticas
- [x] Gerenciar agendamentos (listar, confirmar, cancelar)
- [x] Visualizar mensagens de contato
- [x] Publicar/editar/excluir artigos do blog
- [x] Gerenciar categorias do blog

## Assistente Virtual IA
- [x] Chat widget flutuante na página
- [x] Integração com LLM para responder perguntas sobre cardiologia
- [x] Contexto da clínica (procedimentos, horários, localização)

## Testes
- [x] Testes vitest para routers principais (9 testes passando)
- [x] TypeScript sem erros

## Assets
- [x] Imagens hero, coração editorial, consultório e blog via CDN
- [x] Upload foto de perfil (Designsemnome-2.png) para CDN e integrar na seção Sobre
- [x] Upload foto palestra Novartis (EventoNovartis17-05-25-470.jpeg) para CDN e integrar no Hero
- [x] Upload foto microfone (0fbf95c6...) para CDN e integrar na seção Serviços

## Ajustes solicitados
- [x] Remover eletrocardiograma, ecocardiograma e teste ergométrico da lista de tipos de consulta no agendamento
- [x] Substituir formulário de agendamento por tela de envio de WhatsApp para +55 11 94555-6605
- [x] Corrigir número do WhatsApp flutuante e demais referências para +55 11 94555-6605
- [x] Atualizar horários de atendimento: segunda, terça, quinta e sexta, das 13:30 às 19:30
- [x] Remover referência à Unidade Coronária do Einstein da biografia
- [x] Atualizar nome da unidade do InCor para "Unidade Clínica de Aterosclerose e Coronariopatia Crônica"
- [x] Adicionar "Professor Colaborador da USP" à biografia
- [x] Adicionar "Doutor em Ciências pela USP" à biografia
- [x] Remover eletrocardiograma, ecocardiograma e teste ergométrico de TODAS as seções do site (serviços, blog, assistente virtual, etc.)
- [x] Adicionar "Avaliação Pré-Operatória" à lista de serviços
- [x] Atualizar systemPrompt do assistente virtual: remover exames, adicionar Avaliação Pré-Operatória, corrigir WhatsApp e horários
- [x] Atualizar nome completo para "Dr. Bruno Mahler Mioto" onde relevante no site
- [x] Fazer upload do logo oficial e usar na navbar e footer
- [x] Verificar consistência de todos os dados com o cartão de visita
- [x] Adicionar horário de funcionamento do consultório (secretárias presenciais: seg-sex 8h30-19h30) separado do horário de consultas médicas
- [x] Adicionar link do Instagram (@brunomioto.cardiologista) na navbar, footer e seção de localização/contato
- [x] Coletar temas dos posts do Instagram e criar artigos de blog
- [x] Publicar artigos no banco de dados do site
- [x] Corrigir formatação dos artigos do blog (renderização de Markdown/HTML no conteúdo)
- [x] Artigo colesterol: corrigir meta Baixo Risco de <130 para <115 mg/dL e adicionar categoria "Risco Extremo" com meta <40 mg/dL
- [x] Artigo colesterol: corrigir meta Risco Muito Alto de <55 para <50 mg/dL (diretriz brasileira)
- [x] Adicionar "Tratamento da Obesidade" à seção de Serviços
- [x] Adicionar "Coronariopatia Complexa" à seção de Serviços
- [x] Destacar na seção de agendamento que consultas também podem ser marcadas pelo telefone (11) 3063-4890
- [x] Artigo hipertensão: atualizar classificação — 120-139/80-89 mmHg = pressão elevada (pré-hipertensão), já merece atenção
- [x] Gerar imagens editoriais únicas para cada um dos 8 artigos do blog e atualizar no banco de dados
- [x] Restaurar imagem anterior do artigo sobre alimentação saudável (id 3)
- [x] Gerar nova imagem adequada para o artigo sobre eletrocardiograma (id 1)

## SEO e Visibilidade no Google
- [x] Adicionar meta tags SEO completas (title, description, keywords, canonical) em todas as páginas
- [x] Adicionar Open Graph tags para compartilhamento no WhatsApp e redes sociais
- [x] Implementar Schema.org JSON-LD para Physician/MedicalBusiness
- [x] Gerar sitemap.xml dinâmico com todas as páginas e artigos do blog
- [x] Configurar robots.txt adequado
- [x] Criar rotas dedicadas /blog/:slug para cada artigo (indexação individual pelo Google)
- [x] Meta tags dinâmicas por artigo (title, description, canonical, Open Graph, JSON-LD)
- [x] Otimizar títulos de página e headings (H1/H2/H3) para palavras-chave relevantes
- [x] Adicionar atributos alt descritivos em todas as imagens
- [x] Preparar instruções para Google Search Console

## Conteúdo e Informações
- [x] Adicionar informação de atendimento exclusivamente particular (sem convênios) — descartado a pedido do usuário

## Correção de Indexação Google
- [x] Atualizar todas as URLs de www.brunomiotocardiologista.com para brunomiotocardiologista.com (sem www) em canonical, sitemap, meta tags e Schema.org

## Contato
- [x] Adicionar segundo telefone (11) 98285-0031 para ligação na seção de localização/contato

## Serviços
- [x] Adicionar "Planos de Acompanhamento" à seção de serviços e procedimentos

## Blog
- [x] Publicar artigo "Plano de acompanhamento médico: o que é e por que pode mudar seus resultados de saúde"

## Visual / Identidade
- [x] Substituir logo do site pelo novo logo azul e branco (Bruno Mioto - Medicina e Cardiologia)

## Bugs
- [x] Corrigir erro 404 nas rotas /blog/:slug em produção (fallback SPA) — verificado: servidor retorna HTTP 200 corretamente

## Serviços (continuação)
- [x] Adicionar "Acompanhamento de pacientes internados" à seção de serviços e procedimentos

## SEO - Correção de Redirecionamentos (Search Console)
- [x] Identificar as 6 URLs com "Page with redirect" no Search Console — causa: propriedade registrada com www, servidor redireciona para sem-www
- [x] Confirmar canonical tags e sitemap já usam sem-www corretamente — nenhuma correção de código necessária

## SEO - Palavras-chave Locais nos Artigos
- [x] Inserir naturalmente nos artigos os termos: "Cardiologista em São Paulo", "Cardiologista especialista em Aterosclerose", "Cardiologista em Pinheiros" — todos os 12 artigos atualizados

## Blog - Novos Artigos
- [x] Publicar artigo sobre aterosclerose com palavras-chave: "Cardiologista especialista em Aterosclerose", "cardiologista no Jardins", "cardiologista preventivo em São Paulo"

## Fotos do Blog
- [x] Revisar todas as fotos dos artigos (8 estavam inadequadas)
- [x] Substituir fotos de: Eletrocardiograma, Pressão alta, Colesterol, Diabetes, Insuficiência cardíaca, Fibrilação atrial, Aterosclerose, Plano de acompanhamento
- [x] Corrigir seed.ts para atualizar content e excerpt no ON DUPLICATE KEY UPDATE

## Infraestrutura / Seed
- [x] Corrigir ON DUPLICATE KEY UPDATE para incluir slug, excerpt e content (não só title, coverImage, categoryId)

## Skill de Gestão do Blog
- [x] Criar skill `blog-brunomioto` com todo o conhecimento acumulado do projeto
- [x] Skill instalada em: `Claude Cowork/Skills/blog-brunomioto/`
- [x] Índice `Skills/SKILLS.md` atualizado
