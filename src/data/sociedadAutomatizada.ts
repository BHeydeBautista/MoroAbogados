/**
 * Guía paso a paso — Sociedad Automatizada
 *
 * Contenido de la guía interactiva. Dos pistas paralelas:
 *   - "juridico": qué documentos hay que firmar y presentar (contenido del estudio).
 *   - "tecnico":  cómo se construye y documenta el sistema que opera la sociedad.
 *
 * Todo el texto vive acá. Para corregir la guía no hace falta tocar componentes.
 *
 * ⚠ Contenido a futuro: asume la sanción del proyecto en su redacción actual.
 */

export type TrackId = "juridico" | "tecnico";

/** Variables que el lector carga una sola vez y se inyectan en todos los prompts. */
export type CampoDatos = "nombre" | "actividad" | "jurisdiccion" | "sistema";

export type ClausulaParte = {
  text: string;
  /** Resaltado en dorado, como en el modelo de estatuto. */
  strong?: boolean;
};

export type ClausulaArticulo = {
  numero: string;
  partes: ClausulaParte[];
};

/** Nivel de atención jurídica que merece un dato o una herramienta. */
export type Riesgo = "ok" | "atencion" | "alerta";

export type FilaCampo = {
  label: string;
  origen: string;
  riesgo: string;
  nivel: Riesgo;
};

export type FilaPantalla = {
  label: string;
  estado: string;
  cargado?: boolean;
};

export type Bloque =
  | { type: "prose"; text: string }
  | { type: "note"; tone: "info" | "warn" | "legal"; title: string; text: string }
  | {
      type: "checklist";
      title: string;
      intro?: string;
      items: string[];
      conclusion?: string;
    }
  | { type: "clause"; docTitle: string; articulos: ClausulaArticulo[] }
  | {
      type: "fields";
      title: string;
      intro?: string;
      columnas: [string, string, string];
      filas: FilaCampo[];
    }
  | {
      type: "prompt";
      title: string;
      intro?: string;
      /** Usa {{nombre}}, {{actividad}}, {{jurisdiccion}}, {{sistema}}. */
      template: string;
      /** Qué tiene que contener la respuesta para poder avanzar. */
      verificar: string[];
      /** Prompt de ajuste si falta algo de la lista anterior. */
      correccion: string;
    }
  | { type: "screen"; url: string; caption?: string; filas: FilaPantalla[]; cta: string }
  | { type: "flow"; title: string; nodos: { label: string; detalle: string }[] }
  | { type: "crosslink"; hacia: string; texto: string };

export type Paso = {
  /** Slug estable: se usa en la URL como ?paso=<id>. No cambiar una vez publicado. */
  id: string;
  track: TrackId;
  titulo: string;
  /** Etiqueta corta para el riel de progreso. */
  corto: string;
  bajada: string;
  bloques: Bloque[];
};

export type Track = {
  id: TrackId;
  nombre: string;
  descripcion: string;
  responsable: string;
};

export const TRACKS: Track[] = [
  {
    id: "juridico",
    nombre: "Pista jurídica",
    descripcion:
      "Los cinco pasos formales de constitución: del encuadre a la inscripción registral.",
    responsable: "Contenido del estudio",
  },
  {
    id: "tecnico",
    nombre: "Pista técnica",
    descripcion:
      "Cómo se arma y se documenta el sistema que opera la sociedad. Es el respaldo de las cláusulas.",
    responsable: "Documentación del sistema",
  },
];

/** Caso que atraviesa toda la guía. Un solo ejemplo, repetido en los once pasos. */
export const EJEMPLO = {
  nombre: "Nexus Automatizada S.A.",
  actividad: "Otorgamiento de microcréditos desde una billetera virtual",
  jurisdiccion: "Entre Ríos",
  sistema:
    "Un agente evalúa solicitudes de microcrédito de hasta $500.000 y decide aprobar, rechazar o derivar a revisión humana, sin que un analista intervenga en cada caso.",
} satisfies Record<CampoDatos, string>;

export const CAMPOS: {
  id: CampoDatos;
  label: string;
  ayuda: string;
  multilinea?: boolean;
}[] = [
  {
    id: "nombre",
    label: "Nombre de la sociedad",
    ayuda: "Tiene que incluir la palabra “Automatizada”. Lo vemos en el Paso 2.",
  },
  {
    id: "actividad",
    label: "A qué se dedica",
    ayuda: "En una línea, como se lo explicarías a alguien en un ascensor.",
  },
  {
    id: "jurisdiccion",
    label: "Provincia donde se inscribe",
    ayuda: "Define ante qué Registro Público se presenta el trámite.",
  },
  {
    id: "sistema",
    label: "Qué hace el sistema automatizado",
    ayuda:
      "La decisión concreta que toma solo, sin que una persona intervenga en cada caso.",
    multilinea: true,
  },
];

