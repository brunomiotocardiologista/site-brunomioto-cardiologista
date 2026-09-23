#!/bin/bash
echo "Iniciando envio do código para o GitHub..."

# Token armazenado fora do repositório (nunca commitar este arquivo com o token)
TOKEN_FILE="$HOME/Desktop/Claude Cowork/.github-token"

if [ ! -f "$TOKEN_FILE" ]; then
  echo "❌ Arquivo de token não encontrado: $TOKEN_FILE"
  echo "   Crie o arquivo com seu GitHub Personal Access Token e tente novamente."
  echo "Pressione Enter para fechar."
  read
  exit 1
fi

GITHUB_TOKEN=$(cat "$TOKEN_FILE" | tr -d '[:space:]')
REPO_URL="https://${GITHUB_TOKEN}@github.com/brunomiotocardiologista/site-brunomioto-cardiologista.git"

SITE_DIR="$HOME/Desktop/Claude Cowork/site_brunomioto"
TEMP_DIR="/tmp/site_deploy_$$"

cp -r "$SITE_DIR" "$TEMP_DIR"
cd "$TEMP_DIR"

# Remover qualquer .git anterior
rm -rf .git

git init
git config user.email "brunomioto@gmail.com"
git config user.name "Bruno Mioto"
git add .

# --------------------------------------------------------------------
# TRAVA DE SEGURANÇA
# O repositório no GitHub é PÚBLICO e este script publica a pasta
# inteira. Antes de enviar, varrer o que está prestes a ir e abortar
# se encontrar credencial. Em 09/08/2026 a senha do MySQL de produção
# ficou exposta por meses exatamente por não existir esta checagem.
# --------------------------------------------------------------------
echo ""
echo "Verificando se há credenciais no que será publicado..."

ACHOU=""
# String de conexão com usuário e senha (mysql://, postgres://, mongodb://)
if git grep --cached -I -l -E '(mysql|postgres|postgresql|mongodb)(\+srv)?://[^ "'"'"']+:[^ "'"'"']+@' -- . 2>/dev/null | grep -q .; then
  ACHOU="sim"
  echo ""
  echo "String de conexão de banco encontrada em:"
  git grep --cached -I -l -E '(mysql|postgres|postgresql|mongodb)(\+srv)?://[^ "'"'"']+:[^ "'"'"']+@' -- . 2>/dev/null
fi

# Token do GitHub
if git grep --cached -I -l -E '(ghp_|github_pat_|gho_|ghs_)[A-Za-z0-9_]{20,}' -- . 2>/dev/null | grep -q .; then
  ACHOU="sim"
  echo ""
  echo "Token do GitHub encontrado em:"
  git grep --cached -I -l -E '(ghp_|github_pat_|gho_|ghs_)[A-Za-z0-9_]{20,}' -- . 2>/dev/null
fi

# Chave de API genérica (OpenAI, Anthropic, Google)
if git grep --cached -I -l -E '(sk-[A-Za-z0-9_-]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|AIza[A-Za-z0-9_-]{30,})' -- . 2>/dev/null | grep -q .; then
  ACHOU="sim"
  echo ""
  echo "Chave de API encontrada em:"
  git grep --cached -I -l -E '(sk-[A-Za-z0-9_-]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|AIza[A-Za-z0-9_-]{30,})' -- . 2>/dev/null
fi

if [ -n "$ACHOU" ]; then
  echo ""
  echo "=================================================================="
  echo "  DEPLOY ABORTADO"
  echo ""
  echo "  Foi encontrada credencial nos arquivos acima. Eles iriam para"
  echo "  um repositório PÚBLICO."
  echo ""
  echo "  O que fazer: tire o arquivo da pasta site_brunomioto/ ou"
  echo "  acrescente o caminho dele ao .gitignore, e rode de novo."
  echo ""
  echo "  Mostre esta janela para o Claude se tiver dúvida."
  echo "=================================================================="
  echo ""
  cd /
  rm -rf "$TEMP_DIR"
  echo "Pressione Enter para fechar."
  read
  exit 1
fi

echo "Nenhuma credencial encontrada. Seguindo com o envio."
echo ""

git commit -m "Deploy - $(date '+%Y-%m-%d %H:%M')"
git branch -M main
git remote add origin "$REPO_URL"
git push -f -u origin main

echo ""
if [ $? -eq 0 ]; then
  echo "✅ Código enviado para o GitHub com sucesso!"
else
  echo "❌ Algo deu errado. Mostre esta janela para o Claude."
fi
echo "Pressione Enter para fechar."
read
