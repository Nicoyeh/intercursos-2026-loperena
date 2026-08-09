'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — rules.js
   Reglamento en tarjetas desplegables, generadas desde TORNEO_DATA.reglamento
   (data.js). Cada tarjeta se abre y cierra de forma independiente.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initReglamento();
});

function initReglamento() {
  const lista = document.getElementById('rulesList');
  if (!lista || typeof TORNEO_DATA === 'undefined') return;

  const reglas = TORNEO_DATA.reglamento || [];
  if (!reglas.length) return;

  lista.innerHTML = reglas.map(crearTarjetaReglaHTML).join('');

  lista.querySelectorAll('[data-rule-toggle]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const tarjeta = boton.closest('.rule-card');
      const abierta = tarjeta.classList.toggle('is-open');
      boton.setAttribute('aria-expanded', abierta ? 'true' : 'false');
    });
  });

  if (typeof window.observeReveal === 'function') {
    window.observeReveal(lista);
  }
}

function crearTarjetaReglaHTML(regla, indice) {
  const idPanel = `regla-panel-${regla.id}`;

  return `
    <article class="rule-card reveal" style="--d:${Math.min(indice * 0.04, 0.3)}s">
      <button class="rule-card__toggle" type="button" data-rule-toggle aria-expanded="false" aria-controls="${idPanel}">
        <span class="rule-card__icon" aria-hidden="true">${regla.icono}</span>
        <span class="rule-card__title">${regla.titulo}</span>
        <span class="rule-card__chevron" aria-hidden="true">⌄</span>
      </button>
      <div class="rule-card__panel" id="${idPanel}">
        <ul class="rule-card__list">
          ${regla.puntos.map((punto) => `<li>${punto}</li>`).join('')}
        </ul>
      </div>
    </article>
  `;
}
