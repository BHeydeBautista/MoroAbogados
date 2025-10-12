import NewsLayout from "@/components/news/NewsLayout";

export default function NewsDetailPage() {
  return (
    <NewsLayout
      title="Constitución de la Provincia de Formosa"
      date="2025-09-05"
      description="Texto actualizado de la Constitución Provincial, con secciones organizadas e índice interactivo."
      sections={[
        { id: "preambulo", title: "Preámbulo" },
        { id: "articulo1", title: "Artículo 1" },
        { id: "articulo2", title: "Artículo 2" },
      ]}
    >
    </NewsLayout>
  );
}
