# {{NEGOCIO}} — contexto del proyecto

## Qué es

Maqueta comercial **en frío** ({{NEGOCIO}} no la ha pedido) de una web para {{TIPO}} en {{POBLACION}} (Sevilla). Se hace para enseñarla y venderla. Brief en `docs/brief.md`.

## Estado comercial

- **{{FECHA}}**: maqueta terminada y desplegada en {{URL}}. Sin contactar todavía.
- Oferta decidida: {{PRECIO_WEB}} € la web + {{PRECIO_MES}} €/mes de mantenimiento.

(Cada contacto, respuesta o cambio de estado se añade aquí con fecha. Las lecciones con nombre no se borran nunca.)

## El negocio

- {{LO_QUE_HAY_QUE_SABER}}
- Ojo con: {{TRAMPAS}} (datos que parecen reales y no lo son, nombres que no hay que confundir, cosas que el cliente no quiere que se diga).

## Estructura

La estándar de mis webs estáticas (ver `rules/comun.md`): `index.html` + páginas sueltas, contenido editable en `assets/datos.js` (único archivo que se toca), CSS/JS vanilla, fuentes autoalojadas ({{SERIF}} + {{SANS}}), Cloudflare Pages con `_headers` y CSP `default-src 'self'`. Se despliega con `bash desplegar.sh` (lista blanca: no suben `MENSAJE.md`, `LEEME.md`, `docs/` ni fotos originales).

## Qué es real y qué no

Tabla completa en `LEEME.md`. Resumen: real {{RESUMEN_REAL}}; inventado {{RESUMEN_INVENTADO}}. Cinta de aviso activa (`AVISO.visible: true`).

## Decisiones no evidentes

- **noindex + Disallow globales**: maqueta de un negocio real; no debe indexarse hasta que sea oficial.
- Sin formulario: WhatsApp y `tel:`. `gracias.html` queda preparada por si se añade.
- Sin mapa incrustado ni analítica: la CSP no admite terceros y la maqueta no necesita cookies.
- Teléfono `6XX XX XX XX` y `whatsapp: ''` hasta tener los reales. Para probar la demo se pone el mío.
- **Los assets llevan `?v=N`**. Subirlo cada vez que se toque CSS o JS.

## Si se retoma

1. Confirmar con el cliente: dirección, teléfono, horario, precios, razón social y NIF.
2. Quitar cinta de aviso, noindex y Disallow. Cambiar dominio (receta en `LEEME.md`).
3. Pasar `/entregar` antes de subir.
