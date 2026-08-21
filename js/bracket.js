'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — bracket.js

   Estructura:
   Categoría → Deporte → Llave

   Ejemplo:
   TORNEO_DATA.llaves.infantil.futbol
   TORNEO_DATA.llaves.infantil.baloncesto
   TORNEO_DATA.llaves.infantil.voleibol
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLlaves();
});


let categoriaActual = 'infantil';
let deporteActual = 'futbol';


function initLlaves() {

  const contenedor = document.getElementById('bracketContainer');

  if (!contenedor || typeof TORNEO_DATA === 'undefined') return;


  /* =========================
     BOTONES DE CATEGORÍA
     ========================= */

  const botonesCategoria =
    document.querySelectorAll('[data-bracket-categoria]');


  botonesCategoria.forEach((boton) => {

    boton.addEventListener('click', () => {

      categoriaActual = boton.dataset.bracketCategoria;

      botonesCategoria.forEach((b) => {
        b.classList.toggle(
          'is-active',
          b === boton
        );
      });

      renderizarLlaveActual();
    });

  });


  /* =========================
     BOTONES DE DEPORTE
     ========================= */

  const botonesDeporte =
    document.querySelectorAll('[data-bracket-deporte]');


  botonesDeporte.forEach((boton) => {

    boton.addEventListener('click', () => {

      deporteActual = boton.dataset.bracketDeporte;

      botonesDeporte.forEach((b) => {
        b.classList.toggle(
          'is-active',
          b === boton
        );
      });

      renderizarLlaveActual();
    });

  });


  /* =========================
     LLAVE INICIAL
     ========================= */

  renderizarLlaveActual();

}


/* ==========================================================================
   RENDERIZAR LA LLAVE ACTUAL
   ========================================================================== */

function renderizarLlaveActual() {

  const contenedor =
    document.getElementById('bracketContainer');

  if (!contenedor) return;


  const llave =
    TORNEO_DATA.llaves?.[categoriaActual]?.[deporteActual];


  if (!llave) {

    contenedor.innerHTML = `
      <p class="calendar__vacio panel-content">
        Las llaves de esta categoría y deporte
        todavía no están definidas.
      </p>
    `;

    return;
  }


  contenedor.innerHTML =
    renderizarLlaveHTML(categoriaActual, deporteActual);


  if (typeof window.observeReveal === 'function') {
    window.observeReveal(contenedor);
  }

}


/* ==========================================================================
   GANADOR
   ========================================================================== */

function calcularGanador(partido) {

  if (partido.ganador) {
    return partido.ganador;
  }

  if (partido.descanso) {
    return partido.local;
  }

  return null;
}


/* ==========================================================================
   CONSTRUIR RONDAS
   ========================================================================== */

function construirRondas(llave) {

  const rondasPorIndice =
    llave.rondas.map((_, indiceRonda) =>
      llave.partidos.filter(
        (p) => p.ronda === indiceRonda
      )
    );


  rondasPorIndice.forEach(
    (partidosRonda, indiceRonda) => {

      /* Primera ronda */

      if (indiceRonda === 0) {

        partidosRonda.forEach((partido) => {

          partido._local =
            partido.local;

          partido._visitante =
            partido.visitante;

        });

        return;
      }


      /* Rondas siguientes */

      const rondaAnterior =
        rondasPorIndice[indiceRonda - 1];


      partidosRonda.forEach((partido, i) => {

        const feederA =
          rondaAnterior[i * 2];

        const feederB =
          rondaAnterior[i * 2 + 1];


        partido._local =
          feederA
            ? calcularGanador(feederA)
            : null;


        partido._visitante =
          feederB
            ? calcularGanador(feederB)
            : null;

      });

    }
  );


  return rondasPorIndice;
}


/* ==========================================================================
   PARTIDO
   ========================================================================== */

