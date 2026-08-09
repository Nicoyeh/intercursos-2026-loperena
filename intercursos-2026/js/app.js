'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — app.js
   Comportamiento del menú: fondo transparente → glassmorphism al hacer scroll,
   y apertura/cierre del menú móvil.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
});

/**
 * Cambia el fondo del menú a glassmorphism cuando el usuario baja de un
 * umbral de scroll. Usa requestAnimationFrame para no saturar el hilo
 * principal con el evento "scroll".
 */
function initNavScroll() {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;

  const UMBRAL = 60;
  let ticking = false;

  function actualizar() {
    nav.classList.toggle('nav--scrolled', window.scrollY > UMBRAL);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(actualizar);
      ticking = true;
    }
  }, { passive: true });

  actualizar(); // por si la página carga con scroll ya restaurado (ej. al recargar)
}

/**
 * Controla el menú móvil de pantalla completa: abrir, cerrar por clic en
 * un enlace, por tecla Escape, o al hacer clic en el botón hamburguesa.
 */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  function abrir() {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');
  }

  function cerrar() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  toggle.addEventListener('click', () => {
    const abierto = menu.classList.contains('is-open');
    abierto ? cerrar() : abrir();
  });

  menu.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', cerrar);
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') cerrar();
  });
}
