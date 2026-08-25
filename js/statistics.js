'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — statistics.js
   Estadísticas por deporte, en pestañas. MVP / Goleadores / Mejor arquero /
   Máximos anotadores dependen de que alguien registre datos por jugador —
   mientras TORNEO_DATA.estadisticasIndividuales no los tenga, se muestran
   como pendientes (nunca se inventan nombres). Los líderes de equipo
   (partidos, victorias, empates, derrotas) sí se calculan solos desde
   TORNEO_DATA.partidos.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initEstadisticas();
});

const CONFIG_DEPORTE_STATS = {
  futbol:     { statsIndividuales: ['mvp', 'goleadores', 'mejorArquero'], empates: true },
  baloncesto: { statsIndividuales: ['mvp', 'maximosAnotadores'], empates: false },
  voleibol:   { statsIndividuales: ['mvp', 'maximosAnotadores'], empates: false }
};

const ETIQUETAS_INDIVIDUALES = {
  mvp: { titulo: 'MVP', icono: '⭐' },
  goleadores: { titulo: 'Goleadores', icono: '🥅' },
  mejorArquero: { titulo: 'Mejor arquero', icono: '🧤' },
  maximosAnotadores: { titulo: 'Máximos anotadores', icono: '🎯' }
};

function initEstadisticas() {
  const contenedor = document.getElementById('statsContainer');
  if (!contenedor || typeof TORNEO_DATA === 'undefined') return;

  const botones = document.querySelectorAll('[data-stats-deporte]');

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      if (boton.classList.contains('is-active')) return;
      botones.forEach((b) => b.classList.toggle('is-active', b === boton));
      pintarEstadisticas(contenedor, boton.dataset.statsDeporte);
    });
  });

  pintarEstadisticas(contenedor, 'futbol');
}

function pintarEstadisticas(contenedor, claveDeporte) {
  contenedor.innerHTML = crearEstadisticasHTML(claveDeporte);
  if (typeof window.observeReveal === 'function') window.observeReveal(contenedor);
}

function crearEstadisticasHTML(claveDeporte) {
  const config = CONFIG_DEPORTE_STATS[claveDeporte];
  const individuales = TORNEO_DATA.estadisticasIndividuales[claveDeporte] || {};

  const tarjetasIndividuales = config.statsIndividuales
    .map((clave) => crearTarjetaIndividualHTML(clave, individuales[clave]))
    .join('');

  const lideres = calcularLideresEquipo(claveDeporte, config.empates);
  const tarjetasEquipo = crearTarjetasLideresHTML(lideres, config.empates);

  return `<div class="stats-grid">${tarjetasIndividuales}${tarjetasEquipo}</div>`;
}

