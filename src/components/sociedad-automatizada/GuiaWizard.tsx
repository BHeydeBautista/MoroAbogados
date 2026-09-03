"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Pencil,
  RotateCcw,
} from "lucide-react";
import RenderBloque from "./Bloques";
import {
  CAMPOS,
  EJEMPLO,
  PASOS,
  TRACKS,
  type CampoDatos,
  type Paso,
  type TrackId,
} from "@/data/sociedadAutomatizada";

const LS_DATOS = "sa-datos-v1";
const LS_MARCADOS = "sa-marcados-v1";

const COLOR_TRACK: Record<TrackId, string> = {
  juridico: "#D4A75D",
  tecnico: "#2A6B7C",
};

/** Claves marcables de un paso: lo que hay que tildar para darlo por cerrado. */
function clavesDePaso(paso: Paso): string[] {
  const claves: string[] = [];
  paso.bloques.forEach((b, i) => {
    if (b.type === "checklist") {
      b.items.forEach((_, j) => claves.push(`${paso.id}:${i}:${j}`));
    }
    if (b.type === "prompt") {
      b.verificar.forEach((_, j) => claves.push(`${paso.id}:${i}:v${j}`));
    }
  });
  return claves;
}

export default function GuiaWizard() {
  const [pasoId, setPasoId] = useState<string>(PASOS[0].id);
  const [datos, setDatos] = useState<Partial<Record<CampoDatos, string>>>({});
  const [marcados, setMarcados] = useState<Set<string>>(new Set());
  const [formAbierto, setFormAbierto] = useState(false);
  const [montado, setMontado] = useState(false);

  /* ── Rehidratación: localStorage + deep link ?paso= ─────────────── */
  useEffect(() => {
    try {
      const d = localStorage.getItem(LS_DATOS);
      if (d) setDatos(JSON.parse(d));
      const m = localStorage.getItem(LS_MARCADOS);
      if (m) setMarcados(new Set(JSON.parse(m) as string[]));
    } catch {
      // Almacenamiento bloqueado: la guía funciona igual, sin recordar el avance.
    }

    const desdeUrl = new URLSearchParams(window.location.search).get("paso");
    if (desdeUrl && PASOS.some((p) => p.id === desdeUrl)) setPasoId(desdeUrl);

    setMontado(true);
  }, []);

  useEffect(() => {
    if (!montado) return;
    try {
      localStorage.setItem(LS_DATOS, JSON.stringify(datos));
    } catch {}
  }, [datos, montado]);

  useEffect(() => {
    if (!montado) return;
    try {
      localStorage.setItem(LS_MARCADOS, JSON.stringify([...marcados]));
    } catch {}
  }, [marcados, montado]);

  /* ── Navegación ─────────────────────────────────────────────────── */
  const indice = useMemo(() => PASOS.findIndex((p) => p.id === pasoId), [pasoId]);
  const paso = PASOS[indice] ?? PASOS[0];
  const trackActivo = paso.track;

  const irA = useCallback((id: string) => {
    setPasoId(id);
    const url = new URL(window.location.href);
    url.searchParams.set("paso", id);
    window.history.replaceState(null, "", url.toString());
    document.getElementById("guia")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const alternar = useCallback((clave: string) => {
    setMarcados((prev) => {
      const next = new Set(prev);
      if (next.has(clave)) next.delete(clave);
      else next.add(clave);
      return next;
    });
  }, []);

  const estadoPasos = useMemo(() => {
    const mapa: Record<string, { total: number; hechos: number; completo: boolean }> = {};
    PASOS.forEach((p) => {
      const claves = clavesDePaso(p);
      const hechos = claves.filter((c) => marcados.has(c)).length;
      mapa[p.id] = {
        total: claves.length,
        hechos,
        completo: claves.length > 0 && hechos === claves.length,
      };
    });
    return mapa;
  }, [marcados]);

  const usandoEjemplo = CAMPOS.every((c) => !datos[c.id]?.trim());

  const reiniciar = () => {
    setMarcados(new Set());
    setDatos({});
  };

  return (
    <div id="guia" className="scroll-mt-24">
      {/* ── Datos de la sociedad ─────────────────────────────────── */}
      <section className="mb-10 overflow-hidden rounded-2xl border border-[#D4A75D]/30 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setFormAbierto((v) => !v)}
          aria-expanded={formAbierto}
          className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-gray-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A75D]"
        >
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-[#0F1C2E]">
              Los datos de tu sociedad
            </h2>
            <p className="mt-1 truncate text-sm text-gray-500">
              {usandoEjemplo ? (
                <>
                  Estás viendo el ejemplo de <strong className="font-medium text-[#0F1C2E]">{EJEMPLO.nombre}</strong>.
                  Cargá los tuyos y los once prompts se completan solos.
                </>
              ) : (
                <>
                  Los prompts se completan con los datos de{" "}
                  <strong className="font-medium text-[#0F1C2E]">
                    {datos.nombre?.trim() || EJEMPLO.nombre}
                  </strong>
                  .
                </>
              )}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-[#D4A75D]">
            <Pencil size={15} />
            <ChevronDown
              size={16}
              className={`transition-transform ${formAbierto ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        {/* Colapso por CSS (grid-rows 0fr→1fr): si el navegador no corre
            transiciones, igual queda en el estado correcto. */}
        <div
          className={`grid transition-[grid-template-rows] duration-200 ease-out ${
            formAbierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
              <div className="grid grid-cols-1 gap-4 border-t border-gray-100 p-5 md:grid-cols-2">
                {CAMPOS.map((campo) => (
                  <div
                    key={campo.id}
                    className={`flex flex-col gap-1.5 ${campo.multilinea ? "md:col-span-2" : ""}`}
                  >
                    <label
                      htmlFor={`campo-${campo.id}`}
                      className="text-sm font-medium text-[#0F1C2E]"
                    >
                      {campo.label}
                    </label>
                    {campo.multilinea ? (
                      <textarea
                        id={`campo-${campo.id}`}
                        rows={3}
                        value={datos[campo.id] ?? ""}
                        onChange={(e) =>
                          setDatos((d) => ({ ...d, [campo.id]: e.target.value }))
                        }
                        placeholder={EJEMPLO[campo.id]}
                        className="resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#0F1C2E] placeholder:text-gray-400 focus:border-[#D4A75D] focus:outline-none focus:ring-1 focus:ring-[#D4A75D]"
                      />
                    ) : (
                      <input
                        id={`campo-${campo.id}`}
                        type="text"
                        value={datos[campo.id] ?? ""}
                        onChange={(e) =>
                          setDatos((d) => ({ ...d, [campo.id]: e.target.value }))
                        }
                        placeholder={EJEMPLO[campo.id]}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#0F1C2E] placeholder:text-gray-400 focus:border-[#D4A75D] focus:outline-none focus:ring-1 focus:ring-[#D4A75D]"
                      />
                    )}
                    <p className="text-xs text-gray-400">{campo.ayuda}</p>
                  </div>
                ))}

                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <p className="max-w-[60ch] text-xs text-gray-400">
                    Todo queda guardado en este navegador. No se envía a ningún servidor
                    ni al estudio.
                  </p>
                  <button
                    type="button"
                    onClick={reiniciar}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 underline decoration-dotted underline-offset-4 hover:text-[#A3342B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A75D]"
                  >
                    <RotateCcw size={13} />
                    Borrar mis datos y mi avance
                  </button>
                </div>
              </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
        {/* ── Riel de pasos ──────────────────────────────────────── */}
        <nav aria-label="Pasos de la guía" className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-7">
            {TRACKS.map((track) => (
              <div key={track.id}>
                <div className="mb-3 flex items-baseline gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: COLOR_TRACK[track.id] }}
                  />
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0F1C2E]">
                    {track.nombre}
                  </h3>
                </div>
                <p className="mb-3 pl-4 text-xs leading-relaxed text-gray-500">
                  {track.descripcion}
                </p>

                <ol className="flex flex-col">
                  {PASOS.filter((p) => p.track === track.id).map((p, i) => {
                    const activo = p.id === paso.id;
                    const estado = estadoPasos[p.id];
                    const color = COLOR_TRACK[track.id];
                    return (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => irA(p.id)}
                          aria-current={activo ? "step" : undefined}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A75D] ${
                            activo ? "bg-[#0F1C2E]" : "hover:bg-gray-100"
                          }`}
                        >
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition"
                            style={
                              estado.completo
                                ? { backgroundColor: color, color: "#0F1C2E" }
                                : activo
                                ? { backgroundColor: "#ffffff26", color: "#fff" }
                                : { backgroundColor: "#F1F3F6", color: "#6B7684" }
                            }
                          >
                            {estado.completo ? <Check size={13} strokeWidth={3} /> : i + 1}
                          </span>
                          <span
                            className={`flex-1 truncate text-sm ${
                              activo ? "font-medium text-white" : "text-gray-700"
                            }`}
                          >
                            {p.corto}
                          </span>
                          {!estado.completo && estado.hechos > 0 && (
                            <span
                              className={`shrink-0 font-mono text-[10px] ${
                                activo ? "text-white/50" : "text-gray-400"
                              }`}
                            >
                              {estado.hechos}/{estado.total}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </nav>

        {/* ── Contenido del paso ─────────────────────────────────── */}
        <div className="min-w-0">
          {/* Sin animación de entrada/salida a propósito: el contenido del paso
              tiene que estar visible aunque el navegador no anime. */}
          <article key={paso.id}>
              <header className="mb-8">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: COLOR_TRACK[trackActivo] }}
                >
                  {TRACKS.find((t) => t.id === trackActivo)?.nombre} · Paso{" "}
                  {PASOS.filter((p) => p.track === trackActivo).findIndex(
                    (p) => p.id === paso.id
                  ) + 1}{" "}
                  de {PASOS.filter((p) => p.track === trackActivo).length}
                </p>
                <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#0F1C2E] sm:text-4xl">
                  {paso.titulo}
                </h2>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-gray-600">
                  {paso.bajada}
                </p>
              </header>

              <div className="flex flex-col gap-6">
                {paso.bloques.map((bloque, i) => (
                  <RenderBloque
                    key={`${paso.id}-${i}`}
                    bloque={bloque}
                    indice={i}
                    pasoId={paso.id}
                    datos={datos}
                    marcados={marcados}
                    alternar={alternar}
                    onIr={irA}
                  />
                ))}
              </div>
          </article>

          {/* ── Anterior / siguiente ─────────────────────────────── */}
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-gray-200 pt-6">
            {indice > 0 ? (
              <button
                type="button"
                onClick={() => irA(PASOS[indice - 1].id)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition hover:border-[#0F1C2E] hover:text-[#0F1C2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A75D]"
              >
                <ArrowLeft size={15} />
                <span className="truncate">{PASOS[indice - 1].corto}</span>
              </button>
            ) : (
              <span />
            )}

            {indice < PASOS.length - 1 ? (
              <button
                type="button"
                onClick={() => irA(PASOS[indice + 1].id)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0F1C2E] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1b3350] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A75D] focus-visible:ring-offset-2"
              >
                <span className="truncate">{PASOS[indice + 1].corto}</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <span className="text-sm text-gray-500">Fin de la guía</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
