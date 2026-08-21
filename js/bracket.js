'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — bracket.js

   Estructura:

   CATEGORÍA
      ↓
   DEPORTE
      ↓
   GÉNERO
      ↓
   LLAVE
      ↓
   RONDAS
      ↓
   CAMPEÓN

   No se inventan cruces. Todo sale de TORNEO_DATA.llaves.
   ========================================================================== */


document.addEventListener('DOMContentLoaded', () => {
  initLlaves();
});


let categoriaActual = 'infantil';
let deporteActual = 'futbol';
let generoActual = 'hombres';


/* ==========================================================================
   INICIALIZACIÓN
   ========================================================================== */

function initLlaves() {

  const contenedor = document.getElementById('bracketContainer');

  if (!contenedor || typeof TORNEO_DATA === 'undefined') {
    return;
  }


  /* ---------------- CATEGORÍAS ---------------- */

  document
    .querySelectorAll('[data-bracket-categoria]')
    .forEach((boton) => {

      boton.addEventListener('click', () => {

        categoriaActual =
          boton.dataset.bracketCategoria;

        actualizarBotones(
          '[data-bracket-categoria]',
          boton
        );

        renderizarLlaveActual();

      });

    });


  /* ---------------- DEPORTES ---------------- */

  document
    .querySelectorAll('[data-bracket-deporte]')
    .forEach((boton) => {

      boton.addEventListener('click', () => {

        deporteActual =
          boton.dataset.bracketDeporte;

        actualizarBotones(
          '[data-bracket-deporte]',
          boton
        );

        renderizarLlaveActual();

      });

    });


  /* ---------------- GÉNEROS ---------------- */

  document
    .querySelectorAll('[data-bracket-genero]')
    .forEach((boton) => {

      boton.addEventListener('click', () => {

        generoActual =
          boton.dataset.bracketGenero;

        actualizarBotones(
          '[data-bracket-genero]',
          boton
        );

        renderizarLlaveActual();

      });

    });


  renderizarLlaveActual();

}


/* ==========================================================================
   ACTUALIZAR BOTONES
   ========================================================================== */

function actualizarBotones(selector, botonActivo) {

  document
    .querySelectorAll(selector)
    .forEach((boton) => {

      boton.classList.toggle(
        'is-active',
        boton === botonActivo
      );

    });

}


/* ==========================================================================
   OBTENER LLAVE ACTUAL
   ========================================================================== */

function obtenerLlaveActual() {

  return (
    TORNEO_DATA
      .llaves
      ?. [categoriaActual]
      ?. [deporteActual]
      ?. [generoActual]
  );

}


/* ==========================================================================
   RENDERIZAR LLAVE ACTUAL
   ========================================================================== */

function renderizarLlaveActual() {

  const contenedor =
    document.getElementById('bracketContainer');

  if (!contenedor) {
    return;
  }


  const llave = obtenerLlaveActual();


  /* ---------------- LLAVE NO DEFINIDA ---------------- */

  if (!llave || !Array.isArray(llave.partidos) || !llave.partidos.length) {

    const categoria =
      TORNEO_DATA.categorias?.[categoriaActual]?.nombre
      || categoriaActual;

    const deporte =
      TORNEO_DATA.deportes?.[deporteActual]?.nombre
      || deporteActual;

    const genero =
      TORNEO_DATA.generos?.[generoActual]?.nombre
      || generoActual;


    contenedor.innerHTML = `

      <div class="panel-placeholder panel-content">

        <div class="panel-placeholder__icon">
          ${TORNEO_DATA.deportes?.[deporteActual]?.icono || '🏆'}
        </div>

        <p class="panel-placeholder__text">
          La llave de
          <strong>${deporte}</strong>
          ·
          <strong>${categoria}</strong>
          ·
          <strong>${genero}</strong>
          todavía no ha sido definida.
        </p>

      </div>

    `;

    return;
  }


  contenedor.innerHTML =
    renderizarLlaveHTML(
      categoriaActual,
      deporteActual,
      generoActual
    );


  if (typeof window.observeReveal === 'function') {
    window.observeReveal(contenedor);
  }

}


