# Contexto — agent-kit

Lee también `rules/comun.md` (quién es el usuario, cómo trabaja) y `README.md` (estructura e instalación). Si existe `rules/privado.md` (ignorado por git), léelo también: contiene datos de clientes y contexto comercial.

## Qué es esto y de dónde viene

José Manuel recopila listas de buenas prácticas (vídeos de "20 cosas que decirle a la IA antes de lanzar tu web", listas de librerías UI, checklists de seguridad en inglés) y quería una forma de que un agente de código las aplicara sistemáticamente. Se descartaron plantilla estática y script generador: **el formato correcto son skills** (checklists versionados que el agente carga bajo demanda y adapta al tipo de proyecto).

Después quiso algo "como [ECC](https://github.com/affaan-m/ecc) pero a menor escala": un repo descargable, instalable con un comando, reutilizable con otros agentes. Este repo es eso.

## Estado

- Skills propias: `lanzamiento` (4 checklists, ~110 items), `ui-recursos`, `nueva-web` (scaffold + plantillas + referencias de brief y API, extraído de la-yedra, la-carpanta, rg-brenes, ar-centro-belleza, apiZonalytic e incidenciasApi el 14/09/2026) y `entrega-cliente` (LEEME/MENSAJE/CLAUDE.md).
- Skills externas copiadas literales: `grilling` + `grill-me` (Matt Pocock), `thermo-nuclear-code-quality-review` (Cursor), `impeccable` (con sus 4 subagentes en `agents/`).
- Comandos: `/empezar` (orquesta arranque en 6 fases, para entre fases) y `/entregar` (auditoría + documentos + privacidad del repo).
- Tres modos de trabajo documentados en README: arranque (flujo completo), cambio pequeño (sin skill), antes de enseñar (`/entregar`). El usuario hace muchos cambios pequeños, no uno gordo: el flujo completo NO se aplica a cambios.
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

1. Hook en `settings.json` (Stop o PreToolUse de `git commit`) que compruebe que `MENSAJE.md` está en `.gitignore` y que no hay secretos. Es lo único que protege el modo "cambio pequeño".
2. `lanzamiento`: añadir verificación real (abrir la web, captura a 400 px y escritorio, consola, enlaces). Hoy es una lista que se lee, no una prueba que se pasa.
3. `testing-api`: tests mínimos `node --test` + supertest. La base ya está en `nueva-web/referencias/api.md`; ninguna API real tiene tests.
4. Skills de UI/animación, evaluadas el 14/09/2026 y todas válidas para vanilla: Anthropic `frontend-design`, Vercel `web-design-guidelines`, LottieFiles `motion-design-skill`, `web-animation-design` (vercel-labs/open-agents), GSAP (MengTo/Skills). Descartadas por stack: `ui-ux-pro-max` (Tailwind por defecto, Python), `taste-skill` (React).
5. Verificar con WebFetch las librerías "por verificar" de `ui-recursos`.
6. `diseño`: necesita referencias (webs, capturas, paletas).
7. Pasar a `agent-kit` tres kits de "10 SKILLS ADRI Y JUANPE": `prospeccion`, `auditoria-negocio`, `instagram-a-web` (adaptado a `datos.js`). `auditoria-seo` se fusiona en `lanzamiento/checklists/seo.md`. `web-scrolling` se descarta (un solo HTML, contradice las convenciones).

Decisión de plantillas de `nueva-web`: estructura plana `assets/estilos.css`, `assets/app.js`, `assets/datos.js`, `assets/fuentes/`, `assets/fotos/` (la de `rules/comun.md`) con rutas relativas. Los proyectos reales tienen dos linajes (`assets/css/`, `assets/js/`, `assets/fonts/` con rutas absolutas en la-carpanta y la-yedra); se eligió el de `comun.md` para no contradecir la regla. `DATOS` es un único objeto (estilo la-yedra) y el render va por atributos `data-*`.

## Cómo seguir trabajando aquí

- Si el usuario trae listas nuevas, **fusionarlas en los checklists existentes** en vez de crear archivos nuevos.
- Cada skill nueva: `skills/<nombre>/SKILL.md` + referencias en subcarpetas; añadirla a la tabla de `README.md` y `AGENTS.md`.
- Tras cambios: commit en español + push. Con instalación por enlace no hay que reinstalar; si se añaden carpetas nuevas de primer nivel, sí hay que actualizar `$Dirs` en `install.ps1`/`install.sh`.
- Verificar que las skills se ven: en una sesión nueva de Claude Code, escribir `/` y comprobar que aparecen `lanzamiento` y `ui-recursos`. Si no aparecen con el enlace, usar `install.ps1 -Copy`.
- Nunca subir `rules/privado.md`: está en `.gitignore`.
