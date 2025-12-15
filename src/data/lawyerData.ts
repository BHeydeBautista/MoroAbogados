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
    postgraduate: string;
    doctorate?: string;
  };

  books: Array<{ title: string; year?: string }>;
  books_en?: Array<{ title_en: string; year?: string }>;

  articles: Array<{ title: string; publication?: string; year?: string }>;
  articles_en?: Array<{ title_en?: string; publication_en?: string; year?: string }>;

  academicPositions: Array<{
    title: string;
    institution: string;
    period: string;
  }>;

  universityRoles: Array<{ title: string; year: string }>;

  awards: Array<{ title: string; year?: string }>;

  scholarships: Array<{ title: string; year?: string }>;

  languages: Array<{ language: string; certificates: string[] }>;

  conferences: Array<{ title: string; year?: string }>;

  otherRoles: Array<{ title: string; string?: string[] }>;
  otherRoles_en?: Array<{ title_en?: string; string_en?: string[] }>;

  otherAntecedentes: string[];
  otherAntecedentes_en?: string[];
}

export const lawyerDetails: Record<string, Lawyer> = {
  "dr-carlos-moro": {
    slug: "dr-carlos-moro",
    name: "Dr. Carlos E. Moro",
    email: "prueba@gmai.com",
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

    books: [
      {
        title: "Ley de Concursos. Comentada, Anotada y Concordada",
        year: "1994",
      },
      { title: "Proyectos de Reformas. Ley de Concursos", year: "1994" },
      { title: "Ley de Concursos", year: "1996" },
      { title: "Concurso Preventivo y la Quiebra", year: "2002" },
      { title: "Manual de Derecho Concursal", year: "2005" },
      {
        title: "Daños Judiciales y Acciones en las Sociedades y Concursos",
        year: "2005",
      },
      {
        title:
          "Resoluciones Alternativas de Conflictos en la Crisis de la Empresa y el Consumidor",
        year: "2005",
      },
      { title: "Ensayos de Derecho Concursal", year: "2009" },
      { title: "Ley de Concursos. Introducción y Estudio", year: "2011" },
      { title: "Concursos y Quiebras. Comentada", year: "2012" },
      { title: "Cuestiones Concursales", year: "2010" },
      { title: "La empresa en crisis", year: "1995" },
      { title: "El concurso de la sociedad conyugal", year: "2002" },
    ],

    books_en: [
      { title_en: "Bankruptcy Law. Commented, Annotated and Concordant", year: "1994" },
      { title_en: "Draft Reform Projects. Bankruptcy Law", year: "1994" },
      { title_en: "Bankruptcy Law", year: "1996" },
      { title_en: "Preventive Reorganization and Bankruptcy", year: "2002" },
      { title_en: "Handbook of Insolvency Law", year: "2005" },
      { title_en: "Judicial Damages and Actions in Companies and Bankruptcies", year: "2005" },
      { title_en: "Alternative Dispute Resolutions in Business and Consumer Crisis", year: "2005" },
      { title_en: "Essays on Insolvency Law", year: "2009" },
      { title_en: "Bankruptcy Law. Introduction and Study", year: "2011" },
      { title_en: "Bankruptcy and Insolvency. Commented", year: "2012" },
      { title_en: "Insolvency Issues", year: "2010" },
      { title_en: "The Company in Crisis", year: "1995" },
      { title_en: "Bankruptcy of the Marital Partnership", year: "2002" },
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

    articles_en: [
      { title_en: "Joint Liability under Art. 31 of the Labor Contract Law", publication_en: "Societary and Insolvency View", year: "2004" },
      { title_en: "The Labor Credit Guarantee Fund. The creation of what already exists", publication_en: "Proceedings of XVI Commercial Law Institutes", year: "2007" },
      { title_en: "The First: The Term of Insolvency Prescription Is Not Deactivated by Indirect Bankruptcy", publication_en: "Proceedings of XVI Commercial Law Institutes", year: "2007" },
      { title_en: "Fee Verification. Final costs award, but not regulated", publication_en: "Proceedings of XVI Commercial Law Institutes", year: "2007" },
      { title_en: "The Absent Person's Company", publication_en: "Proceedings of XVI Commercial Law Institutes", year: "2007" },
      { title_en: "State of Insolvency: A prerequisite that cannot be missing", publication_en: "XV Conference Proceedings", year: "" },
      { title_en: "The 'Créditum' in Bankruptcy", publication_en: "XV Conference Proceedings", year: "" },
      { title_en: "When one bought what does not exist... we are in trouble", publication_en: "Topics in Insolvency Law", year: "2007" },
      { title_en: "Fee Verification. Final costs award but not regulated", publication_en: "LEX – Caja Forense de Entre Ríos", year: "" },
      { title_en: "New Trends in Corporate and Insolvency Jurisprudence", publication_en: "Foundation for Research and Development of Legal Sciences", year: "2008" },
      { title_en: "Bankruptcy Fraud and other Issues of Bankruptcy Law", publication_en: "Foundation for Research and Development of Legal Sciences", year: "2010" },
      { title_en: "Abuse of Insolvency Law", publication_en: "Insolvency Law Review - Ad-Hoc", year: "2006" },
      { title_en: "A Privileged One in Insolvency Law: 'Super privileged' by the SME Law with Registration", publication_en: "Errepar", year: "" },
      { title_en: "Rejected Bankruptcy Petition and Imposition of Costs", publication_en: "Errepar", year: "" },
      { title_en: "Verification of Credits and Judgments in Executive Proceedings", publication_en: "Errepar", year: "" },
      { title_en: "Judicial Opening of Expanded Bankruptcy. Exception of High Registration", publication_en: "Errepar", year: "" },
      { title_en: "Grace Period in Insolvency Proceedings", publication_en: "Errepar", year: "" },
      { title_en: "Challenge to the Agreement", publication_en: "Errepar", year: "" },
      { title_en: "Bankruptcy without Subject", publication_en: "Errepar", year: "" },
      { title_en: "Insolvency Administration (the later)", publication_en: "Errepar", year: "" },
      { title_en: "The Federal Court Ruling 'Sociedad Comercial del Plata S.A.' More than just another ruling", publication_en: "Errepar", year: "" },
      { title_en: "New Bankruptcy Law (24.522) – Commented", publication_en: "Delta – Supplement", year: "1995" },
      { title_en: "Appealable Bankruptcy. Rejection – Appealable. A matter that seemed resolved", publication_en: "Delta", year: "1995" },
      { title_en: "Verification of Credits", publication_en: "Delta", year: "1997" },
      { title_en: "Exit from APE. Procedural issues", publication_en: "Delta", year: "1997" },
      { title_en: "Applicable Interest Rates", publication_en: "Delta", year: "1997" },
      { title_en: "To Go Bankrupt: A Leap into the Void", publication_en: "Delta", year: "1998" },
      { title_en: "Bankruptcy of Partners and Directors (Personal Liability)", publication_en: "Delta", year: "1998" },
      { title_en: "Interaction of Judgments from Commercial and Criminal Courts in Tax Matters", publication_en: "Tax Law Review – Lexis Nexis", year: "2008" },
      { title_en: "Direct Insolvency Recognition Abroad", publication_en: "RICCO Review", year: "2005" },
      { title_en: "Reopening of Insolvency and Concurrent Creditors", publication_en: "RICCO Review", year: "2007" },
      { title_en: "Insolvency in Case of Argentinazo", publication_en: "DYC – Austral University", year: "" },
      { title_en: "Crowdfunding and Simplified Stock Corporations", publication_en: "Institute of Commercial Law", year: "2018" },
      { title_en: "Liability of Company Directors before its Bankruptcy", publication_en: "II Ibero-American Insolvency Congress", year: "2000" },
      { title_en: "Abuse of Insolvency Law", publication_en: "Ibero-American Congress of Insolvency Law – Ad-Hoc", year: "2004" },
      { title_en: "Verification of Credits", publication_en: "Ibero-American Congress of Insolvency Law – Ad-Hoc", year: "2004" },
      { title_en: "Early Payment and Voting", publication_en: "Ibero-American Congress of Insolvency Law – Ad-Hoc", year: "" },
      { title_en: "Insolvency Fraud", publication_en: "Ibero-American Congress of Insolvency Law – Ad-Hoc", year: "2006" },
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

    awards: [
      // No aparecen premios explícitos en las primeras 4 capturas; dejé vacío para completar si querés
    ],

    scholarships: [
      // No aparecen becas en las imágenes; dejé vacío
    ],

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
      address:
        "Alameda de la Federación 361",
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
      { title_en: "The Challengeability of Board Acts...", publication_en: "La Ley", year: "2009" },
      { title_en: "Fragmented Result Obligations...", year: "2009" },
      { title_en: "From Two Perspectives: Challenge of Board Acts...", year: "2009" },
      { title_en: "Forgetting Demogue...", year: "2007" },
      { title_en: "Does Legal Rigor Matter...?", year: "2010" },
      { title_en: "Postscripts on the Nature of Time...", year: "2009" },
      { title_en: "State Liability by Omission...", year: "2008" },
      { title_en: "Fragmented Result Obligations...", year: "2008" },
      { title_en: "Should the State Respond...?", year: "2008" },
      { title_en: "Right to Information...", year: "2007" },
      { title_en: "Approved Accounting Statement...", year: "2006" },
      { title_en: "On the Right Path: On the Current Criterion...", year: "2007" },
      { title_en: "Directors Affected in Their Rights...", year: "2007" },
      { title_en: "Should a Rate Be Required...?", year: "2007" },
      { title_en: "Brief Reflections on Unipersonal Partnerships...", year: "2005" },
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
};
