'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — animations.js
   Partículas del Hero, parallax sutil con el mouse y el sistema de
   "reveal on scroll". La función observeReveal() se expone en
   window.observeReveal para que futuras fases (calendario, galería,
   estadísticas...) la llamen después de insertar tarjetas dinámicas.
   ========================================================================== */

let revealObserver = null;

document.addEventListener('DOMContentLoaded', () => {
  initParticulas();
  initParallax();
  initReveal();
});

/* -------------------- Partículas ambientales del Hero -------------------- */
function initParticulas() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = window.devicePixelRatio || 1;
  let particulas = [];
  let ancho = 0;
  let alto = 0;

  function ajustarTamano() {
    ancho = canvas.width = canvas.offsetWidth * dpr;
    alto = canvas.height = canvas.offsetHeight * dpr;
  }

  function crearParticulas() {
    const cantidad = window.innerWidth < 700 ? 35 : 80;
    particulas = Array.from({ length: cantidad }, () => ({
      x: Math.random() * ancho,
      y: Math.random() * alto,
      radio: (Math.random() * 1.6 + 0.4) * dpr,
      velocidadY: (Math.random() * 0.25 + 0.05) * dpr,
      deriva: (Math.random() - 0.5) * 0.2 * dpr,
      opacidad: Math.random() * 0.5 + 0.2,
      titileo: Math.random() * Math.PI * 2
    }));
  }

  function dibujar() {
    ctx.clearRect(0, 0, ancho, alto);
    particulas.forEach((p) => {
      p.titileo += 0.02;
      const opacidadActual = p.opacidad * (0.6 + 0.4 * Math.sin(p.titileo));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 220, 255, ${opacidadActual})`;
      ctx.fill();

      p.y -= p.velocidadY;
      p.x += p.deriva;
      if (p.y < -10) {
        p.y = alto + 10;
        p.x = Math.random() * ancho;
      }
    });

    if (!reducirMovimiento) requestAnimationFrame(dibujar);
  }

  ajustarTamano();
  crearParticulas();
  dibujar(); // se dibuja al menos un cuadro incluso si se reduce el movimiento

  window.addEventListener('resize', () => {
    ajustarTamano();
    crearParticulas();
  });
}

/* -------------------- Parallax sutil del trofeo y el balón -------------------- */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elementos = document.querySelectorAll('[data-parallax]');
  const hero = document.querySelector('.hero');
  if (!elementos.length || !hero) return;

  hero.addEventListener('mousemove', (evento) => {
    const x = evento.clientX / window.innerWidth - 0.5;
    const y = evento.clientY / window.innerHeight - 0.5;

    elementos.forEach((el) => {
      const factor = parseFloat(el.dataset.parallax) || 0.3;
      el.style.transform = `translate3d(${x * 30 * factor}px, ${y * 30 * factor}px, 0)`;
    });
  });
}

/* -------------------- Reveal on scroll (reutilizable) -------------------- */
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  revealObserver = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        revealObserver.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  observeReveal(document);
}

/**
 * Registra elementos ".reveal" (dentro de "raiz") en el observador
 * compartido. Las próximas fases deben llamar a window.observeReveal(contenedor)
 * justo después de insertar contenido dinámico con la clase "reveal",
 * para que también aparezca con la animación al hacer scroll.
 */
function observeReveal(raiz = document) {
  if (!raiz || !raiz.querySelectorAll) return;
  const elementos = raiz.querySelectorAll('.reveal:not(.is-visible)');

  if (!revealObserver) {
    elementos.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  elementos.forEach((el) => revealObserver.observe(el));
}

window.observeReveal = observeReveal;
