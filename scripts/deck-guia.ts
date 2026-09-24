/**
 * Genera el PowerPoint de la Guía Sociedad Automatizada.
 *
 * Lee el MISMO archivo de contenido que usa la página (src/data/sociedadAutomatizada.ts),
 * así las diapositivas y el sitio no se pueden desincronizar: se corrige el
 * contenido en un solo lugar y se regenera.
 *
 *   npx tsx scripts/deck-guia.ts
 *
 * Las láminas traen tiempo de avance automático, de modo que
 * Archivo → Exportar → Crear un vídeo produce el recorrido completo sin tocar nada.
 */
import pptxgen from "pptxgenjs";
import {
  PASOS_VISIBLES,
  TRACKS_VISIBLES,
  EJEMPLO,
  completarPlantilla,
  type Bloque,
  type Paso,
  type TrackId,
} from "../src/data/sociedadAutomatizada";

/* ── Paleta del sitio ───────────────────────────────────────────── */
const NAVY = "0F1C2E";
const NAVY_2 = "1B3350";
const ORO = "D4A75D";
const TEAL = "2A6B7C";
const TEAL_HONDO = "1D4D5A";
const PAPEL = "F6F7F9";
const BLANCO = "FFFFFF";
const TINTA = "0F1C2E";
const TINTA_MEDIA = "46566B";
const TINTA_SUAVE = "6B7A8D";
const LINEA = "E3E7EC";
const OK = "2F6B4F";
const ATENCION = "B4762A";
const ALERTA = "A3342B";

const SERIF = "Cambria";
const SANS = "Calibri";
const MONO = "Consolas";

const NIVEL_COLOR = { ok: OK, atencion: ATENCION, alerta: ALERTA } as const;

const W = 13.333;
const H = 7.5;
const M = 0.85; // margen lateral

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Moro Abogados";
pres.company = "Moro Abogados";
pres.title = "Guía Sociedad Automatizada";

/** Segundos que cada lámina queda en pantalla al exportar a vídeo. */
const segundos = { portada: 6, tituloPaso: 5, contenido: 9, prompt: 12, cierre: 7 };
const tiempos: number[] = [];
const nuevaLamina = (secs: number) => {
  tiempos.push(secs);
  return pres.addSlide();
};

const acento = (t: TrackId) => (t === "juridico" ? ORO : TEAL);

/* ── Piezas reutilizables ───────────────────────────────────────── */

function eyebrow(s: any, texto: string, color: string, y = 0.55) {
  s.addText(texto.toUpperCase(), {
    x: M, y, w: W - M * 2, h: 0.3,
    isTextBox: true, margin: 0,
    fontFace: SANS, fontSize: 11, bold: true, charSpacing: 2.5, color,
  });
}

function tituloLamina(s: any, texto: string, color = TINTA, y = 0.95) {
  s.addText(texto, {
    x: M, y, w: W - M * 2, h: 0.85,
    isTextBox: true, margin: 0,
    fontFace: SERIF, fontSize: 30, bold: true, color,
  });
}

function pie(s: any, paso: Paso, n: number) {
  s.addText(paso.titulo, {
    x: M, y: H - 0.55, w: 8, h: 0.3,
    isTextBox: true, margin: 0,
    fontFace: SANS, fontSize: 10, color: TINTA_SUAVE,
  });
  s.addText(String(n), {
    x: W - M - 0.6, y: H - 0.55, w: 0.6, h: 0.3,
    isTextBox: true, margin: 0, align: "right",
    fontFace: SANS, fontSize: 10, color: TINTA_SUAVE,
  });
}

