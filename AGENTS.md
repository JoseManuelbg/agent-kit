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
| `lanzamiento` | Auditoría pre-lanzamiento de web/API: SEO/GEO, UX, técnico/legal, seguridad. Arregla por prioridad. |
| `ui-recursos` | Catálogo de librerías UI para efectos e inspiración. Verificar con WebFetch las marcadas "por verificar". |
