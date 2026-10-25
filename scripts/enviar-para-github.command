#!/bin/bash
# --------------------------------------------------------------------
# Publica o site. Fluxo git normal desde 24/10/2026: um commit por
# mudança, push comum para a main (sem -f), histórico preservado.
# O Railway detecta o push na main e redeploya. O build leva perto
# de dez minutos e, até lá, o site responde a versão antiga.
#
# O token fica em ~/Desktop/Claude Cowork/.github-token e é lido pelo
# credential helper do .git/config local, nunca entra na URL.
# --------------------------------------------------------------------

SITE_DIR="$HOME/Desktop/Claude Cowork/site_brunomioto"

parar() {
  echo ""
  echo "$1"
  echo ""
  echo "Nada foi publicado. Mostre esta janela para o Claude."
  echo "Pressione Enter para fechar."
  read
  exit 1
}

cd "$SITE_DIR" || parar "Pasta do site não encontrada: $SITE_DIR"
[ -d .git ] || parar "A pasta do site não tem .git."
[ "$(git branch --show-current)" = "main" ] || parar "A pasta não está na branch main."
git remote get-url origin | grep -q "@" && parar "A URL do remote tem credencial embutida. Corrigir antes de publicar."

echo "Conferindo o GitHub..."
git fetch -q origin main || parar "Não consegui falar com o GitHub."
git merge-base --is-ancestor origin/main HEAD || parar "A main do GitHub tem commits que a pasta não tem. Não vou sobrescrever."

echo ""
echo "Validando o seed.ts..."
node scripts/validar-seed.mjs || parar "O seed.ts tem problema. Publicar assim pode derrubar o site."
node --experimental-strip-types --check server/seed.ts || parar "O seed.ts tem erro de sintaxe."

# 1. Commit do que mudou na pasta, se houver
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  echo ""
  echo "O que mudou desde a última publicação:"
  git diff --cached --stat
  echo ""
  scripts/verificar-credenciais.sh --staged || { git reset -q; parar "Commit cancelado."; }
  echo ""
  echo "Descreva a mudança em uma linha (Enter usa a data):"
  read MSG
  [ -z "$MSG" ] && MSG="Atualização do site $(date '+%Y-%m-%d %H:%M')"
  git commit -q -m "$MSG" || { git reset -q; parar "O commit falhou."; }
fi

# 2. Push do que ainda não está no GitHub
PENDENTES=$(git log --oneline origin/main..HEAD)
if [ -z "$PENDENTES" ]; then
  echo ""
  echo "Nada novo para publicar. A pasta já está igual ao GitHub."
  echo "Pressione Enter para fechar."
  read
  exit 0
fi

echo ""
echo "Commits que vão para o ar:"
echo "$PENDENTES"
echo ""
echo "Publicar agora? Digite s e Enter para confirmar."
read OK
[ "$OK" = "s" ] || parar "Publicação cancelada. Os commits ficam na pasta, prontos para a próxima vez."

if git push origin main; then
  echo ""
  echo "Código enviado para o GitHub. O Railway leva perto de dez minutos"
  echo "para publicar. Conferir nas abas Build e Deploy do painel, e no"
  echo "log a linha [Seed] Done!"
else
  parar "O push falhou."
fi
echo "Pressione Enter para fechar."
read
