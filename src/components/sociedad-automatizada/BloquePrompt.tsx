"use client";

import React, { useEffect, useState } from "react";
import { Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import { Button } from "@/components/ui/button";
import {
  completarPlantilla,
  segmentarPlantilla,
  type Bloque,
  type CampoDatos,
} from "@/data/sociedadAutomatizada";

const ETIQUETA_CAMPO: Record<CampoDatos, string> = {
  nombre: "Nombre",
  actividad: "Actividad",
  jurisdiccion: "Jurisdicción",
  sistema: "Sistema",
};

/**
 * El prompt no se muestra como un bloque de código de sólo lectura sino como
 * una entrada de chat: el lector puede retocarlo antes de mandarlo a la IA,
 * que es exactamente lo que va a hacer en ChatGPT o Claude.
 */
export default function BloquePrompt({
  title,
  intro,
  template,
  verificar,
  correccion,
  datos,
  marcados,
  alternar,
  claveBase,
}: Extract<Bloque, { type: "prompt" }> & {
  datos: Partial<Record<CampoDatos, string>>;
  marcados: Set<string>;
  alternar: (clave: string) => void;
  claveBase: string;
}) {
  const original = completarPlantilla(template, datos);
  const [texto, setTexto] = useState(original);
  const [copiado, setCopiado] = useState(false);
  const [verCorreccion, setVerCorreccion] = useState(false);

  // Si el lector cambia los datos de su sociedad, el prompt se regenera —
  // salvo que lo haya editado a mano, en cuyo caso respetamos su edición.
  const [tocado, setTocado] = useState(false);
  useEffect(() => {
    if (!tocado) setTexto(original);
  }, [original, tocado]);

  const inyectados = segmentarPlantilla(template, datos).filter((s) => s.campo);
  const claves = verificar.map((_, i) => `${claveBase}:v${i}`);
  const hechos = claves.filter((c) => marcados.has(c)).length;
  const listo = hechos === claves.length;

  const copiar = async (valor: string) => {
    try {
      await navigator.clipboard.writeText(valor);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = valor;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-[var(--sombra-media)]">
      <div className="p-6 pb-4">
        <p className="eyebrow flex items-center gap-1.5 text-[var(--pista-hondo)]">
          <Sparkles size={12} />
          Preguntale a la IA
        </p>
        <h3 className="mt-2 text-[17px] font-semibold text-[var(--tinta)]">{title}</h3>
        {intro && (
          <p className="mt-1.5 max-w-[58ch] text-sm text-[var(--tinta-suave)]">{intro}</p>
        )}
      </div>

      <div className="px-6">
        <PromptInput
          value={texto}
          onValueChange={(v) => {
            setTocado(true);
            setTexto(v);
          }}
          onSubmit={() => copiar(texto)}
          maxHeight={360}
          className="rounded-2xl border-[var(--linea)] bg-[var(--papel)] p-2 shadow-none"
        >
          <PromptInputTextarea
            className="mono px-3 pt-2 text-[12.5px] leading-[1.75] text-[var(--tinta)]"
            aria-label="Prompt para pegar en la IA"
          />

          <PromptInputActions className="justify-between gap-2 px-2 pb-1 pt-2">
            <span className="mono text-[10px] tracking-[0.08em] text-[var(--tinta-suave)]">
              {tocado ? "Editado por vos" : "Generado con tus datos"}
            </span>

            <span className="flex items-center gap-1.5">
              {tocado && (
                <PromptInputAction tooltip="Volver al prompt original">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTocado(false);
                      setTexto(original);
                    }}
                    className="h-8 gap-1.5 text-[var(--tinta-suave)]"
                  >
                    <RotateCcw size={14} />
                    Restaurar
                  </Button>
                </PromptInputAction>
              )}

              <PromptInputAction tooltip="Copiar y pegar en ChatGPT, Claude o Gemini">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => copiar(texto)}
                  className={`h-8 gap-1.5 ${
                    copiado
                      ? "bg-[var(--ok)] hover:bg-[var(--ok)]"
                      : "bg-[var(--tinta)] hover:bg-[#1b3350]"
                  } text-white`}
                >
                  {copiado ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
                  {copiado ? "Copiado" : "Copiar prompt"}
                </Button>
              </PromptInputAction>
            </span>
          </PromptInputActions>
        </PromptInput>
      </div>

      {/* Qué datos se inyectaron: el textarea no puede resaltarlos adentro,
          así que se listan aparte para que se vea que entraron. */}
      {inyectados.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 px-6 pt-3">
          <span className="mono text-[10px] tracking-[0.08em] text-[var(--tinta-suave)]">
            Completado con
          </span>
          {inyectados.map((s, i) => (
            <span
              key={i}
              className="inline-flex max-w-[26ch] items-baseline gap-1.5 rounded-md bg-[var(--pista-tenue)] px-2 py-1 text-[11px]"
              title={s.text}
            >
              <span className="mono text-[var(--pista-hondo)]">
                {ETIQUETA_CAMPO[s.campo as CampoDatos]}
              </span>
              <span className="truncate text-[var(--tinta-media)]">{s.text}</span>
              {!s.propio && (
                <span className="mono shrink-0 text-[9px] text-[var(--tinta-suave)]">ej.</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Verificación: reemplaza al "si la respuesta es la esperada" */}
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-4">
          <p className="eyebrow text-[var(--tinta-suave)]">
            Antes de avanzar, revisá la respuesta
          </p>
          <span className="mono tabular shrink-0 text-xs text-[var(--tinta-suave)]">
            {hechos}/{verificar.length}
          </span>
        </div>

        <ul className="mt-3.5 flex flex-col gap-1">
          {verificar.map((v, i) => {
            const clave = claves[i];
            const activo = marcados.has(clave);
            return (
              <li key={clave}>
                <button
                  type="button"
                  onClick={() => alternar(clave)}
                  aria-pressed={activo}
                  className="item-tilde flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left hover:bg-[var(--papel)]"
                >
                  <span className="tilde mt-px h-[19px] w-[19px]">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span
                    className={`text-[15px] leading-[1.55] ${
                      activo ? "text-[var(--tinta)]" : "text-[var(--tinta-media)]"
                    }`}
                  >
                    {v}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 border-t border-[var(--linea-suave)] pt-5">
          {listo ? (
            <p className="flex items-center gap-2 text-sm font-medium text-[var(--ok)]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--ok)] text-white">
                <Check size={12} strokeWidth={3} />
              </span>
              La respuesta sirve. Seguí al paso siguiente.
            </p>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setVerCorreccion((v) => !v)}
                className="text-sm font-medium text-[var(--atencion)] underline decoration-dotted underline-offset-4 transition-colors hover:text-[var(--alerta)]"
              >
                {verCorreccion
                  ? "Ocultar el prompt de ajuste"
                  : "¿Falta algo de la lista? Usá el prompt de ajuste"}
              </button>

              <div className="colapso" data-abierto={verCorreccion ? "si" : "no"}>
                <div>
                  <div className="pt-4">
                    <pre className="mono max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-[var(--atencion)]/8 px-4 py-3.5 text-[12.5px] leading-[1.7] text-[#5c3d12] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--atencion)_22%,transparent)]">
                      {completarPlantilla(correccion, datos)}
                    </pre>
                    <div className="mt-3">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => copiar(completarPlantilla(correccion, datos))}
                        className="gap-1.5 border-[var(--atencion)]/40 text-[var(--atencion)] hover:bg-[var(--atencion)]/10"
                      >
                        <Copy size={14} />
                        Copiar ajuste
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
