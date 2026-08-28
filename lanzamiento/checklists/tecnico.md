# Checklist técnico / legal / rendimiento

## Legal (España: RGPD + LSSI)
- [ ] Página de política de privacidad (plantilla RGPD, huecos del responsable como `[PENDIENTE: ...]`)
- [ ] Página de términos y condiciones / aviso legal (LSSI: titular, NIF, domicilio — ❓ pedir datos)
- [ ] Banner de cookies SOLO si hay cookies no esenciales (GA4 la exige; una web estática sin analíticas no lo necesita — no poner banner por poner)
- [ ] Política de cookies enlazada desde el banner si existe
- [ ] Datos de contacto REALES (❓ pedir; jamás inventar teléfono/dirección/email)

## Roto / errores típicos
- [ ] Cero enlaces rotos: revisar todos los `href` internos contra archivos existentes, y los externos que respondan
- [ ] Cero enlaces a páginas inexistentes o `href="#"` sueltos
- [ ] Página 404 personalizada (con enlace a inicio) y configurada en el hosting
- [ ] Formularios probados de verdad: envían, validan, muestran éxito y error
- [ ] Página de "Gracias" tras envío de formulario (con noindex)
- [ ] Año del copyright actualizado (o `new Date().getFullYear()`)
- [ ] Sin errores en consola del navegador
- [ ] Probado en Chrome + Firefox + Safari (o avisar al usuario de que pruebe Safari/iOS si no hay forma de hacerlo aquí)

## Rendimiento
- [ ] Imágenes comprimidas y en formato moderno (WebP/AVIF con fallback si hace falta)
- [ ] Imágenes con `width`/`height` o `aspect-ratio` (evitar CLS)
- [ ] `loading="lazy"` en imágenes bajo el fold; la del hero SIN lazy y con `fetchpriority="high"`
- [ ] Fuentes: `font-display: swap`, preload de la principal, subset si es posible
- [ ] CSS/JS minificado o razonablemente pequeño; sin librerías cargadas que no se usan
- [ ] Comprobar tiempos de carga (Lighthouse si está disponible; objetivo LCP < 2.5s)
- [ ] Caché configurada en hosting (_headers / vercel.json: assets con hash → cache largo)

## Config del proyecto
- [ ] Favicon completo: .ico + PNG + apple-touch-icon + site.webmanifest
- [ ] Open Graph image existente en la ruta declarada (1200x630)
- [ ] Revisar la versión desplegada = versión local (no lanzar con build viejo)
- [ ] README con cómo desplegar y qué datos son del cliente
