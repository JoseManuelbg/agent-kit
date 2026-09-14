# Reglas comunes (agent-kit)

Convenciones de José Manuel para cualquier proyecto. Se cargan en todas las sesiones.
Los datos concretos de clientes y el contexto comercial viven en `rules/privado.md` (ignorado por git).

## Quién soy y qué hago
- Desarrollador. Hago **webs para negocios locales** (restaurantes, tiendas, clínicas) y **APIs Node** internas.
- Muchas webs son **maquetas comerciales en frío**: se hacen ANTES de tener cliente, para enseñárselas y venderlas. No son encargos pagados hasta que lo son.
- Idioma: **español de España** en código de cara al usuario, comentarios, docs y respuestas. Nombres de archivo en español (`estilos.css`, `datos.js`, `LEEME.md`).

## Stack por defecto (webs)
- **HTML + CSS + JS vanilla. Sin build, sin npm, sin framework.** Se abre, se edita y se sube. No añadas React/Tailwind/bundlers para resolver un efecto.
- Contenido editable centralizado en `assets/datos.js` ("lo único que hay que tocar"): productos, precios, horarios, textos. El JS pinta desde ahí.
- Estructura típica: `index.html` (+ páginas sueltas), `assets/estilos.css`, `assets/app.js`, `assets/datos.js`, `assets/fuentes/` (woff2 subset, auto-hospedadas), `assets/fotos/` (optimizadas; `originales/` no se despliega).
- **Cero terceros en producción**: tipografías y librerías (p. ej. GSAP) descargadas en `assets/`, no CDN. Permite una CSP `default-src 'self'`.
- Despliegue: **Cloudflare Pages** (`*.pages.dev`). Cabeceras de seguridad y caché en `_headers` (HTML `no-cache`, assets con `?v=N` y caché larga).
- Siempre: `404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, favicon completo, página `gracias.html` con noindex, `privacidad.html`.

## Datos reales vs inventados — regla innegociable
- En maquetas se inventan precios, stock, horarios, reseñas, nombres de equipo. **Siempre** se documenta en una tabla "Real / Inventado" (en `LEEME.md` y en el `CLAUDE.md` del proyecto) de dónde salió cada dato real.
- Mientras haya datos sin confirmar, la web lleva una **cinta de aviso** visible (`AVISO.visible` en `datos.js`).
- Nunca inventes teléfono, email, dirección, NIF, ID de GA4 ni testimonios como si fueran reales. Pregunta o marca `[PENDIENTE: …]`.

## Documentos de cada proyecto de cliente
- `LEEME.md` — para mí: cómo se abre, qué archivo se toca, tabla real/inventado, qué revisar antes de enseñarla.
- `MENSAJE.md` — guion comercial, objeciones, seguimiento. **Va en `.gitignore`**: Cloudflare sirve todo el repo y esto no lo puede leer el cliente.
- `CLAUDE.md` — contexto del proyecto: estado comercial (fechas, respuestas), el negocio, estructura, decisiones no evidentes.
- Lección aprendida: **el enlace a la web va DENTRO del primer mensaje**, nunca "¿os paso el enlace?" — un sí/no invita al no.

## Cómo trabajar conmigo
- Directo, sin paja. Si algo de una lista que te paso no aplica a mi caso, dilo y no lo metas por meter.
- Antes de lanzar una web: pasa `/lanzamiento`. Para efectos visuales: consulta `/ui-recursos` antes de inventar.
- Al arreglar, prioridad: seguridad → roto → legal → SEO → pulido.
- Commits en español, en imperativo corto.
