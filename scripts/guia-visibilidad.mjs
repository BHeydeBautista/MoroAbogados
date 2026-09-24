/**
 * Prende y apaga la guia "Sociedad Automatizada" renombrando su carpeta.
 *
 * Con el guion bajo, `_sociedad-automatizada` es una private folder de Next:
 * no se rutea y, como nada la importa, tampoco se compila. Eso importa mas
 * de lo que parece. Cuando la guia vivia en una ruta normal detras de un
 * `notFound()`, la ruta devolvia 404 pero el chunk con el contenido igual se
 * publicaba en /_next/static/chunks/ y su nombre figuraba en el HTML del
 * propio 404: cualquiera que entrara a la URL podia leer la guia entera.
 * Apagada de esta forma no se publica un solo byte.
 *
 *   npm run guia:on   -> visible en local
 *   npm run guia:off  -> oculta
 */
import { existsSync, renameSync } from "node:fs";

const OCULTA = "src/app/_sociedad-automatizada";
const VISIBLE = "src/app/sociedad-automatizada";

const modo = process.argv[2];
if (modo !== "on" && modo !== "off") {
  console.error("Uso: node scripts/guia-visibilidad.mjs <on|off>");
  process.exit(1);
}

const prender = modo === "on";
const origen = prender ? OCULTA : VISIBLE;
const destino = prender ? VISIBLE : OCULTA;

if (existsSync(destino) && !existsSync(origen)) {
  console.log(`La guia ya esta ${prender ? "visible" : "oculta"}.`);
  process.exit(0);
}
if (!existsSync(origen)) {
  console.error(`No encuentro ${origen}. Revisar a mano.`);
  process.exit(1);
}

renameSync(origen, destino);

if (prender) {
  console.log("Guia VISIBLE en /sociedad-automatizada (reiniciar el dev server).");
  console.log("Apagala con `npm run guia:off` ANTES de commitear: si el rename");
  console.log("se commitea prendido, la guia se publica en el proximo deploy.");
} else {
  console.log("Guia OCULTA. No se rutea ni se compila.");
}
