import ArticleLayout from "@/components/articles/ArticleLayout";
import { articlesData, carlosArticles } from "@/data/articlesData";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;

  const allArticles = [...articlesData, ...carlosArticles];
  const article = allArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <ArticleLayout
      title={article.title}
      subtitulo={article.subtitulo}
      resumen={article.resumen || article.excerpt}
      autor={article.autor}
      fuente={article.fuente}
      fecha={article.fecha}
      tipo={article.tipo}
      sumario={article.sumario}
      sections={article.sections}
      pdfUrl={article.pdfUrl}
    />
  );
}
