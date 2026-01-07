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
};

export type PublicationBooks = {
  id: string;
  title: string;
  type: "libro";
  authorId: string;
  cover?: string;
  ISBN?: string;
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
  type: "articulo";
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
  {
    id: "a1",
    name: "Carlos E. Moro",
  },
  {
    id: "a2",
    name: "Emilio F. Moro",
  },
];

export const EDITORIALS: Editorials[] = [
  { id: "e1", name: "Delta Editora" },
  { id: "e2", name: "Ad-Hoc" },
  { id: "e3", name: "La Ley" },
  { id: "e4", name: "Ediciones La Rocca" },
  { id: "e5", name: "Hammurabi, Buenos Aires" },
  { id: "e6", name: "Libreria Cívica, Santa Fe" },
  { id: "e7", name: "Marcial Pons" },
];

// Lista combinada de libros y artículos
export const PUBLICATIONS: (PublicationBooks | PublicationArt)[] = [
  // Libros
  {
    id: "b1",
    title: "Ley de Concursos Comentada, Anotada y Concordada. ",
    type: "libro",
    authorId: "a1",
    cover: "/mock/books/ley_concursos1.jpg",
    excerpt: "Comentario y anotaciones con jurisprudencia relevante.",
    year: 1994,
    pages: 461,
    href: "",
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
    cover: "/mock/books/libros4.jpg",
    excerpt: "Propuestas y análisis críticos sobre reformas legales.",
    year: 2001,
    pages: 320,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e1",
    clasification: "Derecho Público",
    format: "Tapa Dura",
  },
  {
    id: "b3",
    title:
      "Ley de Concursos Comentada, Anotada y Concordada, Tomos I, II y III",
    type: "libro",
    authorId: "a1",
    cover: "/mock/books/ley_concursos2.jpg",
    excerpt: "",
    year: 2005,
    pages: 2976,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e2",
    clasification: "Derecho Concursal",
    format: "Tapa Dura",
  },
  {
    id: "b4",
    title: "Ley 26.086. Concurso y Quiebras. Modificación a la ley 24.522",
    type: "libro",
    authorId: "a1",
    cover: "/mock/books/ley26086.jpg",
    excerpt: "",
    year: 2006,
    pages: 112,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e2",
    clasification: "Derecho Concursal",
    format: "Tapa Dura",
  },
  {
    id: "b5",
    title: "Cuestiones Concursales",
    type: "libro",
    authorId: "a1",
    cover: "/mock/books/cuestiones_concursales.jpg",
    excerpt: "",
    year: 2010,
    pages: 651,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e1",
    clasification: "Derecho Público",
    format: "Tapa Dura",
  },
  {
    id: "b6",
    title: "Digesto de Jurisprudencia Societaria de la Provincia de Entre Ríos",
    type: "libro",
    authorId: "a2",
    cover: "/mock/books/libro-digesto1.png",
    ISBN: "-",
    excerpt: "",
    year: 2021,
    pages: 0,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e1",
    clasification: "-",
    format: "Rústico",
  },
  {
    id: "b7",
    title: "Tratado de las sociedades de responsabilidad limitada",
    type: "libro",
    authorId: "a2",
    cover: "/mock/books/tratado_sociedades2.jpg",
    excerpt: "",
    ISBN: "978-987-03-3045-5",
    year: 2016,
    pages: 500,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e3",
    clasification: "-",
    format: "Tapa Dura",
  },
  {
    id: "b8",
    title: "Las Sociedades Comerciales frente al Derecho del Consumidor",
    type: "libro",
    authorId: "a2",
    cover: "/mock/books/em_sociedades_comerciales.jpg",
    excerpt: "",
    ISBN: "-",
    year: 2014,
    pages: 204,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e1",
    clasification: "Derecho Comercial",
    format: "Tapa Dura",
  },
  {
    id: "b9",
    title: "Culpa en la administración de sociedades comerciales",
    type: "libro",
    authorId: "a2",
    cover: "/mock/books/culpa.jpg",
    excerpt: "",
    ISBN: "978-987-517-141-1",
    year: 2013,
    pages: 532,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e4",
    clasification: "-",
    format: "Rústica",
  },
  {
    id: "b10",
    title: "Impugnación de actos del directorio de sociedades anónimas",
    type: "libro",
    authorId: "a2",
    cover: "/mock/books/impugnacion.jpg",
    excerpt: "",
    ISBN: "978-950-741-529-6",
    year: 2011,
    pages: 400,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e5",
    clasification: "Derecho Societario",
    format: "Rústica",
  },
  {
    id: "b11",
    title: "La Sociedad de Capital Unipersonal",
    type: "libro",
    authorId: "a2",
    cover: "/mock/books/soc_cap_unipersonal.jpg",
    excerpt: "",
    ISBN: "978-950-741-529-6",
    year: 2006,
    pages: 287,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e2",
    clasification: "-",
    format: "Tapa Dura",
  },
  {
    id: "b12",
    title: "¿Qué hacer con los principios generales del Derecho?",
    type: "libro",
    authorId: "a2",
    cover: "/mock/books/princ_gral_derecho.jpg",
    excerpt: "",
    ISBN: "950-20226-5-8",
    year: 2003,
    pages: 135,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e6",
    clasification: "-",
    format: "-",
  },
  {
    id: "b13",
    title: "Exclusión de Socio",
    type: "libro",
    authorId: "a2",
    cover: "/mock/books/exclusion.png",
    excerpt: "",
    ISBN: "950-20226-5-8",
    year: 0,
    pages: 0,
    href: "",
    tags: ["Reformas", "Legislación"],
    editorialId: "e7",
    clasification: "-",
    format: "-",
  },

  // Artículos
  {
    id: "art1",
    title: "ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL)",
    type: "articulo",
    authorId: "a1",
    cover: "/mock/articles/art.png",
    excerpt: "Análisis de casos y recomendaciones para empresas constructoras.",
    year: undefined,
    pages: undefined,
    href: "",
    pdfUrl: "",
    tags: [],
  },
  {
    id: "art2",
    title: "EL DERECHO",
    type: "articulo",
    authorId: "a1",
    cover: "/mock/articles/el_derecho.png",
    excerpt: "",
    year: undefined,
    pages: undefined,
    href: "",
    pdfUrl: "",
    tags: [],
  },
  {
    id: "art3",
    title: "ZEUS",
    type: "articulo",
    authorId: "a1",
    cover: "/mock/articles/ZEUS.png",
    excerpt: "",
    year: undefined,
    pages: undefined,
    href: "",
    pdfUrl: "",
    tags: [],
  },
  {
    id: "art4",
    title: "JURISPRUDENCIA ARGENTINA (LEXIS NEXIS)",
    type: "articulo",
    authorId: "a1",
    cover: "/mock/articles/JURISPRUDENCIA.png",
    excerpt: "",
    year: undefined,
    pages: undefined,
    href: "",
    pdfUrl: "",
    tags: [],
  },
  {
    id: "art5",
    title: "LA LEY",
    type: "articulo",
    authorId: "a1",
    cover: "/mock/articles/LA_LEY.png",
    excerpt: "",
    year: undefined,
    pages: undefined,
    href: "",
    pdfUrl: "",
    tags: [],
  },
  {
    id: "art6",
    title: "ARTÍCULOS",
    type: "articulo",
    authorId: "a2",
    cover: "/mock/articles/EMILIO F. MORO.png",
    excerpt: "",
    year: undefined,
    pages: undefined,
    href: "",
    pdfUrl: "",
    tags: [],
  }
];
