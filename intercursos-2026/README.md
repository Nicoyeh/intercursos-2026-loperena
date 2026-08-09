# INTERCURSOS 2026 — El Mundial del Loperena

**Proyecto completo — las 10 fases están construidas y conectadas.**

Sitio web oficial del torneo deportivo escolar INTERCURSOS 2026. Construido con
HTML5, CSS3 y JavaScript Vanilla — sin frameworks — y pensado para actualizarse
durante todo el torneo editando solo los archivos de datos.

## Cómo verlo

Abre `index.html` directamente en el navegador (doble clic funciona). Si tu
navegador bloquea algo por seguridad de archivos locales, corre un servidor
simple desde esta carpeta:

```
python3 -m http.server 8000
```

y entra a `http://localhost:8000`.

## Estructura del proyecto

```
intercursos-2026/
├── index.html
├── css/
│   ├── styles.css        → variables, layout, componentes (nav, hero, botones, calendario, footer)
│   ├── animations.css    → keyframes y el sistema de "reveal on scroll"
│   └── responsive.css    → ajustes por punto de quiebre
├── js/
│   ├── app.js            → navegación (scroll + menú móvil)
│   ├── animations.js     → partículas, parallax y el observador de reveal-on-scroll
│   ├── data.js            → ★ ÚNICA fuente de datos: categorías, géneros, equipos, partidos y noticias
│   ├── flags.js            → banderaHTML(): arma el <img> de bandera real que usa todo el sitio (ver "Banderas e íconos" más abajo)
│   ├── calendar.js        → renderiza y filtra el calendario (deporte, categoría y género) a partir de data.js
│   ├── bracket.js         → construye las llaves; cada ronda se calcula sola desde la anterior
│   ├── gallery.js         → galería con carrusel (flechas, puntos, arrastre), por deporte y por partido
│   ├── news.js            → sección tipo periódico: noticia destacada + cuadrícula (ver "mostrarNoticias")
│   ├── highlights.js      → "Lo mejor del día": carrusel grande del partido destacado
│   ├── statistics.js      → estadísticas por deporte: líderes de equipo reales + datos de jugador pendientes
│   ├── organization.js    → tarjetas de padrinos y madrinas (vacío hasta que se registren personas reales)
│   ├── rules.js           → reglamento en tarjetas desplegables
│   └── categories.js      → genera los bloques de categoría (con su selector Hombres/Mujeres), sus pestañas y la tabla de posiciones
├── assets/
│   ├── images/    → fotos de partidos, mejores momentos (Fases 5 y 7)
│   ├── flags/      → ★ banderas reales en uso (SVG, 10 países) — ver "Banderas e íconos"
│   ├── icons/       → iconos adicionales
│   └── logos/       → logo oficial del colegio/torneo, si se reemplaza el emblema SVG
└── README.md
```

## Banderas e íconos (sin emoji)

Las banderas de país y los tres balones de la portada son imágenes reales,
no emoji:

- **Banderas** — `assets/flags/*.svg` (una por país: `spain.svg`, `germany.svg`,
  `brazil.svg`, `france.svg`, `portugal.svg`, `colombia.svg`, `belgium.svg`,
  `england.svg`, `norway.svg`, `argentina.svg`). Vienen del paquete
  [flag-icons](https://github.com/lipis/flag-icons) (licencia MIT, proporción
  4:3 uniforme). Cada equipo en `js/data.js` → `equipos` apunta a uno de estos
  archivos por su campo `bandera`; para agregar un país nuevo, pon su SVG en
  `assets/flags/` y apunta ahí. Toda la página arma el `<img>` a través de una
  sola función (`banderaHTML()` en `js/flags.js`), así que para cambiar el
  tamaño o el borde de las banderas en **todo** el sitio a la vez, solo hay
  que tocar la clase `.flag-icon` en `css/styles.css`.
- **Balones** (fútbol, baloncesto, voleibol) — no son archivos aparte: son SVG
  dibujados directamente dentro de `index.html`, dentro de `.hero__art`, dentro
  del bloque de la portada. El de fútbol usa un pentágono central + costuras
  para leerse como balón real; baloncesto y voleibol tienen su propio patrón
  de costuras. Si más adelante quieres reemplazarlos por fotos o ilustraciones
  propias, esos tres `<svg class="ball-svg">` en `index.html` son el único
  lugar que hay que tocar.

