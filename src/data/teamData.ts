// src/data/teamData.ts
export type TeamMember = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  focus?: string;
  slug?: string;
};

export const socios: TeamMember[] = [
  {
    name: "Carlos E. Moro",
    role: "Abogado",
    image: "https://res.cloudinary.com/di2os0yqc/image/upload/c_fill,g_face,w_800,h_800/v1763917793/Dr-Carlos_b652ws.jpg",
    bio: "Especialista en derecho empresarial y societario con más de 20 años de experiencia en litigios complejos.",
    slug: "dr-carlos-moro"
  },
  {
    name: "Emilio F. Moro",
    role: "Abogado",
    image: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763917798/Dr-Emilio_bb8cwm.jpg",
    bio: "Referente en derecho civil y comercial. Amplia trayectoria en asesoramiento integral a empresas.",
    focus: "50%_35%",
    slug: "dr-emilio-f-moro"
  },
];

export const abogados: TeamMember[] = [
  {
    name: "Rocío Leites",
    role: "Abogada",
    image: "https://res.cloudinary.com/di2os0yqc/image/upload/c_fill,g_face,w_800,h_800/v1763917774/Dra-Rocio_d8jqeg.jpg",
    bio: "Especialista en derecho corporativo y compliance. Experiencia en asesoría a empresas familiares.",
    focus: "50%_20%",
  },
  {
    name: "Abril Martinez Figueroa",
    role: "Abogada",
    image: "https://res.cloudinary.com/di2os0yqc/image/upload/c_fill,g_face,w_800,h_800/v1763917757/Dra-Abril_wjvyks.jpg",
    bio: "Litigante con foco en resolución alternativa de conflictos y derecho civil.",
    focus: "50%_20%",
  },
  {
    name: "Noelia Torres",
    role: "Abogada",
    image: "https://res.cloudinary.com/di2os0yqc/image/upload/c_fill,g_face,w_800,h_800/v1763917207/Dra-Noelia_bobfsr.jpg",
    bio: "Asesora en derecho laboral y seguridad social con amplia experiencia en pymes.",
    focus: "50%_20%",
  },
];

export const pasantes: TeamMember[] = [
  {
    name: "Isabellia Di Palma",
    role: "Pasante de Derecho",
    bio: "Estudiante avanzada en derecho. Apoyo en investigaciones y gestión de documentación.",
  },
];

export const procuradores: TeamMember[] = [
  {
    name: "Rosellí Giannichini",
    role: "Procuradora",
    bio: "Gestión de expedientes y soporte administrativo.",
  },
  {
    name: "Paula Jaime",
    role: "Procuradora",
    bio: "Coordinación de agenda y atención a clientes.",
  },
];

export const itAssistants: TeamMember[] = [
  {
    name: "Sergio Heyde",
    role: "Analista en Sistemas",
    bio: "Soporte técnico y mantenimiento de sistemas.",
  },
  {
    name: "Bautista Heyde",
    role: "Desarrollador Web",
    bio: "Desarrollo de herramientas internas.",
  },
];