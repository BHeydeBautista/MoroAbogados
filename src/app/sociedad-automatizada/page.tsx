import GuiaWizard from "@/components/sociedad-automatizada/GuiaWizard";
import { EJEMPLO } from "@/data/sociedadAutomatizada";

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

export default function SociedadAutomatizadaPage() {
  return (
    // bg-linear-* es el nombre de la utilidad de gradiente en Tailwind v4.
    // `bg-gradient-to-*` (v3) no genera nada y la página hereda el fondo oscuro del body.
    <main className="min-h-screen bg-linear-to-b from-white to-[#F4F6F9] pt-24 pb-24 text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Encabezado ───────────────────────────────────────────── */}
        <header className="mb-12 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4A75D]">
            Guía paso a paso
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.12] text-[#0F1C2E] sm:text-5xl">
            Cómo constituir una Sociedad Automatizada
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Como antes se buscaba el modelo de estatuto para armar una S.R.L., esta guía
            muestra cómo se vería cada paso: las cláusulas que se firman y la
            documentación técnica que las respalda.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-[#B4762A]/30 bg-[#B4762A]/8 px-4 py-3">
            <span className="rounded-md bg-[#0F1C2E] px-2 py-0.5 font-mono text-[11px] font-medium text-[#D4A75D]">
              {ESTADO.version} · {ESTADO.fecha}
            </span>
            <span className="text-sm leading-relaxed text-[#7a5218]">{ESTADO.leyenda}</span>
          </div>
        </header>

        {/* ── Qué es cada pista ────────────────────────────────────── */}
        <section className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#D4A75D]/30 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-[#0F1C2E]">
              Cinco pasos jurídicos
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Del encuadre a la inscripción registral: qué se firma, qué dice cada
              cláusula y qué se presenta ante el Registro Público.
            </p>
          </div>
          <div className="rounded-2xl border border-[#2A6B7C]/30 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-[#0F1C2E]">
              Seis pasos técnicos
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              El trámite pide un archivo que ningún modelo de estatuto trae:{" "}
              <span className="font-mono text-[13px] text-[#2A6B7C]">
                Documentación técnica del sistema.pdf
              </span>
              . Estos seis pasos lo arman.
            </p>
          </div>
        </section>

        {/* ── Ejemplo que atraviesa la guía ────────────────────────── */}
        <section className="mb-12 rounded-2xl bg-[#0F1C2E] p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4A75D]">
            El caso que usamos en los once pasos
          </p>
          <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-white/85">
            <strong className="font-semibold text-white">{EJEMPLO.nombre}</strong> —{" "}
            {EJEMPLO.sistema} Es un caso deliberadamente común: si funciona para una
            billetera que presta plata, funciona para casi cualquier operación
            automatizada.
          </p>
        </section>

        <GuiaWizard />

        {/* ── Cierre ───────────────────────────────────────────────── */}
        <footer className="mt-20 border-t border-gray-200 pt-8">
          <p className="max-w-[70ch] text-sm leading-relaxed text-gray-500">
            Documento elaborado con fines informativos y de discusión profesional. Las
            cláusulas y pantallas son ilustrativas y requieren redacción y validación
            profesional. No constituye asesoramiento legal.
          </p>
        </footer>
      </div>
    </main>
  );
}