## Antes de publicar: lo que falta completar con datos reales

Todo el sitio funciona de verdad, pero varias secciones están vacías o con
datos de ejemplo a propósito — nunca se inventaron nombres de personas
reales ni se usaron fotos que no fueran del torneo. Antes de publicar:

- [ ] **Reemplazar el calendario y las llaves de ejemplo** por el cruce real del torneo (`js/data.js` → `partidos` y `llaves`).
- [ ] **Activar las noticias** cuando tengas titulares reales para publicar (`js/data.js` → cambiar `mostrarNoticias` a `true` y reemplazar/ampliar el arreglo `noticias`).
- [ ] **Revisar "Arbitraje" y "Juego limpio"** en el reglamento (`js/data.js` → `reglamento`) — son una propuesta genérica mía, no vinieron en tu brief original.
- [ ] **Registrar a los padrinos y madrinas reales** (`js/data.js` → `organizacion`, está vacío).
- [ ] **Subir fotos reales** a medida que se jueguen los partidos (`js/data.js` → `galeria`).
- [ ] **Cargar MVP, goleadores y mejor arquero** cuando alguien lleve ese control (`js/data.js` → `estadisticasIndividuales`).

Cada uno de estos puntos está documentado con más detalle en las secciones de abajo.

## Estado del proyecto (desarrollo por fases)

- [x] **Fase 1** — Diseño base: identidad visual, navegación, Hero, animaciones base, responsive.
- [x] **Fase 2** — Calendario del Torneo: filtros por deporte y categoría, tarjetas de partido.
- [x] **Fase 3** — Categorías: tres bloques (Infantil/Prejuvenil/Juvenil), cada uno con selector Hombres/Mujeres, plantel y pestañas internas (Calendario, Tabla y Galería filtran de verdad; Llaves reutiliza el bracket real de esa categoría; Estadísticas remite a la sección general porque ese cálculo no se hace por categoría).
- [x] **Fase 4** — Llaves del torneo: bracket 100% HTML/CSS (sin imágenes), con pases directos para Prejuvenil (6 equipos) y Juvenil (5), y avance automático de ronda.
- [x] **Fase 5** — Galería: carrusel propio por partido jugado (flechas, puntos, arrastre, teclado), organizada por deporte. Sin fotos reales todavía — cada partido muestra "foto pendiente de subir" hasta que subas imágenes reales.
- [x] **Fase 6** — Noticias: sección tipo periódico con una noticia destacada (automática por fecha, o manual con `destacada: true`) y el resto en cuadrícula.
- [x] **Fase 7** — Lo mejor del día: carrusel grande sin abrir otra página, con el partido marcado `momentoDelDia: true` (o el jugado más reciente si ninguno lo está).
- [x] **Fase 8** — Estadísticas por deporte: líderes de equipo (partidos, victorias, empates, derrotas) calculados de verdad; MVP/Goleadores/Mejor arquero/Máximos anotadores marcados como pendientes — requieren datos por jugador que todavía no existen.
- [x] **Fase 9** — Organización: tarjetas de padrinos y madrinas (foto, nombre, curso, selección, cargo). Lista vacía a propósito — no se inventó ningún nombre.
- [x] **Fase 10** — Reglamento en 7 tarjetas desplegables. 5 de 7 usan tu contenido exacto; "Arbitraje" y "Juego limpio" son una propuesta genérica de Claude — revísalas antes de publicar.

## Sistema de diseño

**Paleta** — fondo casi negro con dos acentos premium (azul/violeta y dorado), más un
color fijo por deporte:

| Uso | Variable CSS | Valor |
|---|---|---|
| Fondo principal | `--bg-primary` | `#05060b` |
| Acento primario | `--accent-blue` | `#3d8bff` |
| Acento secundario | `--accent-violet` | `#8b5cf6` |
| Acento "trofeo" | `--accent-gold` | `#f2c14e` |
| Fútbol | `--sport-futbol` | verde `#22c55e` |
| Baloncesto | `--sport-baloncesto` | naranja `#fb923c` |
| Voleibol | `--sport-voleibol` | amarillo `#facc15` |

