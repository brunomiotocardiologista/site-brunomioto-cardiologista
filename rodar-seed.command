#!/bin/bash
export PATH="/usr/local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node/ 2>/dev/null | tail -1)/bin:/opt/homebrew/opt/node/bin:$PATH"
cd "$(dirname "$0")"
LOG="seed-log.txt"

echo "🔍 Node: $(which node 2>/dev/null || echo 'não encontrado')" | tee "$LOG"
echo "🔍 npm: $(which npm 2>/dev/null || echo 'não encontrado')" | tee -a "$LOG"
echo "" | tee -a "$LOG"

if ! command -v node &>/dev/null; then
  echo "❌ Node.js não encontrado. Instale em https://nodejs.org" | tee -a "$LOG"
  read
  exit 1
fi

echo "📦 Instalando mysql2..." | tee -a "$LOG"
npm install mysql2 2>&1 | tee -a "$LOG"
echo "" | tee -a "$LOG"
echo "🌱 Inserindo artigos..." | tee -a "$LOG"
node run-seed.mjs 2>&1 | tee -a "$LOG"
echo "" | tee -a "$LOG"
echo "✅ Log salvo em seed-log.txt"
echo "Pressione Enter para fechar."
read
