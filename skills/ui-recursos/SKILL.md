---
name: ui-recursos
description: Catálogo de librerías y galerías de componentes UI del usuario (animaciones, efectos, inspiración). Consultar cuando se construya interfaz nueva y se busquen componentes vistosos, efectos, animaciones o inspiración visual, o cuando el usuario pida "algo golfo", "que quede pro" o similar.
---

# Recursos UI del usuario

Colección personal de librerías/galerías para elevar el acabado visual. **Regla:** antes de recomendar o copiar de una que no conozcas bien, visita la URL con WebFetch y verifica qué es y cómo se integra. No inventes APIs de estas librerías.

## Cómo usarlas según el proyecto

- **Web estática (HTML/CSS/JS vanilla)** — la mayoría de estas librerías son React: NO añadir React solo para un efecto. Usarlas como *inspiración* y reimplementar el efecto en CSS/JS vanilla (la mayoría de sus efectos son <50 líneas: scroll reveal, text shimmer, marquee, spotlight, tilt...).
- **Proyecto React/Next** — se pueden copiar componentes directamente (casi todas son copy-paste estilo shadcn, no npm install).

## Catálogo

| Recurso | URL | Qué es (verificado/por verificar) |
|---|---|---|
| React Bits | reactbits.dev | Componentes React animados: textos, fondos, cursores. Copy-paste. |
| Motion Primitives | motion-primitives.com | Componentes React + Motion (framer). Copy-paste, estilo shadcn. |
| Skiper UI | skiper.ui | Componentes React animados premium/free. |
| Lightswind | lightswind.com | Librería de componentes UI (Tailwind). Por verificar detalles. |
| Origin Kit | originkit.dev | Kit de componentes/plantillas. Por verificar. |
| Layers | getlayers.ai | Por verificar. |
| Hakei | hakei.app | Por verificar. |
| Referno Styles | styles.referno.design | Galería de estilos/referencias de diseño. Por verificar. |
| Casberry Particles | particles.casberry.in | Efectos de partículas. Por verificar. |
| AnimMaster Lib | animmasterlib.dev | Librería de animaciones. Por verificar. |
| Vengeance UI | (buscar URL) | Por verificar. |
| Watermelon UI | (buscar URL) | Por verificar. |
| Manus | manus.im | Agente de IA generalista (no es librería UI; útil como referencia de producto). |

Cuando verifiques una entrada "por verificar", actualiza esta tabla con lo que sea (qué es, si es React/vanilla, si es copy-paste o npm).

## Criterio

- Un efecto solo si aporta: hero, CTA, transiciones de sección. No convertir la web en una feria.
- Siempre `prefers-reduced-motion` y rendimiento móvil por delante del efecto.
- Ver también la skill `lanzamiento` (checklist ux.md) para el pulido base antes de añadir extras.
