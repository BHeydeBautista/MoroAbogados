"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  CornerDownRight,
  Info,
  Scale,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import {
  completarPlantilla,
  segmentarPlantilla,
  type Bloque,
  type CampoDatos,
  type Riesgo,
} from "@/data/sociedadAutomatizada";

const NIVEL: Record<Riesgo, { color: string; label: string }> = {
  ok: { color: "var(--ok)", label: "Sin observaciones" },
  atencion: { color: "var(--atencion)", label: "Requiere atención" },
  alerta: { color: "var(--alerta)", label: "Consultar al abogado" },
};

const TONO = {
  info: { color: "var(--teal)", Icono: Info },
  warn: { color: "var(--atencion)", Icono: TriangleAlert },
  legal: { color: "var(--tinta)", Icono: Scale },
} as const;

/* ── Botón de copiado ───────────────────────────────────────────────── */

function BotonCopiar({
  texto,
  label = "Copiar prompt",
  tono = "claro",
}: {
  texto: string;
  label?: string;
  tono?: "claro" | "oscuro";
}) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      // Navegadores sin permiso de portapapeles: copia por selección.
      const ta = document.createElement("textarea");
      ta.value = texto;
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

  const base =
    "inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97]";

  return (
    <button
      type="button"
      onClick={copiar}
      className={
        copiado
          ? `${base} bg-[var(--ok)] text-white`
          : tono === "oscuro"
          ? `${base} bg-white/10 text-white hover:bg-white/18`
          : `${base} bg-[var(--tinta)] text-white hover:shadow-[var(--sombra-media)]`
      }
    >
      <span className="relative flex h-[15px] w-[15px] items-center justify-center">
        <Copy
          size={15}
          className={`absolute transition-all duration-200 ${
            copiado ? "scale-50 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <Check
          size={15}
          strokeWidth={3}
          className={`absolute transition-all duration-200 ${
            copiado ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
      </span>
      {copiado ? "Copiado" : label}
    </button>
  );
}

/* ── Bloques de lectura ─────────────────────────────────────────────── */

function Prosa({ text }: { text: string }) {
  return (
    <p className="max-w-[68ch] text-[16px] leading-[1.72] text-[var(--tinta-media)]">{text}</p>
  );
}

function Nota({ tone, title, text }: { tone: keyof typeof TONO; title: string; text: string }) {
  const { color, Icono } = TONO[tone];
  return (
    <aside
      className="flex gap-3.5 rounded-xl p-5"
      style={{
        background: `color-mix(in srgb, ${color} 7%, white)`,
        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${color} 20%, transparent)`,
      }}
    >
      <Icono size={18} style={{ color }} className="mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-semibold" style={{ color }}>
          {title}
        </p>
        <p className="mt-1.5 max-w-[62ch] text-[15px] leading-[1.7] text-[var(--tinta-media)]">
          {text}
        </p>
      </div>
    </aside>
  );
}

/* ── Instrumentos ───────────────────────────────────────────────────── */

function Checklist({
  title,
  intro,
  items,
  conclusion,
  marcados,
  alternar,
  claveBase,
}: Extract<Bloque, { type: "checklist" }> & {
  marcados: Set<string>;
  alternar: (clave: string) => void;
  claveBase: string;
}) {
  const claves = items.map((_, i) => `${claveBase}:${i}`);
  const hechos = claves.filter((c) => marcados.has(c)).length;
  const completo = hechos === claves.length;

  return (
    <section className="rounded-2xl border border-[var(--linea)] bg-white p-6 shadow-[var(--sombra-baja)]">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[17px] font-semibold">{title}</h3>
        <span className="mono tabular shrink-0 text-xs text-[var(--tinta-suave)]">
          {hechos}/{items.length}
        </span>
      </div>
      {intro && <p className="mt-1.5 text-sm text-[var(--tinta-suave)]">{intro}</p>}

      <ul className="mt-5 flex flex-col gap-2">
        {items.map((item, i) => {
          const clave = claves[i];
          const activo = marcados.has(clave);
          return (
            <li key={clave}>
              <button
                type="button"
                onClick={() => alternar(clave)}
                aria-pressed={activo}
                className={`item-tilde flex w-full items-start gap-3.5 rounded-xl border p-3.5 text-left ${
                  activo
                    ? "border-[var(--pista)]/45 bg-[var(--pista-tenue)]"
                    : "border-[var(--linea)] bg-white hover:bg-[var(--papel)]"
                }`}
              >
                <span className="tilde mt-px h-[21px] w-[21px]">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span
                  className={`text-[15px] leading-[1.55] ${
                    activo ? "text-[var(--tinta)]" : "text-[var(--tinta-media)]"
                  }`}
                >
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {conclusion && (
        <div
          className={`mt-5 flex items-center gap-2.5 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
            completo
              ? "bg-[var(--tinta)] text-white shadow-[var(--sombra-media)]"
              : "bg-[var(--papel)] text-[var(--tinta-suave)]"
          }`}
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-300 ${
              completo ? "bg-[var(--pista)] text-[var(--tinta)]" : "bg-[var(--linea)]"
            }`}
          >
            {completo && <Check size={12} strokeWidth={3} />}
          </span>
          {conclusion}
        </div>
      )}
    </section>
  );
}

