export interface Lawyer {
  slug: string;
  name: string;
  title: string;
  title_en?: string;
  email: string;
  image: string;

  recognitionImages?: string[];
  recognitionImagesCacheKey?: string;
  featuredRecognitionImageIndex?: number;

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
    postgraduate?: string;
    doctorate?: string;
  };

  books?: Array<{
    title: string;
    year?: string;
    description?: string;
  }>;

  books_en?: Array<{
    title_en: string;
    year?: string;
    description?: string;
  }>;

  articles: Array<{
    title: string;
    publication?: string;
    year?: string;
    reference?: string;
  }>;

  articles_en?: Array<{
    title_en?: string;
    publication_en?: string;
    year?: string;
  }>;

  academicPositions: Array<{
    title: string;
    institution: string;
    descriptiona?: string;
    descriptionb?: string;
    descriptionc?: string;
    period: string;
  }>;

  universityRoles: Array<{ title: string; year: string }>;

  awards: Array<{ title: string; year?: string }>;

  scholarships: Array<{ title: string; year?: string }>;

  languages?: Array<{ language: string; certificates: string[] }>;

  conferences: Array<{ title: string; year?: string }>;

  integratedRoles?: {
    institutions: string[];
    started?: Array<{
      title: string;
      description: string;
    }>;
    end?: Array<{
      title: string;
      description: string;
    }>;
  };

  journals?: Array<{
    journal: string;
    publisher?: string;
    director?: string;
    country?: string;
    description?: string;
    articles: Array<{
      title: string;
      year?: string;
      reference?: string;
    }>;
  }>;

  newspapers?: Array<{
    newspaper: string;
    articles: Array<{
      title: string;
      reference?: string;
      year?: string;
    }>;
  }>;

  dailyColumns?: Array<{
    newspaper: string;
    articles: Array<{
      title: string;
      date: string;
    }>;
  }>;

  course?: Array<{ title: string; year?: string }>;
  otherRoles: Array<{ title: string; string?: string[] }>;
  otherRoles_en?: Array<{ title_en?: string; string_en?: string[] }>;

  amparo?: {
    intro: string;
    caseName: string;
    sentence: {
      date: string;
      internalNumber: string;
      court: string;
      chamber: string;
      magistrates: string;
      saijId: string;
    };
    summary: string;
    sectionTitle: string;
    sectionIntro: string;
    body: string;
    footer: string;
  };

  otherAntecedentes: string[];
  otherAntecedentes_en?: string[];
}