function crearTarjetaIndividualHTML(clave, valor) {
  const etiqueta = ETIQUETAS_INDIVIDUALES[clave];
  const listaVacia = Array.isArray(valor) ? valor.length === 0 : !valor;

  let contenidoHTML = '';

  if (listaVacia) {
    contenidoHTML = '<p class="stat-card__pending">Se cargará cuando la organización registre este dato.</p>';
  } else if (Array.isArray(valor)) {
    // Genera listas para goleadores y máximos anotadores
    const items = valor.map((item) => {
      const equipoInfo = TORNEO_DATA.equipos ? TORNEO_DATA.equipos[item.equipo] : null;
      const bandera = equipoInfo ? banderaHTML(equipoInfo, 'stat-card__flag') : '';
      const metrica = item.goles !== undefined ? `${item.goles} goles` : `${item.canastas} canastas`;

      return `
        <li class="stat-card__item" style="display:flex; align-items:center; justify-content:space-between; margin-top:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            ${bandera}
            <strong>${item.nombre}</strong>
            <span style="opacity:0.75; font-size:0.9em;">(${item.equipo})</span>
          </div>
          <span class="stat-card__leader-value">${metrica}</span>
        </li>
      `;
    }).join('');

    contenidoHTML = `<ul class="stat-card__list" style="list-style:none; padding:0; margin:0;">${items}</ul>`;
  } else {
    // Genera la tarjeta para MVP o Mejor Arquero
    const equipoInfo = TORNEO_DATA.equipos ? TORNEO_DATA.equipos[valor.equipo] : null;
    const bandera = equipoInfo ? banderaHTML(equipoInfo, 'stat-card__leader-flag') : '';
    const extra = valor.canastas ? `<span class="stat-card__leader-value">${valor.canastas} canastas</span>` : '';

    contenidoHTML = `
      <div class="stat-card__leader" style="display:flex; align-items:center; gap:10px;">
        ${bandera}
        <div>
          <strong class="stat-card__leader-code" style="display:block;">${valor.nombre}</strong>
          <span style="opacity:0.8; font-size:0.85em;">${valor.equipo}</span>
        </div>
        ${extra}
      </div>
    `;
  }

  return `
    <div class="stat-card reveal">
      <div class="stat-card__header">
        <span class="stat-card__icon" aria-hidden="true">${etiqueta.icono}</span>
        <span class="stat-card__title">${etiqueta.titulo}</span>
      </div>
      ${contenidoHTML}
    </div>
  `;
}
/** Calcula, para un deporte, qué equipo lidera en partidos jugados, victorias, empates y derrotas. */
function calcularLideresEquipo(claveDeporte, incluirEmpates) {
  const stats = {};

  Object.entries(TORNEO_DATA.equipos).forEach(([codigo]) => {
    stats[codigo] = { codigo, pj: 0, g: 0, e: 0, p: 0 };
  });

  TORNEO_DATA.partidos
    .filter((partido) => partido.deporte === claveDeporte && partido.estado === 'jugado')
    .forEach((partido) => {
      const local = stats[partido.local];
      const visitante = stats[partido.visitante];
      if (!local || !visitante) return;

      local.pj += 1;
      visitante.pj += 1;

      if (partido.marcadorLocal > partido.marcadorVisitante) {
        local.g += 1;
        visitante.p += 1;
      } else if (partido.marcadorLocal < partido.marcadorVisitante) {
        visitante.g += 1;
        local.p += 1;
      } else {
        local.e += 1;
        visitante.e += 1;
      }
    });

  const lista = Object.values(stats).filter((e) => e.pj > 0);
  const lider = (campo) => (lista.length ? [...lista].sort((a, b) => b[campo] - a[campo])[0] : null);

  return {
    masPartidos: lider('pj'),
    masVictorias: lider('g'),
    masEmpates: incluirEmpates ? lider('e') : null,
  };
}

function crearTarjetasLideresHTML(lideres, incluirEmpates) {
  const tarjetas = [
    { clave: 'masPartidos', titulo: 'Más partidos jugados', icono: '📅', campo: 'pj', sufijo: 'partidos' },
    { clave: 'masVictorias', titulo: 'Más victorias', icono: '🏆', campo: 'g', sufijo: 'victorias' },
    incluirEmpates ? { clave: 'masEmpates', titulo: 'Más empates', icono: '🤝', campo: 'e', sufijo: 'empates' } : null,
  ].filter(Boolean);

  return tarjetas.map((t) => {
    const equipo = lideres[t.clave];
    return `
      <div class="stat-card reveal">
        <div class="stat-card__header">
          <span class="stat-card__icon" aria-hidden="true">${t.icono}</span>
          <span class="stat-card__title">${t.titulo}</span>
        </div>
        ${equipo
          ? `<div class="stat-card__leader">
              ${banderaHTML(TORNEO_DATA.equipos[equipo.codigo], 'stat-card__leader-flag')}
              <span class="stat-card__leader-code">${equipo.codigo}</span>
              <span class="stat-card__leader-value">${equipo[t.campo]} ${t.sufijo}</span>
            </div>`
          : '<p class="stat-card__pending">Todavía no hay partidos jugados de este deporte.</p>'}
      </div>
    `;
  }).join('');
}
