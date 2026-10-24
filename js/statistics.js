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

/**
 * MVP acumulativo. En data.js, cada deporte tiene su propia lista
 * estadisticasIndividuales.<deporte>.mvp. Hay dos formas de escribir a una persona
 * (se pueden mezclar; todo se suma):
 *   1) UNA línea con el total:   { nombre: 'Nicolle Pineda', equipo: '11-02', mvp: 3 }
 *      Cuando gane otra vez, solo cambias el número (mvp: 4).
 *   2) Una línea por reconocimiento (sin "mvp"): cada línea cuenta 1.
 * Aquí se agrupan por persona y se muestra el total ("3 MVP").
 *
 *  · Cuenta por deporte: esta función solo recibe la lista de UN deporte, así que
 *    los MVP de fútbol, baloncesto y voleibol nunca se suman entre sí.
 *  · Una persona = mismo nombre + mismo equipo (curso). Se ignoran mayúsculas,
 *    tildes, espacios de más y emojis (🌟) al comparar nombres; se muestra el nombre
 *    tal como aparece la primera vez.
 *  · Se calcula cada vez que se dibuja la tarjeta, sin guardar ningún contador:
 *    recargar la página o recalcular nunca cuenta dos veces lo mismo.
 *  · Si pones el total en una línea (mvp: 3), NO repitas además otras líneas de esa
 *    misma persona: se sumarían. Una línea por persona es lo más claro.
 *  · Opcional (solo para el estilo de una línea por reconocimiento): si una entrada trae
 *    partido: 'p123', dos entradas de la misma persona con el mismo partido cuentan UNA vez.
 */
function contarMVP(lista) {
  const normalizar = (texto) => String(texto ?? '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ').trim().toLowerCase();

  const personas = new Map();      // persona -> { nombre, equipo, mvp }
  const yaContados = new Set();    // persona + partido (solo si la entrada trae "partido")

  lista.forEach((item) => {
    const persona = `${normalizar(item.nombre)}|${String(item.equipo ?? '').trim()}`;
    if (item.partido !== undefined && item.partido !== null) {
      const reconocimiento = `${persona}|${item.partido}`;
      if (yaContados.has(reconocimiento)) return;
      yaContados.add(reconocimiento);
    }
    // Cantidad que aporta esta línea: su "mvp" si lo trae (número entero ≥ 1), si no 1.
    const indicado = item.mvp === undefined || item.mvp === null ? 1 : Math.floor(Number(item.mvp));
    if (!Number.isFinite(indicado) || indicado < 1) return;   // mvp: 0 o inválido → no suma ni aparece
    if (!personas.has(persona)) personas.set(persona, { nombre: item.nombre, equipo: item.equipo, mvp: 0 });
    personas.get(persona).mvp += indicado;
  });

  return [...personas.values()];
}

function crearTarjetaIndividualHTML(clave, valor) {
  const etiqueta = ETIQUETAS_INDIVIDUALES[clave];
  const listaVacia = Array.isArray(valor) ? valor.length === 0 : !valor;

  let contenidoHTML = '';

  if (listaVacia) {
    contenidoHTML = '<p class="stat-card__pending">Se cargará cuando la organización registre este dato.</p>';
  } else if (Array.isArray(valor)) {
    // Clonar y ordenar de mayor a menor por goles o puntos de baloncesto.
    // En data.js los puntos individuales de baloncesto se guardan hoy en "canastas";
    // también se acepta "puntos" para los registros nuevos (si trae ambos, manda "puntos").
    // En la tarjeta MVP primero se agrupa por persona (cada entrada = un reconocimiento).
    const base = clave === 'mvp' ? contarMVP(valor) : [...valor];
    const listaOrdenada = base.sort((a, b) => {
      const cantidadA = a.mvp ?? a.goles ?? a.puntos ?? a.canastas ?? 0;
      const cantidadB = b.mvp ?? b.goles ?? b.puntos ?? b.canastas ?? 0;
      return cantidadB - cantidadA;
    });

    // Lista de MVP, goleadores o anotadores
    const items = listaOrdenada.map((item) => {
      const equipoInfo = TORNEO_DATA.equipos ? TORNEO_DATA.equipos[item.equipo] : null;
      const bandera = equipoInfo ? banderaHTML(equipoInfo, 'stat-card__flag') : '';
      
      // MVP: total acumulado en este deporte ("3 MVP"). Goleadores / anotadores: goles o puntos.
      let metricaHTML = '';
      if (clave === 'mvp') {
        metricaHTML = `<span style="font-weight: 700; font-size: 0.82rem; color: #f39c12; flex-shrink: 0; white-space: nowrap;">${item.mvp} MVP</span>`;
      } else {
        if (item.goles !== undefined) {
          metricaHTML = `<span style="font-weight: 700; font-size: 0.82rem; color: #f39c12; flex-shrink: 0; white-space: nowrap;">${item.goles} goles</span>`;
        } else if (item.puntos !== undefined || item.canastas !== undefined) {
          const puntosJugador = item.puntos !== undefined ? item.puntos : item.canastas;
          metricaHTML = `<span style="font-weight: 700; font-size: 0.82rem; color: #f39c12; flex-shrink: 0; white-space: nowrap;">Puntos: ${puntosJugador}</span>`;
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

      // bracket.js interpreta el resultado (marcador, o "ganador" si no hay marcador)
      const resultado = window.TorneoLlaves
        ? window.TorneoLlaves.resultadoPartido(partido)
        : {
          ganador: partido.marcadorLocal > partido.marcadorVisitante ? partido.local
            : (partido.marcadorLocal < partido.marcadorVisitante ? partido.visitante : null),
          empate: partido.marcadorLocal === partido.marcadorVisitante
        };

      if (resultado.ganador === partido.local) {
        local.g += 1;
        visitante.p += 1;
      } else if (resultado.ganador === partido.visitante) {
        visitante.g += 1;
        local.p += 1;
      } else if (resultado.empate) {
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