/**
 * Guía paso a paso — Sociedad Automatizada
 *
 * Todo el texto de la guía vive acá. Para corregirla no hace falta tocar
 * componentes.
 *
 * La guía está ordenada como un aprendizaje, no como un formulario. Arranca
 * explicando qué es el régimen, sigue evaluando si le sirve al lector, después
 * lo ayuda a mirar los procesos que YA tiene y elegir cuál automatizar, y
 * recién entonces entra a diseñar el agente. Ese orden importa: la versión
 * anterior daba por sabido que el lector ya tenía un sistema automatizado, que
 * es justo lo que viene a averiguar.
 *
 * ⚠ Contenido a futuro: asume la sanción del proyecto en su redacción actual.
 */

export type TrackId = "juridico" | "entender" | "elegir" | "disenar" | "responder";

/** Variables que el lector carga y se inyectan en los prompts. */
export type CampoDatos = "nombre" | "actividad" | "jurisdiccion" | "sistema";

export type ClausulaParte = { text: string; strong?: boolean };
export type ClausulaArticulo = { numero: string; partes: ClausulaParte[] };

/** Nivel de atención que merece un dato, herramienta o criterio. */
export type Riesgo = "ok" | "atencion" | "alerta";

export type FilaCampo = {
  label: string;
  origen: string;
  riesgo: string;
  nivel: Riesgo;
};

export type FilaPantalla = { label: string; estado: string; cargado?: boolean };

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
      /** Usa {{nombre}}, {{actividad}}, {{jurisdiccion}}, {{sistema}}. */
      template: string;
      intro?: string;
      verificar: string[];
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
  /**
   * Si es false la parte no se muestra: no aparece en el riel, ni en el
   * avance, y los cruces que apunten a sus pasos se omiten. El contenido
   * queda intacto — esto es un interruptor, no un borrado.
   */
  habilitada: boolean;
};

export const TRACKS: Track[] = [
  {
    id: "entender",
    nombre: "Entender",
    descripcion: "Qué es este régimen y si tu negocio da para esto.",
    habilitada: true,
  },
  {
    id: "elegir",
    nombre: "Elegir qué automatizar",
    descripcion: "Mirar los procesos que ya tenés y elegir por cuál empezar.",
    habilitada: true,
  },
  {
    id: "disenar",
    nombre: "Diseñar el agente",
    descripcion: "Qué decide, con qué datos, con qué reglas y qué puede ejecutar.",
    habilitada: true,
  },
  {
    id: "responder",
    nombre: "Responder por él",
    descripcion: "Qué queda registrado y quién puede intervenirlo.",
    habilitada: true,
  },
  {
    id: "juridico",
    nombre: "El trámite",
    descripcion: "Los cinco pasos formales de constitución.",
    // Apagada hasta que el abogado revise las cláusulas y los descargos.
    habilitada: false,
  },
];

export const TRACKS_VISIBLES = TRACKS.filter((t) => t.habilitada);

export const trackHabilitado = (id: TrackId) =>
  TRACKS.find((t) => t.id === id)?.habilitada ?? false;

/**
 * Caso que atraviesa toda la guía: una holding que arma sociedades
 * subsidiarias de las que ella misma es socia.
 *
 * Dos cosas lo hacen buen ejemplo. Primero, es una empresa que YA existe y ya
 * hace esto a mano, así que la guía puede empezar mirando un proceso real en
 * lugar de partir de cero. Segundo, la sociedad trabaja para sí misma: no hay
 * clientes externos, con lo cual el agente no redacta documentos para terceros
 * y queda fuera del terreno del ejercicio profesional.
 */
export const EJEMPLO = {
  nombre: "Grupo Paraná S.A.",
  actividad: "Holding familiar con tres unidades de negocio: agro, logística y alquileres",
  jurisdiccion: "Entre Ríos",
  sistema:
    "Armar el expediente para constituir una sociedad subsidiaria de la que Grupo Paraná sea socia, y determinar qué figura societaria corresponde.",
} satisfies Record<CampoDatos, string>;

export const CAMPOS: {
  id: CampoDatos;
  label: string;
  ayuda: string;
  multilinea?: boolean;
  /** El lector todavía no puede saberlo al empezar: lo define durante la guía. */
  seDefineEnPaso?: string;
}[] = [
  {
    id: "nombre",
    label: "Nombre de tu empresa",
    ayuda: "La sociedad que ya tenés y que va a operar el sistema automatizado.",
  },
  {
    id: "actividad",
    label: "A qué se dedica tu empresa hoy",
    ayuda: "En una línea, como se lo explicarías a alguien en un ascensor.",
  },
  {
    id: "jurisdiccion",
    label: "Provincia",
    ayuda: "Define ante qué Registro Público se presenta el trámite.",
  },
  {
    id: "sistema",
    label: "El proceso que vas a automatizar",
    ayuda:
      "Si todavía no sabés cuál, dejalo vacío. Es lo que vas a elegir en el Paso 4, y podés volver a completarlo después.",
    multilinea: true,
    seDefineEnPaso: "elegir-proceso",
  },
];

