import ArticleLayout from "@/components/articles/ArticleLayout";
import { articlesData } from "../../../data/articlesData";

type ArticleType = (typeof articlesData)[number];

// ⚠️ Luego lo cambiás por params.slug
const article = articlesData[0];

const getSectionsFromArticle = (article: ArticleType) => {
  if (article.sections && article.sections.length > 0) {
    return article.sections;
  }

  return (article.sumario || []).map((item: string) => {
    const id = item
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-*|-*$/g, "");

    return {
      id,
      title: item,
      summary: undefined,
    };
  });
};

export default function ArticleDetailPage() {
  if (!article) {
    return <div className="text-white p-10">Artículo no encontrado.</div>;
  }

  const formattedFuente = article.fuente
    ? `${article.fuente} — ${article.fecha
        .split("-")
        .reverse()
        .join("/")}`
    : undefined;

  const sections = getSectionsFromArticle(article);

  return (
    <ArticleLayout
      title={article.title}
      subtitulo={article.subtitulo}
      resumen={article.resumen}
      autor={article.autor}
      fuente={formattedFuente}
      fecha={article.fecha}
      tipo={article.tipo}
      sumario={article.sumario}
      sections={sections}
      pdfUrl={article.pdfUrl}
    />
  );
}