export const PASOS: Paso[] = [
  /* ─────────────────────────── PISTA JURÍDICA ─────────────────────────── */
  {
    id: "encuadre",
    track: "juridico",
    titulo: "¿Tu operación califica?",
    corto: "Encuadre",
    bajada:
      "Antes de armar cualquier documento, respondé estas tres preguntas. Si tu negocio cumple las tres, calificás para este régimen.",
    bloques: [
      {
        type: "prose",
        text: "El régimen no es para cualquier empresa que “use inteligencia artificial”. Es para las que operan sin que una persona intervenga en cada transacción. La diferencia importa: un estudio contable que usa IA para redactar informes no califica; una billetera que aprueba créditos sola, sí.",
      },
      {
        type: "checklist",
        title: "Cuestionario de autoevaluación",
        items: [
          "El negocio opera todos los días sin que una persona intervenga constantemente",
          "La actividad puede ejecutarse íntegramente mediante algoritmos o agentes de IA",
          "No hacen falta empleados en relación de dependencia para operar",
        ],
        conclusion: "Calificás para constituir una Sociedad Automatizada",
      },
      {
        type: "note",
        tone: "info",
        title: "Si respondiste que no a alguna",
        text: "No es un rechazo definitivo. Muchas operaciones califican después de rediseñar el proceso: lo que hoy hace una persona revisando caso por caso, mañana lo puede hacer el sistema con derivación a revisión humana sólo en los casos límite. Eso es exactamente lo que vemos en la pista técnica.",
      },
      {
        type: "prompt",
        title: "Prompt 1 — Encuadre de tu operación",
        intro:
          "Pegá esto en ChatGPT, Claude o Gemini. Ya viene completado con los datos que cargaste arriba.",
        template: `Actuá como analista de negocios. Te voy a describir una operación y necesito que evalúes si funciona de forma automatizada.

Sociedad: {{nombre}}
Actividad: {{actividad}}
Jurisdicción: {{jurisdiccion}}
Sistema automatizado: {{sistema}}

Respondé estas tres preguntas por separado, con una justificación de dos o tres líneas cada una:

1. ¿La operación puede funcionar todos los días sin que una persona intervenga en cada caso? Si no, indicá exactamente en qué momento hace falta una persona.
2. ¿Qué partes de la actividad NO se pueden automatizar hoy y por qué?
3. ¿Qué tareas seguirían necesitando un empleado en relación de dependencia?

Cerrá con un veredicto: "opera de forma automatizada" o "todavía depende de intervención humana constante", y en este segundo caso listá los tres cambios concretos que habría que hacer.`,
        verificar: [
          "Respondió las tres preguntas por separado, no en un párrafo único",
          "En la pregunta 2 nombró al menos una parte que NO se puede automatizar",
          "Cerró con un veredicto explícito, no con un “depende”",
        ],
        correccion: `Tu respuesta no cerró con un veredicto claro. Volvé a responder y terminá obligatoriamente con una de estas dos frases exactas, sin matices:

"VEREDICTO: opera de forma automatizada"
"VEREDICTO: todavía depende de intervención humana constante"

Si elegís la segunda, listá abajo los tres cambios concretos que habría que hacer.`,
      },
      {
        type: "crosslink",
        hacia: "decision",
        texto:
          "El veredicto que te devolvió la IA es materia prima del primer paso técnico: definir qué decide el agente.",
      },
    ],
  },

  {
    id: "denominacion",
    track: "juridico",
    titulo: "Denominación social",
    corto: "Denominación",
    bajada:
      "Hay una sola condición obligatoria: el nombre debe incluir la palabra “Automatizada”. Así, cualquier tercero sabe cómo opera la empresa con solo leer la razón social.",
    bloques: [
      {
        type: "prose",
        text: "El sufijo cumple la misma función que “S.A.” o “S.R.L.”: le avisa a quien contrata con la sociedad bajo qué régimen de responsabilidad está entrando. No es una etiqueta comercial ni algo que se pueda dejar para el logo — forma parte del requisito formal.",
      },
      {
        type: "screen",
        url: "rpc.gob.ar › consulta-denominacion",
        caption: "Pantalla ilustrativa del trámite de consulta de nombre.",
        filas: [{ label: "Nexus Automatizada S.A.", estado: "Disponible", cargado: true }],
        cta: "Reservar nombre",
      },
      {
        type: "note",
        tone: "warn",
        title: "El sufijo es obligatorio, no opcional",
        text: "Forma parte del requisito formal del Art. 14. Una denominación sin la palabra “Automatizada” se observa en el registro y frena todo el trámite.",
      },
      {
        type: "prompt",
        title: "Prompt 2 — Opciones de denominación",
        template: `Necesito opciones de denominación social para una sociedad argentina.

Actividad: {{actividad}}
Provincia de inscripción: {{jurisdiccion}}

Reglas obligatorias:
- Toda opción debe terminar en "Automatizada S.A."
- Sin palabras en inglés
- Sin términos reservados: banco, seguro, financiera, mutual, cooperativa, bolsa, universidad
- Sin nombres de personas físicas
- Máximo cuatro palabras antes del sufijo

Dame 8 opciones en una lista numerada. Para cada una, una línea explicando de dónde sale el nombre. Al final, marcá cuáles tienen riesgo de confundirse con marcas conocidas del rubro.`,
        verificar: [
          "Las 8 opciones terminan en “Automatizada S.A.”",
          "Ninguna usa palabras reservadas (banco, seguro, financiera…)",
          "Cerró con la advertencia sobre marcas parecidas",
        ],
        correccion: `Varias opciones no cumplen las reglas. Revisá tu propia lista y descartá toda opción que:
(a) no termine exactamente en "Automatizada S.A.",
(b) contenga banco, seguro, financiera, mutual, cooperativa, bolsa o universidad,
(c) incluya un nombre propio de persona.

Devolvé sólo las que sobreviven y completá hasta llegar a 8.`,
      },
      {
        type: "note",
        tone: "legal",
        title: "Esto no reserva nada",
        text: "La disponibilidad real se verifica únicamente en el Registro Público de tu jurisdicción. Una lista generada por IA es un punto de partida para la consulta, nunca una reserva.",
      },
    ],
  },

  {
    id: "estatuto",
    track: "juridico",
    titulo: "El estatuto técnico",
    corto: "Estatuto",
    bajada:
      "Acá se documenta cómo funciona el sistema: su carácter automatizado y quién lo supervisa. Este es un ejemplo de cláusula — el texto final se ajusta con tu abogado.",
    bloques: [
      {
        type: "clause",
        docTitle: "ESTATUTO SOCIAL — NEXUS AUTOMATIZADA S.A.",
        articulos: [
          {
            numero: "ARTÍCULO 4°",
            partes: [
              { text: "La sociedad reviste el carácter de " },
              { text: "Sociedad Automatizada", strong: true },
              {
                text: " en los términos del artículo 14 de la Ley General de Sociedades, desarrollando su objeto social mediante ",
              },
              { text: "sistemas algorítmicos autónomos", strong: true },
              {
                text: ", sin requerir trabajadores en relación de dependencia para su operación ordinaria.",
              },
            ],
          },
          {
            numero: "ARTÍCULO 5°",
            partes: [
              { text: "La sociedad contará en todo momento con una instancia de " },
              { text: "supervisión humana", strong: true },
              {
                text: " con facultad de intervención sobre los sistemas automatizados que ejecutan su operación.",
              },
            ],
          },
        ],
      },
      {
        type: "prose",
        text: "El Artículo 5 parece una declaración de principios, pero no lo es: es un requisito de producto. Si mañana te reclaman, vas a tener que mostrar quién puede frenar el sistema, desde dónde y en cuánto tiempo. Una cláusula sin ese mecanismo detrás es una cláusula vacía.",
      },
      {
        type: "crosslink",
        hacia: "supervision",
        texto:
          "En la pista técnica armamos el mecanismo concreto que hace verdadero al Artículo 5: umbrales, responsables y botón de freno.",
      },
      {
        type: "prompt",
        title: "Prompt 3 — Borrador de cláusula de objeto",
        intro:
          "Ojo con este paso: lo que devuelve la IA es un borrador para llevarle al abogado, no un estatuto.",
        template: `Actuá como redactor de documentos societarios argentinos. Necesito un borrador de cláusula de objeto social.

Sociedad: {{nombre}}
Actividad: {{actividad}}
Sistema automatizado: {{sistema}}

Redactá el artículo de objeto social con estas condiciones:
- Lenguaje de estatuto argentino, en tercera persona ("La sociedad tiene por objeto...")
- Debe describir la actividad de forma precisa pero no tan estrecha que impida crecer
- Debe mencionar expresamente que la operación se ejecuta mediante sistemas algorítmicos autónomos
- Un solo párrafo, sin incisos

Después del artículo, listá aparte:
1. Las tres decisiones de redacción que tomaste y por qué
2. Las dos preguntas que un abogado necesitaría hacerme antes de firmar esto`,
        verificar: [
          "Es un solo párrafo redactado en tercera persona",
          "Menciona expresamente los sistemas algorítmicos autónomos",
          "Incluye las dos preguntas para el abogado al final",
        ],
        correccion: `Te faltó la parte más importante. Volvé a tu borrador y agregá al final, obligatoriamente:

"PREGUNTAS PARA EL ABOGADO:" seguido de dos preguntas concretas sobre puntos que no podés resolver sin conocer el caso real.

No reformules la cláusula: sólo agregá esa sección.`,
      },
      {
        type: "note",
        tone: "legal",
        title: "Cláusulas ilustrativas",
        text: "Los textos de esta pantalla son ejemplos con fines didácticos. Requieren redacción y validación profesional antes de presentarse.",
      },
    ],
  },

  {
    id: "responsabilidad",
    track: "juridico",
    titulo: "Quién responde y por qué",
    corto: "Responsabilidad",
    bajada:
      "Esta cláusula define quién responde si algo sale mal: la propia sociedad, con su patrimonio — no una persona a título personal.",
    bloques: [
      {
        type: "clause",
        docTitle: "ESTATUTO SOCIAL — NEXUS AUTOMATIZADA S.A. (continuación)",
        articulos: [
          {
            numero: "ARTÍCULO 8°",
            partes: [
              { text: "La sociedad " },
              { text: "responde con su patrimonio social", strong: true },
              {
                text: " frente a terceros por los daños que ocasionen los sistemas algorítmicos o agentes de inteligencia artificial utilizados en su operación, en un régimen equiparado al de la sociedad anónima.",
              },
            ],
          },
        ],
      },
      {
        type: "prose",
        text: "Traducido: si el agente rechaza sistemáticamente solicitudes de un barrio entero, o aprueba un crédito que nunca debió aprobar, el reclamo va contra la sociedad. No contra el programador que escribió el código ni contra el proveedor del modelo.",
      },
      {
        type: "prose",
        text: "Eso tiene una consecuencia práctica que casi nadie anticipa: en un reclamo vas a tener que explicar por qué el sistema decidió lo que decidió, en ese caso puntual, en esa fecha. Si el sistema no dejó rastro, no hay defensa posible — no porque hayas hecho algo mal, sino porque no podés demostrar que no lo hiciste.",
      },
      {
        type: "crosslink",
        hacia: "evidencia",
        texto:
          "Por eso el paso técnico de salida y evidencia no es opcional: es lo que hace defendible al Artículo 8.",
      },
      {
        type: "prompt",
        title: "Prompt 4 — Mapa de daños posibles",
        template: `Actuá como analista de riesgo. Mi sociedad opera este sistema automatizado:

{{sistema}}
Actividad: {{actividad}}

Listá los 8 daños concretos que este sistema le podría causar a un tercero. Para cada uno, una fila con:

1. Qué sale mal (en una frase, en lenguaje común)
2. A quién perjudica
3. Qué tuvo que fallar para que pase (dato de entrada, regla, herramienta, o falta de supervisión)
4. Qué registro necesitaría yo para demostrar qué pasó

Ordená la lista del daño más probable al menos probable. No incluyas riesgos genéricos de cualquier empresa (incendio, robo, etc.): sólo los que nacen de que la decisión sea automática.`,
        verificar: [
          "Los 8 daños nacen de la automatización, no son riesgos genéricos de empresa",
          "Cada fila dice qué registro haría falta para demostrar lo ocurrido",
          "Está ordenada por probabilidad, no en orden arbitrario",
        ],
        correccion: `Varios de los riesgos que listaste le pasan a cualquier empresa, automatizada o no. Descartá todos los que no dependan de que la decisión la tome un sistema y reemplazalos por riesgos específicos de la automatización: decisiones sesgadas, errores replicados a escala, datos de entrada mal interpretados, herramientas ejecutadas sin control.`,
      },
    ],
  },

  {
    id: "inscripcion",
    track: "juridico",
    titulo: "La inscripción registral",
    corto: "Inscripción",
    bajada:
      "El paso final es presentar todo ante el Registro Público, junto con la documentación técnica de respaldo, mediante el trámite electrónico.",
    bloques: [
      {
        type: "screen",
        url: "rpc.gob.ar › inscripcion-electronica",
        caption: "Paso 3 de 4 — Carga de documentación.",
        filas: [
          { label: "Estatuto social.pdf", estado: "Cargado", cargado: true },
          { label: "Declaración de carácter automatizado.pdf", estado: "Cargado", cargado: true },
          { label: "Documentación técnica del sistema.pdf", estado: "Cargado", cargado: true },
        ],
        cta: "Enviar inscripción",
      },
      {
        type: "note",
        tone: "warn",
        title: "El tercer archivo es el que frena los trámites",
        text: "Los dos primeros los redacta el abogado. El tercero, no: es la descripción del sistema, y no existe un modelo estándar para copiar. Los seis pasos de la pista técnica están ordenados para que, al terminarlos, ese PDF quede armado.",
      },
      {
        type: "crosslink",
        hacia: "decision",
        texto: "Empezá la pista técnica para armar la documentación del sistema.",
      },
      {
        type: "prompt",
        title: "Prompt 5 — Índice de la documentación técnica",
        template: `Necesito armar el documento "Documentación técnica del sistema" para presentar ante el Registro Público de {{jurisdiccion}}, en la constitución de una Sociedad Automatizada.

Sociedad: {{nombre}}
Actividad: {{actividad}}
Sistema: {{sistema}}

Proponé el índice del documento. Para cada sección indicá:
- Título de la sección
- Qué tiene que demostrar ante un tercero que no conoce el sistema
- Qué evidencia concreta va adentro (diagrama, tabla, captura, registro)
- Extensión estimada en páginas

El documento debe permitirle a un funcionario sin formación técnica entender qué decide el sistema, con qué datos, y quién puede frenarlo. Máximo 10 secciones.`,
        verificar: [
          "Cada sección dice qué evidencia concreta lleva adentro",
          "Hay una sección dedicada a la supervisión humana",
          "Hay una sección sobre los datos de entrada",
        ],
        correccion: `Falta cubrir los dos puntos que el registro va a mirar primero. Agregá al índice, si no están:

- Una sección sobre los datos de entrada: cuáles son, de dónde salen y cuáles permiten inferir características personales.
- Una sección sobre supervisión humana: quién puede intervenir el sistema, desde dónde y en cuánto tiempo.

Devolvé el índice completo actualizado.`,
      },
    ],
  },

  /* ─────────────────────────── PISTA TÉCNICA ─────────────────────────── */
  {
    id: "decision",
    track: "tecnico",
    titulo: "Qué decide el agente",
    corto: "La decisión",
    bajada:
      "Un agente no “hace tareas”: toma una decisión, muchas veces, con el mismo criterio. Definir cuál es esa decisión es el primer paso, y el que más gente saltea.",
    bloques: [
      {
        type: "prose",
        text: "Antes de elegir herramientas, modelos o proveedores, tenés que poder completar esta frase sin titubear: “el sistema decide ____, entre estas opciones ____, usando estos datos ____”. Si no te sale, todavía no tenés un agente: tenés una idea.",
      },
      {
        type: "flow",
        title: "La decisión en Nexus Automatizada",
        nodos: [
          {
            label: "Entra una solicitud",
            detalle: "Una persona pide $180.000 desde la app de la billetera.",
          },
          {
            label: "El agente evalúa",
            detalle: "Cruza los datos declarados con fuentes externas y su propio historial.",
          },
          {
            label: "Elige una de tres",
            detalle: "Aprobar · Rechazar · Derivar a revisión humana.",
          },
          {
            label: "Deja rastro",
            detalle: "Guarda la decisión, el motivo y los datos que la produjeron.",
          },
        ],
      },
      {
        type: "note",
        tone: "info",
        title: "La tercera opción es la más importante",
        text: "“Derivar a revisión humana” es lo que convierte al Artículo 5 del estatuto en algo real. Un agente que sólo puede aprobar o rechazar no tiene por dónde escaparse cuando el caso es raro — y los casos raros existen siempre.",
      },
      {
        type: "checklist",
        title: "Tu ficha de operación tiene que responder",
        intro: "Si alguna queda sin respuesta, no sigas al paso siguiente.",
        items: [
          "Cuál es la decisión, en una sola frase",
          "Cuáles son las opciones posibles, listadas y cerradas",
          "Cuántas veces por día se toma esa decisión",
          "Cuánto cuesta equivocarse, en plata y en reputación",
          "Qué pasa si el sistema no puede decidir",
        ],
      },
      {
        type: "prompt",
        title: "Prompt 6 — Ficha de operación",
        template: `Actuá como diseñador de sistemas automatizados. Te describo un negocio y necesito que aisles la decisión que va a tomar el agente.

Sociedad: {{nombre}}
Actividad: {{actividad}}
Sistema: {{sistema}}

Devolveme una ficha con exactamente estos campos:

DECISIÓN: (una sola frase, empezando con un verbo)
OPCIONES POSIBLES: (lista cerrada; incluí siempre una opción de derivación a revisión humana)
FRECUENCIA ESTIMADA: (cuántas veces por día)
COSTO DEL ERROR: (qué pasa si decide mal, separando el caso "aprobó y no debía" del caso "rechazó y debía aprobar")
CASO SIN DECISIÓN: (qué hace el sistema cuando le faltan datos para decidir)

No agregues secciones que no pedí. Si algún campo no se puede completar con la información que te di, escribí "FALTA DEFINIR" y explicá qué necesitás saber.`,
        verificar: [
          "La decisión está en una sola frase y empieza con un verbo",
          "Entre las opciones aparece la derivación a revisión humana",
          "Separó los dos tipos de error (aprobar de más y rechazar de más)",
        ],
        correccion: `Te faltó separar los dos errores, que son muy distintos entre sí. Rehacé sólo el campo COSTO DEL ERROR con esta estructura:

FALSO POSITIVO (aprobó y no debía): consecuencia concreta, quién la sufre, cuánto cuesta.
FALSO NEGATIVO (rechazó y debía aprobar): consecuencia concreta, quién la sufre, cuánto cuesta.

Dejá el resto de la ficha como está.`,
      },
    ],
  },

  {
    id: "entradas",
    track: "tecnico",
    titulo: "Los datos de entrada",
    corto: "Entradas",
    bajada:
      "Todo lo que el agente sabe antes de decidir. Es el paso con más consecuencias jurídicas de toda la guía, y el que más fácil se subestima.",
    bloques: [
      {
        type: "prose",
        text: "Cada dato que entra al sistema es una fuente de decisión y, por lo tanto, una fuente de responsabilidad. Algunos son inofensivos. Otros parecen inofensivos y no lo son: no porque digan algo prohibido, sino porque permiten inferirlo.",
      },
      {
        type: "fields",
        title: "Datos de entrada de Nexus Automatizada",
        intro:
          "Así se ve la tabla que va en la documentación técnica. La tercera columna es la que va a leer el abogado.",
        columnas: ["Dato", "De dónde sale", "Qué permite inferir"],
        filas: [
          {
            label: "Monto solicitado",
            origen: "Formulario de la app",
            riesgo: "Nada. Es un dato directo, declarado por la persona.",
            nivel: "ok",
          },
          {
            label: "Ingresos declarados",
            origen: "Formulario de la app",
            riesgo: "Nada, pero no está verificado: el sistema no puede tratarlo como un hecho.",
            nivel: "ok",
          },
          {
            label: "Situación en el BCRA",
            origen: "Central de Deudores (consulta oficial)",
            riesgo: "Nada. Es información pública y objetiva.",
            nivel: "ok",
          },
          {
            label: "Antecedentes en bureau privado",
            origen: "Servicio externo de informes",
            riesgo:
              "Arrastra los errores del proveedor. Si el bureau se equivoca, el agente hereda el error y decide mal.",
            nivel: "atencion",
          },
          {
            label: "Tiempo de completado del formulario",
            origen: "Telemetría de la app",
            riesgo:
              "Puede penalizar a personas mayores o con alguna discapacidad, que tardan más por motivos ajenos a su solvencia.",
            nivel: "atencion",
          },
          {
            label: "Ubicación del domicilio",
            origen: "Formulario o geolocalización del dispositivo",
            riesgo:
              "Aproxima el nivel socioeconómico del barrio. Usado como variable de scoring, puede producir el rechazo sistemático de una zona entera.",
            nivel: "alerta",
          },
          {
            label: "Ortografía en los campos libres",
            origen: "Análisis del texto que escribió la persona",
            riesgo:
              "Aproxima el nivel educativo. No mide capacidad de pago: mide escolaridad, que es otra cosa.",
            nivel: "alerta",
          },
        ],
      },
      {
        type: "note",
        tone: "legal",
        title: "Por qué las dos últimas filas importan tanto",
        text: "Ubicación y ortografía no son datos sensibles por sí mismos, pero funcionan como sustitutos de características que sí lo son. Un sistema que las usa puede producir un patrón discriminatorio sin que nadie lo haya decidido: nadie escribió “rechazar a los de ese barrio”, y sin embargo eso es lo que termina pasando. Como la sociedad responde con su patrimonio (Artículo 8), esto no se resuelve borrando la fila de la tabla: se resuelve documentándola, midiendo el efecto y pudiendo explicarlo. Es una conversación para tener con el abogado antes de salir a producción, no después del primer reclamo.",
      },
      {
        type: "crosslink",
        hacia: "responsabilidad",
        texto: "Repasá el Artículo 8 para ver de dónde sale esta exigencia.",
      },
      {
        type: "prompt",
        title: "Prompt 7 — Auditoría de tus datos de entrada",
        intro: "Este es el prompt que más veces vas a correr. Guardá la respuesta: va casi tal cual a la documentación técnica.",
        template: `Actuá como auditor de datos. Mi sistema automatizado hace lo siguiente:

{{sistema}}
Actividad de la sociedad: {{actividad}}

Listá todos los datos de entrada que ese sistema necesita para decidir. Devolvelo como tabla con estas cuatro columnas:

DATO | DE DÓNDE SALE | ¿DECLARADO O INFERIDO? | ¿QUÉ PERMITE INFERIR SOBRE LA PERSONA?

Para la cuarta columna, respondé explícitamente por cada dato: ¿permite aproximar nivel socioeconómico, nivel educativo, edad, género, origen, estado de salud o creencias? Si la respuesta es sí, escribí "PROXY DE: ..." y explicá el mecanismo en una línea.

Después de la tabla, agregá dos secciones:
- DATOS QUE ELIMINARÍA: cuáles sacarías y qué perdería el sistema si los sacás.
- QUÉ PASA SI FALTA: para los tres datos más importantes, qué debería hacer el sistema si ese dato no está disponible.

No inventes datos que el sistema no necesita.`,
        verificar: [
          "Cada fila dice si el dato es declarado por la persona o inferido por el sistema",
          "Al menos un dato quedó marcado como “PROXY DE: …”",
          "Están las dos secciones del final, no sólo la tabla",
        ],
        correccion: `No marcaste ningún proxy, y es muy poco probable que no haya ninguno. Revisá tu tabla dato por dato y respondé explícitamente para cada uno:

"¿Este dato permite aproximar el nivel socioeconómico, educativo o de salud de la persona? SÍ/NO, y por qué."

Prestá especial atención a: ubicación, domicilio, código postal, dispositivo usado, horario de uso, forma de escribir, y cualquier dato de comportamiento. Devolvé la tabla corregida.`,
      },
    ],
  },

  {
    id: "proceso",
    track: "tecnico",
    titulo: "Qué hace con esos datos",
    corto: "Proceso",
    bajada:
      "El medio del sistema: las reglas que siempre se cumplen y el criterio que puede variar. Separar esas dos cosas es lo que vuelve auditable al agente.",
    bloques: [
      {
        type: "prose",
        text: "Un agente serio tiene dos capas, y conviene no mezclarlas. Las reglas duras son condiciones que se cumplen siempre, escritas en código: se pueden leer, testear y demostrar. El criterio es la parte que evalúa el modelo, y que puede dar resultados distintos ante casos parecidos.",
      },
      {
        type: "flow",
        title: "Las dos capas, en orden",
        nodos: [
          {
            label: "1. Reglas duras (código)",
            detalle:
              "Mayor de 18. Situación BCRA 1 o 2. Monto dentro del tope. Si falla alguna, rechaza y termina: el modelo ni se ejecuta.",
          },
          {
            label: "2. Criterio (modelo)",
            detalle:
              "Sobre los casos que pasaron el filtro, evalúa el resto de las señales y devuelve una recomendación con su nivel de confianza.",
          },
          {
            label: "3. Umbral de derivación",
            detalle:
              "Si la confianza es baja o el monto supera el límite, no decide: deriva a una persona.",
          },
        ],
      },
      {
        type: "note",
        tone: "warn",
        title: "Regla práctica",
        text: "Todo lo que puedas escribir como regla dura, escribilo como regla dura. Un modelo es flexible, y esa flexibilidad es exactamente lo que no querés cuando te toca explicar una decisión ante un reclamo.",
      },
      {
        type: "checklist",
        title: "Antes de pasar al siguiente paso",
        items: [
          "Tenés la lista de reglas duras escrita, separada del resto",
          "Sabés qué hace el sistema cuando el modelo no está disponible",
          "Definiste el umbral a partir del cual deriva en lugar de decidir",
          "Podés reproducir una decisión pasada con los mismos datos de entrada",
        ],
      },
      {
        type: "prompt",
        title: "Prompt 8 — Separar reglas de criterio",
        template: `Actuá como arquitecto de sistemas. Mi agente hace esto:

{{sistema}}

Separá su lógica en dos capas y devolvelas así:

REGLAS DURAS (se evalúan siempre, en código, antes que cualquier modelo):
Numeralas. Cada una tiene que poder responderse con sí o no, sin ambigüedad, y decir qué pasa cuando no se cumple.

CRITERIO EVALUATIVO (lo que queda para el modelo):
Qué señales evalúa y por qué no se pueden escribir como regla fija.

UMBRAL DE DERIVACIÓN:
En qué condiciones concretas el sistema NO debe decidir solo y tiene que derivar a una persona. Dame al menos tres condiciones.

MODO DEGRADADO:
Qué hace el sistema si el modelo no responde o el servicio externo está caído.

Al final, marcá qué reglas del criterio evaluativo se podrían convertir en reglas duras con un poco más de trabajo.`,
        verificar: [
          "Las reglas duras se responden con sí o no, sin zonas grises",
          "Hay al menos tres condiciones de derivación",
          "Contestó qué pasa si el modelo no está disponible",
        ],
        correccion: `Algunas de tus "reglas duras" no son duras: usan palabras como "adecuado", "razonable", "suficiente" o "bajo riesgo", que no se pueden evaluar sin criterio. Reescribilas con números y condiciones exactas, o movelas al criterio evaluativo. Devolvé las dos listas corregidas.`,
      },
    ],
  },

  {
    id: "herramientas",
    track: "tecnico",
    titulo: "Qué puede tocar el agente",
    corto: "Herramientas",
    bajada:
      "Un agente sin herramientas sólo opina. Con herramientas, actúa — y ahí es donde nace la responsabilidad patrimonial.",
    bloques: [
      {
        type: "prose",
        text: "La diferencia entre un chatbot y un agente es esta lista. Un chatbot te dice “convendría aprobar el crédito”. Un agente acredita la plata. Todo lo que el agente pueda ejecutar sin preguntar es, literalmente, algo por lo que la sociedad responde.",
      },
      {
        type: "fields",
        title: "Herramientas de Nexus Automatizada",
        intro: "En la documentación técnica, esta tabla va junto a la de datos de entrada.",
        columnas: ["Herramienta", "Qué hace", "¿Se puede deshacer?"],
        filas: [
          {
            label: "Consultar BCRA",
            origen: "Lee la situación crediticia de la persona",
            riesgo: "Sólo lectura. No modifica nada.",
            nivel: "ok",
          },
          {
            label: "Consultar bureau privado",
            origen: "Lee antecedentes en un servicio externo",
            riesgo: "Sólo lectura, pero tiene costo por consulta y deja registro en el bureau.",
            nivel: "ok",
          },
          {
            label: "Registrar la decisión",
            origen: "Escribe el resultado y su justificación en la base",
            riesgo: "Escritura, pero acumulativa: no pisa nada. Es la que te salva en un reclamo.",
            nivel: "ok",
          },
          {
            label: "Notificar a la persona",
            origen: "Envía el resultado por push o mail",
            riesgo:
              "No se puede deshacer: un mensaje enviado por error ya fue leído. Conviene ejecutarla último.",
            nivel: "atencion",
          },
          {
            label: "Acreditar el dinero",
            origen: "Transfiere el monto a la cuenta de la persona",
            riesgo:
              "Irreversible y con efecto patrimonial directo. Es la herramienta que justifica todo el resto de la documentación.",
            nivel: "alerta",
          },
        ],
      },
      {
        type: "note",
        tone: "legal",
        title: "El criterio para la última columna",
        text: "Ordená siempre las herramientas de menos a más reversible, y ejecutalas en ese orden. Consultar, después registrar, después notificar, y recién al final mover plata. Si algo falla, falla antes de la parte que no se puede deshacer.",
      },
      {
        type: "prompt",
        title: "Prompt 9 — Inventario de herramientas",
        template: `Actuá como arquitecto de sistemas. Mi agente hace esto:

{{sistema}}

Listá todas las herramientas que necesita para ejecutar su trabajo. Devolvelo como tabla:

HERRAMIENTA | QUÉ HACE | LECTURA O ESCRITURA | ¿REVERSIBLE? | SI FALLA, ¿QUÉ PASA?

Después de la tabla:

1. Ordená las herramientas de escritura de más reversible a menos reversible, y proponé el orden en que deberían ejecutarse.
2. Para cada herramienta irreversible, proponé una condición previa que el sistema deba verificar antes de ejecutarla.
3. Indicá cuáles de estas herramientas NO debería poder ejecutar el agente por su cuenta, y por qué.

Distinguí bien entre "leer un dato" y "modificar el mundo".`,
        verificar: [
          "Cada herramienta está clasificada como lectura o escritura",
          "Las irreversibles tienen una condición previa propuesta",
          "Hay al menos una herramienta que la IA recomendó no dejar en manos del agente",
        ],
        correccion: `Marcaste todas las herramientas como aptas para que el agente las ejecute solo. Revisá el criterio: en un sistema con efecto patrimonial casi siempre hay al menos una acción que conviene dejar detrás de una confirmación humana o de un tope automático.

Volvé a responder el punto 3 y nombrá al menos una herramienta que restringirías, con el motivo.`,
      },
    ],
  },

  {
    id: "evidencia",
    track: "tecnico",
    titulo: "La salida y la evidencia",
    corto: "Evidencia",
    bajada:
      "El agente no termina cuando decide: termina cuando deja registrado por qué decidió. Sin eso, el Artículo 8 no se puede defender.",
    bloques: [
      {
        type: "prose",
        text: "Imaginá el peor día: seis meses después de salir a producción, llega un reclamo por una solicitud rechazada. Te van a pedir que expliques esa decisión puntual, de esa fecha. Si tu sistema guardó únicamente “rechazado”, no tenés nada. Si guardó qué datos usó y qué peso tuvo cada uno, tenés una defensa.",
      },
      {
        type: "checklist",
        title: "El registro mínimo de cada decisión",
        intro: "Ninguno de estos campos es opcional. Los cinco se guardan siempre, incluso cuando el sistema derivó en lugar de decidir.",
        items: [
          "Qué decidió y en qué fecha y hora exacta",
          "Qué datos de entrada tenía a la vista en ese momento",
          "Qué versión del sistema y del modelo estaba corriendo",
          "Qué motivo se le comunicó a la persona",
          "Si se derivó a revisión humana: quién revisó y qué resolvió",
        ],
      },
      {
        type: "note",
        tone: "warn",
        title: "El motivo que se guarda y el motivo que se comunica",
        text: "No son el mismo texto, y conviene tener los dos. El interno es técnico y detallado, para poder reconstruir la decisión. El externo es el que lee la persona, y tiene que ser comprensible y no revelar cómo evadir el sistema. Guardá ambos, vinculados al mismo caso.",
      },
      {
        type: "crosslink",
        hacia: "responsabilidad",
        texto: "Este paso es la contracara técnica del Artículo 8 del estatuto.",
      },
      {
        type: "prompt",
        title: "Prompt 10 — Estructura del registro",
        template: `Actuá como responsable de auditoría. Mi sistema automatizado hace esto:

{{sistema}}

Diseñá la estructura del registro que debe quedar guardado por cada decisión, pensando en que dentro de dos años alguien va a reclamar por una decisión puntual y voy a tener que explicarla.

Devolveme:

1. La lista de campos a guardar, con el tipo de dato de cada uno y por qué hace falta.
2. Cuáles de esos campos contienen datos personales y por lo tanto tienen un plazo de conservación a definir con el abogado.
3. Un ejemplo completo del registro de una decisión rechazada, con datos ficticios realistas.
4. La diferencia entre el motivo interno (para auditoría) y el motivo comunicado a la persona, con un ejemplo de cada uno para el mismo caso.

El registro tiene que permitir reconstruir la decisión sin acceso al sistema original.`,
        verificar: [
          "Guarda la versión del sistema o del modelo, no sólo el resultado",
          "Distingue el motivo interno del motivo comunicado, con ejemplos de ambos",
          "Marcó qué campos contienen datos personales",
        ],
        correccion: `Falta el campo más importante para una auditoría a futuro: la versión. Sin saber qué versión del sistema tomó la decisión, no se puede reconstruir nada, porque las reglas cambian con el tiempo.

Agregá a la estructura los campos de versión del sistema, versión del modelo y fecha de la última modificación de reglas. Devolvé la estructura completa.`,
      },
    ],
  },

  {
    id: "supervision",
    track: "tecnico",
    titulo: "La supervisión humana",
    corto: "Supervisión",
    bajada:
      "El Artículo 5 del estatuto, convertido en algo que se puede mostrar: quién interviene, desde dónde y en cuánto tiempo.",
    bloques: [
      {
        type: "prose",
        text: "“Supervisión humana con facultad de intervención” suena a declaración. Para el registro, y sobre todo para un reclamo, tiene que ser algo concreto: una persona con nombre, un lugar desde donde apretar el botón, y un tiempo máximo de respuesta.",
      },
      {
        type: "fields",
        title: "Los tres niveles de intervención",
        intro: "Van de lo cotidiano a lo excepcional. Los tres se documentan.",
        columnas: ["Nivel", "Cuándo se activa", "Quién y en cuánto tiempo"],
        filas: [
          {
            label: "Revisión caso por caso",
            origen: "El agente derivó una solicitud puntual por baja confianza o monto alto",
            riesgo: "Analista de riesgo. Dentro de las 24 horas hábiles.",
            nivel: "ok",
          },
          {
            label: "Ajuste de parámetros",
            origen: "La tasa de rechazo se desvía de lo esperado, o aparece un patrón raro",
            riesgo: "Responsable del sistema, con registro del cambio. Dentro de las 72 horas.",
            nivel: "atencion",
          },
          {
            label: "Freno total",
            origen: "Se detecta un error sistemático o un daño en curso",
            riesgo:
              "Cualquiera de los dos anteriores, sin necesidad de autorización previa. Inmediato.",
            nivel: "alerta",
          },
        ],
      },
      {
        type: "note",
        tone: "legal",
        title: "El freno total no se pide por mail",
        text: "Si para frenar el sistema hay que escribirle a alguien y esperar respuesta, no hay facultad de intervención: hay un trámite. Tiene que existir un mecanismo que cualquiera de los responsables pueda activar solo, y que deje registro de quién lo activó y cuándo.",
      },
      {
        type: "checklist",
        title: "Para cerrar la documentación técnica",
        intro: "Con estos puntos resueltos, el PDF del Paso 5 jurídico queda armado.",
        items: [
          "Hay una persona identificada por nivel de intervención, con nombre y rol",
          "El freno total se puede activar sin pedir autorización a nadie",
          "Cada intervención queda registrada igual que una decisión del agente",
          "Está definido qué pasa con las solicitudes en curso cuando el sistema se frena",
          "Alguien revisa periódicamente si aparecieron patrones de rechazo por zona o perfil",
        ],
      },
      {
        type: "crosslink",
        hacia: "inscripcion",
        texto: "Volvé al trámite de inscripción para presentar todo junto.",
      },
      {
        type: "prompt",
        title: "Prompt 11 — Protocolo de supervisión",
        template: `Actuá como responsable de riesgo operativo. Mi sistema automatizado hace esto:

{{sistema}}
Sociedad: {{nombre}}

Escribí el protocolo de supervisión humana, pensado para adjuntar a la documentación de constitución de una Sociedad Automatizada. Tiene que cubrir:

1. Los niveles de intervención, de lo cotidiano a lo excepcional. Para cada uno: qué lo dispara, quién interviene, en cuánto tiempo, y qué queda registrado.
2. El mecanismo de freno total: quién puede activarlo, desde dónde, y por qué no debe requerir autorización previa.
3. Qué pasa con las operaciones en curso cuando el sistema se frena.
4. La revisión periódica: cada cuánto se revisa si el sistema está produciendo resultados sesgados, quién la hace y qué mira concretamente.

Escribilo en lenguaje claro, para que lo entienda alguien sin formación técnica. Evitá el condicional: usá "el responsable activa", no "el responsable podría activar".`,
        verificar: [
          "El freno total no requiere autorización previa de nadie",
          "Cada nivel tiene un tiempo máximo de respuesta, no un “a la brevedad”",
          "El punto 4 dice qué se mira concretamente en la revisión periódica",
        ],
        correccion: `El protocolo está escrito en condicional y con plazos vagos ("a la brevedad", "lo antes posible"). Reescribilo con:
- Verbos en presente: "el responsable activa", no "podría activar".
- Plazos en horas o días concretos para cada nivel.
- Un nombre de rol por nivel, no "el equipo".

Devolvé el protocolo completo corregido.`,
      },
    ],
  },
];

