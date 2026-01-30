import type { Lawyer } from "../lawyerTypes";

export const draEmiliaVaca = {
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
      title: "Formación Básica en Mediación Interdisciplinaria y Pre-judicial",
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
} satisfies Lawyer;
