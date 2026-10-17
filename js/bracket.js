'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — bracket.js
   Llaves de eliminación directa. Por cada categoría + género + deporte:
     2 semifinales → FINAL (ganadores) y TERCER PUESTO (perdedores).

   NO tiene datos propios: lee los partidos de TORNEO_DATA.partidos que traen
   la propiedad "fase" ('semifinal' | 'final' | 'tercer-puesto'). Son los mismos
   registros que muestran el calendario y las listas de categoría.
   Se activa por categoría con "llaves: true" en TORNEO_DATA.categorias.
   ========================================================================== */

const FASES_LLAVE = ['semifinal', 'final', 'tercer-puesto'];

/** ¿Es un partido de eliminatoria (y no de fase de grupos)? */
function esPartidoDeLlave(partido) {
  return FASES_LLAVE.includes(partido.fase);
}

function esNumero(valor) {
  return typeof valor === 'number' && Number.isFinite(valor);
}

/**
 * Ganador de un partido jugado, o null si no se puede determinar.
 *  1. Marcador distinto → gana quien tenga más.
 *  2. Marcador empatado + tanda de penales válida (penalesLocal ≠ penalesVisitante)
 *     → gana quien tenga más penales.
 *  3. Empate sin tanda → solo si el partido trae "ganador" con el código de uno
 *     de los dos cursos. Si no, queda sin definir (no se inventa).
 */
function ganadorDePartido(partido) {
  if (!partido || partido.estado !== 'jugado' || !partido.local || !partido.visitante) return null;
  const { marcadorLocal: ml, marcadorVisitante: mv } = partido;
  if (!esNumero(ml) || !esNumero(mv)) return null;

  if (ml > mv) return partido.local;
  if (ml < mv) return partido.visitante;

  const { penalesLocal: pl, penalesVisitante: pv } = partido;
  if (esNumero(pl) && esNumero(pv) && pl !== pv) return pl > pv ? partido.local : partido.visitante;

  if (partido.ganador === partido.local || partido.ganador === partido.visitante) return partido.ganador;
  return null;
}

function perdedorDePartido(partido) {
  const ganador = ganadorDePartido(partido);
  if (!ganador) return null;
  return ganador === partido.local ? partido.visitante : partido.local;
}

/** Busca un partido de llave por combinación exacta categoría + deporte + género + fase (+ número de semifinal). */
function buscarPartidoLlave(categoria, deporte, genero, fase, llave) {
  return TORNEO_DATA.partidos.find((p) =>
    p.categoria === categoria && p.deporte === deporte && p.genero === genero &&
    p.fase === fase && (llave === undefined || p.llave === llave)) || null;
}

/**
 * Llena local/visitante de la Final y del Tercer puesto a partir de las
 * semifinales (ganadores y perdedores). Solo completa lo que esté vacío:
 * si escribiste un equipo a mano en data.js, se respeta.
 * Se ejecuta una vez al cargar la página, para que calendario, categorías y
 * llaves vean exactamente los mismos participantes.
 */
function completarParticipantesLlaves() {
  const combos = new Set(TORNEO_DATA.partidos.filter(esPartidoDeLlave)
    .map((p) => `${p.categoria}|${p.deporte}|${p.genero}`));

  combos.forEach((clave) => {
    const [categoria, deporte, genero] = clave.split('|');
    const semi1 = buscarPartidoLlave(categoria, deporte, genero, 'semifinal', 1);
    const semi2 = buscarPartidoLlave(categoria, deporte, genero, 'semifinal', 2);
    const final = buscarPartidoLlave(categoria, deporte, genero, 'final');
    const tercero = buscarPartidoLlave(categoria, deporte, genero, 'tercer-puesto');

    if (final) {
      if (!final.local) final.local = ganadorDePartido(semi1) || undefined;
      if (!final.visitante) final.visitante = ganadorDePartido(semi2) || undefined;
    }
    if (tercero) {
      if (!tercero.local) tercero.local = perdedorDePartido(semi1) || undefined;
      if (!tercero.visitante) tercero.visitante = perdedorDePartido(semi2) || undefined;
    }
  });
}

/** ¿Debe mostrarse este partido en el calendario/listas? Los de llave solo si ya tienen fecha o ambos equipos. */
function partidoVisibleEnCalendario(partido) {
  if (!esPartidoDeLlave(partido)) return true;
  return Boolean(partido.fecha) || Boolean(partido.local && partido.visitante);
}