/** Corta un texto largo para que no desborde su caja. */
function recortar(t: string, max: number) {
  return t.length <= max ? t : t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

/* ═══════════════ 1. Portada ═══════════════ */
{
  const s = nuevaLamina(segundos.portada);
  s.background = { color: NAVY };
  s.addText("GUÍA PASO A PASO", {
    x: M, y: 2.2, w: 9, h: 0.32,
    isTextBox: true, margin: 0,
    fontFace: SANS, fontSize: 12, bold: true, charSpacing: 3, color: ORO,
  });
  s.addText("Cómo constituir una\nSociedad Automatizada", {
    x: M, y: 2.75, w: 10.5, h: 2.1,
    isTextBox: true, margin: 0,
    fontFace: SERIF, fontSize: 48, bold: true, color: BLANCO, lineSpacingMultiple: 0.95,
  });
  s.addText(
    "Diez pasos para entender el régimen, elegir qué automatizar y documentar el sistema que la sociedad va a operar.",
    {
      x: M, y: 5.0, w: 9, h: 0.8,
      isTextBox: true, margin: 0,
      fontFace: SANS, fontSize: 16, color: "AAB6C4", lineSpacingMultiple: 1.25,
    }
  );
  s.addText("v1.0  ·  septiembre de 2026", {
    x: M, y: 6.4, w: 5, h: 0.32,
    isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 11, color: ORO,
  });
  s.addNotes(
    "Contenido a futuro: asume la sanción del proyecto en su redacción actual. Documento elaborado con fines informativos. No constituye asesoramiento legal."
  );
}

/* ═══════════════ 2. El recorrido ═══════════════ */
{
  const s = nuevaLamina(segundos.contenido);
  s.background = { color: PAPEL };
  eyebrow(s, "El recorrido", TEAL_HONDO);
  tituloLamina(s, "Cuatro partes, diez pasos");

  const anchoCaja = (W - M * 2 - 0.45 * 3) / 4;
  TRACKS_VISIBLES.forEach((t, i) => {
    const pasos = PASOS_VISIBLES.filter((p) => p.track === t.id);
    const x = M + i * (anchoCaja + 0.45);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.15, w: anchoCaja, h: 3.6, rectRadius: 0.09,
      fill: { color: BLANCO }, line: { color: LINEA, width: 1 },
    });
    s.addShape(pres.ShapeType.ellipse, {
      x: x + 0.32, y: 2.45, w: 0.4, h: 0.4, fill: { color: TEAL },
    });
    s.addText(String(i + 1), {
      x: x + 0.32, y: 2.45, w: 0.4, h: 0.4,
      isTextBox: true, margin: 0, align: "center", valign: "middle",
      fontFace: SANS, fontSize: 12, bold: true, color: BLANCO,
    });
    s.addText(t.nombre, {
      x: x + 0.32, y: 3.0, w: anchoCaja - 0.64, h: 0.75,
      isTextBox: true, margin: 0,
      fontFace: SERIF, fontSize: 18, bold: true, color: TINTA,
    });
    s.addText(t.descripcion, {
      x: x + 0.32, y: 3.85, w: anchoCaja - 0.64, h: 1.1,
      isTextBox: true, margin: 0,
      fontFace: SANS, fontSize: 12, color: TINTA_MEDIA, lineSpacingMultiple: 1.2,
    });
    s.addText(pasos.map((p) => p.corto).join("  ·  "), {
      x: x + 0.32, y: 5.05, w: anchoCaja - 0.64, h: 0.5,
      isTextBox: true, margin: 0,
      fontFace: MONO, fontSize: 9.5, color: TEAL_HONDO,
    });
  });

  s.addText(
    `Ejemplo que atraviesa la guía: ${EJEMPLO.nombre} — ${EJEMPLO.actividad}.`,
    {
      x: M, y: 6.15, w: W - M * 2, h: 0.4,
      isTextBox: true, margin: 0,
      fontFace: SANS, fontSize: 13, italic: true, color: TINTA_SUAVE,
    }
  );
}

/* ═══════════════ Láminas por paso ═══════════════ */

