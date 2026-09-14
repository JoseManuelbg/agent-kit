# agent-kit

Kit personal para agentes de código (Claude Code hoy; preparado para otros): skills, reglas y agentes que hacen que cada proyecto arranque con mis convenciones y checklists ya cargados. Versión a escala humana de [ECC](https://github.com/affaan-m/ecc).

```
agent-kit/
├── skills/            ← workflows (formato SKILL.md, estándar Agent Skills)
│   ├── lanzamiento/   ← auditoría pre-lanzamiento + 4 checklists
│   └── ui-recursos/   ← catálogo de librerías UI
├── rules/             ← convenciones que aplican siempre (comun.md)
├── agents/            ← subagentes (vacío por ahora)
├── commands/          ← atajos /xxx (vacío por ahora)
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

| Comando | Qué hace |
|---|---|
| `/lanzamiento` | Audita el proyecto actual contra los checklists y arregla por prioridad (seguridad → roto → legal → SEO → pulido). `/lanzamiento seo` limita a una categoría. |
| `/ui-recursos` | Consulta el catálogo de librerías UI antes de inventar un efecto. |

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

- [ ] `nueva-web`: scaffold de web estática con mis convenciones (extraer de proyectos reales de webs estáticas)
- [ ] `entrega-cliente`: generar LEEME.md + MENSAJE.md + CLAUDE.md del proyecto
- [ ] `diseño`: reglas visuales por tipo de negocio (necesita referencias)
- [ ] `testing-api`: para las APIs Node
- [ ] Adaptadores Cursor / Codex en `install.ps1 -Target`
