#!/bin/bash
# --------------------------------------------------------------------
# Varredura de credenciais. O repositório no GitHub é PÚBLICO e, com
# histórico, o que for commitado uma vez fica lá para sempre, mesmo
# apagado depois. Em 09/08/2026 a senha do MySQL de produção ficou
# exposta por meses exatamente por não existir esta checagem.
#
# Uso:
#   verificar-credenciais.sh --staged          o que está no índice (pre-commit)
#   verificar-credenciais.sh <rev> [<rev>...]  cada commit listado (pre-push)
#
# Sai com código 1 e lista os arquivos se achar algo.
# --------------------------------------------------------------------

PADROES=(
  # String de conexão com usuário e senha (mysql://, postgres://, mongodb://)
  '(mysql|postgres|postgresql|mongodb)(\+srv)?://[^ "'"'"']+:[^ "'"'"']+@'
  # Token do GitHub
  '(ghp_|github_pat_|gho_|ghs_)[A-Za-z0-9_]{20,}'
  # Chave de API genérica (OpenAI, Anthropic, Google)
  '(sk-[A-Za-z0-9_-]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|AIza[A-Za-z0-9_-]{30,})'
)

if [ "$1" = "--staged" ]; then
  ALVOS=("--cached")
else
  ALVOS=("$@")
fi

ACHOU=""
for ALVO in "${ALVOS[@]}"; do
  for P in "${PADROES[@]}"; do
    # --cached precisa vir antes do padrão; revisão vem depois dele
    if [ "$ALVO" = "--cached" ]; then
      RES=$(git grep --cached -I -l -E "$P" -- . 2>/dev/null)
    else
      RES=$(git grep -I -l -E "$P" "$ALVO" -- . 2>/dev/null)
    fi
    if [ -n "$RES" ]; then
      ACHOU="sim"
      [ "$ALVO" = "--cached" ] && ROTULO="arquivos prontos para commit" || ROTULO="commit $(git rev-parse --short "$ALVO")"
      echo ""
      echo "Credencial encontrada ($ROTULO):"
      echo "$RES" | sed -E 's/^[0-9a-f]{40}://; s/^/  /'
    fi
  done
done

if [ -n "$ACHOU" ]; then
  echo ""
  echo "=================================================================="
  echo "  BLOQUEADO: credencial iria para um repositório PÚBLICO."
  echo ""
  echo "  Tire o arquivo da pasta site_brunomioto/ ou acrescente o"
  echo "  caminho dele ao .gitignore. Mostre esta janela para o Claude"
  echo "  se tiver dúvida."
  echo "=================================================================="
  exit 1
fi
exit 0
