"use client";

export default function NewsMetadata() {
  const data = {
    jurisdiccion: "Provincia de Formosa",
    tipoNorma: "Constitución",
    numeroNorma: "Actualizada",
    emisor: "Poder Legislativo",
    fechaSancion: "05-09-2025",
    publicacion: "08-09-2025",
  };

  return (
    <div className="bg-[#1c2e4a]/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-[#d4a75d]">Detalles</h2>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
        <p><strong>Jurisdicción:</strong> {data.jurisdiccion}</p>
        <p><strong>Emisor:</strong> {data.emisor}</p>
        <p><strong>Tipo de Norma:</strong> {data.tipoNorma}</p>
        <p><strong>Fecha de Sanción:</strong> {data.fechaSancion}</p>
        <p><strong>Número de Norma:</strong> {data.numeroNorma}</p>
        <p><strong>Publicación B.O.:</strong> {data.publicacion}</p>
      </div>
    </div>
  );
}
