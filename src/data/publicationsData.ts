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
  editorialId?: string;
};

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
    excerpt: 'Con prólogo "de Osvaldo Maffía. Editado en Entre Ríos en Marzo de 1994 por Delta Editora. "…joven entrerriano, que ha logrado vencer ese fatídico sino que hace que -quienes trabajan y escriben en el interior del país- difícilmente alcancen trascendencia a nivel nacional(…)es sumamente valioso que haya otorgado un lugar preponderante a los fallos concebidos en sus pagos(…)las propuestas que formula no son para el topos urano platónico, sino para esta Argentina nuestra de los día que corren(…)obra profunda, solvente y clara"(sic, Bibliografía, Ernesto Eduardo Martorell, Diario La Ley del martes 20 de diciembre de 1994). Presentación del libro que fue declarada de interés académico por la Universidad Nacional de Entre Ríos (Resolución de la UNER número 099-94 de fecha 13/04/1994)',
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
    id: "b3",
    title:
      "Ley de Concursos Comentada, Anotada y Concordada, Tomos I, II y III",
    type: "libro",
    authorId: "a1",
    cover: "/mock/books/ley_concursos2.jpg",
    excerpt: 'Tres Tomos, con prólogo de Jaime Anaya. Editada por Ad-Hoc. Buenos Aires 2005/7 "Tal como lo hiciera en su obra de 1994, recorre con acierto la doctrina judicial y pone cuidado en destacar la contribución de los tribunales provinciales, dando particular relieve a los fallos de la Suprema Corte de Justicia de Mendoza, en comprensible muestra de reconocimiento a la notable jurista Aída Kemelmajer de Carlucci, que desde allí viene cumpliendo una destacada tarea. En la "Introducción" a sus comentarios sobre el proyecto de la que sería ley 24.522, Moro se hizo eco de las opiniones de la ilustrada jurista para sostener que se debe otorgar la posibilidad de reconversión, reestructuración mediante, a las empresas cuya perduración sea posible; mientras que a las que no sean viables hay que liquidarlas rápidamente. Al servicio de estas premisas se encuentran los comentarios de esta obra madura de Carlos E. Moro, desenvueltos con una pluma ágil, erudita, vehemente y por momentos áspera, con el énfasis que sabe poner quien está convencido de que la prioridad para la Argentina es salir de su default ético." Jaime L. Anaya',
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
  {
    id: "b14",
    title: "Situaciones Problemáticas en impugnaciones asablearias",
    type: "libro",
    authorId: "a2",
    cover: "/mock/books/situacionesProblematicas.png",
    excerpt: "",
    ISBN: "",
    year: 2024,
    pages: 0,
    href: "",
    tags: [],
    editorialId: "e3",
    clasification: "-",
    format: "-",
  },
  {
    id: "b15",
    title: "Ley de Concursos - Ley N° 24.522 con sus reformas 25.563, 25.589, 26.086 y 26.684",
    type: "libro",
    authorId: "a1",
    cover: "/mock/books/ley_concursos3.jpg",
    excerpt: "",
    ISBN: "",
    year: 2011,
    pages: 148,
    href: "",
    tags: [],
    editorialId: "e1",
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
    title: "Proyecto de Reformas",
    type: "articulo",
    authorId: "a1",
    cover: "/mock/books/libros4.jpg",
    excerpt: "Comentario al proyecto luego Ley 24522. Editado en Entre Ríos en Noviembre de 1994 por Delta Editora. Reformas sobre las cuales expuso junto con los Dres. Adolfo A. N. Roullión y Osvaldo J. Maffía como Profesores invitados en la Honorable Cámara de Diputados del Congreso de la Nación en 1995.",
    year: 1994,
    pages: 320,
    href: "",
    pdfUrl: "",
    tags: ["Reformas", "Legislación", "La Ley"],
    editorialId: "e3",
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
