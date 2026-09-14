---
name: lanzamiento
description: Auditoría pre-lanzamiento de un sitio web o app (SEO/GEO, UX, técnico/legal, seguridad). Usar cuando el usuario pida auditar, revisar o preparar una web para lanzar, o diga "pásale el checklist". Acepta argumento opcional para limitar el alcance - seo, ux, tecnico, seguridad.
---

# Auditoría pre-lanzamiento

Auditas el proyecto actual contra checklists consolidados y luego arreglas lo que falte.

## Proceso

1. **Detecta el tipo de proyecto** antes de nada:
   - Web estática (HTML/CSS/JS, sin build) → aplica seo + ux + tecnico + la sección "frontend" de seguridad.
   - Web con framework (React/Vite/Next...) → todo lo anterior + revisar build y variables de entorno.
   - API/backend (Express, Node, BBDD) → seguridad completa + la parte de tecnico que aplique; seo/ux normalmente N/A.
   - Detecta también dónde se despliega si hay pistas (`_headers`, `netlify.toml`, `vercel.json`, Dockerfile) — condiciona cómo se configuran cabeceras, redirects y 404.

2. **Carga solo los checklists relevantes** de `checklists/` en esta carpeta:
   - `seo.md` — SEO clásico + GEO (aparecer en ChatGPT/Claude/Perplexity)
   - `ux.md` — pulido de interfaz, móvil, accesibilidad
   - `tecnico.md` — legal, rendimiento, formularios, errores típicos de webs vibecodeadas
   - `seguridad.md` — frontend estático y backend, en secciones separadas
   Si el usuario pasó una categoría como argumento, carga solo esa.

3. **Audita** recorriendo el código real (no supongas). Produce una tabla por categoría:
   `✅ OK | ❌ Falta | ⚠️ A medias | ➖ N/A | ❓ Necesita dato del cliente`

4. **REGLA DE ORO — nunca inventes datos reales.** Teléfonos, direcciones, emails, NIF, textos legales, ID de GA4, URLs de RRSS, testimonios: si no constan en el proyecto, márcalos como ❓ y pregunta al usuario en bloque al final de la auditoría. Poner datos de contacto falsos o testimonios inventados es exactamente uno de los errores que esta skill existe para evitar.

5. **Arregla** en este orden de prioridad:
   1. Seguridad (claves expuestas, secretos en git → parar y avisar inmediatamente)
   2. Roto (enlaces muertos, formularios que no funcionan, scroll horizontal, errores de consola)
   3. Legal (privacidad, cookies, términos) — usa plantillas estándar RGPD/LSSI en español y deja los huecos del cliente marcados como `[PENDIENTE: ...]`
   4. SEO/GEO
   5. Pulido UX

6. **Cierra** con un resumen: qué se arregló, qué queda pendiente de datos del cliente, y los pasos manuales que solo puede hacer el usuario (dar de alta GSC, enviar sitemap, crear propiedad GA4, comprimir/exportar imágenes originales si no hay herramienta disponible).

## Notas

- Los textos de la web de estos proyectos suelen ser en español de España; los checklists asumen negocio local español (RGPD, LSSI).
- No añadas frameworks ni dependencias para arreglar items: en webs estáticas, todo con HTML/CSS/JS vanilla.
- Si el proyecto ya pasó la auditoría antes (busca `docs/auditoria-lanzamiento.md`), haz diff contra ese informe en vez de empezar de cero, y actualízalo.
- Guarda el informe final en `docs/auditoria-lanzamiento.md` dentro del proyecto.
