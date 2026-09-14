# Checklist SEO + GEO (buscadores y ChatGPT/Claude/Perplexity)

## Metadatos y estructura por página
- [ ] Meta título ÚNICO en cada página (no repetidos entre páginas, no genéricos tipo "Inicio")
- [ ] Meta descripción ÚNICA en cada página (150-160 chars, con intención de búsqueda)
- [ ] Un solo `<h1>` por página
- [ ] El H1 es DISTINTO del meta título (no copiar/pegar; el título apunta a la búsqueda, el H1 al visitante)
- [ ] Jerarquía correcta H1 → H2 → H3 sin saltos
- [ ] Contenido alineado con la intención de búsqueda de cada página (¿qué buscaría alguien para llegar aquí?)
- [ ] `<html lang="es">` (o el idioma real)
- [ ] Canonical en cada página

## Contenido orientado a GEO (motores de IA)
- [ ] TL;DR o "puntos clave" al inicio de páginas largas de contenido
- [ ] Resumen/sumario justo después de la sección de intención principal
- [ ] CTA después del primer párrafo (no solo al final)
- [ ] Usar tablas y listas donde el contenido lo permita (los LLM las extraen mejor)
- [ ] Sección FAQ con preguntas reales de clientes
- [ ] Schema FAQPage (JSON-LD) en la página de FAQ
- [ ] `llms.txt` en la raíz describiendo el sitio y sus páginas clave

## Schema y datos estructurados
- [ ] JSON-LD LocalBusiness (o el subtipo correcto: Restaurant, BeautySalon, Dentist...) con nombre, dirección, teléfono, horario, geo
- [ ] Open Graph completo (og:title, og:description, og:image 1200x630, og:url) + twitter:card

## Imágenes
- [ ] Nombres de archivo descriptivos (`fachada-restaurante-jaca.jpg`, no `IMG_2041.jpg`)
- [ ] Alt text en TODAS las imágenes con contenido (decorativas: `alt=""`)

## URLs e indexación
- [ ] URLs limpias: sin números, sin conectores, sin mayúsculas (`/carta`, no `/pagina-2-de-la-carta`)
- [ ] `robots.txt` presente y correcto
- [ ] Desindexar rutas utilitarias: `/page/`, `/gracias`, paneles, staging (noindex o robots.txt)
- [ ] `sitemap.xml` presente, con TODAS las páginas públicas y sin las desindexadas
- [ ] Referenciar el sitemap desde robots.txt
- [ ] Interlinkeado interno: cada página enlaza a otras relacionadas (clusters de contenido)

## Medición (pasos manuales del usuario — listar al final)
- [ ] GA4 instalado (pedir el ID de medición, no inventarlo)
- [ ] Google Search Console verificado
- [ ] Sitemap enviado en GSC
