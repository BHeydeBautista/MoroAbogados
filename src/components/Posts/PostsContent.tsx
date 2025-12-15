/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import InstagramPosts, { IGPost } from "./InstagramPosts";
import PublicationsGrid from "./Publications/PublicationsGrid";
import NewsList from "./NewsList";
import { useSearchParams } from "next/navigation";
import ArticlesList from "../articles/ArticlesList";
import es from "@/locales/es/content.json";
import en from "@/locales/en/content.json";
import { useLanguage } from "@/context/LanguageContext";

// Mocked posts de ejemplo (captions localizadas)
const createMockedPosts = (captions: string[]): IGPost[] => [
  {
    id: "1",
    media_url: "/mock/1.png",
    caption: captions[0] || "",
    permalink: "https://www.instagram.com/p/Cmock1/",
    timestamp: "2025-09-01",
  },
  {
    id: "2",
    media_url: "/mock/2.png",
    caption: captions[1] || "",
    permalink: "https://www.instagram.com/p/Cmock2/",
    timestamp: "2025-08-10",
  },
  {
    id: "3",
    media_url: "/mock/3.png",
    caption: captions[2] || "",
    permalink: "https://www.instagram.com/p/Cmock3/",
    timestamp: "2025-07-01",
  },
];

// Componente cliente para leer query params y actualizar la tab activa
function TabSelector({
  setActive,
}: {
  setActive: (tab: "instagram" | "propias" | "noticias" | "articulos") => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (
      tab === "instagram" ||
      tab === "propias" ||
      tab === "noticias" ||
      tab === "articulos"
    ) {
      setActive(tab);
    }
  }, [searchParams, setActive]);

  return null;
}

export default function PostsContent() {
  const [active, setActive] = useState<
    "instagram" | "propias" | "noticias" | "articulos"
  >("instagram");
  const [posts, setPosts] = useState<IGPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = language === "es" ? es.content : en.content;
  const mockedPosts = createMockedPosts(t.mocked_captions || []);

  // Fetch de posts de Instagram
  useEffect(() => {
    if (active !== "instagram") return;

    let mounted = true;
    setLoading(true);
    setError(null);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/instagram`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudo obtener posts");
        const data = await res.json();

        const igPosts: IGPost[] =
          data?.data?.map((p: any) => ({
            id: p.id,
            media_url: p.media_url || "",
            thumbnail_url: p.thumbnail_url || "",
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
          setError(t.ig_fetch_error);
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
        {/* Header */}
        <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#0F1C2E]">
              {t.title}
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
              {t.description}
            </p>
          </div>

        {/* Tabs */}
        <div className="mb-8">
          <div
            role="tablist"
            className="flex gap-3 overflow-x-auto no-scrollbar py-3 px-2 items-center md:justify-center"
          >
            {[
              { key: "instagram", label: t.tabs.instagram },
              { key: "propias", label: t.tabs.propias },
              { key: "noticias", label: t.tabs.noticias },
              { key: "articulos", label: t.tabs.articulos },
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
                  
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido de tabs */}
        <Suspense fallback={<p>{t.loading}</p>}>
          <TabSelector setActive={setActive} />
        </Suspense>

        <div>
          <AnimatePresence mode="wait">
            {active === "instagram" && (
              <InstagramPosts
                posts={posts}
                loading={loading}
                error={error}
                pageSize={6}
              />
            )}

            {active === "propias" && <PublicationsGrid />}

            {active === "noticias" && <NewsList pageSize={4} />}

            {active === "articulos" && (
              <ArticlesList
                pageSize={4}
                items={[
                  {
                    id: "1",
                    title: "Sociedades, responsabilidad de administradores...",
                    excerpt: "Análisis doctrinario publicado en La Ley.",
                    href: "/articles/sociedades-responsabilidad-2025",
                    autor: "Emilio F. Moro",
                    date: "2025-10-20",
                  },
                ]}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
