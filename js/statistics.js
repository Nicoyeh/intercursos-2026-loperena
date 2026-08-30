'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — statistics.js
   Estadísticas por deporte, en pestañas. MVP / Goleadores /
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
  futbol:     { statsIndividuales: ['mvp', 'goleadores'], empates: true }, // 'mejorArquero' eliminado
  baloncesto: { statsIndividuales: ['mvp', 'maximosAnotadores'], empates: false },
  voleibol:   { statsIndividuales: ['mvp'], empates: false }
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

  // Se añade style para alinear al inicio (align-items: start)
  return `<div class="stats-grid" style="align-items: start; height: auto;">${tarjetasIndividuales}${tarjetasEquipo}</div>`;
}

function crearTarjetaIndividualHTML(clave, valor) {
  const etiqueta = ETIQUETAS_INDIVIDUALES[clave];
  const listaVacia = Array.isArray(valor) ? valor.length === 0 : !valor;

  let contenidoHTML = '';

  if (listaVacia) {
    contenidoHTML = '<p class="stat-card__pending">Se cargará cuando la organización registre este dato.</p>';
  } else if (Array.isArray(valor)) {
    // Clonar y ordenar de mayor a menor por goles o canastas
    const listaOrdenada = [...valor].sort((a, b) => {
      const cantidadA = a.goles ?? a.canastas ?? 0;
      const cantidadB = b.goles ?? b.canastas ?? 0;
      return cantidadB - cantidadA;
    });

    // Lista de MVP, goleadores o anotadores
    const items = listaOrdenada.map((item) => {
      const equipoInfo = TORNEO_DATA.equipos ? TORNEO_DATA.equipos[item.equipo] : null;
      const bandera = equipoInfo ? banderaHTML(equipoInfo, 'stat-card__flag') : '';
      
      // Mostrar métrica únicamente si no es MVP y tiene goles o canastas definidos
      let metricaHTML = '';
      if (clave !== 'mvp') {
        if (item.goles !== undefined) {
          metricaHTML = `<span style="font-weight: 700; font-size: 0.82rem; color: #f39c12; flex-shrink: 0; white-space: nowrap;">${item.goles} goles</span>`;
        } else if (item.canastas !== undefined) {
          metricaHTML = `<span style="font-weight: 700; font-size: 0.82rem; color: #f39c12; flex-shrink: 0; white-space: nowrap;">${item.canastas} canastas</span>`;
        }
      }

      return `
        <li style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0;">
            <div style="width: 24px; height: 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 2px;">
              ${bandera}
            </div>
            <div style="display: flex; flex-direction: column; flex: 1; min-width: 0;">
              <span style="font-weight: 600; font-size: 0.82rem; line-height: 1.2; word-break: break-word;">${item.nombre}</span>
              <span style="font-size: 0.72rem; opacity: 0.6;">${item.equipo}</span>
            </div>
          </div>
          ${metricaHTML}
        </li>
      `;
    }).join('');

    contenidoHTML = `<ul style="list-style: none; padding: 0; margin: 12px 0 0 0;">${items}</ul>`;
  } else {
    // Objeto único en caso de requerirse
    const equipoInfo = TORNEO_DATA.equipos ? TORNEO_DATA.equipos[valor.equipo] : null;
    const bandera = equipoInfo ? banderaHTML(equipoInfo, 'stat-card__leader-flag') : '';

    contenidoHTML = `
      <div style="display: flex; align-items: center; gap: 12px; margin-top: 16px;">
        <div style="width: 32px; height: 22px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 3px;">
          ${bandera}
        </div>
        <div style="display: flex; flex-direction: column;">
          <span style="font-weight: 700; font-size: 1rem;">${valor.nombre}</span>
          <span style="font-size: 0.8rem; opacity: 0.7;">Grado ${valor.equipo}</span>
        </div>
      </div>
    `;
  }

  return `
    <div class="stat-card reveal" style="height: auto; justify-content: flex-start; gap: 12px;">
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
      <div class="stat-card reveal" style="height: auto; justify-content: flex-start; gap: 12px;">
        <div class="stat-card__header">
          <span class="stat-card__icon" aria-hidden="true">${t.icono}</span>
          <span class="stat-card__title">${t.titulo}</span>
        </div>
        ${equipo
          ? `<div class="stat-card__leader" style="margin-top: 8px;">
              ${banderaHTML(TORNEO_DATA.equipos[equipo.codigo], 'stat-card__leader-flag')}
              <span class="stat-card__leader-code">${equipo.codigo}</span>
              <span class="stat-card__leader-value">${equipo[t.campo]} ${t.sufijo}</span>
            </div>`
          : '<p class="stat-card__pending">Todavía no hay partidos jugados de este deporte.</p>'}
      </div>
    `;
  }).join('');
}