export const PASOS_POR_TRACK = (track: TrackId) =>
  PASOS.filter((p) => p.track === track);

export const getPaso = (id: string) => PASOS.find((p) => p.id === id);

/** Reemplaza {{campo}} por lo que cargó el lector, con fallback al ejemplo. */
export function completarPlantilla(
  template: string,
  datos: Partial<Record<CampoDatos, string>>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, campo: string) => {
    const key = campo as CampoDatos;
    const valor = datos[key]?.trim();
    return valor || EJEMPLO[key] || match;
  });
}

export type SegmentoPrompt = {
  text: string;
  /** Presente si el fragmento salió de un {{campo}}, para poder resaltarlo. */
  campo?: CampoDatos;
  /** true si el valor lo cargó el lector; false si cayó al ejemplo. */
  propio?: boolean;
};

/**
 * Igual que completarPlantilla, pero devuelve el texto partido en fragmentos
 * para poder resaltar en pantalla los valores que se inyectaron. Sirve para
 * que el lector vea que sus datos entraron de verdad en el prompt.
 */
export function segmentarPlantilla(
  template: string,
  datos: Partial<Record<CampoDatos, string>>
): SegmentoPrompt[] {
  const salida: SegmentoPrompt[] = [];
  const re = /\{\{(\w+)\}\}/g;
  let ultimo = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(template)) !== null) {
    if (m.index > ultimo) salida.push({ text: template.slice(ultimo, m.index) });

    const campo = m[1] as CampoDatos;
    const propio = datos[campo]?.trim();
    const valor = propio || EJEMPLO[campo];

    if (valor) salida.push({ text: valor, campo, propio: Boolean(propio) });
    else salida.push({ text: m[0] });

    ultimo = m.index + m[0].length;
  }

  if (ultimo < template.length) salida.push({ text: template.slice(ultimo) });
  return salida;
}
