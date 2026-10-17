'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — categories.js
   Genera los bloques de categoría a partir de TORNEO_DATA (data.js) y
   controla sus pestañas internas: Calendario y Llaves.

   Cada bloque también tiene un selector Hombres/Mujeres (mismo estilo que
   los filtros de Calendario) que se aplica a las pestañas Calendario
   y Llaves — así "cada deporte" queda dividido por género dentro
   de cada categoría, sin duplicar toda la interfaz.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCategorias();
});

function initCategorias() {
  const contenedor = document.getElementById('categoryList');
  if (!contenedor || typeof TORNEO_DATA === 'undefined') return;

  Object.entries(TORNEO_DATA.categorias).forEach(([claveCategoria, categoria]) => {
    contenedor.appendChild(crearBloqueCategoria(claveCategoria, categoria));
  });

  //if (typeof window.observeReveal === 'function') {
   // window.observeReveal(contenedor);
 // }
}

function crearBloqueCategoria(claveCategoria, categoria) {
  const equiposCategoria = Object.entries(TORNEO_DATA.equipos)
    .filter(([, equipo]) => equipo.categoria === claveCategoria);

  const chipsEquipos = equiposCategoria.map(([codigo, equipo]) => `
    <span class="team-chip">
      ${banderaHTML(equipo, 'team-chip__flag')}
      <span class="team-chip__code">${codigo}</span>
    </span>
  `).join('');

  const chipsGenero = Object.entries(TORNEO_DATA.generos).map(([claveGenero, genero], i) => `
    <button class="filter-pill${i === 0 ? ' is-active' : ''}" type="button" data-genero="${claveGenero}">${genero.nombre}</button>
  `).join('');

  // Categorías con "pestanas" en data.js (Juvenil): Hombres | Mujeres | Llaves.
  // Las demás conservan el selector de género + pestañas Calendario | Llaves.
  const pestanasPropias = Array.isArray(categoria.pestanas) ? categoria.pestanas : null;
  const etiquetasTab = { llaves: 'Llaves', calendario: 'Calendario' };
  Object.entries(TORNEO_DATA.generos).forEach(([clave, genero]) => { etiquetasTab[clave] = genero.nombre; });
  const listaTabs = pestanasPropias || ['calendario', 'llaves'];
  const botonesTabs = listaTabs.map((tab, i) => `
      <button class="tab-btn${i === 0 ? ' is-active' : ''}" type="button" data-tab="${tab}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}">${etiquetasTab[tab] || tab}</button>`).join('');

  const bloque = document.createElement('article');
  bloque.className = 'category-block';
  bloque.dataset.categoria = claveCategoria;
  bloque.style.setProperty('--cat-color', categoria.color);

  bloque.innerHTML = `
    <div class="category-block__header">
      <span class="category-block__eyebrow">Categoría</span>
<h3 class="category-block__title">
  ${categoria.nombre}
${categoria.llaves ? '<span class="category-stage">Semifinales</span>' : ''}
</h3>
      <p class="category-block__meta">${equiposCategoria.length} selecciones en competencia</p>
    </div>

    <div class="category-block__roster" aria-label="Equipos de la categoría ${categoria.nombre}">
      ${chipsEquipos}
    </div>

    ${pestanasPropias ? '' : `<div class="category-block__gender filter-group" role="group" aria-label="Elegir género de ${categoria.nombre}">
      ${chipsGenero}
    </div>`}

    <div class="category-block__tabs" role="tablist" aria-label="Secciones de ${categoria.nombre}">
      ${botonesTabs}
    </div>

    <div class="category-block__panel" data-panel role="tabpanel"></div>
  `;

  const panel = bloque.querySelector('[data-panel]');
  const botonesTab = bloque.querySelectorAll('.tab-btn');
  const botonesGenero = bloque.querySelectorAll('[data-genero]');

  const estadoLocal = { tab: listaTabs[0], genero: Object.keys(TORNEO_DATA.generos)[0] };

  botonesTab.forEach((boton) => {
    boton.addEventListener('click', () => {
      if (boton.classList.contains('is-active')) return;
      botonesTab.forEach((b) => {
        const activo = b === boton;
        b.classList.toggle('is-active', activo);
        b.setAttribute('aria-selected', activo ? 'true' : 'false');
      });
      estadoLocal.tab = boton.dataset.tab;
      renderizarPanel(claveCategoria, estadoLocal, panel);
    });
  });

  botonesGenero.forEach((boton) => {
    boton.addEventListener('click', () => {
      if (boton.classList.contains('is-active')) return;
      botonesGenero.forEach((b) => b.classList.toggle('is-active', b === boton));
      estadoLocal.genero = boton.dataset.genero;
      renderizarPanel(claveCategoria, estadoLocal, panel);
    });
  });

  renderizarPanel(claveCategoria, estadoLocal, panel);

  return bloque;
}

