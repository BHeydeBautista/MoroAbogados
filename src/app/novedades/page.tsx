import NewsList from "@/components/Posts/NewsList";
import { NOVEDADES } from "@/data/novedadesData";

export const metadata = {
  title: "Novedades | Moro Abogados",
  description:
    "Últimas noticias, guías y documentos completos organizados por secciones.",
};

export default function NovedadesPage() {
  const items = NOVEDADES.map((n) => ({
    id: n.slug,
    title: n.title,
    excerpt: n.excerpt,
    href: `/novedades/${n.slug}`,
    date: n.date,
    cover: n.cover,
  }));

  return (
    <main className="bg-gradient-to-b from-white to-white/95 py-24 px-4 sm:px-6 lg:px-24 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-[#0F1C2E]">
            Novedades
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Noticias, guías y documentos completos para consultar y compartir.
          </p>
        </div>

        <NewsList items={items} pageSize={6} />
      </div>
    </main>
  );
}
