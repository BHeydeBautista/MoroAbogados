// src/data/teamData.ts
export type TeamMember = {
  name: string;
  role: string;
  role_en?: string;
  image?: string;
  bio?: string;
  bio_en?: string;
  focus?: string;
  slug?: string;
};

export const socios: TeamMember[] = [
  {
    name: "Carlos E. Moro",
    role: "Abogado",
    image: "https://res.cloudinary.com/di2os0yqc/image/upload/c_fill,g_face,w_800,h_800/v1763917793/Dr-Carlos_b652ws.jpg",
    bio: "Abogado, especialista en Derecho Concursal",
    role_en: "Lawyer",
    bio_en: "Lawyer, specialist in Insolvency Law",
    slug: "dr-carlos-moro"
  },
  {
    name: "Emilio F. Moro",
    role: "Abogado",
    image: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763917798/Dr-Emilio_bb8cwm.jpg",
    bio: "Abogado, especialista en Derecho Comercial, Concursal y Procesal",
    role_en: "Lawyer",
    bio_en: "Lawyer, specialist in Commercial, Insolvency and Procedural Law",
    focus: "50%_35%",
    slug: "dr-emilio-f-moro"
  },
];

export const abogados: TeamMember[] = [
  {
    name: "Rocío Leites",
    role: "Abogada",
    image: "https://res.cloudinary.com/di2os0yqc/image/upload/v1764022528/rocio_jnmrfw.jpg",
    bio: "Especialista en derecho corporativo y compliance. Experiencia en asesoría a empresas familiares.",
    role_en: "Lawyer",
    bio_en: "Specialist in corporate law and compliance. Experience advising family businesses.",
    focus: "50%_20%",
  },
  {
    name: "Abril Martinez Figueroa",
    role: "Abogada",
    image: "https://res.cloudinary.com/di2os0yqc/image/upload/c_fill,g_face,w_800,h_800/v1763917757/Dra-Abril_wjvyks.jpg",
    bio: "Litigante con foco en resolución alternativa de conflictos y derecho civil.",
    role_en: "Lawyer",
    bio_en: "Litigator focused on alternative dispute resolution and civil law.",
    focus: "50%_20%",
  },
  {
    name: "Noelia Torres",
    role: "Abogada",
    image: "https://res.cloudinary.com/di2os0yqc/image/upload/c_fill,g_face,w_800,h_800/v1763917207/Dra-Noelia_bobfsr.jpg",
    bio: "Asesora en derecho laboral y seguridad social con amplia experiencia en pymes.",
    role_en: "Lawyer",
    bio_en: "Advisor in labor law and social security with extensive SME experience.",
    focus: "50%_20%",
  },
  {
  name: "Emilia Vaca",
  role: "Abogada",
  image: "https://res.cloudinary.com/di2os0yqc/image/upload/c_fill,g_face,w_800,h_800/v1767111536/Dr-Emilia-Vaca_nu8mcb.jpg",
  bio: "Asesora en derecho laboral y seguridad social con amplia experiencia en pymes.",
  role_en: "Lawyer",
  bio_en: "Advisor in labor law and social security with extensive SME experience.",
  focus: "50%_20%",
},

];

export const pasantes: TeamMember[] = [
  {
    name: "Isabellia Di Palma",
    role: "Pasante de Derecho",
    role_en: "Law Intern",
    bio: "Estudiante avanzada en derecho. Apoyo en investigaciones y gestión de documentación.",
    bio_en: "Advanced law student. Supports research and document management.",
  },
];

export const procuradores: TeamMember[] = [
  {
    name: "Rosellí Giannichini",
    role: "Procuradora",
    role_en: "Court Attorney",
    bio: "Gestión de expedientes y soporte administrativo.",
    bio_en: "Case management and administrative support.",
  },
  {
    name: "Paula Jaime",
    role: "Procuradora",
    role_en: "Court Attorney",
    bio: "Coordinación de agenda y atención a clientes.",
    bio_en: "Schedule coordination and client service.",
  },
];

export const itAssistants: TeamMember[] = [
  {
    name: "Sergio Heyde",
    role: "Analista en Sistemas",
    role_en: "Systems Analyst",
    bio: "Soporte técnico y mantenimiento de sistemas.",
    bio_en: "Technical support and systems maintenance.",
  },
  {
    name: "Bautista Heyde",
    role: "Desarrollador Web",
    role_en: "Web Developer",
    bio: "Desarrollo de herramientas internas.",
    bio_en: "Development of internal tools.",
  },
];