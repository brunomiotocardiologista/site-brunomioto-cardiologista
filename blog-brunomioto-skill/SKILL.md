---
name: blog-brunomioto
description: >
  Gerencia o blog do site brunomiotocardiologista.com — adiciona novos artigos,
  atualiza fotos de capa, edita conteúdo, corrige textos e faz o deploy das
  mudanças. Use esta skill sempre que o Dr. Bruno pedir para criar um artigo,
  mudar a foto de um post, editar um texto do blog, ou publicar conteúdo novo
  no site. Também cobre buscas de imagens adequadas no Unsplash para cada tema
  médico e o processo completo de envio para o servidor via GitHub.
---

# Blog – brunomiotocardiologista.com

## Arquitetura do sistema

O site é um app React + Node/Express + MySQL hospedado num servidor remoto.
**Não há Node.js instalado localmente no Mac do usuário.** O único jeito de
atualizar o banco é via deploy no GitHub — o servidor reinicia e executa o seed.

### Arquivos-chave

| Arquivo | Função |
|---|---|
| `~/Desktop/Claude Cowork/site_brunomioto/server/seed.ts` | Fonte da verdade de todos os artigos |
| `~/Desktop/Claude Cowork/enviar-para-github.command` | Script de deploy (dois cliques no Finder) |

### Categorias disponíveis

| ID | Nome | Slug |
|---|---|---|
| 1 | Cardiologia | cardiologia |
| 2 | Prevenção | prevencao |
| 3 | Estilo de Vida | estilo-de-vida |
| 4 | Hipertensão | hipertensao |
| 5 | Colesterol | colesterol |
| 6 | Serviços | servicos |

---

## Como adicionar um novo artigo

1. **Ler o arquivo atual** para saber o maior `id` existente:
   ```
   Read: ~/Desktop/Claude Cowork/site_brunomioto/server/seed.ts
   ```

2. **Escolher uma foto** no Unsplash (ver seção abaixo).

3. **Adicionar o bloco do post** ao array `POSTS` em `seed.ts`, antes do
   fechamento `];`. Use o próximo `id` disponível.

   ```typescript
   {
     id: 15,  // próximo id disponível
     title: "Título do Artigo",
     slug: "titulo-do-artigo",   // lowercase, hífens, sem acentos
     excerpt: "Resumo de 1-2 frases para aparecer na listagem do blog.",
     categoryId: 1,              // ver tabela acima
     coverImage: "https://images.unsplash.com/photo-XXXXXXXXX?w=1200&q=80",
     content: `## Seção 1

   Parágrafo em **markdown**. Use ## para cabeçalhos, **negrito**, listas com -.

   ## Seção 2

   Continue o artigo...`,
   },
   ```

4. **Fazer o deploy**: pedir ao usuário para dar dois cliques em
   `enviar-para-github.command` na pasta `Claude Cowork` (não dentro de
   `site_brunomioto`).

5. **Verificar** no site após ~2 minutos navegando para o blog.

---

## Como atualizar um artigo existente

O seed usa `ON DUPLICATE KEY UPDATE`, então editar qualquer campo em `seed.ts`
e fazer deploy atualiza o banco automaticamente. Campos atualizados: `title`,
`slug`, `excerpt`, `content`, `coverImage`, `categoryId`.

Para atualizar:
1. Localizar o post no `seed.ts` pelo `id` ou `title`.
2. Editar os campos desejados.
3. Solicitar deploy ao usuário (`enviar-para-github.command`).

---

## Como escolher e verificar uma foto no Unsplash

O site usa URLs do CDN do Unsplash no formato:
`https://images.unsplash.com/photo-XXXXXXX?w=1200&q=80`

**Fotos gratuitas** têm domínio `images.unsplash.com`.  
**Fotos premium** têm domínio `plus.unsplash.com` — **NÃO usar**.

### Processo via Chrome MCP

```
1. Navegar para: https://unsplash.com/s/photos/[termo-em-ingles]?orientation=landscape
2. Clicar na foto desejada (verificar visualmente se é relevante)
3. Executar JS para obter a URL real:
   document.querySelector('meta[property="og:image"]')?.content?.split('?')[0]
4. Se começar com "images.unsplash.com" → usar
   Se começar com "plus.unsplash.com" → voltar e escolher outra
5. Append: ?w=1200&q=80
```

### Termos de busca recomendados por tema

| Tema | Termos em inglês |
|---|---|
| Eletrocardiograma | electrocardiogram, ecg heart monitor |
| Pressão alta | blood pressure monitor, hypertension |
| Colesterol | blood test cholesterol, blood draw |
| Diabetes | diabetes glucose meter, insulin |
| Infarto | heart attack, cardiac emergency |
| Insuficiência cardíaca | heart anatomy model, cardiac |
| Fibrilação atrial | heart rhythm, heartbeat ecg |
| Aterosclerose | artery plaque, cardiovascular |
| Obesidade | obesity health, overweight |
| Atividade física | exercise running, physical activity |
| Alimentação | healthy food, nutrition heart |
| Check-up | medical checkup, doctor examination |
| Cirurgia / pré-operatório | surgery medical team, operation |
| Consulta / acompanhamento | doctor patient consultation |

---

## Estrutura completa de um post

```typescript
{
  id: number,                    // sequencial, único
  title: string,                 // título exibido no blog
  slug: string,                  // URL: lowercase, hífens, sem acentos, sem pontuação
  excerpt: string,               // resumo curto (1-2 frases, ~150 chars)
  categoryId: number,            // 1-6 (ver tabela de categorias)
  coverImage: string,            // URL Unsplash com ?w=1200&q=80
  content: string,               // Markdown com template literals (backtick)
}
```

### Diretrizes de conteúdo

- Conteúdo em **Português brasileiro**
- Usar `##` para seções, `###` para subseções
- Parágrafos separados por linha em branco
- Negrito `**texto**` para termos médicos importantes
- Listas com `-` quando adequado
- Tom: informativo, acessível, sem excesso de jargão
- Incluir ao menos uma menção natural a palavras-chave locais:
  "Cardiologista em São Paulo", "Cardiologista em Pinheiros", ou
  "Cardiologista especialista em Aterosclerose" (conforme relevância)
- Comprimento ideal: 600–1200 palavras

---

## Geração de slug

Regras para gerar o `slug` a partir do título:
- Converter para minúsculas
- Substituir acentos: ã→a, ç→c, é→e, etc.
- Substituir espaços e pontuação por hífen `-`
- Remover hífens duplos

Exemplos:
- "Pressão alta: o que é?" → `pressao-alta-o-que-e`
- "Fibrilação Atrial" → `fibrilacao-atrial`

---

## Checklist de deploy

Antes de pedir ao usuário para clicar em `enviar-para-github.command`:

- [ ] O `id` do novo post é único (maior que todos os existentes)
- [ ] O `slug` não tem acentos nem caracteres especiais
- [ ] A `coverImage` começa com `https://images.unsplash.com/` (não `plus.`)
- [ ] O `content` usa backticks (template literal), não aspas
- [ ] O arquivo `seed.ts` fecha o array `POSTS` corretamente com `];`

---

## Restrições importantes

- **Sem Node.js local**: scripts `.mjs` não funcionam no Mac do usuário.
- **Admin panel inativo**: `/admin` está com erro de OAuth — não usar.
- **Deploy único caminho**: toda mudança vai via `enviar-para-github.command`.
- **Seed cobre tudo**: novos posts e atualizações de posts existentes são feitos
  editando `seed.ts` e fazendo deploy.
