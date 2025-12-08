"use client";

type Props = {
  data?: {
    autor?: string;
    fuente?: string;
    fecha?: string;
    sumario?: string[];
  };
};

function initials(name = "") {
  return name
    .split(" ")
    .map((p) => p[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ArticleMetadata({ data }: Props) {
  if (!data) return null;

  const date = data.fecha ? new Date(data.fecha).toLocaleDateString("es-AR") : null;

  return (
    <section className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
      {/* Author with avatar */}
      {data.autor && (
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center text-sm font-semibold text-white/90">
            {initials(data.autor)}
          </div>
          <div>
            <div className="text-white font-medium">{data.autor}</div>
            <div className="text-white/60 text-xs">Autor</div>
          </div>
        </div>
      )}

      {/* Source and Date */}
      <div className="text-white/70 text-sm space-y-2">
        {data.fuente && (
          <p>
            <strong className="text-white">Fuente:</strong> {data.fuente}
          </p>
        )}

        {date && (
          <p>
            <strong className="text-white">Fecha:</strong> {date}
          </p>
        )}
      </div>

      {/* Sumario */}
      {data.sumario && data.sumario.length > 0 && (
        <div className="mt-5">
          <h4 className="text-[#d4a75d] font-semibold mb-2">Sumario</h4>
          <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
            {data.sumario.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
