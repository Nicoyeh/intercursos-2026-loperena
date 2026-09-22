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
    
    // { id: 'p01', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'futbol', categoria: 'infantil',   genero: 'mujeres', local: '7-01',  visitante: '7-02',  estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 1 },
    { id: 'p02', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'futbol', categoria: 'juvenil',   genero: 'hombres', local: '10-02',  visitante: '10-01',  estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 3 },
   // { id: 'p03', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'futbol', categoria: 'infantil', genero: 'mujeres', local: '7-01',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 5, marcadorVisitante: 0 },
    // { id: 'p04', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'futbol', categoria: 'infantil',    genero: 'hombres', local: '6-02', visitante: '6-04', estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 3 },
    // { id: 'p05', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'futbol', categoria: 'infantil',    genero: 'hombres', local: '6-03', visitante: '6-02', estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 5 },
   // { id: 'p06', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'futbol', categoria: 'infantil',    genero: 'hombres', local: '7-01', visitante: '7-02', estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 4 },
    { id: 'p07', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'futbol', categoria: 'juvenil',    genero: 'hombres', local: '11-02', visitante: '10-02', estado: 'jugado', marcadorLocal: 6, marcadorVisitante: 3 },

    // { id: 'p08', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'baloncesto', categoria: 'infantil',   genero: 'mujeres', local: '6-01',  visitante: '6-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 3},
    { id: 'p09', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'baloncesto', categoria: 'prejuvenil',   genero: 'mujeres', local: '9-01',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 14},
    // { id: 'p10', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '6-01',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 0 },
    { id: 'p11', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'baloncesto', categoria: 'juvenil',    genero: 'hombres', local: '10-02', visitante: '10-03', estado: 'jugado', marcadorLocal: 10, marcadorVisitante: 4 },
    // { id: 'p12', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'baloncesto', categoria: 'infantil',    genero: 'hombres', local: '7-03', visitante: '7-04', estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 2 },
    { id: 'p13', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'baloncesto', categoria: 'prejuvenil',    genero: 'mujeres', local: '8-02', visitante: '8-03', estado: 'jugado', marcadorLocal: 5, marcadorVisitante: 6 },
    // { id: 'p14', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'baloncesto', categoria: 'infantil',    genero: 'mujeres', local: '7-01', visitante: '7-02', estado: 'jugado', marcadorLocal: 5, marcadorVisitante: 5 },

    // { id: 'p15', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '7-04',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 },
    // { id: 'p16', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '6-03',  visitante: '6-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    // { id: 'p17', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '6-03',  visitante: '6-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    // { id: 'p18', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'voleibol', categoria: 'infantil',    genero: 'hombres', local: '7-01', visitante: '7-02', estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    { id: 'p19', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'voleibol', categoria: 'juvenil',    genero: 'mujeres', local: '10-01', visitante: '10-03', estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p20', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'voleibol', categoria: 'prejuvenil',    genero: 'mujeres', local: '9-02', visitante: '9-03', estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p21', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'voleibol', categoria: 'juvenil',    genero: 'hombres', local: '11-01', visitante: '10-01', estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 },

    // { id: 'p22', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '6-02',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    // { id: 'p23', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '7-03',  visitante: '7-04',  estado:'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    { id: 'p24', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '8-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    { id: 'p25', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'voleibol', categoria: 'prejuvenil',    genero: 'mujeres', local: '9-01', visitante: '9-02', estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    { id: 'p26', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'voleibol', categoria: 'juvenil',    genero: 'mujeres', local: '11-01', visitante: '11-02', estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 },
    // { id: 'p27', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'voleibol', categoria: 'infantil',    genero: 'hombres', local: '6-04', visitante: '6-01', estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 },
    { id: 'p28', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'voleibol', categoria: 'prejuvenil',    genero: 'hombres', local: '9-01', visitante: '9-03', estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    


  // { id: 'p29', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Recreo', deporte: 'futbol', categoria: 'infantil',   genero: 'mujeres', local: '6-01',  visitante: '6-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 1 },
    // { id: 'p30', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Recreo', deporte: 'baloncesto', categoria: 'infantil',   genero: 'hombres', local: '7-01',  visitante: '7-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 3 },
    { id: 'p31', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'prejuvenil',   genero: 'mujeres', local: '8-03',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p32', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'juvenil',   genero: 'hombres', local: '10-01',  visitante: '10-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 }, 

    { id: 'p33', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Recreo', deporte: 'futbol', categoria: 'prejuvenil',   genero: 'hombres', local: '8-02',  visitante: '8-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    // { id: 'p34', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Recreo', deporte: 'baloncesto', categoria: 'infantil',   genero: 'mujeres', local: '6-01',  visitante: '6-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
   // { id: 'p35', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '7-02',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p36', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'juvenil',   genero: 'mujeres', local: '10-02',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },

    { id: 'p37', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Recreo', deporte: 'futbol', categoria: 'prejuvenil',   genero: 'mujeres', local: '9-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 5 },
    { id: 'p38', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Recreo', deporte: 'baloncesto', categoria: 'prejuvenil',   genero: 'hombres', local: '8-02',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 8 },
    // { id: 'p39', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '6-03',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    // { id: 'p40', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '7-02',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 },

    // { id: 'p41', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Recreo', deporte: 'futbol', categoria: 'infantil',   genero: 'hombres', local: '6-01',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 4 },
    { id: 'p42', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Recreo', deporte: 'baloncesto', categoria: 'prejuvenil',   genero: 'mujeres', local: '8-03',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 10, marcadorVisitante: 0 },
    // { id: 'p43', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '7-01',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p44', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'prejuvenil',   genero: 'hombres', local: '9-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },

    { id: 'p45', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Recreo', deporte: 'futbol', categoria: 'juvenil',   genero: 'mujeres', local: '10-01',  visitante: '10-03', estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 1 },
    // { id: 'p46', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Recreo', deporte: 'baloncesto', categoria: 'infantil',   genero: 'hombres', local: '6-03',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 6 },
    // { id: 'p47', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '6-01',  visitante: '6-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p48', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'prejuvenil',   genero: 'mujeres', local: '8-02',  visitante: '8-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 },

    // --- semana 2 sabados ----

    // { id: 'p49', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:00 - 1:40', deporte: 'futbol', categoria: 'infantil',   genero: 'mujeres', local: '6-04',  visitante: '6-01',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 2 },
    // { id: 'p50', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:40 - 2:20', deporte: 'futbol', categoria: 'infantil',   genero: 'hombres', local: '7-02',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 5 },
    { id: 'p51', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '2:20 - 3:00', deporte: 'futbol', categoria: 'prejuvenil',   genero: 'mujeres', local: '8-03',  visitante: '8-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p52', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:00 - 3:40', deporte: 'futbol', categoria: 'juvenil',   genero: 'hombres', local: '10-01',  visitante: '11-01',  estado: 'jugado', marcadorLocal: 11, marcadorVisitante: 7 },
    // { id: 'p53', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:40 - 4:20', deporte: 'futbol', categoria: 'infantil',   genero: 'hombres', local: '6-03',  visitante: '6-01',  estado: 'jugado', marcadorLocal: 10, marcadorVisitante: 4 },
    { id: 'p54', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '4:20 - 5:00', deporte: 'futbol', categoria: 'juvenil',   genero: 'mujeres', local: '11-01',  visitante: '10-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 3 },
    { id: 'p55', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '5:00 - 5:40', deporte: 'futbol', categoria: 'prejuvenil',   genero: 'mujeres', local: '9-01',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 1 },

    { id: 'p56', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:00 - 1:40', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'hombres', local: '8-03',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 7, marcadorVisitante: 10 },
    // { id: 'p57', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:40 - 2:20', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '6-02',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 16 },
    // { id: 'p58', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '2:20 - 3:00', deporte: 'baloncesto', categoria: 'infantil', genero: 'mujeres', local: '7-04',  visitante: '7-01',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 8 },
    { id: 'p59', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:00 - 3:40', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'mujeres', local: '9-02',  visitante: '8-03',  estado: 'jugado', marcadorLocal: 18, marcadorVisitante: 0 },
    { id: 'p60', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:40 - 4:20', deporte: 'baloncesto', categoria: 'juvenil', genero: 'mujeres', local: '11-02',  visitante: '10-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 18 },
    { id: 'p61', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '4:20 - 5:00', deporte: 'baloncesto', categoria: 'juvenil', genero: 'hombres', local: '11-01',  visitante: '11-02',  estado: 'jugado', marcadorLocal: 25, marcadorVisitante: 26 },
    { id: 'p62  ', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '5:00 - 5:40', deporte: 'baloncesto', categoria: 'juvenil', genero: 'mujeres', local: '10-01',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 2 },

    { id: 'p63', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:00 - 1:40', deporte: 'voleibol', categoria: 'juvenil', genero: 'hombres', local: '10-02',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p64', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:40 - 2:20', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '9-01',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    // { id: 'p65', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '2:20 - 3:00', deporte: 'voleibol', categoria: 'infantil', genero: 'hombres', local: '6-02',  visitante: '6-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p66', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:00 - 3:40', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    // { id: 'p67', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:40 - 4:20', deporte: 'voleibol', categoria: 'infantil', genero: 'hombres', local: '7-01',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p68', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '4:20 - 5:00', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '9-02',  visitante: '8-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p69', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '5:00 - 5:40', deporte: 'voleibol', categoria: 'juvenil', genero: 'hombres', local: '10-02',  visitante: '11-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },

    // { id: 'p70', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:00 - 1:40', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '7-02',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p71', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:40 - 2:20', deporte: 'voleibol', categoria: 'juvenil', genero: 'mujeres', local: '10-03',  visitante: '11-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 },
    // { id: 'p72', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '2:20 - 3:00', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '6-01',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    // { id: 'p73', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:00 - 3:40', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '7-01',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p74', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:40 - 4:20', deporte: 'voleibol', categoria: 'juvenil', genero: 'mujeres', local: '11-01',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    // { id: 'p75', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '4:20 - 5:00', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '6-03',  visitante: '6-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p76', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '5:00 - 5:40', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-02',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },

    // lunes, martes jueves y viernes //
     
    { id: 'p77', fecha: '2026-08-31', fechaTexto: '31 AGO', hora: 'Recreo', deporte: 'futbol', categoria: 'juvenil', genero: 'mujeres', local: '10-03',  visitante: '10-02',  estado: 'jugado', marcadorLocal: 5, marcadorVisitante: 3 },
    // { id: 'p78', fecha: '2026-08-31', fechaTexto: '31 AGO', hora: 'Recreo', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '7-02',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 2 },
    // { id: 'p79', fecha: '2026-08-31', fechaTexto: '31 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil', genero: 'hombres', local: '7-01',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    { id: 'p80', fecha: '2026-08-31', fechaTexto: '31 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },

    { id: 'p81', fecha: '2026-09-01', fechaTexto: '1 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'prejuvenil', genero: 'hombres', local: '9-01',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 2 },
    // { id: 'p82', fecha: '2026-09-01', fechaTexto: '1 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'infantil', genero: 'mujeres', local: '6-03',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    // { id: 'p83', fecha: '2026-09-01', fechaTexto: '1 SEP', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '6-02',  visitante: '6-01',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    { id: 'p84', fecha: '2026-09-01', fechaTexto: '1 SEP', hora: 'Recreo', deporte: 'voleibol', categoria: 'juvenil', genero: 'hombres', local: '10-01',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },

    { id: 'p85', fecha: '2026-09-03', fechaTexto: '3 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'prejuvenil', genero: 'hombres', local: '9-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 4 },
    { id: 'p86', fecha: '2026-09-03', fechaTexto: '3 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'mujeres', local: '9-01',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 6 },
    // { id: 'p87', fecha: '2026-09-03', fechaTexto: '3 SEP', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '7-01',  visitante: '7-02',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    { id: 'p88', fecha: '2026-09-03', fechaTexto: '3 SEP', hora: 'Recreo', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'mujeres', local: '9-03',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    // { id: 'p89', fecha: '2026-09-03', fechaTexto: '3 SEP', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '7-04',  visitante: '7-02',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    { id: 'p90', fecha: '2026-09-03', fechaTexto: '3 SEP', hora: 'Recreo', deporte: 'voleibol', categoria: 'juvenil', genero: 'hombres', local: '11-02',  visitante: '11-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },

    // { id: 'p91', fecha: '2026-09-04', fechaTexto: '4 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'infantil', genero: 'hombres', local: '6-02',  visitante: '6-01',  estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 1 },
    { id: 'p92', fecha: '2026-09-04', fechaTexto: '4 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'juvenil', genero: 'hombres', local: '11-01',  visitante: '11-02',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 12 },
    // { id: 'p93', fecha: '2026-09-04', fechaTexto: '4 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '6-03',  visitante: '6-01',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p94', fecha: '2026-09-04', fechaTexto: '4 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '8-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 3 },
    // { id: 'p95', fecha: '2026-09-04', fechaTexto: '4 SEP', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil', genero: 'hombres', local: '6-03',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2},
    // { id: 'p96', fecha: '2026-09-04', fechaTexto: '4 SEP', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil', genero: 'hombres', local: '6-04',  visitante: '6-02',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    { id: 'p97', fecha: '2026-09-04', fechaTexto: '4 SEP', hora: 'Recreo', deporte: 'voleibol', categoria: 'juvenil', genero: 'mujeres', local: '10-02',  visitante: '10-01',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
 
    // { id: 'p98', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '3:26 - 3:56', deporte: 'futbol', categoria: 'infantil', genero: 'mujeres', local: '7-03',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 3 },
    { id: 'p99', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '3:26 - 3:56', deporte: 'baloncesto', categoria: 'juvenil', genero: 'hombres', local: '10-01',  visitante: '10-02',  estado: 'jugado', marcadorLocal: 5, marcadorVisitante: 12 }, 
    { id: 'p100', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '3:26 - 3:56', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-02',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    // { id: 'p101', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '3:26 - 3:56', deporte: 'baloncesto', categoria: 'infantil', genero: 'mujeres', local: '6-01',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p102', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '5:20 - 5:50', deporte: 'futbol', categoria: 'juvenil', genero: 'hombres', local: '10-01',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 5, marcadorVisitante: 3 },
    // { id: 'p103', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '5:20 - 5:50', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '7-02',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 7, marcadorVisitante: 3 },
    { id: 'p104', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '5:20 - 5:50', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '8-03',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },
    // { id: 'p105', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '5:20 - 5:50', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '6-02',  visitante: '6-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 4 },
    // { id: 'p106', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '5:55 - 6:25', deporte: 'futbol', categoria: 'infantil', genero: 'hombres', local: '7-01',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p107', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '5:55 - 6:25', deporte: 'baloncesto', categoria: 'juvenil', genero: 'mujeres', local: '10-02',  visitante: '10-01',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 4 },
    { id: 'p108', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '5:55 - 6:25', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    // { id: 'p109', fecha: '2026-09-11', fechaTexto: '11 SEP', hora: '5:55 - 6:25', deporte: 'baloncesto', categoria: 'infantil', genero: 'mujeres', local: '6-02',  visitante: '6-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },

    { id: 'p110', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '1:00 - 1:40', deporte: 'futbol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-03',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 5, marcadorVisitante: 1 },
    // { id: 'p111', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '1:40 - 2:20', deporte: 'futbol', categoria: 'infantil', genero: 'hombres', local: '6-03',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 4 },
    // { id: 'p112', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '2:20 - 3:00', deporte: 'futbol', categoria: 'infantil', genero: 'mujeres', local: '7-02',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 1 },
    { id: 'p113', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '3:00 - 3:40', deporte: 'futbol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-02',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 1 },
    { id: 'p114', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '3:40 - 4:20', deporte: 'futbol', categoria: 'juvenil', genero: 'hombres', local: '10-02',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 9, marcadorVisitante: 2 },
    { id: 'p115', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '4:20 - 5:00', deporte: 'futbol', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 8, marcadorVisitante: 1 },
    { id: 'p116', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '5:00 - 5:40', deporte: 'futbol', categoria: 'juvenil', genero: 'hombres', local: '10-03',  visitante: '11-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 10 },
    { id: 'p117', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '6:00 - 6:40', deporte: 'futbol', categoria: 'juvenil', genero: 'mujeres', local: '10-02',  visitante: '11-01',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2 },

    { id: 'p118', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '1:00 - 1:40', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p119', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '1:40 - 2:20', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-03',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p120', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '2:20 - 3:00', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '9-01',  visitante: '8-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p121', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '3:00 - 3:40', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-03',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p122', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '4:20 - 5:00', deporte: 'voleibol', categoria: 'juvenil', genero: 'hombres', local: '10-01',  visitante: '11-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 }, 
    { id: 'p123', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '5:00 - 5:40', deporte: 'voleibol', categoria: 'juvenil', genero: 'mujeres', local: '10-01',  visitante: '11-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p124', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '6:00 - 6:40', deporte: 'voleibol', categoria: 'juvenil', genero: 'hombres', local: '10-02',  visitante: '11-01',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },

    // { id: 'p125', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '1:00 - 1:40', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '7-01',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 5 },
    // { id: 'p126', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '1:40 - 2:20', deporte: 'baloncesto', categoria: 'infantil', genero: 'mujeres', local: '7-01',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 6, marcadorVisitante: 0 },
    { id: 'p127', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '2:20 - 3:00', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'hombres', local: '9-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 6, marcadorVisitante: 2 },
    { id: 'p128', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '3:00 - 3:40', deporte: 'baloncesto', categoria: 'juvenil', genero: 'mujeres', local: '10-02',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 19, marcadorVisitante: 3 },
    // { id: 'p129', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '3:40 - 4:20', deporte: 'baloncesto', categoria: 'infantil', genero: 'mujeres', local: '6-02',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 2 },
    { id: 'p130', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '4:20 - 5:00', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'hombres', local: '9-01',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 20, marcadorVisitante: 6 },
    { id: 'p131', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '5:00 - 5:40', deporte: 'baloncesto', categoria: 'juvenil', genero: 'hombres', local: '10-02',  visitante: '11-01',  estado: 'jugado', marcadorLocal: 17, marcadorVisitante: 12 },
    { id: 'p132', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '6:00 - 6:40', deporte: 'baloncesto', categoria: 'juvenil', genero: 'hombres', local: '10-01',  visitante: '11-02',  estado: 'jugado', marcadorLocal: 12, marcadorVisitante: 30 },
 
    // { id: 'p133', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '1:00 - 1:40', deporte: 'baloncesto', categoria: 'infantil', genero: 'mujeres', local: '7-02',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 10, marcadorVisitante: 2 },
    // { id: 'p134', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '1:40 - 2:20', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '6-01',  visitante: '6-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 0 },
    { id: 'p135', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '2:20 - 3:00', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'mujeres', local: '8-02',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 10 },
    // { id: 'p136', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '3:00 - 3:40', deporte: 'baloncesto', categoria: 'infantil', genero: 'mujeres', local: '7-02',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 10, marcadorVisitante: 2 },
    { id: 'p137', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '3:40 - 4:20', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'hombres', local: '8-03',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 19 },
    // { id: 'p138', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '4:20 - 5:00', deporte: 'baloncesto', categoria: 'infantil', genero: 'mujeres', local: '7-04',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p139', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '5:00 - 5:40', deporte: 'baloncesto', categoria: 'juvenil', genero: 'mujeres', local: '10-03',  visitante: '11-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 8 },
    { id: 'p140', fecha: '2026-09-12', fechaTexto: '12 SEP', hora: '6:00 - 6:40', deporte: 'baloncesto', categoria: 'juvenil', genero: 'mujeres', local: '10-01',  visitante: '11-02',  estado: 'jugado', marcadorLocal: 8, marcadorVisitante: 2 },
  
    // { id: 'p141', fecha: '2026-09-14', fechaTexto: '14 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'infantil', genero: 'mujeres', local: '7-01',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 1 },
    // { id: 'p142', fecha: '2026-09-14', fechaTexto: '14 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'infantil', genero: 'hombres', local: '7-04',  visitante: '7-02',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 3 },
    { id: 'p143', fecha: '2026-09-14', fechaTexto: '14 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'mujeres', local: '8-03',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 9 },

    { id: 'p144', fecha: '2026-09-15', fechaTexto: '15 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'prejuvenil', genero: 'hombres', local: '9-01',  visitante: '8-02',  estado: 'jugado', marcadorLocal: 6, marcadorVisitante: 5 },
    // { id: 'p145', fecha: '2026-09-15', fechaTexto: '15 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'infantil', genero: 'mujeres', local: '6-01',  visitante: '6-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    // { id: 'p146', fecha: '2026-09-15', fechaTexto: '15 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '7-01',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 8 },
   
    // { id: 'p147', fecha: '2026-09-16', fechaTexto: '16 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'infantil', genero: 'mujeres', local: '6-02',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 1 },
    { id: 'p148', fecha: '2026-09-16', fechaTexto: '16 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'prejuvenil', genero: 'hombres', local: '8-03',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 6 },
    { id: 'p149', fecha: '2026-09-16', fechaTexto: '16 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'mujeres', local: '8-02',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 7, marcadorVisitante: 0 },
   
    { id: 'p150', fecha: '2026-09-17', fechaTexto: '17 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'juvenil', genero: 'mujeres', local: '10-01',  visitante: '10-02',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 3 },
    // { id: 'p151', fecha: '2026-09-17', fechaTexto: '17 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'infantil', genero: 'hombres', local: '7-04',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 3 },
    { id: 'p152', fecha: '2026-09-17', fechaTexto: '17 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 6 },
   
    // { id: 'p153', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '1:00 - 1:40', deporte: 'futbol', categoria: 'infantil', genero: 'mujeres', local: '6-03',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 },
    { id: 'p154', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '1:40 - 2:20', deporte: 'futbol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-03',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 0 },
    { id: 'p155', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '2:20 - 3:00', deporte: 'futbol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 0 },
    // { id: 'p156', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '3:00 - 3:40', deporte: 'futbol', categoria: 'infantil', genero: 'hombres', local: '7-01',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 3 },
    { id: 'p157', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '3:40 - 4:20', deporte: 'futbol', categoria: 'juvenil', genero: 'mujeres', local: '11-02',  visitante: '10-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 2 },
    { id: 'p158', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '4:20 - 5:00', deporte: 'futbol', categoria: 'juvenil', genero: 'hombres', local: '11-01',  visitante: '10-02',  estado: 'jugado', marcadorLocal: 6, marcadorVisitante: 11 },
    { id: 'p159', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '5:00 - 5:40', deporte: 'futbol', categoria: 'juvenil', genero: 'hombres', local: '10-01',  visitante: '11-02',  estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 11 },
    { id: 'p160', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '6:00 - 6:40', deporte: 'futbol', categoria: 'juvenil', genero: 'mujeres', local: '11-02',  visitante: '10-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 1 },

    { id: 'p161', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '1:00 - 1:40', deporte: 'futbol', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 4 },
    // { id: 'p162', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '1:40 - 2:20', deporte: 'futbol', categoria: 'infantil', genero: 'mujeres', local: '7-02',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 4 },
    { id: 'p163', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '2:20 - 3:00', deporte: 'futbol', categoria: 'juvenil', genero: 'hombres', local: '11-01',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 5, marcadorVisitante: 1 },
    { id: 'p164', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '3:00 - 3:40', deporte: 'futbol', categoria: 'prejuvenil', genero: 'mujeres', local: '9-01',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 },
    // { id: 'p165', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '3:40 - 4:20', deporte: 'futbol', categoria: 'infantil', genero: 'mujeres', local: '6-02',  visitante: '6-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 3 },
    { id: 'p166', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '4:20 - 5:00', deporte: 'futbol', categoria: 'prejuvenil', genero: 'hombres', local: '9-01',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 4 },    
    { id: 'p167', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '5:00 - 5:40', deporte: 'futbol', categoria: 'juvenil', genero: 'mujeres', local: '11-01',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 4 },

    { id: 'p168', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '1:00 - 1:40', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'hombres', local: '9-01',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 14, marcadorVisitante: 0 },
    { id: 'p169', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '1:40 - 2:20', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'mujeres', local: '9-03',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 12 },

    { id: 'p170', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '3:00 - 3:40', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 6, marcadorVisitante: 10 },
    { id: 'p171', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '3:40 - 4:20', deporte: 'baloncesto', categoria: 'juvenil', genero: 'hombres', local: '10-01',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 17, marcadorVisitante: 15 },
    { id: 'p172', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '4:20 - 5:00', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'mujeres', local: '8-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 10, marcadorVisitante: 6 },
    { id: 'p173', fecha: '2026-09-19', fechaTexto: '19 SEP', hora: '6:00 - 6:40', deporte: 'baloncesto', categoria: 'juvenil', genero: 'mujeres', local: '11-01',  visitante: '10-01',  estado: 'jugado', marcadorLocal: 8, marcadorVisitante: 12 },

    { id: 'p174', fecha: '2026-09-21', fechaTexto: '21 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-02',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 0 },
    { id: 'p175', fecha: '2026-09-21', fechaTexto: '21 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-03',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 1 },
    { id: 'p176', fecha: '2026-09-21', fechaTexto: '21 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'hombres', local: '8-03',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 7 },
   
    { id: 'p177', fecha: '2026-09-22', fechaTexto: '22 SEP', hora: 'Recreo', deporte: 'futbol', categoria: 'prejuvenil', genero: 'hombres', local: '8-03',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p178', fecha: '2026-09-22', fechaTexto: '22 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'juvenil', genero: 'hombres', local: '10-01',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 17, marcadorVisitante: 15 },
    { id: 'p179', fecha: '2026-09-22', fechaTexto: '22 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'mujeres', local: '8-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 10, marcadorVisitante: 6 },
    { id: 'p180', fecha: '2026-09-22', fechaTexto: '22 SEP', hora: 'Recreo', deporte: 'baloncesto', categoria: 'juvenil', genero: 'mujeres', local: '11-01',  visitante: '10-01',  estado: 'jugado', marcadorLocal: 8, marcadorVisitante: 12 },



  ],

  // ⚠️ DATOS DE EJEMPLO / DEMO — este cruce eliminatorio es INVENTADO,
  // solo para mostrar cómo se arman las llaves. Reemplázalo cuando el
  // cruce real esté definido. (Las llaves no se dividen por Hombres/
  // Mujeres todavía — si las necesitas separadas, dímelo y lo agrego.)
  //
  
   
  

  // Estadísticas individuales (MVP, goleadores, mejor arquero, máximos
  // anotadores). Vacío por ahora — esto requiere que alguien registre estos
  // datos partido a partido, y el torneo todavía no ha comenzado. Las
  // estadísticas de EQUIPO (partidos jugados, victorias, derrotas, empates)
  // no están aquí — esas se calculan solas desde "partidos" en
  // js/statistics.js. Formato una vez que haya datos individuales reales:
  //
  // Si tu script consume directamente el objeto de estadísticas individuales:
  estadisticasIndividuales: {
    futbol: {
      mvp: [{nombre: 'Ana Gonzales', equipo: '8-02'}, { nombre: 'Jhondailys Briceño', equipo: '9-03'}, { nombre: 'Sebastian Alvarez', equipo: '9-02'} ],

      goleadores: [
        { nombre: 'Ashley Cassiani', equipo: '10-03', goles: 1 },
        { nombre: 'Nathaly Moscote', equipo: '10-03', goles: 4 },
        { nombre: 'Nicole Rumie', equipo: '10-03', goles: 3 },
        { nombre: 'Kasami Gonzales', equipo: '10-03', goles: 1 },
        { nombre: 'Nezer Manjarres', equipo: '10-03', goles: 6 },
        { nombre: 'Holman Parada', equipo: '10-03', goles: 2 },

        { nombre: 'Andrea Torrijo', equipo: '10-02', goles: 6 },
        { nombre: 'Daniel Ramos', equipo: '10-02', goles: 10 },
        { nombre: 'Duvan Riccioly', equipo: '10-02', goles: 2 },
        { nombre: 'Martin Vizcaino', equipo: '10-02', goles: 4 },
        { nombre: 'Mariana Soto', equipo: '10-02', goles: 2 },
        { nombre: 'Anyelo Gomez', equipo: '10-02', goles: 6},
        { nombre: 'Brayan Pineda', equipo: '10-02', goles: 2},

        { nombre: 'Juan Villar', equipo: '9-01', goles: 3},
        { nombre: 'Faby Marquez', equipo: '9-01', goles: 3},
        { nombre: 'Veronik Vizcaino', equipo: '9-01', goles: 3},
        { nombre: 'Juan Bolaño', equipo: '9-01', goles: 2},
        { nombre: 'Jose Montesino', equipo: '9-01', goles: 1},
        


        { nombre: 'Jose Trujillo', equipo: '9-03', goles: 8},
        { nombre: 'Sergio Colon', equipo: '9-03', goles: 2},
        { nombre: 'Jhondailys Briceño', equipo: '9-03', goles: 3},
        { nombre: 'Carolina Cantillo', equipo: '9-03', goles: 1},
        { nombre: 'Isabella Zarate', equipo: '9-03', goles: 1},
        { nombre: 'Danna Gutierrez', equipo: '9-03', goles: 1},
        { nombre: 'Sara Gonzales', equipo: '9-03', goles: 1}, 
        { nombre: 'Sebastian Rodriguez', equipo: '9-03', goles: 3},

        { nombre: 'Sebastian Alvarez', equipo: '9-02', goles: 4},
        { nombre: 'Emily Machado', equipo: '9-02', goles: 2},
        { nombre: 'Maria Rodriguez', equipo: '9-02', goles: 1},
        { nombre: 'Victor Barrios', equipo: '9-02', goles: 4},
        { nombre: 'Emmanuel Herrera', equipo: '9-02', goles: 3},


        { nombre: 'Angel Camargo', equipo: '6-02', goles: 6},
        { nombre: 'Thiago Arzuaga', equipo: '6-02', goles: 4},
        { nombre: 'David Rojas', equipo: '6-02', goles: 1},
        { nombre: 'Shaylen Salas', equipo: '6-02', goles: 4},

        { nombre: 'Sebastian Barcinilla', equipo: '11-02', goles: 9},
        { nombre: 'Jaime Camargo', equipo: '11-02', goles: 5},
        { nombre: 'Giescy Garcia', equipo: '11-02', goles: 2},
        { nombre: 'Orlando Rondon', equipo: '11-02', goles: 4},
        { nombre: 'Manuel Pallares', equipo: '11-02', goles: 7},
        { nombre: 'Juan Tellez', equipo: '11-02', goles: 4},
        { nombre: 'Xavi Nieves', equipo: '11-02', goles: 2},
        { nombre: 'Diego Camargo', equipo: '11-02', goles: 3},
        { nombre: 'Obed Quiroz 🩶', equipo: '11-02', goles: 2},
        { nombre: 'Danella Alandette', equipo: '11-02', goles: 1},
        { nombre: 'Valeria Mendez', equipo: '11-02', goles: 1},


        { nombre: 'Julio De la rosa', equipo: '11-01', goles: 3},
        { nombre: 'Daniel Valenzuela', equipo: '11-01', goles: 7},
        { nombre: 'Andres Calderon', equipo: '11-01', goles: 2},
        { nombre: 'Mateo Oñate', equipo: '11-01', goles: 4},
        { nombre: 'Zohe Mendoza', equipo: '11-01', goles: 2},
        { nombre: 'Gabriela Lemus', equipo: '11-01', goles: 1},
        { nombre: 'Alejandra Velasquez', equipo: '11-01', goles: 2},
        { nombre: 'Cristobal Rimon', equipo: '11-01', goles: 7},


        { nombre: 'Valeria Sierra', equipo: '10-01', goles: 4},
        { nombre: 'Maria Jose Diaz', equipo: '10-01', goles: 5},
        { nombre: 'Elias Gutierrez', equipo: '10-01', goles: 7},
        { nombre: 'Harold Buelvas', equipo: '10-01', goles: 7},
        { nombre: 'Santiago Carillo', equipo: '10-01', goles: 4},
        { nombre: 'Andres Perez', equipo: '10-01', goles: 3},
        { nombre: 'Marcos Marbello', equipo: '10-01', goles: 1},

        { nombre: 'Valery Guarin', equipo: '6-04', goles: 3},
        { nombre: 'Brandon Lascarro', equipo: '6-04', goles: 5},
        { nombre: 'Cristian Criales', equipo: '6-04', goles: 1}, 
        { nombre: 'Eilin Hernandez', equipo: '6-04', goles: 3}, 
        { nombre: 'Sebastian Conrado', equipo: '6-04', goles: 1},

        { nombre: 'Julian Santodomingo', equipo: '6-03', goles: 1}, 
        { nombre: 'Samuel Mendoza', equipo: '6-03', goles: 1}, 
        { nombre: 'Luis Mercado', equipo: '6-03', goles: 1}, 
        { nombre: 'Jesus Vega', equipo: '6-03', goles: 4}, 
        { nombre: 'Matias Castañeda', equipo: '6-03', goles: 2},
        { nombre: 'Daniel Yirene', equipo: '6-03', goles: 6},
        { nombre: 'Maria Valentina Sarmiento', equipo: '6-03', goles: 5},
       { nombre: 'Valery Montesino', equipo: '6-03', goles: 2},
       

        
        { nombre: 'Valeria Dugarte', equipo: '6-01', goles: 1}, 
        { nombre: 'Yeshua Gamez', equipo: '6-01', goles: 1}, 
        { nombre: 'Mathias Paez', equipo: '6-01', goles: 2}, 
        
        { nombre: 'Luis Rojas', equipo: '7-01', goles: 3}, 
        { nombre: 'Isabella Rodriguez', equipo: '7-01', goles: 4},
        { nombre: 'Hellen Quintero', equipo: '7-01', goles: 7}, 
        { nombre: 'Gabriel Tirado', equipo: '7-01', goles: 1},
        { nombre: 'Julio Sanjuan', equipo: '7-01', goles: 1},
       

        { nombre: 'Luis Jose Moreno', equipo: '7-02', goles: 2}, 
        { nombre: 'Sebastian Buelvas', equipo: '7-02', goles: 4}, 
        { nombre: 'Luis Linares', equipo: '7-02', goles: 2},
        { nombre: 'Mariana Rois', equipo: '7-02', goles: 2},
        { nombre: 'Oriana Rosado', equipo: '7-02', goles: 1},
        
        { nombre: 'Josue Tarazona', equipo: '7-03', goles: 1},
        { nombre: 'Luis Orozco', equipo: '7-03', goles: 2}, 
        { nombre: 'Santiago Montes', equipo: '7-03', goles: 2}, 
        { nombre: 'Oriana Arias', equipo: '7-03', goles: 3},
        { nombre: 'Mauricio Pinto', equipo: '7-03', goles: 6},
        


        { nombre: 'Mariangel Pinto', equipo: '7-04', goles: 3},
        { nombre: 'Princess Justinico', equipo: '7-04', goles: 1},
        { nombre: 'Sebastian Mieles', equipo: '7-04', goles: 1},
        { nombre: 'Pablo Luquez', equipo: '7-04', goles: 2},
        { nombre: 'Liam Castellon', equipo: '7-04', goles: 1},
        { nombre: 'Simon Gnecco', equipo: '7-04', goles: 1},
        { nombre: 'Simon Cotes', equipo: '7-04', goles: 1},
        { nombre: 'Zahara Diaz', equipo: '7-04', goles: 1},
        { nombre: 'Ayelem Gomez', equipo: '7-04', goles: 1},
        { nombre: 'Emily Serrano', equipo: '7-04', goles: 1},

      

        { nombre: 'Santiago Quintero', equipo: '8-02', goles: 9},
        { nombre: 'Luifer Barraza', equipo: '8-02', goles: 4},
        { nombre: 'Yesbelis Guzman', equipo: '8-02', goles: 3}, 
        {nombre: 'Juan Ramos', equipo: '8-02', goles: 2},
        { nombre: 'Pedro Barrios', equipo: '8-02', goles: 3},

        {nombre: 'Sara Olivares', equipo: '8-03', goles: 3},
        {nombre: 'Guadalupe Payares', equipo: '8-03', goles: 1},
        {nombre: 'Isabel Moreno', equipo: '8-03', goles: 2},
        {nombre: 'Navil Benavides', equipo: '8-03', goles: 2},


      ],
      
    },
    baloncesto: {
      mvp: [ { nombre: 'Victor Barrios', equipo: '9-02'}],

      maximosAnotadores: [
        { nombre: 'Luis Daniel Linares', equipo: '7-02', canastas: 4 },
        { nombre: 'Mariana Rois', equipo: '7-02', canastas: 3 },
        { nombre: 'Juan Sebastian Buelvas', equipo: '7-02', canastas: 2 },
        { nombre: 'Oriana Rosado', equipo: '7-02', canastas: 4 },     
        { nombre: 'Isabel Ochoa', equipo: '7-02', canastas: 6 },
        
        { nombre: 'Mariangel Baquero', equipo: '7-01', canastas: 2 },
        { nombre: 'Hellen Quintero', equipo: '7-01', canastas: 7 },
        { nombre: 'Julio Sanjuan', equipo: '7-01', canastas: 2 },
        { nombre: 'Gabriel Tirado', equipo: '7-01', canastas: 1 },
        { nombre: 'Luis Rojas', equipo: '7-01', canastas: 1 },
        
        
        { nombre: 'Luis Orozco', equipo: '7-03', canastas: 4 },
        { nombre: 'Mauricio Pinto', equipo: '7-03', canastas: 4 },
        { nombre: 'Angela Londoño', equipo: '7-03', canastas: 1 },

        { nombre: 'Juan David Rodriguez', equipo: '7-04', canastas: 3 },
        { nombre: 'Pedro Suarez', equipo: '7-04', canastas: 1 },
        { nombre: 'Ayelem Gomez', equipo: '7-04', canastas: 2 },

        { nombre: 'Maria Barros', equipo: '6-03', canastas: 2 },
        { nombre: 'Daniel Yirene', equipo: '6-03', canastas: 2 },

        { nombre: 'Isabella Zarate', equipo: '9-03', canastas: 7 },
        { nombre: 'Gabriela Angarita', equipo: '9-03', canastas: 1 },
        { nombre: 'Elizabeth Benavides', equipo: '9-03', canastas: 2 }, 
        { nombre: 'Jhonder Chourio', equipo: '9-03', canastas: 9 },
        { nombre: 'Samuel Maldonado', equipo: '9-03', canastas: 1 },
        { nombre: 'Alina Buelvas', equipo: '9-03', canastas: 2 },
        { nombre: 'Abigail Rangel', equipo: '9-03', canastas: 1 },
        { nombre: 'Jose Trujillo', equipo: '9-03', canastas: 1 },




        { nombre: 'Thiago Gonzales', equipo: '6-01', canastas: 1 },
        { nombre: 'Thaliana Galindo', equipo: '6-01', canastas: 1 },

        { nombre: 'David Rojas', equipo: '6-02', canastas: 1 },
        { nombre: 'Valeria Martinez', equipo: '6-02', canastas: 1 },
        { nombre: 'Shaylen Salas', equipo: '6-02', canastas: 1 },

        { nombre: 'Angel Anteliz', equipo: '8-03', canastas: 3 },
        { nombre: 'Matias Gutierrez', equipo: '8-03', canastas: 2 },
        { nombre: 'Sara Olivares', equipo: '8-03', canastas: 1 },
        { nombre: 'Isabel Moreno', equipo: '8-03', canastas: 1 },
        { nombre: 'Navil Benavides', equipo: '8-03', canastas: 1 },
        { nombre: 'Jose Pablo Meriño', equipo: '8-03', canastas: 2 },
        { nombre: 'Valerie Gomez', equipo: '8-03', canastas: 2 },

        
        { nombre: 'Sebastian Perez', equipo: '8-02', canastas: 6 },
        { nombre: 'Yesbelis Guzman', equipo: '8-02', canastas: 5 },
        { nombre: 'Valery Mendoza', equipo: '8-02', canastas: 6 },
        { nombre: 'Emiliana Galeano', equipo: '8-02', canastas: 2 },

       
     
        { nombre: 'Juan de Dios Escudero', equipo: '6-04', canastas: 4 },
        { nombre: 'Samuel Lascarro', equipo: '6-04', canastas: 5 },
        { nombre: 'Jose Ochoa', equipo: '6-04', canastas: 2 }, 
        { nombre: 'Valery Guarin', equipo: '6-04', canastas: 2 },
        { nombre: 'Akemis Montero', equipo: '6-04', canastas: 1 },
        
        { nombre: 'Alfonso Garcia', equipo: '9-01', canastas: 6},
        { nombre: 'Juan Vega', equipo: '9-01', canastas: 10 },
        { nombre: 'Juan Bolaño', equipo: '9-01', canastas: 5},
        { nombre: 'Angel Araujo', equipo: '9-01', canastas: 1 },
        { nombre: 'Juan Miguel Villar', equipo: '9-01', canastas: 5 },
        { nombre: 'Jose Montesino', equipo: '9-01', canastas: 1 },
        { nombre: 'Isaad Pediaña', equipo: '9-01', canastas: 1 },
        


        { nombre: 'Anyeli Pacheco', equipo: '9-02', canastas: 19 },
        { nombre: 'Maria Rodriguez', equipo: '9-02', canastas: 3 },
        { nombre: 'Jherainis Reales', equipo: '9-02', canastas: 6 },
        { nombre: 'Victor Barrios', equipo: '9-02', canastas: 9 },
        { nombre: 'Jose Urbina', equipo: '9-02', canastas: 1 },



        { nombre: 'Laura Romo', equipo: '10-01', canastas: 4 },
        { nombre: 'Valery Torres', equipo: '10-01', canastas: 5 },
        { nombre: 'Harold Buelvas', equipo: '10-01', canastas: 15},
        { nombre: 'Fernando Daza', equipo: '10-01', canastas: 1 },
        { nombre: 'Erik Cortes', equipo: '10-01', canastas: 1 },
        { nombre: 'Valeria Sierra', equipo: '10-01', canastas: 4 },
        { nombre: 'Natalia Pineda', equipo: '10-01', canastas: 1 },
        { nombre: 'Jose Daza', equipo: '10-01', canastas: 1 },


        { nombre: 'Felipe Zuñiga', equipo: '10-02', canastas: 5 },
        { nombre: 'Duvan Riccioly', equipo: '10-02', canastas: 9 },
        { nombre: 'Brayan Pineda', equipo: '10-02', canastas: 5 },
        { nombre: 'Sara Angarita', equipo: '10-02', canastas: 4 },
        { nombre: 'Mariangel Arias', equipo: '10-02', canastas: 7 },
        { nombre: 'Andrea Torrijo', equipo: '10-02', canastas: 9 },
        { nombre: 'Jhoiner Chourio', equipo: '10-02', canastas: 1 },

        { nombre: 'Carlos Sanchez', equipo: '10-03', canastas: 6 },
        { nombre: 'Christopher Castaño', equipo: '10-03', canastas: 1 },
        { nombre: 'Kasami Gonzales', equipo: '10-03', canastas: 1 },
        { nombre: 'Emanuel Barros', equipo: '10-03', canastas: 3},

        { nombre: 'Sebastian Madariaga', equipo: '11-01', canastas: 10 },
        { nombre: 'Mateo Oñate', equipo: '11-01', canastas: 4 },
        { nombre: 'Walter Macias', equipo: '11-01', canastas: 1 },
        { nombre: 'Julio De la rosa', equipo: '11-01', canastas: 3},
        { nombre: 'Hernan Vecino', equipo: '11-01', canastas: 1 },
        { nombre: 'Aythana Daza', equipo: '11-01', canastas: 1 },
        { nombre: 'Zohe Mendoza', equipo: '11-01', canastas: 2 },
        { nombre: 'Angela Mejia', equipo: '11-01', canastas: 1 },
        { nombre: 'Alejandra Velasquez', equipo: '11-01', canastas: 1 },
        { nombre: 'Isabella Padilla', equipo: '11-01', canastas: 1 },
        { nombre: 'Laura Viloria', equipo: '11-01', canastas: 2 },


        { nombre: 'Manuel Pallares', equipo: '11-02', canastas: 3 },
        { nombre: 'Samuel Agamez', equipo: '11-02', canastas: 11 },
        { nombre: 'Edinson Parra', equipo: '11-02', canastas: 1 }, 
        { nombre: 'Juan Pablo Guerrero', equipo: '11-02', canastas: 9 },
        { nombre: 'Rosaelina Romero', equipo: '11-02', canastas: 1 },
        { nombre: 'Luis Angarita', equipo: '11-02', canastas: 4 },
        { nombre: 'Carlos Mazenett', equipo: '11-02', canastas: 3 },
        { nombre: 'Danella Alandete', equipo: '11-02', canastas: 2 },

      ]
    },
    voleibol: {
      mvp: [{ nombre: 'Se actualizará cuando comience la siguiente fase: semifinales', equipo: ' los queremos! ❤️🏐'} ],

    }
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
    { nombre: 'Gabriela Rodero y Danna Viña', curso: '6-02', fotos: ['assets/images/gabriela-rodero.jpg', 'assets/images/danna-viña.jpg'] }, 
    { nombre: 'Mateo Oñate y Deiler Benavides', curso: '6-03', fotos: ['assets/images/mateo-oñate.jpg', 'assets/images/deiler-benavides.jpg'] },  
    { nombre: 'Zohe Mendoza y José Acosta', curso: '6-04', fotos: ['assets/images/zohe-mendoza.jpg', 'assets/images/jose-acosta.jpg'] },
    { nombre: 'Kaesee Márquez y Harryz Macías', curso: '7-01', fotos: ['assets/images/kaesee-marquez.jpg', 'assets/images/harryz-macias.jpg'] },
    { nombre: 'Daniel Valenzuela y Stefania Benitez', curso: '7-02', fotos: ['assets/images/daniel-valenzuela.jpg', 'assets/images/stefania-benitez.jpg'] },
    { nombre: 'Gina Mójica y Carlos Mazenett', curso: '7-03', fotos: ['assets/images/gina-mojica.jpg', 'assets/images/carlos-mazenett.jpg'] },
    { nombre: 'Eyleen Padilla y Manuel Pallares', curso: '7-04', fotos: ['assets/images/eyleen-padilla.jpg', 'assets/images/manuel-pallares.png'] },     
    { nombre: 'Sharon Andrade y Santiago Roa', curso: '8-02', fotos: ['assets/images/sharon-andrade.jpg'], fotoGrupal: true },
    { nombre: 'Valeria Mendez y Obed Quiroz', curso: '8-03', fotos: ['assets/images/valeria-mendez.jpg', 'assets/images/obed-quiroz.jpg'] },
    { nombre: 'Nicole Palacio y Luis Manjarrez', curso: '9-01', fotos: ['assets/images/nicole-palacios.jpg', 'assets/images/luis-manjarrez.jpg'] },
    { nombre: 'Laura Fernández y Joao López', curso: '9-02', fotos: ['assets/images/lau-fer.jpg', 'assets/images/joao-lopez.jpg'] },
    { nombre: 'Esteban Martínez y Diego Araujo', curso: '9-03', fotos: ['assets/images/esteban-martinez.jpg'], fotoGrupal: true },
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
        'No se permite el uso de shorts ni faldas en las estudiantes.',
        'No se permite el uso de accesorios como cadenas, relojes, aretes grandes o cualquier objeto que pueda causar accidentes.'

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
        'Quien incurra en faltas graves será expulsado del torneo y podrá generar la eliminación de su equipo.',
        'Más allá del resultado, el espíritu de INTERCURSOS 2026 es la sana competencia entre cursos.'
      ]
    },

    {
      id: 'reglamento-general', titulo: 'Reglamento general', icono: '📜',
      puntos: [
        'Cada curso debe inscribir a su equipo en la fecha establecida y entregar la planilla con nombres completos.',
        'Cada equipo debe presentarse a tiempo (5 minutos antes), de lo contrario perderá el encuentro por inasistencia.',
        'Al plantel educativo solo se permite el ingreso de los estudiantes al momento de los juegos, queda totalmente prohibido la entrada de personas externas a estudiantes y  profesores del colegio.'

      ]
    },

   {
    id: 'hinchas-y-barras',
    titulo: 'Hinchas y barras',
    icono: '👥',
    puntos: [
      'Las barras deben alentar con respeto, evitando insultos, groserías o comportamientos agresivos.',
      'No se permite el uso de objetos que puedan causar daño, interrumpir el desarrollo del partido o perturbar la integridad de los jugadores y espectadores.',
    ]
  },
  {
    id: 'padres-de-familia',
    titulo: 'Acompañantes',
    icono: '👨‍👨‍👧‍👦',
    puntos: [
      'ÚNICAMENTE se acepta el ingreso de padres de familia del grado sexto.',
      'No se permite el ingreso de personas externas como: hermanos, primos, o personas que no hagan parte de la institución.',
    ]
  }
],

};