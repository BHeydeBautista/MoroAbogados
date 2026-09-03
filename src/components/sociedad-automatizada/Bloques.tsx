"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Copy,
  CornerDownRight,
  Info,
  Scale,
  TriangleAlert,
  Lock,
  Unlock,
  ArrowRight,
} from "lucide-react";
import {
  completarPlantilla,
  type Bloque,
  type CampoDatos,
  type Riesgo,
} from "@/data/sociedadAutomatizada";

const NIVEL: Record<Riesgo, { color: string; fondo: string; label: string }> = {
  ok: { color: "#2F6B4F", fondo: "#2F6B4F14", label: "Sin observaciones" },
  atencion: { color: "#B4762A", fondo: "#B4762A14", label: "Requiere atención" },
  alerta: { color: "#A3342B", fondo: "#A3342B14", label: "Consultar al abogado" },
};

const TONO = {
  info: { color: "#2A6B7C", Icono: Info },
  warn: { color: "#B4762A", Icono: TriangleAlert },
  legal: { color: "#0F1C2E", Icono: Scale },
} as const;

/* ── Botón de copiado ───────────────────────────────────────────────── */

function BotonCopiar({ texto, label = "Copiar prompt" }: { texto: string; label?: string }) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      // Navegadores sin permiso de portapapeles: selección manual como respaldo.
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

  return (
    <button
      type="button"
      onClick={copiar}
      className="inline-flex items-center gap-2 rounded-lg bg-[#0F1C2E] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1b3350] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A75D] focus-visible:ring-offset-2"
    >
      {copiado ? <Check size={15} /> : <Copy size={15} />}
      {copiado ? "Copiado" : label}
    </button>
  );
}

/* ── Bloques ────────────────────────────────────────────────────────── */

function Prosa({ text }: { text: string }) {
  return <p className="max-w-[68ch] text-[15px] leading-relaxed text-gray-700">{text}</p>;
}

