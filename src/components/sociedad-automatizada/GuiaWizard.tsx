"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Pencil, RotateCcw } from "lucide-react";
import RenderBloque from "./Bloques";
import { StepperHorizontal } from "@/components/ui/steps";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/ui/text-reveal";
import {
  CAMPOS,
  EJEMPLO,
  PASOS_VISIBLES,
  TRACKS_VISIBLES,
  type CampoDatos,
  type Paso,
  type TrackId,
} from "@/data/sociedadAutomatizada";

const LS_DATOS = "sa-datos-v1";
const LS_MARCADOS = "sa-marcados-v1";

export const claseDePista = (t: TrackId) =>
  t === "juridico" ? "pista-juridico" : "pista-tecnico";

/** Claves marcables de un paso: lo que hay que tildar para darlo por cerrado. */
function clavesDePaso(paso: Paso): string[] {
  const claves: string[] = [];
  paso.bloques.forEach((b, i) => {
    if (b.type === "checklist") b.items.forEach((_, j) => claves.push(`${paso.id}:${i}:${j}`));
    if (b.type === "prompt") b.verificar.forEach((_, j) => claves.push(`${paso.id}:${i}:v${j}`));
  });
  return claves;
}

export default function GuiaWizard() {
  const [pasoId, setPasoId] = useState<string>(PASOS_VISIBLES[0].id);
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
    if (desdeUrl && PASOS_VISIBLES.some((p) => p.id === desdeUrl)) setPasoId(desdeUrl);
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

  /* ── Estado derivado ────────────────────────────────────────────── */
  const indice = useMemo(() => PASOS_VISIBLES.findIndex((p) => p.id === pasoId), [pasoId]);
  const paso = PASOS_VISIBLES[indice] ?? PASOS_VISIBLES[0];
  const trackActivo = paso.track;

  const estado = useMemo(() => {
    const porPaso: Record<string, { total: number; hechos: number; completo: boolean }> = {};
    PASOS_VISIBLES.forEach((p) => {
      const claves = clavesDePaso(p);
      const hechos = claves.filter((c) => marcados.has(c)).length;
      porPaso[p.id] = { total: claves.length, hechos, completo: claves.length > 0 && hechos === claves.length };
    });
    const completos = PASOS_VISIBLES.filter((p) => porPaso[p.id].completo).length;
    return { porPaso, completos, porcentaje: Math.round((completos / PASOS_VISIBLES.length) * 100) };
  }, [marcados]);

  const pasosDePista = useCallback((t: TrackId) => PASOS_VISIBLES.filter((p) => p.track === t), []);
  const posEnPista = pasosDePista(trackActivo).findIndex((p) => p.id === paso.id) + 1;
  const totalPista = pasosDePista(trackActivo).length;

  /* ── Acciones ───────────────────────────────────────────────────── */
  const irA = useCallback((id: string) => {
    setPasoId(id);
    const url = new URL(window.location.href);
    url.searchParams.set("paso", id);
    window.history.replaceState(null, "", url.toString());

    // Suave sólo si el lector no pidió menos movimiento; con "reduce" el
    // scroll suave no corre y la página se quedaría donde estaba.
    const suave = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    document
      .getElementById("guia")
      ?.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "start" });
  }, []);

  const alternar = useCallback((clave: string) => {
    setMarcados((prev) => {
      const next = new Set(prev);
      if (next.has(clave)) next.delete(clave);
      else next.add(clave);
      return next;
    });
  }, []);

  const usandoEjemplo = CAMPOS.every((c) => !datos[c.id]?.trim());
  const nombreActivo = datos.nombre?.trim() || EJEMPLO.nombre;

  return (
    <div id="guia" className={`scroll-mt-6 ${claseDePista(trackActivo)}`}>
      {/* ── Datos de la sociedad ─────────────────────────────────── */}
      <section className="mb-8 overflow-hidden rounded-2xl border border-[var(--linea)] bg-white shadow-[var(--sombra-baja)]">
        <button
          type="button"
          onClick={() => setFormAbierto((v) => !v)}
          aria-expanded={formAbierto}
          className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-[var(--papel)]"
        >
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold">Los datos de tu sociedad</h2>
            <p className="mt-1 truncate text-sm text-[var(--tinta-suave)]">
              {usandoEjemplo ? (
                <>
                  Estás viendo el ejemplo de{" "}
                  <strong className="font-medium text-[var(--tinta)]">{EJEMPLO.nombre}</strong>. Cargá
                  los tuyos y los once prompts se completan solos.
                </>
              ) : (
                <>
                  Los prompts se completan con los datos de{" "}
                  <strong className="font-medium text-[var(--tinta)]">{nombreActivo}</strong>.
                </>
              )}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-[var(--pista-hondo)]">
            <Pencil size={15} />
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${formAbierto ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        <div className="colapso" data-abierto={formAbierto ? "si" : "no"}>
          <div>
            <div className="grid grid-cols-1 gap-4 border-t border-[var(--linea-suave)] p-5 md:grid-cols-2">
              {CAMPOS.map((campo) => (
                <div
                  key={campo.id}
                  className={`flex flex-col gap-1.5 ${campo.multilinea ? "md:col-span-2" : ""}`}
                >
                  <label htmlFor={`campo-${campo.id}`} className="text-sm font-medium">
                    {campo.label}
                  </label>
                  {campo.multilinea ? (
                    <textarea
                      id={`campo-${campo.id}`}
                      rows={3}
                      value={datos[campo.id] ?? ""}
                      onChange={(e) => setDatos((d) => ({ ...d, [campo.id]: e.target.value }))}
                      placeholder={EJEMPLO[campo.id]}
                      className="resize-y rounded-lg border border-[var(--linea)] bg-white px-3 py-2 text-sm placeholder:text-[var(--tinta-suave)]/60 focus:border-[var(--pista)] focus:outline-none"
                    />
                  ) : (
                    <input
                      id={`campo-${campo.id}`}
                      type="text"
                      value={datos[campo.id] ?? ""}
                      onChange={(e) => setDatos((d) => ({ ...d, [campo.id]: e.target.value }))}
                      placeholder={EJEMPLO[campo.id]}
                      className="rounded-lg border border-[var(--linea)] bg-white px-3 py-2 text-sm placeholder:text-[var(--tinta-suave)]/60 focus:border-[var(--pista)] focus:outline-none"
                    />
                  )}
                  <p className="text-xs text-[var(--tinta-suave)]">{campo.ayuda}</p>
                </div>
              ))}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--linea-suave)] pt-4 md:col-span-2">
                <p className="max-w-[60ch] text-xs text-[var(--tinta-suave)]">
                  Todo queda guardado en este navegador. No se envía a ningún servidor ni al
                  estudio.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMarcados(new Set());
                    setDatos({});
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--tinta-suave)] underline decoration-dotted underline-offset-4 transition-colors hover:text-[var(--alerta)]"
                >
                  <RotateCcw size={13} />
                  Borrar mis datos y mi avance
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stepper compacto (móvil) ─────────────────────────────── */}
      <div className="mb-6 lg:hidden">
        <div className="flex items-baseline justify-between gap-3">
          <p className="eyebrow text-[var(--pista-hondo)]">
            {TRACKS_VISIBLES.find((t) => t.id === trackActivo)?.nombre}
          </p>
          <p className="mono tabular text-xs text-[var(--tinta-suave)]">
            {posEnPista}/{totalPista} · {estado.completos} de {PASOS_VISIBLES.length} completos
          </p>
        </div>
        {/* Sólo los pasos de la pista activa: los once marcadores juntos no
            entran en un teléfono y se cortaban. Para saltar de pista están
            los botones de abajo y los cruces dentro de cada paso. */}
        <StepperHorizontal
          className="mt-4"
          activo={posEnPista - 1}
          onIr={(i) => irA(pasosDePista(trackActivo)[i].id)}
          pasos={pasosDePista(trackActivo).map((p) => ({
            id: p.id,
            label: p.corto,
            pista: p.track,
            completo: estado.porPaso[p.id].completo,
          }))}
        />

        <div className="mt-4 flex gap-2">
          {TRACKS_VISIBLES.map((t) => {
            const activa = t.id === trackActivo;
            const lista = pasosDePista(t.id);
            const hechos = lista.filter((p) => estado.porPaso[p.id].completo).length;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => irA(lista[0].id)}
                aria-pressed={activa}
                className={`${claseDePista(t.id)} flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs transition-colors ${
                  activa
                    ? "border-transparent bg-[var(--tinta)] font-medium text-white"
                    : "border-[var(--linea)] bg-white text-[var(--tinta-media)]"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--pista)]" />
                {t.nombre.replace("Pista ", "")}
                <span className="mono tabular text-[10px] opacity-60">
                  {hechos}/{lista.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[268px_1fr]">
        {/* ── Riel (escritorio) ──────────────────────────────────── */}
        <nav
          aria-label="Pasos de la guía"
          className="hidden lg:sticky lg:top-8 lg:block lg:self-start"
        >
          {/* Progreso general */}
          <div className="mb-7">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow text-[var(--tinta-suave)]">Tu avance</p>
              <p className="mono tabular text-xs text-[var(--tinta-media)]">
                {estado.completos}/{PASOS_VISIBLES.length}
              </p>
            </div>
            <div className="progreso-pista mt-2">
              <div className="progreso-relleno" style={{ width: `${estado.porcentaje}%` }} />
            </div>
          </div>

          <div className="flex flex-col gap-7">
            {TRACKS_VISIBLES.map((track) => {
              const lista = pasosDePista(track.id);
              const hechosPista = lista.filter((p) => estado.porPaso[p.id].completo).length;
              return (
                <div key={track.id} className={claseDePista(track.id)}>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--pista)]" />
                    <h3 className="eyebrow text-[var(--pista-hondo)]">{track.nombre}</h3>
                    <span className="mono tabular ml-auto text-[11px] text-[var(--tinta-suave)]">
                      {hechosPista}/{lista.length}
                    </span>
                  </div>

                  <ol className="flex flex-col">
                    {lista.map((p, i) => {
                      const activo = p.id === paso.id;
                      const st = estado.porPaso[p.id];
                      const previo = i > 0 ? estado.porPaso[lista[i - 1].id].completo : false;
                      return (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => irA(p.id)}
                            aria-current={activo ? "step" : undefined}
                            data-hecho={st.completo ? "si" : "no"}
                            data-previo-hecho={previo ? "si" : "no"}
                            className="riel-item"
                          >
                            <span className="riel-marca">
                              {st.completo ? <Check size={13} strokeWidth={3} /> : i + 1}
                            </span>
                            <span
                              className={`flex-1 truncate text-sm ${
                                activo ? "font-medium text-white" : "text-[var(--tinta-media)]"
                              }`}
                            >
                              {p.corto}
                            </span>
                            {!st.completo && st.hechos > 0 && (
                              <span
                                className={`mono tabular shrink-0 text-[10px] ${
                                  activo ? "text-white/45" : "text-[var(--tinta-suave)]"
                                }`}
                              >
                                {st.hechos}/{st.total}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </div>
        </nav>

        {/* ── Contenido del paso ─────────────────────────────────── */}
        <div className="min-w-0">
          {/* key remonta el bloque para que la animación CSS de entrada
              vuelva a correr en cada cambio de paso. */}
          <article key={paso.id}>
            <header className="mb-9">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="eyebrow text-[var(--pista-hondo)]">
                  {TRACKS_VISIBLES.find((t) => t.id === trackActivo)?.nombre}
                </p>
                <span className="h-3 w-px bg-[var(--linea)]" />
                <p className="mono tabular text-[11px] text-[var(--tinta-suave)]">
                  Paso {posEnPista} de {totalPista}
                </p>
                {estado.porPaso[paso.id].completo && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--ok)]/10 px-2.5 py-0.5 text-[11px] font-medium text-[var(--ok)]">
                    <Check size={11} strokeWidth={3} />
                    Completo
                  </span>
                )}
              </div>

              <h2 className="mt-3 text-3xl font-semibold leading-[1.14] sm:text-[2.6rem]">
                {/* El <article> de arriba lleva key={paso.id}: al cambiar de paso
                    se remonta y la animación CSS vuelve a correr sola. */}
                <TextReveal text={paso.titulo} />
              </h2>
              <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-[var(--tinta-media)]">
                {paso.bajada}
              </p>
            </header>

            {/* El encabezado no entra con paso-entra: el título ya tiene su
                propio revelado por palabra y se superponían dos movimientos. */}
            <div className="paso-entra flex flex-col gap-7">
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
          <div className="mt-14 flex items-center justify-between gap-4 border-t border-[var(--linea)] pt-6">
            {indice > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => irA(PASOS_VISIBLES[indice - 1].id)}
                className="group h-auto min-w-0 justify-start gap-2.5 rounded-xl border-[var(--linea)] bg-white px-4 py-3 text-left hover:border-[var(--tinta)]/25 hover:shadow-[var(--sombra-baja)]"
              >
                <ArrowLeft
                  size={15}
                  className="shrink-0 text-[var(--tinta-suave)] transition-transform group-hover:-translate-x-0.5"
                />
                <span className="min-w-0">
                  <span className="mono block text-[10px] uppercase tracking-[0.12em] text-[var(--tinta-suave)]">
                    Anterior
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {PASOS_VISIBLES[indice - 1].corto}
                  </span>
                </span>
              </Button>
            ) : (
              <span />
            )}

            {indice < PASOS_VISIBLES.length - 1 ? (
              <Button
                type="button"
                onClick={() => irA(PASOS_VISIBLES[indice + 1].id)}
                className="group h-auto min-w-0 justify-start gap-2.5 rounded-xl bg-[var(--tinta)] px-5 py-3 text-left text-white hover:bg-[#1b3350] hover:shadow-[var(--sombra-alta)]"
              >
                <span className="min-w-0">
                  <span className="mono block text-[10px] uppercase tracking-[0.12em] text-white/45">
                    Siguiente
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {PASOS_VISIBLES[indice + 1].corto}
                  </span>
                </span>
                <ArrowRight
                  size={15}
                  className="shrink-0 transition-transform group-hover:translate-x-0.5"
                />
              </Button>
            ) : (
              <span className="text-sm text-[var(--tinta-suave)]">Fin de la guía</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
