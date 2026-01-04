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

// Artículos publicados por Carlos E. Moro (datos extraídos de la lista proporcionada)
export const carlosArticles: Article[] = [
  {
    slug: "puede-el-juez-regular-el-plazo-de-veinte-dias",
    title: "¿Puede El Juez Regular El Plazo “De Veinte Días” Del Art. 11 De La Ley De Concursos?, Ed, (120-296)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 120-296)",
    fecha: "",
    excerpt: "Tratamiento sobre la facultad judicial de regular plazos procesales conforme al art. 11 de la Ley de Concursos.",
  },
  {
    slug: "ni-aqui-ni-alla-notificaciones",
    title: "Ni Aquí, Ni Allá, Ni En Ningún Lugar. Notificaciones, Ed, (174-150)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 174-150)",
    fecha: "",
    excerpt: "Reflexiones sobre el régimen de notificaciones y su eficacia práctica.",
  },
  {
    slug: "es-apelable-la-sentencia-que-rechaza-la-quiebra-pedida-por-acreedor",
    title: "¿Es Apelable La Sentencia Que Rechaza La Quiebra Pedida Por Acreedor? Se Renuevan Las Leyes Pero No El Debate, Ed, (176-174)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 176-174)",
    fecha: "",
    excerpt: "Análisis de la apelabilidad en sentencias que deniegan la declaración de quiebra solicitada por acreedores.",
  },
  {
    slug: "reformas-concursales-propuestas",
    title: "Reformas Concursales Propuestas, Ed, (176-892)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 176-892)",
    fecha: "",
    excerpt: "Propuesta y comentario sobre reformas al derecho concursal.",
  },
  {
    slug: "ineficacia-un-caso-por-fortuna-inusua",
    title: "Ineficacia: Un Caso Por Fortuna Inusual, Ed, (179-395)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 179-395)",
    fecha: "",
    excerpt: "Comentario sobre situaciones de ineficacia contractual por eventos fortuitos.",
  },
  {
    slug: "sindico-naturaleza-de-sus-funciones",
    title: "Síndico: Naturaleza De Sus Funciones – Cosa Juzgada – Límites, Ed, (181-179)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 181-179)",
    fecha: "",
    excerpt: "Análisis sobre el síndico concursal, sus límites y relación con cosa juzgada.",
  },
  {
    slug: "si-ella-quiebra-quiebran-ellos",
    title: "Si Ella Quiebra, Quiebran Ellos: ¿Todos?, Ed, (183-38)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 183-38)",
    fecha: "",
    excerpt: "Reflexión sobre efectos patrimoniales de la quiebra de una parte en terceros relacionados.",
  },
  {
    slug: "grupo-concurso-competencia",
    title: "Grupo. Concurso. Competencia, Ed, (183-420)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 183-420)",
    fecha: "",
    excerpt: "Discusión sobre competencia judicial y concurso de acreedores en grupos empresariales.",
  },
  {
    slug: "verificacion-tardia-en-la-quiebra",
    title: "Verificación Tardía En La Quiebra, Ed, (184-167)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 184-167)",
    fecha: "",
    excerpt: "Estudio sobre la admisión tardía de créditos en procedimientos concursales.",
  },
  {
    slug: "fallidos-por-conveniencia",
    title: "Fallidos Por Conveniencia. Tercer Acto, Ed, (184-1403)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 184-1403)",
    fecha: "",
    excerpt: "Nota crítica sobre prácticas concursales vinculadas a declaraciones fraguadas.",
  },
  {
    slug: "notificado-ni-personalmente-ni-por-nota-ni-por-cedula",
    title: "Notificado: Ni Personalmente, Ni Por Nota, Ni Por Cedula,... Concursalmente, Ed, (187-615)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 187-615)",
    fecha: "",
    excerpt: "Cuestiones probatorias y formales en las notificaciones dentro del proceso concursal.",
  },
  {
    slug: "nueva-ley-de-quiebra-diario-del-lunes-3-de-junio-de-2002",
    title: "Nueva Ley De Quiebra Ed, Diario Del Lunes 3 De Junio De 2002 En Páginas 2, 3 Y 4)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 202-442)",
    fecha: "",
    excerpt: "Reseña sobre la nueva normativa concursal publicada en prensa especializada.",
  },
  {
    slug: "ya-no-sos-mi-margarita-ahora-te-llaman-margot",
    title: "Ya No Sos Mi Margarita…Ahora Te Llaman Margot, Ed, (202-442)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 202-442)",
    fecha: "",
    excerpt: "Comentario de lectura sobre una obra o caso con título metafórico.",
  },
  {
    slug: "los-bancos-no-se-concursan",
    title: "Los Bancos No Se Concursan. Los “Ex” Bancos, Tampoco, Ed, (204-976)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 204-976)",
    fecha: "",
    excerpt: "Debate sobre la concursabilidad de entidades bancarias y sus consecuencias legales.",
  },
  {
    slug: "atrapados-sin-salida",
    title: "Atrapados Sin Salida, Ed, (221-703)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 221-703)",
    fecha: "",
    excerpt: "Caso y análisis sobre deudores en situaciones insostenibles frente al concurso.",
  },
  {
    slug: "ayudame-a-que-te-ayude",
    title: "Ayudame A Que Te Ayude. Bien De Familia, Ed, (222-56)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 222-56)",
    fecha: "",
    excerpt: "Reflexión sobre el instituto del bien de familia y su protección jurídica.",
  },
  {
    slug: "el-derecho-concursal-somete-al-tributario",
    title: "El Derecho Concursal Somete Al Tributario. Nos Parece Correcto, Ed, (227-77)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 227-77)",
    fecha: "",
    excerpt: "Opinión sobre la relación entre derecho concursal y normas tributarias.",
  },
  {
    slug: "honorarios-no-regulados-verificacion-en-el-concurso",
    title: "Honorarios No Regulados. Verificación En El Concurso Del Condenado En Costas, Ed, (229-134)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 229-134)",
    fecha: "",
    excerpt: "Análisis sobre la verificación de honorarios no regulados en concursos.",
  },
  {
    slug: "dos-fallidas-una-quiebra",
    title: "Dos Fallidas = Una Quiebra. Sólo A Veces. Casi Como Excepción, Ed, (234-315)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 234-315)",
    fecha: "",
    excerpt: "Discusión sobre los umbrales que conducen a la declaración de quiebra.",
  },
  {
    slug: "fondo-de-garantias-de-creditos-laborales-23-anos-sin-reglamentar",
    title: "Fondo De Garantías De Créditos Laborales “23” Años Sin Reglamentar. ¿Nadie Es Responsable De Esta Desidia? ¿No Es Tiempo Acaso De Reglamentarlo?, Ed, (235)",
    autor: "Carlos E. Moro",
    fuente: "El Derecho (Ed. 235)",
    fecha: "",
    excerpt: "Crónica sobre la falta de reglamentación del fondo de garantías para créditos laborales.",
  },

  // ZEUS
  {
    slug: "zeus-el-sindico-es",
    title: "Y... El sindico... Es...? (28-D-3)",
    autor: "Carlos E. Moro",
    fuente: "ZEUS",
    fecha: "",
    excerpt: "Comentario breve sobre la figura del síndico concursal.",
  },

  // Jurisprudencia Argentina (Lexis Nexis)
  {
    slug: "derecho-concursal-cuestions-actuales",
    title: "Derecho Concursal. Cuestiones Actuales Del Régimen De La Ley 25589. Segunda Parte De Un Nro. Especial Coordinado Por Los Dres. Francisco Junyent Bas Y Carlos A. Molina Sandoval. 10 De Diciembre De 2003/Ja 2003-Iv Fascículo 11, Pág. 20: “Tome Nota: El Interés Concursal Regula, Somete, Limita Y Condiciona Los Intereses De La Dgi (Afip )",
    autor: "Carlos E. Moro",
    fuente: "Jurisprudencia Argentina (Lexis Nexis)",
    fecha: "2003-12-10",
    excerpt: "Segunda parte de un número especial sobre derecho concursal.",
  },
  {
    slug: "beneficio-de-litigar-sin-gastos",
    title: "“Beneficio De Litigar Sin Gastos. Ni Tan Fácil, Ni Para Todas Las Personas”. 16 De Febrero De 2005 Fascículo 7, Pág. 16",
    autor: "Carlos E. Moro",
    fuente: "Jurisprudencia Argentina (Lexis Nexis)",
    fecha: "2005-02-16",
    excerpt: "Análisis crítico sobre el beneficio de litigar sin gastos.",
  },

  // LA LEY
  {
    slug: "calidad-simulada-y-falsos-titulos",
    title: "Calidad Simulada Y Falsos Títulos Bajo El Prisma Quiebrista, Ll, (1985-C-1071)",
    autor: "Carlos E. Moro",
    fuente: "LA LEY",
    fecha: "",
    excerpt: "Estudio doctrinario sobre títulos simulados en el marco del derecho concursal.",
  },
  {
    slug: "homologacion-del-concordato",
    title: "Homologación Del Concordato. Cese De La Prohibición Para Salir Del País, Ll, (1994-D-141)",
    autor: "Carlos E. Moro",
    fuente: "LA LEY",
    fecha: "",
    excerpt: "Comentario sobre efectos del concordato y prohibiciones de salida del país.",
  },
  {
    slug: "quiebra-consecuencial-o-indirecta",
    title: "Quiebra Consecuencial O Indirecta. Trámite De La Apelación (1995-A-633)",
    autor: "Carlos E. Moro",
    fuente: "LA LEY",
    fecha: "",
    excerpt: "Procedimiento apelatorio en casos de quiebra consecuencial o indirecta.",
  },
  {
    slug: "sindico-concursal-sanciones",
    title: "Sindico Concursal. Sanciones. Ley 24.432 (1995-E-170)",
    autor: "Carlos E. Moro",
    fuente: "LA LEY",
    fecha: "",
    excerpt: "Commentario sobre las sanciones aplicables al síndico concursal bajo la ley citada.",
  },
  {
    slug: "excepcion-de-arraigo",
    title: "Excepción De Arraigo: ¿Es Posible En Los Concursos? (1996-A-1091)",
    autor: "Carlos E. Moro",
    fuente: "LA LEY",
    fecha: "1996",
    excerpt: "Análisis de la excepción de arraigo en procesos concursales.",
  },
  {
    slug: "facultades-del-juez-en-la-designacion-del-sindico-concursal",
    title: "Facultades Del Juez En La Designación Del Síndico Concursal. (2003-F-178)",
    autor: "Carlos E. Moro",
    fuente: "LA LEY",
    fecha: "2003",
    excerpt: "Discusión sobre las atribuciones judiciales al designar al síndico concursal.",
  },
  // ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL) - agregar entradas listadas
  {
    slug: "ERREPAR -un-privilegiado-en-la-ley-concursal",
    title: "Un Privilegiado En La Ley Concursal, 'Super Privilegiado' Por La Ley De Prenda Con Registro (T.1-122)",
    autor: "Carlos E. Moro",
    fuente: "ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL)",
    fecha: "",
    excerpt: "Comentarios sobre privilegios en la ley concursal y prenda con registro.",
  },
  {
    slug: "pedido-de-quiebra-rechazado-e-imposicion-de-costas",
    title: "Pedido De Quiebra Rechazado E Imposición De Costas (T.1-147)",
    autor: "Carlos E. Moro",
    fuente: "ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL)",
    fecha: "",
    excerpt: "Análisis sobre consecuencias de rechazar pedidos de quiebra y costas.",
  },
  {
    slug: "verificacion-de-creditos-y-sentencias-dictadas-en-juicio-ejecutivo",
    title: "Verificación De Créditos Y Sentencias Dictadas En Juicio Ejecutivo (T.1-124)",
    autor: "Carlos E. Moro",
    fuente: "ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL)",
    fecha: "",
    excerpt: "Observaciones sobre la verificación de créditos y sentencias en juicio ejecutivo.",
  },
  {
    slug: "apoderado-judicial-de-sociedad-anonima-excepcion-de-alta-de-personeria",
    title: "Apoderado Judicial De Sociedad Anónima. Excepción De Alta De Personería (T.1-248)",
    autor: "Carlos E. Moro",
    fuente: "ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL)",
    fecha: "",
    excerpt: "Nota sobre representación judicial y excepciones de personería.",
  },
  {
    slug: "plazo-de-gracia-en-los-concursos",
    title: "Plazo De Gracia En Los Concursos (T II-320)",
    autor: "Carlos E. Moro",
    fuente: "ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL)",
    fecha: "",
    excerpt: "Discusión sobre plazos de gracia aplicables en concursos.",
  },
  {
    slug: "impugnacion-al-acuerdo-art-59-lc",
    title: "Impugnación Al Acuerdo (Art. 59, L.C.) (T.II-649)",
    autor: "Carlos E. Moro",
    fuente: "ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL)",
    fecha: "",
    excerpt: "Comentarios sobre la impugnación de acuerdos concursales conforme al art. 59.",
  },
  {
    slug: "concurso-sin-sujeto",
    title: "Concurso Sin Sujeto (T.Iv-911)",
    autor: "Carlos E. Moro",
    fuente: "ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL)",
    fecha: "",
    excerpt: "Reflexión doctrinaria sobre situaciones de concurso sin sujeto identificable.",
  },
  {
    slug: "administracion-concursal-el-dia-despues",
    title: "Administración Concursal: “El Día Después” (T. Xvii -552)",
    autor: "Carlos E. Moro",
    fuente: "ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL)",
    fecha: "",
    excerpt: "Sobre la administración concursal y medidas posteriores al proceso.",
  },
  {
    slug: "verificacion-de-creditos-sentencia-corte-federal-sociedad-comercial-plata",
    title: "Verificación De Créditos (Tomo Xxii – N°266 – Enero 2010)La Sentencia De La Corte Federal En “Sociedad Comercial Del Plata Sa”. Algo Más",
    autor: "Carlos E. Moro",
    fuente: "ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL)",
    fecha: "2010-01",
    excerpt: "Análisis sobre verificación de créditos y sentencia de la Corte Federal en Sociedad Comercial Del Plata S.A.",
  },
  {
    slug: "que-un-fallo-mas-tomo-xxii",
    title: "Que Un Fallo Más. (Tomo Xxii – N°267 – Febrero 2010)",
    autor: "Carlos E. Moro",
    fuente: "ERREPAR (DOCTRINA SOCIETARIA Y CONCURSAL)",
    fecha: "2010-02",
    excerpt: "Comentario sobre fallo publicado en Tomo XXII.",
  },
];
