import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import GuiaWizard from "@/components/sociedad-automatizada/GuiaWizard";
import PixelReveal from "@/components/ui/pixel-reveal";
import { EJEMPLO, PASOS } from "@/data/sociedadAutomatizada";
import "./guia.css";

/* Serif para títulos (autoridad de documento), Plex Sans para lectura y
   Plex Mono para prompts y etiquetas. El par Plex refuerza la doble
   naturaleza de la guía: jurídica y técnica. */
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--fuente-serif",
  display: "swap",
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--fuente-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--fuente-mono",
  display: "swap",
});

export const metadata = {
  title: "Cómo constituir una Sociedad Automatizada | Moro Abogados",
  description:
    "Guía paso a paso para constituir una Sociedad Automatizada: los cinco pasos del trámite y los seis de la documentación técnica del sistema, con ejemplos de cláusulas y prompts listos para usar.",
};

/** Estado del proyecto legislativo. Actualizar junto con la versión de la guía. */
const ESTADO = {
  version: "v1.0",
  fecha: "septiembre de 2026",
  leyenda:
    "Contenido a futuro: asume la sanción del proyecto en su redacción actual. Sujeto a modificaciones legislativas.",
};

const cuenta = (track: "juridico" | "tecnico") =>
  PASOS.filter((p) => p.track === track).length;

export default function SociedadAutomatizadaPage() {
  return (
    <main
      className={`guia ${serif.variable} ${sans.variable} ${mono.variable} min-h-screen pb-24`}
    >
      {/* ── Apertura ─────────────────────────────────────────────────
          Deliberadamente corta. Antes eran una portada oscura a pantalla
          completa más dos tarjetas grandes: había que bajar dos veces para
          llegar al primer paso. Ahora el wizard entra casi en el primer
          vistazo, que es a lo que la gente viene. */}
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <p className="eyebrow text-[var(--oro-hondo)]">Guía paso a paso</p>

        <h1 className="mt-3 max-w-[19ch] text-[2.1rem] font-semibold leading-[1.06] sm:text-[2.9rem]">
          <PixelReveal text="Cómo constituir una Sociedad Automatizada" />
        </h1>

        <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-[var(--tinta-media)]">
          Once pasos: <strong className="font-medium text-[var(--tinta)]">cinco jurídicos</strong>{" "}
          con las cláusulas que se firman, y{" "}
          <strong className="font-medium text-[var(--tinta)]">seis técnicos</strong> que arman la
          documentación del sistema que el trámite pide y ningún modelo de estatuto trae.
        </p>

        {/* Estado y caso, en una sola línea de metadatos en vez de dos bloques. */}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--linea)] pt-4 text-[13px] text-[var(--tinta-suave)]">
          <span className="mono rounded-md bg-[var(--tinta)] px-2 py-0.5 text-[11px] font-medium text-[var(--oro)]">
            {ESTADO.version} · {ESTADO.fecha}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--oro)]" />
            {cuenta("juridico")} pasos jurídicos
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
            {cuenta("tecnico")} pasos técnicos
          </span>
          <span className="min-w-0 flex-1 truncate">
            Ejemplo: <span className="text-[var(--tinta-media)]">{EJEMPLO.nombre}</span>, una
            billetera que otorga microcréditos
          </span>
        </div>

        <p className="mt-3 max-w-[80ch] text-xs leading-relaxed text-[var(--tinta-suave)]">
          {ESTADO.leyenda}
        </p>
      </section>

      {/* ── Wizard ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GuiaWizard />

        <footer className="mt-20 border-t border-[var(--linea)] pt-8">
          <p className="max-w-[70ch] text-sm leading-relaxed text-[var(--tinta-suave)]">
            Documento elaborado con fines informativos y de discusión profesional. Las
            cláusulas y pantallas son ilustrativas y requieren redacción y validación
            profesional. No constituye asesoramiento legal.
          </p>
        </footer>
      </div>
    </main>
  );
}