/** Texto corto de la fase para etiquetas ("Semifinal 1", "Final", "Tercer puesto"); '' para fase de grupos. */
function etiquetaFase(partido) {
  if (partido.fase === 'semifinal') return partido.llave ? `Semifinal ${partido.llave}` : 'Semifinal';
  if (partido.fase === 'final') return 'Final';
  if (partido.fase === 'tercer-puesto') return 'Tercer puesto';
  return '';
}

/** Marcador en texto, con la tanda de penales si la hay: "1 – 1 (4–3 pen.)". */
function textoMarcador(partido) {
  const base = `${partido.marcadorLocal} – ${partido.marcadorVisitante}`;
  const tanda = esNumero(partido.penalesLocal) && esNumero(partido.penalesVisitante);
  return tanda ? `${base} (${partido.penalesLocal}–${partido.penalesVisitante} pen.)` : base;
}

/* ---------------------------- Render ---------------------------- */

/**
 * Una fila de equipo dentro de una tarjeta de llave.
 * "atenuar" = equipo que ya no sigue en competencia (perdedor de Final o de Tercer puesto).
 * Los perdedores de semifinal NO se atenúan: todavía juegan el tercer puesto.
 */
function llaveEquipoHTML(codigo, partido, ganador, atenuar) {
  if (!codigo) return '<div class="bracket-team bracket-team--tbd"><span class="bracket-team__code">Por definir</span></div>';
  const equipo = TORNEO_DATA.equipos[codigo];
  const jugado = partido && partido.estado === 'jugado';
  const esGanador = jugado && ganador === codigo;
  const esPerdedor = jugado && ganador && ganador !== codigo;
  const puntos = jugado ? (codigo === partido.local ? partido.marcadorLocal : partido.marcadorVisitante) : '';
  const clases = ['bracket-team', esGanador ? 'is-winner' : '', esPerdedor && atenuar ? 'is-out' : '']
    .filter(Boolean).join(' ');
  return `
    <div class="${clases}">
      ${banderaHTML(equipo, 'bracket-team__flag')}
      <span class="bracket-team__code">${codigo}</span>
      ${puntos !== '' && puntos !== undefined ? `<span class="bracket-team__score">${puntos}</span>` : ''}
    </div>`;
}

/** Tarjeta de un partido de llave (puede ser null si todavía no hay registro). */
function llavePartidoHTML(titulo, partido, opciones = {}) {
  const p = partido || {};
  const ganador = ganadorDePartido(p);
  const jugado = p.estado === 'jugado';
  const formatear = typeof window.formatearHora === 'function' ? window.formatearHora : (h) => h || '';
  const cuando = [p.fechaTexto, formatear(p.hora)].filter(Boolean).join(' · ') || 'Fecha por definir';
  const lugar = p.lugar ? `📍 ${p.lugar}` : '';
  const penales = jugado && esNumero(p.penalesLocal) && esNumero(p.penalesVisitante)
    ? `Penales ${p.penalesLocal}–${p.penalesVisitante}` : '';
  const empateSinDefinir = jugado && p.local && p.visitante && !ganador;
  const estado = jugado ? 'Finalizado' : 'Pendiente';

  return `
    <div class="bracket-match ${opciones.clase || ''}">
      <p class="bracket-match__title">${titulo}<span class="bracket-match__state bracket-match__state--${jugado ? 'jugado' : 'pendiente'}">${estado}</span></p>
      ${llaveEquipoHTML(p.local, p, ganador, opciones.atenuar)}
      ${llaveEquipoHTML(p.visitante, p, ganador, opciones.atenuar)}
      <p class="bracket-match__info">${[cuando, lugar, penales].filter(Boolean).join(' · ')}</p>
      ${empateSinDefinir ? '<p class="bracket-match__warn">Empate sin definir (falta tanda de penales)</p>' : ''}
    </div>`;
}

/** Casilla "Perdedor de la semifinal N" que alimenta el tercer puesto. */
function llavePerdedorHTML(titulo, semifinal) {
  const perdedor = perdedorDePartido(semifinal || {});
  return `
    <div class="bracket-match bracket-match--feeder">
      <p class="bracket-match__title">${titulo}</p>
      ${llaveEquipoHTML(perdedor, null, null, false)}
    </div>`;
}

