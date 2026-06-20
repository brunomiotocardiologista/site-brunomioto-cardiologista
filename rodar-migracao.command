#!/bin/bash
echo "Rodando migrações do banco de dados..."

cd "$HOME/Desktop/Claude Cowork/site_brunomioto"

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
  echo "Instalando dependências (pode demorar alguns minutos)..."
  npm install -g pnpm 2>/dev/null
  pnpm install
fi

# Rodar migração
echo "Aplicando schema no banco..."
pnpm db:push

echo ""
if [ $? -eq 0 ]; then
  echo "✅ Banco de dados configurado com sucesso!"
else
  echo "❌ Erro na migração. Mostre esta janela para o Claude."
fi
echo "Pressione Enter para fechar."
read
