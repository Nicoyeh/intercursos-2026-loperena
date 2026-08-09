# assets/flags

Banderas reales en uso (SVG, proporción 4:3, del paquete MIT
[flag-icons](https://github.com/lipis/flag-icons)). Cada archivo corresponde
a un país usado en `js/data.js` → `equipos`:

| Archivo | País |
|---|---|
| `spain.svg` | España |
| `germany.svg` | Alemania |
| `brazil.svg` | Brasil |
| `france.svg` | Francia |
| `portugal.svg` | Portugal |
| `colombia.svg` | Colombia |
| `belgium.svg` | Bélgica |
| `england.svg` | Inglaterra |
| `norway.svg` | Noruega |
| `argentina.svg` | Argentina |

Para agregar un país nuevo: coloca su SVG aquí (con el mismo nombre claro en
inglés/minúsculas) y apunta a la ruta desde el campo `bandera` del equipo
correspondiente en `js/data.js`. El resto del sitio no necesita ningún otro
cambio — `js/flags.js` arma el `<img>` automáticamente en todas las pantallas
donde aparecen banderas.
