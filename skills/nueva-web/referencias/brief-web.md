# Árbol de decisiones — brief de web para negocio local

Lo usa `grilling` cuando se arranca una web con `/empezar`. Es el **árbol de diseño** de partida: cada ronda desbloquea la siguiente. No preguntes lo que puedas averiguar tú (Google Maps, Instagram, web actual, competencia del pueblo): eso lo buscas con subagentes y lo presentas como hecho, no como pregunta.

Formato de cada pregunta: el de `grilling` (numerada, con recomendación ➡️). Las recomendaciones salen de `rules/comun.md`: vanilla, sin terceros, Cloudflare Pages, `datos.js` centralizado.

## Ronda 1 — Raíz

1. **Negocio**: nombre, tipo (restaurante, tienda, clínica, peluquería…), pueblo. ¿Tiene ya web, Google Business, Instagram? *(Buscar antes de preguntar. Presentar lo encontrado.)*
2. **Situación comercial**: ¿maqueta en frío para enseñar, o encargo ya cerrado? Condiciona la cinta de aviso, `MENSAJE.md` y cuánto se inventa.
3. **Acción principal del visitante**: llamar, WhatsApp, reservar, pedir, ir a la tienda, ver la carta. Solo una principal. ➡️ Para negocio local casi siempre WhatsApp o llamar.
4. **Alcance**: una página con anclas o varias páginas (carta, contacto, historia). ➡️ Una página salvo carta/catálogo largo o necesidad SEO de páginas por servicio.

## Ronda 2 — Contenido (depende de 1 y 4)

5. **Secciones**: lista concreta en orden. ➡️ Hero → qué ofrecen → prueba social → cómo llegar/horarios → CTA. Ajustar por tipo de negocio.
6. **Datos reales disponibles**: dirección, teléfono, email, horarios, carta/servicios, precios, fotos, logo, RRSS, reseñas. Para cada uno: real / inventado / pendiente. Esto alimenta la tabla Real/Inventado de `LEEME.md`.
7. **Fotos**: ¿hay fotos reales? ¿de dónde (Instagram, Google, el cliente)? Si no: placeholders claramente marcados, nunca fotos de stock que parezcan del negocio.
8. **Idioma**: solo español, o también inglés (zonas turísticas). ➡️ Solo español salvo que el negocio ya atienda turistas.

## Ronda 3 — Diseño (depende de 1 y 5)

9. **Identidad existente**: logo, colores, tipografía que ya usen en rótulo, cartas, Instagram. Si existe, se respeta.
10. **Referencia de estilo**: una o dos webs o adjetivos (cálido, moderno, clásico, familiar). Consultar `ui-recursos` para efectos, sin convertir la web en una feria.
11. **Tono de los textos**: cercano/tú, formal/usted, con humor. ➡️ Cercano y en tú para hostelería y comercio; usted para clínicas y despachos.

## Ronda 4 — Técnico (depende de 3 y 6)

12. **Formulario de contacto**: ¿hace falta? Si sí, ¿a dónde va? ➡️ Evitar formulario: botón de WhatsApp y `tel:`. Si hay formulario, sin backend de terceros por defecto; decidir destino y avisar de que implica un tercero.
13. **Mapa**: ¿embed de Google Maps? Es un tercero (rompe `default-src 'self'`, cookies). ➡️ Enlace a Maps con imagen estática propia, no iframe.
14. **Analítica**: ¿GA4? Implica banner de cookies y política. ➡️ Sin GA4 en maquetas. Si el cliente lo quiere, se activa en entrega.
15. **Reservas/pedidos externos**: TheFork, Glovo, Doctoralia, etc. Enlace saliente, no integración.
16. **Dominio**: ¿tienen dominio? Si no, `*.pages.dev` para la maqueta y dominio propio cuando firmen.

## Ronda 5 — Comercial (solo si es maqueta en frío; depende de 2)

17. **A quién se enseña y por qué canal**: WhatsApp del negocio, en persona, Instagram. El enlace va DENTRO del primer mensaje.
18. **Fecha objetivo**: cuándo se quiere enseñar. Marca el alcance real.
19. **Objeción previsible**: precio, "ya tenemos Instagram", "mi sobrino me la hace". Se prepara la respuesta en `MENSAJE.md`.

## Cierre

Cuando la frontera esté vacía, guardar el resultado en `docs/brief.md` del proyecto con este esquema:

```md
# Brief — <Negocio>
Fecha: <YYYY-MM-DD>. Situación: maqueta en frío | encargo.
## Decisiones
- Acción principal: …
- Alcance: …
- Secciones: …
- Diseño: …
- Técnico: formulario …, mapa …, analítica …, dominio …
## Datos
| Dato | Valor | Real / Inventado / Pendiente | Fuente |
## Comercial
- Canal, fecha, objeción prevista.
```

`nueva-web` lee `docs/brief.md` para generar el proyecto.
