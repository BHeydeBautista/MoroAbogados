

export interface Lawyer {
  slug: string;
  name: string;
  title: string;
  title_en?: string;
  email: string;
  image: string;

  personal: {
    birthDate: string;
    birthPlace: string;
    civilStatus?: string;
    address?: string;
    phone?: string;
  };

  education: {
    primary: string;
    secondary: string;
    university: string;
    university_en?: string;
    postgraduate?: string;
    doctorate?: string;
  };

  books?: Array<{
    title: string;
    year?: string;
    description?: string;
  }>;

  books_en?: Array<{
    title_en: string;
    year?: string;
    description?: string;
  }>;

  articles: Array<{ title: string; publication?: string; year?: string }>;

  articles_en?: Array<{
    title_en?: string;
    publication_en?: string;
    year?: string;
  }>;

  academicPositions: Array<{
    title: string;
    institution: string;
    period: string;
  }>;

  universityRoles: Array<{ title: string; year: string }>;

  awards: Array<{ title: string; year?: string }>;

  scholarships: Array<{ title: string; year?: string }>;

  languages?: Array<{ language: string; certificates: string[] }>;

  conferences: Array<{ title: string; year?: string }>;

  integratedRoles?: {
    institutions: string[];
    started?: Array<{
      title: string;
      description: string;
    }>;
    end?: Array<{
      title: string;
      description: string;
    }>;
  };

  journals?: Array<{
    journal: string;
    publisher?: string;
    director?: string;
    country?: string;
    articles: Array<{
      title: string;
      year?: string;
      reference?: string;
    }>;
  }>;

  newspapers?: Array<{
    newspaper: string;
    articles: Array<{
      title: string;
      reference?: string;
      year?: string;
    }>;
  }>;

  dailyColumns?: Array<{
    newspaper: string;
    articles: Array<{
      title: string;
      date: string;
    }>;
  }>;

  otherRoles: Array<{ title: string; string?: string[] }>;
  otherRoles_en?: Array<{ title_en?: string; string_en?: string[] }>;

  otherAntecedentes: string[];
  otherAntecedentes_en?: string[];
}

