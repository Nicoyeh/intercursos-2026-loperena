'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — highlights.js
   "Lo mejor del día": destaca un partido con un carrusel grande, sin abrir
   otra página. Se elige el partido marcado con "momentoDelDia: true" en
   data.js; si ninguno lo está, se usa automáticamente el jugado más
   reciente. Reutiliza el motor de carrusel de gallery.js.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMomentoDelDia();
});

function initMomentoDelDia() {
  const contenedor = document.getElementById('highlightContainer');
  if (!contenedor || typeof TORNEO_DATA === 'undefined') return;

  const partido = obtenerMomentoDelDia();

  if (!partido) {
    contenedor.innerHTML = `
      <div class="panel-placeholder panel-content">
        <div class="panel-placeholder__icon">🎬</div>
        <p class="panel-placeholder__text">Todavía no hay resultados para destacar — vuelve cuando arranque el torneo.</p>
      </div>
    `;
    return;
  }

  contenedor.innerHTML = crearMomentoDelDiaHTML(partido);

  if (typeof window.initCarruseles === 'function') window.initCarruseles(contenedor);
  if (typeof window.observeReveal === 'function') window.observeReveal(contenedor);
}

/** Devuelve el partido marcado a mano, o el jugado más reciente si ninguno lo está. */
function obtenerMomentoDelDia() {
  const jugados = TORNEO_DATA.partidos.filter((p) => p.estado === 'jugado');
  if (!jugados.length) return null;

  const marcado = jugados.find((p) => p.momentoDelDia);
  if (marcado) return marcado;

  return [...jugados].sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
}

function crearMomentoDelDiaHTML(partido) {
  const local = TORNEO_DATA.equipos[partido.local];
  const visitante = TORNEO_DATA.equipos[partido.visitante];
  const deporte = TORNEO_DATA.deportes[partido.deporte];
  const categoria = TORNEO_DATA.categorias[partido.categoria];

  const tituloResultado = partido.marcadorLocal === partido.marcadorVisitante
    ? `${partido.local} y ${partido.visitante} empatan ${partido.marcadorLocal}-${partido.marcadorVisitante}`
    : partido.marcadorLocal > partido.marcadorVisitante
      ? `${partido.local} vence ${partido.marcadorLocal}-${partido.marcadorVisitante} a ${partido.visitante}`
      : `${partido.visitante} vence ${partido.marcadorVisitante}-${partido.marcadorLocal} a ${partido.local}`;

  const entradaGaleria = TORNEO_DATA.galeria && TORNEO_DATA.galeria[partido.id];
  const fotos = entradaGaleria && entradaGaleria.fotos && entradaGaleria.fotos.length
    ? entradaGaleria.fotos
    : [{ tipo: 'placeholder' }, { tipo: 'placeholder' }, { tipo: 'placeholder' }];

  const crearSlide = typeof window.crearSlideHTML === 'function' ? window.crearSlideHTML : () => '';

  return `
    <div class="highlight reveal" style="--sport-color:${deporte.color}">
      <div class="highlight__header">
        <span class="highlight__badge">
          <span class="highlight__badge-dot" aria-hidden="true"></span>
          Lo mejor del día
        </span>
        <h2 class="highlight__title">
          ${banderaHTML(local, 'highlight__flag')} ${tituloResultado} ${banderaHTML(visitante, 'highlight__flag')}
        </h2>
        <p class="highlight__meta">${partido.fechaTexto} · ${categoria.nombre} · ${deporte.icono} ${deporte.nombre}</p>
      </div>

      <div class="carousel carousel--grande" data-carousel>
        <div class="carousel__track" data-track>${fotos.map(crearSlide).join('')}</div>
        <button class="carousel__nav carousel__nav--prev" type="button" data-prev aria-label="Foto anterior">‹</button>
        <button class="carousel__nav carousel__nav--next" type="button" data-next aria-label="Foto siguiente">›</button>
        <div class="carousel__dots" data-dots></div>
      </div>
    </div>
  `;
}
