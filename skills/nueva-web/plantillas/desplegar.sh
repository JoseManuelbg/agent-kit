#!/usr/bin/env bash
# Despliega la web a Cloudflare Pages SIN los archivos privados.
# Cloudflare sirve todo lo que se sube: MENSAJE.md, LEEME.md, CLAUDE.md,
# docs/ y las fotos originales no pueden ir en el despliegue.
# LISTA BLANCA: solo sube lo que está aquí. Lo nuevo hay que añadirlo a mano.
#
# Uso: bash desplegar.sh          (necesita wrangler: npm i -g wrangler && wrangler login)
set -e

PROYECTO="{{PROYECTO_CLOUDFLARE}}"
ORIGEN="$(cd "$(dirname "$0")" && pwd)"
DESTINO="$(mktemp -d)"

cp "$ORIGEN"/*.html "$DESTINO/"
cp "$ORIGEN"/robots.txt "$ORIGEN"/sitemap.xml "$ORIGEN"/site.webmanifest \
   "$ORIGEN"/favicon.ico "$ORIGEN"/llms.txt "$ORIGEN"/_headers "$DESTINO/"
mkdir -p "$DESTINO/assets/fotos"
cp "$ORIGEN"/assets/*.js "$ORIGEN"/assets/*.css "$DESTINO/assets/"
cp -r "$ORIGEN/assets/fuentes" "$ORIGEN/assets/img" "$DESTINO/assets/"
find "$ORIGEN/assets/fotos" -maxdepth 1 -type f \( -name "*.jpg" -o -name "*.webp" -o -name "*.png" \) -exec cp {} "$DESTINO/assets/fotos/" \;

echo "Contenido a desplegar:"
find "$DESTINO" -type f | sed "s|$DESTINO/||" | sort

wrangler pages deploy "$DESTINO" --project-name="$PROYECTO" --branch=main --commit-dirty=true
rm -rf "$DESTINO"
