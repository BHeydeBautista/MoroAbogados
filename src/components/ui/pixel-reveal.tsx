"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Revelado pixelado de texto, inspirado en el PixelTextFill de Hyperiux Vault.
 *
 * Tres decisiones distintas al original, todas por el mismo motivo: esto va en
 * una guía que la gente viene a usar, no en una landing.
 *
 * 1. No lo maneja el scroll. El original usa ScrollTrigger sobre una sección
 *    de 250vh: dos pantallas y media de scroll para leer un título. Acá corre
 *    por tiempo al montarse, y dura ~900ms.
 *
 * 2. El texto real nunca queda rehén del canvas. El original deja el <p> en
 *    text-transparent: si el canvas no pinta, no hay texto.
 *
 * 3. Watchdog. No alcanza con "ya dibujé un frame, puedo ocultar el texto":
 *    si el navegador frena las animaciones justo después del primer frame
 *    (pestaña en segundo plano, ahorro de energía), el título quedaría
 *    invisible para siempre. Si pasan más de 250ms sin un frame nuevo, se
 *    restaura el texto y se limpia el canvas.
 */

const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23,
  61, 29, 53, 21,
];

function ruidoHash(x: number, y: number) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/** Bayer ordenado + una pizca de ruido, para que no se lea la grilla. */
function umbralCelda(x: number, y: number) {
  const ordenado = (BAYER[(y & 7) * 8 + (x & 7)] + 0.5) / 64;
  return ordenado * 0.78 + ruidoHash(x, y) * 0.22;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

type Glifo = { char: string; x: number; y: number; ancho: number; alto: number };

const SIN_FRAME_MS = 250;

export default function PixelReveal({
  text,
  className = "",
  colorAcento = "#D4A75D",
  pixel = 3,
  duracion = 900,
  /** Cambiar esta clave vuelve a disparar el efecto. */
  clave,
}: {
  text: string;
  className?: string;
  colorAcento?: string;
  pixel?: number;
  duracion?: number;
  clave?: string;
}) {
  const contenedorRef = useRef<HTMLSpanElement>(null);
  const textoRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Arranca en false: el texto real se ve. Es el estado seguro.
  const [tapado, setTapado] = useState(false);

  useEffect(() => {
    const contenedor = contenedorRef.current;
    const textoEl = textoRef.current;
    const canvas = canvasRef.current;
    if (!contenedor || !textoEl || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number | null = null;
    let vigia: ReturnType<typeof setTimeout> | null = null;
    let vivo = true;

    const rect = contenedor.getBoundingClientRect();
    const ancho = rect.width;
    const alto = rect.height;
    if (ancho < 2 || alto < 2) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const estilos = window.getComputedStyle(textoEl);
    const tam = Number.parseFloat(estilos.fontSize) || 16;
    const fuente = `${estilos.fontStyle} ${estilos.fontWeight} ${tam}px ${estilos.fontFamily}`;
    const color = estilos.color;

    canvas.width = Math.ceil(ancho * dpr);
    canvas.height = Math.ceil(alto * dpr);
    canvas.style.width = `${ancho}px`;
    canvas.style.height = `${alto}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Posición real de cada glifo, medida sobre el texto ya maquetado por el
    // navegador (respeta el wrap y el tracking sin re-implementarlos).
    const nodo = textoEl.firstChild;
    if (!nodo || nodo.nodeType !== Node.TEXT_NODE) return;

    const glifos: Glifo[] = [];
    const rango = document.createRange();
    for (let i = 0; i < text.length; i += 1) {
      if (!text[i].trim()) continue;
      rango.setStart(nodo, i);
      rango.setEnd(nodo, i + 1);
      const r = rango.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) continue;
      glifos.push({
        char: text[i],
        x: r.left - rect.left,
        y: r.top - rect.top,
        ancho: r.width,
        alto: r.height,
      });
    }
    if (!glifos.length) return;

    // Capa nítida del texto final, dibujada una sola vez. Cada glifo va en su
    // posición medida, así el canvas calca la maquetación del navegador.
    const capa = document.createElement("canvas");
    capa.width = canvas.width;
    capa.height = canvas.height;
    const cctx = capa.getContext("2d");
    if (!cctx) return;
    cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cctx.font = fuente;
    cctx.fillStyle = color;
    cctx.textBaseline = "middle";
    for (const g of glifos) {
      cctx.fillText(g.char, g.x, g.y + g.alto / 2);
    }

    const restaurar = () => {
      if (!vivo) return;
      setTapado(false);
      ctx.clearRect(0, 0, ancho, alto);
    };

    const rearmarVigia = () => {
      if (vigia) clearTimeout(vigia);
      // setTimeout sigue corriendo aunque las animaciones estén frenadas.
      vigia = setTimeout(restaurar, SIN_FRAME_MS);
    };

    const stagger = 0.55;
    let inicio = 0;

    const dibujar = (ahora: number) => {
      if (!vivo) return;
      if (!inicio) inicio = ahora;
      const t = clamp01((ahora - inicio) / duracion);

      ctx.clearRect(0, 0, ancho, alto);
      ctx.fillStyle = colorAcento;

      for (let i = 0; i < glifos.length; i += 1) {
        const g = glifos[i];
        const retraso = (i / glifos.length) * stagger;
        const local = clamp01((t - retraso) / (1 - stagger));
        if (local <= 0) continue;

        // Glifo ya cuajado: se recorta la capa nítida a su caja.
        if (local >= 0.999) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(g.x, g.y, g.ancho, g.alto);
          ctx.clip();
          ctx.drawImage(capa, 0, 0, ancho, alto);
          ctx.restore();
          continue;
        }

        // En transición: celdas que se prenden de abajo hacia arriba.
        const filaIni = Math.floor(g.y / pixel);
        const filaFin = Math.ceil((g.y + g.alto) / pixel);
        const colIni = Math.floor(g.x / pixel);
        const colFin = Math.ceil((g.x + g.ancho) / pixel);

        for (let fila = filaIni; fila < filaFin; fila += 1) {
          const y = fila * pixel;
          const desdeAbajo = (g.y + g.alto - (y + pixel * 0.5)) / g.alto;
          const cobertura = clamp01((local * 1.4 - desdeAbajo) / 0.5);
          if (cobertura <= 0.001) continue;

          for (let col = colIni; col < colFin; col += 1) {
            if (cobertura <= umbralCelda(col, fila)) continue;
            const x = Math.max(col * pixel, g.x);
            const w = Math.min((col + 1) * pixel, g.x + g.ancho) - x;
            const yy = Math.max(y, g.y);
            const h = Math.min(y + pixel, g.y + g.alto) - yy;
            if (w > 0 && h > 0) ctx.fillRect(x, yy, w, h);
          }
        }
      }

      if (t < 1) {
        setTapado(true);
        rearmarVigia();
        frame = requestAnimationFrame(dibujar);
      } else {
        // Terminó bien: devolvemos el texto real y sacamos el canvas.
        if (vigia) clearTimeout(vigia);
        restaurar();
      }
    };

    // Red de seguridad final: pase lo que pase, a los duracion+500ms el texto
    // real vuelve a estar visible.
    const corte = setTimeout(restaurar, duracion + 500);
    frame = requestAnimationFrame(dibujar);
    rearmarVigia();

    return () => {
      vivo = false;
      if (frame !== null) cancelAnimationFrame(frame);
      if (vigia) clearTimeout(vigia);
      clearTimeout(corte);
      setTapado(false);
    };
  }, [text, clave, colorAcento, pixel, duracion]);

  return (
    <span ref={contenedorRef} className={`relative inline-block ${className}`}>
      <span ref={textoRef} style={{ opacity: tapado ? 0 : 1 }}>
        {text}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </span>
  );
}
