/* ==========================================================================
   {{NEGOCIO}} — {{LEMA}}
   {{POBLACION}} (Sevilla)

   ESTE ES EL ÚNICO FICHERO QUE HAY QUE TOCAR.

   QUÉ ES REAL (y de dónde salió):
     · [escribir aquí, dato a dato, con la fuente: ficha de Google, Instagram,
        rótulo, el propio cliente…]

   QUÉ ESTÁ INVENTADO O PENDIENTE:
     · [precios, horario, textos… todo lo que no esté confirmado]

   Mientras haya algo en la segunda lista, la cinta de aviso (AVISO.visible)
   se queda puesta. Se quita en la entrega, cuando el cliente confirme.
   ========================================================================== */

const DATOS = {

  /* Cinta de aviso de maqueta. visible:false solo cuando TODO esté confirmado. */
  AVISO: {
    visible: true,
    texto: "Maqueta de demostración · Los precios y el horario están pendientes de confirmar con el negocio."
  },

  negocio: {
    nombre: "{{NEGOCIO}}",
    lema: "{{LEMA}}",
    poblacion: "{{POBLACION}}",
    provincia: "Sevilla",
    /* Calle exacta solo si es real. Si no: "[PENDIENTE: dirección]". */
    direccion: "[PENDIENTE: dirección] · {{POBLACION}} (Sevilla)",

    /* 6XX XX XX XX a propósito: no marca el número de nadie. */
    telefono: "6XX XX XX XX",
    /* Sin espacios y sin el +. Vacío = los botones de WhatsApp no llevan a ningún sitio,
       que es lo correcto hasta tener el real. Para probar la demo, pon TU número. */
    whatsapp: "",

    instagram: "",                 // solo el usuario, sin @. Vacío si no consta.
    email: "",                     // vacío si no consta
    maps: "https://maps.google.com/?q={{NEGOCIO}}+{{POBLACION}}"
  },

  /* 0 = domingo … 6 = sábado. null = cerrado. Tramos como [apertura, cierre]. */
  horario: {
    0: null,
    1: [["09:30", "14:00"], ["17:00", "20:30"]],
    2: [["09:30", "14:00"], ["17:00", "20:30"]],
    3: [["09:30", "14:00"], ["17:00", "20:30"]],
    4: [["09:30", "14:00"], ["17:00", "20:30"]],
    5: [["09:30", "14:00"], ["17:00", "20:30"]],
    6: [["10:00", "14:00"]]
  },

  /* Sección principal: servicios, productos, carta… Ajustar al negocio.
     `precio` como cadena con coma decimal, o "" si no se muestra. */
  servicios: [
    { nombre: "{{SERVICIO_1}}", descripcion: "", precio: "" },
    { nombre: "{{SERVICIO_2}}", descripcion: "", precio: "" },
    { nombre: "{{SERVICIO_3}}", descripcion: "", precio: "" }
  ],

  /* Textos largos. Los que llevan <br> o <em> van por innerHTML: solo aquí, nunca datos del usuario. */
  textos: {
    heroTitulo: "{{HERO_TITULO}}",
    heroEntrada: "{{HERO_ENTRADA}}",
    nosotrosTitulo: "{{NOSOTROS_TITULO}}",
    nosotrosTexto: "{{NOSOTROS_TEXTO}}"
  }
};

const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
