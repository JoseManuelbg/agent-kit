---
name: entrega-cliente
description: Genera o actualiza los documentos de entrega de un proyecto de cliente - LEEME.md (para mí, con la tabla Real/Inventado y el checklist antes de enseñarla), MENSAJE.md (guion comercial, en .gitignore) y CLAUDE.md del proyecto (estado comercial y decisiones). Usar antes de enseñar una maqueta, al entregar, o cuando el cliente confirme datos. También cuando el usuario diga "prepara la entrega", "hazme el LEEME", "el mensaje para el cliente".
---

# Entrega a cliente

Produces tres documentos a partir del estado real del proyecto. Cada uno tiene un lector distinto y no se mezclan:

| Archivo | Lector | ¿Se sube a git? | ¿Se despliega? |
|---|---|---|---|
| `LEEME.md` | yo, antes de la visita | sí | no (lista blanca de `desplegar.sh`) |
| `MENSAJE.md` | yo, para copiar y pegar en WhatsApp | **no, en `.gitignore`** | no |
| `CLAUDE.md` | el agente en la próxima sesión | sí | no |

Cloudflare Pages sirve todo el repo. Por eso `MENSAJE.md` va en `.gitignore` sin excepción: dentro está la estrategia de precios y qué es inventado, y eso no lo puede leer el cliente en `tu-web.pages.dev/MENSAJE.md`.

## Proceso

1. **Lee el proyecto de verdad**, no supongas: `docs/brief.md` si existe, `assets/datos.js` (la cabecera "qué es real"), los `[PENDIENTE` y `class="pendiente"` con `grep -rn "PENDIENTE\|class=\"pendiente\"" . --include=*.html --include=*.js --include=*.md`, `docs/auditoria-lanzamiento.md`, el `git log` y los documentos que ya existan.
2. **Si los documentos ya existen, actualízalos**, no los reescribas: nueva fila en "Estado comercial" con fecha de hoy, cambiar filas de la tabla Real/Inventado que se hayan confirmado, marcar `[x]` en el checklist. Conserva las lecciones y decisiones anteriores.
3. **Tabla Real / Inventado** en `LEEME.md` con tres columnas: Dato · Estado · Fuente. Estados: `✅ Real` · `✅ Real, con matiz` · `⚠️ Real a medias` · `❌ Inventado` · `❌ Falta` · `✍️ Redactado por mí`. Cada dato real lleva su fuente concreta (ficha de Google del día X, Instagram, el rótulo, el propio cliente por WhatsApp el día X). Si no puedes decir de dónde salió, no es real.
4. **Checklist "Antes de enseñársela"** con `- [ ]`: teléfono y WhatsApp reales, calle exacta, Instagram comprobado, horario, precios, fotos que faltan, vista previa de WhatsApp (pegarse el enlace a uno mismo), cinta de aviso en el estado correcto, `?v=N` subido si se tocó CSS/JS.
5. **`MENSAJE.md`**: guion con el enlace **dentro del primer mensaje**. Nunca "¿os paso el enlace?": un sí/no invita al no. Estructura en `plantillas/MENSAJE.md`. Los precios de la oferta salen del brief o se preguntan; no se inventan.
6. **`CLAUDE.md`** del proyecto: qué es, estado comercial con fechas absolutas, el negocio (lo que hay que saber para no meter la pata), estructura, decisiones no evidentes, y "si se retoma". Ver `plantillas/CLAUDE.md`.
7. **Cinta de aviso**: si la tabla tiene algún `❌` o `⚠️`, `AVISO.visible` sigue `true`. Solo se pone `false` cuando todo está `✅`, y se anota la fecha en `CLAUDE.md`.
8. **Comprueba `.gitignore`**: `MENSAJE.md` y `assets/fotos/originales/` dentro; `git ls-files MENSAJE.md` vacío. Si `MENSAJE.md` ya está trackeado, `git rm --cached MENSAJE.md` y avisa de que sigue en el historial.
9. Cierra con: qué queda `[PENDIENTE]` del cliente en una lista corta, y el texto del primer mensaje listo para copiar.

## Reglas

- Español de España, tono directo, sin paja. Los documentos los lee el propio usuario antes de una visita: frases cortas, lo importante primero.
- Nunca inventes teléfono, email, dirección, NIF ni testimonios para "completar" un documento. Se marca `[PENDIENTE: …]`.
- Las lecciones comerciales con nombre (qué contestaron, cuándo, por qué) se conservan siempre en `CLAUDE.md`: son lo más valioso del archivo.
- No toques el diseño ni el código salvo `AVISO.visible` y `.gitignore`.
