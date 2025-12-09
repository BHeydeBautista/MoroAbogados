import ArticleLayout from "@/components/articles/ArticleLayout";
// 💡 AJUSTA ESTA RUTA según donde hayas guardado tu archivo de datos
import { articlesData } from "../../../data/articlesData"; 

type ArticleType = (typeof articlesData)[number];

// 1. Cargamos el artículo de prueba
// En un proyecto real con rutas dinámicas, usarías `params.slug` para buscar el artículo.
const article = articlesData[0]; 

// Función auxiliar para renderizar el contenido HTML
function ArticleContentBody({ htmlContent }: { htmlContent: string }) {
    // Renderizamos el contenido HTML de forma segura.
    const content = (
        <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
    );

    return content;
}

// Generamos la estructura de secciones para el ArticleSidebar, usando el sumario
// o los `sections` ya presentes en los datos del artículo.
const getSectionsFromArticle = (article: ArticleType) => {
    if (article.sections && article.sections.length > 0) return article.sections;

    return (article.sumario || []).map((item: string) => {
        const id = item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
        // Resumen provisional: breve frase basada en el título del apartado.
        const summary = `Se aborda: ${item.replace(/^\w+\.?\s*/, '')}. Resumen breve sobre los puntos claves tratados.`;
        return { id, title: item, summary };
    });
};

export default function ArticleDetailPage() {
    if (!article) {
        return <div className="text-white p-10">Error: Artículo no encontrado.</div>;
    }

    // Adaptamos el formato de fuente para que se vea como en tu ejemplo original
    const formattedFuente = `${article.fuente} — ${article.fecha.split('-').reverse().join('/')}`;
    const sections = getSectionsFromArticle(article);

    return (
        <ArticleLayout
            title={article.title}
            subtitulo={article.subtitulo}
            autor={article.autor}
            fuente={formattedFuente}
            fecha={article.fecha}
            sumario={article.sumario}
            // Pasamos las secciones (con summaries) para el sidebar y el contenido
            sections={sections}
            pdfUrl={article.pdfUrl}
        >
            {/* Aquí pasamos el contenido dinámico */}
            <ArticleContentBody 
                htmlContent={article.html}
            />
        </ArticleLayout>
    );
}