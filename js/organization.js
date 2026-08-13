'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — organization.js
   Padrinos y madrinas del torneo. Se genera desde TORNEO_DATA.organizacion
   (data.js), que empieza vacío a propósito: no se inventan nombres de
   personas reales. Para agregar alguien, solo se completa ese arreglo.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initOrganizacion();
});

function initOrganizacion() {
  const contenedor = document.getElementById('organizationGrid');
  if (!contenedor || typeof TORNEO_DATA === 'undefined') return;

  const personas = TORNEO_DATA.organizacion || [];

  if (!personas.length) {
    contenedor.innerHTML = `
      <div class="panel-placeholder panel-content">
        <div class="panel-placeholder__icon">🤝</div>
        <p class="panel-placeholder__text">Todavía no se han registrado padrinos y madrinas — aparecerán aquí en cuanto la organización los defina.</p>
      </div>
    `;
    return;
  }

  contenedor.innerHTML = `<div class="organization-grid">${personas.map(crearPadrinoHTML).join('')}</div>`;

  if (typeof window.observeReveal === 'function') {
    window.observeReveal(contenedor);
  }
}

function crearPadrinoHTML(persona) {
  const equipo = TORNEO_DATA.equipos[persona.curso];

  const fotos = Array.isArray(persona.fotos)
    ? persona.fotos
    : persona.foto
      ? [persona.foto]
      : [];

  const nombres = Array.isArray(persona.nombres)
    ? persona.nombres
    : persona.nombre
      ? [persona.nombre]
      : [];

  return `
    <article class="padrino-card reveal">
    <div class="padrino-card__photos ${fotos.length === 1 && persona.fotoGrupal ? 'foto-grupal' : ''}">
        ${fotos.map((foto, index) => `
          <div class="padrino-card__photo">
            <img 
              src="${foto}" 
              alt="${nombres[index] || 'Padrino o madrina'}" 
              loading="lazy"
            >
          </div>
        `).join('')}
      </div>

      <div class="padrino-card__body">
        <p class="padrino-card__name">
          ${nombres.join(' y ')}
        </p>

        <p class="padrino-card__role">${persona.cargo || ''}</p>

        ${equipo ? `
          <p class="padrino-card__meta">
            ${banderaHTML(equipo, 'padrino-card__flag')} 
            ${persona.curso} · ${equipo.pais}
          </p>
        ` : ''}
      </div>
    </article>
  `;
}
