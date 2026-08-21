'use strict';

/* ==========================================================================
   INTERCURSOS 2026 — data.js
   ÚNICA fuente de datos del torneo. Para actualizar el calendario, los
   resultados o agregar equipos, edita solo este archivo — el diseño y la
   lógica de renderizado (calendar.js, categories.js, etc.) no necesitan
   tocarse.

   ⚠️ DATOS DE EJEMPLO / DEMO — dónde están:
   Los arreglos "partidos", "llaves" y "noticias" usan resultados y
   titulares INVENTADOS, solo para mostrar cómo funcionan el calendario, la
   tabla de posiciones, las llaves y las noticias. Cada uno tiene su propio
   comentario "DATOS DE EJEMPLO / DEMO" más abajo. Nada de esto es
   información real del torneo — se pueden dejar como plantilla y
   reemplazar su contenido cuando haya datos reales. Las noticias de
   ejemplo, además, están ocultas al público mientras "mostrarNoticias"
   (justo encima de "noticias", más abajo) esté en false.

   "equipos" SÍ es información real (cursos y países ya definidos) — no es
   contenido de ejemplo.
   ========================================================================== */

const TORNEO_DATA = {

  categorias: {
    infantil:   { nombre: 'Infantil',   color: 'var(--accent-blue)' },
    prejuvenil: { nombre: 'Prejuvenil', color: 'var(--accent-violet)' },
    juvenil:    { nombre: 'Juvenil',    color: 'var(--accent-gold)' }
  },

  // Cada categoría se juega por separado en Hombres y en Mujeres, en los
  // tres deportes (Fútbol, Baloncesto, Voleibol). "genero" es una
  // propiedad de cada partido — ver el arreglo "partidos" más abajo.
  generos: {
    hombres: { nombre: 'Hombres' },
    mujeres: { nombre: 'Mujeres' }
  },

  deportes: {
    futbol:     { nombre: 'Fútbol',     icono: '⚽', color: 'var(--sport-futbol)' },
    baloncesto: { nombre: 'Baloncesto', icono: '🏀', color: 'var(--sport-baloncesto)' },
    voleibol:   { nombre: 'Voleibol',   icono: '🏐', color: 'var(--sport-voleibol)' }
  },

  // "bandera" apunta a un archivo real dentro de assets/flags/ (SVG en
  // alta calidad, no emoji). Para agregar un país nuevo: pon su bandera en
  // assets/flags/ y apunta aquí a esa ruta — ver js/flags.js para cómo se
  // usa esta ruta en pantalla.
  equipos: {
    // ---- Infantil ----
    '6-01': { pais: 'España',     bandera: 'assets/flags/spain.svg',    categoria: 'infantil' },
    '6-02': { pais: 'Alemania',   bandera: 'assets/flags/germany.svg',  categoria: 'infantil' },
    '6-03': { pais: 'Brasil',     bandera: 'assets/flags/brazil.svg',   categoria: 'infantil' },
    '6-04': { pais: 'Francia',    bandera: 'assets/flags/france.svg',   categoria: 'infantil' },
    '7-01': { pais: 'Portugal',   bandera: 'assets/flags/portugal.svg', categoria: 'infantil' },
    '7-02': { pais: 'Colombia',   bandera: 'assets/flags/colombia.svg', categoria: 'infantil' },
    '7-03': { pais: 'Estados Unidos',    bandera: 'assets/flags/estadosunidoss.svg',  categoria: 'infantil' },
    '7-04': { pais: 'Inglaterra', bandera: 'assets/flags/england.svg',  categoria: 'infantil' },

    // ---- Prejuvenil ----
    '8-01': { pais: 'Portugal',   bandera: 'assets/flags/portugal.svg', categoria: 'prejuvenil' },
    '8-02': { pais: 'Brasil',     bandera: 'assets/flags/brazil.svg',   categoria: 'prejuvenil' },
    '8-03': { pais: 'Francia',    bandera: 'assets/flags/france.svg',   categoria: 'prejuvenil' },
    '9-01': { pais: 'Noruega',    bandera: 'assets/flags/norway.svg',   categoria: 'prejuvenil' },
    '9-02': { pais: 'Inglaterra', bandera: 'assets/flags/england.svg',  categoria: 'prejuvenil' },
    '9-03': { pais: 'España',     bandera: 'assets/flags/spain.svg',    categoria: 'prejuvenil' },

    // ---- Juvenil ----
    '10-01': { pais: 'España',     bandera: 'assets/flags/spain.svg',    categoria: 'juvenil' },
    '10-02': { pais: 'Inglaterra', bandera: 'assets/flags/england.svg',  categoria: 'juvenil' },
    '10-03': { pais: 'Portugal',   bandera: 'assets/flags/portugal.svg', categoria: 'juvenil' },
    '11-01': { pais: 'Argentina',  bandera: 'assets/flags/argentina.svg', categoria: 'juvenil' },
    '11-02': { pais: 'Brasil',     bandera: 'assets/flags/brazil.svg',    categoria: 'juvenil' }
  },

  // ⚠️ DATOS DE EJEMPLO / DEMO — resultados y cruce INVENTADOS, solo para
  // mostrar cómo funcionan el calendario, la tabla de posiciones y los
  // filtros (incluido Hombres/Mujeres). Reemplaza este arreglo por el
  // cruce real del torneo cuando esté definido.
  //
  // Cada partido:
  //   hora     → 24h, editable en texto plano (ej. '15:30'). Se muestra
  //              siempre junto a la fecha, en el calendario y en Categorías.
  //   genero   → 'hombres' | 'mujeres'.
  //   lugar    → cancha/lugar, opcional — solo se muestra si el partido lo
  //              trae; omítelo si todavía no está definido.
  //   estado   → 'jugado' | 'proximo'; marcadorLocal/marcadorVisitante
  //              solo si 'jugado'.
  partidos: [
    
    // ---- 22 de agosto ----
    { id: 'p01', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'futbol', categoria: 'infantil',   genero: 'mujeres', local: '7-01',  visitante: '7-02',  estado: 'proximo', },
    { id: 'p02', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'futbol', categoria: 'juvenil',   genero: 'hombres', local: '10-02',  visitante: '10-01',  estado: 'proximo' },
    { id: 'p03', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'futbol', categoria: 'infantil', genero: 'mujeres', local: '7-01',  visitante: '7-04',  estado: 'proximo' },
    { id: 'p04', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'futbol', categoria: 'infantil',    genero: 'hombres', local: '6-02', visitante: '6-04', estado: 'proximo' },
    { id: 'p05', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'futbol', categoria: 'infantil',    genero: 'hombres', local: '6-03', visitante: '6-02', estado: 'proximo' },
    { id: 'p06', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'futbol', categoria: 'infantil',    genero: 'hombres', local: '7-01', visitante: '7-02', estado: 'proximo' },
    { id: 'p07', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'futbol', categoria: 'juvenil',    genero: 'hombres', local: '11-02', visitante: '10-02', estado: 'proximo' },

    { id: 'p08', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'baloncesto', categoria: 'infantil',   genero: 'mujeres', local: '6-01',  visitante: '6-03',  estado: 'proximo', },
    { id: 'p09', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'baloncesto', categoria: 'prejuvenil',   genero: 'mujeres', local: '9-01',  visitante: '9-02',  estado: 'proximo' },
    { id: 'p10', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '6-01',  visitante: '6-04',  estado: 'proximo' },
    { id: 'p11', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'baloncesto', categoria: 'juvenil',    genero: 'hombres', local: '10-02', visitante: '10-03', estado: 'proximo' },
    { id: 'p12', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'baloncesto', categoria: 'infantil',    genero: 'hombres', local: '7-03', visitante: '7-04', estado: 'proximo' },
    { id: 'p13', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'baloncesto', categoria: 'prejuvenil',    genero: 'hombres', local: '8-01', visitante: '8-03', estado: 'proximo' },
    { id: 'p14', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'baloncesto', categoria: 'infantil',    genero: 'mujeres', local: '7-01', visitante: '7-02', estado: 'proximo' },

    { id: 'p15', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '7-04',  visitante: '7-03',  estado: 'proximo', },
    { id: 'p16', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '6-03',  visitante: '6-01',  estado: 'proximo' },
    { id: 'p17', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '6-03',  visitante: '6-02',  estado: 'proximo' },
    { id: 'p18', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'voleibol', categoria: 'infantil',    genero: 'hombres', local: '7-01', visitante: '7-02', estado: 'proximo' },
    { id: 'p19', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'voleibol', categoria: 'juvenil',    genero: 'mujeres', local: '10-01', visitante: '10-03', estado: 'proximo' },
    { id: 'p20', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'voleibol', categoria: 'prejuvenil',    genero: 'mujeres', local: '9-02', visitante: '9-03', estado: 'proximo' },
    { id: 'p21', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'voleibol', categoria: 'juvenil',    genero: 'hombres', local: '11-01', visitante: '10-01', estado: 'proximo' },

    { id: 'p22', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '6-02',  visitante: '6-04',  estado: 'proximo', },
    { id: 'p23', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '7-03',  visitante: '7-04',  estado:'proximo' },
    { id: 'p24', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '8-01',  estado: 'proximo' },
    { id: 'p25', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'voleibol', categoria: 'prejuvenil',    genero: 'mujeres', local: '9-01', visitante: '9-02', estado: 'proximo' },
    { id: 'p26', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'voleibol', categoria: 'juvenil',    genero: 'mujeres', local: '11-01', visitante: '11-02', estado: 'proximo' },
    { id: 'p27', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'voleibol', categoria: 'infantil',    genero: 'hombres', local: '6-04', visitante: '6-01', estado: 'proximo' },
    { id: 'p28', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'voleibol', categoria: 'prejuvenil',    genero: 'hombres', local: '9-01', visitante: '9-03', estado: 'proximo' },

    { id: 'p29', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Por confirmar', deporte: 'futbol', categoria: 'infantil',   genero: 'mujeres', local: '6-01',  visitante: '6-02',  estado: 'proximo', },
    { id: 'p30', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Por confirmar', deporte: 'baloncesto', categoria: 'infantil',   genero: 'hombres', local: '7-01',  visitante: '7-02',  estado: 'proximo', },
    { id: 'p31', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Por confirmar', deporte: 'voleibol', categoria: 'prejuvenil',   genero: 'mujeres', local: '8-01',  visitante: '8-02',  estado: 'proximo', },
    { id: 'p32', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Por confirmar', deporte: 'voleibol', categoria: 'juvenil',   genero: 'hombres', local: '10-01',  visitante: '10-02',  estado: 'proximo', },
    { id: 'p33', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Por confirmar', deporte: 'futbol', categoria: 'prejuvenil',   genero: 'hombres', local: '8-01',  visitante: '8-02',  estado: 'proximo', },
    { id: 'p34', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Por confirmar', deporte: 'baloncesto', categoria: 'infantil',   genero: 'mujeres', local: '6-01',  visitante: '6-02',  estado: 'proximo', },
    { id: 'p35', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Por confirmar', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '7-02',  visitante: '7-04',  estado: 'proximo', },
    { id: 'p36', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Por confirmar', deporte: 'voleibol', categoria: 'juvenil',   genero: 'mujeres', local: '10-02',  visitante: '10-03',  estado: 'proximo' },

    { id: 'p37', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Por confirmar', deporte: 'futbol', categoria: 'prejuvenil',   genero: 'mujeres', local: '9-02',  visitante: '9-03',  estado: 'proximo', },
    { id: 'p38', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Por confirmar', deporte: 'baloncesto', categoria: 'prejuvenil',   genero: 'hombres', local: '9-01',  visitante: '9-02',  estado: 'proximo', },
    { id: 'p39', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Por confirmar', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '6-03',  visitante: '6-04',  estado: 'proximo', },
    { id: 'p40', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Por confirmar', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '7-02',  visitante: '7-03',  estado: 'proximo', },

    { id: 'p41', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Por confirmar', deporte: 'futbol', categoria: 'infantil',   genero: 'hombres', local: '6-01',  visitante: '6-04',  estado: 'proximo', },
    { id: 'p42', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Por confirmar', deporte: 'baloncesto', categoria: 'prejuvenil',   genero: 'mujeres', local: '8-02',  visitante: '8-03',  estado: 'proximo', },
    { id: 'p43', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Por confirmar', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '7-01',  visitante: '7-04',  estado: 'proximo', },
    { id: 'p44', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Por confirmar', deporte: 'voleibol', categoria: 'prejuvenil',   genero: 'hombres', local: '9-02',  visitante: '9-03',  estado: 'proximo', },

    { id: 'p45', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Por confirmar', deporte: 'futbol', categoria: 'juvenil',   genero: 'mujeres', local: '10-01',  visitante: '10-03', estado: 'proximo', },
    { id: 'p46', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Por confirmar', deporte: 'baloncesto', categoria: 'infantil',   genero: 'hombres', local: '6-03',  visitante: '6-04',  estado: 'proximo', },
    { id: 'p47', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Por confirmar', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '6-01',  visitante: '6-02',  estado: 'proximo', },
    { id: 'p48', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Por confirmar', deporte: 'voleibol', categoria: 'prejuvenil',   genero: 'mujeres', local: '8-02',  visitante: '8-03',  estado: 'proximo', }




  ],

  // ⚠️ DATOS DE EJEMPLO / DEMO — este cruce eliminatorio es INVENTADO,
  // solo para mostrar cómo se arman las llaves. Reemplázalo cuando el
  // cruce real esté definido. (Las llaves no se dividen por Hombres/
  // Mujeres todavía — si las necesitas separadas, dímelo y lo agrego.)
  //
  // Cada partido lleva su "ronda"
  // (0 = primera ronda). Desde la ronda 1 en adelante, local/visitante se
  // calculan solos a partir del ganador de la ronda anterior — nunca se
  // editan a mano, solo agrega "ganador" (y el marcador si quieres) cuando
  // un partido se juegue. "descanso: true" marca un pase directo: se usa en
  // Prejuvenil (6 equipos) y Juvenil (5 equipos), que no alcanzan a llenar
  // una llave pareja.
    llaves: {

    /* ================================================================
       INFANTIL — FÚTBOL — HOMBRES
       ================================================================ */
    infantil_futbol_hombres: {
      categoria: 'infantil',
      deporte: 'futbol',
      genero: 'hombres',
      titulo: 'Infantil · Fútbol · Hombres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'inf-fut-m-1',
          ronda: 0,
          local: '6-02',
          visitante: '6-04',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-fut-m-2',
          ronda: 0,
          local: '6-03',
          visitante: '6-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-fut-m-3',
          ronda: 0,
          local: '7-01',
          visitante: '7-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-fut-m-4',
          ronda: 0,
          local: '6-03',
          visitante: '6-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-fut-m-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-fut-m-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-fut-m-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       INFANTIL — FÚTBOL — MUJERES
       ================================================================ */
    infantil_futbol_mujeres: {
      categoria: 'infantil',
      deporte: 'futbol',
      genero: 'mujeres',
      titulo: 'Infantil · Fútbol · Mujeres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'inf-fut-f-1',
          ronda: 0,
          local: '7-01',
          visitante: '7-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-fut-f-2',
          ronda: 0,
          local: '7-01',
          visitante: '7-04',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-fut-f-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-fut-f-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-fut-f-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       INFANTIL — BALONCESTO — HOMBRES
       ================================================================ */
    infantil_baloncesto_hombres: {
      categoria: 'infantil',
      deporte: 'baloncesto',
      genero: 'hombres',
      titulo: 'Infantil · Baloncesto · Hombres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'inf-bal-m-1',
          ronda: 0,
          local: '6-01',
          visitante: '6-04',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-bal-m-2',
          ronda: 0,
          local: '7-03',
          visitante: '7-04',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-bal-m-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-bal-m-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-bal-m-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       INFANTIL — BALONCESTO — MUJERES
       ================================================================ */
    infantil_baloncesto_mujeres: {
      categoria: 'infantil',
      deporte: 'baloncesto',
      genero: 'mujeres',
      titulo: 'Infantil · Baloncesto · Mujeres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'inf-bal-f-1',
          ronda: 0,
          local: '6-01',
          visitante: '6-03',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-bal-f-2',
          ronda: 0,
          local: '7-01',
          visitante: '7-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-bal-f-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-bal-f-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-bal-f-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       INFANTIL — VOLEIBOL — HOMBRES
       ================================================================ */
    infantil_voleibol_hombres: {
      categoria: 'infantil',
      deporte: 'voleibol',
      genero: 'hombres',
      titulo: 'Infantil · Voleibol · Hombres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'inf-vol-m-1',
          ronda: 0,
          local: '7-04',
          visitante: '7-03',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-vol-m-2',
          ronda: 0,
          local: '6-03',
          visitante: '6-01',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-vol-m-3',
          ronda: 0,
          local: '7-01',
          visitante: '7-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-vol-m-4',
          ronda: 0,
          local: '6-04',
          visitante: '6-01',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-vol-m-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-vol-m-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-vol-m-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       INFANTIL — VOLEIBOL — MUJERES
       ================================================================ */
    infantil_voleibol_mujeres: {
      categoria: 'infantil',
      deporte: 'voleibol',
      genero: 'mujeres',
      titulo: 'Infantil · Voleibol · Mujeres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'inf-vol-f-1',
          ronda: 0,
          local: '6-02',
          visitante: '6-04',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-vol-f-2',
          ronda: 0,
          local: '7-03',
          visitante: '7-04',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-vol-f-3',
          ronda: 0,
          local: '6-03',
          visitante: '6-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-vol-f-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'inf-vol-f-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'inf-vol-f-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       PREJUVENIL — FÚTBOL — HOMBRES
       ================================================================ */
    prejuvenil_futbol_hombres: {
      categoria: 'prejuvenil',
      deporte: 'futbol',
      genero: 'hombres',
      titulo: 'Prejuvenil · Fútbol · Hombres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'pre-fut-m-1',
          ronda: 0,
          local: '8-01',
          visitante: '8-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-fut-m-2',
          ronda: 0,
          local: '8-02',
          visitante: '8-01',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'pre-fut-m-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-fut-m-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'pre-fut-m-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       PREJUVENIL — FÚTBOL — MUJERES
       ================================================================ */
    prejuvenil_futbol_mujeres: {
      categoria: 'prejuvenil',
      deporte: 'futbol',
      genero: 'mujeres',
      titulo: 'Prejuvenil · Fútbol · Mujeres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'pre-fut-f-1',
          ronda: 0,
          local: '9-01',
          visitante: '9-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-fut-f-2',
          ronda: 0,
          local: '9-02',
          visitante: '9-03',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'pre-fut-f-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-fut-f-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'pre-fut-f-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       PREJUVENIL — BALONCESTO — HOMBRES
       ================================================================ */
    prejuvenil_baloncesto_hombres: {
      categoria: 'prejuvenil',
      deporte: 'baloncesto',
      genero: 'hombres',
      titulo: 'Prejuvenil · Baloncesto · Hombres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'pre-bal-m-1',
          ronda: 0,
          local: '8-01',
          visitante: '8-03',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-bal-m-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-bal-m-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-bal-m-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       PREJUVENIL — BALONCESTO — MUJERES
       ================================================================ */
    prejuvenil_baloncesto_mujeres: {
      categoria: 'prejuvenil',
      deporte: 'baloncesto',
      genero: 'mujeres',
      titulo: 'Prejuvenil · Baloncesto · Mujeres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'pre-bal-f-1',
          ronda: 0,
          local: '9-01',
          visitante: '9-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-bal-f-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-bal-f-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-bal-f-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       PREJUVENIL — VOLEIBOL — HOMBRES
       ================================================================ */
    prejuvenil_voleibol_hombres: {
      categoria: 'prejuvenil',
      deporte: 'voleibol',
      genero: 'hombres',
      titulo: 'Prejuvenil · Voleibol · Hombres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'pre-vol-m-1',
          ronda: 0,
          local: '8-02',
          visitante: '8-01',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-vol-m-2',
          ronda: 0,
          local: '9-01',
          visitante: '9-03',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'pre-vol-m-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-vol-m-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'pre-vol-m-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       PREJUVENIL — VOLEIBOL — MUJERES
       ================================================================ */
    prejuvenil_voleibol_mujeres: {
      categoria: 'prejuvenil',
      deporte: 'voleibol',
      genero: 'mujeres',
      titulo: 'Prejuvenil · Voleibol · Mujeres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'pre-vol-f-1',
          ronda: 0,
          local: '9-02',
          visitante: '9-03',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-vol-f-2',
          ronda: 0,
          local: '9-01',
          visitante: '9-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'pre-vol-f-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'pre-vol-f-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'pre-vol-f-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       JUVENIL — FÚTBOL — HOMBRES
       ================================================================ */
    juvenil_futbol_hombres: {
      categoria: 'juvenil',
      deporte: 'futbol',
      genero: 'hombres',
      titulo: 'Juvenil · Fútbol · Hombres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'juv-fut-m-1',
          ronda: 0,
          local: '10-02',
          visitante: '10-01',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-fut-m-2',
          ronda: 0,
          local: '11-02',
          visitante: '10-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-fut-m-3',
          ronda: 0,
          local: '11-01',
          visitante: '10-01',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'juv-fut-m-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-fut-m-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'juv-fut-m-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       JUVENIL — FÚTBOL — MUJERES
       ================================================================ */
    juvenil_futbol_mujeres: {
      categoria: 'juvenil',
      deporte: 'futbol',
      genero: 'mujeres',
      titulo: 'Juvenil · Fútbol · Mujeres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'juv-fut-f-1',
          ronda: 0,
          local: '10-01',
          visitante: '10-03',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-fut-f-2',
          ronda: 0,
          local: '11-01',
          visitante: '11-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'juv-fut-f-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-fut-f-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'juv-fut-f-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       JUVENIL — BALONCESTO — HOMBRES
       ================================================================ */
    juvenil_baloncesto_hombres: {
      categoria: 'juvenil',
      deporte: 'baloncesto',
      genero: 'hombres',
      titulo: 'Juvenil · Baloncesto · Hombres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'juv-bal-m-1',
          ronda: 0,
          local: '10-02',
          visitante: '10-03',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'juv-bal-m-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-bal-m-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'juv-bal-m-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       JUVENIL — BALONCESTO — MUJERES
       ================================================================ */
    juvenil_baloncesto_mujeres: {
      categoria: 'juvenil',
      deporte: 'baloncesto',
      genero: 'mujeres',
      titulo: 'Juvenil · Baloncesto · Mujeres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'juv-bal-f-1',
          ronda: 0,
          local: '7-01',
          visitante: '7-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-bal-f-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-bal-f-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'juv-bal-f-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       JUVENIL — VOLEIBOL — HOMBRES
       ================================================================ */
    juvenil_voleibol_hombres: {
      categoria: 'juvenil',
      deporte: 'voleibol',
      genero: 'hombres',
      titulo: 'Juvenil · Voleibol · Hombres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'juv-vol-m-1',
          ronda: 0,
          local: '11-01',
          visitante: '10-01',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-vol-m-2',
          ronda: 0,
          local: '9-01',
          visitante: '9-03',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'juv-vol-m-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-vol-m-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'juv-vol-m-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    },


    /* ================================================================
       JUVENIL — VOLEIBOL — MUJERES
       ================================================================ */
    juvenil_voleibol_mujeres: {
      categoria: 'juvenil',
      deporte: 'voleibol',
      genero: 'mujeres',
      titulo: 'Juvenil · Voleibol · Mujeres',

      rondas: ['Fase inicial', 'Semifinal', 'Final'],

      partidos: [
        {
          id: 'juv-vol-f-1',
          ronda: 0,
          local: '10-01',
          visitante: '10-03',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-vol-f-2',
          ronda: 0,
          local: '11-01',
          visitante: '11-02',
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'juv-vol-f-sf-1',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },
        {
          id: 'juv-vol-f-sf-2',
          ronda: 1,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        },

        {
          id: 'juv-vol-f-f',
          ronda: 2,
          local: null,
          visitante: null,
          marcadorLocal: null,
          marcadorVisitante: null,
          ganador: null
        }
      ]
    }

  },

  // Galería de fotos por partido. Vacío por ahora — el torneo todavía no se
  // ha jugado, así que no hay fotos reales que mostrar. Mientras un partido
  // no tenga entrada aquí, su carrusel muestra "foto pendiente de subir"
  // automáticamente (ver js/gallery.js). Para agregar fotos reales: sube los
  // archivos a assets/images/ y agrega una entrada así, usando el mismo id
  // del partido en "partidos":
  //
  // galeria: {
  //   'p01': { fotos: [
  //     { tipo: 'foto', src: 'assets/images/p01-1.jpg', alt: '6-01 celebra el primer gol' },
  //     { tipo: 'foto', src: 'assets/images/p01-2.jpg', alt: 'Jugada en el mediocampo' }
  //   ] }
  // }
  galeria: {},

  // ⚠️ INTERRUPTOR DE NOTICIAS ⚠️
  // Mientras esto esté en false, la sección "Noticias" de la página NO
  // muestra las noticias de ejemplo de más abajo — en su lugar aparece el
  // mensaje "Todavía no hay noticias publicadas.", ya integrado al diseño
  // actual (no queda ninguna tarjeta vacía). El arreglo "noticias" sigue
  // intacto en el código, listo para reutilizarse como plantilla.
  //
  // Cuando tengas noticias reales para publicar: reemplaza (o agrega a)
  // el arreglo "noticias" de abajo y cambia esta línea a:
  //   mostrarNoticias: true,
  mostrarNoticias: false,

  // ⚠️ DATOS DE EJEMPLO / DEMO — titulares y resultados INVENTADOS, solo
  // para mostrar cómo se ve la sección de Noticias (destacada + cuadrícula,
  // ver js/news.js). No se publican mientras "mostrarNoticias" esté en
  // false. Para publicar una noticia real, agrega un objeto a este mismo
  // arreglo (puedes conservar o borrar los de ejemplo).
  noticias: [
    {
      id: 'n01',
      titular: '11-01 se venga en la llave y elimina a 11-02',
      resumen: 'En la fase de grupos había caído 4-2 frente a 11-02, pero en los Cuartos de Final de la llave de Juvenil, 11-01 dio vuelta la historia con un contundente 3-2 y avanza a semifinal.',
      fecha: '2026-08-21', fechaTexto: '21 de agosto', categoria: 'juvenil', deporte: 'futbol', destacada: true
    },
    {
      id: 'n02',
      titular: '6-01 arranca goleando 3-1 en la fase de grupos',
      resumen: 'Buen inicio de torneo para 6-01, que se impuso 3-1 sobre 6-02 en la primera fecha de Infantil y toma ventaja en la tabla de posiciones.',
      fecha: '2026-08-21', fechaTexto: '21 de agosto', categoria: 'infantil', deporte: 'futbol'
    },
    {
      id: 'n03',
      titular: '8-03 golea 2-0 y avanza en la llave de Prejuvenil',
      resumen: '8-03 no dio ventajas frente a 9-01 y se quedó con un cómodo 2-0 en Cuartos de Final, asegurando su cupo en semifinal.',
      fecha: '2026-08-21', fechaTexto: '21 de agosto', categoria: 'prejuvenil', deporte: 'futbol'
    },
    {
      id: 'n04',
      titular: '9-02 y 9-03 esperan en semifinal tras un pase directo',
      resumen: 'Con seis equipos en Prejuvenil, la llave no cerraba pareja: 9-02 y 9-03 avanzaron directo a semifinal sin jugar, mientras el resto de la categoría se define en la cancha.',
      fecha: '2026-08-21', fechaTexto: '21 de agosto', categoria: 'prejuvenil', deporte: 'futbol'
    },
    {
      id: 'n05',
      titular: '6-03 y 6-04 no se sacaron ventaja: empate 2-2',
      resumen: 'Partido parejo entre 6-03 y 6-04, que se repartieron los puntos con un 2-2 que deja abierta la pelea por el primer lugar de su grupo.',
      fecha: '2026-08-21', fechaTexto: '21 de agosto', categoria: 'infantil', deporte: 'futbol'
    },
    {
      id: 'n06',
      titular: '7-01 y 7-02 firman tablas sin goles',
      resumen: 'Sin goles para ninguno de los dos lados, 7-01 y 7-02 se repartieron un punto en un partido de pocas ocasiones claras.',
      fecha: '2026-08-22', fechaTexto: '22 de agosto', categoria: 'infantil', deporte: 'futbol'
    }
  ],

  // Estadísticas individuales (MVP, goleadores, mejor arquero, máximos
  // anotadores). Vacío por ahora — esto requiere que alguien registre estos
  // datos partido a partido, y el torneo todavía no ha comenzado. Las
  // estadísticas de EQUIPO (partidos jugados, victorias, derrotas, empates)
  // no están aquí — esas se calculan solas desde "partidos" en
  // js/statistics.js. Formato una vez que haya datos individuales reales:
  //
  // futbol: {
  //   mvp: { nombre: 'Nombre del jugador', equipo: '6-01' },
  //   goleadores: [ { nombre: 'Nombre', equipo: '6-01', goles: 5 } ],
  //   mejorArquero: { nombre: 'Nombre', equipo: '7-02' }
  // }
  estadisticasIndividuales: {
    futbol: { mvp: null, goleadores: [], mejorArquero: null },
    baloncesto: { mvp: null, maximosAnotadores: [] },
    voleibol: { mvp: null, maximosAnotadores: [] }
  },

  // Organización: padrinos y madrinas del torneo. Vacío por ahora — todavía
  // no se ha asignado a nadie. No se debe completar con nombres inventados;
  // agrega aquí solo personas reales una vez que la organización las
  // defina, con este formato ("encargado del curso" es el código del equipo en "equipos";
  // el país y la bandera se toman de ahí automáticamente):
  //
   // organizacion: [
   
  //   // foto: 'assets/images/nombre-apellido.jpg' cuando exista una foto real
  // ]
  organizacion: [
    
    { nombre: 'Hilary Gamez y Sarai Mariote', curso: '6-01', fotos: ['assets/images/hilary-gamez.jpg'], fotoGrupal: true },
    { nombre: 'Gabriela Rodero y Alejandra Velasquez', curso: '6-02', fotos: ['assets/images/gabriela-rodero.jpg', 'assets/images/alejandra-velasquez.jpg'] }, 
    { nombre: 'Mateo Oñate y Deiler Benavides', curso: '6-03', fotos: ['assets/images/mateo-oñate.jpg', 'assets/images/deiler-benavides.jpg'] },  
    { nombre: 'Zohe Mendoza y José Acosta', curso: '6-04', fotos: ['assets/images/zohe-mendoza.jpg', 'assets/images/jose-acosta.jpg'] },
    { nombre: 'Kaesee Márquez y Harryz Macías', curso: '7-01', fotos: ['assets/images/kaesee-marquez.jpg', 'assets/images/harryz-macias.jpg'] },
    { nombre: 'Daniel Valenzuela y Stefania Benitez', curso: '7-02', fotos: ['assets/images/daniel-valenzuela.jpg', 'assets/images/stefania-benitez.jpg'] },
    { nombre: 'Gina Mójica y Carlos Mazenett', curso: '7-03', fotos: ['assets/images/gina-mojica.jpg', 'assets/images/carlos-mazenett.jpg'] },
    { nombre: 'Eyleen Padilla y Manuel Pallares', curso: '7-04', fotos: ['assets/images/eyleen-padilla.jpg', 'assets/images/manuel-pallares.png'] },     
    { nombre: 'Jaime Camargo y Giescy García', curso: '8-01', fotos: ['assets/images/jaime-camargo.jpg', 'assets/images/giescy-garcia.jpg'] },
    { nombre: 'Sharon Andrade y Santiago Roa', curso: '8-02', fotos: ['assets/images/sharon-andrade.jpg', 'assets/images/santiago-roa.jpg'] },
    { nombre: 'Valeria Mendez y Obed Quiroz', curso: '8-03', fotos: ['assets/images/valeria-mendez.jpg', 'assets/images/obed-quiroz.jpg'] },
    { nombre: 'Nicole Palacio y Luis Manjarrez', curso: '9-01', fotos: ['assets/images/nicole-palacios.jpg', 'assets/images/luis-manjarrez.jpg'] },
    { nombre: 'Laura Fernández y Joao López', curso: '9-02', fotos: ['assets/images/laura-fernandez.jpg', 'assets/images/joao-lopez.jpg'] },
    { nombre: 'Esteban Martínez y Diego Araujo', curso: '9-03', fotos: ['assets/images/esteban-martinez.jpg', 'assets/images/diego-araujo.jpg'] },
    { nombre: 'Mariangel Rincón y Samuel Gil', curso: '10-01', fotos: ['assets/images/mariangel-rincon.jpg', 'assets/images/samuel-gil.jpg'] },
    { nombre: 'Juan Tellez y Xavi Nieves', curso: '10-02', fotos: ['assets/images/juan-tellez.jpg', 'assets/images/xavi-nieves.jpg'] },
    { nombre: 'Sara Mejía y Samuel Osorio', curso: '10-03', fotos: ['assets/images/sara-mejia.jpg', 'assets/images/samuel-osorio.jpg'] },
    {nombre: 'Jerónimo Herrera', curso: '11-01', fotos: ['assets/images/jeronimo-herrera.jpg'] },
    {nombre: 'Isabel Duarte', curso: '11-02', fotos: ['assets/images/isabel-duarte.jpg'] }
  ],

  // Reglamento, en tarjetas desplegables. El contenido de "arbitraje" y
  // "juego-limpio" es una PROPUESTA GENÉRICA (no vino en el brief original)
  // — revísala y ajústala antes de publicar el sitio. El resto de las
  // tarjetas usa el reglamento que sí definiste.

  reglamento: [
   
    {
      id: 'arbitraje', titulo: 'Arbitraje', icono: '🧑\u200d⚖️',
      puntos: [
        'El valor del arbitraje será de 10.000 pesos por partido. El curso es el responsable de pagarlo (lo pagan entre todos).',

      ]  
    },
    {

      id: 'uniforme', titulo: 'Uniforme', icono: '👕',
      puntos: [
        'Es obligatorio utilizar únicamente el uniforme correspondiente a la selección asignada.',
        'En caso tal de no contar con el uniforme, se deberá utilizar el uniforme de educación física.',
        'Las estudiantes deberán mantener el cabello recogido.',
        'No se permite el uso de shorts ni faldas en las estudiantes.'
      ]
    },
    {
      id: 'tarjetas', titulo: 'Tarjetas', icono: '🟨',
      puntos: [
        'Tarjeta amarilla: 2 minutos de suspensión.',
        'Dos tarjetas amarillas equivalen a una tarjeta roja.',
        'La tarjeta roja implica expulsión y suspensión para el siguiente partido.'
      ]
    },
    {
      id: 'hidratacion', titulo: 'Hidratación', icono: '💧',
      puntos: [
        'La organización no suministrará agua.',
        'Cada participante deberá llevar su propio termo o comprar bebidas en la cafetería.'
      ]
    },
    
    {
      id: 'juego-limpio', titulo: 'Juego limpio', icono: '🤝',
      puntos: [
        'Se espera respeto hacia rivales, compañeros, árbitros y público en todo momento.',
        'No se toleran insultos ni conductas antideportivas.',
        'Más allá del resultado, el espíritu de INTERCURSOS 2026 es la sana competencia entre cursos.'
      ]
    }
  ]
};
