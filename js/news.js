'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — news.js
   Sección tipo periódico: la noticia más reciente se muestra destacada y el
   resto en cuadrícula. Todo se genera desde TORNEO_DATA.noticias (data.js)
   — para publicar una noticia nueva, solo se agrega un objeto ahí.

   Mientras TORNEO_DATA.mostrarNoticias sea false, las noticias de ejemplo
   se tratan como si no hubiera ninguna: se reutiliza el mismo estado
   "Todavía no hay noticias publicadas" de siempre, sin tarjetas vacías ni
   huecos raros. El arreglo de ejemplo sigue intacto en data.js.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNoticias();
});

function initNoticias() {
  const contenedor = document.getElementById('newsContainer');
  if (!contenedor || typeof TORNEO_DATA === 'undefined') return;

  const noticiasOrdenadas = TORNEO_DATA.mostrarNoticias
    ? [...(TORNEO_DATA.noticias || [])].sort((a, b) => b.fecha.localeCompare(a.fecha))
    : [];

  if (!noticiasOrdenadas.length) {
    contenedor.innerHTML = `
      <div class="panel-placeholder panel-content">
        <div class="panel-placeholder__icon">📰</div>
        <p class="panel-placeholder__text">Todavía no hay noticias publicadas.</p>
      </div>
    `;
    return;
  }

  // La noticia marcada con "destacada: true" gana el lugar principal; si
  // ninguna lo está, se usa automáticamente la más reciente.
  const destacada = noticiasOrdenadas.find((n) => n.destacada) || noticiasOrdenadas[0];
  const resto = noticiasOrdenadas.filter((n) => n !== destacada);

  contenedor.innerHTML = `
    <div class="news-layout">
      ${crearNoticiaDestacadaHTML(destacada)}
      ${resto.length ? `<div class="news-grid">${resto.map(crearNoticiaHTML).join('')}</div>` : ''}
    </div>
  `;

  if (typeof window.observeReveal === 'function') {
    window.observeReveal(contenedor);
  }
}

function metaNoticia(noticia) {
  const categoria = TORNEO_DATA.categorias[noticia.categoria];
  return `${noticia.fechaTexto} · ${categoria.nombre}`;
}

function crearNoticiaDestacadaHTML(noticia) {
  const deporte = TORNEO_DATA.deportes[noticia.deporte];
  return `
    <article class="news-featured reveal">
      <div class="news-featured__image" style="--sport-color:${deporte.color}">
        <span class="news-featured__image-icon" aria-hidden="true">📷</span>
        <p class="news-featured__image-text">Foto pendiente de subir</p>
      </div>
      <div class="news-featured__body">
        <span class="news-featured__meta">${metaNoticia(noticia)}</span>
        <h3 class="news-featured__title">${noticia.titular}</h3>
        <p class="news-featured__excerpt">${noticia.resumen}</p>
      </div>
    </article>
  `;
}

function crearNoticiaHTML(noticia) {
  const deporte = TORNEO_DATA.deportes[noticia.deporte];
  return `
    <article class="news-card reveal">
      <div class="news-card__image" style="--sport-color:${deporte.color}">
        <span class="news-card__image-icon" aria-hidden="true">📷</span>
      </div>
      <div class="news-card__body">
        <span class="news-card__meta">${metaNoticia(noticia)}</span>
        <h4 class="news-card__title">${noticia.titular}</h4>
      </div>
    </article>
  `;
}
