# {{NEGOCIO}} — maqueta comercial

Para mí. Léelo antes de ir a enseñarla.

## Cómo se abre

Doble clic en `index.html`, o `python -m http.server 8080` y abrir `http://localhost:8080`.
Publicada en: {{URL}} (Cloudflare Pages, proyecto `{{PROYECTO_CLOUDFLARE}}`, se sube con `bash desplegar.sh`).

## Qué archivo se toca

| Fichero | Qué es |
|---|---|
| `assets/datos.js` | Textos, precios, horario, contacto y la cinta de aviso. **Lo único que hay que tocar.** |
| `assets/estilos.css` | Sistema visual. Si se toca, subir el `?v=N` en todos los HTML. |
| `assets/app.js` | Pinta desde `datos.js`. Idem con el `?v=N`. |
| `assets/fotos/` | Optimizadas. Las originales van en `originales/` y no se despliegan. |

## Qué es real y qué no

Esto es lo más importante del fichero: es lo que evita que te pillen en un renuncio delante del cliente.

| Dato | Estado | Fuente |
|---|---|---|
| Nombre «{{NEGOCIO}}» | ✅ Real | {{FUENTE}} |
| Dirección | ❌ Falta | marcado `[PENDIENTE]` |
| Teléfono y WhatsApp | ❌ Falta | ahora `6XX XX XX XX` a propósito, para no marcar el número de nadie |
| Horario | ❌ Inventado | suele estar en la ficha de Google |
| Precios | ❌ Inventados | puestos a ojo de un negocio de este nivel |
| Textos (hero, nosotros) | ✍️ Redactados por mí | basados en {{FUENTE}} |
| Fotos | {{ESTADO_FOTOS}} | {{FUENTE_FOTOS}} |
| Razón social y NIF del aviso legal | ❌ Faltan | marcados `[PENDIENTE]` en `privacidad.html` |

> Mientras haya algo que no sea ✅, **la cinta de aviso se queda puesta** (`AVISO.visible` en `datos.js`). Es lo que separa una maqueta honesta de un cliente cabreado porque «ese precio no es el mío».

## Antes de enseñársela

- [ ] **Teléfono y WhatsApp**: el campo `whatsapp` va sin espacios ni `+` (`34600000000`). Sin esto los botones no llevan a ningún sitio.
- [ ] **La calle exacta**.
- [ ] **Instagram**: comprobar el usuario real.
- [ ] **Horario**: sacarlo de la ficha de Google.
- [ ] **Precios**: si están en Instagram o en la carta, meterlos.
- [ ] **Fotos que faltan**: buscar `marcador-foto` en los HTML.
- [ ] **Vista previa de WhatsApp**: captura de la portada a 1200×630 en `assets/img/og.jpg`, URL absoluta en el `<head>`, y **pegarte el enlace a ti mismo** para ver que sale la tarjeta.
- [ ] **`?v=N`** subido si se tocó CSS o JS.
- [ ] **`MENSAJE.md` no está en el repo**: `git ls-files MENSAJE.md` tiene que salir vacío.

## Qué probar delante del cliente (dos minutos)

1. Abrirla en **su móvil**, no en el tuyo: que vea que carga rápido.
2. Tocar el botón de WhatsApp y enseñar el mensaje que le llegaría.
3. Bajar hasta el horario: «esto lo cambias tú en un archivo, o me lo dices y lo cambio yo».
4. Enseñar la cinta de aviso: «esto está porque los precios son de muestra; en cuanto me pases los tuyos, fuera».

## Decisiones que conviene saber

- Sin formulario: WhatsApp y teléfono convierten más en negocio local y no hay que guardar datos de nadie (ni política de cookies).
- Sin mapa incrustado: enlace a Google Maps. Un iframe de Google mete cookies y rompe la CSP.
- Sin analítica en la maqueta. Si la quiere, se activa al entregar con su banner.

## Publicarla en su dominio

1. Cambiar `{{URL}}` por el dominio real: `grep -rl '{{URL_SIN_PROTOCOLO}}' . --include=*.html --include=*.xml --include=*.txt | xargs sed -i 's|{{URL_SIN_PROTOCOLO}}|EL-DOMINIO-REAL.es|g'`
2. `robots.txt`: quitar el `Disallow: /`. Quitar el `<meta name="robots" content="noindex, nofollow">` de las páginas.
3. `AVISO.visible: false` cuando todo esté confirmado.
4. Google Search Console: dar de alta y enviar `sitemap.xml`.
