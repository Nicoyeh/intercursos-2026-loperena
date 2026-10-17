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

  const bloque = document.createElement('article');
  bloque.className = 'category-block';
  bloque.dataset.categoria = claveCategoria;
  bloque.style.setProperty('--cat-color', categoria.color);

  bloque.innerHTML = `
    <div class="category-block__header">
      <span class="category-block__eyebrow">Categoría</span>
<h3 class="category-block__title">
  ${categoria.nombre}
${['Infantil', 'Prejuvenil'].includes(categoria.nombre) ? '<span class="category-stage">Semifinales</span>' : ''}
</h3>
      <p class="category-block__meta">${equiposCategoria.length} selecciones en competencia</p>
    </div>

    <div class="category-block__roster" aria-label="Equipos de la categoría ${categoria.nombre}">
      ${chipsEquipos}
    </div>

    <div class="category-block__gender filter-group" role="group" aria-label="Elegir género de ${categoria.nombre}">
      ${chipsGenero}
    </div>

    <div class="category-block__tabs" role="tablist" aria-label="Secciones de ${categoria.nombre}">
      <button class="tab-btn is-active" type="button" data-tab="calendario" role="tab" aria-selected="true">Calendario</button>
      <button class="tab-btn" type="button" data-tab="llaves" role="tab" aria-selected="false">Llaves</button>
    </div>

    <div class="category-block__panel" data-panel role="tabpanel"></div>
  `;

  const panel = bloque.querySelector('[data-panel]');
  const botonesTab = bloque.querySelectorAll('.tab-btn');
  const botonesGenero = bloque.querySelectorAll('[data-genero]');

  const estadoLocal = { tab: 'calendario', genero: Object.keys(TORNEO_DATA.generos)[0] };

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
  } else if (tab === 'llaves' && typeof window.renderizarLlaveHTML === 'function') {
    panel.innerHTML = window.renderizarLlaveHTML(claveCategoria, genero);
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

function crearListaPartidos(claveCategoria, claveGenero) {
  const partidos = TORNEO_DATA.partidos
    .filter((partido) => partido.categoria === claveCategoria && partido.genero === claveGenero)
    .sort((a, b) => a.fecha.localeCompare(b.fecha) || (a.hora || '').localeCompare(b.hora || ''));

  if (!partidos.length) {
    return '<p class="calendar__vacio panel-content">Todavía no hay partidos programados.</p>';
  }

  const formatearHora = typeof window.formatearHora === 'function' ? window.formatearHora : (h) => h || '';

  const filas = partidos.map((partido) => {
    const local = TORNEO_DATA.equipos[partido.local];
    const visitante = TORNEO_DATA.equipos[partido.visitante];
    const deporte = TORNEO_DATA.deportes[partido.deporte];
    const centro = partido.estado === 'jugado'
      ? `${partido.marcadorLocal} – ${partido.marcadorVisitante}`
      : 'VS';
    const horaTexto = formatearHora(partido.hora);

    return `
      <div class="match-row">
        <span class="match-row__date">${partido.fechaTexto}</span>
        <span class="match-row__sport" title="${deporte.nombre}">${deporte.icono}</span>
        <span class="match-row__team">
          ${banderaHTML(local, 'match-row__flag')}
          <span class="match-row__code">${partido.local}</span>
        </span>
        <span class="match-row__center">${centro}</span>
        <span class="match-row__team match-row__team--visitante">
          <span class="match-row__code">${partido.visitante}</span>
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

  return `<div class="match-row-list panel-content">${filas}</div>`;
}
