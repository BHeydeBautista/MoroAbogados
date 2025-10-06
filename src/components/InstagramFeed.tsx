/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type IGPost = {
  id: string;
  media_url: string;
  caption?: string;
  permalink: string;
  media_type?: string;
  timestamp?: string;
};

const mockedPosts: IGPost[] = [
  {
    id: "1",
    media_url: "/mock/1.png",
    caption: "🧑‍⚖️✨ ¡Este viernes participamos de una jornada imperdible!",
    permalink: "https://www.instagram.com/p/Cmock1/",
  },
  {
    id: "2",
    media_url: "/mock/2.png",
    caption: "🏗️ ¿Qué pasa si se cae una obra?",
    permalink: "https://www.instagram.com/p/Cmock2/",
  },
  {
    id: "3",
    media_url: "/mock/3.png",
    caption: "🔒 ¿Sabías que tu imagen es un derecho protegido por la ley?",
    permalink: "https://www.instagram.com/p/Cmock3/",
  },
];

const ownPublications = [
  {
    id: "p1",
    title: "Libro: Derecho Corporativo Actual",
    excerpt: "Una mirada práctica sobre compliance y gobierno corporativo.",
    href: "/publicaciones/libro-derecho-corporativo",
  },
  {
    id: "p2",
    title: "Artículo: Responsabilidad Civil en obras",
    excerpt: "Análisis de casos y recomendaciones para empresas constructoras.",
    href: "/publicaciones/articulo-responsabilidad-civil",
  },
];

const newsItems = [
  {
    id: "n1",
    title: "La firma participa en congreso regional",
    excerpt: "Resumen de la jornada y conclusiones relevantes.",
    href: "/noticias/congreso-regional-2025",
  },
  {
    id: "n2",
    title: "Nueva guía sobre protección de datos",
    excerpt: "Lanzamos una guía práctica para pymes.",
    href: "/noticias/guia-proteccion-datos",
  },
];

export default function InstagramFeed() {
  const [active, setActive] = useState<"instagram" | "propias" | "noticias">(
    "instagram"
  );
  const [posts, setPosts] = useState<IGPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (active !== "instagram") return;

    let mounted = true;
    setLoading(true);
    setError(null);

    fetch("/api/instagram")
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudo obtener posts");
        const data = await res.json();
        // La API devuelve { data: [...] } (Graph API). Normalizamos a IGPost[]
        const igPosts: IGPost[] =
          data?.data?.map((p: any) => ({
            id: p.id,
            media_url: p.media_url || p.thumbnail_url || "",
            caption: p.caption || "",
            permalink: p.permalink || `https://www.instagram.com/p/${p.id}/`,
            media_type: p.media_type,
            timestamp: p.timestamp,
          })) || [];
        if (mounted) {
          setPosts(igPosts.length ? igPosts : mockedPosts);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Instagram fetch error:", err);
        if (mounted) {
          setError("No se pudieron cargar las publicaciones. Mostrando ejemplos.");
          setPosts(mockedPosts);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [active]);

  return (
    <section
      id="Contenido"
      className="bg-gradient-to-b from-white to-white/95 py-20 px-6 lg:px-24 text-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#0F1C2E]">
            Contenido
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Últimas publicaciones desde Instagram, nuestras publicaciones propias y
            noticias de la firma.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { key: "instagram", label: "Publicaciones Instagram" },
            { key: "propias", label: "Publicaciones propias" },
            { key: "noticias", label: "Noticias" },
          ].map((tab) => {
            const isActive = active === (tab.key as any);
            return (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "bg-[#0F1C2E] text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-700"
                }`}
                aria-pressed={isActive}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div>
          <AnimatePresence mode="wait">
            {active === "instagram" && (
              <motion.div
                key="ig"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-14 h-1 bg-[#D4A75D] rounded" />
                </div>

                {loading && (
                  <div className="text-center py-8 text-gray-500">Cargando...</div>
                )}

                {error && (
                  <div className="text-center text-sm text-red-600 mb-4">{error}</div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <a
                      key={post.id}
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-lg border border-[#D4A75D]/40 hover:scale-[1.02] transition-all bg-white"
                    >
                      <div className="w-full h-[280px] bg-gray-100 overflow-hidden">
                        <img
                          src={post.media_url}
                          alt={post.caption || "Instagram post"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="px-4 py-3 text-sm text-gray-700 group-hover:text-black transition">
                        {post.caption ? post.caption : "—"}
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {active === "propias" && (
              <motion.div
                key="propias"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ownPublications.map((p) => (
                    <article
                      key={p.id}
                      className="rounded-lg border border-[#D4A75D]/30 p-5 bg-white"
                    >
                      <h4 className="text-lg font-semibold text-[#0F1C2E]">{p.title}</h4>
                      <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
                      <a
                        href={p.href}
                        className="inline-block mt-4 text-sm text-[#D4A75D] font-medium"
                      >
                        Leer más →
                      </a>
                    </article>
                  ))}
                </div>
              </motion.div>
            )}

            {active === "noticias" && (
              <motion.div
                key="noticias"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newsItems.map((n) => (
                    <article
                      key={n.id}
                      className="rounded-lg border border-[#D4A75D]/30 p-5 bg-white"
                    >
                      <h4 className="text-lg font-semibold text-[#0F1C2E]">{n.title}</h4>
                      <p className="text-sm text-gray-600 mt-2">{n.excerpt}</p>
                      <a
                        href={n.href}
                        className="inline-block mt-4 text-sm text-[#D4A75D] font-medium"
                      >
                        Leer noticia →
                      </a>
                    </article>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
