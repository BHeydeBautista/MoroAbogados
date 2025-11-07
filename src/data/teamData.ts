// src/data/teamData.ts
export type TeamMember = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
};

export const socios: TeamMember[] = [
  {
    name: "Carlos E. Moro",
    role: "Abogado",
    image: "/img/lawyers/Dr-Carlos.jpg",
    bio: "Especialista en derecho empresarial y societario con más de 20 años de experiencia en litigios complejos.",
  },
  {
    name: "Emilio F. Moro",
    role: "Abogado",
    image: "/img/lawyers/Dr-Emilio.jpg",
    bio: "Referente en derecho civil y comercial. Amplia trayectoria en asesoramiento integral a empresas.",
  },
];

export const abogados: TeamMember[] = [
  {
    name: "Rocio",
    role: "Abogada",
    image: "/img/lawyer1.jpg",
    bio: "Especialista en derecho corporativo y compliance. Experiencia en asesoría a empresas familiares.",
  },
  {
    name: "Abril",
    role: "Abogada",
    image: "/img/lawyer1.jpg",
    bio: "Litigante con foco en resolución alternativa de conflictos y derecho civil.",
  },
  {
    name: "Noelia",
    role: "Abogada",
    image: "/img/lawyer1.jpg",
    bio: "Asesora en derecho laboral y seguridad social con amplia experiencia en pymes.",
  },
];

export const pasantes: TeamMember[] = [
  {
    name: "Nombre",
    role: "Pasante de Derecho",
    image: "/img/lawyer1.jpg",
    bio: "Estudiante avanzada en derecho. Apoyo en investigaciones y gestión de documentación.",
  },
];

export const procuradores: TeamMember[] = [
  {
    name: "Nombre",
    role: "Procuradora",
    bio: "Gestión de expedientes y soporte administrativo.",
  },
  {
    name: "Paula",
    role: "Procuradora",
    bio: "Coordinación de agenda y atención a clientes.",
  },
];

export const itAssistants: TeamMember[] = [
  {
    name: "Sergio Heyde",
    role: "Asistente Informático",
    bio: "Soporte técnico y mantenimiento de sistemas.",
  },
  {
    name: "Bautista Heyde",
    role: "Desarrollador Web",
    bio: "Desarrollo de herramientas internas.",
  },
];