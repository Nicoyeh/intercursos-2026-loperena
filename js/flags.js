'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — flags.js
   ========================================================================== */

function banderaHTML(equipoCodigo, clase = 'match-card__flag') {
  if (!equipoCodigo || !TORNEO_DATA || !TORNEO_DATA.equipos) {
    return `<span class="${clase} flag-placeholder"></span>`;
  }

  // 1. Buscar coincidencia exacta (ej. "6-01")
  let equipo = TORNEO_DATA.equipos[equipoCodigo];

  // 2. Si no lo encuentra, limpiar el código por si tiene sufijos (ej. "6-01-F" -> "6-01")
  if (!equipo) {
    const codigoLimpio = equipoCodigo.split('-').slice(0, 2).join('-');
    equipo = TORNEO_DATA.equipos[codigoLimpio];
  }

  // 3. Si sigue sin existir, retornar placeholder
  if (!equipo) {
    return `<span class="${clase} flag-placeholder"></span>`;
  }

  // Asegurar que la ruta no tenga barras extra al inicio
  const rutaBandera = equipo.bandera.replace(/^(\.\/|\/)/, '');

  return `<img src="${rutaBandera}" alt="${equipo.pais}" class="${clase}" loading="lazy">`;
}