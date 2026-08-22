'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — categories.js
   Genera los tres bloques de categoría a partir de TORNEO_DATA (data.js) y
   controla sus pestañas internas: Calendario, Tabla, Llaves, Galería,
   Estadísticas. Las dos primeras ya funcionan con los datos reales; las
   otras tres muestran en qué fase estarán disponibles.

   Cada bloque también tiene un selector Hombres/Mujeres (mismo estilo que
   los filtros de Calendario) que se aplica a las pestañas Calendario,
   Tabla y Galería — así "cada deporte" queda dividido por género dentro
   de cada categoría, sin duplicar toda la interfaz.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCategorias();
});

const TEXTO_PROXIMA_FASE_ESTADISTICAS = 'Las estadísticas se muestran por deporte, no por categoría — consulta la sección "Estadísticas" más abajo.';

function initCategorias() {
  const contenedor = document.getElementById('categoryList');
  if (!contenedor || typeof TORNEO_DATA === 'undefined') return;

  Object.entries(TORNEO_DATA.categorias).forEach(([claveCategoria, categoria]) => {
    contenedor.appendChild(crearBloqueCategoria(claveCategoria, categoria));
  });

  if (typeof window.observeReveal === 'function') {
    window.observeReveal(contenedor);
  }
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
  bloque.className = 'category-block reveal';
  bloque.dataset.categoria = claveCategoria;
  bloque.style.setProperty('--cat-color', categoria.color);

  bloque.innerHTML = `
    <div class="category-block__header">
      <span class="category-block__eyebrow">Categoría</span>
      <h3 class="category-block__title">${categoria.nombre}</h3>
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
      <button class="tab-btn" type="button" data-tab="tabla" role="tab" aria-selected="false">Tabla</button>
      <button class="tab-btn" type="button" data-tab="estadisticas" role="tab" aria-selected="false">Estadísticas</button>
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
  } else if (tab === 'tabla') {
    panel.innerHTML = crearTablasPosiciones(claveCategoria, genero);
  } else if (tab === 'llaves' && typeof window.renderizarLlaveHTML === 'function') {
    panel.innerHTML = window.renderizarLlaveHTML(claveCategoria);
    
    if (typeof window.initCarruseles === 'function') window.initCarruseles(panel);
  } else {
    const texto = tab === 'estadisticas'
      ? TEXTO_PROXIMA_FASE_ESTADISTICAS
      : 'No se pudo cargar esta pestaña.';
    panel.innerHTML = `
      <div class="panel-placeholder panel-content">
        <div class="panel-placeholder__icon">🏆</div>
        <p class="panel-placeholder__text">${texto}</p>
      </div>
    `;
  }

  if (typeof window.observeReveal === 'function') {
    window.observeReveal(panel);
  }
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

function crearTablasPosiciones(claveCategoria, claveGenero) {
  const tablas = Object.entries(TORNEO_DATA.deportes).map(([claveDeporte, deporte]) => {
    const posiciones = calcularPosiciones(claveCategoria, claveDeporte, claveGenero);

    const filas = posiciones.map((equipo) => `
      <tr>
        <td>
          <span class="standings__team">
            ${banderaHTML(equipo.equipo, 'standings__flag')}
            <span>${equipo.codigo}</span>
          </span>
        </td>
        <td>${equipo.pj}</td>
        <td>${equipo.g}</td>
        <td>${equipo.e}</td>
        <td>${equipo.p}</td>
        <td class="standings__pts">${equipo.pts}</td>
      </tr>
    `).join('');

    return `
      <div class="standings">
        <p class="standings__title">${deporte.icono} ${deporte.nombre}</p>
        <div class="standings__scroll">
          <table>
            <thead>
              <tr><th>Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>Pts</th></tr>
            </thead>
            <tbody>${filas}</tbody>
          </table>
        </div>
      </div>
    `;
  }).join('');

  return `<div class="standings-group panel-content">${tablas}</div>`;
}

/**
 * Calcula PJ/G/E/P/Pts por equipo para una categoría + deporte + género,
 * contando solo partidos con estado "jugado". 3 puntos por victoria, 1 por
 * empate.
 */
function calcularPosiciones(claveCategoria, claveDeporte, claveGenero) {
  const tabla = {};

  Object.entries(TORNEO_DATA.equipos)
    .filter(([, equipo]) => equipo.categoria === claveCategoria)
    .forEach(([codigo, equipo]) => {
      tabla[codigo] = { codigo, equipo, pj: 0, g: 0, e: 0, p: 0, pts: 0 };
    });

  TORNEO_DATA.partidos
    .filter((partido) => partido.categoria === claveCategoria && partido.deporte === claveDeporte && partido.genero === claveGenero && partido.estado === 'jugado')
    .forEach((partido) => {
      const local = tabla[partido.local];
      const visitante = tabla[partido.visitante];
      if (!local || !visitante) return;

      local.pj += 1;
      visitante.pj += 1;

      if (partido.marcadorLocal > partido.marcadorVisitante) {
        local.g += 1;
        local.pts += 3;
        visitante.p += 1;
      } else if (partido.marcadorLocal < partido.marcadorVisitante) {
        visitante.g += 1;
        visitante.pts += 3;
        local.p += 1;
      } else {
        local.e += 1;
        local.pts += 1;
        visitante.e += 1;
        visitante.pts += 1;
      }
    });

  return Object.values(tabla).sort((a, b) => b.pts - a.pts || b.g - a.g);
}
