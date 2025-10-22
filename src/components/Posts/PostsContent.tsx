/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import InstagramPosts, { IGPost } from "./InstagramPosts";
import PublicationsGrid from "./Publications/PublicationsGrid";
import NewsList from "./NewsList";

const mockedPosts: IGPost[] = [
  {
    id: "1",
    media_url: "/mock/1.png",
    caption: "🧑‍⚖️✨ ¡Este viernes participamos de una jornada imperdible!",
    permalink: "https://www.instagram.com/p/Cmock1/",
    timestamp: "2025-09-01",
  },
  {
    id: "2",
    media_url: "/mock/2.png",
    caption: "🏗️ ¿Qué pasa si se cae una obra?",
    permalink: "https://www.instagram.com/p/Cmock2/",
    timestamp: "2025-08-10",
  },
  {
    id: "3",
    media_url: "/mock/3.png",
    caption: "🔒 ¿Sabías que tu imagen es un derecho protegido por la ley?",
    permalink: "https://www.instagram.com/p/Cmock3/",
    timestamp: "2025-07-01",
  },
];

export default function PostsContent() {
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
      className="bg-gradient-to-b from-white to-white/95 py-20 px-4 sm:px-6 lg:px-24 text-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#0F1C2E]">
            Contenido
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Últimas publicaciones desde Instagram, nuestras publicaciones propias y noticias de la firma.
          </p>
        </div>

        {/* Tabs: responsive — mobile scroll, desktop centrado */}
        <div className="mb-8">
          <div
            role="tablist"
            className="flex gap-3 overflow-x-auto no-scrollbar py-3 px-2 items-center md:justify-center"
          >
            {[
              { key: "instagram", label: "Instagram" },
              { key: "propias", label: "Publicaciones propias" },
              { key: "noticias", label: "Noticias" },
            ].map((tab) => {
              const isActive = active === (tab.key as any);
              return (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key as any)}
                  role="tab"
                  aria-selected={isActive}
                  className={`shrink-0 px-5 py-3 rounded-full text-sm font-medium transition ${
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
        </div>

        <div>
          <AnimatePresence mode="wait">
            {active === "instagram" && (
              <InstagramPosts posts={posts} loading={loading} error={error} pageSize={6} />
            )}

            {active === "propias" && <PublicationsGrid />}

            {active === "noticias" && <NewsList pageSize={4} />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
