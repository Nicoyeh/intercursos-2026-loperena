'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — bracket.js
   Llaves de semifinales y finales. Por cada categoría + género + deporte:
     2 semifinales → FINAL (ganadores) y TERCER PUESTO (perdedores).
   Los datos viven en TORNEO_DATA.llaves (data.js). Se activa por categoría
   con "llaves: true" en TORNEO_DATA.categorias (Infantil, Prejuvenil y Juvenil).
   ========================================================================== */

/** Resuelve ganador/perdedor de un partido de llave. Devuelve null si no está jugado o no hay desenlace claro. */
function resolverResultado(partido) {
  if (!partido || partido.estado !== 'jugado' || !partido.local || !partido.visitante) return null;
  let ganador = partido.ganador || null;
  if (!ganador) {
    if (partido.marcadorLocal > partido.marcadorVisitante) ganador = partido.local;
    else if (partido.marcadorLocal < partido.marcadorVisitante) ganador = partido.visitante;
  }
  if (!ganador) return null;
  return { ganador, perdedor: ganador === partido.local ? partido.visitante : partido.local };
}

/** Arma los 4 cruces de una llave (final y tercer puesto se calculan desde las semifinales). */
function construirLlave(categoria, deporte, genero) {
  const datos = (((TORNEO_DATA.llaves || {})[categoria] || {})[deporte] || {})[genero] || {};
  const semi1 = { ...(datos.semifinal1 || {}) };
  const semi2 = { ...(datos.semifinal2 || {}) };
  const r1 = resolverResultado(semi1);
  const r2 = resolverResultado(semi2);

  const final = { ...(datos.final || {}), local: r1 ? r1.ganador : null, visitante: r2 ? r2.ganador : null };
  const tercero = { ...(datos.tercerPuesto || {}), local: r1 ? r1.perdedor : null, visitante: r2 ? r2.perdedor : null };

  const rf = resolverResultado(final);
  const campeon = rf ? rf.ganador : null;

  return { semi1, semi2, final, tercero, campeon, clasificados: equiposActivos(categoria, deporte, genero) };
}

function llaveEquipoHTML(codigo, partido, esGanador) {
  if (!codigo) return '<div class="bracket-team bracket-team--tbd"><span class="bracket-team__code">Por definir</span></div>';
  const equipo = TORNEO_DATA.equipos[codigo];
  let marcador = '';
  if (partido && partido.estado === 'jugado') {
    marcador = codigo === partido.local ? partido.marcadorLocal : partido.marcadorVisitante;
  }
  return `
    <div class="bracket-team${esGanador ? ' is-winner' : ''}">
      ${banderaHTML(equipo, 'bracket-team__flag')}
      <span class="bracket-team__code">${codigo}</span>
      ${marcador !== '' && marcador !== undefined ? `<span class="bracket-team__score">${marcador}</span>` : ''}
    </div>`;
}

function llavePartidoHTML(titulo, partido, extraClase) {
  const res = resolverResultado(partido);
  const formatear = typeof window.formatearHora === 'function' ? window.formatearHora : (h) => h || '';
  const hora = formatear(partido.hora);
  const info = [partido.fechaTexto, hora, partido.lugar ? `📍 ${partido.lugar}` : ''].filter(Boolean).join(' · ');
  return `
    <div class="bracket-match ${extraClase || ''}">
      <p class="bracket-match__title">${titulo}</p>
      ${llaveEquipoHTML(partido.local, partido, res && res.ganador === partido.local)}
      ${llaveEquipoHTML(partido.visitante, partido, res && res.ganador === partido.visitante)}
      ${info ? `<p class="bracket-match__info">${info}</p>` : ''}
    </div>`;
}

function llaveDeporteHTML(categoria, deporte, genero) {
  const info = TORNEO_DATA.deportes[deporte];
  const l = construirLlave(categoria, deporte, genero);
  const sinCruces = !(l.semi1.local || l.semi2.local);

  const clasificados = sinCruces ? `
    <div class="bracket__qualified">
      <span class="bracket__qualified-label">Clasificados</span>
      ${l.clasificados.map((codigo) => `
        <span class="team-chip">${banderaHTML(TORNEO_DATA.equipos[codigo], 'team-chip__flag')}<span class="team-chip__code">${codigo}</span></span>`).join('')}
    </div>` : '';

  return `
    <div class="bracket" data-deporte="${deporte}">
      <p class="standings__title">${info.icono} ${info.nombre}</p>
      ${clasificados}
      <div class="bracket__grid">
        <div class="bracket__col bracket__col--semis">
          <p class="bracket__round">Semifinales</p>
          ${llavePartidoHTML('Semifinal 1', l.semi1)}
          ${llavePartidoHTML('Semifinal 2', l.semi2)}
        </div>
        <div class="bracket__col bracket__col--final">
          <p class="bracket__round">Final</p>
          ${llavePartidoHTML('Final', l.final, 'bracket-match--final')}
          ${l.campeon ? `<p class="bracket__champion">🏆 Campeón: ${l.campeon}</p>` : ''}
          <p class="bracket__round bracket__round--third">Tercer puesto</p>
          ${llavePartidoHTML('Tercer puesto', l.tercero)}
        </div>
      </div>
    </div>`;
}

/** HTML de las llaves de los tres deportes para una categoría y género (nunca mezcla géneros ni deportes). */
function renderizarLlaveHTML(claveCategoria, claveGenero) {
  const categoria = TORNEO_DATA.categorias[claveCategoria];
  if (!categoria || !categoria.llaves) {
    return '<p class="calendar__vacio panel-content">Las llaves de esta categoría todavía no están disponibles.</p>';
  }
  const bloques = Object.keys(TORNEO_DATA.deportes)
    .map((claveDeporte) => llaveDeporteHTML(claveCategoria, claveDeporte, claveGenero))
    .join('');
  return `<div class="bracket-group panel-content">${bloques}</div>`;
}

window.renderizarLlaveHTML = renderizarLlaveHTML;