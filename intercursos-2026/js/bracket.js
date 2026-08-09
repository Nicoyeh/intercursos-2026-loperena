'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — bracket.js
   Construye las llaves del torneo a partir de TORNEO_DATA.llaves (data.js).
   Todo en HTML/CSS puro, sin imágenes. Desde la ronda 1 en adelante, los
   equipos se calculan solos a partir del ganador de la ronda anterior:
   para avanzar un equipo, solo hay que agregar "ganador" (y el marcador si
   quieres) a su partido en data.js — nunca se edita a mano la ronda
   siguiente.

   window.renderizarLlaveHTML() se expone para que categories.js también
   la use dentro de la pestaña "Llaves" de cada categoría.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLlaves();
});

function initLlaves() {
  const contenedor = document.getElementById('bracketContainer');
  if (!contenedor || typeof TORNEO_DATA === 'undefined') return;

  const botones = document.querySelectorAll('[data-bracket-categoria]');

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      if (boton.classList.contains('is-active')) return;
      botones.forEach((b) => b.classList.toggle('is-active', b === boton));
      contenedor.innerHTML = renderizarLlaveHTML(boton.dataset.bracketCategoria);
      if (typeof window.observeReveal === 'function') window.observeReveal(contenedor);
    });
  });

  contenedor.innerHTML = renderizarLlaveHTML('infantil');
  if (typeof window.observeReveal === 'function') window.observeReveal(contenedor);
}

/** Devuelve el código del equipo ganador de un partido, o null si no se ha decidido. */
function calcularGanador(partido) {
  if (partido.ganador) return partido.ganador;
  if (partido.descanso) return partido.local; // pase directo
  return null;
}

/**
 * Agrupa los partidos de una llave por ronda y calcula local/visitante de
 * cada ronda a partir de los ganadores de la ronda anterior (excepto la
 * ronda 0, que ya viene explícita en data.js).
 */
function construirRondas(llave) {
  const rondasPorIndice = llave.rondas.map((_, indiceRonda) =>
    llave.partidos.filter((p) => p.ronda === indiceRonda)
  );

  rondasPorIndice.forEach((partidosRonda, indiceRonda) => {
    if (indiceRonda === 0) {
      partidosRonda.forEach((partido) => {
        partido._local = partido.local;
        partido._visitante = partido.visitante;
      });
      return;
    }

    const rondaAnterior = rondasPorIndice[indiceRonda - 1];
    partidosRonda.forEach((partido, i) => {
      const feederA = rondaAnterior[i * 2];
      const feederB = rondaAnterior[i * 2 + 1];
      partido._local = feederA ? calcularGanador(feederA) : null;
      partido._visitante = feederB ? calcularGanador(feederB) : null;
    });
  });

  return rondasPorIndice;
}

function renderizarPartidoLlave(partido) {
  const ganador = calcularGanador(partido);

  const filaEquipo = (codigo, esDescanso) => {
    if (!codigo) {
      return `
        <div class="bracket-match__team bracket-match__team--tbd">
          <span class="bracket-match__name">${esDescanso ? 'Descanso' : 'Por definir'}</span>
        </div>
      `;
    }

    const equipo = TORNEO_DATA.equipos[codigo];
    const esGanador = ganador === codigo;
    const hayMarcador = partido.marcadorLocal !== null && partido.marcadorVisitante !== null && partido.marcadorLocal !== undefined;
    const marcador = hayMarcador
      ? `<span class="bracket-match__score">${codigo === partido._local ? partido.marcadorLocal : partido.marcadorVisitante}</span>`
      : '';

    return `
      <div class="bracket-match__team ${esGanador ? 'bracket-match__team--ganador' : ''}">
        <span class="bracket-match__name">${banderaHTML(equipo, 'bracket-match__flag')} ${codigo}</span>
        ${marcador}
      </div>
    `;
  };

  return `
    <div class="bracket-match">
      ${filaEquipo(partido._local, false)}
      <div class="bracket-match__divider"></div>
      ${filaEquipo(partido._visitante, !!partido.descanso)}
    </div>
  `;
}

function renderizarLlaveHTML(claveCategoria) {
  const llave = TORNEO_DATA.llaves[claveCategoria];
  if (!llave) {
    return '<p class="calendar__vacio panel-content">Las llaves de esta categoría todavía no están definidas.</p>';
  }

  const rondas = construirRondas(llave);

  const columnas = rondas.map((partidosRonda, indiceRonda) => {
    const nombreRonda = llave.rondas[indiceRonda];

    if (partidosRonda.length === 1) {
      return `
        <div class="bracket__round">
          <p class="bracket__round-title">${nombreRonda}</p>
          ${renderizarPartidoLlave(partidosRonda[0])}
        </div>
      `;
    }

    const pares = [];
    for (let i = 0; i < partidosRonda.length; i += 2) {
      pares.push([partidosRonda[i], partidosRonda[i + 1]]);
    }

    return `
      <div class="bracket__round">
        <p class="bracket__round-title">${nombreRonda}</p>
        ${pares.map(([a, b]) => `
          <div class="bracket__pair">
            ${renderizarPartidoLlave(a)}
            ${b ? renderizarPartidoLlave(b) : ''}
          </div>
        `).join('')}
      </div>
    `;
  }).join('');

  const partidoFinal = rondas[rondas.length - 1][0];
  const campeon = calcularGanador(partidoFinal);
  const equipoCampeon = campeon ? TORNEO_DATA.equipos[campeon] : null;

  const columnaCampeon = `
    <div class="bracket__round bracket__round--campeon">
      <p class="bracket__round-title">Campeón</p>
      <div class="bracket__champion">
        <span class="bracket__champion-icon" aria-hidden="true">🏆</span>
        <span class="bracket__champion-team">${equipoCampeon ? `${banderaHTML(equipoCampeon, 'bracket-match__flag')} ${campeon}` : 'Por definir'}</span>
      </div>
    </div>
  `;

  return `<div class="bracket-wrap panel-content"><div class="bracket">${columnas}${columnaCampeon}</div></div>`;
}

window.renderizarLlaveHTML = renderizarLlaveHTML;