/* ==========================================================================
   CALCULAR GANADOR
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
        (partido) =>
          partido.ronda === indiceRonda
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


      partidosRonda.forEach((partido, indice) => {

        const partidoAnteriorA =
          rondaAnterior[indice * 2];

        const partidoAnteriorB =
          rondaAnterior[indice * 2 + 1];


        partido._local =
          partidoAnteriorA
            ? calcularGanador(partidoAnteriorA)
            : null;


        partido._visitante =
          partidoAnteriorB
            ? calcularGanador(partidoAnteriorB)
            : null;

      });

    }
  );


  return rondasPorIndice;

}


/* ==========================================================================
   RENDERIZAR EQUIPO
   ========================================================================== */

function renderizarEquipo(
  codigo,
  partido,
  esLocal,
  esDescanso
) {

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
    TORNEO_DATA.equipos?.[codigo];


  const ganador =
    calcularGanador(partido);


  const esGanador =
    ganador === codigo;


  let marcador = '';


  const hayMarcador =
    partido.marcadorLocal !== null &&
    partido.marcadorVisitante !== null &&
    partido.marcadorLocal !== undefined &&
    partido.marcadorVisitante !== undefined;


  if (hayMarcador) {

    marcador = `

      <span class="bracket-match__score">
        ${
          esLocal
            ? partido.marcadorLocal
            : partido.marcadorVisitante
        }
      </span>

    `;

  }


  return `

    <div class="
      bracket-match__team
      ${esGanador ? 'bracket-match__team--ganador' : ''}
    ">

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

  `;

}


/* ==========================================================================
   RENDERIZAR PARTIDO
   ========================================================================== */

function renderizarPartidoLlave(partido) {

  return `

    <div class="bracket-match">

      ${renderizarEquipo(
        partido._local,
        partido,
        true,
        false
      )}

      <div class="bracket-match__divider"></div>

      ${renderizarEquipo(
        partido._visitante,
        partido,
        false,
        !!partido.descanso
      )}

    </div>

  `;

}


/* ==========================================================================
   RENDERIZAR LLAVE COMPLETA
   ========================================================================== */

function renderizarLlaveHTML(
  claveCategoria,
  claveDeporte,
  claveGenero
) {

  const llave =
    TORNEO_DATA
      .llaves
      ?. [claveCategoria]
      ?. [claveDeporte]
      ?. [claveGenero];


  if (!llave) {

    return `

      <div class="panel-placeholder panel-content">

        <div class="panel-placeholder__icon">
          🏆
        </div>

        <p class="panel-placeholder__text">
          Esta llave todavía no está definida.
        </p>

      </div>

    `;

  }


  const categoria =
    TORNEO_DATA
      .categorias?.[claveCategoria]?.nombre
      || claveCategoria;


  const deporte =
    TORNEO_DATA
      .deportes?.[claveDeporte]?.nombre
      || claveDeporte;


  const genero =
    TORNEO_DATA
      .generos?.[claveGenero]?.nombre
      || claveGenero;


  const icono =
    TORNEO_DATA
      .deportes?.[claveDeporte]?.icono
      || '🏆';


  /* ---------------- RONDAS ---------------- */

  const rondas =
    construirRondas(llave);


  const columnas =
    rondas
      .map((partidosRonda, indiceRonda) => {

        const nombreRonda =
          llave.rondas[indiceRonda];


        if (!partidosRonda.length) {
          return '';
        }


        /* FINAL */

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


        /* RESTO DE RONDAS */

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

            ${pares
              .map(([a, b]) => `

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

              `)
              .join('')}

          </div>

        `;

      })
      .join('');


  /* ---------------- CAMPEÓN ---------------- */

  const ultimaRonda =
    rondas[rondas.length - 1];


  const partidoFinal =
    ultimaRonda?.[0];


  const campeon =
    partidoFinal
      ? calcularGanador(partidoFinal)
      : null;


  const equipoCampeon =
    campeon
      ? TORNEO_DATA.equipos?.[campeon]
      : null;


  return `

    <div class="bracket-header">

      <div class="bracket-header__icon">
        ${icono}
      </div>

      <div>

        <p class="bracket-header__eyebrow">
          Llave del torneo
        </p>

        <h3 class="bracket-header__title">
          ${deporte} · ${categoria}
        </h3>

        <p class="bracket-header__subtitle">
          ${genero}
        </p>

      </div>

    </div>


    <div class="bracket-wrap panel-content">

      <div class="bracket">

        ${columnas}


        <!-- CAMPEÓN -->

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

      </div>

    </div>

  `;

}


/* ==========================================================================
   HACERLA DISPONIBLE PARA categories.js
   ========================================================================== */

window.renderizarLlaveHTML =
  renderizarLlaveHTML;