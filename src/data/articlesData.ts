export type Article = {
  slug: string;
  title: string;
  subtitulo?: string;
  autor?: string;
  fuente?: string;
  fecha: string;
  tipo?: "diario" | "doctrinario";
  excerpt: string;
  resumen?: string;
  sumario?: string[];
  sections?: {
    id: string;
    title: string;
    summary?: string;
  }[];
  pdfUrl?: string;
};


export const articlesData: Article[] = [
  {
    slug: "impacto-ccc-societario",
    title: "Impacto del Código Civil y Comercial en materia societaria",
    subtitulo: "A diez años de su entrada en vigencia",
    autor: "Emilio F. Moro",
    fuente: "LA LEY",
    fecha: "2025-10-20",
    tipo: "doctrinario",

    excerpt:
      "Análisis del impacto del Código Civil y Comercial en la práctica societaria argentina, a diez años de su entrada en vigencia.",

    resumen:
      "El artículo examina los principales cambios introducidos por el Código Civil y Comercial en materia societaria, abordando la responsabilidad de los administradores, las asambleas digitales y nuevas herramientas jurídicas aplicables a las sociedades.",

    sumario: [
      "Introducción.",
      "Asambleas digitales.",
      "Responsabilidad de administradores.",
      "Dolo eventual.",
      "Obligaciones de resultado.",
      "Bloqueos societarios.",
      "Daños indirectos.",
      "Protocolos de familia.",
      "Conclusión.",
    ],

    pdfUrl: "/pdf/Diario 20-10-25.pdf",

    sections: [
      {
        id: "i-introduccion",
        title: "Introducción",
        summary:
          "Plantea el objetivo del trabajo y el contexto normativo del Código Civil y Comercial en el derecho societario.",
      },
      {
        id: "ii-asambleas-digitales",
        title: "Asambleas digitales",
        summary:
          "Analiza el impacto del art. 158 del Código Civil y Comercial en la celebración de asambleas virtuales.",
      },
      {
        id: "iii-administradores",
        title: "Administradores societarios",
        summary:
          "Examina los deberes, la diligencia exigida y la interacción entre normas civiles y societarias.",
      },
      {
        id: "iv-dolo-eventual",
        title: "Dolo eventual",
        summary:
          "Estudia la expansión del concepto de dolo eventual y sus riesgos en la responsabilidad de administradores.",
      },
      {
        id: "v-obligaciones-resultado",
        title: "Obligaciones de resultado",
        summary:
          "Describe supuestos específicos donde el administrador asume obligaciones calificadas como de resultado.",
      },
      {
        id: "vi-bloqueo",
        title: "Bloqueo societario",
        summary:
          "Presenta alternativas legales frente a situaciones de obstrucción en el órgano de administración.",
      },
      {
        id: "vii-danos-indirectos",
        title: "Daños indirectos",
        summary:
          "Analiza la admisión de la reparación de daños indirectos conforme al art. 1739 del Código.",
      },
      {
        id: "viii-protocolos-familia",
        title: "Protocolos de familia",
        summary:
          "Aborda la utilidad de los protocolos familiares y la transición generacional en empresas familiares.",
      },
      {
        id: "ix-conclusion",
        title: "Conclusión",
        summary:
          "Conclusiones y recomendaciones prácticas para la gestión societaria actual.",
      },
    ],
  },


  {
    slug: "diario-14-4-25",
    title: "Los criptoactivos y su incidencia en el nacimiento, funcionamiento y desarrollo de las sociedades comerciales",
    subtitulo: "Nota de prensa",
    autor: "Emilio F. Moro",
    fuente: "Diario",
    fecha: "2025-04-15",
    tipo: "diario",

    excerpt:
      "Nota periodística publicada el 14 de abril de 2025 sobre actualidad jurídica.",

    resumen:
      "Artículo periodístico publicado en abril de 2025. El contenido completo se encuentra disponible en el documento original en formato PDF.",

    pdfUrl: "/pdf/Diario 14-4-25.pdf",
    sections: [],
  },
];