export const lawyerDetails: Record<string, Lawyer> = {
  "dr-carlos-moro": {
    slug: "dr-carlos-moro",
    name: "Dr. Carlos E. Moro",
    email: "prueba@gmail.com",
    title: "Abogado, especialista en Derecho Concursal",
    title_en: "Lawyer, specialist in Insolvency Law",
    image: "/img/lawyers/Dr-Carlos.jpg",

    personal: {
      birthDate: "13 de enero de 1955",
      birthPlace: "Paraná, Entre Ríos",
      civilStatus: "",
      address: "",
      phone: "",
    },

    education: {
      primary: "",
      secondary: "",
      university: "Abogado – Universidad Nacional del Litoral (1976)",
      university_en: "Lawyer – National University of the Litoral (1976)",
      postgraduate: "",
      doctorate: "",
    },

    integratedRoles: {
      institutions: [
        "COLEGIO DE ABOGADOS DE LA PROVINCIA DE ENTRE RIOS, como VicePresidente de la Sección Paraná, 1990/2.",
        "COMISIONES LEGISLATIVAS, como Co-redactor del ANTEPROYECTO de REFORMAS del CODIGO PROCESAL CIVIL y COMERCIAL de la PROVINCIA DE ENTRE RIOS, que tuvo media sanción de la Honorable Cámara de Diputados de la Provincia de Entre Ríos en el año 1995.",
        "CONSEJO de la MAGISTRATURA de la Provincia, como Jurado en el año 2005, propuesto por el Colegio de Abogados de la Provincia de E.R., en el concurso para Juez de Primera Instancia en lo Civil y Comercial de Concepción del Uruguay.",
        "MIEMBRO TITULAR del INSTITUTO DE LA EMPRESA de la Academia Nacional de Derecho y Ciencias Sociales de Córdoba.",
        "MIEMBRO del CONSEJO de REDACCION de la REVISTA de las SOCIEDADES y CONCURSOS (RSC).",
        "MIEMBRO fundador y actual Director del INSTITUTO DE DERECHO CONCURSAL del Colegio de Abogados de la Provincia de Entre Ríos.",
        "DIRECTOR de la Sección Societaria y Concursal de la Editorial DELTA",
        "MIEMBRO ACTIVO de Jornadas y Congresos Nacionales e Internacionales de Derecho Concursal y de los Institutos de Derecho Comercial de la República Argentina.",
      ],
      started: [
        {
          title: "Expositor",
          description: "CURSO DE ACTUALIZACIÓN EN DERECHO COMERCIAL organizado en 1988 en la Universidad Notarial Argentina juntamente con los Dres Ernesto Martorell, Salvador Bergel. Francisco Caputo, Edgardo Alberti, Daniel Vitolo, Norberto Benseñor, Eduardo Favier Dubois (h.), Enrique Butty y Ricardo Nissen."
        },
      ],
      end: [
        {
          title: "Profesor",
          description: "invitado a la Primera CARRERA DE POST-GRADO: de ESPECIALIZACIÓN EN SINDICATURA y en ASESORAMIENTO CONCURSAL, organizada en la Universidad Notarial Argentina dirigida por el Dr. Héctor Cámara, dictada en el año 1.990."
        }
      ]
    },

    books: [
      {
        title: "Ley de Concursos. Comentada, Anotada y Concordada",
        year: "1994",
        description:
          "Con prólogo de Osvaldo Maffía. Editado en Entre Ríos en marzo de 1994 por Delta Editora. La presentación del libro fue declarada de interés académico por la Universidad Nacional de Entre Ríos (Resolución UNER N° 099-94 del 13/04/1994). Comentado favorablemente por Ernesto Eduardo Martorell en Diario La Ley (20/12/1994).",
      },
      {
        title: "Proyectos de Reformas. Ley de Concursos",
        year: "1994",
        description:
          "Comentario al proyecto luego convertido en Ley 24.522. Editado en Entre Ríos en noviembre de 1994 por Delta Editora. Reformas expuestas junto a los Dres. Adolfo A. N. Roullión y Osvaldo J. Maffía como profesores invitados en la Honorable Cámara de Diputados del Congreso de la Nación en 1995.",
      },
      {
        title: "Ley de Concursos",
        year: "2005",
        description:
          "Tres tomos, con prólogo de Jaime Anaya. Editada por Ad-Hoc, Buenos Aires (2005/2007). Obra que recorre la doctrina judicial con especial énfasis en la jurisprudencia de tribunales provinciales y la Suprema Corte de Justicia de Mendoza.",
      },
      {
        title:
          "Ley 26.086. Concursos y Quiebras. Modificación de la Ley 24.522",
        year: "2006",
        description: "Editada por Ad-Hoc. Buenos Aires.",
      },
      {
        title: "El Concurso Preventivo y la Quiebra",
        year: "2004",
        description:
          "Cinco tomos. Editado por Lexis Nexis (Depalma), Buenos Aires. Obra de Héctor Cámara actualizada bajo la dirección de Ernesto Eduardo Martorell, en coautoría con diversos especialistas.",
      },
      {
        title: "Anuario de Derecho Concursal",
        year: "2004",
        description:
          "Obra colectiva. Director Jorge Daniel Grispo. Editada por Ad-Hoc. Años 4 y 5 (2004/2005).",
      },
      {
        title: "Dinámica Judicial y Acciones en las Sociedades y Concursos",
        year: "2007",
        description:
          "Editada por Advocatus. Obra colectiva en homenaje al Dr. Francisco Junyent Bas. Coordinadores: E. Daniel Truffat y Carlos A. Molina Sandoval. Córdoba.",
      },
      {
        title:
          "Resoluciones Alternativas de Conflictos en la Crisis de la Empresa y el Consumidor",
        year: "2010",
        description:
          "Obra colectiva auspiciada por el Instituto de Derecho Concursal y la Empresa en Crisis del Colegio de Abogados de Tucumán, en reconocimiento a la trayectoria del Dr. Francisco Junyent Bas.",
      },
      {
        title: "Ensayos de Derecho Empresario",
        year: "2011",
        description:
          "Obra colectiva in memoriam de Francisco A. Junyent Vélez. Dirección y coordinación: Luisa Isabel Borgarello, Efraín Hugo Richard y José María Rodríguez Pardina. Editorial Advocatus, Córdoba.",
      },
      {
        title: "Homenaje al Dr. Osvaldo J. Maffía",
        year: "2008",
        description:
          "Obra colectiva. Editada por la Fundación para la Investigación del Derecho Concursal y la Empresa en Crisis y el Instituto Argentino de Derecho Comercial. Tucumán.",
      },
      {
        title: "Ley de Concursos. Introducción y Estudio",
        year: "2011",
        description:
          "Introducción y reseña al texto ordenado de la Ley 24.522 con sus reformas. Delta Editora, Paraná.",
      },
      {
        title: "Ley de Concursos y Quiebras. Comentada",
        year: "2012",
        description:
          "Cinco tomos. Editada por Editorial La Ley, Buenos Aires. Obra colectiva dirigida por Ernesto Eduardo Martorell.",
      },
      {
        title: "Cuestiones Concursales",
        year: "2010",
        description:
          "Director de esta obra colectiva de magistrados, funcionarios y letrados entrerrianos. Editada por Delta Editora, Paraná.",
      },
    ],

    books_en: [
      {
        title_en: "Bankruptcy Law. Commented, Annotated and Concordant",
        year: "1994",
        description:
          "With a foreword by Osvaldo Maffía. Published in Entre Ríos in March 1994 by Delta Editora. The book presentation was declared of academic interest by the National University of Entre Ríos (Resolution UNER No. 099-94, dated April 13, 1994). Favorably reviewed by Ernesto Eduardo Martorell in Diario La Ley (December 20, 1994).",
      },
      {
        title_en: "Draft Reform Projects. Bankruptcy Law",
        year: "1994",
        description:
          "Commentary on the draft that later became Law No. 24,522. Published in Entre Ríos in November 1994 by Delta Editora. The proposed reforms were presented jointly with Drs. Adolfo A. N. Roullión and Osvaldo J. Maffía as invited professors before the Chamber of Deputies of the National Congress in 1995.",
      },
      {
        title_en: "Bankruptcy Law",
        year: "2005",
        description:
          "Three volumes, with a foreword by Jaime Anaya. Published by Ad-Hoc, Buenos Aires (2005–2007). A mature work reviewing judicial doctrine with particular emphasis on provincial court jurisprudence and decisions of the Supreme Court of Justice of Mendoza.",
      },
      {
        title_en:
          "Law No. 26,086. Bankruptcy and Insolvency. Amendment to Law No. 24,522",
        year: "2006",
        description: "Published by Ad-Hoc. Buenos Aires.",
      },
      {
        title_en: "Preventive Reorganization and Bankruptcy",
        year: "2004",
        description:
          "Five volumes. Published by Lexis Nexis (Depalma), Buenos Aires. Original work by Héctor Cámara, updated under the direction of Ernesto Eduardo Martorell, in co-authorship with several leading insolvency law scholars.",
      },
      {
        title_en: "Yearbook of Insolvency Law",
        year: "2004",
        description:
          "Collective work. Directed by Jorge Daniel Grispo. Published by Ad-Hoc. Volumes corresponding to years 4 and 5 (2004–2005).",
      },
      {
        title_en:
          "Judicial Dynamics and Actions in Corporate and Bankruptcy Matters",
        year: "2007",
        description:
          "Published by Advocatus. Collective work in tribute to Dr. Francisco Junyent Bas. Coordinated by E. Daniel Truffat and Carlos A. Molina Sandoval. Córdoba.",
      },
      {
        title_en:
          "Alternative Dispute Resolution in Business and Consumer Crisis",
        year: "2010",
        description:
          "Collective work sponsored by the Institute of Insolvency Law and Business Crisis of the Bar Association of Tucumán, published in recognition of the career of Dr. Francisco Junyent Bas.",
      },
      {
        title_en: "Essays on Business Law",
        year: "2011",
        description:
          "Collective work in memoriam of Francisco A. Junyent Vélez. Directed and coordinated by Luisa Isabel Borgarello, Efraín Hugo Richard and José María Rodríguez Pardina. Published by Advocatus, Córdoba.",
      },
      {
        title_en: "Tribute to Dr. Osvaldo J. Maffía",
        year: "2008",
        description:
          "Collective work. Published by the Foundation for Research in Insolvency Law and Business Crisis and the Argentine Institute of Commercial Law. Tucumán.",
      },
      {
        title_en: "Bankruptcy Law. Introduction and Study",
        year: "2011",
        description:
          "Introduction and analysis of the consolidated text of Law No. 24,522 and its subsequent amendments. Delta Editora, Paraná.",
      },
      {
        title_en: "Bankruptcy and Insolvency Law. Commented",
        year: "2012",
        description:
          "Five volumes. Published by Editorial La Ley, Buenos Aires. Monumental collective work directed by Ernesto Eduardo Martorell.",
      },
      {
        title_en: "Insolvency Issues",
        year: "2010",
        description:
          "Director of this collective work authored by magistrates, court officials and attorneys from Entre Ríos Province. Published by Delta Editora, Paraná.",
      },
    ],

    journals: [
      {
        journal: "Derecho Comercial y de las Obligaciones (RDCO)",
        publisher: "LexisNexis - Depalma",
        director: "Raúl A. Etcheverry",
        articles: [
          {
            title:
              "La reciprocidad: un problema de los unos y los otros. Concurso declarado en el extranjero. Apertura en el país. Sujetos legitimados",
            year: "2005",
            reference: "2005-B, Año 38, p. 881",
          },
          {
            title:
              "La propuesta concordataria la aceptan o rechazan los acreedores concurrentes que verificaron… Nadie más",
            year: "2007",
            reference: "2007-A, Año 40, p. 387",
          },
        ],
      },
      {
        journal: "Derecho y Empresa (DYE)",
        publisher: "Facultad de Ciencias Empresariales – Universidad Austral",
        director: "Adolfo A. N. Rouillón",
        articles: [
          {
            title: "Concurso en caso de agrupamiento",
            reference: "Tomo 4 – Homenaje a Héctor Cámara, p. 167",
          },
          {
            title: "Seguros y concursos: asignaturas pendientes",
            reference: "Tomo 7/8 – Homenaje a J. C. Morandi, p. 65",
          },
          {
            title: "Cramdown",
            year: "2004",
            reference:
              "Homenaje al Juez Guillermo Mosso – Obra Colectiva Derecho Concursal, La Ley",
          },
        ],
      },
      {
        journal: "Instituto Argentino de Derecho Comercial",
        publisher: "Editorial Legis",
        director: "Martín Arecha",
        articles: [
          {
            title:
              "Aspectos contables, impositivos y previsionales en las sociedades y los concursos",
            year: "2010",
          },
          {
            title: "El fideicomiso en las sociedades y los concursos",
            year: "2011",
          },
          {
            title:
              "Los derechos de los trabajadores en las sociedades y los concursos",
            year: "2012",
          },
          {
            title:
              "Aspectos contables, impositivos y previsionales en las sociedades y los concursos",
            year: "2013",
          },
          {
            title: "Cuestiones procesales en las sociedades y los concursos",
            year: "2014",
          },
          {
            title:
              "Institutos del Derecho Comercial a la luz del Nuevo Código Civil y Comercial de la Nación",
            year: "2016",
          },
          {
            title: "Crowdfunding y sociedades por acciones simplificadas",
            year: "2018",
          },
        ],
      },
      {
        journal: "Derecho Societario y Concursal Panamericano",
        country: "Costa Rica",
        articles: [
          {
            title: "Concursarse es un derecho. Colaborar es un deber",
            year: "2014",
          },
          {
            title: "El abuso del derecho en el proceso concursal",
            year: "2017",
          },
        ],
      },
      {
        journal: "De las Sociedades y Concursos (DSC)",
        publisher: "Ad-Hoc / Legis",
        director: "Ricardo A. Nissen",
        articles: [
          {
            title: "Ni prohibido, ni prescripto; legal y justo",
            reference: "Revista 21, p. 75",
          },
          {
            title: "Juicios contra el concursado: ¿dónde?, ¿cómo?, ¿cuándo?",
            reference: "Revista 31, p. 49",
          },
          {
            title: "Cosa juzgada concursal. Inexistencia de deuda fiscal",
            reference: "Revista 47, p. 81",
          },
          {
            title: "Extensión de quiebra. Simulación e ineficacia",
            reference: "Revista 48, p. 107",
          },
          {
            title: "Concursos: cuestiones procesales",
            year: "2010",
          },
          {
            title: "La prescripción desde un prisma concursal",
            year: "2011",
          },
        ],
      },
      {
        journal: "Revista de Derecho Fiscal",
        publisher: "LexisNexis",
        director: "Alberto Tarsitano – Juan Carlos Yemma",
        articles: [
          {
            title:
              "Interacción de las sentencias dictadas por los fueros comercial y penal en materia tributaria",
            year: "2008",
            reference: "Enero / Febrero",
          },
        ],
      },
    ],

    newspapers: [
      {
        newspaper: "El Derecho",
        articles: [
          {
            title:
              "¿Puede el juez regular el plazo “de veinte días” del art. 11 de la Ley de Concursos?",
            reference: "120-296",
          },
          {
            title: "Ni aquí, ni allá, ni en ningún lugar",
            reference: "174-150",
          },
          {
            title:
              "¿Es apelable la sentencia que rechaza la quiebra pedida por acreedor? Se renuevan las leyes pero no el debate",
            reference: "176-174",
          },
          {
            title: "Reformas concursales propuestas",
            reference: "176-892",
          },
          {
            title: "Ineficacia: un caso por fortuna inusual",
            reference: "179-395",
          },
          {
            title:
              "Síndico: naturaleza de sus funciones – cosa juzgada – límites",
            reference: "181-179",
          },
          {
            title: "Si ella quiebra, quiebran ellos: ¿todos?",
            reference: "183-38",
          },
          {
            title: "Grupo. Concurso. Competencia",
            reference: "183-420",
          },
          {
            title: "Verificación tardía en la quiebra",
            reference: "184-167",
          },
          {
            title: "Fallidos por conveniencia. Tercer acto",
            reference: "184-1403",
          },
          {
            title:
              "Ariel Ángel Dasso. Tendencias actuales del derecho concursal (comentario al libro)",
            reference: "188-1169",
          },
          {
            title:
              "Notificado: ni personalmente, ni por nota, ni por cédula… concursalmente",
            reference: "187-615",
          },
          {
            title: "Nueva ley de quiebra",
            reference: "197-1010",
          },
          {
            title: "Ineficacia de una sentencia: de eso no se habla",
            reference: "198-262",
          },
          {
            title: "Ya no sos mi Margarita… ahora te llaman Margot",
            reference: "202-442",
          },
          {
            title: "Los bancos no se concursan. Los “ex” bancos, tampoco",
            reference: "204-976",
          },
          {
            title: "Ayudame a que te ayude",
            reference: "222-56",
          },
          {
            title:
              "El derecho concursal somete al tributario. Nos parece correcto",
            reference: "227-77",
          },
          {
            title:
              "Honorarios no regulados. Verificación en el concurso del condenado en costas",
            reference: "229-134",
          },
          {
            title:
              "Dos fallidas = una quiebra. Solo a veces. Casi como excepción",
            reference: "234-51",
          },
          {
            title:
              "Fondo de garantías de créditos laborales: 23 años sin reglamentar. ¿Nadie es responsable de esta desidia?",
            reference: "234-315",
          },
        ],
      },
      {
        newspaper: "La Ley",
        articles: [
          {
            title:
              "Calidad simulada y falsos títulos bajo el prisma quiebrista",
            reference: "1985-C-1071",
          },
          {
            title:
              "Homologación del concordato. Cese de la prohibición para salir del país",
            reference: "1994-D-141",
          },
          {
            title: "Quiebra consecuencial o indirecta. Trámite de la apelación",
            reference: "1995-A-633",
          },
          {
            title: "Síndico concursal. Sanciones. Ley 24.432",
            reference: "1995-E-170",
          },
          {
            title: "Excepción de arraigo: ¿es posible en los concursos?",
            reference: "1996-A-1091",
          },
          {
            title:
              "Facultades del juez en la designación del síndico concursal",
            reference: "2003-F-178",
          },
        ],
      },
      {
        newspaper: "Jurisprudencia Argentina",
        articles: [
          {
            title:
              "Derecho concursal. Cuestiones actuales del régimen de la Ley 25.589. El interés concursal regula, somete y condiciona los intereses de la AFIP",
            year: "2003",
            reference: "JA 2003-IV, Fascículo 11, p. 20",
          },
          {
            title:
              "Beneficio de litigar sin gastos. Ni tan fácil, ni para todas las personas",
            year: "2005",
            reference: "JA Fascículo 7, p. 16",
          },
        ],
      },
      {
        newspaper: "Zeus",
        articles: [
          {
            title: "Y… el síndico… ¿es…?",
            reference: "28-D-3",
          },
        ],
      },
      {
        newspaper: "Microjuris – Biblioteca Virtual",
        articles: [],
      },
    ],

    dailyColumns: [
      {
        newspaper: "El Diario",
        articles: [
          { title: "Sin trabajo no hay esperanza", date: "03/04/1998" },
          { title: "Sin esperanza no hay futuro", date: "30/04/1998" },
          { title: "La realidad económica es la que es", date: "07/07/1998" },
          { title: "Mala praxis legislativa", date: "15/07/1999" },
          { title: "Alerta roja", date: "20/02/2000" },
          { title: "Movilizaciones, paros y ajustes", date: "14/06/2000" },
          { title: "Democracia. Una prueba de fuego", date: "24/09/2000" },
          { title: "Atrapados con salida", date: "20/07/2001" },
          { title: "Una Argentina creíble", date: "18/12/2001" },
          { title: "Una imagen vale más que mil palabras", date: "23/12/2001" },
          { title: "¿Y ahora qué?", date: "29/12/2001" },
          {
            title: "¿Alguna vez es tarde para hacer lo correcto?",
            date: "03/02/2002",
          },
          { title: "Claroscuros de una ley", date: "13/03/2002" },
          { title: "La reforma de la reforma", date: "21/04/2002" },
          { title: "La reforma de la reforma II", date: "04/05/2002" },
          {
            title: "Quiebras: una ley a medida de...",
            date: "08/05/2002",
          },
          { title: "¡Se puede! (1ª parte)", date: "08/08/2002" },
          { title: "¡Se puede! (2ª parte)", date: "09/08/2002" },
          {
            title: "Querer que se pueda. Saber que se puede",
            date: "06/09/2002",
          },
          {
            title: "Suba inflacionaria de la tasa del interés judicial",
            date: "17/09/2002",
          },
          {
            title: "El mundo existe (primera parte)",
            date: "02/10/2002",
          },
          { title: "Así no se puede", date: "17/11/2002" },
          {
            title:
              "Algo se debe hacer, algo hay que hacer, algo se puede hacer",
            date: "15/12/2002",
          },
          {
            title: "Responder a una ciudadanía que descree de la justicia",
            date: "16/12/2002",
          },
          {
            title: "La insoportable presión del Estado",
            date: "30/12/2002",
          },
          { title: "El peso de la verdad", date: "21/03/2004" },
          { title: "Zona de riesgo", date: "27/04/2005" },
        ],
      },
    ],

    articles: [
      {
        title:
          "La Responsabilidad Solidaria del Art. 31 de la Ley de Contrato de Trabajo",
        publication: "Visión Societaria y Concursal",
        year: "2004",
      },
      {
        title:
          "El Fondo de Garantía de los Créditos Laborales. La creación de lo que ya existe",
        publication:
          "XVI Jornadas de Institutos de Derecho Comercial de la República Argentina",
        year: "2007",
      },
      {
        title:
          "El 1º: El Término de la Prescripción Concursal no se desactiva con la Quiebra Indirecta",
        publication: "XVI Jornadas Institutos Derecho Comercial",
        year: "2007",
      },
      {
        title:
          "Verificación de Honorarios. Con condena en costas firme, pero no regulados",
        publication: "XVI Jornadas Institutos Derecho Comercial",
        year: "2007",
      },
      {
        title: "La Empresa del Ausente",
        publication: "XVI Jornadas Institutos Derecho Comercial",
        year: "2007",
      },
      {
        title:
          "El Estado de Cesación de Pagos: Un presupuesto que no puede faltar, ni al principio ni al final",
        publication: "XV Jornadas Institutos Derecho Comercial",
        year: "",
      },
      {
        title: "El 'Créditum' en el Concurso",
        publication: "XV Jornadas Institutos Derecho Comercial",
        year: "",
      },
      {
        title: "Cuando se compró lo que no existe... estamos en problemas",
        publication:
          "Temas Actuales de Derecho Concursal (Fundación para la Investigación y Desarrollo de las Ciencias Jurídicas)",
        year: "2007",
      },
      {
        title:
          "Verificación de Honorarios. Con condena en costas firme pero no regulados",
        publication: "LEX – Caja Forense de Entre Ríos",
        year: "",
      },
      {
        title: "Nuevas Tendencias en la Jurisprudencia Societaria y Concursal",
        publication:
          "Fundación para la Investigación y Desarrollo de las Ciencias Jurídicas",
        year: "2008",
      },
      {
        title: "El Fraude Concursal y otras Cuestiones de Derecho Falimentario",
        publication:
          "Fundación para la Investigación y Desarrollo de las Ciencias Jurídicas",
        year: "2010",
      },
      {
        title: "Abuso de Derecho Concursal",
        publication: "Revista de Derecho Concursal - Ad-Hoc",
        year: "2006",
      },
      {
        title:
          "Un Privilegiado en la Ley Concursal. 'Súper privilegiado' por la Ley PYME con Registro",
        publication: "Errepar",
        year: "",
      },
      {
        title: "Pedido de Quiebra Rechazado e Imposición de Costas",
        publication: "Errepar",
        year: "",
      },
      {
        title:
          "Verificación de Créditos y Sentencias Dictadas en Juicio Ejecutivo",
        publication: "Errepar",
        year: "",
      },
      {
        title:
          "Apertura Judicial de Concurso Ampliado. Excepción de Alta de Personería",
        publication: "Errepar",
        year: "",
      },
      {
        title: "Plazo de Gracia en los Concursos",
        publication: "Errepar",
        year: "",
      },
      { title: "Impugnación al Acuerdo", publication: "Errepar", year: "" },
      { title: "Concurso sin Sujeto", publication: "Errepar", year: "" },
      {
        title: "Administración Concursal (al después)",
        publication: "Errepar",
        year: "",
      },
      {
        title:
          "La Sentencia de la Corte Federal 'Sociedad Comercial del Plata S.A.' Algo más que un fallo más",
        publication: "Errepar",
        year: "",
      },
      {
        title: "Nueva Ley de Quiebras (24.522) – Comentada",
        publication: "Delta – Separata",
        year: "1995",
      },
      {
        title:
          "La Quiebra de Apelación Directa. Rechazo – Apelabilidad. Una cuestión que parecía resuelta",
        publication: "Delta",
        year: "1995",
      },
      { title: "Verificación de Créditos", publication: "Delta", year: "1997" },
      {
        title: "Salida del APE. Las cuestiones procesales",
        publication: "Delta",
        year: "1997",
      },
      {
        title: "Tasa de Intereses Aplicables",
        publication: "Delta",
        year: "1997",
      },
      {
        title: "Quebrar: un salto al vacío",
        publication: "Delta",
        year: "1998",
      },
      {
        title:
          "La quiebra de los socios y directores (Responsabilidad Personal)",
        publication: "Delta",
        year: "1998",
      },
      {
        title:
          "Interacción de las sentencias dictadas por fueros Comercial y Penal en materia tributaria",
        publication: "Revista Derecho Fiscal – Lexis Nexis",
        year: "2008",
      },
      {
        title: "La Reproducción Concursal Directa en el Extranjero",
        publication: "Revista RICCO",
        year: "2005",
      },
      {
        title: "La Reapertura Concursal y los Acreedores Concurrentes",
        publication: "Revista RICCO",
        year: "2007",
      },
      {
        title: "Concurso en caso de Argentinazo",
        publication: "DYC – Universidad Austral",
        year: "",
      },
      {
        title: "Crowdfunding y Sociedades por Acciones Simplificadas",
        publication: "Instituto de Derecho Comercial",
        year: "2018",
      },
      {
        title: "Responsabilidad Directores de Empresa frente a su Quiebra",
        publication: "II Congreso Iberoamericano de la Insolvencia",
        year: "2000",
      },
      {
        title: "Abuso de Derecho Concursal",
        publication: "Congreso Iberoamericano de Derecho Concursal – Ad-Hoc",
        year: "2004",
      },
      {
        title: "Verificación de Créditos",
        publication: "Congreso Iberoamericano de Derecho Concursal – Ad-Hoc",
        year: "2004",
      },
      {
        title: "Pronto Pago y Voto",
        publication: "Congreso Iberoamericano de Derecho Concursal – Ad-Hoc",
        year: "",
      },
      {
        title: "Fraude Concursal",
        publication: "Congreso Iberoamericano de Derecho Concursal – Ad-Hoc",
        year: "2006",
      },
    ],

    academicPositions: [
      {
        title: "Vicepresidente",
        institution: "Colegio de Abogados de Entre Ríos (Sección Paraná)",
        period: "1988–1990",
      },
      {
        title: "Co-redactor",
        institution:
          "Anteproyecto de reformas al Código Procesal Civil y Comercial de Entre Ríos",
        period: "2007",
      },
      {
        title: "Jurado",
        institution: "Consejo de la Magistratura de Entre Ríos",
        period: "2010",
      },
      {
        title: "Fundador y Director",
        institution:
          "Instituto de Derecho Concursal del Colegio de Abogados de Entre Ríos",
        period: "1995–presente",
      },
      {
        title: "Director",
        institution: "Editorial Delta",
        period: "2000–presente",
      },
    ],

    universityRoles: [
      {
        title: "Expositor / Docente en Jornadas y Cursos de Posgrado",
        year: "",
      },
      { title: "Profesor invitado en actividades de posgrado", year: "" },
    ],

    awards: [],

    scholarships: [],

    languages: [
      { language: "Español", certificates: [] },
      { language: "Inglés", certificates: [] },
    ],

    conferences: [
      {
        title:
          "XVI Jornadas de Institutos de Derecho Comercial de la República Argentina",
        year: "2007",
      },
      { title: "XV Jornadas de Institutos de Derecho Comercial", year: "" },
      { title: "II Congreso Iberoamericano de la Insolvencia", year: "2000" },
      {
        title: "Congreso Iberoamericano de Derecho Concursal – Ad-Hoc",
        year: "2004",
      },
      {
        title: "Congreso Iberoamericano de Derecho Concursal – Ad-Hoc",
        year: "2006",
      },
      { title: "DYC – Universidad Austral", year: "" },
      { title: "Instituto de Derecho Comercial (eventos)", year: "2018" },
    ],

    otherRoles: [
      { title: "Director (Editorial)", string: ["Editorial Delta"] },
      {
        title: "Fundador/Director",
        string: [
          "Instituto de Derecho Concursal del Colegio de Abogados de Entre Ríos",
        ],
      },
    ],

    otherAntecedentes: [
      "Amplia participación en jornadas, congresos y cursos sobre Derecho Concursal a nivel nacional e internacional.",
      "Colaborador en revistas jurídicas especializadas (Delta, Errepar, RICCO, Revista Derecho Fiscal, entre otras).",
      "Miembro activo en comisiones y órganos de revisión del Derecho Procesal y Concursal provincial.",
    ],
  },

  "dr-emilio-f-moro": {
    slug: "dr-emilio-f-moro",
    name: "Dr. Emilio Federico Moro",
    title: "Abogado, especialista en Derecho Comercial, Concursal y Procesal",
    title_en: "Lawyer, specialist in Commercial, Insolvency and Procedural Law",
    email: "emiliomoro@arnet.com.ar",
    image: "/img/lawyers/Dr-Emilio.jpg",

    personal: {
      birthDate: "14/05/1980",
      birthPlace: "Paraná (Entre Ríos)",
      civilStatus: "Casado",
      address: "Alameda de la Federación 361",
      phone: "011-48080487 / 0342-4528194 / 0343-4311172",
    },

    education: {
      primary: "Escuela Domingo Faustino Sarmiento (Paraná)",
      secondary: "Instituto Modelo Michelangelo (Paraná) – Promedio 8,53",
      university:
        "Facultad de Ciencias Jurídicas – UNL (Santa Fe) – Promedio 7,02",
      university_en:
        "Faculty of Legal Sciences – UNL (Santa Fe) – Average 7,02",
      postgraduate:
        "Magíster en Derecho de la Empresa (MDE) – Universidad Austral, Medalla de Oro (promedio 9,27)",
      doctorate:
        " En Derecho y Ciencias Jurídicas y Sociales – UNL. Tesis: Responsabilidad Civil de administradores societarios",
    },

    books: [
      {
        title: "¿Qué hacer con los principios generales del Derecho?",
        year: "2003",
      },
      { title: "La sociedad de capital unipersonal", year: "2006" },
      {
        title: "Impugnación de actos del directorio de sociedades anónimas",
        year: "2011",
      },
    ],

    articles: [
      {
        title: "La impugnabilidad de actos del directorio…",
        publication: "La Ley",
        year: "2009",
      },
      { title: "Las obligaciones de resultado 'fragmentarias'…", year: "2009" },
      {
        title: "Desde dos prismas: La impugnación de actos del directorio…",
        year: "2009",
      },
      { title: "Olvidando a Demogue…", year: "2007" },
      { title: "¿Interesa el rigor técnico-jurídico…?", year: "2010" },
      { title: "Apostillas sobre la naturaleza del plazo…", year: "2009" },
      { title: "Responsabilidad del Estado por omisión…", year: "2008" },
      { title: "Las obligaciones de resultado 'fragmentarias'…", year: "2008" },
      { title: "¿Debe responder el Estado…?", year: "2008" },
      { title: "Derecho de información…", year: "2007" },
      { title: "Estado contable aprobado…", year: "2006" },
      {
        title: "Por la buena senda: acerca del actual criterio…",
        year: "2007",
      },
      { title: "Directores afectados en su derecho…", year: "2007" },
      { title: "¿Corresponde exigir pago de tasa…?", year: "2007" },
      {
        title: "Breves reflexiones sobre la sociedad unipersonal…",
        year: "2005",
      },
      { title: "Beneficio de litigar sin gastos…", year: "2005" },
      { title: "Efectos del concurso preventivo…", year: "2005" },
      { title: "¿Es la sociedad unipersonal…?", year: "2007" },
      { title: "Consejo de la Magistratura…", year: "2008" },
    ],

    articles_en: [
      {
        title_en: "The Challengeability of Board Acts...",
        publication_en: "La Ley",
        year: "2009",
      },
      { title_en: "Fragmented Result Obligations...", year: "2009" },
      {
        title_en: "From Two Perspectives: Challenge of Board Acts...",
        year: "2009",
      },
      { title_en: "Forgetting Demogue...", year: "2007" },
      { title_en: "Does Legal Rigor Matter...?", year: "2010" },
      { title_en: "Postscripts on the Nature of Time...", year: "2009" },
      { title_en: "State Liability by Omission...", year: "2008" },
      { title_en: "Fragmented Result Obligations...", year: "2008" },
      { title_en: "Should the State Respond...?", year: "2008" },
      { title_en: "Right to Information...", year: "2007" },
      { title_en: "Approved Accounting Statement...", year: "2006" },
      {
        title_en: "On the Right Path: On the Current Criterion...",
        year: "2007",
      },
      { title_en: "Directors Affected in Their Rights...", year: "2007" },
      { title_en: "Should a Rate Be Required...?", year: "2007" },
      {
        title_en: "Brief Reflections on Unipersonal Partnerships...",
        year: "2005",
      },
      { title_en: "Benefit of Litigation Without Costs...", year: "2005" },
      { title_en: "Effects of Preventive Bankruptcy...", year: "2005" },
      { title_en: "Is the Unipersonal Partnership...?", year: "2007" },
      { title_en: "Judicial Council...", year: "2008" },
    ],

    academicPositions: [
      {
        title: "Ayudante de Cátedra – Obligaciones",
        institution: "UNL – Facultad de Ciencias Jurídicas",
        period: "2001–actualidad",
      },
      {
        title: "Ayudante de Cátedra – Instituciones de Derecho Privado",
        institution: "Universidad de Buenos Aires",
        period: "2004–actualidad",
      },
      {
        title: "Ayudante de Cátedra – Derecho Comercial I",
        institution: "UNL",
        period: "2007–actualidad",
      },
      {
        title: "Adscripto – Derecho Privado III",
        institution: "UNER",
        period: "2008–actualidad",
      },
    ],

    universityRoles: [
      {
        title:
          "Consejero directivo estudiantil – Facultad de Ciencias Jurídicas – UNL",
        year: "2003",
      },
      { title: "Vocal – Asociación Dante Alighieri", year: "2001" },
      {
        title:
          "Convencional constituyente estudiantil – Instituto Michelangelo",
        year: "1994",
      },
    ],

    awards: [
      {
        title: "Medalla de Oro Magíster MDE – Universidad Austral",
        year: "2005",
      },
      {
        title: "Premio a la Mejor Tesina en el Master en Derecho de la Empresa",
        year: "2005",
      },
      { title: "Primer Puesto Concurso de Ponencias – UNL", year: "2002" },
      { title: "Premio LexisNexis – FORES", year: "2004" },
    ],

    scholarships: [
      {
        title:
          "Beca Introducción a la Formación Docente Universitaria – UNL (promedio 7,75, asistencia 83%)",
        year: "2000",
      },
    ],

    languages: [
      {
        language: "Inglés",
        certificates: [
          "First Certificate (Cambridge)",
          "Diploma Advance (Paraná)",
        ],
      },
      {
        language: "Italiano",
        certificates: [
          "PLIDA (Universidad de Roma)",
          "Diploma Dante Alighieri",
        ],
      },
      {
        language: "Francés",
        certificates: ["DELF A6", "Diploma Alianza Francesa (Santa Fe)"],
      },
      {
        language: "Chino mandarín",
        certificates: ["1er año Lic. Estudios Orientales – USAL (2006)"],
      },
    ],

    conferences: [
      { title: "XXIII Congreso Nacional de Derecho Procesal", year: "2003" },
      {
        title:
          "VIII Congreso Nacional y VIII Latinoamericano de Derecho Privado",
        year: "2002",
      },
      {
        title: "XIV Jornadas de Institutos de Derecho Comercial",
        year: "2007",
      },
      { title: "XXI Jornadas Nacionales de Derecho Civil", year: "2005" },
      { title: "IV Congreso Entrerriano de Derecho del Trabajo", year: "2010" },
      // …y el resto si querés también los cargo completos
    ],

    otherRoles: [
      {
        title: "Artículos de temas varios en periódicos y revistas",
        string: [
          'Incendio en Bariloche. Falta de compromiso, "El Diario", Paraná, Entre Ríos. 25 de Febrero de 1996.',
          'Medios a la altura de las circunstancias, "La Razón", Buenos Aires, 25 de Febrero de 1997.',
          'No lleguemos a Waterloo, "El Diario", Paraná, Entre Ríos, 15 de Marzo de 1998.',
          'Recortes al espíritu de Sarmiento (I), "El Diario", Paraná, Entre Ríos, 11 de abril de 2001.',
          'Ideales entre tazas de café, "El Diario", Paraná, Entre Ríos, 10 de mayo 2003.',
          'La juventud y la política en la crisis, "El Diario", Paraná, Entre Ríos, 8 de Noviembre de 2003.',
          'El pecado de elogiar a un gobierno en funciones, "El Diario", Paraná, Entre Ríos, 11 de marzo de 2005.',
          'Cerrar los ojos nunca es bueno, "El Diario", Paraná, Entre Ríos, 19 de Agosto de 2004.',
          'El último liberal, "El Diario", Paraná, Entre Ríos, 5 de Julio de 2005.',
          'Patear la pelota afuera, "El Diario", Paraná, Entre Ríos, 3 de Febrero de 2006.',
          'Recortes al espíritu de Sarmiento (II), "El Diario", Paraná, Entre Ríos, 20 de Noviembre de 2007.',
          'Cuando el vilipendio histórico no es causalidad: el conflicto con el campo y el legado de Urquiza, "El Diario", Paraná, Entre Ríos, 30 de Marzo de 2008.',
          'Roma o el sueño imperial que renace, "Revista de la Asociación Dante Alighieri", nro. 1, Paraná, Entre Ríos, 2001.',
          'Olvidando a Marco Aurelio, "Revista de la Asociación Dante Alighieri", nro. 2, Paraná, Entre Ríos, 2002.',
          '¡Abajo el Centenario! ¡Viva el Bicentenario!, "El Diario", Paraná, Entre Ríos, 22 de mayo de 2010.',
        ],
      },
    ],

    otherAntecedentes: [
      "Abogado junior en BRONS & SALAS S.C.",
      "Merito en el juzgado de lera. instacia en lo Comercial nro. 21(Secr. 42) de la Ciudad Autonoma de Buenos Aires a cargo del DR. Germán Paez Castañeda.",
    ],

    otherAntecedentes_en: [
      "Junior Lawyer at BRONS & SALAS S.C.",
      "Merit at the first instance commercial court no. 21 (Sec. 42) of the Autonomous City of Buenos Aires under Dr. Germán Paez Castañeda.",
    ],
  },

  "dra-emilia-vaca": {
    slug: "maria-emilia-vaca",
    name: "María Emilia Vaca",
    title: "Abogada orientada a la resolución alternativa de conflictos",
    email: "vaca.memilia@gmail.com",
    image:
      "https://res.cloudinary.com/di2os0yqc/image/upload/g_custom/v1767109818/IMG_4475_rghpno.jpg",

    personal: {
      birthDate: "1997",
      birthPlace: "Paraná, Entre Ríos, Argentina",
      phone: "343-5141268",
    },

    education: {
      primary: "",
      secondary: "",
      university: "Universidad Nacional del Litoral",
    },

    books: [],

    articles: [],

    academicPositions: [],

    universityRoles: [],

    awards: [],

    scholarships: [],

    languages: [],

    conferences: [],

    otherRoles: [
      {
        title:
          "Formación Básica en Mediación Interdisciplinaria y Pre-judicial",
        string: ["UNIVERSIDAD NACIONAL DE ENTRE RÍOS, (Duración: 6 meses)"],
      },
      {
        title: "Diplomatura Superior en Género, Igualdad y Derecho",
        string: ["Universidad Nacional del Sur (Duración 10 meses)"],
      },
      {
        title: "Diplomado en Secretariado Jurídico y Procuración",
        string: ["Forum Capacitaciones (Duración 10 meses)"],
      },
    ],

    otherAntecedentes: [
      "Capacidad de adaptación y aprendizaje rápido",
      "Trato empático y comunicación efectiva",
      "Gestión y resolución de conflictos",
      "Organización, priorización de tareas y manejo de documentación",
      "Trabajo en equipo",
    ],
  },
};
