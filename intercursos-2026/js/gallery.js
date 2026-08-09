'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — gallery.js
   Galería separada por deporte, con un carrusel propio para cada partido ya
   jugado. Mientras TORNEO_DATA.galeria no tenga fotos reales para un
   partido, su carrusel muestra marcadores de posición — funcional de
   verdad (flechas, puntos, arrastre, teclado), listo para recibir fotos en
   cuanto se suban.

   window.renderizarGaleriaFiltradaHTML() y window.initCarruseles() se
   exponen para que categories.js arme también la galería de cada categoría
   en su propia pestaña "Galería".
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGaleria();
});

function initGaleria() {
  const grid = document.getElementById('galleryGrid');
  if (!grid || typeof TORNEO_DATA === 'undefined') return;

  const botones = document.querySelectorAll('[data-galeria-deporte]');

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      if (boton.classList.contains('is-active')) return;
      botones.forEach((b) => b.classList.toggle('is-active', b === boton));
      pintarGaleria(grid, boton.dataset.galeriaDeporte);
    });
  });

  pintarGaleria(grid, 'futbol');
}

function pintarGaleria(grid, claveDeporte) {
  const deporte = TORNEO_DATA.deportes[claveDeporte];
  const textoVacio = `Todavía no se ha jugado ningún partido de ${deporte.nombre.toLowerCase()} — la galería aparecerá aquí en cuanto haya resultados.`;

  grid.innerHTML = renderizarGaleriaFiltradaHTML((p) => p.deporte === claveDeporte, textoVacio, deporte.icono);
  initCarruseles(grid);

  if (typeof window.observeReveal === 'function') {
    window.observeReveal(grid);
  }
}

/**
 * Devuelve el HTML de una galería filtrada por cualquier criterio (por
 * deporte, por categoría, etc.) — reutilizable desde otras fases.
 */
function renderizarGaleriaFiltradaHTML(filtro, textoVacio, iconoVacio) {
  const partidosJugados = TORNEO_DATA.partidos
    .filter((p) => p.estado === 'jugado' && filtro(p))
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  if (!partidosJugados.length) {
    return `
      <div class="panel-placeholder panel-content">
        <div class="panel-placeholder__icon">${iconoVacio || '📷'}</div>
        <p class="panel-placeholder__text">${textoVacio || 'Todavía no hay fotos para mostrar aquí.'}</p>
      </div>
    `;
  }

  const tarjetas = partidosJugados.map((partido, indice) => crearTarjetaGaleriaHTML(partido, indice)).join('');
  return `<div class="gallery-grid">${tarjetas}</div>`;
}

function crearTarjetaGaleriaHTML(partido, indice) {
  const local = TORNEO_DATA.equipos[partido.local];
  const visitante = TORNEO_DATA.equipos[partido.visitante];
  const deporte = TORNEO_DATA.deportes[partido.deporte];
  const categoria = TORNEO_DATA.categorias[partido.categoria];

  const entradaGaleria = TORNEO_DATA.galeria && TORNEO_DATA.galeria[partido.id];
  const fotos = entradaGaleria && entradaGaleria.fotos && entradaGaleria.fotos.length
    ? entradaGaleria.fotos
    : [{ tipo: 'placeholder' }, { tipo: 'placeholder' }, { tipo: 'placeholder' }];

  return `
    <article class="gallery-card reveal panel-content" style="--sport-color:${deporte.color}; --d:${Math.min(indice * 0.05, 0.4)}s">
      <div class="carousel" data-carousel>
        <div class="carousel__track" data-track>${fotos.map(crearSlideHTML).join('')}</div>
        <button class="carousel__nav carousel__nav--prev" type="button" data-prev aria-label="Foto anterior">‹</button>
        <button class="carousel__nav carousel__nav--next" type="button" data-next aria-label="Foto siguiente">›</button>
        <div class="carousel__dots" data-dots></div>
      </div>
      <div class="gallery-card__header">
        <span class="gallery-card__date">${partido.fechaTexto}</span>
        <span class="gallery-card__teams">
          ${banderaHTML(local, 'gallery-card__flag')} ${partido.local}
          <span class="gallery-card__score">${partido.marcadorLocal}–${partido.marcadorVisitante}</span>
          ${partido.visitante} ${banderaHTML(visitante, 'gallery-card__flag')}
        </span>
        <span class="gallery-card__category">${categoria.nombre}</span>
      </div>
    </article>
  `;
}

function crearSlideHTML(foto) {
  if (foto.tipo === 'foto') {
    return `<div class="carousel__slide"><img src="${foto.src}" alt="${foto.alt || ''}" loading="lazy"></div>`;
  }
  return `
    <div class="carousel__slide carousel__slide--placeholder">
      <span class="carousel__placeholder-icon" aria-hidden="true">📷</span>
      <p class="carousel__placeholder-text">Foto pendiente de subir</p>
    </div>
  `;
}

/** Activa flechas, puntos, arrastre y flechas de teclado para cada carrusel dentro de "raiz". */
function initCarruseles(raiz) {
  raiz.querySelectorAll('[data-carousel]').forEach((carrusel) => {
    const track = carrusel.querySelector('[data-track]');
    const slides = carrusel.querySelectorAll('.carousel__slide');
    const dotsContenedor = carrusel.querySelector('[data-dots]');
    const botonPrev = carrusel.querySelector('[data-prev]');
    const botonNext = carrusel.querySelector('[data-next]');
    let indice = 0;

    if (slides.length <= 1) {
      botonPrev.style.display = 'none';
      botonNext.style.display = 'none';
      dotsContenedor.style.display = 'none';
      return;
    }

    slides.forEach((_, i) => {
      const punto = document.createElement('button');
      punto.type = 'button';
      punto.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
      punto.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
      punto.addEventListener('click', () => ir(i));
      dotsContenedor.appendChild(punto);
    });
    const puntos = dotsContenedor.querySelectorAll('.carousel__dot');

    function ir(nuevoIndice) {
      indice = (nuevoIndice + slides.length) % slides.length;
      track.style.transform = `translateX(-${indice * 100}%)`;
      puntos.forEach((p, i) => p.classList.toggle('is-active', i === indice));
    }

    botonPrev.addEventListener('click', () => ir(indice - 1));
    botonNext.addEventListener('click', () => ir(indice + 1));

    carrusel.addEventListener('keydown', (evento) => {
      if (evento.key === 'ArrowLeft') ir(indice - 1);
      if (evento.key === 'ArrowRight') ir(indice + 1);
    });

    // Deslizar con el dedo o el mouse
    let inicioX = null;
    track.addEventListener('pointerdown', (evento) => { inicioX = evento.clientX; });
    track.addEventListener('pointerup', (evento) => {
      if (inicioX === null) return;
      const delta = evento.clientX - inicioX;
      if (Math.abs(delta) > 40) ir(delta > 0 ? indice - 1 : indice + 1);
      inicioX = null;
    });
  });
}

window.renderizarGaleriaFiltradaHTML = renderizarGaleriaFiltradaHTML;
window.initCarruseles = initCarruseles;
window.crearSlideHTML = crearSlideHTML;
