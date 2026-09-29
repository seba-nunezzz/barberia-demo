/* ==========================================================================
   Don Ramón Barbershop — JavaScript vanilla
   Se carga con `defer`, así que el DOM ya está listo cuando corre.
   Las funcionalidades se van sumando commit por commit.
   ========================================================================== */

// Marca que hay JS activo: las animaciones de entrada solo se aplican si esta
// clase está presente, así el contenido nunca queda invisible sin JavaScript.
document.documentElement.classList.add("has-js");

// --------------------------------------------------------------------------
// Número de WhatsApp y mensajes predefinidos
// --------------------------------------------------------------------------
const WHATSAPP_NUMBER = "59894123456"; // formato internacional, sin + ni espacios

// Mensaje que se manda en cada botón, según el contexto (data-wa del HTML)
const WHATSAPP_MESSAGES = {
  reserva: "Hola, quiero reservar un turno",
  corte: "Hola, quiero reservar un turno para un corte",
  barba: "Hola, quiero reservar un turno para la barba",
  combo: "Hola, quiero reservar un turno para corte + barba",
  perfilado: "Hola, quiero reservar un turno para un perfilado",
};

/** Arma la URL de wa.me con el mensaje ya codificado. */
function buildWhatsAppUrl(key = "reserva") {
  const message = WHATSAPP_MESSAGES[key] || WHATSAPP_MESSAGES.reserva;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Aplica el link a todos los botones que tengan data-wa="...". */
function initWhatsAppLinks() {
  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.setAttribute("href", buildWhatsAppUrl(link.dataset.wa));
  });
}

// --------------------------------------------------------------------------
// Menú hamburguesa (solo mobile)
// --------------------------------------------------------------------------
function initMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú de navegación");
    menu.classList.remove("is-open");
  };

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú de navegación");
    menu.classList.add("is-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // Al tocar un link del menú se cierra (en mobile tapa contenido)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Con Escape se cierra y el foco vuelve al botón
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      toggle.focus();
    }
  });
}

// --------------------------------------------------------------------------
// Header: sombra/borde al hacer scroll
// --------------------------------------------------------------------------
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// --------------------------------------------------------------------------
// Lazy loading de la galería
// Las imágenes trae su URL real en data-src y un SVG de 1 px en src.
// Cuando la imagen entra en pantalla se le pone la URL real y se marca
// como cargada para disparar el fundido.
// --------------------------------------------------------------------------
function initLazyImages() {
  const images = document.querySelectorAll("img[data-src]");
  if (!images.length) return;

  const loadImage = (img) => {
    img.src = img.dataset.src;
    // La clase se agrega recién cuando la foto terminó de decodificar
    const onLoad = () => img.classList.add("is-loaded");
    if (img.complete) onLoad();
    else img.addEventListener("load", onLoad, { once: true });
    // Libera el atributo para no guardar la URL dos veces
    delete img.dataset.src;
  };

  // Navegadores modernos: IntersectionObserver, mucho más liviano
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadImage(entry.target);
        obs.unobserve(entry.target); // deja de observar: ya no hace falta
      });
    }, { rootMargin: "200px" }); // carga un poco antes de que se vea

    images.forEach((img) => observer.observe(img));
  } else {
    // Respaldo para navegadores viejos
    images.forEach(loadImage);
  }
}

// --------------------------------------------------------------------------
// Año del copyright: se completa solo, así nunca queda desactualizado
// --------------------------------------------------------------------------
function initCurrentYear() {
  const year = document.getElementById("anio");
  if (year) year.textContent = new Date().getFullYear();
}

// --------------------------------------------------------------------------
// Animaciones de entrada al hacer scroll (fade-in)
// Los elementos con [data-reveal] empiezan invisibles y se muestran al entrar
// en pantalla. Los hermanos se escalonan para que no aparezcan todos juntos.
// --------------------------------------------------------------------------
function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");

  // Si el visitante pidió menos movimiento, mostramos todo sin animar
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  // Retraso progresivo por grupo de hermanos
  const counter = new WeakMap();
  items.forEach((item) => {
    const index = counter.get(item.parentElement) || 0;
    counter.set(item.parentElement, index + 1);
    item.style.transitionDelay = `${index * 90}ms`;
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target); // la animación corre una sola vez
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  items.forEach((item) => observer.observe(item));
}

// --------------------------------------------------------------------------
// Inicialización
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initMenu();
  initHeaderScroll();
  initLazyImages();
  initReveal();
  initCurrentYear();
});
