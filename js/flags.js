'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — flags.js
   ========================================================================== */

function banderaHTML(equipoCodigo, clase = 'match-card__flag') {
  if (!equipoCodigo) {
    return `<span class="${clase} flag-placeholder"></span>`;
  }

  // Si el equipo existe en TORNEO_DATA
  if (TORNEO_DATA && TORNEO_DATA.equipos && TORNEO_DATA.equipos[equipoCodigo]) {
    const equipo = TORNEO_DATA.equipos[equipoCodigo];
    return `<img src="${equipo.bandera}" alt="${equipo.pais}" class="${clase}" loading="lazy">`;
  }

  // Respaldo por si el código no está en la lista de equipos
  return `<span class="${clase} flag-placeholder"></span>`;
}