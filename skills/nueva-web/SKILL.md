---
name: nueva-web
description: Scaffold de una web estática para negocio local con las convenciones del usuario (HTML/CSS/JS vanilla, datos.js centralizado, cinta de aviso, _headers con CSP, 404, sitemap, robots, manifest, privacidad, gracias, fuentes locales). Usar al arrancar una web nueva desde un brief, o cuando el usuario diga "monta la web", "hazme la estructura", "scaffold". Para APIs Node usa referencias/api.md.
---

# Nueva web

Generas el esqueleto completo de una web de negocio local a partir de `docs/brief.md` (lo produce `/empezar`; si no existe, pide los datos mínimos: nombre, tipo de negocio, pueblo, acción principal, secciones, y si es maqueta o encargo).

Las plantillas de `plantillas/` son la fuente. Cópialas, sustituye los `{{MARCADORES}}` y borra lo que el brief no pida. No reinventes la estructura: está extraída de proyectos reales y cada decisión tiene motivo escrito en los comentarios.

## Estructura que generas

```
index.html                 una página con anclas (más páginas solo si el brief lo pide)
404.html  gracias.html  privacidad.html
_headers  robots.txt  sitemap.xml  site.webmanifest  llms.txt  favicon.ico
desplegar.sh               lista blanca de lo que sube a Cloudflare
.gitignore  .gitattributes
README.md                  público, corto
docs/brief.md              ya existe
assets/
  datos.js                 LO ÚNICO QUE SE TOCA: textos, precios, horario, contacto, AVISO
  app.js                   pinta desde datos.js por atributos data-*
  estilos.css              tokens en :root, secciones numeradas, bloque de accesibilidad
  fuentes/                 woff2 variables + fuentes.css
  fotos/                   optimizadas; originales/ en .gitignore
  img/                     favicon.svg, icono-192/512, apple-touch-icon, og.jpg
```

Rutas **relativas** (`assets/estilos.css`): la web se abre con doble clic y funciona igual en Cloudflare. Todo asset lleva `?v=1`.

## Reglas duras

1. **Sin build, sin npm, sin CDN.** Fuentes y librerías descargadas en `assets/`. La CSP de `_headers` es `default-src 'self'` y no se relaja para meter un tercero: si el brief pide mapa embebido o formulario externo, se avisa del coste y se hace con enlace saliente por defecto.
2. **Nunca inventes datos reales.** Teléfono placeholder literal `6XX XX XX XX` y `whatsapp: ''`. Email, dirección exacta, NIF, RRSS: solo si constan en el brief como reales; si no, `[PENDIENTE: …]` en `datos.js` y `<span class="pendiente">` en el HTML legal. El marcador amarillo es visible a propósito.
3. **Cinta de aviso** (`AVISO.visible: true`) mientras haya datos inventados o pendientes. Se quita en `entrega-cliente`, no aquí.
4. **Maqueta en frío**: `robots.txt` con `Disallow: /` y `<meta name="robots" content="noindex, nofollow">` en todas las páginas, con el comentario de cómo revertirlo. **Encargo**: `Allow: /` y sin noindex.
5. **Degradación en cascada**: la web se lee sin JS, sin librería y con `prefers-reduced-motion`. `.revelar` es visible por defecto; solo `.js .revelar` arranca en opacidad 0.
6. **`localStorage`/`sessionStorage` siempre en `try/catch`.**
7. **Español en todo**: clases BEM (`.cabecera__interior`, `.pie__legal`), variables (`--tinta`, `--papel`), funciones (`pintarHorario`), archivos. Comentarios que explican el *por qué*.
8. **Fuentes**: par serif (títulos) + sans (texto), variables, `woff2`, `font-display: swap`, subconjunto latino, `preload` + `crossorigin` de las dos. Nunca negro puro para tinta ni blanco puro de fondo.
9. **Doble señal en cada estado**: color más texto, icono o atributo ARIA. Nunca solo un punto de color.
10. **OG con URL absoluta y 1200×630**: sin ella WhatsApp no saca la tarjeta.

## Proceso