function renderizarPanel(claveCategoria, estadoLocal, panel) {
  const { tab, genero } = estadoLocal;

  if (tab === 'calendario') {
    panel.innerHTML = crearListaPartidos(claveCategoria, genero);
  } else if (tab === 'llaves' && TORNEO_DATA.categorias[claveCategoria].pestanas
             && typeof window.renderizarLlavesCategoriaHTML === 'function') {
    // Juvenil: las seis llaves juntas (Hombres y Mujeres).
    panel.innerHTML = window.renderizarLlavesCategoriaHTML(claveCategoria);
  } else if (tab === 'llaves' && typeof window.renderizarLlaveHTML === 'function') {
    panel.innerHTML = window.renderizarLlaveHTML(claveCategoria, genero);
  } else if (TORNEO_DATA.generos[tab]) {
    // Pestaña de género (Juvenil): Fútbol, Baloncesto y Voleibol de ese género.
    panel.innerHTML = crearSeccionesPorDeporte(claveCategoria, tab);
  } else {
    panel.innerHTML = `
      <div class="panel-placeholder panel-content">
        <p class="panel-placeholder__text">No se pudo cargar esta pestaña.</p>
      </div>
    `;
  }

  // if (typeof window.observeReveal === 'function') {
  //  window.observeReveal(panel);
 // }
}

/** Partidos de una categoría + género (+ deporte opcional), ya ordenados y sin llaves "vacías". */
function partidosDeCategoria(claveCategoria, claveGenero, claveDeporte) {
  return TORNEO_DATA.partidos
    .filter((partido) => partido.categoria === claveCategoria && partido.genero === claveGenero
      && (!claveDeporte || partido.deporte === claveDeporte)
      && (typeof window.partidoVisibleEnCalendario !== 'function' || window.partidoVisibleEnCalendario(partido)))
    .sort((a, b) => (a.fecha || '9999-99-99').localeCompare(b.fecha || '9999-99-99') || (a.hora || '').localeCompare(b.hora || ''));
}

/** Pestañas Hombres/Mujeres de Juvenil: una sección por deporte con los partidos de ese género. */
function crearSeccionesPorDeporte(claveCategoria, claveGenero) {
  const secciones = Object.entries(TORNEO_DATA.deportes).map(([claveDeporte, deporte]) => `
    <section class="category-sport">
      <p class="standings__title">${deporte.icono} ${deporte.nombre}</p>
      ${crearListaPartidos(claveCategoria, claveGenero, claveDeporte, true)}
    </section>`).join('');
  return `<div class="category-sports panel-content">${secciones}</div>`;
}

function crearListaPartidos(claveCategoria, claveGenero, claveDeporte, sinPanel) {
  const partidos = partidosDeCategoria(claveCategoria, claveGenero, claveDeporte);

  if (!partidos.length) {
    return '<p class="calendar__vacio panel-content">Todavía no hay partidos programados.</p>';
  }

  const formatearHora = typeof window.formatearHora === 'function' ? window.formatearHora : (h) => h || '';

  const filas = partidos.map((partido) => {
    const local = TORNEO_DATA.equipos[partido.local];
    const visitante = TORNEO_DATA.equipos[partido.visitante];
    const deporte = TORNEO_DATA.deportes[partido.deporte];
    const centro = partido.estado === 'jugado'
      ? (typeof window.textoMarcador === 'function' ? window.textoMarcador(partido) : `${partido.marcadorLocal} – ${partido.marcadorVisitante}`)
      : 'VS';
    const horaTexto = formatearHora(partido.hora);
    const fase = typeof window.etiquetaFase === 'function' ? window.etiquetaFase(partido) : '';

    return `
      <div class="match-row">
        <span class="match-row__date">${partido.fechaTexto || 'Fecha por definir'}${fase ? ` · ${fase}` : ''}</span>
        <span class="match-row__sport" title="${deporte.nombre}">${deporte.icono}</span>
        <span class="match-row__team">
          ${banderaHTML(local, 'match-row__flag')}
          <span class="match-row__code">${partido.local || 'Por definir'}</span>
        </span>
        <span class="match-row__center">${centro}</span>
        <span class="match-row__team match-row__team--visitante">
          <span class="match-row__code">${partido.visitante || 'Por definir'}</span>
          ${banderaHTML(visitante, 'match-row__flag')}
        </span>
        ${horaTexto || partido.lugar ? `
          <div class="match-row__meta">
            ${horaTexto ? `<span>🕒 ${horaTexto}</span>` : ''}
            ${partido.lugar ? `<span>📍 ${partido.lugar}</span>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  return `<div class="match-row-list${sinPanel ? '' : ' panel-content'}">${filas}</div>`;
}