function laminaTituloPaso(paso: Paso, indice: number) {
  const s = nuevaLamina(segundos.tituloPaso);
  s.background = { color: NAVY };
  const track = TRACKS_VISIBLES.find((t) => t.id === paso.track);
  s.addText(`PASO ${indice}`, {
    x: M, y: 2.5, w: 4, h: 0.35,
    isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 13, bold: true, charSpacing: 2.5, color: acento(paso.track),
  });
  s.addText(paso.titulo, {
    x: M, y: 3.05, w: 10.8, h: 1.5,
    isTextBox: true, margin: 0,
    fontFace: SERIF, fontSize: 42, bold: true, color: BLANCO, lineSpacingMultiple: 0.98,
  });
  s.addText(paso.bajada, {
    x: M, y: 4.75, w: 9.6, h: 1.2,
    isTextBox: true, margin: 0,
    fontFace: SANS, fontSize: 16, color: "AAB6C4", lineSpacingMultiple: 1.3,
  });
  s.addText((track?.nombre ?? "").toUpperCase(), {
    x: M, y: 6.4, w: 6, h: 0.3,
    isTextBox: true, margin: 0,
    fontFace: SANS, fontSize: 10, bold: true, charSpacing: 2.2, color: TINTA_SUAVE,
  });
}

function laminaProsa(paso: Paso, indice: number, textos: string[]) {
  const s = nuevaLamina(segundos.contenido);
  s.background = { color: PAPEL };
  eyebrow(s, `Paso ${indice}`, TEAL_HONDO);
  tituloLamina(s, paso.titulo, TINTA);
  s.addText(
    textos.map((t, i) => ({
      text: t,
      options: { breakLine: i < textos.length - 1, paraSpaceAfter: 14 },
    })),
    {
      x: M, y: 2.1, w: W - M * 2 - 0.5, h: 4.3,
      isTextBox: true, margin: 0,
      // Si el texto es corto queda centrado; si es largo, arranca arriba.
      valign: textos.join(" ").length < 420 ? "middle" : "top",
      fontFace: SANS, fontSize: 17, color: TINTA_MEDIA, lineSpacingMultiple: 1.45,
    }
  );
  pie(s, paso, indice);
}

function laminaTabla(paso: Paso, indice: number, b: Extract<Bloque, { type: "fields" }>) {
  const s = nuevaLamina(segundos.contenido);
  s.background = { color: PAPEL };
  eyebrow(s, `Paso ${indice}`, TEAL_HONDO);
  tituloLamina(s, b.title, TINTA);
  if (b.intro) {
    s.addText(b.intro, {
      x: M, y: 1.78, w: W - M * 2, h: 0.4,
      isTextBox: true, margin: 0,
      fontFace: SANS, fontSize: 12.5, color: TINTA_SUAVE,
    });
  }

  const cabecera = b.columnas.map((c) => ({
    text: c.toUpperCase(),
    options: { fontFace: SANS, fontSize: 9.5, bold: true, color: TINTA_SUAVE, charSpacing: 1.4, fill: { color: PAPEL } },
  }));
  // Con muchas filas hay que achicar la tipografía o el texto largo estira
  // las filas y desborda.
  const tam = b.filas.length >= 7 ? 10 : b.filas.length >= 6 ? 10.5 : 11;
  const cuerpo = b.filas.map((f) => [
    {
      text: "● " + f.label,
      options: { fontFace: SANS, fontSize: tam + 0.5, bold: true, color: NIVEL_COLOR[f.nivel] },
    },
    { text: f.origen, options: { fontFace: SANS, fontSize: tam, color: TINTA_MEDIA } },
    {
      text: f.riesgo,
      options: {
        fontFace: SANS, fontSize: tam,
        color: f.nivel === "ok" ? TINTA_MEDIA : NIVEL_COLOR[f.nivel],
      },
    },
  ]);

  // El alto de fila sale del espacio que queda hasta el pie, no de un número
  // fijo: con siete filas la tabla se comía el pie de página.
  const yTabla = b.intro ? 2.3 : 2.0;
  const disponible = H - 1.15 - yTabla;
  const alto = Math.min(0.6, disponible / (b.filas.length + 1));
  s.addTable([cabecera, ...cuerpo], {
    x: M, y: yTabla, w: W - M * 2,
    colW: [3.5, 3.3, 4.83],
    rowH: alto,
    border: { type: "solid", color: LINEA, pt: 0.75 },
    fill: { color: BLANCO },
    valign: "middle",
    margin: 7,
  });
  pie(s, paso, indice);
}

