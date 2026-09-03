"use client";

import { Steps } from "@ark-ui/react/steps";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stepper horizontal sobre @ark-ui/react (patrón de 21st.dev), repintado con
 * los tokens de la guía en vez del azul/gris genérico del original.
 *
 * Controlado: `step` y `onStepChange` los maneja el wizard, que ya es la
 * fuente de verdad del paso activo (URL + localStorage).
 */
export type PasoStepper = {
  id: string;
  label: string;
  /** Pinta el marcador con el color de su pista. */
  pista: "juridico" | "tecnico";
  completo: boolean;
};

export function StepperHorizontal({
  pasos,
  activo,
  onIr,
  className,
}: {
  pasos: PasoStepper[];
  activo: number;
  onIr: (indice: number) => void;
  className?: string;
}) {
  return (
    <Steps.Root
      count={pasos.length}
      step={activo}
      onStepChange={(d) => onIr(d.step)}
      className={cn("w-full", className)}
      // El último paso no "completa" el flujo: la guía no termina, se recorre.
      linear={false}
    >
      <Steps.List className="flex items-center gap-0">
        {pasos.map((p, i) => (
          <Steps.Item
            key={p.id}
            index={i}
            className={cn(
              "relative flex items-center",
              i < pasos.length - 1 && "flex-1",
              p.pista === "juridico" ? "pista-juridico" : "pista-tecnico"
            )}
          >
            <Steps.Trigger
              className="group flex shrink-0 items-center rounded-full"
              title={p.label}
            >
              <span className="sr-only">{p.label}</span>
              <span
                data-hecho={p.completo ? "si" : "no"}
                className={cn(
                  "mono flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] text-[11px] font-medium transition-all duration-200",
                  "border-[var(--linea)] bg-white text-[var(--tinta-suave)]",
                  "data-[hecho=si]:border-[var(--pista)] data-[hecho=si]:bg-[var(--pista)] data-[hecho=si]:text-[var(--tinta)]",
                  "group-data-[current]:scale-110 group-data-[current]:border-[var(--tinta)] group-data-[current]:bg-[var(--tinta)] group-data-[current]:text-white"
                )}
              >
                {p.completo ? <Check size={13} strokeWidth={3} /> : i + 1}
              </span>
            </Steps.Trigger>

            <Steps.Separator
              hidden={i === pasos.length - 1}
              className={cn(
                "mx-1.5 h-[2px] flex-1 rounded-full bg-[var(--linea)] transition-colors duration-300",
                p.completo && "bg-[var(--pista)]"
              )}
            />
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  );
}
