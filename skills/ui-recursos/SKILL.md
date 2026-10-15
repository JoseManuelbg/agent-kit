---
name: ui-recursos
description: Catálogo de librerías y galerías de componentes UI del usuario (animaciones, efectos, inspiración). Consultar cuando se construya interfaz nueva y se busquen componentes vistosos, efectos, animaciones o inspiración visual, o cuando el usuario pida "algo golfo", "que quede pro" o similar.
---

# Recursos UI del usuario

Colección personal de librerías/galerías para elevar el acabado visual. **Regla:** antes de recomendar o copiar de una que no conozcas bien, visita la URL con WebFetch y verifica qué es y cómo se integra. No inventes APIs de estas librerías.

## Cómo usarlas según el proyecto

- **Web estática (HTML/CSS/JS vanilla)** — casi todas son React: NO añadir React solo para un efecto. Usarlas como *inspiración* y reimplementar el efecto en CSS/JS vanilla (la mayoría son <50 líneas: scroll reveal, text scramble, marquee, spotlight, tilt, imagen que sigue al cursor...).
- **Proyecto React/Next** — se pueden copiar componentes directamente (la mayoría son copy-paste o CLI de shadcn, no `npm install`).
- **Cuidado con lo que parece generado.** Oscuro + tarjetas de cristal + acento con resplandor + partículas + cinta deslizante es la plantilla por defecto de todas estas librerías y de cualquier IA. Si el objetivo es que la web tenga carácter, la respuesta no está en este catálogo sino en una dirección de diseño: tipografía, composición, una idea.

## Catálogo (verificado el 2026-10-15)

| Recurso | URL | Qué es | Stack | Integración | Precio / licencia |
|---|---|---|---|---|---|
| React Bits | reactbits.dev | Componentes y fondos animados: textos, fondos, microinteracciones | React (JS o TS, CSS o Tailwind) | Copiar fuente o CLI | Gratis con nivel Pro; repo en GitHub; licencia no indicada en la portada |
| Motion Primitives | motion-primitives.com | Kit de interfaz animada: Accordion, Animated Background, Border Trail, Carousel, Cursor, Dialog, Text Scramble | React + Motion (motion.dev) + Tailwind | Copy-paste | Código abierto; licencia no indicada en la portada |
| Skiper UI | **skiper-ui.com** (la URL antigua `skiper.ui` no existe) | Componentes "poco comunes" para shadcn/ui: image reveal, cursor trail, dynamic island, tooltips | React/Next + Tailwind + Motion | CLI de shadcn (`npx shadcn add @skiper-ui/...`) | Mezcla: parte gratis, Premium 129 $ y Exclusive 549 $ de un pago |
| Lightswind | lightswind.com | Globe, Wave Background, Magic Card, Aurora Text, Count Up, Dock, Electro Border, 3D Image Ring | React/Next | `npm` (`npx i lightswind@latest`) | Parte abierta bajo MIT; Pro y Enterprise de pago |
| Origin Kit | originkit.dev | 250+ componentes animados para Framer y React; también por MCP con clave de API | React/Framer. **Sin versión vanilla** | Copiar código desde la web o plugin MCP | Gratis. La portada se renderiza por JS y no deja leer más: verificar en el sitio al usarla |
| Layers | getlayers.ai | **No es una librería de componentes.** Prompts copy-paste para webs "cinematográficas": escenas WebGL, degradados, secciones con movimiento | Genera HTML autocontenido vía IA (Claude, Cursor...) | Copiar el prompt | De pago con capa gratuita; licencia comercial con los planes de pago |
| Watermelon UI | **ui.watermelon.sh** | Componentes animados, bloques copy-paste, paneles y plantillas | React | Copy-paste | Gratis para la comunidad; componentes bajo MIT según sus cabeceras en 21st.dev |
| Refero | **refero.design** (la URL antigua `styles.referno.design` no existe; era una errata) | Galería de inspiración UI/UX: pantallas web e iOS por tipo de página, patrón y flujo | Ninguno, es inspiración | Solo mirar | No verificado el precio ni si tiene sección de "estilos" |
| Casberry Particles | particles.casberry.in | **No es una librería.** Simulador 3D de enjambres de partículas en el navegador (esfera, cubo, hélice, donut; estático, scroll, onda, pulso) | Exporta código vanilla, React o Three.js y ficheros PLY/GLB/OBJ | Usar en el navegador y exportar | Precio y licencia no indicados |
| AnimMaster Lib | animmasterlib.dev | Pack de 300 componentes animados: scroll, sliders, héroes, 3D, menús, hover, ratón, shaders WebGL | **60 % HTML/CSS/JS vanilla**, 30 % React, 10 % Next | Zip por Google Drive, copy-paste | De pago (4,99 $ único). Sin términos de licencia visibles: ojo antes de redistribuir |
| Manus | manus.im | Agente de IA generalista. **No es UI.** Referencia de producto | — | — | Planes de pago |

### Entradas que no existen

- **Hakei** (`hakei.app`): el dominio no resuelve y ninguna búsqueda lo encuentra. Retirada.
- **Vengeance UI**: no existe ninguna librería con ese nombre. Lo más parecido es Vega UI (Amazon) y un paquete `revenge-react-components`, que no son esto. Retirada.

### Candidata pendiente de verificar

- **Atlas UI**: según un artículo en DEV ofrece componentes con Motion para React, Next **y versiones vanilla para webs estáticas**, instalación estilo shadcn. Sería la única del catálogo útil directamente en el stack del usuario, pero no se ha encontrado el sitio oficial. Antes de usarla: localizar el repo y comprobarlo.

## Criterio

- Un efecto solo si aporta: hero, CTA, transiciones de sección. No convertir la web en una feria.
- Siempre `prefers-reduced-motion` y rendimiento móvil por delante del efecto.
- Ver también la skill `lanzamiento` (checklist ux.md) para el pulido base antes de añadir extras.