function laminaChecklist(paso: Paso, indice: number, b: Extract<Bloque, { type: "checklist" }>) {
  const s = nuevaLamina(segundos.contenido);
  s.background = { color: PAPEL };
  eyebrow(s, `Paso ${indice}`, TEAL_HONDO);
  tituloLamina(s, b.title, TINTA);
  let y = 1.85;
  if (b.intro) {
    s.addText(b.intro, {
      x: M, y, w: W - M * 2, h: 0.38,
      isTextBox: true, margin: 0,
      fontFace: SANS, fontSize: 12.5, color: TINTA_SUAVE,
    });
    y += 0.55;
  }
  const alto = Math.min(0.72, (5.4 - y) / b.items.length);
  b.items.forEach((item, i) => {
    const yy = y + i * alto;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y: yy, w: W - M * 2, h: alto - 0.12, rectRadius: 0.06,
      fill: { color: BLANCO }, line: { color: LINEA, width: 0.75 },
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: M + 0.22, y: yy + (alto - 0.12) / 2 - 0.11, w: 0.22, h: 0.22, rectRadius: 0.04,
      fill: { color: TEAL },
    });
    s.addText(item, {
      x: M + 0.62, y: yy, w: W - M * 2 - 0.9, h: alto - 0.12,
      isTextBox: true, margin: 0, valign: "middle",
      fontFace: SANS, fontSize: 13.5, color: TINTA_MEDIA,
    });
  });
  if (b.conclusion) {
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y: 5.6, w: W - M * 2, h: 0.6, rectRadius: 0.06,
      fill: { color: NAVY },
    });
    s.addText(b.conclusion, {
      x: M + 0.35, y: 5.6, w: W - M * 2 - 0.7, h: 0.6,
      isTextBox: true, margin: 0, valign: "middle",
      fontFace: SANS, fontSize: 13.5, bold: true, color: ORO,
    });
  }
  pie(s, paso, indice);
}

function laminaFlujo(paso: Paso, indice: number, b: Extract<Bloque, { type: "flow" }>) {
  const s = nuevaLamina(segundos.contenido);
  s.background = { color: PAPEL };
  eyebrow(s, `Paso ${indice}`, TEAL_HONDO);
  tituloLamina(s, b.title, TINTA);
  const n = b.nodos.length;
  const ancho = (W - M * 2 - 0.4 * (n - 1)) / n;
  b.nodos.forEach((nodo, i) => {
    const x = M + i * (ancho + 0.4);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.3, w: ancho, h: 3.3, rectRadius: 0.09,
      fill: { color: BLANCO }, line: { color: LINEA, width: 1 },
    });
    s.addShape(pres.ShapeType.ellipse, {
      x: x + 0.28, y: 2.6, w: 0.42, h: 0.42, fill: { color: TEAL },
    });
    s.addText(String(i + 1), {
      x: x + 0.28, y: 2.6, w: 0.42, h: 0.42,
      isTextBox: true, margin: 0, align: "center", valign: "middle",
      fontFace: MONO, fontSize: 12, bold: true, color: BLANCO,
    });
    s.addText(nodo.label, {
      x: x + 0.28, y: 3.18, w: ancho - 0.56, h: 0.62,
      isTextBox: true, margin: 0,
      fontFace: SERIF, fontSize: 15, bold: true, color: TINTA,
    });
    s.addText(recortar(nodo.detalle, 155), {
      x: x + 0.28, y: 3.85, w: ancho - 0.56, h: 1.5,
      isTextBox: true, margin: 0,
      fontFace: SANS, fontSize: 11, color: TINTA_MEDIA, lineSpacingMultiple: 1.2,
    });
    if (i < n - 1) {
      s.addText("→", {
        x: x + ancho + 0.05, y: 3.75, w: 0.3, h: 0.3,
        isTextBox: true, margin: 0, align: "center",
        fontFace: SANS, fontSize: 16, color: LINEA,
      });
    }
  });
  pie(s, paso, indice);
}