**Tipografía** — *Big Shoulders Display* para titulares (nace del diseño de números
de camiseta deportiva, por eso encaja con un "Mundial escolar") + *IBM Plex Sans*
para texto, elegida por su buen soporte de cifras tabulares — útil para los
marcadores y estadísticas de las próximas fases.

**Elemento firma** — el badge tipo "marcador de transmisión deportiva" en el Hero
(punto pulsante + fechas en tabular-nums) anticipa el lenguaje visual del
calendario y las futuras estadísticas.

## Cómo actualizar el calendario

Todo el contenido del calendario vive en `js/data.js`. Para agregar o editar un
partido, agrega un objeto al arreglo `partidos`:

```js
{ id: 'p24', fecha: '2026-08-28', fechaTexto: '28 AGO', hora: '15:30',
  deporte: 'futbol', categoria: 'infantil', genero: 'hombres',
  local: '6-01', visitante: '6-03', lugar: 'Cancha 1', estado: 'proximo' }
```

- **`hora`** se escribe en formato 24h (`'15:30'`) — en pantalla se muestra
  sola como `'3:30 p. m.'`, siempre junto a la fecha, tanto en el Calendario
  como dentro de cada Categoría.
- **`genero`** es `'hombres'` o `'mujeres'`.
- **`lugar`** es opcional — si no lo pones, la tarjeta simplemente no muestra
  esa línea (no queda ningún espacio vacío).

Cuando el partido se juegue, cambia `estado` a `'jugado'` y agrega
`marcadorLocal` y `marcadorVisitante`. El diseño y los filtros (deporte,
categoría y ahora también género) se actualizan solos — no hay que tocar
`calendar.js`, `categories.js` ni el CSS.

> Los 23 partidos incluidos ahora son un **ejemplo** para demostrar el
> calendario y sus filtros con los equipos reales ya definidos. Reemplázalos
> por el cruce real del torneo cuando esté definido.

## Categorías por género (Hombres / Mujeres)

Cada uno de los tres bloques de categoría (Infantil, Prejuvenil, Juvenil)
tiene un selector Hombres/Mujeres, igual en estilo a los filtros del
Calendario. Ese selector controla lo que muestran las pestañas Calendario,
Tabla y Galería **dentro de ese bloque** — por eso "cada deporte" queda
dividido por género sin tener que duplicar toda la interfaz en 18 bloques.
No hace falta ninguna lista de equipos por separado: un mismo curso (por
ejemplo `6-01`) puede tener partidos como Hombres y como Mujeres — lo que
distingue una cosa de la otra es el campo `genero` de cada partido, no el
equipo en sí.

## Cómo funciona la Tabla de posiciones (Categorías)

La pestaña "Tabla" de cada categoría se calcula sola a partir de los partidos
con `estado: 'jugado'` en `js/data.js`, filtrados también por el
Hombres/Mujeres que esté activo en ese bloque — no hay que llevar la cuenta
a mano. Suma 3 puntos por victoria y 1 por empate, y muestra una tabla por
deporte (⚽ 🏀 🏐). En cuanto marques un partido como `'jugado'` con su
marcador, la tabla de esa categoría y género se actualiza sola la próxima vez
que se cargue la página.

## Cómo registrar padrinos y madrinas

La lista empieza vacía a propósito — no se inventó ningún nombre. Para
agregar a alguien real, súmalo al arreglo `organizacion` en `js/data.js`:

```js
{ nombre: 'Nombre completo', curso: '11-02', cargo: 'Padrino', foto: null }
// foto: 'assets/images/nombre-apellido.jpg' cuando tengas una foto real
```

El país y la bandera se toman solos del código de curso (`curso`), usando
los mismos datos de `equipos` que usa el resto del sitio.

## Cómo cargar MVP, goleadores y mejor arquero

Los líderes de equipo (partidos, victorias, empates, derrotas) se calculan
solos. El MVP, los goleadores y el mejor arquero son datos **por jugador**
que nadie ha registrado todavía — por eso aparecen como pendientes. En
cuanto la organización lleve ese control, complétalo en
`TORNEO_DATA.estadisticasIndividuales` dentro de `js/data.js`:

```js
futbol: {
  mvp: { nombre: 'Nombre del jugador', equipo: '6-01' },
  goleadores: [ { nombre: 'Nombre', equipo: '6-01', goles: 5 } ],
  mejorArquero: { nombre: 'Nombre', equipo: '7-02' }
}
```