function renderizarPartidoLlave(partido) {

  const ganador =
    calcularGanador(partido);


  const filaEquipo =
    (codigo, esDescanso) => {

      if (!codigo) {

        return `
          <div class="bracket-match__team bracket-match__team--tbd">
            <span class="bracket-match__name">
              ${esDescanso ? 'Descanso' : 'Por definir'}
            </span>
          </div>
        `;

      }


      const equipo =
        TORNEO_DATA.equipos[codigo];


      const esGanador =
        ganador === codigo;


      const hayMarcador =
        partido.marcadorLocal !== null &&
        partido.marcadorVisitante !== null &&
        partido.marcadorLocal !== undefined &&
        partido.marcadorVisitante !== undefined;


      const marcador =
        hayMarcador
          ? `
            <span class="bracket-match__score">
              ${
                codigo === partido._local
                  ? partido.marcadorLocal
                  : partido.marcadorVisitante
              }
            </span>
          `
          : '';


      return `
        <div class="bracket-match ${
          esGanador
            ? 'bracket-match--ganador'
            : ''
        }">

          <div class="bracket-match__team ${
            esGanador
              ? 'bracket-match__team--ganador'
              : ''
          }">

            <span class="bracket-match__name">
              ${
                equipo
                  ? banderaHTML(
                      equipo,
                      'bracket-match__flag'
                    )
                  : ''
              }

              ${codigo}
            </span>

            ${marcador}

          </div>

        </div>
      `;

    };


  return `
    <div class="bracket-match">

      ${filaEquipo(
        partido._local,
        false
      )}

      <div class="bracket-match__divider"></div>

      ${filaEquipo(
        partido._visitante,
        !!partido.descanso
      )}

    </div>
  `;

}


/* ==========================================================================
   RENDERIZAR LLAVE
   ========================================================================== */

function renderizarLlaveHTML(
  claveCategoria,
  claveDeporte
) {

  const llave =
    TORNEO_DATA
      .llaves?.[claveCategoria]?.[claveDeporte];


  if (!llave) {

    return `
      <p class="calendar__vacio panel-content">
        Las llaves de esta categoría y deporte
        todavía no están definidas.
      </p>
    `;

  }


  const rondas =
    construirRondas(llave);


  const columnas =
    rondas.map(
      (partidosRonda, indiceRonda) => {

        const nombreRonda =
          llave.rondas[indiceRonda];


        if (partidosRonda.length === 1) {

          return `
            <div class="bracket__round">

              <p class="bracket__round-title">
                ${nombreRonda}
              </p>

              ${renderizarPartidoLlave(
                partidosRonda[0]
              )}

            </div>
          `;

        }


        const pares = [];


        for (
          let i = 0;
          i < partidosRonda.length;
          i += 2
        ) {

          pares.push([
            partidosRonda[i],
            partidosRonda[i + 1]
          ]);

        }


        return `
          <div class="bracket__round">

            <p class="bracket__round-title">
              ${nombreRonda}
            </p>

            ${pares.map(([a, b]) => `

              <div class="bracket__pair">

                ${
                  a
                    ? renderizarPartidoLlave(a)
                    : ''
                }

                ${
                  b
                    ? renderizarPartidoLlave(b)
                    : ''
                }

              </div>

            `).join('')}

          </div>
        `;

      }
    ).join('');


  /* =========================
     CAMPEÓN
     ========================= */

  const ultimaRonda =
    rondas[rondas.length - 1];


  const partidoFinal =
    ultimaRonda
      ? ultimaRonda[0]
      : null;


  const campeon =
    partidoFinal
      ? calcularGanador(partidoFinal)
      : null;


  const equipoCampeon =
    campeon
      ? TORNEO_DATA.equipos[campeon]
      : null;


  const columnaCampeon = `

    <div class="bracket__round bracket__round--campeon">

      <p class="bracket__round-title">
        Campeón
      </p>

      <div class="bracket__champion">

        <span
          class="bracket__champion-icon"
          aria-hidden="true"
        >
          🏆
        </span>

        <span class="bracket__champion-team">

          ${
            equipoCampeon
              ? `
                ${banderaHTML(
                  equipoCampeon,
                  'bracket-match__flag'
                )}

                ${campeon}
              `
              : 'Por definir'
          }

        </span>

      </div>

    </div>

  `;


  return `

    <div class="bracket-wrap panel-content">

      <div class="bracket">

        ${columnas}

        ${columnaCampeon}

      </div>

    </div>

  `;

}


window.renderizarLlaveHTML =
  renderizarLlaveHTML;