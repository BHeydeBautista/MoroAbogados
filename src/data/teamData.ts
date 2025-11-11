// src/data/teamData.ts
export type TeamMember = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  focus?: string;
};

export const socios: TeamMember[] = [
  {
    name: "Carlos E. Moro",
    role: "Abogado",
    image: "/img/lawyers/Dr-Carlos.jpg",
    bio: "Especialista en derecho empresarial y societario con más de 20 años de experiencia en litigios complejos.",
    focus: "50%_20%",
  },
  {
    name: "Emilio F. Moro",
    role: "Abogado",
    image: "/img/lawyers/Dr-Emilio.jpg",
    bio: "Referente en derecho civil y comercial. Amplia trayectoria en asesoramiento integral a empresas.",
    focus: "50%_35%",
  },
];

export const abogados: TeamMember[] = [
  {
    name: "Rocío Leites",
    role: "Abogada",
    image: "/img/lawyers/Dra-Rocio.jpg",
    bio: "Especialista en derecho corporativo y compliance. Experiencia en asesoría a empresas familiares.",
    focus: "50%_20%",
  },
  {
    name: "Abril Martinez Figueroa",
    role: "Abogada",
    image: "/img/lawyers/Dra-Abril.jpg",
    bio: "Litigante con foco en resolución alternativa de conflictos y derecho civil.",
    focus: "50%_20%",
  },
  {
    name: "Noelia Torres",
    role: "Abogada",
    image: "/img/lawyers/Dra-Noelia.jpg",
    bio: "Asesora en derecho laboral y seguridad social con amplia experiencia en pymes.",
    focus: "50%_20%",
  },
];

export const pasantes: TeamMember[] = [
  {
    name: "Nombre",
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