export const PASOS: Paso[] = [
  /* ═══════════════════ PARTE 1 — ENTENDER ═══════════════════ */
  {
    id: "que-es",
    track: "entender",
    titulo: "Qué es una Sociedad Automatizada",
    corto: "Qué es",
    bajada:
      "Un tipo societario nuevo, hoy en debate en el Congreso, pensado para empresas cuya operación diaria la ejecuta un sistema y no un equipo de personas.",
    bloques: [
      {
        type: "prose",
        text: "Hasta ahora, cuando alguien armaba una empresa elegía entre una S.R.L., una S.A. y algunas variantes más. Todas asumen lo mismo: que adentro hay personas ejecutando el trabajo. El proyecto de Sociedad Automatizada parte de otro supuesto — que la operación ordinaria la ejecuta un sistema, y que las personas están para supervisarlo, no para atender cada caso.",
      },
      {
        type: "fields",
        title: "Qué cambia respecto de una sociedad común",
        intro: "Las diferencias que importan en la práctica, no la letra chica.",
        columnas: ["Aspecto", "S.A. o S.R.L. común", "Sociedad Automatizada"],
        filas: [
          {
            label: "Quién ejecuta la operación",
            origen: "Empleados y administradores, caso por caso",
            riesgo: "Sistemas algorítmicos autónomos, sin intervención en cada caso",
            nivel: "ok",
          },
          {
            label: "Empleados en relación de dependencia",
            origen: "Necesarios para operar",
            riesgo: "No se requieren para la operación ordinaria",
            nivel: "ok",
          },
          {
            label: "La denominación",
            origen: "Nombre libre más el tipo social",
            riesgo: "Debe incluir la palabra “Automatizada”, para que un tercero lo sepa al leerla",
            nivel: "atencion",
          },
          {
            label: "Quién responde por los daños",
            origen: "Régimen general de responsabilidad",
            riesgo:
              "La sociedad responde con su patrimonio por lo que hagan sus sistemas, en régimen equiparado al de la S.A.",
            nivel: "atencion",
          },
          {
            label: "Qué se presenta al inscribir",
            origen: "Estatuto y documentación societaria",
            riesgo:
              "Además, una declaración de carácter automatizado y la documentación técnica del sistema",
            nivel: "alerta",
          },
        ],
      },
      {
        type: "note",
        tone: "info",
        title: "No es “una empresa que usa inteligencia artificial”",
        text: "Esta es la confusión más común y conviene sacarla de encima ya. Un estudio contable que usa IA para redactar informes no califica: sigue habiendo un contador que revisa y firma cada uno. Lo que define al régimen no es la herramienta que usás, es si la operación puede correr sin que una persona intervenga en cada transacción.",
      },
      {
        type: "prose",
        text: "La contracara es que el régimen te pide algo que ninguna sociedad común te pide: explicar cómo funciona tu sistema. No basta con decir “opera automáticamente”; hay que documentar qué decide, con qué información, qué puede ejecutar por su cuenta y quién puede frenarlo. Esa documentación es la mitad del trabajo, y es de lo que trata la mayor parte de esta guía.",
      },
      {
        type: "note",
        tone: "legal",
        title: "Esto todavía no es ley",
        text: "El proyecto está en debate legislativo. Todo lo que sigue asume su redacción actual y puede cambiar antes de la sanción. Esta guía se ocupa de la parte técnica: qué hace el sistema, con qué datos decide y quién lo controla.",
      },
    ],
  },

  {
    id: "te-conviene",
    track: "entender",
    titulo: "¿Le sirve a tu negocio?",
    corto: "¿Te sirve?",
    bajada:
      "Automatizar no es gratis ni siempre conviene. Antes de seguir, tres preguntas honestas sobre tu operación.",
    bloques: [
      {
        type: "prose",
        text: "La automatización rinde cuando hay muchas decisiones parecidas repitiéndose. Si tu negocio hace pocas operaciones grandes y cada una es distinta, vas a gastar más en armar el sistema que lo que te ahorra. No hay premio por automatizar: el premio es operar mejor.",
      },
      {
        type: "checklist",
        title: "Señales de que sí te conviene",
        intro: "Cuantas más marques, más sentido tiene. Con menos de tres, conviene esperar.",
        items: [
          "Hay una tarea que tu equipo repite decenas o cientos de veces por mes",
          "Esa tarea se resuelve casi siempre con el mismo criterio",
          "La información para decidir ya existe en algún lado (formulario, base, servicio externo)",
          "Podés describir en qué casos la respuesta es sí y en cuáles es no",
          "Cuando alguien se equivoca, el daño es acotado y reparable",
        ],
        conclusion: "Tu operación tiene con qué automatizarse",
      },
      {
        type: "fields",
        title: "Cuándo conviene NO automatizar",
        intro: "Vale tanto como lo anterior. Reconocerlo temprano te ahorra meses.",
        columnas: ["Situación", "Por qué frena", "Qué hacer en su lugar"],
        filas: [
          {
            label: "Volumen bajo",
            origen: "Pocas operaciones por mes",
            riesgo: "El costo de armar y mantener el sistema no se recupera. Seguí a mano.",
            nivel: "atencion",
          },
          {
            label: "Cada caso es distinto",
            origen: "No hay patrón repetido",
            riesgo:
              "El sistema no tiene de qué aprender ni qué regla aplicar. Automatizá partes, no el todo.",
            nivel: "atencion",
          },
          {
            label: "El error es grave o irreversible",
            origen: "Salud, seguridad, montos muy altos",
            riesgo:
              "Podés automatizar el análisis, pero la decisión final debería quedar en manos de una persona.",
            nivel: "alerta",
          },
          {
            label: "No tenés los datos",
            origen: "La información está en papel, en la cabeza de alguien o dispersa",
            riesgo:
              "Primero ordenar los datos. Un agente sin datos confiables decide mal más rápido.",
            nivel: "alerta",
          },
        ],
      },
      {
        type: "prompt",
        title: "Prompt 1 — ¿Tu negocio da para esto?",
        intro:
          "Pegalo en ChatGPT, Claude o Gemini. Sólo necesita saber a qué se dedica tu empresa.",
        template: `Actuá como analista de operaciones, con criterio conservador. Te describo una empresa:

Empresa: {{nombre}}
Actividad: {{actividad}}
Provincia: {{jurisdiccion}}

Necesito saber si esta operación es candidata a automatizarse en serio, no si "se podría usar IA".

Respondé en tres secciones:

1. TAREAS REPETITIVAS: listá las tareas que una empresa así probablemente repite muchas veces por mes. Para cada una, estimá cuántas veces y con qué criterio se resuelve.

2. CANDIDATAS REALES: de esa lista, cuáles cumplen las cuatro condiciones (volumen alto, criterio repetido, datos disponibles, error acotado y reparable). Justificá cada una en dos líneas.

3. DESCARTADAS: cuáles NO conviene automatizar y por qué. Sé explícito si el motivo es volumen bajo, falta de datos, o que el error sea grave.

Cerrá con una recomendación de una línea: "conviene avanzar" o "todavía no conviene", y el motivo principal.`,
        verificar: [
          "Listó tareas concretas de tu rubro, no generalidades como “atención al cliente”",
          "La sección de descartadas no está vacía",
          "Cerró con una recomendación explícita, no con un “depende”",
        ],
        correccion: `Tu respuesta dejó vacía la sección de descartadas, o te recomendó automatizar todo. Eso casi nunca es cierto.

Volvé sobre tu propia lista y para cada tarea respondé: ¿cuántas veces por mes pasa realmente, y qué pasa si el sistema se equivoca? Descartá explícitamente las de volumen bajo y las de error grave, y devolvé las tres secciones corregidas.`,
      },
    ],
  },

  /* ═══════════════════ PARTE 2 — ELEGIR ═══════════════════ */
  {
    id: "mapear",
    track: "elegir",
    titulo: "Mapeá lo que ya hacés",
    corto: "Mapear",
    bajada:
      "No se puede automatizar lo que no se puede describir. Antes de pensar en agentes, hay que poner por escrito los procesos que tu empresa ya ejecuta todos los días.",
    bloques: [
      {
        type: "prose",
        text: "Casi ninguna empresa chica tiene sus procesos escritos. Funcionan porque las personas que los hacen se los saben de memoria. Ese conocimiento no escrito es exactamente lo que un sistema no puede heredar: si no está en algún lado, no hay forma de programarlo ni de explicárselo a una IA.",
      },
      {
        type: "prose",
        text: "Mapear no es hacer un manual de calidad. Es responder cuatro preguntas por cada cosa que hacés seguido: qué lo dispara, qué pasos siguen, dónde hay una decisión, y con qué termina.",
      },
      {
        type: "flow",
        title: "Cómo se ve un proceso mapeado",
        nodos: [
          {
            label: "Disparador",
            detalle:
              "Qué hace que el proceso arranque. En Grupo Paraná: una unidad de negocio necesita operar bajo su propia sociedad.",
          },
          {
            label: "Pasos",
            detalle:
              "Qué se hace, en orden. Se define la actividad, se cuenta cuántos socios va a haber, se busca un modelo de contrato parecido.",
          },
          {
            label: "Decisión",
            detalle:
              "El momento en que alguien elige entre opciones. El contador decide qué figura societaria usar.",
          },
          {
            label: "Resultado",
            detalle:
              "Con qué termina y qué queda registrado. Queda el contrato firmado y archivado con fecha cierta.",
          },
        ],
      },
      {
        type: "note",
        tone: "info",
        title: "El paso de la decisión es el que importa",
        text: "De los cuatro, ese es el que después va a ejecutar el agente. Los otros tres son contexto: de dónde viene la información y qué pasa después. Si al mapear un proceso no encontrás un momento claro de decisión, probablemente no sea un buen candidato — es una tarea, no una decisión.",
      },
      {
        type: "checklist",
        title: "Para cada proceso que anotes",
        intro: "Con cuatro o cinco procesos mapeados alcanza para elegir. No hace falta mapear todo.",
        items: [
          "Escribiste qué lo dispara, en una frase",
          "Anotaste cuántas veces por mes ocurre, aunque sea a ojo",
          "Identificaste el momento exacto en que alguien decide algo",
          "Sabés qué información se mira para decidir y de dónde sale",
          "Anotaste qué pasa cuando la decisión sale mal",
        ],
      },
      {
        type: "prompt",
        title: "Prompt 2 — Sacar tus procesos a la luz",
        intro:
          "Este es el prompt que convierte “tengo una empresa que hace tal cosa” en una lista concreta de procesos.",
        template: `Actuá como consultor de procesos. Te describo mi empresa y quiero que me ayudes a poner por escrito lo que hacemos, porque nunca lo documentamos.

Empresa: {{nombre}}
Actividad: {{actividad}}

Deduci los procesos operativos que una empresa así ejecuta de forma recurrente. Para cada uno devolveme una ficha con exactamente estos campos:

PROCESO: nombre corto
DISPARADOR: qué hace que arranque
PASOS: la secuencia, numerada, en lenguaje común
DECISIÓN: el momento puntual en que una persona elige entre opciones, y cuáles son esas opciones
INFORMACIÓN QUE SE MIRA: qué datos se consultan para decidir y de dónde salen
FRECUENCIA ESTIMADA: cuántas veces por mes
SI SALE MAL: qué consecuencia tiene una decisión equivocada

Dame entre 5 y 8 procesos. Ordenalos del más frecuente al menos frecuente.

Importante: si algún proceso no tiene un momento de decisión claro, marcalo con "SIN DECISIÓN" y explicá por qué. No lo fuerces.`,
        verificar: [
          "Cada ficha tiene los siete campos, no un párrafo suelto",
          "Los procesos son de tu rubro, no genéricos de cualquier empresa",
          "Al menos uno tiene identificado un momento de decisión con opciones concretas",
        ],
        correccion: `A varias fichas les falta el campo de DECISIÓN o está puesto de forma vaga ("se evalúa el caso").

Volvé sobre cada proceso y contestá literalmente: ¿en qué momento exacto una persona elige, y entre qué opciones cerradas elige? Escribí las opciones como una lista, por ejemplo: aprobar / rechazar / pedir más datos. Si un proceso no tiene ese momento, marcalo SIN DECISIÓN.`,
      },
    ],
  },

  {
    id: "elegir-proceso",
    track: "elegir",
    titulo: "Cuál automatizar primero",
    corto: "Elegir uno",
    bajada:
      "De todos los procesos que mapeaste, uno solo. El objetivo no es automatizar la empresa: es que el primero funcione y enseñe.",
    bloques: [
      {
        type: "prose",
        text: "El error clásico es empezar por el proceso más importante. Ese es justamente el peor candidato: es el que más duele si sale mal y el que más resistencia genera. Empezá por uno que sea aburrido, frecuente y de bajo riesgo. Si funciona, te compra la confianza para ir por el siguiente.",
      },
      {
        type: "fields",
        title: "Los seis criterios para puntuar",
        intro:
          "Puntuá cada proceso mapeado del 1 al 5 en cada criterio. El que más suma es por donde empezás.",
        columnas: ["Criterio", "Puntúa alto cuando…", "Por qué importa"],
        filas: [
          {
            label: "Volumen",
            origen: "Ocurre muchas veces por mes",
            riesgo: "Es lo que hace que el esfuerzo se pague. Sin volumen, no hay caso.",
            nivel: "ok",
          },
          {
            label: "Repetitividad",
            origen: "Casi siempre se resuelve igual",
            riesgo: "Si cada caso es único, no hay criterio que el sistema pueda seguir.",
            nivel: "ok",
          },
          {
            label: "Reglas explicitables",
            origen: "Podés escribir en qué casos es sí y en cuáles es no",
            riesgo: "Lo que no podés escribir, no se lo podés pedir a un sistema ni a una IA.",
            nivel: "ok",
          },
          {
            label: "Datos disponibles",
            origen: "La información ya está en un sistema, no en papel ni en la memoria de alguien",
            riesgo: "Sin datos accesibles el proyecto se convierte en otro proyecto: ordenar datos.",
            nivel: "atencion",
          },
          {
            label: "Error acotado",
            origen: "Si sale mal, se puede corregir y el daño es chico",
            riesgo:
              "Es el criterio que define cuánta autonomía podés darle. Puntaje bajo acá no descarta el proceso, pero obliga a más supervisión humana.",
            nivel: "alerta",
          },
          {
            label: "Poco criterio humano",
            origen: "No hace falta juicio, contexto ni negociación",
            riesgo:
              "Cuanto más se apoye en la sensibilidad de una persona, peor candidato es — y más expuesta queda la sociedad si el sistema decide solo.",
            nivel: "alerta",
          },
        ],
      },
      {
        type: "note",
        tone: "warn",
        title: "Uno solo, y escribilo",
        text: "Cuando lo elijas, escribí en una frase la decisión que va a tomar el sistema y cargala arriba, en “El proceso que vas a automatizar”. A partir de acá todos los prompts de la guía la usan. En el ejemplo: “Armar el expediente para constituir una sociedad subsidiaria de la que Grupo Paraná sea socia, y determinar qué figura societaria corresponde”.",
      },
      {
        type: "prompt",
        title: "Prompt 3 — Puntuar y elegir",
        intro: "Pegale abajo la lista de procesos que te devolvió el prompt anterior.",
        template: `Actuá como consultor de automatización, con criterio conservador. Voy a pegarte una lista de procesos de mi empresa ({{actividad}}).

Puntuá cada proceso del 1 al 5 en estos seis criterios:
- Volumen (cuántas veces por mes)
- Repetitividad (si se resuelve siempre igual)
- Reglas explicitables (si se puede escribir cuándo es sí y cuándo es no)
- Datos disponibles (si la información ya está en algún sistema)
- Error acotado (si equivocarse es barato y reversible)
- Poco criterio humano (si no hace falta juicio ni negociación)

Devolvelo como tabla, con el total de cada proceso y ordenado de mayor a menor.

Después de la tabla:

1. RECOMENDADO: cuál automatizaría primero y por qué. Si el más puntuado tiene 2 o menos en "Error acotado", recomendá el segundo y explicá el motivo.
2. LA DECISIÓN: para el recomendado, escribí en UNA frase la decisión que tomaría el sistema, empezando con un verbo, e incluyendo las opciones posibles.
3. POR QUÉ NO LOS OTROS: en una línea por proceso descartado.

Acá va mi lista de procesos:
[PEGÁ ACÁ LA RESPUESTA DEL PROMPT ANTERIOR]`,
        verificar: [
          "Devolvió una tabla con los seis criterios puntuados y un total",
          "El punto 2 tiene la decisión en UNA frase, empezando con un verbo y con las opciones",
          "Explicó por qué descartó los otros, no sólo cuál eligió",
        ],
        correccion: `Necesito el punto 2 mejor formulado, porque es lo que uso en toda la guía de acá en adelante.

Reescribí sólo ese punto con esta forma exacta, sin agregar nada más:

"El sistema decide [verbo en infinitivo] ..., eligiendo entre: [opción 1] / [opción 2] / derivar a revisión humana."

Que sea una sola frase y que las opciones sean una lista cerrada.`,
      },
      {
        type: "crosslink",
        hacia: "decision",
        texto:
          "Con el proceso elegido y la decisión escrita, ya se puede diseñar el agente que la va a ejecutar.",
      },
    ],
  },

  /* ═══════════════════ PARTE 3 — DISEÑAR ═══════════════════ */
  {
    id: "decision",
    track: "disenar",
    titulo: "Qué decide el agente",
    corto: "La decisión",
    bajada:
      "Un agente no “hace tareas”: toma una decisión, muchas veces, con el mismo criterio. Acá se convierte el proceso que elegiste en una ficha que se puede construir.",
    bloques: [
      {
        type: "prose",
        text: "Antes de elegir herramientas o proveedores, tenés que poder completar esta frase sin titubear: “el sistema decide ____, entre estas opciones ____, mirando estos datos ____”. Si te sale, tenés un agente. Si no, todavía tenés una intención.",
      },
      {
        type: "flow",
        title: "La decisión, en Grupo Paraná",
        nodos: [
          {
            label: "Entra un pedido",
            detalle:
              "La unidad de logística va a arrancar una operación nueva y necesita su propia sociedad.",
          },
          {
            label: "El agente encuadra",
            detalle:
              "Mira la actividad, cuántos socios va a haber y en qué provincia, y cruza eso con las figuras disponibles.",
          },
          {
            label: "Elige una de tres",
            detalle: "Generar el expediente · Generarlo con observaciones · Derivar a revisión.",
          },
          {
            label: "Deja rastro",
            detalle: "Guarda qué figura eligió, por qué descartó las otras y con qué datos lo decidió.",
          },
        ],
      },
      {
        type: "note",
        tone: "info",
        title: "La tercera opción es la más importante",
        text: "“Derivar a revisión humana” es lo que hace posible todo lo demás. Un agente que sólo puede aprobar o rechazar no tiene por dónde escaparse cuando el caso es raro — y los casos raros existen siempre. Esa opción también es la que después vuelve verdadera la cláusula de supervisión humana del estatuto.",
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
          "Qué pasa si al sistema le faltan datos para decidir",
        ],
      },
      {
        type: "prompt",
        title: "Prompt 4 — La ficha de operación",
        template: `Actuá como diseñador de sistemas automatizados.

Empresa: {{nombre}}
Actividad: {{actividad}}
Decisión a automatizar: {{sistema}}

Devolveme una ficha con exactamente estos campos:

DECISIÓN: una sola frase, empezando con un verbo.
OPCIONES POSIBLES: lista cerrada. Incluí siempre una opción de derivación a revisión humana.
FRECUENCIA ESTIMADA: cuántas veces por día.
COSTO DEL ERROR: separá los dos casos.
  - FALSO POSITIVO (actuó y no debía): consecuencia concreta, quién la sufre, cuánto cuesta.
  - FALSO NEGATIVO (no actuó y debía): lo mismo.
CASO SIN DECISIÓN: qué hace el sistema cuando le faltan datos.

No agregues secciones que no pedí. Si algún campo no se puede completar con lo que te di, escribí "FALTA DEFINIR" y decime qué necesitás saber.`,
        verificar: [
          "La decisión está en una sola frase y empieza con un verbo",
          "Entre las opciones aparece la derivación a revisión humana",
          "Separó los dos tipos de error, que tienen consecuencias distintas",
        ],
        correccion: `Te faltó separar los dos errores, y son muy distintos entre sí: uno le cuesta plata a la empresa, el otro le niega algo a una persona que lo merecía.

Rehacé sólo el campo COSTO DEL ERROR con esta estructura, dejando el resto igual:

FALSO POSITIVO (actuó y no debía): consecuencia, quién la sufre, cuánto cuesta.
FALSO NEGATIVO (no actuó y debía): consecuencia, quién la sufre, cuánto cuesta.`,
      },
    ],
  },

  {
    id: "entradas",
    track: "disenar",
    titulo: "Los datos de entrada",
    corto: "Entradas",
    bajada:
      "Todo lo que el agente sabe antes de decidir. Es el paso con más consecuencias jurídicas de toda la guía, y el que más fácil se subestima.",
    bloques: [
      {
        type: "prose",
        text: "Cada dato que entra al sistema es una fuente de decisión y, por lo tanto, una fuente de responsabilidad. Pero no todos pesan igual, y la diferencia no se nota mirando el formulario: hay campos que sólo rellenan el documento y campos que deciden si el documento sirve o no sirve.",
      },
      {
        type: "fields",
        title: "Datos de entrada del constituidor de sociedades",
        intro:
          "Así se ve la tabla que va en la documentación técnica. La tercera columna es la que más pesa si algún día hay que explicar una decisión.",
        columnas: ["Dato", "De dónde sale", "Qué consecuencia tiene"],
        filas: [
          {
            label: "CUIT de la sociedad madre",
            origen: "Padrón de ARCA (consulta)",
            riesgo: "Ninguna. Confirma que existe, está activa y puede ser socia.",
            nivel: "ok",
          },
          {
            label: "Nombre tentativo de la subsidiaria",
            origen: "Formulario interno",
            riesgo: "Ninguna en esta instancia. La disponibilidad recién importa si se inscribe.",
            nivel: "ok",
          },
          {
            label: "Capital y cómo se integra",
            origen: "Formulario interno",
            riesgo:
              "Define el mínimo legal según la figura y si hace falta constancia bancaria de depósito.",
            nivel: "atencion",
          },
          {
            label: "Datos personales de los socios humanos",
            origen: "Formulario interno",
            riesgo:
              "DNI, domicilio y estado civil son datos personales: hay que definir plazo de conservación y quién accede (Ley 25.326).",
            nivel: "atencion",
          },
          {
            label: "Provincia de la sede",
            origen: "Formulario interno",
            riesgo:
              "Define el registro competente y qué figuras admite. Las reglas no son iguales en todas las jurisdicciones.",
            nivel: "atencion",
          },
          {
            label: "Quién firma por la sociedad madre",
            origen: "Estatuto y actas de la madre",
            riesgo:
              "Sin acta que autorice la participación, el acto queda atacable. Es el dato que más se olvida.",
            nivel: "alerta",
          },
          {
            label: "Objeto: a qué se va a dedicar",
            origen: "Formulario interno",
            riesgo:
              "El dato de mayor consecuencia. Si la actividad está regulada, hace falta autorización previa y la figura elegida puede ser inválida.",
            nivel: "alerta",
          },
          {
            label: "Cuántos socios va a tener",
            origen: "Formulario interno",
            riesgo:
              "Un solo dato que cierra ramas enteras: con un único socio la sociedad es unipersonal y las figuras sin inscribir dejan de estar disponibles.",
            nivel: "alerta",
          },
        ],
      },
      {
        type: "note",
        tone: "legal",
        title: "Por qué las dos últimas filas importan tanto",
        text: "Las dos últimas no son un campo más del formulario: deciden si el documento sirve o no sirve. Si la actividad está regulada —banca, seguros, salud, transporte— hace falta autorización previa y la figura elegida puede ser directamente inválida. Y la cantidad de socios es el dato que más ramas cierra: con un solo socio la sociedad es unipersonal, y eso obliga a figuras de inscripción obligatoria. Un agente que trata estos dos campos como texto libre produce documentos que no se pueden usar, sin avisar que algo salió mal.",
      },
      {
        type: "prompt",
        title: "Prompt 5 — Auditoría de tus datos de entrada",
        intro:
          "Este es el prompt que más veces vas a correr. Guardá la respuesta: va casi tal cual a la documentación técnica.",
        template: `Actuá como auditor de datos.

Actividad de la empresa: {{actividad}}
Decisión que toma el sistema: {{sistema}}

Listá todos los datos de entrada que ese sistema necesita para decidir. Devolvelo como tabla con estas cuatro columnas:

DATO | DE DÓNDE SALE | ¿DECLARADO O VERIFICABLE? | ¿QUÉ CONSECUENCIA TIENE SI VIENE MAL?

Para la cuarta columna clasificá cada dato en uno de tres niveles y decí por qué:
- DECIDE VALIDEZ: si viene mal, el resultado no sirve o es inválido.
- AFECTA EL CONTENIDO: cambia lo que dice el documento, pero no lo invalida.
- COSMÉTICO: no cambia nada sustancial.

Después de la tabla, dos secciones:
- DATOS QUE CIERRAN RAMAS: cuáles, con un solo valor, descartan opciones enteras. Explicá cuál valor y qué descarta.
- QUÉ PASA SI FALTA: para los tres datos más importantes, qué debería hacer el sistema si ese dato no está disponible.

No inventes datos que el sistema no necesita.`,
        verificar: [
          "Cada dato está clasificado en uno de los tres niveles, sin quedar a mitad de camino",
          "Al menos un dato quedó marcado como “DECIDE VALIDEZ”",
          "Están las dos secciones del final, no sólo la tabla",
        ],
        correccion: `No marcaste ningún dato como "DECIDE VALIDEZ", y es muy poco probable que no haya ninguno: casi todo sistema tiene al menos un campo que, mal cargado, arruina el resultado entero.

Revisá tu tabla dato por dato y respondé explícitamente: "si este dato viene mal, ¿el resultado sigue sirviendo? SÍ/NO, y por qué."

Prestá especial atención a los datos que definen qué camino toma el sistema, no a los que sólo rellenan el resultado. Devolvé la tabla corregida.`,
      },
    ],
  },

  {
    id: "proceso",
    track: "disenar",
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
              "Un solo socio descarta las figuras sin inscribir. Actividad regulada obliga a autorización previa. Capital por debajo del mínimo, rechaza. Si falla alguna, termina ahí: el modelo ni se ejecuta.",
          },
          {
            label: "2. Criterio (modelo)",
            detalle:
              "Sobre los casos que pasaron el filtro, redacta el objeto social y elige las cláusulas de administración, con su nivel de confianza.",
          },
          {
            label: "3. Umbral de derivación",
            detalle:
              "Objeto ambiguo, algún socio extranjero, o la madre con menos del 100%: no decide, deriva a una persona.",
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
        title: "Prompt 6 — Separar reglas de criterio",
        template: `Actuá como arquitecto de sistemas.

Decisión que toma el sistema: {{sistema}}
Actividad de la empresa: {{actividad}}

Separá su lógica en capas y devolvela así:

REGLAS DURAS (se evalúan siempre, en código, antes que cualquier modelo):
Numeralas. Cada una tiene que poder responderse con sí o no, sin ambigüedad, y decir qué pasa cuando no se cumple.

CRITERIO EVALUATIVO (lo que queda para el modelo):
Qué señales evalúa y por qué no se pueden escribir como regla fija.

UMBRAL DE DERIVACIÓN:
En qué condiciones concretas el sistema NO debe decidir solo. Dame al menos tres.

MODO DEGRADADO:
Qué hace el sistema si el modelo no responde o un servicio externo está caído.

Al final, marcá qué reglas del criterio evaluativo se podrían convertir en reglas duras con un poco más de trabajo.`,
        verificar: [
          "Las reglas duras se responden con sí o no, sin zonas grises",
          "Hay al menos tres condiciones de derivación",
          "Contestó qué pasa si el modelo no está disponible",
        ],
        correccion: `Algunas de tus "reglas duras" no son duras: usan palabras como "adecuado", "razonable", "suficiente" o "bajo riesgo", que no se pueden evaluar sin criterio.

Reescribilas con números y condiciones exactas, o movelas al criterio evaluativo. Devolvé las dos listas corregidas.`,
      },
    ],
  },

  {
    id: "herramientas",
    track: "disenar",
    titulo: "Qué puede tocar el agente",
    corto: "Herramientas",
    bajada:
      "Un agente sin herramientas sólo opina. Con herramientas, actúa — y ahí es donde nace la responsabilidad patrimonial.",
    bloques: [
      {
        type: "prose",
        text: "La diferencia entre un chatbot y un agente es esta lista. Un chatbot te dice “convendría usar una S.R.L.”. Un agente deja el expediente armado y listo para firmar. Todo lo que el agente pueda ejecutar sin preguntar es, literalmente, algo por lo que la sociedad responde.",
      },
      {
        type: "fields",
        title: "Herramientas del constituidor de sociedades",
        intro: "En la documentación técnica, esta tabla va junto a la de datos de entrada.",
        columnas: ["Herramienta", "Qué hace", "¿Se puede deshacer?"],
        filas: [
          {
            label: "Consultar el padrón de ARCA",
            origen: "Verifica que la sociedad madre existe y está activa",
            riesgo: "Sólo lectura. No modifica nada.",
            nivel: "ok",
          },
          {
            label: "Buscar modelo de contrato",
            origen: "Lee la base de modelos del estudio",
            riesgo: "Sólo lectura. Si el modelo está desactualizado, el error entra por acá.",
            nivel: "ok",
          },
          {
            label: "Generar el borrador",
            origen: "Escribe el contrato y los anexos a partir de la plantilla",
            riesgo: "Escritura, pero sobre un archivo nuevo: no pisa nada existente.",
            nivel: "ok",
          },
          {
            label: "Registrar el caso",
            origen: "Guarda qué decidió, con qué datos y qué versión de plantilla usó",
            riesgo: "Escritura acumulativa: no pisa nada. Es la que te salva si alguien impugna.",
            nivel: "ok",
          },
          {
            label: "Avisar que está listo",
            origen: "Notifica al responsable que el expediente quedó armado",
            riesgo:
              "No se puede deshacer: un aviso enviado por error ya fue leído. Conviene ejecutarla última.",
            nivel: "atencion",
          },
          {
            label: "Reservar la denominación",
            origen: "Toma el nombre en el registro",
            riesgo:
              "Irreversible y con costo. Sólo aplica si la sociedad se va a inscribir — en la figura sin inscribir, esta herramienta directamente no existe.",
            nivel: "alerta",
          },
          {
            label: "Firmar y presentar",
            origen: "Suscribe el documento y lo ingresa al registro",
            riesgo:
              "Irreversible, con efectos frente a terceros, y es ejercicio profesional. Esta no se le da al agente: arma el expediente y lo deja listo para que una persona lo revise y firme.",
            nivel: "alerta",
          },
        ],
      },
      {
        type: "note",
        tone: "legal",
        title: "La última fila es la que define el proyecto",
        text: "Un agente que firma y presenta está haciendo ejercicio profesional, y además asume un acto con efectos frente a terceros que no puede deshacer. Un agente que deja el expediente armado para que una persona lo revise y firme hace el 90% del trabajo sin ninguno de los dos problemas. Fuera de eso, la regla general: ordená las herramientas de menos a más reversible y ejecutalas en ese orden, para que si algo falla, falle antes de la parte que no se puede deshacer.",
      },
      {
        type: "prompt",
        title: "Prompt 7 — Inventario de herramientas",
        template: `Actuá como arquitecto de sistemas.

Decisión que toma el sistema: {{sistema}}
Actividad de la empresa: {{actividad}}

Listá todas las herramientas que necesita para ejecutar su trabajo. Devolvelo como tabla:

HERRAMIENTA | QUÉ HACE | LECTURA O ESCRITURA | ¿REVERSIBLE? | SI FALLA, ¿QUÉ PASA?

Después de la tabla:

1. Ordená las herramientas de escritura de más reversible a menos reversible, y proponé el orden en que deberían ejecutarse.
2. Para cada herramienta irreversible, proponé una condición previa que el sistema deba verificar antes de ejecutarla.
3. Indicá cuáles NO debería poder ejecutar el agente por su cuenta, y por qué.

Distinguí bien entre "leer un dato" y "modificar el mundo".`,
        verificar: [
          "Cada herramienta está clasificada como lectura o escritura",
          "Las irreversibles tienen una condición previa propuesta",
          "Hay al menos una herramienta que recomendó no dejar en manos del agente",
        ],
        correccion: `Marcaste todas las herramientas como aptas para que el agente las ejecute solo. En un sistema con efecto patrimonial casi siempre hay al menos una acción que conviene dejar detrás de una confirmación humana o de un tope automático.

Volvé a responder el punto 3 y nombrá al menos una herramienta que restringirías, con el motivo.`,
      },
    ],
  },

  /* ═══════════════════ PARTE 4 — RESPONDER ═══════════════════ */
  {
    id: "evidencia",
    track: "responder",
    titulo: "La salida y la evidencia",
    corto: "Evidencia",
    bajada:
      "El agente no termina cuando decide: termina cuando deja registrado por qué decidió. Sin eso, no hay defensa posible.",
    bloques: [
      {
        type: "prose",
        text: "Imaginá el peor día: dos años después, alguien impugna una de las sociedades que armaste. Te van a pedir que expliques por qué se eligió esa figura y no otra, en esa fecha, con la información que había entonces. Si tu sistema guardó únicamente el documento final, no tenés nada. Si guardó qué datos usó, qué alternativas descartó y por qué, tenés una defensa.",
      },
      {
        type: "checklist",
        title: "El registro mínimo de cada decisión",
        intro:
          "Ninguno de estos campos es opcional. Los cinco se guardan siempre, incluso cuando el sistema derivó en lugar de decidir.",
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
        type: "prompt",
        title: "Prompt 8 — Estructura del registro",
        template: `Actuá como responsable de auditoría.

Decisión que toma el sistema: {{sistema}}
Actividad de la empresa: {{actividad}}

Diseñá la estructura del registro que debe quedar guardado por cada decisión, pensando en que dentro de dos años alguien va a reclamar por una decisión puntual y voy a tener que explicarla.

Devolveme:

1. La lista de campos a guardar, con el tipo de dato de cada uno y por qué hace falta.
2. Cuáles de esos campos contienen datos personales y por lo tanto necesitan un plazo de conservación definido.
3. Un ejemplo completo del registro de una decisión rechazada, con datos ficticios realistas.
4. La diferencia entre el motivo interno (para auditoría) y el motivo comunicado a la persona, con un ejemplo de cada uno para el mismo caso.

El registro tiene que permitir reconstruir la decisión sin acceso al sistema original.`,
        verificar: [
          "Guarda la versión del sistema o del modelo, no sólo el resultado",
          "Distingue el motivo interno del motivo comunicado, con ejemplos de ambos",
          "Marcó qué campos contienen datos personales",
        ],
        correccion: `Falta el campo más importante para una auditoría a futuro: la versión. Sin saber qué versión del sistema tomó la decisión no se puede reconstruir nada, porque las reglas cambian con el tiempo.

Agregá a la estructura los campos de versión del sistema, versión del modelo y fecha de la última modificación de reglas. Devolvé la estructura completa.`,
      },
    ],
  },

  {
    id: "supervision",
    track: "responder",
    titulo: "La supervisión humana",
    corto: "Supervisión",
    bajada:
      "Que haya una persona con facultad de intervenir, convertido en algo que se puede mostrar: quién, desde dónde y en cuánto tiempo.",
    bloques: [
      {
        type: "prose",
        text: "“Supervisión humana con facultad de intervención” suena a declaración de principios. Para el registro, y sobre todo para un reclamo, tiene que ser algo concreto: una persona con nombre, un lugar desde donde apretar el botón, y un tiempo máximo de respuesta.",
      },
      {
        type: "fields",
        title: "Los tres niveles de intervención",
        intro: "Van de lo cotidiano a lo excepcional. Los tres se documentan.",
        columnas: ["Nivel", "Cuándo se activa", "Quién y en cuánto tiempo"],
        filas: [
          {
            label: "Revisión caso por caso",
            origen: "El agente derivó un expediente puntual, o lo generó con observaciones",
            riesgo: "Responsable legal del grupo. Antes de que el documento se firme.",
            nivel: "ok",
          },
          {
            label: "Ajuste de plantillas",
            origen: "Cambió una norma, o el registro observó un expediente ya presentado",
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
        intro: "Con estos puntos resueltos, tenés el documento que pide el trámite.",
        items: [
          "Hay una persona identificada por nivel de intervención, con nombre y rol",
          "El freno total se puede activar sin pedir autorización a nadie",
          "Cada intervención queda registrada igual que una decisión del agente",
          "Está definido qué pasa con las operaciones en curso cuando el sistema se frena",
          "Alguien revisa periódicamente si aparecieron patrones de rechazo por zona o perfil",
        ],
      },
      {
        type: "prompt",
        title: "Prompt 9 — Protocolo de supervisión",
        template: `Actuá como responsable de riesgo operativo.

Empresa: {{nombre}}
Decisión que toma el sistema: {{sistema}}

Escribí el protocolo de supervisión humana, pensado para adjuntar a la documentación de constitución de una Sociedad Automatizada. Tiene que cubrir:

1. Los niveles de intervención, de lo cotidiano a lo excepcional. Para cada uno: qué lo dispara, quién interviene, en cuánto tiempo, y qué queda registrado.
2. El mecanismo de freno total: quién puede activarlo, desde dónde, y por qué no debe requerir autorización previa.
3. Qué pasa con las operaciones en curso cuando el sistema se frena.
4. La revisión periódica: cada cuánto se revisa si el sistema está produciendo resultados sesgados, quién la hace y qué mira concretamente.

Escribilo en lenguaje claro, para que lo entienda alguien sin formación técnica. Evitá el condicional: usá "el responsable activa", no "el responsable podría activar".`,
        verificar: [
          "El freno total no requiere autorización previa de nadie",
          "Cada nivel tiene un tiempo máximo concreto, no un “a la brevedad”",
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

  /* ═══════════════════ EL TRÁMITE (apagado) ═══════════════════ */
  {
    id: "encuadre",
    track: "juridico",
    titulo: "¿Tu operación califica?",
    corto: "Encuadre",
    bajada:
      "Antes de armar cualquier documento, respondé estas tres preguntas. Si tu negocio cumple las tres, calificás para este régimen.",
    bloques: [
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
    ],
  },

  {
    id: "denominacion",
    track: "juridico",
    titulo: "Denominación social",
    corto: "Denominación",
    bajada:
      "Hay una sola condición obligatoria: el nombre debe incluir la palabra “Automatizada”.",
    bloques: [
      {
        type: "screen",
        url: "rpc.gob.ar › consulta-denominacion",
        caption: "Pantalla ilustrativa del trámite de consulta de nombre.",
        filas: [{ label: "Paraná Logística Automatizada S.A.", estado: "Disponible", cargado: true }],
        cta: "Reservar nombre",
      },
      {
        type: "note",
        tone: "warn",
        title: "El sufijo es obligatorio, no opcional",
        text: "Forma parte del requisito formal del Art. 14. Una denominación sin la palabra “Automatizada” se observa en el registro y frena todo el trámite.",
      },
    ],
  },

  {
    id: "estatuto",
    track: "juridico",
    titulo: "El estatuto técnico",
    corto: "Estatuto",
    bajada:
      "Acá se documenta cómo funciona el sistema: su carácter automatizado y quién lo supervisa.",
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
        type: "note",
        tone: "legal",
        title: "Cláusulas ilustrativas",
        text: "Los textos de esta pantalla son ejemplos con fines didácticos. La redacción definitiva se ajusta a cada caso concreto.",
      },
    ],
  },

  {
    id: "responsabilidad",
    track: "juridico",
    titulo: "Quién responde y por qué",
    corto: "Responsabilidad",
    bajada:
      "Esta cláusula define quién responde si algo sale mal: la propia sociedad, con su patrimonio.",
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
        type: "crosslink",
        hacia: "evidencia",
        texto: "El paso de evidencia es lo que hace defendible a este artículo.",
      },
    ],
  },

  {
    id: "inscripcion",
    track: "juridico",
    titulo: "La inscripción registral",
    corto: "Inscripción",
    bajada:
      "El paso final es presentar todo ante el Registro Público, junto con la documentación técnica de respaldo.",
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
        text: "Los dos primeros son documentos societarios estándar. El tercero no lo es: es la descripción del sistema, y no existe un modelo para copiar. Los pasos técnicos de esta guía están ordenados para que, al terminarlos, ese PDF quede armado.",
      },
    ],
  },
];

/* ── Selectores ─────────────────────────────────────────────────────── */

export const PASOS_POR_TRACK = (track: TrackId) => PASOS.filter((p) => p.track === track);

/** Los pasos que la guía muestra hoy: sólo los de partes habilitadas. */
export const PASOS_VISIBLES = PASOS.filter((p) => trackHabilitado(p.track));

export const pasoVisible = (id: string) => PASOS_VISIBLES.some((p) => p.id === id);

export const getPaso = (id: string) => PASOS.find((p) => p.id === id);

/* ── Plantillas de prompt ───────────────────────────────────────────── */

/** Reemplaza {{campo}} por lo que cargó el lector, con fallback al ejemplo. */
export function completarPlantilla(
  template: string,
  datos: Partial<Record<CampoDatos, string>>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, campo: string) => {
    const key = campo as CampoDatos;
    return datos[key]?.trim() || EJEMPLO[key] || match;
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
 * Igual que completarPlantilla pero devuelve el texto partido en fragmentos,
 * para poder mostrar en pantalla qué valores se inyectaron.
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
