export type NovedadKind = "news" | "document";

export type NovedadSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type NovedadFile = {
  label: string;
  url: string;
};

export type NovedadBase = {
  kind: NovedadKind;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO (YYYY-MM-DD) recomendado
  cover?: string;
};

export type NovedadNews = NovedadBase & {
  kind: "news";
  body?: NovedadSection[];
  files?: NovedadFile[];
};

export type NovedadDocument = NovedadBase & {
  kind: "document";
  metadata: {
    jurisdiccion?: string;
    tipoNorma?: string;
    numeroNorma?: string;
    emisor?: string;
    fechaSancion?: string; // YYYY-MM-DD o DD-MM-YYYY
    publicacionBO?: string; // YYYY-MM-DD o DD-MM-YYYY
  };
  sections?: NovedadSection[];
  contentTextPath?: string;
  related?: Array<{ title: string; href: string }>;
  files?: NovedadFile[];
};

export type Novedad = NovedadNews | NovedadDocument;

export const NOVEDADES: Novedad[] = [
  {
    kind: "document",
    slug: "decreto-612-2026",
    title: "Decreto 612/2026 - Modificación del Decreto N° 199/1988 (Base de Cálculo de Aportes y Contribuciones Sindicales)",
    excerpt:
      "El Poder Ejecutivo precisa la base de cálculo del límite del artículo 9° de la Ley N° 14.250 (salario básico convencional más sumas remunerativas normales, habituales y mensuales) y reafirma que las contribuciones patronales pactadas en CCT en favor de las asociaciones sindicales deben destinarse a obras sociales, asistenciales, previsionales o culturales, con administración separada.",
    date: "2026-07-20",
    metadata: {
      jurisdiccion: "Nacional",
      tipoNorma: "Decreto",
      numeroNorma: "612/2026",
      emisor: "Poder Ejecutivo",
      fechaSancion: "17-07-2026",
      publicacionBO: "20-07-2026",
    },
    contentTextPath: "docs/novedades/Modificacion-del-Decreto-199-1988.txt",
    related: [
      {
        title: "Decreto 407/2026 (Reglamentación y Modificaciones del Régimen Laboral)",
        href: "/novedades/decreto-reglamentacion-laboral-407-2026",
      },
      {
        title: "Ley 27.802 (Modernización Laboral)",
        href: "/novedades/ley-modernizacion-laboral-27802",
      },
      {
        title: "Área: Derecho Laboral de Empresas",
        href: "/areas/Derecho-Laboral-de-Empresas",
      },
    ],
  },
  {
    kind: "document",
    slug: "resolucion-igj-5-2026",
    title: "Resolución General IGJ 5/2026 - Inscripción Registral con Plancha Digital",
    excerpt:
      "La IGJ establece el procedimiento de inscripción registral con generación y remisión de la plancha de inscripción en soporte digital firmada digitalmente, eximiendo la obligación de presentar copias en papel y habilitando la remisión electrónica al autorizado.",
    date: "2026-06-02",
    metadata: {
      jurisdiccion: "Nacional",
      tipoNorma: "Resolución General",
      numeroNorma: "5/2026",
      emisor: "Inspección General de Justicia",
      fechaSancion: "01-06-2026",
      publicacionBO: "02-06-2026",
    },
    contentTextPath: "docs/novedades/Procedimiento de Inscripción Registral con Generación y Remisión de la Plancha-de-Inscripción-en-Soporte-Digital",
    related: [
      {
        title: "Área: Derecho Societario",
        href: "/areas/derecho-societario",
      },
    ],
  },
  {
    kind: "document",
    slug: "decreto-fal-408-2026",
    title: "Decreto 408/2026 - Reglamentación del Fondo de Asistencia Laboral (Título II Ley 27.802)",
    excerpt:
      "Reglamentación del Título II de la Ley de Modernización Laboral N° 27.802 sobre los Fondos de Asistencia Laboral (FAL): vehículos de inversión, cuentas individuales, contribuciones, portabilidad, validación de indemnizaciones y régimen sancionatorio.",
    date: "2026-06-01",
    metadata: {
      jurisdiccion: "Nacional",
      tipoNorma: "Decreto",
      numeroNorma: "408/2026",
      emisor: "Poder Ejecutivo",
      fechaSancion: "29-05-2026",
      publicacionBO: "01-06-2026",
    },
    contentTextPath: "docs/novedades/Reglamentación-del-Título-II-Fondo-de-Asistencia-Laboral-de-la-Ley-de-Modernización-Laboral-N-27802.txt",
    related: [
      {
        title: "Ley 27.802 (Modernización Laboral)",
        href: "/novedades/ley-modernizacion-laboral-27802",
      },
      {
        title: "Área: Derecho Laboral de Empresas",
        href: "/areas/Derecho-Laboral-de-Empresas",
      },
    ],
  },
  {
    kind: "document",
    slug: "decreto-reglamentacion-laboral-407-2026",
    title: "Decreto 407/2026 - Reglamentación y Modificaciones del Régimen Laboral",
    excerpt:
      "Reglamentación de artículos de la LCT (registración, recibo de haberes, certificados médicos, renuncias, acuerdos extintivos, jubilaciones), reglamentación de Empresas de Servicios Eventuales, régimen de construcción, negociación colectiva y asociaciones sindicales.",
    date: "2026-06-01",
    metadata: {
      jurisdiccion: "Nacional",
      tipoNorma: "Decreto",
      numeroNorma: "407/2026",
      emisor: "Poder Ejecutivo",
      fechaSancion: "29-05-2026",
      publicacionBO: "01-06-2026",
    },
    contentTextPath: "docs/novedades/Reglamentacion-y-Modificaciones-en-el-Régimen-Laboral.txt",
    related: [
      {
        title: "Ley 27.802 (Modernización Laboral)",
        href: "/novedades/ley-modernizacion-laboral-27802",
      },
      {
        title: "Área: Derecho Laboral de Empresas",
        href: "/areas/Derecho-Laboral-de-Empresas",
      },
    ],
  },
  {
    kind: "document",
    slug: "ley-modernizacion-laboral-27802",
    title: "Ley 27.802 (Modernización Laboral)",
    excerpt:
      "Texto completo y actualizado, organizado por títulos y artículos con índice navegable.",
    date: "2026-03-06",
    metadata: {
      jurisdiccion: "Nacional",
      tipoNorma: "Ley",
      numeroNorma: "27.802",
      emisor: "Poder Legislativo",
      fechaSancion: "27-02-2026",
      publicacionBO: "06-03-2026",
    },
    contentTextPath: "docs/novedades/ley-27802.txt",
    related: [
      {
        title: "Área: Derecho Laboral de Empresas",
        href: "/areas/Derecho-Laboral-de-Empresas",
      },
    ],
  },
  {
    kind: "document",
    slug: "fallo-cascante-anac-csjn-2025",
    title:
      "CSJN: \"Cascante, Alejandro Eduardo c. EN - ANAC s/proceso de conocimiento\" - Improcedencia de reiterar la gestión procesal del art. 48 del CPCCN",
    excerpt:
      "La Corte Suprema desestimó la queja al advertir que el letrado patrocinante ya había hecho uso de la facultad del art. 48 del CPCCN al interponer el recurso extraordinario federal, por lo que no podía volver a invocarla como gestor al deducir la presentación directa: dicha facultad solo puede ejercerse una vez en el curso del proceso, y el escrito firmado solo por el gestor constituye un acto jurídico inexistente, no susceptible de convalidación posterior.",
    date: "2025-10-07",
    metadata: {
      jurisdiccion: "Nacional",
      tipoNorma: "Fallo",
      numeroNorma: "Cita Digital: ED-VI-CDVIII-779",
      emisor: "Corte Suprema de Justicia de la Nación",
      fechaSancion: "07-10-2025",
      publicacionBO: "El Derecho - Diario, Tomo 317",
    },
    sections: [
      {
        id: "sumario",
        title: "Sumario",
        paragraphs: [
          "Toda vez que de las constancias de la causa surge que el letrado patrocinante del actor había hecho uso de la facultad acordada en el art. 48 del CPCCN en oportunidad de interponer el recurso extraordinario federal, el mencionado profesional no podía recurrir nuevamente a esa facultad al deducir la presentación directa ante la Corte Suprema, pues, en atención a los claros términos del precepto, solo podrá ejercerse una vez en el curso del proceso.",
          "Corresponde considerar que el recurso de queja firmado solo por el letrado patrocinante en calidad de gestor constituye un acto jurídico inexistente y no susceptible de convalidación posterior, en tanto el abogado en oportunidad de interponer el recurso extraordinario federal había hecho uso de la facultad acordada en el art. 48 del CPCCN.",
          "El art. 48 del CPCCN establece que cuando deban realizarse actos procesales urgentes y existan hechos o circunstancias que impidan la actuación de la parte que ha de cumplirlos, podrá ser admitida la comparecencia en juicio de quien no tuviere representación conferida. Si dentro de los 40 días hábiles, contados desde la primera presentación del gestor, no fueren acompañados los instrumentos que acrediten la personalidad o la parte no ratificase la gestión, será nulo todo lo actuado por el gestor y este deberá satisfacer el importe de las costas, sin perjuicio de su responsabilidad por el daño que hubiere producido. (M.A.R.)",
          "Comentado por Mabel De los Santos: \"El gestor procesal y la inadmisibilidad de la queja\".",
        ],
      },
      {
        id: "texto-del-fallo",
        title: "Texto del Fallo",
        paragraphs: [
          "Buenos Aires, 7 de octubre de 2025.",
          "Autos y Vistos; Considerando:",
          "1º) Que el doctor J. R. L. interpuso el presente recurso de hecho invocando la calidad de gestor del actor, de conformidad con la facultad prevista en el art. 48 del Código Procesal Civil y Comercial de la Nación.",
          "2º) Que el mencionado artículo establece que \"Cuando deban realizarse actos procesales urgentes y existan hechos o circunstancias que impidan la actuación de la parte que ha de cumplirlos, podrá ser admitida la comparecencia en juicio de quien no tuviere representación conferida. Si dentro de los CUARENTA (40) días hábiles, contados desde la primera presentación del gestor, no fueren acompañados los instrumentos que acrediten la personalidad o la parte no ratificase la gestión, será nulo todo lo actuado por el gestor y éste deberá satisfacer el importe de las costas, sin perjuicio de su responsabilidad por el daño que hubiere producido. En su presentación, el gestor, además de indicar la parte en cuyo beneficio pretende actuar, deberá expresar las razones que justifiquen la seriedad del pedido. La nulidad, en su caso, se producirá por el solo vencimiento del plazo sin que se requiera intimación previa. La facultad acordada por este artículo sólo podrá ejercerse UNA (1) vez en el curso del proceso\".",
          "3º) Que de las constancias de la causa resulta que el letrado patrocinante del actor, en oportunidad de interponer el recurso extraordinario federal, hizo uso de la facultad acordada en el mencionado artículo 48. En consecuencia, y en atención a los claros términos del precepto transcripto en el considerando que antecede, el mencionado profesional no podía recurrir nuevamente a esa facultad al deducir la presentación directa ante esta Corte.",
          "4º) En consecuencia, y toda vez que el escrito de interposición del recurso de queja solo cuenta con la firma del letrado patrocinante, constituye un acto jurídico inexistente y no susceptible de convalidación posterior.",
          "Por ello, se desestima la queja. Notifíquese y archívese. – Horacio D. Rosatti. – Carlos F. Rosenkrantz. – Ricardo L. Lorenzetti.",
        ],
      },
    ],
    related: [
      {
        title: "Área: Asuntos Contenciosos",
        href: "/areas/Asuntos-Contenciosos",
      },
    ],
  },
];

export function getNovedadBySlug(slug: string): Novedad | undefined {
  return NOVEDADES.find((n) => n.slug === slug);
}
