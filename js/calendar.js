'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — calendar.js
   Renderiza las tarjetas de partido a partir de TORNEO_DATA (data.js) y
   controla los filtros por deporte, categoría y género. No contiene datos:
   para actualizar el calendario, edita únicamente js/data.js.

   Cada tarjeta muestra la FASE del partido (campo "fase" de data.js:
   Fase de grupos, Semifinales, Tercer puesto, Final). Los partidos sin
   fecha todavía se ordenan al final y muestran "SIN FECHA".
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCalendario();
});

function initCalendario() {
  const grid = document.getElementById('calendarioGrid');
  if (!grid || typeof TORNEO_DATA === 'undefined') return;

  const estado = { deporte: 'todos', categoria: 'todas', genero: 'todos' };

  renderizarPartidos(grid, estado);
  initFiltrosCalendario(grid, estado);
}

function initFiltrosCalendario(grid, estado) {
  const botonesDeporte = document.querySelectorAll('[data-filtro-deporte]');
  const botonesCategoria = document.querySelectorAll('[data-filtro-categoria]');
  const botonesGenero = document.querySelectorAll('[data-filtro-genero]');

  botonesDeporte.forEach((boton) => {
    boton.addEventListener('click', () => {
      estado.deporte = boton.dataset.filtroDeporte;
      marcarActivo(botonesDeporte, boton);
      renderizarPartidos(grid, estado);
    });
  });

  botonesCategoria.forEach((boton) => {
    boton.addEventListener('click', () => {
      estado.categoria = boton.dataset.filtroCategoria;
      marcarActivo(botonesCategoria, boton);
      renderizarPartidos(grid, estado);
    });
  });

  botonesGenero.forEach((boton) => {
    boton.addEventListener('click', () => {
      estado.genero = boton.dataset.filtroGenero;
      marcarActivo(botonesGenero, boton);
      renderizarPartidos(grid, estado);
    });
  });
}

function marcarActivo(botones, activo) {
  botones.forEach((boton) => boton.classList.toggle('is-active', boton === activo));
}

function renderizarPartidos(grid, estado) {
  const partidosFiltrados = TORNEO_DATA.partidos
    .filter((partido) => {
      const coincideDeporte = estado.deporte === 'todos' || partido.deporte === estado.deporte;
      const coincideCategoria = estado.categoria === 'todas' || partido.categoria === estado.categoria;
      const coincideGenero = estado.genero === 'todos' || partido.genero === estado.genero;
      return coincideDeporte && coincideCategoria && coincideGenero;
    })
    .sort(compararPartidosCalendario);

  grid.innerHTML = '';

  if (!partidosFiltrados.length) {
    grid.innerHTML = '<p class="calendar__vacio">Todavía no hay partidos programados para este filtro.</p>';
    return;
  }

  partidosFiltrados.forEach((partido, indice) => {
    grid.appendChild(crearTarjetaPartido(partido, indice));
  });

  // Registra las tarjetas nuevas en el observador de "reveal on scroll"
  // compartido (definido en animations.js).
  if (typeof window.observeReveal === 'function') {
    window.observeReveal(grid);
  }
}

/** Orden: fecha (sin fecha al final) → hora → fase. La lógica vive en bracket.js; aquí hay un respaldo mínimo. */
function compararPartidosCalendario(a, b) {
  if (window.TorneoLlaves) return window.TorneoLlaves.compararPartidos(a, b);
  return (a.fecha || '9999-99-99').localeCompare(b.fecha || '9999-99-99') || (a.hora || '').localeCompare(b.hora || '');
}

/**
 * Convierte una hora en 24h ("15:30", fácil de editar en data.js) al
 * formato de 12h que se muestra en pantalla ("3:30 p. m.").
 * Se expone en window para que categories.js también la use.
 */
function formatearHora(hora24) {
  if (!hora24) return '';
  const [h, m] = hora24.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return hora24;
  const periodo = h < 12 ? 'a. m.' : 'p. m.';
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${String(m).padStart(2, '0')} ${periodo}`;
}

function crearTarjetaPartido(partido, indice) {
  const local = TORNEO_DATA.equipos[partido.local];
  const visitante = TORNEO_DATA.equipos[partido.visitante];
  const deporte = TORNEO_DATA.deportes[partido.deporte];
  const categoria = TORNEO_DATA.categorias[partido.categoria];
  const genero = TORNEO_DATA.generos[partido.genero];

  const tarjeta = document.createElement('article');
  tarjeta.className = 'match-card reveal';
  tarjeta.style.setProperty('--sport-color', deporte.color);
  tarjeta.style.setProperty('--d', `${Math.min(indice * 0.05, 0.4)}s`);

  // Resultados, fecha y fase se interpretan en bracket.js (acepta partidos con solo "ganador" y sin marcador)
  const T = window.TorneoLlaves || null;
  const resultado = T ? T.resultadoPartido(partido) : null;
  const marcador = T ? T.marcadorTexto(partido) : `${partido.marcadorLocal} – ${partido.marcadorVisitante}`;
  const fechaTexto = T ? T.textoFecha(partido) : partido.fechaTexto;
  const faseTag = T ? T.faseTagHTML(partido) : '';
  const gano = resultado && resultado.jugado && marcador === '—' && resultado.ganador ? ` · Ganó ${resultado.ganador}` : '';

  const centro = partido.estado === 'jugado'
    ? `<span class="match-card__score">${marcador}</span>`
    : '<span class="match-card__vs">VS</span>';

  const horaTexto = formatearHora(partido.hora);

  tarjeta.innerHTML = `
    <div class="match-card__top">
      <span class="match-card__date">${fechaTexto}${horaTexto ? ` · ${horaTexto}` : ''}</span>
      <span class="match-card__sport" title="${deporte.nombre}">${deporte.icono}</span>
    </div>
    <div class="match-card__meta">
      <span class="match-card__category">${categoria.nombre}</span>
      ${genero ? `<span class="match-card__gender">${genero.nombre}</span>` : ''}
      ${faseTag}
      ${partido.lugar ? `<span class="match-card__place">📍 ${partido.lugar}</span>` : ''}
    </div>
    <div class="match-card__teams">
      <div class="match-card__team">
        ${banderaHTML(local, 'match-card__flag')}
        <span class="match-card__code">${partido.local}</span>
      </div>
      ${centro}
      <div class="match-card__team">
        <span class="match-card__code">${partido.visitante}</span>
        ${banderaHTML(visitante, 'match-card__flag')}
      </div>
    </div>
    <div class="match-card__status match-card__status--${partido.estado}">
      ${partido.estado === 'jugado' ? 'Finalizado' : 'Próximo'}${gano}
    </div>
  `;

  return tarjeta;
}

window.formatearHora = formatearHora;