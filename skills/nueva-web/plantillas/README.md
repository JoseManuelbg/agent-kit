# {{NEGOCIO}}

Web de **{{NEGOCIO}}**, {{LEMA}} en {{POBLACION}} (Sevilla).

HTML, CSS y JavaScript a secas. **Sin build, sin `npm install`, sin dependencias
externas**: las tipografías van servidas desde `assets/`, así que la web funciona
sin conexión abriendo `index.html`.

> Maqueta de presentación. Los precios y el horario son de muestra.

## Estructura

```
index.html            La web, de una sola página
privacidad.html       Aviso legal y privacidad
404.html  gracias.html
assets/
  datos.js            Textos, precios, horario y contacto: lo único editable
  estilos.css         Sistema visual
  app.js              Pinta el contenido desde datos.js
  fuentes/            Tipografías (woff2, latino)
  fotos/              Imágenes optimizadas
  img/                Favicon, iconos y vista previa
```

## En local

```
python -m http.server 8080   # o doble clic en index.html
```

## Desplegar

Ficheros estáticos en Cloudflare Pages: framework `None`, build vacío, directorio `/`.
Con `bash desplegar.sh` se sube solo lo público (lista blanca).

## ⚠️ Al tocar el CSS o el JS: subir la versión

Los assets se piden con `?v=N`. Si cambias `estilos.css` o `app.js` y no subes
ese número en todos los HTML, el navegador sirve la versión vieja y parece que el
cambio no ha hecho nada.

```
sed -i 's/?v=1/?v=2/g' *.html
```
