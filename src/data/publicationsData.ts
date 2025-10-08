export type Author = {
  id: string;
  name: string;
  slug?: string;
  bio?: string;
  avatar?: string;
};

export type Editorials = {
  id: string;
  name: string;
}

export type PublicationBooks = {
  id: string;
  title: string;
  type: "libro";
  authorId: string;
  cover?: string;
  excerpt?: string;
  year?: number;
  pages?: number;
  href?: string;
  pdfUrl?: string;
  tags?: string[];
  editorialId: string;
  clasification: string;
  format: string;
};

export type PublicationArt = {
  id: string;
  title: string;
  type:  "articulo";
  authorId: string;
  cover?: string;
  excerpt?: string;
  year?: number;
  pages?: number;
  href?: string;
  pdfUrl?: string;
  tags?: string[];
};

// Añadir este export para usar `type Publication` desde otros archivos
export type Publication = PublicationBooks | PublicationArt;

export const AUTHORS: Author[] = [
  { id: "a1", name: "Carlos E. Moro" },
  { id: "a2", name: "Emilio F. Moro" },
];

export const EDITORIALS: Editorials[] = [
  { id: "e1", name: "Delta Editora" },
];

// Lista combinada de libros y artículos
export const PUBLICATIONS: (PublicationBooks | PublicationArt)[] = [
  // Libros
  {
    id: "b1",
    title: "Ley de Concursos Comentada, Anotada y Concordada",
    type: "libro",
    authorId: "a1",
    cover: "/mock/books/ley_concursos1.jpg",
    excerpt: "Comentario y anotaciones con jurisprudencia relevante.",
    year: 1994,
    pages: 461,
    href: "/publicaciones/ley-de-concursos",
    pdfUrl: undefined,
    tags: ["Concursos", "Derecho"],
    editorialId: "e1",
    clasification: "Derecho Concursal",
    format: "Tapa Dura",
  },
  {
    id: "b2",
    title: "Proyecto de Reformas",
    type: "libro",
    authorId: "a1",
    cover: "/mock/books/proyecto_reformas.jpg",
    excerpt: "Propuestas y análisis críticos sobre reformas legales.",
    year: 2001,
    pages: 320,
    href: "/publicaciones/proyecto-de-reformas",
    tags: ["Reformas", "Legislación"],
    editorialId: "e1",
    clasification: "Derecho Público",
    format: "Tapa Blanda",
  },

  // Artículos
  {
    id: "art1",
    title: "Responsabilidad Civil en obras",
    type: "articulo",
    authorId: "a1",
    cover: "/mock/articles/responsabilidad_obras.jpg",
    excerpt: "Análisis de casos y recomendaciones para empresas constructoras.",
    year: 2019,
    pages: undefined,
    href: "/publicaciones/responsabilidad-civil",
    pdfUrl: "/mock/articles/responsabilidad_obras.pdf",
    tags: ["Responsabilidad Civil", "Construcción"],
  },
  {
    id: "art2",
    title: "Protección de la imagen",
    type: "articulo",
    authorId: "a2",
    cover: "/mock/articles/proteccion_imagen.jpg",
    excerpt: "Sobre el derecho a la propia imagen y su resguardo legal.",
    year: 2020,
    href: "/publicaciones/proteccion-imagen",
    pdfUrl: undefined,
    tags: ["Derechos de la Persona", "Imagen"],
  },
];