## Cómo cambiar "Lo mejor del día"

Por defecto se destaca el partido jugado más reciente. Para elegir uno a mano
(por ejemplo, el resultado más sorprendente del día en vez del último que se
jugó), agrégale `momentoDelDia: true` a ese partido en `partidos` dentro de
`js/data.js` — quita la marca del anterior si había una.

## Cómo publicar una noticia

Las noticias tienen un interruptor: mientras `TORNEO_DATA.mostrarNoticias` (al
inicio del arreglo `noticias` en `js/data.js`) esté en `false`, la sección
"Noticias" de la página muestra "Todavía no hay noticias publicadas." en vez
de las noticias de ejemplo — sin tarjetas vacías ni huecos raros, porque
reutiliza el mismo estado que ya existía en el diseño para cuando no hay
noticias. El arreglo de ejemplo se queda intacto en el código como plantilla.

Para publicar de verdad:

1. Agrega un objeto al arreglo `noticias` en `js/data.js`:

```js
{ id: 'n07', titular: 'Tu titular aquí', resumen: 'Uno o dos renglones de contexto.',
  fecha: '2026-08-23', fechaTexto: '23 de agosto', categoria: 'infantil', deporte: 'futbol' }
```

2. Cambia `mostrarNoticias` a `true`.

Por defecto se destaca sola la noticia más reciente. Si quieres que otra
aparezca como principal (por ejemplo, una sorpresa grande aunque no sea la
más nueva), agrégale `destacada: true`.

## Cómo agregar fotos reales a la Galería

Por ahora no hay fotos — el torneo no se ha jugado todavía, así que cada
partido muestra un carrusel con "foto pendiente de subir" (completamente
funcional, solo que sin imágenes reales). Para agregar las fotos de un
partido:

1. Sube los archivos a `assets/images/` (recomendado: `.jpg` o `.webp`, comprimidos).
2. En `js/data.js`, agrega una entrada a `galeria` usando el mismo `id` del
   partido (lo encuentras en `partidos`):

```js
galeria: {
  'p01': { fotos: [
    { tipo: 'foto', src: 'assets/images/p01-1.jpg', alt: '6-01 celebra el primer gol' },
    { tipo: 'foto', src: 'assets/images/p01-2.jpg', alt: 'Jugada en el mediocampo' }
  ] }
}
```

El carrusel de ese partido se llena solo con esas fotos — no hay que tocar
`gallery.js` ni el CSS.

## Cómo actualizar las Llaves del Torneo

Las llaves también viven en `js/data.js`, dentro de `TORNEO_DATA.llaves`. Cada
partido de la primera ronda ya tiene sus equipos; para avanzar un equipo a la
ronda siguiente, solo agrega su código en `ganador` (y el marcador si quieres):

```js
{ id: 'inf-cf-3', ronda: 0, local: '7-01', visitante: '7-02', marcadorLocal: 2, marcadorVisitante: 1, ganador: '7-01' }
```

**No hay que tocar nada de la Semifinal ni la Final a mano** — en cuanto
guardes ese cambio, esa ronda calcula sola quién avanza. Los partidos con
`descanso: true` (Prejuvenil y Juvenil, que no tienen un número de equipos
parejo) pasan a la siguiente ronda automáticamente, sin marcador.

## Arquitectura para las próximas fases

- Cualquier tarjeta o bloque nuevo solo necesita la clase `reveal` para animarse
  al hacer scroll. Si el contenido se genera dinámicamente (como el calendario),
  llama a `window.observeReveal(contenedor)` después de insertarlo.
- El componente `.section-header` (eyebrow + título + subtítulo) está listo para
  reutilizarse en Categorías, Galería, Estadísticas, etc.
- Los colores por deporte ya están definidos como variables CSS
  (`--sport-futbol`, `--sport-baloncesto`, `--sport-voleibol`) para usarse en
  todas las fases futuras.

## Créditos

Tipografías: [Big Shoulders Display](https://fonts.google.com/specimen/Big+Shoulders+Display)
y [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans), vía Google Fonts.

Banderas: [flag-icons](https://github.com/lipis/flag-icons) de Panayiotis
Lipiridis, licencia MIT.
