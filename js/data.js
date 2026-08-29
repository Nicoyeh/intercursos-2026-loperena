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
    
    { id: 'p01', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'futbol', categoria: 'infantil',   genero: 'mujeres', local: '7-01',  visitante: '7-02',  estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 1 },
    { id: 'p02', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'futbol', categoria: 'juvenil',   genero: 'hombres', local: '10-02',  visitante: '10-01',  estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 3 },
    { id: 'p03', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'futbol', categoria: 'infantil', genero: 'mujeres', local: '7-01',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 5, marcadorVisitante: 0 },
    { id: 'p04', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'futbol', categoria: 'infantil',    genero: 'hombres', local: '6-02', visitante: '6-04', estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 3 },
    { id: 'p05', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'futbol', categoria: 'infantil',    genero: 'hombres', local: '6-03', visitante: '6-02', estado: 'jugado', marcadorLocal: 3, marcadorVisitante: 5 },
    { id: 'p06', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'futbol', categoria: 'infantil',    genero: 'hombres', local: '7-01', visitante: '7-02', estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 4 },
    { id: 'p07', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'futbol', categoria: 'juvenil',    genero: 'hombres', local: '11-02', visitante: '10-02', estado: 'jugado', marcadorLocal: 6, marcadorVisitante: 3 },

    { id: 'p08', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'baloncesto', categoria: 'infantil',   genero: 'mujeres', local: '6-01',  visitante: '6-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 3},
    { id: 'p09', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'baloncesto', categoria: 'prejuvenil',   genero: 'mujeres', local: '9-01',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 14},
    { id: 'p10', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '6-01',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 0 },
    { id: 'p11', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'baloncesto', categoria: 'juvenil',    genero: 'hombres', local: '10-02', visitante: '10-03', estado: 'jugado', marcadorLocal: 10, marcadorVisitante: 4 },
    { id: 'p12', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'baloncesto', categoria: 'infantil',    genero: 'hombres', local: '7-03', visitante: '7-04', estado: 'jugado', marcadorLocal: 4, marcadorVisitante: 2 },
    { id: 'p13', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'baloncesto', categoria: 'prejuvenil',    genero: 'mujeres', local: '8-02', visitante: '8-03', estado: 'jugado', marcadorLocal: 5, marcadorVisitante: 6 },
    { id: 'p14', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'baloncesto', categoria: 'infantil',    genero: 'mujeres', local: '7-01', visitante: '7-02', estado: 'jugado', marcadorLocal: 5, marcadorVisitante: 5 },

    { id: 'p15', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '7-04',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1, sets: [{local: 10, visitante: 4}, {local: 9, visitante: 10}, {local: 8, visitante: 6}]},
    { id: 'p16', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '6-03',  visitante: '6-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0, sets: [{local: 10, visitante: 6}, {local: 10, visitante: 8}]},
    { id: 'p17', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '6-03',  visitante: '6-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2, sets: [{local: 5, visitante: 10}, {local: 6, visitante: 10}]},
    { id: 'p18', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'voleibol', categoria: 'infantil',    genero: 'hombres', local: '7-01', visitante: '7-02', estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2, sets: [{local: 10, visitante: 6}, {local: 4, visitante: 10}, {local: 1, visitante: 5}]},
    { id: 'p19', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'voleibol', categoria: 'juvenil',    genero: 'mujeres', local: '10-01', visitante: '10-03', estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0, sets: [{local: 10, visitante: 5}, {local: 10, visitante: 7}]},
    { id: 'p20', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'voleibol', categoria: 'prejuvenil',    genero: 'mujeres', local: '9-02', visitante: '9-03', estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2, sets: [{local: 5, visitante: 10}, {local: 10, visitante: 12}]},
    { id: 'p21', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'voleibol', categoria: 'juvenil',    genero: 'hombres', local: '11-01', visitante: '10-01', estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1, sets: [{local: 25, visitante: 18}, {local: 18, visitante: 25}, {local: 10, visitante: 4}]},

    { id: 'p22', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:00 - 1:40', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '6-02',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2, sets: [{local: 12, visitante: 15}, {local: 15, visitante: 6}, {local: 7, visitante: 10}]},
    { id: 'p23', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '1:40 - 2:20', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '7-03',  visitante: '7-04',  estado:'jugado', marcadorLocal: 1, marcadorVisitante: 2, sets: [{local: 10, visitante: 15}, {local: 10, visitante: 5}, {local: 0, visitante: 5}]},
    { id: 'p24', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '2:20 - 3:00', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '8-03',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2, sets: [{local: 5, visitante: 10}, {local: 10, visitante: 6}, {local: 4, visitante: 5}]},
    { id: 'p25', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:00 - 3:40', deporte: 'voleibol', categoria: 'prejuvenil',    genero: 'mujeres', local: '9-01', visitante: '9-02', estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 2, sets: [{local: 10, visitante: 7}, {local: 5, visitante: 10}, {local: 4, visitante: 5}]},
    { id: 'p26', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '3:40 - 4:20', deporte: 'voleibol', categoria: 'juvenil',    genero: 'mujeres', local: '11-01', visitante: '11-02', estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1, sets: [{local: 11, visitante: 15}, {local: 15, visitante: 5}, {local: 5, visitante: 3}]},
    { id: 'p27', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '4:20 - 5:00', deporte: 'voleibol', categoria: 'infantil',    genero: 'hombres', local: '6-04', visitante: '6-01', estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1, sets: [{local: 10, visitante: 5}, {local: 9, visitante: 10}, {local: 5, visitante: 4}]},
    { id: 'p28', fecha: '2026-08-22', fechaTexto: '22 AGO', hora: '5:00 - 5:40', deporte: 'voleibol', categoria: 'prejuvenil',    genero: 'hombres', local: '9-01', visitante: '9-03', estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0, sets: [{local: 15, visitante: 9}, {local: 15, visitante: 11 }]},
    


  { id: 'p29', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Recreo', deporte: 'futbol', categoria: 'infantil',   genero: 'mujeres', local: '6-01',  visitante: '6-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 1 },
    { id: 'p30', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Recreo', deporte: 'baloncesto', categoria: 'infantil',   genero: 'hombres', local: '7-01',  visitante: '7-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 3 },
    { id: 'p31', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'prejuvenil',   genero: 'mujeres', local: '8-03',  visitante: '9-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2, sets: [{local: 3, visitante: 15}, {local: 9, visitante: 15 }]},
    { id: 'p32', fecha: '2026-08-24', fechaTexto: '24 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'juvenil',   genero: 'hombres', local: '10-01',  visitante: '10-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1, sets: [{local: 15, visitante: 13}, {local: 11, visitante: 15}, {local: 5, visitante: 4}]},

    { id: 'p33', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Recreo', deporte: 'futbol', categoria: 'prejuvenil',   genero: 'hombres', local: '8-02',  visitante: '8-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p34', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Recreo', deporte: 'baloncesto', categoria: 'infantil',   genero: 'mujeres', local: '6-01',  visitante: '6-02',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p35', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '7-02',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p36', fecha: '2026-08-25', fechaTexto: '25 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'juvenil',   genero: 'mujeres', local: '10-02',  visitante: '10-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },

    { id: 'p37', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Recreo', deporte: 'futbol', categoria: 'prejuvenil',   genero: 'mujeres', local: '9-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 5 },
    { id: 'p38', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Recreo', deporte: 'baloncesto', categoria: 'prejuvenil',   genero: 'hombres', local: '8-02',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 8 },
    { id: 'p39', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '6-03',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p40', fecha: '2026-08-26', fechaTexto: '26 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '7-02',  visitante: '7-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 },

    { id: 'p41', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Recreo', deporte: 'futbol', categoria: 'infantil',   genero: 'hombres', local: '6-01',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 4 },
    { id: 'p42', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Recreo', deporte: 'baloncesto', categoria: 'prejuvenil',   genero: 'mujeres', local: '8-03',  visitante: '9-01',  estado: 'jugado', marcadorLocal: 10, marcadorVisitante: 0 },
    { id: 'p43', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil',   genero: 'mujeres', local: '7-01',  visitante: '7-04',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },
    { id: 'p44', fecha: '2026-08-27', fechaTexto: '27 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'prejuvenil',   genero: 'hombres', local: '9-02',  visitante: '9-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 0 },

    { id: 'p45', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Recreo', deporte: 'futbol', categoria: 'juvenil',   genero: 'mujeres', local: '10-01',  visitante: '10-03', estado: 'jugado', marcadorLocal: 1, marcadorVisitante: 1 },
    { id: 'p46', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Recreo', deporte: 'baloncesto', categoria: 'infantil',   genero: 'hombres', local: '6-03',  visitante: '6-04',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 6 },
    { id: 'p47', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'infantil',   genero: 'hombres', local: '6-01',  visitante: '6-02',  estado: 'jugado', marcadorLocal: 0, marcadorVisitante: 2 },
    { id: 'p48', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: 'Recreo', deporte: 'voleibol', categoria: 'prejuvenil',   genero: 'mujeres', local: '8-02',  visitante: '8-03',  estado: 'jugado', marcadorLocal: 2, marcadorVisitante: 1 },

    // --- semana 2 sabados ----

    { id: 'p49', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:00 - 1:40', deporte: 'futbol', categoria: 'infantil',   genero: 'mujeres', local: '6-04',  visitante: '6-01',  estado: 'proximo', },
    { id: 'p50', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:40 - 2:20', deporte: 'futbol', categoria: 'infantil',   genero: 'hombres', local: '7-02',  visitante: '7-03',  estado: 'proximo', },
    { id: 'p51', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '2:20 - 3:00', deporte: 'futbol', categoria: 'prejuvenil',   genero: 'mujeres', local: '8-03',  visitante: '8-02',  estado: 'proximo', },
    { id: 'p52', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:00 - 3:40', deporte: 'futbol', categoria: 'juvenil',   genero: 'hombres', local: '10-01',  visitante: '11-01',  estado: 'proximo', },
    { id: 'p53', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:40 - 4:20', deporte: 'futbol', categoria: 'infantil',   genero: 'hombres', local: '6-03',  visitante: '6-01',  estado: 'proximo', },
    { id: 'p54', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '4:20 - 5:00', deporte: 'futbol', categoria: 'juvenil',   genero: 'mujeres', local: '11-01',  visitante: '10-01',  estado: 'proximo', },
    { id: 'p55', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '5:00 - 5:40', deporte: 'futbol', categoria: 'prejuvenil',   genero: 'mujeres', local: '9-01',  visitante: '9-03',  estado: 'proximo', },

    { id: 'p56', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:00 - 1:40', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'hombres', local: '8-03',  visitante: '9-03',  estado: 'proximo', },
    { id: 'p57', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:40 - 2:20', deporte: 'baloncesto', categoria: 'infantil', genero: 'hombres', local: '6-02',  visitante: '6-04',  estado: 'proximo', },
    { id: 'p58', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '2:20 - 3:00', deporte: 'baloncesto', categoria: 'infantil', genero: 'mujeres', local: '7-04',  visitante: '7-01',  estado: 'proximo', },
    { id: 'p59', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:00 - 3:40', deporte: 'baloncesto', categoria: 'prejuvenil', genero: 'mujeres', local: '9-02',  visitante: '8-03',  estado: 'proximo', },
    { id: 'p60', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:40 - 4:20', deporte: 'baloncesto', categoria: 'juvenil', genero: 'mujeres', local: '11-02',  visitante: '10-02',  estado: 'proximo', },
    { id: 'p61', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '4:20 - 5:00', deporte: 'baloncesto', categoria: 'juvenil', genero: 'hombres', local: '11-01',  visitante: '11-02',  estado: 'proximo', },
    { id: 'p62  ', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '5:00 - 5:40', deporte: 'baloncesto', categoria: 'juvenil', genero: 'mujeres', local: '10-01',  visitante: '10-03',  estado: 'proximo', },

    { id: 'p63', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:00 - 1:40', deporte: 'voleibol', categoria: 'juvenil', genero: 'hombres', local: '10-02',  visitante: '10-03',  estado: 'proximo', },
    { id: 'p64', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:40 - 2:20', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '9-01',  visitante: '9-02',  estado: 'proximo', },
    { id: 'p65', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '2:20 - 3:00', deporte: 'voleibol', categoria: 'infantil', genero: 'hombres', local: '6-02',  visitante: '6-03',  estado: 'proximo', },
    { id: 'p66', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:00 - 3:40', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '8-02',  visitante: '9-03',  estado: 'proximo', },
    { id: 'p67', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:40 - 4:20', deporte: 'voleibol', categoria: 'infantil', genero: 'hombres', local: '7-01',  visitante: '7-04',  estado: 'proximo', },
    { id: 'p68', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '4:20 - 5:00', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'hombres', local: '9-02',  visitante: '8-03',  estado: 'proximo', },
    { id: 'p69', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '5:00 - 5:40', deporte: 'voleibol', categoria: 'juvenil', genero: 'hombres', local: '10-02',  visitante: '11-02',  estado: 'proximo', },

    { id: 'p70', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:00 - 1:40', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '7-02',  visitante: '7-03',  estado: 'proximo', },
    { id: 'p71', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '1:40 - 2:20', deporte: 'voleibol', categoria: 'juvenil', genero: 'mujeres', local: '10-03',  visitante: '11-02',  estado: 'proximo', },
    { id: 'p72', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '2:20 - 3:00', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '6-01',  visitante: '6-04',  estado: 'proximo', },
    { id: 'p73', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:00 - 3:40', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '7-01',  visitante: '7-03',  estado: 'proximo', },
    { id: 'p74', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '3:40 - 4:20', deporte: 'voleibol', categoria: 'juvenil', genero: 'mujeres', local: '11-01',  visitante: '10-03',  estado: 'proximo', },
    { id: 'p75', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '4:20 - 5:00', deporte: 'voleibol', categoria: 'infantil', genero: 'mujeres', local: '6-03',  visitante: '6-01',  estado: 'proximo', },
    { id: 'p76', fecha: '2026-08-29', fechaTexto: '29 AGO', hora: '5:00 - 5:40', deporte: 'voleibol', categoria: 'prejuvenil', genero: 'mujeres', local: '8-02',  visitante: '9-02',  estado: 'proximo', },

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
      mvp: [{ nombre: 'Ivanna Fajardo', equipo: '6-02' }, { nombre: 'Luisfer Barraza', equipo: '8-02'}, { nombre: 'Jhondaylis Briceño', equipo: '9-03'}, { nombre: 'Cristian Criales', equipo: '6-04'}, { nombre: 'Nicole Rumie', equipo: '10-03'}],

      goleadores: [
        { nombre: 'Shaylen Salas', equipo: '6-02', goles: 1 },
        { nombre: 'Luisfer Barraza', equipo: '8-02', goles: 1 },
        { nombre: 'Santiago Quintero', equipo: '8-02', goles: 1 },
        { nombre: 'Jhondailys Briceño', equipo: '9-03', goles: 2 },
        { nombre: 'Isabella Zarate', equipo: '9-03', goles: 1 },
        { nombre: 'Carolina Cantillo', equipo: '9-03', goles: 1 },
        { nombre: 'Danna Gutierrez', equipo: '9-03', goles: 1},
        { nombre: 'Juan Guillen', equipo: '6-01', goles: 1},
        { nombre: 'Cristian Criales', equipo: '6-04', goles: 2},
        { nombre: 'Brandon Lascarro', equipo: '6-04', goles: 1},
        { nombre: 'Juan Escudero', equipo: '6-04', goles: 1},
        { nombre: 'Nicole Rumie', equipo: '10-03', goles: 1},
        { nombre: 'Maria José Díaz', equipo: '10-01', goles: 1},


      ],
      mejorArquero: null
    },
    baloncesto: {
      mvp: [{ nombre: 'Luis Linares', equipo: '7-02'}, { nombre: 'Taliana Galindo', equipo: '6-01'}, { nombre: 'Alfonso García', equipo: '9-01'}, { nombre: 'Sara Olivares', equipo: '8-03'}, { nombre: 'Juan de Dios Escudero', equipo: '6-04'} ],
      maximosAnotadores: [
        { nombre: 'Luis Linares', equipo: '7-02', canastas: 1 },
        { nombre: 'Juan Buelvas', equipo: '7-02', canastas: 1 },
        { nombre: 'Julio Sanjuan', equipo: '7-01', canastas: 1 },
        { nombre: 'Taliana Galindo', equipo: '6-01', canastas: 1 },
        { nombre: 'Alfonso García', equipo: '9-01', canastas: 2 },
        { nombre: 'Juan Vega', equipo: '9-01', canastas: 2 },
        { nombre: 'Sebastian Pérez', equipo: '8-02', canastas: 1 },
        { nombre: 'Valery Gómez', equipo: '8-03', canastas: 2 },
        { nombre: 'Sara Olivares', equipo: '8-03', canastas: 2 },
        { nombre: 'Talia Ramos', equipo: '8-03', canastas: 1 },
        { nombre: 'Valery Mendoza', equipo: '8-02', canastas: 1 },
        { nombre: 'Yesbelis Guzmán', equipo: '8-02', canastas: 2 },
        { nombre: 'Juan de Dios Escudero', equipo: '6-04', canastas: 1 },
        { nombre: 'Jose Miguel Ochoa', equipo: '6-04', canastas: 1 },


      ]
    },
    voleibol: {
      mvp: [{ nombre: 'Carlos Reyes', equipo: '10-01' }, { nombre: 'Jherainis Reales', equipo: '9-02' }, { nombre: 'Nicole Rumie', equipo: '10-03' }, { nombre: 'Juan Buelvas', equipo: '7-02' }, { nombre: 'Thaliana Gamarra', equipo: '6-03' }, { nombre: 'Jaliq Pastrana', equipo: '9-02' }, { nombre: 'Hellen Quintero', equipo: '7-01' }, { nombre: 'David Rojas', equipo: '6-02' }, { nombre: 'Valery Mendoza', equipo: '8-02' }],

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
    { nombre: 'Gabriela Rodero y Alejandra Velasquez', curso: '6-02', fotos: ['assets/images/gabriela-rodero.jpg', 'assets/images/alejandra-velasquez.jpg'] }, 
    { nombre: 'Mateo Oñate y Deiler Benavides', curso: '6-03', fotos: ['assets/images/mateo-oñate.jpg', 'assets/images/deiler-benavides.jpg'] },  
    { nombre: 'Zohe Mendoza y José Acosta', curso: '6-04', fotos: ['assets/images/zohe-mendoza.jpg', 'assets/images/jose-acosta.jpg'] },
    { nombre: 'Kaesee Márquez y Harryz Macías', curso: '7-01', fotos: ['assets/images/kaesee-marquez.jpg', 'assets/images/harryz-macias.jpg'] },
    { nombre: 'Daniel Valenzuela y Stefania Benitez', curso: '7-02', fotos: ['assets/images/daniel-valenzuela.jpg', 'assets/images/stefania-benitez.jpg'] },
    { nombre: 'Gina Mójica y Carlos Mazenett', curso: '7-03', fotos: ['assets/images/gina-mojica.jpg', 'assets/images/carlos-mazenett.jpg'] },
    { nombre: 'Eyleen Padilla y Manuel Pallares', curso: '7-04', fotos: ['assets/images/eyleen-padilla.jpg', 'assets/images/manuel-pallares.png'] },     
    { nombre: 'Sharon Andrade y Santiago Roa', curso: '8-02', fotos: ['assets/images/sharon-andrade.jpg'], fotoGrupal: true },
    { nombre: 'Valeria Mendez y Obed Quiroz', curso: '8-03', fotos: ['assets/images/valeria-mendez.jpg', 'assets/images/obed-quiroz.jpg'] },
    { nombre: 'Nicole Palacio y Luis Manjarrez', curso: '9-01', fotos: ['assets/images/nicole-palacios.jpg', 'assets/images/luis-manjarrez.jpg'] },
    { nombre: 'Laura Fernández y Joao López', curso: '9-02', fotos: ['assets/images/joao-lopez.jpg'], fotoGrupal: true },
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
      id: 'hinchas-y-barras', titulo: 'Hinchas y barras', icono: '👥',
      puntos: [
        'Las barras deben alentar con respeto, evitando insultos, groserías o comportamientos agresivos.',
        'No se permite el uso de objetos que puedan causar daño, interrumpir el desarrollo del partido o perturbar la integridad de los jugadores y espectadores.',
      ]
    }
  ]
}