# Contexto — agent-kit

Lee también `rules/comun.md` (quién es el usuario, cómo trabaja) y `README.md` (estructura e instalación). Si existe `rules/privado.md` (ignorado por git), léelo también: contiene datos de clientes y contexto comercial.

## Qué es esto y de dónde viene

José Manuel recopila listas de buenas prácticas (vídeos de "20 cosas que decirle a la IA antes de lanzar tu web", listas de librerías UI, checklists de seguridad en inglés) y quería una forma de que un agente de código las aplicara sistemáticamente. Se descartaron plantilla estática y script generador: **el formato correcto son skills** (checklists versionados que el agente carga bajo demanda y adapta al tipo de proyecto).

Después quiso algo "como [ECC](https://github.com/affaan-m/ecc) pero a menor escala": un repo descargable, instalable con un comando, reutilizable con otros agentes. Este repo es eso.

## Estado

- Skills `lanzamiento` (4 checklists consolidados a partir de varias listas, ~110 items deduplicados) y `ui-recursos`.
- Estructura: `skills/`, `rules/`, `agents/`, `commands/`, `.claude-plugin/`.
- `install.ps1` / `install.sh` con modo enlace (junction/symlink) y modo copia, más desinstalación. Las reglas se importan en `~/.claude/CLAUDE.md` con líneas `@ruta`.
- `rules/comun.md` está extraído de las convenciones reales de proyectos de webs para negocios locales; los nombres concretos están en `rules/privado.md`.

Decisiones tomadas:
- **Solo Claude Code por ahora.** `AGENTS.md` y el parámetro `-Target` quedan preparados para añadir adaptadores (Cursor, Codex) después.
- Nombre `agent-kit`: neutro, no atado a un agente concreto.
- Instalación por enlace preferida sobre plugin mientras el kit esté en desarrollo (edición inmediata). Plugin como vía para otros PCs.
- Banner de cookies en el checklist es condicional (solo si hay cookies no esenciales, p. ej. GA4).
- Regla de oro en `lanzamiento`: nunca inventar datos reales del cliente; preguntar en bloque al final.

## Próximos pasos

Skills que más rentan, en este orden, porque el contenido ya existe en proyectos reales y se puede extraer:
1. `nueva-web` — scaffold de web estática con las convenciones (`_headers`, `datos.js`, 404, sitemap, fuentes locales).
2. `entrega-cliente` — generar `LEEME.md` + `MENSAJE.md` (en .gitignore) + `CLAUDE.md` del proyecto con la tabla real/inventado.
3. `diseño` — necesita referencias (webs, capturas, paletas). Aquí encajan las librerías de `ui-recursos`.
4. `testing-api` — para las APIs Node.
5. Verificar con WebFetch las librerías "por verificar" de `ui-recursos` y actualizar la tabla.

## Cómo seguir trabajando aquí

- Si el usuario trae listas nuevas, **fusionarlas en los checklists existentes** en vez de crear archivos nuevos.
- Cada skill nueva: `skills/<nombre>/SKILL.md` + referencias en subcarpetas; añadirla a la tabla de `README.md` y `AGENTS.md`.
- Tras cambios: commit en español + push. Con instalación por enlace no hay que reinstalar; si se añaden carpetas nuevas de primer nivel, sí hay que actualizar `$Dirs` en `install.ps1`/`install.sh`.
- Verificar que las skills se ven: en una sesión nueva de Claude Code, escribir `/` y comprobar que aparecen `lanzamiento` y `ui-recursos`. Si no aparecen con el enlace, usar `install.ps1 -Copy`.
- Nunca subir `rules/privado.md`: está en `.gitignore`.
