'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — bracket.js
   Llaves de las fases eliminatorias + utilidades de resultados.

   NO contiene datos. Todo sale de TORNEO_DATA.partidos (js/data.js):
   por cada CATEGORÍA + GÉNERO + DEPORTE se arma una llave independiente:

        Semifinal 1 ─┐
                     ├── Final
        Semifinal 2 ─┘

        Perdedor semifinal 1 ─┐
                              ├── Tercer puesto
        Perdedor semifinal 2 ─┘

   · Las semifinales son los partidos con fase: 'Semifinales' (2 por llave;
     la de id más bajo es la Semifinal 1).
   · Ganador y perdedor se calculan solos desde el marcador (o desde el
     campo "ganador" si no hay marcador / hubo penales).
   · La Final y el Tercer puesto se DERIVAN de las semifinales. Si ya se
     jugaron y están en data.js (fase: 'Final' / 'Tercer puesto'), se
     muestra su resultado, el CAMPEÓN y el 3.er PUESTO.
   · Si un resultado cambia en data.js, la llave se recalcula completa.

   Expone window.TorneoLlaves (usado por categories.js, calendar.js y
   statistics.js). Para activar Juvenil: categorias.juvenil.llaves = true.
   ========================================================================== */

(function () {
  const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const ORDEN_FASE = { grupos: 0, semifinal: 1, tercer: 2, final: 3 };
  const FASES_POR_DEFECTO = { grupos: 'Fase de grupos', semifinal: 'Semifinales', tercer: 'Tercer puesto', final: 'Final' };

  /* ------------------------------------------------------------------ *
   *  Utilidades generales
   * ------------------------------------------------------------------ */
  function esc(texto) {
    return String(texto === null || texto === undefined ? '' : texto)
      .replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function sinAcentos(texto) {
    return String(texto === null || texto === undefined ? '' : texto).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  const YA_AVISADOS = new Set();
  function avisar(mensaje) {
    if (YA_AVISADOS.has(mensaje)) return;
    YA_AVISADOS.add(mensaje);
    if (typeof console !== 'undefined') console.warn('[Llaves] ' + mensaje);
  }

  function formatearHoraSeguro(hora) {
    return typeof window.formatearHora === 'function' ? window.formatearHora(hora) : (hora || '');
  }

  function numeroONull(valor) {
    if (valor === null || valor === undefined || valor === '') return null;
    const n = Number(valor);
    return Number.isFinite(n) ? n : null;
  }

  function idNumerico(partido) {
    const m = /(\d+)/.exec(String((partido && partido.id) || ''));
    return m ? Number(m[1]) : 0;
  }

  /* ------------------------------------------------------------------ *
   *  Fases
   * ------------------------------------------------------------------ */
  /** 'grupos' | 'semifinal' | 'tercer' | 'final' — tolera mayúsculas, tildes y singular/plural. */
  function claveFase(partido) {
    const t = sinAcentos(partido && partido.fase).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (!t) return 'grupos';
    if (t.includes('grupo')) return 'grupos';
    if (t.includes('semi')) return 'semifinal';
    if (t.includes('tercer') || t.includes('3er') || t.includes('3 er') || t.includes('bronce')) return 'tercer';
    if (t.startsWith('final')) return 'final';
    avisar(`Fase desconocida "${partido.fase}" en el partido ${partido.id}: se toma como "Fase de grupos".`);
    return 'grupos';
  }

  /** Texto de la fase tal como está en TORNEO_DATA.fases (el Calendario lo muestra en mayúsculas). */
  function etiquetaFase(partido) {
    const clave = claveFase(partido);
    const fases = (typeof TORNEO_DATA !== 'undefined' && TORNEO_DATA.fases) || {};
    return fases[clave] || FASES_POR_DEFECTO[clave];
  }

  function faseTagHTML(partido) {
    const clave = claveFase(partido);
    return `<span class="fase-tag fase-tag--${clave}">${esc(etiquetaFase(partido))}</span>`;
  }

  /* ------------------------------------------------------------------ *
   *  Resultados
   * ------------------------------------------------------------------ */
  /**
   * Interpreta un partido. El marcador manda; "ganador" solo se usa cuando no
   * hay marcador o hubo empate (penales).
   * Devuelve { jugado, ganador, perdedor, empate, marcadorLocal, marcadorVisitante }
   */
  function resultadoPartido(partido) {
    const vacio = { jugado: false, ganador: null, perdedor: null, empate: false, marcadorLocal: null, marcadorVisitante: null };
    if (!partido || partido.estado !== 'jugado') return vacio;

    const ml = numeroONull(partido.marcadorLocal);
    const mv = numeroONull(partido.marcadorVisitante);
    let ganador = null;

    if (ml !== null && mv !== null && ml !== mv) {
      ganador = ml > mv ? partido.local : partido.visitante;
      if (partido.ganador && partido.ganador !== ganador) {
        avisar(`Partido ${partido.id}: "ganador" (${partido.ganador}) contradice el marcador; se usa el marcador.`);
      }
    } else if (partido.ganador) {
      if (partido.ganador === partido.local || partido.ganador === partido.visitante) {
        ganador = partido.ganador;
      } else {
        avisar(`Partido ${partido.id}: "ganador" (${partido.ganador}) no es ni el local ni el visitante.`);
      }
    }

    const empate = ganador === null && ml !== null && mv !== null && ml === mv;
    const perdedor = ganador ? (ganador === partido.local ? partido.visitante : partido.local) : null;
    return { jugado: true, ganador, perdedor, empate, marcadorLocal: ml, marcadorVisitante: mv };
  }

  /** Texto central de una tarjeta/fila: "2 – 1", "—" (jugado sin marcador) o "VS" (pendiente). */
  function marcadorTexto(partido) {
    const r = resultadoPartido(partido);
    if (!r.jugado) return 'VS';
    if (r.marcadorLocal !== null && r.marcadorVisitante !== null) return `${r.marcadorLocal} – ${r.marcadorVisitante}`;
    return '—';
  }

  /** Fecha para mostrar: fechaTexto, o "22 AGO" calculado desde fecha, o el texto por defecto. */
  function textoFecha(partido, porDefecto) {
    if (partido.fechaTexto) return partido.fechaTexto;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(partido.fecha || '');
    if (m) return `${Number(m[3])} ${MESES[Number(m[2]) - 1]}`;
    return porDefecto === undefined ? 'Sin fecha' : porDefecto;
  }

  /** Orden del Calendario: fecha (sin fecha al final) → hora → fase (grupos, semifinal, tercer, final). */
  function compararPartidos(a, b) {
    const fa = a.fecha || '9999-99-99';
    const fb = b.fecha || '9999-99-99';
    return fa.localeCompare(fb)
      || String(a.hora || '').localeCompare(String(b.hora || ''))
      || ORDEN_FASE[claveFase(a)] - ORDEN_FASE[claveFase(b)];
  }

  /* ------------------------------------------------------------------ *
   *  Construcción de la llave (categoría + género + deporte)
   * ------------------------------------------------------------------ */
  function listaEliminados(cat, dep, gen) {
    const e = TORNEO_DATA.eliminados;
    return (e && e[cat] && e[cat][dep] && e[cat][dep][gen]) || [];
  }

  function ladoVacio(etiqueta) {
    return { codigo: null, etiquetaVacia: etiqueta, marcador: null, estado: 'vacio', eliminado: false };
  }

  function ladoEquipo(codigo, marcador, estado) {
    return { codigo, etiquetaVacia: null, marcador: marcador === undefined ? null : marcador, estado: estado || 'pendiente', eliminado: false };
  }

  function nodoBase(tipo, clave, titulo, lados) {
    return { tipo, clave, titulo, partido: null, estado: 'por-definir', lados, ganador: null, perdedor: null, fechaTexto: '', horaTexto: '', lugar: '' };
  }

  /**
   * Vuelca un partido registrado en un nodo de la llave.
   * opciones.estadoGanador: estado del ganador ('ganador' | 'campeon' | 'tercero')
   * opciones.estadoPendiente: estado de los equipos mientras no hay resultado
   * opciones.orden: [codigoA, codigoB] para conservar el orden de la llave
   */
  function aplicarPartido(nodo, partido, opciones) {
    const { estadoGanador, estadoPendiente, orden } = opciones;
    const r = resultadoPartido(partido);

    nodo.partido = partido;
    nodo.fechaTexto = textoFecha(partido, '');
    nodo.horaTexto = formatearHoraSeguro(partido.hora);
    nodo.lugar = partido.lugar || '';

    let lados = [
      ladoEquipo(partido.local, r.marcadorLocal, estadoPendiente),
      ladoEquipo(partido.visitante, r.marcadorVisitante, estadoPendiente)
    ];
    if (orden) lados = orden.map((codigo) => lados.find((l) => l.codigo === codigo));

    if (!r.jugado) {
      nodo.estado = 'pendiente';
    } else if (r.ganador) {
      nodo.estado = 'jugado';
      nodo.ganador = r.ganador;
      nodo.perdedor = r.perdedor;
      lados.forEach((l) => { l.estado = l.codigo === r.ganador ? estadoGanador : 'perdedor'; });
    } else {
      nodo.estado = 'sin-resultado';
    }
    nodo.lados = lados;
    return nodo;
  }

  function nodoSemifinal(partido, numero) {
    const nodo = nodoBase('semifinal', `semifinal-${numero}`, `Semifinal ${numero}`, [ladoVacio(''), ladoVacio('')]);
    if (!partido) return nodo;
    return aplicarPartido(nodo, partido, { estadoGanador: 'ganador', estadoPendiente: 'pendiente' });
  }

  /** Final o Tercer puesto: sus equipos salen de las semifinales; si el partido ya está registrado, se muestra su resultado. */
  function nodoDerivado(cfg, avisos) {
    const { tipo, titulo, codigoA, codigoB, etiquetaA, etiquetaB, estadoConocido, estadoGanador, registrado } = cfg;
    const nodo = nodoBase(tipo, tipo, titulo, [
      codigoA ? ladoEquipo(codigoA, null, estadoConocido) : ladoVacio(etiquetaA),
      codigoB ? ladoEquipo(codigoB, null, estadoConocido) : ladoVacio(etiquetaB)
    ]);
    nodo.estado = codigoA && codigoB ? 'pendiente' : 'por-definir';

    if (!registrado) return nodo;

    const mismosEquipos = codigoA && codigoB
      && registrado.local !== registrado.visitante
      && [registrado.local, registrado.visitante].every((c) => c === codigoA || c === codigoB);

    if (mismosEquipos) {
      return aplicarPartido(nodo, registrado, { estadoGanador, estadoPendiente: estadoConocido, orden: [codigoA, codigoB] });
    }
    avisos.push(`El partido ${registrado.id} (${titulo}: ${registrado.local} vs ${registrado.visitante}) no coincide con los equipos que salen de las semifinales (${codigoA || '?'} y ${codigoB || '?'}); se ignora su resultado.`);
    return nodo;
  }

  /** Construye la llave de UNA categoría + género + deporte (nunca mezcla equipos de otras combinaciones). */
  function construirLlave(claveCategoria, claveGenero, claveDeporte) {
    const avisos = [];
    const combo = TORNEO_DATA.partidos.filter((p) => p.categoria === claveCategoria && p.genero === claveGenero && p.deporte === claveDeporte);
    const porFase = (fase) => combo.filter((p) => claveFase(p) === fase).sort((a, b) => idNumerico(a) - idNumerico(b));

    const semifinales = porFase('semifinal');
    const finales = porFase('final');
    const terceros = porFase('tercer');

    if (semifinales.length > 2) avisos.push(`Hay ${semifinales.length} semifinales en ${claveCategoria}/${claveGenero}/${claveDeporte}; solo se usan las 2 primeras (por id).`);
    if (finales.length > 1) avisos.push(`Hay ${finales.length} finales en ${claveCategoria}/${claveGenero}/${claveDeporte}; solo se usa la primera (por id).`);
    if (terceros.length > 1) avisos.push(`Hay ${terceros.length} partidos de tercer puesto en ${claveCategoria}/${claveGenero}/${claveDeporte}; solo se usa el primero (por id).`);

    const s1 = nodoSemifinal(semifinales[0] || null, 1);
    const s2 = nodoSemifinal(semifinales[1] || null, 2);

    const final = nodoDerivado({
      tipo: 'final', titulo: 'Final',
      codigoA: s1.ganador, codigoB: s2.ganador,
      etiquetaA: 'Ganador semifinal 1', etiquetaB: 'Ganador semifinal 2',
      estadoConocido: 'clasificado', estadoGanador: 'campeon',
      registrado: finales[0] || null
    }, avisos);

    const tercer = nodoDerivado({
      tipo: 'tercer', titulo: 'Tercer puesto',
      codigoA: s1.perdedor, codigoB: s2.perdedor,
      etiquetaA: 'Perdedor semifinal 1', etiquetaB: 'Perdedor semifinal 2',
      estadoConocido: 'pendiente', estadoGanador: 'tercero',
      registrado: terceros[0] || null
    }, avisos);

    const perdedores = [s1, s2].map((s, i) => ({
      tipo: 'perdedor',
      clave: `perdedor-${i + 1}`,
      titulo: `Perdedor semifinal ${i + 1}`,
      lado: s.perdedor ? ladoEquipo(s.perdedor, null, 'pendiente') : ladoVacio(`Perdedor semifinal ${i + 1}`)
    }));

    // Controles de coherencia (solo avisos en consola; no cambian lo que se ve)
    const eliminados = listaEliminados(claveCategoria, claveDeporte, claveGenero);
    const todosLosLados = [...s1.lados, ...s2.lados, ...final.lados, ...tercer.lados, ...perdedores.map((p) => p.lado)];
    todosLosLados.forEach((lado) => {
      if (!lado.codigo) return;
      const equipo = TORNEO_DATA.equipos[lado.codigo];
      if (!equipo) avisos.push(`El equipo ${lado.codigo} no existe en "equipos".`);
      else if (equipo.categoria !== claveCategoria) avisos.push(`El equipo ${lado.codigo} no es de la categoría ${claveCategoria}.`);
      if (eliminados.includes(lado.codigo)) {
        lado.eliminado = true;
        avisos.push(`El equipo ${lado.codigo} está en "eliminados" de ${claveCategoria}/${claveGenero}/${claveDeporte} pero aparece en la llave.`);
      }
    });
    const enS1 = s1.lados.map((l) => l.codigo).filter(Boolean);
    const enS2 = s2.lados.map((l) => l.codigo).filter(Boolean);
    enS1.filter((c) => enS2.includes(c)).forEach((c) => avisos.push(`El equipo ${c} aparece en las dos semifinales de ${claveCategoria}/${claveGenero}/${claveDeporte}.`));
    [s1, s2].forEach((s) => {
      if (s.estado === 'sin-resultado') avisos.push(`La ${s.titulo} de ${claveCategoria}/${claveGenero}/${claveDeporte} está marcada como jugada pero no tiene ganador (marcador empatado o sin datos): agrega "ganador".`);
    });

    return {
      claveCategoria, claveGenero, claveDeporte,
      semis: [s1, s2], final, tercer, perdedores,
      campeon: final.ganador || null,
      tercerLugar: tercer.ganador || null,
      avisos
    };
  }

  /* ------------------------------------------------------------------ *
   *  Dibujo (HTML)
   * ------------------------------------------------------------------ */
  const TEXTO_ESTADO = { 'por-definir': 'Por definir', pendiente: 'Pendiente', jugado: 'Finalizado', 'sin-resultado': 'Sin resultado' };
  const INSIGNIAS = {
    campeon: '<span class="bk-badge bk-badge--campeon"><span aria-hidden="true">🏆</span> Campeón</span>',
    tercero: '<span class="bk-badge bk-badge--tercero"><span aria-hidden="true">🥉</span> 3.er puesto</span>',
    clasificado: '<span class="bk-badge bk-badge--finalista">Finalista</span>'
  };
  const ESTADOS_CON_MARCA = ['ganador', 'campeon', 'tercero'];

  function banderaDe(codigo) {
    const equipo = TORNEO_DATA.equipos[codigo];
    return typeof window.banderaHTML === 'function' ? window.banderaHTML(equipo, 'bk-team__flag') : '';
  }

  function filaEquipoHTML(lado) {
    if (!lado.codigo) {
      return `
        <div class="bk-team is-vacio">
          <span class="bk-team__flag bk-team__flag--vacia" aria-hidden="true"></span>
          <span class="bk-team__name"><span class="bk-team__tbd">Por definir</span>${lado.etiquetaVacia ? `<span class="bk-team__hint">${esc(lado.etiquetaVacia)}</span>` : ''}</span>
        </div>`;
    }
    const equipo = TORNEO_DATA.equipos[lado.codigo];
    const clases = ['bk-team', `is-${lado.estado}`];
    if (lado.eliminado) clases.push('is-eliminado');
    const marcador = lado.marcador === null || lado.marcador === undefined ? '' : `<span class="bk-team__score">${esc(lado.marcador)}</span>`;
    const marca = ESTADOS_CON_MARCA.includes(lado.estado) ? '<span class="bk-team__mark" aria-hidden="true"></span>' : '';
    return `
      <div class="${clases.join(' ')}"${equipo ? ` title="${esc(equipo.pais)}"` : ''}>
        ${banderaDe(lado.codigo)}
        <span class="bk-team__name"><span class="bk-team__code">${esc(lado.codigo)}</span>${INSIGNIAS[lado.estado] || ''}</span>
        ${marcador}${marca}
      </div>`;
  }

  function resumenAccesible(nodo) {
    const nombres = nodo.lados.map((l) => l.codigo || l.etiquetaVacia || 'por definir');
    let texto = `${nodo.titulo}: ${nombres[0]} contra ${nombres[1]}. ${TEXTO_ESTADO[nodo.estado]}.`;
    if (nodo.ganador) texto += ` Ganó ${nodo.ganador}.`;
    return texto;
  }

  function tarjetaHTML(nodo) {
    const meta = [nodo.fechaTexto, nodo.horaTexto, nodo.lugar ? `📍 ${nodo.lugar}` : ''].filter(Boolean).map(esc).join(' · ');
    return `
      <article class="bk-match bk-match--${nodo.tipo} is-${nodo.estado}" aria-label="${esc(resumenAccesible(nodo))}">
        <header class="bk-match__head">
          <span class="bk-match__title">${esc(nodo.titulo)}</span>
          <span class="bk-chip bk-chip--${nodo.estado}">${TEXTO_ESTADO[nodo.estado]}</span>
        </header>
        <div class="bk-match__teams">${nodo.lados.map(filaEquipoHTML).join('')}</div>
        ${meta ? `<footer class="bk-match__meta">${meta}</footer>` : ''}
      </article>`;
  }

  function tarjetaPerdedorHTML(slot) {
    return `
      <article class="bk-match bk-match--perdedor is-${slot.lado.codigo ? 'jugado' : 'por-definir'}" aria-label="${esc(slot.titulo)}: ${esc(slot.lado.codigo || 'por definir')}">
        <header class="bk-match__head"><span class="bk-match__title">${esc(slot.titulo)}</span></header>
        <div class="bk-match__teams">${filaEquipoHTML(slot.lado)}</div>
      </article>`;
  }

  function tituloLlave(claveCategoria, claveGenero, claveDeporte) {
    const categoria = TORNEO_DATA.categorias[claveCategoria];
    const genero = TORNEO_DATA.generos[claveGenero];
    const deporte = TORNEO_DATA.deportes[claveDeporte];
    return `Llave ${categoria.nombreCorto || categoria.nombre} — ${deporte.nombre} — ${genero.nombre}`;
  }

  function llaveHTML(llave) {
    const { claveCategoria, claveGenero, claveDeporte } = llave;
    const deporte = TORNEO_DATA.deportes[claveDeporte];
    const titulo = tituloLlave(claveCategoria, claveGenero, claveDeporte);
    const [s1, s2] = llave.semis;
    const [p1, p2] = llave.perdedores;
    const ganaS1 = Boolean(s1.ganador);
    const ganaS2 = Boolean(s2.ganador);
    const pierdeS1 = Boolean(s1.perdedor);
    const pierdeS2 = Boolean(s2.perdedor);
    const on = (cond) => (cond ? ' is-on' : '');

    return `
      <section class="bk" data-categoria="${claveCategoria}" data-genero="${claveGenero}" data-deporte="${claveDeporte}" style="--bk-accent:${deporte.color}">
        <header class="bk__head">
          <h5 class="bk__title"><span class="bk__icon" aria-hidden="true">${deporte.icono}</span>${esc(titulo)}</h5>
          <span class="bk__hint" aria-hidden="true">Desliza ↔</span>
        </header>
        <div class="bk__scroll" role="region" tabindex="0" aria-label="${esc(titulo)}. Desliza horizontalmente para ver la final y el tercer puesto.">
          <div class="bk__board">
            <div class="bk__row bk__row--final">
              <span class="bk__colhead bk__colhead--a">Semifinales</span>
              <span class="bk__colhead bk__colhead--b">Final</span>
              <div class="bk__slot bk__slot--1">${tarjetaHTML(s1)}</div>
              <div class="bk__slot bk__slot--2">${tarjetaHTML(s2)}</div>
              <span class="bk__arm bk__arm--top${on(ganaS1)}" aria-hidden="true"></span>
              <span class="bk__arm bk__arm--bottom${on(ganaS2)}" aria-hidden="true"></span>
              <span class="bk__out${on(ganaS1 && ganaS2)}" aria-hidden="true"></span>
              <div class="bk__slot bk__slot--target">${tarjetaHTML(llave.final)}</div>
            </div>
            <div class="bk__row bk__row--tercer">
              <span class="bk__colhead bk__colhead--a">Perdedores de semifinales</span>
              <span class="bk__colhead bk__colhead--b">Tercer puesto</span>
              <div class="bk__slot bk__slot--1">${tarjetaPerdedorHTML(p1)}</div>
              <div class="bk__slot bk__slot--2">${tarjetaPerdedorHTML(p2)}</div>
              <span class="bk__arm bk__arm--top${on(pierdeS1)}" aria-hidden="true"></span>
              <span class="bk__arm bk__arm--bottom${on(pierdeS2)}" aria-hidden="true"></span>
              <span class="bk__out${on(pierdeS1 && pierdeS2)}" aria-hidden="true"></span>
              <div class="bk__slot bk__slot--target">${tarjetaHTML(llave.tercer)}</div>
            </div>
          </div>
        </div>
      </section>`;
  }

  function categoriaUsaLlaves(claveCategoria) {
    const categoria = typeof TORNEO_DATA !== 'undefined' && TORNEO_DATA.categorias && TORNEO_DATA.categorias[claveCategoria];
    return Boolean(categoria && categoria.llaves);
  }

  /** Pestaña "Llaves" de una categoría: bloque Hombres y bloque Mujeres, cada uno con las llaves de los 3 deportes. */
  function renderCategoriaHTML(claveCategoria) {
    const bloques = Object.entries(TORNEO_DATA.generos).map(([claveGenero, genero]) => {
      const llaves = Object.keys(TORNEO_DATA.deportes).map((claveDeporte) => {
        const llave = construirLlave(claveCategoria, claveGenero, claveDeporte);
        llave.avisos.forEach(avisar);
        return llaveHTML(llave);
      }).join('');

      return `
        <section class="bk-genero bk-genero--${claveGenero}" aria-labelledby="bk-genero-${claveCategoria}-${claveGenero}">
          <header class="bk-genero__head">
            <h4 class="bk-genero__title" id="bk-genero-${claveCategoria}-${claveGenero}">${esc(genero.nombre)}</h4>
            <span class="bk-genero__sub">Fútbol · Baloncesto · Voleibol</span>
          </header>
          <div class="bk-genero__list">${llaves}</div>
        </section>`;
    }).join('');

    return `<div class="bk-view panel-content">${bloques}</div>`;
  }

  window.TorneoLlaves = {
    claveFase, etiquetaFase, faseTagHTML,
    resultadoPartido, marcadorTexto, textoFecha, compararPartidos,
    construirLlave, tituloLlave, categoriaUsaLlaves, renderCategoriaHTML
  };
})();
