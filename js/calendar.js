'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — calendar.js
   Renderiza las tarjetas de partido a partir de TORNEO_DATA (data.js) y
   controla los filtros por deporte, categoría y género. No contiene datos:
   para actualizar el calendario, edita únicamente js/data.js.
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
      // Los partidos de llave sin fecha ni equipos definidos todavía no se listan.
      const visible = typeof window.partidoVisibleEnCalendario !== 'function' || window.partidoVisibleEnCalendario(partido);
      return coincideDeporte && coincideCategoria && coincideGenero && visible;
    })
    // Los que aún no tienen fecha ("Fecha por definir") van al final.
    .sort((a, b) => (a.fecha || '9999-99-99').localeCompare(b.fecha || '9999-99-99') || (a.hora || '').localeCompare(b.hora || ''));

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

  const centro = partido.estado === 'jugado'
    ? `<span class="match-card__score">${typeof window.textoMarcador === 'function' ? window.textoMarcador(partido) : `${partido.marcadorLocal} – ${partido.marcadorVisitante}`}</span>`
    : '<span class="match-card__vs">VS</span>';

  const horaTexto = formatearHora(partido.hora);
  const fase = typeof window.etiquetaFase === 'function' ? window.etiquetaFase(partido) : '';
  const codigoLocal = partido.local || 'Por definir';
  const codigoVisitante = partido.visitante || 'Por definir';

  tarjeta.innerHTML = `
    <div class="match-card__top">
      <span class="match-card__date">${partido.fechaTexto || 'Fecha por definir'}${horaTexto ? ` · ${horaTexto}` : ''}</span>
      <span class="match-card__sport" title="${deporte.nombre}">${deporte.icono}</span>
    </div>
    <div class="match-card__meta">
      <span class="match-card__category">${categoria.nombre}</span>
      ${fase ? `<span class="match-card__gender">${fase}</span>` : ''}
      ${genero ? `<span class="match-card__gender">${genero.nombre}</span>` : ''}
      ${partido.lugar ? `<span class="match-card__place">📍 ${partido.lugar}</span>` : ''}
    </div>
    <div class="match-card__teams">
      <div class="match-card__team">
        ${banderaHTML(local, 'match-card__flag')}
        <span class="match-card__code">${codigoLocal}</span>
      </div>
      ${centro}
      <div class="match-card__team">
        <span class="match-card__code">${codigoVisitante}</span>
        ${banderaHTML(visitante, 'match-card__flag')}
      </div>
    </div>
    <div class="match-card__status match-card__status--${partido.estado}">
      ${partido.estado === 'jugado' ? 'Finalizado' : 'Próximo'}
    </div>
  `;

  return tarjeta;
}

window.formatearHora = formatearHora;