function laminaNota(paso: Paso, indice: number, b: Extract<Bloque, { type: "note" }>) {
  const color = b.tone === "warn" ? ATENCION : b.tone === "legal" ? NAVY : TEAL;
  const s = nuevaLamina(segundos.contenido);
  s.background = { color: BLANCO };
  eyebrow(s, `Paso ${indice}`, TEAL_HONDO);
  // La caja se ajusta al texto: con una nota corta, una caja fija de 4.6
  // quedaba medio vacía y se leía como un error de maquetado.
  const lineas = Math.ceil(b.text.length / 92);
  const altoTexto = Math.max(0.9, lineas * 0.34);
  const altoCaja = Math.min(4.9, 1.5 + altoTexto);
  const yCaja = 1.5 + (4.9 - altoCaja) / 2;

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: yCaja, w: W - M * 2, h: altoCaja, rectRadius: 0.12,
    fill: { color: PAPEL }, line: { color, width: 1.25 },
  });
  s.addText(b.title, {
    x: M + 0.55, y: yCaja + 0.4, w: W - M * 2 - 1.1, h: 0.7,
    isTextBox: true, margin: 0,
    fontFace: SERIF, fontSize: 25, bold: true, color,
  });
  s.addText(b.text, {
    x: M + 0.55, y: yCaja + 1.15, w: W - M * 2 - 1.1, h: altoCaja - 1.5,
    isTextBox: true, margin: 0,
    fontFace: SANS, fontSize: 16, color: TINTA_MEDIA, lineSpacingMultiple: 1.4,
  });
  pie(s, paso, indice);
}

function laminaClausula(paso: Paso, indice: number, b: Extract<Bloque, { type: "clause" }>) {
  const s = nuevaLamina(segundos.contenido);
  s.background = { color: PAPEL };
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.9, fill: { color: NAVY } });
  s.addText(b.docTitle, {
    x: M, y: 0.28, w: W - M * 2, h: 0.35,
    isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 12, charSpacing: 1.5, color: ORO,
  });
  const alto = 4.6 / b.articulos.length;
  b.articulos.forEach((art, i) => {
    const runs: any[] = [{ text: art.numero + " — ", options: { bold: true, color: TINTA } }];
    art.partes.forEach((p) =>
      runs.push({ text: p.text, options: p.strong ? { bold: true, color: TINTA } : { color: TINTA_MEDIA } })
    );
    s.addText(runs, {
      x: M + 0.3, y: 1.45 + i * alto, w: W - M * 2 - 0.6, h: alto - 0.2,
      isTextBox: true, margin: 0,
      fontFace: SERIF, fontSize: 16, lineSpacingMultiple: 1.5,
    });
  });
  pie(s, paso, indice);
}

function laminaPrompt(paso: Paso, indice: number, b: Extract<Bloque, { type: "prompt" }>) {
  const texto = completarPlantilla(b.template, {});

  const s = nuevaLamina(segundos.prompt);
  s.background = { color: NAVY };
  s.addText("PREGUNTALE A LA IA", {
    x: M, y: 0.5, w: 6, h: 0.3,
    isTextBox: true, margin: 0,
    fontFace: SANS, fontSize: 10.5, bold: true, charSpacing: 2.5, color: ORO,
  });
  s.addText(b.title, {
    x: M, y: 0.9, w: W - M * 2, h: 0.6,
    isTextBox: true, margin: 0,
    fontFace: SERIF, fontSize: 24, bold: true, color: BLANCO,
  });

  // El prompt, en caja tipo terminal.
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 1.65, w: 7.6, h: 4.9, rectRadius: 0.08,
    fill: { color: NAVY_2 },
  });
  s.addText(recortar(texto, 1150), {
    x: M + 0.3, y: 1.85, w: 7.0, h: 4.5,
    isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 9.5, color: "D9E0E9", lineSpacingMultiple: 1.25,
  });

  // Lista de verificación al costado: reemplaza al "si la respuesta es la esperada".
  const xv = M + 8.0;
  const anchoV = W - M - xv;
  s.addText("ANTES DE AVANZAR, REVISÁ", {
    x: xv, y: 1.65, w: anchoV, h: 0.3,
    isTextBox: true, margin: 0,
    fontFace: SANS, fontSize: 9.5, bold: true, charSpacing: 1.8, color: TINTA_SUAVE,
  });
  b.verificar.forEach((v, i) => {
    const y = 2.1 + i * 1.0;
    s.addShape(pres.ShapeType.roundRect, {
      x: xv, y, w: 0.22, h: 0.22, rectRadius: 0.04, fill: { color: ORO },
    });
    s.addText(v, {
      x: xv + 0.4, y: y - 0.06, w: anchoV - 0.4, h: 0.9,
      isTextBox: true, margin: 0,
      fontFace: SANS, fontSize: 11.5, color: "AAB6C4", lineSpacingMultiple: 1.2,
    });
  });
  s.addText(paso.titulo, {
    x: M, y: H - 0.55, w: 8, h: 0.3,
    isTextBox: true, margin: 0,
    fontFace: SANS, fontSize: 10, color: TINTA_SUAVE,
  });
  s.addText(String(indice), {
    x: W - M - 0.6, y: H - 0.55, w: 0.6, h: 0.3,
    isTextBox: true, margin: 0, align: "right",
    fontFace: SANS, fontSize: 10, color: TINTA_SUAVE,
  });
  s.addNotes("Prompt completo y listo para copiar en la versión web de la guía.");
}

