---
description: Arranca un proyecto nuevo (web de negocio local o API Node) con el flujo completo - brief, scaffold, diseño, auditoría y entrega. Para cambios sobre un proyecto existente NO se usa; ahí van /lanzamiento o /entregar.
argument-hint: "[web|api] [nombre del negocio o de la API]"
---

# /empezar $ARGUMENTS

Orquestas el arranque de un proyecto nuevo. Tú no diseñas ni maquetas aquí: llamas a las skills en orden y **paras entre fases** para que el usuario confirme. Cada fase deja un artefacto en disco, así se puede retomar en otra sesión sin repetir nada.

Lee `rules/comun.md` antes de empezar (ya está cargado en las reglas globales). Todo en español de España.

## 0. Comprobaciones

- Si la carpeta actual tiene `index.html`, `package.json` o `docs/brief.md`, **para**: este comando es para proyectos nuevos. Di qué comando toca (`/lanzamiento` para auditar, `/entregar` para preparar la entrega) y termina.
- Tipo: `web` o `api`. Si no viene en los argumentos, pregúntalo antes de nada. Si no viene nombre, pídelo en la misma pregunta.
- Si la carpeta está vacía o solo tiene `.git`, sigue.

## 1. Brief (skill `grilling`)

Invoca la skill `grilling` y dile que use como árbol de partida:
- web → `skills/nueva-web/referencias/brief-web.md`
- api → `skills/nueva-web/referencias/brief-api.md`

Antes de la primera ronda, lanza subagentes para los **hechos**: para una web, buscar el negocio en Google (ficha, reseñas, horarios), Instagram y si ya tiene web; para una API, leer el esquema SQL o el cliente que la va a consumir si está en el disco. Presenta lo encontrado como hechos y pregunta solo las decisiones.

Cuando la frontera esté vacía, guarda `docs/brief.md` con el esquema que marca el archivo de referencia. Enseña el brief y **para**: no sigas hasta que el usuario diga que está bien.

## 2. Scaffold (skill `nueva-web`)

Solo para `web`. Invoca `nueva-web`: genera la estructura completa desde `docs/brief.md` (plantillas, `datos.js` con los datos del brief y la cinta de aviso activa, tabla Real/Inventado, `_headers`, 404, sitemap, robots, manifest, privacidad, gracias).

Para `api`: crea el esqueleto siguiendo `skills/nueva-web/referencias/api.md` (Express + helmet + cors + rate-limit + validator + mysql2, `.env.example`, `scripts/seed.js`, tests mínimos con `node --test`).

Abre el resultado (o arranca el servidor) y comprueba que carga sin errores de consola. **Para** y enseña qué se ha generado.

## 3. Diseño (solo web)

Invoca `impeccable` en modo new-work con el brief como dirección y las restricciones del stack: HTML/CSS/JS vanilla, sin CDN, fuentes en `assets/fuentes/`, `prefers-reduced-motion`, móvil primero. Consulta `ui-recursos` si el brief pide efectos, y reimplementa en vanilla lo que sea React.

No toques `datos.js` para meter contenido: el contenido va en el brief y en `datos.js`, el diseño en `estilos.css` y `app.js`.

Captura escritorio y 400 px, corrige en una pasada y **para**.

## 4. Auditoría (skill `lanzamiento`)

Invoca `lanzamiento` completa. Arregla por prioridad. Lo que necesite datos del cliente queda como ❓ y se pregunta en bloque. Informe en `docs/auditoria-lanzamiento.md`.

## 5. Entrega (skill `entrega-cliente`)

Invoca `entrega-cliente`: genera `LEEME.md`, `MENSAJE.md` (y lo mete en `.gitignore`) y `CLAUDE.md` del proyecto con la tabla Real/Inventado y el estado comercial.

## 6. Cierre

- `git init` si no hay repo, `.gitignore` con `MENSAJE.md`, primer commit en español: `Maqueta inicial de <negocio>` o `Esqueleto inicial de <api>`.
- Resumen final: qué se ha generado, qué queda `[PENDIENTE]`, y los pasos manuales (subir a Cloudflare Pages, dominio, enviar el mensaje). No hagas push sin que lo pida.

## Reglas del orquestador

- Una fase por turno cuando la fase produce algo que el usuario debe ver. No encadenes 1→6 sin parar.
- Si el usuario quiere saltarse una fase ("el diseño ya lo tengo"), sáltala y anótalo en `CLAUDE.md` del proyecto.
- Si una skill no está disponible, dilo y haz la fase a mano siguiendo `rules/comun.md`; no inventes que se ha ejecutado.
- Nunca inventes teléfono, email, dirección, NIF, GA4 ni testimonios. Va en el brief como pendiente.
