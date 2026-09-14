# Inventario de un proyecto — qué tiene que haber y cómo detectarlo

Lo usan `/empezar` (modo adoptar) y `nueva-web` (modo completar) sobre un proyecto **ya existente**. Se recorre entero, se marca cada punto y se propone completar solo lo que falta. **Nunca se sobrescribe lo que existe**: si un archivo está pero incompleto, se marca ⚠️ y se dice qué le falta.

Leyenda: ✅ está · ⚠️ está a medias · ❌ falta · ➖ no aplica a este tipo de proyecto

## 1. Detectar el tipo

| Pista | Tipo |
|---|---|
| `index.html` en raíz, sin `package.json` | Web estática (linaje A `assets/css/`+`assets/js/` o linaje B `assets/` plano; se respeta el que tenga) |
| `package.json` con `express` | API Node |
| `package.json` con `vite`, `react`, `next` | Web con framework: solo aplica `lanzamiento` y `entrega-cliente`, no el scaffold |
| `datos.js` en cualquier ruta | Ya sigue la convención de contenido centralizado |

## 2. Web estática

| Qué | Cómo se detecta | Si falta |
|---|---|---|
| Brief | `docs/brief.md` | Reconstruirlo desde `CLAUDE.md`, `LEEME.md`, `datos.js` y el HTML. Si hay huecos grandes, ronda corta de `grilling` solo sobre lo que no se puede deducir. |
| Contenido centralizado | `assets/datos.js` o `assets/js/datos.js` | Crear con lo que hay hardcodeado en el HTML (sin migrar el HTML: eso es un cambio gordo, se propone aparte). |
| Cinta de aviso | `AVISO` en `datos.js` + `[data-aviso]` o `#aviso` en HTML | Añadir solo si es maqueta con datos inventados. |
| Cabeceras | `_headers` con CSP `default-src 'self'` y `Cache-Control` para HTML y assets | Copiar plantilla. Si la web carga terceros (grep `https://` en `<script>`/`<link>`), avisar de que la CSP los rompería y no relajarla sin decirlo. |
| `404.html` | existe y sin `canonical` | Plantilla, con las clases del CSS existente. |
| `gracias.html` | existe con `noindex` | Solo si hay formulario. |
| `privacidad.html` | existe con titular, NIF, cookies, terceros | ⚠️ si faltan datos del titular: marcar con `<span class="pendiente">`. |
| `robots.txt` | existe; `Disallow: /` si es maqueta, `Allow: /` si es real; `Sitemap:` | Según estado comercial. |
| `sitemap.xml` | existe, una `<url>` por página indexable, sin la 404 | Generar desde los `*.html`. |
| `site.webmanifest` | existe, con iconos 192 y 512 | Plantilla. |
| `llms.txt` | existe | Plantilla mínima. |
| Favicon completo | `favicon.ico` + `favicon.svg` + `apple-touch-icon.png` + `icono-192/512.png` | Generar desde el SVG o desde el logo. |
| Metas | `title`, `description` ≤ 165, `canonical`, OG con URL **absoluta** 1200×630, `theme-color` | Completar en cada página. |
| `noindex` | `<meta name="robots">` en cada página si es maqueta; ninguno si es real | Coherente con `robots.txt`. |
| JSON-LD | `application/ld+json` con `LocalBusiness` o subtipo, solo datos reales | Añadir si hay datos reales; si no, ➖. |
| Fuentes locales | `@font-face` con `src: url(...)` local, `preload` de las dos principales, ningún `fonts.googleapis.com` | Descargar y sustituir. Es prioridad: RGPD. |
| Cero CDN | `grep -rn "https://" *.html assets/*.css` sin scripts ni estilos externos | Descargar a `assets/`. |
| `?v=N` | assets con `?v=` en todos los HTML | Añadir `?v=1` a CSS y JS. |
| `.gitignore` | `MENSAJE.md`, `assets/fotos/originales/` o `assets/img/originales/` | Añadir. Si `MENSAJE.md` está trackeado: `git rm --cached` y avisar. |
| `.gitattributes` | `* text=auto eol=lf` + binarios | Plantilla. |
| `desplegar.sh` | existe, lista blanca | Plantilla con las rutas del linaje que tenga. |
| Accesibilidad base | `.saltar` o skip-link, `:focus-visible`, `prefers-reduced-motion`, `lang="es"` | Añadir el bloque 14 de la plantilla CSS. |
| Fotos optimizadas | ninguna > 400 KB en `assets/fotos` o `assets/img` | Optimizar y mover originales. |
| `README.md` | existe, público, corto | Plantilla. |
| `LEEME.md` | tabla Real/Inventado con fuente, checklist | `entrega-cliente`. |
| `MENSAJE.md` | existe y **no está trackeado** | `entrega-cliente`. |
| `CLAUDE.md` | qué es, estado comercial con fechas, decisiones | `entrega-cliente`. |
| Auditoría | `docs/auditoria-lanzamiento.md` | `lanzamiento`. |

## 3. API Node

| Qué | Cómo se detecta | Si falta |
|---|---|---|
| `app.js` / `server.js` separados | `src/app.js` exporta la app sin `listen` | Proponer el split (es cambio pequeño y desbloquea tests y Vercel). |
| Cadena de middlewares | `helmet`, `cors` con lista blanca, `express.json` con `limit`, `rateLimit`, `trust proxy` | Añadir los que falten en el orden de `api.md`. |
| Errores uniformes | `errorHandler` que devuelve `{ error, message }` y `notFound` | Unificar. |
| Validación | `express-validator` en rutas de escritura | Añadir donde falte. |
| Auth | `requireAuth` / `requireApiKey` con comparación segura | Revisar. |
| `.env.example` | existe, sin valores reales, con todas las variables que usa `process.env` | Generar con `grep -rhoE "process\.env\.[A-Z_]+" src | sort -u`. |
| `.gitignore` | `.env`, `.env.*`, `!.env.example`, `node_modules/` | Añadir. Si `.env` está trackeado: parar y avisar, es una fuga. |
| Scripts | `migrate`, `seed` idempotentes | Crear si hay BBDD. |
| Tests | `test/*.test.js` con `node --test` y `supertest`; `npm test` no es el `echo "Error"` por defecto | Crear los tres mínimos de `api.md`. |
| CI | `.github/workflows/ci.yml` con `node --check` y `npm test` | Plantilla. |
| README | arranque, endpoints en tabla, variables, usuarios de prueba | Plantilla de `api.md`. |
| Healthcheck | `GET /` devuelve `{ status: 'ok' }` | Añadir. |

## 4. Salida

Tabla por bloque con la leyenda, y debajo tres listas:

1. **Lo que completo ahora sin preguntar**: archivos que faltan y no dependen de datos del cliente ni de decisiones (`_headers`, `404.html`, `.gitattributes`, `sitemap.xml`, `?v=`, bloque de accesibilidad, `.env.example`).
2. **Lo que necesita decisión**: migrar contenido a `datos.js`, split `app.js`/`server.js`, quitar un tercero, cambiar de linaje de rutas. Se pregunta en bloque, con recomendación.
3. **Lo que necesita al cliente**: datos `[PENDIENTE]`. Va a `LEEME.md` vía `entrega-cliente`.

Después de completar, seguir en `/empezar` por la fase que toque: normalmente auditoría (4) y entrega (5).
