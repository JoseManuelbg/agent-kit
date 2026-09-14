---
description: Prepara un proyecto existente para enseñarlo o subirlo - auditoría /lanzamiento completa, documentos de entrega (LEEME, MENSAJE, CLAUDE.md) y comprobación de que nada privado se sube. Usar antes de mandar el enlace o hacer push a Cloudflare.
argument-hint: "[seo|ux|tecnico|seguridad] (opcional, limita la auditoría)"
---

# /entregar $ARGUMENTS

Modo "antes de enseñar". El proyecto ya existe; aquí no se rediseña nada, se verifica y se documenta.

## 1. Auditoría

Invoca `lanzamiento` con el argumento recibido si lo hay. Si ya existe `docs/auditoria-lanzamiento.md`, la skill hace diff contra él. Arregla por prioridad: seguridad → roto → legal → SEO → pulido.

## 1b. Revisión de interfaz (solo webs)

Invoca `web-design-guidelines` sobre los `*.html` y el CSS principal. Devuelve hallazgos en formato `archivo:línea`. Arregla los de accesibilidad y los que rompan en móvil; el resto va al informe como pulido. Si el usuario limitó la auditoría a `seguridad` o `tecnico`, sáltate este paso.

## 2. Documentos de entrega

Invoca `entrega-cliente`. Si `LEEME.md`, `MENSAJE.md` o `CLAUDE.md` ya existen, **actualízalos**, no los reescribas: cambia la tabla Real/Inventado con lo que se haya confirmado desde la última vez y añade la fecha al estado comercial.

## 3. Comprobación de privacidad antes de subir

Esto se comprueba siempre, aunque el usuario solo pida una categoría:

- `MENSAJE.md` está en `.gitignore` y no está trackeado (`git ls-files MENSAJE.md` vacío). Si está trackeado, sácalo del índice y avisa.
- No hay `.env`, claves, tokens ni IDs de GA4 reales en archivos trackeados (`git grep -nE "AKIA|sk_live|G-[A-Z0-9]{8,}|password\s*=" -- ':!*.md'` y sentido común).
- `assets/fotos/originales/` no se despliega (está en `.gitignore` o fuera de `assets/`).
- La cinta de aviso (`AVISO.visible` en `datos.js`) está en el estado correcto: visible si quedan datos sin confirmar, oculta si todo está confirmado.

## 4. Cierre

Resumen en tres bloques: qué se ha arreglado, qué sigue `[PENDIENTE]` del cliente, y el mensaje listo para copiar de `MENSAJE.md` con el enlace dentro. Commit en español si hay cambios. No hagas push sin que lo pida.
