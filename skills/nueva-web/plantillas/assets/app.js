/* ==========================================================================
   {{NEGOCIO}} — pinta la web a partir de datos.js
   Sin dependencias. Todo lo editable está en datos.js; aquí no se toca nada.

   Regla: la página se lee entera sin JavaScript. Lo de aquí abajo rellena
   huecos y añade comodidades, nunca contenido que no exista ya en el HTML.

   Índice
   01 · Utilidades
   02 · Cinta de aviso
   03 · Cabecera y menú móvil
   04 · Contacto por atributos data-*
   05 · Servicios
   06 · Horario y "abierto ahora"
   07 · Aparición al hacer scroll
   08 · Arranque
   ========================================================================== */

(function () {
  "use strict";
  const d = document;
  const $  = (s, ctx = d) => ctx.querySelector(s);
  const $$ = (s, ctx = d) => [...ctx.querySelectorAll(s)];

  /* ---------- 01 · Utilidades ---------- */

  /* Escapa lo que venga de datos.js antes de meterlo en el HTML. */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  /* localStorage puede fallar (modo privado, cookies bloqueadas). Nunca tumba la página. */
  const almacen = {
    leer(k)      { try { return sessionStorage.getItem(k); } catch { return null; } },
    escribir(k, v) { try { sessionStorage.setItem(k, v); } catch { /* da igual */ } }
  };

  const sinMovimiento = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 02 · Cinta de aviso ---------- */
  function pintarAviso() {
    const aviso = $("[data-aviso]");
    if (!aviso) return;
    const cerrada = almacen.leer("aviso") === "no";
    aviso.hidden = !DATOS.AVISO.visible || cerrada;
    const texto = $("span", aviso);
    if (texto) texto.textContent = DATOS.AVISO.texto;
    d.addEventListener("click", (ev) => {
      if (!ev.target.closest("[data-cerrar-aviso]")) return;
      almacen.escribir("aviso", "no");
      aviso.hidden = true;
    });
  }

  /* ---------- 03 · Cabecera y menú móvil ---------- */
  function cabecera() {
    const cab = $("[data-cabecera]");
    if (cab) {
      const marcar = () => cab.classList.toggle("cabecera--posada", scrollY > 12);
      marcar();
      addEventListener("scroll", marcar, { passive: true });
    }
    const btn = $("[data-menu-boton]"), nav = $("[data-nav]");
    if (!btn || !nav) return;
    btn.addEventListener("click", () => {
      const abierto = nav.classList.toggle("nav--desplegado");
      btn.setAttribute("aria-expanded", String(abierto));
    });
    $$("a", nav).forEach((a) => a.addEventListener("click", () => {
      nav.classList.remove("nav--desplegado");
      btn.setAttribute("aria-expanded", "false");
    }));
  }

  /* ---------- 04 · Contacto por atributos data-* ---------- */
  function contacto() {
    const n = DATOS.negocio;
    const telEnlace = (n.telefono || "").replace(/\s/g, "");
    const telReal = /^\d{9}$/.test(telEnlace);   // 6XX XX XX XX no pasa: el enlace no marca nada

    $$("[data-nombre]").forEach((el) => { el.textContent = n.nombre; });
    $$("[data-tel]").forEach((el) => {
      el.href = telReal ? "tel:+34" + telEnlace : "#contacto";
      if (el.hasAttribute("data-tel-texto")) el.textContent = n.telefono;
    });
    $$("[data-whatsapp]").forEach((el) => {
      const num = (n.whatsapp || "").replace(/\D/g, "");
      el.href = num ? "https://wa.me/" + num : "#contacto";
    });
    $$("[data-como-llegar]").forEach((el) => { el.href = n.maps; });
    $$("[data-direccion]").forEach((el) => { el.textContent = n.direccion; });
    $$("[data-instagram]").forEach((el) => {
      if (!n.instagram) { el.closest("li")?.remove(); return; }
      el.href = "https://www.instagram.com/" + n.instagram + "/";
      el.textContent = "@" + n.instagram;
    });
    $$("[data-anio]").forEach((el) => { el.textContent = new Date().getFullYear(); });

    const t = DATOS.textos;
    const hT = $("[data-hero-titulo]");      if (hT) hT.innerHTML = t.heroTitulo;   // texto propio, no del usuario
    const hE = $("[data-hero-entrada]");     if (hE) hE.textContent = t.heroEntrada;
    const nT = $("[data-nosotros-titulo]");  if (nT) nT.textContent = t.nosotrosTitulo;
    const nX = $("[data-nosotros-texto]");   if (nX) nX.textContent = t.nosotrosTexto;
  }

  /* ---------- 05 · Servicios ---------- */
  function servicios() {
    const cont = $("[data-servicios]");
    if (!cont || !DATOS.servicios) return;
    cont.innerHTML = DATOS.servicios.map((s) => `
      <article class="tarjeta revelar">
        <h3 class="tarjeta__titulo">${esc(s.nombre)}</h3>
        ${s.descripcion ? `<p>${esc(s.descripcion)}</p>` : ""}
        ${s.precio ? `<p class="tarjeta__precio">${esc(s.precio)} €</p>` : ""}
      </article>`).join("");
  }

  /* ---------- 06 · Horario y "abierto ahora" ---------- */
  const aMinutos = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

  function horario() {
    const lista = $("[data-horario]");
    const H = DATOS.horario;
    if (!lista || !H) return;
    const hoy = new Date().getDay();
    const tramos = (dia) => H[dia] ? H[dia].map((t) => `${t[0]} – ${t[1]}`).join(" · ") : "Cerrado";

    /* Agrupa los días seguidos con el mismo horario: «Lunes a viernes». */
    const filas = [];
    for (let i = 1; i <= 7; i++) {
      const dia = i % 7, t = tramos(dia), ultima = filas[filas.length - 1];
      if (ultima && ultima.t === t) ultima.hasta = dia;
      else filas.push({ desde: dia, hasta: dia, t });
    }
    const nombrar = (f) => f.desde === f.hasta ? DIAS[f.desde]
      : `${DIAS[f.desde]} a ${DIAS[f.hasta].toLowerCase()}`;
    const esHoy = (f) => { for (let x = f.desde; ; x = (x + 1) % 7) { if (x === hoy) return true; if (x === f.hasta) return false; } };

    lista.innerHTML = filas.map((f) => `
      <li${esHoy(f) ? ' class="horario__hoy"' : ""}>
        <span class="horario__dias">${nombrar(f)}</span>
        <span class="horario__tramos">${f.t}</span>
      </li>`).join("");

    /* Abierto ahora: punto de color + palabra. Nunca solo el punto. */
    const estado = $("[data-estado]");
    if (!estado) return;
    const ahora = new Date(), min = ahora.getHours() * 60 + ahora.getMinutes();
    const abierto = (H[hoy] || []).some(([a, c]) => min >= aMinutos(a) && min < aMinutos(c));
    estado.className = `estado ${abierto ? "estado--abierto" : "estado--cerrado"}`;
    estado.innerHTML = `<span class="estado__punto" aria-hidden="true"></span><span>${abierto ? "Abierto ahora" : "Cerrado ahora"}</span>`;
    estado.hidden = false;
  }

  /* ---------- 07 · Aparición al hacer scroll ---------- */
  function revelar() {
    const els = $$(".revelar");
    if (!els.length) return;
    if (sinMovimiento() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("revelar--visible"));
      return;
    }
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("revelar--visible");
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 80}ms`;
      obs.observe(el);
    });
    /* Red de seguridad: a los 3 s, lo que siga invisible se enseña y punto. */
    setTimeout(() => els.forEach((el) => el.classList.add("revelar--visible")), 3000);
  }

  /* ---------- 08 · Arranque ---------- */
  pintarAviso();
  cabecera();
  contacto();
  servicios();
  horario();
  revelar();
})();
