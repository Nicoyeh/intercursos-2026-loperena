'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — flags.js
   Antes, cada bandera se mostraba como un emoji dentro de un <span>. Ahora
   "equipo.bandera" (en js/data.js) guarda la ruta a un archivo real en
   assets/flags/, y esta única función arma el <img> correspondiente.
   Se usa en calendar.js, categories.js, bracket.js, statistics.js,
   gallery.js, highlights.js y organization.js — para cambiar tamaño,
   bordes o cualquier otro detalle visual de TODAS las banderas del sitio
   a la vez, basta con tocar la clase ".flag-icon" en css/styles.css o el
   HTML que arma esta función, en vez de editar cada archivo.
   ========================================================================== */

/**
 * Devuelve el <img> de la bandera de un equipo.
 * @param {object} equipo - un valor de TORNEO_DATA.equipos (necesita .bandera y .pais)
 * @param {string} claseContexto - clase adicional para controlar el tamaño según dónde se use (ej. "match-card__flag")
 */
function banderaHTML(equipo, claseContexto) {
  if (!equipo || !equipo.bandera) return '';
  const clase = claseContexto ? `flag-icon ${claseContexto}` : 'flag-icon';
  // alt="" + aria-hidden porque el código/nombre del equipo (visible justo
  // al lado en todos los casos) ya cumple ese rol para lectores de pantalla.
  return `<img class="${clase}" src="${equipo.bandera}" alt="" aria-hidden="true" loading="lazy">`;
}

window.banderaHTML = banderaHTML;