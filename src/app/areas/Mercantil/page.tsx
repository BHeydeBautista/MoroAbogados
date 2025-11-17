import AreaPageTemplate from "@/components/areas/AreaPageTemplate";

export default function Page() {
  return (
    <AreaPageTemplate
      title="Mercantil y Empresarial General"
      description="Asesoramiento integral en operaciones comerciales, contratos, sociedades y gestión jurídica empresarial."
      imageSrc="/img/areas/mercantil.jpg"
      points={[
        "Redacción, revisión y negociación de contratos comerciales.",
        "Asistencia jurídica continua a empresas y emprendimientos.",
        "Conflictos entre socios y responsabilidad empresarial.",
        "Estructuración de negocios y acuerdos comerciales.",
        "Cumplimiento normativo y regulatorio para empresas.",
        "Auditoría legal preventiva (due diligence).",
        "Representación en gestiones administrativas y extrajudiciales.",
        "Asesoramiento a pymes, startups y grupos empresariales."
      ]}
    />
  );
}
