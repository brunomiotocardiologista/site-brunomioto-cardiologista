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
