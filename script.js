/* ==========================================================================
   Don Ramón Barbershop — JavaScript vanilla
   Se carga con `defer`, así que el DOM ya está listo cuando corre.
   Las funcionalidades se van sumando commit por commit.
   ========================================================================== */

// --------------------------------------------------------------------------
// Número de WhatsApp y mensajes predefinidos
// --------------------------------------------------------------------------
const WHATSAPP_NUMBER = "59894123456"; //formato internacional, sin + ni espacios

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
// Inicialización
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initMenu();
  initHeaderScroll();
});
