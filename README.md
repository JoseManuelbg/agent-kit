# agent-kit

Kit personal para agentes de código (Claude Code hoy; preparado para otros): skills, reglas y agentes que hacen que cada proyecto arranque con mis convenciones y checklists ya cargados. Versión a escala humana de [ECC](https://github.com/affaan-m/ecc).

```
agent-kit/
├── skills/            ← workflows (formato SKILL.md, estándar Agent Skills)
│   ├── nueva-web/     ← scaffold de web estática + plantillas + referencias (brief, API)
│   ├── entrega-cliente/ ← LEEME.md, MENSAJE.md y CLAUDE.md del proyecto
│   ├── lanzamiento/   ← auditoría pre-lanzamiento + 4 checklists
│   ├── ui-recursos/   ← catálogo de librerías UI
│   ├── impeccable/    ← diseño de interfaz (externa, con sus 4 subagentes en agents/)
│   ├── grilling/ grill-me/  ← entrevista de decisiones (externa, Matt Pocock, MIT)
│   ├── motion-design/ web-animation-design/ ← criterio de movimiento y animación (externas, LottieFiles y Vercel)
│   ├── web-design-guidelines/ ← auditoría de UI contra las guías de Vercel (externa)
│   └── thermo-nuclear-code-quality-review/ ← revisión dura de mantenibilidad (externa, Cursor)
├── rules/             ← convenciones que aplican siempre (comun.md)
├── agents/            ← subagentes (los de impeccable)
├── commands/          ← /empezar y /entregar, los orquestadores
├── .claude-plugin/    ← manifiesto para instalar como plugin de Claude Code
├── AGENTS.md          ← instrucciones para cualquier agente
├── CLAUDE.md          ← contexto del proyecto para Claude Code
└── install.ps1 / .sh  ← instalador
```

## Instalar (Claude Code)

**Opción A — enlazado (recomendada mientras lo estés editando):**
```powershell
git clone https://github.com/JoseManuelbg/agent-kit
cd agent-kit
.\install.ps1          # Windows   |   ./install.sh en macOS/Linux
```
Crea enlaces `~/.claude/skills → agent-kit/skills` (y agents, commands) e importa `rules/*.md` en `~/.claude/CLAUDE.md`. Editas en el repo y Claude lo ve en la siguiente sesión. Si los enlaces fallan: `.\install.ps1 -Copy`.

**Opción B — plugin (para instalar limpio en otro PC sin tocar nada):**
```
/plugin marketplace add JoseManuelbg/agent-kit
/plugin install agent-kit@agent-kit
```
Las skills quedan como `/agent-kit:lanzamiento`. Actualizar con `/plugin update`.

**No mezcles A y B** en la misma máquina: duplica skills.

Desinstalar: `.\install.ps1 -Uninstall`.

## Usar

Tres modos de trabajo. El flujo completo es solo para arrancar; el día a día no lleva skill.

| Modo | Cuándo | Qué se usa |
|---|---|---|
| **Arranque** | Proyecto nuevo (web o API) | `/empezar` orquesta: brief → scaffold → diseño → auditoría → entrega. Para entre fases. |
| **Cambio pequeño** | El 80 % del tiempo | Nada. Las reglas de `rules/` se cargan solas. |
| **Antes de enseñar o subir** | Cada vez que se manda el enlace o se hace push | `/entregar`: auditoría + documentos + comprobación de que nada privado se sube. |

| Comando | Qué hace |
|---|---|
| `/empezar web Nombre` · `/empezar api Nombre` | Arranca un proyecto con el flujo completo. En carpeta vacía crea todo; en un proyecto existente hace inventario de lo que falta, lo completa sin tocar lo que hay y sigue por la fase que toque. |
| `/entregar [seo\|ux\|tecnico\|seguridad]` | Prepara un proyecto existente para enseñarlo o subirlo. Incluye la revisión de UI de `web-design-guidelines`. |
| `/lanzamiento` | Audita contra los checklists y arregla por prioridad (seguridad → roto → legal → SEO → pulido). |
| `/nueva-web` | Solo el scaffold, desde `docs/brief.md`. |
| `/entrega-cliente` | Solo los documentos LEEME / MENSAJE / CLAUDE.md. |
| `/grill-me` | Entrevista por rondas para cerrar una decisión antes de tocar código. Para cambios que afectan a estructura, no para cambios pequeños. |
| `/ui-recursos` | Catálogo de librerías UI antes de inventar un efecto. |
| `/impeccable` | Diseño de interfaz. La usa `/empezar` en la fase 3. |
| `motion-design`, `web-animation-design` | Se cargan solas al tocar animaciones: timing, easing, qué animar y qué no, `prefers-reduced-motion`. Valen para CSS vanilla. |
| `/web-design-guidelines archivo` | Revisa HTML/CSS contra más de 100 reglas de accesibilidad y UX, en formato `archivo:línea`. |
| `/thermo-nuclear-code-quality-review` | Revisión de mantenibilidad muy dura. Para las APIs, de tarde en tarde. |

## Añadir una skill

1. `skills/<nombre>/SKILL.md` con frontmatter:
   ```md
   ---
   name: nombre
   description: Cuándo usarla (esto es lo que lee el agente para decidir cargarla)
   ---
   ```
2. Referencias largas en subcarpetas (`checklists/`, `referencias/`), no en el SKILL.md.
3. Commit + push. Con la opción A no hay que reinstalar.

Lo que hace buena una skill no es la redacción sino el **criterio propio** que lleva: listas concretas, ejemplos, lo que ha fallado antes. Una skill "sé bueno en X" no aporta nada.

## Roadmap

- [x] `nueva-web`: scaffold de web estática (14/09/2026)
- [x] `entrega-cliente`: LEEME.md + MENSAJE.md + CLAUDE.md (14/09/2026)
- [x] `/empezar` y `/entregar` (14/09/2026)
- [ ] Hook en `settings.json` que compruebe al parar que `MENSAJE.md` está en `.gitignore` y no hay secretos
- [ ] `lanzamiento`: paso de verificación real (abrir la web, captura a 400 px, consola, enlaces)
- [ ] `testing-api`: tests mínimos con `node --test` + supertest (la base está en `nueva-web/referencias/api.md`)
- [x] Skills de UI/animación: `motion-design`, `web-animation-design`, `web-design-guidelines` (14/09/2026)
- [x] `/empezar` sobre proyecto existente: inventario y completar lo que falta (14/09/2026)
- [ ] Verificar las entradas "por verificar" de `ui-recursos`
- [ ] `diseño`: reglas visuales por tipo de negocio (necesita referencias)
- [ ] Adaptadores Cursor / Codex en `install.ps1 -Target`

## Skills externas (copias literales)

| Skill | Origen | Licencia | Cómo se actualiza |
|---|---|---|---|
| `grilling`, `grill-me` | [mattpocock/skills](https://github.com/mattpocock/skills) | MIT | Copiar el `SKILL.md` de nuevo |
| `thermo-nuclear-code-quality-review` | [cursor/plugins › cursor-team-kit](https://github.com/cursor/plugins/tree/main/cursor-team-kit) | ver LICENSE del plugin | Copiar el `SKILL.md` de nuevo |
| `motion-design` | [lottiefiles/motion-design-skill](https://github.com/lottiefiles/motion-design-skill) | MIT | Copiar `skills/motion-design/` de nuevo |
| `web-animation-design` | [vercel-labs/open-agents](https://github.com/vercel-labs/open-agents/tree/main/.agents/skills/web-animation-design) | ver repo | Copiar `SKILL.md` + `PRACTICAL-TIPS.md` |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | MIT | Copiar el `SKILL.md`; las reglas las baja con WebFetch en cada uso |
| `impeccable` | [impeccable](https://github.com/pbakaus/impeccable) | Apache 2.0 | `npx impeccable` |
