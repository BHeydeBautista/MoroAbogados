export interface Client {
  name: string;
  logo?: string;
  category: string;
  featured?: boolean;
}

export const clients: Client[] = [

  // ——— INDUSTRIA Y PRODUCCIÓN ———
  { name: "Acindar S.G.R.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918923/acindar_jbc2ik.gif" },
  { name: "Agroservicios Pampeanos S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918924/Agroservicios_Pampeanos_S.A._lmbuij.jpg" },
  { name: "Agrotécnica Litoral S.R.L.", category: "Industria y Producción" },
  { name: "Aberturas Valentinuz S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919034/Aberturas_Valentinuz_S.A._ijopgp.jpg" },
  { name: "Avebe Argentina S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919061/Avebe_Argentina_S.A._tqjn9c.jpg" },
  { name: "Bulonera del Litoral S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919091/Bulonera_del_Litoral_S.A._dlxqep.jpg", featured: true },
  { name: "Consorcio de Exportación Avícola", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918942/Consorcio_de_Exportaci%C3%B3n_Av%C3%ADcola_leo2gv.png"},
  { name: "Dragados y Construcciones Argentina S.A. (DYCASA)", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919148/Dragados_y_Construcciones_Argentina_S.A._DYCASA_hlarrz.jpg" },
  { name: "Estancias Chalbaud", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919177/Estancia_Chalbaud_jdnqj3.webp" },
  { name: "General Motors Argentina S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918934/gm_r6tnnx.webp", featured: true },
  { name: "Glencore Cereales S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919226/Glencore_Cereales_S.A._iodlxn.png" },
  { name: "Las Margaritas S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919253/Las_Margaritas_S.A._ciwalx.webp" },
  { name: "MTH SRL", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919286/MTH_SRL_o1xz9p.webp", featured: true },
  { name: "Michelin Argentina S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918942/Michelin_il7slg.png", featured: true },
  { name: "Papel Prensa S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919351/Papel_Prensa_S.A._bx5qkl.png" },
  { name: "Praxair Argentina S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919373/Praxair_Argentina_S.A._ehvppv.png" },
  { name: "Santa Elena Alimentos S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918949/Santa_Elena_Alimentos_S.A._army7j.webp" },
  { name: "Supercemento S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918961/Supercemento_S.A._cds08r.webp" },
  { name: "Yara Argentina S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918972/Yara_Argentina_S.A._wb2qpw.png" },
  { name: "Zanella Hnos. S.A.", category: "Industria y Producción", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918974/Zanella_Hnos._S.A._j6ki0f.webp" },

  // ——— INDUSTRIA (NUEVAS AGREGADAS) ———
  { name: "LEFFLER & WOLLERT S.R.L.", category: "Industria y Producción" },
  { name: "ALIMENTI S.R.L.", category: "Industria y Producción" },
  { name: "LEFFLER-DIETZ ALUMINIO", category: "Industria y Producción" },
  { name: "ROTH HUEVO CAMPO", category: "Industria y Producción" },
  { name: "L & B Maquinarias S.A.", category: "Industria y Producción" },
  { name: "ASTILLERO Samuel Gutnisky S.A.", category: "Industria y Producción" },

  // ——— SERVICIOS Y OTROS ———
  { name: "Automóvil Club Argentino", category: "Servicios y Otros", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919494/Autom%C3%B3vil_Club_Argentino_hcjem3.jpg", featured: true },
  { name: "CEMYC S.R.L.", category: "Servicios y Otros", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919520/CEMYC_S.R.L._andk05.jpg" },
  { name: "CGM Leasing S.A.", category: "Servicios y Otros", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919546/CGM_Leasing_S.A._dq6smn.jpg" },
  { name: "Gottig Hnos. y compañía S.R.L.", category: "Servicios y Otros", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919590/Gottig_Hnos._y_compa%C3%B1%C3%ADa_S.R.L._tqxiei.webp" },
  { name: "Grupo Almar S.R.L.", category: "Servicios y Otros", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919622/Grupo_Almar_S.R.L._atistq.webp" },
  { name: "Redengas S.A.", category: "Servicios y Otros", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918947/Redengas_S.A._ora9lp.png" },
  { name: "SEDESA", category: "Servicios y Otros", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918953/SEDESA_ipbs5f.png" },
  { name: "Bonafide S.A.", category: "Servicios y Otros", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919682/Bonafide_S.A_dgjvd6.png" },
  { name: "Leffler y Wollert S.R.L.", category: "Servicios y Otros" },

  // ——— BANCOS Y FINANZAS ———
  { name: "Banco Finansur S.A.", category: "Bancos y Finanzas", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919748/Banco_Finansur_S.A._aa1zay.jpg" },
  { name: "Banco Hipotecario S.A.", category: "Bancos y Finanzas", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919766/Banco_Hipotecario_S.A._r1i3dm.png", featured: true },
  { name: "Banco Patagonia S.A.", category: "Bancos y Finanzas", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919785/Banco_Patagonia_S.A._mfvomz.jpg", featured: true },
  { name: "Banco de Entre Ríos S.A.", category: "Bancos y Finanzas", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919804/Banco_de_Entre_R%C3%ADos_S.A._ncesnf.webp" },
  { name: "Banco Municipal de Rosario", category: "Bancos y Finanzas", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919825/Banco_Municipal_de_Rosario_u2blnt.jpg" },
  { name: "ICBC", category: "Bancos y Finanzas", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918937/icbc_j8u3ad.webp", featured: true },
  { name: "Standard Bank S.A.", category: "Bancos y Finanzas", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918959/standardbank_bce1b6.png" },
  { name: "Citibank", category: "Bancos y Finanzas", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918928/Citibank_eyi4oo.jpg" },

  // ——— RETAIL Y CONSUMO ———
  { name: "CencoSud S.A.", category: "Retail y Consumo", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763919927/CencoSud_S.A._ejh1zl.jpg", featured: true },
  { name: "COTO", category: "Retail y Consumo", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763920029/COTO_CICSA_rhaori.webp", featured: true },
  { name: "Jumbo S.A.", category: "Retail y Consumo", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763920074/Jumbo_Retail_Argentina_S.A._kxllqx.webp", featured: true },
  { name: "VEA", category: "Retail y Consumo", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918968/Vea_th5kjj.jpg", featured: true },

  // ——— GOBIERNO Y MUNICIPIOS ———
  { name: "CAMMESA", category: "Gobierno y Municipios", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763920142/CAMMESA_iqvpzo.jpg", featured: true },
  { name: "ENERSA", category: "Gobierno y Municipios", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918932/ENERSA_xxqwvq.jpg" },
  { name: "Municipalidad de Paraná", category: "Gobierno y Municipios", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763920205/Municipalidad_de_Paran%C3%A1_yvqylq.jpg" },
  { name: "Municipalidad de Crespo", category: "Gobierno y Municipios", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763920222/Municipalidad_de_Crespo_cdsaak.png" },
  { name: "Municipalidad de San José de Feliciano", category: "Gobierno y Municipios", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918945/Municipalidad_de_Feliciano_wkqmbe.webp" },
  { name: "Instituto del Seguro de Entre Ríos (IAPSER)", category: "Gobierno y Municipios", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918935/IAPSER_ufte9f.png", featured: true },

  // ——— SALUD Y FARMACÉUTICA ———
  { name: "Instituto de Traumatología y Enfermedades Oseas (ITEO)", category: "Salud y Farmacéutica", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763920292/Instituto_de_Traumatolog%C3%ADa_y_Enfermedades_Oseas_ITEO_yhqlxd.png" },
  { name: "Eli Lilly Interamericana", category: "Salud y Farmacéutica", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763920311/Eli_Lilly_Interamericana_xylwij.webp" },
  { name: "Vittal", category: "Salud y Farmacéutica", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918970/Vittal_vrvfgs.webp" },
  { name: "Galli Instituto Privado de Cirugía Plástica", category: "Salud y Farmacéutica", logo: "" },

  // ——— TECNOLOGÍA ———
  { name: "Lexis Nexis Argentina S.A.", category: "Tecnología", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763920354/Lexis_Nexis_Argentina_S.A._f6tylw.png" },
  { name: "Microsoft Corporation", category: "Tecnología", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918942/Microsoft_tw8qlf.png", featured: true },
  { name: "SIEMMENS", category: "Tecnología", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918955/SIEMMENS_jtdrpd.png" },
  { name: "Telefónica de Argentina S.A. (MOVISTAR)", category: "Tecnología", logo: "https://res.cloudinary.com/di2os0yqc/image/upload/v1763918963/telefonica_wrqju6.webp", featured: true },
];