1. Lee `docs/brief.md` y `rules/comun.md`. Decide: una página o varias, qué secciones, maqueta o encargo, qué datos son reales.
2. Copia `plantillas/` a la raíz del proyecto. Sustituye marcadores (`{{NEGOCIO}}`, `{{LEMA}}`, `{{POBLACION}}`, `{{TIPO}}`, `{{URL}}`, `{{COLOR_FONDO}}`, `{{COLOR_ACENTO}}`, `{{SERIF}}`, `{{SANS}}`, `{{FECHA}}`). Busca los que queden con `grep -rn "{{" .` y no dejes ninguno.
3. Rellena `assets/datos.js` con lo que hay en el brief. La cabecera del archivo lleva la lista "QUÉ ES REAL / QUÉ ESTÁ INVENTADO": escríbela de verdad, no dejes la de ejemplo.
4. Descarga las dos fuentes (Google Fonts → woff2 variable, subconjunto latin) en `assets/fuentes/`. Si no hay red, deja el `@font-face` y anótalo como pendiente. Nunca enlaces a fonts.googleapis.com.
5. Fotos: si el brief trae fotos, optimízalas (`ffmpeg -i original.png -vf "scale='min(1400,iw)':-2:flags=lanczos" -q:v 4 salida.jpg`) a `assets/fotos/` y guarda los originales en `assets/fotos/originales/`. Si no hay, usa `<div class="marcador-foto">` con la medida escrita dentro; nunca fotos de stock que parezcan del negocio.
6. Genera `favicon.svg` simple con la inicial y los colores del negocio, y a partir de él los PNG (`icono-192`, `icono-512`, `apple-touch-icon` 180). `og.jpg` se hace al final con una captura de la portada a 1200×630.
7. JSON-LD en `index.html` según tipo: `Restaurant`, `Store`, `HairSalon`, `MedicalClinic`, `LocalBusiness` por defecto. Solo con datos reales; los pendientes no entran en el JSON-LD.
8. Abre `index.html`, comprueba consola limpia, 400 px sin scroll horizontal, cinta de aviso visible, enlaces `tel:`/WhatsApp apuntando a placeholder (no a un número real inventado).
9. `git init`, primer commit `Maqueta inicial de {{NEGOCIO}}`. Sin push.

## Modo completar (proyecto existente)

Si la carpeta ya tiene proyecto, no se genera desde cero: se pasa `referencias/inventario.md`, se marca qué hay y qué falta, y **solo se crean los archivos que faltan**, adaptados a lo que ya existe:

- Respeta el linaje de rutas del proyecto (`assets/css/` + `assets/js/` con rutas absolutas, o `assets/` plano con relativas). Las plantillas se ajustan al copiarlas, no al revés.
- Las páginas nuevas (`404.html`, `gracias.html`, `privacidad.html`) usan las clases y el CSS que ya hay. Si no existe una clase equivalente (`.pagina-texto`, `.pendiente`, `.aviso-maqueta`), se añade ese bloque al CSS existente al final, con su comentario de sección.
- Nunca sobrescribas un archivo que existe. Si está a medias (un `_headers` sin CSP, un `sitemap.xml` sin todas las páginas), edítalo y di qué has añadido.
- Migrar contenido hardcodeado a `datos.js`, quitar un tercero o cambiar rutas son cambios gordos: se proponen, no se hacen de paso.
- La salida es la tabla del inventario más la lista de lo creado y lo que queda para el usuario o el cliente.

## Lo que NO hace esta skill

- No diseña: deja tokens neutros y estructura sólida. El diseño lo hace `impeccable` después (`/empezar` fase 3).
- No escribe `LEEME.md`, `MENSAJE.md` ni `CLAUDE.md`: eso es `entrega-cliente`.
- No audita: eso es `lanzamiento`.

## Referencias

- `referencias/brief-web.md` y `brief-api.md`: árboles de preguntas para `grilling`.
- `referencias/api.md`: scaffold equivalente para APIs Node.
- `referencias/inventario.md`: qué tiene que haber en un proyecto terminado y cómo detectarlo. Base del modo completar y del modo adoptar de `/empezar`.
- Proyectos de origen de estas convenciones: ver `rules/privado.md`.
