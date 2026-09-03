"use client";

import React from "react";

/**
 * Revelado de texto por palabra: desenfoque que se resuelve, subida mínima y
 * entrada escalonada. La referencia es editorial, no técnica — el texto se
 * asienta como si lo estuvieran componiendo, sin llamar la atención sobre sí
 * mismo.
 *
 * Se reveló por palabra y no por letra a propósito: letra por letra lee como
 * efecto de terminal y, en un documento jurídico, como algo raro.
 *
 * Todo es CSS (ver .revelado en guia.css). No hay canvas ni
 * requestAnimationFrame, así que no existe el estado en el que el navegador
 * frena las animaciones y el título queda invisible: la animación vive dentro
 * de `prefers-reduced-motion: no-preference`, con lo cual el estado en reposo
 * es, siempre, texto normal y visible.
 */
export default function TextReveal({
  text,
  className = "",
  /** Milisegundos entre palabra y palabra. */
  escalon = 52,
  as: Etiqueta = "span",
}: {
  text: string;
  className?: string;
  escalon?: number;
  as?: "span" | "div";
}) {
  const palabras = text.split(" ");

  return (
    <Etiqueta className={`revelado ${className}`}>
      {palabras.map((palabra, i) => (
        <React.Fragment key={`${palabra}-${i}`}>
          <span
            className="revelado-palabra"
            style={{ animationDelay: `${i * escalon}ms` }}
          >
            {palabra}
          </span>
          {/* Espacio real entre palabras: mantiene el salto de línea natural. */}
          {i < palabras.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Etiqueta>
  );
}
