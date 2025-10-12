"use client";

export default function NewsContent() {
  return (
    <article className="max-w-3xl mx-auto leading-relaxed text-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Preámbulo
      </h2>
      <p className="text-gray-300 mb-8">
        Nosotros, los representantes del pueblo de la Provincia de Formosa,
        reunidos en Convención Constituyente, con el propósito de reafirmar los
        valores de la libertad, la justicia y la solidaridad...
      </p>

      <h3
        id="articulo1"
        className="text-xl md:text-2xl font-semibold text-[#d4a75d] mt-12 mb-4"
      >
        Artículo 1°
      </h3>
      <p className="text-gray-300 mb-8">
        La Provincia de Formosa, en el ejercicio de su autonomía política,
        económica y administrativa, adopta para su gobierno la forma
        representativa, republicana y democrática...
      </p>

      <p className="mt-10 text-gray-400 italic text-sm">
        *Texto actualizado al 2025 conforme a la publicación oficial en el
        Boletín de Legislación Provincial.
      </p>
    </article>
  );
}
