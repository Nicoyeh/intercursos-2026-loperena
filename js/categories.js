'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — categories.js
   Genera los bloques de categoría a partir de TORNEO_DATA (data.js) y
   controla sus pestañas internas.

   Hay dos modos, según categorias[...].llaves en data.js:

   · llaves: true  (Infantil y Prejuvenil, en fases eliminatorias)
       Tres pestañas: Hombres | Mujeres | Llaves.
       - Hombres / Mujeres: los partidos de ese género, separados por deporte
         (fútbol, baloncesto, voleibol) y con su fase.
       - Llaves: las 6 llaves de la categoría en una sola vista (bloque
         Hombres y bloque Mujeres, cada uno con los 3 deportes). Las dibuja
         bracket.js desde los mismos partidos de data.js.

   · llaves: false (Juvenil, todavía en fase de grupos)
       Selector Hombres/Mujeres + pestañas Calendario y Tabla (igual que antes).
       Para pasar Juvenil a llaves basta con poner llaves: true en data.js.
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

  if (typeof window.observeReveal === 'function') {
    window.observeReveal(contenedor);
  }
}

/** Utilidades de resultados y fases (bracket.js). Si no cargó, la página sigue funcionando con lo básico. */
function utilidadesLlaves() {
  return window.TorneoLlaves || null;
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

  const clavesGenero = Object.keys(TORNEO_DATA.generos);
  const usaLlaves = Boolean(categoria.llaves) && Boolean(utilidadesLlaves());

  // Pestañas principales según el modo de la categoría
  let controles;
  if (usaLlaves) {
    const tabsGenero = clavesGenero.map((claveGenero, i) => `
      <button class="tab-btn${i === 0 ? ' is-active' : ''}" type="button" data-tab="${claveGenero}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}">${TORNEO_DATA.generos[claveGenero].nombre}</button>
    `).join('');

    controles = `
    <div class="category-block__tabs" role="tablist" aria-label="Secciones de ${categoria.nombre}">
      ${tabsGenero}
      <button class="tab-btn" type="button" data-tab="llaves" role="tab" aria-selected="false">Llaves</button>
    </div>
    `;
  } else {
    const chipsGenero = Object.entries(TORNEO_DATA.generos).map(([claveGenero, genero], i) => `
    <button class="filter-pill${i === 0 ? ' is-active' : ''}" type="button" data-genero="${claveGenero}">${genero.nombre}</button>
  `).join('');

    controles = `
    <div class="category-block__gender filter-group" role="group" aria-label="Elegir género de ${categoria.nombre}">
      ${chipsGenero}
    </div>

    <div class="category-block__tabs" role="tablist" aria-label="Secciones de ${categoria.nombre}">
      <button class="tab-btn is-active" type="button" data-tab="calendario" role="tab" aria-selected="true">Calendario</button>
      <button class="tab-btn" type="button" data-tab="tabla" role="tab" aria-selected="false">Tabla</button>
    </div>
    `;
  }

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
${controles}
    <div class="category-block__panel" data-panel role="tabpanel"></div>
  `;

  const panel = bloque.querySelector('[data-panel]');
  const botonesTab = bloque.querySelectorAll('.tab-btn');
  const botonesGenero = bloque.querySelectorAll('[data-genero]');

  const estadoLocal = {
    tab: usaLlaves ? clavesGenero[0] : 'calendario',
    genero: clavesGenero[0]
  };

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
  const T = utilidadesLlaves();

  if (TORNEO_DATA.generos[tab]) {
    // Pestañas Hombres / Mujeres (categorías con llaves): partidos de ese género, por deporte
    panel.innerHTML = crearSeccionesPorDeporte(claveCategoria, tab);
  } else if (tab === 'llaves' && T) {
    panel.innerHTML = T.renderCategoriaHTML(claveCategoria);
  } else if (tab === 'calendario') {
    panel.innerHTML = crearListaPartidos(claveCategoria, genero);
  } else if (tab === 'tabla') {
    panel.innerHTML = crearTablasPosiciones(claveCategoria, genero);
  } else {
    panel.innerHTML = `
      <div class="panel-placeholder panel-content">
        <p class="panel-placeholder__text">No se pudo cargar esta pestaña.</p>
      </div>
    `;
  }

  if (typeof window.observeReveal === 'function') {
    window.observeReveal(panel);
  }
}

/** Orden de los partidos: fecha (sin fecha al final) → hora → fase. */
function compararPartidos(a, b) {
  const T = utilidadesLlaves();
  if (T) return T.compararPartidos(a, b);
  return (a.fecha || '9999-99-99').localeCompare(b.fecha || '9999-99-99') || (a.hora || '').localeCompare(b.hora || '');
}

/** Una fila de partido (la misma en Calendario/Tabla de Juvenil y en las pestañas Hombres/Mujeres). */
function filaPartidoHTML(partido) {
  const T = utilidadesLlaves();
  const formatearHora = typeof window.formatearHora === 'function' ? window.formatearHora : (h) => h || '';

  const local = TORNEO_DATA.equipos[partido.local];
  const visitante = TORNEO_DATA.equipos[partido.visitante];
  const deporte = TORNEO_DATA.deportes[partido.deporte];

  const resultado = T ? T.resultadoPartido(partido) : null;
  const centro = T
    ? T.marcadorTexto(partido)
    : (partido.estado === 'jugado' ? `${partido.marcadorLocal} – ${partido.marcadorVisitante}` : 'VS');
  const fechaTexto = T ? T.textoFecha(partido) : partido.fechaTexto;
  const horaTexto = formatearHora(partido.hora);
  const faseTag = T ? T.faseTagHTML(partido) : '';
  // Partido jugado del que solo se conoce el ganador (sin marcador)
  const gano = resultado && resultado.jugado && centro === '—' && resultado.ganador ? `Ganó ${resultado.ganador}` : '';

  return `
      <div class="match-row">
        <span class="match-row__date">${fechaTexto}</span>
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
        ${faseTag || horaTexto || partido.lugar || gano ? `
          <div class="match-row__meta">
            ${faseTag}
            ${horaTexto ? `<span>🕒 ${horaTexto}</span>` : ''}
            ${partido.lugar ? `<span>📍 ${partido.lugar}</span>` : ''}
            ${gano ? `<span>🏅 ${gano}</span>` : ''}
          </div>
        ` : ''}
      </div>
    `;
}

/** Calendario de una categoría + género (categorías sin llaves, p. ej. Juvenil). */
function crearListaPartidos(claveCategoria, claveGenero) {
  const partidos = TORNEO_DATA.partidos
    .filter((partido) => partido.categoria === claveCategoria && partido.genero === claveGenero)
    .sort(compararPartidos);

  if (!partidos.length) {
    return '<p class="calendar__vacio panel-content">Todavía no hay partidos programados.</p>';
  }

  return `<div class="match-row-list panel-content">${partidos.map(filaPartidoHTML).join('')}</div>`;
}

/** Pestañas Hombres / Mujeres: los partidos de ese género, un bloque por deporte. */
function crearSeccionesPorDeporte(claveCategoria, claveGenero) {
  const secciones = Object.entries(TORNEO_DATA.deportes).map(([claveDeporte, deporte]) => {
    const partidos = TORNEO_DATA.partidos
      .filter((partido) => partido.categoria === claveCategoria && partido.genero === claveGenero && partido.deporte === claveDeporte)
      .sort(compararPartidos);

    const contenido = partidos.length
      ? `<div class="match-row-list">${partidos.map(filaPartidoHTML).join('')}</div>`
      : '<p class="sport-block__vacio">Todavía no hay partidos programados.</p>';

    return `
      <section class="sport-block" data-deporte="${claveDeporte}" style="--sport-color:${deporte.color}">
        <h4 class="sport-block__title"><span aria-hidden="true">${deporte.icono}</span> ${deporte.nombre}</h4>
        ${contenido}
      </section>
    `;
  }).join('');

  return `<div class="sport-blocks panel-content">${secciones}</div>`;
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

/** Quién ganó / si empataron, tomando en cuenta partidos con solo "ganador" y sin marcador. */
function resultadoParaTabla(partido) {
  const T = utilidadesLlaves();
  if (T) {
    const r = T.resultadoPartido(partido);
    return { ganador: r.ganador, empate: r.empate };
  }
  if (partido.marcadorLocal > partido.marcadorVisitante) return { ganador: partido.local, empate: false };
  if (partido.marcadorLocal < partido.marcadorVisitante) return { ganador: partido.visitante, empate: false };
  return { ganador: null, empate: true };
}

/**
 * Calcula PJ/G/E/P/Pts por equipo para una categoría + deporte + género,
 * contando solo partidos con estado "jugado". 3 puntos por victoria, 1 por
 * empate. Los equipos de TORNEO_DATA.eliminados para esa combinación exacta
 * no aparecen como fila.
 */
function calcularPosiciones(claveCategoria, claveDeporte, claveGenero) {
  const tabla = {};
  const desclasificados = (TORNEO_DATA.eliminados
    && TORNEO_DATA.eliminados[claveCategoria]
    && TORNEO_DATA.eliminados[claveCategoria][claveDeporte]
    && TORNEO_DATA.eliminados[claveCategoria][claveDeporte][claveGenero]) || [];

  Object.entries(TORNEO_DATA.equipos)
    .filter(([codigo, equipo]) => equipo.categoria === claveCategoria && !desclasificados.includes(codigo))
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

      const { ganador, empate } = resultadoParaTabla(partido);

      if (ganador === partido.local) {
        local.g += 1;
        local.pts += 3;
        visitante.p += 1;
      } else if (ganador === partido.visitante) {
        visitante.g += 1;
        visitante.pts += 3;
        local.p += 1;
      } else if (empate) {
        local.e += 1;
        local.pts += 1;
        visitante.e += 1;
        visitante.pts += 1;
      }
    });

  return Object.values(tabla).sort((a, b) => b.pts - a.pts || b.g - a.g);
}