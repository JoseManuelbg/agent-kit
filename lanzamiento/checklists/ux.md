# Checklist UX / pulido de interfaz

## Móvil primero
- [ ] Responsive real en 360px, 390px, 768px, 1024px+ (breakpoints revisados, no solo "se ve bien en desktop")
- [ ] Sin scroll horizontal en ningún breakpoint (revisar overflow de imágenes, tablas, textos largos)
- [ ] Navegación móvil funcional (hamburguesa que abre/cierra, se cierra al navegar)
- [ ] CTA fijo/sticky en móvil (llamar, reservar, pedir) si es negocio local
- [ ] Áreas táctiles ≥ 44px

## Interacción y feedback
- [ ] Estados hover en TODOS los elementos clicables
- [ ] Microinteracciones en botones (transición de fondo/escala, active state)
- [ ] Transiciones suaves globales (200-300ms; nada instantáneo, nada lento)
- [ ] Animaciones suaves al hacer scroll (IntersectionObserver + fade/slide; respetar `prefers-reduced-motion`)
- [ ] Animación de entrada del hero
- [ ] Botón "volver arriba" en páginas largas
- [ ] Loading skeleton o estado de carga si hay contenido asíncrono

## Conversión
- [ ] CTA principal repetido a lo largo de la página (hero, medio, final)
- [ ] Formulario de contacto presente y visible
- [ ] Validación de formularios en cliente (y servidor si hay backend) con mensajes claros en español
- [ ] Estados de ÉXITO del formulario (mensaje o página de gracias) y de ERROR (qué falló y qué hacer)
- [ ] Testimonios/reseñas REALES si el cliente los facilita (❓ preguntar, nunca inventar)
- [ ] Botones de compartir/RRSS si aporta (enlaces reales, ❓ preguntar URLs)

## Detalles que delatan una web sin terminar
- [ ] Logo clicable → inicio
- [ ] Teléfono clicable (`tel:`) y email clicable (`mailto:`)
- [ ] Favicon personalizado (no el de defecto; incluir apple-touch-icon y manifest si aplica)
- [ ] Modo oscuro solo si se va a mantener bien; si no, un solo tema bien hecho
- [ ] Sin texto placeholder (lorem ipsum, "Your Company", secciones vacías)
- [ ] Sin elementos de navegación que no llevan a ningún sitio

## Accesibilidad mínima
- [ ] Contraste AA en texto (4.5:1)
- [ ] Focus visible al navegar con teclado
- [ ] Labels en todos los inputs
- [ ] `prefers-reduced-motion` respetado en animaciones
