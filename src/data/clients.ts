export interface Client {
  name: string;
  logo?: string;
  category: string;
  featured?: boolean;
}

export const clients: Client[] = [

  // ——— INDUSTRIA Y PRODUCCIÓN ———
  { name: "Acindar S.G.R.", category: "Industria y Producción", logo: "/img/logos/acindar.png" },
  { name: "Agroservicios Pampeanos S.A.", category: "Industria y Producción", logo: "/img/logos/Agroservicios Pampeanos S.A..png" },
  { name: "Agrotécnica Litoral S.R.L.", category: "Industria y Producción" },
  { name: "Aberturas Valentinuz S.A.", category: "Industria y Producción", logo: "/logos/Aberturas Valentinuz S.A..jpg" },
  { name: "Avebe Argentina S.A.", category: "Industria y Producción", logo: "/logos/Avebe Argentina S.A..jpg" },
  { name: "Bulonera del Litoral S.A.", category: "Industria y Producción", logo: "/logos/Bulonera del Litoral S.A..jpg", featured: true },
  { name: "Consorcio de Exportación Avícola", category: "Industria y Producción", logo: "/img/logos/Consorcio de Exportación Avícola.png"},
  { name: "Dragados y Construcciones Argentina S.A. (DYCASA)", category: "Industria y Producción", logo: "/logos/Dragados y Construcciones Argentina S.A. (DYCASA).jpg" },
  { name: "Estancias Chalbaud", category: "Industria y Producción", logo: "/logos/Estancia Chalbaud.jpg" },
  { name: "General Motors Argentina S.A.", category: "Industria y Producción", logo: "/logos/General Motors Argentina S.A..jpg", featured: true },
  { name: "Glencore Cereales S.A.", category: "Industria y Producción", logo: "/logos/Glencore Cereales S.A..jpg" },
  { name: "Las Margaritas S.A.", category: "Industria y Producción", logo: "/logos/Las Margaritas S.A..jpg" },
  { name: "MTH SRL", category: "Industria y Producción", logo: "/logos/MTH SRL.jpg", featured: true },
  { name: "Michelin Argentina S.A.", category: "Industria y Producción", logo: "/logos/Michelin Argentina S.A..jpg", featured: true },
  { name: "Papel Prensa S.A.", category: "Industria y Producción", logo: "/logos/Papel Prensa S.A..jpg" },
  { name: "Praxair Argentina S.A.", category: "Industria y Producción", logo: "/logos/Praxair Argentina S.A..jpg" },
  { name: "Santa Elena Alimentos S.A.", category: "Industria y Producción", logo: "/img/logos/Santa Elena Alimentos S.A..png" },
  { name: "Supercemento S.A.", category: "Industria y Producción", logo: "/img/logos/Supercemento S.A..png" },
  { name: "Yara Argentina S.A.", category: "Industria y Producción", logo: "/img/logos/Yara Argentina S.A..png" },
  { name: "Zanella Hnos. S.A.", category: "Industria y Producción", logo: "/img/logos/Zanella Hnos. S.A..png" },

  // ——— SERVICIOS Y OTROS ———
  { name: "Automóvil Club Argentino", category: "Servicios y Otros", logo: "/logos/Automóvil Club Argentino.jpg", featured: true },
  { name: "CEMYC S.R.L.", category: "Servicios y Otros", logo: "/logos/CEMYC S.R.L..jpg" },
  { name: "CGM Leasing S.A.", category: "Servicios y Otros", logo: "/logos/CGM Leasing S.A..jpg" },
  { name: "Gottig Hnos. y compañía S.R.L.", category: "Servicios y Otros", logo: "/logos/Gottig Hnos. y compañía S.R.L..jpg" },
  { name: "Grupo Almar S.R.L.", category: "Servicios y Otros", logo: "/logos/Grupo Almar S.R.L..jpg" },
  { name: "Redengas S.A.", category: "Servicios y Otros", logo: "/img/logos/Redengas S.A..png" },
  { name: "SEDESA", category: "Servicios y Otros", logo: "/img/logos/SEDESA.png" },
  { name: "Bonafide S.A.", category: "Servicios y Otros", logo: "/logos/Bonafide S.A.jpg" },
  { name: "Leffler y Wollert SRL", category: "Servicios y Otros" },

  // ——— BANCOS Y FINANZAS ———
  { name: "Banco Finansur S.A.", category: "Bancos y Finanzas", logo: "/logos/Banco Finansur S.A..jpg" },
  { name: "Banco Hipotecario S.A.", category: "Bancos y Finanzas", logo: "/logos/Banco Hipotecario S.A..jpg" },
  { name: "Banco Patagonia S.A.", category: "Bancos y Finanzas", logo: "/logos/Banco Patagonia S.A..jpg", featured: true },
  { name: "Banco de Entre Ríos S.A.", category: "Bancos y Finanzas", logo: "/logos/Banco de Entre Ríos S.A..jpg" },
  { name: "Banco Municipal de Rosario", category: "Bancos y Finanzas", logo: "/logos/Banco Municipal de Rosario.jpg" },
  { name: "ICBC", category: "Bancos y Finanzas", logo: "/logos/ICBC.jpg", featured: true },
  { name: "Standard Bank S.A.", category: "Bancos y Finanzas", logo: "/img/logos/Standard Bank S.A..png" },
  { name: "Citibank", category: "Bancos y Finanzas", logo: "/img/logos/Citibank.png" },

  // ——— RETAIL Y CONSUMO ———
  { name: "CencoSud S.A.", category: "Retail y Consumo", logo: "/logos/CencoSud S.A..jpg", featured: true },
  { name: "COTO CICSA", category: "Retail y Consumo", logo: "/logos/COTO CICSA.jpg", featured: true },
  { name: "Jumbo Retail Argentina S.A.", category: "Retail y Consumo", logo: "/logos/Jumbo Retail Argentina S.A..jpg", featured: true },
  { name: "VEA", category: "Retail y Consumo", logo: "/img/logos/VEA.png", featured: true },

  // ——— GOBIERNO Y MUNICIPIOS ———
  { name: "CAMMESA", category: "Gobierno y Municipios", logo: "/logos/CAMMESA.jpg", featured: true },
  { name: "ENERSA", category: "Gobierno y Municipios", logo: "/img/logos/ENERSA.png" },
  { name: "Municipalidad de Paraná", category: "Gobierno y Municipios", logo: "/logos/Municipalidad de Paraná.jpg" },
  { name: "Municipalidad de Crespo", category: "Gobierno y Municipios", logo: "/logos/Municipalidad de Crespo.jpg" },
  { name: "Municipalidad de Feliciano", category: "Gobierno y Municipios", logo: "/img/logos/Municipalidad de Feliciano.png" },
  { name: "Instituto del Seguro de Entre Ríos (IAPSER)", category: "Gobierno y Municipios", logo: "/img/logos/IAPSER.png", featured: true },

  // ——— SALUD Y FARMACÉUTICA ———
  { name: "Instituto de Traumatología y Enfermedades Oseas (ITEO)", category: "Salud y Farmacéutica", logo: "/logos/Instituto de Traumatología y Enfermedades Oseas (ITEO).jpg" },
  { name: "Eli Lilly Interamericana", category: "Salud y Farmacéutica", logo: "/logos/Eli Lilly Interamericana.jpg" },
  { name: "Vittal", category: "Salud y Farmacéutica", logo: "/img/logos/Vittal.png" },

  // ——— TECNOLOGÍA ———
  { name: "Lexis Nexis Argentina S.A.", category: "Tecnología", logo: "/logos/Lexis Nexis Argentina S.A..jpg" },
  { name: "Microsoft Corporation", category: "Tecnología", logo: "/logos/Microsoft Corporation.jpg", featured: true },
  { name: "SIEMMENS", category: "Tecnología", logo: "/img/logos/SIEMMENS.png" },
  { name: "Telefónica de Argentina S.A. (MOVISTAR)", category: "Tecnología", logo: "/img/logos/Telefónica de Argentina S.A. (MOVISTAR).png", featured: true },
];
