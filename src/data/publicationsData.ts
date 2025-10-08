export type Author = {
  id: string;
  name: string;
  slug?: string;
  bio?: string;
  avatar?: string;
};

export type Publication = {
  id: string;
  title: string;
  type: "libro" | "articulo";
  authorId: string;
  cover?: string;
  excerpt?: string;
  year?: number;
  pages?: number;
  href?: string;
  pdfUrl?: string;
  tags?: string[];
};

export const AUTHORS: Author[] = [
  { id: "a1", name: "Carlos E. Moro" },
  { id: "a2", name: "Emilio F. Moro" },
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "b1",
    title: "Ley de Concursos Comentada, Anotada y Concordada",
    type: "libro",
    authorId: "a1",
    cover: "/mock/books/ley_concursos1.jpg",
    year: 1994,
    pages: 461,
    href: "/publicaciones/ley-de-concursos",
  },
  {
    id: "b2",
    title: "Ley de Concursos Comentada, Anotada y Concordada, Tomos I, II y III",
    type: "libro",
    authorId: "a1",
    cover: "/mock/books/ley_concursos2.jpg",
    year: 2005,
    pages: 2976,
    href: "/publicaciones/proyecto-de-reformas",
  },
  {
    id: "art1",
    title: "Responsabilidad Civil en obras",
    type: "articulo",
    authorId: "a1",
    excerpt: "Análisis de casos y recomendaciones para empresas constructoras.",
    href: "/publicaciones/responsabilidad-civil",
  },
  {
    id: "art2",
    title: "Protección de la imagen",
    type: "articulo",
    authorId: "a2",
    excerpt: "Sobre el derecho a la propia imagen y su resguardo legal.",
    href: "/publicaciones/proteccion-imagen",
  },
];