/* ── Recorrer los pasos ─────────────────────────────────────────── */
PASOS_VISIBLES.forEach((paso, idx) => {
  const n = idx + 1;
  laminaTituloPaso(paso, n);

  // La prosa suelta se agrupa en una sola lámina para no fragmentar la lectura.
  const prosas = paso.bloques.filter((b) => b.type === "prose") as Extract<Bloque, { type: "prose" }>[];
  if (prosas.length) laminaProsa(paso, n, prosas.map((p) => p.text));

  paso.bloques.forEach((b) => {
    switch (b.type) {
      case "fields": laminaTabla(paso, n, b); break;
      case "checklist": laminaChecklist(paso, n, b); break;
      case "flow": laminaFlujo(paso, n, b); break;
      case "note": laminaNota(paso, n, b); break;
      case "clause": laminaClausula(paso, n, b); break;
      case "prompt": laminaPrompt(paso, n, b); break;
      // "prose" ya se agrupó; "crosslink" y "screen" son navegación web, no van al deck.
    }
  });
});

/* ═══════════════ Cierre ═══════════════ */
{
  const s = nuevaLamina(segundos.cierre);
  s.background = { color: NAVY };
  s.addText("La guía completa, paso a paso", {
    x: M, y: 2.6, w: 10, h: 0.9,
    isTextBox: true, margin: 0,
    fontFace: SERIF, fontSize: 36, bold: true, color: BLANCO,
  });
  s.addText(
    "Con los prompts listos para copiar, el avance guardado y los enlaces directos a cada paso.",
    {
      x: M, y: 3.7, w: 9, h: 0.8,
      isTextBox: true, margin: 0,
      fontFace: SANS, fontSize: 16, color: "AAB6C4", lineSpacingMultiple: 1.3,
    }
  );
  s.addText("moroabogados.com.ar/sociedad-automatizada", {
    x: M, y: 4.8, w: 9, h: 0.45,
    isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 16, color: ORO,
  });
  s.addText(
    "Documento elaborado con fines informativos. Las pantallas de trámite que aparecen en la guía son ilustrativas. No constituye asesoramiento legal.",
    {
      x: M, y: 6.3, w: 10.5, h: 0.6,
      isTextBox: true, margin: 0,
      fontFace: SANS, fontSize: 11, color: TINTA_SUAVE, lineSpacingMultiple: 1.3,
    }
  );
}

const salida = process.env.SALIDA || "guia.pptx";
pres.writeFile({ fileName: salida }).then(() => {
  console.log(`Láminas: ${tiempos.length}`);
  console.log(`Duración estimada del vídeo: ${Math.round(tiempos.reduce((a, b) => a + b, 0) / 60)} min`);
  console.log(`Escrito: ${salida}`);
  // Los tiempos de avance se aplican después, sobre el XML.
  require("fs").writeFileSync(
    salida.replace(/\.pptx$/, ".tiempos.json"),
    JSON.stringify(tiempos)
  );
});
