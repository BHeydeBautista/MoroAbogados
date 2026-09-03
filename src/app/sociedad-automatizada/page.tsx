import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import GuiaWizard from "@/components/sociedad-automatizada/GuiaWizard";
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
      {/* ── Portada ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0F1C2E]">
        {/* Trama sutil: no compite con el texto y le da materia al fondo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(60% 80% at 78% 12%, rgba(212,167,93,0.16), transparent 62%), radial-gradient(50% 60% at 4% 96%, rgba(42,107,124,0.20), transparent 60%)",
          }}
        />

        {/* El padding superior deja lugar a la navbar del sitio, para que la
            portada oscura arranque a ras y no quede una franja blanca. */}
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow text-[#D4A75D]">Guía paso a paso</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
              Cómo constituir una Sociedad Automatizada
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-white/70">
              Como antes se buscaba el modelo de estatuto para armar una S.R.L., esta
              guía muestra cómo se vería cada paso: las cláusulas que se firman y la
              documentación técnica que las respalda.
            </p>

            <div className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-[#D4A75D]/25 bg-[#D4A75D]/8 px-4 py-3">
              <span className="mono rounded-md bg-[#D4A75D] px-2 py-0.5 text-[11px] font-medium text-[#0F1C2E]">
                {ESTADO.version} · {ESTADO.fecha}
              </span>
              <span className="max-w-[52ch] text-sm leading-relaxed text-white/60">
                {ESTADO.leyenda}
              </span>
            </div>
          </div>

          {/* El caso que atraviesa la guía */}
          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="eyebrow text-white/40">El caso que usamos en los once pasos</p>
            <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed text-white/75">
              <strong className="font-semibold text-white">{EJEMPLO.nombre}</strong> —{" "}
              {EJEMPLO.sistema}{" "}
              <span className="text-white/50">
                Es un caso deliberadamente común: si funciona para una billetera que
                presta plata, funciona para casi cualquier operación automatizada.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Las dos pistas ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[var(--linea)] md:grid-cols-2">
          <article className="pista-juridico bg-white p-7">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--pista)]" />
              <p className="eyebrow text-[var(--oro-hondo)]">Pista jurídica</p>
              <span className="mono tabular ml-auto text-xs text-[var(--tinta-suave)]">
                {cuenta("juridico")} pasos
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">Qué se firma y qué se presenta</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--tinta-media)]">
              Del encuadre a la inscripción registral: si tu operación califica, cómo se
              llama la sociedad, qué dice cada cláusula y quién responde.
            </p>
          </article>

          <article className="pista-tecnico bg-white p-7">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--pista)]" />
              <p className="eyebrow text-[var(--teal-hondo)]">Pista técnica</p>
              <span className="mono tabular ml-auto text-xs text-[var(--tinta-suave)]">
                {cuenta("tecnico")} pasos
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">El archivo que nadie sabe armar</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--tinta-media)]">
              El trámite pide un{" "}
              <span className="mono text-[13px] text-[var(--teal-hondo)]">
                Documentación técnica del sistema.pdf
              </span>{" "}
              que ningún modelo de estatuto trae. Estos seis pasos lo arman.
            </p>
          </article>
        </div>
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
