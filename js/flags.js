'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — flags.js
   ========================================================================== */

function banderaHTML(equipoCodigo, clase = 'match-card__flag') {
  if (!equipoCodigo || !TORNEO_DATA.equipos[equipoCodigo]) {
    return `<span class="${clase} flag-placeholder"></span>`;
  }

  const equipo = TORNEO_DATA.equipos[equipoCodigo];
  return `<img src="${equipo.bandera}" alt="${equipo.pais}" class="${clase}" loading="lazy">`;
}