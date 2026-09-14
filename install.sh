#!/usr/bin/env bash
# Instala agent-kit en Claude Code (macOS / Linux). Ver install.ps1 para Windows.
#   ./install.sh            # enlaza (symlinks)
#   ./install.sh --copy     # copia
#   ./install.sh --uninstall
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$HOME/.claude"
CLAUDE_MD="$CLAUDE_DIR/CLAUDE.md"
DIRS=(skills agents commands)
MODE=link
[[ "${1:-}" == "--copy" ]] && MODE=copy
mkdir -p "$CLAUDE_DIR"

if [[ "${1:-}" == "--uninstall" ]]; then
  for d in "${DIRS[@]}"; do
    dest="$CLAUDE_DIR/$d"
    if [[ -L "$dest" ]]; then rm "$dest"; echo "Quitado enlace $dest"
    elif [[ -f "$dest/.agent-kit-copy" ]]; then rm -rf "$dest"; echo "Quitada copia $dest"; fi
  done
  [[ -f "$CLAUDE_MD" ]] && { grep -v "$ROOT" "$CLAUDE_MD" > "$CLAUDE_MD.tmp" || true; mv "$CLAUDE_MD.tmp" "$CLAUDE_MD"; }
  echo "agent-kit desinstalado."; exit 0
fi

for d in "${DIRS[@]}"; do
  src="$ROOT/$d"; dest="$CLAUDE_DIR/$d"
  if [[ -e "$dest" && ! -L "$dest" ]]; then
    if [[ -n "$(ls -A "$dest" 2>/dev/null)" && ! -f "$dest/.agent-kit-copy" ]]; then
      bak="$dest.bak-$(date +%Y%m%d-%H%M%S)"; mv "$dest" "$bak"
      echo "AVISO: $dest tenía contenido ajeno, movido a $bak"
    else rm -rf "$dest"; fi
  fi
  if [[ "$MODE" == copy ]]; then
    [[ -L "$dest" ]] && rm "$dest"
    rm -rf "$dest"; cp -R "$src" "$dest"; touch "$dest/.agent-kit-copy"; echo "Copiado  $d -> $dest"
  else
    [[ -L "$dest" ]] || ln -s "$src" "$dest"; echo "Enlazado $d -> $dest"
  fi
done

added=0
for r in "$ROOT"/rules/*.md; do
  line="@$r"
  grep -qxF "$line" "$CLAUDE_MD" 2>/dev/null || { echo "$line" >> "$CLAUDE_MD"; added=$((added+1)); }
done
echo "Reglas: $added import(s) nuevo(s) en $CLAUDE_MD"
echo; echo "Listo. Abre una sesión nueva de Claude Code y prueba /lanzamiento."