function Nota({ tone, title, text }: { tone: keyof typeof TONO; title: string; text: string }) {
  const { color, Icono } = TONO[tone];
  return (
    <div
      className="flex gap-3 rounded-xl p-4"
      style={{ backgroundColor: `${color}0F`, border: `1px solid ${color}33` }}
    >
      <Icono size={18} style={{ color }} className="mt-0.5 shrink-0" />
      <div className="space-y-1">
        <p className="text-sm font-semibold" style={{ color }}>
          {title}
        </p>
        <p className="max-w-[62ch] text-sm leading-relaxed text-gray-700">{text}</p>
      </div>
    </div>
  );
}

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
  const completo = claves.every((c) => marcados.has(c));

  return (
    <div className="rounded-2xl border border-[#D4A75D]/30 bg-white p-5 shadow-sm">
      <h4 className="text-base font-semibold text-[#0F1C2E]">{title}</h4>
      {intro && <p className="mt-1 text-sm text-gray-500">{intro}</p>}

      <ul className="mt-4 flex flex-col gap-2">
        {items.map((item, i) => {
          const clave = claves[i];
          const activo = marcados.has(clave);
          return (
            <li key={clave}>
              <button
                type="button"
                onClick={() => alternar(clave)}
                aria-pressed={activo}
                className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A75D] ${
                  activo
                    ? "border-[#D4A75D]/50 bg-[#D4A75D]/10"
                    : "border-gray-200 bg-white hover:border-[#D4A75D]/40"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                    activo
                      ? "border-[#D4A75D] bg-[#D4A75D] text-white"
                      : "border-gray-300 bg-white text-transparent"
                  }`}
                >
                  <Check size={13} strokeWidth={3} />
                </span>
                <span
                  className={`text-sm leading-relaxed ${
                    activo ? "text-[#0F1C2E]" : "text-gray-700"
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
          className={`mt-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition ${
            completo
              ? "bg-[#0F1C2E] text-white"
              : "bg-gray-50 text-gray-400"
          }`}
        >
          {completo ? <Unlock size={15} /> : <Lock size={15} />}
          {conclusion}
        </div>
      )}
    </div>
  );
}

function Clausula({
  docTitle,
  articulos,
}: Extract<Bloque, { type: "clause" }>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#0F1C2E]/15 bg-white shadow-sm">
      <div className="border-b border-[#0F1C2E]/10 bg-[#0F1C2E] px-5 py-3">
        <p className="font-mono text-[11px] tracking-[0.12em] text-[#D4A75D]">{docTitle}</p>
      </div>
      <div className="flex flex-col gap-5 p-6">
        {articulos.map((art) => (
          <p key={art.numero} className="max-w-[64ch] text-[15px] leading-[1.85] text-gray-800">
            <span className="font-semibold text-[#0F1C2E]">{art.numero} — </span>
            {art.partes.map((parte, i) =>
              parte.strong ? (
                <strong key={i} className="font-semibold text-[#0F1C2E] underline decoration-[#D4A75D] decoration-2 underline-offset-4">
                  {parte.text}
                </strong>
              ) : (
                <React.Fragment key={i}>{parte.text}</React.Fragment>
              )
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

function Campos({ title, intro, columnas, filas }: Extract<Bloque, { type: "fields" }>) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-5">
        <h4 className="text-base font-semibold text-[#0F1C2E]">{title}</h4>
        {intro && <p className="mt-1 max-w-[62ch] text-sm text-gray-500">{intro}</p>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="bg-gray-50/80">
              {columnas.map((c) => (
                <th
                  key={c}
                  className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500"
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
                <tr key={f.label} className="border-t border-gray-100 align-top">
                  <td className="px-5 py-4">
                    <span className="flex items-start gap-2 text-sm font-medium text-[#0F1C2E]">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: n.color }}
                        title={n.label}
                      />
                      {f.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{f.origen}</td>
                  <td className="px-5 py-4">
                    <span
                      className="block rounded-md px-3 py-2 text-sm leading-relaxed"
                      style={{ backgroundColor: n.fondo, color: n.color }}
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
    </div>
  );
}

function Pantalla({ url, caption, filas, cta }: Extract<Bloque, { type: "screen" }>) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Barra del navegador */}
        <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-100 px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          </span>
          <span className="truncate rounded-md bg-white px-3 py-1 font-mono text-[11px] text-gray-500">
            {url}
          </span>
        </div>

        <div className="flex flex-col gap-2 p-5">
          {filas.map((f) => (
            <div
              key={f.label}
              className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 px-4 py-3"
            >
              <span className="truncate text-sm text-gray-700">{f.label}</span>
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 text-xs font-medium ${
                  f.cargado ? "text-[#2F6B4F]" : "text-gray-400"
                }`}
              >
                {f.cargado && <Check size={13} strokeWidth={3} />}
                {f.estado}
              </span>
            </div>
          ))}

          <div className="mt-2 flex justify-end">
            <span className="cursor-default rounded-lg bg-[#D4A75D] px-5 py-2 text-sm font-medium text-[#0F1C2E]">
              {cta}
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-xs text-gray-400">
        {caption ? `${caption} ` : ""}Pantalla ilustrativa, no es el trámite real.
      </figcaption>
    </figure>
  );
}

function Flujo({ title, nodos }: Extract<Bloque, { type: "flow" }>) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h4 className="text-base font-semibold text-[#0F1C2E]">{title}</h4>
      <ol className="mt-4 flex flex-col gap-0">
        {nodos.map((n, i) => (
          <li key={n.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2A6B7C] font-mono text-xs font-semibold text-white">
                {i + 1}
              </span>
              {i < nodos.length - 1 && <span className="w-px flex-1 bg-[#2A6B7C]/25" />}
            </div>
            <div className={i < nodos.length - 1 ? "pb-5" : ""}>
              <p className="text-sm font-semibold text-[#0F1C2E]">{n.label}</p>
              <p className="mt-0.5 max-w-[58ch] text-sm leading-relaxed text-gray-600">
                {n.detalle}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Cruce({
  texto,
  onIr,
  destino,
}: {
  texto: string;
  destino: string;
  onIr: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onIr(destino)}
      className="group flex w-full items-start gap-3 rounded-xl border border-dashed border-[#2A6B7C]/40 bg-[#2A6B7C]/5 p-4 text-left transition hover:border-[#2A6B7C]/70 hover:bg-[#2A6B7C]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A6B7C]"
    >
      <CornerDownRight size={17} className="mt-0.5 shrink-0 text-[#2A6B7C]" />
      <span className="flex-1 text-sm leading-relaxed text-gray-700">{texto}</span>
      <ArrowRight
        size={16}
        className="mt-0.5 shrink-0 text-[#2A6B7C] transition group-hover:translate-x-0.5"
      />
    </button>
  );
}

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
  const claves = verificar.map((_, i) => `${claveBase}:v${i}`);
  const listo = claves.every((c) => marcados.has(c));

  return (
    <div className="overflow-hidden rounded-2xl border border-[#0F1C2E]/15 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
        <div>
          <h4 className="text-base font-semibold text-[#0F1C2E]">{title}</h4>
          {intro && <p className="mt-1 max-w-[58ch] text-sm text-gray-500">{intro}</p>}
        </div>
        <BotonCopiar texto={texto} />
      </div>

      <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words bg-[#0F1C2E] px-5 py-4 font-mono text-[12.5px] leading-relaxed text-[#E4E9F0]">
        {texto}
      </pre>

      {/* Verificación: reemplaza al "si la respuesta es la esperada" */}
      <div className="border-t border-gray-100 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
          Antes de avanzar, revisá la respuesta
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {verificar.map((v, i) => {
            const clave = claves[i];
            const activo = marcados.has(clave);
            return (
              <li key={clave}>
                <button
                  type="button"
                  onClick={() => alternar(clave)}
                  aria-pressed={activo}
                  className="flex w-full items-start gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A75D]"
                >
                  <span
                    className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition ${
                      activo
                        ? "border-[#2F6B4F] bg-[#2F6B4F] text-white"
                        : "border-gray-300 text-transparent"
                    }`}
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-gray-700">{v}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 border-t border-gray-100 pt-4">
          {listo ? (
            <p className="flex items-center gap-2 text-sm font-medium text-[#2F6B4F]">
              <Check size={15} strokeWidth={3} />
              La respuesta sirve. Seguí al paso siguiente.
            </p>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setVerCorreccion((v) => !v)}
                className="text-sm font-medium text-[#B4762A] underline decoration-dotted underline-offset-4 hover:text-[#8a5a1f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A75D]"
              >
                {verCorreccion
                  ? "Ocultar el prompt de ajuste"
                  : "¿Falta algo de la lista? Usá el prompt de ajuste"}
              </button>

              {verCorreccion && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3"
                >
                  <pre className="max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-[#B4762A]/30 bg-[#B4762A]/8 px-4 py-3 font-mono text-[12.5px] leading-relaxed text-[#5c3d12]">
                    {completarPlantilla(correccion, datos)}
                  </pre>
                  <div className="mt-3">
                    <BotonCopiar
                      texto={completarPlantilla(correccion, datos)}
                      label="Copiar ajuste"
                    />
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
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
      return (
        <Checklist
          {...bloque}
          marcados={marcados}
          alternar={alternar}
          claveBase={claveBase}
        />
      );
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
