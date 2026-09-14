# agent-kit — instrucciones para agentes

Este repo es un kit personal de skills y reglas para agentes de código. Fuente única de verdad:

- `skills/<nombre>/SKILL.md` — workflows reutilizables en formato Agent Skills (estándar abierto: lo leen Claude Code, Codex, Cursor, OpenCode…). Cada skill tiene frontmatter `name` + `description` y puede traer archivos de referencia en subcarpetas.
- `rules/*.md` — convenciones que aplican siempre. **Lee `rules/comun.md` antes de tocar nada.**
- `agents/` — subagentes especializados (por ahora vacío).
- `commands/` — atajos de comando (por ahora vacío).

## Si eres Claude Code
Se instala con `install.ps1` / `install.sh` (enlaza a `~/.claude/`) o como plugin:
`/plugin marketplace add JoseManuelbg/agent-kit` → `/plugin install agent-kit@agent-kit`.
No uses las dos vías a la vez (duplica skills).

## Si eres otro agente (Codex, Cursor, Gemini…)
Todavía no hay adaptador. Copia `skills/*` a la carpeta de skills de tu herramienta y trata `rules/comun.md` como instrucciones del sistema. Cuando se añada un adaptador, `install.ps1 -Target <agente>` lo hará solo.

## Skills disponibles
| Skill | Para qué |
|---|---|
| `nueva-web` | Scaffold de web estática desde `docs/brief.md` con plantillas. `referencias/` trae los árboles de brief (web, API) y el scaffold de API Node. |
| `entrega-cliente` | Genera o actualiza `LEEME.md`, `MENSAJE.md` (gitignorado) y `CLAUDE.md` del proyecto con la tabla Real/Inventado. |
| `lanzamiento` | Auditoría pre-lanzamiento de web/API: SEO/GEO, UX, técnico/legal, seguridad. Arregla por prioridad. |
| `ui-recursos` | Catálogo de librerías UI para efectos e inspiración. Verificar con WebFetch las marcadas "por verificar". |
| `impeccable` | Diseño de interfaz (externa). Sus subagentes están en `agents/`. |
| `grilling` / `grill-me` | Entrevista por rondas para cerrar decisiones (externa, MIT). `/empezar` la usa con los árboles de `nueva-web/referencias/`. |
| `thermo-nuclear-code-quality-review` | Revisión de mantenibilidad muy estricta (externa). Para APIs, de tarde en tarde. |
| `motion-design`, `web-animation-design` | Criterio de animación (externas). Se cargan solas al trabajar movimiento. Vanilla-friendly. |
| `web-design-guidelines` | Auditoría de UI contra las guías de Vercel (externa). `/entregar` la usa en webs. |

## Comandos

| Comando | Para qué |
|---|---|
| `/empezar [web\|api] [nombre]` | Orquesta el arranque: brief → scaffold → diseño → auditoría → entrega. Para entre fases. En proyecto existente: inventario (`nueva-web/referencias/inventario.md`), completa lo que falta sin tocar lo que hay, y sigue por la fase que toque. |
| `/entregar [categoría]` | Antes de enseñar o subir: `lanzamiento` + `entrega-cliente` + comprobación de privacidad del repo. |
