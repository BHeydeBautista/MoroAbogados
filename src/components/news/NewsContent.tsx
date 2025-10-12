"use client";

export default function NewsContent() {
  return (
    <article className="prose prose-invert max-w-none leading-relaxed text-gray-200">
      <h3 className="text-[#d4a75d] text-xl font-semibold mb-4">
        Preámbulo
      </h3>
      <p>
        Nosotros, los representantes del pueblo de la Provincia de Formosa,
        reunidos en Convención Constituyente, con el propósito de reafirmar los
        valores de la libertad, la justicia y la solidaridad...
      </p>

      <h3 className="text-[#d4a75d] text-xl font-semibold mt-8 mb-4">
        Artículo 1°
      </h3>
      <p>
        La Provincia de Formosa, en el ejercicio de su autonomía política,
        económica y administrativa, adopta para su gobierno la forma
        representativa, republicana y democrática...
      </p>

      <p className="mt-8 text-gray-400 italic">
        *Texto actualizado al 2025 conforme a la publicación oficial en el
        Boletín de Legislación Provincial.
      </p>
    </article>
  );
}
