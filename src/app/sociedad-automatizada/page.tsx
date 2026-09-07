import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import GuiaWizard from "@/components/sociedad-automatizada/GuiaWizard";
import TextReveal from "@/components/ui/text-reveal";
import {
  EJEMPLO,
  PASOS,
  TRACKS_VISIBLES,
  trackHabilitado,
  type TrackId,
} from "@/data/sociedadAutomatizada";
import "./guia.css";

/* Serif para títulos (autoridad de documento), Plex Sans para lectura y
   Plex Mono para prompts y etiquetas. El par Plex mezcla lectura larga con
   la técnica, que es de lo que trata la guía. */
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
    "Guía paso a paso para armar la documentación técnica del sistema que exige la constitución de una Sociedad Automatizada: qué decide el agente, con qué datos, qué puede ejecutar y quién lo supervisa.",
};

/** Estado del proyecto legislativo. Actualizar junto con la versión de la guía. */
const ESTADO = {
  version: "v1.0",
  fecha: "septiembre de 2026",
  leyenda:
    "Contenido a futuro: asume la sanción del proyecto en su redacción actual. Sujeto a modificaciones legislativas.",
};

const cuenta = (track: TrackId) => PASOS.filter((p) => p.track === track).length;

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
          <TextReveal text="Cómo constituir una Sociedad Automatizada" />
        </h1>

        <p className="mt-4 max-w-[64ch] text-[17px] leading-relaxed text-[var(--tinta-media)]">
          Empieza por lo básico —{" "}
          <strong className="font-medium text-[var(--tinta)]">qué es este régimen</strong> y si le
          sirve a tu negocio — sigue ayudándote a mirar los procesos que{" "}
          <strong className="font-medium text-[var(--tinta)]">ya tenés</strong> y elegir cuál
          automatizar, y recién entonces entra a diseñar y documentar el agente.
        </p>

        <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-[var(--tinta-suave)]">
          No hace falta que tengas nada armado. Se puede arrancar sabiendo sólo a qué se
          dedica tu empresa.
        </p>

        {/* Las partes, como recorrido: dice de dónde a dónde te lleva. */}
        <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-[var(--linea)] pt-5">
          {TRACKS_VISIBLES.map((t, i) => (
            <li key={t.id} className="flex items-center gap-2">
              {i > 0 && <span className="text-[var(--linea)]">→</span>}
              <span className="rounded-lg bg-white px-3 py-1.5 text-[13px] shadow-[var(--sombra-baja)]">
                <span className="mono mr-1.5 text-[11px] text-[var(--tinta-suave)]">{i + 1}</span>
                {t.nombre}
                <span className="mono tabular ml-2 text-[11px] text-[var(--tinta-suave)]">
                  {cuenta(t.id)}
                </span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--tinta-suave)]">
          <span className="mono rounded-md bg-[var(--tinta)] px-2 py-0.5 text-[11px] font-medium text-[var(--oro)]">
            {ESTADO.version} · {ESTADO.fecha}
          </span>
          <span className="min-w-0 flex-1 truncate">
            Ejemplo que atraviesa la guía:{" "}
            <span className="text-[var(--tinta-media)]">{EJEMPLO.nombre}</span>, una billetera
            que ya opera y quiere automatizar sus microcréditos
          </span>
        </div>

        {/* La pista jurídica está escrita pero apagada hasta que la revise el
            abogado. Se avisa en vez de omitirla en silencio: quien llegue por
            el ebook va a buscar la parte de las cláusulas. */}
        {!trackHabilitado("juridico") && (
          <p className="mt-4 max-w-[74ch] rounded-xl bg-[var(--atencion)]/8 px-4 py-3 text-[13px] leading-relaxed text-[#7a5218] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--atencion)_20%,transparent)]">
            <strong className="font-semibold">Los pasos jurídicos todavía no están
            publicados.</strong>{" "}
            Las cláusulas de estatuto, el encuadre y el trámite de inscripción se suman
            en una próxima versión de esta guía.
          </p>
        )}

        <p className="mt-3 max-w-[80ch] text-xs leading-relaxed text-[var(--tinta-suave)]">
          {ESTADO.leyenda}
        </p>
      </section>

      {/* ── Wizard ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GuiaWizard />

        {/* Descargo mínimo. Se deja sólo la frase que corresponde a una
            publicación de un estudio jurídico; el resto se sacó porque se
            repetía a lo largo de la guía y porque hoy no hay cláusulas en
            pantalla a las que referirse. */}
        <footer className="mt-20 border-t border-[var(--linea)] pt-8">
          <p className="max-w-[70ch] text-sm leading-relaxed text-[var(--tinta-suave)]">
            Documento elaborado con fines informativos. Las pantallas de trámite que
            aparecen en la guía son ilustrativas. No constituye asesoramiento legal.
          </p>
        </footer>
      </div>
    </main>
  );
}
