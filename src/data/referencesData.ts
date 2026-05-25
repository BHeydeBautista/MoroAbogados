export type Province = {
  slug: string;
  number: string;
  name: string;
  image: string | null;
  items: string[];
};

export const provinces: Province[] = [
  {
    slug: "entre-rios",
    number: "01",
    name: "Entre Ríos",
    image: "/img/references/entrerios.jpg",
    items: [
      "Gualeguay — Estudio Jurídico Bisso",
      "Diamante — Estudio Jurídico Llados",
      "Victoria — Estudio Jurídico Firpo-Valdamarin",
      "Concordia — Estudio Jurídico Arigos",
      "Chajarí — Estudio Jurídico Ponzoni",
      "Nogoyá — Estudio Jurídico Molas",
      "Villaguay — Estudio Jurídico Federik",
      "Rosario del Tala",
      "La Paz — Estudio Jurídico Ponzoni",
      "Colón",
      "Gualeguaychú — Estudio Jurídico Maya",
    ],
  },
  {
    slug: "santa-fe",
    number: "02",
    name: "Santa Fe",
    image: "/img/references/santafe.jpg",
    items: [
      "Cañada de Gómez · Las Rosas · San Jorge — Dr. Córdoba",
      "Venado Tuerto — Dr. Fernández-Carlín",
      "Reconquista — Dr. Spessot",
      "Rafaela — Dr. Marsico",
      "Rosario — Dr. Rodesia",
      "Esperanza — Dr. Daffner",
      "Villa Ocampo — Dr. Bonetto",
      "Villa Constitución — Dr. Moresco",
      "Sastre — Dr. Martello",
      "Rufino — Dr. Cles",
      "San Cristóbal — Dr. Zenobi",
    ],
  },
  {
    slug: "buenos-aires",
    number: "03",
    name: "Buenos Aires",
    image: "/img/references/buenosaires.jpg",
    items: [],
  },
];

export function getProvince(slug: string): Province | null {
  return provinces.find((p) => p.slug === slug) ?? null;
}