function Clausula({ docTitle, articulos }: Extract<Bloque, { type: "clause" }>) {
  return (
    <figure className="m-0 overflow-hidden rounded-2xl bg-white shadow-[var(--sombra-media)]">
      <figcaption className="bg-[var(--tinta)] px-6 py-3.5">
        <p className="mono text-[11px] tracking-[0.11em] text-[var(--oro)]">{docTitle}</p>
      </figcaption>
      {/* Interlineado de documento: se lee como un estatuto, no como una card. */}
      <div className="flex flex-col gap-6 px-6 py-7 sm:px-9">
        {articulos.map((art) => (
          <p
            key={art.numero}
            className="max-w-[64ch] font-[family-name:var(--fuente-serif)] text-[17px] leading-[1.95] text-[var(--tinta)]"
          >
            <span className="font-semibold">{art.numero} — </span>
            {art.partes.map((parte, i) =>
              parte.strong ? (
                <strong
                  key={i}
                  className="font-semibold decoration-[var(--oro)] decoration-2 underline-offset-[6px] [text-decoration-line:underline]"
                >
                  {parte.text}
                </strong>
              ) : (
                <React.Fragment key={i}>{parte.text}</React.Fragment>
              )
            )}
          </p>
        ))}
      </div>
    </figure>
  );
}

