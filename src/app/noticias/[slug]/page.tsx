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
      <p id="preambulo">
        Nos, el Pueblo de la Provincia de Formosa, a través de sus representantes...
      </p>

      <h3 id="articulo1" className="text-xl font-semibold mt-8 mb-2">Artículo 1</h3>
      <p>
        La Provincia de Formosa, en ejercicio de su autonomía y como parte integrante e
        inseparable de la Nación Argentina...
      </p>

      <h3 id="articulo2" className="text-xl font-semibold mt-8 mb-2">Artículo 2</h3>
      <p>
        La Provincia adopta para su gobierno la forma representativa, republicana...
      </p>
    </NewsLayout>
  );
}