function llaveDeporteHTML(categoria, deporte, genero) {
  const info = TORNEO_DATA.deportes[deporte];
  const semi1 = buscarPartidoLlave(categoria, deporte, genero, 'semifinal', 1);
  const semi2 = buscarPartidoLlave(categoria, deporte, genero, 'semifinal', 2);
  const final = buscarPartidoLlave(categoria, deporte, genero, 'final');
  const tercero = buscarPartidoLlave(categoria, deporte, genero, 'tercer-puesto');

  const campeon = ganadorDePartido(final);
  const terceroPuesto = ganadorDePartido(tercero);
  const resultados = [
    campeon ? `🏆 Campeón: <strong>${campeon}</strong>` : '',
    terceroPuesto ? `🥉 Tercer puesto: <strong>${terceroPuesto}</strong>` : ''
  ].filter(Boolean).map((t) => `<span>${t}</span>`).join('');

  // Sin registros de llave todavía (ej. Infantil/Prejuvenil): se muestran los clasificados.
  const sinCruces = !(semi1 && semi1.local) && !(semi2 && semi2.local);
  const clasificados = sinCruces ? `
    <div class="bracket__qualified">
      <span class="bracket__qualified-label">Clasificados</span>
      ${equiposActivos(categoria, deporte, genero).map((codigo) => `
        <span class="team-chip">${banderaHTML(TORNEO_DATA.equipos[codigo], 'team-chip__flag')}<span class="team-chip__code">${codigo}</span></span>`).join('')}
    </div>` : '';

  return `
    <div class="bracket" data-deporte="${deporte}" data-genero="${genero}">
      <p class="standings__title">${info.icono} ${info.nombre}</p>
      ${clasificados}
      <div class="bracket__scroll">
        <div class="bracket__tree">
          <div class="bracket__cell bracket__cell--a1">${llavePartidoHTML('Semifinal 1', semi1)}</div>
          <div class="bracket__cell bracket__cell--a2">${llavePartidoHTML('Semifinal 2', semi2)}</div>
          <div class="bracket__link" aria-hidden="true"></div>
          <div class="bracket__cell bracket__cell--out">${llavePartidoHTML('Final', final, { clase: 'bracket-match--final', atenuar: true })}</div>
        </div>
        <div class="bracket__tree bracket__tree--third">
          <div class="bracket__cell bracket__cell--a1">${llavePerdedorHTML('Perdedor semifinal 1', semi1)}</div>
          <div class="bracket__cell bracket__cell--a2">${llavePerdedorHTML('Perdedor semifinal 2', semi2)}</div>
          <div class="bracket__link bracket__link--dashed" aria-hidden="true"></div>
          <div class="bracket__cell bracket__cell--out">${llavePartidoHTML('Tercer puesto', tercero, { atenuar: true })}</div>
        </div>
      </div>
      ${resultados ? `<p class="bracket__results">${resultados}</p>` : ''}
    </div>`;
}

/** Llaves de los tres deportes para una categoría y género (nunca mezcla géneros ni deportes). */
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

/** Las seis llaves de una categoría juntas: bloque Hombres y bloque Mujeres, cada uno con Fútbol, Baloncesto y Voleibol. */
function renderizarLlavesCategoriaHTML(claveCategoria) {
  const categoria = TORNEO_DATA.categorias[claveCategoria];
  if (!categoria || !categoria.llaves) {
    return '<p class="calendar__vacio panel-content">Las llaves de esta categoría todavía no están disponibles.</p>';
  }
  const bloques = Object.entries(TORNEO_DATA.generos).map(([claveGenero, genero]) => `
    <section class="bracket-gender" data-genero="${claveGenero}">
      <h4 class="bracket-gender__title">${genero.nombre}</h4>
      ${renderizarLlaveHTML(claveCategoria, claveGenero)}
    </section>`).join('');
  return `<div class="bracket-all">${bloques}</div>`;
}

completarParticipantesLlaves();

window.esPartidoDeLlave = esPartidoDeLlave;
window.ganadorDePartido = ganadorDePartido;
window.partidoVisibleEnCalendario = partidoVisibleEnCalendario;
window.etiquetaFase = etiquetaFase;
window.textoMarcador = textoMarcador;
window.renderizarLlaveHTML = renderizarLlaveHTML;
window.renderizarLlavesCategoriaHTML = renderizarLlavesCategoriaHTML;