function Campos({ title, intro, columnas, filas }: Extract<Bloque, { type: "fields" }>) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--linea)] bg-white shadow-[var(--sombra-baja)]">
      <div className="p-6 pb-5">
        <h3 className="text-[17px] font-semibold">{title}</h3>
        {intro && (
          <p className="mt-1.5 max-w-[62ch] text-sm text-[var(--tinta-suave)]">{intro}</p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead>
            <tr>
              {columnas.map((c) => (
                <th
                  key={c}
                  className="eyebrow border-y border-[var(--linea)] bg-[var(--papel)] px-6 py-2.5 text-[10px] text-[var(--tinta-suave)]"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => {
              const n = NIVEL[f.nivel];
              return (
                <tr
                  key={f.label}
                  className="border-b border-[var(--linea-suave)] align-top transition-colors last:border-0 hover:bg-[var(--papel)]"
                >
                  <td className="px-6 py-4">
                    <span className="flex items-start gap-2.5 text-[15px] font-medium">
                      <span
                        className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                        style={{ background: n.color }}
                        title={n.label}
                      />
                      {f.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[14px] leading-relaxed text-[var(--tinta-media)]">
                    {f.origen}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="block max-w-[46ch] text-[14px] leading-[1.6]"
                      style={{ color: f.nivel === "ok" ? "var(--tinta-media)" : n.color }}
                    >
                      {f.riesgo}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Pantalla({ url, caption, filas, cta }: Extract<Bloque, { type: "screen" }>) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl border border-[var(--linea)] bg-white shadow-[var(--sombra-media)]">
        <div className="flex items-center gap-3 border-b border-[var(--linea)] bg-[var(--papel)] px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--linea)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--linea)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--linea)]" />
          </span>
          <span className="mono truncate rounded-md bg-white px-3 py-1 text-[11px] text-[var(--tinta-suave)] shadow-[var(--sombra-baja)]">
            {url}
          </span>
        </div>

        <div className="flex flex-col gap-2.5 p-6">
          {filas.map((f) => (
            <div
              key={f.label}
              className="flex items-center justify-between gap-4 rounded-xl border border-[var(--linea)] px-4 py-3.5"
            >
              <span className="truncate text-[15px] text-[var(--tinta-media)]">{f.label}</span>
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 text-xs font-medium ${
                  f.cargado ? "text-[var(--ok)]" : "text-[var(--tinta-suave)]"
                }`}
              >
                {f.cargado && <Check size={13} strokeWidth={3} />}
                {f.estado}
              </span>
            </div>
          ))}

          <div className="mt-2 flex justify-end">
            <span className="cursor-default rounded-lg bg-[var(--oro)] px-5 py-2.5 text-sm font-medium text-[var(--tinta)]">
              {cta}
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-2.5 text-xs text-[var(--tinta-suave)]">
        {caption ? `${caption} ` : ""}Pantalla ilustrativa, no es el trámite real.
      </figcaption>
    </figure>
  );
}

function Flujo({ title, nodos }: Extract<Bloque, { type: "flow" }>) {
  return (
    <section className="rounded-2xl border border-[var(--linea)] bg-white p-6 shadow-[var(--sombra-baja)]">
      <h3 className="text-[17px] font-semibold">{title}</h3>
      <ol className="mt-5 flex flex-col">
        {nodos.map((n, i) => (
          <li key={n.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="mono flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--pista)] text-[11px] font-medium text-white">
                {i + 1}
              </span>
              {i < nodos.length - 1 && (
                <span className="w-[2px] flex-1 bg-[var(--pista)]/25" />
              )}
            </div>
            <div className={i < nodos.length - 1 ? "pb-6" : ""}>
              <p className="text-[15px] font-semibold">{n.label}</p>
              <p className="mt-1 max-w-[58ch] text-[15px] leading-[1.65] text-[var(--tinta-media)]">
                {n.detalle}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Cruce({
  texto,
  destino,
  onIr,
}: {
  texto: string;
  destino: string;
  onIr: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onIr(destino)}
      className="group flex w-full items-start gap-3.5 rounded-xl border border-dashed border-[var(--tinta)]/22 bg-white/60 p-4 text-left transition-all hover:border-solid hover:border-[var(--pista)]/50 hover:bg-white hover:shadow-[var(--sombra-baja)]"
    >
      <CornerDownRight size={17} className="mt-0.5 shrink-0 text-[var(--pista-hondo)]" />
      <span className="flex-1 text-[15px] leading-[1.6] text-[var(--tinta-media)]">{texto}</span>
      <ArrowRight
        size={16}
        className="mt-0.5 shrink-0 text-[var(--pista-hondo)] transition-transform group-hover:translate-x-1"
      />
    </button>
  );
}

/* ── Prompt: la pieza central ───────────────────────────────────────── */

function PromptBloque({
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
  const [verCorreccion, setVerCorreccion] = useState(false);
  const texto = completarPlantilla(template, datos);
  const segmentos = segmentarPlantilla(template, datos);
  const claves = verificar.map((_, i) => `${claveBase}:v${i}`);
  const hechos = claves.filter((c) => marcados.has(c)).length;
  const listo = hechos === claves.length;

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-[var(--sombra-media)]">
      <div className="flex flex-wrap items-start justify-between gap-4 p-6 pb-5">
        <div className="min-w-0">
          <p className="eyebrow flex items-center gap-1.5 text-[var(--pista-hondo)]">
            <Sparkles size={12} />
            Preguntale a la IA
          </p>
          <h3 className="mt-2 text-[17px] font-semibold">{title}</h3>
          {intro && (
            <p className="mt-1.5 max-w-[58ch] text-sm text-[var(--tinta-suave)]">{intro}</p>
          )}
        </div>
        <BotonCopiar texto={texto} />
      </div>

      {/* El prompt, con los datos inyectados resaltados */}
      <div className="prompt-cuerpo relative">
        <pre className="mono max-h-[22rem] overflow-auto whitespace-pre-wrap break-words px-6 py-5 text-[12.5px] leading-[1.75]">
          {segmentos.map((s, i) =>
            s.campo ? (
              <span key={i} className="prompt-var" title={s.propio ? "Tu dato" : "Dato del ejemplo"}>
                {s.text}
              </span>
            ) : (
              <React.Fragment key={i}>{s.text}</React.Fragment>
            )
          )}
        </pre>
        <p className="mono border-t border-white/10 px-6 py-2.5 text-[10px] tracking-[0.1em] text-white/35">
          Resaltado = completado con tus datos
        </p>
      </div>

      {/* Verificación: reemplaza al "si la respuesta es la esperada" */}
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-4">
          <p className="eyebrow text-[var(--tinta-suave)]">Antes de avanzar, revisá la respuesta</p>
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
                      <BotonCopiar
                        texto={completarPlantilla(correccion, datos)}
                        label="Copiar ajuste"
                      />
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

/* ── Despachador ────────────────────────────────────────────────────── */

export default function RenderBloque({
  bloque,
  indice,
  pasoId,
  datos,
  marcados,
  alternar,
  onIr,
}: {
  bloque: Bloque;
  indice: number;
  pasoId: string;
  datos: Partial<Record<CampoDatos, string>>;
  marcados: Set<string>;
  alternar: (clave: string) => void;
  onIr: (id: string) => void;
}) {
  const claveBase = `${pasoId}:${indice}`;

  switch (bloque.type) {
    case "prose":
      return <Prosa text={bloque.text} />;
    case "note":
      return <Nota tone={bloque.tone} title={bloque.title} text={bloque.text} />;
    case "checklist":
      return <Checklist {...bloque} marcados={marcados} alternar={alternar} claveBase={claveBase} />;
    case "clause":
      return <Clausula {...bloque} />;
    case "fields":
      return <Campos {...bloque} />;
    case "screen":
      return <Pantalla {...bloque} />;
    case "flow":
      return <Flujo {...bloque} />;
    case "crosslink":
      return <Cruce texto={bloque.texto} destino={bloque.hacia} onIr={onIr} />;
    case "prompt":
      return (
        <PromptBloque
          {...bloque}
          datos={datos}
          marcados={marcados}
          alternar={alternar}
          claveBase={claveBase}
        />
      );
    default:
      return null;
  }
}
