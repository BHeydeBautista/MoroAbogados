export interface Lawyer {
    slug: string;
    name: string;
    email: string;
    title: string;
    image: string;
    bio: string;
    birthDate: string;
    birthPlace: string;
    education: {
      degree: string;
      graduationDate: string;
    };
    career: Array<{
      title: string;
      organization: string;
      year: string;
    }>;
    publications: Array<{
      title: string;
      description: string;
      year: string;
    }>;
    journals: Array<{
      title: string;
      editor: string;
      publisher: string;
      year: string;
      page: string;
    }>;
  }
  
  export const lawyerDetails: Record<string, Lawyer> = {
    "dr-carlos-moro": {
      slug: "dr-carlos-moro",
      email: "prueba@gmai.com",
      name: "Dr. Carlos E. Moro",
      title: "Abogado, especialista en Derecho Concursal",
      image: "/lawyer1.jpg",
      bio: "Abogado egresado en 1976 de la UNL. Amplia trayectoria en derecho concursal y societario.",
      birthDate: "13 de enero de 1955",
      birthPlace: "Paraná, Entre Ríos",
      education: {
        degree: "Abogado, Universidad Nacional del Litoral",
        graduationDate: "1976"
      },
      career: [
        {
          title: "Vicepresidente",
          organization: "Colegio de Abogados de Entre Ríos (Sección Paraná)",
          year: "1988-1990"
        },
        {
          title: "Co-redactor",
          organization: "Anteproyecto de reformas al Código Procesal Civil y Comercial de Entre Ríos",
          year: "2007"
        },
        {
          title: "Jurado",
          organization: "Consejo de la Magistratura de Entre Ríos",
          year: "2010"
        },
        {
          title: "Fundador y Director",
          organization: "Instituto de Derecho Concursal del Colegio de Abogados de Entre Ríos",
          year: "1995-presente"
        },
        {
          title: "Director",
          organization: "Editorial Delta",
          year: "2000-presente"
        }
      ],
      publications: [
        {
          title: "La empresa en crisis",
          description: "Editorial Delta, Paraná",
          year: "1995"
        },
        {
          title: "El concurso de la sociedad conyugal",
          description: "Editorial Delta",
          year: "2002"
        }
      ],
      journals: [
        {
          title: "Concursos y quiebras",
          editor: "Revista de las Sociedades y Concursos",
          publisher: "Errepar",
          year: "2004",
          page: "123"
        }
      ]
    },
    "dr-emilio-f-moro": {
      slug: "dr-emilio-f-moro",
      name: "Dr. Emilio F. Moro",
      email: "prueba@gmai.com",
      title: "Abogado, especialista en Derecho Comercial y Procesal",
      image: "/images/lawyers/emilio-moro.jpg",
      bio: "Profesor y abogado con amplia trayectoria en derecho comercial, concursal y procesal civil.",
      birthDate: "2 de abril de 1952",
      birthPlace: "Paraná, Entre Ríos",
      education: {
        degree: "Abogado, Universidad Nacional del Litoral",
        graduationDate: "1975"
      },
      career: [
        {
          title: "Profesor Titular Ordinario",
          organization: "UNL – Derecho Comercial II",
          year: "1990-2020"
        },
        {
          title: "Director",
          organization: "Carrera de Posgrado en Derecho Procesal Profundizado, UNL",
          year: "2000-2019"
        },
        {
          title: "Director Científico",
          organization: "Revista de Derecho Procesal, Rubinzal-Culzoni",
          year: "2005-presente"
        },
        {
          title: "Autor",
          organization: "Varias obras de Derecho Comercial y Procesal",
          year: "1980-2020"
        }
      ],
      publications: [
        {
          title: "Derecho Procesal Civil y Comercial",
          description: "Rubinzal-Culzoni, Santa Fe",
          year: "2008"
        },
        {
          title: "Técnicas de Litigación Oral",
          description: "Rubinzal-Culzoni",
          year: "2012"
        }
      ],
      journals: [
        {
          title: "La oralidad en el proceso civil",
          editor: "Revista de Derecho Procesal",
          publisher: "Rubinzal-Culzoni",
          year: "2015",
          page: "87"
        }
      ]
    }
  };